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
var import_ConversationList = require("../../../components/ConversationList");
var import_getDefaultConversation = require("../../../test-both/helpers/getDefaultConversation");
var import_LeftPaneSetGroupMetadataHelper = require("../../../components/leftPane/LeftPaneSetGroupMetadataHelper");
function getComposeState() {
  return {
    groupAvatar: void 0,
    groupExpireTimer: 0,
    groupName: "",
    hasError: false,
    isCreating: false,
    isEditingAvatar: false,
    selectedContacts: [],
    userAvatarData: []
  };
}
describe("LeftPaneSetGroupMetadataHelper", () => {
  describe("getBackAction", () => {
    it('returns the "show composer" action if a request is not active', () => {
      const showChooseGroupMembers = sinon.fake();
      const helper = new import_LeftPaneSetGroupMetadataHelper.LeftPaneSetGroupMetadataHelper({
        ...getComposeState()
      });
      import_chai.assert.strictEqual(helper.getBackAction({ showChooseGroupMembers }), showChooseGroupMembers);
    });
    it("returns undefined (i.e., you can't go back) if a request is active", () => {
      const helper = new import_LeftPaneSetGroupMetadataHelper.LeftPaneSetGroupMetadataHelper({
        ...getComposeState(),
        groupName: "Foo Bar",
        isCreating: true
      });
      import_chai.assert.isUndefined(helper.getBackAction({ showChooseGroupMembers: sinon.fake() }));
    });
  });
  describe("getRowCount", () => {
    it("returns 0 if there are no contacts", () => {
      import_chai.assert.strictEqual(new import_LeftPaneSetGroupMetadataHelper.LeftPaneSetGroupMetadataHelper({
        ...getComposeState()
      }).getRowCount(), 0);
    });
    it("returns the number of candidate contacts + 2 if there are any", () => {
      import_chai.assert.strictEqual(new import_LeftPaneSetGroupMetadataHelper.LeftPaneSetGroupMetadataHelper({
        ...getComposeState(),
        selectedContacts: [
          (0, import_getDefaultConversation.getDefaultConversation)(),
          (0, import_getDefaultConversation.getDefaultConversation)()
        ]
      }).getRowCount(), 4);
    });
  });
  describe("getRow", () => {
    it("returns undefined if there are no contacts", () => {
      import_chai.assert.isUndefined(new import_LeftPaneSetGroupMetadataHelper.LeftPaneSetGroupMetadataHelper({
        ...getComposeState()
      }).getRow(0));
    });
    it("returns a header, then the contacts, then a blank space if there are contacts", () => {
      const selectedContacts = [
        (0, import_getDefaultConversation.getDefaultConversation)(),
        (0, import_getDefaultConversation.getDefaultConversation)()
      ];
      const helper = new import_LeftPaneSetGroupMetadataHelper.LeftPaneSetGroupMetadataHelper({
        ...getComposeState(),
        selectedContacts
      });
      import_chai.assert.deepEqual(helper.getRow(0), {
        type: import_ConversationList.RowType.Header,
        i18nKey: "setGroupMetadata__members-header"
      });
      import_chai.assert.deepEqual(helper.getRow(1), {
        type: import_ConversationList.RowType.Contact,
        contact: selectedContacts[0],
        isClickable: false
      });
      import_chai.assert.deepEqual(helper.getRow(2), {
        type: import_ConversationList.RowType.Contact,
        contact: selectedContacts[1],
        isClickable: false
      });
      import_chai.assert.deepEqual(helper.getRow(3), { type: import_ConversationList.RowType.Blank });
    });
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiTGVmdFBhbmVTZXRHcm91cE1ldGFkYXRhSGVscGVyX3Rlc3QudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSAnY2hhaSc7XG5pbXBvcnQgKiBhcyBzaW5vbiBmcm9tICdzaW5vbic7XG5pbXBvcnQgeyBSb3dUeXBlIH0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9Db252ZXJzYXRpb25MaXN0JztcbmltcG9ydCB7IGdldERlZmF1bHRDb252ZXJzYXRpb24gfSBmcm9tICcuLi8uLi8uLi90ZXN0LWJvdGgvaGVscGVycy9nZXREZWZhdWx0Q29udmVyc2F0aW9uJztcblxuaW1wb3J0IHsgTGVmdFBhbmVTZXRHcm91cE1ldGFkYXRhSGVscGVyIH0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9sZWZ0UGFuZS9MZWZ0UGFuZVNldEdyb3VwTWV0YWRhdGFIZWxwZXInO1xuXG5mdW5jdGlvbiBnZXRDb21wb3NlU3RhdGUoKSB7XG4gIHJldHVybiB7XG4gICAgZ3JvdXBBdmF0YXI6IHVuZGVmaW5lZCxcbiAgICBncm91cEV4cGlyZVRpbWVyOiAwLFxuICAgIGdyb3VwTmFtZTogJycsXG4gICAgaGFzRXJyb3I6IGZhbHNlLFxuICAgIGlzQ3JlYXRpbmc6IGZhbHNlLFxuICAgIGlzRWRpdGluZ0F2YXRhcjogZmFsc2UsXG4gICAgc2VsZWN0ZWRDb250YWN0czogW10sXG4gICAgdXNlckF2YXRhckRhdGE6IFtdLFxuICB9O1xufVxuXG5kZXNjcmliZSgnTGVmdFBhbmVTZXRHcm91cE1ldGFkYXRhSGVscGVyJywgKCkgPT4ge1xuICBkZXNjcmliZSgnZ2V0QmFja0FjdGlvbicsICgpID0+IHtcbiAgICBpdCgncmV0dXJucyB0aGUgXCJzaG93IGNvbXBvc2VyXCIgYWN0aW9uIGlmIGEgcmVxdWVzdCBpcyBub3QgYWN0aXZlJywgKCkgPT4ge1xuICAgICAgY29uc3Qgc2hvd0Nob29zZUdyb3VwTWVtYmVycyA9IHNpbm9uLmZha2UoKTtcbiAgICAgIGNvbnN0IGhlbHBlciA9IG5ldyBMZWZ0UGFuZVNldEdyb3VwTWV0YWRhdGFIZWxwZXIoe1xuICAgICAgICAuLi5nZXRDb21wb3NlU3RhdGUoKSxcbiAgICAgIH0pO1xuXG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoXG4gICAgICAgIGhlbHBlci5nZXRCYWNrQWN0aW9uKHsgc2hvd0Nob29zZUdyb3VwTWVtYmVycyB9KSxcbiAgICAgICAgc2hvd0Nob29zZUdyb3VwTWVtYmVyc1xuICAgICAgKTtcbiAgICB9KTtcblxuICAgIGl0KFwicmV0dXJucyB1bmRlZmluZWQgKGkuZS4sIHlvdSBjYW4ndCBnbyBiYWNrKSBpZiBhIHJlcXVlc3QgaXMgYWN0aXZlXCIsICgpID0+IHtcbiAgICAgIGNvbnN0IGhlbHBlciA9IG5ldyBMZWZ0UGFuZVNldEdyb3VwTWV0YWRhdGFIZWxwZXIoe1xuICAgICAgICAuLi5nZXRDb21wb3NlU3RhdGUoKSxcbiAgICAgICAgZ3JvdXBOYW1lOiAnRm9vIEJhcicsXG4gICAgICAgIGlzQ3JlYXRpbmc6IHRydWUsXG4gICAgICB9KTtcblxuICAgICAgYXNzZXJ0LmlzVW5kZWZpbmVkKFxuICAgICAgICBoZWxwZXIuZ2V0QmFja0FjdGlvbih7IHNob3dDaG9vc2VHcm91cE1lbWJlcnM6IHNpbm9uLmZha2UoKSB9KVxuICAgICAgKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ2dldFJvd0NvdW50JywgKCkgPT4ge1xuICAgIGl0KCdyZXR1cm5zIDAgaWYgdGhlcmUgYXJlIG5vIGNvbnRhY3RzJywgKCkgPT4ge1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgICBuZXcgTGVmdFBhbmVTZXRHcm91cE1ldGFkYXRhSGVscGVyKHtcbiAgICAgICAgICAuLi5nZXRDb21wb3NlU3RhdGUoKSxcbiAgICAgICAgfSkuZ2V0Um93Q291bnQoKSxcbiAgICAgICAgMFxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIHRoZSBudW1iZXIgb2YgY2FuZGlkYXRlIGNvbnRhY3RzICsgMiBpZiB0aGVyZSBhcmUgYW55JywgKCkgPT4ge1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgICBuZXcgTGVmdFBhbmVTZXRHcm91cE1ldGFkYXRhSGVscGVyKHtcbiAgICAgICAgICAuLi5nZXRDb21wb3NlU3RhdGUoKSxcbiAgICAgICAgICBzZWxlY3RlZENvbnRhY3RzOiBbXG4gICAgICAgICAgICBnZXREZWZhdWx0Q29udmVyc2F0aW9uKCksXG4gICAgICAgICAgICBnZXREZWZhdWx0Q29udmVyc2F0aW9uKCksXG4gICAgICAgICAgXSxcbiAgICAgICAgfSkuZ2V0Um93Q291bnQoKSxcbiAgICAgICAgNFxuICAgICAgKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ2dldFJvdycsICgpID0+IHtcbiAgICBpdCgncmV0dXJucyB1bmRlZmluZWQgaWYgdGhlcmUgYXJlIG5vIGNvbnRhY3RzJywgKCkgPT4ge1xuICAgICAgYXNzZXJ0LmlzVW5kZWZpbmVkKFxuICAgICAgICBuZXcgTGVmdFBhbmVTZXRHcm91cE1ldGFkYXRhSGVscGVyKHtcbiAgICAgICAgICAuLi5nZXRDb21wb3NlU3RhdGUoKSxcbiAgICAgICAgfSkuZ2V0Um93KDApXG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgYSBoZWFkZXIsIHRoZW4gdGhlIGNvbnRhY3RzLCB0aGVuIGEgYmxhbmsgc3BhY2UgaWYgdGhlcmUgYXJlIGNvbnRhY3RzJywgKCkgPT4ge1xuICAgICAgY29uc3Qgc2VsZWN0ZWRDb250YWN0cyA9IFtcbiAgICAgICAgZ2V0RGVmYXVsdENvbnZlcnNhdGlvbigpLFxuICAgICAgICBnZXREZWZhdWx0Q29udmVyc2F0aW9uKCksXG4gICAgICBdO1xuICAgICAgY29uc3QgaGVscGVyID0gbmV3IExlZnRQYW5lU2V0R3JvdXBNZXRhZGF0YUhlbHBlcih7XG4gICAgICAgIC4uLmdldENvbXBvc2VTdGF0ZSgpLFxuICAgICAgICBzZWxlY3RlZENvbnRhY3RzLFxuICAgICAgfSk7XG5cbiAgICAgIGFzc2VydC5kZWVwRXF1YWwoaGVscGVyLmdldFJvdygwKSwge1xuICAgICAgICB0eXBlOiBSb3dUeXBlLkhlYWRlcixcbiAgICAgICAgaTE4bktleTogJ3NldEdyb3VwTWV0YWRhdGFfX21lbWJlcnMtaGVhZGVyJyxcbiAgICAgIH0pO1xuICAgICAgYXNzZXJ0LmRlZXBFcXVhbChoZWxwZXIuZ2V0Um93KDEpLCB7XG4gICAgICAgIHR5cGU6IFJvd1R5cGUuQ29udGFjdCxcbiAgICAgICAgY29udGFjdDogc2VsZWN0ZWRDb250YWN0c1swXSxcbiAgICAgICAgaXNDbGlja2FibGU6IGZhbHNlLFxuICAgICAgfSk7XG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKGhlbHBlci5nZXRSb3coMiksIHtcbiAgICAgICAgdHlwZTogUm93VHlwZS5Db250YWN0LFxuICAgICAgICBjb250YWN0OiBzZWxlY3RlZENvbnRhY3RzWzFdLFxuICAgICAgICBpc0NsaWNrYWJsZTogZmFsc2UsXG4gICAgICB9KTtcbiAgICAgIGFzc2VydC5kZWVwRXF1YWwoaGVscGVyLmdldFJvdygzKSwgeyB0eXBlOiBSb3dUeXBlLkJsYW5rIH0pO1xuICAgIH0pO1xuICB9KTtcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7OztBQUdBLGtCQUF1QjtBQUN2QixZQUF1QjtBQUN2Qiw4QkFBd0I7QUFDeEIsb0NBQXVDO0FBRXZDLDRDQUErQztBQUUvQywyQkFBMkI7QUFDekIsU0FBTztBQUFBLElBQ0wsYUFBYTtBQUFBLElBQ2Isa0JBQWtCO0FBQUEsSUFDbEIsV0FBVztBQUFBLElBQ1gsVUFBVTtBQUFBLElBQ1YsWUFBWTtBQUFBLElBQ1osaUJBQWlCO0FBQUEsSUFDakIsa0JB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
