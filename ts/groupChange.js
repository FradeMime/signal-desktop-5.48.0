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
var groupChange_exports = {};
__export(groupChange_exports, {
  renderChange: () => renderChange,
  renderChangeDetail: () => renderChangeDetail
});
module.exports = __toCommonJS(groupChange_exports);
var import_missingCaseError = require("./util/missingCaseError");
var import_protobuf = require("./protobuf");
var log = __toESM(require("./logging/log"));
const AccessControlEnum = import_protobuf.SignalService.AccessControl.AccessRequired;
const RoleEnum = import_protobuf.SignalService.Member.Role;
function renderChange(change, options) {
  const { details, from } = change;
  return details.flatMap((detail) => {
    const texts = renderChangeDetail(detail, {
      ...options,
      from
    });
    if (!Array.isArray(texts)) {
      return { detail, isLastText: true, text: texts };
    }
    return texts.map((text, index) => {
      const isLastText = index === texts.length - 1;
      return { detail, isLastText, text };
    });
  });
}
function renderChangeDetail(detail, options) {
  const { from, i18n, ourUuid, renderContact, renderString } = options;
  const fromYou = Boolean(from && ourUuid && from === ourUuid);
  if (detail.type === "create") {
    if (fromYou) {
      return renderString("GroupV2--create--you", i18n);
    }
    if (from) {
      return renderString("GroupV2--create--other", i18n, {
        memberName: renderContact(from)
      });
    }
    return renderString("GroupV2--create--unknown", i18n);
  }
  if (detail.type === "title") {
    const { newTitle } = detail;
    if (newTitle) {
      if (fromYou) {
        return renderString("GroupV2--title--change--you", i18n, [newTitle]);
      }
      if (from) {
        return renderString("GroupV2--title--change--other", i18n, {
          memberName: renderContact(from),
          newTitle
        });
      }
      return renderString("GroupV2--title--change--unknown", i18n, [newTitle]);
    }
    if (fromYou) {
      return renderString("GroupV2--title--remove--you", i18n);
    }
    if (from) {
      return renderString("GroupV2--title--remove--other", i18n, [
        renderContact(from)
      ]);
    }
    return renderString("GroupV2--title--remove--unknown", i18n);
  }
  if (detail.type === "avatar") {
    if (detail.removed) {
      if (fromYou) {
        return renderString("GroupV2--avatar--remove--you", i18n);
      }
      if (from) {
        return renderString("GroupV2--avatar--remove--other", i18n, [
          renderContact(from)
        ]);
      }
      return renderString("GroupV2--avatar--remove--unknown", i18n);
    }
    if (fromYou) {
      return renderString("GroupV2--avatar--change--you", i18n);
    }
    if (from) {
      return renderString("GroupV2--avatar--change--other", i18n, [
        renderContact(from)
      ]);
    }
    return renderString("GroupV2--avatar--change--unknown", i18n);
  }
  if (detail.type === "access-attributes") {
    const { newPrivilege } = detail;
    if (newPrivilege === AccessControlEnum.ADMINISTRATOR) {
      if (fromYou) {
        return renderString("GroupV2--access-attributes--admins--you", i18n);
      }
      if (from) {
        return renderString("GroupV2--access-attributes--admins--other", i18n, [
          renderContact(from)
        ]);
      }
      return renderString("GroupV2--access-attributes--admins--unknown", i18n);
    }
    if (newPrivilege === AccessControlEnum.MEMBER) {
      if (fromYou) {
        return renderString("GroupV2--access-attributes--all--you", i18n);
      }
      if (from) {
        return renderString("GroupV2--access-attributes--all--other", i18n, [
          renderContact(from)
        ]);
      }
      return renderString("GroupV2--access-attributes--all--unknown", i18n);
    }
    log.warn(`access-attributes change type, privilege ${newPrivilege} is unknown`);
    return "";
  }
  if (detail.type === "access-members") {
    const { newPrivilege } = detail;
    if (newPrivilege === AccessControlEnum.ADMINISTRATOR) {
      if (fromYou) {
        return renderString("GroupV2--access-members--admins--you", i18n);
      }
      if (from) {
        return renderString("GroupV2--access-members--admins--other", i18n, [
          renderContact(from)
        ]);
      }
      return renderString("GroupV2--access-members--admins--unknown", i18n);
    }
    if (newPrivilege === AccessControlEnum.MEMBER) {
      if (fromYou) {
        return renderString("GroupV2--access-members--all--you", i18n);
      }
      if (from) {
        return renderString("GroupV2--access-members--all--other", i18n, [
          renderContact(from)
        ]);
      }
      return renderString("GroupV2--access-members--all--unknown", i18n);
    }
    log.warn(`access-members change type, privilege ${newPrivilege} is unknown`);
    return "";
  }
  if (detail.type === "access-invite-link") {
    const { newPrivilege } = detail;
    if (newPrivilege === AccessControlEnum.ADMINISTRATOR) {
      if (fromYou) {
        return renderString("GroupV2--access-invite-link--enabled--you", i18n);
      }
      if (from) {
        return renderString("GroupV2--access-invite-link--enabled--other", i18n, [renderContact(from)]);
      }
      return renderString("GroupV2--access-invite-link--enabled--unknown", i18n);
    }
    if (newPrivilege === AccessControlEnum.ANY) {
      if (fromYou) {
        return renderString("GroupV2--access-invite-link--disabled--you", i18n);
      }
      if (from) {
        return renderString("GroupV2--access-invite-link--disabled--other", i18n, [renderContact(from)]);
      }
      return renderString("GroupV2--access-invite-link--disabled--unknown", i18n);
    }
    log.warn(`access-invite-link change type, privilege ${newPrivilege} is unknown`);
    return "";
  }
  if (detail.type === "member-add") {
    const { uuid } = detail;
    const weAreJoiner = Boolean(ourUuid && uuid === ourUuid);
    if (weAreJoiner) {
      if (fromYou) {
        return renderString("GroupV2--member-add--you--you", i18n);
      }
      if (from) {
        return renderString("GroupV2--member-add--you--other", i18n, [
          renderContact(from)
        ]);
      }
      return renderString("GroupV2--member-add--you--unknown", i18n);
    }
    if (fromYou) {
      return renderString("GroupV2--member-add--other--you", i18n, [
        renderContact(uuid)
      ]);
    }
    if (from) {
      return renderString("GroupV2--member-add--other--other", i18n, {
        adderName: renderContact(from),
        addeeName: renderContact(uuid)
      });
    }
    return renderString("GroupV2--member-add--other--unknown", i18n, [
      renderContact(uuid)
    ]);
  }
  if (detail.type === "member-add-from-invite") {
    const { uuid, inviter } = detail;
    const weAreJoiner = Boolean(ourUuid && uuid === ourUuid);
    const weAreInviter = Boolean(inviter && ourUuid && inviter === ourUuid);
    if (!from || from !== uuid) {
      if (weAreJoiner) {
        if (from) {
          return renderString("GroupV2--member-add--you--other", i18n, [
            renderContact(from)
          ]);
        }
        return renderString("GroupV2--member-add--you--unknown", i18n);
      }
      if (fromYou) {
        return renderString("GroupV2--member-add--invited--you", i18n, {
          inviteeName: renderContact(uuid)
        });
      }
      if (from) {
        return renderString("GroupV2--member-add--invited--other", i18n, {
          memberName: renderContact(from),
          inviteeName: renderContact(uuid)
        });
      }
      return renderString("GroupV2--member-add--invited--unknown", i18n, {
        inviteeName: renderContact(uuid)
      });
    }
    if (weAreJoiner) {
      if (inviter) {
        return renderString("GroupV2--member-add--from-invite--you", i18n, [
          renderContact(inviter)
        ]);
      }
      return renderString("GroupV2--member-add--from-invite--you-no-from", i18n);
    }
    if (weAreInviter) {
      return renderString("GroupV2--member-add--from-invite--from-you", i18n, [
        renderContact(uuid)
      ]);
    }
    if (inviter) {
      return renderString("GroupV2--member-add--from-invite--other", i18n, {
        inviteeName: renderContact(uuid),
        inviterName: renderContact(inviter)
      });
    }
    return renderString("GroupV2--member-add--from-invite--other-no-from", i18n, {
      inviteeName: renderContact(uuid)
    });
  }
  if (detail.type === "member-add-from-link") {
    const { uuid } = detail;
    if (fromYou && ourUuid && uuid === ourUuid) {
      return renderString("GroupV2--member-add-from-link--you--you", i18n);
    }
    if (from && uuid === from) {
      return renderString("GroupV2--member-add-from-link--other", i18n, [
        renderContact(from)
      ]);
    }
    log.warn("member-add-from-link change type; we have no from!");
    return renderString("GroupV2--member-add--other--unknown", i18n, [
      renderContact(uuid)
    ]);
  }
  if (detail.type === "member-add-from-admin-approval") {
    const { uuid } = detail;
    const weAreJoiner = Boolean(ourUuid && uuid === ourUuid);
    if (weAreJoiner) {
      if (from) {
        return renderString("GroupV2--member-add-from-admin-approval--you--other", i18n, [renderContact(from)]);
      }
      log.warn("member-add-from-admin-approval change type; we have no from, and we are joiner!");
      return renderString("GroupV2--member-add-from-admin-approval--you--unknown", i18n);
    }
    if (fromYou) {
      return renderString("GroupV2--member-add-from-admin-approval--other--you", i18n, [renderContact(uuid)]);
    }
    if (from) {
      return renderString("GroupV2--member-add-from-admin-approval--other--other", i18n, {
        adminName: renderContact(from),
        joinerName: renderContact(uuid)
      });
    }
    log.warn("member-add-from-admin-approval change type; we have no from");
    return renderString("GroupV2--member-add-from-admin-approval--other--unknown", i18n, [renderContact(uuid)]);
  }
  if (detail.type === "member-remove") {
    const { uuid } = detail;
    const weAreLeaver = Boolean(ourUuid && uuid === ourUuid);
    if (weAreLeaver) {
      if (fromYou) {
        return renderString("GroupV2--member-remove--you--you", i18n);
      }
      if (from) {
        return renderString("GroupV2--member-remove--you--other", i18n, [
          renderContact(from)
        ]);
      }
      return renderString("GroupV2--member-remove--you--unknown", i18n);
    }
    if (fromYou) {
      return renderString("GroupV2--member-remove--other--you", i18n, [
        renderContact(uuid)
      ]);
    }
    if (from && from === uuid) {
      return renderString("GroupV2--member-remove--other--self", i18n, [
        renderContact(from)
      ]);
    }
    if (from) {
      return renderString("GroupV2--member-remove--other--other", i18n, {
        adminName: renderContact(from),
        memberName: renderContact(uuid)
      });
    }
    return renderString("GroupV2--member-remove--other--unknown", i18n, [
      renderContact(uuid)
    ]);
  }
  if (detail.type === "member-privilege") {
    const { uuid, newPrivilege } = detail;
    const weAreMember = Boolean(ourUuid && uuid === ourUuid);
    if (newPrivilege === RoleEnum.ADMINISTRATOR) {
      if (weAreMember) {
        if (from) {
          return renderString("GroupV2--member-privilege--promote--you--other", i18n, [renderContact(from)]);
        }
        return renderString("GroupV2--member-privilege--promote--you--unknown", i18n);
      }
      if (fromYou) {
        return renderString("GroupV2--member-privilege--promote--other--you", i18n, [renderContact(uuid)]);
      }
      if (from) {
        return renderString("GroupV2--member-privilege--promote--other--other", i18n, {
          adminName: renderContact(from),
          memberName: renderContact(uuid)
        });
      }
      return renderString("GroupV2--member-privilege--promote--other--unknown", i18n, [renderContact(uuid)]);
    }
    if (newPrivilege === RoleEnum.DEFAULT) {
      if (weAreMember) {
        if (from) {
          return renderString("GroupV2--member-privilege--demote--you--other", i18n, [renderContact(from)]);
        }
        return renderString("GroupV2--member-privilege--demote--you--unknown", i18n);
      }
      if (fromYou) {
        return renderString("GroupV2--member-privilege--demote--other--you", i18n, [renderContact(uuid)]);
      }
      if (from) {
        return renderString("GroupV2--member-privilege--demote--other--other", i18n, {
          adminName: renderContact(from),
          memberName: renderContact(uuid)
        });
      }
      return renderString("GroupV2--member-privilege--demote--other--unknown", i18n, [renderContact(uuid)]);
    }
    log.warn(`member-privilege change type, privilege ${newPrivilege} is unknown`);
    return "";
  }
  if (detail.type === "pending-add-one") {
    const { uuid } = detail;
    const weAreInvited = Boolean(ourUuid && uuid === ourUuid);
    if (weAreInvited) {
      if (from) {
        return renderString("GroupV2--pending-add--one--you--other", i18n, [
          renderContact(from)
        ]);
      }
      return renderString("GroupV2--pending-add--one--you--unknown", i18n);
    }
    if (fromYou) {
      return renderString("GroupV2--pending-add--one--other--you", i18n, [
        renderContact(uuid)
      ]);
    }
    if (from) {
      return renderString("GroupV2--pending-add--one--other--other", i18n, [
        renderContact(from)
      ]);
    }
    return renderString("GroupV2--pending-add--one--other--unknown", i18n);
  }
  if (detail.type === "pending-add-many") {
    const { count } = detail;
    if (fromYou) {
      return renderString("GroupV2--pending-add--many--you", i18n, [
        count.toString()
      ]);
    }
    if (from) {
      return renderString("GroupV2--pending-add--many--other", i18n, {
        memberName: renderContact(from),
        count: count.toString()
      });
    }
    return renderString("GroupV2--pending-add--many--unknown", i18n, [
      count.toString()
    ]);
  }
  if (detail.type === "pending-remove-one") {
    const { inviter, uuid } = detail;
    const weAreInviter = Boolean(inviter && ourUuid && inviter === ourUuid);
    const weAreInvited = Boolean(ourUuid && uuid === ourUuid);
    const sentByInvited = Boolean(from && from === uuid);
    const sentByInviter = Boolean(from && inviter && from === inviter);
    if (weAreInviter) {
      if (sentByInvited) {
        return renderString("GroupV2--pending-remove--decline--you", i18n, [
          renderContact(uuid)
        ]);
      }
      if (fromYou) {
        return renderString("GroupV2--pending-remove--revoke-invite-from-you--one--you", i18n, [renderContact(uuid)]);
      }
      if (from) {
        return renderString("GroupV2--pending-remove--revoke-invite-from-you--one--other", i18n, {
          adminName: renderContact(from),
          inviteeName: renderContact(uuid)
        });
      }
      return renderString("GroupV2--pending-remove--revoke-invite-from-you--one--unknown", i18n, [renderContact(uuid)]);
    }
    if (sentByInvited) {
      if (fromYou) {
        return renderString("GroupV2--pending-remove--decline--from-you", i18n);
      }
      if (inviter) {
        return renderString("GroupV2--pending-remove--decline--other", i18n, [
          renderContact(inviter)
        ]);
      }
      return renderString("GroupV2--pending-remove--decline--unknown", i18n);
    }
    if (inviter && sentByInviter) {
      if (weAreInvited) {
        return renderString("GroupV2--pending-remove--revoke-own--to-you", i18n, [renderContact(inviter)]);
      }
      return renderString("GroupV2--pending-remove--revoke-own--unknown", i18n, [renderContact(inviter)]);
    }
    if (inviter) {
      if (fromYou) {
        return renderString("GroupV2--pending-remove--revoke-invite-from--one--you", i18n, [renderContact(inviter)]);
      }
      if (from) {
        return renderString("GroupV2--pending-remove--revoke-invite-from--one--other", i18n, {
          adminName: renderContact(from),
          memberName: renderContact(inviter)
        });
      }
      return renderString("GroupV2--pending-remove--revoke-invite-from--one--unknown", i18n, [renderContact(inviter)]);
    }
    if (fromYou) {
      return renderString("GroupV2--pending-remove--revoke--one--you", i18n);
    }
    if (from) {
      return renderString("GroupV2--pending-remove--revoke--one--other", i18n, [
        renderContact(from)
      ]);
    }
    return renderString("GroupV2--pending-remove--revoke--one--unknown", i18n);
  }
  if (detail.type === "pending-remove-many") {
    const { count, inviter } = detail;
    const weAreInviter = Boolean(inviter && ourUuid && inviter === ourUuid);
    if (weAreInviter) {
      if (fromYou) {
        return renderString("GroupV2--pending-remove--revoke-invite-from-you--many--you", i18n, [count.toString()]);
      }
      if (from) {
        return renderString("GroupV2--pending-remove--revoke-invite-from-you--many--other", i18n, {
          adminName: renderContact(from),
          count: count.toString()
        });
      }
      return renderString("GroupV2--pending-remove--revoke-invite-from-you--many--unknown", i18n, [count.toString()]);
    }
    if (inviter) {
      if (fromYou) {
        return renderString("GroupV2--pending-remove--revoke-invite-from--many--you", i18n, {
          count: count.toString(),
          memberName: renderContact(inviter)
        });
      }
      if (from) {
        return renderString("GroupV2--pending-remove--revoke-invite-from--many--other", i18n, {
          adminName: renderContact(from),
          count: count.toString(),
          memberName: renderContact(inviter)
        });
      }
      return renderString("GroupV2--pending-remove--revoke-invite-from--many--unknown", i18n, {
        count: count.toString(),
        memberName: renderContact(inviter)
      });
    }
    if (fromYou) {
      return renderString("GroupV2--pending-remove--revoke--many--you", i18n, [
        count.toString()
      ]);
    }
    if (from) {
      return renderString("GroupV2--pending-remove--revoke--many--other", i18n, {
        memberName: renderContact(from),
        count: count.toString()
      });
    }
    return renderString("GroupV2--pending-remove--revoke--many--unknown", i18n, [count.toString()]);
  }
  if (detail.type === "admin-approval-add-one") {
    const { uuid } = detail;
    const weAreJoiner = Boolean(ourUuid && uuid === ourUuid);
    if (weAreJoiner) {
      return renderString("GroupV2--admin-approval-add-one--you", i18n);
    }
    return renderString("GroupV2--admin-approval-add-one--other", i18n, [
      renderContact(uuid)
    ]);
  }
  if (detail.type === "admin-approval-remove-one") {
    const { uuid } = detail;
    const weAreJoiner = Boolean(ourUuid && uuid === ourUuid);
    if (weAreJoiner) {
      if (fromYou) {
        return renderString("GroupV2--admin-approval-remove-one--you--you", i18n);
      }
      return renderString("GroupV2--admin-approval-remove-one--you--unknown", i18n);
    }
    if (fromYou) {
      return renderString("GroupV2--admin-approval-remove-one--other--you", i18n, [renderContact(uuid)]);
    }
    if (from && from === uuid) {
      return renderString("GroupV2--admin-approval-remove-one--other--own", i18n, [renderContact(uuid)]);
    }
    if (from) {
      return renderString("GroupV2--admin-approval-remove-one--other--other", i18n, {
        adminName: renderContact(from),
        joinerName: renderContact(uuid)
      });
    }
    return renderString("GroupV2--admin-approval-remove-one--other--own", i18n, [renderContact(uuid)]);
  }
  if (detail.type === "admin-approval-bounce") {
    const { uuid, times, isApprovalPending } = detail;
    let firstMessage;
    if (times === 1) {
      firstMessage = renderString("GroupV2--admin-approval-bounce--one", i18n, {
        joinerName: renderContact(uuid)
      });
    } else {
      firstMessage = renderString("GroupV2--admin-approval-bounce", i18n, {
        joinerName: renderContact(uuid),
        numberOfRequests: String(times)
      });
    }
    if (!isApprovalPending) {
      return firstMessage;
    }
    const secondMessage = renderChangeDetail({
      type: "admin-approval-add-one",
      uuid
    }, options);
    return [
      firstMessage,
      ...Array.isArray(secondMessage) ? secondMessage : [secondMessage]
    ];
  }
  if (detail.type === "group-link-add") {
    const { privilege } = detail;
    if (privilege === AccessControlEnum.ADMINISTRATOR) {
      if (fromYou) {
        return renderString("GroupV2--group-link-add--enabled--you", i18n);
      }
      if (from) {
        return renderString("GroupV2--group-link-add--enabled--other", i18n, [
          renderContact(from)
        ]);
      }
      return renderString("GroupV2--group-link-add--enabled--unknown", i18n);
    }
    if (privilege === AccessControlEnum.ANY) {
      if (fromYou) {
        return renderString("GroupV2--group-link-add--disabled--you", i18n);
      }
      if (from) {
        return renderString("GroupV2--group-link-add--disabled--other", i18n, [
          renderContact(from)
        ]);
      }
      return renderString("GroupV2--group-link-add--disabled--unknown", i18n);
    }
    log.warn(`group-link-add change type, privilege ${privilege} is unknown`);
    return "";
  }
  if (detail.type === "group-link-reset") {
    if (fromYou) {
      return renderString("GroupV2--group-link-reset--you", i18n);
    }
    if (from) {
      return renderString("GroupV2--group-link-reset--other", i18n, [
        renderContact(from)
      ]);
    }
    return renderString("GroupV2--group-link-reset--unknown", i18n);
  }
  if (detail.type === "group-link-remove") {
    if (fromYou) {
      return renderString("GroupV2--group-link-remove--you", i18n);
    }
    if (from) {
      return renderString("GroupV2--group-link-remove--other", i18n, [
        renderContact(from)
      ]);
    }
    return renderString("GroupV2--group-link-remove--unknown", i18n);
  }
  if (detail.type === "description") {
    if (detail.removed) {
      if (fromYou) {
        return renderString("GroupV2--description--remove--you", i18n);
      }
      if (from) {
        return renderString("GroupV2--description--remove--other", i18n, [
          renderContact(from)
        ]);
      }
      return renderString("GroupV2--description--remove--unknown", i18n);
    }
    if (fromYou) {
      return renderString("GroupV2--description--change--you", i18n);
    }
    if (from) {
      return renderString("GroupV2--description--change--other", i18n, [
        renderContact(from)
      ]);
    }
    return renderString("GroupV2--description--change--unknown", i18n);
  }
  if (detail.type === "announcements-only") {
    if (detail.announcementsOnly) {
      if (fromYou) {
        return renderString("GroupV2--announcements--admin--you", i18n);
      }
      if (from) {
        return renderString("GroupV2--announcements--admin--other", i18n, [
          renderContact(from)
        ]);
      }
      return renderString("GroupV2--announcements--admin--unknown", i18n);
    }
    if (fromYou) {
      return renderString("GroupV2--announcements--member--you", i18n);
    }
    if (from) {
      return renderString("GroupV2--announcements--member--other", i18n, [
        renderContact(from)
      ]);
    }
    return renderString("GroupV2--announcements--member--unknown", i18n);
  }
  throw (0, import_missingCaseError.missingCaseError)(detail);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  renderChange,
  renderChangeDetail
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZ3JvdXBDaGFuZ2UudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIwLTIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgdHlwZSB7IExvY2FsaXplclR5cGUgfSBmcm9tICcuL3R5cGVzL1V0aWwnO1xuaW1wb3J0IHR5cGUgeyBSZXBsYWNlbWVudFZhbHVlc1R5cGUgfSBmcm9tICcuL3R5cGVzL0kxOE4nO1xuaW1wb3J0IHR5cGUgeyBVVUlEU3RyaW5nVHlwZSB9IGZyb20gJy4vdHlwZXMvVVVJRCc7XG5pbXBvcnQgeyBtaXNzaW5nQ2FzZUVycm9yIH0gZnJvbSAnLi91dGlsL21pc3NpbmdDYXNlRXJyb3InO1xuXG5pbXBvcnQgdHlwZSB7IEdyb3VwVjJDaGFuZ2VEZXRhaWxUeXBlLCBHcm91cFYyQ2hhbmdlVHlwZSB9IGZyb20gJy4vZ3JvdXBzJztcbmltcG9ydCB7IFNpZ25hbFNlcnZpY2UgYXMgUHJvdG8gfSBmcm9tICcuL3Byb3RvYnVmJztcbmltcG9ydCAqIGFzIGxvZyBmcm9tICcuL2xvZ2dpbmcvbG9nJztcblxuZXhwb3J0IHR5cGUgU21hcnRDb250YWN0UmVuZGVyZXJUeXBlPFQ+ID0gKHV1aWQ6IFVVSURTdHJpbmdUeXBlKSA9PiBUIHwgc3RyaW5nO1xuZXhwb3J0IHR5cGUgU3RyaW5nUmVuZGVyZXJUeXBlPFQ+ID0gKFxuICBpZDogc3RyaW5nLFxuICBpMThuOiBMb2NhbGl6ZXJUeXBlLFxuICBjb21wb25lbnRzPzogQXJyYXk8VCB8IHN0cmluZz4gfCBSZXBsYWNlbWVudFZhbHVlc1R5cGU8VCB8IHN0cmluZz5cbikgPT4gVCB8IHN0cmluZztcblxuZXhwb3J0IHR5cGUgUmVuZGVyT3B0aW9uc1R5cGU8VD4gPSB7XG4gIGZyb20/OiBVVUlEU3RyaW5nVHlwZTtcbiAgaTE4bjogTG9jYWxpemVyVHlwZTtcbiAgb3VyVXVpZD86IFVVSURTdHJpbmdUeXBlO1xuICByZW5kZXJDb250YWN0OiBTbWFydENvbnRhY3RSZW5kZXJlclR5cGU8VD47XG4gIHJlbmRlclN0cmluZzogU3RyaW5nUmVuZGVyZXJUeXBlPFQ+O1xufTtcblxuY29uc3QgQWNjZXNzQ29udHJvbEVudW0gPSBQcm90by5BY2Nlc3NDb250cm9sLkFjY2Vzc1JlcXVpcmVkO1xuY29uc3QgUm9sZUVudW0gPSBQcm90by5NZW1iZXIuUm9sZTtcblxuZXhwb3J0IHR5cGUgUmVuZGVyQ2hhbmdlUmVzdWx0VHlwZTxUPiA9IFJlYWRvbmx5QXJyYXk8XG4gIFJlYWRvbmx5PHtcbiAgICBkZXRhaWw6IEdyb3VwVjJDaGFuZ2VEZXRhaWxUeXBlO1xuICAgIHRleHQ6IFQgfCBzdHJpbmc7XG5cbiAgICAvLyBVc2VkIHRvIGRpZmZlcmVudGlhdGUgYmV0d2VlbiB0aGUgbXVsdGlwbGUgdGV4dHMgcHJvZHVjZWQgYnlcbiAgICAvLyAnYWRtaW4tYXBwcm92YWwtYm91bmNlJ1xuICAgIGlzTGFzdFRleHQ6IGJvb2xlYW47XG4gIH0+XG4+O1xuXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyQ2hhbmdlPFQ+KFxuICBjaGFuZ2U6IEdyb3VwVjJDaGFuZ2VUeXBlLFxuICBvcHRpb25zOiBSZW5kZXJPcHRpb25zVHlwZTxUPlxuKTogUmVuZGVyQ2hhbmdlUmVzdWx0VHlwZTxUPiB7XG4gIGNvbnN0IHsgZGV0YWlscywgZnJvbSB9ID0gY2hhbmdlO1xuXG4gIHJldHVybiBkZXRhaWxzLmZsYXRNYXAoKGRldGFpbDogR3JvdXBWMkNoYW5nZURldGFpbFR5cGUpID0+IHtcbiAgICBjb25zdCB0ZXh0cyA9IHJlbmRlckNoYW5nZURldGFpbDxUPihkZXRhaWwsIHtcbiAgICAgIC4uLm9wdGlvbnMsXG4gICAgICBmcm9tLFxuICAgIH0pO1xuXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KHRleHRzKSkge1xuICAgICAgcmV0dXJuIHsgZGV0YWlsLCBpc0xhc3RUZXh0OiB0cnVlLCB0ZXh0OiB0ZXh0cyB9O1xuICAgIH1cblxuICAgIHJldHVybiB0ZXh0cy5tYXAoKHRleHQsIGluZGV4KSA9PiB7XG4gICAgICBjb25zdCBpc0xhc3RUZXh0ID0gaW5kZXggPT09IHRleHRzLmxlbmd0aCAtIDE7XG4gICAgICByZXR1cm4geyBkZXRhaWwsIGlzTGFzdFRleHQsIHRleHQgfTtcbiAgICB9KTtcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJDaGFuZ2VEZXRhaWw8VD4oXG4gIGRldGFpbDogR3JvdXBWMkNoYW5nZURldGFpbFR5cGUsXG4gIG9wdGlvbnM6IFJlbmRlck9wdGlvbnNUeXBlPFQ+XG4pOiBUIHwgc3RyaW5nIHwgUmVhZG9ubHlBcnJheTxUIHwgc3RyaW5nPiB7XG4gIGNvbnN0IHsgZnJvbSwgaTE4biwgb3VyVXVpZCwgcmVuZGVyQ29udGFjdCwgcmVuZGVyU3RyaW5nIH0gPSBvcHRpb25zO1xuICBjb25zdCBmcm9tWW91ID0gQm9vbGVhbihmcm9tICYmIG91clV1aWQgJiYgZnJvbSA9PT0gb3VyVXVpZCk7XG5cbiAgaWYgKGRldGFpbC50eXBlID09PSAnY3JlYXRlJykge1xuICAgIGlmIChmcm9tWW91KSB7XG4gICAgICByZXR1cm4gcmVuZGVyU3RyaW5nKCdHcm91cFYyLS1jcmVhdGUtLXlvdScsIGkxOG4pO1xuICAgIH1cbiAgICBpZiAoZnJvbSkge1xuICAgICAgcmV0dXJuIHJlbmRlclN0cmluZygnR3JvdXBWMi0tY3JlYXRlLS1vdGhlcicsIGkxOG4sIHtcbiAgICAgICAgbWVtYmVyTmFtZTogcmVuZGVyQ29udGFjdChmcm9tKSxcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gcmVuZGVyU3RyaW5nKCdHcm91cFYyLS1jcmVhdGUtLXVua25vd24nLCBpMThuKTtcbiAgfVxuICBpZiAoZGV0YWlsLnR5cGUgPT09ICd0aXRsZScpIHtcbiAgICBjb25zdCB7IG5ld1RpdGxlIH0gPSBkZXRhaWw7XG5cbiAgICBpZiAobmV3VGl0bGUpIHtcbiAgICAgIGlmIChmcm9tWW91KSB7XG4gICAgICAgIHJldHVybiByZW5kZXJTdHJpbmcoJ0dyb3VwVjItLXRpdGxlLS1jaGFuZ2UtLXlvdScsIGkxOG4sIFtuZXdUaXRsZV0pO1xuICAgICAgfVxuICAgICAgaWYgKGZyb20pIHtcbiAgICAgICAgcmV0dXJuIHJlbmRlclN0cmluZygnR3JvdXBWMi0tdGl0bGUtLWNoYW5nZS0tb3RoZXInLCBpMThuLCB7XG4gICAgICAgICAgbWVtYmVyTmFtZTogcmVuZGVyQ29udGFjdChmcm9tKSxcbiAgICAgICAgICBuZXdUaXRsZSxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVuZGVyU3RyaW5nKCdHcm91cFYyLS10aXRsZS0tY2hhbmdlLS11bmtub3duJywgaTE4biwgW25ld1RpdGxlXSk7XG4gICAgfVxuICAgIGlmIChmcm9tWW91KSB7XG4gICAgICByZXR1cm4gcmVuZGVyU3RyaW5nKCdHcm91cFYyLS10aXRsZS0tcmVtb3ZlLS15b3UnLCBpMThuKTtcbiAgICB9XG4gICAgaWYgKGZyb20pIHtcbiAgICAgIHJldHVybiByZW5kZXJTdHJpbmcoJ0dyb3VwVjItLXRpdGxlLS1yZW1vdmUtLW90aGVyJywgaTE4biwgW1xuICAgICAgICByZW5kZXJDb250YWN0KGZyb20pLFxuICAgICAgXSk7XG4gICAgfVxuICAgIHJldHVybiByZW5kZXJTdHJpbmcoJ0dyb3VwVjItLXRpdGxlLS1yZW1vdmUtLXVua25vd24nLCBpMThuKTtcbiAgfVxuICBpZiAoZGV0YWlsLnR5cGUgPT09ICdhdmF0YXInKSB7XG4gICAgaWYgKGRldGFpbC5yZW1vdmVkKSB7XG4gICAgICBpZiAoZnJvbVlvdSkge1xuICAgICAgICByZXR1cm4gcmVuZGVyU3RyaW5nKCdHcm91cFYyLS1hdmF0YXItLXJlbW92ZS0teW91JywgaTE4bik7XG4gICAgICB9XG4gICAgICBpZiAoZnJvbSkge1xuICAgICAgICByZXR1cm4gcmVuZGVyU3RyaW5nKCdHcm91cFYyLS1hdmF0YXItLXJlbW92ZS0tb3RoZXInLCBpMThuLCBbXG4gICAgICAgICAgcmVuZGVyQ29udGFjdChmcm9tKSxcbiAgICAgICAgXSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVuZGVyU3RyaW5nKCdHcm91cFYyLS1hdmF0YXItLXJlbW92ZS0tdW5rbm93bicsIGkxOG4pO1xuICAgIH1cbiAgICBpZiAoZnJvbVlvdSkge1xuICAgICAgcmV0dXJuIHJlbmRlclN0cmluZygnR3JvdXBWMi0tYXZhdGFyLS1jaGFuZ2UtLXlvdScsIGkxOG4pO1xuICAgIH1cbiAgICBpZiAoZnJvbSkge1xuICAgICAgcmV0dXJuIHJlbmRlclN0cmluZygnR3JvdXBWMi0tYXZhdGFyLS1jaGFuZ2UtLW90aGVyJywgaTE4biwgW1xuICAgICAgICByZW5kZXJDb250YWN0KGZyb20pLFxuICAgICAgXSk7XG4gICAgfVxuICAgIHJldHVybiByZW5kZXJTdHJpbmcoJ0dyb3VwVjItLWF2YXRhci0tY2hhbmdlLS11bmtub3duJywgaTE4bik7XG4gIH1cbiAgaWYgKGRldGFpbC50eXBlID09PSAnYWNjZXNzLWF0dHJpYnV0ZXMnKSB7XG4gICAgY29uc3QgeyBuZXdQcml2aWxlZ2UgfSA9IGRldGFpbDtcblxuICAgIGlmIChuZXdQcml2aWxlZ2UgPT09IEFjY2Vzc0NvbnRyb2xFbnVtLkFETUlOSVNUUkFUT1IpIHtcbiAgICAgIGlmIChmcm9tWW91KSB7XG4gICAgICAgIHJldHVybiByZW5kZXJTdHJpbmcoJ0dyb3VwVjItLWFjY2Vzcy1hdHRyaWJ1dGVzLS1hZG1pbnMtLXlvdScsIGkxOG4pO1xuICAgICAgfVxuICAgICAgaWYgKGZyb20pIHtcbiAgICAgICAgcmV0dXJuIHJlbmRlclN0cmluZygnR3JvdXBWMi0tYWNjZXNzLWF0dHJpYnV0ZXMtLWFkbWlucy0tb3RoZXInLCBpMThuLCBbXG4gICAgICAgICAgcmVuZGVyQ29udGFjdChmcm9tKSxcbiAgICAgICAgXSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVuZGVyU3RyaW5nKCdHcm91cFYyLS1hY2Nlc3MtYXR0cmlidXRlcy0tYWRtaW5zLS11bmtub3duJywgaTE4bik7XG4gICAgfVxuICAgIGlmIChuZXdQcml2aWxlZ2UgPT09IEFjY2Vzc0NvbnRyb2xFbnVtLk1FTUJFUikge1xuICAgICAgaWYgKGZyb21Zb3UpIHtcbiAgICAgICAgcmV0dXJuIHJlbmRlclN0cmluZygnR3JvdXBWMi0tYWNjZXNzLWF0dHJpYnV0ZXMtLWFsbC0teW91JywgaTE4bik7XG4gICAgICB9XG4gICAgICBpZiAoZnJvbSkge1xuICAgICAgICByZXR1cm4gcmVuZGVyU3RyaW5nKCdHcm91cFYyLS1hY2Nlc3MtYXR0cmlidXRlcy0tYWxsLS1vdGhlcicsIGkxOG4sIFtcbiAgICAgICAgICByZW5kZXJDb250YWN0KGZyb20pLFxuICAgICAgICBdKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZW5kZXJTdHJpbmcoJ0dyb3VwVjItLWFjY2Vzcy1hdHRyaWJ1dGVzLS1hbGwtLXVua25vd24nLCBpMThuKTtcbiAgICB9XG4gICAgbG9nLndhcm4oXG4gICAgICBgYWNjZXNzLWF0dHJpYnV0ZXMgY2hhbmdlIHR5cGUsIHByaXZpbGVnZSAke25ld1ByaXZpbGVnZX0gaXMgdW5rbm93bmBcbiAgICApO1xuICAgIHJldHVybiAnJztcbiAgfVxuICBpZiAoZGV0YWlsLnR5cGUgPT09ICdhY2Nlc3MtbWVtYmVycycpIHtcbiAgICBjb25zdCB7IG5ld1ByaXZpbGVnZSB9ID0gZGV0YWlsO1xuXG4gICAgaWYgKG5ld1ByaXZpbGVnZSA9PT0gQWNjZXNzQ29udHJvbEVudW0uQURNSU5JU1RSQVRPUikge1xuICAgICAgaWYgKGZyb21Zb3UpIHtcbiAgICAgICAgcmV0dXJuIHJlbmRlclN0cmluZygnR3JvdXBWMi0tYWNjZXNzLW1lbWJlcnMtLWFkbWlucy0teW91JywgaTE4bik7XG4gICAgICB9XG4gICAgICBpZiAoZnJvbSkge1xuICAgICAgICByZXR1cm4gcmVuZGVyU3RyaW5nKCdHcm91cFYyLS1hY2Nlc3MtbWVtYmVycy0tYWRtaW5zLS1vdGhlcicsIGkxOG4sIFtcbiAgICAgICAgICByZW5kZXJDb250YWN0KGZyb20pLFxuICAgICAgICBdKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZW5kZXJTdHJpbmcoJ0dyb3VwVjItLWFjY2Vzcy1tZW1iZXJzLS1hZG1pbnMtLXVua25vd24nLCBpMThuKTtcbiAgICB9XG4gICAgaWYgKG5ld1ByaXZpbGVnZSA9PT0gQWNjZXNzQ29udHJvbEVudW0uTUVNQkVSKSB7XG4gICAgICBpZiAoZnJvbVlvdSkge1xuICAgICAgICByZXR1cm4gcmVuZGVyU3RyaW5nKCdHcm91cFYyLS1hY2Nlc3MtbWVtYmVycy0tYWxsLS15b3UnLCBpMThuKTtcbiAgICAgIH1cbiAgICAgIGlmIChmcm9tKSB7XG4gICAgICAgIHJldHVybiByZW5kZXJTdHJpbmcoJ0dyb3VwVjItLWFjY2Vzcy1tZW1iZXJzLS1hbGwtLW90aGVyJywgaTE4biwgW1xuICAgICAgICAgIHJlbmRlckNvbnRhY3QoZnJvbSksXG4gICAgICAgIF0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlbmRlclN0cmluZygnR3JvdXBWMi0tYWNjZXNzLW1lbWJlcnMtLWFsbC0tdW5rbm93bicsIGkxOG4pO1xuICAgIH1cbiAgICBsb2cud2FybihcbiAgICAgIGBhY2Nlc3MtbWVtYmVycyBjaGFuZ2UgdHlwZSwgcHJpdmlsZWdlICR7bmV3UHJpdmlsZWdlfSBpcyB1bmtub3duYFxuICAgICk7XG4gICAgcmV0dXJuICcnO1xuICB9XG4gIGlmIChkZXRhaWwudHlwZSA9PT0gJ2FjY2Vzcy1pbnZpdGUtbGluaycpIHtcbiAgICBjb25zdCB7IG5ld1ByaXZpbGVnZSB9ID0gZGV0YWlsO1xuXG4gICAgaWYgKG5ld1ByaXZpbGVnZSA9PT0gQWNjZXNzQ29udHJvbEVudW0uQURNSU5JU1RSQVRPUikge1xuICAgICAgaWYgKGZyb21Zb3UpIHtcbiAgICAgICAgcmV0dXJuIHJlbmRlclN0cmluZygnR3JvdXBWMi0tYWNjZXNzLWludml0ZS1saW5rLS1lbmFibGVkLS15b3UnLCBpMThuKTtcbiAgICAgIH1cbiAgICAgIGlmIChmcm9tKSB7XG4gICAgICAgIHJldHVybiByZW5kZXJTdHJpbmcoXG4gICAgICAgICAgJ0dyb3VwVjItLWFjY2Vzcy1pbnZpdGUtbGluay0tZW5hYmxlZC0tb3RoZXInLFxuICAgICAgICAgIGkxOG4sXG4gICAgICAgICAgW3JlbmRlckNvbnRhY3QoZnJvbSldXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVuZGVyU3RyaW5nKFxuICAgICAgICAnR3JvdXBWMi0tYWNjZXNzLWludml0ZS1saW5rLS1lbmFibGVkLS11bmtub3duJyxcbiAgICAgICAgaTE4blxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKG5ld1ByaXZpbGVnZSA9PT0gQWNjZXNzQ29udHJvbEVudW0uQU5ZKSB7XG4gICAgICBpZiAoZnJvbVlvdSkge1xuICAgICAgICByZXR1cm4gcmVuZGVyU3RyaW5nKCdHcm91cFYyLS1hY2Nlc3MtaW52aXRlLWxpbmstLWRpc2FibGVkLS15b3UnLCBpMThuKTtcbiAgICAgIH1cbiAgICAgIGlmIChmcm9tKSB7XG4gICAgICAgIHJldHVybiByZW5kZXJTdHJpbmcoXG4gICAgICAgICAgJ0dyb3VwVjItLWFjY2Vzcy1pbnZpdGUtbGluay0tZGlzYWJsZWQtLW90aGVyJyxcbiAgICAgICAgICBpMThuLFxuICAgICAgICAgIFtyZW5kZXJDb250YWN0KGZyb20pXVxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlbmRlclN0cmluZyhcbiAgICAgICAgJ0dyb3VwVjItLWFjY2Vzcy1pbnZpdGUtbGluay0tZGlzYWJsZWQtLXVua25vd24nLFxuICAgICAgICBpMThuXG4gICAgICApO1xuICAgIH1cbiAgICBsb2cud2FybihcbiAgICAgIGBhY2Nlc3MtaW52aXRlLWxpbmsgY2hhbmdlIHR5cGUsIHByaXZpbGVnZSAke25ld1ByaXZpbGVnZX0gaXMgdW5rbm93bmBcbiAgICApO1xuICAgIHJldHVybiAnJztcbiAgfVxuICBpZiAoZGV0YWlsLnR5cGUgPT09ICdtZW1iZXItYWRkJykge1xuICAgIGNvbnN0IHsgdXVpZCB9ID0gZGV0YWlsO1xuICAgIGNvbnN0IHdlQXJlSm9pbmVyID0gQm9vbGVhbihvdXJVdWlkICYmIHV1aWQgPT09IG91clV1aWQpO1xuXG4gICAgaWYgKHdlQXJlSm9pbmVyKSB7XG4gICAgICBpZiAoZnJvbVlvdSkge1xuICAgICAgICByZXR1cm4gcmVuZGVyU3RyaW5nKCdHcm91cFYyLS1tZW1iZXItYWRkLS15b3UtLXlvdScsIGkxOG4pO1xuICAgICAgfVxuICAgICAgaWYgKGZyb20pIHtcbiAgICAgICAgcmV0dXJuIHJlbmRlclN0cmluZygnR3JvdXBWMi0tbWVtYmVyLWFkZC0teW91LS1vdGhlcicsIGkxOG4sIFtcbiAgICAgICAgICByZW5kZXJDb250YWN0KGZyb20pLFxuICAgICAgICBdKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZW5kZXJTdHJpbmcoJ0dyb3VwVjItLW1lbWJlci1hZGQtLXlvdS0tdW5rbm93bicsIGkxOG4pO1xuICAgIH1cbiAgICBpZiAoZnJvbVlvdSkge1xuICAgICAgcmV0dXJuIHJlbmRlclN0cmluZygnR3JvdXBWMi0tbWVtYmVyLWFkZC0tb3RoZXItLXlvdScsIGkxOG4sIFtcbiAgICAgICAgcmVuZGVyQ29udGFjdCh1dWlkKSxcbiAgICAgIF0pO1xuICAgIH1cbiAgICBpZiAoZnJvbSkge1xuICAgICAgcmV0dXJuIHJlbmRlclN0cmluZygnR3JvdXBWMi0tbWVtYmVyLWFkZC0tb3RoZXItLW90aGVyJywgaTE4biwge1xuICAgICAgICBhZGRlck5hbWU6IHJlbmRlckNvbnRhY3QoZnJvbSksXG4gICAgICAgIGFkZGVlTmFtZTogcmVuZGVyQ29udGFjdCh1dWlkKSxcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gcmVuZGVyU3RyaW5nKCdHcm91cFYyLS1tZW1iZXItYWRkLS1vdGhlci0tdW5rbm93bicsIGkxOG4sIFtcbiAgICAgIHJlbmRlckNvbnRhY3QodXVpZCksXG4gICAgXSk7XG4gIH1cbiAgaWYgKGRldGFpbC50eXBlID09PSAnbWVtYmVyLWFkZC1mcm9tLWludml0ZScpIHtcbiAgICBjb25zdCB7IHV1aWQsIGludml0ZXIgfSA9IGRldGFpbDtcbiAgICBjb25zdCB3ZUFyZUpvaW5lciA9IEJvb2xlYW4ob3VyVXVpZCAmJiB1dWlkID09PSBvdXJVdWlkKTtcbiAgICBjb25zdCB3ZUFyZUludml0ZXIgPSBCb29sZWFuKGludml0ZXIgJiYgb3VyVXVpZCAmJiBpbnZpdGVyID09PSBvdXJVdWlkKTtcblxuICAgIGlmICghZnJvbSB8fCBmcm9tICE9PSB1dWlkKSB7XG4gICAgICBpZiAod2VBcmVKb2luZXIpIHtcbiAgICAgICAgLy8gVGhleSBjYW4ndCBiZSB0aGUgc2FtZSwgbm8gZnJvbVlvdSBjaGVjayBoZXJlXG4gICAgICAgIGlmIChmcm9tKSB7XG4gICAgICAgICAgcmV0dXJuIHJlbmRlclN0cmluZygnR3JvdXBWMi0tbWVtYmVyLWFkZC0teW91LS1vdGhlcicsIGkxOG4sIFtcbiAgICAgICAgICAgIHJlbmRlckNvbnRhY3QoZnJvbSksXG4gICAgICAgICAgXSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlbmRlclN0cmluZygnR3JvdXBWMi0tbWVtYmVyLWFkZC0teW91LS11bmtub3duJywgaTE4bik7XG4gICAgICB9XG5cbiAgICAgIGlmIChmcm9tWW91KSB7XG4gICAgICAgIHJldHVybiByZW5kZXJTdHJpbmcoJ0dyb3VwVjItLW1lbWJlci1hZGQtLWludml0ZWQtLXlvdScsIGkxOG4sIHtcbiAgICAgICAgICBpbnZpdGVlTmFtZTogcmVuZGVyQ29udGFjdCh1dWlkKSxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBpZiAoZnJvbSkge1xuICAgICAgICByZXR1cm4gcmVuZGVyU3RyaW5nKCdHcm91cFYyLS1tZW1iZXItYWRkLS1pbnZpdGVkLS1vdGhlcicsIGkxOG4sIHtcbiAgICAgICAgICBtZW1iZXJOYW1lOiByZW5kZXJDb250YWN0KGZyb20pLFxuICAgICAgICAgIGludml0ZWVOYW1lOiByZW5kZXJDb250YWN0KHV1aWQpLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZW5kZXJTdHJpbmcoJ0dyb3VwVjItLW1lbWJlci1hZGQtLWludml0ZWQtLXVua25vd24nLCBpMThuLCB7XG4gICAgICAgIGludml0ZWVOYW1lOiByZW5kZXJDb250YWN0KHV1aWQpLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHdlQXJlSm9pbmVyKSB7XG4gICAgICBpZiAoaW52aXRlcikge1xuICAgICAgICByZXR1cm4gcmVuZGVyU3RyaW5nKCdHcm91cFYyLS1tZW1iZXItYWRkLS1mcm9tLWludml0ZS0teW91JywgaTE4biwgW1xuICAgICAgICAgIHJlbmRlckNvbnRhY3QoaW52aXRlciksXG4gICAgICAgIF0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlbmRlclN0cmluZyhcbiAgICAgICAgJ0dyb3VwVjItLW1lbWJlci1hZGQtLWZyb20taW52aXRlLS15b3Utbm8tZnJvbScsXG4gICAgICAgIGkxOG5cbiAgICAgICk7XG4gICAgfVxuICAgIGlmICh3ZUFyZUludml0ZXIpIHtcbiAgICAgIHJldHVybiByZW5kZXJTdHJpbmcoJ0dyb3VwVjItLW1lbWJlci1hZGQtLWZyb20taW52aXRlLS1mcm9tLXlvdScsIGkxOG4sIFtcbiAgICAgICAgcmVuZGVyQ29udGFjdCh1dWlkKSxcbiAgICAgIF0pO1xuICAgIH1cbiAgICBpZiAoaW52aXRlcikge1xuICAgICAgcmV0dXJuIHJlbmRlclN0cmluZygnR3JvdXBWMi0tbWVtYmVyLWFkZC0tZnJvbS1pbnZpdGUtLW90aGVyJywgaTE4biwge1xuICAgICAgICBpbnZpdGVlTmFtZTogcmVuZGVyQ29udGFjdCh1dWlkKSxcbiAgICAgICAgaW52aXRlck5hbWU6IHJlbmRlckNvbnRhY3QoaW52aXRlciksXG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHJlbmRlclN0cmluZyhcbiAgICAgICdHcm91cFYyLS1tZW1iZXItYWRkLS1mcm9tLWludml0ZS0tb3RoZXItbm8tZnJvbScsXG4gICAgICBpMThuLFxuICAgICAge1xuICAgICAgICBpbnZpdGVlTmFtZTogcmVuZGVyQ29udGFjdCh1dWlkKSxcbiAgICAgIH1cbiAgICApO1xuICB9XG4gIGlmIChkZXRhaWwudHlwZSA9PT0gJ21lbWJlci1hZGQtZnJvbS1saW5rJykge1xuICAgIGNvbnN0IHsgdXVpZCB9ID0gZGV0YWlsO1xuXG4gICAgaWYgKGZyb21Zb3UgJiYgb3VyVXVpZCAmJiB1dWlkID09PSBvdXJVdWlkKSB7XG4gICAgICByZXR1cm4gcmVuZGVyU3RyaW5nKCdHcm91cFYyLS1tZW1iZXItYWRkLWZyb20tbGluay0teW91LS15b3UnLCBpMThuKTtcbiAgICB9XG4gICAgaWYgKGZyb20gJiYgdXVpZCA9PT0gZnJvbSkge1xuICAgICAgcmV0dXJuIHJlbmRlclN0cmluZygnR3JvdXBWMi0tbWVtYmVyLWFkZC1mcm9tLWxpbmstLW90aGVyJywgaTE4biwgW1xuICAgICAgICByZW5kZXJDb250YWN0KGZyb20pLFxuICAgICAgXSk7XG4gICAgfVxuXG4gICAgLy8gTm90ZTogdGhpcyBzaG91bGRuJ3QgaGFwcGVuLCBiZWNhdXNlIHdlIG9ubHkgY2FwdHVyZSAnYWRkLWZyb20tbGluaycgc3RhdHVzXG4gICAgLy8gICBmcm9tIGdyb3VwIGNoYW5nZSBldmVudHMsIHdoaWNoIGFsd2F5cyBoYXZlIGEgc2VuZGVyLlxuICAgIGxvZy53YXJuKCdtZW1iZXItYWRkLWZyb20tbGluayBjaGFuZ2UgdHlwZTsgd2UgaGF2ZSBubyBmcm9tIScpO1xuICAgIHJldHVybiByZW5kZXJTdHJpbmcoJ0dyb3VwVjItLW1lbWJlci1hZGQtLW90aGVyLS11bmtub3duJywgaTE4biwgW1xuICAgICAgcmVuZGVyQ29udGFjdCh1dWlkKSxcbiAgICBdKTtcbiAgfVxuICBpZiAoZGV0YWlsLnR5cGUgPT09ICdtZW1iZXItYWRkLWZyb20tYWRtaW4tYXBwcm92YWwnKSB7XG4gICAgY29uc3QgeyB1dWlkIH0gPSBkZXRhaWw7XG4gICAgY29uc3Qgd2VBcmVKb2luZXIgPSBCb29sZWFuKG91clV1aWQgJiYgdXVpZCA9PT0gb3VyVXVpZCk7XG5cbiAgICBpZiAod2VBcmVKb2luZXIpIHtcbiAgICAgIGlmIChmcm9tKSB7XG4gICAgICAgIHJldHVybiByZW5kZXJTdHJpbmcoXG4gICAgICAgICAgJ0dyb3VwVjItLW1lbWJlci1hZGQtZnJvbS1hZG1pbi1hcHByb3ZhbC0teW91LS1vdGhlcicsXG4gICAgICAgICAgaTE4bixcbiAgICAgICAgICBbcmVuZGVyQ29udGFjdChmcm9tKV1cbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgLy8gTm90ZTogdGhpcyBzaG91bGRuJ3QgaGFwcGVuLCBiZWNhdXNlIHdlIG9ubHkgY2FwdHVyZSAnYWRkLWZyb20tYWRtaW4tYXBwcm92YWwnXG4gICAgICAvLyAgIHN0YXR1cyBmcm9tIGdyb3VwIGNoYW5nZSBldmVudHMsIHdoaWNoIGFsd2F5cyBoYXZlIGEgc2VuZGVyLlxuICAgICAgbG9nLndhcm4oXG4gICAgICAgICdtZW1iZXItYWRkLWZyb20tYWRtaW4tYXBwcm92YWwgY2hhbmdlIHR5cGU7IHdlIGhhdmUgbm8gZnJvbSwgYW5kIHdlIGFyZSBqb2luZXIhJ1xuICAgICAgKTtcbiAgICAgIHJldHVybiByZW5kZXJTdHJpbmcoXG4gICAgICAgICdHcm91cFYyLS1tZW1iZXItYWRkLWZyb20tYWRtaW4tYXBwcm92YWwtLXlvdS0tdW5rbm93bicsXG4gICAgICAgIGkxOG5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKGZyb21Zb3UpIHtcbiAgICAgIHJldHVybiByZW5kZXJTdHJpbmcoXG4gICAgICAgICdHcm91cFYyLS1tZW1iZXItYWRkLWZyb20tYWRtaW4tYXBwcm92YWwtLW90aGVyLS15b3UnLFxuICAgICAgICBpMThuLFxuICAgICAgICBbcmVuZGVyQ29udGFjdCh1dWlkKV1cbiAgICAgICk7XG4gICAgfVxuICAgIGlmIChmcm9tKSB7XG4gICAgICByZXR1cm4gcmVuZGVyU3RyaW5nKFxuICAgICAgICAnR3JvdXBWMi0tbWVtYmVyLWFkZC1mcm9tLWFkbWluLWFwcHJvdmFsLS1vdGhlci0tb3RoZXInLFxuICAgICAgICBpMThuLFxuICAgICAgICB7XG4gICAgICAgICAgYWRtaW5OYW1lOiByZW5kZXJDb250YWN0KGZyb20pLFxuICAgICAgICAgIGpvaW5lck5hbWU6IHJlbmRlckNvbnRhY3QodXVpZCksXG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gTm90ZTogdGhpcyBzaG91bGRuJ3QgaGFwcGVuLCBiZWNhdXNlIHdlIG9ubHkgY2FwdHVyZSAnYWRkLWZyb20tYWRtaW4tYXBwcm92YWwnXG4gICAgLy8gICBzdGF0dXMgZnJvbSBncm91cCBjaGFuZ2UgZXZlbnRzLCB3aGljaCBhbHdheXMgaGF2ZSBhIHNlbmRlci5cbiAgICBsb2cud2FybignbWVtYmVyLWFkZC1mcm9tLWFkbWluLWFwcHJvdmFsIGNoYW5nZSB0eXBlOyB3ZSBoYXZlIG5vIGZyb20nKTtcbiAgICByZXR1cm4gcmVuZGVyU3RyaW5nKFxuICAgICAgJ0dyb3VwVjItLW1lbWJlci1hZGQtZnJvbS1hZG1pbi1hcHByb3ZhbC0tb3RoZXItLXVua25vd24nLFxuICAgICAgaTE4bixcbiAgICAgIFtyZW5kZXJDb250YWN0KHV1aWQpXVxuICAgICk7XG4gIH1cbiAgaWYgKGRldGFpbC50eXBlID09PSAnbWVtYmVyLXJlbW92ZScpIHtcbiAgICBjb25zdCB7IHV1aWQgfSA9IGRldGFpbDtcbiAgICBjb25zdCB3ZUFyZUxlYXZlciA9IEJvb2xlYW4ob3VyVXVpZCAmJiB1dWlkID09PSBvdXJVdWlkKTtcblxuICAgIGlmICh3ZUFyZUxlYXZlcikge1xuICAgICAgaWYgKGZyb21Zb3UpIHtcbiAgICAgICAgcmV0dXJuIHJlbmRlclN0cmluZygnR3JvdXBWMi0tbWVtYmVyLXJlbW92ZS0teW91LS15b3UnLCBpMThuKTtcbiAgICAgIH1cbiAgICAgIGlmIChmcm9tKSB7XG4gICAgICAgIHJldHVybiByZW5kZXJTdHJpbmcoJ0dyb3VwVjItLW1lbWJlci1yZW1vdmUtLXlvdS0tb3RoZXInLCBpMThuLCBbXG4gICAgICAgICAgcmVuZGVyQ29udGFjdChmcm9tKSxcbiAgICAgICAgXSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVuZGVyU3RyaW5nKCdHcm91cFYyLS1tZW1iZXItcmVtb3ZlLS15b3UtLXVua25vd24nLCBpMThuKTtcbiAgICB9XG5cbiAgICBpZiAoZnJvbVlvdSkge1xuICAgICAgcmV0dXJuIHJlbmRlclN0cmluZygnR3JvdXBWMi0tbWVtYmVyLXJlbW92ZS0tb3RoZXItLXlvdScsIGkxOG4sIFtcbiAgICAgICAgcmVuZGVyQ29udGFjdCh1dWlkKSxcbiAgICAgIF0pO1xuICAgIH1cbiAgICBpZiAoZnJvbSAmJiBmcm9tID09PSB1dWlkKSB7XG4gICAgICByZXR1cm4gcmVuZGVyU3RyaW5nKCdHcm91cFYyLS1tZW1iZXItcmVtb3ZlLS1vdGhlci0tc2VsZicsIGkxOG4sIFtcbiAgICAgICAgcmVuZGVyQ29udGFjdChmcm9tKSxcbiAgICAgIF0pO1xuICAgIH1cbiAgICBpZiAoZnJvbSkge1xuICAgICAgcmV0dXJuIHJlbmRlclN0cmluZygnR3JvdXBWMi0tbWVtYmVyLXJlbW92ZS0tb3RoZXItLW90aGVyJywgaTE4biwge1xuICAgICAgICBhZG1pbk5hbWU6IHJlbmRlckNvbnRhY3QoZnJvbSksXG4gICAgICAgIG1lbWJlck5hbWU6IHJlbmRlckNvbnRhY3QodXVpZCksXG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHJlbmRlclN0cmluZygnR3JvdXBWMi0tbWVtYmVyLXJlbW92ZS0tb3RoZXItLXVua25vd24nLCBpMThuLCBbXG4gICAgICByZW5kZXJDb250YWN0KHV1aWQpLFxuICAgIF0pO1xuICB9XG4gIGlmIChkZXRhaWwudHlwZSA9PT0gJ21lbWJlci1wcml2aWxlZ2UnKSB7XG4gICAgY29uc3QgeyB1dWlkLCBuZXdQcml2aWxlZ2UgfSA9IGRldGFpbDtcbiAgICBjb25zdCB3ZUFyZU1lbWJlciA9IEJvb2xlYW4ob3VyVXVpZCAmJiB1dWlkID09PSBvdXJVdWlkKTtcblxuICAgIGlmIChuZXdQcml2aWxlZ2UgPT09IFJvbGVFbnVtLkFETUlOSVNUUkFUT1IpIHtcbiAgICAgIGlmICh3ZUFyZU1lbWJlcikge1xuICAgICAgICBpZiAoZnJvbSkge1xuICAgICAgICAgIHJldHVybiByZW5kZXJTdHJpbmcoXG4gICAgICAgICAgICAnR3JvdXBWMi0tbWVtYmVyLXByaXZpbGVnZS0tcHJvbW90ZS0teW91LS1vdGhlcicsXG4gICAgICAgICAgICBpMThuLFxuICAgICAgICAgICAgW3JlbmRlckNvbnRhY3QoZnJvbSldXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZW5kZXJTdHJpbmcoXG4gICAgICAgICAgJ0dyb3VwVjItLW1lbWJlci1wcml2aWxlZ2UtLXByb21vdGUtLXlvdS0tdW5rbm93bicsXG4gICAgICAgICAgaTE4blxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICBpZiAoZnJvbVlvdSkge1xuICAgICAgICByZXR1cm4gcmVuZGVyU3RyaW5nKFxuICAgICAgICAgICdHcm91cFYyLS1tZW1iZXItcHJpdmlsZWdlLS1wcm9tb3RlLS1vdGhlci0teW91JyxcbiAgICAgICAgICBpMThuLFxuICAgICAgICAgIFtyZW5kZXJDb250YWN0KHV1aWQpXVxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgaWYgKGZyb20pIHtcbiAgICAgICAgcmV0dXJuIHJlbmRlclN0cmluZyhcbiAgICAgICAgICAnR3JvdXBWMi0tbWVtYmVyLXByaXZpbGVnZS0tcHJvbW90ZS0tb3RoZXItLW90aGVyJyxcbiAgICAgICAgICBpMThuLFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGFkbWluTmFtZTogcmVuZGVyQ29udGFjdChmcm9tKSxcbiAgICAgICAgICAgIG1lbWJlck5hbWU6IHJlbmRlckNvbnRhY3QodXVpZCksXG4gICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlbmRlclN0cmluZyhcbiAgICAgICAgJ0dyb3VwVjItLW1lbWJlci1wcml2aWxlZ2UtLXByb21vdGUtLW90aGVyLS11bmtub3duJyxcbiAgICAgICAgaTE4bixcbiAgICAgICAgW3JlbmRlckNvbnRhY3QodXVpZCldXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAobmV3UHJpdmlsZWdlID09PSBSb2xlRW51bS5ERUZBVUxUKSB7XG4gICAgICBpZiAod2VBcmVNZW1iZXIpIHtcbiAgICAgICAgaWYgKGZyb20pIHtcbiAgICAgICAgICByZXR1cm4gcmVuZGVyU3RyaW5nKFxuICAgICAgICAgICAgJ0dyb3VwVjItLW1lbWJlci1wcml2aWxlZ2UtLWRlbW90ZS0teW91LS1vdGhlcicsXG4gICAgICAgICAgICBpMThuLFxuICAgICAgICAgICAgW3JlbmRlckNvbnRhY3QoZnJvbSldXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVuZGVyU3RyaW5nKFxuICAgICAgICAgICdHcm91cFYyLS1tZW1iZXItcHJpdmlsZWdlLS1kZW1vdGUtLXlvdS0tdW5rbm93bicsXG4gICAgICAgICAgaTE4blxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICBpZiAoZnJvbVlvdSkge1xuICAgICAgICByZXR1cm4gcmVuZGVyU3RyaW5nKFxuICAgICAgICAgICdHcm91cFYyLS1tZW1iZXItcHJpdmlsZWdlLS1kZW1vdGUtLW90aGVyLS15b3UnLFxuICAgICAgICAgIGkxOG4sXG4gICAgICAgICAgW3JlbmRlckNvbnRhY3QodXVpZCldXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBpZiAoZnJvbSkge1xuICAgICAgICByZXR1cm4gcmVuZGVyU3RyaW5nKFxuICAgICAgICAgICdHcm91cFYyLS1tZW1iZXItcHJpdmlsZWdlLS1kZW1vdGUtLW90aGVyLS1vdGhlcicsXG4gICAgICAgICAgaTE4bixcbiAgICAgICAgICB7XG4gICAgICAgICAgICBhZG1pbk5hbWU6IHJlbmRlckNvbnRhY3QoZnJvbSksXG4gICAgICAgICAgICBtZW1iZXJOYW1lOiByZW5kZXJDb250YWN0KHV1aWQpLFxuICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZW5kZXJTdHJpbmcoXG4gICAgICAgICdHcm91cFYyLS1tZW1iZXItcHJpdmlsZWdlLS1kZW1vdGUtLW90aGVyLS11bmtub3duJyxcbiAgICAgICAgaTE4bixcbiAgICAgICAgW3JlbmRlckNvbnRhY3QodXVpZCldXG4gICAgICApO1xuICAgIH1cbiAgICBsb2cud2FybihcbiAgICAgIGBtZW1iZXItcHJpdmlsZWdlIGNoYW5nZSB0eXBlLCBwcml2aWxlZ2UgJHtuZXdQcml2aWxlZ2V9IGlzIHVua25vd25gXG4gICAgKTtcbiAgICByZXR1cm4gJyc7XG4gIH1cbiAgaWYgKGRldGFpbC50eXBlID09PSAncGVuZGluZy1hZGQtb25lJykge1xuICAgIGNvbnN0IHsgdXVpZCB9ID0gZGV0YWlsO1xuICAgIGNvbnN0IHdlQXJlSW52aXRlZCA9IEJvb2xlYW4ob3VyVXVpZCAmJiB1dWlkID09PSBvdXJVdWlkKTtcbiAgICBpZiAod2VBcmVJbnZpdGVkKSB7XG4gICAgICBpZiAoZnJvbSkge1xuICAgICAgICByZXR1cm4gcmVuZGVyU3RyaW5nKCdHcm91cFYyLS1wZW5kaW5nLWFkZC0tb25lLS15b3UtLW90aGVyJywgaTE4biwgW1xuICAgICAgICAgIHJlbmRlckNvbnRhY3QoZnJvbSksXG4gICAgICAgIF0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlbmRlclN0cmluZygnR3JvdXBWMi0tcGVuZGluZy1hZGQtLW9uZS0teW91LS11bmtub3duJywgaTE4bik7XG4gICAgfVxuICAgIGlmIChmcm9tWW91KSB7XG4gICAgICByZXR1cm4gcmVuZGVyU3RyaW5nKCdHcm91cFYyLS1wZW5kaW5nLWFkZC0tb25lLS1vdGhlci0teW91JywgaTE4biwgW1xuICAgICAgICByZW5kZXJDb250YWN0KHV1aWQpLFxuICAgICAgXSk7XG4gICAgfVxuICAgIGlmIChmcm9tKSB7XG4gICAgICByZXR1cm4gcmVuZGVyU3RyaW5nKCdHcm91cFYyLS1wZW5kaW5nLWFkZC0tb25lLS1vdGhlci0tb3RoZXInLCBpMThuLCBbXG4gICAgICAgIHJlbmRlckNvbnRhY3QoZnJvbSksXG4gICAgICBdKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlbmRlclN0cmluZygnR3JvdXBWMi0tcGVuZGluZy1hZGQtLW9uZS0tb3RoZXItLXVua25vd24nLCBpMThuKTtcbiAgfVxuICBpZiAoZGV0YWlsLnR5cGUgPT09ICdwZW5kaW5nLWFkZC1tYW55Jykge1xuICAgIGNvbnN0IHsgY291bnQgfSA9IGRldGFpbDtcblxuICAgIGlmIChmcm9tWW91KSB7XG4gICAgICByZXR1cm4gcmVuZGVyU3RyaW5nKCdHcm91cFYyLS1wZW5kaW5nLWFkZC0tbWFueS0teW91JywgaTE4biwgW1xuICAgICAgICBjb3VudC50b1N0cmluZygpLFxuICAgICAgXSk7XG4gICAgfVxuICAgIGlmIChmcm9tKSB7XG4gICAgICByZXR1cm4gcmVuZGVyU3RyaW5nKCdHcm91cFYyLS1wZW5kaW5nLWFkZC0tbWFueS0tb3RoZXInLCBpMThuLCB7XG4gICAgICAgIG1lbWJlck5hbWU6IHJlbmRlckNvbnRhY3QoZnJvbSksXG4gICAgICAgIGNvdW50OiBjb3VudC50b1N0cmluZygpLFxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiByZW5kZXJTdHJpbmcoJ0dyb3VwVjItLXBlbmRpbmctYWRkLS1tYW55LS11bmtub3duJywgaTE4biwgW1xuICAgICAgY291bnQudG9TdHJpbmcoKSxcbiAgICBdKTtcbiAgfVxuICBpZiAoZGV0YWlsLnR5cGUgPT09ICdwZW5kaW5nLXJlbW92ZS1vbmUnKSB7XG4gICAgY29uc3QgeyBpbnZpdGVyLCB1dWlkIH0gPSBkZXRhaWw7XG4gICAgY29uc3Qgd2VBcmVJbnZpdGVyID0gQm9vbGVhbihpbnZpdGVyICYmIG91clV1aWQgJiYgaW52aXRlciA9PT0gb3VyVXVpZCk7XG4gICAgY29uc3Qgd2VBcmVJbnZpdGVkID0gQm9vbGVhbihvdXJVdWlkICYmIHV1aWQgPT09IG91clV1aWQpO1xuICAgIGNvbnN0IHNlbnRCeUludml0ZWQgPSBCb29sZWFuKGZyb20gJiYgZnJvbSA9PT0gdXVpZCk7XG4gICAgY29uc3Qgc2VudEJ5SW52aXRlciA9IEJvb2xlYW4oZnJvbSAmJiBpbnZpdGVyICYmIGZyb20gPT09IGludml0ZXIpO1xuXG4gICAgaWYgKHdlQXJlSW52aXRlcikge1xuICAgICAgaWYgKHNlbnRCeUludml0ZWQpIHtcbiAgICAgICAgcmV0dXJuIHJlbmRlclN0cmluZygnR3JvdXBWMi0tcGVuZGluZy1yZW1vdmUtLWRlY2xpbmUtLXlvdScsIGkxOG4sIFtcbiAgICAgICAgICByZW5kZXJDb250YWN0KHV1aWQpLFxuICAgICAgICBdKTtcbiAgICAgIH1cbiAgICAgIGlmIChmcm9tWW91KSB7XG4gICAgICAgIHJldHVybiByZW5kZXJTdHJpbmcoXG4gICAgICAgICAgJ0dyb3VwVjItLXBlbmRpbmctcmVtb3ZlLS1yZXZva2UtaW52aXRlLWZyb20teW91LS1vbmUtLXlvdScsXG4gICAgICAgICAgaTE4bixcbiAgICAgICAgICBbcmVuZGVyQ29udGFjdCh1dWlkKV1cbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGlmIChmcm9tKSB7XG4gICAgICAgIHJldHVybiByZW5kZXJTdHJpbmcoXG4gICAgICAgICAgJ0dyb3VwVjItLXBlbmRpbmctcmVtb3ZlLS1yZXZva2UtaW52aXRlLWZyb20teW91LS1vbmUtLW90aGVyJyxcbiAgICAgICAgICBpMThuLFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGFkbWluTmFtZTogcmVuZGVyQ29udGFjdChmcm9tKSxcbiAgICAgICAgICAgIGludml0ZWVOYW1lOiByZW5kZXJDb250YWN0KHV1aWQpLFxuICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZW5kZXJTdHJpbmcoXG4gICAgICAgICdHcm91cFYyLS1wZW5kaW5nLXJlbW92ZS0tcmV2b2tlLWludml0ZS1mcm9tLXlvdS0tb25lLS11bmtub3duJyxcbiAgICAgICAgaTE4bixcbiAgICAgICAgW3JlbmRlckNvbnRhY3QodXVpZCldXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoc2VudEJ5SW52aXRlZCkge1xuICAgICAgaWYgKGZyb21Zb3UpIHtcbiAgICAgICAgcmV0dXJuIHJlbmRlclN0cmluZygnR3JvdXBWMi0tcGVuZGluZy1yZW1vdmUtLWRlY2xpbmUtLWZyb20teW91JywgaTE4bik7XG4gICAgICB9XG4gICAgICBpZiAoaW52aXRlcikge1xuICAgICAgICByZXR1cm4gcmVuZGVyU3RyaW5nKCdHcm91cFYyLS1wZW5kaW5nLXJlbW92ZS0tZGVjbGluZS0tb3RoZXInLCBpMThuLCBbXG4gICAgICAgICAgcmVuZGVyQ29udGFjdChpbnZpdGVyKSxcbiAgICAgICAgXSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVuZGVyU3RyaW5nKCdHcm91cFYyLS1wZW5kaW5nLXJlbW92ZS0tZGVjbGluZS0tdW5rbm93bicsIGkxOG4pO1xuICAgIH1cbiAgICBpZiAoaW52aXRlciAmJiBzZW50QnlJbnZpdGVyKSB7XG4gICAgICBpZiAod2VBcmVJbnZpdGVkKSB7XG4gICAgICAgIHJldHVybiByZW5kZXJTdHJpbmcoXG4gICAgICAgICAgJ0dyb3VwVjItLXBlbmRpbmctcmVtb3ZlLS1yZXZva2Utb3duLS10by15b3UnLFxuICAgICAgICAgIGkxOG4sXG4gICAgICAgICAgW3JlbmRlckNvbnRhY3QoaW52aXRlcildXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVuZGVyU3RyaW5nKFxuICAgICAgICAnR3JvdXBWMi0tcGVuZGluZy1yZW1vdmUtLXJldm9rZS1vd24tLXVua25vd24nLFxuICAgICAgICBpMThuLFxuICAgICAgICBbcmVuZGVyQ29udGFjdChpbnZpdGVyKV1cbiAgICAgICk7XG4gICAgfVxuICAgIGlmIChpbnZpdGVyKSB7XG4gICAgICBpZiAoZnJvbVlvdSkge1xuICAgICAgICByZXR1cm4gcmVuZGVyU3RyaW5nKFxuICAgICAgICAgICdHcm91cFYyLS1wZW5kaW5nLXJlbW92ZS0tcmV2b2tlLWludml0ZS1mcm9tLS1vbmUtLXlvdScsXG4gICAgICAgICAgaTE4bixcbiAgICAgICAgICBbcmVuZGVyQ29udGFjdChpbnZpdGVyKV1cbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGlmIChmcm9tKSB7XG4gICAgICAgIHJldHVybiByZW5kZXJTdHJpbmcoXG4gICAgICAgICAgJ0dyb3VwVjItLXBlbmRpbmctcmVtb3ZlLS1yZXZva2UtaW52aXRlLWZyb20tLW9uZS0tb3RoZXInLFxuICAgICAgICAgIGkxOG4sXG4gICAgICAgICAge1xuICAgICAgICAgICAgYWRtaW5OYW1lOiByZW5kZXJDb250YWN0KGZyb20pLFxuICAgICAgICAgICAgbWVtYmVyTmFtZTogcmVuZGVyQ29udGFjdChpbnZpdGVyKSxcbiAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVuZGVyU3RyaW5nKFxuICAgICAgICAnR3JvdXBWMi0tcGVuZGluZy1yZW1vdmUtLXJldm9rZS1pbnZpdGUtZnJvbS0tb25lLS11bmtub3duJyxcbiAgICAgICAgaTE4bixcbiAgICAgICAgW3JlbmRlckNvbnRhY3QoaW52aXRlcildXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoZnJvbVlvdSkge1xuICAgICAgcmV0dXJuIHJlbmRlclN0cmluZygnR3JvdXBWMi0tcGVuZGluZy1yZW1vdmUtLXJldm9rZS0tb25lLS15b3UnLCBpMThuKTtcbiAgICB9XG4gICAgaWYgKGZyb20pIHtcbiAgICAgIHJldHVybiByZW5kZXJTdHJpbmcoJ0dyb3VwVjItLXBlbmRpbmctcmVtb3ZlLS1yZXZva2UtLW9uZS0tb3RoZXInLCBpMThuLCBbXG4gICAgICAgIHJlbmRlckNvbnRhY3QoZnJvbSksXG4gICAgICBdKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlbmRlclN0cmluZygnR3JvdXBWMi0tcGVuZGluZy1yZW1vdmUtLXJldm9rZS0tb25lLS11bmtub3duJywgaTE4bik7XG4gIH1cbiAgaWYgKGRldGFpbC50eXBlID09PSAncGVuZGluZy1yZW1vdmUtbWFueScpIHtcbiAgICBjb25zdCB7IGNvdW50LCBpbnZpdGVyIH0gPSBkZXRhaWw7XG4gICAgY29uc3Qgd2VBcmVJbnZpdGVyID0gQm9vbGVhbihpbnZpdGVyICYmIG91clV1aWQgJiYgaW52aXRlciA9PT0gb3VyVXVpZCk7XG5cbiAgICBpZiAod2VBcmVJbnZpdGVyKSB7XG4gICAgICBpZiAoZnJvbVlvdSkge1xuICAgICAgICByZXR1cm4gcmVuZGVyU3RyaW5nKFxuICAgICAgICAgICdHcm91cFYyLS1wZW5kaW5nLXJlbW92ZS0tcmV2b2tlLWludml0ZS1mcm9tLXlvdS0tbWFueS0teW91JyxcbiAgICAgICAgICBpMThuLFxuICAgICAgICAgIFtjb3VudC50b1N0cmluZygpXVxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgaWYgKGZyb20pIHtcbiAgICAgICAgcmV0dXJuIHJlbmRlclN0cmluZyhcbiAgICAgICAgICAnR3JvdXBWMi0tcGVuZGluZy1yZW1vdmUtLXJldm9rZS1pbnZpdGUtZnJvbS15b3UtLW1hbnktLW90aGVyJyxcbiAgICAgICAgICBpMThuLFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGFkbWluTmFtZTogcmVuZGVyQ29udGFjdChmcm9tKSxcbiAgICAgICAgICAgIGNvdW50OiBjb3VudC50b1N0cmluZygpLFxuICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZW5kZXJTdHJpbmcoXG4gICAgICAgICdHcm91cFYyLS1wZW5kaW5nLXJlbW92ZS0tcmV2b2tlLWludml0ZS1mcm9tLXlvdS0tbWFueS0tdW5rbm93bicsXG4gICAgICAgIGkxOG4sXG4gICAgICAgIFtjb3VudC50b1N0cmluZygpXVxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKGludml0ZXIpIHtcbiAgICAgIGlmIChmcm9tWW91KSB7XG4gICAgICAgIHJldHVybiByZW5kZXJTdHJpbmcoXG4gICAgICAgICAgJ0dyb3VwVjItLXBlbmRpbmctcmVtb3ZlLS1yZXZva2UtaW52aXRlLWZyb20tLW1hbnktLXlvdScsXG4gICAgICAgICAgaTE4bixcbiAgICAgICAgICB7XG4gICAgICAgICAgICBjb3VudDogY291bnQudG9TdHJpbmcoKSxcbiAgICAgICAgICAgIG1lbWJlck5hbWU6IHJlbmRlckNvbnRhY3QoaW52aXRlciksXG4gICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgaWYgKGZyb20pIHtcbiAgICAgICAgcmV0dXJuIHJlbmRlclN0cmluZyhcbiAgICAgICAgICAnR3JvdXBWMi0tcGVuZGluZy1yZW1vdmUtLXJldm9rZS1pbnZpdGUtZnJvbS0tbWFueS0tb3RoZXInLFxuICAgICAgICAgIGkxOG4sXG4gICAgICAgICAge1xuICAgICAgICAgICAgYWRtaW5OYW1lOiByZW5kZXJDb250YWN0KGZyb20pLFxuICAgICAgICAgICAgY291bnQ6IGNvdW50LnRvU3RyaW5nKCksXG4gICAgICAgICAgICBtZW1iZXJOYW1lOiByZW5kZXJDb250YWN0KGludml0ZXIpLFxuICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZW5kZXJTdHJpbmcoXG4gICAgICAgICdHcm91cFYyLS1wZW5kaW5nLXJlbW92ZS0tcmV2b2tlLWludml0ZS1mcm9tLS1tYW55LS11bmtub3duJyxcbiAgICAgICAgaTE4bixcbiAgICAgICAge1xuICAgICAgICAgIGNvdW50OiBjb3VudC50b1N0cmluZygpLFxuICAgICAgICAgIG1lbWJlck5hbWU6IHJlbmRlckNvbnRhY3QoaW52aXRlciksXG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgfVxuICAgIGlmIChmcm9tWW91KSB7XG4gICAgICByZXR1cm4gcmVuZGVyU3RyaW5nKCdHcm91cFYyLS1wZW5kaW5nLXJlbW92ZS0tcmV2b2tlLS1tYW55LS15b3UnLCBpMThuLCBbXG4gICAgICAgIGNvdW50LnRvU3RyaW5nKCksXG4gICAgICBdKTtcbiAgICB9XG4gICAgaWYgKGZyb20pIHtcbiAgICAgIHJldHVybiByZW5kZXJTdHJpbmcoXG4gICAgICAgICdHcm91cFYyLS1wZW5kaW5nLXJlbW92ZS0tcmV2b2tlLS1tYW55LS1vdGhlcicsXG4gICAgICAgIGkxOG4sXG4gICAgICAgIHtcbiAgICAgICAgICBtZW1iZXJOYW1lOiByZW5kZXJDb250YWN0KGZyb20pLFxuICAgICAgICAgIGNvdW50OiBjb3VudC50b1N0cmluZygpLFxuICAgICAgICB9XG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gcmVuZGVyU3RyaW5nKFxuICAgICAgJ0dyb3VwVjItLXBlbmRpbmctcmVtb3ZlLS1yZXZva2UtLW1hbnktLXVua25vd24nLFxuICAgICAgaTE4bixcbiAgICAgIFtjb3VudC50b1N0cmluZygpXVxuICAgICk7XG4gIH1cbiAgaWYgKGRldGFpbC50eXBlID09PSAnYWRtaW4tYXBwcm92YWwtYWRkLW9uZScpIHtcbiAgICBjb25zdCB7IHV1aWQgfSA9IGRldGFpbDtcbiAgICBjb25zdCB3ZUFyZUpvaW5lciA9IEJvb2xlYW4ob3VyVXVpZCAmJiB1dWlkID09PSBvdXJVdWlkKTtcblxuICAgIGlmICh3ZUFyZUpvaW5lcikge1xuICAgICAgcmV0dXJuIHJlbmRlclN0cmluZygnR3JvdXBWMi0tYWRtaW4tYXBwcm92YWwtYWRkLW9uZS0teW91JywgaTE4bik7XG4gICAgfVxuICAgIHJldHVybiByZW5kZXJTdHJpbmcoJ0dyb3VwVjItLWFkbWluLWFwcHJvdmFsLWFkZC1vbmUtLW90aGVyJywgaTE4biwgW1xuICAgICAgcmVuZGVyQ29udGFjdCh1dWlkKSxcbiAgICBdKTtcbiAgfVxuICBpZiAoZGV0YWlsLnR5cGUgPT09ICdhZG1pbi1hcHByb3ZhbC1yZW1vdmUtb25lJykge1xuICAgIGNvbnN0IHsgdXVpZCB9ID0gZGV0YWlsO1xuICAgIGNvbnN0IHdlQXJlSm9pbmVyID0gQm9vbGVhbihvdXJVdWlkICYmIHV1aWQgPT09IG91clV1aWQpO1xuXG4gICAgaWYgKHdlQXJlSm9pbmVyKSB7XG4gICAgICBpZiAoZnJvbVlvdSkge1xuICAgICAgICByZXR1cm4gcmVuZGVyU3RyaW5nKFxuICAgICAgICAgICdHcm91cFYyLS1hZG1pbi1hcHByb3ZhbC1yZW1vdmUtb25lLS15b3UtLXlvdScsXG4gICAgICAgICAgaTE4blxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlbmRlclN0cmluZyhcbiAgICAgICAgJ0dyb3VwVjItLWFkbWluLWFwcHJvdmFsLXJlbW92ZS1vbmUtLXlvdS0tdW5rbm93bicsXG4gICAgICAgIGkxOG5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKGZyb21Zb3UpIHtcbiAgICAgIHJldHVybiByZW5kZXJTdHJpbmcoXG4gICAgICAgICdHcm91cFYyLS1hZG1pbi1hcHByb3ZhbC1yZW1vdmUtb25lLS1vdGhlci0teW91JyxcbiAgICAgICAgaTE4bixcbiAgICAgICAgW3JlbmRlckNvbnRhY3QodXVpZCldXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoZnJvbSAmJiBmcm9tID09PSB1dWlkKSB7XG4gICAgICByZXR1cm4gcmVuZGVyU3RyaW5nKFxuICAgICAgICAnR3JvdXBWMi0tYWRtaW4tYXBwcm92YWwtcmVtb3ZlLW9uZS0tb3RoZXItLW93bicsXG4gICAgICAgIGkxOG4sXG4gICAgICAgIFtyZW5kZXJDb250YWN0KHV1aWQpXVxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKGZyb20pIHtcbiAgICAgIHJldHVybiByZW5kZXJTdHJpbmcoXG4gICAgICAgICdHcm91cFYyLS1hZG1pbi1hcHByb3ZhbC1yZW1vdmUtb25lLS1vdGhlci0tb3RoZXInLFxuICAgICAgICBpMThuLFxuICAgICAgICB7XG4gICAgICAgICAgYWRtaW5OYW1lOiByZW5kZXJDb250YWN0KGZyb20pLFxuICAgICAgICAgIGpvaW5lck5hbWU6IHJlbmRlckNvbnRhY3QodXVpZCksXG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gV2UgZGVmYXVsdCB0byB0aGUgdXNlciBjYW5jZWxpbmcgdGhlaXIgcmVxdWVzdCwgYmVjYXVzZSBpdCBpcyBmYXIgbW9yZSBsaWtlbHkgdGhhdFxuICAgIC8vICAgaWYgYW4gYWRtaW4gZG9lcyB0aGUgZGVuaWFsLCB3ZSdsbCBnZXQgYSBjaGFuZ2UgZXZlbnQgZnJvbSB0aGVtLlxuICAgIHJldHVybiByZW5kZXJTdHJpbmcoXG4gICAgICAnR3JvdXBWMi0tYWRtaW4tYXBwcm92YWwtcmVtb3ZlLW9uZS0tb3RoZXItLW93bicsXG4gICAgICBpMThuLFxuICAgICAgW3JlbmRlckNvbnRhY3QodXVpZCldXG4gICAgKTtcbiAgfVxuICBpZiAoZGV0YWlsLnR5cGUgPT09ICdhZG1pbi1hcHByb3ZhbC1ib3VuY2UnKSB7XG4gICAgY29uc3QgeyB1dWlkLCB0aW1lcywgaXNBcHByb3ZhbFBlbmRpbmcgfSA9IGRldGFpbDtcblxuICAgIGxldCBmaXJzdE1lc3NhZ2U6IFQgfCBzdHJpbmc7XG4gICAgaWYgKHRpbWVzID09PSAxKSB7XG4gICAgICBmaXJzdE1lc3NhZ2UgPSByZW5kZXJTdHJpbmcoJ0dyb3VwVjItLWFkbWluLWFwcHJvdmFsLWJvdW5jZS0tb25lJywgaTE4biwge1xuICAgICAgICBqb2luZXJOYW1lOiByZW5kZXJDb250YWN0KHV1aWQpLFxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZpcnN0TWVzc2FnZSA9IHJlbmRlclN0cmluZygnR3JvdXBWMi0tYWRtaW4tYXBwcm92YWwtYm91bmNlJywgaTE4biwge1xuICAgICAgICBqb2luZXJOYW1lOiByZW5kZXJDb250YWN0KHV1aWQpLFxuICAgICAgICBudW1iZXJPZlJlcXVlc3RzOiBTdHJpbmcodGltZXMpLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKCFpc0FwcHJvdmFsUGVuZGluZykge1xuICAgICAgcmV0dXJuIGZpcnN0TWVzc2FnZTtcbiAgICB9XG5cbiAgICBjb25zdCBzZWNvbmRNZXNzYWdlID0gcmVuZGVyQ2hhbmdlRGV0YWlsKFxuICAgICAge1xuICAgICAgICB0eXBlOiAnYWRtaW4tYXBwcm92YWwtYWRkLW9uZScsXG4gICAgICAgIHV1aWQsXG4gICAgICB9LFxuICAgICAgb3B0aW9uc1xuICAgICk7XG5cbiAgICByZXR1cm4gW1xuICAgICAgZmlyc3RNZXNzYWdlLFxuICAgICAgLi4uKEFycmF5LmlzQXJyYXkoc2Vjb25kTWVzc2FnZSkgPyBzZWNvbmRNZXNzYWdlIDogW3NlY29uZE1lc3NhZ2VdKSxcbiAgICBdO1xuICB9XG4gIGlmIChkZXRhaWwudHlwZSA9PT0gJ2dyb3VwLWxpbmstYWRkJykge1xuICAgIGNvbnN0IHsgcHJpdmlsZWdlIH0gPSBkZXRhaWw7XG5cbiAgICBpZiAocHJpdmlsZWdlID09PSBBY2Nlc3NDb250cm9sRW51bS5BRE1JTklTVFJBVE9SKSB7XG4gICAgICBpZiAoZnJvbVlvdSkge1xuICAgICAgICByZXR1cm4gcmVuZGVyU3RyaW5nKCdHcm91cFYyLS1ncm91cC1saW5rLWFkZC0tZW5hYmxlZC0teW91JywgaTE4bik7XG4gICAgICB9XG4gICAgICBpZiAoZnJvbSkge1xuICAgICAgICByZXR1cm4gcmVuZGVyU3RyaW5nKCdHcm91cFYyLS1ncm91cC1saW5rLWFkZC0tZW5hYmxlZC0tb3RoZXInLCBpMThuLCBbXG4gICAgICAgICAgcmVuZGVyQ29udGFjdChmcm9tKSxcbiAgICAgICAgXSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVuZGVyU3RyaW5nKCdHcm91cFYyLS1ncm91cC1saW5rLWFkZC0tZW5hYmxlZC0tdW5rbm93bicsIGkxOG4pO1xuICAgIH1cbiAgICBpZiAocHJpdmlsZWdlID09PSBBY2Nlc3NDb250cm9sRW51bS5BTlkpIHtcbiAgICAgIGlmIChmcm9tWW91KSB7XG4gICAgICAgIHJldHVybiByZW5kZXJTdHJpbmcoJ0dyb3VwVjItLWdyb3VwLWxpbmstYWRkLS1kaXNhYmxlZC0teW91JywgaTE4bik7XG4gICAgICB9XG4gICAgICBpZiAoZnJvbSkge1xuICAgICAgICByZXR1cm4gcmVuZGVyU3RyaW5nKCdHcm91cFYyLS1ncm91cC1saW5rLWFkZC0tZGlzYWJsZWQtLW90aGVyJywgaTE4biwgW1xuICAgICAgICAgIHJlbmRlckNvbnRhY3QoZnJvbSksXG4gICAgICAgIF0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlbmRlclN0cmluZygnR3JvdXBWMi0tZ3JvdXAtbGluay1hZGQtLWRpc2FibGVkLS11bmtub3duJywgaTE4bik7XG4gICAgfVxuICAgIGxvZy53YXJuKGBncm91cC1saW5rLWFkZCBjaGFuZ2UgdHlwZSwgcHJpdmlsZWdlICR7cHJpdmlsZWdlfSBpcyB1bmtub3duYCk7XG4gICAgcmV0dXJuICcnO1xuICB9XG4gIGlmIChkZXRhaWwudHlwZSA9PT0gJ2dyb3VwLWxpbmstcmVzZXQnKSB7XG4gICAgaWYgKGZyb21Zb3UpIHtcbiAgICAgIHJldHVybiByZW5kZXJTdHJpbmcoJ0dyb3VwVjItLWdyb3VwLWxpbmstcmVzZXQtLXlvdScsIGkxOG4pO1xuICAgIH1cbiAgICBpZiAoZnJvbSkge1xuICAgICAgcmV0dXJuIHJlbmRlclN0cmluZygnR3JvdXBWMi0tZ3JvdXAtbGluay1yZXNldC0tb3RoZXInLCBpMThuLCBbXG4gICAgICAgIHJlbmRlckNvbnRhY3QoZnJvbSksXG4gICAgICBdKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlbmRlclN0cmluZygnR3JvdXBWMi0tZ3JvdXAtbGluay1yZXNldC0tdW5rbm93bicsIGkxOG4pO1xuICB9XG4gIGlmIChkZXRhaWwudHlwZSA9PT0gJ2dyb3VwLWxpbmstcmVtb3ZlJykge1xuICAgIGlmIChmcm9tWW91KSB7XG4gICAgICByZXR1cm4gcmVuZGVyU3RyaW5nKCdHcm91cFYyLS1ncm91cC1saW5rLXJlbW92ZS0teW91JywgaTE4bik7XG4gICAgfVxuICAgIGlmIChmcm9tKSB7XG4gICAgICByZXR1cm4gcmVuZGVyU3RyaW5nKCdHcm91cFYyLS1ncm91cC1saW5rLXJlbW92ZS0tb3RoZXInLCBpMThuLCBbXG4gICAgICAgIHJlbmRlckNvbnRhY3QoZnJvbSksXG4gICAgICBdKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlbmRlclN0cmluZygnR3JvdXBWMi0tZ3JvdXAtbGluay1yZW1vdmUtLXVua25vd24nLCBpMThuKTtcbiAgfVxuICBpZiAoZGV0YWlsLnR5cGUgPT09ICdkZXNjcmlwdGlvbicpIHtcbiAgICBpZiAoZGV0YWlsLnJlbW92ZWQpIHtcbiAgICAgIGlmIChmcm9tWW91KSB7XG4gICAgICAgIHJldHVybiByZW5kZXJTdHJpbmcoJ0dyb3VwVjItLWRlc2NyaXB0aW9uLS1yZW1vdmUtLXlvdScsIGkxOG4pO1xuICAgICAgfVxuICAgICAgaWYgKGZyb20pIHtcbiAgICAgICAgcmV0dXJuIHJlbmRlclN0cmluZygnR3JvdXBWMi0tZGVzY3JpcHRpb24tLXJlbW92ZS0tb3RoZXInLCBpMThuLCBbXG4gICAgICAgICAgcmVuZGVyQ29udGFjdChmcm9tKSxcbiAgICAgICAgXSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVuZGVyU3RyaW5nKCdHcm91cFYyLS1kZXNjcmlwdGlvbi0tcmVtb3ZlLS11bmtub3duJywgaTE4bik7XG4gICAgfVxuXG4gICAgaWYgKGZyb21Zb3UpIHtcbiAgICAgIHJldHVybiByZW5kZXJTdHJpbmcoJ0dyb3VwVjItLWRlc2NyaXB0aW9uLS1jaGFuZ2UtLXlvdScsIGkxOG4pO1xuICAgIH1cbiAgICBpZiAoZnJvbSkge1xuICAgICAgcmV0dXJuIHJlbmRlclN0cmluZygnR3JvdXBWMi0tZGVzY3JpcHRpb24tLWNoYW5nZS0tb3RoZXInLCBpMThuLCBbXG4gICAgICAgIHJlbmRlckNvbnRhY3QoZnJvbSksXG4gICAgICBdKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlbmRlclN0cmluZygnR3JvdXBWMi0tZGVzY3JpcHRpb24tLWNoYW5nZS0tdW5rbm93bicsIGkxOG4pO1xuICB9XG4gIGlmIChkZXRhaWwudHlwZSA9PT0gJ2Fubm91bmNlbWVudHMtb25seScpIHtcbiAgICBpZiAoZGV0YWlsLmFubm91bmNlbWVudHNPbmx5KSB7XG4gICAgICBpZiAoZnJvbVlvdSkge1xuICAgICAgICByZXR1cm4gcmVuZGVyU3RyaW5nKCdHcm91cFYyLS1hbm5vdW5jZW1lbnRzLS1hZG1pbi0teW91JywgaTE4bik7XG4gICAgICB9XG4gICAgICBpZiAoZnJvbSkge1xuICAgICAgICByZXR1cm4gcmVuZGVyU3RyaW5nKCdHcm91cFYyLS1hbm5vdW5jZW1lbnRzLS1hZG1pbi0tb3RoZXInLCBpMThuLCBbXG4gICAgICAgICAgcmVuZGVyQ29udGFjdChmcm9tKSxcbiAgICAgICAgXSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVuZGVyU3RyaW5nKCdHcm91cFYyLS1hbm5vdW5jZW1lbnRzLS1hZG1pbi0tdW5rbm93bicsIGkxOG4pO1xuICAgIH1cblxuICAgIGlmIChmcm9tWW91KSB7XG4gICAgICByZXR1cm4gcmVuZGVyU3RyaW5nKCdHcm91cFYyLS1hbm5vdW5jZW1lbnRzLS1tZW1iZXItLXlvdScsIGkxOG4pO1xuICAgIH1cbiAgICBpZiAoZnJvbSkge1xuICAgICAgcmV0dXJuIHJlbmRlclN0cmluZygnR3JvdXBWMi0tYW5ub3VuY2VtZW50cy0tbWVtYmVyLS1vdGhlcicsIGkxOG4sIFtcbiAgICAgICAgcmVuZGVyQ29udGFjdChmcm9tKSxcbiAgICAgIF0pO1xuICAgIH1cbiAgICByZXR1cm4gcmVuZGVyU3RyaW5nKCdHcm91cFYyLS1hbm5vdW5jZW1lbnRzLS1tZW1iZXItLXVua25vd24nLCBpMThuKTtcbiAgfVxuXG4gIHRocm93IG1pc3NpbmdDYXNlRXJyb3IoZGV0YWlsKTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7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
