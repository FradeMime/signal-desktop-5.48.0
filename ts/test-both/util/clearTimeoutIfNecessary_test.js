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
var sinon = __toESM(require("sinon"));
var import_clearTimeoutIfNecessary = require("../../util/clearTimeoutIfNecessary");
describe("clearTimeoutIfNecessary", () => {
  let sandbox;
  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });
  afterEach(() => {
    sandbox.restore();
  });
  it("does nothing if passed `null` or `undefined`", () => {
    sandbox.stub(global, "clearTimeout");
    sandbox.stub(global, "clearInterval");
    (0, import_clearTimeoutIfNecessary.clearTimeoutIfNecessary)(void 0);
    (0, import_clearTimeoutIfNecessary.clearTimeoutIfNecessary)(null);
    sinon.assert.notCalled(global.clearTimeout);
    sinon.assert.notCalled(global.clearInterval);
  });
  it("clears timeouts", async () => {
    const clock = sandbox.useFakeTimers();
    const fn = sinon.fake();
    const timeout = setTimeout(fn, 123);
    (0, import_clearTimeoutIfNecessary.clearTimeoutIfNecessary)(timeout);
    await clock.tickAsync(9999);
    sinon.assert.notCalled(fn);
  });
  it("clears intervals", async () => {
    const clock = sandbox.useFakeTimers();
    const fn = sinon.fake();
    const interval = setInterval(fn, 123);
    (0, import_clearTimeoutIfNecessary.clearTimeoutIfNecessary)(interval);
    await clock.tickAsync(9999);
    sinon.assert.notCalled(fn);
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiY2xlYXJUaW1lb3V0SWZOZWNlc3NhcnlfdGVzdC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgKiBhcyBzaW5vbiBmcm9tICdzaW5vbic7XG5cbmltcG9ydCB7IGNsZWFyVGltZW91dElmTmVjZXNzYXJ5IH0gZnJvbSAnLi4vLi4vdXRpbC9jbGVhclRpbWVvdXRJZk5lY2Vzc2FyeSc7XG5cbmRlc2NyaWJlKCdjbGVhclRpbWVvdXRJZk5lY2Vzc2FyeScsICgpID0+IHtcbiAgbGV0IHNhbmRib3g6IHNpbm9uLlNpbm9uU2FuZGJveDtcblxuICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICBzYW5kYm94ID0gc2lub24uY3JlYXRlU2FuZGJveCgpO1xuICB9KTtcblxuICBhZnRlckVhY2goKCkgPT4ge1xuICAgIHNhbmRib3gucmVzdG9yZSgpO1xuICB9KTtcblxuICBpdCgnZG9lcyBub3RoaW5nIGlmIHBhc3NlZCBgbnVsbGAgb3IgYHVuZGVmaW5lZGAnLCAoKSA9PiB7XG4gICAgc2FuZGJveC5zdHViKGdsb2JhbCwgJ2NsZWFyVGltZW91dCcpO1xuICAgIHNhbmRib3guc3R1YihnbG9iYWwsICdjbGVhckludGVydmFsJyk7XG5cbiAgICBjbGVhclRpbWVvdXRJZk5lY2Vzc2FyeSh1bmRlZmluZWQpO1xuICAgIGNsZWFyVGltZW91dElmTmVjZXNzYXJ5KG51bGwpO1xuXG4gICAgc2lub24uYXNzZXJ0Lm5vdENhbGxlZChnbG9iYWwuY2xlYXJUaW1lb3V0IGFzIHNpbm9uLlNpbm9uU3B5KTtcbiAgICBzaW5vbi5hc3NlcnQubm90Q2FsbGVkKGdsb2JhbC5jbGVhckludGVydmFsIGFzIHNpbm9uLlNpbm9uU3B5KTtcbiAgfSk7XG5cbiAgaXQoJ2NsZWFycyB0aW1lb3V0cycsIGFzeW5jICgpID0+IHtcbiAgICBjb25zdCBjbG9jayA9IHNhbmRib3gudXNlRmFrZVRpbWVycygpO1xuICAgIGNvbnN0IGZuID0gc2lub24uZmFrZSgpO1xuICAgIGNvbnN0IHRpbWVvdXQgPSBzZXRUaW1lb3V0KGZuLCAxMjMpO1xuXG4gICAgY2xlYXJUaW1lb3V0SWZOZWNlc3NhcnkodGltZW91dCk7XG5cbiAgICBhd2FpdCBjbG9jay50aWNrQXN5bmMoOTk5OSk7XG4gICAgc2lub24uYXNzZXJ0Lm5vdENhbGxlZChmbik7XG4gIH0pO1xuXG4gIGl0KCdjbGVhcnMgaW50ZXJ2YWxzJywgYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IGNsb2NrID0gc2FuZGJveC51c2VGYWtlVGltZXJzKCk7XG4gICAgY29uc3QgZm4gPSBzaW5vbi5mYWtlKCk7XG4gICAgY29uc3QgaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChmbiwgMTIzKTtcblxuICAgIGNsZWFyVGltZW91dElmTmVjZXNzYXJ5KGludGVydmFsKTtcblxuICAgIGF3YWl0IGNsb2NrLnRpY2tBc3luYyg5OTk5KTtcbiAgICBzaW5vbi5hc3NlcnQubm90Q2FsbGVkKGZuKTtcbiAgfSk7XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7OztBQUdBLFlBQXVCO0FBRXZCLHFDQUF3QztBQUV4QyxTQUFTLDJCQUEyQixNQUFNO0FBQ3hDLE1BQUk7QUFFSixhQUFXLE1BQU07QUFDZixjQUFVLE1BQU0sY0FBYztBQUFBLEVBQ2hDLENBQUM7QUFFRCxZQUFVLE1BQU07QUFDZCxZQUFRLFFBQVE7QUFBQSxFQUNsQixDQUFDO0FBRUQsS0FBRyxnREFBZ0QsTUFBTTtBQUN2RCxZQUFRLEtBQUssUUFBUSxjQUFjO0FBQ25DLFlBQVEsS0FBSyxRQUFRLGVBQWU7QUFFcEMsZ0VBQXdCLE1BQVM7QUFDakMsZ0VBQXdCLElBQUk7QUFFNUIsVUFBTSxPQUFPLFVBQVUsT0FBTyxZQUE4QjtBQUM1RCxVQUFNLE9BQU8sVUFBVSxPQUFPLGFBQStCO0FBQUEsRUFDL0QsQ0FBQztBQUVELEtBQUcsbUJBQW1CLFlBQVk7QUFDaEMsVUFBTSxRQUFRLFFBQVEsY0FBYztBQUNwQyxVQUFNLEtBQUssTUFBTSxLQUFLO0FBQ3RCLFVBQU0sVUFBVSxXQUFXLElBQUksR0FBRztBQUVsQyxnRUFBd0IsT0FBTztBQUUvQixVQUFNLE1BQU0sVUFBVSxJQUFJO0FBQzFCLFVBQU0sT0FBTyxVQUFVLEVBQUU7QUFBQSxFQUMzQixDQUFDO0FBRUQsS0FBRyxvQkFBb0IsWUFBWTtBQUNqQyxVQUFNLFFBQVEsUUFBUSxjQUFjO0FBQ3BDLFVBQU0sS0FBSyxNQUFNLEtBQUs7QUFDdEIsVUFBTSxXQUFXLFlBQVksSUFBSSxHQUFHO0FBRXBDLGdFQUF3QixRQUFRO0FBRWhDLFVBQU0sTUFBTSxVQUFVLElBQUk7QUFDMUIsVUFBTSxPQUFPLFVBQVUsRUFBRTtBQUFBLEVBQzNCLENBQUM7QUFDSCxDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
