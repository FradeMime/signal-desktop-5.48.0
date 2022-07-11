var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var import_LeftPaneHelper = require("../../../components/leftPane/LeftPaneHelper");
var import_getDefaultConversation = require("../../../test-both/helpers/getDefaultConversation");
var import_LeftPaneSearchHelper = require("../../../components/leftPane/LeftPaneSearchHelper");
var import_LeftPaneArchiveHelper = require("../../../components/leftPane/LeftPaneArchiveHelper");
describe("LeftPaneArchiveHelper", () => {
  let sandbox;
  const defaults = {
    archivedConversations: [],
    searchConversation: void 0,
    searchTerm: "",
    startSearchCounter: 0
  };
  const searchingDefaults = {
    ...defaults,
    searchConversation: (0, import_getDefaultConversation.getDefaultConversation)(),
    conversationResults: { isLoading: false, results: [] },
    contactResults: { isLoading: false, results: [] },
    messageResults: { isLoading: false, results: [] },
    searchTerm: "foo",
    primarySendsSms: false
  };
  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });
  afterEach(() => {
    sandbox.restore();
  });
  describe("getBackAction", () => {
    it('returns the "show inbox" action', () => {
      const showInbox = sinon.fake();
      const helper = new import_LeftPaneArchiveHelper.LeftPaneArchiveHelper(defaults);
      import_chai.assert.strictEqual(helper.getBackAction({ showInbox }), showInbox);
    });
  });
  describe("getRowCount", () => {
    it("returns the number of archived conversations", () => {
      import_chai.assert.strictEqual(new import_LeftPaneArchiveHelper.LeftPaneArchiveHelper(defaults).getRowCount(), 0);
      import_chai.assert.strictEqual(new import_LeftPaneArchiveHelper.LeftPaneArchiveHelper({
        ...defaults,
        archivedConversations: [
          (0, import_getDefaultConversation.getDefaultConversation)(),
          (0, import_getDefaultConversation.getDefaultConversation)()
        ]
      }).getRowCount(), 2);
    });
    it("defers to the search helper if searching", () => {
      sandbox.stub(import_LeftPaneSearchHelper.LeftPaneSearchHelper.prototype, "getRowCount").returns(123);
      import_chai.assert.strictEqual(new import_LeftPaneArchiveHelper.LeftPaneArchiveHelper(searchingDefaults).getRowCount(), 123);
    });
  });
  describe("getRowIndexToScrollTo", () => {
    it("returns undefined if no conversation is selected", () => {
      const helper = new import_LeftPaneArchiveHelper.LeftPaneArchiveHelper({
        ...defaults,
        archivedConversations: [
          (0, import_getDefaultConversation.getDefaultConversation)(),
          (0, import_getDefaultConversation.getDefaultConversation)()
        ]
      });
      import_chai.assert.isUndefined(helper.getRowIndexToScrollTo(void 0));
    });
    it("returns undefined if the selected conversation is not pinned or non-pinned", () => {
      const helper = new import_LeftPaneArchiveHelper.LeftPaneArchiveHelper({
        ...defaults,
        archivedConversations: [
          (0, import_getDefaultConversation.getDefaultConversation)(),
          (0, import_getDefaultConversation.getDefaultConversation)()
        ]
      });
      import_chai.assert.isUndefined(helper.getRowIndexToScrollTo((0, import_uuid.v4)()));
    });
    it("returns the archived conversation's index", () => {
      const archivedConversations = [
        (0, import_getDefaultConversation.getDefaultConversation)(),
        (0, import_getDefaultConversation.getDefaultConversation)()
      ];
      const helper = new import_LeftPaneArchiveHelper.LeftPaneArchiveHelper({
        ...defaults,
        archivedConversations
      });
      import_chai.assert.strictEqual(helper.getRowIndexToScrollTo(archivedConversations[0].id), 0);
      import_chai.assert.strictEqual(helper.getRowIndexToScrollTo(archivedConversations[1].id), 1);
    });
    it("defers to the search helper if searching", () => {
      sandbox.stub(import_LeftPaneSearchHelper.LeftPaneSearchHelper.prototype, "getRowIndexToScrollTo").returns(123);
      const archivedConversations = [
        (0, import_getDefaultConversation.getDefaultConversation)(),
        (0, import_getDefaultConversation.getDefaultConversation)()
      ];
      const helper = new import_LeftPaneArchiveHelper.LeftPaneArchiveHelper(searchingDefaults);
      import_chai.assert.strictEqual(helper.getRowIndexToScrollTo(archivedConversations[0].id), 123);
    });
  });
  describe("getRow", () => {
    it("returns each conversation as a row", () => {
      const archivedConversations = [
        (0, import_getDefaultConversation.getDefaultConversation)(),
        (0, import_getDefaultConversation.getDefaultConversation)()
      ];
      const helper = new import_LeftPaneArchiveHelper.LeftPaneArchiveHelper({
        ...defaults,
        archivedConversations
      });
      import_chai.assert.deepEqual(helper.getRow(0), {
        type: import_ConversationList.RowType.Conversation,
        conversation: archivedConversations[0]
      });
      import_chai.assert.deepEqual(helper.getRow(1), {
        type: import_ConversationList.RowType.Conversation,
        conversation: archivedConversations[1]
      });
    });
    it("defers to the search helper if searching", () => {
      sandbox.stub(import_LeftPaneSearchHelper.LeftPaneSearchHelper.prototype, "getRow").returns({ type: import_ConversationList.RowType.SearchResultsLoadingFakeHeader });
      const helper = new import_LeftPaneArchiveHelper.LeftPaneArchiveHelper(searchingDefaults);
      import_chai.assert.deepEqual(helper.getRow(0), {
        type: import_ConversationList.RowType.SearchResultsLoadingFakeHeader
      });
    });
  });
  describe("getConversationAndMessageAtIndex", () => {
    it("returns the conversation at the given index when it exists", () => {
      const archivedConversations = [
        (0, import_getDefaultConversation.getDefaultConversation)(),
        (0, import_getDefaultConversation.getDefaultConversation)()
      ];
      const helper = new import_LeftPaneArchiveHelper.LeftPaneArchiveHelper({
        ...defaults,
        archivedConversations
      });
      import_chai.assert.strictEqual(helper.getConversationAndMessageAtIndex(0)?.conversationId, archivedConversations[0].id);
      import_chai.assert.strictEqual(helper.getConversationAndMessageAtIndex(1)?.conversationId, archivedConversations[1].id);
    });
    it("when requesting an index out of bounds, returns the last conversation", () => {
      const archivedConversations = [
        (0, import_getDefaultConversation.getDefaultConversation)(),
        (0, import_getDefaultConversation.getDefaultConversation)()
      ];
      const helper = new import_LeftPaneArchiveHelper.LeftPaneArchiveHelper({
        ...defaults,
        archivedConversations
      });
      import_chai.assert.strictEqual(helper.getConversationAndMessageAtIndex(2)?.conversationId, archivedConversations[1].id);
      import_chai.assert.strictEqual(helper.getConversationAndMessageAtIndex(99)?.conversationId, archivedConversations[1].id);
      import_chai.assert.strictEqual(helper.getConversationAndMessageAtIndex(-1)?.conversationId, archivedConversations[1].id);
    });
    it("returns undefined if there are no archived conversations", () => {
      const helper = new import_LeftPaneArchiveHelper.LeftPaneArchiveHelper(defaults);
      import_chai.assert.isUndefined(helper.getConversationAndMessageAtIndex(0));
      import_chai.assert.isUndefined(helper.getConversationAndMessageAtIndex(1));
      import_chai.assert.isUndefined(helper.getConversationAndMessageAtIndex(-1));
    });
    it("defers to the search helper if searching", () => {
      sandbox.stub(import_LeftPaneSearchHelper.LeftPaneSearchHelper.prototype, "getConversationAndMessageAtIndex").returns({ conversationId: "abc123" });
      const helper = new import_LeftPaneArchiveHelper.LeftPaneArchiveHelper(searchingDefaults);
      import_chai.assert.deepEqual(helper.getConversationAndMessageAtIndex(999), {
        conversationId: "abc123"
      });
    });
  });
  describe("getConversationAndMessageInDirection", () => {
    it("returns the next conversation when searching downward", () => {
      const archivedConversations = [
        (0, import_getDefaultConversation.getDefaultConversation)(),
        (0, import_getDefaultConversation.getDefaultConversation)()
      ];
      const helper = new import_LeftPaneArchiveHelper.LeftPaneArchiveHelper({
        ...defaults,
        archivedConversations
      });
      import_chai.assert.deepEqual(helper.getConversationAndMessageInDirection({ direction: import_LeftPaneHelper.FindDirection.Down, unreadOnly: false }, archivedConversations[0].id, void 0), { conversationId: archivedConversations[1].id });
    });
    it("defers to the search helper if searching", () => {
      sandbox.stub(import_LeftPaneSearchHelper.LeftPaneSearchHelper.prototype, "getConversationAndMessageInDirection").returns({ conversationId: "abc123" });
      const helper = new import_LeftPaneArchiveHelper.LeftPaneArchiveHelper(searchingDefaults);
      import_chai.assert.deepEqual(helper.getConversationAndMessageInDirection({
        direction: import_LeftPaneHelper.FindDirection.Down,
        unreadOnly: false
      }, (0, import_getDefaultConversation.getDefaultConversation)().id, void 0), {
        conversationId: "abc123"
      });
    });
  });
  describe("shouldRecomputeRowHeights", () => {
    it("returns false when not searching because row heights are constant", () => {
      const helper = new import_LeftPaneArchiveHelper.LeftPaneArchiveHelper({
        ...defaults,
        archivedConversations: [
          (0, import_getDefaultConversation.getDefaultConversation)(),
          (0, import_getDefaultConversation.getDefaultConversation)()
        ]
      });
      import_chai.assert.isFalse(helper.shouldRecomputeRowHeights({
        ...defaults,
        archivedConversations: [(0, import_getDefaultConversation.getDefaultConversation)()]
      }));
      import_chai.assert.isFalse(helper.shouldRecomputeRowHeights({
        ...defaults,
        archivedConversations: [
          (0, import_getDefaultConversation.getDefaultConversation)(),
          (0, import_getDefaultConversation.getDefaultConversation)()
        ]
      }));
    });
    it("returns true when going from searching \u2192 not searching", () => {
      const helper = new import_LeftPaneArchiveHelper.LeftPaneArchiveHelper(defaults);
      import_chai.assert.isTrue(helper.shouldRecomputeRowHeights(searchingDefaults));
    });
    it("returns true when going from not searching \u2192 searching", () => {
      const helper = new import_LeftPaneArchiveHelper.LeftPaneArchiveHelper(searchingDefaults);
      import_chai.assert.isTrue(helper.shouldRecomputeRowHeights(defaults));
    });
    it("defers to the search helper if searching", () => {
      sandbox.stub(import_LeftPaneSearchHelper.LeftPaneSearchHelper.prototype, "shouldRecomputeRowHeights").returns(true);
      const helper = new import_LeftPaneArchiveHelper.LeftPaneArchiveHelper(searchingDefaults);
      import_chai.assert.isTrue(helper.shouldRecomputeRowHeights(searchingDefaults));
    });
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiTGVmdFBhbmVBcmNoaXZlSGVscGVyX3Rlc3QudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSAnY2hhaSc7XG5pbXBvcnQgKiBhcyBzaW5vbiBmcm9tICdzaW5vbic7XG5pbXBvcnQgeyB2NCBhcyB1dWlkIH0gZnJvbSAndXVpZCc7XG5pbXBvcnQgeyBSb3dUeXBlIH0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9Db252ZXJzYXRpb25MaXN0JztcbmltcG9ydCB7IEZpbmREaXJlY3Rpb24gfSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL2xlZnRQYW5lL0xlZnRQYW5lSGVscGVyJztcbmltcG9ydCB7IGdldERlZmF1bHRDb252ZXJzYXRpb24gfSBmcm9tICcuLi8uLi8uLi90ZXN0LWJvdGgvaGVscGVycy9nZXREZWZhdWx0Q29udmVyc2F0aW9uJztcbmltcG9ydCB7IExlZnRQYW5lU2VhcmNoSGVscGVyIH0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9sZWZ0UGFuZS9MZWZ0UGFuZVNlYXJjaEhlbHBlcic7XG5cbmltcG9ydCB7IExlZnRQYW5lQXJjaGl2ZUhlbHBlciB9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvbGVmdFBhbmUvTGVmdFBhbmVBcmNoaXZlSGVscGVyJztcblxuZGVzY3JpYmUoJ0xlZnRQYW5lQXJjaGl2ZUhlbHBlcicsICgpID0+IHtcbiAgbGV0IHNhbmRib3g6IHNpbm9uLlNpbm9uU2FuZGJveDtcblxuICBjb25zdCBkZWZhdWx0cyA9IHtcbiAgICBhcmNoaXZlZENvbnZlcnNhdGlvbnM6IFtdLFxuICAgIHNlYXJjaENvbnZlcnNhdGlvbjogdW5kZWZpbmVkLFxuICAgIHNlYXJjaFRlcm06ICcnLFxuICAgIHN0YXJ0U2VhcmNoQ291bnRlcjogMCxcbiAgfTtcblxuICBjb25zdCBzZWFyY2hpbmdEZWZhdWx0cyA9IHtcbiAgICAuLi5kZWZhdWx0cyxcbiAgICBzZWFyY2hDb252ZXJzYXRpb246IGdldERlZmF1bHRDb252ZXJzYXRpb24oKSxcbiAgICBjb252ZXJzYXRpb25SZXN1bHRzOiB7IGlzTG9hZGluZzogZmFsc2UsIHJlc3VsdHM6IFtdIH0sXG4gICAgY29udGFjdFJlc3VsdHM6IHsgaXNMb2FkaW5nOiBmYWxzZSwgcmVzdWx0czogW10gfSxcbiAgICBtZXNzYWdlUmVzdWx0czogeyBpc0xvYWRpbmc6IGZhbHNlLCByZXN1bHRzOiBbXSB9LFxuICAgIHNlYXJjaFRlcm06ICdmb28nLFxuICAgIHByaW1hcnlTZW5kc1NtczogZmFsc2UsXG4gIH07XG5cbiAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgc2FuZGJveCA9IHNpbm9uLmNyZWF0ZVNhbmRib3goKTtcbiAgfSk7XG5cbiAgYWZ0ZXJFYWNoKCgpID0+IHtcbiAgICBzYW5kYm94LnJlc3RvcmUoKTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ2dldEJhY2tBY3Rpb24nLCAoKSA9PiB7XG4gICAgaXQoJ3JldHVybnMgdGhlIFwic2hvdyBpbmJveFwiIGFjdGlvbicsICgpID0+IHtcbiAgICAgIGNvbnN0IHNob3dJbmJveCA9IHNpbm9uLmZha2UoKTtcbiAgICAgIGNvbnN0IGhlbHBlciA9IG5ldyBMZWZ0UGFuZUFyY2hpdmVIZWxwZXIoZGVmYXVsdHMpO1xuXG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoaGVscGVyLmdldEJhY2tBY3Rpb24oeyBzaG93SW5ib3ggfSksIHNob3dJbmJveCk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdnZXRSb3dDb3VudCcsICgpID0+IHtcbiAgICBpdCgncmV0dXJucyB0aGUgbnVtYmVyIG9mIGFyY2hpdmVkIGNvbnZlcnNhdGlvbnMnLCAoKSA9PiB7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwobmV3IExlZnRQYW5lQXJjaGl2ZUhlbHBlcihkZWZhdWx0cykuZ2V0Um93Q291bnQoKSwgMCk7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoXG4gICAgICAgIG5ldyBMZWZ0UGFuZUFyY2hpdmVIZWxwZXIoe1xuICAgICAgICAgIC4uLmRlZmF1bHRzLFxuICAgICAgICAgIGFyY2hpdmVkQ29udmVyc2F0aW9uczogW1xuICAgICAgICAgICAgZ2V0RGVmYXVsdENvbnZlcnNhdGlvbigpLFxuICAgICAgICAgICAgZ2V0RGVmYXVsdENvbnZlcnNhdGlvbigpLFxuICAgICAgICAgIF0sXG4gICAgICAgIH0pLmdldFJvd0NvdW50KCksXG4gICAgICAgIDJcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICBpdCgnZGVmZXJzIHRvIHRoZSBzZWFyY2ggaGVscGVyIGlmIHNlYXJjaGluZycsICgpID0+IHtcbiAgICAgIHNhbmRib3guc3R1YihMZWZ0UGFuZVNlYXJjaEhlbHBlci5wcm90b3R5cGUsICdnZXRSb3dDb3VudCcpLnJldHVybnMoMTIzKTtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgICAgbmV3IExlZnRQYW5lQXJjaGl2ZUhlbHBlcihzZWFyY2hpbmdEZWZhdWx0cykuZ2V0Um93Q291bnQoKSxcbiAgICAgICAgMTIzXG4gICAgICApO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnZ2V0Um93SW5kZXhUb1Njcm9sbFRvJywgKCkgPT4ge1xuICAgIGl0KCdyZXR1cm5zIHVuZGVmaW5lZCBpZiBubyBjb252ZXJzYXRpb24gaXMgc2VsZWN0ZWQnLCAoKSA9PiB7XG4gICAgICBjb25zdCBoZWxwZXIgPSBuZXcgTGVmdFBhbmVBcmNoaXZlSGVscGVyKHtcbiAgICAgICAgLi4uZGVmYXVsdHMsXG4gICAgICAgIGFyY2hpdmVkQ29udmVyc2F0aW9uczogW1xuICAgICAgICAgIGdldERlZmF1bHRDb252ZXJzYXRpb24oKSxcbiAgICAgICAgICBnZXREZWZhdWx0Q29udmVyc2F0aW9uKCksXG4gICAgICAgIF0sXG4gICAgICB9KTtcblxuICAgICAgYXNzZXJ0LmlzVW5kZWZpbmVkKGhlbHBlci5nZXRSb3dJbmRleFRvU2Nyb2xsVG8odW5kZWZpbmVkKSk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyB1bmRlZmluZWQgaWYgdGhlIHNlbGVjdGVkIGNvbnZlcnNhdGlvbiBpcyBub3QgcGlubmVkIG9yIG5vbi1waW5uZWQnLCAoKSA9PiB7XG4gICAgICBjb25zdCBoZWxwZXIgPSBuZXcgTGVmdFBhbmVBcmNoaXZlSGVscGVyKHtcbiAgICAgICAgLi4uZGVmYXVsdHMsXG4gICAgICAgIGFyY2hpdmVkQ29udmVyc2F0aW9uczogW1xuICAgICAgICAgIGdldERlZmF1bHRDb252ZXJzYXRpb24oKSxcbiAgICAgICAgICBnZXREZWZhdWx0Q29udmVyc2F0aW9uKCksXG4gICAgICAgIF0sXG4gICAgICB9KTtcblxuICAgICAgYXNzZXJ0LmlzVW5kZWZpbmVkKGhlbHBlci5nZXRSb3dJbmRleFRvU2Nyb2xsVG8odXVpZCgpKSk7XG4gICAgfSk7XG5cbiAgICBpdChcInJldHVybnMgdGhlIGFyY2hpdmVkIGNvbnZlcnNhdGlvbidzIGluZGV4XCIsICgpID0+IHtcbiAgICAgIGNvbnN0IGFyY2hpdmVkQ29udmVyc2F0aW9ucyA9IFtcbiAgICAgICAgZ2V0RGVmYXVsdENvbnZlcnNhdGlvbigpLFxuICAgICAgICBnZXREZWZhdWx0Q29udmVyc2F0aW9uKCksXG4gICAgICBdO1xuICAgICAgY29uc3QgaGVscGVyID0gbmV3IExlZnRQYW5lQXJjaGl2ZUhlbHBlcih7XG4gICAgICAgIC4uLmRlZmF1bHRzLFxuICAgICAgICBhcmNoaXZlZENvbnZlcnNhdGlvbnMsXG4gICAgICB9KTtcblxuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgICBoZWxwZXIuZ2V0Um93SW5kZXhUb1Njcm9sbFRvKGFyY2hpdmVkQ29udmVyc2F0aW9uc1swXS5pZCksXG4gICAgICAgIDBcbiAgICAgICk7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoXG4gICAgICAgIGhlbHBlci5nZXRSb3dJbmRleFRvU2Nyb2xsVG8oYXJjaGl2ZWRDb252ZXJzYXRpb25zWzFdLmlkKSxcbiAgICAgICAgMVxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIGl0KCdkZWZlcnMgdG8gdGhlIHNlYXJjaCBoZWxwZXIgaWYgc2VhcmNoaW5nJywgKCkgPT4ge1xuICAgICAgc2FuZGJveFxuICAgICAgICAuc3R1YihMZWZ0UGFuZVNlYXJjaEhlbHBlci5wcm90b3R5cGUsICdnZXRSb3dJbmRleFRvU2Nyb2xsVG8nKVxuICAgICAgICAucmV0dXJucygxMjMpO1xuXG4gICAgICBjb25zdCBhcmNoaXZlZENvbnZlcnNhdGlvbnMgPSBbXG4gICAgICAgIGdldERlZmF1bHRDb252ZXJzYXRpb24oKSxcbiAgICAgICAgZ2V0RGVmYXVsdENvbnZlcnNhdGlvbigpLFxuICAgICAgXTtcbiAgICAgIGNvbnN0IGhlbHBlciA9IG5ldyBMZWZ0UGFuZUFyY2hpdmVIZWxwZXIoc2VhcmNoaW5nRGVmYXVsdHMpO1xuXG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoXG4gICAgICAgIGhlbHBlci5nZXRSb3dJbmRleFRvU2Nyb2xsVG8oYXJjaGl2ZWRDb252ZXJzYXRpb25zWzBdLmlkKSxcbiAgICAgICAgMTIzXG4gICAgICApO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnZ2V0Um93JywgKCkgPT4ge1xuICAgIGl0KCdyZXR1cm5zIGVhY2ggY29udmVyc2F0aW9uIGFzIGEgcm93JywgKCkgPT4ge1xuICAgICAgY29uc3QgYXJjaGl2ZWRDb252ZXJzYXRpb25zID0gW1xuICAgICAgICBnZXREZWZhdWx0Q29udmVyc2F0aW9uKCksXG4gICAgICAgIGdldERlZmF1bHRDb252ZXJzYXRpb24oKSxcbiAgICAgIF07XG4gICAgICBjb25zdCBoZWxwZXIgPSBuZXcgTGVmdFBhbmVBcmNoaXZlSGVscGVyKHtcbiAgICAgICAgLi4uZGVmYXVsdHMsXG4gICAgICAgIGFyY2hpdmVkQ29udmVyc2F0aW9ucyxcbiAgICAgIH0pO1xuXG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKGhlbHBlci5nZXRSb3coMCksIHtcbiAgICAgICAgdHlwZTogUm93VHlwZS5Db252ZXJzYXRpb24sXG4gICAgICAgIGNvbnZlcnNhdGlvbjogYXJjaGl2ZWRDb252ZXJzYXRpb25zWzBdLFxuICAgICAgfSk7XG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKGhlbHBlci5nZXRSb3coMSksIHtcbiAgICAgICAgdHlwZTogUm93VHlwZS5Db252ZXJzYXRpb24sXG4gICAgICAgIGNvbnZlcnNhdGlvbjogYXJjaGl2ZWRDb252ZXJzYXRpb25zWzFdLFxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBpdCgnZGVmZXJzIHRvIHRoZSBzZWFyY2ggaGVscGVyIGlmIHNlYXJjaGluZycsICgpID0+IHtcbiAgICAgIHNhbmRib3hcbiAgICAgICAgLnN0dWIoTGVmdFBhbmVTZWFyY2hIZWxwZXIucHJvdG90eXBlLCAnZ2V0Um93JylcbiAgICAgICAgLnJldHVybnMoeyB0eXBlOiBSb3dUeXBlLlNlYXJjaFJlc3VsdHNMb2FkaW5nRmFrZUhlYWRlciB9KTtcblxuICAgICAgY29uc3QgaGVscGVyID0gbmV3IExlZnRQYW5lQXJjaGl2ZUhlbHBlcihzZWFyY2hpbmdEZWZhdWx0cyk7XG5cbiAgICAgIGFzc2VydC5kZWVwRXF1YWwoaGVscGVyLmdldFJvdygwKSwge1xuICAgICAgICB0eXBlOiBSb3dUeXBlLlNlYXJjaFJlc3VsdHNMb2FkaW5nRmFrZUhlYWRlcixcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnZ2V0Q29udmVyc2F0aW9uQW5kTWVzc2FnZUF0SW5kZXgnLCAoKSA9PiB7XG4gICAgaXQoJ3JldHVybnMgdGhlIGNvbnZlcnNhdGlvbiBhdCB0aGUgZ2l2ZW4gaW5kZXggd2hlbiBpdCBleGlzdHMnLCAoKSA9PiB7XG4gICAgICBjb25zdCBhcmNoaXZlZENvbnZlcnNhdGlvbnMgPSBbXG4gICAgICAgIGdldERlZmF1bHRDb252ZXJzYXRpb24oKSxcbiAgICAgICAgZ2V0RGVmYXVsdENvbnZlcnNhdGlvbigpLFxuICAgICAgXTtcbiAgICAgIGNvbnN0IGhlbHBlciA9IG5ldyBMZWZ0UGFuZUFyY2hpdmVIZWxwZXIoe1xuICAgICAgICAuLi5kZWZhdWx0cyxcbiAgICAgICAgYXJjaGl2ZWRDb252ZXJzYXRpb25zLFxuICAgICAgfSk7XG5cbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgICAgaGVscGVyLmdldENvbnZlcnNhdGlvbkFuZE1lc3NhZ2VBdEluZGV4KDApPy5jb252ZXJzYXRpb25JZCxcbiAgICAgICAgYXJjaGl2ZWRDb252ZXJzYXRpb25zWzBdLmlkXG4gICAgICApO1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgICBoZWxwZXIuZ2V0Q29udmVyc2F0aW9uQW5kTWVzc2FnZUF0SW5kZXgoMSk/LmNvbnZlcnNhdGlvbklkLFxuICAgICAgICBhcmNoaXZlZENvbnZlcnNhdGlvbnNbMV0uaWRcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICBpdCgnd2hlbiByZXF1ZXN0aW5nIGFuIGluZGV4IG91dCBvZiBib3VuZHMsIHJldHVybnMgdGhlIGxhc3QgY29udmVyc2F0aW9uJywgKCkgPT4ge1xuICAgICAgY29uc3QgYXJjaGl2ZWRDb252ZXJzYXRpb25zID0gW1xuICAgICAgICBnZXREZWZhdWx0Q29udmVyc2F0aW9uKCksXG4gICAgICAgIGdldERlZmF1bHRDb252ZXJzYXRpb24oKSxcbiAgICAgIF07XG4gICAgICBjb25zdCBoZWxwZXIgPSBuZXcgTGVmdFBhbmVBcmNoaXZlSGVscGVyKHtcbiAgICAgICAgLi4uZGVmYXVsdHMsXG4gICAgICAgIGFyY2hpdmVkQ29udmVyc2F0aW9ucyxcbiAgICAgIH0pO1xuXG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoXG4gICAgICAgIGhlbHBlci5nZXRDb252ZXJzYXRpb25BbmRNZXNzYWdlQXRJbmRleCgyKT8uY29udmVyc2F0aW9uSWQsXG4gICAgICAgIGFyY2hpdmVkQ29udmVyc2F0aW9uc1sxXS5pZFxuICAgICAgKTtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgICAgaGVscGVyLmdldENvbnZlcnNhdGlvbkFuZE1lc3NhZ2VBdEluZGV4KDk5KT8uY29udmVyc2F0aW9uSWQsXG4gICAgICAgIGFyY2hpdmVkQ29udmVyc2F0aW9uc1sxXS5pZFxuICAgICAgKTtcblxuICAgICAgLy8gVGhpcyBpcyBtb3N0bHkgYSByZXNpbGllbmNlIG1lYXN1cmUgaW4gY2FzZSB3ZSdyZSBldmVyIGNhbGxlZCB3aXRoIGFuIGludmFsaWRcbiAgICAgIC8vICAgaW5kZXguXG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoXG4gICAgICAgIGhlbHBlci5nZXRDb252ZXJzYXRpb25BbmRNZXNzYWdlQXRJbmRleCgtMSk/LmNvbnZlcnNhdGlvbklkLFxuICAgICAgICBhcmNoaXZlZENvbnZlcnNhdGlvbnNbMV0uaWRcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyB1bmRlZmluZWQgaWYgdGhlcmUgYXJlIG5vIGFyY2hpdmVkIGNvbnZlcnNhdGlvbnMnLCAoKSA9PiB7XG4gICAgICBjb25zdCBoZWxwZXIgPSBuZXcgTGVmdFBhbmVBcmNoaXZlSGVscGVyKGRlZmF1bHRzKTtcblxuICAgICAgYXNzZXJ0LmlzVW5kZWZpbmVkKGhlbHBlci5nZXRDb252ZXJzYXRpb25BbmRNZXNzYWdlQXRJbmRleCgwKSk7XG4gICAgICBhc3NlcnQuaXNVbmRlZmluZWQoaGVscGVyLmdldENvbnZlcnNhdGlvbkFuZE1lc3NhZ2VBdEluZGV4KDEpKTtcbiAgICAgIGFzc2VydC5pc1VuZGVmaW5lZChoZWxwZXIuZ2V0Q29udmVyc2F0aW9uQW5kTWVzc2FnZUF0SW5kZXgoLTEpKTtcbiAgICB9KTtcblxuICAgIGl0KCdkZWZlcnMgdG8gdGhlIHNlYXJjaCBoZWxwZXIgaWYgc2VhcmNoaW5nJywgKCkgPT4ge1xuICAgICAgc2FuZGJveFxuICAgICAgICAuc3R1YihcbiAgICAgICAgICBMZWZ0UGFuZVNlYXJjaEhlbHBlci5wcm90b3R5cGUsXG4gICAgICAgICAgJ2dldENvbnZlcnNhdGlvbkFuZE1lc3NhZ2VBdEluZGV4J1xuICAgICAgICApXG4gICAgICAgIC5yZXR1cm5zKHsgY29udmVyc2F0aW9uSWQ6ICdhYmMxMjMnIH0pO1xuXG4gICAgICBjb25zdCBoZWxwZXIgPSBuZXcgTGVmdFBhbmVBcmNoaXZlSGVscGVyKHNlYXJjaGluZ0RlZmF1bHRzKTtcblxuICAgICAgYXNzZXJ0LmRlZXBFcXVhbChoZWxwZXIuZ2V0Q29udmVyc2F0aW9uQW5kTWVzc2FnZUF0SW5kZXgoOTk5KSwge1xuICAgICAgICBjb252ZXJzYXRpb25JZDogJ2FiYzEyMycsXG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ2dldENvbnZlcnNhdGlvbkFuZE1lc3NhZ2VJbkRpcmVjdGlvbicsICgpID0+IHtcbiAgICBpdCgncmV0dXJucyB0aGUgbmV4dCBjb252ZXJzYXRpb24gd2hlbiBzZWFyY2hpbmcgZG93bndhcmQnLCAoKSA9PiB7XG4gICAgICBjb25zdCBhcmNoaXZlZENvbnZlcnNhdGlvbnMgPSBbXG4gICAgICAgIGdldERlZmF1bHRDb252ZXJzYXRpb24oKSxcbiAgICAgICAgZ2V0RGVmYXVsdENvbnZlcnNhdGlvbigpLFxuICAgICAgXTtcbiAgICAgIGNvbnN0IGhlbHBlciA9IG5ldyBMZWZ0UGFuZUFyY2hpdmVIZWxwZXIoe1xuICAgICAgICAuLi5kZWZhdWx0cyxcbiAgICAgICAgYXJjaGl2ZWRDb252ZXJzYXRpb25zLFxuICAgICAgfSk7XG5cbiAgICAgIGFzc2VydC5kZWVwRXF1YWwoXG4gICAgICAgIGhlbHBlci5nZXRDb252ZXJzYXRpb25BbmRNZXNzYWdlSW5EaXJlY3Rpb24oXG4gICAgICAgICAgeyBkaXJlY3Rpb246IEZpbmREaXJlY3Rpb24uRG93biwgdW5yZWFkT25seTogZmFsc2UgfSxcbiAgICAgICAgICBhcmNoaXZlZENvbnZlcnNhdGlvbnNbMF0uaWQsXG4gICAgICAgICAgdW5kZWZpbmVkXG4gICAgICAgICksXG4gICAgICAgIHsgY29udmVyc2F0aW9uSWQ6IGFyY2hpdmVkQ29udmVyc2F0aW9uc1sxXS5pZCB9XG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgLy8gQWRkaXRpb25hbCB0ZXN0cyBhcmUgZm91bmQgd2l0aCBgZ2V0Q29udmVyc2F0aW9uSW5EaXJlY3Rpb25gLlxuXG4gICAgaXQoJ2RlZmVycyB0byB0aGUgc2VhcmNoIGhlbHBlciBpZiBzZWFyY2hpbmcnLCAoKSA9PiB7XG4gICAgICBzYW5kYm94XG4gICAgICAgIC5zdHViKFxuICAgICAgICAgIExlZnRQYW5lU2VhcmNoSGVscGVyLnByb3RvdHlwZSxcbiAgICAgICAgICAnZ2V0Q29udmVyc2F0aW9uQW5kTWVzc2FnZUluRGlyZWN0aW9uJ1xuICAgICAgICApXG4gICAgICAgIC5yZXR1cm5zKHsgY29udmVyc2F0aW9uSWQ6ICdhYmMxMjMnIH0pO1xuXG4gICAgICBjb25zdCBoZWxwZXIgPSBuZXcgTGVmdFBhbmVBcmNoaXZlSGVscGVyKHNlYXJjaGluZ0RlZmF1bHRzKTtcblxuICAgICAgYXNzZXJ0LmRlZXBFcXVhbChcbiAgICAgICAgaGVscGVyLmdldENvbnZlcnNhdGlvbkFuZE1lc3NhZ2VJbkRpcmVjdGlvbihcbiAgICAgICAgICB7XG4gICAgICAgICAgICBkaXJlY3Rpb246IEZpbmREaXJlY3Rpb24uRG93bixcbiAgICAgICAgICAgIHVucmVhZE9ubHk6IGZhbHNlLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgZ2V0RGVmYXVsdENvbnZlcnNhdGlvbigpLmlkLFxuICAgICAgICAgIHVuZGVmaW5lZFxuICAgICAgICApLFxuICAgICAgICB7XG4gICAgICAgICAgY29udmVyc2F0aW9uSWQ6ICdhYmMxMjMnLFxuICAgICAgICB9XG4gICAgICApO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnc2hvdWxkUmVjb21wdXRlUm93SGVpZ2h0cycsICgpID0+IHtcbiAgICBpdCgncmV0dXJucyBmYWxzZSB3aGVuIG5vdCBzZWFyY2hpbmcgYmVjYXVzZSByb3cgaGVpZ2h0cyBhcmUgY29uc3RhbnQnLCAoKSA9PiB7XG4gICAgICBjb25zdCBoZWxwZXIgPSBuZXcgTGVmdFBhbmVBcmNoaXZlSGVscGVyKHtcbiAgICAgICAgLi4uZGVmYXVsdHMsXG4gICAgICAgIGFyY2hpdmVkQ29udmVyc2F0aW9uczogW1xuICAgICAgICAgIGdldERlZmF1bHRDb252ZXJzYXRpb24oKSxcbiAgICAgICAgICBnZXREZWZhdWx0Q29udmVyc2F0aW9uKCksXG4gICAgICAgIF0sXG4gICAgICB9KTtcblxuICAgICAgYXNzZXJ0LmlzRmFsc2UoXG4gICAgICAgIGhlbHBlci5zaG91bGRSZWNvbXB1dGVSb3dIZWlnaHRzKHtcbiAgICAgICAgICAuLi5kZWZhdWx0cyxcbiAgICAgICAgICBhcmNoaXZlZENvbnZlcnNhdGlvbnM6IFtnZXREZWZhdWx0Q29udmVyc2F0aW9uKCldLFxuICAgICAgICB9KVxuICAgICAgKTtcbiAgICAgIGFzc2VydC5pc0ZhbHNlKFxuICAgICAgICBoZWxwZXIuc2hvdWxkUmVjb21wdXRlUm93SGVpZ2h0cyh7XG4gICAgICAgICAgLi4uZGVmYXVsdHMsXG4gICAgICAgICAgYXJjaGl2ZWRDb252ZXJzYXRpb25zOiBbXG4gICAgICAgICAgICBnZXREZWZhdWx0Q29udmVyc2F0aW9uKCksXG4gICAgICAgICAgICBnZXREZWZhdWx0Q29udmVyc2F0aW9uKCksXG4gICAgICAgICAgXSxcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyB0cnVlIHdoZW4gZ29pbmcgZnJvbSBzZWFyY2hpbmcgXHUyMTkyIG5vdCBzZWFyY2hpbmcnLCAoKSA9PiB7XG4gICAgICBjb25zdCBoZWxwZXIgPSBuZXcgTGVmdFBhbmVBcmNoaXZlSGVscGVyKGRlZmF1bHRzKTtcblxuICAgICAgYXNzZXJ0LmlzVHJ1ZShoZWxwZXIuc2hvdWxkUmVjb21wdXRlUm93SGVpZ2h0cyhzZWFyY2hpbmdEZWZhdWx0cykpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgdHJ1ZSB3aGVuIGdvaW5nIGZyb20gbm90IHNlYXJjaGluZyBcdTIxOTIgc2VhcmNoaW5nJywgKCkgPT4ge1xuICAgICAgY29uc3QgaGVscGVyID0gbmV3IExlZnRQYW5lQXJjaGl2ZUhlbHBlcihzZWFyY2hpbmdEZWZhdWx0cyk7XG5cbiAgICAgIGFzc2VydC5pc1RydWUoaGVscGVyLnNob3VsZFJlY29tcHV0ZVJvd0hlaWdodHMoZGVmYXVsdHMpKTtcbiAgICB9KTtcblxuICAgIGl0KCdkZWZlcnMgdG8gdGhlIHNlYXJjaCBoZWxwZXIgaWYgc2VhcmNoaW5nJywgKCkgPT4ge1xuICAgICAgc2FuZGJveFxuICAgICAgICAuc3R1YihMZWZ0UGFuZVNlYXJjaEhlbHBlci5wcm90b3R5cGUsICdzaG91bGRSZWNvbXB1dGVSb3dIZWlnaHRzJylcbiAgICAgICAgLnJldHVybnModHJ1ZSk7XG5cbiAgICAgIGNvbnN0IGhlbHBlciA9IG5ldyBMZWZ0UGFuZUFyY2hpdmVIZWxwZXIoc2VhcmNoaW5nRGVmYXVsdHMpO1xuXG4gICAgICBhc3NlcnQuaXNUcnVlKGhlbHBlci5zaG91bGRSZWNvbXB1dGVSb3dIZWlnaHRzKHNlYXJjaGluZ0RlZmF1bHRzKSk7XG4gICAgfSk7XG4gIH0pO1xufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7QUFHQSxrQkFBdUI7QUFDdkIsWUFBdUI7QUFDdkIsa0JBQTJCO0FBQzNCLDhCQUF3QjtBQUN4Qiw0QkFBOEI7QUFDOUIsb0NBQXVDO0FBQ3ZDLGtDQUFxQztBQUVyQyxtQ0FBc0M7QUFFdEMsU0FBUyx5QkFBeUIsTUFBTTtBQUN0QyxNQUFJO0FBRUosUUFBTSxXQUFXO0FBQUEsSUFDZix1QkFBdUIsQ0FBQztBQUFBLElBQ3hCLG9CQUFvQjtBQUFBLElBQ3BCLFlBQVk7QUFBQSxJQUNaLG9CQUFvQjtBQUFBLEVB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
