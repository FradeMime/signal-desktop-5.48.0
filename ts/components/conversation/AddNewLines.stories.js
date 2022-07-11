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
var AddNewLines_stories_exports = {};
__export(AddNewLines_stories_exports, {
  AllNewlines: () => AllNewlines,
  CustomRenderFunction: () => CustomRenderFunction,
  NewlinesInTheMiddle: () => NewlinesInTheMiddle,
  NoNewlines: () => NoNewlines,
  StartingEndingWithNewlines: () => StartingEndingWithNewlines,
  default: () => AddNewLines_stories_default
});
module.exports = __toCommonJS(AddNewLines_stories_exports);
var React = __toESM(require("react"));
var import_addon_knobs = require("@storybook/addon-knobs");
var import_AddNewLines = require("./AddNewLines");
var AddNewLines_stories_default = {
  title: "Components/Conversation/AddNewLines"
};
const createProps = /* @__PURE__ */ __name((overrideProps = {}) => ({
  renderNonNewLine: overrideProps.renderNonNewLine,
  text: (0, import_addon_knobs.text)("text", overrideProps.text || "")
}), "createProps");
const AllNewlines = /* @__PURE__ */ __name(() => {
  const props = createProps({
    text: "\n\n\n"
  });
  return /* @__PURE__ */ React.createElement(import_AddNewLines.AddNewLines, {
    ...props
  });
}, "AllNewlines");
AllNewlines.story = {
  name: "All newlines"
};
const StartingEndingWithNewlines = /* @__PURE__ */ __name(() => {
  const props = createProps({
    text: "\nSome text\n"
  });
  return /* @__PURE__ */ React.createElement(import_AddNewLines.AddNewLines, {
    ...props
  });
}, "StartingEndingWithNewlines");
StartingEndingWithNewlines.story = {
  name: "Starting/Ending with Newlines"
};
const NewlinesInTheMiddle = /* @__PURE__ */ __name(() => {
  const props = createProps({
    text: "Some\ntext"
  });
  return /* @__PURE__ */ React.createElement(import_AddNewLines.AddNewLines, {
    ...props
  });
}, "NewlinesInTheMiddle");
NewlinesInTheMiddle.story = {
  name: "Newlines in the Middle"
};
const NoNewlines = /* @__PURE__ */ __name(() => {
  const props = createProps({
    text: "Some text"
  });
  return /* @__PURE__ */ React.createElement(import_AddNewLines.AddNewLines, {
    ...props
  });
}, "NoNewlines");
const CustomRenderFunction = /* @__PURE__ */ __name(() => {
  const props = createProps({
    text: "Some text",
    renderNonNewLine: ({ text: theText, key }) => /* @__PURE__ */ React.createElement("div", {
      key,
      style: { color: "aquamarine" }
    }, theText)
  });
  return /* @__PURE__ */ React.createElement(import_AddNewLines.AddNewLines, {
    ...props
  });
}, "CustomRenderFunction");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AllNewlines,
  CustomRenderFunction,
  NewlinesInTheMiddle,
  NoNewlines,
  StartingEndingWithNewlines
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQWRkTmV3TGluZXMuc3Rvcmllcy50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIwIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgeyB0ZXh0IH0gZnJvbSAnQHN0b3J5Ym9vay9hZGRvbi1rbm9icyc7XG5cbmltcG9ydCB0eXBlIHsgUHJvcHMgfSBmcm9tICcuL0FkZE5ld0xpbmVzJztcbmltcG9ydCB7IEFkZE5ld0xpbmVzIH0gZnJvbSAnLi9BZGROZXdMaW5lcyc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgdGl0bGU6ICdDb21wb25lbnRzL0NvbnZlcnNhdGlvbi9BZGROZXdMaW5lcycsXG59O1xuXG5jb25zdCBjcmVhdGVQcm9wcyA9IChvdmVycmlkZVByb3BzOiBQYXJ0aWFsPFByb3BzPiA9IHt9KTogUHJvcHMgPT4gKHtcbiAgcmVuZGVyTm9uTmV3TGluZTogb3ZlcnJpZGVQcm9wcy5yZW5kZXJOb25OZXdMaW5lLFxuICB0ZXh0OiB0ZXh0KCd0ZXh0Jywgb3ZlcnJpZGVQcm9wcy50ZXh0IHx8ICcnKSxcbn0pO1xuXG5leHBvcnQgY29uc3QgQWxsTmV3bGluZXMgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBwcm9wcyA9IGNyZWF0ZVByb3BzKHtcbiAgICB0ZXh0OiAnXFxuXFxuXFxuJyxcbiAgfSk7XG5cbiAgcmV0dXJuIDxBZGROZXdMaW5lcyB7Li4ucHJvcHN9IC8+O1xufTtcblxuQWxsTmV3bGluZXMuc3RvcnkgPSB7XG4gIG5hbWU6ICdBbGwgbmV3bGluZXMnLFxufTtcblxuZXhwb3J0IGNvbnN0IFN0YXJ0aW5nRW5kaW5nV2l0aE5ld2xpbmVzID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgcHJvcHMgPSBjcmVhdGVQcm9wcyh7XG4gICAgdGV4dDogJ1xcblNvbWUgdGV4dFxcbicsXG4gIH0pO1xuXG4gIHJldHVybiA8QWRkTmV3TGluZXMgey4uLnByb3BzfSAvPjtcbn07XG5cblN0YXJ0aW5nRW5kaW5nV2l0aE5ld2xpbmVzLnN0b3J5ID0ge1xuICBuYW1lOiAnU3RhcnRpbmcvRW5kaW5nIHdpdGggTmV3bGluZXMnLFxufTtcblxuZXhwb3J0IGNvbnN0IE5ld2xpbmVzSW5UaGVNaWRkbGUgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBwcm9wcyA9IGNyZWF0ZVByb3BzKHtcbiAgICB0ZXh0OiAnU29tZVxcbnRleHQnLFxuICB9KTtcblxuICByZXR1cm4gPEFkZE5ld0xpbmVzIHsuLi5wcm9wc30gLz47XG59O1xuXG5OZXdsaW5lc0luVGhlTWlkZGxlLnN0b3J5ID0ge1xuICBuYW1lOiAnTmV3bGluZXMgaW4gdGhlIE1pZGRsZScsXG59O1xuXG5leHBvcnQgY29uc3QgTm9OZXdsaW5lcyA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IHByb3BzID0gY3JlYXRlUHJvcHMoe1xuICAgIHRleHQ6ICdTb21lIHRleHQnLFxuICB9KTtcblxuICByZXR1cm4gPEFkZE5ld0xpbmVzIHsuLi5wcm9wc30gLz47XG59O1xuXG5leHBvcnQgY29uc3QgQ3VzdG9tUmVuZGVyRnVuY3Rpb24gPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBwcm9wcyA9IGNyZWF0ZVByb3BzKHtcbiAgICB0ZXh0OiAnU29tZSB0ZXh0JyxcbiAgICByZW5kZXJOb25OZXdMaW5lOiAoeyB0ZXh0OiB0aGVUZXh0LCBrZXkgfSkgPT4gKFxuICAgICAgPGRpdiBrZXk9e2tleX0gc3R5bGU9e3sgY29sb3I6ICdhcXVhbWFyaW5lJyB9fT5cbiAgICAgICAge3RoZVRleHR9XG4gICAgICA8L2Rpdj5cbiAgICApLFxuICB9KTtcblxuICByZXR1cm4gPEFkZE5ld0xpbmVzIHsuLi5wcm9wc30gLz47XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxZQUF1QjtBQUV2Qix5QkFBcUI7QUFHckIseUJBQTRCO0FBRTVCLElBQU8sOEJBQVE7QUFBQSxFQUNiLE9BQU87QUFDVDtBQUVBLE1BQU0sY0FBYyx3QkFBQyxnQkFBZ0MsQ0FBQyxNQUFjO0FBQUEsRUFDbEUsa0JBQWtCLGNBQWM7QUFBQSxFQUNoQyxNQUFNLDZCQUFLLFFBQVEsY0FBYyxRQUFRLEVBQUU7QUFDN0MsSUFIb0I7QUFLYixNQUFNLGNBQWMsNkJBQW1CO0FBQzVDLFFBQU0sUUFBUSxZQUFZO0FBQUEsSUFDeEIsTUFBTTtBQUFBLEVBQ1IsQ0FBQztBQUVELFNBQU8sb0NBQUM7QUFBQSxPQUFnQjtBQUFBLEdBQU87QUFDakMsR0FOMkI7QUFRM0IsWUFBWSxRQUFRO0FBQUEsRUFDbEIsTUFBTTtBQUNSO0FBRU8sTUFBTSw2QkFBNkIsNkJBQW1CO0FBQzNELFFBQU0sUUFBUSxZQUFZO0FBQUEsSUFDeEIsTUFBTTtBQUFBLEVBQ1IsQ0FBQztBQUVELFNBQU8sb0NBQUM7QUFBQSxPQUFnQjtBQUFBLEdBQU87QUFDakMsR0FOMEM7QUFRMUMsMkJBQTJCLFFBQVE7QUFBQSxFQUNqQyxNQUFNO0FBQ1I7QUFFTyxNQUFNLHNCQUFzQiw2QkFBbUI7QUFDcEQsUUFBTSxRQUFRLFlBQVk7QUFBQSxJQUN4QixNQUFNO0FBQUEsRUFDUixDQUFDO0FBRUQsU0FBTyxvQ0FBQztBQUFBLE9BQWdCO0FBQUEsR0FBTztBQUNqQyxHQU5tQztBQVFuQyxvQkFBb0IsUUFBUTtBQUFBLEVBQzFCLE1BQU07QUFDUjtBQUVPLE1BQU0sYUFBYSw2QkFBbUI7QUFDM0MsUUFBTSxRQUFRLFlBQVk7QUFBQSxJQUN4QixNQUFNO0FBQUEsRUFDUixDQUFDO0FBRUQsU0FBTyxvQ0FBQztBQUFBLE9BQWdCO0FBQUEsR0FBTztBQUNqQyxHQU4wQjtBQVFuQixNQUFNLHVCQUF1Qiw2QkFBbUI7QUFDckQsUUFBTSxRQUFRLFlBQVk7QUFBQSxJQUN4QixNQUFNO0FBQUEsSUFDTixrQkFBa0IsQ0FBQyxFQUFFLE1BQU0sU0FBUyxVQUNsQyxvQ0FBQztBQUFBLE1BQUk7QUFBQSxNQUFVLE9BQU8sRUFBRSxPQUFPLGFBQWE7QUFBQSxPQUN6QyxPQUNIO0FBQUEsRUFFSixDQUFDO0FBRUQsU0FBTyxvQ0FBQztBQUFBLE9BQWdCO0FBQUEsR0FBTztBQUNqQyxHQVhvQzsiLAogICJuYW1lcyI6IFtdCn0K
