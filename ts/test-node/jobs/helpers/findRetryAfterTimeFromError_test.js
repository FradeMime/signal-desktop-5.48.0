var import_chai = require("chai");
var import_findRetryAfterTimeFromError = require("../../../jobs/helpers/findRetryAfterTimeFromError");
var import_Errors = require("../../../textsecure/Errors");
var import_durations = require("../../../util/durations");
describe("findRetryAfterTimeFromError", () => {
  it("returns 1 minute if no Retry-After time is found", () => {
    [
      void 0,
      null,
      {},
      { responseHeaders: {} },
      { responseHeaders: { "retry-after": "garbage" } },
      { responseHeaders: { "retry-after": "0.5" } },
      { responseHeaders: { "retry-after": "12.34" } },
      {
        httpError: new import_Errors.HTTPError("Slow down", {
          code: 413,
          headers: {},
          response: {}
        })
      },
      {
        httpError: new import_Errors.HTTPError("Slow down", {
          code: 413,
          headers: { "retry-after": "garbage" },
          response: {}
        })
      },
      {
        httpError: new import_Errors.HTTPError("Slow down", {
          code: 429,
          headers: {},
          response: {}
        })
      },
      {
        httpError: new import_Errors.HTTPError("Slow down", {
          code: 429,
          headers: { "retry-after": "garbage" },
          response: {}
        })
      }
    ].forEach((input) => {
      import_chai.assert.strictEqual((0, import_findRetryAfterTimeFromError.findRetryAfterTimeFromError)(input), import_durations.MINUTE);
    });
  });
  it("returns 1 second if a Retry-After time is found, but it's less than 1 second", () => {
    ["0", "-99"].forEach((headerValue) => {
      const input = { responseHeaders: { "retry-after": headerValue } };
      import_chai.assert.strictEqual((0, import_findRetryAfterTimeFromError.findRetryAfterTimeFromError)(input), 1e3);
    });
  });
  it("returns 1 minute for extremely large numbers", () => {
    const input = { responseHeaders: { "retry-after": "999999999999999999" } };
    import_chai.assert.strictEqual((0, import_findRetryAfterTimeFromError.findRetryAfterTimeFromError)(input), import_durations.MINUTE);
  });
  it("finds the retry-after time on top-level response headers", () => {
    const input = { responseHeaders: { "retry-after": "1234" } };
    import_chai.assert.strictEqual((0, import_findRetryAfterTimeFromError.findRetryAfterTimeFromError)(input), 1234 * 1e3);
  });
  it("finds the retry-after time on an HTTP error's response headers", () => {
    const input = {
      httpError: new import_Errors.HTTPError("Slow down", {
        code: 413,
        headers: { "retry-after": "1234" },
        response: {}
      })
    };
    import_chai.assert.strictEqual((0, import_findRetryAfterTimeFromError.findRetryAfterTimeFromError)(input), 1234 * 1e3);
  });
  it("finds the retry-after time on an HTTP error's response headers", () => {
    const input = {
      httpError: new import_Errors.HTTPError("Slow down", {
        code: 429,
        headers: { "retry-after": "1234" },
        response: {}
      })
    };
    import_chai.assert.strictEqual((0, import_findRetryAfterTimeFromError.findRetryAfterTimeFromError)(input), 1234 * 1e3);
  });
  it("prefers the top-level response headers over an HTTP error", () => {
    const input = {
      responseHeaders: { "retry-after": "1234" },
      httpError: new import_Errors.HTTPError("Slow down", {
        code: 413,
        headers: { "retry-after": "999" },
        response: {}
      })
    };
    import_chai.assert.strictEqual((0, import_findRetryAfterTimeFromError.findRetryAfterTimeFromError)(input), 1234 * 1e3);
  });
  it("prefers the top-level response headers over an HTTP error", () => {
    const input = {
      responseHeaders: { "retry-after": "1234" },
      httpError: new import_Errors.HTTPError("Slow down", {
        code: 429,
        headers: { "retry-after": "999" },
        response: {}
      })
    };
    import_chai.assert.strictEqual((0, import_findRetryAfterTimeFromError.findRetryAfterTimeFromError)(input), 1234 * 1e3);
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZmluZFJldHJ5QWZ0ZXJUaW1lRnJvbUVycm9yX3Rlc3QudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSAnY2hhaSc7XG5cbmltcG9ydCB7IGZpbmRSZXRyeUFmdGVyVGltZUZyb21FcnJvciB9IGZyb20gJy4uLy4uLy4uL2pvYnMvaGVscGVycy9maW5kUmV0cnlBZnRlclRpbWVGcm9tRXJyb3InO1xuaW1wb3J0IHsgSFRUUEVycm9yIH0gZnJvbSAnLi4vLi4vLi4vdGV4dHNlY3VyZS9FcnJvcnMnO1xuaW1wb3J0IHsgTUlOVVRFIH0gZnJvbSAnLi4vLi4vLi4vdXRpbC9kdXJhdGlvbnMnO1xuXG5kZXNjcmliZSgnZmluZFJldHJ5QWZ0ZXJUaW1lRnJvbUVycm9yJywgKCkgPT4ge1xuICBpdCgncmV0dXJucyAxIG1pbnV0ZSBpZiBubyBSZXRyeS1BZnRlciB0aW1lIGlzIGZvdW5kJywgKCkgPT4ge1xuICAgIFtcbiAgICAgIHVuZGVmaW5lZCxcbiAgICAgIG51bGwsXG4gICAgICB7fSxcbiAgICAgIHsgcmVzcG9uc2VIZWFkZXJzOiB7fSB9LFxuICAgICAgeyByZXNwb25zZUhlYWRlcnM6IHsgJ3JldHJ5LWFmdGVyJzogJ2dhcmJhZ2UnIH0gfSxcbiAgICAgIHsgcmVzcG9uc2VIZWFkZXJzOiB7ICdyZXRyeS1hZnRlcic6ICcwLjUnIH0gfSxcbiAgICAgIHsgcmVzcG9uc2VIZWFkZXJzOiB7ICdyZXRyeS1hZnRlcic6ICcxMi4zNCcgfSB9LFxuICAgICAge1xuICAgICAgICBodHRwRXJyb3I6IG5ldyBIVFRQRXJyb3IoJ1Nsb3cgZG93bicsIHtcbiAgICAgICAgICBjb2RlOiA0MTMsXG4gICAgICAgICAgaGVhZGVyczoge30sXG4gICAgICAgICAgcmVzcG9uc2U6IHt9LFxuICAgICAgICB9KSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGh0dHBFcnJvcjogbmV3IEhUVFBFcnJvcignU2xvdyBkb3duJywge1xuICAgICAgICAgIGNvZGU6IDQxMyxcbiAgICAgICAgICBoZWFkZXJzOiB7ICdyZXRyeS1hZnRlcic6ICdnYXJiYWdlJyB9LFxuICAgICAgICAgIHJlc3BvbnNlOiB7fSxcbiAgICAgICAgfSksXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBodHRwRXJyb3I6IG5ldyBIVFRQRXJyb3IoJ1Nsb3cgZG93bicsIHtcbiAgICAgICAgICBjb2RlOiA0MjksXG4gICAgICAgICAgaGVhZGVyczoge30sXG4gICAgICAgICAgcmVzcG9uc2U6IHt9LFxuICAgICAgICB9KSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGh0dHBFcnJvcjogbmV3IEhUVFBFcnJvcignU2xvdyBkb3duJywge1xuICAgICAgICAgIGNvZGU6IDQyOSxcbiAgICAgICAgICBoZWFkZXJzOiB7ICdyZXRyeS1hZnRlcic6ICdnYXJiYWdlJyB9LFxuICAgICAgICAgIHJlc3BvbnNlOiB7fSxcbiAgICAgICAgfSksXG4gICAgICB9LFxuICAgIF0uZm9yRWFjaChpbnB1dCA9PiB7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoZmluZFJldHJ5QWZ0ZXJUaW1lRnJvbUVycm9yKGlucHV0KSwgTUlOVVRFKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgaXQoXCJyZXR1cm5zIDEgc2Vjb25kIGlmIGEgUmV0cnktQWZ0ZXIgdGltZSBpcyBmb3VuZCwgYnV0IGl0J3MgbGVzcyB0aGFuIDEgc2Vjb25kXCIsICgpID0+IHtcbiAgICBbJzAnLCAnLTk5J10uZm9yRWFjaChoZWFkZXJWYWx1ZSA9PiB7XG4gICAgICBjb25zdCBpbnB1dCA9IHsgcmVzcG9uc2VIZWFkZXJzOiB7ICdyZXRyeS1hZnRlcic6IGhlYWRlclZhbHVlIH0gfTtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChmaW5kUmV0cnlBZnRlclRpbWVGcm9tRXJyb3IoaW5wdXQpLCAxMDAwKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgaXQoJ3JldHVybnMgMSBtaW51dGUgZm9yIGV4dHJlbWVseSBsYXJnZSBudW1iZXJzJywgKCkgPT4ge1xuICAgIGNvbnN0IGlucHV0ID0geyByZXNwb25zZUhlYWRlcnM6IHsgJ3JldHJ5LWFmdGVyJzogJzk5OTk5OTk5OTk5OTk5OTk5OScgfSB9O1xuICAgIGFzc2VydC5zdHJpY3RFcXVhbChmaW5kUmV0cnlBZnRlclRpbWVGcm9tRXJyb3IoaW5wdXQpLCBNSU5VVEUpO1xuICB9KTtcblxuICBpdCgnZmluZHMgdGhlIHJldHJ5LWFmdGVyIHRpbWUgb24gdG9wLWxldmVsIHJlc3BvbnNlIGhlYWRlcnMnLCAoKSA9PiB7XG4gICAgY29uc3QgaW5wdXQgPSB7IHJlc3BvbnNlSGVhZGVyczogeyAncmV0cnktYWZ0ZXInOiAnMTIzNCcgfSB9O1xuICAgIGFzc2VydC5zdHJpY3RFcXVhbChmaW5kUmV0cnlBZnRlclRpbWVGcm9tRXJyb3IoaW5wdXQpLCAxMjM0ICogMTAwMCk7XG4gIH0pO1xuXG4gIGl0KFwiZmluZHMgdGhlIHJldHJ5LWFmdGVyIHRpbWUgb24gYW4gSFRUUCBlcnJvcidzIHJlc3BvbnNlIGhlYWRlcnNcIiwgKCkgPT4ge1xuICAgIGNvbnN0IGlucHV0ID0ge1xuICAgICAgaHR0cEVycm9yOiBuZXcgSFRUUEVycm9yKCdTbG93IGRvd24nLCB7XG4gICAgICAgIGNvZGU6IDQxMyxcbiAgICAgICAgaGVhZGVyczogeyAncmV0cnktYWZ0ZXInOiAnMTIzNCcgfSxcbiAgICAgICAgcmVzcG9uc2U6IHt9LFxuICAgICAgfSksXG4gICAgfTtcbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwoZmluZFJldHJ5QWZ0ZXJUaW1lRnJvbUVycm9yKGlucHV0KSwgMTIzNCAqIDEwMDApO1xuICB9KTtcblxuICBpdChcImZpbmRzIHRoZSByZXRyeS1hZnRlciB0aW1lIG9uIGFuIEhUVFAgZXJyb3IncyByZXNwb25zZSBoZWFkZXJzXCIsICgpID0+IHtcbiAgICBjb25zdCBpbnB1dCA9IHtcbiAgICAgIGh0dHBFcnJvcjogbmV3IEhUVFBFcnJvcignU2xvdyBkb3duJywge1xuICAgICAgICBjb2RlOiA0MjksXG4gICAgICAgIGhlYWRlcnM6IHsgJ3JldHJ5LWFmdGVyJzogJzEyMzQnIH0sXG4gICAgICAgIHJlc3BvbnNlOiB7fSxcbiAgICAgIH0pLFxuICAgIH07XG4gICAgYXNzZXJ0LnN0cmljdEVxdWFsKGZpbmRSZXRyeUFmdGVyVGltZUZyb21FcnJvcihpbnB1dCksIDEyMzQgKiAxMDAwKTtcbiAgfSk7XG5cbiAgaXQoJ3ByZWZlcnMgdGhlIHRvcC1sZXZlbCByZXNwb25zZSBoZWFkZXJzIG92ZXIgYW4gSFRUUCBlcnJvcicsICgpID0+IHtcbiAgICBjb25zdCBpbnB1dCA9IHtcbiAgICAgIHJlc3BvbnNlSGVhZGVyczogeyAncmV0cnktYWZ0ZXInOiAnMTIzNCcgfSxcbiAgICAgIGh0dHBFcnJvcjogbmV3IEhUVFBFcnJvcignU2xvdyBkb3duJywge1xuICAgICAgICBjb2RlOiA0MTMsXG4gICAgICAgIGhlYWRlcnM6IHsgJ3JldHJ5LWFmdGVyJzogJzk5OScgfSxcbiAgICAgICAgcmVzcG9uc2U6IHt9LFxuICAgICAgfSksXG4gICAgfTtcbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwoZmluZFJldHJ5QWZ0ZXJUaW1lRnJvbUVycm9yKGlucHV0KSwgMTIzNCAqIDEwMDApO1xuICB9KTtcblxuICBpdCgncHJlZmVycyB0aGUgdG9wLWxldmVsIHJlc3BvbnNlIGhlYWRlcnMgb3ZlciBhbiBIVFRQIGVycm9yJywgKCkgPT4ge1xuICAgIGNvbnN0IGlucHV0ID0ge1xuICAgICAgcmVzcG9uc2VIZWFkZXJzOiB7ICdyZXRyeS1hZnRlcic6ICcxMjM0JyB9LFxuICAgICAgaHR0cEVycm9yOiBuZXcgSFRUUEVycm9yKCdTbG93IGRvd24nLCB7XG4gICAgICAgIGNvZGU6IDQyOSxcbiAgICAgICAgaGVhZGVyczogeyAncmV0cnktYWZ0ZXInOiAnOTk5JyB9LFxuICAgICAgICByZXNwb25zZToge30sXG4gICAgICB9KSxcbiAgICB9O1xuICAgIGFzc2VydC5zdHJpY3RFcXVhbChmaW5kUmV0cnlBZnRlclRpbWVGcm9tRXJyb3IoaW5wdXQpLCAxMjM0ICogMTAwMCk7XG4gIH0pO1xufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiQUFHQSxrQkFBdUI7QUFFdkIseUNBQTRDO0FBQzVDLG9CQUEwQjtBQUMxQix1QkFBdUI7QUFFdkIsU0FBUywrQkFBK0IsTUFBTTtBQUM1QyxLQUFHLG9EQUFvRCxNQUFNO0FBQzNEO0FBQUEsTUFDRTtBQUFBLE1BQ0E7QUFBQSxNQUNBLENBQUM7QUFBQSxNQUNELEVBQUUsaUJBQWlCLENBQUMsRUFBRTtBQUFBLE1BQ3RCLEVBQUUsaUJBQWlCLEVBQUUsZUFBZSxVQUFVLEVBQUU7QUFBQSxNQUNoRCxFQUFFLGlCQUFpQixFQUFFLGVBQWUsTUFBTSxFQUFFO0FBQUEsTUFDNUMsRUFBRSxpQkFBaUIsRUFBRSxlQUFlLFFBQVEsRUFBRTtBQUFBLE1BQzlDO0FBQUEsUUFDRSxXQUFXLElBQUksd0JBQVUsYUFBYTtBQUFBLFVBQ3BDLE1BQU07QUFBQSxVQUNOLFNBQVMsQ0FBQztBQUFBLFVBQ1YsVUFBVSxDQUFDO0FBQUEsUUFDYixDQUFDO0FBQUEsTUFDSDtBQUFBLE1BQ0E7QUFBQSxRQUNFLFdBQVcsSUFBSSx3QkFBVSxhQUFhO0FBQUEsVUFDcEMsTUFBTTtBQUFBLFVBQ04sU0FBUyxFQUFFLGVBQWUsVUFBVTtBQUFBLFVBQ3BDLFVBQVUsQ0FBQztBQUFBLFFBQ2IsQ0FBQztBQUFBLE1BQ0g7QUFBQSxNQUNBO0FBQUEsUUFDRSxXQUFXLElBQUksd0JBQVUsYUFBYTtBQUFBLFVBQ3BDLE1BQU07QUFBQSxVQUNOLFNBQVMsQ0FBQztBQUFBLFVBQ1YsVUFBVSxDQUFDO0FBQUEsUUFDYixDQUFDO0FBQUEsTUFDSDtBQUFBLE1BQ0E7QUFBQSxRQUNFLFdBQVcsSUFBSSx3QkFBVSxhQUFhO0FBQUEsVUFD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
