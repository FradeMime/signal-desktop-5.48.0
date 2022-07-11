var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var import_chai = require("chai");
var durations = __toESM(require("../../util/durations"));
var import_exponentialBackoff = require("../../util/exponentialBackoff");
describe("exponential backoff utilities", () => {
  describe("exponentialBackoffSleepTime", () => {
    it("returns slowly growing values", () => {
      import_chai.assert.strictEqual((0, import_exponentialBackoff.exponentialBackoffSleepTime)(1), 0);
      import_chai.assert.strictEqual((0, import_exponentialBackoff.exponentialBackoffSleepTime)(2), 190);
      import_chai.assert.strictEqual((0, import_exponentialBackoff.exponentialBackoffSleepTime)(3), 361);
      import_chai.assert.approximately((0, import_exponentialBackoff.exponentialBackoffSleepTime)(4), 686, 1);
      import_chai.assert.approximately((0, import_exponentialBackoff.exponentialBackoffSleepTime)(5), 1303, 1);
    });
    it("plateaus at a maximum after 15 attempts", () => {
      const maximum = 15 * durations.MINUTE;
      for (let attempt = 16; attempt < 100; attempt += 1) {
        import_chai.assert.strictEqual((0, import_exponentialBackoff.exponentialBackoffSleepTime)(attempt), maximum);
      }
    });
  });
  describe("exponentialBackoffMaxAttempts", () => {
    it("returns 2 attempts for a short period of time", () => {
      import_chai.assert.strictEqual((0, import_exponentialBackoff.exponentialBackoffMaxAttempts)(1), 2);
      import_chai.assert.strictEqual((0, import_exponentialBackoff.exponentialBackoffMaxAttempts)(99), 2);
    });
    it("returns 6 attempts for a 5 seconds", () => {
      import_chai.assert.strictEqual((0, import_exponentialBackoff.exponentialBackoffMaxAttempts)(5e3), 6);
    });
    it("returns 110 attempts for 1 day", () => {
      import_chai.assert.strictEqual((0, import_exponentialBackoff.exponentialBackoffMaxAttempts)(durations.DAY), 110);
    });
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZXhwb25lbnRpYWxCYWNrb2ZmX3Rlc3QudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSAnY2hhaSc7XG5pbXBvcnQgKiBhcyBkdXJhdGlvbnMgZnJvbSAnLi4vLi4vdXRpbC9kdXJhdGlvbnMnO1xuXG5pbXBvcnQge1xuICBleHBvbmVudGlhbEJhY2tvZmZTbGVlcFRpbWUsXG4gIGV4cG9uZW50aWFsQmFja29mZk1heEF0dGVtcHRzLFxufSBmcm9tICcuLi8uLi91dGlsL2V4cG9uZW50aWFsQmFja29mZic7XG5cbmRlc2NyaWJlKCdleHBvbmVudGlhbCBiYWNrb2ZmIHV0aWxpdGllcycsICgpID0+IHtcbiAgZGVzY3JpYmUoJ2V4cG9uZW50aWFsQmFja29mZlNsZWVwVGltZScsICgpID0+IHtcbiAgICBpdCgncmV0dXJucyBzbG93bHkgZ3Jvd2luZyB2YWx1ZXMnLCAoKSA9PiB7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoZXhwb25lbnRpYWxCYWNrb2ZmU2xlZXBUaW1lKDEpLCAwKTtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChleHBvbmVudGlhbEJhY2tvZmZTbGVlcFRpbWUoMiksIDE5MCk7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoZXhwb25lbnRpYWxCYWNrb2ZmU2xlZXBUaW1lKDMpLCAzNjEpO1xuICAgICAgYXNzZXJ0LmFwcHJveGltYXRlbHkoZXhwb25lbnRpYWxCYWNrb2ZmU2xlZXBUaW1lKDQpLCA2ODYsIDEpO1xuICAgICAgYXNzZXJ0LmFwcHJveGltYXRlbHkoZXhwb25lbnRpYWxCYWNrb2ZmU2xlZXBUaW1lKDUpLCAxMzAzLCAxKTtcbiAgICB9KTtcblxuICAgIGl0KCdwbGF0ZWF1cyBhdCBhIG1heGltdW0gYWZ0ZXIgMTUgYXR0ZW1wdHMnLCAoKSA9PiB7XG4gICAgICBjb25zdCBtYXhpbXVtID0gMTUgKiBkdXJhdGlvbnMuTUlOVVRFO1xuICAgICAgZm9yIChsZXQgYXR0ZW1wdCA9IDE2OyBhdHRlbXB0IDwgMTAwOyBhdHRlbXB0ICs9IDEpIHtcbiAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGV4cG9uZW50aWFsQmFja29mZlNsZWVwVGltZShhdHRlbXB0KSwgbWF4aW11bSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdleHBvbmVudGlhbEJhY2tvZmZNYXhBdHRlbXB0cycsICgpID0+IHtcbiAgICBpdCgncmV0dXJucyAyIGF0dGVtcHRzIGZvciBhIHNob3J0IHBlcmlvZCBvZiB0aW1lJywgKCkgPT4ge1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGV4cG9uZW50aWFsQmFja29mZk1heEF0dGVtcHRzKDEpLCAyKTtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChleHBvbmVudGlhbEJhY2tvZmZNYXhBdHRlbXB0cyg5OSksIDIpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgNiBhdHRlbXB0cyBmb3IgYSA1IHNlY29uZHMnLCAoKSA9PiB7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoZXhwb25lbnRpYWxCYWNrb2ZmTWF4QXR0ZW1wdHMoNTAwMCksIDYpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgMTEwIGF0dGVtcHRzIGZvciAxIGRheScsICgpID0+IHtcbiAgICAgIC8vIFRoaXMgaXMgYSB0ZXN0IGNhc2UgdGhhdCBpcyBsaWZ0ZWQgZnJvbSBpT1MncyBjb2RlYmFzZS5cbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChleHBvbmVudGlhbEJhY2tvZmZNYXhBdHRlbXB0cyhkdXJhdGlvbnMuREFZKSwgMTEwKTtcbiAgICB9KTtcbiAgfSk7XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7OztBQUdBLGtCQUF1QjtBQUN2QixnQkFBMkI7QUFFM0IsZ0NBR087QUFFUCxTQUFTLGlDQUFpQyxNQUFNO0FBQzlDLFdBQVMsK0JBQStCLE1BQU07QUFDNUMsT0FBRyxpQ0FBaUMsTUFBTTtBQUN4Qyx5QkFBTyxZQUFZLDJEQUE0QixDQUFDLEdBQUcsQ0FBQztBQUNwRCx5QkFBTyxZQUFZLDJEQUE0QixDQUFDLEdBQUcsR0FBRztBQUN0RCx5QkFBTyxZQUFZLDJEQUE0QixDQUFDLEdBQUcsR0FBRztBQUN0RCx5QkFBTyxjQUFjLDJEQUE0QixDQUFDLEdBQUcsS0FBSyxDQUFDO0FBQzNELHlCQUFPLGNBQWMsMkRBQTRCLENBQUMsR0FBRyxNQUFNLENBQUM7QUFBQSxJQUM5RCxDQUFDO0FBRUQsT0FBRywyQ0FBMkMsTUFBTTtBQUNsRCxZQUFNLFVBQVUsS0FBSyxVQUFVO0FBQy9CLGVBQVMsVUFBVSxJQUFJLFVBQVUsS0FBSyxXQUFXLEdBQUc7QUFDbEQsMkJBQU8sWUFBWSwyREFBNEIsT0FBTyxHQUFHLE9BQU87QUFBQSxNQUNsRTtBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0gsQ0FBQztBQUVELFdBQVMsaUNBQWlDLE1BQU07QUFDOUMsT0FBRyxpREFBaUQsTUFBTTtBQUN4RCx5QkFBTyxZQUFZLDZEQUE4QixDQUFDLEdBQUcsQ0FBQztBQUN0RCx5QkFBTyxZQUFZLDZEQUE4QixFQUFFLEdBQUcsQ0FBQztBQUFBLElBQ3pELENBQUM7QUFFRCxPQUFHLHNDQUFzQyxNQUFNO0FBQzdDLHlCQUFPLFlBQVksNkRBQThCLEdBQUksR0FBRyxDQUFDO0FBQUEsSUFDM0QsQ0FBQztBQUVELE9BQUcsa0NBQWtDLE1BQU07QUFFekMseUJBQU8sWUFBWSw2REFBOEIsVUFBVSxHQUFHLEdBQUcsR0FBRztBQUFBLElBQ3RFLENBQUM7QUFBQSxFQUNILENBQUM7QUFDSCxDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
