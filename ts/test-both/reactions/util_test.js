var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var import_chai = require("chai");
var import_uuid = require("uuid");
var import_lodash = require("lodash");
var import_iterables = require("../../util/iterables");
var import_util = require("../../reactions/util");
describe("reaction utilities", () => {
  const OUR_CONVO_ID = (0, import_uuid.v4)();
  const rxn = /* @__PURE__ */ __name((emoji, { isPending = false } = {}) => ({
    emoji,
    fromId: OUR_CONVO_ID,
    targetAuthorUuid: (0, import_uuid.v4)(),
    targetTimestamp: Date.now(),
    timestamp: Date.now(),
    ...isPending ? { isSentByConversationId: { [(0, import_uuid.v4)()]: false } } : {}
  }), "rxn");
  describe("addOutgoingReaction", () => {
    it("adds the reaction to the end of an empty list", () => {
      const reaction = rxn("\u{1F485}");
      const result = (0, import_util.addOutgoingReaction)([], reaction);
      import_chai.assert.deepStrictEqual(result, [reaction]);
    });
    it("removes all pending reactions", () => {
      const oldReactions = [
        { ...rxn("\u{1F62D}", { isPending: true }), timestamp: 3 },
        { ...rxn("\u{1F4AC}"), fromId: (0, import_uuid.v4)() },
        { ...rxn("\u{1F940}", { isPending: true }), timestamp: 1 },
        { ...rxn("\u{1F339}", { isPending: true }), timestamp: 2 }
      ];
      const reaction = rxn("\u{1F600}");
      const newReactions = (0, import_util.addOutgoingReaction)(oldReactions, reaction);
      import_chai.assert.deepStrictEqual(newReactions, [oldReactions[1], reaction]);
    });
    it("does not remove any pending reactions if its a story", () => {
      const oldReactions = [
        { ...rxn("\u{1F62D}", { isPending: true }), timestamp: 3 },
        { ...rxn("\u{1F4AC}"), fromId: (0, import_uuid.v4)() },
        { ...rxn("\u{1F940}", { isPending: true }), timestamp: 1 },
        { ...rxn("\u{1F339}", { isPending: true }), timestamp: 2 }
      ];
      const reaction = rxn("\u{1F600}");
      const newReactions = (0, import_util.addOutgoingReaction)(oldReactions, reaction, true);
      import_chai.assert.deepStrictEqual(newReactions, [...oldReactions, reaction]);
    });
  });
  describe("getNewestPendingOutgoingReaction", () => {
    it("returns undefined if there are no pending outgoing reactions", () => {
      [[], [rxn("\u{1F514}")], [rxn("\u{1F62D}"), { ...rxn("\u{1F4AC}"), fromId: (0, import_uuid.v4)() }]].forEach((oldReactions) => {
        import_chai.assert.deepStrictEqual((0, import_util.getNewestPendingOutgoingReaction)(oldReactions, OUR_CONVO_ID), {});
      });
    });
    it("returns undefined if there's a pending reaction before a fully sent one", () => {
      const oldReactions = [
        { ...rxn("\u2B50\uFE0F"), timestamp: 2 },
        { ...rxn("\u{1F525}", { isPending: true }), timestamp: 1 }
      ];
      const { pendingReaction, emojiToRemove } = (0, import_util.getNewestPendingOutgoingReaction)(oldReactions, OUR_CONVO_ID);
      import_chai.assert.isUndefined(pendingReaction);
      import_chai.assert.isUndefined(emojiToRemove);
    });
    it("returns the newest pending reaction", () => {
      [
        [rxn("\u2B50\uFE0F", { isPending: true })],
        [
          { ...rxn("\u{1F940}", { isPending: true }), timestamp: 1 },
          { ...rxn("\u2B50\uFE0F", { isPending: true }), timestamp: 2 }
        ]
      ].forEach((oldReactions) => {
        const { pendingReaction, emojiToRemove } = (0, import_util.getNewestPendingOutgoingReaction)(oldReactions, OUR_CONVO_ID);
        import_chai.assert.strictEqual(pendingReaction?.emoji, "\u2B50\uFE0F");
        import_chai.assert.isUndefined(emojiToRemove);
      });
    });
    it("makes its best guess of an emoji to remove, if applicable", () => {
      const oldReactions = [
        { ...rxn("\u2B50\uFE0F"), timestamp: 1 },
        { ...rxn(void 0, { isPending: true }), timestamp: 3 },
        { ...rxn("\u{1F525}", { isPending: true }), timestamp: 2 }
      ];
      const { pendingReaction, emojiToRemove } = (0, import_util.getNewestPendingOutgoingReaction)(oldReactions, OUR_CONVO_ID);
      import_chai.assert.isDefined(pendingReaction);
      import_chai.assert.isUndefined(pendingReaction?.emoji);
      import_chai.assert.strictEqual(emojiToRemove, "\u2B50\uFE0F");
    });
  });
  describe("getUnsentConversationIds", () => {
    it("returns an empty iterable if there's nothing to send", () => {
      (0, import_chai.assert)((0, import_iterables.isEmpty)((0, import_util.getUnsentConversationIds)({})));
      (0, import_chai.assert)((0, import_iterables.isEmpty)((0, import_util.getUnsentConversationIds)({
        isSentByConversationId: { [(0, import_uuid.v4)()]: true }
      })));
    });
    it("returns an iterable of all unsent conversation IDs", () => {
      const unsent1 = (0, import_uuid.v4)();
      const unsent2 = (0, import_uuid.v4)();
      const fakeReaction = {
        isSentByConversationId: {
          [unsent1]: false,
          [unsent2]: false,
          [(0, import_uuid.v4)()]: true,
          [(0, import_uuid.v4)()]: true
        }
      };
      import_chai.assert.sameMembers([...(0, import_util.getUnsentConversationIds)(fakeReaction)], [unsent1, unsent2]);
    });
  });
  describe("markReactionFailed", () => {
    const fullySent = rxn("\u2B50\uFE0F");
    const partiallySent = {
      ...rxn("\u{1F525}"),
      isSentByConversationId: { [(0, import_uuid.v4)()]: true, [(0, import_uuid.v4)()]: false }
    };
    const unsent = rxn("\u{1F92B}", { isPending: true });
    const reactions = [fullySent, partiallySent, unsent];
    it("removes the pending state if the reaction, with emoji, was partially sent", () => {
      import_chai.assert.deepStrictEqual((0, import_util.markOutgoingReactionFailed)(reactions, partiallySent), [fullySent, (0, import_lodash.omit)(partiallySent, "isSentByConversationId"), unsent]);
    });
    it("removes the removal reaction", () => {
      const none = rxn(void 0, { isPending: true });
      import_chai.assert.isEmpty((0, import_util.markOutgoingReactionFailed)([none], none));
    });
    it("does nothing if the reaction is not in the list", () => {
      import_chai.assert.deepStrictEqual((0, import_util.markOutgoingReactionFailed)(reactions, rxn("\u{1F940}", { isPending: true })), reactions);
    });
    it("removes the completely-unsent emoji reaction", () => {
      import_chai.assert.deepStrictEqual((0, import_util.markOutgoingReactionFailed)(reactions, unsent), [
        fullySent,
        partiallySent
      ]);
    });
  });
  describe("markOutgoingReactionSent", () => {
    const uuid1 = (0, import_uuid.v4)();
    const uuid2 = (0, import_uuid.v4)();
    const uuid3 = (0, import_uuid.v4)();
    const star = {
      ...rxn("\u2B50\uFE0F"),
      timestamp: 2,
      isSentByConversationId: {
        [uuid1]: false,
        [uuid2]: false,
        [uuid3]: false
      }
    };
    const none = {
      ...rxn(void 0),
      timestamp: 3,
      isSentByConversationId: {
        [uuid1]: false,
        [uuid2]: false,
        [uuid3]: false
      }
    };
    const reactions = [star, none, { ...rxn("\u{1F515}"), timestamp: 1 }];
    function getMessage() {
      const now = Date.now();
      return {
        conversationId: (0, import_uuid.v4)(),
        id: (0, import_uuid.v4)(),
        received_at: now,
        sent_at: now,
        timestamp: now,
        type: "incoming"
      };
    }
    it("does nothing if the reaction isn't in the list", () => {
      const result = (0, import_util.markOutgoingReactionSent)(reactions, rxn("\u{1F940}", { isPending: true }), [(0, import_uuid.v4)()], getMessage());
      import_chai.assert.deepStrictEqual(result, reactions);
    });
    it("updates reactions to be partially sent", () => {
      [star, none].forEach((reaction) => {
        const result = (0, import_util.markOutgoingReactionSent)(reactions, reaction, [uuid1, uuid2], getMessage());
        import_chai.assert.deepStrictEqual(result.find((re) => re.emoji === reaction.emoji)?.isSentByConversationId, {
          [uuid1]: true,
          [uuid2]: true,
          [uuid3]: false
        });
      });
    });
    it("removes sent state if a reaction with emoji is fully sent", () => {
      const result = (0, import_util.markOutgoingReactionSent)(reactions, star, [uuid1, uuid2, uuid3], getMessage());
      const newReaction = result.find((re) => re.emoji === "\u2B50\uFE0F");
      import_chai.assert.isDefined(newReaction);
      import_chai.assert.isUndefined(newReaction?.isSentByConversationId);
    });
    it("removes a fully-sent reaction removal", () => {
      const result = (0, import_util.markOutgoingReactionSent)(reactions, none, [uuid1, uuid2, uuid3], getMessage());
      (0, import_chai.assert)(result.every(({ emoji }) => typeof emoji === "string"), "Expected the emoji removal to be gone");
    });
    it("removes older reactions of mine", () => {
      const result = (0, import_util.markOutgoingReactionSent)(reactions, star, [uuid1, uuid2, uuid3], getMessage());
      import_chai.assert.isUndefined(result.find((re) => re.emoji === "\u{1F515}"));
    });
    it("does not remove my older reactions if they are on a story", () => {
      const result = (0, import_util.markOutgoingReactionSent)(reactions, star, [uuid1, uuid2, uuid3], { ...getMessage(), type: "story" });
      import_chai.assert.isDefined(result.find((re) => re.emoji === "\u{1F515}"));
    });
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidXRpbF90ZXN0LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IGFzc2VydCB9IGZyb20gJ2NoYWknO1xuaW1wb3J0IHsgdjQgYXMgdXVpZCB9IGZyb20gJ3V1aWQnO1xuaW1wb3J0IHsgb21pdCB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgdHlwZSB7XG4gIE1lc3NhZ2VBdHRyaWJ1dGVzVHlwZSxcbiAgTWVzc2FnZVJlYWN0aW9uVHlwZSxcbn0gZnJvbSAnLi4vLi4vbW9kZWwtdHlwZXMuZCc7XG5pbXBvcnQgeyBpc0VtcHR5IH0gZnJvbSAnLi4vLi4vdXRpbC9pdGVyYWJsZXMnO1xuXG5pbXBvcnQge1xuICBhZGRPdXRnb2luZ1JlYWN0aW9uLFxuICBnZXROZXdlc3RQZW5kaW5nT3V0Z29pbmdSZWFjdGlvbixcbiAgZ2V0VW5zZW50Q29udmVyc2F0aW9uSWRzLFxuICBtYXJrT3V0Z29pbmdSZWFjdGlvbkZhaWxlZCxcbiAgbWFya091dGdvaW5nUmVhY3Rpb25TZW50LFxufSBmcm9tICcuLi8uLi9yZWFjdGlvbnMvdXRpbCc7XG5cbmRlc2NyaWJlKCdyZWFjdGlvbiB1dGlsaXRpZXMnLCAoKSA9PiB7XG4gIGNvbnN0IE9VUl9DT05WT19JRCA9IHV1aWQoKTtcblxuICBjb25zdCByeG4gPSAoXG4gICAgZW1vamk6IHVuZGVmaW5lZCB8IHN0cmluZyxcbiAgICB7IGlzUGVuZGluZyA9IGZhbHNlIH06IFJlYWRvbmx5PHsgaXNQZW5kaW5nPzogYm9vbGVhbiB9PiA9IHt9XG4gICk6IE1lc3NhZ2VSZWFjdGlvblR5cGUgPT4gKHtcbiAgICBlbW9qaSxcbiAgICBmcm9tSWQ6IE9VUl9DT05WT19JRCxcbiAgICB0YXJnZXRBdXRob3JVdWlkOiB1dWlkKCksXG4gICAgdGFyZ2V0VGltZXN0YW1wOiBEYXRlLm5vdygpLFxuICAgIHRpbWVzdGFtcDogRGF0ZS5ub3coKSxcbiAgICAuLi4oaXNQZW5kaW5nID8geyBpc1NlbnRCeUNvbnZlcnNhdGlvbklkOiB7IFt1dWlkKCldOiBmYWxzZSB9IH0gOiB7fSksXG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdhZGRPdXRnb2luZ1JlYWN0aW9uJywgKCkgPT4ge1xuICAgIGl0KCdhZGRzIHRoZSByZWFjdGlvbiB0byB0aGUgZW5kIG9mIGFuIGVtcHR5IGxpc3QnLCAoKSA9PiB7XG4gICAgICBjb25zdCByZWFjdGlvbiA9IHJ4bignXHVEODNEXHVEQzg1Jyk7XG4gICAgICBjb25zdCByZXN1bHQgPSBhZGRPdXRnb2luZ1JlYWN0aW9uKFtdLCByZWFjdGlvbik7XG4gICAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKHJlc3VsdCwgW3JlYWN0aW9uXSk7XG4gICAgfSk7XG5cbiAgICBpdCgncmVtb3ZlcyBhbGwgcGVuZGluZyByZWFjdGlvbnMnLCAoKSA9PiB7XG4gICAgICBjb25zdCBvbGRSZWFjdGlvbnMgPSBbXG4gICAgICAgIHsgLi4ucnhuKCdcdUQ4M0RcdURFMkQnLCB7IGlzUGVuZGluZzogdHJ1ZSB9KSwgdGltZXN0YW1wOiAzIH0sXG4gICAgICAgIHsgLi4ucnhuKCdcdUQ4M0RcdURDQUMnKSwgZnJvbUlkOiB1dWlkKCkgfSxcbiAgICAgICAgeyAuLi5yeG4oJ1x1RDgzRVx1REQ0MCcsIHsgaXNQZW5kaW5nOiB0cnVlIH0pLCB0aW1lc3RhbXA6IDEgfSxcbiAgICAgICAgeyAuLi5yeG4oJ1x1RDgzQ1x1REYzOScsIHsgaXNQZW5kaW5nOiB0cnVlIH0pLCB0aW1lc3RhbXA6IDIgfSxcbiAgICAgIF07XG4gICAgICBjb25zdCByZWFjdGlvbiA9IHJ4bignXHVEODNEXHVERTAwJyk7XG4gICAgICBjb25zdCBuZXdSZWFjdGlvbnMgPSBhZGRPdXRnb2luZ1JlYWN0aW9uKG9sZFJlYWN0aW9ucywgcmVhY3Rpb24pO1xuICAgICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChuZXdSZWFjdGlvbnMsIFtvbGRSZWFjdGlvbnNbMV0sIHJlYWN0aW9uXSk7XG4gICAgfSk7XG5cbiAgICBpdCgnZG9lcyBub3QgcmVtb3ZlIGFueSBwZW5kaW5nIHJlYWN0aW9ucyBpZiBpdHMgYSBzdG9yeScsICgpID0+IHtcbiAgICAgIGNvbnN0IG9sZFJlYWN0aW9ucyA9IFtcbiAgICAgICAgeyAuLi5yeG4oJ1x1RDgzRFx1REUyRCcsIHsgaXNQZW5kaW5nOiB0cnVlIH0pLCB0aW1lc3RhbXA6IDMgfSxcbiAgICAgICAgeyAuLi5yeG4oJ1x1RDgzRFx1RENBQycpLCBmcm9tSWQ6IHV1aWQoKSB9LFxuICAgICAgICB7IC4uLnJ4bignXHVEODNFXHVERDQwJywgeyBpc1BlbmRpbmc6IHRydWUgfSksIHRpbWVzdGFtcDogMSB9LFxuICAgICAgICB7IC4uLnJ4bignXHVEODNDXHVERjM5JywgeyBpc1BlbmRpbmc6IHRydWUgfSksIHRpbWVzdGFtcDogMiB9LFxuICAgICAgXTtcbiAgICAgIGNvbnN0IHJlYWN0aW9uID0gcnhuKCdcdUQ4M0RcdURFMDAnKTtcbiAgICAgIGNvbnN0IG5ld1JlYWN0aW9ucyA9IGFkZE91dGdvaW5nUmVhY3Rpb24ob2xkUmVhY3Rpb25zLCByZWFjdGlvbiwgdHJ1ZSk7XG4gICAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKG5ld1JlYWN0aW9ucywgWy4uLm9sZFJlYWN0aW9ucywgcmVhY3Rpb25dKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ2dldE5ld2VzdFBlbmRpbmdPdXRnb2luZ1JlYWN0aW9uJywgKCkgPT4ge1xuICAgIGl0KCdyZXR1cm5zIHVuZGVmaW5lZCBpZiB0aGVyZSBhcmUgbm8gcGVuZGluZyBvdXRnb2luZyByZWFjdGlvbnMnLCAoKSA9PiB7XG4gICAgICBbW10sIFtyeG4oJ1x1RDgzRFx1REQxNCcpXSwgW3J4bignXHVEODNEXHVERTJEJyksIHsgLi4ucnhuKCdcdUQ4M0RcdURDQUMnKSwgZnJvbUlkOiB1dWlkKCkgfV1dLmZvckVhY2goXG4gICAgICAgIG9sZFJlYWN0aW9ucyA9PiB7XG4gICAgICAgICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChcbiAgICAgICAgICAgIGdldE5ld2VzdFBlbmRpbmdPdXRnb2luZ1JlYWN0aW9uKG9sZFJlYWN0aW9ucywgT1VSX0NPTlZPX0lEKSxcbiAgICAgICAgICAgIHt9XG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIGl0KFwicmV0dXJucyB1bmRlZmluZWQgaWYgdGhlcmUncyBhIHBlbmRpbmcgcmVhY3Rpb24gYmVmb3JlIGEgZnVsbHkgc2VudCBvbmVcIiwgKCkgPT4ge1xuICAgICAgY29uc3Qgb2xkUmVhY3Rpb25zID0gW1xuICAgICAgICB7IC4uLnJ4bignXHUyQjUwXHVGRTBGJyksIHRpbWVzdGFtcDogMiB9LFxuICAgICAgICB7IC4uLnJ4bignXHVEODNEXHVERDI1JywgeyBpc1BlbmRpbmc6IHRydWUgfSksIHRpbWVzdGFtcDogMSB9LFxuICAgICAgXTtcbiAgICAgIGNvbnN0IHsgcGVuZGluZ1JlYWN0aW9uLCBlbW9qaVRvUmVtb3ZlIH0gPVxuICAgICAgICBnZXROZXdlc3RQZW5kaW5nT3V0Z29pbmdSZWFjdGlvbihvbGRSZWFjdGlvbnMsIE9VUl9DT05WT19JRCk7XG5cbiAgICAgIGFzc2VydC5pc1VuZGVmaW5lZChwZW5kaW5nUmVhY3Rpb24pO1xuICAgICAgYXNzZXJ0LmlzVW5kZWZpbmVkKGVtb2ppVG9SZW1vdmUpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgdGhlIG5ld2VzdCBwZW5kaW5nIHJlYWN0aW9uJywgKCkgPT4ge1xuICAgICAgW1xuICAgICAgICBbcnhuKCdcdTJCNTBcdUZFMEYnLCB7IGlzUGVuZGluZzogdHJ1ZSB9KV0sXG4gICAgICAgIFtcbiAgICAgICAgICB7IC4uLnJ4bignXHVEODNFXHVERDQwJywgeyBpc1BlbmRpbmc6IHRydWUgfSksIHRpbWVzdGFtcDogMSB9LFxuICAgICAgICAgIHsgLi4ucnhuKCdcdTJCNTBcdUZFMEYnLCB7IGlzUGVuZGluZzogdHJ1ZSB9KSwgdGltZXN0YW1wOiAyIH0sXG4gICAgICAgIF0sXG4gICAgICBdLmZvckVhY2gob2xkUmVhY3Rpb25zID0+IHtcbiAgICAgICAgY29uc3QgeyBwZW5kaW5nUmVhY3Rpb24sIGVtb2ppVG9SZW1vdmUgfSA9XG4gICAgICAgICAgZ2V0TmV3ZXN0UGVuZGluZ091dGdvaW5nUmVhY3Rpb24ob2xkUmVhY3Rpb25zLCBPVVJfQ09OVk9fSUQpO1xuXG4gICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChwZW5kaW5nUmVhY3Rpb24/LmVtb2ppLCAnXHUyQjUwXHVGRTBGJyk7XG4gICAgICAgIGFzc2VydC5pc1VuZGVmaW5lZChlbW9qaVRvUmVtb3ZlKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgaXQoJ21ha2VzIGl0cyBiZXN0IGd1ZXNzIG9mIGFuIGVtb2ppIHRvIHJlbW92ZSwgaWYgYXBwbGljYWJsZScsICgpID0+IHtcbiAgICAgIGNvbnN0IG9sZFJlYWN0aW9ucyA9IFtcbiAgICAgICAgeyAuLi5yeG4oJ1x1MkI1MFx1RkUwRicpLCB0aW1lc3RhbXA6IDEgfSxcbiAgICAgICAgeyAuLi5yeG4odW5kZWZpbmVkLCB7IGlzUGVuZGluZzogdHJ1ZSB9KSwgdGltZXN0YW1wOiAzIH0sXG4gICAgICAgIHsgLi4ucnhuKCdcdUQ4M0RcdUREMjUnLCB7IGlzUGVuZGluZzogdHJ1ZSB9KSwgdGltZXN0YW1wOiAyIH0sXG4gICAgICBdO1xuICAgICAgY29uc3QgeyBwZW5kaW5nUmVhY3Rpb24sIGVtb2ppVG9SZW1vdmUgfSA9XG4gICAgICAgIGdldE5ld2VzdFBlbmRpbmdPdXRnb2luZ1JlYWN0aW9uKG9sZFJlYWN0aW9ucywgT1VSX0NPTlZPX0lEKTtcblxuICAgICAgYXNzZXJ0LmlzRGVmaW5lZChwZW5kaW5nUmVhY3Rpb24pO1xuICAgICAgYXNzZXJ0LmlzVW5kZWZpbmVkKHBlbmRpbmdSZWFjdGlvbj8uZW1vamkpO1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGVtb2ppVG9SZW1vdmUsICdcdTJCNTBcdUZFMEYnKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ2dldFVuc2VudENvbnZlcnNhdGlvbklkcycsICgpID0+IHtcbiAgICBpdChcInJldHVybnMgYW4gZW1wdHkgaXRlcmFibGUgaWYgdGhlcmUncyBub3RoaW5nIHRvIHNlbmRcIiwgKCkgPT4ge1xuICAgICAgYXNzZXJ0KGlzRW1wdHkoZ2V0VW5zZW50Q29udmVyc2F0aW9uSWRzKHt9KSkpO1xuICAgICAgYXNzZXJ0KFxuICAgICAgICBpc0VtcHR5KFxuICAgICAgICAgIGdldFVuc2VudENvbnZlcnNhdGlvbklkcyh7XG4gICAgICAgICAgICBpc1NlbnRCeUNvbnZlcnNhdGlvbklkOiB7IFt1dWlkKCldOiB0cnVlIH0sXG4gICAgICAgICAgfSlcbiAgICAgICAgKVxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIGFuIGl0ZXJhYmxlIG9mIGFsbCB1bnNlbnQgY29udmVyc2F0aW9uIElEcycsICgpID0+IHtcbiAgICAgIGNvbnN0IHVuc2VudDEgPSB1dWlkKCk7XG4gICAgICBjb25zdCB1bnNlbnQyID0gdXVpZCgpO1xuICAgICAgY29uc3QgZmFrZVJlYWN0aW9uID0ge1xuICAgICAgICBpc1NlbnRCeUNvbnZlcnNhdGlvbklkOiB7XG4gICAgICAgICAgW3Vuc2VudDFdOiBmYWxzZSxcbiAgICAgICAgICBbdW5zZW50Ml06IGZhbHNlLFxuICAgICAgICAgIFt1dWlkKCldOiB0cnVlLFxuICAgICAgICAgIFt1dWlkKCldOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgfTtcblxuICAgICAgYXNzZXJ0LnNhbWVNZW1iZXJzKFxuICAgICAgICBbLi4uZ2V0VW5zZW50Q29udmVyc2F0aW9uSWRzKGZha2VSZWFjdGlvbildLFxuICAgICAgICBbdW5zZW50MSwgdW5zZW50Ml1cbiAgICAgICk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdtYXJrUmVhY3Rpb25GYWlsZWQnLCAoKSA9PiB7XG4gICAgY29uc3QgZnVsbHlTZW50ID0gcnhuKCdcdTJCNTBcdUZFMEYnKTtcbiAgICBjb25zdCBwYXJ0aWFsbHlTZW50ID0ge1xuICAgICAgLi4ucnhuKCdcdUQ4M0RcdUREMjUnKSxcbiAgICAgIGlzU2VudEJ5Q29udmVyc2F0aW9uSWQ6IHsgW3V1aWQoKV06IHRydWUsIFt1dWlkKCldOiBmYWxzZSB9LFxuICAgIH07XG4gICAgY29uc3QgdW5zZW50ID0gcnhuKCdcdUQ4M0VcdUREMkInLCB7IGlzUGVuZGluZzogdHJ1ZSB9KTtcblxuICAgIGNvbnN0IHJlYWN0aW9ucyA9IFtmdWxseVNlbnQsIHBhcnRpYWxseVNlbnQsIHVuc2VudF07XG5cbiAgICBpdCgncmVtb3ZlcyB0aGUgcGVuZGluZyBzdGF0ZSBpZiB0aGUgcmVhY3Rpb24sIHdpdGggZW1vamksIHdhcyBwYXJ0aWFsbHkgc2VudCcsICgpID0+IHtcbiAgICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwoXG4gICAgICAgIG1hcmtPdXRnb2luZ1JlYWN0aW9uRmFpbGVkKHJlYWN0aW9ucywgcGFydGlhbGx5U2VudCksXG4gICAgICAgIFtmdWxseVNlbnQsIG9taXQocGFydGlhbGx5U2VudCwgJ2lzU2VudEJ5Q29udmVyc2F0aW9uSWQnKSwgdW5zZW50XVxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZW1vdmVzIHRoZSByZW1vdmFsIHJlYWN0aW9uJywgKCkgPT4ge1xuICAgICAgY29uc3Qgbm9uZSA9IHJ4bih1bmRlZmluZWQsIHsgaXNQZW5kaW5nOiB0cnVlIH0pO1xuICAgICAgYXNzZXJ0LmlzRW1wdHkobWFya091dGdvaW5nUmVhY3Rpb25GYWlsZWQoW25vbmVdLCBub25lKSk7XG4gICAgfSk7XG5cbiAgICBpdCgnZG9lcyBub3RoaW5nIGlmIHRoZSByZWFjdGlvbiBpcyBub3QgaW4gdGhlIGxpc3QnLCAoKSA9PiB7XG4gICAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKFxuICAgICAgICBtYXJrT3V0Z29pbmdSZWFjdGlvbkZhaWxlZChyZWFjdGlvbnMsIHJ4bignXHVEODNFXHVERDQwJywgeyBpc1BlbmRpbmc6IHRydWUgfSkpLFxuICAgICAgICByZWFjdGlvbnNcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICBpdCgncmVtb3ZlcyB0aGUgY29tcGxldGVseS11bnNlbnQgZW1vamkgcmVhY3Rpb24nLCAoKSA9PiB7XG4gICAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKG1hcmtPdXRnb2luZ1JlYWN0aW9uRmFpbGVkKHJlYWN0aW9ucywgdW5zZW50KSwgW1xuICAgICAgICBmdWxseVNlbnQsXG4gICAgICAgIHBhcnRpYWxseVNlbnQsXG4gICAgICBdKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ21hcmtPdXRnb2luZ1JlYWN0aW9uU2VudCcsICgpID0+IHtcbiAgICBjb25zdCB1dWlkMSA9IHV1aWQoKTtcbiAgICBjb25zdCB1dWlkMiA9IHV1aWQoKTtcbiAgICBjb25zdCB1dWlkMyA9IHV1aWQoKTtcblxuICAgIGNvbnN0IHN0YXIgPSB7XG4gICAgICAuLi5yeG4oJ1x1MkI1MFx1RkUwRicpLFxuICAgICAgdGltZXN0YW1wOiAyLFxuICAgICAgaXNTZW50QnlDb252ZXJzYXRpb25JZDoge1xuICAgICAgICBbdXVpZDFdOiBmYWxzZSxcbiAgICAgICAgW3V1aWQyXTogZmFsc2UsXG4gICAgICAgIFt1dWlkM106IGZhbHNlLFxuICAgICAgfSxcbiAgICB9O1xuICAgIGNvbnN0IG5vbmUgPSB7XG4gICAgICAuLi5yeG4odW5kZWZpbmVkKSxcbiAgICAgIHRpbWVzdGFtcDogMyxcbiAgICAgIGlzU2VudEJ5Q29udmVyc2F0aW9uSWQ6IHtcbiAgICAgICAgW3V1aWQxXTogZmFsc2UsXG4gICAgICAgIFt1dWlkMl06IGZhbHNlLFxuICAgICAgICBbdXVpZDNdOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgfTtcblxuICAgIGNvbnN0IHJlYWN0aW9ucyA9IFtzdGFyLCBub25lLCB7IC4uLnJ4bignXHVEODNEXHVERDE1JyksIHRpbWVzdGFtcDogMSB9XTtcblxuICAgIGZ1bmN0aW9uIGdldE1lc3NhZ2UoKTogTWVzc2FnZUF0dHJpYnV0ZXNUeXBlIHtcbiAgICAgIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBjb252ZXJzYXRpb25JZDogdXVpZCgpLFxuICAgICAgICBpZDogdXVpZCgpLFxuICAgICAgICByZWNlaXZlZF9hdDogbm93LFxuICAgICAgICBzZW50X2F0OiBub3csXG4gICAgICAgIHRpbWVzdGFtcDogbm93LFxuICAgICAgICB0eXBlOiAnaW5jb21pbmcnLFxuICAgICAgfTtcbiAgICB9XG5cbiAgICBpdChcImRvZXMgbm90aGluZyBpZiB0aGUgcmVhY3Rpb24gaXNuJ3QgaW4gdGhlIGxpc3RcIiwgKCkgPT4ge1xuICAgICAgY29uc3QgcmVzdWx0ID0gbWFya091dGdvaW5nUmVhY3Rpb25TZW50KFxuICAgICAgICByZWFjdGlvbnMsXG4gICAgICAgIHJ4bignXHVEODNFXHVERDQwJywgeyBpc1BlbmRpbmc6IHRydWUgfSksXG4gICAgICAgIFt1dWlkKCldLFxuICAgICAgICBnZXRNZXNzYWdlKClcbiAgICAgICk7XG4gICAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKHJlc3VsdCwgcmVhY3Rpb25zKTtcbiAgICB9KTtcblxuICAgIGl0KCd1cGRhdGVzIHJlYWN0aW9ucyB0byBiZSBwYXJ0aWFsbHkgc2VudCcsICgpID0+IHtcbiAgICAgIFtzdGFyLCBub25lXS5mb3JFYWNoKHJlYWN0aW9uID0+IHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gbWFya091dGdvaW5nUmVhY3Rpb25TZW50KFxuICAgICAgICAgIHJlYWN0aW9ucyxcbiAgICAgICAgICByZWFjdGlvbixcbiAgICAgICAgICBbdXVpZDEsIHV1aWQyXSxcbiAgICAgICAgICBnZXRNZXNzYWdlKClcbiAgICAgICAgKTtcbiAgICAgICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChcbiAgICAgICAgICByZXN1bHQuZmluZChyZSA9PiByZS5lbW9qaSA9PT0gcmVhY3Rpb24uZW1vamkpXG4gICAgICAgICAgICA/LmlzU2VudEJ5Q29udmVyc2F0aW9uSWQsXG4gICAgICAgICAge1xuICAgICAgICAgICAgW3V1aWQxXTogdHJ1ZSxcbiAgICAgICAgICAgIFt1dWlkMl06IHRydWUsXG4gICAgICAgICAgICBbdXVpZDNdOiBmYWxzZSxcbiAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGl0KCdyZW1vdmVzIHNlbnQgc3RhdGUgaWYgYSByZWFjdGlvbiB3aXRoIGVtb2ppIGlzIGZ1bGx5IHNlbnQnLCAoKSA9PiB7XG4gICAgICBjb25zdCByZXN1bHQgPSBtYXJrT3V0Z29pbmdSZWFjdGlvblNlbnQoXG4gICAgICAgIHJlYWN0aW9ucyxcbiAgICAgICAgc3RhcixcbiAgICAgICAgW3V1aWQxLCB1dWlkMiwgdXVpZDNdLFxuICAgICAgICBnZXRNZXNzYWdlKClcbiAgICAgICk7XG5cbiAgICAgIGNvbnN0IG5ld1JlYWN0aW9uID0gcmVzdWx0LmZpbmQocmUgPT4gcmUuZW1vamkgPT09ICdcdTJCNTBcdUZFMEYnKTtcbiAgICAgIGFzc2VydC5pc0RlZmluZWQobmV3UmVhY3Rpb24pO1xuICAgICAgYXNzZXJ0LmlzVW5kZWZpbmVkKG5ld1JlYWN0aW9uPy5pc1NlbnRCeUNvbnZlcnNhdGlvbklkKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZW1vdmVzIGEgZnVsbHktc2VudCByZWFjdGlvbiByZW1vdmFsJywgKCkgPT4ge1xuICAgICAgY29uc3QgcmVzdWx0ID0gbWFya091dGdvaW5nUmVhY3Rpb25TZW50KFxuICAgICAgICByZWFjdGlvbnMsXG4gICAgICAgIG5vbmUsXG4gICAgICAgIFt1dWlkMSwgdXVpZDIsIHV1aWQzXSxcbiAgICAgICAgZ2V0TWVzc2FnZSgpXG4gICAgICApO1xuXG4gICAgICBhc3NlcnQoXG4gICAgICAgIHJlc3VsdC5ldmVyeSgoeyBlbW9qaSB9KSA9PiB0eXBlb2YgZW1vamkgPT09ICdzdHJpbmcnKSxcbiAgICAgICAgJ0V4cGVjdGVkIHRoZSBlbW9qaSByZW1vdmFsIHRvIGJlIGdvbmUnXG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JlbW92ZXMgb2xkZXIgcmVhY3Rpb25zIG9mIG1pbmUnLCAoKSA9PiB7XG4gICAgICBjb25zdCByZXN1bHQgPSBtYXJrT3V0Z29pbmdSZWFjdGlvblNlbnQoXG4gICAgICAgIHJlYWN0aW9ucyxcbiAgICAgICAgc3RhcixcbiAgICAgICAgW3V1aWQxLCB1dWlkMiwgdXVpZDNdLFxuICAgICAgICBnZXRNZXNzYWdlKClcbiAgICAgICk7XG5cbiAgICAgIGFzc2VydC5pc1VuZGVmaW5lZChyZXN1bHQuZmluZChyZSA9PiByZS5lbW9qaSA9PT0gJ1x1RDgzRFx1REQxNScpKTtcbiAgICB9KTtcblxuICAgIGl0KCdkb2VzIG5vdCByZW1vdmUgbXkgb2xkZXIgcmVhY3Rpb25zIGlmIHRoZXkgYXJlIG9uIGEgc3RvcnknLCAoKSA9PiB7XG4gICAgICBjb25zdCByZXN1bHQgPSBtYXJrT3V0Z29pbmdSZWFjdGlvblNlbnQoXG4gICAgICAgIHJlYWN0aW9ucyxcbiAgICAgICAgc3RhcixcbiAgICAgICAgW3V1aWQxLCB1dWlkMiwgdXVpZDNdLFxuICAgICAgICB7IC4uLmdldE1lc3NhZ2UoKSwgdHlwZTogJ3N0b3J5JyB9XG4gICAgICApO1xuXG4gICAgICBhc3NlcnQuaXNEZWZpbmVkKHJlc3VsdC5maW5kKHJlID0+IHJlLmVtb2ppID09PSAnXHVEODNEXHVERDE1JykpO1xuICAgIH0pO1xuICB9KTtcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7QUFHQSxrQkFBdUI7QUFDdkIsa0JBQTJCO0FBQzNCLG9CQUFxQjtBQUtyQix1QkFBd0I7QUFFeEIsa0JBTU87QUFFUCxTQUFTLHNCQUFzQixNQUFNO0FBQ25DLFFBQU0sZUFBZSxvQkFBSztBQUUxQixRQUFNLE1BQU0s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
