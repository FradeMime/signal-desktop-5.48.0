var import_chai = require("chai");
var import_assert = require("../../util/assert");
describe("assert utilities", () => {
  describe("assert", () => {
    it("does nothing if the assertion passes", () => {
      (0, import_assert.assert)(true, "foo bar");
    });
    it("throws if the assertion fails, because we're in a test environment", () => {
      import_chai.assert.throws(() => {
        (0, import_assert.assert)(false, "foo bar");
      }, "foo bar");
    });
  });
  describe("strictAssert", () => {
    it("does nothing if the assertion passes", () => {
      (0, import_assert.strictAssert)(true, "foo bar");
    });
    it("throws if the assertion fails", () => {
      import_chai.assert.throws(() => {
        (0, import_assert.strictAssert)(false, "foo bar");
      }, "foo bar");
    });
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiYXNzZXJ0X3Rlc3QudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxLTIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyBhc3NlcnQgYXMgY2hhaUFzc2VydCB9IGZyb20gJ2NoYWknO1xuXG5pbXBvcnQgeyBhc3NlcnQsIHN0cmljdEFzc2VydCB9IGZyb20gJy4uLy4uL3V0aWwvYXNzZXJ0JztcblxuZGVzY3JpYmUoJ2Fzc2VydCB1dGlsaXRpZXMnLCAoKSA9PiB7XG4gIGRlc2NyaWJlKCdhc3NlcnQnLCAoKSA9PiB7XG4gICAgaXQoJ2RvZXMgbm90aGluZyBpZiB0aGUgYXNzZXJ0aW9uIHBhc3NlcycsICgpID0+IHtcbiAgICAgIGFzc2VydCh0cnVlLCAnZm9vIGJhcicpO1xuICAgIH0pO1xuXG4gICAgaXQoXCJ0aHJvd3MgaWYgdGhlIGFzc2VydGlvbiBmYWlscywgYmVjYXVzZSB3ZSdyZSBpbiBhIHRlc3QgZW52aXJvbm1lbnRcIiwgKCkgPT4ge1xuICAgICAgY2hhaUFzc2VydC50aHJvd3MoKCkgPT4ge1xuICAgICAgICBhc3NlcnQoZmFsc2UsICdmb28gYmFyJyk7XG4gICAgICB9LCAnZm9vIGJhcicpO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnc3RyaWN0QXNzZXJ0JywgKCkgPT4ge1xuICAgIGl0KCdkb2VzIG5vdGhpbmcgaWYgdGhlIGFzc2VydGlvbiBwYXNzZXMnLCAoKSA9PiB7XG4gICAgICBzdHJpY3RBc3NlcnQodHJ1ZSwgJ2ZvbyBiYXInKTtcbiAgICB9KTtcblxuICAgIGl0KCd0aHJvd3MgaWYgdGhlIGFzc2VydGlvbiBmYWlscycsICgpID0+IHtcbiAgICAgIGNoYWlBc3NlcnQudGhyb3dzKCgpID0+IHtcbiAgICAgICAgc3RyaWN0QXNzZXJ0KGZhbHNlLCAnZm9vIGJhcicpO1xuICAgICAgfSwgJ2ZvbyBiYXInKTtcbiAgICB9KTtcbiAgfSk7XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICJBQUdBLGtCQUFxQztBQUVyQyxvQkFBcUM7QUFFckMsU0FBUyxvQkFBb0IsTUFBTTtBQUNqQyxXQUFTLFVBQVUsTUFBTTtBQUN2QixPQUFHLHdDQUF3QyxNQUFNO0FBQy9DLGdDQUFPLE1BQU0sU0FBUztBQUFBLElBQ3hCLENBQUM7QUFFRCxPQUFHLHNFQUFzRSxNQUFNO0FBQzdFLHlCQUFXLE9BQU8sTUFBTTtBQUN0QixrQ0FBTyxPQUFPLFNBQVM7QUFBQSxNQUN6QixHQUFHLFNBQVM7QUFBQSxJQUNkLENBQUM7QUFBQSxFQUNILENBQUM7QUFFRCxXQUFTLGdCQUFnQixNQUFNO0FBQzdCLE9BQUcsd0NBQXdDLE1BQU07QUFDL0Msc0NBQWEsTUFBTSxTQUFTO0FBQUEsSUFDOUIsQ0FBQztBQUVELE9BQUcsaUNBQWlDLE1BQU07QUFDeEMseUJBQVcsT0FBTyxNQUFNO0FBQ3RCLHdDQUFhLE9BQU8sU0FBUztBQUFBLE1BQy9CLEdBQUcsU0FBUztBQUFBLElBQ2QsQ0FBQztBQUFBLEVBQ0gsQ0FBQztBQUNILENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
