var import_chai = require("chai");
var import_callingGetParticipantName = require("../../util/callingGetParticipantName");
describe("getParticipantName", () => {
  it("returns the first name if available", () => {
    const participant = {
      firstName: "Foo",
      title: "Foo Bar"
    };
    import_chai.assert.strictEqual((0, import_callingGetParticipantName.getParticipantName)(participant), "Foo");
  });
  it("returns the title if the first name is unavailable", () => {
    const participant = { title: "Foo Bar" };
    import_chai.assert.strictEqual((0, import_callingGetParticipantName.getParticipantName)(participant), "Foo Bar");
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiY2FsbGluZ0dldFBhcnRpY2lwYW50TmFtZV90ZXN0LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IGFzc2VydCB9IGZyb20gJ2NoYWknO1xuXG5pbXBvcnQgeyBnZXRQYXJ0aWNpcGFudE5hbWUgfSBmcm9tICcuLi8uLi91dGlsL2NhbGxpbmdHZXRQYXJ0aWNpcGFudE5hbWUnO1xuXG5kZXNjcmliZSgnZ2V0UGFydGljaXBhbnROYW1lJywgKCkgPT4ge1xuICBpdCgncmV0dXJucyB0aGUgZmlyc3QgbmFtZSBpZiBhdmFpbGFibGUnLCAoKSA9PiB7XG4gICAgY29uc3QgcGFydGljaXBhbnQgPSB7XG4gICAgICBmaXJzdE5hbWU6ICdGb28nLFxuICAgICAgdGl0bGU6ICdGb28gQmFyJyxcbiAgICB9O1xuXG4gICAgYXNzZXJ0LnN0cmljdEVxdWFsKGdldFBhcnRpY2lwYW50TmFtZShwYXJ0aWNpcGFudCksICdGb28nKTtcbiAgfSk7XG5cbiAgaXQoJ3JldHVybnMgdGhlIHRpdGxlIGlmIHRoZSBmaXJzdCBuYW1lIGlzIHVuYXZhaWxhYmxlJywgKCkgPT4ge1xuICAgIGNvbnN0IHBhcnRpY2lwYW50ID0geyB0aXRsZTogJ0ZvbyBCYXInIH07XG5cbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwoZ2V0UGFydGljaXBhbnROYW1lKHBhcnRpY2lwYW50KSwgJ0ZvbyBCYXInKTtcbiAgfSk7XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICJBQUdBLGtCQUF1QjtBQUV2Qix1Q0FBbUM7QUFFbkMsU0FBUyxzQkFBc0IsTUFBTTtBQUNuQyxLQUFHLHVDQUF1QyxNQUFNO0FBQzlDLFVBQU0sY0FBYztBQUFBLE1BQ2xCLFdBQVc7QUFBQSxNQUNYLE9BQU87QUFBQSxJQUNUO0FBRUEsdUJBQU8sWUFBWSx5REFBbUIsV0FBVyxHQUFHLEtBQUs7QUFBQSxFQUMzRCxDQUFDO0FBRUQsS0FBRyxzREFBc0QsTUFBTTtBQUM3RCxVQUFNLGNBQWMsRUFBRSxPQUFPLFVBQVU7QUFFdkMsdUJBQU8sWUFBWSx5REFBbUIsV0FBVyxHQUFHLFNBQVM7QUFBQSxFQUMvRCxDQUFDO0FBQ0gsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K