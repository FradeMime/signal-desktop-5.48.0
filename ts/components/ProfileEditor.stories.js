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
var ProfileEditor_stories_exports = {};
__export(ProfileEditor_stories_exports, {
  FullSet: () => FullSet,
  UsernameEditingGeneralError: () => UsernameEditingGeneralError,
  UsernameEditingSaving: () => UsernameEditingSaving,
  UsernameEditingUsernameMalformed: () => UsernameEditingUsernameMalformed,
  UsernameEditingUsernameTaken: () => UsernameEditingUsernameTaken,
  WithCustomAbout: () => WithCustomAbout,
  WithFullName: () => WithFullName,
  WithUsernameFlagEnabled: () => WithUsernameFlagEnabled,
  WithUsernameFlagEnabledAndUsername: () => WithUsernameFlagEnabledAndUsername,
  default: () => ProfileEditor_stories_default
});
module.exports = __toCommonJS(ProfileEditor_stories_exports);
var import_react = __toESM(require("react"));
var import_addon_knobs = require("@storybook/addon-knobs");
var import_addon_actions = require("@storybook/addon-actions");
var import_ProfileEditor = require("./ProfileEditor");
var import_setupI18n = require("../util/setupI18n");
var import_messages = __toESM(require("../../_locales/en/messages.json"));
var import_getDefaultConversation = require("../test-both/helpers/getDefaultConversation");
var import_getRandomColor = require("../test-both/helpers/getRandomColor");
var import_conversationsEnums = require("../state/ducks/conversationsEnums");
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
var ProfileEditor_stories_default = {
  title: "Components/ProfileEditor"
};
const createProps = /* @__PURE__ */ __name((overrideProps = {}) => ({
  aboutEmoji: overrideProps.aboutEmoji,
  aboutText: (0, import_addon_knobs.text)("about", overrideProps.aboutText || ""),
  profileAvatarPath: overrideProps.profileAvatarPath,
  clearUsernameSave: (0, import_addon_actions.action)("clearUsernameSave"),
  conversationId: "123",
  color: overrideProps.color || (0, import_getRandomColor.getRandomColor)(),
  deleteAvatarFromDisk: (0, import_addon_actions.action)("deleteAvatarFromDisk"),
  familyName: overrideProps.familyName,
  firstName: (0, import_addon_knobs.text)("firstName", overrideProps.firstName || (0, import_getDefaultConversation.getFirstName)()),
  i18n,
  isUsernameFlagEnabled: (0, import_addon_knobs.boolean)("isUsernameFlagEnabled", overrideProps.isUsernameFlagEnabled !== void 0 ? overrideProps.isUsernameFlagEnabled : false),
  onEditStateChanged: (0, import_addon_actions.action)("onEditStateChanged"),
  onProfileChanged: (0, import_addon_actions.action)("onProfileChanged"),
  onSetSkinTone: overrideProps.onSetSkinTone || (0, import_addon_actions.action)("onSetSkinTone"),
  recentEmojis: [],
  replaceAvatar: (0, import_addon_actions.action)("replaceAvatar"),
  saveAvatarToDisk: (0, import_addon_actions.action)("saveAvatarToDisk"),
  saveUsername: (0, import_addon_actions.action)("saveUsername"),
  skinTone: overrideProps.skinTone || 0,
  userAvatarData: [],
  username: overrideProps.username,
  usernameSaveState: (0, import_addon_knobs.select)("usernameSaveState", Object.values(import_conversationsEnums.UsernameSaveState), overrideProps.usernameSaveState || import_conversationsEnums.UsernameSaveState.None)
}), "createProps");
const FullSet = /* @__PURE__ */ __name(() => {
  const [skinTone, setSkinTone] = (0, import_react.useState)(0);
  return /* @__PURE__ */ import_react.default.createElement(import_ProfileEditor.ProfileEditor, {
    ...createProps({
      aboutEmoji: "\u{1F64F}",
      aboutText: "Live. Laugh. Love",
      profileAvatarPath: "/fixtures/kitten-3-64-64.jpg",
      onSetSkinTone: setSkinTone,
      familyName: (0, import_getDefaultConversation.getLastName)(),
      skinTone
    })
  });
}, "FullSet");
const WithFullName = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_ProfileEditor.ProfileEditor, {
  ...createProps({
    familyName: (0, import_getDefaultConversation.getLastName)()
  })
}), "WithFullName");
WithFullName.story = {
  name: "with Full Name"
};
const WithCustomAbout = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_ProfileEditor.ProfileEditor, {
  ...createProps({
    aboutEmoji: "\u{1F64F}",
    aboutText: "Live. Laugh. Love"
  })
}), "WithCustomAbout");
WithCustomAbout.story = {
  name: "with Custom About"
};
const WithUsernameFlagEnabled = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_ProfileEditor.ProfileEditor, {
  ...createProps({
    isUsernameFlagEnabled: true
  })
}), "WithUsernameFlagEnabled");
WithUsernameFlagEnabled.story = {
  name: "with Username flag enabled"
};
const WithUsernameFlagEnabledAndUsername = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_ProfileEditor.ProfileEditor, {
  ...createProps({
    isUsernameFlagEnabled: true,
    username: "unicorn55"
  })
}), "WithUsernameFlagEnabledAndUsername");
WithUsernameFlagEnabledAndUsername.story = {
  name: "with Username flag enabled and username"
};
const UsernameEditingSaving = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_ProfileEditor.ProfileEditor, {
  ...createProps({
    isUsernameFlagEnabled: true,
    usernameSaveState: import_conversationsEnums.UsernameSaveState.Saving,
    username: "unicorn55"
  })
}), "UsernameEditingSaving");
UsernameEditingSaving.story = {
  name: "Username editing, saving"
};
const UsernameEditingUsernameTaken = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_ProfileEditor.ProfileEditor, {
  ...createProps({
    isUsernameFlagEnabled: true,
    usernameSaveState: import_conversationsEnums.UsernameSaveState.UsernameTakenError,
    username: "unicorn55"
  })
}), "UsernameEditingUsernameTaken");
UsernameEditingUsernameTaken.story = {
  name: "Username editing, username taken"
};
const UsernameEditingUsernameMalformed = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_ProfileEditor.ProfileEditor, {
  ...createProps({
    isUsernameFlagEnabled: true,
    usernameSaveState: import_conversationsEnums.UsernameSaveState.UsernameMalformedError,
    username: "unicorn55"
  })
}), "UsernameEditingUsernameMalformed");
UsernameEditingUsernameMalformed.story = {
  name: "Username editing, username malformed"
};
const UsernameEditingGeneralError = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_ProfileEditor.ProfileEditor, {
  ...createProps({
    isUsernameFlagEnabled: true,
    usernameSaveState: import_conversationsEnums.UsernameSaveState.GeneralError,
    username: "unicorn55"
  })
}), "UsernameEditingGeneralError");
UsernameEditingGeneralError.story = {
  name: "Username editing, general error"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FullSet,
  UsernameEditingGeneralError,
  UsernameEditingSaving,
  UsernameEditingUsernameMalformed,
  UsernameEditingUsernameTaken,
  WithCustomAbout,
  WithFullName,
  WithUsernameFlagEnabled,
  WithUsernameFlagEnabledAndUsername
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiUHJvZmlsZUVkaXRvci5zdG9yaWVzLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IHRleHQsIGJvb2xlYW4sIHNlbGVjdCB9IGZyb20gJ0BzdG9yeWJvb2svYWRkb24ta25vYnMnO1xuaW1wb3J0IHsgYWN0aW9uIH0gZnJvbSAnQHN0b3J5Ym9vay9hZGRvbi1hY3Rpb25zJztcblxuaW1wb3J0IHR5cGUgeyBQcm9wc1R5cGUgfSBmcm9tICcuL1Byb2ZpbGVFZGl0b3InO1xuaW1wb3J0IHsgUHJvZmlsZUVkaXRvciB9IGZyb20gJy4vUHJvZmlsZUVkaXRvcic7XG5pbXBvcnQgeyBzZXR1cEkxOG4gfSBmcm9tICcuLi91dGlsL3NldHVwSTE4bic7XG5pbXBvcnQgZW5NZXNzYWdlcyBmcm9tICcuLi8uLi9fbG9jYWxlcy9lbi9tZXNzYWdlcy5qc29uJztcbmltcG9ydCB7XG4gIGdldEZpcnN0TmFtZSxcbiAgZ2V0TGFzdE5hbWUsXG59IGZyb20gJy4uL3Rlc3QtYm90aC9oZWxwZXJzL2dldERlZmF1bHRDb252ZXJzYXRpb24nO1xuaW1wb3J0IHsgZ2V0UmFuZG9tQ29sb3IgfSBmcm9tICcuLi90ZXN0LWJvdGgvaGVscGVycy9nZXRSYW5kb21Db2xvcic7XG5pbXBvcnQgeyBVc2VybmFtZVNhdmVTdGF0ZSB9IGZyb20gJy4uL3N0YXRlL2R1Y2tzL2NvbnZlcnNhdGlvbnNFbnVtcyc7XG5cbmNvbnN0IGkxOG4gPSBzZXR1cEkxOG4oJ2VuJywgZW5NZXNzYWdlcyk7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgdGl0bGU6ICdDb21wb25lbnRzL1Byb2ZpbGVFZGl0b3InLFxufTtcblxuY29uc3QgY3JlYXRlUHJvcHMgPSAob3ZlcnJpZGVQcm9wczogUGFydGlhbDxQcm9wc1R5cGU+ID0ge30pOiBQcm9wc1R5cGUgPT4gKHtcbiAgYWJvdXRFbW9qaTogb3ZlcnJpZGVQcm9wcy5hYm91dEVtb2ppLFxuICBhYm91dFRleHQ6IHRleHQoJ2Fib3V0Jywgb3ZlcnJpZGVQcm9wcy5hYm91dFRleHQgfHwgJycpLFxuICBwcm9maWxlQXZhdGFyUGF0aDogb3ZlcnJpZGVQcm9wcy5wcm9maWxlQXZhdGFyUGF0aCxcbiAgY2xlYXJVc2VybmFtZVNhdmU6IGFjdGlvbignY2xlYXJVc2VybmFtZVNhdmUnKSxcbiAgY29udmVyc2F0aW9uSWQ6ICcxMjMnLFxuICBjb2xvcjogb3ZlcnJpZGVQcm9wcy5jb2xvciB8fCBnZXRSYW5kb21Db2xvcigpLFxuICBkZWxldGVBdmF0YXJGcm9tRGlzazogYWN0aW9uKCdkZWxldGVBdmF0YXJGcm9tRGlzaycpLFxuICBmYW1pbHlOYW1lOiBvdmVycmlkZVByb3BzLmZhbWlseU5hbWUsXG4gIGZpcnN0TmFtZTogdGV4dCgnZmlyc3ROYW1lJywgb3ZlcnJpZGVQcm9wcy5maXJzdE5hbWUgfHwgZ2V0Rmlyc3ROYW1lKCkpLFxuICBpMThuLFxuICBpc1VzZXJuYW1lRmxhZ0VuYWJsZWQ6IGJvb2xlYW4oXG4gICAgJ2lzVXNlcm5hbWVGbGFnRW5hYmxlZCcsXG4gICAgb3ZlcnJpZGVQcm9wcy5pc1VzZXJuYW1lRmxhZ0VuYWJsZWQgIT09IHVuZGVmaW5lZFxuICAgICAgPyBvdmVycmlkZVByb3BzLmlzVXNlcm5hbWVGbGFnRW5hYmxlZFxuICAgICAgOiBmYWxzZVxuICApLFxuICBvbkVkaXRTdGF0ZUNoYW5nZWQ6IGFjdGlvbignb25FZGl0U3RhdGVDaGFuZ2VkJyksXG4gIG9uUHJvZmlsZUNoYW5nZWQ6IGFjdGlvbignb25Qcm9maWxlQ2hhbmdlZCcpLFxuICBvblNldFNraW5Ub25lOiBvdmVycmlkZVByb3BzLm9uU2V0U2tpblRvbmUgfHwgYWN0aW9uKCdvblNldFNraW5Ub25lJyksXG4gIHJlY2VudEVtb2ppczogW10sXG4gIHJlcGxhY2VBdmF0YXI6IGFjdGlvbigncmVwbGFjZUF2YXRhcicpLFxuICBzYXZlQXZhdGFyVG9EaXNrOiBhY3Rpb24oJ3NhdmVBdmF0YXJUb0Rpc2snKSxcbiAgc2F2ZVVzZXJuYW1lOiBhY3Rpb24oJ3NhdmVVc2VybmFtZScpLFxuICBza2luVG9uZTogb3ZlcnJpZGVQcm9wcy5za2luVG9uZSB8fCAwLFxuICB1c2VyQXZhdGFyRGF0YTogW10sXG4gIHVzZXJuYW1lOiBvdmVycmlkZVByb3BzLnVzZXJuYW1lLFxuICB1c2VybmFtZVNhdmVTdGF0ZTogc2VsZWN0KFxuICAgICd1c2VybmFtZVNhdmVTdGF0ZScsXG4gICAgT2JqZWN0LnZhbHVlcyhVc2VybmFtZVNhdmVTdGF0ZSksXG4gICAgb3ZlcnJpZGVQcm9wcy51c2VybmFtZVNhdmVTdGF0ZSB8fCBVc2VybmFtZVNhdmVTdGF0ZS5Ob25lXG4gICksXG59KTtcblxuZXhwb3J0IGNvbnN0IEZ1bGxTZXQgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBbc2tpblRvbmUsIHNldFNraW5Ub25lXSA9IHVzZVN0YXRlKDApO1xuXG4gIHJldHVybiAoXG4gICAgPFByb2ZpbGVFZGl0b3JcbiAgICAgIHsuLi5jcmVhdGVQcm9wcyh7XG4gICAgICAgIGFib3V0RW1vamk6ICdcdUQ4M0RcdURFNEYnLFxuICAgICAgICBhYm91dFRleHQ6ICdMaXZlLiBMYXVnaC4gTG92ZScsXG4gICAgICAgIHByb2ZpbGVBdmF0YXJQYXRoOiAnL2ZpeHR1cmVzL2tpdHRlbi0zLTY0LTY0LmpwZycsXG4gICAgICAgIG9uU2V0U2tpblRvbmU6IHNldFNraW5Ub25lLFxuICAgICAgICBmYW1pbHlOYW1lOiBnZXRMYXN0TmFtZSgpLFxuICAgICAgICBza2luVG9uZSxcbiAgICAgIH0pfVxuICAgIC8+XG4gICk7XG59O1xuXG5leHBvcnQgY29uc3QgV2l0aEZ1bGxOYW1lID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPFByb2ZpbGVFZGl0b3JcbiAgICB7Li4uY3JlYXRlUHJvcHMoe1xuICAgICAgZmFtaWx5TmFtZTogZ2V0TGFzdE5hbWUoKSxcbiAgICB9KX1cbiAgLz5cbik7XG5cbldpdGhGdWxsTmFtZS5zdG9yeSA9IHtcbiAgbmFtZTogJ3dpdGggRnVsbCBOYW1lJyxcbn07XG5cbmV4cG9ydCBjb25zdCBXaXRoQ3VzdG9tQWJvdXQgPSAoKTogSlNYLkVsZW1lbnQgPT4gKFxuICA8UHJvZmlsZUVkaXRvclxuICAgIHsuLi5jcmVhdGVQcm9wcyh7XG4gICAgICBhYm91dEVtb2ppOiAnXHVEODNEXHVERTRGJyxcbiAgICAgIGFib3V0VGV4dDogJ0xpdmUuIExhdWdoLiBMb3ZlJyxcbiAgICB9KX1cbiAgLz5cbik7XG5cbldpdGhDdXN0b21BYm91dC5zdG9yeSA9IHtcbiAgbmFtZTogJ3dpdGggQ3VzdG9tIEFib3V0Jyxcbn07XG5cbmV4cG9ydCBjb25zdCBXaXRoVXNlcm5hbWVGbGFnRW5hYmxlZCA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxQcm9maWxlRWRpdG9yXG4gICAgey4uLmNyZWF0ZVByb3BzKHtcbiAgICAgIGlzVXNlcm5hbWVGbGFnRW5hYmxlZDogdHJ1ZSxcbiAgICB9KX1cbiAgLz5cbik7XG5cbldpdGhVc2VybmFtZUZsYWdFbmFibGVkLnN0b3J5ID0ge1xuICBuYW1lOiAnd2l0aCBVc2VybmFtZSBmbGFnIGVuYWJsZWQnLFxufTtcblxuZXhwb3J0IGNvbnN0IFdpdGhVc2VybmFtZUZsYWdFbmFibGVkQW5kVXNlcm5hbWUgPSAoKTogSlNYLkVsZW1lbnQgPT4gKFxuICA8UHJvZmlsZUVkaXRvclxuICAgIHsuLi5jcmVhdGVQcm9wcyh7XG4gICAgICBpc1VzZXJuYW1lRmxhZ0VuYWJsZWQ6IHRydWUsXG4gICAgICB1c2VybmFtZTogJ3VuaWNvcm41NScsXG4gICAgfSl9XG4gIC8+XG4pO1xuXG5XaXRoVXNlcm5hbWVGbGFnRW5hYmxlZEFuZFVzZXJuYW1lLnN0b3J5ID0ge1xuICBuYW1lOiAnd2l0aCBVc2VybmFtZSBmbGFnIGVuYWJsZWQgYW5kIHVzZXJuYW1lJyxcbn07XG5cbmV4cG9ydCBjb25zdCBVc2VybmFtZUVkaXRpbmdTYXZpbmcgPSAoKTogSlNYLkVsZW1lbnQgPT4gKFxuICA8UHJvZmlsZUVkaXRvclxuICAgIHsuLi5jcmVhdGVQcm9wcyh7XG4gICAgICBpc1VzZXJuYW1lRmxhZ0VuYWJsZWQ6IHRydWUsXG4gICAgICB1c2VybmFtZVNhdmVTdGF0ZTogVXNlcm5hbWVTYXZlU3RhdGUuU2F2aW5nLFxuICAgICAgdXNlcm5hbWU6ICd1bmljb3JuNTUnLFxuICAgIH0pfVxuICAvPlxuKTtcblxuVXNlcm5hbWVFZGl0aW5nU2F2aW5nLnN0b3J5ID0ge1xuICBuYW1lOiAnVXNlcm5hbWUgZWRpdGluZywgc2F2aW5nJyxcbn07XG5cbmV4cG9ydCBjb25zdCBVc2VybmFtZUVkaXRpbmdVc2VybmFtZVRha2VuID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPFByb2ZpbGVFZGl0b3JcbiAgICB7Li4uY3JlYXRlUHJvcHMoe1xuICAgICAgaXNVc2VybmFtZUZsYWdFbmFibGVkOiB0cnVlLFxuICAgICAgdXNlcm5hbWVTYXZlU3RhdGU6IFVzZXJuYW1lU2F2ZVN0YXRlLlVzZXJuYW1lVGFrZW5FcnJvcixcbiAgICAgIHVzZXJuYW1lOiAndW5pY29ybjU1JyxcbiAgICB9KX1cbiAgLz5cbik7XG5cblVzZXJuYW1lRWRpdGluZ1VzZXJuYW1lVGFrZW4uc3RvcnkgPSB7XG4gIG5hbWU6ICdVc2VybmFtZSBlZGl0aW5nLCB1c2VybmFtZSB0YWtlbicsXG59O1xuXG5leHBvcnQgY29uc3QgVXNlcm5hbWVFZGl0aW5nVXNlcm5hbWVNYWxmb3JtZWQgPSAoKTogSlNYLkVsZW1lbnQgPT4gKFxuICA8UHJvZmlsZUVkaXRvclxuICAgIHsuLi5jcmVhdGVQcm9wcyh7XG4gICAgICBpc1VzZXJuYW1lRmxhZ0VuYWJsZWQ6IHRydWUsXG4gICAgICB1c2VybmFtZVNhdmVTdGF0ZTogVXNlcm5hbWVTYXZlU3RhdGUuVXNlcm5hbWVNYWxmb3JtZWRFcnJvcixcbiAgICAgIHVzZXJuYW1lOiAndW5pY29ybjU1JyxcbiAgICB9KX1cbiAgLz5cbik7XG5cblVzZXJuYW1lRWRpdGluZ1VzZXJuYW1lTWFsZm9ybWVkLnN0b3J5ID0ge1xuICBuYW1lOiAnVXNlcm5hbWUgZWRpdGluZywgdXNlcm5hbWUgbWFsZm9ybWVkJyxcbn07XG5cbmV4cG9ydCBjb25zdCBVc2VybmFtZUVkaXRpbmdHZW5lcmFsRXJyb3IgPSAoKTogSlNYLkVsZW1lbnQgPT4gKFxuICA8UHJvZmlsZUVkaXRvclxuICAgIHsuLi5jcmVhdGVQcm9wcyh7XG4gICAgICBpc1VzZXJuYW1lRmxhZ0VuYWJsZWQ6IHRydWUsXG4gICAgICB1c2VybmFtZVNhdmVTdGF0ZTogVXNlcm5hbWVTYXZlU3RhdGUuR2VuZXJhbEVycm9yLFxuICAgICAgdXNlcm5hbWU6ICd1bmljb3JuNTUnLFxuICAgIH0pfVxuICAvPlxuKTtcblxuVXNlcm5hbWVFZGl0aW5nR2VuZXJhbEVycm9yLnN0b3J5ID0ge1xuICBuYW1lOiAnVXNlcm5hbWUgZWRpdGluZywgZ2VuZXJhbCBlcnJvcicsXG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLG1CQUFnQztBQUVoQyx5QkFBc0M7QUFDdEMsMkJBQXVCO0FBR3ZCLDJCQUE4QjtBQUM5Qix1QkFBMEI7QUFDMUIsc0JBQXVCO0FBQ3ZCLG9DQUdPO0FBQ1AsNEJBQStCO0FBQy9CLGdDQUFrQztBQUVsQyxNQUFNLE9BQU8sZ0NBQVUsTUFBTSx1QkFBVTtBQUV2QyxJQUFPLGdDQUFRO0FBQUEsRUFDYixPQUFPO0FBQ1Q7QUFFQSxNQUFNLGNBQWMsd0JBQUMsZ0JBQW9DLENBQUMsTUFBa0I7QUFBQSxFQUMxRSxZQUFZLGNBQWM7QUFBQSxFQUMxQixXQUFXLDZCQUFLLFNBQVMsY0FBYyxhQUFhLEVBQUU7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
