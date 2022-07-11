var import_chai = require("chai");
var import_isConversationSMSOnly = require("../../util/isConversationSMSOnly");
describe("isConversationSMSOnly", () => {
  it("returns false if passed an undefined type", () => {
    import_chai.assert.isFalse((0, import_isConversationSMSOnly.isConversationSMSOnly)({
      type: void 0
    }));
  });
  ["direct", "private"].forEach((type) => {
    it("returns false if passed an undefined discoveredUnregisteredAt", () => {
      import_chai.assert.isFalse((0, import_isConversationSMSOnly.isConversationSMSOnly)({ type, discoveredUnregisteredAt: void 0 }));
    });
    it("returns true if passed a very old discoveredUnregisteredAt", () => {
      import_chai.assert.isTrue((0, import_isConversationSMSOnly.isConversationSMSOnly)({
        type,
        e164: "e164",
        uuid: "uuid",
        discoveredUnregisteredAt: 1
      }));
    });
    it(`returns true if passed a time fewer than 6 hours ago and is ${type}`, () => {
      import_chai.assert.isTrue((0, import_isConversationSMSOnly.isConversationSMSOnly)({
        type,
        e164: "e164",
        uuid: "uuid",
        discoveredUnregisteredAt: Date.now()
      }));
      const fiveHours = 1e3 * 60 * 60 * 5;
      import_chai.assert.isTrue((0, import_isConversationSMSOnly.isConversationSMSOnly)({
        type,
        e164: "e164",
        uuid: "uuid",
        discoveredUnregisteredAt: Date.now() - fiveHours
      }));
    });
    it(`returns true conversation is ${type} and has no uuid`, () => {
      import_chai.assert.isTrue((0, import_isConversationSMSOnly.isConversationSMSOnly)({ type, e164: "e164" }));
      import_chai.assert.isFalse((0, import_isConversationSMSOnly.isConversationSMSOnly)({ type }));
    });
  });
  it("returns false for groups", () => {
    import_chai.assert.isFalse((0, import_isConversationSMSOnly.isConversationSMSOnly)({ type: "group" }));
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiaXNDb252ZXJzYXRpb25TTVNPbmx5X3Rlc3QudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSAnY2hhaSc7XG5cbmltcG9ydCB7IGlzQ29udmVyc2F0aW9uU01TT25seSB9IGZyb20gJy4uLy4uL3V0aWwvaXNDb252ZXJzYXRpb25TTVNPbmx5JztcblxuZGVzY3JpYmUoJ2lzQ29udmVyc2F0aW9uU01TT25seScsICgpID0+IHtcbiAgaXQoJ3JldHVybnMgZmFsc2UgaWYgcGFzc2VkIGFuIHVuZGVmaW5lZCB0eXBlJywgKCkgPT4ge1xuICAgIGFzc2VydC5pc0ZhbHNlKFxuICAgICAgaXNDb252ZXJzYXRpb25TTVNPbmx5KHtcbiAgICAgICAgdHlwZTogdW5kZWZpbmVkLFxuICAgICAgfSlcbiAgICApO1xuICB9KTtcblxuICBbJ2RpcmVjdCcsICdwcml2YXRlJ10uZm9yRWFjaCh0eXBlID0+IHtcbiAgICBpdCgncmV0dXJucyBmYWxzZSBpZiBwYXNzZWQgYW4gdW5kZWZpbmVkIGRpc2NvdmVyZWRVbnJlZ2lzdGVyZWRBdCcsICgpID0+IHtcbiAgICAgIGFzc2VydC5pc0ZhbHNlKFxuICAgICAgICBpc0NvbnZlcnNhdGlvblNNU09ubHkoeyB0eXBlLCBkaXNjb3ZlcmVkVW5yZWdpc3RlcmVkQXQ6IHVuZGVmaW5lZCB9KVxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIHRydWUgaWYgcGFzc2VkIGEgdmVyeSBvbGQgZGlzY292ZXJlZFVucmVnaXN0ZXJlZEF0JywgKCkgPT4ge1xuICAgICAgYXNzZXJ0LmlzVHJ1ZShcbiAgICAgICAgaXNDb252ZXJzYXRpb25TTVNPbmx5KHtcbiAgICAgICAgICB0eXBlLFxuICAgICAgICAgIGUxNjQ6ICdlMTY0JyxcbiAgICAgICAgICB1dWlkOiAndXVpZCcsXG4gICAgICAgICAgZGlzY292ZXJlZFVucmVnaXN0ZXJlZEF0OiAxLFxuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIGl0KGByZXR1cm5zIHRydWUgaWYgcGFzc2VkIGEgdGltZSBmZXdlciB0aGFuIDYgaG91cnMgYWdvIGFuZCBpcyAke3R5cGV9YCwgKCkgPT4ge1xuICAgICAgYXNzZXJ0LmlzVHJ1ZShcbiAgICAgICAgaXNDb252ZXJzYXRpb25TTVNPbmx5KHtcbiAgICAgICAgICB0eXBlLFxuICAgICAgICAgIGUxNjQ6ICdlMTY0JyxcbiAgICAgICAgICB1dWlkOiAndXVpZCcsXG4gICAgICAgICAgZGlzY292ZXJlZFVucmVnaXN0ZXJlZEF0OiBEYXRlLm5vdygpLFxuICAgICAgICB9KVxuICAgICAgKTtcblxuICAgICAgY29uc3QgZml2ZUhvdXJzID0gMTAwMCAqIDYwICogNjAgKiA1O1xuICAgICAgYXNzZXJ0LmlzVHJ1ZShcbiAgICAgICAgaXNDb252ZXJzYXRpb25TTVNPbmx5KHtcbiAgICAgICAgICB0eXBlLFxuICAgICAgICAgIGUxNjQ6ICdlMTY0JyxcbiAgICAgICAgICB1dWlkOiAndXVpZCcsXG4gICAgICAgICAgZGlzY292ZXJlZFVucmVnaXN0ZXJlZEF0OiBEYXRlLm5vdygpIC0gZml2ZUhvdXJzLFxuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIGl0KGByZXR1cm5zIHRydWUgY29udmVyc2F0aW9uIGlzICR7dHlwZX0gYW5kIGhhcyBubyB1dWlkYCwgKCkgPT4ge1xuICAgICAgYXNzZXJ0LmlzVHJ1ZShpc0NvbnZlcnNhdGlvblNNU09ubHkoeyB0eXBlLCBlMTY0OiAnZTE2NCcgfSkpO1xuICAgICAgYXNzZXJ0LmlzRmFsc2UoaXNDb252ZXJzYXRpb25TTVNPbmx5KHsgdHlwZSB9KSk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGl0KCdyZXR1cm5zIGZhbHNlIGZvciBncm91cHMnLCAoKSA9PiB7XG4gICAgYXNzZXJ0LmlzRmFsc2UoaXNDb252ZXJzYXRpb25TTVNPbmx5KHsgdHlwZTogJ2dyb3VwJyB9KSk7XG4gIH0pO1xufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiQUFHQSxrQkFBdUI7QUFFdkIsbUNBQXNDO0FBRXRDLFNBQVMseUJBQXlCLE1BQU07QUFDdEMsS0FBRyw2Q0FBNkMsTUFBTTtBQUNwRCx1QkFBTyxRQUNMLHdEQUFzQjtBQUFBLE1BQ3BCLE1BQU07QUFBQSxJQUNSLENBQUMsQ0FDSDtBQUFBLEVBQ0YsQ0FBQztBQUVELEdBQUMsVUFBVSxTQUFTLEVBQUUsUUFBUSxVQUFRO0FBQ3BDLE9BQUcsaUVBQWlFLE1BQU07QUFDeEUseUJBQU8sUUFDTCx3REFBc0IsRUFBRSxNQUFNLDBCQUEwQixPQUFVLENBQUMsQ0FDckU7QUFBQSxJQUNGLENBQUM7QUFFRCxPQUFHLDhEQUE4RCxNQUFNO0FBQ3JFLHlCQUFPLE9BQ0wsd0RBQXNCO0FBQUEsUUFDcEI7QUFBQSxRQUNBLE1BQU07QUFBQSxRQUNOLE1BQU07QUFBQSxRQUNOLDBCQUEwQjtBQUFBLE1BQzVCLENBQUMsQ0FDSDtBQUFBLElBQ0YsQ0FBQztBQUVELE9BQUcsK0RBQStELFFBQVEsTUFBTTtBQUM5RSx5QkFBTyxPQUNMLHdEQUFzQjtBQUFBLFFBQ3BCO0FBQUEsUUFDQSxNQUFNO0FBQUEsUUFDTixNQUFNO0FBQUEsUUFDTiwwQkFBMEIsS0FBSyxJQUFJO0FBQUEsTUFDckMsQ0FBQyxDQUNIO0FBRUEsWUFBTSxZQUFZLE1BQU8sS0FBSyxLQUFLO0FBQ25DLHlCQUFPLE9BQ0wsd0RBQXNCO0FBQUEsUUFDcEI7QUFBQSxRQUNBLE1BQU07QUFBQSxRQUNOLE1BQU07QUFBQSxRQUNOLDBCQUEwQixLQUFLLElBQUksSUFBSTtBQUFBLE1BQ3pDLENBQUMsQ0FDSDtBQUFBLElBQ0YsQ0FBQztBQUVELE9BQUcsZ0NBQWdDLHdCQUF3QixNQUFNO0FBQy9ELHlCQUFPLE9BQU8sd0RBQXNCLEVBQUUsTUFBTSxNQUFNLE9BQU8sQ0FBQyxDQUFDO0FBQzNELHlCQUFPLFFBQVEsd0RBQXNCLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFBQSxJQUNoRCxDQUFDO0FBQUEsRUFDSCxDQUFDO0FBRUQsS0FBRyw0QkFBNEIsTUFBTTtBQUNuQyx1QkFBTyxRQUFRLHdEQUFzQixFQUFFLE1BQU0sUUFBUSxDQUFDLENBQUM7QUFBQSxFQUN6RCxDQUFDO0FBQ0gsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
