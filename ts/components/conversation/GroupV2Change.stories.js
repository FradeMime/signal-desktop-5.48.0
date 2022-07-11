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
var GroupV2Change_stories_exports = {};
__export(GroupV2Change_stories_exports, {
  AccessAttributes: () => AccessAttributes,
  AccessInviteLink: () => AccessInviteLink,
  AccessMembers: () => AccessMembers,
  AdminApprovalAdd: () => AdminApprovalAdd,
  AdminApprovalRemove: () => AdminApprovalRemove,
  AnnouncementGroupChange: () => AnnouncementGroupChange,
  Avatar: () => Avatar,
  Create: () => Create,
  DescriptionChange: () => DescriptionChange,
  DescriptionRemove: () => DescriptionRemove,
  GroupLinkAdd: () => GroupLinkAdd,
  GroupLinkRemove: () => GroupLinkRemove,
  GroupLinkReset: () => GroupLinkReset,
  MemberAdd: () => MemberAdd,
  MemberAddFromAdminApproval: () => MemberAddFromAdminApproval,
  MemberAddFromInvited: () => MemberAddFromInvited,
  MemberAddFromLink: () => MemberAddFromLink,
  MemberPrivilege: () => MemberPrivilege,
  MemberRemove: () => MemberRemove,
  Multiple: () => Multiple,
  PendingAddMany: () => PendingAddMany,
  PendingAddOne: () => PendingAddOne,
  PendingRemoveMany: () => PendingRemoveMany,
  PendingRemoveOne: () => PendingRemoveOne,
  Title: () => Title,
  default: () => GroupV2Change_stories_default
});
module.exports = __toCommonJS(GroupV2Change_stories_exports);
var React = __toESM(require("react"));
var import_addon_actions = require("@storybook/addon-actions");
var import_setupI18n = require("../../util/setupI18n");
var import_UUID = require("../../types/UUID");
var import_messages = __toESM(require("../../../_locales/en/messages.json"));
var import_protobuf = require("../../protobuf");
var import_GroupV2Change = require("./GroupV2Change");
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
const OUR_ID = import_UUID.UUID.generate().toString();
const CONTACT_A = import_UUID.UUID.generate().toString();
const CONTACT_B = import_UUID.UUID.generate().toString();
const CONTACT_C = import_UUID.UUID.generate().toString();
const ADMIN_A = import_UUID.UUID.generate().toString();
const INVITEE_A = import_UUID.UUID.generate().toString();
const AccessControlEnum = import_protobuf.SignalService.AccessControl.AccessRequired;
const RoleEnum = import_protobuf.SignalService.Member.Role;
const renderContact = /* @__PURE__ */ __name((conversationId) => /* @__PURE__ */ React.createElement(React.Fragment, {
  key: conversationId
}, `Conversation(${conversationId})`), "renderContact");
const renderChange = /* @__PURE__ */ __name((change, {
  groupBannedMemberships,
  groupMemberships,
  groupName,
  areWeAdmin = true
} = {}) => /* @__PURE__ */ React.createElement(import_GroupV2Change.GroupV2Change, {
  areWeAdmin: areWeAdmin ?? true,
  blockGroupLinkRequests: (0, import_addon_actions.action)("blockGroupLinkRequests"),
  change,
  groupBannedMemberships,
  groupMemberships,
  groupName,
  i18n,
  ourUuid: OUR_ID,
  renderContact
}), "renderChange");
var GroupV2Change_stories_default = {
  title: "Components/Conversation/GroupV2Change"
};
const Multiple = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ React.createElement(React.Fragment, null, renderChange({
    from: CONTACT_A,
    details: [
      {
        type: "title",
        newTitle: "Saturday Running"
      },
      {
        type: "avatar",
        removed: false
      },
      {
        type: "description",
        description: "This is a long description.\n\nWe need a dialog to view it all!\n\nIt has a link to https://example.com"
      },
      {
        type: "member-add",
        uuid: OUR_ID
      },
      {
        type: "description",
        description: "Another description"
      },
      {
        type: "member-privilege",
        uuid: OUR_ID,
        newPrivilege: RoleEnum.ADMINISTRATOR
      }
    ]
  }));
}, "Multiple");
const Create = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ React.createElement(React.Fragment, null, renderChange({
    from: OUR_ID,
    details: [
      {
        type: "create"
      }
    ]
  }), renderChange({
    from: CONTACT_A,
    details: [
      {
        type: "create"
      }
    ]
  }), renderChange({
    details: [
      {
        type: "create"
      }
    ]
  }));
}, "Create");
const Title = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ React.createElement(React.Fragment, null, renderChange({
    from: OUR_ID,
    details: [
      {
        type: "title",
        newTitle: "Saturday Running"
      }
    ]
  }), renderChange({
    from: CONTACT_A,
    details: [
      {
        type: "title",
        newTitle: "Saturday Running"
      }
    ]
  }), renderChange({
    details: [
      {
        type: "title",
        newTitle: "Saturday Running"
      }
    ]
  }), renderChange({
    from: OUR_ID,
    details: [
      {
        type: "title"
      }
    ]
  }), renderChange({
    from: CONTACT_A,
    details: [
      {
        type: "title"
      }
    ]
  }), renderChange({
    details: [
      {
        type: "title"
      }
    ]
  }));
}, "Title");
const Avatar = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ React.createElement(React.Fragment, null, renderChange({
    from: OUR_ID,
    details: [
      {
        type: "avatar",
        removed: false
      }
    ]
  }), renderChange({
    from: CONTACT_A,
    details: [
      {
        type: "avatar",
        removed: false
      }
    ]
  }), renderChange({
    details: [
      {
        type: "avatar",
        removed: false
      }
    ]
  }), renderChange({
    from: OUR_ID,
    details: [
      {
        type: "avatar",
        removed: true
      }
    ]
  }), renderChange({
    from: CONTACT_A,
    details: [
      {
        type: "avatar",
        removed: true
      }
    ]
  }), renderChange({
    details: [
      {
        type: "avatar",
        removed: true
      }
    ]
  }));
}, "Avatar");
const AccessAttributes = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ React.createElement(React.Fragment, null, renderChange({
    from: OUR_ID,
    details: [
      {
        type: "access-attributes",
        newPrivilege: AccessControlEnum.ADMINISTRATOR
      }
    ]
  }), renderChange({
    from: ADMIN_A,
    details: [
      {
        type: "access-attributes",
        newPrivilege: AccessControlEnum.ADMINISTRATOR
      }
    ]
  }), renderChange({
    details: [
      {
        type: "access-attributes",
        newPrivilege: AccessControlEnum.ADMINISTRATOR
      }
    ]
  }), renderChange({
    from: OUR_ID,
    details: [
      {
        type: "access-attributes",
        newPrivilege: AccessControlEnum.MEMBER
      }
    ]
  }), renderChange({
    from: ADMIN_A,
    details: [
      {
        type: "access-attributes",
        newPrivilege: AccessControlEnum.MEMBER
      }
    ]
  }), renderChange({
    details: [
      {
        type: "access-attributes",
        newPrivilege: AccessControlEnum.MEMBER
      }
    ]
  }));
}, "AccessAttributes");
AccessAttributes.story = {
  name: "Access (Attributes)"
};
const AccessMembers = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ React.createElement(React.Fragment, null, renderChange({
    from: OUR_ID,
    details: [
      {
        type: "access-members",
        newPrivilege: AccessControlEnum.ADMINISTRATOR
      }
    ]
  }), renderChange({
    from: ADMIN_A,
    details: [
      {
        type: "access-members",
        newPrivilege: AccessControlEnum.ADMINISTRATOR
      }
    ]
  }), renderChange({
    details: [
      {
        type: "access-members",
        newPrivilege: AccessControlEnum.ADMINISTRATOR
      }
    ]
  }), renderChange({
    from: OUR_ID,
    details: [
      {
        type: "access-members",
        newPrivilege: AccessControlEnum.MEMBER
      }
    ]
  }), renderChange({
    from: ADMIN_A,
    details: [
      {
        type: "access-members",
        newPrivilege: AccessControlEnum.MEMBER
      }
    ]
  }), renderChange({
    details: [
      {
        type: "access-members",
        newPrivilege: AccessControlEnum.MEMBER
      }
    ]
  }));
}, "AccessMembers");
AccessMembers.story = {
  name: "Access (Members)"
};
const AccessInviteLink = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ React.createElement(React.Fragment, null, renderChange({
    from: OUR_ID,
    details: [
      {
        type: "access-invite-link",
        newPrivilege: AccessControlEnum.ANY
      }
    ]
  }), renderChange({
    from: ADMIN_A,
    details: [
      {
        type: "access-invite-link",
        newPrivilege: AccessControlEnum.ANY
      }
    ]
  }), renderChange({
    details: [
      {
        type: "access-invite-link",
        newPrivilege: AccessControlEnum.ANY
      }
    ]
  }), renderChange({
    from: OUR_ID,
    details: [
      {
        type: "access-invite-link",
        newPrivilege: AccessControlEnum.ADMINISTRATOR
      }
    ]
  }), renderChange({
    from: ADMIN_A,
    details: [
      {
        type: "access-invite-link",
        newPrivilege: AccessControlEnum.ADMINISTRATOR
      }
    ]
  }), renderChange({
    details: [
      {
        type: "access-invite-link",
        newPrivilege: AccessControlEnum.ADMINISTRATOR
      }
    ]
  }));
}, "AccessInviteLink");
AccessInviteLink.story = {
  name: "Access (Invite Link)"
};
const MemberAdd = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ React.createElement(React.Fragment, null, renderChange({
    from: OUR_ID,
    details: [
      {
        type: "member-add",
        uuid: OUR_ID
      }
    ]
  }), renderChange({
    from: CONTACT_A,
    details: [
      {
        type: "member-add",
        uuid: OUR_ID
      }
    ]
  }), renderChange({
    details: [
      {
        type: "member-add",
        uuid: OUR_ID
      }
    ]
  }), renderChange({
    from: OUR_ID,
    details: [
      {
        type: "member-add",
        uuid: CONTACT_A
      }
    ]
  }), renderChange({
    from: CONTACT_B,
    details: [
      {
        type: "member-add",
        uuid: CONTACT_A
      }
    ]
  }), renderChange({
    details: [
      {
        type: "member-add",
        uuid: CONTACT_A
      }
    ]
  }));
}, "MemberAdd");
const MemberAddFromInvited = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ React.createElement(React.Fragment, null, renderChange({
    from: CONTACT_A,
    details: [
      {
        type: "member-add-from-invite",
        uuid: OUR_ID,
        inviter: CONTACT_B
      }
    ]
  }), renderChange({
    details: [
      {
        type: "member-add-from-invite",
        uuid: OUR_ID,
        inviter: CONTACT_A
      }
    ]
  }), renderChange({
    from: OUR_ID,
    details: [
      {
        type: "member-add-from-invite",
        uuid: CONTACT_A,
        inviter: CONTACT_B
      }
    ]
  }), renderChange({
    from: CONTACT_A,
    details: [
      {
        type: "member-add-from-invite",
        uuid: CONTACT_B,
        inviter: CONTACT_C
      }
    ]
  }), renderChange({
    details: [
      {
        type: "member-add-from-invite",
        uuid: CONTACT_A,
        inviter: CONTACT_B
      }
    ]
  }), renderChange({
    from: OUR_ID,
    details: [
      {
        type: "member-add-from-invite",
        uuid: OUR_ID,
        inviter: CONTACT_A
      }
    ]
  }), renderChange({
    from: OUR_ID,
    details: [
      {
        type: "member-add-from-invite",
        uuid: OUR_ID
      }
    ]
  }), renderChange({
    from: CONTACT_A,
    details: [
      {
        type: "member-add-from-invite",
        uuid: CONTACT_A,
        inviter: OUR_ID
      }
    ]
  }), renderChange({
    from: CONTACT_A,
    details: [
      {
        type: "member-add-from-invite",
        uuid: CONTACT_A,
        inviter: CONTACT_B
      }
    ]
  }), renderChange({
    from: CONTACT_A,
    details: [
      {
        type: "member-add-from-invite",
        uuid: CONTACT_A
      }
    ]
  }));
}, "MemberAddFromInvited");
MemberAddFromInvited.story = {
  name: "Member Add (from invited)"
};
const MemberAddFromLink = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ React.createElement(React.Fragment, null, renderChange({
    from: OUR_ID,
    details: [
      {
        type: "member-add-from-link",
        uuid: OUR_ID
      }
    ]
  }), renderChange({
    from: CONTACT_A,
    details: [
      {
        type: "member-add-from-link",
        uuid: CONTACT_A
      }
    ]
  }), renderChange({
    details: [
      {
        type: "member-add-from-link",
        uuid: CONTACT_A
      }
    ]
  }));
}, "MemberAddFromLink");
MemberAddFromLink.story = {
  name: "Member Add (from link)"
};
const MemberAddFromAdminApproval = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ React.createElement(React.Fragment, null, renderChange({
    from: ADMIN_A,
    details: [
      {
        type: "member-add-from-admin-approval",
        uuid: OUR_ID
      }
    ]
  }), renderChange({
    details: [
      {
        type: "member-add-from-admin-approval",
        uuid: OUR_ID
      }
    ]
  }), renderChange({
    from: OUR_ID,
    details: [
      {
        type: "member-add-from-admin-approval",
        uuid: CONTACT_A
      }
    ]
  }), renderChange({
    from: ADMIN_A,
    details: [
      {
        type: "member-add-from-admin-approval",
        uuid: CONTACT_A
      }
    ]
  }), renderChange({
    details: [
      {
        type: "member-add-from-admin-approval",
        uuid: CONTACT_A
      }
    ]
  }));
}, "MemberAddFromAdminApproval");
MemberAddFromAdminApproval.story = {
  name: "Member Add (from admin approval)"
};
const MemberRemove = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ React.createElement(React.Fragment, null, renderChange({
    from: OUR_ID,
    details: [
      {
        type: "member-remove",
        uuid: OUR_ID
      }
    ]
  }), renderChange({
    from: CONTACT_A,
    details: [
      {
        type: "member-remove",
        uuid: OUR_ID
      }
    ]
  }), renderChange({
    details: [
      {
        type: "member-remove",
        uuid: OUR_ID
      }
    ]
  }), renderChange({
    from: OUR_ID,
    details: [
      {
        type: "member-remove",
        uuid: CONTACT_A
      }
    ]
  }), renderChange({
    from: CONTACT_A,
    details: [
      {
        type: "member-remove",
        uuid: CONTACT_A
      }
    ]
  }), renderChange({
    from: CONTACT_B,
    details: [
      {
        type: "member-remove",
        uuid: CONTACT_A
      }
    ]
  }), renderChange({
    details: [
      {
        type: "member-remove",
        uuid: CONTACT_A
      }
    ]
  }));
}, "MemberRemove");
const MemberPrivilege = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ React.createElement(React.Fragment, null, renderChange({
    from: CONTACT_A,
    details: [
      {
        type: "member-privilege",
        uuid: OUR_ID,
        newPrivilege: RoleEnum.ADMINISTRATOR
      }
    ]
  }), renderChange({
    details: [
      {
        type: "member-privilege",
        uuid: OUR_ID,
        newPrivilege: RoleEnum.ADMINISTRATOR
      }
    ]
  }), renderChange({
    from: OUR_ID,
    details: [
      {
        type: "member-privilege",
        uuid: CONTACT_A,
        newPrivilege: RoleEnum.ADMINISTRATOR
      }
    ]
  }), renderChange({
    from: ADMIN_A,
    details: [
      {
        type: "member-privilege",
        uuid: CONTACT_A,
        newPrivilege: RoleEnum.ADMINISTRATOR
      }
    ]
  }), renderChange({
    details: [
      {
        type: "member-privilege",
        uuid: CONTACT_A,
        newPrivilege: RoleEnum.ADMINISTRATOR
      }
    ]
  }), renderChange({
    from: CONTACT_A,
    details: [
      {
        type: "member-privilege",
        uuid: OUR_ID,
        newPrivilege: RoleEnum.DEFAULT
      }
    ]
  }), renderChange({
    details: [
      {
        type: "member-privilege",
        uuid: OUR_ID,
        newPrivilege: RoleEnum.DEFAULT
      }
    ]
  }), renderChange({
    from: OUR_ID,
    details: [
      {
        type: "member-privilege",
        uuid: CONTACT_A,
        newPrivilege: RoleEnum.DEFAULT
      }
    ]
  }), renderChange({
    from: ADMIN_A,
    details: [
      {
        type: "member-privilege",
        uuid: CONTACT_A,
        newPrivilege: RoleEnum.DEFAULT
      }
    ]
  }), renderChange({
    details: [
      {
        type: "member-privilege",
        uuid: CONTACT_A,
        newPrivilege: RoleEnum.DEFAULT
      }
    ]
  }));
}, "MemberPrivilege");
const PendingAddOne = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ React.createElement(React.Fragment, null, renderChange({
    from: CONTACT_A,
    details: [
      {
        type: "pending-add-one",
        uuid: OUR_ID
      }
    ]
  }), renderChange({
    details: [
      {
        type: "pending-add-one",
        uuid: OUR_ID
      }
    ]
  }), renderChange({
    from: OUR_ID,
    details: [
      {
        type: "pending-add-one",
        uuid: INVITEE_A
      }
    ]
  }), renderChange({
    from: CONTACT_B,
    details: [
      {
        type: "pending-add-one",
        uuid: INVITEE_A
      }
    ]
  }), renderChange({
    details: [
      {
        type: "pending-add-one",
        uuid: INVITEE_A
      }
    ]
  }));
}, "PendingAddOne");
PendingAddOne.story = {
  name: "Pending Add - one"
};
const PendingAddMany = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ React.createElement(React.Fragment, null, renderChange({
    from: OUR_ID,
    details: [
      {
        type: "pending-add-many",
        count: 5
      }
    ]
  }), renderChange({
    from: CONTACT_A,
    details: [
      {
        type: "pending-add-many",
        count: 5
      }
    ]
  }), renderChange({
    details: [
      {
        type: "pending-add-many",
        count: 5
      }
    ]
  }));
}, "PendingAddMany");
PendingAddMany.story = {
  name: "Pending Add - many"
};
const PendingRemoveOne = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ React.createElement(React.Fragment, null, renderChange({
    from: INVITEE_A,
    details: [
      {
        type: "pending-remove-one",
        uuid: INVITEE_A,
        inviter: OUR_ID
      }
    ]
  }), renderChange({
    from: OUR_ID,
    details: [
      {
        type: "pending-remove-one",
        uuid: INVITEE_A,
        inviter: OUR_ID
      }
    ]
  }), renderChange({
    from: ADMIN_A,
    details: [
      {
        type: "pending-remove-one",
        uuid: INVITEE_A,
        inviter: OUR_ID
      }
    ]
  }), renderChange({
    details: [
      {
        type: "pending-remove-one",
        uuid: INVITEE_A,
        inviter: OUR_ID
      }
    ]
  }), renderChange({
    from: INVITEE_A,
    details: [
      {
        type: "pending-remove-one",
        uuid: INVITEE_A
      }
    ]
  }), renderChange({
    from: INVITEE_A,
    details: [
      {
        type: "pending-remove-one",
        uuid: INVITEE_A,
        inviter: CONTACT_B
      }
    ]
  }), renderChange({
    from: CONTACT_B,
    details: [
      {
        type: "pending-remove-one",
        uuid: OUR_ID,
        inviter: CONTACT_B
      }
    ]
  }), renderChange({
    from: CONTACT_A,
    details: [
      {
        type: "pending-remove-one",
        uuid: CONTACT_B,
        inviter: CONTACT_A
      }
    ]
  }), renderChange({
    from: CONTACT_C,
    details: [
      {
        type: "pending-remove-one",
        uuid: INVITEE_A,
        inviter: CONTACT_B
      }
    ]
  }), renderChange({
    from: OUR_ID,
    details: [
      {
        type: "pending-remove-one",
        uuid: INVITEE_A,
        inviter: CONTACT_B
      }
    ]
  }), renderChange({
    details: [
      {
        type: "pending-remove-one",
        uuid: INVITEE_A,
        inviter: CONTACT_B
      }
    ]
  }), renderChange({
    from: OUR_ID,
    details: [
      {
        type: "pending-remove-one",
        uuid: INVITEE_A
      }
    ]
  }), renderChange({
    from: CONTACT_B,
    details: [
      {
        type: "pending-remove-one",
        uuid: INVITEE_A
      }
    ]
  }), renderChange({
    details: [
      {
        type: "pending-remove-one",
        uuid: INVITEE_A
      }
    ]
  }));
}, "PendingRemoveOne");
PendingRemoveOne.story = {
  name: "Pending Remove - one"
};
const PendingRemoveMany = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ React.createElement(React.Fragment, null, renderChange({
    from: OUR_ID,
    details: [
      {
        type: "pending-remove-many",
        count: 5,
        inviter: OUR_ID
      }
    ]
  }), renderChange({
    from: ADMIN_A,
    details: [
      {
        type: "pending-remove-many",
        count: 5,
        inviter: OUR_ID
      }
    ]
  }), renderChange({
    details: [
      {
        type: "pending-remove-many",
        count: 5,
        inviter: OUR_ID
      }
    ]
  }), renderChange({
    from: OUR_ID,
    details: [
      {
        type: "pending-remove-many",
        count: 5,
        inviter: CONTACT_A
      }
    ]
  }), renderChange({
    from: ADMIN_A,
    details: [
      {
        type: "pending-remove-many",
        count: 5,
        inviter: CONTACT_A
      }
    ]
  }), renderChange({
    details: [
      {
        type: "pending-remove-many",
        count: 5,
        inviter: CONTACT_A
      }
    ]
  }), renderChange({
    from: OUR_ID,
    details: [
      {
        type: "pending-remove-many",
        count: 5
      }
    ]
  }), renderChange({
    from: CONTACT_A,
    details: [
      {
        type: "pending-remove-many",
        count: 5
      }
    ]
  }), renderChange({
    details: [
      {
        type: "pending-remove-many",
        count: 5
      }
    ]
  }));
}, "PendingRemoveMany");
PendingRemoveMany.story = {
  name: "Pending Remove - many"
};
const AdminApprovalAdd = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ React.createElement(React.Fragment, null, renderChange({
    details: [
      {
        type: "admin-approval-add-one",
        uuid: OUR_ID
      }
    ]
  }), renderChange({
    details: [
      {
        type: "admin-approval-add-one",
        uuid: CONTACT_A
      }
    ]
  }));
}, "AdminApprovalAdd");
AdminApprovalAdd.story = {
  name: "Admin Approval (Add)"
};
const AdminApprovalRemove = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ React.createElement(React.Fragment, null, renderChange({
    from: OUR_ID,
    details: [
      {
        type: "admin-approval-remove-one",
        uuid: OUR_ID
      }
    ]
  }), renderChange({
    details: [
      {
        type: "admin-approval-remove-one",
        uuid: OUR_ID
      }
    ]
  }), renderChange({
    from: OUR_ID,
    details: [
      {
        type: "admin-approval-remove-one",
        uuid: CONTACT_A
      }
    ]
  }), "Should show button:", renderChange({
    from: CONTACT_A,
    details: [
      {
        type: "admin-approval-remove-one",
        uuid: CONTACT_A
      }
    ]
  }, {
    groupMemberships: [{ uuid: CONTACT_C, isAdmin: false }],
    groupBannedMemberships: [CONTACT_B]
  }), renderChange({
    from: ADMIN_A,
    details: [
      {
        type: "admin-approval-remove-one",
        uuid: CONTACT_A
      }
    ]
  }), "Should show button:", renderChange({
    details: [
      {
        type: "admin-approval-remove-one",
        uuid: CONTACT_A
      }
    ]
  }, {
    groupMemberships: [{ uuid: CONTACT_C, isAdmin: false }],
    groupBannedMemberships: [CONTACT_B]
  }), "Would show button, but we're not admin:", renderChange({
    from: CONTACT_A,
    details: [
      {
        type: "admin-approval-remove-one",
        uuid: CONTACT_A
      }
    ]
  }, { areWeAdmin: false, groupName: "Group 1" }), "Would show button, but user is a group member:", renderChange({
    from: CONTACT_A,
    details: [
      {
        type: "admin-approval-remove-one",
        uuid: CONTACT_A
      }
    ]
  }, { groupMemberships: [{ uuid: CONTACT_A, isAdmin: false }] }), "Would show button, but user is already banned:", renderChange({
    from: CONTACT_A,
    details: [
      {
        type: "admin-approval-remove-one",
        uuid: CONTACT_A
      }
    ]
  }, { groupBannedMemberships: [CONTACT_A] }));
}, "AdminApprovalRemove");
AdminApprovalRemove.story = {
  name: "Admin Approval (Remove)"
};
const GroupLinkAdd = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ React.createElement(React.Fragment, null, renderChange({
    from: OUR_ID,
    details: [
      {
        type: "group-link-add",
        privilege: AccessControlEnum.ANY
      }
    ]
  }), renderChange({
    from: ADMIN_A,
    details: [
      {
        type: "group-link-add",
        privilege: AccessControlEnum.ANY
      }
    ]
  }), renderChange({
    details: [
      {
        type: "group-link-add",
        privilege: AccessControlEnum.ANY
      }
    ]
  }), renderChange({
    from: OUR_ID,
    details: [
      {
        type: "group-link-add",
        privilege: AccessControlEnum.ADMINISTRATOR
      }
    ]
  }), renderChange({
    from: ADMIN_A,
    details: [
      {
        type: "group-link-add",
        privilege: AccessControlEnum.ADMINISTRATOR
      }
    ]
  }), renderChange({
    details: [
      {
        type: "group-link-add",
        privilege: AccessControlEnum.ADMINISTRATOR
      }
    ]
  }));
}, "GroupLinkAdd");
GroupLinkAdd.story = {
  name: "Group Link (Add)"
};
const GroupLinkReset = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ React.createElement(React.Fragment, null, renderChange({
    from: OUR_ID,
    details: [
      {
        type: "group-link-reset"
      }
    ]
  }), renderChange({
    from: ADMIN_A,
    details: [
      {
        type: "group-link-reset"
      }
    ]
  }), renderChange({
    details: [
      {
        type: "group-link-reset"
      }
    ]
  }));
}, "GroupLinkReset");
GroupLinkReset.story = {
  name: "Group Link (Reset)"
};
const GroupLinkRemove = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ React.createElement(React.Fragment, null, renderChange({
    from: OUR_ID,
    details: [
      {
        type: "group-link-remove"
      }
    ]
  }), renderChange({
    from: ADMIN_A,
    details: [
      {
        type: "group-link-remove"
      }
    ]
  }), renderChange({
    details: [
      {
        type: "group-link-remove"
      }
    ]
  }));
}, "GroupLinkRemove");
GroupLinkRemove.story = {
  name: "Group Link (Remove)"
};
const DescriptionRemove = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ React.createElement(React.Fragment, null, renderChange({
    from: OUR_ID,
    details: [
      {
        removed: true,
        type: "description"
      }
    ]
  }), renderChange({
    from: ADMIN_A,
    details: [
      {
        removed: true,
        type: "description"
      }
    ]
  }), renderChange({
    details: [
      {
        removed: true,
        type: "description"
      }
    ]
  }));
}, "DescriptionRemove");
DescriptionRemove.story = {
  name: "Description (Remove)"
};
const DescriptionChange = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ React.createElement(React.Fragment, null, renderChange({
    from: OUR_ID,
    details: [
      {
        type: "description",
        description: "This is a long description.\n\nWe need a dialog to view it all!\n\nIt has a link to https://example.com"
      }
    ]
  }, { groupName: "We do hikes \u{1F332}" }), renderChange({
    from: ADMIN_A,
    details: [
      {
        type: "description",
        description: "This is a long description.\n\nWe need a dialog to view it all!\n\nIt has a link to https://example.com"
      }
    ]
  }, { groupName: "We do hikes \u{1F332}" }), renderChange({
    details: [
      {
        type: "description",
        description: "This is a long description.\n\nWe need a dialog to view it all!\n\nIt has a link to https://example.com"
      }
    ]
  }, { groupName: "We do hikes \u{1F332}" }));
}, "DescriptionChange");
DescriptionChange.story = {
  name: "Description (Change)"
};
const AnnouncementGroupChange = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ React.createElement(React.Fragment, null, renderChange({
    from: OUR_ID,
    details: [
      {
        type: "announcements-only",
        announcementsOnly: true
      }
    ]
  }), renderChange({
    from: ADMIN_A,
    details: [
      {
        type: "announcements-only",
        announcementsOnly: true
      }
    ]
  }), renderChange({
    details: [
      {
        type: "announcements-only",
        announcementsOnly: true
      }
    ]
  }), renderChange({
    from: OUR_ID,
    details: [
      {
        type: "announcements-only",
        announcementsOnly: false
      }
    ]
  }), renderChange({
    from: ADMIN_A,
    details: [
      {
        type: "announcements-only",
        announcementsOnly: false
      }
    ]
  }), renderChange({
    details: [
      {
        type: "announcements-only",
        announcementsOnly: false
      }
    ]
  }));
}, "AnnouncementGroupChange");
AnnouncementGroupChange.story = {
  name: "Announcement Group (Change)"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AccessAttributes,
  AccessInviteLink,
  AccessMembers,
  AdminApprovalAdd,
  AdminApprovalRemove,
  AnnouncementGroupChange,
  Avatar,
  Create,
  DescriptionChange,
  DescriptionRemove,
  GroupLinkAdd,
  GroupLinkRemove,
  GroupLinkReset,
  MemberAdd,
  MemberAddFromAdminApproval,
  MemberAddFromInvited,
  MemberAddFromLink,
  MemberPrivilege,
  MemberRemove,
  Multiple,
  PendingAddMany,
  PendingAddOne,
  PendingRemoveMany,
  PendingRemoveOne,
  Title
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiR3JvdXBWMkNoYW5nZS5zdG9yaWVzLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjAtMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGFjdGlvbiB9IGZyb20gJ0BzdG9yeWJvb2svYWRkb24tYWN0aW9ucyc7XG5cbmltcG9ydCB7IHNldHVwSTE4biB9IGZyb20gJy4uLy4uL3V0aWwvc2V0dXBJMThuJztcbmltcG9ydCB7IFVVSUQgfSBmcm9tICcuLi8uLi90eXBlcy9VVUlEJztcbmltcG9ydCB0eXBlIHsgVVVJRFN0cmluZ1R5cGUgfSBmcm9tICcuLi8uLi90eXBlcy9VVUlEJztcbmltcG9ydCBlbk1lc3NhZ2VzIGZyb20gJy4uLy4uLy4uL19sb2NhbGVzL2VuL21lc3NhZ2VzLmpzb24nO1xuaW1wb3J0IHR5cGUgeyBHcm91cFYyQ2hhbmdlVHlwZSB9IGZyb20gJy4uLy4uL2dyb3Vwcyc7XG5pbXBvcnQgeyBTaWduYWxTZXJ2aWNlIGFzIFByb3RvIH0gZnJvbSAnLi4vLi4vcHJvdG9idWYnO1xuaW1wb3J0IHR5cGUgeyBTbWFydENvbnRhY3RSZW5kZXJlclR5cGUgfSBmcm9tICcuLi8uLi9ncm91cENoYW5nZSc7XG5pbXBvcnQgeyBHcm91cFYyQ2hhbmdlIH0gZnJvbSAnLi9Hcm91cFYyQ2hhbmdlJztcbmltcG9ydCB0eXBlIHsgRnVsbEpTWFR5cGUgfSBmcm9tICcuLi9JbnRsJztcblxuY29uc3QgaTE4biA9IHNldHVwSTE4bignZW4nLCBlbk1lc3NhZ2VzKTtcblxuY29uc3QgT1VSX0lEID0gVVVJRC5nZW5lcmF0ZSgpLnRvU3RyaW5nKCk7XG5jb25zdCBDT05UQUNUX0EgPSBVVUlELmdlbmVyYXRlKCkudG9TdHJpbmcoKTtcbmNvbnN0IENPTlRBQ1RfQiA9IFVVSUQuZ2VuZXJhdGUoKS50b1N0cmluZygpO1xuY29uc3QgQ09OVEFDVF9DID0gVVVJRC5nZW5lcmF0ZSgpLnRvU3RyaW5nKCk7XG5jb25zdCBBRE1JTl9BID0gVVVJRC5nZW5lcmF0ZSgpLnRvU3RyaW5nKCk7XG5jb25zdCBJTlZJVEVFX0EgPSBVVUlELmdlbmVyYXRlKCkudG9TdHJpbmcoKTtcblxuY29uc3QgQWNjZXNzQ29udHJvbEVudW0gPSBQcm90by5BY2Nlc3NDb250cm9sLkFjY2Vzc1JlcXVpcmVkO1xuY29uc3QgUm9sZUVudW0gPSBQcm90by5NZW1iZXIuUm9sZTtcblxuY29uc3QgcmVuZGVyQ29udGFjdDogU21hcnRDb250YWN0UmVuZGVyZXJUeXBlPEZ1bGxKU1hUeXBlPiA9IChcbiAgY29udmVyc2F0aW9uSWQ6IHN0cmluZ1xuKSA9PiAoXG4gIDxSZWFjdC5GcmFnbWVudCBrZXk9e2NvbnZlcnNhdGlvbklkfT5cbiAgICB7YENvbnZlcnNhdGlvbigke2NvbnZlcnNhdGlvbklkfSlgfVxuICA8L1JlYWN0LkZyYWdtZW50PlxuKTtcblxuY29uc3QgcmVuZGVyQ2hhbmdlID0gKFxuICBjaGFuZ2U6IEdyb3VwVjJDaGFuZ2VUeXBlLFxuICB7XG4gICAgZ3JvdXBCYW5uZWRNZW1iZXJzaGlwcyxcbiAgICBncm91cE1lbWJlcnNoaXBzLFxuICAgIGdyb3VwTmFtZSxcbiAgICBhcmVXZUFkbWluID0gdHJ1ZSxcbiAgfToge1xuICAgIGdyb3VwTWVtYmVyc2hpcHM/OiBBcnJheTx7XG4gICAgICB1dWlkOiBVVUlEU3RyaW5nVHlwZTtcbiAgICAgIGlzQWRtaW46IGJvb2xlYW47XG4gICAgfT47XG4gICAgZ3JvdXBCYW5uZWRNZW1iZXJzaGlwcz86IEFycmF5PFVVSURTdHJpbmdUeXBlPjtcbiAgICBncm91cE5hbWU/OiBzdHJpbmc7XG4gICAgYXJlV2VBZG1pbj86IGJvb2xlYW47XG4gIH0gPSB7fVxuKSA9PiAoXG4gIDxHcm91cFYyQ2hhbmdlXG4gICAgYXJlV2VBZG1pbj17YXJlV2VBZG1pbiA/PyB0cnVlfVxuICAgIGJsb2NrR3JvdXBMaW5rUmVxdWVzdHM9e2FjdGlvbignYmxvY2tHcm91cExpbmtSZXF1ZXN0cycpfVxuICAgIGNoYW5nZT17Y2hhbmdlfVxuICAgIGdyb3VwQmFubmVkTWVtYmVyc2hpcHM9e2dyb3VwQmFubmVkTWVtYmVyc2hpcHN9XG4gICAgZ3JvdXBNZW1iZXJzaGlwcz17Z3JvdXBNZW1iZXJzaGlwc31cbiAgICBncm91cE5hbWU9e2dyb3VwTmFtZX1cbiAgICBpMThuPXtpMThufVxuICAgIG91clV1aWQ9e09VUl9JRH1cbiAgICByZW5kZXJDb250YWN0PXtyZW5kZXJDb250YWN0fVxuICAvPlxuKTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICB0aXRsZTogJ0NvbXBvbmVudHMvQ29udmVyc2F0aW9uL0dyb3VwVjJDaGFuZ2UnLFxufTtcblxuZXhwb3J0IGNvbnN0IE11bHRpcGxlID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAge3JlbmRlckNoYW5nZSh7XG4gICAgICAgIGZyb206IENPTlRBQ1RfQSxcbiAgICAgICAgZGV0YWlsczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6ICd0aXRsZScsXG4gICAgICAgICAgICBuZXdUaXRsZTogJ1NhdHVyZGF5IFJ1bm5pbmcnLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogJ2F2YXRhcicsXG4gICAgICAgICAgICByZW1vdmVkOiBmYWxzZSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6ICdkZXNjcmlwdGlvbicsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjpcbiAgICAgICAgICAgICAgJ1RoaXMgaXMgYSBsb25nIGRlc2NyaXB0aW9uLlxcblxcbldlIG5lZWQgYSBkaWFsb2cgdG8gdmlldyBpdCBhbGwhXFxuXFxuSXQgaGFzIGEgbGluayB0byBodHRwczovL2V4YW1wbGUuY29tJyxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6ICdtZW1iZXItYWRkJyxcbiAgICAgICAgICAgIHV1aWQ6IE9VUl9JRCxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6ICdkZXNjcmlwdGlvbicsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ0Fub3RoZXIgZGVzY3JpcHRpb24nLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogJ21lbWJlci1wcml2aWxlZ2UnLFxuICAgICAgICAgICAgdXVpZDogT1VSX0lELFxuICAgICAgICAgICAgbmV3UHJpdmlsZWdlOiBSb2xlRW51bS5BRE1JTklTVFJBVE9SLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9KX1cbiAgICA8Lz5cbiAgKTtcbn07XG5cbmV4cG9ydCBjb25zdCBDcmVhdGUgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICByZXR1cm4gKFxuICAgIDw+XG4gICAgICB7cmVuZGVyQ2hhbmdlKHtcbiAgICAgICAgZnJvbTogT1VSX0lELFxuICAgICAgICBkZXRhaWxzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogJ2NyZWF0ZScsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0pfVxuICAgICAge3JlbmRlckNoYW5nZSh7XG4gICAgICAgIGZyb206IENPTlRBQ1RfQSxcbiAgICAgICAgZGV0YWlsczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6ICdjcmVhdGUnLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9KX1cbiAgICAgIHtyZW5kZXJDaGFuZ2Uoe1xuICAgICAgICBkZXRhaWxzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogJ2NyZWF0ZScsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0pfVxuICAgIDwvPlxuICApO1xufTtcblxuZXhwb3J0IGNvbnN0IFRpdGxlID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAge3JlbmRlckNoYW5nZSh7XG4gICAgICAgIGZyb206IE9VUl9JRCxcbiAgICAgICAgZGV0YWlsczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6ICd0aXRsZScsXG4gICAgICAgICAgICBuZXdUaXRsZTogJ1NhdHVyZGF5IFJ1bm5pbmcnLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9KX1cbiAgICAgIHtyZW5kZXJDaGFuZ2Uoe1xuICAgICAgICBmcm9tOiBDT05UQUNUX0EsXG4gICAgICAgIGRldGFpbHM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAndGl0bGUnLFxuICAgICAgICAgICAgbmV3VGl0bGU6ICdTYXR1cmRheSBSdW5uaW5nJyxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSl9XG4gICAgICB7cmVuZGVyQ2hhbmdlKHtcbiAgICAgICAgZGV0YWlsczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6ICd0aXRsZScsXG4gICAgICAgICAgICBuZXdUaXRsZTogJ1NhdHVyZGF5IFJ1bm5pbmcnLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9KX1cbiAgICAgIHtyZW5kZXJDaGFuZ2Uoe1xuICAgICAgICBmcm9tOiBPVVJfSUQsXG4gICAgICAgIGRldGFpbHM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAndGl0bGUnLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9KX1cbiAgICAgIHtyZW5kZXJDaGFuZ2Uoe1xuICAgICAgICBmcm9tOiBDT05UQUNUX0EsXG4gICAgICAgIGRldGFpbHM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAndGl0bGUnLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9KX1cbiAgICAgIHtyZW5kZXJDaGFuZ2Uoe1xuICAgICAgICBkZXRhaWxzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogJ3RpdGxlJyxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSl9XG4gICAgPC8+XG4gICk7XG59O1xuXG5leHBvcnQgY29uc3QgQXZhdGFyID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAge3JlbmRlckNoYW5nZSh7XG4gICAgICAgIGZyb206IE9VUl9JRCxcbiAgICAgICAgZGV0YWlsczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6ICdhdmF0YXInLFxuICAgICAgICAgICAgcmVtb3ZlZDogZmFsc2UsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0pfVxuICAgICAge3JlbmRlckNoYW5nZSh7XG4gICAgICAgIGZyb206IENPTlRBQ1RfQSxcbiAgICAgICAgZGV0YWlsczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6ICdhdmF0YXInLFxuICAgICAgICAgICAgcmVtb3ZlZDogZmFsc2UsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0pfVxuICAgICAge3JlbmRlckNoYW5nZSh7XG4gICAgICAgIGRldGFpbHM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAnYXZhdGFyJyxcbiAgICAgICAgICAgIHJlbW92ZWQ6IGZhbHNlLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9KX1cbiAgICAgIHtyZW5kZXJDaGFuZ2Uoe1xuICAgICAgICBmcm9tOiBPVVJfSUQsXG4gICAgICAgIGRldGFpbHM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAnYXZhdGFyJyxcbiAgICAgICAgICAgIHJlbW92ZWQ6IHRydWUsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0pfVxuICAgICAge3JlbmRlckNoYW5nZSh7XG4gICAgICAgIGZyb206IENPTlRBQ1RfQSxcbiAgICAgICAgZGV0YWlsczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6ICdhdmF0YXInLFxuICAgICAgICAgICAgcmVtb3ZlZDogdHJ1ZSxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSl9XG4gICAgICB7cmVuZGVyQ2hhbmdlKHtcbiAgICAgICAgZGV0YWlsczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6ICdhdmF0YXInLFxuICAgICAgICAgICAgcmVtb3ZlZDogdHJ1ZSxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSl9XG4gICAgPC8+XG4gICk7XG59O1xuXG5leHBvcnQgY29uc3QgQWNjZXNzQXR0cmlidXRlcyA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIHtyZW5kZXJDaGFuZ2Uoe1xuICAgICAgICBmcm9tOiBPVVJfSUQsXG4gICAgICAgIGRldGFpbHM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAnYWNjZXNzLWF0dHJpYnV0ZXMnLFxuICAgICAgICAgICAgbmV3UHJpdmlsZWdlOiBBY2Nlc3NDb250cm9sRW51bS5BRE1JTklTVFJBVE9SLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9KX1cbiAgICAgIHtyZW5kZXJDaGFuZ2Uoe1xuICAgICAgICBmcm9tOiBBRE1JTl9BLFxuICAgICAgICBkZXRhaWxzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogJ2FjY2Vzcy1hdHRyaWJ1dGVzJyxcbiAgICAgICAgICAgIG5ld1ByaXZpbGVnZTogQWNjZXNzQ29udHJvbEVudW0uQURNSU5JU1RSQVRPUixcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSl9XG4gICAgICB7cmVuZGVyQ2hhbmdlKHtcbiAgICAgICAgZGV0YWlsczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6ICdhY2Nlc3MtYXR0cmlidXRlcycsXG4gICAgICAgICAgICBuZXdQcml2aWxlZ2U6IEFjY2Vzc0NvbnRyb2xFbnVtLkFETUlOSVNUUkFUT1IsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0pfVxuICAgICAge3JlbmRlckNoYW5nZSh7XG4gICAgICAgIGZyb206IE9VUl9JRCxcbiAgICAgICAgZGV0YWlsczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6ICdhY2Nlc3MtYXR0cmlidXRlcycsXG4gICAgICAgICAgICBuZXdQcml2aWxlZ2U6IEFjY2Vzc0NvbnRyb2xFbnVtLk1FTUJFUixcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSl9XG4gICAgICB7cmVuZGVyQ2hhbmdlKHtcbiAgICAgICAgZnJvbTogQURNSU5fQSxcbiAgICAgICAgZGV0YWlsczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6ICdhY2Nlc3MtYXR0cmlidXRlcycsXG4gICAgICAgICAgICBuZXdQcml2aWxlZ2U6IEFjY2Vzc0NvbnRyb2xFbnVtLk1FTUJFUixcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSl9XG4gICAgICB7cmVuZGVyQ2hhbmdlKHtcbiAgICAgICAgZGV0YWlsczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6ICdhY2Nlc3MtYXR0cmlidXRlcycsXG4gICAgICAgICAgICBuZXdQcml2aWxlZ2U6IEFjY2Vzc0NvbnRyb2xFbnVtLk1FTUJFUixcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSl9XG4gICAgPC8+XG4gICk7XG59O1xuXG5BY2Nlc3NBdHRyaWJ1dGVzLnN0b3J5ID0ge1xuICBuYW1lOiAnQWNjZXNzIChBdHRyaWJ1dGVzKScsXG59O1xuXG5leHBvcnQgY29uc3QgQWNjZXNzTWVtYmVycyA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIHtyZW5kZXJDaGFuZ2Uoe1xuICAgICAgICBmcm9tOiBPVVJfSUQsXG4gICAgICAgIGRldGFpbHM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAnYWNjZXNzLW1lbWJlcnMnLFxuICAgICAgICAgICAgbmV3UHJpdmlsZWdlOiBBY2Nlc3NDb250cm9sRW51bS5BRE1JTklTVFJBVE9SLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9KX1cbiAgICAgIHtyZW5kZXJDaGFuZ2Uoe1xuICAgICAgICBmcm9tOiBBRE1JTl9BLFxuICAgICAgICBkZXRhaWxzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogJ2FjY2Vzcy1tZW1iZXJzJyxcbiAgICAgICAgICAgIG5ld1ByaXZpbGVnZTogQWNjZXNzQ29udHJvbEVudW0uQURNSU5JU1RSQVRPUixcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSl9XG4gICAgICB7cmVuZGVyQ2hhbmdlKHtcbiAgICAgICAgZGV0YWlsczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6ICdhY2Nlc3MtbWVtYmVycycsXG4gICAgICAgICAgICBuZXdQcml2aWxlZ2U6IEFjY2Vzc0NvbnRyb2xFbnVtLkFETUlOSVNUUkFUT1IsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0pfVxuICAgICAge3JlbmRlckNoYW5nZSh7XG4gICAgICAgIGZyb206IE9VUl9JRCxcbiAgICAgICAgZGV0YWlsczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6ICdhY2Nlc3MtbWVtYmVycycsXG4gICAgICAgICAgICBuZXdQcml2aWxlZ2U6IEFjY2Vzc0NvbnRyb2xFbnVtLk1FTUJFUixcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSl9XG4gICAgICB7cmVuZGVyQ2hhbmdlKHtcbiAgICAgICAgZnJvbTogQURNSU5fQSxcbiAgICAgICAgZGV0YWlsczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6ICdhY2Nlc3MtbWVtYmVycycsXG4gICAgICAgICAgICBuZXdQcml2aWxlZ2U6IEFjY2Vzc0NvbnRyb2xFbnVtLk1FTUJFUixcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSl9XG4gICAgICB7cmVuZGVyQ2hhbmdlKHtcbiAgICAgICAgZGV0YWlsczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6ICdhY2Nlc3MtbWVtYmVycycsXG4gICAgICAgICAgICBuZXdQcml2aWxlZ2U6IEFjY2Vzc0NvbnRyb2xFbnVtLk1FTUJFUixcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSl9XG4gICAgPC8+XG4gICk7XG59O1xuXG5BY2Nlc3NNZW1iZXJzLnN0b3J5ID0ge1xuICBuYW1lOiAnQWNjZXNzIChNZW1iZXJzKScsXG59O1xuXG5leHBvcnQgY29uc3QgQWNjZXNzSW52aXRlTGluayA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIHtyZW5kZXJDaGFuZ2Uoe1xuICAgICAgICBmcm9tOiBPVVJfSUQsXG4gICAgICAgIGRldGFpbHM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAnYWNjZXNzLWludml0ZS1saW5rJyxcbiAgICAgICAgICAgIG5ld1ByaXZpbGVnZTogQWNjZXNzQ29udHJvbEVudW0uQU5ZLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9KX1cbiAgICAgIHtyZW5kZXJDaGFuZ2Uoe1xuICAgICAgICBmcm9tOiBBRE1JTl9BLFxuICAgICAgICBkZXRhaWxzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogJ2FjY2Vzcy1pbnZpdGUtbGluaycsXG4gICAgICAgICAgICBuZXdQcml2aWxlZ2U6IEFjY2Vzc0NvbnRyb2xFbnVtLkFOWSxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSl9XG4gICAgICB7cmVuZGVyQ2hhbmdlKHtcbiAgICAgICAgZGV0YWlsczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6ICdhY2Nlc3MtaW52aXRlLWxpbmsnLFxuICAgICAgICAgICAgbmV3UHJpdmlsZWdlOiBBY2Nlc3NDb250cm9sRW51bS5BTlksXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0pfVxuICAgICAge3JlbmRlckNoYW5nZSh7XG4gICAgICAgIGZyb206IE9VUl9JRCxcbiAgICAgICAgZGV0YWlsczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6ICdhY2Nlc3MtaW52aXRlLWxpbmsnLFxuICAgICAgICAgICAgbmV3UHJpdmlsZWdlOiBBY2Nlc3NDb250cm9sRW51bS5BRE1JTklTVFJBVE9SLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9KX1cbiAgICAgIHtyZW5kZXJDaGFuZ2Uoe1xuICAgICAgICBmcm9tOiBBRE1JTl9BLFxuICAgICAgICBkZXRhaWxzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogJ2FjY2Vzcy1pbnZpdGUtbGluaycsXG4gICAgICAgICAgICBuZXdQcml2aWxlZ2U6IEFjY2Vzc0NvbnRyb2xFbnVtLkFETUlOSVNUUkFUT1IsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0pfVxuICAgICAge3JlbmRlckNoYW5nZSh7XG4gICAgICAgIGRldGFpbHM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAnYWNjZXNzLWludml0ZS1saW5rJyxcbiAgICAgICAgICAgIG5ld1ByaXZpbGVnZTogQWNjZXNzQ29udHJvbEVudW0uQURNSU5JU1RSQVRPUixcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSl9XG4gICAgPC8+XG4gICk7XG59O1xuXG5BY2Nlc3NJbnZpdGVMaW5rLnN0b3J5ID0ge1xuICBuYW1lOiAnQWNjZXNzIChJbnZpdGUgTGluayknLFxufTtcblxuZXhwb3J0IGNvbnN0IE1lbWJlckFkZCA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIHtyZW5kZXJDaGFuZ2Uoe1xuICAgICAgICBmcm9tOiBPVVJfSUQsXG4gICAgICAgIGRldGFpbHM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAnbWVtYmVyLWFkZCcsXG4gICAgICAgICAgICB1dWlkOiBPVVJfSUQsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0pfVxuICAgICAge3JlbmRlckNoYW5nZSh7XG4gICAgICAgIGZyb206IENPTlRBQ1RfQSxcbiAgICAgICAgZGV0YWlsczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6ICdtZW1iZXItYWRkJyxcbiAgICAgICAgICAgIHV1aWQ6IE9VUl9JRCxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSl9XG4gICAgICB7cmVuZGVyQ2hhbmdlKHtcbiAgICAgICAgZGV0YWlsczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6ICdtZW1iZXItYWRkJyxcbiAgICAgICAgICAgIHV1aWQ6IE9VUl9JRCxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSl9XG4gICAgICB7cmVuZGVyQ2hhbmdlKHtcbiAgICAgICAgZnJvbTogT1VSX0lELFxuICAgICAgICBkZXRhaWxzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogJ21lbWJlci1hZGQnLFxuICAgICAgICAgICAgdXVpZDogQ09OVEFDVF9BLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9KX1cbiAgICAgIHtyZW5kZXJDaGFuZ2Uoe1xuICAgICAgICBmcm9tOiBDT05UQUNUX0IsXG4gICAgICAgIGRldGFpbHM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAnbWVtYmVyLWFkZCcsXG4gICAgICAgICAgICB1dWlkOiBDT05UQUNUX0EsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0pfVxuICAgICAge3JlbmRlckNoYW5nZSh7XG4gICAgICAgIGRldGFpbHM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAnbWVtYmVyLWFkZCcsXG4gICAgICAgICAgICB1dWlkOiBDT05UQUNUX0EsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0pfVxuICAgIDwvPlxuICApO1xufTtcblxuZXhwb3J0IGNvbnN0IE1lbWJlckFkZEZyb21JbnZpdGVkID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAgey8qIHRoZSBzdHJpbmdzIHdoZXJlIHNvbWVvbmUgYWRkZWQgeW91IC0gc2hvd24gbGlrZSBhIG5vcm1hbCBhZGQgKi99XG4gICAgICB7cmVuZGVyQ2hhbmdlKHtcbiAgICAgICAgZnJvbTogQ09OVEFDVF9BLFxuICAgICAgICBkZXRhaWxzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogJ21lbWJlci1hZGQtZnJvbS1pbnZpdGUnLFxuICAgICAgICAgICAgdXVpZDogT1VSX0lELFxuICAgICAgICAgICAgaW52aXRlcjogQ09OVEFDVF9CLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9KX1cbiAgICAgIHtyZW5kZXJDaGFuZ2Uoe1xuICAgICAgICBkZXRhaWxzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogJ21lbWJlci1hZGQtZnJvbS1pbnZpdGUnLFxuICAgICAgICAgICAgdXVpZDogT1VSX0lELFxuICAgICAgICAgICAgaW52aXRlcjogQ09OVEFDVF9BLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9KX1cbiAgICAgIHsvKiB0aGUgcmVzdCBvZiB0aGUgJ3NvbWVvbmUgYWRkZWQgc29tZW9uZSBlbHNlJyBjaGVja3MgKi99XG4gICAgICB7cmVuZGVyQ2hhbmdlKHtcbiAgICAgICAgZnJvbTogT1VSX0lELFxuICAgICAgICBkZXRhaWxzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogJ21lbWJlci1hZGQtZnJvbS1pbnZpdGUnLFxuICAgICAgICAgICAgdXVpZDogQ09OVEFDVF9BLFxuICAgICAgICAgICAgaW52aXRlcjogQ09OVEFDVF9CLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9KX1cbiAgICAgIHtyZW5kZXJDaGFuZ2Uoe1xuICAgICAgICBmcm9tOiBDT05UQUNUX0EsXG4gICAgICAgIGRldGFpbHM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAnbWVtYmVyLWFkZC1mcm9tLWludml0ZScsXG4gICAgICAgICAgICB1dWlkOiBDT05UQUNUX0IsXG4gICAgICAgICAgICBpbnZpdGVyOiBDT05UQUNUX0MsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0pfVxuICAgICAge3JlbmRlckNoYW5nZSh7XG4gICAgICAgIGRldGFpbHM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAnbWVtYmVyLWFkZC1mcm9tLWludml0ZScsXG4gICAgICAgICAgICB1dWlkOiBDT05UQUNUX0EsXG4gICAgICAgICAgICBpbnZpdGVyOiBDT05UQUNUX0IsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0pfVxuICAgICAgey8qIGluIGFsbCBvZiB0aGVzZSB3ZSBrbm93IHRoZSB1c2VyIGhhcyBhY2NlcHRlZCB0aGUgaW52aXRlICovfVxuICAgICAge3JlbmRlckNoYW5nZSh7XG4gICAgICAgIGZyb206IE9VUl9JRCxcbiAgICAgICAgZGV0YWlsczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6ICdtZW1iZXItYWRkLWZyb20taW52aXRlJyxcbiAgICAgICAgICAgIHV1aWQ6IE9VUl9JRCxcbiAgICAgICAgICAgIGludml0ZXI6IENPTlRBQ1RfQSxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSl9XG4gICAgICB7cmVuZGVyQ2hhbmdlKHtcbiAgICAgICAgZnJvbTogT1VSX0lELFxuICAgICAgICBkZXRhaWxzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogJ21lbWJlci1hZGQtZnJvbS1pbnZpdGUnLFxuICAgICAgICAgICAgdXVpZDogT1VSX0lELFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9KX1cbiAgICAgIHtyZW5kZXJDaGFuZ2Uoe1xuICAgICAgICBmcm9tOiBDT05UQUNUX0EsXG4gICAgICAgIGRldGFpbHM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAnbWVtYmVyLWFkZC1mcm9tLWludml0ZScsXG4gICAgICAgICAgICB1dWlkOiBDT05UQUNUX0EsXG4gICAgICAgICAgICBpbnZpdGVyOiBPVVJfSUQsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0pfVxuICAgICAge3JlbmRlckNoYW5nZSh7XG4gICAgICAgIGZyb206IENPTlRBQ1RfQSxcbiAgICAgICAgZGV0YWlsczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6ICdtZW1iZXItYWRkLWZyb20taW52aXRlJyxcbiAgICAgICAgICAgIHV1aWQ6IENPTlRBQ1RfQSxcbiAgICAgICAgICAgIGludml0ZXI6IENPTlRBQ1RfQixcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSl9XG4gICAgICB7cmVuZGVyQ2hhbmdlKHtcbiAgICAgICAgZnJvbTogQ09OVEFDVF9BLFxuICAgICAgICBkZXRhaWxzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogJ21lbWJlci1hZGQtZnJvbS1pbnZpdGUnLFxuICAgICAgICAgICAgdXVpZDogQ09OVEFDVF9BLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9KX1cbiAgICA8Lz5cbiAgKTtcbn07XG5cbk1lbWJlckFkZEZyb21JbnZpdGVkLnN0b3J5ID0ge1xuICBuYW1lOiAnTWVtYmVyIEFkZCAoZnJvbSBpbnZpdGVkKScsXG59O1xuXG5leHBvcnQgY29uc3QgTWVtYmVyQWRkRnJvbUxpbmsgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICByZXR1cm4gKFxuICAgIDw+XG4gICAgICB7cmVuZGVyQ2hhbmdlKHtcbiAgICAgICAgZnJvbTogT1VSX0lELFxuICAgICAgICBkZXRhaWxzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogJ21lbWJlci1hZGQtZnJvbS1saW5rJyxcbiAgICAgICAgICAgIHV1aWQ6IE9VUl9JRCxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSl9XG4gICAgICB7cmVuZGVyQ2hhbmdlKHtcbiAgICAgICAgZnJvbTogQ09OVEFDVF9BLFxuICAgICAgICBkZXRhaWxzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogJ21lbWJlci1hZGQtZnJvbS1saW5rJyxcbiAgICAgICAgICAgIHV1aWQ6IENPTlRBQ1RfQSxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSl9XG4gICAgICB7cmVuZGVyQ2hhbmdlKHtcbiAgICAgICAgZGV0YWlsczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6ICdtZW1iZXItYWRkLWZyb20tbGluaycsXG4gICAgICAgICAgICB1dWlkOiBDT05UQUNUX0EsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0pfVxuICAgIDwvPlxuICApO1xufTtcblxuTWVtYmVyQWRkRnJvbUxpbmsuc3RvcnkgPSB7XG4gIG5hbWU6ICdNZW1iZXIgQWRkIChmcm9tIGxpbmspJyxcbn07XG5cbmV4cG9ydCBjb25zdCBNZW1iZXJBZGRGcm9tQWRtaW5BcHByb3ZhbCA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIHtyZW5kZXJDaGFuZ2Uoe1xuICAgICAgICBmcm9tOiBBRE1JTl9BLFxuICAgICAgICBkZXRhaWxzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogJ21lbWJlci1hZGQtZnJvbS1hZG1pbi1hcHByb3ZhbCcsXG4gICAgICAgICAgICB1dWlkOiBPVVJfSUQsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0pfVxuICAgICAge3JlbmRlckNoYW5nZSh7XG4gICAgICAgIGRldGFpbHM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAnbWVtYmVyLWFkZC1mcm9tLWFkbWluLWFwcHJvdmFsJyxcbiAgICAgICAgICAgIHV1aWQ6IE9VUl9JRCxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSl9XG4gICAgICB7cmVuZGVyQ2hhbmdlKHtcbiAgICAgICAgZnJvbTogT1VSX0lELFxuICAgICAgICBkZXRhaWxzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogJ21lbWJlci1hZGQtZnJvbS1hZG1pbi1hcHByb3ZhbCcsXG4gICAgICAgICAgICB1dWlkOiBDT05UQUNUX0EsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0pfVxuICAgICAge3JlbmRlckNoYW5nZSh7XG4gICAgICAgIGZyb206IEFETUlOX0EsXG4gICAgICAgIGRldGFpbHM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAnbWVtYmVyLWFkZC1mcm9tLWFkbWluLWFwcHJvdmFsJyxcbiAgICAgICAgICAgIHV1aWQ6IENPTlRBQ1RfQSxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSl9XG4gICAgICB7cmVuZGVyQ2hhbmdlKHtcbiAgICAgICAgZGV0YWlsczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6ICdtZW1iZXItYWRkLWZyb20tYWRtaW4tYXBwcm92YWwnLFxuICAgICAgICAgICAgdXVpZDogQ09OVEFDVF9BLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9KX1cbiAgICA8Lz5cbiAgKTtcbn07XG5cbk1lbWJlckFkZEZyb21BZG1pbkFwcHJvdmFsLnN0b3J5ID0ge1xuICBuYW1lOiAnTWVtYmVyIEFkZCAoZnJvbSBhZG1pbiBhcHByb3ZhbCknLFxufTtcblxuZXhwb3J0IGNvbnN0IE1lbWJlclJlbW92ZSA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIHtyZW5kZXJDaGFuZ2Uoe1xuICAgICAgICBmcm9tOiBPVVJfSUQsXG4gICAgICAgIGRldGFpbHM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAnbWVtYmVyLXJlbW92ZScsXG4gICAgICAgICAgICB1dWlkOiBPVVJfSUQsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0pfVxuICAgICAge3JlbmRlckNoYW5nZSh7XG4gICAgICAgIGZyb206IENPTlRBQ1RfQSxcbiAgICAgICAgZGV0YWlsczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6ICdtZW1iZXItcmVtb3ZlJyxcbiAgICAgICAgICAgIHV1aWQ6IE9VUl9JRCxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSl9XG4gICAgICB7cmVuZGVyQ2hhbmdlKHtcbiAgICAgICAgZGV0YWlsczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6ICdtZW1iZXItcmVtb3ZlJyxcbiAgICAgICAgICAgIHV1aWQ6IE9VUl9JRCxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSl9XG4gICAgICB7cmVuZGVyQ2hhbmdlKHtcbiAgICAgICAgZnJvbTogT1VSX0lELFxuICAgICAgICBkZXRhaWxzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogJ21lbWJlci1yZW1vdmUnLFxuICAgICAgICAgICAgdXVpZDogQ09OVEFDVF9BLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9KX1cbiAgICAgIHtyZW5kZXJDaGFuZ2Uoe1xuICAgICAgICBmcm9tOiBDT05UQUNUX0EsXG4gICAgICAgIGRldGFpbHM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAnbWVtYmVyLXJlbW92ZScsXG4gICAgICAgICAgICB1dWlkOiBDT05UQUNUX0EsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0pfVxuICAgICAge3JlbmRlckNoYW5nZSh7XG4gICAgICAgIGZyb206IENPTlRBQ1RfQixcbiAgICAgICAgZGV0YWlsczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6ICdtZW1iZXItcmVtb3ZlJyxcbiAgICAgICAgICAgIHV1aWQ6IENPTlRBQ1RfQSxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSl9XG4gICAgICB7cmVuZGVyQ2hhbmdlKHtcbiAgICAgICAgZGV0YWlsczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6ICdtZW1iZXItcmVtb3ZlJyxcbiAgICAgICAgICAgIHV1aWQ6IENPTlRBQ1RfQSxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSl9XG4gICAgPC8+XG4gICk7XG59O1xuXG5leHBvcnQgY29uc3QgTWVtYmVyUHJpdmlsZWdlID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAge3JlbmRlckNoYW5nZSh7XG4gICAgICAgIGZyb206IENPTlRBQ1RfQSxcbiAgICAgICAgZGV0YWlsczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6ICdtZW1iZXItcHJpdmlsZWdlJyxcbiAgICAgICAgICAgIHV1aWQ6IE9VUl9JRCxcbiAgICAgICAgICAgIG5ld1ByaXZpbGVnZTogUm9sZUVudW0uQURNSU5JU1RSQVRPUixcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSl9XG4gICAgICB7cmVuZGVyQ2hhbmdlKHtcbiAgICAgICAgZGV0YWlsczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6ICdtZW1iZXItcHJpdmlsZWdlJyxcbiAgICAgICAgICAgIHV1aWQ6IE9VUl9JRCxcbiAgICAgICAgICAgIG5ld1ByaXZpbGVnZTogUm9sZUVudW0uQURNSU5JU1RSQVRPUixcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSl9XG4gICAgICB7cmVuZGVyQ2hhbmdlKHtcbiAgICAgICAgZnJvbTogT1VSX0lELFxuICAgICAgICBkZXRhaWxzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogJ21lbWJlci1wcml2aWxlZ2UnLFxuICAgICAgICAgICAgdXVpZDogQ09OVEFDVF9BLFxuICAgICAgICAgICAgbmV3UHJpdmlsZWdlOiBSb2xlRW51bS5BRE1JTklTVFJBVE9SLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9KX1cbiAgICAgIHtyZW5kZXJDaGFuZ2Uoe1xuICAgICAgICBmcm9tOiBBRE1JTl9BLFxuICAgICAgICBkZXRhaWxzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogJ21lbWJlci1wcml2aWxlZ2UnLFxuICAgICAgICAgICAgdXVpZDogQ09OVEFDVF9BLFxuICAgICAgICAgICAgbmV3UHJpdmlsZWdlOiBSb2xlRW51bS5BRE1JTklTVFJBVE9SLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9KX1cbiAgICAgIHtyZW5kZXJDaGFuZ2Uoe1xuICAgICAgICBkZXRhaWxzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogJ21lbWJlci1wcml2aWxlZ2UnLFxuICAgICAgICAgICAgdXVpZDogQ09OVEFDVF9BLFxuICAgICAgICAgICAgbmV3UHJpdmlsZWdlOiBSb2xlRW51bS5BRE1JTklTVFJBVE9SLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9KX1cbiAgICAgIHtyZW5kZXJDaGFuZ2Uoe1xuICAgICAgICBmcm9tOiBDT05UQUNUX0EsXG4gICAgICAgIGRldGFpbHM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAnbWVtYmVyLXByaXZpbGVnZScsXG4gICAgICAgICAgICB1dWlkOiBPVVJfSUQsXG4gICAgICAgICAgICBuZXdQcml2aWxlZ2U6IFJvbGVFbnVtLkRFRkFVTFQsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0pfVxuICAgICAge3JlbmRlckNoYW5nZSh7XG4gICAgICAgIGRldGFpbHM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAnbWVtYmVyLXByaXZpbGVnZScsXG4gICAgICAgICAgICB1dWlkOiBPVVJfSUQsXG4gICAgICAgICAgICBuZXdQcml2aWxlZ2U6IFJvbGVFbnVtLkRFRkFVTFQsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0pfVxuICAgICAge3JlbmRlckNoYW5nZSh7XG4gICAgICAgIGZyb206IE9VUl9JRCxcbiAgICAgICAgZGV0YWlsczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6ICdtZW1iZXItcHJpdmlsZWdlJyxcbiAgICAgICAgICAgIHV1aWQ6IENPTlRBQ1RfQSxcbiAgICAgICAgICAgIG5ld1ByaXZpbGVnZTogUm9sZUVudW0uREVGQVVMVCxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSl9XG4gICAgICB7cmVuZGVyQ2hhbmdlKHtcbiAgICAgICAgZnJvbTogQURNSU5fQSxcbiAgICAgICAgZGV0YWlsczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6ICdtZW1iZXItcHJpdmlsZWdlJyxcbiAgICAgICAgICAgIHV1aWQ6IENPTlRBQ1RfQSxcbiAgICAgICAgICAgIG5ld1ByaXZpbGVnZTogUm9sZUVudW0uREVGQVVMVCxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSl9XG4gICAgICB7cmVuZGVyQ2hhbmdlKHtcbiAgICAgICAgZGV0YWlsczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6ICdtZW1iZXItcHJpdmlsZWdlJyxcbiAgICAgICAgICAgIHV1aWQ6IENPTlRBQ1RfQSxcbiAgICAgICAgICAgIG5ld1ByaXZpbGVnZTogUm9sZUVudW0uREVGQVVMVCxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSl9XG4gICAgPC8+XG4gICk7XG59O1xuXG5leHBvcnQgY29uc3QgUGVuZGluZ0FkZE9uZSA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIHtyZW5kZXJDaGFuZ2Uoe1xuICAgICAgICBmcm9tOiBDT05UQUNUX0EsXG4gICAgICAgIGRldGFpbHM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAncGVuZGluZy1hZGQtb25lJyxcbiAgICAgICAgICAgIHV1aWQ6IE9VUl9JRCxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSl9XG4gICAgICB7cmVuZGVyQ2hhbmdlKHtcbiAgICAgICAgZGV0YWlsczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6ICdwZW5kaW5nLWFkZC1vbmUnLFxuICAgICAgICAgICAgdXVpZDogT1VSX0lELFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9KX1cbiAgICAgIHtyZW5kZXJDaGFuZ2Uoe1xuICAgICAgICBmcm9tOiBPVVJfSUQsXG4gICAgICAgIGRldGFpbHM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAncGVuZGluZy1hZGQtb25lJyxcbiAgICAgICAgICAgIHV1aWQ6IElOVklURUVfQSxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSl9XG4gICAgICB7cmVuZGVyQ2hhbmdlKHtcbiAgICAgICAgZnJvbTogQ09OVEFDVF9CLFxuICAgICAgICBkZXRhaWxzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogJ3BlbmRpbmctYWRkLW9uZScsXG4gICAgICAgICAgICB1dWlkOiBJTlZJVEVFX0EsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0pfVxuICAgICAge3JlbmRlckNoYW5nZSh7XG4gICAgICAgIGRldGFpbHM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAncGVuZGluZy1hZGQtb25lJyxcbiAgICAgICAgICAgIHV1aWQ6IElOVklURUVfQSxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSl9XG4gICAgPC8+XG4gICk7XG59O1xuXG5QZW5kaW5nQWRkT25lLnN0b3J5ID0ge1xuICBuYW1lOiAnUGVuZGluZyBBZGQgLSBvbmUnLFxufTtcblxuZXhwb3J0IGNvbnN0IFBlbmRpbmdBZGRNYW55ID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAge3JlbmRlckNoYW5nZSh7XG4gICAgICAgIGZyb206IE9VUl9JRCxcbiAgICAgICAgZGV0YWlsczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6ICdwZW5kaW5nLWFkZC1tYW55JyxcbiAgICAgICAgICAgIGNvdW50OiA1LFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9KX1cbiAgICAgIHtyZW5kZXJDaGFuZ2Uoe1xuICAgICAgICBmcm9tOiBDT05UQUNUX0EsXG4gICAgICAgIGRldGFpbHM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAncGVuZGluZy1hZGQtbWFueScsXG4gICAgICAgICAgICBjb3VudDogNSxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSl9XG4gICAgICB7cmVuZGVyQ2hhbmdlKHtcbiAgICAgICAgZGV0YWlsczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6ICdwZW5kaW5nLWFkZC1tYW55JyxcbiAgICAgICAgICAgIGNvdW50OiA1LFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9KX1cbiAgICA8Lz5cbiAgKTtcbn07XG5cblBlbmRpbmdBZGRNYW55LnN0b3J5ID0ge1xuICBuYW1lOiAnUGVuZGluZyBBZGQgLSBtYW55Jyxcbn07XG5cbmV4cG9ydCBjb25zdCBQZW5kaW5nUmVtb3ZlT25lID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAge3JlbmRlckNoYW5nZSh7XG4gICAgICAgIGZyb206IElOVklURUVfQSxcbiAgICAgICAgZGV0YWlsczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6ICdwZW5kaW5nLXJlbW92ZS1vbmUnLFxuICAgICAgICAgICAgdXVpZDogSU5WSVRFRV9BLFxuICAgICAgICAgICAgaW52aXRlcjogT1VSX0lELFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9KX1cbiAgICAgIHtyZW5kZXJDaGFuZ2Uoe1xuICAgICAgICBmcm9tOiBPVVJfSUQsXG4gICAgICAgIGRldGFpbHM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAncGVuZGluZy1yZW1vdmUtb25lJyxcbiAgICAgICAgICAgIHV1aWQ6IElOVklURUVfQSxcbiAgICAgICAgICAgIGludml0ZXI6IE9VUl9JRCxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSl9XG4gICAgICB7cmVuZGVyQ2hhbmdlKHtcbiAgICAgICAgZnJvbTogQURNSU5fQSxcbiAgICAgICAgZGV0YWlsczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6ICdwZW5kaW5nLXJlbW92ZS1vbmUnLFxuICAgICAgICAgICAgdXVpZDogSU5WSVRFRV9BLFxuICAgICAgICAgICAgaW52aXRlcjogT1VSX0lELFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9KX1cbiAgICAgIHtyZW5kZXJDaGFuZ2Uoe1xuICAgICAgICBkZXRhaWxzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogJ3BlbmRpbmctcmVtb3ZlLW9uZScsXG4gICAgICAgICAgICB1dWlkOiBJTlZJVEVFX0EsXG4gICAgICAgICAgICBpbnZpdGVyOiBPVVJfSUQsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0pfVxuICAgICAge3JlbmRlckNoYW5nZSh7XG4gICAgICAgIGZyb206IElOVklURUVfQSxcbiAgICAgICAgZGV0YWlsczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6ICdwZW5kaW5nLXJlbW92ZS1vbmUnLFxuICAgICAgICAgICAgdXVpZDogSU5WSVRFRV9BLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9KX1cbiAgICAgIHtyZW5kZXJDaGFuZ2Uoe1xuICAgICAgICBmcm9tOiBJTlZJVEVFX0EsXG4gICAgICAgIGRldGFpbHM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAncGVuZGluZy1yZW1vdmUtb25lJyxcbiAgICAgICAgICAgIHV1aWQ6IElOVklURUVfQSxcbiAgICAgICAgICAgIGludml0ZXI6IENPTlRBQ1RfQixcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSl9XG5cbiAgICAgIHtyZW5kZXJDaGFuZ2Uoe1xuICAgICAgICBmcm9tOiBDT05UQUNUX0IsXG4gICAgICAgIGRldGFpbHM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAncGVuZGluZy1yZW1vdmUtb25lJyxcbiAgICAgICAgICAgIHV1aWQ6IE9VUl9JRCxcbiAgICAgICAgICAgIGludml0ZXI6IENPTlRBQ1RfQixcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSl9XG4gICAgICB7cmVuZGVyQ2hhbmdlKHtcbiAgICAgICAgZnJvbTogQ09OVEFDVF9BLFxuICAgICAgICBkZXRhaWxzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogJ3BlbmRpbmctcmVtb3ZlLW9uZScsXG4gICAgICAgICAgICB1dWlkOiBDT05UQUNUX0IsXG4gICAgICAgICAgICBpbnZpdGVyOiBDT05UQUNUX0EsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0pfVxuXG4gICAgICB7cmVuZGVyQ2hhbmdlKHtcbiAgICAgICAgZnJvbTogQ09OVEFDVF9DLFxuICAgICAgICBkZXRhaWxzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogJ3BlbmRpbmctcmVtb3ZlLW9uZScsXG4gICAgICAgICAgICB1dWlkOiBJTlZJVEVFX0EsXG4gICAgICAgICAgICBpbnZpdGVyOiBDT05UQUNUX0IsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0pfVxuICAgICAge3JlbmRlckNoYW5nZSh7XG4gICAgICAgIGZyb206IE9VUl9JRCxcbiAgICAgICAgZGV0YWlsczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6ICdwZW5kaW5nLXJlbW92ZS1vbmUnLFxuICAgICAgICAgICAgdXVpZDogSU5WSVRFRV9BLFxuICAgICAgICAgICAgaW52aXRlcjogQ09OVEFDVF9CLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9KX1cbiAgICAgIHtyZW5kZXJDaGFuZ2Uoe1xuICAgICAgICBkZXRhaWxzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogJ3BlbmRpbmctcmVtb3ZlLW9uZScsXG4gICAgICAgICAgICB1dWlkOiBJTlZJVEVFX0EsXG4gICAgICAgICAgICBpbnZpdGVyOiBDT05UQUNUX0IsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0pfVxuXG4gICAgICB7cmVuZGVyQ2hhbmdlKHtcbiAgICAgICAgZnJvbTogT1VSX0lELFxuICAgICAgICBkZXRhaWxzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogJ3BlbmRpbmctcmVtb3ZlLW9uZScsXG4gICAgICAgICAgICB1dWlkOiBJTlZJVEVFX0EsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0pfVxuICAgICAge3JlbmRlckNoYW5nZSh7XG4gICAgICAgIGZyb206IENPTlRBQ1RfQixcbiAgICAgICAgZGV0YWlsczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6ICdwZW5kaW5nLXJlbW92ZS1vbmUnLFxuICAgICAgICAgICAgdXVpZDogSU5WSVRFRV9BLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9KX1cbiAgICAgIHtyZW5kZXJDaGFuZ2Uoe1xuICAgICAgICBkZXRhaWxzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogJ3BlbmRpbmctcmVtb3ZlLW9uZScsXG4gICAgICAgICAgICB1dWlkOiBJTlZJVEVFX0EsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0pfVxuICAgIDwvPlxuICApO1xufTtcblxuUGVuZGluZ1JlbW92ZU9uZS5zdG9yeSA9IHtcbiAgbmFtZTogJ1BlbmRpbmcgUmVtb3ZlIC0gb25lJyxcbn07XG5cbmV4cG9ydCBjb25zdCBQZW5kaW5nUmVtb3ZlTWFueSA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIHtyZW5kZXJDaGFuZ2Uoe1xuICAgICAgICBmcm9tOiBPVVJfSUQsXG4gICAgICAgIGRldGFpbHM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAncGVuZGluZy1yZW1vdmUtbWFueScsXG4gICAgICAgICAgICBjb3VudDogNSxcbiAgICAgICAgICAgIGludml0ZXI6IE9VUl9JRCxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSl9XG4gICAgICB7cmVuZGVyQ2hhbmdlKHtcbiAgICAgICAgZnJvbTogQURNSU5fQSxcbiAgICAgICAgZGV0YWlsczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6ICdwZW5kaW5nLXJlbW92ZS1tYW55JyxcbiAgICAgICAgICAgIGNvdW50OiA1LFxuICAgICAgICAgICAgaW52aXRlcjogT1VSX0lELFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9KX1cbiAgICAgIHtyZW5kZXJDaGFuZ2Uoe1xuICAgICAgICBkZXRhaWxzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogJ3BlbmRpbmctcmVtb3ZlLW1hbnknLFxuICAgICAgICAgICAgY291bnQ6IDUsXG4gICAgICAgICAgICBpbnZpdGVyOiBPVVJfSUQsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0pfVxuICAgICAge3JlbmRlckNoYW5nZSh7XG4gICAgICAgIGZyb206IE9VUl9JRCxcbiAgICAgICAgZGV0YWlsczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6ICdwZW5kaW5nLXJlbW92ZS1tYW55JyxcbiAgICAgICAgICAgIGNvdW50OiA1LFxuICAgICAgICAgICAgaW52aXRlcjogQ09OVEFDVF9BLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9KX1cbiAgICAgIHtyZW5kZXJDaGFuZ2Uoe1xuICAgICAgICBmcm9tOiBBRE1JTl9BLFxuICAgICAgICBkZXRhaWxzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogJ3BlbmRpbmctcmVtb3ZlLW1hbnknLFxuICAgICAgICAgICAgY291bnQ6IDUsXG4gICAgICAgICAgICBpbnZpdGVyOiBDT05UQUNUX0EsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0pfVxuICAgICAge3JlbmRlckNoYW5nZSh7XG4gICAgICAgIGRldGFpbHM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAncGVuZGluZy1yZW1vdmUtbWFueScsXG4gICAgICAgICAgICBjb3VudDogNSxcbiAgICAgICAgICAgIGludml0ZXI6IENPTlRBQ1RfQSxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSl9XG4gICAgICB7cmVuZGVyQ2hhbmdlKHtcbiAgICAgICAgZnJvbTogT1VSX0lELFxuICAgICAgICBkZXRhaWxzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogJ3BlbmRpbmctcmVtb3ZlLW1hbnknLFxuICAgICAgICAgICAgY291bnQ6IDUsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0pfVxuXG4gICAgICB7cmVuZGVyQ2hhbmdlKHtcbiAgICAgICAgZnJvbTogQ09OVEFDVF9BLFxuICAgICAgICBkZXRhaWxzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogJ3BlbmRpbmctcmVtb3ZlLW1hbnknLFxuICAgICAgICAgICAgY291bnQ6IDUsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0pfVxuICAgICAge3JlbmRlckNoYW5nZSh7XG4gICAgICAgIGRldGFpbHM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAncGVuZGluZy1yZW1vdmUtbWFueScsXG4gICAgICAgICAgICBjb3VudDogNSxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSl9XG4gICAgPC8+XG4gICk7XG59O1xuXG5QZW5kaW5nUmVtb3ZlTWFueS5zdG9yeSA9IHtcbiAgbmFtZTogJ1BlbmRpbmcgUmVtb3ZlIC0gbWFueScsXG59O1xuXG5leHBvcnQgY29uc3QgQWRtaW5BcHByb3ZhbEFkZCA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIHtyZW5kZXJDaGFuZ2Uoe1xuICAgICAgICBkZXRhaWxzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogJ2FkbWluLWFwcHJvdmFsLWFkZC1vbmUnLFxuICAgICAgICAgICAgdXVpZDogT1VSX0lELFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9KX1cbiAgICAgIHtyZW5kZXJDaGFuZ2Uoe1xuICAgICAgICBkZXRhaWxzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogJ2FkbWluLWFwcHJvdmFsLWFkZC1vbmUnLFxuICAgICAgICAgICAgdXVpZDogQ09OVEFDVF9BLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9KX1cbiAgICA8Lz5cbiAgKTtcbn07XG5cbkFkbWluQXBwcm92YWxBZGQuc3RvcnkgPSB7XG4gIG5hbWU6ICdBZG1pbiBBcHByb3ZhbCAoQWRkKScsXG59O1xuXG5leHBvcnQgY29uc3QgQWRtaW5BcHByb3ZhbFJlbW92ZSA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIHtyZW5kZXJDaGFuZ2Uoe1xuICAgICAgICBmcm9tOiBPVVJfSUQsXG4gICAgICAgIGRldGFpbHM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAnYWRtaW4tYXBwcm92YWwtcmVtb3ZlLW9uZScsXG4gICAgICAgICAgICB1dWlkOiBPVVJfSUQsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0pfVxuICAgICAge3JlbmRlckNoYW5nZSh7XG4gICAgICAgIGRldGFpbHM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAnYWRtaW4tYXBwcm92YWwtcmVtb3ZlLW9uZScsXG4gICAgICAgICAgICB1dWlkOiBPVVJfSUQsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0pfVxuICAgICAge3JlbmRlckNoYW5nZSh7XG4gICAgICAgIGZyb206IE9VUl9JRCxcbiAgICAgICAgZGV0YWlsczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6ICdhZG1pbi1hcHByb3ZhbC1yZW1vdmUtb25lJyxcbiAgICAgICAgICAgIHV1aWQ6IENPTlRBQ1RfQSxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSl9XG4gICAgICBTaG91bGQgc2hvdyBidXR0b246XG4gICAgICB7cmVuZGVyQ2hhbmdlKFxuICAgICAgICB7XG4gICAgICAgICAgZnJvbTogQ09OVEFDVF9BLFxuICAgICAgICAgIGRldGFpbHM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgdHlwZTogJ2FkbWluLWFwcHJvdmFsLXJlbW92ZS1vbmUnLFxuICAgICAgICAgICAgICB1dWlkOiBDT05UQUNUX0EsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIF0sXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBncm91cE1lbWJlcnNoaXBzOiBbeyB1dWlkOiBDT05UQUNUX0MsIGlzQWRtaW46IGZhbHNlIH1dLFxuICAgICAgICAgIGdyb3VwQmFubmVkTWVtYmVyc2hpcHM6IFtDT05UQUNUX0JdLFxuICAgICAgICB9XG4gICAgICApfVxuICAgICAge3JlbmRlckNoYW5nZSh7XG4gICAgICAgIGZyb206IEFETUlOX0EsXG4gICAgICAgIGRldGFpbHM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAnYWRtaW4tYXBwcm92YWwtcmVtb3ZlLW9uZScsXG4gICAgICAgICAgICB1dWlkOiBDT05UQUNUX0EsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0pfVxuICAgICAgU2hvdWxkIHNob3cgYnV0dG9uOlxuICAgICAge3JlbmRlckNoYW5nZShcbiAgICAgICAge1xuICAgICAgICAgIGRldGFpbHM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgdHlwZTogJ2FkbWluLWFwcHJvdmFsLXJlbW92ZS1vbmUnLFxuICAgICAgICAgICAgICB1dWlkOiBDT05UQUNUX0EsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIF0sXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBncm91cE1lbWJlcnNoaXBzOiBbeyB1dWlkOiBDT05UQUNUX0MsIGlzQWRtaW46IGZhbHNlIH1dLFxuICAgICAgICAgIGdyb3VwQmFubmVkTWVtYmVyc2hpcHM6IFtDT05UQUNUX0JdLFxuICAgICAgICB9XG4gICAgICApfVxuICAgICAgV291bGQgc2hvdyBidXR0b24sIGJ1dCB3ZSZhcG9zO3JlIG5vdCBhZG1pbjpcbiAgICAgIHtyZW5kZXJDaGFuZ2UoXG4gICAgICAgIHtcbiAgICAgICAgICBmcm9tOiBDT05UQUNUX0EsXG4gICAgICAgICAgZGV0YWlsczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICB0eXBlOiAnYWRtaW4tYXBwcm92YWwtcmVtb3ZlLW9uZScsXG4gICAgICAgICAgICAgIHV1aWQ6IENPTlRBQ1RfQSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgXSxcbiAgICAgICAgfSxcblxuICAgICAgICB7IGFyZVdlQWRtaW46IGZhbHNlLCBncm91cE5hbWU6ICdHcm91cCAxJyB9XG4gICAgICApfVxuICAgICAgV291bGQgc2hvdyBidXR0b24sIGJ1dCB1c2VyIGlzIGEgZ3JvdXAgbWVtYmVyOlxuICAgICAge3JlbmRlckNoYW5nZShcbiAgICAgICAge1xuICAgICAgICAgIGZyb206IENPTlRBQ1RfQSxcbiAgICAgICAgICBkZXRhaWxzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHR5cGU6ICdhZG1pbi1hcHByb3ZhbC1yZW1vdmUtb25lJyxcbiAgICAgICAgICAgICAgdXVpZDogQ09OVEFDVF9BLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICBdLFxuICAgICAgICB9LFxuICAgICAgICB7IGdyb3VwTWVtYmVyc2hpcHM6IFt7IHV1aWQ6IENPTlRBQ1RfQSwgaXNBZG1pbjogZmFsc2UgfV0gfVxuICAgICAgKX1cbiAgICAgIFdvdWxkIHNob3cgYnV0dG9uLCBidXQgdXNlciBpcyBhbHJlYWR5IGJhbm5lZDpcbiAgICAgIHtyZW5kZXJDaGFuZ2UoXG4gICAgICAgIHtcbiAgICAgICAgICBmcm9tOiBDT05UQUNUX0EsXG4gICAgICAgICAgZGV0YWlsczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICB0eXBlOiAnYWRtaW4tYXBwcm92YWwtcmVtb3ZlLW9uZScsXG4gICAgICAgICAgICAgIHV1aWQ6IENPTlRBQ1RfQSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgXSxcbiAgICAgICAgfSxcblxuICAgICAgICB7IGdyb3VwQmFubmVkTWVtYmVyc2hpcHM6IFtDT05UQUNUX0FdIH1cbiAgICAgICl9XG4gICAgPC8+XG4gICk7XG59O1xuXG5BZG1pbkFwcHJvdmFsUmVtb3ZlLnN0b3J5ID0ge1xuICBuYW1lOiAnQWRtaW4gQXBwcm92YWwgKFJlbW92ZSknLFxufTtcblxuZXhwb3J0IGNvbnN0IEdyb3VwTGlua0FkZCA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIHtyZW5kZXJDaGFuZ2Uoe1xuICAgICAgICBmcm9tOiBPVVJfSUQsXG4gICAgICAgIGRldGFpbHM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAnZ3JvdXAtbGluay1hZGQnLFxuICAgICAgICAgICAgcHJpdmlsZWdlOiBBY2Nlc3NDb250cm9sRW51bS5BTlksXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0pfVxuICAgICAge3JlbmRlckNoYW5nZSh7XG4gICAgICAgIGZyb206IEFETUlOX0EsXG4gICAgICAgIGRldGFpbHM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAnZ3JvdXAtbGluay1hZGQnLFxuICAgICAgICAgICAgcHJpdmlsZWdlOiBBY2Nlc3NDb250cm9sRW51bS5BTlksXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0pfVxuICAgICAge3JlbmRlckNoYW5nZSh7XG4gICAgICAgIGRldGFpbHM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAnZ3JvdXAtbGluay1hZGQnLFxuICAgICAgICAgICAgcHJpdmlsZWdlOiBBY2Nlc3NDb250cm9sRW51bS5BTlksXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0pfVxuICAgICAge3JlbmRlckNoYW5nZSh7XG4gICAgICAgIGZyb206IE9VUl9JRCxcbiAgICAgICAgZGV0YWlsczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6ICdncm91cC1saW5rLWFkZCcsXG4gICAgICAgICAgICBwcml2aWxlZ2U6IEFjY2Vzc0NvbnRyb2xFbnVtLkFETUlOSVNUUkFUT1IsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0pfVxuICAgICAge3JlbmRlckNoYW5nZSh7XG4gICAgICAgIGZyb206IEFETUlOX0EsXG4gICAgICAgIGRldGFpbHM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAnZ3JvdXAtbGluay1hZGQnLFxuICAgICAgICAgICAgcHJpdmlsZWdlOiBBY2Nlc3NDb250cm9sRW51bS5BRE1JTklTVFJBVE9SLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9KX1cbiAgICAgIHtyZW5kZXJDaGFuZ2Uoe1xuICAgICAgICBkZXRhaWxzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogJ2dyb3VwLWxpbmstYWRkJyxcbiAgICAgICAgICAgIHByaXZpbGVnZTogQWNjZXNzQ29udHJvbEVudW0uQURNSU5JU1RSQVRPUixcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSl9XG4gICAgPC8+XG4gICk7XG59O1xuXG5Hcm91cExpbmtBZGQuc3RvcnkgPSB7XG4gIG5hbWU6ICdHcm91cCBMaW5rIChBZGQpJyxcbn07XG5cbmV4cG9ydCBjb25zdCBHcm91cExpbmtSZXNldCA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIHtyZW5kZXJDaGFuZ2Uoe1xuICAgICAgICBmcm9tOiBPVVJfSUQsXG4gICAgICAgIGRldGFpbHM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAnZ3JvdXAtbGluay1yZXNldCcsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0pfVxuICAgICAge3JlbmRlckNoYW5nZSh7XG4gICAgICAgIGZyb206IEFETUlOX0EsXG4gICAgICAgIGRldGFpbHM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAnZ3JvdXAtbGluay1yZXNldCcsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0pfVxuICAgICAge3JlbmRlckNoYW5nZSh7XG4gICAgICAgIGRldGFpbHM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAnZ3JvdXAtbGluay1yZXNldCcsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0pfVxuICAgIDwvPlxuICApO1xufTtcblxuR3JvdXBMaW5rUmVzZXQuc3RvcnkgPSB7XG4gIG5hbWU6ICdHcm91cCBMaW5rIChSZXNldCknLFxufTtcblxuZXhwb3J0IGNvbnN0IEdyb3VwTGlua1JlbW92ZSA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIHtyZW5kZXJDaGFuZ2Uoe1xuICAgICAgICBmcm9tOiBPVVJfSUQsXG4gICAgICAgIGRldGFpbHM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAnZ3JvdXAtbGluay1yZW1vdmUnLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9KX1cbiAgICAgIHtyZW5kZXJDaGFuZ2Uoe1xuICAgICAgICBmcm9tOiBBRE1JTl9BLFxuICAgICAgICBkZXRhaWxzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogJ2dyb3VwLWxpbmstcmVtb3ZlJyxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSl9XG4gICAgICB7cmVuZGVyQ2hhbmdlKHtcbiAgICAgICAgZGV0YWlsczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6ICdncm91cC1saW5rLXJlbW92ZScsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0pfVxuICAgIDwvPlxuICApO1xufTtcblxuR3JvdXBMaW5rUmVtb3ZlLnN0b3J5ID0ge1xuICBuYW1lOiAnR3JvdXAgTGluayAoUmVtb3ZlKScsXG59O1xuXG5leHBvcnQgY29uc3QgRGVzY3JpcHRpb25SZW1vdmUgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICByZXR1cm4gKFxuICAgIDw+XG4gICAgICB7cmVuZGVyQ2hhbmdlKHtcbiAgICAgICAgZnJvbTogT1VSX0lELFxuICAgICAgICBkZXRhaWxzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgcmVtb3ZlZDogdHJ1ZSxcbiAgICAgICAgICAgIHR5cGU6ICdkZXNjcmlwdGlvbicsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0pfVxuICAgICAge3JlbmRlckNoYW5nZSh7XG4gICAgICAgIGZyb206IEFETUlOX0EsXG4gICAgICAgIGRldGFpbHM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICByZW1vdmVkOiB0cnVlLFxuICAgICAgICAgICAgdHlwZTogJ2Rlc2NyaXB0aW9uJyxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSl9XG4gICAgICB7cmVuZGVyQ2hhbmdlKHtcbiAgICAgICAgZGV0YWlsczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHJlbW92ZWQ6IHRydWUsXG4gICAgICAgICAgICB0eXBlOiAnZGVzY3JpcHRpb24nLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9KX1cbiAgICA8Lz5cbiAgKTtcbn07XG5cbkRlc2NyaXB0aW9uUmVtb3ZlLnN0b3J5ID0ge1xuICBuYW1lOiAnRGVzY3JpcHRpb24gKFJlbW92ZSknLFxufTtcblxuZXhwb3J0IGNvbnN0IERlc2NyaXB0aW9uQ2hhbmdlID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAge3JlbmRlckNoYW5nZShcbiAgICAgICAge1xuICAgICAgICAgIGZyb206IE9VUl9JRCxcbiAgICAgICAgICBkZXRhaWxzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHR5cGU6ICdkZXNjcmlwdGlvbicsXG4gICAgICAgICAgICAgIGRlc2NyaXB0aW9uOlxuICAgICAgICAgICAgICAgICdUaGlzIGlzIGEgbG9uZyBkZXNjcmlwdGlvbi5cXG5cXG5XZSBuZWVkIGEgZGlhbG9nIHRvIHZpZXcgaXQgYWxsIVxcblxcbkl0IGhhcyBhIGxpbmsgdG8gaHR0cHM6Ly9leGFtcGxlLmNvbScsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIF0sXG4gICAgICAgIH0sXG4gICAgICAgIHsgZ3JvdXBOYW1lOiAnV2UgZG8gaGlrZXMgXHVEODNDXHVERjMyJyB9XG4gICAgICApfVxuICAgICAge3JlbmRlckNoYW5nZShcbiAgICAgICAge1xuICAgICAgICAgIGZyb206IEFETUlOX0EsXG4gICAgICAgICAgZGV0YWlsczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICB0eXBlOiAnZGVzY3JpcHRpb24nLFxuICAgICAgICAgICAgICBkZXNjcmlwdGlvbjpcbiAgICAgICAgICAgICAgICAnVGhpcyBpcyBhIGxvbmcgZGVzY3JpcHRpb24uXFxuXFxuV2UgbmVlZCBhIGRpYWxvZyB0byB2aWV3IGl0IGFsbCFcXG5cXG5JdCBoYXMgYSBsaW5rIHRvIGh0dHBzOi8vZXhhbXBsZS5jb20nLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICBdLFxuICAgICAgICB9LFxuICAgICAgICB7IGdyb3VwTmFtZTogJ1dlIGRvIGhpa2VzIFx1RDgzQ1x1REYzMicgfVxuICAgICAgKX1cbiAgICAgIHtyZW5kZXJDaGFuZ2UoXG4gICAgICAgIHtcbiAgICAgICAgICBkZXRhaWxzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHR5cGU6ICdkZXNjcmlwdGlvbicsXG4gICAgICAgICAgICAgIGRlc2NyaXB0aW9uOlxuICAgICAgICAgICAgICAgICdUaGlzIGlzIGEgbG9uZyBkZXNjcmlwdGlvbi5cXG5cXG5XZSBuZWVkIGEgZGlhbG9nIHRvIHZpZXcgaXQgYWxsIVxcblxcbkl0IGhhcyBhIGxpbmsgdG8gaHR0cHM6Ly9leGFtcGxlLmNvbScsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIF0sXG4gICAgICAgIH0sXG4gICAgICAgIHsgZ3JvdXBOYW1lOiAnV2UgZG8gaGlrZXMgXHVEODNDXHVERjMyJyB9XG4gICAgICApfVxuICAgIDwvPlxuICApO1xufTtcblxuRGVzY3JpcHRpb25DaGFuZ2Uuc3RvcnkgPSB7XG4gIG5hbWU6ICdEZXNjcmlwdGlvbiAoQ2hhbmdlKScsXG59O1xuXG5leHBvcnQgY29uc3QgQW5ub3VuY2VtZW50R3JvdXBDaGFuZ2UgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICByZXR1cm4gKFxuICAgIDw+XG4gICAgICB7cmVuZGVyQ2hhbmdlKHtcbiAgICAgICAgZnJvbTogT1VSX0lELFxuICAgICAgICBkZXRhaWxzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogJ2Fubm91bmNlbWVudHMtb25seScsXG4gICAgICAgICAgICBhbm5vdW5jZW1lbnRzT25seTogdHJ1ZSxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSl9XG4gICAgICB7cmVuZGVyQ2hhbmdlKHtcbiAgICAgICAgZnJvbTogQURNSU5fQSxcbiAgICAgICAgZGV0YWlsczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6ICdhbm5vdW5jZW1lbnRzLW9ubHknLFxuICAgICAgICAgICAgYW5ub3VuY2VtZW50c09ubHk6IHRydWUsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0pfVxuICAgICAge3JlbmRlckNoYW5nZSh7XG4gICAgICAgIGRldGFpbHM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAnYW5ub3VuY2VtZW50cy1vbmx5JyxcbiAgICAgICAgICAgIGFubm91bmNlbWVudHNPbmx5OiB0cnVlLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9KX1cbiAgICAgIHtyZW5kZXJDaGFuZ2Uoe1xuICAgICAgICBmcm9tOiBPVVJfSUQsXG4gICAgICAgIGRldGFpbHM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAnYW5ub3VuY2VtZW50cy1vbmx5JyxcbiAgICAgICAgICAgIGFubm91bmNlbWVudHNPbmx5OiBmYWxzZSxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSl9XG4gICAgICB7cmVuZGVyQ2hhbmdlKHtcbiAgICAgICAgZnJvbTogQURNSU5fQSxcbiAgICAgICAgZGV0YWlsczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6ICdhbm5vdW5jZW1lbnRzLW9ubHknLFxuICAgICAgICAgICAgYW5ub3VuY2VtZW50c09ubHk6IGZhbHNlLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9KX1cbiAgICAgIHtyZW5kZXJDaGFuZ2Uoe1xuICAgICAgICBkZXRhaWxzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogJ2Fubm91bmNlbWVudHMtb25seScsXG4gICAgICAgICAgICBhbm5vdW5jZW1lbnRzT25seTogZmFsc2UsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0pfVxuICAgIDwvPlxuICApO1xufTtcblxuQW5ub3VuY2VtZW50R3JvdXBDaGFuZ2Uuc3RvcnkgPSB7XG4gIG5hbWU6ICdBbm5vdW5jZW1lbnQgR3JvdXAgKENoYW5nZSknLFxufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLFlBQXVCO0FBQ3ZCLDJCQUF1QjtBQUV2Qix1QkFBMEI7QUFDMUIsa0JBQXFCO0FBRXJCLHNCQUF1QjtBQUV2QixzQkFBdUM7QUFFdkMsMkJBQThCO0FBRzlCLE1BQU0sT0FBTyxnQ0FBVSxNQUFNLHVCQUFVO0FBRXZDLE1BQU0sU0FBUyxpQkFBSyxTQUFTLEVBQUUsU0FBUztBQUN4QyxNQUFNLFlBQVksaUJBQUssU0FBUyxFQUFFLFNB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QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLE1BQU07QUFBQSxRQUNOLFNBQVM7QUFBQSxNQUNYO0FBQUEsSUFDRjtBQUFBLEVBQ0YsQ0FBQyxHQUNBLGFBQWE7QUFBQSxJQUNaLE1BQU07QUFBQSxJQUNOLFNBQVM7QUFBQSxNQUNQO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixNQUFNO0FBQUEsUUFDTixTQUFTO0FBQUEsTUFDWDtBQUFBLElBQ0Y7QUFBQSxFQUNGLENBQUMsR0FDQSxhQUFhO0FBQUEsSUFDWixTQUFTO0FBQUEsTUFDUDtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sTUFBTTtBQUFBLFFBQ04sU0FBUztBQUFBLE1BQ1g7QUFBQSxJQUNGO0FBQUEsRUFDRixDQUFDLEdBQ0EsYUFBYTtBQUFBLElBQ1osTUFBTTtBQUFBLElBQ04sU0FBUztBQUFBLE1BQ1A7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLE1BQU07QUFBQSxNQUNSO0FBQUEsSUFDRjtBQUFBLEVBQ0YsQ0FBQyxHQUNBLGFBQWE7QUFBQSxJQUNaLE1BQU07QUFBQSxJQUNOLFNBQVM7QUFBQSxNQUNQO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixNQUFNO0FBQUEsUUFDTixTQUFTO0FBQUEsTUFDWDtBQUFBLElBQ0Y7QUFBQSxFQUNGLENBQUMsR0FFQSxhQUFhO0FBQUEsSUFDWixNQUFNO0FBQUEsSUFDTixTQUFTO0FBQUEsTUFDUDtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sTUFBTTtBQUFBLFFBQ04sU0FBUztBQUFBLE1BQ1g7QUFBQSxJQUNGO0FBQUEsRUFDRixDQUFDLEdBQ0EsYUFBYTtBQUFBLElBQ1osTUFBTTtBQUFBLElBQ04sU0FBUztBQUFBLE1BQ1A7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLE1BQU07QUFBQSxRQUNOLFNBQVM7QUFBQSxNQUNYO0FBQUEsSUFDRjtBQUFBLEVBQ0YsQ0FBQyxHQUVBLGFBQWE7QUFBQSxJQUNaLE1BQU07QUFBQSxJQUNOLFNBQVM7QUFBQSxNQUNQO0FBQUEsUUFDRSxNQUFNO0FBQUEs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
