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
  MentionCompletion: () => MentionCompletion
});
module.exports = __toCommonJS(completion_exports);
var import_lodash = __toESM(require("lodash"));
var import_quill_delta = __toESM(require("quill-delta"));
var import_react = __toESM(require("react"));
var import_react_popper = require("react-popper");
var import_classnames = __toESM(require("classnames"));
var import_react_dom = require("react-dom");
var import_Avatar = require("../../components/Avatar");
var import_util = require("../util");
var import_popperUtil = require("../../util/popperUtil");
const MENTION_REGEX = /(?:^|\W)@([-+\w]*)$/;
class MentionCompletion {
  constructor(quill, options) {
    this.results = [];
    this.index = 0;
    this.options = options;
    this.root = document.body.appendChild(document.createElement("div"));
    this.quill = quill;
    this.suggestionListRef = import_react.default.createRef();
    const clearResults = /* @__PURE__ */ __name(() => {
      if (this.results.length) {
        this.clearResults();
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
    this.quill.keyboard.addBinding({ key: 37 }, clearResults);
    this.quill.keyboard.addBinding({ key: 38 }, changeIndex(-1));
    this.quill.keyboard.addBinding({ key: 39 }, clearResults);
    this.quill.keyboard.addBinding({ key: 40 }, changeIndex(1));
    this.quill.on("text-change", import_lodash.default.debounce(this.onTextChange.bind(this), 0));
    this.quill.on("selection-change", this.onSelectionChange.bind(this));
  }
  destroy() {
    this.root.remove();
  }
  changeIndex(by) {
    this.index = (this.index + by + this.results.length) % this.results.length;
    this.render();
    const suggestionList = this.suggestionListRef.current;
    if (suggestionList) {
      const selectedElement = suggestionList.querySelector('[aria-selected="true"]');
      if (selectedElement) {
        selectedElement.scrollIntoViewIfNeeded(false);
      }
    }
  }
  onSelectionChange() {
    this.clearResults();
  }
  possiblyShowMemberResults() {
    const range = this.quill.getSelection();
    if (range) {
      const [blot, index] = this.quill.getLeaf(range.index);
      const [leftTokenTextMatch] = (0, import_util.matchBlotTextPartitions)(blot, index, MENTION_REGEX);
      if (leftTokenTextMatch) {
        const [, leftTokenText] = leftTokenTextMatch;
        let results = [];
        const memberRepository = this.options.memberRepositoryRef.current;
        if (memberRepository) {
          if (leftTokenText === "") {
            results = memberRepository.getMembers(this.options.me);
          } else {
            const fullMentionText = leftTokenText;
            results = memberRepository.search(fullMentionText, this.options.me);
          }
        }
        return results;
      }
    }
    return [];
  }
  onTextChange() {
    const showMemberResults = this.possiblyShowMemberResults();
    if (showMemberResults.length > 0) {
      this.results = showMemberResults;
      this.index = 0;
      this.render();
    } else if (this.results.length !== 0) {
      this.clearResults();
    }
  }
  completeMention(resultIndexArg) {
    const resultIndex = resultIndexArg || this.index;
    const range = this.quill.getSelection();
    if (range === null)
      return;
    const member = this.results[resultIndex];
    const [blot, index] = this.quill.getLeaf(range.index);
    const [leftTokenTextMatch] = (0, import_util.matchBlotTextPartitions)(blot, index, MENTION_REGEX);
    if (leftTokenTextMatch) {
      const [, leftTokenText] = leftTokenTextMatch;
      this.insertMention(member, range.index - leftTokenText.length - 1, leftTokenText.length + 1, true);
    }
  }
  insertMention(mention, index, range, withTrailingSpace = false) {
    const delta = new import_quill_delta.default().retain(index).delete(range).insert({ mention });
    if (withTrailingSpace) {
      this.quill.updateContents(delta.insert(" "), "user");
      this.quill.setSelection(index + 2, 0, "user");
    } else {
      this.quill.updateContents(delta, "user");
      this.quill.setSelection(index + 1, 0, "user");
    }
    this.clearResults();
  }
  clearResults() {
    this.results = [];
    this.index = 0;
    this.render();
  }
  onUnmount() {
    document.body.removeChild(this.root);
  }
  render() {
    const { results: memberResults, index: memberResultsIndex } = this;
    const { getPreferredBadge, theme } = this.options;
    if (memberResults.length === 0) {
      this.options.setMentionPickerElement(null);
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
      "aria-activedescendant": `mention-result--${memberResults.length ? memberResults[memberResultsIndex].name : ""}`,
      tabIndex: 0
    }, /* @__PURE__ */ import_react.default.createElement("div", {
      ref: this.suggestionListRef,
      className: "module-composition-input__suggestions--scroller"
    }, memberResults.map((member, index) => /* @__PURE__ */ import_react.default.createElement("button", {
      type: "button",
      key: member.uuid,
      id: `mention-result--${member.name}`,
      role: "option button",
      "aria-selected": memberResultsIndex === index,
      onClick: () => {
        this.completeMention(index);
      },
      className: (0, import_classnames.default)("module-composition-input__suggestions__row", "module-composition-input__suggestions__row--mention", memberResultsIndex === index ? "module-composition-input__suggestions__row--selected" : null)
    }, /* @__PURE__ */ import_react.default.createElement(import_Avatar.Avatar, {
      acceptedMessageRequest: member.acceptedMessageRequest,
      avatarPath: member.avatarPath,
      badge: getPreferredBadge(member.badges),
      conversationType: "direct",
      i18n: this.options.i18n,
      isMe: member.isMe,
      sharedGroupNames: member.sharedGroupNames,
      size: 28,
      theme,
      title: member.title,
      unblurredAvatarPath: member.unblurredAvatarPath
    }), /* @__PURE__ */ import_react.default.createElement("div", {
      className: "module-composition-input__suggestions__title"
    }, member.title)))))), this.root);
    this.options.setMentionPickerElement(element);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MentionCompletion
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiY29tcGxldGlvbi50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIwLTIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHR5cGUgUXVpbGwgZnJvbSAncXVpbGwnO1xuaW1wb3J0IERlbHRhIGZyb20gJ3F1aWxsLWRlbHRhJztcbmltcG9ydCB0eXBlIHsgUmVmT2JqZWN0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgUG9wcGVyIH0gZnJvbSAncmVhY3QtcG9wcGVyJztcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IHsgY3JlYXRlUG9ydGFsIH0gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCB0eXBlIHsgQ29udmVyc2F0aW9uVHlwZSB9IGZyb20gJy4uLy4uL3N0YXRlL2R1Y2tzL2NvbnZlcnNhdGlvbnMnO1xuaW1wb3J0IHsgQXZhdGFyIH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9BdmF0YXInO1xuaW1wb3J0IHR5cGUgeyBMb2NhbGl6ZXJUeXBlLCBUaGVtZVR5cGUgfSBmcm9tICcuLi8uLi90eXBlcy9VdGlsJztcbmltcG9ydCB0eXBlIHsgTWVtYmVyUmVwb3NpdG9yeSB9IGZyb20gJy4uL21lbWJlclJlcG9zaXRvcnknO1xuaW1wb3J0IHR5cGUgeyBQcmVmZXJyZWRCYWRnZVNlbGVjdG9yVHlwZSB9IGZyb20gJy4uLy4uL3N0YXRlL3NlbGVjdG9ycy9iYWRnZXMnO1xuaW1wb3J0IHsgbWF0Y2hCbG90VGV4dFBhcnRpdGlvbnMgfSBmcm9tICcuLi91dGlsJztcbmltcG9ydCB7IHNhbWVXaWR0aE1vZGlmaWVyIH0gZnJvbSAnLi4vLi4vdXRpbC9wb3BwZXJVdGlsJztcblxuZXhwb3J0IHR5cGUgTWVudGlvbkNvbXBsZXRpb25PcHRpb25zID0ge1xuICBnZXRQcmVmZXJyZWRCYWRnZTogUHJlZmVycmVkQmFkZ2VTZWxlY3RvclR5cGU7XG4gIGkxOG46IExvY2FsaXplclR5cGU7XG4gIG1lbWJlclJlcG9zaXRvcnlSZWY6IFJlZk9iamVjdDxNZW1iZXJSZXBvc2l0b3J5PjtcbiAgc2V0TWVudGlvblBpY2tlckVsZW1lbnQ6IChlbGVtZW50OiBKU1guRWxlbWVudCB8IG51bGwpID0+IHZvaWQ7XG4gIG1lPzogQ29udmVyc2F0aW9uVHlwZTtcbiAgdGhlbWU6IFRoZW1lVHlwZTtcbn07XG5cbmNvbnN0IE1FTlRJT05fUkVHRVggPSAvKD86XnxcXFcpQChbLStcXHddKikkLztcblxuZXhwb3J0IGNsYXNzIE1lbnRpb25Db21wbGV0aW9uIHtcbiAgcmVzdWx0czogQXJyYXk8Q29udmVyc2F0aW9uVHlwZT47XG5cbiAgaW5kZXg6IG51bWJlcjtcblxuICByb290OiBIVE1MRGl2RWxlbWVudDtcblxuICBxdWlsbDogUXVpbGw7XG5cbiAgb3B0aW9uczogTWVudGlvbkNvbXBsZXRpb25PcHRpb25zO1xuXG4gIHN1Z2dlc3Rpb25MaXN0UmVmOiBSZWZPYmplY3Q8SFRNTERpdkVsZW1lbnQ+O1xuXG4gIGNvbnN0cnVjdG9yKHF1aWxsOiBRdWlsbCwgb3B0aW9uczogTWVudGlvbkNvbXBsZXRpb25PcHRpb25zKSB7XG4gICAgdGhpcy5yZXN1bHRzID0gW107XG4gICAgdGhpcy5pbmRleCA9IDA7XG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgICB0aGlzLnJvb3QgPSBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpKTtcbiAgICB0aGlzLnF1aWxsID0gcXVpbGw7XG4gICAgdGhpcy5zdWdnZXN0aW9uTGlzdFJlZiA9IFJlYWN0LmNyZWF0ZVJlZjxIVE1MRGl2RWxlbWVudD4oKTtcblxuICAgIGNvbnN0IGNsZWFyUmVzdWx0cyA9ICgpID0+IHtcbiAgICAgIGlmICh0aGlzLnJlc3VsdHMubGVuZ3RoKSB7XG4gICAgICAgIHRoaXMuY2xlYXJSZXN1bHRzKCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG5cbiAgICBjb25zdCBjaGFuZ2VJbmRleCA9IChieTogbnVtYmVyKSA9PiAoKTogYm9vbGVhbiA9PiB7XG4gICAgICBpZiAodGhpcy5yZXN1bHRzLmxlbmd0aCkge1xuICAgICAgICB0aGlzLmNoYW5nZUluZGV4KGJ5KTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuXG4gICAgdGhpcy5xdWlsbC5rZXlib2FyZC5hZGRCaW5kaW5nKHsga2V5OiAzNyB9LCBjbGVhclJlc3VsdHMpOyAvLyBMZWZ0IEFycm93XG4gICAgdGhpcy5xdWlsbC5rZXlib2FyZC5hZGRCaW5kaW5nKHsga2V5OiAzOCB9LCBjaGFuZ2VJbmRleCgtMSkpOyAvLyBVcCBBcnJvd1xuICAgIHRoaXMucXVpbGwua2V5Ym9hcmQuYWRkQmluZGluZyh7IGtleTogMzkgfSwgY2xlYXJSZXN1bHRzKTsgLy8gUmlnaHQgQXJyb3dcbiAgICB0aGlzLnF1aWxsLmtleWJvYXJkLmFkZEJpbmRpbmcoeyBrZXk6IDQwIH0sIGNoYW5nZUluZGV4KDEpKTsgLy8gRG93biBBcnJvd1xuXG4gICAgdGhpcy5xdWlsbC5vbigndGV4dC1jaGFuZ2UnLCBfLmRlYm91bmNlKHRoaXMub25UZXh0Q2hhbmdlLmJpbmQodGhpcyksIDApKTtcbiAgICB0aGlzLnF1aWxsLm9uKCdzZWxlY3Rpb24tY2hhbmdlJywgdGhpcy5vblNlbGVjdGlvbkNoYW5nZS5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIGRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5yb290LnJlbW92ZSgpO1xuICB9XG5cbiAgY2hhbmdlSW5kZXgoYnk6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuaW5kZXggPSAodGhpcy5pbmRleCArIGJ5ICsgdGhpcy5yZXN1bHRzLmxlbmd0aCkgJSB0aGlzLnJlc3VsdHMubGVuZ3RoO1xuICAgIHRoaXMucmVuZGVyKCk7XG4gICAgY29uc3Qgc3VnZ2VzdGlvbkxpc3QgPSB0aGlzLnN1Z2dlc3Rpb25MaXN0UmVmLmN1cnJlbnQ7XG4gICAgaWYgKHN1Z2dlc3Rpb25MaXN0KSB7XG4gICAgICBjb25zdCBzZWxlY3RlZEVsZW1lbnQgPSBzdWdnZXN0aW9uTGlzdC5xdWVyeVNlbGVjdG9yPEhUTUxFbGVtZW50PihcbiAgICAgICAgJ1thcmlhLXNlbGVjdGVkPVwidHJ1ZVwiXSdcbiAgICAgICk7XG4gICAgICBpZiAoc2VsZWN0ZWRFbGVtZW50KSB7XG4gICAgICAgIHNlbGVjdGVkRWxlbWVudC5zY3JvbGxJbnRvVmlld0lmTmVlZGVkKGZhbHNlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBvblNlbGVjdGlvbkNoYW5nZSgpOiB2b2lkIHtcbiAgICAvLyBTZWxlY3Rpb24gc2hvdWxkIG5ldmVyIGNoYW5nZSB3aGlsZSB3ZSdyZSBlZGl0aW5nIGEgbWVudGlvblxuICAgIHRoaXMuY2xlYXJSZXN1bHRzKCk7XG4gIH1cblxuICBwb3NzaWJseVNob3dNZW1iZXJSZXN1bHRzKCk6IEFycmF5PENvbnZlcnNhdGlvblR5cGU+IHtcbiAgICBjb25zdCByYW5nZSA9IHRoaXMucXVpbGwuZ2V0U2VsZWN0aW9uKCk7XG5cbiAgICBpZiAocmFuZ2UpIHtcbiAgICAgIGNvbnN0IFtibG90LCBpbmRleF0gPSB0aGlzLnF1aWxsLmdldExlYWYocmFuZ2UuaW5kZXgpO1xuXG4gICAgICBjb25zdCBbbGVmdFRva2VuVGV4dE1hdGNoXSA9IG1hdGNoQmxvdFRleHRQYXJ0aXRpb25zKFxuICAgICAgICBibG90LFxuICAgICAgICBpbmRleCxcbiAgICAgICAgTUVOVElPTl9SRUdFWFxuICAgICAgKTtcblxuICAgICAgaWYgKGxlZnRUb2tlblRleHRNYXRjaCkge1xuICAgICAgICBjb25zdCBbLCBsZWZ0VG9rZW5UZXh0XSA9IGxlZnRUb2tlblRleHRNYXRjaDtcblxuICAgICAgICBsZXQgcmVzdWx0czogQXJyYXk8Q29udmVyc2F0aW9uVHlwZT4gPSBbXTtcblxuICAgICAgICBjb25zdCBtZW1iZXJSZXBvc2l0b3J5ID0gdGhpcy5vcHRpb25zLm1lbWJlclJlcG9zaXRvcnlSZWYuY3VycmVudDtcblxuICAgICAgICBpZiAobWVtYmVyUmVwb3NpdG9yeSkge1xuICAgICAgICAgIGlmIChsZWZ0VG9rZW5UZXh0ID09PSAnJykge1xuICAgICAgICAgICAgcmVzdWx0cyA9IG1lbWJlclJlcG9zaXRvcnkuZ2V0TWVtYmVycyh0aGlzLm9wdGlvbnMubWUpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBmdWxsTWVudGlvblRleHQgPSBsZWZ0VG9rZW5UZXh0O1xuICAgICAgICAgICAgcmVzdWx0cyA9IG1lbWJlclJlcG9zaXRvcnkuc2VhcmNoKGZ1bGxNZW50aW9uVGV4dCwgdGhpcy5vcHRpb25zLm1lKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gW107XG4gIH1cblxuICBvblRleHRDaGFuZ2UoKTogdm9pZCB7XG4gICAgY29uc3Qgc2hvd01lbWJlclJlc3VsdHMgPSB0aGlzLnBvc3NpYmx5U2hvd01lbWJlclJlc3VsdHMoKTtcblxuICAgIGlmIChzaG93TWVtYmVyUmVzdWx0cy5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLnJlc3VsdHMgPSBzaG93TWVtYmVyUmVzdWx0cztcbiAgICAgIHRoaXMuaW5kZXggPSAwO1xuICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMucmVzdWx0cy5sZW5ndGggIT09IDApIHtcbiAgICAgIHRoaXMuY2xlYXJSZXN1bHRzKCk7XG4gICAgfVxuICB9XG5cbiAgY29tcGxldGVNZW50aW9uKHJlc3VsdEluZGV4QXJnPzogbnVtYmVyKTogdm9pZCB7XG4gICAgY29uc3QgcmVzdWx0SW5kZXggPSByZXN1bHRJbmRleEFyZyB8fCB0aGlzLmluZGV4O1xuXG4gICAgY29uc3QgcmFuZ2UgPSB0aGlzLnF1aWxsLmdldFNlbGVjdGlvbigpO1xuXG4gICAgaWYgKHJhbmdlID09PSBudWxsKSByZXR1cm47XG5cbiAgICBjb25zdCBtZW1iZXIgPSB0aGlzLnJlc3VsdHNbcmVzdWx0SW5kZXhdO1xuXG4gICAgY29uc3QgW2Jsb3QsIGluZGV4XSA9IHRoaXMucXVpbGwuZ2V0TGVhZihyYW5nZS5pbmRleCk7XG5cbiAgICBjb25zdCBbbGVmdFRva2VuVGV4dE1hdGNoXSA9IG1hdGNoQmxvdFRleHRQYXJ0aXRpb25zKFxuICAgICAgYmxvdCxcbiAgICAgIGluZGV4LFxuICAgICAgTUVOVElPTl9SRUdFWFxuICAgICk7XG5cbiAgICBpZiAobGVmdFRva2VuVGV4dE1hdGNoKSB7XG4gICAgICBjb25zdCBbLCBsZWZ0VG9rZW5UZXh0XSA9IGxlZnRUb2tlblRleHRNYXRjaDtcblxuICAgICAgdGhpcy5pbnNlcnRNZW50aW9uKFxuICAgICAgICBtZW1iZXIsXG4gICAgICAgIHJhbmdlLmluZGV4IC0gbGVmdFRva2VuVGV4dC5sZW5ndGggLSAxLFxuICAgICAgICBsZWZ0VG9rZW5UZXh0Lmxlbmd0aCArIDEsXG4gICAgICAgIHRydWVcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgaW5zZXJ0TWVudGlvbihcbiAgICBtZW50aW9uOiBDb252ZXJzYXRpb25UeXBlLFxuICAgIGluZGV4OiBudW1iZXIsXG4gICAgcmFuZ2U6IG51bWJlcixcbiAgICB3aXRoVHJhaWxpbmdTcGFjZSA9IGZhbHNlXG4gICk6IHZvaWQge1xuICAgIGNvbnN0IGRlbHRhID0gbmV3IERlbHRhKCkucmV0YWluKGluZGV4KS5kZWxldGUocmFuZ2UpLmluc2VydCh7IG1lbnRpb24gfSk7XG5cbiAgICBpZiAod2l0aFRyYWlsaW5nU3BhY2UpIHtcbiAgICAgIHRoaXMucXVpbGwudXBkYXRlQ29udGVudHMoZGVsdGEuaW5zZXJ0KCcgJyksICd1c2VyJyk7XG4gICAgICB0aGlzLnF1aWxsLnNldFNlbGVjdGlvbihpbmRleCArIDIsIDAsICd1c2VyJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucXVpbGwudXBkYXRlQ29udGVudHMoZGVsdGEsICd1c2VyJyk7XG4gICAgICB0aGlzLnF1aWxsLnNldFNlbGVjdGlvbihpbmRleCArIDEsIDAsICd1c2VyJyk7XG4gICAgfVxuXG4gICAgdGhpcy5jbGVhclJlc3VsdHMoKTtcbiAgfVxuXG4gIGNsZWFyUmVzdWx0cygpOiB2b2lkIHtcbiAgICB0aGlzLnJlc3VsdHMgPSBbXTtcbiAgICB0aGlzLmluZGV4ID0gMDtcblxuICAgIHRoaXMucmVuZGVyKCk7XG4gIH1cblxuICBvblVubW91bnQoKTogdm9pZCB7XG4gICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZCh0aGlzLnJvb3QpO1xuICB9XG5cbiAgcmVuZGVyKCk6IHZvaWQge1xuICAgIGNvbnN0IHsgcmVzdWx0czogbWVtYmVyUmVzdWx0cywgaW5kZXg6IG1lbWJlclJlc3VsdHNJbmRleCB9ID0gdGhpcztcbiAgICBjb25zdCB7IGdldFByZWZlcnJlZEJhZGdlLCB0aGVtZSB9ID0gdGhpcy5vcHRpb25zO1xuXG4gICAgaWYgKG1lbWJlclJlc3VsdHMubGVuZ3RoID09PSAwKSB7XG4gICAgICB0aGlzLm9wdGlvbnMuc2V0TWVudGlvblBpY2tlckVsZW1lbnQobnVsbCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgZWxlbWVudCA9IGNyZWF0ZVBvcnRhbChcbiAgICAgIDxQb3BwZXIgcGxhY2VtZW50PVwidG9wLXN0YXJ0XCIgbW9kaWZpZXJzPXtbc2FtZVdpZHRoTW9kaWZpZXJdfT5cbiAgICAgICAgeyh7IHJlZiwgc3R5bGUgfSkgPT4gKFxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIHJlZj17cmVmfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwibW9kdWxlLWNvbXBvc2l0aW9uLWlucHV0X19zdWdnZXN0aW9uc1wiXG4gICAgICAgICAgICBzdHlsZT17c3R5bGV9XG4gICAgICAgICAgICByb2xlPVwibGlzdGJveFwiXG4gICAgICAgICAgICBhcmlhLWV4cGFuZGVkXG4gICAgICAgICAgICBhcmlhLWFjdGl2ZWRlc2NlbmRhbnQ9e2BtZW50aW9uLXJlc3VsdC0tJHtcbiAgICAgICAgICAgICAgbWVtYmVyUmVzdWx0cy5sZW5ndGggPyBtZW1iZXJSZXN1bHRzW21lbWJlclJlc3VsdHNJbmRleF0ubmFtZSA6ICcnXG4gICAgICAgICAgICB9YH1cbiAgICAgICAgICAgIHRhYkluZGV4PXswfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgcmVmPXt0aGlzLnN1Z2dlc3Rpb25MaXN0UmVmfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJtb2R1bGUtY29tcG9zaXRpb24taW5wdXRfX3N1Z2dlc3Rpb25zLS1zY3JvbGxlclwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHttZW1iZXJSZXN1bHRzLm1hcCgobWVtYmVyLCBpbmRleCkgPT4gKFxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAga2V5PXttZW1iZXIudXVpZH1cbiAgICAgICAgICAgICAgICAgIGlkPXtgbWVudGlvbi1yZXN1bHQtLSR7bWVtYmVyLm5hbWV9YH1cbiAgICAgICAgICAgICAgICAgIHJvbGU9XCJvcHRpb24gYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgIGFyaWEtc2VsZWN0ZWQ9e21lbWJlclJlc3VsdHNJbmRleCA9PT0gaW5kZXh9XG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29tcGxldGVNZW50aW9uKGluZGV4KTtcbiAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXG4gICAgICAgICAgICAgICAgICAgICdtb2R1bGUtY29tcG9zaXRpb24taW5wdXRfX3N1Z2dlc3Rpb25zX19yb3cnLFxuICAgICAgICAgICAgICAgICAgICAnbW9kdWxlLWNvbXBvc2l0aW9uLWlucHV0X19zdWdnZXN0aW9uc19fcm93LS1tZW50aW9uJyxcbiAgICAgICAgICAgICAgICAgICAgbWVtYmVyUmVzdWx0c0luZGV4ID09PSBpbmRleFxuICAgICAgICAgICAgICAgICAgICAgID8gJ21vZHVsZS1jb21wb3NpdGlvbi1pbnB1dF9fc3VnZ2VzdGlvbnNfX3Jvdy0tc2VsZWN0ZWQnXG4gICAgICAgICAgICAgICAgICAgICAgOiBudWxsXG4gICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIDxBdmF0YXJcbiAgICAgICAgICAgICAgICAgICAgYWNjZXB0ZWRNZXNzYWdlUmVxdWVzdD17bWVtYmVyLmFjY2VwdGVkTWVzc2FnZVJlcXVlc3R9XG4gICAgICAgICAgICAgICAgICAgIGF2YXRhclBhdGg9e21lbWJlci5hdmF0YXJQYXRofVxuICAgICAgICAgICAgICAgICAgICBiYWRnZT17Z2V0UHJlZmVycmVkQmFkZ2UobWVtYmVyLmJhZGdlcyl9XG4gICAgICAgICAgICAgICAgICAgIGNvbnZlcnNhdGlvblR5cGU9XCJkaXJlY3RcIlxuICAgICAgICAgICAgICAgICAgICBpMThuPXt0aGlzLm9wdGlvbnMuaTE4bn1cbiAgICAgICAgICAgICAgICAgICAgaXNNZT17bWVtYmVyLmlzTWV9XG4gICAgICAgICAgICAgICAgICAgIHNoYXJlZEdyb3VwTmFtZXM9e21lbWJlci5zaGFyZWRHcm91cE5hbWVzfVxuICAgICAgICAgICAgICAgICAgICBzaXplPXsyOH1cbiAgICAgICAgICAgICAgICAgICAgdGhlbWU9e3RoZW1lfVxuICAgICAgICAgICAgICAgICAgICB0aXRsZT17bWVtYmVyLnRpdGxlfVxuICAgICAgICAgICAgICAgICAgICB1bmJsdXJyZWRBdmF0YXJQYXRoPXttZW1iZXIudW5ibHVycmVkQXZhdGFyUGF0aH1cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZHVsZS1jb21wb3NpdGlvbi1pbnB1dF9fc3VnZ2VzdGlvbnNfX3RpdGxlXCI+XG4gICAgICAgICAgICAgICAgICAgIHttZW1iZXIudGl0bGV9XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKX1cbiAgICAgIDwvUG9wcGVyPixcbiAgICAgIHRoaXMucm9vdFxuICAgICk7XG5cbiAgICB0aGlzLm9wdGlvbnMuc2V0TWVudGlvblBpY2tlckVsZW1lbnQoZWxlbWVudCk7XG4gIH1cbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxvQkFBYztBQUVkLHlCQUFrQjtBQUVsQixtQkFBa0I7QUFFbEIsMEJBQXVCO0FBQ3ZCLHdCQUF1QjtBQUN2Qix1QkFBNkI7QUFFN0Isb0JBQXVCO0FBSXZCLGtCQUF3QztBQUN4Qyx3QkFBa0M7QUFXbEMsTUFBTSxnQkFBZ0I7QUFFZixNQUFNLGtCQUFrQjtBQUFBLEVBYTdCLFlBQVksT0FBYyxTQUFtQztBQUMzRCxTQUFLLFVBQVUsQ0FBQztBQUNoQixTQUFLLFFBQVE7QUFDYixTQUFLLFVBQVU7QUFDZixTQUFLLE9BQU8sU0FBUyxLQUFLLFlBQVksU0FBUyxjQUFjLEtBQUssQ0FBQztBQUNuRSxTQUFLLFFBQVE7QUFDYixTQUFLLG9CQUFvQixxQkFBTSxVQUEwQjtBQUV6RCxVQUFNLGVBQWUsNkJBQU07QUFDekIsVUFBSSxLQUFLLFFBQVEsUUFBUTtBQUN2QixhQUFLLGFBQWE7QUFBQSxNQUNwQjtBQUVBLGFBQU87QUFB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
