var import_chai = require("chai");
var import_isConversationNameKnown = require("../../util/isConversationNameKnown");
describe("isConversationNameKnown", () => {
  describe("for direct conversations", () => {
    it("returns true if the conversation has a name", () => {
      import_chai.assert.isTrue((0, import_isConversationNameKnown.isConversationNameKnown)({
        type: "direct",
        name: "Jane Doe"
      }));
    });
    it("returns true if the conversation has a profile name", () => {
      import_chai.assert.isTrue((0, import_isConversationNameKnown.isConversationNameKnown)({
        type: "direct",
        profileName: "Jane Doe"
      }));
    });
    it("returns true if the conversation has an E164", () => {
      import_chai.assert.isTrue((0, import_isConversationNameKnown.isConversationNameKnown)({
        type: "direct",
        e164: "+16505551234"
      }));
    });
    it("returns false if the conversation has none of the above", () => {
      import_chai.assert.isFalse((0, import_isConversationNameKnown.isConversationNameKnown)({ type: "direct" }));
    });
  });
  describe("for group conversations", () => {
    it("returns true if the conversation has a name", () => {
      import_chai.assert.isTrue((0, import_isConversationNameKnown.isConversationNameKnown)({
        type: "group",
        name: "Tahoe Trip"
      }));
    });
    it("returns true if the conversation lacks a name", () => {
      import_chai.assert.isFalse((0, import_isConversationNameKnown.isConversationNameKnown)({ type: "group" }));
    });
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiaXNDb252ZXJzYXRpb25OYW1lS25vd25fdGVzdC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyBhc3NlcnQgfSBmcm9tICdjaGFpJztcblxuaW1wb3J0IHsgaXNDb252ZXJzYXRpb25OYW1lS25vd24gfSBmcm9tICcuLi8uLi91dGlsL2lzQ29udmVyc2F0aW9uTmFtZUtub3duJztcblxuZGVzY3JpYmUoJ2lzQ29udmVyc2F0aW9uTmFtZUtub3duJywgKCkgPT4ge1xuICBkZXNjcmliZSgnZm9yIGRpcmVjdCBjb252ZXJzYXRpb25zJywgKCkgPT4ge1xuICAgIGl0KCdyZXR1cm5zIHRydWUgaWYgdGhlIGNvbnZlcnNhdGlvbiBoYXMgYSBuYW1lJywgKCkgPT4ge1xuICAgICAgYXNzZXJ0LmlzVHJ1ZShcbiAgICAgICAgaXNDb252ZXJzYXRpb25OYW1lS25vd24oe1xuICAgICAgICAgIHR5cGU6ICdkaXJlY3QnLFxuICAgICAgICAgIG5hbWU6ICdKYW5lIERvZScsXG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgdHJ1ZSBpZiB0aGUgY29udmVyc2F0aW9uIGhhcyBhIHByb2ZpbGUgbmFtZScsICgpID0+IHtcbiAgICAgIGFzc2VydC5pc1RydWUoXG4gICAgICAgIGlzQ29udmVyc2F0aW9uTmFtZUtub3duKHtcbiAgICAgICAgICB0eXBlOiAnZGlyZWN0JyxcbiAgICAgICAgICBwcm9maWxlTmFtZTogJ0phbmUgRG9lJyxcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyB0cnVlIGlmIHRoZSBjb252ZXJzYXRpb24gaGFzIGFuIEUxNjQnLCAoKSA9PiB7XG4gICAgICBhc3NlcnQuaXNUcnVlKFxuICAgICAgICBpc0NvbnZlcnNhdGlvbk5hbWVLbm93bih7XG4gICAgICAgICAgdHlwZTogJ2RpcmVjdCcsXG4gICAgICAgICAgZTE2NDogJysxNjUwNTU1MTIzNCcsXG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgZmFsc2UgaWYgdGhlIGNvbnZlcnNhdGlvbiBoYXMgbm9uZSBvZiB0aGUgYWJvdmUnLCAoKSA9PiB7XG4gICAgICBhc3NlcnQuaXNGYWxzZShpc0NvbnZlcnNhdGlvbk5hbWVLbm93bih7IHR5cGU6ICdkaXJlY3QnIH0pKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ2ZvciBncm91cCBjb252ZXJzYXRpb25zJywgKCkgPT4ge1xuICAgIGl0KCdyZXR1cm5zIHRydWUgaWYgdGhlIGNvbnZlcnNhdGlvbiBoYXMgYSBuYW1lJywgKCkgPT4ge1xuICAgICAgYXNzZXJ0LmlzVHJ1ZShcbiAgICAgICAgaXNDb252ZXJzYXRpb25OYW1lS25vd24oe1xuICAgICAgICAgIHR5cGU6ICdncm91cCcsXG4gICAgICAgICAgbmFtZTogJ1RhaG9lIFRyaXAnLFxuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIHRydWUgaWYgdGhlIGNvbnZlcnNhdGlvbiBsYWNrcyBhIG5hbWUnLCAoKSA9PiB7XG4gICAgICBhc3NlcnQuaXNGYWxzZShpc0NvbnZlcnNhdGlvbk5hbWVLbm93bih7IHR5cGU6ICdncm91cCcgfSkpO1xuICAgIH0pO1xuICB9KTtcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIkFBR0Esa0JBQXVCO0FBRXZCLHFDQUF3QztBQUV4QyxTQUFTLDJCQUEyQixNQUFNO0FBQ3hDLFdBQVMsNEJBQTRCLE1BQU07QUFDekMsT0FBRywrQ0FBK0MsTUFBTTtBQUN0RCx5QkFBTyxPQUNMLDREQUF3QjtBQUFBLFFBQ3RCLE1BQU07QUFBQSxRQUNOLE1BQU07QUFBQSxNQUNSLENBQUMsQ0FDSDtBQUFBLElBQ0YsQ0FBQztBQUVELE9BQUcsdURBQXVELE1BQU07QUFDOUQseUJBQU8sT0FDTCw0REFBd0I7QUFBQSxRQUN0QixNQUFNO0FBQUEsUUFDTixhQUFhO0FBQUEsTUFDZixDQUFDLENBQ0g7QUFBQSxJQUNGLENBQUM7QUFFRCxPQUFHLGdEQUFnRCxNQUFNO0FBQ3ZELHlCQUFPLE9BQ0wsNERBQXdCO0FBQUEsUUFDdEIsTUFBTTtBQUFBLFFBQ04sTUFBTTtBQUFBLE1BQ1IsQ0FBQyxDQUNIO0FBQUEsSUFDRixDQUFDO0FBRUQsT0FBRywyREFBMkQsTUFBTTtBQUNsRSx5QkFBTyxRQUFRLDREQUF3QixFQUFFLE1BQU0sU0FBUyxDQUFDLENBQUM7QUFBQSxJQUM1RCxDQUFDO0FBQUEsRUFDSCxDQUFDO0FBRUQsV0FBUywyQkFBMkIsTUFBTTtBQUN4QyxPQUFHLCtDQUErQyxNQUFNO0FBQ3RELHlCQUFPLE9BQ0wsNERBQXdCO0FBQUEsUUFDdEIsTUFBTTtBQUFBLFFBQ04sTUFBTTtBQUFBLE1BQ1IsQ0FBQyxDQUNIO0FBQUEsSUFDRixDQUFDO0FBRUQsT0FBRyxpREFBaUQsTUFBTTtBQUN4RCx5QkFBTyxRQUFRLDREQUF3QixFQUFFLE1BQU0sUUFBUSxDQUFDLENBQUM7QUFBQSxJQUMzRCxDQUFDO0FBQUEsRUFDSCxDQUFDO0FBQ0gsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
