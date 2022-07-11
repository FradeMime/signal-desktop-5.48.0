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
var AvatarPopup_stories_exports = {};
__export(AvatarPopup_stories_exports, {
  AvatarOnly: () => AvatarOnly,
  HasBadge: () => HasBadge,
  PhoneNumber: () => PhoneNumber,
  ProfileName: () => ProfileName,
  Title: () => Title,
  UpdateAvailable: () => UpdateAvailable,
  default: () => AvatarPopup_stories_default
});
module.exports = __toCommonJS(AvatarPopup_stories_exports);
var React = __toESM(require("react"));
var import_addon_actions = require("@storybook/addon-actions");
var import_addon_knobs = require("@storybook/addon-knobs");
var import_AvatarPopup = require("./AvatarPopup");
var import_Colors = require("../types/Colors");
var import_setupI18n = require("../util/setupI18n");
var import_messages = __toESM(require("../../_locales/en/messages.json"));
var import_StorybookThemeContext = require("../../.storybook/StorybookThemeContext");
var import_getFakeBadge = require("../test-both/helpers/getFakeBadge");
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
const colorMap = import_Colors.AvatarColors.reduce((m, color) => ({
  ...m,
  [color]: color
}), {});
const conversationTypeMap = {
  direct: "direct",
  group: "group"
};
const useProps = /* @__PURE__ */ __name((overrideProps = {}) => ({
  acceptedMessageRequest: true,
  avatarPath: (0, import_addon_knobs.text)("avatarPath", overrideProps.avatarPath || ""),
  badge: overrideProps.badge,
  color: (0, import_addon_knobs.select)("color", colorMap, overrideProps.color || import_Colors.AvatarColors[0]),
  conversationType: (0, import_addon_knobs.select)("conversationType", conversationTypeMap, overrideProps.conversationType || "direct"),
  hasPendingUpdate: Boolean(overrideProps.hasPendingUpdate),
  i18n,
  isMe: true,
  name: (0, import_addon_knobs.text)("name", overrideProps.name || ""),
  noteToSelf: (0, import_addon_knobs.boolean)("noteToSelf", overrideProps.noteToSelf || false),
  onEditProfile: (0, import_addon_actions.action)("onEditProfile"),
  onViewArchive: (0, import_addon_actions.action)("onViewArchive"),
  onViewPreferences: (0, import_addon_actions.action)("onViewPreferences"),
  phoneNumber: (0, import_addon_knobs.text)("phoneNumber", overrideProps.phoneNumber || ""),
  profileName: (0, import_addon_knobs.text)("profileName", overrideProps.profileName || ""),
  sharedGroupNames: [],
  size: 80,
  startUpdate: (0, import_addon_actions.action)("startUpdate"),
  style: {},
  theme: React.useContext(import_StorybookThemeContext.StorybookThemeContext),
  title: (0, import_addon_knobs.text)("title", overrideProps.title || "")
}), "useProps");
var AvatarPopup_stories_default = {
  title: "Components/Avatar Popup"
};
const AvatarOnly = /* @__PURE__ */ __name(() => {
  const props = useProps();
  return /* @__PURE__ */ React.createElement(import_AvatarPopup.AvatarPopup, {
    ...props
  });
}, "AvatarOnly");
const HasBadge = /* @__PURE__ */ __name(() => {
  const props = useProps({
    badge: (0, import_getFakeBadge.getFakeBadge)(),
    title: "Janet Yellen"
  });
  return /* @__PURE__ */ React.createElement(import_AvatarPopup.AvatarPopup, {
    ...props
  });
}, "HasBadge");
HasBadge.story = {
  name: "Has badge"
};
const Title = /* @__PURE__ */ __name(() => {
  const props = useProps({
    title: "My Great Title"
  });
  return /* @__PURE__ */ React.createElement(import_AvatarPopup.AvatarPopup, {
    ...props
  });
}, "Title");
const ProfileName = /* @__PURE__ */ __name(() => {
  const props = useProps({
    profileName: "Sam Neill"
  });
  return /* @__PURE__ */ React.createElement(import_AvatarPopup.AvatarPopup, {
    ...props
  });
}, "ProfileName");
const PhoneNumber = /* @__PURE__ */ __name(() => {
  const props = useProps({
    profileName: "Sam Neill",
    phoneNumber: "(555) 867-5309"
  });
  return /* @__PURE__ */ React.createElement(import_AvatarPopup.AvatarPopup, {
    ...props
  });
}, "PhoneNumber");
const UpdateAvailable = /* @__PURE__ */ __name(() => {
  const props = useProps({
    hasPendingUpdate: true
  });
  return /* @__PURE__ */ React.createElement(import_AvatarPopup.AvatarPopup, {
    ...props
  });
}, "UpdateAvailable");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AvatarOnly,
  HasBadge,
  PhoneNumber,
  ProfileName,
  Title,
  UpdateAvailable
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQXZhdGFyUG9wdXAuc3Rvcmllcy50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIwLTIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IGFjdGlvbiB9IGZyb20gJ0BzdG9yeWJvb2svYWRkb24tYWN0aW9ucyc7XG5pbXBvcnQgeyBib29sZWFuLCBzZWxlY3QsIHRleHQgfSBmcm9tICdAc3Rvcnlib29rL2FkZG9uLWtub2JzJztcblxuaW1wb3J0IHR5cGUgeyBQcm9wcyB9IGZyb20gJy4vQXZhdGFyUG9wdXAnO1xuaW1wb3J0IHsgQXZhdGFyUG9wdXAgfSBmcm9tICcuL0F2YXRhclBvcHVwJztcbmltcG9ydCB0eXBlIHsgQXZhdGFyQ29sb3JUeXBlIH0gZnJvbSAnLi4vdHlwZXMvQ29sb3JzJztcbmltcG9ydCB7IEF2YXRhckNvbG9ycyB9IGZyb20gJy4uL3R5cGVzL0NvbG9ycyc7XG5pbXBvcnQgeyBzZXR1cEkxOG4gfSBmcm9tICcuLi91dGlsL3NldHVwSTE4bic7XG5pbXBvcnQgZW5NZXNzYWdlcyBmcm9tICcuLi8uLi9fbG9jYWxlcy9lbi9tZXNzYWdlcy5qc29uJztcbmltcG9ydCB7IFN0b3J5Ym9va1RoZW1lQ29udGV4dCB9IGZyb20gJy4uLy4uLy5zdG9yeWJvb2svU3Rvcnlib29rVGhlbWVDb250ZXh0JztcbmltcG9ydCB7IGdldEZha2VCYWRnZSB9IGZyb20gJy4uL3Rlc3QtYm90aC9oZWxwZXJzL2dldEZha2VCYWRnZSc7XG5cbmNvbnN0IGkxOG4gPSBzZXR1cEkxOG4oJ2VuJywgZW5NZXNzYWdlcyk7XG5cbmNvbnN0IGNvbG9yTWFwOiBSZWNvcmQ8c3RyaW5nLCBBdmF0YXJDb2xvclR5cGU+ID0gQXZhdGFyQ29sb3JzLnJlZHVjZShcbiAgKG0sIGNvbG9yKSA9PiAoe1xuICAgIC4uLm0sXG4gICAgW2NvbG9yXTogY29sb3IsXG4gIH0pLFxuICB7fVxuKTtcblxuY29uc3QgY29udmVyc2F0aW9uVHlwZU1hcDogUmVjb3JkPHN0cmluZywgUHJvcHNbJ2NvbnZlcnNhdGlvblR5cGUnXT4gPSB7XG4gIGRpcmVjdDogJ2RpcmVjdCcsXG4gIGdyb3VwOiAnZ3JvdXAnLFxufTtcblxuY29uc3QgdXNlUHJvcHMgPSAob3ZlcnJpZGVQcm9wczogUGFydGlhbDxQcm9wcz4gPSB7fSk6IFByb3BzID0+ICh7XG4gIGFjY2VwdGVkTWVzc2FnZVJlcXVlc3Q6IHRydWUsXG4gIGF2YXRhclBhdGg6IHRleHQoJ2F2YXRhclBhdGgnLCBvdmVycmlkZVByb3BzLmF2YXRhclBhdGggfHwgJycpLFxuICBiYWRnZTogb3ZlcnJpZGVQcm9wcy5iYWRnZSxcbiAgY29sb3I6IHNlbGVjdCgnY29sb3InLCBjb2xvck1hcCwgb3ZlcnJpZGVQcm9wcy5jb2xvciB8fCBBdmF0YXJDb2xvcnNbMF0pLFxuICBjb252ZXJzYXRpb25UeXBlOiBzZWxlY3QoXG4gICAgJ2NvbnZlcnNhdGlvblR5cGUnLFxuICAgIGNvbnZlcnNhdGlvblR5cGVNYXAsXG4gICAgb3ZlcnJpZGVQcm9wcy5jb252ZXJzYXRpb25UeXBlIHx8ICdkaXJlY3QnXG4gICksXG4gIGhhc1BlbmRpbmdVcGRhdGU6IEJvb2xlYW4ob3ZlcnJpZGVQcm9wcy5oYXNQZW5kaW5nVXBkYXRlKSxcbiAgaTE4bixcbiAgaXNNZTogdHJ1ZSxcbiAgbmFtZTogdGV4dCgnbmFtZScsIG92ZXJyaWRlUHJvcHMubmFtZSB8fCAnJyksXG4gIG5vdGVUb1NlbGY6IGJvb2xlYW4oJ25vdGVUb1NlbGYnLCBvdmVycmlkZVByb3BzLm5vdGVUb1NlbGYgfHwgZmFsc2UpLFxuICBvbkVkaXRQcm9maWxlOiBhY3Rpb24oJ29uRWRpdFByb2ZpbGUnKSxcbiAgb25WaWV3QXJjaGl2ZTogYWN0aW9uKCdvblZpZXdBcmNoaXZlJyksXG4gIG9uVmlld1ByZWZlcmVuY2VzOiBhY3Rpb24oJ29uVmlld1ByZWZlcmVuY2VzJyksXG4gIHBob25lTnVtYmVyOiB0ZXh0KCdwaG9uZU51bWJlcicsIG92ZXJyaWRlUHJvcHMucGhvbmVOdW1iZXIgfHwgJycpLFxuICBwcm9maWxlTmFtZTogdGV4dCgncHJvZmlsZU5hbWUnLCBvdmVycmlkZVByb3BzLnByb2ZpbGVOYW1lIHx8ICcnKSxcbiAgc2hhcmVkR3JvdXBOYW1lczogW10sXG4gIHNpemU6IDgwLFxuICBzdGFydFVwZGF0ZTogYWN0aW9uKCdzdGFydFVwZGF0ZScpLFxuICBzdHlsZToge30sXG4gIHRoZW1lOiBSZWFjdC51c2VDb250ZXh0KFN0b3J5Ym9va1RoZW1lQ29udGV4dCksXG4gIHRpdGxlOiB0ZXh0KCd0aXRsZScsIG92ZXJyaWRlUHJvcHMudGl0bGUgfHwgJycpLFxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgdGl0bGU6ICdDb21wb25lbnRzL0F2YXRhciBQb3B1cCcsXG59O1xuXG5leHBvcnQgY29uc3QgQXZhdGFyT25seSA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IHByb3BzID0gdXNlUHJvcHMoKTtcblxuICByZXR1cm4gPEF2YXRhclBvcHVwIHsuLi5wcm9wc30gLz47XG59O1xuXG5leHBvcnQgY29uc3QgSGFzQmFkZ2UgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBwcm9wcyA9IHVzZVByb3BzKHtcbiAgICBiYWRnZTogZ2V0RmFrZUJhZGdlKCksXG4gICAgdGl0bGU6ICdKYW5ldCBZZWxsZW4nLFxuICB9KTtcblxuICByZXR1cm4gPEF2YXRhclBvcHVwIHsuLi5wcm9wc30gLz47XG59O1xuXG5IYXNCYWRnZS5zdG9yeSA9IHtcbiAgbmFtZTogJ0hhcyBiYWRnZScsXG59O1xuXG5leHBvcnQgY29uc3QgVGl0bGUgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBwcm9wcyA9IHVzZVByb3BzKHtcbiAgICB0aXRsZTogJ015IEdyZWF0IFRpdGxlJyxcbiAgfSk7XG5cbiAgcmV0dXJuIDxBdmF0YXJQb3B1cCB7Li4ucHJvcHN9IC8+O1xufTtcblxuZXhwb3J0IGNvbnN0IFByb2ZpbGVOYW1lID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgcHJvcHMgPSB1c2VQcm9wcyh7XG4gICAgcHJvZmlsZU5hbWU6ICdTYW0gTmVpbGwnLFxuICB9KTtcblxuICByZXR1cm4gPEF2YXRhclBvcHVwIHsuLi5wcm9wc30gLz47XG59O1xuXG5leHBvcnQgY29uc3QgUGhvbmVOdW1iZXIgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBwcm9wcyA9IHVzZVByb3BzKHtcbiAgICBwcm9maWxlTmFtZTogJ1NhbSBOZWlsbCcsXG4gICAgcGhvbmVOdW1iZXI6ICcoNTU1KSA4NjctNTMwOScsXG4gIH0pO1xuXG4gIHJldHVybiA8QXZhdGFyUG9wdXAgey4uLnByb3BzfSAvPjtcbn07XG5cbmV4cG9ydCBjb25zdCBVcGRhdGVBdmFpbGFibGUgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBwcm9wcyA9IHVzZVByb3BzKHtcbiAgICBoYXNQZW5kaW5nVXBkYXRlOiB0cnVlLFxuICB9KTtcblxuICByZXR1cm4gPEF2YXRhclBvcHVwIHsuLi5wcm9wc30gLz47XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLFlBQXVCO0FBRXZCLDJCQUF1QjtBQUN2Qix5QkFBc0M7QUFHdEMseUJBQTRCO0FBRTVCLG9CQUE2QjtBQUM3Qix1QkFBMEI7QUFDMUIsc0JBQXVCO0FBQ3ZCLG1DQUFzQztBQUN0QywwQkFBNkI7QUFFN0IsTUFBTSxPQUFPLGdDQUFVLE1BQU0sdUJBQVU7QUFFdkMsTUFBTSxXQUE0QywyQkFBYSxPQUM3RCxDQUFDLEdBQUcsVUFBVztBQUFBLEtBQ1Y7QUFBQSxHQUNGLFFBQVE7QUFDWCxJQUNBLENBQUMs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
