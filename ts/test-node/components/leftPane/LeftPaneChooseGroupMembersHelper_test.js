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
var import_lodash = require("lodash");
var import_ConversationList = require("../../../components/ConversationList");
var import_ContactCheckbox = require("../../../components/conversationList/ContactCheckbox");
var import_getDefaultConversation = require("../../../test-both/helpers/getDefaultConversation");
var import_LeftPaneChooseGroupMembersHelper = require("../../../components/leftPane/LeftPaneChooseGroupMembersHelper");
var import_RemoteConfigStub = require("../../../test-both/helpers/RemoteConfigStub");
describe("LeftPaneChooseGroupMembersHelper", () => {
  const defaults = {
    uuidFetchState: {},
    candidateContacts: [],
    isShowingRecommendedGroupSizeModal: false,
    isShowingMaximumGroupSizeModal: false,
    isUsernamesEnabled: true,
    searchTerm: "",
    regionCode: "US",
    selectedContacts: []
  };
  beforeEach(async () => {
    await (0, import_RemoteConfigStub.updateRemoteConfig)([
      { name: "global.groupsv2.maxGroupSize", value: "22", enabled: true },
      {
        name: "global.groupsv2.groupSizeHardLimit",
        value: "33",
        enabled: true
      }
    ]);
  });
  describe("getBackAction", () => {
    it('returns the "show composer" action', () => {
      const startComposing = sinon.fake();
      const helper = new import_LeftPaneChooseGroupMembersHelper.LeftPaneChooseGroupMembersHelper(defaults);
      import_chai.assert.strictEqual(helper.getBackAction({ startComposing }), startComposing);
    });
  });
  describe("getRowCount", () => {
    it("returns 0 if there are no contacts", () => {
      import_chai.assert.strictEqual(new import_LeftPaneChooseGroupMembersHelper.LeftPaneChooseGroupMembersHelper({
        ...defaults,
        candidateContacts: [],
        searchTerm: "",
        selectedContacts: [(0, import_getDefaultConversation.getDefaultConversation)()]
      }).getRowCount(), 0);
      import_chai.assert.strictEqual(new import_LeftPaneChooseGroupMembersHelper.LeftPaneChooseGroupMembersHelper({
        ...defaults,
        candidateContacts: [],
        searchTerm: "foo bar",
        selectedContacts: [(0, import_getDefaultConversation.getDefaultConversation)()],
        isUsernamesEnabled: false
      }).getRowCount(), 0);
    });
    it("returns the number of candidate contacts + 2 if there are any", () => {
      import_chai.assert.strictEqual(new import_LeftPaneChooseGroupMembersHelper.LeftPaneChooseGroupMembersHelper({
        ...defaults,
        candidateContacts: [
          (0, import_getDefaultConversation.getDefaultConversation)(),
          (0, import_getDefaultConversation.getDefaultConversation)()
        ],
        searchTerm: "",
        selectedContacts: [(0, import_getDefaultConversation.getDefaultConversation)()]
      }).getRowCount(), 4);
    });
  });
  describe("getRow", () => {
    it("returns undefined if there are no contacts", () => {
      import_chai.assert.isUndefined(new import_LeftPaneChooseGroupMembersHelper.LeftPaneChooseGroupMembersHelper({
        ...defaults,
        candidateContacts: [],
        searchTerm: "",
        selectedContacts: [(0, import_getDefaultConversation.getDefaultConversation)()]
      }).getRow(0));
      import_chai.assert.isUndefined(new import_LeftPaneChooseGroupMembersHelper.LeftPaneChooseGroupMembersHelper({
        ...defaults,
        candidateContacts: [],
        searchTerm: "",
        selectedContacts: [(0, import_getDefaultConversation.getDefaultConversation)()]
      }).getRow(99));
      import_chai.assert.isUndefined(new import_LeftPaneChooseGroupMembersHelper.LeftPaneChooseGroupMembersHelper({
        ...defaults,
        candidateContacts: [],
        searchTerm: "foo bar",
        selectedContacts: [(0, import_getDefaultConversation.getDefaultConversation)()],
        isUsernamesEnabled: false
      }).getRow(0));
    });
    it("returns a header, then the contacts, then a blank space if there are contacts", () => {
      const candidateContacts = [
        (0, import_getDefaultConversation.getDefaultConversation)(),
        (0, import_getDefaultConversation.getDefaultConversation)()
      ];
      const helper = new import_LeftPaneChooseGroupMembersHelper.LeftPaneChooseGroupMembersHelper({
        ...defaults,
        candidateContacts,
        searchTerm: "foo bar",
        isUsernamesEnabled: false,
        selectedContacts: [candidateContacts[1]]
      });
      import_chai.assert.deepEqual(helper.getRow(0), {
        type: import_ConversationList.RowType.Header,
        i18nKey: "contactsHeader"
      });
      import_chai.assert.deepEqual(helper.getRow(1), {
        type: import_ConversationList.RowType.ContactCheckbox,
        contact: candidateContacts[0],
        isChecked: false,
        disabledReason: void 0
      });
      import_chai.assert.deepEqual(helper.getRow(2), {
        type: import_ConversationList.RowType.ContactCheckbox,
        contact: candidateContacts[1],
        isChecked: true,
        disabledReason: void 0
      });
      import_chai.assert.deepEqual(helper.getRow(3), { type: import_ConversationList.RowType.Blank });
    });
    it("disables non-selected contact checkboxes if you've selected the maximum number of contacts", () => {
      const candidateContacts = (0, import_lodash.times)(50, () => (0, import_getDefaultConversation.getDefaultConversation)());
      const helper = new import_LeftPaneChooseGroupMembersHelper.LeftPaneChooseGroupMembersHelper({
        ...defaults,
        candidateContacts,
        searchTerm: "foo bar",
        selectedContacts: candidateContacts.slice(1, 33)
      });
      import_chai.assert.deepEqual(helper.getRow(1), {
        type: import_ConversationList.RowType.ContactCheckbox,
        contact: candidateContacts[0],
        isChecked: false,
        disabledReason: import_ContactCheckbox.ContactCheckboxDisabledReason.MaximumContactsSelected
      });
      import_chai.assert.deepEqual(helper.getRow(2), {
        type: import_ConversationList.RowType.ContactCheckbox,
        contact: candidateContacts[1],
        isChecked: true,
        disabledReason: void 0
      });
    });
    it("returns a header, then the phone number, then a blank space if there are contacts", () => {
      const helper = new import_LeftPaneChooseGroupMembersHelper.LeftPaneChooseGroupMembersHelper({
        ...defaults,
        candidateContacts: [],
        searchTerm: "212 555",
        selectedContacts: []
      });
      import_chai.assert.deepEqual(helper.getRow(0), {
        type: import_ConversationList.RowType.Header,
        i18nKey: "findByPhoneNumberHeader"
      });
      import_chai.assert.deepEqual(helper.getRow(1), {
        type: import_ConversationList.RowType.PhoneNumberCheckbox,
        phoneNumber: {
          isValid: false,
          userInput: "212 555",
          e164: "+1212555"
        },
        isChecked: false,
        isFetching: false
      });
      import_chai.assert.deepEqual(helper.getRow(2), { type: import_ConversationList.RowType.Blank });
    });
    it("returns a header, then the username, then a blank space if there are contacts", () => {
      const helper = new import_LeftPaneChooseGroupMembersHelper.LeftPaneChooseGroupMembersHelper({
        ...defaults,
        candidateContacts: [],
        searchTerm: "signal",
        selectedContacts: []
      });
      import_chai.assert.deepEqual(helper.getRow(0), {
        type: import_ConversationList.RowType.Header,
        i18nKey: "findByUsernameHeader"
      });
      import_chai.assert.deepEqual(helper.getRow(1), {
        type: import_ConversationList.RowType.UsernameCheckbox,
        username: "signal",
        isChecked: false,
        isFetching: false
      });
      import_chai.assert.deepEqual(helper.getRow(2), { type: import_ConversationList.RowType.Blank });
    });
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiTGVmdFBhbmVDaG9vc2VHcm91cE1lbWJlcnNIZWxwZXJfdGVzdC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEtMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IGFzc2VydCB9IGZyb20gJ2NoYWknO1xuaW1wb3J0ICogYXMgc2lub24gZnJvbSAnc2lub24nO1xuaW1wb3J0IHsgdGltZXMgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgUm93VHlwZSB9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvQ29udmVyc2F0aW9uTGlzdCc7XG5pbXBvcnQgeyBDb250YWN0Q2hlY2tib3hEaXNhYmxlZFJlYXNvbiB9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvY29udmVyc2F0aW9uTGlzdC9Db250YWN0Q2hlY2tib3gnO1xuaW1wb3J0IHsgZ2V0RGVmYXVsdENvbnZlcnNhdGlvbiB9IGZyb20gJy4uLy4uLy4uL3Rlc3QtYm90aC9oZWxwZXJzL2dldERlZmF1bHRDb252ZXJzYXRpb24nO1xuXG5pbXBvcnQgeyBMZWZ0UGFuZUNob29zZUdyb3VwTWVtYmVyc0hlbHBlciB9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvbGVmdFBhbmUvTGVmdFBhbmVDaG9vc2VHcm91cE1lbWJlcnNIZWxwZXInO1xuaW1wb3J0IHsgdXBkYXRlUmVtb3RlQ29uZmlnIH0gZnJvbSAnLi4vLi4vLi4vdGVzdC1ib3RoL2hlbHBlcnMvUmVtb3RlQ29uZmlnU3R1Yic7XG5cbmRlc2NyaWJlKCdMZWZ0UGFuZUNob29zZUdyb3VwTWVtYmVyc0hlbHBlcicsICgpID0+IHtcbiAgY29uc3QgZGVmYXVsdHMgPSB7XG4gICAgdXVpZEZldGNoU3RhdGU6IHt9LFxuICAgIGNhbmRpZGF0ZUNvbnRhY3RzOiBbXSxcbiAgICBpc1Nob3dpbmdSZWNvbW1lbmRlZEdyb3VwU2l6ZU1vZGFsOiBmYWxzZSxcbiAgICBpc1Nob3dpbmdNYXhpbXVtR3JvdXBTaXplTW9kYWw6IGZhbHNlLFxuICAgIGlzVXNlcm5hbWVzRW5hYmxlZDogdHJ1ZSxcbiAgICBzZWFyY2hUZXJtOiAnJyxcbiAgICByZWdpb25Db2RlOiAnVVMnLFxuICAgIHNlbGVjdGVkQ29udGFjdHM6IFtdLFxuICB9O1xuXG4gIGJlZm9yZUVhY2goYXN5bmMgKCkgPT4ge1xuICAgIGF3YWl0IHVwZGF0ZVJlbW90ZUNvbmZpZyhbXG4gICAgICB7IG5hbWU6ICdnbG9iYWwuZ3JvdXBzdjIubWF4R3JvdXBTaXplJywgdmFsdWU6ICcyMicsIGVuYWJsZWQ6IHRydWUgfSxcbiAgICAgIHtcbiAgICAgICAgbmFtZTogJ2dsb2JhbC5ncm91cHN2Mi5ncm91cFNpemVIYXJkTGltaXQnLFxuICAgICAgICB2YWx1ZTogJzMzJyxcbiAgICAgICAgZW5hYmxlZDogdHJ1ZSxcbiAgICAgIH0sXG4gICAgXSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdnZXRCYWNrQWN0aW9uJywgKCkgPT4ge1xuICAgIGl0KCdyZXR1cm5zIHRoZSBcInNob3cgY29tcG9zZXJcIiBhY3Rpb24nLCAoKSA9PiB7XG4gICAgICBjb25zdCBzdGFydENvbXBvc2luZyA9IHNpbm9uLmZha2UoKTtcbiAgICAgIGNvbnN0IGhlbHBlciA9IG5ldyBMZWZ0UGFuZUNob29zZUdyb3VwTWVtYmVyc0hlbHBlcihkZWZhdWx0cyk7XG5cbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgICAgaGVscGVyLmdldEJhY2tBY3Rpb24oeyBzdGFydENvbXBvc2luZyB9KSxcbiAgICAgICAgc3RhcnRDb21wb3NpbmdcbiAgICAgICk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdnZXRSb3dDb3VudCcsICgpID0+IHtcbiAgICBpdCgncmV0dXJucyAwIGlmIHRoZXJlIGFyZSBubyBjb250YWN0cycsICgpID0+IHtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgICAgbmV3IExlZnRQYW5lQ2hvb3NlR3JvdXBNZW1iZXJzSGVscGVyKHtcbiAgICAgICAgICAuLi5kZWZhdWx0cyxcbiAgICAgICAgICBjYW5kaWRhdGVDb250YWN0czogW10sXG4gICAgICAgICAgc2VhcmNoVGVybTogJycsXG4gICAgICAgICAgc2VsZWN0ZWRDb250YWN0czogW2dldERlZmF1bHRDb252ZXJzYXRpb24oKV0sXG4gICAgICAgIH0pLmdldFJvd0NvdW50KCksXG4gICAgICAgIDBcbiAgICAgICk7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoXG4gICAgICAgIG5ldyBMZWZ0UGFuZUNob29zZUdyb3VwTWVtYmVyc0hlbHBlcih7XG4gICAgICAgICAgLi4uZGVmYXVsdHMsXG4gICAgICAgICAgY2FuZGlkYXRlQ29udGFjdHM6IFtdLFxuICAgICAgICAgIHNlYXJjaFRlcm06ICdmb28gYmFyJyxcbiAgICAgICAgICBzZWxlY3RlZENvbnRhY3RzOiBbZ2V0RGVmYXVsdENvbnZlcnNhdGlvbigpXSxcbiAgICAgICAgICBpc1VzZXJuYW1lc0VuYWJsZWQ6IGZhbHNlLFxuICAgICAgICB9KS5nZXRSb3dDb3VudCgpLFxuICAgICAgICAwXG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgdGhlIG51bWJlciBvZiBjYW5kaWRhdGUgY29udGFjdHMgKyAyIGlmIHRoZXJlIGFyZSBhbnknLCAoKSA9PiB7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoXG4gICAgICAgIG5ldyBMZWZ0UGFuZUNob29zZUdyb3VwTWVtYmVyc0hlbHBlcih7XG4gICAgICAgICAgLi4uZGVmYXVsdHMsXG4gICAgICAgICAgY2FuZGlkYXRlQ29udGFjdHM6IFtcbiAgICAgICAgICAgIGdldERlZmF1bHRDb252ZXJzYXRpb24oKSxcbiAgICAgICAgICAgIGdldERlZmF1bHRDb252ZXJzYXRpb24oKSxcbiAgICAgICAgICBdLFxuICAgICAgICAgIHNlYXJjaFRlcm06ICcnLFxuICAgICAgICAgIHNlbGVjdGVkQ29udGFjdHM6IFtnZXREZWZhdWx0Q29udmVyc2F0aW9uKCldLFxuICAgICAgICB9KS5nZXRSb3dDb3VudCgpLFxuICAgICAgICA0XG4gICAgICApO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnZ2V0Um93JywgKCkgPT4ge1xuICAgIGl0KCdyZXR1cm5zIHVuZGVmaW5lZCBpZiB0aGVyZSBhcmUgbm8gY29udGFjdHMnLCAoKSA9PiB7XG4gICAgICBhc3NlcnQuaXNVbmRlZmluZWQoXG4gICAgICAgIG5ldyBMZWZ0UGFuZUNob29zZUdyb3VwTWVtYmVyc0hlbHBlcih7XG4gICAgICAgICAgLi4uZGVmYXVsdHMsXG4gICAgICAgICAgY2FuZGlkYXRlQ29udGFjdHM6IFtdLFxuICAgICAgICAgIHNlYXJjaFRlcm06ICcnLFxuICAgICAgICAgIHNlbGVjdGVkQ29udGFjdHM6IFtnZXREZWZhdWx0Q29udmVyc2F0aW9uKCldLFxuICAgICAgICB9KS5nZXRSb3coMClcbiAgICAgICk7XG4gICAgICBhc3NlcnQuaXNVbmRlZmluZWQoXG4gICAgICAgIG5ldyBMZWZ0UGFuZUNob29zZUdyb3VwTWVtYmVyc0hlbHBlcih7XG4gICAgICAgICAgLi4uZGVmYXVsdHMsXG4gICAgICAgICAgY2FuZGlkYXRlQ29udGFjdHM6IFtdLFxuICAgICAgICAgIHNlYXJjaFRlcm06ICcnLFxuICAgICAgICAgIHNlbGVjdGVkQ29udGFjdHM6IFtnZXREZWZhdWx0Q29udmVyc2F0aW9uKCldLFxuICAgICAgICB9KS5nZXRSb3coOTkpXG4gICAgICApO1xuICAgICAgYXNzZXJ0LmlzVW5kZWZpbmVkKFxuICAgICAgICBuZXcgTGVmdFBhbmVDaG9vc2VHcm91cE1lbWJlcnNIZWxwZXIoe1xuICAgICAgICAgIC4uLmRlZmF1bHRzLFxuICAgICAgICAgIGNhbmRpZGF0ZUNvbnRhY3RzOiBbXSxcbiAgICAgICAgICBzZWFyY2hUZXJtOiAnZm9vIGJhcicsXG4gICAgICAgICAgc2VsZWN0ZWRDb250YWN0czogW2dldERlZmF1bHRDb252ZXJzYXRpb24oKV0sXG4gICAgICAgICAgaXNVc2VybmFtZXNFbmFibGVkOiBmYWxzZSxcbiAgICAgICAgfSkuZ2V0Um93KDApXG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgYSBoZWFkZXIsIHRoZW4gdGhlIGNvbnRhY3RzLCB0aGVuIGEgYmxhbmsgc3BhY2UgaWYgdGhlcmUgYXJlIGNvbnRhY3RzJywgKCkgPT4ge1xuICAgICAgY29uc3QgY2FuZGlkYXRlQ29udGFjdHMgPSBbXG4gICAgICAgIGdldERlZmF1bHRDb252ZXJzYXRpb24oKSxcbiAgICAgICAgZ2V0RGVmYXVsdENvbnZlcnNhdGlvbigpLFxuICAgICAgXTtcbiAgICAgIGNvbnN0IGhlbHBlciA9IG5ldyBMZWZ0UGFuZUNob29zZUdyb3VwTWVtYmVyc0hlbHBlcih7XG4gICAgICAgIC4uLmRlZmF1bHRzLFxuICAgICAgICBjYW5kaWRhdGVDb250YWN0cyxcbiAgICAgICAgc2VhcmNoVGVybTogJ2ZvbyBiYXInLFxuICAgICAgICBpc1VzZXJuYW1lc0VuYWJsZWQ6IGZhbHNlLFxuICAgICAgICBzZWxlY3RlZENvbnRhY3RzOiBbY2FuZGlkYXRlQ29udGFjdHNbMV1dLFxuICAgICAgfSk7XG5cbiAgICAgIGFzc2VydC5kZWVwRXF1YWwoaGVscGVyLmdldFJvdygwKSwge1xuICAgICAgICB0eXBlOiBSb3dUeXBlLkhlYWRlcixcbiAgICAgICAgaTE4bktleTogJ2NvbnRhY3RzSGVhZGVyJyxcbiAgICAgIH0pO1xuICAgICAgYXNzZXJ0LmRlZXBFcXVhbChoZWxwZXIuZ2V0Um93KDEpLCB7XG4gICAgICAgIHR5cGU6IFJvd1R5cGUuQ29udGFjdENoZWNrYm94LFxuICAgICAgICBjb250YWN0OiBjYW5kaWRhdGVDb250YWN0c1swXSxcbiAgICAgICAgaXNDaGVja2VkOiBmYWxzZSxcbiAgICAgICAgZGlzYWJsZWRSZWFzb246IHVuZGVmaW5lZCxcbiAgICAgIH0pO1xuICAgICAgYXNzZXJ0LmRlZXBFcXVhbChoZWxwZXIuZ2V0Um93KDIpLCB7XG4gICAgICAgIHR5cGU6IFJvd1R5cGUuQ29udGFjdENoZWNrYm94LFxuICAgICAgICBjb250YWN0OiBjYW5kaWRhdGVDb250YWN0c1sxXSxcbiAgICAgICAgaXNDaGVja2VkOiB0cnVlLFxuICAgICAgICBkaXNhYmxlZFJlYXNvbjogdW5kZWZpbmVkLFxuICAgICAgfSk7XG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKGhlbHBlci5nZXRSb3coMyksIHsgdHlwZTogUm93VHlwZS5CbGFuayB9KTtcbiAgICB9KTtcblxuICAgIGl0KFwiZGlzYWJsZXMgbm9uLXNlbGVjdGVkIGNvbnRhY3QgY2hlY2tib3hlcyBpZiB5b3UndmUgc2VsZWN0ZWQgdGhlIG1heGltdW0gbnVtYmVyIG9mIGNvbnRhY3RzXCIsICgpID0+IHtcbiAgICAgIGNvbnN0IGNhbmRpZGF0ZUNvbnRhY3RzID0gdGltZXMoNTAsICgpID0+IGdldERlZmF1bHRDb252ZXJzYXRpb24oKSk7XG4gICAgICBjb25zdCBoZWxwZXIgPSBuZXcgTGVmdFBhbmVDaG9vc2VHcm91cE1lbWJlcnNIZWxwZXIoe1xuICAgICAgICAuLi5kZWZhdWx0cyxcbiAgICAgICAgY2FuZGlkYXRlQ29udGFjdHMsXG4gICAgICAgIHNlYXJjaFRlcm06ICdmb28gYmFyJyxcbiAgICAgICAgc2VsZWN0ZWRDb250YWN0czogY2FuZGlkYXRlQ29udGFjdHMuc2xpY2UoMSwgMzMpLFxuICAgICAgfSk7XG5cbiAgICAgIGFzc2VydC5kZWVwRXF1YWwoaGVscGVyLmdldFJvdygxKSwge1xuICAgICAgICB0eXBlOiBSb3dUeXBlLkNvbnRhY3RDaGVja2JveCxcbiAgICAgICAgY29udGFjdDogY2FuZGlkYXRlQ29udGFjdHNbMF0sXG4gICAgICAgIGlzQ2hlY2tlZDogZmFsc2UsXG4gICAgICAgIGRpc2FibGVkUmVhc29uOiBDb250YWN0Q2hlY2tib3hEaXNhYmxlZFJlYXNvbi5NYXhpbXVtQ29udGFjdHNTZWxlY3RlZCxcbiAgICAgIH0pO1xuICAgICAgYXNzZXJ0LmRlZXBFcXVhbChoZWxwZXIuZ2V0Um93KDIpLCB7XG4gICAgICAgIHR5cGU6IFJvd1R5cGUuQ29udGFjdENoZWNrYm94LFxuICAgICAgICBjb250YWN0OiBjYW5kaWRhdGVDb250YWN0c1sxXSxcbiAgICAgICAgaXNDaGVja2VkOiB0cnVlLFxuICAgICAgICBkaXNhYmxlZFJlYXNvbjogdW5kZWZpbmVkLFxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyBhIGhlYWRlciwgdGhlbiB0aGUgcGhvbmUgbnVtYmVyLCB0aGVuIGEgYmxhbmsgc3BhY2UgaWYgdGhlcmUgYXJlIGNvbnRhY3RzJywgKCkgPT4ge1xuICAgICAgY29uc3QgaGVscGVyID0gbmV3IExlZnRQYW5lQ2hvb3NlR3JvdXBNZW1iZXJzSGVscGVyKHtcbiAgICAgICAgLi4uZGVmYXVsdHMsXG4gICAgICAgIGNhbmRpZGF0ZUNvbnRhY3RzOiBbXSxcbiAgICAgICAgc2VhcmNoVGVybTogJzIxMiA1NTUnLFxuICAgICAgICBzZWxlY3RlZENvbnRhY3RzOiBbXSxcbiAgICAgIH0pO1xuXG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKGhlbHBlci5nZXRSb3coMCksIHtcbiAgICAgICAgdHlwZTogUm93VHlwZS5IZWFkZXIsXG4gICAgICAgIGkxOG5LZXk6ICdmaW5kQnlQaG9uZU51bWJlckhlYWRlcicsXG4gICAgICB9KTtcbiAgICAgIGFzc2VydC5kZWVwRXF1YWwoaGVscGVyLmdldFJvdygxKSwge1xuICAgICAgICB0eXBlOiBSb3dUeXBlLlBob25lTnVtYmVyQ2hlY2tib3gsXG4gICAgICAgIHBob25lTnVtYmVyOiB7XG4gICAgICAgICAgaXNWYWxpZDogZmFsc2UsXG4gICAgICAgICAgdXNlcklucHV0OiAnMjEyIDU1NScsXG4gICAgICAgICAgZTE2NDogJysxMjEyNTU1JyxcbiAgICAgICAgfSxcbiAgICAgICAgaXNDaGVja2VkOiBmYWxzZSxcbiAgICAgICAgaXNGZXRjaGluZzogZmFsc2UsXG4gICAgICB9KTtcbiAgICAgIGFzc2VydC5kZWVwRXF1YWwoaGVscGVyLmdldFJvdygyKSwgeyB0eXBlOiBSb3dUeXBlLkJsYW5rIH0pO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgYSBoZWFkZXIsIHRoZW4gdGhlIHVzZXJuYW1lLCB0aGVuIGEgYmxhbmsgc3BhY2UgaWYgdGhlcmUgYXJlIGNvbnRhY3RzJywgKCkgPT4ge1xuICAgICAgY29uc3QgaGVscGVyID0gbmV3IExlZnRQYW5lQ2hvb3NlR3JvdXBNZW1iZXJzSGVscGVyKHtcbiAgICAgICAgLi4uZGVmYXVsdHMsXG4gICAgICAgIGNhbmRpZGF0ZUNvbnRhY3RzOiBbXSxcbiAgICAgICAgc2VhcmNoVGVybTogJ3NpZ25hbCcsXG4gICAgICAgIHNlbGVjdGVkQ29udGFjdHM6IFtdLFxuICAgICAgfSk7XG5cbiAgICAgIGFzc2VydC5kZWVwRXF1YWwoaGVscGVyLmdldFJvdygwKSwge1xuICAgICAgICB0eXBlOiBSb3dUeXBlLkhlYWRlcixcbiAgICAgICAgaTE4bktleTogJ2ZpbmRCeVVzZXJuYW1lSGVhZGVyJyxcbiAgICAgIH0pO1xuICAgICAgYXNzZXJ0LmRlZXBFcXVhbChoZWxwZXIuZ2V0Um93KDEpLCB7XG4gICAgICAgIHR5cGU6IFJvd1R5cGUuVXNlcm5hbWVDaGVja2JveCxcbiAgICAgICAgdXNlcm5hbWU6ICdzaWduYWwnLFxuICAgICAgICBpc0NoZWNrZWQ6IGZhbHNlLFxuICAgICAgICBpc0ZldGNoaW5nOiBmYWxzZSxcbiAgICAgIH0pO1xuICAgICAgYXNzZXJ0LmRlZXBFcXVhbChoZWxwZXIuZ2V0Um93KDIpLCB7IHR5cGU6IFJvd1R5cGUuQmxhbmsgfSk7XG4gICAgfSk7XG4gIH0pO1xufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7QUFHQSxrQkFBdUI7QUFDdkIsWUFBdUI7QUFDdkIsb0JBQXNCO0FBQ3RCLDhCQUF3QjtBQUN4Qiw2QkFBOEM7QUFDOUMsb0NBQXVDO0FB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QVUsT0FBTyxPQUFPLENBQUMsR0FBRztBQUFBLFFBQ2pDLE1BQU0sZ0NBQVE7QUFBQSxRQUNkLFNBQVMsa0JBQWtCO0FBQUEsUUFDM0IsV0FBVztBQUFBLFFBQ1gsZ0JBQWdCO0FBQUEsTUFDbEIsQ0FBQztBQUFBLElBQ0gsQ0FBQztBQUVELE9BQUcscUZBQXFGLE1BQU07QUFDNUYsWUFBTSxTQUFTLElBQUkseUVBQWlDO0FBQUEsV0FDL0M7QUFBQSxRQUNILG1CQUFtQixDQUFDO0FBQUEsUUFDcEIsWUFBWTtBQUFBLFFBQ1osa0JBQWtCLENBQUM7QUFBQSxNQUNyQixDQUFDO0FBRUQseUJBQU8sVUFBVSxPQUFPLE9BQU8sQ0FBQyxHQUFHO0FBQUEsUUFDakMsTUFBTSxnQ0FBUTtBQUFBLFFBQ2QsU0FBUztBQUFBLE1BQ1gsQ0FBQztBQUNELHlCQUFPLFVBQVUsT0FBTyxPQUFPLENBQUMsR0FBRztBQUFBLFFBQ2pDLE1BQU0sZ0NBQVE7QUFBQSxRQUNkLGFBQWE7QUFBQSxVQUNYLFNBQVM7QUFBQSxVQUNULFdBQVc7QUFBQSxVQUNYLE1BQU07QUFBQSxRQUNSO0FBQUEsUUFDQSxXQUFXO0FBQUEsUUFDWCxZQUFZO0FBQUEsTUFDZCxDQUFDO0FBQ0QseUJBQU8sVUFBVSxPQUFPLE9BQU8sQ0FBQyxHQUFHLEVBQUUsTUFBTSxnQ0FBUSxNQUFNLENBQUM7QUFBQSxJQUM1RCxDQUFDO0FBRUQsT0FBRyxpRkFBaUYsTUFBTTtBQUN4RixZQUFNLFNBQVMsSUFBSSx5RUFBaUM7QUFBQSxXQUMvQztBQUFBLFFBQ0gsbUJBQW1CLENBQUM7QUFBQSxRQUNwQixZQUFZO0FBQUEsUUFDWixrQkFBa0IsQ0FBQztBQUFBLE1BQ3JCLENBQUM7QUFFRCx5QkFBTyxVQUFVLE9BQU8sT0FBTyxDQUFDLEdBQUc7QUFBQSxRQUNqQyxNQUFNLGdDQUFRO0FBQUEsUUFDZCxTQUFTO0FBQUEsTUFDWCxDQUFDO0FBQ0QseUJBQU8sVUFBVSxPQUFPLE9BQU8sQ0FBQyxHQUFHO0FBQUEsUUFDakMsTUFBTSxnQ0FBUTtBQUFBLFFBQ2QsVUFBVTtBQUFBLFFBQ1YsV0FBVztBQUFBLFFBQ1gsWUFBWTtBQUFBLE1BQ2QsQ0FBQztBQUNELHlCQUFPLFVBQVUsT0FBTyxPQUFPLENBQUMsR0FBRyxFQUFFLE1BQU0sZ0NBQVEsTUFBTSxDQUFDO0FBQUEsSUFDNUQsQ0FBQztBQUFBLEVBQ0gsQ0FBQztBQUNILENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
