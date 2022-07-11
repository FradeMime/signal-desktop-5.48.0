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
var GroupLinkManagement_exports = {};
__export(GroupLinkManagement_exports, {
  SmartGroupLinkManagement: () => SmartGroupLinkManagement
});
module.exports = __toCommonJS(GroupLinkManagement_exports);
var import_react_redux = require("react-redux");
var import_GroupLinkManagement = require("../../components/conversation/conversation-details/GroupLinkManagement");
var import_conversations = require("../selectors/conversations");
var import_user = require("../selectors/user");
var import_actions = require("../actions");
const mapStateToProps = /* @__PURE__ */ __name((state, props) => {
  const conversation = (0, import_conversations.getConversationSelector)(state)(props.conversationId);
  const isAdmin = Boolean(conversation?.areWeAdmin);
  return {
    ...props,
    conversation,
    i18n: (0, import_user.getIntl)(state),
    isAdmin
  };
}, "mapStateToProps");
const smart = (0, import_react_redux.connect)(mapStateToProps, import_actions.mapDispatchToProps);
const SmartGroupLinkManagement = smart(import_GroupLinkManagement.GroupLinkManagement);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SmartGroupLinkManagement
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiR3JvdXBMaW5rTWFuYWdlbWVudC50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIwIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IHR5cGUgeyBQcm9wc0RhdGFUeXBlIH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9jb252ZXJzYXRpb24vY29udmVyc2F0aW9uLWRldGFpbHMvR3JvdXBMaW5rTWFuYWdlbWVudCc7XG5pbXBvcnQgdHlwZSB7IFN0YXRlVHlwZSB9IGZyb20gJy4uL3JlZHVjZXInO1xuaW1wb3J0IHsgR3JvdXBMaW5rTWFuYWdlbWVudCB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvY29udmVyc2F0aW9uL2NvbnZlcnNhdGlvbi1kZXRhaWxzL0dyb3VwTGlua01hbmFnZW1lbnQnO1xuaW1wb3J0IHsgZ2V0Q29udmVyc2F0aW9uU2VsZWN0b3IgfSBmcm9tICcuLi9zZWxlY3RvcnMvY29udmVyc2F0aW9ucyc7XG5pbXBvcnQgeyBnZXRJbnRsIH0gZnJvbSAnLi4vc2VsZWN0b3JzL3VzZXInO1xuaW1wb3J0IHsgbWFwRGlzcGF0Y2hUb1Byb3BzIH0gZnJvbSAnLi4vYWN0aW9ucyc7XG5cbmV4cG9ydCB0eXBlIFNtYXJ0R3JvdXBMaW5rTWFuYWdlbWVudFByb3BzID0ge1xuICBjb252ZXJzYXRpb25JZDogc3RyaW5nO1xufTtcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKFxuICBzdGF0ZTogU3RhdGVUeXBlLFxuICBwcm9wczogU21hcnRHcm91cExpbmtNYW5hZ2VtZW50UHJvcHNcbik6IFByb3BzRGF0YVR5cGUgPT4ge1xuICBjb25zdCBjb252ZXJzYXRpb24gPSBnZXRDb252ZXJzYXRpb25TZWxlY3RvcihzdGF0ZSkocHJvcHMuY29udmVyc2F0aW9uSWQpO1xuICBjb25zdCBpc0FkbWluID0gQm9vbGVhbihjb252ZXJzYXRpb24/LmFyZVdlQWRtaW4pO1xuXG4gIHJldHVybiB7XG4gICAgLi4ucHJvcHMsXG4gICAgY29udmVyc2F0aW9uLFxuICAgIGkxOG46IGdldEludGwoc3RhdGUpLFxuICAgIGlzQWRtaW4sXG4gIH07XG59O1xuXG5jb25zdCBzbWFydCA9IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpO1xuXG5leHBvcnQgY29uc3QgU21hcnRHcm91cExpbmtNYW5hZ2VtZW50ID0gc21hcnQoR3JvdXBMaW5rTWFuYWdlbWVudCk7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EseUJBQXdCO0FBSXhCLGlDQUFvQztBQUNwQywyQkFBd0M7QUFDeEMsa0JBQXdCO0FBQ3hCLHFCQUFtQztBQU1uQyxNQUFNLGtCQUFrQix3QkFDdEIsT0FDQSxVQUNrQjtBQUNsQixRQUFNLGVBQWUsa0RBQXdCLEtBQUssRUFBRSxNQUFNLGNBQWM7QUFDeEUsUUFBTSxVQUFVLFFBQVEsY0FBYyxVQUFVO0FBRWhELFNBQU87QUFBQSxPQUNGO0FBQUEsSUFDSDtBQUFBLElBQ0EsTUFBTSx5QkFBUSxLQUFLO0FBQUEsSUFDbkI7QUFBQSxFQUNGO0FBQ0YsR0Fid0I7QUFleEIsTUFBTSxRQUFRLGdDQUFRLGlCQUFpQixpQ0FBa0I7QUFFbEQsTUFBTSwyQkFBMkIsTUFBTSw4Q0FBbUI7IiwKICAibmFtZXMiOiBbXQp9Cg==
