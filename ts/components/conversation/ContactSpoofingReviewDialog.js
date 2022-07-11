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
var ContactSpoofingReviewDialog_exports = {};
__export(ContactSpoofingReviewDialog_exports, {
  ContactSpoofingReviewDialog: () => ContactSpoofingReviewDialog
});
module.exports = __toCommonJS(ContactSpoofingReviewDialog_exports);
var import_react = __toESM(require("react"));
var import_lodash = require("lodash");
var import_MessageRequestActionsConfirmation = require("./MessageRequestActionsConfirmation");
var import_contactSpoofing = require("../../util/contactSpoofing");
var import_Modal = require("../Modal");
var import_RemoveGroupMemberConfirmationDialog = require("./RemoveGroupMemberConfirmationDialog");
var import_ContactSpoofingReviewDialogPerson = require("./ContactSpoofingReviewDialogPerson");
var import_Button = require("../Button");
var import_Intl = require("../Intl");
var import_Emojify = require("./Emojify");
var import_assert = require("../../util/assert");
var import_missingCaseError = require("../../util/missingCaseError");
var import_isInSystemContacts = require("../../util/isInSystemContacts");
var ConfirmationStateType = /* @__PURE__ */ ((ConfirmationStateType2) => {
  ConfirmationStateType2[ConfirmationStateType2["ConfirmingDelete"] = 0] = "ConfirmingDelete";
  ConfirmationStateType2[ConfirmationStateType2["ConfirmingBlock"] = 1] = "ConfirmingBlock";
  ConfirmationStateType2[ConfirmationStateType2["ConfirmingGroupRemoval"] = 2] = "ConfirmingGroupRemoval";
  return ConfirmationStateType2;
})(ConfirmationStateType || {});
const ContactSpoofingReviewDialog = /* @__PURE__ */ __name((props) => {
  const {
    getPreferredBadge,
    i18n,
    onBlock,
    onBlockAndReportSpam,
    onClose,
    onDelete,
    onShowContactModal,
    onUnblock,
    removeMember,
    theme
  } = props;
  const [confirmationState, setConfirmationState] = (0, import_react.useState)();
  if (confirmationState) {
    const { type, affectedConversation } = confirmationState;
    switch (type) {
      case 0 /* ConfirmingDelete */:
      case 1 /* ConfirmingBlock */:
        return /* @__PURE__ */ import_react.default.createElement(import_MessageRequestActionsConfirmation.MessageRequestActionsConfirmation, {
          i18n,
          onBlock: () => {
            onBlock(affectedConversation.id);
          },
          onBlockAndReportSpam: () => {
            onBlockAndReportSpam(affectedConversation.id);
          },
          onUnblock: () => {
            onUnblock(affectedConversation.id);
          },
          onDelete: () => {
            onDelete(affectedConversation.id);
          },
          title: affectedConversation.title,
          conversationType: "direct",
          state: type === 0 /* ConfirmingDelete */ ? import_MessageRequestActionsConfirmation.MessageRequestState.deleting : import_MessageRequestActionsConfirmation.MessageRequestState.blocking,
          onChangeState: (messageRequestState) => {
            switch (messageRequestState) {
              case import_MessageRequestActionsConfirmation.MessageRequestState.blocking:
                setConfirmationState({
                  type: 1 /* ConfirmingBlock */,
                  affectedConversation
                });
                break;
              case import_MessageRequestActionsConfirmation.MessageRequestState.deleting:
                setConfirmationState({
                  type: 0 /* ConfirmingDelete */,
                  affectedConversation
                });
                break;
              case import_MessageRequestActionsConfirmation.MessageRequestState.unblocking:
                (0, import_assert.assert)(false, "Got unexpected MessageRequestState.unblocking state. Clearing confiration state");
                setConfirmationState(void 0);
                break;
              case import_MessageRequestActionsConfirmation.MessageRequestState.default:
                setConfirmationState(void 0);
                break;
              default:
                throw (0, import_missingCaseError.missingCaseError)(messageRequestState);
            }
          }
        });
      case 2 /* ConfirmingGroupRemoval */: {
        const { group } = confirmationState;
        return /* @__PURE__ */ import_react.default.createElement(import_RemoveGroupMemberConfirmationDialog.RemoveGroupMemberConfirmationDialog, {
          conversation: affectedConversation,
          group,
          i18n,
          onClose: () => {
            setConfirmationState(void 0);
          },
          onRemove: () => {
            removeMember(affectedConversation.id);
          }
        });
      }
      default:
        throw (0, import_missingCaseError.missingCaseError)(type);
    }
  }
  let title;
  let contents;
  switch (props.type) {
    case import_contactSpoofing.ContactSpoofingType.DirectConversationWithSameTitle: {
      const { possiblyUnsafeConversation, safeConversation } = props;
      (0, import_assert.assert)(possiblyUnsafeConversation.type === "direct", '<ContactSpoofingReviewDialog> expected a direct conversation for the "possibly unsafe" conversation');
      (0, import_assert.assert)(safeConversation.type === "direct", '<ContactSpoofingReviewDialog> expected a direct conversation for the "safe" conversation');
      title = i18n("ContactSpoofingReviewDialog__title");
      contents = /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement("p", null, i18n("ContactSpoofingReviewDialog__description")), /* @__PURE__ */ import_react.default.createElement("h2", null, i18n("ContactSpoofingReviewDialog__possibly-unsafe-title")), /* @__PURE__ */ import_react.default.createElement(import_ContactSpoofingReviewDialogPerson.ContactSpoofingReviewDialogPerson, {
        conversation: possiblyUnsafeConversation,
        getPreferredBadge,
        i18n,
        theme
      }, /* @__PURE__ */ import_react.default.createElement("div", {
        className: "module-ContactSpoofingReviewDialog__buttons"
      }, /* @__PURE__ */ import_react.default.createElement(import_Button.Button, {
        variant: import_Button.ButtonVariant.SecondaryDestructive,
        onClick: () => {
          setConfirmationState({
            type: 0 /* ConfirmingDelete */,
            affectedConversation: possiblyUnsafeConversation
          });
        }
      }, i18n("MessageRequests--delete")), /* @__PURE__ */ import_react.default.createElement(import_Button.Button, {
        variant: import_Button.ButtonVariant.SecondaryDestructive,
        onClick: () => {
          setConfirmationState({
            type: 1 /* ConfirmingBlock */,
            affectedConversation: possiblyUnsafeConversation
          });
        }
      }, i18n("MessageRequests--block")))), /* @__PURE__ */ import_react.default.createElement("hr", null), /* @__PURE__ */ import_react.default.createElement("h2", null, i18n("ContactSpoofingReviewDialog__safe-title")), /* @__PURE__ */ import_react.default.createElement(import_ContactSpoofingReviewDialogPerson.ContactSpoofingReviewDialogPerson, {
        conversation: safeConversation,
        getPreferredBadge,
        i18n,
        onClick: () => {
          onShowContactModal(safeConversation.id);
        },
        theme
      }));
      break;
    }
    case import_contactSpoofing.ContactSpoofingType.MultipleGroupMembersWithSameTitle: {
      const { group, collisionInfoByTitle } = props;
      const unsortedConversationInfos = (0, import_lodash.concat)([], ...Object.values(collisionInfoByTitle));
      const conversationInfos = (0, import_lodash.orderBy)(unsortedConversationInfos, [
        "title",
        "id"
      ]);
      title = i18n("ContactSpoofingReviewDialog__group__title");
      contents = /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement("p", null, i18n("ContactSpoofingReviewDialog__group__description", [
        conversationInfos.length.toString()
      ])), /* @__PURE__ */ import_react.default.createElement("h2", null, i18n("ContactSpoofingReviewDialog__group__members-header")), conversationInfos.map((conversationInfo, index) => {
        let button;
        if (group.areWeAdmin) {
          button = /* @__PURE__ */ import_react.default.createElement(import_Button.Button, {
            variant: import_Button.ButtonVariant.SecondaryAffirmative,
            onClick: () => {
              setConfirmationState({
                type: 2 /* ConfirmingGroupRemoval */,
                affectedConversation: conversationInfo.conversation,
                group
              });
            }
          }, i18n("RemoveGroupMemberConfirmation__remove-button"));
        } else if (conversationInfo.conversation.isBlocked) {
          button = /* @__PURE__ */ import_react.default.createElement(import_Button.Button, {
            variant: import_Button.ButtonVariant.SecondaryAffirmative,
            onClick: () => {
              onUnblock(conversationInfo.conversation.id);
            }
          }, i18n("MessageRequests--unblock"));
        } else if (!(0, import_isInSystemContacts.isInSystemContacts)(conversationInfo.conversation)) {
          button = /* @__PURE__ */ import_react.default.createElement(import_Button.Button, {
            variant: import_Button.ButtonVariant.SecondaryDestructive,
            onClick: () => {
              setConfirmationState({
                type: 1 /* ConfirmingBlock */,
                affectedConversation: conversationInfo.conversation
              });
            }
          }, i18n("MessageRequests--block"));
        }
        const { oldName } = conversationInfo;
        const newName = conversationInfo.conversation.profileName || conversationInfo.conversation.title;
        return /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, index !== 0 && /* @__PURE__ */ import_react.default.createElement("hr", null), /* @__PURE__ */ import_react.default.createElement(import_ContactSpoofingReviewDialogPerson.ContactSpoofingReviewDialogPerson, {
          key: conversationInfo.conversation.id,
          conversation: conversationInfo.conversation,
          getPreferredBadge,
          i18n,
          theme
        }, Boolean(oldName) && oldName !== newName && /* @__PURE__ */ import_react.default.createElement("div", {
          className: "module-ContactSpoofingReviewDialogPerson__info__property module-ContactSpoofingReviewDialogPerson__info__property--callout"
        }, /* @__PURE__ */ import_react.default.createElement(import_Intl.Intl, {
          i18n,
          id: "ContactSpoofingReviewDialog__group__name-change-info",
          components: {
            oldName: /* @__PURE__ */ import_react.default.createElement(import_Emojify.Emojify, {
              text: oldName
            }),
            newName: /* @__PURE__ */ import_react.default.createElement(import_Emojify.Emojify, {
              text: newName
            })
          }
        })), button && /* @__PURE__ */ import_react.default.createElement("div", {
          className: "module-ContactSpoofingReviewDialog__buttons"
        }, button)));
      }));
      break;
    }
    default:
      throw (0, import_missingCaseError.missingCaseError)(props);
  }
  return /* @__PURE__ */ import_react.default.createElement(import_Modal.Modal, {
    hasXButton: true,
    i18n,
    moduleClassName: "module-ContactSpoofingReviewDialog",
    onClose,
    title
  }, contents);
}, "ContactSpoofingReviewDialog");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ContactSpoofingReviewDialog
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ29udGFjdFNwb29maW5nUmV2aWV3RGlhbG9nLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgdHlwZSB7IEZ1bmN0aW9uQ29tcG9uZW50LCBSZWFjdENoaWxkLCBSZWFjdE5vZGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25jYXQsIG9yZGVyQnkgfSBmcm9tICdsb2Rhc2gnO1xuXG5pbXBvcnQgdHlwZSB7IExvY2FsaXplclR5cGUsIFRoZW1lVHlwZSB9IGZyb20gJy4uLy4uL3R5cGVzL1V0aWwnO1xuaW1wb3J0IHR5cGUgeyBDb252ZXJzYXRpb25UeXBlIH0gZnJvbSAnLi4vLi4vc3RhdGUvZHVja3MvY29udmVyc2F0aW9ucyc7XG5pbXBvcnQgdHlwZSB7IFByZWZlcnJlZEJhZGdlU2VsZWN0b3JUeXBlIH0gZnJvbSAnLi4vLi4vc3RhdGUvc2VsZWN0b3JzL2JhZGdlcyc7XG5pbXBvcnQge1xuICBNZXNzYWdlUmVxdWVzdEFjdGlvbnNDb25maXJtYXRpb24sXG4gIE1lc3NhZ2VSZXF1ZXN0U3RhdGUsXG59IGZyb20gJy4vTWVzc2FnZVJlcXVlc3RBY3Rpb25zQ29uZmlybWF0aW9uJztcbmltcG9ydCB7IENvbnRhY3RTcG9vZmluZ1R5cGUgfSBmcm9tICcuLi8uLi91dGlsL2NvbnRhY3RTcG9vZmluZyc7XG5cbmltcG9ydCB7IE1vZGFsIH0gZnJvbSAnLi4vTW9kYWwnO1xuaW1wb3J0IHsgUmVtb3ZlR3JvdXBNZW1iZXJDb25maXJtYXRpb25EaWFsb2cgfSBmcm9tICcuL1JlbW92ZUdyb3VwTWVtYmVyQ29uZmlybWF0aW9uRGlhbG9nJztcbmltcG9ydCB7IENvbnRhY3RTcG9vZmluZ1Jldmlld0RpYWxvZ1BlcnNvbiB9IGZyb20gJy4vQ29udGFjdFNwb29maW5nUmV2aWV3RGlhbG9nUGVyc29uJztcbmltcG9ydCB7IEJ1dHRvbiwgQnV0dG9uVmFyaWFudCB9IGZyb20gJy4uL0J1dHRvbic7XG5pbXBvcnQgeyBJbnRsIH0gZnJvbSAnLi4vSW50bCc7XG5pbXBvcnQgeyBFbW9qaWZ5IH0gZnJvbSAnLi9FbW9qaWZ5JztcbmltcG9ydCB7IGFzc2VydCB9IGZyb20gJy4uLy4uL3V0aWwvYXNzZXJ0JztcbmltcG9ydCB7IG1pc3NpbmdDYXNlRXJyb3IgfSBmcm9tICcuLi8uLi91dGlsL21pc3NpbmdDYXNlRXJyb3InO1xuaW1wb3J0IHsgaXNJblN5c3RlbUNvbnRhY3RzIH0gZnJvbSAnLi4vLi4vdXRpbC9pc0luU3lzdGVtQ29udGFjdHMnO1xuXG5leHBvcnQgdHlwZSBQcm9wc1R5cGUgPSB7XG4gIGdldFByZWZlcnJlZEJhZGdlOiBQcmVmZXJyZWRCYWRnZVNlbGVjdG9yVHlwZTtcbiAgaTE4bjogTG9jYWxpemVyVHlwZTtcbiAgb25CbG9jazogKGNvbnZlcnNhdGlvbklkOiBzdHJpbmcpID0+IHVua25vd247XG4gIG9uQmxvY2tBbmRSZXBvcnRTcGFtOiAoY29udmVyc2F0aW9uSWQ6IHN0cmluZykgPT4gdW5rbm93bjtcbiAgb25DbG9zZTogKCkgPT4gdm9pZDtcbiAgb25EZWxldGU6IChjb252ZXJzYXRpb25JZDogc3RyaW5nKSA9PiB1bmtub3duO1xuICBvblNob3dDb250YWN0TW9kYWw6IChjb250YWN0SWQ6IHN0cmluZywgY29udmVyc2F0aW9uSWQ/OiBzdHJpbmcpID0+IHVua25vd247XG4gIG9uVW5ibG9jazogKGNvbnZlcnNhdGlvbklkOiBzdHJpbmcpID0+IHVua25vd247XG4gIHJlbW92ZU1lbWJlcjogKGNvbnZlcnNhdGlvbklkOiBzdHJpbmcpID0+IHVua25vd247XG4gIHRoZW1lOiBUaGVtZVR5cGU7XG59ICYgKFxuICB8IHtcbiAgICAgIHR5cGU6IENvbnRhY3RTcG9vZmluZ1R5cGUuRGlyZWN0Q29udmVyc2F0aW9uV2l0aFNhbWVUaXRsZTtcbiAgICAgIHBvc3NpYmx5VW5zYWZlQ29udmVyc2F0aW9uOiBDb252ZXJzYXRpb25UeXBlO1xuICAgICAgc2FmZUNvbnZlcnNhdGlvbjogQ29udmVyc2F0aW9uVHlwZTtcbiAgICB9XG4gIHwge1xuICAgICAgdHlwZTogQ29udGFjdFNwb29maW5nVHlwZS5NdWx0aXBsZUdyb3VwTWVtYmVyc1dpdGhTYW1lVGl0bGU7XG4gICAgICBncm91cDogQ29udmVyc2F0aW9uVHlwZTtcbiAgICAgIGNvbGxpc2lvbkluZm9CeVRpdGxlOiBSZWNvcmQ8XG4gICAgICAgIHN0cmluZyxcbiAgICAgICAgQXJyYXk8e1xuICAgICAgICAgIG9sZE5hbWU/OiBzdHJpbmc7XG4gICAgICAgICAgY29udmVyc2F0aW9uOiBDb252ZXJzYXRpb25UeXBlO1xuICAgICAgICB9PlxuICAgICAgPjtcbiAgICB9XG4pO1xuXG5lbnVtIENvbmZpcm1hdGlvblN0YXRlVHlwZSB7XG4gIENvbmZpcm1pbmdEZWxldGUsXG4gIENvbmZpcm1pbmdCbG9jayxcbiAgQ29uZmlybWluZ0dyb3VwUmVtb3ZhbCxcbn1cblxuZXhwb3J0IGNvbnN0IENvbnRhY3RTcG9vZmluZ1Jldmlld0RpYWxvZzogRnVuY3Rpb25Db21wb25lbnQ8XG4gIFByb3BzVHlwZVxuPiA9IHByb3BzID0+IHtcbiAgY29uc3Qge1xuICAgIGdldFByZWZlcnJlZEJhZGdlLFxuICAgIGkxOG4sXG4gICAgb25CbG9jayxcbiAgICBvbkJsb2NrQW5kUmVwb3J0U3BhbSxcbiAgICBvbkNsb3NlLFxuICAgIG9uRGVsZXRlLFxuICAgIG9uU2hvd0NvbnRhY3RNb2RhbCxcbiAgICBvblVuYmxvY2ssXG4gICAgcmVtb3ZlTWVtYmVyLFxuICAgIHRoZW1lLFxuICB9ID0gcHJvcHM7XG5cbiAgY29uc3QgW2NvbmZpcm1hdGlvblN0YXRlLCBzZXRDb25maXJtYXRpb25TdGF0ZV0gPSB1c2VTdGF0ZTxcbiAgICB8IHVuZGVmaW5lZFxuICAgIHwge1xuICAgICAgICB0eXBlOiBDb25maXJtYXRpb25TdGF0ZVR5cGUuQ29uZmlybWluZ0dyb3VwUmVtb3ZhbDtcbiAgICAgICAgYWZmZWN0ZWRDb252ZXJzYXRpb246IENvbnZlcnNhdGlvblR5cGU7XG4gICAgICAgIGdyb3VwOiBDb252ZXJzYXRpb25UeXBlO1xuICAgICAgfVxuICAgIHwge1xuICAgICAgICB0eXBlOlxuICAgICAgICAgIHwgQ29uZmlybWF0aW9uU3RhdGVUeXBlLkNvbmZpcm1pbmdEZWxldGVcbiAgICAgICAgICB8IENvbmZpcm1hdGlvblN0YXRlVHlwZS5Db25maXJtaW5nQmxvY2s7XG4gICAgICAgIGFmZmVjdGVkQ29udmVyc2F0aW9uOiBDb252ZXJzYXRpb25UeXBlO1xuICAgICAgfVxuICA+KCk7XG5cbiAgaWYgKGNvbmZpcm1hdGlvblN0YXRlKSB7XG4gICAgY29uc3QgeyB0eXBlLCBhZmZlY3RlZENvbnZlcnNhdGlvbiB9ID0gY29uZmlybWF0aW9uU3RhdGU7XG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlIENvbmZpcm1hdGlvblN0YXRlVHlwZS5Db25maXJtaW5nRGVsZXRlOlxuICAgICAgY2FzZSBDb25maXJtYXRpb25TdGF0ZVR5cGUuQ29uZmlybWluZ0Jsb2NrOlxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIDxNZXNzYWdlUmVxdWVzdEFjdGlvbnNDb25maXJtYXRpb25cbiAgICAgICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgICAgICBvbkJsb2NrPXsoKSA9PiB7XG4gICAgICAgICAgICAgIG9uQmxvY2soYWZmZWN0ZWRDb252ZXJzYXRpb24uaWQpO1xuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIG9uQmxvY2tBbmRSZXBvcnRTcGFtPXsoKSA9PiB7XG4gICAgICAgICAgICAgIG9uQmxvY2tBbmRSZXBvcnRTcGFtKGFmZmVjdGVkQ29udmVyc2F0aW9uLmlkKTtcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICBvblVuYmxvY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgb25VbmJsb2NrKGFmZmVjdGVkQ29udmVyc2F0aW9uLmlkKTtcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICBvbkRlbGV0ZT17KCkgPT4ge1xuICAgICAgICAgICAgICBvbkRlbGV0ZShhZmZlY3RlZENvbnZlcnNhdGlvbi5pZCk7XG4gICAgICAgICAgICB9fVxuICAgICAgICAgICAgdGl0bGU9e2FmZmVjdGVkQ29udmVyc2F0aW9uLnRpdGxlfVxuICAgICAgICAgICAgY29udmVyc2F0aW9uVHlwZT1cImRpcmVjdFwiXG4gICAgICAgICAgICBzdGF0ZT17XG4gICAgICAgICAgICAgIHR5cGUgPT09IENvbmZpcm1hdGlvblN0YXRlVHlwZS5Db25maXJtaW5nRGVsZXRlXG4gICAgICAgICAgICAgICAgPyBNZXNzYWdlUmVxdWVzdFN0YXRlLmRlbGV0aW5nXG4gICAgICAgICAgICAgICAgOiBNZXNzYWdlUmVxdWVzdFN0YXRlLmJsb2NraW5nXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvbkNoYW5nZVN0YXRlPXttZXNzYWdlUmVxdWVzdFN0YXRlID0+IHtcbiAgICAgICAgICAgICAgc3dpdGNoIChtZXNzYWdlUmVxdWVzdFN0YXRlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBNZXNzYWdlUmVxdWVzdFN0YXRlLmJsb2NraW5nOlxuICAgICAgICAgICAgICAgICAgc2V0Q29uZmlybWF0aW9uU3RhdGUoe1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBDb25maXJtYXRpb25TdGF0ZVR5cGUuQ29uZmlybWluZ0Jsb2NrLFxuICAgICAgICAgICAgICAgICAgICBhZmZlY3RlZENvbnZlcnNhdGlvbixcbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBNZXNzYWdlUmVxdWVzdFN0YXRlLmRlbGV0aW5nOlxuICAgICAgICAgICAgICAgICAgc2V0Q29uZmlybWF0aW9uU3RhdGUoe1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBDb25maXJtYXRpb25TdGF0ZVR5cGUuQ29uZmlybWluZ0RlbGV0ZSxcbiAgICAgICAgICAgICAgICAgICAgYWZmZWN0ZWRDb252ZXJzYXRpb24sXG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgTWVzc2FnZVJlcXVlc3RTdGF0ZS51bmJsb2NraW5nOlxuICAgICAgICAgICAgICAgICAgYXNzZXJ0KFxuICAgICAgICAgICAgICAgICAgICBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgJ0dvdCB1bmV4cGVjdGVkIE1lc3NhZ2VSZXF1ZXN0U3RhdGUudW5ibG9ja2luZyBzdGF0ZS4gQ2xlYXJpbmcgY29uZmlyYXRpb24gc3RhdGUnXG4gICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgc2V0Q29uZmlybWF0aW9uU3RhdGUodW5kZWZpbmVkKTtcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgTWVzc2FnZVJlcXVlc3RTdGF0ZS5kZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgc2V0Q29uZmlybWF0aW9uU3RhdGUodW5kZWZpbmVkKTtcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICB0aHJvdyBtaXNzaW5nQ2FzZUVycm9yKG1lc3NhZ2VSZXF1ZXN0U3RhdGUpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9fVxuICAgICAgICAgIC8+XG4gICAgICAgICk7XG4gICAgICBjYXNlIENvbmZpcm1hdGlvblN0YXRlVHlwZS5Db25maXJtaW5nR3JvdXBSZW1vdmFsOiB7XG4gICAgICAgIGNvbnN0IHsgZ3JvdXAgfSA9IGNvbmZpcm1hdGlvblN0YXRlO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIDxSZW1vdmVHcm91cE1lbWJlckNvbmZpcm1hdGlvbkRpYWxvZ1xuICAgICAgICAgICAgY29udmVyc2F0aW9uPXthZmZlY3RlZENvbnZlcnNhdGlvbn1cbiAgICAgICAgICAgIGdyb3VwPXtncm91cH1cbiAgICAgICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgICAgICBvbkNsb3NlPXsoKSA9PiB7XG4gICAgICAgICAgICAgIHNldENvbmZpcm1hdGlvblN0YXRlKHVuZGVmaW5lZCk7XG4gICAgICAgICAgICB9fVxuICAgICAgICAgICAgb25SZW1vdmU9eygpID0+IHtcbiAgICAgICAgICAgICAgcmVtb3ZlTWVtYmVyKGFmZmVjdGVkQ29udmVyc2F0aW9uLmlkKTtcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgLz5cbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRocm93IG1pc3NpbmdDYXNlRXJyb3IodHlwZSk7XG4gICAgfVxuICB9XG5cbiAgbGV0IHRpdGxlOiBzdHJpbmc7XG4gIGxldCBjb250ZW50czogUmVhY3RDaGlsZDtcblxuICBzd2l0Y2ggKHByb3BzLnR5cGUpIHtcbiAgICBjYXNlIENvbnRhY3RTcG9vZmluZ1R5cGUuRGlyZWN0Q29udmVyc2F0aW9uV2l0aFNhbWVUaXRsZToge1xuICAgICAgY29uc3QgeyBwb3NzaWJseVVuc2FmZUNvbnZlcnNhdGlvbiwgc2FmZUNvbnZlcnNhdGlvbiB9ID0gcHJvcHM7XG4gICAgICBhc3NlcnQoXG4gICAgICAgIHBvc3NpYmx5VW5zYWZlQ29udmVyc2F0aW9uLnR5cGUgPT09ICdkaXJlY3QnLFxuICAgICAgICAnPENvbnRhY3RTcG9vZmluZ1Jldmlld0RpYWxvZz4gZXhwZWN0ZWQgYSBkaXJlY3QgY29udmVyc2F0aW9uIGZvciB0aGUgXCJwb3NzaWJseSB1bnNhZmVcIiBjb252ZXJzYXRpb24nXG4gICAgICApO1xuICAgICAgYXNzZXJ0KFxuICAgICAgICBzYWZlQ29udmVyc2F0aW9uLnR5cGUgPT09ICdkaXJlY3QnLFxuICAgICAgICAnPENvbnRhY3RTcG9vZmluZ1Jldmlld0RpYWxvZz4gZXhwZWN0ZWQgYSBkaXJlY3QgY29udmVyc2F0aW9uIGZvciB0aGUgXCJzYWZlXCIgY29udmVyc2F0aW9uJ1xuICAgICAgKTtcblxuICAgICAgdGl0bGUgPSBpMThuKCdDb250YWN0U3Bvb2ZpbmdSZXZpZXdEaWFsb2dfX3RpdGxlJyk7XG4gICAgICBjb250ZW50cyA9IChcbiAgICAgICAgPD5cbiAgICAgICAgICA8cD57aTE4bignQ29udGFjdFNwb29maW5nUmV2aWV3RGlhbG9nX19kZXNjcmlwdGlvbicpfTwvcD5cbiAgICAgICAgICA8aDI+e2kxOG4oJ0NvbnRhY3RTcG9vZmluZ1Jldmlld0RpYWxvZ19fcG9zc2libHktdW5zYWZlLXRpdGxlJyl9PC9oMj5cbiAgICAgICAgICA8Q29udGFjdFNwb29maW5nUmV2aWV3RGlhbG9nUGVyc29uXG4gICAgICAgICAgICBjb252ZXJzYXRpb249e3Bvc3NpYmx5VW5zYWZlQ29udmVyc2F0aW9ufVxuICAgICAgICAgICAgZ2V0UHJlZmVycmVkQmFkZ2U9e2dldFByZWZlcnJlZEJhZGdlfVxuICAgICAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgICAgIHRoZW1lPXt0aGVtZX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZHVsZS1Db250YWN0U3Bvb2ZpbmdSZXZpZXdEaWFsb2dfX2J1dHRvbnNcIj5cbiAgICAgICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgICAgIHZhcmlhbnQ9e0J1dHRvblZhcmlhbnQuU2Vjb25kYXJ5RGVzdHJ1Y3RpdmV9XG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgc2V0Q29uZmlybWF0aW9uU3RhdGUoe1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBDb25maXJtYXRpb25TdGF0ZVR5cGUuQ29uZmlybWluZ0RlbGV0ZSxcbiAgICAgICAgICAgICAgICAgICAgYWZmZWN0ZWRDb252ZXJzYXRpb246IHBvc3NpYmx5VW5zYWZlQ29udmVyc2F0aW9uLFxuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIHtpMThuKCdNZXNzYWdlUmVxdWVzdHMtLWRlbGV0ZScpfVxuICAgICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgICAgIHZhcmlhbnQ9e0J1dHRvblZhcmlhbnQuU2Vjb25kYXJ5RGVzdHJ1Y3RpdmV9XG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgc2V0Q29uZmlybWF0aW9uU3RhdGUoe1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBDb25maXJtYXRpb25TdGF0ZVR5cGUuQ29uZmlybWluZ0Jsb2NrLFxuICAgICAgICAgICAgICAgICAgICBhZmZlY3RlZENvbnZlcnNhdGlvbjogcG9zc2libHlVbnNhZmVDb252ZXJzYXRpb24sXG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge2kxOG4oJ01lc3NhZ2VSZXF1ZXN0cy0tYmxvY2snKX1cbiAgICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L0NvbnRhY3RTcG9vZmluZ1Jldmlld0RpYWxvZ1BlcnNvbj5cbiAgICAgICAgICA8aHIgLz5cbiAgICAgICAgICA8aDI+e2kxOG4oJ0NvbnRhY3RTcG9vZmluZ1Jldmlld0RpYWxvZ19fc2FmZS10aXRsZScpfTwvaDI+XG4gICAgICAgICAgPENvbnRhY3RTcG9vZmluZ1Jldmlld0RpYWxvZ1BlcnNvblxuICAgICAgICAgICAgY29udmVyc2F0aW9uPXtzYWZlQ29udmVyc2F0aW9ufVxuICAgICAgICAgICAgZ2V0UHJlZmVycmVkQmFkZ2U9e2dldFByZWZlcnJlZEJhZGdlfVxuICAgICAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgb25TaG93Q29udGFjdE1vZGFsKHNhZmVDb252ZXJzYXRpb24uaWQpO1xuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIHRoZW1lPXt0aGVtZX1cbiAgICAgICAgICAvPlxuICAgICAgICA8Lz5cbiAgICAgICk7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgY2FzZSBDb250YWN0U3Bvb2ZpbmdUeXBlLk11bHRpcGxlR3JvdXBNZW1iZXJzV2l0aFNhbWVUaXRsZToge1xuICAgICAgY29uc3QgeyBncm91cCwgY29sbGlzaW9uSW5mb0J5VGl0bGUgfSA9IHByb3BzO1xuXG4gICAgICBjb25zdCB1bnNvcnRlZENvbnZlcnNhdGlvbkluZm9zID0gY29uY2F0KFxuICAgICAgICAvLyBUaGlzIGVtcHR5IGFycmF5IGV4aXN0cyB0byBhcHBlYXNlIExvZGFzaCdzIHR5cGUgZGVmaW5pdGlvbnMuXG4gICAgICAgIFtdLFxuICAgICAgICAuLi5PYmplY3QudmFsdWVzKGNvbGxpc2lvbkluZm9CeVRpdGxlKVxuICAgICAgKTtcbiAgICAgIGNvbnN0IGNvbnZlcnNhdGlvbkluZm9zID0gb3JkZXJCeSh1bnNvcnRlZENvbnZlcnNhdGlvbkluZm9zLCBbXG4gICAgICAgIC8vIFdlIG5vcm1hbGx5IHVzZSBhbiBgSW50bC5Db2xsYXRvcmAgdG8gc29ydCBieSB0aXRsZS4gV2UgZG8gdGhpcyBpbnN0ZWFkLCBhc1xuICAgICAgICAvLyAgIHdlIG9ubHkgcmVhbGx5IGNhcmUgYWJvdXQgc3RhYmlsaXR5IChub3QgcGVyZmVjdCBvcmRlcmluZykuXG4gICAgICAgICd0aXRsZScsXG4gICAgICAgICdpZCcsXG4gICAgICBdKTtcblxuICAgICAgdGl0bGUgPSBpMThuKCdDb250YWN0U3Bvb2ZpbmdSZXZpZXdEaWFsb2dfX2dyb3VwX190aXRsZScpO1xuICAgICAgY29udGVudHMgPSAoXG4gICAgICAgIDw+XG4gICAgICAgICAgPHA+XG4gICAgICAgICAgICB7aTE4bignQ29udGFjdFNwb29maW5nUmV2aWV3RGlhbG9nX19ncm91cF9fZGVzY3JpcHRpb24nLCBbXG4gICAgICAgICAgICAgIGNvbnZlcnNhdGlvbkluZm9zLmxlbmd0aC50b1N0cmluZygpLFxuICAgICAgICAgICAgXSl9XG4gICAgICAgICAgPC9wPlxuICAgICAgICAgIDxoMj57aTE4bignQ29udGFjdFNwb29maW5nUmV2aWV3RGlhbG9nX19ncm91cF9fbWVtYmVycy1oZWFkZXInKX08L2gyPlxuICAgICAgICAgIHtjb252ZXJzYXRpb25JbmZvcy5tYXAoKGNvbnZlcnNhdGlvbkluZm8sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBsZXQgYnV0dG9uOiBSZWFjdE5vZGU7XG4gICAgICAgICAgICBpZiAoZ3JvdXAuYXJlV2VBZG1pbikge1xuICAgICAgICAgICAgICBidXR0b24gPSAoXG4gICAgICAgICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgICAgICAgdmFyaWFudD17QnV0dG9uVmFyaWFudC5TZWNvbmRhcnlBZmZpcm1hdGl2ZX1cbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgc2V0Q29uZmlybWF0aW9uU3RhdGUoe1xuICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IENvbmZpcm1hdGlvblN0YXRlVHlwZS5Db25maXJtaW5nR3JvdXBSZW1vdmFsLFxuICAgICAgICAgICAgICAgICAgICAgIGFmZmVjdGVkQ29udmVyc2F0aW9uOiBjb252ZXJzYXRpb25JbmZvLmNvbnZlcnNhdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICBncm91cCxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIHtpMThuKCdSZW1vdmVHcm91cE1lbWJlckNvbmZpcm1hdGlvbl9fcmVtb3ZlLWJ1dHRvbicpfVxuICAgICAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChjb252ZXJzYXRpb25JbmZvLmNvbnZlcnNhdGlvbi5pc0Jsb2NrZWQpIHtcbiAgICAgICAgICAgICAgYnV0dG9uID0gKFxuICAgICAgICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgICAgICAgIHZhcmlhbnQ9e0J1dHRvblZhcmlhbnQuU2Vjb25kYXJ5QWZmaXJtYXRpdmV9XG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIG9uVW5ibG9jayhjb252ZXJzYXRpb25JbmZvLmNvbnZlcnNhdGlvbi5pZCk7XG4gICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIHtpMThuKCdNZXNzYWdlUmVxdWVzdHMtLXVuYmxvY2snKX1cbiAgICAgICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIWlzSW5TeXN0ZW1Db250YWN0cyhjb252ZXJzYXRpb25JbmZvLmNvbnZlcnNhdGlvbikpIHtcbiAgICAgICAgICAgICAgYnV0dG9uID0gKFxuICAgICAgICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgICAgICAgIHZhcmlhbnQ9e0J1dHRvblZhcmlhbnQuU2Vjb25kYXJ5RGVzdHJ1Y3RpdmV9XG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHNldENvbmZpcm1hdGlvblN0YXRlKHtcbiAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBDb25maXJtYXRpb25TdGF0ZVR5cGUuQ29uZmlybWluZ0Jsb2NrLFxuICAgICAgICAgICAgICAgICAgICAgIGFmZmVjdGVkQ29udmVyc2F0aW9uOiBjb252ZXJzYXRpb25JbmZvLmNvbnZlcnNhdGlvbixcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIHtpMThuKCdNZXNzYWdlUmVxdWVzdHMtLWJsb2NrJyl9XG4gICAgICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IHsgb2xkTmFtZSB9ID0gY29udmVyc2F0aW9uSW5mbztcbiAgICAgICAgICAgIGNvbnN0IG5ld05hbWUgPVxuICAgICAgICAgICAgICBjb252ZXJzYXRpb25JbmZvLmNvbnZlcnNhdGlvbi5wcm9maWxlTmFtZSB8fFxuICAgICAgICAgICAgICBjb252ZXJzYXRpb25JbmZvLmNvbnZlcnNhdGlvbi50aXRsZTtcblxuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICB7aW5kZXggIT09IDAgJiYgPGhyIC8+fVxuICAgICAgICAgICAgICAgIDxDb250YWN0U3Bvb2ZpbmdSZXZpZXdEaWFsb2dQZXJzb25cbiAgICAgICAgICAgICAgICAgIGtleT17Y29udmVyc2F0aW9uSW5mby5jb252ZXJzYXRpb24uaWR9XG4gICAgICAgICAgICAgICAgICBjb252ZXJzYXRpb249e2NvbnZlcnNhdGlvbkluZm8uY29udmVyc2F0aW9ufVxuICAgICAgICAgICAgICAgICAgZ2V0UHJlZmVycmVkQmFkZ2U9e2dldFByZWZlcnJlZEJhZGdlfVxuICAgICAgICAgICAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgICAgICAgICAgIHRoZW1lPXt0aGVtZX1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICB7Qm9vbGVhbihvbGROYW1lKSAmJiBvbGROYW1lICE9PSBuZXdOYW1lICYmIChcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2R1bGUtQ29udGFjdFNwb29maW5nUmV2aWV3RGlhbG9nUGVyc29uX19pbmZvX19wcm9wZXJ0eSBtb2R1bGUtQ29udGFjdFNwb29maW5nUmV2aWV3RGlhbG9nUGVyc29uX19pbmZvX19wcm9wZXJ0eS0tY2FsbG91dFwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxJbnRsXG4gICAgICAgICAgICAgICAgICAgICAgICBpMThuPXtpMThufVxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ9XCJDb250YWN0U3Bvb2ZpbmdSZXZpZXdEaWFsb2dfX2dyb3VwX19uYW1lLWNoYW5nZS1pbmZvXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudHM9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgb2xkTmFtZTogPEVtb2ppZnkgdGV4dD17b2xkTmFtZX0gLz4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG5ld05hbWU6IDxFbW9qaWZ5IHRleHQ9e25ld05hbWV9IC8+LFxuICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICB7YnV0dG9uICYmIChcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2R1bGUtQ29udGFjdFNwb29maW5nUmV2aWV3RGlhbG9nX19idXR0b25zXCI+XG4gICAgICAgICAgICAgICAgICAgICAge2J1dHRvbn1cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgIDwvQ29udGFjdFNwb29maW5nUmV2aWV3RGlhbG9nUGVyc29uPlxuICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSl9XG4gICAgICAgIDwvPlxuICAgICAgKTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbWlzc2luZ0Nhc2VFcnJvcihwcm9wcyk7XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxNb2RhbFxuICAgICAgaGFzWEJ1dHRvblxuICAgICAgaTE4bj17aTE4bn1cbiAgICAgIG1vZHVsZUNsYXNzTmFtZT1cIm1vZHVsZS1Db250YWN0U3Bvb2ZpbmdSZXZpZXdEaWFsb2dcIlxuICAgICAgb25DbG9zZT17b25DbG9zZX1cbiAgICAgIHRpdGxlPXt0aXRsZX1cbiAgICA+XG4gICAgICB7Y29udGVudHN9XG4gICAgPC9Nb2RhbD5cbiAgKTtcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSUEsbUJBQWdDO0FBQ2hDLG9CQUFnQztBQUtoQywrQ0FHTztBQUNQLDZCQUFvQztBQUVwQyxtQkFBc0I7QUFDdEIsaURBQW9EO0FBQ3BELCtDQUFrRDtBQUNsRCxvQkFBc0M7QUFDdEMsa0JBQXFCO0FBQ3JCLHFCQUF3QjtBQUN4QixvQkFBdUI7QUFDdkIsOEJBQWlDO0FBQ2pDLGdDQUFtQztBQWdDbkMsSUFBSyx3QkFBTCxrQkFBSywyQkFBTDtBQUNFO0FBQ0E7QUFDQTtBQUhHO0FBQUE7QUFNRSxNQUFNLDhCQUVULGtDQUFTO0FBQ1gsUUFBTTtBQUFBLElBQ0o7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxNQUNFO0FBRUosUUFBTSxDQUFDLG1CQUFtQix3QkFBd0IsMkJBYWhEO0FBRUYsTUFBSSxtQkFBbUI7QUFDckIsVUFBTSxFQUFFLE1BQU0seUJBQXlCO0FBQ3ZDLFlBQVE7QUFBQSxXQUNEO0FBQUEsV0FDQTtBQUNILGVBQ0UsbURBQUM7QUFBQSxVQUNDO0FBQUEsVUFDQSxTQUFTLE1BQU07QUFDYixvQkFBUSxxQkFBcUIsRUFBRTtBQUFBLFVBQ2pDO0FBQUEsVUFDQSxzQkFBc0IsTUFBTTtBQUMx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
