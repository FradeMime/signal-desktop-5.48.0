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
var AvatarLightbox_stories_exports = {};
__export(AvatarLightbox_stories_exports, {
  Group: () => Group,
  Person: () => Person,
  Photo: () => Photo,
  default: () => AvatarLightbox_stories_default
});
module.exports = __toCommonJS(AvatarLightbox_stories_exports);
var import_react = __toESM(require("react"));
var import_addon_actions = require("@storybook/addon-actions");
var import_addon_knobs = require("@storybook/addon-knobs");
var import_messages = __toESM(require("../../_locales/en/messages.json"));
var import_Colors = require("../types/Colors");
var import_AvatarLightbox = require("./AvatarLightbox");
var import_setupI18n = require("../util/setupI18n");
var import_getDefaultConversation = require("../test-both/helpers/getDefaultConversation");
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
const createProps = /* @__PURE__ */ __name((overrideProps = {}) => ({
  avatarColor: (0, import_addon_knobs.select)("Color", import_Colors.AvatarColors, overrideProps.avatarColor || import_Colors.AvatarColors[0]),
  avatarPath: overrideProps.avatarPath,
  conversationTitle: overrideProps.conversationTitle,
  i18n,
  isGroup: Boolean(overrideProps.isGroup),
  onClose: (0, import_addon_actions.action)("onClose")
}), "createProps");
var AvatarLightbox_stories_default = {
  title: "Components/AvatarLightbox"
};
const Group = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_AvatarLightbox.AvatarLightbox, {
  ...createProps({
    isGroup: true
  })
}), "Group");
const Person = /* @__PURE__ */ __name(() => {
  const conversation = (0, import_getDefaultConversation.getDefaultConversation)();
  return /* @__PURE__ */ import_react.default.createElement(import_AvatarLightbox.AvatarLightbox, {
    ...createProps({
      avatarColor: conversation.color,
      conversationTitle: conversation.title
    })
  });
}, "Person");
const Photo = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_AvatarLightbox.AvatarLightbox, {
  ...createProps({
    avatarPath: "/fixtures/kitten-1-64-64.jpg"
  })
}), "Photo");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Group,
  Person,
  Photo
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQXZhdGFyTGlnaHRib3guc3Rvcmllcy50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgYWN0aW9uIH0gZnJvbSAnQHN0b3J5Ym9vay9hZGRvbi1hY3Rpb25zJztcbmltcG9ydCB7IHNlbGVjdCB9IGZyb20gJ0BzdG9yeWJvb2svYWRkb24ta25vYnMnO1xuXG5pbXBvcnQgZW5NZXNzYWdlcyBmcm9tICcuLi8uLi9fbG9jYWxlcy9lbi9tZXNzYWdlcy5qc29uJztcbmltcG9ydCB7IEF2YXRhckNvbG9ycyB9IGZyb20gJy4uL3R5cGVzL0NvbG9ycyc7XG5pbXBvcnQgdHlwZSB7IFByb3BzVHlwZSB9IGZyb20gJy4vQXZhdGFyTGlnaHRib3gnO1xuaW1wb3J0IHsgQXZhdGFyTGlnaHRib3ggfSBmcm9tICcuL0F2YXRhckxpZ2h0Ym94JztcbmltcG9ydCB7IHNldHVwSTE4biB9IGZyb20gJy4uL3V0aWwvc2V0dXBJMThuJztcbmltcG9ydCB7IGdldERlZmF1bHRDb252ZXJzYXRpb24gfSBmcm9tICcuLi90ZXN0LWJvdGgvaGVscGVycy9nZXREZWZhdWx0Q29udmVyc2F0aW9uJztcblxuY29uc3QgaTE4biA9IHNldHVwSTE4bignZW4nLCBlbk1lc3NhZ2VzKTtcblxuY29uc3QgY3JlYXRlUHJvcHMgPSAob3ZlcnJpZGVQcm9wczogUGFydGlhbDxQcm9wc1R5cGU+ID0ge30pOiBQcm9wc1R5cGUgPT4gKHtcbiAgYXZhdGFyQ29sb3I6IHNlbGVjdChcbiAgICAnQ29sb3InLFxuICAgIEF2YXRhckNvbG9ycyxcbiAgICBvdmVycmlkZVByb3BzLmF2YXRhckNvbG9yIHx8IEF2YXRhckNvbG9yc1swXVxuICApLFxuICBhdmF0YXJQYXRoOiBvdmVycmlkZVByb3BzLmF2YXRhclBhdGgsXG4gIGNvbnZlcnNhdGlvblRpdGxlOiBvdmVycmlkZVByb3BzLmNvbnZlcnNhdGlvblRpdGxlLFxuICBpMThuLFxuICBpc0dyb3VwOiBCb29sZWFuKG92ZXJyaWRlUHJvcHMuaXNHcm91cCksXG4gIG9uQ2xvc2U6IGFjdGlvbignb25DbG9zZScpLFxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgdGl0bGU6ICdDb21wb25lbnRzL0F2YXRhckxpZ2h0Ym94Jyxcbn07XG5cbmV4cG9ydCBjb25zdCBHcm91cCA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxBdmF0YXJMaWdodGJveFxuICAgIHsuLi5jcmVhdGVQcm9wcyh7XG4gICAgICBpc0dyb3VwOiB0cnVlLFxuICAgIH0pfVxuICAvPlxuKTtcblxuZXhwb3J0IGNvbnN0IFBlcnNvbiA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IGNvbnZlcnNhdGlvbiA9IGdldERlZmF1bHRDb252ZXJzYXRpb24oKTtcbiAgcmV0dXJuIChcbiAgICA8QXZhdGFyTGlnaHRib3hcbiAgICAgIHsuLi5jcmVhdGVQcm9wcyh7XG4gICAgICAgIGF2YXRhckNvbG9yOiBjb252ZXJzYXRpb24uY29sb3IsXG4gICAgICAgIGNvbnZlcnNhdGlvblRpdGxlOiBjb252ZXJzYXRpb24udGl0bGUsXG4gICAgICB9KX1cbiAgICAvPlxuICApO1xufTtcblxuZXhwb3J0IGNvbnN0IFBob3RvID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPEF2YXRhckxpZ2h0Ym94XG4gICAgey4uLmNyZWF0ZVByb3BzKHtcbiAgICAgIGF2YXRhclBhdGg6ICcvZml4dHVyZXMva2l0dGVuLTEtNjQtNjQuanBnJyxcbiAgICB9KX1cbiAgLz5cbik7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsbUJBQWtCO0FBRWxCLDJCQUF1QjtBQUN2Qix5QkFBdUI7QUFFdkIsc0JBQXVCO0FBQ3ZCLG9CQUE2QjtBQUU3Qiw0QkFBK0I7QUFDL0IsdUJBQTBCO0FBQzFCLG9DQUF1QztBQUV2QyxNQUFNLE9BQU8sZ0NBQVUsTUFBTSx1QkFBVTtBQUV2QyxNQUFNLGNBQWMsd0JBQUMsZ0JBQW9DLENBQUMsTUFBa0I7QUFBQSxFQUMxRSxhQUFhLCtCQUNYLFNBQ0EsNEJBQ0EsY0FBYyxlQUFlLDJCQUFhLEVBQzVDO0FBQUEsRUFDQSxZQUFZLGNBQWM7QUFBQSxFQUMxQixtQkFBbUIsY0FBYztBQUFBLEVBQ2pDO0FBQUEsRUFDQSxTQUFTLFFBQVEsY0FBYyxPQUFPO0FBQUEsRUFDdEMsU0FBUyxpQ0FBTyxTQUFTO0FBQzNCLElBWG9CO0FBYXBCLElBQU8saUNBQVE7QUFBQSxFQUNiLE9BQU87QUFDVDtBQUVPLE1BQU0sUUFBUSw2QkFDbkIsbURBQUM7QUFBQSxLQUNLLFlBQVk7QUFBQSxJQUNkLFNBQVM7QUFBQSxFQUNYLENBQUM7QUFBQSxDQUNILEdBTG1CO0FBUWQsTUFBTSxTQUFTLDZCQUFtQjtBQUN2QyxRQUFNLGVBQWUsMERBQXVCO0FBQzVDLFNBQ0UsbURBQUM7QUFBQSxPQUNLLFlBQVk7QUFBQSxNQUNkLGFBQWEsYUFBYTtBQUFBLE1BQzFCLG1CQUFtQixhQUFhO0FBQUEsSUFDbEMsQ0FBQztBQUFBLEdBQ0g7QUFFSixHQVZzQjtBQVlmLE1BQU0sUUFBUSw2QkFDbkIsbURBQUM7QUFBQSxLQUNLLFlBQVk7QUFBQSxJQUNkLFlBQVk7QUFBQSxFQUNkLENBQUM7QUFBQSxDQUNILEdBTG1COyIsCiAgIm5hbWVzIjogW10KfQo=
