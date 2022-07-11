var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
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
var sinon = __toESM(require("sinon"));
var import_getUserAgent = require("../../util/getUserAgent");
describe("getUserAgent", () => {
  beforeEach(/* @__PURE__ */ __name(function beforeEach2() {
    this.sandbox = sinon.createSandbox();
  }, "beforeEach"));
  afterEach(/* @__PURE__ */ __name(function afterEach2() {
    this.sandbox.restore();
  }, "afterEach"));
  it("returns the right User-Agent on Windows", function test() {
    this.sandbox.stub(process, "platform").get(() => "win32");
    import_chai.assert.strictEqual((0, import_getUserAgent.getUserAgent)("1.2.3", "10.0.22000"), "Signal-Desktop/1.2.3 Windows 10.0.22000");
  });
  it("returns the right User-Agent on macOS", function test() {
    this.sandbox.stub(process, "platform").get(() => "darwin");
    import_chai.assert.strictEqual((0, import_getUserAgent.getUserAgent)("1.2.3", "21.5.0"), "Signal-Desktop/1.2.3 macOS 21.5.0");
  });
  it("returns the right User-Agent on Linux", function test() {
    this.sandbox.stub(process, "platform").get(() => "linux");
    import_chai.assert.strictEqual((0, import_getUserAgent.getUserAgent)("1.2.3", "20.04"), "Signal-Desktop/1.2.3 Linux 20.04");
  });
  it("omits the platform on unsupported platforms", function test() {
    this.sandbox.stub(process, "platform").get(() => "freebsd");
    import_chai.assert.strictEqual((0, import_getUserAgent.getUserAgent)("1.2.3", "13.1"), "Signal-Desktop/1.2.3");
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZ2V0VXNlckFnZW50X3Rlc3QudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIwIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSAnY2hhaSc7XG5pbXBvcnQgKiBhcyBzaW5vbiBmcm9tICdzaW5vbic7XG5cbmltcG9ydCB7IGdldFVzZXJBZ2VudCB9IGZyb20gJy4uLy4uL3V0aWwvZ2V0VXNlckFnZW50JztcblxuZGVzY3JpYmUoJ2dldFVzZXJBZ2VudCcsICgpID0+IHtcbiAgYmVmb3JlRWFjaChmdW5jdGlvbiBiZWZvcmVFYWNoKCkge1xuICAgIHRoaXMuc2FuZGJveCA9IHNpbm9uLmNyZWF0ZVNhbmRib3goKTtcbiAgfSk7XG5cbiAgYWZ0ZXJFYWNoKGZ1bmN0aW9uIGFmdGVyRWFjaCgpIHtcbiAgICB0aGlzLnNhbmRib3gucmVzdG9yZSgpO1xuICB9KTtcblxuICBpdCgncmV0dXJucyB0aGUgcmlnaHQgVXNlci1BZ2VudCBvbiBXaW5kb3dzJywgZnVuY3Rpb24gdGVzdCgpIHtcbiAgICB0aGlzLnNhbmRib3guc3R1Yihwcm9jZXNzLCAncGxhdGZvcm0nKS5nZXQoKCkgPT4gJ3dpbjMyJyk7XG4gICAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgZ2V0VXNlckFnZW50KCcxLjIuMycsICcxMC4wLjIyMDAwJyksXG4gICAgICAnU2lnbmFsLURlc2t0b3AvMS4yLjMgV2luZG93cyAxMC4wLjIyMDAwJ1xuICAgICk7XG4gIH0pO1xuXG4gIGl0KCdyZXR1cm5zIHRoZSByaWdodCBVc2VyLUFnZW50IG9uIG1hY09TJywgZnVuY3Rpb24gdGVzdCgpIHtcbiAgICB0aGlzLnNhbmRib3guc3R1Yihwcm9jZXNzLCAncGxhdGZvcm0nKS5nZXQoKCkgPT4gJ2RhcndpbicpO1xuICAgIGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgIGdldFVzZXJBZ2VudCgnMS4yLjMnLCAnMjEuNS4wJyksXG4gICAgICAnU2lnbmFsLURlc2t0b3AvMS4yLjMgbWFjT1MgMjEuNS4wJ1xuICAgICk7XG4gIH0pO1xuXG4gIGl0KCdyZXR1cm5zIHRoZSByaWdodCBVc2VyLUFnZW50IG9uIExpbnV4JywgZnVuY3Rpb24gdGVzdCgpIHtcbiAgICB0aGlzLnNhbmRib3guc3R1Yihwcm9jZXNzLCAncGxhdGZvcm0nKS5nZXQoKCkgPT4gJ2xpbnV4Jyk7XG4gICAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgZ2V0VXNlckFnZW50KCcxLjIuMycsICcyMC4wNCcpLFxuICAgICAgJ1NpZ25hbC1EZXNrdG9wLzEuMi4zIExpbnV4IDIwLjA0J1xuICAgICk7XG4gIH0pO1xuXG4gIGl0KCdvbWl0cyB0aGUgcGxhdGZvcm0gb24gdW5zdXBwb3J0ZWQgcGxhdGZvcm1zJywgZnVuY3Rpb24gdGVzdCgpIHtcbiAgICB0aGlzLnNhbmRib3guc3R1Yihwcm9jZXNzLCAncGxhdGZvcm0nKS5nZXQoKCkgPT4gJ2ZyZWVic2QnKTtcbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwoZ2V0VXNlckFnZW50KCcxLjIuMycsICcxMy4xJyksICdTaWduYWwtRGVza3RvcC8xLjIuMycpO1xuICB9KTtcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7OztBQUdBLGtCQUF1QjtBQUN2QixZQUF1QjtBQUV2QiwwQkFBNkI7QUFFN0IsU0FBUyxnQkFBZ0IsTUFBTTtBQUM3QixhQUFXLDhDQUFzQjtBQUMvQixTQUFLLFVBQVUsTUFBTSxjQUFjO0FBQUEsRUFDckMsR0FGVyxhQUVWO0FBRUQsWUFBVSw2Q0FBcUI7QUFDN0IsU0FBSyxRQUFRLFFBQVE7QUFBQSxFQUN2QixHQUZVLFlBRVQ7QUFFRCxLQUFHLDJDQUEyQyxnQkFBZ0I7QUFDNUQsU0FBSyxRQUFRLEtBQUssU0FBUyxVQUFVLEVBQUUsSUFBSSxNQUFNLE9BQU87QUFDeEQsdUJBQU8sWUFDTCxzQ0FBYSxTQUFTLFlBQVksR0FDbEMseUNBQ0Y7QUFBQSxFQUNGLENBQUM7QUFFRCxLQUFHLHlDQUF5QyxnQkFBZ0I7QUFDMUQsU0FBSyxRQUFRLEtBQUssU0FBUyxVQUFVLEVBQUUsSUFBSSxNQUFNLFFBQVE7QUFDekQsdUJBQU8sWUFDTCxzQ0FBYSxTQUFTLFFBQVEsR0FDOUIsbUNBQ0Y7QUFBQSxFQUNGLENBQUM7QUFFRCxLQUFHLHlDQUF5QyxnQkFBZ0I7QUFDMUQsU0FBSyxRQUFRLEtBQUssU0FBUyxVQUFVLEVBQUUsSUFBSSxNQUFNLE9BQU87QUFDeEQsdUJBQU8sWUFDTCxzQ0FBYSxTQUFTLE9BQU8sR0FDN0Isa0NBQ0Y7QUFBQSxFQUNGLENBQUM7QUFFRCxLQUFHLCtDQUErQyxnQkFBZ0I7QUFDaEUsU0FBSyxRQUFRLEtBQUssU0FBUyxVQUFVLEVBQUUsSUFBSSxNQUFNLFNBQVM7QUFDMUQsdUJBQU8sWUFBWSxzQ0FBYSxTQUFTLE1BQU0sR0FBRyxzQkFBc0I7QUFBQSxFQUMxRSxDQUFDO0FBQ0gsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
