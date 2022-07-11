var import_chai = require("chai");
var import_getDefaultConversation = require("../helpers/getDefaultConversation");
var import_groupMemberNameCollisions = require("../../util/groupMemberNameCollisions");
describe("group member name collision utilities", () => {
  describe("dehydrateCollisionsWithConversations", () => {
    it('turns conversations into "plain" IDs', () => {
      const conversation1 = (0, import_getDefaultConversation.getDefaultConversation)();
      const conversation2 = (0, import_getDefaultConversation.getDefaultConversation)();
      const conversation3 = (0, import_getDefaultConversation.getDefaultConversation)();
      const conversation4 = (0, import_getDefaultConversation.getDefaultConversation)();
      const result = (0, import_groupMemberNameCollisions.dehydrateCollisionsWithConversations)({
        Alice: [conversation1, conversation2],
        Bob: [conversation3, conversation4]
      });
      import_chai.assert.deepEqual(result, {
        Alice: [conversation1.id, conversation2.id],
        Bob: [conversation3.id, conversation4.id]
      });
    });
  });
  describe("getCollisionsFromMemberships", () => {
    it("finds collisions by title, omitting some conversations", () => {
      const alice1 = (0, import_getDefaultConversation.getDefaultConversation)({
        profileName: "Alice",
        title: "Alice"
      });
      const alice2 = (0, import_getDefaultConversation.getDefaultConversation)({
        profileName: "Alice",
        title: "Alice"
      });
      const bob1 = (0, import_getDefaultConversation.getDefaultConversation)({
        profileName: "Bob",
        title: "Bob"
      });
      const bob2 = (0, import_getDefaultConversation.getDefaultConversation)({
        name: "Bob In Your Contacts",
        profileName: "Bob",
        title: "Bob"
      });
      const bob3 = (0, import_getDefaultConversation.getDefaultConversation)({
        profileName: "Bob",
        title: "Bob"
      });
      const ignoredBob = (0, import_getDefaultConversation.getDefaultConversation)({
        e164: void 0,
        title: "Bob"
      });
      const charlie = (0, import_getDefaultConversation.getDefaultConversation)({
        profileName: "Charlie",
        title: "Charlie"
      });
      const donna1 = (0, import_getDefaultConversation.getDefaultConversation)({
        name: "Donna One",
        profileName: "Donna",
        title: "Donna"
      });
      const donna2 = (0, import_getDefaultConversation.getDefaultConversation)({
        name: "Donna Two",
        profileName: "Donna",
        title: "Donna"
      });
      const donna3 = (0, import_getDefaultConversation.getDefaultConversation)({
        name: "Donna Three",
        profileName: "Donna",
        title: "Donna"
      });
      const me = (0, import_getDefaultConversation.getDefaultConversation)({
        isMe: true,
        profileName: "Alice",
        title: "Alice"
      });
      const memberships = [
        alice1,
        alice2,
        bob1,
        bob2,
        bob3,
        ignoredBob,
        charlie,
        donna1,
        donna2,
        donna3,
        me
      ].map((member) => ({ member }));
      const result = (0, import_groupMemberNameCollisions.getCollisionsFromMemberships)(memberships);
      import_chai.assert.deepEqual(result, {
        Alice: [alice1, alice2],
        Bob: [bob1, bob2, bob3]
      });
    });
  });
  describe("hasUnacknowledgedCollisions", () => {
    it("returns false if the collisions are identical", () => {
      import_chai.assert.isFalse((0, import_groupMemberNameCollisions.hasUnacknowledgedCollisions)({}, {}));
      import_chai.assert.isFalse((0, import_groupMemberNameCollisions.hasUnacknowledgedCollisions)({ Alice: ["abc", "def"] }, { Alice: ["abc", "def"] }));
      import_chai.assert.isFalse((0, import_groupMemberNameCollisions.hasUnacknowledgedCollisions)({ Alice: ["abc", "def"] }, { Alice: ["def", "abc"] }));
    });
    it("returns false if the acknowledged collisions are a superset of the current collisions", () => {
      import_chai.assert.isFalse((0, import_groupMemberNameCollisions.hasUnacknowledgedCollisions)({ Alice: ["abc", "def"] }, {}));
      import_chai.assert.isFalse((0, import_groupMemberNameCollisions.hasUnacknowledgedCollisions)({ Alice: ["abc", "def", "geh"] }, { Alice: ["abc", "geh"] }));
      import_chai.assert.isFalse((0, import_groupMemberNameCollisions.hasUnacknowledgedCollisions)({ Alice: ["abc", "def"], Bob: ["ghi", "jkl"] }, { Alice: ["abc", "def"] }));
    });
    it("returns true if the current collisions has a title that was not acknowledged", () => {
      import_chai.assert.isTrue((0, import_groupMemberNameCollisions.hasUnacknowledgedCollisions)({ Alice: ["abc", "def"], Bob: ["ghi", "jkl"] }, {
        Alice: ["abc", "def"],
        Bob: ["ghi", "jkl"],
        Charlie: ["mno", "pqr"]
      }));
      import_chai.assert.isTrue((0, import_groupMemberNameCollisions.hasUnacknowledgedCollisions)({ Alice: ["abc", "def"], Bob: ["ghi", "jkl"] }, {
        Alice: ["abc", "def"],
        Charlie: ["mno", "pqr"]
      }));
    });
    it("returns true if any title has a new ID", () => {
      import_chai.assert.isTrue((0, import_groupMemberNameCollisions.hasUnacknowledgedCollisions)({ Alice: ["abc", "def"] }, { Alice: ["abc", "def", "ghi"] }));
      import_chai.assert.isTrue((0, import_groupMemberNameCollisions.hasUnacknowledgedCollisions)({ Alice: ["abc", "def"] }, { Alice: ["abc", "ghi"] }));
    });
  });
  describe("invertIdsByTitle", () => {
    it("returns an empty object if passed no IDs", () => {
      import_chai.assert.deepEqual((0, import_groupMemberNameCollisions.invertIdsByTitle)({}), {});
      import_chai.assert.deepEqual((0, import_groupMemberNameCollisions.invertIdsByTitle)({ Alice: [] }), {});
    });
    it("returns an object with ID keys and title values", () => {
      import_chai.assert.deepEqual((0, import_groupMemberNameCollisions.invertIdsByTitle)({ Alice: ["abc", "def"], Bob: ["ghi", "jkl", "mno"] }), {
        abc: "Alice",
        def: "Alice",
        ghi: "Bob",
        jkl: "Bob",
        mno: "Bob"
      });
    });
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZ3JvdXBNZW1iZXJOYW1lQ29sbGlzaW9uc190ZXN0LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IGFzc2VydCB9IGZyb20gJ2NoYWknO1xuaW1wb3J0IHsgZ2V0RGVmYXVsdENvbnZlcnNhdGlvbiB9IGZyb20gJy4uL2hlbHBlcnMvZ2V0RGVmYXVsdENvbnZlcnNhdGlvbic7XG5cbmltcG9ydCB7XG4gIGRlaHlkcmF0ZUNvbGxpc2lvbnNXaXRoQ29udmVyc2F0aW9ucyxcbiAgZ2V0Q29sbGlzaW9uc0Zyb21NZW1iZXJzaGlwcyxcbiAgaGFzVW5hY2tub3dsZWRnZWRDb2xsaXNpb25zLFxuICBpbnZlcnRJZHNCeVRpdGxlLFxufSBmcm9tICcuLi8uLi91dGlsL2dyb3VwTWVtYmVyTmFtZUNvbGxpc2lvbnMnO1xuXG5kZXNjcmliZSgnZ3JvdXAgbWVtYmVyIG5hbWUgY29sbGlzaW9uIHV0aWxpdGllcycsICgpID0+IHtcbiAgZGVzY3JpYmUoJ2RlaHlkcmF0ZUNvbGxpc2lvbnNXaXRoQ29udmVyc2F0aW9ucycsICgpID0+IHtcbiAgICBpdCgndHVybnMgY29udmVyc2F0aW9ucyBpbnRvIFwicGxhaW5cIiBJRHMnLCAoKSA9PiB7XG4gICAgICBjb25zdCBjb252ZXJzYXRpb24xID0gZ2V0RGVmYXVsdENvbnZlcnNhdGlvbigpO1xuICAgICAgY29uc3QgY29udmVyc2F0aW9uMiA9IGdldERlZmF1bHRDb252ZXJzYXRpb24oKTtcbiAgICAgIGNvbnN0IGNvbnZlcnNhdGlvbjMgPSBnZXREZWZhdWx0Q29udmVyc2F0aW9uKCk7XG4gICAgICBjb25zdCBjb252ZXJzYXRpb240ID0gZ2V0RGVmYXVsdENvbnZlcnNhdGlvbigpO1xuXG4gICAgICBjb25zdCByZXN1bHQgPSBkZWh5ZHJhdGVDb2xsaXNpb25zV2l0aENvbnZlcnNhdGlvbnMoe1xuICAgICAgICBBbGljZTogW2NvbnZlcnNhdGlvbjEsIGNvbnZlcnNhdGlvbjJdLFxuICAgICAgICBCb2I6IFtjb252ZXJzYXRpb24zLCBjb252ZXJzYXRpb240XSxcbiAgICAgIH0pO1xuXG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKHJlc3VsdCwge1xuICAgICAgICBBbGljZTogW2NvbnZlcnNhdGlvbjEuaWQsIGNvbnZlcnNhdGlvbjIuaWRdLFxuICAgICAgICBCb2I6IFtjb252ZXJzYXRpb24zLmlkLCBjb252ZXJzYXRpb240LmlkXSxcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnZ2V0Q29sbGlzaW9uc0Zyb21NZW1iZXJzaGlwcycsICgpID0+IHtcbiAgICBpdCgnZmluZHMgY29sbGlzaW9ucyBieSB0aXRsZSwgb21pdHRpbmcgc29tZSBjb252ZXJzYXRpb25zJywgKCkgPT4ge1xuICAgICAgY29uc3QgYWxpY2UxID0gZ2V0RGVmYXVsdENvbnZlcnNhdGlvbih7XG4gICAgICAgIHByb2ZpbGVOYW1lOiAnQWxpY2UnLFxuICAgICAgICB0aXRsZTogJ0FsaWNlJyxcbiAgICAgIH0pO1xuICAgICAgY29uc3QgYWxpY2UyID0gZ2V0RGVmYXVsdENvbnZlcnNhdGlvbih7XG4gICAgICAgIHByb2ZpbGVOYW1lOiAnQWxpY2UnLFxuICAgICAgICB0aXRsZTogJ0FsaWNlJyxcbiAgICAgIH0pO1xuICAgICAgY29uc3QgYm9iMSA9IGdldERlZmF1bHRDb252ZXJzYXRpb24oe1xuICAgICAgICBwcm9maWxlTmFtZTogJ0JvYicsXG4gICAgICAgIHRpdGxlOiAnQm9iJyxcbiAgICAgIH0pO1xuICAgICAgY29uc3QgYm9iMiA9IGdldERlZmF1bHRDb252ZXJzYXRpb24oe1xuICAgICAgICBuYW1lOiAnQm9iIEluIFlvdXIgQ29udGFjdHMnLFxuICAgICAgICBwcm9maWxlTmFtZTogJ0JvYicsXG4gICAgICAgIHRpdGxlOiAnQm9iJyxcbiAgICAgIH0pO1xuICAgICAgY29uc3QgYm9iMyA9IGdldERlZmF1bHRDb252ZXJzYXRpb24oe1xuICAgICAgICBwcm9maWxlTmFtZTogJ0JvYicsXG4gICAgICAgIHRpdGxlOiAnQm9iJyxcbiAgICAgIH0pO1xuXG4gICAgICAvLyBJZ25vcmVkLCBiZWNhdXNlIEJvYiBpcyBub3QgaW4geW91ciBjb250YWN0cyAobGFja3MgYG5hbWVgKSwgaGFzIG5vIHByb2ZpbGUgbmFtZSxcbiAgICAgIC8vICAgYW5kIGhhcyBubyBFMTY0LlxuICAgICAgY29uc3QgaWdub3JlZEJvYiA9IGdldERlZmF1bHRDb252ZXJzYXRpb24oe1xuICAgICAgICBlMTY0OiB1bmRlZmluZWQsXG4gICAgICAgIHRpdGxlOiAnQm9iJyxcbiAgICAgIH0pO1xuXG4gICAgICAvLyBJZ25vcmVkLCBiZWNhdXNlIHRoZXJlJ3Mgb25seSBvbmUgQ2hhcmxpZS5cbiAgICAgIGNvbnN0IGNoYXJsaWUgPSBnZXREZWZhdWx0Q29udmVyc2F0aW9uKHtcbiAgICAgICAgcHJvZmlsZU5hbWU6ICdDaGFybGllJyxcbiAgICAgICAgdGl0bGU6ICdDaGFybGllJyxcbiAgICAgIH0pO1xuXG4gICAgICAvLyBJZ25vcmVkLCBiZWNhdXNlIGFsbCBEb25uYXMgYXJlIGluIHlvdXIgY29udGFjdHMgKHRoZXkgaGF2ZSBhIGBuYW1lYCkuXG4gICAgICBjb25zdCBkb25uYTEgPSBnZXREZWZhdWx0Q29udmVyc2F0aW9uKHtcbiAgICAgICAgbmFtZTogJ0Rvbm5hIE9uZScsXG4gICAgICAgIHByb2ZpbGVOYW1lOiAnRG9ubmEnLFxuICAgICAgICB0aXRsZTogJ0Rvbm5hJyxcbiAgICAgIH0pO1xuICAgICAgY29uc3QgZG9ubmEyID0gZ2V0RGVmYXVsdENvbnZlcnNhdGlvbih7XG4gICAgICAgIG5hbWU6ICdEb25uYSBUd28nLFxuICAgICAgICBwcm9maWxlTmFtZTogJ0Rvbm5hJyxcbiAgICAgICAgdGl0bGU6ICdEb25uYScsXG4gICAgICB9KTtcbiAgICAgIGNvbnN0IGRvbm5hMyA9IGdldERlZmF1bHRDb252ZXJzYXRpb24oe1xuICAgICAgICBuYW1lOiAnRG9ubmEgVGhyZWUnLFxuICAgICAgICBwcm9maWxlTmFtZTogJ0Rvbm5hJyxcbiAgICAgICAgdGl0bGU6ICdEb25uYScsXG4gICAgICB9KTtcblxuICAgICAgLy8gSWdub3JlZCwgYmVjYXVzZSB5b3UncmUgbm90IGluY2x1ZGVkLlxuICAgICAgY29uc3QgbWUgPSBnZXREZWZhdWx0Q29udmVyc2F0aW9uKHtcbiAgICAgICAgaXNNZTogdHJ1ZSxcbiAgICAgICAgcHJvZmlsZU5hbWU6ICdBbGljZScsXG4gICAgICAgIHRpdGxlOiAnQWxpY2UnLFxuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IG1lbWJlcnNoaXBzID0gW1xuICAgICAgICBhbGljZTEsXG4gICAgICAgIGFsaWNlMixcbiAgICAgICAgYm9iMSxcbiAgICAgICAgYm9iMixcbiAgICAgICAgYm9iMyxcbiAgICAgICAgaWdub3JlZEJvYixcbiAgICAgICAgY2hhcmxpZSxcbiAgICAgICAgZG9ubmExLFxuICAgICAgICBkb25uYTIsXG4gICAgICAgIGRvbm5hMyxcbiAgICAgICAgbWUsXG4gICAgICBdLm1hcChtZW1iZXIgPT4gKHsgbWVtYmVyIH0pKTtcblxuICAgICAgY29uc3QgcmVzdWx0ID0gZ2V0Q29sbGlzaW9uc0Zyb21NZW1iZXJzaGlwcyhtZW1iZXJzaGlwcyk7XG5cbiAgICAgIGFzc2VydC5kZWVwRXF1YWwocmVzdWx0LCB7XG4gICAgICAgIEFsaWNlOiBbYWxpY2UxLCBhbGljZTJdLFxuICAgICAgICBCb2I6IFtib2IxLCBib2IyLCBib2IzXSxcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnaGFzVW5hY2tub3dsZWRnZWRDb2xsaXNpb25zJywgKCkgPT4ge1xuICAgIGl0KCdyZXR1cm5zIGZhbHNlIGlmIHRoZSBjb2xsaXNpb25zIGFyZSBpZGVudGljYWwnLCAoKSA9PiB7XG4gICAgICBhc3NlcnQuaXNGYWxzZShoYXNVbmFja25vd2xlZGdlZENvbGxpc2lvbnMoe30sIHt9KSk7XG4gICAgICBhc3NlcnQuaXNGYWxzZShcbiAgICAgICAgaGFzVW5hY2tub3dsZWRnZWRDb2xsaXNpb25zKFxuICAgICAgICAgIHsgQWxpY2U6IFsnYWJjJywgJ2RlZiddIH0sXG4gICAgICAgICAgeyBBbGljZTogWydhYmMnLCAnZGVmJ10gfVxuICAgICAgICApXG4gICAgICApO1xuICAgICAgYXNzZXJ0LmlzRmFsc2UoXG4gICAgICAgIGhhc1VuYWNrbm93bGVkZ2VkQ29sbGlzaW9ucyhcbiAgICAgICAgICB7IEFsaWNlOiBbJ2FiYycsICdkZWYnXSB9LFxuICAgICAgICAgIHsgQWxpY2U6IFsnZGVmJywgJ2FiYyddIH1cbiAgICAgICAgKVxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIGZhbHNlIGlmIHRoZSBhY2tub3dsZWRnZWQgY29sbGlzaW9ucyBhcmUgYSBzdXBlcnNldCBvZiB0aGUgY3VycmVudCBjb2xsaXNpb25zJywgKCkgPT4ge1xuICAgICAgYXNzZXJ0LmlzRmFsc2UoXG4gICAgICAgIGhhc1VuYWNrbm93bGVkZ2VkQ29sbGlzaW9ucyh7IEFsaWNlOiBbJ2FiYycsICdkZWYnXSB9LCB7fSlcbiAgICAgICk7XG4gICAgICBhc3NlcnQuaXNGYWxzZShcbiAgICAgICAgaGFzVW5hY2tub3dsZWRnZWRDb2xsaXNpb25zKFxuICAgICAgICAgIHsgQWxpY2U6IFsnYWJjJywgJ2RlZicsICdnZWgnXSB9LFxuICAgICAgICAgIHsgQWxpY2U6IFsnYWJjJywgJ2dlaCddIH1cbiAgICAgICAgKVxuICAgICAgKTtcbiAgICAgIGFzc2VydC5pc0ZhbHNlKFxuICAgICAgICBoYXNVbmFja25vd2xlZGdlZENvbGxpc2lvbnMoXG4gICAgICAgICAgeyBBbGljZTogWydhYmMnLCAnZGVmJ10sIEJvYjogWydnaGknLCAnamtsJ10gfSxcbiAgICAgICAgICB7IEFsaWNlOiBbJ2FiYycsICdkZWYnXSB9XG4gICAgICAgIClcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyB0cnVlIGlmIHRoZSBjdXJyZW50IGNvbGxpc2lvbnMgaGFzIGEgdGl0bGUgdGhhdCB3YXMgbm90IGFja25vd2xlZGdlZCcsICgpID0+IHtcbiAgICAgIGFzc2VydC5pc1RydWUoXG4gICAgICAgIGhhc1VuYWNrbm93bGVkZ2VkQ29sbGlzaW9ucyhcbiAgICAgICAgICB7IEFsaWNlOiBbJ2FiYycsICdkZWYnXSwgQm9iOiBbJ2doaScsICdqa2wnXSB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIEFsaWNlOiBbJ2FiYycsICdkZWYnXSxcbiAgICAgICAgICAgIEJvYjogWydnaGknLCAnamtsJ10sXG4gICAgICAgICAgICBDaGFybGllOiBbJ21ubycsICdwcXInXSxcbiAgICAgICAgICB9XG4gICAgICAgIClcbiAgICAgICk7XG4gICAgICBhc3NlcnQuaXNUcnVlKFxuICAgICAgICBoYXNVbmFja25vd2xlZGdlZENvbGxpc2lvbnMoXG4gICAgICAgICAgeyBBbGljZTogWydhYmMnLCAnZGVmJ10sIEJvYjogWydnaGknLCAnamtsJ10gfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBBbGljZTogWydhYmMnLCAnZGVmJ10sXG4gICAgICAgICAgICBDaGFybGllOiBbJ21ubycsICdwcXInXSxcbiAgICAgICAgICB9XG4gICAgICAgIClcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyB0cnVlIGlmIGFueSB0aXRsZSBoYXMgYSBuZXcgSUQnLCAoKSA9PiB7XG4gICAgICBhc3NlcnQuaXNUcnVlKFxuICAgICAgICBoYXNVbmFja25vd2xlZGdlZENvbGxpc2lvbnMoXG4gICAgICAgICAgeyBBbGljZTogWydhYmMnLCAnZGVmJ10gfSxcbiAgICAgICAgICB7IEFsaWNlOiBbJ2FiYycsICdkZWYnLCAnZ2hpJ10gfVxuICAgICAgICApXG4gICAgICApO1xuICAgICAgYXNzZXJ0LmlzVHJ1ZShcbiAgICAgICAgaGFzVW5hY2tub3dsZWRnZWRDb2xsaXNpb25zKFxuICAgICAgICAgIHsgQWxpY2U6IFsnYWJjJywgJ2RlZiddIH0sXG4gICAgICAgICAgeyBBbGljZTogWydhYmMnLCAnZ2hpJ10gfVxuICAgICAgICApXG4gICAgICApO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnaW52ZXJ0SWRzQnlUaXRsZScsICgpID0+IHtcbiAgICBpdCgncmV0dXJucyBhbiBlbXB0eSBvYmplY3QgaWYgcGFzc2VkIG5vIElEcycsICgpID0+IHtcbiAgICAgIGFzc2VydC5kZWVwRXF1YWwoaW52ZXJ0SWRzQnlUaXRsZSh7fSksIHt9KTtcbiAgICAgIGFzc2VydC5kZWVwRXF1YWwoaW52ZXJ0SWRzQnlUaXRsZSh7IEFsaWNlOiBbXSB9KSwge30pO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgYW4gb2JqZWN0IHdpdGggSUQga2V5cyBhbmQgdGl0bGUgdmFsdWVzJywgKCkgPT4ge1xuICAgICAgYXNzZXJ0LmRlZXBFcXVhbChcbiAgICAgICAgaW52ZXJ0SWRzQnlUaXRsZSh7IEFsaWNlOiBbJ2FiYycsICdkZWYnXSwgQm9iOiBbJ2doaScsICdqa2wnLCAnbW5vJ10gfSksXG4gICAgICAgIHtcbiAgICAgICAgICBhYmM6ICdBbGljZScsXG4gICAgICAgICAgZGVmOiAnQWxpY2UnLFxuICAgICAgICAgIGdoaTogJ0JvYicsXG4gICAgICAgICAgamtsOiAnQm9iJyxcbiAgICAgICAgICBtbm86ICdCb2InLFxuICAgICAgICB9XG4gICAgICApO1xuICAgIH0pO1xuICB9KTtcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIkFBR0Esa0JBQXVCO0FBQ3ZCLG9DQUF1QztBQUV2Qyx1Q0FLTztBQUVQLFNBQVMseUNBQXlDLE1BQU07QUFDdEQsV0FBUyx3Q0FBd0MsTUFBTTtBQUNyRCxPQUFHLHdDQUF3QyxNQUFNO0FBQy9DLFlBQU0sZ0JBQWdCLDBEQUF1QjtBQUM3QyxZQUFNLGdCQUFnQiwwREFBdUI7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
