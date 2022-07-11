var import_chai = require("chai");
var import_getHttpErrorCode = require("../../../jobs/helpers/getHttpErrorCode");
describe("getHttpErrorCode", () => {
  it("returns -1 if not passed an object", () => {
    import_chai.assert.strictEqual((0, import_getHttpErrorCode.getHttpErrorCode)(void 0), -1);
    import_chai.assert.strictEqual((0, import_getHttpErrorCode.getHttpErrorCode)(null), -1);
    import_chai.assert.strictEqual((0, import_getHttpErrorCode.getHttpErrorCode)(404), -1);
  });
  it("returns -1 if passed an object lacking a valid code", () => {
    import_chai.assert.strictEqual((0, import_getHttpErrorCode.getHttpErrorCode)({}), -1);
    import_chai.assert.strictEqual((0, import_getHttpErrorCode.getHttpErrorCode)({ code: "garbage" }), -1);
    import_chai.assert.strictEqual((0, import_getHttpErrorCode.getHttpErrorCode)({ httpError: { code: "garbage" } }), -1);
  });
  it("returns the top-level error code if it exists", () => {
    import_chai.assert.strictEqual((0, import_getHttpErrorCode.getHttpErrorCode)({ code: 404 }), 404);
    import_chai.assert.strictEqual((0, import_getHttpErrorCode.getHttpErrorCode)({ code: "404" }), 404);
  });
  it("returns a nested error code if available", () => {
    import_chai.assert.strictEqual((0, import_getHttpErrorCode.getHttpErrorCode)({ httpError: { code: 404 } }), 404);
    import_chai.assert.strictEqual((0, import_getHttpErrorCode.getHttpErrorCode)({ httpError: { code: "404" } }), 404);
  });
  it('"prefers" the first valid error code it finds if there is ambiguity', () => {
    import_chai.assert.strictEqual((0, import_getHttpErrorCode.getHttpErrorCode)({ code: "404", httpError: { code: 999 } }), 404);
    import_chai.assert.strictEqual((0, import_getHttpErrorCode.getHttpErrorCode)({ code: "garbage", httpError: { code: 404 } }), 404);
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZ2V0SHR0cEVycm9yQ29kZV90ZXN0LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IGFzc2VydCB9IGZyb20gJ2NoYWknO1xuXG5pbXBvcnQgeyBnZXRIdHRwRXJyb3JDb2RlIH0gZnJvbSAnLi4vLi4vLi4vam9icy9oZWxwZXJzL2dldEh0dHBFcnJvckNvZGUnO1xuXG5kZXNjcmliZSgnZ2V0SHR0cEVycm9yQ29kZScsICgpID0+IHtcbiAgaXQoJ3JldHVybnMgLTEgaWYgbm90IHBhc3NlZCBhbiBvYmplY3QnLCAoKSA9PiB7XG4gICAgYXNzZXJ0LnN0cmljdEVxdWFsKGdldEh0dHBFcnJvckNvZGUodW5kZWZpbmVkKSwgLTEpO1xuICAgIGFzc2VydC5zdHJpY3RFcXVhbChnZXRIdHRwRXJyb3JDb2RlKG51bGwpLCAtMSk7XG4gICAgYXNzZXJ0LnN0cmljdEVxdWFsKGdldEh0dHBFcnJvckNvZGUoNDA0KSwgLTEpO1xuICB9KTtcblxuICBpdCgncmV0dXJucyAtMSBpZiBwYXNzZWQgYW4gb2JqZWN0IGxhY2tpbmcgYSB2YWxpZCBjb2RlJywgKCkgPT4ge1xuICAgIGFzc2VydC5zdHJpY3RFcXVhbChnZXRIdHRwRXJyb3JDb2RlKHt9KSwgLTEpO1xuICAgIGFzc2VydC5zdHJpY3RFcXVhbChnZXRIdHRwRXJyb3JDb2RlKHsgY29kZTogJ2dhcmJhZ2UnIH0pLCAtMSk7XG4gICAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgZ2V0SHR0cEVycm9yQ29kZSh7IGh0dHBFcnJvcjogeyBjb2RlOiAnZ2FyYmFnZScgfSB9KSxcbiAgICAgIC0xXG4gICAgKTtcbiAgfSk7XG5cbiAgaXQoJ3JldHVybnMgdGhlIHRvcC1sZXZlbCBlcnJvciBjb2RlIGlmIGl0IGV4aXN0cycsICgpID0+IHtcbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwoZ2V0SHR0cEVycm9yQ29kZSh7IGNvZGU6IDQwNCB9KSwgNDA0KTtcbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwoZ2V0SHR0cEVycm9yQ29kZSh7IGNvZGU6ICc0MDQnIH0pLCA0MDQpO1xuICB9KTtcblxuICBpdCgncmV0dXJucyBhIG5lc3RlZCBlcnJvciBjb2RlIGlmIGF2YWlsYWJsZScsICgpID0+IHtcbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwoZ2V0SHR0cEVycm9yQ29kZSh7IGh0dHBFcnJvcjogeyBjb2RlOiA0MDQgfSB9KSwgNDA0KTtcbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwoZ2V0SHR0cEVycm9yQ29kZSh7IGh0dHBFcnJvcjogeyBjb2RlOiAnNDA0JyB9IH0pLCA0MDQpO1xuICB9KTtcblxuICBpdCgnXCJwcmVmZXJzXCIgdGhlIGZpcnN0IHZhbGlkIGVycm9yIGNvZGUgaXQgZmluZHMgaWYgdGhlcmUgaXMgYW1iaWd1aXR5JywgKCkgPT4ge1xuICAgIGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgIGdldEh0dHBFcnJvckNvZGUoeyBjb2RlOiAnNDA0JywgaHR0cEVycm9yOiB7IGNvZGU6IDk5OSB9IH0pLFxuICAgICAgNDA0XG4gICAgKTtcbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwoXG4gICAgICBnZXRIdHRwRXJyb3JDb2RlKHsgY29kZTogJ2dhcmJhZ2UnLCBodHRwRXJyb3I6IHsgY29kZTogNDA0IH0gfSksXG4gICAgICA0MDRcbiAgICApO1xuICB9KTtcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIkFBR0Esa0JBQXVCO0FBRXZCLDhCQUFpQztBQUVqQyxTQUFTLG9CQUFvQixNQUFNO0FBQ2pDLEtBQUcsc0NBQXNDLE1BQU07QUFDN0MsdUJBQU8sWUFBWSw4Q0FBaUIsTUFBUyxHQUFHLEVBQUU7QUFDbEQsdUJBQU8sWUFBWSw4Q0FBaUIsSUFBSSxHQUFHLEVBQUU7QUFDN0MsdUJBQU8sWUFBWSw4Q0FBaUIsR0FBRyxHQUFHLEVBQUU7QUFBQSxFQUM5QyxDQUFDO0FBRUQsS0FBRyx1REFBdUQsTUFBTTtBQUM5RCx1QkFBTyxZQUFZLDhDQUFpQixDQUFDLENBQUMsR0FBRyxFQUFFO0FBQzNDLHVCQUFPLFlBQVksOENBQWlCLEVBQUUsTUFBTSxVQUFVLENBQUMsR0FBRyxFQUFFO0FBQzVELHVCQUFPLFlBQ0wsOENBQWlCLEVBQUUsV0FBVyxFQUFFLE1BQU0sVUFBVSxFQUFFLENBQUMsR0FDbkQsRUFDRjtBQUFBLEVBQ0YsQ0FBQztBQUVELEtBQUcsaURBQWlELE1BQU07QUFDeEQsdUJBQU8sWUFBWSw4Q0FBaUIsRUFBRSxNQUFNLElBQUksQ0FBQyxHQUFHLEdBQUc7QUFDdkQsdUJBQU8sWUFBWSw4Q0FBaUIsRUFBRSxNQUFNLE1BQU0sQ0FBQyxHQUFHLEdBQUc7QUFBQSxFQUMzRCxDQUFDO0FBRUQsS0FBRyw0Q0FBNEMsTUFBTTtBQUNuRCx1QkFBTyxZQUFZLDhDQUFpQixFQUFFLFdBQVcsRUFBRSxNQUFNLElBQUksRUFBRSxDQUFDLEdBQUcsR0FBRztBQUN0RSx1QkFBTyxZQUFZLDhDQUFpQixFQUFFLFdBQVcsRUFBRSxNQUFNLE1BQU0sRUFBRSxDQUFDLEdBQUcsR0FBRztBQUFBLEVBQzFFLENBQUM7QUFFRCxLQUFHLHVFQUF1RSxNQUFNO0FBQzlFLHVCQUFPLFlBQ0wsOENBQWlCLEVBQUUsTUFBTSxPQUFPLFdBQVcsRUFBRSxNQUFNLElBQUksRUFBRSxDQUFDLEdBQzFELEdBQ0Y7QUFDQSx1QkFBTyxZQUNMLDhDQUFpQixFQUFFLE1BQU0sV0FBVyxXQUFXLEVBQUUsTUFBTSxJQUFJLEVBQUUsQ0FBQyxHQUM5RCxHQUNGO0FBQUEsRUFDRixDQUFDO0FBQ0gsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
