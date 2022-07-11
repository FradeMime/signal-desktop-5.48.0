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
var DialogRelink_stories_exports = {};
__export(DialogRelink_stories_exports, {
  Iterations: () => Iterations,
  KnobsPlayground: () => KnobsPlayground,
  default: () => DialogRelink_stories_default
});
module.exports = __toCommonJS(DialogRelink_stories_exports);
var React = __toESM(require("react"));
var import_addon_knobs = require("@storybook/addon-knobs");
var import_addon_actions = require("@storybook/addon-actions");
var import_DialogRelink = require("./DialogRelink");
var import_setupI18n = require("../util/setupI18n");
var import_messages = __toESM(require("../../_locales/en/messages.json"));
var import_util = require("./_util");
var import_FakeLeftPaneContainer = require("../test-both/helpers/FakeLeftPaneContainer");
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
const defaultProps = {
  containerWidthBreakpoint: import_util.WidthBreakpoint.Wide,
  i18n,
  isRegistrationDone: true,
  relinkDevice: (0, import_addon_actions.action)("relink-device")
};
const permutations = [
  {
    title: "Unlinked (wide container)",
    props: {
      containerWidthBreakpoint: import_util.WidthBreakpoint.Wide,
      isRegistrationDone: false
    }
  },
  {
    title: "Unlinked (narrow container)",
    props: {
      containerWidthBreakpoint: import_util.WidthBreakpoint.Narrow,
      isRegistrationDone: false
    }
  }
];
var DialogRelink_stories_default = {
  title: "Components/DialogRelink"
};
const KnobsPlayground = /* @__PURE__ */ __name(() => {
  const isRegistrationDone = (0, import_addon_knobs.boolean)("isRegistrationDone", false);
  return /* @__PURE__ */ React.createElement(import_DialogRelink.DialogRelink, {
    ...defaultProps,
    isRegistrationDone
  });
}, "KnobsPlayground");
const Iterations = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ React.createElement(React.Fragment, null, permutations.map(({ props, title }) => /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("h3", null, title), /* @__PURE__ */ React.createElement(import_FakeLeftPaneContainer.FakeLeftPaneContainer, {
    containerWidthBreakpoint: props.containerWidthBreakpoint
  }, /* @__PURE__ */ React.createElement(import_DialogRelink.DialogRelink, {
    ...defaultProps,
    ...props
  })))));
}, "Iterations");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Iterations,
  KnobsPlayground
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiRGlhbG9nUmVsaW5rLnN0b3JpZXMudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMC0yMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgYm9vbGVhbiB9IGZyb20gJ0BzdG9yeWJvb2svYWRkb24ta25vYnMnO1xuaW1wb3J0IHsgYWN0aW9uIH0gZnJvbSAnQHN0b3J5Ym9vay9hZGRvbi1hY3Rpb25zJztcblxuaW1wb3J0IHsgRGlhbG9nUmVsaW5rIH0gZnJvbSAnLi9EaWFsb2dSZWxpbmsnO1xuaW1wb3J0IHsgc2V0dXBJMThuIH0gZnJvbSAnLi4vdXRpbC9zZXR1cEkxOG4nO1xuaW1wb3J0IGVuTWVzc2FnZXMgZnJvbSAnLi4vLi4vX2xvY2FsZXMvZW4vbWVzc2FnZXMuanNvbic7XG5pbXBvcnQgeyBXaWR0aEJyZWFrcG9pbnQgfSBmcm9tICcuL191dGlsJztcbmltcG9ydCB7IEZha2VMZWZ0UGFuZUNvbnRhaW5lciB9IGZyb20gJy4uL3Rlc3QtYm90aC9oZWxwZXJzL0Zha2VMZWZ0UGFuZUNvbnRhaW5lcic7XG5cbmNvbnN0IGkxOG4gPSBzZXR1cEkxOG4oJ2VuJywgZW5NZXNzYWdlcyk7XG5cbmNvbnN0IGRlZmF1bHRQcm9wcyA9IHtcbiAgY29udGFpbmVyV2lkdGhCcmVha3BvaW50OiBXaWR0aEJyZWFrcG9pbnQuV2lkZSxcbiAgaTE4bixcbiAgaXNSZWdpc3RyYXRpb25Eb25lOiB0cnVlLFxuICByZWxpbmtEZXZpY2U6IGFjdGlvbigncmVsaW5rLWRldmljZScpLFxufTtcblxuY29uc3QgcGVybXV0YXRpb25zID0gW1xuICB7XG4gICAgdGl0bGU6ICdVbmxpbmtlZCAod2lkZSBjb250YWluZXIpJyxcbiAgICBwcm9wczoge1xuICAgICAgY29udGFpbmVyV2lkdGhCcmVha3BvaW50OiBXaWR0aEJyZWFrcG9pbnQuV2lkZSxcbiAgICAgIGlzUmVnaXN0cmF0aW9uRG9uZTogZmFsc2UsXG4gICAgfSxcbiAgfSxcbiAge1xuICAgIHRpdGxlOiAnVW5saW5rZWQgKG5hcnJvdyBjb250YWluZXIpJyxcbiAgICBwcm9wczoge1xuICAgICAgY29udGFpbmVyV2lkdGhCcmVha3BvaW50OiBXaWR0aEJyZWFrcG9pbnQuTmFycm93LFxuICAgICAgaXNSZWdpc3RyYXRpb25Eb25lOiBmYWxzZSxcbiAgICB9LFxuICB9LFxuXTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICB0aXRsZTogJ0NvbXBvbmVudHMvRGlhbG9nUmVsaW5rJyxcbn07XG5cbmV4cG9ydCBjb25zdCBLbm9ic1BsYXlncm91bmQgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBpc1JlZ2lzdHJhdGlvbkRvbmUgPSBib29sZWFuKCdpc1JlZ2lzdHJhdGlvbkRvbmUnLCBmYWxzZSk7XG5cbiAgcmV0dXJuIChcbiAgICA8RGlhbG9nUmVsaW5rIHsuLi5kZWZhdWx0UHJvcHN9IGlzUmVnaXN0cmF0aW9uRG9uZT17aXNSZWdpc3RyYXRpb25Eb25lfSAvPlxuICApO1xufTtcblxuZXhwb3J0IGNvbnN0IEl0ZXJhdGlvbnMgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICByZXR1cm4gKFxuICAgIDw+XG4gICAgICB7cGVybXV0YXRpb25zLm1hcCgoeyBwcm9wcywgdGl0bGUgfSkgPT4gKFxuICAgICAgICA8PlxuICAgICAgICAgIDxoMz57dGl0bGV9PC9oMz5cbiAgICAgICAgICA8RmFrZUxlZnRQYW5lQ29udGFpbmVyXG4gICAgICAgICAgICBjb250YWluZXJXaWR0aEJyZWFrcG9pbnQ9e3Byb3BzLmNvbnRhaW5lcldpZHRoQnJlYWtwb2ludH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8RGlhbG9nUmVsaW5rIHsuLi5kZWZhdWx0UHJvcHN9IHsuLi5wcm9wc30gLz5cbiAgICAgICAgICA8L0Zha2VMZWZ0UGFuZUNvbnRhaW5lcj5cbiAgICAgICAgPC8+XG4gICAgICApKX1cbiAgICA8Lz5cbiAgKTtcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLFlBQXVCO0FBQ3ZCLHlCQUF3QjtBQUN4QiwyQkFBdUI7QUFFdkIsMEJBQTZCO0FBQzdCLHVCQUEwQjtBQUMxQixzQkFBdUI7QUFDdkIsa0JBQWdDO0FBQ2hDLG1DQUFzQztBQUV0QyxNQUFNLE9BQU8sZ0NBQVUsTUFBTSx1QkFBVTtBQUV2QyxNQUFNLGVBQWU7QUFBQSxFQUNuQiwwQkFBMEIsNEJBQWdCO0FBQUEsRUFDMUM7QUFBQSxFQUNBLG9CQUFvQjtBQUFBLEVBQ3BCLGNBQWMsaUNBQU8sZUFBZTtBQUN0QztBQUVBLE1BQU0sZUFBZTtBQUFBLEVBQ25CO0FBQUEsSUFDRSxPQUFPO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCwwQkFBMEIsNEJBQWdCO0FBQUEsTUFDMUMsb0JBQW9CO0FBQUEsSUFDdEI7QUFBQSxFQUNGO0FBQUEsRUFDQTtBQUFBLElBQ0UsT0FBTztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsMEJBQTBCLDRCQUFnQjtBQUFBLE1BQzFDLG9CQUFvQjtBQUFBLElBQ3RCO0FBQUEsRUFDRjtBQUNGO0FBRUEsSUFBTywrQkFBUTtBQUFBLEVBQ2IsT0FBTztBQUNUO0FBRU8sTUFBTSxrQkFBa0IsNkJBQW1CO0FBQ2hELFFBQU0scUJBQXFCLGdDQUFRLHNCQUFzQixLQUFLO0FBRTlELFNBQ0Usb0NBQUM7QUFBQSxPQUFpQjtBQUFBLElBQWM7QUFBQSxHQUF3QztBQUU1RSxHQU4rQjtBQVF4QixNQUFNLGFBQWEsNkJBQW1CO0FBQzNDLFNBQ0UsMERBQ0csYUFBYSxJQUFJLENBQUMsRUFBRSxPQUFPLFlBQzFCLDBEQUNFLG9DQUFDLFlBQUksS0FBTSxHQUNYLG9DQUFDO0FBQUEsSUFDQywwQkFBMEIsTUFBTTtBQUFBLEtBRWhDLG9DQUFDO0FBQUEsT0FBaUI7QUFBQSxPQUFrQjtBQUFBLEdBQU8sQ0FDN0MsQ0FDRixDQUNELENBQ0g7QUFFSixHQWYwQjsiLAogICJuYW1lcyI6IFtdCn0K
