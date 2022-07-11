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
var HeroRow_exports = {};
__export(HeroRow_exports, {
  SmartHeroRow: () => SmartHeroRow
});
module.exports = __toCommonJS(HeroRow_exports);
var import_react_redux = require("react-redux");
var import_actions = require("../actions");
var import_ConversationHero = require("../../components/conversation/ConversationHero");
var import_badges = require("../selectors/badges");
var import_user = require("../selectors/user");
const mapStateToProps = /* @__PURE__ */ __name((state, props) => {
  const { id } = props;
  const conversation = state.conversations.conversationLookup[id];
  if (!conversation) {
    throw new Error(`Did not find conversation ${id} in state!`);
  }
  return {
    i18n: (0, import_user.getIntl)(state),
    ...conversation,
    conversationType: conversation.type,
    badge: (0, import_badges.getPreferredBadgeSelector)(state)(conversation.badges),
    theme: (0, import_user.getTheme)(state)
  };
}, "mapStateToProps");
const smart = (0, import_react_redux.connect)(mapStateToProps, import_actions.mapDispatchToProps);
const SmartHeroRow = smart(import_ConversationHero.ConversationHero);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SmartHeroRow
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiSGVyb1Jvdy50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIwLTIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHsgbWFwRGlzcGF0Y2hUb1Byb3BzIH0gZnJvbSAnLi4vYWN0aW9ucyc7XG5cbmltcG9ydCB7IENvbnZlcnNhdGlvbkhlcm8gfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL2NvbnZlcnNhdGlvbi9Db252ZXJzYXRpb25IZXJvJztcblxuaW1wb3J0IHR5cGUgeyBTdGF0ZVR5cGUgfSBmcm9tICcuLi9yZWR1Y2VyJztcbmltcG9ydCB7IGdldFByZWZlcnJlZEJhZGdlU2VsZWN0b3IgfSBmcm9tICcuLi9zZWxlY3RvcnMvYmFkZ2VzJztcbmltcG9ydCB7IGdldEludGwsIGdldFRoZW1lIH0gZnJvbSAnLi4vc2VsZWN0b3JzL3VzZXInO1xuXG50eXBlIEV4dGVybmFsUHJvcHMgPSB7XG4gIGlkOiBzdHJpbmc7XG59O1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGU6IFN0YXRlVHlwZSwgcHJvcHM6IEV4dGVybmFsUHJvcHMpID0+IHtcbiAgY29uc3QgeyBpZCB9ID0gcHJvcHM7XG5cbiAgY29uc3QgY29udmVyc2F0aW9uID0gc3RhdGUuY29udmVyc2F0aW9ucy5jb252ZXJzYXRpb25Mb29rdXBbaWRdO1xuXG4gIGlmICghY29udmVyc2F0aW9uKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBEaWQgbm90IGZpbmQgY29udmVyc2F0aW9uICR7aWR9IGluIHN0YXRlIWApO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBpMThuOiBnZXRJbnRsKHN0YXRlKSxcbiAgICAuLi5jb252ZXJzYXRpb24sXG4gICAgY29udmVyc2F0aW9uVHlwZTogY29udmVyc2F0aW9uLnR5cGUsXG4gICAgYmFkZ2U6IGdldFByZWZlcnJlZEJhZGdlU2VsZWN0b3Ioc3RhdGUpKGNvbnZlcnNhdGlvbi5iYWRnZXMpLFxuICAgIHRoZW1lOiBnZXRUaGVtZShzdGF0ZSksXG4gIH07XG59O1xuXG5jb25zdCBzbWFydCA9IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpO1xuXG5leHBvcnQgY29uc3QgU21hcnRIZXJvUm93ID0gc21hcnQoQ29udmVyc2F0aW9uSGVybyk7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EseUJBQXdCO0FBQ3hCLHFCQUFtQztBQUVuQyw4QkFBaUM7QUFHakMsb0JBQTBDO0FBQzFDLGtCQUFrQztBQU1sQyxNQUFNLGtCQUFrQix3QkFBQyxPQUFrQixVQUF5QjtBQUNsRSxRQUFNLEVBQUUsT0FBTztBQUVmLFFBQU0sZUFBZSxNQUFNLGNBQWMsbUJBQW1CO0FBRTVELE1BQUksQ0FBQyxjQUFjO0FBQ2pCLFVBQU0sSUFBSSxNQUFNLDZCQUE2QixjQUFjO0FBQUEsRUFDN0Q7QUFFQSxTQUFPO0FBQUEsSUFDTCxNQUFNLHlCQUFRLEtBQUs7QUFBQSxPQUNoQjtBQUFBLElBQ0gsa0JBQWtCLGFBQWE7QUFBQSxJQUMvQixPQUFPLDZDQUEwQixLQUFLLEVBQUUsYUFBYSxNQUFNO0FBQUEsSUFDM0QsT0FBTywwQkFBUyxLQUFLO0FBQUEsRUFDdkI7QUFDRixHQWhCd0I7QUFrQnhCLE1BQU0sUUFBUSxnQ0FBUSxpQkFBaUIsaUNBQWtCO0FBRWxELE1BQU0sZUFBZSxNQUFNLHdDQUFnQjsiLAogICJuYW1lcyI6IFtdCn0K
