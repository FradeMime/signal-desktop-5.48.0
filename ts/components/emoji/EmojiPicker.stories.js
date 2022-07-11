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
var EmojiPicker_stories_exports = {};
__export(EmojiPicker_stories_exports, {
  Base: () => Base,
  NoRecents: () => NoRecents,
  WithSettingsButton: () => WithSettingsButton,
  default: () => EmojiPicker_stories_default
});
module.exports = __toCommonJS(EmojiPicker_stories_exports);
var React = __toESM(require("react"));
var import_addon_actions = require("@storybook/addon-actions");
var import_setupI18n = require("../../util/setupI18n");
var import_messages = __toESM(require("../../../_locales/en/messages.json"));
var import_EmojiPicker = require("./EmojiPicker");
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
var EmojiPicker_stories_default = {
  title: "Components/Emoji/EmojiPicker"
};
const Base = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ React.createElement(import_EmojiPicker.EmojiPicker, {
    i18n,
    onPickEmoji: (0, import_addon_actions.action)("onPickEmoji"),
    onSetSkinTone: (0, import_addon_actions.action)("onSetSkinTone"),
    onClose: (0, import_addon_actions.action)("onClose"),
    skinTone: 0,
    recentEmojis: [
      "grinning",
      "grin",
      "joy",
      "rolling_on_the_floor_laughing",
      "smiley",
      "smile",
      "sweat_smile",
      "laughing",
      "wink",
      "blush",
      "yum",
      "sunglasses",
      "heart_eyes",
      "kissing_heart",
      "kissing",
      "kissing_smiling_eyes",
      "kissing_closed_eyes",
      "relaxed",
      "slightly_smiling_face",
      "hugging_face",
      "grinning_face_with_star_eyes",
      "thinking_face",
      "face_with_one_eyebrow_raised",
      "neutral_face",
      "expressionless",
      "no_mouth",
      "face_with_rolling_eyes",
      "smirk",
      "persevere",
      "disappointed_relieved",
      "open_mouth",
      "zipper_mouth_face"
    ]
  });
}, "Base");
const NoRecents = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ React.createElement(import_EmojiPicker.EmojiPicker, {
    i18n,
    onPickEmoji: (0, import_addon_actions.action)("onPickEmoji"),
    onSetSkinTone: (0, import_addon_actions.action)("onSetSkinTone"),
    onClose: (0, import_addon_actions.action)("onClose"),
    skinTone: 0,
    recentEmojis: []
  });
}, "NoRecents");
const WithSettingsButton = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ React.createElement(import_EmojiPicker.EmojiPicker, {
    i18n,
    onPickEmoji: (0, import_addon_actions.action)("onPickEmoji"),
    onSetSkinTone: (0, import_addon_actions.action)("onSetSkinTone"),
    onClickSettings: (0, import_addon_actions.action)("onClickSettings"),
    onClose: (0, import_addon_actions.action)("onClose"),
    skinTone: 0,
    recentEmojis: []
  });
}, "WithSettingsButton");
WithSettingsButton.story = {
  name: "With settings button"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Base,
  NoRecents,
  WithSettingsButton
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiRW1vamlQaWNrZXIuc3Rvcmllcy50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIwLTIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IGFjdGlvbiB9IGZyb20gJ0BzdG9yeWJvb2svYWRkb24tYWN0aW9ucyc7XG5cbmltcG9ydCB7IHNldHVwSTE4biB9IGZyb20gJy4uLy4uL3V0aWwvc2V0dXBJMThuJztcbmltcG9ydCBlbk1lc3NhZ2VzIGZyb20gJy4uLy4uLy4uL19sb2NhbGVzL2VuL21lc3NhZ2VzLmpzb24nO1xuXG5pbXBvcnQgeyBFbW9qaVBpY2tlciB9IGZyb20gJy4vRW1vamlQaWNrZXInO1xuXG5jb25zdCBpMThuID0gc2V0dXBJMThuKCdlbicsIGVuTWVzc2FnZXMpO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHRpdGxlOiAnQ29tcG9uZW50cy9FbW9qaS9FbW9qaVBpY2tlcicsXG59O1xuXG5leHBvcnQgY29uc3QgQmFzZSA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIHJldHVybiAoXG4gICAgPEVtb2ppUGlja2VyXG4gICAgICBpMThuPXtpMThufVxuICAgICAgb25QaWNrRW1vamk9e2FjdGlvbignb25QaWNrRW1vamknKX1cbiAgICAgIG9uU2V0U2tpblRvbmU9e2FjdGlvbignb25TZXRTa2luVG9uZScpfVxuICAgICAgb25DbG9zZT17YWN0aW9uKCdvbkNsb3NlJyl9XG4gICAgICBza2luVG9uZT17MH1cbiAgICAgIHJlY2VudEVtb2ppcz17W1xuICAgICAgICAnZ3Jpbm5pbmcnLFxuICAgICAgICAnZ3JpbicsXG4gICAgICAgICdqb3knLFxuICAgICAgICAncm9sbGluZ19vbl90aGVfZmxvb3JfbGF1Z2hpbmcnLFxuICAgICAgICAnc21pbGV5JyxcbiAgICAgICAgJ3NtaWxlJyxcbiAgICAgICAgJ3N3ZWF0X3NtaWxlJyxcbiAgICAgICAgJ2xhdWdoaW5nJyxcbiAgICAgICAgJ3dpbmsnLFxuICAgICAgICAnYmx1c2gnLFxuICAgICAgICAneXVtJyxcbiAgICAgICAgJ3N1bmdsYXNzZXMnLFxuICAgICAgICAnaGVhcnRfZXllcycsXG4gICAgICAgICdraXNzaW5nX2hlYXJ0JyxcbiAgICAgICAgJ2tpc3NpbmcnLFxuICAgICAgICAna2lzc2luZ19zbWlsaW5nX2V5ZXMnLFxuICAgICAgICAna2lzc2luZ19jbG9zZWRfZXllcycsXG4gICAgICAgICdyZWxheGVkJyxcbiAgICAgICAgJ3NsaWdodGx5X3NtaWxpbmdfZmFjZScsXG4gICAgICAgICdodWdnaW5nX2ZhY2UnLFxuICAgICAgICAnZ3Jpbm5pbmdfZmFjZV93aXRoX3N0YXJfZXllcycsXG4gICAgICAgICd0aGlua2luZ19mYWNlJyxcbiAgICAgICAgJ2ZhY2Vfd2l0aF9vbmVfZXllYnJvd19yYWlzZWQnLFxuICAgICAgICAnbmV1dHJhbF9mYWNlJyxcbiAgICAgICAgJ2V4cHJlc3Npb25sZXNzJyxcbiAgICAgICAgJ25vX21vdXRoJyxcbiAgICAgICAgJ2ZhY2Vfd2l0aF9yb2xsaW5nX2V5ZXMnLFxuICAgICAgICAnc21pcmsnLFxuICAgICAgICAncGVyc2V2ZXJlJyxcbiAgICAgICAgJ2Rpc2FwcG9pbnRlZF9yZWxpZXZlZCcsXG4gICAgICAgICdvcGVuX21vdXRoJyxcbiAgICAgICAgJ3ppcHBlcl9tb3V0aF9mYWNlJyxcbiAgICAgIF19XG4gICAgLz5cbiAgKTtcbn07XG5cbmV4cG9ydCBjb25zdCBOb1JlY2VudHMgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICByZXR1cm4gKFxuICAgIDxFbW9qaVBpY2tlclxuICAgICAgaTE4bj17aTE4bn1cbiAgICAgIG9uUGlja0Vtb2ppPXthY3Rpb24oJ29uUGlja0Vtb2ppJyl9XG4gICAgICBvblNldFNraW5Ub25lPXthY3Rpb24oJ29uU2V0U2tpblRvbmUnKX1cbiAgICAgIG9uQ2xvc2U9e2FjdGlvbignb25DbG9zZScpfVxuICAgICAgc2tpblRvbmU9ezB9XG4gICAgICByZWNlbnRFbW9qaXM9e1tdfVxuICAgIC8+XG4gICk7XG59O1xuXG5leHBvcnQgY29uc3QgV2l0aFNldHRpbmdzQnV0dG9uID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgcmV0dXJuIChcbiAgICA8RW1vamlQaWNrZXJcbiAgICAgIGkxOG49e2kxOG59XG4gICAgICBvblBpY2tFbW9qaT17YWN0aW9uKCdvblBpY2tFbW9qaScpfVxuICAgICAgb25TZXRTa2luVG9uZT17YWN0aW9uKCdvblNldFNraW5Ub25lJyl9XG4gICAgICBvbkNsaWNrU2V0dGluZ3M9e2FjdGlvbignb25DbGlja1NldHRpbmdzJyl9XG4gICAgICBvbkNsb3NlPXthY3Rpb24oJ29uQ2xvc2UnKX1cbiAgICAgIHNraW5Ub25lPXswfVxuICAgICAgcmVjZW50RW1vamlzPXtbXX1cbiAgICAvPlxuICApO1xufTtcblxuV2l0aFNldHRpbmdzQnV0dG9uLnN0b3J5ID0ge1xuICBuYW1lOiAnV2l0aCBzZXR0aW5ncyBidXR0b24nLFxufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxZQUF1QjtBQUV2QiwyQkFBdUI7QUFFdkIsdUJBQTBCO0FBQzFCLHNCQUF1QjtBQUV2Qix5QkFBNEI7QUFFNUIsTUFBTSxPQUFPLGdDQUFVLE1BQU0sdUJBQVU7QUFFdkMsSUFBTyw4QkFBUTtBQUFBLEVBQ2IsT0FBTztBQUNUO0FBRU8sTUFBTSxPQUFPLDZCQUFtQjtBQUNyQyxTQUNFLG9DQUFDO0FBQUEsSUFDQztBQUFBLElBQ0EsYUFBYSxpQ0FBTyxhQUFhO0FBQUEsSUFDakMsZUFBZSxpQ0FBTyxlQUFlO0FBQUEsSUFDckMsU0FBUyxpQ0FBTyxTQUFTO0FBQUEsSUFDekIsVUFBVTtBQUFBLElBQ1YsY0FBYztBQUFBLE1BQ1o7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFDRjtBQUFBLEdBQ0Y7QUFFSixHQTVDb0I7QUE4Q2IsTUFBTSxZQUFZLDZCQUFtQjtBQUMxQyxTQUNFLG9DQUFDO0FBQUEsSUFDQztBQUFBLElBQ0EsYUFBYSxpQ0FBTyxhQUFhO0FBQUEsSUFDakMsZUFBZSxpQ0FBTyxlQUFlO0FBQUEsSUFDckMsU0FBUyxpQ0FBTyxTQUFTO0FBQUEsSUFDekIsVUFBVTtBQUFBLElBQ1YsY0FBYyxDQUFDO0FBQUEsR0FDakI7QUFFSixHQVh5QjtBQWFsQixNQUFNLHFCQUFxQiw2QkFBbUI7QUFDbkQsU0FDRSxvQ0FBQztBQUFBLElBQ0M7QUFBQSxJQUNBLGFBQWEsaUNBQU8sYUFBYTtBQUFBLElBQ2pDLGVBQWUsaUNBQU8sZUFBZTtBQUFBLElBQ3JDLGlCQUFpQixpQ0FBTyxpQkFBaUI7QUFBQSxJQUN6QyxTQUFTLGlDQUFPLFNBQVM7QUFBQSxJQUN6QixVQUFVO0FBQUEsSUFDVixjQUFjLENBQUM7QUFBQSxHQUNqQjtBQUVKLEdBWmtDO0FBY2xDLG1CQUFtQixRQUFRO0FBQUEsRUFDekIsTUFBTTtBQUNSOyIsCiAgIm5hbWVzIjogW10KfQo=
