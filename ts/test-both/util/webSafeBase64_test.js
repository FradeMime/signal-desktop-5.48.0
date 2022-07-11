var import_chai = require("chai");
var import_webSafeBase64 = require("../../util/webSafeBase64");
describe("both/util/webSafeBase64", () => {
  it("roundtrips with all elements", () => {
    const base64 = "X0KjoAj3h7Tu9YjJ++PamFc4kAg//D4FKommANpP41I=";
    const webSafe = (0, import_webSafeBase64.toWebSafeBase64)(base64);
    const actual = (0, import_webSafeBase64.fromWebSafeBase64)(webSafe);
    import_chai.assert.strictEqual(base64, actual);
  });
  describe("#toWebSafeBase64", () => {
    it("replaces +", () => {
      const base64 = "X++y";
      const expected = "X--y";
      const actual = (0, import_webSafeBase64.toWebSafeBase64)(base64);
      import_chai.assert.strictEqual(expected, actual);
    });
    it("replaces /", () => {
      const base64 = "X//y";
      const expected = "X__y";
      const actual = (0, import_webSafeBase64.toWebSafeBase64)(base64);
      import_chai.assert.strictEqual(expected, actual);
    });
    it("removes =", () => {
      const base64 = "X===";
      const expected = "X";
      const actual = (0, import_webSafeBase64.toWebSafeBase64)(base64);
      import_chai.assert.strictEqual(expected, actual);
    });
  });
  describe("#fromWebSafeBase64", () => {
    it("replaces -", () => {
      const webSafeBase64 = "X--y";
      const expected = "X++y";
      const actual = (0, import_webSafeBase64.fromWebSafeBase64)(webSafeBase64);
      import_chai.assert.strictEqual(expected, actual);
    });
    it("replaces _", () => {
      const webSafeBase64 = "X__y";
      const expected = "X//y";
      const actual = (0, import_webSafeBase64.fromWebSafeBase64)(webSafeBase64);
      import_chai.assert.strictEqual(expected, actual);
    });
    it("adds ===", () => {
      const webSafeBase64 = "X";
      const expected = "X===";
      const actual = (0, import_webSafeBase64.fromWebSafeBase64)(webSafeBase64);
      import_chai.assert.strictEqual(expected, actual);
    });
    it("adds ==", () => {
      const webSafeBase64 = "Xy";
      const expected = "Xy==";
      const actual = (0, import_webSafeBase64.fromWebSafeBase64)(webSafeBase64);
      import_chai.assert.strictEqual(expected, actual);
    });
    it("adds =", () => {
      const webSafeBase64 = "XyZ";
      const expected = "XyZ=";
      const actual = (0, import_webSafeBase64.fromWebSafeBase64)(webSafeBase64);
      import_chai.assert.strictEqual(expected, actual);
    });
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsid2ViU2FmZUJhc2U2NF90ZXN0LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IGFzc2VydCB9IGZyb20gJ2NoYWknO1xuXG5pbXBvcnQgeyB0b1dlYlNhZmVCYXNlNjQsIGZyb21XZWJTYWZlQmFzZTY0IH0gZnJvbSAnLi4vLi4vdXRpbC93ZWJTYWZlQmFzZTY0JztcblxuZGVzY3JpYmUoJ2JvdGgvdXRpbC93ZWJTYWZlQmFzZTY0JywgKCkgPT4ge1xuICBpdCgncm91bmR0cmlwcyB3aXRoIGFsbCBlbGVtZW50cycsICgpID0+IHtcbiAgICBjb25zdCBiYXNlNjQgPSAnWDBLam9BajNoN1R1OVlqSisrUGFtRmM0a0FnLy9ENEZLb21tQU5wUDQxST0nO1xuXG4gICAgY29uc3Qgd2ViU2FmZSA9IHRvV2ViU2FmZUJhc2U2NChiYXNlNjQpO1xuICAgIGNvbnN0IGFjdHVhbCA9IGZyb21XZWJTYWZlQmFzZTY0KHdlYlNhZmUpO1xuXG4gICAgYXNzZXJ0LnN0cmljdEVxdWFsKGJhc2U2NCwgYWN0dWFsKTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJyN0b1dlYlNhZmVCYXNlNjQnLCAoKSA9PiB7XG4gICAgaXQoJ3JlcGxhY2VzICsnLCAoKSA9PiB7XG4gICAgICBjb25zdCBiYXNlNjQgPSAnWCsreSc7XG4gICAgICBjb25zdCBleHBlY3RlZCA9ICdYLS15JztcbiAgICAgIGNvbnN0IGFjdHVhbCA9IHRvV2ViU2FmZUJhc2U2NChiYXNlNjQpO1xuXG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoZXhwZWN0ZWQsIGFjdHVhbCk7XG4gICAgfSk7XG5cbiAgICBpdCgncmVwbGFjZXMgLycsICgpID0+IHtcbiAgICAgIGNvbnN0IGJhc2U2NCA9ICdYLy95JztcbiAgICAgIGNvbnN0IGV4cGVjdGVkID0gJ1hfX3knO1xuICAgICAgY29uc3QgYWN0dWFsID0gdG9XZWJTYWZlQmFzZTY0KGJhc2U2NCk7XG5cbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChleHBlY3RlZCwgYWN0dWFsKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZW1vdmVzID0nLCAoKSA9PiB7XG4gICAgICBjb25zdCBiYXNlNjQgPSAnWD09PSc7XG4gICAgICBjb25zdCBleHBlY3RlZCA9ICdYJztcbiAgICAgIGNvbnN0IGFjdHVhbCA9IHRvV2ViU2FmZUJhc2U2NChiYXNlNjQpO1xuXG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoZXhwZWN0ZWQsIGFjdHVhbCk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCcjZnJvbVdlYlNhZmVCYXNlNjQnLCAoKSA9PiB7XG4gICAgaXQoJ3JlcGxhY2VzIC0nLCAoKSA9PiB7XG4gICAgICBjb25zdCB3ZWJTYWZlQmFzZTY0ID0gJ1gtLXknO1xuICAgICAgY29uc3QgZXhwZWN0ZWQgPSAnWCsreSc7XG4gICAgICBjb25zdCBhY3R1YWwgPSBmcm9tV2ViU2FmZUJhc2U2NCh3ZWJTYWZlQmFzZTY0KTtcblxuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGV4cGVjdGVkLCBhY3R1YWwpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JlcGxhY2VzIF8nLCAoKSA9PiB7XG4gICAgICBjb25zdCB3ZWJTYWZlQmFzZTY0ID0gJ1hfX3knO1xuICAgICAgY29uc3QgZXhwZWN0ZWQgPSAnWC8veSc7XG4gICAgICBjb25zdCBhY3R1YWwgPSBmcm9tV2ViU2FmZUJhc2U2NCh3ZWJTYWZlQmFzZTY0KTtcblxuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGV4cGVjdGVkLCBhY3R1YWwpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2FkZHMgPT09JywgKCkgPT4ge1xuICAgICAgY29uc3Qgd2ViU2FmZUJhc2U2NCA9ICdYJztcbiAgICAgIGNvbnN0IGV4cGVjdGVkID0gJ1g9PT0nO1xuICAgICAgY29uc3QgYWN0dWFsID0gZnJvbVdlYlNhZmVCYXNlNjQod2ViU2FmZUJhc2U2NCk7XG5cbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChleHBlY3RlZCwgYWN0dWFsKTtcbiAgICB9KTtcblxuICAgIGl0KCdhZGRzID09JywgKCkgPT4ge1xuICAgICAgY29uc3Qgd2ViU2FmZUJhc2U2NCA9ICdYeSc7XG4gICAgICBjb25zdCBleHBlY3RlZCA9ICdYeT09JztcbiAgICAgIGNvbnN0IGFjdHVhbCA9IGZyb21XZWJTYWZlQmFzZTY0KHdlYlNhZmVCYXNlNjQpO1xuXG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoZXhwZWN0ZWQsIGFjdHVhbCk7XG4gICAgfSk7XG5cbiAgICBpdCgnYWRkcyA9JywgKCkgPT4ge1xuICAgICAgY29uc3Qgd2ViU2FmZUJhc2U2NCA9ICdYeVonO1xuICAgICAgY29uc3QgZXhwZWN0ZWQgPSAnWHlaPSc7XG4gICAgICBjb25zdCBhY3R1YWwgPSBmcm9tV2ViU2FmZUJhc2U2NCh3ZWJTYWZlQmFzZTY0KTtcblxuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGV4cGVjdGVkLCBhY3R1YWwpO1xuICAgIH0pO1xuICB9KTtcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIkFBR0Esa0JBQXVCO0FBRXZCLDJCQUFtRDtBQUVuRCxTQUFTLDJCQUEyQixNQUFNO0FBQ3hDLEtBQUcsZ0NBQWdDLE1BQU07QUFDdkMsVUFBTSxTQUFTO0FBRWYsVUFBTSxVQUFVLDBDQUFnQixNQUFNO0FBQ3RDLFVBQU0sU0FBUyw0Q0FBa0IsT0FBTztBQUV4Qyx1QkFBTyxZQUFZLFFBQVEsTUFBTTtBQUFBLEVBQ25DLENBQUM7QUFFRCxXQUFTLG9CQUFvQixNQUFNO0FBQ2pDLE9BQUcsY0FBYyxNQUFNO0FBQ3JCLFlBQU0sU0FBUztBQUNmLFlBQU0sV0FBVztBQUNqQixZQUFNLFNBQVMsMENBQWdCLE1BQU07QUFFckMseUJBQU8sWUFBWSxVQUFVLE1BQU07QUFBQSxJQUNyQyxDQUFDO0FBRUQsT0FBRyxjQUFjLE1BQU07QUFDckIsWUFBTSxTQUFTO0FBQ2YsWUFBTSxXQUFXO0FBQ2pCLFlBQU0sU0FBUywwQ0FBZ0IsTUFBTTtBQUVyQyx5QkFBTyxZQUFZLFVBQVUsTUFBTTtBQUFBLElBQ3JDLENBQUM7QUFFRCxPQUFHLGFBQWEsTUFBTTtBQUNwQixZQUFNLFNBQVM7QUFDZixZQUFNLFdBQVc7QUFDakIsWUFBTSxTQUFTLDBDQUFnQixNQUFNO0FBRXJDLHlCQUFPLFlBQVksVUFBVSxNQUFNO0FBQUEsSUFDckMsQ0FBQztBQUFBLEVBQ0gsQ0FBQztBQUVELFdBQVMsc0JBQXNCLE1BQU07QUFDbkMsT0FBRyxjQUFjLE1BQU07QUFDckIsWUFBTSxnQkFBZ0I7QUFDdEIsWUFBTSxXQUFXO0FBQ2pCLFlBQU0sU0FBUyw0Q0FBa0IsYUFBYTtBQUU5Qyx5QkFBTyxZQUFZLFVBQVUsTUFBTTtBQUFBLElBQ3JDLENBQUM7QUFFRCxPQUFHLGNBQWMsTUFBTTtBQUNyQixZQUFNLGdCQUFnQjtBQUN0QixZQUFNLFdBQVc7QUFDakIsWUFBTSxTQUFTLDRDQUFrQixhQUFhO0FBRTlDLHlCQUFPLFlBQVksVUFBVSxNQUFNO0FBQUEsSUFDckMsQ0FBQztBQUVELE9BQUcsWUFBWSxNQUFNO0FBQ25CLFlBQU0sZ0JBQWdCO0FBQ3RCLFlBQU0sV0FBVztBQUNqQixZQUFNLFNBQVMsNENBQWtCLGFBQWE7QUFFOUMseUJBQU8sWUFBWSxVQUFVLE1BQU07QUFBQSxJQUNyQyxDQUFDO0FBRUQsT0FBRyxXQUFXLE1BQU07QUFDbEIsWUFBTSxnQkFBZ0I7QUFDdEIsWUFBTSxXQUFXO0FBQ2pCLFlBQU0sU0FBUyw0Q0FBa0IsYUFBYTtBQUU5Qyx5QkFBTyxZQUFZLFVBQVUsTUFBTTtBQUFBLElBQ3JDLENBQUM7QUFFRCxPQUFHLFVBQVUsTUFBTTtBQUNqQixZQUFNLGdCQUFnQjtBQUN0QixZQUFNLFdBQVc7QUFDakIsWUFBTSxTQUFTLDRDQUFrQixhQUFhO0FBRTlDLHlCQUFPLFlBQVksVUFBVSxNQUFNO0FBQUEsSUFDckMsQ0FBQztBQUFBLEVBQ0gsQ0FBQztBQUNILENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
