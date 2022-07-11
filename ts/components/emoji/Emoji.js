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
var Emoji_exports = {};
__export(Emoji_exports, {
  Emoji: () => Emoji,
  EmojiSizes: () => EmojiSizes
});
module.exports = __toCommonJS(Emoji_exports);
var React = __toESM(require("react"));
var import_classnames = __toESM(require("classnames"));
var import_lib = require("./lib");
const EmojiSizes = [16, 18, 20, 24, 28, 32, 48, 64, 66];
const Emoji = React.memo(React.forwardRef(({
  className,
  emoji,
  shortName,
  size = 28,
  skinTone,
  style = {},
  title
}, ref) => {
  let image = "";
  if (shortName) {
    image = (0, import_lib.getImagePath)(shortName, skinTone);
  } else if (emoji) {
    image = (0, import_lib.emojiToImage)(emoji) || "";
  }
  return /* @__PURE__ */ React.createElement("span", {
    ref,
    className: (0, import_classnames.default)("module-emoji", `module-emoji--${size}px`, className),
    style
  }, /* @__PURE__ */ React.createElement("img", {
    className: `module-emoji__image--${size}px`,
    src: image,
    "aria-label": title ?? emoji,
    title: title ?? emoji
  }));
}));
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Emoji,
  EmojiSizes
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiRW1vamkudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAxOS0yMDIwIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgdHlwZSB7IFNraW5Ub25lS2V5IH0gZnJvbSAnLi9saWInO1xuaW1wb3J0IHsgZW1vamlUb0ltYWdlLCBnZXRJbWFnZVBhdGggfSBmcm9tICcuL2xpYic7XG5cbmV4cG9ydCBjb25zdCBFbW9qaVNpemVzID0gWzE2LCAxOCwgMjAsIDI0LCAyOCwgMzIsIDQ4LCA2NCwgNjZdIGFzIGNvbnN0O1xuXG5leHBvcnQgdHlwZSBFbW9qaVNpemVUeXBlID0gdHlwZW9mIEVtb2ppU2l6ZXNbbnVtYmVyXTtcblxuZXhwb3J0IHR5cGUgT3duUHJvcHMgPSB7XG4gIGVtb2ppPzogc3RyaW5nO1xuICBzaG9ydE5hbWU/OiBzdHJpbmc7XG4gIHNraW5Ub25lPzogU2tpblRvbmVLZXkgfCBudW1iZXI7XG4gIHNpemU/OiBFbW9qaVNpemVUeXBlO1xuICBjaGlsZHJlbj86IFJlYWN0LlJlYWN0Tm9kZTtcbiAgdGl0bGU/OiBzdHJpbmc7XG59O1xuXG5leHBvcnQgdHlwZSBQcm9wcyA9IE93blByb3BzICZcbiAgUGljazxSZWFjdC5IVE1MUHJvcHM8SFRNTERpdkVsZW1lbnQ+LCAnc3R5bGUnIHwgJ2NsYXNzTmFtZSc+O1xuXG4vLyB0aGUgRE9NIHN0cnVjdHVyZSBvZiB0aGlzIEVtb2ppIHNob3VsZCBtYXRjaCB0aGUgb3RoZXIgZW1vamkgaW1wbGVtZW50YXRpb25zOlxuLy8gdHMvY29tcG9uZW50cy9jb252ZXJzYXRpb24vRW1vamlmeS50c3hcbi8vIHRzL3F1aWxsL2Vtb2ppL2Jsb3QudHN4XG5cbmV4cG9ydCBjb25zdCBFbW9qaSA9IFJlYWN0Lm1lbW8oXG4gIFJlYWN0LmZvcndhcmRSZWY8SFRNTERpdkVsZW1lbnQsIFByb3BzPihcbiAgICAoXG4gICAgICB7XG4gICAgICAgIGNsYXNzTmFtZSxcbiAgICAgICAgZW1vamksXG4gICAgICAgIHNob3J0TmFtZSxcbiAgICAgICAgc2l6ZSA9IDI4LFxuICAgICAgICBza2luVG9uZSxcbiAgICAgICAgc3R5bGUgPSB7fSxcbiAgICAgICAgdGl0bGUsXG4gICAgICB9OiBQcm9wcyxcbiAgICAgIHJlZlxuICAgICkgPT4ge1xuICAgICAgbGV0IGltYWdlID0gJyc7XG4gICAgICBpZiAoc2hvcnROYW1lKSB7XG4gICAgICAgIGltYWdlID0gZ2V0SW1hZ2VQYXRoKHNob3J0TmFtZSwgc2tpblRvbmUpO1xuICAgICAgfSBlbHNlIGlmIChlbW9qaSkge1xuICAgICAgICBpbWFnZSA9IGVtb2ppVG9JbWFnZShlbW9qaSkgfHwgJyc7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxzcGFuXG4gICAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFxuICAgICAgICAgICAgJ21vZHVsZS1lbW9qaScsXG4gICAgICAgICAgICBgbW9kdWxlLWVtb2ppLS0ke3NpemV9cHhgLFxuICAgICAgICAgICAgY2xhc3NOYW1lXG4gICAgICAgICAgKX1cbiAgICAgICAgICBzdHlsZT17c3R5bGV9XG4gICAgICAgID5cbiAgICAgICAgICA8aW1nXG4gICAgICAgICAgICBjbGFzc05hbWU9e2Btb2R1bGUtZW1vamlfX2ltYWdlLS0ke3NpemV9cHhgfVxuICAgICAgICAgICAgc3JjPXtpbWFnZX1cbiAgICAgICAgICAgIGFyaWEtbGFiZWw9e3RpdGxlID8/IGVtb2ppfVxuICAgICAgICAgICAgdGl0bGU9e3RpdGxlID8/IGVtb2ppfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvc3Bhbj5cbiAgICAgICk7XG4gICAgfVxuICApXG4pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxZQUF1QjtBQUN2Qix3QkFBdUI7QUFFdkIsaUJBQTJDO0FBRXBDLE1BQU0sYUFBYSxDQUFDLElBQUksSUFBSSxJQUFJLElBQUksSUFBSSxJQUFJLElBQUksSUFBSSxFQUFFO0FBb0J0RCxNQUFNLFFBQVEsTUFBTSxLQUN6QixNQUFNLFdBQ0osQ0FDRTtBQUFBLEVBQ0U7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0EsT0FBTztBQUFBLEVBQ1A7QUFBQSxFQUNBLFFBQVEsQ0FBQztBQUFBLEVBQ1Q7QUFBQSxHQUVGLFFBQ0c7QUFDSCxNQUFJLFFBQVE7QUFDWixNQUFJLFdBQVc7QUFDYixZQUFRLDZCQUFhLFdBQVcsUUFBUTtBQUFBLEVBQzFDLFdBQVcsT0FBTztBQUNoQixZQUFRLDZCQUFhLEtBQUssS0FBSztBQUFBLEVBQ2pDO0FBRUEsU0FDRSxvQ0FBQztBQUFBLElBQ0M7QUFBQSxJQUNBLFdBQVcsK0JBQ1QsZ0JBQ0EsaUJBQWlCLFVBQ2pCLFNBQ0Y7QUFBQSxJQUNBO0FBQUEsS0FFQSxvQ0FBQztBQUFBLElBQ0MsV0FBVyx3QkFBd0I7QUFBQSxJQUNuQyxLQUFLO0FBQUEsSUFDTCxjQUFZLFNBQVM7QUFBQSxJQUNyQixPQUFPLFNBQVM7QUFBQSxHQUNsQixDQUNGO0FBRUosQ0FDRixDQUNGOyIsCiAgIm5hbWVzIjogW10KfQo=
