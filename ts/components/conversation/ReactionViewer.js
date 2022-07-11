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
var ReactionViewer_exports = {};
__export(ReactionViewer_exports, {
  ReactionViewer: () => ReactionViewer
});
module.exports = __toCommonJS(ReactionViewer_exports);
var React = __toESM(require("react"));
var import_lodash = require("lodash");
var import_classnames = __toESM(require("classnames"));
var import_ContactName = require("./ContactName");
var import_Avatar = require("../Avatar");
var import_Emoji = require("../emoji/Emoji");
var import_useRestoreFocus = require("../../hooks/useRestoreFocus");
var import_lib = require("../emoji/lib");
var import_useEscapeHandling = require("../../hooks/useEscapeHandling");
const DEFAULT_EMOJI_ORDER = [
  "heart",
  "+1",
  "-1",
  "joy",
  "open_mouth",
  "cry",
  "rage"
];
const ReactionViewer = React.forwardRef(({
  getPreferredBadge,
  i18n,
  onClose,
  pickedReaction,
  reactions,
  theme,
  ...rest
}, ref) => {
  const reactionsWithEmojiData = React.useMemo(() => reactions.map((reaction) => {
    const emojiData = (0, import_lib.emojiToData)(reaction.emoji);
    if (!emojiData) {
      return void 0;
    }
    return {
      ...reaction,
      ...emojiData
    };
  }).filter((reactionWithEmojiData) => Boolean(reactionWithEmojiData)), [reactions]);
  const groupedAndSortedReactions = React.useMemo(() => (0, import_lodash.mapValues)({
    all: reactionsWithEmojiData,
    ...(0, import_lodash.groupBy)(reactionsWithEmojiData, "short_name")
  }, (groupedReactions) => (0, import_lodash.orderBy)(groupedReactions, ["timestamp"], ["desc"])), [reactionsWithEmojiData]);
  const reactionCategories = React.useMemo(() => [
    {
      id: "all",
      index: 0,
      count: reactionsWithEmojiData.length
    },
    ...Object.entries(groupedAndSortedReactions).filter(([key]) => key !== "all").map(([, [{ short_name: id, emoji }, ...otherReactions]]) => {
      return {
        id,
        index: DEFAULT_EMOJI_ORDER.includes(id) ? DEFAULT_EMOJI_ORDER.indexOf(id) : Infinity,
        emoji,
        count: otherReactions.length + 1
      };
    })
  ].sort((a, b) => a.index - b.index), [reactionsWithEmojiData, groupedAndSortedReactions]);
  const [selectedReactionCategory, setSelectedReactionCategory] = React.useState(pickedReaction || "all");
  (0, import_useEscapeHandling.useEscapeHandling)(onClose);
  const [focusRef] = (0, import_useRestoreFocus.useRestoreFocus)();
  React.useEffect(() => {
    if (!reactionCategories.find(({ id }) => id === selectedReactionCategory)) {
      if (reactionsWithEmojiData.length > 0) {
        setSelectedReactionCategory("all");
      } else if (onClose) {
        onClose();
      }
    }
  }, [
    reactionCategories,
    onClose,
    reactionsWithEmojiData,
    selectedReactionCategory
  ]);
  const selectedReactions = groupedAndSortedReactions[selectedReactionCategory] || [];
  return /* @__PURE__ */ React.createElement("div", {
    ...rest,
    ref,
    className: "module-reaction-viewer"
  }, /* @__PURE__ */ React.createElement("header", {
    className: "module-reaction-viewer__header"
  }, reactionCategories.map(({ id, emoji, count }, index) => {
    const isAll = index === 0;
    const maybeFocusRef = isAll ? focusRef : void 0;
    return /* @__PURE__ */ React.createElement("button", {
      type: "button",
      key: id,
      ref: maybeFocusRef,
      className: (0, import_classnames.default)("module-reaction-viewer__header__button", selectedReactionCategory === id ? "module-reaction-viewer__header__button--selected" : null),
      onClick: (event) => {
        event.stopPropagation();
        setSelectedReactionCategory(id);
      }
    }, isAll ? /* @__PURE__ */ React.createElement("span", {
      className: "module-reaction-viewer__header__button__all"
    }, i18n("ReactionsViewer--all"), "\u2009\xB7\u2009", count) : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(import_Emoji.Emoji, {
      size: 18,
      emoji
    }), /* @__PURE__ */ React.createElement("span", {
      className: "module-reaction-viewer__header__button__count"
    }, count)));
  })), /* @__PURE__ */ React.createElement("main", {
    className: "module-reaction-viewer__body"
  }, selectedReactions.map(({ from, emoji }) => /* @__PURE__ */ React.createElement("div", {
    key: `${from.id}-${emoji}`,
    className: "module-reaction-viewer__body__row"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "module-reaction-viewer__body__row__avatar"
  }, /* @__PURE__ */ React.createElement(import_Avatar.Avatar, {
    acceptedMessageRequest: from.acceptedMessageRequest,
    avatarPath: from.avatarPath,
    badge: getPreferredBadge(from.badges),
    conversationType: "direct",
    sharedGroupNames: from.sharedGroupNames,
    size: 32,
    isMe: from.isMe,
    color: from.color,
    name: from.name,
    profileName: from.profileName,
    phoneNumber: from.phoneNumber,
    theme,
    title: from.title,
    i18n
  })), /* @__PURE__ */ React.createElement("div", {
    className: "module-reaction-viewer__body__row__name"
  }, from.isMe ? i18n("you") : /* @__PURE__ */ React.createElement(import_ContactName.ContactName, {
    module: "module-reaction-viewer__body__row__name__contact-name",
    title: from.title
  })), /* @__PURE__ */ React.createElement("div", {
    className: "module-reaction-viewer__body__row__emoji"
  }, /* @__PURE__ */ React.createElement(import_Emoji.Emoji, {
    size: 18,
    emoji
  }))))));
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ReactionViewer
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiUmVhY3Rpb25WaWV3ZXIudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMC0yMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgZ3JvdXBCeSwgbWFwVmFsdWVzLCBvcmRlckJ5IH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IHsgQ29udGFjdE5hbWUgfSBmcm9tICcuL0NvbnRhY3ROYW1lJztcbmltcG9ydCB0eXBlIHsgUHJvcHMgYXMgQXZhdGFyUHJvcHMgfSBmcm9tICcuLi9BdmF0YXInO1xuaW1wb3J0IHsgQXZhdGFyIH0gZnJvbSAnLi4vQXZhdGFyJztcbmltcG9ydCB7IEVtb2ppIH0gZnJvbSAnLi4vZW1vamkvRW1vamknO1xuaW1wb3J0IHsgdXNlUmVzdG9yZUZvY3VzIH0gZnJvbSAnLi4vLi4vaG9va3MvdXNlUmVzdG9yZUZvY3VzJztcbmltcG9ydCB0eXBlIHsgQ29udmVyc2F0aW9uVHlwZSB9IGZyb20gJy4uLy4uL3N0YXRlL2R1Y2tzL2NvbnZlcnNhdGlvbnMnO1xuaW1wb3J0IHR5cGUgeyBQcmVmZXJyZWRCYWRnZVNlbGVjdG9yVHlwZSB9IGZyb20gJy4uLy4uL3N0YXRlL3NlbGVjdG9ycy9iYWRnZXMnO1xuaW1wb3J0IHR5cGUgeyBFbW9qaURhdGEgfSBmcm9tICcuLi9lbW9qaS9saWInO1xuaW1wb3J0IHsgZW1vamlUb0RhdGEgfSBmcm9tICcuLi9lbW9qaS9saWInO1xuaW1wb3J0IHsgdXNlRXNjYXBlSGFuZGxpbmcgfSBmcm9tICcuLi8uLi9ob29rcy91c2VFc2NhcGVIYW5kbGluZyc7XG5pbXBvcnQgdHlwZSB7IFRoZW1lVHlwZSB9IGZyb20gJy4uLy4uL3R5cGVzL1V0aWwnO1xuXG5leHBvcnQgdHlwZSBSZWFjdGlvbiA9IHtcbiAgZW1vamk6IHN0cmluZztcbiAgdGltZXN0YW1wOiBudW1iZXI7XG4gIGZyb206IFBpY2s8XG4gICAgQ29udmVyc2F0aW9uVHlwZSxcbiAgICB8ICdhY2NlcHRlZE1lc3NhZ2VSZXF1ZXN0J1xuICAgIHwgJ2F2YXRhclBhdGgnXG4gICAgfCAnYmFkZ2VzJ1xuICAgIHwgJ2NvbG9yJ1xuICAgIHwgJ2lkJ1xuICAgIHwgJ2lzTWUnXG4gICAgfCAnbmFtZSdcbiAgICB8ICdwaG9uZU51bWJlcidcbiAgICB8ICdwcm9maWxlTmFtZSdcbiAgICB8ICdzaGFyZWRHcm91cE5hbWVzJ1xuICAgIHwgJ3RpdGxlJ1xuICA+O1xufTtcblxuZXhwb3J0IHR5cGUgT3duUHJvcHMgPSB7XG4gIGdldFByZWZlcnJlZEJhZGdlOiBQcmVmZXJyZWRCYWRnZVNlbGVjdG9yVHlwZTtcbiAgcmVhY3Rpb25zOiBBcnJheTxSZWFjdGlvbj47XG4gIHBpY2tlZFJlYWN0aW9uPzogc3RyaW5nO1xuICBvbkNsb3NlPzogKCkgPT4gdW5rbm93bjtcbiAgdGhlbWU6IFRoZW1lVHlwZTtcbn07XG5cbmV4cG9ydCB0eXBlIFByb3BzID0gT3duUHJvcHMgJlxuICBQaWNrPFJlYWN0LkhUTUxQcm9wczxIVE1MRGl2RWxlbWVudD4sICdzdHlsZSc+ICZcbiAgUGljazxBdmF0YXJQcm9wcywgJ2kxOG4nPjtcblxuY29uc3QgREVGQVVMVF9FTU9KSV9PUkRFUiA9IFtcbiAgJ2hlYXJ0JyxcbiAgJysxJyxcbiAgJy0xJyxcbiAgJ2pveScsXG4gICdvcGVuX21vdXRoJyxcbiAgJ2NyeScsXG4gICdyYWdlJyxcbl07XG5cbnR5cGUgUmVhY3Rpb25DYXRlZ29yeSA9IHtcbiAgY291bnQ6IG51bWJlcjtcbiAgZW1vamk/OiBzdHJpbmc7XG4gIGlkOiBzdHJpbmc7XG4gIGluZGV4OiBudW1iZXI7XG59O1xuXG50eXBlIFJlYWN0aW9uV2l0aEVtb2ppRGF0YSA9IFJlYWN0aW9uICYgRW1vamlEYXRhO1xuXG5leHBvcnQgY29uc3QgUmVhY3Rpb25WaWV3ZXIgPSBSZWFjdC5mb3J3YXJkUmVmPEhUTUxEaXZFbGVtZW50LCBQcm9wcz4oXG4gIChcbiAgICB7XG4gICAgICBnZXRQcmVmZXJyZWRCYWRnZSxcbiAgICAgIGkxOG4sXG4gICAgICBvbkNsb3NlLFxuICAgICAgcGlja2VkUmVhY3Rpb24sXG4gICAgICByZWFjdGlvbnMsXG4gICAgICB0aGVtZSxcbiAgICAgIC4uLnJlc3RcbiAgICB9LFxuICAgIHJlZlxuICApID0+IHtcbiAgICBjb25zdCByZWFjdGlvbnNXaXRoRW1vamlEYXRhID0gUmVhY3QudXNlTWVtbyhcbiAgICAgICgpID0+XG4gICAgICAgIHJlYWN0aW9uc1xuICAgICAgICAgIC5tYXAocmVhY3Rpb24gPT4ge1xuICAgICAgICAgICAgY29uc3QgZW1vamlEYXRhID0gZW1vamlUb0RhdGEocmVhY3Rpb24uZW1vamkpO1xuXG4gICAgICAgICAgICBpZiAoIWVtb2ppRGF0YSkge1xuICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAuLi5yZWFjdGlvbixcbiAgICAgICAgICAgICAgLi4uZW1vamlEYXRhLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5maWx0ZXIoXG4gICAgICAgICAgICAoXG4gICAgICAgICAgICAgIHJlYWN0aW9uV2l0aEVtb2ppRGF0YVxuICAgICAgICAgICAgKTogcmVhY3Rpb25XaXRoRW1vamlEYXRhIGlzIFJlYWN0aW9uV2l0aEVtb2ppRGF0YSA9PlxuICAgICAgICAgICAgICBCb29sZWFuKHJlYWN0aW9uV2l0aEVtb2ppRGF0YSlcbiAgICAgICAgICApLFxuICAgICAgW3JlYWN0aW9uc11cbiAgICApO1xuXG4gICAgY29uc3QgZ3JvdXBlZEFuZFNvcnRlZFJlYWN0aW9ucyA9IFJlYWN0LnVzZU1lbW8oXG4gICAgICAoKSA9PlxuICAgICAgICBtYXBWYWx1ZXMoXG4gICAgICAgICAge1xuICAgICAgICAgICAgYWxsOiByZWFjdGlvbnNXaXRoRW1vamlEYXRhLFxuICAgICAgICAgICAgLi4uZ3JvdXBCeShyZWFjdGlvbnNXaXRoRW1vamlEYXRhLCAnc2hvcnRfbmFtZScpLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgZ3JvdXBlZFJlYWN0aW9ucyA9PiBvcmRlckJ5KGdyb3VwZWRSZWFjdGlvbnMsIFsndGltZXN0YW1wJ10sIFsnZGVzYyddKVxuICAgICAgICApLFxuICAgICAgW3JlYWN0aW9uc1dpdGhFbW9qaURhdGFdXG4gICAgKTtcblxuICAgIGNvbnN0IHJlYWN0aW9uQ2F0ZWdvcmllczogQXJyYXk8UmVhY3Rpb25DYXRlZ29yeT4gPSBSZWFjdC51c2VNZW1vKFxuICAgICAgKCkgPT5cbiAgICAgICAgW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIGlkOiAnYWxsJyxcbiAgICAgICAgICAgIGluZGV4OiAwLFxuICAgICAgICAgICAgY291bnQ6IHJlYWN0aW9uc1dpdGhFbW9qaURhdGEubGVuZ3RoLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgLi4uT2JqZWN0LmVudHJpZXMoZ3JvdXBlZEFuZFNvcnRlZFJlYWN0aW9ucylcbiAgICAgICAgICAgIC5maWx0ZXIoKFtrZXldKSA9PiBrZXkgIT09ICdhbGwnKVxuICAgICAgICAgICAgLm1hcCgoWywgW3sgc2hvcnRfbmFtZTogaWQsIGVtb2ppIH0sIC4uLm90aGVyUmVhY3Rpb25zXV0pID0+IHtcbiAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBpZCxcbiAgICAgICAgICAgICAgICBpbmRleDogREVGQVVMVF9FTU9KSV9PUkRFUi5pbmNsdWRlcyhpZClcbiAgICAgICAgICAgICAgICAgID8gREVGQVVMVF9FTU9KSV9PUkRFUi5pbmRleE9mKGlkKVxuICAgICAgICAgICAgICAgICAgOiBJbmZpbml0eSxcbiAgICAgICAgICAgICAgICBlbW9qaSxcbiAgICAgICAgICAgICAgICBjb3VudDogb3RoZXJSZWFjdGlvbnMubGVuZ3RoICsgMSxcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0pLFxuICAgICAgICBdLnNvcnQoKGEsIGIpID0+IGEuaW5kZXggLSBiLmluZGV4KSxcbiAgICAgIFtyZWFjdGlvbnNXaXRoRW1vamlEYXRhLCBncm91cGVkQW5kU29ydGVkUmVhY3Rpb25zXVxuICAgICk7XG5cbiAgICBjb25zdCBbc2VsZWN0ZWRSZWFjdGlvbkNhdGVnb3J5LCBzZXRTZWxlY3RlZFJlYWN0aW9uQ2F0ZWdvcnldID1cbiAgICAgIFJlYWN0LnVzZVN0YXRlKHBpY2tlZFJlYWN0aW9uIHx8ICdhbGwnKTtcblxuICAgIC8vIEhhbmRsZSBlc2NhcGUga2V5XG4gICAgdXNlRXNjYXBlSGFuZGxpbmcob25DbG9zZSk7XG5cbiAgICAvLyBGb2N1cyBmaXJzdCBidXR0b24gYW5kIHJlc3RvcmUgZm9jdXMgb24gdW5tb3VudFxuICAgIGNvbnN0IFtmb2N1c1JlZl0gPSB1c2VSZXN0b3JlRm9jdXMoKTtcblxuICAgIC8vIElmIHdlIGhhdmUgcHJldmlvdXNseSBzZWxlY3RlZCBhIHJlYWN0aW9uIHR5cGUgdGhhdCBpcyBubyBsb25nZXIgcHJlc2VudFxuICAgIC8vIChyZW1vdmVkIG9uIGFub3RoZXIgZGV2aWNlLCBmb3IgaW5zdGFuY2UpIHdlIHNob3VsZCBzZWxlY3QgYW5vdGhlclxuICAgIC8vIHJlYWN0aW9uIHR5cGVcbiAgICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgaWYgKFxuICAgICAgICAhcmVhY3Rpb25DYXRlZ29yaWVzLmZpbmQoKHsgaWQgfSkgPT4gaWQgPT09IHNlbGVjdGVkUmVhY3Rpb25DYXRlZ29yeSlcbiAgICAgICkge1xuICAgICAgICBpZiAocmVhY3Rpb25zV2l0aEVtb2ppRGF0YS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgc2V0U2VsZWN0ZWRSZWFjdGlvbkNhdGVnb3J5KCdhbGwnKTtcbiAgICAgICAgfSBlbHNlIGlmIChvbkNsb3NlKSB7XG4gICAgICAgICAgb25DbG9zZSgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSwgW1xuICAgICAgcmVhY3Rpb25DYXRlZ29yaWVzLFxuICAgICAgb25DbG9zZSxcbiAgICAgIHJlYWN0aW9uc1dpdGhFbW9qaURhdGEsXG4gICAgICBzZWxlY3RlZFJlYWN0aW9uQ2F0ZWdvcnksXG4gICAgXSk7XG5cbiAgICBjb25zdCBzZWxlY3RlZFJlYWN0aW9ucyA9XG4gICAgICBncm91cGVkQW5kU29ydGVkUmVhY3Rpb25zW3NlbGVjdGVkUmVhY3Rpb25DYXRlZ29yeV0gfHwgW107XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiB7Li4ucmVzdH0gcmVmPXtyZWZ9IGNsYXNzTmFtZT1cIm1vZHVsZS1yZWFjdGlvbi12aWV3ZXJcIj5cbiAgICAgICAgPGhlYWRlciBjbGFzc05hbWU9XCJtb2R1bGUtcmVhY3Rpb24tdmlld2VyX19oZWFkZXJcIj5cbiAgICAgICAgICB7cmVhY3Rpb25DYXRlZ29yaWVzLm1hcCgoeyBpZCwgZW1vamksIGNvdW50IH0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpc0FsbCA9IGluZGV4ID09PSAwO1xuICAgICAgICAgICAgY29uc3QgbWF5YmVGb2N1c1JlZiA9IGlzQWxsID8gZm9jdXNSZWYgOiB1bmRlZmluZWQ7XG5cbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICBrZXk9e2lkfVxuICAgICAgICAgICAgICAgIHJlZj17bWF5YmVGb2N1c1JlZn1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXG4gICAgICAgICAgICAgICAgICAnbW9kdWxlLXJlYWN0aW9uLXZpZXdlcl9faGVhZGVyX19idXR0b24nLFxuICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRSZWFjdGlvbkNhdGVnb3J5ID09PSBpZFxuICAgICAgICAgICAgICAgICAgICA/ICdtb2R1bGUtcmVhY3Rpb24tdmlld2VyX19oZWFkZXJfX2J1dHRvbi0tc2VsZWN0ZWQnXG4gICAgICAgICAgICAgICAgICAgIDogbnVsbFxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgb25DbGljaz17ZXZlbnQgPT4ge1xuICAgICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgICBzZXRTZWxlY3RlZFJlYWN0aW9uQ2F0ZWdvcnkoaWQpO1xuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICB7aXNBbGwgPyAoXG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJtb2R1bGUtcmVhY3Rpb24tdmlld2VyX19oZWFkZXJfX2J1dHRvbl9fYWxsXCI+XG4gICAgICAgICAgICAgICAgICAgIHtpMThuKCdSZWFjdGlvbnNWaWV3ZXItLWFsbCcpfSZ0aGluc3A7Jm1pZGRvdDsmdGhpbnNwO1xuICAgICAgICAgICAgICAgICAgICB7Y291bnR9XG4gICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgICAgIDxFbW9qaSBzaXplPXsxOH0gZW1vamk9e2Vtb2ppfSAvPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJtb2R1bGUtcmVhY3Rpb24tdmlld2VyX19oZWFkZXJfX2J1dHRvbl9fY291bnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICB7Y291bnR9XG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9KX1cbiAgICAgICAgPC9oZWFkZXI+XG4gICAgICAgIDxtYWluIGNsYXNzTmFtZT1cIm1vZHVsZS1yZWFjdGlvbi12aWV3ZXJfX2JvZHlcIj5cbiAgICAgICAgICB7c2VsZWN0ZWRSZWFjdGlvbnMubWFwKCh7IGZyb20sIGVtb2ppIH0pID0+IChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAga2V5PXtgJHtmcm9tLmlkfS0ke2Vtb2ppfWB9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cIm1vZHVsZS1yZWFjdGlvbi12aWV3ZXJfX2JvZHlfX3Jvd1wiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kdWxlLXJlYWN0aW9uLXZpZXdlcl9fYm9keV9fcm93X19hdmF0YXJcIj5cbiAgICAgICAgICAgICAgICA8QXZhdGFyXG4gICAgICAgICAgICAgICAgICBhY2NlcHRlZE1lc3NhZ2VSZXF1ZXN0PXtmcm9tLmFjY2VwdGVkTWVzc2FnZVJlcXVlc3R9XG4gICAgICAgICAgICAgICAgICBhdmF0YXJQYXRoPXtmcm9tLmF2YXRhclBhdGh9XG4gICAgICAgICAgICAgICAgICBiYWRnZT17Z2V0UHJlZmVycmVkQmFkZ2UoZnJvbS5iYWRnZXMpfVxuICAgICAgICAgICAgICAgICAgY29udmVyc2F0aW9uVHlwZT1cImRpcmVjdFwiXG4gICAgICAgICAgICAgICAgICBzaGFyZWRHcm91cE5hbWVzPXtmcm9tLnNoYXJlZEdyb3VwTmFtZXN9XG4gICAgICAgICAgICAgICAgICBzaXplPXszMn1cbiAgICAgICAgICAgICAgICAgIGlzTWU9e2Zyb20uaXNNZX1cbiAgICAgICAgICAgICAgICAgIGNvbG9yPXtmcm9tLmNvbG9yfVxuICAgICAgICAgICAgICAgICAgbmFtZT17ZnJvbS5uYW1lfVxuICAgICAgICAgICAgICAgICAgcHJvZmlsZU5hbWU9e2Zyb20ucHJvZmlsZU5hbWV9XG4gICAgICAgICAgICAgICAgICBwaG9uZU51bWJlcj17ZnJvbS5waG9uZU51bWJlcn1cbiAgICAgICAgICAgICAgICAgIHRoZW1lPXt0aGVtZX1cbiAgICAgICAgICAgICAgICAgIHRpdGxlPXtmcm9tLnRpdGxlfVxuICAgICAgICAgICAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2R1bGUtcmVhY3Rpb24tdmlld2VyX19ib2R5X19yb3dfX25hbWVcIj5cbiAgICAgICAgICAgICAgICB7ZnJvbS5pc01lID8gKFxuICAgICAgICAgICAgICAgICAgaTE4bigneW91JylcbiAgICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgICAgPENvbnRhY3ROYW1lXG4gICAgICAgICAgICAgICAgICAgIG1vZHVsZT1cIm1vZHVsZS1yZWFjdGlvbi12aWV3ZXJfX2JvZHlfX3Jvd19fbmFtZV9fY29udGFjdC1uYW1lXCJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU9e2Zyb20udGl0bGV9XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZHVsZS1yZWFjdGlvbi12aWV3ZXJfX2JvZHlfX3Jvd19fZW1vamlcIj5cbiAgICAgICAgICAgICAgICA8RW1vamkgc2l6ZT17MTh9IGVtb2ppPXtlbW9qaX0gLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApKX1cbiAgICAgICAgPC9tYWluPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuKTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLFlBQXVCO0FBQ3ZCLG9CQUE0QztBQUM1Qyx3QkFBdUI7QUFDdkIseUJBQTRCO0FBRTVCLG9CQUF1QjtBQUN2QixtQkFBc0I7QUFDdEIsNkJBQWdD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
