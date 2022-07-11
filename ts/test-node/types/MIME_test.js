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
var MIME = __toESM(require("../../types/MIME"));
describe("MIME", () => {
  describe("isGif", () => {
    it("returns true for GIFs", () => {
      import_chai.assert.isTrue(MIME.isGif("image/gif"));
    });
    it("returns false for non-GIFs", () => {
      import_chai.assert.isFalse(MIME.isGif(""));
      import_chai.assert.isFalse(MIME.isGif("gif"));
      import_chai.assert.isFalse(MIME.isGif("image/jpeg"));
      import_chai.assert.isFalse(MIME.isGif("text/plain"));
    });
  });
  describe("isJPEG", () => {
    it("should return true for `image/jpeg`", () => {
      import_chai.assert.isTrue(MIME.isJPEG("image/jpeg"));
    });
    it("returns false for non-JPEGs", () => {
      import_chai.assert.isFalse(MIME.isJPEG(""));
      import_chai.assert.isFalse(MIME.isJPEG("jpg"));
      import_chai.assert.isFalse(MIME.isJPEG("jpeg"));
      import_chai.assert.isFalse(MIME.isJPEG("image/jpg"));
      import_chai.assert.isFalse(MIME.isJPEG("image/gif"));
      import_chai.assert.isFalse(MIME.isJPEG("image/tiff"));
      import_chai.assert.isFalse(MIME.isJPEG("application/json"));
    });
  });
  describe("isLongMessage", () => {
    it("returns true for long messages", () => {
      import_chai.assert.isTrue(MIME.isLongMessage("text/x-signal-plain"));
    });
    it("returns true for other content types", () => {
      import_chai.assert.isFalse(MIME.isLongMessage("text/plain"));
      import_chai.assert.isFalse(MIME.isLongMessage("image/gif"));
    });
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiTUlNRV90ZXN0LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAxOC0yMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSAnY2hhaSc7XG5cbmltcG9ydCAqIGFzIE1JTUUgZnJvbSAnLi4vLi4vdHlwZXMvTUlNRSc7XG5cbmRlc2NyaWJlKCdNSU1FJywgKCkgPT4ge1xuICBkZXNjcmliZSgnaXNHaWYnLCAoKSA9PiB7XG4gICAgaXQoJ3JldHVybnMgdHJ1ZSBmb3IgR0lGcycsICgpID0+IHtcbiAgICAgIGFzc2VydC5pc1RydWUoTUlNRS5pc0dpZignaW1hZ2UvZ2lmJykpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgZmFsc2UgZm9yIG5vbi1HSUZzJywgKCkgPT4ge1xuICAgICAgYXNzZXJ0LmlzRmFsc2UoTUlNRS5pc0dpZignJykpO1xuICAgICAgYXNzZXJ0LmlzRmFsc2UoTUlNRS5pc0dpZignZ2lmJykpO1xuICAgICAgYXNzZXJ0LmlzRmFsc2UoTUlNRS5pc0dpZignaW1hZ2UvanBlZycpKTtcbiAgICAgIGFzc2VydC5pc0ZhbHNlKE1JTUUuaXNHaWYoJ3RleHQvcGxhaW4nKSk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdpc0pQRUcnLCAoKSA9PiB7XG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gdHJ1ZSBmb3IgYGltYWdlL2pwZWdgJywgKCkgPT4ge1xuICAgICAgYXNzZXJ0LmlzVHJ1ZShNSU1FLmlzSlBFRygnaW1hZ2UvanBlZycpKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIGZhbHNlIGZvciBub24tSlBFR3MnLCAoKSA9PiB7XG4gICAgICBhc3NlcnQuaXNGYWxzZShNSU1FLmlzSlBFRygnJykpO1xuICAgICAgYXNzZXJ0LmlzRmFsc2UoTUlNRS5pc0pQRUcoJ2pwZycpKTtcbiAgICAgIGFzc2VydC5pc0ZhbHNlKE1JTUUuaXNKUEVHKCdqcGVnJykpO1xuICAgICAgYXNzZXJ0LmlzRmFsc2UoTUlNRS5pc0pQRUcoJ2ltYWdlL2pwZycpKTsgLy8gaW52YWxpZCBNSU1FIHR5cGU6IGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8zNzI2NjM5OS8xMjUzMDVcbiAgICAgIGFzc2VydC5pc0ZhbHNlKE1JTUUuaXNKUEVHKCdpbWFnZS9naWYnKSk7XG4gICAgICBhc3NlcnQuaXNGYWxzZShNSU1FLmlzSlBFRygnaW1hZ2UvdGlmZicpKTtcbiAgICAgIGFzc2VydC5pc0ZhbHNlKE1JTUUuaXNKUEVHKCdhcHBsaWNhdGlvbi9qc29uJykpO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnaXNMb25nTWVzc2FnZScsICgpID0+IHtcbiAgICBpdCgncmV0dXJucyB0cnVlIGZvciBsb25nIG1lc3NhZ2VzJywgKCkgPT4ge1xuICAgICAgYXNzZXJ0LmlzVHJ1ZShNSU1FLmlzTG9uZ01lc3NhZ2UoJ3RleHQveC1zaWduYWwtcGxhaW4nKSk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyB0cnVlIGZvciBvdGhlciBjb250ZW50IHR5cGVzJywgKCkgPT4ge1xuICAgICAgYXNzZXJ0LmlzRmFsc2UoTUlNRS5pc0xvbmdNZXNzYWdlKCd0ZXh0L3BsYWluJykpO1xuICAgICAgYXNzZXJ0LmlzRmFsc2UoTUlNRS5pc0xvbmdNZXNzYWdlKCdpbWFnZS9naWYnKSk7XG4gICAgfSk7XG4gIH0pO1xufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7QUFHQSxrQkFBdUI7QUFFdkIsV0FBc0I7QUFFdEIsU0FBUyxRQUFRLE1BQU07QUFDckIsV0FBUyxTQUFTLE1BQU07QUFDdEIsT0FBRyx5QkFBeUIsTUFBTTtBQUNoQyx5QkFBTyxPQUFPLEtBQUssTUFBTSxXQUFXLENBQUM7QUFBQSxJQUN2QyxDQUFDO0FBRUQsT0FBRyw4QkFBOEIsTUFBTTtBQUNyQyx5QkFBTyxRQUFRLEtBQUssTUFBTSxFQUFFLENBQUM7QUFDN0IseUJBQU8sUUFBUSxLQUFLLE1BQU0sS0FBSyxDQUFDO0FBQ2hDLHlCQUFPLFFBQVEsS0FBSyxNQUFNLFlBQVksQ0FBQztBQUN2Qyx5QkFBTyxRQUFRLEtBQUssTUFBTSxZQUFZLENBQUM7QUFBQSxJQUN6QyxDQUFDO0FBQUEsRUFDSCxDQUFDO0FBRUQsV0FBUyxVQUFVLE1BQU07QUFDdkIsT0FBRyx1Q0FBdUMsTUFBTTtBQUM5Qyx5QkFBTyxPQUFPLEtBQUssT0FBTyxZQUFZLENBQUM7QUFBQSxJQUN6QyxDQUFDO0FBRUQsT0FBRywrQkFBK0IsTUFBTTtBQUN0Qyx5QkFBTyxRQUFRLEtBQUssT0FBTyxFQUFFLENBQUM7QUFDOUIseUJBQU8sUUFBUSxLQUFLLE9BQU8sS0FBSyxDQUFDO0FBQ2pDLHlCQUFPLFFBQVEsS0FBSyxPQUFPLE1BQU0sQ0FBQztBQUNsQyx5QkFBTyxRQUFRLEtBQUssT0FBTyxXQUFXLENBQUM7QUFDdkMseUJBQU8sUUFBUSxLQUFLLE9BQU8sV0FBVyxDQUFDO0FBQ3ZDLHlCQUFPLFFBQVEsS0FBSyxPQUFPLFlBQVksQ0FBQztBQUN4Qyx5QkFBTyxRQUFRLEtBQUssT0FBTyxrQkFBa0IsQ0FBQztBQUFBLElBQ2hELENBQUM7QUFBQSxFQUNILENBQUM7QUFFRCxXQUFTLGlCQUFpQixNQUFNO0FBQzlCLE9BQUcsa0NBQWtDLE1BQU07QUFDekMseUJBQU8sT0FBTyxLQUFLLGNBQWMscUJBQXFCLENBQUM7QUFBQSxJQUN6RCxDQUFDO0FBRUQsT0FBRyx3Q0FBd0MsTUFBTTtBQUMvQyx5QkFBTyxRQUFRLEtBQUssY0FBYyxZQUFZLENBQUM7QUFDL0MseUJBQU8sUUFBUSxLQUFLLGNBQWMsV0FBVyxDQUFDO0FBQUEsSUFDaEQsQ0FBQztBQUFBLEVBQ0gsQ0FBQztBQUNILENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
