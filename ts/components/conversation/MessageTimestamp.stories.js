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
var MessageTimestamp_stories_exports = {};
__export(MessageTimestamp_stories_exports, {
  Knobs: () => Knobs,
  Normal: () => Normal,
  default: () => MessageTimestamp_stories_default
});
module.exports = __toCommonJS(MessageTimestamp_stories_exports);
var React = __toESM(require("react"));
var import_addon_knobs = require("@storybook/addon-knobs");
var import_setupI18n = require("../../util/setupI18n");
var import_messages = __toESM(require("../../../_locales/en/messages.json"));
var import_MessageTimestamp = require("./MessageTimestamp");
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
var MessageTimestamp_stories_default = {
  title: "Components/Conversation/MessageTimestamp"
};
const { now } = Date;
const seconds = /* @__PURE__ */ __name((n) => n * 1e3, "seconds");
const minutes = /* @__PURE__ */ __name((n) => 60 * seconds(n), "minutes");
const hours = /* @__PURE__ */ __name((n) => 60 * minutes(n), "hours");
const days = /* @__PURE__ */ __name((n) => 24 * hours(n), "days");
const get1201 = /* @__PURE__ */ __name(() => {
  const d = new Date();
  d.setHours(0, 1, 0, 0);
  return d.getTime();
}, "get1201");
const times = /* @__PURE__ */ __name(() => [
  ["500ms ago", now() - seconds(0.5)],
  ["30s ago", now() - seconds(30)],
  ["1m ago", now() - minutes(1)],
  ["30m ago", now() - minutes(30)],
  ["45m ago", now() - minutes(45)],
  ["1h ago", now() - hours(1)],
  ["12:01am today", get1201()],
  ["24h ago", now() - hours(24)],
  ["7d ago", now() - days(7)],
  ["366d ago", now() - days(366)]
], "times");
const createProps = /* @__PURE__ */ __name((overrideProps = {}) => ({
  i18n,
  timestamp: overrideProps.timestamp || Date.now(),
  module: (0, import_addon_knobs.text)("module", ""),
  withImageNoCaption: (0, import_addon_knobs.boolean)("withImageNoCaption", false),
  withSticker: (0, import_addon_knobs.boolean)("withSticker", false),
  withTapToViewExpired: (0, import_addon_knobs.boolean)("withTapToViewExpired", false),
  direction: (0, import_addon_knobs.select)("direction", { none: "", incoming: "incoming", outgoing: "outgoing" }, "") || void 0
}), "createProps");
const createTable = /* @__PURE__ */ __name((overrideProps = {}) => /* @__PURE__ */ React.createElement("table", {
  cellPadding: 5
}, /* @__PURE__ */ React.createElement("tbody", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, "Description"), /* @__PURE__ */ React.createElement("th", null, "Timestamp")), times().map(([description, timestamp]) => /* @__PURE__ */ React.createElement("tr", {
  key: timestamp
}, /* @__PURE__ */ React.createElement("td", null, description), /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement(import_MessageTimestamp.MessageTimestamp, {
  key: timestamp,
  ...createProps({ ...overrideProps, timestamp })
})))))), "createTable");
const Normal = /* @__PURE__ */ __name(() => {
  return createTable();
}, "Normal");
const Knobs = /* @__PURE__ */ __name(() => {
  const props = createProps({
    timestamp: (0, import_addon_knobs.date)("timestamp", new Date())
  });
  return /* @__PURE__ */ React.createElement(import_MessageTimestamp.MessageTimestamp, {
    ...props
  });
}, "Knobs");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Knobs,
  Normal
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiTWVzc2FnZVRpbWVzdGFtcC5zdG9yaWVzLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjAtMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGJvb2xlYW4sIGRhdGUsIHNlbGVjdCwgdGV4dCB9IGZyb20gJ0BzdG9yeWJvb2svYWRkb24ta25vYnMnO1xuXG5pbXBvcnQgeyBzZXR1cEkxOG4gfSBmcm9tICcuLi8uLi91dGlsL3NldHVwSTE4bic7XG5pbXBvcnQgZW5NZXNzYWdlcyBmcm9tICcuLi8uLi8uLi9fbG9jYWxlcy9lbi9tZXNzYWdlcy5qc29uJztcbmltcG9ydCB0eXBlIHsgUHJvcHMgfSBmcm9tICcuL01lc3NhZ2VUaW1lc3RhbXAnO1xuaW1wb3J0IHsgTWVzc2FnZVRpbWVzdGFtcCB9IGZyb20gJy4vTWVzc2FnZVRpbWVzdGFtcCc7XG5cbmNvbnN0IGkxOG4gPSBzZXR1cEkxOG4oJ2VuJywgZW5NZXNzYWdlcyk7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgdGl0bGU6ICdDb21wb25lbnRzL0NvbnZlcnNhdGlvbi9NZXNzYWdlVGltZXN0YW1wJyxcbn07XG5cbmNvbnN0IHsgbm93IH0gPSBEYXRlO1xuY29uc3Qgc2Vjb25kcyA9IChuOiBudW1iZXIpID0+IG4gKiAxMDAwO1xuY29uc3QgbWludXRlcyA9IChuOiBudW1iZXIpID0+IDYwICogc2Vjb25kcyhuKTtcbmNvbnN0IGhvdXJzID0gKG46IG51bWJlcikgPT4gNjAgKiBtaW51dGVzKG4pO1xuY29uc3QgZGF5cyA9IChuOiBudW1iZXIpID0+IDI0ICogaG91cnMobik7XG5cbmNvbnN0IGdldDEyMDEgPSAoKSA9PiB7XG4gIGNvbnN0IGQgPSBuZXcgRGF0ZSgpO1xuICBkLnNldEhvdXJzKDAsIDEsIDAsIDApO1xuICByZXR1cm4gZC5nZXRUaW1lKCk7XG59O1xuXG5jb25zdCB0aW1lcyA9ICgpOiBBcnJheTxbc3RyaW5nLCBudW1iZXJdPiA9PiBbXG4gIFsnNTAwbXMgYWdvJywgbm93KCkgLSBzZWNvbmRzKDAuNSldLFxuICBbJzMwcyBhZ28nLCBub3coKSAtIHNlY29uZHMoMzApXSxcbiAgWycxbSBhZ28nLCBub3coKSAtIG1pbnV0ZXMoMSldLFxuICBbJzMwbSBhZ28nLCBub3coKSAtIG1pbnV0ZXMoMzApXSxcbiAgWyc0NW0gYWdvJywgbm93KCkgLSBtaW51dGVzKDQ1KV0sXG4gIFsnMWggYWdvJywgbm93KCkgLSBob3VycygxKV0sXG4gIFsnMTI6MDFhbSB0b2RheScsIGdldDEyMDEoKV0sXG4gIFsnMjRoIGFnbycsIG5vdygpIC0gaG91cnMoMjQpXSxcbiAgWyc3ZCBhZ28nLCBub3coKSAtIGRheXMoNyldLFxuICBbJzM2NmQgYWdvJywgbm93KCkgLSBkYXlzKDM2NildLFxuXTtcblxuY29uc3QgY3JlYXRlUHJvcHMgPSAob3ZlcnJpZGVQcm9wczogUGFydGlhbDxQcm9wcz4gPSB7fSk6IFByb3BzID0+ICh7XG4gIGkxOG4sXG4gIHRpbWVzdGFtcDogb3ZlcnJpZGVQcm9wcy50aW1lc3RhbXAgfHwgRGF0ZS5ub3coKSxcbiAgbW9kdWxlOiB0ZXh0KCdtb2R1bGUnLCAnJyksXG4gIHdpdGhJbWFnZU5vQ2FwdGlvbjogYm9vbGVhbignd2l0aEltYWdlTm9DYXB0aW9uJywgZmFsc2UpLFxuICB3aXRoU3RpY2tlcjogYm9vbGVhbignd2l0aFN0aWNrZXInLCBmYWxzZSksXG4gIHdpdGhUYXBUb1ZpZXdFeHBpcmVkOiBib29sZWFuKCd3aXRoVGFwVG9WaWV3RXhwaXJlZCcsIGZhbHNlKSxcbiAgZGlyZWN0aW9uOlxuICAgIHNlbGVjdChcbiAgICAgICdkaXJlY3Rpb24nLFxuICAgICAgeyBub25lOiAnJywgaW5jb21pbmc6ICdpbmNvbWluZycsIG91dGdvaW5nOiAnb3V0Z29pbmcnIH0sXG4gICAgICAnJ1xuICAgICkgfHwgdW5kZWZpbmVkLFxufSk7XG5cbmNvbnN0IGNyZWF0ZVRhYmxlID0gKG92ZXJyaWRlUHJvcHM6IFBhcnRpYWw8UHJvcHM+ID0ge30pID0+IChcbiAgPHRhYmxlIGNlbGxQYWRkaW5nPXs1fT5cbiAgICA8dGJvZHk+XG4gICAgICA8dHI+XG4gICAgICAgIDx0aD5EZXNjcmlwdGlvbjwvdGg+XG4gICAgICAgIDx0aD5UaW1lc3RhbXA8L3RoPlxuICAgICAgPC90cj5cbiAgICAgIHt0aW1lcygpLm1hcCgoW2Rlc2NyaXB0aW9uLCB0aW1lc3RhbXBdKSA9PiAoXG4gICAgICAgIDx0ciBrZXk9e3RpbWVzdGFtcH0+XG4gICAgICAgICAgPHRkPntkZXNjcmlwdGlvbn08L3RkPlxuICAgICAgICAgIDx0ZD5cbiAgICAgICAgICAgIDxNZXNzYWdlVGltZXN0YW1wXG4gICAgICAgICAgICAgIGtleT17dGltZXN0YW1wfVxuICAgICAgICAgICAgICB7Li4uY3JlYXRlUHJvcHMoeyAuLi5vdmVycmlkZVByb3BzLCB0aW1lc3RhbXAgfSl9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvdGQ+XG4gICAgICAgIDwvdHI+XG4gICAgICApKX1cbiAgICA8L3Rib2R5PlxuICA8L3RhYmxlPlxuKTtcblxuZXhwb3J0IGNvbnN0IE5vcm1hbCA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIHJldHVybiBjcmVhdGVUYWJsZSgpO1xufTtcblxuZXhwb3J0IGNvbnN0IEtub2JzID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgcHJvcHMgPSBjcmVhdGVQcm9wcyh7XG4gICAgdGltZXN0YW1wOiBkYXRlKCd0aW1lc3RhbXAnLCBuZXcgRGF0ZSgpKSxcbiAgfSk7XG5cbiAgcmV0dXJuIDxNZXNzYWdlVGltZXN0YW1wIHsuLi5wcm9wc30gLz47XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxZQUF1QjtBQUN2Qix5QkFBNEM7QUFFNUMsdUJBQTBCO0FBQzFCLHNCQUF1QjtBQUV2Qiw4QkFBaUM7QUFFakMsTUFBTSxPQUFPLGdDQUFVLE1BQU0sdUJBQVU7QUFFdkMsSUFBTyxtQ0FBUTtBQUFBLEVBQ2IsT0FBTztBQUNUO0FBRUEsTUFBTSxFQUFFLFFBQVE7QUFDaEIsTUFBTSxVQUFVLHdCQUFDLE1BQWMsSUFBSSxLQUFuQjtBQUNoQixNQUFNLFVBQVUsd0JBQUMsTUFBYyxLQUFLLFFBQVEsQ0FBQyxHQUE3QjtBQUNoQixNQUFNLFFBQVEsd0JBQUMsTUFBYyxLQUFLLFFBQVEsQ0FBQyxHQUE3QjtBQUNkLE1BQU0sT0FBTyx3QkFBQyxNQUFjLEtBQUssTUFBTSxDQUFDLEdBQTNCO0FBRWIsTUFBTSxVQUFVLDZCQUFNO0FBQ3BCLFFBQU0sSUFBSSxJQUFJLEtBQUs7QUFDbkIsSUFBRSxTQUFTLEdBQUcsR0FBRyxHQUFHLENBQUM7QUFDckIsU0FBTyxFQUFFLFFBQVE7QUFDbkIsR0FKZ0I7QUFNaEIsTUFBTSxRQUFRLDZCQUErQjtBQUFBLEVBQzNDLENBQUMsYUFBYSxJQUFJLElBQUksUUFBUSxHQUFHLENBQUM7QUFBQSxFQUNsQyxDQUFDLFdBQVcsSUFBSSxJQUFJLFFBQVEsRUFBRSxDQUFDO0FBQUEsRUFDL0IsQ0FBQyxVQUFVLElBQUksSUFBSSxRQUFRLENBQUMsQ0FBQztBQUFBLEVBQzdCLENBQUMsV0FBVyxJQUFJLElBQUksUUFBUSxFQUFFLENBQUM7QUFBQSxFQUMvQixDQUFDLFdBQVcsSUFBSSxJQUFJLFFBQVEsRUFBRSxDQUFDO0FBQUEsRUFDL0IsQ0FBQyxVQUFVLElBQUksSUFBSSxNQUFNLENBQUMsQ0FBQztBQUFBLEVBQzNCLENBQUMsaUJBQWlCLFFBQVEsQ0FBQztBQUFBLEVBQzNCLENBQUMsV0FBVyxJQUFJLElBQUksTUFBTSxFQUFFLENBQUM7QUFBQSxFQUM3QixDQUFDLFVBQVUsSUFBSSxJQUFJLEtBQUssQ0FBQyxDQUFDO0FBQUEsRUFDMUIsQ0FBQyxZQUFZLElBQUksSUFBSSxLQUFLLEdBQUcsQ0FBQztBQUNoQyxHQVhjO0FBYWQsTUFBTSxjQUFjLHdCQUFDLGdCQUFnQyxDQUFDLE1BQWM7QUFBQSxFQUNsRTtBQUFBLEVBQ0EsV0FBVyxjQUFjLGFBQWEsS0FBSyxJQUFJO0FBQUEsRUFDL0MsUUFBUSw2QkFBSyxVQUFVLEVBQUU7QUFBQSxFQUN6QixvQkFBb0IsZ0NBQVEsc0JBQXNCLEtBQUs7QUFBQSxFQUN2RCxhQUFhLGdDQUFRLGVBQWUsS0FBSztBQUFBLEVBQ3pDLHNCQUFzQixnQ0FBUSx3QkFBd0IsS0FBSztBQUFBLEVBQzNELFdBQ0UsK0JBQ0UsYUFDQSxFQUFFLE1BQU0sSUFBSSxVQUFVLFlBQVksVUFBVSxXQUFXLEdBQ3ZELEVBQ0YsS0FBSztBQUNULElBYm9CO0FBZXBCLE1BQU0sY0FBYyx3QkFBQyxnQkFBZ0MsQ0FBQyxNQUNwRCxvQ0FBQztBQUFBLEVBQU0sYUFBYTtBQUFBLEdBQ2xCLG9DQUFDLGVBQ0Msb0NBQUMsWUFDQyxvQ0FBQyxZQUFHLGFBQVcsR0FDZixvQ0FBQyxZQUFHLFdBQVMsQ0FDZixHQUNDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQyxhQUFhLGVBQzFCLG9DQUFDO0FBQUEsRUFBRyxLQUFLO0FBQUEsR0FDUCxvQ0FBQyxZQUFJLFdBQVksR0FDakIsb0NBQUMsWUFDQyxvQ0FBQztBQUFBLEVBQ0MsS0FBSztBQUFBLEtBQ0QsWUFBWSxLQUFLLGVBQWUsVUFBVSxDQUFDO0FBQUEsQ0FDakQsQ0FDRixDQUNGLENBQ0QsQ0FDSCxDQUNGLEdBbkJrQjtBQXNCYixNQUFNLFNBQVMsNkJBQW1CO0FBQ3ZDLFNBQU8sWUFBWTtBQUNyQixHQUZzQjtBQUlmLE1BQU0sUUFBUSw2QkFBbUI7QUFDdEMsUUFBTSxRQUFRLFlBQVk7QUFBQSxJQUN4QixXQUFXLDZCQUFLLGFBQWEsSUFBSSxLQUFLLENBQUM7QUFBQSxFQUN6QyxDQUFDO0FBRUQsU0FBTyxvQ0FBQztBQUFBLE9BQXFCO0FBQUEsR0FBTztBQUN0QyxHQU5xQjsiLAogICJuYW1lcyI6IFtdCn0K
