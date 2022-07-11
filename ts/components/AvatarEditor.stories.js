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
var AvatarEditor_stories_exports = {};
__export(AvatarEditor_stories_exports, {
  HasAvatar: () => HasAvatar,
  NoAvatarGroup: () => NoAvatarGroup,
  NoAvatarMe: () => NoAvatarMe,
  default: () => AvatarEditor_stories_default
});
module.exports = __toCommonJS(AvatarEditor_stories_exports);
var import_react = __toESM(require("react"));
var import_addon_actions = require("@storybook/addon-actions");
var import_setupI18n = require("../util/setupI18n");
var import_messages = __toESM(require("../../_locales/en/messages.json"));
var import_Colors = require("../types/Colors");
var import_AvatarEditor = require("./AvatarEditor");
var import_Avatar = require("../types/Avatar");
var import_createAvatarData = require("../util/createAvatarData");
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
const createProps = /* @__PURE__ */ __name((overrideProps = {}) => ({
  avatarColor: overrideProps.avatarColor || import_Colors.AvatarColors[9],
  avatarPath: overrideProps.avatarPath,
  conversationId: "123",
  conversationTitle: overrideProps.conversationTitle || "Default Title",
  deleteAvatarFromDisk: (0, import_addon_actions.action)("deleteAvatarFromDisk"),
  i18n,
  isGroup: Boolean(overrideProps.isGroup),
  onCancel: (0, import_addon_actions.action)("onCancel"),
  onSave: (0, import_addon_actions.action)("onSave"),
  replaceAvatar: (0, import_addon_actions.action)("replaceAvatar"),
  saveAvatarToDisk: (0, import_addon_actions.action)("saveAvatarToDisk"),
  userAvatarData: overrideProps.userAvatarData || [
    (0, import_createAvatarData.createAvatarData)({
      imagePath: "/fixtures/kitten-3-64-64.jpg"
    }),
    (0, import_createAvatarData.createAvatarData)({
      color: "A110",
      text: "YA"
    }),
    (0, import_createAvatarData.createAvatarData)({
      color: "A120",
      text: "OK"
    }),
    (0, import_createAvatarData.createAvatarData)({
      color: "A130",
      text: "F"
    }),
    (0, import_createAvatarData.createAvatarData)({
      color: "A140",
      text: "\u{1F3C4}\u{1F4A3}"
    }),
    (0, import_createAvatarData.createAvatarData)({
      color: "A150",
      text: "\u{1F607}\u{1F643}\u{1F606}"
    }),
    (0, import_createAvatarData.createAvatarData)({
      color: "A160",
      text: "\u{1F98A}F\u{1F4A6}"
    }),
    (0, import_createAvatarData.createAvatarData)({
      color: "A170",
      text: "J"
    }),
    (0, import_createAvatarData.createAvatarData)({
      color: "A180",
      text: "ZAP"
    }),
    (0, import_createAvatarData.createAvatarData)({
      color: "A190",
      text: "\u{1F34D}P"
    }),
    (0, import_createAvatarData.createAvatarData)({
      color: "A200",
      text: "\u{1F335}"
    }),
    (0, import_createAvatarData.createAvatarData)({
      color: "A210",
      text: "NAP"
    })
  ]
}), "createProps");
var AvatarEditor_stories_default = {
  title: "Components/AvatarEditor"
};
const NoAvatarGroup = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_AvatarEditor.AvatarEditor, {
  ...createProps({ isGroup: true, userAvatarData: (0, import_Avatar.getDefaultAvatars)(true) })
}), "NoAvatarGroup");
NoAvatarGroup.story = {
  name: "No Avatar (group)"
};
const NoAvatarMe = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_AvatarEditor.AvatarEditor, {
  ...createProps({ userAvatarData: (0, import_Avatar.getDefaultAvatars)() })
}), "NoAvatarMe");
NoAvatarMe.story = {
  name: "No Avatar (me)"
};
const HasAvatar = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_AvatarEditor.AvatarEditor, {
  ...createProps({
    avatarPath: "/fixtures/kitten-3-64-64.jpg"
  })
}), "HasAvatar");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  HasAvatar,
  NoAvatarGroup,
  NoAvatarMe
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQXZhdGFyRWRpdG9yLnN0b3JpZXMudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IGFjdGlvbiB9IGZyb20gJ0BzdG9yeWJvb2svYWRkb24tYWN0aW9ucyc7XG5pbXBvcnQgeyBzZXR1cEkxOG4gfSBmcm9tICcuLi91dGlsL3NldHVwSTE4bic7XG5pbXBvcnQgZW5NZXNzYWdlcyBmcm9tICcuLi8uLi9fbG9jYWxlcy9lbi9tZXNzYWdlcy5qc29uJztcblxuaW1wb3J0IHsgQXZhdGFyQ29sb3JzIH0gZnJvbSAnLi4vdHlwZXMvQ29sb3JzJztcbmltcG9ydCB0eXBlIHsgUHJvcHNUeXBlIH0gZnJvbSAnLi9BdmF0YXJFZGl0b3InO1xuaW1wb3J0IHsgQXZhdGFyRWRpdG9yIH0gZnJvbSAnLi9BdmF0YXJFZGl0b3InO1xuaW1wb3J0IHsgZ2V0RGVmYXVsdEF2YXRhcnMgfSBmcm9tICcuLi90eXBlcy9BdmF0YXInO1xuaW1wb3J0IHsgY3JlYXRlQXZhdGFyRGF0YSB9IGZyb20gJy4uL3V0aWwvY3JlYXRlQXZhdGFyRGF0YSc7XG5cbmNvbnN0IGkxOG4gPSBzZXR1cEkxOG4oJ2VuJywgZW5NZXNzYWdlcyk7XG5cbmNvbnN0IGNyZWF0ZVByb3BzID0gKG92ZXJyaWRlUHJvcHM6IFBhcnRpYWw8UHJvcHNUeXBlPiA9IHt9KTogUHJvcHNUeXBlID0+ICh7XG4gIGF2YXRhckNvbG9yOiBvdmVycmlkZVByb3BzLmF2YXRhckNvbG9yIHx8IEF2YXRhckNvbG9yc1s5XSxcbiAgYXZhdGFyUGF0aDogb3ZlcnJpZGVQcm9wcy5hdmF0YXJQYXRoLFxuICBjb252ZXJzYXRpb25JZDogJzEyMycsXG4gIGNvbnZlcnNhdGlvblRpdGxlOiBvdmVycmlkZVByb3BzLmNvbnZlcnNhdGlvblRpdGxlIHx8ICdEZWZhdWx0IFRpdGxlJyxcbiAgZGVsZXRlQXZhdGFyRnJvbURpc2s6IGFjdGlvbignZGVsZXRlQXZhdGFyRnJvbURpc2snKSxcbiAgaTE4bixcbiAgaXNHcm91cDogQm9vbGVhbihvdmVycmlkZVByb3BzLmlzR3JvdXApLFxuICBvbkNhbmNlbDogYWN0aW9uKCdvbkNhbmNlbCcpLFxuICBvblNhdmU6IGFjdGlvbignb25TYXZlJyksXG4gIHJlcGxhY2VBdmF0YXI6IGFjdGlvbigncmVwbGFjZUF2YXRhcicpLFxuICBzYXZlQXZhdGFyVG9EaXNrOiBhY3Rpb24oJ3NhdmVBdmF0YXJUb0Rpc2snKSxcbiAgdXNlckF2YXRhckRhdGE6IG92ZXJyaWRlUHJvcHMudXNlckF2YXRhckRhdGEgfHwgW1xuICAgIGNyZWF0ZUF2YXRhckRhdGEoe1xuICAgICAgaW1hZ2VQYXRoOiAnL2ZpeHR1cmVzL2tpdHRlbi0zLTY0LTY0LmpwZycsXG4gICAgfSksXG4gICAgY3JlYXRlQXZhdGFyRGF0YSh7XG4gICAgICBjb2xvcjogJ0ExMTAnLFxuICAgICAgdGV4dDogJ1lBJyxcbiAgICB9KSxcbiAgICBjcmVhdGVBdmF0YXJEYXRhKHtcbiAgICAgIGNvbG9yOiAnQTEyMCcsXG4gICAgICB0ZXh0OiAnT0snLFxuICAgIH0pLFxuICAgIGNyZWF0ZUF2YXRhckRhdGEoe1xuICAgICAgY29sb3I6ICdBMTMwJyxcbiAgICAgIHRleHQ6ICdGJyxcbiAgICB9KSxcbiAgICBjcmVhdGVBdmF0YXJEYXRhKHtcbiAgICAgIGNvbG9yOiAnQTE0MCcsXG4gICAgICB0ZXh0OiAnXHVEODNDXHVERkM0XHVEODNEXHVEQ0EzJyxcbiAgICB9KSxcbiAgICBjcmVhdGVBdmF0YXJEYXRhKHtcbiAgICAgIGNvbG9yOiAnQTE1MCcsXG4gICAgICB0ZXh0OiAnXHVEODNEXHVERTA3XHVEODNEXHVERTQzXHVEODNEXHVERTA2JyxcbiAgICB9KSxcbiAgICBjcmVhdGVBdmF0YXJEYXRhKHtcbiAgICAgIGNvbG9yOiAnQTE2MCcsXG4gICAgICB0ZXh0OiAnXHVEODNFXHVERDhBRlx1RDgzRFx1RENBNicsXG4gICAgfSksXG4gICAgY3JlYXRlQXZhdGFyRGF0YSh7XG4gICAgICBjb2xvcjogJ0ExNzAnLFxuICAgICAgdGV4dDogJ0onLFxuICAgIH0pLFxuICAgIGNyZWF0ZUF2YXRhckRhdGEoe1xuICAgICAgY29sb3I6ICdBMTgwJyxcbiAgICAgIHRleHQ6ICdaQVAnLFxuICAgIH0pLFxuICAgIGNyZWF0ZUF2YXRhckRhdGEoe1xuICAgICAgY29sb3I6ICdBMTkwJyxcbiAgICAgIHRleHQ6ICdcdUQ4M0NcdURGNERQJyxcbiAgICB9KSxcbiAgICBjcmVhdGVBdmF0YXJEYXRhKHtcbiAgICAgIGNvbG9yOiAnQTIwMCcsXG4gICAgICB0ZXh0OiAnXHVEODNDXHVERjM1JyxcbiAgICB9KSxcbiAgICBjcmVhdGVBdmF0YXJEYXRhKHtcbiAgICAgIGNvbG9yOiAnQTIxMCcsXG4gICAgICB0ZXh0OiAnTkFQJyxcbiAgICB9KSxcbiAgXSxcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHRpdGxlOiAnQ29tcG9uZW50cy9BdmF0YXJFZGl0b3InLFxufTtcblxuZXhwb3J0IGNvbnN0IE5vQXZhdGFyR3JvdXAgPSAoKTogSlNYLkVsZW1lbnQgPT4gKFxuICA8QXZhdGFyRWRpdG9yXG4gICAgey4uLmNyZWF0ZVByb3BzKHsgaXNHcm91cDogdHJ1ZSwgdXNlckF2YXRhckRhdGE6IGdldERlZmF1bHRBdmF0YXJzKHRydWUpIH0pfVxuICAvPlxuKTtcblxuTm9BdmF0YXJHcm91cC5zdG9yeSA9IHtcbiAgbmFtZTogJ05vIEF2YXRhciAoZ3JvdXApJyxcbn07XG5cbmV4cG9ydCBjb25zdCBOb0F2YXRhck1lID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPEF2YXRhckVkaXRvciB7Li4uY3JlYXRlUHJvcHMoeyB1c2VyQXZhdGFyRGF0YTogZ2V0RGVmYXVsdEF2YXRhcnMoKSB9KX0gLz5cbik7XG5cbk5vQXZhdGFyTWUuc3RvcnkgPSB7XG4gIG5hbWU6ICdObyBBdmF0YXIgKG1lKScsXG59O1xuXG5leHBvcnQgY29uc3QgSGFzQXZhdGFyID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPEF2YXRhckVkaXRvclxuICAgIHsuLi5jcmVhdGVQcm9wcyh7XG4gICAgICBhdmF0YXJQYXRoOiAnL2ZpeHR1cmVzL2tpdHRlbi0zLTY0LTY0LmpwZycsXG4gICAgfSl9XG4gIC8+XG4pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLG1CQUFrQjtBQUVsQiwyQkFBdUI7QUFDdkIsdUJBQTBCO0FBQzFCLHNCQUF1QjtBQUV2QixvQkFBNkI7QUFFN0IsMEJBQTZCO0FBQzdCLG9CQUFrQztBQUNsQyw4QkFBaUM7QUFFakMsTUFBTSxPQUFPLGdDQUFVLE1BQU0sdUJBQVU7QUFFdkMsTUFBTSxjQUFjLHdCQUFDLGdCQUFvQyxDQUFDLE1BQWtCO0FBQUEsRUFDMUUsYUFBYSxjQUFjLGVBQWUsMkJBQWE7QUFBQSxFQUN2RCxZQUFZLGNBQWM7QUFBQSxFQUMxQixnQkFBZ0I7QUFBQSxFQUNoQixtQkFBbUIsY0FBYyxxQkFBcUI7QUFBQSxFQUN0RCxzQkFBc0IsaUNBQU8sc0JBQXNCO0FBQUEsRUFDbkQ7QUFBQSxFQUNBLFNBQVMsUUFBUSxjQUFjLE9BQU87QUFBQSxFQUN0QyxVQUFVLGlDQUFPLFVBQVU7QUFBQSxFQUMzQixRQUFRLGlDQUFPLFFBQVE7QUFBQSxFQUN2QixlQUFlLGlDQUFPLGVBQWU7QUFBQSxFQUNyQyxrQkFBa0IsaUNBQU8sa0JBQWtCO0FBQUEsRUFDM0MsZ0JBQWdCLGNBQWMsa0JBQWtCO0FBQUEsSUFDOUMsOENBQWlCO0FBQUEsTUFDZixXQUFXO0FBQUEsSUFDYixDQUFDO0FBQUEsSUFDRCw4Q0FBaUI7QUFBQSxNQUNmLE9BQU87QUFBQSxNQUNQLE1BQU07QUFBQSxJQUNSLENBQUM7QUFBQSxJQUNELDhDQUFpQjtBQUFBLE1BQ2YsT0FBTztBQUFBLE1BQ1AsTUFBTTtBQUFBLElBQ1IsQ0FBQztBQUFBLElBQ0QsOENBQWlCO0FBQUEsTUFDZixPQUFPO0FBQUEsTUFDUCxNQUFNO0FBQUEsSUFDUixDQUFDO0FBQUEsSUFDRCw4Q0FBaUI7QUFBQSxNQUNmLE9BQU87QUFBQSxNQUNQLE1BQU07QUFBQSxJQUNSLENBQUM7QUFBQSxJQUNELDhDQUFpQjtBQUFBLE1BQ2YsT0FBTztBQUFBLE1BQ1AsTUFBTTtBQUFBLElBQ1IsQ0FBQztBQUFBLElBQ0QsOENBQWlCO0FBQUEsTUFDZixPQUFPO0FBQUEsTUFDUCxNQUFNO0FBQUEsSUFDUixDQUFDO0FBQUEsSUFDRCw4Q0FBaUI7QUFBQSxNQUNmLE9BQU87QUFBQSxNQUNQLE1BQU07QUFBQSxJQUNSLENBQUM7QUFBQSxJQUNELDhDQUFpQjtBQUFBLE1BQ2YsT0FBTztBQUFBLE1BQ1AsTUFBTTtBQUFBLElBQ1IsQ0FBQztBQUFBLElBQ0QsOENBQWlCO0FBQUEsTUFDZixPQUFPO0FBQUEsTUFDUCxNQUFNO0FBQUEsSUFDUixDQUFDO0FBQUEsSUFDRCw4Q0FBaUI7QUFBQSxNQUNmLE9BQU87QUFBQSxNQUNQLE1BQU07QUFBQSxJQUNSLENBQUM7QUFBQSxJQUNELDhDQUFpQjtBQUFBLE1BQ2YsT0FBTztBQUFBLE1BQ1AsTUFBTTtBQUFBLElBQ1IsQ0FBQztBQUFBLEVBQ0g7QUFDRixJQTdEb0I7QUErRHBCLElBQU8sK0JBQVE7QUFBQSxFQUNiLE9BQU87QUFDVDtBQUVPLE1BQU0sZ0JBQWdCLDZCQUMzQixtREFBQztBQUFBLEtBQ0ssWUFBWSxFQUFFLFNBQVMsTUFBTSxnQkFBZ0IscUNBQWtCLElBQUksRUFBRSxDQUFDO0FBQUEsQ0FDNUUsR0FIMkI7QUFNN0IsY0FBYyxRQUFRO0FBQUEsRUFDcEIsTUFBTTtBQUNSO0FBRU8sTUFBTSxhQUFhLDZCQUN4QixtREFBQztBQUFBLEtBQWlCLFlBQVksRUFBRSxnQkFBZ0IscUNBQWtCLEVBQUUsQ0FBQztBQUFBLENBQUcsR0FEaEQ7QUFJMUIsV0FBVyxRQUFRO0FBQUEsRUFDakIsTUFBTTtBQUNSO0FBRU8sTUFBTSxZQUFZLDZCQUN2QixtREFBQztBQUFBLEtBQ0ssWUFBWTtBQUFBLElBQ2QsWUFBWTtBQUFBLEVBQ2QsQ0FBQztBQUFBLENBQ0gsR0FMdUI7IiwKICAibmFtZXMiOiBbXQp9Cg==
