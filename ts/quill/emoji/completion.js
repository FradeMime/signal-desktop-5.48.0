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
var completion_exports = {};
__export(completion_exports, {
  EmojiCompletion: () => EmojiCompletion
});
module.exports = __toCommonJS(completion_exports);
var import_quill = __toESM(require("quill"));
var import_quill_delta = __toESM(require("quill-delta"));
var import_react = __toESM(require("react"));
var import_lodash = __toESM(require("lodash"));
var import_react_popper = require("react-popper");
var import_classnames = __toESM(require("classnames"));
var import_react_dom = require("react-dom");
var import_lib = require("../../components/emoji/lib");
var import_Emoji = require("../../components/emoji/Emoji");
var import_util = require("../util");
var import_popperUtil = require("../../util/popperUtil");
const Keyboard = import_quill.default.import("modules/keyboard");
class EmojiCompletion {
  constructor(quill, options) {
    this.results = [];
    this.index = 0;
    this.options = options;
    this.root = document.body.appendChild(document.createElement("div"));
    this.quill = quill;
    const clearResults = /* @__PURE__ */ __name(() => {
      if (this.results.length) {
        this.reset();
      }
      return true;
    }, "clearResults");
    const changeIndex = /* @__PURE__ */ __name((by) => () => {
      if (this.results.length) {
        this.changeIndex(by);
        return false;
      }
      return true;
    }, "changeIndex");
    this.quill.keyboard.addBinding({ key: Keyboard.keys.UP }, changeIndex(-1));
    this.quill.keyboard.addBinding({ key: Keyboard.keys.RIGHT }, clearResults);
    this.quill.keyboard.addBinding({ key: Keyboard.keys.DOWN }, changeIndex(1));
    this.quill.keyboard.addBinding({ key: Keyboard.keys.LEFT }, clearResults);
    this.quill.keyboard.addBinding({
      key: 186,
      shiftKey: true
    }, () => this.onTextChange(true));
    this.quill.keyboard.addBinding({
      key: 58
    }, () => this.onTextChange(true));
    this.quill.on("text-change", import_lodash.default.debounce(() => this.onTextChange(), 100));
    this.quill.on("selection-change", this.onSelectionChange.bind(this));
  }
  destroy() {
    this.root.remove();
  }
  changeIndex(by) {
    this.index = (this.index + by + this.results.length) % this.results.length;
    this.render();
  }
  getCurrentLeafTextPartitions() {
    const range = this.quill.getSelection();
    const [blot, index] = this.quill.getLeaf(range ? range.index : -1);
    return (0, import_util.getBlotTextPartitions)(blot.text, index);
  }
  onSelectionChange() {
    this.reset();
  }
  onTextChange(justPressedColon = false) {
    const PASS_THROUGH = true;
    const INTERCEPT = false;
    const range = this.quill.getSelection();
    if (!range)
      return PASS_THROUGH;
    const [blot, index] = this.quill.getLeaf(range.index);
    const [leftTokenTextMatch, rightTokenTextMatch] = (0, import_util.matchBlotTextPartitions)(blot, index, /(?<=^|\s):([-+0-9a-zA-Z_]*)(:?)$/, /^([-+0-9a-zA-Z_]*):/);
    if (leftTokenTextMatch) {
      const [, leftTokenText, isSelfClosing] = leftTokenTextMatch;
      if (isSelfClosing || justPressedColon) {
        if ((0, import_lib.isShortName)(leftTokenText)) {
          const emojiData = (0, import_lib.convertShortNameToData)(leftTokenText, this.options.skinTone);
          const numberOfColons = isSelfClosing ? 2 : 1;
          if (emojiData) {
            this.insertEmoji(emojiData, range.index - leftTokenText.length - numberOfColons, leftTokenText.length + numberOfColons);
            return INTERCEPT;
          }
        } else {
          this.reset();
          return PASS_THROUGH;
        }
      }
      if (rightTokenTextMatch) {
        const [, rightTokenText] = rightTokenTextMatch;
        const tokenText = leftTokenText + rightTokenText;
        if ((0, import_lib.isShortName)(tokenText)) {
          const emojiData = (0, import_lib.convertShortNameToData)(tokenText, this.options.skinTone);
          if (emojiData) {
            this.insertEmoji(emojiData, range.index - leftTokenText.length - 1, tokenText.length + 2);
            return INTERCEPT;
          }
        }
      }
      if (leftTokenText.length < 3) {
        this.reset();
        return PASS_THROUGH;
      }
      const showEmojiResults = (0, import_lib.search)(leftTokenText, 10);
      if (showEmojiResults.length > 0) {
        this.results = showEmojiResults;
        this.index = Math.min(this.results.length - 1, this.index);
        this.render();
      } else if (this.results.length !== 0) {
        this.reset();
      }
    } else if (this.results.length !== 0) {
      this.reset();
    }
    return PASS_THROUGH;
  }
  completeEmoji() {
    const range = this.quill.getSelection();
    if (range === null)
      return;
    const emoji = this.results[this.index];
    const [leafText] = this.getCurrentLeafTextPartitions();
    const tokenTextMatch = /:([-+0-9a-z_]*)(:?)$/.exec(leafText);
    if (tokenTextMatch === null)
      return;
    const [, tokenText] = tokenTextMatch;
    this.insertEmoji(emoji, range.index - tokenText.length - 1, tokenText.length + 1, true);
  }
  insertEmoji(emojiData, index, range, withTrailingSpace = false) {
    const emoji = (0, import_lib.convertShortName)(emojiData.short_name, this.options.skinTone);
    const delta = new import_quill_delta.default().retain(index).delete(range).insert({ emoji });
    if (withTrailingSpace) {
      this.quill.updateContents(delta.insert(" "), "user");
      this.quill.setSelection(index + 2, 0, "user");
    } else {
      this.quill.updateContents(delta, "user");
      this.quill.setSelection(index + 1, 0, "user");
    }
    this.options.onPickEmoji({
      shortName: emojiData.short_name,
      skinTone: this.options.skinTone
    });
    this.reset();
  }
  reset() {
    if (this.results.length) {
      this.results = [];
      this.index = 0;
      this.render();
    }
  }
  onUnmount() {
    document.body.removeChild(this.root);
  }
  render() {
    const { results: emojiResults, index: emojiResultsIndex } = this;
    if (emojiResults.length === 0) {
      this.options.setEmojiPickerElement(null);
      return;
    }
    const element = (0, import_react_dom.createPortal)(/* @__PURE__ */ import_react.default.createElement(import_react_popper.Popper, {
      placement: "top-start",
      modifiers: [import_popperUtil.sameWidthModifier]
    }, ({ ref, style }) => /* @__PURE__ */ import_react.default.createElement("div", {
      ref,
      className: "module-composition-input__suggestions",
      style,
      role: "listbox",
      "aria-expanded": true,
      "aria-activedescendant": `emoji-result--${emojiResults.length ? emojiResults[emojiResultsIndex].short_name : ""}`,
      tabIndex: 0
    }, emojiResults.map((emoji, index) => /* @__PURE__ */ import_react.default.createElement("button", {
      type: "button",
      key: emoji.short_name,
      id: `emoji-result--${emoji.short_name}`,
      role: "option button",
      "aria-selected": emojiResultsIndex === index,
      onClick: () => {
        this.index = index;
        this.completeEmoji();
      },
      className: (0, import_classnames.default)("module-composition-input__suggestions__row", emojiResultsIndex === index ? "module-composition-input__suggestions__row--selected" : null)
    }, /* @__PURE__ */ import_react.default.createElement(import_Emoji.Emoji, {
      shortName: emoji.short_name,
      size: 16,
      skinTone: this.options.skinTone
    }), /* @__PURE__ */ import_react.default.createElement("div", {
      className: "module-composition-input__suggestions__row__short-name"
    }, ":", emoji.short_name, ":"))))), this.root);
    this.options.setEmojiPickerElement(element);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  EmojiCompletion
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiY29tcGxldGlvbi50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIwLTIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgUXVpbGwgZnJvbSAncXVpbGwnO1xuaW1wb3J0IERlbHRhIGZyb20gJ3F1aWxsLWRlbHRhJztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuXG5pbXBvcnQgeyBQb3BwZXIgfSBmcm9tICdyZWFjdC1wb3BwZXInO1xuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgeyBjcmVhdGVQb3J0YWwgfSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IHR5cGUgeyBFbW9qaURhdGEgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL2Vtb2ppL2xpYic7XG5pbXBvcnQge1xuICBzZWFyY2gsXG4gIGNvbnZlcnRTaG9ydE5hbWUsXG4gIGlzU2hvcnROYW1lLFxuICBjb252ZXJ0U2hvcnROYW1lVG9EYXRhLFxufSBmcm9tICcuLi8uLi9jb21wb25lbnRzL2Vtb2ppL2xpYic7XG5pbXBvcnQgeyBFbW9qaSB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvZW1vamkvRW1vamknO1xuaW1wb3J0IHR5cGUgeyBFbW9qaVBpY2tEYXRhVHlwZSB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvZW1vamkvRW1vamlQaWNrZXInO1xuaW1wb3J0IHsgZ2V0QmxvdFRleHRQYXJ0aXRpb25zLCBtYXRjaEJsb3RUZXh0UGFydGl0aW9ucyB9IGZyb20gJy4uL3V0aWwnO1xuaW1wb3J0IHsgc2FtZVdpZHRoTW9kaWZpZXIgfSBmcm9tICcuLi8uLi91dGlsL3BvcHBlclV0aWwnO1xuXG5jb25zdCBLZXlib2FyZCA9IFF1aWxsLmltcG9ydCgnbW9kdWxlcy9rZXlib2FyZCcpO1xuXG50eXBlIEVtb2ppUGlja2VyT3B0aW9ucyA9IHtcbiAgb25QaWNrRW1vamk6IChlbW9qaTogRW1vamlQaWNrRGF0YVR5cGUpID0+IHZvaWQ7XG4gIHNldEVtb2ppUGlja2VyRWxlbWVudDogKGVsZW1lbnQ6IEpTWC5FbGVtZW50IHwgbnVsbCkgPT4gdm9pZDtcbiAgc2tpblRvbmU6IG51bWJlcjtcbn07XG5cbmV4cG9ydCBjbGFzcyBFbW9qaUNvbXBsZXRpb24ge1xuICByZXN1bHRzOiBBcnJheTxFbW9qaURhdGE+O1xuXG4gIGluZGV4OiBudW1iZXI7XG5cbiAgb3B0aW9uczogRW1vamlQaWNrZXJPcHRpb25zO1xuXG4gIHJvb3Q6IEhUTUxEaXZFbGVtZW50O1xuXG4gIHF1aWxsOiBRdWlsbDtcblxuICBjb25zdHJ1Y3RvcihxdWlsbDogUXVpbGwsIG9wdGlvbnM6IEVtb2ppUGlja2VyT3B0aW9ucykge1xuICAgIHRoaXMucmVzdWx0cyA9IFtdO1xuICAgIHRoaXMuaW5kZXggPSAwO1xuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgdGhpcy5yb290ID0gZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSk7XG4gICAgdGhpcy5xdWlsbCA9IHF1aWxsO1xuXG4gICAgY29uc3QgY2xlYXJSZXN1bHRzID0gKCkgPT4ge1xuICAgICAgaWYgKHRoaXMucmVzdWx0cy5sZW5ndGgpIHtcbiAgICAgICAgdGhpcy5yZXNldCgpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuXG4gICAgY29uc3QgY2hhbmdlSW5kZXggPSAoYnk6IG51bWJlcikgPT4gKCk6IGJvb2xlYW4gPT4ge1xuICAgICAgaWYgKHRoaXMucmVzdWx0cy5sZW5ndGgpIHtcbiAgICAgICAgdGhpcy5jaGFuZ2VJbmRleChieSk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcblxuICAgIHRoaXMucXVpbGwua2V5Ym9hcmQuYWRkQmluZGluZyh7IGtleTogS2V5Ym9hcmQua2V5cy5VUCB9LCBjaGFuZ2VJbmRleCgtMSkpO1xuICAgIHRoaXMucXVpbGwua2V5Ym9hcmQuYWRkQmluZGluZyh7IGtleTogS2V5Ym9hcmQua2V5cy5SSUdIVCB9LCBjbGVhclJlc3VsdHMpO1xuICAgIHRoaXMucXVpbGwua2V5Ym9hcmQuYWRkQmluZGluZyh7IGtleTogS2V5Ym9hcmQua2V5cy5ET1dOIH0sIGNoYW5nZUluZGV4KDEpKTtcbiAgICB0aGlzLnF1aWxsLmtleWJvYXJkLmFkZEJpbmRpbmcoeyBrZXk6IEtleWJvYXJkLmtleXMuTEVGVCB9LCBjbGVhclJlc3VsdHMpO1xuICAgIHRoaXMucXVpbGwua2V5Ym9hcmQuYWRkQmluZGluZyhcbiAgICAgIHtcbiAgICAgICAgLy8gMTg2ICsgU2hpZnQgPSBDb2xvblxuICAgICAgICBrZXk6IDE4NixcbiAgICAgICAgc2hpZnRLZXk6IHRydWUsXG4gICAgICB9LFxuICAgICAgKCkgPT4gdGhpcy5vblRleHRDaGFuZ2UodHJ1ZSlcbiAgICApO1xuICAgIHRoaXMucXVpbGwua2V5Ym9hcmQuYWRkQmluZGluZyhcbiAgICAgIHtcbiAgICAgICAgLy8gNTggPSBBbHNvIENvbG9uXG4gICAgICAgIGtleTogNTgsXG4gICAgICB9LFxuICAgICAgKCkgPT4gdGhpcy5vblRleHRDaGFuZ2UodHJ1ZSlcbiAgICApO1xuXG4gICAgdGhpcy5xdWlsbC5vbihcbiAgICAgICd0ZXh0LWNoYW5nZScsXG4gICAgICBfLmRlYm91bmNlKCgpID0+IHRoaXMub25UZXh0Q2hhbmdlKCksIDEwMClcbiAgICApO1xuICAgIHRoaXMucXVpbGwub24oJ3NlbGVjdGlvbi1jaGFuZ2UnLCB0aGlzLm9uU2VsZWN0aW9uQ2hhbmdlLmJpbmQodGhpcykpO1xuICB9XG5cbiAgZGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLnJvb3QucmVtb3ZlKCk7XG4gIH1cblxuICBjaGFuZ2VJbmRleChieTogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5pbmRleCA9ICh0aGlzLmluZGV4ICsgYnkgKyB0aGlzLnJlc3VsdHMubGVuZ3RoKSAlIHRoaXMucmVzdWx0cy5sZW5ndGg7XG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG4gIGdldEN1cnJlbnRMZWFmVGV4dFBhcnRpdGlvbnMoKTogW3N0cmluZywgc3RyaW5nXSB7XG4gICAgY29uc3QgcmFuZ2UgPSB0aGlzLnF1aWxsLmdldFNlbGVjdGlvbigpO1xuICAgIGNvbnN0IFtibG90LCBpbmRleF0gPSB0aGlzLnF1aWxsLmdldExlYWYocmFuZ2UgPyByYW5nZS5pbmRleCA6IC0xKTtcblxuICAgIHJldHVybiBnZXRCbG90VGV4dFBhcnRpdGlvbnMoYmxvdC50ZXh0LCBpbmRleCk7XG4gIH1cblxuICBvblNlbGVjdGlvbkNoYW5nZSgpOiB2b2lkIHtcbiAgICAvLyBTZWxlY3Rpb24gc2hvdWxkIG5ldmVyIGNoYW5nZSB3aGlsZSB3ZSdyZSBlZGl0aW5nIGFuIGVtb2ppXG4gICAgdGhpcy5yZXNldCgpO1xuICB9XG5cbiAgb25UZXh0Q2hhbmdlKGp1c3RQcmVzc2VkQ29sb24gPSBmYWxzZSk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IFBBU1NfVEhST1VHSCA9IHRydWU7XG4gICAgY29uc3QgSU5URVJDRVBUID0gZmFsc2U7XG5cbiAgICBjb25zdCByYW5nZSA9IHRoaXMucXVpbGwuZ2V0U2VsZWN0aW9uKCk7XG5cbiAgICBpZiAoIXJhbmdlKSByZXR1cm4gUEFTU19USFJPVUdIO1xuXG4gICAgY29uc3QgW2Jsb3QsIGluZGV4XSA9IHRoaXMucXVpbGwuZ2V0TGVhZihyYW5nZS5pbmRleCk7XG4gICAgY29uc3QgW2xlZnRUb2tlblRleHRNYXRjaCwgcmlnaHRUb2tlblRleHRNYXRjaF0gPSBtYXRjaEJsb3RUZXh0UGFydGl0aW9ucyhcbiAgICAgIGJsb3QsXG4gICAgICBpbmRleCxcbiAgICAgIC8oPzw9XnxcXHMpOihbLSswLTlhLXpBLVpfXSopKDo/KSQvLFxuICAgICAgL14oWy0rMC05YS16QS1aX10qKTovXG4gICAgKTtcblxuICAgIGlmIChsZWZ0VG9rZW5UZXh0TWF0Y2gpIHtcbiAgICAgIGNvbnN0IFssIGxlZnRUb2tlblRleHQsIGlzU2VsZkNsb3NpbmddID0gbGVmdFRva2VuVGV4dE1hdGNoO1xuXG4gICAgICBpZiAoaXNTZWxmQ2xvc2luZyB8fCBqdXN0UHJlc3NlZENvbG9uKSB7XG4gICAgICAgIGlmIChpc1Nob3J0TmFtZShsZWZ0VG9rZW5UZXh0KSkge1xuICAgICAgICAgIGNvbnN0IGVtb2ppRGF0YSA9IGNvbnZlcnRTaG9ydE5hbWVUb0RhdGEoXG4gICAgICAgICAgICBsZWZ0VG9rZW5UZXh0LFxuICAgICAgICAgICAgdGhpcy5vcHRpb25zLnNraW5Ub25lXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIGNvbnN0IG51bWJlck9mQ29sb25zID0gaXNTZWxmQ2xvc2luZyA/IDIgOiAxO1xuXG4gICAgICAgICAgaWYgKGVtb2ppRGF0YSkge1xuICAgICAgICAgICAgdGhpcy5pbnNlcnRFbW9qaShcbiAgICAgICAgICAgICAgZW1vamlEYXRhLFxuICAgICAgICAgICAgICByYW5nZS5pbmRleCAtIGxlZnRUb2tlblRleHQubGVuZ3RoIC0gbnVtYmVyT2ZDb2xvbnMsXG4gICAgICAgICAgICAgIGxlZnRUb2tlblRleHQubGVuZ3RoICsgbnVtYmVyT2ZDb2xvbnNcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICByZXR1cm4gSU5URVJDRVBUO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnJlc2V0KCk7XG4gICAgICAgICAgcmV0dXJuIFBBU1NfVEhST1VHSDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAocmlnaHRUb2tlblRleHRNYXRjaCkge1xuICAgICAgICBjb25zdCBbLCByaWdodFRva2VuVGV4dF0gPSByaWdodFRva2VuVGV4dE1hdGNoO1xuICAgICAgICBjb25zdCB0b2tlblRleHQgPSBsZWZ0VG9rZW5UZXh0ICsgcmlnaHRUb2tlblRleHQ7XG5cbiAgICAgICAgaWYgKGlzU2hvcnROYW1lKHRva2VuVGV4dCkpIHtcbiAgICAgICAgICBjb25zdCBlbW9qaURhdGEgPSBjb252ZXJ0U2hvcnROYW1lVG9EYXRhKFxuICAgICAgICAgICAgdG9rZW5UZXh0LFxuICAgICAgICAgICAgdGhpcy5vcHRpb25zLnNraW5Ub25lXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIGlmIChlbW9qaURhdGEpIHtcbiAgICAgICAgICAgIHRoaXMuaW5zZXJ0RW1vamkoXG4gICAgICAgICAgICAgIGVtb2ppRGF0YSxcbiAgICAgICAgICAgICAgcmFuZ2UuaW5kZXggLSBsZWZ0VG9rZW5UZXh0Lmxlbmd0aCAtIDEsXG4gICAgICAgICAgICAgIHRva2VuVGV4dC5sZW5ndGggKyAyXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcmV0dXJuIElOVEVSQ0VQVDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGxlZnRUb2tlblRleHQubGVuZ3RoIDwgMykge1xuICAgICAgICB0aGlzLnJlc2V0KCk7XG4gICAgICAgIHJldHVybiBQQVNTX1RIUk9VR0g7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHNob3dFbW9qaVJlc3VsdHMgPSBzZWFyY2gobGVmdFRva2VuVGV4dCwgMTApO1xuXG4gICAgICBpZiAoc2hvd0Vtb2ppUmVzdWx0cy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRoaXMucmVzdWx0cyA9IHNob3dFbW9qaVJlc3VsdHM7XG4gICAgICAgIHRoaXMuaW5kZXggPSBNYXRoLm1pbih0aGlzLnJlc3VsdHMubGVuZ3RoIC0gMSwgdGhpcy5pbmRleCk7XG4gICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMucmVzdWx0cy5sZW5ndGggIT09IDApIHtcbiAgICAgICAgdGhpcy5yZXNldCgpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodGhpcy5yZXN1bHRzLmxlbmd0aCAhPT0gMCkge1xuICAgICAgdGhpcy5yZXNldCgpO1xuICAgIH1cblxuICAgIHJldHVybiBQQVNTX1RIUk9VR0g7XG4gIH1cblxuICBjb21wbGV0ZUVtb2ppKCk6IHZvaWQge1xuICAgIGNvbnN0IHJhbmdlID0gdGhpcy5xdWlsbC5nZXRTZWxlY3Rpb24oKTtcblxuICAgIGlmIChyYW5nZSA9PT0gbnVsbCkgcmV0dXJuO1xuXG4gICAgY29uc3QgZW1vamkgPSB0aGlzLnJlc3VsdHNbdGhpcy5pbmRleF07XG4gICAgY29uc3QgW2xlYWZUZXh0XSA9IHRoaXMuZ2V0Q3VycmVudExlYWZUZXh0UGFydGl0aW9ucygpO1xuXG4gICAgY29uc3QgdG9rZW5UZXh0TWF0Y2ggPSAvOihbLSswLTlhLXpfXSopKDo/KSQvLmV4ZWMobGVhZlRleHQpO1xuXG4gICAgaWYgKHRva2VuVGV4dE1hdGNoID09PSBudWxsKSByZXR1cm47XG5cbiAgICBjb25zdCBbLCB0b2tlblRleHRdID0gdG9rZW5UZXh0TWF0Y2g7XG5cbiAgICB0aGlzLmluc2VydEVtb2ppKFxuICAgICAgZW1vamksXG4gICAgICByYW5nZS5pbmRleCAtIHRva2VuVGV4dC5sZW5ndGggLSAxLFxuICAgICAgdG9rZW5UZXh0Lmxlbmd0aCArIDEsXG4gICAgICB0cnVlXG4gICAgKTtcbiAgfVxuXG4gIGluc2VydEVtb2ppKFxuICAgIGVtb2ppRGF0YTogRW1vamlEYXRhLFxuICAgIGluZGV4OiBudW1iZXIsXG4gICAgcmFuZ2U6IG51bWJlcixcbiAgICB3aXRoVHJhaWxpbmdTcGFjZSA9IGZhbHNlXG4gICk6IHZvaWQge1xuICAgIGNvbnN0IGVtb2ppID0gY29udmVydFNob3J0TmFtZShlbW9qaURhdGEuc2hvcnRfbmFtZSwgdGhpcy5vcHRpb25zLnNraW5Ub25lKTtcblxuICAgIGNvbnN0IGRlbHRhID0gbmV3IERlbHRhKCkucmV0YWluKGluZGV4KS5kZWxldGUocmFuZ2UpLmluc2VydCh7IGVtb2ppIH0pO1xuXG4gICAgaWYgKHdpdGhUcmFpbGluZ1NwYWNlKSB7XG4gICAgICB0aGlzLnF1aWxsLnVwZGF0ZUNvbnRlbnRzKGRlbHRhLmluc2VydCgnICcpLCAndXNlcicpO1xuICAgICAgdGhpcy5xdWlsbC5zZXRTZWxlY3Rpb24oaW5kZXggKyAyLCAwLCAndXNlcicpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnF1aWxsLnVwZGF0ZUNvbnRlbnRzKGRlbHRhLCAndXNlcicpO1xuICAgICAgdGhpcy5xdWlsbC5zZXRTZWxlY3Rpb24oaW5kZXggKyAxLCAwLCAndXNlcicpO1xuICAgIH1cblxuICAgIHRoaXMub3B0aW9ucy5vblBpY2tFbW9qaSh7XG4gICAgICBzaG9ydE5hbWU6IGVtb2ppRGF0YS5zaG9ydF9uYW1lLFxuICAgICAgc2tpblRvbmU6IHRoaXMub3B0aW9ucy5za2luVG9uZSxcbiAgICB9KTtcblxuICAgIHRoaXMucmVzZXQoKTtcbiAgfVxuXG4gIHJlc2V0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnJlc3VsdHMubGVuZ3RoKSB7XG4gICAgICB0aGlzLnJlc3VsdHMgPSBbXTtcbiAgICAgIHRoaXMuaW5kZXggPSAwO1xuXG4gICAgICB0aGlzLnJlbmRlcigpO1xuICAgIH1cbiAgfVxuXG4gIG9uVW5tb3VudCgpOiB2b2lkIHtcbiAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHRoaXMucm9vdCk7XG4gIH1cblxuICByZW5kZXIoKTogdm9pZCB7XG4gICAgY29uc3QgeyByZXN1bHRzOiBlbW9qaVJlc3VsdHMsIGluZGV4OiBlbW9qaVJlc3VsdHNJbmRleCB9ID0gdGhpcztcblxuICAgIGlmIChlbW9qaVJlc3VsdHMubGVuZ3RoID09PSAwKSB7XG4gICAgICB0aGlzLm9wdGlvbnMuc2V0RW1vamlQaWNrZXJFbGVtZW50KG51bGwpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGVsZW1lbnQgPSBjcmVhdGVQb3J0YWwoXG4gICAgICA8UG9wcGVyIHBsYWNlbWVudD1cInRvcC1zdGFydFwiIG1vZGlmaWVycz17W3NhbWVXaWR0aE1vZGlmaWVyXX0+XG4gICAgICAgIHsoeyByZWYsIHN0eWxlIH0pID0+IChcbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cIm1vZHVsZS1jb21wb3NpdGlvbi1pbnB1dF9fc3VnZ2VzdGlvbnNcIlxuICAgICAgICAgICAgc3R5bGU9e3N0eWxlfVxuICAgICAgICAgICAgcm9sZT1cImxpc3Rib3hcIlxuICAgICAgICAgICAgYXJpYS1leHBhbmRlZFxuICAgICAgICAgICAgYXJpYS1hY3RpdmVkZXNjZW5kYW50PXtgZW1vamktcmVzdWx0LS0ke1xuICAgICAgICAgICAgICBlbW9qaVJlc3VsdHMubGVuZ3RoXG4gICAgICAgICAgICAgICAgPyBlbW9qaVJlc3VsdHNbZW1vamlSZXN1bHRzSW5kZXhdLnNob3J0X25hbWVcbiAgICAgICAgICAgICAgICA6ICcnXG4gICAgICAgICAgICB9YH1cbiAgICAgICAgICAgIHRhYkluZGV4PXswfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtlbW9qaVJlc3VsdHMubWFwKChlbW9qaSwgaW5kZXgpID0+IChcbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgIGtleT17ZW1vamkuc2hvcnRfbmFtZX1cbiAgICAgICAgICAgICAgICBpZD17YGVtb2ppLXJlc3VsdC0tJHtlbW9qaS5zaG9ydF9uYW1lfWB9XG4gICAgICAgICAgICAgICAgcm9sZT1cIm9wdGlvbiBidXR0b25cIlxuICAgICAgICAgICAgICAgIGFyaWEtc2VsZWN0ZWQ9e2Vtb2ppUmVzdWx0c0luZGV4ID09PSBpbmRleH1cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICB0aGlzLmluZGV4ID0gaW5kZXg7XG4gICAgICAgICAgICAgICAgICB0aGlzLmNvbXBsZXRlRW1vamkoKTtcbiAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcbiAgICAgICAgICAgICAgICAgICdtb2R1bGUtY29tcG9zaXRpb24taW5wdXRfX3N1Z2dlc3Rpb25zX19yb3cnLFxuICAgICAgICAgICAgICAgICAgZW1vamlSZXN1bHRzSW5kZXggPT09IGluZGV4XG4gICAgICAgICAgICAgICAgICAgID8gJ21vZHVsZS1jb21wb3NpdGlvbi1pbnB1dF9fc3VnZ2VzdGlvbnNfX3Jvdy0tc2VsZWN0ZWQnXG4gICAgICAgICAgICAgICAgICAgIDogbnVsbFxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8RW1vamlcbiAgICAgICAgICAgICAgICAgIHNob3J0TmFtZT17ZW1vamkuc2hvcnRfbmFtZX1cbiAgICAgICAgICAgICAgICAgIHNpemU9ezE2fVxuICAgICAgICAgICAgICAgICAgc2tpblRvbmU9e3RoaXMub3B0aW9ucy5za2luVG9uZX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kdWxlLWNvbXBvc2l0aW9uLWlucHV0X19zdWdnZXN0aW9uc19fcm93X19zaG9ydC1uYW1lXCI+XG4gICAgICAgICAgICAgICAgICA6e2Vtb2ppLnNob3J0X25hbWV9OlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICkpfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApfVxuICAgICAgPC9Qb3BwZXI+LFxuICAgICAgdGhpcy5yb290XG4gICAgKTtcblxuICAgIHRoaXMub3B0aW9ucy5zZXRFbW9qaVBpY2tlckVsZW1lbnQoZWxlbWVudCk7XG4gIH1cbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxt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
