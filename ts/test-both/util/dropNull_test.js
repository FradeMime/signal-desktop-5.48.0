var import_chai = require("chai");
var import_dropNull = require("../../util/dropNull");
describe("dropNull", () => {
  it("swaps null with undefined", () => {
    import_chai.assert.strictEqual((0, import_dropNull.dropNull)(null), void 0);
  });
  it("leaves undefined be", () => {
    import_chai.assert.strictEqual((0, import_dropNull.dropNull)(void 0), void 0);
  });
  it("non-null values undefined be", () => {
    import_chai.assert.strictEqual((0, import_dropNull.dropNull)("test"), "test");
  });
  describe("shallowDropNull", () => {
    it("return undefined with given null", () => {
      import_chai.assert.strictEqual((0, import_dropNull.shallowDropNull)(null), void 0);
    });
    it("return undefined with given undefined", () => {
      import_chai.assert.strictEqual((0, import_dropNull.shallowDropNull)(void 0), void 0);
    });
    it("swaps null with undefined", () => {
      const result = (0, import_dropNull.shallowDropNull)({
        a: null,
        b: 1
      });
      import_chai.assert.deepStrictEqual(result, { a: void 0, b: 1 });
    });
    it("leaves undefined be", () => {
      const result = (0, import_dropNull.shallowDropNull)({
        a: 1,
        b: void 0
      });
      import_chai.assert.deepStrictEqual(result, { a: 1, b: void 0 });
    });
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZHJvcE51bGxfdGVzdC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSAnY2hhaSc7XG5cbmltcG9ydCB7IGRyb3BOdWxsLCBzaGFsbG93RHJvcE51bGwgfSBmcm9tICcuLi8uLi91dGlsL2Ryb3BOdWxsJztcblxudHlwZSBUZXN0ID0ge1xuICBhOiBudW1iZXIgfCBudWxsO1xuICBiOiBudW1iZXIgfCB1bmRlZmluZWQ7XG59O1xuXG5kZXNjcmliZSgnZHJvcE51bGwnLCAoKSA9PiB7XG4gIGl0KCdzd2FwcyBudWxsIHdpdGggdW5kZWZpbmVkJywgKCkgPT4ge1xuICAgIGFzc2VydC5zdHJpY3RFcXVhbChkcm9wTnVsbChudWxsKSwgdW5kZWZpbmVkKTtcbiAgfSk7XG5cbiAgaXQoJ2xlYXZlcyB1bmRlZmluZWQgYmUnLCAoKSA9PiB7XG4gICAgYXNzZXJ0LnN0cmljdEVxdWFsKGRyb3BOdWxsKHVuZGVmaW5lZCksIHVuZGVmaW5lZCk7XG4gIH0pO1xuXG4gIGl0KCdub24tbnVsbCB2YWx1ZXMgdW5kZWZpbmVkIGJlJywgKCkgPT4ge1xuICAgIGFzc2VydC5zdHJpY3RFcXVhbChkcm9wTnVsbCgndGVzdCcpLCAndGVzdCcpO1xuICB9KTtcblxuICBkZXNjcmliZSgnc2hhbGxvd0Ryb3BOdWxsJywgKCkgPT4ge1xuICAgIGl0KCdyZXR1cm4gdW5kZWZpbmVkIHdpdGggZ2l2ZW4gbnVsbCcsICgpID0+IHtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChzaGFsbG93RHJvcE51bGw8VGVzdD4obnVsbCksIHVuZGVmaW5lZCk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJuIHVuZGVmaW5lZCB3aXRoIGdpdmVuIHVuZGVmaW5lZCcsICgpID0+IHtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChzaGFsbG93RHJvcE51bGw8VGVzdD4odW5kZWZpbmVkKSwgdW5kZWZpbmVkKTtcbiAgICB9KTtcblxuICAgIGl0KCdzd2FwcyBudWxsIHdpdGggdW5kZWZpbmVkJywgKCkgPT4ge1xuICAgICAgY29uc3QgcmVzdWx0OlxuICAgICAgICB8IHtcbiAgICAgICAgICAgIGE6IG51bWJlciB8IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGI6IG51bWJlciB8IHVuZGVmaW5lZDtcbiAgICAgICAgICB9XG4gICAgICAgIHwgdW5kZWZpbmVkID0gc2hhbGxvd0Ryb3BOdWxsPFRlc3Q+KHtcbiAgICAgICAgYTogbnVsbCxcbiAgICAgICAgYjogMSxcbiAgICAgIH0pO1xuXG4gICAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKHJlc3VsdCwgeyBhOiB1bmRlZmluZWQsIGI6IDEgfSk7XG4gICAgfSk7XG5cbiAgICBpdCgnbGVhdmVzIHVuZGVmaW5lZCBiZScsICgpID0+IHtcbiAgICAgIGNvbnN0IHJlc3VsdDpcbiAgICAgICAgfCB7XG4gICAgICAgICAgICBhOiBudW1iZXIgfCB1bmRlZmluZWQ7XG4gICAgICAgICAgICBiOiBudW1iZXIgfCB1bmRlZmluZWQ7XG4gICAgICAgICAgfVxuICAgICAgICB8IHVuZGVmaW5lZCA9IHNoYWxsb3dEcm9wTnVsbDxUZXN0Pih7XG4gICAgICAgIGE6IDEsXG4gICAgICAgIGI6IHVuZGVmaW5lZCxcbiAgICAgIH0pO1xuXG4gICAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKHJlc3VsdCwgeyBhOiAxLCBiOiB1bmRlZmluZWQgfSk7XG4gICAgfSk7XG4gIH0pO1xufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiQUFFQSxrQkFBdUI7QUFFdkIsc0JBQTBDO0FBTzFDLFNBQVMsWUFBWSxNQUFNO0FBQ3pCLEtBQUcsNkJBQTZCLE1BQU07QUFDcEMsdUJBQU8sWUFBWSw4QkFBUyxJQUFJLEdBQUcsTUFBUztBQUFBLEVBQzlDLENBQUM7QUFFRCxLQUFHLHVCQUF1QixNQUFNO0FBQzlCLHVCQUFPLFlBQVksOEJBQVMsTUFBUyxHQUFHLE1BQVM7QUFBQSxFQUNuRCxDQUFDO0FBRUQsS0FBRyxnQ0FBZ0MsTUFBTTtBQUN2Qyx1QkFBTyxZQUFZLDhCQUFTLE1BQU0sR0FBRyxNQUFNO0FBQUEsRUFDN0MsQ0FBQztBQUVELFdBQVMsbUJBQW1CLE1BQU07QUFDaEMsT0FBRyxvQ0FBb0MsTUFBTTtBQUMzQyx5QkFBTyxZQUFZLHFDQUFzQixJQUFJLEdBQUcsTUFBUztBQUFBLElBQzNELENBQUM7QUFFRCxPQUFHLHlDQUF5QyxNQUFNO0FBQ2hELHlCQUFPLFlBQVkscUNBQXNCLE1BQVMsR0FBRyxNQUFTO0FBQUEsSUFDaEUsQ0FBQztBQUVELE9BQUcsNkJBQTZCLE1BQU07QUFDcEMsWUFBTSxTQUtVLHFDQUFzQjtBQUFBLFFBQ3BDLEdBQUc7QUFBQSxRQUNILEdBQUc7QUFBQSxNQUNMLENBQUM7QUFFRCx5QkFBTyxnQkFBZ0IsUUFBUSxFQUFFLEdBQUcsUUFBVyxHQUFHLEVBQUUsQ0FBQztBQUFBLElBQ3ZELENBQUM7QUFFRCxPQUFHLHVCQUF1QixNQUFNO0FBQzlCLFlBQU0sU0FLVSxxQ0FBc0I7QUFBQSxRQUNwQyxHQUFHO0FBQUEsUUFDSCxHQUFHO0FBQUEsTUFDTCxDQUFDO0FBRUQseUJBQU8sZ0JBQWdCLFFBQVEsRUFBRSxHQUFHLEdBQUcsR0FBRyxPQUFVLENBQUM7QUFBQSxJQUN2RCxDQUFDO0FBQUEsRUFDSCxDQUFDO0FBQ0gsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
