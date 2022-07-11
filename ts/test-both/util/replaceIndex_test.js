var import_chai = require("chai");
var import_replaceIndex = require("../../util/replaceIndex");
describe("replaceIndex", () => {
  it("returns a new array with an index replaced", () => {
    const original = ["a", "b", "c", "d"];
    const replaced = (0, import_replaceIndex.replaceIndex)(original, 2, "X");
    import_chai.assert.deepStrictEqual(replaced, ["a", "b", "X", "d"]);
  });
  it("doesn't modify the original array", () => {
    const original = ["a", "b", "c", "d"];
    (0, import_replaceIndex.replaceIndex)(original, 2, "X");
    import_chai.assert.deepStrictEqual(original, ["a", "b", "c", "d"]);
  });
  it("throws if the index is out of range", () => {
    const original = ["a", "b", "c"];
    [-1, 1.2, 4, Infinity, NaN].forEach((index) => {
      import_chai.assert.throws(() => {
        (0, import_replaceIndex.replaceIndex)(original, index, "X");
      });
    });
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsicmVwbGFjZUluZGV4X3Rlc3QudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSAnY2hhaSc7XG5cbmltcG9ydCB7IHJlcGxhY2VJbmRleCB9IGZyb20gJy4uLy4uL3V0aWwvcmVwbGFjZUluZGV4JztcblxuZGVzY3JpYmUoJ3JlcGxhY2VJbmRleCcsICgpID0+IHtcbiAgaXQoJ3JldHVybnMgYSBuZXcgYXJyYXkgd2l0aCBhbiBpbmRleCByZXBsYWNlZCcsICgpID0+IHtcbiAgICBjb25zdCBvcmlnaW5hbCA9IFsnYScsICdiJywgJ2MnLCAnZCddO1xuICAgIGNvbnN0IHJlcGxhY2VkID0gcmVwbGFjZUluZGV4KG9yaWdpbmFsLCAyLCAnWCcpO1xuXG4gICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChyZXBsYWNlZCwgWydhJywgJ2InLCAnWCcsICdkJ10pO1xuICB9KTtcblxuICBpdChcImRvZXNuJ3QgbW9kaWZ5IHRoZSBvcmlnaW5hbCBhcnJheVwiLCAoKSA9PiB7XG4gICAgY29uc3Qgb3JpZ2luYWwgPSBbJ2EnLCAnYicsICdjJywgJ2QnXTtcbiAgICByZXBsYWNlSW5kZXgob3JpZ2luYWwsIDIsICdYJyk7XG5cbiAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKG9yaWdpbmFsLCBbJ2EnLCAnYicsICdjJywgJ2QnXSk7XG4gIH0pO1xuXG4gIGl0KCd0aHJvd3MgaWYgdGhlIGluZGV4IGlzIG91dCBvZiByYW5nZScsICgpID0+IHtcbiAgICBjb25zdCBvcmlnaW5hbCA9IFsnYScsICdiJywgJ2MnXTtcblxuICAgIFstMSwgMS4yLCA0LCBJbmZpbml0eSwgTmFOXS5mb3JFYWNoKGluZGV4ID0+IHtcbiAgICAgIGFzc2VydC50aHJvd3MoKCkgPT4ge1xuICAgICAgICByZXBsYWNlSW5kZXgob3JpZ2luYWwsIGluZGV4LCAnWCcpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiQUFHQSxrQkFBdUI7QUFFdkIsMEJBQTZCO0FBRTdCLFNBQVMsZ0JBQWdCLE1BQU07QUFDN0IsS0FBRyw4Q0FBOEMsTUFBTTtBQUNyRCxVQUFNLFdBQVcsQ0FBQyxLQUFLLEtBQUssS0FBSyxHQUFHO0FBQ3BDLFVBQU0sV0FBVyxzQ0FBYSxVQUFVLEdBQUcsR0FBRztBQUU5Qyx1QkFBTyxnQkFBZ0IsVUFBVSxDQUFDLEtBQUssS0FBSyxLQUFLLEdBQUcsQ0FBQztBQUFBLEVBQ3ZELENBQUM7QUFFRCxLQUFHLHFDQUFxQyxNQUFNO0FBQzVDLFVBQU0sV0FBVyxDQUFDLEtBQUssS0FBSyxLQUFLLEdBQUc7QUFDcEMsMENBQWEsVUFBVSxHQUFHLEdBQUc7QUFFN0IsdUJBQU8sZ0JBQWdCLFVBQVUsQ0FBQyxLQUFLLEtBQUssS0FBSyxHQUFHLENBQUM7QUFBQSxFQUN2RCxDQUFDO0FBRUQsS0FBRyx1Q0FBdUMsTUFBTTtBQUM5QyxVQUFNLFdBQVcsQ0FBQyxLQUFLLEtBQUssR0FBRztBQUUvQixLQUFDLElBQUksS0FBSyxHQUFHLFVBQVUsR0FBRyxFQUFFLFFBQVEsV0FBUztBQUMzQyx5QkFBTyxPQUFPLE1BQU07QUFDbEIsOENBQWEsVUFBVSxPQUFPLEdBQUc7QUFBQSxNQUNuQyxDQUFDO0FBQUEsSUFDSCxDQUFDO0FBQUEsRUFDSCxDQUFDO0FBQ0gsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
