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
var GroupLinkManagement_stories_exports = {};
__export(GroupLinkManagement_stories_exports, {
  OffAdmin: () => OffAdmin,
  OffNonAdminUserCannotGetHere: () => OffNonAdminUserCannotGetHere,
  OnAdmin: () => OnAdmin,
  OnAdminAdminApprovalNeeded: () => OnAdminAdminApprovalNeeded,
  OnNonAdmin: () => OnNonAdmin,
  default: () => GroupLinkManagement_stories_default
});
module.exports = __toCommonJS(GroupLinkManagement_stories_exports);
var React = __toESM(require("react"));
var import_addon_actions = require("@storybook/addon-actions");
var import_setupI18n = require("../../../util/setupI18n");
var import_messages = __toESM(require("../../../../_locales/en/messages.json"));
var import_GroupLinkManagement = require("./GroupLinkManagement");
var import_protobuf = require("../../../protobuf");
var import_getDefaultConversation = require("../../../test-both/helpers/getDefaultConversation");
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
var GroupLinkManagement_stories_default = {
  title: "Components/Conversation/ConversationDetails/GroupLinkManagement"
};
const AccessControlEnum = import_protobuf.SignalService.AccessControl.AccessRequired;
function getConversation(groupLink, accessControlAddFromInviteLink) {
  return (0, import_getDefaultConversation.getDefaultConversation)({
    id: "",
    lastUpdated: 0,
    memberships: Array(32).fill({ member: (0, import_getDefaultConversation.getDefaultConversation)({}) }),
    pendingMemberships: Array(16).fill({ member: (0, import_getDefaultConversation.getDefaultConversation)({}) }),
    title: "Some Conversation",
    type: "group",
    sharedGroupNames: [],
    groupLink,
    accessControlAddFromInviteLink: accessControlAddFromInviteLink !== void 0 ? accessControlAddFromInviteLink : AccessControlEnum.UNSATISFIABLE
  });
}
const createProps = /* @__PURE__ */ __name((conversation, isAdmin = false) => ({
  changeHasGroupLink: (0, import_addon_actions.action)("changeHasGroupLink"),
  conversation: conversation || getConversation(),
  generateNewGroupLink: (0, import_addon_actions.action)("generateNewGroupLink"),
  i18n,
  isAdmin,
  setAccessControlAddFromInviteLinkSetting: (0, import_addon_actions.action)("setAccessControlAddFromInviteLinkSetting")
}), "createProps");
const OffAdmin = /* @__PURE__ */ __name(() => {
  const props = createProps(void 0, true);
  return /* @__PURE__ */ React.createElement(import_GroupLinkManagement.GroupLinkManagement, {
    ...props
  });
}, "OffAdmin");
OffAdmin.story = {
  name: "Off (Admin)"
};
const OnAdmin = /* @__PURE__ */ __name(() => {
  const props = createProps(getConversation("https://signal.group/1", AccessControlEnum.ANY), true);
  return /* @__PURE__ */ React.createElement(import_GroupLinkManagement.GroupLinkManagement, {
    ...props
  });
}, "OnAdmin");
OnAdmin.story = {
  name: "On (Admin)"
};
const OnAdminAdminApprovalNeeded = /* @__PURE__ */ __name(() => {
  const props = createProps(getConversation("https://signal.group/1", AccessControlEnum.ADMINISTRATOR), true);
  return /* @__PURE__ */ React.createElement(import_GroupLinkManagement.GroupLinkManagement, {
    ...props
  });
}, "OnAdminAdminApprovalNeeded");
OnAdminAdminApprovalNeeded.story = {
  name: "On (Admin + Admin Approval Needed)"
};
const OnNonAdmin = /* @__PURE__ */ __name(() => {
  const props = createProps(getConversation("https://signal.group/1", AccessControlEnum.ANY));
  return /* @__PURE__ */ React.createElement(import_GroupLinkManagement.GroupLinkManagement, {
    ...props
  });
}, "OnNonAdmin");
OnNonAdmin.story = {
  name: "On (Non-admin)"
};
const OffNonAdminUserCannotGetHere = /* @__PURE__ */ __name(() => {
  const props = createProps(void 0, false);
  return /* @__PURE__ */ React.createElement(import_GroupLinkManagement.GroupLinkManagement, {
    ...props
  });
}, "OffNonAdminUserCannotGetHere");
OffNonAdminUserCannotGetHere.story = {
  name: "Off (Non-admin) - user cannot get here"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  OffAdmin,
  OffNonAdminUserCannotGetHere,
  OnAdmin,
  OnAdminAdminApprovalNeeded,
  OnNonAdmin
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiR3JvdXBMaW5rTWFuYWdlbWVudC5zdG9yaWVzLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IGFjdGlvbiB9IGZyb20gJ0BzdG9yeWJvb2svYWRkb24tYWN0aW9ucyc7XG5cbmltcG9ydCB7IHNldHVwSTE4biB9IGZyb20gJy4uLy4uLy4uL3V0aWwvc2V0dXBJMThuJztcbmltcG9ydCBlbk1lc3NhZ2VzIGZyb20gJy4uLy4uLy4uLy4uL19sb2NhbGVzL2VuL21lc3NhZ2VzLmpzb24nO1xuaW1wb3J0IHR5cGUgeyBQcm9wc1R5cGUgfSBmcm9tICcuL0dyb3VwTGlua01hbmFnZW1lbnQnO1xuaW1wb3J0IHsgR3JvdXBMaW5rTWFuYWdlbWVudCB9IGZyb20gJy4vR3JvdXBMaW5rTWFuYWdlbWVudCc7XG5pbXBvcnQgeyBTaWduYWxTZXJ2aWNlIGFzIFByb3RvIH0gZnJvbSAnLi4vLi4vLi4vcHJvdG9idWYnO1xuaW1wb3J0IHR5cGUgeyBDb252ZXJzYXRpb25UeXBlIH0gZnJvbSAnLi4vLi4vLi4vc3RhdGUvZHVja3MvY29udmVyc2F0aW9ucyc7XG5pbXBvcnQgeyBnZXREZWZhdWx0Q29udmVyc2F0aW9uIH0gZnJvbSAnLi4vLi4vLi4vdGVzdC1ib3RoL2hlbHBlcnMvZ2V0RGVmYXVsdENvbnZlcnNhdGlvbic7XG5cbmNvbnN0IGkxOG4gPSBzZXR1cEkxOG4oJ2VuJywgZW5NZXNzYWdlcyk7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgdGl0bGU6ICdDb21wb25lbnRzL0NvbnZlcnNhdGlvbi9Db252ZXJzYXRpb25EZXRhaWxzL0dyb3VwTGlua01hbmFnZW1lbnQnLFxufTtcblxuY29uc3QgQWNjZXNzQ29udHJvbEVudW0gPSBQcm90by5BY2Nlc3NDb250cm9sLkFjY2Vzc1JlcXVpcmVkO1xuXG5mdW5jdGlvbiBnZXRDb252ZXJzYXRpb24oXG4gIGdyb3VwTGluaz86IHN0cmluZyxcbiAgYWNjZXNzQ29udHJvbEFkZEZyb21JbnZpdGVMaW5rPzogbnVtYmVyXG4pOiBDb252ZXJzYXRpb25UeXBlIHtcbiAgcmV0dXJuIGdldERlZmF1bHRDb252ZXJzYXRpb24oe1xuICAgIGlkOiAnJyxcbiAgICBsYXN0VXBkYXRlZDogMCxcbiAgICBtZW1iZXJzaGlwczogQXJyYXkoMzIpLmZpbGwoeyBtZW1iZXI6IGdldERlZmF1bHRDb252ZXJzYXRpb24oe30pIH0pLFxuICAgIHBlbmRpbmdNZW1iZXJzaGlwczogQXJyYXkoMTYpLmZpbGwoeyBtZW1iZXI6IGdldERlZmF1bHRDb252ZXJzYXRpb24oe30pIH0pLFxuICAgIHRpdGxlOiAnU29tZSBDb252ZXJzYXRpb24nLFxuICAgIHR5cGU6ICdncm91cCcsXG4gICAgc2hhcmVkR3JvdXBOYW1lczogW10sXG4gICAgZ3JvdXBMaW5rLFxuICAgIGFjY2Vzc0NvbnRyb2xBZGRGcm9tSW52aXRlTGluazpcbiAgICAgIGFjY2Vzc0NvbnRyb2xBZGRGcm9tSW52aXRlTGluayAhPT0gdW5kZWZpbmVkXG4gICAgICAgID8gYWNjZXNzQ29udHJvbEFkZEZyb21JbnZpdGVMaW5rXG4gICAgICAgIDogQWNjZXNzQ29udHJvbEVudW0uVU5TQVRJU0ZJQUJMRSxcbiAgfSk7XG59XG5cbmNvbnN0IGNyZWF0ZVByb3BzID0gKFxuICBjb252ZXJzYXRpb24/OiBDb252ZXJzYXRpb25UeXBlLFxuICBpc0FkbWluID0gZmFsc2Vcbik6IFByb3BzVHlwZSA9PiAoe1xuICBjaGFuZ2VIYXNHcm91cExpbms6IGFjdGlvbignY2hhbmdlSGFzR3JvdXBMaW5rJyksXG4gIGNvbnZlcnNhdGlvbjogY29udmVyc2F0aW9uIHx8IGdldENvbnZlcnNhdGlvbigpLFxuICBnZW5lcmF0ZU5ld0dyb3VwTGluazogYWN0aW9uKCdnZW5lcmF0ZU5ld0dyb3VwTGluaycpLFxuICBpMThuLFxuICBpc0FkbWluLFxuICBzZXRBY2Nlc3NDb250cm9sQWRkRnJvbUludml0ZUxpbmtTZXR0aW5nOiBhY3Rpb24oXG4gICAgJ3NldEFjY2Vzc0NvbnRyb2xBZGRGcm9tSW52aXRlTGlua1NldHRpbmcnXG4gICksXG59KTtcblxuZXhwb3J0IGNvbnN0IE9mZkFkbWluID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgcHJvcHMgPSBjcmVhdGVQcm9wcyh1bmRlZmluZWQsIHRydWUpO1xuXG4gIHJldHVybiA8R3JvdXBMaW5rTWFuYWdlbWVudCB7Li4ucHJvcHN9IC8+O1xufTtcblxuT2ZmQWRtaW4uc3RvcnkgPSB7XG4gIG5hbWU6ICdPZmYgKEFkbWluKScsXG59O1xuXG5leHBvcnQgY29uc3QgT25BZG1pbiA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IHByb3BzID0gY3JlYXRlUHJvcHMoXG4gICAgZ2V0Q29udmVyc2F0aW9uKCdodHRwczovL3NpZ25hbC5ncm91cC8xJywgQWNjZXNzQ29udHJvbEVudW0uQU5ZKSxcbiAgICB0cnVlXG4gICk7XG5cbiAgcmV0dXJuIDxHcm91cExpbmtNYW5hZ2VtZW50IHsuLi5wcm9wc30gLz47XG59O1xuXG5PbkFkbWluLnN0b3J5ID0ge1xuICBuYW1lOiAnT24gKEFkbWluKScsXG59O1xuXG5leHBvcnQgY29uc3QgT25BZG1pbkFkbWluQXBwcm92YWxOZWVkZWQgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBwcm9wcyA9IGNyZWF0ZVByb3BzKFxuICAgIGdldENvbnZlcnNhdGlvbignaHR0cHM6Ly9zaWduYWwuZ3JvdXAvMScsIEFjY2Vzc0NvbnRyb2xFbnVtLkFETUlOSVNUUkFUT1IpLFxuICAgIHRydWVcbiAgKTtcblxuICByZXR1cm4gPEdyb3VwTGlua01hbmFnZW1lbnQgey4uLnByb3BzfSAvPjtcbn07XG5cbk9uQWRtaW5BZG1pbkFwcHJvdmFsTmVlZGVkLnN0b3J5ID0ge1xuICBuYW1lOiAnT24gKEFkbWluICsgQWRtaW4gQXBwcm92YWwgTmVlZGVkKScsXG59O1xuXG5leHBvcnQgY29uc3QgT25Ob25BZG1pbiA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IHByb3BzID0gY3JlYXRlUHJvcHMoXG4gICAgZ2V0Q29udmVyc2F0aW9uKCdodHRwczovL3NpZ25hbC5ncm91cC8xJywgQWNjZXNzQ29udHJvbEVudW0uQU5ZKVxuICApO1xuXG4gIHJldHVybiA8R3JvdXBMaW5rTWFuYWdlbWVudCB7Li4ucHJvcHN9IC8+O1xufTtcblxuT25Ob25BZG1pbi5zdG9yeSA9IHtcbiAgbmFtZTogJ09uIChOb24tYWRtaW4pJyxcbn07XG5cbmV4cG9ydCBjb25zdCBPZmZOb25BZG1pblVzZXJDYW5ub3RHZXRIZXJlID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgcHJvcHMgPSBjcmVhdGVQcm9wcyh1bmRlZmluZWQsIGZhbHNlKTtcblxuICByZXR1cm4gPEdyb3VwTGlua01hbmFnZW1lbnQgey4uLnByb3BzfSAvPjtcbn07XG5cbk9mZk5vbkFkbWluVXNlckNhbm5vdEdldEhlcmUuc3RvcnkgPSB7XG4gIG5hbWU6ICdPZmYgKE5vbi1hZG1pbikgLSB1c2VyIGNhbm5vdCBnZXQgaGVyZScsXG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxZQUF1QjtBQUV2QiwyQkFBdUI7QUFFdkIsdUJBQTBCO0FBQzFCLHNCQUF1QjtBQUV2QixpQ0FBb0M7QUFDcEMsc0JBQXVDO0FBRXZDLG9DQUF1QztBQUV2QyxNQUFNLE9BQU8sZ0NBQVUsTUFBTSx1QkFBVTtBQUV2QyxJQUFPLHNDQUFRO0FBQUEsRUFDYixPQUFPO0FBQ1Q7QUFFQSxNQUFNLG9CQUFvQiw4QkFBTSxjQUFjO0FBRTlDLHlCQUNFLFdBQ0EsZ0NBQ2tCO0FBQ2xCLFNBQU8sMERBQXVCO0FBQUEsSUFDNUIsSUFBSTtBQUFBLElBQ0osYUFBYTtBQUFBLElBQ2IsYUFBYSxNQUFNLEVBQUUsRUFBRSxLQUFLLEVBQUUsUUFBUSwwREFBdUIsQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQUFBLElBQ2xFLG9CQUFvQixNQUFNLEVBQUUsRUFBRSxLQUFLLEVBQUUsUUFBUSwwREFBdUIsQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQUFBLElBQ3pFLE9BQU87QUFBQSxJQUNQLE1BQU07QUFBQSxJQUNOLGtCQUFrQixDQUFDO0FBQUEsSUFDbkI7QUFBQSxJQUNBLGdDQUNFLG1DQUFtQyxTQUMvQixpQ0FDQSxrQkFBa0I7QUFBQSxFQUMxQixDQUFDO0FBQ0g7QUFsQlMsQUFvQlQsTUFBTSxjQUFjLHdCQUNsQixjQUNBLFVBQVUsVUFDSztBQUFBLEVBQ2Ysb0JBQW9CLGlDQUFPLG9CQUFvQjtBQUFBLEVBQy9DLGNBQWMsZ0JBQWdCLGdCQUFnQjtBQUFBLEVBQzlDLHNCQUFzQixpQ0FBTyxzQkFBc0I7QUFBQSxFQUNuRDtBQUFBLEVBQ0E7QUFBQSxFQUNBLDBDQUEwQyxpQ0FDeEMsMENBQ0Y7QUFDRixJQVpvQjtBQWNiLE1BQU0sV0FBVyw2QkFBbUI7QUFDekMsUUFBTSxRQUFRLFlBQVksUUFBVyxJQUFJO0FBRXpDLFNBQU8sb0NBQUM7QUFBQSxPQUF3QjtBQUFBLEdBQU87QUFDekMsR0FKd0I7QUFNeEIsU0FBUyxRQUFRO0FBQUEsRUFDZixNQUFNO0FBQ1I7QUFFTyxNQUFNLFVBQVUsNkJBQW1CO0FBQ3hDLFFBQU0sUUFBUSxZQUNaLGdCQUFnQiwwQkFBMEIsa0JBQWtCLEdBQUcsR0FDL0QsSUFDRjtBQUVBLFNBQU8sb0NBQUM7QUFBQSxPQUF3QjtBQUFBLEdBQU87QUFDekMsR0FQdUI7QUFTdkIsUUFBUSxRQUFRO0FBQUEsRUFDZCxNQUFNO0FBQ1I7QUFFTyxNQUFNLDZCQUE2Qiw2QkFBbUI7QUFDM0QsUUFBTSxRQUFRLFlBQ1osZ0JBQWdCLDBCQUEwQixrQkFBa0IsYUFBYSxHQUN6RSxJQUNGO0FBRUEsU0FBTyxvQ0FBQztBQUFBLE9BQXdCO0FBQUEsR0FBTztBQUN6QyxHQVAwQztBQVMxQywyQkFBMkIsUUFBUTtBQUFBLEVBQ2pDLE1BQU07QUFDUjtBQUVPLE1BQU0sYUFBYSw2QkFBbUI7QUFDM0MsUUFBTSxRQUFRLFlBQ1osZ0JBQWdCLDBCQUEwQixrQkFBa0IsR0FBRyxDQUNqRTtBQUVBLFNBQU8sb0NBQUM7QUFBQSxPQUF3QjtBQUFBLEdBQU87QUFDekMsR0FOMEI7QUFRMUIsV0FBVyxRQUFRO0FBQUEsRUFDakIsTUFBTTtBQUNSO0FBRU8sTUFBTSwrQkFBK0IsNkJBQW1CO0FBQzdELFFBQU0sUUFBUSxZQUFZLFFBQVcsS0FBSztBQUUxQyxTQUFPLG9DQUFDO0FBQUEsT0FBd0I7QUFBQSxHQUFPO0FBQ3pDLEdBSjRDO0FBTTVDLDZCQUE2QixRQUFRO0FBQUEsRUFDbkMsTUFBTTtBQUNSOyIsCiAgIm5hbWVzIjogW10KfQo=
