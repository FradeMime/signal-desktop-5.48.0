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
var NewlyCreatedGroupInvitedContactsDialog_stories_exports = {};
__export(NewlyCreatedGroupInvitedContactsDialog_stories_exports, {
  OneContact: () => OneContact,
  TwoContacts: () => TwoContacts,
  default: () => NewlyCreatedGroupInvitedContactsDialog_stories_default
});
module.exports = __toCommonJS(NewlyCreatedGroupInvitedContactsDialog_stories_exports);
var import_react = __toESM(require("react"));
var import_addon_actions = require("@storybook/addon-actions");
var import_NewlyCreatedGroupInvitedContactsDialog = require("./NewlyCreatedGroupInvitedContactsDialog");
var import_setupI18n = require("../util/setupI18n");
var import_messages = __toESM(require("../../_locales/en/messages.json"));
var import_getDefaultConversation = require("../test-both/helpers/getDefaultConversation");
var import_Util = require("../types/Util");
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
const conversations = [
  (0, import_getDefaultConversation.getDefaultConversation)({ title: "Fred Willard" }),
  (0, import_getDefaultConversation.getDefaultConversation)({ title: "Marc Barraca" })
];
var NewlyCreatedGroupInvitedContactsDialog_stories_default = {
  title: "Components/NewlyCreatedGroupInvitedContactsDialog"
};
const OneContact = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_NewlyCreatedGroupInvitedContactsDialog.NewlyCreatedGroupInvitedContactsDialog, {
  contacts: [conversations[0]],
  getPreferredBadge: () => void 0,
  i18n,
  onClose: (0, import_addon_actions.action)("onClose"),
  theme: import_Util.ThemeType.light
}), "OneContact");
OneContact.story = {
  name: "One contact"
};
const TwoContacts = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_NewlyCreatedGroupInvitedContactsDialog.NewlyCreatedGroupInvitedContactsDialog, {
  contacts: conversations,
  getPreferredBadge: () => void 0,
  i18n,
  onClose: (0, import_addon_actions.action)("onClose"),
  theme: import_Util.ThemeType.light
}), "TwoContacts");
TwoContacts.story = {
  name: "Two contacts"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  OneContact,
  TwoContacts
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiTmV3bHlDcmVhdGVkR3JvdXBJbnZpdGVkQ29udGFjdHNEaWFsb2cuc3Rvcmllcy50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgYWN0aW9uIH0gZnJvbSAnQHN0b3J5Ym9vay9hZGRvbi1hY3Rpb25zJztcblxuaW1wb3J0IHsgTmV3bHlDcmVhdGVkR3JvdXBJbnZpdGVkQ29udGFjdHNEaWFsb2cgfSBmcm9tICcuL05ld2x5Q3JlYXRlZEdyb3VwSW52aXRlZENvbnRhY3RzRGlhbG9nJztcbmltcG9ydCB7IHNldHVwSTE4biB9IGZyb20gJy4uL3V0aWwvc2V0dXBJMThuJztcbmltcG9ydCBlbk1lc3NhZ2VzIGZyb20gJy4uLy4uL19sb2NhbGVzL2VuL21lc3NhZ2VzLmpzb24nO1xuaW1wb3J0IHR5cGUgeyBDb252ZXJzYXRpb25UeXBlIH0gZnJvbSAnLi4vc3RhdGUvZHVja3MvY29udmVyc2F0aW9ucyc7XG5pbXBvcnQgeyBnZXREZWZhdWx0Q29udmVyc2F0aW9uIH0gZnJvbSAnLi4vdGVzdC1ib3RoL2hlbHBlcnMvZ2V0RGVmYXVsdENvbnZlcnNhdGlvbic7XG5pbXBvcnQgeyBUaGVtZVR5cGUgfSBmcm9tICcuLi90eXBlcy9VdGlsJztcblxuY29uc3QgaTE4biA9IHNldHVwSTE4bignZW4nLCBlbk1lc3NhZ2VzKTtcblxuY29uc3QgY29udmVyc2F0aW9uczogQXJyYXk8Q29udmVyc2F0aW9uVHlwZT4gPSBbXG4gIGdldERlZmF1bHRDb252ZXJzYXRpb24oeyB0aXRsZTogJ0ZyZWQgV2lsbGFyZCcgfSksXG4gIGdldERlZmF1bHRDb252ZXJzYXRpb24oeyB0aXRsZTogJ01hcmMgQmFycmFjYScgfSksXG5dO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHRpdGxlOiAnQ29tcG9uZW50cy9OZXdseUNyZWF0ZWRHcm91cEludml0ZWRDb250YWN0c0RpYWxvZycsXG59O1xuXG5leHBvcnQgY29uc3QgT25lQ29udGFjdCA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxOZXdseUNyZWF0ZWRHcm91cEludml0ZWRDb250YWN0c0RpYWxvZ1xuICAgIGNvbnRhY3RzPXtbY29udmVyc2F0aW9uc1swXV19XG4gICAgZ2V0UHJlZmVycmVkQmFkZ2U9eygpID0+IHVuZGVmaW5lZH1cbiAgICBpMThuPXtpMThufVxuICAgIG9uQ2xvc2U9e2FjdGlvbignb25DbG9zZScpfVxuICAgIHRoZW1lPXtUaGVtZVR5cGUubGlnaHR9XG4gIC8+XG4pO1xuXG5PbmVDb250YWN0LnN0b3J5ID0ge1xuICBuYW1lOiAnT25lIGNvbnRhY3QnLFxufTtcblxuZXhwb3J0IGNvbnN0IFR3b0NvbnRhY3RzID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPE5ld2x5Q3JlYXRlZEdyb3VwSW52aXRlZENvbnRhY3RzRGlhbG9nXG4gICAgY29udGFjdHM9e2NvbnZlcnNhdGlvbnN9XG4gICAgZ2V0UHJlZmVycmVkQmFkZ2U9eygpID0+IHVuZGVmaW5lZH1cbiAgICBpMThuPXtpMThufVxuICAgIG9uQ2xvc2U9e2FjdGlvbignb25DbG9zZScpfVxuICAgIHRoZW1lPXtUaGVtZVR5cGUubGlnaHR9XG4gIC8+XG4pO1xuXG5Ud29Db250YWN0cy5zdG9yeSA9IHtcbiAgbmFtZTogJ1R3byBjb250YWN0cycsXG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxtQkFBa0I7QUFFbEIsMkJBQXVCO0FBRXZCLG9EQUF1RDtBQUN2RCx1QkFBMEI7QUFDMUIsc0JBQXVCO0FBRXZCLG9DQUF1QztBQUN2QyxrQkFBMEI7QUFFMUIsTUFBTSxPQUFPLGdDQUFVLE1BQU0sdUJBQVU7QUFFdkMsTUFBTSxnQkFBeUM7QUFBQSxFQUM3QywwREFBdUIsRUFBRSxPQUFPLGVBQWUsQ0FBQztBQUFBLEVBQ2hELDBEQUF1QixFQUFFLE9BQU8sZUFBZSxDQUFDO0FBQ2xEO0FBRUEsSUFBTyx5REFBUTtBQUFBLEVBQ2IsT0FBTztBQUNUO0FBRU8sTUFBTSxhQUFhLDZCQUN4QixtREFBQztBQUFBLEVBQ0MsVUFBVSxDQUFDLGNBQWMsRUFBRTtBQUFBLEVBQzNCLG1CQUFtQixNQUFNO0FBQUEsRUFDekI7QUFBQSxFQUNBLFNBQVMsaUNBQU8sU0FBUztBQUFBLEVBQ3pCLE9BQU8sc0JBQVU7QUFBQSxDQUNuQixHQVB3QjtBQVUxQixXQUFXLFFBQVE7QUFBQSxFQUNqQixNQUFNO0FBQ1I7QUFFTyxNQUFNLGNBQWMsNkJBQ3pCLG1EQUFDO0FBQUEsRUFDQyxVQUFVO0FBQUEsRUFDVixtQkFBbUIsTUFBTTtBQUFBLEVBQ3pCO0FBQUEsRUFDQSxTQUFTLGlDQUFPLFNBQVM7QUFBQSxFQUN6QixPQUFPLHNCQUFVO0FBQUEsQ0FDbkIsR0FQeUI7QUFVM0IsWUFBWSxRQUFRO0FBQUEsRUFDbEIsTUFBTTtBQUNSOyIsCiAgIm5hbWVzIjogW10KfQo=
