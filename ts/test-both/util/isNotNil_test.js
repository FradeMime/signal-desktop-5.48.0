var import_chai = require("chai");
var import_isNotNil = require("../../util/isNotNil");
describe("isNotNil", () => {
  it("returns false if provided null value", () => {
    import_chai.assert.isFalse((0, import_isNotNil.isNotNil)(null));
  });
  it("returns false is provided undefined value", () => {
    import_chai.assert.isFalse((0, import_isNotNil.isNotNil)(void 0));
  });
  it("returns false is provided any other value", () => {
    import_chai.assert.isTrue((0, import_isNotNil.isNotNil)(0));
    import_chai.assert.isTrue((0, import_isNotNil.isNotNil)(4));
    import_chai.assert.isTrue((0, import_isNotNil.isNotNil)(""));
    import_chai.assert.isTrue((0, import_isNotNil.isNotNil)("string value"));
    import_chai.assert.isTrue((0, import_isNotNil.isNotNil)({}));
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiaXNOb3ROaWxfdGVzdC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyBhc3NlcnQgfSBmcm9tICdjaGFpJztcblxuaW1wb3J0IHsgaXNOb3ROaWwgfSBmcm9tICcuLi8uLi91dGlsL2lzTm90TmlsJztcblxuZGVzY3JpYmUoJ2lzTm90TmlsJywgKCkgPT4ge1xuICBpdCgncmV0dXJucyBmYWxzZSBpZiBwcm92aWRlZCBudWxsIHZhbHVlJywgKCkgPT4ge1xuICAgIGFzc2VydC5pc0ZhbHNlKGlzTm90TmlsKG51bGwpKTtcbiAgfSk7XG5cbiAgaXQoJ3JldHVybnMgZmFsc2UgaXMgcHJvdmlkZWQgdW5kZWZpbmVkIHZhbHVlJywgKCkgPT4ge1xuICAgIGFzc2VydC5pc0ZhbHNlKGlzTm90TmlsKHVuZGVmaW5lZCkpO1xuICB9KTtcblxuICBpdCgncmV0dXJucyBmYWxzZSBpcyBwcm92aWRlZCBhbnkgb3RoZXIgdmFsdWUnLCAoKSA9PiB7XG4gICAgYXNzZXJ0LmlzVHJ1ZShpc05vdE5pbCgwKSk7XG4gICAgYXNzZXJ0LmlzVHJ1ZShpc05vdE5pbCg0KSk7XG4gICAgYXNzZXJ0LmlzVHJ1ZShpc05vdE5pbCgnJykpO1xuICAgIGFzc2VydC5pc1RydWUoaXNOb3ROaWwoJ3N0cmluZyB2YWx1ZScpKTtcbiAgICBhc3NlcnQuaXNUcnVlKGlzTm90TmlsKHt9KSk7XG4gIH0pO1xufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiQUFHQSxrQkFBdUI7QUFFdkIsc0JBQXlCO0FBRXpCLFNBQVMsWUFBWSxNQUFNO0FBQ3pCLEtBQUcsd0NBQXdDLE1BQU07QUFDL0MsdUJBQU8sUUFBUSw4QkFBUyxJQUFJLENBQUM7QUFBQSxFQUMvQixDQUFDO0FBRUQsS0FBRyw2Q0FBNkMsTUFBTTtBQUNwRCx1QkFBTyxRQUFRLDhCQUFTLE1BQVMsQ0FBQztBQUFBLEVBQ3BDLENBQUM7QUFFRCxLQUFHLDZDQUE2QyxNQUFNO0FBQ3BELHVCQUFPLE9BQU8sOEJBQVMsQ0FBQyxDQUFDO0FBQ3pCLHVCQUFPLE9BQU8sOEJBQVMsQ0FBQyxDQUFDO0FBQ3pCLHVCQUFPLE9BQU8sOEJBQVMsRUFBRSxDQUFDO0FBQzFCLHVCQUFPLE9BQU8sOEJBQVMsY0FBYyxDQUFDO0FBQ3RDLHVCQUFPLE9BQU8sOEJBQVMsQ0FBQyxDQUFDLENBQUM7QUFBQSxFQUM1QixDQUFDO0FBQ0gsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
