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
var BetterAvatar_stories_exports = {};
__export(BetterAvatar_stories_exports, {
  GroupIcon: () => GroupIcon,
  PersonalIcon: () => PersonalIcon,
  Text: () => Text,
  default: () => BetterAvatar_stories_default
});
module.exports = __toCommonJS(BetterAvatar_stories_exports);
var import_react = __toESM(require("react"));
var import_addon_actions = require("@storybook/addon-actions");
var import_messages = __toESM(require("../../_locales/en/messages.json"));
var import_Colors = require("../types/Colors");
var import_Avatar = require("../types/Avatar");
var import_BetterAvatar = require("./BetterAvatar");
var import_createAvatarData = require("../util/createAvatarData");
var import_setupI18n = require("../util/setupI18n");
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
const createProps = /* @__PURE__ */ __name((overrideProps = {}) => ({
  avatarData: overrideProps.avatarData || (0, import_createAvatarData.createAvatarData)({ color: import_Colors.AvatarColors[0], text: "OOO" }),
  i18n,
  isSelected: Boolean(overrideProps.isSelected),
  onClick: (0, import_addon_actions.action)("onClick"),
  onDelete: (0, import_addon_actions.action)("onDelete"),
  size: 80
}), "createProps");
var BetterAvatar_stories_default = {
  title: "Components/BetterAvatar"
};
const Text = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_BetterAvatar.BetterAvatar, {
  ...createProps({
    avatarData: (0, import_createAvatarData.createAvatarData)({
      color: import_Colors.AvatarColors[0],
      text: "AH"
    })
  })
}), "Text");
const PersonalIcon = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_BetterAvatar.BetterAvatar, {
  ...createProps({
    avatarData: (0, import_createAvatarData.createAvatarData)({
      color: import_Colors.AvatarColors[1],
      icon: import_Avatar.PersonalAvatarIcons[1]
    })
  })
}), "PersonalIcon");
const GroupIcon = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_BetterAvatar.BetterAvatar, {
  ...createProps({
    avatarData: (0, import_createAvatarData.createAvatarData)({
      color: import_Colors.AvatarColors[1],
      icon: import_Avatar.GroupAvatarIcons[1]
    })
  })
}), "GroupIcon");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GroupIcon,
  PersonalIcon,
  Text
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQmV0dGVyQXZhdGFyLnN0b3JpZXMudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IGFjdGlvbiB9IGZyb20gJ0BzdG9yeWJvb2svYWRkb24tYWN0aW9ucyc7XG5cbmltcG9ydCBlbk1lc3NhZ2VzIGZyb20gJy4uLy4uL19sb2NhbGVzL2VuL21lc3NhZ2VzLmpzb24nO1xuaW1wb3J0IHsgQXZhdGFyQ29sb3JzIH0gZnJvbSAnLi4vdHlwZXMvQ29sb3JzJztcbmltcG9ydCB7IEdyb3VwQXZhdGFySWNvbnMsIFBlcnNvbmFsQXZhdGFySWNvbnMgfSBmcm9tICcuLi90eXBlcy9BdmF0YXInO1xuaW1wb3J0IHR5cGUgeyBQcm9wc1R5cGUgfSBmcm9tICcuL0JldHRlckF2YXRhcic7XG5pbXBvcnQgeyBCZXR0ZXJBdmF0YXIgfSBmcm9tICcuL0JldHRlckF2YXRhcic7XG5pbXBvcnQgeyBjcmVhdGVBdmF0YXJEYXRhIH0gZnJvbSAnLi4vdXRpbC9jcmVhdGVBdmF0YXJEYXRhJztcbmltcG9ydCB7IHNldHVwSTE4biB9IGZyb20gJy4uL3V0aWwvc2V0dXBJMThuJztcblxuY29uc3QgaTE4biA9IHNldHVwSTE4bignZW4nLCBlbk1lc3NhZ2VzKTtcblxuY29uc3QgY3JlYXRlUHJvcHMgPSAob3ZlcnJpZGVQcm9wczogUGFydGlhbDxQcm9wc1R5cGU+ID0ge30pOiBQcm9wc1R5cGUgPT4gKHtcbiAgYXZhdGFyRGF0YTpcbiAgICBvdmVycmlkZVByb3BzLmF2YXRhckRhdGEgfHxcbiAgICBjcmVhdGVBdmF0YXJEYXRhKHsgY29sb3I6IEF2YXRhckNvbG9yc1swXSwgdGV4dDogJ09PTycgfSksXG4gIGkxOG4sXG4gIGlzU2VsZWN0ZWQ6IEJvb2xlYW4ob3ZlcnJpZGVQcm9wcy5pc1NlbGVjdGVkKSxcbiAgb25DbGljazogYWN0aW9uKCdvbkNsaWNrJyksXG4gIG9uRGVsZXRlOiBhY3Rpb24oJ29uRGVsZXRlJyksXG4gIHNpemU6IDgwLFxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgdGl0bGU6ICdDb21wb25lbnRzL0JldHRlckF2YXRhcicsXG59O1xuXG5leHBvcnQgY29uc3QgVGV4dCA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxCZXR0ZXJBdmF0YXJcbiAgICB7Li4uY3JlYXRlUHJvcHMoe1xuICAgICAgYXZhdGFyRGF0YTogY3JlYXRlQXZhdGFyRGF0YSh7XG4gICAgICAgIGNvbG9yOiBBdmF0YXJDb2xvcnNbMF0sXG4gICAgICAgIHRleHQ6ICdBSCcsXG4gICAgICB9KSxcbiAgICB9KX1cbiAgLz5cbik7XG5cbmV4cG9ydCBjb25zdCBQZXJzb25hbEljb24gPSAoKTogSlNYLkVsZW1lbnQgPT4gKFxuICA8QmV0dGVyQXZhdGFyXG4gICAgey4uLmNyZWF0ZVByb3BzKHtcbiAgICAgIGF2YXRhckRhdGE6IGNyZWF0ZUF2YXRhckRhdGEoe1xuICAgICAgICBjb2xvcjogQXZhdGFyQ29sb3JzWzFdLFxuICAgICAgICBpY29uOiBQZXJzb25hbEF2YXRhckljb25zWzFdLFxuICAgICAgfSksXG4gICAgfSl9XG4gIC8+XG4pO1xuXG5leHBvcnQgY29uc3QgR3JvdXBJY29uID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPEJldHRlckF2YXRhclxuICAgIHsuLi5jcmVhdGVQcm9wcyh7XG4gICAgICBhdmF0YXJEYXRhOiBjcmVhdGVBdmF0YXJEYXRhKHtcbiAgICAgICAgY29sb3I6IEF2YXRhckNvbG9yc1sxXSxcbiAgICAgICAgaWNvbjogR3JvdXBBdmF0YXJJY29uc1sxXSxcbiAgICAgIH0pLFxuICAgIH0pfVxuICAvPlxuKTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxtQkFBa0I7QUFFbEIsMkJBQXVCO0FBRXZCLHNCQUF1QjtBQUN2QixvQkFBNkI7QUFDN0Isb0JBQXNEO0FBRXRELDBCQUE2QjtBQUM3Qiw4QkFBaUM7QUFDakMsdUJBQTBCO0FBRTFCLE1BQU0sT0FBTyxnQ0FBVSxNQUFNLHVCQUFVO0FBRXZDLE1BQU0sY0FBYyx3QkFBQyxnQkFBb0MsQ0FBQyxNQUFrQjtBQUFBLEVBQzFFLFlBQ0UsY0FBYyxjQUNkLDhDQUFpQixFQUFFLE9BQU8sMkJBQWEsSUFBSSxNQUFNLE1BQU0sQ0FBQztBQUFBLEVBQzFEO0FBQUEsRUFDQSxZQUFZLFFBQVEsY0FBYyxVQUFVO0FBQUEsRUFDNUMsU0FBUyxpQ0FBTyxTQUFTO0FBQUEsRUFDekIsVUFBVSxpQ0FBTyxVQUFVO0FBQUEsRUFDM0IsTUFBTTtBQUNSLElBVG9CO0FBV3BCLElBQU8sK0JBQVE7QUFBQSxFQUNiLE9BQU87QUFDVDtBQUVPLE1BQU0sT0FBTyw2QkFDbEIsbURBQUM7QUFBQSxLQUNLLFlBQVk7QUFBQSxJQUNkLFlBQVksOENBQWlCO0FBQUEsTUFDM0IsT0FBTywyQkFBYTtBQUFBLE1BQ3BCLE1BQU07QUFBQSxJQUNSLENBQUM7QUFBQSxFQUNILENBQUM7QUFBQSxDQUNILEdBUmtCO0FBV2IsTUFBTSxlQUFlLDZCQUMxQixtREFBQztBQUFBLEtBQ0ssWUFBWTtBQUFBLElBQ2QsWUFBWSw4Q0FBaUI7QUFBQSxNQUMzQixPQUFPLDJCQUFhO0FBQUEsTUFDcEIsTUFBTSxrQ0FBb0I7QUFBQSxJQUM1QixDQUFDO0FBQUEsRUFDSCxDQUFDO0FBQUEsQ0FDSCxHQVIwQjtBQVdyQixNQUFNLFlBQVksNkJBQ3ZCLG1EQUFDO0FBQUEsS0FDSyxZQUFZO0FBQUEsSUFDZCxZQUFZLDhDQUFpQjtBQUFBLE1BQzNCLE9BQU8sMkJBQWE7QUFBQSxNQUNwQixNQUFNLCtCQUFpQjtBQUFBLElBQ3pCLENBQUM7QUFBQSxFQUNILENBQUM7QUFBQSxDQUNILEdBUnVCOyIsCiAgIm5hbWVzIjogW10KfQo=
