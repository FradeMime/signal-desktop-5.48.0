var import_chai = require("chai");
var import_shouldBlurAvatar = require("../../util/shouldBlurAvatar");
describe("shouldBlurAvatar", () => {
  it("returns false for me", () => {
    import_chai.assert.isFalse((0, import_shouldBlurAvatar.shouldBlurAvatar)({
      isMe: true,
      acceptedMessageRequest: false,
      avatarPath: "/path/to/avatar.jpg",
      sharedGroupNames: [],
      unblurredAvatarPath: void 0
    }));
  });
  it("returns false if the message request has been accepted", () => {
    import_chai.assert.isFalse((0, import_shouldBlurAvatar.shouldBlurAvatar)({
      acceptedMessageRequest: true,
      avatarPath: "/path/to/avatar.jpg",
      isMe: false,
      sharedGroupNames: [],
      unblurredAvatarPath: void 0
    }));
  });
  it("returns false if there are any shared groups", () => {
    import_chai.assert.isFalse((0, import_shouldBlurAvatar.shouldBlurAvatar)({
      sharedGroupNames: ["Tahoe Trip"],
      acceptedMessageRequest: false,
      avatarPath: "/path/to/avatar.jpg",
      isMe: false,
      unblurredAvatarPath: void 0
    }));
  });
  it("returns false if there is no avatar", () => {
    import_chai.assert.isFalse((0, import_shouldBlurAvatar.shouldBlurAvatar)({
      acceptedMessageRequest: false,
      isMe: false,
      sharedGroupNames: [],
      unblurredAvatarPath: void 0
    }));
    import_chai.assert.isFalse((0, import_shouldBlurAvatar.shouldBlurAvatar)({
      avatarPath: void 0,
      acceptedMessageRequest: false,
      isMe: false,
      sharedGroupNames: [],
      unblurredAvatarPath: void 0
    }));
    import_chai.assert.isFalse((0, import_shouldBlurAvatar.shouldBlurAvatar)({
      avatarPath: void 0,
      unblurredAvatarPath: "/some/other/path",
      acceptedMessageRequest: false,
      isMe: false,
      sharedGroupNames: []
    }));
  });
  it("returns false if the avatar was unblurred", () => {
    import_chai.assert.isFalse((0, import_shouldBlurAvatar.shouldBlurAvatar)({
      avatarPath: "/path/to/avatar.jpg",
      unblurredAvatarPath: "/path/to/avatar.jpg",
      acceptedMessageRequest: false,
      isMe: false,
      sharedGroupNames: []
    }));
  });
  it("returns true if the stars align (i.e., not everything above)", () => {
    import_chai.assert.isTrue((0, import_shouldBlurAvatar.shouldBlurAvatar)({
      avatarPath: "/path/to/avatar.jpg",
      unblurredAvatarPath: "/different/path.jpg",
      acceptedMessageRequest: false,
      isMe: false,
      sharedGroupNames: []
    }));
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic2hvdWxkQmx1ckF2YXRhcl90ZXN0LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IGFzc2VydCB9IGZyb20gJ2NoYWknO1xuXG5pbXBvcnQgeyBzaG91bGRCbHVyQXZhdGFyIH0gZnJvbSAnLi4vLi4vdXRpbC9zaG91bGRCbHVyQXZhdGFyJztcblxuZGVzY3JpYmUoJ3Nob3VsZEJsdXJBdmF0YXInLCAoKSA9PiB7XG4gIGl0KCdyZXR1cm5zIGZhbHNlIGZvciBtZScsICgpID0+IHtcbiAgICBhc3NlcnQuaXNGYWxzZShcbiAgICAgIHNob3VsZEJsdXJBdmF0YXIoe1xuICAgICAgICBpc01lOiB0cnVlLFxuICAgICAgICBhY2NlcHRlZE1lc3NhZ2VSZXF1ZXN0OiBmYWxzZSxcbiAgICAgICAgYXZhdGFyUGF0aDogJy9wYXRoL3RvL2F2YXRhci5qcGcnLFxuICAgICAgICBzaGFyZWRHcm91cE5hbWVzOiBbXSxcbiAgICAgICAgdW5ibHVycmVkQXZhdGFyUGF0aDogdW5kZWZpbmVkLFxuICAgICAgfSlcbiAgICApO1xuICB9KTtcblxuICBpdCgncmV0dXJucyBmYWxzZSBpZiB0aGUgbWVzc2FnZSByZXF1ZXN0IGhhcyBiZWVuIGFjY2VwdGVkJywgKCkgPT4ge1xuICAgIGFzc2VydC5pc0ZhbHNlKFxuICAgICAgc2hvdWxkQmx1ckF2YXRhcih7XG4gICAgICAgIGFjY2VwdGVkTWVzc2FnZVJlcXVlc3Q6IHRydWUsXG4gICAgICAgIGF2YXRhclBhdGg6ICcvcGF0aC90by9hdmF0YXIuanBnJyxcbiAgICAgICAgaXNNZTogZmFsc2UsXG4gICAgICAgIHNoYXJlZEdyb3VwTmFtZXM6IFtdLFxuICAgICAgICB1bmJsdXJyZWRBdmF0YXJQYXRoOiB1bmRlZmluZWQsXG4gICAgICB9KVxuICAgICk7XG4gIH0pO1xuXG4gIGl0KCdyZXR1cm5zIGZhbHNlIGlmIHRoZXJlIGFyZSBhbnkgc2hhcmVkIGdyb3VwcycsICgpID0+IHtcbiAgICBhc3NlcnQuaXNGYWxzZShcbiAgICAgIHNob3VsZEJsdXJBdmF0YXIoe1xuICAgICAgICBzaGFyZWRHcm91cE5hbWVzOiBbJ1RhaG9lIFRyaXAnXSxcbiAgICAgICAgYWNjZXB0ZWRNZXNzYWdlUmVxdWVzdDogZmFsc2UsXG4gICAgICAgIGF2YXRhclBhdGg6ICcvcGF0aC90by9hdmF0YXIuanBnJyxcbiAgICAgICAgaXNNZTogZmFsc2UsXG4gICAgICAgIHVuYmx1cnJlZEF2YXRhclBhdGg6IHVuZGVmaW5lZCxcbiAgICAgIH0pXG4gICAgKTtcbiAgfSk7XG5cbiAgaXQoJ3JldHVybnMgZmFsc2UgaWYgdGhlcmUgaXMgbm8gYXZhdGFyJywgKCkgPT4ge1xuICAgIGFzc2VydC5pc0ZhbHNlKFxuICAgICAgc2hvdWxkQmx1ckF2YXRhcih7XG4gICAgICAgIGFjY2VwdGVkTWVzc2FnZVJlcXVlc3Q6IGZhbHNlLFxuICAgICAgICBpc01lOiBmYWxzZSxcbiAgICAgICAgc2hhcmVkR3JvdXBOYW1lczogW10sXG4gICAgICAgIHVuYmx1cnJlZEF2YXRhclBhdGg6IHVuZGVmaW5lZCxcbiAgICAgIH0pXG4gICAgKTtcbiAgICBhc3NlcnQuaXNGYWxzZShcbiAgICAgIHNob3VsZEJsdXJBdmF0YXIoe1xuICAgICAgICBhdmF0YXJQYXRoOiB1bmRlZmluZWQsXG4gICAgICAgIGFjY2VwdGVkTWVzc2FnZVJlcXVlc3Q6IGZhbHNlLFxuICAgICAgICBpc01lOiBmYWxzZSxcbiAgICAgICAgc2hhcmVkR3JvdXBOYW1lczogW10sXG4gICAgICAgIHVuYmx1cnJlZEF2YXRhclBhdGg6IHVuZGVmaW5lZCxcbiAgICAgIH0pXG4gICAgKTtcbiAgICBhc3NlcnQuaXNGYWxzZShcbiAgICAgIHNob3VsZEJsdXJBdmF0YXIoe1xuICAgICAgICBhdmF0YXJQYXRoOiB1bmRlZmluZWQsXG4gICAgICAgIHVuYmx1cnJlZEF2YXRhclBhdGg6ICcvc29tZS9vdGhlci9wYXRoJyxcbiAgICAgICAgYWNjZXB0ZWRNZXNzYWdlUmVxdWVzdDogZmFsc2UsXG4gICAgICAgIGlzTWU6IGZhbHNlLFxuICAgICAgICBzaGFyZWRHcm91cE5hbWVzOiBbXSxcbiAgICAgIH0pXG4gICAgKTtcbiAgfSk7XG5cbiAgaXQoJ3JldHVybnMgZmFsc2UgaWYgdGhlIGF2YXRhciB3YXMgdW5ibHVycmVkJywgKCkgPT4ge1xuICAgIGFzc2VydC5pc0ZhbHNlKFxuICAgICAgc2hvdWxkQmx1ckF2YXRhcih7XG4gICAgICAgIGF2YXRhclBhdGg6ICcvcGF0aC90by9hdmF0YXIuanBnJyxcbiAgICAgICAgdW5ibHVycmVkQXZhdGFyUGF0aDogJy9wYXRoL3RvL2F2YXRhci5qcGcnLFxuICAgICAgICBhY2NlcHRlZE1lc3NhZ2VSZXF1ZXN0OiBmYWxzZSxcbiAgICAgICAgaXNNZTogZmFsc2UsXG4gICAgICAgIHNoYXJlZEdyb3VwTmFtZXM6IFtdLFxuICAgICAgfSlcbiAgICApO1xuICB9KTtcblxuICBpdCgncmV0dXJucyB0cnVlIGlmIHRoZSBzdGFycyBhbGlnbiAoaS5lLiwgbm90IGV2ZXJ5dGhpbmcgYWJvdmUpJywgKCkgPT4ge1xuICAgIGFzc2VydC5pc1RydWUoXG4gICAgICBzaG91bGRCbHVyQXZhdGFyKHtcbiAgICAgICAgYXZhdGFyUGF0aDogJy9wYXRoL3RvL2F2YXRhci5qcGcnLFxuICAgICAgICB1bmJsdXJyZWRBdmF0YXJQYXRoOiAnL2RpZmZlcmVudC9wYXRoLmpwZycsXG4gICAgICAgIGFjY2VwdGVkTWVzc2FnZVJlcXVlc3Q6IGZhbHNlLFxuICAgICAgICBpc01lOiBmYWxzZSxcbiAgICAgICAgc2hhcmVkR3JvdXBOYW1lczogW10sXG4gICAgICB9KVxuICAgICk7XG4gIH0pO1xufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiQUFHQSxrQkFBdUI7QUFFdkIsOEJBQWlDO0FBRWpDLFNBQVMsb0JBQW9CLE1BQU07QUFDakMsS0FBRyx3QkFBd0IsTUFBTTtBQUMvQix1QkFBTyxRQUNMLDhDQUFpQjtBQUFBLE1BQ2YsTUFBTTtBQUFBLE1BQ04sd0JBQXdCO0FBQUEsTUFDeEIsWUFBWTtBQUFBLE1BQ1osa0JBQWtCLENBQUM7QUFBQSxNQUNuQixxQkFBcUI7QUFBQSxJQUN2QixDQUFDLENBQ0g7QUFBQSxFQUNGLENBQUM7QUFFRCxLQUFHLDBEQUEwRCxNQUFNO0FBQ2pFLHVCQUFPLFFBQ0wsOENBQWlCO0FBQUEsTUFDZix3QkFBd0I7QUFBQSxNQUN4QixZQUFZO0FBQUEsTUFDWixNQUFNO0FBQUEsTUFDTixrQkFBa0IsQ0FBQztBQUFBLE1BQ25CLHFCQUFxQjtBQUFBLElBQ3ZCLENBQUMsQ0FDSDtBQUFBLEVBQ0YsQ0FBQztBQUVELEtBQUcsZ0RBQWdELE1BQU07QUFDdkQsdUJBQU8sUUFDTCw4Q0FBaUI7QUFBQSxNQUNmLGtCQUFrQixDQUFDLFlBQVk7QUFBQSxNQUMvQix3QkFBd0I7QUFBQSxNQUN4QixZQUFZO0FBQUEsTUFDWixNQUFNO0FBQUEsTUFDTixxQkFBcUI7QUFBQSxJQUN2QixDQUFDLENBQ0g7QUFBQSxFQUNGLENBQUM7QUFFRCxLQUFHLHVDQUF1QyxNQUFNO0FBQzlDLHVCQUFPLFFBQ0wsOENBQWlCO0FBQUEsTUFDZix3QkFBd0I7QUFBQSxNQUN4QixNQUFNO0FBQUEsTUFDTixrQkFBa0IsQ0FBQztBQUFBLE1BQ25CLHFCQUFxQjtBQUFBLElBQ3ZCLENBQUMsQ0FDSDtBQUNBLHVCQUFPLFFBQ0wsOENBQWlCO0FBQUEsTUFDZixZQUFZO0FBQUEsTUFDWix3QkFBd0I7QUFBQSxNQUN4QixNQUFNO0FBQUEsTUFDTixrQkFBa0IsQ0FBQztBQUFBLE1BQ25CLHFCQUFxQjtBQUFBLElBQ3ZCLENBQUMsQ0FDSDtBQUNBLHVCQUFPLFFBQ0wsOENBQWlCO0FBQUEsTUFDZixZQUFZO0FBQUEsTUFDWixxQkFBcUI7QUFBQSxNQUNyQix3QkFBd0I7QUFBQSxNQUN4QixNQUFNO0FBQUEsTUFDTixrQkFBa0IsQ0FBQztBQUFBLElBQ3JCLENBQUMsQ0FDSDtBQUFBLEVBQ0YsQ0FBQztBQUVELEtBQUcsNkNBQTZDLE1BQU07QUFDcEQsdUJBQU8sUUFDTCw4Q0FBaUI7QUFBQSxNQUNmLFlBQVk7QUFBQSxNQUNaLHFCQUFxQjtBQUFBLE1BQ3JCLHdCQUF3QjtBQUFBLE1BQ3hCLE1BQU07QUFBQSxNQUNOLGtCQUFrQixDQUFDO0FBQUEsSUFDckIsQ0FBQyxDQUNIO0FBQUEsRUFDRixDQUFDO0FBRUQsS0FBRyxnRUFBZ0UsTUFBTTtBQUN2RSx1QkFBTyxPQUNMLDhDQUFpQjtBQUFBLE1BQ2YsWUFBWTtBQUFBLE1BQ1oscUJBQXFCO0FBQUEsTUFDckIsd0JBQXdCO0FBQUEsTUFDeEIsTUFBTTtBQUFBLE1BQ04sa0JBQWtCLENBQUM7QUFBQSxJQUNyQixDQUFDLENBQ0g7QUFBQSxFQUNGLENBQUM7QUFDSCxDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
