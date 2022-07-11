var import_chai = require("chai");
var import_protocol_filter = require("../../../app/protocol_filter");
describe("Protocol Filter", () => {
  describe("_urlToPath", () => {
    it("returns proper file path for unix style file URI with hash", () => {
      const path = "file:///Users/someone/Development/signal/electron/background.html#first-page";
      const expected = "/Users/someone/Development/signal/electron/background.html";
      const actual = (0, import_protocol_filter._urlToPath)(path);
      import_chai.assert.strictEqual(actual, expected);
    });
    it("returns proper file path for unix style file URI with querystring", () => {
      const path = "file:///Users/someone/Development/signal/electron/background.html?name=Signal&locale=en&version=2.4.0";
      const expected = "/Users/someone/Development/signal/electron/background.html";
      const actual = (0, import_protocol_filter._urlToPath)(path);
      import_chai.assert.strictEqual(actual, expected);
    });
    it("returns proper file path for unix style file URI with hash and querystring", () => {
      const path = "file:///Users/someone/Development/signal/electron/background.html#somewhere?name=Signal";
      const expected = "/Users/someone/Development/signal/electron/background.html";
      const actual = (0, import_protocol_filter._urlToPath)(path);
      import_chai.assert.strictEqual(actual, expected);
    });
    it("returns proper file path for file URI on windows", () => {
      const path = "file:///C:/Users/Someone/dev/desktop/background.html?name=Signal&locale=en&version=2.4.0";
      const expected = "C:/Users/Someone/dev/desktop/background.html";
      const isWindows = true;
      const actual = (0, import_protocol_filter._urlToPath)(path, { isWindows });
      import_chai.assert.strictEqual(actual, expected);
    });
    it("translates from URL format to filesystem format", () => {
      const path = "file:///Users/someone/Development%20Files/signal/electron/background.html";
      const expected = "/Users/someone/Development Files/signal/electron/background.html";
      const actual = (0, import_protocol_filter._urlToPath)(path);
      import_chai.assert.strictEqual(actual, expected);
    });
    it("translates from URL format to filesystem format", () => {
      const path = "file:///Users/someone/Development%20Files/signal/electron/background.html";
      const expected = "/Users/someone/Development Files/signal/electron/background.html";
      const actual = (0, import_protocol_filter._urlToPath)(path);
      import_chai.assert.strictEqual(actual, expected);
    });
    it("handles UNC path", () => {
      const path = "//share/path";
      const expected = "//share/path";
      const actual = (0, import_protocol_filter._urlToPath)(path);
      import_chai.assert.strictEqual(actual, expected);
    });
    it("handles UNC path on windows", () => {
      const path = "//share/path";
      const expected = "//share/path";
      const isWindows = true;
      const actual = (0, import_protocol_filter._urlToPath)(path, { isWindows });
      import_chai.assert.strictEqual(actual, expected);
    });
    it("handles simple relative path", () => {
      const path = "file://relative/path";
      const expected = "relative/path";
      const actual = (0, import_protocol_filter._urlToPath)(path);
      import_chai.assert.strictEqual(actual, expected);
    });
    it("handles simple relative path on Windows", () => {
      const path = "file://relative/path";
      const expected = "elative/path";
      const isWindows = true;
      const actual = (0, import_protocol_filter._urlToPath)(path, { isWindows });
      import_chai.assert.strictEqual(actual, expected);
    });
    it("hands back a path with .. in it", () => {
      const path = "file://../../..";
      const expected = "../../..";
      const actual = (0, import_protocol_filter._urlToPath)(path);
      import_chai.assert.strictEqual(actual, expected);
    });
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsicHJvdG9jb2xfZmlsdGVyX3Rlc3QudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDE4LTIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyBhc3NlcnQgfSBmcm9tICdjaGFpJztcblxuaW1wb3J0IHsgX3VybFRvUGF0aCB9IGZyb20gJy4uLy4uLy4uL2FwcC9wcm90b2NvbF9maWx0ZXInO1xuXG5kZXNjcmliZSgnUHJvdG9jb2wgRmlsdGVyJywgKCkgPT4ge1xuICBkZXNjcmliZSgnX3VybFRvUGF0aCcsICgpID0+IHtcbiAgICBpdCgncmV0dXJucyBwcm9wZXIgZmlsZSBwYXRoIGZvciB1bml4IHN0eWxlIGZpbGUgVVJJIHdpdGggaGFzaCcsICgpID0+IHtcbiAgICAgIGNvbnN0IHBhdGggPVxuICAgICAgICAnZmlsZTovLy9Vc2Vycy9zb21lb25lL0RldmVsb3BtZW50L3NpZ25hbC9lbGVjdHJvbi9iYWNrZ3JvdW5kLmh0bWwjZmlyc3QtcGFnZSc7XG4gICAgICBjb25zdCBleHBlY3RlZCA9XG4gICAgICAgICcvVXNlcnMvc29tZW9uZS9EZXZlbG9wbWVudC9zaWduYWwvZWxlY3Ryb24vYmFja2dyb3VuZC5odG1sJztcblxuICAgICAgY29uc3QgYWN0dWFsID0gX3VybFRvUGF0aChwYXRoKTtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChhY3R1YWwsIGV4cGVjdGVkKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIHByb3BlciBmaWxlIHBhdGggZm9yIHVuaXggc3R5bGUgZmlsZSBVUkkgd2l0aCBxdWVyeXN0cmluZycsICgpID0+IHtcbiAgICAgIGNvbnN0IHBhdGggPVxuICAgICAgICAnZmlsZTovLy9Vc2Vycy9zb21lb25lL0RldmVsb3BtZW50L3NpZ25hbC9lbGVjdHJvbi9iYWNrZ3JvdW5kLmh0bWw/bmFtZT1TaWduYWwmbG9jYWxlPWVuJnZlcnNpb249Mi40LjAnO1xuICAgICAgY29uc3QgZXhwZWN0ZWQgPVxuICAgICAgICAnL1VzZXJzL3NvbWVvbmUvRGV2ZWxvcG1lbnQvc2lnbmFsL2VsZWN0cm9uL2JhY2tncm91bmQuaHRtbCc7XG5cbiAgICAgIGNvbnN0IGFjdHVhbCA9IF91cmxUb1BhdGgocGF0aCk7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoYWN0dWFsLCBleHBlY3RlZCk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyBwcm9wZXIgZmlsZSBwYXRoIGZvciB1bml4IHN0eWxlIGZpbGUgVVJJIHdpdGggaGFzaCBhbmQgcXVlcnlzdHJpbmcnLCAoKSA9PiB7XG4gICAgICBjb25zdCBwYXRoID1cbiAgICAgICAgJ2ZpbGU6Ly8vVXNlcnMvc29tZW9uZS9EZXZlbG9wbWVudC9zaWduYWwvZWxlY3Ryb24vYmFja2dyb3VuZC5odG1sI3NvbWV3aGVyZT9uYW1lPVNpZ25hbCc7XG4gICAgICBjb25zdCBleHBlY3RlZCA9XG4gICAgICAgICcvVXNlcnMvc29tZW9uZS9EZXZlbG9wbWVudC9zaWduYWwvZWxlY3Ryb24vYmFja2dyb3VuZC5odG1sJztcblxuICAgICAgY29uc3QgYWN0dWFsID0gX3VybFRvUGF0aChwYXRoKTtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChhY3R1YWwsIGV4cGVjdGVkKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIHByb3BlciBmaWxlIHBhdGggZm9yIGZpbGUgVVJJIG9uIHdpbmRvd3MnLCAoKSA9PiB7XG4gICAgICBjb25zdCBwYXRoID1cbiAgICAgICAgJ2ZpbGU6Ly8vQzovVXNlcnMvU29tZW9uZS9kZXYvZGVza3RvcC9iYWNrZ3JvdW5kLmh0bWw/bmFtZT1TaWduYWwmbG9jYWxlPWVuJnZlcnNpb249Mi40LjAnO1xuICAgICAgY29uc3QgZXhwZWN0ZWQgPSAnQzovVXNlcnMvU29tZW9uZS9kZXYvZGVza3RvcC9iYWNrZ3JvdW5kLmh0bWwnO1xuICAgICAgY29uc3QgaXNXaW5kb3dzID0gdHJ1ZTtcblxuICAgICAgY29uc3QgYWN0dWFsID0gX3VybFRvUGF0aChwYXRoLCB7IGlzV2luZG93cyB9KTtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChhY3R1YWwsIGV4cGVjdGVkKTtcbiAgICB9KTtcblxuICAgIGl0KCd0cmFuc2xhdGVzIGZyb20gVVJMIGZvcm1hdCB0byBmaWxlc3lzdGVtIGZvcm1hdCcsICgpID0+IHtcbiAgICAgIGNvbnN0IHBhdGggPVxuICAgICAgICAnZmlsZTovLy9Vc2Vycy9zb21lb25lL0RldmVsb3BtZW50JTIwRmlsZXMvc2lnbmFsL2VsZWN0cm9uL2JhY2tncm91bmQuaHRtbCc7XG4gICAgICBjb25zdCBleHBlY3RlZCA9XG4gICAgICAgICcvVXNlcnMvc29tZW9uZS9EZXZlbG9wbWVudCBGaWxlcy9zaWduYWwvZWxlY3Ryb24vYmFja2dyb3VuZC5odG1sJztcblxuICAgICAgY29uc3QgYWN0dWFsID0gX3VybFRvUGF0aChwYXRoKTtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChhY3R1YWwsIGV4cGVjdGVkKTtcbiAgICB9KTtcblxuICAgIGl0KCd0cmFuc2xhdGVzIGZyb20gVVJMIGZvcm1hdCB0byBmaWxlc3lzdGVtIGZvcm1hdCcsICgpID0+IHtcbiAgICAgIGNvbnN0IHBhdGggPVxuICAgICAgICAnZmlsZTovLy9Vc2Vycy9zb21lb25lL0RldmVsb3BtZW50JTIwRmlsZXMvc2lnbmFsL2VsZWN0cm9uL2JhY2tncm91bmQuaHRtbCc7XG4gICAgICBjb25zdCBleHBlY3RlZCA9XG4gICAgICAgICcvVXNlcnMvc29tZW9uZS9EZXZlbG9wbWVudCBGaWxlcy9zaWduYWwvZWxlY3Ryb24vYmFja2dyb3VuZC5odG1sJztcblxuICAgICAgY29uc3QgYWN0dWFsID0gX3VybFRvUGF0aChwYXRoKTtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChhY3R1YWwsIGV4cGVjdGVkKTtcbiAgICB9KTtcblxuICAgIGl0KCdoYW5kbGVzIFVOQyBwYXRoJywgKCkgPT4ge1xuICAgICAgY29uc3QgcGF0aCA9ICcvL3NoYXJlL3BhdGgnO1xuICAgICAgY29uc3QgZXhwZWN0ZWQgPSAnLy9zaGFyZS9wYXRoJztcblxuICAgICAgY29uc3QgYWN0dWFsID0gX3VybFRvUGF0aChwYXRoKTtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChhY3R1YWwsIGV4cGVjdGVkKTtcbiAgICB9KTtcblxuICAgIGl0KCdoYW5kbGVzIFVOQyBwYXRoIG9uIHdpbmRvd3MnLCAoKSA9PiB7XG4gICAgICBjb25zdCBwYXRoID0gJy8vc2hhcmUvcGF0aCc7XG4gICAgICBjb25zdCBleHBlY3RlZCA9ICcvL3NoYXJlL3BhdGgnO1xuICAgICAgY29uc3QgaXNXaW5kb3dzID0gdHJ1ZTtcblxuICAgICAgY29uc3QgYWN0dWFsID0gX3VybFRvUGF0aChwYXRoLCB7IGlzV2luZG93cyB9KTtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChhY3R1YWwsIGV4cGVjdGVkKTtcbiAgICB9KTtcblxuICAgIGl0KCdoYW5kbGVzIHNpbXBsZSByZWxhdGl2ZSBwYXRoJywgKCkgPT4ge1xuICAgICAgY29uc3QgcGF0aCA9ICdmaWxlOi8vcmVsYXRpdmUvcGF0aCc7XG4gICAgICBjb25zdCBleHBlY3RlZCA9ICdyZWxhdGl2ZS9wYXRoJztcblxuICAgICAgY29uc3QgYWN0dWFsID0gX3VybFRvUGF0aChwYXRoKTtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChhY3R1YWwsIGV4cGVjdGVkKTtcbiAgICB9KTtcblxuICAgIGl0KCdoYW5kbGVzIHNpbXBsZSByZWxhdGl2ZSBwYXRoIG9uIFdpbmRvd3MnLCAoKSA9PiB7XG4gICAgICBjb25zdCBwYXRoID0gJ2ZpbGU6Ly9yZWxhdGl2ZS9wYXRoJztcbiAgICAgIGNvbnN0IGV4cGVjdGVkID0gJ2VsYXRpdmUvcGF0aCc7XG4gICAgICBjb25zdCBpc1dpbmRvd3MgPSB0cnVlO1xuXG4gICAgICBjb25zdCBhY3R1YWwgPSBfdXJsVG9QYXRoKHBhdGgsIHsgaXNXaW5kb3dzIH0pO1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2hhbmRzIGJhY2sgYSBwYXRoIHdpdGggLi4gaW4gaXQnLCAoKSA9PiB7XG4gICAgICBjb25zdCBwYXRoID0gJ2ZpbGU6Ly8uLi8uLi8uLic7XG4gICAgICBjb25zdCBleHBlY3RlZCA9ICcuLi8uLi8uLic7XG5cbiAgICAgIGNvbnN0IGFjdHVhbCA9IF91cmxUb1BhdGgocGF0aCk7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoYWN0dWFsLCBleHBlY3RlZCk7XG4gICAgfSk7XG4gIH0pO1xufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiQUFHQSxrQkFBdUI7QUFFdkIsNkJBQTJCO0FBRTNCLFNBQVMsbUJBQW1CLE1BQU07QUFDaEMsV0FBUyxjQUFjLE1BQU07QUFDM0IsT0FBRyw4REFBOEQsTUFBTTtBQUNyRSxZQUFNLE9BQ0o7QUFDRixZQUFNLFdBQ0o7QUFFRixZQUFNLFNBQVMsdUNBQVcsSUFBSTtBQUM5Qix5QkFBTyxZQUFZLFFBQVEsUUFBUTtBQUFBLElBQ3JDLENBQUM7QUFFRCxPQUFHLHFFQUFxRSxNQUFNO0FBQzVFLFlBQU0sT0FDSjtBQUNGLFlBQU0sV0FDSjtBQUVGLFlBQU0sU0FBUyx1Q0FBVyxJQUFJO0FBQzlCLHlCQUFPLFlBQVksUUFBUSxRQUFRO0FBQUEsSUFDckMsQ0FBQztBQUVELE9BQUcsOEVBQThFLE1BQU07QUFDckYsWUFBTSxPQUNKO0FBQ0YsWUFBTSxXQUNKO0FBRUYsWUFBTSxTQUFTLHVDQUFXLElBQUk7QUFDOUIseUJBQU8sWUFBWSxRQUFRLFFBQVE7QUFBQSxJQUNyQyxDQUFDO0FBRUQsT0FBRyxvREFBb0QsTUFBTTtBQUMzRCxZQUFNLE9BQ0o7QUFDRixZQUFNLFdBQVc7QUFDakIsWUFBTSxZQUFZO0FBRWxCLFlBQU0sU0FBUyx1Q0FBVyxNQUFNLEVBQUUsVUFBVSxDQUFDO0FBQzdDLHlCQUFPLFlBQVksUUFBUSxRQUFRO0FBQUEsSUFDckMsQ0FBQztBQUVELE9BQUcsbURBQW1ELE1BQU07QUFDMUQsWUFBTSxPQUNKO0FBQ0YsWUFBTSxXQUNKO0FBRUYsWUFBTSxTQUFTLHVDQUFXLElBQUk7QUFDOUIseUJBQU8sWUFBWSxRQUFRLFFBQVE7QUFBQSxJQUNyQyxDQUFDO0FBRUQsT0FBRyxtREFBbUQsTUFBTTtBQUMxRCxZQUFNLE9BQ0o7QUFDRixZQUFNLFdBQ0o7QUFFRixZQUFNLFNBQVMsdUNBQVcsSUFBSTtBQUM5Qix5QkFBTyxZQUFZLFFBQVEsUUFBUTtBQUFBLElBQ3JDLENBQUM7QUFFRCxPQUFHLG9CQUFvQixNQUFNO0FBQzNCLFlBQU0sT0FBTztBQUNiLFlBQU0sV0FBVztBQUVqQixZQUFNLFNBQVMsdUNBQVcsSUFBSTtBQUM5Qix5QkFBTyxZQUFZLFFBQVEsUUFBUTtBQUFBLElBQ3JDLENBQUM7QUFFRCxPQUFHLCtCQUErQixNQUFNO0FBQ3RDLFlBQU0sT0FBTztBQUNiLFlBQU0sV0FBVztBQUNqQixZQUFNLFlBQVk7QUFFbEIsWUFBTSxTQUFTLHVDQUFXLE1BQU0sRUFBRSxVQUFVLENBQUM7QUFDN0MseUJBQU8sWUFBWSxRQUFRLFFBQVE7QUFBQSxJQUNyQyxDQUFDO0FBRUQsT0FBRyxnQ0FBZ0MsTUFBTTtBQUN2QyxZQUFNLE9BQU87QUFDYixZQUFNLFdBQVc7QUFFakIsWUFBTSxTQUFTLHVDQUFXLElBQUk7QUFDOUIseUJBQU8sWUFBWSxRQUFRLFFBQVE7QUFBQSxJQUNyQyxDQUFDO0FBRUQsT0FBRywyQ0FBMkMsTUFBTTtBQUNsRCxZQUFNLE9BQU87QUFDYixZQUFNLFdBQVc7QUFDakIsWUFBTSxZQUFZO0FBRWxCLFlBQU0sU0FBUyx1Q0FBVyxNQUFNLEVBQUUsVUFBVSxDQUFDO0FBQzdDLHlCQUFPLFlBQVksUUFBUSxRQUFRO0FBQUEsSUFDckMsQ0FBQztBQUVELE9BQUcsbUNBQW1DLE1BQU07QUFDMUMsWUFBTSxPQUFPO0FBQ2IsWUFBTSxXQUFXO0FBRWpCLFlBQU0sU0FBUyx1Q0FBVyxJQUFJO0FBQzlCLHlCQUFPLFlBQVksUUFBUSxRQUFRO0FBQUEsSUFDckMsQ0FBQztBQUFBLEVBQ0gsQ0FBQztBQUNILENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
