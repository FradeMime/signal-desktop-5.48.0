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
var StickerFrame_stories_exports = {};
__export(StickerFrame_stories_exports, {
  EmojiSelectMode: () => EmojiSelectMode,
  _StickerFrame: () => _StickerFrame,
  default: () => StickerFrame_stories_default
});
module.exports = __toCommonJS(StickerFrame_stories_exports);
var React = __toESM(require("react"));
var import_addon_knobs = require("@storybook/addon-knobs");
var import_addon_actions = require("@storybook/addon-actions");
var import_StoryRow = require("../elements/StoryRow");
var import_StickerFrame = require("./StickerFrame");
var StickerFrame_stories_default = {
  title: "Sticker Creator/components"
};
const _StickerFrame = /* @__PURE__ */ __name(() => {
  const image = (0, import_addon_knobs.text)("image url", "/fixtures/512x515-thumbs-up-lincoln.webp");
  const showGuide = (0, import_addon_knobs.boolean)("show guide", true);
  const mode = (0, import_addon_knobs.select)("mode", ["removable", "pick-emoji", "add"], "add");
  const onRemove = (0, import_addon_actions.action)("onRemove");
  const onDrop = (0, import_addon_actions.action)("onDrop");
  const [skinTone, setSkinTone] = React.useState(0);
  const [emoji, setEmoji] = React.useState(void 0);
  return /* @__PURE__ */ React.createElement(import_StoryRow.StoryRow, {
    top: true
  }, /* @__PURE__ */ React.createElement(import_StickerFrame.StickerFrame, {
    id: "1337",
    emojiData: emoji,
    image,
    mode,
    showGuide,
    onRemove,
    skinTone,
    onSetSkinTone: setSkinTone,
    onPickEmoji: (e) => setEmoji(e.emoji),
    onDrop
  }));
}, "_StickerFrame");
_StickerFrame.story = {
  name: "StickerFrame, add sticker"
};
const EmojiSelectMode = /* @__PURE__ */ __name(() => {
  const image = (0, import_addon_knobs.text)("image url", "/fixtures/512x515-thumbs-up-lincoln.webp");
  const setSkinTone = (0, import_addon_actions.action)("setSkinTone");
  const onRemove = (0, import_addon_actions.action)("onRemove");
  const onDrop = (0, import_addon_actions.action)("onDrop");
  const [emoji, setEmoji] = React.useState(void 0);
  return /* @__PURE__ */ React.createElement(import_StoryRow.StoryRow, {
    top: true
  }, /* @__PURE__ */ React.createElement(import_StickerFrame.StickerFrame, {
    id: "1337",
    emojiData: emoji,
    image,
    mode: "pick-emoji",
    onRemove,
    skinTone: 0,
    onSetSkinTone: setSkinTone,
    onPickEmoji: (e) => setEmoji(e.emoji),
    onDrop
  }));
}, "EmojiSelectMode");
EmojiSelectMode.story = {
  name: "StickerFrame, emoji select mode"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  EmojiSelectMode,
  _StickerFrame
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiU3RpY2tlckZyYW1lLnN0b3JpZXMudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAxOS0yMDIwIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgYm9vbGVhbiwgc2VsZWN0LCB0ZXh0IH0gZnJvbSAnQHN0b3J5Ym9vay9hZGRvbi1rbm9icyc7XG5pbXBvcnQgeyBhY3Rpb24gfSBmcm9tICdAc3Rvcnlib29rL2FkZG9uLWFjdGlvbnMnO1xuXG5pbXBvcnQgeyBTdG9yeVJvdyB9IGZyb20gJy4uL2VsZW1lbnRzL1N0b3J5Um93JztcbmltcG9ydCB7IFN0aWNrZXJGcmFtZSB9IGZyb20gJy4vU3RpY2tlckZyYW1lJztcblxuaW1wb3J0IHR5cGUgeyBFbW9qaVBpY2tEYXRhVHlwZSB9IGZyb20gJy4uLy4uL3RzL2NvbXBvbmVudHMvZW1vamkvRW1vamlQaWNrZXInO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHRpdGxlOiAnU3RpY2tlciBDcmVhdG9yL2NvbXBvbmVudHMnLFxufTtcblxuZXhwb3J0IGNvbnN0IF9TdGlja2VyRnJhbWUgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBpbWFnZSA9IHRleHQoJ2ltYWdlIHVybCcsICcvZml4dHVyZXMvNTEyeDUxNS10aHVtYnMtdXAtbGluY29sbi53ZWJwJyk7XG4gIGNvbnN0IHNob3dHdWlkZSA9IGJvb2xlYW4oJ3Nob3cgZ3VpZGUnLCB0cnVlKTtcbiAgY29uc3QgbW9kZSA9IHNlbGVjdCgnbW9kZScsIFsncmVtb3ZhYmxlJywgJ3BpY2stZW1vamknLCAnYWRkJ10sICdhZGQnKTtcbiAgY29uc3Qgb25SZW1vdmUgPSBhY3Rpb24oJ29uUmVtb3ZlJyk7XG4gIGNvbnN0IG9uRHJvcCA9IGFjdGlvbignb25Ecm9wJyk7XG4gIGNvbnN0IFtza2luVG9uZSwgc2V0U2tpblRvbmVdID0gUmVhY3QudXNlU3RhdGUoMCk7XG4gIGNvbnN0IFtlbW9qaSwgc2V0RW1vamldID0gUmVhY3QudXNlU3RhdGU8RW1vamlQaWNrRGF0YVR5cGUgfCB1bmRlZmluZWQ+KFxuICAgIHVuZGVmaW5lZFxuICApO1xuXG4gIHJldHVybiAoXG4gICAgPFN0b3J5Um93IHRvcD5cbiAgICAgIDxTdGlja2VyRnJhbWVcbiAgICAgICAgaWQ9XCIxMzM3XCJcbiAgICAgICAgZW1vamlEYXRhPXtlbW9qaX1cbiAgICAgICAgaW1hZ2U9e2ltYWdlfVxuICAgICAgICBtb2RlPXttb2RlfVxuICAgICAgICBzaG93R3VpZGU9e3Nob3dHdWlkZX1cbiAgICAgICAgb25SZW1vdmU9e29uUmVtb3ZlfVxuICAgICAgICBza2luVG9uZT17c2tpblRvbmV9XG4gICAgICAgIG9uU2V0U2tpblRvbmU9e3NldFNraW5Ub25lfVxuICAgICAgICBvblBpY2tFbW9qaT17ZSA9PiBzZXRFbW9qaShlLmVtb2ppKX1cbiAgICAgICAgb25Ecm9wPXtvbkRyb3B9XG4gICAgICAvPlxuICAgIDwvU3RvcnlSb3c+XG4gICk7XG59O1xuXG5fU3RpY2tlckZyYW1lLnN0b3J5ID0ge1xuICBuYW1lOiAnU3RpY2tlckZyYW1lLCBhZGQgc3RpY2tlcicsXG59O1xuXG5leHBvcnQgY29uc3QgRW1vamlTZWxlY3RNb2RlID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgaW1hZ2UgPSB0ZXh0KCdpbWFnZSB1cmwnLCAnL2ZpeHR1cmVzLzUxMng1MTUtdGh1bWJzLXVwLWxpbmNvbG4ud2VicCcpO1xuICBjb25zdCBzZXRTa2luVG9uZSA9IGFjdGlvbignc2V0U2tpblRvbmUnKTtcbiAgY29uc3Qgb25SZW1vdmUgPSBhY3Rpb24oJ29uUmVtb3ZlJyk7XG4gIGNvbnN0IG9uRHJvcCA9IGFjdGlvbignb25Ecm9wJyk7XG4gIGNvbnN0IFtlbW9qaSwgc2V0RW1vamldID0gUmVhY3QudXNlU3RhdGU8RW1vamlQaWNrRGF0YVR5cGUgfCB1bmRlZmluZWQ+KFxuICAgIHVuZGVmaW5lZFxuICApO1xuXG4gIHJldHVybiAoXG4gICAgPFN0b3J5Um93IHRvcD5cbiAgICAgIDxTdGlja2VyRnJhbWVcbiAgICAgICAgaWQ9XCIxMzM3XCJcbiAgICAgICAgZW1vamlEYXRhPXtlbW9qaX1cbiAgICAgICAgaW1hZ2U9e2ltYWdlfVxuICAgICAgICBtb2RlPVwicGljay1lbW9qaVwiXG4gICAgICAgIG9uUmVtb3ZlPXtvblJlbW92ZX1cbiAgICAgICAgc2tpblRvbmU9ezB9XG4gICAgICAgIG9uU2V0U2tpblRvbmU9e3NldFNraW5Ub25lfVxuICAgICAgICBvblBpY2tFbW9qaT17ZSA9PiBzZXRFbW9qaShlLmVtb2ppKX1cbiAgICAgICAgb25Ecm9wPXtvbkRyb3B9XG4gICAgICAvPlxuICAgIDwvU3RvcnlSb3c+XG4gICk7XG59O1xuXG5FbW9qaVNlbGVjdE1vZGUuc3RvcnkgPSB7XG4gIG5hbWU6ICdTdGlja2VyRnJhbWUsIGVtb2ppIHNlbGVjdCBtb2RlJyxcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLFlBQXVCO0FBQ3ZCLHlCQUFzQztBQUN0QywyQkFBdUI7QUFFdkIsc0JBQXlCO0FBQ3pCLDBCQUE2QjtBQUk3QixJQUFPLCtCQUFRO0FBQUEsRUFDYixPQUFPO0FBQ1Q7QUFFTyxNQUFNLGdCQUFnQiw2QkFBbUI7QUFDOUMsUUFBTSxRQUFRLDZCQUFLLGFBQWEsMENBQTBDO0FBQzFFLFFBQU0sWUFBWSxnQ0FBUSxjQUFjLElBQUk7QUFDNUMsUUFBTSxPQUFPLCtCQUFPLFFBQVEsQ0FBQyxhQUFhLGNBQWMsS0FBSyxHQUFHLEtBQUs7QUFDckUsUUFBTSxXQUFXLGlDQUFPLFVBQVU7QUFDbEMsUUFBTSxTQUFTLGlDQUFPLFFBQVE7QUFDOUIsUUFBTSxDQUFDLFVBQVUsZUFBZSxNQUFNLFNBQVMsQ0FBQztBQUNoRCxRQUFNLENBQUMsT0FBTyxZQUFZLE1BQU0sU0FDOUIsTUFDRjtBQUVBLFNBQ0Usb0NBQUM7QUFBQSxJQUFTLEtBQUc7QUFBQSxLQUNYLG9DQUFDO0FBQUEsSUFDQyxJQUFHO0FBQUEsSUFDSCxXQUFXO0FBQUEsSUFDWDtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBLGVBQWU7QUFBQSxJQUNmLGFBQWEsT0FBSyxTQUFTLEVBQUUsS0FBSztBQUFBLElBQ2xDO0FBQUEsR0FDRixDQUNGO0FBRUosR0EzQjZCO0FBNkI3QixjQUFjLFFBQVE7QUFBQSxFQUNwQixNQUFNO0FBQ1I7QUFFTyxNQUFNLGtCQUFrQiw2QkFBbUI7QUFDaEQsUUFBTSxRQUFRLDZCQUFLLGFBQWEsMENBQTBDO0FBQzFFLFFBQU0sY0FBYyxpQ0FBTyxhQUFhO0FBQ3hDLFFBQU0sV0FBVyxpQ0FBTyxVQUFVO0FBQ2xDLFFBQU0sU0FBUyxpQ0FBTyxRQUFRO0FBQzlCLFFBQU0sQ0FBQyxPQUFPLFlBQVksTUFBTSxTQUM5QixNQUNGO0FBRUEsU0FDRSxvQ0FBQztBQUFBLElBQVMsS0FBRztBQUFBLEtBQ1gsb0NBQUM7QUFBQSxJQUNDLElBQUc7QUFBQSxJQUNILFdBQVc7QUFBQSxJQUNYO0FBQUEsSUFDQSxNQUFLO0FBQUEsSUFDTDtBQUFBLElBQ0EsVUFBVTtBQUFBLElBQ1YsZUFBZTtBQUFBLElBQ2YsYUFBYSxPQUFLLFNBQVMsRUFBRSxLQUFLO0FBQUEsSUFDbEM7QUFBQSxHQUNGLENBQ0Y7QUFFSixHQXhCK0I7QUEwQi9CLGdCQUFnQixRQUFRO0FBQUEsRUFDdEIsTUFBTTtBQUNSOyIsCiAgIm5hbWVzIjogW10KfQo=
