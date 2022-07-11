var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var ProfileEditorModal_exports = {};
__export(ProfileEditorModal_exports, {
  SmartProfileEditorModal: () => SmartProfileEditorModal
});
module.exports = __toCommonJS(ProfileEditorModal_exports);
var import_react_redux = require("react-redux");
var import_actions = require("../actions");
var import_ProfileEditorModal = require("../../components/ProfileEditorModal");
var import_user = require("../selectors/user");
var import_items = require("../selectors/items");
var import_conversations = require("../selectors/conversations");
var import_emojis = require("../selectors/emojis");
function mapStateToProps(state) {
  const {
    profileAvatarPath,
    avatars: userAvatarData = [],
    aboutText,
    aboutEmoji,
    color,
    firstName,
    familyName,
    id: conversationId,
    username
  } = (0, import_conversations.getMe)(state);
  const recentEmojis = (0, import_emojis.selectRecentEmojis)(state);
  const skinTone = (0, import_items.getEmojiSkinTone)(state);
  const isUsernameFlagEnabled = (0, import_items.getUsernamesEnabled)(state);
  return {
    aboutEmoji,
    aboutText,
    profileAvatarPath,
    color,
    conversationId,
    familyName,
    firstName: String(firstName),
    hasError: state.globalModals.profileEditorHasError,
    i18n: (0, import_user.getIntl)(state),
    isUsernameFlagEnabled,
    recentEmojis,
    skinTone,
    userAvatarData,
    username,
    usernameSaveState: (0, import_conversations.getUsernameSaveState)(state)
  };
}
const smart = (0, import_react_redux.connect)(mapStateToProps, import_actions.mapDispatchToProps);
const SmartProfileEditorModal = smart(import_ProfileEditorModal.ProfileEditorModal);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SmartProfileEditorModal
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiUHJvZmlsZUVkaXRvck1vZGFsLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMS0yMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7IG1hcERpc3BhdGNoVG9Qcm9wcyB9IGZyb20gJy4uL2FjdGlvbnMnO1xuaW1wb3J0IHR5cGUgeyBQcm9wc0RhdGFUeXBlIGFzIFByb2ZpbGVFZGl0b3JNb2RhbFByb3BzVHlwZSB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvUHJvZmlsZUVkaXRvck1vZGFsJztcbmltcG9ydCB7IFByb2ZpbGVFZGl0b3JNb2RhbCB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvUHJvZmlsZUVkaXRvck1vZGFsJztcbmltcG9ydCB0eXBlIHsgUHJvcHNEYXRhVHlwZSB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvUHJvZmlsZUVkaXRvcic7XG5pbXBvcnQgdHlwZSB7IFN0YXRlVHlwZSB9IGZyb20gJy4uL3JlZHVjZXInO1xuaW1wb3J0IHsgZ2V0SW50bCB9IGZyb20gJy4uL3NlbGVjdG9ycy91c2VyJztcbmltcG9ydCB7IGdldEVtb2ppU2tpblRvbmUsIGdldFVzZXJuYW1lc0VuYWJsZWQgfSBmcm9tICcuLi9zZWxlY3RvcnMvaXRlbXMnO1xuaW1wb3J0IHsgZ2V0TWUsIGdldFVzZXJuYW1lU2F2ZVN0YXRlIH0gZnJvbSAnLi4vc2VsZWN0b3JzL2NvbnZlcnNhdGlvbnMnO1xuaW1wb3J0IHsgc2VsZWN0UmVjZW50RW1vamlzIH0gZnJvbSAnLi4vc2VsZWN0b3JzL2Vtb2ppcyc7XG5cbmZ1bmN0aW9uIG1hcFN0YXRlVG9Qcm9wcyhcbiAgc3RhdGU6IFN0YXRlVHlwZVxuKTogT21pdDxQcm9wc0RhdGFUeXBlLCAnb25FZGl0U3RhdGVDaGFuZ2UnIHwgJ29uUHJvZmlsZUNoYW5nZWQnPiAmXG4gIFByb2ZpbGVFZGl0b3JNb2RhbFByb3BzVHlwZSB7XG4gIGNvbnN0IHtcbiAgICBwcm9maWxlQXZhdGFyUGF0aCxcbiAgICBhdmF0YXJzOiB1c2VyQXZhdGFyRGF0YSA9IFtdLFxuICAgIGFib3V0VGV4dCxcbiAgICBhYm91dEVtb2ppLFxuICAgIGNvbG9yLFxuICAgIGZpcnN0TmFtZSxcbiAgICBmYW1pbHlOYW1lLFxuICAgIGlkOiBjb252ZXJzYXRpb25JZCxcbiAgICB1c2VybmFtZSxcbiAgfSA9IGdldE1lKHN0YXRlKTtcbiAgY29uc3QgcmVjZW50RW1vamlzID0gc2VsZWN0UmVjZW50RW1vamlzKHN0YXRlKTtcbiAgY29uc3Qgc2tpblRvbmUgPSBnZXRFbW9qaVNraW5Ub25lKHN0YXRlKTtcbiAgY29uc3QgaXNVc2VybmFtZUZsYWdFbmFibGVkID0gZ2V0VXNlcm5hbWVzRW5hYmxlZChzdGF0ZSk7XG5cbiAgcmV0dXJuIHtcbiAgICBhYm91dEVtb2ppLFxuICAgIGFib3V0VGV4dCxcbiAgICBwcm9maWxlQXZhdGFyUGF0aCxcbiAgICBjb2xvcixcbiAgICBjb252ZXJzYXRpb25JZCxcbiAgICBmYW1pbHlOYW1lLFxuICAgIGZpcnN0TmFtZTogU3RyaW5nKGZpcnN0TmFtZSksXG4gICAgaGFzRXJyb3I6IHN0YXRlLmdsb2JhbE1vZGFscy5wcm9maWxlRWRpdG9ySGFzRXJyb3IsXG4gICAgaTE4bjogZ2V0SW50bChzdGF0ZSksXG4gICAgaXNVc2VybmFtZUZsYWdFbmFibGVkLFxuICAgIHJlY2VudEVtb2ppcyxcbiAgICBza2luVG9uZSxcbiAgICB1c2VyQXZhdGFyRGF0YSxcbiAgICB1c2VybmFtZSxcbiAgICB1c2VybmFtZVNhdmVTdGF0ZTogZ2V0VXNlcm5hbWVTYXZlU3RhdGUoc3RhdGUpLFxuICB9O1xufVxuXG5jb25zdCBzbWFydCA9IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpO1xuXG5leHBvcnQgY29uc3QgU21hcnRQcm9maWxlRWRpdG9yTW9kYWwgPSBzbWFydChQcm9maWxlRWRpdG9yTW9kYWwpO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLHlCQUF3QjtBQUN4QixxQkFBbUM7QUFFbkMsZ0NBQW1DO0FBR25DLGtCQUF3QjtBQUN4QixtQkFBc0Q7QUFDdEQsMkJBQTRDO0FBQzVDLG9CQUFtQztBQUVuQyx5QkFDRSxPQUU0QjtBQUM1QixRQUFNO0FBQUEsSUFDSjtBQUFBLElBQ0EsU0FBUyxpQkFBaUIsQ0FBQztBQUFBLElBQzNCO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0EsSUFBSTtBQUFBLElBQ0o7QUFBQSxNQUNFLGdDQUFNLEtBQUs7QUFDZixRQUFNLGVBQWUsc0NBQW1CLEtBQUs7QUFDN0MsUUFBTSxXQUFXLG1DQUFpQixLQUFLO0FBQ3ZDLFFBQU0sd0JBQXdCLHNDQUFvQixLQUFLO0FBRXZELFNBQU87QUFBQSxJQUNMO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBLFdBQVcsT0FBTyxTQUFTO0FBQUEsSUFDM0IsVUFBVSxNQUFNLGFBQWE7QUFBQSxJQUM3QixNQUFNLHlCQUFRLEtBQUs7QUFBQSxJQUNuQjtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBLG1CQUFtQiwrQ0FBcUIsS0FBSztBQUFBLEVBQy9DO0FBQ0Y7QUFwQ1MsQUFzQ1QsTUFBTSxRQUFRLGdDQUFRLGlCQUFpQixpQ0FBa0I7QUFFbEQsTUFBTSwwQkFBMEIsTUFBTSw0Q0FBa0I7IiwKICAibmFtZXMiOiBbXQp9Cg==
