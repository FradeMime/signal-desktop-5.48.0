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
var MainHeader_exports = {};
__export(MainHeader_exports, {
  SmartMainHeader: () => SmartMainHeader
});
module.exports = __toCommonJS(MainHeader_exports);
var import_react_redux = require("react-redux");
var import_actions = require("../actions");
var import_MainHeader = require("../../components/MainHeader");
var import_badges = require("../selectors/badges");
var import_user = require("../selectors/user");
var import_conversations = require("../selectors/conversations");
var import_items = require("../selectors/items");
const mapStateToProps = /* @__PURE__ */ __name((state) => {
  const me = (0, import_conversations.getMe)(state);
  return {
    areStoriesEnabled: (0, import_items.getStoriesEnabled)(state),
    hasPendingUpdate: Boolean(state.updates.didSnooze),
    regionCode: (0, import_user.getRegionCode)(state),
    ourConversationId: (0, import_user.getUserConversationId)(state),
    ourNumber: (0, import_user.getUserNumber)(state),
    ourUuid: (0, import_user.getUserUuid)(state),
    ...me,
    badge: (0, import_badges.getPreferredBadgeSelector)(state)(me.badges),
    theme: (0, import_user.getTheme)(state),
    i18n: (0, import_user.getIntl)(state)
  };
}, "mapStateToProps");
const smart = (0, import_react_redux.connect)(mapStateToProps, import_actions.mapDispatchToProps);
const SmartMainHeader = smart(import_MainHeader.MainHeader);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SmartMainHeader
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiTWFpbkhlYWRlci50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDE5LTIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHsgbWFwRGlzcGF0Y2hUb1Byb3BzIH0gZnJvbSAnLi4vYWN0aW9ucyc7XG5cbmltcG9ydCB7IE1haW5IZWFkZXIgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL01haW5IZWFkZXInO1xuaW1wb3J0IHR5cGUgeyBTdGF0ZVR5cGUgfSBmcm9tICcuLi9yZWR1Y2VyJztcblxuaW1wb3J0IHsgZ2V0UHJlZmVycmVkQmFkZ2VTZWxlY3RvciB9IGZyb20gJy4uL3NlbGVjdG9ycy9iYWRnZXMnO1xuaW1wb3J0IHtcbiAgZ2V0SW50bCxcbiAgZ2V0UmVnaW9uQ29kZSxcbiAgZ2V0VGhlbWUsXG4gIGdldFVzZXJDb252ZXJzYXRpb25JZCxcbiAgZ2V0VXNlck51bWJlcixcbiAgZ2V0VXNlclV1aWQsXG59IGZyb20gJy4uL3NlbGVjdG9ycy91c2VyJztcbmltcG9ydCB7IGdldE1lIH0gZnJvbSAnLi4vc2VsZWN0b3JzL2NvbnZlcnNhdGlvbnMnO1xuaW1wb3J0IHsgZ2V0U3Rvcmllc0VuYWJsZWQgfSBmcm9tICcuLi9zZWxlY3RvcnMvaXRlbXMnO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGU6IFN0YXRlVHlwZSkgPT4ge1xuICBjb25zdCBtZSA9IGdldE1lKHN0YXRlKTtcblxuICByZXR1cm4ge1xuICAgIGFyZVN0b3JpZXNFbmFibGVkOiBnZXRTdG9yaWVzRW5hYmxlZChzdGF0ZSksXG4gICAgaGFzUGVuZGluZ1VwZGF0ZTogQm9vbGVhbihzdGF0ZS51cGRhdGVzLmRpZFNub296ZSksXG4gICAgcmVnaW9uQ29kZTogZ2V0UmVnaW9uQ29kZShzdGF0ZSksXG4gICAgb3VyQ29udmVyc2F0aW9uSWQ6IGdldFVzZXJDb252ZXJzYXRpb25JZChzdGF0ZSksXG4gICAgb3VyTnVtYmVyOiBnZXRVc2VyTnVtYmVyKHN0YXRlKSxcbiAgICBvdXJVdWlkOiBnZXRVc2VyVXVpZChzdGF0ZSksXG4gICAgLi4ubWUsXG4gICAgYmFkZ2U6IGdldFByZWZlcnJlZEJhZGdlU2VsZWN0b3Ioc3RhdGUpKG1lLmJhZGdlcyksXG4gICAgdGhlbWU6IGdldFRoZW1lKHN0YXRlKSxcbiAgICBpMThuOiBnZXRJbnRsKHN0YXRlKSxcbiAgfTtcbn07XG5cbmNvbnN0IHNtYXJ0ID0gY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcyk7XG5cbmV4cG9ydCBjb25zdCBTbWFydE1haW5IZWFkZXIgPSBzbWFydChNYWluSGVhZGVyKTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSx5QkFBd0I7QUFDeEIscUJBQW1DO0FBRW5DLHdCQUEyQjtBQUczQixvQkFBMEM7QUFDMUMsa0JBT087QUFDUCwyQkFBc0I7QUFDdEIsbUJBQWtDO0FBRWxDLE1BQU0sa0JBQWtCLHdCQUFDLFVBQXFCO0FBQzVDLFFBQU0sS0FBSyxnQ0FBTSxLQUFLO0FBRXRCLFNBQU87QUFBQSxJQUNMLG1CQUFtQixvQ0FBa0IsS0FBSztBQUFBLElBQzFDLGtCQUFrQixRQUFRLE1BQU0sUUFBUSxTQUFTO0FBQUEsSUFDakQsWUFBWSwrQkFBYyxLQUFLO0FBQUEsSUFDL0IsbUJBQW1CLHVDQUFzQixLQUFLO0FBQUEsSUFDOUMsV0FBVywrQkFBYyxLQUFLO0FBQUEsSUFDOUIsU0FBUyw2QkFBWSxLQUFLO0FBQUEsT0FDdkI7QUFBQSxJQUNILE9BQU8sNkNBQTBCLEtBQUssRUFBRSxHQUFHLE1BQU07QUFBQSxJQUNqRCxPQUFPLDBCQUFTLEtBQUs7QUFBQSxJQUNyQixNQUFNLHlCQUFRLEtBQUs7QUFBQSxFQUNyQjtBQUNGLEdBZndCO0FBaUJ4QixNQUFNLFFBQVEsZ0NBQVEsaUJBQWlCLGlDQUFrQjtBQUVsRCxNQUFNLGtCQUFrQixNQUFNLDRCQUFVOyIsCiAgIm5hbWVzIjogW10KfQo=
