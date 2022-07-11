var import_chai = require("chai");
var import_isSorted = require("../../util/isSorted");
describe("isSorted", () => {
  it("returns true for empty lists", () => {
    import_chai.assert.isTrue((0, import_isSorted.isSorted)([]));
  });
  it("returns true for one-element lists", () => {
    import_chai.assert.isTrue((0, import_isSorted.isSorted)([5]));
  });
  it("returns true for sorted lists", () => {
    import_chai.assert.isTrue((0, import_isSorted.isSorted)([1, 2]));
    import_chai.assert.isTrue((0, import_isSorted.isSorted)([1, 2, 2, 3]));
  });
  it("returns false for out-of-order lists", () => {
    import_chai.assert.isFalse((0, import_isSorted.isSorted)([2, 1]));
    import_chai.assert.isFalse((0, import_isSorted.isSorted)([1, 2, 2, 3, 0]));
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiaXNTb3J0ZWRfdGVzdC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyBhc3NlcnQgfSBmcm9tICdjaGFpJztcblxuaW1wb3J0IHsgaXNTb3J0ZWQgfSBmcm9tICcuLi8uLi91dGlsL2lzU29ydGVkJztcblxuZGVzY3JpYmUoJ2lzU29ydGVkJywgKCkgPT4ge1xuICBpdCgncmV0dXJucyB0cnVlIGZvciBlbXB0eSBsaXN0cycsICgpID0+IHtcbiAgICBhc3NlcnQuaXNUcnVlKGlzU29ydGVkKFtdKSk7XG4gIH0pO1xuXG4gIGl0KCdyZXR1cm5zIHRydWUgZm9yIG9uZS1lbGVtZW50IGxpc3RzJywgKCkgPT4ge1xuICAgIGFzc2VydC5pc1RydWUoaXNTb3J0ZWQoWzVdKSk7XG4gIH0pO1xuXG4gIGl0KCdyZXR1cm5zIHRydWUgZm9yIHNvcnRlZCBsaXN0cycsICgpID0+IHtcbiAgICBhc3NlcnQuaXNUcnVlKGlzU29ydGVkKFsxLCAyXSkpO1xuICAgIGFzc2VydC5pc1RydWUoaXNTb3J0ZWQoWzEsIDIsIDIsIDNdKSk7XG4gIH0pO1xuXG4gIGl0KCdyZXR1cm5zIGZhbHNlIGZvciBvdXQtb2Ytb3JkZXIgbGlzdHMnLCAoKSA9PiB7XG4gICAgYXNzZXJ0LmlzRmFsc2UoaXNTb3J0ZWQoWzIsIDFdKSk7XG4gICAgYXNzZXJ0LmlzRmFsc2UoaXNTb3J0ZWQoWzEsIDIsIDIsIDMsIDBdKSk7XG4gIH0pO1xufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiQUFHQSxrQkFBdUI7QUFFdkIsc0JBQXlCO0FBRXpCLFNBQVMsWUFBWSxNQUFNO0FBQ3pCLEtBQUcsZ0NBQWdDLE1BQU07QUFDdkMsdUJBQU8sT0FBTyw4QkFBUyxDQUFDLENBQUMsQ0FBQztBQUFBLEVBQzVCLENBQUM7QUFFRCxLQUFHLHNDQUFzQyxNQUFNO0FBQzdDLHVCQUFPLE9BQU8sOEJBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUFBLEVBQzdCLENBQUM7QUFFRCxLQUFHLGlDQUFpQyxNQUFNO0FBQ3hDLHVCQUFPLE9BQU8sOEJBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQzlCLHVCQUFPLE9BQU8sOEJBQVMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUFBLEVBQ3RDLENBQUM7QUFFRCxLQUFHLHdDQUF3QyxNQUFNO0FBQy9DLHVCQUFPLFFBQVEsOEJBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQy9CLHVCQUFPLFFBQVEsOEJBQVMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQUEsRUFDMUMsQ0FBQztBQUNILENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
