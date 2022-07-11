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
var import_Errors = require("../../../textsecure/Errors");
var durations = __toESM(require("../../../util/durations"));
var import_sleepForRateLimitRetryAfterTime = require("../../../jobs/helpers/sleepForRateLimitRetryAfterTime");
describe("sleepFor413RetryAfterTimeIfApplicable", () => {
  const createLogger = /* @__PURE__ */ __name(() => ({ info: sinon.spy() }), "createLogger");
  let sandbox;
  let clock;
  beforeEach(() => {
    sandbox = sinon.createSandbox();
    clock = sandbox.useFakeTimers();
  });
  afterEach(() => {
    sandbox.restore();
  });
  it("does nothing if no time remains", async () => {
    const log = createLogger();
    await Promise.all([-1, 0].map((timeRemaining) => (0, import_sleepForRateLimitRetryAfterTime.sleepForRateLimitRetryAfterTime)({
      err: {},
      log,
      timeRemaining
    })));
    sinon.assert.notCalled(log.info);
  });
  it("waits for 1 minute if the error lacks Retry-After info", async () => {
    let done = false;
    (async () => {
      await (0, import_sleepForRateLimitRetryAfterTime.sleepForRateLimitRetryAfterTime)({
        err: {},
        log: createLogger(),
        timeRemaining: 12345678
      });
      done = true;
    })();
    await clock.tickAsync(durations.MINUTE - 1);
    import_chai.assert.isFalse(done);
    await clock.tickAsync(2);
    import_chai.assert.isTrue(done);
  });
  it("finds the Retry-After header on an HTTPError", async () => {
    const err = new import_Errors.HTTPError("Slow down", {
      code: 413,
      headers: { "retry-after": "200" },
      response: {}
    });
    let done = false;
    (async () => {
      await (0, import_sleepForRateLimitRetryAfterTime.sleepForRateLimitRetryAfterTime)({
        err,
        log: createLogger(),
        timeRemaining: 123456789
      });
      done = true;
    })();
    await clock.tickAsync(199 * durations.SECOND);
    import_chai.assert.isFalse(done);
    await clock.tickAsync(2 * durations.SECOND);
    import_chai.assert.isTrue(done);
  });
  it("finds the Retry-After header on an HTTPError", async () => {
    const err = new import_Errors.HTTPError("Slow down", {
      code: 429,
      headers: { "retry-after": "200" },
      response: {}
    });
    let done = false;
    (async () => {
      await (0, import_sleepForRateLimitRetryAfterTime.sleepForRateLimitRetryAfterTime)({
        err,
        log: createLogger(),
        timeRemaining: 123456789
      });
      done = true;
    })();
    await clock.tickAsync(199 * durations.SECOND);
    import_chai.assert.isFalse(done);
    await clock.tickAsync(2 * durations.SECOND);
    import_chai.assert.isTrue(done);
  });
  it("finds the Retry-After on an HTTPError nested under a wrapper error", async () => {
    const httpError = new import_Errors.HTTPError("Slow down", {
      code: 413,
      headers: { "retry-after": "200" },
      response: {}
    });
    let done = false;
    (async () => {
      await (0, import_sleepForRateLimitRetryAfterTime.sleepForRateLimitRetryAfterTime)({
        err: { httpError },
        log: createLogger(),
        timeRemaining: 123456789
      });
      done = true;
    })();
    await clock.tickAsync(199 * durations.SECOND);
    import_chai.assert.isFalse(done);
    await clock.tickAsync(2 * durations.SECOND);
    import_chai.assert.isTrue(done);
  });
  it("finds the Retry-After on an HTTPError nested under a wrapper error", async () => {
    const httpError = new import_Errors.HTTPError("Slow down", {
      code: 429,
      headers: { "retry-after": "200" },
      response: {}
    });
    let done = false;
    (async () => {
      await (0, import_sleepForRateLimitRetryAfterTime.sleepForRateLimitRetryAfterTime)({
        err: { httpError },
        log: createLogger(),
        timeRemaining: 123456789
      });
      done = true;
    })();
    await clock.tickAsync(199 * durations.SECOND);
    import_chai.assert.isFalse(done);
    await clock.tickAsync(2 * durations.SECOND);
    import_chai.assert.isTrue(done);
  });
  it("won't wait longer than the remaining time", async () => {
    const err = new import_Errors.HTTPError("Slow down", {
      code: 413,
      headers: { "retry-after": "99999" },
      response: {}
    });
    let done = false;
    (async () => {
      await (0, import_sleepForRateLimitRetryAfterTime.sleepForRateLimitRetryAfterTime)({
        err,
        log: createLogger(),
        timeRemaining: 3 * durations.SECOND
      });
      done = true;
    })();
    await clock.tickAsync(4 * durations.SECOND);
    import_chai.assert.isTrue(done);
  });
  it("won't wait longer than the remaining time", async () => {
    const err = new import_Errors.HTTPError("Slow down", {
      code: 429,
      headers: { "retry-after": "99999" },
      response: {}
    });
    let done = false;
    (async () => {
      await (0, import_sleepForRateLimitRetryAfterTime.sleepForRateLimitRetryAfterTime)({
        err,
        log: createLogger(),
        timeRemaining: 3 * durations.SECOND
      });
      done = true;
    })();
    await clock.tickAsync(4 * durations.SECOND);
    import_chai.assert.isTrue(done);
  });
  it("logs how long it will wait", async () => {
    const log = createLogger();
    const err = new import_Errors.HTTPError("Slow down", {
      code: 413,
      headers: { "retry-after": "123" },
      response: {}
    });
    (0, import_sleepForRateLimitRetryAfterTime.sleepForRateLimitRetryAfterTime)({ err, log, timeRemaining: 9999999 });
    await clock.nextAsync();
    sinon.assert.calledOnce(log.info);
    sinon.assert.calledWith(log.info, sinon.match(/123000 millisecond\(s\)/));
  });
  it("logs how long it will wait", async () => {
    const log = createLogger();
    const err = new import_Errors.HTTPError("Slow down", {
      code: 429,
      headers: { "retry-after": "123" },
      response: {}
    });
    (0, import_sleepForRateLimitRetryAfterTime.sleepForRateLimitRetryAfterTime)({ err, log, timeRemaining: 9999999 });
    await clock.nextAsync();
    sinon.assert.calledOnce(log.info);
    sinon.assert.calledWith(log.info, sinon.match(/123000 millisecond\(s\)/));
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic2xlZXBGb3JSYXRlTGltaXRSZXRyeUFmdGVyVGltZV90ZXN0LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMS0yMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSAnY2hhaSc7XG5pbXBvcnQgKiBhcyBzaW5vbiBmcm9tICdzaW5vbic7XG5pbXBvcnQgeyBIVFRQRXJyb3IgfSBmcm9tICcuLi8uLi8uLi90ZXh0c2VjdXJlL0Vycm9ycyc7XG5pbXBvcnQgKiBhcyBkdXJhdGlvbnMgZnJvbSAnLi4vLi4vLi4vdXRpbC9kdXJhdGlvbnMnO1xuXG5pbXBvcnQgeyBzbGVlcEZvclJhdGVMaW1pdFJldHJ5QWZ0ZXJUaW1lIH0gZnJvbSAnLi4vLi4vLi4vam9icy9oZWxwZXJzL3NsZWVwRm9yUmF0ZUxpbWl0UmV0cnlBZnRlclRpbWUnO1xuXG5kZXNjcmliZSgnc2xlZXBGb3I0MTNSZXRyeUFmdGVyVGltZUlmQXBwbGljYWJsZScsICgpID0+IHtcbiAgY29uc3QgY3JlYXRlTG9nZ2VyID0gKCkgPT4gKHsgaW5mbzogc2lub24uc3B5KCkgfSk7XG5cbiAgbGV0IHNhbmRib3g6IHNpbm9uLlNpbm9uU2FuZGJveDtcbiAgbGV0IGNsb2NrOiBzaW5vbi5TaW5vbkZha2VUaW1lcnM7XG5cbiAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgc2FuZGJveCA9IHNpbm9uLmNyZWF0ZVNhbmRib3goKTtcbiAgICBjbG9jayA9IHNhbmRib3gudXNlRmFrZVRpbWVycygpO1xuICB9KTtcblxuICBhZnRlckVhY2goKCkgPT4ge1xuICAgIHNhbmRib3gucmVzdG9yZSgpO1xuICB9KTtcblxuICBpdCgnZG9lcyBub3RoaW5nIGlmIG5vIHRpbWUgcmVtYWlucycsIGFzeW5jICgpID0+IHtcbiAgICBjb25zdCBsb2cgPSBjcmVhdGVMb2dnZXIoKTtcblxuICAgIGF3YWl0IFByb21pc2UuYWxsKFxuICAgICAgWy0xLCAwXS5tYXAodGltZVJlbWFpbmluZyA9PlxuICAgICAgICBzbGVlcEZvclJhdGVMaW1pdFJldHJ5QWZ0ZXJUaW1lKHtcbiAgICAgICAgICBlcnI6IHt9LFxuICAgICAgICAgIGxvZyxcbiAgICAgICAgICB0aW1lUmVtYWluaW5nLFxuICAgICAgICB9KVxuICAgICAgKVxuICAgICk7XG5cbiAgICBzaW5vbi5hc3NlcnQubm90Q2FsbGVkKGxvZy5pbmZvKTtcbiAgfSk7XG5cbiAgaXQoJ3dhaXRzIGZvciAxIG1pbnV0ZSBpZiB0aGUgZXJyb3IgbGFja3MgUmV0cnktQWZ0ZXIgaW5mbycsIGFzeW5jICgpID0+IHtcbiAgICBsZXQgZG9uZSA9IGZhbHNlO1xuXG4gICAgKGFzeW5jICgpID0+IHtcbiAgICAgIGF3YWl0IHNsZWVwRm9yUmF0ZUxpbWl0UmV0cnlBZnRlclRpbWUoe1xuICAgICAgICBlcnI6IHt9LFxuICAgICAgICBsb2c6IGNyZWF0ZUxvZ2dlcigpLFxuICAgICAgICB0aW1lUmVtYWluaW5nOiAxMjM0NTY3OCxcbiAgICAgIH0pO1xuICAgICAgZG9uZSA9IHRydWU7XG4gICAgfSkoKTtcblxuICAgIGF3YWl0IGNsb2NrLnRpY2tBc3luYyhkdXJhdGlvbnMuTUlOVVRFIC0gMSk7XG4gICAgYXNzZXJ0LmlzRmFsc2UoZG9uZSk7XG5cbiAgICBhd2FpdCBjbG9jay50aWNrQXN5bmMoMik7XG4gICAgYXNzZXJ0LmlzVHJ1ZShkb25lKTtcbiAgfSk7XG5cbiAgaXQoJ2ZpbmRzIHRoZSBSZXRyeS1BZnRlciBoZWFkZXIgb24gYW4gSFRUUEVycm9yJywgYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IGVyciA9IG5ldyBIVFRQRXJyb3IoJ1Nsb3cgZG93bicsIHtcbiAgICAgIGNvZGU6IDQxMyxcbiAgICAgIGhlYWRlcnM6IHsgJ3JldHJ5LWFmdGVyJzogJzIwMCcgfSxcbiAgICAgIHJlc3BvbnNlOiB7fSxcbiAgICB9KTtcblxuICAgIGxldCBkb25lID0gZmFsc2U7XG5cbiAgICAoYXN5bmMgKCkgPT4ge1xuICAgICAgYXdhaXQgc2xlZXBGb3JSYXRlTGltaXRSZXRyeUFmdGVyVGltZSh7XG4gICAgICAgIGVycixcbiAgICAgICAgbG9nOiBjcmVhdGVMb2dnZXIoKSxcbiAgICAgICAgdGltZVJlbWFpbmluZzogMTIzNDU2Nzg5LFxuICAgICAgfSk7XG4gICAgICBkb25lID0gdHJ1ZTtcbiAgICB9KSgpO1xuXG4gICAgYXdhaXQgY2xvY2sudGlja0FzeW5jKDE5OSAqIGR1cmF0aW9ucy5TRUNPTkQpO1xuICAgIGFzc2VydC5pc0ZhbHNlKGRvbmUpO1xuXG4gICAgYXdhaXQgY2xvY2sudGlja0FzeW5jKDIgKiBkdXJhdGlvbnMuU0VDT05EKTtcbiAgICBhc3NlcnQuaXNUcnVlKGRvbmUpO1xuICB9KTtcblxuICBpdCgnZmluZHMgdGhlIFJldHJ5LUFmdGVyIGhlYWRlciBvbiBhbiBIVFRQRXJyb3InLCBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgZXJyID0gbmV3IEhUVFBFcnJvcignU2xvdyBkb3duJywge1xuICAgICAgY29kZTogNDI5LFxuICAgICAgaGVhZGVyczogeyAncmV0cnktYWZ0ZXInOiAnMjAwJyB9LFxuICAgICAgcmVzcG9uc2U6IHt9LFxuICAgIH0pO1xuXG4gICAgbGV0IGRvbmUgPSBmYWxzZTtcblxuICAgIChhc3luYyAoKSA9PiB7XG4gICAgICBhd2FpdCBzbGVlcEZvclJhdGVMaW1pdFJldHJ5QWZ0ZXJUaW1lKHtcbiAgICAgICAgZXJyLFxuICAgICAgICBsb2c6IGNyZWF0ZUxvZ2dlcigpLFxuICAgICAgICB0aW1lUmVtYWluaW5nOiAxMjM0NTY3ODksXG4gICAgICB9KTtcbiAgICAgIGRvbmUgPSB0cnVlO1xuICAgIH0pKCk7XG5cbiAgICBhd2FpdCBjbG9jay50aWNrQXN5bmMoMTk5ICogZHVyYXRpb25zLlNFQ09ORCk7XG4gICAgYXNzZXJ0LmlzRmFsc2UoZG9uZSk7XG5cbiAgICBhd2FpdCBjbG9jay50aWNrQXN5bmMoMiAqIGR1cmF0aW9ucy5TRUNPTkQpO1xuICAgIGFzc2VydC5pc1RydWUoZG9uZSk7XG4gIH0pO1xuXG4gIGl0KCdmaW5kcyB0aGUgUmV0cnktQWZ0ZXIgb24gYW4gSFRUUEVycm9yIG5lc3RlZCB1bmRlciBhIHdyYXBwZXIgZXJyb3InLCBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgaHR0cEVycm9yID0gbmV3IEhUVFBFcnJvcignU2xvdyBkb3duJywge1xuICAgICAgY29kZTogNDEzLFxuICAgICAgaGVhZGVyczogeyAncmV0cnktYWZ0ZXInOiAnMjAwJyB9LFxuICAgICAgcmVzcG9uc2U6IHt9LFxuICAgIH0pO1xuXG4gICAgbGV0IGRvbmUgPSBmYWxzZTtcblxuICAgIChhc3luYyAoKSA9PiB7XG4gICAgICBhd2FpdCBzbGVlcEZvclJhdGVMaW1pdFJldHJ5QWZ0ZXJUaW1lKHtcbiAgICAgICAgZXJyOiB7IGh0dHBFcnJvciB9LFxuICAgICAgICBsb2c6IGNyZWF0ZUxvZ2dlcigpLFxuICAgICAgICB0aW1lUmVtYWluaW5nOiAxMjM0NTY3ODksXG4gICAgICB9KTtcbiAgICAgIGRvbmUgPSB0cnVlO1xuICAgIH0pKCk7XG5cbiAgICBhd2FpdCBjbG9jay50aWNrQXN5bmMoMTk5ICogZHVyYXRpb25zLlNFQ09ORCk7XG4gICAgYXNzZXJ0LmlzRmFsc2UoZG9uZSk7XG5cbiAgICBhd2FpdCBjbG9jay50aWNrQXN5bmMoMiAqIGR1cmF0aW9ucy5TRUNPTkQpO1xuICAgIGFzc2VydC5pc1RydWUoZG9uZSk7XG4gIH0pO1xuXG4gIGl0KCdmaW5kcyB0aGUgUmV0cnktQWZ0ZXIgb24gYW4gSFRUUEVycm9yIG5lc3RlZCB1bmRlciBhIHdyYXBwZXIgZXJyb3InLCBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgaHR0cEVycm9yID0gbmV3IEhUVFBFcnJvcignU2xvdyBkb3duJywge1xuICAgICAgY29kZTogNDI5LFxuICAgICAgaGVhZGVyczogeyAncmV0cnktYWZ0ZXInOiAnMjAwJyB9LFxuICAgICAgcmVzcG9uc2U6IHt9LFxuICAgIH0pO1xuXG4gICAgbGV0IGRvbmUgPSBmYWxzZTtcblxuICAgIChhc3luYyAoKSA9PiB7XG4gICAgICBhd2FpdCBzbGVlcEZvclJhdGVMaW1pdFJldHJ5QWZ0ZXJUaW1lKHtcbiAgICAgICAgZXJyOiB7IGh0dHBFcnJvciB9LFxuICAgICAgICBsb2c6IGNyZWF0ZUxvZ2dlcigpLFxuICAgICAgICB0aW1lUmVtYWluaW5nOiAxMjM0NTY3ODksXG4gICAgICB9KTtcbiAgICAgIGRvbmUgPSB0cnVlO1xuICAgIH0pKCk7XG5cbiAgICBhd2FpdCBjbG9jay50aWNrQXN5bmMoMTk5ICogZHVyYXRpb25zLlNFQ09ORCk7XG4gICAgYXNzZXJ0LmlzRmFsc2UoZG9uZSk7XG5cbiAgICBhd2FpdCBjbG9jay50aWNrQXN5bmMoMiAqIGR1cmF0aW9ucy5TRUNPTkQpO1xuICAgIGFzc2VydC5pc1RydWUoZG9uZSk7XG4gIH0pO1xuXG4gIGl0KFwid29uJ3Qgd2FpdCBsb25nZXIgdGhhbiB0aGUgcmVtYWluaW5nIHRpbWVcIiwgYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IGVyciA9IG5ldyBIVFRQRXJyb3IoJ1Nsb3cgZG93bicsIHtcbiAgICAgIGNvZGU6IDQxMyxcbiAgICAgIGhlYWRlcnM6IHsgJ3JldHJ5LWFmdGVyJzogJzk5OTk5JyB9LFxuICAgICAgcmVzcG9uc2U6IHt9LFxuICAgIH0pO1xuXG4gICAgbGV0IGRvbmUgPSBmYWxzZTtcblxuICAgIChhc3luYyAoKSA9PiB7XG4gICAgICBhd2FpdCBzbGVlcEZvclJhdGVMaW1pdFJldHJ5QWZ0ZXJUaW1lKHtcbiAgICAgICAgZXJyLFxuICAgICAgICBsb2c6IGNyZWF0ZUxvZ2dlcigpLFxuICAgICAgICB0aW1lUmVtYWluaW5nOiAzICogZHVyYXRpb25zLlNFQ09ORCxcbiAgICAgIH0pO1xuICAgICAgZG9uZSA9IHRydWU7XG4gICAgfSkoKTtcblxuICAgIGF3YWl0IGNsb2NrLnRpY2tBc3luYyg0ICogZHVyYXRpb25zLlNFQ09ORCk7XG4gICAgYXNzZXJ0LmlzVHJ1ZShkb25lKTtcbiAgfSk7XG5cbiAgaXQoXCJ3b24ndCB3YWl0IGxvbmdlciB0aGFuIHRoZSByZW1haW5pbmcgdGltZVwiLCBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgZXJyID0gbmV3IEhUVFBFcnJvcignU2xvdyBkb3duJywge1xuICAgICAgY29kZTogNDI5LFxuICAgICAgaGVhZGVyczogeyAncmV0cnktYWZ0ZXInOiAnOTk5OTknIH0sXG4gICAgICByZXNwb25zZToge30sXG4gICAgfSk7XG5cbiAgICBsZXQgZG9uZSA9IGZhbHNlO1xuXG4gICAgKGFzeW5jICgpID0+IHtcbiAgICAgIGF3YWl0IHNsZWVwRm9yUmF0ZUxpbWl0UmV0cnlBZnRlclRpbWUoe1xuICAgICAgICBlcnIsXG4gICAgICAgIGxvZzogY3JlYXRlTG9nZ2VyKCksXG4gICAgICAgIHRpbWVSZW1haW5pbmc6IDMgKiBkdXJhdGlvbnMuU0VDT05ELFxuICAgICAgfSk7XG4gICAgICBkb25lID0gdHJ1ZTtcbiAgICB9KSgpO1xuXG4gICAgYXdhaXQgY2xvY2sudGlja0FzeW5jKDQgKiBkdXJhdGlvbnMuU0VDT05EKTtcbiAgICBhc3NlcnQuaXNUcnVlKGRvbmUpO1xuICB9KTtcblxuICBpdCgnbG9ncyBob3cgbG9uZyBpdCB3aWxsIHdhaXQnLCBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgbG9nID0gY3JlYXRlTG9nZ2VyKCk7XG4gICAgY29uc3QgZXJyID0gbmV3IEhUVFBFcnJvcignU2xvdyBkb3duJywge1xuICAgICAgY29kZTogNDEzLFxuICAgICAgaGVhZGVyczogeyAncmV0cnktYWZ0ZXInOiAnMTIzJyB9LFxuICAgICAgcmVzcG9uc2U6IHt9LFxuICAgIH0pO1xuXG4gICAgc2xlZXBGb3JSYXRlTGltaXRSZXRyeUFmdGVyVGltZSh7IGVyciwgbG9nLCB0aW1lUmVtYWluaW5nOiA5OTk5OTk5IH0pO1xuICAgIGF3YWl0IGNsb2NrLm5leHRBc3luYygpO1xuXG4gICAgc2lub24uYXNzZXJ0LmNhbGxlZE9uY2UobG9nLmluZm8pO1xuICAgIHNpbm9uLmFzc2VydC5jYWxsZWRXaXRoKGxvZy5pbmZvLCBzaW5vbi5tYXRjaCgvMTIzMDAwIG1pbGxpc2Vjb25kXFwoc1xcKS8pKTtcbiAgfSk7XG5cbiAgaXQoJ2xvZ3MgaG93IGxvbmcgaXQgd2lsbCB3YWl0JywgYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IGxvZyA9IGNyZWF0ZUxvZ2dlcigpO1xuICAgIGNvbnN0IGVyciA9IG5ldyBIVFRQRXJyb3IoJ1Nsb3cgZG93bicsIHtcbiAgICAgIGNvZGU6IDQyOSxcbiAgICAgIGhlYWRlcnM6IHsgJ3JldHJ5LWFmdGVyJzogJzEyMycgfSxcbiAgICAgIHJlc3BvbnNlOiB7fSxcbiAgICB9KTtcblxuICAgIHNsZWVwRm9yUmF0ZUxpbWl0UmV0cnlBZnRlclRpbWUoeyBlcnIsIGxvZywgdGltZVJlbWFpbmluZzogOTk5OTk5OSB9KTtcbiAgICBhd2FpdCBjbG9jay5uZXh0QXN5bmMoKTtcblxuICAgIHNpbm9uLmFzc2VydC5jYWxsZWRPbmNlKGxvZy5pbmZvKTtcbiAgICBzaW5vbi5hc3NlcnQuY2FsbGVkV2l0aChsb2cuaW5mbywgc2lub24ubWF0Y2goLzEyMzAwMCBtaWxsaXNlY29uZFxcKHNcXCkvKSk7XG4gIH0pO1xufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7O0FBR0Esa0JBQXVCO0FBQ3ZCLFlBQXVCO0FBQ3ZCLG9CQUEwQjtBQUMxQixnQkFBMkI7QUFFM0IsNkNBQWdEO0FBRWhELFNBQVMseUNBQXlDLE1BQU07QUFDdEQsUUFBTSxlQUFlLDZCQUFPLEdBQUUsTUFBTSxNQUFNLElBQUksRUFBRSxJQUEzQjtBQUVyQixNQUFJO0FBQ0osTUFBSTtBQUVKLGFBQVcsTUFBTTtBQUNmLGNBQVUsTUFBTSxjQUFjO0FBQzlCLFlBQVEsUUFBUSxjQUFjO0FBQUEsRUFDaEMsQ0FBQztBQUVELFlBQVUsTUFBTTtBQUNkLFlBQVEsUUFBUTtBQUFBLEVB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
