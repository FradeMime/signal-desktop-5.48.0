var import_chai = require("chai");
var import_preferredReactionEmoji = require("../../reactions/preferredReactionEmoji");
describe("preferred reaction emoji utilities", () => {
  describe("getPreferredReactionEmoji", () => {
    const defaultsForSkinTone2 = ["\u2764\uFE0F", "\u{1F44D}\u{1F3FC}", "\u{1F44E}\u{1F3FC}", "\u{1F602}", "\u{1F62E}", "\u{1F622}"];
    it("returns the default set if passed a non-array", () => {
      [void 0, null, "\u2764\uFE0F\u{1F44D}\u{1F3FC}\u{1F44E}\u{1F3FC}\u{1F602}\u{1F62E}\u{1F622}"].forEach((input) => {
        import_chai.assert.deepStrictEqual((0, import_preferredReactionEmoji.getPreferredReactionEmoji)(input, 2), defaultsForSkinTone2);
      });
    });
    it("returns the default set if passed an empty array", () => {
      import_chai.assert.deepStrictEqual((0, import_preferredReactionEmoji.getPreferredReactionEmoji)([], 2), defaultsForSkinTone2);
    });
    it("falls back to defaults if passed an array that is too short", () => {
      const input = ["\u2728", "\u2747\uFE0F"];
      const expected = ["\u2728", "\u2747\uFE0F", "\u{1F44E}\u{1F3FD}", "\u{1F602}", "\u{1F62E}", "\u{1F622}"];
      import_chai.assert.deepStrictEqual((0, import_preferredReactionEmoji.getPreferredReactionEmoji)(input, 3), expected);
    });
    it("falls back to defaults when passed an array with some invalid values", () => {
      const input = ["\u2728", "invalid", "\u{1F387}", "\u{1F988}", void 0, ""];
      const expected = ["\u2728", "\u{1F44D}\u{1F3FC}", "\u{1F387}", "\u{1F988}", "\u{1F62E}", "\u{1F622}"];
      import_chai.assert.deepStrictEqual((0, import_preferredReactionEmoji.getPreferredReactionEmoji)(input, 2), expected);
    });
    it("returns a custom set if passed a valid value", () => {
      const input = ["\u2728", "\u2747\uFE0F", "\u{1F387}", "\u{1F988}", "\u{1F496}", "\u{1F17F}\uFE0F"];
      import_chai.assert.deepStrictEqual((0, import_preferredReactionEmoji.getPreferredReactionEmoji)(input, 3), input);
    });
    it("only returns the first few emoji if passed a value that is too long", () => {
      const expected = ["\u2728", "\u2747\uFE0F", "\u{1F387}", "\u{1F988}", "\u{1F496}", "\u{1F17F}\uFE0F"];
      const input = [...expected, "\u{1F485}", "\u{1F485}", "\u{1F485}", "\u{1F485}"];
      import_chai.assert.deepStrictEqual((0, import_preferredReactionEmoji.getPreferredReactionEmoji)(input, 3), expected);
    });
  });
  describe("canBeSynced", () => {
    it("returns false for non-arrays", () => {
      import_chai.assert.isFalse((0, import_preferredReactionEmoji.canBeSynced)(void 0));
      import_chai.assert.isFalse((0, import_preferredReactionEmoji.canBeSynced)(null));
      import_chai.assert.isFalse((0, import_preferredReactionEmoji.canBeSynced)("\u2764\uFE0F\u{1F44D}\u{1F3FC}\u{1F44E}\u{1F3FC}\u{1F602}\u{1F62E}\u{1F622}"));
    });
    it("returns false for arrays that are too long", () => {
      import_chai.assert.isFalse((0, import_preferredReactionEmoji.canBeSynced)(Array(21).fill("\u{1F98A}")));
    });
    it("returns false for arrays that have items that are too long", () => {
      const input = ["\u2728", "\u2747\uFE0F", "x".repeat(21), "\u{1F988}", "\u{1F496}", "\u{1F17F}\uFE0F"];
      import_chai.assert.isFalse((0, import_preferredReactionEmoji.canBeSynced)(input));
    });
    it("returns true for valid values", () => {
      [
        [],
        ["\u{1F485}"],
        ["\u2728", "\u2747\uFE0F", "\u{1F387}", "\u{1F988}", "\u{1F496}", "\u{1F17F}\uFE0F"],
        ["this", "array", "has", "no", "emoji", "but", "that's", "okay"]
      ].forEach((input) => {
        import_chai.assert.isTrue((0, import_preferredReactionEmoji.canBeSynced)(input));
      });
    });
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsicHJlZmVycmVkUmVhY3Rpb25FbW9qaV90ZXN0LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IGFzc2VydCB9IGZyb20gJ2NoYWknO1xuXG5pbXBvcnQge1xuICBjYW5CZVN5bmNlZCxcbiAgZ2V0UHJlZmVycmVkUmVhY3Rpb25FbW9qaSxcbn0gZnJvbSAnLi4vLi4vcmVhY3Rpb25zL3ByZWZlcnJlZFJlYWN0aW9uRW1vamknO1xuXG5kZXNjcmliZSgncHJlZmVycmVkIHJlYWN0aW9uIGVtb2ppIHV0aWxpdGllcycsICgpID0+IHtcbiAgZGVzY3JpYmUoJ2dldFByZWZlcnJlZFJlYWN0aW9uRW1vamknLCAoKSA9PiB7XG4gICAgY29uc3QgZGVmYXVsdHNGb3JTa2luVG9uZTIgPSBbJ1x1Mjc2NFx1RkUwRicsICdcdUQ4M0RcdURDNERcdUQ4M0NcdURGRkMnLCAnXHVEODNEXHVEQzRFXHVEODNDXHVERkZDJywgJ1x1RDgzRFx1REUwMicsICdcdUQ4M0RcdURFMkUnLCAnXHVEODNEXHVERTIyJ107XG5cbiAgICBpdCgncmV0dXJucyB0aGUgZGVmYXVsdCBzZXQgaWYgcGFzc2VkIGEgbm9uLWFycmF5JywgKCkgPT4ge1xuICAgICAgW3VuZGVmaW5lZCwgbnVsbCwgJ1x1Mjc2NFx1RkUwRlx1RDgzRFx1REM0RFx1RDgzQ1x1REZGQ1x1RDgzRFx1REM0RVx1RDgzQ1x1REZGQ1x1RDgzRFx1REUwMlx1RDgzRFx1REUyRVx1RDgzRFx1REUyMiddLmZvckVhY2goaW5wdXQgPT4ge1xuICAgICAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKFxuICAgICAgICAgIGdldFByZWZlcnJlZFJlYWN0aW9uRW1vamkoaW5wdXQsIDIpLFxuICAgICAgICAgIGRlZmF1bHRzRm9yU2tpblRvbmUyXG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIHRoZSBkZWZhdWx0IHNldCBpZiBwYXNzZWQgYW4gZW1wdHkgYXJyYXknLCAoKSA9PiB7XG4gICAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKFxuICAgICAgICBnZXRQcmVmZXJyZWRSZWFjdGlvbkVtb2ppKFtdLCAyKSxcbiAgICAgICAgZGVmYXVsdHNGb3JTa2luVG9uZTJcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICBpdCgnZmFsbHMgYmFjayB0byBkZWZhdWx0cyBpZiBwYXNzZWQgYW4gYXJyYXkgdGhhdCBpcyB0b28gc2hvcnQnLCAoKSA9PiB7XG4gICAgICBjb25zdCBpbnB1dCA9IFsnXHUyNzI4JywgJ1x1Mjc0N1x1RkUwRiddO1xuICAgICAgY29uc3QgZXhwZWN0ZWQgPSBbJ1x1MjcyOCcsICdcdTI3NDdcdUZFMEYnLCAnXHVEODNEXHVEQzRFXHVEODNDXHVERkZEJywgJ1x1RDgzRFx1REUwMicsICdcdUQ4M0RcdURFMkUnLCAnXHVEODNEXHVERTIyJ107XG4gICAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKGdldFByZWZlcnJlZFJlYWN0aW9uRW1vamkoaW5wdXQsIDMpLCBleHBlY3RlZCk7XG4gICAgfSk7XG5cbiAgICBpdCgnZmFsbHMgYmFjayB0byBkZWZhdWx0cyB3aGVuIHBhc3NlZCBhbiBhcnJheSB3aXRoIHNvbWUgaW52YWxpZCB2YWx1ZXMnLCAoKSA9PiB7XG4gICAgICBjb25zdCBpbnB1dCA9IFsnXHUyNzI4JywgJ2ludmFsaWQnLCAnXHVEODNDXHVERjg3JywgJ1x1RDgzRVx1REQ4OCcsIHVuZGVmaW5lZCwgJyddO1xuICAgICAgY29uc3QgZXhwZWN0ZWQgPSBbJ1x1MjcyOCcsICdcdUQ4M0RcdURDNERcdUQ4M0NcdURGRkMnLCAnXHVEODNDXHVERjg3JywgJ1x1RDgzRVx1REQ4OCcsICdcdUQ4M0RcdURFMkUnLCAnXHVEODNEXHVERTIyJ107XG4gICAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKGdldFByZWZlcnJlZFJlYWN0aW9uRW1vamkoaW5wdXQsIDIpLCBleHBlY3RlZCk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyBhIGN1c3RvbSBzZXQgaWYgcGFzc2VkIGEgdmFsaWQgdmFsdWUnLCAoKSA9PiB7XG4gICAgICBjb25zdCBpbnB1dCA9IFsnXHUyNzI4JywgJ1x1Mjc0N1x1RkUwRicsICdcdUQ4M0NcdURGODcnLCAnXHVEODNFXHVERDg4JywgJ1x1RDgzRFx1REM5NicsICdcdUQ4M0NcdUREN0ZcdUZFMEYnXTtcbiAgICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwoZ2V0UHJlZmVycmVkUmVhY3Rpb25FbW9qaShpbnB1dCwgMyksIGlucHV0KTtcbiAgICB9KTtcblxuICAgIGl0KCdvbmx5IHJldHVybnMgdGhlIGZpcnN0IGZldyBlbW9qaSBpZiBwYXNzZWQgYSB2YWx1ZSB0aGF0IGlzIHRvbyBsb25nJywgKCkgPT4ge1xuICAgICAgY29uc3QgZXhwZWN0ZWQgPSBbJ1x1MjcyOCcsICdcdTI3NDdcdUZFMEYnLCAnXHVEODNDXHVERjg3JywgJ1x1RDgzRVx1REQ4OCcsICdcdUQ4M0RcdURDOTYnLCAnXHVEODNDXHVERDdGXHVGRTBGJ107XG4gICAgICBjb25zdCBpbnB1dCA9IFsuLi5leHBlY3RlZCwgJ1x1RDgzRFx1REM4NScsICdcdUQ4M0RcdURDODUnLCAnXHVEODNEXHVEQzg1JywgJ1x1RDgzRFx1REM4NSddO1xuICAgICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChnZXRQcmVmZXJyZWRSZWFjdGlvbkVtb2ppKGlucHV0LCAzKSwgZXhwZWN0ZWQpO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnY2FuQmVTeW5jZWQnLCAoKSA9PiB7XG4gICAgaXQoJ3JldHVybnMgZmFsc2UgZm9yIG5vbi1hcnJheXMnLCAoKSA9PiB7XG4gICAgICBhc3NlcnQuaXNGYWxzZShjYW5CZVN5bmNlZCh1bmRlZmluZWQpKTtcbiAgICAgIGFzc2VydC5pc0ZhbHNlKGNhbkJlU3luY2VkKG51bGwpKTtcbiAgICAgIGFzc2VydC5pc0ZhbHNlKGNhbkJlU3luY2VkKCdcdTI3NjRcdUZFMEZcdUQ4M0RcdURDNERcdUQ4M0NcdURGRkNcdUQ4M0RcdURDNEVcdUQ4M0NcdURGRkNcdUQ4M0RcdURFMDJcdUQ4M0RcdURFMkVcdUQ4M0RcdURFMjInKSk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyBmYWxzZSBmb3IgYXJyYXlzIHRoYXQgYXJlIHRvbyBsb25nJywgKCkgPT4ge1xuICAgICAgYXNzZXJ0LmlzRmFsc2UoY2FuQmVTeW5jZWQoQXJyYXkoMjEpLmZpbGwoJ1x1RDgzRVx1REQ4QScpKSk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyBmYWxzZSBmb3IgYXJyYXlzIHRoYXQgaGF2ZSBpdGVtcyB0aGF0IGFyZSB0b28gbG9uZycsICgpID0+IHtcbiAgICAgIGNvbnN0IGlucHV0ID0gWydcdTI3MjgnLCAnXHUyNzQ3XHVGRTBGJywgJ3gnLnJlcGVhdCgyMSksICdcdUQ4M0VcdUREODgnLCAnXHVEODNEXHVEQzk2JywgJ1x1RDgzQ1x1REQ3Rlx1RkUwRiddO1xuICAgICAgYXNzZXJ0LmlzRmFsc2UoY2FuQmVTeW5jZWQoaW5wdXQpKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIHRydWUgZm9yIHZhbGlkIHZhbHVlcycsICgpID0+IHtcbiAgICAgIFtcbiAgICAgICAgW10sXG4gICAgICAgIFsnXHVEODNEXHVEQzg1J10sXG4gICAgICAgIFsnXHUyNzI4JywgJ1x1Mjc0N1x1RkUwRicsICdcdUQ4M0NcdURGODcnLCAnXHVEODNFXHVERDg4JywgJ1x1RDgzRFx1REM5NicsICdcdUQ4M0NcdUREN0ZcdUZFMEYnXSxcbiAgICAgICAgWyd0aGlzJywgJ2FycmF5JywgJ2hhcycsICdubycsICdlbW9qaScsICdidXQnLCBcInRoYXQnc1wiLCAnb2theSddLFxuICAgICAgXS5mb3JFYWNoKGlucHV0ID0+IHtcbiAgICAgICAgYXNzZXJ0LmlzVHJ1ZShjYW5CZVN5bmNlZChp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
