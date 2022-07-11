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
var import_sinon = require("sinon");
var semver = __toESM(require("semver"));
var import_version = require("../../util/version");
describe("version utilities", () => {
  describe("isProduction", () => {
    it("returns false for anything non-basic version number", () => {
      import_chai.assert.isFalse((0, import_version.isProduction)("1.2.3-1"));
      import_chai.assert.isFalse((0, import_version.isProduction)("1.2.3-alpha.1"));
      import_chai.assert.isFalse((0, import_version.isProduction)("1.2.3-beta.1"));
      import_chai.assert.isFalse((0, import_version.isProduction)("1.2.3-rc"));
    });
    it("returns true for production version strings", () => {
      import_chai.assert.isTrue((0, import_version.isProduction)("1.2.3"));
      import_chai.assert.isTrue((0, import_version.isProduction)("5.10.0"));
    });
  });
  describe("isBeta", () => {
    it("returns false for non-beta version strings", () => {
      import_chai.assert.isFalse((0, import_version.isBeta)("1.2.3"));
      import_chai.assert.isFalse((0, import_version.isBeta)("1.2.3-alpha"));
      import_chai.assert.isFalse((0, import_version.isBeta)("1.2.3-alpha.1"));
      import_chai.assert.isFalse((0, import_version.isBeta)("1.2.3-rc.1"));
    });
    it("returns true for beta version strings", () => {
      import_chai.assert.isTrue((0, import_version.isBeta)("1.2.3-beta"));
      import_chai.assert.isTrue((0, import_version.isBeta)("1.2.3-beta.1"));
    });
  });
  describe("isAlpha", () => {
    it("returns false for non-alpha version strings", () => {
      import_chai.assert.isFalse((0, import_version.isAlpha)("1.2.3"));
      import_chai.assert.isFalse((0, import_version.isAlpha)("1.2.3-staging.1"));
      import_chai.assert.isFalse((0, import_version.isAlpha)("1.2.3-beta"));
      import_chai.assert.isFalse((0, import_version.isAlpha)("1.2.3-beta.1"));
      import_chai.assert.isFalse((0, import_version.isAlpha)("1.2.3-rc.1"));
    });
    it("returns true for Alpha version strings", () => {
      import_chai.assert.isTrue((0, import_version.isAlpha)("1.2.3-alpha"));
      import_chai.assert.isTrue((0, import_version.isAlpha)("1.2.3-alpha.1"));
    });
  });
  describe("isStaging", () => {
    it("returns false for non-staging version strings", () => {
      import_chai.assert.isFalse((0, import_version.isStaging)("1.2.3"));
      import_chai.assert.isFalse((0, import_version.isStaging)("1.2.3-alpha.1"));
      import_chai.assert.isFalse((0, import_version.isStaging)("1.2.3-beta"));
      import_chai.assert.isFalse((0, import_version.isStaging)("1.2.3-beta.1"));
      import_chai.assert.isFalse((0, import_version.isStaging)("1.2.3-rc.1"));
    });
    it("returns true for Staging version strings", () => {
      import_chai.assert.isTrue((0, import_version.isStaging)("1.2.3-staging"));
      import_chai.assert.isTrue((0, import_version.isStaging)("1.2.3-staging.1"));
      import_chai.assert.isTrue((0, import_version.isStaging)("1.2.3-staging.1232.23-adsfs"));
    });
  });
  describe("generateAlphaVersion", () => {
    beforeEach(/* @__PURE__ */ __name(function beforeEach2() {
      this.clock = (0, import_sinon.useFakeTimers)();
    }, "beforeEach"));
    afterEach(/* @__PURE__ */ __name(function afterEach2() {
      this.clock.restore();
    }, "afterEach"));
    it("uses the current date and provided shortSha", function test() {
      this.clock.setSystemTime(new Date("2021-07-23T01:22:55.692Z").getTime());
      const currentVersion = "5.12.0-beta.1";
      const shortSha = "07f0efc45";
      const expected = "5.12.0-alpha.20210723.01-07f0efc45";
      const actual = (0, import_version.generateAlphaVersion)({ currentVersion, shortSha });
      import_chai.assert.strictEqual(expected, actual);
    });
    it("same production version is semver.gt", function test() {
      const currentVersion = "5.12.0-beta.1";
      const shortSha = "07f0efc45";
      this.clock.setSystemTime(new Date("2021-07-23T01:22:55.692Z").getTime());
      const actual = (0, import_version.generateAlphaVersion)({ currentVersion, shortSha });
      import_chai.assert.isTrue(semver.gt("5.12.0", actual));
    });
    it("same beta version is semver.gt", function test() {
      const currentVersion = "5.12.0-beta.1";
      const shortSha = "07f0efc45";
      this.clock.setSystemTime(new Date("2021-07-23T01:22:55.692Z").getTime());
      const actual = (0, import_version.generateAlphaVersion)({ currentVersion, shortSha });
      import_chai.assert.isTrue(semver.gt(currentVersion, actual));
    });
    it("build earlier same day is semver.lt", function test() {
      const currentVersion = "5.12.0-beta.1";
      const shortSha = "07f0efc45";
      this.clock.setSystemTime(new Date("2021-07-23T00:22:55.692Z").getTime());
      const actualEarlier = (0, import_version.generateAlphaVersion)({ currentVersion, shortSha });
      this.clock.setSystemTime(new Date("2021-07-23T01:22:55.692Z").getTime());
      const actualLater = (0, import_version.generateAlphaVersion)({ currentVersion, shortSha });
      import_chai.assert.isTrue(semver.lt(actualEarlier, actualLater));
    });
    it("build previous day is semver.lt", function test() {
      const currentVersion = "5.12.0-beta.1";
      const shortSha = "07f0efc45";
      this.clock.setSystemTime(new Date("2021-07-22T01:22:55.692Z").getTime());
      const actualEarlier = (0, import_version.generateAlphaVersion)({ currentVersion, shortSha });
      this.clock.setSystemTime(new Date("2021-07-23T01:22:55.692Z").getTime());
      const actualLater = (0, import_version.generateAlphaVersion)({ currentVersion, shortSha });
      import_chai.assert.isTrue(semver.lt(actualEarlier, actualLater));
    });
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidmVyc2lvbl90ZXN0LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMCBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IGFzc2VydCB9IGZyb20gJ2NoYWknO1xuaW1wb3J0IHsgdXNlRmFrZVRpbWVycyB9IGZyb20gJ3Npbm9uJztcbmltcG9ydCAqIGFzIHNlbXZlciBmcm9tICdzZW12ZXInO1xuXG5pbXBvcnQge1xuICBnZW5lcmF0ZUFscGhhVmVyc2lvbixcbiAgaXNBbHBoYSxcbiAgaXNCZXRhLFxuICBpc1Byb2R1Y3Rpb24sXG4gIGlzU3RhZ2luZyxcbn0gZnJvbSAnLi4vLi4vdXRpbC92ZXJzaW9uJztcblxuZGVzY3JpYmUoJ3ZlcnNpb24gdXRpbGl0aWVzJywgKCkgPT4ge1xuICBkZXNjcmliZSgnaXNQcm9kdWN0aW9uJywgKCkgPT4ge1xuICAgIGl0KCdyZXR1cm5zIGZhbHNlIGZvciBhbnl0aGluZyBub24tYmFzaWMgdmVyc2lvbiBudW1iZXInLCAoKSA9PiB7XG4gICAgICBhc3NlcnQuaXNGYWxzZShpc1Byb2R1Y3Rpb24oJzEuMi4zLTEnKSk7XG4gICAgICBhc3NlcnQuaXNGYWxzZShpc1Byb2R1Y3Rpb24oJzEuMi4zLWFscGhhLjEnKSk7XG4gICAgICBhc3NlcnQuaXNGYWxzZShpc1Byb2R1Y3Rpb24oJzEuMi4zLWJldGEuMScpKTtcbiAgICAgIGFzc2VydC5pc0ZhbHNlKGlzUHJvZHVjdGlvbignMS4yLjMtcmMnKSk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyB0cnVlIGZvciBwcm9kdWN0aW9uIHZlcnNpb24gc3RyaW5ncycsICgpID0+IHtcbiAgICAgIGFzc2VydC5pc1RydWUoaXNQcm9kdWN0aW9uKCcxLjIuMycpKTtcbiAgICAgIGFzc2VydC5pc1RydWUoaXNQcm9kdWN0aW9uKCc1LjEwLjAnKSk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdpc0JldGEnLCAoKSA9PiB7XG4gICAgaXQoJ3JldHVybnMgZmFsc2UgZm9yIG5vbi1iZXRhIHZlcnNpb24gc3RyaW5ncycsICgpID0+IHtcbiAgICAgIGFzc2VydC5pc0ZhbHNlKGlzQmV0YSgnMS4yLjMnKSk7XG4gICAgICBhc3NlcnQuaXNGYWxzZShpc0JldGEoJzEuMi4zLWFscGhhJykpO1xuICAgICAgYXNzZXJ0LmlzRmFsc2UoaXNCZXRhKCcxLjIuMy1hbHBoYS4xJykpO1xuICAgICAgYXNzZXJ0LmlzRmFsc2UoaXNCZXRhKCcxLjIuMy1yYy4xJykpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgdHJ1ZSBmb3IgYmV0YSB2ZXJzaW9uIHN0cmluZ3MnLCAoKSA9PiB7XG4gICAgICBhc3NlcnQuaXNUcnVlKGlzQmV0YSgnMS4yLjMtYmV0YScpKTtcbiAgICAgIGFzc2VydC5pc1RydWUoaXNCZXRhKCcxLjIuMy1iZXRhLjEnKSk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdpc0FscGhhJywgKCkgPT4ge1xuICAgIGl0KCdyZXR1cm5zIGZhbHNlIGZvciBub24tYWxwaGEgdmVyc2lvbiBzdHJpbmdzJywgKCkgPT4ge1xuICAgICAgYXNzZXJ0LmlzRmFsc2UoaXNBbHBoYSgnMS4yLjMnKSk7XG4gICAgICBhc3NlcnQuaXNGYWxzZShpc0FscGhhKCcxLjIuMy1zdGFnaW5nLjEnKSk7XG4gICAgICBhc3NlcnQuaXNGYWxzZShpc0FscGhhKCcxLjIuMy1iZXRhJykpO1xuICAgICAgYXNzZXJ0LmlzRmFsc2UoaXNBbHBoYSgnMS4yLjMtYmV0YS4xJykpO1xuICAgICAgYXNzZXJ0LmlzRmFsc2UoaXNBbHBoYSgnMS4yLjMtcmMuMScpKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIHRydWUgZm9yIEFscGhhIHZlcnNpb24gc3RyaW5ncycsICgpID0+IHtcbiAgICAgIGFzc2VydC5pc1RydWUoaXNBbHBoYSgnMS4yLjMtYWxwaGEnKSk7XG4gICAgICBhc3NlcnQuaXNUcnVlKGlzQWxwaGEoJzEuMi4zLWFscGhhLjEnKSk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdpc1N0YWdpbmcnLCAoKSA9PiB7XG4gICAgaXQoJ3JldHVybnMgZmFsc2UgZm9yIG5vbi1zdGFnaW5nIHZlcnNpb24gc3RyaW5ncycsICgpID0+IHtcbiAgICAgIGFzc2VydC5pc0ZhbHNlKGlzU3RhZ2luZygnMS4yLjMnKSk7XG4gICAgICBhc3NlcnQuaXNGYWxzZShpc1N0YWdpbmcoJzEuMi4zLWFscGhhLjEnKSk7XG4gICAgICBhc3NlcnQuaXNGYWxzZShpc1N0YWdpbmcoJzEuMi4zLWJldGEnKSk7XG4gICAgICBhc3NlcnQuaXNGYWxzZShpc1N0YWdpbmcoJzEuMi4zLWJldGEuMScpKTtcbiAgICAgIGFzc2VydC5pc0ZhbHNlKGlzU3RhZ2luZygnMS4yLjMtcmMuMScpKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIHRydWUgZm9yIFN0YWdpbmcgdmVyc2lvbiBzdHJpbmdzJywgKCkgPT4ge1xuICAgICAgYXNzZXJ0LmlzVHJ1ZShpc1N0YWdpbmcoJzEuMi4zLXN0YWdpbmcnKSk7XG4gICAgICBhc3NlcnQuaXNUcnVlKGlzU3RhZ2luZygnMS4yLjMtc3RhZ2luZy4xJykpO1xuICAgICAgYXNzZXJ0LmlzVHJ1ZShpc1N0YWdpbmcoJzEuMi4zLXN0YWdpbmcuMTIzMi4yMy1hZHNmcycpKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ2dlbmVyYXRlQWxwaGFWZXJzaW9uJywgKCkgPT4ge1xuICAgIGJlZm9yZUVhY2goZnVuY3Rpb24gYmVmb3JlRWFjaCgpIHtcbiAgICAgIC8vIFRoaXMgaXNuJ3QgYSBob29rLlxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlYWN0LWhvb2tzL3J1bGVzLW9mLWhvb2tzXG4gICAgICB0aGlzLmNsb2NrID0gdXNlRmFrZVRpbWVycygpO1xuICAgIH0pO1xuXG4gICAgYWZ0ZXJFYWNoKGZ1bmN0aW9uIGFmdGVyRWFjaCgpIHtcbiAgICAgIHRoaXMuY2xvY2sucmVzdG9yZSgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3VzZXMgdGhlIGN1cnJlbnQgZGF0ZSBhbmQgcHJvdmlkZWQgc2hvcnRTaGEnLCBmdW5jdGlvbiB0ZXN0KCkge1xuICAgICAgdGhpcy5jbG9jay5zZXRTeXN0ZW1UaW1lKG5ldyBEYXRlKCcyMDIxLTA3LTIzVDAxOjIyOjU1LjY5MlonKS5nZXRUaW1lKCkpO1xuXG4gICAgICBjb25zdCBjdXJyZW50VmVyc2lvbiA9ICc1LjEyLjAtYmV0YS4xJztcbiAgICAgIGNvbnN0IHNob3J0U2hhID0gJzA3ZjBlZmM0NSc7XG5cbiAgICAgIGNvbnN0IGV4cGVjdGVkID0gJzUuMTIuMC1hbHBoYS4yMDIxMDcyMy4wMS0wN2YwZWZjNDUnO1xuICAgICAgY29uc3QgYWN0dWFsID0gZ2VuZXJhdGVBbHBoYVZlcnNpb24oeyBjdXJyZW50VmVyc2lvbiwgc2hvcnRTaGEgfSk7XG5cbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChleHBlY3RlZCwgYWN0dWFsKTtcbiAgICB9KTtcblxuICAgIGl0KCdzYW1lIHByb2R1Y3Rpb24gdmVyc2lvbiBpcyBzZW12ZXIuZ3QnLCBmdW5jdGlvbiB0ZXN0KCkge1xuICAgICAgY29uc3QgY3VycmVudFZlcnNpb24gPSAnNS4xMi4wLWJldGEuMSc7XG4gICAgICBjb25zdCBzaG9ydFNoYSA9ICcwN2YwZWZjNDUnO1xuXG4gICAgICB0aGlzLmNsb2NrLnNldFN5c3RlbVRpbWUobmV3IERhdGUoJzIwMjEtMDctMjNUMDE6MjI6NTUuNjkyWicpLmdldFRpbWUoKSk7XG4gICAgICBjb25zdCBhY3R1YWwgPSBnZW5lcmF0ZUFscGhhVmVyc2lvbih7IGN1cnJlbnRWZXJzaW9uLCBzaG9ydFNoYSB9KTtcblxuICAgICAgYXNzZXJ0LmlzVHJ1ZShzZW12ZXIuZ3QoJzUuMTIuMCcsIGFjdHVhbCkpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3NhbWUgYmV0YSB2ZXJzaW9uIGlzIHNlbXZlci5ndCcsIGZ1bmN0aW9uIHRlc3QoKSB7XG4gICAgICBjb25zdCBjdXJyZW50VmVyc2lvbiA9ICc1LjEyLjAtYmV0YS4xJztcbiAgICAgIGNvbnN0IHNob3J0U2hhID0gJzA3ZjBlZmM0NSc7XG5cbiAgICAgIHRoaXMuY2xvY2suc2V0U3lzdGVtVGltZShuZXcgRGF0ZSgnMjAyMS0wNy0yM1QwMToyMjo1NS42OTJaJykuZ2V0VGltZSgpKTtcbiAgICAgIGNvbnN0IGFjdHVhbCA9IGdlbmVyYXRlQWxwaGFWZXJzaW9uKHsgY3VycmVudFZlcnNpb24sIHNob3J0U2hhIH0pO1xuXG4gICAgICBhc3NlcnQuaXNUcnVlKHNlbXZlci5ndChjdXJyZW50VmVyc2lvbiwgYWN0dWFsKSk7XG4gICAgfSk7XG5cbiAgICBpdCgnYnVpbGQgZWFybGllciBzYW1lIGRheSBpcyBzZW12ZXIubHQnLCBmdW5jdGlvbiB0ZXN0KCkge1xuICAgICAgY29uc3QgY3VycmVudFZlcnNpb24gPSAnNS4xMi4wLWJldGEuMSc7XG4gICAgICBjb25zdCBzaG9ydFNoYSA9ICcwN2YwZWZjNDUnO1xuXG4gICAgICB0aGlzLmNsb2NrLnNldFN5c3RlbVRpbWUobmV3IERhdGUoJzIwMjEtMDctMjNUMDA6MjI6NTUuNjkyWicpLmdldFRpbWUoKSk7XG4gICAgICBjb25zdCBhY3R1YWxFYXJsaWVyID0gZ2VuZXJhdGVBbHBoYVZlcnNpb24oeyBjdXJyZW50VmVyc2lvbiwgc2hvcnRTaGEgfSk7XG5cbiAgICAgIHRoaXMuY2xvY2suc2V0U3lzdGVtVGltZShuZXcgRGF0ZSgnMjAyMS0wNy0yM1QwMToyMjo1NS42OTJaJykuZ2V0VGltZSgpKTtcbiAgICAgIGNvbnN0IGFjdHVhbExhdGVyID0gZ2VuZXJhdGVBbHBoYVZlcnNpb24oeyBjdXJyZW50VmVyc2lvbiwgc2hvcnRTaGEgfSk7XG5cbiAgICAgIGFzc2VydC5pc1RydWUoc2VtdmVyLmx0KGFjdHVhbEVhcmxpZXIsIGFjdHVhbExhdGVyKSk7XG4gICAgfSk7XG5cbiAgICBpdCgnYnVpbGQgcHJldmlvdXMgZGF5IGlzIHNlbXZlci5sdCcsIGZ1bmN0aW9uIHRlc3QoKSB7XG4gICAgICBjb25zdCBjdXJyZW50VmVyc2lvbiA9ICc1LjEyLjAtYmV0YS4xJztcbiAgICAgIGNvbnN0IHNob3J0U2hhID0gJzA3ZjBlZmM0NSc7XG5cbiAgICAgIHRoaXMuY2xvY2suc2V0U3lzdGVtVGltZShuZXcgRGF0ZSgnMjAyMS0wNy0yMlQwMToyMjo1NS42OTJaJykuZ2V0VGltZSgpKTtcbiAgICAgIGNvbnN0IGFjdHVhbEVhcmxpZXIgPSBnZW5lcmF0ZUFscGhhVmVyc2lvbih7IGN1cnJlbnRWZXJzaW9uLCBzaG9ydFNoYSB9KTtcblxuICAgICAgdGhpcy5jbG9jay5zZXRTeXN0ZW1UaW1lKG5ldyBEYXRlKCcyMDIxLTA3LTIzVDAxOjIyOjU1LjY5MlonKS5nZXRUaW1lKCkpO1xuICAgICAgY29uc3QgYWN0dWFsTGF0ZXIgPSBnZW5lcmF0ZUFscGhhVmVyc2lvbih7IGN1cnJlbnRWZXJzaW9uLCBzaG9ydFNoYSB9KTtcblxuICAgICAgYXNzZXJ0LmlzVHJ1ZShzZW12ZXIubHQoYWN0dWFsRWFybGllciwgYWN0dWFsTGF0ZXIpKTtcbiAgICB9KTtcbiAgfSk7XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHQSxrQkFBdUI7QUFDdkIsbUJBQThCO0FBQzlCLGFBQXdCO0FBRXhCLHFCQU1PO0FBRVAsU0FBUyxxQkFBcUIsTUFBTTtBQUNsQyxXQUFTLGdCQUFnQixNQUFNO0FBQzdCLE9BQUcsdURBQXVELE1BQU07QUFDOUQseUJBQU8sUUFBUSxpQ0FBYSxTQUFTLENBQUM7QUFDdEMseUJBQU8sUUFBUSxpQ0FBYSxlQUFlLENBQUM7QUFDNUMseUJBQU8sUUFBUSxpQ0FBYSxjQUFjLENBQUM7QUFDM0MseUJBQU8sUUFBUSxpQ0FBYSxVQUFVLENBQUM7QUFBQSxJQUN6QyxDQUFDO0FBRUQsT0FBRywrQ0FBK0MsTUFBTTtBQUN0RCx5QkFBTyxPQUFPLGlDQUFhLE9B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
