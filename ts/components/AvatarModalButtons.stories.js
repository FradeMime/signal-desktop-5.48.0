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
var AvatarModalButtons_stories_exports = {};
__export(AvatarModalButtons_stories_exports, {
  HasChanges: () => HasChanges,
  NoChanges: () => NoChanges,
  default: () => AvatarModalButtons_stories_default
});
module.exports = __toCommonJS(AvatarModalButtons_stories_exports);
var import_react = __toESM(require("react"));
var import_addon_actions = require("@storybook/addon-actions");
var import_messages = __toESM(require("../../_locales/en/messages.json"));
var import_AvatarModalButtons = require("./AvatarModalButtons");
var import_setupI18n = require("../util/setupI18n");
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
const createProps = /* @__PURE__ */ __name((overrideProps = {}) => ({
  hasChanges: Boolean(overrideProps.hasChanges),
  i18n,
  onCancel: (0, import_addon_actions.action)("onCancel"),
  onSave: (0, import_addon_actions.action)("onSave")
}), "createProps");
var AvatarModalButtons_stories_default = {
  title: "Components/AvatarModalButtons"
};
const HasChanges = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_AvatarModalButtons.AvatarModalButtons, {
  ...createProps({
    hasChanges: true
  })
}), "HasChanges");
HasChanges.story = {
  name: "Has changes"
};
const NoChanges = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_AvatarModalButtons.AvatarModalButtons, {
  ...createProps()
}), "NoChanges");
NoChanges.story = {
  name: "No changes"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  HasChanges,
  NoChanges
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQXZhdGFyTW9kYWxCdXR0b25zLnN0b3JpZXMudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IGFjdGlvbiB9IGZyb20gJ0BzdG9yeWJvb2svYWRkb24tYWN0aW9ucyc7XG5cbmltcG9ydCBlbk1lc3NhZ2VzIGZyb20gJy4uLy4uL19sb2NhbGVzL2VuL21lc3NhZ2VzLmpzb24nO1xuaW1wb3J0IHR5cGUgeyBQcm9wc1R5cGUgfSBmcm9tICcuL0F2YXRhck1vZGFsQnV0dG9ucyc7XG5pbXBvcnQgeyBBdmF0YXJNb2RhbEJ1dHRvbnMgfSBmcm9tICcuL0F2YXRhck1vZGFsQnV0dG9ucyc7XG5pbXBvcnQgeyBzZXR1cEkxOG4gfSBmcm9tICcuLi91dGlsL3NldHVwSTE4bic7XG5cbmNvbnN0IGkxOG4gPSBzZXR1cEkxOG4oJ2VuJywgZW5NZXNzYWdlcyk7XG5cbmNvbnN0IGNyZWF0ZVByb3BzID0gKG92ZXJyaWRlUHJvcHM6IFBhcnRpYWw8UHJvcHNUeXBlPiA9IHt9KTogUHJvcHNUeXBlID0+ICh7XG4gIGhhc0NoYW5nZXM6IEJvb2xlYW4ob3ZlcnJpZGVQcm9wcy5oYXNDaGFuZ2VzKSxcbiAgaTE4bixcbiAgb25DYW5jZWw6IGFjdGlvbignb25DYW5jZWwnKSxcbiAgb25TYXZlOiBhY3Rpb24oJ29uU2F2ZScpLFxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgdGl0bGU6ICdDb21wb25lbnRzL0F2YXRhck1vZGFsQnV0dG9ucycsXG59O1xuXG5leHBvcnQgY29uc3QgSGFzQ2hhbmdlcyA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxBdmF0YXJNb2RhbEJ1dHRvbnNcbiAgICB7Li4uY3JlYXRlUHJvcHMoe1xuICAgICAgaGFzQ2hhbmdlczogdHJ1ZSxcbiAgICB9KX1cbiAgLz5cbik7XG5cbkhhc0NoYW5nZXMuc3RvcnkgPSB7XG4gIG5hbWU6ICdIYXMgY2hhbmdlcycsXG59O1xuXG5leHBvcnQgY29uc3QgTm9DaGFuZ2VzID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPEF2YXRhck1vZGFsQnV0dG9ucyB7Li4uY3JlYXRlUHJvcHMoKX0gLz5cbik7XG5cbk5vQ2hhbmdlcy5zdG9yeSA9IHtcbiAgbmFtZTogJ05vIGNoYW5nZXMnLFxufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsbUJBQWtCO0FBRWxCLDJCQUF1QjtBQUV2QixzQkFBdUI7QUFFdkIsZ0NBQW1DO0FBQ25DLHVCQUEwQjtBQUUxQixNQUFNLE9BQU8sZ0NBQVUsTUFBTSx1QkFBVTtBQUV2QyxNQUFNLGNBQWMsd0JBQUMsZ0JBQW9DLENBQUMsTUFBa0I7QUFBQSxFQUMxRSxZQUFZLFFBQVEsY0FBYyxVQUFVO0FBQUEsRUFDNUM7QUFBQSxFQUNBLFVBQVUsaUNBQU8sVUFBVTtBQUFBLEVBQzNCLFFBQVEsaUNBQU8sUUFBUTtBQUN6QixJQUxvQjtBQU9wQixJQUFPLHFDQUFRO0FBQUEsRUFDYixPQUFPO0FBQ1Q7QUFFTyxNQUFNLGFBQWEsNkJBQ3hCLG1EQUFDO0FBQUEsS0FDSyxZQUFZO0FBQUEsSUFDZCxZQUFZO0FBQUEsRUFDZCxDQUFDO0FBQUEsQ0FDSCxHQUx3QjtBQVExQixXQUFXLFFBQVE7QUFBQSxFQUNqQixNQUFNO0FBQ1I7QUFFTyxNQUFNLFlBQVksNkJBQ3ZCLG1EQUFDO0FBQUEsS0FBdUIsWUFBWTtBQUFBLENBQUcsR0FEaEI7QUFJekIsVUFBVSxRQUFRO0FBQUEsRUFDaEIsTUFBTTtBQUNSOyIsCiAgIm5hbWVzIjogW10KfQo=
