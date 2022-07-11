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
var import_reducer = require("../../../state/reducer");
var import_noop = require("../../../state/ducks/noop");
var import_preferredReactions = require("../../../state/ducks/preferredReactions");
describe("preferred reactions duck", () => {
  const getEmptyRootState = /* @__PURE__ */ __name(() => (0, import_reducer.reducer)(void 0, (0, import_noop.noopAction)()), "getEmptyRootState");
  const getRootState = /* @__PURE__ */ __name((preferredReactions) => ({
    ...getEmptyRootState(),
    preferredReactions
  }), "getRootState");
  const stateWithOpenCustomizationModal = {
    ...(0, import_preferredReactions.getEmptyState)(),
    customizePreferredReactionsModal: {
      draftPreferredReactions: ["\u2728", "\u2747\uFE0F", "\u{1F387}", "\u{1F988}", "\u{1F496}", "\u{1F17F}\uFE0F"],
      originalPreferredReactions: ["\u{1F499}", "\u{1F44D}", "\u{1F44E}", "\u{1F602}", "\u{1F62E}", "\u{1F622}"],
      selectedDraftEmojiIndex: void 0,
      isSaving: false,
      hadSaveError: false
    }
  };
  const stateWithOpenCustomizationModalAndSelectedEmoji = {
    ...stateWithOpenCustomizationModal,
    customizePreferredReactionsModal: {
      ...stateWithOpenCustomizationModal.customizePreferredReactionsModal,
      selectedDraftEmojiIndex: 1
    }
  };
  let sinonSandbox;
  beforeEach(() => {
    sinonSandbox = sinon.createSandbox();
  });
  afterEach(() => {
    sinonSandbox.restore();
  });
  describe("cancelCustomizePreferredReactionsModal", () => {
    const { cancelCustomizePreferredReactionsModal } = import_preferredReactions.actions;
    it("does nothing if the modal isn't open", () => {
      const action = cancelCustomizePreferredReactionsModal();
      const result = (0, import_preferredReactions.reducer)((0, import_preferredReactions.getEmptyState)(), action);
      import_chai.assert.notProperty(result, "customizePreferredReactionsModal");
    });
    it("closes the modal if open", () => {
      const action = cancelCustomizePreferredReactionsModal();
      const result = (0, import_preferredReactions.reducer)(stateWithOpenCustomizationModal, action);
      import_chai.assert.notProperty(result, "customizePreferredReactionsModal");
    });
  });
  describe("deselectDraftEmoji", () => {
    const { deselectDraftEmoji } = import_preferredReactions.actions;
    it("is a no-op if the customization modal is not open", () => {
      const state = (0, import_preferredReactions.getEmptyState)();
      const action = deselectDraftEmoji();
      const result = (0, import_preferredReactions.reducer)(state, action);
      import_chai.assert.strictEqual(result, state);
    });
    it("is a no-op if no emoji is selected", () => {
      const action = deselectDraftEmoji();
      const result = (0, import_preferredReactions.reducer)(stateWithOpenCustomizationModal, action);
      import_chai.assert.isUndefined(result.customizePreferredReactionsModal?.selectedDraftEmojiIndex);
    });
    it("deselects a currently-selected emoji", () => {
      const action = deselectDraftEmoji();
      const result = (0, import_preferredReactions.reducer)(stateWithOpenCustomizationModalAndSelectedEmoji, action);
      import_chai.assert.isUndefined(result.customizePreferredReactionsModal?.selectedDraftEmojiIndex);
    });
  });
  describe("openCustomizePreferredReactionsModal", () => {
    const { openCustomizePreferredReactionsModal } = import_preferredReactions.actions;
    it("opens the customization modal with defaults if no value was stored", () => {
      const emptyRootState = getEmptyRootState();
      const rootState = {
        ...emptyRootState,
        items: {
          ...emptyRootState.items,
          skinTone: 5
        }
      };
      const dispatch = sinon.spy();
      openCustomizePreferredReactionsModal()(dispatch, () => rootState, null);
      const [action] = dispatch.getCall(0).args;
      const result = (0, import_preferredReactions.reducer)(rootState.preferredReactions, action);
      const expectedEmoji = ["\u2764\uFE0F", "\u{1F44D}\u{1F3FF}", "\u{1F44E}\u{1F3FF}", "\u{1F602}", "\u{1F62E}", "\u{1F622}"];
      import_chai.assert.deepEqual(result.customizePreferredReactionsModal, {
        draftPreferredReactions: expectedEmoji,
        originalPreferredReactions: expectedEmoji,
        selectedDraftEmojiIndex: void 0,
        isSaving: false,
        hadSaveError: false
      });
    });
    it("opens the customization modal with stored values", () => {
      const storedPreferredReactionEmoji = ["\u2728", "\u2747\uFE0F", "\u{1F387}", "\u{1F988}", "\u{1F496}", "\u{1F17F}\uFE0F"];
      const emptyRootState = getEmptyRootState();
      const state = {
        ...emptyRootState,
        items: {
          ...emptyRootState.items,
          preferredReactionEmoji: storedPreferredReactionEmoji
        }
      };
      const dispatch = sinon.spy();
      openCustomizePreferredReactionsModal()(dispatch, () => state, null);
      const [action] = dispatch.getCall(0).args;
      const result = (0, import_preferredReactions.reducer)(state.preferredReactions, action);
      import_chai.assert.deepEqual(result.customizePreferredReactionsModal, {
        draftPreferredReactions: storedPreferredReactionEmoji,
        originalPreferredReactions: storedPreferredReactionEmoji,
        selectedDraftEmojiIndex: void 0,
        isSaving: false,
        hadSaveError: false
      });
    });
  });
  describe("replaceSelectedDraftEmoji", () => {
    const { replaceSelectedDraftEmoji } = import_preferredReactions.actions;
    it("is a no-op if the customization modal is not open", () => {
      const state = (0, import_preferredReactions.getEmptyState)();
      const action = replaceSelectedDraftEmoji("\u{1F988}");
      const result = (0, import_preferredReactions.reducer)(state, action);
      import_chai.assert.strictEqual(result, state);
    });
    it("is a no-op if no emoji is selected", () => {
      const action = replaceSelectedDraftEmoji("\u{1F485}");
      const result = (0, import_preferredReactions.reducer)(stateWithOpenCustomizationModal, action);
      import_chai.assert.strictEqual(result, stateWithOpenCustomizationModal);
    });
    it("replaces the selected draft emoji and deselects", () => {
      const action = replaceSelectedDraftEmoji("\u{1F431}");
      const result = (0, import_preferredReactions.reducer)(stateWithOpenCustomizationModalAndSelectedEmoji, action);
      import_chai.assert.deepStrictEqual(result.customizePreferredReactionsModal?.draftPreferredReactions, ["\u2728", "\u{1F431}", "\u{1F387}", "\u{1F988}", "\u{1F496}", "\u{1F17F}\uFE0F"]);
      import_chai.assert.isUndefined(result.customizePreferredReactionsModal?.selectedDraftEmojiIndex);
    });
  });
  describe("resetDraftEmoji", () => {
    const { resetDraftEmoji } = import_preferredReactions.actions;
    function getAction(rootState) {
      const dispatch = sinon.spy();
      resetDraftEmoji()(dispatch, () => rootState, null);
      const [action] = dispatch.getCall(0).args;
      return action;
    }
    it("is a no-op if the customization modal is not open", () => {
      const rootState = getEmptyRootState();
      const state = rootState.preferredReactions;
      const action = getAction(rootState);
      const result = (0, import_preferredReactions.reducer)(state, action);
      import_chai.assert.strictEqual(result, state);
    });
    it("resets the draft emoji to the defaults", () => {
      const rootState = getRootState(stateWithOpenCustomizationModal);
      const action = getAction(rootState);
      const result = (0, import_preferredReactions.reducer)(rootState.preferredReactions, action);
      import_chai.assert.deepEqual(result.customizePreferredReactionsModal?.draftPreferredReactions, ["\u2764\uFE0F", "\u{1F44D}", "\u{1F44E}", "\u{1F602}", "\u{1F62E}", "\u{1F622}"]);
    });
    it("deselects any selected emoji", () => {
      const rootState = getRootState(stateWithOpenCustomizationModalAndSelectedEmoji);
      const action = getAction(rootState);
      const result = (0, import_preferredReactions.reducer)(rootState.preferredReactions, action);
      import_chai.assert.isUndefined(result.customizePreferredReactionsModal?.selectedDraftEmojiIndex);
    });
  });
  describe("savePreferredReactions", () => {
    const { savePreferredReactions } = import_preferredReactions.actions;
    let storagePutStub;
    let captureChangeStub;
    let oldConversationController;
    beforeEach(() => {
      storagePutStub = sinonSandbox.stub(window.storage, "put").resolves();
      oldConversationController = window.ConversationController;
      captureChangeStub = sinonSandbox.stub();
      window.ConversationController = {
        getOurConversationOrThrow: () => ({
          captureChange: captureChangeStub
        })
      };
    });
    afterEach(() => {
      window.ConversationController = oldConversationController;
    });
    describe("thunk", () => {
      it("saves the preferred reaction emoji to local storage", async () => {
        await savePreferredReactions()(sinon.spy(), () => getRootState(stateWithOpenCustomizationModal), null);
        sinon.assert.calledWith(storagePutStub, "preferredReactionEmoji", stateWithOpenCustomizationModal.customizePreferredReactionsModal.draftPreferredReactions);
      });
      it("on success, enqueues a storage service upload", async () => {
        await savePreferredReactions()(sinon.spy(), () => getRootState(stateWithOpenCustomizationModal), null);
        sinon.assert.calledOnce(captureChangeStub);
      });
      it("on success, dispatches a pending action followed by a fulfilled action", async () => {
        const dispatch = sinon.spy();
        await savePreferredReactions()(dispatch, () => getRootState(stateWithOpenCustomizationModal), null);
        sinon.assert.calledTwice(dispatch);
        sinon.assert.calledWith(dispatch, {
          type: "preferredReactions/SAVE_PREFERRED_REACTIONS_PENDING"
        });
        sinon.assert.calledWith(dispatch, {
          type: "preferredReactions/SAVE_PREFERRED_REACTIONS_FULFILLED"
        });
      });
      it("on failure, dispatches a pending action followed by a rejected action", async () => {
        storagePutStub.rejects(new Error("something went wrong"));
        const dispatch = sinon.spy();
        await savePreferredReactions()(dispatch, () => getRootState(stateWithOpenCustomizationModal), null);
        sinon.assert.calledTwice(dispatch);
        sinon.assert.calledWith(dispatch, {
          type: "preferredReactions/SAVE_PREFERRED_REACTIONS_PENDING"
        });
        sinon.assert.calledWith(dispatch, {
          type: "preferredReactions/SAVE_PREFERRED_REACTIONS_REJECTED"
        });
      });
      it("on failure, does not enqueue a storage service upload", async () => {
        storagePutStub.rejects(new Error("something went wrong"));
        await savePreferredReactions()(sinon.spy(), () => getRootState(stateWithOpenCustomizationModal), null);
        sinon.assert.notCalled(captureChangeStub);
      });
    });
    describe("SAVE_PREFERRED_REACTIONS_FULFILLED", () => {
      const action = {
        type: "preferredReactions/SAVE_PREFERRED_REACTIONS_FULFILLED"
      };
      it("does nothing if the modal isn't open", () => {
        const result = (0, import_preferredReactions.reducer)((0, import_preferredReactions.getEmptyState)(), action);
        import_chai.assert.notProperty(result, "customizePreferredReactionsModal");
      });
      it("closes the modal if open", () => {
        const result = (0, import_preferredReactions.reducer)(stateWithOpenCustomizationModal, action);
        import_chai.assert.notProperty(result, "customizePreferredReactionsModal");
      });
    });
    describe("SAVE_PREFERRED_REACTIONS_PENDING", () => {
      const action = {
        type: "preferredReactions/SAVE_PREFERRED_REACTIONS_PENDING"
      };
      it('marks the modal as "saving"', () => {
        const result = (0, import_preferredReactions.reducer)(stateWithOpenCustomizationModal, action);
        import_chai.assert.isTrue(result.customizePreferredReactionsModal?.isSaving);
      });
      it("clears any previous errors", () => {
        const state = {
          ...stateWithOpenCustomizationModal,
          customizePreferredReactionsModal: {
            ...stateWithOpenCustomizationModal.customizePreferredReactionsModal,
            hadSaveError: true
          }
        };
        const result = (0, import_preferredReactions.reducer)(state, action);
        import_chai.assert.isFalse(result.customizePreferredReactionsModal?.hadSaveError);
      });
      it("deselects any selected emoji", () => {
        const result = (0, import_preferredReactions.reducer)(stateWithOpenCustomizationModalAndSelectedEmoji, action);
        import_chai.assert.isUndefined(result.customizePreferredReactionsModal?.selectedDraftEmojiIndex);
      });
    });
    describe("SAVE_PREFERRED_REACTIONS_REJECTED", () => {
      const action = {
        type: "preferredReactions/SAVE_PREFERRED_REACTIONS_REJECTED"
      };
      it("does nothing if the modal isn't open", () => {
        const state = (0, import_preferredReactions.getEmptyState)();
        const result = (0, import_preferredReactions.reducer)(state, action);
        import_chai.assert.strictEqual(result, state);
      });
      it("stops loading", () => {
        const result = (0, import_preferredReactions.reducer)(stateWithOpenCustomizationModal, action);
        import_chai.assert.isFalse(result.customizePreferredReactionsModal?.isSaving);
      });
      it("saves that there was an error", () => {
        const result = (0, import_preferredReactions.reducer)(stateWithOpenCustomizationModal, action);
        import_chai.assert.isTrue(result.customizePreferredReactionsModal?.hadSaveError);
      });
    });
  });
  describe("selectDraftEmojiToBeReplaced", () => {
    const { selectDraftEmojiToBeReplaced } = import_preferredReactions.actions;
    it("is a no-op if the customization modal is not open", () => {
      const state = (0, import_preferredReactions.getEmptyState)();
      const action = selectDraftEmojiToBeReplaced(2);
      const result = (0, import_preferredReactions.reducer)(state, action);
      import_chai.assert.strictEqual(result, state);
    });
    it("is a no-op if the index is out of range", () => {
      const action = selectDraftEmojiToBeReplaced(99);
      const result = (0, import_preferredReactions.reducer)(stateWithOpenCustomizationModal, action);
      import_chai.assert.strictEqual(result, stateWithOpenCustomizationModal);
    });
    it("sets the index as the selected one", () => {
      const action = selectDraftEmojiToBeReplaced(3);
      const result = (0, import_preferredReactions.reducer)(stateWithOpenCustomizationModal, action);
      import_chai.assert.strictEqual(result.customizePreferredReactionsModal?.selectedDraftEmojiIndex, 3);
    });
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsicHJlZmVycmVkUmVhY3Rpb25zX3Rlc3QudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSAnY2hhaSc7XG5pbXBvcnQgKiBhcyBzaW5vbiBmcm9tICdzaW5vbic7XG5pbXBvcnQgdHlwZSB7IFN0YXRlVHlwZSB9IGZyb20gJy4uLy4uLy4uL3N0YXRlL3JlZHVjZXInO1xuaW1wb3J0IHsgcmVkdWNlciBhcyByb290UmVkdWNlciB9IGZyb20gJy4uLy4uLy4uL3N0YXRlL3JlZHVjZXInO1xuaW1wb3J0IHsgbm9vcEFjdGlvbiB9IGZyb20gJy4uLy4uLy4uL3N0YXRlL2R1Y2tzL25vb3AnO1xuXG5pbXBvcnQgdHlwZSB7IFByZWZlcnJlZFJlYWN0aW9uc1N0YXRlVHlwZSB9IGZyb20gJy4uLy4uLy4uL3N0YXRlL2R1Y2tzL3ByZWZlcnJlZFJlYWN0aW9ucyc7XG5pbXBvcnQge1xuICBhY3Rpb25zLFxuICBnZXRFbXB0eVN0YXRlLFxuICByZWR1Y2VyLFxufSBmcm9tICcuLi8uLi8uLi9zdGF0ZS9kdWNrcy9wcmVmZXJyZWRSZWFjdGlvbnMnO1xuXG5kZXNjcmliZSgncHJlZmVycmVkIHJlYWN0aW9ucyBkdWNrJywgKCkgPT4ge1xuICBjb25zdCBnZXRFbXB0eVJvb3RTdGF0ZSA9ICgpOiBTdGF0ZVR5cGUgPT5cbiAgICByb290UmVkdWNlcih1bmRlZmluZWQsIG5vb3BBY3Rpb24oKSk7XG5cbiAgY29uc3QgZ2V0Um9vdFN0YXRlID0gKFxuICAgIHByZWZlcnJlZFJlYWN0aW9uczogUHJlZmVycmVkUmVhY3Rpb25zU3RhdGVUeXBlXG4gICk6IFN0YXRlVHlwZSA9PiAoe1xuICAgIC4uLmdldEVtcHR5Um9vdFN0YXRlKCksXG4gICAgcHJlZmVycmVkUmVhY3Rpb25zLFxuICB9KTtcblxuICBjb25zdCBzdGF0ZVdpdGhPcGVuQ3VzdG9taXphdGlvbk1vZGFsID0ge1xuICAgIC4uLmdldEVtcHR5U3RhdGUoKSxcbiAgICBjdXN0b21pemVQcmVmZXJyZWRSZWFjdGlvbnNNb2RhbDoge1xuICAgICAgZHJhZnRQcmVmZXJyZWRSZWFjdGlvbnM6IFsnXHUyNzI4JywgJ1x1Mjc0N1x1RkUwRicsICdcdUQ4M0NcdURGODcnLCAnXHVEODNFXHVERDg4JywgJ1x1RDgzRFx1REM5NicsICdcdUQ4M0NcdUREN0ZcdUZFMEYnXSxcbiAgICAgIG9yaWdpbmFsUHJlZmVycmVkUmVhY3Rpb25zOiBbJ1x1RDgzRFx1REM5OScsICdcdUQ4M0RcdURDNEQnLCAnXHVEODNEXHVEQzRFJywgJ1x1RDgzRFx1REUwMicsICdcdUQ4M0RcdURFMkUnLCAnXHVEODNEXHVERTIyJ10sXG4gICAgICBzZWxlY3RlZERyYWZ0RW1vamlJbmRleDogdW5kZWZpbmVkLFxuICAgICAgaXNTYXZpbmc6IGZhbHNlIGFzIGNvbnN0LFxuICAgICAgaGFkU2F2ZUVycm9yOiBmYWxzZSxcbiAgICB9LFxuICB9O1xuXG4gIGNvbnN0IHN0YXRlV2l0aE9wZW5DdXN0b21pemF0aW9uTW9kYWxBbmRTZWxlY3RlZEVtb2ppID0ge1xuICAgIC4uLnN0YXRlV2l0aE9wZW5DdXN0b21pemF0aW9uTW9kYWwsXG4gICAgY3VzdG9taXplUHJlZmVycmVkUmVhY3Rpb25zTW9kYWw6IHtcbiAgICAgIC4uLnN0YXRlV2l0aE9wZW5DdXN0b21pemF0aW9uTW9kYWwuY3VzdG9taXplUHJlZmVycmVkUmVhY3Rpb25zTW9kYWwsXG4gICAgICBzZWxlY3RlZERyYWZ0RW1vamlJbmRleDogMSxcbiAgICB9LFxuICB9O1xuXG4gIGxldCBzaW5vblNhbmRib3g6IHNpbm9uLlNpbm9uU2FuZGJveDtcblxuICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICBzaW5vblNhbmRib3ggPSBzaW5vbi5jcmVhdGVTYW5kYm94KCk7XG4gIH0pO1xuXG4gIGFmdGVyRWFjaCgoKSA9PiB7XG4gICAgc2lub25TYW5kYm94LnJlc3RvcmUoKTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ2NhbmNlbEN1c3RvbWl6ZVByZWZlcnJlZFJlYWN0aW9uc01vZGFsJywgKCkgPT4ge1xuICAgIGNvbnN0IHsgY2FuY2VsQ3VzdG9taXplUHJlZmVycmVkUmVhY3Rpb25zTW9kYWwgfSA9IGFjdGlvbnM7XG5cbiAgICBpdChcImRvZXMgbm90aGluZyBpZiB0aGUgbW9kYWwgaXNuJ3Qgb3BlblwiLCAoKSA9PiB7XG4gICAgICBjb25zdCBhY3Rpb24gPSBjYW5jZWxDdXN0b21pemVQcmVmZXJyZWRSZWFjdGlvbnNNb2RhbCgpO1xuICAgICAgY29uc3QgcmVzdWx0ID0gcmVkdWNlcihnZXRFbXB0eVN0YXRlKCksIGFjdGlvbik7XG5cbiAgICAgIGFzc2VydC5ub3RQcm9wZXJ0eShyZXN1bHQsICdjdXN0b21pemVQcmVmZXJyZWRSZWFjdGlvbnNNb2RhbCcpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2Nsb3NlcyB0aGUgbW9kYWwgaWYgb3BlbicsICgpID0+IHtcbiAgICAgIGNvbnN0IGFjdGlvbiA9IGNhbmNlbEN1c3RvbWl6ZVByZWZlcnJlZFJlYWN0aW9uc01vZGFsKCk7XG4gICAgICBjb25zdCByZXN1bHQgPSByZWR1Y2VyKHN0YXRlV2l0aE9wZW5DdXN0b21pemF0aW9uTW9kYWwsIGFjdGlvbik7XG5cbiAgICAgIGFzc2VydC5ub3RQcm9wZXJ0eShyZXN1bHQsICdjdXN0b21pemVQcmVmZXJyZWRSZWFjdGlvbnNNb2RhbCcpO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnZGVzZWxlY3REcmFmdEVtb2ppJywgKCkgPT4ge1xuICAgIGNvbnN0IHsgZGVzZWxlY3REcmFmdEVtb2ppIH0gPSBhY3Rpb25zO1xuXG4gICAgaXQoJ2lzIGEgbm8tb3AgaWYgdGhlIGN1c3RvbWl6YXRpb24gbW9kYWwgaXMgbm90IG9wZW4nLCAoKSA9PiB7XG4gICAgICBjb25zdCBzdGF0ZSA9IGdldEVtcHR5U3RhdGUoKTtcbiAgICAgIGNvbnN0IGFjdGlvbiA9IGRlc2VsZWN0RHJhZnRFbW9qaSgpO1xuICAgICAgY29uc3QgcmVzdWx0ID0gcmVkdWNlcihzdGF0ZSwgYWN0aW9uKTtcblxuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKHJlc3VsdCwgc3RhdGUpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2lzIGEgbm8tb3AgaWYgbm8gZW1vamkgaXMgc2VsZWN0ZWQnLCAoKSA9PiB7XG4gICAgICBjb25zdCBhY3Rpb24gPSBkZXNlbGVjdERyYWZ0RW1vamkoKTtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IHJlZHVjZXIoc3RhdGVXaXRoT3BlbkN1c3RvbWl6YXRpb25Nb2RhbCwgYWN0aW9uKTtcblxuICAgICAgYXNzZXJ0LmlzVW5kZWZpbmVkKFxuICAgICAgICByZXN1bHQuY3VzdG9taXplUHJlZmVycmVkUmVhY3Rpb25zTW9kYWw/LnNlbGVjdGVkRHJhZnRFbW9qaUluZGV4XG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgaXQoJ2Rlc2VsZWN0cyBhIGN1cnJlbnRseS1zZWxlY3RlZCBlbW9qaScsICgpID0+IHtcbiAgICAgIGNvbnN0IGFjdGlvbiA9IGRlc2VsZWN0RHJhZnRFbW9qaSgpO1xuICAgICAgY29uc3QgcmVzdWx0ID0gcmVkdWNlcihcbiAgICAgICAgc3RhdGVXaXRoT3BlbkN1c3RvbWl6YXRpb25Nb2RhbEFuZFNlbGVjdGVkRW1vamksXG4gICAgICAgIGFjdGlvblxuICAgICAgKTtcblxuICAgICAgYXNzZXJ0LmlzVW5kZWZpbmVkKFxuICAgICAgICByZXN1bHQuY3VzdG9taXplUHJlZmVycmVkUmVhY3Rpb25zTW9kYWw/LnNlbGVjdGVkRHJhZnRFbW9qaUluZGV4XG4gICAgICApO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnb3BlbkN1c3RvbWl6ZVByZWZlcnJlZFJlYWN0aW9uc01vZGFsJywgKCkgPT4ge1xuICAgIGNvbnN0IHsgb3BlbkN1c3RvbWl6ZVByZWZlcnJlZFJlYWN0aW9uc01vZGFsIH0gPSBhY3Rpb25zO1xuXG4gICAgaXQoJ29wZW5zIHRoZSBjdXN0b21pemF0aW9uIG1vZGFsIHdpdGggZGVmYXVsdHMgaWYgbm8gdmFsdWUgd2FzIHN0b3JlZCcsICgpID0+IHtcbiAgICAgIGNvbnN0IGVtcHR5Um9vdFN0YXRlID0gZ2V0RW1wdHlSb290U3RhdGUoKTtcbiAgICAgIGNvbnN0IHJvb3RTdGF0ZSA9IHtcbiAgICAgICAgLi4uZW1wdHlSb290U3RhdGUsXG4gICAgICAgIGl0ZW1zOiB7XG4gICAgICAgICAgLi4uZW1wdHlSb290U3RhdGUuaXRlbXMsXG4gICAgICAgICAgc2tpblRvbmU6IDUsXG4gICAgICAgIH0sXG4gICAgICB9O1xuXG4gICAgICBjb25zdCBkaXNwYXRjaCA9IHNpbm9uLnNweSgpO1xuICAgICAgb3BlbkN1c3RvbWl6ZVByZWZlcnJlZFJlYWN0aW9uc01vZGFsKCkoZGlzcGF0Y2gsICgpID0+IHJvb3RTdGF0ZSwgbnVsbCk7XG4gICAgICBjb25zdCBbYWN0aW9uXSA9IGRpc3BhdGNoLmdldENhbGwoMCkuYXJncztcblxuICAgICAgY29uc3QgcmVzdWx0ID0gcmVkdWNlcihyb290U3RhdGUucHJlZmVycmVkUmVhY3Rpb25zLCBhY3Rpb24pO1xuXG4gICAgICBjb25zdCBleHBlY3RlZEVtb2ppID0gWydcdTI3NjRcdUZFMEYnLCAnXHVEODNEXHVEQzREXHVEODNDXHVERkZGJywgJ1x1RDgzRFx1REM0RVx1RDgzQ1x1REZGRicsICdcdUQ4M0RcdURFMDInLCAnXHVEODNEXHVERTJFJywgJ1x1RDgzRFx1REUyMiddO1xuXG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKHJlc3VsdC5jdXN0b21pemVQcmVmZXJyZWRSZWFjdGlvbnNNb2RhbCwge1xuICAgICAgICBkcmFmdFByZWZlcnJlZFJlYWN0aW9uczogZXhwZWN0ZWRFbW9qaSxcbiAgICAgICAgb3JpZ2luYWxQcmVmZXJyZWRSZWFjdGlvbnM6IGV4cGVjdGVkRW1vamksXG4gICAgICAgIHNlbGVjdGVkRHJhZnRFbW9qaUluZGV4OiB1bmRlZmluZWQsXG4gICAgICAgIGlzU2F2aW5nOiBmYWxzZSxcbiAgICAgICAgaGFkU2F2ZUVycm9yOiBmYWxzZSxcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgaXQoJ29wZW5zIHRoZSBjdXN0b21pemF0aW9uIG1vZGFsIHdpdGggc3RvcmVkIHZhbHVlcycsICgpID0+IHtcbiAgICAgIGNvbnN0IHN0b3JlZFByZWZlcnJlZFJlYWN0aW9uRW1vamkgPSBbJ1x1MjcyOCcsICdcdTI3NDdcdUZFMEYnLCAnXHVEODNDXHVERjg3JywgJ1x1RDgzRVx1REQ4OCcsICdcdUQ4M0RcdURDOTYnLCAnXHVEODNDXHVERDdGXHVGRTBGJ107XG5cbiAgICAgIGNvbnN0IGVtcHR5Um9vdFN0YXRlID0gZ2V0RW1wdHlSb290U3RhdGUoKTtcbiAgICAgIGNvbnN0IHN0YXRlID0ge1xuICAgICAgICAuLi5lbXB0eVJvb3RTdGF0ZSxcbiAgICAgICAgaXRlbXM6IHtcbiAgICAgICAgICAuLi5lbXB0eVJvb3RTdGF0ZS5pdGVtcyxcbiAgICAgICAgICBwcmVmZXJyZWRSZWFjdGlvbkVtb2ppOiBzdG9yZWRQcmVmZXJyZWRSZWFjdGlvbkVtb2ppLFxuICAgICAgICB9LFxuICAgICAgfTtcblxuICAgICAgY29uc3QgZGlzcGF0Y2ggPSBzaW5vbi5zcHkoKTtcbiAgICAgIG9wZW5DdXN0b21pemVQcmVmZXJyZWRSZWFjdGlvbnNNb2RhbCgpKGRpc3BhdGNoLCAoKSA9PiBzdGF0ZSwgbnVsbCk7XG4gICAgICBjb25zdCBbYWN0aW9uXSA9IGRpc3BhdGNoLmdldENhbGwoMCkuYXJncztcblxuICAgICAgY29uc3QgcmVzdWx0ID0gcmVkdWNlcihzdGF0ZS5wcmVmZXJyZWRSZWFjdGlvbnMsIGFjdGlvbik7XG5cbiAgICAgIGFzc2VydC5kZWVwRXF1YWwocmVzdWx0LmN1c3RvbWl6ZVByZWZlcnJlZFJlYWN0aW9uc01vZGFsLCB7XG4gICAgICAgIGRyYWZ0UHJlZmVycmVkUmVhY3Rpb25zOiBzdG9yZWRQcmVmZXJyZWRSZWFjdGlvbkVtb2ppLFxuICAgICAgICBvcmlnaW5hbFByZWZlcnJlZFJlYWN0aW9uczogc3RvcmVkUHJlZmVycmVkUmVhY3Rpb25FbW9qaSxcbiAgICAgICAgc2VsZWN0ZWREcmFmdEVtb2ppSW5kZXg6IHVuZGVmaW5lZCxcbiAgICAgICAgaXNTYXZpbmc6IGZhbHNlLFxuICAgICAgICBoYWRTYXZlRXJyb3I6IGZhbHNlLFxuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdyZXBsYWNlU2VsZWN0ZWREcmFmdEVtb2ppJywgKCkgPT4ge1xuICAgIGNvbnN0IHsgcmVwbGFjZVNlbGVjdGVkRHJhZnRFbW9qaSB9ID0gYWN0aW9ucztcblxuICAgIGl0KCdpcyBhIG5vLW9wIGlmIHRoZSBjdXN0b21pemF0aW9uIG1vZGFsIGlzIG5vdCBvcGVuJywgKCkgPT4ge1xuICAgICAgY29uc3Qgc3RhdGUgPSBnZXRFbXB0eVN0YXRlKCk7XG4gICAgICBjb25zdCBhY3Rpb24gPSByZXBsYWNlU2VsZWN0ZWREcmFmdEVtb2ppKCdcdUQ4M0VcdUREODgnKTtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IHJlZHVjZXIoc3RhdGUsIGFjdGlvbik7XG5cbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChyZXN1bHQsIHN0YXRlKTtcbiAgICB9KTtcblxuICAgIGl0KCdpcyBhIG5vLW9wIGlmIG5vIGVtb2ppIGlzIHNlbGVjdGVkJywgKCkgPT4ge1xuICAgICAgY29uc3QgYWN0aW9uID0gcmVwbGFjZVNlbGVjdGVkRHJhZnRFbW9qaSgnXHVEODNEXHVEQzg1Jyk7XG4gICAgICBjb25zdCByZXN1bHQgPSByZWR1Y2VyKHN0YXRlV2l0aE9wZW5DdXN0b21pemF0aW9uTW9kYWwsIGFjdGlvbik7XG5cbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChyZXN1bHQsIHN0YXRlV2l0aE9wZW5DdXN0b21pemF0aW9uTW9kYWwpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JlcGxhY2VzIHRoZSBzZWxlY3RlZCBkcmFmdCBlbW9qaSBhbmQgZGVzZWxlY3RzJywgKCkgPT4ge1xuICAgICAgY29uc3QgYWN0aW9uID0gcmVwbGFjZVNlbGVjdGVkRHJhZnRFbW9qaSgnXHVEODNEXHVEQzMxJyk7XG4gICAgICBjb25zdCByZXN1bHQgPSByZWR1Y2VyKFxuICAgICAgICBzdGF0ZVdpdGhPcGVuQ3VzdG9taXphdGlvbk1vZGFsQW5kU2VsZWN0ZWRFbW9qaSxcbiAgICAgICAgYWN0aW9uXG4gICAgICApO1xuXG4gICAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKFxuICAgICAgICByZXN1bHQuY3VzdG9taXplUHJlZmVycmVkUmVhY3Rpb25zTW9kYWw/LmRyYWZ0UHJlZmVycmVkUmVhY3Rpb25zLFxuICAgICAgICBbJ1x1MjcyOCcsICdcdUQ4M0RcdURDMzEnLCAnXHVEODNDXHVERjg3JywgJ1x1RDgzRVx1REQ4OCcsICdcdUQ4M0RcdURDOTYnLCAnXHVEODNDXHVERDdGXHVGRTBGJ11cbiAgICAgICk7XG4gICAgICBhc3NlcnQuaXNVbmRlZmluZWQoXG4gICAgICAgIHJlc3VsdC5jdXN0b21pemVQcmVmZXJyZWRSZWFjdGlvbnNNb2RhbD8uc2VsZWN0ZWREcmFmdEVtb2ppSW5kZXhcbiAgICAgICk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdyZXNldERyYWZ0RW1vamknLCAoKSA9PiB7XG4gICAgY29uc3QgeyByZXNldERyYWZ0RW1vamkgfSA9IGFjdGlvbnM7XG5cbiAgICBmdW5jdGlvbiBnZXRBY3Rpb24ocm9vdFN0YXRlOiBSZWFkb25seTxTdGF0ZVR5cGU+KSB7XG4gICAgICBjb25zdCBkaXNwYXRjaCA9IHNpbm9uLnNweSgpO1xuICAgICAgcmVzZXREcmFmdEVtb2ppKCkoZGlzcGF0Y2gsICgpID0+IHJvb3RTdGF0ZSwgbnVsbCk7XG4gICAgICBjb25zdCBbYWN0aW9uXSA9IGRpc3BhdGNoLmdldENhbGwoMCkuYXJncztcbiAgICAgIHJldHVybiBhY3Rpb247XG4gICAgfVxuXG4gICAgaXQoJ2lzIGEgbm8tb3AgaWYgdGhlIGN1c3RvbWl6YXRpb24gbW9kYWwgaXMgbm90IG9wZW4nLCAoKSA9PiB7XG4gICAgICBjb25zdCByb290U3RhdGUgPSBnZXRFbXB0eVJvb3RTdGF0ZSgpO1xuICAgICAgY29uc3Qgc3RhdGUgPSByb290U3RhdGUucHJlZmVycmVkUmVhY3Rpb25zO1xuICAgICAgY29uc3QgYWN0aW9uID0gZ2V0QWN0aW9uKHJvb3RTdGF0ZSk7XG4gICAgICBjb25zdCByZXN1bHQgPSByZWR1Y2VyKHN0YXRlLCBhY3Rpb24pO1xuXG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwocmVzdWx0LCBzdGF0ZSk7XG4gICAgfSk7XG5cbiAgICBpdCgncmVzZXRzIHRoZSBkcmFmdCBlbW9qaSB0byB0aGUgZGVmYXVsdHMnLCAoKSA9PiB7XG4gICAgICBjb25zdCByb290U3RhdGUgPSBnZXRSb290U3RhdGUoc3RhdGVXaXRoT3BlbkN1c3RvbWl6YXRpb25Nb2RhbCk7XG4gICAgICBjb25zdCBhY3Rpb24gPSBnZXRBY3Rpb24ocm9vdFN0YXRlKTtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IHJlZHVjZXIocm9vdFN0YXRlLnByZWZlcnJlZFJlYWN0aW9ucywgYWN0aW9uKTtcblxuICAgICAgYXNzZXJ0LmRlZXBFcXVhbChcbiAgICAgICAgcmVzdWx0LmN1c3RvbWl6ZVByZWZlcnJlZFJlYWN0aW9uc01vZGFsPy5kcmFmdFByZWZlcnJlZFJlYWN0aW9ucyxcbiAgICAgICAgWydcdTI3NjRcdUZFMEYnLCAnXHVEODNEXHVEQzREJywgJ1x1RDgzRFx1REM0RScsICdcdUQ4M0RcdURFMDInLCAnXHVEODNEXHVERTJFJywgJ1x1RDgzRFx1REUyMiddXG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgaXQoJ2Rlc2VsZWN0cyBhbnkgc2VsZWN0ZWQgZW1vamknLCAoKSA9PiB7XG4gICAgICBjb25zdCByb290U3RhdGUgPSBnZXRSb290U3RhdGUoXG4gICAgICAgIHN0YXRlV2l0aE9wZW5DdXN0b21pemF0aW9uTW9kYWxBbmRTZWxlY3RlZEVtb2ppXG4gICAgICApO1xuICAgICAgY29uc3QgYWN0aW9uID0gZ2V0QWN0aW9uKHJvb3RTdGF0ZSk7XG4gICAgICBjb25zdCByZXN1bHQgPSByZWR1Y2VyKHJvb3RTdGF0ZS5wcmVmZXJyZWRSZWFjdGlvbnMsIGFjdGlvbik7XG5cbiAgICAgIGFzc2VydC5pc1VuZGVmaW5lZChcbiAgICAgICAgcmVzdWx0LmN1c3RvbWl6ZVByZWZlcnJlZFJlYWN0aW9uc01vZGFsPy5zZWxlY3RlZERyYWZ0RW1vamlJbmRleFxuICAgICAgKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ3NhdmVQcmVmZXJyZWRSZWFjdGlvbnMnLCAoKSA9PiB7XG4gICAgY29uc3QgeyBzYXZlUHJlZmVycmVkUmVhY3Rpb25zIH0gPSBhY3Rpb25zO1xuXG4gICAgLy8gV2Ugd2FudCB0byBjcmVhdGUgYSBmYWtlIENvbnZlcnNhdGlvbkNvbnRyb2xsZXIgZm9yIHRlc3RpbmcgcHVycG9zZXMsIGFuZCB3ZSBuZWVkXG4gICAgLy8gICB0byBzaWRlc3RlcCB0eXBlY2hlY2tpbmcgdG8gZG8gdGhhdC5cbiAgICAvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55ICovXG5cbiAgICBsZXQgc3RvcmFnZVB1dFN0dWI6IHNpbm9uLlNpbm9uU3R1YjtcbiAgICBsZXQgY2FwdHVyZUNoYW5nZVN0dWI6IHNpbm9uLlNpbm9uU3R1YjtcbiAgICBsZXQgb2xkQ29udmVyc2F0aW9uQ29udHJvbGxlcjogYW55O1xuXG4gICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICBzdG9yYWdlUHV0U3R1YiA9IHNpbm9uU2FuZGJveC5zdHViKHdpbmRvdy5zdG9yYWdlLCAncHV0JykucmVzb2x2ZXMoKTtcblxuICAgICAgb2xkQ29udmVyc2F0aW9uQ29udHJvbGxlciA9IHdpbmRvdy5Db252ZXJzYXRpb25Db250cm9sbGVyO1xuXG4gICAgICBjYXB0dXJlQ2hhbmdlU3R1YiA9IHNpbm9uU2FuZGJveC5zdHViKCk7XG4gICAgICB3aW5kb3cuQ29udmVyc2F0aW9uQ29udHJvbGxlciA9IHtcbiAgICAgICAgZ2V0T3VyQ29udmVyc2F0aW9uT3JUaHJvdzogKCk6IGFueSA9PiAoe1xuICAgICAgICAgIGNhcHR1cmVDaGFuZ2U6IGNhcHR1cmVDaGFuZ2VTdHViLFxuICAgICAgICB9KSxcbiAgICAgIH0gYXMgYW55O1xuICAgIH0pO1xuXG4gICAgYWZ0ZXJFYWNoKCgpID0+IHtcbiAgICAgIHdpbmRvdy5Db252ZXJzYXRpb25Db250cm9sbGVyID0gb2xkQ29udmVyc2F0aW9uQ29udHJvbGxlcjtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCd0aHVuaycsICgpID0+IHtcbiAgICAgIGl0KCdzYXZlcyB0aGUgcHJlZmVycmVkIHJlYWN0aW9uIGVtb2ppIHRvIGxvY2FsIHN0b3JhZ2UnLCBhc3luYyAoKSA9PiB7XG4gICAgICAgIGF3YWl0IHNhdmVQcmVmZXJyZWRSZWFjdGlvbnMoKShcbiAgICAgICAgICBzaW5vbi5zcHkoKSxcbiAgICAgICAgICAoKSA9PiBnZXRSb290U3RhdGUoc3RhdGVXaXRoT3BlbkN1c3RvbWl6YXRpb25Nb2RhbCksXG4gICAgICAgICAgbnVsbFxuICAgICAgICApO1xuXG4gICAgICAgIHNpbm9uLmFzc2VydC5jYWxsZWRXaXRoKFxuICAgICAgICAgIHN0b3JhZ2VQdXRTdHViLFxuICAgICAgICAgICdwcmVmZXJyZWRSZWFjdGlvbkVtb2ppJyxcbiAgICAgICAgICBzdGF0ZVdpdGhPcGVuQ3VzdG9taXphdGlvbk1vZGFsLmN1c3RvbWl6ZVByZWZlcnJlZFJlYWN0aW9uc01vZGFsXG4gICAgICAgICAgICAuZHJhZnRQcmVmZXJyZWRSZWFjdGlvbnNcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnb24gc3VjY2VzcywgZW5xdWV1ZXMgYSBzdG9yYWdlIHNlcnZpY2UgdXBsb2FkJywgYXN5bmMgKCkgPT4ge1xuICAgICAgICBhd2FpdCBzYXZlUHJlZmVycmVkUmVhY3Rpb25zKCkoXG4gICAgICAgICAgc2lub24uc3B5KCksXG4gICAgICAgICAgKCkgPT4gZ2V0Um9vdFN0YXRlKHN0YXRlV2l0aE9wZW5DdXN0b21pemF0aW9uTW9kYWwpLFxuICAgICAgICAgIG51bGxcbiAgICAgICAgKTtcblxuICAgICAgICBzaW5vbi5hc3NlcnQuY2FsbGVkT25jZShjYXB0dXJlQ2hhbmdlU3R1Yik7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ29uIHN1Y2Nlc3MsIGRpc3BhdGNoZXMgYSBwZW5kaW5nIGFjdGlvbiBmb2xsb3dlZCBieSBhIGZ1bGZpbGxlZCBhY3Rpb24nLCBhc3luYyAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGRpc3BhdGNoID0gc2lub24uc3B5KCk7XG4gICAgICAgIGF3YWl0IHNhdmVQcmVmZXJyZWRSZWFjdGlvbnMoKShcbiAgICAgICAgICBkaXNwYXRjaCxcbiAgICAgICAgICAoKSA9PiBnZXRSb290U3RhdGUoc3RhdGVXaXRoT3BlbkN1c3RvbWl6YXRpb25Nb2RhbCksXG4gICAgICAgICAgbnVsbFxuICAgICAgICApO1xuXG4gICAgICAgIHNpbm9uLmFzc2VydC5jYWxsZWRUd2ljZShkaXNwYXRjaCk7XG4gICAgICAgIHNpbm9uLmFzc2VydC5jYWxsZWRXaXRoKGRpc3BhdGNoLCB7XG4gICAgICAgICAgdHlwZTogJ3ByZWZlcnJlZFJlYWN0aW9ucy9TQVZFX1BSRUZFUlJFRF9SRUFDVElPTlNfUEVORElORycsXG4gICAgICAgIH0pO1xuICAgICAgICBzaW5vbi5hc3NlcnQuY2FsbGVkV2l0aChkaXNwYXRjaCwge1xuICAgICAgICAgIHR5cGU6ICdwcmVmZXJyZWRSZWFjdGlvbnMvU0FWRV9QUkVGRVJSRURfUkVBQ1RJT05TX0ZVTEZJTExFRCcsXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdvbiBmYWlsdXJlLCBkaXNwYXRjaGVzIGEgcGVuZGluZyBhY3Rpb24gZm9sbG93ZWQgYnkgYSByZWplY3RlZCBhY3Rpb24nLCBhc3luYyAoKSA9PiB7XG4gICAgICAgIHN0b3JhZ2VQdXRTdHViLnJlamVjdHMobmV3IEVycm9yKCdzb21ldGhpbmcgd2VudCB3cm9uZycpKTtcblxuICAgICAgICBjb25zdCBkaXNwYXRjaCA9IHNpbm9uLnNweSgpO1xuICAgICAgICBhd2FpdCBzYXZlUHJlZmVycmVkUmVhY3Rpb25zKCkoXG4gICAgICAgICAgZGlzcGF0Y2gsXG4gICAgICAgICAgKCkgPT4gZ2V0Um9vdFN0YXRlKHN0YXRlV2l0aE9wZW5DdXN0b21pemF0aW9uTW9kYWwpLFxuICAgICAgICAgIG51bGxcbiAgICAgICAgKTtcblxuICAgICAgICBzaW5vbi5hc3NlcnQuY2FsbGVkVHdpY2UoZGlzcGF0Y2gpO1xuICAgICAgICBzaW5vbi5hc3NlcnQuY2FsbGVkV2l0aChkaXNwYXRjaCwge1xuICAgICAgICAgIHR5cGU6ICdwcmVmZXJyZWRSZWFjdGlvbnMvU0FWRV9QUkVGRVJSRURfUkVBQ1RJT05TX1BFTkRJTkcnLFxuICAgICAgICB9KTtcbiAgICAgICAgc2lub24uYXNzZXJ0LmNhbGxlZFdpdGgoZGlzcGF0Y2gsIHtcbiAgICAgICAgICB0eXBlOiAncHJlZmVycmVkUmVhY3Rpb25zL1NBVkVfUFJFRkVSUkVEX1JFQUNUSU9OU19SRUpFQ1RFRCcsXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdvbiBmYWlsdXJlLCBkb2VzIG5vdCBlbnF1ZXVlIGEgc3RvcmFnZSBzZXJ2aWNlIHVwbG9hZCcsIGFzeW5jICgpID0+IHtcbiAgICAgICAgc3RvcmFnZVB1dFN0dWIucmVqZWN0cyhuZXcgRXJyb3IoJ3NvbWV0aGluZyB3ZW50IHdyb25nJykpO1xuXG4gICAgICAgIGF3YWl0IHNhdmVQcmVmZXJyZWRSZWFjdGlvbnMoKShcbiAgICAgICAgICBzaW5vbi5zcHkoKSxcbiAgICAgICAgICAoKSA9PiBnZXRSb290U3RhdGUoc3RhdGVXaXRoT3BlbkN1c3RvbWl6YXRpb25Nb2RhbCksXG4gICAgICAgICAgbnVsbFxuICAgICAgICApO1xuXG4gICAgICAgIHNpbm9uLmFzc2VydC5ub3RDYWxsZWQoY2FwdHVyZUNoYW5nZVN0dWIpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnU0FWRV9QUkVGRVJSRURfUkVBQ1RJT05TX0ZVTEZJTExFRCcsICgpID0+IHtcbiAgICAgIGNvbnN0IGFjdGlvbiA9IHtcbiAgICAgICAgdHlwZTogJ3ByZWZlcnJlZFJlYWN0aW9ucy9TQVZFX1BSRUZFUlJFRF9SRUFDVElPTlNfRlVMRklMTEVEJyBhcyBjb25zdCxcbiAgICAgIH07XG5cbiAgICAgIGl0KFwiZG9lcyBub3RoaW5nIGlmIHRoZSBtb2RhbCBpc24ndCBvcGVuXCIsICgpID0+IHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gcmVkdWNlcihnZXRFbXB0eVN0YXRlKCksIGFjdGlvbik7XG5cbiAgICAgICAgYXNzZXJ0Lm5vdFByb3BlcnR5KHJlc3VsdCwgJ2N1c3RvbWl6ZVByZWZlcnJlZFJlYWN0aW9uc01vZGFsJyk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ2Nsb3NlcyB0aGUgbW9kYWwgaWYgb3BlbicsICgpID0+IHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gcmVkdWNlcihzdGF0ZVdpdGhPcGVuQ3VzdG9taXphdGlvbk1vZGFsLCBhY3Rpb24pO1xuXG4gICAgICAgIGFzc2VydC5ub3RQcm9wZXJ0eShyZXN1bHQsICdjdXN0b21pemVQcmVmZXJyZWRSZWFjdGlvbnNNb2RhbCcpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnU0FWRV9QUkVGRVJSRURfUkVBQ1RJT05TX1BFTkRJTkcnLCAoKSA9PiB7XG4gICAgICBjb25zdCBhY3Rpb24gPSB7XG4gICAgICAgIHR5cGU6ICdwcmVmZXJyZWRSZWFjdGlvbnMvU0FWRV9QUkVGRVJSRURfUkVBQ1RJT05TX1BFTkRJTkcnIGFzIGNvbnN0LFxuICAgICAgfTtcblxuICAgICAgaXQoJ21hcmtzIHRoZSBtb2RhbCBhcyBcInNhdmluZ1wiJywgKCkgPT4ge1xuICAgICAgICBjb25zdCByZXN1bHQgPSByZWR1Y2VyKHN0YXRlV2l0aE9wZW5DdXN0b21pemF0aW9uTW9kYWwsIGFjdGlvbik7XG5cbiAgICAgICAgYXNzZXJ0LmlzVHJ1ZShyZXN1bHQuY3VzdG9taXplUHJlZmVycmVkUmVhY3Rpb25zTW9kYWw/LmlzU2F2aW5nKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnY2xlYXJzIGFueSBwcmV2aW91cyBlcnJvcnMnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHN0YXRlID0ge1xuICAgICAgICAgIC4uLnN0YXRlV2l0aE9wZW5DdXN0b21pemF0aW9uTW9kYWwsXG4gICAgICAgICAgY3VzdG9taXplUHJlZmVycmVkUmVhY3Rpb25zTW9kYWw6IHtcbiAgICAgICAgICAgIC4uLnN0YXRlV2l0aE9wZW5DdXN0b21pemF0aW9uTW9kYWwuY3VzdG9taXplUHJlZmVycmVkUmVhY3Rpb25zTW9kYWwsXG4gICAgICAgICAgICBoYWRTYXZlRXJyb3I6IHRydWUsXG4gICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gcmVkdWNlcihzdGF0ZSwgYWN0aW9uKTtcblxuICAgICAgICBhc3NlcnQuaXNGYWxzZShyZXN1bHQuY3VzdG9taXplUHJlZmVycmVkUmVhY3Rpb25zTW9kYWw/LmhhZFNhdmVFcnJvcik7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ2Rlc2VsZWN0cyBhbnkgc2VsZWN0ZWQgZW1vamknLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHJlZHVjZXIoXG4gICAgICAgICAgc3RhdGVXaXRoT3BlbkN1c3RvbWl6YXRpb25Nb2RhbEFuZFNlbGVjdGVkRW1vamksXG4gICAgICAgICAgYWN0aW9uXG4gICAgICAgICk7XG5cbiAgICAgICAgYXNzZXJ0LmlzVW5kZWZpbmVkKFxuICAgICAgICAgIHJlc3VsdC5jdXN0b21pemVQcmVmZXJyZWRSZWFjdGlvbnNNb2RhbD8uc2VsZWN0ZWREcmFmdEVtb2ppSW5kZXhcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ1NBVkVfUFJFRkVSUkVEX1JFQUNUSU9OU19SRUpFQ1RFRCcsICgpID0+IHtcbiAgICAgIGNvbnN0IGFjdGlvbiA9IHtcbiAgICAgICAgdHlwZTogJ3ByZWZlcnJlZFJlYWN0aW9ucy9TQVZFX1BSRUZFUlJFRF9SRUFDVElPTlNfUkVKRUNURUQnIGFzIGNvbnN0LFxuICAgICAgfTtcblxuICAgICAgaXQoXCJkb2VzIG5vdGhpbmcgaWYgdGhlIG1vZGFsIGlzbid0IG9wZW5cIiwgKCkgPT4ge1xuICAgICAgICBjb25zdCBzdGF0ZSA9IGdldEVtcHR5U3RhdGUoKTtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gcmVkdWNlcihzdGF0ZSwgYWN0aW9uKTtcblxuICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwocmVzdWx0LCBzdGF0ZSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3N0b3BzIGxvYWRpbmcnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHJlZHVjZXIoc3RhdGVXaXRoT3BlbkN1c3RvbWl6YXRpb25Nb2RhbCwgYWN0aW9uKTtcblxuICAgICAgICBhc3NlcnQuaXNGYWxzZShyZXN1bHQuY3VzdG9taXplUHJlZmVycmVkUmVhY3Rpb25zTW9kYWw/LmlzU2F2aW5nKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnc2F2ZXMgdGhhdCB0aGVyZSB3YXMgYW4gZXJyb3InLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHJlZHVjZXIoc3RhdGVXaXRoT3BlbkN1c3RvbWl6YXRpb25Nb2RhbCwgYWN0aW9uKTtcblxuICAgICAgICBhc3NlcnQuaXNUcnVlKHJlc3VsdC5jdXN0b21pemVQcmVmZXJyZWRSZWFjdGlvbnNNb2RhbD8uaGFkU2F2ZUVycm9yKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnc2VsZWN0RHJhZnRFbW9qaVRvQmVSZXBsYWNlZCcsICgpID0+IHtcbiAgICBjb25zdCB7IHNlbGVjdERyYWZ0RW1vamlUb0JlUmVwbGFjZWQgfSA9IGFjdGlvbnM7XG5cbiAgICBpdCgnaXMgYSBuby1vcCBpZiB0aGUgY3VzdG9taXphdGlvbiBtb2RhbCBpcyBub3Qgb3BlbicsICgpID0+IHtcbiAgICAgIGNvbnN0IHN0YXRlID0gZ2V0RW1wdHlTdGF0ZSgpO1xuICAgICAgY29uc3QgYWN0aW9uID0gc2VsZWN0RHJhZnRFbW9qaVRvQmVSZXBsYWNlZCgyKTtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IHJlZHVjZXIoc3RhdGUsIGFjdGlvbik7XG5cbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChyZXN1bHQsIHN0YXRlKTtcbiAgICB9KTtcblxuICAgIGl0KCdpcyBhIG5vLW9wIGlmIHRoZSBpbmRleCBpcyBvdXQgb2YgcmFuZ2UnLCAoKSA9PiB7XG4gICAgICBjb25zdCBhY3Rpb24gPSBzZWxlY3REcmFmdEVtb2ppVG9CZVJlcGxhY2VkKDk5KTtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IHJlZHVjZXIoc3RhdGVXaXRoT3BlbkN1c3RvbWl6YXRpb25Nb2RhbCwgYWN0aW9uKTtcblxuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKHJlc3VsdCwgc3RhdGVXaXRoT3BlbkN1c3RvbWl6YXRpb25Nb2RhbCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2V0cyB0aGUgaW5kZXggYXMgdGhlIHNlbGVjdGVkIG9uZScsICgpID0+IHtcbiAgICAgIGNvbnN0IGFjdGlvbiA9IHNlbGVjdERyYWZ0RW1vamlUb0JlUmVwbGFjZWQoMyk7XG4gICAgICBjb25zdCByZXN1bHQgPSByZWR1Y2VyKHN0YXRlV2l0aE9wZW5DdXN0b21pemF0aW9uTW9kYWwsIGFjdGlvbik7XG5cbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgICAgcmVzdWx0LmN1c3RvbWl6ZVByZWZlcnJlZFJlYWN0aW9uc01vZGFsPy5zZWxlY3RlZERyYWZ0RW1vamlJbmRleCxcbiAgICAgICAgM1xuICAgICAgKTtcbiAgICB9KTtcbiAg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
