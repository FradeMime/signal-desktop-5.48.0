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
var BadgeDialog_stories_exports = {};
__export(BadgeDialog_stories_exports, {
  BadgeWithNoImageShouldBeImpossible: () => BadgeWithNoImageShouldBeImpossible,
  BadgeWithOnlyOneLowDetailImage: () => BadgeWithOnlyOneLowDetailImage,
  BadgeWithPendingImage: () => BadgeWithPendingImage,
  FiveBadges: () => FiveBadges,
  ManyBadges: () => ManyBadges,
  ManyBadgesUserIsASubscriber: () => ManyBadgesUserIsASubscriber,
  NoBadgesClosedImmediately: () => NoBadgesClosedImmediately,
  OneBadge: () => OneBadge,
  default: () => BadgeDialog_stories_default
});
module.exports = __toCommonJS(BadgeDialog_stories_exports);
var import_react = __toESM(require("react"));
var import_addon_actions = require("@storybook/addon-actions");
var import_setupI18n = require("../util/setupI18n");
var import_messages = __toESM(require("../../_locales/en/messages.json"));
var import_getFakeBadge = require("../test-both/helpers/getFakeBadge");
var import_iterables = require("../util/iterables");
var import_BadgeImageTheme = require("../badges/BadgeImageTheme");
var import_BadgeDialog = require("./BadgeDialog");
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
var BadgeDialog_stories_default = {
  title: "Components/BadgeDialog"
};
const defaultProps = {
  areWeASubscriber: false,
  badges: (0, import_getFakeBadge.getFakeBadges)(3),
  firstName: "Alice",
  i18n,
  onClose: (0, import_addon_actions.action)("onClose"),
  title: "Alice Levine"
};
const NoBadgesClosedImmediately = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_BadgeDialog.BadgeDialog, {
  ...defaultProps,
  badges: []
}), "NoBadgesClosedImmediately");
NoBadgesClosedImmediately.story = {
  name: "No badges (closed immediately)"
};
const OneBadge = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_BadgeDialog.BadgeDialog, {
  ...defaultProps,
  badges: (0, import_getFakeBadge.getFakeBadges)(1)
}), "OneBadge");
OneBadge.story = {
  name: "One badge"
};
const BadgeWithNoImageShouldBeImpossible = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_BadgeDialog.BadgeDialog, {
  ...defaultProps,
  badges: [
    {
      ...(0, import_getFakeBadge.getFakeBadge)(),
      images: []
    }
  ]
}), "BadgeWithNoImageShouldBeImpossible");
BadgeWithNoImageShouldBeImpossible.story = {
  name: "Badge with no image (should be impossible)"
};
const BadgeWithPendingImage = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_BadgeDialog.BadgeDialog, {
  ...defaultProps,
  badges: [
    {
      ...(0, import_getFakeBadge.getFakeBadge)(),
      images: Array(4).fill((0, import_iterables.zipObject)(Object.values(import_BadgeImageTheme.BadgeImageTheme), (0, import_iterables.repeat)({ url: "https://example.com/ignored.svg" })))
    }
  ]
}), "BadgeWithPendingImage");
BadgeWithPendingImage.story = {
  name: "Badge with pending image"
};
const BadgeWithOnlyOneLowDetailImage = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_BadgeDialog.BadgeDialog, {
  ...defaultProps,
  badges: [
    {
      ...(0, import_getFakeBadge.getFakeBadge)(),
      images: [
        (0, import_iterables.zipObject)(Object.values(import_BadgeImageTheme.BadgeImageTheme), (0, import_iterables.repeat)({
          localPath: "/fixtures/orange-heart.svg",
          url: "https://example.com/ignored.svg"
        })),
        ...Array(3).fill((0, import_iterables.zipObject)(Object.values(import_BadgeImageTheme.BadgeImageTheme), (0, import_iterables.repeat)({ url: "https://example.com/ignored.svg" })))
      ]
    }
  ]
}), "BadgeWithOnlyOneLowDetailImage");
BadgeWithOnlyOneLowDetailImage.story = {
  name: "Badge with only one, low-detail image"
};
const FiveBadges = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_BadgeDialog.BadgeDialog, {
  ...defaultProps,
  badges: (0, import_getFakeBadge.getFakeBadges)(5)
}), "FiveBadges");
FiveBadges.story = {
  name: "Five badges"
};
const ManyBadges = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_BadgeDialog.BadgeDialog, {
  ...defaultProps,
  badges: (0, import_getFakeBadge.getFakeBadges)(50)
}), "ManyBadges");
ManyBadges.story = {
  name: "Many badges"
};
const ManyBadgesUserIsASubscriber = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_BadgeDialog.BadgeDialog, {
  ...defaultProps,
  areWeASubscriber: true,
  badges: (0, import_getFakeBadge.getFakeBadges)(50)
}), "ManyBadgesUserIsASubscriber");
ManyBadgesUserIsASubscriber.story = {
  name: "Many badges, user is a subscriber"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BadgeWithNoImageShouldBeImpossible,
  BadgeWithOnlyOneLowDetailImage,
  BadgeWithPendingImage,
  FiveBadges,
  ManyBadges,
  ManyBadgesUserIsASubscriber,
  NoBadgesClosedImmediately,
  OneBadge
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQmFkZ2VEaWFsb2cuc3Rvcmllcy50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHR5cGUgeyBDb21wb25lbnRQcm9wcyB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBhY3Rpb24gfSBmcm9tICdAc3Rvcnlib29rL2FkZG9uLWFjdGlvbnMnO1xuXG5pbXBvcnQgeyBzZXR1cEkxOG4gfSBmcm9tICcuLi91dGlsL3NldHVwSTE4bic7XG5pbXBvcnQgZW5NZXNzYWdlcyBmcm9tICcuLi8uLi9fbG9jYWxlcy9lbi9tZXNzYWdlcy5qc29uJztcbmltcG9ydCB7IGdldEZha2VCYWRnZSwgZ2V0RmFrZUJhZGdlcyB9IGZyb20gJy4uL3Rlc3QtYm90aC9oZWxwZXJzL2dldEZha2VCYWRnZSc7XG5pbXBvcnQgeyByZXBlYXQsIHppcE9iamVjdCB9IGZyb20gJy4uL3V0aWwvaXRlcmFibGVzJztcbmltcG9ydCB7IEJhZGdlSW1hZ2VUaGVtZSB9IGZyb20gJy4uL2JhZGdlcy9CYWRnZUltYWdlVGhlbWUnO1xuaW1wb3J0IHsgQmFkZ2VEaWFsb2cgfSBmcm9tICcuL0JhZGdlRGlhbG9nJztcblxuY29uc3QgaTE4biA9IHNldHVwSTE4bignZW4nLCBlbk1lc3NhZ2VzKTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICB0aXRsZTogJ0NvbXBvbmVudHMvQmFkZ2VEaWFsb2cnLFxufTtcblxuY29uc3QgZGVmYXVsdFByb3BzOiBDb21wb25lbnRQcm9wczx0eXBlb2YgQmFkZ2VEaWFsb2c+ID0ge1xuICBhcmVXZUFTdWJzY3JpYmVyOiBmYWxzZSxcbiAgYmFkZ2VzOiBnZXRGYWtlQmFkZ2VzKDMpLFxuICBmaXJzdE5hbWU6ICdBbGljZScsXG4gIGkxOG4sXG4gIG9uQ2xvc2U6IGFjdGlvbignb25DbG9zZScpLFxuICB0aXRsZTogJ0FsaWNlIExldmluZScsXG59O1xuXG5leHBvcnQgY29uc3QgTm9CYWRnZXNDbG9zZWRJbW1lZGlhdGVseSA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxCYWRnZURpYWxvZyB7Li4uZGVmYXVsdFByb3BzfSBiYWRnZXM9e1tdfSAvPlxuKTtcblxuTm9CYWRnZXNDbG9zZWRJbW1lZGlhdGVseS5zdG9yeSA9IHtcbiAgbmFtZTogJ05vIGJhZGdlcyAoY2xvc2VkIGltbWVkaWF0ZWx5KScsXG59O1xuXG5leHBvcnQgY29uc3QgT25lQmFkZ2UgPSAoKTogSlNYLkVsZW1lbnQgPT4gKFxuICA8QmFkZ2VEaWFsb2cgey4uLmRlZmF1bHRQcm9wc30gYmFkZ2VzPXtnZXRGYWtlQmFkZ2VzKDEpfSAvPlxuKTtcblxuT25lQmFkZ2Uuc3RvcnkgPSB7XG4gIG5hbWU6ICdPbmUgYmFkZ2UnLFxufTtcblxuZXhwb3J0IGNvbnN0IEJhZGdlV2l0aE5vSW1hZ2VTaG91bGRCZUltcG9zc2libGUgPSAoKTogSlNYLkVsZW1lbnQgPT4gKFxuICA8QmFkZ2VEaWFsb2dcbiAgICB7Li4uZGVmYXVsdFByb3BzfVxuICAgIGJhZGdlcz17W1xuICAgICAge1xuICAgICAgICAuLi5nZXRGYWtlQmFkZ2UoKSxcbiAgICAgICAgaW1hZ2VzOiBbXSxcbiAgICAgIH0sXG4gICAgXX1cbiAgLz5cbik7XG5cbkJhZGdlV2l0aE5vSW1hZ2VTaG91bGRCZUltcG9zc2libGUuc3RvcnkgPSB7XG4gIG5hbWU6ICdCYWRnZSB3aXRoIG5vIGltYWdlIChzaG91bGQgYmUgaW1wb3NzaWJsZSknLFxufTtcblxuZXhwb3J0IGNvbnN0IEJhZGdlV2l0aFBlbmRpbmdJbWFnZSA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxCYWRnZURpYWxvZ1xuICAgIHsuLi5kZWZhdWx0UHJvcHN9XG4gICAgYmFkZ2VzPXtbXG4gICAgICB7XG4gICAgICAgIC4uLmdldEZha2VCYWRnZSgpLFxuICAgICAgICBpbWFnZXM6IEFycmF5KDQpLmZpbGwoXG4gICAgICAgICAgemlwT2JqZWN0KFxuICAgICAgICAgICAgT2JqZWN0LnZhbHVlcyhCYWRnZUltYWdlVGhlbWUpLFxuICAgICAgICAgICAgcmVwZWF0KHsgdXJsOiAnaHR0cHM6Ly9leGFtcGxlLmNvbS9pZ25vcmVkLnN2ZycgfSlcbiAgICAgICAgICApXG4gICAgICAgICksXG4gICAgICB9LFxuICAgIF19XG4gIC8+XG4pO1xuXG5CYWRnZVdpdGhQZW5kaW5nSW1hZ2Uuc3RvcnkgPSB7XG4gIG5hbWU6ICdCYWRnZSB3aXRoIHBlbmRpbmcgaW1hZ2UnLFxufTtcblxuZXhwb3J0IGNvbnN0IEJhZGdlV2l0aE9ubHlPbmVMb3dEZXRhaWxJbWFnZSA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxCYWRnZURpYWxvZ1xuICAgIHsuLi5kZWZhdWx0UHJvcHN9XG4gICAgYmFkZ2VzPXtbXG4gICAgICB7XG4gICAgICAgIC4uLmdldEZha2VCYWRnZSgpLFxuICAgICAgICBpbWFnZXM6IFtcbiAgICAgICAgICB6aXBPYmplY3QoXG4gICAgICAgICAgICBPYmplY3QudmFsdWVzKEJhZGdlSW1hZ2VUaGVtZSksXG4gICAgICAgICAgICByZXBlYXQoe1xuICAgICAgICAgICAgICBsb2NhbFBhdGg6ICcvZml4dHVyZXMvb3JhbmdlLWhlYXJ0LnN2ZycsXG4gICAgICAgICAgICAgIHVybDogJ2h0dHBzOi8vZXhhbXBsZS5jb20vaWdub3JlZC5zdmcnLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICApLFxuICAgICAgICAgIC4uLkFycmF5KDMpLmZpbGwoXG4gICAgICAgICAgICB6aXBPYmplY3QoXG4gICAgICAgICAgICAgIE9iamVjdC52YWx1ZXMoQmFkZ2VJbWFnZVRoZW1lKSxcbiAgICAgICAgICAgICAgcmVwZWF0KHsgdXJsOiAnaHR0cHM6Ly9leGFtcGxlLmNvbS9pZ25vcmVkLnN2ZycgfSlcbiAgICAgICAgICAgIClcbiAgICAgICAgICApLFxuICAgICAgICBdLFxuICAgICAgfSxcbiAgICBdfVxuICAvPlxuKTtcblxuQmFkZ2VXaXRoT25seU9uZUxvd0RldGFpbEltYWdlLnN0b3J5ID0ge1xuICBuYW1lOiAnQmFkZ2Ugd2l0aCBvbmx5IG9uZSwgbG93LWRldGFpbCBpbWFnZScsXG59O1xuXG5leHBvcnQgY29uc3QgRml2ZUJhZGdlcyA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxCYWRnZURpYWxvZyB7Li4uZGVmYXVsdFByb3BzfSBiYWRnZXM9e2dldEZha2VCYWRnZXMoNSl9IC8+XG4pO1xuXG5GaXZlQmFkZ2VzLnN0b3J5ID0ge1xuICBuYW1lOiAnRml2ZSBiYWRnZXMnLFxufTtcblxuZXhwb3J0IGNvbnN0IE1hbnlCYWRnZXMgPSAoKTogSlNYLkVsZW1lbnQgPT4gKFxuICA8QmFkZ2VEaWFsb2cgey4uLmRlZmF1bHRQcm9wc30gYmFkZ2VzPXtnZXRGYWtlQmFkZ2VzKDUwKX0gLz5cbik7XG5cbk1hbnlCYWRnZXMuc3RvcnkgPSB7XG4gIG5hbWU6ICdNYW55IGJhZGdlcycsXG59O1xuXG5leHBvcnQgY29uc3QgTWFueUJhZGdlc1VzZXJJc0FTdWJzY3JpYmVyID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPEJhZGdlRGlhbG9nIHsuLi5kZWZhdWx0UHJvcHN9IGFyZVdlQVN1YnNjcmliZXIgYmFkZ2VzPXtnZXRGYWtlQmFkZ2VzKDUwKX0gLz5cbik7XG5cbk1hbnlCYWRnZXNVc2VySXNBU3Vic2NyaWJlci5zdG9yeSA9IHtcbiAgbmFtZTogJ01hbnkgYmFkZ2VzLCB1c2VyIGlzIGEgc3Vic2NyaWJlcicsXG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFJQSxtQkFBa0I7QUFDbEIsMkJBQXVCO0FBRXZCLHVCQUEwQjtBQUMxQixzQkFBdUI7QUFDdkIsMEJBQTRDO0FBQzVDLHVC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
