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
var MediaQualitySelector_stories_exports = {};
__export(MediaQualitySelector_stories_exports, {
  HighQuality: () => HighQuality,
  StandardQuality: () => StandardQuality,
  default: () => MediaQualitySelector_stories_default
});
module.exports = __toCommonJS(MediaQualitySelector_stories_exports);
var import_react = __toESM(require("react"));
var import_addon_actions = require("@storybook/addon-actions");
var import_addon_knobs = require("@storybook/addon-knobs");
var import_messages = __toESM(require("../../_locales/en/messages.json"));
var import_MediaQualitySelector = require("./MediaQualitySelector");
var import_setupI18n = require("../util/setupI18n");
var MediaQualitySelector_stories_default = {
  title: "Components/MediaQualitySelector"
};
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
const createProps = /* @__PURE__ */ __name((overrideProps = {}) => ({
  i18n,
  isHighQuality: (0, import_addon_knobs.boolean)("isHighQuality", Boolean(overrideProps.isHighQuality)),
  onSelectQuality: (0, import_addon_actions.action)("onSelectQuality")
}), "createProps");
const StandardQuality = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_MediaQualitySelector.MediaQualitySelector, {
  ...createProps()
}), "StandardQuality");
const HighQuality = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_MediaQualitySelector.MediaQualitySelector, {
  ...createProps({
    isHighQuality: true
  })
}), "HighQuality");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  HighQuality,
  StandardQuality
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiTWVkaWFRdWFsaXR5U2VsZWN0b3Iuc3Rvcmllcy50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgYWN0aW9uIH0gZnJvbSAnQHN0b3J5Ym9vay9hZGRvbi1hY3Rpb25zJztcbmltcG9ydCB7IGJvb2xlYW4gfSBmcm9tICdAc3Rvcnlib29rL2FkZG9uLWtub2JzJztcblxuaW1wb3J0IGVuTWVzc2FnZXMgZnJvbSAnLi4vLi4vX2xvY2FsZXMvZW4vbWVzc2FnZXMuanNvbic7XG5pbXBvcnQgdHlwZSB7IFByb3BzVHlwZSB9IGZyb20gJy4vTWVkaWFRdWFsaXR5U2VsZWN0b3InO1xuaW1wb3J0IHsgTWVkaWFRdWFsaXR5U2VsZWN0b3IgfSBmcm9tICcuL01lZGlhUXVhbGl0eVNlbGVjdG9yJztcbmltcG9ydCB7IHNldHVwSTE4biB9IGZyb20gJy4uL3V0aWwvc2V0dXBJMThuJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICB0aXRsZTogJ0NvbXBvbmVudHMvTWVkaWFRdWFsaXR5U2VsZWN0b3InLFxufTtcblxuY29uc3QgaTE4biA9IHNldHVwSTE4bignZW4nLCBlbk1lc3NhZ2VzKTtcblxuY29uc3QgY3JlYXRlUHJvcHMgPSAob3ZlcnJpZGVQcm9wczogUGFydGlhbDxQcm9wc1R5cGU+ID0ge30pOiBQcm9wc1R5cGUgPT4gKHtcbiAgaTE4bixcbiAgaXNIaWdoUXVhbGl0eTogYm9vbGVhbignaXNIaWdoUXVhbGl0eScsIEJvb2xlYW4ob3ZlcnJpZGVQcm9wcy5pc0hpZ2hRdWFsaXR5KSksXG4gIG9uU2VsZWN0UXVhbGl0eTogYWN0aW9uKCdvblNlbGVjdFF1YWxpdHknKSxcbn0pO1xuXG5leHBvcnQgY29uc3QgU3RhbmRhcmRRdWFsaXR5ID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPE1lZGlhUXVhbGl0eVNlbGVjdG9yIHsuLi5jcmVhdGVQcm9wcygpfSAvPlxuKTtcblxuZXhwb3J0IGNvbnN0IEhpZ2hRdWFsaXR5ID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPE1lZGlhUXVhbGl0eVNlbGVjdG9yXG4gICAgey4uLmNyZWF0ZVByb3BzKHtcbiAgICAgIGlzSGlnaFF1YWxpdHk6IHRydWUsXG4gICAgfSl9XG4gIC8+XG4pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxtQkFBa0I7QUFFbEIsMkJBQXVCO0FBQ3ZCLHlCQUF3QjtBQUV4QixzQkFBdUI7QUFFdkIsa0NBQXFDO0FBQ3JDLHVCQUEwQjtBQUUxQixJQUFPLHVDQUFRO0FBQUEsRUFDYixPQUFPO0FBQ1Q7QUFFQSxNQUFNLE9BQU8sZ0NBQVUsTUFBTSx1QkFBVTtBQUV2QyxNQUFNLGNBQWMsd0JBQUMsZ0JBQW9DLENBQUMsTUFBa0I7QUFBQSxFQUMxRTtBQUFBLEVBQ0EsZUFBZSxnQ0FBUSxpQkFBaUIsUUFBUSxjQUFjLGFBQWEsQ0FBQztBQUFBLEVBQzVFLGlCQUFpQixpQ0FBTyxpQkFBaUI7QUFDM0MsSUFKb0I7QUFNYixNQUFNLGtCQUFrQiw2QkFDN0IsbURBQUM7QUFBQSxLQUF5QixZQUFZO0FBQUEsQ0FBRyxHQURaO0FBSXhCLE1BQU0sY0FBYyw2QkFDekIsbURBQUM7QUFBQSxLQUNLLFlBQVk7QUFBQSxJQUNkLGVBQWU7QUFBQSxFQUNqQixDQUFDO0FBQUEsQ0FDSCxHQUx5QjsiLAogICJuYW1lcyI6IFtdCn0K
