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
var joinViaLink_exports = {};
__export(joinViaLink_exports, {
  joinViaLink: () => joinViaLink
});
module.exports = __toCommonJS(joinViaLink_exports);
var React = __toESM(require("react"));
var import_groups = require("../groups");
var Errors = __toESM(require("../types/errors"));
var Bytes = __toESM(require("../Bytes"));
var import_longRunningTaskWrapper = require("../util/longRunningTaskWrapper");
var import_whatTypeOfConversation = require("../util/whatTypeOfConversation");
var import_explodePromise = require("../util/explodePromise");
var import_protobuf = require("../protobuf");
var log = __toESM(require("../logging/log"));
var import_showToast = require("../util/showToast");
var import_ReactWrapperView = require("../views/ReactWrapperView");
var import_ErrorModal = require("../components/ErrorModal");
var import_ToastAlreadyGroupMember = require("../components/ToastAlreadyGroupMember");
var import_ToastAlreadyRequestedToJoin = require("../components/ToastAlreadyRequestedToJoin");
var import_Errors = require("../textsecure/Errors");
var import_util = require("./util");
var import_sleep = require("../util/sleep");
async function joinViaLink(hash) {
  let inviteLinkPassword;
  let masterKey;
  try {
    ({ inviteLinkPassword, masterKey } = (0, import_groups.parseGroupLink)(hash));
  } catch (error) {
    const errorString = Errors.toLogFormat(error);
    log.error(`joinViaLink: Failed to parse group link ${errorString}`);
    if (error instanceof Error && error.name === import_groups.LINK_VERSION_ERROR) {
      showErrorDialog(window.i18n("GroupV2--join--unknown-link-version"), window.i18n("GroupV2--join--unknown-link-version--title"));
    } else {
      showErrorDialog(window.i18n("GroupV2--join--invalid-link"), window.i18n("GroupV2--join--invalid-link--title"));
    }
    return;
  }
  const data = (0, import_groups.deriveGroupFields)(Bytes.fromBase64(masterKey));
  const id = Bytes.toBase64(data.id);
  const logId = `groupv2(${id})`;
  const secretParams = Bytes.toBase64(data.secretParams);
  const publicParams = Bytes.toBase64(data.publicParams);
  const existingConversation = window.ConversationController.get(id) || window.ConversationController.getByDerivedGroupV2Id(id);
  const ourConversationId = window.ConversationController.getOurConversationIdOrThrow();
  if (existingConversation && existingConversation.hasMember(ourConversationId)) {
    log.warn(`joinViaLink/${logId}: Already a member of group, opening conversation`);
    window.reduxActions.conversations.showConversation({
      conversationId: existingConversation.id
    });
    (0, import_showToast.showToast)(import_ToastAlreadyGroupMember.ToastAlreadyGroupMember);
    return;
  }
  let result;
  try {
    result = await (0, import_longRunningTaskWrapper.longRunningTaskWrapper)({
      name: "getPreJoinGroupInfo",
      idForLogging: (0, import_groups.idForLogging)(id),
      suppressErrorDialog: true,
      task: () => (0, import_groups.getPreJoinGroupInfo)(inviteLinkPassword, masterKey)
    });
  } catch (error) {
    const errorString = Errors.toLogFormat(error);
    log.error(`joinViaLink/${logId}: Failed to fetch group info - ${errorString}`);
    if (error instanceof import_Errors.HTTPError && error.responseHeaders["x-signal-forbidden-reason"]) {
      showErrorDialog(window.i18n("GroupV2--join--link-forbidden"), window.i18n("GroupV2--join--link-forbidden--title"));
    } else if (error instanceof import_Errors.HTTPError && error.code === 403) {
      showErrorDialog(window.i18n("GroupV2--join--link-revoked"), window.i18n("GroupV2--join--link-revoked--title"));
    } else {
      showErrorDialog(window.i18n("GroupV2--join--general-join-failure"), window.i18n("GroupV2--join--general-join-failure--title"));
    }
    return;
  }
  if (!(0, import_util.isAccessControlEnabled)(result.addFromInviteLink)) {
    log.error(`joinViaLink/${logId}: addFromInviteLink value of ${result.addFromInviteLink} is invalid`);
    showErrorDialog(window.i18n("GroupV2--join--link-revoked"), window.i18n("GroupV2--join--link-revoked--title"));
    return;
  }
  let localAvatar = result.avatar ? { loading: true } : void 0;
  const memberCount = result.memberCount || 1;
  const approvalRequired = result.addFromInviteLink === import_protobuf.SignalService.AccessControl.AccessRequired.ADMINISTRATOR;
  const title = (0, import_groups.decryptGroupTitle)(result.title, secretParams) || window.i18n("unknownGroup");
  const groupDescription = (0, import_groups.decryptGroupDescription)(result.descriptionBytes, secretParams);
  if (approvalRequired && existingConversation && existingConversation.isMemberAwaitingApproval(ourConversationId)) {
    log.warn(`joinViaLink/${logId}: Already awaiting approval, opening conversation`);
    const timestamp = existingConversation.get("timestamp") || Date.now();
    const active_at = existingConversation.get("active_at") || Date.now();
    existingConversation.set({ active_at, timestamp });
    window.Signal.Data.updateConversation(existingConversation.attributes);
    await (0, import_sleep.sleep)(200);
    window.reduxActions.conversations.showConversation({
      conversationId: existingConversation.id
    });
    (0, import_showToast.showToast)(import_ToastAlreadyRequestedToJoin.ToastAlreadyRequestedToJoin);
    return;
  }
  const getPreJoinConversation = /* @__PURE__ */ __name(() => {
    let avatar;
    if (!localAvatar) {
      avatar = void 0;
    } else if (localAvatar && localAvatar.loading) {
      avatar = {
        loading: true
      };
    } else if (localAvatar && localAvatar.path) {
      avatar = {
        url: window.Signal.Migrations.getAbsoluteAttachmentPath(localAvatar.path)
      };
    }
    return {
      approvalRequired,
      avatar,
      groupDescription,
      memberCount,
      title
    };
  }, "getPreJoinConversation");
  const { promise, resolve, reject } = (0, import_explodePromise.explodePromise)();
  const closeDialog = /* @__PURE__ */ __name(async () => {
    try {
      if (groupV2InfoDialog) {
        groupV2InfoDialog.remove();
        groupV2InfoDialog = void 0;
      }
      window.reduxActions.conversations.setPreJoinConversation(void 0);
      if (localAvatar && localAvatar.path) {
        await window.Signal.Migrations.deleteAttachmentData(localAvatar.path);
      }
      resolve();
    } catch (error) {
      reject(error);
    }
  }, "closeDialog");
  const join = /* @__PURE__ */ __name(async () => {
    try {
      if (groupV2InfoDialog) {
        groupV2InfoDialog.remove();
        groupV2InfoDialog = void 0;
      }
      window.reduxActions.conversations.setPreJoinConversation(void 0);
      await (0, import_longRunningTaskWrapper.longRunningTaskWrapper)({
        name: "joinViaLink",
        idForLogging: (0, import_groups.idForLogging)(id),
        suppressErrorDialog: true,
        task: async () => {
          let targetConversation = existingConversation || window.ConversationController.get(id) || window.ConversationController.getByDerivedGroupV2Id(id);
          let tempConversation;
          if (targetConversation && (targetConversation.hasMember(ourConversationId) || approvalRequired && targetConversation.isMemberAwaitingApproval(ourConversationId))) {
            log.warn(`joinViaLink/${logId}: User is part of group on second check, opening conversation`);
            window.reduxActions.conversations.showConversation({
              conversationId: targetConversation.id
            });
            return;
          }
          try {
            if (!targetConversation) {
              tempConversation = window.ConversationController.getOrCreate(id, "group", {
                isTemporary: true,
                active_at: Date.now(),
                timestamp: Date.now(),
                groupVersion: 2,
                masterKey,
                secretParams,
                publicParams,
                left: true,
                revision: result.version,
                avatar: localAvatar && localAvatar.path && result.avatar ? {
                  url: result.avatar,
                  path: localAvatar.path
                } : void 0,
                description: groupDescription,
                groupInviteLinkPassword: inviteLinkPassword,
                name: title,
                temporaryMemberCount: memberCount
              });
              targetConversation = tempConversation;
            } else {
              const timestamp = targetConversation.get("timestamp") || Date.now();
              const active_at = targetConversation.get("active_at") || Date.now();
              targetConversation.set({
                active_at,
                avatar: localAvatar && localAvatar.path && result.avatar ? {
                  url: result.avatar,
                  path: localAvatar.path
                } : void 0,
                description: groupDescription,
                groupInviteLinkPassword: inviteLinkPassword,
                name: title,
                revision: result.version,
                temporaryMemberCount: memberCount,
                timestamp
              });
              window.Signal.Data.updateConversation(targetConversation.attributes);
            }
            if ((0, import_whatTypeOfConversation.isGroupV1)(targetConversation.attributes)) {
              await targetConversation.joinGroupV2ViaLinkAndMigrate({
                approvalRequired,
                inviteLinkPassword,
                revision: result.version || 0
              });
            } else {
              await targetConversation.joinGroupV2ViaLink({
                inviteLinkPassword,
                approvalRequired
              });
            }
            if (tempConversation) {
              tempConversation.set({
                isTemporary: void 0
              });
              window.Signal.Data.updateConversation(tempConversation.attributes);
            }
            window.reduxActions.conversations.showConversation({
              conversationId: targetConversation.id
            });
          } catch (error) {
            if (tempConversation) {
              window.ConversationController.dangerouslyRemoveById(tempConversation.id);
              await window.Signal.Data.removeConversation(tempConversation.id);
            }
            throw error;
          }
        }
      });
      resolve();
    } catch (error) {
      reject(error);
    }
  }, "join");
  window.reduxActions.conversations.setPreJoinConversation(getPreJoinConversation());
  log.info(`joinViaLink/${logId}: Showing modal`);
  let groupV2InfoDialog = new import_ReactWrapperView.ReactWrapperView({
    className: "group-v2-join-dialog-wrapper",
    JSX: window.Signal.State.Roots.createGroupV2JoinModal(window.reduxStore, {
      join,
      onClose: closeDialog
    })
  });
  const fetchAvatar = /* @__PURE__ */ __name(async () => {
    if (result.avatar) {
      localAvatar = {
        loading: true
      };
      const attributes = {
        avatar: null,
        secretParams
      };
      await (0, import_groups.applyNewAvatar)(result.avatar, attributes, logId);
      if (attributes.avatar && attributes.avatar.path) {
        localAvatar = {
          path: attributes.avatar.path
        };
        if (!groupV2InfoDialog) {
          await window.Signal.Migrations.deleteAttachmentData(attributes.avatar.path);
          return;
        }
      } else {
        localAvatar = void 0;
      }
      window.reduxActions.conversations.setPreJoinConversation(getPreJoinConversation());
    }
  }, "fetchAvatar");
  fetchAvatar();
  await promise;
}
function showErrorDialog(description, title) {
  const errorView = new import_ReactWrapperView.ReactWrapperView({
    className: "error-modal-wrapper",
    JSX: /* @__PURE__ */ React.createElement(import_ErrorModal.ErrorModal, {
      i18n: window.i18n,
      title,
      description,
      onClose: () => {
        errorView.remove();
      }
    })
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  joinViaLink
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiam9pblZpYUxpbmsudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMS0yMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtcbiAgYXBwbHlOZXdBdmF0YXIsXG4gIGRlY3J5cHRHcm91cERlc2NyaXB0aW9uLFxuICBkZWNyeXB0R3JvdXBUaXRsZSxcbiAgZGVyaXZlR3JvdXBGaWVsZHMsXG4gIGdldFByZUpvaW5Hcm91cEluZm8sXG4gIGlkRm9yTG9nZ2luZyxcbiAgTElOS19WRVJTSU9OX0VSUk9SLFxuICBwYXJzZUdyb3VwTGluayxcbn0gZnJvbSAnLi4vZ3JvdXBzJztcbmltcG9ydCAqIGFzIEVycm9ycyBmcm9tICcuLi90eXBlcy9lcnJvcnMnO1xuaW1wb3J0ICogYXMgQnl0ZXMgZnJvbSAnLi4vQnl0ZXMnO1xuaW1wb3J0IHsgbG9uZ1J1bm5pbmdUYXNrV3JhcHBlciB9IGZyb20gJy4uL3V0aWwvbG9uZ1J1bm5pbmdUYXNrV3JhcHBlcic7XG5pbXBvcnQgeyBpc0dyb3VwVjEgfSBmcm9tICcuLi91dGlsL3doYXRUeXBlT2ZDb252ZXJzYXRpb24nO1xuaW1wb3J0IHsgZXhwbG9kZVByb21pc2UgfSBmcm9tICcuLi91dGlsL2V4cGxvZGVQcm9taXNlJztcblxuaW1wb3J0IHR5cGUgeyBDb252ZXJzYXRpb25BdHRyaWJ1dGVzVHlwZSB9IGZyb20gJy4uL21vZGVsLXR5cGVzLmQnO1xuaW1wb3J0IHR5cGUgeyBDb252ZXJzYXRpb25Nb2RlbCB9IGZyb20gJy4uL21vZGVscy9jb252ZXJzYXRpb25zJztcbmltcG9ydCB0eXBlIHsgUHJlSm9pbkNvbnZlcnNhdGlvblR5cGUgfSBmcm9tICcuLi9zdGF0ZS9kdWNrcy9jb252ZXJzYXRpb25zJztcbmltcG9ydCB7IFNpZ25hbFNlcnZpY2UgYXMgUHJvdG8gfSBmcm9tICcuLi9wcm90b2J1Zic7XG5pbXBvcnQgKiBhcyBsb2cgZnJvbSAnLi4vbG9nZ2luZy9sb2cnO1xuaW1wb3J0IHsgc2hvd1RvYXN0IH0gZnJvbSAnLi4vdXRpbC9zaG93VG9hc3QnO1xuaW1wb3J0IHsgUmVhY3RXcmFwcGVyVmlldyB9IGZyb20gJy4uL3ZpZXdzL1JlYWN0V3JhcHBlclZpZXcnO1xuaW1wb3J0IHsgRXJyb3JNb2RhbCB9IGZyb20gJy4uL2NvbXBvbmVudHMvRXJyb3JNb2RhbCc7XG5pbXBvcnQgeyBUb2FzdEFscmVhZHlHcm91cE1lbWJlciB9IGZyb20gJy4uL2NvbXBvbmVudHMvVG9hc3RBbHJlYWR5R3JvdXBNZW1iZXInO1xuaW1wb3J0IHsgVG9hc3RBbHJlYWR5UmVxdWVzdGVkVG9Kb2luIH0gZnJvbSAnLi4vY29tcG9uZW50cy9Ub2FzdEFscmVhZHlSZXF1ZXN0ZWRUb0pvaW4nO1xuaW1wb3J0IHsgSFRUUEVycm9yIH0gZnJvbSAnLi4vdGV4dHNlY3VyZS9FcnJvcnMnO1xuaW1wb3J0IHsgaXNBY2Nlc3NDb250cm9sRW5hYmxlZCB9IGZyb20gJy4vdXRpbCc7XG5pbXBvcnQgeyBzbGVlcCB9IGZyb20gJy4uL3V0aWwvc2xlZXAnO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gam9pblZpYUxpbmsoaGFzaDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gIGxldCBpbnZpdGVMaW5rUGFzc3dvcmQ6IHN0cmluZztcbiAgbGV0IG1hc3RlcktleTogc3RyaW5nO1xuICB0cnkge1xuICAgICh7IGludml0ZUxpbmtQYXNzd29yZCwgbWFzdGVyS2V5IH0gPSBwYXJzZUdyb3VwTGluayhoYXNoKSk7XG4gIH0gY2F0Y2ggKGVycm9yOiB1bmtub3duKSB7XG4gICAgY29uc3QgZXJyb3JTdHJpbmcgPSBFcnJvcnMudG9Mb2dGb3JtYXQoZXJyb3IpO1xuICAgIGxvZy5lcnJvcihgam9pblZpYUxpbms6IEZhaWxlZCB0byBwYXJzZSBncm91cCBsaW5rICR7ZXJyb3JTdHJpbmd9YCk7XG5cbiAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvciAmJiBlcnJvci5uYW1lID09PSBMSU5LX1ZFUlNJT05fRVJST1IpIHtcbiAgICAgIHNob3dFcnJvckRpYWxvZyhcbiAgICAgICAgd2luZG93LmkxOG4oJ0dyb3VwVjItLWpvaW4tLXVua25vd24tbGluay12ZXJzaW9uJyksXG4gICAgICAgIHdpbmRvdy5pMThuKCdHcm91cFYyLS1qb2luLS11bmtub3duLWxpbmstdmVyc2lvbi0tdGl0bGUnKVxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2hvd0Vycm9yRGlhbG9nKFxuICAgICAgICB3aW5kb3cuaTE4bignR3JvdXBWMi0tam9pbi0taW52YWxpZC1saW5rJyksXG4gICAgICAgIHdpbmRvdy5pMThuKCdHcm91cFYyLS1qb2luLS1pbnZhbGlkLWxpbmstLXRpdGxlJylcbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IGRhdGEgPSBkZXJpdmVHcm91cEZpZWxkcyhCeXRlcy5mcm9tQmFzZTY0KG1hc3RlcktleSkpO1xuICBjb25zdCBpZCA9IEJ5dGVzLnRvQmFzZTY0KGRhdGEuaWQpO1xuICBjb25zdCBsb2dJZCA9IGBncm91cHYyKCR7aWR9KWA7XG4gIGNvbnN0IHNlY3JldFBhcmFtcyA9IEJ5dGVzLnRvQmFzZTY0KGRhdGEuc2VjcmV0UGFyYW1zKTtcbiAgY29uc3QgcHVibGljUGFyYW1zID0gQnl0ZXMudG9CYXNlNjQoZGF0YS5wdWJsaWNQYXJhbXMpO1xuXG4gIGNvbnN0IGV4aXN0aW5nQ29udmVyc2F0aW9uID1cbiAgICB3aW5kb3cuQ29udmVyc2F0aW9uQ29udHJvbGxlci5nZXQoaWQpIHx8XG4gICAgd2luZG93LkNvbnZlcnNhdGlvbkNvbnRyb2xsZXIuZ2V0QnlEZXJpdmVkR3JvdXBWMklkKGlkKTtcbiAgY29uc3Qgb3VyQ29udmVyc2F0aW9uSWQgPVxuICAgIHdpbmRvdy5Db252ZXJzYXRpb25Db250cm9sbGVyLmdldE91ckNvbnZlcnNhdGlvbklkT3JUaHJvdygpO1xuXG4gIGlmIChcbiAgICBleGlzdGluZ0NvbnZlcnNhdGlvbiAmJlxuICAgIGV4aXN0aW5nQ29udmVyc2F0aW9uLmhhc01lbWJlcihvdXJDb252ZXJzYXRpb25JZClcbiAgKSB7XG4gICAgbG9nLndhcm4oXG4gICAgICBgam9pblZpYUxpbmsvJHtsb2dJZH06IEFscmVhZHkgYSBtZW1iZXIgb2YgZ3JvdXAsIG9wZW5pbmcgY29udmVyc2F0aW9uYFxuICAgICk7XG4gICAgd2luZG93LnJlZHV4QWN0aW9ucy5jb252ZXJzYXRpb25zLnNob3dDb252ZXJzYXRpb24oe1xuICAgICAgY29udmVyc2F0aW9uSWQ6IGV4aXN0aW5nQ29udmVyc2F0aW9uLmlkLFxuICAgIH0pO1xuICAgIHNob3dUb2FzdChUb2FzdEFscmVhZHlHcm91cE1lbWJlcik7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgbGV0IHJlc3VsdDogUHJvdG8uR3JvdXBKb2luSW5mbztcblxuICB0cnkge1xuICAgIHJlc3VsdCA9IGF3YWl0IGxvbmdSdW5uaW5nVGFza1dyYXBwZXIoe1xuICAgICAgbmFtZTogJ2dldFByZUpvaW5Hcm91cEluZm8nLFxuICAgICAgaWRGb3JMb2dnaW5nOiBpZEZvckxvZ2dpbmcoaWQpLFxuICAgICAgLy8gSWYgYW4gZXJyb3IgaGFwcGVucyBoZXJlLCB3ZSB3b24ndCBzaG93IGEgZGlhbG9nLiBXZSdsbCByZWx5IG9uIHRoZSBjYXRjaCBhIGZld1xuICAgICAgLy8gICBsaW5lcyBiZWxvdy5cbiAgICAgIHN1cHByZXNzRXJyb3JEaWFsb2c6IHRydWUsXG4gICAgICB0YXNrOiAoKSA9PiBnZXRQcmVKb2luR3JvdXBJbmZvKGludml0ZUxpbmtQYXNzd29yZCwgbWFzdGVyS2V5KSxcbiAgICB9KTtcbiAgfSBjYXRjaCAoZXJyb3I6IHVua25vd24pIHtcbiAgICBjb25zdCBlcnJvclN0cmluZyA9IEVycm9ycy50b0xvZ0Zvcm1hdChlcnJvcik7XG4gICAgbG9nLmVycm9yKFxuICAgICAgYGpvaW5WaWFMaW5rLyR7bG9nSWR9OiBGYWlsZWQgdG8gZmV0Y2ggZ3JvdXAgaW5mbyAtICR7ZXJyb3JTdHJpbmd9YFxuICAgICk7XG5cbiAgICBpZiAoXG4gICAgICBlcnJvciBpbnN0YW5jZW9mIEhUVFBFcnJvciAmJlxuICAgICAgZXJyb3IucmVzcG9uc2VIZWFkZXJzWyd4LXNpZ25hbC1mb3JiaWRkZW4tcmVhc29uJ11cbiAgICApIHtcbiAgICAgIHNob3dFcnJvckRpYWxvZyhcbiAgICAgICAgd2luZG93LmkxOG4oJ0dyb3VwVjItLWpvaW4tLWxpbmstZm9yYmlkZGVuJyksXG4gICAgICAgIHdpbmRvdy5pMThuKCdHcm91cFYyLS1qb2luLS1saW5rLWZvcmJpZGRlbi0tdGl0bGUnKVxuICAgICAgKTtcbiAgICB9IGVsc2UgaWYgKGVycm9yIGluc3RhbmNlb2YgSFRUUEVycm9yICYmIGVycm9yLmNvZGUgPT09IDQwMykge1xuICAgICAgc2hvd0Vycm9yRGlhbG9nKFxuICAgICAgICB3aW5kb3cuaTE4bignR3JvdXBWMi0tam9pbi0tbGluay1yZXZva2VkJyksXG4gICAgICAgIHdpbmRvdy5pMThuKCdHcm91cFYyLS1qb2luLS1saW5rLXJldm9rZWQtLXRpdGxlJylcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNob3dFcnJvckRpYWxvZyhcbiAgICAgICAgd2luZG93LmkxOG4oJ0dyb3VwVjItLWpvaW4tLWdlbmVyYWwtam9pbi1mYWlsdXJlJyksXG4gICAgICAgIHdpbmRvdy5pMThuKCdHcm91cFYyLS1qb2luLS1nZW5lcmFsLWpvaW4tZmFpbHVyZS0tdGl0bGUnKVxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKCFpc0FjY2Vzc0NvbnRyb2xFbmFibGVkKHJlc3VsdC5hZGRGcm9tSW52aXRlTGluaykpIHtcbiAgICBsb2cuZXJyb3IoXG4gICAgICBgam9pblZpYUxpbmsvJHtsb2dJZH06IGFkZEZyb21JbnZpdGVMaW5rIHZhbHVlIG9mICR7cmVzdWx0LmFkZEZyb21JbnZpdGVMaW5rfSBpcyBpbnZhbGlkYFxuICAgICk7XG4gICAgc2hvd0Vycm9yRGlhbG9nKFxuICAgICAgd2luZG93LmkxOG4oJ0dyb3VwVjItLWpvaW4tLWxpbmstcmV2b2tlZCcpLFxuICAgICAgd2luZG93LmkxOG4oJ0dyb3VwVjItLWpvaW4tLWxpbmstcmV2b2tlZC0tdGl0bGUnKVxuICAgICk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgbGV0IGxvY2FsQXZhdGFyOlxuICAgIHwge1xuICAgICAgICBsb2FkaW5nPzogYm9vbGVhbjtcbiAgICAgICAgcGF0aD86IHN0cmluZztcbiAgICAgIH1cbiAgICB8IHVuZGVmaW5lZCA9IHJlc3VsdC5hdmF0YXIgPyB7IGxvYWRpbmc6IHRydWUgfSA6IHVuZGVmaW5lZDtcbiAgY29uc3QgbWVtYmVyQ291bnQgPSByZXN1bHQubWVtYmVyQ291bnQgfHwgMTtcbiAgY29uc3QgYXBwcm92YWxSZXF1aXJlZCA9XG4gICAgcmVzdWx0LmFkZEZyb21JbnZpdGVMaW5rID09PVxuICAgIFByb3RvLkFjY2Vzc0NvbnRyb2wuQWNjZXNzUmVxdWlyZWQuQURNSU5JU1RSQVRPUjtcbiAgY29uc3QgdGl0bGUgPVxuICAgIGRlY3J5cHRHcm91cFRpdGxlKHJlc3VsdC50aXRsZSwgc2VjcmV0UGFyYW1zKSB8fFxuICAgIHdpbmRvdy5pMThuKCd1bmtub3duR3JvdXAnKTtcbiAgY29uc3QgZ3JvdXBEZXNjcmlwdGlvbiA9IGRlY3J5cHRHcm91cERlc2NyaXB0aW9uKFxuICAgIHJlc3VsdC5kZXNjcmlwdGlvbkJ5dGVzLFxuICAgIHNlY3JldFBhcmFtc1xuICApO1xuXG4gIGlmIChcbiAgICBhcHByb3ZhbFJlcXVpcmVkICYmXG4gICAgZXhpc3RpbmdDb252ZXJzYXRpb24gJiZcbiAgICBleGlzdGluZ0NvbnZlcnNhdGlvbi5pc01lbWJlckF3YWl0aW5nQXBwcm92YWwob3VyQ29udmVyc2F0aW9uSWQpXG4gICkge1xuICAgIGxvZy53YXJuKFxuICAgICAgYGpvaW5WaWFMaW5rLyR7bG9nSWR9OiBBbHJlYWR5IGF3YWl0aW5nIGFwcHJvdmFsLCBvcGVuaW5nIGNvbnZlcnNhdGlvbmBcbiAgICApO1xuICAgIGNvbnN0IHRpbWVzdGFtcCA9IGV4aXN0aW5nQ29udmVyc2F0aW9uLmdldCgndGltZXN0YW1wJykgfHwgRGF0ZS5ub3coKTtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY2FtZWxjYXNlXG4gICAgY29uc3QgYWN0aXZlX2F0ID0gZXhpc3RpbmdDb252ZXJzYXRpb24uZ2V0KCdhY3RpdmVfYXQnKSB8fCBEYXRlLm5vdygpO1xuICAgIGV4aXN0aW5nQ29udmVyc2F0aW9uLnNldCh7IGFjdGl2ZV9hdCwgdGltZXN0YW1wIH0pO1xuICAgIHdpbmRvdy5TaWduYWwuRGF0YS51cGRhdGVDb252ZXJzYXRpb24oZXhpc3RpbmdDb252ZXJzYXRpb24uYXR0cmlidXRlcyk7XG5cbiAgICAvLyBXZSdyZSB3YWl0aW5nIGZvciB0aGUgbGVmdCBwYW5lIHRvIHJlLXNvcnQgYmVmb3JlIHdlIG5hdmlnYXRlIHRvIHRoYXQgY29udmVyc2F0aW9uXG4gICAgYXdhaXQgc2xlZXAoMjAwKTtcblxuICAgIHdpbmRvdy5yZWR1eEFjdGlvbnMuY29udmVyc2F0aW9ucy5zaG93Q29udmVyc2F0aW9uKHtcbiAgICAgIGNvbnZlcnNhdGlvbklkOiBleGlzdGluZ0NvbnZlcnNhdGlvbi5pZCxcbiAgICB9KTtcblxuICAgIHNob3dUb2FzdChUb2FzdEFscmVhZHlSZXF1ZXN0ZWRUb0pvaW4pO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IGdldFByZUpvaW5Db252ZXJzYXRpb24gPSAoKTogUHJlSm9pbkNvbnZlcnNhdGlvblR5cGUgPT4ge1xuICAgIGxldCBhdmF0YXI7XG4gICAgaWYgKCFsb2NhbEF2YXRhcikge1xuICAgICAgYXZhdGFyID0gdW5kZWZpbmVkO1xuICAgIH0gZWxzZSBpZiAobG9jYWxBdmF0YXIgJiYgbG9jYWxBdmF0YXIubG9hZGluZykge1xuICAgICAgYXZhdGFyID0ge1xuICAgICAgICBsb2FkaW5nOiB0cnVlLFxuICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKGxvY2FsQXZhdGFyICYmIGxvY2FsQXZhdGFyLnBhdGgpIHtcbiAgICAgIGF2YXRhciA9IHtcbiAgICAgICAgdXJsOiB3aW5kb3cuU2lnbmFsLk1pZ3JhdGlvbnMuZ2V0QWJzb2x1dGVBdHRhY2htZW50UGF0aChcbiAgICAgICAgICBsb2NhbEF2YXRhci5wYXRoXG4gICAgICAgICksXG4gICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBhcHByb3ZhbFJlcXVpcmVkLFxuICAgICAgYXZhdGFyLFxuICAgICAgZ3JvdXBEZXNjcmlwdGlvbixcbiAgICAgIG1lbWJlckNvdW50LFxuICAgICAgdGl0bGUsXG4gICAgfTtcbiAgfTtcblxuICAvLyBFeHBsb2RlIGEgcHJvbWlzZSBzbyB3ZSBrbm93IHdoZW4gdGhpcyB3aG9sZSBqb2luIHByb2Nlc3MgaXMgY29tcGxldGVcbiAgY29uc3QgeyBwcm9taXNlLCByZXNvbHZlLCByZWplY3QgfSA9IGV4cGxvZGVQcm9taXNlPHZvaWQ+KCk7XG5cbiAgY29uc3QgY2xvc2VEaWFsb2cgPSBhc3luYyAoKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGlmIChncm91cFYySW5mb0RpYWxvZykge1xuICAgICAgICBncm91cFYySW5mb0RpYWxvZy5yZW1vdmUoKTtcbiAgICAgICAgZ3JvdXBWMkluZm9EaWFsb2cgPSB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICAgIHdpbmRvdy5yZWR1eEFjdGlvbnMuY29udmVyc2F0aW9ucy5zZXRQcmVKb2luQ29udmVyc2F0aW9uKHVuZGVmaW5lZCk7XG5cbiAgICAgIGlmIChsb2NhbEF2YXRhciAmJiBsb2NhbEF2YXRhci5wYXRoKSB7XG4gICAgICAgIGF3YWl0IHdpbmRvdy5TaWduYWwuTWlncmF0aW9ucy5kZWxldGVBdHRhY2htZW50RGF0YShsb2NhbEF2YXRhci5wYXRoKTtcbiAgICAgIH1cbiAgICAgIHJlc29sdmUoKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3Qgam9pbiA9IGFzeW5jICgpID0+IHtcbiAgICB0cnkge1xuICAgICAgaWYgKGdyb3VwVjJJbmZvRGlhbG9nKSB7XG4gICAgICAgIGdyb3VwVjJJbmZvRGlhbG9nLnJlbW92ZSgpO1xuICAgICAgICBncm91cFYySW5mb0RpYWxvZyA9IHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgICAgd2luZG93LnJlZHV4QWN0aW9ucy5jb252ZXJzYXRpb25zLnNldFByZUpvaW5Db252ZXJzYXRpb24odW5kZWZpbmVkKTtcblxuICAgICAgYXdhaXQgbG9uZ1J1bm5pbmdUYXNrV3JhcHBlcih7XG4gICAgICAgIG5hbWU6ICdqb2luVmlhTGluaycsXG4gICAgICAgIGlkRm9yTG9nZ2luZzogaWRGb3JMb2dnaW5nKGlkKSxcbiAgICAgICAgLy8gSWYgYW4gZXJyb3IgaGFwcGVucyBoZXJlLCB3ZSB3b24ndCBzaG93IGEgZGlhbG9nLiBXZSdsbCByZWx5IG9uIGEgdG9wLWxldmVsXG4gICAgICAgIC8vICAgZXJyb3IgZGlhbG9nIHByb3ZpZGVkIGJ5IHRoZSBjYWxsZXIgb2YgdGhpcyBmdW5jdGlvbi5cbiAgICAgICAgc3VwcHJlc3NFcnJvckRpYWxvZzogdHJ1ZSxcbiAgICAgICAgdGFzazogYXN5bmMgKCkgPT4ge1xuICAgICAgICAgIGxldCB0YXJnZXRDb252ZXJzYXRpb24gPVxuICAgICAgICAgICAgZXhpc3RpbmdDb252ZXJzYXRpb24gfHxcbiAgICAgICAgICAgIHdpbmRvdy5Db252ZXJzYXRpb25Db250cm9sbGVyLmdldChpZCkgfHxcbiAgICAgICAgICAgIHdpbmRvdy5Db252ZXJzYXRpb25Db250cm9sbGVyLmdldEJ5RGVyaXZlZEdyb3VwVjJJZChpZCk7XG4gICAgICAgICAgbGV0IHRlbXBDb252ZXJzYXRpb246IENvbnZlcnNhdGlvbk1vZGVsIHwgdW5kZWZpbmVkO1xuXG4gICAgICAgICAgLy8gQ2hlY2sgYWdhaW4gdG8gZW5zdXJlIHRoYXQgd2UgaGF2ZW4ndCBhbHJlYWR5IGpvaW5lZCBvciByZXF1ZXN0ZWQgdG8gam9pblxuICAgICAgICAgIC8vICAgdmlhIHNvbWUgb3RoZXIgcHJvY2Vzcy4gSWYgc28sIGp1c3Qgb3BlbiB0aGF0IGNvbnZlcnNhdGlvbi5cbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICB0YXJnZXRDb252ZXJzYXRpb24gJiZcbiAgICAgICAgICAgICh0YXJnZXRDb252ZXJzYXRpb24uaGFzTWVtYmVyKG91ckNvbnZlcnNhdGlvbklkKSB8fFxuICAgICAgICAgICAgICAoYXBwcm92YWxSZXF1aXJlZCAmJlxuICAgICAgICAgICAgICAgIHRhcmdldENvbnZlcnNhdGlvbi5pc01lbWJlckF3YWl0aW5nQXBwcm92YWwob3VyQ29udmVyc2F0aW9uSWQpKSlcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIGxvZy53YXJuKFxuICAgICAgICAgICAgICBgam9pblZpYUxpbmsvJHtsb2dJZH06IFVzZXIgaXMgcGFydCBvZiBncm91cCBvbiBzZWNvbmQgY2hlY2ssIG9wZW5pbmcgY29udmVyc2F0aW9uYFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHdpbmRvdy5yZWR1eEFjdGlvbnMuY29udmVyc2F0aW9ucy5zaG93Q29udmVyc2F0aW9uKHtcbiAgICAgICAgICAgICAgY29udmVyc2F0aW9uSWQ6IHRhcmdldENvbnZlcnNhdGlvbi5pZCxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAoIXRhcmdldENvbnZlcnNhdGlvbikge1xuICAgICAgICAgICAgICAvLyBOb3RlOiB3ZSBzYXZlIHRoaXMgdGVtcCBjb252ZXJzYXRpb24gaW4gdGhlIGRhdGFiYXNlLCBzbyB3ZSdsbCBuZWVkIHRvXG4gICAgICAgICAgICAgIC8vICAgY2xlYW4gaXQgdXAgaWYgc29tZXRoaW5nIGdvZXMgd3JvbmdcbiAgICAgICAgICAgICAgdGVtcENvbnZlcnNhdGlvbiA9IHdpbmRvdy5Db252ZXJzYXRpb25Db250cm9sbGVyLmdldE9yQ3JlYXRlKFxuICAgICAgICAgICAgICAgIGlkLFxuICAgICAgICAgICAgICAgICdncm91cCcsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgLy8gVGhpcyB3aWxsIGNhdXNlIHRoaXMgY29udmVyc2F0aW9uIHRvIGJlIGRlbGV0ZWQgYXQgbmV4dCBzdGFydHVwXG4gICAgICAgICAgICAgICAgICBpc1RlbXBvcmFyeTogdHJ1ZSxcblxuICAgICAgICAgICAgICAgICAgYWN0aXZlX2F0OiBEYXRlLm5vdygpLFxuICAgICAgICAgICAgICAgICAgdGltZXN0YW1wOiBEYXRlLm5vdygpLFxuXG4gICAgICAgICAgICAgICAgICBncm91cFZlcnNpb246IDIsXG4gICAgICAgICAgICAgICAgICBtYXN0ZXJLZXksXG4gICAgICAgICAgICAgICAgICBzZWNyZXRQYXJhbXMsXG4gICAgICAgICAgICAgICAgICBwdWJsaWNQYXJhbXMsXG5cbiAgICAgICAgICAgICAgICAgIGxlZnQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICByZXZpc2lvbjogcmVzdWx0LnZlcnNpb24sXG5cbiAgICAgICAgICAgICAgICAgIGF2YXRhcjpcbiAgICAgICAgICAgICAgICAgICAgbG9jYWxBdmF0YXIgJiYgbG9jYWxBdmF0YXIucGF0aCAmJiByZXN1bHQuYXZhdGFyXG4gICAgICAgICAgICAgICAgICAgICAgPyB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHVybDogcmVzdWx0LmF2YXRhcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcGF0aDogbG9jYWxBdmF0YXIucGF0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICA6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBncm91cERlc2NyaXB0aW9uLFxuICAgICAgICAgICAgICAgICAgZ3JvdXBJbnZpdGVMaW5rUGFzc3dvcmQ6IGludml0ZUxpbmtQYXNzd29yZCxcbiAgICAgICAgICAgICAgICAgIG5hbWU6IHRpdGxlLFxuICAgICAgICAgICAgICAgICAgdGVtcG9yYXJ5TWVtYmVyQ291bnQ6IG1lbWJlckNvdW50LFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgdGFyZ2V0Q29udmVyc2F0aW9uID0gdGVtcENvbnZlcnNhdGlvbjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIC8vIEVuc3VyZSB0aGUgZ3JvdXAgbWFpbnRhaW5zIHRoZSB0aXRsZSBhbmQgYXZhdGFyIHlvdSBzYXcgd2hlbiBhdHRlbXB0aW5nXG4gICAgICAgICAgICAgIC8vICAgdG8gam9pbiBpdC5cbiAgICAgICAgICAgICAgY29uc3QgdGltZXN0YW1wID1cbiAgICAgICAgICAgICAgICB0YXJnZXRDb252ZXJzYXRpb24uZ2V0KCd0aW1lc3RhbXAnKSB8fCBEYXRlLm5vdygpO1xuICAgICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY2FtZWxjYXNlXG4gICAgICAgICAgICAgIGNvbnN0IGFjdGl2ZV9hdCA9XG4gICAgICAgICAgICAgICAgdGFyZ2V0Q29udmVyc2F0aW9uLmdldCgnYWN0aXZlX2F0JykgfHwgRGF0ZS5ub3coKTtcbiAgICAgICAgICAgICAgdGFyZ2V0Q29udmVyc2F0aW9uLnNldCh7XG4gICAgICAgICAgICAgICAgYWN0aXZlX2F0LFxuICAgICAgICAgICAgICAgIGF2YXRhcjpcbiAgICAgICAgICAgICAgICAgIGxvY2FsQXZhdGFyICYmIGxvY2FsQXZhdGFyLnBhdGggJiYgcmVzdWx0LmF2YXRhclxuICAgICAgICAgICAgICAgICAgICA/IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogcmVzdWx0LmF2YXRhcixcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhdGg6IGxvY2FsQXZhdGFyLnBhdGgsXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICA6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogZ3JvdXBEZXNjcmlwdGlvbixcbiAgICAgICAgICAgICAgICBncm91cEludml0ZUxpbmtQYXNzd29yZDogaW52aXRlTGlua1Bhc3N3b3JkLFxuICAgICAgICAgICAgICAgIG5hbWU6IHRpdGxlLFxuICAgICAgICAgICAgICAgIHJldmlzaW9uOiByZXN1bHQudmVyc2lvbixcbiAgICAgICAgICAgICAgICB0ZW1wb3JhcnlNZW1iZXJDb3VudDogbWVtYmVyQ291bnQsXG4gICAgICAgICAgICAgICAgdGltZXN0YW1wLFxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgd2luZG93LlNpZ25hbC5EYXRhLnVwZGF0ZUNvbnZlcnNhdGlvbihcbiAgICAgICAgICAgICAgICB0YXJnZXRDb252ZXJzYXRpb24uYXR0cmlidXRlc1xuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoaXNHcm91cFYxKHRhcmdldENvbnZlcnNhdGlvbi5hdHRyaWJ1dGVzKSkge1xuICAgICAgICAgICAgICBhd2FpdCB0YXJnZXRDb252ZXJzYXRpb24uam9pbkdyb3VwVjJWaWFMaW5rQW5kTWlncmF0ZSh7XG4gICAgICAgICAgICAgICAgYXBwcm92YWxSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICBpbnZpdGVMaW5rUGFzc3dvcmQsXG4gICAgICAgICAgICAgICAgcmV2aXNpb246IHJlc3VsdC52ZXJzaW9uIHx8IDAsXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgYXdhaXQgdGFyZ2V0Q29udmVyc2F0aW9uLmpvaW5Hcm91cFYyVmlhTGluayh7XG4gICAgICAgICAgICAgICAgaW52aXRlTGlua1Bhc3N3b3JkLFxuICAgICAgICAgICAgICAgIGFwcHJvdmFsUmVxdWlyZWQsXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGVtcENvbnZlcnNhdGlvbikge1xuICAgICAgICAgICAgICB0ZW1wQ29udmVyc2F0aW9uLnNldCh7XG4gICAgICAgICAgICAgICAgLy8gV2Ugd2FudCB0byBrZWVwIHRoaXMgY29udmVyc2F0aW9uIGFyb3VuZCwgc2luY2UgdGhlIGpvaW4gc3VjY2VlZGVkXG4gICAgICAgICAgICAgICAgaXNUZW1wb3Jhcnk6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHdpbmRvdy5TaWduYWwuRGF0YS51cGRhdGVDb252ZXJzYXRpb24oXG4gICAgICAgICAgICAgICAgdGVtcENvbnZlcnNhdGlvbi5hdHRyaWJ1dGVzXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHdpbmRvdy5yZWR1eEFjdGlvbnMuY29udmVyc2F0aW9ucy5zaG93Q29udmVyc2F0aW9uKHtcbiAgICAgICAgICAgICAgY29udmVyc2F0aW9uSWQ6IHRhcmdldENvbnZlcnNhdGlvbi5pZCxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAvLyBEZWxldGUgbmV3bHktY3JlYXRlZCBjb252ZXJzYXRpb24gaWYgd2UgZW5jb3VudGVyZWQgYW55IGVycm9yc1xuICAgICAgICAgICAgaWYgKHRlbXBDb252ZXJzYXRpb24pIHtcbiAgICAgICAgICAgICAgd2luZG93LkNvbnZlcnNhdGlvbkNvbnRyb2xsZXIuZGFuZ2Vyb3VzbHlSZW1vdmVCeUlkKFxuICAgICAgICAgICAgICAgIHRlbXBDb252ZXJzYXRpb24uaWRcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgYXdhaXQgd2luZG93LlNpZ25hbC5EYXRhLnJlbW92ZUNvbnZlcnNhdGlvbih0ZW1wQ29udmVyc2F0aW9uLmlkKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgICByZXNvbHZlKCk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHJlamVjdChlcnJvcik7XG4gICAgfVxuICB9O1xuXG4gIC8vIEluaXRpYWwgYWRkIHRvIHJlZHV4LCB3aXRoIGJhc2ljIGdyb3VwIGluZm9ybWF0aW9uXG4gIHdpbmRvdy5yZWR1eEFjdGlvbnMuY29udmVyc2F0aW9ucy5zZXRQcmVKb2luQ29udmVyc2F0aW9uKFxuICAgIGdldFByZUpvaW5Db252ZXJzYXRpb24oKVxuICApO1xuXG4gIGxvZy5pbmZvKGBqb2luVmlhTGluay8ke2xvZ0lkfTogU2hvd2luZyBtb2RhbGApO1xuXG4gIGxldCBncm91cFYySW5mb0RpYWxvZzogQmFja2JvbmUuVmlldyB8IHVuZGVmaW5lZCA9IG5ldyBSZWFjdFdyYXBwZXJWaWV3KHtcbiAgICBjbGFzc05hbWU6ICdncm91cC12Mi1qb2luLWRpYWxvZy13cmFwcGVyJyxcbiAgICBKU1g6IHdpbmRvdy5TaWduYWwuU3RhdGUuUm9vdHMuY3JlYXRlR3JvdXBWMkpvaW5Nb2RhbCh3aW5kb3cucmVkdXhTdG9yZSwge1xuICAgICAgam9pbixcbiAgICAgIG9uQ2xvc2U6IGNsb3NlRGlhbG9nLFxuICAgIH0pLFxuICB9KTtcblxuICAvLyBXZSBkZWNsYXJlIGEgbmV3IGZ1bmN0aW9uIGhlcmUgc28gd2UgY2FuIGF3YWl0IGJ1dCBub3QgYmxvY2tcbiAgY29uc3QgZmV0Y2hBdmF0YXIgPSBhc3luYyAoKSA9PiB7XG4gICAgaWYgKHJlc3VsdC5hdmF0YXIpIHtcbiAgICAgIGxvY2FsQXZhdGFyID0ge1xuICAgICAgICBsb2FkaW5nOiB0cnVlLFxuICAgICAgfTtcblxuICAgICAgY29uc3QgYXR0cmlidXRlczogUGljazxcbiAgICAgICAgQ29udmVyc2F0aW9uQXR0cmlidXRlc1R5cGUsXG4gICAgICAgICdhdmF0YXInIHwgJ3NlY3JldFBhcmFtcydcbiAgICAgID4gPSB7XG4gICAgICAgIGF2YXRhcjogbnVsbCxcbiAgICAgICAgc2VjcmV0UGFyYW1zLFxuICAgICAgfTtcbiAgICAgIGF3YWl0IGFwcGx5TmV3QXZhdGFyKHJlc3VsdC5hdmF0YXIsIGF0dHJpYnV0ZXMsIGxvZ0lkKTtcblxuICAgICAgaWYgKGF0dHJpYnV0ZXMuYXZhdGFyICYmIGF0dHJpYnV0ZXMuYXZhdGFyLnBhdGgpIHtcbiAgICAgICAgbG9jYWxBdmF0YXIgPSB7XG4gICAgICAgICAgcGF0aDogYXR0cmlidXRlcy5hdmF0YXIucGF0aCxcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBEaWFsb2cgaGFzIGJlZW4gZGlzbWlzc2VkOyB3ZSdsbCBkZWxldGUgdGhlIHVubmVlZWRlZCBhdmF0YXJcbiAgICAgICAgaWYgKCFncm91cFYySW5mb0RpYWxvZykge1xuICAgICAgICAgIGF3YWl0IHdpbmRvdy5TaWduYWwuTWlncmF0aW9ucy5kZWxldGVBdHRhY2htZW50RGF0YShcbiAgICAgICAgICAgIGF0dHJpYnV0ZXMuYXZhdGFyLnBhdGhcbiAgICAgICAgICApO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbG9jYWxBdmF0YXIgPSB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICAgIC8vIFVwZGF0ZSBqb2luIGRpYWxvZyB3aXRoIG5ld2x5LWRvd25sb2FkZWQgYXZhdGFyXG4gICAgICB3aW5kb3cucmVkdXhBY3Rpb25zLmNvbnZlcnNhdGlvbnMuc2V0UHJlSm9pbkNvbnZlcnNhdGlvbihcbiAgICAgICAgZ2V0UHJlSm9pbkNvbnZlcnNhdGlvbigpXG4gICAgICApO1xuICAgIH1cbiAgfTtcblxuICBmZXRjaEF2YXRhcigpO1xuXG4gIGF3YWl0IHByb21pc2U7XG59XG5cbmZ1bmN0aW9uIHNob3dFcnJvckRpYWxvZyhkZXNjcmlwdGlvbjogc3RyaW5nLCB0aXRsZTogc3RyaW5nKSB7XG4gIGNvbnN0IGVycm9yVmlldyA9IG5ldyBSZWFjdFdyYXBwZXJWaWV3KHtcbiAgICBjbGFzc05hbWU6ICdlcnJvci1tb2RhbC13cmFwcGVyJyxcbiAgICBKU1g6IChcbiAgICAgIDxFcnJvck1vZGFsXG4gICAgICAgIGkxOG49e3dpbmRvdy5pMThufVxuICAgICAgICB0aXRsZT17dGl0bGV9XG4gICAgICAgIGRlc2NyaXB0aW9uPXtkZXNjcmlwdGlvbn1cbiAgICAgICAgb25DbG9zZT17KCkgPT4ge1xuICAgICAgICAgIGVycm9yVmlldy5yZW1vdmUoKTtcbiAgICAgICAgfX1cbiAgICAgIC8+XG4gICAgKSxcbiAgfSk7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsWUFBdUI7QUFDdkIsb0JBU087QUFDUCxhQUF3QjtBQUN4QixZQUF1QjtBQUN2QixvQ0FBdUM7QUFDdkMsb0NBQTBCO0FBQzFCLDRCQUErQjtBQUsvQixzQkFBdUM7QUFDdkMsVUFBcUI7QUFDckIsdUJBQTBCO0FBQzFCLDhCQUFpQztBQUNqQyx3QkFBMkI7QUFDM0IscUNBQXdDO0FBQ3hDLHlDQUE0QztBQUM1QyxvQkFBMEI7QUFDMUIsa0JBQXVDO0FBQ3ZDLG1CQUFzQjtBQUV0QiwyQkFBa0MsTUFBNkI7QUFDN0QsTUFBSTtBQUNKLE1BQUk7QUFDSixNQUFJO0FBQ0YsSUFBQyxHQUFFLG9CQUFvQixVQUFVLElBQUksa0NBQWUsSUFBSTtBQUFBLEVBQzFELFNBQVMsT0FBUDtBQUNBLFVBQU0sY0FBYyxPQUFPLFlBQVksS0FBSztBQUM1QyxRQUFJLE1BQU0sMkNBQTJDLGFBQWE7QUFFbEUsUUFBSSxpQkFBaUIsU0FBUyxNQUFNLFNBQVMsa0NBQW9CO0FBQy9ELHNCQUNFLE9BQU8sS0FBSyxxQ0FBcUMsR0FDakQsT0FBTyxLQUFLLDRDQUE0QyxDQUMxRDtBQUFB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
