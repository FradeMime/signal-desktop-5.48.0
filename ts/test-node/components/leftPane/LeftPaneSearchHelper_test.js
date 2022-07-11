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
var import_ConversationList = require("../../../components/ConversationList");
var import_getDefaultConversation = require("../../../test-both/helpers/getDefaultConversation");
var import_LeftPaneSearchHelper = require("../../../components/leftPane/LeftPaneSearchHelper");
describe("LeftPaneSearchHelper", () => {
  const fakeMessage = /* @__PURE__ */ __name(() => ({
    id: (0, import_uuid.v4)(),
    type: "outgoing",
    conversationId: (0, import_uuid.v4)()
  }), "fakeMessage");
  describe("getBackAction", () => {
    it("returns undefined; going back is handled elsewhere in the app", () => {
      const helper = new import_LeftPaneSearchHelper.LeftPaneSearchHelper({
        conversationResults: { isLoading: false, results: [] },
        contactResults: { isLoading: false, results: [] },
        messageResults: { isLoading: false, results: [] },
        searchTerm: "foo",
        primarySendsSms: false,
        searchConversation: void 0,
        searchDisabled: false,
        startSearchCounter: 0
      });
      import_chai.assert.isUndefined(helper.getBackAction({
        showChooseGroupMembers: sinon.fake(),
        showInbox: sinon.fake(),
        startComposing: sinon.fake()
      }));
    });
  });
  describe("getRowCount", () => {
    it("returns 100 if any results are loading", () => {
      import_chai.assert.strictEqual(new import_LeftPaneSearchHelper.LeftPaneSearchHelper({
        conversationResults: { isLoading: true },
        contactResults: { isLoading: true },
        messageResults: { isLoading: true },
        searchTerm: "foo",
        primarySendsSms: false,
        searchConversation: void 0,
        searchDisabled: false,
        startSearchCounter: 0
      }).getRowCount(), 100);
      import_chai.assert.strictEqual(new import_LeftPaneSearchHelper.LeftPaneSearchHelper({
        conversationResults: {
          isLoading: false,
          results: [(0, import_getDefaultConversation.getDefaultConversation)(), (0, import_getDefaultConversation.getDefaultConversation)()]
        },
        contactResults: { isLoading: true },
        messageResults: { isLoading: true },
        searchTerm: "foo",
        primarySendsSms: false,
        searchConversation: void 0,
        searchDisabled: false,
        startSearchCounter: 0
      }).getRowCount(), 100);
      import_chai.assert.strictEqual(new import_LeftPaneSearchHelper.LeftPaneSearchHelper({
        conversationResults: { isLoading: true },
        contactResults: { isLoading: true },
        messageResults: { isLoading: false, results: [fakeMessage()] },
        searchTerm: "foo",
        primarySendsSms: false,
        searchConversation: void 0,
        searchDisabled: false,
        startSearchCounter: 0
      }).getRowCount(), 100);
    });
    it("returns 0 when there are no search results", () => {
      const helper = new import_LeftPaneSearchHelper.LeftPaneSearchHelper({
        conversationResults: { isLoading: false, results: [] },
        contactResults: { isLoading: false, results: [] },
        messageResults: { isLoading: false, results: [] },
        searchTerm: "foo",
        primarySendsSms: false,
        searchConversation: void 0,
        searchDisabled: false,
        startSearchCounter: 0
      });
      import_chai.assert.strictEqual(helper.getRowCount(), 0);
    });
    it("returns 1 + the number of results, dropping empty sections", () => {
      const helper = new import_LeftPaneSearchHelper.LeftPaneSearchHelper({
        conversationResults: {
          isLoading: false,
          results: [(0, import_getDefaultConversation.getDefaultConversation)(), (0, import_getDefaultConversation.getDefaultConversation)()]
        },
        contactResults: { isLoading: false, results: [] },
        messageResults: { isLoading: false, results: [fakeMessage()] },
        searchTerm: "foo",
        primarySendsSms: false,
        searchConversation: void 0,
        searchDisabled: false,
        startSearchCounter: 0
      });
      import_chai.assert.strictEqual(helper.getRowCount(), 5);
    });
  });
  describe("getRow", () => {
    it('returns a "loading search results" row if any results are loading', () => {
      const helpers = [
        new import_LeftPaneSearchHelper.LeftPaneSearchHelper({
          conversationResults: { isLoading: true },
          contactResults: { isLoading: true },
          messageResults: { isLoading: true },
          searchTerm: "foo",
          primarySendsSms: false,
          searchConversation: void 0,
          searchDisabled: false,
          startSearchCounter: 0
        }),
        new import_LeftPaneSearchHelper.LeftPaneSearchHelper({
          conversationResults: {
            isLoading: false,
            results: [(0, import_getDefaultConversation.getDefaultConversation)(), (0, import_getDefaultConversation.getDefaultConversation)()]
          },
          contactResults: { isLoading: true },
          messageResults: { isLoading: true },
          searchTerm: "foo",
          primarySendsSms: false,
          searchConversation: void 0,
          searchDisabled: false,
          startSearchCounter: 0
        }),
        new import_LeftPaneSearchHelper.LeftPaneSearchHelper({
          conversationResults: { isLoading: true },
          contactResults: { isLoading: true },
          messageResults: { isLoading: false, results: [fakeMessage()] },
          searchTerm: "foo",
          primarySendsSms: false,
          searchConversation: void 0,
          searchDisabled: false,
          startSearchCounter: 0
        })
      ];
      helpers.forEach((helper) => {
        import_chai.assert.deepEqual(helper.getRow(0), {
          type: import_ConversationList.RowType.SearchResultsLoadingFakeHeader
        });
        for (let i = 1; i < 99; i += 1) {
          import_chai.assert.deepEqual(helper.getRow(i), {
            type: import_ConversationList.RowType.SearchResultsLoadingFakeRow
          });
        }
        import_chai.assert.isUndefined(helper.getRow(100));
      });
    });
    it("returns header + results when all sections have loaded with results", () => {
      const conversations = [
        (0, import_getDefaultConversation.getDefaultConversation)(),
        (0, import_getDefaultConversation.getDefaultConversation)()
      ];
      const contacts = [(0, import_getDefaultConversation.getDefaultConversation)()];
      const messages = [fakeMessage(), fakeMessage()];
      const helper = new import_LeftPaneSearchHelper.LeftPaneSearchHelper({
        conversationResults: {
          isLoading: false,
          results: conversations
        },
        contactResults: { isLoading: false, results: contacts },
        messageResults: { isLoading: false, results: messages },
        searchTerm: "foo",
        primarySendsSms: false,
        searchConversation: void 0,
        searchDisabled: false,
        startSearchCounter: 0
      });
      import_chai.assert.deepEqual(helper.getRow(0), {
        type: import_ConversationList.RowType.Header,
        i18nKey: "conversationsHeader"
      });
      import_chai.assert.deepEqual(helper.getRow(1), {
        type: import_ConversationList.RowType.Conversation,
        conversation: conversations[0]
      });
      import_chai.assert.deepEqual(helper.getRow(2), {
        type: import_ConversationList.RowType.Conversation,
        conversation: conversations[1]
      });
      import_chai.assert.deepEqual(helper.getRow(3), {
        type: import_ConversationList.RowType.Header,
        i18nKey: "contactsHeader"
      });
      import_chai.assert.deepEqual(helper.getRow(4), {
        type: import_ConversationList.RowType.Conversation,
        conversation: contacts[0]
      });
      import_chai.assert.deepEqual(helper.getRow(5), {
        type: import_ConversationList.RowType.Header,
        i18nKey: "messagesHeader"
      });
      import_chai.assert.deepEqual(helper.getRow(6), {
        type: import_ConversationList.RowType.MessageSearchResult,
        messageId: messages[0].id
      });
      import_chai.assert.deepEqual(helper.getRow(7), {
        type: import_ConversationList.RowType.MessageSearchResult,
        messageId: messages[1].id
      });
    });
    it("omits conversations when there are no conversation results", () => {
      const contacts = [(0, import_getDefaultConversation.getDefaultConversation)()];
      const messages = [fakeMessage(), fakeMessage()];
      const helper = new import_LeftPaneSearchHelper.LeftPaneSearchHelper({
        conversationResults: {
          isLoading: false,
          results: []
        },
        contactResults: { isLoading: false, results: contacts },
        messageResults: { isLoading: false, results: messages },
        searchTerm: "foo",
        primarySendsSms: false,
        searchConversation: void 0,
        searchDisabled: false,
        startSearchCounter: 0
      });
      import_chai.assert.deepEqual(helper.getRow(0), {
        type: import_ConversationList.RowType.Header,
        i18nKey: "contactsHeader"
      });
      import_chai.assert.deepEqual(helper.getRow(1), {
        type: import_ConversationList.RowType.Conversation,
        conversation: contacts[0]
      });
      import_chai.assert.deepEqual(helper.getRow(2), {
        type: import_ConversationList.RowType.Header,
        i18nKey: "messagesHeader"
      });
      import_chai.assert.deepEqual(helper.getRow(3), {
        type: import_ConversationList.RowType.MessageSearchResult,
        messageId: messages[0].id
      });
      import_chai.assert.deepEqual(helper.getRow(4), {
        type: import_ConversationList.RowType.MessageSearchResult,
        messageId: messages[1].id
      });
    });
    it("omits contacts when there are no contact results", () => {
      const conversations = [
        (0, import_getDefaultConversation.getDefaultConversation)(),
        (0, import_getDefaultConversation.getDefaultConversation)()
      ];
      const messages = [fakeMessage(), fakeMessage()];
      const helper = new import_LeftPaneSearchHelper.LeftPaneSearchHelper({
        conversationResults: {
          isLoading: false,
          results: conversations
        },
        contactResults: { isLoading: false, results: [] },
        messageResults: { isLoading: false, results: messages },
        searchTerm: "foo",
        primarySendsSms: false,
        searchConversation: void 0,
        searchDisabled: false,
        startSearchCounter: 0
      });
      import_chai.assert.deepEqual(helper.getRow(0), {
        type: import_ConversationList.RowType.Header,
        i18nKey: "conversationsHeader"
      });
      import_chai.assert.deepEqual(helper.getRow(1), {
        type: import_ConversationList.RowType.Conversation,
        conversation: conversations[0]
      });
      import_chai.assert.deepEqual(helper.getRow(2), {
        type: import_ConversationList.RowType.Conversation,
        conversation: conversations[1]
      });
      import_chai.assert.deepEqual(helper.getRow(3), {
        type: import_ConversationList.RowType.Header,
        i18nKey: "messagesHeader"
      });
      import_chai.assert.deepEqual(helper.getRow(4), {
        type: import_ConversationList.RowType.MessageSearchResult,
        messageId: messages[0].id
      });
      import_chai.assert.deepEqual(helper.getRow(5), {
        type: import_ConversationList.RowType.MessageSearchResult,
        messageId: messages[1].id
      });
    });
  });
  it("omits messages when there are no message results", () => {
    const conversations = [(0, import_getDefaultConversation.getDefaultConversation)(), (0, import_getDefaultConversation.getDefaultConversation)()];
    const contacts = [(0, import_getDefaultConversation.getDefaultConversation)()];
    const helper = new import_LeftPaneSearchHelper.LeftPaneSearchHelper({
      conversationResults: {
        isLoading: false,
        results: conversations
      },
      contactResults: { isLoading: false, results: contacts },
      messageResults: { isLoading: false, results: [] },
      searchTerm: "foo",
      primarySendsSms: false,
      searchConversation: void 0,
      searchDisabled: false,
      startSearchCounter: 0
    });
    import_chai.assert.deepEqual(helper.getRow(0), {
      type: import_ConversationList.RowType.Header,
      i18nKey: "conversationsHeader"
    });
    import_chai.assert.deepEqual(helper.getRow(1), {
      type: import_ConversationList.RowType.Conversation,
      conversation: conversations[0]
    });
    import_chai.assert.deepEqual(helper.getRow(2), {
      type: import_ConversationList.RowType.Conversation,
      conversation: conversations[1]
    });
    import_chai.assert.deepEqual(helper.getRow(3), {
      type: import_ConversationList.RowType.Header,
      i18nKey: "contactsHeader"
    });
    import_chai.assert.deepEqual(helper.getRow(4), {
      type: import_ConversationList.RowType.Conversation,
      conversation: contacts[0]
    });
    import_chai.assert.isUndefined(helper.getRow(5));
  });
  describe("isScrollable", () => {
    it("returns false if any results are loading", () => {
      const helpers = [
        new import_LeftPaneSearchHelper.LeftPaneSearchHelper({
          conversationResults: { isLoading: true },
          contactResults: { isLoading: true },
          messageResults: { isLoading: true },
          searchTerm: "foo",
          primarySendsSms: false,
          searchConversation: void 0,
          searchDisabled: false,
          startSearchCounter: 0
        }),
        new import_LeftPaneSearchHelper.LeftPaneSearchHelper({
          conversationResults: {
            isLoading: false,
            results: [(0, import_getDefaultConversation.getDefaultConversation)(), (0, import_getDefaultConversation.getDefaultConversation)()]
          },
          contactResults: { isLoading: true },
          messageResults: { isLoading: true },
          searchTerm: "foo",
          primarySendsSms: false,
          searchConversation: void 0,
          searchDisabled: false,
          startSearchCounter: 0
        }),
        new import_LeftPaneSearchHelper.LeftPaneSearchHelper({
          conversationResults: { isLoading: true },
          contactResults: { isLoading: true },
          messageResults: { isLoading: false, results: [fakeMessage()] },
          searchTerm: "foo",
          primarySendsSms: false,
          searchConversation: void 0,
          searchDisabled: false,
          startSearchCounter: 0
        })
      ];
      helpers.forEach((helper) => {
        import_chai.assert.isFalse(helper.isScrollable());
      });
    });
    it("returns true if all results have loaded", () => {
      const helper = new import_LeftPaneSearchHelper.LeftPaneSearchHelper({
        conversationResults: {
          isLoading: false,
          results: [(0, import_getDefaultConversation.getDefaultConversation)(), (0, import_getDefaultConversation.getDefaultConversation)()]
        },
        contactResults: { isLoading: false, results: [] },
        messageResults: {
          isLoading: false,
          results: [fakeMessage(), fakeMessage(), fakeMessage()]
        },
        searchTerm: "foo",
        primarySendsSms: false,
        searchConversation: void 0,
        searchDisabled: false,
        startSearchCounter: 0
      });
      import_chai.assert.isTrue(helper.isScrollable());
    });
  });
  describe("shouldRecomputeRowHeights", () => {
    it("returns false if the number of results doesn't change", () => {
      const helper = new import_LeftPaneSearchHelper.LeftPaneSearchHelper({
        conversationResults: {
          isLoading: false,
          results: [(0, import_getDefaultConversation.getDefaultConversation)(), (0, import_getDefaultConversation.getDefaultConversation)()]
        },
        contactResults: { isLoading: false, results: [] },
        messageResults: {
          isLoading: false,
          results: [fakeMessage(), fakeMessage(), fakeMessage()]
        },
        searchTerm: "foo",
        primarySendsSms: false,
        searchConversation: void 0,
        searchDisabled: false,
        startSearchCounter: 0
      });
      import_chai.assert.isFalse(helper.shouldRecomputeRowHeights({
        conversationResults: {
          isLoading: false,
          results: [(0, import_getDefaultConversation.getDefaultConversation)(), (0, import_getDefaultConversation.getDefaultConversation)()]
        },
        contactResults: { isLoading: false, results: [] },
        messageResults: {
          isLoading: false,
          results: [fakeMessage(), fakeMessage(), fakeMessage()]
        },
        searchTerm: "bar",
        primarySendsSms: false,
        searchConversation: void 0,
        searchDisabled: false,
        startSearchCounter: 0
      }));
    });
    it("returns false when a section completes loading, but not all sections are done (because the pane is still loading overall)", () => {
      const helper = new import_LeftPaneSearchHelper.LeftPaneSearchHelper({
        conversationResults: { isLoading: true },
        contactResults: { isLoading: true },
        messageResults: { isLoading: true },
        searchTerm: "foo",
        primarySendsSms: false,
        searchConversation: void 0,
        searchDisabled: false,
        startSearchCounter: 0
      });
      import_chai.assert.isFalse(helper.shouldRecomputeRowHeights({
        conversationResults: {
          isLoading: false,
          results: [(0, import_getDefaultConversation.getDefaultConversation)()]
        },
        contactResults: { isLoading: true },
        messageResults: { isLoading: true },
        searchTerm: "bar",
        primarySendsSms: false,
        searchConversation: void 0,
        searchDisabled: false,
        startSearchCounter: 0
      }));
    });
    it("returns true when all sections finish loading", () => {
      const helper = new import_LeftPaneSearchHelper.LeftPaneSearchHelper({
        conversationResults: { isLoading: true },
        contactResults: { isLoading: true },
        messageResults: { isLoading: false, results: [fakeMessage()] },
        searchTerm: "foo",
        primarySendsSms: false,
        searchConversation: void 0,
        searchDisabled: false,
        startSearchCounter: 0
      });
      import_chai.assert.isTrue(helper.shouldRecomputeRowHeights({
        conversationResults: {
          isLoading: false,
          results: [(0, import_getDefaultConversation.getDefaultConversation)(), (0, import_getDefaultConversation.getDefaultConversation)()]
        },
        contactResults: { isLoading: false, results: [] },
        messageResults: { isLoading: false, results: [fakeMessage()] },
        searchTerm: "foo",
        primarySendsSms: false,
        searchConversation: void 0,
        searchDisabled: false,
        startSearchCounter: 0
      }));
    });
    it("returns true if the number of results in a section changes", () => {
      const helper = new import_LeftPaneSearchHelper.LeftPaneSearchHelper({
        conversationResults: {
          isLoading: false,
          results: [(0, import_getDefaultConversation.getDefaultConversation)(), (0, import_getDefaultConversation.getDefaultConversation)()]
        },
        contactResults: { isLoading: false, results: [] },
        messageResults: { isLoading: false, results: [] },
        searchTerm: "foo",
        primarySendsSms: false,
        searchConversation: void 0,
        searchDisabled: false,
        startSearchCounter: 0
      });
      import_chai.assert.isTrue(helper.shouldRecomputeRowHeights({
        conversationResults: {
          isLoading: false,
          results: [(0, import_getDefaultConversation.getDefaultConversation)()]
        },
        contactResults: { isLoading: true },
        messageResults: { isLoading: true },
        searchTerm: "bar",
        primarySendsSms: false,
        searchConversation: void 0,
        searchDisabled: false,
        startSearchCounter: 0
      }));
    });
  });
  describe("getConversationAndMessageAtIndex", () => {
    it("returns correct conversation at given index", () => {
      const expected = (0, import_getDefaultConversation.getDefaultConversation)();
      const helper = new import_LeftPaneSearchHelper.LeftPaneSearchHelper({
        conversationResults: {
          isLoading: false,
          results: [expected, (0, import_getDefaultConversation.getDefaultConversation)()]
        },
        contactResults: { isLoading: false, results: [] },
        messageResults: {
          isLoading: false,
          results: [fakeMessage(), fakeMessage(), fakeMessage()]
        },
        searchTerm: "foo",
        primarySendsSms: false,
        searchConversation: void 0,
        searchDisabled: false,
        startSearchCounter: 0
      });
      import_chai.assert.strictEqual(helper.getConversationAndMessageAtIndex(0)?.conversationId, expected.id);
    });
    it("returns correct contact at given index", () => {
      const expected = (0, import_getDefaultConversation.getDefaultConversation)();
      const helper = new import_LeftPaneSearchHelper.LeftPaneSearchHelper({
        conversationResults: {
          isLoading: false,
          results: [(0, import_getDefaultConversation.getDefaultConversation)(), (0, import_getDefaultConversation.getDefaultConversation)()]
        },
        contactResults: {
          isLoading: false,
          results: [expected]
        },
        messageResults: {
          isLoading: false,
          results: [fakeMessage(), fakeMessage(), fakeMessage()]
        },
        searchTerm: "foo",
        primarySendsSms: false,
        searchConversation: void 0,
        searchDisabled: false,
        startSearchCounter: 0
      });
      import_chai.assert.strictEqual(helper.getConversationAndMessageAtIndex(2)?.conversationId, expected.id);
    });
    it("returns correct message at given index", () => {
      const expected = fakeMessage();
      const helper = new import_LeftPaneSearchHelper.LeftPaneSearchHelper({
        conversationResults: {
          isLoading: false,
          results: [(0, import_getDefaultConversation.getDefaultConversation)(), (0, import_getDefaultConversation.getDefaultConversation)()]
        },
        contactResults: { isLoading: false, results: [] },
        messageResults: {
          isLoading: false,
          results: [fakeMessage(), fakeMessage(), expected]
        },
        searchTerm: "foo",
        primarySendsSms: false,
        searchConversation: void 0,
        searchDisabled: false,
        startSearchCounter: 0
      });
      import_chai.assert.strictEqual(helper.getConversationAndMessageAtIndex(4)?.messageId, expected.id);
    });
    it("returns correct message at given index skipping not loaded results", () => {
      const expected = fakeMessage();
      const helper = new import_LeftPaneSearchHelper.LeftPaneSearchHelper({
        conversationResults: { isLoading: true },
        contactResults: { isLoading: true },
        messageResults: {
          isLoading: false,
          results: [fakeMessage(), expected, fakeMessage()]
        },
        searchTerm: "foo",
        primarySendsSms: false,
        searchConversation: void 0,
        searchDisabled: false,
        startSearchCounter: 0
      });
      import_chai.assert.strictEqual(helper.getConversationAndMessageAtIndex(1)?.messageId, expected.id);
    });
    it("returns undefined if search candidate with given index does not exist", () => {
      const helper = new import_LeftPaneSearchHelper.LeftPaneSearchHelper({
        conversationResults: {
          isLoading: false,
          results: [(0, import_getDefaultConversation.getDefaultConversation)(), (0, import_getDefaultConversation.getDefaultConversation)()]
        },
        contactResults: { isLoading: false, results: [] },
        messageResults: {
          isLoading: false,
          results: [fakeMessage(), fakeMessage(), fakeMessage()]
        },
        searchTerm: "foo",
        primarySendsSms: false,
        searchConversation: void 0,
        searchDisabled: false,
        startSearchCounter: 0
      });
      import_chai.assert.isUndefined(helper.getConversationAndMessageAtIndex(100)?.messageId);
      import_chai.assert.isUndefined(helper.getConversationAndMessageAtIndex(-100)?.messageId);
    });
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiTGVmdFBhbmVTZWFyY2hIZWxwZXJfdGVzdC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEtMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IGFzc2VydCB9IGZyb20gJ2NoYWknO1xuaW1wb3J0ICogYXMgc2lub24gZnJvbSAnc2lub24nO1xuaW1wb3J0IHsgdjQgYXMgdXVpZCB9IGZyb20gJ3V1aWQnO1xuaW1wb3J0IHsgUm93VHlwZSB9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvQ29udmVyc2F0aW9uTGlzdCc7XG5pbXBvcnQgeyBnZXREZWZhdWx0Q29udmVyc2F0aW9uIH0gZnJvbSAnLi4vLi4vLi4vdGVzdC1ib3RoL2hlbHBlcnMvZ2V0RGVmYXVsdENvbnZlcnNhdGlvbic7XG5cbmltcG9ydCB7IExlZnRQYW5lU2VhcmNoSGVscGVyIH0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9sZWZ0UGFuZS9MZWZ0UGFuZVNlYXJjaEhlbHBlcic7XG5cbmRlc2NyaWJlKCdMZWZ0UGFuZVNlYXJjaEhlbHBlcicsICgpID0+IHtcbiAgY29uc3QgZmFrZU1lc3NhZ2UgPSAoKSA9PiAoe1xuICAgIGlkOiB1dWlkKCksXG4gICAgdHlwZTogJ291dGdvaW5nJyxcbiAgICBjb252ZXJzYXRpb25JZDogdXVpZCgpLFxuICB9KTtcblxuICBkZXNjcmliZSgnZ2V0QmFja0FjdGlvbicsICgpID0+IHtcbiAgICBpdCgncmV0dXJucyB1bmRlZmluZWQ7IGdvaW5nIGJhY2sgaXMgaGFuZGxlZCBlbHNld2hlcmUgaW4gdGhlIGFwcCcsICgpID0+IHtcbiAgICAgIGNvbnN0IGhlbHBlciA9IG5ldyBMZWZ0UGFuZVNlYXJjaEhlbHBlcih7XG4gICAgICAgIGNvbnZlcnNhdGlvblJlc3VsdHM6IHsgaXNMb2FkaW5nOiBmYWxzZSwgcmVzdWx0czogW10gfSxcbiAgICAgICAgY29udGFjdFJlc3VsdHM6IHsgaXNMb2FkaW5nOiBmYWxzZSwgcmVzdWx0czogW10gfSxcbiAgICAgICAgbWVzc2FnZVJlc3VsdHM6IHsgaXNMb2FkaW5nOiBmYWxzZSwgcmVzdWx0czogW10gfSxcbiAgICAgICAgc2VhcmNoVGVybTogJ2ZvbycsXG4gICAgICAgIHByaW1hcnlTZW5kc1NtczogZmFsc2UsXG4gICAgICAgIHNlYXJjaENvbnZlcnNhdGlvbjogdW5kZWZpbmVkLFxuICAgICAgICBzZWFyY2hEaXNhYmxlZDogZmFsc2UsXG4gICAgICAgIHN0YXJ0U2VhcmNoQ291bnRlcjogMCxcbiAgICAgIH0pO1xuXG4gICAgICBhc3NlcnQuaXNVbmRlZmluZWQoXG4gICAgICAgIGhlbHBlci5nZXRCYWNrQWN0aW9uKHtcbiAgICAgICAgICBzaG93Q2hvb3NlR3JvdXBNZW1iZXJzOiBzaW5vbi5mYWtlKCksXG4gICAgICAgICAgc2hvd0luYm94OiBzaW5vbi5mYWtlKCksXG4gICAgICAgICAgc3RhcnRDb21wb3Npbmc6IHNpbm9uLmZha2UoKSxcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdnZXRSb3dDb3VudCcsICgpID0+IHtcbiAgICBpdCgncmV0dXJucyAxMDAgaWYgYW55IHJlc3VsdHMgYXJlIGxvYWRpbmcnLCAoKSA9PiB7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoXG4gICAgICAgIG5ldyBMZWZ0UGFuZVNlYXJjaEhlbHBlcih7XG4gICAgICAgICAgY29udmVyc2F0aW9uUmVzdWx0czogeyBpc0xvYWRpbmc6IHRydWUgfSxcbiAgICAgICAgICBjb250YWN0UmVzdWx0czogeyBpc0xvYWRpbmc6IHRydWUgfSxcbiAgICAgICAgICBtZXNzYWdlUmVzdWx0czogeyBpc0xvYWRpbmc6IHRydWUgfSxcbiAgICAgICAgICBzZWFyY2hUZXJtOiAnZm9vJyxcbiAgICAgICAgICBwcmltYXJ5U2VuZHNTbXM6IGZhbHNlLFxuICAgICAgICAgIHNlYXJjaENvbnZlcnNhdGlvbjogdW5kZWZpbmVkLFxuICAgICAgICAgIHNlYXJjaERpc2FibGVkOiBmYWxzZSxcbiAgICAgICAgICBzdGFydFNlYXJjaENvdW50ZXI6IDAsXG4gICAgICAgIH0pLmdldFJvd0NvdW50KCksXG4gICAgICAgIDEwMFxuICAgICAgKTtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgICAgbmV3IExlZnRQYW5lU2VhcmNoSGVscGVyKHtcbiAgICAgICAgICBjb252ZXJzYXRpb25SZXN1bHRzOiB7XG4gICAgICAgICAgICBpc0xvYWRpbmc6IGZhbHNlLFxuICAgICAgICAgICAgcmVzdWx0czogW2dldERlZmF1bHRDb252ZXJzYXRpb24oKSwgZ2V0RGVmYXVsdENvbnZlcnNhdGlvbigpXSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIGNvbnRhY3RSZXN1bHRzOiB7IGlzTG9hZGluZzogdHJ1ZSB9LFxuICAgICAgICAgIG1lc3NhZ2VSZXN1bHRzOiB7IGlzTG9hZGluZzogdHJ1ZSB9LFxuICAgICAgICAgIHNlYXJjaFRlcm06ICdmb28nLFxuICAgICAgICAgIHByaW1hcnlTZW5kc1NtczogZmFsc2UsXG4gICAgICAgICAgc2VhcmNoQ29udmVyc2F0aW9uOiB1bmRlZmluZWQsXG4gICAgICAgICAgc2VhcmNoRGlzYWJsZWQ6IGZhbHNlLFxuICAgICAgICAgIHN0YXJ0U2VhcmNoQ291bnRlcjogMCxcbiAgICAgICAgfSkuZ2V0Um93Q291bnQoKSxcbiAgICAgICAgMTAwXG4gICAgICApO1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgICBuZXcgTGVmdFBhbmVTZWFyY2hIZWxwZXIoe1xuICAgICAgICAgIGNvbnZlcnNhdGlvblJlc3VsdHM6IHsgaXNMb2FkaW5nOiB0cnVlIH0sXG4gICAgICAgICAgY29udGFjdFJlc3VsdHM6IHsgaXNMb2FkaW5nOiB0cnVlIH0sXG4gICAgICAgICAgbWVzc2FnZVJlc3VsdHM6IHsgaXNMb2FkaW5nOiBmYWxzZSwgcmVzdWx0czogW2Zha2VNZXNzYWdlKCldIH0sXG4gICAgICAgICAgc2VhcmNoVGVybTogJ2ZvbycsXG4gICAgICAgICAgcHJpbWFyeVNlbmRzU21zOiBmYWxzZSxcbiAgICAgICAgICBzZWFyY2hDb252ZXJzYXRpb246IHVuZGVmaW5lZCxcbiAgICAgICAgICBzZWFyY2hEaXNhYmxlZDogZmFsc2UsXG4gICAgICAgICAgc3RhcnRTZWFyY2hDb3VudGVyOiAwLFxuICAgICAgICB9KS5nZXRSb3dDb3VudCgpLFxuICAgICAgICAxMDBcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyAwIHdoZW4gdGhlcmUgYXJlIG5vIHNlYXJjaCByZXN1bHRzJywgKCkgPT4ge1xuICAgICAgY29uc3QgaGVscGVyID0gbmV3IExlZnRQYW5lU2VhcmNoSGVscGVyKHtcbiAgICAgICAgY29udmVyc2F0aW9uUmVzdWx0czogeyBpc0xvYWRpbmc6IGZhbHNlLCByZXN1bHRzOiBbXSB9LFxuICAgICAgICBjb250YWN0UmVzdWx0czogeyBpc0xvYWRpbmc6IGZhbHNlLCByZXN1bHRzOiBbXSB9LFxuICAgICAgICBtZXNzYWdlUmVzdWx0czogeyBpc0xvYWRpbmc6IGZhbHNlLCByZXN1bHRzOiBbXSB9LFxuICAgICAgICBzZWFyY2hUZXJtOiAnZm9vJyxcbiAgICAgICAgcHJpbWFyeVNlbmRzU21zOiBmYWxzZSxcbiAgICAgICAgc2VhcmNoQ29udmVyc2F0aW9uOiB1bmRlZmluZWQsXG4gICAgICAgIHNlYXJjaERpc2FibGVkOiBmYWxzZSxcbiAgICAgICAgc3RhcnRTZWFyY2hDb3VudGVyOiAwLFxuICAgICAgfSk7XG5cbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChoZWxwZXIuZ2V0Um93Q291bnQoKSwgMCk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyAxICsgdGhlIG51bWJlciBvZiByZXN1bHRzLCBkcm9wcGluZyBlbXB0eSBzZWN0aW9ucycsICgpID0+IHtcbiAgICAgIGNvbnN0IGhlbHBlciA9IG5ldyBMZWZ0UGFuZVNlYXJjaEhlbHBlcih7XG4gICAgICAgIGNvbnZlcnNhdGlvblJlc3VsdHM6IHtcbiAgICAgICAgICBpc0xvYWRpbmc6IGZhbHNlLFxuICAgICAgICAgIHJlc3VsdHM6IFtnZXREZWZhdWx0Q29udmVyc2F0aW9uKCksIGdldERlZmF1bHRDb252ZXJzYXRpb24oKV0sXG4gICAgICAgIH0sXG4gICAgICAgIGNvbnRhY3RSZXN1bHRzOiB7IGlzTG9hZGluZzogZmFsc2UsIHJlc3VsdHM6IFtdIH0sXG4gICAgICAgIG1lc3NhZ2VSZXN1bHRzOiB7IGlzTG9hZGluZzogZmFsc2UsIHJlc3VsdHM6IFtmYWtlTWVzc2FnZSgpXSB9LFxuICAgICAgICBzZWFyY2hUZXJtOiAnZm9vJyxcbiAgICAgICAgcHJpbWFyeVNlbmRzU21zOiBmYWxzZSxcbiAgICAgICAgc2VhcmNoQ29udmVyc2F0aW9uOiB1bmRlZmluZWQsXG4gICAgICAgIHNlYXJjaERpc2FibGVkOiBmYWxzZSxcbiAgICAgICAgc3RhcnRTZWFyY2hDb3VudGVyOiAwLFxuICAgICAgfSk7XG5cbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChoZWxwZXIuZ2V0Um93Q291bnQoKSwgNSk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdnZXRSb3cnLCAoKSA9PiB7XG4gICAgaXQoJ3JldHVybnMgYSBcImxvYWRpbmcgc2VhcmNoIHJlc3VsdHNcIiByb3cgaWYgYW55IHJlc3VsdHMgYXJlIGxvYWRpbmcnLCAoKSA9PiB7XG4gICAgICBjb25zdCBoZWxwZXJzID0gW1xuICAgICAgICBuZXcgTGVmdFBhbmVTZWFyY2hIZWxwZXIoe1xuICAgICAgICAgIGNvbnZlcnNhdGlvblJlc3VsdHM6IHsgaXNMb2FkaW5nOiB0cnVlIH0sXG4gICAgICAgICAgY29udGFjdFJlc3VsdHM6IHsgaXNMb2FkaW5nOiB0cnVlIH0sXG4gICAgICAgICAgbWVzc2FnZVJlc3VsdHM6IHsgaXNMb2FkaW5nOiB0cnVlIH0sXG4gICAgICAgICAgc2VhcmNoVGVybTogJ2ZvbycsXG4gICAgICAgICAgcHJpbWFyeVNlbmRzU21zOiBmYWxzZSxcbiAgICAgICAgICBzZWFyY2hDb252ZXJzYXRpb246IHVuZGVmaW5lZCxcbiAgICAgICAgICBzZWFyY2hEaXNhYmxlZDogZmFsc2UsXG4gICAgICAgICAgc3RhcnRTZWFyY2hDb3VudGVyOiAwLFxuICAgICAgICB9KSxcbiAgICAgICAgbmV3IExlZnRQYW5lU2VhcmNoSGVscGVyKHtcbiAgICAgICAgICBjb252ZXJzYXRpb25SZXN1bHRzOiB7XG4gICAgICAgICAgICBpc0xvYWRpbmc6IGZhbHNlLFxuICAgICAgICAgICAgcmVzdWx0czogW2dldERlZmF1bHRDb252ZXJzYXRpb24oKSwgZ2V0RGVmYXVsdENvbnZlcnNhdGlvbigpXSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIGNvbnRhY3RSZXN1bHRzOiB7IGlzTG9hZGluZzogdHJ1ZSB9LFxuICAgICAgICAgIG1lc3NhZ2VSZXN1bHRzOiB7IGlzTG9hZGluZzogdHJ1ZSB9LFxuICAgICAgICAgIHNlYXJjaFRlcm06ICdmb28nLFxuICAgICAgICAgIHByaW1hcnlTZW5kc1NtczogZmFsc2UsXG4gICAgICAgICAgc2VhcmNoQ29udmVyc2F0aW9uOiB1bmRlZmluZWQsXG4gICAgICAgICAgc2VhcmNoRGlzYWJsZWQ6IGZhbHNlLFxuICAgICAgICAgIHN0YXJ0U2VhcmNoQ291bnRlcjogMCxcbiAgICAgICAgfSksXG4gICAgICAgIG5ldyBMZWZ0UGFuZVNlYXJjaEhlbHBlcih7XG4gICAgICAgICAgY29udmVyc2F0aW9uUmVzdWx0czogeyBpc0xvYWRpbmc6IHRydWUgfSxcbiAgICAgICAgICBjb250YWN0UmVzdWx0czogeyBpc0xvYWRpbmc6IHRydWUgfSxcbiAgICAgICAgICBtZXNzYWdlUmVzdWx0czogeyBpc0xvYWRpbmc6IGZhbHNlLCByZXN1bHRzOiBbZmFrZU1lc3NhZ2UoKV0gfSxcbiAgICAgICAgICBzZWFyY2hUZXJtOiAnZm9vJyxcbiAgICAgICAgICBwcmltYXJ5U2VuZHNTbXM6IGZhbHNlLFxuICAgICAgICAgIHNlYXJjaENvbnZlcnNhdGlvbjogdW5kZWZpbmVkLFxuICAgICAgICAgIHNlYXJjaERpc2FibGVkOiBmYWxzZSxcbiAgICAgICAgICBzdGFydFNlYXJjaENvdW50ZXI6IDAsXG4gICAgICAgIH0pLFxuICAgICAgXTtcblxuICAgICAgaGVscGVycy5mb3JFYWNoKGhlbHBlciA9PiB7XG4gICAgICAgIGFzc2VydC5kZWVwRXF1YWwoaGVscGVyLmdldFJvdygwKSwge1xuICAgICAgICAgIHR5cGU6IFJvd1R5cGUuU2VhcmNoUmVzdWx0c0xvYWRpbmdGYWtlSGVhZGVyLFxuICAgICAgICB9KTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCA5OTsgaSArPSAxKSB7XG4gICAgICAgICAgYXNzZXJ0LmRlZXBFcXVhbChoZWxwZXIuZ2V0Um93KGkpLCB7XG4gICAgICAgICAgICB0eXBlOiBSb3dUeXBlLlNlYXJjaFJlc3VsdHNMb2FkaW5nRmFrZVJvdyxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBhc3NlcnQuaXNVbmRlZmluZWQoaGVscGVyLmdldFJvdygxMDApKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgaGVhZGVyICsgcmVzdWx0cyB3aGVuIGFsbCBzZWN0aW9ucyBoYXZlIGxvYWRlZCB3aXRoIHJlc3VsdHMnLCAoKSA9PiB7XG4gICAgICBjb25zdCBjb252ZXJzYXRpb25zID0gW1xuICAgICAgICBnZXREZWZhdWx0Q29udmVyc2F0aW9uKCksXG4gICAgICAgIGdldERlZmF1bHRDb252ZXJzYXRpb24oKSxcbiAgICAgIF07XG4gICAgICBjb25zdCBjb250YWN0cyA9IFtnZXREZWZhdWx0Q29udmVyc2F0aW9uKCldO1xuICAgICAgY29uc3QgbWVzc2FnZXMgPSBbZmFrZU1lc3NhZ2UoKSwgZmFrZU1lc3NhZ2UoKV07XG5cbiAgICAgIGNvbnN0IGhlbHBlciA9IG5ldyBMZWZ0UGFuZVNlYXJjaEhlbHBlcih7XG4gICAgICAgIGNvbnZlcnNhdGlvblJlc3VsdHM6IHtcbiAgICAgICAgICBpc0xvYWRpbmc6IGZhbHNlLFxuICAgICAgICAgIHJlc3VsdHM6IGNvbnZlcnNhdGlvbnMsXG4gICAgICAgIH0sXG4gICAgICAgIGNvbnRhY3RSZXN1bHRzOiB7IGlzTG9hZGluZzogZmFsc2UsIHJlc3VsdHM6IGNvbnRhY3RzIH0sXG4gICAgICAgIG1lc3NhZ2VSZXN1bHRzOiB7IGlzTG9hZGluZzogZmFsc2UsIHJlc3VsdHM6IG1lc3NhZ2VzIH0sXG4gICAgICAgIHNlYXJjaFRlcm06ICdmb28nLFxuICAgICAgICBwcmltYXJ5U2VuZHNTbXM6IGZhbHNlLFxuICAgICAgICBzZWFyY2hDb252ZXJzYXRpb246IHVuZGVmaW5lZCxcbiAgICAgICAgc2VhcmNoRGlzYWJsZWQ6IGZhbHNlLFxuICAgICAgICBzdGFydFNlYXJjaENvdW50ZXI6IDAsXG4gICAgICB9KTtcblxuICAgICAgYXNzZXJ0LmRlZXBFcXVhbChoZWxwZXIuZ2V0Um93KDApLCB7XG4gICAgICAgIHR5cGU6IFJvd1R5cGUuSGVhZGVyLFxuICAgICAgICBpMThuS2V5OiAnY29udmVyc2F0aW9uc0hlYWRlcicsXG4gICAgICB9KTtcbiAgICAgIGFzc2VydC5kZWVwRXF1YWwoaGVscGVyLmdldFJvdygxKSwge1xuICAgICAgICB0eXBlOiBSb3dUeXBlLkNvbnZlcnNhdGlvbixcbiAgICAgICAgY29udmVyc2F0aW9uOiBjb252ZXJzYXRpb25zWzBdLFxuICAgICAgfSk7XG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKGhlbHBlci5nZXRSb3coMiksIHtcbiAgICAgICAgdHlwZTogUm93VHlwZS5Db252ZXJzYXRpb24sXG4gICAgICAgIGNvbnZlcnNhdGlvbjogY29udmVyc2F0aW9uc1sxXSxcbiAgICAgIH0pO1xuICAgICAgYXNzZXJ0LmRlZXBFcXVhbChoZWxwZXIuZ2V0Um93KDMpLCB7XG4gICAgICAgIHR5cGU6IFJvd1R5cGUuSGVhZGVyLFxuICAgICAgICBpMThuS2V5OiAnY29udGFjdHNIZWFkZXInLFxuICAgICAgfSk7XG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKGhlbHBlci5nZXRSb3coNCksIHtcbiAgICAgICAgdHlwZTogUm93VHlwZS5Db252ZXJzYXRpb24sXG4gICAgICAgIGNvbnZlcnNhdGlvbjogY29udGFjdHNbMF0sXG4gICAgICB9KTtcbiAgICAgIGFzc2VydC5kZWVwRXF1YWwoaGVscGVyLmdldFJvdyg1KSwge1xuICAgICAgICB0eXBlOiBSb3dUeXBlLkhlYWRlcixcbiAgICAgICAgaTE4bktleTogJ21lc3NhZ2VzSGVhZGVyJyxcbiAgICAgIH0pO1xuICAgICAgYXNzZXJ0LmRlZXBFcXVhbChoZWxwZXIuZ2V0Um93KDYpLCB7XG4gICAgICAgIHR5cGU6IFJvd1R5cGUuTWVzc2FnZVNlYXJjaFJlc3VsdCxcbiAgICAgICAgbWVzc2FnZUlkOiBtZXNzYWdlc1swXS5pZCxcbiAgICAgIH0pO1xuICAgICAgYXNzZXJ0LmRlZXBFcXVhbChoZWxwZXIuZ2V0Um93KDcpLCB7XG4gICAgICAgIHR5cGU6IFJvd1R5cGUuTWVzc2FnZVNlYXJjaFJlc3VsdCxcbiAgICAgICAgbWVzc2FnZUlkOiBtZXNzYWdlc1sxXS5pZCxcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgaXQoJ29taXRzIGNvbnZlcnNhdGlvbnMgd2hlbiB0aGVyZSBhcmUgbm8gY29udmVyc2F0aW9uIHJlc3VsdHMnLCAoKSA9PiB7XG4gICAgICBjb25zdCBjb250YWN0cyA9IFtnZXREZWZhdWx0Q29udmVyc2F0aW9uKCldO1xuICAgICAgY29uc3QgbWVzc2FnZXMgPSBbZmFrZU1lc3NhZ2UoKSwgZmFrZU1lc3NhZ2UoKV07XG5cbiAgICAgIGNvbnN0IGhlbHBlciA9IG5ldyBMZWZ0UGFuZVNlYXJjaEhlbHBlcih7XG4gICAgICAgIGNvbnZlcnNhdGlvblJlc3VsdHM6IHtcbiAgICAgICAgICBpc0xvYWRpbmc6IGZhbHNlLFxuICAgICAgICAgIHJlc3VsdHM6IFtdLFxuICAgICAgICB9LFxuICAgICAgICBjb250YWN0UmVzdWx0czogeyBpc0xvYWRpbmc6IGZhbHNlLCByZXN1bHRzOiBjb250YWN0cyB9LFxuICAgICAgICBtZXNzYWdlUmVzdWx0czogeyBpc0xvYWRpbmc6IGZhbHNlLCByZXN1bHRzOiBtZXNzYWdlcyB9LFxuICAgICAgICBzZWFyY2hUZXJtOiAnZm9vJyxcbiAgICAgICAgcHJpbWFyeVNlbmRzU21zOiBmYWxzZSxcbiAgICAgICAgc2VhcmNoQ29udmVyc2F0aW9uOiB1bmRlZmluZWQsXG4gICAgICAgIHNlYXJjaERpc2FibGVkOiBmYWxzZSxcbiAgICAgICAgc3RhcnRTZWFyY2hDb3VudGVyOiAwLFxuICAgICAgfSk7XG5cbiAgICAgIGFzc2VydC5kZWVwRXF1YWwoaGVscGVyLmdldFJvdygwKSwge1xuICAgICAgICB0eXBlOiBSb3dUeXBlLkhlYWRlcixcbiAgICAgICAgaTE4bktleTogJ2NvbnRhY3RzSGVhZGVyJyxcbiAgICAgIH0pO1xuICAgICAgYXNzZXJ0LmRlZXBFcXVhbChoZWxwZXIuZ2V0Um93KDEpLCB7XG4gICAgICAgIHR5cGU6IFJvd1R5cGUuQ29udmVyc2F0aW9uLFxuICAgICAgICBjb252ZXJzYXRpb246IGNvbnRhY3RzWzBdLFxuICAgICAgfSk7XG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKGhlbHBlci5nZXRSb3coMiksIHtcbiAgICAgICAgdHlwZTogUm93VHlwZS5IZWFkZXIsXG4gICAgICAgIGkxOG5LZXk6ICdtZXNzYWdlc0hlYWRlcicsXG4gICAgICB9KTtcbiAgICAgIGFzc2VydC5kZWVwRXF1YWwoaGVscGVyLmdldFJvdygzKSwge1xuICAgICAgICB0eXBlOiBSb3dUeXBlLk1lc3NhZ2VTZWFyY2hSZXN1bHQsXG4gICAgICAgIG1lc3NhZ2VJZDogbWVzc2FnZXNbMF0uaWQsXG4gICAgICB9KTtcbiAgICAgIGFzc2VydC5kZWVwRXF1YWwoaGVscGVyLmdldFJvdyg0KSwge1xuICAgICAgICB0eXBlOiBSb3dUeXBlLk1lc3NhZ2VTZWFyY2hSZXN1bHQsXG4gICAgICAgIG1lc3NhZ2VJZDogbWVzc2FnZXNbMV0uaWQsXG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGl0KCdvbWl0cyBjb250YWN0cyB3aGVuIHRoZXJlIGFyZSBubyBjb250YWN0IHJlc3VsdHMnLCAoKSA9PiB7XG4gICAgICBjb25zdCBjb252ZXJzYXRpb25zID0gW1xuICAgICAgICBnZXREZWZhdWx0Q29udmVyc2F0aW9uKCksXG4gICAgICAgIGdldERlZmF1bHRDb252ZXJzYXRpb24oKSxcbiAgICAgIF07XG4gICAgICBjb25zdCBtZXNzYWdlcyA9IFtmYWtlTWVzc2FnZSgpLCBmYWtlTWVzc2FnZSgpXTtcblxuICAgICAgY29uc3QgaGVscGVyID0gbmV3IExlZnRQYW5lU2VhcmNoSGVscGVyKHtcbiAgICAgICAgY29udmVyc2F0aW9uUmVzdWx0czoge1xuICAgICAgICAgIGlzTG9hZGluZzogZmFsc2UsXG4gICAgICAgICAgcmVzdWx0czogY29udmVyc2F0aW9ucyxcbiAgICAgICAgfSxcbiAgICAgICAgY29udGFjdFJlc3VsdHM6IHsgaXNMb2FkaW5nOiBmYWxzZSwgcmVzdWx0czogW10gfSxcbiAgICAgICAgbWVzc2FnZVJlc3VsdHM6IHsgaXNMb2FkaW5nOiBmYWxzZSwgcmVzdWx0czogbWVzc2FnZXMgfSxcbiAgICAgICAgc2VhcmNoVGVybTogJ2ZvbycsXG4gICAgICAgIHByaW1hcnlTZW5kc1NtczogZmFsc2UsXG4gICAgICAgIHNlYXJjaENvbnZlcnNhdGlvbjogdW5kZWZpbmVkLFxuICAgICAgICBzZWFyY2hEaXNhYmxlZDogZmFsc2UsXG4gICAgICAgIHN0YXJ0U2VhcmNoQ291bnRlcjogMCxcbiAgICAgIH0pO1xuXG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKGhlbHBlci5nZXRSb3coMCksIHtcbiAgICAgICAgdHlwZTogUm93VHlwZS5IZWFkZXIsXG4gICAgICAgIGkxOG5LZXk6ICdjb252ZXJzYXRpb25zSGVhZGVyJyxcbiAgICAgIH0pO1xuICAgICAgYXNzZXJ0LmRlZXBFcXVhbChoZWxwZXIuZ2V0Um93KDEpLCB7XG4gICAgICAgIHR5cGU6IFJvd1R5cGUuQ29udmVyc2F0aW9uLFxuICAgICAgICBjb252ZXJzYXRpb246IGNvbnZlcnNhdGlvbnNbMF0sXG4gICAgICB9KTtcbiAgICAgIGFzc2VydC5kZWVwRXF1YWwoaGVscGVyLmdldFJvdygyKSwge1xuICAgICAgICB0eXBlOiBSb3dUeXBlLkNvbnZlcnNhdGlvbixcbiAgICAgICAgY29udmVyc2F0aW9uOiBjb252ZXJzYXRpb25zWzFdLFxuICAgICAgfSk7XG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKGhlbHBlci5nZXRSb3coMyksIHtcbiAgICAgICAgdHlwZTogUm93VHlwZS5IZWFkZXIsXG4gICAgICAgIGkxOG5LZXk6ICdtZXNzYWdlc0hlYWRlcicsXG4gICAgICB9KTtcbiAgICAgIGFzc2VydC5kZWVwRXF1YWwoaGVscGVyLmdldFJvdyg0KSwge1xuICAgICAgICB0eXBlOiBSb3dUeXBlLk1lc3NhZ2VTZWFyY2hSZXN1bHQsXG4gICAgICAgIG1lc3NhZ2VJZDogbWVzc2FnZXNbMF0uaWQsXG4gICAgICB9KTtcbiAgICAgIGFzc2VydC5kZWVwRXF1YWwoaGVscGVyLmdldFJvdyg1KSwge1xuICAgICAgICB0eXBlOiBSb3dUeXBlLk1lc3NhZ2VTZWFyY2hSZXN1bHQsXG4gICAgICAgIG1lc3NhZ2VJZDogbWVzc2FnZXNbMV0uaWQsXG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgaXQoJ29taXRzIG1lc3NhZ2VzIHdoZW4gdGhlcmUgYXJlIG5vIG1lc3NhZ2UgcmVzdWx0cycsICgpID0+IHtcbiAgICBjb25zdCBjb252ZXJzYXRpb25zID0gW2dldERlZmF1bHRDb252ZXJzYXRpb24oKSwgZ2V0RGVmYXVsdENvbnZlcnNhdGlvbigpXTtcbiAgICBjb25zdCBjb250YWN0cyA9IFtnZXREZWZhdWx0Q29udmVyc2F0aW9uKCldO1xuXG4gICAgY29uc3QgaGVscGVyID0gbmV3IExlZnRQYW5lU2VhcmNoSGVscGVyKHtcbiAgICAgIGNvbnZlcnNhdGlvblJlc3VsdHM6IHtcbiAgICAgICAgaXNMb2FkaW5nOiBmYWxzZSxcbiAgICAgICAgcmVzdWx0czogY29udmVyc2F0aW9ucyxcbiAgICAgIH0sXG4gICAgICBjb250YWN0UmVzdWx0czogeyBpc0xvYWRpbmc6IGZhbHNlLCByZXN1bHRzOiBjb250YWN0cyB9LFxuICAgICAgbWVzc2FnZVJlc3VsdHM6IHsgaXNMb2FkaW5nOiBmYWxzZSwgcmVzdWx0czogW10gfSxcbiAgICAgIHNlYXJjaFRlcm06ICdmb28nLFxuICAgICAgcHJpbWFyeVNlbmRzU21zOiBmYWxzZSxcbiAgICAgIHNlYXJjaENvbnZlcnNhdGlvbjogdW5kZWZpbmVkLFxuICAgICAgc2VhcmNoRGlzYWJsZWQ6IGZhbHNlLFxuICAgICAgc3RhcnRTZWFyY2hDb3VudGVyOiAwLFxuICAgIH0pO1xuXG4gICAgYXNzZXJ0LmRlZXBFcXVhbChoZWxwZXIuZ2V0Um93KDApLCB7XG4gICAgICB0eXBlOiBSb3dUeXBlLkhlYWRlcixcbiAgICAgIGkxOG5LZXk6ICdjb252ZXJzYXRpb25zSGVhZGVyJyxcbiAgICB9KTtcbiAgICBhc3NlcnQuZGVlcEVxdWFsKGhlbHBlci5nZXRSb3coMSksIHtcbiAgICAgIHR5cGU6IFJvd1R5cGUuQ29udmVyc2F0aW9uLFxuICAgICAgY29udmVyc2F0aW9uOiBjb252ZXJzYXRpb25zWzBdLFxuICAgIH0pO1xuICAgIGFzc2VydC5kZWVwRXF1YWwoaGVscGVyLmdldFJvdygyKSwge1xuICAgICAgdHlwZTogUm93VHlwZS5Db252ZXJzYXRpb24sXG4gICAgICBjb252ZXJzYXRpb246IGNvbnZlcnNhdGlvbnNbMV0sXG4gICAgfSk7XG4gICAgYXNzZXJ0LmRlZXBFcXVhbChoZWxwZXIuZ2V0Um93KDMpLCB7XG4gICAgICB0eXBlOiBSb3dUeXBlLkhlYWRlcixcbiAgICAgIGkxOG5LZXk6ICdjb250YWN0c0hlYWRlcicsXG4gICAgfSk7XG4gICAgYXNzZXJ0LmRlZXBFcXVhbChoZWxwZXIuZ2V0Um93KDQpLCB7XG4gICAgICB0eXBlOiBSb3dUeXBlLkNvbnZlcnNhdGlvbixcbiAgICAgIGNvbnZlcnNhdGlvbjogY29udGFjdHNbMF0sXG4gICAgfSk7XG4gICAgYXNzZXJ0LmlzVW5kZWZpbmVkKGhlbHBlci5nZXRSb3coNSkpO1xuICB9KTtcblxuICBkZXNjcmliZSgnaXNTY3JvbGxhYmxlJywgKCkgPT4ge1xuICAgIGl0KCdyZXR1cm5zIGZhbHNlIGlmIGFueSByZXN1bHRzIGFyZSBsb2FkaW5nJywgKCkgPT4ge1xuICAgICAgY29uc3QgaGVscGVycyA9IFtcbiAgICAgICAgbmV3IExlZnRQYW5lU2VhcmNoSGVscGVyKHtcbiAgICAgICAgICBjb252ZXJzYXRpb25SZXN1bHRzOiB7IGlzTG9hZGluZzogdHJ1ZSB9LFxuICAgICAgICAgIGNvbnRhY3RSZXN1bHRzOiB7IGlzTG9hZGluZzogdHJ1ZSB9LFxuICAgICAgICAgIG1lc3NhZ2VSZXN1bHRzOiB7IGlzTG9hZGluZzogdHJ1ZSB9LFxuICAgICAgICAgIHNlYXJjaFRlcm06ICdmb28nLFxuICAgICAgICAgIHByaW1hcnlTZW5kc1NtczogZmFsc2UsXG4gICAgICAgICAgc2VhcmNoQ29udmVyc2F0aW9uOiB1bmRlZmluZWQsXG4gICAgICAgICAgc2VhcmNoRGlzYWJsZWQ6IGZhbHNlLFxuICAgICAgICAgIHN0YXJ0U2VhcmNoQ291bnRlcjogMCxcbiAgICAgICAgfSksXG4gICAgICAgIG5ldyBMZWZ0UGFuZVNlYXJjaEhlbHBlcih7XG4gICAgICAgICAgY29udmVyc2F0aW9uUmVzdWx0czoge1xuICAgICAgICAgICAgaXNMb2FkaW5nOiBmYWxzZSxcbiAgICAgICAgICAgIHJlc3VsdHM6IFtnZXREZWZhdWx0Q29udmVyc2F0aW9uKCksIGdldERlZmF1bHRDb252ZXJzYXRpb24oKV0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICBjb250YWN0UmVzdWx0czogeyBpc0xvYWRpbmc6IHRydWUgfSxcbiAgICAgICAgICBtZXNzYWdlUmVzdWx0czogeyBpc0xvYWRpbmc6IHRydWUgfSxcbiAgICAgICAgICBzZWFyY2hUZXJtOiAnZm9vJyxcbiAgICAgICAgICBwcmltYXJ5U2VuZHNTbXM6IGZhbHNlLFxuICAgICAgICAgIHNlYXJjaENvbnZlcnNhdGlvbjogdW5kZWZpbmVkLFxuICAgICAgICAgIHNlYXJjaERpc2FibGVkOiBmYWxzZSxcbiAgICAgICAgICBzdGFydFNlYXJjaENvdW50ZXI6IDAsXG4gICAgICAgIH0pLFxuICAgICAgICBuZXcgTGVmdFBhbmVTZWFyY2hIZWxwZXIoe1xuICAgICAgICAgIGNvbnZlcnNhdGlvblJlc3VsdHM6IHsgaXNMb2FkaW5nOiB0cnVlIH0sXG4gICAgICAgICAgY29udGFjdFJlc3VsdHM6IHsgaXNMb2FkaW5nOiB0cnVlIH0sXG4gICAgICAgICAgbWVzc2FnZVJlc3VsdHM6IHsgaXNMb2FkaW5nOiBmYWxzZSwgcmVzdWx0czogW2Zha2VNZXNzYWdlKCldIH0sXG4gICAgICAgICAgc2VhcmNoVGVybTogJ2ZvbycsXG4gICAgICAgICAgcHJpbWFyeVNlbmRzU21zOiBmYWxzZSxcbiAgICAgICAgICBzZWFyY2hDb252ZXJzYXRpb246IHVuZGVmaW5lZCxcbiAgICAgICAgICBzZWFyY2hEaXNhYmxlZDogZmFsc2UsXG4gICAgICAgICAgc3RhcnRTZWFyY2hDb3VudGVyOiAwLFxuICAgICAgICB9KSxcbiAgICAgIF07XG5cbiAgICAgIGhlbHBlcnMuZm9yRWFjaChoZWxwZXIgPT4ge1xuICAgICAgICBhc3NlcnQuaXNGYWxzZShoZWxwZXIuaXNTY3JvbGxhYmxlKCkpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyB0cnVlIGlmIGFsbCByZXN1bHRzIGhhdmUgbG9hZGVkJywgKCkgPT4ge1xuICAgICAgY29uc3QgaGVscGVyID0gbmV3IExlZnRQYW5lU2VhcmNoSGVscGVyKHtcbiAgICAgICAgY29udmVyc2F0aW9uUmVzdWx0czoge1xuICAgICAgICAgIGlzTG9hZGluZzogZmFsc2UsXG4gICAgICAgICAgcmVzdWx0czogW2dldERlZmF1bHRDb252ZXJzYXRpb24oKSwgZ2V0RGVmYXVsdENvbnZlcnNhdGlvbigpXSxcbiAgICAgICAgfSxcbiAgICAgICAgY29udGFjdFJlc3VsdHM6IHsgaXNMb2FkaW5nOiBmYWxzZSwgcmVzdWx0czogW10gfSxcbiAgICAgICAgbWVzc2FnZVJlc3VsdHM6IHtcbiAgICAgICAgICBpc0xvYWRpbmc6IGZhbHNlLFxuICAgICAgICAgIHJlc3VsdHM6IFtmYWtlTWVzc2FnZSgpLCBmYWtlTWVzc2FnZSgpLCBmYWtlTWVzc2FnZSgpXSxcbiAgICAgICAgfSxcbiAgICAgICAgc2VhcmNoVGVybTogJ2ZvbycsXG4gICAgICAgIHByaW1hcnlTZW5kc1NtczogZmFsc2UsXG4gICAgICAgIHNlYXJjaENvbnZlcnNhdGlvbjogdW5kZWZpbmVkLFxuICAgICAgICBzZWFyY2hEaXNhYmxlZDogZmFsc2UsXG4gICAgICAgIHN0YXJ0U2VhcmNoQ291bnRlcjogMCxcbiAgICAgIH0pO1xuICAgICAgYXNzZXJ0LmlzVHJ1ZShoZWxwZXIuaXNTY3JvbGxhYmxlKCkpO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnc2hvdWxkUmVjb21wdXRlUm93SGVpZ2h0cycsICgpID0+IHtcbiAgICBpdChcInJldHVybnMgZmFsc2UgaWYgdGhlIG51bWJlciBvZiByZXN1bHRzIGRvZXNuJ3QgY2hhbmdlXCIsICgpID0+IHtcbiAgICAgIGNvbnN0IGhlbHBlciA9IG5ldyBMZWZ0UGFuZVNlYXJjaEhlbHBlcih7XG4gICAgICAgIGNvbnZlcnNhdGlvblJlc3VsdHM6IHtcbiAgICAgICAgICBpc0xvYWRpbmc6IGZhbHNlLFxuICAgICAgICAgIHJlc3VsdHM6IFtnZXREZWZhdWx0Q29udmVyc2F0aW9uKCksIGdldERlZmF1bHRDb252ZXJzYXRpb24oKV0sXG4gICAgICAgIH0sXG4gICAgICAgIGNvbnRhY3RSZXN1bHRzOiB7IGlzTG9hZGluZzogZmFsc2UsIHJlc3VsdHM6IFtdIH0sXG4gICAgICAgIG1lc3NhZ2VSZXN1bHRzOiB7XG4gICAgICAgICAgaXNMb2FkaW5nOiBmYWxzZSxcbiAgICAgICAgICByZXN1bHRzOiBbZmFrZU1lc3NhZ2UoKSwgZmFrZU1lc3NhZ2UoKSwgZmFrZU1lc3NhZ2UoKV0sXG4gICAgICAgIH0sXG4gICAgICAgIHNlYXJjaFRlcm06ICdmb28nLFxuICAgICAgICBwcmltYXJ5U2VuZHNTbXM6IGZhbHNlLFxuICAgICAgICBzZWFyY2hDb252ZXJzYXRpb246IHVuZGVmaW5lZCxcbiAgICAgICAgc2VhcmNoRGlzYWJsZWQ6IGZhbHNlLFxuICAgICAgICBzdGFydFNlYXJjaENvdW50ZXI6IDAsXG4gICAgICB9KTtcblxuICAgICAgYXNzZXJ0LmlzRmFsc2UoXG4gICAgICAgIGhlbHBlci5zaG91bGRSZWNvbXB1dGVSb3dIZWlnaHRzKHtcbiAgICAgICAgICBjb252ZXJzYXRpb25SZXN1bHRzOiB7XG4gICAgICAgICAgICBpc0xvYWRpbmc6IGZhbHNlLFxuICAgICAgICAgICAgcmVzdWx0czogW2dldERlZmF1bHRDb252ZXJzYXRpb24oKSwgZ2V0RGVmYXVsdENvbnZlcnNhdGlvbigpXSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIGNvbnRhY3RSZXN1bHRzOiB7IGlzTG9hZGluZzogZmFsc2UsIHJlc3VsdHM6IFtdIH0sXG4gICAgICAgICAgbWVzc2FnZVJlc3VsdHM6IHtcbiAgICAgICAgICAgIGlzTG9hZGluZzogZmFsc2UsXG4gICAgICAgICAgICByZXN1bHRzOiBbZmFrZU1lc3NhZ2UoKSwgZmFrZU1lc3NhZ2UoKSwgZmFrZU1lc3NhZ2UoKV0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICBzZWFyY2hUZXJtOiAnYmFyJyxcbiAgICAgICAgICBwcmltYXJ5U2VuZHNTbXM6IGZhbHNlLFxuICAgICAgICAgIHNlYXJjaENvbnZlcnNhdGlvbjogdW5kZWZpbmVkLFxuICAgICAgICAgIHNlYXJjaERpc2FibGVkOiBmYWxzZSxcbiAgICAgICAgICBzdGFydFNlYXJjaENvdW50ZXI6IDAsXG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgZmFsc2Ugd2hlbiBhIHNlY3Rpb24gY29tcGxldGVzIGxvYWRpbmcsIGJ1dCBub3QgYWxsIHNlY3Rpb25zIGFyZSBkb25lIChiZWNhdXNlIHRoZSBwYW5lIGlzIHN0aWxsIGxvYWRpbmcgb3ZlcmFsbCknLCAoKSA9PiB7XG4gICAgICBjb25zdCBoZWxwZXIgPSBuZXcgTGVmdFBhbmVTZWFyY2hIZWxwZXIoe1xuICAgICAgICBjb252ZXJzYXRpb25SZXN1bHRzOiB7IGlzTG9hZGluZzogdHJ1ZSB9LFxuICAgICAgICBjb250YWN0UmVzdWx0czogeyBpc0xvYWRpbmc6IHRydWUgfSxcbiAgICAgICAgbWVzc2FnZVJlc3VsdHM6IHsgaXNMb2FkaW5nOiB0cnVlIH0sXG4gICAgICAgIHNlYXJjaFRlcm06ICdmb28nLFxuICAgICAgICBwcmltYXJ5U2VuZHNTbXM6IGZhbHNlLFxuICAgICAgICBzZWFyY2hDb252ZXJzYXRpb246IHVuZGVmaW5lZCxcbiAgICAgICAgc2VhcmNoRGlzYWJsZWQ6IGZhbHNlLFxuICAgICAgICBzdGFydFNlYXJjaENvdW50ZXI6IDAsXG4gICAgICB9KTtcblxuICAgICAgYXNzZXJ0LmlzRmFsc2UoXG4gICAgICAgIGhlbHBlci5zaG91bGRSZWNvbXB1dGVSb3dIZWlnaHRzKHtcbiAgICAgICAgICBjb252ZXJzYXRpb25SZXN1bHRzOiB7XG4gICAgICAgICAgICBpc0xvYWRpbmc6IGZhbHNlLFxuICAgICAgICAgICAgcmVzdWx0czogW2dldERlZmF1bHRDb252ZXJzYXRpb24oKV0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICBjb250YWN0UmVzdWx0czogeyBpc0xvYWRpbmc6IHRydWUgfSxcbiAgICAgICAgICBtZXNzYWdlUmVzdWx0czogeyBpc0xvYWRpbmc6IHRydWUgfSxcbiAgICAgICAgICBzZWFyY2hUZXJtOiAnYmFyJyxcbiAgICAgICAgICBwcmltYXJ5U2VuZHNTbXM6IGZhbHNlLFxuICAgICAgICAgIHNlYXJjaENvbnZlcnNhdGlvbjogdW5kZWZpbmVkLFxuICAgICAgICAgIHNlYXJjaERpc2FibGVkOiBmYWxzZSxcbiAgICAgICAgICBzdGFydFNlYXJjaENvdW50ZXI6IDAsXG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgdHJ1ZSB3aGVuIGFsbCBzZWN0aW9ucyBmaW5pc2ggbG9hZGluZycsICgpID0+IHtcbiAgICAgIGNvbnN0IGhlbHBlciA9IG5ldyBMZWZ0UGFuZVNlYXJjaEhlbHBlcih7XG4gICAgICAgIGNvbnZlcnNhdGlvblJlc3VsdHM6IHsgaXNMb2FkaW5nOiB0cnVlIH0sXG4gICAgICAgIGNvbnRhY3RSZXN1bHRzOiB7IGlzTG9hZGluZzogdHJ1ZSB9LFxuICAgICAgICBtZXNzYWdlUmVzdWx0czogeyBpc0xvYWRpbmc6IGZhbHNlLCByZXN1bHRzOiBbZmFrZU1lc3NhZ2UoKV0gfSxcbiAgICAgICAgc2VhcmNoVGVybTogJ2ZvbycsXG4gICAgICAgIHByaW1hcnlTZW5kc1NtczogZmFsc2UsXG4gICAgICAgIHNlYXJjaENvbnZlcnNhdGlvbjogdW5kZWZpbmVkLFxuICAgICAgICBzZWFyY2hEaXNhYmxlZDogZmFsc2UsXG4gICAgICAgIHN0YXJ0U2VhcmNoQ291bnRlcjogMCxcbiAgICAgIH0pO1xuXG4gICAgICBhc3NlcnQuaXNUcnVlKFxuICAgICAgICBoZWxwZXIuc2hvdWxkUmVjb21wdXRlUm93SGVpZ2h0cyh7XG4gICAgICAgICAgY29udmVyc2F0aW9uUmVzdWx0czoge1xuICAgICAgICAgICAgaXNMb2FkaW5nOiBmYWxzZSxcbiAgICAgICAgICAgIHJlc3VsdHM6IFtnZXREZWZhdWx0Q29udmVyc2F0aW9uKCksIGdldERlZmF1bHRDb252ZXJzYXRpb24oKV0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICBjb250YWN0UmVzdWx0czogeyBpc0xvYWRpbmc6IGZhbHNlLCByZXN1bHRzOiBbXSB9LFxuICAgICAgICAgIG1lc3NhZ2VSZXN1bHRzOiB7IGlzTG9hZGluZzogZmFsc2UsIHJlc3VsdHM6IFtmYWtlTWVzc2FnZSgpXSB9LFxuICAgICAgICAgIHNlYXJjaFRlcm06ICdmb28nLFxuICAgICAgICAgIHByaW1hcnlTZW5kc1NtczogZmFsc2UsXG4gICAgICAgICAgc2VhcmNoQ29udmVyc2F0aW9uOiB1bmRlZmluZWQsXG4gICAgICAgICAgc2VhcmNoRGlzYWJsZWQ6IGZhbHNlLFxuICAgICAgICAgIHN0YXJ0U2VhcmNoQ291bnRlcjogMCxcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyB0cnVlIGlmIHRoZSBudW1iZXIgb2YgcmVzdWx0cyBpbiBhIHNlY3Rpb24gY2hhbmdlcycsICgpID0+IHtcbiAgICAgIGNvbnN0IGhlbHBlciA9IG5ldyBMZWZ0UGFuZVNlYXJjaEhlbHBlcih7XG4gICAgICAgIGNvbnZlcnNhdGlvblJlc3VsdHM6IHtcbiAgICAgICAgICBpc0xvYWRpbmc6IGZhbHNlLFxuICAgICAgICAgIHJlc3VsdHM6IFtnZXREZWZhdWx0Q29udmVyc2F0aW9uKCksIGdldERlZmF1bHRDb252ZXJzYXRpb24oKV0sXG4gICAgICAgIH0sXG4gICAgICAgIGNvbnRhY3RSZXN1bHRzOiB7IGlzTG9hZGluZzogZmFsc2UsIHJlc3VsdHM6IFtdIH0sXG4gICAgICAgIG1lc3NhZ2VSZXN1bHRzOiB7IGlzTG9hZGluZzogZmFsc2UsIHJlc3VsdHM6IFtdIH0sXG4gICAgICAgIHNlYXJjaFRlcm06ICdmb28nLFxuICAgICAgICBwcmltYXJ5U2VuZHNTbXM6IGZhbHNlLFxuICAgICAgICBzZWFyY2hDb252ZXJzYXRpb246IHVuZGVmaW5lZCxcbiAgICAgICAgc2VhcmNoRGlzYWJsZWQ6IGZhbHNlLFxuICAgICAgICBzdGFydFNlYXJjaENvdW50ZXI6IDAsXG4gICAgICB9KTtcblxuICAgICAgYXNzZXJ0LmlzVHJ1ZShcbiAgICAgICAgaGVscGVyLnNob3VsZFJlY29tcHV0ZVJvd0hlaWdodHMoe1xuICAgICAgICAgIGNvbnZlcnNhdGlvblJlc3VsdHM6IHtcbiAgICAgICAgICAgIGlzTG9hZGluZzogZmFsc2UsXG4gICAgICAgICAgICByZXN1bHRzOiBbZ2V0RGVmYXVsdENvbnZlcnNhdGlvbigpXSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIGNvbnRhY3RSZXN1bHRzOiB7IGlzTG9hZGluZzogdHJ1ZSB9LFxuICAgICAgICAgIG1lc3NhZ2VSZXN1bHRzOiB7IGlzTG9hZGluZzogdHJ1ZSB9LFxuICAgICAgICAgIHNlYXJjaFRlcm06ICdiYXInLFxuICAgICAgICAgIHByaW1hcnlTZW5kc1NtczogZmFsc2UsXG4gICAgICAgICAgc2VhcmNoQ29udmVyc2F0aW9uOiB1bmRlZmluZWQsXG4gICAgICAgICAgc2VhcmNoRGlzYWJsZWQ6IGZhbHNlLFxuICAgICAgICAgIHN0YXJ0U2VhcmNoQ291bnRlcjogMCxcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdnZXRDb252ZXJzYXRpb25BbmRNZXNzYWdlQXRJbmRleCcsICgpID0+IHtcbiAgICBpdCgncmV0dXJucyBjb3JyZWN0IGNvbnZlcnNhdGlvbiBhdCBnaXZlbiBpbmRleCcsICgpID0+IHtcbiAgICAgIGNvbnN0IGV4cGVjdGVkID0gZ2V0RGVmYXVsdENvbnZlcnNhdGlvbigpO1xuICAgICAgY29uc3QgaGVscGVyID0gbmV3IExlZnRQYW5lU2VhcmNoSGVscGVyKHtcbiAgICAgICAgY29udmVyc2F0aW9uUmVzdWx0czoge1xuICAgICAgICAgIGlzTG9hZGluZzogZmFsc2UsXG4gICAgICAgICAgcmVzdWx0czogW2V4cGVjdGVkLCBnZXREZWZhdWx0Q29udmVyc2F0aW9uKCldLFxuICAgICAgICB9LFxuICAgICAgICBjb250YWN0UmVzdWx0czogeyBpc0xvYWRpbmc6IGZhbHNlLCByZXN1bHRzOiBbXSB9LFxuICAgICAgICBtZXNzYWdlUmVzdWx0czoge1xuICAgICAgICAgIGlzTG9hZGluZzogZmFsc2UsXG4gICAgICAgICAgcmVzdWx0czogW2Zha2VNZXNzYWdlKCksIGZha2VNZXNzYWdlKCksIGZha2VNZXNzYWdlKCldLFxuICAgICAgICB9LFxuICAgICAgICBzZWFyY2hUZXJtOiAnZm9vJyxcbiAgICAgICAgcHJpbWFyeVNlbmRzU21zOiBmYWxzZSxcbiAgICAgICAgc2VhcmNoQ29udmVyc2F0aW9uOiB1bmRlZmluZWQsXG4gICAgICAgIHNlYXJjaERpc2FibGVkOiBmYWxzZSxcbiAgICAgICAgc3RhcnRTZWFyY2hDb3VudGVyOiAwLFxuICAgICAgfSk7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoXG4gICAgICAgIGhlbHBlci5nZXRDb252ZXJzYXRpb25BbmRNZXNzYWdlQXRJbmRleCgwKT8uY29udmVyc2F0aW9uSWQsXG4gICAgICAgIGV4cGVjdGVkLmlkXG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgY29ycmVjdCBjb250YWN0IGF0IGdpdmVuIGluZGV4JywgKCkgPT4ge1xuICAgICAgY29uc3QgZXhwZWN0ZWQgPSBnZXREZWZhdWx0Q29udmVyc2F0aW9uKCk7XG4gICAgICBjb25zdCBoZWxwZXIgPSBuZXcgTGVmdFBhbmVTZWFyY2hIZWxwZXIoe1xuICAgICAgICBjb252ZXJzYXRpb25SZXN1bHRzOiB7XG4gICAgICAgICAgaXNMb2FkaW5nOiBmYWxzZSxcbiAgICAgICAgICByZXN1bHRzOiBbZ2V0RGVmYXVsdENvbnZlcnNhdGlvbigpLCBnZXREZWZhdWx0Q29udmVyc2F0aW9uKCldLFxuICAgICAgICB9LFxuICAgICAgICBjb250YWN0UmVzdWx0czoge1xuICAgICAgICAgIGlzTG9hZGluZzogZmFsc2UsXG4gICAgICAgICAgcmVzdWx0czogW2V4cGVjdGVkXSxcbiAgICAgICAgfSxcbiAgICAgICAgbWVzc2FnZVJlc3VsdHM6IHtcbiAgICAgICAgICBpc0xvYWRpbmc6IGZhbHNlLFxuICAgICAgICAgIHJlc3VsdHM6IFtmYWtlTWVzc2FnZSgpLCBmYWtlTWVzc2FnZSgpLCBmYWtlTWVzc2FnZSgpXSxcbiAgICAgICAgfSxcbiAgICAgICAgc2VhcmNoVGVybTogJ2ZvbycsXG4gICAgICAgIHByaW1hcnlTZW5kc1NtczogZmFsc2UsXG4gICAgICAgIHNlYXJjaENvbnZlcnNhdGlvbjogdW5kZWZpbmVkLFxuICAgICAgICBzZWFyY2hEaXNhYmxlZDogZmFsc2UsXG4gICAgICAgIHN0YXJ0U2VhcmNoQ291bnRlcjogMCxcbiAgICAgIH0pO1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgICBoZWxwZXIuZ2V0Q29udmVyc2F0aW9uQW5kTWVzc2FnZUF0SW5kZXgoMik/LmNvbnZlcnNhdGlvbklkLFxuICAgICAgICBleHBlY3RlZC5pZFxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIGNvcnJlY3QgbWVzc2FnZSBhdCBnaXZlbiBpbmRleCcsICgpID0+IHtcbiAgICAgIGNvbnN0IGV4cGVjdGVkID0gZmFrZU1lc3NhZ2UoKTtcbiAgICAgIGNvbnN0IGhlbHBlciA9IG5ldyBMZWZ0UGFuZVNlYXJjaEhlbHBlcih7XG4gICAgICAgIGNvbnZlcnNhdGlvblJlc3VsdHM6IHtcbiAgICAgICAgICBpc0xvYWRpbmc6IGZhbHNlLFxuICAgICAgICAgIHJlc3VsdHM6IFtnZXREZWZhdWx0Q29udmVyc2F0aW9uKCksIGdldERlZmF1bHRDb252ZXJzYXRpb24oKV0sXG4gICAgICAgIH0sXG4gICAgICAgIGNvbnRhY3RSZXN1bHRzOiB7IGlzTG9hZGluZzogZmFsc2UsIHJlc3VsdHM6IFtdIH0sXG4gICAgICAgIG1lc3NhZ2VSZXN1bHRzOiB7XG4gICAgICAgICAgaXNMb2FkaW5nOiBmYWxzZSxcbiAgICAgICAgICByZXN1bHRzOiBbZmFrZU1lc3NhZ2UoKSwgZmFrZU1lc3NhZ2UoKSwgZXhwZWN0ZWRdLFxuICAgICAgICB9LFxuICAgICAgICBzZWFyY2hUZXJtOiAnZm9vJyxcbiAgICAgICAgcHJpbWFyeVNlbmRzU21zOiBmYWxzZSxcbiAgICAgICAgc2VhcmNoQ29udmVyc2F0aW9uOiB1bmRlZmluZWQsXG4gICAgICAgIHNlYXJjaERpc2FibGVkOiBmYWxzZSxcbiAgICAgICAgc3RhcnRTZWFyY2hDb3VudGVyOiAwLFxuICAgICAgfSk7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoXG4gICAgICAgIGhlbHBlci5nZXRDb252ZXJzYXRpb25BbmRNZXNzYWdlQXRJbmRleCg0KT8ubWVzc2FnZUlkLFxuICAgICAgICBleHBlY3RlZC5pZFxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIGNvcnJlY3QgbWVzc2FnZSBhdCBnaXZlbiBpbmRleCBza2lwcGluZyBub3QgbG9hZGVkIHJlc3VsdHMnLCAoKSA9PiB7XG4gICAgICBjb25zdCBleHBlY3RlZCA9IGZha2VNZXNzYWdlKCk7XG4gICAgICBjb25zdCBoZWxwZXIgPSBuZXcgTGVmdFBhbmVTZWFyY2hIZWxwZXIoe1xuICAgICAgICBjb252ZXJzYXRpb25SZXN1bHRzOiB7IGlzTG9hZGluZzogdHJ1ZSB9LFxuICAgICAgICBjb250YWN0UmVzdWx0czogeyBpc0xvYWRpbmc6IHRydWUgfSxcbiAgICAgICAgbWVzc2FnZVJlc3VsdHM6IHtcbiAgICAgICAgICBpc0xvYWRpbmc6IGZhbHNlLFxuICAgICAgICAgIHJlc3VsdHM6IFtmYWtlTWVzc2FnZSgpLCBleHBlY3RlZCwgZmFrZU1lc3NhZ2UoKV0sXG4gICAgICAgIH0sXG4gICAgICAgIHNlYXJjaFRlcm06ICdmb28nLFxuICAgICAgICBwcmltYXJ5U2VuZHNTbXM6IGZhbHNlLFxuICAgICAgICBzZWFyY2hDb252ZXJzYXRpb246IHVuZGVmaW5lZCxcbiAgICAgICAgc2VhcmNoRGlzYWJsZWQ6IGZhbHNlLFxuICAgICAgICBzdGFydFNlYXJjaENvdW50ZXI6IDAsXG4gICAgICB9KTtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgICAgaGVscGVyLmdldENvbnZlcnNhdGlvbkFuZE1lc3NhZ2VBdEluZGV4KDEpPy5tZXNzYWdlSWQsXG4gICAgICAgIGV4cGVjdGVkLmlkXG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgdW5kZWZpbmVkIGlmIHNlYXJjaCBjYW5kaWRhdGUgd2l0aCBnaXZlbiBpbmRleCBkb2VzIG5vdCBleGlzdCcsICgpID0+IHtcbiAgICAgIGNvbnN0IGhlbHBlciA9IG5ldyBMZWZ0UGFuZVNlYXJjaEhlbHBlcih7XG4gICAgICAgIGNvbnZlcnNhdGlvblJlc3VsdHM6IHtcbiAgICAgICAgICBpc0xvYWRpbmc6IGZhbHNlLFxuICAgICAgICAgIHJlc3VsdHM6IFtnZXREZWZhdWx0Q29udmVyc2F0aW9uKCksIGdldERlZmF1bHRDb252ZXJzYXRpb24oKV0sXG4gICAgICAgIH0sXG4gICAgICAgIGNvbnRhY3RSZXN1bHRzOiB7IGlzTG9hZGluZzogZmFsc2UsIHJlc3VsdHM6IFtdIH0sXG4gICAgICAgIG1lc3NhZ2VSZXN1bHRzOiB7XG4gICAgICAgICAgaXNMb2FkaW5nOiBmYWxzZSxcbiAgICAgICAgICByZXN1bHRzOiBbZmFrZU1lc3NhZ2UoKSwgZmFrZU1lc3NhZ2UoKSwgZmFrZU1lc3NhZ2UoKV0sXG4gICAgICAgIH0sXG4gICAgICAgIHNlYXJjaFRlcm06ICdmb28nLFxuICAgICAgICBwcmltYXJ5U2VuZHNTbXM6IGZhbHNlLFxuICAgICAgICBzZWFyY2hDb252ZXJzYXRpb246IHVuZGVmaW5lZCxcbiAgICAgICAgc2VhcmNoRGlzYWJsZWQ6IGZhbHNlLFxuICAgICAgICBzdGFydFNlYXJjaENvdW50ZXI6IDAsXG4gICAgICB9KTtcbiAgICAgIGFzc2VydC5pc1VuZGVmaW5lZChcbiAgICAgICAgaGVscGVyLmdldENvbnZlcnNhdGlvbkFuZE1lc3NhZ2VBdEluZGV4KDEwMCk/Lm1lc3NhZ2VJZFxuICAgICAgKTtcbiAgICAgIGFzc2VydC5pc1VuZGVmaW5lZChcbiAgICAgICAgaGVscGVyLmdldENvbnZlcnNhdGlvbkFuZE1lc3NhZ2VBdEluZGV4KC0xMDApPy5tZXNzYWdlSWRcbiAgICAgICk7XG4gICAgfSk7XG4gIH0pO1xufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7O0FBR0Esa0JBQXVCO0FBQ3ZCLFlBQXVCO0FBQ3ZCLGtCQUEyQjtBQUMzQiw4QkFBd0I7QUFDeEIsb0NBQXVDO0FBRXZDLGtDQUFxQztBQUVyQyxTQUFTLHdCQUF3QixNQUFNO0FBQ3JDLFFBQU0sY0FBYyw2QkFBTztBQUFBLElBQ3pCLElBQUksb0JBQUs7QUFBQSxJQUNULE1BQU07QUFBQSxJQUNOLGdCQUFnQixvQkFBSztBQUFBLEVBQ3ZCLElBSm9CO0FBTXBCLFdBQVMsaUJBQWlCLE1BQU07QUFDOUIsT0FBRyxpRUFBaUUsTUFBTTtBQUN4RSxZQUFNLFNBQVMsSUFBSSxpREFBcUI7QUFBQSxRQUN0QyxxQkFBcUIsRUFBRSxXQUFXLE9BQU8sU0FBUyxDQUFDLEVBQUU7QUFBQSxRQUNyRCxnQkFBZ0IsRUFBRSxXQUFXLE9BQU8sU0FBUyxDQUFDLEVBQUU7QUFBQSxRQUNoRCxnQkFBZ0IsRUFBRSxXQUFXLE9BQU8sU0FBUyxDQUFDLEVBQUU7QUFBQSxRQUNoRCxZQUFZO0FBQUEsUUFDWixpQkFBaUI7QUFBQSxRQUNqQixvQkFBb0I7QUFBQSxRQUNwQixnQkFBZ0I7QUFBQSxRQUNoQixvQkFBb0I7QUFBQSxNQUN0QixDQUFDO0FBRUQseUJBQU8sWUFDTCxPQUFPLGNBQWM7QUFBQSxRQUNuQix3QkFBd0IsTUFBTSxLQUFLO0FBQUEsUUFDbkMsV0FBVyxNQUFNLEtBQUs7QUFBQSxRQUN0QixnQkFBZ0IsTUFBTSxLQUFLO0FBQUEsTUFDN0IsQ0FBQyxDQUNIO0FBQUEsSUFDRixDQUFDO0FBQUEsRUFDSCxDQUFDO0FBRUQsV0FBUyxlQUFlLE1BQU07QUFDNUIsT0FBRywwQ0FBMEMsTUFBTTtBQUNqRCx5QkFBTyxZQUNMLElBQUksaURBQXFCO0FBQUEsUUFDdkIscUJBQXFCLEVB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
