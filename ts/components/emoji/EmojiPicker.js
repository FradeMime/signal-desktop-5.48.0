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
var EmojiPicker_exports = {};
__export(EmojiPicker_exports, {
  EmojiPicker: () => EmojiPicker
});
module.exports = __toCommonJS(EmojiPicker_exports);
var React = __toESM(require("react"));
var import_classnames = __toESM(require("classnames"));
var import_react_virtualized = require("react-virtualized");
var import_lodash = require("lodash");
var import_focus_trap_react = __toESM(require("focus-trap-react"));
var import_Emoji = require("./Emoji");
var import_lib = require("./lib");
function focusOnRender(el) {
  if (el) {
    el.focus();
  }
}
const COL_COUNT = 8;
const categories = [
  "recents",
  "emoji",
  "animal",
  "food",
  "activity",
  "travel",
  "object",
  "symbol",
  "flag"
];
const EmojiPicker = React.memo(React.forwardRef(({
  i18n,
  doSend,
  onPickEmoji,
  skinTone = 0,
  onSetSkinTone,
  recentEmojis = [],
  style,
  onClickSettings,
  onClose
}, ref) => {
  const [firstRecent] = React.useState(recentEmojis);
  const [selectedCategory, setSelectedCategory] = React.useState(categories[0]);
  const [searchMode, setSearchMode] = React.useState(false);
  const [searchText, setSearchText] = React.useState("");
  const [scrollToRow, setScrollToRow] = React.useState(0);
  const [selectedTone, setSelectedTone] = React.useState(skinTone);
  const handleToggleSearch = React.useCallback((e) => {
    e.stopPropagation();
    setSearchText("");
    setSelectedCategory(categories[0]);
    setSearchMode((m) => !m);
  }, [setSearchText, setSearchMode]);
  const debounceSearchChange = React.useMemo(() => (0, import_lodash.debounce)((query) => {
    setScrollToRow(0);
    setSearchText(query);
  }, 200), [setSearchText, setScrollToRow]);
  const handleSearchChange = React.useCallback((e) => {
    debounceSearchChange(e.currentTarget.value);
  }, [debounceSearchChange]);
  const handlePickTone = React.useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    const { tone = "0" } = e.currentTarget.dataset;
    const parsedTone = parseInt(tone, 10);
    setSelectedTone(parsedTone);
    if (onSetSkinTone) {
      onSetSkinTone(parsedTone);
    }
  }, [onSetSkinTone]);
  const handlePickEmoji = React.useCallback((e) => {
    if ("key" in e) {
      if (e.key === "Enter" && doSend) {
        e.stopPropagation();
        e.preventDefault();
        doSend();
      }
    } else {
      const { shortName } = e.currentTarget.dataset;
      if (shortName) {
        e.stopPropagation();
        e.preventDefault();
        onPickEmoji({ skinTone: selectedTone, shortName });
      }
    }
  }, [doSend, onPickEmoji, selectedTone]);
  React.useEffect(() => {
    const handler = /* @__PURE__ */ __name((event) => {
      if (searchMode && event.key === "Escape") {
        setScrollToRow(0);
        setSearchText("");
        setSearchMode(false);
        event.preventDefault();
        event.stopPropagation();
      } else if (!searchMode && !event.ctrlKey && ![
        "ArrowUp",
        "ArrowDown",
        "ArrowLeft",
        "ArrowRight",
        "Shift",
        "Tab",
        " "
      ].includes(event.key)) {
        if (onClose) {
          onClose();
        }
        event.preventDefault();
        event.stopPropagation();
      }
    }, "handler");
    document.addEventListener("keydown", handler);
    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, [onClose, searchMode]);
  const [, ...renderableCategories] = categories;
  const emojiGrid = React.useMemo(() => {
    if (searchText) {
      return (0, import_lodash.chunk)((0, import_lib.search)(searchText).map((e) => e.short_name), COL_COUNT);
    }
    const chunks = (0, import_lodash.flatMap)(renderableCategories, (cat) => (0, import_lodash.chunk)(import_lib.dataByCategory[cat].map((e) => e.short_name), COL_COUNT));
    return [...(0, import_lodash.chunk)(firstRecent, COL_COUNT), ...chunks];
  }, [firstRecent, renderableCategories, searchText]);
  const rowCount = emojiGrid.length;
  const catRowEnds = React.useMemo(() => {
    const rowEnds = [
      Math.ceil(firstRecent.length / COL_COUNT) - 1
    ];
    renderableCategories.forEach((cat) => {
      rowEnds.push(Math.ceil(import_lib.dataByCategory[cat].length / COL_COUNT) + (0, import_lodash.last)(rowEnds));
    });
    return rowEnds;
  }, [firstRecent.length, renderableCategories]);
  const catToRowOffsets = React.useMemo(() => {
    const offsets = (0, import_lodash.initial)(catRowEnds).map((i) => i + 1);
    return (0, import_lodash.zipObject)(categories, [0, ...offsets]);
  }, [catRowEnds]);
  const catOffsetEntries = React.useMemo(() => Object.entries(catToRowOffsets), [catToRowOffsets]);
  const handleSelectCategory = React.useCallback((e) => {
    e.stopPropagation();
    const { category } = e.currentTarget.dataset;
    if (category) {
      setSelectedCategory(category);
      setScrollToRow(catToRowOffsets[category]);
    }
  }, [catToRowOffsets, setSelectedCategory, setScrollToRow]);
  const cellRenderer = React.useCallback(({ key, style: cellStyle, rowIndex, columnIndex }) => {
    const shortName = emojiGrid[rowIndex][columnIndex];
    return shortName ? /* @__PURE__ */ React.createElement("div", {
      key,
      className: "module-emoji-picker__body__emoji-cell",
      style: cellStyle
    }, /* @__PURE__ */ React.createElement("button", {
      type: "button",
      className: "module-emoji-picker__button",
      onClick: handlePickEmoji,
      onKeyDown: handlePickEmoji,
      "data-short-name": shortName,
      title: shortName
    }, /* @__PURE__ */ React.createElement(import_Emoji.Emoji, {
      shortName,
      skinTone: selectedTone
    }))) : null;
  }, [emojiGrid, handlePickEmoji, selectedTone]);
  const getRowHeight = React.useCallback(({ index }) => {
    if (searchText) {
      return 34;
    }
    if (catRowEnds.includes(index) && index !== (0, import_lodash.last)(catRowEnds)) {
      return 44;
    }
    return 34;
  }, [catRowEnds, searchText]);
  const onSectionRendered = React.useMemo(() => (0, import_lodash.debounce)(({ rowStartIndex }) => {
    const [cat] = (0, import_lodash.findLast)(catOffsetEntries, ([, row]) => rowStartIndex >= row) || categories;
    setSelectedCategory(cat);
  }, 10), [catOffsetEntries]);
  return /* @__PURE__ */ React.createElement(import_focus_trap_react.default, {
    focusTrapOptions: {
      allowOutsideClick: true
    }
  }, /* @__PURE__ */ React.createElement("div", {
    className: "module-emoji-picker",
    ref,
    style
  }, /* @__PURE__ */ React.createElement("header", {
    className: "module-emoji-picker__header"
  }, /* @__PURE__ */ React.createElement("button", {
    type: "button",
    onClick: handleToggleSearch,
    title: i18n("EmojiPicker--search-placeholder"),
    className: (0, import_classnames.default)("module-emoji-picker__button", "module-emoji-picker__button--icon", searchMode ? "module-emoji-picker__button--icon--close" : "module-emoji-picker__button--icon--search"),
    "aria-label": i18n("EmojiPicker--search-placeholder")
  }), searchMode ? /* @__PURE__ */ React.createElement("div", {
    className: "module-emoji-picker__header__search-field"
  }, /* @__PURE__ */ React.createElement("input", {
    ref: focusOnRender,
    className: "module-emoji-picker__header__search-field__input",
    placeholder: i18n("EmojiPicker--search-placeholder"),
    onChange: handleSearchChange
  })) : categories.map((cat) => cat === "recents" && firstRecent.length === 0 ? null : /* @__PURE__ */ React.createElement("button", {
    type: "button",
    key: cat,
    "data-category": cat,
    title: cat,
    onClick: handleSelectCategory,
    className: (0, import_classnames.default)("module-emoji-picker__button", "module-emoji-picker__button--icon", `module-emoji-picker__button--icon--${cat}`, selectedCategory === cat ? "module-emoji-picker__button--selected" : null),
    "aria-label": i18n(`EmojiPicker__button--${cat}`)
  }))), rowCount > 0 ? /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(import_react_virtualized.AutoSizer, null, ({ width, height }) => /* @__PURE__ */ React.createElement(import_react_virtualized.Grid, {
    key: searchText,
    className: "module-emoji-picker__body",
    width,
    height,
    columnCount: COL_COUNT,
    columnWidth: 38,
    rowHeight: getRowHeight,
    rowCount,
    cellRenderer,
    scrollToRow: (0, import_lodash.clamp)(scrollToRow, 0, rowCount - 1),
    scrollToAlignment: "start",
    onSectionRendered
  }))) : /* @__PURE__ */ React.createElement("div", {
    className: (0, import_classnames.default)("module-emoji-picker__body", "module-emoji-picker__body--empty")
  }, i18n("EmojiPicker--empty"), /* @__PURE__ */ React.createElement(import_Emoji.Emoji, {
    shortName: "slightly_frowning_face",
    size: 16,
    style: { marginLeft: "4px" }
  })), /* @__PURE__ */ React.createElement("footer", {
    className: "module-emoji-picker__footer"
  }, Boolean(onClickSettings) && /* @__PURE__ */ React.createElement("button", {
    "aria-label": i18n("CustomizingPreferredReactions__title"),
    className: "module-emoji-picker__button module-emoji-picker__button--footer module-emoji-picker__button--settings",
    onClick: onClickSettings,
    title: i18n("CustomizingPreferredReactions__title"),
    type: "button"
  }), onSetSkinTone ? /* @__PURE__ */ React.createElement("div", {
    className: "module-emoji-picker__footer__skin-tones"
  }, [0, 1, 2, 3, 4, 5].map((tone) => /* @__PURE__ */ React.createElement("button", {
    type: "button",
    key: tone,
    "data-tone": tone,
    onClick: handlePickTone,
    title: i18n("EmojiPicker--skin-tone", [`${tone}`]),
    className: (0, import_classnames.default)("module-emoji-picker__button", "module-emoji-picker__button--footer", selectedTone === tone ? "module-emoji-picker__button--selected" : null)
  }, /* @__PURE__ */ React.createElement(import_Emoji.Emoji, {
    shortName: "hand",
    skinTone: tone,
    size: 20
  })))) : null, Boolean(onClickSettings) && /* @__PURE__ */ React.createElement("div", {
    className: "module-emoji-picker__footer__settings-spacer"
  }))));
}));
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  EmojiPicker
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiRW1vamlQaWNrZXIudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAxOS0yMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgdHlwZSB7XG4gIEdyaWRDZWxsUmVuZGVyZXIsXG4gIFNlY3Rpb25SZW5kZXJlZFBhcmFtcyxcbn0gZnJvbSAncmVhY3QtdmlydHVhbGl6ZWQnO1xuaW1wb3J0IHsgQXV0b1NpemVyLCBHcmlkIH0gZnJvbSAncmVhY3QtdmlydHVhbGl6ZWQnO1xuaW1wb3J0IHtcbiAgY2h1bmssXG4gIGNsYW1wLFxuICBkZWJvdW5jZSxcbiAgZmluZExhc3QsXG4gIGZsYXRNYXAsXG4gIGluaXRpYWwsXG4gIGxhc3QsXG4gIHppcE9iamVjdCxcbn0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBGb2N1c1RyYXAgZnJvbSAnZm9jdXMtdHJhcC1yZWFjdCc7XG5cbmltcG9ydCB7IEVtb2ppIH0gZnJvbSAnLi9FbW9qaSc7XG5pbXBvcnQgeyBkYXRhQnlDYXRlZ29yeSwgc2VhcmNoIH0gZnJvbSAnLi9saWInO1xuaW1wb3J0IHR5cGUgeyBMb2NhbGl6ZXJUeXBlIH0gZnJvbSAnLi4vLi4vdHlwZXMvVXRpbCc7XG5cbmV4cG9ydCB0eXBlIEVtb2ppUGlja0RhdGFUeXBlID0ge1xuICBza2luVG9uZT86IG51bWJlcjtcbiAgc2hvcnROYW1lOiBzdHJpbmc7XG59O1xuXG5leHBvcnQgdHlwZSBPd25Qcm9wcyA9IHtcbiAgcmVhZG9ubHkgaTE4bjogTG9jYWxpemVyVHlwZTtcbiAgcmVhZG9ubHkgb25QaWNrRW1vamk6IChvOiBFbW9qaVBpY2tEYXRhVHlwZSkgPT4gdW5rbm93bjtcbiAgcmVhZG9ubHkgZG9TZW5kPzogKCkgPT4gdW5rbm93bjtcbiAgcmVhZG9ubHkgc2tpblRvbmU/OiBudW1iZXI7XG4gIHJlYWRvbmx5IG9uU2V0U2tpblRvbmU/OiAodG9uZTogbnVtYmVyKSA9PiB1bmtub3duO1xuICByZWFkb25seSByZWNlbnRFbW9qaXM/OiBBcnJheTxzdHJpbmc+O1xuICByZWFkb25seSBvbkNsaWNrU2V0dGluZ3M/OiAoKSA9PiB1bmtub3duO1xuICByZWFkb25seSBvbkNsb3NlPzogKCkgPT4gdW5rbm93bjtcbn07XG5cbmV4cG9ydCB0eXBlIFByb3BzID0gT3duUHJvcHMgJiBQaWNrPFJlYWN0LkhUTUxQcm9wczxIVE1MRGl2RWxlbWVudD4sICdzdHlsZSc+O1xuXG5mdW5jdGlvbiBmb2N1c09uUmVuZGVyKGVsOiBIVE1MRWxlbWVudCB8IG51bGwpIHtcbiAgaWYgKGVsKSB7XG4gICAgZWwuZm9jdXMoKTtcbiAgfVxufVxuXG5jb25zdCBDT0xfQ09VTlQgPSA4O1xuXG5jb25zdCBjYXRlZ29yaWVzID0gW1xuICAncmVjZW50cycsXG4gICdlbW9qaScsXG4gICdhbmltYWwnLFxuICAnZm9vZCcsXG4gICdhY3Rpdml0eScsXG4gICd0cmF2ZWwnLFxuICAnb2JqZWN0JyxcbiAgJ3N5bWJvbCcsXG4gICdmbGFnJyxcbl07XG5cbmV4cG9ydCBjb25zdCBFbW9qaVBpY2tlciA9IFJlYWN0Lm1lbW8oXG4gIFJlYWN0LmZvcndhcmRSZWY8SFRNTERpdkVsZW1lbnQsIFByb3BzPihcbiAgICAoXG4gICAgICB7XG4gICAgICAgIGkxOG4sXG4gICAgICAgIGRvU2VuZCxcbiAgICAgICAgb25QaWNrRW1vamksXG4gICAgICAgIHNraW5Ub25lID0gMCxcbiAgICAgICAgb25TZXRTa2luVG9uZSxcbiAgICAgICAgcmVjZW50RW1vamlzID0gW10sXG4gICAgICAgIHN0eWxlLFxuICAgICAgICBvbkNsaWNrU2V0dGluZ3MsXG4gICAgICAgIG9uQ2xvc2UsXG4gICAgICB9OiBQcm9wcyxcbiAgICAgIHJlZlxuICAgICkgPT4ge1xuICAgICAgY29uc3QgW2ZpcnN0UmVjZW50XSA9IFJlYWN0LnVzZVN0YXRlKHJlY2VudEVtb2ppcyk7XG4gICAgICBjb25zdCBbc2VsZWN0ZWRDYXRlZ29yeSwgc2V0U2VsZWN0ZWRDYXRlZ29yeV0gPSBSZWFjdC51c2VTdGF0ZShcbiAgICAgICAgY2F0ZWdvcmllc1swXVxuICAgICAgKTtcbiAgICAgIGNvbnN0IFtzZWFyY2hNb2RlLCBzZXRTZWFyY2hNb2RlXSA9IFJlYWN0LnVzZVN0YXRlKGZhbHNlKTtcbiAgICAgIGNvbnN0IFtzZWFyY2hUZXh0LCBzZXRTZWFyY2hUZXh0XSA9IFJlYWN0LnVzZVN0YXRlKCcnKTtcbiAgICAgIGNvbnN0IFtzY3JvbGxUb1Jvdywgc2V0U2Nyb2xsVG9Sb3ddID0gUmVhY3QudXNlU3RhdGUoMCk7XG4gICAgICBjb25zdCBbc2VsZWN0ZWRUb25lLCBzZXRTZWxlY3RlZFRvbmVdID0gUmVhY3QudXNlU3RhdGUoc2tpblRvbmUpO1xuXG4gICAgICBjb25zdCBoYW5kbGVUb2dnbGVTZWFyY2ggPSBSZWFjdC51c2VDYWxsYmFjayhcbiAgICAgICAgKGU6IFJlYWN0Lk1vdXNlRXZlbnQpID0+IHtcbiAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgIHNldFNlYXJjaFRleHQoJycpO1xuICAgICAgICAgIHNldFNlbGVjdGVkQ2F0ZWdvcnkoY2F0ZWdvcmllc1swXSk7XG4gICAgICAgICAgc2V0U2VhcmNoTW9kZShtID0+ICFtKTtcbiAgICAgICAgfSxcbiAgICAgICAgW3NldFNlYXJjaFRleHQsIHNldFNlYXJjaE1vZGVdXG4gICAgICApO1xuXG4gICAgICBjb25zdCBkZWJvdW5jZVNlYXJjaENoYW5nZSA9IFJlYWN0LnVzZU1lbW8oXG4gICAgICAgICgpID0+XG4gICAgICAgICAgZGVib3VuY2UoKHF1ZXJ5OiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgIHNldFNjcm9sbFRvUm93KDApO1xuICAgICAgICAgICAgc2V0U2VhcmNoVGV4dChxdWVyeSk7XG4gICAgICAgICAgfSwgMjAwKSxcbiAgICAgICAgW3NldFNlYXJjaFRleHQsIHNldFNjcm9sbFRvUm93XVxuICAgICAgKTtcblxuICAgICAgY29uc3QgaGFuZGxlU2VhcmNoQ2hhbmdlID0gUmVhY3QudXNlQ2FsbGJhY2soXG4gICAgICAgIChlOiBSZWFjdC5DaGFuZ2VFdmVudDxIVE1MSW5wdXRFbGVtZW50PikgPT4ge1xuICAgICAgICAgIGRlYm91bmNlU2VhcmNoQ2hhbmdlKGUuY3VycmVudFRhcmdldC52YWx1ZSk7XG4gICAgICAgIH0sXG4gICAgICAgIFtkZWJvdW5jZVNlYXJjaENoYW5nZV1cbiAgICAgICk7XG5cbiAgICAgIGNvbnN0IGhhbmRsZVBpY2tUb25lID0gUmVhY3QudXNlQ2FsbGJhY2soXG4gICAgICAgIChlOiBSZWFjdC5Nb3VzZUV2ZW50PEhUTUxCdXR0b25FbGVtZW50PikgPT4ge1xuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgICAgY29uc3QgeyB0b25lID0gJzAnIH0gPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldDtcbiAgICAgICAgICBjb25zdCBwYXJzZWRUb25lID0gcGFyc2VJbnQodG9uZSwgMTApO1xuICAgICAgICAgIHNldFNlbGVjdGVkVG9uZShwYXJzZWRUb25lKTtcbiAgICAgICAgICBpZiAob25TZXRTa2luVG9uZSkge1xuICAgICAgICAgICAgb25TZXRTa2luVG9uZShwYXJzZWRUb25lKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFtvblNldFNraW5Ub25lXVxuICAgICAgKTtcblxuICAgICAgY29uc3QgaGFuZGxlUGlja0Vtb2ppID0gUmVhY3QudXNlQ2FsbGJhY2soXG4gICAgICAgIChcbiAgICAgICAgICBlOlxuICAgICAgICAgICAgfCBSZWFjdC5Nb3VzZUV2ZW50PEhUTUxCdXR0b25FbGVtZW50PlxuICAgICAgICAgICAgfCBSZWFjdC5LZXlib2FyZEV2ZW50PEhUTUxCdXR0b25FbGVtZW50PlxuICAgICAgICApID0+IHtcbiAgICAgICAgICBpZiAoJ2tleScgaW4gZSkge1xuICAgICAgICAgICAgaWYgKGUua2V5ID09PSAnRW50ZXInICYmIGRvU2VuZCkge1xuICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgIGRvU2VuZCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCB7IHNob3J0TmFtZSB9ID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQ7XG4gICAgICAgICAgICBpZiAoc2hvcnROYW1lKSB7XG4gICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgb25QaWNrRW1vamkoeyBza2luVG9uZTogc2VsZWN0ZWRUb25lLCBzaG9ydE5hbWUgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBbZG9TZW5kLCBvblBpY2tFbW9qaSwgc2VsZWN0ZWRUb25lXVxuICAgICAgKTtcblxuICAgICAgLy8gSGFuZGxlIGVzY2FwZSBrZXlcbiAgICAgIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIGNvbnN0IGhhbmRsZXIgPSAoZXZlbnQ6IEtleWJvYXJkRXZlbnQpID0+IHtcbiAgICAgICAgICBpZiAoc2VhcmNoTW9kZSAmJiBldmVudC5rZXkgPT09ICdFc2NhcGUnKSB7XG4gICAgICAgICAgICBzZXRTY3JvbGxUb1JvdygwKTtcbiAgICAgICAgICAgIHNldFNlYXJjaFRleHQoJycpO1xuICAgICAgICAgICAgc2V0U2VhcmNoTW9kZShmYWxzZSk7XG5cbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgIXNlYXJjaE1vZGUgJiZcbiAgICAgICAgICAgICFldmVudC5jdHJsS2V5ICYmXG4gICAgICAgICAgICAhW1xuICAgICAgICAgICAgICAnQXJyb3dVcCcsXG4gICAgICAgICAgICAgICdBcnJvd0Rvd24nLFxuICAgICAgICAgICAgICAnQXJyb3dMZWZ0JyxcbiAgICAgICAgICAgICAgJ0Fycm93UmlnaHQnLFxuICAgICAgICAgICAgICAnU2hpZnQnLFxuICAgICAgICAgICAgICAnVGFiJyxcbiAgICAgICAgICAgICAgJyAnLCAvLyBTcGFjZVxuICAgICAgICAgICAgXS5pbmNsdWRlcyhldmVudC5rZXkpXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBpZiAob25DbG9zZSkge1xuICAgICAgICAgICAgICBvbkNsb3NlKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGhhbmRsZXIpO1xuXG4gICAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGhhbmRsZXIpO1xuICAgICAgICB9O1xuICAgICAgfSwgW29uQ2xvc2UsIHNlYXJjaE1vZGVdKTtcblxuICAgICAgY29uc3QgWywgLi4ucmVuZGVyYWJsZUNhdGVnb3JpZXNdID0gY2F0ZWdvcmllcztcblxuICAgICAgY29uc3QgZW1vamlHcmlkID0gUmVhY3QudXNlTWVtbygoKSA9PiB7XG4gICAgICAgIGlmIChzZWFyY2hUZXh0KSB7XG4gICAgICAgICAgcmV0dXJuIGNodW5rKFxuICAgICAgICAgICAgc2VhcmNoKHNlYXJjaFRleHQpLm1hcChlID0+IGUuc2hvcnRfbmFtZSksXG4gICAgICAgICAgICBDT0xfQ09VTlRcbiAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY2h1bmtzID0gZmxhdE1hcChyZW5kZXJhYmxlQ2F0ZWdvcmllcywgY2F0ID0+XG4gICAgICAgICAgY2h1bmsoXG4gICAgICAgICAgICBkYXRhQnlDYXRlZ29yeVtjYXRdLm1hcChlID0+IGUuc2hvcnRfbmFtZSksXG4gICAgICAgICAgICBDT0xfQ09VTlRcbiAgICAgICAgICApXG4gICAgICAgICk7XG5cbiAgICAgICAgcmV0dXJuIFsuLi5jaHVuayhmaXJzdFJlY2VudCwgQ09MX0NPVU5UKSwgLi4uY2h1bmtzXTtcbiAgICAgIH0sIFtmaXJzdFJlY2VudCwgcmVuZGVyYWJsZUNhdGVnb3JpZXMsIHNlYXJjaFRleHRdKTtcblxuICAgICAgY29uc3Qgcm93Q291bnQgPSBlbW9qaUdyaWQubGVuZ3RoO1xuXG4gICAgICBjb25zdCBjYXRSb3dFbmRzID0gUmVhY3QudXNlTWVtbygoKSA9PiB7XG4gICAgICAgIGNvbnN0IHJvd0VuZHM6IEFycmF5PG51bWJlcj4gPSBbXG4gICAgICAgICAgTWF0aC5jZWlsKGZpcnN0UmVjZW50Lmxlbmd0aCAvIENPTF9DT1VOVCkgLSAxLFxuICAgICAgICBdO1xuXG4gICAgICAgIHJlbmRlcmFibGVDYXRlZ29yaWVzLmZvckVhY2goY2F0ID0+IHtcbiAgICAgICAgICByb3dFbmRzLnB1c2goXG4gICAgICAgICAgICBNYXRoLmNlaWwoZGF0YUJ5Q2F0ZWdvcnlbY2F0XS5sZW5ndGggLyBDT0xfQ09VTlQpICtcbiAgICAgICAgICAgICAgKGxhc3Qocm93RW5kcykgYXMgbnVtYmVyKVxuICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiByb3dFbmRzO1xuICAgICAgfSwgW2ZpcnN0UmVjZW50Lmxlbmd0aCwgcmVuZGVyYWJsZUNhdGVnb3JpZXNdKTtcblxuICAgICAgY29uc3QgY2F0VG9Sb3dPZmZzZXRzID0gUmVhY3QudXNlTWVtbygoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9mZnNldHMgPSBpbml0aWFsKGNhdFJvd0VuZHMpLm1hcChpID0+IGkgKyAxKTtcblxuICAgICAgICByZXR1cm4gemlwT2JqZWN0KGNhdGVnb3JpZXMsIFswLCAuLi5vZmZzZXRzXSk7XG4gICAgICB9LCBbY2F0Um93RW5kc10pO1xuXG4gICAgICBjb25zdCBjYXRPZmZzZXRFbnRyaWVzID0gUmVhY3QudXNlTWVtbyhcbiAgICAgICAgKCkgPT4gT2JqZWN0LmVudHJpZXMoY2F0VG9Sb3dPZmZzZXRzKSxcbiAgICAgICAgW2NhdFRvUm93T2Zmc2V0c11cbiAgICAgICk7XG5cbiAgICAgIGNvbnN0IGhhbmRsZVNlbGVjdENhdGVnb3J5ID0gUmVhY3QudXNlQ2FsbGJhY2soXG4gICAgICAgIChlOiBSZWFjdC5Nb3VzZUV2ZW50PEhUTUxCdXR0b25FbGVtZW50PikgPT4ge1xuICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgY29uc3QgeyBjYXRlZ29yeSB9ID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQ7XG4gICAgICAgICAgaWYgKGNhdGVnb3J5KSB7XG4gICAgICAgICAgICBzZXRTZWxlY3RlZENhdGVnb3J5KGNhdGVnb3J5KTtcbiAgICAgICAgICAgIHNldFNjcm9sbFRvUm93KGNhdFRvUm93T2Zmc2V0c1tjYXRlZ29yeV0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgW2NhdFRvUm93T2Zmc2V0cywgc2V0U2VsZWN0ZWRDYXRlZ29yeSwgc2V0U2Nyb2xsVG9Sb3ddXG4gICAgICApO1xuXG4gICAgICBjb25zdCBjZWxsUmVuZGVyZXIgPSBSZWFjdC51c2VDYWxsYmFjazxHcmlkQ2VsbFJlbmRlcmVyPihcbiAgICAgICAgKHsga2V5LCBzdHlsZTogY2VsbFN0eWxlLCByb3dJbmRleCwgY29sdW1uSW5kZXggfSkgPT4ge1xuICAgICAgICAgIGNvbnN0IHNob3J0TmFtZSA9IGVtb2ppR3JpZFtyb3dJbmRleF1bY29sdW1uSW5kZXhdO1xuXG4gICAgICAgICAgcmV0dXJuIHNob3J0TmFtZSA/IChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAga2V5PXtrZXl9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cIm1vZHVsZS1lbW9qaS1waWNrZXJfX2JvZHlfX2Vtb2ppLWNlbGxcIlxuICAgICAgICAgICAgICBzdHlsZT17Y2VsbFN0eWxlfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwibW9kdWxlLWVtb2ppLXBpY2tlcl9fYnV0dG9uXCJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVQaWNrRW1vaml9XG4gICAgICAgICAgICAgICAgb25LZXlEb3duPXtoYW5kbGVQaWNrRW1vaml9XG4gICAgICAgICAgICAgICAgZGF0YS1zaG9ydC1uYW1lPXtzaG9ydE5hbWV9XG4gICAgICAgICAgICAgICAgdGl0bGU9e3Nob3J0TmFtZX1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxFbW9qaSBzaG9ydE5hbWU9e3Nob3J0TmFtZX0gc2tpblRvbmU9e3NlbGVjdGVkVG9uZX0gLz5cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApIDogbnVsbDtcbiAgICAgICAgfSxcbiAgICAgICAgW2Vtb2ppR3JpZCwgaGFuZGxlUGlja0Vtb2ppLCBzZWxlY3RlZFRvbmVdXG4gICAgICApO1xuXG4gICAgICBjb25zdCBnZXRSb3dIZWlnaHQgPSBSZWFjdC51c2VDYWxsYmFjayhcbiAgICAgICAgKHsgaW5kZXggfTogeyBpbmRleDogbnVtYmVyIH0pID0+IHtcbiAgICAgICAgICBpZiAoc2VhcmNoVGV4dCkge1xuICAgICAgICAgICAgcmV0dXJuIDM0O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChjYXRSb3dFbmRzLmluY2x1ZGVzKGluZGV4KSAmJiBpbmRleCAhPT0gbGFzdChjYXRSb3dFbmRzKSkge1xuICAgICAgICAgICAgcmV0dXJuIDQ0O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiAzNDtcbiAgICAgICAgfSxcbiAgICAgICAgW2NhdFJvd0VuZHMsIHNlYXJjaFRleHRdXG4gICAgICApO1xuXG4gICAgICBjb25zdCBvblNlY3Rpb25SZW5kZXJlZCA9IFJlYWN0LnVzZU1lbW8oXG4gICAgICAgICgpID0+XG4gICAgICAgICAgZGVib3VuY2UoKHsgcm93U3RhcnRJbmRleCB9OiBTZWN0aW9uUmVuZGVyZWRQYXJhbXMpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IFtjYXRdID1cbiAgICAgICAgICAgICAgZmluZExhc3QoY2F0T2Zmc2V0RW50cmllcywgKFssIHJvd10pID0+IHJvd1N0YXJ0SW5kZXggPj0gcm93KSB8fFxuICAgICAgICAgICAgICBjYXRlZ29yaWVzO1xuXG4gICAgICAgICAgICBzZXRTZWxlY3RlZENhdGVnb3J5KGNhdCk7XG4gICAgICAgICAgfSwgMTApLFxuICAgICAgICBbY2F0T2Zmc2V0RW50cmllc11cbiAgICAgICk7XG5cbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxGb2N1c1RyYXBcbiAgICAgICAgICBmb2N1c1RyYXBPcHRpb25zPXt7XG4gICAgICAgICAgICBhbGxvd091dHNpZGVDbGljazogdHJ1ZSxcbiAgICAgICAgICB9fVxuICAgICAgICA+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2R1bGUtZW1vamktcGlja2VyXCIgcmVmPXtyZWZ9IHN0eWxlPXtzdHlsZX0+XG4gICAgICAgICAgICA8aGVhZGVyIGNsYXNzTmFtZT1cIm1vZHVsZS1lbW9qaS1waWNrZXJfX2hlYWRlclwiPlxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlVG9nZ2xlU2VhcmNofVxuICAgICAgICAgICAgICAgIHRpdGxlPXtpMThuKCdFbW9qaVBpY2tlci0tc2VhcmNoLXBsYWNlaG9sZGVyJyl9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFxuICAgICAgICAgICAgICAgICAgJ21vZHVsZS1lbW9qaS1waWNrZXJfX2J1dHRvbicsXG4gICAgICAgICAgICAgICAgICAnbW9kdWxlLWVtb2ppLXBpY2tlcl9fYnV0dG9uLS1pY29uJyxcbiAgICAgICAgICAgICAgICAgIHNlYXJjaE1vZGVcbiAgICAgICAgICAgICAgICAgICAgPyAnbW9kdWxlLWVtb2ppLXBpY2tlcl9fYnV0dG9uLS1pY29uLS1jbG9zZSdcbiAgICAgICAgICAgICAgICAgICAgOiAnbW9kdWxlLWVtb2ppLXBpY2tlcl9fYnV0dG9uLS1pY29uLS1zZWFyY2gnXG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtpMThuKCdFbW9qaVBpY2tlci0tc2VhcmNoLXBsYWNlaG9sZGVyJyl9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIHtzZWFyY2hNb2RlID8gKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kdWxlLWVtb2ppLXBpY2tlcl9faGVhZGVyX19zZWFyY2gtZmllbGRcIj5cbiAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICByZWY9e2ZvY3VzT25SZW5kZXJ9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cIm1vZHVsZS1lbW9qaS1waWNrZXJfX2hlYWRlcl9fc2VhcmNoLWZpZWxkX19pbnB1dFwiXG4gICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtpMThuKCdFbW9qaVBpY2tlci0tc2VhcmNoLXBsYWNlaG9sZGVyJyl9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtoYW5kbGVTZWFyY2hDaGFuZ2V9XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgIGNhdGVnb3JpZXMubWFwKGNhdCA9PlxuICAgICAgICAgICAgICAgICAgY2F0ID09PSAncmVjZW50cycgJiYgZmlyc3RSZWNlbnQubGVuZ3RoID09PSAwID8gbnVsbCA6IChcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgIGtleT17Y2F0fVxuICAgICAgICAgICAgICAgICAgICAgIGRhdGEtY2F0ZWdvcnk9e2NhdH1cbiAgICAgICAgICAgICAgICAgICAgICB0aXRsZT17Y2F0fVxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZVNlbGVjdENhdGVnb3J5fVxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcbiAgICAgICAgICAgICAgICAgICAgICAgICdtb2R1bGUtZW1vamktcGlja2VyX19idXR0b24nLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ21vZHVsZS1lbW9qaS1waWNrZXJfX2J1dHRvbi0taWNvbicsXG4gICAgICAgICAgICAgICAgICAgICAgICBgbW9kdWxlLWVtb2ppLXBpY2tlcl9fYnV0dG9uLS1pY29uLS0ke2NhdH1gLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRDYXRlZ29yeSA9PT0gY2F0XG4gICAgICAgICAgICAgICAgICAgICAgICAgID8gJ21vZHVsZS1lbW9qaS1waWNrZXJfX2J1dHRvbi0tc2VsZWN0ZWQnXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDogbnVsbFxuICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgYXJpYS1sYWJlbD17aTE4bihgRW1vamlQaWNrZXJfX2J1dHRvbi0tJHtjYXR9YCl9XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPC9oZWFkZXI+XG4gICAgICAgICAgICB7cm93Q291bnQgPiAwID8gKFxuICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxBdXRvU2l6ZXI+XG4gICAgICAgICAgICAgICAgICB7KHsgd2lkdGgsIGhlaWdodCB9KSA9PiAoXG4gICAgICAgICAgICAgICAgICAgIDxHcmlkXG4gICAgICAgICAgICAgICAgICAgICAga2V5PXtzZWFyY2hUZXh0fVxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cIm1vZHVsZS1lbW9qaS1waWNrZXJfX2JvZHlcIlxuICAgICAgICAgICAgICAgICAgICAgIHdpZHRoPXt3aWR0aH1cbiAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ9e2hlaWdodH1cbiAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5Db3VudD17Q09MX0NPVU5UfVxuICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbldpZHRoPXszOH1cbiAgICAgICAgICAgICAgICAgICAgICByb3dIZWlnaHQ9e2dldFJvd0hlaWdodH1cbiAgICAgICAgICAgICAgICAgICAgICByb3dDb3VudD17cm93Q291bnR9XG4gICAgICAgICAgICAgICAgICAgICAgY2VsbFJlbmRlcmVyPXtjZWxsUmVuZGVyZXJ9XG4gICAgICAgICAgICAgICAgICAgICAgLy8gSW4gc29tZSBjYXNlcywgYHNjcm9sbFRvUm93YCBjYW4gYmUgdG9vIGhpZ2ggZm9yIGEgc2hvcnQgcGVyaW9kXG4gICAgICAgICAgICAgICAgICAgICAgLy8gICBkdXJpbmcgc3RhdGUgY2hhbmdlcy4gVGhpcyBlbnN1cmVzIHRoYXQgdGhlIHZhbHVlIGlzIG5ldmVyIHRvb1xuICAgICAgICAgICAgICAgICAgICAgIC8vICAgbGFyZ2UuXG4gICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsVG9Sb3c9e2NsYW1wKHNjcm9sbFRvUm93LCAwLCByb3dDb3VudCAtIDEpfVxuICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbFRvQWxpZ25tZW50PVwic3RhcnRcIlxuICAgICAgICAgICAgICAgICAgICAgIG9uU2VjdGlvblJlbmRlcmVkPXtvblNlY3Rpb25SZW5kZXJlZH1cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgPC9BdXRvU2l6ZXI+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcbiAgICAgICAgICAgICAgICAgICdtb2R1bGUtZW1vamktcGlja2VyX19ib2R5JyxcbiAgICAgICAgICAgICAgICAgICdtb2R1bGUtZW1vamktcGlja2VyX19ib2R5LS1lbXB0eSdcbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge2kxOG4oJ0Vtb2ppUGlja2VyLS1lbXB0eScpfVxuICAgICAgICAgICAgICAgIDxFbW9qaVxuICAgICAgICAgICAgICAgICAgc2hvcnROYW1lPVwic2xpZ2h0bHlfZnJvd25pbmdfZmFjZVwiXG4gICAgICAgICAgICAgICAgICBzaXplPXsxNn1cbiAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IG1hcmdpbkxlZnQ6ICc0cHgnIH19XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApfVxuICAgICAgICAgICAgPGZvb3RlciBjbGFzc05hbWU9XCJtb2R1bGUtZW1vamktcGlja2VyX19mb290ZXJcIj5cbiAgICAgICAgICAgICAge0Jvb2xlYW4ob25DbGlja1NldHRpbmdzKSAmJiAoXG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgYXJpYS1sYWJlbD17aTE4bignQ3VzdG9taXppbmdQcmVmZXJyZWRSZWFjdGlvbnNfX3RpdGxlJyl9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJtb2R1bGUtZW1vamktcGlja2VyX19idXR0b24gbW9kdWxlLWVtb2ppLXBpY2tlcl9fYnV0dG9uLS1mb290ZXIgbW9kdWxlLWVtb2ppLXBpY2tlcl9fYnV0dG9uLS1zZXR0aW5nc1wiXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXtvbkNsaWNrU2V0dGluZ3N9XG4gICAgICAgICAgICAgICAgICB0aXRsZT17aTE4bignQ3VzdG9taXppbmdQcmVmZXJyZWRSZWFjdGlvbnNfX3RpdGxlJyl9XG4gICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICB7b25TZXRTa2luVG9uZSA/IChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZHVsZS1lbW9qaS1waWNrZXJfX2Zvb3Rlcl9fc2tpbi10b25lc1wiPlxuICAgICAgICAgICAgICAgICAge1swLCAxLCAyLCAzLCA0LCA1XS5tYXAodG9uZSA9PiAoXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICBrZXk9e3RvbmV9XG4gICAgICAgICAgICAgICAgICAgICAgZGF0YS10b25lPXt0b25lfVxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZVBpY2tUb25lfVxuICAgICAgICAgICAgICAgICAgICAgIHRpdGxlPXtpMThuKCdFbW9qaVBpY2tlci0tc2tpbi10b25lJywgW2Ake3RvbmV9YF0pfVxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcbiAgICAgICAgICAgICAgICAgICAgICAgICdtb2R1bGUtZW1vamktcGlja2VyX19idXR0b24nLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ21vZHVsZS1lbW9qaS1waWNrZXJfX2J1dHRvbi0tZm9vdGVyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkVG9uZSA9PT0gdG9uZVxuICAgICAgICAgICAgICAgICAgICAgICAgICA/ICdtb2R1bGUtZW1vamktcGlja2VyX19idXR0b24tLXNlbGVjdGVkJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICA6IG51bGxcbiAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgPEVtb2ppIHNob3J0TmFtZT1cImhhbmRcIiBza2luVG9uZT17dG9uZX0gc2l6ZT17MjB9IC8+XG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgICAgICB7Qm9vbGVhbihvbkNsaWNrU2V0dGluZ3MpICYmIChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZHVsZS1lbW9qaS1waWNrZXJfX2Zvb3Rlcl9fc2V0dGluZ3Mtc3BhY2VyXCIgLz5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDwvZm9vdGVyPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L0ZvY3VzVHJhcD5cbiAgICAgICk7XG4gICAgfVxuICApXG4pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLFlBQXVCO0FBQ3ZCLHdCQUF1QjtBQUt2QiwrQkFBZ0M7QUFDaEMsb0JBU087QUFDUCw4QkFBc0I7QUFFdEIsbUJBQXNCO0FBQ3RCLGlCQUF1QztBQXFCdkMsdUJBQXVCLElBQXdCO0FBQzdDLE1BQUksSUFBSTtB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
