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
var GroupV2Permissions_exports = {};
__export(GroupV2Permissions_exports, {
  GroupV2Permissions: () => GroupV2Permissions
});
module.exports = __toCommonJS(GroupV2Permissions_exports);
var import_react = __toESM(require("react"));
var import_getAccessControlOptions = require("../../../util/getAccessControlOptions");
var import_protobuf = require("../../../protobuf");
var import_PanelRow = require("./PanelRow");
var import_PanelSection = require("./PanelSection");
var import_Select = require("../../Select");
var import_useUniqueId = require("../../../hooks/useUniqueId");
const GroupV2Permissions = /* @__PURE__ */ __name(({
  conversation,
  i18n,
  setAccessControlAttributesSetting,
  setAccessControlMembersSetting,
  setAnnouncementsOnly
}) => {
  const addMembersSelectId = (0, import_useUniqueId.useUniqueId)();
  const groupInfoSelectId = (0, import_useUniqueId.useUniqueId)();
  const announcementSelectId = (0, import_useUniqueId.useUniqueId)();
  if (conversation === void 0) {
    throw new Error("GroupV2Permissions rendered without a conversation");
  }
  const updateAccessControlAttributes = /* @__PURE__ */ __name((value) => {
    setAccessControlAttributesSetting(Number(value));
  }, "updateAccessControlAttributes");
  const updateAccessControlMembers = /* @__PURE__ */ __name((value) => {
    setAccessControlMembersSetting(Number(value));
  }, "updateAccessControlMembers");
  const AccessControlEnum = import_protobuf.SignalService.AccessControl.AccessRequired;
  const updateAnnouncementsOnly = /* @__PURE__ */ __name((value) => {
    setAnnouncementsOnly(Number(value) === AccessControlEnum.ADMINISTRATOR);
  }, "updateAnnouncementsOnly");
  const accessControlOptions = (0, import_getAccessControlOptions.getAccessControlOptions)(i18n);
  const announcementsOnlyValue = String(conversation.announcementsOnly ? AccessControlEnum.ADMINISTRATOR : AccessControlEnum.MEMBER);
  const showAnnouncementsOnlyPermission = conversation.areWeAdmin && (conversation.announcementsOnly || conversation.announcementsOnlyReady);
  return /* @__PURE__ */ import_react.default.createElement(import_PanelSection.PanelSection, null, /* @__PURE__ */ import_react.default.createElement(import_PanelRow.PanelRow, {
    label: /* @__PURE__ */ import_react.default.createElement("label", {
      htmlFor: addMembersSelectId
    }, i18n("ConversationDetails--add-members-label")),
    info: i18n("ConversationDetails--add-members-info"),
    right: /* @__PURE__ */ import_react.default.createElement(import_Select.Select, {
      id: addMembersSelectId,
      onChange: updateAccessControlMembers,
      options: accessControlOptions,
      value: String(conversation.accessControlMembers)
    })
  }), /* @__PURE__ */ import_react.default.createElement(import_PanelRow.PanelRow, {
    label: /* @__PURE__ */ import_react.default.createElement("label", {
      htmlFor: groupInfoSelectId
    }, i18n("ConversationDetails--group-info-label")),
    info: i18n("ConversationDetails--group-info-info"),
    right: /* @__PURE__ */ import_react.default.createElement(import_Select.Select, {
      id: groupInfoSelectId,
      onChange: updateAccessControlAttributes,
      options: accessControlOptions,
      value: String(conversation.accessControlAttributes)
    })
  }), showAnnouncementsOnlyPermission && /* @__PURE__ */ import_react.default.createElement(import_PanelRow.PanelRow, {
    label: /* @__PURE__ */ import_react.default.createElement("label", {
      htmlFor: announcementSelectId
    }, i18n("ConversationDetails--announcement-label")),
    info: i18n("ConversationDetails--announcement-info"),
    right: /* @__PURE__ */ import_react.default.createElement(import_Select.Select, {
      id: announcementSelectId,
      onChange: updateAnnouncementsOnly,
      options: accessControlOptions,
      value: announcementsOnlyValue
    })
  }));
}, "GroupV2Permissions");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GroupV2Permissions
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiR3JvdXBWMlBlcm1pc3Npb25zLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjAtMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB0eXBlIHsgQ29udmVyc2F0aW9uVHlwZSB9IGZyb20gJy4uLy4uLy4uL3N0YXRlL2R1Y2tzL2NvbnZlcnNhdGlvbnMnO1xuaW1wb3J0IHR5cGUgeyBMb2NhbGl6ZXJUeXBlIH0gZnJvbSAnLi4vLi4vLi4vdHlwZXMvVXRpbCc7XG5pbXBvcnQgeyBnZXRBY2Nlc3NDb250cm9sT3B0aW9ucyB9IGZyb20gJy4uLy4uLy4uL3V0aWwvZ2V0QWNjZXNzQ29udHJvbE9wdGlvbnMnO1xuaW1wb3J0IHsgU2lnbmFsU2VydmljZSBhcyBQcm90byB9IGZyb20gJy4uLy4uLy4uL3Byb3RvYnVmJztcblxuaW1wb3J0IHsgUGFuZWxSb3cgfSBmcm9tICcuL1BhbmVsUm93JztcbmltcG9ydCB7IFBhbmVsU2VjdGlvbiB9IGZyb20gJy4vUGFuZWxTZWN0aW9uJztcbmltcG9ydCB7IFNlbGVjdCB9IGZyb20gJy4uLy4uL1NlbGVjdCc7XG5pbXBvcnQgeyB1c2VVbmlxdWVJZCB9IGZyb20gJy4uLy4uLy4uL2hvb2tzL3VzZVVuaXF1ZUlkJztcblxuZXhwb3J0IHR5cGUgUHJvcHNUeXBlID0ge1xuICBjb252ZXJzYXRpb24/OiBDb252ZXJzYXRpb25UeXBlO1xuICBpMThuOiBMb2NhbGl6ZXJUeXBlO1xuICBzZXRBY2Nlc3NDb250cm9sQXR0cmlidXRlc1NldHRpbmc6ICh2YWx1ZTogbnVtYmVyKSA9PiB2b2lkO1xuICBzZXRBY2Nlc3NDb250cm9sTWVtYmVyc1NldHRpbmc6ICh2YWx1ZTogbnVtYmVyKSA9PiB2b2lkO1xuICBzZXRBbm5vdW5jZW1lbnRzT25seTogKHZhbHVlOiBib29sZWFuKSA9PiB2b2lkO1xufTtcblxuZXhwb3J0IGNvbnN0IEdyb3VwVjJQZXJtaXNzaW9ucyA9ICh7XG4gIGNvbnZlcnNhdGlvbixcbiAgaTE4bixcbiAgc2V0QWNjZXNzQ29udHJvbEF0dHJpYnV0ZXNTZXR0aW5nLFxuICBzZXRBY2Nlc3NDb250cm9sTWVtYmVyc1NldHRpbmcsXG4gIHNldEFubm91bmNlbWVudHNPbmx5LFxufTogUHJvcHNUeXBlKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBhZGRNZW1iZXJzU2VsZWN0SWQgPSB1c2VVbmlxdWVJZCgpO1xuICBjb25zdCBncm91cEluZm9TZWxlY3RJZCA9IHVzZVVuaXF1ZUlkKCk7XG4gIGNvbnN0IGFubm91bmNlbWVudFNlbGVjdElkID0gdXNlVW5pcXVlSWQoKTtcblxuICBpZiAoY29udmVyc2F0aW9uID09PSB1bmRlZmluZWQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0dyb3VwVjJQZXJtaXNzaW9ucyByZW5kZXJlZCB3aXRob3V0IGEgY29udmVyc2F0aW9uJyk7XG4gIH1cblxuICBjb25zdCB1cGRhdGVBY2Nlc3NDb250cm9sQXR0cmlidXRlcyA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgc2V0QWNjZXNzQ29udHJvbEF0dHJpYnV0ZXNTZXR0aW5nKE51bWJlcih2YWx1ZSkpO1xuICB9O1xuICBjb25zdCB1cGRhdGVBY2Nlc3NDb250cm9sTWVtYmVycyA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgc2V0QWNjZXNzQ29udHJvbE1lbWJlcnNTZXR0aW5nKE51bWJlcih2YWx1ZSkpO1xuICB9O1xuICBjb25zdCBBY2Nlc3NDb250cm9sRW51bSA9IFByb3RvLkFjY2Vzc0NvbnRyb2wuQWNjZXNzUmVxdWlyZWQ7XG4gIGNvbnN0IHVwZGF0ZUFubm91bmNlbWVudHNPbmx5ID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICBzZXRBbm5vdW5jZW1lbnRzT25seShOdW1iZXIodmFsdWUpID09PSBBY2Nlc3NDb250cm9sRW51bS5BRE1JTklTVFJBVE9SKTtcbiAgfTtcbiAgY29uc3QgYWNjZXNzQ29udHJvbE9wdGlvbnMgPSBnZXRBY2Nlc3NDb250cm9sT3B0aW9ucyhpMThuKTtcbiAgY29uc3QgYW5ub3VuY2VtZW50c09ubHlWYWx1ZSA9IFN0cmluZyhcbiAgICBjb252ZXJzYXRpb24uYW5ub3VuY2VtZW50c09ubHlcbiAgICAgID8gQWNjZXNzQ29udHJvbEVudW0uQURNSU5JU1RSQVRPUlxuICAgICAgOiBBY2Nlc3NDb250cm9sRW51bS5NRU1CRVJcbiAgKTtcblxuICBjb25zdCBzaG93QW5ub3VuY2VtZW50c09ubHlQZXJtaXNzaW9uID1cbiAgICBjb252ZXJzYXRpb24uYXJlV2VBZG1pbiAmJlxuICAgIChjb252ZXJzYXRpb24uYW5ub3VuY2VtZW50c09ubHkgfHwgY29udmVyc2F0aW9uLmFubm91bmNlbWVudHNPbmx5UmVhZHkpO1xuXG4gIHJldHVybiAoXG4gICAgPFBhbmVsU2VjdGlvbj5cbiAgICAgIDxQYW5lbFJvd1xuICAgICAgICBsYWJlbD17XG4gICAgICAgICAgPGxhYmVsIGh0bWxGb3I9e2FkZE1lbWJlcnNTZWxlY3RJZH0+XG4gICAgICAgICAgICB7aTE4bignQ29udmVyc2F0aW9uRGV0YWlscy0tYWRkLW1lbWJlcnMtbGFiZWwnKX1cbiAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICB9XG4gICAgICAgIGluZm89e2kxOG4oJ0NvbnZlcnNhdGlvbkRldGFpbHMtLWFkZC1tZW1iZXJzLWluZm8nKX1cbiAgICAgICAgcmlnaHQ9e1xuICAgICAgICAgIDxTZWxlY3RcbiAgICAgICAgICAgIGlkPXthZGRNZW1iZXJzU2VsZWN0SWR9XG4gICAgICAgICAgICBvbkNoYW5nZT17dXBkYXRlQWNjZXNzQ29udHJvbE1lbWJlcnN9XG4gICAgICAgICAgICBvcHRpb25zPXthY2Nlc3NDb250cm9sT3B0aW9uc31cbiAgICAgICAgICAgIHZhbHVlPXtTdHJpbmcoY29udmVyc2F0aW9uLmFjY2Vzc0NvbnRyb2xNZW1iZXJzKX1cbiAgICAgICAgICAvPlxuICAgICAgICB9XG4gICAgICAvPlxuICAgICAgPFBhbmVsUm93XG4gICAgICAgIGxhYmVsPXtcbiAgICAgICAgICA8bGFiZWwgaHRtbEZvcj17Z3JvdXBJbmZvU2VsZWN0SWR9PlxuICAgICAgICAgICAge2kxOG4oJ0NvbnZlcnNhdGlvbkRldGFpbHMtLWdyb3VwLWluZm8tbGFiZWwnKX1cbiAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICB9XG4gICAgICAgIGluZm89e2kxOG4oJ0NvbnZlcnNhdGlvbkRldGFpbHMtLWdyb3VwLWluZm8taW5mbycpfVxuICAgICAgICByaWdodD17XG4gICAgICAgICAgPFNlbGVjdFxuICAgICAgICAgICAgaWQ9e2dyb3VwSW5mb1NlbGVjdElkfVxuICAgICAgICAgICAgb25DaGFuZ2U9e3VwZGF0ZUFjY2Vzc0NvbnRyb2xBdHRyaWJ1dGVzfVxuICAgICAgICAgICAgb3B0aW9ucz17YWNjZXNzQ29udHJvbE9wdGlvbnN9XG4gICAgICAgICAgICB2YWx1ZT17U3RyaW5nKGNvbnZlcnNhdGlvbi5hY2Nlc3NDb250cm9sQXR0cmlidXRlcyl9XG4gICAgICAgICAgLz5cbiAgICAgICAgfVxuICAgICAgLz5cbiAgICAgIHtzaG93QW5ub3VuY2VtZW50c09ubHlQZXJtaXNzaW9uICYmIChcbiAgICAgICAgPFBhbmVsUm93XG4gICAgICAgICAgbGFiZWw9e1xuICAgICAgICAgICAgPGxhYmVsIGh0bWxGb3I9e2Fubm91bmNlbWVudFNlbGVjdElkfT5cbiAgICAgICAgICAgICAge2kxOG4oJ0NvbnZlcnNhdGlvbkRldGFpbHMtLWFubm91bmNlbWVudC1sYWJlbCcpfVxuICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICB9XG4gICAgICAgICAgaW5mbz17aTE4bignQ29udmVyc2F0aW9uRGV0YWlscy0tYW5ub3VuY2VtZW50LWluZm8nKX1cbiAgICAgICAgICByaWdodD17XG4gICAgICAgICAgICA8U2VsZWN0XG4gICAgICAgICAgICAgIGlkPXthbm5vdW5jZW1lbnRTZWxlY3RJZH1cbiAgICAgICAgICAgICAgb25DaGFuZ2U9e3VwZGF0ZUFubm91bmNlbWVudHNPbmx5fVxuICAgICAgICAgICAgICBvcHRpb25zPXthY2Nlc3NDb250cm9sT3B0aW9uc31cbiAgICAgICAgICAgICAgdmFsdWU9e2Fubm91bmNlbWVudHNPbmx5VmFsdWV9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIH1cbiAgICAgICAgLz5cbiAgICAgICl9XG4gICAgPC9QYW5lbFNlY3Rpb24+XG4gICk7XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLG1CQUFrQjtBQUlsQixxQ0FBd0M7QUFDeEMsc0JBQXVDO0FBRXZDLHNCQUF5QjtBQUN6QiwwQkFBNkI7QUFDN0Isb0JBQXVCO0FBQ3ZCLHlCQUE0QjtBQVVyQixNQUFNLHFCQUFxQix3QkFBQztBQUFBLEVBQ2pDO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLE1BQzRCO0FBQzVCLFFBQU0scUJBQXFCLG9DQUFZO0FBQ3ZDLFFBQU0sb0JBQW9CLG9DQUFZO0FBQ3RDLFFBQU0sdUJBQXVCLG9DQUFZO0FBRXpDLE1BQUksaUJBQWlCLFFBQVc7QUFDOUIsVUFBTSxJQUFJLE1BQU0sb0RBQW9EO0FBQUEsRUFDdEU7QUFFQSxRQUFNLGdDQUFnQyx3QkFBQyxVQUFrQjtBQUN2RCxzQ0FBa0MsT0FBTyxLQUFLLENBQUM7QUFBQSxFQUNqRCxHQUZzQztBQUd0QyxRQUFNLDZCQUE2Qix3QkFBQyxVQUFrQjtBQUNwRCxtQ0FBK0IsT0FBTyxLQUFLLENBQUM7QUFBQSxFQUM5QyxHQUZtQztBQUduQyxRQUFNLG9CQUFvQiw4QkFBTSxjQUFjO0FBQzlDLFFBQU0sMEJBQTBCLHdCQUFDLFVBQWtCO0FBQ2pELHlCQUFxQixPQUFPLEtBQUssTUFBTSxrQkFBa0IsYUFBYTtBQUFBLEVBQ3hFLEdBRmdDO0FBR2hDLFFBQU0sdUJBQXVCLDREQUF3QixJQUFJO0FBQ3pELFFBQU0seUJBQXlCLE9BQzdCLGFBQWEsb0JBQ1Qsa0JBQWtCLGdCQUNsQixrQkFBa0IsTUFDeEI7QUFFQSxRQUFNLGtDQUNKLGFBQWEsY0FDWixjQUFhLHFCQUFxQixhQUFhO0FBRWxELFNBQ0UsbURBQUMsd0NBQ0MsbURBQUM7QUFBQSxJQUNDLE9BQ0UsbURBQUM7QUFBQSxNQUFNLFNBQVM7QUFBQSxPQUNiLEtBQUssd0NBQXdDLENBQ2hEO0FBQUEsSUFFRixNQUFNLEtBQUssdUNBQXVDO0FBQUEsSUFDbEQsT0FDRSxtREFBQztBQUFBLE1BQ0MsSUFBSTtBQUFBLE1BQ0osVUFBVTtBQUFBLE1BQ1YsU0FBUztBQUFBLE1BQ1QsT0FBTyxPQUFPLGFBQWEsb0JBQW9CO0FBQUEsS0FDakQ7QUFBQSxHQUVKLEdBQ0EsbURBQUM7QUFBQSxJQUNDLE9BQ0UsbURBQUM7QUFBQSxNQUFNLFNBQVM7QUFBQSxPQUNiLEtBQUssdUNBQXVDLENBQy9DO0FBQUEsSUFFRixNQUFNLEtBQUssc0NBQXNDO0FBQUEsSUFDakQsT0FDRSxtREFBQztBQUFBLE1BQ0MsSUFBSTtBQUFBLE1BQ0osVUFBVTtBQUFBLE1BQ1YsU0FBUztBQUFBLE1BQ1QsT0FBTyxPQUFPLGFBQWEsdUJBQXVCO0FBQUEsS0FDcEQ7QUFBQSxHQUVKLEdBQ0MsbUNBQ0MsbURBQUM7QUFBQSxJQUNDLE9BQ0UsbURBQUM7QUFBQSxNQUFNLFNBQVM7QUFBQSxPQUNiLEtBQUsseUNBQXlDLENBQ2pEO0FBQUEsSUFFRixNQUFNLEtBQUssd0NBQXdDO0FBQUEsSUFDbkQsT0FDRSxtREFBQztBQUFBLE1BQ0MsSUFBSTtBQUFBLE1BQ0osVUFBVTtBQUFBLE1BQ1YsU0FBUztBQUFBLE1BQ1QsT0FBTztBQUFBLEtBQ1Q7QUFBQSxHQUVKLENBRUo7QUFFSixHQTFGa0M7IiwKICAibmFtZXMiOiBbXQp9Cg==
