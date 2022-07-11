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
var MessageSticker_stories_exports = {};
__export(MessageSticker_stories_exports, {
  _MessageSticker: () => _MessageSticker,
  default: () => MessageSticker_stories_default
});
module.exports = __toCommonJS(MessageSticker_stories_exports);
var React = __toESM(require("react"));
var import_addon_knobs = require("@storybook/addon-knobs");
var import_StoryRow = require("./StoryRow");
var import_MessageSticker = require("./MessageSticker");
var MessageSticker_stories_default = {
  title: "Sticker Creator/elements"
};
const _MessageSticker = /* @__PURE__ */ __name(() => {
  const image = (0, import_addon_knobs.text)("image url", "/fixtures/512x515-thumbs-up-lincoln.webp");
  const minutesAgo = (0, import_addon_knobs.number)("minutesAgo", 3);
  return /* @__PURE__ */ React.createElement(import_StoryRow.StoryRow, null, /* @__PURE__ */ React.createElement(import_MessageSticker.MessageSticker, {
    image,
    minutesAgo
  }));
}, "_MessageSticker");
_MessageSticker.story = {
  name: "MessageSticker"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  _MessageSticker
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiTWVzc2FnZVN0aWNrZXIuc3Rvcmllcy50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDE5LTIwMjAgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBudW1iZXIsIHRleHQgfSBmcm9tICdAc3Rvcnlib29rL2FkZG9uLWtub2JzJztcblxuaW1wb3J0IHsgU3RvcnlSb3cgfSBmcm9tICcuL1N0b3J5Um93JztcbmltcG9ydCB7IE1lc3NhZ2VTdGlja2VyIH0gZnJvbSAnLi9NZXNzYWdlU3RpY2tlcic7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgdGl0bGU6ICdTdGlja2VyIENyZWF0b3IvZWxlbWVudHMnLFxufTtcblxuZXhwb3J0IGNvbnN0IF9NZXNzYWdlU3RpY2tlciA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IGltYWdlID0gdGV4dCgnaW1hZ2UgdXJsJywgJy9maXh0dXJlcy81MTJ4NTE1LXRodW1icy11cC1saW5jb2xuLndlYnAnKTtcbiAgY29uc3QgbWludXRlc0FnbyA9IG51bWJlcignbWludXRlc0FnbycsIDMpO1xuXG4gIHJldHVybiAoXG4gICAgPFN0b3J5Um93PlxuICAgICAgPE1lc3NhZ2VTdGlja2VyIGltYWdlPXtpbWFnZX0gbWludXRlc0Fnbz17bWludXRlc0Fnb30gLz5cbiAgICA8L1N0b3J5Um93PlxuICApO1xufTtcblxuX01lc3NhZ2VTdGlja2VyLnN0b3J5ID0ge1xuICBuYW1lOiAnTWVzc2FnZVN0aWNrZXInLFxufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLFlBQXVCO0FBQ3ZCLHlCQUE2QjtBQUU3QixzQkFBeUI7QUFDekIsNEJBQStCO0FBRS9CLElBQU8saUNBQVE7QUFBQSxFQUNiLE9BQU87QUFDVDtBQUVPLE1BQU0sa0JBQWtCLDZCQUFtQjtBQUNoRCxRQUFNLFFBQVEsNkJBQUssYUFBYSwwQ0FBMEM7QUFDMUUsUUFBTSxhQUFhLCtCQUFPLGNBQWMsQ0FBQztBQUV6QyxTQUNFLG9DQUFDLGdDQUNDLG9DQUFDO0FBQUEsSUFBZTtBQUFBLElBQWM7QUFBQSxHQUF3QixDQUN4RDtBQUVKLEdBVCtCO0FBVy9CLGdCQUFnQixRQUFRO0FBQUEsRUFDdEIsTUFBTTtBQUNSOyIsCiAgIm5hbWVzIjogW10KfQo=
