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
var import_lodash = require("lodash");
var import_Errors = require("../../../textsecure/Errors");
var import_durations = require("../../../util/durations");
var import_handleMultipleSendErrors = require("../../../jobs/helpers/handleMultipleSendErrors");
describe("maybeExpandErrors", () => {
  const expand = /* @__PURE__ */ __name((input) => (0, import_handleMultipleSendErrors.maybeExpandErrors)(input), "expand");
  it("wraps the provided value if it's not a SendMessageProtoError with errors", () => {
    const input = { foo: 123 };
    import_chai.assert.sameMembers(expand(input), [input]);
  });
  it("wraps the provided value if a SendMessageProtoError with no errors", () => {
    const input = new import_Errors.SendMessageProtoError({});
    import_chai.assert.sameMembers(expand(input), [input]);
  });
  it("uses a SendMessageProtoError's errors", () => {
    const errors = [new Error("one"), new Error("two")];
    const input = new import_Errors.SendMessageProtoError({ errors });
    import_chai.assert.strictEqual(expand(input), errors);
  });
});
describe("handleMultipleSendErrors", () => {
  const make413 = /* @__PURE__ */ __name((retryAfter) => new import_Errors.HTTPError("Slow down", {
    code: 413,
    headers: { "retry-after": retryAfter.toString() },
    response: {}
  }), "make413");
  const defaultOptions = {
    isFinalAttempt: false,
    log: { info: import_lodash.noop },
    markFailed: () => {
      throw new Error("This should not be called");
    },
    timeRemaining: 1234
  };
  let sandbox;
  let clock;
  beforeEach(() => {
    sandbox = sinon.createSandbox();
    clock = sandbox.useFakeTimers();
  });
  afterEach(() => {
    sandbox.restore();
  });
  it("throws the first provided error", async () => {
    await import_chai.assert.isRejected((0, import_handleMultipleSendErrors.handleMultipleSendErrors)({
      ...defaultOptions,
      errors: [new Error("first"), new Error("second")],
      toThrow: new Error("to throw")
    }), "to throw");
  });
  it("marks the send failed if it's the final attempt", async () => {
    const markFailed = sinon.stub();
    await import_chai.assert.isRejected((0, import_handleMultipleSendErrors.handleMultipleSendErrors)({
      ...defaultOptions,
      errors: [new Error("uh oh")],
      markFailed,
      isFinalAttempt: true,
      toThrow: new Error("to throw")
    }));
    sinon.assert.calledOnceWithExactly(markFailed);
  });
  it("doesn't require `markFailed`", async () => {
    await import_chai.assert.isRejected((0, import_handleMultipleSendErrors.handleMultipleSendErrors)({
      ...(0, import_lodash.omit)(defaultOptions, "markFailed"),
      errors: [new Error("Test message")],
      isFinalAttempt: true,
      toThrow: new Error("to throw")
    }), "to throw");
  });
  describe("413 handling", () => {
    it("sleeps for the longest 413 Retry-After time", async () => {
      let done = false;
      (async () => {
        try {
          await (0, import_handleMultipleSendErrors.handleMultipleSendErrors)({
            ...defaultOptions,
            errors: [
              new Error("Other"),
              make413(10),
              make413(999),
              make413(20)
            ],
            timeRemaining: 99999999,
            toThrow: new Error("to throw")
          });
        } catch (err) {
        } finally {
          done = true;
        }
      })();
      await clock.tickAsync(900 * import_durations.SECOND);
      import_chai.assert.isFalse(done, "Didn't sleep for long enough");
      await clock.tickAsync(100 * import_durations.SECOND);
      import_chai.assert.isTrue(done, "Slept for too long");
    });
    it("doesn't sleep longer than the remaining time", async () => {
      let done = false;
      (async () => {
        try {
          await (0, import_handleMultipleSendErrors.handleMultipleSendErrors)({
            ...defaultOptions,
            errors: [make413(9999)],
            timeRemaining: 99,
            toThrow: new Error("to throw")
          });
        } catch (err) {
        } finally {
          done = true;
        }
      })();
      await clock.tickAsync(100);
      import_chai.assert.isTrue(done);
    });
    it("doesn't sleep if it's the final attempt", async () => {
      await import_chai.assert.isRejected((0, import_handleMultipleSendErrors.handleMultipleSendErrors)({
        ...defaultOptions,
        errors: [new Error("uh oh")],
        isFinalAttempt: true,
        toThrow: new Error("to throw")
      }));
    });
  });
  describe("508 handling", () => {
    it("resolves with no error if any 508 is received", async () => {
      await import_chai.assert.isFulfilled((0, import_handleMultipleSendErrors.handleMultipleSendErrors)({
        ...defaultOptions,
        errors: [new Error("uh oh"), { code: 508 }, make413(99999)],
        markFailed: import_lodash.noop,
        toThrow: new Error("to throw")
      }));
    });
    it("marks the send failed on a 508", async () => {
      const markFailed = sinon.stub();
      await (0, import_handleMultipleSendErrors.handleMultipleSendErrors)({
        ...defaultOptions,
        errors: [{ code: 508 }],
        markFailed,
        toThrow: new Error("to throw")
      });
      sinon.assert.calledOnceWithExactly(markFailed);
    });
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiaGFuZGxlTXVsdGlwbGVTZW5kRXJyb3JzX3Rlc3QudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSAnY2hhaSc7XG5pbXBvcnQgKiBhcyBzaW5vbiBmcm9tICdzaW5vbic7XG5pbXBvcnQgeyBub29wLCBvbWl0IH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IEhUVFBFcnJvciwgU2VuZE1lc3NhZ2VQcm90b0Vycm9yIH0gZnJvbSAnLi4vLi4vLi4vdGV4dHNlY3VyZS9FcnJvcnMnO1xuaW1wb3J0IHsgU0VDT05EIH0gZnJvbSAnLi4vLi4vLi4vdXRpbC9kdXJhdGlvbnMnO1xuXG5pbXBvcnQge1xuICBoYW5kbGVNdWx0aXBsZVNlbmRFcnJvcnMsXG4gIG1heWJlRXhwYW5kRXJyb3JzLFxufSBmcm9tICcuLi8uLi8uLi9qb2JzL2hlbHBlcnMvaGFuZGxlTXVsdGlwbGVTZW5kRXJyb3JzJztcblxuZGVzY3JpYmUoJ21heWJlRXhwYW5kRXJyb3JzJywgKCkgPT4ge1xuICAvLyBUaGlzIHJldHVybnMgYSByZWFkb25seSBhcnJheSwgYnV0IENoYWkgd2FudHMgYSBtdXRhYmxlIG9uZS5cbiAgY29uc3QgZXhwYW5kID0gKGlucHV0OiB1bmtub3duKSA9PiBtYXliZUV4cGFuZEVycm9ycyhpbnB1dCkgYXMgQXJyYXk8dW5rbm93bj47XG5cbiAgaXQoXCJ3cmFwcyB0aGUgcHJvdmlkZWQgdmFsdWUgaWYgaXQncyBub3QgYSBTZW5kTWVzc2FnZVByb3RvRXJyb3Igd2l0aCBlcnJvcnNcIiwgKCkgPT4ge1xuICAgIGNvbnN0IGlucHV0ID0geyBmb286IDEyMyB9O1xuICAgIGFzc2VydC5zYW1lTWVtYmVycyhleHBhbmQoaW5wdXQpLCBbaW5wdXRdKTtcbiAgfSk7XG5cbiAgaXQoJ3dyYXBzIHRoZSBwcm92aWRlZCB2YWx1ZSBpZiBhIFNlbmRNZXNzYWdlUHJvdG9FcnJvciB3aXRoIG5vIGVycm9ycycsICgpID0+IHtcbiAgICBjb25zdCBpbnB1dCA9IG5ldyBTZW5kTWVzc2FnZVByb3RvRXJyb3Ioe30pO1xuICAgIGFzc2VydC5zYW1lTWVtYmVycyhleHBhbmQoaW5wdXQpLCBbaW5wdXRdKTtcbiAgfSk7XG5cbiAgaXQoXCJ1c2VzIGEgU2VuZE1lc3NhZ2VQcm90b0Vycm9yJ3MgZXJyb3JzXCIsICgpID0+IHtcbiAgICBjb25zdCBlcnJvcnMgPSBbbmV3IEVycm9yKCdvbmUnKSwgbmV3IEVycm9yKCd0d28nKV07XG4gICAgY29uc3QgaW5wdXQgPSBuZXcgU2VuZE1lc3NhZ2VQcm90b0Vycm9yKHsgZXJyb3JzIH0pO1xuICAgIGFzc2VydC5zdHJpY3RFcXVhbChleHBhbmQoaW5wdXQpLCBlcnJvcnMpO1xuICB9KTtcbn0pO1xuXG5kZXNjcmliZSgnaGFuZGxlTXVsdGlwbGVTZW5kRXJyb3JzJywgKCkgPT4ge1xuICBjb25zdCBtYWtlNDEzID0gKHJldHJ5QWZ0ZXI6IG51bWJlcik6IEhUVFBFcnJvciA9PlxuICAgIG5ldyBIVFRQRXJyb3IoJ1Nsb3cgZG93bicsIHtcbiAgICAgIGNvZGU6IDQxMyxcbiAgICAgIGhlYWRlcnM6IHsgJ3JldHJ5LWFmdGVyJzogcmV0cnlBZnRlci50b1N0cmluZygpIH0sXG4gICAgICByZXNwb25zZToge30sXG4gICAgfSk7XG5cbiAgY29uc3QgZGVmYXVsdE9wdGlvbnMgPSB7XG4gICAgaXNGaW5hbEF0dGVtcHQ6IGZhbHNlLFxuICAgIGxvZzogeyBpbmZvOiBub29wIH0sXG4gICAgbWFya0ZhaWxlZDogKCkgPT4ge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGlzIHNob3VsZCBub3QgYmUgY2FsbGVkJyk7XG4gICAgfSxcbiAgICB0aW1lUmVtYWluaW5nOiAxMjM0LFxuICB9O1xuXG4gIGxldCBzYW5kYm94OiBzaW5vbi5TaW5vblNhbmRib3g7XG4gIGxldCBjbG9jazogc2lub24uU2lub25GYWtlVGltZXJzO1xuXG4gIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgIHNhbmRib3ggPSBzaW5vbi5jcmVhdGVTYW5kYm94KCk7XG4gICAgY2xvY2sgPSBzYW5kYm94LnVzZUZha2VUaW1lcnMoKTtcbiAgfSk7XG5cbiAgYWZ0ZXJFYWNoKCgpID0+IHtcbiAgICBzYW5kYm94LnJlc3RvcmUoKTtcbiAgfSk7XG5cbiAgaXQoJ3Rocm93cyB0aGUgZmlyc3QgcHJvdmlkZWQgZXJyb3InLCBhc3luYyAoKSA9PiB7XG4gICAgYXdhaXQgYXNzZXJ0LmlzUmVqZWN0ZWQoXG4gICAgICBoYW5kbGVNdWx0aXBsZVNlbmRFcnJvcnMoe1xuICAgICAgICAuLi5kZWZhdWx0T3B0aW9ucyxcbiAgICAgICAgZXJyb3JzOiBbbmV3IEVycm9yKCdmaXJzdCcpLCBuZXcgRXJyb3IoJ3NlY29uZCcpXSxcbiAgICAgICAgdG9UaHJvdzogbmV3IEVycm9yKCd0byB0aHJvdycpLFxuICAgICAgfSksXG4gICAgICAndG8gdGhyb3cnXG4gICAgKTtcbiAgfSk7XG5cbiAgaXQoXCJtYXJrcyB0aGUgc2VuZCBmYWlsZWQgaWYgaXQncyB0aGUgZmluYWwgYXR0ZW1wdFwiLCBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgbWFya0ZhaWxlZCA9IHNpbm9uLnN0dWIoKTtcblxuICAgIGF3YWl0IGFzc2VydC5pc1JlamVjdGVkKFxuICAgICAgaGFuZGxlTXVsdGlwbGVTZW5kRXJyb3JzKHtcbiAgICAgICAgLi4uZGVmYXVsdE9wdGlvbnMsXG4gICAgICAgIGVycm9yczogW25ldyBFcnJvcigndWggb2gnKV0sXG4gICAgICAgIG1hcmtGYWlsZWQsXG4gICAgICAgIGlzRmluYWxBdHRlbXB0OiB0cnVlLFxuICAgICAgICB0b1Rocm93OiBuZXcgRXJyb3IoJ3RvIHRocm93JyksXG4gICAgICB9KVxuICAgICk7XG5cbiAgICBzaW5vbi5hc3NlcnQuY2FsbGVkT25jZVdpdGhFeGFjdGx5KG1hcmtGYWlsZWQpO1xuICB9KTtcblxuICBpdChcImRvZXNuJ3QgcmVxdWlyZSBgbWFya0ZhaWxlZGBcIiwgYXN5bmMgKCkgPT4ge1xuICAgIGF3YWl0IGFzc2VydC5pc1JlamVjdGVkKFxuICAgICAgaGFuZGxlTXVsdGlwbGVTZW5kRXJyb3JzKHtcbiAgICAgICAgLi4ub21pdChkZWZhdWx0T3B0aW9ucywgJ21hcmtGYWlsZWQnKSxcbiAgICAgICAgZXJyb3JzOiBbbmV3IEVycm9yKCdUZXN0IG1lc3NhZ2UnKV0sXG4gICAgICAgIGlzRmluYWxBdHRlbXB0OiB0cnVlLFxuICAgICAgICB0b1Rocm93OiBuZXcgRXJyb3IoJ3RvIHRocm93JyksXG4gICAgICB9KSxcbiAgICAgICd0byB0aHJvdydcbiAgICApO1xuICB9KTtcblxuICBkZXNjcmliZSgnNDEzIGhhbmRsaW5nJywgKCkgPT4ge1xuICAgIGl0KCdzbGVlcHMgZm9yIHRoZSBsb25nZXN0IDQxMyBSZXRyeS1BZnRlciB0aW1lJywgYXN5bmMgKCkgPT4ge1xuICAgICAgbGV0IGRvbmUgPSBmYWxzZTtcblxuICAgICAgKGFzeW5jICgpID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBhd2FpdCBoYW5kbGVNdWx0aXBsZVNlbmRFcnJvcnMoe1xuICAgICAgICAgICAgLi4uZGVmYXVsdE9wdGlvbnMsXG4gICAgICAgICAgICBlcnJvcnM6IFtcbiAgICAgICAgICAgICAgbmV3IEVycm9yKCdPdGhlcicpLFxuICAgICAgICAgICAgICBtYWtlNDEzKDEwKSxcbiAgICAgICAgICAgICAgbWFrZTQxMyg5OTkpLFxuICAgICAgICAgICAgICBtYWtlNDEzKDIwKSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB0aW1lUmVtYWluaW5nOiA5OTk5OTk5OSxcbiAgICAgICAgICAgIHRvVGhyb3c6IG5ldyBFcnJvcigndG8gdGhyb3cnKSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgLy8gTm8tb3BcbiAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICBkb25lID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSkoKTtcblxuICAgICAgYXdhaXQgY2xvY2sudGlja0FzeW5jKDkwMCAqIFNFQ09ORCk7XG4gICAgICBhc3NlcnQuaXNGYWxzZShkb25lLCBcIkRpZG4ndCBzbGVlcCBmb3IgbG9uZyBlbm91Z2hcIik7XG4gICAgICBhd2FpdCBjbG9jay50aWNrQXN5bmMoMTAwICogU0VDT05EKTtcbiAgICAgIGFzc2VydC5pc1RydWUoZG9uZSwgJ1NsZXB0IGZvciB0b28gbG9uZycpO1xuICAgIH0pO1xuXG4gICAgaXQoXCJkb2Vzbid0IHNsZWVwIGxvbmdlciB0aGFuIHRoZSByZW1haW5pbmcgdGltZVwiLCBhc3luYyAoKSA9PiB7XG4gICAgICBsZXQgZG9uZSA9IGZhbHNlO1xuXG4gICAgICAoYXN5bmMgKCkgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGF3YWl0IGhhbmRsZU11bHRpcGxlU2VuZEVycm9ycyh7XG4gICAgICAgICAgICAuLi5kZWZhdWx0T3B0aW9ucyxcbiAgICAgICAgICAgIGVycm9yczogW21ha2U0MTMoOTk5OSldLFxuICAgICAgICAgICAgdGltZVJlbWFpbmluZzogOTksXG4gICAgICAgICAgICB0b1Rocm93OiBuZXcgRXJyb3IoJ3RvIHRocm93JyksXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgIC8vIE5vLW9wXG4gICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgZG9uZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0pKCk7XG5cbiAgICAgIGF3YWl0IGNsb2NrLnRpY2tBc3luYygxMDApO1xuICAgICAgYXNzZXJ0LmlzVHJ1ZShkb25lKTtcbiAgICB9KTtcblxuICAgIGl0KFwiZG9lc24ndCBzbGVlcCBpZiBpdCdzIHRoZSBmaW5hbCBhdHRlbXB0XCIsIGFzeW5jICgpID0+IHtcbiAgICAgIGF3YWl0IGFzc2VydC5pc1JlamVjdGVkKFxuICAgICAgICBoYW5kbGVNdWx0aXBsZVNlbmRFcnJvcnMoe1xuICAgICAgICAgIC4uLmRlZmF1bHRPcHRpb25zLFxuICAgICAgICAgIGVycm9yczogW25ldyBFcnJvcigndWggb2gnKV0sXG4gICAgICAgICAgaXNGaW5hbEF0dGVtcHQ6IHRydWUsXG4gICAgICAgICAgdG9UaHJvdzogbmV3IEVycm9yKCd0byB0aHJvdycpLFxuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJzUwOCBoYW5kbGluZycsICgpID0+IHtcbiAgICBpdCgncmVzb2x2ZXMgd2l0aCBubyBlcnJvciBpZiBhbnkgNTA4IGlzIHJlY2VpdmVkJywgYXN5bmMgKCkgPT4ge1xuICAgICAgYXdhaXQgYXNzZXJ0LmlzRnVsZmlsbGVkKFxuICAgICAgICBoYW5kbGVNdWx0aXBsZVNlbmRFcnJvcnMoe1xuICAgICAgICAgIC4uLmRlZmF1bHRPcHRpb25zLFxuICAgICAgICAgIGVycm9yczogW25ldyBFcnJvcigndWggb2gnKSwgeyBjb2RlOiA1MDggfSwgbWFrZTQxMyg5OTk5OSldLFxuICAgICAgICAgIG1hcmtGYWlsZWQ6IG5vb3AsXG4gICAgICAgICAgdG9UaHJvdzogbmV3IEVycm9yKCd0byB0aHJvdycpLFxuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIGl0KCdtYXJrcyB0aGUgc2VuZCBmYWlsZWQgb24gYSA1MDgnLCBhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBtYXJrRmFpbGVkID0gc2lub24uc3R1YigpO1xuXG4gICAgICBhd2FpdCBoYW5kbGVNdWx0aXBsZVNlbmRFcnJvcnMoe1xuICAgICAgICAuLi5kZWZhdWx0T3B0aW9ucyxcbiAgICAgICAgZXJyb3JzOiBbeyBjb2RlOiA1MDggfV0sXG4gICAgICAgIG1hcmtGYWlsZWQsXG4gICAgICAgIHRvVGhyb3c6IG5ldyBFcnJvcigndG8gdGhyb3cnKSxcbiAgICAgIH0pO1xuXG4gICAgICBzaW5vbi5hc3NlcnQuY2FsbGVkT25jZVdpdGhFeGFjdGx5KG1hcmtGYWlsZWQpO1xuICAgIH0pO1xuICB9KTtcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7OztBQUdBLGtCQUF1QjtBQUN2QixZQUF1QjtBQUN2QixvQkFBMkI7QUFDM0Isb0JBQWlEO0FBQ2pELHVCQUF1QjtBQUV2QixzQ0FHTztBQUVQLFNBQVMscUJBQXFCLE1BQU07QUFFbEMsUUFBTSxTQUFTLHdCQUFDLFVBQW1CLHVEQUFrQixLQUFLLEdBQTNDO0FBRWYsS0FBRyw0RUFBNEUsTUFBTTtBQUNuRixVQUFNLFFBQVEsRUFBRSxLQUFLLElBQUk7QUFDekIsdUJBQU8sWUFBWSxPQUFPLEtBQUssR0FBRyxDQUFDLEtBQUssQ0FBQztBQUFBLEVBQzNDLENBQUM7QUFFRCxLQUFHLHNFQUFzRSxNQUFNO0FBQzdFLFVBQU0sUUFBUSxJQUFJLG9DQUFzQixDQUFDLENBQUM7QUFDMUMsdUJBQU8sWUFBWSxPQUFPLEtBQUssR0FBRyxDQUFDLEtBQUssQ0FBQztBQUFBLEVBQzNDLENBQUM7QUFFRCxLQUFHLHlDQUF5QyxNQUFNO0FBQ2hELFVBQU0sU0FBUyxDQUFDLElBQUksTUFBTSxLQUFLLEdBQUcsSUFBSSxNQUFNLEtBQUssQ0FBQztBQUNsRCxVQUFNLFFBQVEsSUFBSSxvQ0FBc0IsRUFBRSxPQUFPLENBQUM7QUFDbEQsdUJBQU8sWUFBWSxPQUFPLEtBQUssR0FBRyxNQUFNO0FBQUEsRUFDMUMsQ0FBQztBQUNILENBQUM7QUFFRCxTQUFTLDRCQUE0QixNQUFNO0FBQ3pDLFFBQU0sVUFBVSx3QkFBQyxlQUNmLElBQUksd0JBQVUsYUFBYTtBQUFBLElBQ3pCLE1BQU07QUFBQSxJQUNOLFNBQVMsRUFBRSxlQUFlLFdBQVcsU0FBUyxFQUFFO0FBQUEsSUFDaEQsVUFBVSxDQUFDO0FBQUEsRUFDYixDQUFDLEdBTGE7QUFPaEIsUUFBTSxpQkFBaUI7QUFBQSxJQUNyQixnQkFBZ0I7QUFBQSxJQUNoQixLQUFLLEVBQUUsTUFBTSxtQkFBSztBQUFBLElBQ2xCLFlBQVksTUFBTTtBQUNoQixZQUFNLElBQUksTUFBTSwyQkFBMkI7QUFBQSxJQUM3QztBQUFBLElBQ0EsZUFBZTtBQUFBLEVBQ2pCO0FBRUEsTUFBSTtBQUNKLE1BQUk7QUFFSixhQUFXLE1BQU07QUFDZixjQUFVLE1BQU0sY0FBYztBQUM5QixZQUFRLFFBQVEsY0FBYztBQUFBLEVBQ2hDLENBQUM7QUFFRCxZQUFVLE1BQU07QUFDZCxZQUFRLFFBQVE7QUFBQSxFQUNsQixDQUFDO0FBRUQsS0FBRyxtQ0FBbUMsWUFBWTtBQUNoRCxVQUFNLG1CQUFPLFdBQ1gsOERBQXlCO0FBQUEsU0FDcEI7QUFBQSxNQUNILFFBQVEsQ0FBQyxJQUFJLE1BQU0sT0FBTyxHQUFHLElBQUksTUFBTSxRQUFRLENBQUM7QUFBQSxNQUNoRCxTQUFTLElBQUksTUFBTSxVQUFVO0FBQUEsSUFDL0IsQ0FBQyxHQUNELFVBQ0Y7QUFBQSxFQUNGLENBQUM7QUFFRCxLQUFHLG1EQUFtRCxZQUFZO0FBQ2hFLFVBQU0sYUFBYSxNQUFNLEtBQUs7QUFFOUIsVUFBTSxtQkFBTyxXQUNYLDhEQUF5QjtBQUFBLFNBQ3BCO0FBQUEsTUFDSCxRQUFRLENBQUMsSUFBSSxNQUFNLE9BQU8sQ0FBQztBQUFBLE1BQzNCO0FBQUEsTUFDQSxnQkFBZ0I7QUFBQSxNQUNoQixTQUFTLElBQUksTUFBTSxVQUFVO0FBQUEsSUFDL0IsQ0FBQyxDQUNIO0FBRUEsVUFBTSxPQUFPLHNCQUFzQixVQUFVO0FBQUEsRUFDL0MsQ0FBQztBQUVELEtBQUcsZ0NBQWdDLFlBQVk7QUFDN0MsVUFBTSxtQkFBTyxXQUNYLDhEQUF5QjtBQUFBLFNBQ3BCLHdCQUFLLGdCQUFnQixZQUFZO0FBQUEsTUFDcEMsUUFBUSxDQUFDLElBQUksTUFBTSxjQUFjLENBQUM7QUFBQSxNQUNsQyxnQkFBZ0I7QUFBQSxNQUNoQixTQUFTLElBQUksTUFBTSxVQUFVO0FBQUEsSUFDL0IsQ0FBQyxHQUNELFVBQ0Y7QUFBQSxFQUNGLENBQUM7QUFFRCxXQUFTLGdCQUFnQixNQUFNO0FBQzdCLE9BQUcsK0NBQStDLFlBQVk7QUFDNUQsVUFBSSxPQUFPO0FBRVgsTUFBQyxhQUFZO0FBQ1gsWUFBSTtBQUNGLGdCQUFNLDhEQUF5QjtBQUFBLGVBQzFCO0FBQUEsWUFDSCxRQUFRO0FBQUEsY0FDTixJQUFJLE1BQU0sT0FBTztBQUFBLGNBQ2pCLFFBQVEsRUFBRTtBQUFBLGNBQ1YsUUFBUSxHQUFHO0FBQUEsY0FDWCxRQUFRLEVBQUU7QUFBQSxZQUNaO0FBQUEsWUFDQSxlQUFlO0FBQUEsWUFDZixTQUFTLElBQUksTUFBTSxVQUFVO0FBQUEsVUFDL0IsQ0FBQztBQUFBLFFBQ0gsU0FBUyxLQUFQO0FBQUEsUUFFRixVQUFFO0FBQ0EsaUJBQU87QUFBQSxRQUNUO0FBQUEsTUFDRixHQUFHO0FBRUgsWUFBTSxNQUFNLFVBQVUsTUFBTSx1QkFBTTtBQUNsQyx5QkFBTyxRQUFRLE1BQU0sOEJBQThCO0FBQ25ELFlBQU0sTUFBTSxVQUFVLE1BQU0sdUJBQU07QUFDbEMseUJBQU8sT0FBTyxNQUFNLG9CQUFvQjtBQUFBLElBQzFDLENBQUM7QUFFRCxPQUFHLGdEQUFnRCxZQUFZO0FBQzdELFVBQUksT0FBTztBQUVYLE1BQUMsYUFBWTtBQUNYLFlBQUk7QUFDRixnQkFBTSw4REFBeUI7QUFBQSxlQUMxQjtBQUFBLFlBQ0gsUUFBUSxDQUFDLFFBQVEsSUFBSSxDQUFDO0FBQUEsWUFDdEIsZUFBZTtBQUFBLFlBQ2YsU0FBUyxJQUFJLE1BQU0sVUFBVTtBQUFBLFVBQy9CLENBQUM7QUFBQSxRQUNILFNBQVMsS0FBUDtBQUFBLFFBRUYsVUFBRTtBQUNBLGlCQUFPO0FBQUEsUUFDVDtBQUFBLE1BQ0YsR0FBRztBQUVILFlBQU0sTUFBTSxVQUFVLEdBQUc7QUFDekIseUJBQU8sT0FBTyxJQUFJO0FBQUEsSUFDcEIsQ0FBQztBQUVELE9BQUcsMkNBQTJDLFlBQVk7QUFDeEQsWUFBTSxtQkFBTyxXQUNYLDhEQUF5QjtBQUFBLFdBQ3BCO0FBQUEsUUFDSCxRQUFRLENBQUMsSUFBSSxNQUFNLE9BQU8sQ0FBQztBQUFBLFFBQzNCLGdCQUFnQjtBQUFBLFFBQ2hCLFNBQVMsSUFBSSxNQUFNLFVBQVU7QUFBQSxNQUMvQixDQUFDLENBQ0g7QUFBQSxJQUNGLENBQUM7QUFBQSxFQUNILENBQUM7QUFFRCxXQUFTLGdCQUFnQixNQUFNO0FBQzdCLE9BQUcsaURBQWlELFlBQVk7QUFDOUQsWUFBTSxtQkFBTyxZQUNYLDhEQUF5QjtBQUFBLFdBQ3BCO0FBQUEsUUFDSCxRQUFRLENBQUMsSUFBSSxNQUFNLE9BQU8sR0FBRyxFQUFFLE1BQU0sSUFBSSxHQUFHLFFBQVEsS0FBSyxDQUFDO0FBQUEsUUFDMUQsWUFBWTtBQUFBLFFBQ1osU0FBUyxJQUFJLE1BQU0sVUFBVTtBQUFBLE1BQy9CLENBQUMsQ0FDSDtBQUFBLElBQ0YsQ0FBQztBQUVELE9BQUcsa0NBQWtDLFlBQVk7QUFDL0MsWUFBTSxhQUFhLE1BQU0sS0FBSztBQUU5QixZQUFNLDhEQUF5QjtBQUFBLFdBQzFCO0FBQUEsUUFDSCxRQUFRLENBQUMsRUFBRSxNQUFNLElBQUksQ0FBQztBQUFBLFFBQ3RCO0FBQUEsUUFDQSxTQUFTLElBQUksTUFBTSxVQUFVO0FBQUEsTUFDL0IsQ0FBQztBQUVELFlBQU0sT0FBTyxzQkFBc0IsVUFBVTtBQUFBLElBQy9DLENBQUM7QUFBQSxFQUNILENBQUM7QUFDSCxDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
