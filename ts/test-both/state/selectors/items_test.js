var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var import_chai = require("chai");
var import_items = require("../../../state/selectors/items");
describe("both/state/selectors/items", () => {
  function getRootState(items) {
    return {
      items
    };
  }
  describe("#getAreWeASubscriber", () => {
    it("returns false if the value is not in storage", () => {
      import_chai.assert.isFalse((0, import_items.getAreWeASubscriber)(getRootState({})));
    });
    it("returns the value in storage", () => {
      import_chai.assert.isFalse((0, import_items.getAreWeASubscriber)(getRootState({ areWeASubscriber: false })));
      import_chai.assert.isTrue((0, import_items.getAreWeASubscriber)(getRootState({ areWeASubscriber: true })));
    });
  });
  describe("#getEmojiSkinTone", () => {
    it("returns 0 if passed anything invalid", () => {
      [
        void 0,
        null,
        "2",
        [2],
        -1,
        6,
        Infinity,
        0.1,
        1.2,
        NaN
      ].forEach((skinTone) => {
        const state = getRootState({ skinTone });
        import_chai.assert.strictEqual((0, import_items.getEmojiSkinTone)(state), 0);
      });
    });
    it("returns all valid skin tones", () => {
      [0, 1, 2, 3, 4, 5].forEach((skinTone) => {
        const state = getRootState({ skinTone });
        import_chai.assert.strictEqual((0, import_items.getEmojiSkinTone)(state), skinTone);
      });
    });
  });
  describe("#getPreferredLeftPaneWidth", () => {
    it("returns a default if no value is present", () => {
      const state = getRootState({});
      import_chai.assert.strictEqual((0, import_items.getPreferredLeftPaneWidth)(state), 320);
    });
    it("returns a default value if passed something invalid", () => {
      [void 0, null, "250", [250], 250.123].forEach((preferredLeftPaneWidth) => {
        const state = getRootState({
          preferredLeftPaneWidth
        });
        import_chai.assert.strictEqual((0, import_items.getPreferredLeftPaneWidth)(state), 320);
      });
    });
    it("returns the value in storage if it is valid", () => {
      const state = getRootState({
        preferredLeftPaneWidth: 345
      });
      import_chai.assert.strictEqual((0, import_items.getPreferredLeftPaneWidth)(state), 345);
    });
  });
  describe("#getPinnedConversationIds", () => {
    it("returns pinnedConversationIds key from items", () => {
      const expected = ["one", "two"];
      const state = getRootState({
        pinnedConversationIds: expected
      });
      const actual = (0, import_items.getPinnedConversationIds)(state);
      import_chai.assert.deepEqual(actual, expected);
    });
    it("returns empty array if no saved data", () => {
      const expected = [];
      const state = getRootState({});
      const actual = (0, import_items.getPinnedConversationIds)(state);
      import_chai.assert.deepEqual(actual, expected);
    });
  });
  describe("#getPreferredReactionEmoji", () => {
    const expectedDefault = ["\u2764\uFE0F", "\u{1F44D}\u{1F3FF}", "\u{1F44E}\u{1F3FF}", "\u{1F602}", "\u{1F62E}", "\u{1F622}"];
    it("returns the default set if no value is stored", () => {
      const state = getRootState({ skinTone: 5 });
      const actual = (0, import_items.getPreferredReactionEmoji)(state);
      import_chai.assert.deepStrictEqual(actual, expectedDefault);
    });
    it("returns the default set if the stored value is invalid", () => {
      const state = getRootState({
        skinTone: 5,
        preferredReactionEmoji: ["garbage!!"]
      });
      const actual = (0, import_items.getPreferredReactionEmoji)(state);
      import_chai.assert.deepStrictEqual(actual, expectedDefault);
    });
    it("returns a custom set of emoji", () => {
      const preferredReactionEmoji = ["\u2728", "\u2747\uFE0F", "\u{1F919}\u{1F3FB}", "\u{1F988}", "\u{1F496}", "\u{1F17F}\uFE0F"];
      const state = getRootState({ skinTone: 5, preferredReactionEmoji });
      const actual = (0, import_items.getPreferredReactionEmoji)(state);
      import_chai.assert.deepStrictEqual(actual, preferredReactionEmoji);
    });
  });
  describe("#getUsernamesEnabled", () => {
    it("returns false if the flag is missing or disabled", () => {
      [
        {},
        { remoteConfig: {} },
        {
          remoteConfig: {
            "desktop.usernames": {
              name: "desktop.usernames",
              enabled: false
            }
          }
        }
      ].forEach((itemsState) => {
        const state = getRootState(itemsState);
        import_chai.assert.isFalse((0, import_items.getUsernamesEnabled)(state));
      });
    });
    it("returns true if the flag is enabled", () => {
      const state = getRootState({
        remoteConfig: {
          "desktop.usernames": {
            name: "desktop.usernames",
            enabled: true
          }
        }
      });
      import_chai.assert.isTrue((0, import_items.getUsernamesEnabled)(state));
    });
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiaXRlbXNfdGVzdC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjAtMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IGFzc2VydCB9IGZyb20gJ2NoYWknO1xuaW1wb3J0IHtcbiAgZ2V0QXJlV2VBU3Vic2NyaWJlcixcbiAgZ2V0RW1vamlTa2luVG9uZSxcbiAgZ2V0UGlubmVkQ29udmVyc2F0aW9uSWRzLFxuICBnZXRQcmVmZXJyZWRMZWZ0UGFuZVdpZHRoLFxuICBnZXRQcmVmZXJyZWRSZWFjdGlvbkVtb2ppLFxuICBnZXRVc2VybmFtZXNFbmFibGVkLFxufSBmcm9tICcuLi8uLi8uLi9zdGF0ZS9zZWxlY3RvcnMvaXRlbXMnO1xuaW1wb3J0IHR5cGUgeyBTdGF0ZVR5cGUgfSBmcm9tICcuLi8uLi8uLi9zdGF0ZS9yZWR1Y2VyJztcbmltcG9ydCB0eXBlIHsgSXRlbXNTdGF0ZVR5cGUgfSBmcm9tICcuLi8uLi8uLi9zdGF0ZS9kdWNrcy9pdGVtcyc7XG5cbmRlc2NyaWJlKCdib3RoL3N0YXRlL3NlbGVjdG9ycy9pdGVtcycsICgpID0+IHtcbiAgLy8gTm90ZTogd2Ugd291bGQgbGlrZSB0byB1c2UgdGhlIGZ1bGwgcmVkdWNlciBoZXJlLCB0byBnZXQgYSByZWFsIGVtcHR5IHN0YXRlIG9iamVjdFxuICAvLyAgIGJ1dCB3ZSBjYW5ub3QgbG9hZCB0aGUgZnVsbCByZWR1Y2VyIGluc2lkZSBvZiBlbGVjdHJvbi1tb2NoYS5cbiAgZnVuY3Rpb24gZ2V0Um9vdFN0YXRlKGl0ZW1zOiBJdGVtc1N0YXRlVHlwZSk6IFN0YXRlVHlwZSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGl0ZW1zLFxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICB9IGFzIGFueTtcbiAgfVxuXG4gIGRlc2NyaWJlKCcjZ2V0QXJlV2VBU3Vic2NyaWJlcicsICgpID0+IHtcbiAgICBpdCgncmV0dXJucyBmYWxzZSBpZiB0aGUgdmFsdWUgaXMgbm90IGluIHN0b3JhZ2UnLCAoKSA9PiB7XG4gICAgICBhc3NlcnQuaXNGYWxzZShnZXRBcmVXZUFTdWJzY3JpYmVyKGdldFJvb3RTdGF0ZSh7fSkpKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIHRoZSB2YWx1ZSBpbiBzdG9yYWdlJywgKCkgPT4ge1xuICAgICAgYXNzZXJ0LmlzRmFsc2UoXG4gICAgICAgIGdldEFyZVdlQVN1YnNjcmliZXIoZ2V0Um9vdFN0YXRlKHsgYXJlV2VBU3Vic2NyaWJlcjogZmFsc2UgfSkpXG4gICAgICApO1xuICAgICAgYXNzZXJ0LmlzVHJ1ZShcbiAgICAgICAgZ2V0QXJlV2VBU3Vic2NyaWJlcihnZXRSb290U3RhdGUoeyBhcmVXZUFTdWJzY3JpYmVyOiB0cnVlIH0pKVxuICAgICAgKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJyNnZXRFbW9qaVNraW5Ub25lJywgKCkgPT4ge1xuICAgIGl0KCdyZXR1cm5zIDAgaWYgcGFzc2VkIGFueXRoaW5nIGludmFsaWQnLCAoKSA9PiB7XG4gICAgICBbXG4gICAgICAgIC8vIEludmFsaWQgdHlwZXNcbiAgICAgICAgdW5kZWZpbmVkLFxuICAgICAgICBudWxsLFxuICAgICAgICAnMicsXG4gICAgICAgIFsyXSxcbiAgICAgICAgLy8gTnVtYmVycyBvdXQgb2YgcmFuZ2VcbiAgICAgICAgLTEsXG4gICAgICAgIDYsXG4gICAgICAgIEluZmluaXR5LFxuICAgICAgICAvLyBJbnZhbGlkIG51bWJlcnNcbiAgICAgICAgMC4xLFxuICAgICAgICAxLjIsXG4gICAgICAgIE5hTixcbiAgICAgIF0uZm9yRWFjaChza2luVG9uZSA9PiB7XG4gICAgICAgIGNvbnN0IHN0YXRlID0gZ2V0Um9vdFN0YXRlKHsgc2tpblRvbmUgfSk7XG4gICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChnZXRFbW9qaVNraW5Ub25lKHN0YXRlKSwgMCk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIGFsbCB2YWxpZCBza2luIHRvbmVzJywgKCkgPT4ge1xuICAgICAgWzAsIDEsIDIsIDMsIDQsIDVdLmZvckVhY2goc2tpblRvbmUgPT4ge1xuICAgICAgICBjb25zdCBzdGF0ZSA9IGdldFJvb3RTdGF0ZSh7IHNraW5Ub25lIH0pO1xuICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoZ2V0RW1vamlTa2luVG9uZShzdGF0ZSksIHNraW5Ub25lKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnI2dldFByZWZlcnJlZExlZnRQYW5lV2lkdGgnLCAoKSA9PiB7XG4gICAgaXQoJ3JldHVybnMgYSBkZWZhdWx0IGlmIG5vIHZhbHVlIGlzIHByZXNlbnQnLCAoKSA9PiB7XG4gICAgICBjb25zdCBzdGF0ZSA9IGdldFJvb3RTdGF0ZSh7fSk7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoZ2V0UHJlZmVycmVkTGVmdFBhbmVXaWR0aChzdGF0ZSksIDMyMCk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyBhIGRlZmF1bHQgdmFsdWUgaWYgcGFzc2VkIHNvbWV0aGluZyBpbnZhbGlkJywgKCkgPT4ge1xuICAgICAgW3VuZGVmaW5lZCwgbnVsbCwgJzI1MCcsIFsyNTBdLCAyNTAuMTIzXS5mb3JFYWNoKFxuICAgICAgICBwcmVmZXJyZWRMZWZ0UGFuZVdpZHRoID0+IHtcbiAgICAgICAgICBjb25zdCBzdGF0ZSA9IGdldFJvb3RTdGF0ZSh7XG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgICAgICAgICAgcHJlZmVycmVkTGVmdFBhbmVXaWR0aDogcHJlZmVycmVkTGVmdFBhbmVXaWR0aCBhcyBhbnksXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGdldFByZWZlcnJlZExlZnRQYW5lV2lkdGgoc3RhdGUpLCAzMjApO1xuICAgICAgICB9XG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgdGhlIHZhbHVlIGluIHN0b3JhZ2UgaWYgaXQgaXMgdmFsaWQnLCAoKSA9PiB7XG4gICAgICBjb25zdCBzdGF0ZSA9IGdldFJvb3RTdGF0ZSh7XG4gICAgICAgIHByZWZlcnJlZExlZnRQYW5lV2lkdGg6IDM0NSxcbiAgICAgIH0pO1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGdldFByZWZlcnJlZExlZnRQYW5lV2lkdGgoc3RhdGUpLCAzNDUpO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnI2dldFBpbm5lZENvbnZlcnNhdGlvbklkcycsICgpID0+IHtcbiAgICBpdCgncmV0dXJucyBwaW5uZWRDb252ZXJzYXRpb25JZHMga2V5IGZyb20gaXRlbXMnLCAoKSA9PiB7XG4gICAgICBjb25zdCBleHBlY3RlZCA9IFsnb25lJywgJ3R3byddO1xuICAgICAgY29uc3Qgc3RhdGU6IFN0YXRlVHlwZSA9IGdldFJvb3RTdGF0ZSh7XG4gICAgICAgIHBpbm5lZENvbnZlcnNhdGlvbklkczogZXhwZWN0ZWQsXG4gICAgICB9KTtcblxuICAgICAgY29uc3QgYWN0dWFsID0gZ2V0UGlubmVkQ29udmVyc2F0aW9uSWRzKHN0YXRlKTtcbiAgICAgIGFzc2VydC5kZWVwRXF1YWwoYWN0dWFsLCBleHBlY3RlZCk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyBlbXB0eSBhcnJheSBpZiBubyBzYXZlZCBkYXRhJywgKCkgPT4ge1xuICAgICAgY29uc3QgZXhwZWN0ZWQ6IEFycmF5PHN0cmluZz4gPSBbXTtcbiAgICAgIGNvbnN0IHN0YXRlID0gZ2V0Um9vdFN0YXRlKHt9KTtcblxuICAgICAgY29uc3QgYWN0dWFsID0gZ2V0UGlubmVkQ29udmVyc2F0aW9uSWRzKHN0YXRlKTtcbiAgICAgIGFzc2VydC5kZWVwRXF1YWwoYWN0dWFsLCBleHBlY3RlZCk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCcjZ2V0UHJlZmVycmVkUmVhY3Rpb25FbW9qaScsICgpID0+IHtcbiAgICAvLyBTZWUgYWxzbzogdGhlIHRlc3RzIGZvciB0aGUgYGdldFByZWZlcnJlZFJlYWN0aW9uRW1vamlgIGhlbHBlci5cblxuICAgIGNvbnN0IGV4cGVjdGVkRGVmYXVsdCA9IFsnXHUyNzY0XHVGRTBGJywgJ1x1RDgzRFx1REM0RFx1RDgzQ1x1REZGRicsICdcdUQ4M0RcdURDNEVcdUQ4M0NcdURGRkYnLCAnXHVEODNEXHVERTAyJywgJ1x1RDgzRFx1REUyRScsICdcdUQ4M0RcdURFMjInXTtcblxuICAgIGl0KCdyZXR1cm5zIHRoZSBkZWZhdWx0IHNldCBpZiBubyB2YWx1ZSBpcyBzdG9yZWQnLCAoKSA9PiB7XG4gICAgICBjb25zdCBzdGF0ZSA9IGdldFJvb3RTdGF0ZSh7IHNraW5Ub25lOiA1IH0pO1xuICAgICAgY29uc3QgYWN0dWFsID0gZ2V0UHJlZmVycmVkUmVhY3Rpb25FbW9qaShzdGF0ZSk7XG5cbiAgICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwoYWN0dWFsLCBleHBlY3RlZERlZmF1bHQpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgdGhlIGRlZmF1bHQgc2V0IGlmIHRoZSBzdG9yZWQgdmFsdWUgaXMgaW52YWxpZCcsICgpID0+IHtcbiAgICAgIGNvbnN0IHN0YXRlID0gZ2V0Um9vdFN0YXRlKHtcbiAgICAgICAgc2tpblRvbmU6IDUsXG4gICAgICAgIHByZWZlcnJlZFJlYWN0aW9uRW1vamk6IFsnZ2FyYmFnZSEhJ10sXG4gICAgICB9KTtcbiAgICAgIGNvbnN0IGFjdHVhbCA9IGdldFByZWZlcnJlZFJlYWN0aW9uRW1vamkoc3RhdGUpO1xuXG4gICAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWREZWZhdWx0KTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIGEgY3VzdG9tIHNldCBvZiBlbW9qaScsICgpID0+IHtcbiAgICAgIGNvbnN0IHByZWZlcnJlZFJlYWN0aW9uRW1vamkgPSBbJ1x1MjcyOCcsICdcdTI3NDdcdUZFMEYnLCAnXHVEODNFXHVERDE5XHVEODNDXHVERkZCJywgJ1x1RDgzRVx1REQ4OCcsICdcdUQ4M0RcdURDOTYnLCAnXHVEODNDXHVERDdGXHVGRTBGJ107XG4gICAgICBjb25zdCBzdGF0ZSA9IGdldFJvb3RTdGF0ZSh7IHNraW5Ub25lOiA1LCBwcmVmZXJyZWRSZWFjdGlvbkVtb2ppIH0pO1xuICAgICAgY29uc3QgYWN0dWFsID0gZ2V0UHJlZmVycmVkUmVhY3Rpb25FbW9qaShzdGF0ZSk7XG5cbiAgICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwoYWN0dWFsLCBwcmVmZXJyZWRSZWFjdGlvbkVtb2ppKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJyNnZXRVc2VybmFtZXNFbmFibGVkJywgKCkgPT4ge1xuICAgIGl0KCdyZXR1cm5zIGZhbHNlIGlmIHRoZSBmbGFnIGlzIG1pc3Npbmcgb3IgZGlzYWJsZWQnLCAoKSA9PiB7XG4gICAgICBbXG4gICAgICAgIHt9LFxuICAgICAgICB7IHJlbW90ZUNvbmZpZzoge30gfSxcbiAgICAgICAge1xuICAgICAgICAgIHJlbW90ZUNvbmZpZzoge1xuICAgICAgICAgICAgJ2Rlc2t0b3AudXNlcm5hbWVzJzoge1xuICAgICAgICAgICAgICBuYW1lOiAnZGVza3RvcC51c2VybmFtZXMnIGFzIGNvbnN0LFxuICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIF0uZm9yRWFjaChpdGVtc1N0YXRlID0+IHtcbiAgICAgICAgY29uc3Qgc3RhdGUgPSBnZXRSb290U3RhdGUoaXRlbXNTdGF0ZSk7XG4gICAgICAgIGFzc2VydC5pc0ZhbHNlKGdldFVzZXJuYW1lc0VuYWJsZWQoc3RhdGUpKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgdHJ1ZSBpZiB0aGUgZmxhZyBpcyBlbmFibGVkJywgKCkgPT4ge1xuICAgICAgY29uc3Qgc3RhdGUgPSBnZXRSb290U3RhdGUoe1xuICAgICAgICByZW1vdGVDb25maWc6IHtcbiAgICAgICAgICAnZGVza3RvcC51c2VybmFtZXMnOiB7XG4gICAgICAgICAgICBuYW1lOiAnZGVza3RvcC51c2VybmFtZXMnIGFzIGNvbnN0LFxuICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgICBhc3NlcnQuaXNUcnVlKGdldFVzZXJuYW1lc0VuYWJsZWQoc3RhdGUpKTtcbiAgICB9KTtcbiAgfSk7XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7O0FBR0Esa0JBQXVCO0FBQ3ZCLG1CQU9PO0FBSVAsU0FBUyw4QkFBOEIsTUFBTTtBQUczQyx3QkFBc0IsT0FBa0M7QUFDdEQsV0FBTztBQUFBLE1BQ0w7QUFBQSxJQUVGO0FBQUEsRUFDRjtBQUxTLEFBT1QsV0FBUyx3QkFBd0IsTUFBTTtBQUNyQyxPQUFHLGdEQUFnRCxNQUFNO0FBQ3ZELHlCQUFPLFFBQVEsc0NBQW9CLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUFBLElBQ3RELENBQUM7QUFFRCxPQUFHLGdDQUFnQyxNQUFNO0FBQ3ZDLHlCQUFPLFFBQ0wsc0NBQW9CLGFBQWEsRUFBRSxrQkFBa0IsTUFBTSxDQUFDLENBQUMsQ0FDL0Q7QUFDQSx5QkFBTyxPQUNMLHNDQUFvQixhQUFhLEVBQUUsa0JBQWtCLEtBQUssQ0FBQyxDQUFDLENBQzlEO0FBQUEsSUFDRixDQUFDO0FBQUEsRUFDSCxDQUFDO0FBRUQsV0FBUyxxQkFBcUIsTUFBTTtBQUNsQyxPQUFHLHdDQUF3QyxNQUFNO0FBQy9DO0FBQUEsUUFFRTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQSxDQUFDLENBQUM7QUFBQSxRQUVGO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUVBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxNQUNGLEVBQUUsUUFBUSxjQUFZO0FBQ3BCLGNBQU0sUUFBUSxhQUFhLEVBQUUsU0FBUyxDQUFDO0FBQ3ZDLDJCQUFPLFlBQVksbUNBQWlCLEtBQUssR0FBRyxDQUFDO0FBQUEsTUFDL0MsQ0FBQztBQUFBLElBQ0gsQ0FBQztBQUVELE9BQUcsZ0NBQWdDLE1BQU07QUFDdkMsT0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxFQUFFLFFBQVEsY0FBWTtBQUNyQyxjQUFNLFFBQVEsYUFBYSxFQUFFLFNBQVMsQ0FBQztBQUN2QywyQkFBTyxZQUFZLG1DQUFpQixLQUFLLEdBQUcsUUFBUTtBQUFBLE1BQ3RELENBQUM7QUFBQSxJQUNILENBQUM7QUFBQSxFQUNILENBQUM7QUFFRCxXQUFTLDhCQUE4QixNQUFNO0FBQzNDLE9BQUcsNENBQTRDLE1BQU07QUFDbkQsWUFBTSxRQUFRLGFBQWEsQ0FBQyxDQUFDO0FBQzdCLHlCQUFPLFlBQVksNENBQTBCLEtBQUssR0FBRyxHQUFHO0FBQUEsSUFDMUQsQ0FBQztBQUVELE9BQUcsdURBQXVELE1BQU07QUFDOUQsT0FBQyxRQUFXLE1BQU0sT0FBTyxDQUFDLEdBQUcsR0FBRyxPQUFPLEVBQUUsUUFDdkMsNEJBQTBCO0FBQ3hCLGNBQU0sUUFBUSxhQUFhO0FBQUEsVUFFekI7QUFBQSxRQUNGLENBQUM7QUFDRCwyQkFBTyxZQUFZLDRDQUEwQixLQUFLLEdBQUcsR0FBRztBQUFBLE1BQzFELENBQ0Y7QUFBQSxJQUNGLENBQUM7QUFFRCxPQUFHLCtDQUErQyxNQUFNO0FBQ3RELFlBQU0sUUFBUSxhQUFhO0FBQUEsUUFDekIsd0JBQXdCO0FBQUEsTUFDMUIsQ0FBQztBQUNELHlCQUFPLFlBQVksNENBQTBCLEtBQUssR0FBRyxHQUFHO0FBQUEsSUFDMUQsQ0FBQztBQUFBLEVBQ0gsQ0FBQztBQUVELFdBQVMsNkJBQTZCLE1BQU07QUFDMUMsT0FBRyxnREFBZ0QsTUFBTTtBQUN2RCxZQUFNLFdBQVcsQ0FBQyxPQUFPLEtBQUs7QUFDOUIsWUFBTSxRQUFtQixhQUFhO0FBQUEsUUFDcEMsdUJBQXVCO0FBQUEsTUFDekIsQ0FBQztBQUVELFlBQU0sU0FBUywyQ0FBeUIsS0FBSztBQUM3Qyx5QkFBTyxVQUFVLFFBQVEsUUFBUTtBQUFBLElBQ25DLENBQUM7QUFFRCxPQUFHLHdDQUF3QyxNQUFNO0FBQy9DLFlBQU0sV0FBMEIsQ0FBQztBQUNqQyxZQUFNLFFBQVEsYUFBYSxDQUFDLENBQUM7QUFFN0IsWUFBTSxTQUFTLDJDQUF5QixLQUFLO0FBQzdDLHlCQUFPLFVBQVUsUUFBUSxRQUFRO0FBQUEsSUFDbkMsQ0FBQztBQUFBLEVBQ0gsQ0FBQztBQUVELFdBQVMsOEJBQThCLE1BQU07QUFHM0MsVUFBTSxrQkFBa0IsQ0FBQyxnQkFBTSxzQkFBUSxzQkFBUSxhQUFNLGFBQU0sV0FBSTtBQUUvRCxPQUFHLGlEQUFpRCxNQUFNO0FBQ3hELFlBQU0sUUFBUSxhQUFhLEVBQUUsVUFBVSxFQUFFLENBQUM7QUFDMUMsWUFBTSxTQUFTLDRDQUEwQixLQUFLO0FBRTlDLHlCQUFPLGdCQUFnQixRQUFRLGVBQWU7QUFBQSxJQUNoRCxDQUFDO0FBRUQsT0FBRywwREFBMEQsTUFBTTtBQUNqRSxZQUFNLFFBQVEsYUFBYTtBQUFBLFFBQ3pCLFVBQVU7QUFBQSxRQUNWLHdCQUF3QixDQUFDLFdBQVc7QUFBQSxNQUN0QyxDQUFDO0FBQ0QsWUFBTSxTQUFTLDRDQUEwQixLQUFLO0FBRTlDLHlCQUFPLGdCQUFnQixRQUFRLGVBQWU7QUFBQSxJQUNoRCxDQUFDO0FBRUQsT0FBRyxpQ0FBaUMsTUFBTTtBQUN4QyxZQUFNLHlCQUF5QixDQUFDLFVBQUssZ0JBQU0sc0JBQVEsYUFBTSxhQUFNLGlCQUFLO0FBQ3BFLFlBQU0sUUFBUSxhQUFhLEVBQUUsVUFBVSxHQUFHLHVCQUF1QixDQUFDO0FBQ2xFLFlBQU0sU0FBUyw0Q0FBMEIsS0FBSztBQUU5Qyx5QkFBTyxnQkFBZ0IsUUFBUSxzQkFBc0I7QUFBQSxJQUN2RCxDQUFDO0FBQUEsRUFDSCxDQUFDO0FBRUQsV0FBUyx3QkFBd0IsTUFBTTtBQUNyQyxPQUFHLG9EQUFvRCxNQUFNO0FBQzNEO0FBQUEsUUFDRSxDQUFDO0FBQUEsUUFDRCxFQUFFLGNBQWMsQ0FBQyxFQUFFO0FBQUEsUUFDbkI7QUFBQSxVQUNFLGNBQWM7QUFBQSxZQUNaLHFCQUFxQjtBQUFBLGNBQ25CLE1BQU07QUFBQSxjQUNOLFNBQVM7QUFBQSxZQUNYO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxNQUNGLEVBQUUsUUFBUSxnQkFBYztBQUN0QixjQUFNLFFBQVEsYUFBYSxVQUFVO0FBQ3JDLDJCQUFPLFFBQVEsc0NBQW9CLEtBQUssQ0FBQztBQUFBLE1BQzNDLENBQUM7QUFBQSxJQUNILENBQUM7QUFFRCxPQUFHLHVDQUF1QyxNQUFNO0FBQzlDLFlBQU0sUUFBUSxhQUFhO0FBQUEsUUFDekIsY0FBYztBQUFBLFVBQ1oscUJBQXFCO0FBQUEsWUFDbkIsTUFBTTtBQUFBLFlBQ04sU0FBUztBQUFBLFVBQ1g7QUFBQSxRQUNGO0FBQUEsTUFDRixDQUFDO0FBQ0QseUJBQU8sT0FBTyxzQ0FBb0IsS0FBSyxDQUFDO0FBQUEsSUFDMUMsQ0FBQztBQUFBLEVBQ0gsQ0FBQztBQUNILENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
