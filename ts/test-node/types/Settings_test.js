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
var import_os = __toESM(require("os"));
var import_sinon = __toESM(require("sinon"));
var import_chai = require("chai");
var Settings = __toESM(require("../../types/Settings"));
describe("Settings", () => {
  let sandbox;
  beforeEach(() => {
    sandbox = import_sinon.default.createSandbox();
  });
  afterEach(() => {
    sandbox.restore();
  });
  describe("getAudioNotificationSupport", () => {
    it("returns native support on macOS", () => {
      sandbox.stub(process, "platform").value("darwin");
      import_chai.assert.strictEqual(Settings.getAudioNotificationSupport(), Settings.AudioNotificationSupport.Native);
    });
    it("returns no support on Windows 7", () => {
      sandbox.stub(process, "platform").value("win32");
      sandbox.stub(import_os.default, "release").returns("7.0.0");
      import_chai.assert.strictEqual(Settings.getAudioNotificationSupport(), Settings.AudioNotificationSupport.None);
    });
    it("returns native support on Windows 8", () => {
      sandbox.stub(process, "platform").value("win32");
      sandbox.stub(import_os.default, "release").returns("8.0.0");
      import_chai.assert.strictEqual(Settings.getAudioNotificationSupport(), Settings.AudioNotificationSupport.Native);
    });
    it("returns custom support on Linux", () => {
      sandbox.stub(process, "platform").value("linux");
      import_chai.assert.strictEqual(Settings.getAudioNotificationSupport(), Settings.AudioNotificationSupport.Custom);
    });
  });
  describe("isAudioNotificationSupported", () => {
    it("returns true on macOS", () => {
      sandbox.stub(process, "platform").value("darwin");
      import_chai.assert.isTrue(Settings.isAudioNotificationSupported());
    });
    it("returns false on Windows 7", () => {
      sandbox.stub(process, "platform").value("win32");
      sandbox.stub(import_os.default, "release").returns("7.0.0");
      import_chai.assert.isFalse(Settings.isAudioNotificationSupported());
    });
    it("returns true on Windows 8", () => {
      sandbox.stub(process, "platform").value("win32");
      sandbox.stub(import_os.default, "release").returns("8.0.0");
      import_chai.assert.isTrue(Settings.isAudioNotificationSupported());
    });
    it("returns true on Linux", () => {
      sandbox.stub(process, "platform").value("linux");
      import_chai.assert.isTrue(Settings.isAudioNotificationSupported());
    });
  });
  describe("isNotificationGroupingSupported", () => {
    it("returns true on macOS", () => {
      sandbox.stub(process, "platform").value("darwin");
      import_chai.assert.isTrue(Settings.isNotificationGroupingSupported());
    });
    it("returns true on Windows 7", () => {
      sandbox.stub(process, "platform").value("win32");
      sandbox.stub(import_os.default, "release").returns("7.0.0");
      import_chai.assert.isFalse(Settings.isNotificationGroupingSupported());
    });
    it("returns true on Windows 8", () => {
      sandbox.stub(process, "platform").value("win32");
      sandbox.stub(import_os.default, "release").returns("8.0.0");
      import_chai.assert.isTrue(Settings.isNotificationGroupingSupported());
    });
    it("returns true on Linux", () => {
      sandbox.stub(process, "platform").value("linux");
      import_chai.assert.isTrue(Settings.isNotificationGroupingSupported());
    });
  });
  describe("isAutoLaunchSupported", () => {
    it("returns true on Windows", () => {
      sandbox.stub(process, "platform").value("win32");
      sandbox.stub(import_os.default, "release").returns("8.0.0");
      import_chai.assert.isTrue(Settings.isAutoLaunchSupported());
    });
    it("returns true on macOS", () => {
      sandbox.stub(process, "platform").value("darwin");
      import_chai.assert.isTrue(Settings.isAutoLaunchSupported());
    });
    it("returns false on Linux", () => {
      sandbox.stub(process, "platform").value("linux");
      import_chai.assert.isFalse(Settings.isAutoLaunchSupported());
    });
  });
  describe("isHideMenuBarSupported", () => {
    it("returns false on macOS", () => {
      sandbox.stub(process, "platform").value("darwin");
      import_chai.assert.isFalse(Settings.isHideMenuBarSupported());
    });
    it("returns true on Windows 7", () => {
      sandbox.stub(process, "platform").value("win32");
      sandbox.stub(import_os.default, "release").returns("7.0.0");
      import_chai.assert.isTrue(Settings.isHideMenuBarSupported());
    });
    it("returns true on Windows 8", () => {
      sandbox.stub(process, "platform").value("win32");
      sandbox.stub(import_os.default, "release").returns("8.0.0");
      import_chai.assert.isTrue(Settings.isHideMenuBarSupported());
    });
    it("returns true on Linux", () => {
      sandbox.stub(process, "platform").value("linux");
      import_chai.assert.isTrue(Settings.isHideMenuBarSupported());
    });
  });
  describe("isDrawAttentionSupported", () => {
    it("returns false on macOS", () => {
      sandbox.stub(process, "platform").value("darwin");
      import_chai.assert.isFalse(Settings.isDrawAttentionSupported());
    });
    it("returns true on Windows 7", () => {
      sandbox.stub(process, "platform").value("win32");
      sandbox.stub(import_os.default, "release").returns("7.0.0");
      import_chai.assert.isTrue(Settings.isDrawAttentionSupported());
    });
    it("returns true on Windows 8", () => {
      sandbox.stub(process, "platform").value("win32");
      sandbox.stub(import_os.default, "release").returns("8.0.0");
      import_chai.assert.isTrue(Settings.isDrawAttentionSupported());
    });
    it("returns true on Linux", () => {
      sandbox.stub(process, "platform").value("linux");
      import_chai.assert.isTrue(Settings.isDrawAttentionSupported());
    });
  });
  describe("isSystemTraySupported", () => {
    it("returns false on macOS", () => {
      sandbox.stub(process, "platform").value("darwin");
      import_chai.assert.isFalse(Settings.isSystemTraySupported("1.2.3"));
    });
    it("returns true on Windows 8", () => {
      sandbox.stub(process, "platform").value("win32");
      sandbox.stub(import_os.default, "release").returns("8.0.0");
      import_chai.assert.isTrue(Settings.isSystemTraySupported("1.2.3"));
    });
    it("returns false on Linux production", () => {
      sandbox.stub(process, "platform").value("linux");
      import_chai.assert.isFalse(Settings.isSystemTraySupported("1.2.3"));
    });
    it("returns true on Linux beta", () => {
      sandbox.stub(process, "platform").value("linux");
      import_chai.assert.isTrue(Settings.isSystemTraySupported("1.2.3-beta.4"));
    });
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiU2V0dGluZ3NfdGVzdC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMTgtMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCBvcyBmcm9tICdvcyc7XG5pbXBvcnQgU2lub24gZnJvbSAnc2lub24nO1xuaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSAnY2hhaSc7XG5cbmltcG9ydCAqIGFzIFNldHRpbmdzIGZyb20gJy4uLy4uL3R5cGVzL1NldHRpbmdzJztcblxuZGVzY3JpYmUoJ1NldHRpbmdzJywgKCkgPT4ge1xuICBsZXQgc2FuZGJveDogU2lub24uU2lub25TYW5kYm94O1xuXG4gIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgIHNhbmRib3ggPSBTaW5vbi5jcmVhdGVTYW5kYm94KCk7XG4gIH0pO1xuXG4gIGFmdGVyRWFjaCgoKSA9PiB7XG4gICAgc2FuZGJveC5yZXN0b3JlKCk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdnZXRBdWRpb05vdGlmaWNhdGlvblN1cHBvcnQnLCAoKSA9PiB7XG4gICAgaXQoJ3JldHVybnMgbmF0aXZlIHN1cHBvcnQgb24gbWFjT1MnLCAoKSA9PiB7XG4gICAgICBzYW5kYm94LnN0dWIocHJvY2VzcywgJ3BsYXRmb3JtJykudmFsdWUoJ2RhcndpbicpO1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgICBTZXR0aW5ncy5nZXRBdWRpb05vdGlmaWNhdGlvblN1cHBvcnQoKSxcbiAgICAgICAgU2V0dGluZ3MuQXVkaW9Ob3RpZmljYXRpb25TdXBwb3J0Lk5hdGl2ZVxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIG5vIHN1cHBvcnQgb24gV2luZG93cyA3JywgKCkgPT4ge1xuICAgICAgc2FuZGJveC5zdHViKHByb2Nlc3MsICdwbGF0Zm9ybScpLnZhbHVlKCd3aW4zMicpO1xuICAgICAgc2FuZGJveC5zdHViKG9zLCAncmVsZWFzZScpLnJldHVybnMoJzcuMC4wJyk7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoXG4gICAgICAgIFNldHRpbmdzLmdldEF1ZGlvTm90aWZpY2F0aW9uU3VwcG9ydCgpLFxuICAgICAgICBTZXR0aW5ncy5BdWRpb05vdGlmaWNhdGlvblN1cHBvcnQuTm9uZVxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIG5hdGl2ZSBzdXBwb3J0IG9uIFdpbmRvd3MgOCcsICgpID0+IHtcbiAgICAgIHNhbmRib3guc3R1Yihwcm9jZXNzLCAncGxhdGZvcm0nKS52YWx1ZSgnd2luMzInKTtcbiAgICAgIHNhbmRib3guc3R1YihvcywgJ3JlbGVhc2UnKS5yZXR1cm5zKCc4LjAuMCcpO1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgICBTZXR0aW5ncy5nZXRBdWRpb05vdGlmaWNhdGlvblN1cHBvcnQoKSxcbiAgICAgICAgU2V0dGluZ3MuQXVkaW9Ob3RpZmljYXRpb25TdXBwb3J0Lk5hdGl2ZVxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIGN1c3RvbSBzdXBwb3J0IG9uIExpbnV4JywgKCkgPT4ge1xuICAgICAgc2FuZGJveC5zdHViKHByb2Nlc3MsICdwbGF0Zm9ybScpLnZhbHVlKCdsaW51eCcpO1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgICBTZXR0aW5ncy5nZXRBdWRpb05vdGlmaWNhdGlvblN1cHBvcnQoKSxcbiAgICAgICAgU2V0dGluZ3MuQXVkaW9Ob3RpZmljYXRpb25TdXBwb3J0LkN1c3RvbVxuICAgICAgKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ2lzQXVkaW9Ob3RpZmljYXRpb25TdXBwb3J0ZWQnLCAoKSA9PiB7XG4gICAgaXQoJ3JldHVybnMgdHJ1ZSBvbiBtYWNPUycsICgpID0+IHtcbiAgICAgIHNhbmRib3guc3R1Yihwcm9jZXNzLCAncGxhdGZvcm0nKS52YWx1ZSgnZGFyd2luJyk7XG4gICAgICBhc3NlcnQuaXNUcnVlKFNldHRpbmdzLmlzQXVkaW9Ob3RpZmljYXRpb25TdXBwb3J0ZWQoKSk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyBmYWxzZSBvbiBXaW5kb3dzIDcnLCAoKSA9PiB7XG4gICAgICBzYW5kYm94LnN0dWIocHJvY2VzcywgJ3BsYXRmb3JtJykudmFsdWUoJ3dpbjMyJyk7XG4gICAgICBzYW5kYm94LnN0dWIob3MsICdyZWxlYXNlJykucmV0dXJucygnNy4wLjAnKTtcbiAgICAgIGFzc2VydC5pc0ZhbHNlKFNldHRpbmdzLmlzQXVkaW9Ob3RpZmljYXRpb25TdXBwb3J0ZWQoKSk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyB0cnVlIG9uIFdpbmRvd3MgOCcsICgpID0+IHtcbiAgICAgIHNhbmRib3guc3R1Yihwcm9jZXNzLCAncGxhdGZvcm0nKS52YWx1ZSgnd2luMzInKTtcbiAgICAgIHNhbmRib3guc3R1YihvcywgJ3JlbGVhc2UnKS5yZXR1cm5zKCc4LjAuMCcpO1xuICAgICAgYXNzZXJ0LmlzVHJ1ZShTZXR0aW5ncy5pc0F1ZGlvTm90aWZpY2F0aW9uU3VwcG9ydGVkKCkpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgdHJ1ZSBvbiBMaW51eCcsICgpID0+IHtcbiAgICAgIHNhbmRib3guc3R1Yihwcm9jZXNzLCAncGxhdGZvcm0nKS52YWx1ZSgnbGludXgnKTtcbiAgICAgIGFzc2VydC5pc1RydWUoU2V0dGluZ3MuaXNBdWRpb05vdGlmaWNhdGlvblN1cHBvcnRlZCgpKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ2lzTm90aWZpY2F0aW9uR3JvdXBpbmdTdXBwb3J0ZWQnLCAoKSA9PiB7XG4gICAgaXQoJ3JldHVybnMgdHJ1ZSBvbiBtYWNPUycsICgpID0+IHtcbiAgICAgIHNhbmRib3guc3R1Yihwcm9jZXNzLCAncGxhdGZvcm0nKS52YWx1ZSgnZGFyd2luJyk7XG4gICAgICBhc3NlcnQuaXNUcnVlKFNldHRpbmdzLmlzTm90aWZpY2F0aW9uR3JvdXBpbmdTdXBwb3J0ZWQoKSk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyB0cnVlIG9uIFdpbmRvd3MgNycsICgpID0+IHtcbiAgICAgIHNhbmRib3guc3R1Yihwcm9jZXNzLCAncGxhdGZvcm0nKS52YWx1ZSgnd2luMzInKTtcbiAgICAgIHNhbmRib3guc3R1YihvcywgJ3JlbGVhc2UnKS5yZXR1cm5zKCc3LjAuMCcpO1xuICAgICAgYXNzZXJ0LmlzRmFsc2UoU2V0dGluZ3MuaXNOb3RpZmljYXRpb25Hcm91cGluZ1N1cHBvcnRlZCgpKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIHRydWUgb24gV2luZG93cyA4JywgKCkgPT4ge1xuICAgICAgc2FuZGJveC5zdHViKHByb2Nlc3MsICdwbGF0Zm9ybScpLnZhbHVlKCd3aW4zMicpO1xuICAgICAgc2FuZGJveC5zdHViKG9zLCAncmVsZWFzZScpLnJldHVybnMoJzguMC4wJyk7XG4gICAgICBhc3NlcnQuaXNUcnVlKFNldHRpbmdzLmlzTm90aWZpY2F0aW9uR3JvdXBpbmdTdXBwb3J0ZWQoKSk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyB0cnVlIG9uIExpbnV4JywgKCkgPT4ge1xuICAgICAgc2FuZGJveC5zdHViKHByb2Nlc3MsICdwbGF0Zm9ybScpLnZhbHVlKCdsaW51eCcpO1xuICAgICAgYXNzZXJ0LmlzVHJ1ZShTZXR0aW5ncy5pc05vdGlmaWNhdGlvbkdyb3VwaW5nU3VwcG9ydGVkKCkpO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnaXNBdXRvTGF1bmNoU3VwcG9ydGVkJywgKCkgPT4ge1xuICAgIGl0KCdyZXR1cm5zIHRydWUgb24gV2luZG93cycsICgpID0+IHtcbiAgICAgIHNhbmRib3guc3R1Yihwcm9jZXNzLCAncGxhdGZvcm0nKS52YWx1ZSgnd2luMzInKTtcbiAgICAgIHNhbmRib3guc3R1YihvcywgJ3JlbGVhc2UnKS5yZXR1cm5zKCc4LjAuMCcpO1xuICAgICAgYXNzZXJ0LmlzVHJ1ZShTZXR0aW5ncy5pc0F1dG9MYXVuY2hTdXBwb3J0ZWQoKSk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyB0cnVlIG9uIG1hY09TJywgKCkgPT4ge1xuICAgICAgc2FuZGJveC5zdHViKHByb2Nlc3MsICdwbGF0Zm9ybScpLnZhbHVlKCdkYXJ3aW4nKTtcbiAgICAgIGFzc2VydC5pc1RydWUoU2V0dGluZ3MuaXNBdXRvTGF1bmNoU3VwcG9ydGVkKCkpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgZmFsc2Ugb24gTGludXgnLCAoKSA9PiB7XG4gICAgICBzYW5kYm94LnN0dWIocHJvY2VzcywgJ3BsYXRmb3JtJykudmFsdWUoJ2xpbnV4Jyk7XG4gICAgICBhc3NlcnQuaXNGYWxzZShTZXR0aW5ncy5pc0F1dG9MYXVuY2hTdXBwb3J0ZWQoKSk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdpc0hpZGVNZW51QmFyU3VwcG9ydGVkJywgKCkgPT4ge1xuICAgIGl0KCdyZXR1cm5zIGZhbHNlIG9uIG1hY09TJywgKCkgPT4ge1xuICAgICAgc2FuZGJveC5zdHViKHByb2Nlc3MsICdwbGF0Zm9ybScpLnZhbHVlKCdkYXJ3aW4nKTtcbiAgICAgIGFzc2VydC5pc0ZhbHNlKFNldHRpbmdzLmlzSGlkZU1lbnVCYXJTdXBwb3J0ZWQoKSk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyB0cnVlIG9uIFdpbmRvd3MgNycsICgpID0+IHtcbiAgICAgIHNhbmRib3guc3R1Yihwcm9jZXNzLCAncGxhdGZvcm0nKS52YWx1ZSgnd2luMzInKTtcbiAgICAgIHNhbmRib3guc3R1YihvcywgJ3JlbGVhc2UnKS5yZXR1cm5zKCc3LjAuMCcpO1xuICAgICAgYXNzZXJ0LmlzVHJ1ZShTZXR0aW5ncy5pc0hpZGVNZW51QmFyU3VwcG9ydGVkKCkpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgdHJ1ZSBvbiBXaW5kb3dzIDgnLCAoKSA9PiB7XG4gICAgICBzYW5kYm94LnN0dWIocHJvY2VzcywgJ3BsYXRmb3JtJykudmFsdWUoJ3dpbjMyJyk7XG4gICAgICBzYW5kYm94LnN0dWIob3MsICdyZWxlYXNlJykucmV0dXJucygnOC4wLjAnKTtcbiAgICAgIGFzc2VydC5pc1RydWUoU2V0dGluZ3MuaXNIaWRlTWVudUJhclN1cHBvcnRlZCgpKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIHRydWUgb24gTGludXgnLCAoKSA9PiB7XG4gICAgICBzYW5kYm94LnN0dWIocHJvY2VzcywgJ3BsYXRmb3JtJykudmFsdWUoJ2xpbnV4Jyk7XG4gICAgICBhc3NlcnQuaXNUcnVlKFNldHRpbmdzLmlzSGlkZU1lbnVCYXJTdXBwb3J0ZWQoKSk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdpc0RyYXdBdHRlbnRpb25TdXBwb3J0ZWQnLCAoKSA9PiB7XG4gICAgaXQoJ3JldHVybnMgZmFsc2Ugb24gbWFjT1MnLCAoKSA9PiB7XG4gICAgICBzYW5kYm94LnN0dWIocHJvY2VzcywgJ3BsYXRmb3JtJykudmFsdWUoJ2RhcndpbicpO1xuICAgICAgYXNzZXJ0LmlzRmFsc2UoU2V0dGluZ3MuaXNEcmF3QXR0ZW50aW9uU3VwcG9ydGVkKCkpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgdHJ1ZSBvbiBXaW5kb3dzIDcnLCAoKSA9PiB7XG4gICAgICBzYW5kYm94LnN0dWIocHJvY2VzcywgJ3BsYXRmb3JtJykudmFsdWUoJ3dpbjMyJyk7XG4gICAgICBzYW5kYm94LnN0dWIob3MsICdyZWxlYXNlJykucmV0dXJucygnNy4wLjAnKTtcbiAgICAgIGFzc2VydC5pc1RydWUoU2V0dGluZ3MuaXNEcmF3QXR0ZW50aW9uU3VwcG9ydGVkKCkpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgdHJ1ZSBvbiBXaW5kb3dzIDgnLCAoKSA9PiB7XG4gICAgICBzYW5kYm94LnN0dWIocHJvY2VzcywgJ3BsYXRmb3JtJykudmFsdWUoJ3dpbjMyJyk7XG4gICAgICBzYW5kYm94LnN0dWIob3MsICdyZWxlYXNlJykucmV0dXJucygnOC4wLjAnKTtcbiAgICAgIGFzc2VydC5pc1RydWUoU2V0dGluZ3MuaXNEcmF3QXR0ZW50aW9uU3VwcG9ydGVkKCkpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgdHJ1ZSBvbiBMaW51eCcsICgpID0+IHtcbiAgICAgIHNhbmRib3guc3R1Yihwcm9jZXNzLCAncGxhdGZvcm0nKS52YWx1ZSgnbGludXgnKTtcbiAgICAgIGFzc2VydC5pc1RydWUoU2V0dGluZ3MuaXNEcmF3QXR0ZW50aW9uU3VwcG9ydGVkKCkpO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnaXNTeXN0ZW1UcmF5U3VwcG9ydGVkJywgKCkgPT4ge1xuICAgIGl0KCdyZXR1cm5zIGZhbHNlIG9uIG1hY09TJywgKCkgPT4ge1xuICAgICAgc2FuZGJveC5zdHViKHByb2Nlc3MsICdwbGF0Zm9ybScpLnZhbHVlKCdkYXJ3aW4nKTtcbiAgICAgIGFzc2VydC5pc0ZhbHNlKFNldHRpbmdzLmlzU3lzdGVtVHJheVN1cHBvcnRlZCgnMS4yLjMnKSk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyB0cnVlIG9uIFdpbmRvd3MgOCcsICgpID0+IHtcbiAgICAgIHNhbmRib3guc3R1Yihwcm9jZXNzLCAncGxhdGZvcm0nKS52YWx1ZSgnd2luMzInKTtcbiAgICAgIHNhbmRib3guc3R1YihvcywgJ3JlbGVhc2UnKS5yZXR1cm5zKCc4LjAuMCcpO1xuICAgICAgYXNzZXJ0LmlzVHJ1ZShTZXR0aW5ncy5pc1N5c3RlbVRyYXlTdXBwb3J0ZWQoJzEuMi4zJykpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgZmFsc2Ugb24gTGludXggcHJvZHVjdGlvbicsICgpID0+IHtcbiAgICAgIHNhbmRib3guc3R1Yihwcm9jZXNzLCAncGxhdGZvcm0nKS52YWx1ZSgnbGludXgnKTtcbiAgICAgIGFzc2VydC5pc0ZhbHNlKFNldHRpbmdzLmlzU3lzdGVtVHJheVN1cHBvcnRlZCgnMS4yLjMnKSk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyB0cnVlIG9uIExpbnV4IGJldGEnLCAoKSA9PiB7XG4gICAgICBzYW5kYm94LnN0dWIocHJvY2VzcywgJ3BsYXRmb3JtJykudmFsdWUoJ2xpbnV4Jyk7XG4gICAgICBhc3NlcnQuaXNUcnVlKFNldHRpbmdzLmlzU3lzdGVtVHJheVN1cHBvcnRlZCgnMS4yLjMtYmV0YS40JykpO1xuICAgIH0pO1xuICB9KTtcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7O0FBR0EsZ0JBQWU7QUFDZixtQkFBa0I7QUFDbEIsa0JBQXVCO0FBRXZCLGVBQTBCO0FBRTFCLFNBQVMsWUFBWSxNQUFNO0FBQ3pCLE1BQUk7QUFFSixhQUFXLE1BQU07QUFDZixjQUFVLHFCQUFNLGNBQWM7QUFBQSxFQUNoQyxDQUFDO0FBRUQsWUFBVSxNQUFNO0FBQ2QsWUFBUSxRQUFRO0FBQUEsRUFDbEIsQ0FBQztBQUVELFdBQVMsK0JBQStCLE1BQU07QUFDNUMsT0FBRyxtQ0FBbUMsTUFBTTtBQUMxQyxjQUFRLEtBQUssU0FBUyxVQUFVLEVBQUUsTUFBTSxRQUFRO0FBQ2hELHlCQUFPLFlBQ0wsU0FBUyw0QkFBNEIsR0FDckMsU0FBUyx5QkFBeUIsTUFDcEM7QUFBQSxJQUNGLENBQUM7QUFFRCxPQUFHLG1DQUFtQyxNQUFNO0FBQzFDLGNBQVEsS0FBSyxTQUFTLFVBQVUsRUFBRSxNQUFNLE9BQU87QUFDL0MsY0FBUSxLQUFLLG1CQUFJLFNBQVMsRUFBRSxRQUFRLE9BQU87QUFDM0MseUJBQU8sWUFDTCxTQUFTLDRCQUE0QixHQUNyQyxTQUFTLHlCQUF5QixJQUNwQztBQUFBLElBQ0YsQ0FBQztBQUVELE9BQUcsdUNBQXVDLE1BQU07QUFDOUMsY0FBUSxLQUFLLFNBQVMsVUFBVSxFQUFFLE1BQU0sT0FBTztBQUMvQyxjQUFRLEtBQUssbUJBQUksU0FBUyxFQUFFLFFBQVEsT0FBTztBQUMzQyx5QkFBTyxZQUNMLFNBQVMs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
