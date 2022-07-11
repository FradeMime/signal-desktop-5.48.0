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
var import_LeftPaneComposeHelper = require("../../../components/leftPane/LeftPaneComposeHelper");
describe("LeftPaneComposeHelper", () => {
  let sinonSandbox;
  beforeEach(() => {
    sinonSandbox = sinon.createSandbox();
  });
  afterEach(() => {
    sinonSandbox.restore();
  });
  describe("getBackAction", () => {
    it('returns the "show inbox" action', () => {
      const showInbox = sinon.fake();
      const helper = new import_LeftPaneComposeHelper.LeftPaneComposeHelper({
        composeContacts: [],
        composeGroups: [],
        regionCode: "US",
        searchTerm: "",
        isUsernamesEnabled: true,
        uuidFetchState: {}
      });
      import_chai.assert.strictEqual(helper.getBackAction({ showInbox }), showInbox);
    });
  });
  describe("getRowCount", () => {
    it('returns 1 (for the "new group" button) if not searching and there are no contacts', () => {
      import_chai.assert.strictEqual(new import_LeftPaneComposeHelper.LeftPaneComposeHelper({
        composeContacts: [],
        composeGroups: [],
        regionCode: "US",
        searchTerm: "",
        isUsernamesEnabled: true,
        uuidFetchState: {}
      }).getRowCount(), 1);
    });
    it('returns the number of contacts + 2 (for the "new group" button and header) if not searching', () => {
      import_chai.assert.strictEqual(new import_LeftPaneComposeHelper.LeftPaneComposeHelper({
        composeContacts: [(0, import_getDefaultConversation.getDefaultConversation)(), (0, import_getDefaultConversation.getDefaultConversation)()],
        composeGroups: [],
        regionCode: "US",
        searchTerm: "",
        isUsernamesEnabled: true,
        uuidFetchState: {}
      }).getRowCount(), 4);
    });
    it('returns the number of contacts + number of groups + 3 (for the "new group" button and the headers) if not searching', () => {
      import_chai.assert.strictEqual(new import_LeftPaneComposeHelper.LeftPaneComposeHelper({
        composeContacts: [(0, import_getDefaultConversation.getDefaultConversation)(), (0, import_getDefaultConversation.getDefaultConversation)()],
        composeGroups: [(0, import_getDefaultConversation.getDefaultConversation)(), (0, import_getDefaultConversation.getDefaultConversation)()],
        regionCode: "US",
        searchTerm: "",
        isUsernamesEnabled: true,
        uuidFetchState: {}
      }).getRowCount(), 7);
    });
    it("returns the number of contacts, number groups + 4 (for headers and username)", () => {
      import_chai.assert.strictEqual(new import_LeftPaneComposeHelper.LeftPaneComposeHelper({
        composeContacts: [(0, import_getDefaultConversation.getDefaultConversation)(), (0, import_getDefaultConversation.getDefaultConversation)()],
        composeGroups: [(0, import_getDefaultConversation.getDefaultConversation)(), (0, import_getDefaultConversation.getDefaultConversation)()],
        regionCode: "US",
        searchTerm: "someone",
        isUsernamesEnabled: true,
        uuidFetchState: {}
      }).getRowCount(), 8);
    });
    it("if usernames are disabled, two less rows are shown", () => {
      import_chai.assert.strictEqual(new import_LeftPaneComposeHelper.LeftPaneComposeHelper({
        composeContacts: [(0, import_getDefaultConversation.getDefaultConversation)(), (0, import_getDefaultConversation.getDefaultConversation)()],
        composeGroups: [(0, import_getDefaultConversation.getDefaultConversation)(), (0, import_getDefaultConversation.getDefaultConversation)()],
        regionCode: "US",
        searchTerm: "someone",
        isUsernamesEnabled: false,
        uuidFetchState: {}
      }).getRowCount(), 6);
    });
    it("returns the number of conversations + the headers, but not for a phone number", () => {
      import_chai.assert.strictEqual(new import_LeftPaneComposeHelper.LeftPaneComposeHelper({
        composeContacts: [],
        composeGroups: [],
        regionCode: "US",
        searchTerm: "foo bar",
        isUsernamesEnabled: true,
        uuidFetchState: {}
      }).getRowCount(), 2);
      import_chai.assert.strictEqual(new import_LeftPaneComposeHelper.LeftPaneComposeHelper({
        composeContacts: [(0, import_getDefaultConversation.getDefaultConversation)(), (0, import_getDefaultConversation.getDefaultConversation)()],
        composeGroups: [],
        regionCode: "US",
        searchTerm: "foo bar",
        isUsernamesEnabled: true,
        uuidFetchState: {}
      }).getRowCount(), 5);
      import_chai.assert.strictEqual(new import_LeftPaneComposeHelper.LeftPaneComposeHelper({
        composeContacts: [(0, import_getDefaultConversation.getDefaultConversation)(), (0, import_getDefaultConversation.getDefaultConversation)()],
        composeGroups: [(0, import_getDefaultConversation.getDefaultConversation)()],
        regionCode: "US",
        searchTerm: "foo bar",
        isUsernamesEnabled: true,
        uuidFetchState: {}
      }).getRowCount(), 7);
    });
    it('returns 2 (for the "Start new conversation" button) if searching for a phone number with no contacts', () => {
      import_chai.assert.strictEqual(new import_LeftPaneComposeHelper.LeftPaneComposeHelper({
        composeContacts: [],
        composeGroups: [],
        regionCode: "US",
        searchTerm: "+16505551234",
        isUsernamesEnabled: true,
        uuidFetchState: {}
      }).getRowCount(), 2);
    });
    it("returns 2 if just username in results", () => {
      import_chai.assert.strictEqual(new import_LeftPaneComposeHelper.LeftPaneComposeHelper({
        composeContacts: [],
        composeGroups: [],
        regionCode: "US",
        searchTerm: "someone",
        isUsernamesEnabled: true,
        uuidFetchState: {}
      }).getRowCount(), 2);
    });
    it('returns the number of contacts + 2 (for the "Start new conversation" button and header) if searching for a phone number', () => {
      import_chai.assert.strictEqual(new import_LeftPaneComposeHelper.LeftPaneComposeHelper({
        composeContacts: [(0, import_getDefaultConversation.getDefaultConversation)(), (0, import_getDefaultConversation.getDefaultConversation)()],
        composeGroups: [],
        regionCode: "US",
        searchTerm: "+16505551234",
        isUsernamesEnabled: true,
        uuidFetchState: {}
      }).getRowCount(), 5);
    });
  });
  describe("getRow", () => {
    it('returns a "new group" button if not searching and there are no contacts', () => {
      const helper = new import_LeftPaneComposeHelper.LeftPaneComposeHelper({
        composeContacts: [],
        composeGroups: [],
        regionCode: "US",
        searchTerm: "",
        isUsernamesEnabled: true,
        uuidFetchState: {}
      });
      import_chai.assert.deepEqual(helper.getRow(0), {
        type: import_ConversationList.RowType.CreateNewGroup
      });
      import_chai.assert.isUndefined(helper.getRow(1));
    });
    it('returns a "new group" button, a header, and contacts if not searching', () => {
      const composeContacts = [
        (0, import_getDefaultConversation.getDefaultConversation)(),
        (0, import_getDefaultConversation.getDefaultConversation)()
      ];
      const helper = new import_LeftPaneComposeHelper.LeftPaneComposeHelper({
        composeContacts,
        composeGroups: [],
        regionCode: "US",
        searchTerm: "",
        isUsernamesEnabled: true,
        uuidFetchState: {}
      });
      import_chai.assert.deepEqual(helper.getRow(0), {
        type: import_ConversationList.RowType.CreateNewGroup
      });
      import_chai.assert.deepEqual(helper.getRow(1), {
        type: import_ConversationList.RowType.Header,
        i18nKey: "contactsHeader"
      });
      import_chai.assert.deepEqual(helper.getRow(2), {
        type: import_ConversationList.RowType.Contact,
        contact: composeContacts[0]
      });
      import_chai.assert.deepEqual(helper.getRow(3), {
        type: import_ConversationList.RowType.Contact,
        contact: composeContacts[1]
      });
    });
    it('returns a "new group" button, a header, contacts, groups header, and groups -- if not searching', () => {
      const composeContacts = [
        (0, import_getDefaultConversation.getDefaultConversation)(),
        (0, import_getDefaultConversation.getDefaultConversation)()
      ];
      const composeGroups = [
        (0, import_getDefaultConversation.getDefaultConversation)(),
        (0, import_getDefaultConversation.getDefaultConversation)()
      ];
      const helper = new import_LeftPaneComposeHelper.LeftPaneComposeHelper({
        composeContacts,
        composeGroups,
        regionCode: "US",
        searchTerm: "",
        isUsernamesEnabled: true,
        uuidFetchState: {}
      });
      import_chai.assert.deepEqual(helper.getRow(0), {
        type: import_ConversationList.RowType.CreateNewGroup
      });
      import_chai.assert.deepEqual(helper.getRow(1), {
        type: import_ConversationList.RowType.Header,
        i18nKey: "contactsHeader"
      });
      import_chai.assert.deepEqual(helper.getRow(2), {
        type: import_ConversationList.RowType.Contact,
        contact: composeContacts[0]
      });
      import_chai.assert.deepEqual(helper.getRow(3), {
        type: import_ConversationList.RowType.Contact,
        contact: composeContacts[1]
      });
      import_chai.assert.deepEqual(helper.getRow(4), {
        type: import_ConversationList.RowType.Header,
        i18nKey: "groupsHeader"
      });
      import_chai.assert.deepEqual(helper.getRow(5), {
        type: import_ConversationList.RowType.Conversation,
        conversation: composeGroups[0]
      });
      import_chai.assert.deepEqual(helper.getRow(6), {
        type: import_ConversationList.RowType.Conversation,
        conversation: composeGroups[1]
      });
    });
    it("returns no rows if searching, no results, and usernames are disabled", () => {
      const helper = new import_LeftPaneComposeHelper.LeftPaneComposeHelper({
        composeContacts: [],
        composeGroups: [],
        regionCode: "US",
        searchTerm: "foo bar",
        isUsernamesEnabled: false,
        uuidFetchState: {}
      });
      import_chai.assert.isUndefined(helper.getRow(0));
      import_chai.assert.isUndefined(helper.getRow(1));
    });
    it("returns one row per contact if searching", () => {
      const composeContacts = [
        (0, import_getDefaultConversation.getDefaultConversation)(),
        (0, import_getDefaultConversation.getDefaultConversation)()
      ];
      const helper = new import_LeftPaneComposeHelper.LeftPaneComposeHelper({
        composeContacts,
        composeGroups: [],
        regionCode: "US",
        searchTerm: "foo bar",
        isUsernamesEnabled: true,
        uuidFetchState: {}
      });
      import_chai.assert.deepEqual(helper.getRow(1), {
        type: import_ConversationList.RowType.Contact,
        contact: composeContacts[0]
      });
      import_chai.assert.deepEqual(helper.getRow(2), {
        type: import_ConversationList.RowType.Contact,
        contact: composeContacts[1]
      });
    });
    it('returns a "start new conversation" row if searching for a phone number and there are no results', () => {
      const helper = new import_LeftPaneComposeHelper.LeftPaneComposeHelper({
        composeContacts: [],
        composeGroups: [],
        regionCode: "US",
        searchTerm: "+1(650) 555 12 34",
        isUsernamesEnabled: true,
        uuidFetchState: {}
      });
      import_chai.assert.deepEqual(helper.getRow(0), {
        type: import_ConversationList.RowType.Header,
        i18nKey: "findByPhoneNumberHeader"
      });
      import_chai.assert.deepEqual(helper.getRow(1), {
        type: import_ConversationList.RowType.StartNewConversation,
        phoneNumber: {
          isValid: true,
          userInput: "+1(650) 555 12 34",
          e164: "+16505551234"
        },
        isFetching: false
      });
      import_chai.assert.isUndefined(helper.getRow(2));
    });
    it('returns just a "find by username" header if no results', () => {
      const username = "someone";
      const helper = new import_LeftPaneComposeHelper.LeftPaneComposeHelper({
        composeContacts: [],
        composeGroups: [],
        regionCode: "US",
        searchTerm: username,
        isUsernamesEnabled: true,
        uuidFetchState: {
          [`username:${username}`]: true
        }
      });
      import_chai.assert.deepEqual(helper.getRow(0), {
        type: import_ConversationList.RowType.Header,
        i18nKey: "findByUsernameHeader"
      });
      import_chai.assert.deepEqual(helper.getRow(1), {
        type: import_ConversationList.RowType.UsernameSearchResult,
        username,
        isFetchingUsername: true
      });
      import_chai.assert.isUndefined(helper.getRow(2));
    });
    it('returns a "start new conversation" row, a header, and contacts if searching for a phone number', () => {
      const composeContacts = [
        (0, import_getDefaultConversation.getDefaultConversation)(),
        (0, import_getDefaultConversation.getDefaultConversation)()
      ];
      const helper = new import_LeftPaneComposeHelper.LeftPaneComposeHelper({
        composeContacts,
        composeGroups: [],
        regionCode: "US",
        searchTerm: "+1(650) 555 12 34",
        isUsernamesEnabled: true,
        uuidFetchState: {}
      });
      import_chai.assert.deepEqual(helper.getRow(0), {
        type: import_ConversationList.RowType.Header,
        i18nKey: "contactsHeader"
      });
      import_chai.assert.deepEqual(helper.getRow(1), {
        type: import_ConversationList.RowType.Contact,
        contact: composeContacts[0]
      });
      import_chai.assert.deepEqual(helper.getRow(2), {
        type: import_ConversationList.RowType.Contact,
        contact: composeContacts[1]
      });
      import_chai.assert.deepEqual(helper.getRow(3), {
        type: import_ConversationList.RowType.Header,
        i18nKey: "findByPhoneNumberHeader"
      });
      import_chai.assert.deepEqual(helper.getRow(4), {
        type: import_ConversationList.RowType.StartNewConversation,
        phoneNumber: {
          isValid: true,
          userInput: "+1(650) 555 12 34",
          e164: "+16505551234"
        },
        isFetching: false
      });
    });
  });
  describe("getConversationAndMessageAtIndex", () => {
    it("returns undefined because keyboard shortcuts are not supported", () => {
      const helper = new import_LeftPaneComposeHelper.LeftPaneComposeHelper({
        composeContacts: [(0, import_getDefaultConversation.getDefaultConversation)(), (0, import_getDefaultConversation.getDefaultConversation)()],
        composeGroups: [],
        regionCode: "US",
        searchTerm: "foo bar",
        isUsernamesEnabled: true,
        uuidFetchState: {}
      });
      import_chai.assert.isUndefined(helper.getConversationAndMessageAtIndex(0));
    });
  });
  describe("getConversationAndMessageInDirection", () => {
    it("returns undefined because keyboard shortcuts are not supported", () => {
      const helper = new import_LeftPaneComposeHelper.LeftPaneComposeHelper({
        composeContacts: [(0, import_getDefaultConversation.getDefaultConversation)(), (0, import_getDefaultConversation.getDefaultConversation)()],
        composeGroups: [],
        regionCode: "US",
        searchTerm: "foo bar",
        isUsernamesEnabled: true,
        uuidFetchState: {}
      });
      import_chai.assert.isUndefined(helper.getConversationAndMessageInDirection({ direction: import_LeftPaneHelper.FindDirection.Down, unreadOnly: false }, void 0, void 0));
    });
  });
  describe("shouldRecomputeRowHeights", () => {
    it('returns false if just search changes, so "Find by username" header is in same position', () => {
      const helper = new import_LeftPaneComposeHelper.LeftPaneComposeHelper({
        composeContacts: [],
        composeGroups: [],
        regionCode: "US",
        searchTerm: "foo bar",
        isUsernamesEnabled: true,
        uuidFetchState: {}
      });
      import_chai.assert.isFalse(helper.shouldRecomputeRowHeights({
        composeContacts: [],
        composeGroups: [],
        regionCode: "US",
        searchTerm: "different search",
        isUsernamesEnabled: true,
        uuidFetchState: {}
      }));
      import_chai.assert.isFalse(helper.shouldRecomputeRowHeights({
        composeContacts: [],
        composeGroups: [],
        regionCode: "US",
        searchTerm: "last search",
        isUsernamesEnabled: true,
        uuidFetchState: {}
      }));
    });
    it('returns true if "Find by usernames" header changes location or goes away', () => {
      const helper = new import_LeftPaneComposeHelper.LeftPaneComposeHelper({
        composeContacts: [(0, import_getDefaultConversation.getDefaultConversation)(), (0, import_getDefaultConversation.getDefaultConversation)()],
        composeGroups: [],
        regionCode: "US",
        searchTerm: "",
        isUsernamesEnabled: true,
        uuidFetchState: {}
      });
      import_chai.assert.isFalse(helper.shouldRecomputeRowHeights({
        composeContacts: [(0, import_getDefaultConversation.getDefaultConversation)()],
        composeGroups: [],
        regionCode: "US",
        searchTerm: "",
        isUsernamesEnabled: true,
        uuidFetchState: {}
      }));
    });
    it("returns true if search changes or becomes an e164", () => {
      const helper = new import_LeftPaneComposeHelper.LeftPaneComposeHelper({
        composeContacts: [(0, import_getDefaultConversation.getDefaultConversation)(), (0, import_getDefaultConversation.getDefaultConversation)()],
        composeGroups: [],
        regionCode: "US",
        searchTerm: "foo bar",
        isUsernamesEnabled: true,
        uuidFetchState: {}
      });
      import_chai.assert.isTrue(helper.shouldRecomputeRowHeights({
        composeContacts: [(0, import_getDefaultConversation.getDefaultConversation)(), (0, import_getDefaultConversation.getDefaultConversation)()],
        composeGroups: [],
        regionCode: "US",
        searchTerm: "",
        isUsernamesEnabled: true,
        uuidFetchState: {}
      }));
      import_chai.assert.isTrue(helper.shouldRecomputeRowHeights({
        composeContacts: [(0, import_getDefaultConversation.getDefaultConversation)(), (0, import_getDefaultConversation.getDefaultConversation)()],
        composeGroups: [],
        regionCode: "US",
        searchTerm: "+16505551234",
        isUsernamesEnabled: true,
        uuidFetchState: {}
      }));
    });
    it('returns true if going from no search to some search (showing "Find by username" section)', () => {
      const helper = new import_LeftPaneComposeHelper.LeftPaneComposeHelper({
        composeContacts: [(0, import_getDefaultConversation.getDefaultConversation)(), (0, import_getDefaultConversation.getDefaultConversation)()],
        composeGroups: [],
        regionCode: "US",
        searchTerm: "",
        isUsernamesEnabled: true,
        uuidFetchState: {}
      });
      import_chai.assert.isTrue(helper.shouldRecomputeRowHeights({
        composeContacts: [(0, import_getDefaultConversation.getDefaultConversation)(), (0, import_getDefaultConversation.getDefaultConversation)()],
        composeGroups: [],
        regionCode: "US",
        searchTerm: "foo bar",
        isUsernamesEnabled: true,
        uuidFetchState: {}
      }));
    });
    it("should be true if going from contact to group or vice versa", () => {
      const helperContacts = new import_LeftPaneComposeHelper.LeftPaneComposeHelper({
        composeContacts: [(0, import_getDefaultConversation.getDefaultConversation)(), (0, import_getDefaultConversation.getDefaultConversation)()],
        composeGroups: [],
        regionCode: "US",
        searchTerm: "foo bar",
        isUsernamesEnabled: true,
        uuidFetchState: {}
      });
      import_chai.assert.isTrue(helperContacts.shouldRecomputeRowHeights({
        composeContacts: [],
        composeGroups: [(0, import_getDefaultConversation.getDefaultConversation)(), (0, import_getDefaultConversation.getDefaultConversation)()],
        regionCode: "US",
        searchTerm: "foo bar",
        isUsernamesEnabled: true,
        uuidFetchState: {}
      }));
      const helperGroups = new import_LeftPaneComposeHelper.LeftPaneComposeHelper({
        composeContacts: [],
        composeGroups: [(0, import_getDefaultConversation.getDefaultConversation)(), (0, import_getDefaultConversation.getDefaultConversation)()],
        regionCode: "US",
        searchTerm: "foo bar",
        isUsernamesEnabled: true,
        uuidFetchState: {}
      });
      import_chai.assert.isTrue(helperGroups.shouldRecomputeRowHeights({
        composeContacts: [(0, import_getDefaultConversation.getDefaultConversation)(), (0, import_getDefaultConversation.getDefaultConversation)()],
        composeGroups: [],
        regionCode: "US",
        searchTerm: "foo bar",
        isUsernamesEnabled: true,
        uuidFetchState: {}
      }));
    });
    it("should be true if the headers are in different row indices as before", () => {
      const helperContacts = new import_LeftPaneComposeHelper.LeftPaneComposeHelper({
        composeContacts: [(0, import_getDefaultConversation.getDefaultConversation)(), (0, import_getDefaultConversation.getDefaultConversation)()],
        composeGroups: [(0, import_getDefaultConversation.getDefaultConversation)()],
        regionCode: "US",
        searchTerm: "soup",
        isUsernamesEnabled: true,
        uuidFetchState: {}
      });
      import_chai.assert.isTrue(helperContacts.shouldRecomputeRowHeights({
        composeContacts: [(0, import_getDefaultConversation.getDefaultConversation)()],
        composeGroups: [(0, import_getDefaultConversation.getDefaultConversation)(), (0, import_getDefaultConversation.getDefaultConversation)()],
        regionCode: "US",
        searchTerm: "soup",
        isUsernamesEnabled: true,
        uuidFetchState: {}
      }));
    });
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiTGVmdFBhbmVDb21wb3NlSGVscGVyX3Rlc3QudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSAnY2hhaSc7XG5pbXBvcnQgKiBhcyBzaW5vbiBmcm9tICdzaW5vbic7XG5pbXBvcnQgeyBSb3dUeXBlIH0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9Db252ZXJzYXRpb25MaXN0JztcbmltcG9ydCB7IEZpbmREaXJlY3Rpb24gfSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL2xlZnRQYW5lL0xlZnRQYW5lSGVscGVyJztcbmltcG9ydCB7IGdldERlZmF1bHRDb252ZXJzYXRpb24gfSBmcm9tICcuLi8uLi8uLi90ZXN0LWJvdGgvaGVscGVycy9nZXREZWZhdWx0Q29udmVyc2F0aW9uJztcblxuaW1wb3J0IHsgTGVmdFBhbmVDb21wb3NlSGVscGVyIH0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9sZWZ0UGFuZS9MZWZ0UGFuZUNvbXBvc2VIZWxwZXInO1xuXG5kZXNjcmliZSgnTGVmdFBhbmVDb21wb3NlSGVscGVyJywgKCkgPT4ge1xuICBsZXQgc2lub25TYW5kYm94OiBzaW5vbi5TaW5vblNhbmRib3g7XG5cbiAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgc2lub25TYW5kYm94ID0gc2lub24uY3JlYXRlU2FuZGJveCgpO1xuICB9KTtcblxuICBhZnRlckVhY2goKCkgPT4ge1xuICAgIHNpbm9uU2FuZGJveC5yZXN0b3JlKCk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdnZXRCYWNrQWN0aW9uJywgKCkgPT4ge1xuICAgIGl0KCdyZXR1cm5zIHRoZSBcInNob3cgaW5ib3hcIiBhY3Rpb24nLCAoKSA9PiB7XG4gICAgICBjb25zdCBzaG93SW5ib3ggPSBzaW5vbi5mYWtlKCk7XG4gICAgICBjb25zdCBoZWxwZXIgPSBuZXcgTGVmdFBhbmVDb21wb3NlSGVscGVyKHtcbiAgICAgICAgY29tcG9zZUNvbnRhY3RzOiBbXSxcbiAgICAgICAgY29tcG9zZUdyb3VwczogW10sXG4gICAgICAgIHJlZ2lvbkNvZGU6ICdVUycsXG4gICAgICAgIHNlYXJjaFRlcm06ICcnLFxuICAgICAgICBpc1VzZXJuYW1lc0VuYWJsZWQ6IHRydWUsXG4gICAgICAgIHV1aWRGZXRjaFN0YXRlOiB7fSxcbiAgICAgIH0pO1xuXG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoaGVscGVyLmdldEJhY2tBY3Rpb24oeyBzaG93SW5ib3ggfSksIHNob3dJbmJveCk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdnZXRSb3dDb3VudCcsICgpID0+IHtcbiAgICBpdCgncmV0dXJucyAxIChmb3IgdGhlIFwibmV3IGdyb3VwXCIgYnV0dG9uKSBpZiBub3Qgc2VhcmNoaW5nIGFuZCB0aGVyZSBhcmUgbm8gY29udGFjdHMnLCAoKSA9PiB7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoXG4gICAgICAgIG5ldyBMZWZ0UGFuZUNvbXBvc2VIZWxwZXIoe1xuICAgICAgICAgIGNvbXBvc2VDb250YWN0czogW10sXG4gICAgICAgICAgY29tcG9zZUdyb3VwczogW10sXG4gICAgICAgICAgcmVnaW9uQ29kZTogJ1VTJyxcbiAgICAgICAgICBzZWFyY2hUZXJtOiAnJyxcbiAgICAgICAgICBpc1VzZXJuYW1lc0VuYWJsZWQ6IHRydWUsXG4gICAgICAgICAgdXVpZEZldGNoU3RhdGU6IHt9LFxuICAgICAgICB9KS5nZXRSb3dDb3VudCgpLFxuICAgICAgICAxXG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgdGhlIG51bWJlciBvZiBjb250YWN0cyArIDIgKGZvciB0aGUgXCJuZXcgZ3JvdXBcIiBidXR0b24gYW5kIGhlYWRlcikgaWYgbm90IHNlYXJjaGluZycsICgpID0+IHtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgICAgbmV3IExlZnRQYW5lQ29tcG9zZUhlbHBlcih7XG4gICAgICAgICAgY29tcG9zZUNvbnRhY3RzOiBbZ2V0RGVmYXVsdENvbnZlcnNhdGlvbigpLCBnZXREZWZhdWx0Q29udmVyc2F0aW9uKCldLFxuICAgICAgICAgIGNvbXBvc2VHcm91cHM6IFtdLFxuICAgICAgICAgIHJlZ2lvbkNvZGU6ICdVUycsXG4gICAgICAgICAgc2VhcmNoVGVybTogJycsXG4gICAgICAgICAgaXNVc2VybmFtZXNFbmFibGVkOiB0cnVlLFxuICAgICAgICAgIHV1aWRGZXRjaFN0YXRlOiB7fSxcbiAgICAgICAgfSkuZ2V0Um93Q291bnQoKSxcbiAgICAgICAgNFxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIHRoZSBudW1iZXIgb2YgY29udGFjdHMgKyBudW1iZXIgb2YgZ3JvdXBzICsgMyAoZm9yIHRoZSBcIm5ldyBncm91cFwiIGJ1dHRvbiBhbmQgdGhlIGhlYWRlcnMpIGlmIG5vdCBzZWFyY2hpbmcnLCAoKSA9PiB7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoXG4gICAgICAgIG5ldyBMZWZ0UGFuZUNvbXBvc2VIZWxwZXIoe1xuICAgICAgICAgIGNvbXBvc2VDb250YWN0czogW2dldERlZmF1bHRDb252ZXJzYXRpb24oKSwgZ2V0RGVmYXVsdENvbnZlcnNhdGlvbigpXSxcbiAgICAgICAgICBjb21wb3NlR3JvdXBzOiBbZ2V0RGVmYXVsdENvbnZlcnNhdGlvbigpLCBnZXREZWZhdWx0Q29udmVyc2F0aW9uKCldLFxuICAgICAgICAgIHJlZ2lvbkNvZGU6ICdVUycsXG4gICAgICAgICAgc2VhcmNoVGVybTogJycsXG4gICAgICAgICAgaXNVc2VybmFtZXNFbmFibGVkOiB0cnVlLFxuICAgICAgICAgIHV1aWRGZXRjaFN0YXRlOiB7fSxcbiAgICAgICAgfSkuZ2V0Um93Q291bnQoKSxcbiAgICAgICAgN1xuICAgICAgKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIHRoZSBudW1iZXIgb2YgY29udGFjdHMsIG51bWJlciBncm91cHMgKyA0IChmb3IgaGVhZGVycyBhbmQgdXNlcm5hbWUpJywgKCkgPT4ge1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgICBuZXcgTGVmdFBhbmVDb21wb3NlSGVscGVyKHtcbiAgICAgICAgICBjb21wb3NlQ29udGFjdHM6IFtnZXREZWZhdWx0Q29udmVyc2F0aW9uKCksIGdldERlZmF1bHRDb252ZXJzYXRpb24oKV0sXG4gICAgICAgICAgY29tcG9zZUdyb3VwczogW2dldERlZmF1bHRDb252ZXJzYXRpb24oKSwgZ2V0RGVmYXVsdENvbnZlcnNhdGlvbigpXSxcbiAgICAgICAgICByZWdpb25Db2RlOiAnVVMnLFxuICAgICAgICAgIHNlYXJjaFRlcm06ICdzb21lb25lJyxcbiAgICAgICAgICBpc1VzZXJuYW1lc0VuYWJsZWQ6IHRydWUsXG4gICAgICAgICAgdXVpZEZldGNoU3RhdGU6IHt9LFxuICAgICAgICB9KS5nZXRSb3dDb3VudCgpLFxuICAgICAgICA4XG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgaXQoJ2lmIHVzZXJuYW1lcyBhcmUgZGlzYWJsZWQsIHR3byBsZXNzIHJvd3MgYXJlIHNob3duJywgKCkgPT4ge1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgICBuZXcgTGVmdFBhbmVDb21wb3NlSGVscGVyKHtcbiAgICAgICAgICBjb21wb3NlQ29udGFjdHM6IFtnZXREZWZhdWx0Q29udmVyc2F0aW9uKCksIGdldERlZmF1bHRDb252ZXJzYXRpb24oKV0sXG4gICAgICAgICAgY29tcG9zZUdyb3VwczogW2dldERlZmF1bHRDb252ZXJzYXRpb24oKSwgZ2V0RGVmYXVsdENvbnZlcnNhdGlvbigpXSxcbiAgICAgICAgICByZWdpb25Db2RlOiAnVVMnLFxuICAgICAgICAgIHNlYXJjaFRlcm06ICdzb21lb25lJyxcbiAgICAgICAgICBpc1VzZXJuYW1lc0VuYWJsZWQ6IGZhbHNlLFxuICAgICAgICAgIHV1aWRGZXRjaFN0YXRlOiB7fSxcbiAgICAgICAgfSkuZ2V0Um93Q291bnQoKSxcbiAgICAgICAgNlxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIHRoZSBudW1iZXIgb2YgY29udmVyc2F0aW9ucyArIHRoZSBoZWFkZXJzLCBidXQgbm90IGZvciBhIHBob25lIG51bWJlcicsICgpID0+IHtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgICAgbmV3IExlZnRQYW5lQ29tcG9zZUhlbHBlcih7XG4gICAgICAgICAgY29tcG9zZUNvbnRhY3RzOiBbXSxcbiAgICAgICAgICBjb21wb3NlR3JvdXBzOiBbXSxcbiAgICAgICAgICByZWdpb25Db2RlOiAnVVMnLFxuICAgICAgICAgIHNlYXJjaFRlcm06ICdmb28gYmFyJyxcbiAgICAgICAgICBpc1VzZXJuYW1lc0VuYWJsZWQ6IHRydWUsXG4gICAgICAgICAgdXVpZEZldGNoU3RhdGU6IHt9LFxuICAgICAgICB9KS5nZXRSb3dDb3VudCgpLFxuICAgICAgICAyXG4gICAgICApO1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgICBuZXcgTGVmdFBhbmVDb21wb3NlSGVscGVyKHtcbiAgICAgICAgICBjb21wb3NlQ29udGFjdHM6IFtnZXREZWZhdWx0Q29udmVyc2F0aW9uKCksIGdldERlZmF1bHRDb252ZXJzYXRpb24oKV0sXG4gICAgICAgICAgY29tcG9zZUdyb3VwczogW10sXG4gICAgICAgICAgcmVnaW9uQ29kZTogJ1VTJyxcbiAgICAgICAgICBzZWFyY2hUZXJtOiAnZm9vIGJhcicsXG4gICAgICAgICAgaXNVc2VybmFtZXNFbmFibGVkOiB0cnVlLFxuICAgICAgICAgIHV1aWRGZXRjaFN0YXRlOiB7fSxcbiAgICAgICAgfSkuZ2V0Um93Q291bnQoKSxcbiAgICAgICAgNVxuICAgICAgKTtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgICAgbmV3IExlZnRQYW5lQ29tcG9zZUhlbHBlcih7XG4gICAgICAgICAgY29tcG9zZUNvbnRhY3RzOiBbZ2V0RGVmYXVsdENvbnZlcnNhdGlvbigpLCBnZXREZWZhdWx0Q29udmVyc2F0aW9uKCldLFxuICAgICAgICAgIGNvbXBvc2VHcm91cHM6IFtnZXREZWZhdWx0Q29udmVyc2F0aW9uKCldLFxuICAgICAgICAgIHJlZ2lvbkNvZGU6ICdVUycsXG4gICAgICAgICAgc2VhcmNoVGVybTogJ2ZvbyBiYXInLFxuICAgICAgICAgIGlzVXNlcm5hbWVzRW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgICB1dWlkRmV0Y2hTdGF0ZToge30sXG4gICAgICAgIH0pLmdldFJvd0NvdW50KCksXG4gICAgICAgIDdcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyAyIChmb3IgdGhlIFwiU3RhcnQgbmV3IGNvbnZlcnNhdGlvblwiIGJ1dHRvbikgaWYgc2VhcmNoaW5nIGZvciBhIHBob25lIG51bWJlciB3aXRoIG5vIGNvbnRhY3RzJywgKCkgPT4ge1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgICBuZXcgTGVmdFBhbmVDb21wb3NlSGVscGVyKHtcbiAgICAgICAgICBjb21wb3NlQ29udGFjdHM6IFtdLFxuICAgICAgICAgIGNvbXBvc2VHcm91cHM6IFtdLFxuICAgICAgICAgIHJlZ2lvbkNvZGU6ICdVUycsXG4gICAgICAgICAgc2VhcmNoVGVybTogJysxNjUwNTU1MTIzNCcsXG4gICAgICAgICAgaXNVc2VybmFtZXNFbmFibGVkOiB0cnVlLFxuICAgICAgICAgIHV1aWRGZXRjaFN0YXRlOiB7fSxcbiAgICAgICAgfSkuZ2V0Um93Q291bnQoKSxcbiAgICAgICAgMlxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIDIgaWYganVzdCB1c2VybmFtZSBpbiByZXN1bHRzJywgKCkgPT4ge1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgICBuZXcgTGVmdFBhbmVDb21wb3NlSGVscGVyKHtcbiAgICAgICAgICBjb21wb3NlQ29udGFjdHM6IFtdLFxuICAgICAgICAgIGNvbXBvc2VHcm91cHM6IFtdLFxuICAgICAgICAgIHJlZ2lvbkNvZGU6ICdVUycsXG4gICAgICAgICAgc2VhcmNoVGVybTogJ3NvbWVvbmUnLFxuICAgICAgICAgIGlzVXNlcm5hbWVzRW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgICB1dWlkRmV0Y2hTdGF0ZToge30sXG4gICAgICAgIH0pLmdldFJvd0NvdW50KCksXG4gICAgICAgIDJcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyB0aGUgbnVtYmVyIG9mIGNvbnRhY3RzICsgMiAoZm9yIHRoZSBcIlN0YXJ0IG5ldyBjb252ZXJzYXRpb25cIiBidXR0b24gYW5kIGhlYWRlcikgaWYgc2VhcmNoaW5nIGZvciBhIHBob25lIG51bWJlcicsICgpID0+IHtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgICAgbmV3IExlZnRQYW5lQ29tcG9zZUhlbHBlcih7XG4gICAgICAgICAgY29tcG9zZUNvbnRhY3RzOiBbZ2V0RGVmYXVsdENvbnZlcnNhdGlvbigpLCBnZXREZWZhdWx0Q29udmVyc2F0aW9uKCldLFxuICAgICAgICAgIGNvbXBvc2VHcm91cHM6IFtdLFxuICAgICAgICAgIHJlZ2lvbkNvZGU6ICdVUycsXG4gICAgICAgICAgc2VhcmNoVGVybTogJysxNjUwNTU1MTIzNCcsXG4gICAgICAgICAgaXNVc2VybmFtZXNFbmFibGVkOiB0cnVlLFxuICAgICAgICAgIHV1aWRGZXRjaFN0YXRlOiB7fSxcbiAgICAgICAgfSkuZ2V0Um93Q291bnQoKSxcbiAgICAgICAgNVxuICAgICAgKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ2dldFJvdycsICgpID0+IHtcbiAgICBpdCgncmV0dXJucyBhIFwibmV3IGdyb3VwXCIgYnV0dG9uIGlmIG5vdCBzZWFyY2hpbmcgYW5kIHRoZXJlIGFyZSBubyBjb250YWN0cycsICgpID0+IHtcbiAgICAgIGNvbnN0IGhlbHBlciA9IG5ldyBMZWZ0UGFuZUNvbXBvc2VIZWxwZXIoe1xuICAgICAgICBjb21wb3NlQ29udGFjdHM6IFtdLFxuICAgICAgICBjb21wb3NlR3JvdXBzOiBbXSxcbiAgICAgICAgcmVnaW9uQ29kZTogJ1VTJyxcbiAgICAgICAgc2VhcmNoVGVybTogJycsXG4gICAgICAgIGlzVXNlcm5hbWVzRW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgdXVpZEZldGNoU3RhdGU6IHt9LFxuICAgICAgfSk7XG5cbiAgICAgIGFzc2VydC5kZWVwRXF1YWwoaGVscGVyLmdldFJvdygwKSwge1xuICAgICAgICB0eXBlOiBSb3dUeXBlLkNyZWF0ZU5ld0dyb3VwLFxuICAgICAgfSk7XG4gICAgICBhc3NlcnQuaXNVbmRlZmluZWQoaGVscGVyLmdldFJvdygxKSk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyBhIFwibmV3IGdyb3VwXCIgYnV0dG9uLCBhIGhlYWRlciwgYW5kIGNvbnRhY3RzIGlmIG5vdCBzZWFyY2hpbmcnLCAoKSA9PiB7XG4gICAgICBjb25zdCBjb21wb3NlQ29udGFjdHMgPSBbXG4gICAgICAgIGdldERlZmF1bHRDb252ZXJzYXRpb24oKSxcbiAgICAgICAgZ2V0RGVmYXVsdENvbnZlcnNhdGlvbigpLFxuICAgICAgXTtcbiAgICAgIGNvbnN0IGhlbHBlciA9IG5ldyBMZWZ0UGFuZUNvbXBvc2VIZWxwZXIoe1xuICAgICAgICBjb21wb3NlQ29udGFjdHMsXG4gICAgICAgIGNvbXBvc2VHcm91cHM6IFtdLFxuICAgICAgICByZWdpb25Db2RlOiAnVVMnLFxuICAgICAgICBzZWFyY2hUZXJtOiAnJyxcbiAgICAgICAgaXNVc2VybmFtZXNFbmFibGVkOiB0cnVlLFxuICAgICAgICB1dWlkRmV0Y2hTdGF0ZToge30sXG4gICAgICB9KTtcblxuICAgICAgYXNzZXJ0LmRlZXBFcXVhbChoZWxwZXIuZ2V0Um93KDApLCB7XG4gICAgICAgIHR5cGU6IFJvd1R5cGUuQ3JlYXRlTmV3R3JvdXAsXG4gICAgICB9KTtcbiAgICAgIGFzc2VydC5kZWVwRXF1YWwoaGVscGVyLmdldFJvdygxKSwge1xuICAgICAgICB0eXBlOiBSb3dUeXBlLkhlYWRlcixcbiAgICAgICAgaTE4bktleTogJ2NvbnRhY3RzSGVhZGVyJyxcbiAgICAgIH0pO1xuICAgICAgYXNzZXJ0LmRlZXBFcXVhbChoZWxwZXIuZ2V0Um93KDIpLCB7XG4gICAgICAgIHR5cGU6IFJvd1R5cGUuQ29udGFjdCxcbiAgICAgICAgY29udGFjdDogY29tcG9zZUNvbnRhY3RzWzBdLFxuICAgICAgfSk7XG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKGhlbHBlci5nZXRSb3coMyksIHtcbiAgICAgICAgdHlwZTogUm93VHlwZS5Db250YWN0LFxuICAgICAgICBjb250YWN0OiBjb21wb3NlQ29udGFjdHNbMV0sXG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIGEgXCJuZXcgZ3JvdXBcIiBidXR0b24sIGEgaGVhZGVyLCBjb250YWN0cywgZ3JvdXBzIGhlYWRlciwgYW5kIGdyb3VwcyAtLSBpZiBub3Qgc2VhcmNoaW5nJywgKCkgPT4ge1xuICAgICAgY29uc3QgY29tcG9zZUNvbnRhY3RzID0gW1xuICAgICAgICBnZXREZWZhdWx0Q29udmVyc2F0aW9uKCksXG4gICAgICAgIGdldERlZmF1bHRDb252ZXJzYXRpb24oKSxcbiAgICAgIF07XG4gICAgICBjb25zdCBjb21wb3NlR3JvdXBzID0gW1xuICAgICAgICBnZXREZWZhdWx0Q29udmVyc2F0aW9uKCksXG4gICAgICAgIGdldERlZmF1bHRDb252ZXJzYXRpb24oKSxcbiAgICAgIF07XG4gICAgICBjb25zdCBoZWxwZXIgPSBuZXcgTGVmdFBhbmVDb21wb3NlSGVscGVyKHtcbiAgICAgICAgY29tcG9zZUNvbnRhY3RzLFxuICAgICAgICBjb21wb3NlR3JvdXBzLFxuICAgICAgICByZWdpb25Db2RlOiAnVVMnLFxuICAgICAgICBzZWFyY2hUZXJtOiAnJyxcbiAgICAgICAgaXNVc2VybmFtZXNFbmFibGVkOiB0cnVlLFxuICAgICAgICB1dWlkRmV0Y2hTdGF0ZToge30sXG4gICAgICB9KTtcblxuICAgICAgYXNzZXJ0LmRlZXBFcXVhbChoZWxwZXIuZ2V0Um93KDApLCB7XG4gICAgICAgIHR5cGU6IFJvd1R5cGUuQ3JlYXRlTmV3R3JvdXAsXG4gICAgICB9KTtcbiAgICAgIGFzc2VydC5kZWVwRXF1YWwoaGVscGVyLmdldFJvdygxKSwge1xuICAgICAgICB0eXBlOiBSb3dUeXBlLkhlYWRlcixcbiAgICAgICAgaTE4bktleTogJ2NvbnRhY3RzSGVhZGVyJyxcbiAgICAgIH0pO1xuICAgICAgYXNzZXJ0LmRlZXBFcXVhbChoZWxwZXIuZ2V0Um93KDIpLCB7XG4gICAgICAgIHR5cGU6IFJvd1R5cGUuQ29udGFjdCxcbiAgICAgICAgY29udGFjdDogY29tcG9zZUNvbnRhY3RzWzBdLFxuICAgICAgfSk7XG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKGhlbHBlci5nZXRSb3coMyksIHtcbiAgICAgICAgdHlwZTogUm93VHlwZS5Db250YWN0LFxuICAgICAgICBjb250YWN0OiBjb21wb3NlQ29udGFjdHNbMV0sXG4gICAgICB9KTtcbiAgICAgIGFzc2VydC5kZWVwRXF1YWwoaGVscGVyLmdldFJvdyg0KSwge1xuICAgICAgICB0eXBlOiBSb3dUeXBlLkhlYWRlcixcbiAgICAgICAgaTE4bktleTogJ2dyb3Vwc0hlYWRlcicsXG4gICAgICB9KTtcbiAgICAgIGFzc2VydC5kZWVwRXF1YWwoaGVscGVyLmdldFJvdyg1KSwge1xuICAgICAgICB0eXBlOiBSb3dUeXBlLkNvbnZlcnNhdGlvbixcbiAgICAgICAgY29udmVyc2F0aW9uOiBjb21wb3NlR3JvdXBzWzBdLFxuICAgICAgfSk7XG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKGhlbHBlci5nZXRSb3coNiksIHtcbiAgICAgICAgdHlwZTogUm93VHlwZS5Db252ZXJzYXRpb24sXG4gICAgICAgIGNvbnZlcnNhdGlvbjogY29tcG9zZUdyb3Vwc1sxXSxcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgbm8gcm93cyBpZiBzZWFyY2hpbmcsIG5vIHJlc3VsdHMsIGFuZCB1c2VybmFtZXMgYXJlIGRpc2FibGVkJywgKCkgPT4ge1xuICAgICAgY29uc3QgaGVscGVyID0gbmV3IExlZnRQYW5lQ29tcG9zZUhlbHBlcih7XG4gICAgICAgIGNvbXBvc2VDb250YWN0czogW10sXG4gICAgICAgIGNvbXBvc2VHcm91cHM6IFtdLFxuICAgICAgICByZWdpb25Db2RlOiAnVVMnLFxuICAgICAgICBzZWFyY2hUZXJtOiAnZm9vIGJhcicsXG4gICAgICAgIGlzVXNlcm5hbWVzRW5hYmxlZDogZmFsc2UsXG4gICAgICAgIHV1aWRGZXRjaFN0YXRlOiB7fSxcbiAgICAgIH0pO1xuXG4gICAgICBhc3NlcnQuaXNVbmRlZmluZWQoaGVscGVyLmdldFJvdygwKSk7XG4gICAgICBhc3NlcnQuaXNVbmRlZmluZWQoaGVscGVyLmdldFJvdygxKSk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyBvbmUgcm93IHBlciBjb250YWN0IGlmIHNlYXJjaGluZycsICgpID0+IHtcbiAgICAgIGNvbnN0IGNvbXBvc2VDb250YWN0cyA9IFtcbiAgICAgICAgZ2V0RGVmYXVsdENvbnZlcnNhdGlvbigpLFxuICAgICAgICBnZXREZWZhdWx0Q29udmVyc2F0aW9uKCksXG4gICAgICBdO1xuICAgICAgY29uc3QgaGVscGVyID0gbmV3IExlZnRQYW5lQ29tcG9zZUhlbHBlcih7XG4gICAgICAgIGNvbXBvc2VDb250YWN0cyxcbiAgICAgICAgY29tcG9zZUdyb3VwczogW10sXG4gICAgICAgIHJlZ2lvbkNvZGU6ICdVUycsXG4gICAgICAgIHNlYXJjaFRlcm06ICdmb28gYmFyJyxcbiAgICAgICAgaXNVc2VybmFtZXNFbmFibGVkOiB0cnVlLFxuICAgICAgICB1dWlkRmV0Y2hTdGF0ZToge30sXG4gICAgICB9KTtcblxuICAgICAgYXNzZXJ0LmRlZXBFcXVhbChoZWxwZXIuZ2V0Um93KDEpLCB7XG4gICAgICAgIHR5cGU6IFJvd1R5cGUuQ29udGFjdCxcbiAgICAgICAgY29udGFjdDogY29tcG9zZUNvbnRhY3RzWzBdLFxuICAgICAgfSk7XG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKGhlbHBlci5nZXRSb3coMiksIHtcbiAgICAgICAgdHlwZTogUm93VHlwZS5Db250YWN0LFxuICAgICAgICBjb250YWN0OiBjb21wb3NlQ29udGFjdHNbMV0sXG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIGEgXCJzdGFydCBuZXcgY29udmVyc2F0aW9uXCIgcm93IGlmIHNlYXJjaGluZyBmb3IgYSBwaG9uZSBudW1iZXIgYW5kIHRoZXJlIGFyZSBubyByZXN1bHRzJywgKCkgPT4ge1xuICAgICAgY29uc3QgaGVscGVyID0gbmV3IExlZnRQYW5lQ29tcG9zZUhlbHBlcih7XG4gICAgICAgIGNvbXBvc2VDb250YWN0czogW10sXG4gICAgICAgIGNvbXBvc2VHcm91cHM6IFtdLFxuICAgICAgICByZWdpb25Db2RlOiAnVVMnLFxuICAgICAgICBzZWFyY2hUZXJtOiAnKzEoNjUwKSA1NTUgMTIgMzQnLFxuICAgICAgICBpc1VzZXJuYW1lc0VuYWJsZWQ6IHRydWUsXG4gICAgICAgIHV1aWRGZXRjaFN0YXRlOiB7fSxcbiAgICAgIH0pO1xuXG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKGhlbHBlci5nZXRSb3coMCksIHtcbiAgICAgICAgdHlwZTogUm93VHlwZS5IZWFkZXIsXG4gICAgICAgIGkxOG5LZXk6ICdmaW5kQnlQaG9uZU51bWJlckhlYWRlcicsXG4gICAgICB9KTtcbiAgICAgIGFzc2VydC5kZWVwRXF1YWwoaGVscGVyLmdldFJvdygxKSwge1xuICAgICAgICB0eXBlOiBSb3dUeXBlLlN0YXJ0TmV3Q29udmVyc2F0aW9uLFxuICAgICAgICBwaG9uZU51bWJlcjoge1xuICAgICAgICAgIGlzVmFsaWQ6IHRydWUsXG4gICAgICAgICAgdXNlcklucHV0OiAnKzEoNjUwKSA1NTUgMTIgMzQnLFxuICAgICAgICAgIGUxNjQ6ICcrMTY1MDU1NTEyMzQnLFxuICAgICAgICB9LFxuICAgICAgICBpc0ZldGNoaW5nOiBmYWxzZSxcbiAgICAgIH0pO1xuICAgICAgYXNzZXJ0LmlzVW5kZWZpbmVkKGhlbHBlci5nZXRSb3coMikpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMganVzdCBhIFwiZmluZCBieSB1c2VybmFtZVwiIGhlYWRlciBpZiBubyByZXN1bHRzJywgKCkgPT4ge1xuICAgICAgY29uc3QgdXNlcm5hbWUgPSAnc29tZW9uZSc7XG5cbiAgICAgIGNvbnN0IGhlbHBlciA9IG5ldyBMZWZ0UGFuZUNvbXBvc2VIZWxwZXIoe1xuICAgICAgICBjb21wb3NlQ29udGFjdHM6IFtdLFxuICAgICAgICBjb21wb3NlR3JvdXBzOiBbXSxcbiAgICAgICAgcmVnaW9uQ29kZTogJ1VTJyxcbiAgICAgICAgc2VhcmNoVGVybTogdXNlcm5hbWUsXG4gICAgICAgIGlzVXNlcm5hbWVzRW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgdXVpZEZldGNoU3RhdGU6IHtcbiAgICAgICAgICBbYHVzZXJuYW1lOiR7dXNlcm5hbWV9YF06IHRydWUsXG4gICAgICAgIH0sXG4gICAgICB9KTtcblxuICAgICAgYXNzZXJ0LmRlZXBFcXVhbChoZWxwZXIuZ2V0Um93KDApLCB7XG4gICAgICAgIHR5cGU6IFJvd1R5cGUuSGVhZGVyLFxuICAgICAgICBpMThuS2V5OiAnZmluZEJ5VXNlcm5hbWVIZWFkZXInLFxuICAgICAgfSk7XG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKGhlbHBlci5nZXRSb3coMSksIHtcbiAgICAgICAgdHlwZTogUm93VHlwZS5Vc2VybmFtZVNlYXJjaFJlc3VsdCxcbiAgICAgICAgdXNlcm5hbWUsXG4gICAgICAgIGlzRmV0Y2hpbmdVc2VybmFtZTogdHJ1ZSxcbiAgICAgIH0pO1xuICAgICAgYXNzZXJ0LmlzVW5kZWZpbmVkKGhlbHBlci5nZXRSb3coMikpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgYSBcInN0YXJ0IG5ldyBjb252ZXJzYXRpb25cIiByb3csIGEgaGVhZGVyLCBhbmQgY29udGFjdHMgaWYgc2VhcmNoaW5nIGZvciBhIHBob25lIG51bWJlcicsICgpID0+IHtcbiAgICAgIGNvbnN0IGNvbXBvc2VDb250YWN0cyA9IFtcbiAgICAgICAgZ2V0RGVmYXVsdENvbnZlcnNhdGlvbigpLFxuICAgICAgICBnZXREZWZhdWx0Q29udmVyc2F0aW9uKCksXG4gICAgICBdO1xuICAgICAgY29uc3QgaGVscGVyID0gbmV3IExlZnRQYW5lQ29tcG9zZUhlbHBlcih7XG4gICAgICAgIGNvbXBvc2VDb250YWN0cyxcbiAgICAgICAgY29tcG9zZUdyb3VwczogW10sXG4gICAgICAgIHJlZ2lvbkNvZGU6ICdVUycsXG4gICAgICAgIHNlYXJjaFRlcm06ICcrMSg2NTApIDU1NSAxMiAzNCcsXG4gICAgICAgIGlzVXNlcm5hbWVzRW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgdXVpZEZldGNoU3RhdGU6IHt9LFxuICAgICAgfSk7XG5cbiAgICAgIGFzc2VydC5kZWVwRXF1YWwoaGVscGVyLmdldFJvdygwKSwge1xuICAgICAgICB0eXBlOiBSb3dUeXBlLkhlYWRlcixcbiAgICAgICAgaTE4bktleTogJ2NvbnRhY3RzSGVhZGVyJyxcbiAgICAgIH0pO1xuICAgICAgYXNzZXJ0LmRlZXBFcXVhbChoZWxwZXIuZ2V0Um93KDEpLCB7XG4gICAgICAgIHR5cGU6IFJvd1R5cGUuQ29udGFjdCxcbiAgICAgICAgY29udGFjdDogY29tcG9zZUNvbnRhY3RzWzBdLFxuICAgICAgfSk7XG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKGhlbHBlci5nZXRSb3coMiksIHtcbiAgICAgICAgdHlwZTogUm93VHlwZS5Db250YWN0LFxuICAgICAgICBjb250YWN0OiBjb21wb3NlQ29udGFjdHNbMV0sXG4gICAgICB9KTtcbiAgICAgIGFzc2VydC5kZWVwRXF1YWwoaGVscGVyLmdldFJvdygzKSwge1xuICAgICAgICB0eXBlOiBSb3dUeXBlLkhlYWRlcixcbiAgICAgICAgaTE4bktleTogJ2ZpbmRCeVBob25lTnVtYmVySGVhZGVyJyxcbiAgICAgIH0pO1xuICAgICAgYXNzZXJ0LmRlZXBFcXVhbChoZWxwZXIuZ2V0Um93KDQpLCB7XG4gICAgICAgIHR5cGU6IFJvd1R5cGUuU3RhcnROZXdDb252ZXJzYXRpb24sXG4gICAgICAgIHBob25lTnVtYmVyOiB7XG4gICAgICAgICAgaXNWYWxpZDogdHJ1ZSxcbiAgICAgICAgICB1c2VySW5wdXQ6ICcrMSg2NTApIDU1NSAxMiAzNCcsXG4gICAgICAgICAgZTE2NDogJysxNjUwNTU1MTIzNCcsXG4gICAgICAgIH0sXG4gICAgICAgIGlzRmV0Y2hpbmc6IGZhbHNlLFxuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdnZXRDb252ZXJzYXRpb25BbmRNZXNzYWdlQXRJbmRleCcsICgpID0+IHtcbiAgICBpdCgncmV0dXJucyB1bmRlZmluZWQgYmVjYXVzZSBrZXlib2FyZCBzaG9ydGN1dHMgYXJlIG5vdCBzdXBwb3J0ZWQnLCAoKSA9PiB7XG4gICAgICBjb25zdCBoZWxwZXIgPSBuZXcgTGVmdFBhbmVDb21wb3NlSGVscGVyKHtcbiAgICAgICAgY29tcG9zZUNvbnRhY3RzOiBbZ2V0RGVmYXVsdENvbnZlcnNhdGlvbigpLCBnZXREZWZhdWx0Q29udmVyc2F0aW9uKCldLFxuICAgICAgICBjb21wb3NlR3JvdXBzOiBbXSxcbiAgICAgICAgcmVnaW9uQ29kZTogJ1VTJyxcbiAgICAgICAgc2VhcmNoVGVybTogJ2ZvbyBiYXInLFxuICAgICAgICBpc1VzZXJuYW1lc0VuYWJsZWQ6IHRydWUsXG4gICAgICAgIHV1aWRGZXRjaFN0YXRlOiB7fSxcbiAgICAgIH0pO1xuXG4gICAgICBhc3NlcnQuaXNVbmRlZmluZWQoaGVscGVyLmdldENvbnZlcnNhdGlvbkFuZE1lc3NhZ2VBdEluZGV4KDApKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ2dldENvbnZlcnNhdGlvbkFuZE1lc3NhZ2VJbkRpcmVjdGlvbicsICgpID0+IHtcbiAgICBpdCgncmV0dXJucyB1bmRlZmluZWQgYmVjYXVzZSBrZXlib2FyZCBzaG9ydGN1dHMgYXJlIG5vdCBzdXBwb3J0ZWQnLCAoKSA9PiB7XG4gICAgICBjb25zdCBoZWxwZXIgPSBuZXcgTGVmdFBhbmVDb21wb3NlSGVscGVyKHtcbiAgICAgICAgY29tcG9zZUNvbnRhY3RzOiBbZ2V0RGVmYXVsdENvbnZlcnNhdGlvbigpLCBnZXREZWZhdWx0Q29udmVyc2F0aW9uKCldLFxuICAgICAgICBjb21wb3NlR3JvdXBzOiBbXSxcbiAgICAgICAgcmVnaW9uQ29kZTogJ1VTJyxcbiAgICAgICAgc2VhcmNoVGVybTogJ2ZvbyBiYXInLFxuICAgICAgICBpc1VzZXJuYW1lc0VuYWJsZWQ6IHRydWUsXG4gICAgICAgIHV1aWRGZXRjaFN0YXRlOiB7fSxcbiAgICAgIH0pO1xuXG4gICAgICBhc3NlcnQuaXNVbmRlZmluZWQoXG4gICAgICAgIGhlbHBlci5nZXRDb252ZXJzYXRpb25BbmRNZXNzYWdlSW5EaXJlY3Rpb24oXG4gICAgICAgICAgeyBkaXJlY3Rpb246IEZpbmREaXJlY3Rpb24uRG93biwgdW5yZWFkT25seTogZmFsc2UgfSxcbiAgICAgICAgICB1bmRlZmluZWQsXG4gICAgICAgICAgdW5kZWZpbmVkXG4gICAgICAgIClcbiAgICAgICk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdzaG91bGRSZWNvbXB1dGVSb3dIZWlnaHRzJywgKCkgPT4ge1xuICAgIGl0KCdyZXR1cm5zIGZhbHNlIGlmIGp1c3Qgc2VhcmNoIGNoYW5nZXMsIHNvIFwiRmluZCBieSB1c2VybmFtZVwiIGhlYWRlciBpcyBpbiBzYW1lIHBvc2l0aW9uJywgKCkgPT4ge1xuICAgICAgY29uc3QgaGVscGVyID0gbmV3IExlZnRQYW5lQ29tcG9zZUhlbHBlcih7XG4gICAgICAgIGNvbXBvc2VDb250YWN0czogW10sXG4gICAgICAgIGNvbXBvc2VHcm91cHM6IFtdLFxuICAgICAgICByZWdpb25Db2RlOiAnVVMnLFxuICAgICAgICBzZWFyY2hUZXJtOiAnZm9vIGJhcicsXG4gICAgICAgIGlzVXNlcm5hbWVzRW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgdXVpZEZldGNoU3RhdGU6IHt9LFxuICAgICAgfSk7XG5cbiAgICAgIGFzc2VydC5pc0ZhbHNlKFxuICAgICAgICBoZWxwZXIuc2hvdWxkUmVjb21wdXRlUm93SGVpZ2h0cyh7XG4gICAgICAgICAgY29tcG9zZUNvbnRhY3RzOiBbXSxcbiAgICAgICAgICBjb21wb3NlR3JvdXBzOiBbXSxcbiAgICAgICAgICByZWdpb25Db2RlOiAnVVMnLFxuICAgICAgICAgIHNlYXJjaFRlcm06ICdkaWZmZXJlbnQgc2VhcmNoJyxcbiAgICAgICAgICBpc1VzZXJuYW1lc0VuYWJsZWQ6IHRydWUsXG4gICAgICAgICAgdXVpZEZldGNoU3RhdGU6IHt9LFxuICAgICAgICB9KVxuICAgICAgKTtcbiAgICAgIGFzc2VydC5pc0ZhbHNlKFxuICAgICAgICBoZWxwZXIuc2hvdWxkUmVjb21wdXRlUm93SGVpZ2h0cyh7XG4gICAgICAgICAgY29tcG9zZUNvbnRhY3RzOiBbXSxcbiAgICAgICAgICBjb21wb3NlR3JvdXBzOiBbXSxcbiAgICAgICAgICByZWdpb25Db2RlOiAnVVMnLFxuICAgICAgICAgIHNlYXJjaFRlcm06ICdsYXN0IHNlYXJjaCcsXG4gICAgICAgICAgaXNVc2VybmFtZXNFbmFibGVkOiB0cnVlLFxuICAgICAgICAgIHV1aWRGZXRjaFN0YXRlOiB7fSxcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyB0cnVlIGlmIFwiRmluZCBieSB1c2VybmFtZXNcIiBoZWFkZXIgY2hhbmdlcyBsb2NhdGlvbiBvciBnb2VzIGF3YXknLCAoKSA9PiB7XG4gICAgICBjb25zdCBoZWxwZXIgPSBuZXcgTGVmdFBhbmVDb21wb3NlSGVscGVyKHtcbiAgICAgICAgY29tcG9zZUNvbnRhY3RzOiBbZ2V0RGVmYXVsdENvbnZlcnNhdGlvbigpLCBnZXREZWZhdWx0Q29udmVyc2F0aW9uKCldLFxuICAgICAgICBjb21wb3NlR3JvdXBzOiBbXSxcbiAgICAgICAgcmVnaW9uQ29kZTogJ1VTJyxcbiAgICAgICAgc2VhcmNoVGVybTogJycsXG4gICAgICAgIGlzVXNlcm5hbWVzRW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgdXVpZEZldGNoU3RhdGU6IHt9LFxuICAgICAgfSk7XG5cbiAgICAgIGFzc2VydC5pc0ZhbHNlKFxuICAgICAgICBoZWxwZXIuc2hvdWxkUmVjb21wdXRlUm93SGVpZ2h0cyh7XG4gICAgICAgICAgY29tcG9zZUNvbnRhY3RzOiBbZ2V0RGVmYXVsdENvbnZlcnNhdGlvbigpXSxcbiAgICAgICAgICBjb21wb3NlR3JvdXBzOiBbXSxcbiAgICAgICAgICByZWdpb25Db2RlOiAnVVMnLFxuICAgICAgICAgIHNlYXJjaFRlcm06ICcnLFxuICAgICAgICAgIGlzVXNlcm5hbWVzRW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgICB1dWlkRmV0Y2hTdGF0ZToge30sXG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgdHJ1ZSBpZiBzZWFyY2ggY2hhbmdlcyBvciBiZWNvbWVzIGFuIGUxNjQnLCAoKSA9PiB7XG4gICAgICBjb25zdCBoZWxwZXIgPSBuZXcgTGVmdFBhbmVDb21wb3NlSGVscGVyKHtcbiAgICAgICAgY29tcG9zZUNvbnRhY3RzOiBbZ2V0RGVmYXVsdENvbnZlcnNhdGlvbigpLCBnZXREZWZhdWx0Q29udmVyc2F0aW9uKCldLFxuICAgICAgICBjb21wb3NlR3JvdXBzOiBbXSxcbiAgICAgICAgcmVnaW9uQ29kZTogJ1VTJyxcbiAgICAgICAgc2VhcmNoVGVybTogJ2ZvbyBiYXInLFxuICAgICAgICBpc1VzZXJuYW1lc0VuYWJsZWQ6IHRydWUsXG4gICAgICAgIHV1aWRGZXRjaFN0YXRlOiB7fSxcbiAgICAgIH0pO1xuXG4gICAgICBhc3NlcnQuaXNUcnVlKFxuICAgICAgICBoZWxwZXIuc2hvdWxkUmVjb21wdXRlUm93SGVpZ2h0cyh7XG4gICAgICAgICAgY29tcG9zZUNvbnRhY3RzOiBbZ2V0RGVmYXVsdENvbnZlcnNhdGlvbigpLCBnZXREZWZhdWx0Q29udmVyc2F0aW9uKCldLFxuICAgICAgICAgIGNvbXBvc2VHcm91cHM6IFtdLFxuICAgICAgICAgIHJlZ2lvbkNvZGU6ICdVUycsXG4gICAgICAgICAgc2VhcmNoVGVybTogJycsXG4gICAgICAgICAgaXNVc2VybmFtZXNFbmFibGVkOiB0cnVlLFxuICAgICAgICAgIHV1aWRGZXRjaFN0YXRlOiB7fSxcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgICBhc3NlcnQuaXNUcnVlKFxuICAgICAgICBoZWxwZXIuc2hvdWxkUmVjb21wdXRlUm93SGVpZ2h0cyh7XG4gICAgICAgICAgY29tcG9zZUNvbnRhY3RzOiBbZ2V0RGVmYXVsdENvbnZlcnNhdGlvbigpLCBnZXREZWZhdWx0Q29udmVyc2F0aW9uKCldLFxuICAgICAgICAgIGNvbXBvc2VHcm91cHM6IFtdLFxuICAgICAgICAgIHJlZ2lvbkNvZGU6ICdVUycsXG4gICAgICAgICAgc2VhcmNoVGVybTogJysxNjUwNTU1MTIzNCcsXG4gICAgICAgICAgaXNVc2VybmFtZXNFbmFibGVkOiB0cnVlLFxuICAgICAgICAgIHV1aWRGZXRjaFN0YXRlOiB7fSxcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyB0cnVlIGlmIGdvaW5nIGZyb20gbm8gc2VhcmNoIHRvIHNvbWUgc2VhcmNoIChzaG93aW5nIFwiRmluZCBieSB1c2VybmFtZVwiIHNlY3Rpb24pJywgKCkgPT4ge1xuICAgICAgY29uc3QgaGVscGVyID0gbmV3IExlZnRQYW5lQ29tcG9zZUhlbHBlcih7XG4gICAgICAgIGNvbXBvc2VDb250YWN0czogW2dldERlZmF1bHRDb252ZXJzYXRpb24oKSwgZ2V0RGVmYXVsdENvbnZlcnNhdGlvbigpXSxcbiAgICAgICAgY29tcG9zZUdyb3VwczogW10sXG4gICAgICAgIHJlZ2lvbkNvZGU6ICdVUycsXG4gICAgICAgIHNlYXJjaFRlcm06ICcnLFxuICAgICAgICBpc1VzZXJuYW1lc0VuYWJsZWQ6IHRydWUsXG4gICAgICAgIHV1aWRGZXRjaFN0YXRlOiB7fSxcbiAgICAgIH0pO1xuXG4gICAgICBhc3NlcnQuaXNUcnVlKFxuICAgICAgICBoZWxwZXIuc2hvdWxkUmVjb21wdXRlUm93SGVpZ2h0cyh7XG4gICAgICAgICAgY29tcG9zZUNvbnRhY3RzOiBbZ2V0RGVmYXVsdENvbnZlcnNhdGlvbigpLCBnZXREZWZhdWx0Q29udmVyc2F0aW9uKCldLFxuICAgICAgICAgIGNvbXBvc2VHcm91cHM6IFtdLFxuICAgICAgICAgIHJlZ2lvbkNvZGU6ICdVUycsXG4gICAgICAgICAgc2VhcmNoVGVybTogJ2ZvbyBiYXInLFxuICAgICAgICAgIGlzVXNlcm5hbWVzRW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgICB1dWlkRmV0Y2hTdGF0ZToge30sXG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBiZSB0cnVlIGlmIGdvaW5nIGZyb20gY29udGFjdCB0byBncm91cCBvciB2aWNlIHZlcnNhJywgKCkgPT4ge1xuICAgICAgY29uc3QgaGVscGVyQ29udGFjdHMgPSBuZXcgTGVmdFBhbmVDb21wb3NlSGVscGVyKHtcbiAgICAgICAgY29tcG9zZUNvbnRhY3RzOiBbZ2V0RGVmYXVsdENvbnZlcnNhdGlvbigpLCBnZXREZWZhdWx0Q29udmVyc2F0aW9uKCldLFxuICAgICAgICBjb21wb3NlR3JvdXBzOiBbXSxcbiAgICAgICAgcmVnaW9uQ29kZTogJ1VTJyxcbiAgICAgICAgc2VhcmNoVGVybTogJ2ZvbyBiYXInLFxuICAgICAgICBpc1VzZXJuYW1lc0VuYWJsZWQ6IHRydWUsXG4gICAgICAgIHV1aWRGZXRjaFN0YXRlOiB7fSxcbiAgICAgIH0pO1xuXG4gICAgICBhc3NlcnQuaXNUcnVlKFxuICAgICAgICBoZWxwZXJDb250YWN0cy5zaG91bGRSZWNvbXB1dGVSb3dIZWlnaHRzKHtcbiAgICAgICAgICBjb21wb3NlQ29udGFjdHM6IFtdLFxuICAgICAgICAgIGNvbXBvc2VHcm91cHM6IFtnZXREZWZhdWx0Q29udmVyc2F0aW9uKCksIGdldERlZmF1bHRDb252ZXJzYXRpb24oKV0sXG4gICAgICAgICAgcmVnaW9uQ29kZTogJ1VTJyxcbiAgICAgICAgICBzZWFyY2hUZXJtOiAnZm9vIGJhcicsXG4gICAgICAgICAgaXNVc2VybmFtZXNFbmFibGVkOiB0cnVlLFxuICAgICAgICAgIHV1aWRGZXRjaFN0YXRlOiB7fSxcbiAgICAgICAgfSlcbiAgICAgICk7XG5cbiAgICAgIGNvbnN0IGhlbHBlckdyb3VwcyA9IG5ldyBMZWZ0UGFuZUNvbXBvc2VIZWxwZXIoe1xuICAgICAgICBjb21wb3NlQ29udGFjdHM6IFtdLFxuICAgICAgICBjb21wb3NlR3JvdXBzOiBbZ2V0RGVmYXVsdENvbnZlcnNhdGlvbigpLCBnZXREZWZhdWx0Q29udmVyc2F0aW9uKCldLFxuICAgICAgICByZWdpb25Db2RlOiAnVVMnLFxuICAgICAgICBzZWFyY2hUZXJtOiAnZm9vIGJhcicsXG4gICAgICAgIGlzVXNlcm5hbWVzRW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgdXVpZEZldGNoU3RhdGU6IHt9LFxuICAgICAgfSk7XG5cbiAgICAgIGFzc2VydC5pc1RydWUoXG4gICAgICAgIGhlbHBlckdyb3Vwcy5zaG91bGRSZWNvbXB1dGVSb3dIZWlnaHRzKHtcbiAgICAgICAgICBjb21wb3NlQ29udGFjdHM6IFtnZXREZWZhdWx0Q29udmVyc2F0aW9uKCksIGdldERlZmF1bHRDb252ZXJzYXRpb24oKV0sXG4gICAgICAgICAgY29tcG9zZUdyb3VwczogW10sXG4gICAgICAgICAgcmVnaW9uQ29kZTogJ1VTJyxcbiAgICAgICAgICBzZWFyY2hUZXJtOiAnZm9vIGJhcicsXG4gICAgICAgICAgaXNVc2VybmFtZXNFbmFibGVkOiB0cnVlLFxuICAgICAgICAgIHV1aWRGZXRjaFN0YXRlOiB7fSxcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIGJlIHRydWUgaWYgdGhlIGhlYWRlcnMgYXJlIGluIGRpZmZlcmVudCByb3cgaW5kaWNlcyBhcyBiZWZvcmUnLCAoKSA9PiB7XG4gICAgICBjb25zdCBoZWxwZXJDb250YWN0cyA9IG5ldyBMZWZ0UGFuZUNvbXBvc2VIZWxwZXIoe1xuICAgICAgICBjb21wb3NlQ29udGFjdHM6IFtnZXREZWZhdWx0Q29udmVyc2F0aW9uKCksIGdldERlZmF1bHRDb252ZXJzYXRpb24oKV0sXG4gICAgICAgIGNvbXBvc2VHcm91cHM6IFtnZXREZWZhdWx0Q29udmVyc2F0aW9uKCldLFxuICAgICAgICByZWdpb25Db2RlOiAnVVMnLFxuICAgICAgICBzZWFyY2hUZXJtOiAnc291cCcsXG4gICAgICAgIGlzVXNlcm5hbWVzRW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgdXVpZEZldGNoU3RhdGU6IHt9LFxuICAgICAgfSk7XG5cbiAgICAgIGFzc2VydC5pc1RydWUoXG4gICAgICAgIGhlbHBlckNvbnRhY3RzLnNob3VsZFJlY29tcHV0ZVJvd0hlaWdodHMoe1xuICAgICAgICAgIGNvbXBvc2VDb250YWN0czogW2dldERlZmF1bHRDb252ZXJzYXRpb24oKV0sXG4gICAgICAgICAgY29tcG9zZUdyb3VwczogW2dldERlZmF1bHRDb252ZXJzYXRpb24oKSwgZ2V0RGVmYXVsdENvbnZlcnNhdGlvbigpXSxcbiAgICAgICAgICByZWdpb25Db2RlOiAnVVMnLFxuICAgICAgICAgIHNlYXJjaFRlcm06ICdzb3VwJyxcbiAgICAgICAgICBpc1VzZXJuYW1lc0VuYWJsZWQ6IHRydWUsXG4gICAgICAgICAgdXVpZEZldGNoU3RhdGU6IHt9LFxuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9KTtcbiAgfSk7XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7OztBQUdBLGtCQUF1QjtBQUN2QixZQUF1QjtBQUN2Qiw4QkFBd0I7QUFDeEIsNEJBQThCO0FBQzlCLG9DQUF1QztBQUV2QyxtQ0FBc0M7QUFFdEMsU0FBUyx5QkFBeUIsTUFBTTtBQUN0QyxNQUFJO0FBRUosYUFBVyxNQUFNO0FBQ2YsbUJBQWUsTUFBTSxjQUFjO0FBQUEsRUFDckMsQ0FBQztBQUVELFlBQVUsTUFBTTtBQUNkLGlCQUFhLFFBQVE7QUFBQSxFQUN2QixDQUFDO0FBRUQsV0FBUyxpQkFBaUIsTUFBTTtBQUM5QixPQUFHLG1DQUFtQyxNQUFNO0FBQzFDLFlBQU0sWUFBWSxNQUFNLEtBQUs7QUFDN0IsWUFBTSxTQUFTLElBQUksbURBQXNCO0FBQUEsUUFDdkMsaUJBQWlCLENBQUM7QUFBQSxRQUNsQixlQUFlLENBQUM7QUFBQSxRQUNoQixZQUFZO0FBQUEsUUFDWixZQUFZO0FBQUEsUUFDWixvQkFBb0I7QUFBQSxRQUNwQixnQkFBZ0IsQ0FBQztBQUFBLE1BQ25CLENBQUM7QUFFRCx5QkFBTyxZQUFZLE9BQU8sY0FBYyxFQUFFLFVBQVUsQ0FBQyxHQUFHLFNBQVM7QUFBQSxJQUNuRSxDQUFDO0FBQUEsRUFDSCxDQUFDO0FBRUQsV0FBUyxlQUFlLE1BQU07QUFDNUIsT0FBRyxxRkFBcUYsTUFBTTtBQUM1Rix5QkFBTyxZQUNMLElBQUksbURBQXNCO0FBQUEsUUFDeEIsaUJBQWlCLENBQUM7QUFBQSxRQUNsQixlQUFlLENBQUM7QUFBQSxRQUNoQixZQUFZO0FBQUEsUUFDWixZQUFZO0FBQUEsUUFDWixvQkFBb0I7QUFBQSxRQUNwQixnQkFBZ0IsQ0FBQztBQUFBLE1BQ25CLENBQUMsRUFBRSxZQUFZLEdBQ2YsQ0FDRjtBQUFBLElBQ0YsQ0FBQztBQUVELE9BQUcsK0ZBQStGLE1BQU07QUFDdEcseUJBQU8sWUFDTCxJQUFJLG1EQUFzQjtBQUFBLFFBQ3hCLGlCQUFpQixDQUFDLDBEQUF1QixHQUFHLDBEQUF1QixDQUFDO0FBQUEsUUFDcEUsZUFBZSxDQUFDO0FBQUEsUUFDaEIsWUFBWTtBQUFBLFFBQ1osWUFBWTtBQUFBLFFBQ1osb0JBQW9CO0FBQUEsUUFDcEIsZ0JBQWdCLENBQUM7QUFBQSxNQUNuQixDQUFDLEVBQUUsWUFBWSxHQUNmLENBQ0Y7QUFBQSxJQUNGLENBQUM7QUFFRCxPQUFHLHVIQUF1SCxNQUFNO0FBQzlILHlCQUFPLFlBQ0wsSUFBSSxtREFBc0I7QUFBQSxRQUN4QixpQkFBaUIsQ0FBQywwREFBdUIsR0FBRywwREFBdUIsQ0FBQztBQUFBLFFBQ3BFLGVBQWUsQ0FBQywwREFBdUIsR0FBRywwREFBdUIsQ0FBQztBQUFBLFFBQ2xFLFlBQVk7QUFBQSxRQUNaLFlBQVk7QUFBQSxRQUNaLG9CQUFvQjtBQUFBLFFBQ3BCLGdCQUFnQixDQUFDO0FBQUEsTUFDbkIsQ0FBQyxFQUFFLFlBQVksR0FDZixDQUNGO0FBQUEsSUFDRixDQUFDO0FBRUQsT0FBRyxnRkFBZ0YsTUFBTTtBQUN2Rix5QkFBTyxZQUNMLElBQUksbURBQXNCO0FBQUEsUUFDeEIsaUJBQWlCLENBQUMsMERBQXVCLEdBQUcsMERBQXVCLENBQUM7QUFBQSxRQUNwRSxlQUFlLENBQUMsMERBQXVCLEdBQUcsMERBQXVCLENBQUM7QUFBQSxRQUNsRSxZQUFZO0FBQUEsUUFDWixZQUFZO0FBQUEsUUFDWixvQkFBb0I7QUFBQSxRQUNwQixnQkFBZ0IsQ0FBQztBQUFBLE1BQ25CLENBQUMsRUFBRSxZQUFZLEdBQ2YsQ0FDRjtBQUFBLElBQ0YsQ0FBQztBQUVELE9BQUcsc0RBQXNELE1BQU07QUFDN0QseUJBQU8sWUFDTCxJQUFJLG1EQUFzQjtBQUFBLFFBQ3hCLGlCQUFpQixDQUFDLDBEQUF1QixHQUFHLDBEQUF1QixDQUFDO0FBQUEsUUFDcEUsZUFBZSxDQUFDLDBEQUF1QixHQUFHLDBEQUF1QixDQUFDO0FBQUEsUUFDbEUsWUFBWTtBQUFBLFFBQ1osWUFBWTtBQUFBLFFBQ1osb0JBQW9CO0FBQUEsUUFDcEIsZ0JBQWdCLENBQUM7QUFBQSxNQUNuQixDQUFDLEVBQUUsWUFBWSxHQUNmLENBQ0Y7QUFBQSxJQUNGLENBQUM7QUFFRCxPQUFHLGlGQUFpRixNQUFNO0FBQ3hGLHlCQUFPLFlBQ0wsSUFBSSxtREFBc0I7QUFBQSxRQUN4QixpQkFBaUIsQ0FBQztBQUFBLFFBQ2xCLGVBQWUsQ0FBQztBQUFBLFFBQ2hCLFlBQVk7QUFBQSxRQUNaLFlBQVk7QUFBQSxRQUNaLG9CQUFvQjtBQUFBLFFBQ3BCLGdCQUFnQixDQUFDO0FBQUEsTUFDbkIsQ0FBQyxFQUFFLFlBQVksR0FDZixDQUNGO0FBQ0EseUJBQU8sWUFDTCxJQUFJLG1EQUFzQjtBQUFBLFFBQ3hCLGlCQUFpQixDQUFDLDBEQUF1QixHQUFHLDBEQUF1QixDQUFDO0FBQUEsUUFDcEUsZUFBZSxDQUFDO0FBQUEsUUFDaEIsWUFBWTtBQUFBLFFBQ1osWUFBWTtBQUFBLFFBQ1osb0JBQW9CO0FBQUEsUUFDcEIsZ0JBQWdCLENBQUM7QUFBQSxNQUNuQixDQUFDLEVBQUUsWUFBWSxHQUNmLENBQ0Y7QUFDQSx5QkFBTyxZQUNMLElBQUksbURBQXNCO0FBQUEsUUFDeEIsaUJBQWlCLENBQUMsMERBQXVCLEdBQUcsMERBQXVCLENBQUM7QUFBQSxRQUNwRSxlQUFlLENBQUMsMERBQXVCLENBQUM7QUFBQSxRQUN4QyxZQUFZO0FBQUEsUUFDWixZQUFZO0FBQUEsUUFDWixvQkFBb0I7QUFBQSxRQUNwQixnQkFBZ0IsQ0FBQztBQUFBLE1BQ25CLENBQUMsRUFBRSxZQUFZLEdBQ2YsQ0FDRjtBQUFBLElBQ0YsQ0FBQztBQUVELE9BQUcsd0dBQXdHLE1BQU07QUFDL0cseUJBQU8sWUFDTCxJQUFJLG1EQUFzQjtBQUFBLFFBQ3hCLGlCQUFpQixDQUFDO0FBQUEsUUFDbEIsZUFBZSxDQUFDO0FBQUEsUUFDaEIsWUFBWTtBQUFBLFFBQ1osWUFBWTtBQUFBLFFBQ1osb0JBQW9CO0FBQUEsUUFDcEIsZ0JBQWdCLENBQUM7QUFBQSxNQUNuQixDQUFDLEVBQUUsWUFBWSxHQUNmLENBQ0Y7QUFBQSxJQUNGLENBQUM7QUFFRCxPQUFHLHlDQUF5QyxNQUFNO0FBQ2hELHlCQUFPLFlBQ0wsSUFBSSxtREFBc0I7QUFBQSxRQUN4QixpQkFBaUIsQ0FBQztBQUFBLFFBQ2xCLGVBQWUsQ0FBQztBQUFBLFFBQ2hCLFlBQVk7QUFBQSxRQUNaLFlBQVk7QUFBQSxRQUNaLG9CQUFvQjtBQUFBLFFBQ3BCLGdCQUFnQixDQUFDO0FBQUEsTUFDbkIsQ0FBQyxFQUFFLFlBQVksR0FDZixDQUNGO0FBQUEsSUFDRixDQUFDO0FBRUQsT0FBRywySEFBMkgsTUFBTTtBQUNsSSx5QkFBTyxZQUNMLElBQUksbURBQXNCO0FBQUEsUUFDeEIsaUJBQWlCLENBQUMsMERBQXVCLEdBQUcsMERBQXVCLENBQUM7QUFBQSxRQUNwRSxlQUFlLENBQUM7QUFBQSxRQUNoQixZQUFZO0FBQUEsUUFDWixZQUFZO0FBQUEsUUFDWixvQkFBb0I7QUFBQSxRQUNwQixnQkFBZ0IsQ0FBQztBQUFBLE1BQ25CLENBQUMsRUFBRSxZQUFZLEdBQ2YsQ0FDRjtBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0gsQ0FBQztBQUVELFdBQVMsVUFBVSxNQUFNO0FBQ3ZCLE9BQUcsMkVBQTJFLE1BQU07QUFDbEYsWUFBTSxTQUFTLElBQUksbURBQXNCO0FBQUEsUUFDdkMsaUJBQWlCLENBQUM7QUFBQSxRQUNsQixlQUFlLENBQUM7QUFBQSxRQUNoQixZQUFZO0FBQUEsUUFDWixZQUFZO0FBQUEsUUFDWixvQkFBb0I7QUFBQSxRQUNwQixnQkFBZ0IsQ0FBQztBQUFBLE1BQ25CLENBQUM7QUFFRCx5QkFBTyxVQUFVLE9BQU8sT0FBTyxDQUFDLEdBQUc7QUFBQSxRQUNqQyxNQUFNLGdDQUFRO0FBQUEsTUFDaEIsQ0FBQztBQUNELHlCQUFPLFlBQVksT0FBTyxPQUFPLENBQUMsQ0FBQztBQUFBLElBQ3JDLENBQUM7QUFFRCxPQUFHLHlFQUF5RSxNQUFNO0FBQ2hGLFlBQU0sa0JBQWtCO0FBQUEsUUFDdEIsMERBQXVCO0FBQUEsUUFDdkIsMERBQXVCO0FBQUEsTUFDekI7QUFDQSxZQUFNLFNBQVMsSUFBSSxtREFBc0I7QUFBQSxRQUN2QztBQUFBLFFBQ0EsZUFBZSxDQUFDO0FBQUEsUUFDaEIsWUFBWTtBQUFBLFFBQ1osWUFBWTtBQUFBLFFBQ1osb0JBQW9CO0FBQUEsUUFDcEIsZ0JBQWdCLENBQUM7QUFBQSxNQUNuQixDQUFDO0FBRUQseUJBQU8sVUFBVSxPQUFPLE9BQU8sQ0FBQyxHQUFHO0FBQUEsUUFDakMsTUFBTSxnQ0FBUTtBQUFBLE1BQ2hCLENBQUM7QUFDRCx5QkFBTyxVQUFVLE9BQU8sT0FBTyxDQUFDLEdBQUc7QUFBQSxRQUNqQyxNQUFNLGdDQUFRO0FBQUEsUUFDZCxTQUFTO0FBQUEsTUFDWCxDQUFDO0FBQ0QseUJBQU8sVUFBVSxPQUFPLE9BQU8sQ0FBQyxHQUFHO0FBQUEsUUFDakMsTUFBTSxnQ0FBUTtBQUFBLFFBQ2QsU0FBUyxnQkFBZ0I7QUFBQSxNQUMzQixDQUFDO0FBQ0QseUJBQU8sVUFBVSxPQUFPLE9BQU8sQ0FBQyxHQUFHO0FBQUEsUUFDakMsTUFBTSxnQ0FBUTtBQUFBLFFBQ2QsU0FBUyxnQkFBZ0I7QUFBQSxNQUMzQixDQUFDO0FBQUEsSUFDSCxDQUFDO0FBRUQsT0FBRyxtR0FBbUcsTUFBTTtBQUMxRyxZQUFNLGtCQUFrQjtBQUFBLFFBQ3RCLDBEQUF1QjtBQUFBLFFBQ3ZCLDBEQUF1QjtBQUFBLE1BQ3pCO0FBQ0EsWUFBTSxnQkFBZ0I7QUFBQSxRQUNwQiwwREFBdUI7QUFBQSxRQUN2QiwwREFBdUI7QUFBQSxNQUN6QjtBQUNBLFlBQU0sU0FBUyxJQUFJLG1EQUFzQjtBQUFBLFFBQ3ZDO0FBQUEsUUFDQTtBQUFBLFFBQ0EsWUFBWTtBQUFBLFFBQ1osWUFBWTtBQUFBLFFBQ1osb0JBQW9CO0FBQUEsUUFDcEIsZ0JBQWdCLENBQUM7QUFBQSxNQUNuQixDQUFDO0FBRUQseUJBQU8sVUFBVSxPQUFPLE9BQU8sQ0FBQyxHQUFHO0FBQUEsUUFDakMsTUFBTSxnQ0FBUTtBQUFBLE1BQ2hCLENBQUM7QUFDRCx5QkFBTyxVQUFVLE9BQU8sT0FBTyxDQUFDLEdBQUc7QUFBQSxRQUNqQyxNQUFNLGdDQUFRO0FBQUEsUUFDZCxTQUFTO0FBQUEsTUFDWCxDQUFDO0FBQ0QseUJBQU8sVUFBVSxPQUFPLE9BQU8sQ0FBQyxHQUFHO0FBQUEsUUFDakMsTUFBTSxnQ0FBUTtBQUFBLFFBQ2QsU0FBUyxnQkFBZ0I7QUFBQSxNQUMzQixDQUFDO0FBQ0QseUJBQU8sVUFBVSxPQUFPLE9BQU8sQ0FBQyxHQUFHO0FBQUEsUUFDakMsTUFBTSxnQ0FBUTtBQUFBLFFBQ2QsU0FBUyxnQkFBZ0I7QUFBQSxNQUMzQixDQUFDO0FBQ0QseUJBQU8sVUFBVSxPQUFPLE9BQU8sQ0FBQyxHQUFHO0FBQUEsUUFDakMsTUFBTSxnQ0FBUTtBQUFBLFFBQ2QsU0FBUztBQUFBLE1BQ1gsQ0FBQztBQUNELHlCQUFPLFVBQVUsT0FBTyxPQUFPLENBQUMsR0FBRztBQUFBLFFBQ2pDLE1BQU0sZ0NBQVE7QUFBQSxRQUNkLGNBQWMsY0FBYztBQUFBLE1BQzlCLENBQUM7QUFDRCx5QkFBTyxVQUFVLE9BQU8sT0FBTyxDQUFDLEdBQUc7QUFBQSxRQUNqQyxNQUFNLGdDQUFRO0FBQUEsUUFDZCxjQUFjLGNBQWM7QUFBQSxNQUM5QixDQUFDO0FBQUEsSUFDSCxDQUFDO0FBRUQsT0FBRyx3RUFBd0UsTUFBTTtBQUMvRSxZQUFNLFNBQVMsSUFBSSxtREFBc0I7QUFBQSxRQUN2QyxpQkFBaUIsQ0FBQztBQUFBLFFBQ2xCLGVBQWUsQ0FBQztBQUFBLFFBQ2hCLFlBQVk7QUFBQSxRQUNaLFlBQVk7QUFBQSxRQUNaLG9CQUFvQjtBQUFBLFFBQ3BCLGdCQUFnQixDQUFDO0FBQUEsTUFDbkIsQ0FBQztBQUVELHlCQUFPLFlBQVksT0FBTyxPQUFPLENBQUMsQ0FBQztBQUNuQyx5QkFBTyxZQUFZLE9BQU8sT0FBTyxDQUFDLENBQUM7QUFBQSxJQUNyQyxDQUFDO0FBRUQsT0FBRyw0Q0FBNEMsTUFBTTtBQUNuRCxZQUFNLGtCQUFrQjtBQUFBLFFBQ3RCLDBEQUF1QjtBQUFBLFFBQ3ZCLDBEQUF1QjtBQUFBLE1BQ3pCO0FBQ0EsWUFBTSxTQUFTLElBQUksbURBQXNCO0FBQUEsUUFDdkM7QUFBQSxRQUNBLGVBQWUsQ0FBQztBQUFBLFFBQ2hCLFlBQVk7QUFBQSxRQUNaLFlBQVk7QUFBQSxRQUNaLG9CQUFvQjtBQUFBLFFBQ3BCLGdCQUFnQixDQUFDO0FBQUEsTUFDbkIsQ0FBQztBQUVELHlCQUFPLFVBQVUsT0FBTyxPQUFPLENBQUMsR0FBRztBQUFBLFFBQ2pDLE1BQU0sZ0NBQVE7QUFBQSxRQUNkLFNBQVMsZ0JBQWdCO0FBQUEsTUFDM0IsQ0FBQztBQUNELHlCQUFPLFVBQVUsT0FBTyxPQUFPLENBQUMsR0FBRztBQUFBLFFBQ2pDLE1BQU0sZ0NBQVE7QUFBQSxRQUNkLFNBQVMsZ0JBQWdCO0FBQUEsTUFDM0IsQ0FBQztBQUFBLElBQ0gsQ0FBQztBQUVELE9BQUcsbUdBQW1HLE1BQU07QUFDMUcsWUFBTSxTQUFTLElBQUksbURBQXNCO0FBQUEsUUFDdkMsaUJBQWlCLENBQUM7QUFBQSxRQUNsQixlQUFlLENBQUM7QUFBQSxRQUNoQixZQUFZO0FBQUEsUUFDWixZQUFZO0FBQUEsUUFDWixvQkFBb0I7QUFBQSxRQUNwQixnQkFBZ0IsQ0FBQztBQUFBLE1BQ25CLENBQUM7QUFFRCx5QkFBTyxVQUFVLE9BQU8sT0FBTyxDQUFDLEdBQUc7QUFBQSxRQUNqQyxNQUFNLGdDQUFRO0FBQUEsUUFDZCxTQUFTO0FBQUEsTUFDWCxDQUFDO0FBQ0QseUJBQU8sVUFBVSxPQUFPLE9BQU8sQ0FBQyxHQUFHO0FBQUEsUUFDakMsTUFBTSxnQ0FBUTtBQUFBLFFBQ2QsYUFBYTtBQUFBLFVBQ1gsU0FBUztBQUFBLFVBQ1QsV0FBVztBQUFBLFVBQ1gsTUFBTTtBQUFBLFFBQ1I7QUFBQSxRQUNBLFlBQVk7QUFBQSxNQUNkLENBQUM7QUFDRCx5QkFBTyxZQUFZLE9BQU8sT0FBTyxDQUFDLENBQUM7QUFBQSxJQUNyQyxDQUFDO0FBRUQsT0FBRywwREFBMEQsTUFBTTtBQUNqRSxZQUFNLFdBQVc7QUFFakIsWUFBTSxTQUFTLElBQUksbURBQXNCO0FBQUEsUUFDdkMsaUJBQWlCLENBQUM7QUFBQSxRQUNsQixlQUFlLENBQUM7QUFBQSxRQUNoQixZQUFZO0FBQUEsUUFDWixZQUFZO0FBQUEsUUFDWixvQkFBb0I7QUFBQSxRQUNwQixnQkFBZ0I7QUFBQSxXQUNiLFlBQVksYUFBYTtBQUFBLFFBQzVCO0FBQUEsTUFDRixDQUFDO0FBRUQseUJBQU8sVUFBVSxPQUFPLE9BQU8sQ0FBQyxHQUFHO0FBQUEsUUFDakMsTUFBTSxnQ0FBUTtBQUFBLFFBQ2QsU0FBUztBQUFBLE1BQ1gsQ0FBQztBQUNELHlCQUFPLFVBQVUsT0FBTyxPQUFPLENBQUMsR0FBRztBQUFBLFFBQ2pDLE1BQU0sZ0NBQVE7QUFBQSxRQUNkO0FBQUEsUUFDQSxvQkFBb0I7QUFBQSxNQUN0QixDQUFDO0FBQ0QseUJBQU8sWUFBWSxPQUFPLE9BQU8sQ0FBQyxDQUFDO0FBQUEsSUFDckMsQ0FBQztBQUVELE9BQUcsa0dBQWtHLE1BQU07QUFDekcsWUFBTSxrQkFBa0I7QUFBQSxRQUN0QiwwREFBdUI7QUFBQSxRQUN2QiwwREFBdUI7QUFBQSxNQUN6QjtBQUNBLFlBQU0sU0FBUyxJQUFJLG1EQUFzQjtBQUFBLFFBQ3ZDO0FBQUEsUUFDQSxlQUFlLENBQUM7QUFBQSxRQUNoQixZQUFZO0FBQUEsUUFDWixZQUFZO0FBQUEsUUFDWixvQkFBb0I7QUFBQSxRQUNwQixnQkFBZ0IsQ0FBQztBQUFBLE1BQ25CLENBQUM7QUFFRCx5QkFBTyxVQUFVLE9BQU8sT0FBTyxDQUFDLEdBQUc7QUFBQSxRQUNqQyxNQUFNLGdDQUFRO0FBQUEsUUFDZCxTQUFTO0FBQUEsTUFDWCxDQUFDO0FBQ0QseUJBQU8sVUFBVSxPQUFPLE9BQU8sQ0FBQyxHQUFHO0FBQUEsUUFDakMsTUFBTSxnQ0FBUTtBQUFBLFFBQ2QsU0FBUyxnQkFBZ0I7QUFBQSxNQUMzQixDQUFDO0FBQ0QseUJBQU8sVUFBVSxPQUFPLE9BQU8sQ0FBQyxHQUFHO0FBQUEsUUFDakMsTUFBTSxnQ0FBUTtBQUFBLFFBQ2QsU0FBUyxnQkFBZ0I7QUFBQSxNQUMzQixDQUFDO0FBQ0QseUJBQU8sVUFBVSxPQUFPLE9BQU8sQ0FBQyxHQUFHO0FBQUEsUUFDakMsTUFBTSxnQ0FBUTtBQUFBLFFBQ2QsU0FBUztBQUFBLE1BQ1gsQ0FBQztBQUNELHlCQUFPLFVBQVUsT0FBTyxPQUFPLENBQUMsR0FBRztBQUFBLFFBQ2pDLE1BQU0sZ0NBQVE7QUFBQSxRQUNkLGFBQWE7QUFBQSxVQUNYLFNBQVM7QUFBQSxVQUNULFdBQVc7QUFBQSxVQUNYLE1BQU07QUFBQSxRQUNSO0FBQUEsUUFDQSxZQUFZO0FBQUEsTUFDZCxDQUFDO0FBQUEsSUFDSCxDQUFDO0FBQUEsRUFDSCxDQUFDO0FBRUQsV0FBUyxvQ0FBb0MsTUFBTTtBQUNqRCxPQUFHLGtFQUFrRSxNQUFNO0FBQ3pFLFlBQU0sU0FBUyxJQUFJLG1EQUFzQjtBQUFBLFFBQ3ZDLGlCQUFpQixDQUFDLDBEQUF1QixHQUFHLDBEQUF1QixDQUFDO0FBQUEsUUFDcEUsZUFBZSxDQUFDO0FBQUEsUUFDaEIsWUFBWTtBQUFBLFFBQ1osWUFBWTtBQUFBLFFBQ1osb0JBQW9CO0FBQUEsUUFDcEIsZ0JBQWdCLENBQUM7QUFBQSxNQUNuQixDQUFDO0FBRUQseUJBQU8sWUFBWSxPQUFPLGlDQUFpQyxDQUFDLENBQUM7QUFBQSxJQUMvRCxDQUFDO0FBQUEsRUFDSCxDQUFDO0FBRUQsV0FBUyx3Q0FBd0MsTUFBTTtBQUNyRCxPQUFHLGtFQUFrRSxNQUFNO0FBQ3pFLFlBQU0sU0FBUyxJQUFJLG1EQUFzQjtBQUFBLFFBQ3ZDLGlCQUFpQixDQUFDLDBEQUF1QixHQUFHLDBEQUF1QixDQUFDO0FBQUEsUUFDcEUsZUFBZSxDQUFDO0FBQUEsUUFDaEIsWUFBWTtBQUFBLFFBQ1osWUFBWTtBQUFBLFFBQ1osb0JBQW9CO0FBQUEsUUFDcEIsZ0JBQWdCLENBQUM7QUFBQSxNQUNuQixDQUFDO0FBRUQseUJBQU8sWUFDTCxPQUFPLHFDQUNMLEVBQUUsV0FBVyxvQ0FBYyxNQUFNLFlBQVksTUFBTSxHQUNuRCxRQUNBLE1BQ0YsQ0FDRjtBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0gsQ0FBQztBQUVELFdBQVMsNkJBQTZCLE1BQU07QUFDMUMsT0FBRywwRkFBMEYsTUFBTTtBQUNqRyxZQUFNLFNBQVMsSUFBSSxtREFBc0I7QUFBQSxRQUN2QyxpQkFBaUIsQ0FBQztBQUFBLFFBQ2xCLGVBQWUsQ0FBQztBQUFBLFFBQ2hCLFlBQVk7QUFBQSxRQUNaLFlBQVk7QUFBQSxRQUNaLG9CQUFvQjtBQUFBLFFBQ3BCLGdCQUFnQixDQUFDO0FBQUEsTUFDbkIsQ0FBQztBQUVELHlCQUFPLFFBQ0wsT0FBTywwQkFBMEI7QUFBQSxRQUMvQixpQkFBaUIsQ0FBQztBQUFBLFFBQ2xCLGVBQWUsQ0FBQztBQUFBLFFBQ2hCLFlBQVk7QUFBQSxRQUNaLFlBQVk7QUFBQSxRQUNaLG9CQUFvQjtBQUFBLFFBQ3BCLGdCQUFnQixDQUFDO0FBQUEsTUFDbkIsQ0FBQyxDQUNIO0FBQ0EseUJBQU8sUUFDTCxPQUFPLDBCQUEwQjtBQUFBLFFBQy9CLGlCQUFpQixDQUFDO0FBQUEsUUFDbEIsZUFBZSxDQUFDO0FBQUEsUUFDaEIsWUFBWTtBQUFBLFFBQ1osWUFBWTtBQUFBLFFBQ1osb0JBQW9CO0FBQUEsUUFDcEIsZ0JBQWdCLENBQUM7QUFBQSxNQUNuQixDQUFDLENBQ0g7QUFBQSxJQUNGLENBQUM7QUFFRCxPQUFHLDRFQUE0RSxNQUFNO0FBQ25GLFlBQU0sU0FBUyxJQUFJLG1EQUFzQjtBQUFBLFFBQ3ZDLGlCQUFpQixDQUFDLDBEQUF1QixHQUFHLDBEQUF1QixDQUFDO0FBQUEsUUFDcEUsZUFBZSxDQUFDO0FBQUEsUUFDaEIsWUFBWTtBQUFBLFFBQ1osWUFBWTtBQUFBLFFBQ1osb0JBQW9CO0FBQUEsUUFDcEIsZ0JBQWdCLENBQUM7QUFBQSxNQUNuQixDQUFDO0FBRUQseUJBQU8sUUFDTCxPQUFPLDBCQUEwQjtBQUFBLFFBQy9CLGlCQUFpQixDQUFDLDBEQUF1QixDQUFDO0FBQUEsUUFDMUMsZUFBZSxDQUFDO0FBQUEsUUFDaEIsWUFBWTtBQUFBLFFBQ1osWUFBWTtBQUFBLFFBQ1osb0JBQW9CO0FBQUEsUUFDcEIsZ0JBQWdCLENBQUM7QUFBQSxNQUNuQixDQUFDLENBQ0g7QUFBQSxJQUNGLENBQUM7QUFFRCxPQUFHLHFEQUFxRCxNQUFNO0FBQzVELFlBQU0sU0FBUyxJQUFJLG1EQUFzQjtBQUFBLFFBQ3ZDLGlCQUFpQixDQUFDLDBEQUF1QixHQUFHLDBEQUF1QixDQUFDO0FBQUEsUUFDcEUsZUFBZSxDQUFDO0FBQUEsUUFDaEIsWUFBWTtBQUFBLFFBQ1osWUFBWTtBQUFBLFFBQ1osb0JBQW9CO0FBQUEsUUFDcEIsZ0JBQWdCLENBQUM7QUFBQSxNQUNuQixDQUFDO0FBRUQseUJBQU8sT0FDTCxPQUFPLDBCQUEwQjtBQUFBLFFBQy9CLGlCQUFpQixDQUFDLDBEQUF1QixHQUFHLDBEQUF1QixDQUFDO0FBQUEsUUFDcEUsZUFBZSxDQUFDO0FBQUEsUUFDaEIsWUFBWTtBQUFBLFFBQ1osWUFBWTtBQUFBLFFBQ1osb0JBQW9CO0FBQUEsUUFDcEIsZ0JBQWdCLENBQUM7QUFBQSxNQUNuQixDQUFDLENBQ0g7QUFDQSx5QkFBTyxPQUNMLE9BQU8sMEJBQTBCO0FBQUEsUUFDL0IsaUJBQWlCLENBQUMsMERBQXVCLEdBQUcsMERBQXVCLENBQUM7QUFBQSxRQUNwRSxlQUFlLENBQUM7QUFBQSxRQUNoQixZQUFZO0FBQUEsUUFDWixZQUFZO0FBQUEsUUFDWixvQkFBb0I7QUFBQSxRQUNwQixnQkFBZ0IsQ0FBQztBQUFBLE1BQ25CLENBQUMsQ0FDSDtBQUFBLElBQ0YsQ0FBQztBQUVELE9BQUcsNEZBQTRGLE1BQU07QUFDbkcsWUFBTSxTQUFTLElBQUksbURBQXNCO0FBQUEsUUFDdkMsaUJBQWlCLENBQUMsMERBQXVCLEdBQUcsMERBQXVCLENBQUM7QUFBQSxRQUNwRSxlQUFlLENBQUM7QUFBQSxRQUNoQixZQUFZO0FBQUEsUUFDWixZQUFZO0FBQUEsUUFDWixvQkFBb0I7QUFBQSxRQUNwQixnQkFBZ0IsQ0FBQztBQUFBLE1BQ25CLENBQUM7QUFFRCx5QkFBTyxPQUNMLE9BQU8sMEJBQTBCO0FBQUEsUUFDL0IsaUJBQWlCLENBQUMsMERBQXVCLEdBQUcsMERBQXVCLENBQUM7QUFBQSxRQUNwRSxlQUFlLENBQUM7QUFBQSxRQUNoQixZQUFZO0FBQUEsUUFDWixZQUFZO0FBQUEsUUFDWixvQkFBb0I7QUFBQSxRQUNwQixnQkFBZ0IsQ0FBQztBQUFBLE1BQ25CLENBQUMsQ0FDSDtBQUFBLElBQ0YsQ0FBQztBQUVELE9BQUcsK0RBQStELE1BQU07QUFDdEUsWUFBTSxpQkFBaUIsSUFBSSxtREFBc0I7QUFBQSxRQUMvQyxpQkFBaUIsQ0FBQywwREFBdUIsR0FBRywwREFBdUIsQ0FBQztBQUFBLFFBQ3BFLGVBQWUsQ0FBQztBQUFBLFFBQ2hCLFlBQVk7QUFBQSxRQUNaLFlBQVk7QUFBQSxRQUNaLG9CQUFvQjtBQUFBLFFBQ3BCLGdCQUFnQixDQUFDO0FBQUEsTUFDbkIsQ0FBQztBQUVELHlCQUFPLE9BQ0wsZUFBZSwwQkFBMEI7QUFBQSxRQUN2QyxpQkFBaUIsQ0FBQztBQUFBLFFBQ2xCLGVBQWUsQ0FBQywwREFBdUIsR0FBRywwREFBdUIsQ0FBQztBQUFBLFFBQ2xFLFlBQVk7QUFBQSxRQUNaLFlBQVk7QUFBQSxRQUNaLG9CQUFvQjtBQUFBLFFBQ3BCLGdCQUFnQixDQUFDO0FBQUEsTUFDbkIsQ0FBQyxDQUNIO0FBRUEsWUFBTSxlQUFlLElBQUksbURBQXNCO0FBQUEsUUFDN0MsaUJBQWlCLENBQUM7QUFBQSxRQUNsQixlQUFlLENBQUMsMERBQXVCLEdBQUcsMERBQXVCLENBQUM7QUFBQSxRQUNsRSxZQUFZO0FBQUEsUUFDWixZQUFZO0FBQUEsUUFDWixvQkFBb0I7QUFBQSxRQUNwQixnQkFBZ0IsQ0FBQztBQUFBLE1BQ25CLENBQUM7QUFFRCx5QkFBTyxPQUNMLGFBQWEsMEJBQTBCO0FBQUEsUUFDckMsaUJBQWlCLENBQUMsMERBQXVCLEdBQUcsMERBQXVCLENBQUM7QUFBQSxRQUNwRSxlQUFlLENBQUM7QUFBQSxRQUNoQixZQUFZO0FBQUEsUUFDWixZQUFZO0FBQUEsUUFDWixvQkFBb0I7QUFBQSxRQUNwQixnQkFBZ0IsQ0FBQztBQUFBLE1BQ25CLENBQUMsQ0FDSDtBQUFBLElBQ0YsQ0FBQztBQUVELE9BQUcsd0VBQXdFLE1BQU07QUFDL0UsWUFBTSxpQkFBaUIsSUFBSSxtREFBc0I7QUFBQSxRQUMvQyxpQkFBaUIsQ0FBQywwREFBdUIsR0FBRywwREFBdUIsQ0FBQztBQUFBLFFBQ3BFLGVBQWUsQ0FBQywwREFBdUIsQ0FBQztBQUFBLFFBQ3hDLFlBQVk7QUFBQSxRQUNaLFlBQVk7QUFBQSxRQUNaLG9CQUFvQjtBQUFBLFFBQ3BCLGdCQUFnQixDQUFDO0FBQUEsTUFDbkIsQ0FBQztBQUVELHlCQUFPLE9BQ0wsZUFBZSwwQkFBMEI7QUFBQSxRQUN2QyxpQkFBaUIsQ0FBQywwREFBdUIsQ0FBQztBQUFBLFFBQzFDLGVBQWUsQ0FBQywwREFBdUIsR0FBRywwREFBdUIsQ0FBQztBQUFBLFFBQ2xFLFlBQVk7QUFBQSxRQUNaLFlBQVk7QUFBQSxRQUNaLG9CQUFvQjtBQUFBLFFBQ3BCLGdCQUFnQixDQUFDO0FBQUEsTUFDbkIsQ0FBQyxDQUNIO0FBQUEsSUFDRixDQUFDO0FBQUEsRUFDSCxDQUFDO0FBQ0gsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
