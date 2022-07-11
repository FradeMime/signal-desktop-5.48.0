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
var import_moment = __toESM(require("moment"));
var import_durations = require("../../util/durations");
var import_timestamp = require("../../util/timestamp");
const FAKE_NOW = new Date("2020-01-23T04:56:00.000");
describe("timestamp", () => {
  function useFakeTimers() {
    let sandbox;
    beforeEach(() => {
      sandbox = sinon.createSandbox();
      sandbox.useFakeTimers({ now: FAKE_NOW });
    });
    afterEach(() => {
      sandbox.restore();
    });
  }
  const i18n = /* @__PURE__ */ __name((key, values = []) => {
    switch (key) {
      case "today":
        return "Today";
      case "yesterday":
        return "Yesterday";
      case "TimelineDateHeader--date-in-last-6-months":
        return "[short] ddd, MMM D";
      case "TimelineDateHeader--date-older-than-6-months":
        return "[long] MMM D, YYYY";
      case "timestampFormat__long__today":
        return "[Today] LT";
      case "timestampFormat__long__yesterday":
        return "[Yesterday] LT";
      case "justNow":
        return "Now";
      case "minutesAgo":
        return `${values[0]}m`;
      case "timestampFormat_M":
        return "MMM D";
      default:
        throw new Error(`Unexpected key ${key}`);
    }
  }, "i18n");
  describe("formatDate", () => {
    useFakeTimers();
    it('returns "Today" for times today', () => {
      [(0, import_moment.default)(), (0, import_moment.default)().endOf("day"), (0, import_moment.default)().startOf("day")].forEach((m) => {
        import_chai.assert.strictEqual((0, import_timestamp.formatDate)(i18n, m), "Today");
      });
    });
    it('returns "Yesterday" for times yesterday', () => {
      const minus24Hours = (0, import_moment.default)().subtract(1, "day");
      [
        minus24Hours,
        minus24Hours.clone().endOf("day"),
        minus24Hours.clone().startOf("day")
      ].forEach((m) => {
        import_chai.assert.strictEqual((0, import_timestamp.formatDate)(i18n, m), "Yesterday");
      });
    });
    it("returns a formatted timestamp for dates more recent than six months", () => {
      const m = (0, import_moment.default)().subtract(2, "months");
      const result = (0, import_timestamp.formatDate)(i18n, m);
      import_chai.assert.include(result, "short");
      import_chai.assert.include(result, m.format("ddd"));
      import_chai.assert.include(result, m.format("MMM"));
      import_chai.assert.include(result, m.format("D"));
      import_chai.assert.notInclude(result, m.format("YYYY"));
    });
    it("returns a formatted timestamp for dates older than six months", () => {
      import_chai.assert.strictEqual((0, import_timestamp.formatDate)(i18n, (0, import_moment.default)("2017-03-03")), "long Mar 3, 2017");
    });
    it("returns a formatted timestamp if the i18n strings are too long", () => {
      const longI18n = /* @__PURE__ */ __name((_) => Array(50).fill("MMM").join(" "), "longI18n");
      import_chai.assert.include((0, import_timestamp.formatDate)(longI18n, (0, import_moment.default)("2017-03-03")), "2017");
    });
  });
  describe("formatDateTimeLong", () => {
    useFakeTimers();
    it('includes "Today" and the time for times today', () => {
      import_chai.assert.strictEqual((0, import_timestamp.formatDateTimeLong)(i18n, FAKE_NOW), "Today 4:56 AM");
    });
    it('includes "Yesterday" and the time for times yesterday', () => {
      import_chai.assert.strictEqual((0, import_timestamp.formatDateTimeLong)(i18n, (0, import_moment.default)().subtract(1, "day")), "Yesterday 4:56 AM");
    });
    it("formats month name, day of month, year, and time for other times", () => {
      [
        (0, import_moment.default)().add(1, "week"),
        (0, import_moment.default)().subtract(1, "week"),
        (0, import_moment.default)().subtract(1, "year")
      ].forEach((timestamp) => {
        import_chai.assert.strictEqual((0, import_timestamp.formatDateTimeLong)(i18n, timestamp), (0, import_moment.default)(timestamp).format("lll"));
      });
    });
  });
  describe("formatDateTimeShort", () => {
    useFakeTimers();
    it('returns "Now" for times within the last minute, including unexpected times in the future', () => {
      [
        Date.now(),
        (0, import_moment.default)().subtract(1, "second"),
        (0, import_moment.default)().subtract(59, "seconds"),
        (0, import_moment.default)().add(1, "minute"),
        (0, import_moment.default)().add(1, "year")
      ].forEach((timestamp) => {
        import_chai.assert.strictEqual((0, import_timestamp.formatDateTimeShort)(i18n, timestamp), "Now");
      });
    });
    it('returns "X minutes ago" for times in the last hour, but older than 1 minute', () => {
      import_chai.assert.strictEqual((0, import_timestamp.formatDateTimeShort)(i18n, (0, import_moment.default)().subtract(1, "minute")), "1m");
      import_chai.assert.strictEqual((0, import_timestamp.formatDateTimeShort)(i18n, (0, import_moment.default)().subtract(30, "minutes")), "30m");
      import_chai.assert.strictEqual((0, import_timestamp.formatDateTimeShort)(i18n, (0, import_moment.default)().subtract(59, "minutes")), "59m");
    });
    it("returns hh:mm-like times for times older than 1 hour from now, but still today", () => {
      const oneHourAgo = new Date("2020-01-23T03:56:00.000");
      import_chai.assert.deepEqual((0, import_timestamp.formatDateTimeShort)(i18n, oneHourAgo), "3:56 AM");
    });
    it("returns the day of the week for dates in the last week, but still this month", () => {
      const yesterday = new Date("2020-01-22T23:56:00.000");
      import_chai.assert.deepEqual((0, import_timestamp.formatDateTimeShort)(i18n, yesterday), "Wed");
      const twoDaysAgo = new Date("2020-01-21T05:56:00.000");
      import_chai.assert.deepEqual((0, import_timestamp.formatDateTimeShort)(i18n, twoDaysAgo), "Tue");
    });
    it("returns the month and day for dates older than this week, but still this year", () => {
      const earlier = new Date("2020-01-03T04:56:00.000");
      import_chai.assert.deepEqual((0, import_timestamp.formatDateTimeShort)(i18n, earlier), "Jan 3");
    });
    it("returns the year, month, and day for dates older than a year ago", () => {
      const longAgo = new Date("1998-11-23T12:34:00.000");
      import_chai.assert.deepEqual((0, import_timestamp.formatDateTimeShort)(i18n, longAgo), "Nov 23, 1998");
    });
  });
  describe("formatTime", () => {
    it('returns "Now" for times within the last minute, including unexpected times in the future', () => {
      [
        FAKE_NOW,
        (0, import_moment.default)(FAKE_NOW).subtract(1, "second"),
        (0, import_moment.default)(FAKE_NOW).subtract(59, "seconds"),
        (0, import_moment.default)(FAKE_NOW).add(1, "minute"),
        (0, import_moment.default)(FAKE_NOW).add(1, "year")
      ].forEach((timestamp) => {
        import_chai.assert.strictEqual((0, import_timestamp.formatTime)(i18n, timestamp, FAKE_NOW), "Now");
      });
    });
    it('returns "X minutes ago" for times in the last hour, but older than 1 minute', () => {
      import_chai.assert.strictEqual((0, import_timestamp.formatTime)(i18n, (0, import_moment.default)(FAKE_NOW).subtract(1, "minute"), FAKE_NOW), "1m");
      import_chai.assert.strictEqual((0, import_timestamp.formatTime)(i18n, (0, import_moment.default)(FAKE_NOW).subtract(30, "minutes"), FAKE_NOW), "30m");
      import_chai.assert.strictEqual((0, import_timestamp.formatTime)(i18n, (0, import_moment.default)(FAKE_NOW).subtract(59, "minutes"), FAKE_NOW), "59m");
    });
    it("returns hh:mm-like times for times older than 1 hour from now", () => {
      const oneHourAgo = new Date("2020-01-23T03:56:00.000");
      import_chai.assert.deepEqual((0, import_timestamp.formatTime)(i18n, oneHourAgo, FAKE_NOW), "3:56 AM");
      const oneDayAgo = new Date("2020-01-22T04:56:00.000");
      import_chai.assert.deepEqual((0, import_timestamp.formatTime)(i18n, oneDayAgo, FAKE_NOW), "4:56 AM");
      const oneYearAgo = new Date("2019-01-23T04:56:00.000");
      import_chai.assert.deepEqual((0, import_timestamp.formatTime)(i18n, oneYearAgo, FAKE_NOW), "4:56 AM");
    });
  });
  describe("isOlderThan", () => {
    it("returns false on recent and future timestamps", () => {
      import_chai.assert.isFalse((0, import_timestamp.isOlderThan)(Date.now(), import_durations.DAY));
      import_chai.assert.isFalse((0, import_timestamp.isOlderThan)(Date.now() + import_durations.DAY, import_durations.DAY));
    });
    it("returns true on old enough timestamps", () => {
      import_chai.assert.isFalse((0, import_timestamp.isOlderThan)(Date.now() - import_durations.DAY + import_durations.HOUR, import_durations.DAY));
      import_chai.assert.isTrue((0, import_timestamp.isOlderThan)(Date.now() - import_durations.DAY - import_durations.HOUR, import_durations.DAY));
    });
  });
  describe("isMoreRecentThan", () => {
    it("returns true on recent and future timestamps", () => {
      import_chai.assert.isTrue((0, import_timestamp.isMoreRecentThan)(Date.now(), import_durations.DAY));
      import_chai.assert.isTrue((0, import_timestamp.isMoreRecentThan)(Date.now() + import_durations.DAY, import_durations.DAY));
    });
    it("returns false on old enough timestamps", () => {
      import_chai.assert.isTrue((0, import_timestamp.isMoreRecentThan)(Date.now() - import_durations.DAY + import_durations.HOUR, import_durations.DAY));
      import_chai.assert.isFalse((0, import_timestamp.isMoreRecentThan)(Date.now() - import_durations.DAY - import_durations.HOUR, import_durations.DAY));
    });
  });
  describe("isSameDay", () => {
    it("returns false for different days", () => {
      import_chai.assert.isFalse((0, import_timestamp.isSameDay)(new Date(1998, 10, 21, 12, 34, 56, 123), new Date(2006, 10, 21, 12, 34, 56, 123)));
    });
    it("returns true for identical timestamps", () => {
      const timestamp = new Date(1998, 10, 21, 12, 34, 56, 123);
      import_chai.assert.isTrue((0, import_timestamp.isSameDay)(timestamp, timestamp));
    });
    it("returns true for times on the same day", () => {
      import_chai.assert.isTrue((0, import_timestamp.isSameDay)(new Date(1998, 10, 21, 12, 34, 56, 123), new Date(1998, 10, 21, 1, 23, 45, 123)));
    });
  });
  describe("isToday", () => {
    useFakeTimers();
    it("returns false for days other than today", () => {
      import_chai.assert.isFalse((0, import_timestamp.isToday)(Date.now() + import_durations.DAY));
      import_chai.assert.isFalse((0, import_timestamp.isToday)(Date.now() - import_durations.DAY));
    });
    it("returns true right now", () => {
      import_chai.assert.isTrue((0, import_timestamp.isToday)(Date.now()));
    });
    it("returns true for times today", () => {
      import_chai.assert.isTrue((0, import_timestamp.isToday)(new Date("2020-01-23T03:56:00.000")));
    });
  });
  describe("toDayMillis", () => {
    const now = new Date();
    const today = new Date((0, import_timestamp.toDayMillis)(now.valueOf()));
    import_chai.assert.strictEqual(today.getUTCMilliseconds(), 0);
    import_chai.assert.strictEqual(today.getUTCHours(), 0);
    import_chai.assert.strictEqual(today.getUTCMinutes(), 0);
    import_chai.assert.strictEqual(today.getUTCSeconds(), 0);
    import_chai.assert.strictEqual(today.getUTCDate(), now.getUTCDate());
    import_chai.assert.strictEqual(today.getUTCMonth(), now.getUTCMonth());
    import_chai.assert.strictEqual(today.getUTCFullYear(), now.getUTCFullYear());
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidGltZXN0YW1wX3Rlc3QudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxLTIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyBhc3NlcnQgfSBmcm9tICdjaGFpJztcbmltcG9ydCAqIGFzIHNpbm9uIGZyb20gJ3Npbm9uJztcbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcbmltcG9ydCB0eXBlIHsgTG9jYWxpemVyVHlwZSB9IGZyb20gJy4uLy4uL3R5cGVzL1V0aWwnO1xuaW1wb3J0IHsgSE9VUiwgREFZIH0gZnJvbSAnLi4vLi4vdXRpbC9kdXJhdGlvbnMnO1xuXG5pbXBvcnQge1xuICBmb3JtYXREYXRlLFxuICBmb3JtYXREYXRlVGltZUxvbmcsXG4gIGZvcm1hdERhdGVUaW1lU2hvcnQsXG4gIGZvcm1hdFRpbWUsXG4gIGlzTW9yZVJlY2VudFRoYW4sXG4gIGlzT2xkZXJUaGFuLFxuICBpc1NhbWVEYXksXG4gIGlzVG9kYXksXG4gIHRvRGF5TWlsbGlzLFxufSBmcm9tICcuLi8uLi91dGlsL3RpbWVzdGFtcCc7XG5cbmNvbnN0IEZBS0VfTk9XID0gbmV3IERhdGUoJzIwMjAtMDEtMjNUMDQ6NTY6MDAuMDAwJyk7XG5cbmRlc2NyaWJlKCd0aW1lc3RhbXAnLCAoKSA9PiB7XG4gIGZ1bmN0aW9uIHVzZUZha2VUaW1lcnMoKSB7XG4gICAgbGV0IHNhbmRib3g6IHNpbm9uLlNpbm9uU2FuZGJveDtcblxuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgc2FuZGJveCA9IHNpbm9uLmNyZWF0ZVNhbmRib3goKTtcbiAgICAgIHNhbmRib3gudXNlRmFrZVRpbWVycyh7IG5vdzogRkFLRV9OT1cgfSk7XG4gICAgfSk7XG5cbiAgICBhZnRlckVhY2goKCkgPT4ge1xuICAgICAgc2FuZGJveC5yZXN0b3JlKCk7XG4gICAgfSk7XG4gIH1cblxuICBjb25zdCBpMThuID0gKChrZXk6IHN0cmluZywgdmFsdWVzOiBBcnJheTxzdHJpbmc+ID0gW10pOiBzdHJpbmcgPT4ge1xuICAgIHN3aXRjaCAoa2V5KSB7XG4gICAgICBjYXNlICd0b2RheSc6XG4gICAgICAgIHJldHVybiAnVG9kYXknO1xuICAgICAgY2FzZSAneWVzdGVyZGF5JzpcbiAgICAgICAgcmV0dXJuICdZZXN0ZXJkYXknO1xuICAgICAgY2FzZSAnVGltZWxpbmVEYXRlSGVhZGVyLS1kYXRlLWluLWxhc3QtNi1tb250aHMnOlxuICAgICAgICByZXR1cm4gJ1tzaG9ydF0gZGRkLCBNTU0gRCc7XG4gICAgICBjYXNlICdUaW1lbGluZURhdGVIZWFkZXItLWRhdGUtb2xkZXItdGhhbi02LW1vbnRocyc6XG4gICAgICAgIHJldHVybiAnW2xvbmddIE1NTSBELCBZWVlZJztcbiAgICAgIGNhc2UgJ3RpbWVzdGFtcEZvcm1hdF9fbG9uZ19fdG9kYXknOlxuICAgICAgICByZXR1cm4gJ1tUb2RheV0gTFQnO1xuICAgICAgY2FzZSAndGltZXN0YW1wRm9ybWF0X19sb25nX195ZXN0ZXJkYXknOlxuICAgICAgICByZXR1cm4gJ1tZZXN0ZXJkYXldIExUJztcbiAgICAgIGNhc2UgJ2p1c3ROb3cnOlxuICAgICAgICByZXR1cm4gJ05vdyc7XG4gICAgICBjYXNlICdtaW51dGVzQWdvJzpcbiAgICAgICAgcmV0dXJuIGAke3ZhbHVlc1swXX1tYDtcbiAgICAgIGNhc2UgJ3RpbWVzdGFtcEZvcm1hdF9NJzpcbiAgICAgICAgcmV0dXJuICdNTU0gRCc7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVuZXhwZWN0ZWQga2V5ICR7a2V5fWApO1xuICAgIH1cbiAgfSkgYXMgTG9jYWxpemVyVHlwZTtcblxuICBkZXNjcmliZSgnZm9ybWF0RGF0ZScsICgpID0+IHtcbiAgICB1c2VGYWtlVGltZXJzKCk7XG5cbiAgICBpdCgncmV0dXJucyBcIlRvZGF5XCIgZm9yIHRpbWVzIHRvZGF5JywgKCkgPT4ge1xuICAgICAgW21vbWVudCgpLCBtb21lbnQoKS5lbmRPZignZGF5JyksIG1vbWVudCgpLnN0YXJ0T2YoJ2RheScpXS5mb3JFYWNoKG0gPT4ge1xuICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoZm9ybWF0RGF0ZShpMThuLCBtKSwgJ1RvZGF5Jyk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIFwiWWVzdGVyZGF5XCIgZm9yIHRpbWVzIHllc3RlcmRheScsICgpID0+IHtcbiAgICAgIGNvbnN0IG1pbnVzMjRIb3VycyA9IG1vbWVudCgpLnN1YnRyYWN0KDEsICdkYXknKTtcbiAgICAgIFtcbiAgICAgICAgbWludXMyNEhvdXJzLFxuICAgICAgICBtaW51czI0SG91cnMuY2xvbmUoKS5lbmRPZignZGF5JyksXG4gICAgICAgIG1pbnVzMjRIb3Vycy5jbG9uZSgpLnN0YXJ0T2YoJ2RheScpLFxuICAgICAgXS5mb3JFYWNoKG0gPT4ge1xuICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoZm9ybWF0RGF0ZShpMThuLCBtKSwgJ1llc3RlcmRheScpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyBhIGZvcm1hdHRlZCB0aW1lc3RhbXAgZm9yIGRhdGVzIG1vcmUgcmVjZW50IHRoYW4gc2l4IG1vbnRocycsICgpID0+IHtcbiAgICAgIGNvbnN0IG0gPSBtb21lbnQoKS5zdWJ0cmFjdCgyLCAnbW9udGhzJyk7XG4gICAgICBjb25zdCByZXN1bHQgPSBmb3JtYXREYXRlKGkxOG4sIG0pO1xuICAgICAgYXNzZXJ0LmluY2x1ZGUocmVzdWx0LCAnc2hvcnQnKTtcbiAgICAgIGFzc2VydC5pbmNsdWRlKHJlc3VsdCwgbS5mb3JtYXQoJ2RkZCcpKTtcbiAgICAgIGFzc2VydC5pbmNsdWRlKHJlc3VsdCwgbS5mb3JtYXQoJ01NTScpKTtcbiAgICAgIGFzc2VydC5pbmNsdWRlKHJlc3VsdCwgbS5mb3JtYXQoJ0QnKSk7XG4gICAgICBhc3NlcnQubm90SW5jbHVkZShyZXN1bHQsIG0uZm9ybWF0KCdZWVlZJykpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgYSBmb3JtYXR0ZWQgdGltZXN0YW1wIGZvciBkYXRlcyBvbGRlciB0aGFuIHNpeCBtb250aHMnLCAoKSA9PiB7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoXG4gICAgICAgIGZvcm1hdERhdGUoaTE4biwgbW9tZW50KCcyMDE3LTAzLTAzJykpLFxuICAgICAgICAnbG9uZyBNYXIgMywgMjAxNydcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyBhIGZvcm1hdHRlZCB0aW1lc3RhbXAgaWYgdGhlIGkxOG4gc3RyaW5ncyBhcmUgdG9vIGxvbmcnLCAoKSA9PiB7XG4gICAgICBjb25zdCBsb25nSTE4biA9ICgoXzogc3RyaW5nKSA9PlxuICAgICAgICBBcnJheSg1MCkuZmlsbCgnTU1NJykuam9pbignICcpKSBhcyBMb2NhbGl6ZXJUeXBlO1xuICAgICAgYXNzZXJ0LmluY2x1ZGUoZm9ybWF0RGF0ZShsb25nSTE4biwgbW9tZW50KCcyMDE3LTAzLTAzJykpLCAnMjAxNycpO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnZm9ybWF0RGF0ZVRpbWVMb25nJywgKCkgPT4ge1xuICAgIHVzZUZha2VUaW1lcnMoKTtcblxuICAgIGl0KCdpbmNsdWRlcyBcIlRvZGF5XCIgYW5kIHRoZSB0aW1lIGZvciB0aW1lcyB0b2RheScsICgpID0+IHtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChmb3JtYXREYXRlVGltZUxvbmcoaTE4biwgRkFLRV9OT1cpLCAnVG9kYXkgNDo1NiBBTScpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2luY2x1ZGVzIFwiWWVzdGVyZGF5XCIgYW5kIHRoZSB0aW1lIGZvciB0aW1lcyB5ZXN0ZXJkYXknLCAoKSA9PiB7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoXG4gICAgICAgIGZvcm1hdERhdGVUaW1lTG9uZyhpMThuLCBtb21lbnQoKS5zdWJ0cmFjdCgxLCAnZGF5JykpLFxuICAgICAgICAnWWVzdGVyZGF5IDQ6NTYgQU0nXG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgaXQoJ2Zvcm1hdHMgbW9udGggbmFtZSwgZGF5IG9mIG1vbnRoLCB5ZWFyLCBhbmQgdGltZSBmb3Igb3RoZXIgdGltZXMnLCAoKSA9PiB7XG4gICAgICBbXG4gICAgICAgIG1vbWVudCgpLmFkZCgxLCAnd2VlaycpLFxuICAgICAgICBtb21lbnQoKS5zdWJ0cmFjdCgxLCAnd2VlaycpLFxuICAgICAgICBtb21lbnQoKS5zdWJ0cmFjdCgxLCAneWVhcicpLFxuICAgICAgXS5mb3JFYWNoKHRpbWVzdGFtcCA9PiB7XG4gICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgICAgICBmb3JtYXREYXRlVGltZUxvbmcoaTE4biwgdGltZXN0YW1wKSxcbiAgICAgICAgICBtb21lbnQodGltZXN0YW1wKS5mb3JtYXQoJ2xsbCcpXG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ2Zvcm1hdERhdGVUaW1lU2hvcnQnLCAoKSA9PiB7XG4gICAgdXNlRmFrZVRpbWVycygpO1xuXG4gICAgaXQoJ3JldHVybnMgXCJOb3dcIiBmb3IgdGltZXMgd2l0aGluIHRoZSBsYXN0IG1pbnV0ZSwgaW5jbHVkaW5nIHVuZXhwZWN0ZWQgdGltZXMgaW4gdGhlIGZ1dHVyZScsICgpID0+IHtcbiAgICAgIFtcbiAgICAgICAgRGF0ZS5ub3coKSxcbiAgICAgICAgbW9tZW50KCkuc3VidHJhY3QoMSwgJ3NlY29uZCcpLFxuICAgICAgICBtb21lbnQoKS5zdWJ0cmFjdCg1OSwgJ3NlY29uZHMnKSxcbiAgICAgICAgbW9tZW50KCkuYWRkKDEsICdtaW51dGUnKSxcbiAgICAgICAgbW9tZW50KCkuYWRkKDEsICd5ZWFyJyksXG4gICAgICBdLmZvckVhY2godGltZXN0YW1wID0+IHtcbiAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGZvcm1hdERhdGVUaW1lU2hvcnQoaTE4biwgdGltZXN0YW1wKSwgJ05vdycpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyBcIlggbWludXRlcyBhZ29cIiBmb3IgdGltZXMgaW4gdGhlIGxhc3QgaG91ciwgYnV0IG9sZGVyIHRoYW4gMSBtaW51dGUnLCAoKSA9PiB7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoXG4gICAgICAgIGZvcm1hdERhdGVUaW1lU2hvcnQoaTE4biwgbW9tZW50KCkuc3VidHJhY3QoMSwgJ21pbnV0ZScpKSxcbiAgICAgICAgJzFtJ1xuICAgICAgKTtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgICAgZm9ybWF0RGF0ZVRpbWVTaG9ydChpMThuLCBtb21lbnQoKS5zdWJ0cmFjdCgzMCwgJ21pbnV0ZXMnKSksXG4gICAgICAgICczMG0nXG4gICAgICApO1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgICBmb3JtYXREYXRlVGltZVNob3J0KGkxOG4sIG1vbWVudCgpLnN1YnRyYWN0KDU5LCAnbWludXRlcycpKSxcbiAgICAgICAgJzU5bSdcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyBoaDptbS1saWtlIHRpbWVzIGZvciB0aW1lcyBvbGRlciB0aGFuIDEgaG91ciBmcm9tIG5vdywgYnV0IHN0aWxsIHRvZGF5JywgKCkgPT4ge1xuICAgICAgY29uc3Qgb25lSG91ckFnbyA9IG5ldyBEYXRlKCcyMDIwLTAxLTIzVDAzOjU2OjAwLjAwMCcpO1xuICAgICAgYXNzZXJ0LmRlZXBFcXVhbChmb3JtYXREYXRlVGltZVNob3J0KGkxOG4sIG9uZUhvdXJBZ28pLCAnMzo1NiBBTScpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgdGhlIGRheSBvZiB0aGUgd2VlayBmb3IgZGF0ZXMgaW4gdGhlIGxhc3Qgd2VlaywgYnV0IHN0aWxsIHRoaXMgbW9udGgnLCAoKSA9PiB7XG4gICAgICBjb25zdCB5ZXN0ZXJkYXkgPSBuZXcgRGF0ZSgnMjAyMC0wMS0yMlQyMzo1NjowMC4wMDAnKTtcbiAgICAgIGFzc2VydC5kZWVwRXF1YWwoZm9ybWF0RGF0ZVRpbWVTaG9ydChpMThuLCB5ZXN0ZXJkYXkpLCAnV2VkJyk7XG5cbiAgICAgIGNvbnN0IHR3b0RheXNBZ28gPSBuZXcgRGF0ZSgnMjAyMC0wMS0yMVQwNTo1NjowMC4wMDAnKTtcbiAgICAgIGFzc2VydC5kZWVwRXF1YWwoZm9ybWF0RGF0ZVRpbWVTaG9ydChpMThuLCB0d29EYXlzQWdvKSwgJ1R1ZScpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgdGhlIG1vbnRoIGFuZCBkYXkgZm9yIGRhdGVzIG9sZGVyIHRoYW4gdGhpcyB3ZWVrLCBidXQgc3RpbGwgdGhpcyB5ZWFyJywgKCkgPT4ge1xuICAgICAgY29uc3QgZWFybGllciA9IG5ldyBEYXRlKCcyMDIwLTAxLTAzVDA0OjU2OjAwLjAwMCcpO1xuICAgICAgYXNzZXJ0LmRlZXBFcXVhbChmb3JtYXREYXRlVGltZVNob3J0KGkxOG4sIGVhcmxpZXIpLCAnSmFuIDMnKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIHRoZSB5ZWFyLCBtb250aCwgYW5kIGRheSBmb3IgZGF0ZXMgb2xkZXIgdGhhbiBhIHllYXIgYWdvJywgKCkgPT4ge1xuICAgICAgY29uc3QgbG9uZ0FnbyA9IG5ldyBEYXRlKCcxOTk4LTExLTIzVDEyOjM0OjAwLjAwMCcpO1xuICAgICAgYXNzZXJ0LmRlZXBFcXVhbChmb3JtYXREYXRlVGltZVNob3J0KGkxOG4sIGxvbmdBZ28pLCAnTm92IDIzLCAxOTk4Jyk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdmb3JtYXRUaW1lJywgKCkgPT4ge1xuICAgIGl0KCdyZXR1cm5zIFwiTm93XCIgZm9yIHRpbWVzIHdpdGhpbiB0aGUgbGFzdCBtaW51dGUsIGluY2x1ZGluZyB1bmV4cGVjdGVkIHRpbWVzIGluIHRoZSBmdXR1cmUnLCAoKSA9PiB7XG4gICAgICBbXG4gICAgICAgIEZBS0VfTk9XLFxuICAgICAgICBtb21lbnQoRkFLRV9OT1cpLnN1YnRyYWN0KDEsICdzZWNvbmQnKSxcbiAgICAgICAgbW9tZW50KEZBS0VfTk9XKS5zdWJ0cmFjdCg1OSwgJ3NlY29uZHMnKSxcbiAgICAgICAgbW9tZW50KEZBS0VfTk9XKS5hZGQoMSwgJ21pbnV0ZScpLFxuICAgICAgICBtb21lbnQoRkFLRV9OT1cpLmFkZCgxLCAneWVhcicpLFxuICAgICAgXS5mb3JFYWNoKHRpbWVzdGFtcCA9PiB7XG4gICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChmb3JtYXRUaW1lKGkxOG4sIHRpbWVzdGFtcCwgRkFLRV9OT1cpLCAnTm93Jyk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIFwiWCBtaW51dGVzIGFnb1wiIGZvciB0aW1lcyBpbiB0aGUgbGFzdCBob3VyLCBidXQgb2xkZXIgdGhhbiAxIG1pbnV0ZScsICgpID0+IHtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgICAgZm9ybWF0VGltZShpMThuLCBtb21lbnQoRkFLRV9OT1cpLnN1YnRyYWN0KDEsICdtaW51dGUnKSwgRkFLRV9OT1cpLFxuICAgICAgICAnMW0nXG4gICAgICApO1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgICBmb3JtYXRUaW1lKGkxOG4sIG1vbWVudChGQUtFX05PVykuc3VidHJhY3QoMzAsICdtaW51dGVzJyksIEZBS0VfTk9XKSxcbiAgICAgICAgJzMwbSdcbiAgICAgICk7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoXG4gICAgICAgIGZvcm1hdFRpbWUoaTE4biwgbW9tZW50KEZBS0VfTk9XKS5zdWJ0cmFjdCg1OSwgJ21pbnV0ZXMnKSwgRkFLRV9OT1cpLFxuICAgICAgICAnNTltJ1xuICAgICAgKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIGhoOm1tLWxpa2UgdGltZXMgZm9yIHRpbWVzIG9sZGVyIHRoYW4gMSBob3VyIGZyb20gbm93JywgKCkgPT4ge1xuICAgICAgY29uc3Qgb25lSG91ckFnbyA9IG5ldyBEYXRlKCcyMDIwLTAxLTIzVDAzOjU2OjAwLjAwMCcpO1xuICAgICAgYXNzZXJ0LmRlZXBFcXVhbChmb3JtYXRUaW1lKGkxOG4sIG9uZUhvdXJBZ28sIEZBS0VfTk9XKSwgJzM6NTYgQU0nKTtcblxuICAgICAgY29uc3Qgb25lRGF5QWdvID0gbmV3IERhdGUoJzIwMjAtMDEtMjJUMDQ6NTY6MDAuMDAwJyk7XG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKGZvcm1hdFRpbWUoaTE4biwgb25lRGF5QWdvLCBGQUtFX05PVyksICc0OjU2IEFNJyk7XG5cbiAgICAgIGNvbnN0IG9uZVllYXJBZ28gPSBuZXcgRGF0ZSgnMjAxOS0wMS0yM1QwNDo1NjowMC4wMDAnKTtcbiAgICAgIGFzc2VydC5kZWVwRXF1YWwoZm9ybWF0VGltZShpMThuLCBvbmVZZWFyQWdvLCBGQUtFX05PVyksICc0OjU2IEFNJyk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdpc09sZGVyVGhhbicsICgpID0+IHtcbiAgICBpdCgncmV0dXJucyBmYWxzZSBvbiByZWNlbnQgYW5kIGZ1dHVyZSB0aW1lc3RhbXBzJywgKCkgPT4ge1xuICAgICAgYXNzZXJ0LmlzRmFsc2UoaXNPbGRlclRoYW4oRGF0ZS5ub3coKSwgREFZKSk7XG4gICAgICBhc3NlcnQuaXNGYWxzZShpc09sZGVyVGhhbihEYXRlLm5vdygpICsgREFZLCBEQVkpKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIHRydWUgb24gb2xkIGVub3VnaCB0aW1lc3RhbXBzJywgKCkgPT4ge1xuICAgICAgYXNzZXJ0LmlzRmFsc2UoaXNPbGRlclRoYW4oRGF0ZS5ub3coKSAtIERBWSArIEhPVVIsIERBWSkpO1xuICAgICAgYXNzZXJ0LmlzVHJ1ZShpc09sZGVyVGhhbihEYXRlLm5vdygpIC0gREFZIC0gSE9VUiwgREFZKSk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdpc01vcmVSZWNlbnRUaGFuJywgKCkgPT4ge1xuICAgIGl0KCdyZXR1cm5zIHRydWUgb24gcmVjZW50IGFuZCBmdXR1cmUgdGltZXN0YW1wcycsICgpID0+IHtcbiAgICAgIGFzc2VydC5pc1RydWUoaXNNb3JlUmVjZW50VGhhbihEYXRlLm5vdygpLCBEQVkpKTtcbiAgICAgIGFzc2VydC5pc1RydWUoaXNNb3JlUmVjZW50VGhhbihEYXRlLm5vdygpICsgREFZLCBEQVkpKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIGZhbHNlIG9uIG9sZCBlbm91Z2ggdGltZXN0YW1wcycsICgpID0+IHtcbiAgICAgIGFzc2VydC5pc1RydWUoaXNNb3JlUmVjZW50VGhhbihEYXRlLm5vdygpIC0gREFZICsgSE9VUiwgREFZKSk7XG4gICAgICBhc3NlcnQuaXNGYWxzZShpc01vcmVSZWNlbnRUaGFuKERhdGUubm93KCkgLSBEQVkgLSBIT1VSLCBEQVkpKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ2lzU2FtZURheScsICgpID0+IHtcbiAgICBpdCgncmV0dXJucyBmYWxzZSBmb3IgZGlmZmVyZW50IGRheXMnLCAoKSA9PiB7XG4gICAgICBhc3NlcnQuaXNGYWxzZShcbiAgICAgICAgaXNTYW1lRGF5KFxuICAgICAgICAgIG5ldyBEYXRlKDE5OTgsIDEwLCAyMSwgMTIsIDM0LCA1NiwgMTIzKSxcbiAgICAgICAgICBuZXcgRGF0ZSgyMDA2LCAxMCwgMjEsIDEyLCAzNCwgNTYsIDEyMylcbiAgICAgICAgKVxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIHRydWUgZm9yIGlkZW50aWNhbCB0aW1lc3RhbXBzJywgKCkgPT4ge1xuICAgICAgY29uc3QgdGltZXN0YW1wID0gbmV3IERhdGUoMTk5OCwgMTAsIDIxLCAxMiwgMzQsIDU2LCAxMjMpO1xuICAgICAgYXNzZXJ0LmlzVHJ1ZShpc1NhbWVEYXkodGltZXN0YW1wLCB0aW1lc3RhbXApKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIHRydWUgZm9yIHRpbWVzIG9uIHRoZSBzYW1lIGRheScsICgpID0+IHtcbiAgICAgIGFzc2VydC5pc1RydWUoXG4gICAgICAgIGlzU2FtZURheShcbiAgICAgICAgICBuZXcgRGF0ZSgxOTk4LCAxMCwgMjEsIDEyLCAzNCwgNTYsIDEyMyksXG4gICAgICAgICAgbmV3IERhdGUoMTk5OCwgMTAsIDIxLCAxLCAyMywgNDUsIDEyMylcbiAgICAgICAgKVxuICAgICAgKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ2lzVG9kYXknLCAoKSA9PiB7XG4gICAgdXNlRmFrZVRpbWVycygpO1xuXG4gICAgaXQoJ3JldHVybnMgZmFsc2UgZm9yIGRheXMgb3RoZXIgdGhhbiB0b2RheScsICgpID0+IHtcbiAgICAgIGFzc2VydC5pc0ZhbHNlKGlzVG9kYXkoRGF0ZS5ub3coKSArIERBWSkpO1xuICAgICAgYXNzZXJ0LmlzRmFsc2UoaXNUb2RheShEYXRlLm5vdygpIC0gREFZKSk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyB0cnVlIHJpZ2h0IG5vdycsICgpID0+IHtcbiAgICAgIGFzc2VydC5pc1RydWUoaXNUb2RheShEYXRlLm5vdygpKSk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyB0cnVlIGZvciB0aW1lcyB0b2RheScsICgpID0+IHtcbiAgICAgIGFzc2VydC5pc1RydWUoaXNUb2RheShuZXcgRGF0ZSgnMjAyMC0wMS0yM1QwMzo1NjowMC4wMDAnKSkpO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgndG9EYXlNaWxsaXMnLCAoKSA9PiB7XG4gICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcbiAgICBjb25zdCB0b2RheSA9IG5ldyBEYXRlKHRvRGF5TWlsbGlzKG5vdy52YWx1ZU9mKCkpKTtcblxuICAgIGFzc2VydC5zdHJpY3RFcXVhbCh0b2RheS5nZXRVVENNaWxsaXNlY29uZHMoKSwgMCk7XG4gICAgYXNzZXJ0LnN0cmljdEVxdWFsKHRvZGF5LmdldFVUQ0hvdXJzKCksIDApO1xuICAgIGFzc2VydC5zdHJpY3RFcXVhbCh0b2RheS5nZXRVVENNaW51dGVzKCksIDApO1xuICAgIGFzc2VydC5zdHJpY3RFcXVhbCh0b2RheS5nZXRVVENTZWNvbmRzKCksIDApO1xuICAgIGFzc2VydC5zdHJpY3RFcXVhbCh0b2RheS5nZXRVVENEYXRlKCksIG5vdy5nZXRVVENEYXRlKCkpO1xuICAgIGFzc2VydC5zdHJpY3RFcXVhbCh0b2RheS5nZXRVVENNb250aCgpLCBub3cuZ2V0VVRDTW9udGgoKSk7XG4gICAgYXNzZXJ0LnN0cmljdEVxdWFsKHRvZGF5LmdldFVUQ0Z1bGxZZWFyKCksIG5vdy5nZXRVVENGdWxsWWVhcigpKTtcbiAgfSk7XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHQSxrQkFBdUI7QUFDdkIsWUFBdUI7QUFDdkIsb0JBQW1CO0FBRW5CLHVCQUEwQjtBQUUxQix1QkFVTztBQUVQLE1BQU0sV0FBVyxJQUFJLEtBQUsseUJBQXlCO0FBRW5ELFNBQVMsYUFBYSxNQUFNO0FBQzFCLDJCQUF5QjtBQUN2QixRQUFJO0FBRUosZUFBVyxNQUFNO0FBQ2YsZ0JBQVUsTUFBTSxjQUFjO0FBQzlCLGNBQVEsY0FBYyxFQUFFLEtBQUssU0FBUyxDQUFDO0FBQUEsSUFDekMsQ0FBQztBQUVELGNBQVUsTUFBTTtBQUNkLGNBQVEsUUFBUTtBQUFBLElBQ2xCLENBQUM7QUFBQSxFQUNIO0FBWFMsQUFhVCxRQUFNLE9BQVEsd0JBQUMsS0FBYSxTQUF3QixDQUFDLE1BQWM7QUFDakUsWUFBUTtBQUFBLFdBQ0Q7QUFDSCxlQUFPO0FBQUEsV0FDSjtBQUNILGVBQU87QUFBQSxXQUNKO0FBQ0gsZUFBTztBQUFBLFdBQ0o7QUFDSCxlQUFPO0FBQUEsV0FDSjtBQUNILGVBQU87QUFBQSxXQUNKO0FBQ0gsZUFBTztBQUFBLFdBQ0o7QUFDSCxlQUFPO0FBQUEsV0FDSjtBQUNILGVBQU8sR0FBRyxPQUFPO0FBQUEsV0FDZDtBQUNILGVBQU87QUFBQTtBQUVQLGNBQU0s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QUFFRCxPQUFHLHlDQUF5QyxNQUFNO0FBQ2hELFlBQU0sWUFBWSxJQUFJLEtBQUssTUFBTSxJQUFJLElBQUksSUFBSSxJQUFJLElBQUksR0FBRztBQUN4RCx5QkFBTyxPQUFPLGdDQUFVLFdBQVcsU0FBUyxDQUFDO0FBQUEsSUFDL0MsQ0FBQztBQUVELE9BQUcsMENBQTBDLE1BQU07QUFDakQseUJBQU8sT0FDTCxnQ0FDRSxJQUFJLEtBQUssTUFBTSxJQUFJLElBQUksSUFBSSxJQUFJLElBQUksR0FBRyxHQUN0QyxJQUFJLEtBQUssTUFBTSxJQUFJLElBQUksR0FBRyxJQUFJLElBQUksR0FBRyxDQUN2QyxDQUNGO0FBQUEsSUFDRixDQUFDO0FBQUEsRUFDSCxDQUFDO0FBRUQsV0FBUyxXQUFXLE1BQU07QUFDeEIsa0JBQWM7QUFFZCxPQUFHLDJDQUEyQyxNQUFNO0FBQ2xELHlCQUFPLFFBQVEsOEJBQVEsS0FBSyxJQUFJLElBQUksb0JBQUcsQ0FBQztBQUN4Qyx5QkFBTyxRQUFRLDhCQUFRLEtBQUssSUFBSSxJQUFJLG9CQUFHLENBQUM7QUFBQSxJQUMxQyxDQUFDO0FBRUQsT0FBRywwQkFBMEIsTUFBTTtBQUNqQyx5QkFBTyxPQUFPLDhCQUFRLEtBQUssSUFBSSxDQUFDLENBQUM7QUFBQSxJQUNuQyxDQUFDO0FBRUQsT0FBRyxnQ0FBZ0MsTUFBTTtBQUN2Qyx5QkFBTyxPQUFPLDhCQUFRLElBQUksS0FBSyx5QkFBeUIsQ0FBQyxDQUFDO0FBQUEsSUFDNUQsQ0FBQztBQUFBLEVBQ0gsQ0FBQztBQUVELFdBQVMsZUFBZSxNQUFNO0FBQzVCLFVBQU0sTUFBTSxJQUFJLEtBQUs7QUFDckIsVUFBTSxRQUFRLElBQUksS0FBSyxrQ0FBWSxJQUFJLFFBQVEsQ0FBQyxDQUFDO0FBRWpELHVCQUFPLFlBQVksTUFBTSxtQkFBbUIsR0FBRyxDQUFDO0FBQ2hELHVCQUFPLFlBQVksTUFBTSxZQUFZLEdBQUcsQ0FBQztBQUN6Qyx1QkFBTyxZQUFZLE1BQU0sY0FBYyxHQUFHLENBQUM7QUFDM0MsdUJBQU8sWUFBWSxNQUFNLGNBQWMsR0FBRyxDQUFDO0FBQzNDLHVCQUFPLFlBQVksTUFBTSxXQUFXLEdBQUcsSUFBSSxXQUFXLENBQUM7QUFDdkQsdUJBQU8sWUFBWSxNQUFNLFlBQVksR0FBRyxJQUFJLFlBQVksQ0FBQztBQUN6RCx1QkFBTyxZQUFZLE1BQU0sZUFBZSxHQUFHLElBQUksZUFBZSxDQUFDO0FBQUEsRUFDakUsQ0FBQztBQUNILENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
