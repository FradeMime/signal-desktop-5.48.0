var import_chai = require("chai");
var import_uuid = require("uuid");
var import_getRandomColor = require("../helpers/getRandomColor");
var import_getAvatarData = require("../../util/getAvatarData");
describe("getAvatarData", () => {
  it("returns existing avatars if present", () => {
    const avatars = [
      {
        id: (0, import_uuid.v4)(),
        color: (0, import_getRandomColor.getRandomColor)(),
        text: "Avatar A"
      },
      {
        id: (0, import_uuid.v4)(),
        color: (0, import_getRandomColor.getRandomColor)(),
        text: "Avatar B"
      }
    ];
    import_chai.assert.strictEqual((0, import_getAvatarData.getAvatarData)({ avatars, type: "private" }), avatars);
    import_chai.assert.strictEqual((0, import_getAvatarData.getAvatarData)({ avatars, type: "group" }), avatars);
  });
  it("returns a non-empty array if no avatars are provided", () => {
    import_chai.assert.isNotEmpty((0, import_getAvatarData.getAvatarData)({ type: "private" }));
    import_chai.assert.isNotEmpty((0, import_getAvatarData.getAvatarData)({ type: "group" }));
    import_chai.assert.isNotEmpty((0, import_getAvatarData.getAvatarData)({ avatars: [], type: "private" }));
    import_chai.assert.isNotEmpty((0, import_getAvatarData.getAvatarData)({ avatars: [], type: "group" }));
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZ2V0QXZhdGFyRGF0YV90ZXN0LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IGFzc2VydCB9IGZyb20gJ2NoYWknO1xuaW1wb3J0IHsgdjQgYXMgdXVpZCB9IGZyb20gJ3V1aWQnO1xuaW1wb3J0IHsgZ2V0UmFuZG9tQ29sb3IgfSBmcm9tICcuLi9oZWxwZXJzL2dldFJhbmRvbUNvbG9yJztcblxuaW1wb3J0IHsgZ2V0QXZhdGFyRGF0YSB9IGZyb20gJy4uLy4uL3V0aWwvZ2V0QXZhdGFyRGF0YSc7XG5cbmRlc2NyaWJlKCdnZXRBdmF0YXJEYXRhJywgKCkgPT4ge1xuICBpdCgncmV0dXJucyBleGlzdGluZyBhdmF0YXJzIGlmIHByZXNlbnQnLCAoKSA9PiB7XG4gICAgY29uc3QgYXZhdGFycyA9IFtcbiAgICAgIHtcbiAgICAgICAgaWQ6IHV1aWQoKSxcbiAgICAgICAgY29sb3I6IGdldFJhbmRvbUNvbG9yKCksXG4gICAgICAgIHRleHQ6ICdBdmF0YXIgQScsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBpZDogdXVpZCgpLFxuICAgICAgICBjb2xvcjogZ2V0UmFuZG9tQ29sb3IoKSxcbiAgICAgICAgdGV4dDogJ0F2YXRhciBCJyxcbiAgICAgIH0sXG4gICAgXTtcblxuICAgIGFzc2VydC5zdHJpY3RFcXVhbChnZXRBdmF0YXJEYXRhKHsgYXZhdGFycywgdHlwZTogJ3ByaXZhdGUnIH0pLCBhdmF0YXJzKTtcbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwoZ2V0QXZhdGFyRGF0YSh7IGF2YXRhcnMsIHR5cGU6ICdncm91cCcgfSksIGF2YXRhcnMpO1xuICB9KTtcblxuICBpdCgncmV0dXJucyBhIG5vbi1lbXB0eSBhcnJheSBpZiBubyBhdmF0YXJzIGFyZSBwcm92aWRlZCcsICgpID0+IHtcbiAgICBhc3NlcnQuaXNOb3RFbXB0eShnZXRBdmF0YXJEYXRhKHsgdHlwZTogJ3ByaXZhdGUnIH0pKTtcbiAgICBhc3NlcnQuaXNOb3RFbXB0eShnZXRBdmF0YXJEYXRhKHsgdHlwZTogJ2dyb3VwJyB9KSk7XG4gICAgYXNzZXJ0LmlzTm90RW1wdHkoZ2V0QXZhdGFyRGF0YSh7IGF2YXRhcnM6IFtdLCB0eXBlOiAncHJpdmF0ZScgfSkpO1xuICAgIGFzc2VydC5pc05vdEVtcHR5KGdldEF2YXRhckRhdGEoeyBhdmF0YXJzOiBbXSwgdHlwZTogJ2dyb3VwJyB9KSk7XG4gIH0pO1xufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiQUFHQSxrQkFBdUI7QUFDdkIsa0JBQTJCO0FBQzNCLDRCQUErQjtBQUUvQiwyQkFBOEI7QUFFOUIsU0FBUyxpQkFBaUIsTUFBTTtBQUM5QixLQUFHLHVDQUF1QyxNQUFNO0FBQzlDLFVBQU0sVUFBVTtBQUFBLE1BQ2Q7QUFBQSxRQUNFLElBQUksb0JBQUs7QUFBQSxRQUNULE9BQU8sMENBQWU7QUFBQSxRQUN0QixNQUFNO0FBQUEsTUFDUjtBQUFBLE1BQ0E7QUFBQSxRQUNFLElBQUksb0JBQUs7QUFBQSxRQUNULE9BQU8sMENBQWU7QUFBQSxRQUN0QixNQUFNO0FBQUEsTUFDUjtBQUFBLElBQ0Y7QUFFQSx1QkFBTyxZQUFZLHdDQUFjLEVBQUUsU0FBUyxNQUFNLFVBQVUsQ0FBQyxHQUFHLE9BQU87QUFDdkUsdUJBQU8sWUFBWSx3Q0FBYyxFQUFFLFNBQVMsTUFBTSxRQUFRLENBQUMsR0FBRyxPQUFPO0FBQUEsRUFDdkUsQ0FBQztBQUVELEtBQUcsd0RBQXdELE1BQU07QUFDL0QsdUJBQU8sV0FBVyx3Q0FBYyxFQUFFLE1BQU0sVUFBVSxDQUFDLENBQUM7QUFDcEQsdUJBQU8sV0FBVyx3Q0FBYyxFQUFFLE1BQU0sUUFBUSxDQUFDLENBQUM7QUFDbEQsdUJBQU8sV0FBVyx3Q0FBYyxFQUFFLFNBQVMsQ0FBQyxHQUFHLE1BQU0sVUFBVSxDQUFDLENBQUM7QUFDakUsdUJBQU8sV0FBVyx3Q0FBYyxFQUFFLFNBQVMsQ0FBQyxHQUFHLE1BQU0sUUFBUSxDQUFDLENBQUM7QUFBQSxFQUNqRSxDQUFDO0FBQ0gsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
