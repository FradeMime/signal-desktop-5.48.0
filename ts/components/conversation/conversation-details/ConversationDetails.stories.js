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
var ConversationDetails_stories_exports = {};
__export(ConversationDetails_stories_exports, {
  AsAdmin: () => AsAdmin,
  AsLastAdmin: () => AsLastAdmin,
  AsOnlyAdmin: () => AsOnlyAdmin,
  Basic: () => Basic,
  GroupEditable: () => GroupEditable,
  GroupEditableWithCustomDisappearingTimeout: () => GroupEditableWithCustomDisappearingTimeout,
  GroupLinksOn: () => GroupLinksOn,
  _11: () => _11,
  default: () => ConversationDetails_stories_default
});
module.exports = __toCommonJS(ConversationDetails_stories_exports);
var React = __toESM(require("react"));
var import_addon_actions = require("@storybook/addon-actions");
var import_lodash = require("lodash");
var import_setupI18n = require("../../../util/setupI18n");
var import_messages = __toESM(require("../../../../_locales/en/messages.json"));
var import_ConversationDetails = require("./ConversationDetails");
var import_ChooseGroupMembersModal = require("./AddGroupMembersModal/ChooseGroupMembersModal");
var import_ConfirmAdditionsModal = require("./AddGroupMembersModal/ConfirmAdditionsModal");
var import_getDefaultConversation = require("../../../test-both/helpers/getDefaultConversation");
var import_fakeLookupConversationWithoutUuid = require("../../../test-both/helpers/fakeLookupConversationWithoutUuid");
var import_Util = require("../../../types/Util");
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
var ConversationDetails_stories_default = {
  title: "Components/Conversation/ConversationDetails/ConversationDetails"
};
const conversation = (0, import_getDefaultConversation.getDefaultConversation)({
  id: "",
  lastUpdated: 0,
  title: "Some Conversation",
  groupDescription: "Hello World!",
  type: "group",
  sharedGroupNames: [],
  conversationColor: "ultramarine"
});
const allCandidateContacts = (0, import_lodash.times)(10, () => (0, import_getDefaultConversation.getDefaultConversation)());
const createProps = /* @__PURE__ */ __name((hasGroupLink = false, expireTimer) => ({
  addMembers: async () => {
    (0, import_addon_actions.action)("addMembers");
  },
  areWeASubscriber: false,
  canEditGroupInfo: false,
  conversation: expireTimer ? {
    ...conversation,
    expireTimer
  } : conversation,
  hasActiveCall: false,
  hasGroupLink,
  getPreferredBadge: () => void 0,
  i18n,
  isAdmin: false,
  isGroup: true,
  loadRecentMediaItems: (0, import_addon_actions.action)("loadRecentMediaItems"),
  memberships: (0, import_lodash.times)(32, (i) => ({
    isAdmin: i === 1,
    member: (0, import_getDefaultConversation.getDefaultConversation)({
      isMe: i === 2
    })
  })),
  pendingApprovalMemberships: (0, import_lodash.times)(8, () => ({
    member: (0, import_getDefaultConversation.getDefaultConversation)()
  })),
  pendingMemberships: (0, import_lodash.times)(5, () => ({
    metadata: {},
    member: (0, import_getDefaultConversation.getDefaultConversation)()
  })),
  setDisappearingMessages: (0, import_addon_actions.action)("setDisappearingMessages"),
  showAllMedia: (0, import_addon_actions.action)("showAllMedia"),
  showContactModal: (0, import_addon_actions.action)("showContactModal"),
  showChatColorEditor: (0, import_addon_actions.action)("showChatColorEditor"),
  showGroupLinkManagement: (0, import_addon_actions.action)("showGroupLinkManagement"),
  showGroupV2Permissions: (0, import_addon_actions.action)("showGroupV2Permissions"),
  showConversationNotificationsSettings: (0, import_addon_actions.action)("showConversationNotificationsSettings"),
  showPendingInvites: (0, import_addon_actions.action)("showPendingInvites"),
  showLightboxForMedia: (0, import_addon_actions.action)("showLightboxForMedia"),
  updateGroupAttributes: async () => {
    (0, import_addon_actions.action)("updateGroupAttributes")();
  },
  onBlock: (0, import_addon_actions.action)("onBlock"),
  onLeave: (0, import_addon_actions.action)("onLeave"),
  onUnblock: (0, import_addon_actions.action)("onUnblock"),
  deleteAvatarFromDisk: (0, import_addon_actions.action)("deleteAvatarFromDisk"),
  replaceAvatar: (0, import_addon_actions.action)("replaceAvatar"),
  saveAvatarToDisk: (0, import_addon_actions.action)("saveAvatarToDisk"),
  setMuteExpiration: (0, import_addon_actions.action)("setMuteExpiration"),
  userAvatarData: [],
  toggleSafetyNumberModal: (0, import_addon_actions.action)("toggleSafetyNumberModal"),
  onOutgoingAudioCallInConversation: (0, import_addon_actions.action)("onOutgoingAudioCallInConversation"),
  onOutgoingVideoCallInConversation: (0, import_addon_actions.action)("onOutgoingVideoCallInConversation"),
  searchInConversation: (0, import_addon_actions.action)("searchInConversation"),
  theme: import_Util.ThemeType.light,
  renderChooseGroupMembersModal: (props) => {
    return /* @__PURE__ */ React.createElement(import_ChooseGroupMembersModal.ChooseGroupMembersModal, {
      ...props,
      candidateContacts: allCandidateContacts,
      selectedContacts: [],
      regionCode: "US",
      getPreferredBadge: () => void 0,
      theme: import_Util.ThemeType.light,
      i18n,
      lookupConversationWithoutUuid: (0, import_fakeLookupConversationWithoutUuid.makeFakeLookupConversationWithoutUuid)(),
      showUserNotFoundModal: (0, import_addon_actions.action)("showUserNotFoundModal"),
      isUsernamesEnabled: true
    });
  },
  renderConfirmAdditionsModal: (props) => {
    return /* @__PURE__ */ React.createElement(import_ConfirmAdditionsModal.ConfirmAdditionsModal, {
      ...props,
      selectedContacts: [],
      i18n
    });
  }
}), "createProps");
const Basic = /* @__PURE__ */ __name(() => {
  const props = createProps();
  return /* @__PURE__ */ React.createElement(import_ConversationDetails.ConversationDetails, {
    ...props
  });
}, "Basic");
const AsAdmin = /* @__PURE__ */ __name(() => {
  const props = createProps();
  return /* @__PURE__ */ React.createElement(import_ConversationDetails.ConversationDetails, {
    ...props,
    isAdmin: true
  });
}, "AsAdmin");
AsAdmin.story = {
  name: "as Admin"
};
const AsLastAdmin = /* @__PURE__ */ __name(() => {
  const props = createProps();
  return /* @__PURE__ */ React.createElement(import_ConversationDetails.ConversationDetails, {
    ...props,
    isAdmin: true,
    memberships: (0, import_lodash.times)(32, (i) => ({
      isAdmin: i === 2,
      member: (0, import_getDefaultConversation.getDefaultConversation)({
        isMe: i === 2
      })
    }))
  });
}, "AsLastAdmin");
AsLastAdmin.story = {
  name: "as last admin"
};
const AsOnlyAdmin = /* @__PURE__ */ __name(() => {
  const props = createProps();
  return /* @__PURE__ */ React.createElement(import_ConversationDetails.ConversationDetails, {
    ...props,
    isAdmin: true,
    memberships: [
      {
        isAdmin: true,
        member: (0, import_getDefaultConversation.getDefaultConversation)({
          isMe: true
        })
      }
    ]
  });
}, "AsOnlyAdmin");
AsOnlyAdmin.story = {
  name: "as only admin"
};
const GroupEditable = /* @__PURE__ */ __name(() => {
  const props = createProps();
  return /* @__PURE__ */ React.createElement(import_ConversationDetails.ConversationDetails, {
    ...props,
    canEditGroupInfo: true
  });
}, "GroupEditable");
const GroupEditableWithCustomDisappearingTimeout = /* @__PURE__ */ __name(() => {
  const props = createProps(false, 3 * 24 * 60 * 60);
  return /* @__PURE__ */ React.createElement(import_ConversationDetails.ConversationDetails, {
    ...props,
    canEditGroupInfo: true
  });
}, "GroupEditableWithCustomDisappearingTimeout");
GroupEditableWithCustomDisappearingTimeout.story = {
  name: "Group Editable with custom disappearing timeout"
};
const GroupLinksOn = /* @__PURE__ */ __name(() => {
  const props = createProps(true);
  return /* @__PURE__ */ React.createElement(import_ConversationDetails.ConversationDetails, {
    ...props,
    isAdmin: true
  });
}, "GroupLinksOn");
const _11 = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_ConversationDetails.ConversationDetails, {
  ...createProps(),
  isGroup: false
}), "_11");
_11.story = {
  name: "1:1"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AsAdmin,
  AsLastAdmin,
  AsOnlyAdmin,
  Basic,
  GroupEditable,
  GroupEditableWithCustomDisappearingTimeout,
  GroupLinksOn,
  _11
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ29udmVyc2F0aW9uRGV0YWlscy5zdG9yaWVzLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEtMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgYWN0aW9uIH0gZnJvbSAnQHN0b3J5Ym9vay9hZGRvbi1hY3Rpb25zJztcbmltcG9ydCB7IHRpbWVzIH0gZnJvbSAnbG9kYXNoJztcblxuaW1wb3J0IHsgc2V0dXBJMThuIH0gZnJvbSAnLi4vLi4vLi4vdXRpbC9zZXR1cEkxOG4nO1xuaW1wb3J0IGVuTWVzc2FnZXMgZnJvbSAnLi4vLi4vLi4vLi4vX2xvY2FsZXMvZW4vbWVzc2FnZXMuanNvbic7XG5pbXBvcnQgdHlwZSB7IFByb3BzIH0gZnJvbSAnLi9Db252ZXJzYXRpb25EZXRhaWxzJztcbmltcG9ydCB7IENvbnZlcnNhdGlvbkRldGFpbHMgfSBmcm9tICcuL0NvbnZlcnNhdGlvbkRldGFpbHMnO1xuaW1wb3J0IHsgQ2hvb3NlR3JvdXBNZW1iZXJzTW9kYWwgfSBmcm9tICcuL0FkZEdyb3VwTWVtYmVyc01vZGFsL0Nob29zZUdyb3VwTWVtYmVyc01vZGFsJztcbmltcG9ydCB7IENvbmZpcm1BZGRpdGlvbnNNb2RhbCB9IGZyb20gJy4vQWRkR3JvdXBNZW1iZXJzTW9kYWwvQ29uZmlybUFkZGl0aW9uc01vZGFsJztcbmltcG9ydCB0eXBlIHsgQ29udmVyc2F0aW9uVHlwZSB9IGZyb20gJy4uLy4uLy4uL3N0YXRlL2R1Y2tzL2NvbnZlcnNhdGlvbnMnO1xuaW1wb3J0IHsgZ2V0RGVmYXVsdENvbnZlcnNhdGlvbiB9IGZyb20gJy4uLy4uLy4uL3Rlc3QtYm90aC9oZWxwZXJzL2dldERlZmF1bHRDb252ZXJzYXRpb24nO1xuaW1wb3J0IHsgbWFrZUZha2VMb29rdXBDb252ZXJzYXRpb25XaXRob3V0VXVpZCB9IGZyb20gJy4uLy4uLy4uL3Rlc3QtYm90aC9oZWxwZXJzL2Zha2VMb29rdXBDb252ZXJzYXRpb25XaXRob3V0VXVpZCc7XG5pbXBvcnQgeyBUaGVtZVR5cGUgfSBmcm9tICcuLi8uLi8uLi90eXBlcy9VdGlsJztcblxuY29uc3QgaTE4biA9IHNldHVwSTE4bignZW4nLCBlbk1lc3NhZ2VzKTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICB0aXRsZTogJ0NvbXBvbmVudHMvQ29udmVyc2F0aW9uL0NvbnZlcnNhdGlvbkRldGFpbHMvQ29udmVyc2F0aW9uRGV0YWlscycsXG59O1xuXG5jb25zdCBjb252ZXJzYXRpb246IENvbnZlcnNhdGlvblR5cGUgPSBnZXREZWZhdWx0Q29udmVyc2F0aW9uKHtcbiAgaWQ6ICcnLFxuICBsYXN0VXBkYXRlZDogMCxcbiAgdGl0bGU6ICdTb21lIENvbnZlcnNhdGlvbicsXG4gIGdyb3VwRGVzY3JpcHRpb246ICdIZWxsbyBXb3JsZCEnLFxuICB0eXBlOiAnZ3JvdXAnLFxuICBzaGFyZWRHcm91cE5hbWVzOiBbXSxcbiAgY29udmVyc2F0aW9uQ29sb3I6ICd1bHRyYW1hcmluZScgYXMgY29uc3QsXG59KTtcblxuY29uc3QgYWxsQ2FuZGlkYXRlQ29udGFjdHMgPSB0aW1lcygxMCwgKCkgPT4gZ2V0RGVmYXVsdENvbnZlcnNhdGlvbigpKTtcblxuY29uc3QgY3JlYXRlUHJvcHMgPSAoaGFzR3JvdXBMaW5rID0gZmFsc2UsIGV4cGlyZVRpbWVyPzogbnVtYmVyKTogUHJvcHMgPT4gKHtcbiAgYWRkTWVtYmVyczogYXN5bmMgKCkgPT4ge1xuICAgIGFjdGlvbignYWRkTWVtYmVycycpO1xuICB9LFxuICBhcmVXZUFTdWJzY3JpYmVyOiBmYWxzZSxcbiAgY2FuRWRpdEdyb3VwSW5mbzogZmFsc2UsXG4gIGNvbnZlcnNhdGlvbjogZXhwaXJlVGltZXJcbiAgICA/IHtcbiAgICAgICAgLi4uY29udmVyc2F0aW9uLFxuICAgICAgICBleHBpcmVUaW1lcixcbiAgICAgIH1cbiAgICA6IGNvbnZlcnNhdGlvbixcbiAgaGFzQWN0aXZlQ2FsbDogZmFsc2UsXG4gIGhhc0dyb3VwTGluayxcbiAgZ2V0UHJlZmVycmVkQmFkZ2U6ICgpID0+IHVuZGVmaW5lZCxcbiAgaTE4bixcbiAgaXNBZG1pbjogZmFsc2UsXG4gIGlzR3JvdXA6IHRydWUsXG4gIGxvYWRSZWNlbnRNZWRpYUl0ZW1zOiBhY3Rpb24oJ2xvYWRSZWNlbnRNZWRpYUl0ZW1zJyksXG4gIG1lbWJlcnNoaXBzOiB0aW1lcygzMiwgaSA9PiAoe1xuICAgIGlzQWRtaW46IGkgPT09IDEsXG4gICAgbWVtYmVyOiBnZXREZWZhdWx0Q29udmVyc2F0aW9uKHtcbiAgICAgIGlzTWU6IGkgPT09IDIsXG4gICAgfSksXG4gIH0pKSxcbiAgcGVuZGluZ0FwcHJvdmFsTWVtYmVyc2hpcHM6IHRpbWVzKDgsICgpID0+ICh7XG4gICAgbWVtYmVyOiBnZXREZWZhdWx0Q29udmVyc2F0aW9uKCksXG4gIH0pKSxcbiAgcGVuZGluZ01lbWJlcnNoaXBzOiB0aW1lcyg1LCAoKSA9PiAoe1xuICAgIG1ldGFkYXRhOiB7fSxcbiAgICBtZW1iZXI6IGdldERlZmF1bHRDb252ZXJzYXRpb24oKSxcbiAgfSkpLFxuICBzZXREaXNhcHBlYXJpbmdNZXNzYWdlczogYWN0aW9uKCdzZXREaXNhcHBlYXJpbmdNZXNzYWdlcycpLFxuICBzaG93QWxsTWVkaWE6IGFjdGlvbignc2hvd0FsbE1lZGlhJyksXG4gIHNob3dDb250YWN0TW9kYWw6IGFjdGlvbignc2hvd0NvbnRhY3RNb2RhbCcpLFxuICBzaG93Q2hhdENvbG9yRWRpdG9yOiBhY3Rpb24oJ3Nob3dDaGF0Q29sb3JFZGl0b3InKSxcbiAgc2hvd0dyb3VwTGlua01hbmFnZW1lbnQ6IGFjdGlvbignc2hvd0dyb3VwTGlua01hbmFnZW1lbnQnKSxcbiAgc2hvd0dyb3VwVjJQZXJtaXNzaW9uczogYWN0aW9uKCdzaG93R3JvdXBWMlBlcm1pc3Npb25zJyksXG4gIHNob3dDb252ZXJzYXRpb25Ob3RpZmljYXRpb25zU2V0dGluZ3M6IGFjdGlvbihcbiAgICAnc2hvd0NvbnZlcnNhdGlvbk5vdGlmaWNhdGlvbnNTZXR0aW5ncydcbiAgKSxcbiAgc2hvd1BlbmRpbmdJbnZpdGVzOiBhY3Rpb24oJ3Nob3dQZW5kaW5nSW52aXRlcycpLFxuICBzaG93TGlnaHRib3hGb3JNZWRpYTogYWN0aW9uKCdzaG93TGlnaHRib3hGb3JNZWRpYScpLFxuICB1cGRhdGVHcm91cEF0dHJpYnV0ZXM6IGFzeW5jICgpID0+IHtcbiAgICBhY3Rpb24oJ3VwZGF0ZUdyb3VwQXR0cmlidXRlcycpKCk7XG4gIH0sXG4gIG9uQmxvY2s6IGFjdGlvbignb25CbG9jaycpLFxuICBvbkxlYXZlOiBhY3Rpb24oJ29uTGVhdmUnKSxcbiAgb25VbmJsb2NrOiBhY3Rpb24oJ29uVW5ibG9jaycpLFxuICBkZWxldGVBdmF0YXJGcm9tRGlzazogYWN0aW9uKCdkZWxldGVBdmF0YXJGcm9tRGlzaycpLFxuICByZXBsYWNlQXZhdGFyOiBhY3Rpb24oJ3JlcGxhY2VBdmF0YXInKSxcbiAgc2F2ZUF2YXRhclRvRGlzazogYWN0aW9uKCdzYXZlQXZhdGFyVG9EaXNrJyksXG4gIHNldE11dGVFeHBpcmF0aW9uOiBhY3Rpb24oJ3NldE11dGVFeHBpcmF0aW9uJyksXG4gIHVzZXJBdmF0YXJEYXRhOiBbXSxcbiAgdG9nZ2xlU2FmZXR5TnVtYmVyTW9kYWw6IGFjdGlvbigndG9nZ2xlU2FmZXR5TnVtYmVyTW9kYWwnKSxcbiAgb25PdXRnb2luZ0F1ZGlvQ2FsbEluQ29udmVyc2F0aW9uOiBhY3Rpb24oXG4gICAgJ29uT3V0Z29pbmdBdWRpb0NhbGxJbkNvbnZlcnNhdGlvbidcbiAgKSxcbiAgb25PdXRnb2luZ1ZpZGVvQ2FsbEluQ29udmVyc2F0aW9uOiBhY3Rpb24oXG4gICAgJ29uT3V0Z29pbmdWaWRlb0NhbGxJbkNvbnZlcnNhdGlvbidcbiAgKSxcbiAgc2VhcmNoSW5Db252ZXJzYXRpb246IGFjdGlvbignc2VhcmNoSW5Db252ZXJzYXRpb24nKSxcbiAgdGhlbWU6IFRoZW1lVHlwZS5saWdodCxcbiAgcmVuZGVyQ2hvb3NlR3JvdXBNZW1iZXJzTW9kYWw6IHByb3BzID0+IHtcbiAgICByZXR1cm4gKFxuICAgICAgPENob29zZUdyb3VwTWVtYmVyc01vZGFsXG4gICAgICAgIHsuLi5wcm9wc31cbiAgICAgICAgY2FuZGlkYXRlQ29udGFjdHM9e2FsbENhbmRpZGF0ZUNvbnRhY3RzfVxuICAgICAgICBzZWxlY3RlZENvbnRhY3RzPXtbXX1cbiAgICAgICAgcmVnaW9uQ29kZT1cIlVTXCJcbiAgICAgICAgZ2V0UHJlZmVycmVkQmFkZ2U9eygpID0+IHVuZGVmaW5lZH1cbiAgICAgICAgdGhlbWU9e1RoZW1lVHlwZS5saWdodH1cbiAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgbG9va3VwQ29udmVyc2F0aW9uV2l0aG91dFV1aWQ9e21ha2VGYWtlTG9va3VwQ29udmVyc2F0aW9uV2l0aG91dFV1aWQoKX1cbiAgICAgICAgc2hvd1VzZXJOb3RGb3VuZE1vZGFsPXthY3Rpb24oJ3Nob3dVc2VyTm90Rm91bmRNb2RhbCcpfVxuICAgICAgICBpc1VzZXJuYW1lc0VuYWJsZWRcbiAgICAgIC8+XG4gICAgKTtcbiAgfSxcbiAgcmVuZGVyQ29uZmlybUFkZGl0aW9uc01vZGFsOiBwcm9wcyA9PiB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxDb25maXJtQWRkaXRpb25zTW9kYWwgey4uLnByb3BzfSBzZWxlY3RlZENvbnRhY3RzPXtbXX0gaTE4bj17aTE4bn0gLz5cbiAgICApO1xuICB9LFxufSk7XG5cbmV4cG9ydCBjb25zdCBCYXNpYyA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IHByb3BzID0gY3JlYXRlUHJvcHMoKTtcblxuICByZXR1cm4gPENvbnZlcnNhdGlvbkRldGFpbHMgey4uLnByb3BzfSAvPjtcbn07XG5cbmV4cG9ydCBjb25zdCBBc0FkbWluID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgcHJvcHMgPSBjcmVhdGVQcm9wcygpO1xuXG4gIHJldHVybiA8Q29udmVyc2F0aW9uRGV0YWlscyB7Li4ucHJvcHN9IGlzQWRtaW4gLz47XG59O1xuXG5Bc0FkbWluLnN0b3J5ID0ge1xuICBuYW1lOiAnYXMgQWRtaW4nLFxufTtcblxuZXhwb3J0IGNvbnN0IEFzTGFzdEFkbWluID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgcHJvcHMgPSBjcmVhdGVQcm9wcygpO1xuXG4gIHJldHVybiAoXG4gICAgPENvbnZlcnNhdGlvbkRldGFpbHNcbiAgICAgIHsuLi5wcm9wc31cbiAgICAgIGlzQWRtaW5cbiAgICAgIG1lbWJlcnNoaXBzPXt0aW1lcygzMiwgaSA9PiAoe1xuICAgICAgICBpc0FkbWluOiBpID09PSAyLFxuICAgICAgICBtZW1iZXI6IGdldERlZmF1bHRDb252ZXJzYXRpb24oe1xuICAgICAgICAgIGlzTWU6IGkgPT09IDIsXG4gICAgICAgIH0pLFxuICAgICAgfSkpfVxuICAgIC8+XG4gICk7XG59O1xuXG5Bc0xhc3RBZG1pbi5zdG9yeSA9IHtcbiAgbmFtZTogJ2FzIGxhc3QgYWRtaW4nLFxufTtcblxuZXhwb3J0IGNvbnN0IEFzT25seUFkbWluID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgcHJvcHMgPSBjcmVhdGVQcm9wcygpO1xuXG4gIHJldHVybiAoXG4gICAgPENvbnZlcnNhdGlvbkRldGFpbHNcbiAgICAgIHsuLi5wcm9wc31cbiAgICAgIGlzQWRtaW5cbiAgICAgIG1lbWJlcnNoaXBzPXtbXG4gICAgICAgIHtcbiAgICAgICAgICBpc0FkbWluOiB0cnVlLFxuICAgICAgICAgIG1lbWJlcjogZ2V0RGVmYXVsdENvbnZlcnNhdGlvbih7XG4gICAgICAgICAgICBpc01lOiB0cnVlLFxuICAgICAgICAgIH0pLFxuICAgICAgICB9LFxuICAgICAgXX1cbiAgICAvPlxuICApO1xufTtcblxuQXNPbmx5QWRtaW4uc3RvcnkgPSB7XG4gIG5hbWU6ICdhcyBvbmx5IGFkbWluJyxcbn07XG5cbmV4cG9ydCBjb25zdCBHcm91cEVkaXRhYmxlID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgcHJvcHMgPSBjcmVhdGVQcm9wcygpO1xuXG4gIHJldHVybiA8Q29udmVyc2F0aW9uRGV0YWlscyB7Li4ucHJvcHN9IGNhbkVkaXRHcm91cEluZm8gLz47XG59O1xuXG5leHBvcnQgY29uc3QgR3JvdXBFZGl0YWJsZVdpdGhDdXN0b21EaXNhcHBlYXJpbmdUaW1lb3V0ID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgcHJvcHMgPSBjcmVhdGVQcm9wcyhmYWxzZSwgMyAqIDI0ICogNjAgKiA2MCk7XG5cbiAgcmV0dXJuIDxDb252ZXJzYXRpb25EZXRhaWxzIHsuLi5wcm9wc30gY2FuRWRpdEdyb3VwSW5mbyAvPjtcbn07XG5cbkdyb3VwRWRpdGFibGVXaXRoQ3VzdG9tRGlzYXBwZWFyaW5nVGltZW91dC5zdG9yeSA9IHtcbiAgbmFtZTogJ0dyb3VwIEVkaXRhYmxlIHdpdGggY3VzdG9tIGRpc2FwcGVhcmluZyB0aW1lb3V0Jyxcbn07XG5cbmV4cG9ydCBjb25zdCBHcm91cExpbmtzT24gPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBwcm9wcyA9IGNyZWF0ZVByb3BzKHRydWUpO1xuXG4gIHJldHVybiA8Q29udmVyc2F0aW9uRGV0YWlscyB7Li4ucHJvcHN9IGlzQWRtaW4gLz47XG59O1xuXG5leHBvcnQgY29uc3QgXzExID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPENvbnZlcnNhdGlvbkRldGFpbHMgey4uLmNyZWF0ZVByb3BzKCl9IGlzR3JvdXA9e2ZhbHNlfSAvPlxuKTtcblxuXzExLnN0b3J5ID0ge1xuICBuYW1lOiAnMToxJyxcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdB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
