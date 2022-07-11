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
var import_Client = __toESM(require("../../sql/Client"));
var import_Crypto = require("../../Crypto");
var import_UUID = require("../../types/UUID");
const {
  _deleteAllStoryDistributions,
  _getAllStoryDistributionMembers,
  _getAllStoryDistributions,
  createNewStoryDistribution,
  deleteStoryDistribution,
  getAllStoryDistributionsWithMembers,
  modifyStoryDistribution,
  modifyStoryDistributionMembers
} = import_Client.default;
function getUuid() {
  return import_UUID.UUID.generate().toString();
}
describe("sql/storyDistribution", () => {
  beforeEach(async () => {
    await _deleteAllStoryDistributions();
  });
  it("roundtrips with create/fetch/delete", async () => {
    const list = {
      id: getUuid(),
      name: "My Story",
      avatarUrlPath: getUuid(),
      avatarKey: (0, import_Crypto.getRandomBytes)(128),
      members: [getUuid(), getUuid()],
      senderKeyInfo: {
        createdAtDate: Date.now(),
        distributionId: getUuid(),
        memberDevices: []
      }
    };
    await createNewStoryDistribution(list);
    import_chai.assert.lengthOf(await _getAllStoryDistributions(), 1);
    import_chai.assert.lengthOf(await _getAllStoryDistributionMembers(), 2);
    const allHydratedLists = await getAllStoryDistributionsWithMembers();
    import_chai.assert.lengthOf(allHydratedLists, 1);
    import_chai.assert.deepEqual(allHydratedLists[0], list);
    await deleteStoryDistribution(list.id);
    import_chai.assert.lengthOf(await _getAllStoryDistributions(), 0);
    import_chai.assert.lengthOf(await _getAllStoryDistributionMembers(), 0);
    import_chai.assert.lengthOf(await getAllStoryDistributionsWithMembers(), 0);
  });
  it("updates core fields with modifyStoryDistribution", async () => {
    const UUID_1 = getUuid();
    const UUID_2 = getUuid();
    const list = {
      id: getUuid(),
      name: "My Story",
      avatarUrlPath: getUuid(),
      avatarKey: (0, import_Crypto.getRandomBytes)(128),
      members: [UUID_1, UUID_2],
      senderKeyInfo: {
        createdAtDate: Date.now(),
        distributionId: getUuid(),
        memberDevices: []
      }
    };
    await createNewStoryDistribution(list);
    import_chai.assert.lengthOf(await _getAllStoryDistributions(), 1);
    import_chai.assert.lengthOf(await _getAllStoryDistributionMembers(), 2);
    const updated = {
      ...list,
      name: "Updated story",
      avatarKey: (0, import_Crypto.getRandomBytes)(128),
      avatarUrlPath: getUuid(),
      senderKeyInfo: {
        createdAtDate: Date.now() + 10,
        distributionId: getUuid(),
        memberDevices: [
          {
            id: 1,
            identifier: UUID_1,
            registrationId: 232
          }
        ]
      }
    };
    await modifyStoryDistribution(updated);
    import_chai.assert.lengthOf(await _getAllStoryDistributions(), 1);
    import_chai.assert.lengthOf(await _getAllStoryDistributionMembers(), 2);
    const allHydratedLists = await getAllStoryDistributionsWithMembers();
    import_chai.assert.lengthOf(allHydratedLists, 1);
    import_chai.assert.deepEqual(allHydratedLists[0], updated);
  });
  it("adds and removes with modifyStoryDistributionMembers", async () => {
    const UUID_1 = getUuid();
    const UUID_2 = getUuid();
    const UUID_3 = getUuid();
    const UUID_4 = getUuid();
    const list = {
      id: getUuid(),
      name: "My Story",
      avatarUrlPath: getUuid(),
      avatarKey: (0, import_Crypto.getRandomBytes)(128),
      members: [UUID_1, UUID_2],
      senderKeyInfo: {
        createdAtDate: Date.now(),
        distributionId: getUuid(),
        memberDevices: []
      }
    };
    await createNewStoryDistribution(list);
    import_chai.assert.lengthOf(await _getAllStoryDistributions(), 1);
    import_chai.assert.lengthOf(await _getAllStoryDistributionMembers(), 2);
    await modifyStoryDistributionMembers(list.id, {
      toAdd: [UUID_3, UUID_4],
      toRemove: [UUID_1]
    });
    import_chai.assert.lengthOf(await _getAllStoryDistributions(), 1);
    import_chai.assert.lengthOf(await _getAllStoryDistributionMembers(), 3);
    const allHydratedLists = await getAllStoryDistributionsWithMembers();
    import_chai.assert.lengthOf(allHydratedLists, 1);
    import_chai.assert.deepEqual(allHydratedLists[0], {
      ...list,
      members: [UUID_2, UUID_3, UUID_4]
    });
  });
  it("eliminates duplicates without complaint in createNewStoryDistribution", async () => {
    const UUID_1 = getUuid();
    const UUID_2 = getUuid();
    const list = {
      id: getUuid(),
      name: "My Story",
      avatarUrlPath: getUuid(),
      avatarKey: (0, import_Crypto.getRandomBytes)(128),
      members: [UUID_1, UUID_1, UUID_2],
      senderKeyInfo: {
        createdAtDate: Date.now(),
        distributionId: getUuid(),
        memberDevices: []
      }
    };
    await createNewStoryDistribution(list);
    import_chai.assert.lengthOf(await _getAllStoryDistributions(), 1);
    import_chai.assert.lengthOf(await _getAllStoryDistributionMembers(), 2);
    const allHydratedLists = await getAllStoryDistributionsWithMembers();
    import_chai.assert.lengthOf(allHydratedLists, 1);
    import_chai.assert.deepEqual(allHydratedLists[0].members, [UUID_1, UUID_2]);
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3RvcnlEaXN0cmlidXRpb25fdGVzdC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyBhc3NlcnQgfSBmcm9tICdjaGFpJztcblxuaW1wb3J0IGRhdGFJbnRlcmZhY2UgZnJvbSAnLi4vLi4vc3FsL0NsaWVudCc7XG5pbXBvcnQgeyBnZXRSYW5kb21CeXRlcyB9IGZyb20gJy4uLy4uL0NyeXB0byc7XG5pbXBvcnQgeyBVVUlEIH0gZnJvbSAnLi4vLi4vdHlwZXMvVVVJRCc7XG5pbXBvcnQgdHlwZSB7IFVVSURTdHJpbmdUeXBlIH0gZnJvbSAnLi4vLi4vdHlwZXMvVVVJRCc7XG5cbmltcG9ydCB0eXBlIHsgU3RvcnlEaXN0cmlidXRpb25XaXRoTWVtYmVyc1R5cGUgfSBmcm9tICcuLi8uLi9zcWwvSW50ZXJmYWNlJztcblxuY29uc3Qge1xuICBfZGVsZXRlQWxsU3RvcnlEaXN0cmlidXRpb25zLFxuICBfZ2V0QWxsU3RvcnlEaXN0cmlidXRpb25NZW1iZXJzLFxuICBfZ2V0QWxsU3RvcnlEaXN0cmlidXRpb25zLFxuICBjcmVhdGVOZXdTdG9yeURpc3RyaWJ1dGlvbixcbiAgZGVsZXRlU3RvcnlEaXN0cmlidXRpb24sXG4gIGdldEFsbFN0b3J5RGlzdHJpYnV0aW9uc1dpdGhNZW1iZXJzLFxuICBtb2RpZnlTdG9yeURpc3RyaWJ1dGlvbixcbiAgbW9kaWZ5U3RvcnlEaXN0cmlidXRpb25NZW1iZXJzLFxufSA9IGRhdGFJbnRlcmZhY2U7XG5cbmZ1bmN0aW9uIGdldFV1aWQoKTogVVVJRFN0cmluZ1R5cGUge1xuICByZXR1cm4gVVVJRC5nZW5lcmF0ZSgpLnRvU3RyaW5nKCk7XG59XG5cbmRlc2NyaWJlKCdzcWwvc3RvcnlEaXN0cmlidXRpb24nLCAoKSA9PiB7XG4gIGJlZm9yZUVhY2goYXN5bmMgKCkgPT4ge1xuICAgIGF3YWl0IF9kZWxldGVBbGxTdG9yeURpc3RyaWJ1dGlvbnMoKTtcbiAgfSk7XG5cbiAgaXQoJ3JvdW5kdHJpcHMgd2l0aCBjcmVhdGUvZmV0Y2gvZGVsZXRlJywgYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IGxpc3Q6IFN0b3J5RGlzdHJpYnV0aW9uV2l0aE1lbWJlcnNUeXBlID0ge1xuICAgICAgaWQ6IGdldFV1aWQoKSxcbiAgICAgIG5hbWU6ICdNeSBTdG9yeScsXG4gICAgICBhdmF0YXJVcmxQYXRoOiBnZXRVdWlkKCksXG4gICAgICBhdmF0YXJLZXk6IGdldFJhbmRvbUJ5dGVzKDEyOCksXG4gICAgICBtZW1iZXJzOiBbZ2V0VXVpZCgpLCBnZXRVdWlkKCldLFxuICAgICAgc2VuZGVyS2V5SW5mbzoge1xuICAgICAgICBjcmVhdGVkQXREYXRlOiBEYXRlLm5vdygpLFxuICAgICAgICBkaXN0cmlidXRpb25JZDogZ2V0VXVpZCgpLFxuICAgICAgICBtZW1iZXJEZXZpY2VzOiBbXSxcbiAgICAgIH0sXG4gICAgfTtcblxuICAgIGF3YWl0IGNyZWF0ZU5ld1N0b3J5RGlzdHJpYnV0aW9uKGxpc3QpO1xuXG4gICAgYXNzZXJ0Lmxlbmd0aE9mKGF3YWl0IF9nZXRBbGxTdG9yeURpc3RyaWJ1dGlvbnMoKSwgMSk7XG4gICAgYXNzZXJ0Lmxlbmd0aE9mKGF3YWl0IF9nZXRBbGxTdG9yeURpc3RyaWJ1dGlvbk1lbWJlcnMoKSwgMik7XG5cbiAgICBjb25zdCBhbGxIeWRyYXRlZExpc3RzID0gYXdhaXQgZ2V0QWxsU3RvcnlEaXN0cmlidXRpb25zV2l0aE1lbWJlcnMoKTtcbiAgICBhc3NlcnQubGVuZ3RoT2YoYWxsSHlkcmF0ZWRMaXN0cywgMSk7XG4gICAgYXNzZXJ0LmRlZXBFcXVhbChhbGxIeWRyYXRlZExpc3RzWzBdLCBsaXN0KTtcblxuICAgIGF3YWl0IGRlbGV0ZVN0b3J5RGlzdHJpYnV0aW9uKGxpc3QuaWQpO1xuXG4gICAgYXNzZXJ0Lmxlbmd0aE9mKGF3YWl0IF9nZXRBbGxTdG9yeURpc3RyaWJ1dGlvbnMoKSwgMCk7XG4gICAgYXNzZXJ0Lmxlbmd0aE9mKGF3YWl0IF9nZXRBbGxTdG9yeURpc3RyaWJ1dGlvbk1lbWJlcnMoKSwgMCk7XG4gICAgYXNzZXJ0Lmxlbmd0aE9mKGF3YWl0IGdldEFsbFN0b3J5RGlzdHJpYnV0aW9uc1dpdGhNZW1iZXJzKCksIDApO1xuICB9KTtcblxuICBpdCgndXBkYXRlcyBjb3JlIGZpZWxkcyB3aXRoIG1vZGlmeVN0b3J5RGlzdHJpYnV0aW9uJywgYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IFVVSURfMSA9IGdldFV1aWQoKTtcbiAgICBjb25zdCBVVUlEXzIgPSBnZXRVdWlkKCk7XG4gICAgY29uc3QgbGlzdDogU3RvcnlEaXN0cmlidXRpb25XaXRoTWVtYmVyc1R5cGUgPSB7XG4gICAgICBpZDogZ2V0VXVpZCgpLFxuICAgICAgbmFtZTogJ015IFN0b3J5JyxcbiAgICAgIGF2YXRhclVybFBhdGg6IGdldFV1aWQoKSxcbiAgICAgIGF2YXRhcktleTogZ2V0UmFuZG9tQnl0ZXMoMTI4KSxcbiAgICAgIG1lbWJlcnM6IFtVVUlEXzEsIFVVSURfMl0sXG4gICAgICBzZW5kZXJLZXlJbmZvOiB7XG4gICAgICAgIGNyZWF0ZWRBdERhdGU6IERhdGUubm93KCksXG4gICAgICAgIGRpc3RyaWJ1dGlvbklkOiBnZXRVdWlkKCksXG4gICAgICAgIG1lbWJlckRldmljZXM6IFtdLFxuICAgICAgfSxcbiAgICB9O1xuXG4gICAgYXdhaXQgY3JlYXRlTmV3U3RvcnlEaXN0cmlidXRpb24obGlzdCk7XG5cbiAgICBhc3NlcnQubGVuZ3RoT2YoYXdhaXQgX2dldEFsbFN0b3J5RGlzdHJpYnV0aW9ucygpLCAxKTtcbiAgICBhc3NlcnQubGVuZ3RoT2YoYXdhaXQgX2dldEFsbFN0b3J5RGlzdHJpYnV0aW9uTWVtYmVycygpLCAyKTtcblxuICAgIGNvbnN0IHVwZGF0ZWQgPSB7XG4gICAgICAuLi5saXN0LFxuICAgICAgbmFtZTogJ1VwZGF0ZWQgc3RvcnknLFxuICAgICAgYXZhdGFyS2V5OiBnZXRSYW5kb21CeXRlcygxMjgpLFxuICAgICAgYXZhdGFyVXJsUGF0aDogZ2V0VXVpZCgpLFxuICAgICAgc2VuZGVyS2V5SW5mbzoge1xuICAgICAgICBjcmVhdGVkQXREYXRlOiBEYXRlLm5vdygpICsgMTAsXG4gICAgICAgIGRpc3RyaWJ1dGlvbklkOiBnZXRVdWlkKCksXG4gICAgICAgIG1lbWJlckRldmljZXM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBpZDogMSxcbiAgICAgICAgICAgIGlkZW50aWZpZXI6IFVVSURfMSxcbiAgICAgICAgICAgIHJlZ2lzdHJhdGlvbklkOiAyMzIsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0sXG4gICAgfTtcblxuICAgIGF3YWl0IG1vZGlmeVN0b3J5RGlzdHJpYnV0aW9uKHVwZGF0ZWQpO1xuXG4gICAgYXNzZXJ0Lmxlbmd0aE9mKGF3YWl0IF9nZXRBbGxTdG9yeURpc3RyaWJ1dGlvbnMoKSwgMSk7XG4gICAgYXNzZXJ0Lmxlbmd0aE9mKGF3YWl0IF9nZXRBbGxTdG9yeURpc3RyaWJ1dGlvbk1lbWJlcnMoKSwgMik7XG5cbiAgICBjb25zdCBhbGxIeWRyYXRlZExpc3RzID0gYXdhaXQgZ2V0QWxsU3RvcnlEaXN0cmlidXRpb25zV2l0aE1lbWJlcnMoKTtcbiAgICBhc3NlcnQubGVuZ3RoT2YoYWxsSHlkcmF0ZWRMaXN0cywgMSk7XG4gICAgYXNzZXJ0LmRlZXBFcXVhbChhbGxIeWRyYXRlZExpc3RzWzBdLCB1cGRhdGVkKTtcbiAgfSk7XG5cbiAgaXQoJ2FkZHMgYW5kIHJlbW92ZXMgd2l0aCBtb2RpZnlTdG9yeURpc3RyaWJ1dGlvbk1lbWJlcnMnLCBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgVVVJRF8xID0gZ2V0VXVpZCgpO1xuICAgIGNvbnN0IFVVSURfMiA9IGdldFV1aWQoKTtcbiAgICBjb25zdCBVVUlEXzMgPSBnZXRVdWlkKCk7XG4gICAgY29uc3QgVVVJRF80ID0gZ2V0VXVpZCgpO1xuICAgIGNvbnN0IGxpc3Q6IFN0b3J5RGlzdHJpYnV0aW9uV2l0aE1lbWJlcnNUeXBlID0ge1xuICAgICAgaWQ6IGdldFV1aWQoKSxcbiAgICAgIG5hbWU6ICdNeSBTdG9yeScsXG4gICAgICBhdmF0YXJVcmxQYXRoOiBnZXRVdWlkKCksXG4gICAgICBhdmF0YXJLZXk6IGdldFJhbmRvbUJ5dGVzKDEyOCksXG4gICAgICBtZW1iZXJzOiBbVVVJRF8xLCBVVUlEXzJdLFxuICAgICAgc2VuZGVyS2V5SW5mbzoge1xuICAgICAgICBjcmVhdGVkQXREYXRlOiBEYXRlLm5vdygpLFxuICAgICAgICBkaXN0cmlidXRpb25JZDogZ2V0VXVpZCgpLFxuICAgICAgICBtZW1iZXJEZXZpY2VzOiBbXSxcbiAgICAgIH0sXG4gICAgfTtcblxuICAgIGF3YWl0IGNyZWF0ZU5ld1N0b3J5RGlzdHJpYnV0aW9uKGxpc3QpO1xuXG4gICAgYXNzZXJ0Lmxlbmd0aE9mKGF3YWl0IF9nZXRBbGxTdG9yeURpc3RyaWJ1dGlvbnMoKSwgMSk7XG4gICAgYXNzZXJ0Lmxlbmd0aE9mKGF3YWl0IF9nZXRBbGxTdG9yeURpc3RyaWJ1dGlvbk1lbWJlcnMoKSwgMik7XG5cbiAgICBhd2FpdCBtb2RpZnlTdG9yeURpc3RyaWJ1dGlvbk1lbWJlcnMobGlzdC5pZCwge1xuICAgICAgdG9BZGQ6IFtVVUlEXzMsIFVVSURfNF0sXG4gICAgICB0b1JlbW92ZTogW1VVSURfMV0sXG4gICAgfSk7XG5cbiAgICBhc3NlcnQubGVuZ3RoT2YoYXdhaXQgX2dldEFsbFN0b3J5RGlzdHJpYnV0aW9ucygpLCAxKTtcbiAgICBhc3NlcnQubGVuZ3RoT2YoYXdhaXQgX2dldEFsbFN0b3J5RGlzdHJpYnV0aW9uTWVtYmVycygpLCAzKTtcblxuICAgIGNvbnN0IGFsbEh5ZHJhdGVkTGlzdHMgPSBhd2FpdCBnZXRBbGxTdG9yeURpc3RyaWJ1dGlvbnNXaXRoTWVtYmVycygpO1xuICAgIGFzc2VydC5sZW5ndGhPZihhbGxIeWRyYXRlZExpc3RzLCAxKTtcbiAgICBhc3NlcnQuZGVlcEVxdWFsKGFsbEh5ZHJhdGVkTGlzdHNbMF0sIHtcbiAgICAgIC4uLmxpc3QsXG4gICAgICBtZW1iZXJzOiBbVVVJRF8yLCBVVUlEXzMsIFVVSURfNF0sXG4gICAgfSk7XG4gIH0pO1xuXG4gIGl0KCdlbGltaW5hdGVzIGR1cGxpY2F0ZXMgd2l0aG91dCBjb21wbGFpbnQgaW4gY3JlYXRlTmV3U3RvcnlEaXN0cmlidXRpb24nLCBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgVVVJRF8xID0gZ2V0VXVpZCgpO1xuICAgIGNvbnN0IFVVSURfMiA9IGdldFV1aWQoKTtcbiAgICBjb25zdCBsaXN0OiBTdG9yeURpc3RyaWJ1dGlvbldpdGhNZW1iZXJzVHlwZSA9IHtcbiAgICAgIGlkOiBnZXRVdWlkKCksXG4gICAgICBuYW1lOiAnTXkgU3RvcnknLFxuICAgICAgYXZhdGFyVXJsUGF0aDogZ2V0VXVpZCgpLFxuICAgICAgYXZhdGFyS2V5OiBnZXRSYW5kb21CeXRlcygxMjgpLFxuICAgICAgbWVtYmVyczogW1VVSURfMSwgVVVJRF8xLCBVVUlEXzJdLFxuICAgICAgc2VuZGVyS2V5SW5mbzoge1xuICAgICAgICBjcmVhdGVkQXREYXRlOiBEYXRlLm5vdygpLFxuICAgICAgICBkaXN0cmlidXRpb25JZDogZ2V0VXVpZCgpLFxuICAgICAgICBtZW1iZXJEZXZpY2VzOiBbXSxcbiAgICAgIH0sXG4gICAgfTtcblxuICAgIGF3YWl0IGNyZWF0ZU5ld1N0b3J5RGlzdHJpYnV0aW9uKGxpc3QpO1xuXG4gICAgYXNzZXJ0Lmxlbmd0aE9mKGF3YWl0IF9nZXRBbGxTdG9yeURpc3RyaWJ1dGlvbnMoKSwgMSk7XG4gICAgYXNzZXJ0Lmxlbmd0aE9mKGF3YWl0IF9nZXRBbGxTdG9yeURpc3RyaWJ1dGlvbk1lbWJlcnMoKSwgMik7XG5cbiAgICBjb25zdCBhbGxIeWRyYXRlZExpc3RzID0gYXdhaXQgZ2V0QWxsU3RvcnlEaXN0cmlidXRpb25zV2l0aE1lbWJlcnMoKTtcbiAgICBhc3NlcnQubGVuZ3RoT2YoYWxsSHlkcmF0ZWRMaXN0cywgMSk7XG4gICAgYXNzZXJ0LmRlZXBFcXVhbChhbGxIeWRyYXRlZExpc3RzWzBdLm1lbWJlcnMsIFtVVUlEXzEsIFVVSURfMl0pO1xuICB9KTtcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7OztBQUdBLGtCQUF1QjtBQUV2QixvQkFBMEI7QUFDMUIsb0JBQStCO0FBQy9CLGtCQUFxQjtBQUtyQixNQUFNO0FBQUEsRUFDSjtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxJQUNFO0FBRUosbUJBQW1DO0FBQ2pDLFNBQU8saUJBQUssU0FBUyxFQUFFLFNBQVM7QUFDbEM7QUFGUyxBQUlULFNBQVMseUJBQXlCLE1BQU07QUFDdEMsYUFBVyxZQUFZO0FBQ3JCLFVBQU0sNkJBQTZCO0FBQUEsRUFDckMsQ0FBQztBQUVELEtBQUcsdUNBQXVDLFlBQVk7QUFDcEQsVUFBTSxPQUF5QztBQUFBLE1BQzdDLElBQUksUUFBUTtBQUFBLE1BQ1osTUFBTTtBQUFBLE1BQ04sZUFBZSxRQUFRO0FBQUEsTUFDdkIsV0FBVyxrQ0FBZSxHQUFHO0FBQUEsTUFDN0IsU0FBUyxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7QUFBQSxNQUM5QixlQUFlO0FBQUEsUUFDYixlQUFlLEtBQUssSUFBSTtBQUFBLFFBQ3hCLGdCQUFnQixRQUFRO0FBQUEsUUFDeEIsZUFBZSxDQUFDO0FBQUEsTUFDbEI7QUFBQSxJQUNGO0FBRUEsVUFBTSwyQkFBMkIsSUFBSTtBQUVyQyx1QkFBTyxTQUFTLE1BQU0sMEJBQTBCLEdBQUcsQ0FBQztBQUNwRCx1QkFBTyxTQUFTLE1BQU0sZ0NBQWdDLEdBQUcsQ0FBQztBQUUxRCxVQUFNLG1CQUFtQixNQUFNLG9DQUFvQztBQUNuRSx1QkFBTyxTQUFTLGtCQUFrQixDQUFDO0FBQ25DLHVCQUFPLFVBQVUsaUJBQWlCLElBQUksSUFBSTtB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
