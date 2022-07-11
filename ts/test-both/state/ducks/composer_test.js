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
var import_composer = require("../../../state/ducks/composer");
var import_noop = require("../../../state/ducks/noop");
var import_reducer = require("../../../state/reducer");
var import_MIME = require("../../../types/MIME");
var import_fakeAttachment = require("../../helpers/fakeAttachment");
describe("both/state/ducks/composer", () => {
  const QUOTED_MESSAGE = {
    conversationId: "123",
    quote: {
      attachments: [],
      id: 456,
      isViewOnce: false,
      isGiftBadge: false,
      messageId: "789",
      referencedMessageNotFound: false
    }
  };
  const getRootStateFunction = /* @__PURE__ */ __name((selectedConversationId) => {
    const state = (0, import_reducer.reducer)(void 0, (0, import_noop.noopAction)());
    return () => ({
      ...state,
      conversations: {
        ...state.conversations,
        selectedConversationId
      }
    });
  }, "getRootStateFunction");
  describe("replaceAttachments", () => {
    it("replaces the attachments state", () => {
      const { replaceAttachments } = import_composer.actions;
      const dispatch = sinon.spy();
      const attachments = [
        {
          contentType: import_MIME.IMAGE_JPEG,
          pending: true,
          size: 2433,
          path: "image.jpg"
        }
      ];
      replaceAttachments("123", attachments)(dispatch, getRootStateFunction("123"), null);
      const action = dispatch.getCall(0).args[0];
      const state = (0, import_composer.reducer)((0, import_composer.getEmptyState)(), action);
      import_chai.assert.deepEqual(state.attachments, attachments);
    });
    it("sets the high quality setting to false when there are no attachments", () => {
      const { replaceAttachments } = import_composer.actions;
      const dispatch = sinon.spy();
      const attachments = [];
      replaceAttachments("123", attachments)(dispatch, getRootStateFunction("123"), null);
      const action = dispatch.getCall(0).args[0];
      const state = (0, import_composer.reducer)({
        ...(0, import_composer.getEmptyState)(),
        shouldSendHighQualityAttachments: true
      }, action);
      import_chai.assert.deepEqual(state.attachments, attachments);
      import_chai.assert.deepEqual(state.attachments, attachments);
      import_chai.assert.isFalse(state.shouldSendHighQualityAttachments);
    });
    it("does not update redux if the conversation is not selected", () => {
      const { replaceAttachments } = import_composer.actions;
      const dispatch = sinon.spy();
      const attachments = [(0, import_fakeAttachment.fakeDraftAttachment)()];
      replaceAttachments("123", attachments)(dispatch, getRootStateFunction("456"), null);
      import_chai.assert.isNull(dispatch.getCall(0));
    });
  });
  describe("resetComposer", () => {
    it("returns composer back to empty state", () => {
      const { resetComposer } = import_composer.actions;
      const nextState = (0, import_composer.reducer)({
        attachments: [],
        linkPreviewLoading: true,
        quotedMessage: QUOTED_MESSAGE,
        shouldSendHighQualityAttachments: true
      }, resetComposer());
      import_chai.assert.deepEqual(nextState, (0, import_composer.getEmptyState)());
    });
  });
  describe("setMediaQualitySetting", () => {
    it("toggles the media quality setting", () => {
      const { setMediaQualitySetting } = import_composer.actions;
      const state = (0, import_composer.getEmptyState)();
      import_chai.assert.isFalse(state.shouldSendHighQualityAttachments);
      const nextState = (0, import_composer.reducer)(state, setMediaQualitySetting(true));
      import_chai.assert.isTrue(nextState.shouldSendHighQualityAttachments);
      const nextNextState = (0, import_composer.reducer)(nextState, setMediaQualitySetting(false));
      import_chai.assert.isFalse(nextNextState.shouldSendHighQualityAttachments);
    });
  });
  describe("setQuotedMessage", () => {
    it("sets the quoted message", () => {
      const { setQuotedMessage } = import_composer.actions;
      const state = (0, import_composer.getEmptyState)();
      const nextState = (0, import_composer.reducer)(state, setQuotedMessage(QUOTED_MESSAGE));
      import_chai.assert.equal(nextState.quotedMessage?.conversationId, "123");
      import_chai.assert.equal(nextState.quotedMessage?.quote?.id, 456);
    });
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiY29tcG9zZXJfdGVzdC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyBhc3NlcnQgfSBmcm9tICdjaGFpJztcbmltcG9ydCAqIGFzIHNpbm9uIGZyb20gJ3Npbm9uJztcblxuaW1wb3J0IHsgYWN0aW9ucywgZ2V0RW1wdHlTdGF0ZSwgcmVkdWNlciB9IGZyb20gJy4uLy4uLy4uL3N0YXRlL2R1Y2tzL2NvbXBvc2VyJztcbmltcG9ydCB7IG5vb3BBY3Rpb24gfSBmcm9tICcuLi8uLi8uLi9zdGF0ZS9kdWNrcy9ub29wJztcbmltcG9ydCB7IHJlZHVjZXIgYXMgcm9vdFJlZHVjZXIgfSBmcm9tICcuLi8uLi8uLi9zdGF0ZS9yZWR1Y2VyJztcblxuaW1wb3J0IHsgSU1BR0VfSlBFRyB9IGZyb20gJy4uLy4uLy4uL3R5cGVzL01JTUUnO1xuaW1wb3J0IHR5cGUgeyBBdHRhY2htZW50RHJhZnRUeXBlIH0gZnJvbSAnLi4vLi4vLi4vdHlwZXMvQXR0YWNobWVudCc7XG5pbXBvcnQgeyBmYWtlRHJhZnRBdHRhY2htZW50IH0gZnJvbSAnLi4vLi4vaGVscGVycy9mYWtlQXR0YWNobWVudCc7XG5cbmRlc2NyaWJlKCdib3RoL3N0YXRlL2R1Y2tzL2NvbXBvc2VyJywgKCkgPT4ge1xuICBjb25zdCBRVU9URURfTUVTU0FHRSA9IHtcbiAgICBjb252ZXJzYXRpb25JZDogJzEyMycsXG4gICAgcXVvdGU6IHtcbiAgICAgIGF0dGFjaG1lbnRzOiBbXSxcbiAgICAgIGlkOiA0NTYsXG4gICAgICBpc1ZpZXdPbmNlOiBmYWxzZSxcbiAgICAgIGlzR2lmdEJhZGdlOiBmYWxzZSxcbiAgICAgIG1lc3NhZ2VJZDogJzc4OScsXG4gICAgICByZWZlcmVuY2VkTWVzc2FnZU5vdEZvdW5kOiBmYWxzZSxcbiAgICB9LFxuICB9O1xuXG4gIGNvbnN0IGdldFJvb3RTdGF0ZUZ1bmN0aW9uID0gKHNlbGVjdGVkQ29udmVyc2F0aW9uSWQ/OiBzdHJpbmcpID0+IHtcbiAgICBjb25zdCBzdGF0ZSA9IHJvb3RSZWR1Y2VyKHVuZGVmaW5lZCwgbm9vcEFjdGlvbigpKTtcbiAgICByZXR1cm4gKCkgPT4gKHtcbiAgICAgIC4uLnN0YXRlLFxuICAgICAgY29udmVyc2F0aW9uczoge1xuICAgICAgICAuLi5zdGF0ZS5jb252ZXJzYXRpb25zLFxuICAgICAgICBzZWxlY3RlZENvbnZlcnNhdGlvbklkLFxuICAgICAgfSxcbiAgICB9KTtcbiAgfTtcblxuICBkZXNjcmliZSgncmVwbGFjZUF0dGFjaG1lbnRzJywgKCkgPT4ge1xuICAgIGl0KCdyZXBsYWNlcyB0aGUgYXR0YWNobWVudHMgc3RhdGUnLCAoKSA9PiB7XG4gICAgICBjb25zdCB7IHJlcGxhY2VBdHRhY2htZW50cyB9ID0gYWN0aW9ucztcbiAgICAgIGNvbnN0IGRpc3BhdGNoID0gc2lub24uc3B5KCk7XG5cbiAgICAgIGNvbnN0IGF0dGFjaG1lbnRzOiBBcnJheTxBdHRhY2htZW50RHJhZnRUeXBlPiA9IFtcbiAgICAgICAge1xuICAgICAgICAgIGNvbnRlbnRUeXBlOiBJTUFHRV9KUEVHLFxuICAgICAgICAgIHBlbmRpbmc6IHRydWUsXG4gICAgICAgICAgc2l6ZTogMjQzMyxcbiAgICAgICAgICBwYXRoOiAnaW1hZ2UuanBnJyxcbiAgICAgICAgfSxcbiAgICAgIF07XG4gICAgICByZXBsYWNlQXR0YWNobWVudHMoJzEyMycsIGF0dGFjaG1lbnRzKShcbiAgICAgICAgZGlzcGF0Y2gsXG4gICAgICAgIGdldFJvb3RTdGF0ZUZ1bmN0aW9uKCcxMjMnKSxcbiAgICAgICAgbnVsbFxuICAgICAgKTtcblxuICAgICAgY29uc3QgYWN0aW9uID0gZGlzcGF0Y2guZ2V0Q2FsbCgwKS5hcmdzWzBdO1xuICAgICAgY29uc3Qgc3RhdGUgPSByZWR1Y2VyKGdldEVtcHR5U3RhdGUoKSwgYWN0aW9uKTtcbiAgICAgIGFzc2VydC5kZWVwRXF1YWwoc3RhdGUuYXR0YWNobWVudHMsIGF0dGFjaG1lbnRzKTtcbiAgICB9KTtcblxuICAgIGl0KCdzZXRzIHRoZSBoaWdoIHF1YWxpdHkgc2V0dGluZyB0byBmYWxzZSB3aGVuIHRoZXJlIGFyZSBubyBhdHRhY2htZW50cycsICgpID0+IHtcbiAgICAgIGNvbnN0IHsgcmVwbGFjZUF0dGFjaG1lbnRzIH0gPSBhY3Rpb25zO1xuICAgICAgY29uc3QgZGlzcGF0Y2ggPSBzaW5vbi5zcHkoKTtcbiAgICAgIGNvbnN0IGF0dGFjaG1lbnRzOiBBcnJheTxBdHRhY2htZW50RHJhZnRUeXBlPiA9IFtdO1xuXG4gICAgICByZXBsYWNlQXR0YWNobWVudHMoJzEyMycsIGF0dGFjaG1lbnRzKShcbiAgICAgICAgZGlzcGF0Y2gsXG4gICAgICAgIGdldFJvb3RTdGF0ZUZ1bmN0aW9uKCcxMjMnKSxcbiAgICAgICAgbnVsbFxuICAgICAgKTtcblxuICAgICAgY29uc3QgYWN0aW9uID0gZGlzcGF0Y2guZ2V0Q2FsbCgwKS5hcmdzWzBdO1xuICAgICAgY29uc3Qgc3RhdGUgPSByZWR1Y2VyKFxuICAgICAgICB7XG4gICAgICAgICAgLi4uZ2V0RW1wdHlTdGF0ZSgpLFxuICAgICAgICAgIHNob3VsZFNlbmRIaWdoUXVhbGl0eUF0dGFjaG1lbnRzOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgICBhY3Rpb25cbiAgICAgICk7XG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKHN0YXRlLmF0dGFjaG1lbnRzLCBhdHRhY2htZW50cyk7XG5cbiAgICAgIGFzc2VydC5kZWVwRXF1YWwoc3RhdGUuYXR0YWNobWVudHMsIGF0dGFjaG1lbnRzKTtcbiAgICAgIGFzc2VydC5pc0ZhbHNlKHN0YXRlLnNob3VsZFNlbmRIaWdoUXVhbGl0eUF0dGFjaG1lbnRzKTtcbiAgICB9KTtcblxuICAgIGl0KCdkb2VzIG5vdCB1cGRhdGUgcmVkdXggaWYgdGhlIGNvbnZlcnNhdGlvbiBpcyBub3Qgc2VsZWN0ZWQnLCAoKSA9PiB7XG4gICAgICBjb25zdCB7IHJlcGxhY2VBdHRhY2htZW50cyB9ID0gYWN0aW9ucztcbiAgICAgIGNvbnN0IGRpc3BhdGNoID0gc2lub24uc3B5KCk7XG5cbiAgICAgIGNvbnN0IGF0dGFjaG1lbnRzID0gW2Zha2VEcmFmdEF0dGFjaG1lbnQoKV07XG4gICAgICByZXBsYWNlQXR0YWNobWVudHMoJzEyMycsIGF0dGFjaG1lbnRzKShcbiAgICAgICAgZGlzcGF0Y2gsXG4gICAgICAgIGdldFJvb3RTdGF0ZUZ1bmN0aW9uKCc0NTYnKSxcbiAgICAgICAgbnVsbFxuICAgICAgKTtcblxuICAgICAgYXNzZXJ0LmlzTnVsbChkaXNwYXRjaC5nZXRDYWxsKDApKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ3Jlc2V0Q29tcG9zZXInLCAoKSA9PiB7XG4gICAgaXQoJ3JldHVybnMgY29tcG9zZXIgYmFjayB0byBlbXB0eSBzdGF0ZScsICgpID0+IHtcbiAgICAgIGNvbnN0IHsgcmVzZXRDb21wb3NlciB9ID0gYWN0aW9ucztcbiAgICAgIGNvbnN0IG5leHRTdGF0ZSA9IHJlZHVjZXIoXG4gICAgICAgIHtcbiAgICAgICAgICBhdHRhY2htZW50czogW10sXG4gICAgICAgICAgbGlua1ByZXZpZXdMb2FkaW5nOiB0cnVlLFxuICAgICAgICAgIHF1b3RlZE1lc3NhZ2U6IFFVT1RFRF9NRVNTQUdFLFxuICAgICAgICAgIHNob3VsZFNlbmRIaWdoUXVhbGl0eUF0dGFjaG1lbnRzOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgICByZXNldENvbXBvc2VyKClcbiAgICAgICk7XG5cbiAgICAgIGFzc2VydC5kZWVwRXF1YWwobmV4dFN0YXRlLCBnZXRFbXB0eVN0YXRlKCkpO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnc2V0TWVkaWFRdWFsaXR5U2V0dGluZycsICgpID0+IHtcbiAgICBpdCgndG9nZ2xlcyB0aGUgbWVkaWEgcXVhbGl0eSBzZXR0aW5nJywgKCkgPT4ge1xuICAgICAgY29uc3QgeyBzZXRNZWRpYVF1YWxpdHlTZXR0aW5nIH0gPSBhY3Rpb25zO1xuICAgICAgY29uc3Qgc3RhdGUgPSBnZXRFbXB0eVN0YXRlKCk7XG5cbiAgICAgIGFzc2VydC5pc0ZhbHNlKHN0YXRlLnNob3VsZFNlbmRIaWdoUXVhbGl0eUF0dGFjaG1lbnRzKTtcblxuICAgICAgY29uc3QgbmV4dFN0YXRlID0gcmVkdWNlcihzdGF0ZSwgc2V0TWVkaWFRdWFsaXR5U2V0dGluZyh0cnVlKSk7XG5cbiAgICAgIGFzc2VydC5pc1RydWUobmV4dFN0YXRlLnNob3VsZFNlbmRIaWdoUXVhbGl0eUF0dGFjaG1lbnRzKTtcblxuICAgICAgY29uc3QgbmV4dE5leHRTdGF0ZSA9IHJlZHVjZXIobmV4dFN0YXRlLCBzZXRNZWRpYVF1YWxpdHlTZXR0aW5nKGZhbHNlKSk7XG5cbiAgICAgIGFzc2VydC5pc0ZhbHNlKG5leHROZXh0U3RhdGUuc2hvdWxkU2VuZEhpZ2hRdWFsaXR5QXR0YWNobWVudHMpO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnc2V0UXVvdGVkTWVzc2FnZScsICgpID0+IHtcbiAgICBpdCgnc2V0cyB0aGUgcXVvdGVkIG1lc3NhZ2UnLCAoKSA9PiB7XG4gICAgICBjb25zdCB7IHNldFF1b3RlZE1lc3NhZ2UgfSA9IGFjdGlvbnM7XG4gICAgICBjb25zdCBzdGF0ZSA9IGdldEVtcHR5U3RhdGUoKTtcbiAgICAgIGNvbnN0IG5leHRTdGF0ZSA9IHJlZHVjZXIoc3RhdGUsIHNldFF1b3RlZE1lc3NhZ2UoUVVPVEVEX01FU1NBR0UpKTtcblxuICAgICAgYXNzZXJ0LmVxdWFsKG5leHRTdGF0ZS5xdW90ZWRNZXNzYWdlPy5jb252ZXJzYXRpb25JZCwgJzEyMycpO1xuICAgICAgYXNzZXJ0LmVxdWFsKG5leHRTdGF0ZS5xdW90ZWRNZXNzYWdlPy5xdW90ZT8uaWQsIDQ1Nik7XG4gICAgfSk7XG4gIH0pO1xufSk7XG4iXSwKICAibWFwcGluZ3MiOiAi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
