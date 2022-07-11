var import_chai = require("chai");
var import_isInSystemContacts = require("../../util/isInSystemContacts");
describe("isInSystemContacts", () => {
  it("returns true for direct conversations that have a `name` property", () => {
    import_chai.assert.isTrue((0, import_isInSystemContacts.isInSystemContacts)({
      type: "direct",
      name: "Jane Doe"
    }));
    import_chai.assert.isTrue((0, import_isInSystemContacts.isInSystemContacts)({
      type: "private",
      name: "Jane Doe"
    }));
  });
  it("returns true for direct conversations that have an empty string `name`", () => {
    import_chai.assert.isTrue((0, import_isInSystemContacts.isInSystemContacts)({
      type: "direct",
      name: ""
    }));
  });
  it("returns false for direct conversations that lack a `name` property", () => {
    import_chai.assert.isFalse((0, import_isInSystemContacts.isInSystemContacts)({ type: "direct" }));
  });
  it("returns false for group conversations", () => {
    import_chai.assert.isFalse((0, import_isInSystemContacts.isInSystemContacts)({ type: "group" }));
    import_chai.assert.isFalse((0, import_isInSystemContacts.isInSystemContacts)({
      type: "group",
      name: "Tahoe Trip"
    }));
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiaXNJblN5c3RlbUNvbnRhY3RzX3Rlc3QudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSAnY2hhaSc7XG5cbmltcG9ydCB7IGlzSW5TeXN0ZW1Db250YWN0cyB9IGZyb20gJy4uLy4uL3V0aWwvaXNJblN5c3RlbUNvbnRhY3RzJztcblxuZGVzY3JpYmUoJ2lzSW5TeXN0ZW1Db250YWN0cycsICgpID0+IHtcbiAgaXQoJ3JldHVybnMgdHJ1ZSBmb3IgZGlyZWN0IGNvbnZlcnNhdGlvbnMgdGhhdCBoYXZlIGEgYG5hbWVgIHByb3BlcnR5JywgKCkgPT4ge1xuICAgIGFzc2VydC5pc1RydWUoXG4gICAgICBpc0luU3lzdGVtQ29udGFjdHMoe1xuICAgICAgICB0eXBlOiAnZGlyZWN0JyxcbiAgICAgICAgbmFtZTogJ0phbmUgRG9lJyxcbiAgICAgIH0pXG4gICAgKTtcbiAgICBhc3NlcnQuaXNUcnVlKFxuICAgICAgaXNJblN5c3RlbUNvbnRhY3RzKHtcbiAgICAgICAgdHlwZTogJ3ByaXZhdGUnLFxuICAgICAgICBuYW1lOiAnSmFuZSBEb2UnLFxuICAgICAgfSlcbiAgICApO1xuICB9KTtcblxuICBpdCgncmV0dXJucyB0cnVlIGZvciBkaXJlY3QgY29udmVyc2F0aW9ucyB0aGF0IGhhdmUgYW4gZW1wdHkgc3RyaW5nIGBuYW1lYCcsICgpID0+IHtcbiAgICBhc3NlcnQuaXNUcnVlKFxuICAgICAgaXNJblN5c3RlbUNvbnRhY3RzKHtcbiAgICAgICAgdHlwZTogJ2RpcmVjdCcsXG4gICAgICAgIG5hbWU6ICcnLFxuICAgICAgfSlcbiAgICApO1xuICB9KTtcblxuICBpdCgncmV0dXJucyBmYWxzZSBmb3IgZGlyZWN0IGNvbnZlcnNhdGlvbnMgdGhhdCBsYWNrIGEgYG5hbWVgIHByb3BlcnR5JywgKCkgPT4ge1xuICAgIGFzc2VydC5pc0ZhbHNlKGlzSW5TeXN0ZW1Db250YWN0cyh7IHR5cGU6ICdkaXJlY3QnIH0pKTtcbiAgfSk7XG5cbiAgaXQoJ3JldHVybnMgZmFsc2UgZm9yIGdyb3VwIGNvbnZlcnNhdGlvbnMnLCAoKSA9PiB7XG4gICAgYXNzZXJ0LmlzRmFsc2UoaXNJblN5c3RlbUNvbnRhY3RzKHsgdHlwZTogJ2dyb3VwJyB9KSk7XG4gICAgYXNzZXJ0LmlzRmFsc2UoXG4gICAgICBpc0luU3lzdGVtQ29udGFjdHMoe1xuICAgICAgICB0eXBlOiAnZ3JvdXAnLFxuICAgICAgICBuYW1lOiAnVGFob2UgVHJpcCcsXG4gICAgICB9KVxuICAgICk7XG4gIH0pO1xufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiQUFHQSxrQkFBdUI7QUFFdkIsZ0NBQW1DO0FBRW5DLFNBQVMsc0JBQXNCLE1BQU07QUFDbkMsS0FBRyxxRUFBcUUsTUFBTTtBQUM1RSx1QkFBTyxPQUNMLGtEQUFtQjtBQUFBLE1BQ2pCLE1BQU07QUFBQSxNQUNOLE1BQU07QUFBQSxJQUNSLENBQUMsQ0FDSDtBQUNBLHVCQUFPLE9BQ0wsa0RBQW1CO0FBQUEsTUFDakIsTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLElBQ1IsQ0FBQyxDQUNIO0FBQUEsRUFDRixDQUFDO0FBRUQsS0FBRywwRUFBMEUsTUFBTTtBQUNqRix1QkFBTyxPQUNMLGtEQUFtQjtBQUFBLE1BQ2pCLE1BQU07QUFBQSxNQUNOLE1BQU07QUFBQSxJQUNSLENBQUMsQ0FDSDtBQUFBLEVBQ0YsQ0FBQztBQUVELEtBQUcsc0VBQXNFLE1BQU07QUFDN0UsdUJBQU8sUUFBUSxrREFBbUIsRUFBRSxNQUFNLFNBQVMsQ0FBQyxDQUFDO0FBQUEsRUFDdkQsQ0FBQztBQUVELEtBQUcseUNBQXlDLE1BQU07QUFDaEQsdUJBQU8sUUFBUSxrREFBbUIsRUFBRSxNQUFNLFFBQVEsQ0FBQyxDQUFDO0FBQ3BELHVCQUFPLFFBQ0wsa0RBQW1CO0FBQUEsTUFDakIsTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLElBQ1IsQ0FBQyxDQUNIO0FBQUEsRUFDRixDQUFDO0FBQ0gsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
