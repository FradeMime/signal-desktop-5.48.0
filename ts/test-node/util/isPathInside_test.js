var import_chai = require("chai");
var import_isPathInside = require("../../util/isPathInside");
describe("isPathInside", () => {
  it("returns false if the child path is not inside the parent path", () => {
    import_chai.assert.isFalse((0, import_isPathInside.isPathInside)("x", "a/b"));
    import_chai.assert.isFalse((0, import_isPathInside.isPathInside)("a/b", "/a/b"));
    import_chai.assert.isFalse((0, import_isPathInside.isPathInside)("/a/b", "a/b"));
    import_chai.assert.isFalse((0, import_isPathInside.isPathInside)("/x", "/a/b"));
    import_chai.assert.isFalse((0, import_isPathInside.isPathInside)("/x/y", "/a/b"));
    import_chai.assert.isFalse((0, import_isPathInside.isPathInside)("/a/x", "/a/b"));
    import_chai.assert.isFalse((0, import_isPathInside.isPathInside)("/a/bad", "/a/b"));
    import_chai.assert.isFalse((0, import_isPathInside.isPathInside)("/a/x", "/a/b"));
    import_chai.assert.isFalse((0, import_isPathInside.isPathInside)("/a/b", "/a/b"));
    import_chai.assert.isFalse((0, import_isPathInside.isPathInside)("/a/b/c/..", "/a/b"));
    import_chai.assert.isFalse((0, import_isPathInside.isPathInside)("/", "/"));
    import_chai.assert.isFalse((0, import_isPathInside.isPathInside)("/x/..", "/"));
    if (process.platform === "win32") {
      import_chai.assert.isFalse((0, import_isPathInside.isPathInside)("C:\\a\\x\\y", "C:\\a\\b"));
      import_chai.assert.isFalse((0, import_isPathInside.isPathInside)("D:\\a\\b\\c", "C:\\a\\b"));
    }
  });
  it("returns true if the child path is inside the parent path", () => {
    import_chai.assert.isTrue((0, import_isPathInside.isPathInside)("a/b/c", "a/b"));
    import_chai.assert.isTrue((0, import_isPathInside.isPathInside)("a/b/c/d", "a/b"));
    import_chai.assert.isTrue((0, import_isPathInside.isPathInside)("/a/b/c", "/a/b"));
    import_chai.assert.isTrue((0, import_isPathInside.isPathInside)("/a/b/c", "/a/b/"));
    import_chai.assert.isTrue((0, import_isPathInside.isPathInside)("/a/b/c/", "/a/b"));
    import_chai.assert.isTrue((0, import_isPathInside.isPathInside)("/a/b/c/", "/a/b/"));
    import_chai.assert.isTrue((0, import_isPathInside.isPathInside)("/a/b/c/d", "/a/b"));
    import_chai.assert.isTrue((0, import_isPathInside.isPathInside)("/a/b/c/d/..", "/a/b"));
    import_chai.assert.isTrue((0, import_isPathInside.isPathInside)("/x/y/z/z/y", "/"));
    import_chai.assert.isTrue((0, import_isPathInside.isPathInside)("x/y/z/z/y", "/"));
    if (process.platform === "win32") {
      import_chai.assert.isTrue((0, import_isPathInside.isPathInside)("C:\\a\\b\\c", "C:\\a\\b"));
    }
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiaXNQYXRoSW5zaWRlX3Rlc3QudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIwIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSAnY2hhaSc7XG5cbmltcG9ydCB7IGlzUGF0aEluc2lkZSB9IGZyb20gJy4uLy4uL3V0aWwvaXNQYXRoSW5zaWRlJztcblxuZGVzY3JpYmUoJ2lzUGF0aEluc2lkZScsICgpID0+IHtcbiAgaXQoJ3JldHVybnMgZmFsc2UgaWYgdGhlIGNoaWxkIHBhdGggaXMgbm90IGluc2lkZSB0aGUgcGFyZW50IHBhdGgnLCAoKSA9PiB7XG4gICAgYXNzZXJ0LmlzRmFsc2UoaXNQYXRoSW5zaWRlKCd4JywgJ2EvYicpKTtcbiAgICBhc3NlcnQuaXNGYWxzZShpc1BhdGhJbnNpZGUoJ2EvYicsICcvYS9iJykpO1xuICAgIGFzc2VydC5pc0ZhbHNlKGlzUGF0aEluc2lkZSgnL2EvYicsICdhL2InKSk7XG4gICAgYXNzZXJ0LmlzRmFsc2UoaXNQYXRoSW5zaWRlKCcveCcsICcvYS9iJykpO1xuICAgIGFzc2VydC5pc0ZhbHNlKGlzUGF0aEluc2lkZSgnL3gveScsICcvYS9iJykpO1xuICAgIGFzc2VydC5pc0ZhbHNlKGlzUGF0aEluc2lkZSgnL2EveCcsICcvYS9iJykpO1xuICAgIGFzc2VydC5pc0ZhbHNlKGlzUGF0aEluc2lkZSgnL2EvYmFkJywgJy9hL2InKSk7XG4gICAgYXNzZXJ0LmlzRmFsc2UoaXNQYXRoSW5zaWRlKCcvYS94JywgJy9hL2InKSk7XG4gICAgYXNzZXJ0LmlzRmFsc2UoaXNQYXRoSW5zaWRlKCcvYS9iJywgJy9hL2InKSk7XG4gICAgYXNzZXJ0LmlzRmFsc2UoaXNQYXRoSW5zaWRlKCcvYS9iL2MvLi4nLCAnL2EvYicpKTtcbiAgICBhc3NlcnQuaXNGYWxzZShpc1BhdGhJbnNpZGUoJy8nLCAnLycpKTtcbiAgICBhc3NlcnQuaXNGYWxzZShpc1BhdGhJbnNpZGUoJy94Ly4uJywgJy8nKSk7XG5cbiAgICBpZiAocHJvY2Vzcy5wbGF0Zm9ybSA9PT0gJ3dpbjMyJykge1xuICAgICAgYXNzZXJ0LmlzRmFsc2UoaXNQYXRoSW5zaWRlKCdDOlxcXFxhXFxcXHhcXFxceScsICdDOlxcXFxhXFxcXGInKSk7XG4gICAgICBhc3NlcnQuaXNGYWxzZShpc1BhdGhJbnNpZGUoJ0Q6XFxcXGFcXFxcYlxcXFxjJywgJ0M6XFxcXGFcXFxcYicpKTtcbiAgICB9XG4gIH0pO1xuXG4gIGl0KCdyZXR1cm5zIHRydWUgaWYgdGhlIGNoaWxkIHBhdGggaXMgaW5zaWRlIHRoZSBwYXJlbnQgcGF0aCcsICgpID0+IHtcbiAgICBhc3NlcnQuaXNUcnVlKGlzUGF0aEluc2lkZSgnYS9iL2MnLCAnYS9iJykpO1xuICAgIGFzc2VydC5pc1RydWUoaXNQYXRoSW5zaWRlKCdhL2IvYy9kJywgJ2EvYicpKTtcbiAgICBhc3NlcnQuaXNUcnVlKGlzUGF0aEluc2lkZSgnL2EvYi9jJywgJy9hL2InKSk7XG4gICAgYXNzZXJ0LmlzVHJ1ZShpc1BhdGhJbnNpZGUoJy9hL2IvYycsICcvYS9iLycpKTtcbiAgICBhc3NlcnQuaXNUcnVlKGlzUGF0aEluc2lkZSgnL2EvYi9jLycsICcvYS9iJykpO1xuICAgIGFzc2VydC5pc1RydWUoaXNQYXRoSW5zaWRlKCcvYS9iL2MvJywgJy9hL2IvJykpO1xuICAgIGFzc2VydC5pc1RydWUoaXNQYXRoSW5zaWRlKCcvYS9iL2MvZCcsICcvYS9iJykpO1xuICAgIGFzc2VydC5pc1RydWUoaXNQYXRoSW5zaWRlKCcvYS9iL2MvZC8uLicsICcvYS9iJykpO1xuICAgIGFzc2VydC5pc1RydWUoaXNQYXRoSW5zaWRlKCcveC95L3ovei95JywgJy8nKSk7XG4gICAgYXNzZXJ0LmlzVHJ1ZShpc1BhdGhJbnNpZGUoJ3gveS96L3oveScsICcvJykpO1xuXG4gICAgaWYgKHByb2Nlc3MucGxhdGZvcm0gPT09ICd3aW4zMicpIHtcbiAgICAgIGFzc2VydC5pc1RydWUoaXNQYXRoSW5zaWRlKCdDOlxcXFxhXFxcXGJcXFxcYycsICdDOlxcXFxhXFxcXGInKSk7XG4gICAgfVxuICB9KTtcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIkFBR0Esa0JBQXVCO0FBRXZCLDBCQUE2QjtBQUU3QixTQUFTLGdCQUFnQixNQUFNO0FBQzdCLEtBQUcsaUVBQWlFLE1BQU07QUFDeEUsdUJBQU8sUUFBUSxzQ0FBYSxLQUFLLEtBQUssQ0FBQztBQUN2Qyx1QkFBTyxRQUFRLHNDQUFhLE9BQU8sTUFBTSxDQUFDO0FBQzFDLHVCQUFPLFFBQVEsc0NBQWEsUUFBUSxLQUFLLENBQUM7QUFDMUMsdUJBQU8sUUFBUSxzQ0FBYSxNQUFNLE1BQU0sQ0FBQztBQUN6Qyx1QkFBTyxRQUFRLHNDQUFhLFFBQVEsTUFBTSxDQUFDO0FBQzNDLHVCQUFPLFFBQVEsc0NBQWEsUUFBUSxNQUFNLENBQUM7QUFDM0MsdUJBQU8sUUFBUSxzQ0FBYSxVQUFVLE1BQU0sQ0FBQztBQUM3Qyx1QkFBTyxRQUFRLHNDQUFhLFFBQVEsTUFBTSxDQUFDO0FBQzNDLHVCQUFPLFFBQVEsc0NBQWEsUUFBUSxNQUFNLENBQUM7QUFDM0MsdUJBQU8sUUFBUSxzQ0FBYSxhQUFhLE1BQU0sQ0FBQztBQUNoRCx1QkFBTyxRQUFRLHNDQUFhLEtBQUssR0FBRyxDQUFDO0FBQ3JDLHVCQUFPLFFBQVEsc0NBQWEsU0FBUyxHQUFHLENBQUM7QUFFekMsUUFBSSxRQUFRLGFBQWEsU0FBUztBQUNoQyx5QkFBTyxRQUFRLHNDQUFhLGVBQWUsVUFBVSxDQUFDO0FBQ3RELHlCQUFPLFFBQVEsc0NBQWEsZUFBZSxVQUFVLENBQUM7QUFBQSxJQUN4RDtBQUFBLEVBQ0YsQ0FBQztBQUVELEtBQUcsNERBQTRELE1BQU07QUFDbkUsdUJBQU8sT0FBTyxzQ0FBYSxTQUFTLEtBQUssQ0FBQztBQUMxQyx1QkFBTyxPQUFPLHNDQUFhLFdBQVcsS0FBSyxDQUFDO0FBQzVDLHVCQUFPLE9BQU8sc0NBQWEsVUFBVSxNQUFNLENBQUM7QUFDNUMsdUJBQU8sT0FBTyxzQ0FBYSxVQUFVLE9BQU8sQ0FBQztBQUM3Qyx1QkFBTyxPQUFPLHNDQUFhLFdBQVcsTUFBTSxDQUFDO0FBQzdDLHVCQUFPLE9BQU8sc0NBQWEsV0FBVyxPQUFPLENBQUM7QUFDOUMsdUJBQU8sT0FBTyxzQ0FBYSxZQUFZLE1BQU0sQ0FBQztBQUM5Qyx1QkFBTyxPQUFPLHNDQUFhLGVBQWUsTUFBTSxDQUFDO0FBQ2pELHVCQUFPLE9BQU8sc0NBQWEsY0FBYyxHQUFHLENBQUM7QUFDN0MsdUJBQU8sT0FBTyxzQ0FBYSxhQUFhLEdBQUcsQ0FBQztBQUU1QyxRQUFJLFFBQVEsYUFBYSxTQUFTO0FBQ2hDLHlCQUFPLE9BQU8sc0NBQWEsZUFBZSxVQUFVLENBQUM7QUFBQSxJQUN2RDtBQUFBLEVBQ0YsQ0FBQztBQUNILENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
