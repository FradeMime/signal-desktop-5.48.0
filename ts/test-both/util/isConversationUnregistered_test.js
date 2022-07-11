var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var durations = __toESM(require("../../util/durations"));
var import_isConversationUnregistered = require("../../util/isConversationUnregistered");
describe("isConversationUnregistered", () => {
  it("returns false if passed an undefined discoveredUnregisteredAt", () => {
    import_chai.assert.isFalse((0, import_isConversationUnregistered.isConversationUnregistered)({}));
    import_chai.assert.isFalse((0, import_isConversationUnregistered.isConversationUnregistered)({ discoveredUnregisteredAt: void 0 }));
  });
  it("returns true if passed a time fewer than 6 hours ago", () => {
    import_chai.assert.isTrue((0, import_isConversationUnregistered.isConversationUnregistered)({ discoveredUnregisteredAt: Date.now() }));
    const fiveHours = 1e3 * 60 * 60 * 5;
    import_chai.assert.isTrue((0, import_isConversationUnregistered.isConversationUnregistered)({
      discoveredUnregisteredAt: Date.now() - fiveHours
    }));
  });
  it("returns true if passed a time in the future", () => {
    import_chai.assert.isTrue((0, import_isConversationUnregistered.isConversationUnregistered)({ discoveredUnregisteredAt: Date.now() + 123 }));
  });
  it("returns false if passed a time more than 6 hours ago", () => {
    import_chai.assert.isFalse((0, import_isConversationUnregistered.isConversationUnregistered)({
      discoveredUnregisteredAt: Date.now() - 6 * durations.HOUR - durations.MINUTE
    }));
    import_chai.assert.isFalse((0, import_isConversationUnregistered.isConversationUnregistered)({
      discoveredUnregisteredAt: new Date(1999, 3, 20).getTime()
    }));
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiaXNDb252ZXJzYXRpb25VbnJlZ2lzdGVyZWRfdGVzdC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyBhc3NlcnQgfSBmcm9tICdjaGFpJztcbmltcG9ydCAqIGFzIGR1cmF0aW9ucyBmcm9tICcuLi8uLi91dGlsL2R1cmF0aW9ucyc7XG5cbmltcG9ydCB7IGlzQ29udmVyc2F0aW9uVW5yZWdpc3RlcmVkIH0gZnJvbSAnLi4vLi4vdXRpbC9pc0NvbnZlcnNhdGlvblVucmVnaXN0ZXJlZCc7XG5cbmRlc2NyaWJlKCdpc0NvbnZlcnNhdGlvblVucmVnaXN0ZXJlZCcsICgpID0+IHtcbiAgaXQoJ3JldHVybnMgZmFsc2UgaWYgcGFzc2VkIGFuIHVuZGVmaW5lZCBkaXNjb3ZlcmVkVW5yZWdpc3RlcmVkQXQnLCAoKSA9PiB7XG4gICAgYXNzZXJ0LmlzRmFsc2UoaXNDb252ZXJzYXRpb25VbnJlZ2lzdGVyZWQoe30pKTtcbiAgICBhc3NlcnQuaXNGYWxzZShcbiAgICAgIGlzQ29udmVyc2F0aW9uVW5yZWdpc3RlcmVkKHsgZGlzY292ZXJlZFVucmVnaXN0ZXJlZEF0OiB1bmRlZmluZWQgfSlcbiAgICApO1xuICB9KTtcblxuICBpdCgncmV0dXJucyB0cnVlIGlmIHBhc3NlZCBhIHRpbWUgZmV3ZXIgdGhhbiA2IGhvdXJzIGFnbycsICgpID0+IHtcbiAgICBhc3NlcnQuaXNUcnVlKFxuICAgICAgaXNDb252ZXJzYXRpb25VbnJlZ2lzdGVyZWQoeyBkaXNjb3ZlcmVkVW5yZWdpc3RlcmVkQXQ6IERhdGUubm93KCkgfSlcbiAgICApO1xuXG4gICAgY29uc3QgZml2ZUhvdXJzID0gMTAwMCAqIDYwICogNjAgKiA1O1xuICAgIGFzc2VydC5pc1RydWUoXG4gICAgICBpc0NvbnZlcnNhdGlvblVucmVnaXN0ZXJlZCh7XG4gICAgICAgIGRpc2NvdmVyZWRVbnJlZ2lzdGVyZWRBdDogRGF0ZS5ub3coKSAtIGZpdmVIb3VycyxcbiAgICAgIH0pXG4gICAgKTtcbiAgfSk7XG5cbiAgaXQoJ3JldHVybnMgdHJ1ZSBpZiBwYXNzZWQgYSB0aW1lIGluIHRoZSBmdXR1cmUnLCAoKSA9PiB7XG4gICAgYXNzZXJ0LmlzVHJ1ZShcbiAgICAgIGlzQ29udmVyc2F0aW9uVW5yZWdpc3RlcmVkKHsgZGlzY292ZXJlZFVucmVnaXN0ZXJlZEF0OiBEYXRlLm5vdygpICsgMTIzIH0pXG4gICAgKTtcbiAgfSk7XG5cbiAgaXQoJ3JldHVybnMgZmFsc2UgaWYgcGFzc2VkIGEgdGltZSBtb3JlIHRoYW4gNiBob3VycyBhZ28nLCAoKSA9PiB7XG4gICAgYXNzZXJ0LmlzRmFsc2UoXG4gICAgICBpc0NvbnZlcnNhdGlvblVucmVnaXN0ZXJlZCh7XG4gICAgICAgIGRpc2NvdmVyZWRVbnJlZ2lzdGVyZWRBdDpcbiAgICAgICAgICBEYXRlLm5vdygpIC0gNiAqIGR1cmF0aW9ucy5IT1VSIC0gZHVyYXRpb25zLk1JTlVURSxcbiAgICAgIH0pXG4gICAgKTtcbiAgICBhc3NlcnQuaXNGYWxzZShcbiAgICAgIGlzQ29udmVyc2F0aW9uVW5yZWdpc3RlcmVkKHtcbiAgICAgICAgZGlzY292ZXJlZFVucmVnaXN0ZXJlZEF0OiBuZXcgRGF0ZSgxOTk5LCAzLCAyMCkuZ2V0VGltZSgpLFxuICAgICAgfSlcbiAgICApO1xuICB9KTtcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7O0FBR0Esa0JBQXVCO0FBQ3ZCLGdCQUEyQjtBQUUzQix3Q0FBMkM7QUFFM0MsU0FBUyw4QkFBOEIsTUFBTTtBQUMzQyxLQUFHLGlFQUFpRSxNQUFNO0FBQ3hFLHVCQUFPLFFBQVEsa0VBQTJCLENBQUMsQ0FBQyxDQUFDO0FBQzdDLHVCQUFPLFFBQ0wsa0VBQTJCLEVBQUUsMEJBQTBCLE9BQVUsQ0FBQyxDQUNwRTtBQUFBLEVBQ0YsQ0FBQztBQUVELEtBQUcsd0RBQXdELE1BQU07QUFDL0QsdUJBQU8sT0FDTCxrRUFBMkIsRUFBRSwwQkFBMEIsS0FBSyxJQUFJLEVBQUUsQ0FBQyxDQUNyRTtBQUVBLFVBQU0sWUFBWSxNQUFPLEtBQUssS0FBSztBQUNuQyx1QkFBTyxPQUNMLGtFQUEyQjtBQUFBLE1BQ3pCLDBCQUEwQixLQUFLLElBQUksSUFBSTtBQUFBLElBQ3pDLENBQUMsQ0FDSDtBQUFBLEVBQ0YsQ0FBQztBQUVELEtBQUcsK0NBQStDLE1BQU07QUFDdEQsdUJBQU8sT0FDTCxrRUFBMkIsRUFBRSwwQkFBMEIsS0FBSyxJQUFJLElBQUksSUFBSSxDQUFDLENBQzNFO0FBQUEsRUFDRixDQUFDO0FBRUQsS0FBRyx3REFBd0QsTUFBTTtBQUMvRCx1QkFBTyxRQUNMLGtFQUEyQjtBQUFBLE1BQ3pCLDBCQUNFLEtBQUssSUFBSSxJQUFJLElBQUksVUFBVSxPQUFPLFVBQVU7QUFBQSxJQUNoRCxDQUFDLENBQ0g7QUFDQSx1QkFBTyxRQUNMLGtFQUEyQjtBQUFBLE1BQ3pCLDBCQUEwQixJQUFJLEtBQUssTUFBTSxHQUFHLEVBQUUsRUFBRSxRQUFRO0FBQUEsSUFDMUQsQ0FBQyxDQUNIO0FBQUEsRUFDRixDQUFDO0FBQ0gsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
