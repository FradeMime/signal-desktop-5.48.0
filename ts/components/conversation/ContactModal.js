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
var ContactModal_exports = {};
__export(ContactModal_exports, {
  ContactModal: () => ContactModal
});
module.exports = __toCommonJS(ContactModal_exports);
var import_react = __toESM(require("react"));
var log = __toESM(require("../../logging/log"));
var import_missingCaseError = require("../../util/missingCaseError");
var import_About = require("./About");
var import_Avatar = require("../Avatar");
var import_AvatarLightbox = require("../AvatarLightbox");
var import_Modal = require("../Modal");
var import_BadgeDialog = require("../BadgeDialog");
var import_SharedGroupNames = require("../SharedGroupNames");
var import_ConfirmationDialog = require("../ConfirmationDialog");
var import_RemoveGroupMemberConfirmationDialog = require("./RemoveGroupMemberConfirmationDialog");
var ContactModalView = /* @__PURE__ */ ((ContactModalView2) => {
  ContactModalView2[ContactModalView2["Default"] = 0] = "Default";
  ContactModalView2[ContactModalView2["ShowingAvatar"] = 1] = "ShowingAvatar";
  ContactModalView2[ContactModalView2["ShowingBadges"] = 2] = "ShowingBadges";
  return ContactModalView2;
})(ContactModalView || {});
var SubModalState = /* @__PURE__ */ ((SubModalState2) => {
  SubModalState2["None"] = "None";
  SubModalState2["ToggleAdmin"] = "ToggleAdmin";
  SubModalState2["MemberRemove"] = "MemberRemove";
  return SubModalState2;
})(SubModalState || {});
const ContactModal = /* @__PURE__ */ __name(({
  areWeASubscriber,
  areWeAdmin,
  badges,
  contact,
  conversation,
  hideContactModal,
  i18n,
  isAdmin,
  isMember,
  removeMemberFromGroup,
  showConversation,
  theme,
  toggleAdmin,
  toggleSafetyNumberModal,
  updateConversationModelSharedGroups
}) => {
  if (!contact) {
    throw new Error("Contact modal opened without a matching contact");
  }
  const [view, setView] = (0, import_react.useState)(0 /* Default */);
  const [subModalState, setSubModalState] = (0, import_react.useState)("None" /* None */);
  (0, import_react.useEffect)(() => {
    if (contact?.id) {
      updateConversationModelSharedGroups(contact.id);
    }
  }, [contact?.id, updateConversationModelSharedGroups]);
  let modalNode;
  switch (subModalState) {
    case "None" /* None */:
      modalNode = void 0;
      break;
    case "ToggleAdmin" /* ToggleAdmin */:
      if (!conversation?.id) {
        log.warn("ContactModal: ToggleAdmin state - missing conversationId");
        modalNode = void 0;
        break;
      }
      modalNode = /* @__PURE__ */ import_react.default.createElement(import_ConfirmationDialog.ConfirmationDialog, {
        actions: [
          {
            action: () => toggleAdmin(conversation.id, contact.id),
            text: isAdmin ? i18n("ContactModal--rm-admin") : i18n("ContactModal--make-admin")
          }
        ],
        i18n,
        onClose: () => setSubModalState("None" /* None */)
      }, isAdmin ? i18n("ContactModal--rm-admin-info", [contact.title]) : i18n("ContactModal--make-admin-info", [contact.title]));
      break;
    case "MemberRemove" /* MemberRemove */:
      if (!contact || !conversation?.id) {
        log.warn("ContactModal: MemberRemove state - missing contact or conversationId");
        modalNode = void 0;
        break;
      }
      modalNode = /* @__PURE__ */ import_react.default.createElement(import_RemoveGroupMemberConfirmationDialog.RemoveGroupMemberConfirmationDialog, {
        conversation: contact,
        group: conversation,
        i18n,
        onClose: () => {
          setSubModalState("None" /* None */);
        },
        onRemove: () => {
          removeMemberFromGroup(conversation?.id, contact.id);
        }
      });
      break;
    default: {
      const state = subModalState;
      log.warn(`ContactModal: unexpected ${state}!`);
      modalNode = void 0;
      break;
    }
  }
  switch (view) {
    case 0 /* Default */: {
      const preferredBadge = badges[0];
      return /* @__PURE__ */ import_react.default.createElement(import_Modal.Modal, {
        moduleClassName: "ContactModal__modal",
        hasXButton: true,
        i18n,
        onClose: hideContactModal
      }, /* @__PURE__ */ import_react.default.createElement("div", {
        className: "ContactModal"
      }, /* @__PURE__ */ import_react.default.createElement(import_Avatar.Avatar, {
        acceptedMessageRequest: contact.acceptedMessageRequest,
        avatarPath: contact.avatarPath,
        badge: preferredBadge,
        color: contact.color,
        conversationType: "direct",
        i18n,
        isMe: contact.isMe,
        name: contact.name,
        profileName: contact.profileName,
        sharedGroupNames: contact.sharedGroupNames,
        size: 96,
        theme,
        title: contact.title,
        unblurredAvatarPath: contact.unblurredAvatarPath,
        onClick: () => setView(1 /* ShowingAvatar */),
        onClickBadge: () => setView(2 /* ShowingBadges */)
      }), /* @__PURE__ */ import_react.default.createElement("div", {
        className: "ContactModal__name"
      }, contact.title), /* @__PURE__ */ import_react.default.createElement("div", {
        className: "module-about__container"
      }, /* @__PURE__ */ import_react.default.createElement(import_About.About, {
        text: contact.about
      })), contact.phoneNumber && /* @__PURE__ */ import_react.default.createElement("div", {
        className: "ContactModal__info"
      }, contact.phoneNumber), !contact.isMe && /* @__PURE__ */ import_react.default.createElement("div", {
        className: "ContactModal__info"
      }, /* @__PURE__ */ import_react.default.createElement(import_SharedGroupNames.SharedGroupNames, {
        i18n,
        sharedGroupNames: contact.sharedGroupNames || []
      })), /* @__PURE__ */ import_react.default.createElement("div", {
        className: "ContactModal__button-container"
      }, /* @__PURE__ */ import_react.default.createElement("button", {
        type: "button",
        className: "ContactModal__button ContactModal__send-message",
        onClick: () => {
          hideContactModal();
          showConversation({ conversationId: contact.id });
        }
      }, /* @__PURE__ */ import_react.default.createElement("div", {
        className: "ContactModal__bubble-icon"
      }, /* @__PURE__ */ import_react.default.createElement("div", {
        className: "ContactModal__send-message__bubble-icon"
      })), /* @__PURE__ */ import_react.default.createElement("span", null, i18n("ContactModal--message"))), !contact.isMe && /* @__PURE__ */ import_react.default.createElement("button", {
        type: "button",
        className: "ContactModal__button ContactModal__safety-number",
        onClick: () => {
          hideContactModal();
          toggleSafetyNumberModal(contact.id);
        }
      }, /* @__PURE__ */ import_react.default.createElement("div", {
        className: "ContactModal__bubble-icon"
      }, /* @__PURE__ */ import_react.default.createElement("div", {
        className: "ContactModal__safety-number__bubble-icon"
      })), /* @__PURE__ */ import_react.default.createElement("span", null, i18n("showSafetyNumber"))), !contact.isMe && areWeAdmin && isMember && conversation?.id && /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement("button", {
        type: "button",
        className: "ContactModal__button ContactModal__make-admin",
        onClick: () => setSubModalState("ToggleAdmin" /* ToggleAdmin */)
      }, /* @__PURE__ */ import_react.default.createElement("div", {
        className: "ContactModal__bubble-icon"
      }, /* @__PURE__ */ import_react.default.createElement("div", {
        className: "ContactModal__make-admin__bubble-icon"
      })), isAdmin ? /* @__PURE__ */ import_react.default.createElement("span", null, i18n("ContactModal--rm-admin")) : /* @__PURE__ */ import_react.default.createElement("span", null, i18n("ContactModal--make-admin"))), /* @__PURE__ */ import_react.default.createElement("button", {
        type: "button",
        className: "ContactModal__button ContactModal__remove-from-group",
        onClick: () => setSubModalState("MemberRemove" /* MemberRemove */)
      }, /* @__PURE__ */ import_react.default.createElement("div", {
        className: "ContactModal__bubble-icon"
      }, /* @__PURE__ */ import_react.default.createElement("div", {
        className: "ContactModal__remove-from-group__bubble-icon"
      })), /* @__PURE__ */ import_react.default.createElement("span", null, i18n("ContactModal--remove-from-group"))))), modalNode));
    }
    case 1 /* ShowingAvatar */:
      return /* @__PURE__ */ import_react.default.createElement(import_AvatarLightbox.AvatarLightbox, {
        avatarColor: contact.color,
        avatarPath: contact.avatarPath,
        conversationTitle: contact.title,
        i18n,
        onClose: () => setView(0 /* Default */)
      });
    case 2 /* ShowingBadges */:
      return /* @__PURE__ */ import_react.default.createElement(import_BadgeDialog.BadgeDialog, {
        areWeASubscriber,
        badges,
        firstName: contact.firstName,
        i18n,
        onClose: () => setView(0 /* Default */),
        title: contact.title
      });
    default:
      throw (0, import_missingCaseError.missingCaseError)(view);
  }
}, "ContactModal");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ContactModal
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ29udGFjdE1vZGFsLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjAtMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHR5cGUgeyBSZWFjdE5vZGUgfSBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCAqIGFzIGxvZyBmcm9tICcuLi8uLi9sb2dnaW5nL2xvZyc7XG5pbXBvcnQgeyBtaXNzaW5nQ2FzZUVycm9yIH0gZnJvbSAnLi4vLi4vdXRpbC9taXNzaW5nQ2FzZUVycm9yJztcbmltcG9ydCB7IEFib3V0IH0gZnJvbSAnLi9BYm91dCc7XG5pbXBvcnQgeyBBdmF0YXIgfSBmcm9tICcuLi9BdmF0YXInO1xuaW1wb3J0IHsgQXZhdGFyTGlnaHRib3ggfSBmcm9tICcuLi9BdmF0YXJMaWdodGJveCc7XG5pbXBvcnQgdHlwZSB7XG4gIENvbnZlcnNhdGlvblR5cGUsXG4gIFNob3dDb252ZXJzYXRpb25UeXBlLFxufSBmcm9tICcuLi8uLi9zdGF0ZS9kdWNrcy9jb252ZXJzYXRpb25zJztcbmltcG9ydCB7IE1vZGFsIH0gZnJvbSAnLi4vTW9kYWwnO1xuaW1wb3J0IHR5cGUgeyBMb2NhbGl6ZXJUeXBlLCBUaGVtZVR5cGUgfSBmcm9tICcuLi8uLi90eXBlcy9VdGlsJztcbmltcG9ydCB7IEJhZGdlRGlhbG9nIH0gZnJvbSAnLi4vQmFkZ2VEaWFsb2cnO1xuaW1wb3J0IHR5cGUgeyBCYWRnZVR5cGUgfSBmcm9tICcuLi8uLi9iYWRnZXMvdHlwZXMnO1xuaW1wb3J0IHsgU2hhcmVkR3JvdXBOYW1lcyB9IGZyb20gJy4uL1NoYXJlZEdyb3VwTmFtZXMnO1xuaW1wb3J0IHsgQ29uZmlybWF0aW9uRGlhbG9nIH0gZnJvbSAnLi4vQ29uZmlybWF0aW9uRGlhbG9nJztcbmltcG9ydCB7IFJlbW92ZUdyb3VwTWVtYmVyQ29uZmlybWF0aW9uRGlhbG9nIH0gZnJvbSAnLi9SZW1vdmVHcm91cE1lbWJlckNvbmZpcm1hdGlvbkRpYWxvZyc7XG5cbmV4cG9ydCB0eXBlIFByb3BzRGF0YVR5cGUgPSB7XG4gIGFyZVdlQVN1YnNjcmliZXI6IGJvb2xlYW47XG4gIGFyZVdlQWRtaW46IGJvb2xlYW47XG4gIGJhZGdlczogUmVhZG9ubHlBcnJheTxCYWRnZVR5cGU+O1xuICBjb250YWN0PzogQ29udmVyc2F0aW9uVHlwZTtcbiAgY29udmVyc2F0aW9uPzogQ29udmVyc2F0aW9uVHlwZTtcbiAgcmVhZG9ubHkgaTE4bjogTG9jYWxpemVyVHlwZTtcbiAgaXNBZG1pbjogYm9vbGVhbjtcbiAgaXNNZW1iZXI6IGJvb2xlYW47XG4gIHRoZW1lOiBUaGVtZVR5cGU7XG59O1xuXG50eXBlIFByb3BzQWN0aW9uVHlwZSA9IHtcbiAgaGlkZUNvbnRhY3RNb2RhbDogKCkgPT4gdm9pZDtcbiAgcmVtb3ZlTWVtYmVyRnJvbUdyb3VwOiAoY29udmVyc2F0aW9uSWQ6IHN0cmluZywgY29udGFjdElkOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHNob3dDb252ZXJzYXRpb246IFNob3dDb252ZXJzYXRpb25UeXBlO1xuICB0b2dnbGVBZG1pbjogKGNvbnZlcnNhdGlvbklkOiBzdHJpbmcsIGNvbnRhY3RJZDogc3RyaW5nKSA9PiB2b2lkO1xuICB0b2dnbGVTYWZldHlOdW1iZXJNb2RhbDogKGNvbnZlcnNhdGlvbklkOiBzdHJpbmcpID0+IHVua25vd247XG4gIHVwZGF0ZUNvbnZlcnNhdGlvbk1vZGVsU2hhcmVkR3JvdXBzOiAoY29udmVyc2F0aW9uSWQ6IHN0cmluZykgPT4gdm9pZDtcbn07XG5cbmV4cG9ydCB0eXBlIFByb3BzVHlwZSA9IFByb3BzRGF0YVR5cGUgJiBQcm9wc0FjdGlvblR5cGU7XG5cbmVudW0gQ29udGFjdE1vZGFsVmlldyB7XG4gIERlZmF1bHQsXG4gIFNob3dpbmdBdmF0YXIsXG4gIFNob3dpbmdCYWRnZXMsXG59XG5cbmVudW0gU3ViTW9kYWxTdGF0ZSB7XG4gIE5vbmUgPSAnTm9uZScsXG4gIFRvZ2dsZUFkbWluID0gJ1RvZ2dsZUFkbWluJyxcbiAgTWVtYmVyUmVtb3ZlID0gJ01lbWJlclJlbW92ZScsXG59XG5cbmV4cG9ydCBjb25zdCBDb250YWN0TW9kYWwgPSAoe1xuICBhcmVXZUFTdWJzY3JpYmVyLFxuICBhcmVXZUFkbWluLFxuICBiYWRnZXMsXG4gIGNvbnRhY3QsXG4gIGNvbnZlcnNhdGlvbixcbiAgaGlkZUNvbnRhY3RNb2RhbCxcbiAgaTE4bixcbiAgaXNBZG1pbixcbiAgaXNNZW1iZXIsXG4gIHJlbW92ZU1lbWJlckZyb21Hcm91cCxcbiAgc2hvd0NvbnZlcnNhdGlvbixcbiAgdGhlbWUsXG4gIHRvZ2dsZUFkbWluLFxuICB0b2dnbGVTYWZldHlOdW1iZXJNb2RhbCxcbiAgdXBkYXRlQ29udmVyc2F0aW9uTW9kZWxTaGFyZWRHcm91cHMsXG59OiBQcm9wc1R5cGUpOiBKU1guRWxlbWVudCA9PiB7XG4gIGlmICghY29udGFjdCkge1xuICAgIHRocm93IG5ldyBFcnJvcignQ29udGFjdCBtb2RhbCBvcGVuZWQgd2l0aG91dCBhIG1hdGNoaW5nIGNvbnRhY3QnKTtcbiAgfVxuXG4gIGNvbnN0IFt2aWV3LCBzZXRWaWV3XSA9IHVzZVN0YXRlKENvbnRhY3RNb2RhbFZpZXcuRGVmYXVsdCk7XG4gIGNvbnN0IFtzdWJNb2RhbFN0YXRlLCBzZXRTdWJNb2RhbFN0YXRlXSA9IHVzZVN0YXRlPFN1Yk1vZGFsU3RhdGU+KFxuICAgIFN1Yk1vZGFsU3RhdGUuTm9uZVxuICApO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKGNvbnRhY3Q/LmlkKSB7XG4gICAgICAvLyBLaWNrIG9mZiB0aGUgZXhwZW5zaXZlIGh5ZHJhdGlvbiBvZiB0aGUgY3VycmVudCBzaGFyZWRHcm91cE5hbWVzXG4gICAgICB1cGRhdGVDb252ZXJzYXRpb25Nb2RlbFNoYXJlZEdyb3Vwcyhjb250YWN0LmlkKTtcbiAgICB9XG4gIH0sIFtjb250YWN0Py5pZCwgdXBkYXRlQ29udmVyc2F0aW9uTW9kZWxTaGFyZWRHcm91cHNdKTtcblxuICBsZXQgbW9kYWxOb2RlOiBSZWFjdE5vZGU7XG4gIHN3aXRjaCAoc3ViTW9kYWxTdGF0ZSkge1xuICAgIGNhc2UgU3ViTW9kYWxTdGF0ZS5Ob25lOlxuICAgICAgbW9kYWxOb2RlID0gdW5kZWZpbmVkO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBTdWJNb2RhbFN0YXRlLlRvZ2dsZUFkbWluOlxuICAgICAgaWYgKCFjb252ZXJzYXRpb24/LmlkKSB7XG4gICAgICAgIGxvZy53YXJuKCdDb250YWN0TW9kYWw6IFRvZ2dsZUFkbWluIHN0YXRlIC0gbWlzc2luZyBjb252ZXJzYXRpb25JZCcpO1xuICAgICAgICBtb2RhbE5vZGUgPSB1bmRlZmluZWQ7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBtb2RhbE5vZGUgPSAoXG4gICAgICAgIDxDb25maXJtYXRpb25EaWFsb2dcbiAgICAgICAgICBhY3Rpb25zPXtbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGFjdGlvbjogKCkgPT4gdG9nZ2xlQWRtaW4oY29udmVyc2F0aW9uLmlkLCBjb250YWN0LmlkKSxcbiAgICAgICAgICAgICAgdGV4dDogaXNBZG1pblxuICAgICAgICAgICAgICAgID8gaTE4bignQ29udGFjdE1vZGFsLS1ybS1hZG1pbicpXG4gICAgICAgICAgICAgICAgOiBpMThuKCdDb250YWN0TW9kYWwtLW1ha2UtYWRtaW4nKSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgXX1cbiAgICAgICAgICBpMThuPXtpMThufVxuICAgICAgICAgIG9uQ2xvc2U9eygpID0+IHNldFN1Yk1vZGFsU3RhdGUoU3ViTW9kYWxTdGF0ZS5Ob25lKX1cbiAgICAgICAgPlxuICAgICAgICAgIHtpc0FkbWluXG4gICAgICAgICAgICA/IGkxOG4oJ0NvbnRhY3RNb2RhbC0tcm0tYWRtaW4taW5mbycsIFtjb250YWN0LnRpdGxlXSlcbiAgICAgICAgICAgIDogaTE4bignQ29udGFjdE1vZGFsLS1tYWtlLWFkbWluLWluZm8nLCBbY29udGFjdC50aXRsZV0pfVxuICAgICAgICA8L0NvbmZpcm1hdGlvbkRpYWxvZz5cbiAgICAgICk7XG4gICAgICBicmVhaztcbiAgICBjYXNlIFN1Yk1vZGFsU3RhdGUuTWVtYmVyUmVtb3ZlOlxuICAgICAgaWYgKCFjb250YWN0IHx8ICFjb252ZXJzYXRpb24/LmlkKSB7XG4gICAgICAgIGxvZy53YXJuKFxuICAgICAgICAgICdDb250YWN0TW9kYWw6IE1lbWJlclJlbW92ZSBzdGF0ZSAtIG1pc3NpbmcgY29udGFjdCBvciBjb252ZXJzYXRpb25JZCdcbiAgICAgICAgKTtcbiAgICAgICAgbW9kYWxOb2RlID0gdW5kZWZpbmVkO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgbW9kYWxOb2RlID0gKFxuICAgICAgICA8UmVtb3ZlR3JvdXBNZW1iZXJDb25maXJtYXRpb25EaWFsb2dcbiAgICAgICAgICBjb252ZXJzYXRpb249e2NvbnRhY3R9XG4gICAgICAgICAgZ3JvdXA9e2NvbnZlcnNhdGlvbn1cbiAgICAgICAgICBpMThuPXtpMThufVxuICAgICAgICAgIG9uQ2xvc2U9eygpID0+IHtcbiAgICAgICAgICAgIHNldFN1Yk1vZGFsU3RhdGUoU3ViTW9kYWxTdGF0ZS5Ob25lKTtcbiAgICAgICAgICB9fVxuICAgICAgICAgIG9uUmVtb3ZlPXsoKSA9PiB7XG4gICAgICAgICAgICByZW1vdmVNZW1iZXJGcm9tR3JvdXAoY29udmVyc2F0aW9uPy5pZCwgY29udGFjdC5pZCk7XG4gICAgICAgICAgfX1cbiAgICAgICAgLz5cbiAgICAgICk7XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OiB7XG4gICAgICBjb25zdCBzdGF0ZTogbmV2ZXIgPSBzdWJNb2RhbFN0YXRlO1xuICAgICAgbG9nLndhcm4oYENvbnRhY3RNb2RhbDogdW5leHBlY3RlZCAke3N0YXRlfSFgKTtcbiAgICAgIG1vZGFsTm9kZSA9IHVuZGVmaW5lZDtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHN3aXRjaCAodmlldykge1xuICAgIGNhc2UgQ29udGFjdE1vZGFsVmlldy5EZWZhdWx0OiB7XG4gICAgICBjb25zdCBwcmVmZXJyZWRCYWRnZTogdW5kZWZpbmVkIHwgQmFkZ2VUeXBlID0gYmFkZ2VzWzBdO1xuXG4gICAgICByZXR1cm4gKFxuICAgICAgICA8TW9kYWxcbiAgICAgICAgICBtb2R1bGVDbGFzc05hbWU9XCJDb250YWN0TW9kYWxfX21vZGFsXCJcbiAgICAgICAgICBoYXNYQnV0dG9uXG4gICAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgICBvbkNsb3NlPXtoaWRlQ29udGFjdE1vZGFsfVxuICAgICAgICA+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJDb250YWN0TW9kYWxcIj5cbiAgICAgICAgICAgIDxBdmF0YXJcbiAgICAgICAgICAgICAgYWNjZXB0ZWRNZXNzYWdlUmVxdWVzdD17Y29udGFjdC5hY2NlcHRlZE1lc3NhZ2VSZXF1ZXN0fVxuICAgICAgICAgICAgICBhdmF0YXJQYXRoPXtjb250YWN0LmF2YXRhclBhdGh9XG4gICAgICAgICAgICAgIGJhZGdlPXtwcmVmZXJyZWRCYWRnZX1cbiAgICAgICAgICAgICAgY29sb3I9e2NvbnRhY3QuY29sb3J9XG4gICAgICAgICAgICAgIGNvbnZlcnNhdGlvblR5cGU9XCJkaXJlY3RcIlxuICAgICAgICAgICAgICBpMThuPXtpMThufVxuICAgICAgICAgICAgICBpc01lPXtjb250YWN0LmlzTWV9XG4gICAgICAgICAgICAgIG5hbWU9e2NvbnRhY3QubmFtZX1cbiAgICAgICAgICAgICAgcHJvZmlsZU5hbWU9e2NvbnRhY3QucHJvZmlsZU5hbWV9XG4gICAgICAgICAgICAgIHNoYXJlZEdyb3VwTmFtZXM9e2NvbnRhY3Quc2hhcmVkR3JvdXBOYW1lc31cbiAgICAgICAgICAgICAgc2l6ZT17OTZ9XG4gICAgICAgICAgICAgIHRoZW1lPXt0aGVtZX1cbiAgICAgICAgICAgICAgdGl0bGU9e2NvbnRhY3QudGl0bGV9XG4gICAgICAgICAgICAgIHVuYmx1cnJlZEF2YXRhclBhdGg9e2NvbnRhY3QudW5ibHVycmVkQXZhdGFyUGF0aH1cbiAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0VmlldyhDb250YWN0TW9kYWxWaWV3LlNob3dpbmdBdmF0YXIpfVxuICAgICAgICAgICAgICBvbkNsaWNrQmFkZ2U9eygpID0+IHNldFZpZXcoQ29udGFjdE1vZGFsVmlldy5TaG93aW5nQmFkZ2VzKX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIkNvbnRhY3RNb2RhbF9fbmFtZVwiPntjb250YWN0LnRpdGxlfTwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2R1bGUtYWJvdXRfX2NvbnRhaW5lclwiPlxuICAgICAgICAgICAgICA8QWJvdXQgdGV4dD17Y29udGFjdC5hYm91dH0gLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAge2NvbnRhY3QucGhvbmVOdW1iZXIgJiYgKFxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIkNvbnRhY3RNb2RhbF9faW5mb1wiPntjb250YWN0LnBob25lTnVtYmVyfTwvZGl2PlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIHshY29udGFjdC5pc01lICYmIChcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJDb250YWN0TW9kYWxfX2luZm9cIj5cbiAgICAgICAgICAgICAgICA8U2hhcmVkR3JvdXBOYW1lc1xuICAgICAgICAgICAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgICAgICAgICAgIHNoYXJlZEdyb3VwTmFtZXM9e2NvbnRhY3Quc2hhcmVkR3JvdXBOYW1lcyB8fCBbXX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIkNvbnRhY3RNb2RhbF9fYnV0dG9uLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiQ29udGFjdE1vZGFsX19idXR0b24gQ29udGFjdE1vZGFsX19zZW5kLW1lc3NhZ2VcIlxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgIGhpZGVDb250YWN0TW9kYWwoKTtcbiAgICAgICAgICAgICAgICAgIHNob3dDb252ZXJzYXRpb24oeyBjb252ZXJzYXRpb25JZDogY29udGFjdC5pZCB9KTtcbiAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJDb250YWN0TW9kYWxfX2J1YmJsZS1pY29uXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIkNvbnRhY3RNb2RhbF9fc2VuZC1tZXNzYWdlX19idWJibGUtaWNvblwiIC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPHNwYW4+e2kxOG4oJ0NvbnRhY3RNb2RhbC0tbWVzc2FnZScpfTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIHshY29udGFjdC5pc01lICYmIChcbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cIkNvbnRhY3RNb2RhbF9fYnV0dG9uIENvbnRhY3RNb2RhbF9fc2FmZXR5LW51bWJlclwiXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGhpZGVDb250YWN0TW9kYWwoKTtcbiAgICAgICAgICAgICAgICAgICAgdG9nZ2xlU2FmZXR5TnVtYmVyTW9kYWwoY29udGFjdC5pZCk7XG4gICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiQ29udGFjdE1vZGFsX19idWJibGUtaWNvblwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIkNvbnRhY3RNb2RhbF9fc2FmZXR5LW51bWJlcl9fYnViYmxlLWljb25cIiAvPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8c3Bhbj57aTE4bignc2hvd1NhZmV0eU51bWJlcicpfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgeyFjb250YWN0LmlzTWUgJiYgYXJlV2VBZG1pbiAmJiBpc01lbWJlciAmJiBjb252ZXJzYXRpb24/LmlkICYmIChcbiAgICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiQ29udGFjdE1vZGFsX19idXR0b24gQ29udGFjdE1vZGFsX19tYWtlLWFkbWluXCJcbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0U3ViTW9kYWxTdGF0ZShTdWJNb2RhbFN0YXRlLlRvZ2dsZUFkbWluKX1cbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJDb250YWN0TW9kYWxfX2J1YmJsZS1pY29uXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJDb250YWN0TW9kYWxfX21ha2UtYWRtaW5fX2J1YmJsZS1pY29uXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIHtpc0FkbWluID8gKFxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPntpMThuKCdDb250YWN0TW9kYWwtLXJtLWFkbWluJyl9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPntpMThuKCdDb250YWN0TW9kYWwtLW1ha2UtYWRtaW4nKX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cIkNvbnRhY3RNb2RhbF9fYnV0dG9uIENvbnRhY3RNb2RhbF9fcmVtb3ZlLWZyb20tZ3JvdXBcIlxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRTdWJNb2RhbFN0YXRlKFN1Yk1vZGFsU3RhdGUuTWVtYmVyUmVtb3ZlKX1cbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJDb250YWN0TW9kYWxfX2J1YmJsZS1pY29uXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJDb250YWN0TW9kYWxfX3JlbW92ZS1mcm9tLWdyb3VwX19idWJibGUtaWNvblwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj57aTE4bignQ29udGFjdE1vZGFsLS1yZW1vdmUtZnJvbS1ncm91cCcpfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICB7bW9kYWxOb2RlfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L01vZGFsPlxuICAgICAgKTtcbiAgICB9XG4gICAgY2FzZSBDb250YWN0TW9kYWxWaWV3LlNob3dpbmdBdmF0YXI6XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8QXZhdGFyTGlnaHRib3hcbiAgICAgICAgICBhdmF0YXJDb2xvcj17Y29udGFjdC5jb2xvcn1cbiAgICAgICAgICBhdmF0YXJQYXRoPXtjb250YWN0LmF2YXRhclBhdGh9XG4gICAgICAgICAgY29udmVyc2F0aW9uVGl0bGU9e2NvbnRhY3QudGl0bGV9XG4gICAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgICBvbkNsb3NlPXsoKSA9PiBzZXRWaWV3KENvbnRhY3RNb2RhbFZpZXcuRGVmYXVsdCl9XG4gICAgICAgIC8+XG4gICAgICApO1xuICAgIGNhc2UgQ29udGFjdE1vZGFsVmlldy5TaG93aW5nQmFkZ2VzOlxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPEJhZGdlRGlhbG9nXG4gICAgICAgICAgYXJlV2VBU3Vic2NyaWJlcj17YXJlV2VBU3Vic2NyaWJlcn1cbiAgICAgICAgICBiYWRnZXM9e2JhZGdlc31cbiAgICAgICAgICBmaXJzdE5hbWU9e2NvbnRhY3QuZmlyc3ROYW1lfVxuICAgICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgICAgb25DbG9zZT17KCkgPT4gc2V0VmlldyhDb250YWN0TW9kYWxWaWV3LkRlZmF1bHQpfVxuICAgICAgICAgIHRpdGxlPXtjb250YWN0LnRpdGxlfVxuICAgICAgICAvPlxuICAgICAgKTtcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbWlzc2luZ0Nhc2VFcnJvcih2aWV3KTtcbiAgfVxufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxtQkFBMkM7QUFHM0MsVUFBcUI7QUFDckIsOEJBQWlDO0FBQ2pDLG1CQUFzQjtBQUN0QixvQkFBdUI7QUFDdkIsNEJBQStC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
