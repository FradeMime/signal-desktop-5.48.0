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
var Path = __toESM(require("path"));
var import_chai = require("chai");
var Errors = __toESM(require("../../types/errors"));
const APP_ROOT_PATH = Path.join(__dirname, "..", "..", "..");
describe("Errors", () => {
  describe("toLogFormat", () => {
    it("should return error stack trace if present", () => {
      const error = new Error("boom");
      import_chai.assert.typeOf(error, "Error");
      const formattedError = Errors.toLogFormat(error);
      import_chai.assert.include(formattedError, "errors_test.js");
      import_chai.assert.include(formattedError, APP_ROOT_PATH, "Formatted stack has app path");
    });
    it("should return error string representation if stack is missing", () => {
      const error = new Error("boom");
      error.stack = void 0;
      import_chai.assert.typeOf(error, "Error");
      import_chai.assert.isUndefined(error.stack);
      const formattedError = Errors.toLogFormat(error);
      import_chai.assert.strictEqual(formattedError, "boom");
    });
    [0, false, null, void 0].forEach((value) => {
      it(`should return \`${value}\` argument`, () => {
        const formattedNonError = Errors.toLogFormat(value);
        import_chai.assert.strictEqual(formattedNonError, String(value));
      });
    });
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZXJyb3JzX3Rlc3QudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDE4LTIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgKiBhcyBQYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSAnY2hhaSc7XG5pbXBvcnQgKiBhcyBFcnJvcnMgZnJvbSAnLi4vLi4vdHlwZXMvZXJyb3JzJztcblxuY29uc3QgQVBQX1JPT1RfUEFUSCA9IFBhdGguam9pbihfX2Rpcm5hbWUsICcuLicsICcuLicsICcuLicpO1xuXG5kZXNjcmliZSgnRXJyb3JzJywgKCkgPT4ge1xuICBkZXNjcmliZSgndG9Mb2dGb3JtYXQnLCAoKSA9PiB7XG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gZXJyb3Igc3RhY2sgdHJhY2UgaWYgcHJlc2VudCcsICgpID0+IHtcbiAgICAgIGNvbnN0IGVycm9yID0gbmV3IEVycm9yKCdib29tJyk7XG4gICAgICBhc3NlcnQudHlwZU9mKGVycm9yLCAnRXJyb3InKTtcblxuICAgICAgY29uc3QgZm9ybWF0dGVkRXJyb3IgPSBFcnJvcnMudG9Mb2dGb3JtYXQoZXJyb3IpO1xuICAgICAgYXNzZXJ0LmluY2x1ZGUoZm9ybWF0dGVkRXJyb3IsICdlcnJvcnNfdGVzdC5qcycpO1xuICAgICAgYXNzZXJ0LmluY2x1ZGUoXG4gICAgICAgIGZvcm1hdHRlZEVycm9yLFxuICAgICAgICBBUFBfUk9PVF9QQVRILFxuICAgICAgICAnRm9ybWF0dGVkIHN0YWNrIGhhcyBhcHAgcGF0aCdcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHJldHVybiBlcnJvciBzdHJpbmcgcmVwcmVzZW50YXRpb24gaWYgc3RhY2sgaXMgbWlzc2luZycsICgpID0+IHtcbiAgICAgIGNvbnN0IGVycm9yID0gbmV3IEVycm9yKCdib29tJyk7XG4gICAgICBlcnJvci5zdGFjayA9IHVuZGVmaW5lZDtcbiAgICAgIGFzc2VydC50eXBlT2YoZXJyb3IsICdFcnJvcicpO1xuICAgICAgYXNzZXJ0LmlzVW5kZWZpbmVkKGVycm9yLnN0YWNrKTtcblxuICAgICAgY29uc3QgZm9ybWF0dGVkRXJyb3IgPSBFcnJvcnMudG9Mb2dGb3JtYXQoZXJyb3IpO1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGZvcm1hdHRlZEVycm9yLCAnYm9vbScpO1xuICAgIH0pO1xuXG4gICAgWzAsIGZhbHNlLCBudWxsLCB1bmRlZmluZWRdLmZvckVhY2godmFsdWUgPT4ge1xuICAgICAgaXQoYHNob3VsZCByZXR1cm4gXFxgJHt2YWx1ZX1cXGAgYXJndW1lbnRgLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGZvcm1hdHRlZE5vbkVycm9yID0gRXJyb3JzLnRvTG9nRm9ybWF0KHZhbHVlKTtcbiAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGZvcm1hdHRlZE5vbkVycm9yLCBTdHJpbmcodmFsdWUpKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7O0FBR0EsV0FBc0I7QUFDdEIsa0JBQXVCO0FBQ3ZCLGFBQXdCO0FBRXhCLE1BQU0sZ0JBQWdCLEtBQUssS0FBSyxXQUFXLE1BQU0sTUFBTSxJQUFJO0FBRTNELFNBQVMsVUFBVSxNQUFNO0FBQ3ZCLFdBQVMsZUFBZSxNQUFNO0FBQzVCLE9BQUcsOENBQThDLE1BQU07QUFDckQsWUFBTSxRQUFRLElBQUksTUFBTSxNQUFNO0FBQzlCLHlCQUFPLE9BQU8sT0FBTyxPQUFPO0FBRTVCLFlBQU0saUJBQWlCLE9BQU8sWUFBWSxLQUFLO0FBQy9DLHlCQUFPLFFBQVEsZ0JBQWdCLGdCQUFnQjtBQUMvQyx5QkFBTyxRQUNMLGdCQUNBLGVBQ0EsOEJBQ0Y7QUFBQSxJQUNGLENBQUM7QUFFRCxPQUFHLGlFQUFpRSxNQUFNO0FBQ3hFLFlBQU0sUUFBUSxJQUFJLE1BQU0sTUFBTTtBQUM5QixZQUFNLFFBQVE7QUFDZCx5QkFBTyxPQUFPLE9BQU8sT0FBTztBQUM1Qix5QkFBTyxZQUFZLE1BQU0sS0FBSztBQUU5QixZQUFNLGlCQUFpQixPQUFPLFlBQVksS0FBSztBQUMvQyx5QkFBTyxZQUFZLGdCQUFnQixNQUFNO0FBQUEsSUFDM0MsQ0FBQztBQUVELEtBQUMsR0FBRyxPQUFPLE1BQU0sTUFBUyxFQUFFLFFBQVEsV0FBUztBQUMzQyxTQUFHLG1CQUFtQixvQkFBb0IsTUFBTTtBQUM5QyxjQUFNLG9CQUFvQixPQUFPLFlBQVksS0FBSztBQUNsRCwyQkFBTyxZQUFZLG1CQUFtQixPQUFPLEtBQUssQ0FBQztBQUFBLE1BQ3JELENBQUM7QUFBQSxJQUNILENBQUM7QUFBQSxFQUNILENBQUM7QUFDSCxDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
