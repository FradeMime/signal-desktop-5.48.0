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
var CustomizingPreferredReactionsModal_exports = {};
__export(CustomizingPreferredReactionsModal_exports, {
  CustomizingPreferredReactionsModal: () => CustomizingPreferredReactionsModal
});
module.exports = __toCommonJS(CustomizingPreferredReactionsModal_exports);
var import_react = __toESM(require("react"));
var import_react_popper = require("react-popper");
var import_lodash = require("lodash");
var import_Modal = require("./Modal");
var import_Button = require("./Button");
var import_ReactionPickerPicker = require("./ReactionPickerPicker");
var import_EmojiPicker = require("./emoji/EmojiPicker");
var import_constants = require("../reactions/constants");
var import_lib = require("./emoji/lib");
var import_popperUtil = require("../util/popperUtil");
function CustomizingPreferredReactionsModal({
  cancelCustomizePreferredReactionsModal,
  deselectDraftEmoji,
  draftPreferredReactions,
  hadSaveError,
  i18n,
  isSaving,
  onSetSkinTone,
  originalPreferredReactions,
  recentEmojis,
  replaceSelectedDraftEmoji,
  resetDraftEmoji,
  savePreferredReactions,
  selectDraftEmojiToBeReplaced,
  selectedDraftEmojiIndex,
  skinTone
}) {
  const [referenceElement, setReferenceElement] = (0, import_react.useState)(null);
  const [popperElement, setPopperElement] = (0, import_react.useState)(null);
  const emojiPickerPopper = (0, import_react_popper.usePopper)(referenceElement, popperElement, {
    placement: "bottom",
    modifiers: [
      (0, import_popperUtil.offsetDistanceModifier)(8),
      {
        name: "preventOverflow",
        options: { altAxis: true }
      }
    ]
  });
  const isSomethingSelected = selectedDraftEmojiIndex !== void 0;
  (0, import_react.useEffect)(() => {
    if (!isSomethingSelected) {
      return import_lodash.noop;
    }
    const onBodyClick = /* @__PURE__ */ __name((event) => {
      const { target } = event;
      if (!(target instanceof HTMLElement) || !popperElement) {
        return;
      }
      const isClickOutsidePicker = !popperElement.contains(target);
      if (isClickOutsidePicker) {
        deselectDraftEmoji();
      }
    }, "onBodyClick");
    document.body.addEventListener("click", onBodyClick);
    return () => {
      document.body.removeEventListener("click", onBodyClick);
    };
  }, [isSomethingSelected, popperElement, deselectDraftEmoji]);
  const hasChanged = !(0, import_lodash.isEqual)(originalPreferredReactions, draftPreferredReactions);
  const canReset = !isSaving && !(0, import_lodash.isEqual)(import_constants.DEFAULT_PREFERRED_REACTION_EMOJI_SHORT_NAMES.map((shortName) => (0, import_lib.convertShortName)(shortName, skinTone)), draftPreferredReactions);
  const canSave = !isSaving && hasChanged;
  return /* @__PURE__ */ import_react.default.createElement(import_Modal.Modal, {
    moduleClassName: "module-CustomizingPreferredReactionsModal",
    hasXButton: true,
    i18n,
    onClose: () => {
      cancelCustomizePreferredReactionsModal();
    },
    title: i18n("CustomizingPreferredReactions__title")
  }, /* @__PURE__ */ import_react.default.createElement("div", {
    className: "module-CustomizingPreferredReactionsModal__small-emoji-picker-wrapper"
  }, /* @__PURE__ */ import_react.default.createElement(import_ReactionPickerPicker.ReactionPickerPicker, {
    isSomethingSelected,
    pickerStyle: import_ReactionPickerPicker.ReactionPickerPickerStyle.Menu,
    ref: setReferenceElement
  }, draftPreferredReactions.map((emoji, index) => /* @__PURE__ */ import_react.default.createElement(import_ReactionPickerPicker.ReactionPickerPickerEmojiButton, {
    emoji,
    key: index,
    onClick: () => {
      selectDraftEmojiToBeReplaced(index);
    },
    isSelected: index === selectedDraftEmojiIndex
  }))), hadSaveError ? i18n("CustomizingPreferredReactions__had-save-error") : i18n("CustomizingPreferredReactions__subtitle")), isSomethingSelected && /* @__PURE__ */ import_react.default.createElement("div", {
    ref: setPopperElement,
    style: emojiPickerPopper.styles.popper,
    ...emojiPickerPopper.attributes.popper
  }, /* @__PURE__ */ import_react.default.createElement(import_EmojiPicker.EmojiPicker, {
    i18n,
    onPickEmoji: (pickedEmoji) => {
      const emoji = (0, import_lib.convertShortName)(pickedEmoji.shortName, pickedEmoji.skinTone);
      replaceSelectedDraftEmoji(emoji);
    },
    recentEmojis,
    skinTone,
    onSetSkinTone,
    onClose: () => {
      deselectDraftEmoji();
    }
  })), /* @__PURE__ */ import_react.default.createElement(import_Modal.Modal.ButtonFooter, null, /* @__PURE__ */ import_react.default.createElement(import_Button.Button, {
    disabled: !canReset,
    onClick: () => {
      resetDraftEmoji();
    },
    variant: import_Button.ButtonVariant.SecondaryAffirmative
  }, i18n("reset")), /* @__PURE__ */ import_react.default.createElement(import_Button.Button, {
    disabled: !canSave,
    onClick: () => {
      savePreferredReactions();
    }
  }, i18n("save"))));
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CustomizingPreferredReactionsModal
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ3VzdG9taXppbmdQcmVmZXJyZWRSZWFjdGlvbnNNb2RhbC50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB1c2VQb3BwZXIgfSBmcm9tICdyZWFjdC1wb3BwZXInO1xuaW1wb3J0IHsgaXNFcXVhbCwgbm9vcCB9IGZyb20gJ2xvZGFzaCc7XG5cbmltcG9ydCB0eXBlIHsgTG9jYWxpemVyVHlwZSB9IGZyb20gJy4uL3R5cGVzL1V0aWwnO1xuaW1wb3J0IHsgTW9kYWwgfSBmcm9tICcuL01vZGFsJztcbmltcG9ydCB7IEJ1dHRvbiwgQnV0dG9uVmFyaWFudCB9IGZyb20gJy4vQnV0dG9uJztcbmltcG9ydCB7XG4gIFJlYWN0aW9uUGlja2VyUGlja2VyLFxuICBSZWFjdGlvblBpY2tlclBpY2tlckVtb2ppQnV0dG9uLFxuICBSZWFjdGlvblBpY2tlclBpY2tlclN0eWxlLFxufSBmcm9tICcuL1JlYWN0aW9uUGlja2VyUGlja2VyJztcbmltcG9ydCB7IEVtb2ppUGlja2VyIH0gZnJvbSAnLi9lbW9qaS9FbW9qaVBpY2tlcic7XG5pbXBvcnQgeyBERUZBVUxUX1BSRUZFUlJFRF9SRUFDVElPTl9FTU9KSV9TSE9SVF9OQU1FUyB9IGZyb20gJy4uL3JlYWN0aW9ucy9jb25zdGFudHMnO1xuaW1wb3J0IHsgY29udmVydFNob3J0TmFtZSB9IGZyb20gJy4vZW1vamkvbGliJztcbmltcG9ydCB7IG9mZnNldERpc3RhbmNlTW9kaWZpZXIgfSBmcm9tICcuLi91dGlsL3BvcHBlclV0aWwnO1xuXG50eXBlIFByb3BzVHlwZSA9IHtcbiAgZHJhZnRQcmVmZXJyZWRSZWFjdGlvbnM6IEFycmF5PHN0cmluZz47XG4gIGhhZFNhdmVFcnJvcjogYm9vbGVhbjtcbiAgaTE4bjogTG9jYWxpemVyVHlwZTtcbiAgaXNTYXZpbmc6IGJvb2xlYW47XG4gIG9yaWdpbmFsUHJlZmVycmVkUmVhY3Rpb25zOiBBcnJheTxzdHJpbmc+O1xuICByZWNlbnRFbW9qaXM6IEFycmF5PHN0cmluZz47XG4gIHNlbGVjdGVkRHJhZnRFbW9qaUluZGV4OiB1bmRlZmluZWQgfCBudW1iZXI7XG4gIHNraW5Ub25lOiBudW1iZXI7XG5cbiAgY2FuY2VsQ3VzdG9taXplUHJlZmVycmVkUmVhY3Rpb25zTW9kYWwoKTogdW5rbm93bjtcbiAgZGVzZWxlY3REcmFmdEVtb2ppKCk6IHVua25vd247XG4gIG9uU2V0U2tpblRvbmUodG9uZTogbnVtYmVyKTogdW5rbm93bjtcbiAgcmVwbGFjZVNlbGVjdGVkRHJhZnRFbW9qaShuZXdFbW9qaTogc3RyaW5nKTogdW5rbm93bjtcbiAgcmVzZXREcmFmdEVtb2ppKCk6IHVua25vd247XG4gIHNhdmVQcmVmZXJyZWRSZWFjdGlvbnMoKTogdW5rbm93bjtcbiAgc2VsZWN0RHJhZnRFbW9qaVRvQmVSZXBsYWNlZChpbmRleDogbnVtYmVyKTogdW5rbm93bjtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBDdXN0b21pemluZ1ByZWZlcnJlZFJlYWN0aW9uc01vZGFsKHtcbiAgY2FuY2VsQ3VzdG9taXplUHJlZmVycmVkUmVhY3Rpb25zTW9kYWwsXG4gIGRlc2VsZWN0RHJhZnRFbW9qaSxcbiAgZHJhZnRQcmVmZXJyZWRSZWFjdGlvbnMsXG4gIGhhZFNhdmVFcnJvcixcbiAgaTE4bixcbiAgaXNTYXZpbmcsXG4gIG9uU2V0U2tpblRvbmUsXG4gIG9yaWdpbmFsUHJlZmVycmVkUmVhY3Rpb25zLFxuICByZWNlbnRFbW9qaXMsXG4gIHJlcGxhY2VTZWxlY3RlZERyYWZ0RW1vamksXG4gIHJlc2V0RHJhZnRFbW9qaSxcbiAgc2F2ZVByZWZlcnJlZFJlYWN0aW9ucyxcbiAgc2VsZWN0RHJhZnRFbW9qaVRvQmVSZXBsYWNlZCxcbiAgc2VsZWN0ZWREcmFmdEVtb2ppSW5kZXgsXG4gIHNraW5Ub25lLFxufTogUmVhZG9ubHk8UHJvcHNUeXBlPik6IEpTWC5FbGVtZW50IHtcbiAgY29uc3QgW3JlZmVyZW5jZUVsZW1lbnQsIHNldFJlZmVyZW5jZUVsZW1lbnRdID1cbiAgICB1c2VTdGF0ZTxudWxsIHwgSFRNTERpdkVsZW1lbnQ+KG51bGwpO1xuICBjb25zdCBbcG9wcGVyRWxlbWVudCwgc2V0UG9wcGVyRWxlbWVudF0gPSB1c2VTdGF0ZTxudWxsIHwgSFRNTERpdkVsZW1lbnQ+KFxuICAgIG51bGxcbiAgKTtcbiAgY29uc3QgZW1vamlQaWNrZXJQb3BwZXIgPSB1c2VQb3BwZXIocmVmZXJlbmNlRWxlbWVudCwgcG9wcGVyRWxlbWVudCwge1xuICAgIHBsYWNlbWVudDogJ2JvdHRvbScsXG4gICAgbW9kaWZpZXJzOiBbXG4gICAgICBvZmZzZXREaXN0YW5jZU1vZGlmaWVyKDgpLFxuICAgICAge1xuICAgICAgICBuYW1lOiAncHJldmVudE92ZXJmbG93JyxcbiAgICAgICAgb3B0aW9uczogeyBhbHRBeGlzOiB0cnVlIH0sXG4gICAgICB9LFxuICAgIF0sXG4gIH0pO1xuXG4gIGNvbnN0IGlzU29tZXRoaW5nU2VsZWN0ZWQgPSBzZWxlY3RlZERyYWZ0RW1vamlJbmRleCAhPT0gdW5kZWZpbmVkO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFpc1NvbWV0aGluZ1NlbGVjdGVkKSB7XG4gICAgICByZXR1cm4gbm9vcDtcbiAgICB9XG5cbiAgICBjb25zdCBvbkJvZHlDbGljayA9IChldmVudDogTW91c2VFdmVudCkgPT4ge1xuICAgICAgY29uc3QgeyB0YXJnZXQgfSA9IGV2ZW50O1xuICAgICAgaWYgKCEodGFyZ2V0IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHx8ICFwb3BwZXJFbGVtZW50KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgaXNDbGlja091dHNpZGVQaWNrZXIgPSAhcG9wcGVyRWxlbWVudC5jb250YWlucyh0YXJnZXQpO1xuICAgICAgaWYgKGlzQ2xpY2tPdXRzaWRlUGlja2VyKSB7XG4gICAgICAgIGRlc2VsZWN0RHJhZnRFbW9qaSgpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25Cb2R5Q2xpY2spO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25Cb2R5Q2xpY2spO1xuICAgIH07XG4gIH0sIFtpc1NvbWV0aGluZ1NlbGVjdGVkLCBwb3BwZXJFbGVtZW50LCBkZXNlbGVjdERyYWZ0RW1vamldKTtcblxuICBjb25zdCBoYXNDaGFuZ2VkID0gIWlzRXF1YWwoXG4gICAgb3JpZ2luYWxQcmVmZXJyZWRSZWFjdGlvbnMsXG4gICAgZHJhZnRQcmVmZXJyZWRSZWFjdGlvbnNcbiAgKTtcbiAgY29uc3QgY2FuUmVzZXQgPVxuICAgICFpc1NhdmluZyAmJlxuICAgICFpc0VxdWFsKFxuICAgICAgREVGQVVMVF9QUkVGRVJSRURfUkVBQ1RJT05fRU1PSklfU0hPUlRfTkFNRVMubWFwKHNob3J0TmFtZSA9PlxuICAgICAgICBjb252ZXJ0U2hvcnROYW1lKHNob3J0TmFtZSwgc2tpblRvbmUpXG4gICAgICApLFxuICAgICAgZHJhZnRQcmVmZXJyZWRSZWFjdGlvbnNcbiAgICApO1xuICBjb25zdCBjYW5TYXZlID0gIWlzU2F2aW5nICYmIGhhc0NoYW5nZWQ7XG5cbiAgcmV0dXJuIChcbiAgICA8TW9kYWxcbiAgICAgIG1vZHVsZUNsYXNzTmFtZT1cIm1vZHVsZS1DdXN0b21pemluZ1ByZWZlcnJlZFJlYWN0aW9uc01vZGFsXCJcbiAgICAgIGhhc1hCdXR0b25cbiAgICAgIGkxOG49e2kxOG59XG4gICAgICBvbkNsb3NlPXsoKSA9PiB7XG4gICAgICAgIGNhbmNlbEN1c3RvbWl6ZVByZWZlcnJlZFJlYWN0aW9uc01vZGFsKCk7XG4gICAgICB9fVxuICAgICAgdGl0bGU9e2kxOG4oJ0N1c3RvbWl6aW5nUHJlZmVycmVkUmVhY3Rpb25zX190aXRsZScpfVxuICAgID5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kdWxlLUN1c3RvbWl6aW5nUHJlZmVycmVkUmVhY3Rpb25zTW9kYWxfX3NtYWxsLWVtb2ppLXBpY2tlci13cmFwcGVyXCI+XG4gICAgICAgIDxSZWFjdGlvblBpY2tlclBpY2tlclxuICAgICAgICAgIGlzU29tZXRoaW5nU2VsZWN0ZWQ9e2lzU29tZXRoaW5nU2VsZWN0ZWR9XG4gICAgICAgICAgcGlja2VyU3R5bGU9e1JlYWN0aW9uUGlja2VyUGlja2VyU3R5bGUuTWVudX1cbiAgICAgICAgICByZWY9e3NldFJlZmVyZW5jZUVsZW1lbnR9XG4gICAgICAgID5cbiAgICAgICAgICB7ZHJhZnRQcmVmZXJyZWRSZWFjdGlvbnMubWFwKChlbW9qaSwgaW5kZXgpID0+IChcbiAgICAgICAgICAgIDxSZWFjdGlvblBpY2tlclBpY2tlckVtb2ppQnV0dG9uXG4gICAgICAgICAgICAgIGVtb2ppPXtlbW9qaX1cbiAgICAgICAgICAgICAgLy8gVGhlIGluZGV4IGlzIHRoZSBvbmx5IHRoaW5nIHRoYXQgdW5pcXVlbHkgaWRlbnRpZmllcyB0aGUgZW1vamksIGJlY2F1c2VcbiAgICAgICAgICAgICAgLy8gICB0aGVyZSBjYW4gYmUgZHVwbGljYXRlcyBpbiB0aGUgbGlzdC5cbiAgICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlYWN0L25vLWFycmF5LWluZGV4LWtleVxuICAgICAgICAgICAgICBrZXk9e2luZGV4fVxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgc2VsZWN0RHJhZnRFbW9qaVRvQmVSZXBsYWNlZChpbmRleCk7XG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgIGlzU2VsZWN0ZWQ9e2luZGV4ID09PSBzZWxlY3RlZERyYWZ0RW1vamlJbmRleH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKSl9XG4gICAgICAgIDwvUmVhY3Rpb25QaWNrZXJQaWNrZXI+XG4gICAgICAgIHtoYWRTYXZlRXJyb3JcbiAgICAgICAgICA/IGkxOG4oJ0N1c3RvbWl6aW5nUHJlZmVycmVkUmVhY3Rpb25zX19oYWQtc2F2ZS1lcnJvcicpXG4gICAgICAgICAgOiBpMThuKCdDdXN0b21pemluZ1ByZWZlcnJlZFJlYWN0aW9uc19fc3VidGl0bGUnKX1cbiAgICAgIDwvZGl2PlxuICAgICAge2lzU29tZXRoaW5nU2VsZWN0ZWQgJiYgKFxuICAgICAgICA8ZGl2XG4gICAgICAgICAgcmVmPXtzZXRQb3BwZXJFbGVtZW50fVxuICAgICAgICAgIHN0eWxlPXtlbW9qaVBpY2tlclBvcHBlci5zdHlsZXMucG9wcGVyfVxuICAgICAgICAgIHsuLi5lbW9qaVBpY2tlclBvcHBlci5hdHRyaWJ1dGVzLnBvcHBlcn1cbiAgICAgICAgPlxuICAgICAgICAgIDxFbW9qaVBpY2tlclxuICAgICAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgICAgIG9uUGlja0Vtb2ppPXtwaWNrZWRFbW9qaSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IGVtb2ppID0gY29udmVydFNob3J0TmFtZShcbiAgICAgICAgICAgICAgICBwaWNrZWRFbW9qaS5zaG9ydE5hbWUsXG4gICAgICAgICAgICAgICAgcGlja2VkRW1vamkuc2tpblRvbmVcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgcmVwbGFjZVNlbGVjdGVkRHJhZnRFbW9qaShlbW9qaSk7XG4gICAgICAgICAgICB9fVxuICAgICAgICAgICAgcmVjZW50RW1vamlzPXtyZWNlbnRFbW9qaXN9XG4gICAgICAgICAgICBza2luVG9uZT17c2tpblRvbmV9XG4gICAgICAgICAgICBvblNldFNraW5Ub25lPXtvblNldFNraW5Ub25lfVxuICAgICAgICAgICAgb25DbG9zZT17KCkgPT4ge1xuICAgICAgICAgICAgICBkZXNlbGVjdERyYWZ0RW1vamkoKTtcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICApfVxuICAgICAgPE1vZGFsLkJ1dHRvbkZvb3Rlcj5cbiAgICAgICAgPEJ1dHRvblxuICAgICAgICAgIGRpc2FibGVkPXshY2FuUmVzZXR9XG4gICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgcmVzZXREcmFmdEVtb2ppKCk7XG4gICAgICAgICAgfX1cbiAgICAgICAgICB2YXJpYW50PXtCdXR0b25WYXJpYW50LlNlY29uZGFyeUFmZmlybWF0aXZlfVxuICAgICAgICA+XG4gICAgICAgICAge2kxOG4oJ3Jlc2V0Jyl9XG4gICAgICAgIDwvQnV0dG9uPlxuICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgZGlzYWJsZWQ9eyFjYW5TYXZlfVxuICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgIHNhdmVQcmVmZXJyZWRSZWFjdGlvbnMoKTtcbiAgICAgICAgICB9fVxuICAgICAgICA+XG4gICAgICAgICAge2kxOG4oJ3NhdmUnKX1cbiAgICAgICAgPC9CdXR0b24+XG4gICAgICA8L01vZGFsLkJ1dHRvbkZvb3Rlcj5cbiAgICA8L01vZGFsPlxuICApO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLG1CQUEyQztBQUMzQywwQkFBMEI7QUFDMUIsb0JBQThCO0FBRzlCLG1CQUFzQjtBQUN0QixvQkFBc0M7QUFDdEMsa0NBSU87QUFDUCx5QkFBNEI7QUFDNUIsdUJBQTZEO0FBQzdELGlCQUFpQztBQUNqQyx3QkFBdUM7QUFxQmhDLDRDQUE0QztBQUFBLEVBQ2pEO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFD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
