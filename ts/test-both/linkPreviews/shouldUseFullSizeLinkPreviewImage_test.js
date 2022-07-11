var import_chai = require("chai");
var import_MIME = require("../../types/MIME");
var import_fakeAttachment = require("../helpers/fakeAttachment");
var import_shouldUseFullSizeLinkPreviewImage = require("../../linkPreviews/shouldUseFullSizeLinkPreviewImage");
describe("shouldUseFullSizeLinkPreviewImage", () => {
  const baseLinkPreview = {
    title: "Foo Bar",
    domain: "example.com",
    url: "https://example.com/foo.html",
    isStickerPack: false
  };
  it("returns false if there is no image", () => {
    import_chai.assert.isFalse((0, import_shouldUseFullSizeLinkPreviewImage.shouldUseFullSizeLinkPreviewImage)({
      ...baseLinkPreview
    }));
  });
  it("returns false is the preview is a sticker pack", () => {
    import_chai.assert.isFalse((0, import_shouldUseFullSizeLinkPreviewImage.shouldUseFullSizeLinkPreviewImage)({
      ...baseLinkPreview,
      isStickerPack: true,
      image: (0, import_fakeAttachment.fakeAttachment)()
    }));
  });
  it("returns false if either of the image's dimensions are missing", () => {
    import_chai.assert.isFalse((0, import_shouldUseFullSizeLinkPreviewImage.shouldUseFullSizeLinkPreviewImage)({
      ...baseLinkPreview,
      image: (0, import_fakeAttachment.fakeAttachment)({ width: void 0 })
    }));
    import_chai.assert.isFalse((0, import_shouldUseFullSizeLinkPreviewImage.shouldUseFullSizeLinkPreviewImage)({
      ...baseLinkPreview,
      image: (0, import_fakeAttachment.fakeAttachment)({ height: void 0 })
    }));
    import_chai.assert.isFalse((0, import_shouldUseFullSizeLinkPreviewImage.shouldUseFullSizeLinkPreviewImage)({
      ...baseLinkPreview,
      image: (0, import_fakeAttachment.fakeAttachment)({ width: void 0, height: void 0 })
    }));
  });
  it("returns false if either of the image's dimensions are <200px", () => {
    import_chai.assert.isFalse((0, import_shouldUseFullSizeLinkPreviewImage.shouldUseFullSizeLinkPreviewImage)({
      ...baseLinkPreview,
      image: (0, import_fakeAttachment.fakeAttachment)({ width: 199 })
    }));
    import_chai.assert.isFalse((0, import_shouldUseFullSizeLinkPreviewImage.shouldUseFullSizeLinkPreviewImage)({
      ...baseLinkPreview,
      image: (0, import_fakeAttachment.fakeAttachment)({ height: 199 })
    }));
    import_chai.assert.isFalse((0, import_shouldUseFullSizeLinkPreviewImage.shouldUseFullSizeLinkPreviewImage)({
      ...baseLinkPreview,
      image: (0, import_fakeAttachment.fakeAttachment)({ width: 150, height: 199 })
    }));
  });
  it("returns false if the image is square", () => {
    import_chai.assert.isFalse((0, import_shouldUseFullSizeLinkPreviewImage.shouldUseFullSizeLinkPreviewImage)({
      ...baseLinkPreview,
      image: (0, import_fakeAttachment.fakeAttachment)({ width: 200, height: 200 })
    }));
    import_chai.assert.isFalse((0, import_shouldUseFullSizeLinkPreviewImage.shouldUseFullSizeLinkPreviewImage)({
      ...baseLinkPreview,
      image: (0, import_fakeAttachment.fakeAttachment)({ width: 500, height: 500 })
    }));
  });
  it("returns false if the image is roughly square", () => {
    import_chai.assert.isFalse((0, import_shouldUseFullSizeLinkPreviewImage.shouldUseFullSizeLinkPreviewImage)({
      ...baseLinkPreview,
      image: (0, import_fakeAttachment.fakeAttachment)({ width: 200, height: 201 })
    }));
    import_chai.assert.isFalse((0, import_shouldUseFullSizeLinkPreviewImage.shouldUseFullSizeLinkPreviewImage)({
      ...baseLinkPreview,
      image: (0, import_fakeAttachment.fakeAttachment)({ width: 497, height: 501 })
    }));
  });
  it("returns false for large attachments that aren't images", () => {
    import_chai.assert.isFalse((0, import_shouldUseFullSizeLinkPreviewImage.shouldUseFullSizeLinkPreviewImage)({
      ...baseLinkPreview,
      image: (0, import_fakeAttachment.fakeAttachment)({
        contentType: import_MIME.VIDEO_MP4,
        fileName: "foo.mp4",
        url: "/tmp/foo.mp4"
      })
    }));
  });
  it("returns true for larger images", () => {
    import_chai.assert.isTrue((0, import_shouldUseFullSizeLinkPreviewImage.shouldUseFullSizeLinkPreviewImage)({
      ...baseLinkPreview,
      image: (0, import_fakeAttachment.fakeAttachment)({ width: 200, height: 500 })
    }));
    import_chai.assert.isTrue((0, import_shouldUseFullSizeLinkPreviewImage.shouldUseFullSizeLinkPreviewImage)({
      ...baseLinkPreview,
      image: (0, import_fakeAttachment.fakeAttachment)()
    }));
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic2hvdWxkVXNlRnVsbFNpemVMaW5rUHJldmlld0ltYWdlX3Rlc3QudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSAnY2hhaSc7XG5pbXBvcnQgeyBWSURFT19NUDQgfSBmcm9tICcuLi8uLi90eXBlcy9NSU1FJztcblxuaW1wb3J0IHsgZmFrZUF0dGFjaG1lbnQgfSBmcm9tICcuLi9oZWxwZXJzL2Zha2VBdHRhY2htZW50JztcblxuaW1wb3J0IHsgc2hvdWxkVXNlRnVsbFNpemVMaW5rUHJldmlld0ltYWdlIH0gZnJvbSAnLi4vLi4vbGlua1ByZXZpZXdzL3Nob3VsZFVzZUZ1bGxTaXplTGlua1ByZXZpZXdJbWFnZSc7XG5cbmRlc2NyaWJlKCdzaG91bGRVc2VGdWxsU2l6ZUxpbmtQcmV2aWV3SW1hZ2UnLCAoKSA9PiB7XG4gIGNvbnN0IGJhc2VMaW5rUHJldmlldyA9IHtcbiAgICB0aXRsZTogJ0ZvbyBCYXInLFxuICAgIGRvbWFpbjogJ2V4YW1wbGUuY29tJyxcbiAgICB1cmw6ICdodHRwczovL2V4YW1wbGUuY29tL2Zvby5odG1sJyxcbiAgICBpc1N0aWNrZXJQYWNrOiBmYWxzZSxcbiAgfTtcblxuICBpdCgncmV0dXJucyBmYWxzZSBpZiB0aGVyZSBpcyBubyBpbWFnZScsICgpID0+IHtcbiAgICBhc3NlcnQuaXNGYWxzZShcbiAgICAgIHNob3VsZFVzZUZ1bGxTaXplTGlua1ByZXZpZXdJbWFnZSh7XG4gICAgICAgIC4uLmJhc2VMaW5rUHJldmlldyxcbiAgICAgIH0pXG4gICAgKTtcbiAgfSk7XG5cbiAgaXQoJ3JldHVybnMgZmFsc2UgaXMgdGhlIHByZXZpZXcgaXMgYSBzdGlja2VyIHBhY2snLCAoKSA9PiB7XG4gICAgYXNzZXJ0LmlzRmFsc2UoXG4gICAgICBzaG91bGRVc2VGdWxsU2l6ZUxpbmtQcmV2aWV3SW1hZ2Uoe1xuICAgICAgICAuLi5iYXNlTGlua1ByZXZpZXcsXG4gICAgICAgIGlzU3RpY2tlclBhY2s6IHRydWUsXG4gICAgICAgIGltYWdlOiBmYWtlQXR0YWNobWVudCgpLFxuICAgICAgfSlcbiAgICApO1xuICB9KTtcblxuICBpdChcInJldHVybnMgZmFsc2UgaWYgZWl0aGVyIG9mIHRoZSBpbWFnZSdzIGRpbWVuc2lvbnMgYXJlIG1pc3NpbmdcIiwgKCkgPT4ge1xuICAgIGFzc2VydC5pc0ZhbHNlKFxuICAgICAgc2hvdWxkVXNlRnVsbFNpemVMaW5rUHJldmlld0ltYWdlKHtcbiAgICAgICAgLi4uYmFzZUxpbmtQcmV2aWV3LFxuICAgICAgICBpbWFnZTogZmFrZUF0dGFjaG1lbnQoeyB3aWR0aDogdW5kZWZpbmVkIH0pLFxuICAgICAgfSlcbiAgICApO1xuICAgIGFzc2VydC5pc0ZhbHNlKFxuICAgICAgc2hvdWxkVXNlRnVsbFNpemVMaW5rUHJldmlld0ltYWdlKHtcbiAgICAgICAgLi4uYmFzZUxpbmtQcmV2aWV3LFxuICAgICAgICBpbWFnZTogZmFrZUF0dGFjaG1lbnQoeyBoZWlnaHQ6IHVuZGVmaW5lZCB9KSxcbiAgICAgIH0pXG4gICAgKTtcbiAgICBhc3NlcnQuaXNGYWxzZShcbiAgICAgIHNob3VsZFVzZUZ1bGxTaXplTGlua1ByZXZpZXdJbWFnZSh7XG4gICAgICAgIC4uLmJhc2VMaW5rUHJldmlldyxcbiAgICAgICAgaW1hZ2U6IGZha2VBdHRhY2htZW50KHsgd2lkdGg6IHVuZGVmaW5lZCwgaGVpZ2h0OiB1bmRlZmluZWQgfSksXG4gICAgICB9KVxuICAgICk7XG4gIH0pO1xuXG4gIGl0KFwicmV0dXJucyBmYWxzZSBpZiBlaXRoZXIgb2YgdGhlIGltYWdlJ3MgZGltZW5zaW9ucyBhcmUgPDIwMHB4XCIsICgpID0+IHtcbiAgICBhc3NlcnQuaXNGYWxzZShcbiAgICAgIHNob3VsZFVzZUZ1bGxTaXplTGlua1ByZXZpZXdJbWFnZSh7XG4gICAgICAgIC4uLmJhc2VMaW5rUHJldmlldyxcbiAgICAgICAgaW1hZ2U6IGZha2VBdHRhY2htZW50KHsgd2lkdGg6IDE5OSB9KSxcbiAgICAgIH0pXG4gICAgKTtcbiAgICBhc3NlcnQuaXNGYWxzZShcbiAgICAgIHNob3VsZFVzZUZ1bGxTaXplTGlua1ByZXZpZXdJbWFnZSh7XG4gICAgICAgIC4uLmJhc2VMaW5rUHJldmlldyxcbiAgICAgICAgaW1hZ2U6IGZha2VBdHRhY2htZW50KHsgaGVpZ2h0OiAxOTkgfSksXG4gICAgICB9KVxuICAgICk7XG4gICAgYXNzZXJ0LmlzRmFsc2UoXG4gICAgICBzaG91bGRVc2VGdWxsU2l6ZUxpbmtQcmV2aWV3SW1hZ2Uoe1xuICAgICAgICAuLi5iYXNlTGlua1ByZXZpZXcsXG4gICAgICAgIGltYWdlOiBmYWtlQXR0YWNobWVudCh7IHdpZHRoOiAxNTAsIGhlaWdodDogMTk5IH0pLFxuICAgICAgfSlcbiAgICApO1xuICB9KTtcblxuICBpdCgncmV0dXJucyBmYWxzZSBpZiB0aGUgaW1hZ2UgaXMgc3F1YXJlJywgKCkgPT4ge1xuICAgIGFzc2VydC5pc0ZhbHNlKFxuICAgICAgc2hvdWxkVXNlRnVsbFNpemVMaW5rUHJldmlld0ltYWdlKHtcbiAgICAgICAgLi4uYmFzZUxpbmtQcmV2aWV3LFxuICAgICAgICBpbWFnZTogZmFrZUF0dGFjaG1lbnQoeyB3aWR0aDogMjAwLCBoZWlnaHQ6IDIwMCB9KSxcbiAgICAgIH0pXG4gICAgKTtcbiAgICBhc3NlcnQuaXNGYWxzZShcbiAgICAgIHNob3VsZFVzZUZ1bGxTaXplTGlua1ByZXZpZXdJbWFnZSh7XG4gICAgICAgIC4uLmJhc2VMaW5rUHJldmlldyxcbiAgICAgICAgaW1hZ2U6IGZha2VBdHRhY2htZW50KHsgd2lkdGg6IDUwMCwgaGVpZ2h0OiA1MDAgfSksXG4gICAgICB9KVxuICAgICk7XG4gIH0pO1xuXG4gIGl0KCdyZXR1cm5zIGZhbHNlIGlmIHRoZSBpbWFnZSBpcyByb3VnaGx5IHNxdWFyZScsICgpID0+IHtcbiAgICBhc3NlcnQuaXNGYWxzZShcbiAgICAgIHNob3VsZFVzZUZ1bGxTaXplTGlua1ByZXZpZXdJbWFnZSh7XG4gICAgICAgIC4uLmJhc2VMaW5rUHJldmlldyxcbiAgICAgICAgaW1hZ2U6IGZha2VBdHRhY2htZW50KHsgd2lkdGg6IDIwMCwgaGVpZ2h0OiAyMDEgfSksXG4gICAgICB9KVxuICAgICk7XG4gICAgYXNzZXJ0LmlzRmFsc2UoXG4gICAgICBzaG91bGRVc2VGdWxsU2l6ZUxpbmtQcmV2aWV3SW1hZ2Uoe1xuICAgICAgICAuLi5iYXNlTGlua1ByZXZpZXcsXG4gICAgICAgIGltYWdlOiBmYWtlQXR0YWNobWVudCh7IHdpZHRoOiA0OTcsIGhlaWdodDogNTAxIH0pLFxuICAgICAgfSlcbiAgICApO1xuICB9KTtcblxuICBpdChcInJldHVybnMgZmFsc2UgZm9yIGxhcmdlIGF0dGFjaG1lbnRzIHRoYXQgYXJlbid0IGltYWdlc1wiLCAoKSA9PiB7XG4gICAgYXNzZXJ0LmlzRmFsc2UoXG4gICAgICBzaG91bGRVc2VGdWxsU2l6ZUxpbmtQcmV2aWV3SW1hZ2Uoe1xuICAgICAgICAuLi5iYXNlTGlua1ByZXZpZXcsXG4gICAgICAgIGltYWdlOiBmYWtlQXR0YWNobWVudCh7XG4gICAgICAgICAgY29udGVudFR5cGU6IFZJREVPX01QNCxcbiAgICAgICAgICBmaWxlTmFtZTogJ2Zvby5tcDQnLFxuICAgICAgICAgIHVybDogJy90bXAvZm9vLm1wNCcsXG4gICAgICAgIH0pLFxuICAgICAgfSlcbiAgICApO1xuICB9KTtcblxuICBpdCgncmV0dXJucyB0cnVlIGZvciBsYXJnZXIgaW1hZ2VzJywgKCkgPT4ge1xuICAgIGFzc2VydC5pc1RydWUoXG4gICAgICBzaG91bGRVc2VGdWxsU2l6ZUxpbmtQcmV2aWV3SW1hZ2Uoe1xuICAgICAgICAuLi5iYXNlTGlua1ByZXZpZXcsXG4gICAgICAgIGltYWdlOiBmYWtlQXR0YWNobWVudCh7IHdpZHRoOiAyMDAsIGhlaWdodDogNTAwIH0pLFxuICAgICAgfSlcbiAgICApO1xuICAgIGFzc2VydC5pc1RydWUoXG4gICAgICBzaG91bGRVc2VGdWxsU2l6ZUxpbmtQcmV2aWV3SW1hZ2Uoe1xuICAgICAgICAuLi5iYXNlTGlua1ByZXZpZXcsXG4gICAgICAgIGltYWdlOiBmYWtlQXR0YWNobWVudCgpLFxuICAgICAgfSlcbiAgICApO1xuICB9KTtcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIkFBR0Esa0JBQXVCO0FBQ3ZCLGtCQUEwQjtBQUUxQiw0QkFBK0I7QUFFL0IsK0NBQWtEO0FBRWxELFNBQVMscUNBQXFDLE1BQU07QUFDbEQsUUFBTSxrQkFBa0I7QUFBQSxJQUN0QixPQUFPO0FBQUEsSUFDUCxRQUFRO0FBQUEsSUFDUixLQUFLO0FBQUEsSUFDTCxlQUFlO0FBQUEsRUFDakI7QUFFQSxLQUFHLHNDQUFzQyxNQUFNO0FBQzdDLHVCQUFPLFFBQ0wsZ0ZBQWtDO0FBQUEsU0FDN0I7QUFBQSxJQUNMLENBQUMsQ0FDSDtBQUFBLEVBQ0YsQ0FBQztBQUVELEtBQUcsa0RBQWtELE1BQU07QUFDekQsdUJBQU8sUUFDTCxnRkFBa0M7QUFBQSxTQUM3QjtBQUFBLE1BQ0gsZUFBZTtBQUFBLE1BQ2YsT0FBTywwQ0FBZTtBQUFBLElBQ3hCLENBQUMsQ0FDSDtBQUFBLEVBQ0YsQ0FBQztBQUVELEtBQUcsaUVBQWlFLE1BQU07QUFDeEUsdUJBQU8sUUFDTCxnRkFBa0M7QUFBQSxTQUM3QjtBQUFBLE1BQ0gsT0FBTywwQ0FBZSxFQUFFLE9BQU8sT0FBVSxDQUFDO0FBQUEsSUFDNUMsQ0FBQyxDQUNIO0FBQ0EsdUJBQU8sUUFDTCxnRkFBa0M7QUFBQSxTQUM3QjtBQUFBLE1BQ0gsT0FBTywwQ0FBZSxFQUFFLFFBQVEsT0FBVSxDQUFDO0FBQUEsSUFDN0MsQ0FBQyxDQUNIO0FBQ0EsdUJBQU8sUUFDTCxnRkFBa0M7QUFBQSxTQUM3QjtBQUFBLE1BQ0gsT0FBTywwQ0FBZSxFQUFFLE9BQU8sUUFBVyxRQUFRLE9BQVUsQ0FBQztBQUFBLElBQy9ELENBQUMsQ0FDSDtBQUFBLEVBQ0YsQ0FBQztBQUVELEtBQUcsZ0VBQWdFLE1BQU07QUFDdkUsdUJBQU8sUUFDTCxnRkFBa0M7QUFBQSxTQUM3QjtBQUFBLE1BQ0gsT0FBTywwQ0FBZSxFQUFFLE9BQU8sSUFBSSxDQUFDO0FBQUEsSUFDdEMsQ0FBQyxDQUNIO0FBQ0EsdUJBQU8sUUFDTCxnRkFBa0M7QUFBQSxTQUM3QjtBQUFBLE1BQ0gsT0FBTywwQ0FBZSxFQUFFLFFBQVEsSUFBSSxDQUFDO0FBQUEsSUFDdkMsQ0FBQyxDQUNIO0FBQ0EsdUJBQU8sUUFDTCxnRkFBa0M7QUFBQSxTQUM3QjtBQUFBLE1BQ0gsT0FBTywwQ0FBZSxFQUFFLE9BQU8sS0FBSyxRQUFRLElBQUksQ0FBQztBQUFBLElBQ25ELENBQUMsQ0FDSDtBQUFBLEVBQ0YsQ0FBQztBQUVELEtBQUcsd0NBQXdDLE1BQU07QUFDL0MsdUJBQU8sUUFDTCxnRkFBa0M7QUFBQSxTQUM3QjtBQUFBLE1BQ0gsT0FBTywwQ0FBZSxFQUFFLE9BQU8sS0FBSyxRQUFRLElBQUksQ0FBQztBQUFBLElBQ25ELENBQUMsQ0FDSDtBQUNBLHVCQUFPLFFBQ0wsZ0ZBQWtDO0FBQUEsU0FDN0I7QUFBQSxNQUNILE9BQU8sMENBQWUsRUFBRSxPQUFPLEtBQUssUUFBUSxJQUFJLENBQUM7QUFBQSxJQUNuRCxDQUFDLENBQ0g7QUFBQSxFQUNGLENBQUM7QUFFRCxLQUFHLGdEQUFnRCxNQUFNO0FBQ3ZELHVCQUFPLFFBQ0wsZ0ZBQWtDO0FBQUEsU0FDN0I7QUFBQSxNQUNILE9BQU8sMENBQWUsRUFBRSxPQUFPLEtBQUssUUFBUSxJQUFJLENBQUM7QUFBQSxJQUNuRCxDQUFDLENBQ0g7QUFDQSx1QkFBTyxRQUNMLGdGQUFrQztBQUFBLFNBQzdCO0FBQUEsTUFDSCxPQUFPLDBDQUFlLEVBQUUsT0FBTyxLQUFLLFFBQVEsSUFBSSxDQUFDO0FBQUEsSUFDbkQsQ0FBQyxDQUNIO0FBQUEsRUFDRixDQUFDO0FBRUQsS0FBRywwREFBMEQsTUFBTTtBQUNqRSx1QkFBTyxRQUNMLGdGQUFrQztBQUFBLFNBQzdCO0FBQUEsTUFDSCxPQUFPLDBDQUFlO0FBQUEsUUFDcEIsYUFBYTtBQUFBLFFBQ2IsVUFBVTtBQUFBLFFBQ1YsS0FBSztBQUFBLE1BQ1AsQ0FBQztBQUFBLElBQ0gsQ0FBQyxDQUNIO0FBQUEsRUFDRixDQUFDO0FBRUQsS0FBRyxrQ0FBa0MsTUFBTTtBQUN6Qyx1QkFBTyxPQUNMLGdGQUFrQztBQUFBLFNBQzdCO0FBQUEsTUFDSCxPQUFPLDBDQUFlLEVBQUUsT0FBTyxLQUFLLFFBQVEsSUFBSSxDQUFDO0FBQUEsSUFDbkQsQ0FBQyxDQUNIO0FBQ0EsdUJBQU8sT0FDTCxnRkFBa0M7QUFBQSxTQUM3QjtBQUFBLE1BQ0gsT0FBTywwQ0FBZTtBQUFBLElBQ3hCLENBQUMsQ0FDSDtBQUFBLEVBQ0YsQ0FBQztBQUNILENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
