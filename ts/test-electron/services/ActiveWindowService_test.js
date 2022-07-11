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
var import_events = require("events");
var import_ActiveWindowService = require("../../services/ActiveWindowService");
describe("ActiveWindowService", () => {
  const fakeIpcEvent = {};
  beforeEach(/* @__PURE__ */ __name(function beforeEach2() {
    this.clock = sinon.useFakeTimers({ now: 1e3 });
  }, "beforeEach"));
  afterEach(/* @__PURE__ */ __name(function afterEach2() {
    this.clock.restore();
  }, "afterEach"));
  function createFakeDocument() {
    return document.createElement("div");
  }
  it("is inactive at the start", () => {
    const service = new import_ActiveWindowService.ActiveWindowService();
    service.initialize(createFakeDocument(), new import_events.EventEmitter());
    import_chai.assert.isFalse(service.isActive());
  });
  it("becomes active after focusing", () => {
    const fakeIpc = new import_events.EventEmitter();
    const service = new import_ActiveWindowService.ActiveWindowService();
    service.initialize(createFakeDocument(), fakeIpc);
    fakeIpc.emit("set-window-focus", fakeIpcEvent, true);
    import_chai.assert.isTrue(service.isActive());
  });
  it("becomes inactive after 15 seconds without interaction", function test() {
    const fakeIpc = new import_events.EventEmitter();
    const service = new import_ActiveWindowService.ActiveWindowService();
    service.initialize(createFakeDocument(), fakeIpc);
    fakeIpc.emit("set-window-focus", fakeIpcEvent, true);
    this.clock.tick(5e3);
    import_chai.assert.isTrue(service.isActive());
    this.clock.tick(9999);
    import_chai.assert.isTrue(service.isActive());
    this.clock.tick(1);
    import_chai.assert.isFalse(service.isActive());
  });
  ["click", "keydown", "mousedown", "mousemove", "touchstart", "wheel"].forEach((eventName) => {
    it(`is inactive even in the face of ${eventName} events if unfocused`, function test() {
      const fakeDocument = createFakeDocument();
      const fakeIpc = new import_events.EventEmitter();
      const service = new import_ActiveWindowService.ActiveWindowService();
      service.initialize(fakeDocument, fakeIpc);
      fakeIpc.emit("set-window-focus", fakeIpcEvent, false);
      fakeDocument.dispatchEvent(new Event(eventName));
      import_chai.assert.isFalse(service.isActive());
    });
    it(`stays active if focused and receiving ${eventName} events`, function test() {
      const fakeDocument = createFakeDocument();
      const fakeIpc = new import_events.EventEmitter();
      const service = new import_ActiveWindowService.ActiveWindowService();
      service.initialize(fakeDocument, fakeIpc);
      fakeIpc.emit("set-window-focus", fakeIpcEvent, true);
      fakeDocument.dispatchEvent(new Event(eventName));
      import_chai.assert.isTrue(service.isActive());
      this.clock.tick(8e3);
      fakeDocument.dispatchEvent(new Event(eventName));
      import_chai.assert.isTrue(service.isActive());
      this.clock.tick(8e3);
      fakeDocument.dispatchEvent(new Event(eventName));
      import_chai.assert.isTrue(service.isActive());
    });
  });
  it("calls callbacks when going from unfocused to focused", () => {
    const fakeIpc = new import_events.EventEmitter();
    const service = new import_ActiveWindowService.ActiveWindowService();
    service.initialize(createFakeDocument(), fakeIpc);
    const callback = sinon.stub();
    service.registerForActive(callback);
    fakeIpc.emit("set-window-focus", fakeIpcEvent, true);
    sinon.assert.calledOnce(callback);
  });
  it("calls callbacks when receiving a click event after being focused", function test() {
    const fakeDocument = createFakeDocument();
    const fakeIpc = new import_events.EventEmitter();
    const service = new import_ActiveWindowService.ActiveWindowService();
    service.initialize(fakeDocument, fakeIpc);
    fakeIpc.emit("set-window-focus", fakeIpcEvent, true);
    this.clock.tick(2e4);
    const callback = sinon.stub();
    service.registerForActive(callback);
    fakeDocument.dispatchEvent(new Event("click"));
    sinon.assert.calledOnce(callback);
  });
  it("only calls callbacks every 5 seconds; it is throttled", function test() {
    const fakeIpc = new import_events.EventEmitter();
    const service = new import_ActiveWindowService.ActiveWindowService();
    service.initialize(createFakeDocument(), fakeIpc);
    const callback = sinon.stub();
    service.registerForActive(callback);
    fakeIpc.emit("set-window-focus", fakeIpcEvent, true);
    fakeIpc.emit("set-window-focus", fakeIpcEvent, false);
    fakeIpc.emit("set-window-focus", fakeIpcEvent, true);
    fakeIpc.emit("set-window-focus", fakeIpcEvent, false);
    fakeIpc.emit("set-window-focus", fakeIpcEvent, true);
    fakeIpc.emit("set-window-focus", fakeIpcEvent, false);
    sinon.assert.calledOnce(callback);
    this.clock.tick(15e3);
    fakeIpc.emit("set-window-focus", fakeIpcEvent, true);
    sinon.assert.calledTwice(callback);
  });
  it("can remove callbacks", () => {
    const fakeDocument = createFakeDocument();
    const fakeIpc = new import_events.EventEmitter();
    const service = new import_ActiveWindowService.ActiveWindowService();
    service.initialize(fakeDocument, fakeIpc);
    const callback = sinon.stub();
    service.registerForActive(callback);
    service.unregisterForActive(callback);
    fakeIpc.emit("set-window-focus", fakeIpcEvent, true);
    sinon.assert.notCalled(callback);
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQWN0aXZlV2luZG93U2VydmljZV90ZXN0LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMCBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IGFzc2VydCB9IGZyb20gJ2NoYWknO1xuaW1wb3J0ICogYXMgc2lub24gZnJvbSAnc2lub24nO1xuaW1wb3J0IHsgRXZlbnRFbWl0dGVyIH0gZnJvbSAnZXZlbnRzJztcblxuaW1wb3J0IHsgQWN0aXZlV2luZG93U2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL0FjdGl2ZVdpbmRvd1NlcnZpY2UnO1xuXG5kZXNjcmliZSgnQWN0aXZlV2luZG93U2VydmljZScsICgpID0+IHtcbiAgY29uc3QgZmFrZUlwY0V2ZW50ID0ge307XG5cbiAgYmVmb3JlRWFjaChmdW5jdGlvbiBiZWZvcmVFYWNoKCkge1xuICAgIHRoaXMuY2xvY2sgPSBzaW5vbi51c2VGYWtlVGltZXJzKHsgbm93OiAxMDAwIH0pO1xuICB9KTtcblxuICBhZnRlckVhY2goZnVuY3Rpb24gYWZ0ZXJFYWNoKCkge1xuICAgIHRoaXMuY2xvY2sucmVzdG9yZSgpO1xuICB9KTtcblxuICBmdW5jdGlvbiBjcmVhdGVGYWtlRG9jdW1lbnQoKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICB9XG5cbiAgaXQoJ2lzIGluYWN0aXZlIGF0IHRoZSBzdGFydCcsICgpID0+IHtcbiAgICBjb25zdCBzZXJ2aWNlID0gbmV3IEFjdGl2ZVdpbmRvd1NlcnZpY2UoKTtcbiAgICBzZXJ2aWNlLmluaXRpYWxpemUoY3JlYXRlRmFrZURvY3VtZW50KCksIG5ldyBFdmVudEVtaXR0ZXIoKSk7XG5cbiAgICBhc3NlcnQuaXNGYWxzZShzZXJ2aWNlLmlzQWN0aXZlKCkpO1xuICB9KTtcblxuICBpdCgnYmVjb21lcyBhY3RpdmUgYWZ0ZXIgZm9jdXNpbmcnLCAoKSA9PiB7XG4gICAgY29uc3QgZmFrZUlwYyA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBjb25zdCBzZXJ2aWNlID0gbmV3IEFjdGl2ZVdpbmRvd1NlcnZpY2UoKTtcbiAgICBzZXJ2aWNlLmluaXRpYWxpemUoY3JlYXRlRmFrZURvY3VtZW50KCksIGZha2VJcGMpO1xuXG4gICAgZmFrZUlwYy5lbWl0KCdzZXQtd2luZG93LWZvY3VzJywgZmFrZUlwY0V2ZW50LCB0cnVlKTtcblxuICAgIGFzc2VydC5pc1RydWUoc2VydmljZS5pc0FjdGl2ZSgpKTtcbiAgfSk7XG5cbiAgaXQoJ2JlY29tZXMgaW5hY3RpdmUgYWZ0ZXIgMTUgc2Vjb25kcyB3aXRob3V0IGludGVyYWN0aW9uJywgZnVuY3Rpb24gdGVzdCgpIHtcbiAgICBjb25zdCBmYWtlSXBjID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIGNvbnN0IHNlcnZpY2UgPSBuZXcgQWN0aXZlV2luZG93U2VydmljZSgpO1xuICAgIHNlcnZpY2UuaW5pdGlhbGl6ZShjcmVhdGVGYWtlRG9jdW1lbnQoKSwgZmFrZUlwYyk7XG5cbiAgICBmYWtlSXBjLmVtaXQoJ3NldC13aW5kb3ctZm9jdXMnLCBmYWtlSXBjRXZlbnQsIHRydWUpO1xuXG4gICAgdGhpcy5jbG9jay50aWNrKDUwMDApO1xuICAgIGFzc2VydC5pc1RydWUoc2VydmljZS5pc0FjdGl2ZSgpKTtcblxuICAgIHRoaXMuY2xvY2sudGljayg5OTk5KTtcbiAgICBhc3NlcnQuaXNUcnVlKHNlcnZpY2UuaXNBY3RpdmUoKSk7XG5cbiAgICB0aGlzLmNsb2NrLnRpY2soMSk7XG4gICAgYXNzZXJ0LmlzRmFsc2Uoc2VydmljZS5pc0FjdGl2ZSgpKTtcbiAgfSk7XG5cbiAgWydjbGljaycsICdrZXlkb3duJywgJ21vdXNlZG93bicsICdtb3VzZW1vdmUnLCAndG91Y2hzdGFydCcsICd3aGVlbCddLmZvckVhY2goXG4gICAgKGV2ZW50TmFtZTogc3RyaW5nKSA9PiB7XG4gICAgICBpdChgaXMgaW5hY3RpdmUgZXZlbiBpbiB0aGUgZmFjZSBvZiAke2V2ZW50TmFtZX0gZXZlbnRzIGlmIHVuZm9jdXNlZGAsIGZ1bmN0aW9uIHRlc3QoKSB7XG4gICAgICAgIGNvbnN0IGZha2VEb2N1bWVudCA9IGNyZWF0ZUZha2VEb2N1bWVudCgpO1xuICAgICAgICBjb25zdCBmYWtlSXBjID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgICAgICBjb25zdCBzZXJ2aWNlID0gbmV3IEFjdGl2ZVdpbmRvd1NlcnZpY2UoKTtcbiAgICAgICAgc2VydmljZS5pbml0aWFsaXplKGZha2VEb2N1bWVudCwgZmFrZUlwYyk7XG5cbiAgICAgICAgZmFrZUlwYy5lbWl0KCdzZXQtd2luZG93LWZvY3VzJywgZmFrZUlwY0V2ZW50LCBmYWxzZSk7XG5cbiAgICAgICAgZmFrZURvY3VtZW50LmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KGV2ZW50TmFtZSkpO1xuICAgICAgICBhc3NlcnQuaXNGYWxzZShzZXJ2aWNlLmlzQWN0aXZlKCkpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KGBzdGF5cyBhY3RpdmUgaWYgZm9jdXNlZCBhbmQgcmVjZWl2aW5nICR7ZXZlbnROYW1lfSBldmVudHNgLCBmdW5jdGlvbiB0ZXN0KCkge1xuICAgICAgICBjb25zdCBmYWtlRG9jdW1lbnQgPSBjcmVhdGVGYWtlRG9jdW1lbnQoKTtcbiAgICAgICAgY29uc3QgZmFrZUlwYyA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICAgICAgY29uc3Qgc2VydmljZSA9IG5ldyBBY3RpdmVXaW5kb3dTZXJ2aWNlKCk7XG4gICAgICAgIHNlcnZpY2UuaW5pdGlhbGl6ZShmYWtlRG9jdW1lbnQsIGZha2VJcGMpO1xuXG4gICAgICAgIGZha2VJcGMuZW1pdCgnc2V0LXdpbmRvdy1mb2N1cycsIGZha2VJcGNFdmVudCwgdHJ1ZSk7XG5cbiAgICAgICAgZmFrZURvY3VtZW50LmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KGV2ZW50TmFtZSkpO1xuICAgICAgICBhc3NlcnQuaXNUcnVlKHNlcnZpY2UuaXNBY3RpdmUoKSk7XG5cbiAgICAgICAgdGhpcy5jbG9jay50aWNrKDgwMDApO1xuICAgICAgICBmYWtlRG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoZXZlbnROYW1lKSk7XG4gICAgICAgIGFzc2VydC5pc1RydWUoc2VydmljZS5pc0FjdGl2ZSgpKTtcblxuICAgICAgICB0aGlzLmNsb2NrLnRpY2soODAwMCk7XG4gICAgICAgIGZha2VEb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudChldmVudE5hbWUpKTtcbiAgICAgICAgYXNzZXJ0LmlzVHJ1ZShzZXJ2aWNlLmlzQWN0aXZlKCkpO1xuICAgICAgfSk7XG4gICAgfVxuICApO1xuXG4gIGl0KCdjYWxscyBjYWxsYmFja3Mgd2hlbiBnb2luZyBmcm9tIHVuZm9jdXNlZCB0byBmb2N1c2VkJywgKCkgPT4ge1xuICAgIGNvbnN0IGZha2VJcGMgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgY29uc3Qgc2VydmljZSA9IG5ldyBBY3RpdmVXaW5kb3dTZXJ2aWNlKCk7XG4gICAgc2VydmljZS5pbml0aWFsaXplKGNyZWF0ZUZha2VEb2N1bWVudCgpLCBmYWtlSXBjKTtcblxuICAgIGNvbnN0IGNhbGxiYWNrID0gc2lub24uc3R1YigpO1xuICAgIHNlcnZpY2UucmVnaXN0ZXJGb3JBY3RpdmUoY2FsbGJhY2spO1xuXG4gICAgZmFrZUlwYy5lbWl0KCdzZXQtd2luZG93LWZvY3VzJywgZmFrZUlwY0V2ZW50LCB0cnVlKTtcblxuICAgIHNpbm9uLmFzc2VydC5jYWxsZWRPbmNlKGNhbGxiYWNrKTtcbiAgfSk7XG5cbiAgaXQoJ2NhbGxzIGNhbGxiYWNrcyB3aGVuIHJlY2VpdmluZyBhIGNsaWNrIGV2ZW50IGFmdGVyIGJlaW5nIGZvY3VzZWQnLCBmdW5jdGlvbiB0ZXN0KCkge1xuICAgIGNvbnN0IGZha2VEb2N1bWVudCA9IGNyZWF0ZUZha2VEb2N1bWVudCgpO1xuICAgIGNvbnN0IGZha2VJcGMgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgY29uc3Qgc2VydmljZSA9IG5ldyBBY3RpdmVXaW5kb3dTZXJ2aWNlKCk7XG4gICAgc2VydmljZS5pbml0aWFsaXplKGZha2VEb2N1bWVudCwgZmFrZUlwYyk7XG5cbiAgICBmYWtlSXBjLmVtaXQoJ3NldC13aW5kb3ctZm9jdXMnLCBmYWtlSXBjRXZlbnQsIHRydWUpO1xuXG4gICAgdGhpcy5jbG9jay50aWNrKDIwMDAwKTtcblxuICAgIGNvbnN0IGNhbGxiYWNrID0gc2lub24uc3R1YigpO1xuICAgIHNlcnZpY2UucmVnaXN0ZXJGb3JBY3RpdmUoY2FsbGJhY2spO1xuXG4gICAgZmFrZURvY3VtZW50LmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdjbGljaycpKTtcblxuICAgIHNpbm9uLmFzc2VydC5jYWxsZWRPbmNlKGNhbGxiYWNrKTtcbiAgfSk7XG5cbiAgaXQoJ29ubHkgY2FsbHMgY2FsbGJhY2tzIGV2ZXJ5IDUgc2Vjb25kczsgaXQgaXMgdGhyb3R0bGVkJywgZnVuY3Rpb24gdGVzdCgpIHtcbiAgICBjb25zdCBmYWtlSXBjID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIGNvbnN0IHNlcnZpY2UgPSBuZXcgQWN0aXZlV2luZG93U2VydmljZSgpO1xuICAgIHNlcnZpY2UuaW5pdGlhbGl6ZShjcmVhdGVGYWtlRG9jdW1lbnQoKSwgZmFrZUlwYyk7XG5cbiAgICBjb25zdCBjYWxsYmFjayA9IHNpbm9uLnN0dWIoKTtcbiAgICBzZXJ2aWNlLnJlZ2lzdGVyRm9yQWN0aXZlKGNhbGxiYWNrKTtcblxuICAgIGZha2VJcGMuZW1pdCgnc2V0LXdpbmRvdy1mb2N1cycsIGZha2VJcGNFdmVudCwgdHJ1ZSk7XG4gICAgZmFrZUlwYy5lbWl0KCdzZXQtd2luZG93LWZvY3VzJywgZmFrZUlwY0V2ZW50LCBmYWxzZSk7XG4gICAgZmFrZUlwYy5lbWl0KCdzZXQtd2luZG93LWZvY3VzJywgZmFrZUlwY0V2ZW50LCB0cnVlKTtcbiAgICBmYWtlSXBjLmVtaXQoJ3NldC13aW5kb3ctZm9jdXMnLCBmYWtlSXBjRXZlbnQsIGZhbHNlKTtcbiAgICBmYWtlSXBjLmVtaXQoJ3NldC13aW5kb3ctZm9jdXMnLCBmYWtlSXBjRXZlbnQsIHRydWUpO1xuICAgIGZha2VJcGMuZW1pdCgnc2V0LXdpbmRvdy1mb2N1cycsIGZha2VJcGNFdmVudCwgZmFsc2UpO1xuXG4gICAgc2lub24uYXNzZXJ0LmNhbGxlZE9uY2UoY2FsbGJhY2spO1xuXG4gICAgdGhpcy5jbG9jay50aWNrKDE1MDAwKTtcblxuICAgIGZha2VJcGMuZW1pdCgnc2V0LXdpbmRvdy1mb2N1cycsIGZha2VJcGNFdmVudCwgdHJ1ZSk7XG5cbiAgICBzaW5vbi5hc3NlcnQuY2FsbGVkVHdpY2UoY2FsbGJhY2spO1xuICB9KTtcblxuICBpdCgnY2FuIHJlbW92ZSBjYWxsYmFja3MnLCAoKSA9PiB7XG4gICAgY29uc3QgZmFrZURvY3VtZW50ID0gY3JlYXRlRmFrZURvY3VtZW50KCk7XG4gICAgY29uc3QgZmFrZUlwYyA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBjb25zdCBzZXJ2aWNlID0gbmV3IEFjdGl2ZVdpbmRvd1NlcnZpY2UoKTtcbiAgICBzZXJ2aWNlLmluaXRpYWxpemUoZmFrZURvY3VtZW50LCBmYWtlSXBjKTtcblxuICAgIGNvbnN0IGNhbGxiYWNrID0gc2lub24uc3R1YigpO1xuICAgIHNlcnZpY2UucmVnaXN0ZXJGb3JBY3RpdmUoY2FsbGJhY2spO1xuICAgIHNlcnZpY2UudW5yZWdpc3RlckZvckFjdGl2ZShjYWxsYmFjayk7XG5cbiAgICBmYWtlSXBjLmVtaXQoJ3NldC13aW5kb3ctZm9jdXMnLCBmYWtlSXBjRXZlbnQsIHRydWUpO1xuXG4gICAgc2lub24uYXNzZXJ0Lm5vdENhbGxlZChjYWxsYmFjayk7XG4gIH0pO1xufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7O0FBR0Esa0JBQXVCO0FBQ3ZCLFlBQXVCO0FBQ3ZCLG9CQUE2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
