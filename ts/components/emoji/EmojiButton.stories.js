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
var EmojiButton_stories_exports = {};
__export(EmojiButton_stories_exports, {
  Base: () => Base,
  default: () => EmojiButton_stories_default
});
module.exports = __toCommonJS(EmojiButton_stories_exports);
var React = __toESM(require("react"));
var import_addon_actions = require("@storybook/addon-actions");
var import_setupI18n = require("../../util/setupI18n");
var import_messages = __toESM(require("../../../_locales/en/messages.json"));
var import_EmojiButton = require("./EmojiButton");
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
var EmojiButton_stories_default = {
  title: "Components/Emoji/EmojiButton"
};
const Base = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ React.createElement("div", {
    style: {
      height: "500px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end"
    }
  }, /* @__PURE__ */ React.createElement(import_EmojiButton.EmojiButton, {
    i18n,
    onPickEmoji: (0, import_addon_actions.action)("onPickEmoji"),
    skinTone: 0,
    onSetSkinTone: (0, import_addon_actions.action)("onSetSkinTone"),
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
  }));
}, "Base");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Base
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiRW1vamlCdXR0b24uc3Rvcmllcy50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIwIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgeyBhY3Rpb24gfSBmcm9tICdAc3Rvcnlib29rL2FkZG9uLWFjdGlvbnMnO1xuXG5pbXBvcnQgeyBzZXR1cEkxOG4gfSBmcm9tICcuLi8uLi91dGlsL3NldHVwSTE4bic7XG5pbXBvcnQgZW5NZXNzYWdlcyBmcm9tICcuLi8uLi8uLi9fbG9jYWxlcy9lbi9tZXNzYWdlcy5qc29uJztcblxuaW1wb3J0IHsgRW1vamlCdXR0b24gfSBmcm9tICcuL0Vtb2ppQnV0dG9uJztcblxuY29uc3QgaTE4biA9IHNldHVwSTE4bignZW4nLCBlbk1lc3NhZ2VzKTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICB0aXRsZTogJ0NvbXBvbmVudHMvRW1vamkvRW1vamlCdXR0b24nLFxufTtcblxuZXhwb3J0IGNvbnN0IEJhc2UgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICByZXR1cm4gKFxuICAgIDxkaXZcbiAgICAgIHN0eWxlPXt7XG4gICAgICAgIGhlaWdodDogJzUwMHB4JyxcbiAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJyxcbiAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdmbGV4LWVuZCcsXG4gICAgICB9fVxuICAgID5cbiAgICAgIDxFbW9qaUJ1dHRvblxuICAgICAgICBpMThuPXtpMThufVxuICAgICAgICBvblBpY2tFbW9qaT17YWN0aW9uKCdvblBpY2tFbW9qaScpfVxuICAgICAgICBza2luVG9uZT17MH1cbiAgICAgICAgb25TZXRTa2luVG9uZT17YWN0aW9uKCdvblNldFNraW5Ub25lJyl9XG4gICAgICAgIHJlY2VudEVtb2ppcz17W1xuICAgICAgICAgICdncmlubmluZycsXG4gICAgICAgICAgJ2dyaW4nLFxuICAgICAgICAgICdqb3knLFxuICAgICAgICAgICdyb2xsaW5nX29uX3RoZV9mbG9vcl9sYXVnaGluZycsXG4gICAgICAgICAgJ3NtaWxleScsXG4gICAgICAgICAgJ3NtaWxlJyxcbiAgICAgICAgICAnc3dlYXRfc21pbGUnLFxuICAgICAgICAgICdsYXVnaGluZycsXG4gICAgICAgICAgJ3dpbmsnLFxuICAgICAgICAgICdibHVzaCcsXG4gICAgICAgICAgJ3l1bScsXG4gICAgICAgICAgJ3N1bmdsYXNzZXMnLFxuICAgICAgICAgICdoZWFydF9leWVzJyxcbiAgICAgICAgICAna2lzc2luZ19oZWFydCcsXG4gICAgICAgICAgJ2tpc3NpbmcnLFxuICAgICAgICAgICdraXNzaW5nX3NtaWxpbmdfZXllcycsXG4gICAgICAgICAgJ2tpc3NpbmdfY2xvc2VkX2V5ZXMnLFxuICAgICAgICAgICdyZWxheGVkJyxcbiAgICAgICAgICAnc2xpZ2h0bHlfc21pbGluZ19mYWNlJyxcbiAgICAgICAgICAnaHVnZ2luZ19mYWNlJyxcbiAgICAgICAgICAnZ3Jpbm5pbmdfZmFjZV93aXRoX3N0YXJfZXllcycsXG4gICAgICAgICAgJ3RoaW5raW5nX2ZhY2UnLFxuICAgICAgICAgICdmYWNlX3dpdGhfb25lX2V5ZWJyb3dfcmFpc2VkJyxcbiAgICAgICAgICAnbmV1dHJhbF9mYWNlJyxcbiAgICAgICAgICAnZXhwcmVzc2lvbmxlc3MnLFxuICAgICAgICAgICdub19tb3V0aCcsXG4gICAgICAgICAgJ2ZhY2Vfd2l0aF9yb2xsaW5nX2V5ZXMnLFxuICAgICAgICAgICdzbWlyaycsXG4gICAgICAgICAgJ3BlcnNldmVyZScsXG4gICAgICAgICAgJ2Rpc2FwcG9pbnRlZF9yZWxpZXZlZCcsXG4gICAgICAgICAgJ29wZW5fbW91dGgnLFxuICAgICAgICAgICd6aXBwZXJfbW91dGhfZmFjZScsXG4gICAgICAgIF19XG4gICAgICAvPlxuICAgIDwvZGl2PlxuICApO1xufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLFlBQXVCO0FBRXZCLDJCQUF1QjtBQUV2Qix1QkFBMEI7QUFDMUIsc0JBQXVCO0FBRXZCLHlCQUE0QjtBQUU1QixNQUFNLE9BQU8sZ0NBQVUsTUFBTSx1QkFBVTtBQUV2QyxJQUFPLDhCQUFRO0FBQUEsRUFDYixPQUFPO0FBQ1Q7QUFFTyxNQUFNLE9BQU8sNkJBQW1CO0FBQ3JDLFNBQ0Usb0NBQUM7QUFBQSxJQUNDLE9BQU87QUFBQSxNQUNMLFFBQVE7QUFBQSxNQUNSLFNBQVM7QUFBQSxNQUNULGVBQWU7QUFBQSxNQUNmLGdCQUFnQjtBQUFBLElBQ2xCO0FBQUEsS0FFQSxvQ0FBQztBQUFBLElBQ0M7QUFBQSxJQUNBLGFBQWEsaUNBQU8sYUFBYTtBQUFBLElBQ2pDLFVBQVU7QUFBQSxJQUNWLGVBQWUsaUNBQU8sZUFBZTtBQUFBLElBQ3JDLGNBQWM7QUFBQSxNQUNaO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0Y7QUFBQSxHQUNGLENBQ0Y7QUFFSixHQXBEb0I7IiwKICAibmFtZXMiOiBbXQp9Cg==
