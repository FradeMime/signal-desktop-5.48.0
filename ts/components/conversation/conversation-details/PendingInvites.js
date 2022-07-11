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
var PendingInvites_exports = {};
__export(PendingInvites_exports, {
  PendingInvites: () => PendingInvites
});
module.exports = __toCommonJS(PendingInvites_exports);
var import_react = __toESM(require("react"));
var import_classnames = __toESM(require("classnames"));
var import_lodash = __toESM(require("lodash"));
var import_Avatar = require("../../Avatar");
var import_ConfirmationDialog = require("../../ConfirmationDialog");
var import_PanelSection = require("./PanelSection");
var import_PanelRow = require("./PanelRow");
var import_ConversationDetailsIcon = require("./ConversationDetailsIcon");
var import_util = require("../../../groups/util");
var Tab = /* @__PURE__ */ ((Tab2) => {
  Tab2["Requests"] = "Requests";
  Tab2["Pending"] = "Pending";
  return Tab2;
})(Tab || {});
var StageType = /* @__PURE__ */ ((StageType2) => {
  StageType2["APPROVE_REQUEST"] = "APPROVE_REQUEST";
  StageType2["DENY_REQUEST"] = "DENY_REQUEST";
  StageType2["REVOKE_INVITE"] = "REVOKE_INVITE";
  return StageType2;
})(StageType || {});
const PendingInvites = /* @__PURE__ */ __name(({
  approvePendingMembership,
  conversation,
  getPreferredBadge,
  i18n,
  ourUuid,
  pendingMemberships,
  pendingApprovalMemberships,
  revokePendingMemberships,
  theme
}) => {
  if (!conversation || !ourUuid) {
    throw new Error("PendingInvites rendered without a conversation or ourUuid");
  }
  const [selectedTab, setSelectedTab] = import_react.default.useState("Requests" /* Requests */);
  const [stagedMemberships, setStagedMemberships] = import_react.default.useState(null);
  return /* @__PURE__ */ import_react.default.createElement("div", {
    className: "conversation-details-panel"
  }, /* @__PURE__ */ import_react.default.createElement("div", {
    className: "ConversationDetails__tabs"
  }, /* @__PURE__ */ import_react.default.createElement("div", {
    className: (0, import_classnames.default)({
      ConversationDetails__tab: true,
      "ConversationDetails__tab--selected": selectedTab === "Requests" /* Requests */
    }),
    onClick: () => {
      setSelectedTab("Requests" /* Requests */);
    },
    onKeyUp: (e) => {
      if (e.target === e.currentTarget && e.keyCode === 13) {
        setSelectedTab("Requests" /* Requests */);
      }
    },
    role: "tab",
    tabIndex: 0
  }, i18n("PendingInvites--tab-requests", {
    count: String(pendingApprovalMemberships.length)
  })), /* @__PURE__ */ import_react.default.createElement("div", {
    className: (0, import_classnames.default)({
      ConversationDetails__tab: true,
      "ConversationDetails__tab--selected": selectedTab === "Pending" /* Pending */
    }),
    onClick: () => {
      setSelectedTab("Pending" /* Pending */);
    },
    onKeyUp: (e) => {
      if (e.target === e.currentTarget && e.keyCode === 13) {
        setSelectedTab("Pending" /* Pending */);
      }
    },
    role: "tab",
    tabIndex: 0
  }, i18n("PendingInvites--tab-invites", {
    count: String(pendingMemberships.length)
  }))), selectedTab === "Requests" /* Requests */ ? /* @__PURE__ */ import_react.default.createElement(MembersPendingAdminApproval, {
    conversation,
    getPreferredBadge,
    i18n,
    memberships: pendingApprovalMemberships,
    setStagedMemberships,
    theme
  }) : null, selectedTab === "Pending" /* Pending */ ? /* @__PURE__ */ import_react.default.createElement(MembersPendingProfileKey, {
    conversation,
    getPreferredBadge,
    i18n,
    members: conversation.sortedGroupMembers || [],
    memberships: pendingMemberships,
    ourUuid,
    setStagedMemberships,
    theme
  }) : null, stagedMemberships && stagedMemberships.length && /* @__PURE__ */ import_react.default.createElement(MembershipActionConfirmation, {
    approvePendingMembership,
    conversation,
    i18n,
    members: conversation.sortedGroupMembers || [],
    onClose: () => setStagedMemberships(null),
    ourUuid,
    revokePendingMemberships,
    stagedMemberships
  }));
}, "PendingInvites");
function MembershipActionConfirmation({
  approvePendingMembership,
  conversation,
  i18n,
  members,
  onClose,
  ourUuid,
  revokePendingMemberships,
  stagedMemberships
}) {
  const revokeStagedMemberships = /* @__PURE__ */ __name(() => {
    if (!stagedMemberships) {
      return;
    }
    revokePendingMemberships(stagedMemberships.map(({ membership }) => membership.member.id));
  }, "revokeStagedMemberships");
  const approveStagedMembership = /* @__PURE__ */ __name(() => {
    if (!stagedMemberships) {
      return;
    }
    approvePendingMembership(stagedMemberships[0].membership.member.id);
  }, "approveStagedMembership");
  const membershipType = stagedMemberships[0].type;
  const modalAction = membershipType === "APPROVE_REQUEST" /* APPROVE_REQUEST */ ? approveStagedMembership : revokeStagedMemberships;
  let modalActionText = i18n("PendingInvites--revoke");
  if (membershipType === "APPROVE_REQUEST" /* APPROVE_REQUEST */) {
    modalActionText = i18n("PendingRequests--approve");
  } else if (membershipType === "DENY_REQUEST" /* DENY_REQUEST */) {
    modalActionText = i18n("PendingRequests--deny");
  } else if (membershipType === "REVOKE_INVITE" /* REVOKE_INVITE */) {
    modalActionText = i18n("PendingInvites--revoke");
  }
  return /* @__PURE__ */ import_react.default.createElement(import_ConfirmationDialog.ConfirmationDialog, {
    actions: [
      {
        action: modalAction,
        style: "affirmative",
        text: modalActionText
      }
    ],
    i18n,
    onClose
  }, getConfirmationMessage({
    conversation,
    i18n,
    members,
    ourUuid,
    stagedMemberships
  }));
}
function getConfirmationMessage({
  conversation,
  i18n,
  members,
  ourUuid,
  stagedMemberships
}) {
  if (!stagedMemberships || !stagedMemberships.length) {
    return "";
  }
  const membershipType = stagedMemberships[0].type;
  const firstMembership = stagedMemberships[0].membership;
  if (membershipType === "DENY_REQUEST" /* DENY_REQUEST */) {
    const key = (0, import_util.isAccessControlEnabled)(conversation.accessControlAddFromInviteLink) ? "PendingRequests--deny-for--with-link" : "PendingRequests--deny-for";
    return i18n(key, {
      name: firstMembership.member.title
    });
  }
  if (membershipType === "APPROVE_REQUEST" /* APPROVE_REQUEST */) {
    return i18n("PendingRequests--approve-for", {
      name: firstMembership.member.title
    });
  }
  if (membershipType !== "REVOKE_INVITE" /* REVOKE_INVITE */) {
    throw new Error("getConfirmationMessage: Invalid staging type");
  }
  const firstPendingMembership = firstMembership;
  const invitedByUs = firstPendingMembership.metadata.addedByUserId === ourUuid;
  if (invitedByUs) {
    return i18n("PendingInvites--revoke-for", {
      name: firstPendingMembership.member.title
    });
  }
  const inviter = members.find(({ id }) => id === firstPendingMembership.metadata.addedByUserId);
  if (inviter === void 0) {
    return "";
  }
  const name = inviter.title;
  if (stagedMemberships.length === 1) {
    return i18n("PendingInvites--revoke-from-singular", { name });
  }
  return i18n("PendingInvites--revoke-from-plural", {
    number: stagedMemberships.length.toString(),
    name
  });
}
function MembersPendingAdminApproval({
  conversation,
  getPreferredBadge,
  i18n,
  memberships,
  setStagedMemberships,
  theme
}) {
  return /* @__PURE__ */ import_react.default.createElement(import_PanelSection.PanelSection, null, memberships.map((membership) => /* @__PURE__ */ import_react.default.createElement(import_PanelRow.PanelRow, {
    alwaysShowActions: true,
    key: membership.member.id,
    icon: /* @__PURE__ */ import_react.default.createElement(import_Avatar.Avatar, {
      badge: getPreferredBadge(membership.member.badges),
      conversationType: "direct",
      size: 32,
      i18n,
      theme,
      ...membership.member
    }),
    label: membership.member.title,
    actions: conversation.areWeAdmin ? /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement("button", {
      type: "button",
      className: "module-button__small ConversationDetails__action-button",
      onClick: () => {
        setStagedMemberships([
          {
            type: "DENY_REQUEST" /* DENY_REQUEST */,
            membership
          }
        ]);
      }
    }, i18n("delete")), /* @__PURE__ */ import_react.default.createElement("button", {
      type: "button",
      className: "module-button__small ConversationDetails__action-button",
      onClick: () => {
        setStagedMemberships([
          {
            type: "APPROVE_REQUEST" /* APPROVE_REQUEST */,
            membership
          }
        ]);
      }
    }, i18n("accept"))) : null
  })), /* @__PURE__ */ import_react.default.createElement("div", {
    className: "ConversationDetails__pending--info"
  }, i18n("PendingRequests--info", [conversation.title])));
}
function MembersPendingProfileKey({
  conversation,
  i18n,
  members,
  memberships,
  ourUuid,
  setStagedMemberships,
  getPreferredBadge,
  theme
}) {
  const groupedPendingMemberships = import_lodash.default.groupBy(memberships, (membership) => membership.metadata.addedByUserId);
  const { [ourUuid]: ourPendingMemberships, ...otherPendingMembershipGroups } = groupedPendingMemberships;
  const otherPendingMemberships = Object.keys(otherPendingMembershipGroups).map((id) => members.find((member) => member.id === id)).filter((member) => member !== void 0).map((member) => ({
    member,
    pendingMemberships: otherPendingMembershipGroups[member.id]
  }));
  return /* @__PURE__ */ import_react.default.createElement(import_PanelSection.PanelSection, null, ourPendingMemberships && /* @__PURE__ */ import_react.default.createElement(import_PanelSection.PanelSection, {
    title: i18n("PendingInvites--invited-by-you")
  }, ourPendingMemberships.map((membership) => /* @__PURE__ */ import_react.default.createElement(import_PanelRow.PanelRow, {
    key: membership.member.id,
    icon: /* @__PURE__ */ import_react.default.createElement(import_Avatar.Avatar, {
      badge: getPreferredBadge(membership.member.badges),
      conversationType: "direct",
      size: 32,
      i18n,
      theme,
      ...membership.member
    }),
    label: membership.member.title,
    actions: conversation.areWeAdmin ? /* @__PURE__ */ import_react.default.createElement(import_ConversationDetailsIcon.ConversationDetailsIcon, {
      ariaLabel: i18n("PendingInvites--revoke-for-label"),
      icon: import_ConversationDetailsIcon.IconType.trash,
      onClick: () => {
        setStagedMemberships([
          {
            type: "REVOKE_INVITE" /* REVOKE_INVITE */,
            membership
          }
        ]);
      }
    }) : null
  }))), otherPendingMemberships.length > 0 && /* @__PURE__ */ import_react.default.createElement(import_PanelSection.PanelSection, {
    title: i18n("PendingInvites--invited-by-others")
  }, otherPendingMemberships.map(({ member, pendingMemberships }) => /* @__PURE__ */ import_react.default.createElement(import_PanelRow.PanelRow, {
    key: member.id,
    icon: /* @__PURE__ */ import_react.default.createElement(import_Avatar.Avatar, {
      badge: getPreferredBadge(member.badges),
      conversationType: "direct",
      size: 32,
      i18n,
      theme,
      ...member
    }),
    label: member.title,
    right: i18n("PendingInvites--invited-count", [
      pendingMemberships.length.toString()
    ]),
    actions: conversation.areWeAdmin ? /* @__PURE__ */ import_react.default.createElement(import_ConversationDetailsIcon.ConversationDetailsIcon, {
      ariaLabel: i18n("PendingInvites--revoke-for-label"),
      icon: import_ConversationDetailsIcon.IconType.trash,
      onClick: () => {
        setStagedMemberships(pendingMemberships.map((membership) => ({
          type: "REVOKE_INVITE" /* REVOKE_INVITE */,
          membership
        })));
      }
    }) : null
  }))), /* @__PURE__ */ import_react.default.createElement("div", {
    className: "ConversationDetails__pending--info"
  }, i18n("PendingInvites--info")));
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PendingInvites
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiUGVuZGluZ0ludml0ZXMudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5cbmltcG9ydCB0eXBlIHsgQ29udmVyc2F0aW9uVHlwZSB9IGZyb20gJy4uLy4uLy4uL3N0YXRlL2R1Y2tzL2NvbnZlcnNhdGlvbnMnO1xuaW1wb3J0IHR5cGUgeyBMb2NhbGl6ZXJUeXBlLCBUaGVtZVR5cGUgfSBmcm9tICcuLi8uLi8uLi90eXBlcy9VdGlsJztcbmltcG9ydCB0eXBlIHsgUHJlZmVycmVkQmFkZ2VTZWxlY3RvclR5cGUgfSBmcm9tICcuLi8uLi8uLi9zdGF0ZS9zZWxlY3RvcnMvYmFkZ2VzJztcbmltcG9ydCB0eXBlIHsgVVVJRFN0cmluZ1R5cGUgfSBmcm9tICcuLi8uLi8uLi90eXBlcy9VVUlEJztcbmltcG9ydCB7IEF2YXRhciB9IGZyb20gJy4uLy4uL0F2YXRhcic7XG5pbXBvcnQgeyBDb25maXJtYXRpb25EaWFsb2cgfSBmcm9tICcuLi8uLi9Db25maXJtYXRpb25EaWFsb2cnO1xuaW1wb3J0IHsgUGFuZWxTZWN0aW9uIH0gZnJvbSAnLi9QYW5lbFNlY3Rpb24nO1xuaW1wb3J0IHsgUGFuZWxSb3cgfSBmcm9tICcuL1BhbmVsUm93JztcbmltcG9ydCB7IENvbnZlcnNhdGlvbkRldGFpbHNJY29uLCBJY29uVHlwZSB9IGZyb20gJy4vQ29udmVyc2F0aW9uRGV0YWlsc0ljb24nO1xuaW1wb3J0IHsgaXNBY2Nlc3NDb250cm9sRW5hYmxlZCB9IGZyb20gJy4uLy4uLy4uL2dyb3Vwcy91dGlsJztcblxuZXhwb3J0IHR5cGUgUHJvcHNUeXBlID0ge1xuICByZWFkb25seSBjb252ZXJzYXRpb24/OiBDb252ZXJzYXRpb25UeXBlO1xuICByZWFkb25seSBnZXRQcmVmZXJyZWRCYWRnZTogUHJlZmVycmVkQmFkZ2VTZWxlY3RvclR5cGU7XG4gIHJlYWRvbmx5IGkxOG46IExvY2FsaXplclR5cGU7XG4gIHJlYWRvbmx5IG91clV1aWQ6IFVVSURTdHJpbmdUeXBlO1xuICByZWFkb25seSBwZW5kaW5nQXBwcm92YWxNZW1iZXJzaGlwczogUmVhZG9ubHlBcnJheTxHcm91cFYyUmVxdWVzdGluZ01lbWJlcnNoaXA+O1xuICByZWFkb25seSBwZW5kaW5nTWVtYmVyc2hpcHM6IFJlYWRvbmx5QXJyYXk8R3JvdXBWMlBlbmRpbmdNZW1iZXJzaGlwPjtcbiAgcmVhZG9ubHkgYXBwcm92ZVBlbmRpbmdNZW1iZXJzaGlwOiAoY29udmVyc2F0aW9uSWQ6IHN0cmluZykgPT4gdm9pZDtcbiAgcmVhZG9ubHkgcmV2b2tlUGVuZGluZ01lbWJlcnNoaXBzOiAoY29udmVyc2F0aW9uSWRzOiBBcnJheTxzdHJpbmc+KSA9PiB2b2lkO1xuICByZWFkb25seSB0aGVtZTogVGhlbWVUeXBlO1xufTtcblxuZXhwb3J0IHR5cGUgR3JvdXBWMlBlbmRpbmdNZW1iZXJzaGlwID0ge1xuICBtZXRhZGF0YToge1xuICAgIGFkZGVkQnlVc2VySWQ/OiBVVUlEU3RyaW5nVHlwZTtcbiAgfTtcbiAgbWVtYmVyOiBDb252ZXJzYXRpb25UeXBlO1xufTtcblxuZXhwb3J0IHR5cGUgR3JvdXBWMlJlcXVlc3RpbmdNZW1iZXJzaGlwID0ge1xuICBtZW1iZXI6IENvbnZlcnNhdGlvblR5cGU7XG59O1xuXG5lbnVtIFRhYiB7XG4gIFJlcXVlc3RzID0gJ1JlcXVlc3RzJyxcbiAgUGVuZGluZyA9ICdQZW5kaW5nJyxcbn1cblxuZW51bSBTdGFnZVR5cGUge1xuICBBUFBST1ZFX1JFUVVFU1QgPSAnQVBQUk9WRV9SRVFVRVNUJyxcbiAgREVOWV9SRVFVRVNUID0gJ0RFTllfUkVRVUVTVCcsXG4gIFJFVk9LRV9JTlZJVEUgPSAnUkVWT0tFX0lOVklURScsXG59XG5cbnR5cGUgU3RhZ2VkTWVtYmVyc2hpcFR5cGUgPSB7XG4gIHR5cGU6IFN0YWdlVHlwZTtcbiAgbWVtYmVyc2hpcDogR3JvdXBWMlBlbmRpbmdNZW1iZXJzaGlwIHwgR3JvdXBWMlJlcXVlc3RpbmdNZW1iZXJzaGlwO1xufTtcblxuZXhwb3J0IGNvbnN0IFBlbmRpbmdJbnZpdGVzOiBSZWFjdC5Db21wb25lbnRUeXBlPFByb3BzVHlwZT4gPSAoe1xuICBhcHByb3ZlUGVuZGluZ01lbWJlcnNoaXAsXG4gIGNvbnZlcnNhdGlvbixcbiAgZ2V0UHJlZmVycmVkQmFkZ2UsXG4gIGkxOG4sXG4gIG91clV1aWQsXG4gIHBlbmRpbmdNZW1iZXJzaGlwcyxcbiAgcGVuZGluZ0FwcHJvdmFsTWVtYmVyc2hpcHMsXG4gIHJldm9rZVBlbmRpbmdNZW1iZXJzaGlwcyxcbiAgdGhlbWUsXG59KSA9PiB7XG4gIGlmICghY29udmVyc2F0aW9uIHx8ICFvdXJVdWlkKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgJ1BlbmRpbmdJbnZpdGVzIHJlbmRlcmVkIHdpdGhvdXQgYSBjb252ZXJzYXRpb24gb3Igb3VyVXVpZCdcbiAgICApO1xuICB9XG5cbiAgY29uc3QgW3NlbGVjdGVkVGFiLCBzZXRTZWxlY3RlZFRhYl0gPSBSZWFjdC51c2VTdGF0ZShUYWIuUmVxdWVzdHMpO1xuICBjb25zdCBbc3RhZ2VkTWVtYmVyc2hpcHMsIHNldFN0YWdlZE1lbWJlcnNoaXBzXSA9XG4gICAgUmVhY3QudXNlU3RhdGU8QXJyYXk8U3RhZ2VkTWVtYmVyc2hpcFR5cGU+IHwgbnVsbD4obnVsbCk7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnZlcnNhdGlvbi1kZXRhaWxzLXBhbmVsXCI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIkNvbnZlcnNhdGlvbkRldGFpbHNfX3RhYnNcIj5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyh7XG4gICAgICAgICAgICBDb252ZXJzYXRpb25EZXRhaWxzX190YWI6IHRydWUsXG4gICAgICAgICAgICAnQ29udmVyc2F0aW9uRGV0YWlsc19fdGFiLS1zZWxlY3RlZCc6IHNlbGVjdGVkVGFiID09PSBUYWIuUmVxdWVzdHMsXG4gICAgICAgICAgfSl9XG4gICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgc2V0U2VsZWN0ZWRUYWIoVGFiLlJlcXVlc3RzKTtcbiAgICAgICAgICB9fVxuICAgICAgICAgIG9uS2V5VXA9eyhlOiBSZWFjdC5LZXlib2FyZEV2ZW50KSA9PiB7XG4gICAgICAgICAgICBpZiAoZS50YXJnZXQgPT09IGUuY3VycmVudFRhcmdldCAmJiBlLmtleUNvZGUgPT09IDEzKSB7XG4gICAgICAgICAgICAgIHNldFNlbGVjdGVkVGFiKFRhYi5SZXF1ZXN0cyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfX1cbiAgICAgICAgICByb2xlPVwidGFiXCJcbiAgICAgICAgICB0YWJJbmRleD17MH1cbiAgICAgICAgPlxuICAgICAgICAgIHtpMThuKCdQZW5kaW5nSW52aXRlcy0tdGFiLXJlcXVlc3RzJywge1xuICAgICAgICAgICAgY291bnQ6IFN0cmluZyhwZW5kaW5nQXBwcm92YWxNZW1iZXJzaGlwcy5sZW5ndGgpLFxuICAgICAgICAgIH0pfVxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKHtcbiAgICAgICAgICAgIENvbnZlcnNhdGlvbkRldGFpbHNfX3RhYjogdHJ1ZSxcbiAgICAgICAgICAgICdDb252ZXJzYXRpb25EZXRhaWxzX190YWItLXNlbGVjdGVkJzogc2VsZWN0ZWRUYWIgPT09IFRhYi5QZW5kaW5nLFxuICAgICAgICAgIH0pfVxuICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgIHNldFNlbGVjdGVkVGFiKFRhYi5QZW5kaW5nKTtcbiAgICAgICAgICB9fVxuICAgICAgICAgIG9uS2V5VXA9eyhlOiBSZWFjdC5LZXlib2FyZEV2ZW50KSA9PiB7XG4gICAgICAgICAgICBpZiAoZS50YXJnZXQgPT09IGUuY3VycmVudFRhcmdldCAmJiBlLmtleUNvZGUgPT09IDEzKSB7XG4gICAgICAgICAgICAgIHNldFNlbGVjdGVkVGFiKFRhYi5QZW5kaW5nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9fVxuICAgICAgICAgIHJvbGU9XCJ0YWJcIlxuICAgICAgICAgIHRhYkluZGV4PXswfVxuICAgICAgICA+XG4gICAgICAgICAge2kxOG4oJ1BlbmRpbmdJbnZpdGVzLS10YWItaW52aXRlcycsIHtcbiAgICAgICAgICAgIGNvdW50OiBTdHJpbmcocGVuZGluZ01lbWJlcnNoaXBzLmxlbmd0aCksXG4gICAgICAgICAgfSl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIHtzZWxlY3RlZFRhYiA9PT0gVGFiLlJlcXVlc3RzID8gKFxuICAgICAgICA8TWVtYmVyc1BlbmRpbmdBZG1pbkFwcHJvdmFsXG4gICAgICAgICAgY29udmVyc2F0aW9uPXtjb252ZXJzYXRpb259XG4gICAgICAgICAgZ2V0UHJlZmVycmVkQmFkZ2U9e2dldFByZWZlcnJlZEJhZGdlfVxuICAgICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgICAgbWVtYmVyc2hpcHM9e3BlbmRpbmdBcHByb3ZhbE1lbWJlcnNoaXBzfVxuICAgICAgICAgIHNldFN0YWdlZE1lbWJlcnNoaXBzPXtzZXRTdGFnZWRNZW1iZXJzaGlwc31cbiAgICAgICAgICB0aGVtZT17dGhlbWV9XG4gICAgICAgIC8+XG4gICAgICApIDogbnVsbH1cbiAgICAgIHtzZWxlY3RlZFRhYiA9PT0gVGFiLlBlbmRpbmcgPyAoXG4gICAgICAgIDxNZW1iZXJzUGVuZGluZ1Byb2ZpbGVLZXlcbiAgICAgICAgICBjb252ZXJzYXRpb249e2NvbnZlcnNhdGlvbn1cbiAgICAgICAgICBnZXRQcmVmZXJyZWRCYWRnZT17Z2V0UHJlZmVycmVkQmFkZ2V9XG4gICAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgICBtZW1iZXJzPXtjb252ZXJzYXRpb24uc29ydGVkR3JvdXBNZW1iZXJzIHx8IFtdfVxuICAgICAgICAgIG1lbWJlcnNoaXBzPXtwZW5kaW5nTWVtYmVyc2hpcHN9XG4gICAgICAgICAgb3VyVXVpZD17b3VyVXVpZH1cbiAgICAgICAgICBzZXRTdGFnZWRNZW1iZXJzaGlwcz17c2V0U3RhZ2VkTWVtYmVyc2hpcHN9XG4gICAgICAgICAgdGhlbWU9e3RoZW1lfVxuICAgICAgICAvPlxuICAgICAgKSA6IG51bGx9XG5cbiAgICAgIHtzdGFnZWRNZW1iZXJzaGlwcyAmJiBzdGFnZWRNZW1iZXJzaGlwcy5sZW5ndGggJiYgKFxuICAgICAgICA8TWVtYmVyc2hpcEFjdGlvbkNvbmZpcm1hdGlvblxuICAgICAgICAgIGFwcHJvdmVQZW5kaW5nTWVtYmVyc2hpcD17YXBwcm92ZVBlbmRpbmdNZW1iZXJzaGlwfVxuICAgICAgICAgIGNvbnZlcnNhdGlvbj17Y29udmVyc2F0aW9ufVxuICAgICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgICAgbWVtYmVycz17Y29udmVyc2F0aW9uLnNvcnRlZEdyb3VwTWVtYmVycyB8fCBbXX1cbiAgICAgICAgICBvbkNsb3NlPXsoKSA9PiBzZXRTdGFnZWRNZW1iZXJzaGlwcyhudWxsKX1cbiAgICAgICAgICBvdXJVdWlkPXtvdXJVdWlkfVxuICAgICAgICAgIHJldm9rZVBlbmRpbmdNZW1iZXJzaGlwcz17cmV2b2tlUGVuZGluZ01lbWJlcnNoaXBzfVxuICAgICAgICAgIHN0YWdlZE1lbWJlcnNoaXBzPXtzdGFnZWRNZW1iZXJzaGlwc31cbiAgICAgICAgLz5cbiAgICAgICl9XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5mdW5jdGlvbiBNZW1iZXJzaGlwQWN0aW9uQ29uZmlybWF0aW9uKHtcbiAgYXBwcm92ZVBlbmRpbmdNZW1iZXJzaGlwLFxuICBjb252ZXJzYXRpb24sXG4gIGkxOG4sXG4gIG1lbWJlcnMsXG4gIG9uQ2xvc2UsXG4gIG91clV1aWQsXG4gIHJldm9rZVBlbmRpbmdNZW1iZXJzaGlwcyxcbiAgc3RhZ2VkTWVtYmVyc2hpcHMsXG59OiB7XG4gIGFwcHJvdmVQZW5kaW5nTWVtYmVyc2hpcDogKGNvbnZlcnNhdGlvbklkOiBzdHJpbmcpID0+IHZvaWQ7XG4gIGNvbnZlcnNhdGlvbjogQ29udmVyc2F0aW9uVHlwZTtcbiAgaTE4bjogTG9jYWxpemVyVHlwZTtcbiAgbWVtYmVyczogQXJyYXk8Q29udmVyc2F0aW9uVHlwZT47XG4gIG9uQ2xvc2U6ICgpID0+IHZvaWQ7XG4gIG91clV1aWQ6IHN0cmluZztcbiAgcmV2b2tlUGVuZGluZ01lbWJlcnNoaXBzOiAoY29udmVyc2F0aW9uSWRzOiBBcnJheTxzdHJpbmc+KSA9PiB2b2lkO1xuICBzdGFnZWRNZW1iZXJzaGlwczogQXJyYXk8U3RhZ2VkTWVtYmVyc2hpcFR5cGU+O1xufSkge1xuICBjb25zdCByZXZva2VTdGFnZWRNZW1iZXJzaGlwcyA9ICgpID0+IHtcbiAgICBpZiAoIXN0YWdlZE1lbWJlcnNoaXBzKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHJldm9rZVBlbmRpbmdNZW1iZXJzaGlwcyhcbiAgICAgIHN0YWdlZE1lbWJlcnNoaXBzLm1hcCgoeyBtZW1iZXJzaGlwIH0pID0+IG1lbWJlcnNoaXAubWVtYmVyLmlkKVxuICAgICk7XG4gIH07XG5cbiAgY29uc3QgYXBwcm92ZVN0YWdlZE1lbWJlcnNoaXAgPSAoKSA9PiB7XG4gICAgaWYgKCFzdGFnZWRNZW1iZXJzaGlwcykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBhcHByb3ZlUGVuZGluZ01lbWJlcnNoaXAoc3RhZ2VkTWVtYmVyc2hpcHNbMF0ubWVtYmVyc2hpcC5tZW1iZXIuaWQpO1xuICB9O1xuXG4gIGNvbnN0IG1lbWJlcnNoaXBUeXBlID0gc3RhZ2VkTWVtYmVyc2hpcHNbMF0udHlwZTtcblxuICBjb25zdCBtb2RhbEFjdGlvbiA9XG4gICAgbWVtYmVyc2hpcFR5cGUgPT09IFN0YWdlVHlwZS5BUFBST1ZFX1JFUVVFU1RcbiAgICAgID8gYXBwcm92ZVN0YWdlZE1lbWJlcnNoaXBcbiAgICAgIDogcmV2b2tlU3RhZ2VkTWVtYmVyc2hpcHM7XG5cbiAgbGV0IG1vZGFsQWN0aW9uVGV4dCA9IGkxOG4oJ1BlbmRpbmdJbnZpdGVzLS1yZXZva2UnKTtcblxuICBpZiAobWVtYmVyc2hpcFR5cGUgPT09IFN0YWdlVHlwZS5BUFBST1ZFX1JFUVVFU1QpIHtcbiAgICBtb2RhbEFjdGlvblRleHQgPSBpMThuKCdQZW5kaW5nUmVxdWVzdHMtLWFwcHJvdmUnKTtcbiAgfSBlbHNlIGlmIChtZW1iZXJzaGlwVHlwZSA9PT0gU3RhZ2VUeXBlLkRFTllfUkVRVUVTVCkge1xuICAgIG1vZGFsQWN0aW9uVGV4dCA9IGkxOG4oJ1BlbmRpbmdSZXF1ZXN0cy0tZGVueScpO1xuICB9IGVsc2UgaWYgKG1lbWJlcnNoaXBUeXBlID09PSBTdGFnZVR5cGUuUkVWT0tFX0lOVklURSkge1xuICAgIG1vZGFsQWN0aW9uVGV4dCA9IGkxOG4oJ1BlbmRpbmdJbnZpdGVzLS1yZXZva2UnKTtcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPENvbmZpcm1hdGlvbkRpYWxvZ1xuICAgICAgYWN0aW9ucz17W1xuICAgICAgICB7XG4gICAgICAgICAgYWN0aW9uOiBtb2RhbEFjdGlvbixcbiAgICAgICAgICBzdHlsZTogJ2FmZmlybWF0aXZlJyxcbiAgICAgICAgICB0ZXh0OiBtb2RhbEFjdGlvblRleHQsXG4gICAgICAgIH0sXG4gICAgICBdfVxuICAgICAgaTE4bj17aTE4bn1cbiAgICAgIG9uQ2xvc2U9e29uQ2xvc2V9XG4gICAgPlxuICAgICAge2dldENvbmZpcm1hdGlvbk1lc3NhZ2Uoe1xuICAgICAgICBjb252ZXJzYXRpb24sXG4gICAgICAgIGkxOG4sXG4gICAgICAgIG1lbWJlcnMsXG4gICAgICAgIG91clV1aWQsXG4gICAgICAgIHN0YWdlZE1lbWJlcnNoaXBzLFxuICAgICAgfSl9XG4gICAgPC9Db25maXJtYXRpb25EaWFsb2c+XG4gICk7XG59XG5cbmZ1bmN0aW9uIGdldENvbmZpcm1hdGlvbk1lc3NhZ2Uoe1xuICBjb252ZXJzYXRpb24sXG4gIGkxOG4sXG4gIG1lbWJlcnMsXG4gIG91clV1aWQsXG4gIHN0YWdlZE1lbWJlcnNoaXBzLFxufTogUmVhZG9ubHk8e1xuICBjb252ZXJzYXRpb246IENvbnZlcnNhdGlvblR5cGU7XG4gIGkxOG46IExvY2FsaXplclR5cGU7XG4gIG1lbWJlcnM6IFJlYWRvbmx5QXJyYXk8Q29udmVyc2F0aW9uVHlwZT47XG4gIG91clV1aWQ6IHN0cmluZztcbiAgc3RhZ2VkTWVtYmVyc2hpcHM6IFJlYWRvbmx5QXJyYXk8U3RhZ2VkTWVtYmVyc2hpcFR5cGU+O1xufT4pOiBzdHJpbmcge1xuICBpZiAoIXN0YWdlZE1lbWJlcnNoaXBzIHx8ICFzdGFnZWRNZW1iZXJzaGlwcy5sZW5ndGgpIHtcbiAgICByZXR1cm4gJyc7XG4gIH1cblxuICBjb25zdCBtZW1iZXJzaGlwVHlwZSA9IHN0YWdlZE1lbWJlcnNoaXBzWzBdLnR5cGU7XG4gIGNvbnN0IGZpcnN0TWVtYmVyc2hpcCA9IHN0YWdlZE1lbWJlcnNoaXBzWzBdLm1lbWJlcnNoaXA7XG5cbiAgLy8gUmVxdWVzdGluZyBhIG1lbWJlcnNoaXAgc2luY2UgdGhleSB3ZXJlbid0IGFkZGVkIGJ5IGFueW9uZVxuICBpZiAobWVtYmVyc2hpcFR5cGUgPT09IFN0YWdlVHlwZS5ERU5ZX1JFUVVFU1QpIHtcbiAgICBjb25zdCBrZXkgPSBpc0FjY2Vzc0NvbnRyb2xFbmFibGVkKFxuICAgICAgY29udmVyc2F0aW9uLmFjY2Vzc0NvbnRyb2xBZGRGcm9tSW52aXRlTGlua1xuICAgIClcbiAgICAgID8gJ1BlbmRpbmdSZXF1ZXN0cy0tZGVueS1mb3ItLXdpdGgtbGluaydcbiAgICAgIDogJ1BlbmRpbmdSZXF1ZXN0cy0tZGVueS1mb3InO1xuICAgIHJldHVybiBpMThuKGtleSwge1xuICAgICAgbmFtZTogZmlyc3RNZW1iZXJzaGlwLm1lbWJlci50aXRsZSxcbiAgICB9KTtcbiAgfVxuXG4gIGlmIChtZW1iZXJzaGlwVHlwZSA9PT0gU3RhZ2VUeXBlLkFQUFJPVkVfUkVRVUVTVCkge1xuICAgIHJldHVybiBpMThuKCdQZW5kaW5nUmVxdWVzdHMtLWFwcHJvdmUtZm9yJywge1xuICAgICAgbmFtZTogZmlyc3RNZW1iZXJzaGlwLm1lbWJlci50aXRsZSxcbiAgICB9KTtcbiAgfVxuXG4gIGlmIChtZW1iZXJzaGlwVHlwZSAhPT0gU3RhZ2VUeXBlLlJFVk9LRV9JTlZJVEUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2dldENvbmZpcm1hdGlvbk1lc3NhZ2U6IEludmFsaWQgc3RhZ2luZyB0eXBlJyk7XG4gIH1cblxuICBjb25zdCBmaXJzdFBlbmRpbmdNZW1iZXJzaGlwID0gZmlyc3RNZW1iZXJzaGlwIGFzIEdyb3VwVjJQZW5kaW5nTWVtYmVyc2hpcDtcblxuICAvLyBQZW5kaW5nIGludml0ZVxuICBjb25zdCBpbnZpdGVkQnlVcyA9IGZpcnN0UGVuZGluZ01lbWJlcnNoaXAubWV0YWRhdGEuYWRkZWRCeVVzZXJJZCA9PT0gb3VyVXVpZDtcblxuICBpZiAoaW52aXRlZEJ5VXMpIHtcbiAgICByZXR1cm4gaTE4bignUGVuZGluZ0ludml0ZXMtLXJldm9rZS1mb3InLCB7XG4gICAgICBuYW1lOiBmaXJzdFBlbmRpbmdNZW1iZXJzaGlwLm1lbWJlci50aXRsZSxcbiAgICB9KTtcbiAgfVxuXG4gIGNvbnN0IGludml0ZXIgPSBtZW1iZXJzLmZpbmQoXG4gICAgKHsgaWQgfSkgPT4gaWQgPT09IGZpcnN0UGVuZGluZ01lbWJlcnNoaXAubWV0YWRhdGEuYWRkZWRCeVVzZXJJZFxuICApO1xuXG4gIGlmIChpbnZpdGVyID09PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gJyc7XG4gIH1cblxuICBjb25zdCBuYW1lID0gaW52aXRlci50aXRsZTtcblxuICBpZiAoc3RhZ2VkTWVtYmVyc2hpcHMubGVuZ3RoID09PSAxKSB7XG4gICAgcmV0dXJuIGkxOG4oJ1BlbmRpbmdJbnZpdGVzLS1yZXZva2UtZnJvbS1zaW5ndWxhcicsIHsgbmFtZSB9KTtcbiAgfVxuXG4gIHJldHVybiBpMThuKCdQZW5kaW5nSW52aXRlcy0tcmV2b2tlLWZyb20tcGx1cmFsJywge1xuICAgIG51bWJlcjogc3RhZ2VkTWVtYmVyc2hpcHMubGVuZ3RoLnRvU3RyaW5nKCksXG4gICAgbmFtZSxcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIE1lbWJlcnNQZW5kaW5nQWRtaW5BcHByb3ZhbCh7XG4gIGNvbnZlcnNhdGlvbixcbiAgZ2V0UHJlZmVycmVkQmFkZ2UsXG4gIGkxOG4sXG4gIG1lbWJlcnNoaXBzLFxuICBzZXRTdGFnZWRNZW1iZXJzaGlwcyxcbiAgdGhlbWUsXG59OiBSZWFkb25seTx7XG4gIGNvbnZlcnNhdGlvbjogQ29udmVyc2F0aW9uVHlwZTtcbiAgZ2V0UHJlZmVycmVkQmFkZ2U6IFByZWZlcnJlZEJhZGdlU2VsZWN0b3JUeXBlO1xuICBpMThuOiBMb2NhbGl6ZXJUeXBlO1xuICBtZW1iZXJzaGlwczogUmVhZG9ubHlBcnJheTxHcm91cFYyUmVxdWVzdGluZ01lbWJlcnNoaXA+O1xuICBzZXRTdGFnZWRNZW1iZXJzaGlwczogKHN0YWdlZE1lbWJlcnNoaXA6IEFycmF5PFN0YWdlZE1lbWJlcnNoaXBUeXBlPikgPT4gdm9pZDtcbiAgdGhlbWU6IFRoZW1lVHlwZTtcbn0+KSB7XG4gIHJldHVybiAoXG4gICAgPFBhbmVsU2VjdGlvbj5cbiAgICAgIHttZW1iZXJzaGlwcy5tYXAobWVtYmVyc2hpcCA9PiAoXG4gICAgICAgIDxQYW5lbFJvd1xuICAgICAgICAgIGFsd2F5c1Nob3dBY3Rpb25zXG4gICAgICAgICAga2V5PXttZW1iZXJzaGlwLm1lbWJlci5pZH1cbiAgICAgICAgICBpY29uPXtcbiAgICAgICAgICAgIDxBdmF0YXJcbiAgICAgICAgICAgICAgYmFkZ2U9e2dldFByZWZlcnJlZEJhZGdlKG1lbWJlcnNoaXAubWVtYmVyLmJhZGdlcyl9XG4gICAgICAgICAgICAgIGNvbnZlcnNhdGlvblR5cGU9XCJkaXJlY3RcIlxuICAgICAgICAgICAgICBzaXplPXszMn1cbiAgICAgICAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgICAgICAgdGhlbWU9e3RoZW1lfVxuICAgICAgICAgICAgICB7Li4ubWVtYmVyc2hpcC5tZW1iZXJ9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIH1cbiAgICAgICAgICBsYWJlbD17bWVtYmVyc2hpcC5tZW1iZXIudGl0bGV9XG4gICAgICAgICAgYWN0aW9ucz17XG4gICAgICAgICAgICBjb252ZXJzYXRpb24uYXJlV2VBZG1pbiA/IChcbiAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cIm1vZHVsZS1idXR0b25fX3NtYWxsIENvbnZlcnNhdGlvbkRldGFpbHNfX2FjdGlvbi1idXR0b25cIlxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBzZXRTdGFnZWRNZW1iZXJzaGlwcyhbXG4gICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogU3RhZ2VUeXBlLkRFTllfUkVRVUVTVCxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lbWJlcnNoaXAsXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIHtpMThuKCdkZWxldGUnKX1cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cIm1vZHVsZS1idXR0b25fX3NtYWxsIENvbnZlcnNhdGlvbkRldGFpbHNfX2FjdGlvbi1idXR0b25cIlxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBzZXRTdGFnZWRNZW1iZXJzaGlwcyhbXG4gICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogU3RhZ2VUeXBlLkFQUFJPVkVfUkVRVUVTVCxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lbWJlcnNoaXAsXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIHtpMThuKCdhY2NlcHQnKX1cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICApIDogbnVsbFxuICAgICAgICAgIH1cbiAgICAgICAgLz5cbiAgICAgICkpfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJDb252ZXJzYXRpb25EZXRhaWxzX19wZW5kaW5nLS1pbmZvXCI+XG4gICAgICAgIHtpMThuKCdQZW5kaW5nUmVxdWVzdHMtLWluZm8nLCBbY29udmVyc2F0aW9uLnRpdGxlXSl9XG4gICAgICA8L2Rpdj5cbiAgICA8L1BhbmVsU2VjdGlvbj5cbiAgKTtcbn1cblxuZnVuY3Rpb24gTWVtYmVyc1BlbmRpbmdQcm9maWxlS2V5KHtcbiAgY29udmVyc2F0aW9uLFxuICBpMThuLFxuICBtZW1iZXJzLFxuICBtZW1iZXJzaGlwcyxcbiAgb3VyVXVpZCxcbiAgc2V0U3RhZ2VkTWVtYmVyc2hpcHMsXG4gIGdldFByZWZlcnJlZEJhZGdlLFxuICB0aGVtZSxcbn06IFJlYWRvbmx5PHtcbiAgY29udmVyc2F0aW9uOiBDb252ZXJzYXRpb25UeXBlO1xuICBnZXRQcmVmZXJyZWRCYWRnZTogUHJlZmVycmVkQmFkZ2VTZWxlY3RvclR5cGU7XG4gIGkxOG46IExvY2FsaXplclR5cGU7XG4gIG1lbWJlcnM6IEFycmF5PENvbnZlcnNhdGlvblR5cGU+O1xuICBtZW1iZXJzaGlwczogUmVhZG9ubHlBcnJheTxHcm91cFYyUGVuZGluZ01lbWJlcnNoaXA+O1xuICBvdXJVdWlkOiBzdHJpbmc7XG4gIHNldFN0YWdlZE1lbWJlcnNoaXBzOiAoc3RhZ2VkTWVtYmVyc2hpcDogQXJyYXk8U3RhZ2VkTWVtYmVyc2hpcFR5cGU+KSA9PiB2b2lkO1xuICB0aGVtZTogVGhlbWVUeXBlO1xufT4pIHtcbiAgY29uc3QgZ3JvdXBlZFBlbmRpbmdNZW1iZXJzaGlwcyA9IF8uZ3JvdXBCeShcbiAgICBtZW1iZXJzaGlwcyxcbiAgICBtZW1iZXJzaGlwID0+IG1lbWJlcnNoaXAubWV0YWRhdGEuYWRkZWRCeVVzZXJJZFxuICApO1xuXG4gIGNvbnN0IHsgW291clV1aWRdOiBvdXJQZW5kaW5nTWVtYmVyc2hpcHMsIC4uLm90aGVyUGVuZGluZ01lbWJlcnNoaXBHcm91cHMgfSA9XG4gICAgZ3JvdXBlZFBlbmRpbmdNZW1iZXJzaGlwcztcblxuICBjb25zdCBvdGhlclBlbmRpbmdNZW1iZXJzaGlwcyA9IE9iamVjdC5rZXlzKG90aGVyUGVuZGluZ01lbWJlcnNoaXBHcm91cHMpXG4gICAgLm1hcChpZCA9PiBtZW1iZXJzLmZpbmQobWVtYmVyID0+IG1lbWJlci5pZCA9PT0gaWQpKVxuICAgIC5maWx0ZXIoKG1lbWJlcik6IG1lbWJlciBpcyBDb252ZXJzYXRpb25UeXBlID0+IG1lbWJlciAhPT0gdW5kZWZpbmVkKVxuICAgIC5tYXAobWVtYmVyID0+ICh7XG4gICAgICBtZW1iZXIsXG4gICAgICBwZW5kaW5nTWVtYmVyc2hpcHM6IG90aGVyUGVuZGluZ01lbWJlcnNoaXBHcm91cHNbbWVtYmVyLmlkXSxcbiAgICB9KSk7XG5cbiAgcmV0dXJuIChcbiAgICA8UGFuZWxTZWN0aW9uPlxuICAgICAge291clBlbmRpbmdNZW1iZXJzaGlwcyAmJiAoXG4gICAgICAgIDxQYW5lbFNlY3Rpb24gdGl0bGU9e2kxOG4oJ1BlbmRpbmdJbnZpdGVzLS1pbnZpdGVkLWJ5LXlvdScpfT5cbiAgICAgICAgICB7b3VyUGVuZGluZ01lbWJlcnNoaXBzLm1hcChtZW1iZXJzaGlwID0+IChcbiAgICAgICAgICAgIDxQYW5lbFJvd1xuICAgICAgICAgICAgICBrZXk9e21lbWJlcnNoaXAubWVtYmVyLmlkfVxuICAgICAgICAgICAgICBpY29uPXtcbiAgICAgICAgICAgICAgICA8QXZhdGFyXG4gICAgICAgICAgICAgICAgICBiYWRnZT17Z2V0UHJlZmVycmVkQmFkZ2UobWVtYmVyc2hpcC5tZW1iZXIuYmFkZ2VzKX1cbiAgICAgICAgICAgICAgICAgIGNvbnZlcnNhdGlvblR5cGU9XCJkaXJlY3RcIlxuICAgICAgICAgICAgICAgICAgc2l6ZT17MzJ9XG4gICAgICAgICAgICAgICAgICBpMThuPXtpMThufVxuICAgICAgICAgICAgICAgICAgdGhlbWU9e3RoZW1lfVxuICAgICAgICAgICAgICAgICAgey4uLm1lbWJlcnNoaXAubWVtYmVyfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgbGFiZWw9e21lbWJlcnNoaXAubWVtYmVyLnRpdGxlfVxuICAgICAgICAgICAgICBhY3Rpb25zPXtcbiAgICAgICAgICAgICAgICBjb252ZXJzYXRpb24uYXJlV2VBZG1pbiA/IChcbiAgICAgICAgICAgICAgICAgIDxDb252ZXJzYXRpb25EZXRhaWxzSWNvblxuICAgICAgICAgICAgICAgICAgICBhcmlhTGFiZWw9e2kxOG4oJ1BlbmRpbmdJbnZpdGVzLS1yZXZva2UtZm9yLWxhYmVsJyl9XG4gICAgICAgICAgICAgICAgICAgIGljb249e0ljb25UeXBlLnRyYXNofVxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgc2V0U3RhZ2VkTWVtYmVyc2hpcHMoW1xuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBTdGFnZVR5cGUuUkVWT0tFX0lOVklURSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbWVtYmVyc2hpcCxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICkgOiBudWxsXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKSl9XG4gICAgICAgIDwvUGFuZWxTZWN0aW9uPlxuICAgICAgKX1cbiAgICAgIHtvdGhlclBlbmRpbmdNZW1iZXJzaGlwcy5sZW5ndGggPiAwICYmIChcbiAgICAgICAgPFBhbmVsU2VjdGlvbiB0aXRsZT17aTE4bignUGVuZGluZ0ludml0ZXMtLWludml0ZWQtYnktb3RoZXJzJyl9PlxuICAgICAgICAgIHtvdGhlclBlbmRpbmdNZW1iZXJzaGlwcy5tYXAoKHsgbWVtYmVyLCBwZW5kaW5nTWVtYmVyc2hpcHMgfSkgPT4gKFxuICAgICAgICAgICAgPFBhbmVsUm93XG4gICAgICAgICAgICAgIGtleT17bWVtYmVyLmlkfVxuICAgICAgICAgICAgICBpY29uPXtcbiAgICAgICAgICAgICAgICA8QXZhdGFyXG4gICAgICAgICAgICAgICAgICBiYWRnZT17Z2V0UHJlZmVycmVkQmFkZ2UobWVtYmVyLmJhZGdlcyl9XG4gICAgICAgICAgICAgICAgICBjb252ZXJzYXRpb25UeXBlPVwiZGlyZWN0XCJcbiAgICAgICAgICAgICAgICAgIHNpemU9ezMyfVxuICAgICAgICAgICAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgICAgICAgICAgIHRoZW1lPXt0aGVtZX1cbiAgICAgICAgICAgICAgICAgIHsuLi5tZW1iZXJ9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBsYWJlbD17bWVtYmVyLnRpdGxlfVxuICAgICAgICAgICAgICByaWdodD17aTE4bignUGVuZGluZ0ludml0ZXMtLWludml0ZWQtY291bnQnLCBbXG4gICAgICAgICAgICAgICAgcGVuZGluZ01lbWJlcnNoaXBzLmxlbmd0aC50b1N0cmluZygpLFxuICAgICAgICAgICAgICBdKX1cbiAgICAgICAgICAgICAgYWN0aW9ucz17XG4gICAgICAgICAgICAgICAgY29udmVyc2F0aW9uLmFyZVdlQWRtaW4gPyAoXG4gICAgICAgICAgICAgICAgICA8Q29udmVyc2F0aW9uRGV0YWlsc0ljb25cbiAgICAgICAgICAgICAgICAgICAgYXJpYUxhYmVsPXtpMThuKCdQZW5kaW5nSW52aXRlcy0tcmV2b2tlLWZvci1sYWJlbCcpfVxuICAgICAgICAgICAgICAgICAgICBpY29uPXtJY29uVHlwZS50cmFzaH1cbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIHNldFN0YWdlZE1lbWJlcnNoaXBzKFxuICAgICAgICAgICAgICAgICAgICAgICAgcGVuZGluZ01lbWJlcnNoaXBzLm1hcChtZW1iZXJzaGlwID0+ICh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFN0YWdlVHlwZS5SRVZPS0VfSU5WSVRFLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBtZW1iZXJzaGlwLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSkpXG4gICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgKSA6IG51bGxcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApKX1cbiAgICAgICAgPC9QYW5lbFNlY3Rpb24+XG4gICAgICApfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJDb252ZXJzYXRpb25EZXRhaWxzX19wZW5kaW5nLS1pbmZvXCI+XG4gICAgICAgIHtpMThuKCdQZW5kaW5nSW52aXRlcy0taW5mbycpfVxuICAgICAgPC9kaXY+XG4gICAgPC9QYW5lbFNlY3Rpb24+XG4gICk7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsbUJBQWtCO0FBQ2xCLHdCQUF1QjtBQUN2QixvQkFBYztBQU1kLG9CQUF1QjtBQUN2QixnQ0FBbUM7QUFDbkMsMEJBQTZCO0FBQzdCLHNCQUF5QjtBQUN6QixxQ0FBa0Q7QUFDbEQsa0JBQXVDO0FBeUJ2QyxJQUFLLE1BQUwsa0JBQUssU0FBTDtBQUNFLHFCQUFXO0FBQ1gsb0JBQVU7QUFGUDtBQUFBO0FBS0wsSUFBSyxZQUFMLGtCQUFLLGVBQUw7QUFDRSxrQ0FBa0I7QUFDbEIsK0JBQWU7QUFDZixnQ0FBZ0I7QUFIYjtBQUFBO0FBV0UsTUFBTSxpQkFBaUQsd0JBQUM7QUFBQSxFQUM3RDtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsTUFDSTtBQUNKLE1BQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTO0FBQzdCLFVBQU0sSUFBSSxNQUNSLDJEQUNGO0FBQUEsRUFDRjtBQUVBLFFBQU0sQ0FBQyxhQUFhLGtCQUFrQixxQkFBTSxTQUFTLHlCQUFZO0FBQ2pFLFFBQU0sQ0FBQyxtQkFBbUIsd0JBQ3hCLHFCQUFNLFNBQTZDLElBQUk7QUFFekQsU0FDRSxtREFBQztBQUFBLElBQUksV0FBVTtBQUFBLEtBQ2IsbURBQUM7QUFBQSxJQUFJLFdBQVU7QUFBQSxLQUNiLG1EQUFDO0FBQUEsSUFDQyxXQUFXLCtCQUFXO0FBQUEsTUFDcEIsMEJBQTBCO0FBQUEsTUFDMUIsc0NBQXNDLGdCQUFnQjtBQUFBLElBQ3hELENBQUM7QUFBQSxJQUNELFNB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
