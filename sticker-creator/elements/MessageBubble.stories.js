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
var MessageBubble_stories_exports = {};
__export(MessageBubble_stories_exports, {
  _MessageBubble: () => _MessageBubble,
  default: () => MessageBubble_stories_default
});
module.exports = __toCommonJS(MessageBubble_stories_exports);
var React = __toESM(require("react"));
var import_addon_knobs = require("@storybook/addon-knobs");
var import_StoryRow = require("./StoryRow");
var import_MessageBubble = require("./MessageBubble");
var MessageBubble_stories_default = {
  title: "Sticker Creator/elements"
};
const _MessageBubble = /* @__PURE__ */ __name(() => {
  const child = (0, import_addon_knobs.text)("text", "Foo bar banana baz");
  const minutesAgo = (0, import_addon_knobs.number)("minutesAgo", 3);
  return /* @__PURE__ */ React.createElement(import_StoryRow.StoryRow, null, /* @__PURE__ */ React.createElement(import_MessageBubble.MessageBubble, {
    minutesAgo
  }, child));
}, "_MessageBubble");
_MessageBubble.story = {
  name: "MessageBubble"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  _MessageBubble
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiTWVzc2FnZUJ1YmJsZS5zdG9yaWVzLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMTktMjAyMCBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IG51bWJlciwgdGV4dCB9IGZyb20gJ0BzdG9yeWJvb2svYWRkb24ta25vYnMnO1xuXG5pbXBvcnQgeyBTdG9yeVJvdyB9IGZyb20gJy4vU3RvcnlSb3cnO1xuaW1wb3J0IHsgTWVzc2FnZUJ1YmJsZSB9IGZyb20gJy4vTWVzc2FnZUJ1YmJsZSc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgdGl0bGU6ICdTdGlja2VyIENyZWF0b3IvZWxlbWVudHMnLFxufTtcblxuZXhwb3J0IGNvbnN0IF9NZXNzYWdlQnViYmxlID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgY2hpbGQgPSB0ZXh0KCd0ZXh0JywgJ0ZvbyBiYXIgYmFuYW5hIGJheicpO1xuICBjb25zdCBtaW51dGVzQWdvID0gbnVtYmVyKCdtaW51dGVzQWdvJywgMyk7XG5cbiAgcmV0dXJuIChcbiAgICA8U3RvcnlSb3c+XG4gICAgICA8TWVzc2FnZUJ1YmJsZSBtaW51dGVzQWdvPXttaW51dGVzQWdvfT57Y2hpbGR9PC9NZXNzYWdlQnViYmxlPlxuICAgIDwvU3RvcnlSb3c+XG4gICk7XG59O1xuXG5fTWVzc2FnZUJ1YmJsZS5zdG9yeSA9IHtcbiAgbmFtZTogJ01lc3NhZ2VCdWJibGUnLFxufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLFlBQXVCO0FBQ3ZCLHlCQUE2QjtBQUU3QixzQkFBeUI7QUFDekIsMkJBQThCO0FBRTlCLElBQU8sZ0NBQVE7QUFBQSxFQUNiLE9BQU87QUFDVDtBQUVPLE1BQU0saUJBQWlCLDZCQUFtQjtBQUMvQyxRQUFNLFFBQVEsNkJBQUssUUFBUSxvQkFBb0I7QUFDL0MsUUFBTSxhQUFhLCtCQUFPLGNBQWMsQ0FBQztBQUV6QyxTQUNFLG9DQUFDLGdDQUNDLG9DQUFDO0FBQUEsSUFBYztBQUFBLEtBQXlCLEtBQU0sQ0FDaEQ7QUFFSixHQVQ4QjtBQVc5QixlQUFlLFFBQVE7QUFBQSxFQUNyQixNQUFNO0FBQ1I7IiwKICAibmFtZXMiOiBbXQp9Cg==
