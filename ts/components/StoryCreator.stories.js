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
var StoryCreator_stories_exports = {};
__export(StoryCreator_stories_exports, {
  Default: () => Default,
  LinkPreview: () => LinkPreview,
  default: () => StoryCreator_stories_default
});
module.exports = __toCommonJS(StoryCreator_stories_exports);
var import_react = __toESM(require("react"));
var import_addon_actions = require("@storybook/addon-actions");
var import_messages = __toESM(require("../../_locales/en/messages.json"));
var import_StoryCreator = require("./StoryCreator");
var import_fakeAttachment = require("../test-both/helpers/fakeAttachment");
var import_setupI18n = require("../util/setupI18n");
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
var StoryCreator_stories_default = {
  title: "Components/StoryCreator",
  component: import_StoryCreator.StoryCreator
};
const getDefaultProps = /* @__PURE__ */ __name(() => ({
  debouncedMaybeGrabLinkPreview: (0, import_addon_actions.action)("debouncedMaybeGrabLinkPreview"),
  i18n,
  onClose: (0, import_addon_actions.action)("onClose"),
  onNext: (0, import_addon_actions.action)("onNext")
}), "getDefaultProps");
const Template = /* @__PURE__ */ __name((args) => /* @__PURE__ */ import_react.default.createElement(import_StoryCreator.StoryCreator, {
  ...args
}), "Template");
const Default = Template.bind({});
Default.args = getDefaultProps();
Default.story = {
  name: "w/o Link Preview available"
};
const LinkPreview = Template.bind({});
LinkPreview.args = {
  ...getDefaultProps(),
  linkPreview: {
    domain: "www.catsandkittens.lolcats",
    image: (0, import_fakeAttachment.fakeAttachment)({
      url: "/fixtures/kitten-4-112-112.jpg"
    }),
    title: "Cats & Kittens LOL",
    url: "https://www.catsandkittens.lolcats/kittens/page/1"
  }
};
LinkPreview.story = {
  name: "with Link Preview ready to be applied"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Default,
  LinkPreview
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiU3RvcnlDcmVhdG9yLnN0b3JpZXMudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB0eXBlIHsgTWV0YSwgU3RvcnkgfSBmcm9tICdAc3Rvcnlib29rL3JlYWN0JztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBhY3Rpb24gfSBmcm9tICdAc3Rvcnlib29rL2FkZG9uLWFjdGlvbnMnO1xuXG5pbXBvcnQgdHlwZSB7IFByb3BzVHlwZSB9IGZyb20gJy4vU3RvcnlDcmVhdG9yJztcbmltcG9ydCBlbk1lc3NhZ2VzIGZyb20gJy4uLy4uL19sb2NhbGVzL2VuL21lc3NhZ2VzLmpzb24nO1xuaW1wb3J0IHsgU3RvcnlDcmVhdG9yIH0gZnJvbSAnLi9TdG9yeUNyZWF0b3InO1xuaW1wb3J0IHsgZmFrZUF0dGFjaG1lbnQgfSBmcm9tICcuLi90ZXN0LWJvdGgvaGVscGVycy9mYWtlQXR0YWNobWVudCc7XG5pbXBvcnQgeyBzZXR1cEkxOG4gfSBmcm9tICcuLi91dGlsL3NldHVwSTE4bic7XG5cbmNvbnN0IGkxOG4gPSBzZXR1cEkxOG4oJ2VuJywgZW5NZXNzYWdlcyk7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgdGl0bGU6ICdDb21wb25lbnRzL1N0b3J5Q3JlYXRvcicsXG4gIGNvbXBvbmVudDogU3RvcnlDcmVhdG9yLFxufSBhcyBNZXRhO1xuXG5jb25zdCBnZXREZWZhdWx0UHJvcHMgPSAoKTogUHJvcHNUeXBlID0+ICh7XG4gIGRlYm91bmNlZE1heWJlR3JhYkxpbmtQcmV2aWV3OiBhY3Rpb24oJ2RlYm91bmNlZE1heWJlR3JhYkxpbmtQcmV2aWV3JyksXG4gIGkxOG4sXG4gIG9uQ2xvc2U6IGFjdGlvbignb25DbG9zZScpLFxuICBvbk5leHQ6IGFjdGlvbignb25OZXh0JyksXG59KTtcblxuY29uc3QgVGVtcGxhdGU6IFN0b3J5PFByb3BzVHlwZT4gPSBhcmdzID0+IDxTdG9yeUNyZWF0b3Igey4uLmFyZ3N9IC8+O1xuXG5leHBvcnQgY29uc3QgRGVmYXVsdCA9IFRlbXBsYXRlLmJpbmQoe30pO1xuRGVmYXVsdC5hcmdzID0gZ2V0RGVmYXVsdFByb3BzKCk7XG5EZWZhdWx0LnN0b3J5ID0ge1xuICBuYW1lOiAndy9vIExpbmsgUHJldmlldyBhdmFpbGFibGUnLFxufTtcblxuZXhwb3J0IGNvbnN0IExpbmtQcmV2aWV3ID0gVGVtcGxhdGUuYmluZCh7fSk7XG5MaW5rUHJldmlldy5hcmdzID0ge1xuICAuLi5nZXREZWZhdWx0UHJvcHMoKSxcbiAgbGlua1ByZXZpZXc6IHtcbiAgICBkb21haW46ICd3d3cuY2F0c2FuZGtpdHRlbnMubG9sY2F0cycsXG4gICAgaW1hZ2U6IGZha2VBdHRhY2htZW50KHtcbiAgICAgIHVybDogJy9maXh0dXJlcy9raXR0ZW4tNC0xMTItMTEyLmpwZycsXG4gICAgfSksXG4gICAgdGl0bGU6ICdDYXRzICYgS2l0dGVucyBMT0wnLFxuICAgIHVybDogJ2h0dHBzOi8vd3d3LmNhdHNhbmRraXR0ZW5zLmxvbGNhdHMva2l0dGVucy9wYWdlLzEnLFxuICB9LFxufTtcbkxpbmtQcmV2aWV3LnN0b3J5ID0ge1xuICBuYW1lOiAnd2l0aCBMaW5rIFByZXZpZXcgcmVhZHkgdG8gYmUgYXBwbGllZCcsXG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFJQSxtQkFBa0I7QUFDbEIsMkJBQXVCO0FBR3ZCLHNCQUF1QjtBQUN2QiwwQkFBNkI7QUFDN0IsNEJBQStCO0FBQy9CLHVCQUEwQjtBQUUxQixNQUFNLE9BQU8sZ0NBQVUsTUFBTSx1QkFBVTtBQUV2QyxJQUFPLCtCQUFRO0FBQUEsRUFDYixPQUFPO0FBQUEsRUFDUCxXQUFXO0FBQ2I7QUFFQSxNQUFNLGtCQUFrQiw2QkFBa0I7QUFBQSxFQUN4QywrQkFBK0IsaUNBQU8sK0JBQStCO0FBQUEsRUFDckU7QUFBQSxFQUNBLFNBQVMsaUNBQU8sU0FBUztBQUFBLEVBQ3pCLFFBQVEsaUNBQU8sUUFBUTtBQUN6QixJQUx3QjtBQU94QixNQUFNLFdBQTZCLGlDQUFRLG1EQUFDO0FBQUEsS0FBaUI7QUFBQSxDQUFNLEdBQWhDO0FBRTVCLE1BQU0sVUFBVSxTQUFTLEtBQUssQ0FBQyxDQUFDO0FBQ3ZDLFFBQVEsT0FBTyxnQkFBZ0I7QUFDL0IsUUFBUSxRQUFRO0FBQUEsRUFDZCxNQUFNO0FBQ1I7QUFFTyxNQUFNLGNBQWMsU0FBUyxLQUFLLENBQUMsQ0FBQztBQUMzQyxZQUFZLE9BQU87QUFBQSxLQUNkLGdCQUFnQjtBQUFBLEVBQ25CLGFBQWE7QUFBQSxJQUNYLFFBQVE7QUFBQSxJQUNSLE9BQU8sMENBQWU7QUFBQSxNQUNwQixLQUFLO0FBQUEsSUFDUCxDQUFDO0FBQUEsSUFDRCxPQUFPO0FBQUEsSUFDUCxLQUFLO0FBQUEsRUFDUDtBQUNGO0FBQ0EsWUFBWSxRQUFRO0FBQUEsRUFDbEIsTUFBTTtBQUNSOyIsCiAgIm5hbWVzIjogW10KfQo=
