var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var timestamp_exports = {};
__export(timestamp_exports, {
  formatDate: () => formatDate,
  formatDateTimeLong: () => formatDateTimeLong,
  formatDateTimeShort: () => formatDateTimeShort,
  formatTime: () => formatTime,
  isInFuture: () => isInFuture,
  isInPast: () => isInPast,
  isMoreRecentThan: () => isMoreRecentThan,
  isOlderThan: () => isOlderThan,
  isSameDay: () => isSameDay,
  isToday: () => isToday,
  toDayMillis: () => toDayMillis
});
module.exports = __toCommonJS(timestamp_exports);
var import_moment = __toESM(require("moment"));
var log = __toESM(require("../logging/log"));
var import_durations = require("./durations");
const MAX_FORMAT_STRING_LENGTH = 50;
function isMoreRecentThan(timestamp, delta) {
  return timestamp > Date.now() - delta;
}
function isOlderThan(timestamp, delta) {
  return timestamp <= Date.now() - delta;
}
function isInPast(timestamp) {
  return isOlderThan(timestamp, 0);
}
function isInFuture(timestamp) {
  return isMoreRecentThan(timestamp, 0);
}
function toDayMillis(timestamp) {
  return timestamp - timestamp % import_durations.DAY;
}
const isSameDay = /* @__PURE__ */ __name((a, b) => (0, import_moment.default)(a).isSame(b, "day"), "isSameDay");
const isToday = /* @__PURE__ */ __name((rawTimestamp) => isSameDay(rawTimestamp, Date.now()), "isToday");
const isYesterday = /* @__PURE__ */ __name((rawTimestamp) => isSameDay(rawTimestamp, (0, import_moment.default)().subtract(1, "day")), "isYesterday");
function sanitizeFormatString(rawFormatString, fallback) {
  if (rawFormatString.length > MAX_FORMAT_STRING_LENGTH) {
    log.error(`Format string ${JSON.stringify(rawFormatString)} is too long. Falling back to ${fallback}`);
    return fallback;
  }
  return rawFormatString;
}
function formatDateTimeShort(i18n, rawTimestamp) {
  const timestamp = rawTimestamp.valueOf();
  const now = Date.now();
  const diff = now - timestamp;
  if (diff < import_durations.HOUR || isToday(timestamp)) {
    return formatTime(i18n, rawTimestamp, now);
  }
  const m = (0, import_moment.default)(timestamp);
  if (diff < import_durations.WEEK && m.isSame(now, "month")) {
    return m.format("ddd");
  }
  if (m.isSame(now, "year")) {
    return m.format(i18n("timestampFormat_M") || "MMM D");
  }
  return m.format("ll");
}
function formatDateTimeLong(i18n, rawTimestamp) {
  let rawFormatString;
  if (isToday(rawTimestamp)) {
    rawFormatString = i18n("timestampFormat__long__today");
  } else if (isYesterday(rawTimestamp)) {
    rawFormatString = i18n("timestampFormat__long__yesterday");
  } else {
    rawFormatString = "lll";
  }
  const formatString = sanitizeFormatString(rawFormatString, "lll");
  return (0, import_moment.default)(rawTimestamp).format(formatString);
}
function formatTime(i18n, rawTimestamp, now, isRelativeTime) {
  const timestamp = rawTimestamp.valueOf();
  const diff = now.valueOf() - timestamp;
  if (diff < import_durations.MINUTE) {
    return i18n("justNow");
  }
  if (diff < import_durations.HOUR) {
    return i18n("minutesAgo", [Math.floor(diff / import_durations.MINUTE).toString()]);
  }
  if (isRelativeTime) {
    return i18n("hoursAgo", [Math.floor(diff / import_durations.HOUR).toString()]);
  }
  return new Date(timestamp).toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit"
  });
}
function formatDate(i18n, rawTimestamp) {
  if (isToday(rawTimestamp)) {
    return i18n("today");
  }
  if (isYesterday(rawTimestamp)) {
    return i18n("yesterday");
  }
  const m = (0, import_moment.default)(rawTimestamp);
  const formatI18nKey = Math.abs(m.diff(Date.now())) < 6 * import_durations.MONTH ? "TimelineDateHeader--date-in-last-6-months" : "TimelineDateHeader--date-older-than-6-months";
  const rawFormatString = i18n(formatI18nKey);
  const formatString = sanitizeFormatString(rawFormatString, "LL");
  return m.format(formatString);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  formatDate,
  formatDateTimeLong,
  formatDateTimeShort,
  formatTime,
  isInFuture,
  isInPast,
  isMoreRecentThan,
  isOlderThan,
  isSameDay,
  isToday,
  toDayMillis
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidGltZXN0YW1wLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMS0yMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHR5cGUgeyBNb21lbnQgfSBmcm9tICdtb21lbnQnO1xuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xuaW1wb3J0IHR5cGUgeyBMb2NhbGl6ZXJUeXBlIH0gZnJvbSAnLi4vdHlwZXMvVXRpbCc7XG5pbXBvcnQgKiBhcyBsb2cgZnJvbSAnLi4vbG9nZ2luZy9sb2cnO1xuaW1wb3J0IHsgREFZLCBIT1VSLCBNSU5VVEUsIE1PTlRILCBXRUVLIH0gZnJvbSAnLi9kdXJhdGlvbnMnO1xuXG5jb25zdCBNQVhfRk9STUFUX1NUUklOR19MRU5HVEggPSA1MDtcblxudHlwZSBSYXdUaW1lc3RhbXAgPSBSZWFkb25seTxudW1iZXIgfCBEYXRlIHwgTW9tZW50PjtcblxuZXhwb3J0IGZ1bmN0aW9uIGlzTW9yZVJlY2VudFRoYW4odGltZXN0YW1wOiBudW1iZXIsIGRlbHRhOiBudW1iZXIpOiBib29sZWFuIHtcbiAgcmV0dXJuIHRpbWVzdGFtcCA+IERhdGUubm93KCkgLSBkZWx0YTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzT2xkZXJUaGFuKHRpbWVzdGFtcDogbnVtYmVyLCBkZWx0YTogbnVtYmVyKTogYm9vbGVhbiB7XG4gIHJldHVybiB0aW1lc3RhbXAgPD0gRGF0ZS5ub3coKSAtIGRlbHRhO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNJblBhc3QodGltZXN0YW1wOiBudW1iZXIpOiBib29sZWFuIHtcbiAgcmV0dXJuIGlzT2xkZXJUaGFuKHRpbWVzdGFtcCwgMCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0luRnV0dXJlKHRpbWVzdGFtcDogbnVtYmVyKTogYm9vbGVhbiB7XG4gIHJldHVybiBpc01vcmVSZWNlbnRUaGFuKHRpbWVzdGFtcCwgMCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0b0RheU1pbGxpcyh0aW1lc3RhbXA6IG51bWJlcik6IG51bWJlciB7XG4gIHJldHVybiB0aW1lc3RhbXAgLSAodGltZXN0YW1wICUgREFZKTtcbn1cblxuZXhwb3J0IGNvbnN0IGlzU2FtZURheSA9IChhOiBSYXdUaW1lc3RhbXAsIGI6IFJhd1RpbWVzdGFtcCk6IGJvb2xlYW4gPT5cbiAgbW9tZW50KGEpLmlzU2FtZShiLCAnZGF5Jyk7XG5cbmV4cG9ydCBjb25zdCBpc1RvZGF5ID0gKHJhd1RpbWVzdGFtcDogUmF3VGltZXN0YW1wKTogYm9vbGVhbiA9PlxuICBpc1NhbWVEYXkocmF3VGltZXN0YW1wLCBEYXRlLm5vdygpKTtcblxuY29uc3QgaXNZZXN0ZXJkYXkgPSAocmF3VGltZXN0YW1wOiBSYXdUaW1lc3RhbXApOiBib29sZWFuID0+XG4gIGlzU2FtZURheShyYXdUaW1lc3RhbXAsIG1vbWVudCgpLnN1YnRyYWN0KDEsICdkYXknKSk7XG5cbi8vIFRoaXMgc2FuaXRpemF0aW9uIGlzIHByb2JhYmx5IHVubmVjZXNzYXJ5LCBidXQgd2UgZG8gaXQganVzdCBpbiBjYXNlIHNvbWVvbmUgdHJhbnNsYXRlc1xuLy8gICBhIHN1cGVyIGxvbmcgZm9ybWF0IHN0cmluZyBhbmQgY2F1c2VzIHBlcmZvcm1hbmNlIGlzc3Vlcy5cbmZ1bmN0aW9uIHNhbml0aXplRm9ybWF0U3RyaW5nKFxuICByYXdGb3JtYXRTdHJpbmc6IHN0cmluZyxcbiAgZmFsbGJhY2s6IHN0cmluZ1xuKTogc3RyaW5nIHtcbiAgaWYgKHJhd0Zvcm1hdFN0cmluZy5sZW5ndGggPiBNQVhfRk9STUFUX1NUUklOR19MRU5HVEgpIHtcbiAgICBsb2cuZXJyb3IoXG4gICAgICBgRm9ybWF0IHN0cmluZyAke0pTT04uc3RyaW5naWZ5KFxuICAgICAgICByYXdGb3JtYXRTdHJpbmdcbiAgICAgICl9IGlzIHRvbyBsb25nLiBGYWxsaW5nIGJhY2sgdG8gJHtmYWxsYmFja31gXG4gICAgKTtcbiAgICByZXR1cm4gZmFsbGJhY2s7XG4gIH1cbiAgcmV0dXJuIHJhd0Zvcm1hdFN0cmluZztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdERhdGVUaW1lU2hvcnQoXG4gIGkxOG46IExvY2FsaXplclR5cGUsXG4gIHJhd1RpbWVzdGFtcDogUmF3VGltZXN0YW1wXG4pOiBzdHJpbmcge1xuICBjb25zdCB0aW1lc3RhbXAgPSByYXdUaW1lc3RhbXAudmFsdWVPZigpO1xuXG4gIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG4gIGNvbnN0IGRpZmYgPSBub3cgLSB0aW1lc3RhbXA7XG5cbiAgaWYgKGRpZmYgPCBIT1VSIHx8IGlzVG9kYXkodGltZXN0YW1wKSkge1xuICAgIHJldHVybiBmb3JtYXRUaW1lKGkxOG4sIHJhd1RpbWVzdGFtcCwgbm93KTtcbiAgfVxuXG4gIGNvbnN0IG0gPSBtb21lbnQodGltZXN0YW1wKTtcblxuICBpZiAoZGlmZiA8IFdFRUsgJiYgbS5pc1NhbWUobm93LCAnbW9udGgnKSkge1xuICAgIHJldHVybiBtLmZvcm1hdCgnZGRkJyk7XG4gIH1cblxuICBpZiAobS5pc1NhbWUobm93LCAneWVhcicpKSB7XG4gICAgcmV0dXJuIG0uZm9ybWF0KGkxOG4oJ3RpbWVzdGFtcEZvcm1hdF9NJykgfHwgJ01NTSBEJyk7XG4gIH1cblxuICByZXR1cm4gbS5mb3JtYXQoJ2xsJyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXREYXRlVGltZUxvbmcoXG4gIGkxOG46IExvY2FsaXplclR5cGUsXG4gIHJhd1RpbWVzdGFtcDogUmF3VGltZXN0YW1wXG4pOiBzdHJpbmcge1xuICBsZXQgcmF3Rm9ybWF0U3RyaW5nOiBzdHJpbmc7XG4gIGlmIChpc1RvZGF5KHJhd1RpbWVzdGFtcCkpIHtcbiAgICByYXdGb3JtYXRTdHJpbmcgPSBpMThuKCd0aW1lc3RhbXBGb3JtYXRfX2xvbmdfX3RvZGF5Jyk7XG4gIH0gZWxzZSBpZiAoaXNZZXN0ZXJkYXkocmF3VGltZXN0YW1wKSkge1xuICAgIHJhd0Zvcm1hdFN0cmluZyA9IGkxOG4oJ3RpbWVzdGFtcEZvcm1hdF9fbG9uZ19feWVzdGVyZGF5Jyk7XG4gIH0gZWxzZSB7XG4gICAgcmF3Rm9ybWF0U3RyaW5nID0gJ2xsbCc7XG4gIH1cbiAgY29uc3QgZm9ybWF0U3RyaW5nID0gc2FuaXRpemVGb3JtYXRTdHJpbmcocmF3Rm9ybWF0U3RyaW5nLCAnbGxsJyk7XG5cbiAgcmV0dXJuIG1vbWVudChyYXdUaW1lc3RhbXApLmZvcm1hdChmb3JtYXRTdHJpbmcpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0VGltZShcbiAgaTE4bjogTG9jYWxpemVyVHlwZSxcbiAgcmF3VGltZXN0YW1wOiBSYXdUaW1lc3RhbXAsXG4gIG5vdzogUmF3VGltZXN0YW1wLFxuICBpc1JlbGF0aXZlVGltZT86IGJvb2xlYW5cbik6IHN0cmluZyB7XG4gIGNvbnN0IHRpbWVzdGFtcCA9IHJhd1RpbWVzdGFtcC52YWx1ZU9mKCk7XG4gIGNvbnN0IGRpZmYgPSBub3cudmFsdWVPZigpIC0gdGltZXN0YW1wO1xuXG4gIGlmIChkaWZmIDwgTUlOVVRFKSB7XG4gICAgcmV0dXJuIGkxOG4oJ2p1c3ROb3cnKTtcbiAgfVxuXG4gIGlmIChkaWZmIDwgSE9VUikge1xuICAgIHJldHVybiBpMThuKCdtaW51dGVzQWdvJywgW01hdGguZmxvb3IoZGlmZiAvIE1JTlVURSkudG9TdHJpbmcoKV0pO1xuICB9XG5cbiAgaWYgKGlzUmVsYXRpdmVUaW1lKSB7XG4gICAgcmV0dXJuIGkxOG4oJ2hvdXJzQWdvJywgW01hdGguZmxvb3IoZGlmZiAvIEhPVVIpLnRvU3RyaW5nKCldKTtcbiAgfVxuXG4gIHJldHVybiBuZXcgRGF0ZSh0aW1lc3RhbXApLnRvTG9jYWxlVGltZVN0cmluZyhbXSwge1xuICAgIGhvdXI6ICdudW1lcmljJyxcbiAgICBtaW51dGU6ICcyLWRpZ2l0JyxcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXREYXRlKFxuICBpMThuOiBMb2NhbGl6ZXJUeXBlLFxuICByYXdUaW1lc3RhbXA6IFJhd1RpbWVzdGFtcFxuKTogc3RyaW5nIHtcbiAgaWYgKGlzVG9kYXkocmF3VGltZXN0YW1wKSkge1xuICAgIHJldHVybiBpMThuKCd0b2RheScpO1xuICB9XG5cbiAgaWYgKGlzWWVzdGVyZGF5KHJhd1RpbWVzdGFtcCkpIHtcbiAgICByZXR1cm4gaTE4bigneWVzdGVyZGF5Jyk7XG4gIH1cblxuICBjb25zdCBtID0gbW9tZW50KHJhd1RpbWVzdGFtcCk7XG5cbiAgY29uc3QgZm9ybWF0STE4bktleSA9XG4gICAgTWF0aC5hYnMobS5kaWZmKERhdGUubm93KCkpKSA8IDYgKiBNT05USFxuICAgICAgPyAnVGltZWxpbmVEYXRlSGVhZGVyLS1kYXRlLWluLWxhc3QtNi1tb250aHMnXG4gICAgICA6ICdUaW1lbGluZURhdGVIZWFkZXItLWRhdGUtb2xkZXItdGhhbi02LW1vbnRocyc7XG4gIGNvbnN0IHJhd0Zvcm1hdFN0cmluZyA9IGkxOG4oZm9ybWF0STE4bktleSk7XG4gIGNvbnN0IGZvcm1hdFN0cmluZyA9IHNhbml0aXplRm9ybWF0U3RyaW5nKHJhd0Zvcm1hdFN0cmluZywgJ0xMJyk7XG5cbiAgcmV0dXJuIG0uZm9ybWF0KGZvcm1hdFN0cmluZyk7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFJQSxvQkFBbUI7QUFFbkIsVUFBcUI7QUFDckIsdUJBQStDO0FBRS9DLE1BQU0sMkJBQTJCO0FBSTFCLDBCQUEwQixXQUFtQixPQUF3QjtBQUMxRSxTQUFPLFlBQVksS0FBSyxJQUFJLElBQUk7QUFDbEM7QUFGZ0IsQUFJVCxxQkFBcUIsV0FBbUIsT0FBd0I7QUFDckUsU0FBTyxhQUFhLEtBQUssSUFBSSxJQUFJO0FBQ25DO0FBRmdCLEFBSVQsa0JBQWtCLFdBQTRCO0FBQ25ELFNBQU8sWUFBWSxXQUFXLENBQUM7QUFDakM7QUFGZ0IsQUFJVCxvQkFBb0IsV0FBNEI7QUFDckQsU0FBTyxpQkFBaUIsV0FBVyxDQUFDO0FBQ3RDO0FBRmdCLEFBSVQscUJBQXFCLFdBQTJCO0FBQ3JELFNBQU8sWUFBYSxZQUFZO0FBQ2xDO0FBRmdCLEFBSVQsTUFBTSxZQUFZLHdCQUFDLEdBQWlCLE1BQ3pDLDJCQUFPLENBQUMsRUFBRSxPQUFPLEdBQUcsS0FBSyxHQURGO0FBR2xCLE1BQU0sVUFBVSx3QkFBQyxpQkFDdEIsVUFBVSxjQUFjLEtBQUssSUFBSSxDQUFDLEdBRGI7QUFHdkIsTUFBTSxjQUFjLHdCQUFDLGlCQUNuQixVQUFVLGNBQWMsMkJBQU8sRUFBRSxTQUFTLEdBQUcsS0FBSyxDQUFDLEdBRGpDO0FBS3BCLDhCQUNFLGlCQUNBLFVBQ1E7QUFDUixNQUFJLGdCQUFnQixTQUFTLDBCQUEwQjtBQUNyRCxRQUFJLE1BQ0YsaUJBQWlCLEtBQUssVUFDcEIsZUFDRixrQ0FBa0MsVUFDcEM7QUFDQSxXQUFPO0FBQUEsRUFDVDtBQUNBLFNBQU87QUFDVDtBQWJTLEFBZUYsNkJBQ0wsTUFDQSxjQUNRO0FBQ1IsUUFBTSxZQUFZLGFBQWEsUUFBUTtBQUV2QyxRQUFNLE1BQU0sS0FBSyxJQUFJO0FBQ3JCLFFBQU0sT0FBTyxNQUFNO0FBRW5CLE1BQUksT0FBTyx5QkFBUSxRQUFRLFNBQVMsR0FBRztBQUNyQyxXQUFPLFdBQVcsTUFBTSxjQUFjLEdBQUc7QUFBQSxFQUMzQztBQUVBLFFBQU0sSUFBSSwyQkFBTyxTQUFTO0FBRTFCLE1BQUksT0FBTyx5QkFBUSxFQUFFLE9BQU8sS0FBSyxPQUFPLEdBQUc7QUFDekMsV0FBTyxFQUFFLE9BQU8sS0FBSztBQUFBLEVBQ3ZCO0FBRUEsTUFBSSxFQUFFLE9BQU8sS0FBSyxNQUFNLEdBQUc7QUFDekIsV0FBTyxFQUFFLE9BQU8sS0FBSyxtQkFBbUIsS0FBSyxPQUFPO0FBQUEsRUFDdEQ7QUFFQSxTQUFPLEVBQUUsT0FBTyxJQUFJO0FBQ3RCO0FBeEJnQixBQTBCVCw0QkFDTCxNQUNBLGNBQ1E7QUFDUixNQUFJO0FBQ0osTUFBSSxRQUFRLFlBQVksR0FBRztBQUN6QixzQkFBa0IsS0FBSyw4QkFBOEI7QUFBQSxFQUN2RCxXQUFXLFlBQVksWUFBWSxHQUFHO0FBQ3BDLHNCQUFrQixLQUFLLGtDQUFrQztBQUFBLEVBQzNELE9BQU87QUFDTCxzQkFBa0I7QUFBQSxFQUNwQjtBQUNBLFFBQU0sZUFBZSxxQkFBcUIsaUJBQWlCLEtBQUs7QUFFaEUsU0FBTywyQkFBTyxZQUFZLEVBQUUsT0FBTyxZQUFZO0FBQ2pEO0FBZmdCLEFBaUJULG9CQUNMLE1BQ0EsY0FDQSxLQUNBLGdCQUNRO0FBQ1IsUUFBTSxZQUFZLGFBQWEsUUFBUTtBQUN2QyxRQUFNLE9BQU8sSUFBSSxRQUFRLElBQUk7QUFFN0IsTUFBSSxPQUFPLHlCQUFRO0FBQ2pCLFdBQU8sS0FBSyxTQUFTO0FBQUEsRUFDdkI7QUFFQSxNQUFJLE9BQU8sdUJBQU07QUFDZixXQUFPLEtBQUssY0FBYyxDQUFDLEtBQUssTUFBTSxPQUFPLHVCQUFNLEVBQUUsU0FBUyxDQUFDLENBQUM7QUFBQSxFQUNsRTtBQUVBLE1BQUksZ0JBQWdCO0FBQ2xCLFdBQU8sS0FBSyxZQUFZLENBQUMsS0FBSyxNQUFNLE9BQU8scUJBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztBQUFBLEVBQzlEO0FBRUEsU0FBTyxJQUFJLEtBQUssU0FBUyxFQUFFLG1CQUFtQixDQUFDLEdBQUc7QUFBQSxJQUNoRCxNQUFNO0FBQUEsSUFDTixRQUFRO0FBQUEsRUFDVixDQUFDO0FBQ0g7QUF6QmdCLEFBMkJULG9CQUNMLE1BQ0EsY0FDUTtBQUNSLE1BQUksUUFBUSxZQUFZLEdBQUc7QUFDekIsV0FBTyxLQUFLLE9BQU87QUFBQSxFQUNyQjtBQUVBLE1BQUksWUFBWSxZQUFZLEdBQUc7QUFDN0IsV0FBTyxLQUFLLFdBQVc7QUFBQSxFQUN6QjtBQUVBLFFBQU0sSUFBSSwyQkFBTyxZQUFZO0FBRTdCLFFBQU0sZ0JBQ0osS0FBSyxJQUFJLEVBQUUsS0FBSyxLQUFLLElBQUksQ0FBQyxDQUFDLElBQUksSUFBSSx5QkFDL0IsOENBQ0E7QUFDTixRQUFNLGtCQUFrQixLQUFLLGFBQWE7QUFDMUMsUUFBTSxlQUFlLHFCQUFxQixpQkFBaUIsSUFBSTtBQUUvRCxTQUFPLEVBQUUsT0FBTyxZQUFZO0FBQzlCO0FBdEJnQiIsCiAgIm5hbWVzIjogW10KfQo=
