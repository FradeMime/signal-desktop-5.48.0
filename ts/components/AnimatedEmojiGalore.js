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
var __copyProps = (to2, from2, except, desc) => {
  if (from2 && typeof from2 === "object" || typeof from2 === "function") {
    for (let key of __getOwnPropNames(from2))
      if (!__hasOwnProp.call(to2, key) && key !== except)
        __defProp(to2, key, { get: () => from2[key], enumerable: !(desc = __getOwnPropDesc(from2, key)) || desc.enumerable });
  }
  return to2;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var AnimatedEmojiGalore_exports = {};
__export(AnimatedEmojiGalore_exports, {
  AnimatedEmojiGalore: () => AnimatedEmojiGalore
});
module.exports = __toCommonJS(AnimatedEmojiGalore_exports);
var import_react = __toESM(require("react"));
var import_web = require("@react-spring/web");
var import_lodash = require("lodash");
var import_Emojify = require("./conversation/Emojify");
const NUM_EMOJIS = 16;
const MAX_HEIGHT = 1280;
const to = /* @__PURE__ */ __name((i, f) => ({
  delay: i * (0, import_lodash.random)(80, 120),
  rotate: (0, import_lodash.random)(-24, 24),
  scale: (0, import_lodash.random)(0.5, 1, true),
  y: -144,
  onRest: i === NUM_EMOJIS - 1 ? f : void 0
}), "to");
const from = /* @__PURE__ */ __name((_i) => ({
  rotate: 0,
  scale: 1,
  y: MAX_HEIGHT
}), "from");
function transform(y, scale, rotate) {
  return `translateY(${y}px) scale(${scale}) rotate(${rotate}deg)`;
}
const AnimatedEmojiGalore = /* @__PURE__ */ __name(({
  emoji,
  onAnimationEnd
}) => {
  const [springs] = (0, import_web.useSprings)(NUM_EMOJIS, (i) => ({
    ...to(i, onAnimationEnd),
    from: from(i),
    config: {
      mass: 20,
      tension: 120,
      friction: 80,
      clamp: true
    }
  }));
  return /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, springs.map((styles, index) => /* @__PURE__ */ import_react.default.createElement(import_web.animated.div, {
    key: index,
    style: {
      left: `${(0, import_lodash.random)(0, 100)}%`,
      position: "absolute",
      transform: (0, import_web.to)([styles.y, styles.scale, styles.rotate], transform)
    }
  }, /* @__PURE__ */ import_react.default.createElement(import_Emojify.Emojify, {
    sizeClass: "extra-large",
    text: emoji
  }))));
}, "AnimatedEmojiGalore");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AnimatedEmojiGalore
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQW5pbWF0ZWRFbW9qaUdhbG9yZS50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGFuaW1hdGVkLCB0byBhcyBpbnRlcnBvbGF0ZSwgdXNlU3ByaW5ncyB9IGZyb20gJ0ByZWFjdC1zcHJpbmcvd2ViJztcbmltcG9ydCB7IHJhbmRvbSB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBFbW9qaWZ5IH0gZnJvbSAnLi9jb252ZXJzYXRpb24vRW1vamlmeSc7XG5cbmV4cG9ydCB0eXBlIFByb3BzVHlwZSA9IHtcbiAgZW1vamk6IHN0cmluZztcbiAgb25BbmltYXRpb25FbmQ6ICgpID0+IHVua25vd247XG4gIHJvdGF0ZT86IG51bWJlcjtcbiAgc2NhbGU/OiBudW1iZXI7XG4gIHg/OiBudW1iZXI7XG59O1xuXG5jb25zdCBOVU1fRU1PSklTID0gMTY7XG5jb25zdCBNQVhfSEVJR0hUID0gMTI4MDtcblxuY29uc3QgdG8gPSAoaTogbnVtYmVyLCBmOiAoKSA9PiB1bmtub3duKSA9PiAoe1xuICBkZWxheTogaSAqIHJhbmRvbSg4MCwgMTIwKSxcbiAgcm90YXRlOiByYW5kb20oLTI0LCAyNCksXG4gIHNjYWxlOiByYW5kb20oMC41LCAxLjAsIHRydWUpLFxuICB5OiAtMTQ0LFxuICBvblJlc3Q6IGkgPT09IE5VTV9FTU9KSVMgLSAxID8gZiA6IHVuZGVmaW5lZCxcbn0pO1xuY29uc3QgZnJvbSA9IChfaTogbnVtYmVyKSA9PiAoe1xuICByb3RhdGU6IDAsXG4gIHNjYWxlOiAxLFxuICB5OiBNQVhfSEVJR0hULFxufSk7XG5cbmZ1bmN0aW9uIHRyYW5zZm9ybSh5OiBudW1iZXIsIHNjYWxlOiBudW1iZXIsIHJvdGF0ZTogbnVtYmVyKTogc3RyaW5nIHtcbiAgcmV0dXJuIGB0cmFuc2xhdGVZKCR7eX1weCkgc2NhbGUoJHtzY2FsZX0pIHJvdGF0ZSgke3JvdGF0ZX1kZWcpYDtcbn1cblxuZXhwb3J0IGNvbnN0IEFuaW1hdGVkRW1vamlHYWxvcmUgPSAoe1xuICBlbW9qaSxcbiAgb25BbmltYXRpb25FbmQsXG59OiBQcm9wc1R5cGUpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IFtzcHJpbmdzXSA9IHVzZVNwcmluZ3MoTlVNX0VNT0pJUywgaSA9PiAoe1xuICAgIC4uLnRvKGksIG9uQW5pbWF0aW9uRW5kKSxcbiAgICBmcm9tOiBmcm9tKGkpLFxuICAgIGNvbmZpZzoge1xuICAgICAgbWFzczogMjAsXG4gICAgICB0ZW5zaW9uOiAxMjAsXG4gICAgICBmcmljdGlvbjogODAsXG4gICAgICBjbGFtcDogdHJ1ZSxcbiAgICB9LFxuICB9KSk7XG5cbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAge3NwcmluZ3MubWFwKChzdHlsZXMsIGluZGV4KSA9PiAoXG4gICAgICAgIDxhbmltYXRlZC5kaXZcbiAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVhY3Qvbm8tYXJyYXktaW5kZXgta2V5XG4gICAgICAgICAga2V5PXtpbmRleH1cbiAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgbGVmdDogYCR7cmFuZG9tKDAsIDEwMCl9JWAsXG4gICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICAgIHRyYW5zZm9ybTogaW50ZXJwb2xhdGUoXG4gICAgICAgICAgICAgIFtzdHlsZXMueSwgc3R5bGVzLnNjYWxlLCBzdHlsZXMucm90YXRlXSxcbiAgICAgICAgICAgICAgdHJhbnNmb3JtXG4gICAgICAgICAgICApLFxuICAgICAgICAgIH19XG4gICAgICAgID5cbiAgICAgICAgICA8RW1vamlmeSBzaXplQ2xhc3M9XCJleHRyYS1sYXJnZVwiIHRleHQ9e2Vtb2ppfSAvPlxuICAgICAgICA8L2FuaW1hdGVkLmRpdj5cbiAgICAgICkpfVxuICAgIDwvPlxuICApO1xufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxtQkFBa0I7QUFDbEIsaUJBQXdEO0FBQ3hELG9CQUF1QjtBQUN2QixxQkFBd0I7QUFVeEIsTUFBTSxhQUFhO0FBQ25CLE1BQU0sYUFBYTtBQUVuQixNQUFNLEtBQUssd0JBQUMsR0FBVyxNQUFzQjtBQUFBLEVBQzNDLE9BQU8sSUFBSSwwQkFBTyxJQUFJLEdBQUc7QUFBQSxFQUN6QixRQUFRLDBCQUFPLEtBQUssRUFBRTtBQUFBLEVBQ3RCLE9BQU8sMEJBQU8sS0FBSyxHQUFLLElBQUk7QUFBQSxFQUM1QixHQUFHO0FBQUEsRUFDSCxRQUFRLE1BQU0sYUFBYSxJQUFJLElBQUk7QUFDckMsSUFOVztBQU9YLE1BQU0sT0FBTyx3QkFBQyxPQUFnQjtBQUFBLEVBQzVCLFFBQVE7QUFBQSxFQUNSLE9BQU87QUFBQSxFQUNQLEdBQUc7QUFDTCxJQUphO0FBTWIsbUJBQW1CLEdBQVcsT0FBZSxRQUF3QjtBQUNuRSxTQUFPLGNBQWMsY0FBYyxpQkFBaUI7QUFDdEQ7QUFGUyxBQUlGLE1BQU0sc0JBQXNCLHdCQUFDO0FBQUEsRUFDbEM7QUFBQSxFQUNBO0FBQUEsTUFDNEI7QUFDNUIsUUFBTSxDQUFDLFdBQVcsMkJBQVcsWUFBWSxPQUFNO0FBQUEsT0FDMUMsR0FBRyxHQUFHLGNBQWM7QUFBQSxJQUN2QixNQUFNLEtBQUssQ0FBQztBQUFBLElBQ1osUUFBUTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sU0FBUztBQUFBLE1BQ1QsVUFBVTtBQUFBLE1BQ1YsT0FBTztBQUFBLElBQ1Q7QUFBQSxFQUNGLEVBQUU7QUFFRixTQUNFLHdGQUNHLFFBQVEsSUFBSSxDQUFDLFFBQVEsVUFDcEIsbURBQUMsb0JBQVMsS0FBVDtBQUFBLElBRUMsS0FBSztBQUFBLElBQ0wsT0FBTztBQUFBLE1BQ0wsTUFBTSxHQUFHLDBCQUFPLEdBQUcsR0FBRztBQUFBLE1BQ3RCLFVBQVU7QUFBQSxNQUNWLFdBQVcsbUJBQ1QsQ0FBQyxPQUFPLEdBQUcsT0FBTyxPQUFPLE9BQU8sTUFBTSxHQUN0QyxTQUNGO0FBQUEsSUFDRjtBQUFBLEtBRUEsbURBQUM7QUFBQSxJQUFRLFdBQVU7QUFBQSxJQUFjLE1BQU07QUFBQSxHQUFPLENBQ2hELENBQ0QsQ0FDSDtBQUVKLEdBbkNtQzsiLAogICJuYW1lcyI6IFtdCn0K
