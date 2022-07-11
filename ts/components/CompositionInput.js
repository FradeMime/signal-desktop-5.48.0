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
var CompositionInput_exports = {};
__export(CompositionInput_exports, {
  CompositionInput: () => CompositionInput
});
module.exports = __toCommonJS(CompositionInput_exports);
var React = __toESM(require("react"));
var import_quill_delta = __toESM(require("quill-delta"));
var import_react_quill = __toESM(require("react-quill"));
var import_classnames = __toESM(require("classnames"));
var import_react_popper = require("react-popper");
var import_quill = __toESM(require("quill"));
var import_completion = require("../quill/mentions/completion");
var import_emoji = require("../quill/emoji");
var import_lib = require("./emoji/lib");
var import_UUID = require("../types/UUID");
var import_blot = require("../quill/mentions/blot");
var import_matchers = require("../quill/emoji/matchers");
var import_matchers2 = require("../quill/mentions/matchers");
var import_memberRepository = require("../quill/memberRepository");
var import_util = require("../quill/util");
var import_signal_clipboard = require("../quill/signal-clipboard");
var import_blot2 = require("../quill/block/blot");
var import_getClassNamesFor = require("../util/getClassNamesFor");
var log = __toESM(require("../logging/log"));
import_quill.default.register("formats/emoji", import_emoji.EmojiBlot);
import_quill.default.register("formats/mention", import_blot.MentionBlot);
import_quill.default.register("formats/block", import_blot2.DirectionalBlot);
import_quill.default.register("modules/emojiCompletion", import_emoji.EmojiCompletion);
import_quill.default.register("modules/mentionCompletion", import_completion.MentionCompletion);
import_quill.default.register("modules/signalClipboard", import_signal_clipboard.SignalClipboard);
const MAX_LENGTH = 64 * 1024;
const BASE_CLASS_NAME = "module-composition-input";
function CompositionInput(props) {
  const {
    children,
    i18n,
    disabled,
    large,
    inputApi,
    moduleClassName,
    onPickEmoji,
    onSubmit,
    placeholder,
    skinTone,
    draftText,
    draftBodyRanges,
    getPreferredBadge,
    getQuotedMessage,
    clearQuotedMessage,
    sortedGroupMembers,
    theme
  } = props;
  const [emojiCompletionElement, setEmojiCompletionElement] = React.useState();
  const [lastSelectionRange, setLastSelectionRange] = React.useState(null);
  const [mentionCompletionElement, setMentionCompletionElement] = React.useState();
  const emojiCompletionRef = React.useRef();
  const mentionCompletionRef = React.useRef();
  const quillRef = React.useRef();
  const scrollerRef = React.useRef(null);
  const propsRef = React.useRef(props);
  const memberRepositoryRef = React.useRef(new import_memberRepository.MemberRepository());
  const generateDelta = /* @__PURE__ */ __name((text, bodyRanges) => {
    const initialOps = [{ insert: text }];
    const opsWithMentions = (0, import_util.insertMentionOps)(initialOps, bodyRanges);
    const opsWithEmojis = (0, import_util.insertEmojiOps)(opsWithMentions);
    return new import_quill_delta.default(opsWithEmojis);
  }, "generateDelta");
  const getTextAndMentions = /* @__PURE__ */ __name(() => {
    const quill = quillRef.current;
    if (quill === void 0) {
      return ["", []];
    }
    const contents = quill.getContents();
    if (contents === void 0) {
      return ["", []];
    }
    const { ops } = contents;
    if (ops === void 0) {
      return ["", []];
    }
    return (0, import_util.getTextAndMentionsFromOps)(ops);
  }, "getTextAndMentions");
  const focus = /* @__PURE__ */ __name(() => {
    const quill = quillRef.current;
    if (quill === void 0) {
      return;
    }
    quill.focus();
  }, "focus");
  const insertEmoji = /* @__PURE__ */ __name((e) => {
    const quill = quillRef.current;
    if (quill === void 0) {
      return;
    }
    const range = quill.getSelection();
    const insertionRange = range || lastSelectionRange;
    if (insertionRange === null) {
      return;
    }
    const emoji = (0, import_lib.convertShortName)(e.shortName, e.skinTone);
    const delta = new import_quill_delta.default().retain(insertionRange.index).delete(insertionRange.length).insert({ emoji });
    quill.updateContents(delta, "user");
    quill.setSelection(insertionRange.index + 1, 0, "user");
  }, "insertEmoji");
  const reset = /* @__PURE__ */ __name(() => {
    const quill = quillRef.current;
    if (quill === void 0) {
      return;
    }
    quill.setText("");
    const historyModule = quill.getModule("history");
    if (historyModule === void 0) {
      return;
    }
    historyModule.clear();
  }, "reset");
  const resetEmojiResults = /* @__PURE__ */ __name(() => {
    const emojiCompletion = emojiCompletionRef.current;
    if (emojiCompletion === void 0) {
      return;
    }
    emojiCompletion.reset();
  }, "resetEmojiResults");
  const submit = /* @__PURE__ */ __name(() => {
    const timestamp = Date.now();
    const quill = quillRef.current;
    if (quill === void 0) {
      return;
    }
    const [text, mentions] = getTextAndMentions();
    log.info(`CompositionInput: Submitting message ${timestamp} with ${mentions.length} mentions`);
    onSubmit(text, mentions, timestamp);
  }, "submit");
  if (inputApi) {
    inputApi.current = {
      focus,
      insertEmoji,
      reset,
      resetEmojiResults,
      submit
    };
  }
  React.useEffect(() => {
    propsRef.current = props;
  }, [props]);
  const onShortKeyEnter = /* @__PURE__ */ __name(() => {
    submit();
    return false;
  }, "onShortKeyEnter");
  const onEnter = /* @__PURE__ */ __name(() => {
    const quill = quillRef.current;
    const emojiCompletion = emojiCompletionRef.current;
    const mentionCompletion = mentionCompletionRef.current;
    if (quill === void 0) {
      return false;
    }
    if (emojiCompletion === void 0 || mentionCompletion === void 0) {
      return false;
    }
    if (emojiCompletion.results.length) {
      emojiCompletion.completeEmoji();
      return false;
    }
    if (mentionCompletion.results.length) {
      mentionCompletion.completeMention();
      return false;
    }
    if (propsRef.current.large) {
      return true;
    }
    submit();
    return false;
  }, "onEnter");
  const onTab = /* @__PURE__ */ __name(() => {
    const quill = quillRef.current;
    const emojiCompletion = emojiCompletionRef.current;
    const mentionCompletion = mentionCompletionRef.current;
    if (quill === void 0) {
      return false;
    }
    if (emojiCompletion === void 0 || mentionCompletion === void 0) {
      return false;
    }
    if (emojiCompletion.results.length) {
      emojiCompletion.completeEmoji();
      return false;
    }
    if (mentionCompletion.results.length) {
      mentionCompletion.completeMention();
      return false;
    }
    return true;
  }, "onTab");
  const onEscape = /* @__PURE__ */ __name(() => {
    const quill = quillRef.current;
    if (quill === void 0) {
      return false;
    }
    const emojiCompletion = emojiCompletionRef.current;
    const mentionCompletion = mentionCompletionRef.current;
    if (emojiCompletion) {
      if (emojiCompletion.results.length) {
        emojiCompletion.reset();
        return false;
      }
    }
    if (mentionCompletion) {
      if (mentionCompletion.results.length) {
        mentionCompletion.clearResults();
        return false;
      }
    }
    if (getQuotedMessage?.()) {
      clearQuotedMessage?.();
      return false;
    }
    return true;
  }, "onEscape");
  const onBackspace = /* @__PURE__ */ __name(() => {
    const quill = quillRef.current;
    if (quill === void 0) {
      return true;
    }
    const selection = quill.getSelection();
    if (!selection || selection.length > 0) {
      return true;
    }
    const [blotToDelete] = quill.getLeaf(selection.index);
    if (!(0, import_util.isMentionBlot)(blotToDelete)) {
      return true;
    }
    const contents = quill.getContents(0, selection.index - 1);
    const restartDelta = (0, import_util.getDeltaToRestartMention)(contents.ops);
    quill.updateContents(restartDelta);
    quill.setSelection(selection.index, 0);
    return false;
  }, "onBackspace");
  const onChange = /* @__PURE__ */ __name(() => {
    const quill = quillRef.current;
    const [text, mentions] = getTextAndMentions();
    if (quill !== void 0) {
      const historyModule = quill.getModule("history");
      if (text.length > MAX_LENGTH) {
        historyModule.undo();
        propsRef.current.onTextTooLong();
        return;
      }
      const { onEditorStateChange } = propsRef.current;
      if (onEditorStateChange) {
        setTimeout(() => {
          const selection = quill.getSelection();
          onEditorStateChange(text, mentions, selection ? selection.index : void 0);
        }, 0);
      }
    }
    if (propsRef.current.onDirtyChange) {
      propsRef.current.onDirtyChange(text.length > 0);
    }
  }, "onChange");
  React.useEffect(() => {
    const quill = quillRef.current;
    if (quill === void 0) {
      return;
    }
    quill.enable(!disabled);
    quill.focus();
  }, [disabled]);
  React.useEffect(() => {
    const emojiCompletion = emojiCompletionRef.current;
    if (emojiCompletion === void 0 || skinTone === void 0) {
      return;
    }
    emojiCompletion.options.skinTone = skinTone;
  }, [skinTone]);
  React.useEffect(() => () => {
    const emojiCompletion = emojiCompletionRef.current;
    const mentionCompletion = mentionCompletionRef.current;
    if (emojiCompletion !== void 0) {
      emojiCompletion.destroy();
    }
    if (mentionCompletion !== void 0) {
      mentionCompletion.destroy();
    }
  }, []);
  const removeStaleMentions = /* @__PURE__ */ __name((currentMembers) => {
    const quill = quillRef.current;
    if (quill === void 0) {
      return;
    }
    const { ops } = quill.getContents();
    if (ops === void 0) {
      return;
    }
    const currentMemberUuids = currentMembers.map((m) => m.uuid).filter(import_UUID.isValidUuid);
    const newDelta = (0, import_util.getDeltaToRemoveStaleMentions)(ops, currentMemberUuids);
    quill.updateContents(newDelta);
  }, "removeStaleMentions");
  const memberIds = sortedGroupMembers ? sortedGroupMembers.map((m) => m.id) : [];
  React.useEffect(() => {
    memberRepositoryRef.current.updateMembers(sortedGroupMembers || []);
    removeStaleMentions(sortedGroupMembers || []);
  }, [JSON.stringify(memberIds)]);
  const unstaleCallbacks = {
    onBackspace,
    onChange,
    onEnter,
    onEscape,
    onPickEmoji,
    onShortKeyEnter,
    onTab
  };
  const callbacksRef = React.useRef(unstaleCallbacks);
  callbacksRef.current = unstaleCallbacks;
  const reactQuill = React.useMemo(() => {
    const delta = generateDelta(draftText || "", draftBodyRanges || []);
    return /* @__PURE__ */ React.createElement(import_react_quill.default, {
      className: `${BASE_CLASS_NAME}__quill`,
      onChange: () => callbacksRef.current.onChange(),
      defaultValue: delta,
      modules: {
        toolbar: false,
        signalClipboard: true,
        clipboard: {
          matchers: [
            ["IMG", import_matchers.matchEmojiImage],
            ["IMG", import_matchers.matchEmojiBlot],
            ["SPAN", import_matchers.matchReactEmoji],
            [Node.TEXT_NODE, import_matchers.matchEmojiText],
            ["SPAN", (0, import_matchers2.matchMention)(memberRepositoryRef)]
          ]
        },
        keyboard: {
          bindings: {
            onEnter: {
              key: 13,
              handler: () => callbacksRef.current.onEnter()
            },
            onShortKeyEnter: {
              key: 13,
              shortKey: true,
              handler: () => callbacksRef.current.onShortKeyEnter()
            },
            onEscape: {
              key: 27,
              handler: () => callbacksRef.current.onEscape()
            },
            onBackspace: {
              key: 8,
              handler: () => callbacksRef.current.onBackspace()
            }
          }
        },
        emojiCompletion: {
          setEmojiPickerElement: setEmojiCompletionElement,
          onPickEmoji: (emoji) => callbacksRef.current.onPickEmoji(emoji),
          skinTone
        },
        mentionCompletion: {
          getPreferredBadge,
          me: sortedGroupMembers ? sortedGroupMembers.find((foo) => foo.isMe) : void 0,
          memberRepositoryRef,
          setMentionPickerElement: setMentionCompletionElement,
          i18n,
          theme
        }
      },
      formats: ["emoji", "mention"],
      placeholder: placeholder || i18n("sendMessage"),
      readOnly: disabled,
      ref: (element) => {
        if (element) {
          const quill = element.getEditor();
          const keyboard = quill.getModule("keyboard");
          keyboard.bindings[9].unshift({
            key: 9,
            handler: () => callbacksRef.current.onTab()
          });
          keyboard.bindings[9].pop();
          quill.once("editor-change", () => {
            const scroller = scrollerRef.current;
            if (scroller !== null) {
              quill.scrollingContainer = scroller;
            }
            setTimeout(() => {
              quill.setSelection(quill.getLength(), 0);
              quill.root.classList.add("ql-editor--loaded");
            }, 0);
          });
          quill.on("selection-change", (newRange, oldRange) => {
            if (newRange === null) {
              setLastSelectionRange(oldRange);
            }
          });
          quillRef.current = quill;
          emojiCompletionRef.current = quill.getModule("emojiCompletion");
          mentionCompletionRef.current = quill.getModule("mentionCompletion");
        }
      }
    });
  }, []);
  const getClassName = (0, import_getClassNamesFor.getClassNamesFor)(BASE_CLASS_NAME, moduleClassName);
  return /* @__PURE__ */ React.createElement(import_react_popper.Manager, null, /* @__PURE__ */ React.createElement(import_react_popper.Reference, null, ({ ref }) => /* @__PURE__ */ React.createElement("div", {
    className: getClassName("__input"),
    ref
  }, /* @__PURE__ */ React.createElement("div", {
    ref: scrollerRef,
    onClick: focus,
    className: (0, import_classnames.default)(getClassName("__input__scroller"), large ? getClassName("__input__scroller--large") : null, children ? getClassName("__input--with-children") : null)
  }, children, reactQuill, emojiCompletionElement, mentionCompletionElement))));
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CompositionInput
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ29tcG9zaXRpb25JbnB1dC50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDE5LTIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCBEZWx0YSBmcm9tICdxdWlsbC1kZWx0YSc7XG5pbXBvcnQgUmVhY3RRdWlsbCBmcm9tICdyZWFjdC1xdWlsbCc7XG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCB7IE1hbmFnZXIsIFJlZmVyZW5jZSB9IGZyb20gJ3JlYWN0LXBvcHBlcic7XG5pbXBvcnQgdHlwZSB7IEtleWJvYXJkU3RhdGljLCBSYW5nZVN0YXRpYyB9IGZyb20gJ3F1aWxsJztcbmltcG9ydCBRdWlsbCBmcm9tICdxdWlsbCc7XG5cbmltcG9ydCB7IE1lbnRpb25Db21wbGV0aW9uIH0gZnJvbSAnLi4vcXVpbGwvbWVudGlvbnMvY29tcGxldGlvbic7XG5pbXBvcnQgeyBFbW9qaUJsb3QsIEVtb2ppQ29tcGxldGlvbiB9IGZyb20gJy4uL3F1aWxsL2Vtb2ppJztcbmltcG9ydCB0eXBlIHsgRW1vamlQaWNrRGF0YVR5cGUgfSBmcm9tICcuL2Vtb2ppL0Vtb2ppUGlja2VyJztcbmltcG9ydCB7IGNvbnZlcnRTaG9ydE5hbWUgfSBmcm9tICcuL2Vtb2ppL2xpYic7XG5pbXBvcnQgdHlwZSB7IExvY2FsaXplclR5cGUsIEJvZHlSYW5nZVR5cGUsIFRoZW1lVHlwZSB9IGZyb20gJy4uL3R5cGVzL1V0aWwnO1xuaW1wb3J0IHR5cGUgeyBDb252ZXJzYXRpb25UeXBlIH0gZnJvbSAnLi4vc3RhdGUvZHVja3MvY29udmVyc2F0aW9ucyc7XG5pbXBvcnQgdHlwZSB7IFByZWZlcnJlZEJhZGdlU2VsZWN0b3JUeXBlIH0gZnJvbSAnLi4vc3RhdGUvc2VsZWN0b3JzL2JhZGdlcyc7XG5pbXBvcnQgeyBpc1ZhbGlkVXVpZCB9IGZyb20gJy4uL3R5cGVzL1VVSUQnO1xuaW1wb3J0IHsgTWVudGlvbkJsb3QgfSBmcm9tICcuLi9xdWlsbC9tZW50aW9ucy9ibG90JztcbmltcG9ydCB7XG4gIG1hdGNoRW1vamlJbWFnZSxcbiAgbWF0Y2hFbW9qaUJsb3QsXG4gIG1hdGNoUmVhY3RFbW9qaSxcbiAgbWF0Y2hFbW9qaVRleHQsXG59IGZyb20gJy4uL3F1aWxsL2Vtb2ppL21hdGNoZXJzJztcbmltcG9ydCB7IG1hdGNoTWVudGlvbiB9IGZyb20gJy4uL3F1aWxsL21lbnRpb25zL21hdGNoZXJzJztcbmltcG9ydCB7IE1lbWJlclJlcG9zaXRvcnkgfSBmcm9tICcuLi9xdWlsbC9tZW1iZXJSZXBvc2l0b3J5JztcbmltcG9ydCB7XG4gIGdldERlbHRhVG9SZW1vdmVTdGFsZU1lbnRpb25zLFxuICBnZXRUZXh0QW5kTWVudGlvbnNGcm9tT3BzLFxuICBpc01lbnRpb25CbG90LFxuICBnZXREZWx0YVRvUmVzdGFydE1lbnRpb24sXG4gIGluc2VydE1lbnRpb25PcHMsXG4gIGluc2VydEVtb2ppT3BzLFxufSBmcm9tICcuLi9xdWlsbC91dGlsJztcbmltcG9ydCB7IFNpZ25hbENsaXBib2FyZCB9IGZyb20gJy4uL3F1aWxsL3NpZ25hbC1jbGlwYm9hcmQnO1xuaW1wb3J0IHsgRGlyZWN0aW9uYWxCbG90IH0gZnJvbSAnLi4vcXVpbGwvYmxvY2svYmxvdCc7XG5pbXBvcnQgeyBnZXRDbGFzc05hbWVzRm9yIH0gZnJvbSAnLi4vdXRpbC9nZXRDbGFzc05hbWVzRm9yJztcbmltcG9ydCAqIGFzIGxvZyBmcm9tICcuLi9sb2dnaW5nL2xvZyc7XG5cblF1aWxsLnJlZ2lzdGVyKCdmb3JtYXRzL2Vtb2ppJywgRW1vamlCbG90KTtcblF1aWxsLnJlZ2lzdGVyKCdmb3JtYXRzL21lbnRpb24nLCBNZW50aW9uQmxvdCk7XG5RdWlsbC5yZWdpc3RlcignZm9ybWF0cy9ibG9jaycsIERpcmVjdGlvbmFsQmxvdCk7XG5RdWlsbC5yZWdpc3RlcignbW9kdWxlcy9lbW9qaUNvbXBsZXRpb24nLCBFbW9qaUNvbXBsZXRpb24pO1xuUXVpbGwucmVnaXN0ZXIoJ21vZHVsZXMvbWVudGlvbkNvbXBsZXRpb24nLCBNZW50aW9uQ29tcGxldGlvbik7XG5RdWlsbC5yZWdpc3RlcignbW9kdWxlcy9zaWduYWxDbGlwYm9hcmQnLCBTaWduYWxDbGlwYm9hcmQpO1xuXG50eXBlIEhpc3RvcnlTdGF0aWMgPSB7XG4gIHVuZG8oKTogdm9pZDtcbiAgY2xlYXIoKTogdm9pZDtcbn07XG5cbmV4cG9ydCB0eXBlIElucHV0QXBpID0ge1xuICBmb2N1czogKCkgPT4gdm9pZDtcbiAgaW5zZXJ0RW1vamk6IChlOiBFbW9qaVBpY2tEYXRhVHlwZSkgPT4gdm9pZDtcbiAgcmVzZXQ6ICgpID0+IHZvaWQ7XG4gIHJlc2V0RW1vamlSZXN1bHRzOiAoKSA9PiB2b2lkO1xuICBzdWJtaXQ6ICgpID0+IHZvaWQ7XG59O1xuXG5leHBvcnQgdHlwZSBQcm9wcyA9IHtcbiAgY2hpbGRyZW4/OiBSZWFjdC5SZWFjdE5vZGU7XG4gIHJlYWRvbmx5IGkxOG46IExvY2FsaXplclR5cGU7XG4gIHJlYWRvbmx5IGRpc2FibGVkPzogYm9vbGVhbjtcbiAgcmVhZG9ubHkgZ2V0UHJlZmVycmVkQmFkZ2U6IFByZWZlcnJlZEJhZGdlU2VsZWN0b3JUeXBlO1xuICByZWFkb25seSBsYXJnZT86IGJvb2xlYW47XG4gIHJlYWRvbmx5IGlucHV0QXBpPzogUmVhY3QuTXV0YWJsZVJlZk9iamVjdDxJbnB1dEFwaSB8IHVuZGVmaW5lZD47XG4gIHJlYWRvbmx5IHNraW5Ub25lPzogRW1vamlQaWNrRGF0YVR5cGVbJ3NraW5Ub25lJ107XG4gIHJlYWRvbmx5IGRyYWZ0VGV4dD86IHN0cmluZztcbiAgcmVhZG9ubHkgZHJhZnRCb2R5UmFuZ2VzPzogQXJyYXk8Qm9keVJhbmdlVHlwZT47XG4gIHJlYWRvbmx5IG1vZHVsZUNsYXNzTmFtZT86IHN0cmluZztcbiAgcmVhZG9ubHkgdGhlbWU6IFRoZW1lVHlwZTtcbiAgcmVhZG9ubHkgcGxhY2Vob2xkZXI/OiBzdHJpbmc7XG4gIHNvcnRlZEdyb3VwTWVtYmVycz86IEFycmF5PENvbnZlcnNhdGlvblR5cGU+O1xuICBvbkRpcnR5Q2hhbmdlPyhkaXJ0eTogYm9vbGVhbik6IHVua25vd247XG4gIG9uRWRpdG9yU3RhdGVDaGFuZ2U/KFxuICAgIG1lc3NhZ2VUZXh0OiBzdHJpbmcsXG4gICAgYm9keVJhbmdlczogQXJyYXk8Qm9keVJhbmdlVHlwZT4sXG4gICAgY2FyZXRMb2NhdGlvbj86IG51bWJlclxuICApOiB1bmtub3duO1xuICBvblRleHRUb29Mb25nKCk6IHVua25vd247XG4gIG9uUGlja0Vtb2ppKG86IEVtb2ppUGlja0RhdGFUeXBlKTogdW5rbm93bjtcbiAgb25TdWJtaXQoXG4gICAgbWVzc2FnZTogc3RyaW5nLFxuICAgIG1lbnRpb25zOiBBcnJheTxCb2R5UmFuZ2VUeXBlPixcbiAgICB0aW1lc3RhbXA6IG51bWJlclxuICApOiB1bmtub3duO1xuICBnZXRRdW90ZWRNZXNzYWdlPygpOiB1bmtub3duO1xuICBjbGVhclF1b3RlZE1lc3NhZ2U/KCk6IHVua25vd247XG59O1xuXG5jb25zdCBNQVhfTEVOR1RIID0gNjQgKiAxMDI0O1xuY29uc3QgQkFTRV9DTEFTU19OQU1FID0gJ21vZHVsZS1jb21wb3NpdGlvbi1pbnB1dCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBDb21wb3NpdGlvbklucHV0KHByb3BzOiBQcm9wcyk6IFJlYWN0LlJlYWN0RWxlbWVudCB7XG4gIGNvbnN0IHtcbiAgICBjaGlsZHJlbixcbiAgICBpMThuLFxuICAgIGRpc2FibGVkLFxuICAgIGxhcmdlLFxuICAgIGlucHV0QXBpLFxuICAgIG1vZHVsZUNsYXNzTmFtZSxcbiAgICBvblBpY2tFbW9qaSxcbiAgICBvblN1Ym1pdCxcbiAgICBwbGFjZWhvbGRlcixcbiAgICBza2luVG9uZSxcbiAgICBkcmFmdFRleHQsXG4gICAgZHJhZnRCb2R5UmFuZ2VzLFxuICAgIGdldFByZWZlcnJlZEJhZGdlLFxuICAgIGdldFF1b3RlZE1lc3NhZ2UsXG4gICAgY2xlYXJRdW90ZWRNZXNzYWdlLFxuICAgIHNvcnRlZEdyb3VwTWVtYmVycyxcbiAgICB0aGVtZSxcbiAgfSA9IHByb3BzO1xuXG4gIGNvbnN0IFtlbW9qaUNvbXBsZXRpb25FbGVtZW50LCBzZXRFbW9qaUNvbXBsZXRpb25FbGVtZW50XSA9XG4gICAgUmVhY3QudXNlU3RhdGU8SlNYLkVsZW1lbnQ+KCk7XG4gIGNvbnN0IFtsYXN0U2VsZWN0aW9uUmFuZ2UsIHNldExhc3RTZWxlY3Rpb25SYW5nZV0gPVxuICAgIFJlYWN0LnVzZVN0YXRlPFJhbmdlU3RhdGljIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFttZW50aW9uQ29tcGxldGlvbkVsZW1lbnQsIHNldE1lbnRpb25Db21wbGV0aW9uRWxlbWVudF0gPVxuICAgIFJlYWN0LnVzZVN0YXRlPEpTWC5FbGVtZW50PigpO1xuXG4gIGNvbnN0IGVtb2ppQ29tcGxldGlvblJlZiA9IFJlYWN0LnVzZVJlZjxFbW9qaUNvbXBsZXRpb24+KCk7XG4gIGNvbnN0IG1lbnRpb25Db21wbGV0aW9uUmVmID0gUmVhY3QudXNlUmVmPE1lbnRpb25Db21wbGV0aW9uPigpO1xuICBjb25zdCBxdWlsbFJlZiA9IFJlYWN0LnVzZVJlZjxRdWlsbD4oKTtcbiAgY29uc3Qgc2Nyb2xsZXJSZWYgPSBSZWFjdC51c2VSZWY8SFRNTERpdkVsZW1lbnQ+KG51bGwpO1xuICBjb25zdCBwcm9wc1JlZiA9IFJlYWN0LnVzZVJlZjxQcm9wcz4ocHJvcHMpO1xuICBjb25zdCBtZW1iZXJSZXBvc2l0b3J5UmVmID0gUmVhY3QudXNlUmVmPE1lbWJlclJlcG9zaXRvcnk+KFxuICAgIG5ldyBNZW1iZXJSZXBvc2l0b3J5KClcbiAgKTtcblxuICBjb25zdCBnZW5lcmF0ZURlbHRhID0gKFxuICAgIHRleHQ6IHN0cmluZyxcbiAgICBib2R5UmFuZ2VzOiBBcnJheTxCb2R5UmFuZ2VUeXBlPlxuICApOiBEZWx0YSA9PiB7XG4gICAgY29uc3QgaW5pdGlhbE9wcyA9IFt7IGluc2VydDogdGV4dCB9XTtcbiAgICBjb25zdCBvcHNXaXRoTWVudGlvbnMgPSBpbnNlcnRNZW50aW9uT3BzKGluaXRpYWxPcHMsIGJvZHlSYW5nZXMpO1xuICAgIGNvbnN0IG9wc1dpdGhFbW9qaXMgPSBpbnNlcnRFbW9qaU9wcyhvcHNXaXRoTWVudGlvbnMpO1xuXG4gICAgcmV0dXJuIG5ldyBEZWx0YShvcHNXaXRoRW1vamlzKTtcbiAgfTtcblxuICBjb25zdCBnZXRUZXh0QW5kTWVudGlvbnMgPSAoKTogW3N0cmluZywgQXJyYXk8Qm9keVJhbmdlVHlwZT5dID0+IHtcbiAgICBjb25zdCBxdWlsbCA9IHF1aWxsUmVmLmN1cnJlbnQ7XG5cbiAgICBpZiAocXVpbGwgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIFsnJywgW11dO1xuICAgIH1cblxuICAgIGNvbnN0IGNvbnRlbnRzID0gcXVpbGwuZ2V0Q29udGVudHMoKTtcblxuICAgIGlmIChjb250ZW50cyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gWycnLCBbXV07XG4gICAgfVxuXG4gICAgY29uc3QgeyBvcHMgfSA9IGNvbnRlbnRzO1xuXG4gICAgaWYgKG9wcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gWycnLCBbXV07XG4gICAgfVxuXG4gICAgcmV0dXJuIGdldFRleHRBbmRNZW50aW9uc0Zyb21PcHMob3BzKTtcbiAgfTtcblxuICBjb25zdCBmb2N1cyA9ICgpID0+IHtcbiAgICBjb25zdCBxdWlsbCA9IHF1aWxsUmVmLmN1cnJlbnQ7XG5cbiAgICBpZiAocXVpbGwgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHF1aWxsLmZvY3VzKCk7XG4gIH07XG5cbiAgY29uc3QgaW5zZXJ0RW1vamkgPSAoZTogRW1vamlQaWNrRGF0YVR5cGUpID0+IHtcbiAgICBjb25zdCBxdWlsbCA9IHF1aWxsUmVmLmN1cnJlbnQ7XG5cbiAgICBpZiAocXVpbGwgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHJhbmdlID0gcXVpbGwuZ2V0U2VsZWN0aW9uKCk7XG5cbiAgICBjb25zdCBpbnNlcnRpb25SYW5nZSA9IHJhbmdlIHx8IGxhc3RTZWxlY3Rpb25SYW5nZTtcbiAgICBpZiAoaW5zZXJ0aW9uUmFuZ2UgPT09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBlbW9qaSA9IGNvbnZlcnRTaG9ydE5hbWUoZS5zaG9ydE5hbWUsIGUuc2tpblRvbmUpO1xuXG4gICAgY29uc3QgZGVsdGEgPSBuZXcgRGVsdGEoKVxuICAgICAgLnJldGFpbihpbnNlcnRpb25SYW5nZS5pbmRleClcbiAgICAgIC5kZWxldGUoaW5zZXJ0aW9uUmFuZ2UubGVuZ3RoKVxuICAgICAgLmluc2VydCh7IGVtb2ppIH0pO1xuXG4gICAgcXVpbGwudXBkYXRlQ29udGVudHMoZGVsdGEsICd1c2VyJyk7XG4gICAgcXVpbGwuc2V0U2VsZWN0aW9uKGluc2VydGlvblJhbmdlLmluZGV4ICsgMSwgMCwgJ3VzZXInKTtcbiAgfTtcblxuICBjb25zdCByZXNldCA9ICgpID0+IHtcbiAgICBjb25zdCBxdWlsbCA9IHF1aWxsUmVmLmN1cnJlbnQ7XG5cbiAgICBpZiAocXVpbGwgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHF1aWxsLnNldFRleHQoJycpO1xuXG4gICAgY29uc3QgaGlzdG9yeU1vZHVsZSA9IHF1aWxsLmdldE1vZHVsZSgnaGlzdG9yeScpO1xuXG4gICAgaWYgKGhpc3RvcnlNb2R1bGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGhpc3RvcnlNb2R1bGUuY2xlYXIoKTtcbiAgfTtcblxuICBjb25zdCByZXNldEVtb2ppUmVzdWx0cyA9ICgpID0+IHtcbiAgICBjb25zdCBlbW9qaUNvbXBsZXRpb24gPSBlbW9qaUNvbXBsZXRpb25SZWYuY3VycmVudDtcblxuICAgIGlmIChlbW9qaUNvbXBsZXRpb24gPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGVtb2ppQ29tcGxldGlvbi5yZXNldCgpO1xuICB9O1xuXG4gIGNvbnN0IHN1Ym1pdCA9ICgpID0+IHtcbiAgICBjb25zdCB0aW1lc3RhbXAgPSBEYXRlLm5vdygpO1xuICAgIGNvbnN0IHF1aWxsID0gcXVpbGxSZWYuY3VycmVudDtcblxuICAgIGlmIChxdWlsbCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgW3RleHQsIG1lbnRpb25zXSA9IGdldFRleHRBbmRNZW50aW9ucygpO1xuXG4gICAgbG9nLmluZm8oXG4gICAgICBgQ29tcG9zaXRpb25JbnB1dDogU3VibWl0dGluZyBtZXNzYWdlICR7dGltZXN0YW1wfSB3aXRoICR7bWVudGlvbnMubGVuZ3RofSBtZW50aW9uc2BcbiAgICApO1xuICAgIG9uU3VibWl0KHRleHQsIG1lbnRpb25zLCB0aW1lc3RhbXApO1xuICB9O1xuXG4gIGlmIChpbnB1dEFwaSkge1xuICAgIGlucHV0QXBpLmN1cnJlbnQgPSB7XG4gICAgICBmb2N1cyxcbiAgICAgIGluc2VydEVtb2ppLFxuICAgICAgcmVzZXQsXG4gICAgICByZXNldEVtb2ppUmVzdWx0cyxcbiAgICAgIHN1Ym1pdCxcbiAgICB9O1xuICB9XG5cbiAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICBwcm9wc1JlZi5jdXJyZW50ID0gcHJvcHM7XG4gIH0sIFtwcm9wc10pO1xuXG4gIGNvbnN0IG9uU2hvcnRLZXlFbnRlciA9ICgpOiBib29sZWFuID0+IHtcbiAgICBzdWJtaXQoKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgY29uc3Qgb25FbnRlciA9ICgpOiBib29sZWFuID0+IHtcbiAgICBjb25zdCBxdWlsbCA9IHF1aWxsUmVmLmN1cnJlbnQ7XG4gICAgY29uc3QgZW1vamlDb21wbGV0aW9uID0gZW1vamlDb21wbGV0aW9uUmVmLmN1cnJlbnQ7XG4gICAgY29uc3QgbWVudGlvbkNvbXBsZXRpb24gPSBtZW50aW9uQ29tcGxldGlvblJlZi5jdXJyZW50O1xuXG4gICAgaWYgKHF1aWxsID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoZW1vamlDb21wbGV0aW9uID09PSB1bmRlZmluZWQgfHwgbWVudGlvbkNvbXBsZXRpb24gPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmIChlbW9qaUNvbXBsZXRpb24ucmVzdWx0cy5sZW5ndGgpIHtcbiAgICAgIGVtb2ppQ29tcGxldGlvbi5jb21wbGV0ZUVtb2ppKCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKG1lbnRpb25Db21wbGV0aW9uLnJlc3VsdHMubGVuZ3RoKSB7XG4gICAgICBtZW50aW9uQ29tcGxldGlvbi5jb21wbGV0ZU1lbnRpb24oKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAocHJvcHNSZWYuY3VycmVudC5sYXJnZSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgc3VibWl0KCk7XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgY29uc3Qgb25UYWIgPSAoKTogYm9vbGVhbiA9PiB7XG4gICAgY29uc3QgcXVpbGwgPSBxdWlsbFJlZi5jdXJyZW50O1xuICAgIGNvbnN0IGVtb2ppQ29tcGxldGlvbiA9IGVtb2ppQ29tcGxldGlvblJlZi5jdXJyZW50O1xuICAgIGNvbnN0IG1lbnRpb25Db21wbGV0aW9uID0gbWVudGlvbkNvbXBsZXRpb25SZWYuY3VycmVudDtcblxuICAgIGlmIChxdWlsbCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKGVtb2ppQ29tcGxldGlvbiA9PT0gdW5kZWZpbmVkIHx8IG1lbnRpb25Db21wbGV0aW9uID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoZW1vamlDb21wbGV0aW9uLnJlc3VsdHMubGVuZ3RoKSB7XG4gICAgICBlbW9qaUNvbXBsZXRpb24uY29tcGxldGVFbW9qaSgpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmIChtZW50aW9uQ29tcGxldGlvbi5yZXN1bHRzLmxlbmd0aCkge1xuICAgICAgbWVudGlvbkNvbXBsZXRpb24uY29tcGxldGVNZW50aW9uKCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cbiAgY29uc3Qgb25Fc2NhcGUgPSAoKTogYm9vbGVhbiA9PiB7XG4gICAgY29uc3QgcXVpbGwgPSBxdWlsbFJlZi5jdXJyZW50O1xuXG4gICAgaWYgKHF1aWxsID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCBlbW9qaUNvbXBsZXRpb24gPSBlbW9qaUNvbXBsZXRpb25SZWYuY3VycmVudDtcbiAgICBjb25zdCBtZW50aW9uQ29tcGxldGlvbiA9IG1lbnRpb25Db21wbGV0aW9uUmVmLmN1cnJlbnQ7XG5cbiAgICBpZiAoZW1vamlDb21wbGV0aW9uKSB7XG4gICAgICBpZiAoZW1vamlDb21wbGV0aW9uLnJlc3VsdHMubGVuZ3RoKSB7XG4gICAgICAgIGVtb2ppQ29tcGxldGlvbi5yZXNldCgpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKG1lbnRpb25Db21wbGV0aW9uKSB7XG4gICAgICBpZiAobWVudGlvbkNvbXBsZXRpb24ucmVzdWx0cy5sZW5ndGgpIHtcbiAgICAgICAgbWVudGlvbkNvbXBsZXRpb24uY2xlYXJSZXN1bHRzKCk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoZ2V0UXVvdGVkTWVzc2FnZT8uKCkpIHtcbiAgICAgIGNsZWFyUXVvdGVkTWVzc2FnZT8uKCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cbiAgY29uc3Qgb25CYWNrc3BhY2UgPSAoKTogYm9vbGVhbiA9PiB7XG4gICAgY29uc3QgcXVpbGwgPSBxdWlsbFJlZi5jdXJyZW50O1xuXG4gICAgaWYgKHF1aWxsID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGNvbnN0IHNlbGVjdGlvbiA9IHF1aWxsLmdldFNlbGVjdGlvbigpO1xuICAgIGlmICghc2VsZWN0aW9uIHx8IHNlbGVjdGlvbi5sZW5ndGggPiAwKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBjb25zdCBbYmxvdFRvRGVsZXRlXSA9IHF1aWxsLmdldExlYWYoc2VsZWN0aW9uLmluZGV4KTtcbiAgICBpZiAoIWlzTWVudGlvbkJsb3QoYmxvdFRvRGVsZXRlKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgY29uc3QgY29udGVudHMgPSBxdWlsbC5nZXRDb250ZW50cygwLCBzZWxlY3Rpb24uaW5kZXggLSAxKTtcbiAgICBjb25zdCByZXN0YXJ0RGVsdGEgPSBnZXREZWx0YVRvUmVzdGFydE1lbnRpb24oY29udGVudHMub3BzKTtcblxuICAgIHF1aWxsLnVwZGF0ZUNvbnRlbnRzKHJlc3RhcnREZWx0YSk7XG4gICAgcXVpbGwuc2V0U2VsZWN0aW9uKHNlbGVjdGlvbi5pbmRleCwgMCk7XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgY29uc3Qgb25DaGFuZ2UgPSAoKTogdm9pZCA9PiB7XG4gICAgY29uc3QgcXVpbGwgPSBxdWlsbFJlZi5jdXJyZW50O1xuXG4gICAgY29uc3QgW3RleHQsIG1lbnRpb25zXSA9IGdldFRleHRBbmRNZW50aW9ucygpO1xuXG4gICAgaWYgKHF1aWxsICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvbnN0IGhpc3RvcnlNb2R1bGU6IEhpc3RvcnlTdGF0aWMgPSBxdWlsbC5nZXRNb2R1bGUoJ2hpc3RvcnknKTtcblxuICAgICAgaWYgKHRleHQubGVuZ3RoID4gTUFYX0xFTkdUSCkge1xuICAgICAgICBoaXN0b3J5TW9kdWxlLnVuZG8oKTtcbiAgICAgICAgcHJvcHNSZWYuY3VycmVudC5vblRleHRUb29Mb25nKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgeyBvbkVkaXRvclN0YXRlQ2hhbmdlIH0gPSBwcm9wc1JlZi5jdXJyZW50O1xuXG4gICAgICBpZiAob25FZGl0b3JTdGF0ZUNoYW5nZSkge1xuICAgICAgICAvLyBgZ2V0U2VsZWN0aW9uYCBpbnNpZGUgdGhlIGBvbkNoYW5nZWAgZXZlbnQgaGFuZGxlciB3aWxsIGJlIHRoZVxuICAgICAgICAvLyBzZWxlY3Rpb24gdmFsdWUgX2JlZm9yZV8gdGhlIGNoYW5nZSBvY2N1cnMuIGBzZXRUaW1lb3V0YCAwIGhlcmUgd2lsbFxuICAgICAgICAvLyBsZXQgYGdldFNlbGVjdGlvbmAgcmV0dXJuIHRoZSBzZWxlY3Rpb24gYWZ0ZXIgdGhlIGNoYW5nZSB0YWtlcyBwbGFjZS5cbiAgICAgICAgLy8gdGhpcyBpcyBuZWNlc3NhcnkgZm9yIGBtYXliZUdyYWJMaW5rUHJldmlld2AgYXMgaXQgbmVlZHMgdGhlIGNvcnJlY3RcbiAgICAgICAgLy8gYGNhcmV0TG9jYXRpb25gIGZyb20gdGhlIHBvc3QtY2hhbmdlIHNlbGVjdGlvbiBpbmRleCB2YWx1ZS5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgY29uc3Qgc2VsZWN0aW9uID0gcXVpbGwuZ2V0U2VsZWN0aW9uKCk7XG5cbiAgICAgICAgICBvbkVkaXRvclN0YXRlQ2hhbmdlKFxuICAgICAgICAgICAgdGV4dCxcbiAgICAgICAgICAgIG1lbnRpb25zLFxuICAgICAgICAgICAgc2VsZWN0aW9uID8gc2VsZWN0aW9uLmluZGV4IDogdW5kZWZpbmVkXG4gICAgICAgICAgKTtcbiAgICAgICAgfSwgMCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHByb3BzUmVmLmN1cnJlbnQub25EaXJ0eUNoYW5nZSkge1xuICAgICAgcHJvcHNSZWYuY3VycmVudC5vbkRpcnR5Q2hhbmdlKHRleHQubGVuZ3RoID4gMCk7XG4gICAgfVxuICB9O1xuXG4gIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgcXVpbGwgPSBxdWlsbFJlZi5jdXJyZW50O1xuXG4gICAgaWYgKHF1aWxsID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBxdWlsbC5lbmFibGUoIWRpc2FibGVkKTtcbiAgICBxdWlsbC5mb2N1cygpO1xuICB9LCBbZGlzYWJsZWRdKTtcblxuICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGVtb2ppQ29tcGxldGlvbiA9IGVtb2ppQ29tcGxldGlvblJlZi5jdXJyZW50O1xuXG4gICAgaWYgKGVtb2ppQ29tcGxldGlvbiA9PT0gdW5kZWZpbmVkIHx8IHNraW5Ub25lID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBlbW9qaUNvbXBsZXRpb24ub3B0aW9ucy5za2luVG9uZSA9IHNraW5Ub25lO1xuICB9LCBbc2tpblRvbmVdKTtcblxuICBSZWFjdC51c2VFZmZlY3QoXG4gICAgKCkgPT4gKCkgPT4ge1xuICAgICAgY29uc3QgZW1vamlDb21wbGV0aW9uID0gZW1vamlDb21wbGV0aW9uUmVmLmN1cnJlbnQ7XG4gICAgICBjb25zdCBtZW50aW9uQ29tcGxldGlvbiA9IG1lbnRpb25Db21wbGV0aW9uUmVmLmN1cnJlbnQ7XG5cbiAgICAgIGlmIChlbW9qaUNvbXBsZXRpb24gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBlbW9qaUNvbXBsZXRpb24uZGVzdHJveSgpO1xuICAgICAgfVxuXG4gICAgICBpZiAobWVudGlvbkNvbXBsZXRpb24gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBtZW50aW9uQ29tcGxldGlvbi5kZXN0cm95KCk7XG4gICAgICB9XG4gICAgfSxcbiAgICBbXVxuICApO1xuXG4gIGNvbnN0IHJlbW92ZVN0YWxlTWVudGlvbnMgPSAoY3VycmVudE1lbWJlcnM6IEFycmF5PENvbnZlcnNhdGlvblR5cGU+KSA9PiB7XG4gICAgY29uc3QgcXVpbGwgPSBxdWlsbFJlZi5jdXJyZW50O1xuXG4gICAgaWYgKHF1aWxsID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCB7IG9wcyB9ID0gcXVpbGwuZ2V0Q29udGVudHMoKTtcbiAgICBpZiAob3BzID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBjdXJyZW50TWVtYmVyVXVpZHMgPSBjdXJyZW50TWVtYmVyc1xuICAgICAgLm1hcChtID0+IG0udXVpZClcbiAgICAgIC5maWx0ZXIoaXNWYWxpZFV1aWQpO1xuXG4gICAgY29uc3QgbmV3RGVsdGEgPSBnZXREZWx0YVRvUmVtb3ZlU3RhbGVNZW50aW9ucyhvcHMsIGN1cnJlbnRNZW1iZXJVdWlkcyk7XG5cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgIHF1aWxsLnVwZGF0ZUNvbnRlbnRzKG5ld0RlbHRhIGFzIGFueSk7XG4gIH07XG5cbiAgY29uc3QgbWVtYmVySWRzID0gc29ydGVkR3JvdXBNZW1iZXJzID8gc29ydGVkR3JvdXBNZW1iZXJzLm1hcChtID0+IG0uaWQpIDogW107XG5cbiAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICBtZW1iZXJSZXBvc2l0b3J5UmVmLmN1cnJlbnQudXBkYXRlTWVtYmVycyhzb3J0ZWRHcm91cE1lbWJlcnMgfHwgW10pO1xuICAgIHJlbW92ZVN0YWxlTWVudGlvbnMoc29ydGVkR3JvdXBNZW1iZXJzIHx8IFtdKTtcbiAgICAvLyBXZSBhcmUgc3RpbGwgZGVwZW5kaW5nIG9uIG1lbWJlcnMsIGJ1dCBFU0xpbnQgY2FuJ3QgdGVsbFxuICAgIC8vIENvbXBhcmluZyB0aGUgYWN0dWFsIG1lbWJlcnMgbGlzdCBkb2VzIG5vdCB3b3JrIGZvciBhIGNvdXBsZSByZWFzb25zOlxuICAgIC8vICAgICogQXJyYXlzIHdpdGggdGhlIHNhbWUgb2JqZWN0cyBhcmUgbm90IFwiZXF1YWxcIiB0byBSZWFjdFxuICAgIC8vICAgICogV2Ugb25seSBjYXJlIGFib3V0IGFkZGVkL3JlbW92ZWQgbWVtYmVycywgaWdub3Jpbmcgb3RoZXIgYXR0cmlidXRlc1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZWFjdC1ob29rcy9leGhhdXN0aXZlLWRlcHNcbiAgfSwgW0pTT04uc3RyaW5naWZ5KG1lbWJlcklkcyldKTtcblxuICAvLyBQbGFjaW5nIGFsbCBvZiB0aGVzZSBjYWxsYmFja3MgaW5zaWRlIG9mIGEgcmVmIHNpbmNlIFF1aWxsIGlzIG5vdCBhYmxlXG4gIC8vIHRvIHJlLXJlbmRlci4gV2Ugd2FudCB0byBtYWtlIHN1cmUgdGhhdCBhbGwgdGhlc2UgY2FsbGJhY2tzIGFyZSBmcmVzaFxuICAvLyBzbyB0aGF0IHRoZSBjb25zdW1lcnMgb2YgdGhpcyBjb21wb25lbnQgd29uJ3QgZGVhbCB3aXRoIHN0YWxlIHByb3BzIG9yXG4gIC8vIHN0YWxlIHN0YXRlIGFzIHRoZSByZXN1bHQgb2YgY2FsbGluZyB0aGVtLlxuICBjb25zdCB1bnN0YWxlQ2FsbGJhY2tzID0ge1xuICAgIG9uQmFja3NwYWNlLFxuICAgIG9uQ2hhbmdlLFxuICAgIG9uRW50ZXIsXG4gICAgb25Fc2NhcGUsXG4gICAgb25QaWNrRW1vamksXG4gICAgb25TaG9ydEtleUVudGVyLFxuICAgIG9uVGFiLFxuICB9O1xuICBjb25zdCBjYWxsYmFja3NSZWYgPSBSZWFjdC51c2VSZWYodW5zdGFsZUNhbGxiYWNrcyk7XG4gIGNhbGxiYWNrc1JlZi5jdXJyZW50ID0gdW5zdGFsZUNhbGxiYWNrcztcblxuICBjb25zdCByZWFjdFF1aWxsID0gUmVhY3QudXNlTWVtbyhcbiAgICAoKSA9PiB7XG4gICAgICBjb25zdCBkZWx0YSA9IGdlbmVyYXRlRGVsdGEoZHJhZnRUZXh0IHx8ICcnLCBkcmFmdEJvZHlSYW5nZXMgfHwgW10pO1xuXG4gICAgICByZXR1cm4gKFxuICAgICAgICA8UmVhY3RRdWlsbFxuICAgICAgICAgIGNsYXNzTmFtZT17YCR7QkFTRV9DTEFTU19OQU1FfV9fcXVpbGxgfVxuICAgICAgICAgIG9uQ2hhbmdlPXsoKSA9PiBjYWxsYmFja3NSZWYuY3VycmVudC5vbkNoYW5nZSgpfVxuICAgICAgICAgIGRlZmF1bHRWYWx1ZT17ZGVsdGF9XG4gICAgICAgICAgbW9kdWxlcz17e1xuICAgICAgICAgICAgdG9vbGJhcjogZmFsc2UsXG4gICAgICAgICAgICBzaWduYWxDbGlwYm9hcmQ6IHRydWUsXG4gICAgICAgICAgICBjbGlwYm9hcmQ6IHtcbiAgICAgICAgICAgICAgbWF0Y2hlcnM6IFtcbiAgICAgICAgICAgICAgICBbJ0lNRycsIG1hdGNoRW1vamlJbWFnZV0sXG4gICAgICAgICAgICAgICAgWydJTUcnLCBtYXRjaEVtb2ppQmxvdF0sXG4gICAgICAgICAgICAgICAgWydTUEFOJywgbWF0Y2hSZWFjdEVtb2ppXSxcbiAgICAgICAgICAgICAgICBbTm9kZS5URVhUX05PREUsIG1hdGNoRW1vamlUZXh0XSxcbiAgICAgICAgICAgICAgICBbJ1NQQU4nLCBtYXRjaE1lbnRpb24obWVtYmVyUmVwb3NpdG9yeVJlZildLFxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGtleWJvYXJkOiB7XG4gICAgICAgICAgICAgIGJpbmRpbmdzOiB7XG4gICAgICAgICAgICAgICAgb25FbnRlcjoge1xuICAgICAgICAgICAgICAgICAga2V5OiAxMyxcbiAgICAgICAgICAgICAgICAgIGhhbmRsZXI6ICgpID0+IGNhbGxiYWNrc1JlZi5jdXJyZW50Lm9uRW50ZXIoKSxcbiAgICAgICAgICAgICAgICB9LCAvLyAxMyA9IEVudGVyXG4gICAgICAgICAgICAgICAgb25TaG9ydEtleUVudGVyOiB7XG4gICAgICAgICAgICAgICAgICBrZXk6IDEzLCAvLyAxMyA9IEVudGVyXG4gICAgICAgICAgICAgICAgICBzaG9ydEtleTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgIGhhbmRsZXI6ICgpID0+IGNhbGxiYWNrc1JlZi5jdXJyZW50Lm9uU2hvcnRLZXlFbnRlcigpLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb25Fc2NhcGU6IHtcbiAgICAgICAgICAgICAgICAgIGtleTogMjcsXG4gICAgICAgICAgICAgICAgICBoYW5kbGVyOiAoKSA9PiBjYWxsYmFja3NSZWYuY3VycmVudC5vbkVzY2FwZSgpLFxuICAgICAgICAgICAgICAgIH0sIC8vIDI3ID0gRXNjYXBlXG4gICAgICAgICAgICAgICAgb25CYWNrc3BhY2U6IHtcbiAgICAgICAgICAgICAgICAgIGtleTogOCxcbiAgICAgICAgICAgICAgICAgIGhhbmRsZXI6ICgpID0+IGNhbGxiYWNrc1JlZi5jdXJyZW50Lm9uQmFja3NwYWNlKCksXG4gICAgICAgICAgICAgICAgfSwgLy8gOCA9IEJhY2tzcGFjZVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVtb2ppQ29tcGxldGlvbjoge1xuICAgICAgICAgICAgICBzZXRFbW9qaVBpY2tlckVsZW1lbnQ6IHNldEVtb2ppQ29tcGxldGlvbkVsZW1lbnQsXG4gICAgICAgICAgICAgIG9uUGlja0Vtb2ppOiAoZW1vamk6IEVtb2ppUGlja0RhdGFUeXBlKSA9PlxuICAgICAgICAgICAgICAgIGNhbGxiYWNrc1JlZi5jdXJyZW50Lm9uUGlja0Vtb2ppKGVtb2ppKSxcbiAgICAgICAgICAgICAgc2tpblRvbmUsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbWVudGlvbkNvbXBsZXRpb246IHtcbiAgICAgICAgICAgICAgZ2V0UHJlZmVycmVkQmFkZ2UsXG4gICAgICAgICAgICAgIG1lOiBzb3J0ZWRHcm91cE1lbWJlcnNcbiAgICAgICAgICAgICAgICA/IHNvcnRlZEdyb3VwTWVtYmVycy5maW5kKGZvbyA9PiBmb28uaXNNZSlcbiAgICAgICAgICAgICAgICA6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgbWVtYmVyUmVwb3NpdG9yeVJlZixcbiAgICAgICAgICAgICAgc2V0TWVudGlvblBpY2tlckVsZW1lbnQ6IHNldE1lbnRpb25Db21wbGV0aW9uRWxlbWVudCxcbiAgICAgICAgICAgICAgaTE4bixcbiAgICAgICAgICAgICAgdGhlbWUsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH19XG4gICAgICAgICAgZm9ybWF0cz17WydlbW9qaScsICdtZW50aW9uJ119XG4gICAgICAgICAgcGxhY2Vob2xkZXI9e3BsYWNlaG9sZGVyIHx8IGkxOG4oJ3NlbmRNZXNzYWdlJyl9XG4gICAgICAgICAgcmVhZE9ubHk9e2Rpc2FibGVkfVxuICAgICAgICAgIHJlZj17ZWxlbWVudCA9PiB7XG4gICAgICAgICAgICBpZiAoZWxlbWVudCkge1xuICAgICAgICAgICAgICBjb25zdCBxdWlsbCA9IGVsZW1lbnQuZ2V0RWRpdG9yKCk7XG4gICAgICAgICAgICAgIGNvbnN0IGtleWJvYXJkID0gcXVpbGwuZ2V0TW9kdWxlKCdrZXlib2FyZCcpIGFzIEtleWJvYXJkU3RhdGljO1xuXG4gICAgICAgICAgICAgIC8vIGZvcmNlIHRoZSB0YWIgaGFuZGxlciB0byBiZSBwcmVwZW5kZWQsIG90aGVyd2lzZSBpdCB3b24ndCBiZVxuICAgICAgICAgICAgICAvLyBleGVjdXRlZDogaHR0cHM6Ly9naXRodWIuY29tL3F1aWxsanMvcXVpbGwvaXNzdWVzLzE5NjdcbiAgICAgICAgICAgICAga2V5Ym9hcmQuYmluZGluZ3NbOV0udW5zaGlmdCh7XG4gICAgICAgICAgICAgICAga2V5OiA5LFxuICAgICAgICAgICAgICAgIGhhbmRsZXI6ICgpID0+IGNhbGxiYWNrc1JlZi5jdXJyZW50Lm9uVGFiKCksXG4gICAgICAgICAgICAgIH0pOyAvLyA5ID0gVGFiXG4gICAgICAgICAgICAgIC8vIGFsc28sIHJlbW92ZSB0aGUgZGVmYXVsdCBcXHQgaW5zZXJ0aW9uIGJpbmRpbmdcbiAgICAgICAgICAgICAga2V5Ym9hcmQuYmluZGluZ3NbOV0ucG9wKCk7XG5cbiAgICAgICAgICAgICAgLy8gV2hlbiBsb2FkaW5nIGEgbXVsdGktbGluZSBtZXNzYWdlIG91dCBvZiBhIGRyYWZ0LCB0aGUgY3Vyc29yXG4gICAgICAgICAgICAgIC8vIHBvc2l0aW9uIG5lZWRzIHRvIGJlIHB1c2hlZCB0byB0aGUgZW5kIG9mIHRoZSBpbnB1dCBtYW51YWxseS5cbiAgICAgICAgICAgICAgcXVpbGwub25jZSgnZWRpdG9yLWNoYW5nZScsICgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBzY3JvbGxlciA9IHNjcm9sbGVyUmVmLmN1cnJlbnQ7XG5cbiAgICAgICAgICAgICAgICBpZiAoc2Nyb2xsZXIgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgIHF1aWxsLnNjcm9sbGluZ0NvbnRhaW5lciA9IHNjcm9sbGVyO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgcXVpbGwuc2V0U2VsZWN0aW9uKHF1aWxsLmdldExlbmd0aCgpLCAwKTtcbiAgICAgICAgICAgICAgICAgIHF1aWxsLnJvb3QuY2xhc3NMaXN0LmFkZCgncWwtZWRpdG9yLS1sb2FkZWQnKTtcbiAgICAgICAgICAgICAgICB9LCAwKTtcbiAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgcXVpbGwub24oXG4gICAgICAgICAgICAgICAgJ3NlbGVjdGlvbi1jaGFuZ2UnLFxuICAgICAgICAgICAgICAgIChuZXdSYW5nZTogUmFuZ2VTdGF0aWMsIG9sZFJhbmdlOiBSYW5nZVN0YXRpYykgPT4ge1xuICAgICAgICAgICAgICAgICAgLy8gSWYgd2UgbG9zZSBmb2N1cywgc3RvcmUgdGhlIGxhc3QgZWRpdCBwb2ludCBmb3IgZW1vamkgaW5zZXJ0aW9uXG4gICAgICAgICAgICAgICAgICBpZiAobmV3UmFuZ2UgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0TGFzdFNlbGVjdGlvblJhbmdlKG9sZFJhbmdlKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIHF1aWxsUmVmLmN1cnJlbnQgPSBxdWlsbDtcbiAgICAgICAgICAgICAgZW1vamlDb21wbGV0aW9uUmVmLmN1cnJlbnQgPSBxdWlsbC5nZXRNb2R1bGUoJ2Vtb2ppQ29tcGxldGlvbicpO1xuICAgICAgICAgICAgICBtZW50aW9uQ29tcGxldGlvblJlZi5jdXJyZW50ID1cbiAgICAgICAgICAgICAgICBxdWlsbC5nZXRNb2R1bGUoJ21lbnRpb25Db21wbGV0aW9uJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfX1cbiAgICAgICAgLz5cbiAgICAgICk7XG4gICAgfSxcbiAgICAvLyBxdWlsbCBzaG91bGRuJ3QgcmUtcmVuZGVyLCBhbGwgY2hhbmdlcyBzaG91bGQgdGFrZSBwbGFjZSBleGNsdXNpdmVseVxuICAgIC8vIHRocm91Z2ggbXV0YXRpbmcgdGhlIHF1aWxsIHN0YXRlIGRpcmVjdGx5IGluc3RlYWQgb2YgdGhyb3VnaCBwcm9wc1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZWFjdC1ob29rcy9leGhhdXN0aXZlLWRlcHNcbiAgICBbXVxuICApO1xuXG4gIC8vIFRoZSBvbkNsaWNrIGhhbmRsZXIgYmVsb3cgaXMgb25seSB0byBtYWtlIGl0IGVhc2llciBmb3IgbW91c2UgdXNlcnMgdG8gZm9jdXMgdGhlXG4gIC8vICAgbWVzc2FnZSBib3guIEluICdsYXJnZScgbW9kZSwgdGhlIGFjdHVhbCBRdWlsbCB0ZXh0IGJveCBjYW4gYmUgb25lIGxpbmUgd2hpbGUgdGhlXG4gIC8vICAgdmlzdWFsIHRleHQgYm94IGlzIG11Y2ggbGFyZ2VyLiBDbGlja2luZyB0aGF0IHNob3VsZCBhbGxvdyB5b3UgdG8gc3RhcnQgdHlwaW5nLFxuICAvLyAgIGhlbmNlIHRoZSBjbGljayBoYW5kbGVyLlxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbWF4LWxlblxuICAvKiBlc2xpbnQtZGlzYWJsZSBqc3gtYTExeS9jbGljay1ldmVudHMtaGF2ZS1rZXktZXZlbnRzLCBqc3gtYTExeS9uby1zdGF0aWMtZWxlbWVudC1pbnRlcmFjdGlvbnMgKi9cblxuICBjb25zdCBnZXRDbGFzc05hbWUgPSBnZXRDbGFzc05hbWVzRm9yKEJBU0VfQ0xBU1NfTkFNRSwgbW9kdWxlQ2xhc3NOYW1lKTtcblxuICByZXR1cm4gKFxuICAgIDxNYW5hZ2VyPlxuICAgICAgPFJlZmVyZW5jZT5cbiAgICAgICAgeyh7IHJlZiB9KSA9PiAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2dldENsYXNzTmFtZSgnX19pbnB1dCcpfSByZWY9e3JlZn0+XG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgIHJlZj17c2Nyb2xsZXJSZWZ9XG4gICAgICAgICAgICAgIG9uQ2xpY2s9e2ZvY3VzfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXG4gICAgICAgICAgICAgICAgZ2V0Q2xhc3NOYW1lKCdfX2lucHV0X19zY3JvbGxlcicpLFxuICAgICAgICAgICAgICAgIGxhcmdlID8gZ2V0Q2xhc3NOYW1lKCdfX2lucHV0X19zY3JvbGxlci0tbGFyZ2UnKSA6IG51bGwsXG4gICAgICAgICAgICAgICAgY2hpbGRyZW4gPyBnZXRDbGFzc05hbWUoJ19faW5wdXQtLXdpdGgtY2hpbGRyZW4nKSA6IG51bGxcbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge2NoaWxkcmVufVxuICAgICAgICAgICAgICB7cmVhY3RRdWlsbH1cbiAgICAgICAgICAgICAge2Vtb2ppQ29tcGxldGlvbkVsZW1lbnR9XG4gICAgICAgICAgICAgIHttZW50aW9uQ29tcGxldGlvbkVsZW1lbnR9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKX1cbiAgICAgIDwvUmVmZXJlbmNlPlxuICAgIDwvTWFuYWdlcj5cbiAgKTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxZQUF1QjtBQUV2Qix5QkFBa0I7QUFDbEIseUJBQXVCO0FBQ3ZCLHdCQUF1QjtBQUN2QiwwQkFBbUM7QUFFbkMsbUJBQWtCO0FBRWxCLHdCQUFrQztBQUNsQyxtQkFBMkM7QUFFM0MsaUJBQWlDO0FBSWpDLGtCQUE0QjtBQUM1QixrQkFBNEI7QUFDNUIsc0JBS087QUFDUCx1QkFBNkI7QUFDN0IsOEJBQWlDO0FBQ2pDLGtCQU9PO0FBQ1AsOEJBQWdDO0FBQ2hDLG1CQUFnQztBQUNoQyw4QkFBaUM7QUFDakMsVUFBcUI7QUFFckIscUJBQU0sU0FBUyxpQkFBaUIsc0JBQVM7QUFDekMscUJBQU0sU0FBUyxtQkFBbUIsdUJBQVc7QUFDN0MscUJBQU0sU0FBUyxpQkFBaUIsNEJBQWU7QUFDL0MscUJBQU0sU0FBUywyQkFBMkIsNEJBQWU7QUFDekQscUJBQU0sU0FBUyw2QkFBNkIsbUNBQWlCO0FBQzdELHFCQUFNLFNBQVMsMkJBQTJCLHVDQUFlO0FBOEN6RCxNQUFNLGFBQWEsS0FBSztBQUN4QixNQUFNLGtCQUFrQjtBQUVqQiwwQkFBMEIsT0FBa0M7QUFDakUsUUFBTTtBQUFBLElBQ0o7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtB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
