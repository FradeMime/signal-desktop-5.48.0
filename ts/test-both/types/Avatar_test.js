var import_chai = require("chai");
var import_Avatar = require("../../types/Avatar");
describe("Avatar", () => {
  describe("getDefaultAvatars", () => {
    it("returns an array of valid avatars for direct conversations", () => {
      import_chai.assert.isNotEmpty((0, import_Avatar.getDefaultAvatars)(false));
    });
    it("returns an array of valid avatars for group conversations", () => {
      import_chai.assert.isNotEmpty((0, import_Avatar.getDefaultAvatars)(true));
    });
    it("defaults to returning avatars for direct conversations", () => {
      const defaultResult = (0, import_Avatar.getDefaultAvatars)();
      const directResult = (0, import_Avatar.getDefaultAvatars)(false);
      const groupResult = (0, import_Avatar.getDefaultAvatars)(true);
      import_chai.assert.deepEqual(defaultResult, directResult);
      import_chai.assert.notDeepEqual(defaultResult, groupResult);
    });
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQXZhdGFyX3Rlc3QudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSAnY2hhaSc7XG5cbmltcG9ydCB7IGdldERlZmF1bHRBdmF0YXJzIH0gZnJvbSAnLi4vLi4vdHlwZXMvQXZhdGFyJztcblxuZGVzY3JpYmUoJ0F2YXRhcicsICgpID0+IHtcbiAgZGVzY3JpYmUoJ2dldERlZmF1bHRBdmF0YXJzJywgKCkgPT4ge1xuICAgIGl0KCdyZXR1cm5zIGFuIGFycmF5IG9mIHZhbGlkIGF2YXRhcnMgZm9yIGRpcmVjdCBjb252ZXJzYXRpb25zJywgKCkgPT4ge1xuICAgICAgYXNzZXJ0LmlzTm90RW1wdHkoZ2V0RGVmYXVsdEF2YXRhcnMoZmFsc2UpKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIGFuIGFycmF5IG9mIHZhbGlkIGF2YXRhcnMgZm9yIGdyb3VwIGNvbnZlcnNhdGlvbnMnLCAoKSA9PiB7XG4gICAgICBhc3NlcnQuaXNOb3RFbXB0eShnZXREZWZhdWx0QXZhdGFycyh0cnVlKSk7XG4gICAgfSk7XG5cbiAgICBpdCgnZGVmYXVsdHMgdG8gcmV0dXJuaW5nIGF2YXRhcnMgZm9yIGRpcmVjdCBjb252ZXJzYXRpb25zJywgKCkgPT4ge1xuICAgICAgY29uc3QgZGVmYXVsdFJlc3VsdCA9IGdldERlZmF1bHRBdmF0YXJzKCk7XG4gICAgICBjb25zdCBkaXJlY3RSZXN1bHQgPSBnZXREZWZhdWx0QXZhdGFycyhmYWxzZSk7XG4gICAgICBjb25zdCBncm91cFJlc3VsdCA9IGdldERlZmF1bHRBdmF0YXJzKHRydWUpO1xuXG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKGRlZmF1bHRSZXN1bHQsIGRpcmVjdFJlc3VsdCk7XG4gICAgICBhc3NlcnQubm90RGVlcEVxdWFsKGRlZmF1bHRSZXN1bHQsIGdyb3VwUmVzdWx0KTtcbiAgICB9KTtcbiAgfSk7XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICJBQUdBLGtCQUF1QjtBQUV2QixvQkFBa0M7QUFFbEMsU0FBUyxVQUFVLE1BQU07QUFDdkIsV0FBUyxxQkFBcUIsTUFBTTtBQUNsQyxPQUFHLDhEQUE4RCxNQUFNO0FBQ3JFLHlCQUFPLFdBQVcscUNBQWtCLEtBQUssQ0FBQztBQUFBLElBQzVDLENBQUM7QUFFRCxPQUFHLDZEQUE2RCxNQUFNO0FBQ3BFLHlCQUFPLFdBQVcscUNBQWtCLElBQUksQ0FBQztBQUFBLElBQzNDLENBQUM7QUFFRCxPQUFHLDBEQUEwRCxNQUFNO0FBQ2pFLFlBQU0sZ0JBQWdCLHFDQUFrQjtBQUN4QyxZQUFNLGVBQWUscUNBQWtCLEtBQUs7QUFDNUMsWUFBTSxjQUFjLHFDQUFrQixJQUFJO0FBRTFDLHlCQUFPLFVBQVUsZUFBZSxZQUFZO0FBQzVDLHlCQUFPLGFBQWEsZUFBZSxXQUFXO0FBQUEsSUFDaEQsQ0FBQztBQUFBLEVBQ0gsQ0FBQztBQUNILENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
