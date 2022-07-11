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
var import_waitForOnline = require("../../util/waitForOnline");
describe("waitForOnline", () => {
  let sandbox;
  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });
  afterEach(() => {
    sandbox.restore();
  });
  function getFakeWindow() {
    const result = new EventTarget();
    sinon.stub(result, "addEventListener");
    sinon.stub(result, "removeEventListener");
    return result;
  }
  it("resolves immediately if you're online", async () => {
    const fakeNavigator = { onLine: true };
    const fakeWindow = getFakeWindow();
    await (0, import_waitForOnline.waitForOnline)(fakeNavigator, fakeWindow);
    sinon.assert.notCalled(fakeWindow.addEventListener);
    sinon.assert.notCalled(fakeWindow.removeEventListener);
  });
  it("if you're offline, resolves as soon as you're online (and cleans up listeners)", async () => {
    const fakeNavigator = { onLine: false };
    const fakeWindow = getFakeWindow();
    fakeWindow.addEventListener.withArgs("online").callsFake((_eventName, callback) => {
      setTimeout(callback, 0);
    });
    let done = false;
    const promise = (async () => {
      await (0, import_waitForOnline.waitForOnline)(fakeNavigator, fakeWindow);
      done = true;
    })();
    import_chai.assert.isFalse(done);
    await promise;
    import_chai.assert.isTrue(done);
    sinon.assert.calledOnce(fakeWindow.addEventListener);
    sinon.assert.calledOnce(fakeWindow.removeEventListener);
  });
  it("resolves immediately if you're online when passed a timeout", async () => {
    const fakeNavigator = { onLine: true };
    const fakeWindow = getFakeWindow();
    await (0, import_waitForOnline.waitForOnline)(fakeNavigator, fakeWindow, { timeout: 1234 });
    sinon.assert.notCalled(fakeWindow.addEventListener);
    sinon.assert.notCalled(fakeWindow.removeEventListener);
  });
  it("resolves immediately if you're online even if passed a timeout of 0", async () => {
    const fakeNavigator = { onLine: true };
    const fakeWindow = getFakeWindow();
    await (0, import_waitForOnline.waitForOnline)(fakeNavigator, fakeWindow, { timeout: 0 });
    sinon.assert.notCalled(fakeWindow.addEventListener);
    sinon.assert.notCalled(fakeWindow.removeEventListener);
  });
  it("if you're offline, resolves as soon as you're online if it happens before the timeout", async () => {
    const clock = sandbox.useFakeTimers();
    const fakeNavigator = { onLine: false };
    const fakeWindow = getFakeWindow();
    fakeWindow.addEventListener.withArgs("online").callsFake((_eventName, callback) => {
      setTimeout(callback, 1e3);
    });
    let done = false;
    (async () => {
      await (0, import_waitForOnline.waitForOnline)(fakeNavigator, fakeWindow, { timeout: 9999 });
      done = true;
    })();
    await clock.tickAsync(600);
    import_chai.assert.isFalse(done);
    await clock.tickAsync(500);
    import_chai.assert.isTrue(done);
  });
  it("rejects if too much time has passed, and cleans up listeners", async () => {
    const clock = sandbox.useFakeTimers();
    const fakeNavigator = { onLine: false };
    const fakeWindow = getFakeWindow();
    fakeWindow.addEventListener.withArgs("online").callsFake((_eventName, callback) => {
      setTimeout(callback, 9999);
    });
    const promise = (0, import_waitForOnline.waitForOnline)(fakeNavigator, fakeWindow, {
      timeout: 100
    });
    await clock.tickAsync(500);
    await import_chai.assert.isRejected(promise);
    sinon.assert.calledOnce(fakeWindow.removeEventListener);
  });
  it("rejects if offline and passed a timeout of 0", async () => {
    const fakeNavigator = { onLine: false };
    const fakeWindow = getFakeWindow();
    fakeWindow.addEventListener.withArgs("online").callsFake((_eventName, callback) => {
      setTimeout(callback, 9999);
    });
    const promise = (0, import_waitForOnline.waitForOnline)(fakeNavigator, fakeWindow, { timeout: 0 });
    await import_chai.assert.isRejected(promise);
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsid2FpdEZvck9ubGluZV90ZXN0LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IGFzc2VydCB9IGZyb20gJ2NoYWknO1xuaW1wb3J0ICogYXMgc2lub24gZnJvbSAnc2lub24nO1xuXG5pbXBvcnQgeyB3YWl0Rm9yT25saW5lIH0gZnJvbSAnLi4vLi4vdXRpbC93YWl0Rm9yT25saW5lJztcblxuZGVzY3JpYmUoJ3dhaXRGb3JPbmxpbmUnLCAoKSA9PiB7XG4gIGxldCBzYW5kYm94OiBzaW5vbi5TaW5vblNhbmRib3g7XG5cbiAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgc2FuZGJveCA9IHNpbm9uLmNyZWF0ZVNhbmRib3goKTtcbiAgfSk7XG5cbiAgYWZ0ZXJFYWNoKCgpID0+IHtcbiAgICBzYW5kYm94LnJlc3RvcmUoKTtcbiAgfSk7XG5cbiAgZnVuY3Rpb24gZ2V0RmFrZVdpbmRvdygpOiBFdmVudFRhcmdldCB7XG4gICAgY29uc3QgcmVzdWx0ID0gbmV3IEV2ZW50VGFyZ2V0KCk7XG4gICAgc2lub24uc3R1YihyZXN1bHQsICdhZGRFdmVudExpc3RlbmVyJyk7XG4gICAgc2lub24uc3R1YihyZXN1bHQsICdyZW1vdmVFdmVudExpc3RlbmVyJyk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGl0KFwicmVzb2x2ZXMgaW1tZWRpYXRlbHkgaWYgeW91J3JlIG9ubGluZVwiLCBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgZmFrZU5hdmlnYXRvciA9IHsgb25MaW5lOiB0cnVlIH07XG4gICAgY29uc3QgZmFrZVdpbmRvdyA9IGdldEZha2VXaW5kb3coKTtcblxuICAgIGF3YWl0IHdhaXRGb3JPbmxpbmUoZmFrZU5hdmlnYXRvciwgZmFrZVdpbmRvdyk7XG5cbiAgICBzaW5vbi5hc3NlcnQubm90Q2FsbGVkKGZha2VXaW5kb3cuYWRkRXZlbnRMaXN0ZW5lciBhcyBzaW5vbi5TaW5vblN0dWIpO1xuICAgIHNpbm9uLmFzc2VydC5ub3RDYWxsZWQoZmFrZVdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyIGFzIHNpbm9uLlNpbm9uU3R1Yik7XG4gIH0pO1xuXG4gIGl0KFwiaWYgeW91J3JlIG9mZmxpbmUsIHJlc29sdmVzIGFzIHNvb24gYXMgeW91J3JlIG9ubGluZSAoYW5kIGNsZWFucyB1cCBsaXN0ZW5lcnMpXCIsIGFzeW5jICgpID0+IHtcbiAgICBjb25zdCBmYWtlTmF2aWdhdG9yID0geyBvbkxpbmU6IGZhbHNlIH07XG4gICAgY29uc3QgZmFrZVdpbmRvdyA9IGdldEZha2VXaW5kb3coKTtcblxuICAgIChmYWtlV2luZG93LmFkZEV2ZW50TGlzdGVuZXIgYXMgc2lub24uU2lub25TdHViKVxuICAgICAgLndpdGhBcmdzKCdvbmxpbmUnKVxuICAgICAgLmNhbGxzRmFrZSgoX2V2ZW50TmFtZTogc3RyaW5nLCBjYWxsYmFjazogKCkgPT4gdm9pZCkgPT4ge1xuICAgICAgICBzZXRUaW1lb3V0KGNhbGxiYWNrLCAwKTtcbiAgICAgIH0pO1xuXG4gICAgbGV0IGRvbmUgPSBmYWxzZTtcbiAgICBjb25zdCBwcm9taXNlID0gKGFzeW5jICgpID0+IHtcbiAgICAgIGF3YWl0IHdhaXRGb3JPbmxpbmUoZmFrZU5hdmlnYXRvciwgZmFrZVdpbmRvdyk7XG4gICAgICBkb25lID0gdHJ1ZTtcbiAgICB9KSgpO1xuXG4gICAgYXNzZXJ0LmlzRmFsc2UoZG9uZSk7XG5cbiAgICBhd2FpdCBwcm9taXNlO1xuXG4gICAgYXNzZXJ0LmlzVHJ1ZShkb25lKTtcbiAgICBzaW5vbi5hc3NlcnQuY2FsbGVkT25jZShmYWtlV2luZG93LmFkZEV2ZW50TGlzdGVuZXIgYXMgc2lub24uU2lub25TdHViKTtcbiAgICBzaW5vbi5hc3NlcnQuY2FsbGVkT25jZShmYWtlV2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIgYXMgc2lub24uU2lub25TdHViKTtcbiAgfSk7XG5cbiAgaXQoXCJyZXNvbHZlcyBpbW1lZGlhdGVseSBpZiB5b3UncmUgb25saW5lIHdoZW4gcGFzc2VkIGEgdGltZW91dFwiLCBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgZmFrZU5hdmlnYXRvciA9IHsgb25MaW5lOiB0cnVlIH07XG4gICAgY29uc3QgZmFrZVdpbmRvdyA9IGdldEZha2VXaW5kb3coKTtcblxuICAgIGF3YWl0IHdhaXRGb3JPbmxpbmUoZmFrZU5hdmlnYXRvciwgZmFrZVdpbmRvdywgeyB0aW1lb3V0OiAxMjM0IH0pO1xuXG4gICAgc2lub24uYXNzZXJ0Lm5vdENhbGxlZChmYWtlV2luZG93LmFkZEV2ZW50TGlzdGVuZXIgYXMgc2lub24uU2lub25TdHViKTtcbiAgICBzaW5vbi5hc3NlcnQubm90Q2FsbGVkKGZha2VXaW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lciBhcyBzaW5vbi5TaW5vblN0dWIpO1xuICB9KTtcblxuICBpdChcInJlc29sdmVzIGltbWVkaWF0ZWx5IGlmIHlvdSdyZSBvbmxpbmUgZXZlbiBpZiBwYXNzZWQgYSB0aW1lb3V0IG9mIDBcIiwgYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IGZha2VOYXZpZ2F0b3IgPSB7IG9uTGluZTogdHJ1ZSB9O1xuICAgIGNvbnN0IGZha2VXaW5kb3cgPSBnZXRGYWtlV2luZG93KCk7XG5cbiAgICBhd2FpdCB3YWl0Rm9yT25saW5lKGZha2VOYXZpZ2F0b3IsIGZha2VXaW5kb3csIHsgdGltZW91dDogMCB9KTtcblxuICAgIHNpbm9uLmFzc2VydC5ub3RDYWxsZWQoZmFrZVdpbmRvdy5hZGRFdmVudExpc3RlbmVyIGFzIHNpbm9uLlNpbm9uU3R1Yik7XG4gICAgc2lub24uYXNzZXJ0Lm5vdENhbGxlZChmYWtlV2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIgYXMgc2lub24uU2lub25TdHViKTtcbiAgfSk7XG5cbiAgaXQoXCJpZiB5b3UncmUgb2ZmbGluZSwgcmVzb2x2ZXMgYXMgc29vbiBhcyB5b3UncmUgb25saW5lIGlmIGl0IGhhcHBlbnMgYmVmb3JlIHRoZSB0aW1lb3V0XCIsIGFzeW5jICgpID0+IHtcbiAgICBjb25zdCBjbG9jayA9IHNhbmRib3gudXNlRmFrZVRpbWVycygpO1xuXG4gICAgY29uc3QgZmFrZU5hdmlnYXRvciA9IHsgb25MaW5lOiBmYWxzZSB9O1xuICAgIGNvbnN0IGZha2VXaW5kb3cgPSBnZXRGYWtlV2luZG93KCk7XG5cbiAgICAoZmFrZVdpbmRvdy5hZGRFdmVudExpc3RlbmVyIGFzIHNpbm9uLlNpbm9uU3R1YilcbiAgICAgIC53aXRoQXJncygnb25saW5lJylcbiAgICAgIC5jYWxsc0Zha2UoKF9ldmVudE5hbWU6IHN0cmluZywgY2FsbGJhY2s6ICgpID0+IHZvaWQpID0+IHtcbiAgICAgICAgc2V0VGltZW91dChjYWxsYmFjaywgMTAwMCk7XG4gICAgICB9KTtcblxuICAgIGxldCBkb25lID0gZmFsc2U7XG4gICAgKGFzeW5jICgpID0+IHtcbiAgICAgIGF3YWl0IHdhaXRGb3JPbmxpbmUoZmFrZU5hdmlnYXRvciwgZmFrZVdpbmRvdywgeyB0aW1lb3V0OiA5OTk5IH0pO1xuICAgICAgZG9uZSA9IHRydWU7XG4gICAgfSkoKTtcblxuICAgIGF3YWl0IGNsb2NrLnRpY2tBc3luYyg2MDApO1xuICAgIGFzc2VydC5pc0ZhbHNlKGRvbmUpO1xuXG4gICAgYXdhaXQgY2xvY2sudGlja0FzeW5jKDUwMCk7XG5cbiAgICBhc3NlcnQuaXNUcnVlKGRvbmUpO1xuICB9KTtcblxuICBpdCgncmVqZWN0cyBpZiB0b28gbXVjaCB0aW1lIGhhcyBwYXNzZWQsIGFuZCBjbGVhbnMgdXAgbGlzdGVuZXJzJywgYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IGNsb2NrID0gc2FuZGJveC51c2VGYWtlVGltZXJzKCk7XG5cbiAgICBjb25zdCBmYWtlTmF2aWdhdG9yID0geyBvbkxpbmU6IGZhbHNlIH07XG4gICAgY29uc3QgZmFrZVdpbmRvdyA9IGdldEZha2VXaW5kb3coKTtcblxuICAgIChmYWtlV2luZG93LmFkZEV2ZW50TGlzdGVuZXIgYXMgc2lub24uU2lub25TdHViKVxuICAgICAgLndpdGhBcmdzKCdvbmxpbmUnKVxuICAgICAgLmNhbGxzRmFrZSgoX2V2ZW50TmFtZTogc3RyaW5nLCBjYWxsYmFjazogKCkgPT4gdm9pZCkgPT4ge1xuICAgICAgICBzZXRUaW1lb3V0KGNhbGxiYWNrLCA5OTk5KTtcbiAgICAgIH0pO1xuXG4gICAgY29uc3QgcHJvbWlzZSA9IHdhaXRGb3JPbmxpbmUoZmFrZU5hdmlnYXRvciwgZmFrZVdpbmRvdywge1xuICAgICAgdGltZW91dDogMTAwLFxuICAgIH0pO1xuXG4gICAgYXdhaXQgY2xvY2sudGlja0FzeW5jKDUwMCk7XG5cbiAgICBhd2FpdCBhc3NlcnQuaXNSZWplY3RlZChwcm9taXNlKTtcblxuICAgIHNpbm9uLmFzc2VydC5jYWxsZWRPbmNlKGZha2VXaW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lciBhcyBzaW5vbi5TaW5vblN0dWIpO1xuICB9KTtcblxuICBpdCgncmVqZWN0cyBpZiBvZmZsaW5lIGFuZCBwYXNzZWQgYSB0aW1lb3V0IG9mIDAnLCBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgZmFrZU5hdmlnYXRvciA9IHsgb25MaW5lOiBmYWxzZSB9O1xuICAgIGNvbnN0IGZha2VXaW5kb3cgPSBnZXRGYWtlV2luZG93KCk7XG5cbiAgICAoZmFrZVdpbmRvdy5hZGRFdmVudExpc3RlbmVyIGFzIHNpbm9uLlNpbm9uU3R1YilcbiAgICAgIC53aXRoQXJncygnb25saW5lJylcbiAgICAgIC5jYWxsc0Zha2UoKF9ldmVudE5hbWU6IHN0cmluZywgY2FsbGJhY2s6ICgpID0+IHZvaWQpID0+IHtcbiAgICAgICAgc2V0VGltZW91dChjYWxsYmFjaywgOTk5OSk7XG4gICAgICB9KTtcblxuICAgIGNvbnN0IHByb21pc2UgPSB3YWl0Rm9yT25saW5lKGZha2VOYXZpZ2F0b3IsIGZha2VXaW5kb3csIHsgdGltZW91dDogMCB9KTtcblxuICAgIGF3YWl0IGFzc2VydC5pc1JlamVjdGVkKHByb21pc2UpO1xuICB9KTtcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7OztBQUdBLGtCQUF1QjtBQUN2QixZQUF1QjtBQUV2QiwyQkFBOEI7QUFFOUIsU0FBUyxpQkFBaUIsTUFBTTtBQUM5QixNQUFJO0FBRUosYUFBVyxNQUFNO0FBQ2YsY0FBVSxNQUFNLGNBQWM7QUFBQSxFQUNoQyxDQUFDO0FBRUQsWUFBVSxNQUFNO0FBQ2QsWUFBUSxRQUFRO0FBQUEsRUFDbEIsQ0FBQztBQUVELDJCQUFzQztBQUNwQyxVQUFNLFNBQVMsSUFBSSxZQUFZO0FBQy9CLFVBQU0sS0FBSyxRQUFRLGtCQUFrQjtBQUNyQyxVQUFNLEtBQUssUUFBUSxxQkFBcUI7QUFDeEMsV0FBTztBQUFBLEVBQ1Q7QUFMUyxBQU9ULEtBQUcseUNBQXlDLFlBQVk7QUFDdEQsVUFBTSxnQkFBZ0IsRUFBRSxRQUFRLEtBQUs7QUFDckMsVUFBTSxhQUFhLGNBQWM7QUFFakMsVUFBTSx3Q0FBYyxlQUFlLFVBQVU7QUFFN0MsVUFBTSxPQUFPLFVBQVUsV0FBVyxnQkFBbUM7QUFDckUsVUFBTSxPQUFPLFVBQVUsV0FBVyxtQkFBc0M7QUFBQSxFQUMxRSxDQUFDO0FBRUQsS0FBRyxrRkFBa0YsWUFBWTtBQUMvRixVQUFNLGdCQUFnQixFQUFFLFFBQVEsTUFBTTtBQUN0QyxVQUFNLGFBQWEsY0FBYztBQUVqQyxJQUFDLFdBQVcsaUJBQ1QsU0FBUyxRQUFRLEVBQ2pCLFVBQVUsQ0FBQyxZQUFvQixhQUF5QjtBQUN2RCxpQkFBVyxVQUFVLENBQUM7QUFBQSxJQUN4QixDQUFDO0FBRUgsUUFBSSxPQUFPO0FBQ1gsVUFBTSxVQUFXLGFBQVk7QUFDM0IsWUFBTSx3Q0FBYyxlQUFlLFVBQVU7QUFDN0MsYUFBTztBQUFBLElBQ1QsR0FBRztBQUVILHVCQUFPLFFBQVEsSUFBSTtBQUVuQixVQUFNO0FBRU4sdUJBQU8sT0FBTyxJQUFJO0FBQ2xCLFVBQU0sT0FB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
