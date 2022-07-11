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
var GroupV2Permissions_exports = {};
__export(GroupV2Permissions_exports, {
  SmartGroupV2Permissions: () => SmartGroupV2Permissions
});
module.exports = __toCommonJS(GroupV2Permissions_exports);
var import_react_redux = require("react-redux");
var import_GroupV2Permissions = require("../../components/conversation/conversation-details/GroupV2Permissions");
var import_conversations = require("../selectors/conversations");
var import_user = require("../selectors/user");
const mapStateToProps = /* @__PURE__ */ __name((state, props) => {
  const conversation = (0, import_conversations.getConversationSelector)(state)(props.conversationId);
  return {
    ...props,
    conversation,
    i18n: (0, import_user.getIntl)(state)
  };
}, "mapStateToProps");
const smart = (0, import_react_redux.connect)(mapStateToProps);
const SmartGroupV2Permissions = smart(import_GroupV2Permissions.GroupV2Permissions);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SmartGroupV2Permissions
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiR3JvdXBWMlBlcm1pc3Npb25zLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjAgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgdHlwZSB7IFN0YXRlVHlwZSB9IGZyb20gJy4uL3JlZHVjZXInO1xuaW1wb3J0IHR5cGUgeyBQcm9wc1R5cGUgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL2NvbnZlcnNhdGlvbi9jb252ZXJzYXRpb24tZGV0YWlscy9Hcm91cFYyUGVybWlzc2lvbnMnO1xuaW1wb3J0IHsgR3JvdXBWMlBlcm1pc3Npb25zIH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9jb252ZXJzYXRpb24vY29udmVyc2F0aW9uLWRldGFpbHMvR3JvdXBWMlBlcm1pc3Npb25zJztcbmltcG9ydCB7IGdldENvbnZlcnNhdGlvblNlbGVjdG9yIH0gZnJvbSAnLi4vc2VsZWN0b3JzL2NvbnZlcnNhdGlvbnMnO1xuaW1wb3J0IHsgZ2V0SW50bCB9IGZyb20gJy4uL3NlbGVjdG9ycy91c2VyJztcblxuZXhwb3J0IHR5cGUgU21hcnRHcm91cFYyUGVybWlzc2lvbnNQcm9wcyA9IHtcbiAgY29udmVyc2F0aW9uSWQ6IHN0cmluZztcbiAgc2V0QWNjZXNzQ29udHJvbEF0dHJpYnV0ZXNTZXR0aW5nOiAodmFsdWU6IG51bWJlcikgPT4gdm9pZDtcbiAgc2V0QWNjZXNzQ29udHJvbE1lbWJlcnNTZXR0aW5nOiAodmFsdWU6IG51bWJlcikgPT4gdm9pZDtcbiAgc2V0QW5ub3VuY2VtZW50c09ubHk6ICh2YWx1ZTogYm9vbGVhbikgPT4gdm9pZDtcbn07XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChcbiAgc3RhdGU6IFN0YXRlVHlwZSxcbiAgcHJvcHM6IFNtYXJ0R3JvdXBWMlBlcm1pc3Npb25zUHJvcHNcbik6IFByb3BzVHlwZSA9PiB7XG4gIGNvbnN0IGNvbnZlcnNhdGlvbiA9IGdldENvbnZlcnNhdGlvblNlbGVjdG9yKHN0YXRlKShwcm9wcy5jb252ZXJzYXRpb25JZCk7XG5cbiAgcmV0dXJuIHtcbiAgICAuLi5wcm9wcyxcbiAgICBjb252ZXJzYXRpb24sXG4gICAgaTE4bjogZ2V0SW50bChzdGF0ZSksXG4gIH07XG59O1xuXG5jb25zdCBzbWFydCA9IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzKTtcblxuZXhwb3J0IGNvbnN0IFNtYXJ0R3JvdXBWMlBlcm1pc3Npb25zID0gc21hcnQoR3JvdXBWMlBlcm1pc3Npb25zKTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSx5QkFBd0I7QUFJeEIsZ0NBQW1DO0FBQ25DLDJCQUF3QztBQUN4QyxrQkFBd0I7QUFTeEIsTUFBTSxrQkFBa0Isd0JBQ3RCLE9BQ0EsVUFDYztBQUNkLFFBQU0sZUFBZSxrREFBd0IsS0FBSyxFQUFFLE1BQU0sY0FBYztBQUV4RSxTQUFPO0FBQUEsT0FDRjtBQUFBLElBQ0g7QUFBQSxJQUNBLE1BQU0seUJBQVEsS0FBSztBQUFBLEVBQ3JCO0FBQ0YsR0FYd0I7QUFheEIsTUFBTSxRQUFRLGdDQUFRLGVBQWU7QUFFOUIsTUFBTSwwQkFBMEIsTUFBTSw0Q0FBa0I7IiwKICAibmFtZXMiOiBbXQp9Cg==
