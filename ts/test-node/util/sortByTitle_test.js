var import_chai = require("chai");
var import_sortByTitle = require("../../util/sortByTitle");
describe("sortByTitle", () => {
  it("does nothing to arrays that don't need to be sorted", () => {
    import_chai.assert.deepEqual((0, import_sortByTitle.sortByTitle)([]), []);
    import_chai.assert.deepEqual((0, import_sortByTitle.sortByTitle)([{ title: "foo" }]), [{ title: "foo" }]);
  });
  it("sorts the array by title", () => {
    import_chai.assert.deepEqual((0, import_sortByTitle.sortByTitle)([{ title: "foo" }, { title: "bar" }]), [
      { title: "bar" },
      { title: "foo" }
    ]);
  });
  it("doesn't mutate its argument", () => {
    const arr = [{ title: "foo" }, { title: "bar" }];
    (0, import_sortByTitle.sortByTitle)(arr);
    import_chai.assert.deepEqual(arr, [{ title: "foo" }, { title: "bar" }]);
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic29ydEJ5VGl0bGVfdGVzdC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjAgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyBhc3NlcnQgfSBmcm9tICdjaGFpJztcblxuaW1wb3J0IHsgc29ydEJ5VGl0bGUgfSBmcm9tICcuLi8uLi91dGlsL3NvcnRCeVRpdGxlJztcblxuZGVzY3JpYmUoJ3NvcnRCeVRpdGxlJywgKCkgPT4ge1xuICBpdChcImRvZXMgbm90aGluZyB0byBhcnJheXMgdGhhdCBkb24ndCBuZWVkIHRvIGJlIHNvcnRlZFwiLCAoKSA9PiB7XG4gICAgYXNzZXJ0LmRlZXBFcXVhbChzb3J0QnlUaXRsZShbXSksIFtdKTtcblxuICAgIGFzc2VydC5kZWVwRXF1YWwoc29ydEJ5VGl0bGUoW3sgdGl0bGU6ICdmb28nIH1dKSwgW3sgdGl0bGU6ICdmb28nIH1dKTtcbiAgfSk7XG5cbiAgaXQoJ3NvcnRzIHRoZSBhcnJheSBieSB0aXRsZScsICgpID0+IHtcbiAgICAvLyBCZWNhdXNlIHRoZSBmdW5jdGlvbiByZWxpZXMgb24gbG9jYWxlLWF3YXJlIGNvbXBhcmlzb25zLCB3ZSBkb24ndCBoYXZlIHZlcnlcbiAgICAvLyAgIHRob3JvdWdoIHRlc3RzIGhlcmUsIGFzIGl0IGNhbiBjaGFuZ2UgYmFzZWQgb24gcGxhdGZvcm0uXG4gICAgYXNzZXJ0LmRlZXBFcXVhbChzb3J0QnlUaXRsZShbeyB0aXRsZTogJ2ZvbycgfSwgeyB0aXRsZTogJ2JhcicgfV0pLCBbXG4gICAgICB7IHRpdGxlOiAnYmFyJyB9LFxuICAgICAgeyB0aXRsZTogJ2ZvbycgfSxcbiAgICBdKTtcbiAgfSk7XG5cbiAgaXQoXCJkb2Vzbid0IG11dGF0ZSBpdHMgYXJndW1lbnRcIiwgKCkgPT4ge1xuICAgIGNvbnN0IGFyciA9IFt7IHRpdGxlOiAnZm9vJyB9LCB7IHRpdGxlOiAnYmFyJyB9XTtcbiAgICBzb3J0QnlUaXRsZShhcnIpO1xuICAgIGFzc2VydC5kZWVwRXF1YWwoYXJyLCBbeyB0aXRsZTogJ2ZvbycgfSwgeyB0aXRsZTogJ2JhcicgfV0pO1xuICB9KTtcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIkFBR0Esa0JBQXVCO0FBRXZCLHlCQUE0QjtBQUU1QixTQUFTLGVBQWUsTUFBTTtBQUM1QixLQUFHLHVEQUF1RCxNQUFNO0FBQzlELHVCQUFPLFVBQVUsb0NBQVksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBRXBDLHVCQUFPLFVBQVUsb0NBQVksQ0FBQyxFQUFFLE9BQU8sTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsT0FBTyxNQUFNLENBQUMsQ0FBQztBQUFBLEVBQ3RFLENBQUM7QUFFRCxLQUFHLDRCQUE0QixNQUFNO0FBR25DLHVCQUFPLFVBQVUsb0NBQVksQ0FBQyxFQUFFLE9BQU8sTUFBTSxHQUFHLEVBQUUsT0FBTyxNQUFNLENBQUMsQ0FBQyxHQUFHO0FBQUEsTUFDbEUsRUFBRSxPQUFPLE1BQU07QUFBQSxNQUNmLEVBQUUsT0FBTyxNQUFNO0FBQUEsSUFDakIsQ0FBQztBQUFBLEVBQ0gsQ0FBQztBQUVELEtBQUcsK0JBQStCLE1BQU07QUFDdEMsVUFBTSxNQUFNLENBQUMsRUFBRSxPQUFPLE1BQU0sR0FBRyxFQUFFLE9BQU8sTUFBTSxDQUFDO0FBQy9DLHdDQUFZLEdBQUc7QUFDZix1QkFBTyxVQUFVLEtBQUssQ0FBQyxFQUFFLE9BQU8sTUFBTSxHQUFHLEVBQUUsT0FBTyxNQUFNLENBQUMsQ0FBQztBQUFBLEVBQzVELENBQUM7QUFDSCxDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
