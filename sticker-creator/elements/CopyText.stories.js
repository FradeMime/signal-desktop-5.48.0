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
var CopyText_stories_exports = {};
__export(CopyText_stories_exports, {
  _CopyText: () => _CopyText,
  default: () => CopyText_stories_default
});
module.exports = __toCommonJS(CopyText_stories_exports);
var React = __toESM(require("react"));
var import_addon_knobs = require("@storybook/addon-knobs");
var import_StoryRow = require("./StoryRow");
var import_CopyText = require("./CopyText");
var CopyText_stories_default = {
  title: "Sticker Creator/elements"
};
const _CopyText = /* @__PURE__ */ __name(() => {
  const label = (0, import_addon_knobs.text)("label", "foo bar");
  const value = (0, import_addon_knobs.text)("value", "foo bar");
  return /* @__PURE__ */ React.createElement(import_StoryRow.StoryRow, null, /* @__PURE__ */ React.createElement(import_CopyText.CopyText, {
    label,
    value
  }));
}, "_CopyText");
_CopyText.story = {
  name: "CopyText"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  _CopyText
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ29weVRleHQuc3Rvcmllcy50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDE5LTIwMjAgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB0ZXh0IH0gZnJvbSAnQHN0b3J5Ym9vay9hZGRvbi1rbm9icyc7XG5cbmltcG9ydCB7IFN0b3J5Um93IH0gZnJvbSAnLi9TdG9yeVJvdyc7XG5pbXBvcnQgeyBDb3B5VGV4dCB9IGZyb20gJy4vQ29weVRleHQnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHRpdGxlOiAnU3RpY2tlciBDcmVhdG9yL2VsZW1lbnRzJyxcbn07XG5cbmV4cG9ydCBjb25zdCBfQ29weVRleHQgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBsYWJlbCA9IHRleHQoJ2xhYmVsJywgJ2ZvbyBiYXInKTtcbiAgY29uc3QgdmFsdWUgPSB0ZXh0KCd2YWx1ZScsICdmb28gYmFyJyk7XG5cbiAgcmV0dXJuIChcbiAgICA8U3RvcnlSb3c+XG4gICAgICA8Q29weVRleHQgbGFiZWw9e2xhYmVsfSB2YWx1ZT17dmFsdWV9IC8+XG4gICAgPC9TdG9yeVJvdz5cbiAgKTtcbn07XG5cbl9Db3B5VGV4dC5zdG9yeSA9IHtcbiAgbmFtZTogJ0NvcHlUZXh0Jyxcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxZQUF1QjtBQUN2Qix5QkFBcUI7QUFFckIsc0JBQXlCO0FBQ3pCLHNCQUF5QjtBQUV6QixJQUFPLDJCQUFRO0FBQUEsRUFDYixPQUFPO0FBQ1Q7QUFFTyxNQUFNLFlBQVksNkJBQW1CO0FBQzFDLFFBQU0sUUFBUSw2QkFBSyxTQUFTLFNBQVM7QUFDckMsUUFBTSxRQUFRLDZCQUFLLFNBQVMsU0FBUztBQUVyQyxTQUNFLG9DQUFDLGdDQUNDLG9DQUFDO0FBQUEsSUFBUztBQUFBLElBQWM7QUFBQSxHQUFjLENBQ3hDO0FBRUosR0FUeUI7QUFXekIsVUFBVSxRQUFRO0FBQUEsRUFDaEIsTUFBTTtBQUNSOyIsCiAgIm5hbWVzIjogW10KfQo=
