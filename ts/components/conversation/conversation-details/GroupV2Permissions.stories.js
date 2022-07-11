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
var GroupV2Permissions_stories_exports = {};
__export(GroupV2Permissions_stories_exports, {
  AdminButNotAnnouncementReady: () => AdminButNotAnnouncementReady,
  AdminNotAnnouncementReadyButItWasOn: () => AdminNotAnnouncementReadyButItWasOn,
  Basic: () => Basic,
  NotAdmin: () => NotAdmin,
  default: () => GroupV2Permissions_stories_default
});
module.exports = __toCommonJS(GroupV2Permissions_stories_exports);
var React = __toESM(require("react"));
var import_addon_actions = require("@storybook/addon-actions");
var import_setupI18n = require("../../../util/setupI18n");
var import_messages = __toESM(require("../../../../_locales/en/messages.json"));
var import_GroupV2Permissions = require("./GroupV2Permissions");
var import_getDefaultConversation = require("../../../test-both/helpers/getDefaultConversation");
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
var GroupV2Permissions_stories_default = {
  title: "Components/Conversation/ConversationDetails/GroupV2Permissions"
};
const conversation = (0, import_getDefaultConversation.getDefaultConversation)({
  id: "",
  lastUpdated: 0,
  memberships: Array(32).fill({ member: (0, import_getDefaultConversation.getDefaultConversation)({}) }),
  pendingMemberships: Array(16).fill({ member: (0, import_getDefaultConversation.getDefaultConversation)({}) }),
  title: "Some Conversation",
  type: "group",
  sharedGroupNames: [],
  announcementsOnlyReady: true,
  areWeAdmin: true
});
const createProps = /* @__PURE__ */ __name(() => ({
  conversation,
  i18n,
  setAccessControlAttributesSetting: (0, import_addon_actions.action)("setAccessControlAttributesSetting"),
  setAccessControlMembersSetting: (0, import_addon_actions.action)("setAccessControlMembersSetting"),
  setAnnouncementsOnly: (0, import_addon_actions.action)("setAnnouncementsOnly")
}), "createProps");
const Basic = /* @__PURE__ */ __name(() => {
  const props = createProps();
  return /* @__PURE__ */ React.createElement(import_GroupV2Permissions.GroupV2Permissions, {
    ...props
  });
}, "Basic");
const NotAdmin = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_GroupV2Permissions.GroupV2Permissions, {
  ...createProps(),
  conversation: (0, import_getDefaultConversation.getDefaultConversation)({
    announcementsOnly: true,
    areWeAdmin: false
  })
}), "NotAdmin");
NotAdmin.story = {
  name: "Not admin"
};
const AdminButNotAnnouncementReady = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_GroupV2Permissions.GroupV2Permissions, {
  ...createProps(),
  conversation: (0, import_getDefaultConversation.getDefaultConversation)({
    announcementsOnlyReady: false,
    areWeAdmin: true
  })
}), "AdminButNotAnnouncementReady");
AdminButNotAnnouncementReady.story = {
  name: "Admin but not announcement ready"
};
const AdminNotAnnouncementReadyButItWasOn = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_GroupV2Permissions.GroupV2Permissions, {
  ...createProps(),
  conversation: (0, import_getDefaultConversation.getDefaultConversation)({
    announcementsOnly: true,
    announcementsOnlyReady: false,
    areWeAdmin: true
  })
}), "AdminNotAnnouncementReadyButItWasOn");
AdminNotAnnouncementReadyButItWasOn.story = {
  name: "Admin, not announcement ready, but it was on"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AdminButNotAnnouncementReady,
  AdminNotAnnouncementReadyButItWasOn,
  Basic,
  NotAdmin
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiR3JvdXBWMlBlcm1pc3Npb25zLnN0b3JpZXMudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMC0yMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgeyBhY3Rpb24gfSBmcm9tICdAc3Rvcnlib29rL2FkZG9uLWFjdGlvbnMnO1xuXG5pbXBvcnQgeyBzZXR1cEkxOG4gfSBmcm9tICcuLi8uLi8uLi91dGlsL3NldHVwSTE4bic7XG5pbXBvcnQgZW5NZXNzYWdlcyBmcm9tICcuLi8uLi8uLi8uLi9fbG9jYWxlcy9lbi9tZXNzYWdlcy5qc29uJztcbmltcG9ydCB0eXBlIHsgUHJvcHNUeXBlIH0gZnJvbSAnLi9Hcm91cFYyUGVybWlzc2lvbnMnO1xuaW1wb3J0IHsgR3JvdXBWMlBlcm1pc3Npb25zIH0gZnJvbSAnLi9Hcm91cFYyUGVybWlzc2lvbnMnO1xuaW1wb3J0IHR5cGUgeyBDb252ZXJzYXRpb25UeXBlIH0gZnJvbSAnLi4vLi4vLi4vc3RhdGUvZHVja3MvY29udmVyc2F0aW9ucyc7XG5pbXBvcnQgeyBnZXREZWZhdWx0Q29udmVyc2F0aW9uIH0gZnJvbSAnLi4vLi4vLi4vdGVzdC1ib3RoL2hlbHBlcnMvZ2V0RGVmYXVsdENvbnZlcnNhdGlvbic7XG5cbmNvbnN0IGkxOG4gPSBzZXR1cEkxOG4oJ2VuJywgZW5NZXNzYWdlcyk7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgdGl0bGU6ICdDb21wb25lbnRzL0NvbnZlcnNhdGlvbi9Db252ZXJzYXRpb25EZXRhaWxzL0dyb3VwVjJQZXJtaXNzaW9ucycsXG59O1xuXG5jb25zdCBjb252ZXJzYXRpb246IENvbnZlcnNhdGlvblR5cGUgPSBnZXREZWZhdWx0Q29udmVyc2F0aW9uKHtcbiAgaWQ6ICcnLFxuICBsYXN0VXBkYXRlZDogMCxcbiAgbWVtYmVyc2hpcHM6IEFycmF5KDMyKS5maWxsKHsgbWVtYmVyOiBnZXREZWZhdWx0Q29udmVyc2F0aW9uKHt9KSB9KSxcbiAgcGVuZGluZ01lbWJlcnNoaXBzOiBBcnJheSgxNikuZmlsbCh7IG1lbWJlcjogZ2V0RGVmYXVsdENvbnZlcnNhdGlvbih7fSkgfSksXG4gIHRpdGxlOiAnU29tZSBDb252ZXJzYXRpb24nLFxuICB0eXBlOiAnZ3JvdXAnLFxuICBzaGFyZWRHcm91cE5hbWVzOiBbXSxcbiAgYW5ub3VuY2VtZW50c09ubHlSZWFkeTogdHJ1ZSxcbiAgYXJlV2VBZG1pbjogdHJ1ZSxcbn0pO1xuXG5jb25zdCBjcmVhdGVQcm9wcyA9ICgpOiBQcm9wc1R5cGUgPT4gKHtcbiAgY29udmVyc2F0aW9uLFxuICBpMThuLFxuICBzZXRBY2Nlc3NDb250cm9sQXR0cmlidXRlc1NldHRpbmc6IGFjdGlvbihcbiAgICAnc2V0QWNjZXNzQ29udHJvbEF0dHJpYnV0ZXNTZXR0aW5nJ1xuICApLFxuICBzZXRBY2Nlc3NDb250cm9sTWVtYmVyc1NldHRpbmc6IGFjdGlvbignc2V0QWNjZXNzQ29udHJvbE1lbWJlcnNTZXR0aW5nJyksXG4gIHNldEFubm91bmNlbWVudHNPbmx5OiBhY3Rpb24oJ3NldEFubm91bmNlbWVudHNPbmx5JyksXG59KTtcblxuZXhwb3J0IGNvbnN0IEJhc2ljID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgcHJvcHMgPSBjcmVhdGVQcm9wcygpO1xuXG4gIHJldHVybiA8R3JvdXBWMlBlcm1pc3Npb25zIHsuLi5wcm9wc30gLz47XG59O1xuXG5leHBvcnQgY29uc3QgTm90QWRtaW4gPSAoKTogSlNYLkVsZW1lbnQgPT4gKFxuICA8R3JvdXBWMlBlcm1pc3Npb25zXG4gICAgey4uLmNyZWF0ZVByb3BzKCl9XG4gICAgY29udmVyc2F0aW9uPXtnZXREZWZhdWx0Q29udmVyc2F0aW9uKHtcbiAgICAgIGFubm91bmNlbWVudHNPbmx5OiB0cnVlLFxuICAgICAgYXJlV2VBZG1pbjogZmFsc2UsXG4gICAgfSl9XG4gIC8+XG4pO1xuXG5Ob3RBZG1pbi5zdG9yeSA9IHtcbiAgbmFtZTogJ05vdCBhZG1pbicsXG59O1xuXG5leHBvcnQgY29uc3QgQWRtaW5CdXROb3RBbm5vdW5jZW1lbnRSZWFkeSA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxHcm91cFYyUGVybWlzc2lvbnNcbiAgICB7Li4uY3JlYXRlUHJvcHMoKX1cbiAgICBjb252ZXJzYXRpb249e2dldERlZmF1bHRDb252ZXJzYXRpb24oe1xuICAgICAgYW5ub3VuY2VtZW50c09ubHlSZWFkeTogZmFsc2UsXG4gICAgICBhcmVXZUFkbWluOiB0cnVlLFxuICAgIH0pfVxuICAvPlxuKTtcblxuQWRtaW5CdXROb3RBbm5vdW5jZW1lbnRSZWFkeS5zdG9yeSA9IHtcbiAgbmFtZTogJ0FkbWluIGJ1dCBub3QgYW5ub3VuY2VtZW50IHJlYWR5Jyxcbn07XG5cbmV4cG9ydCBjb25zdCBBZG1pbk5vdEFubm91bmNlbWVudFJlYWR5QnV0SXRXYXNPbiA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxHcm91cFYyUGVybWlzc2lvbnNcbiAgICB7Li4uY3JlYXRlUHJvcHMoKX1cbiAgICBjb252ZXJzYXRpb249e2dldERlZmF1bHRDb252ZXJzYXRpb24oe1xuICAgICAgYW5ub3VuY2VtZW50c09ubHk6IHRydWUsXG4gICAgICBhbm5vdW5jZW1lbnRzT25seVJlYWR5OiBmYWxzZSxcbiAgICAgIGFyZVdlQWRtaW46IHRydWUsXG4gICAgfSl9XG4gIC8+XG4pO1xuXG5BZG1pbk5vdEFubm91bmNlbWVudFJlYWR5QnV0SXRXYXNPbi5zdG9yeSA9IHtcbiAgbmFtZTogJ0FkbWluLCBub3QgYW5ub3VuY2VtZW50IHJlYWR5LCBidXQgaXQgd2FzIG9uJyxcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxZQUF1QjtBQUV2QiwyQkFBdUI7QUFFdkIsdUJBQTBCO0FBQzFCLHNCQUF1QjtBQUV2QixnQ0FBbUM7QUFFbkMsb0NBQXVDO0FBRXZDLE1BQU0sT0FBTyxnQ0FBVSxNQUFNLHVCQUFVO0FBRXZDLElBQU8scUNBQVE7QUFBQSxFQUNiLE9BQU87QUFDVDtBQUVBLE1BQU0sZUFBaUMsMERBQXVCO0FBQUEsRUFDNUQsSUFBSTtBQUFBLEVBQ0osYUFBYTtBQUFBLEVBQ2IsYUFBYSxNQUFNLEVBQUUsRUFBRSxLQUFLLEVBQUUsUUFBUSwwREFBdUIsQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQUFBLEVBQ2xFLG9CQUFvQixNQUFNLEVBQUUsRUFBRSxLQUFLLEVBQUUsUUFBUSwwREFBdUIsQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQUFBLEVBQ3pFLE9BQU87QUFBQSxFQUNQLE1BQU07QUFBQSxFQUNOLGtCQUFrQixDQUFDO0FBQUEsRUFDbkIsd0JBQXdCO0FBQUEsRUFDeEIsWUFBWTtBQUNkLENBQUM7QUFFRCxNQUFNLGNBQWMsNkJBQWtCO0FBQUEsRUFDcEM7QUFBQSxFQUNBO0FBQUEsRUFDQSxtQ0FBbUMsaUNBQ2pDLG1DQUNGO0FBQUEsRUFDQSxnQ0FBZ0MsaUNBQU8sZ0NBQWdDO0FBQUEsRUFDdkUsc0JBQXNCLGlDQUFPLHNCQUFzQjtBQUNyRCxJQVJvQjtBQVViLE1BQU0sUUFBUSw2QkFBbUI7QUFDdEMsUUFBTSxRQUFRLFlBQVk7QUFFMUIsU0FBTyxvQ0FBQztBQUFBLE9BQXVCO0FBQUEsR0FBTztBQUN4QyxHQUpxQjtBQU1kLE1BQU0sV0FBVyw2QkFDdEIsb0NBQUM7QUFBQSxLQUNLLFlBQVk7QUFBQSxFQUNoQixjQUFjLDBEQUF1QjtBQUFBLElBQ25DLG1CQUFtQjtBQUFBLElBQ25CLFlBQVk7QUFBQSxFQUNkLENBQUM7QUFBQSxDQUNILEdBUHNCO0FBVXhCLFNBQVMsUUFBUTtBQUFBLEVBQ2YsTUFBTTtBQUNSO0FBRU8sTUFBTSwrQkFBK0IsNkJBQzFDLG9DQUFDO0FBQUEsS0FDSyxZQUFZO0FBQUEsRUFDaEIsY0FBYywwREFBdUI7QUFBQSxJQUNuQyx3QkFBd0I7QUFBQSxJQUN4QixZQUFZO0FBQUEsRUFDZCxDQUFDO0FBQUEsQ0FDSCxHQVAwQztBQVU1Qyw2QkFBNkIsUUFBUTtBQUFBLEVBQ25DLE1BQU07QUFDUjtBQUVPLE1BQU0sc0NBQXNDLDZCQUNqRCxvQ0FBQztBQUFBLEtBQ0ssWUFBWTtBQUFBLEVBQ2hCLGNBQWMsMERBQXVCO0FBQUEsSUFDbkMsbUJBQW1CO0FBQUEsSUFDbkIsd0JBQXdCO0FBQUEsSUFDeEIsWUFBWTtBQUFBLEVBQ2QsQ0FBQztBQUFBLENBQ0gsR0FSaUQ7QUFXbkQsb0NBQW9DLFFBQVE7QUFBQSxFQUMxQyxNQUFNO0FBQ1I7IiwKICAibmFtZXMiOiBbXQp9Cg==
