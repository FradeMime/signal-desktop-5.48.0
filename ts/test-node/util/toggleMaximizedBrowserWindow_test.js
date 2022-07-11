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
var sinon = __toESM(require("sinon"));
var import_toggleMaximizedBrowserWindow = require("../../util/toggleMaximizedBrowserWindow");
describe("toggleMaximizedBrowserWindow", () => {
  const createFakeWindow = /* @__PURE__ */ __name(() => ({
    isMaximized: sinon.stub(),
    unmaximize: sinon.spy(),
    maximize: sinon.spy()
  }), "createFakeWindow");
  it("maximizes an unmaximized window", () => {
    const browserWindow = createFakeWindow();
    browserWindow.isMaximized.returns(false);
    (0, import_toggleMaximizedBrowserWindow.toggleMaximizedBrowserWindow)(browserWindow);
    sinon.assert.calledOnce(browserWindow.maximize);
    sinon.assert.notCalled(browserWindow.unmaximize);
  });
  it("unmaximizes a maximized window", () => {
    const browserWindow = createFakeWindow();
    browserWindow.isMaximized.returns(true);
    (0, import_toggleMaximizedBrowserWindow.toggleMaximizedBrowserWindow)(browserWindow);
    sinon.assert.notCalled(browserWindow.maximize);
    sinon.assert.calledOnce(browserWindow.unmaximize);
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidG9nZ2xlTWF4aW1pemVkQnJvd3NlcldpbmRvd190ZXN0LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCAqIGFzIHNpbm9uIGZyb20gJ3Npbm9uJztcbmltcG9ydCB0eXBlIHsgQnJvd3NlcldpbmRvdyB9IGZyb20gJ2VsZWN0cm9uJztcblxuaW1wb3J0IHsgdG9nZ2xlTWF4aW1pemVkQnJvd3NlcldpbmRvdyB9IGZyb20gJy4uLy4uL3V0aWwvdG9nZ2xlTWF4aW1pemVkQnJvd3NlcldpbmRvdyc7XG5cbmRlc2NyaWJlKCd0b2dnbGVNYXhpbWl6ZWRCcm93c2VyV2luZG93JywgKCkgPT4ge1xuICBjb25zdCBjcmVhdGVGYWtlV2luZG93ID0gKCkgPT4gKHtcbiAgICBpc01heGltaXplZDogc2lub24uc3R1YigpLFxuICAgIHVubWF4aW1pemU6IHNpbm9uLnNweSgpLFxuICAgIG1heGltaXplOiBzaW5vbi5zcHkoKSxcbiAgfSk7XG5cbiAgaXQoJ21heGltaXplcyBhbiB1bm1heGltaXplZCB3aW5kb3cnLCAoKSA9PiB7XG4gICAgY29uc3QgYnJvd3NlcldpbmRvdyA9IGNyZWF0ZUZha2VXaW5kb3coKTtcbiAgICBicm93c2VyV2luZG93LmlzTWF4aW1pemVkLnJldHVybnMoZmFsc2UpO1xuXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICB0b2dnbGVNYXhpbWl6ZWRCcm93c2VyV2luZG93KGJyb3dzZXJXaW5kb3cgYXMgYW55IGFzIEJyb3dzZXJXaW5kb3cpO1xuXG4gICAgc2lub24uYXNzZXJ0LmNhbGxlZE9uY2UoYnJvd3NlcldpbmRvdy5tYXhpbWl6ZSk7XG4gICAgc2lub24uYXNzZXJ0Lm5vdENhbGxlZChicm93c2VyV2luZG93LnVubWF4aW1pemUpO1xuICB9KTtcblxuICBpdCgndW5tYXhpbWl6ZXMgYSBtYXhpbWl6ZWQgd2luZG93JywgKCkgPT4ge1xuICAgIGNvbnN0IGJyb3dzZXJXaW5kb3cgPSBjcmVhdGVGYWtlV2luZG93KCk7XG4gICAgYnJvd3NlcldpbmRvdy5pc01heGltaXplZC5yZXR1cm5zKHRydWUpO1xuXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICB0b2dnbGVNYXhpbWl6ZWRCcm93c2VyV2luZG93KGJyb3dzZXJXaW5kb3cgYXMgYW55IGFzIEJyb3dzZXJXaW5kb3cpO1xuXG4gICAgc2lub24uYXNzZXJ0Lm5vdENhbGxlZChicm93c2VyV2luZG93Lm1heGltaXplKTtcbiAgICBzaW5vbi5hc3NlcnQuY2FsbGVkT25jZShicm93c2VyV2luZG93LnVubWF4aW1pemUpO1xuICB9KTtcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7OztBQUdBLFlBQXVCO0FBR3ZCLDBDQUE2QztBQUU3QyxTQUFTLGdDQUFnQyxNQUFNO0FBQzdDLFFBQU0sbUJBQW1CLDZCQUFPO0FBQUEsSUFDOUIsYUFBYSxNQUFNLEtBQUs7QUFBQSxJQUN4QixZQUFZLE1BQU0sSUFBSTtBQUFBLElBQ3RCLFVBQVUsTUFBTSxJQUFJO0FBQUEsRUFDdEIsSUFKeUI7QUFNekIsS0FBRyxtQ0FBbUMsTUFBTTtBQUMxQyxVQUFNLGdCQUFnQixpQkFBaUI7QUFDdkMsa0JBQWMsWUFBWSxRQUFRLEtBQUs7QUFHdkMsMEVBQTZCLGFBQXFDO0FBRWxFLFVBQU0sT0FBTyxXQUFXLGNBQWMsUUFBUTtBQUM5QyxVQUFNLE9BQU8sVUFBVSxjQUFjLFVBQVU7QUFBQSxFQUNqRCxDQUFDO0FBRUQsS0FBRyxrQ0FBa0MsTUFBTTtBQUN6QyxVQUFNLGdCQUFnQixpQkFBaUI7QUFDdkMsa0JBQWMsWUFBWSxRQUFRLElBQUk7QUFHdEMsMEVBQTZCLGFBQXFDO0FBRWxFLFVBQU0sT0FBTyxVQUFVLGNBQWMsUUFBUTtBQUM3QyxVQUFNLE9BQU8sV0FBVyxjQUFjLFVBQVU7QUFBQSxFQUNsRCxDQUFDO0FBQ0gsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
