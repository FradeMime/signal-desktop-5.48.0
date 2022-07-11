var import_chai = require("chai");
var import_memberRepository = require("../../quill/memberRepository");
var import_getDefaultConversation = require("../../test-both/helpers/getDefaultConversation");
const memberMahershala = (0, import_getDefaultConversation.getDefaultConversationWithUuid)({
  id: "555444",
  title: "Pal",
  firstName: "Mahershala",
  profileName: "Mr Ali",
  name: "Friend",
  type: "direct",
  lastUpdated: Date.now(),
  markedUnread: false,
  areWeAdmin: false
});
const memberShia = (0, import_getDefaultConversation.getDefaultConversationWithUuid)({
  id: "333222",
  title: "Buddy",
  firstName: "Shia",
  profileName: "Sr LaBeouf",
  name: "Duder",
  type: "direct",
  lastUpdated: Date.now(),
  markedUnread: false,
  areWeAdmin: false
});
const members = [memberMahershala, memberShia];
const singleMember = (0, import_getDefaultConversation.getDefaultConversationWithUuid)({
  id: "666777",
  title: "The Guy",
  firstName: "Jeff",
  profileName: "Jr Klaus",
  name: "Him",
  type: "direct",
  lastUpdated: Date.now(),
  markedUnread: false,
  areWeAdmin: false
});
describe("MemberRepository", () => {
  describe("#updateMembers", () => {
    it("updates with given members", () => {
      const memberRepository = new import_memberRepository.MemberRepository(members);
      import_chai.assert.deepEqual(memberRepository.getMembers(), members);
      const updatedMembers = [...members, singleMember];
      memberRepository.updateMembers(updatedMembers);
      import_chai.assert.deepEqual(memberRepository.getMembers(), updatedMembers);
    });
  });
  describe("#getMemberById", () => {
    it("returns undefined when there is no search id", () => {
      const memberRepository = new import_memberRepository.MemberRepository(members);
      import_chai.assert.isUndefined(memberRepository.getMemberById());
    });
    it("returns a matched member", () => {
      const memberRepository = new import_memberRepository.MemberRepository(members);
      import_chai.assert.isDefined(memberRepository.getMemberById("555444"));
    });
    it("returns undefined when it does not have the member", () => {
      const memberRepository = new import_memberRepository.MemberRepository(members);
      import_chai.assert.isUndefined(memberRepository.getMemberById("nope"));
    });
  });
  describe("#getMemberByUuid", () => {
    it("returns undefined when there is no search uuid", () => {
      const memberRepository = new import_memberRepository.MemberRepository(members);
      import_chai.assert.isUndefined(memberRepository.getMemberByUuid());
    });
    it("returns a matched member", () => {
      const memberRepository = new import_memberRepository.MemberRepository(members);
      import_chai.assert.isDefined(memberRepository.getMemberByUuid(memberMahershala.uuid));
    });
    it("returns undefined when it does not have the member", () => {
      const memberRepository = new import_memberRepository.MemberRepository(members);
      import_chai.assert.isUndefined(memberRepository.getMemberByUuid("nope"));
    });
  });
  describe("#search", () => {
    describe("given a prefix-matching string on last name", () => {
      it("returns the match", () => {
        const memberRepository = new import_memberRepository.MemberRepository(members);
        const results = memberRepository.search("a");
        import_chai.assert.deepEqual(results, [memberMahershala]);
      });
    });
    describe("given a prefix-matching string on first name", () => {
      it("returns the match", () => {
        const memberRepository = new import_memberRepository.MemberRepository(members);
        const results = memberRepository.search("ma");
        import_chai.assert.deepEqual(results, [memberMahershala]);
      });
    });
    describe("given a prefix-matching string on profile name", () => {
      it("returns the match", () => {
        const memberRepository = new import_memberRepository.MemberRepository(members);
        const results = memberRepository.search("sr");
        import_chai.assert.deepEqual(results, [memberShia]);
      });
    });
    describe("given a prefix-matching string on name", () => {
      it("returns the match", () => {
        const memberRepository = new import_memberRepository.MemberRepository(members);
        const results = memberRepository.search("dude");
        import_chai.assert.deepEqual(results, [memberShia]);
      });
    });
    describe("given a prefix-matching string on title", () => {
      it("returns the match", () => {
        const memberRepository = new import_memberRepository.MemberRepository(members);
        const results = memberRepository.search("bud");
        import_chai.assert.deepEqual(results, [memberShia]);
      });
      it("handles titles with Unicode bidi characters, which some contacts have", () => {
        const memberShiaBidi = {
          ...memberShia,
          title: "\u2086Buddyo\u2069"
        };
        const memberRepository = new import_memberRepository.MemberRepository([
          memberMahershala,
          memberShiaBidi
        ]);
        const results = memberRepository.search("bud");
        import_chai.assert.deepEqual(results, [memberShiaBidi]);
      });
    });
    describe("given a match in the middle of a name", () => {
      it("returns zero matches", () => {
        const memberRepository = new import_memberRepository.MemberRepository(members);
        const results = memberRepository.search("e");
        import_chai.assert.deepEqual(results, []);
      });
    });
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibWVtYmVyUmVwb3NpdG9yeV90ZXN0LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMC0yMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSAnY2hhaSc7XG5cbmltcG9ydCB0eXBlIHsgQ29udmVyc2F0aW9uVHlwZSB9IGZyb20gJy4uLy4uL3N0YXRlL2R1Y2tzL2NvbnZlcnNhdGlvbnMnO1xuaW1wb3J0IHsgTWVtYmVyUmVwb3NpdG9yeSB9IGZyb20gJy4uLy4uL3F1aWxsL21lbWJlclJlcG9zaXRvcnknO1xuaW1wb3J0IHsgZ2V0RGVmYXVsdENvbnZlcnNhdGlvbldpdGhVdWlkIH0gZnJvbSAnLi4vLi4vdGVzdC1ib3RoL2hlbHBlcnMvZ2V0RGVmYXVsdENvbnZlcnNhdGlvbic7XG5cbmNvbnN0IG1lbWJlck1haGVyc2hhbGE6IENvbnZlcnNhdGlvblR5cGUgPSBnZXREZWZhdWx0Q29udmVyc2F0aW9uV2l0aFV1aWQoe1xuICBpZDogJzU1NTQ0NCcsXG4gIHRpdGxlOiAnUGFsJyxcbiAgZmlyc3ROYW1lOiAnTWFoZXJzaGFsYScsXG4gIHByb2ZpbGVOYW1lOiAnTXIgQWxpJyxcbiAgbmFtZTogJ0ZyaWVuZCcsXG4gIHR5cGU6ICdkaXJlY3QnLFxuICBsYXN0VXBkYXRlZDogRGF0ZS5ub3coKSxcbiAgbWFya2VkVW5yZWFkOiBmYWxzZSxcbiAgYXJlV2VBZG1pbjogZmFsc2UsXG59KTtcblxuY29uc3QgbWVtYmVyU2hpYTogQ29udmVyc2F0aW9uVHlwZSA9IGdldERlZmF1bHRDb252ZXJzYXRpb25XaXRoVXVpZCh7XG4gIGlkOiAnMzMzMjIyJyxcbiAgdGl0bGU6ICdCdWRkeScsXG4gIGZpcnN0TmFtZTogJ1NoaWEnLFxuICBwcm9maWxlTmFtZTogJ1NyIExhQmVvdWYnLFxuICBuYW1lOiAnRHVkZXInLFxuICB0eXBlOiAnZGlyZWN0JyxcbiAgbGFzdFVwZGF0ZWQ6IERhdGUubm93KCksXG4gIG1hcmtlZFVucmVhZDogZmFsc2UsXG4gIGFyZVdlQWRtaW46IGZhbHNlLFxufSk7XG5cbmNvbnN0IG1lbWJlcnM6IEFycmF5PENvbnZlcnNhdGlvblR5cGU+ID0gW21lbWJlck1haGVyc2hhbGEsIG1lbWJlclNoaWFdO1xuXG5jb25zdCBzaW5nbGVNZW1iZXI6IENvbnZlcnNhdGlvblR5cGUgPSBnZXREZWZhdWx0Q29udmVyc2F0aW9uV2l0aFV1aWQoe1xuICBpZDogJzY2Njc3NycsXG4gIHRpdGxlOiAnVGhlIEd1eScsXG4gIGZpcnN0TmFtZTogJ0plZmYnLFxuICBwcm9maWxlTmFtZTogJ0pyIEtsYXVzJyxcbiAgbmFtZTogJ0hpbScsXG4gIHR5cGU6ICdkaXJlY3QnLFxuICBsYXN0VXBkYXRlZDogRGF0ZS5ub3coKSxcbiAgbWFya2VkVW5yZWFkOiBmYWxzZSxcbiAgYXJlV2VBZG1pbjogZmFsc2UsXG59KTtcblxuZGVzY3JpYmUoJ01lbWJlclJlcG9zaXRvcnknLCAoKSA9PiB7XG4gIGRlc2NyaWJlKCcjdXBkYXRlTWVtYmVycycsICgpID0+IHtcbiAgICBpdCgndXBkYXRlcyB3aXRoIGdpdmVuIG1lbWJlcnMnLCAoKSA9PiB7XG4gICAgICBjb25zdCBtZW1iZXJSZXBvc2l0b3J5ID0gbmV3IE1lbWJlclJlcG9zaXRvcnkobWVtYmVycyk7XG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKG1lbWJlclJlcG9zaXRvcnkuZ2V0TWVtYmVycygpLCBtZW1iZXJzKTtcblxuICAgICAgY29uc3QgdXBkYXRlZE1lbWJlcnMgPSBbLi4ubWVtYmVycywgc2luZ2xlTWVtYmVyXTtcbiAgICAgIG1lbWJlclJlcG9zaXRvcnkudXBkYXRlTWVtYmVycyh1cGRhdGVkTWVtYmVycyk7XG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKG1lbWJlclJlcG9zaXRvcnkuZ2V0TWVtYmVycygpLCB1cGRhdGVkTWVtYmVycyk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCcjZ2V0TWVtYmVyQnlJZCcsICgpID0+IHtcbiAgICBpdCgncmV0dXJucyB1bmRlZmluZWQgd2hlbiB0aGVyZSBpcyBubyBzZWFyY2ggaWQnLCAoKSA9PiB7XG4gICAgICBjb25zdCBtZW1iZXJSZXBvc2l0b3J5ID0gbmV3IE1lbWJlclJlcG9zaXRvcnkobWVtYmVycyk7XG4gICAgICBhc3NlcnQuaXNVbmRlZmluZWQobWVtYmVyUmVwb3NpdG9yeS5nZXRNZW1iZXJCeUlkKCkpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgYSBtYXRjaGVkIG1lbWJlcicsICgpID0+IHtcbiAgICAgIGNvbnN0IG1lbWJlclJlcG9zaXRvcnkgPSBuZXcgTWVtYmVyUmVwb3NpdG9yeShtZW1iZXJzKTtcbiAgICAgIGFzc2VydC5pc0RlZmluZWQobWVtYmVyUmVwb3NpdG9yeS5nZXRNZW1iZXJCeUlkKCc1NTU0NDQnKSk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyB1bmRlZmluZWQgd2hlbiBpdCBkb2VzIG5vdCBoYXZlIHRoZSBtZW1iZXInLCAoKSA9PiB7XG4gICAgICBjb25zdCBtZW1iZXJSZXBvc2l0b3J5ID0gbmV3IE1lbWJlclJlcG9zaXRvcnkobWVtYmVycyk7XG4gICAgICBhc3NlcnQuaXNVbmRlZmluZWQobWVtYmVyUmVwb3NpdG9yeS5nZXRNZW1iZXJCeUlkKCdub3BlJykpO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnI2dldE1lbWJlckJ5VXVpZCcsICgpID0+IHtcbiAgICBpdCgncmV0dXJucyB1bmRlZmluZWQgd2hlbiB0aGVyZSBpcyBubyBzZWFyY2ggdXVpZCcsICgpID0+IHtcbiAgICAgIGNvbnN0IG1lbWJlclJlcG9zaXRvcnkgPSBuZXcgTWVtYmVyUmVwb3NpdG9yeShtZW1iZXJzKTtcbiAgICAgIGFzc2VydC5pc1VuZGVmaW5lZChtZW1iZXJSZXBvc2l0b3J5LmdldE1lbWJlckJ5VXVpZCgpKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIGEgbWF0Y2hlZCBtZW1iZXInLCAoKSA9PiB7XG4gICAgICBjb25zdCBtZW1iZXJSZXBvc2l0b3J5ID0gbmV3IE1lbWJlclJlcG9zaXRvcnkobWVtYmVycyk7XG4gICAgICBhc3NlcnQuaXNEZWZpbmVkKG1lbWJlclJlcG9zaXRvcnkuZ2V0TWVtYmVyQnlVdWlkKG1lbWJlck1haGVyc2hhbGEudXVpZCkpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgdW5kZWZpbmVkIHdoZW4gaXQgZG9lcyBub3QgaGF2ZSB0aGUgbWVtYmVyJywgKCkgPT4ge1xuICAgICAgY29uc3QgbWVtYmVyUmVwb3NpdG9yeSA9IG5ldyBNZW1iZXJSZXBvc2l0b3J5KG1lbWJlcnMpO1xuICAgICAgYXNzZXJ0LmlzVW5kZWZpbmVkKG1lbWJlclJlcG9zaXRvcnkuZ2V0TWVtYmVyQnlVdWlkKCdub3BlJykpO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnI3NlYXJjaCcsICgpID0+IHtcbiAgICBkZXNjcmliZSgnZ2l2ZW4gYSBwcmVmaXgtbWF0Y2hpbmcgc3RyaW5nIG9uIGxhc3QgbmFtZScsICgpID0+IHtcbiAgICAgIGl0KCdyZXR1cm5zIHRoZSBtYXRjaCcsICgpID0+IHtcbiAgICAgICAgY29uc3QgbWVtYmVyUmVwb3NpdG9yeSA9IG5ldyBNZW1iZXJSZXBvc2l0b3J5KG1lbWJlcnMpO1xuICAgICAgICBjb25zdCByZXN1bHRzID0gbWVtYmVyUmVwb3NpdG9yeS5zZWFyY2goJ2EnKTtcbiAgICAgICAgYXNzZXJ0LmRlZXBFcXVhbChyZXN1bHRzLCBbbWVtYmVyTWFoZXJzaGFsYV0pO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnZ2l2ZW4gYSBwcmVmaXgtbWF0Y2hpbmcgc3RyaW5nIG9uIGZpcnN0IG5hbWUnLCAoKSA9PiB7XG4gICAgICBpdCgncmV0dXJucyB0aGUgbWF0Y2gnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG1lbWJlclJlcG9zaXRvcnkgPSBuZXcgTWVtYmVyUmVwb3NpdG9yeShtZW1iZXJzKTtcbiAgICAgICAgY29uc3QgcmVzdWx0cyA9IG1lbWJlclJlcG9zaXRvcnkuc2VhcmNoKCdtYScpO1xuICAgICAgICBhc3NlcnQuZGVlcEVxdWFsKHJlc3VsdHMsIFttZW1iZXJNYWhlcnNoYWxhXSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdnaXZlbiBhIHByZWZpeC1tYXRjaGluZyBzdHJpbmcgb24gcHJvZmlsZSBuYW1lJywgKCkgPT4ge1xuICAgICAgaXQoJ3JldHVybnMgdGhlIG1hdGNoJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBtZW1iZXJSZXBvc2l0b3J5ID0gbmV3IE1lbWJlclJlcG9zaXRvcnkobWVtYmVycyk7XG4gICAgICAgIGNvbnN0IHJlc3VsdHMgPSBtZW1iZXJSZXBvc2l0b3J5LnNlYXJjaCgnc3InKTtcbiAgICAgICAgYXNzZXJ0LmRlZXBFcXVhbChyZXN1bHRzLCBbbWVtYmVyU2hpYV0pO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnZ2l2ZW4gYSBwcmVmaXgtbWF0Y2hpbmcgc3RyaW5nIG9uIG5hbWUnLCAoKSA9PiB7XG4gICAgICBpdCgncmV0dXJucyB0aGUgbWF0Y2gnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG1lbWJlclJlcG9zaXRvcnkgPSBuZXcgTWVtYmVyUmVwb3NpdG9yeShtZW1iZXJzKTtcbiAgICAgICAgY29uc3QgcmVzdWx0cyA9IG1lbWJlclJlcG9zaXRvcnkuc2VhcmNoKCdkdWRlJyk7XG4gICAgICAgIGFzc2VydC5kZWVwRXF1YWwocmVzdWx0cywgW21lbWJlclNoaWFdKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2dpdmVuIGEgcHJlZml4LW1hdGNoaW5nIHN0cmluZyBvbiB0aXRsZScsICgpID0+IHtcbiAgICAgIGl0KCdyZXR1cm5zIHRoZSBtYXRjaCcsICgpID0+IHtcbiAgICAgICAgY29uc3QgbWVtYmVyUmVwb3NpdG9yeSA9IG5ldyBNZW1iZXJSZXBvc2l0b3J5KG1lbWJlcnMpO1xuICAgICAgICBjb25zdCByZXN1bHRzID0gbWVtYmVyUmVwb3NpdG9yeS5zZWFyY2goJ2J1ZCcpO1xuICAgICAgICBhc3NlcnQuZGVlcEVxdWFsKHJlc3VsdHMsIFttZW1iZXJTaGlhXSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ2hhbmRsZXMgdGl0bGVzIHdpdGggVW5pY29kZSBiaWRpIGNoYXJhY3RlcnMsIHdoaWNoIHNvbWUgY29udGFjdHMgaGF2ZScsICgpID0+IHtcbiAgICAgICAgY29uc3QgbWVtYmVyU2hpYUJpZGk6IENvbnZlcnNhdGlvblR5cGUgPSB7XG4gICAgICAgICAgLi4ubWVtYmVyU2hpYSxcbiAgICAgICAgICB0aXRsZTogJ1xcdTIwODZCdWRkeW9cXHUyMDY5JyxcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgbWVtYmVyUmVwb3NpdG9yeSA9IG5ldyBNZW1iZXJSZXBvc2l0b3J5KFtcbiAgICAgICAgICBtZW1iZXJNYWhlcnNoYWxhLFxuICAgICAgICAgIG1lbWJlclNoaWFCaWRpLFxuICAgICAgICBdKTtcbiAgICAgICAgY29uc3QgcmVzdWx0cyA9IG1lbWJlclJlcG9zaXRvcnkuc2VhcmNoKCdidWQnKTtcbiAgICAgICAgYXNzZXJ0LmRlZXBFcXVhbChyZXN1bHRzLCBbbWVtYmVyU2hpYUJpZGldKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2dpdmVuIGEgbWF0Y2ggaW4gdGhlIG1pZGRsZSBvZiBhIG5hbWUnLCAoKSA9PiB7XG4gICAgICBpdCgncmV0dXJucyB6ZXJvIG1hdGNoZXMnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG1lbWJlclJlcG9zaXRvcnkgPSBuZXcgTWVtYmVyUmVwb3NpdG9yeShtZW1iZXJzKTtcbiAgICAgICAgY29uc3QgcmVzdWx0cyA9IG1lbWJlclJlcG9zaXRvcnkuc2VhcmNoKCdlJyk7XG4gICAgICAgIGFzc2VydC5kZWVwRXF1YWwocmVzdWx0cywgW10p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
