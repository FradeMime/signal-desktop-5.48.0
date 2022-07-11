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
var Typography_stories_exports = {};
__export(Typography_stories_exports, {
  Typography: () => Typography,
  default: () => Typography_stories_default
});
module.exports = __toCommonJS(Typography_stories_exports);
var React = __toESM(require("react"));
var import_addon_knobs = require("@storybook/addon-knobs");
var import_StoryRow = require("./StoryRow");
var import_Typography = require("./Typography");
var Typography_stories_default = {
  title: "Sticker Creator/elements"
};
const Typography = /* @__PURE__ */ __name(() => {
  const child = (0, import_addon_knobs.text)("text", "foo bar");
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(import_StoryRow.StoryRow, {
    left: true
  }, /* @__PURE__ */ React.createElement(import_Typography.H1, null, child)), /* @__PURE__ */ React.createElement(import_StoryRow.StoryRow, {
    left: true
  }, /* @__PURE__ */ React.createElement(import_Typography.H2, null, child)), /* @__PURE__ */ React.createElement(import_StoryRow.StoryRow, {
    left: true
  }, /* @__PURE__ */ React.createElement(import_Typography.Text, null, child, " ", child, " ", child, " ", child)), /* @__PURE__ */ React.createElement(import_StoryRow.StoryRow, {
    left: true
  }, /* @__PURE__ */ React.createElement(import_Typography.Text, null, child, " ", child, " ", child, " ", child, " ", /* @__PURE__ */ React.createElement("a", {
    href: "javascript: void 0;"
  }, "Something something something dark side."))));
}, "Typography");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Typography
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiVHlwb2dyYXBoeS5zdG9yaWVzLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMTktMjAyMCBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbi8qIGVzbGludC1kaXNhYmxlIG5vLXNjcmlwdC11cmwsIGpzeC1hMTF5L2FuY2hvci1pcy12YWxpZCAqL1xuXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB0ZXh0IH0gZnJvbSAnQHN0b3J5Ym9vay9hZGRvbi1rbm9icyc7XG5cbmltcG9ydCB7IFN0b3J5Um93IH0gZnJvbSAnLi9TdG9yeVJvdyc7XG5pbXBvcnQgeyBIMSwgSDIsIFRleHQgfSBmcm9tICcuL1R5cG9ncmFwaHknO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHRpdGxlOiAnU3RpY2tlciBDcmVhdG9yL2VsZW1lbnRzJyxcbn07XG5cbmV4cG9ydCBjb25zdCBUeXBvZ3JhcGh5ID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgY2hpbGQgPSB0ZXh0KCd0ZXh0JywgJ2ZvbyBiYXInKTtcblxuICByZXR1cm4gKFxuICAgIDw+XG4gICAgICA8U3RvcnlSb3cgbGVmdD5cbiAgICAgICAgPEgxPntjaGlsZH08L0gxPlxuICAgICAgPC9TdG9yeVJvdz5cbiAgICAgIDxTdG9yeVJvdyBsZWZ0PlxuICAgICAgICA8SDI+e2NoaWxkfTwvSDI+XG4gICAgICA8L1N0b3J5Um93PlxuICAgICAgPFN0b3J5Um93IGxlZnQ+XG4gICAgICAgIDxUZXh0PlxuICAgICAgICAgIHtjaGlsZH0ge2NoaWxkfSB7Y2hpbGR9IHtjaGlsZH1cbiAgICAgICAgPC9UZXh0PlxuICAgICAgPC9TdG9yeVJvdz5cbiAgICAgIDxTdG9yeVJvdyBsZWZ0PlxuICAgICAgICA8VGV4dD5cbiAgICAgICAgICB7Y2hpbGR9IHtjaGlsZH0ge2NoaWxkfSB7Y2hpbGR9eycgJ31cbiAgICAgICAgICA8YSBocmVmPVwiamF2YXNjcmlwdDogdm9pZCAwO1wiPlxuICAgICAgICAgICAgU29tZXRoaW5nIHNvbWV0aGluZyBzb21ldGhpbmcgZGFyayBzaWRlLlxuICAgICAgICAgIDwvYT5cbiAgICAgICAgPC9UZXh0PlxuICAgICAgPC9TdG9yeVJvdz5cbiAgICA8Lz5cbiAgKTtcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFLQSxZQUF1QjtBQUN2Qix5QkFBcUI7QUFFckIsc0JBQXlCO0FBQ3pCLHdCQUE2QjtBQUU3QixJQUFPLDZCQUFRO0FBQUEsRUFDYixPQUFPO0FBQ1Q7QUFFTyxNQUFNLGFBQWEsNkJBQW1CO0FBQzNDLFFBQU0sUUFBUSw2QkFBSyxRQUFRLFNBQVM7QUFFcEMsU0FDRSwwREFDRSxvQ0FBQztBQUFBLElBQVMsTUFBSTtBQUFBLEtBQ1osb0NBQUMsNEJBQUksS0FBTSxDQUNiLEdBQ0Esb0NBQUM7QUFBQSxJQUFTLE1BQUk7QUFBQSxLQUNaLG9DQUFDLDRCQUFJLEtBQU0sQ0FDYixHQUNBLG9DQUFDO0FBQUEsSUFBUyxNQUFJO0FBQUEsS0FDWixvQ0FBQyw4QkFDRSxPQUFNLEtBQUUsT0FBTSxLQUFFLE9BQU0sS0FBRSxLQUMzQixDQUNGLEdBQ0Esb0NBQUM7QUFBQSxJQUFTLE1BQUk7QUFBQSxLQUNaLG9DQUFDLDhCQUNFLE9BQU0sS0FBRSxPQUFNLEtBQUUsT0FBTSxLQUFFLE9BQU8sS0FDaEMsb0NBQUM7QUFBQSxJQUFFLE1BQUs7QUFBQSxLQUFzQiwwQ0FFOUIsQ0FDRixDQUNGLENBQ0Y7QUFFSixHQTFCMEI7IiwKICAibmFtZXMiOiBbXQp9Cg==
