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
var UniversalTimerNotification_stories_exports = {};
__export(UniversalTimerNotification_stories_exports, {
  Days: () => Days,
  Hours: () => Hours,
  Minutes: () => Minutes,
  Seconds: () => Seconds,
  Weeks: () => Weeks,
  default: () => UniversalTimerNotification_stories_default
});
module.exports = __toCommonJS(UniversalTimerNotification_stories_exports);
var import_react = __toESM(require("react"));
var import_UniversalTimerNotification = require("./UniversalTimerNotification");
var import_setupI18n = require("../../util/setupI18n");
var import_messages = __toESM(require("../../../_locales/en/messages.json"));
var import_expireTimers = require("../../test-both/util/expireTimers");
var UniversalTimerNotification_stories_default = {
  title: "Components/UniversalTimerNotification"
};
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
const Seconds = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_UniversalTimerNotification.UniversalTimerNotification, {
  i18n,
  expireTimer: import_expireTimers.EXPIRE_TIMERS[0].value / 1e3
}), "Seconds");
const Minutes = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_UniversalTimerNotification.UniversalTimerNotification, {
  i18n,
  expireTimer: import_expireTimers.EXPIRE_TIMERS[1].value / 1e3
}), "Minutes");
const Hours = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_UniversalTimerNotification.UniversalTimerNotification, {
  i18n,
  expireTimer: import_expireTimers.EXPIRE_TIMERS[2].value / 1e3
}), "Hours");
const Days = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_UniversalTimerNotification.UniversalTimerNotification, {
  i18n,
  expireTimer: import_expireTimers.EXPIRE_TIMERS[3].value / 1e3
}), "Days");
const Weeks = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_UniversalTimerNotification.UniversalTimerNotification, {
  i18n,
  expireTimer: import_expireTimers.EXPIRE_TIMERS[4].value / 1e3
}), "Weeks");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Days,
  Hours,
  Minutes,
  Seconds,
  Weeks
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiVW5pdmVyc2FsVGltZXJOb3RpZmljYXRpb24uc3Rvcmllcy50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgVW5pdmVyc2FsVGltZXJOb3RpZmljYXRpb24gfSBmcm9tICcuL1VuaXZlcnNhbFRpbWVyTm90aWZpY2F0aW9uJztcbmltcG9ydCB7IHNldHVwSTE4biB9IGZyb20gJy4uLy4uL3V0aWwvc2V0dXBJMThuJztcbmltcG9ydCBlbk1lc3NhZ2VzIGZyb20gJy4uLy4uLy4uL19sb2NhbGVzL2VuL21lc3NhZ2VzLmpzb24nO1xuXG5pbXBvcnQgeyBFWFBJUkVfVElNRVJTIH0gZnJvbSAnLi4vLi4vdGVzdC1ib3RoL3V0aWwvZXhwaXJlVGltZXJzJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICB0aXRsZTogJ0NvbXBvbmVudHMvVW5pdmVyc2FsVGltZXJOb3RpZmljYXRpb24nLFxufTtcblxuY29uc3QgaTE4biA9IHNldHVwSTE4bignZW4nLCBlbk1lc3NhZ2VzKTtcblxuZXhwb3J0IGNvbnN0IFNlY29uZHMgPSAoKTogSlNYLkVsZW1lbnQgPT4gKFxuICA8VW5pdmVyc2FsVGltZXJOb3RpZmljYXRpb25cbiAgICBpMThuPXtpMThufVxuICAgIGV4cGlyZVRpbWVyPXtFWFBJUkVfVElNRVJTWzBdLnZhbHVlIC8gMTAwMH1cbiAgLz5cbik7XG5cbmV4cG9ydCBjb25zdCBNaW51dGVzID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPFVuaXZlcnNhbFRpbWVyTm90aWZpY2F0aW9uXG4gICAgaTE4bj17aTE4bn1cbiAgICBleHBpcmVUaW1lcj17RVhQSVJFX1RJTUVSU1sxXS52YWx1ZSAvIDEwMDB9XG4gIC8+XG4pO1xuXG5leHBvcnQgY29uc3QgSG91cnMgPSAoKTogSlNYLkVsZW1lbnQgPT4gKFxuICA8VW5pdmVyc2FsVGltZXJOb3RpZmljYXRpb25cbiAgICBpMThuPXtpMThufVxuICAgIGV4cGlyZVRpbWVyPXtFWFBJUkVfVElNRVJTWzJdLnZhbHVlIC8gMTAwMH1cbiAgLz5cbik7XG5cbmV4cG9ydCBjb25zdCBEYXlzID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPFVuaXZlcnNhbFRpbWVyTm90aWZpY2F0aW9uXG4gICAgaTE4bj17aTE4bn1cbiAgICBleHBpcmVUaW1lcj17RVhQSVJFX1RJTUVSU1szXS52YWx1ZSAvIDEwMDB9XG4gIC8+XG4pO1xuXG5leHBvcnQgY29uc3QgV2Vla3MgPSAoKTogSlNYLkVsZW1lbnQgPT4gKFxuICA8VW5pdmVyc2FsVGltZXJOb3RpZmljYXRpb25cbiAgICBpMThuPXtpMThufVxuICAgIGV4cGlyZVRpbWVyPXtFWFBJUkVfVElNRVJTWzRdLnZhbHVlIC8gMTAwMH1cbiAgLz5cbik7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLG1CQUFrQjtBQUVsQix3Q0FBMkM7QUFDM0MsdUJBQTBCO0FBQzFCLHNCQUF1QjtBQUV2QiwwQkFBOEI7QUFFOUIsSUFBTyw2Q0FBUTtBQUFBLEVBQ2IsT0FBTztBQUNUO0FBRUEsTUFBTSxPQUFPLGdDQUFVLE1BQU0sdUJBQVU7QUFFaEMsTUFBTSxVQUFVLDZCQUNyQixtREFBQztBQUFBLEVBQ0M7QUFBQSxFQUNBLGFBQWEsa0NBQWMsR0FBRyxRQUFRO0FBQUEsQ0FDeEMsR0FKcUI7QUFPaEIsTUFBTSxVQUFVLDZCQUNyQixtREFBQztBQUFBLEVBQ0M7QUFBQSxFQUNBLGFBQWEsa0NBQWMsR0FBRyxRQUFRO0FBQUEsQ0FDeEMsR0FKcUI7QUFPaEIsTUFBTSxRQUFRLDZCQUNuQixtREFBQztBQUFBLEVBQ0M7QUFBQSxFQUNBLGFBQWEsa0NBQWMsR0FBRyxRQUFRO0FBQUEsQ0FDeEMsR0FKbUI7QUFPZCxNQUFNLE9BQU8sNkJBQ2xCLG1EQUFDO0FBQUEsRUFDQztBQUFBLEVBQ0EsYUFBYSxrQ0FBYyxHQUFHLFFBQVE7QUFBQSxDQUN4QyxHQUprQjtBQU9iLE1BQU0sUUFBUSw2QkFDbkIsbURBQUM7QUFBQSxFQUNDO0FBQUEsRUFDQSxhQUFhLGtDQUFjLEdBQUcsUUFBUTtBQUFBLENBQ3hDLEdBSm1COyIsCiAgIm5hbWVzIjogW10KfQo=
