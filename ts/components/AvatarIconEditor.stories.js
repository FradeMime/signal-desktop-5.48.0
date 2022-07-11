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
var AvatarIconEditor_stories_exports = {};
__export(AvatarIconEditor_stories_exports, {
  GroupIcon: () => GroupIcon,
  PersonalIcon: () => PersonalIcon,
  default: () => AvatarIconEditor_stories_default
});
module.exports = __toCommonJS(AvatarIconEditor_stories_exports);
var import_react = __toESM(require("react"));
var import_addon_actions = require("@storybook/addon-actions");
var import_setupI18n = require("../util/setupI18n");
var import_messages = __toESM(require("../../_locales/en/messages.json"));
var import_AvatarIconEditor = require("./AvatarIconEditor");
var import_Avatar = require("../types/Avatar");
var import_Colors = require("../types/Colors");
var import_createAvatarData = require("../util/createAvatarData");
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
const createProps = /* @__PURE__ */ __name((overrideProps = {}) => ({
  avatarData: overrideProps.avatarData || (0, import_createAvatarData.createAvatarData)({}),
  i18n,
  onClose: (0, import_addon_actions.action)("onClose")
}), "createProps");
var AvatarIconEditor_stories_default = {
  title: "Components/AvatarIconEditor"
};
const PersonalIcon = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_AvatarIconEditor.AvatarIconEditor, {
  ...createProps({
    avatarData: (0, import_createAvatarData.createAvatarData)({
      color: import_Colors.AvatarColors[3],
      icon: import_Avatar.PersonalAvatarIcons[0]
    })
  })
}), "PersonalIcon");
const GroupIcon = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_AvatarIconEditor.AvatarIconEditor, {
  ...createProps({
    avatarData: (0, import_createAvatarData.createAvatarData)({
      color: import_Colors.AvatarColors[8],
      icon: import_Avatar.GroupAvatarIcons[0]
    })
  })
}), "GroupIcon");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GroupIcon,
  PersonalIcon
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQXZhdGFySWNvbkVkaXRvci5zdG9yaWVzLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgeyBhY3Rpb24gfSBmcm9tICdAc3Rvcnlib29rL2FkZG9uLWFjdGlvbnMnO1xuaW1wb3J0IHsgc2V0dXBJMThuIH0gZnJvbSAnLi4vdXRpbC9zZXR1cEkxOG4nO1xuaW1wb3J0IGVuTWVzc2FnZXMgZnJvbSAnLi4vLi4vX2xvY2FsZXMvZW4vbWVzc2FnZXMuanNvbic7XG5cbmltcG9ydCB0eXBlIHsgUHJvcHNUeXBlIH0gZnJvbSAnLi9BdmF0YXJJY29uRWRpdG9yJztcbmltcG9ydCB7IEF2YXRhckljb25FZGl0b3IgfSBmcm9tICcuL0F2YXRhckljb25FZGl0b3InO1xuaW1wb3J0IHsgR3JvdXBBdmF0YXJJY29ucywgUGVyc29uYWxBdmF0YXJJY29ucyB9IGZyb20gJy4uL3R5cGVzL0F2YXRhcic7XG5pbXBvcnQgeyBBdmF0YXJDb2xvcnMgfSBmcm9tICcuLi90eXBlcy9Db2xvcnMnO1xuaW1wb3J0IHsgY3JlYXRlQXZhdGFyRGF0YSB9IGZyb20gJy4uL3V0aWwvY3JlYXRlQXZhdGFyRGF0YSc7XG5cbmNvbnN0IGkxOG4gPSBzZXR1cEkxOG4oJ2VuJywgZW5NZXNzYWdlcyk7XG5cbmNvbnN0IGNyZWF0ZVByb3BzID0gKG92ZXJyaWRlUHJvcHM6IFBhcnRpYWw8UHJvcHNUeXBlPiA9IHt9KTogUHJvcHNUeXBlID0+ICh7XG4gIGF2YXRhckRhdGE6IG92ZXJyaWRlUHJvcHMuYXZhdGFyRGF0YSB8fCBjcmVhdGVBdmF0YXJEYXRhKHt9KSxcbiAgaTE4bixcbiAgb25DbG9zZTogYWN0aW9uKCdvbkNsb3NlJyksXG59KTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICB0aXRsZTogJ0NvbXBvbmVudHMvQXZhdGFySWNvbkVkaXRvcicsXG59O1xuXG5leHBvcnQgY29uc3QgUGVyc29uYWxJY29uID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPEF2YXRhckljb25FZGl0b3JcbiAgICB7Li4uY3JlYXRlUHJvcHMoe1xuICAgICAgYXZhdGFyRGF0YTogY3JlYXRlQXZhdGFyRGF0YSh7XG4gICAgICAgIGNvbG9yOiBBdmF0YXJDb2xvcnNbM10sXG4gICAgICAgIGljb246IFBlcnNvbmFsQXZhdGFySWNvbnNbMF0sXG4gICAgICB9KSxcbiAgICB9KX1cbiAgLz5cbik7XG5cbmV4cG9ydCBjb25zdCBHcm91cEljb24gPSAoKTogSlNYLkVsZW1lbnQgPT4gKFxuICA8QXZhdGFySWNvbkVkaXRvclxuICAgIHsuLi5jcmVhdGVQcm9wcyh7XG4gICAgICBhdmF0YXJEYXRhOiBjcmVhdGVBdmF0YXJEYXRhKHtcbiAgICAgICAgY29sb3I6IEF2YXRhckNvbG9yc1s4XSxcbiAgICAgICAgaWNvbjogR3JvdXBBdmF0YXJJY29uc1swXSxcbiAgICAgIH0pLFxuICAgIH0pfVxuICAvPlxuKTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsbUJBQWtCO0FBRWxCLDJCQUF1QjtBQUN2Qix1QkFBMEI7QUFDMUIsc0JBQXVCO0FBR3ZCLDhCQUFpQztBQUNqQyxvQkFBc0Q7QUFDdEQsb0JBQTZCO0FBQzdCLDhCQUFpQztBQUVqQyxNQUFNLE9BQU8sZ0NBQVUsTUFBTSx1QkFBVTtBQUV2QyxNQUFNLGNBQWMsd0JBQUMsZ0JBQW9DLENBQUMsTUFBa0I7QUFBQSxFQUMxRSxZQUFZLGNBQWMsY0FBYyw4Q0FBaUIsQ0FBQyxDQUFDO0FBQUEsRUFDM0Q7QUFBQSxFQUNBLFNBQVMsaUNBQU8sU0FBUztBQUMzQixJQUpvQjtBQU1wQixJQUFPLG1DQUFRO0FBQUEsRUFDYixPQUFPO0FBQ1Q7QUFFTyxNQUFNLGVBQWUsNkJBQzFCLG1EQUFDO0FBQUEsS0FDSyxZQUFZO0FBQUEsSUFDZCxZQUFZLDhDQUFpQjtBQUFBLE1BQzNCLE9BQU8sMkJBQWE7QUFBQSxNQUNwQixNQUFNLGtDQUFvQjtBQUFBLElBQzVCLENBQUM7QUFBQSxFQUNILENBQUM7QUFBQSxDQUNILEdBUjBCO0FBV3JCLE1BQU0sWUFBWSw2QkFDdkIsbURBQUM7QUFBQSxLQUNLLFlBQVk7QUFBQSxJQUNkLFlBQVksOENBQWlCO0FBQUEsTUFDM0IsT0FBTywyQkFBYTtBQUFBLE1BQ3BCLE1BQU0sK0JBQWlCO0FBQUEsSUFDekIsQ0FBQztBQUFBLEVBQ0gsQ0FBQztBQUFBLENBQ0gsR0FSdUI7IiwKICAibmFtZXMiOiBbXQp9Cg==
