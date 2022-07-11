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
var Emojify_stories_exports = {};
__export(Emojify_stories_exports, {
  AllTextNoEmoji: () => AllTextNoEmoji,
  CustomTextRender: () => CustomTextRender,
  EmojiOnly: () => EmojiOnly,
  ExtraLarge: () => ExtraLarge,
  Jumbo: () => Jumbo,
  Large: () => Large,
  Medium: () => Medium,
  PlusText: () => PlusText,
  SkinColorModifier: () => SkinColorModifier,
  Small: () => Small,
  TensOfThousandsOfEmoji: () => TensOfThousandsOfEmoji,
  TensOfThousandsOfEmojiInterspersedWithText: () => TensOfThousandsOfEmojiInterspersedWithText,
  default: () => Emojify_stories_default
});
module.exports = __toCommonJS(Emojify_stories_exports);
var React = __toESM(require("react"));
var import_addon_knobs = require("@storybook/addon-knobs");
var import_Emojify = require("./Emojify");
var Emojify_stories_default = {
  title: "Components/Conversation/Emojify"
};
const createProps = /* @__PURE__ */ __name((overrideProps = {}) => ({
  renderNonEmoji: overrideProps.renderNonEmoji,
  sizeClass: overrideProps.sizeClass,
  text: (0, import_addon_knobs.text)("text", overrideProps.text || "")
}), "createProps");
const EmojiOnly = /* @__PURE__ */ __name(() => {
  const props = createProps({
    text: "\u{1F639}\u{1F639}\u{1F639}"
  });
  return /* @__PURE__ */ React.createElement(import_Emojify.Emojify, {
    ...props
  });
}, "EmojiOnly");
const SkinColorModifier = /* @__PURE__ */ __name(() => {
  const props = createProps({
    text: "\u{1F44D}\u{1F3FE}"
  });
  return /* @__PURE__ */ React.createElement(import_Emojify.Emojify, {
    ...props
  });
}, "SkinColorModifier");
const Jumbo = /* @__PURE__ */ __name(() => {
  const props = createProps({
    text: "\u{1F639}\u{1F639}\u{1F639}",
    sizeClass: "max"
  });
  return /* @__PURE__ */ React.createElement(import_Emojify.Emojify, {
    ...props
  });
}, "Jumbo");
const ExtraLarge = /* @__PURE__ */ __name(() => {
  const props = createProps({
    text: "\u{1F639}\u{1F639}\u{1F639}",
    sizeClass: "extra-large"
  });
  return /* @__PURE__ */ React.createElement(import_Emojify.Emojify, {
    ...props
  });
}, "ExtraLarge");
const Large = /* @__PURE__ */ __name(() => {
  const props = createProps({
    text: "\u{1F639}\u{1F639}\u{1F639}",
    sizeClass: "large"
  });
  return /* @__PURE__ */ React.createElement(import_Emojify.Emojify, {
    ...props
  });
}, "Large");
const Medium = /* @__PURE__ */ __name(() => {
  const props = createProps({
    text: "\u{1F639}\u{1F639}\u{1F639}",
    sizeClass: "medium"
  });
  return /* @__PURE__ */ React.createElement(import_Emojify.Emojify, {
    ...props
  });
}, "Medium");
const Small = /* @__PURE__ */ __name(() => {
  const props = createProps({
    text: "\u{1F639}\u{1F639}\u{1F639}",
    sizeClass: "small"
  });
  return /* @__PURE__ */ React.createElement(import_Emojify.Emojify, {
    ...props
  });
}, "Small");
const PlusText = /* @__PURE__ */ __name(() => {
  const props = createProps({
    text: "this \u{1F639} cat \u{1F639} is \u{1F639} so \u{1F639} joyful"
  });
  return /* @__PURE__ */ React.createElement(import_Emojify.Emojify, {
    ...props
  });
}, "PlusText");
const AllTextNoEmoji = /* @__PURE__ */ __name(() => {
  const props = createProps({
    text: "this cat is so joyful"
  });
  return /* @__PURE__ */ React.createElement(import_Emojify.Emojify, {
    ...props
  });
}, "AllTextNoEmoji");
AllTextNoEmoji.story = {
  name: "All Text, No Emoji"
};
const CustomTextRender = /* @__PURE__ */ __name(() => {
  const props = createProps({
    text: "this \u{1F639} cat \u{1F639} is \u{1F639} so \u{1F639} joyful",
    renderNonEmoji: ({ text: theText, key }) => /* @__PURE__ */ React.createElement("div", {
      key,
      style: { backgroundColor: "aquamarine" }
    }, theText)
  });
  return /* @__PURE__ */ React.createElement(import_Emojify.Emojify, {
    ...props
  });
}, "CustomTextRender");
const TensOfThousandsOfEmoji = /* @__PURE__ */ __name(() => {
  const props = createProps({
    text: "\u{1F485}".repeat(4e4)
  });
  return /* @__PURE__ */ React.createElement(import_Emojify.Emojify, {
    ...props
  });
}, "TensOfThousandsOfEmoji");
TensOfThousandsOfEmoji.story = {
  name: "Tens of thousands of emoji"
};
const TensOfThousandsOfEmojiInterspersedWithText = /* @__PURE__ */ __name(() => {
  const props = createProps({
    text: "\u{1F485} hi ".repeat(4e4)
  });
  return /* @__PURE__ */ React.createElement(import_Emojify.Emojify, {
    ...props
  });
}, "TensOfThousandsOfEmojiInterspersedWithText");
TensOfThousandsOfEmojiInterspersedWithText.story = {
  name: "Tens of thousands of emoji, interspersed with text"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AllTextNoEmoji,
  CustomTextRender,
  EmojiOnly,
  ExtraLarge,
  Jumbo,
  Large,
  Medium,
  PlusText,
  SkinColorModifier,
  Small,
  TensOfThousandsOfEmoji,
  TensOfThousandsOfEmojiInterspersedWithText
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiRW1vamlmeS5zdG9yaWVzLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjAgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IHRleHQgfSBmcm9tICdAc3Rvcnlib29rL2FkZG9uLWtub2JzJztcblxuaW1wb3J0IHR5cGUgeyBQcm9wcyB9IGZyb20gJy4vRW1vamlmeSc7XG5pbXBvcnQgeyBFbW9qaWZ5IH0gZnJvbSAnLi9FbW9qaWZ5JztcblxuZXhwb3J0IGRlZmF1bHQge1xuICB0aXRsZTogJ0NvbXBvbmVudHMvQ29udmVyc2F0aW9uL0Vtb2ppZnknLFxufTtcblxuY29uc3QgY3JlYXRlUHJvcHMgPSAob3ZlcnJpZGVQcm9wczogUGFydGlhbDxQcm9wcz4gPSB7fSk6IFByb3BzID0+ICh7XG4gIHJlbmRlck5vbkVtb2ppOiBvdmVycmlkZVByb3BzLnJlbmRlck5vbkVtb2ppLFxuICBzaXplQ2xhc3M6IG92ZXJyaWRlUHJvcHMuc2l6ZUNsYXNzLFxuICB0ZXh0OiB0ZXh0KCd0ZXh0Jywgb3ZlcnJpZGVQcm9wcy50ZXh0IHx8ICcnKSxcbn0pO1xuXG5leHBvcnQgY29uc3QgRW1vamlPbmx5ID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgcHJvcHMgPSBjcmVhdGVQcm9wcyh7XG4gICAgdGV4dDogJ1x1RDgzRFx1REUzOVx1RDgzRFx1REUzOVx1RDgzRFx1REUzOScsXG4gIH0pO1xuXG4gIHJldHVybiA8RW1vamlmeSB7Li4ucHJvcHN9IC8+O1xufTtcblxuZXhwb3J0IGNvbnN0IFNraW5Db2xvck1vZGlmaWVyID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgcHJvcHMgPSBjcmVhdGVQcm9wcyh7XG4gICAgdGV4dDogJ1x1RDgzRFx1REM0RFx1RDgzQ1x1REZGRScsXG4gIH0pO1xuXG4gIHJldHVybiA8RW1vamlmeSB7Li4ucHJvcHN9IC8+O1xufTtcblxuZXhwb3J0IGNvbnN0IEp1bWJvID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgcHJvcHMgPSBjcmVhdGVQcm9wcyh7XG4gICAgdGV4dDogJ1x1RDgzRFx1REUzOVx1RDgzRFx1REUzOVx1RDgzRFx1REUzOScsXG4gICAgc2l6ZUNsYXNzOiAnbWF4JyxcbiAgfSk7XG5cbiAgcmV0dXJuIDxFbW9qaWZ5IHsuLi5wcm9wc30gLz47XG59O1xuXG5leHBvcnQgY29uc3QgRXh0cmFMYXJnZSA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IHByb3BzID0gY3JlYXRlUHJvcHMoe1xuICAgIHRleHQ6ICdcdUQ4M0RcdURFMzlcdUQ4M0RcdURFMzlcdUQ4M0RcdURFMzknLFxuICAgIHNpemVDbGFzczogJ2V4dHJhLWxhcmdlJyxcbiAgfSk7XG5cbiAgcmV0dXJuIDxFbW9qaWZ5IHsuLi5wcm9wc30gLz47XG59O1xuXG5leHBvcnQgY29uc3QgTGFyZ2UgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBwcm9wcyA9IGNyZWF0ZVByb3BzKHtcbiAgICB0ZXh0OiAnXHVEODNEXHVERTM5XHVEODNEXHVERTM5XHVEODNEXHVERTM5JyxcbiAgICBzaXplQ2xhc3M6ICdsYXJnZScsXG4gIH0pO1xuXG4gIHJldHVybiA8RW1vamlmeSB7Li4ucHJvcHN9IC8+O1xufTtcblxuZXhwb3J0IGNvbnN0IE1lZGl1bSA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IHByb3BzID0gY3JlYXRlUHJvcHMoe1xuICAgIHRleHQ6ICdcdUQ4M0RcdURFMzlcdUQ4M0RcdURFMzlcdUQ4M0RcdURFMzknLFxuICAgIHNpemVDbGFzczogJ21lZGl1bScsXG4gIH0pO1xuXG4gIHJldHVybiA8RW1vamlmeSB7Li4ucHJvcHN9IC8+O1xufTtcblxuZXhwb3J0IGNvbnN0IFNtYWxsID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgcHJvcHMgPSBjcmVhdGVQcm9wcyh7XG4gICAgdGV4dDogJ1x1RDgzRFx1REUzOVx1RDgzRFx1REUzOVx1RDgzRFx1REUzOScsXG4gICAgc2l6ZUNsYXNzOiAnc21hbGwnLFxuICB9KTtcblxuICByZXR1cm4gPEVtb2ppZnkgey4uLnByb3BzfSAvPjtcbn07XG5cbmV4cG9ydCBjb25zdCBQbHVzVGV4dCA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IHByb3BzID0gY3JlYXRlUHJvcHMoe1xuICAgIHRleHQ6ICd0aGlzIFx1RDgzRFx1REUzOSBjYXQgXHVEODNEXHVERTM5IGlzIFx1RDgzRFx1REUzOSBzbyBcdUQ4M0RcdURFMzkgam95ZnVsJyxcbiAgfSk7XG5cbiAgcmV0dXJuIDxFbW9qaWZ5IHsuLi5wcm9wc30gLz47XG59O1xuXG5leHBvcnQgY29uc3QgQWxsVGV4dE5vRW1vamkgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBwcm9wcyA9IGNyZWF0ZVByb3BzKHtcbiAgICB0ZXh0OiAndGhpcyBjYXQgaXMgc28gam95ZnVsJyxcbiAgfSk7XG5cbiAgcmV0dXJuIDxFbW9qaWZ5IHsuLi5wcm9wc30gLz47XG59O1xuXG5BbGxUZXh0Tm9FbW9qaS5zdG9yeSA9IHtcbiAgbmFtZTogJ0FsbCBUZXh0LCBObyBFbW9qaScsXG59O1xuXG5leHBvcnQgY29uc3QgQ3VzdG9tVGV4dFJlbmRlciA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IHByb3BzID0gY3JlYXRlUHJvcHMoe1xuICAgIHRleHQ6ICd0aGlzIFx1RDgzRFx1REUzOSBjYXQgXHVEODNEXHVERTM5IGlzIFx1RDgzRFx1REUzOSBzbyBcdUQ4M0RcdURFMzkgam95ZnVsJyxcbiAgICByZW5kZXJOb25FbW9qaTogKHsgdGV4dDogdGhlVGV4dCwga2V5IH0pID0+IChcbiAgICAgIDxkaXYga2V5PXtrZXl9IHN0eWxlPXt7IGJhY2tncm91bmRDb2xvcjogJ2FxdWFtYXJpbmUnIH19PlxuICAgICAgICB7dGhlVGV4dH1cbiAgICAgIDwvZGl2PlxuICAgICksXG4gIH0pO1xuXG4gIHJldHVybiA8RW1vamlmeSB7Li4ucHJvcHN9IC8+O1xufTtcblxuZXhwb3J0IGNvbnN0IFRlbnNPZlRob3VzYW5kc09mRW1vamkgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBwcm9wcyA9IGNyZWF0ZVByb3BzKHtcbiAgICB0ZXh0OiAnXHVEODNEXHVEQzg1Jy5yZXBlYXQoNDAwMDApLFxuICB9KTtcblxuICByZXR1cm4gPEVtb2ppZnkgey4uLnByb3BzfSAvPjtcbn07XG5cblRlbnNPZlRob3VzYW5kc09mRW1vamkuc3RvcnkgPSB7XG4gIG5hbWU6ICdUZW5zIG9mIHRob3VzYW5kcyBvZiBlbW9qaScsXG59O1xuXG5leHBvcnQgY29uc3QgVGVuc09mVGhvdXNhbmRzT2ZFbW9qaUludGVyc3BlcnNlZFdpdGhUZXh0ID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgcHJvcHMgPSBjcmVhdGVQcm9wcyh7XG4gICAgdGV4dDogJ1x1RDgzRFx1REM4NSBoaSAnLnJlcGVhdCg0MDAwMCksXG4gIH0pO1xuXG4gIHJldHVybiA8RW1vamlmeSB7Li4ucHJvcHN9IC8+O1xufTtcblxuVGVuc09mVGhvdXNhbmRzT2ZFbW9qaUludGVyc3BlcnNlZFdpdGhUZXh0LnN0b3J5ID0ge1xuICBuYW1lOiAnVGVucyBvZiB0aG91c2FuZHMgb2YgZW1vamksIGludGVyc3BlcnNlZCB3aXRoIHRleHQnLFxufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxZQUF1QjtBQUV2Qix5QkFBcUI7QUFHckIscUJBQXdCO0FBRXhCLElBQU8sMEJBQVE7QUFBQSxFQUNiLE9BQU87QUFDVDtBQUVBLE1BQU0sY0FBYyx3QkFB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
