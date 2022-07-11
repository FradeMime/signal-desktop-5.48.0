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
var import_quill_delta = __toESM(require("quill-delta"));
var import_sinon = __toESM(require("sinon"));
var import_completion = require("../../../quill/mentions/completion");
var import_memberRepository = require("../../../quill/memberRepository");
var import_Util = require("../../../types/Util");
var import_getDefaultConversation = require("../../../test-both/helpers/getDefaultConversation");
const me = (0, import_getDefaultConversation.getDefaultConversationWithUuid)({
  id: "666777",
  title: "Fred Savage",
  firstName: "Fred",
  profileName: "Fred S.",
  type: "direct",
  lastUpdated: Date.now(),
  markedUnread: false,
  areWeAdmin: false,
  isMe: true
});
const members = [
  (0, import_getDefaultConversation.getDefaultConversationWithUuid)({
    id: "555444",
    title: "Mahershala Ali",
    firstName: "Mahershala",
    profileName: "Mahershala A.",
    type: "direct",
    lastUpdated: Date.now(),
    markedUnread: false,
    areWeAdmin: false
  }),
  (0, import_getDefaultConversation.getDefaultConversationWithUuid)({
    id: "333222",
    title: "Shia LaBeouf",
    firstName: "Shia",
    profileName: "Shia L.",
    type: "direct",
    lastUpdated: Date.now(),
    markedUnread: false,
    areWeAdmin: false
  }),
  me
];
describe("MentionCompletion", () => {
  let mockQuill;
  let mentionCompletion;
  beforeEach(/* @__PURE__ */ __name(function beforeEach2() {
    const memberRepositoryRef = {
      current: new import_memberRepository.MemberRepository(members)
    };
    const options = {
      getPreferredBadge: () => void 0,
      i18n: Object.assign(import_sinon.default.stub(), { getLocale: import_sinon.default.stub() }),
      me,
      memberRepositoryRef,
      setMentionPickerElement: import_sinon.default.stub(),
      theme: import_Util.ThemeType.dark
    };
    mockQuill = {
      getContents: import_sinon.default.stub(),
      getLeaf: import_sinon.default.stub(),
      getSelection: import_sinon.default.stub(),
      keyboard: { addBinding: import_sinon.default.stub() },
      on: import_sinon.default.stub(),
      setSelection: import_sinon.default.stub(),
      updateContents: import_sinon.default.stub()
    };
    mentionCompletion = new import_completion.MentionCompletion(mockQuill, options);
    import_sinon.default.stub(mentionCompletion, "render");
  }, "beforeEach"));
  describe("onTextChange", () => {
    let possiblyShowMemberResultsStub;
    beforeEach(() => {
      possiblyShowMemberResultsStub = import_sinon.default.stub(mentionCompletion, "possiblyShowMemberResults");
    });
    describe("given a change that should show members", () => {
      const newContents = new import_quill_delta.default().insert("@a");
      beforeEach(() => {
        mockQuill.getContents?.returns(newContents);
        possiblyShowMemberResultsStub.returns(members);
      });
      it("shows member results", () => {
        mentionCompletion.onTextChange();
        import_chai.assert.equal(mentionCompletion.results, members);
        import_chai.assert.equal(mentionCompletion.index, 0);
      });
    });
    describe("given a change that should clear results", () => {
      const newContents = new import_quill_delta.default().insert("foo ");
      let clearResultsStub;
      beforeEach(() => {
        mentionCompletion.results = members;
        mockQuill.getContents?.returns(newContents);
        possiblyShowMemberResultsStub.returns([]);
        clearResultsStub = import_sinon.default.stub(mentionCompletion, "clearResults");
      });
      it("clears member results", () => {
        mentionCompletion.onTextChange();
        import_chai.assert.equal(clearResultsStub.called, true);
      });
    });
  });
  describe("completeMention", () => {
    describe("given a completable mention", () => {
      let insertMentionStub;
      beforeEach(() => {
        mentionCompletion.results = members;
        mockQuill.getSelection?.returns({ index: 5 });
        mockQuill.getLeaf?.returns([{ text: "@shia" }, 5]);
        insertMentionStub = import_sinon.default.stub(mentionCompletion, "insertMention");
      });
      it("inserts the currently selected mention at the current cursor position", () => {
        mentionCompletion.completeMention(1);
        const [
          member,
          distanceFromCursor,
          adjustCursorAfterBy,
          withTrailingSpace
        ] = insertMentionStub.getCall(0).args;
        import_chai.assert.equal(member, members[1]);
        import_chai.assert.equal(distanceFromCursor, 0);
        import_chai.assert.equal(adjustCursorAfterBy, 5);
        import_chai.assert.equal(withTrailingSpace, true);
      });
      it("can infer the member to complete with", () => {
        mentionCompletion.index = 1;
        mentionCompletion.completeMention();
        const [
          member,
          distanceFromCursor,
          adjustCursorAfterBy,
          withTrailingSpace
        ] = insertMentionStub.getCall(0).args;
        import_chai.assert.equal(member, members[1]);
        import_chai.assert.equal(distanceFromCursor, 0);
        import_chai.assert.equal(adjustCursorAfterBy, 5);
        import_chai.assert.equal(withTrailingSpace, true);
      });
      describe("from the middle of a string", () => {
        beforeEach(() => {
          mockQuill.getSelection?.returns({ index: 9 });
          mockQuill.getLeaf?.returns([{ text: "foo @shia bar" }, 9]);
        });
        it("inserts correctly", () => {
          mentionCompletion.completeMention(1);
          const [
            member,
            distanceFromCursor,
            adjustCursorAfterBy,
            withTrailingSpace
          ] = insertMentionStub.getCall(0).args;
          import_chai.assert.equal(member, members[1]);
          import_chai.assert.equal(distanceFromCursor, 4);
          import_chai.assert.equal(adjustCursorAfterBy, 5);
          import_chai.assert.equal(withTrailingSpace, true);
        });
      });
      describe("given a completable mention starting with a capital letter", () => {
        const text = "@Sh";
        const index = text.length;
        beforeEach(/* @__PURE__ */ __name(function beforeEach2() {
          mockQuill.getSelection?.returns({ index });
          const blot = {
            text
          };
          mockQuill.getLeaf?.returns([blot, index]);
          mentionCompletion.completeMention(1);
        }, "beforeEach"));
        it("inserts the currently selected mention at the current cursor position", () => {
          const [
            member,
            distanceFromCursor,
            adjustCursorAfterBy,
            withTrailingSpace
          ] = insertMentionStub.getCall(0).args;
          import_chai.assert.equal(member, members[1]);
          import_chai.assert.equal(distanceFromCursor, 0);
          import_chai.assert.equal(adjustCursorAfterBy, 3);
          import_chai.assert.equal(withTrailingSpace, true);
        });
      });
    });
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiY29tcGxldGlvbl90ZXN0LnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjAtMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IGFzc2VydCB9IGZyb20gJ2NoYWknO1xuaW1wb3J0IERlbHRhIGZyb20gJ3F1aWxsLWRlbHRhJztcbmltcG9ydCB0eXBlIHsgU2lub25TdHViIH0gZnJvbSAnc2lub24nO1xuaW1wb3J0IHNpbm9uIGZyb20gJ3Npbm9uJztcbmltcG9ydCB0eXBlIHsgUXVpbGwsIEtleWJvYXJkU3RhdGljIH0gZnJvbSAncXVpbGwnO1xuXG5pbXBvcnQgdHlwZSB7IE11dGFibGVSZWZPYmplY3QgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgdHlwZSB7IE1lbnRpb25Db21wbGV0aW9uT3B0aW9ucyB9IGZyb20gJy4uLy4uLy4uL3F1aWxsL21lbnRpb25zL2NvbXBsZXRpb24nO1xuaW1wb3J0IHsgTWVudGlvbkNvbXBsZXRpb24gfSBmcm9tICcuLi8uLi8uLi9xdWlsbC9tZW50aW9ucy9jb21wbGV0aW9uJztcbmltcG9ydCB0eXBlIHsgQ29udmVyc2F0aW9uVHlwZSB9IGZyb20gJy4uLy4uLy4uL3N0YXRlL2R1Y2tzL2NvbnZlcnNhdGlvbnMnO1xuaW1wb3J0IHsgTWVtYmVyUmVwb3NpdG9yeSB9IGZyb20gJy4uLy4uLy4uL3F1aWxsL21lbWJlclJlcG9zaXRvcnknO1xuaW1wb3J0IHsgVGhlbWVUeXBlIH0gZnJvbSAnLi4vLi4vLi4vdHlwZXMvVXRpbCc7XG5pbXBvcnQgeyBnZXREZWZhdWx0Q29udmVyc2F0aW9uV2l0aFV1aWQgfSBmcm9tICcuLi8uLi8uLi90ZXN0LWJvdGgvaGVscGVycy9nZXREZWZhdWx0Q29udmVyc2F0aW9uJztcblxuY29uc3QgbWU6IENvbnZlcnNhdGlvblR5cGUgPSBnZXREZWZhdWx0Q29udmVyc2F0aW9uV2l0aFV1aWQoe1xuICBpZDogJzY2Njc3NycsXG4gIHRpdGxlOiAnRnJlZCBTYXZhZ2UnLFxuICBmaXJzdE5hbWU6ICdGcmVkJyxcbiAgcHJvZmlsZU5hbWU6ICdGcmVkIFMuJyxcbiAgdHlwZTogJ2RpcmVjdCcsXG4gIGxhc3RVcGRhdGVkOiBEYXRlLm5vdygpLFxuICBtYXJrZWRVbnJlYWQ6IGZhbHNlLFxuICBhcmVXZUFkbWluOiBmYWxzZSxcbiAgaXNNZTogdHJ1ZSxcbn0pO1xuXG5jb25zdCBtZW1iZXJzOiBBcnJheTxDb252ZXJzYXRpb25UeXBlPiA9IFtcbiAgZ2V0RGVmYXVsdENvbnZlcnNhdGlvbldpdGhVdWlkKHtcbiAgICBpZDogJzU1NTQ0NCcsXG4gICAgdGl0bGU6ICdNYWhlcnNoYWxhIEFsaScsXG4gICAgZmlyc3ROYW1lOiAnTWFoZXJzaGFsYScsXG4gICAgcHJvZmlsZU5hbWU6ICdNYWhlcnNoYWxhIEEuJyxcbiAgICB0eXBlOiAnZGlyZWN0JyxcbiAgICBsYXN0VXBkYXRlZDogRGF0ZS5ub3coKSxcbiAgICBtYXJrZWRVbnJlYWQ6IGZhbHNlLFxuICAgIGFyZVdlQWRtaW46IGZhbHNlLFxuICB9KSxcbiAgZ2V0RGVmYXVsdENvbnZlcnNhdGlvbldpdGhVdWlkKHtcbiAgICBpZDogJzMzMzIyMicsXG4gICAgdGl0bGU6ICdTaGlhIExhQmVvdWYnLFxuICAgIGZpcnN0TmFtZTogJ1NoaWEnLFxuICAgIHByb2ZpbGVOYW1lOiAnU2hpYSBMLicsXG4gICAgdHlwZTogJ2RpcmVjdCcsXG4gICAgbGFzdFVwZGF0ZWQ6IERhdGUubm93KCksXG4gICAgbWFya2VkVW5yZWFkOiBmYWxzZSxcbiAgICBhcmVXZUFkbWluOiBmYWxzZSxcbiAgfSksXG4gIG1lLFxuXTtcblxuZGVzY3JpYmUoJ01lbnRpb25Db21wbGV0aW9uJywgKCkgPT4ge1xuICBsZXQgbW9ja1F1aWxsOiBPbWl0PFxuICAgIFBhcnRpYWw8eyBbSyBpbiBrZXlvZiBRdWlsbF06IFNpbm9uU3R1YiB9PixcbiAgICAna2V5Ym9hcmQnXG4gID4gJiB7XG4gICAga2V5Ym9hcmQ6IFBhcnRpYWw8eyBbSyBpbiBrZXlvZiBLZXlib2FyZFN0YXRpY106IFNpbm9uU3R1YiB9PjtcbiAgfTtcbiAgbGV0IG1lbnRpb25Db21wbGV0aW9uOiBNZW50aW9uQ29tcGxldGlvbjtcblxuICBiZWZvcmVFYWNoKGZ1bmN0aW9uIGJlZm9yZUVhY2goKSB7XG4gICAgY29uc3QgbWVtYmVyUmVwb3NpdG9yeVJlZjogTXV0YWJsZVJlZk9iamVjdDxNZW1iZXJSZXBvc2l0b3J5PiA9IHtcbiAgICAgIGN1cnJlbnQ6IG5ldyBNZW1iZXJSZXBvc2l0b3J5KG1lbWJlcnMpLFxuICAgIH07XG5cbiAgICBjb25zdCBvcHRpb25zOiBNZW50aW9uQ29tcGxldGlvbk9wdGlvbnMgPSB7XG4gICAgICBnZXRQcmVmZXJyZWRCYWRnZTogKCkgPT4gdW5kZWZpbmVkLFxuICAgICAgaTE4bjogT2JqZWN0LmFzc2lnbihzaW5vbi5zdHViKCksIHsgZ2V0TG9jYWxlOiBzaW5vbi5zdHViKCkgfSksXG4gICAgICBtZSxcbiAgICAgIG1lbWJlclJlcG9zaXRvcnlSZWYsXG4gICAgICBzZXRNZW50aW9uUGlja2VyRWxlbWVudDogc2lub24uc3R1YigpLFxuICAgICAgdGhlbWU6IFRoZW1lVHlwZS5kYXJrLFxuICAgIH07XG5cbiAgICBtb2NrUXVpbGwgPSB7XG4gICAgICBnZXRDb250ZW50czogc2lub24uc3R1YigpLFxuICAgICAgZ2V0TGVhZjogc2lub24uc3R1YigpLFxuICAgICAgZ2V0U2VsZWN0aW9uOiBzaW5vbi5zdHViKCksXG4gICAgICBrZXlib2FyZDogeyBhZGRCaW5kaW5nOiBzaW5vbi5zdHViKCkgfSxcbiAgICAgIG9uOiBzaW5vbi5zdHViKCksXG4gICAgICBzZXRTZWxlY3Rpb246IHNpbm9uLnN0dWIoKSxcbiAgICAgIHVwZGF0ZUNvbnRlbnRzOiBzaW5vbi5zdHViKCksXG4gICAgfTtcblxuICAgIG1lbnRpb25Db21wbGV0aW9uID0gbmV3IE1lbnRpb25Db21wbGV0aW9uKFxuICAgICAgbW9ja1F1aWxsIGFzIHVua25vd24gYXMgUXVpbGwsXG4gICAgICBvcHRpb25zXG4gICAgKTtcblxuICAgIHNpbm9uLnN0dWIobWVudGlvbkNvbXBsZXRpb24sICdyZW5kZXInKTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ29uVGV4dENoYW5nZScsICgpID0+IHtcbiAgICBsZXQgcG9zc2libHlTaG93TWVtYmVyUmVzdWx0c1N0dWI6IHNpbm9uLlNpbm9uU3R1YjxcbiAgICAgIFtdLFxuICAgICAgQXJyYXk8Q29udmVyc2F0aW9uVHlwZT5cbiAgICA+O1xuXG4gICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICBwb3NzaWJseVNob3dNZW1iZXJSZXN1bHRzU3R1YiA9IHNpbm9uLnN0dWIoXG4gICAgICAgIG1lbnRpb25Db21wbGV0aW9uLFxuICAgICAgICAncG9zc2libHlTaG93TWVtYmVyUmVzdWx0cydcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnZ2l2ZW4gYSBjaGFuZ2UgdGhhdCBzaG91bGQgc2hvdyBtZW1iZXJzJywgKCkgPT4ge1xuICAgICAgY29uc3QgbmV3Q29udGVudHMgPSBuZXcgRGVsdGEoKS5pbnNlcnQoJ0BhJyk7XG5cbiAgICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgICBtb2NrUXVpbGwuZ2V0Q29udGVudHM/LnJldHVybnMobmV3Q29udGVudHMpO1xuXG4gICAgICAgIHBvc3NpYmx5U2hvd01lbWJlclJlc3VsdHNTdHViLnJldHVybnMobWVtYmVycyk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3Nob3dzIG1lbWJlciByZXN1bHRzJywgKCkgPT4ge1xuICAgICAgICBtZW50aW9uQ29tcGxldGlvbi5vblRleHRDaGFuZ2UoKTtcblxuICAgICAgICBhc3NlcnQuZXF1YWwobWVudGlvbkNvbXBsZXRpb24ucmVzdWx0cywgbWVtYmVycyk7XG4gICAgICAgIGFzc2VydC5lcXVhbChtZW50aW9uQ29tcGxldGlvbi5pbmRleCwgMCk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdnaXZlbiBhIGNoYW5nZSB0aGF0IHNob3VsZCBjbGVhciByZXN1bHRzJywgKCkgPT4ge1xuICAgICAgY29uc3QgbmV3Q29udGVudHMgPSBuZXcgRGVsdGEoKS5pbnNlcnQoJ2ZvbyAnKTtcblxuICAgICAgbGV0IGNsZWFyUmVzdWx0c1N0dWI6IFNpbm9uU3R1YjxbXSwgdm9pZD47XG5cbiAgICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgICBtZW50aW9uQ29tcGxldGlvbi5yZXN1bHRzID0gbWVtYmVycztcblxuICAgICAgICBtb2NrUXVpbGwuZ2V0Q29udGVudHM/LnJldHVybnMobmV3Q29udGVudHMpO1xuXG4gICAgICAgIHBvc3NpYmx5U2hvd01lbWJlclJlc3VsdHNTdHViLnJldHVybnMoW10pO1xuXG4gICAgICAgIGNsZWFyUmVzdWx0c1N0dWIgPSBzaW5vbi5zdHViKG1lbnRpb25Db21wbGV0aW9uLCAnY2xlYXJSZXN1bHRzJyk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ2NsZWFycyBtZW1iZXIgcmVzdWx0cycsICgpID0+IHtcbiAgICAgICAgbWVudGlvbkNvbXBsZXRpb24ub25UZXh0Q2hhbmdlKCk7XG5cbiAgICAgICAgYXNzZXJ0LmVxdWFsKGNsZWFyUmVzdWx0c1N0dWIuY2FsbGVkLCB0cnVlKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnY29tcGxldGVNZW50aW9uJywgKCkgPT4ge1xuICAgIGRlc2NyaWJlKCdnaXZlbiBhIGNvbXBsZXRhYmxlIG1lbnRpb24nLCAoKSA9PiB7XG4gICAgICBsZXQgaW5zZXJ0TWVudGlvblN0dWI6IFNpbm9uU3R1YjxcbiAgICAgICAgW0NvbnZlcnNhdGlvblR5cGUsIG51bWJlciwgbnVtYmVyLCAoYm9vbGVhbiB8IHVuZGVmaW5lZCk/XSxcbiAgICAgICAgdm9pZFxuICAgICAgPjtcblxuICAgICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgIG1lbnRpb25Db21wbGV0aW9uLnJlc3VsdHMgPSBtZW1iZXJzO1xuICAgICAgICBtb2NrUXVpbGwuZ2V0U2VsZWN0aW9uPy5yZXR1cm5zKHsgaW5kZXg6IDUgfSk7XG4gICAgICAgIG1vY2tRdWlsbC5nZXRMZWFmPy5yZXR1cm5zKFt7IHRleHQ6ICdAc2hpYScgfSwgNV0pO1xuXG4gICAgICAgIGluc2VydE1lbnRpb25TdHViID0gc2lub24uc3R1YihtZW50aW9uQ29tcGxldGlvbiwgJ2luc2VydE1lbnRpb24nKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnaW5zZXJ0cyB0aGUgY3VycmVudGx5IHNlbGVjdGVkIG1lbnRpb24gYXQgdGhlIGN1cnJlbnQgY3Vyc29yIHBvc2l0aW9uJywgKCkgPT4ge1xuICAgICAgICBtZW50aW9uQ29tcGxldGlvbi5jb21wbGV0ZU1lbnRpb24oMSk7XG5cbiAgICAgICAgY29uc3QgW1xuICAgICAgICAgIG1lbWJlcixcbiAgICAgICAgICBkaXN0YW5jZUZyb21DdXJzb3IsXG4gICAgICAgICAgYWRqdXN0Q3Vyc29yQWZ0ZXJCeSxcbiAgICAgICAgICB3aXRoVHJhaWxpbmdTcGFjZSxcbiAgICAgICAgXSA9IGluc2VydE1lbnRpb25TdHViLmdldENhbGwoMCkuYXJncztcblxuICAgICAgICBhc3NlcnQuZXF1YWwobWVtYmVyLCBtZW1iZXJzWzFdKTtcbiAgICAgICAgYXNzZXJ0LmVxdWFsKGRpc3RhbmNlRnJvbUN1cnNvciwgMCk7XG4gICAgICAgIGFzc2VydC5lcXVhbChhZGp1c3RDdXJzb3JBZnRlckJ5LCA1KTtcbiAgICAgICAgYXNzZXJ0LmVxdWFsKHdpdGhUcmFpbGluZ1NwYWNlLCB0cnVlKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnY2FuIGluZmVyIHRoZSBtZW1iZXIgdG8gY29tcGxldGUgd2l0aCcsICgpID0+IHtcbiAgICAgICAgbWVudGlvbkNvbXBsZXRpb24uaW5kZXggPSAxO1xuICAgICAgICBtZW50aW9uQ29tcGxldGlvbi5jb21wbGV0ZU1lbnRpb24oKTtcblxuICAgICAgICBjb25zdCBbXG4gICAgICAgICAgbWVtYmVyLFxuICAgICAgICAgIGRpc3RhbmNlRnJvbUN1cnNvcixcbiAgICAgICAgICBhZGp1c3RDdXJzb3JBZnRlckJ5LFxuICAgICAgICAgIHdpdGhUcmFpbGluZ1NwYWNlLFxuICAgICAgICBdID0gaW5zZXJ0TWVudGlvblN0dWIuZ2V0Q2FsbCgwKS5hcmdzO1xuXG4gICAgICAgIGFzc2VydC5lcXVhbChtZW1iZXIsIG1lbWJlcnNbMV0pO1xuICAgICAgICBhc3NlcnQuZXF1YWwoZGlzdGFuY2VGcm9tQ3Vyc29yLCAwKTtcbiAgICAgICAgYXNzZXJ0LmVxdWFsKGFkanVzdEN1cnNvckFmdGVyQnksIDUpO1xuICAgICAgICBhc3NlcnQuZXF1YWwod2l0aFRyYWlsaW5nU3BhY2UsIHRydWUpO1xuICAgICAgfSk7XG5cbiAgICAgIGRlc2NyaWJlKCdmcm9tIHRoZSBtaWRkbGUgb2YgYSBzdHJpbmcnLCAoKSA9PiB7XG4gICAgICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgICAgIG1vY2tRdWlsbC5nZXRTZWxlY3Rpb24/LnJldHVybnMoeyBpbmRleDogOSB9KTtcbiAgICAgICAgICBtb2NrUXVpbGwuZ2V0TGVhZj8ucmV0dXJucyhbeyB0ZXh0OiAnZm9vIEBzaGlhIGJhcicgfSwgOV0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnaW5zZXJ0cyBjb3JyZWN0bHknLCAoKSA9PiB7XG4gICAgICAgICAgbWVudGlvbkNvbXBsZXRpb24uY29tcGxldGVNZW50aW9uKDEpO1xuXG4gICAgICAgICAgY29uc3QgW1xuICAgICAgICAgICAgbWVtYmVyLFxuICAgICAgICAgICAgZGlzdGFuY2VGcm9tQ3Vyc29yLFxuICAgICAgICAgICAgYWRqdXN0Q3Vyc29yQWZ0ZXJCeSxcbiAgICAgICAgICAgIHdpdGhUcmFpbGluZ1NwYWNlLFxuICAgICAgICAgIF0gPSBpbnNlcnRNZW50aW9uU3R1Yi5nZXRDYWxsKDApLmFyZ3M7XG5cbiAgICAgICAgICBhc3NlcnQuZXF1YWwobWVtYmVyLCBtZW1iZXJzWzFdKTtcbiAgICAgICAgICBhc3NlcnQuZXF1YWwoZGlzdGFuY2VGcm9tQ3Vyc29yLCA0KTtcbiAgICAgICAgICBhc3NlcnQuZXF1YWwoYWRqdXN0Q3Vyc29yQWZ0ZXJCeSwgNSk7XG4gICAgICAgICAgYXNzZXJ0LmVxdWFsKHdpdGhUcmFpbGluZ1NwYWNlLCB0cnVlKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgZGVzY3JpYmUoJ2dpdmVuIGEgY29tcGxldGFibGUgbWVudGlvbiBzdGFydGluZyB3aXRoIGEgY2FwaXRhbCBsZXR0ZXInLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHRleHQgPSAnQFNoJztcbiAgICAgICAgY29uc3QgaW5kZXggPSB0ZXh0Lmxlbmd0aDtcblxuICAgICAgICBiZWZvcmVFYWNoKGZ1bmN0aW9uIGJlZm9yZUVhY2goKSB7XG4gICAgICAgICAgbW9ja1F1aWxsLmdldFNlbGVjdGlvbj8ucmV0dXJucyh7IGluZGV4IH0pO1xuXG4gICAgICAgICAgY29uc3QgYmxvdCA9IHtcbiAgICAgICAgICAgIHRleHQsXG4gICAgICAgICAgfTtcbiAgICAgICAgICBtb2NrUXVpbGwuZ2V0TGVhZj8ucmV0dXJucyhbYmxvdCwgaW5kZXhdKTtcblxuICAgICAgICAgIG1lbnRpb25Db21wbGV0aW9uLmNvbXBsZXRlTWVudGlvbigxKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2luc2VydHMgdGhlIGN1cnJlbnRseSBzZWxlY3RlZCBtZW50aW9uIGF0IHRoZSBjdXJyZW50IGN1cnNvciBwb3NpdGlvbicsICgpID0+IHtcbiAgICAgICAgICBjb25zdCBbXG4gICAgICAgICAgICBtZW1iZXIsXG4gICAgICAgICAgICBkaXN0YW5jZUZyb21DdXJzb3IsXG4gICAgICAgICAgICBhZGp1c3RDdXJzb3JBZnRlckJ5LFxuICAgICAgICAgICAgd2l0aFRyYWlsaW5nU3BhY2UsXG4gICAgICAgICAgXSA9IGluc2VydE1lbnRpb25TdHViLmdldENhbGwoMCkuYXJncztcblxuICAgICAgICAgIGFzc2VydC5lcXVhbChtZW1iZXIsIG1lbWJlcnNbMV0pO1xuICAgICAgICAgIGFzc2VydC5lcXVhbChkaXN0YW5jZUZyb21DdXJzb3IsIDApO1xuICAgICAgICAgIGFzc2VydC5lcXVhbChhZGp1c3RDdXJzb3JBZnRlckJ5LCAzKTtcbiAgICAgICAgICBhc3NlcnQuZXF1YWwod2l0aFRyYWlsaW5nU3BhY2UsIHRydWUpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7OztBQUdBLGtCQUF1QjtBQUN2Qix5QkFBa0I7QUFFbEIsbUJBQWtCO0FBS2xCLHdCQUFrQztBQUVsQyw4QkFBaUM7QUFDakMsa0JBQTBCO0FBQzFCLG9DQUErQztBQUUvQyxNQUFNLEtBQXVCLGtFQUErQjtBQUFBLEVBQzFELElBQUk7QUFBQSxFQUNKLE9BQU87QUFBQSxFQUNQLFdBQVc7QUFBQSxFQUNYLGFBQWE7QUFBQSxFQUNiLE1BQU07QUFBQSxFQUNOLGFBQWEsS0FBSyxJQUFJO0FBQUEsRUFDdEIsY0FBYztBQUFBLEVBQ2QsWUFBWTtBQUFBLEVBQ1osTUFBTTtBQUNSLENBQUM7QUFFRCxNQUFNLFVBQW1DO0FBQUEsRUFDdkMsa0VBQStCO0FBQUEsSUFDN0IsSUFBSTtBQUFBLElBQ0osT0FBTztBQUFBLElBQ1AsV0FBVztBQUFBLElBQ1gsYUFBYTtBQUFBLElBQ2IsTUFBTTtBQUFBLElBQ04sYUFBYSxLQUFLLElBQUk7QUFBQSxJQUN0QixjQUFjO0FBQUEsSUFDZCxZQUFZO0FBQUEsRUFDZCxDQUFDO0FBQUEsRUFDRCxrRUFBK0I7QUFBQSxJQUM3QixJQUFJO0FBQUEsSUFDSixPQUFPO0FBQUEsSUFDUCxXQUFXO0FBQUEsSUFDWCxhQUFhO0FBQUEsSUFDYixNQUFNO0FBQUEsSUFDTixhQUFhLEtBQUssSUFBSTtBQUFBLElBQ3RC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
