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
var import_matchers = require("../../../quill/mentions/matchers");
var import_memberRepository = require("../../../quill/memberRepository");
var import_getDefaultConversation = require("../../../test-both/helpers/getDefaultConversation");
class FakeTokenList extends Array {
  constructor(elements) {
    super();
    elements.forEach((element) => this.push(element));
  }
  contains(searchElement) {
    return this.includes(searchElement);
  }
}
const createMockElement = /* @__PURE__ */ __name((className, dataset) => ({
  classList: new FakeTokenList([className]),
  dataset
}), "createMockElement");
const createMockAtMentionElement = /* @__PURE__ */ __name((dataset) => createMockElement("MessageBody__at-mention", dataset), "createMockAtMentionElement");
const createMockMentionBlotElement = /* @__PURE__ */ __name((dataset) => createMockElement("mention-blot", dataset), "createMockMentionBlotElement");
const memberMahershala = (0, import_getDefaultConversation.getDefaultConversationWithUuid)({
  id: "555444",
  title: "Mahershala Ali",
  firstName: "Mahershala",
  profileName: "Mahershala A.",
  type: "direct",
  lastUpdated: Date.now(),
  markedUnread: false,
  areWeAdmin: false
});
const memberShia = (0, import_getDefaultConversation.getDefaultConversationWithUuid)({
  id: "333222",
  title: "Shia LaBeouf",
  firstName: "Shia",
  profileName: "Shia L.",
  type: "direct",
  lastUpdated: Date.now(),
  markedUnread: false,
  areWeAdmin: false
});
const members = [memberMahershala, memberShia];
const memberRepositoryRef = {
  current: new import_memberRepository.MemberRepository(members)
};
const matcher = (0, import_matchers.matchMention)(memberRepositoryRef);
const isMention = /* @__PURE__ */ __name((insert) => {
  if (insert) {
    if (Object.getOwnPropertyNames(insert).includes("mention"))
      return true;
  }
  return false;
}, "isMention");
const EMPTY_DELTA = new import_quill_delta.default();
describe("matchMention", () => {
  it("handles an AtMentionify from clipboard", () => {
    const result = matcher(createMockAtMentionElement({
      id: memberMahershala.id,
      title: memberMahershala.title
    }), EMPTY_DELTA);
    const { ops } = result;
    import_chai.assert.isNotEmpty(ops);
    const [op] = ops;
    const { insert } = op;
    if (isMention(insert)) {
      const { title, uuid } = insert.mention;
      import_chai.assert.equal(title, memberMahershala.title);
      import_chai.assert.equal(uuid, memberMahershala.uuid);
    } else {
      import_chai.assert.fail("insert is invalid");
    }
  });
  it("handles an MentionBlot from clipboard", () => {
    const result = matcher(createMockMentionBlotElement({
      uuid: memberMahershala.uuid || "",
      title: memberMahershala.title
    }), EMPTY_DELTA);
    const { ops } = result;
    import_chai.assert.isNotEmpty(ops);
    const [op] = ops;
    const { insert } = op;
    if (isMention(insert)) {
      const { title, uuid } = insert.mention;
      import_chai.assert.equal(title, memberMahershala.title);
      import_chai.assert.equal(uuid, memberMahershala.uuid);
    } else {
      import_chai.assert.fail("insert is invalid");
    }
  });
  it("converts a missing AtMentionify to string", () => {
    const result = matcher(createMockAtMentionElement({
      id: "florp",
      title: "Nonexistent"
    }), EMPTY_DELTA);
    const { ops } = result;
    import_chai.assert.isNotEmpty(ops);
    const [op] = ops;
    const { insert } = op;
    if (isMention(insert)) {
      import_chai.assert.fail("insert is invalid");
    } else {
      import_chai.assert.equal(insert, "@Nonexistent");
    }
  });
  it("converts a missing MentionBlot to string", () => {
    const result = matcher(createMockMentionBlotElement({
      uuid: "florp",
      title: "Nonexistent"
    }), EMPTY_DELTA);
    const { ops } = result;
    import_chai.assert.isNotEmpty(ops);
    const [op] = ops;
    const { insert } = op;
    if (isMention(insert)) {
      import_chai.assert.fail("insert is invalid");
    } else {
      import_chai.assert.equal(insert, "@Nonexistent");
    }
  });
  it("passes other clipboard elements through", () => {
    const result = matcher(createMockElement("ignore", {}), EMPTY_DELTA);
    import_chai.assert.equal(result, EMPTY_DELTA);
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibWF0Y2hlcnNfdGVzdC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjAtMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IGFzc2VydCB9IGZyb20gJ2NoYWknO1xuaW1wb3J0IHR5cGUgeyBSZWZPYmplY3QgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgRGVsdGEgZnJvbSAncXVpbGwtZGVsdGEnO1xuXG5pbXBvcnQgeyBtYXRjaE1lbnRpb24gfSBmcm9tICcuLi8uLi8uLi9xdWlsbC9tZW50aW9ucy9tYXRjaGVycyc7XG5pbXBvcnQgeyBNZW1iZXJSZXBvc2l0b3J5IH0gZnJvbSAnLi4vLi4vLi4vcXVpbGwvbWVtYmVyUmVwb3NpdG9yeSc7XG5pbXBvcnQgdHlwZSB7IENvbnZlcnNhdGlvblR5cGUgfSBmcm9tICcuLi8uLi8uLi9zdGF0ZS9kdWNrcy9jb252ZXJzYXRpb25zJztcbmltcG9ydCB7IGdldERlZmF1bHRDb252ZXJzYXRpb25XaXRoVXVpZCB9IGZyb20gJy4uLy4uLy4uL3Rlc3QtYm90aC9oZWxwZXJzL2dldERlZmF1bHRDb252ZXJzYXRpb24nO1xuXG5jbGFzcyBGYWtlVG9rZW5MaXN0PFQ+IGV4dGVuZHMgQXJyYXk8VD4ge1xuICBjb25zdHJ1Y3RvcihlbGVtZW50czogQXJyYXk8VD4pIHtcbiAgICBzdXBlcigpO1xuICAgIGVsZW1lbnRzLmZvckVhY2goZWxlbWVudCA9PiB0aGlzLnB1c2goZWxlbWVudCkpO1xuICB9XG5cbiAgY29udGFpbnMoc2VhcmNoRWxlbWVudDogVCkge1xuICAgIHJldHVybiB0aGlzLmluY2x1ZGVzKHNlYXJjaEVsZW1lbnQpO1xuICB9XG59XG5cbmNvbnN0IGNyZWF0ZU1vY2tFbGVtZW50ID0gKFxuICBjbGFzc05hbWU6IHN0cmluZyxcbiAgZGF0YXNldDogUmVjb3JkPHN0cmluZywgc3RyaW5nPlxuKTogSFRNTEVsZW1lbnQgPT5cbiAgKHtcbiAgICBjbGFzc0xpc3Q6IG5ldyBGYWtlVG9rZW5MaXN0KFtjbGFzc05hbWVdKSxcbiAgICBkYXRhc2V0LFxuICB9IGFzIHVua25vd24gYXMgSFRNTEVsZW1lbnQpO1xuXG5jb25zdCBjcmVhdGVNb2NrQXRNZW50aW9uRWxlbWVudCA9IChcbiAgZGF0YXNldDogUmVjb3JkPHN0cmluZywgc3RyaW5nPlxuKTogSFRNTEVsZW1lbnQgPT4gY3JlYXRlTW9ja0VsZW1lbnQoJ01lc3NhZ2VCb2R5X19hdC1tZW50aW9uJywgZGF0YXNldCk7XG5cbmNvbnN0IGNyZWF0ZU1vY2tNZW50aW9uQmxvdEVsZW1lbnQgPSAoXG4gIGRhdGFzZXQ6IFJlY29yZDxzdHJpbmcsIHN0cmluZz5cbik6IEhUTUxFbGVtZW50ID0+IGNyZWF0ZU1vY2tFbGVtZW50KCdtZW50aW9uLWJsb3QnLCBkYXRhc2V0KTtcblxuY29uc3QgbWVtYmVyTWFoZXJzaGFsYTogQ29udmVyc2F0aW9uVHlwZSA9IGdldERlZmF1bHRDb252ZXJzYXRpb25XaXRoVXVpZCh7XG4gIGlkOiAnNTU1NDQ0JyxcbiAgdGl0bGU6ICdNYWhlcnNoYWxhIEFsaScsXG4gIGZpcnN0TmFtZTogJ01haGVyc2hhbGEnLFxuICBwcm9maWxlTmFtZTogJ01haGVyc2hhbGEgQS4nLFxuICB0eXBlOiAnZGlyZWN0JyxcbiAgbGFzdFVwZGF0ZWQ6IERhdGUubm93KCksXG4gIG1hcmtlZFVucmVhZDogZmFsc2UsXG4gIGFyZVdlQWRtaW46IGZhbHNlLFxufSk7XG5cbmNvbnN0IG1lbWJlclNoaWE6IENvbnZlcnNhdGlvblR5cGUgPSBnZXREZWZhdWx0Q29udmVyc2F0aW9uV2l0aFV1aWQoe1xuICBpZDogJzMzMzIyMicsXG4gIHRpdGxlOiAnU2hpYSBMYUJlb3VmJyxcbiAgZmlyc3ROYW1lOiAnU2hpYScsXG4gIHByb2ZpbGVOYW1lOiAnU2hpYSBMLicsXG4gIHR5cGU6ICdkaXJlY3QnLFxuICBsYXN0VXBkYXRlZDogRGF0ZS5ub3coKSxcbiAgbWFya2VkVW5yZWFkOiBmYWxzZSxcbiAgYXJlV2VBZG1pbjogZmFsc2UsXG59KTtcblxuY29uc3QgbWVtYmVyczogQXJyYXk8Q29udmVyc2F0aW9uVHlwZT4gPSBbbWVtYmVyTWFoZXJzaGFsYSwgbWVtYmVyU2hpYV07XG5cbmNvbnN0IG1lbWJlclJlcG9zaXRvcnlSZWY6IFJlZk9iamVjdDxNZW1iZXJSZXBvc2l0b3J5PiA9IHtcbiAgY3VycmVudDogbmV3IE1lbWJlclJlcG9zaXRvcnkobWVtYmVycyksXG59O1xuXG5jb25zdCBtYXRjaGVyID0gbWF0Y2hNZW50aW9uKG1lbWJlclJlcG9zaXRvcnlSZWYpO1xuXG50eXBlIE1lbnRpb24gPSB7XG4gIHV1aWQ6IHN0cmluZztcbiAgdGl0bGU6IHN0cmluZztcbn07XG5cbnR5cGUgTWVudGlvbkluc2VydCA9IHtcbiAgbWVudGlvbjogTWVudGlvbjtcbn07XG5cbmNvbnN0IGlzTWVudGlvbiA9IChpbnNlcnQ/OiB1bmtub3duKTogaW5zZXJ0IGlzIE1lbnRpb25JbnNlcnQgPT4ge1xuICBpZiAoaW5zZXJ0KSB7XG4gICAgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGluc2VydCkuaW5jbHVkZXMoJ21lbnRpb24nKSkgcmV0dXJuIHRydWU7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufTtcblxuY29uc3QgRU1QVFlfREVMVEEgPSBuZXcgRGVsdGEoKTtcblxuZGVzY3JpYmUoJ21hdGNoTWVudGlvbicsICgpID0+IHtcbiAgaXQoJ2hhbmRsZXMgYW4gQXRNZW50aW9uaWZ5IGZyb20gY2xpcGJvYXJkJywgKCkgPT4ge1xuICAgIGNvbnN0IHJlc3VsdCA9IG1hdGNoZXIoXG4gICAgICBjcmVhdGVNb2NrQXRNZW50aW9uRWxlbWVudCh7XG4gICAgICAgIGlkOiBtZW1iZXJNYWhlcnNoYWxhLmlkLFxuICAgICAgICB0aXRsZTogbWVtYmVyTWFoZXJzaGFsYS50aXRsZSxcbiAgICAgIH0pLFxuICAgICAgRU1QVFlfREVMVEFcbiAgICApO1xuICAgIGNvbnN0IHsgb3BzIH0gPSByZXN1bHQ7XG5cbiAgICBhc3NlcnQuaXNOb3RFbXB0eShvcHMpO1xuXG4gICAgY29uc3QgW29wXSA9IG9wcztcbiAgICBjb25zdCB7IGluc2VydCB9ID0gb3A7XG5cbiAgICBpZiAoaXNNZW50aW9uKGluc2VydCkpIHtcbiAgICAgIGNvbnN0IHsgdGl0bGUsIHV1aWQgfSA9IGluc2VydC5tZW50aW9uO1xuXG4gICAgICBhc3NlcnQuZXF1YWwodGl0bGUsIG1lbWJlck1haGVyc2hhbGEudGl0bGUpO1xuICAgICAgYXNzZXJ0LmVxdWFsKHV1aWQsIG1lbWJlck1haGVyc2hhbGEudXVpZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFzc2VydC5mYWlsKCdpbnNlcnQgaXMgaW52YWxpZCcpO1xuICAgIH1cbiAgfSk7XG5cbiAgaXQoJ2hhbmRsZXMgYW4gTWVudGlvbkJsb3QgZnJvbSBjbGlwYm9hcmQnLCAoKSA9PiB7XG4gICAgY29uc3QgcmVzdWx0ID0gbWF0Y2hlcihcbiAgICAgIGNyZWF0ZU1vY2tNZW50aW9uQmxvdEVsZW1lbnQoe1xuICAgICAgICB1dWlkOiBtZW1iZXJNYWhlcnNoYWxhLnV1aWQgfHwgJycsXG4gICAgICAgIHRpdGxlOiBtZW1iZXJNYWhlcnNoYWxhLnRpdGxlLFxuICAgICAgfSksXG4gICAgICBFTVBUWV9ERUxUQVxuICAgICk7XG4gICAgY29uc3QgeyBvcHMgfSA9IHJlc3VsdDtcblxuICAgIGFzc2VydC5pc05vdEVtcHR5KG9wcyk7XG5cbiAgICBjb25zdCBbb3BdID0gb3BzO1xuICAgIGNvbnN0IHsgaW5zZXJ0IH0gPSBvcDtcblxuICAgIGlmIChpc01lbnRpb24oaW5zZXJ0KSkge1xuICAgICAgY29uc3QgeyB0aXRsZSwgdXVpZCB9ID0gaW5zZXJ0Lm1lbnRpb247XG5cbiAgICAgIGFzc2VydC5lcXVhbCh0aXRsZSwgbWVtYmVyTWFoZXJzaGFsYS50aXRsZSk7XG4gICAgICBhc3NlcnQuZXF1YWwodXVpZCwgbWVtYmVyTWFoZXJzaGFsYS51dWlkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXNzZXJ0LmZhaWwoJ2luc2VydCBpcyBpbnZhbGlkJyk7XG4gICAgfVxuICB9KTtcblxuICBpdCgnY29udmVydHMgYSBtaXNzaW5nIEF0TWVudGlvbmlmeSB0byBzdHJpbmcnLCAoKSA9PiB7XG4gICAgY29uc3QgcmVzdWx0ID0gbWF0Y2hlcihcbiAgICAgIGNyZWF0ZU1vY2tBdE1lbnRpb25FbGVtZW50KHtcbiAgICAgICAgaWQ6ICdmbG9ycCcsXG4gICAgICAgIHRpdGxlOiAnTm9uZXhpc3RlbnQnLFxuICAgICAgfSksXG4gICAgICBFTVBUWV9ERUxUQVxuICAgICk7XG4gICAgY29uc3QgeyBvcHMgfSA9IHJlc3VsdDtcblxuICAgIGFzc2VydC5pc05vdEVtcHR5KG9wcyk7XG5cbiAgICBjb25zdCBbb3BdID0gb3BzO1xuICAgIGNvbnN0IHsgaW5zZXJ0IH0gPSBvcDtcblxuICAgIGlmIChpc01lbnRpb24oaW5zZXJ0KSkge1xuICAgICAgYXNzZXJ0LmZhaWwoJ2luc2VydCBpcyBpbnZhbGlkJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFzc2VydC5lcXVhbChpbnNlcnQsICdATm9uZXhpc3RlbnQnKTtcbiAgICB9XG4gIH0pO1xuXG4gIGl0KCdjb252ZXJ0cyBhIG1pc3NpbmcgTWVudGlvbkJsb3QgdG8gc3RyaW5nJywgKCkgPT4ge1xuICAgIGNvbnN0IHJlc3VsdCA9IG1hdGNoZXIoXG4gICAgICBjcmVhdGVNb2NrTWVudGlvbkJsb3RFbGVtZW50KHtcbiAgICAgICAgdXVpZDogJ2Zsb3JwJyxcbiAgICAgICAgdGl0bGU6ICdOb25leGlzdGVudCcsXG4gICAgICB9KSxcbiAgICAgIEVNUFRZX0RFTFRBXG4gICAgKTtcbiAgICBjb25zdCB7IG9wcyB9ID0gcmVzdWx0O1xuXG4gICAgYXNzZXJ0LmlzTm90RW1wdHkob3BzKTtcblxuICAgIGNvbnN0IFtvcF0gPSBvcHM7XG4gICAgY29uc3QgeyBpbnNlcnQgfSA9IG9wO1xuXG4gICAgaWYgKGlzTWVudGlvbihpbnNlcnQpKSB7XG4gICAgICBhc3NlcnQuZmFpbCgnaW5zZXJ0IGlzIGludmFsaWQnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXNzZXJ0LmVxdWFsKGluc2VydCwgJ0BOb25leGlzdGVudCcpO1xuICAgIH1cbiAgfSk7XG5cbiAgaXQoJ3Bhc3NlcyBvdGhlciBjbGlwYm9hcmQgZWxlbWVudHMgdGhyb3VnaCcsICgpID0+IHtcbiAgICBjb25zdCByZXN1bHQgPSBtYXRjaGVyKGNyZWF0ZU1vY2tFbGVtZW50KCdpZ25vcmUnLCB7fSksIEVNUFRZX0RFTFRBKTtcbiAgICBhc3NlcnQuZXF1YWwocmVzdWx0LCBFTVBUWV9ERUxUQSk7XG4gIH0pO1xufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7O0FBR0Esa0JBQXVCO0FBRXZCLHlCQUFrQjtBQUVsQixzQkFBNkI7QUFDN0IsOEJBQWlDO0FBRWpDLG9DQUErQztBQUUvQyxNQUFNLHNCQUF5QixNQUFTO0FBQUEsRUFDdEMsWUFBWSxVQUFvQjtBQUM5QixVQUFNO0FBQ04sYUFBUyxRQUFRLGFBQVcsS0FBSyxLQUFLLE9BQU8sQ0FBQztBQUFBLEVBQ2hEO0FBQUEsRUFFQSxTQUFTLGVBQWtCO0FBQ3pCLFdBQU8sS0FBSyxTQUFTLGFBQWE7QUFBQSxFQUNwQztBQUNGO0FBVEEsQUFXQSxNQUFNLG9CQUFvQix3QkFDeEIsV0FDQSxZQUVDO0FBQUEsRUFDQyxXQUFXLElBQUksY0FBYyxDQUFDLFNBQVMsQ0FBQztBQUFBLEVBQ3hDO0FBQ0YsSUFQd0I7QUFTMUIsTUFBTSw2QkFBNkIsd0JBQ2pDLFlBQ2dCLGtCQUFrQiwyQkFBMkIsT0FBTyxHQUZuQztBQUluQyxNQUFNLCtCQUErQix3QkFDbkMsWUFDZ0Isa0JBQWtCLGdCQUFnQixPQUFPLEdBRnRCO0FBSXJDLE1BQU0sbUJBQXFDLGtFQUErQjtBQUFBLEVBQ3hFLElBQUk7QUFBQSxFQUNKLE9BQU87QUFBQSxFQUNQLFdBQVc7QUFBQSxFQUNYLGFBQWE7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
