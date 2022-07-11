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
var Emoji_stories_exports = {};
__export(Emoji_stories_exports, {
  FromEmoji: () => FromEmoji,
  Sizes: () => Sizes,
  SkinTones: () => SkinTones,
  default: () => Emoji_stories_default
});
module.exports = __toCommonJS(Emoji_stories_exports);
var React = __toESM(require("react"));
var import_addon_knobs = require("@storybook/addon-knobs");
var import_Emoji = require("./Emoji");
var Emoji_stories_default = {
  title: "Components/Emoji/Emoji"
};
const tones = [0, 1, 2, 3, 4, 5];
const createProps = /* @__PURE__ */ __name((overrideProps = {}) => ({
  size: (0, import_addon_knobs.select)("size", import_Emoji.EmojiSizes.reduce((m, t) => ({ ...m, [t]: t }), {}), overrideProps.size || 48),
  emoji: (0, import_addon_knobs.text)("emoji", overrideProps.emoji || ""),
  shortName: (0, import_addon_knobs.text)("shortName", overrideProps.shortName || ""),
  skinTone: (0, import_addon_knobs.select)("skinTone", tones.reduce((m, t) => ({ ...m, [t]: t }), {}), overrideProps.skinTone || 0)
}), "createProps");
const Sizes = /* @__PURE__ */ __name(() => {
  const props = createProps({
    shortName: "grinning_face_with_star_eyes"
  });
  return /* @__PURE__ */ React.createElement(React.Fragment, null, import_Emoji.EmojiSizes.map((size) => /* @__PURE__ */ React.createElement(import_Emoji.Emoji, {
    key: size,
    ...props,
    size
  })));
}, "Sizes");
const SkinTones = /* @__PURE__ */ __name(() => {
  const props = createProps({
    shortName: "raised_back_of_hand"
  });
  return /* @__PURE__ */ React.createElement(React.Fragment, null, tones.map((skinTone) => /* @__PURE__ */ React.createElement(import_Emoji.Emoji, {
    key: skinTone,
    ...props,
    skinTone
  })));
}, "SkinTones");
const FromEmoji = /* @__PURE__ */ __name(() => {
  const props = createProps({
    emoji: "\u{1F602}"
  });
  return /* @__PURE__ */ React.createElement(import_Emoji.Emoji, {
    ...props
  });
}, "FromEmoji");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FromEmoji,
  Sizes,
  SkinTones
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiRW1vamkuc3Rvcmllcy50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIwIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgc2VsZWN0LCB0ZXh0IH0gZnJvbSAnQHN0b3J5Ym9vay9hZGRvbi1rbm9icyc7XG5pbXBvcnQgdHlwZSB7IFByb3BzIH0gZnJvbSAnLi9FbW9qaSc7XG5pbXBvcnQgeyBFbW9qaSwgRW1vamlTaXplcyB9IGZyb20gJy4vRW1vamknO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHRpdGxlOiAnQ29tcG9uZW50cy9FbW9qaS9FbW9qaScsXG59O1xuXG5jb25zdCB0b25lcyA9IFswLCAxLCAyLCAzLCA0LCA1XTtcblxuY29uc3QgY3JlYXRlUHJvcHMgPSAob3ZlcnJpZGVQcm9wczogUGFydGlhbDxQcm9wcz4gPSB7fSk6IFByb3BzID0+ICh7XG4gIHNpemU6IHNlbGVjdChcbiAgICAnc2l6ZScsXG4gICAgRW1vamlTaXplcy5yZWR1Y2UoKG0sIHQpID0+ICh7IC4uLm0sIFt0XTogdCB9KSwge30pLFxuICAgIG92ZXJyaWRlUHJvcHMuc2l6ZSB8fCA0OFxuICApLFxuICBlbW9qaTogdGV4dCgnZW1vamknLCBvdmVycmlkZVByb3BzLmVtb2ppIHx8ICcnKSxcbiAgc2hvcnROYW1lOiB0ZXh0KCdzaG9ydE5hbWUnLCBvdmVycmlkZVByb3BzLnNob3J0TmFtZSB8fCAnJyksXG4gIHNraW5Ub25lOiBzZWxlY3QoXG4gICAgJ3NraW5Ub25lJyxcbiAgICB0b25lcy5yZWR1Y2UoKG0sIHQpID0+ICh7IC4uLm0sIFt0XTogdCB9KSwge30pLFxuICAgIG92ZXJyaWRlUHJvcHMuc2tpblRvbmUgfHwgMFxuICApLFxufSk7XG5cbmV4cG9ydCBjb25zdCBTaXplcyA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IHByb3BzID0gY3JlYXRlUHJvcHMoe1xuICAgIHNob3J0TmFtZTogJ2dyaW5uaW5nX2ZhY2Vfd2l0aF9zdGFyX2V5ZXMnLFxuICB9KTtcblxuICByZXR1cm4gKFxuICAgIDw+XG4gICAgICB7RW1vamlTaXplcy5tYXAoc2l6ZSA9PiAoXG4gICAgICAgIDxFbW9qaSBrZXk9e3NpemV9IHsuLi5wcm9wc30gc2l6ZT17c2l6ZX0gLz5cbiAgICAgICkpfVxuICAgIDwvPlxuICApO1xufTtcblxuZXhwb3J0IGNvbnN0IFNraW5Ub25lcyA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IHByb3BzID0gY3JlYXRlUHJvcHMoe1xuICAgIHNob3J0TmFtZTogJ3JhaXNlZF9iYWNrX29mX2hhbmQnLFxuICB9KTtcblxuICByZXR1cm4gKFxuICAgIDw+XG4gICAgICB7dG9uZXMubWFwKHNraW5Ub25lID0+IChcbiAgICAgICAgPEVtb2ppIGtleT17c2tpblRvbmV9IHsuLi5wcm9wc30gc2tpblRvbmU9e3NraW5Ub25lfSAvPlxuICAgICAgKSl9XG4gICAgPC8+XG4gICk7XG59O1xuXG5leHBvcnQgY29uc3QgRnJvbUVtb2ppID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgcHJvcHMgPSBjcmVhdGVQcm9wcyh7XG4gICAgZW1vamk6ICdcdUQ4M0RcdURFMDInLFxuICB9KTtcblxuICByZXR1cm4gPEVtb2ppIHsuLi5wcm9wc30gLz47XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLFlBQXVCO0FBQ3ZCLHlCQUE2QjtBQUU3QixtQkFBa0M7QUFFbEMsSUFBTyx3QkFBUTtBQUFBLEVBQ2IsT0FBTztBQUNUO0FBRUEsTUFBTSxRQUFRLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7QUFFL0IsTUFBTSxjQUFjLHdCQUFDLGdCQUFnQyxDQUFDLE1BQWM7QUFBQSxFQUNsRSxNQUFNLCtCQUNKLFFBQ0Esd0JBQVcsT0FBTyxDQUFDLEdBQUcsTUFBTyxNQUFLLElBQUksSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQ2xELGNBQWMsUUFBUSxFQUN4QjtBQUFBLEVBQ0EsT0FBTyw2QkFBSyxTQUFTLGNBQWMsU0FBUyxFQUFFO0FBQUEsRUFDOUMsV0FBVyw2QkFBSyxhQUFhLGNBQWMsYUFBYSxFQUFFO0FBQUEsRUFDMUQsVUFBVSwrQkFDUixZQUNBLE1BQU0sT0FBTyxDQUFDLEdBQUcsTUFBTyxNQUFLLElBQUksSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQzdDLGNBQWMsWUFBWSxDQUM1QjtBQUNGLElBYm9CO0FBZWIsTUFBTSxRQUFRLDZCQUFtQjtBQUN0QyxRQUFNLFFBQVEsWUFBWTtBQUFBLElBQ3hCLFdBQVc7QUFBQSxFQUNiLENBQUM7QUFFRCxTQUNFLDBEQUNHLHdCQUFXLElBQUksVUFDZCxvQ0FBQztBQUFBLElBQU0sS0FBSztBQUFBLE9BQVU7QUFBQSxJQUFPO0FBQUEsR0FBWSxDQUMxQyxDQUNIO0FBRUosR0FacUI7QUFjZCxNQUFNLFlBQVksNkJBQW1CO0FBQzFDLFFBQU0sUUFBUSxZQUFZO0FBQUEsSUFDeEIsV0FBVztBQUFBLEVBQ2IsQ0FBQztBQUVELFNBQ0UsMERBQ0csTUFBTSxJQUFJLGNBQ1Qsb0NBQUM7QUFBQSxJQUFNLEtBQUs7QUFBQSxPQUFjO0FBQUEsSUFBTztBQUFBLEdBQW9CLENBQ3RELENBQ0g7QUFFSixHQVp5QjtBQWNsQixNQUFNLFlBQVksNkJBQW1CO0FBQzFDLFFBQU0sUUFBUSxZQUFZO0FBQUEsSUFDeEIsT0FBTztBQUFBLEVBQ1QsQ0FBQztBQUVELFNBQU8sb0NBQUM7QUFBQSxPQUFVO0FBQUEsR0FBTztBQUMzQixHQU55QjsiLAogICJuYW1lcyI6IFtdCn0K
