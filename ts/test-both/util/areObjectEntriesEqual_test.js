var import_chai = require("chai");
var import_areObjectEntriesEqual = require("../../util/areObjectEntriesEqual");
describe("areObjectEntriesEqual", () => {
  const empty = {};
  const foo = { foo: 1 };
  const bar = { bar: 2 };
  const undefinedEntries = { foo: void 0, bar: void 0 };
  it("returns true for an empty list of keys", () => {
    import_chai.assert.isTrue((0, import_areObjectEntriesEqual.areObjectEntriesEqual)({}, {}, []));
    import_chai.assert.isTrue((0, import_areObjectEntriesEqual.areObjectEntriesEqual)(foo, foo, []));
    import_chai.assert.isTrue((0, import_areObjectEntriesEqual.areObjectEntriesEqual)(foo, bar, []));
  });
  it("returns true for empty objects", () => {
    import_chai.assert.isTrue((0, import_areObjectEntriesEqual.areObjectEntriesEqual)(empty, empty, ["foo"]));
  });
  it("considers missing keys equal to undefined keys", () => {
    import_chai.assert.isTrue((0, import_areObjectEntriesEqual.areObjectEntriesEqual)(empty, undefinedEntries, ["foo", "bar"]));
  });
  it("ignores unspecified properties", () => {
    import_chai.assert.isTrue((0, import_areObjectEntriesEqual.areObjectEntriesEqual)({ x: 1, y: 2 }, { x: 1, y: 3 }, ["x"]));
  });
  it("returns false for different objects", () => {
    import_chai.assert.isFalse((0, import_areObjectEntriesEqual.areObjectEntriesEqual)({ x: 1 }, { x: 2 }, ["x"]));
    import_chai.assert.isFalse((0, import_areObjectEntriesEqual.areObjectEntriesEqual)({ x: 1, y: 2 }, { x: 1, y: 3 }, ["x", "y"]));
  });
  it("only performs a shallow check", () => {
    import_chai.assert.isFalse((0, import_areObjectEntriesEqual.areObjectEntriesEqual)({ x: [1, 2] }, { x: [1, 2] }, ["x"]));
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiYXJlT2JqZWN0RW50cmllc0VxdWFsX3Rlc3QudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSAnY2hhaSc7XG5cbmltcG9ydCB7IGFyZU9iamVjdEVudHJpZXNFcXVhbCB9IGZyb20gJy4uLy4uL3V0aWwvYXJlT2JqZWN0RW50cmllc0VxdWFsJztcblxuZGVzY3JpYmUoJ2FyZU9iamVjdEVudHJpZXNFcXVhbCcsICgpID0+IHtcbiAgdHlwZSBUZXN0T2JqZWN0ID0geyBmb28/OiBudW1iZXI7IGJhcj86IG51bWJlciB9O1xuXG4gIGNvbnN0IGVtcHR5OiBUZXN0T2JqZWN0ID0ge307XG4gIGNvbnN0IGZvbzogVGVzdE9iamVjdCA9IHsgZm9vOiAxIH07XG4gIGNvbnN0IGJhcjogVGVzdE9iamVjdCA9IHsgYmFyOiAyIH07XG4gIGNvbnN0IHVuZGVmaW5lZEVudHJpZXM6IFRlc3RPYmplY3QgPSB7IGZvbzogdW5kZWZpbmVkLCBiYXI6IHVuZGVmaW5lZCB9O1xuXG4gIGl0KCdyZXR1cm5zIHRydWUgZm9yIGFuIGVtcHR5IGxpc3Qgb2Yga2V5cycsICgpID0+IHtcbiAgICBhc3NlcnQuaXNUcnVlKGFyZU9iamVjdEVudHJpZXNFcXVhbCh7fSwge30sIFtdKSk7XG4gICAgYXNzZXJ0LmlzVHJ1ZShhcmVPYmplY3RFbnRyaWVzRXF1YWwoZm9vLCBmb28sIFtdKSk7XG4gICAgYXNzZXJ0LmlzVHJ1ZShhcmVPYmplY3RFbnRyaWVzRXF1YWwoZm9vLCBiYXIsIFtdKSk7XG4gIH0pO1xuXG4gIGl0KCdyZXR1cm5zIHRydWUgZm9yIGVtcHR5IG9iamVjdHMnLCAoKSA9PiB7XG4gICAgYXNzZXJ0LmlzVHJ1ZShhcmVPYmplY3RFbnRyaWVzRXF1YWwoZW1wdHksIGVtcHR5LCBbJ2ZvbyddKSk7XG4gIH0pO1xuXG4gIGl0KCdjb25zaWRlcnMgbWlzc2luZyBrZXlzIGVxdWFsIHRvIHVuZGVmaW5lZCBrZXlzJywgKCkgPT4ge1xuICAgIGFzc2VydC5pc1RydWUoXG4gICAgICBhcmVPYmplY3RFbnRyaWVzRXF1YWwoZW1wdHksIHVuZGVmaW5lZEVudHJpZXMsIFsnZm9vJywgJ2JhciddKVxuICAgICk7XG4gIH0pO1xuXG4gIGl0KCdpZ25vcmVzIHVuc3BlY2lmaWVkIHByb3BlcnRpZXMnLCAoKSA9PiB7XG4gICAgYXNzZXJ0LmlzVHJ1ZShhcmVPYmplY3RFbnRyaWVzRXF1YWwoeyB4OiAxLCB5OiAyIH0sIHsgeDogMSwgeTogMyB9LCBbJ3gnXSkpO1xuICB9KTtcblxuICBpdCgncmV0dXJucyBmYWxzZSBmb3IgZGlmZmVyZW50IG9iamVjdHMnLCAoKSA9PiB7XG4gICAgYXNzZXJ0LmlzRmFsc2UoYXJlT2JqZWN0RW50cmllc0VxdWFsKHsgeDogMSB9LCB7IHg6IDIgfSwgWyd4J10pKTtcbiAgICBhc3NlcnQuaXNGYWxzZShcbiAgICAgIGFyZU9iamVjdEVudHJpZXNFcXVhbCh7IHg6IDEsIHk6IDIgfSwgeyB4OiAxLCB5OiAzIH0sIFsneCcsICd5J10pXG4gICAgKTtcbiAgfSk7XG5cbiAgaXQoJ29ubHkgcGVyZm9ybXMgYSBzaGFsbG93IGNoZWNrJywgKCkgPT4ge1xuICAgIGFzc2VydC5pc0ZhbHNlKGFyZU9iamVjdEVudHJpZXNFcXVhbCh7IHg6IFsxLCAyXSB9LCB7IHg6IFsxLCAyXSB9LCBbJ3gnXSkpO1xuICB9KTtcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIkFBR0Esa0JBQXVCO0FBRXZCLG1DQUFzQztBQUV0QyxTQUFTLHlCQUF5QixNQUFNO0FBR3RDLFFBQU0sUUFBb0IsQ0FBQztBQUMzQixRQUFNLE1BQWtCLEVBQUUsS0FBSyxFQUFFO0FBQ2pDLFFBQU0sTUFBa0IsRUFBRSxLQUFLLEVBQUU7QUFDakMsUUFBTSxtQkFBK0IsRUFBRSxLQUFLLFFBQVcsS0FBSyxPQUFVO0FBRXRFLEtBQUcsMENBQTBDLE1BQU07QUFDakQsdUJBQU8sT0FBTyx3REFBc0IsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUMvQyx1QkFBTyxPQUFPLHdEQUFzQixLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUM7QUFDakQsdUJBQU8sT0FBTyx3REFBc0IsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDO0FBQUEsRUFDbkQsQ0FBQztBQUVELEtBQUcsa0NBQWtDLE1BQU07QUFDekMsdUJBQU8sT0FBTyx3REFBc0IsT0FBTyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7QUFBQSxFQUM1RCxDQUFDO0FBRUQsS0FBRyxrREFBa0QsTUFBTTtBQUN6RCx1QkFBTyxPQUNMLHdEQUFzQixPQUFPLGtCQUFrQixDQUFDLE9BQU8sS0FBSyxDQUFDLENBQy9EO0FBQUEsRUFDRixDQUFDO0FBRUQsS0FBRyxrQ0FBa0MsTUFBTTtBQUN6Qyx1QkFBTyxPQUFPLHdEQUFzQixFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQUEsRUFDNUUsQ0FBQztBQUVELEtBQUcsdUNBQXVDLE1BQU07QUFDOUMsdUJBQU8sUUFBUSx3REFBc0IsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDL0QsdUJBQU8sUUFDTCx3REFBc0IsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUNsRTtBQUFBLEVBQ0YsQ0FBQztBQUVELEtBQUcsaUNBQWlDLE1BQU07QUFDeEMsdUJBQU8sUUFBUSx3REFBc0IsRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7QUFBQSxFQUMzRSxDQUFDO0FBQ0gsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
