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
var ReactionPicker_stories_exports = {};
__export(ReactionPicker_stories_exports, {
  Base: () => Base,
  SelectedReaction: () => SelectedReaction,
  default: () => ReactionPicker_stories_default
});
module.exports = __toCommonJS(ReactionPicker_stories_exports);
var React = __toESM(require("react"));
var import_addon_actions = require("@storybook/addon-actions");
var import_setupI18n = require("../../util/setupI18n");
var import_messages = __toESM(require("../../../_locales/en/messages.json"));
var import_ReactionPicker = require("./ReactionPicker");
var import_EmojiPicker = require("../emoji/EmojiPicker");
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
const preferredReactionEmoji = ["\u2764\uFE0F", "\u{1F44D}", "\u{1F44E}", "\u{1F602}", "\u{1F62E}", "\u{1F622}"];
const renderEmojiPicker = /* @__PURE__ */ __name(({
  onClose,
  onPickEmoji,
  onSetSkinTone,
  ref
}) => /* @__PURE__ */ React.createElement(import_EmojiPicker.EmojiPicker, {
  i18n,
  skinTone: 0,
  ref,
  onClose,
  onPickEmoji,
  onSetSkinTone
}), "renderEmojiPicker");
var ReactionPicker_stories_default = {
  title: "Components/Conversation/ReactionPicker"
};
const Base = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ React.createElement(import_ReactionPicker.ReactionPicker, {
    i18n,
    onPick: (0, import_addon_actions.action)("onPick"),
    onSetSkinTone: (0, import_addon_actions.action)("onSetSkinTone"),
    openCustomizePreferredReactionsModal: (0, import_addon_actions.action)("openCustomizePreferredReactionsModal"),
    preferredReactionEmoji,
    renderEmojiPicker
  });
}, "Base");
const SelectedReaction = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ React.createElement(React.Fragment, null, ["\u2764\uFE0F", "\u{1F44D}", "\u{1F44E}", "\u{1F602}", "\u{1F62E}", "\u{1F622}", "\u{1F621}"].map((e) => /* @__PURE__ */ React.createElement("div", {
    key: e,
    style: { height: "100px" }
  }, /* @__PURE__ */ React.createElement(import_ReactionPicker.ReactionPicker, {
    i18n,
    selected: e,
    onPick: (0, import_addon_actions.action)("onPick"),
    onSetSkinTone: (0, import_addon_actions.action)("onSetSkinTone"),
    openCustomizePreferredReactionsModal: (0, import_addon_actions.action)("openCustomizePreferredReactionsModal"),
    preferredReactionEmoji,
    renderEmojiPicker
  }))));
}, "SelectedReaction");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Base,
  SelectedReaction
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiUmVhY3Rpb25QaWNrZXIuc3Rvcmllcy50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIwLTIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IGFjdGlvbiB9IGZyb20gJ0BzdG9yeWJvb2svYWRkb24tYWN0aW9ucyc7XG5cbmltcG9ydCB7IHNldHVwSTE4biB9IGZyb20gJy4uLy4uL3V0aWwvc2V0dXBJMThuJztcbmltcG9ydCBlbk1lc3NhZ2VzIGZyb20gJy4uLy4uLy4uL19sb2NhbGVzL2VuL21lc3NhZ2VzLmpzb24nO1xuaW1wb3J0IHR5cGUgeyBQcm9wcyBhcyBSZWFjdGlvblBpY2tlclByb3BzIH0gZnJvbSAnLi9SZWFjdGlvblBpY2tlcic7XG5pbXBvcnQgeyBSZWFjdGlvblBpY2tlciB9IGZyb20gJy4vUmVhY3Rpb25QaWNrZXInO1xuaW1wb3J0IHsgRW1vamlQaWNrZXIgfSBmcm9tICcuLi9lbW9qaS9FbW9qaVBpY2tlcic7XG5cbmNvbnN0IGkxOG4gPSBzZXR1cEkxOG4oJ2VuJywgZW5NZXNzYWdlcyk7XG5cbmNvbnN0IHByZWZlcnJlZFJlYWN0aW9uRW1vamkgPSBbJ1x1Mjc2NFx1RkUwRicsICdcdUQ4M0RcdURDNEQnLCAnXHVEODNEXHVEQzRFJywgJ1x1RDgzRFx1REUwMicsICdcdUQ4M0RcdURFMkUnLCAnXHVEODNEXHVERTIyJ107XG5cbmNvbnN0IHJlbmRlckVtb2ppUGlja2VyOiBSZWFjdGlvblBpY2tlclByb3BzWydyZW5kZXJFbW9qaVBpY2tlciddID0gKHtcbiAgb25DbG9zZSxcbiAgb25QaWNrRW1vamksXG4gIG9uU2V0U2tpblRvbmUsXG4gIHJlZixcbn0pID0+IChcbiAgPEVtb2ppUGlja2VyXG4gICAgaTE4bj17aTE4bn1cbiAgICBza2luVG9uZT17MH1cbiAgICByZWY9e3JlZn1cbiAgICBvbkNsb3NlPXtvbkNsb3NlfVxuICAgIG9uUGlja0Vtb2ppPXtvblBpY2tFbW9qaX1cbiAgICBvblNldFNraW5Ub25lPXtvblNldFNraW5Ub25lfVxuICAvPlxuKTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICB0aXRsZTogJ0NvbXBvbmVudHMvQ29udmVyc2F0aW9uL1JlYWN0aW9uUGlja2VyJyxcbn07XG5cbmV4cG9ydCBjb25zdCBCYXNlID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgcmV0dXJuIChcbiAgICA8UmVhY3Rpb25QaWNrZXJcbiAgICAgIGkxOG49e2kxOG59XG4gICAgICBvblBpY2s9e2FjdGlvbignb25QaWNrJyl9XG4gICAgICBvblNldFNraW5Ub25lPXthY3Rpb24oJ29uU2V0U2tpblRvbmUnKX1cbiAgICAgIG9wZW5DdXN0b21pemVQcmVmZXJyZWRSZWFjdGlvbnNNb2RhbD17YWN0aW9uKFxuICAgICAgICAnb3BlbkN1c3RvbWl6ZVByZWZlcnJlZFJlYWN0aW9uc01vZGFsJ1xuICAgICAgKX1cbiAgICAgIHByZWZlcnJlZFJlYWN0aW9uRW1vamk9e3ByZWZlcnJlZFJlYWN0aW9uRW1vaml9XG4gICAgICByZW5kZXJFbW9qaVBpY2tlcj17cmVuZGVyRW1vamlQaWNrZXJ9XG4gICAgLz5cbiAgKTtcbn07XG5cbmV4cG9ydCBjb25zdCBTZWxlY3RlZFJlYWN0aW9uID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAge1snXHUyNzY0XHVGRTBGJywgJ1x1RDgzRFx1REM0RCcsICdcdUQ4M0RcdURDNEUnLCAnXHVEODNEXHVERTAyJywgJ1x1RDgzRFx1REUyRScsICdcdUQ4M0RcdURFMjInLCAnXHVEODNEXHVERTIxJ10ubWFwKGUgPT4gKFxuICAgICAgICA8ZGl2IGtleT17ZX0gc3R5bGU9e3sgaGVpZ2h0OiAnMTAwcHgnIH19PlxuICAgICAgICAgIDxSZWFjdGlvblBpY2tlclxuICAgICAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgICAgIHNlbGVjdGVkPXtlfVxuICAgICAgICAgICAgb25QaWNrPXthY3Rpb24oJ29uUGljaycpfVxuICAgICAgICAgICAgb25TZXRTa2luVG9uZT17YWN0aW9uKCdvblNldFNraW5Ub25lJyl9XG4gICAgICAgICAgICBvcGVuQ3VzdG9taXplUHJlZmVycmVkUmVhY3Rpb25zTW9kYWw9e2FjdGlvbihcbiAgICAgICAgICAgICAgJ29wZW5DdXN0b21pemVQcmVmZXJyZWRSZWFjdGlvbnNNb2RhbCdcbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICBwcmVmZXJyZWRSZWFjdGlvbkVtb2ppPXtwcmVmZXJyZWRSZWFjdGlvbkVtb2ppfVxuICAgICAgICAgICAgcmVuZGVyRW1vamlQaWNrZXI9e3JlbmRlckVtb2ppUGlja2VyfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKSl9XG4gICAgPC8+XG4gICk7XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxZQUF1QjtBQUV2QiwyQkFBdUI7QUFFdkIsdUJBQTBCO0FBQzFCLHNCQUF1QjtBQUV2Qiw0QkFBK0I7QUFDL0IseUJBQTRCO0FBRTVCLE1BQU0sT0FBTyxnQ0FBVSxNQUFNLHVCQUFVO0FBRXZDLE1BQU0seUJBQXlCLENBQUMsZ0JBQU0sYUFBTSxhQUFNLGFBQU0sYUFBTSxXQUFJO0FBRWxFLE1BQU0sb0JBQThELHdCQUFDO0FBQUEsRUFDbkU7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxNQUVBLG9DQUFDO0FBQUEsRUFDQztBQUFBLEVBQ0EsVUFBVTtBQUFBLEVBQ1Y7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxDQUNGLEdBYmtFO0FBZ0JwRSxJQUFPLGlDQUFRO0FBQUEsRUFDYixPQUFPO0FBQ1Q7QUFFTyxNQUFNLE9BQU8sNkJBQW1CO0FBQ3JDLFNBQ0Usb0NBQUM7QUFBQSxJQUNDO0FBQUEsSUFDQSxRQUFRLGlDQUFPLFFBQVE7QUFBQSxJQUN2QixlQUFlLGlDQUFPLGVBQWU7QUFBQSxJQUNyQyxzQ0FBc0MsaUNBQ3BDLHNDQUNGO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxHQUNGO0FBRUosR0Fib0I7QUFlYixNQUFNLG1CQUFtQiw2QkFBbUI7QUFDakQsU0FDRSwwREFDRyxDQUFDLGdCQUFNLGFBQU0sYUFBTSxhQUFNLGFBQU0sYUFBTSxXQUFJLEVBQUUsSUFBSSxPQUM5QyxvQ0FBQztBQUFBLElBQUksS0FBSztBQUFBLElBQUcsT0FBTyxFQUFFLFFBQVEsUUFBUTtBQUFBLEtBQ3BDLG9DQUFDO0FBQUEsSUFDQztBQUFBLElBQ0EsVUFBVTtBQUFBLElBQ1YsUUFBUSxpQ0FBTyxRQUFRO0FBQUEsSUFDdkIsZUFBZSxpQ0FBTyxlQUFlO0FBQUEsSUFDckMsc0NBQXNDLGlDQUNwQyxzQ0FDRjtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsR0FDRixDQUNGLENBQ0QsQ0FDSDtBQUVKLEdBcEJnQzsiLAogICJuYW1lcyI6IFtdCn0K
