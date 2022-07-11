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
var ContactSpoofingReviewDialog_stories_exports = {};
__export(ContactSpoofingReviewDialog_stories_exports, {
  Admin: () => Admin,
  DirectConversationsWithSameTitle: () => DirectConversationsWithSameTitle,
  NotAdmin: () => NotAdmin,
  default: () => ContactSpoofingReviewDialog_stories_default
});
module.exports = __toCommonJS(ContactSpoofingReviewDialog_stories_exports);
var import_react = __toESM(require("react"));
var import_lodash = require("lodash");
var import_addon_actions = require("@storybook/addon-actions");
var import_setupI18n = require("../../util/setupI18n");
var import_messages = __toESM(require("../../../_locales/en/messages.json"));
var import_getDefaultConversation = require("../../test-both/helpers/getDefaultConversation");
var import_ContactSpoofingReviewDialog = require("./ContactSpoofingReviewDialog");
var import_contactSpoofing = require("../../util/contactSpoofing");
var import_Util = require("../../types/Util");
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
var ContactSpoofingReviewDialog_stories_default = {
  title: "Components/Conversation/ContactSpoofingReviewDialog"
};
const getCommonProps = /* @__PURE__ */ __name(() => ({
  getPreferredBadge: () => void 0,
  i18n,
  groupConversationId: "convo-id",
  onBlock: (0, import_addon_actions.action)("onBlock"),
  onBlockAndReportSpam: (0, import_addon_actions.action)("onBlockAndReportSpam"),
  onClose: (0, import_addon_actions.action)("onClose"),
  onDelete: (0, import_addon_actions.action)("onDelete"),
  onShowContactModal: (0, import_addon_actions.action)("onShowContactModal"),
  onUnblock: (0, import_addon_actions.action)("onUnblock"),
  removeMember: (0, import_addon_actions.action)("removeMember"),
  theme: import_Util.ThemeType.light
}), "getCommonProps");
const DirectConversationsWithSameTitle = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_ContactSpoofingReviewDialog.ContactSpoofingReviewDialog, {
  ...getCommonProps(),
  type: import_contactSpoofing.ContactSpoofingType.DirectConversationWithSameTitle,
  possiblyUnsafeConversation: (0, import_getDefaultConversation.getDefaultConversation)(),
  safeConversation: (0, import_getDefaultConversation.getDefaultConversation)()
}), "DirectConversationsWithSameTitle");
DirectConversationsWithSameTitle.story = {
  name: "Direct conversations with same title"
};
const NotAdmin = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_ContactSpoofingReviewDialog.ContactSpoofingReviewDialog, {
  ...getCommonProps(),
  type: import_contactSpoofing.ContactSpoofingType.MultipleGroupMembersWithSameTitle,
  group: {
    ...(0, import_getDefaultConversation.getDefaultConversation)(),
    areWeAdmin: false
  },
  collisionInfoByTitle: {
    Alice: (0, import_lodash.times)(2, () => ({
      oldName: "Alicia",
      conversation: (0, import_getDefaultConversation.getDefaultConversation)({ title: "Alice" })
    })),
    Bob: (0, import_lodash.times)(3, () => ({
      conversation: (0, import_getDefaultConversation.getDefaultConversation)({ title: "Bob" })
    })),
    Charlie: (0, import_lodash.times)(5, () => ({
      conversation: (0, import_getDefaultConversation.getDefaultConversation)({ title: "Charlie" })
    }))
  }
}), "NotAdmin");
NotAdmin.story = {
  name: "Group conversation many group members"
};
const Admin = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_ContactSpoofingReviewDialog.ContactSpoofingReviewDialog, {
  ...getCommonProps(),
  type: import_contactSpoofing.ContactSpoofingType.MultipleGroupMembersWithSameTitle,
  group: {
    ...(0, import_getDefaultConversation.getDefaultConversation)(),
    areWeAdmin: true
  },
  collisionInfoByTitle: {
    Alice: (0, import_lodash.times)(2, () => ({
      oldName: "Alicia",
      conversation: (0, import_getDefaultConversation.getDefaultConversation)({ title: "Alice" })
    })),
    Bob: (0, import_lodash.times)(3, () => ({
      conversation: (0, import_getDefaultConversation.getDefaultConversation)({ title: "Bob" })
    })),
    Charlie: (0, import_lodash.times)(5, () => ({
      conversation: (0, import_getDefaultConversation.getDefaultConversation)({ title: "Charlie" })
    }))
  }
}), "Admin");
Admin.story = {
  name: "Group conversation many group members, and we are admin"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Admin,
  DirectConversationsWithSameTitle,
  NotAdmin
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ29udGFjdFNwb29maW5nUmV2aWV3RGlhbG9nLnN0b3JpZXMudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB0aW1lcyB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBhY3Rpb24gfSBmcm9tICdAc3Rvcnlib29rL2FkZG9uLWFjdGlvbnMnO1xuaW1wb3J0IHsgc2V0dXBJMThuIH0gZnJvbSAnLi4vLi4vdXRpbC9zZXR1cEkxOG4nO1xuaW1wb3J0IGVuTWVzc2FnZXMgZnJvbSAnLi4vLi4vLi4vX2xvY2FsZXMvZW4vbWVzc2FnZXMuanNvbic7XG5pbXBvcnQgeyBnZXREZWZhdWx0Q29udmVyc2F0aW9uIH0gZnJvbSAnLi4vLi4vdGVzdC1ib3RoL2hlbHBlcnMvZ2V0RGVmYXVsdENvbnZlcnNhdGlvbic7XG5cbmltcG9ydCB7IENvbnRhY3RTcG9vZmluZ1Jldmlld0RpYWxvZyB9IGZyb20gJy4vQ29udGFjdFNwb29maW5nUmV2aWV3RGlhbG9nJztcbmltcG9ydCB7IENvbnRhY3RTcG9vZmluZ1R5cGUgfSBmcm9tICcuLi8uLi91dGlsL2NvbnRhY3RTcG9vZmluZyc7XG5pbXBvcnQgeyBUaGVtZVR5cGUgfSBmcm9tICcuLi8uLi90eXBlcy9VdGlsJztcblxuY29uc3QgaTE4biA9IHNldHVwSTE4bignZW4nLCBlbk1lc3NhZ2VzKTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICB0aXRsZTogJ0NvbXBvbmVudHMvQ29udmVyc2F0aW9uL0NvbnRhY3RTcG9vZmluZ1Jldmlld0RpYWxvZycsXG59O1xuXG5jb25zdCBnZXRDb21tb25Qcm9wcyA9ICgpID0+ICh7XG4gIGdldFByZWZlcnJlZEJhZGdlOiAoKSA9PiB1bmRlZmluZWQsXG4gIGkxOG4sXG4gIGdyb3VwQ29udmVyc2F0aW9uSWQ6ICdjb252by1pZCcsXG4gIG9uQmxvY2s6IGFjdGlvbignb25CbG9jaycpLFxuICBvbkJsb2NrQW5kUmVwb3J0U3BhbTogYWN0aW9uKCdvbkJsb2NrQW5kUmVwb3J0U3BhbScpLFxuICBvbkNsb3NlOiBhY3Rpb24oJ29uQ2xvc2UnKSxcbiAgb25EZWxldGU6IGFjdGlvbignb25EZWxldGUnKSxcbiAgb25TaG93Q29udGFjdE1vZGFsOiBhY3Rpb24oJ29uU2hvd0NvbnRhY3RNb2RhbCcpLFxuICBvblVuYmxvY2s6IGFjdGlvbignb25VbmJsb2NrJyksXG4gIHJlbW92ZU1lbWJlcjogYWN0aW9uKCdyZW1vdmVNZW1iZXInKSxcbiAgdGhlbWU6IFRoZW1lVHlwZS5saWdodCxcbn0pO1xuXG5leHBvcnQgY29uc3QgRGlyZWN0Q29udmVyc2F0aW9uc1dpdGhTYW1lVGl0bGUgPSAoKTogSlNYLkVsZW1lbnQgPT4gKFxuICA8Q29udGFjdFNwb29maW5nUmV2aWV3RGlhbG9nXG4gICAgey4uLmdldENvbW1vblByb3BzKCl9XG4gICAgdHlwZT17Q29udGFjdFNwb29maW5nVHlwZS5EaXJlY3RDb252ZXJzYXRpb25XaXRoU2FtZVRpdGxlfVxuICAgIHBvc3NpYmx5VW5zYWZlQ29udmVyc2F0aW9uPXtnZXREZWZhdWx0Q29udmVyc2F0aW9uKCl9XG4gICAgc2FmZUNvbnZlcnNhdGlvbj17Z2V0RGVmYXVsdENvbnZlcnNhdGlvbigpfVxuICAvPlxuKTtcblxuRGlyZWN0Q29udmVyc2F0aW9uc1dpdGhTYW1lVGl0bGUuc3RvcnkgPSB7XG4gIG5hbWU6ICdEaXJlY3QgY29udmVyc2F0aW9ucyB3aXRoIHNhbWUgdGl0bGUnLFxufTtcblxuZXhwb3J0IGNvbnN0IE5vdEFkbWluID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPENvbnRhY3RTcG9vZmluZ1Jldmlld0RpYWxvZ1xuICAgIHsuLi5nZXRDb21tb25Qcm9wcygpfVxuICAgIHR5cGU9e0NvbnRhY3RTcG9vZmluZ1R5cGUuTXVsdGlwbGVHcm91cE1lbWJlcnNXaXRoU2FtZVRpdGxlfVxuICAgIGdyb3VwPXt7XG4gICAgICAuLi5nZXREZWZhdWx0Q29udmVyc2F0aW9uKCksXG4gICAgICBhcmVXZUFkbWluOiBmYWxzZSxcbiAgICB9fVxuICAgIGNvbGxpc2lvbkluZm9CeVRpdGxlPXt7XG4gICAgICBBbGljZTogdGltZXMoMiwgKCkgPT4gKHtcbiAgICAgICAgb2xkTmFtZTogJ0FsaWNpYScsXG4gICAgICAgIGNvbnZlcnNhdGlvbjogZ2V0RGVmYXVsdENvbnZlcnNhdGlvbih7IHRpdGxlOiAnQWxpY2UnIH0pLFxuICAgICAgfSkpLFxuICAgICAgQm9iOiB0aW1lcygzLCAoKSA9PiAoe1xuICAgICAgICBjb252ZXJzYXRpb246IGdldERlZmF1bHRDb252ZXJzYXRpb24oeyB0aXRsZTogJ0JvYicgfSksXG4gICAgICB9KSksXG4gICAgICBDaGFybGllOiB0aW1lcyg1LCAoKSA9PiAoe1xuICAgICAgICBjb252ZXJzYXRpb246IGdldERlZmF1bHRDb252ZXJzYXRpb24oeyB0aXRsZTogJ0NoYXJsaWUnIH0pLFxuICAgICAgfSkpLFxuICAgIH19XG4gIC8+XG4pO1xuXG5Ob3RBZG1pbi5zdG9yeSA9IHtcbiAgbmFtZTogJ0dyb3VwIGNvbnZlcnNhdGlvbiBtYW55IGdyb3VwIG1lbWJlcnMnLFxufTtcblxuZXhwb3J0IGNvbnN0IEFkbWluID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPENvbnRhY3RTcG9vZmluZ1Jldmlld0RpYWxvZ1xuICAgIHsuLi5nZXRDb21tb25Qcm9wcygpfVxuICAgIHR5cGU9e0NvbnRhY3RTcG9vZmluZ1R5cGUuTXVsdGlwbGVHcm91cE1lbWJlcnNXaXRoU2FtZVRpdGxlfVxuICAgIGdyb3VwPXt7XG4gICAgICAuLi5nZXREZWZhdWx0Q29udmVyc2F0aW9uKCksXG4gICAgICBhcmVXZUFkbWluOiB0cnVlLFxuICAgIH19XG4gICAgY29sbGlzaW9uSW5mb0J5VGl0bGU9e3tcbiAgICAgIEFsaWNlOiB0aW1lcygyLCAoKSA9PiAoe1xuICAgICAgICBvbGROYW1lOiAnQWxpY2lhJyxcbiAgICAgICAgY29udmVyc2F0aW9uOiBnZXREZWZhdWx0Q29udmVyc2F0aW9uKHsgdGl0bGU6ICdBbGljZScgfSksXG4gICAgICB9KSksXG4gICAgICBCb2I6IHRpbWVzKDMsICgpID0+ICh7XG4gICAgICAgIGNvbnZlcnNhdGlvbjogZ2V0RGVmYXVsdENvbnZlcnNhdGlvbih7IHRpdGxlOiAnQm9iJyB9KSxcbiAgICAgIH0pKSxcbiAgICAgIENoYXJsaWU6IHRpbWVzKDUsICgpID0+ICh7XG4gICAgICAgIGNvbnZlcnNhdGlvbjogZ2V0RGVmYXVsdENvbnZlcnNhdGlvbih7IHRpdGxlOiAnQ2hhcmxpZScgfSksXG4gICAgICB9KSksXG4gICAgfX1cbiAgLz5cbik7XG5cbkFkbWluLnN0b3J5ID0ge1xuICBuYW1lOiAnR3JvdXAgY29udmVyc2F0aW9uIG1hbnkgZ3JvdXAgbWVtYmVycywgYW5kIHdlIGFyZSBhZG1pbicsXG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLG1CQUFrQjtBQUNsQixvQkFBc0I7QUFDdEIsMkJBQXVCO0FBQ3ZCLHVCQUEwQjtBQUMxQixzQkFBdUI7QUFDdkIsb0NBQXVDO0FBRXZDLHlDQUE0QztBQUM1Qyw2QkFBb0M7QUFDcEMsa0JBQTBCO0FBRTFCLE1BQU0sT0FBTyxnQ0FBVSxNQUFNLHVCQUFVO0FBRXZDLElBQU8sOENBQVE7QUFBQSxFQUNiLE9BQU87QUFDVDtBQUVBLE1BQU0saUJBQWlCLDZCQUFPO0FBQUEsRUFDNUIsbUJBQW1CLE1BQU07QUFBQSxFQUN6QjtBQUFBLEVBQ0EscUJBQXFCO0FBQUEsRUFDckIsU0FBUyxpQ0FBTyxTQUFTO0FBQUEsRUFDekIsc0JBQXNCLGlDQUFPLHNCQUFzQjtBQUFBLEVBQ25ELFNBQVMsaUNBQU8sU0FBUztBQUFBLEVBQ3pCLFVBQVUsaUNBQU8sVUFBVTtBQUFBLEVBQzNCLG9CQUFvQixpQ0FBTyxvQkFBb0I7QUFBQSxFQUMvQyxXQUFXLGlDQUFPLFdBQVc7QUFBQSxFQUM3QixjQUFjLGlDQUFPLGNBQWM7QUFBQSxFQUNuQyxPQUFPLHNCQUFVO0FBQ25CLElBWnVCO0FBY2hCLE1BQU0sbUNBQW1DLDZCQUM5QyxtREFBQztBQUFBLEtBQ0ssZUFBZTtBQUFBLEVBQ25CLE1BQU0sMkNBQW9CO0FBQUEsRUFDMUIsNEJBQTRCLDBEQUF1QjtBQUFBLEVBQ25ELGtCQUFrQiwwREFBdUI7QUFBQSxDQUMzQyxHQU44QztBQVNoRCxpQ0FBaUMsUUFBUTtBQUFBLEVBQ3ZDLE1BQU07QUFDUjtBQUVPLE1BQU0sV0FBVyw2QkFDdEIsbURBQUM7QUFBQSxLQUNLLGVBQWU7QUFBQSxFQUNuQixNQUFNLDJDQUFvQjtBQUFBLEVBQzFCLE9BQU87QUFBQSxPQUNGLDBEQUF1QjtBQUFBLElBQzFCLFlBQVk7QUFBQSxFQUNkO0FBQUEsRUFDQSxzQkFBc0I7QUFBQSxJQUNwQixPQUFPLHlCQUFNLEdBQUcsTUFBTztBQUFBLE1BQ3JCLFNBQVM7QUFBQSxNQUNULGNBQWMsMERBQXVCLEVBQUUsT0FBTyxRQUFRLENBQUM7QUFBQSxJQUN6RCxFQUFFO0FBQUEsSUFDRixLQUFLLHlCQUFNLEdBQUcsTUFBTztBQUFBLE1BQ25CLGNBQWMsMERBQXVCLEVBQUUsT0FBTyxNQUFNLENBQUM7QUFBQSxJQUN2RCxFQUFFO0FBQUEsSUFDRixTQUFTLHlCQUFNLEdBQUcsTUFBTztBQUFBLE1BQ3ZCLGNBQWMsMERBQXVCLEVBQUUsT0FBTyxVQUFVLENBQUM7QUFBQSxJQUMzRCxFQUFFO0FBQUEsRUFDSjtBQUFBLENBQ0YsR0FwQnNCO0FBdUJ4QixTQUFTLFFBQVE7QUFBQSxFQUNmLE1BQU07QUFDUjtBQUVPLE1BQU0sUUFBUSw2QkFDbkIsbURBQUM7QUFBQSxLQUNLLGVBQWU7QUFBQSxFQUNuQixNQUFNLDJDQUFvQjtBQUFBLEVBQzFCLE9BQU87QUFBQSxPQUNGLDBEQUF1QjtBQUFBLElBQzFCLFlBQVk7QUFBQSxFQUNkO0FBQUEsRUFDQSxzQkFBc0I7QUFBQSxJQUNwQixPQUFPLHlCQUFNLEdBQUcsTUFBTztBQUFBLE1BQ3JCLFNBQVM7QUFBQSxNQUNULGNBQWMsMERBQXVCLEVBQUUsT0FBTyxRQUFRLENBQUM7QUFBQSxJQUN6RCxFQUFFO0FBQUEsSUFDRixLQUFLLHlCQUFNLEdBQUcsTUFBTztBQUFBLE1BQ25CLGNBQWMsMERBQXVCLEVBQUUsT0FBTyxNQUFNLENBQUM7QUFBQSxJQUN2RCxFQUFFO0FBQUEsSUFDRixTQUFTLHlCQUFNLEdBQUcsTUFBTztBQUFBLE1BQ3ZCLGNBQWMsMERBQXVCLEVBQUUsT0FBTyxVQUFVLENBQUM7QUFBQSxJQUMzRCxFQUFFO0FBQUEsRUFDSjtBQUFBLENBQ0YsR0FwQm1CO0FBdUJyQixNQUFNLFFBQVE7QUFBQSxFQUNaLE1BQU07QUFDUjsiLAogICJuYW1lcyI6IFtdCn0K
