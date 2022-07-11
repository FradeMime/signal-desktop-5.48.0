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
var GroupV2PendingApprovalActions_stories_exports = {};
__export(GroupV2PendingApprovalActions_stories_exports, {
  Default: () => Default,
  default: () => GroupV2PendingApprovalActions_stories_default
});
module.exports = __toCommonJS(GroupV2PendingApprovalActions_stories_exports);
var React = __toESM(require("react"));
var import_addon_actions = require("@storybook/addon-actions");
var import_GroupV2PendingApprovalActions = require("./GroupV2PendingApprovalActions");
var import_setupI18n = require("../../util/setupI18n");
var import_messages = __toESM(require("../../../_locales/en/messages.json"));
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
const createProps = /* @__PURE__ */ __name(() => ({
  i18n,
  onCancelJoinRequest: (0, import_addon_actions.action)("onCancelJoinRequest")
}), "createProps");
var GroupV2PendingApprovalActions_stories_default = {
  title: "Components/Conversation/GroupV2PendingApprovalActions"
};
const Default = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ React.createElement(import_GroupV2PendingApprovalActions.GroupV2PendingApprovalActions, {
    ...createProps()
  });
}, "Default");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Default
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiR3JvdXBWMlBlbmRpbmdBcHByb3ZhbEFjdGlvbnMuc3Rvcmllcy50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgYWN0aW9uIH0gZnJvbSAnQHN0b3J5Ym9vay9hZGRvbi1hY3Rpb25zJztcblxuaW1wb3J0IHR5cGUgeyBQcm9wc1R5cGUgYXMgR3JvdXBWMlBlbmRpbmdBcHByb3ZhbEFjdGlvbnNQcm9wc1R5cGUgfSBmcm9tICcuL0dyb3VwVjJQZW5kaW5nQXBwcm92YWxBY3Rpb25zJztcbmltcG9ydCB7IEdyb3VwVjJQZW5kaW5nQXBwcm92YWxBY3Rpb25zIH0gZnJvbSAnLi9Hcm91cFYyUGVuZGluZ0FwcHJvdmFsQWN0aW9ucyc7XG5pbXBvcnQgeyBzZXR1cEkxOG4gfSBmcm9tICcuLi8uLi91dGlsL3NldHVwSTE4bic7XG5pbXBvcnQgZW5NZXNzYWdlcyBmcm9tICcuLi8uLi8uLi9fbG9jYWxlcy9lbi9tZXNzYWdlcy5qc29uJztcblxuY29uc3QgaTE4biA9IHNldHVwSTE4bignZW4nLCBlbk1lc3NhZ2VzKTtcblxuY29uc3QgY3JlYXRlUHJvcHMgPSAoKTogR3JvdXBWMlBlbmRpbmdBcHByb3ZhbEFjdGlvbnNQcm9wc1R5cGUgPT4gKHtcbiAgaTE4bixcbiAgb25DYW5jZWxKb2luUmVxdWVzdDogYWN0aW9uKCdvbkNhbmNlbEpvaW5SZXF1ZXN0JyksXG59KTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICB0aXRsZTogJ0NvbXBvbmVudHMvQ29udmVyc2F0aW9uL0dyb3VwVjJQZW5kaW5nQXBwcm92YWxBY3Rpb25zJyxcbn07XG5cbmV4cG9ydCBjb25zdCBEZWZhdWx0ID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgcmV0dXJuIDxHcm91cFYyUGVuZGluZ0FwcHJvdmFsQWN0aW9ucyB7Li4uY3JlYXRlUHJvcHMoKX0gLz47XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsWUFBdUI7QUFDdkIsMkJBQXVCO0FBR3ZCLDJDQUE4QztBQUM5Qyx1QkFBMEI7QUFDMUIsc0JBQXVCO0FBRXZCLE1BQU0sT0FBTyxnQ0FBVSxNQUFNLHVCQUFVO0FBRXZDLE1BQU0sY0FBYyw2QkFBK0M7QUFBQSxFQUNqRTtBQUFBLEVBQ0EscUJBQXFCLGlDQUFPLHFCQUFxQjtBQUNuRCxJQUhvQjtBQUtwQixJQUFPLGdEQUFRO0FBQUEsRUFDYixPQUFPO0FBQ1Q7QUFFTyxNQUFNLFVBQVUsNkJBQW1CO0FBQ3hDLFNBQU8sb0NBQUM7QUFBQSxPQUFrQyxZQUFZO0FBQUEsR0FBRztBQUMzRCxHQUZ1QjsiLAogICJuYW1lcyI6IFtdCn0K
