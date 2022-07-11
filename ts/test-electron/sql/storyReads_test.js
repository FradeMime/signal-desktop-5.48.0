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
var import_UUID = require("../../types/UUID");
const {
  _getAllStoryReads,
  _deleteAllStoryReads,
  addNewStoryRead,
  getLastStoryReadsForAuthor
} = import_Client.default;
function getUuid() {
  return import_UUID.UUID.generate().toString();
}
describe("sql/storyReads", () => {
  beforeEach(async () => {
    await _deleteAllStoryReads();
  });
  it("roundtrips with create/fetch/delete", async () => {
    import_chai.assert.lengthOf(await _getAllStoryReads(), 0);
    const read = {
      authorId: getUuid(),
      conversationId: getUuid(),
      storyId: getUuid(),
      storyReadDate: Date.now()
    };
    await addNewStoryRead(read);
    const allReads = await _getAllStoryReads();
    import_chai.assert.lengthOf(allReads, 1);
    import_chai.assert.deepEqual(allReads[0], read);
  });
  describe("getLastStoryReadsForAuthor", () => {
    it("returns n = limit items for author", async () => {
      const now = Date.now();
      const authorId = getUuid();
      const read1 = {
        authorId,
        conversationId: getUuid(),
        storyId: getUuid(),
        storyReadDate: now - 20
      };
      const read2 = {
        authorId,
        conversationId: getUuid(),
        storyId: getUuid(),
        storyReadDate: now - 10
      };
      const read3 = {
        authorId,
        conversationId: getUuid(),
        storyId: getUuid(),
        storyReadDate: now
      };
      const read4 = {
        authorId: getUuid(),
        conversationId: getUuid(),
        storyId: getUuid(),
        storyReadDate: now
      };
      await addNewStoryRead(read1);
      await addNewStoryRead(read2);
      await addNewStoryRead(read3);
      await addNewStoryRead(read4);
      import_chai.assert.lengthOf(await _getAllStoryReads(), 4);
      const lastReads = await getLastStoryReadsForAuthor({
        authorId,
        limit: 2
      });
      import_chai.assert.lengthOf(lastReads, 2);
      import_chai.assert.deepEqual([read3, read2], lastReads);
    });
    it("returns only items in provided conversation", async () => {
      const now = Date.now();
      const authorId = getUuid();
      const conversationId = getUuid();
      const read1 = {
        authorId,
        conversationId,
        storyId: getUuid(),
        storyReadDate: now - 20
      };
      const read2 = {
        authorId,
        conversationId,
        storyId: getUuid(),
        storyReadDate: now - 10
      };
      const read3 = {
        authorId,
        conversationId: getUuid(),
        storyId: getUuid(),
        storyReadDate: now
      };
      const read4 = {
        authorId,
        conversationId: getUuid(),
        storyId: getUuid(),
        storyReadDate: now
      };
      await addNewStoryRead(read1);
      await addNewStoryRead(read2);
      await addNewStoryRead(read3);
      await addNewStoryRead(read4);
      import_chai.assert.lengthOf(await _getAllStoryReads(), 4);
      const lastReads = await getLastStoryReadsForAuthor({
        authorId,
        conversationId,
        limit: 1
      });
      import_chai.assert.lengthOf(lastReads, 1);
      import_chai.assert.deepEqual([read2], lastReads);
    });
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3RvcnlSZWFkc190ZXN0LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IGFzc2VydCB9IGZyb20gJ2NoYWknO1xuXG5pbXBvcnQgZGF0YUludGVyZmFjZSBmcm9tICcuLi8uLi9zcWwvQ2xpZW50JztcbmltcG9ydCB7IFVVSUQgfSBmcm9tICcuLi8uLi90eXBlcy9VVUlEJztcbmltcG9ydCB0eXBlIHsgVVVJRFN0cmluZ1R5cGUgfSBmcm9tICcuLi8uLi90eXBlcy9VVUlEJztcblxuaW1wb3J0IHR5cGUgeyBTdG9yeVJlYWRUeXBlIH0gZnJvbSAnLi4vLi4vc3FsL0ludGVyZmFjZSc7XG5cbmNvbnN0IHtcbiAgX2dldEFsbFN0b3J5UmVhZHMsXG4gIF9kZWxldGVBbGxTdG9yeVJlYWRzLFxuICBhZGROZXdTdG9yeVJlYWQsXG4gIGdldExhc3RTdG9yeVJlYWRzRm9yQXV0aG9yLFxufSA9IGRhdGFJbnRlcmZhY2U7XG5cbmZ1bmN0aW9uIGdldFV1aWQoKTogVVVJRFN0cmluZ1R5cGUge1xuICByZXR1cm4gVVVJRC5nZW5lcmF0ZSgpLnRvU3RyaW5nKCk7XG59XG5cbmRlc2NyaWJlKCdzcWwvc3RvcnlSZWFkcycsICgpID0+IHtcbiAgYmVmb3JlRWFjaChhc3luYyAoKSA9PiB7XG4gICAgYXdhaXQgX2RlbGV0ZUFsbFN0b3J5UmVhZHMoKTtcbiAgfSk7XG5cbiAgaXQoJ3JvdW5kdHJpcHMgd2l0aCBjcmVhdGUvZmV0Y2gvZGVsZXRlJywgYXN5bmMgKCkgPT4ge1xuICAgIGFzc2VydC5sZW5ndGhPZihhd2FpdCBfZ2V0QWxsU3RvcnlSZWFkcygpLCAwKTtcblxuICAgIGNvbnN0IHJlYWQ6IFN0b3J5UmVhZFR5cGUgPSB7XG4gICAgICBhdXRob3JJZDogZ2V0VXVpZCgpLFxuICAgICAgY29udmVyc2F0aW9uSWQ6IGdldFV1aWQoKSxcbiAgICAgIHN0b3J5SWQ6IGdldFV1aWQoKSxcbiAgICAgIHN0b3J5UmVhZERhdGU6IERhdGUubm93KCksXG4gICAgfTtcblxuICAgIGF3YWl0IGFkZE5ld1N0b3J5UmVhZChyZWFkKTtcblxuICAgIGNvbnN0IGFsbFJlYWRzID0gYXdhaXQgX2dldEFsbFN0b3J5UmVhZHMoKTtcbiAgICBhc3NlcnQubGVuZ3RoT2YoYWxsUmVhZHMsIDEpO1xuICAgIGFzc2VydC5kZWVwRXF1YWwoYWxsUmVhZHNbMF0sIHJlYWQpO1xuICB9KTtcblxuICBkZXNjcmliZSgnZ2V0TGFzdFN0b3J5UmVhZHNGb3JBdXRob3InLCAoKSA9PiB7XG4gICAgaXQoJ3JldHVybnMgbiA9IGxpbWl0IGl0ZW1zIGZvciBhdXRob3InLCBhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xuICAgICAgY29uc3QgYXV0aG9ySWQgPSBnZXRVdWlkKCk7XG4gICAgICBjb25zdCByZWFkMTogU3RvcnlSZWFkVHlwZSA9IHtcbiAgICAgICAgYXV0aG9ySWQsXG4gICAgICAgIGNvbnZlcnNhdGlvbklkOiBnZXRVdWlkKCksXG4gICAgICAgIHN0b3J5SWQ6IGdldFV1aWQoKSxcbiAgICAgICAgc3RvcnlSZWFkRGF0ZTogbm93IC0gMjAsXG4gICAgICB9O1xuICAgICAgY29uc3QgcmVhZDI6IFN0b3J5UmVhZFR5cGUgPSB7XG4gICAgICAgIGF1dGhvcklkLFxuICAgICAgICBjb252ZXJzYXRpb25JZDogZ2V0VXVpZCgpLFxuICAgICAgICBzdG9yeUlkOiBnZXRVdWlkKCksXG4gICAgICAgIHN0b3J5UmVhZERhdGU6IG5vdyAtIDEwLFxuICAgICAgfTtcbiAgICAgIGNvbnN0IHJlYWQzOiBTdG9yeVJlYWRUeXBlID0ge1xuICAgICAgICBhdXRob3JJZCxcbiAgICAgICAgY29udmVyc2F0aW9uSWQ6IGdldFV1aWQoKSxcbiAgICAgICAgc3RvcnlJZDogZ2V0VXVpZCgpLFxuICAgICAgICBzdG9yeVJlYWREYXRlOiBub3csXG4gICAgICB9O1xuICAgICAgY29uc3QgcmVhZDQ6IFN0b3J5UmVhZFR5cGUgPSB7XG4gICAgICAgIGF1dGhvcklkOiBnZXRVdWlkKCksXG4gICAgICAgIGNvbnZlcnNhdGlvbklkOiBnZXRVdWlkKCksXG4gICAgICAgIHN0b3J5SWQ6IGdldFV1aWQoKSxcbiAgICAgICAgc3RvcnlSZWFkRGF0ZTogbm93LFxuICAgICAgfTtcblxuICAgICAgYXdhaXQgYWRkTmV3U3RvcnlSZWFkKHJlYWQxKTtcbiAgICAgIGF3YWl0IGFkZE5ld1N0b3J5UmVhZChyZWFkMik7XG4gICAgICBhd2FpdCBhZGROZXdTdG9yeVJlYWQocmVhZDMpO1xuICAgICAgYXdhaXQgYWRkTmV3U3RvcnlSZWFkKHJlYWQ0KTtcblxuICAgICAgYXNzZXJ0Lmxlbmd0aE9mKGF3YWl0IF9nZXRBbGxTdG9yeVJlYWRzKCksIDQpO1xuXG4gICAgICBjb25zdCBsYXN0UmVhZHMgPSBhd2FpdCBnZXRMYXN0U3RvcnlSZWFkc0ZvckF1dGhvcih7XG4gICAgICAgIGF1dGhvcklkLFxuICAgICAgICBsaW1pdDogMixcbiAgICAgIH0pO1xuICAgICAgYXNzZXJ0Lmxlbmd0aE9mKGxhc3RSZWFkcywgMik7XG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKFtyZWFkMywgcmVhZDJdLCBsYXN0UmVhZHMpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgb25seSBpdGVtcyBpbiBwcm92aWRlZCBjb252ZXJzYXRpb24nLCBhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xuICAgICAgY29uc3QgYXV0aG9ySWQgPSBnZXRVdWlkKCk7XG4gICAgICBjb25zdCBjb252ZXJzYXRpb25JZCA9IGdldFV1aWQoKTtcbiAgICAgIGNvbnN0IHJlYWQxOiBTdG9yeVJlYWRUeXBlID0ge1xuICAgICAgICBhdXRob3JJZCxcbiAgICAgICAgY29udmVyc2F0aW9uSWQsXG4gICAgICAgIHN0b3J5SWQ6IGdldFV1aWQoKSxcbiAgICAgICAgc3RvcnlSZWFkRGF0ZTogbm93IC0gMjAsXG4gICAgICB9O1xuICAgICAgY29uc3QgcmVhZDI6IFN0b3J5UmVhZFR5cGUgPSB7XG4gICAgICAgIGF1dGhvcklkLFxuICAgICAgICBjb252ZXJzYXRpb25JZCxcbiAgICAgICAgc3RvcnlJZDogZ2V0VXVpZCgpLFxuICAgICAgICBzdG9yeVJlYWREYXRlOiBub3cgLSAxMCxcbiAgICAgIH07XG4gICAgICBjb25zdCByZWFkMzogU3RvcnlSZWFkVHlwZSA9IHtcbiAgICAgICAgYXV0aG9ySWQsXG4gICAgICAgIGNvbnZlcnNhdGlvbklkOiBnZXRVdWlkKCksXG4gICAgICAgIHN0b3J5SWQ6IGdldFV1aWQoKSxcbiAgICAgICAgc3RvcnlSZWFkRGF0ZTogbm93LFxuICAgICAgfTtcbiAgICAgIGNvbnN0IHJlYWQ0OiBTdG9yeVJlYWRUeXBlID0ge1xuICAgICAgICBhdXRob3JJZCxcbiAgICAgICAgY29udmVyc2F0aW9uSWQ6IGdldFV1aWQoKSxcbiAgICAgICAgc3RvcnlJZDogZ2V0VXVpZCgpLFxuICAgICAgICBzdG9yeVJlYWREYXRlOiBub3csXG4gICAgICB9O1xuXG4gICAgICBhd2FpdCBhZGROZXdTdG9yeVJlYWQocmVhZDEpO1xuICAgICAgYXdhaXQgYWRkTmV3U3RvcnlSZWFkKHJlYWQyKTtcbiAgICAgIGF3YWl0IGFkZE5ld1N0b3J5UmVhZChyZWFkMyk7XG4gICAgICBhd2FpdCBhZGROZXdTdG9yeVJlYWQocmVhZDQpO1xuXG4gICAgICBhc3NlcnQubGVuZ3RoT2YoYXdhaXQgX2dldEFsbFN0b3J5UmVhZHMoKSwgNCk7XG5cbiAgICAgIGNvbnN0IGxhc3RSZWFkcyA9IGF3YWl0IGdldExhc3RTdG9yeVJlYWRzRm9yQXV0aG9yKHtcbiAgICAgICAgYXV0aG9ySWQsXG4gICAgICAgIGNvbnZlcnNhdGlvbklkLFxuICAgICAgICBsaW1pdDogMSxcbiAgICAgIH0pO1xuICAgICAgYXNzZXJ0Lmxlbmd0aE9mKGxhc3RSZWFkcywgMSk7XG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKFtyZWFkMl0sIGxhc3RSZWFkcyk7XG4gICAgfSk7XG4gIH0pO1xufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7O0FBR0Esa0JBQXVCO0FBRXZCLG9CQUEwQjtBQUMxQixrQkFBcUI7QUFLckIsTUFBTTtBQUFBLEVBQ0o7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxJQUNFO0FBRUosbUJBQW1DO0FBQ2pDLFNBQU8saUJBQUssU0FBUyxFQUFFLFNBQVM7QUFDbEM7QUFGUyxBQUlULFNBQVMsa0JBQWtCLE1BQU07QUFDL0IsYUFBVyxZQUFZO0FBQ3JCLFVBQU0scUJBQXFCO0FBQUEsRUFDN0IsQ0FBQztBQUVELEtBQUcsdUNBQXVDLFlBQVk7QUFDcEQsdUJBQU8sU0FBUyxNQUFNLGtCQUFrQixHQUFHLENBQUM7QUFFNUMsVUFBTSxPQUFzQjtBQUFBLE1BQzFCLFVBQVUsUUFBUTtBQUFBLE1BQ2xCLGdCQUFnQixRQUFRO0FBQUEsTUFDeEIsU0FBUyxRQUFRO0FBQUEsTUFDakIsZUFBZSxLQUFLLElBQUk7QUFBQSxJQUMxQjtBQUVBLFVBQU0sZ0JBQWdCLElBQUk7QUFFMUIsVUFBTSxXQUFXLE1BQU0sa0JBQWtCO0FBQ3pDLHVCQUFPLFNBQVMsVUFBVSxDQUFDO0FBQzNCLHVCQUFPLFVBQVUsU0FBUyxJQUFJLElBQUk7QUFBQSxFQUNwQyxDQUFDO0FBRUQsV0FBUyw4QkFBOEIsTUFBTTtBQUMzQyxPQUFHLHNDQUFzQyxZQUFZO0FBQ25ELFlBQU0sTUFBTSxLQUFLLElBQUk7QUFDckIsWUFBTSxXQUFXLFFBQVE7QUFDekIsWUFBTSxRQUF1QjtBQUFBLFFBQzNCO0FBQUEsUUFDQSxnQkFBZ0IsUUFBUTtBQUFBLFFBQ3hCLFNBQVMsUUFBUTtBQUFBLFFBQ2pCLGVBQWUsTUFBTTtBQUFBLE1BQ3ZCO0FBQ0EsWUFBTSxRQUF1QjtBQUFBLFFBQzNCO0FBQUEsUUFDQSxnQkFBZ0IsUUFBUTtBQUFBLFFBQ3hCLFNBQVMsUUFBUTtBQUFBLFFBQ2pCLGVBQWUsTUFBTTtBQUFBLE1BQ3ZCO0FBQ0EsWUFBTSxRQUF1QjtBQUFBLFFBQzNCO0FBQUEsUUFDQSxnQkFBZ0IsUUFBUTtBQUFBLFFBQ3hCLFNBQVMsUUFBUTtBQUFBLFFBQ2pCLGVBQWU7QUFBQSxNQUNqQjtBQUNBLFlBQU0sUUFBdUI7QUFBQSxRQUMzQixVQUFVLFFBQVE7QUFBQSxRQUNsQixnQkFBZ0IsUUFBUTtBQUFBLFFBQ3hCLFNBQVMsUUFBUTtBQUFBLFFBQ2pCLGVBQWU7QUFBQSxNQUNqQjtBQUVBLFlBQU0sZ0JBQWdCLEtBQUs7QUFDM0IsWUFBTSxnQkFBZ0IsS0FBSztBQUMzQixZQUFNLGdCQUFnQixLQUFLO0FBQzNCLFlBQU0sZ0JBQWdCLEtBQUs7QUFFM0IseUJBQU8sU0FBUyxNQUFNLGtCQUFrQixHQUFHLENBQUM7QUFFNUMsWUFBTSxZQUFZLE1BQU0sMkJBQTJCO0FBQUEsUUFDakQ7QUFBQSxRQUNBLE9BQU87QUFBQSxNQUNULENBQUM7QUFDRCx5QkFBTyxTQUFTLFdBQVcsQ0FBQztBQUM1Qix5QkFBTyxVQUFVLENBQUMsT0FBTyxLQUFLLEdBQUcsU0FBUztBQUFBLElBQzVDLENBQUM7QUFFRCxPQUFHLCtDQUErQyxZQUFZO0FBQzVELFlBQU0sTUFBTSxLQUFLLElBQUk7QUFDckIsWUFBTSxXQUFXLFFBQVE7QUFDekIsWUFBTSxpQkFBaUIsUUFBUTtBQUMvQixZQUFNLFFBQXVCO0FBQUEsUUFDM0I7QUFBQSxRQUNBO0FBQUEsUUFDQSxTQUFTLFFBQVE7QUFBQSxRQUNqQixlQUFlLE1BQU07QUFBQSxNQUN2QjtBQUNBLFlBQU0sUUFBdUI7QUFBQSxRQUMzQjtBQUFBLFFBQ0E7QUFBQSxRQUNBLFNBQVMsUUFBUTtBQUFBLFFBQ2pCLGVBQWUsTUFBTTtBQUFBLE1BQ3ZCO0FBQ0EsWUFBTSxRQUF1QjtBQUFBLFFBQzNCO0FBQUEsUUFDQSxnQkFBZ0IsUUFBUTtBQUFBLFFBQ3hCLFNBQVMsUUFBUTtBQUFBLFFBQ2pCLGVBQWU7QUFBQSxNQUNqQjtBQUNBLFlBQU0sUUFBdUI7QUFBQSxRQUMzQjtBQUFBLFFBQ0EsZ0JBQWdCLFFBQVE7QUFBQSxRQUN4QixTQUFTLFFBQVE7QUFBQSxRQUNqQixlQUFlO0FBQUEsTUFDakI7QUFFQSxZQUFNLGdCQUFnQixLQUFLO0FBQzNCLFlBQU0sZ0JBQWdCLEtBQUs7QUFDM0IsWUFBTSxnQkFBZ0IsS0FBSztBQUMzQixZQUFNLGdCQUFnQixLQUFLO0FBRTNCLHlCQUFPLFNBQVMsTUFBTSxrQkFBa0IsR0FBRyxDQUFDO0FBRTVDLFlBQU0sWUFBWSxNQUFNLDJCQUEyQjtBQUFBLFFBQ2pEO0FBQUEsUUFDQTtBQUFBLFFBQ0EsT0FBTztBQUFBLE1BQ1QsQ0FBQztBQUNELHlCQUFPLFNBQVMsV0FBVyxDQUFDO0FBQzVCLHlCQUFPLFVBQVUsQ0FBQyxLQUFLLEdBQUcsU0FBUztBQUFBLElBQ3JDLENBQUM7QUFBQSxFQUNILENBQUM7QUFDSCxDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
