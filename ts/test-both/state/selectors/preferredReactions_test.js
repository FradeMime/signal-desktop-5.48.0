var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var import_chai = require("chai");
var import_reducer = require("../../../state/reducer");
var import_noop = require("../../../state/ducks/noop");
var import_preferredReactions = require("../../../state/selectors/preferredReactions");
describe("both/state/selectors/preferredReactions", () => {
  const getEmptyRootState = /* @__PURE__ */ __name(() => (0, import_reducer.reducer)(void 0, (0, import_noop.noopAction)()), "getEmptyRootState");
  const getRootState = /* @__PURE__ */ __name((preferredReactions) => ({
    ...getEmptyRootState(),
    preferredReactions
  }), "getRootState");
  describe("getIsCustomizingPreferredReactions", () => {
    it("returns false if the modal is closed", () => {
      import_chai.assert.isFalse((0, import_preferredReactions.getIsCustomizingPreferredReactions)(getEmptyRootState()));
    });
    it("returns true if the modal is open", () => {
      import_chai.assert.isTrue((0, import_preferredReactions.getIsCustomizingPreferredReactions)(getRootState({
        customizePreferredReactionsModal: {
          draftPreferredReactions: ["\u2728", "\u2747\uFE0F", "\u{1F387}", "\u{1F988}", "\u{1F496}", "\u{1F17F}\uFE0F"],
          originalPreferredReactions: ["\u{1F499}", "\u{1F44D}", "\u{1F44E}", "\u{1F602}", "\u{1F62E}", "\u{1F622}"],
          selectedDraftEmojiIndex: void 0,
          isSaving: false,
          hadSaveError: false
        }
      })));
    });
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsicHJlZmVycmVkUmVhY3Rpb25zX3Rlc3QudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSAnY2hhaSc7XG5pbXBvcnQgeyByZWR1Y2VyIGFzIHJvb3RSZWR1Y2VyIH0gZnJvbSAnLi4vLi4vLi4vc3RhdGUvcmVkdWNlcic7XG5pbXBvcnQgeyBub29wQWN0aW9uIH0gZnJvbSAnLi4vLi4vLi4vc3RhdGUvZHVja3Mvbm9vcCc7XG5pbXBvcnQgdHlwZSB7IFN0YXRlVHlwZSB9IGZyb20gJy4uLy4uLy4uL3N0YXRlL3JlZHVjZXInO1xuaW1wb3J0IHR5cGUgeyBQcmVmZXJyZWRSZWFjdGlvbnNTdGF0ZVR5cGUgfSBmcm9tICcuLi8uLi8uLi9zdGF0ZS9kdWNrcy9wcmVmZXJyZWRSZWFjdGlvbnMnO1xuXG5pbXBvcnQgeyBnZXRJc0N1c3RvbWl6aW5nUHJlZmVycmVkUmVhY3Rpb25zIH0gZnJvbSAnLi4vLi4vLi4vc3RhdGUvc2VsZWN0b3JzL3ByZWZlcnJlZFJlYWN0aW9ucyc7XG5cbmRlc2NyaWJlKCdib3RoL3N0YXRlL3NlbGVjdG9ycy9wcmVmZXJyZWRSZWFjdGlvbnMnLCAoKSA9PiB7XG4gIGNvbnN0IGdldEVtcHR5Um9vdFN0YXRlID0gKCk6IFN0YXRlVHlwZSA9PlxuICAgIHJvb3RSZWR1Y2VyKHVuZGVmaW5lZCwgbm9vcEFjdGlvbigpKTtcblxuICBjb25zdCBnZXRSb290U3RhdGUgPSAocHJlZmVycmVkUmVhY3Rpb25zOiBQcmVmZXJyZWRSZWFjdGlvbnNTdGF0ZVR5cGUpID0+ICh7XG4gICAgLi4uZ2V0RW1wdHlSb290U3RhdGUoKSxcbiAgICBwcmVmZXJyZWRSZWFjdGlvbnMsXG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdnZXRJc0N1c3RvbWl6aW5nUHJlZmVycmVkUmVhY3Rpb25zJywgKCkgPT4ge1xuICAgIGl0KCdyZXR1cm5zIGZhbHNlIGlmIHRoZSBtb2RhbCBpcyBjbG9zZWQnLCAoKSA9PiB7XG4gICAgICBhc3NlcnQuaXNGYWxzZShnZXRJc0N1c3RvbWl6aW5nUHJlZmVycmVkUmVhY3Rpb25zKGdldEVtcHR5Um9vdFN0YXRlKCkpKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIHRydWUgaWYgdGhlIG1vZGFsIGlzIG9wZW4nLCAoKSA9PiB7XG4gICAgICBhc3NlcnQuaXNUcnVlKFxuICAgICAgICBnZXRJc0N1c3RvbWl6aW5nUHJlZmVycmVkUmVhY3Rpb25zKFxuICAgICAgICAgIGdldFJvb3RTdGF0ZSh7XG4gICAgICAgICAgICBjdXN0b21pemVQcmVmZXJyZWRSZWFjdGlvbnNNb2RhbDoge1xuICAgICAgICAgICAgICBkcmFmdFByZWZlcnJlZFJlYWN0aW9uczogWydcdTI3MjgnLCAnXHUyNzQ3XHVGRTBGJywgJ1x1RDgzQ1x1REY4NycsICdcdUQ4M0VcdUREODgnLCAnXHVEODNEXHVEQzk2JywgJ1x1RDgzQ1x1REQ3Rlx1RkUwRiddLFxuICAgICAgICAgICAgICBvcmlnaW5hbFByZWZlcnJlZFJlYWN0aW9uczogWydcdUQ4M0RcdURDOTknLCAnXHVEODNEXHVEQzREJywgJ1x1RDgzRFx1REM0RScsICdcdUQ4M0RcdURFMDInLCAnXHVEODNEXHVERTJFJywgJ1x1RDgzRFx1REUyMiddLFxuICAgICAgICAgICAgICBzZWxlY3RlZERyYWZ0RW1vamlJbmRleDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICBpc1NhdmluZzogZmFsc2UgYXMgY29uc3QsXG4gICAgICAgICAgICAgIGhhZFNhdmVFcnJvcjogZmFsc2UsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0pXG4gICAgICAgIClcbiAgICAgICk7XG4gICAgfSk7XG4gIH0pO1xufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiOztBQUdBLGtCQUF1QjtBQUN2QixxQkFBdUM7QUFDdkMsa0JBQTJCO0FBSTNCLGdDQUFtRDtBQUVuRCxTQUFTLDJDQUEyQyxNQUFNO0FBQ3hELFFBQU0sb0JBQW9CLDZCQUN4Qiw0QkFBWSxRQUFXLDRCQUFXLENBQUMsR0FEWDtBQUcxQixRQUFNLGVBQWUsd0JBQUMsdUJBQXFEO0FBQUEsT0FDdEUsa0JBQWtCO0FBQUEsSUFDckI7QUFBQSxFQUNGLElBSHFCO0FBS3JCLFdBQVMsc0NBQXNDLE1BQU07QUFDbkQsT0FBRyx3Q0FBd0MsTUFBTTtBQUMvQyx5QkFBTyxRQUFRLGtFQUFtQyxrQkFBa0IsQ0FBQyxDQUFDO0FBQUEsSUFDeEUsQ0FBQztBQUVELE9BQUcscUNBQXFDLE1BQU07QUFDNUMseUJBQU8sT0FDTCxrRUFDRSxhQUFhO0FBQUEsUUFDWCxrQ0FBa0M7QUFBQSxVQUNoQyx5QkFBeUIsQ0FBQyxVQUFLLGdCQUFNLGFBQU0sYUFBTSxhQUFNLGlCQUFLO0FBQUEsVUFDNUQsNEJBQTRCLENBQUMsYUFBTSxhQUFNLGFBQU0sYUFBTSxhQUFNLFdBQUk7QUFBQSxVQUMvRCx5QkFBeUI7QUFBQSxVQUN6QixVQUFVO0FBQUEsVUFDVixjQUFjO0FBQUEsUUFDaEI7QUFBQSxNQUNGLENBQUMsQ0FDSCxDQUNGO0FBQUEsSUFDRixDQUFDO0FBQUEsRUFDSCxDQUFDO0FBQ0gsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
