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
var import_PreventDisplaySleepService = require("../../../app/PreventDisplaySleepService");
describe("PreventDisplaySleepService", () => {
  class FakePowerSaveBlocker {
    constructor() {
      this.nextId = 0;
      this.idsStarted = /* @__PURE__ */ new Set();
    }
    isStarted(id) {
      return this.idsStarted.has(id);
    }
    start(type) {
      import_chai.assert.strictEqual(type, "prevent-display-sleep");
      const result = this.nextId;
      this.nextId += 1;
      this.idsStarted.add(result);
      return result;
    }
    stop(id) {
      (0, import_chai.assert)(this.idsStarted.has(id), `${id} was never started`);
      this.idsStarted.delete(id);
    }
    _idCount() {
      return this.idsStarted.size;
    }
  }
  let sandbox;
  let powerSaveBlocker;
  let service;
  beforeEach(() => {
    sandbox = sinon.createSandbox();
    powerSaveBlocker = new FakePowerSaveBlocker();
    service = new import_PreventDisplaySleepService.PreventDisplaySleepService(powerSaveBlocker);
  });
  afterEach(() => {
    sandbox.restore();
  });
  it("does nothing if disabling when it was already disabled", () => {
    const startStub = sandbox.stub(powerSaveBlocker, "start");
    const stopStub = sandbox.stub(powerSaveBlocker, "stop");
    service.setEnabled(false);
    import_chai.assert.strictEqual(powerSaveBlocker._idCount(), 0);
    sinon.assert.notCalled(startStub);
    sinon.assert.notCalled(stopStub);
  });
  it("can start power blocking", () => {
    service.setEnabled(true);
    import_chai.assert.strictEqual(powerSaveBlocker._idCount(), 1);
  });
  it("only starts power blocking once", () => {
    service.setEnabled(true);
    service.setEnabled(true);
    service.setEnabled(true);
    import_chai.assert.strictEqual(powerSaveBlocker._idCount(), 1);
  });
  it("can start and stop power blocking", () => {
    const startSpy = sandbox.spy(powerSaveBlocker, "start");
    const stopStub = sandbox.spy(powerSaveBlocker, "stop");
    service.setEnabled(true);
    service.setEnabled(false);
    import_chai.assert.strictEqual(powerSaveBlocker._idCount(), 0);
    sinon.assert.calledOnce(startSpy);
    sinon.assert.calledOnce(stopStub);
  });
  it("can toggle power blocking several times", () => {
    const startSpy = sandbox.spy(powerSaveBlocker, "start");
    const stopStub = sandbox.spy(powerSaveBlocker, "stop");
    service.setEnabled(true);
    service.setEnabled(false);
    service.setEnabled(true);
    service.setEnabled(false);
    service.setEnabled(true);
    import_chai.assert.strictEqual(powerSaveBlocker._idCount(), 1);
    sinon.assert.calledThrice(startSpy);
    sinon.assert.calledTwice(stopStub);
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiUHJldmVudERpc3BsYXlTbGVlcFNlcnZpY2VfdGVzdC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyBhc3NlcnQgfSBmcm9tICdjaGFpJztcbmltcG9ydCAqIGFzIHNpbm9uIGZyb20gJ3Npbm9uJztcbmltcG9ydCB0eXBlIHsgUG93ZXJTYXZlQmxvY2tlciB9IGZyb20gJ2VsZWN0cm9uJztcblxuaW1wb3J0IHsgUHJldmVudERpc3BsYXlTbGVlcFNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9hcHAvUHJldmVudERpc3BsYXlTbGVlcFNlcnZpY2UnO1xuXG5kZXNjcmliZSgnUHJldmVudERpc3BsYXlTbGVlcFNlcnZpY2UnLCAoKSA9PiB7XG4gIGNsYXNzIEZha2VQb3dlclNhdmVCbG9ja2VyIGltcGxlbWVudHMgUG93ZXJTYXZlQmxvY2tlciB7XG4gICAgcHJpdmF0ZSBuZXh0SWQgPSAwO1xuICAgIHByaXZhdGUgaWRzU3RhcnRlZCA9IG5ldyBTZXQ8bnVtYmVyPigpO1xuXG4gICAgaXNTdGFydGVkKGlkOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICAgIHJldHVybiB0aGlzLmlkc1N0YXJ0ZWQuaGFzKGlkKTtcbiAgICB9XG5cbiAgICBzdGFydCh0eXBlOiAncHJldmVudC1hcHAtc3VzcGVuc2lvbicgfCAncHJldmVudC1kaXNwbGF5LXNsZWVwJyk6IG51bWJlciB7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwodHlwZSwgJ3ByZXZlbnQtZGlzcGxheS1zbGVlcCcpO1xuXG4gICAgICBjb25zdCByZXN1bHQgPSB0aGlzLm5leHRJZDtcbiAgICAgIHRoaXMubmV4dElkICs9IDE7XG4gICAgICB0aGlzLmlkc1N0YXJ0ZWQuYWRkKHJlc3VsdCk7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIHN0b3AoaWQ6IG51bWJlcik6IHZvaWQge1xuICAgICAgYXNzZXJ0KHRoaXMuaWRzU3RhcnRlZC5oYXMoaWQpLCBgJHtpZH0gd2FzIG5ldmVyIHN0YXJ0ZWRgKTtcbiAgICAgIHRoaXMuaWRzU3RhcnRlZC5kZWxldGUoaWQpO1xuICAgIH1cblxuICAgIC8vIFRoaXMgaXMgb25seSBmb3IgdGVzdGluZy5cbiAgICBfaWRDb3VudCgpOiBudW1iZXIge1xuICAgICAgcmV0dXJuIHRoaXMuaWRzU3RhcnRlZC5zaXplO1xuICAgIH1cbiAgfVxuXG4gIGxldCBzYW5kYm94OiBzaW5vbi5TaW5vblNhbmRib3g7XG4gIGxldCBwb3dlclNhdmVCbG9ja2VyOiBGYWtlUG93ZXJTYXZlQmxvY2tlcjtcbiAgbGV0IHNlcnZpY2U6IFByZXZlbnREaXNwbGF5U2xlZXBTZXJ2aWNlO1xuXG4gIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgIHNhbmRib3ggPSBzaW5vbi5jcmVhdGVTYW5kYm94KCk7XG4gICAgcG93ZXJTYXZlQmxvY2tlciA9IG5ldyBGYWtlUG93ZXJTYXZlQmxvY2tlcigpO1xuICAgIHNlcnZpY2UgPSBuZXcgUHJldmVudERpc3BsYXlTbGVlcFNlcnZpY2UocG93ZXJTYXZlQmxvY2tlcik7XG4gIH0pO1xuXG4gIGFmdGVyRWFjaCgoKSA9PiB7XG4gICAgc2FuZGJveC5yZXN0b3JlKCk7XG4gIH0pO1xuXG4gIGl0KCdkb2VzIG5vdGhpbmcgaWYgZGlzYWJsaW5nIHdoZW4gaXQgd2FzIGFscmVhZHkgZGlzYWJsZWQnLCAoKSA9PiB7XG4gICAgY29uc3Qgc3RhcnRTdHViID0gc2FuZGJveC5zdHViKHBvd2VyU2F2ZUJsb2NrZXIsICdzdGFydCcpO1xuICAgIGNvbnN0IHN0b3BTdHViID0gc2FuZGJveC5zdHViKHBvd2VyU2F2ZUJsb2NrZXIsICdzdG9wJyk7XG5cbiAgICBzZXJ2aWNlLnNldEVuYWJsZWQoZmFsc2UpO1xuXG4gICAgYXNzZXJ0LnN0cmljdEVxdWFsKHBvd2VyU2F2ZUJsb2NrZXIuX2lkQ291bnQoKSwgMCk7XG4gICAgc2lub24uYXNzZXJ0Lm5vdENhbGxlZChzdGFydFN0dWIpO1xuICAgIHNpbm9uLmFzc2VydC5ub3RDYWxsZWQoc3RvcFN0dWIpO1xuICB9KTtcblxuICBpdCgnY2FuIHN0YXJ0IHBvd2VyIGJsb2NraW5nJywgKCkgPT4ge1xuICAgIHNlcnZpY2Uuc2V0RW5hYmxlZCh0cnVlKTtcblxuICAgIGFzc2VydC5zdHJpY3RFcXVhbChwb3dlclNhdmVCbG9ja2VyLl9pZENvdW50KCksIDEpO1xuICB9KTtcblxuICBpdCgnb25seSBzdGFydHMgcG93ZXIgYmxvY2tpbmcgb25jZScsICgpID0+IHtcbiAgICBzZXJ2aWNlLnNldEVuYWJsZWQodHJ1ZSk7XG4gICAgc2VydmljZS5zZXRFbmFibGVkKHRydWUpO1xuICAgIHNlcnZpY2Uuc2V0RW5hYmxlZCh0cnVlKTtcblxuICAgIGFzc2VydC5zdHJpY3RFcXVhbChwb3dlclNhdmVCbG9ja2VyLl9pZENvdW50KCksIDEpO1xuICB9KTtcblxuICBpdCgnY2FuIHN0YXJ0IGFuZCBzdG9wIHBvd2VyIGJsb2NraW5nJywgKCkgPT4ge1xuICAgIGNvbnN0IHN0YXJ0U3B5ID0gc2FuZGJveC5zcHkocG93ZXJTYXZlQmxvY2tlciwgJ3N0YXJ0Jyk7XG4gICAgY29uc3Qgc3RvcFN0dWIgPSBzYW5kYm94LnNweShwb3dlclNhdmVCbG9ja2VyLCAnc3RvcCcpO1xuXG4gICAgc2VydmljZS5zZXRFbmFibGVkKHRydWUpO1xuICAgIHNlcnZpY2Uuc2V0RW5hYmxlZChmYWxzZSk7XG5cbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwocG93ZXJTYXZlQmxvY2tlci5faWRDb3VudCgpLCAwKTtcbiAgICBzaW5vbi5hc3NlcnQuY2FsbGVkT25jZShzdGFydFNweSk7XG4gICAgc2lub24uYXNzZXJ0LmNhbGxlZE9uY2Uoc3RvcFN0dWIpO1xuICB9KTtcblxuICBpdCgnY2FuIHRvZ2dsZSBwb3dlciBibG9ja2luZyBzZXZlcmFsIHRpbWVzJywgKCkgPT4ge1xuICAgIGNvbnN0IHN0YXJ0U3B5ID0gc2FuZGJveC5zcHkocG93ZXJTYXZlQmxvY2tlciwgJ3N0YXJ0Jyk7XG4gICAgY29uc3Qgc3RvcFN0dWIgPSBzYW5kYm94LnNweShwb3dlclNhdmVCbG9ja2VyLCAnc3RvcCcpO1xuXG4gICAgc2VydmljZS5zZXRFbmFibGVkKHRydWUpO1xuICAgIHNlcnZpY2Uuc2V0RW5hYmxlZChmYWxzZSk7XG4gICAgc2VydmljZS5zZXRFbmFibGVkKHRydWUpO1xuICAgIHNlcnZpY2Uuc2V0RW5hYmxlZChmYWxzZSk7XG4gICAgc2VydmljZS5zZXRFbmFibGVkKHRydWUpO1xuXG4gICAgYXNzZXJ0LnN0cmljdEVxdWFsKHBvd2VyU2F2ZUJsb2NrZXIuX2lkQ291bnQoKSwgMSk7XG4gICAgc2lub24uYXNzZXJ0LmNhbGxlZFRocmljZShzdGFydFNweSk7XG4gICAgc2lub24uYXNzZXJ0LmNhbGxlZFR3aWNlKHN0b3BTdHViKTtcbiAgfSk7XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHQSxrQkFBdUI7QUFDdkIsWUFBdUI7QUFHdkIsd0NBQTJDO0FBRTNDLFNBQVMsOEJBQThCLE1BQU07QUFDM0MsUUFBTSxxQkFBaUQ7QUFBQSxJQUF2RDtBQUNVLG9CQUFTO0FBQ1Qsd0JBQWEsb0JBQUksSUFBWTtBQUFBO0FBQUEsSUFFckMsVUFBVSxJQUFxQjtBQUM3QixhQUFPLEtBQUssV0FBVyxJQUFJLEVBQUU7QUFBQSxJQUMvQjtBQUFBLElBRUEsTUFBTSxNQUFrRTtBQUN0RSx5QkFBTyxZQUFZLE1BQU0sdUJBQXVCO0FBRWhELFlBQU0sU0FBUyxLQUFLO0FBQ3BCLFdBQUssVUFBVTtBQUNmLFdBQUssV0FBVyxJQUFJLE1BQU07QUFDMUIsYUFBTztBQUFBLElBQ1Q7QUFBQSxJQUVBLEtBQUssSUFBa0I7QUFDckIsOEJBQU8sS0FBSyxXQUFXLElBQUksRUFBRSxHQUFHLEdBQUcsc0JBQXNCO0FBQ3pELFdBQUssV0FBVyxPQUFPLEVBQUU7QUFBQSxJQUMzQjtBQUFBLElBR0EsV0FBbUI7QUFDakIsYUFBTyxLQUFLLFdBQVc7QUFBQSxJQUN6QjtBQUFBLEVBQ0Y7QUExQkEsQUE0QkEsTUFBSTtBQUNKLE1BQUk7QUFDSixNQUFJO0FBRUosYUFBVyxNQUFNO0FBQ2YsY0FBVSxNQUFNLGNBQWM7QUFDOUIsdUJBQW1CLElBQUkscUJBQXFCO0FBQzVDLGNBQVUsSUFBSSw2REFBMkIsZ0JBQWdCO0FBQUEsRUFDM0QsQ0FBQztBQUVELFlBQVUsTUFBTTtBQUNkLFlBQVEsUUFBUTtBQUFBLEVBQ2xCLENBQUM7QUFFRCxLQUFHLDBEQUEwRCxNQUFNO0FBQ2pFLFVBQU0sWUFBWSxRQUFRLEtBQUssa0JBQWtCLE9BQU87QUFDeEQsVUFBTSxXQUFXLFFBQVEsS0FBSyxrQkFBa0IsTUFBTTtBQUV0RCxZQUFRLFdBQVcsS0FBSztBQUV4Qix1QkFBTyxZQUFZLGlCQUFpQixTQUFTLEdBQUcsQ0FBQztBQUNqRCxVQUFNLE9BQU8sVUFBVSxTQUFTO0FBQ2hDLFVBQU0sT0FBTyxVQUFVLFFBQVE7QUFBQSxFQUNqQyxDQUFDO0FBRUQsS0FBRyw0QkFBNEIsTUFBTTtBQUNuQyxZQUFRLFdBQVcsSUFBSTtBQUV2Qix1QkFBTyxZQUFZLGlCQUFpQixTQUFTLEdBQUcsQ0FBQztBQUFBLEVBQ25ELENBQUM7QUFFRCxLQUFHLG1DQUFtQyxNQUFNO0FBQzFDLFlBQVEsV0FBVyxJQUFJO0FBQ3ZCLFlBQVEsV0FBVyxJQUFJO0FBQ3ZCLFlBQVEsV0FBVyxJQUFJO0FBRXZCLHVCQUFPLFlBQVksaUJBQWlCLFNBQVMsR0FBRyxDQUFDO0FBQUEsRUFDbkQsQ0FBQztBQUVELEtBQUcscUNBQXFDLE1BQU07QUFDNUMsVUFBTSxXQUFXLFFBQVEsSUFBSSxrQkFBa0IsT0FBTztBQUN0RCxVQUFNLFdBQVcsUUFBUSxJQUFJLGtCQUFrQixNQUFNO0FBRXJELFlBQVEsV0FBVyxJQUFJO0FBQ3ZCLFlBQVEsV0FBVyxLQUFLO0FBRXhCLHVCQUFPLFlBQVksaUJBQWlCLFNBQVMsR0FBRyxDQUFDO0FBQ2pELFVBQU0sT0FBTyxXQUFXLFFBQVE7QUFDaEMsVUFBTSxPQUFPLFdBQVcsUUFBUTtBQUFBLEVBQ2xDLENBQUM7QUFFRCxLQUFHLDJDQUEyQyxNQUFNO0FBQ2xELFVBQU0sV0FBVyxRQUFRLElBQUksa0JBQWtCLE9BQU87QUFDdEQsVUFBTSxXQUFXLFFBQVEsSUFBSSxrQkFBa0IsTUFBTTtBQUVyRCxZQUFRLFdBQVcsSUFBSTtBQUN2QixZQUFRLFdBQVcsS0FBSztBQUN4QixZQUFRLFdBQVcsSUFBSTtBQUN2QixZQUFRLFdBQVcsS0FBSztBQUN4QixZQUFRLFdBQVcsSUFBSTtBQUV2Qix1QkFBTyxZQUFZLGlCQUFpQixTQUFTLEdBQUcsQ0FBQztBQUNqRCxVQUFNLE9BQU8sYUFBYSxRQUFRO0FBQ2xDLFVBQU0sT0FBTyxZQUFZLFFBQVE7QUFBQSxFQUNuQyxDQUFDO0FBQ0gsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
