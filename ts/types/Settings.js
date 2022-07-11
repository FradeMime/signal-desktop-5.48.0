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
var Settings_exports = {};
__export(Settings_exports, {
  AudioNotificationSupport: () => AudioNotificationSupport,
  getAudioNotificationSupport: () => getAudioNotificationSupport,
  isAudioNotificationSupported: () => isAudioNotificationSupported,
  isAutoDownloadUpdatesSupported: () => isAutoDownloadUpdatesSupported,
  isAutoLaunchSupported: () => isAutoLaunchSupported,
  isDrawAttentionSupported: () => isDrawAttentionSupported,
  isHideMenuBarSupported: () => isHideMenuBarSupported,
  isNotificationGroupingSupported: () => isNotificationGroupingSupported,
  isSystemTraySupported: () => isSystemTraySupported,
  shouldHideExpiringMessageBody: () => shouldHideExpiringMessageBody
});
module.exports = __toCommonJS(Settings_exports);
var import_semver = __toESM(require("semver"));
var import_os = __toESM(require("os"));
var OS = __toESM(require("../OS"));
var import_version = require("../util/version");
const MIN_WINDOWS_VERSION = "8.0.0";
var AudioNotificationSupport = /* @__PURE__ */ ((AudioNotificationSupport2) => {
  AudioNotificationSupport2[AudioNotificationSupport2["None"] = 0] = "None";
  AudioNotificationSupport2[AudioNotificationSupport2["Native"] = 1] = "Native";
  AudioNotificationSupport2[AudioNotificationSupport2["Custom"] = 2] = "Custom";
  return AudioNotificationSupport2;
})(AudioNotificationSupport || {});
function getAudioNotificationSupport() {
  if (OS.isWindows(MIN_WINDOWS_VERSION) || OS.isMacOS()) {
    return 1 /* Native */;
  }
  if (OS.isLinux()) {
    return 2 /* Custom */;
  }
  return 0 /* None */;
}
const isAudioNotificationSupported = /* @__PURE__ */ __name(() => getAudioNotificationSupport() !== 0 /* None */, "isAudioNotificationSupported");
const isNotificationGroupingSupported = /* @__PURE__ */ __name(() => !OS.isWindows() || OS.isWindows(MIN_WINDOWS_VERSION), "isNotificationGroupingSupported");
const isAutoLaunchSupported = /* @__PURE__ */ __name(() => OS.isWindows() || OS.isMacOS(), "isAutoLaunchSupported");
const isHideMenuBarSupported = /* @__PURE__ */ __name(() => !OS.isMacOS(), "isHideMenuBarSupported");
const isDrawAttentionSupported = /* @__PURE__ */ __name(() => !OS.isMacOS(), "isDrawAttentionSupported");
const isSystemTraySupported = /* @__PURE__ */ __name((appVersion) => OS.isWindows() || OS.isLinux() && !(0, import_version.isProduction)(appVersion), "isSystemTraySupported");
const isAutoDownloadUpdatesSupported = /* @__PURE__ */ __name(() => OS.isWindows() || OS.isMacOS(), "isAutoDownloadUpdatesSupported");
const shouldHideExpiringMessageBody = /* @__PURE__ */ __name(() => OS.isWindows() || OS.isMacOS() && import_semver.default.lt(import_os.default.release(), "21.1.0"), "shouldHideExpiringMessageBody");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AudioNotificationSupport,
  getAudioNotificationSupport,
  isAudioNotificationSupported,
  isAutoDownloadUpdatesSupported,
  isAutoLaunchSupported,
  isDrawAttentionSupported,
  isHideMenuBarSupported,
  isNotificationGroupingSupported,
  isSystemTraySupported,
  shouldHideExpiringMessageBody
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiU2V0dGluZ3MudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDE4LTIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgc2VtdmVyIGZyb20gJ3NlbXZlcic7XG5pbXBvcnQgb3MgZnJvbSAnb3MnO1xuXG5pbXBvcnQgKiBhcyBPUyBmcm9tICcuLi9PUyc7XG5pbXBvcnQgeyBpc1Byb2R1Y3Rpb24gfSBmcm9tICcuLi91dGlsL3ZlcnNpb24nO1xuXG5jb25zdCBNSU5fV0lORE9XU19WRVJTSU9OID0gJzguMC4wJztcblxuZXhwb3J0IGVudW0gQXVkaW9Ob3RpZmljYXRpb25TdXBwb3J0IHtcbiAgTm9uZSxcbiAgTmF0aXZlLFxuICBDdXN0b20sXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRBdWRpb05vdGlmaWNhdGlvblN1cHBvcnQoKTogQXVkaW9Ob3RpZmljYXRpb25TdXBwb3J0IHtcbiAgaWYgKE9TLmlzV2luZG93cyhNSU5fV0lORE9XU19WRVJTSU9OKSB8fCBPUy5pc01hY09TKCkpIHtcbiAgICByZXR1cm4gQXVkaW9Ob3RpZmljYXRpb25TdXBwb3J0Lk5hdGl2ZTtcbiAgfVxuICBpZiAoT1MuaXNMaW51eCgpKSB7XG4gICAgcmV0dXJuIEF1ZGlvTm90aWZpY2F0aW9uU3VwcG9ydC5DdXN0b207XG4gIH1cbiAgcmV0dXJuIEF1ZGlvTm90aWZpY2F0aW9uU3VwcG9ydC5Ob25lO1xufVxuXG5leHBvcnQgY29uc3QgaXNBdWRpb05vdGlmaWNhdGlvblN1cHBvcnRlZCA9ICgpOiBib29sZWFuID0+XG4gIGdldEF1ZGlvTm90aWZpY2F0aW9uU3VwcG9ydCgpICE9PSBBdWRpb05vdGlmaWNhdGlvblN1cHBvcnQuTm9uZTtcblxuLy8gVXNpbmcgYE5vdGlmaWNhdGlvbjo6dGFnYCBoYXMgYSBidWcgb24gV2luZG93cyA3OlxuLy8gaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cm9uL2VsZWN0cm9uL2lzc3Vlcy8xMTE4OVxuZXhwb3J0IGNvbnN0IGlzTm90aWZpY2F0aW9uR3JvdXBpbmdTdXBwb3J0ZWQgPSAoKTogYm9vbGVhbiA9PlxuICAhT1MuaXNXaW5kb3dzKCkgfHwgT1MuaXNXaW5kb3dzKE1JTl9XSU5ET1dTX1ZFUlNJT04pO1xuXG4vLyBMb2dpbiBpdGVtIHNldHRpbmdzIGFyZSBvbmx5IHN1cHBvcnRlZCBvbiBtYWNPUyBhbmQgV2luZG93cywgYWNjb3JkaW5nIHRvIFtFbGVjdHJvbidzXG4vLyAgIGRvY3NdWzBdLlxuLy8gWzBdOiBodHRwczovL3d3dy5lbGVjdHJvbmpzLm9yZy9kb2NzL2FwaS9hcHAjYXBwc2V0bG9naW5pdGVtc2V0dGluZ3NzZXR0aW5ncy1tYWNvcy13aW5kb3dzXG5leHBvcnQgY29uc3QgaXNBdXRvTGF1bmNoU3VwcG9ydGVkID0gKCk6IGJvb2xlYW4gPT5cbiAgT1MuaXNXaW5kb3dzKCkgfHwgT1MuaXNNYWNPUygpO1xuXG4vLyB0aGUgXCJoaWRlIG1lbnUgYmFyXCIgb3B0aW9uIGlzIHNwZWNpZmljIHRvIFdpbmRvd3MgYW5kIExpbnV4XG5leHBvcnQgY29uc3QgaXNIaWRlTWVudUJhclN1cHBvcnRlZCA9ICgpOiBib29sZWFuID0+ICFPUy5pc01hY09TKCk7XG5cbi8vIHRoZSBcImRyYXcgYXR0ZW50aW9uIG9uIG5vdGlmaWNhdGlvblwiIG9wdGlvbiBpcyBzcGVjaWZpYyB0byBXaW5kb3dzIGFuZCBMaW51eFxuZXhwb3J0IGNvbnN0IGlzRHJhd0F0dGVudGlvblN1cHBvcnRlZCA9ICgpOiBib29sZWFuID0+ICFPUy5pc01hY09TKCk7XG5cbi8qKlxuICogUmV0dXJucyBgdHJ1ZWAgaWYgeW91IGNhbiBtaW5pbWl6ZSB0aGUgYXBwIHRvIHRoZSBzeXN0ZW0gdHJheS4gVXNlcnMgY2FuIG92ZXJyaWRlIHRoaXNcbiAqIG9wdGlvbiB3aXRoIGEgY29tbWFuZCBsaW5lIGZsYWcsIGJ1dCB0aGF0IGlzIG5vdCBvZmZpY2lhbGx5IHN1cHBvcnRlZC5cbiAqL1xuZXhwb3J0IGNvbnN0IGlzU3lzdGVtVHJheVN1cHBvcnRlZCA9IChhcHBWZXJzaW9uOiBzdHJpbmcpOiBib29sZWFuID0+XG4gIC8vIFdlIGV2ZW50dWFsbHkgd2FudCB0byBzdXBwb3J0IExpbnV4IGluIHByb2R1Y3Rpb24uXG4gIE9TLmlzV2luZG93cygpIHx8IChPUy5pc0xpbnV4KCkgJiYgIWlzUHJvZHVjdGlvbihhcHBWZXJzaW9uKSk7XG5cbmV4cG9ydCBjb25zdCBpc0F1dG9Eb3dubG9hZFVwZGF0ZXNTdXBwb3J0ZWQgPSAoKTogYm9vbGVhbiA9PlxuICBPUy5pc1dpbmRvd3MoKSB8fCBPUy5pc01hY09TKCk7XG5cbmV4cG9ydCBjb25zdCBzaG91bGRIaWRlRXhwaXJpbmdNZXNzYWdlQm9keSA9ICgpOiBib29sZWFuID0+XG4gIE9TLmlzV2luZG93cygpIHx8IChPUy5pc01hY09TKCkgJiYgc2VtdmVyLmx0KG9zLnJlbGVhc2UoKSwgJzIxLjEuMCcpKTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxvQkFBbUI7QUFDbkIsZ0JBQWU7QUFFZixTQUFvQjtBQUNwQixxQkFBNkI7QUFFN0IsTUFBTSxzQkFBc0I7QUFFckIsSUFBSywyQkFBTCxrQkFBSyw4QkFBTDtBQUNMO0FBQ0E7QUFDQTtBQUhVO0FBQUE7QUFNTCx1Q0FBaUU7QUFDdEUsTUFBSSxHQUFHLFVBQVUsbUJBQW1CLEtBQUssR0FBRyxRQUFRLEdBQUc7QUFDckQsV0FBTztBQUFBLEVBQ1Q7QUFDQSxNQUFJLEdBQUcsUUFBUSxHQUFHO0FBQ2hCLFdBQU87QUFBQSxFQUNUO0FBQ0EsU0FBTztBQUNUO0FBUmdCLEFBVVQsTUFBTSwrQkFBK0IsNkJBQzFDLDRCQUE0QixNQUFNLGNBRFE7QUFLckMsTUFBTSxrQ0FBa0MsNkJBQzdDLENBQUMsR0FBRyxVQUFVLEtBQUssR0FBRyxVQUFVLG1CQUFtQixHQUROO0FBTXhDLE1BQU0sd0JBQXdCLDZCQUNuQyxHQUFHLFVBQVUsS0FBSyxHQUFHLFFBQVEsR0FETTtBQUk5QixNQUFNLHlCQUF5Qiw2QkFBZSxDQUFDLEdBQUcsUUFBUSxHQUEzQjtBQUcvQixNQUFNLDJCQUEyQiw2QkFBZSxDQUFDLEdBQUcsUUFBUSxHQUEzQjtBQU1qQyxNQUFNLHdCQUF3Qix3QkFBQyxlQUVwQyxHQUFHLFVBQVUsS0FBTSxHQUFHLFFBQVEsS0FBSyxDQUFDLGlDQUFhLFVBQVUsR0FGeEI7QUFJOUIsTUFBTSxpQ0FBaUMsNkJBQzVDLEdBQUcsVUFBVSxLQUFLLEdBQUcsUUFBUSxHQURlO0FBR3ZDLE1BQU0sZ0NBQWdDLDZCQUMzQyxHQUFHLFVBQVUsS0FBTSxHQUFHLFFBQVEsS0FBSyxzQkFBTyxHQUFHLGtCQUFHLFFBQVEsR0FBRyxRQUFRLEdBRHhCOyIsCiAgIm5hbWVzIjogW10KfQo=
