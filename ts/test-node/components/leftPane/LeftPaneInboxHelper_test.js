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
var import_ConversationList = require("../../../components/ConversationList");
var import_LeftPaneHelper = require("../../../components/leftPane/LeftPaneHelper");
var import_getDefaultConversation = require("../../../test-both/helpers/getDefaultConversation");
var import_LeftPaneInboxHelper = require("../../../components/leftPane/LeftPaneInboxHelper");
describe("LeftPaneInboxHelper", () => {
  const defaultProps = {
    archivedConversations: [],
    conversations: [],
    isAboutToSearchInAConversation: false,
    pinnedConversations: [],
    searchConversation: void 0,
    searchDisabled: false,
    searchTerm: "",
    startSearchCounter: 0
  };
  describe("getBackAction", () => {
    it("returns undefined; you can't go back from the main inbox", () => {
      const helper = new import_LeftPaneInboxHelper.LeftPaneInboxHelper(defaultProps);
      import_chai.assert.isUndefined(helper.getBackAction({
        showChooseGroupMembers: sinon.fake(),
        showInbox: sinon.fake(),
        startComposing: sinon.fake()
      }));
    });
  });
  describe("getRowCount", () => {
    it("returns 0 if there are no conversations", () => {
      const helper = new import_LeftPaneInboxHelper.LeftPaneInboxHelper(defaultProps);
      import_chai.assert.strictEqual(helper.getRowCount(), 0);
    });
    it("returns 1 if there are only archived conversations", () => {
      const helper = new import_LeftPaneInboxHelper.LeftPaneInboxHelper({
        ...defaultProps,
        archivedConversations: [(0, import_getDefaultConversation.getDefaultConversation)()]
      });
      import_chai.assert.strictEqual(helper.getRowCount(), 1);
    });
    it("returns the number of non-pinned conversations if that's all there is", () => {
      const helper = new import_LeftPaneInboxHelper.LeftPaneInboxHelper({
        ...defaultProps,
        conversations: [
          (0, import_getDefaultConversation.getDefaultConversation)(),
          (0, import_getDefaultConversation.getDefaultConversation)(),
          (0, import_getDefaultConversation.getDefaultConversation)()
        ]
      });
      import_chai.assert.strictEqual(helper.getRowCount(), 3);
    });
    it("returns the number of pinned conversations if that's all there is", () => {
      const helper = new import_LeftPaneInboxHelper.LeftPaneInboxHelper({
        ...defaultProps,
        pinnedConversations: [
          (0, import_getDefaultConversation.getDefaultConversation)(),
          (0, import_getDefaultConversation.getDefaultConversation)(),
          (0, import_getDefaultConversation.getDefaultConversation)()
        ]
      });
      import_chai.assert.strictEqual(helper.getRowCount(), 3);
    });
    it("adds 2 rows for each header if there are pinned and non-pinned conversations,", () => {
      const helper = new import_LeftPaneInboxHelper.LeftPaneInboxHelper({
        ...defaultProps,
        conversations: [
          (0, import_getDefaultConversation.getDefaultConversation)(),
          (0, import_getDefaultConversation.getDefaultConversation)(),
          (0, import_getDefaultConversation.getDefaultConversation)()
        ],
        pinnedConversations: [(0, import_getDefaultConversation.getDefaultConversation)()]
      });
      import_chai.assert.strictEqual(helper.getRowCount(), 6);
    });
    it("adds 1 row for the archive button if there are any archived conversations", () => {
      const helper = new import_LeftPaneInboxHelper.LeftPaneInboxHelper({
        ...defaultProps,
        conversations: [
          (0, import_getDefaultConversation.getDefaultConversation)(),
          (0, import_getDefaultConversation.getDefaultConversation)(),
          (0, import_getDefaultConversation.getDefaultConversation)()
        ],
        archivedConversations: [(0, import_getDefaultConversation.getDefaultConversation)()]
      });
      import_chai.assert.strictEqual(helper.getRowCount(), 4);
    });
  });
  describe("getRowIndexToScrollTo", () => {
    it("returns undefined if no conversation is selected", () => {
      const helper = new import_LeftPaneInboxHelper.LeftPaneInboxHelper({
        ...defaultProps,
        conversations: [(0, import_getDefaultConversation.getDefaultConversation)(), (0, import_getDefaultConversation.getDefaultConversation)()],
        pinnedConversations: [(0, import_getDefaultConversation.getDefaultConversation)()]
      });
      import_chai.assert.isUndefined(helper.getRowIndexToScrollTo(void 0));
    });
    it("returns undefined if the selected conversation is not pinned or non-pinned", () => {
      const archivedConversations = [(0, import_getDefaultConversation.getDefaultConversation)()];
      const helper = new import_LeftPaneInboxHelper.LeftPaneInboxHelper({
        ...defaultProps,
        conversations: [(0, import_getDefaultConversation.getDefaultConversation)(), (0, import_getDefaultConversation.getDefaultConversation)()],
        pinnedConversations: [(0, import_getDefaultConversation.getDefaultConversation)()],
        archivedConversations
      });
      import_chai.assert.isUndefined(helper.getRowIndexToScrollTo(archivedConversations[0].id));
    });
    it("returns the pinned conversation's index if there are only pinned conversations", () => {
      const pinnedConversations = [
        (0, import_getDefaultConversation.getDefaultConversation)(),
        (0, import_getDefaultConversation.getDefaultConversation)()
      ];
      const helper = new import_LeftPaneInboxHelper.LeftPaneInboxHelper({
        ...defaultProps,
        pinnedConversations
      });
      import_chai.assert.strictEqual(helper.getRowIndexToScrollTo(pinnedConversations[0].id), 0);
      import_chai.assert.strictEqual(helper.getRowIndexToScrollTo(pinnedConversations[1].id), 1);
    });
    it("returns the conversation's index if there are only non-pinned conversations", () => {
      const conversations = [
        (0, import_getDefaultConversation.getDefaultConversation)(),
        (0, import_getDefaultConversation.getDefaultConversation)()
      ];
      const helper = new import_LeftPaneInboxHelper.LeftPaneInboxHelper({
        ...defaultProps,
        conversations
      });
      import_chai.assert.strictEqual(helper.getRowIndexToScrollTo(conversations[0].id), 0);
      import_chai.assert.strictEqual(helper.getRowIndexToScrollTo(conversations[1].id), 1);
    });
    it("returns the pinned conversation's index + 1 (for the header) if there are both pinned and non-pinned conversations", () => {
      const pinnedConversations = [
        (0, import_getDefaultConversation.getDefaultConversation)(),
        (0, import_getDefaultConversation.getDefaultConversation)()
      ];
      const helper = new import_LeftPaneInboxHelper.LeftPaneInboxHelper({
        ...defaultProps,
        conversations: [(0, import_getDefaultConversation.getDefaultConversation)()],
        pinnedConversations
      });
      import_chai.assert.strictEqual(helper.getRowIndexToScrollTo(pinnedConversations[0].id), 1);
      import_chai.assert.strictEqual(helper.getRowIndexToScrollTo(pinnedConversations[1].id), 2);
    });
    it("returns the non-pinned conversation's index + pinnedConversations.length + 2 (for the headers) if there are both pinned and non-pinned conversations", () => {
      const conversations = [
        (0, import_getDefaultConversation.getDefaultConversation)(),
        (0, import_getDefaultConversation.getDefaultConversation)()
      ];
      const helper = new import_LeftPaneInboxHelper.LeftPaneInboxHelper({
        ...defaultProps,
        conversations,
        pinnedConversations: [
          (0, import_getDefaultConversation.getDefaultConversation)(),
          (0, import_getDefaultConversation.getDefaultConversation)(),
          (0, import_getDefaultConversation.getDefaultConversation)()
        ]
      });
      import_chai.assert.strictEqual(helper.getRowIndexToScrollTo(conversations[0].id), 5);
      import_chai.assert.strictEqual(helper.getRowIndexToScrollTo(conversations[1].id), 6);
    });
  });
  describe("getRow", () => {
    it("returns the archive button if there are only archived conversations", () => {
      const helper = new import_LeftPaneInboxHelper.LeftPaneInboxHelper({
        ...defaultProps,
        archivedConversations: [
          (0, import_getDefaultConversation.getDefaultConversation)(),
          (0, import_getDefaultConversation.getDefaultConversation)()
        ]
      });
      import_chai.assert.deepEqual(helper.getRow(0), {
        type: import_ConversationList.RowType.ArchiveButton,
        archivedConversationsCount: 2
      });
      import_chai.assert.isUndefined(helper.getRow(1));
    });
    it("returns pinned conversations if that's all there are", () => {
      const pinnedConversations = [
        (0, import_getDefaultConversation.getDefaultConversation)(),
        (0, import_getDefaultConversation.getDefaultConversation)()
      ];
      const helper = new import_LeftPaneInboxHelper.LeftPaneInboxHelper({
        ...defaultProps,
        pinnedConversations
      });
      import_chai.assert.deepEqual(helper.getRow(0), {
        type: import_ConversationList.RowType.Conversation,
        conversation: pinnedConversations[0]
      });
      import_chai.assert.deepEqual(helper.getRow(1), {
        type: import_ConversationList.RowType.Conversation,
        conversation: pinnedConversations[1]
      });
      import_chai.assert.isUndefined(helper.getRow(2));
    });
    it("returns pinned conversations and an archive button if there are no non-pinned conversations", () => {
      const pinnedConversations = [
        (0, import_getDefaultConversation.getDefaultConversation)(),
        (0, import_getDefaultConversation.getDefaultConversation)()
      ];
      const helper = new import_LeftPaneInboxHelper.LeftPaneInboxHelper({
        ...defaultProps,
        pinnedConversations,
        archivedConversations: [(0, import_getDefaultConversation.getDefaultConversation)()]
      });
      import_chai.assert.deepEqual(helper.getRow(0), {
        type: import_ConversationList.RowType.Conversation,
        conversation: pinnedConversations[0]
      });
      import_chai.assert.deepEqual(helper.getRow(1), {
        type: import_ConversationList.RowType.Conversation,
        conversation: pinnedConversations[1]
      });
      import_chai.assert.deepEqual(helper.getRow(2), {
        type: import_ConversationList.RowType.ArchiveButton,
        archivedConversationsCount: 1
      });
      import_chai.assert.isUndefined(helper.getRow(3));
    });
    it("returns non-pinned conversations if that's all there are", () => {
      const conversations = [
        (0, import_getDefaultConversation.getDefaultConversation)(),
        (0, import_getDefaultConversation.getDefaultConversation)()
      ];
      const helper = new import_LeftPaneInboxHelper.LeftPaneInboxHelper({
        ...defaultProps,
        conversations
      });
      import_chai.assert.deepEqual(helper.getRow(0), {
        type: import_ConversationList.RowType.Conversation,
        conversation: conversations[0]
      });
      import_chai.assert.deepEqual(helper.getRow(1), {
        type: import_ConversationList.RowType.Conversation,
        conversation: conversations[1]
      });
      import_chai.assert.isUndefined(helper.getRow(2));
    });
    it("returns non-pinned conversations and an archive button if there are no pinned conversations", () => {
      const conversations = [
        (0, import_getDefaultConversation.getDefaultConversation)(),
        (0, import_getDefaultConversation.getDefaultConversation)()
      ];
      const helper = new import_LeftPaneInboxHelper.LeftPaneInboxHelper({
        ...defaultProps,
        conversations,
        archivedConversations: [(0, import_getDefaultConversation.getDefaultConversation)()]
      });
      import_chai.assert.deepEqual(helper.getRow(0), {
        type: import_ConversationList.RowType.Conversation,
        conversation: conversations[0]
      });
      import_chai.assert.deepEqual(helper.getRow(1), {
        type: import_ConversationList.RowType.Conversation,
        conversation: conversations[1]
      });
      import_chai.assert.deepEqual(helper.getRow(2), {
        type: import_ConversationList.RowType.ArchiveButton,
        archivedConversationsCount: 1
      });
      import_chai.assert.isUndefined(helper.getRow(3));
    });
    it("returns headers if there are both pinned and non-pinned conversations", () => {
      const conversations = [
        (0, import_getDefaultConversation.getDefaultConversation)(),
        (0, import_getDefaultConversation.getDefaultConversation)(),
        (0, import_getDefaultConversation.getDefaultConversation)()
      ];
      const pinnedConversations = [
        (0, import_getDefaultConversation.getDefaultConversation)(),
        (0, import_getDefaultConversation.getDefaultConversation)()
      ];
      const helper = new import_LeftPaneInboxHelper.LeftPaneInboxHelper({
        ...defaultProps,
        conversations,
        pinnedConversations
      });
      import_chai.assert.deepEqual(helper.getRow(0), {
        type: import_ConversationList.RowType.Header,
        i18nKey: "LeftPane--pinned"
      });
      import_chai.assert.deepEqual(helper.getRow(1), {
        type: import_ConversationList.RowType.Conversation,
        conversation: pinnedConversations[0]
      });
      import_chai.assert.deepEqual(helper.getRow(2), {
        type: import_ConversationList.RowType.Conversation,
        conversation: pinnedConversations[1]
      });
      import_chai.assert.deepEqual(helper.getRow(3), {
        type: import_ConversationList.RowType.Header,
        i18nKey: "LeftPane--chats"
      });
      import_chai.assert.deepEqual(helper.getRow(4), {
        type: import_ConversationList.RowType.Conversation,
        conversation: conversations[0]
      });
      import_chai.assert.deepEqual(helper.getRow(5), {
        type: import_ConversationList.RowType.Conversation,
        conversation: conversations[1]
      });
      import_chai.assert.deepEqual(helper.getRow(6), {
        type: import_ConversationList.RowType.Conversation,
        conversation: conversations[2]
      });
      import_chai.assert.isUndefined(helper.getRow(7));
    });
    it("returns headers if there are both pinned and non-pinned conversations, and an archive button", () => {
      const conversations = [
        (0, import_getDefaultConversation.getDefaultConversation)(),
        (0, import_getDefaultConversation.getDefaultConversation)(),
        (0, import_getDefaultConversation.getDefaultConversation)()
      ];
      const pinnedConversations = [
        (0, import_getDefaultConversation.getDefaultConversation)(),
        (0, import_getDefaultConversation.getDefaultConversation)()
      ];
      const helper = new import_LeftPaneInboxHelper.LeftPaneInboxHelper({
        ...defaultProps,
        conversations,
        pinnedConversations,
        archivedConversations: [(0, import_getDefaultConversation.getDefaultConversation)()]
      });
      import_chai.assert.deepEqual(helper.getRow(0), {
        type: import_ConversationList.RowType.Header,
        i18nKey: "LeftPane--pinned"
      });
      import_chai.assert.deepEqual(helper.getRow(1), {
        type: import_ConversationList.RowType.Conversation,
        conversation: pinnedConversations[0]
      });
      import_chai.assert.deepEqual(helper.getRow(2), {
        type: import_ConversationList.RowType.Conversation,
        conversation: pinnedConversations[1]
      });
      import_chai.assert.deepEqual(helper.getRow(3), {
        type: import_ConversationList.RowType.Header,
        i18nKey: "LeftPane--chats"
      });
      import_chai.assert.deepEqual(helper.getRow(4), {
        type: import_ConversationList.RowType.Conversation,
        conversation: conversations[0]
      });
      import_chai.assert.deepEqual(helper.getRow(5), {
        type: import_ConversationList.RowType.Conversation,
        conversation: conversations[1]
      });
      import_chai.assert.deepEqual(helper.getRow(6), {
        type: import_ConversationList.RowType.Conversation,
        conversation: conversations[2]
      });
      import_chai.assert.deepEqual(helper.getRow(7), {
        type: import_ConversationList.RowType.ArchiveButton,
        archivedConversationsCount: 1
      });
      import_chai.assert.isUndefined(helper.getRow(8));
    });
  });
  describe("getConversationAndMessageAtIndex", () => {
    it("returns pinned conversations, then non-pinned conversations", () => {
      const conversations = [
        (0, import_getDefaultConversation.getDefaultConversation)(),
        (0, import_getDefaultConversation.getDefaultConversation)(),
        (0, import_getDefaultConversation.getDefaultConversation)()
      ];
      const pinnedConversations = [
        (0, import_getDefaultConversation.getDefaultConversation)(),
        (0, import_getDefaultConversation.getDefaultConversation)()
      ];
      const helper = new import_LeftPaneInboxHelper.LeftPaneInboxHelper({
        ...defaultProps,
        conversations,
        pinnedConversations
      });
      import_chai.assert.strictEqual(helper.getConversationAndMessageAtIndex(0)?.conversationId, pinnedConversations[0].id);
      import_chai.assert.strictEqual(helper.getConversationAndMessageAtIndex(1)?.conversationId, pinnedConversations[1].id);
      import_chai.assert.strictEqual(helper.getConversationAndMessageAtIndex(2)?.conversationId, conversations[0].id);
      import_chai.assert.strictEqual(helper.getConversationAndMessageAtIndex(3)?.conversationId, conversations[1].id);
      import_chai.assert.strictEqual(helper.getConversationAndMessageAtIndex(4)?.conversationId, conversations[2].id);
    });
    it("when requesting an index out of bounds, returns the last pinned conversation when that's all there is", () => {
      const pinnedConversations = [
        (0, import_getDefaultConversation.getDefaultConversation)(),
        (0, import_getDefaultConversation.getDefaultConversation)()
      ];
      const helper = new import_LeftPaneInboxHelper.LeftPaneInboxHelper({
        ...defaultProps,
        pinnedConversations
      });
      import_chai.assert.strictEqual(helper.getConversationAndMessageAtIndex(2)?.conversationId, pinnedConversations[1].id);
      import_chai.assert.strictEqual(helper.getConversationAndMessageAtIndex(99)?.conversationId, pinnedConversations[1].id);
      import_chai.assert.strictEqual(helper.getConversationAndMessageAtIndex(-1)?.conversationId, pinnedConversations[1].id);
    });
    it("when requesting an index out of bounds, returns the last non-pinned conversation when that's all there is", () => {
      const conversations = [
        (0, import_getDefaultConversation.getDefaultConversation)(),
        (0, import_getDefaultConversation.getDefaultConversation)()
      ];
      const helper = new import_LeftPaneInboxHelper.LeftPaneInboxHelper({
        ...defaultProps,
        conversations
      });
      import_chai.assert.strictEqual(helper.getConversationAndMessageAtIndex(2)?.conversationId, conversations[1].id);
      import_chai.assert.strictEqual(helper.getConversationAndMessageAtIndex(99)?.conversationId, conversations[1].id);
      import_chai.assert.strictEqual(helper.getConversationAndMessageAtIndex(-1)?.conversationId, conversations[1].id);
    });
    it("when requesting an index out of bounds, returns the last non-pinned conversation when there are both pinned and non-pinned conversations", () => {
      const conversations = [
        (0, import_getDefaultConversation.getDefaultConversation)(),
        (0, import_getDefaultConversation.getDefaultConversation)()
      ];
      const pinnedConversations = [
        (0, import_getDefaultConversation.getDefaultConversation)(),
        (0, import_getDefaultConversation.getDefaultConversation)()
      ];
      const helper = new import_LeftPaneInboxHelper.LeftPaneInboxHelper({
        ...defaultProps,
        conversations,
        pinnedConversations
      });
      import_chai.assert.strictEqual(helper.getConversationAndMessageAtIndex(4)?.conversationId, conversations[1].id);
      import_chai.assert.strictEqual(helper.getConversationAndMessageAtIndex(99)?.conversationId, conversations[1].id);
      import_chai.assert.strictEqual(helper.getConversationAndMessageAtIndex(-1)?.conversationId, conversations[1].id);
    });
    it("returns undefined if there are no conversations", () => {
      const helper = new import_LeftPaneInboxHelper.LeftPaneInboxHelper({
        ...defaultProps,
        archivedConversations: [(0, import_getDefaultConversation.getDefaultConversation)()]
      });
      import_chai.assert.isUndefined(helper.getConversationAndMessageAtIndex(0));
      import_chai.assert.isUndefined(helper.getConversationAndMessageAtIndex(1));
      import_chai.assert.isUndefined(helper.getConversationAndMessageAtIndex(-1));
    });
  });
  describe("getConversationAndMessageInDirection", () => {
    it("returns the next conversation when searching downward", () => {
      const pinnedConversations = [
        (0, import_getDefaultConversation.getDefaultConversation)(),
        (0, import_getDefaultConversation.getDefaultConversation)()
      ];
      const conversations = [(0, import_getDefaultConversation.getDefaultConversation)()];
      const helper = new import_LeftPaneInboxHelper.LeftPaneInboxHelper({
        ...defaultProps,
        conversations,
        pinnedConversations
      });
      import_chai.assert.deepEqual(helper.getConversationAndMessageInDirection({ direction: import_LeftPaneHelper.FindDirection.Down, unreadOnly: false }, pinnedConversations[1].id, void 0), { conversationId: conversations[0].id });
    });
  });
  describe("requiresFullWidth", () => {
    it("returns false if we're not about to search in a conversation and there's at least one", () => {
      const helper = new import_LeftPaneInboxHelper.LeftPaneInboxHelper({
        ...defaultProps,
        conversations: [(0, import_getDefaultConversation.getDefaultConversation)()]
      });
      import_chai.assert.isFalse(helper.requiresFullWidth());
    });
    it("returns true if there are no conversations", () => {
      const helper = new import_LeftPaneInboxHelper.LeftPaneInboxHelper(defaultProps);
      import_chai.assert.isTrue(helper.requiresFullWidth());
    });
    it("returns true if we're about to search", () => {
      const helper = new import_LeftPaneInboxHelper.LeftPaneInboxHelper({
        ...defaultProps,
        startSearchCounter: 1
      });
      import_chai.assert.isTrue(helper.requiresFullWidth());
    });
    it("returns true if we're about to search in a conversation", () => {
      const helper = new import_LeftPaneInboxHelper.LeftPaneInboxHelper({
        ...defaultProps,
        isAboutToSearchInAConversation: true
      });
      import_chai.assert.isTrue(helper.requiresFullWidth());
    });
  });
  describe("shouldRecomputeRowHeights", () => {
    it("returns false if the number of conversations in each section doesn't change", () => {
      const helper = new import_LeftPaneInboxHelper.LeftPaneInboxHelper({
        ...defaultProps,
        conversations: [
          (0, import_getDefaultConversation.getDefaultConversation)(),
          (0, import_getDefaultConversation.getDefaultConversation)(),
          (0, import_getDefaultConversation.getDefaultConversation)()
        ],
        pinnedConversations: [
          (0, import_getDefaultConversation.getDefaultConversation)(),
          (0, import_getDefaultConversation.getDefaultConversation)()
        ],
        archivedConversations: [(0, import_getDefaultConversation.getDefaultConversation)()]
      });
      import_chai.assert.isFalse(helper.shouldRecomputeRowHeights({
        ...defaultProps,
        conversations: [
          (0, import_getDefaultConversation.getDefaultConversation)(),
          (0, import_getDefaultConversation.getDefaultConversation)(),
          (0, import_getDefaultConversation.getDefaultConversation)()
        ],
        pinnedConversations: [
          (0, import_getDefaultConversation.getDefaultConversation)(),
          (0, import_getDefaultConversation.getDefaultConversation)()
        ],
        archivedConversations: [
          (0, import_getDefaultConversation.getDefaultConversation)(),
          (0, import_getDefaultConversation.getDefaultConversation)()
        ]
      }));
    });
    it("returns false if the only thing changed is whether conversations are archived", () => {
      const helper = new import_LeftPaneInboxHelper.LeftPaneInboxHelper({
        ...defaultProps,
        conversations: [
          (0, import_getDefaultConversation.getDefaultConversation)(),
          (0, import_getDefaultConversation.getDefaultConversation)(),
          (0, import_getDefaultConversation.getDefaultConversation)()
        ],
        pinnedConversations: [
          (0, import_getDefaultConversation.getDefaultConversation)(),
          (0, import_getDefaultConversation.getDefaultConversation)()
        ],
        archivedConversations: [(0, import_getDefaultConversation.getDefaultConversation)()]
      });
      import_chai.assert.isFalse(helper.shouldRecomputeRowHeights({
        ...defaultProps,
        conversations: [
          (0, import_getDefaultConversation.getDefaultConversation)(),
          (0, import_getDefaultConversation.getDefaultConversation)(),
          (0, import_getDefaultConversation.getDefaultConversation)()
        ],
        pinnedConversations: [
          (0, import_getDefaultConversation.getDefaultConversation)(),
          (0, import_getDefaultConversation.getDefaultConversation)()
        ]
      }));
    });
    it("returns false if the only thing changed is the number of non-pinned conversations", () => {
      const helper = new import_LeftPaneInboxHelper.LeftPaneInboxHelper({
        ...defaultProps,
        conversations: [
          (0, import_getDefaultConversation.getDefaultConversation)(),
          (0, import_getDefaultConversation.getDefaultConversation)(),
          (0, import_getDefaultConversation.getDefaultConversation)()
        ],
        pinnedConversations: [
          (0, import_getDefaultConversation.getDefaultConversation)(),
          (0, import_getDefaultConversation.getDefaultConversation)()
        ],
        archivedConversations: [(0, import_getDefaultConversation.getDefaultConversation)()]
      });
      import_chai.assert.isFalse(helper.shouldRecomputeRowHeights({
        ...defaultProps,
        conversations: [(0, import_getDefaultConversation.getDefaultConversation)()],
        pinnedConversations: [
          (0, import_getDefaultConversation.getDefaultConversation)(),
          (0, import_getDefaultConversation.getDefaultConversation)()
        ],
        archivedConversations: [
          (0, import_getDefaultConversation.getDefaultConversation)(),
          (0, import_getDefaultConversation.getDefaultConversation)()
        ]
      }));
    });
    it("returns true if the number of pinned conversations changes", () => {
      const helper = new import_LeftPaneInboxHelper.LeftPaneInboxHelper({
        ...defaultProps,
        conversations: [(0, import_getDefaultConversation.getDefaultConversation)()],
        pinnedConversations: [
          (0, import_getDefaultConversation.getDefaultConversation)(),
          (0, import_getDefaultConversation.getDefaultConversation)()
        ],
        archivedConversations: [(0, import_getDefaultConversation.getDefaultConversation)()]
      });
      import_chai.assert.isTrue(helper.shouldRecomputeRowHeights({
        ...defaultProps,
        conversations: [(0, import_getDefaultConversation.getDefaultConversation)()],
        pinnedConversations: [
          (0, import_getDefaultConversation.getDefaultConversation)(),
          (0, import_getDefaultConversation.getDefaultConversation)(),
          (0, import_getDefaultConversation.getDefaultConversation)()
        ],
        archivedConversations: [(0, import_getDefaultConversation.getDefaultConversation)()]
      }));
      import_chai.assert.isTrue(helper.shouldRecomputeRowHeights({
        ...defaultProps,
        conversations: [(0, import_getDefaultConversation.getDefaultConversation)()],
        pinnedConversations: [(0, import_getDefaultConversation.getDefaultConversation)()],
        archivedConversations: [(0, import_getDefaultConversation.getDefaultConversation)()]
      }));
      import_chai.assert.isTrue(helper.shouldRecomputeRowHeights({
        ...defaultProps,
        conversations: [(0, import_getDefaultConversation.getDefaultConversation)()],
        pinnedConversations: [],
        archivedConversations: [(0, import_getDefaultConversation.getDefaultConversation)()]
      }));
    });
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiTGVmdFBhbmVJbmJveEhlbHBlcl90ZXN0LnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEtMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IGFzc2VydCB9IGZyb20gJ2NoYWknO1xuaW1wb3J0ICogYXMgc2lub24gZnJvbSAnc2lub24nO1xuaW1wb3J0IHsgUm93VHlwZSB9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvQ29udmVyc2F0aW9uTGlzdCc7XG5pbXBvcnQgeyBGaW5kRGlyZWN0aW9uIH0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9sZWZ0UGFuZS9MZWZ0UGFuZUhlbHBlcic7XG5pbXBvcnQgeyBnZXREZWZhdWx0Q29udmVyc2F0aW9uIH0gZnJvbSAnLi4vLi4vLi4vdGVzdC1ib3RoL2hlbHBlcnMvZ2V0RGVmYXVsdENvbnZlcnNhdGlvbic7XG5cbmltcG9ydCB0eXBlIHsgTGVmdFBhbmVJbmJveFByb3BzVHlwZSB9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvbGVmdFBhbmUvTGVmdFBhbmVJbmJveEhlbHBlcic7XG5pbXBvcnQgeyBMZWZ0UGFuZUluYm94SGVscGVyIH0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9sZWZ0UGFuZS9MZWZ0UGFuZUluYm94SGVscGVyJztcblxuZGVzY3JpYmUoJ0xlZnRQYW5lSW5ib3hIZWxwZXInLCAoKSA9PiB7XG4gIGNvbnN0IGRlZmF1bHRQcm9wczogTGVmdFBhbmVJbmJveFByb3BzVHlwZSA9IHtcbiAgICBhcmNoaXZlZENvbnZlcnNhdGlvbnM6IFtdLFxuICAgIGNvbnZlcnNhdGlvbnM6IFtdLFxuICAgIGlzQWJvdXRUb1NlYXJjaEluQUNvbnZlcnNhdGlvbjogZmFsc2UsXG4gICAgcGlubmVkQ29udmVyc2F0aW9uczogW10sXG4gICAgc2VhcmNoQ29udmVyc2F0aW9uOiB1bmRlZmluZWQsXG4gICAgc2VhcmNoRGlzYWJsZWQ6IGZhbHNlLFxuICAgIHNlYXJjaFRlcm06ICcnLFxuICAgIHN0YXJ0U2VhcmNoQ291bnRlcjogMCxcbiAgfTtcblxuICBkZXNjcmliZSgnZ2V0QmFja0FjdGlvbicsICgpID0+IHtcbiAgICBpdChcInJldHVybnMgdW5kZWZpbmVkOyB5b3UgY2FuJ3QgZ28gYmFjayBmcm9tIHRoZSBtYWluIGluYm94XCIsICgpID0+IHtcbiAgICAgIGNvbnN0IGhlbHBlciA9IG5ldyBMZWZ0UGFuZUluYm94SGVscGVyKGRlZmF1bHRQcm9wcyk7XG5cbiAgICAgIGFzc2VydC5pc1VuZGVmaW5lZChcbiAgICAgICAgaGVscGVyLmdldEJhY2tBY3Rpb24oe1xuICAgICAgICAgIHNob3dDaG9vc2VHcm91cE1lbWJlcnM6IHNpbm9uLmZha2UoKSxcbiAgICAgICAgICBzaG93SW5ib3g6IHNpbm9uLmZha2UoKSxcbiAgICAgICAgICBzdGFydENvbXBvc2luZzogc2lub24uZmFrZSgpLFxuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ2dldFJvd0NvdW50JywgKCkgPT4ge1xuICAgIGl0KCdyZXR1cm5zIDAgaWYgdGhlcmUgYXJlIG5vIGNvbnZlcnNhdGlvbnMnLCAoKSA9PiB7XG4gICAgICBjb25zdCBoZWxwZXIgPSBuZXcgTGVmdFBhbmVJbmJveEhlbHBlcihkZWZhdWx0UHJvcHMpO1xuXG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoaGVscGVyLmdldFJvd0NvdW50KCksIDApO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgMSBpZiB0aGVyZSBhcmUgb25seSBhcmNoaXZlZCBjb252ZXJzYXRpb25zJywgKCkgPT4ge1xuICAgICAgY29uc3QgaGVscGVyID0gbmV3IExlZnRQYW5lSW5ib3hIZWxwZXIoe1xuICAgICAgICAuLi5kZWZhdWx0UHJvcHMsXG4gICAgICAgIGFyY2hpdmVkQ29udmVyc2F0aW9uczogW2dldERlZmF1bHRDb252ZXJzYXRpb24oKV0sXG4gICAgICB9KTtcblxuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGhlbHBlci5nZXRSb3dDb3VudCgpLCAxKTtcbiAgICB9KTtcblxuICAgIGl0KFwicmV0dXJucyB0aGUgbnVtYmVyIG9mIG5vbi1waW5uZWQgY29udmVyc2F0aW9ucyBpZiB0aGF0J3MgYWxsIHRoZXJlIGlzXCIsICgpID0+IHtcbiAgICAgIGNvbnN0IGhlbHBlciA9IG5ldyBMZWZ0UGFuZUluYm94SGVscGVyKHtcbiAgICAgICAgLi4uZGVmYXVsdFByb3BzLFxuICAgICAgICBjb252ZXJzYXRpb25zOiBbXG4gICAgICAgICAgZ2V0RGVmYXVsdENvbnZlcnNhdGlvbigpLFxuICAgICAgICAgIGdldERlZmF1bHRDb252ZXJzYXRpb24oKSxcbiAgICAgICAgICBnZXREZWZhdWx0Q29udmVyc2F0aW9uKCksXG4gICAgICAgIF0sXG4gICAgICB9KTtcblxuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGhlbHBlci5nZXRSb3dDb3VudCgpLCAzKTtcbiAgICB9KTtcblxuICAgIGl0KFwicmV0dXJucyB0aGUgbnVtYmVyIG9mIHBpbm5lZCBjb252ZXJzYXRpb25zIGlmIHRoYXQncyBhbGwgdGhlcmUgaXNcIiwgKCkgPT4ge1xuICAgICAgY29uc3QgaGVscGVyID0gbmV3IExlZnRQYW5lSW5ib3hIZWxwZXIoe1xuICAgICAgICAuLi5kZWZhdWx0UHJvcHMsXG4gICAgICAgIHBpbm5lZENvbnZlcnNhdGlvbnM6IFtcbiAgICAgICAgICBnZXREZWZhdWx0Q29udmVyc2F0aW9uKCksXG4gICAgICAgICAgZ2V0RGVmYXVsdENvbnZlcnNhdGlvbigpLFxuICAgICAgICAgIGdldERlZmF1bHRDb252ZXJzYXRpb24oKSxcbiAgICAgICAgXSxcbiAgICAgIH0pO1xuXG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoaGVscGVyLmdldFJvd0NvdW50KCksIDMpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2FkZHMgMiByb3dzIGZvciBlYWNoIGhlYWRlciBpZiB0aGVyZSBhcmUgcGlubmVkIGFuZCBub24tcGlubmVkIGNvbnZlcnNhdGlvbnMsJywgKCkgPT4ge1xuICAgICAgY29uc3QgaGVscGVyID0gbmV3IExlZnRQYW5lSW5ib3hIZWxwZXIoe1xuICAgICAgICAuLi5kZWZhdWx0UHJvcHMsXG4gICAgICAgIGNvbnZlcnNhdGlvbnM6IFtcbiAgICAgICAgICBnZXREZWZhdWx0Q29udmVyc2F0aW9uKCksXG4gICAgICAgICAgZ2V0RGVmYXVsdENvbnZlcnNhdGlvbigpLFxuICAgICAgICAgIGdldERlZmF1bHRDb252ZXJzYXRpb24oKSxcbiAgICAgICAgXSxcbiAgICAgICAgcGlubmVkQ29udmVyc2F0aW9uczogW2dldERlZmF1bHRDb252ZXJzYXRpb24oKV0sXG4gICAgICB9KTtcblxuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGhlbHBlci5nZXRSb3dDb3VudCgpLCA2KTtcbiAgICB9KTtcblxuICAgIGl0KCdhZGRzIDEgcm93IGZvciB0aGUgYXJjaGl2ZSBidXR0b24gaWYgdGhlcmUgYXJlIGFueSBhcmNoaXZlZCBjb252ZXJzYXRpb25zJywgKCkgPT4ge1xuICAgICAgY29uc3QgaGVscGVyID0gbmV3IExlZnRQYW5lSW5ib3hIZWxwZXIoe1xuICAgICAgICAuLi5kZWZhdWx0UHJvcHMsXG4gICAgICAgIGNvbnZlcnNhdGlvbnM6IFtcbiAgICAgICAgICBnZXREZWZhdWx0Q29udmVyc2F0aW9uKCksXG4gICAgICAgICAgZ2V0RGVmYXVsdENvbnZlcnNhdGlvbigpLFxuICAgICAgICAgIGdldERlZmF1bHRDb252ZXJzYXRpb24oKSxcbiAgICAgICAgXSxcbiAgICAgICAgYXJjaGl2ZWRDb252ZXJzYXRpb25zOiBbZ2V0RGVmYXVsdENvbnZlcnNhdGlvbigpXSxcbiAgICAgIH0pO1xuXG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoaGVscGVyLmdldFJvd0NvdW50KCksIDQpO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnZ2V0Um93SW5kZXhUb1Njcm9sbFRvJywgKCkgPT4ge1xuICAgIGl0KCdyZXR1cm5zIHVuZGVmaW5lZCBpZiBubyBjb252ZXJzYXRpb24gaXMgc2VsZWN0ZWQnLCAoKSA9PiB7XG4gICAgICBjb25zdCBoZWxwZXIgPSBuZXcgTGVmdFBhbmVJbmJveEhlbHBlcih7XG4gICAgICAgIC4uLmRlZmF1bHRQcm9wcyxcbiAgICAgICAgY29udmVyc2F0aW9uczogW2dldERlZmF1bHRDb252ZXJzYXRpb24oKSwgZ2V0RGVmYXVsdENvbnZlcnNhdGlvbigpXSxcbiAgICAgICAgcGlubmVkQ29udmVyc2F0aW9uczogW2dldERlZmF1bHRDb252ZXJzYXRpb24oKV0sXG4gICAgICB9KTtcblxuICAgICAgYXNzZXJ0LmlzVW5kZWZpbmVkKGhlbHBlci5nZXRSb3dJbmRleFRvU2Nyb2xsVG8odW5kZWZpbmVkKSk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyB1bmRlZmluZWQgaWYgdGhlIHNlbGVjdGVkIGNvbnZlcnNhdGlvbiBpcyBub3QgcGlubmVkIG9yIG5vbi1waW5uZWQnLCAoKSA9PiB7XG4gICAgICBjb25zdCBhcmNoaXZlZENvbnZlcnNhdGlvbnMgPSBbZ2V0RGVmYXVsdENvbnZlcnNhdGlvbigpXTtcbiAgICAgIGNvbnN0IGhlbHBlciA9IG5ldyBMZWZ0UGFuZUluYm94SGVscGVyKHtcbiAgICAgICAgLi4uZGVmYXVsdFByb3BzLFxuICAgICAgICBjb252ZXJzYXRpb25zOiBbZ2V0RGVmYXVsdENvbnZlcnNhdGlvbigpLCBnZXREZWZhdWx0Q29udmVyc2F0aW9uKCldLFxuICAgICAgICBwaW5uZWRDb252ZXJzYXRpb25zOiBbZ2V0RGVmYXVsdENvbnZlcnNhdGlvbigpXSxcbiAgICAgICAgYXJjaGl2ZWRDb252ZXJzYXRpb25zLFxuICAgICAgfSk7XG5cbiAgICAgIGFzc2VydC5pc1VuZGVmaW5lZChcbiAgICAgICAgaGVscGVyLmdldFJvd0luZGV4VG9TY3JvbGxUbyhhcmNoaXZlZENvbnZlcnNhdGlvbnNbMF0uaWQpXG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgaXQoXCJyZXR1cm5zIHRoZSBwaW5uZWQgY29udmVyc2F0aW9uJ3MgaW5kZXggaWYgdGhlcmUgYXJlIG9ubHkgcGlubmVkIGNvbnZlcnNhdGlvbnNcIiwgKCkgPT4ge1xuICAgICAgY29uc3QgcGlubmVkQ29udmVyc2F0aW9ucyA9IFtcbiAgICAgICAgZ2V0RGVmYXVsdENvbnZlcnNhdGlvbigpLFxuICAgICAgICBnZXREZWZhdWx0Q29udmVyc2F0aW9uKCksXG4gICAgICBdO1xuICAgICAgY29uc3QgaGVscGVyID0gbmV3IExlZnRQYW5lSW5ib3hIZWxwZXIoe1xuICAgICAgICAuLi5kZWZhdWx0UHJvcHMsXG4gICAgICAgIHBpbm5lZENvbnZlcnNhdGlvbnMsXG4gICAgICB9KTtcblxuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgICBoZWxwZXIuZ2V0Um93SW5kZXhUb1Njcm9sbFRvKHBpbm5lZENvbnZlcnNhdGlvbnNbMF0uaWQpLFxuICAgICAgICAwXG4gICAgICApO1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgICBoZWxwZXIuZ2V0Um93SW5kZXhUb1Njcm9sbFRvKHBpbm5lZENvbnZlcnNhdGlvbnNbMV0uaWQpLFxuICAgICAgICAxXG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgaXQoXCJyZXR1cm5zIHRoZSBjb252ZXJzYXRpb24ncyBpbmRleCBpZiB0aGVyZSBhcmUgb25seSBub24tcGlubmVkIGNvbnZlcnNhdGlvbnNcIiwgKCkgPT4ge1xuICAgICAgY29uc3QgY29udmVyc2F0aW9ucyA9IFtcbiAgICAgICAgZ2V0RGVmYXVsdENvbnZlcnNhdGlvbigpLFxuICAgICAgICBnZXREZWZhdWx0Q29udmVyc2F0aW9uKCksXG4gICAgICBdO1xuICAgICAgY29uc3QgaGVscGVyID0gbmV3IExlZnRQYW5lSW5ib3hIZWxwZXIoe1xuICAgICAgICAuLi5kZWZhdWx0UHJvcHMsXG4gICAgICAgIGNvbnZlcnNhdGlvbnMsXG4gICAgICB9KTtcblxuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGhlbHBlci5nZXRSb3dJbmRleFRvU2Nyb2xsVG8oY29udmVyc2F0aW9uc1swXS5pZCksIDApO1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGhlbHBlci5nZXRSb3dJbmRleFRvU2Nyb2xsVG8oY29udmVyc2F0aW9uc1sxXS5pZCksIDEpO1xuICAgIH0pO1xuXG4gICAgaXQoXCJyZXR1cm5zIHRoZSBwaW5uZWQgY29udmVyc2F0aW9uJ3MgaW5kZXggKyAxIChmb3IgdGhlIGhlYWRlcikgaWYgdGhlcmUgYXJlIGJvdGggcGlubmVkIGFuZCBub24tcGlubmVkIGNvbnZlcnNhdGlvbnNcIiwgKCkgPT4ge1xuICAgICAgY29uc3QgcGlubmVkQ29udmVyc2F0aW9ucyA9IFtcbiAgICAgICAgZ2V0RGVmYXVsdENvbnZlcnNhdGlvbigpLFxuICAgICAgICBnZXREZWZhdWx0Q29udmVyc2F0aW9uKCksXG4gICAgICBdO1xuICAgICAgY29uc3QgaGVscGVyID0gbmV3IExlZnRQYW5lSW5ib3hIZWxwZXIoe1xuICAgICAgICAuLi5kZWZhdWx0UHJvcHMsXG4gICAgICAgIGNvbnZlcnNhdGlvbnM6IFtnZXREZWZhdWx0Q29udmVyc2F0aW9uKCldLFxuICAgICAgICBwaW5uZWRDb252ZXJzYXRpb25zLFxuICAgICAgfSk7XG5cbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgICAgaGVscGVyLmdldFJvd0luZGV4VG9TY3JvbGxUbyhwaW5uZWRDb252ZXJzYXRpb25zWzBdLmlkKSxcbiAgICAgICAgMVxuICAgICAgKTtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgICAgaGVscGVyLmdldFJvd0luZGV4VG9TY3JvbGxUbyhwaW5uZWRDb252ZXJzYXRpb25zWzFdLmlkKSxcbiAgICAgICAgMlxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIGl0KFwicmV0dXJucyB0aGUgbm9uLXBpbm5lZCBjb252ZXJzYXRpb24ncyBpbmRleCArIHBpbm5lZENvbnZlcnNhdGlvbnMubGVuZ3RoICsgMiAoZm9yIHRoZSBoZWFkZXJzKSBpZiB0aGVyZSBhcmUgYm90aCBwaW5uZWQgYW5kIG5vbi1waW5uZWQgY29udmVyc2F0aW9uc1wiLCAoKSA9PiB7XG4gICAgICBjb25zdCBjb252ZXJzYXRpb25zID0gW1xuICAgICAgICBnZXREZWZhdWx0Q29udmVyc2F0aW9uKCksXG4gICAgICAgIGdldERlZmF1bHRDb252ZXJzYXRpb24oKSxcbiAgICAgIF07XG4gICAgICBjb25zdCBoZWxwZXIgPSBuZXcgTGVmdFBhbmVJbmJveEhlbHBlcih7XG4gICAgICAgIC4uLmRlZmF1bHRQcm9wcyxcbiAgICAgICAgY29udmVyc2F0aW9ucyxcbiAgICAgICAgcGlubmVkQ29udmVyc2F0aW9uczogW1xuICAgICAgICAgIGdldERlZmF1bHRDb252ZXJzYXRpb24oKSxcbiAgICAgICAgICBnZXREZWZhdWx0Q29udmVyc2F0aW9uKCksXG4gICAgICAgICAgZ2V0RGVmYXVsdENvbnZlcnNhdGlvbigpLFxuICAgICAgICBdLFxuICAgICAgfSk7XG5cbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChoZWxwZXIuZ2V0Um93SW5kZXhUb1Njcm9sbFRvKGNvbnZlcnNhdGlvbnNbMF0uaWQpLCA1KTtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChoZWxwZXIuZ2V0Um93SW5kZXhUb1Njcm9sbFRvKGNvbnZlcnNhdGlvbnNbMV0uaWQpLCA2KTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ2dldFJvdycsICgpID0+IHtcbiAgICBpdCgncmV0dXJucyB0aGUgYXJjaGl2ZSBidXR0b24gaWYgdGhlcmUgYXJlIG9ubHkgYXJjaGl2ZWQgY29udmVyc2F0aW9ucycsICgpID0+IHtcbiAgICAgIGNvbnN0IGhlbHBlciA9IG5ldyBMZWZ0UGFuZUluYm94SGVscGVyKHtcbiAgICAgICAgLi4uZGVmYXVsdFByb3BzLFxuICAgICAgICBhcmNoaXZlZENvbnZlcnNhdGlvbnM6IFtcbiAgICAgICAgICBnZXREZWZhdWx0Q29udmVyc2F0aW9uKCksXG4gICAgICAgICAgZ2V0RGVmYXVsdENvbnZlcnNhdGlvbigpLFxuICAgICAgICBdLFxuICAgICAgfSk7XG5cbiAgICAgIGFzc2VydC5kZWVwRXF1YWwoaGVscGVyLmdldFJvdygwKSwge1xuICAgICAgICB0eXBlOiBSb3dUeXBlLkFyY2hpdmVCdXR0b24sXG4gICAgICAgIGFyY2hpdmVkQ29udmVyc2F0aW9uc0NvdW50OiAyLFxuICAgICAgfSk7XG4gICAgICBhc3NlcnQuaXNVbmRlZmluZWQoaGVscGVyLmdldFJvdygxKSk7XG4gICAgfSk7XG5cbiAgICBpdChcInJldHVybnMgcGlubmVkIGNvbnZlcnNhdGlvbnMgaWYgdGhhdCdzIGFsbCB0aGVyZSBhcmVcIiwgKCkgPT4ge1xuICAgICAgY29uc3QgcGlubmVkQ29udmVyc2F0aW9ucyA9IFtcbiAgICAgICAgZ2V0RGVmYXVsdENvbnZlcnNhdGlvbigpLFxuICAgICAgICBnZXREZWZhdWx0Q29udmVyc2F0aW9uKCksXG4gICAgICBdO1xuXG4gICAgICBjb25zdCBoZWxwZXIgPSBuZXcgTGVmdFBhbmVJbmJveEhlbHBlcih7XG4gICAgICAgIC4uLmRlZmF1bHRQcm9wcyxcbiAgICAgICAgcGlubmVkQ29udmVyc2F0aW9ucyxcbiAgICAgIH0pO1xuXG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKGhlbHBlci5nZXRSb3coMCksIHtcbiAgICAgICAgdHlwZTogUm93VHlwZS5Db252ZXJzYXRpb24sXG4gICAgICAgIGNvbnZlcnNhdGlvbjogcGlubmVkQ29udmVyc2F0aW9uc1swXSxcbiAgICAgIH0pO1xuICAgICAgYXNzZXJ0LmRlZXBFcXVhbChoZWxwZXIuZ2V0Um93KDEpLCB7XG4gICAgICAgIHR5cGU6IFJvd1R5cGUuQ29udmVyc2F0aW9uLFxuICAgICAgICBjb252ZXJzYXRpb246IHBpbm5lZENvbnZlcnNhdGlvbnNbMV0sXG4gICAgICB9KTtcbiAgICAgIGFzc2VydC5pc1VuZGVmaW5lZChoZWxwZXIuZ2V0Um93KDIpKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIHBpbm5lZCBjb252ZXJzYXRpb25zIGFuZCBhbiBhcmNoaXZlIGJ1dHRvbiBpZiB0aGVyZSBhcmUgbm8gbm9uLXBpbm5lZCBjb252ZXJzYXRpb25zJywgKCkgPT4ge1xuICAgICAgY29uc3QgcGlubmVkQ29udmVyc2F0aW9ucyA9IFtcbiAgICAgICAgZ2V0RGVmYXVsdENvbnZlcnNhdGlvbigpLFxuICAgICAgICBnZXREZWZhdWx0Q29udmVyc2F0aW9uKCksXG4gICAgICBdO1xuXG4gICAgICBjb25zdCBoZWxwZXIgPSBuZXcgTGVmdFBhbmVJbmJveEhlbHBlcih7XG4gICAgICAgIC4uLmRlZmF1bHRQcm9wcyxcbiAgICAgICAgcGlubmVkQ29udmVyc2F0aW9ucyxcbiAgICAgICAgYXJjaGl2ZWRDb252ZXJzYXRpb25zOiBbZ2V0RGVmYXVsdENvbnZlcnNhdGlvbigpXSxcbiAgICAgIH0pO1xuXG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKGhlbHBlci5nZXRSb3coMCksIHtcbiAgICAgICAgdHlwZTogUm93VHlwZS5Db252ZXJzYXRpb24sXG4gICAgICAgIGNvbnZlcnNhdGlvbjogcGlubmVkQ29udmVyc2F0aW9uc1swXSxcbiAgICAgIH0pO1xuICAgICAgYXNzZXJ0LmRlZXBFcXVhbChoZWxwZXIuZ2V0Um93KDEpLCB7XG4gICAgICAgIHR5cGU6IFJvd1R5cGUuQ29udmVyc2F0aW9uLFxuICAgICAgICBjb252ZXJzYXRpb246IHBpbm5lZENvbnZlcnNhdGlvbnNbMV0sXG4gICAgICB9KTtcbiAgICAgIGFzc2VydC5kZWVwRXF1YWwoaGVscGVyLmdldFJvdygyKSwge1xuICAgICAgICB0eXBlOiBSb3dUeXBlLkFyY2hpdmVCdXR0b24sXG4gICAgICAgIGFyY2hpdmVkQ29udmVyc2F0aW9uc0NvdW50OiAxLFxuICAgICAgfSk7XG4gICAgICBhc3NlcnQuaXNVbmRlZmluZWQoaGVscGVyLmdldFJvdygzKSk7XG4gICAgfSk7XG5cbiAgICBpdChcInJldHVybnMgbm9uLXBpbm5lZCBjb252ZXJzYXRpb25zIGlmIHRoYXQncyBhbGwgdGhlcmUgYXJlXCIsICgpID0+IHtcbiAgICAgIGNvbnN0IGNvbnZlcnNhdGlvbnMgPSBbXG4gICAgICAgIGdldERlZmF1bHRDb252ZXJzYXRpb24oKSxcbiAgICAgICAgZ2V0RGVmYXVsdENvbnZlcnNhdGlvbigpLFxuICAgICAgXTtcblxuICAgICAgY29uc3QgaGVscGVyID0gbmV3IExlZnRQYW5lSW5ib3hIZWxwZXIoe1xuICAgICAgICAuLi5kZWZhdWx0UHJvcHMsXG4gICAgICAgIGNvbnZlcnNhdGlvbnMsXG4gICAgICB9KTtcblxuICAgICAgYXNzZXJ0LmRlZXBFcXVhbChoZWxwZXIuZ2V0Um93KDApLCB7XG4gICAgICAgIHR5cGU6IFJvd1R5cGUuQ29udmVyc2F0aW9uLFxuICAgICAgICBjb252ZXJzYXRpb246IGNvbnZlcnNhdGlvbnNbMF0sXG4gICAgICB9KTtcbiAgICAgIGFzc2VydC5kZWVwRXF1YWwoaGVscGVyLmdldFJvdygxKSwge1xuICAgICAgICB0eXBlOiBSb3dUeXBlLkNvbnZlcnNhdGlvbixcbiAgICAgICAgY29udmVyc2F0aW9uOiBjb252ZXJzYXRpb25zWzFdLFxuICAgICAgfSk7XG4gICAgICBhc3NlcnQuaXNVbmRlZmluZWQoaGVscGVyLmdldFJvdygyKSk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyBub24tcGlubmVkIGNvbnZlcnNhdGlvbnMgYW5kIGFuIGFyY2hpdmUgYnV0dG9uIGlmIHRoZXJlIGFyZSBubyBwaW5uZWQgY29udmVyc2F0aW9ucycsICgpID0+IHtcbiAgICAgIGNvbnN0IGNvbnZlcnNhdGlvbnMgPSBbXG4gICAgICAgIGdldERlZmF1bHRDb252ZXJzYXRpb24oKSxcbiAgICAgICAgZ2V0RGVmYXVsdENvbnZlcnNhdGlvbigpLFxuICAgICAgXTtcblxuICAgICAgY29uc3QgaGVscGVyID0gbmV3IExlZnRQYW5lSW5ib3hIZWxwZXIoe1xuICAgICAgICAuLi5kZWZhdWx0UHJvcHMsXG4gICAgICAgIGNvbnZlcnNhdGlvbnMsXG4gICAgICAgIGFyY2hpdmVkQ29udmVyc2F0aW9uczogW2dldERlZmF1bHRDb252ZXJzYXRpb24oKV0sXG4gICAgICB9KTtcblxuICAgICAgYXNzZXJ0LmRlZXBFcXVhbChoZWxwZXIuZ2V0Um93KDApLCB7XG4gICAgICAgIHR5cGU6IFJvd1R5cGUuQ29udmVyc2F0aW9uLFxuICAgICAgICBjb252ZXJzYXRpb246IGNvbnZlcnNhdGlvbnNbMF0sXG4gICAgICB9KTtcbiAgICAgIGFzc2VydC5kZWVwRXF1YWwoaGVscGVyLmdldFJvdygxKSwge1xuICAgICAgICB0eXBlOiBSb3dUeXBlLkNvbnZlcnNhdGlvbixcbiAgICAgICAgY29udmVyc2F0aW9uOiBjb252ZXJzYXRpb25zWzFdLFxuICAgICAgfSk7XG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKGhlbHBlci5nZXRSb3coMiksIHtcbiAgICAgICAgdHlwZTogUm93VHlwZS5BcmNoaXZlQnV0dG9uLFxuICAgICAgICBhcmNoaXZlZENvbnZlcnNhdGlvbnNDb3VudDogMSxcbiAgICAgIH0pO1xuICAgICAgYXNzZXJ0LmlzVW5kZWZpbmVkKGhlbHBlci5nZXRSb3coMykpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgaGVhZGVycyBpZiB0aGVyZSBhcmUgYm90aCBwaW5uZWQgYW5kIG5vbi1waW5uZWQgY29udmVyc2F0aW9ucycsICgpID0+IHtcbiAgICAgIGNvbnN0IGNvbnZlcnNhdGlvbnMgPSBbXG4gICAgICAgIGdldERlZmF1bHRDb252ZXJzYXRpb24oKSxcbiAgICAgICAgZ2V0RGVmYXVsdENvbnZlcnNhdGlvbigpLFxuICAgICAgICBnZXREZWZhdWx0Q29udmVyc2F0aW9uKCksXG4gICAgICBdO1xuICAgICAgY29uc3QgcGlubmVkQ29udmVyc2F0aW9ucyA9IFtcbiAgICAgICAgZ2V0RGVmYXVsdENvbnZlcnNhdGlvbigpLFxuICAgICAgICBnZXREZWZhdWx0Q29udmVyc2F0aW9uKCksXG4gICAgICBdO1xuXG4gICAgICBjb25zdCBoZWxwZXIgPSBuZXcgTGVmdFBhbmVJbmJveEhlbHBlcih7XG4gICAgICAgIC4uLmRlZmF1bHRQcm9wcyxcbiAgICAgICAgY29udmVyc2F0aW9ucyxcbiAgICAgICAgcGlubmVkQ29udmVyc2F0aW9ucyxcbiAgICAgIH0pO1xuXG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKGhlbHBlci5nZXRSb3coMCksIHtcbiAgICAgICAgdHlwZTogUm93VHlwZS5IZWFkZXIsXG4gICAgICAgIGkxOG5LZXk6ICdMZWZ0UGFuZS0tcGlubmVkJyxcbiAgICAgIH0pO1xuICAgICAgYXNzZXJ0LmRlZXBFcXVhbChoZWxwZXIuZ2V0Um93KDEpLCB7XG4gICAgICAgIHR5cGU6IFJvd1R5cGUuQ29udmVyc2F0aW9uLFxuICAgICAgICBjb252ZXJzYXRpb246IHBpbm5lZENvbnZlcnNhdGlvbnNbMF0sXG4gICAgICB9KTtcbiAgICAgIGFzc2VydC5kZWVwRXF1YWwoaGVscGVyLmdldFJvdygyKSwge1xuICAgICAgICB0eXBlOiBSb3dUeXBlLkNvbnZlcnNhdGlvbixcbiAgICAgICAgY29udmVyc2F0aW9uOiBwaW5uZWRDb252ZXJzYXRpb25zWzFdLFxuICAgICAgfSk7XG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKGhlbHBlci5nZXRSb3coMyksIHtcbiAgICAgICAgdHlwZTogUm93VHlwZS5IZWFkZXIsXG4gICAgICAgIGkxOG5LZXk6ICdMZWZ0UGFuZS0tY2hhdHMnLFxuICAgICAgfSk7XG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKGhlbHBlci5nZXRSb3coNCksIHtcbiAgICAgICAgdHlwZTogUm93VHlwZS5Db252ZXJzYXRpb24sXG4gICAgICAgIGNvbnZlcnNhdGlvbjogY29udmVyc2F0aW9uc1swXSxcbiAgICAgIH0pO1xuICAgICAgYXNzZXJ0LmRlZXBFcXVhbChoZWxwZXIuZ2V0Um93KDUpLCB7XG4gICAgICAgIHR5cGU6IFJvd1R5cGUuQ29udmVyc2F0aW9uLFxuICAgICAgICBjb252ZXJzYXRpb246IGNvbnZlcnNhdGlvbnNbMV0sXG4gICAgICB9KTtcbiAgICAgIGFzc2VydC5kZWVwRXF1YWwoaGVscGVyLmdldFJvdyg2KSwge1xuICAgICAgICB0eXBlOiBSb3dUeXBlLkNvbnZlcnNhdGlvbixcbiAgICAgICAgY29udmVyc2F0aW9uOiBjb252ZXJzYXRpb25zWzJdLFxuICAgICAgfSk7XG4gICAgICBhc3NlcnQuaXNVbmRlZmluZWQoaGVscGVyLmdldFJvdyg3KSk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyBoZWFkZXJzIGlmIHRoZXJlIGFyZSBib3RoIHBpbm5lZCBhbmQgbm9uLXBpbm5lZCBjb252ZXJzYXRpb25zLCBhbmQgYW4gYXJjaGl2ZSBidXR0b24nLCAoKSA9PiB7XG4gICAgICBjb25zdCBjb252ZXJzYXRpb25zID0gW1xuICAgICAgICBnZXREZWZhdWx0Q29udmVyc2F0aW9uKCksXG4gICAgICAgIGdldERlZmF1bHRDb252ZXJzYXRpb24oKSxcbiAgICAgICAgZ2V0RGVmYXVsdENvbnZlcnNhdGlvbigpLFxuICAgICAgXTtcbiAgICAgIGNvbnN0IHBpbm5lZENvbnZlcnNhdGlvbnMgPSBbXG4gICAgICAgIGdldERlZmF1bHRDb252ZXJzYXRpb24oKSxcbiAgICAgICAgZ2V0RGVmYXVsdENvbnZlcnNhdGlvbigpLFxuICAgICAgXTtcblxuICAgICAgY29uc3QgaGVscGVyID0gbmV3IExlZnRQYW5lSW5ib3hIZWxwZXIoe1xuICAgICAgICAuLi5kZWZhdWx0UHJvcHMsXG4gICAgICAgIGNvbnZlcnNhdGlvbnMsXG4gICAgICAgIHBpbm5lZENvbnZlcnNhdGlvbnMsXG4gICAgICAgIGFyY2hpdmVkQ29udmVyc2F0aW9uczogW2dldERlZmF1bHRDb252ZXJzYXRpb24oKV0sXG4gICAgICB9KTtcblxuICAgICAgYXNzZXJ0LmRlZXBFcXVhbChoZWxwZXIuZ2V0Um93KDApLCB7XG4gICAgICAgIHR5cGU6IFJvd1R5cGUuSGVhZGVyLFxuICAgICAgICBpMThuS2V5OiAnTGVmdFBhbmUtLXBpbm5lZCcsXG4gICAgICB9KTtcbiAgICAgIGFzc2VydC5kZWVwRXF1YWwoaGVscGVyLmdldFJvdygxKSwge1xuICAgICAgICB0eXBlOiBSb3dUeXBlLkNvbnZlcnNhdGlvbixcbiAgICAgICAgY29udmVyc2F0aW9uOiBwaW5uZWRDb252ZXJzYXRpb25zWzBdLFxuICAgICAgfSk7XG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKGhlbHBlci5nZXRSb3coMiksIHtcbiAgICAgICAgdHlwZTogUm93VHlwZS5Db252ZXJzYXRpb24sXG4gICAgICAgIGNvbnZlcnNhdGlvbjogcGlubmVkQ29udmVyc2F0aW9uc1sxXSxcbiAgICAgIH0pO1xuICAgICAgYXNzZXJ0LmRlZXBFcXVhbChoZWxwZXIuZ2V0Um93KDMpLCB7XG4gICAgICAgIHR5cGU6IFJvd1R5cGUuSGVhZGVyLFxuICAgICAgICBpMThuS2V5OiAnTGVmdFBhbmUtLWNoYXRzJyxcbiAgICAgIH0pO1xuICAgICAgYXNzZXJ0LmRlZXBFcXVhbChoZWxwZXIuZ2V0Um93KDQpLCB7XG4gICAgICAgIHR5cGU6IFJvd1R5cGUuQ29udmVyc2F0aW9uLFxuICAgICAgICBjb252ZXJzYXRpb246IGNvbnZlcnNhdGlvbnNbMF0sXG4gICAgICB9KTtcbiAgICAgIGFzc2VydC5kZWVwRXF1YWwoaGVscGVyLmdldFJvdyg1KSwge1xuICAgICAgICB0eXBlOiBSb3dUeXBlLkNvbnZlcnNhdGlvbixcbiAgICAgICAgY29udmVyc2F0aW9uOiBjb252ZXJzYXRpb25zWzFdLFxuICAgICAgfSk7XG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKGhlbHBlci5nZXRSb3coNiksIHtcbiAgICAgICAgdHlwZTogUm93VHlwZS5Db252ZXJzYXRpb24sXG4gICAgICAgIGNvbnZlcnNhdGlvbjogY29udmVyc2F0aW9uc1syXSxcbiAgICAgIH0pO1xuICAgICAgYXNzZXJ0LmRlZXBFcXVhbChoZWxwZXIuZ2V0Um93KDcpLCB7XG4gICAgICAgIHR5cGU6IFJvd1R5cGUuQXJjaGl2ZUJ1dHRvbixcbiAgICAgICAgYXJjaGl2ZWRDb252ZXJzYXRpb25zQ291bnQ6IDEsXG4gICAgICB9KTtcbiAgICAgIGFzc2VydC5pc1VuZGVmaW5lZChoZWxwZXIuZ2V0Um93KDgpKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ2dldENvbnZlcnNhdGlvbkFuZE1lc3NhZ2VBdEluZGV4JywgKCkgPT4ge1xuICAgIGl0KCdyZXR1cm5zIHBpbm5lZCBjb252ZXJzYXRpb25zLCB0aGVuIG5vbi1waW5uZWQgY29udmVyc2F0aW9ucycsICgpID0+IHtcbiAgICAgIGNvbnN0IGNvbnZlcnNhdGlvbnMgPSBbXG4gICAgICAgIGdldERlZmF1bHRDb252ZXJzYXRpb24oKSxcbiAgICAgICAgZ2V0RGVmYXVsdENvbnZlcnNhdGlvbigpLFxuICAgICAgICBnZXREZWZhdWx0Q29udmVyc2F0aW9uKCksXG4gICAgICBdO1xuICAgICAgY29uc3QgcGlubmVkQ29udmVyc2F0aW9ucyA9IFtcbiAgICAgICAgZ2V0RGVmYXVsdENvbnZlcnNhdGlvbigpLFxuICAgICAgICBnZXREZWZhdWx0Q29udmVyc2F0aW9uKCksXG4gICAgICBdO1xuXG4gICAgICBjb25zdCBoZWxwZXIgPSBuZXcgTGVmdFBhbmVJbmJveEhlbHBlcih7XG4gICAgICAgIC4uLmRlZmF1bHRQcm9wcyxcbiAgICAgICAgY29udmVyc2F0aW9ucyxcbiAgICAgICAgcGlubmVkQ29udmVyc2F0aW9ucyxcbiAgICAgIH0pO1xuXG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoXG4gICAgICAgIGhlbHBlci5nZXRDb252ZXJzYXRpb25BbmRNZXNzYWdlQXRJbmRleCgwKT8uY29udmVyc2F0aW9uSWQsXG4gICAgICAgIHBpbm5lZENvbnZlcnNhdGlvbnNbMF0uaWRcbiAgICAgICk7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoXG4gICAgICAgIGhlbHBlci5nZXRDb252ZXJzYXRpb25BbmRNZXNzYWdlQXRJbmRleCgxKT8uY29udmVyc2F0aW9uSWQsXG4gICAgICAgIHBpbm5lZENvbnZlcnNhdGlvbnNbMV0uaWRcbiAgICAgICk7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoXG4gICAgICAgIGhlbHBlci5nZXRDb252ZXJzYXRpb25BbmRNZXNzYWdlQXRJbmRleCgyKT8uY29udmVyc2F0aW9uSWQsXG4gICAgICAgIGNvbnZlcnNhdGlvbnNbMF0uaWRcbiAgICAgICk7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoXG4gICAgICAgIGhlbHBlci5nZXRDb252ZXJzYXRpb25BbmRNZXNzYWdlQXRJbmRleCgzKT8uY29udmVyc2F0aW9uSWQsXG4gICAgICAgIGNvbnZlcnNhdGlvbnNbMV0uaWRcbiAgICAgICk7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoXG4gICAgICAgIGhlbHBlci5nZXRDb252ZXJzYXRpb25BbmRNZXNzYWdlQXRJbmRleCg0KT8uY29udmVyc2F0aW9uSWQsXG4gICAgICAgIGNvbnZlcnNhdGlvbnNbMl0uaWRcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICBpdChcIndoZW4gcmVxdWVzdGluZyBhbiBpbmRleCBvdXQgb2YgYm91bmRzLCByZXR1cm5zIHRoZSBsYXN0IHBpbm5lZCBjb252ZXJzYXRpb24gd2hlbiB0aGF0J3MgYWxsIHRoZXJlIGlzXCIsICgpID0+IHtcbiAgICAgIGNvbnN0IHBpbm5lZENvbnZlcnNhdGlvbnMgPSBbXG4gICAgICAgIGdldERlZmF1bHRDb252ZXJzYXRpb24oKSxcbiAgICAgICAgZ2V0RGVmYXVsdENvbnZlcnNhdGlvbigpLFxuICAgICAgXTtcblxuICAgICAgY29uc3QgaGVscGVyID0gbmV3IExlZnRQYW5lSW5ib3hIZWxwZXIoe1xuICAgICAgICAuLi5kZWZhdWx0UHJvcHMsXG4gICAgICAgIHBpbm5lZENvbnZlcnNhdGlvbnMsXG4gICAgICB9KTtcblxuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgICBoZWxwZXIuZ2V0Q29udmVyc2F0aW9uQW5kTWVzc2FnZUF0SW5kZXgoMik/LmNvbnZlcnNhdGlvbklkLFxuICAgICAgICBwaW5uZWRDb252ZXJzYXRpb25zWzFdLmlkXG4gICAgICApO1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgICBoZWxwZXIuZ2V0Q29udmVyc2F0aW9uQW5kTWVzc2FnZUF0SW5kZXgoOTkpPy5jb252ZXJzYXRpb25JZCxcbiAgICAgICAgcGlubmVkQ29udmVyc2F0aW9uc1sxXS5pZFxuICAgICAgKTtcbiAgICAgIC8vIFRoaXMgaXMgbW9zdGx5IGEgcmVzaWxpZW5jZSBtZWFzdXJlIGluIGNhc2Ugd2UncmUgZXZlciBjYWxsZWQgd2l0aCBhbiBpbnZhbGlkXG4gICAgICAvLyAgIGluZGV4LlxuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgICBoZWxwZXIuZ2V0Q29udmVyc2F0aW9uQW5kTWVzc2FnZUF0SW5kZXgoLTEpPy5jb252ZXJzYXRpb25JZCxcbiAgICAgICAgcGlubmVkQ29udmVyc2F0aW9uc1sxXS5pZFxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIGl0KFwid2hlbiByZXF1ZXN0aW5nIGFuIGluZGV4IG91dCBvZiBib3VuZHMsIHJldHVybnMgdGhlIGxhc3Qgbm9uLXBpbm5lZCBjb252ZXJzYXRpb24gd2hlbiB0aGF0J3MgYWxsIHRoZXJlIGlzXCIsICgpID0+IHtcbiAgICAgIGNvbnN0IGNvbnZlcnNhdGlvbnMgPSBbXG4gICAgICAgIGdldERlZmF1bHRDb252ZXJzYXRpb24oKSxcbiAgICAgICAgZ2V0RGVmYXVsdENvbnZlcnNhdGlvbigpLFxuICAgICAgXTtcblxuICAgICAgY29uc3QgaGVscGVyID0gbmV3IExlZnRQYW5lSW5ib3hIZWxwZXIoe1xuICAgICAgICAuLi5kZWZhdWx0UHJvcHMsXG4gICAgICAgIGNvbnZlcnNhdGlvbnMsXG4gICAgICB9KTtcblxuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgICBoZWxwZXIuZ2V0Q29udmVyc2F0aW9uQW5kTWVzc2FnZUF0SW5kZXgoMik/LmNvbnZlcnNhdGlvbklkLFxuICAgICAgICBjb252ZXJzYXRpb25zWzFdLmlkXG4gICAgICApO1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgICBoZWxwZXIuZ2V0Q29udmVyc2F0aW9uQW5kTWVzc2FnZUF0SW5kZXgoOTkpPy5jb252ZXJzYXRpb25JZCxcbiAgICAgICAgY29udmVyc2F0aW9uc1sxXS5pZFxuICAgICAgKTtcbiAgICAgIC8vIFRoaXMgaXMgbW9zdGx5IGEgcmVzaWxpZW5jZSBtZWFzdXJlIGluIGNhc2Ugd2UncmUgZXZlciBjYWxsZWQgd2l0aCBhbiBpbnZhbGlkXG4gICAgICAvLyAgIGluZGV4LlxuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgICBoZWxwZXIuZ2V0Q29udmVyc2F0aW9uQW5kTWVzc2FnZUF0SW5kZXgoLTEpPy5jb252ZXJzYXRpb25JZCxcbiAgICAgICAgY29udmVyc2F0aW9uc1sxXS5pZFxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIGl0KCd3aGVuIHJlcXVlc3RpbmcgYW4gaW5kZXggb3V0IG9mIGJvdW5kcywgcmV0dXJucyB0aGUgbGFzdCBub24tcGlubmVkIGNvbnZlcnNhdGlvbiB3aGVuIHRoZXJlIGFyZSBib3RoIHBpbm5lZCBhbmQgbm9uLXBpbm5lZCBjb252ZXJzYXRpb25zJywgKCkgPT4ge1xuICAgICAgY29uc3QgY29udmVyc2F0aW9ucyA9IFtcbiAgICAgICAgZ2V0RGVmYXVsdENvbnZlcnNhdGlvbigpLFxuICAgICAgICBnZXREZWZhdWx0Q29udmVyc2F0aW9uKCksXG4gICAgICBdO1xuICAgICAgY29uc3QgcGlubmVkQ29udmVyc2F0aW9ucyA9IFtcbiAgICAgICAgZ2V0RGVmYXVsdENvbnZlcnNhdGlvbigpLFxuICAgICAgICBnZXREZWZhdWx0Q29udmVyc2F0aW9uKCksXG4gICAgICBdO1xuXG4gICAgICBjb25zdCBoZWxwZXIgPSBuZXcgTGVmdFBhbmVJbmJveEhlbHBlcih7XG4gICAgICAgIC4uLmRlZmF1bHRQcm9wcyxcbiAgICAgICAgY29udmVyc2F0aW9ucyxcbiAgICAgICAgcGlubmVkQ29udmVyc2F0aW9ucyxcbiAgICAgIH0pO1xuXG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoXG4gICAgICAgIGhlbHBlci5nZXRDb252ZXJzYXRpb25BbmRNZXNzYWdlQXRJbmRleCg0KT8uY29udmVyc2F0aW9uSWQsXG4gICAgICAgIGNvbnZlcnNhdGlvbnNbMV0uaWRcbiAgICAgICk7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoXG4gICAgICAgIGhlbHBlci5nZXRDb252ZXJzYXRpb25BbmRNZXNzYWdlQXRJbmRleCg5OSk/LmNvbnZlcnNhdGlvbklkLFxuICAgICAgICBjb252ZXJzYXRpb25zWzFdLmlkXG4gICAgICApO1xuICAgICAgLy8gVGhpcyBpcyBtb3N0bHkgYSByZXNpbGllbmNlIG1lYXN1cmUgaW4gY2FzZSB3ZSdyZSBldmVyIGNhbGxlZCB3aXRoIGFuIGludmFsaWRcbiAgICAgIC8vICAgaW5kZXguXG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoXG4gICAgICAgIGhlbHBlci5nZXRDb252ZXJzYXRpb25BbmRNZXNzYWdlQXRJbmRleCgtMSk/LmNvbnZlcnNhdGlvbklkLFxuICAgICAgICBjb252ZXJzYXRpb25zWzFdLmlkXG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgdW5kZWZpbmVkIGlmIHRoZXJlIGFyZSBubyBjb252ZXJzYXRpb25zJywgKCkgPT4ge1xuICAgICAgY29uc3QgaGVscGVyID0gbmV3IExlZnRQYW5lSW5ib3hIZWxwZXIoe1xuICAgICAgICAuLi5kZWZhdWx0UHJvcHMsXG4gICAgICAgIGFyY2hpdmVkQ29udmVyc2F0aW9uczogW2dldERlZmF1bHRDb252ZXJzYXRpb24oKV0sXG4gICAgICB9KTtcblxuICAgICAgYXNzZXJ0LmlzVW5kZWZpbmVkKGhlbHBlci5nZXRDb252ZXJzYXRpb25BbmRNZXNzYWdlQXRJbmRleCgwKSk7XG4gICAgICBhc3NlcnQuaXNVbmRlZmluZWQoaGVscGVyLmdldENvbnZlcnNhdGlvbkFuZE1lc3NhZ2VBdEluZGV4KDEpKTtcbiAgICAgIGFzc2VydC5pc1VuZGVmaW5lZChoZWxwZXIuZ2V0Q29udmVyc2F0aW9uQW5kTWVzc2FnZUF0SW5kZXgoLTEpKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ2dldENvbnZlcnNhdGlvbkFuZE1lc3NhZ2VJbkRpcmVjdGlvbicsICgpID0+IHtcbiAgICBpdCgncmV0dXJucyB0aGUgbmV4dCBjb252ZXJzYXRpb24gd2hlbiBzZWFyY2hpbmcgZG93bndhcmQnLCAoKSA9PiB7XG4gICAgICBjb25zdCBwaW5uZWRDb252ZXJzYXRpb25zID0gW1xuICAgICAgICBnZXREZWZhdWx0Q29udmVyc2F0aW9uKCksXG4gICAgICAgIGdldERlZmF1bHRDb252ZXJzYXRpb24oKSxcbiAgICAgIF07XG4gICAgICBjb25zdCBjb252ZXJzYXRpb25zID0gW2dldERlZmF1bHRDb252ZXJzYXRpb24oKV07XG4gICAgICBjb25zdCBoZWxwZXIgPSBuZXcgTGVmdFBhbmVJbmJveEhlbHBlcih7XG4gICAgICAgIC4uLmRlZmF1bHRQcm9wcyxcbiAgICAgICAgY29udmVyc2F0aW9ucyxcbiAgICAgICAgcGlubmVkQ29udmVyc2F0aW9ucyxcbiAgICAgIH0pO1xuXG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKFxuICAgICAgICBoZWxwZXIuZ2V0Q29udmVyc2F0aW9uQW5kTWVzc2FnZUluRGlyZWN0aW9uKFxuICAgICAgICAgIHsgZGlyZWN0aW9uOiBGaW5kRGlyZWN0aW9uLkRvd24sIHVucmVhZE9ubHk6IGZhbHNlIH0sXG4gICAgICAgICAgcGlubmVkQ29udmVyc2F0aW9uc1sxXS5pZCxcbiAgICAgICAgICB1bmRlZmluZWRcbiAgICAgICAgKSxcbiAgICAgICAgeyBjb252ZXJzYXRpb25JZDogY29udmVyc2F0aW9uc1swXS5pZCB9XG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgLy8gQWRkaXRpb25hbCB0ZXN0cyBhcmUgZm91bmQgd2l0aCBgZ2V0Q29udmVyc2F0aW9uSW5EaXJlY3Rpb25gLlxuICB9KTtcblxuICBkZXNjcmliZSgncmVxdWlyZXNGdWxsV2lkdGgnLCAoKSA9PiB7XG4gICAgaXQoXCJyZXR1cm5zIGZhbHNlIGlmIHdlJ3JlIG5vdCBhYm91dCB0byBzZWFyY2ggaW4gYSBjb252ZXJzYXRpb24gYW5kIHRoZXJlJ3MgYXQgbGVhc3Qgb25lXCIsICgpID0+IHtcbiAgICAgIGNvbnN0IGhlbHBlciA9IG5ldyBMZWZ0UGFuZUluYm94SGVscGVyKHtcbiAgICAgICAgLi4uZGVmYXVsdFByb3BzLFxuICAgICAgICBjb252ZXJzYXRpb25zOiBbZ2V0RGVmYXVsdENvbnZlcnNhdGlvbigpXSxcbiAgICAgIH0pO1xuXG4gICAgICBhc3NlcnQuaXNGYWxzZShoZWxwZXIucmVxdWlyZXNGdWxsV2lkdGgoKSk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyB0cnVlIGlmIHRoZXJlIGFyZSBubyBjb252ZXJzYXRpb25zJywgKCkgPT4ge1xuICAgICAgY29uc3QgaGVscGVyID0gbmV3IExlZnRQYW5lSW5ib3hIZWxwZXIoZGVmYXVsdFByb3BzKTtcblxuICAgICAgYXNzZXJ0LmlzVHJ1ZShoZWxwZXIucmVxdWlyZXNGdWxsV2lkdGgoKSk7XG4gICAgfSk7XG5cbiAgICBpdChcInJldHVybnMgdHJ1ZSBpZiB3ZSdyZSBhYm91dCB0byBzZWFyY2hcIiwgKCkgPT4ge1xuICAgICAgY29uc3QgaGVscGVyID0gbmV3IExlZnRQYW5lSW5ib3hIZWxwZXIoe1xuICAgICAgICAuLi5kZWZhdWx0UHJvcHMsXG4gICAgICAgIHN0YXJ0U2VhcmNoQ291bnRlcjogMSxcbiAgICAgIH0pO1xuXG4gICAgICBhc3NlcnQuaXNUcnVlKGhlbHBlci5yZXF1aXJlc0Z1bGxXaWR0aCgpKTtcbiAgICB9KTtcblxuICAgIGl0KFwicmV0dXJucyB0cnVlIGlmIHdlJ3JlIGFib3V0IHRvIHNlYXJjaCBpbiBhIGNvbnZlcnNhdGlvblwiLCAoKSA9PiB7XG4gICAgICBjb25zdCBoZWxwZXIgPSBuZXcgTGVmdFBhbmVJbmJveEhlbHBlcih7XG4gICAgICAgIC4uLmRlZmF1bHRQcm9wcyxcbiAgICAgICAgaXNBYm91dFRvU2VhcmNoSW5BQ29udmVyc2F0aW9uOiB0cnVlLFxuICAgICAgfSk7XG5cbiAgICAgIGFzc2VydC5pc1RydWUoaGVscGVyLnJlcXVpcmVzRnVsbFdpZHRoKCkpO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnc2hvdWxkUmVjb21wdXRlUm93SGVpZ2h0cycsICgpID0+IHtcbiAgICBpdChcInJldHVybnMgZmFsc2UgaWYgdGhlIG51bWJlciBvZiBjb252ZXJzYXRpb25zIGluIGVhY2ggc2VjdGlvbiBkb2Vzbid0IGNoYW5nZVwiLCAoKSA9PiB7XG4gICAgICBjb25zdCBoZWxwZXIgPSBuZXcgTGVmdFBhbmVJbmJveEhlbHBlcih7XG4gICAgICAgIC4uLmRlZmF1bHRQcm9wcyxcbiAgICAgICAgY29udmVyc2F0aW9uczogW1xuICAgICAgICAgIGdldERlZmF1bHRDb252ZXJzYXRpb24oKSxcbiAgICAgICAgICBnZXREZWZhdWx0Q29udmVyc2F0aW9uKCksXG4gICAgICAgICAgZ2V0RGVmYXVsdENvbnZlcnNhdGlvbigpLFxuICAgICAgICBdLFxuICAgICAgICBwaW5uZWRDb252ZXJzYXRpb25zOiBbXG4gICAgICAgICAgZ2V0RGVmYXVsdENvbnZlcnNhdGlvbigpLFxuICAgICAgICAgIGdldERlZmF1bHRDb252ZXJzYXRpb24oKSxcbiAgICAgICAgXSxcbiAgICAgICAgYXJjaGl2ZWRDb252ZXJzYXRpb25zOiBbZ2V0RGVmYXVsdENvbnZlcnNhdGlvbigpXSxcbiAgICAgIH0pO1xuXG4gICAgICBhc3NlcnQuaXNGYWxzZShcbiAgICAgICAgaGVscGVyLnNob3VsZFJlY29tcHV0ZVJvd0hlaWdodHMoe1xuICAgICAgICAgIC4uLmRlZmF1bHRQcm9wcyxcbiAgICAgICAgICBjb252ZXJzYXRpb25zOiBbXG4gICAgICAgICAgICBnZXREZWZhdWx0Q29udmVyc2F0aW9uKCksXG4gICAgICAgICAgICBnZXREZWZhdWx0Q29udmVyc2F0aW9uKCksXG4gICAgICAgICAgICBnZXREZWZhdWx0Q29udmVyc2F0aW9uKCksXG4gICAgICAgICAgXSxcbiAgICAgICAgICBwaW5uZWRDb252ZXJzYXRpb25zOiBbXG4gICAgICAgICAgICBnZXREZWZhdWx0Q29udmVyc2F0aW9uKCksXG4gICAgICAgICAgICBnZXREZWZhdWx0Q29udmVyc2F0aW9uKCksXG4gICAgICAgICAgXSxcbiAgICAgICAgICBhcmNoaXZlZENvbnZlcnNhdGlvbnM6IFtcbiAgICAgICAgICAgIGdldERlZmF1bHRDb252ZXJzYXRpb24oKSxcbiAgICAgICAgICAgIGdldERlZmF1bHRDb252ZXJzYXRpb24oKSxcbiAgICAgICAgICBdLFxuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIGZhbHNlIGlmIHRoZSBvbmx5IHRoaW5nIGNoYW5nZWQgaXMgd2hldGhlciBjb252ZXJzYXRpb25zIGFyZSBhcmNoaXZlZCcsICgpID0+IHtcbiAgICAgIGNvbnN0IGhlbHBlciA9IG5ldyBMZWZ0UGFuZUluYm94SGVscGVyKHtcbiAgICAgICAgLi4uZGVmYXVsdFByb3BzLFxuICAgICAgICBjb252ZXJzYXRpb25zOiBbXG4gICAgICAgICAgZ2V0RGVmYXVsdENvbnZlcnNhdGlvbigpLFxuICAgICAgICAgIGdldERlZmF1bHRDb252ZXJzYXRpb24oKSxcbiAgICAgICAgICBnZXREZWZhdWx0Q29udmVyc2F0aW9uKCksXG4gICAgICAgIF0sXG4gICAgICAgIHBpbm5lZENvbnZlcnNhdGlvbnM6IFtcbiAgICAgICAgICBnZXREZWZhdWx0Q29udmVyc2F0aW9uKCksXG4gICAgICAgICAgZ2V0RGVmYXVsdENvbnZlcnNhdGlvbigpLFxuICAgICAgICBdLFxuICAgICAgICBhcmNoaXZlZENvbnZlcnNhdGlvbnM6IFtnZXREZWZhdWx0Q29udmVyc2F0aW9uKCldLFxuICAgICAgfSk7XG5cbiAgICAgIGFzc2VydC5pc0ZhbHNlKFxuICAgICAgICBoZWxwZXIuc2hvdWxkUmVjb21wdXRlUm93SGVpZ2h0cyh7XG4gICAgICAgICAgLi4uZGVmYXVsdFByb3BzLFxuICAgICAgICAgIGNvbnZlcnNhdGlvbnM6IFtcbiAgICAgICAgICAgIGdldERlZmF1bHRDb252ZXJzYXRpb24oKSxcbiAgICAgICAgICAgIGdldERlZmF1bHRDb252ZXJzYXRpb24oKSxcbiAgICAgICAgICAgIGdldERlZmF1bHRDb252ZXJzYXRpb24oKSxcbiAgICAgICAgICBdLFxuICAgICAgICAgIHBpbm5lZENvbnZlcnNhdGlvbnM6IFtcbiAgICAgICAgICAgIGdldERlZmF1bHRDb252ZXJzYXRpb24oKSxcbiAgICAgICAgICAgIGdldERlZmF1bHRDb252ZXJzYXRpb24oKSxcbiAgICAgICAgICBdLFxuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIGZhbHNlIGlmIHRoZSBvbmx5IHRoaW5nIGNoYW5nZWQgaXMgdGhlIG51bWJlciBvZiBub24tcGlubmVkIGNvbnZlcnNhdGlvbnMnLCAoKSA9PiB7XG4gICAgICBjb25zdCBoZWxwZXIgPSBuZXcgTGVmdFBhbmVJbmJveEhlbHBlcih7XG4gICAgICAgIC4uLmRlZmF1bHRQcm9wcyxcbiAgICAgICAgY29udmVyc2F0aW9uczogW1xuICAgICAgICAgIGdldERlZmF1bHRDb252ZXJzYXRpb24oKSxcbiAgICAgICAgICBnZXREZWZhdWx0Q29udmVyc2F0aW9uKCksXG4gICAgICAgICAgZ2V0RGVmYXVsdENvbnZlcnNhdGlvbigpLFxuICAgICAgICBdLFxuICAgICAgICBwaW5uZWRDb252ZXJzYXRpb25zOiBbXG4gICAgICAgICAgZ2V0RGVmYXVsdENvbnZlcnNhdGlvbigpLFxuICAgICAgICAgIGdldERlZmF1bHRDb252ZXJzYXRpb24oKSxcbiAgICAgICAgXSxcbiAgICAgICAgYXJjaGl2ZWRDb252ZXJzYXRpb25zOiBbZ2V0RGVmYXVsdENvbnZlcnNhdGlvbigpXSxcbiAgICAgIH0pO1xuXG4gICAgICBhc3NlcnQuaXNGYWxzZShcbiAgICAgICAgaGVscGVyLnNob3VsZFJlY29tcHV0ZVJvd0hlaWdodHMoe1xuICAgICAgICAgIC4uLmRlZmF1bHRQcm9wcyxcbiAgICAgICAgICBjb252ZXJzYXRpb25zOiBbZ2V0RGVmYXVsdENvbnZlcnNhdGlvbigpXSxcbiAgICAgICAgICBwaW5uZWRDb252ZXJzYXRpb25zOiBbXG4gICAgICAgICAgICBnZXREZWZhdWx0Q29udmVyc2F0aW9uKCksXG4gICAgICAgICAgICBnZXREZWZhdWx0Q29udmVyc2F0aW9uKCksXG4gICAgICAgICAgXSxcbiAgICAgICAgICBhcmNoaXZlZENvbnZlcnNhdGlvbnM6IFtcbiAgICAgICAgICAgIGdldERlZmF1bHRDb252ZXJzYXRpb24oKSxcbiAgICAgICAgICAgIGdldERlZmF1bHRDb252ZXJzYXRpb24oKSxcbiAgICAgICAgICBdLFxuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIHRydWUgaWYgdGhlIG51bWJlciBvZiBwaW5uZWQgY29udmVyc2F0aW9ucyBjaGFuZ2VzJywgKCkgPT4ge1xuICAgICAgY29uc3QgaGVscGVyID0gbmV3IExlZnRQYW5lSW5ib3hIZWxwZXIoe1xuICAgICAgICAuLi5kZWZhdWx0UHJvcHMsXG4gICAgICAgIGNvbnZlcnNhdGlvbnM6IFtnZXREZWZhdWx0Q29udmVyc2F0aW9uKCldLFxuICAgICAgICBwaW5uZWRDb252ZXJzYXRpb25zOiBbXG4gICAgICAgICAgZ2V0RGVmYXVsdENvbnZlcnNhdGlvbigpLFxuICAgICAgICAgIGdldERlZmF1bHRDb252ZXJzYXRpb24oKSxcbiAgICAgICAgXSxcbiAgICAgICAgYXJjaGl2ZWRDb252ZXJzYXRpb25zOiBbZ2V0RGVmYXVsdENvbnZlcnNhdGlvbigpXSxcbiAgICAgIH0pO1xuXG4gICAgICBhc3NlcnQuaXNUcnVlKFxuICAgICAgICBoZWxwZXIuc2hvdWxkUmVjb21wdXRlUm93SGVpZ2h0cyh7XG4gICAgICAgICAgLi4uZGVmYXVsdFByb3BzLFxuICAgICAgICAgIGNvbnZlcnNhdGlvbnM6IFtnZXREZWZhdWx0Q29udmVyc2F0aW9uKCldLFxuICAgICAgICAgIHBpbm5lZENvbnZlcnNhdGlvbnM6IFtcbiAgICAgICAgICAgIGdldERlZmF1bHRDb252ZXJzYXRpb24oKSxcbiAgICAgICAgICAgIGdldERlZmF1bHRDb252ZXJzYXRpb24oKSxcbiAgICAgICAgICAgIGdldERlZmF1bHRDb252ZXJzYXRpb24oKSxcbiAgICAgICAgICBdLFxuICAgICAgICAgIGFyY2hpdmVkQ29udmVyc2F0aW9uczogW2dldERlZmF1bHRDb252ZXJzYXRpb24oKV0sXG4gICAgICAgIH0pXG4gICAgICApO1xuICAgICAgYXNzZXJ0LmlzVHJ1ZShcbiAgICAgICAgaGVscGVyLnNob3VsZFJlY29tcHV0ZVJvd0hlaWdodHMoe1xuICAgICAgICAgIC4uLmRlZmF1bHRQcm9wcyxcbiAgICAgICAgICBjb252ZXJzYXRpb25zOiBbZ2V0RGVmYXVsdENvbnZlcnNhdGlvbigpXSxcbiAgICAgICAgICBwaW5uZWRDb252ZXJzYXRpb25zOiBbZ2V0RGVmYXVsdENvbnZlcnNhdGlvbigpXSxcbiAgICAgICAgICBhcmNoaXZlZENvbnZlcnNhdGlvbnM6IFtnZXREZWZhdWx0Q29udmVyc2F0aW9uKCldLFxuICAgICAgICB9KVxuICAgICAgKTtcbiAgICAgIGFzc2VydC5pc1RydWUoXG4gICAgICAgIGhlbHBlci5zaG91bGRSZWNvbXB1dGVSb3dIZWlnaHRzKHtcbiAgICAgICAgICAuLi5kZWZhdWx0UHJvcHMsXG4gICAgICAgICAgY29udmVyc2F0aW9uczogW2dldERlZmF1bHRDb252ZXJzYXRpb24oKV0sXG4gICAgICAgICAgcGlubmVkQ29udmVyc2F0aW9uczogW10sXG4gICAgICAgICAgYXJjaGl2ZWRDb252ZXJzYXRpb25zOiBbZ2V0RGVmYXVsdENvbnZlcnNhdGlvbigpXSxcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfSk7XG4gIH0pO1xufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7QUFHQSxrQkFBdUI7QUFDdkIsWUFBdUI7QUFDdkIsOEJBQXdCO0FBQ3hCLDRCQUE4QjtBQUM5QixvQ0FBdUM7QUFHdkMsaUNBQW9DO0FBRXBDLFNBQVMsdUJBQXVCLE1BQU07QUFDcEMsUUFBTSxlQUF1QztBQUFBLElBQzNDLHVCQUF1QixDQUFDO0FBQUEsSUFDeEIsZUFBZSxDQUFDO0FBQUEsSUFDaEIsZ0NBQWdDO0FBQUEsSUFDaEMscUJBQXFCLENBQUM7QUFBQSxJQUN0QixvQkFBb0I7QUFBQSxJQUNwQixnQkFBZ0I7QUFBQSxJQUNoQixZQUFZO0FBQUEsSUFDWixvQkFBb0I7QUFBQSxFQUN0QjtBQUVBLFdBQVMsaUJBQWlCLE1BQU07QUFDOUIsT0FBRyw0REFBNEQsTUFBTTtBQUNuRSxZQUFNLFNBQVMsSUFBSSwrQ0FBb0IsWUFBWTtBQUVuRCx5QkFBTyxZQUNMLE9BQU8sY0FBYztBQUFBLFFBQ25CLHdCQUF3QixNQUFNLEtBQUs7QUFBQSxRQUNuQyxXQUFXLE1BQU0sS0FBSztBQUFBLFFBQ3RCLGdCQUFnQixNQUFNLEtBQUs7QUFBQSxNQUM3QixDQUFDLENBQ0g7QUFBQSxJQUNGLENBQUM7QUFBQSxFQUNILENBQUM7QUFFRCxXQUFTLGVBQWUsTUFBTTtBQUM1QixPQUFHLDJDQUEyQyxNQUFNO0FBQ2xELFlBQU0sU0FBUyxJQUFJLCtDQUFvQixZQUFZO0FBRW5ELHlCQUFPLFlBQVksT0FBTyxZQUFZLEdBQUcsQ0FBQztBQUFBLElBQzVDLENBQUM7QUFFRCxPQUFHLHNEQUFzRCxNQUFNO0FBQzdELFlBQU0sU0FBUyxJQUFJLCtDQUFvQjtBQUFBLFdBQ2xDO0FBQUEsUUFDSCx1QkFBdUIsQ0FBQywwREFBdUIsQ0FBQztBQUFBLE1BQ2xE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
