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
var CustomizingPreferredReactionsModal_stories_exports = {};
__export(CustomizingPreferredReactionsModal_stories_exports, {
  Default: () => Default,
  DraftEmojiSelected: () => DraftEmojiSelected,
  HadError: () => HadError,
  Saving: () => Saving,
  default: () => CustomizingPreferredReactionsModal_stories_default
});
module.exports = __toCommonJS(CustomizingPreferredReactionsModal_stories_exports);
var import_react = __toESM(require("react"));
var import_addon_actions = require("@storybook/addon-actions");
var import_setupI18n = require("../util/setupI18n");
var import_messages = __toESM(require("../../_locales/en/messages.json"));
var import_CustomizingPreferredReactionsModal = require("./CustomizingPreferredReactionsModal");
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
var CustomizingPreferredReactionsModal_stories_default = {
  title: "Components/CustomizingPreferredReactionsModal"
};
const defaultProps = {
  cancelCustomizePreferredReactionsModal: (0, import_addon_actions.action)("cancelCustomizePreferredReactionsModal"),
  deselectDraftEmoji: (0, import_addon_actions.action)("deselectDraftEmoji"),
  draftPreferredReactions: ["\u2728", "\u2747\uFE0F", "\u{1F387}", "\u{1F988}", "\u{1F496}", "\u{1F17F}\uFE0F"],
  hadSaveError: false,
  i18n,
  isSaving: false,
  onSetSkinTone: (0, import_addon_actions.action)("onSetSkinTone"),
  originalPreferredReactions: ["\u2764\uFE0F", "\u{1F44D}", "\u{1F44E}", "\u{1F602}", "\u{1F62E}", "\u{1F622}"],
  recentEmojis: ["cake"],
  replaceSelectedDraftEmoji: (0, import_addon_actions.action)("replaceSelectedDraftEmoji"),
  resetDraftEmoji: (0, import_addon_actions.action)("resetDraftEmoji"),
  savePreferredReactions: (0, import_addon_actions.action)("savePreferredReactions"),
  selectDraftEmojiToBeReplaced: (0, import_addon_actions.action)("selectDraftEmojiToBeReplaced"),
  selectedDraftEmojiIndex: void 0,
  skinTone: 4
};
const Default = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_CustomizingPreferredReactionsModal.CustomizingPreferredReactionsModal, {
  ...defaultProps
}), "Default");
const DraftEmojiSelected = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_CustomizingPreferredReactionsModal.CustomizingPreferredReactionsModal, {
  ...defaultProps,
  selectedDraftEmojiIndex: 4
}), "DraftEmojiSelected");
DraftEmojiSelected.story = {
  name: "Draft emoji selected"
};
const Saving = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_CustomizingPreferredReactionsModal.CustomizingPreferredReactionsModal, {
  ...defaultProps,
  isSaving: true
}), "Saving");
const HadError = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_CustomizingPreferredReactionsModal.CustomizingPreferredReactionsModal, {
  ...defaultProps,
  hadSaveError: true
}), "HadError");
HadError.story = {
  name: "Had error"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Default,
  DraftEmojiSelected,
  HadError,
  Saving
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ3VzdG9taXppbmdQcmVmZXJyZWRSZWFjdGlvbnNNb2RhbC5zdG9yaWVzLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgdHlwZSB7IENvbXBvbmVudFByb3BzIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgYWN0aW9uIH0gZnJvbSAnQHN0b3J5Ym9vay9hZGRvbi1hY3Rpb25zJztcbmltcG9ydCB7IHNldHVwSTE4biB9IGZyb20gJy4uL3V0aWwvc2V0dXBJMThuJztcbmltcG9ydCBlbk1lc3NhZ2VzIGZyb20gJy4uLy4uL19sb2NhbGVzL2VuL21lc3NhZ2VzLmpzb24nO1xuXG5pbXBvcnQgeyBDdXN0b21pemluZ1ByZWZlcnJlZFJlYWN0aW9uc01vZGFsIH0gZnJvbSAnLi9DdXN0b21pemluZ1ByZWZlcnJlZFJlYWN0aW9uc01vZGFsJztcblxuY29uc3QgaTE4biA9IHNldHVwSTE4bignZW4nLCBlbk1lc3NhZ2VzKTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICB0aXRsZTogJ0NvbXBvbmVudHMvQ3VzdG9taXppbmdQcmVmZXJyZWRSZWFjdGlvbnNNb2RhbCcsXG59O1xuXG5jb25zdCBkZWZhdWx0UHJvcHM6IENvbXBvbmVudFByb3BzPHR5cGVvZiBDdXN0b21pemluZ1ByZWZlcnJlZFJlYWN0aW9uc01vZGFsPiA9XG4gIHtcbiAgICBjYW5jZWxDdXN0b21pemVQcmVmZXJyZWRSZWFjdGlvbnNNb2RhbDogYWN0aW9uKFxuICAgICAgJ2NhbmNlbEN1c3RvbWl6ZVByZWZlcnJlZFJlYWN0aW9uc01vZGFsJ1xuICAgICksXG4gICAgZGVzZWxlY3REcmFmdEVtb2ppOiBhY3Rpb24oJ2Rlc2VsZWN0RHJhZnRFbW9qaScpLFxuICAgIGRyYWZ0UHJlZmVycmVkUmVhY3Rpb25zOiBbJ1x1MjcyOCcsICdcdTI3NDdcdUZFMEYnLCAnXHVEODNDXHVERjg3JywgJ1x1RDgzRVx1REQ4OCcsICdcdUQ4M0RcdURDOTYnLCAnXHVEODNDXHVERDdGXHVGRTBGJ10sXG4gICAgaGFkU2F2ZUVycm9yOiBmYWxzZSxcbiAgICBpMThuLFxuICAgIGlzU2F2aW5nOiBmYWxzZSxcbiAgICBvblNldFNraW5Ub25lOiBhY3Rpb24oJ29uU2V0U2tpblRvbmUnKSxcbiAgICBvcmlnaW5hbFByZWZlcnJlZFJlYWN0aW9uczogWydcdTI3NjRcdUZFMEYnLCAnXHVEODNEXHVEQzREJywgJ1x1RDgzRFx1REM0RScsICdcdUQ4M0RcdURFMDInLCAnXHVEODNEXHVERTJFJywgJ1x1RDgzRFx1REUyMiddLFxuICAgIHJlY2VudEVtb2ppczogWydjYWtlJ10sXG4gICAgcmVwbGFjZVNlbGVjdGVkRHJhZnRFbW9qaTogYWN0aW9uKCdyZXBsYWNlU2VsZWN0ZWREcmFmdEVtb2ppJyksXG4gICAgcmVzZXREcmFmdEVtb2ppOiBhY3Rpb24oJ3Jlc2V0RHJhZnRFbW9qaScpLFxuICAgIHNhdmVQcmVmZXJyZWRSZWFjdGlvbnM6IGFjdGlvbignc2F2ZVByZWZlcnJlZFJlYWN0aW9ucycpLFxuICAgIHNlbGVjdERyYWZ0RW1vamlUb0JlUmVwbGFjZWQ6IGFjdGlvbignc2VsZWN0RHJhZnRFbW9qaVRvQmVSZXBsYWNlZCcpLFxuICAgIHNlbGVjdGVkRHJhZnRFbW9qaUluZGV4OiB1bmRlZmluZWQsXG4gICAgc2tpblRvbmU6IDQsXG4gIH07XG5cbmV4cG9ydCBjb25zdCBEZWZhdWx0ID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPEN1c3RvbWl6aW5nUHJlZmVycmVkUmVhY3Rpb25zTW9kYWwgey4uLmRlZmF1bHRQcm9wc30gLz5cbik7XG5cbmV4cG9ydCBjb25zdCBEcmFmdEVtb2ppU2VsZWN0ZWQgPSAoKTogSlNYLkVsZW1lbnQgPT4gKFxuICA8Q3VzdG9taXppbmdQcmVmZXJyZWRSZWFjdGlvbnNNb2RhbFxuICAgIHsuLi5kZWZhdWx0UHJvcHN9XG4gICAgc2VsZWN0ZWREcmFmdEVtb2ppSW5kZXg9ezR9XG4gIC8+XG4pO1xuXG5EcmFmdEVtb2ppU2VsZWN0ZWQuc3RvcnkgPSB7XG4gIG5hbWU6ICdEcmFmdCBlbW9qaSBzZWxlY3RlZCcsXG59O1xuXG5leHBvcnQgY29uc3QgU2F2aW5nID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPEN1c3RvbWl6aW5nUHJlZmVycmVkUmVhY3Rpb25zTW9kYWwgey4uLmRlZmF1bHRQcm9wc30gaXNTYXZpbmcgLz5cbik7XG5cbmV4cG9ydCBjb25zdCBIYWRFcnJvciA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxDdXN0b21pemluZ1ByZWZlcnJlZFJlYWN0aW9uc01vZGFsIHsuLi5kZWZhdWx0UHJvcHN9IGhhZFNhdmVFcnJvciAvPlxuKTtcblxuSGFkRXJyb3Iuc3RvcnkgPSB7XG4gIG5hbWU6ICdIYWQgZXJyb3InLFxufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUlBLG1CQUFrQjtBQUVsQiwyQkFBdUI7QUFDdkIsdUJBQTBCO0FBQzFCLHNCQUF1QjtBQUV2QixnREFBbUQ7QUFFbkQsTUFBTSxPQUFPLGdDQUFVLE1BQU0sdUJBQVU7QUFFdkMsSUFBTyxxREFBUTtBQUFBLEVBQ2IsT0FBTztBQUNUO0FBRUEsTUFBTSxlQUNKO0FBQUEsRUFDRSx3Q0FBd0MsaUNBQ3RDLHdDQUNGO0FBQUEsRUFDQSxvQkFBb0IsaUNBQU8sb0JBQW9CO0FBQUEsRUFDL0MseUJBQXlCLENBQUMsVUFBSyxnQkFBTSxhQUFNLGFBQU0sYUFBTSxpQkFBSztBQUFBLEVBQzVELGNBQWM7QUFBQSxFQUNkO0FBQUEsRUFDQSxVQUFVO0FBQUEsRUFDVixlQUFlLGlDQUFPLGVBQWU7QUFBQSxFQUNyQyw0QkFBNEIsQ0FBQyxnQkFBTSxhQUFNLGFBQU0sYUFBTSxhQUFNLFdBQUk7QUFBQSxFQUMvRCxjQUFjLENBQUMsTUFBTTtBQUFBLEVBQ3JCLDJCQUEyQixpQ0FBTywyQkFBMkI7QUFBQSxFQUM3RCxpQkFBaUIsaUNBQU8saUJBQWlCO0FBQUEsRUFDekMsd0JBQXdCLGlDQUFPLHdCQUF3QjtBQUFBLEVBQ3ZELDhCQUE4QixpQ0FBTyw4QkFBOEI7QUFBQSxFQUNuRSx5QkFBeUI7QUFBQSxFQUN6QixVQUFVO0FBQ1o7QUFFSyxNQUFNLFVBQVUsNkJBQ3JCLG1EQUFDO0FBQUEsS0FBdUM7QUFBQSxDQUFjLEdBRGpDO0FBSWhCLE1BQU0scUJBQXFCLDZCQUNoQyxtREFBQztBQUFBLEtBQ0s7QUFBQSxFQUNKLHlCQUF5QjtBQUFBLENBQzNCLEdBSmdDO0FBT2xDLG1CQUFtQixRQUFRO0FBQUEsRUFDekIsTUFBTTtBQUNSO0FBRU8sTUFBTSxTQUFTLDZCQUNwQixtREFBQztBQUFBLEtBQXVDO0FBQUEsRUFBYyxVQUFRO0FBQUEsQ0FBQyxHQUQzQztBQUlmLE1BQU0sV0FBVyw2QkFDdEIsbURBQUM7QUFBQSxLQUF1QztBQUFBLEVBQWMsY0FBWTtBQUFBLENBQUMsR0FEN0M7QUFJeEIsU0FBUyxRQUFRO0FBQUEsRUFDZixNQUFNO0FBQ1I7IiwKICAibmFtZXMiOiBbXQp9Cg==
