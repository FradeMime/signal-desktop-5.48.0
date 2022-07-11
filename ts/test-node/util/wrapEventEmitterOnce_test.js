var import_chai = require("chai");
var import_events = require("events");
var import_wrapEventEmitterOnce = require("../../util/wrapEventEmitterOnce");
describe("wrapEventEmitterOnce", () => {
  let ee;
  beforeEach(() => {
    ee = new import_events.EventEmitter();
  });
  it("should get the event arguments", async () => {
    const result = (0, import_wrapEventEmitterOnce.wrapEventEmitterOnce)(ee, "result");
    ee.emit("result", 1, 2, 3);
    import_chai.assert.deepStrictEqual(await result, [1, 2, 3]);
  });
  it("should handle error event", async () => {
    const result = (0, import_wrapEventEmitterOnce.wrapEventEmitterOnce)(ee, "result");
    ee.emit("error", new Error("aha!"));
    await import_chai.assert.isRejected(result, "aha!");
  });
  it("should stop handling error event after result", async () => {
    const result = (0, import_wrapEventEmitterOnce.wrapEventEmitterOnce)(ee, "result");
    ee.emit("result", "okay");
    import_chai.assert.deepStrictEqual(await result, ["okay"]);
    import_chai.assert.strictEqual(ee.listeners("error").length, 0);
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsid3JhcEV2ZW50RW1pdHRlck9uY2VfdGVzdC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyBhc3NlcnQgfSBmcm9tICdjaGFpJztcbmltcG9ydCB7IEV2ZW50RW1pdHRlciB9IGZyb20gJ2V2ZW50cyc7XG5cbmltcG9ydCB7IHdyYXBFdmVudEVtaXR0ZXJPbmNlIGFzIG9uY2UgfSBmcm9tICcuLi8uLi91dGlsL3dyYXBFdmVudEVtaXR0ZXJPbmNlJztcblxuZGVzY3JpYmUoJ3dyYXBFdmVudEVtaXR0ZXJPbmNlJywgKCkgPT4ge1xuICBsZXQgZWU6IEV2ZW50RW1pdHRlcjtcblxuICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICBlZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgfSk7XG5cbiAgaXQoJ3Nob3VsZCBnZXQgdGhlIGV2ZW50IGFyZ3VtZW50cycsIGFzeW5jICgpID0+IHtcbiAgICBjb25zdCByZXN1bHQgPSBvbmNlKGVlLCAncmVzdWx0Jyk7XG5cbiAgICBlZS5lbWl0KCdyZXN1bHQnLCAxLCAyLCAzKTtcblxuICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwoYXdhaXQgcmVzdWx0LCBbMSwgMiwgM10pO1xuICB9KTtcblxuICBpdCgnc2hvdWxkIGhhbmRsZSBlcnJvciBldmVudCcsIGFzeW5jICgpID0+IHtcbiAgICBjb25zdCByZXN1bHQgPSBvbmNlKGVlLCAncmVzdWx0Jyk7XG5cbiAgICBlZS5lbWl0KCdlcnJvcicsIG5ldyBFcnJvcignYWhhIScpKTtcblxuICAgIGF3YWl0IGFzc2VydC5pc1JlamVjdGVkKHJlc3VsdCwgJ2FoYSEnKTtcbiAgfSk7XG5cbiAgaXQoJ3Nob3VsZCBzdG9wIGhhbmRsaW5nIGVycm9yIGV2ZW50IGFmdGVyIHJlc3VsdCcsIGFzeW5jICgpID0+IHtcbiAgICBjb25zdCByZXN1bHQgPSBvbmNlKGVlLCAncmVzdWx0Jyk7XG5cbiAgICBlZS5lbWl0KCdyZXN1bHQnLCAnb2theScpO1xuXG4gICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChhd2FpdCByZXN1bHQsIFsnb2theSddKTtcbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwoZWUubGlzdGVuZXJzKCdlcnJvcicpLmxlbmd0aCwgMCk7XG4gIH0pO1xufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiQUFHQSxrQkFBdUI7QUFDdkIsb0JBQTZCO0FBRTdCLGtDQUE2QztBQUU3QyxTQUFTLHdCQUF3QixNQUFNO0FBQ3JDLE1BQUk7QUFFSixhQUFXLE1BQU07QUFDZixTQUFLLElBQUksMkJBQWE7QUFBQSxFQUN4QixDQUFDO0FBRUQsS0FBRyxrQ0FBa0MsWUFBWTtBQUMvQyxVQUFNLFNBQVMsc0RBQUssSUFBSSxRQUFRO0FBRWhDLE9BQUcsS0FBSyxVQUFVLEdBQUcsR0FBRyxDQUFDO0FBRXpCLHVCQUFPLGdCQUFnQixNQUFNLFFBQVEsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO0FBQUEsRUFDaEQsQ0FBQztBQUVELEtBQUcsNkJBQTZCLFlBQVk7QUFDMUMsVUFBTSxTQUFTLHNEQUFLLElBQUksUUFBUTtBQUVoQyxPQUFHLEtBQUssU0FBUyxJQUFJLE1BQU0sTUFBTSxDQUFDO0FBRWxDLFVBQU0sbUJBQU8sV0FBVyxRQUFRLE1BQU07QUFBQSxFQUN4QyxDQUFDO0FBRUQsS0FBRyxpREFBaUQsWUFBWTtBQUM5RCxVQUFNLFNBQVMsc0RBQUssSUFBSSxRQUFRO0FBRWhDLE9BQUcsS0FBSyxVQUFVLE1BQU07QUFFeEIsdUJBQU8sZ0JBQWdCLE1BQU0sUUFBUSxDQUFDLE1BQU0sQ0FBQztBQUM3Qyx1QkFBTyxZQUFZLEdBQUcsVUFBVSxPQUFPLEVBQUUsUUFBUSxDQUFDO0FBQUEsRUFDcEQsQ0FBQztBQUNILENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
