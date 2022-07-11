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
var DialogExpiredBuild_stories_exports = {};
__export(DialogExpiredBuild_stories_exports, {
  _DialogExpiredBuild: () => _DialogExpiredBuild,
  default: () => DialogExpiredBuild_stories_default
});
module.exports = __toCommonJS(DialogExpiredBuild_stories_exports);
var React = __toESM(require("react"));
var import_addon_knobs = require("@storybook/addon-knobs");
var import_DialogExpiredBuild = require("./DialogExpiredBuild");
var import_setupI18n = require("../util/setupI18n");
var import_messages = __toESM(require("../../_locales/en/messages.json"));
var import_util = require("./_util");
var import_FakeLeftPaneContainer = require("../test-both/helpers/FakeLeftPaneContainer");
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
var DialogExpiredBuild_stories_default = {
  title: "Components/DialogExpiredBuild"
};
const _DialogExpiredBuild = /* @__PURE__ */ __name(() => {
  const containerWidthBreakpoint = (0, import_addon_knobs.select)("containerWidthBreakpoint", import_util.WidthBreakpoint, import_util.WidthBreakpoint.Wide);
  const hasExpired = (0, import_addon_knobs.boolean)("hasExpired", true);
  return /* @__PURE__ */ React.createElement(import_FakeLeftPaneContainer.FakeLeftPaneContainer, {
    containerWidthBreakpoint
  }, /* @__PURE__ */ React.createElement(import_DialogExpiredBuild.DialogExpiredBuild, {
    containerWidthBreakpoint,
    hasExpired,
    i18n
  }));
}, "_DialogExpiredBuild");
_DialogExpiredBuild.story = {
  name: "DialogExpiredBuild"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  _DialogExpiredBuild
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiRGlhbG9nRXhwaXJlZEJ1aWxkLnN0b3JpZXMudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMC0yMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgYm9vbGVhbiwgc2VsZWN0IH0gZnJvbSAnQHN0b3J5Ym9vay9hZGRvbi1rbm9icyc7XG5cbmltcG9ydCB7IERpYWxvZ0V4cGlyZWRCdWlsZCB9IGZyb20gJy4vRGlhbG9nRXhwaXJlZEJ1aWxkJztcbmltcG9ydCB7IHNldHVwSTE4biB9IGZyb20gJy4uL3V0aWwvc2V0dXBJMThuJztcbmltcG9ydCBlbk1lc3NhZ2VzIGZyb20gJy4uLy4uL19sb2NhbGVzL2VuL21lc3NhZ2VzLmpzb24nO1xuaW1wb3J0IHsgV2lkdGhCcmVha3BvaW50IH0gZnJvbSAnLi9fdXRpbCc7XG5pbXBvcnQgeyBGYWtlTGVmdFBhbmVDb250YWluZXIgfSBmcm9tICcuLi90ZXN0LWJvdGgvaGVscGVycy9GYWtlTGVmdFBhbmVDb250YWluZXInO1xuXG5jb25zdCBpMThuID0gc2V0dXBJMThuKCdlbicsIGVuTWVzc2FnZXMpO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHRpdGxlOiAnQ29tcG9uZW50cy9EaWFsb2dFeHBpcmVkQnVpbGQnLFxufTtcblxuZXhwb3J0IGNvbnN0IF9EaWFsb2dFeHBpcmVkQnVpbGQgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBjb250YWluZXJXaWR0aEJyZWFrcG9pbnQgPSBzZWxlY3QoXG4gICAgJ2NvbnRhaW5lcldpZHRoQnJlYWtwb2ludCcsXG4gICAgV2lkdGhCcmVha3BvaW50LFxuICAgIFdpZHRoQnJlYWtwb2ludC5XaWRlXG4gICk7XG4gIGNvbnN0IGhhc0V4cGlyZWQgPSBib29sZWFuKCdoYXNFeHBpcmVkJywgdHJ1ZSk7XG5cbiAgcmV0dXJuIChcbiAgICA8RmFrZUxlZnRQYW5lQ29udGFpbmVyIGNvbnRhaW5lcldpZHRoQnJlYWtwb2ludD17Y29udGFpbmVyV2lkdGhCcmVha3BvaW50fT5cbiAgICAgIDxEaWFsb2dFeHBpcmVkQnVpbGRcbiAgICAgICAgY29udGFpbmVyV2lkdGhCcmVha3BvaW50PXtjb250YWluZXJXaWR0aEJyZWFrcG9pbnR9XG4gICAgICAgIGhhc0V4cGlyZWQ9e2hhc0V4cGlyZWR9XG4gICAgICAgIGkxOG49e2kxOG59XG4gICAgICAvPlxuICAgIDwvRmFrZUxlZnRQYW5lQ29udGFpbmVyPlxuICApO1xufTtcblxuX0RpYWxvZ0V4cGlyZWRCdWlsZC5zdG9yeSA9IHtcbiAgbmFtZTogJ0RpYWxvZ0V4cGlyZWRCdWlsZCcsXG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsWUFBdUI7QUFDdkIseUJBQWdDO0FBRWhDLGdDQUFtQztBQUNuQyx1QkFBMEI7QUFDMUIsc0JBQXVCO0FBQ3ZCLGtCQUFnQztBQUNoQyxtQ0FBc0M7QUFFdEMsTUFBTSxPQUFPLGdDQUFVLE1BQU0sdUJBQVU7QUFFdkMsSUFBTyxxQ0FBUTtBQUFBLEVBQ2IsT0FBTztBQUNUO0FBRU8sTUFBTSxzQkFBc0IsNkJBQW1CO0FBQ3BELFFBQU0sMkJBQTJCLCtCQUMvQiw0QkFDQSw2QkFDQSw0QkFBZ0IsSUFDbEI7QUFDQSxRQUFNLGFBQWEsZ0NBQVEsY0FBYyxJQUFJO0FBRTdDLFNBQ0Usb0NBQUM7QUFBQSxJQUFzQjtBQUFBLEtBQ3JCLG9DQUFDO0FBQUEsSUFDQztBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsR0FDRixDQUNGO0FBRUosR0FqQm1DO0FBbUJuQyxvQkFBb0IsUUFBUTtBQUFBLEVBQzFCLE1BQU07QUFDUjsiLAogICJuYW1lcyI6IFtdCn0K
