var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var EmojiPicker_exports = {};
__export(EmojiPicker_exports, {
  SmartEmojiPicker: () => SmartEmojiPicker
});
module.exports = __toCommonJS(EmojiPicker_exports);
var React = __toESM(require("react"));
var import_react_redux = require("react-redux");
var import_emojis = require("../selectors/emojis");
var import_emojis2 = require("../ducks/emojis");
var import_EmojiPicker = require("../../components/emoji/EmojiPicker");
var import_user = require("../selectors/user");
var import_items = require("../selectors/items");
const SmartEmojiPicker = React.forwardRef(({ onClickSettings, onPickEmoji, onSetSkinTone, onClose, style }, ref) => {
  const i18n = (0, import_react_redux.useSelector)(import_user.getIntl);
  const skinTone = (0, import_react_redux.useSelector)((state) => (0, import_items.getEmojiSkinTone)(state));
  const recentEmojis = (0, import_emojis.useRecentEmojis)();
  const { onUseEmoji } = (0, import_emojis2.useActions)();
  const handlePickEmoji = React.useCallback((data) => {
    onUseEmoji({ shortName: data.shortName });
    onPickEmoji(data);
  }, [onUseEmoji, onPickEmoji]);
  return /* @__PURE__ */ React.createElement(import_EmojiPicker.EmojiPicker, {
    ref,
    i18n,
    skinTone,
    onClickSettings,
    onSetSkinTone,
    onPickEmoji: handlePickEmoji,
    recentEmojis,
    onClose,
    style
  });
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SmartEmojiPicker
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiRW1vamlQaWNrZXIudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMC0yMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgdXNlU2VsZWN0b3IgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgdHlwZSB7IFN0YXRlVHlwZSB9IGZyb20gJy4uL3JlZHVjZXInO1xuaW1wb3J0IHsgdXNlUmVjZW50RW1vamlzIH0gZnJvbSAnLi4vc2VsZWN0b3JzL2Vtb2ppcyc7XG5pbXBvcnQgeyB1c2VBY3Rpb25zIGFzIHVzZUVtb2ppQWN0aW9ucyB9IGZyb20gJy4uL2R1Y2tzL2Vtb2ppcyc7XG5cbmltcG9ydCB0eXBlIHsgUHJvcHMgYXMgRW1vamlQaWNrZXJQcm9wcyB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvZW1vamkvRW1vamlQaWNrZXInO1xuaW1wb3J0IHsgRW1vamlQaWNrZXIgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL2Vtb2ppL0Vtb2ppUGlja2VyJztcbmltcG9ydCB7IGdldEludGwgfSBmcm9tICcuLi9zZWxlY3RvcnMvdXNlcic7XG5pbXBvcnQgeyBnZXRFbW9qaVNraW5Ub25lIH0gZnJvbSAnLi4vc2VsZWN0b3JzL2l0ZW1zJztcbmltcG9ydCB0eXBlIHsgTG9jYWxpemVyVHlwZSB9IGZyb20gJy4uLy4uL3R5cGVzL1V0aWwnO1xuXG5leHBvcnQgY29uc3QgU21hcnRFbW9qaVBpY2tlciA9IFJlYWN0LmZvcndhcmRSZWY8XG4gIEhUTUxEaXZFbGVtZW50LFxuICBQaWNrPFxuICAgIEVtb2ppUGlja2VyUHJvcHMsXG4gICAgJ29uQ2xpY2tTZXR0aW5ncycgfCAnb25QaWNrRW1vamknIHwgJ29uU2V0U2tpblRvbmUnIHwgJ29uQ2xvc2UnIHwgJ3N0eWxlJ1xuICA+XG4+KCh7IG9uQ2xpY2tTZXR0aW5ncywgb25QaWNrRW1vamksIG9uU2V0U2tpblRvbmUsIG9uQ2xvc2UsIHN0eWxlIH0sIHJlZikgPT4ge1xuICBjb25zdCBpMThuID0gdXNlU2VsZWN0b3I8U3RhdGVUeXBlLCBMb2NhbGl6ZXJUeXBlPihnZXRJbnRsKTtcbiAgY29uc3Qgc2tpblRvbmUgPSB1c2VTZWxlY3RvcjxTdGF0ZVR5cGUsIG51bWJlcj4oc3RhdGUgPT5cbiAgICBnZXRFbW9qaVNraW5Ub25lKHN0YXRlKVxuICApO1xuXG4gIGNvbnN0IHJlY2VudEVtb2ppcyA9IHVzZVJlY2VudEVtb2ppcygpO1xuXG4gIGNvbnN0IHsgb25Vc2VFbW9qaSB9ID0gdXNlRW1vamlBY3Rpb25zKCk7XG5cbiAgY29uc3QgaGFuZGxlUGlja0Vtb2ppID0gUmVhY3QudXNlQ2FsbGJhY2soXG4gICAgZGF0YSA9PiB7XG4gICAgICBvblVzZUVtb2ppKHsgc2hvcnROYW1lOiBkYXRhLnNob3J0TmFtZSB9KTtcbiAgICAgIG9uUGlja0Vtb2ppKGRhdGEpO1xuICAgIH0sXG4gICAgW29uVXNlRW1vamksIG9uUGlja0Vtb2ppXVxuICApO1xuXG4gIHJldHVybiAoXG4gICAgPEVtb2ppUGlja2VyXG4gICAgICByZWY9e3JlZn1cbiAgICAgIGkxOG49e2kxOG59XG4gICAgICBza2luVG9uZT17c2tpblRvbmV9XG4gICAgICBvbkNsaWNrU2V0dGluZ3M9e29uQ2xpY2tTZXR0aW5nc31cbiAgICAgIG9uU2V0U2tpblRvbmU9e29uU2V0U2tpblRvbmV9XG4gICAgICBvblBpY2tFbW9qaT17aGFuZGxlUGlja0Vtb2ppfVxuICAgICAgcmVjZW50RW1vamlzPXtyZWNlbnRFbW9qaXN9XG4gICAgICBvbkNsb3NlPXtvbkNsb3NlfVxuICAgICAgc3R5bGU9e3N0eWxlfVxuICAgIC8+XG4gICk7XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLFlBQXVCO0FBQ3ZCLHlCQUE0QjtBQUU1QixvQkFBZ0M7QUFDaEMscUJBQThDO0FBRzlDLHlCQUE0QjtBQUM1QixrQkFBd0I7QUFDeEIsbUJBQWlDO0FBRzFCLE1BQU0sbUJBQW1CLE1BQU0sV0FNcEMsQ0FBQyxFQUFFLGlCQUFpQixhQUFhLGVBQWUsU0FBUyxTQUFTLFFBQVE7QUFDMUUsUUFBTSxPQUFPLG9DQUFzQyxtQkFBTztBQUMxRCxRQUFNLFdBQVcsb0NBQStCLFdBQzlDLG1DQUFpQixLQUFLLENBQ3hCO0FBRUEsUUFBTSxlQUFlLG1DQUFnQjtBQUVyQyxRQUFNLEVBQUUsZUFBZSwrQkFBZ0I7QUFFdkMsUUFBTSxrQkFBa0IsTUFBTSxZQUM1QixVQUFRO0FBQ04sZUFBVyxFQUFFLFdBQVcsS0FBSyxVQUFVLENBQUM7QUFDeEMsZ0JBQVksSUFBSTtBQUFBLEVBQ2xCLEdBQ0EsQ0FBQyxZQUFZLFdBQVcsQ0FDMUI7QUFFQSxTQUNFLG9DQUFDO0FBQUEsSUFDQztBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBLGFBQWE7QUFBQSxJQUNiO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxHQUNGO0FBRUosQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
