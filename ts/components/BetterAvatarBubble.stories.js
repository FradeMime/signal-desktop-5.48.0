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
var BetterAvatarBubble_stories_exports = {};
__export(BetterAvatarBubble_stories_exports, {
  Children: () => Children,
  Selected: () => Selected,
  Style: () => Style,
  default: () => BetterAvatarBubble_stories_default
});
module.exports = __toCommonJS(BetterAvatarBubble_stories_exports);
var import_react = __toESM(require("react"));
var import_addon_actions = require("@storybook/addon-actions");
var import_messages = __toESM(require("../../_locales/en/messages.json"));
var import_Colors = require("../types/Colors");
var import_BetterAvatarBubble = require("./BetterAvatarBubble");
var import_setupI18n = require("../util/setupI18n");
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
const createProps = /* @__PURE__ */ __name((overrideProps = {}) => ({
  children: overrideProps.children,
  color: overrideProps.color,
  i18n,
  isSelected: Boolean(overrideProps.isSelected),
  onDelete: (0, import_addon_actions.action)("onDelete"),
  onSelect: (0, import_addon_actions.action)("onSelect"),
  style: overrideProps.style
}), "createProps");
var BetterAvatarBubble_stories_default = {
  title: "Components/BetterAvatarBubble"
};
const Children = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_BetterAvatarBubble.BetterAvatarBubble, {
  ...createProps({
    children: /* @__PURE__ */ import_react.default.createElement("div", null, "HI"),
    color: import_Colors.AvatarColors[8]
  })
}), "Children");
const Selected = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_BetterAvatarBubble.BetterAvatarBubble, {
  ...createProps({
    color: import_Colors.AvatarColors[1],
    isSelected: true
  })
}), "Selected");
const Style = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_BetterAvatarBubble.BetterAvatarBubble, {
  ...createProps({
    style: {
      height: 120,
      width: 120
    },
    color: import_Colors.AvatarColors[2]
  })
}), "Style");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Children,
  Selected,
  Style
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQmV0dGVyQXZhdGFyQnViYmxlLnN0b3JpZXMudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IGFjdGlvbiB9IGZyb20gJ0BzdG9yeWJvb2svYWRkb24tYWN0aW9ucyc7XG5cbmltcG9ydCBlbk1lc3NhZ2VzIGZyb20gJy4uLy4uL19sb2NhbGVzL2VuL21lc3NhZ2VzLmpzb24nO1xuaW1wb3J0IHsgQXZhdGFyQ29sb3JzIH0gZnJvbSAnLi4vdHlwZXMvQ29sb3JzJztcbmltcG9ydCB0eXBlIHsgUHJvcHNUeXBlIH0gZnJvbSAnLi9CZXR0ZXJBdmF0YXJCdWJibGUnO1xuaW1wb3J0IHsgQmV0dGVyQXZhdGFyQnViYmxlIH0gZnJvbSAnLi9CZXR0ZXJBdmF0YXJCdWJibGUnO1xuaW1wb3J0IHsgc2V0dXBJMThuIH0gZnJvbSAnLi4vdXRpbC9zZXR1cEkxOG4nO1xuXG5jb25zdCBpMThuID0gc2V0dXBJMThuKCdlbicsIGVuTWVzc2FnZXMpO1xuXG5jb25zdCBjcmVhdGVQcm9wcyA9IChvdmVycmlkZVByb3BzOiBQYXJ0aWFsPFByb3BzVHlwZT4gPSB7fSk6IFByb3BzVHlwZSA9PiAoe1xuICBjaGlsZHJlbjogb3ZlcnJpZGVQcm9wcy5jaGlsZHJlbixcbiAgY29sb3I6IG92ZXJyaWRlUHJvcHMuY29sb3IsXG4gIGkxOG4sXG4gIGlzU2VsZWN0ZWQ6IEJvb2xlYW4ob3ZlcnJpZGVQcm9wcy5pc1NlbGVjdGVkKSxcbiAgb25EZWxldGU6IGFjdGlvbignb25EZWxldGUnKSxcbiAgb25TZWxlY3Q6IGFjdGlvbignb25TZWxlY3QnKSxcbiAgc3R5bGU6IG92ZXJyaWRlUHJvcHMuc3R5bGUsXG59KTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICB0aXRsZTogJ0NvbXBvbmVudHMvQmV0dGVyQXZhdGFyQnViYmxlJyxcbn07XG5cbmV4cG9ydCBjb25zdCBDaGlsZHJlbiA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxCZXR0ZXJBdmF0YXJCdWJibGVcbiAgICB7Li4uY3JlYXRlUHJvcHMoe1xuICAgICAgY2hpbGRyZW46IDxkaXY+SEk8L2Rpdj4sXG4gICAgICBjb2xvcjogQXZhdGFyQ29sb3JzWzhdLFxuICAgIH0pfVxuICAvPlxuKTtcblxuZXhwb3J0IGNvbnN0IFNlbGVjdGVkID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPEJldHRlckF2YXRhckJ1YmJsZVxuICAgIHsuLi5jcmVhdGVQcm9wcyh7XG4gICAgICBjb2xvcjogQXZhdGFyQ29sb3JzWzFdLFxuICAgICAgaXNTZWxlY3RlZDogdHJ1ZSxcbiAgICB9KX1cbiAgLz5cbik7XG5cbmV4cG9ydCBjb25zdCBTdHlsZSA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxCZXR0ZXJBdmF0YXJCdWJibGVcbiAgICB7Li4uY3JlYXRlUHJvcHMoe1xuICAgICAgc3R5bGU6IHtcbiAgICAgICAgaGVpZ2h0OiAxMjAsXG4gICAgICAgIHdpZHRoOiAxMjAsXG4gICAgICB9LFxuICAgICAgY29sb3I6IEF2YXRhckNvbG9yc1syXSxcbiAgICB9KX1cbiAgLz5cbik7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsbUJBQWtCO0FBRWxCLDJCQUF1QjtBQUV2QixzQkFBdUI7QUFDdkIsb0JBQTZCO0FBRTdCLGdDQUFtQztBQUNuQyx1QkFBMEI7QUFFMUIsTUFBTSxPQUFPLGdDQUFVLE1BQU0sdUJBQVU7QUFFdkMsTUFBTSxjQUFjLHdCQUFDLGdCQUFvQyxDQUFDLE1BQWtCO0FBQUEsRUFDMUUsVUFBVSxjQUFjO0FBQUEsRUFDeEIsT0FBTyxjQUFjO0FBQUEsRUFDckI7QUFBQSxFQUNBLFlBQVksUUFBUSxjQUFjLFVBQVU7QUFBQSxFQUM1QyxVQUFVLGlDQUFPLFVBQVU7QUFBQSxFQUMzQixVQUFVLGlDQUFPLFVBQVU7QUFBQSxFQUMzQixPQUFPLGNBQWM7QUFDdkIsSUFSb0I7QUFVcEIsSUFBTyxxQ0FBUTtBQUFBLEVBQ2IsT0FBTztBQUNUO0FBRU8sTUFBTSxXQUFXLDZCQUN0QixtREFBQztBQUFBLEtBQ0ssWUFBWTtBQUFBLElBQ2QsVUFBVSxtREFBQyxhQUFJLElBQUU7QUFBQSxJQUNqQixPQUFPLDJCQUFhO0FBQUEsRUFDdEIsQ0FBQztBQUFBLENBQ0gsR0FOc0I7QUFTakIsTUFBTSxXQUFXLDZCQUN0QixtREFBQztBQUFBLEtBQ0ssWUFBWTtBQUFBLElBQ2QsT0FBTywyQkFBYTtBQUFBLElBQ3BCLFlBQVk7QUFBQSxFQUNkLENBQUM7QUFBQSxDQUNILEdBTnNCO0FBU2pCLE1BQU0sUUFBUSw2QkFDbkIsbURBQUM7QUFBQSxLQUNLLFlBQVk7QUFBQSxJQUNkLE9BQU87QUFBQSxNQUNMLFFBQVE7QUFBQSxNQUNSLE9BQU87QUFBQSxJQUNUO0FBQUEsSUFDQSxPQUFPLDJCQUFhO0FBQUEsRUFDdEIsQ0FBQztBQUFBLENBQ0gsR0FUbUI7IiwKICAibmFtZXMiOiBbXQp9Cg==
