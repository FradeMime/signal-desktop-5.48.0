var import_chai = require("chai");
var import_getTextWithMentions = require("../../util/getTextWithMentions");
describe("getTextWithMentions", () => {
  describe("given mention replacements", () => {
    it("replaces them", () => {
      const bodyRanges = [
        {
          length: 1,
          mentionUuid: "abcdef",
          replacementText: "fred",
          start: 4
        }
      ];
      const text = "Hey \uFFFC, I'm here";
      import_chai.assert.strictEqual((0, import_getTextWithMentions.getTextWithMentions)(bodyRanges, text), "Hey @fred, I'm here");
    });
    it("sorts them to go from back to front", () => {
      const bodyRanges = [
        {
          length: 1,
          mentionUuid: "blarg",
          replacementText: "jerry",
          start: 0
        },
        {
          length: 1,
          mentionUuid: "abcdef",
          replacementText: "fred",
          start: 7
        }
      ];
      const text = "\uFFFC says \uFFFC, I'm here";
      import_chai.assert.strictEqual((0, import_getTextWithMentions.getTextWithMentions)(bodyRanges, text), "@jerry says @fred, I'm here");
    });
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZ2V0VGV4dFdpdGhNZW50aW9uc190ZXN0LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMC0yMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSAnY2hhaSc7XG5pbXBvcnQgeyBnZXRUZXh0V2l0aE1lbnRpb25zIH0gZnJvbSAnLi4vLi4vdXRpbC9nZXRUZXh0V2l0aE1lbnRpb25zJztcblxuZGVzY3JpYmUoJ2dldFRleHRXaXRoTWVudGlvbnMnLCAoKSA9PiB7XG4gIGRlc2NyaWJlKCdnaXZlbiBtZW50aW9uIHJlcGxhY2VtZW50cycsICgpID0+IHtcbiAgICBpdCgncmVwbGFjZXMgdGhlbScsICgpID0+IHtcbiAgICAgIGNvbnN0IGJvZHlSYW5nZXMgPSBbXG4gICAgICAgIHtcbiAgICAgICAgICBsZW5ndGg6IDEsXG4gICAgICAgICAgbWVudGlvblV1aWQ6ICdhYmNkZWYnLFxuICAgICAgICAgIHJlcGxhY2VtZW50VGV4dDogJ2ZyZWQnLFxuICAgICAgICAgIHN0YXJ0OiA0LFxuICAgICAgICB9LFxuICAgICAgXTtcbiAgICAgIGNvbnN0IHRleHQgPSBcIkhleSBcXHVGRkZDLCBJJ20gaGVyZVwiO1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgICBnZXRUZXh0V2l0aE1lbnRpb25zKGJvZHlSYW5nZXMsIHRleHQpLFxuICAgICAgICBcIkhleSBAZnJlZCwgSSdtIGhlcmVcIlxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIGl0KCdzb3J0cyB0aGVtIHRvIGdvIGZyb20gYmFjayB0byBmcm9udCcsICgpID0+IHtcbiAgICAgIGNvbnN0IGJvZHlSYW5nZXMgPSBbXG4gICAgICAgIHtcbiAgICAgICAgICBsZW5ndGg6IDEsXG4gICAgICAgICAgbWVudGlvblV1aWQ6ICdibGFyZycsXG4gICAgICAgICAgcmVwbGFjZW1lbnRUZXh0OiAnamVycnknLFxuICAgICAgICAgIHN0YXJ0OiAwLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbGVuZ3RoOiAxLFxuICAgICAgICAgIG1lbnRpb25VdWlkOiAnYWJjZGVmJyxcbiAgICAgICAgICByZXBsYWNlbWVudFRleHQ6ICdmcmVkJyxcbiAgICAgICAgICBzdGFydDogNyxcbiAgICAgICAgfSxcbiAgICAgIF07XG4gICAgICBjb25zdCB0ZXh0ID0gXCJcXHVGRkZDIHNheXMgXFx1RkZGQywgSSdtIGhlcmVcIjtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgICAgZ2V0VGV4dFdpdGhNZW50aW9ucyhib2R5UmFuZ2VzLCB0ZXh0KSxcbiAgICAgICAgXCJAamVycnkgc2F5cyBAZnJlZCwgSSdtIGhlcmVcIlxuICAgICAgKTtcbiAgICB9KTtcbiAgfSk7XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICJBQUdBLGtCQUF1QjtBQUN2QixpQ0FBb0M7QUFFcEMsU0FBUyx1QkFBdUIsTUFBTTtBQUNwQyxXQUFTLDhCQUE4QixNQUFNO0FBQzNDLE9BQUcsaUJBQWlCLE1BQU07QUFDeEIsWUFBTSxhQUFhO0FBQUEsUUFDakI7QUFBQSxVQUNFLFFBQVE7QUFBQSxVQUNSLGFBQWE7QUFBQSxVQUNiLGlCQUFpQjtBQUFBLFVBQ2pCLE9BQU87QUFBQSxRQUNUO0FBQUEsTUFDRjtBQUNBLFlBQU0sT0FBTztBQUNiLHlCQUFPLFlBQ0wsb0RBQW9CLFlBQVksSUFBSSxHQUNwQyxxQkFDRjtBQUFBLElBQ0YsQ0FBQztBQUVELE9BQUcsdUNBQXVDLE1BQU07QUFDOUMsWUFBTSxhQUFhO0FBQUEsUUFDakI7QUFBQSxVQUNFLFFBQVE7QUFBQSxVQUNSLGFBQWE7QUFBQSxVQUNiLGlCQUFpQjtBQUFBLFVBQ2pCLE9BQU87QUFBQSxRQUNUO0FBQUEsUUFDQTtBQUFBLFVBQ0UsUUFBUTtBQUFBLFVBQ1IsYUFBYTtBQUFBLFVBQ2IsaUJBQWlCO0FBQUEsVUFDakIsT0FBTztBQUFBLFFBQ1Q7QUFBQSxNQUNGO0FBQ0EsWUFBTSxPQUFPO0FBQ2IseUJBQU8sWUFDTCxvREFBb0IsWUFBWSxJQUFJLEdBQ3BDLDZCQUNGO0FBQUEsSUFDRixDQUFDO0FBQUEsRUFDSCxDQUFDO0FBQ0gsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
