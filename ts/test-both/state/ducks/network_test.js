var import_chai = require("chai");
var import_network = require("../../../state/ducks/network");
describe("both/state/ducks/network", () => {
  describe("setChallengeStatus", () => {
    const { setChallengeStatus } = import_network.actions;
    it("updates whether we need to complete a server challenge", () => {
      const idleState = (0, import_network.reducer)((0, import_network.getEmptyState)(), setChallengeStatus("idle"));
      import_chai.assert.equal(idleState.challengeStatus, "idle");
      const requiredState = (0, import_network.reducer)(idleState, setChallengeStatus("required"));
      import_chai.assert.equal(requiredState.challengeStatus, "required");
      const pendingState = (0, import_network.reducer)(requiredState, setChallengeStatus("pending"));
      import_chai.assert.equal(pendingState.challengeStatus, "pending");
    });
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibmV0d29ya190ZXN0LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IGFzc2VydCB9IGZyb20gJ2NoYWknO1xuXG5pbXBvcnQgeyBhY3Rpb25zLCBnZXRFbXB0eVN0YXRlLCByZWR1Y2VyIH0gZnJvbSAnLi4vLi4vLi4vc3RhdGUvZHVja3MvbmV0d29yayc7XG5cbmRlc2NyaWJlKCdib3RoL3N0YXRlL2R1Y2tzL25ldHdvcmsnLCAoKSA9PiB7XG4gIGRlc2NyaWJlKCdzZXRDaGFsbGVuZ2VTdGF0dXMnLCAoKSA9PiB7XG4gICAgY29uc3QgeyBzZXRDaGFsbGVuZ2VTdGF0dXMgfSA9IGFjdGlvbnM7XG5cbiAgICBpdCgndXBkYXRlcyB3aGV0aGVyIHdlIG5lZWQgdG8gY29tcGxldGUgYSBzZXJ2ZXIgY2hhbGxlbmdlJywgKCkgPT4ge1xuICAgICAgY29uc3QgaWRsZVN0YXRlID0gcmVkdWNlcihnZXRFbXB0eVN0YXRlKCksIHNldENoYWxsZW5nZVN0YXR1cygnaWRsZScpKTtcbiAgICAgIGFzc2VydC5lcXVhbChpZGxlU3RhdGUuY2hhbGxlbmdlU3RhdHVzLCAnaWRsZScpO1xuXG4gICAgICBjb25zdCByZXF1aXJlZFN0YXRlID0gcmVkdWNlcihpZGxlU3RhdGUsIHNldENoYWxsZW5nZVN0YXR1cygncmVxdWlyZWQnKSk7XG4gICAgICBhc3NlcnQuZXF1YWwocmVxdWlyZWRTdGF0ZS5jaGFsbGVuZ2VTdGF0dXMsICdyZXF1aXJlZCcpO1xuXG4gICAgICBjb25zdCBwZW5kaW5nU3RhdGUgPSByZWR1Y2VyKFxuICAgICAgICByZXF1aXJlZFN0YXRlLFxuICAgICAgICBzZXRDaGFsbGVuZ2VTdGF0dXMoJ3BlbmRpbmcnKVxuICAgICAgKTtcbiAgICAgIGFzc2VydC5lcXVhbChwZW5kaW5nU3RhdGUuY2hhbGxlbmdlU3RhdHVzLCAncGVuZGluZycpO1xuICAgIH0pO1xuICB9KTtcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIkFBR0Esa0JBQXVCO0FBRXZCLHFCQUFnRDtBQUVoRCxTQUFTLDRCQUE0QixNQUFNO0FBQ3pDLFdBQVMsc0JBQXNCLE1BQU07QUFDbkMsVUFBTSxFQUFFLHVCQUF1QjtBQUUvQixPQUFHLDBEQUEwRCxNQUFNO0FBQ2pFLFlBQU0sWUFBWSw0QkFBUSxrQ0FBYyxHQUFHLG1CQUFtQixNQUFNLENBQUM7QUFDckUseUJBQU8sTUFBTSxVQUFVLGlCQUFpQixNQUFNO0FBRTlDLFlBQU0sZ0JBQWdCLDRCQUFRLFdBQVcsbUJBQW1CLFVBQVUsQ0FBQztBQUN2RSx5QkFBTyxNQUFNLGNBQWMsaUJBQWlCLFVBQVU7QUFFdEQsWUFBTSxlQUFlLDRCQUNuQixlQUNBLG1CQUFtQixTQUFTLENBQzlCO0FBQ0EseUJBQU8sTUFBTSxhQUFhLGlCQUFpQixTQUFTO0FBQUEsSUFDdEQsQ0FBQztBQUFBLEVBQ0gsQ0FBQztBQUNILENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==