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
var ConversationDetails_exports = {};
__export(ConversationDetails_exports, {
  ConversationDetails: () => ConversationDetails
});
module.exports = __toCommonJS(ConversationDetails_exports);
var import_react = __toESM(require("react"));
var import_Button = require("../../Button");
var import_Tooltip = require("../../Tooltip");
var import_assert = require("../../../util/assert");
var import_getMutedUntilText = require("../../../util/getMutedUntilText");
var import_missingCaseError = require("../../../util/missingCaseError");
var import_DisappearingTimerSelect = require("../../DisappearingTimerSelect");
var import_PanelRow = require("./PanelRow");
var import_PanelSection = require("./PanelSection");
var import_AddGroupMembersModal = require("./AddGroupMembersModal");
var import_ConversationDetailsActions = require("./ConversationDetailsActions");
var import_ConversationDetailsHeader = require("./ConversationDetailsHeader");
var import_ConversationDetailsIcon = require("./ConversationDetailsIcon");
var import_ConversationDetailsMediaList = require("./ConversationDetailsMediaList");
var import_ConversationDetailsMembershipList = require("./ConversationDetailsMembershipList");
var import_EditConversationAttributesModal = require("./EditConversationAttributesModal");
var import_util = require("./util");
var import_getCustomColorStyle = require("../../../util/getCustomColorStyle");
var import_ConfirmationDialog = require("../../ConfirmationDialog");
var import_ConversationNotificationsModal = require("./ConversationNotificationsModal");
var import_isConversationMuted = require("../../../util/isConversationMuted");
var ModalState = /* @__PURE__ */ ((ModalState2) => {
  ModalState2[ModalState2["NothingOpen"] = 0] = "NothingOpen";
  ModalState2[ModalState2["EditingGroupDescription"] = 1] = "EditingGroupDescription";
  ModalState2[ModalState2["EditingGroupTitle"] = 2] = "EditingGroupTitle";
  ModalState2[ModalState2["AddingGroupMembers"] = 3] = "AddingGroupMembers";
  ModalState2[ModalState2["MuteNotifications"] = 4] = "MuteNotifications";
  ModalState2[ModalState2["UnmuteNotifications"] = 5] = "UnmuteNotifications";
  return ModalState2;
})(ModalState || {});
const ConversationDetails = /* @__PURE__ */ __name(({
  addMembers,
  areWeASubscriber,
  badges,
  canEditGroupInfo,
  conversation,
  deleteAvatarFromDisk,
  hasGroupLink,
  getPreferredBadge,
  hasActiveCall,
  i18n,
  isAdmin,
  isGroup,
  loadRecentMediaItems,
  memberships,
  onBlock,
  onLeave,
  onOutgoingAudioCallInConversation,
  onOutgoingVideoCallInConversation,
  onUnblock,
  pendingApprovalMemberships,
  pendingMemberships,
  renderChooseGroupMembersModal,
  renderConfirmAdditionsModal,
  replaceAvatar,
  saveAvatarToDisk,
  searchInConversation,
  setDisappearingMessages,
  setMuteExpiration,
  showAllMedia,
  showChatColorEditor,
  showContactModal,
  showConversationNotificationsSettings,
  showGroupLinkManagement,
  showGroupV2Permissions,
  showLightboxForMedia,
  showPendingInvites,
  theme,
  toggleSafetyNumberModal,
  updateGroupAttributes,
  userAvatarData
}) => {
  const [modalState, setModalState] = (0, import_react.useState)(0 /* NothingOpen */);
  const [editGroupAttributesRequestState, setEditGroupAttributesRequestState] = (0, import_react.useState)(import_util.RequestState.Inactive);
  const [addGroupMembersRequestState, setAddGroupMembersRequestState] = (0, import_react.useState)(import_util.RequestState.Inactive);
  if (conversation === void 0) {
    throw new Error("ConversationDetails rendered without a conversation");
  }
  const invitesCount = pendingMemberships.length + pendingApprovalMemberships.length;
  const otherMemberships = memberships.filter(({ member }) => !member.isMe);
  const isJustMe = otherMemberships.length === 0;
  const isAnyoneElseAnAdmin = otherMemberships.some((membership) => membership.isAdmin);
  const cannotLeaveBecauseYouAreLastAdmin = isAdmin && !isJustMe && !isAnyoneElseAnAdmin;
  let modalNode;
  switch (modalState) {
    case 0 /* NothingOpen */:
      modalNode = void 0;
      break;
    case 1 /* EditingGroupDescription */:
    case 2 /* EditingGroupTitle */:
      modalNode = /* @__PURE__ */ import_react.default.createElement(import_EditConversationAttributesModal.EditConversationAttributesModal, {
        avatarColor: conversation.color,
        avatarPath: conversation.avatarPath,
        conversationId: conversation.id,
        groupDescription: conversation.groupDescription,
        i18n,
        initiallyFocusDescription: modalState === 1 /* EditingGroupDescription */,
        makeRequest: async (options) => {
          setEditGroupAttributesRequestState(import_util.RequestState.Active);
          try {
            await updateGroupAttributes(options);
            setModalState(0 /* NothingOpen */);
            setEditGroupAttributesRequestState(import_util.RequestState.Inactive);
          } catch (err) {
            setEditGroupAttributesRequestState(import_util.RequestState.InactiveWithError);
          }
        },
        onClose: () => {
          setModalState(0 /* NothingOpen */);
          setEditGroupAttributesRequestState(import_util.RequestState.Inactive);
        },
        requestState: editGroupAttributesRequestState,
        title: conversation.title,
        deleteAvatarFromDisk,
        replaceAvatar,
        saveAvatarToDisk,
        userAvatarData
      });
      break;
    case 3 /* AddingGroupMembers */:
      modalNode = /* @__PURE__ */ import_react.default.createElement(import_AddGroupMembersModal.AddGroupMembersModal, {
        renderChooseGroupMembersModal,
        renderConfirmAdditionsModal,
        clearRequestError: () => {
          setAddGroupMembersRequestState((oldRequestState) => {
            (0, import_assert.assert)(oldRequestState !== import_util.RequestState.Active, "Should not be clearing an active request state");
            return import_util.RequestState.Inactive;
          });
        },
        conversationIdsAlreadyInGroup: new Set(memberships.map((membership) => membership.member.id)),
        groupTitle: conversation.title,
        i18n,
        makeRequest: async (conversationIds) => {
          setAddGroupMembersRequestState(import_util.RequestState.Active);
          try {
            await addMembers(conversationIds);
            setModalState(0 /* NothingOpen */);
            setAddGroupMembersRequestState(import_util.RequestState.Inactive);
          } catch (err) {
            setAddGroupMembersRequestState(import_util.RequestState.InactiveWithError);
          }
        },
        onClose: () => {
          setModalState(0 /* NothingOpen */);
          setEditGroupAttributesRequestState(import_util.RequestState.Inactive);
        },
        requestState: addGroupMembersRequestState
      });
      break;
    case 4 /* MuteNotifications */:
      modalNode = /* @__PURE__ */ import_react.default.createElement(import_ConversationNotificationsModal.ConversationNotificationsModal, {
        i18n,
        muteExpiresAt: conversation.muteExpiresAt,
        onClose: () => {
          setModalState(0 /* NothingOpen */);
        },
        setMuteExpiration
      });
      break;
    case 5 /* UnmuteNotifications */:
      modalNode = /* @__PURE__ */ import_react.default.createElement(import_ConfirmationDialog.ConfirmationDialog, {
        actions: [
          {
            action: () => setMuteExpiration(0),
            style: "affirmative",
            text: i18n("unmute")
          }
        ],
        hasXButton: true,
        i18n,
        title: i18n("ConversationDetails__unmute--title"),
        onClose: () => {
          setModalState(0 /* NothingOpen */);
        }
      }, (0, import_getMutedUntilText.getMutedUntilText)(Number(conversation.muteExpiresAt), i18n));
      break;
    default:
      throw (0, import_missingCaseError.missingCaseError)(modalState);
  }
  const isMuted = (0, import_isConversationMuted.isConversationMuted)(conversation);
  return /* @__PURE__ */ import_react.default.createElement("div", {
    className: "conversation-details-panel"
  }, /* @__PURE__ */ import_react.default.createElement(import_ConversationDetailsHeader.ConversationDetailsHeader, {
    areWeASubscriber,
    badges,
    canEdit: canEditGroupInfo,
    conversation,
    i18n,
    isMe: conversation.isMe,
    isGroup,
    memberships,
    startEditing: (isGroupTitle) => {
      setModalState(isGroupTitle ? 2 /* EditingGroupTitle */ : 1 /* EditingGroupDescription */);
    },
    theme
  }), /* @__PURE__ */ import_react.default.createElement("div", {
    className: "ConversationDetails__header-buttons"
  }, !conversation.isMe && /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement(ConversationDetailsCallButton, {
    disabled: hasActiveCall,
    i18n,
    onClick: onOutgoingVideoCallInConversation,
    type: "video"
  }), !isGroup && /* @__PURE__ */ import_react.default.createElement(ConversationDetailsCallButton, {
    disabled: hasActiveCall,
    i18n,
    onClick: onOutgoingAudioCallInConversation,
    type: "audio"
  })), /* @__PURE__ */ import_react.default.createElement(import_Button.Button, {
    icon: isMuted ? import_Button.ButtonIconType.muted : import_Button.ButtonIconType.unmuted,
    onClick: () => {
      if (isMuted) {
        setModalState(5 /* UnmuteNotifications */);
      } else {
        setModalState(4 /* MuteNotifications */);
      }
    },
    variant: import_Button.ButtonVariant.Details
  }, isMuted ? i18n("unmute") : i18n("mute")), /* @__PURE__ */ import_react.default.createElement(import_Button.Button, {
    icon: import_Button.ButtonIconType.search,
    onClick: () => {
      searchInConversation(conversation.id);
    },
    variant: import_Button.ButtonVariant.Details
  }, i18n("search"))), /* @__PURE__ */ import_react.default.createElement(import_PanelSection.PanelSection, null, !isGroup || canEditGroupInfo ? /* @__PURE__ */ import_react.default.createElement(import_PanelRow.PanelRow, {
    icon: /* @__PURE__ */ import_react.default.createElement(import_ConversationDetailsIcon.ConversationDetailsIcon, {
      ariaLabel: i18n("ConversationDetails--disappearing-messages-label"),
      icon: import_ConversationDetailsIcon.IconType.timer
    }),
    info: i18n(isGroup ? "ConversationDetails--disappearing-messages-info--group" : "ConversationDetails--disappearing-messages-info--direct"),
    label: i18n("ConversationDetails--disappearing-messages-label"),
    right: /* @__PURE__ */ import_react.default.createElement(import_DisappearingTimerSelect.DisappearingTimerSelect, {
      i18n,
      value: conversation.expireTimer || 0,
      onChange: setDisappearingMessages
    })
  }) : null, /* @__PURE__ */ import_react.default.createElement(import_PanelRow.PanelRow, {
    icon: /* @__PURE__ */ import_react.default.createElement(import_ConversationDetailsIcon.ConversationDetailsIcon, {
      ariaLabel: i18n("showChatColorEditor"),
      icon: import_ConversationDetailsIcon.IconType.color
    }),
    label: i18n("showChatColorEditor"),
    onClick: showChatColorEditor,
    right: /* @__PURE__ */ import_react.default.createElement("div", {
      className: `ConversationDetails__chat-color ConversationDetails__chat-color--${conversation.conversationColor}`,
      style: {
        ...(0, import_getCustomColorStyle.getCustomColorStyle)(conversation.customColor)
      }
    })
  }), isGroup && /* @__PURE__ */ import_react.default.createElement(import_PanelRow.PanelRow, {
    icon: /* @__PURE__ */ import_react.default.createElement(import_ConversationDetailsIcon.ConversationDetailsIcon, {
      ariaLabel: i18n("ConversationDetails--notifications"),
      icon: import_ConversationDetailsIcon.IconType.notifications
    }),
    label: i18n("ConversationDetails--notifications"),
    onClick: showConversationNotificationsSettings,
    right: conversation.muteExpiresAt ? (0, import_getMutedUntilText.getMutedUntilText)(conversation.muteExpiresAt, i18n) : void 0
  }), !isGroup && !conversation.isMe && /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement(import_PanelRow.PanelRow, {
    onClick: () => toggleSafetyNumberModal(conversation.id),
    icon: /* @__PURE__ */ import_react.default.createElement(import_ConversationDetailsIcon.ConversationDetailsIcon, {
      ariaLabel: i18n("verifyNewNumber"),
      icon: import_ConversationDetailsIcon.IconType.verify
    }),
    label: /* @__PURE__ */ import_react.default.createElement("div", {
      className: "ConversationDetails__safety-number"
    }, i18n("verifyNewNumber"))
  }))), isGroup && /* @__PURE__ */ import_react.default.createElement(import_ConversationDetailsMembershipList.ConversationDetailsMembershipList, {
    canAddNewMembers: canEditGroupInfo,
    conversationId: conversation.id,
    getPreferredBadge,
    i18n,
    memberships,
    showContactModal,
    startAddingNewMembers: () => {
      setModalState(3 /* AddingGroupMembers */);
    },
    theme
  }), isGroup && /* @__PURE__ */ import_react.default.createElement(import_PanelSection.PanelSection, null, isAdmin || hasGroupLink ? /* @__PURE__ */ import_react.default.createElement(import_PanelRow.PanelRow, {
    icon: /* @__PURE__ */ import_react.default.createElement(import_ConversationDetailsIcon.ConversationDetailsIcon, {
      ariaLabel: i18n("ConversationDetails--group-link"),
      icon: import_ConversationDetailsIcon.IconType.link
    }),
    label: i18n("ConversationDetails--group-link"),
    onClick: showGroupLinkManagement,
    right: hasGroupLink ? i18n("on") : i18n("off")
  }) : null, /* @__PURE__ */ import_react.default.createElement(import_PanelRow.PanelRow, {
    icon: /* @__PURE__ */ import_react.default.createElement(import_ConversationDetailsIcon.ConversationDetailsIcon, {
      ariaLabel: i18n("ConversationDetails--requests-and-invites"),
      icon: import_ConversationDetailsIcon.IconType.invites
    }),
    label: i18n("ConversationDetails--requests-and-invites"),
    onClick: showPendingInvites,
    right: invitesCount
  }), isAdmin ? /* @__PURE__ */ import_react.default.createElement(import_PanelRow.PanelRow, {
    icon: /* @__PURE__ */ import_react.default.createElement(import_ConversationDetailsIcon.ConversationDetailsIcon, {
      ariaLabel: i18n("permissions"),
      icon: import_ConversationDetailsIcon.IconType.lock
    }),
    label: i18n("permissions"),
    onClick: showGroupV2Permissions
  }) : null), /* @__PURE__ */ import_react.default.createElement(import_ConversationDetailsMediaList.ConversationDetailsMediaList, {
    conversation,
    i18n,
    loadRecentMediaItems,
    showAllMedia,
    showLightboxForMedia
  }), !conversation.isMe && /* @__PURE__ */ import_react.default.createElement(import_ConversationDetailsActions.ConversationDetailsActions, {
    cannotLeaveBecauseYouAreLastAdmin,
    conversationTitle: conversation.title,
    i18n,
    isBlocked: Boolean(conversation.isBlocked),
    isGroup,
    left: Boolean(conversation.left),
    onBlock,
    onLeave,
    onUnblock
  }), modalNode);
}, "ConversationDetails");
function ConversationDetailsCallButton({
  disabled,
  i18n,
  onClick,
  type
}) {
  const button = /* @__PURE__ */ import_react.default.createElement(import_Button.Button, {
    disabled,
    icon: import_Button.ButtonIconType[type],
    onClick,
    variant: import_Button.ButtonVariant.Details
  }, i18n(type));
  if (disabled) {
    return /* @__PURE__ */ import_react.default.createElement(import_Tooltip.Tooltip, {
      content: i18n("calling__in-another-call-tooltip")
    }, button);
  }
  return button;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ConversationDetails
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ29udmVyc2F0aW9uRGV0YWlscy50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxLTIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgdHlwZSB7IFJlYWN0Tm9kZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgQnV0dG9uLCBCdXR0b25JY29uVHlwZSwgQnV0dG9uVmFyaWFudCB9IGZyb20gJy4uLy4uL0J1dHRvbic7XG5pbXBvcnQgeyBUb29sdGlwIH0gZnJvbSAnLi4vLi4vVG9vbHRpcCc7XG5pbXBvcnQgdHlwZSB7IENvbnZlcnNhdGlvblR5cGUgfSBmcm9tICcuLi8uLi8uLi9zdGF0ZS9kdWNrcy9jb252ZXJzYXRpb25zJztcbmltcG9ydCB0eXBlIHsgUHJlZmVycmVkQmFkZ2VTZWxlY3RvclR5cGUgfSBmcm9tICcuLi8uLi8uLi9zdGF0ZS9zZWxlY3RvcnMvYmFkZ2VzJztcbmltcG9ydCB0eXBlIHsgU21hcnRDaG9vc2VHcm91cE1lbWJlcnNNb2RhbFByb3BzVHlwZSB9IGZyb20gJy4uLy4uLy4uL3N0YXRlL3NtYXJ0L0Nob29zZUdyb3VwTWVtYmVyc01vZGFsJztcbmltcG9ydCB0eXBlIHsgU21hcnRDb25maXJtQWRkaXRpb25zTW9kYWxQcm9wc1R5cGUgfSBmcm9tICcuLi8uLi8uLi9zdGF0ZS9zbWFydC9Db25maXJtQWRkaXRpb25zTW9kYWwnO1xuaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSAnLi4vLi4vLi4vdXRpbC9hc3NlcnQnO1xuaW1wb3J0IHsgZ2V0TXV0ZWRVbnRpbFRleHQgfSBmcm9tICcuLi8uLi8uLi91dGlsL2dldE11dGVkVW50aWxUZXh0JztcblxuaW1wb3J0IHR5cGUgeyBMb2NhbGl6ZXJUeXBlLCBUaGVtZVR5cGUgfSBmcm9tICcuLi8uLi8uLi90eXBlcy9VdGlsJztcbmltcG9ydCB0eXBlIHsgTWVkaWFJdGVtVHlwZSB9IGZyb20gJy4uLy4uLy4uL3R5cGVzL01lZGlhSXRlbSc7XG5pbXBvcnQgdHlwZSB7IEJhZGdlVHlwZSB9IGZyb20gJy4uLy4uLy4uL2JhZGdlcy90eXBlcyc7XG5pbXBvcnQgeyBtaXNzaW5nQ2FzZUVycm9yIH0gZnJvbSAnLi4vLi4vLi4vdXRpbC9taXNzaW5nQ2FzZUVycm9yJztcblxuaW1wb3J0IHsgRGlzYXBwZWFyaW5nVGltZXJTZWxlY3QgfSBmcm9tICcuLi8uLi9EaXNhcHBlYXJpbmdUaW1lclNlbGVjdCc7XG5cbmltcG9ydCB7IFBhbmVsUm93IH0gZnJvbSAnLi9QYW5lbFJvdyc7XG5pbXBvcnQgeyBQYW5lbFNlY3Rpb24gfSBmcm9tICcuL1BhbmVsU2VjdGlvbic7XG5pbXBvcnQgeyBBZGRHcm91cE1lbWJlcnNNb2RhbCB9IGZyb20gJy4vQWRkR3JvdXBNZW1iZXJzTW9kYWwnO1xuaW1wb3J0IHsgQ29udmVyc2F0aW9uRGV0YWlsc0FjdGlvbnMgfSBmcm9tICcuL0NvbnZlcnNhdGlvbkRldGFpbHNBY3Rpb25zJztcbmltcG9ydCB7IENvbnZlcnNhdGlvbkRldGFpbHNIZWFkZXIgfSBmcm9tICcuL0NvbnZlcnNhdGlvbkRldGFpbHNIZWFkZXInO1xuaW1wb3J0IHsgQ29udmVyc2F0aW9uRGV0YWlsc0ljb24sIEljb25UeXBlIH0gZnJvbSAnLi9Db252ZXJzYXRpb25EZXRhaWxzSWNvbic7XG5pbXBvcnQgeyBDb252ZXJzYXRpb25EZXRhaWxzTWVkaWFMaXN0IH0gZnJvbSAnLi9Db252ZXJzYXRpb25EZXRhaWxzTWVkaWFMaXN0JztcbmltcG9ydCB0eXBlIHsgR3JvdXBWMk1lbWJlcnNoaXAgfSBmcm9tICcuL0NvbnZlcnNhdGlvbkRldGFpbHNNZW1iZXJzaGlwTGlzdCc7XG5pbXBvcnQgeyBDb252ZXJzYXRpb25EZXRhaWxzTWVtYmVyc2hpcExpc3QgfSBmcm9tICcuL0NvbnZlcnNhdGlvbkRldGFpbHNNZW1iZXJzaGlwTGlzdCc7XG5pbXBvcnQgdHlwZSB7XG4gIEdyb3VwVjJQZW5kaW5nTWVtYmVyc2hpcCxcbiAgR3JvdXBWMlJlcXVlc3RpbmdNZW1iZXJzaGlwLFxufSBmcm9tICcuL1BlbmRpbmdJbnZpdGVzJztcbmltcG9ydCB7IEVkaXRDb252ZXJzYXRpb25BdHRyaWJ1dGVzTW9kYWwgfSBmcm9tICcuL0VkaXRDb252ZXJzYXRpb25BdHRyaWJ1dGVzTW9kYWwnO1xuaW1wb3J0IHsgUmVxdWVzdFN0YXRlIH0gZnJvbSAnLi91dGlsJztcbmltcG9ydCB7IGdldEN1c3RvbUNvbG9yU3R5bGUgfSBmcm9tICcuLi8uLi8uLi91dGlsL2dldEN1c3RvbUNvbG9yU3R5bGUnO1xuaW1wb3J0IHsgQ29uZmlybWF0aW9uRGlhbG9nIH0gZnJvbSAnLi4vLi4vQ29uZmlybWF0aW9uRGlhbG9nJztcbmltcG9ydCB7IENvbnZlcnNhdGlvbk5vdGlmaWNhdGlvbnNNb2RhbCB9IGZyb20gJy4vQ29udmVyc2F0aW9uTm90aWZpY2F0aW9uc01vZGFsJztcbmltcG9ydCB0eXBlIHtcbiAgQXZhdGFyRGF0YVR5cGUsXG4gIERlbGV0ZUF2YXRhckZyb21EaXNrQWN0aW9uVHlwZSxcbiAgUmVwbGFjZUF2YXRhckFjdGlvblR5cGUsXG4gIFNhdmVBdmF0YXJUb0Rpc2tBY3Rpb25UeXBlLFxufSBmcm9tICcuLi8uLi8uLi90eXBlcy9BdmF0YXInO1xuaW1wb3J0IHsgaXNDb252ZXJzYXRpb25NdXRlZCB9IGZyb20gJy4uLy4uLy4uL3V0aWwvaXNDb252ZXJzYXRpb25NdXRlZCc7XG5cbmVudW0gTW9kYWxTdGF0ZSB7XG4gIE5vdGhpbmdPcGVuLFxuICBFZGl0aW5nR3JvdXBEZXNjcmlwdGlvbixcbiAgRWRpdGluZ0dyb3VwVGl0bGUsXG4gIEFkZGluZ0dyb3VwTWVtYmVycyxcbiAgTXV0ZU5vdGlmaWNhdGlvbnMsXG4gIFVubXV0ZU5vdGlmaWNhdGlvbnMsXG59XG5cbmV4cG9ydCB0eXBlIFN0YXRlUHJvcHMgPSB7XG4gIGFkZE1lbWJlcnM6IChjb252ZXJzYXRpb25JZHM6IFJlYWRvbmx5QXJyYXk8c3RyaW5nPikgPT4gUHJvbWlzZTx2b2lkPjtcbiAgYXJlV2VBU3Vic2NyaWJlcjogYm9vbGVhbjtcbiAgYmFkZ2VzPzogUmVhZG9ubHlBcnJheTxCYWRnZVR5cGU+O1xuICBjYW5FZGl0R3JvdXBJbmZvOiBib29sZWFuO1xuICBjb252ZXJzYXRpb24/OiBDb252ZXJzYXRpb25UeXBlO1xuICBoYXNHcm91cExpbms6IGJvb2xlYW47XG4gIGdldFByZWZlcnJlZEJhZGdlOiBQcmVmZXJyZWRCYWRnZVNlbGVjdG9yVHlwZTtcbiAgaGFzQWN0aXZlQ2FsbDogYm9vbGVhbjtcbiAgaTE4bjogTG9jYWxpemVyVHlwZTtcbiAgaXNBZG1pbjogYm9vbGVhbjtcbiAgaXNHcm91cDogYm9vbGVhbjtcbiAgbG9hZFJlY2VudE1lZGlhSXRlbXM6IChsaW1pdDogbnVtYmVyKSA9PiB2b2lkO1xuICBtZW1iZXJzaGlwczogQXJyYXk8R3JvdXBWMk1lbWJlcnNoaXA+O1xuICBwZW5kaW5nQXBwcm92YWxNZW1iZXJzaGlwczogUmVhZG9ubHlBcnJheTxHcm91cFYyUmVxdWVzdGluZ01lbWJlcnNoaXA+O1xuICBwZW5kaW5nTWVtYmVyc2hpcHM6IFJlYWRvbmx5QXJyYXk8R3JvdXBWMlBlbmRpbmdNZW1iZXJzaGlwPjtcbiAgc2V0RGlzYXBwZWFyaW5nTWVzc2FnZXM6IChzZWNvbmRzOiBudW1iZXIpID0+IHZvaWQ7XG4gIHNob3dBbGxNZWRpYTogKCkgPT4gdm9pZDtcbiAgc2hvd0NoYXRDb2xvckVkaXRvcjogKCkgPT4gdm9pZDtcbiAgc2hvd0dyb3VwTGlua01hbmFnZW1lbnQ6ICgpID0+IHZvaWQ7XG4gIHNob3dHcm91cFYyUGVybWlzc2lvbnM6ICgpID0+IHZvaWQ7XG4gIHNob3dQZW5kaW5nSW52aXRlczogKCkgPT4gdm9pZDtcbiAgc2hvd0xpZ2h0Ym94Rm9yTWVkaWE6IChcbiAgICBzZWxlY3RlZE1lZGlhSXRlbTogTWVkaWFJdGVtVHlwZSxcbiAgICBtZWRpYTogQXJyYXk8TWVkaWFJdGVtVHlwZT5cbiAgKSA9PiB2b2lkO1xuICBzaG93Q29udmVyc2F0aW9uTm90aWZpY2F0aW9uc1NldHRpbmdzOiAoKSA9PiB2b2lkO1xuICB1cGRhdGVHcm91cEF0dHJpYnV0ZXM6IChcbiAgICBfOiBSZWFkb25seTx7XG4gICAgICBhdmF0YXI/OiB1bmRlZmluZWQgfCBVaW50OEFycmF5O1xuICAgICAgZGVzY3JpcHRpb24/OiBzdHJpbmc7XG4gICAgICB0aXRsZT86IHN0cmluZztcbiAgICB9PlxuICApID0+IFByb21pc2U8dm9pZD47XG4gIG9uQmxvY2s6ICgpID0+IHZvaWQ7XG4gIG9uTGVhdmU6ICgpID0+IHZvaWQ7XG4gIG9uVW5ibG9jazogKCkgPT4gdm9pZDtcbiAgdGhlbWU6IFRoZW1lVHlwZTtcbiAgdXNlckF2YXRhckRhdGE6IEFycmF5PEF2YXRhckRhdGFUeXBlPjtcbiAgc2V0TXV0ZUV4cGlyYXRpb246IChtdXRlRXhwaXJlc0F0OiB1bmRlZmluZWQgfCBudW1iZXIpID0+IHVua25vd247XG4gIG9uT3V0Z29pbmdBdWRpb0NhbGxJbkNvbnZlcnNhdGlvbjogKCkgPT4gdW5rbm93bjtcbiAgb25PdXRnb2luZ1ZpZGVvQ2FsbEluQ29udmVyc2F0aW9uOiAoKSA9PiB1bmtub3duO1xuICByZW5kZXJDaG9vc2VHcm91cE1lbWJlcnNNb2RhbDogKFxuICAgIHByb3BzOiBTbWFydENob29zZUdyb3VwTWVtYmVyc01vZGFsUHJvcHNUeXBlXG4gICkgPT4gSlNYLkVsZW1lbnQ7XG4gIHJlbmRlckNvbmZpcm1BZGRpdGlvbnNNb2RhbDogKFxuICAgIHByb3BzOiBTbWFydENvbmZpcm1BZGRpdGlvbnNNb2RhbFByb3BzVHlwZVxuICApID0+IEpTWC5FbGVtZW50O1xufTtcblxudHlwZSBBY3Rpb25Qcm9wcyA9IHtcbiAgZGVsZXRlQXZhdGFyRnJvbURpc2s6IERlbGV0ZUF2YXRhckZyb21EaXNrQWN0aW9uVHlwZTtcbiAgcmVwbGFjZUF2YXRhcjogUmVwbGFjZUF2YXRhckFjdGlvblR5cGU7XG4gIHNhdmVBdmF0YXJUb0Rpc2s6IFNhdmVBdmF0YXJUb0Rpc2tBY3Rpb25UeXBlO1xuICBzaG93Q29udGFjdE1vZGFsOiAoY29udGFjdElkOiBzdHJpbmcsIGNvbnZlcnNhdGlvbklkPzogc3RyaW5nKSA9PiB2b2lkO1xuICB0b2dnbGVTYWZldHlOdW1iZXJNb2RhbDogKGNvbnZlcnNhdGlvbklkOiBzdHJpbmcpID0+IHVua25vd247XG4gIHNlYXJjaEluQ29udmVyc2F0aW9uOiAoaWQ6IHN0cmluZykgPT4gdW5rbm93bjtcbn07XG5cbmV4cG9ydCB0eXBlIFByb3BzID0gU3RhdGVQcm9wcyAmIEFjdGlvblByb3BzO1xuXG5leHBvcnQgY29uc3QgQ29udmVyc2F0aW9uRGV0YWlsczogUmVhY3QuQ29tcG9uZW50VHlwZTxQcm9wcz4gPSAoe1xuICBhZGRNZW1iZXJzLFxuICBhcmVXZUFTdWJzY3JpYmVyLFxuICBiYWRnZXMsXG4gIGNhbkVkaXRHcm91cEluZm8sXG4gIGNvbnZlcnNhdGlvbixcbiAgZGVsZXRlQXZhdGFyRnJvbURpc2ssXG4gIGhhc0dyb3VwTGluayxcbiAgZ2V0UHJlZmVycmVkQmFkZ2UsXG4gIGhhc0FjdGl2ZUNhbGwsXG4gIGkxOG4sXG4gIGlzQWRtaW4sXG4gIGlzR3JvdXAsXG4gIGxvYWRSZWNlbnRNZWRpYUl0ZW1zLFxuICBtZW1iZXJzaGlwcyxcbiAgb25CbG9jayxcbiAgb25MZWF2ZSxcbiAgb25PdXRnb2luZ0F1ZGlvQ2FsbEluQ29udmVyc2F0aW9uLFxuICBvbk91dGdvaW5nVmlkZW9DYWxsSW5Db252ZXJzYXRpb24sXG4gIG9uVW5ibG9jayxcbiAgcGVuZGluZ0FwcHJvdmFsTWVtYmVyc2hpcHMsXG4gIHBlbmRpbmdNZW1iZXJzaGlwcyxcbiAgcmVuZGVyQ2hvb3NlR3JvdXBNZW1iZXJzTW9kYWwsXG4gIHJlbmRlckNvbmZpcm1BZGRpdGlvbnNNb2RhbCxcbiAgcmVwbGFjZUF2YXRhcixcbiAgc2F2ZUF2YXRhclRvRGlzayxcbiAgc2VhcmNoSW5Db252ZXJzYXRpb24sXG4gIHNldERpc2FwcGVhcmluZ01lc3NhZ2VzLFxuICBzZXRNdXRlRXhwaXJhdGlvbixcbiAgc2hvd0FsbE1lZGlhLFxuICBzaG93Q2hhdENvbG9yRWRpdG9yLFxuICBzaG93Q29udGFjdE1vZGFsLFxuICBzaG93Q29udmVyc2F0aW9uTm90aWZpY2F0aW9uc1NldHRpbmdzLFxuICBzaG93R3JvdXBMaW5rTWFuYWdlbWVudCxcbiAgc2hvd0dyb3VwVjJQZXJtaXNzaW9ucyxcbiAgc2hvd0xpZ2h0Ym94Rm9yTWVkaWEsXG4gIHNob3dQZW5kaW5nSW52aXRlcyxcbiAgdGhlbWUsXG4gIHRvZ2dsZVNhZmV0eU51bWJlck1vZGFsLFxuICB1cGRhdGVHcm91cEF0dHJpYnV0ZXMsXG4gIHVzZXJBdmF0YXJEYXRhLFxufSkgPT4ge1xuICBjb25zdCBbbW9kYWxTdGF0ZSwgc2V0TW9kYWxTdGF0ZV0gPSB1c2VTdGF0ZTxNb2RhbFN0YXRlPihcbiAgICBNb2RhbFN0YXRlLk5vdGhpbmdPcGVuXG4gICk7XG4gIGNvbnN0IFtlZGl0R3JvdXBBdHRyaWJ1dGVzUmVxdWVzdFN0YXRlLCBzZXRFZGl0R3JvdXBBdHRyaWJ1dGVzUmVxdWVzdFN0YXRlXSA9XG4gICAgdXNlU3RhdGU8UmVxdWVzdFN0YXRlPihSZXF1ZXN0U3RhdGUuSW5hY3RpdmUpO1xuICBjb25zdCBbYWRkR3JvdXBNZW1iZXJzUmVxdWVzdFN0YXRlLCBzZXRBZGRHcm91cE1lbWJlcnNSZXF1ZXN0U3RhdGVdID1cbiAgICB1c2VTdGF0ZTxSZXF1ZXN0U3RhdGU+KFJlcXVlc3RTdGF0ZS5JbmFjdGl2ZSk7XG5cbiAgaWYgKGNvbnZlcnNhdGlvbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdDb252ZXJzYXRpb25EZXRhaWxzIHJlbmRlcmVkIHdpdGhvdXQgYSBjb252ZXJzYXRpb24nKTtcbiAgfVxuXG4gIGNvbnN0IGludml0ZXNDb3VudCA9XG4gICAgcGVuZGluZ01lbWJlcnNoaXBzLmxlbmd0aCArIHBlbmRpbmdBcHByb3ZhbE1lbWJlcnNoaXBzLmxlbmd0aDtcblxuICBjb25zdCBvdGhlck1lbWJlcnNoaXBzID0gbWVtYmVyc2hpcHMuZmlsdGVyKCh7IG1lbWJlciB9KSA9PiAhbWVtYmVyLmlzTWUpO1xuICBjb25zdCBpc0p1c3RNZSA9IG90aGVyTWVtYmVyc2hpcHMubGVuZ3RoID09PSAwO1xuICBjb25zdCBpc0FueW9uZUVsc2VBbkFkbWluID0gb3RoZXJNZW1iZXJzaGlwcy5zb21lKFxuICAgIG1lbWJlcnNoaXAgPT4gbWVtYmVyc2hpcC5pc0FkbWluXG4gICk7XG4gIGNvbnN0IGNhbm5vdExlYXZlQmVjYXVzZVlvdUFyZUxhc3RBZG1pbiA9XG4gICAgaXNBZG1pbiAmJiAhaXNKdXN0TWUgJiYgIWlzQW55b25lRWxzZUFuQWRtaW47XG5cbiAgbGV0IG1vZGFsTm9kZTogUmVhY3ROb2RlO1xuICBzd2l0Y2ggKG1vZGFsU3RhdGUpIHtcbiAgICBjYXNlIE1vZGFsU3RhdGUuTm90aGluZ09wZW46XG4gICAgICBtb2RhbE5vZGUgPSB1bmRlZmluZWQ7XG4gICAgICBicmVhaztcbiAgICBjYXNlIE1vZGFsU3RhdGUuRWRpdGluZ0dyb3VwRGVzY3JpcHRpb246XG4gICAgY2FzZSBNb2RhbFN0YXRlLkVkaXRpbmdHcm91cFRpdGxlOlxuICAgICAgbW9kYWxOb2RlID0gKFxuICAgICAgICA8RWRpdENvbnZlcnNhdGlvbkF0dHJpYnV0ZXNNb2RhbFxuICAgICAgICAgIGF2YXRhckNvbG9yPXtjb252ZXJzYXRpb24uY29sb3J9XG4gICAgICAgICAgYXZhdGFyUGF0aD17Y29udmVyc2F0aW9uLmF2YXRhclBhdGh9XG4gICAgICAgICAgY29udmVyc2F0aW9uSWQ9e2NvbnZlcnNhdGlvbi5pZH1cbiAgICAgICAgICBncm91cERlc2NyaXB0aW9uPXtjb252ZXJzYXRpb24uZ3JvdXBEZXNjcmlwdGlvbn1cbiAgICAgICAgICBpMThuPXtpMThufVxuICAgICAgICAgIGluaXRpYWxseUZvY3VzRGVzY3JpcHRpb249e1xuICAgICAgICAgICAgbW9kYWxTdGF0ZSA9PT0gTW9kYWxTdGF0ZS5FZGl0aW5nR3JvdXBEZXNjcmlwdGlvblxuICAgICAgICAgIH1cbiAgICAgICAgICBtYWtlUmVxdWVzdD17YXN5bmMgKFxuICAgICAgICAgICAgb3B0aW9uczogUmVhZG9ubHk8e1xuICAgICAgICAgICAgICBhdmF0YXI/OiB1bmRlZmluZWQgfCBVaW50OEFycmF5O1xuICAgICAgICAgICAgICBkZXNjcmlwdGlvbj86IHN0cmluZztcbiAgICAgICAgICAgICAgdGl0bGU/OiBzdHJpbmc7XG4gICAgICAgICAgICB9PlxuICAgICAgICAgICkgPT4ge1xuICAgICAgICAgICAgc2V0RWRpdEdyb3VwQXR0cmlidXRlc1JlcXVlc3RTdGF0ZShSZXF1ZXN0U3RhdGUuQWN0aXZlKTtcblxuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgYXdhaXQgdXBkYXRlR3JvdXBBdHRyaWJ1dGVzKG9wdGlvbnMpO1xuICAgICAgICAgICAgICBzZXRNb2RhbFN0YXRlKE1vZGFsU3RhdGUuTm90aGluZ09wZW4pO1xuICAgICAgICAgICAgICBzZXRFZGl0R3JvdXBBdHRyaWJ1dGVzUmVxdWVzdFN0YXRlKFJlcXVlc3RTdGF0ZS5JbmFjdGl2ZSk7XG4gICAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgc2V0RWRpdEdyb3VwQXR0cmlidXRlc1JlcXVlc3RTdGF0ZShcbiAgICAgICAgICAgICAgICBSZXF1ZXN0U3RhdGUuSW5hY3RpdmVXaXRoRXJyb3JcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9fVxuICAgICAgICAgIG9uQ2xvc2U9eygpID0+IHtcbiAgICAgICAgICAgIHNldE1vZGFsU3RhdGUoTW9kYWxTdGF0ZS5Ob3RoaW5nT3Blbik7XG4gICAgICAgICAgICBzZXRFZGl0R3JvdXBBdHRyaWJ1dGVzUmVxdWVzdFN0YXRlKFJlcXVlc3RTdGF0ZS5JbmFjdGl2ZSk7XG4gICAgICAgICAgfX1cbiAgICAgICAgICByZXF1ZXN0U3RhdGU9e2VkaXRHcm91cEF0dHJpYnV0ZXNSZXF1ZXN0U3RhdGV9XG4gICAgICAgICAgdGl0bGU9e2NvbnZlcnNhdGlvbi50aXRsZX1cbiAgICAgICAgICBkZWxldGVBdmF0YXJGcm9tRGlzaz17ZGVsZXRlQXZhdGFyRnJvbURpc2t9XG4gICAgICAgICAgcmVwbGFjZUF2YXRhcj17cmVwbGFjZUF2YXRhcn1cbiAgICAgICAgICBzYXZlQXZhdGFyVG9EaXNrPXtzYXZlQXZhdGFyVG9EaXNrfVxuICAgICAgICAgIHVzZXJBdmF0YXJEYXRhPXt1c2VyQXZhdGFyRGF0YX1cbiAgICAgICAgLz5cbiAgICAgICk7XG4gICAgICBicmVhaztcbiAgICBjYXNlIE1vZGFsU3RhdGUuQWRkaW5nR3JvdXBNZW1iZXJzOlxuICAgICAgbW9kYWxOb2RlID0gKFxuICAgICAgICA8QWRkR3JvdXBNZW1iZXJzTW9kYWxcbiAgICAgICAgICByZW5kZXJDaG9vc2VHcm91cE1lbWJlcnNNb2RhbD17cmVuZGVyQ2hvb3NlR3JvdXBNZW1iZXJzTW9kYWx9XG4gICAgICAgICAgcmVuZGVyQ29uZmlybUFkZGl0aW9uc01vZGFsPXtyZW5kZXJDb25maXJtQWRkaXRpb25zTW9kYWx9XG4gICAgICAgICAgY2xlYXJSZXF1ZXN0RXJyb3I9eygpID0+IHtcbiAgICAgICAgICAgIHNldEFkZEdyb3VwTWVtYmVyc1JlcXVlc3RTdGF0ZShvbGRSZXF1ZXN0U3RhdGUgPT4ge1xuICAgICAgICAgICAgICBhc3NlcnQoXG4gICAgICAgICAgICAgICAgb2xkUmVxdWVzdFN0YXRlICE9PSBSZXF1ZXN0U3RhdGUuQWN0aXZlLFxuICAgICAgICAgICAgICAgICdTaG91bGQgbm90IGJlIGNsZWFyaW5nIGFuIGFjdGl2ZSByZXF1ZXN0IHN0YXRlJ1xuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICByZXR1cm4gUmVxdWVzdFN0YXRlLkluYWN0aXZlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfX1cbiAgICAgICAgICBjb252ZXJzYXRpb25JZHNBbHJlYWR5SW5Hcm91cD17XG4gICAgICAgICAgICBuZXcgU2V0KG1lbWJlcnNoaXBzLm1hcChtZW1iZXJzaGlwID0+IG1lbWJlcnNoaXAubWVtYmVyLmlkKSlcbiAgICAgICAgICB9XG4gICAgICAgICAgZ3JvdXBUaXRsZT17Y29udmVyc2F0aW9uLnRpdGxlfVxuICAgICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgICAgbWFrZVJlcXVlc3Q9e2FzeW5jIGNvbnZlcnNhdGlvbklkcyA9PiB7XG4gICAgICAgICAgICBzZXRBZGRHcm91cE1lbWJlcnNSZXF1ZXN0U3RhdGUoUmVxdWVzdFN0YXRlLkFjdGl2ZSk7XG5cbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgIGF3YWl0IGFkZE1lbWJlcnMoY29udmVyc2F0aW9uSWRzKTtcbiAgICAgICAgICAgICAgc2V0TW9kYWxTdGF0ZShNb2RhbFN0YXRlLk5vdGhpbmdPcGVuKTtcbiAgICAgICAgICAgICAgc2V0QWRkR3JvdXBNZW1iZXJzUmVxdWVzdFN0YXRlKFJlcXVlc3RTdGF0ZS5JbmFjdGl2ZSk7XG4gICAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgc2V0QWRkR3JvdXBNZW1iZXJzUmVxdWVzdFN0YXRlKFJlcXVlc3RTdGF0ZS5JbmFjdGl2ZVdpdGhFcnJvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfX1cbiAgICAgICAgICBvbkNsb3NlPXsoKSA9PiB7XG4gICAgICAgICAgICBzZXRNb2RhbFN0YXRlKE1vZGFsU3RhdGUuTm90aGluZ09wZW4pO1xuICAgICAgICAgICAgc2V0RWRpdEdyb3VwQXR0cmlidXRlc1JlcXVlc3RTdGF0ZShSZXF1ZXN0U3RhdGUuSW5hY3RpdmUpO1xuICAgICAgICAgIH19XG4gICAgICAgICAgcmVxdWVzdFN0YXRlPXthZGRHcm91cE1lbWJlcnNSZXF1ZXN0U3RhdGV9XG4gICAgICAgIC8+XG4gICAgICApO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBNb2RhbFN0YXRlLk11dGVOb3RpZmljYXRpb25zOlxuICAgICAgbW9kYWxOb2RlID0gKFxuICAgICAgICA8Q29udmVyc2F0aW9uTm90aWZpY2F0aW9uc01vZGFsXG4gICAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgICBtdXRlRXhwaXJlc0F0PXtjb252ZXJzYXRpb24ubXV0ZUV4cGlyZXNBdH1cbiAgICAgICAgICBvbkNsb3NlPXsoKSA9PiB7XG4gICAgICAgICAgICBzZXRNb2RhbFN0YXRlKE1vZGFsU3RhdGUuTm90aGluZ09wZW4pO1xuICAgICAgICAgIH19XG4gICAgICAgICAgc2V0TXV0ZUV4cGlyYXRpb249e3NldE11dGVFeHBpcmF0aW9ufVxuICAgICAgICAvPlxuICAgICAgKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgTW9kYWxTdGF0ZS5Vbm11dGVOb3RpZmljYXRpb25zOlxuICAgICAgbW9kYWxOb2RlID0gKFxuICAgICAgICA8Q29uZmlybWF0aW9uRGlhbG9nXG4gICAgICAgICAgYWN0aW9ucz17W1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBhY3Rpb246ICgpID0+IHNldE11dGVFeHBpcmF0aW9uKDApLFxuICAgICAgICAgICAgICBzdHlsZTogJ2FmZmlybWF0aXZlJyxcbiAgICAgICAgICAgICAgdGV4dDogaTE4bigndW5tdXRlJyksXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIF19XG4gICAgICAgICAgaGFzWEJ1dHRvblxuICAgICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgICAgdGl0bGU9e2kxOG4oJ0NvbnZlcnNhdGlvbkRldGFpbHNfX3VubXV0ZS0tdGl0bGUnKX1cbiAgICAgICAgICBvbkNsb3NlPXsoKSA9PiB7XG4gICAgICAgICAgICBzZXRNb2RhbFN0YXRlKE1vZGFsU3RhdGUuTm90aGluZ09wZW4pO1xuICAgICAgICAgIH19XG4gICAgICAgID5cbiAgICAgICAgICB7Z2V0TXV0ZWRVbnRpbFRleHQoTnVtYmVyKGNvbnZlcnNhdGlvbi5tdXRlRXhwaXJlc0F0KSwgaTE4bil9XG4gICAgICAgIDwvQ29uZmlybWF0aW9uRGlhbG9nPlxuICAgICAgKTtcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBtaXNzaW5nQ2FzZUVycm9yKG1vZGFsU3RhdGUpO1xuICB9XG5cbiAgY29uc3QgaXNNdXRlZCA9IGlzQ29udmVyc2F0aW9uTXV0ZWQoY29udmVyc2F0aW9uKTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udmVyc2F0aW9uLWRldGFpbHMtcGFuZWxcIj5cbiAgICAgIDxDb252ZXJzYXRpb25EZXRhaWxzSGVhZGVyXG4gICAgICAgIGFyZVdlQVN1YnNjcmliZXI9e2FyZVdlQVN1YnNjcmliZXJ9XG4gICAgICAgIGJhZGdlcz17YmFkZ2VzfVxuICAgICAgICBjYW5FZGl0PXtjYW5FZGl0R3JvdXBJbmZvfVxuICAgICAgICBjb252ZXJzYXRpb249e2NvbnZlcnNhdGlvbn1cbiAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgaXNNZT17Y29udmVyc2F0aW9uLmlzTWV9XG4gICAgICAgIGlzR3JvdXA9e2lzR3JvdXB9XG4gICAgICAgIG1lbWJlcnNoaXBzPXttZW1iZXJzaGlwc31cbiAgICAgICAgc3RhcnRFZGl0aW5nPXsoaXNHcm91cFRpdGxlOiBib29sZWFuKSA9PiB7XG4gICAgICAgICAgc2V0TW9kYWxTdGF0ZShcbiAgICAgICAgICAgIGlzR3JvdXBUaXRsZVxuICAgICAgICAgICAgICA/IE1vZGFsU3RhdGUuRWRpdGluZ0dyb3VwVGl0bGVcbiAgICAgICAgICAgICAgOiBNb2RhbFN0YXRlLkVkaXRpbmdHcm91cERlc2NyaXB0aW9uXG4gICAgICAgICAgKTtcbiAgICAgICAgfX1cbiAgICAgICAgdGhlbWU9e3RoZW1lfVxuICAgICAgLz5cblxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJDb252ZXJzYXRpb25EZXRhaWxzX19oZWFkZXItYnV0dG9uc1wiPlxuICAgICAgICB7IWNvbnZlcnNhdGlvbi5pc01lICYmIChcbiAgICAgICAgICA8PlxuICAgICAgICAgICAgPENvbnZlcnNhdGlvbkRldGFpbHNDYWxsQnV0dG9uXG4gICAgICAgICAgICAgIGRpc2FibGVkPXtoYXNBY3RpdmVDYWxsfVxuICAgICAgICAgICAgICBpMThuPXtpMThufVxuICAgICAgICAgICAgICBvbkNsaWNrPXtvbk91dGdvaW5nVmlkZW9DYWxsSW5Db252ZXJzYXRpb259XG4gICAgICAgICAgICAgIHR5cGU9XCJ2aWRlb1wiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgeyFpc0dyb3VwICYmIChcbiAgICAgICAgICAgICAgPENvbnZlcnNhdGlvbkRldGFpbHNDYWxsQnV0dG9uXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2hhc0FjdGl2ZUNhbGx9XG4gICAgICAgICAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXtvbk91dGdvaW5nQXVkaW9DYWxsSW5Db252ZXJzYXRpb259XG4gICAgICAgICAgICAgICAgdHlwZT1cImF1ZGlvXCJcbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgPC8+XG4gICAgICAgICl9XG4gICAgICAgIDxCdXR0b25cbiAgICAgICAgICBpY29uPXtpc011dGVkID8gQnV0dG9uSWNvblR5cGUubXV0ZWQgOiBCdXR0b25JY29uVHlwZS51bm11dGVkfVxuICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgIGlmIChpc011dGVkKSB7XG4gICAgICAgICAgICAgIHNldE1vZGFsU3RhdGUoTW9kYWxTdGF0ZS5Vbm11dGVOb3RpZmljYXRpb25zKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHNldE1vZGFsU3RhdGUoTW9kYWxTdGF0ZS5NdXRlTm90aWZpY2F0aW9ucyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfX1cbiAgICAgICAgICB2YXJpYW50PXtCdXR0b25WYXJpYW50LkRldGFpbHN9XG4gICAgICAgID5cbiAgICAgICAgICB7aXNNdXRlZCA/IGkxOG4oJ3VubXV0ZScpIDogaTE4bignbXV0ZScpfVxuICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgPEJ1dHRvblxuICAgICAgICAgIGljb249e0J1dHRvbkljb25UeXBlLnNlYXJjaH1cbiAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICBzZWFyY2hJbkNvbnZlcnNhdGlvbihjb252ZXJzYXRpb24uaWQpO1xuICAgICAgICAgIH19XG4gICAgICAgICAgdmFyaWFudD17QnV0dG9uVmFyaWFudC5EZXRhaWxzfVxuICAgICAgICA+XG4gICAgICAgICAge2kxOG4oJ3NlYXJjaCcpfVxuICAgICAgICA8L0J1dHRvbj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8UGFuZWxTZWN0aW9uPlxuICAgICAgICB7IWlzR3JvdXAgfHwgY2FuRWRpdEdyb3VwSW5mbyA/IChcbiAgICAgICAgICA8UGFuZWxSb3dcbiAgICAgICAgICAgIGljb249e1xuICAgICAgICAgICAgICA8Q29udmVyc2F0aW9uRGV0YWlsc0ljb25cbiAgICAgICAgICAgICAgICBhcmlhTGFiZWw9e2kxOG4oXG4gICAgICAgICAgICAgICAgICAnQ29udmVyc2F0aW9uRGV0YWlscy0tZGlzYXBwZWFyaW5nLW1lc3NhZ2VzLWxhYmVsJ1xuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgaWNvbj17SWNvblR5cGUudGltZXJ9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpbmZvPXtpMThuKFxuICAgICAgICAgICAgICBpc0dyb3VwXG4gICAgICAgICAgICAgICAgPyAnQ29udmVyc2F0aW9uRGV0YWlscy0tZGlzYXBwZWFyaW5nLW1lc3NhZ2VzLWluZm8tLWdyb3VwJ1xuICAgICAgICAgICAgICAgIDogJ0NvbnZlcnNhdGlvbkRldGFpbHMtLWRpc2FwcGVhcmluZy1tZXNzYWdlcy1pbmZvLS1kaXJlY3QnXG4gICAgICAgICAgICApfVxuICAgICAgICAgICAgbGFiZWw9e2kxOG4oJ0NvbnZlcnNhdGlvbkRldGFpbHMtLWRpc2FwcGVhcmluZy1tZXNzYWdlcy1sYWJlbCcpfVxuICAgICAgICAgICAgcmlnaHQ9e1xuICAgICAgICAgICAgICA8RGlzYXBwZWFyaW5nVGltZXJTZWxlY3RcbiAgICAgICAgICAgICAgICBpMThuPXtpMThufVxuICAgICAgICAgICAgICAgIHZhbHVlPXtjb252ZXJzYXRpb24uZXhwaXJlVGltZXIgfHwgMH1cbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17c2V0RGlzYXBwZWFyaW5nTWVzc2FnZXN9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICB9XG4gICAgICAgICAgLz5cbiAgICAgICAgKSA6IG51bGx9XG4gICAgICAgIDxQYW5lbFJvd1xuICAgICAgICAgIGljb249e1xuICAgICAgICAgICAgPENvbnZlcnNhdGlvbkRldGFpbHNJY29uXG4gICAgICAgICAgICAgIGFyaWFMYWJlbD17aTE4bignc2hvd0NoYXRDb2xvckVkaXRvcicpfVxuICAgICAgICAgICAgICBpY29uPXtJY29uVHlwZS5jb2xvcn1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgfVxuICAgICAgICAgIGxhYmVsPXtpMThuKCdzaG93Q2hhdENvbG9yRWRpdG9yJyl9XG4gICAgICAgICAgb25DbGljaz17c2hvd0NoYXRDb2xvckVkaXRvcn1cbiAgICAgICAgICByaWdodD17XG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YENvbnZlcnNhdGlvbkRldGFpbHNfX2NoYXQtY29sb3IgQ29udmVyc2F0aW9uRGV0YWlsc19fY2hhdC1jb2xvci0tJHtjb252ZXJzYXRpb24uY29udmVyc2F0aW9uQ29sb3J9YH1cbiAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAuLi5nZXRDdXN0b21Db2xvclN0eWxlKGNvbnZlcnNhdGlvbi5jdXN0b21Db2xvciksXG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIH1cbiAgICAgICAgLz5cbiAgICAgICAge2lzR3JvdXAgJiYgKFxuICAgICAgICAgIDxQYW5lbFJvd1xuICAgICAgICAgICAgaWNvbj17XG4gICAgICAgICAgICAgIDxDb252ZXJzYXRpb25EZXRhaWxzSWNvblxuICAgICAgICAgICAgICAgIGFyaWFMYWJlbD17aTE4bignQ29udmVyc2F0aW9uRGV0YWlscy0tbm90aWZpY2F0aW9ucycpfVxuICAgICAgICAgICAgICAgIGljb249e0ljb25UeXBlLm5vdGlmaWNhdGlvbnN9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsYWJlbD17aTE4bignQ29udmVyc2F0aW9uRGV0YWlscy0tbm90aWZpY2F0aW9ucycpfVxuICAgICAgICAgICAgb25DbGljaz17c2hvd0NvbnZlcnNhdGlvbk5vdGlmaWNhdGlvbnNTZXR0aW5nc31cbiAgICAgICAgICAgIHJpZ2h0PXtcbiAgICAgICAgICAgICAgY29udmVyc2F0aW9uLm11dGVFeHBpcmVzQXRcbiAgICAgICAgICAgICAgICA/IGdldE11dGVkVW50aWxUZXh0KGNvbnZlcnNhdGlvbi5tdXRlRXhwaXJlc0F0LCBpMThuKVxuICAgICAgICAgICAgICAgIDogdW5kZWZpbmVkXG4gICAgICAgICAgICB9XG4gICAgICAgICAgLz5cbiAgICAgICAgKX1cbiAgICAgICAgeyFpc0dyb3VwICYmICFjb252ZXJzYXRpb24uaXNNZSAmJiAoXG4gICAgICAgICAgPD5cbiAgICAgICAgICAgIDxQYW5lbFJvd1xuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB0b2dnbGVTYWZldHlOdW1iZXJNb2RhbChjb252ZXJzYXRpb24uaWQpfVxuICAgICAgICAgICAgICBpY29uPXtcbiAgICAgICAgICAgICAgICA8Q29udmVyc2F0aW9uRGV0YWlsc0ljb25cbiAgICAgICAgICAgICAgICAgIGFyaWFMYWJlbD17aTE4bigndmVyaWZ5TmV3TnVtYmVyJyl9XG4gICAgICAgICAgICAgICAgICBpY29uPXtJY29uVHlwZS52ZXJpZnl9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBsYWJlbD17XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJDb252ZXJzYXRpb25EZXRhaWxzX19zYWZldHktbnVtYmVyXCI+XG4gICAgICAgICAgICAgICAgICB7aTE4bigndmVyaWZ5TmV3TnVtYmVyJyl9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC8+XG4gICAgICAgICl9XG4gICAgICA8L1BhbmVsU2VjdGlvbj5cblxuICAgICAge2lzR3JvdXAgJiYgKFxuICAgICAgICA8Q29udmVyc2F0aW9uRGV0YWlsc01lbWJlcnNoaXBMaXN0XG4gICAgICAgICAgY2FuQWRkTmV3TWVtYmVycz17Y2FuRWRpdEdyb3VwSW5mb31cbiAgICAgICAgICBjb252ZXJzYXRpb25JZD17Y29udmVyc2F0aW9uLmlkfVxuICAgICAgICAgIGdldFByZWZlcnJlZEJhZGdlPXtnZXRQcmVmZXJyZWRCYWRnZX1cbiAgICAgICAgICBpMThuPXtpMThufVxuICAgICAgICAgIG1lbWJlcnNoaXBzPXttZW1iZXJzaGlwc31cbiAgICAgICAgICBzaG93Q29udGFjdE1vZGFsPXtzaG93Q29udGFjdE1vZGFsfVxuICAgICAgICAgIHN0YXJ0QWRkaW5nTmV3TWVtYmVycz17KCkgPT4ge1xuICAgICAgICAgICAgc2V0TW9kYWxTdGF0ZShNb2RhbFN0YXRlLkFkZGluZ0dyb3VwTWVtYmVycyk7XG4gICAgICAgICAgfX1cbiAgICAgICAgICB0aGVtZT17dGhlbWV9XG4gICAgICAgIC8+XG4gICAgICApfVxuXG4gICAgICB7aXNHcm91cCAmJiAoXG4gICAgICAgIDxQYW5lbFNlY3Rpb24+XG4gICAgICAgICAge2lzQWRtaW4gfHwgaGFzR3JvdXBMaW5rID8gKFxuICAgICAgICAgICAgPFBhbmVsUm93XG4gICAgICAgICAgICAgIGljb249e1xuICAgICAgICAgICAgICAgIDxDb252ZXJzYXRpb25EZXRhaWxzSWNvblxuICAgICAgICAgICAgICAgICAgYXJpYUxhYmVsPXtpMThuKCdDb252ZXJzYXRpb25EZXRhaWxzLS1ncm91cC1saW5rJyl9XG4gICAgICAgICAgICAgICAgICBpY29uPXtJY29uVHlwZS5saW5rfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgbGFiZWw9e2kxOG4oJ0NvbnZlcnNhdGlvbkRldGFpbHMtLWdyb3VwLWxpbmsnKX1cbiAgICAgICAgICAgICAgb25DbGljaz17c2hvd0dyb3VwTGlua01hbmFnZW1lbnR9XG4gICAgICAgICAgICAgIHJpZ2h0PXtoYXNHcm91cExpbmsgPyBpMThuKCdvbicpIDogaTE4bignb2ZmJyl9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgIDxQYW5lbFJvd1xuICAgICAgICAgICAgaWNvbj17XG4gICAgICAgICAgICAgIDxDb252ZXJzYXRpb25EZXRhaWxzSWNvblxuICAgICAgICAgICAgICAgIGFyaWFMYWJlbD17aTE4bignQ29udmVyc2F0aW9uRGV0YWlscy0tcmVxdWVzdHMtYW5kLWludml0ZXMnKX1cbiAgICAgICAgICAgICAgICBpY29uPXtJY29uVHlwZS5pbnZpdGVzfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGFiZWw9e2kxOG4oJ0NvbnZlcnNhdGlvbkRldGFpbHMtLXJlcXVlc3RzLWFuZC1pbnZpdGVzJyl9XG4gICAgICAgICAgICBvbkNsaWNrPXtzaG93UGVuZGluZ0ludml0ZXN9XG4gICAgICAgICAgICByaWdodD17aW52aXRlc0NvdW50fVxuICAgICAgICAgIC8+XG4gICAgICAgICAge2lzQWRtaW4gPyAoXG4gICAgICAgICAgICA8UGFuZWxSb3dcbiAgICAgICAgICAgICAgaWNvbj17XG4gICAgICAgICAgICAgICAgPENvbnZlcnNhdGlvbkRldGFpbHNJY29uXG4gICAgICAgICAgICAgICAgICBhcmlhTGFiZWw9e2kxOG4oJ3Blcm1pc3Npb25zJyl9XG4gICAgICAgICAgICAgICAgICBpY29uPXtJY29uVHlwZS5sb2NrfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgbGFiZWw9e2kxOG4oJ3Blcm1pc3Npb25zJyl9XG4gICAgICAgICAgICAgIG9uQ2xpY2s9e3Nob3dHcm91cFYyUGVybWlzc2lvbnN9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICA8L1BhbmVsU2VjdGlvbj5cbiAgICAgICl9XG5cbiAgICAgIDxDb252ZXJzYXRpb25EZXRhaWxzTWVkaWFMaXN0XG4gICAgICAgIGNvbnZlcnNhdGlvbj17Y29udmVyc2F0aW9ufVxuICAgICAgICBpMThuPXtpMThufVxuICAgICAgICBsb2FkUmVjZW50TWVkaWFJdGVtcz17bG9hZFJlY2VudE1lZGlhSXRlbXN9XG4gICAgICAgIHNob3dBbGxNZWRpYT17c2hvd0FsbE1lZGlhfVxuICAgICAgICBzaG93TGlnaHRib3hGb3JNZWRpYT17c2hvd0xpZ2h0Ym94Rm9yTWVkaWF9XG4gICAgICAvPlxuXG4gICAgICB7IWNvbnZlcnNhdGlvbi5pc01lICYmIChcbiAgICAgICAgPENvbnZlcnNhdGlvbkRldGFpbHNBY3Rpb25zXG4gICAgICAgICAgY2Fubm90TGVhdmVCZWNhdXNlWW91QXJlTGFzdEFkbWluPXtjYW5ub3RMZWF2ZUJlY2F1c2VZb3VBcmVMYXN0QWRtaW59XG4gICAgICAgICAgY29udmVyc2F0aW9uVGl0bGU9e2NvbnZlcnNhdGlvbi50aXRsZX1cbiAgICAgICAgICBpMThuPXtpMThufVxuICAgICAgICAgIGlzQmxvY2tlZD17Qm9vbGVhbihjb252ZXJzYXRpb24uaXNCbG9ja2VkKX1cbiAgICAgICAgICBpc0dyb3VwPXtpc0dyb3VwfVxuICAgICAgICAgIGxlZnQ9e0Jvb2xlYW4oY29udmVyc2F0aW9uLmxlZnQpfVxuICAgICAgICAgIG9uQmxvY2s9e29uQmxvY2t9XG4gICAgICAgICAgb25MZWF2ZT17b25MZWF2ZX1cbiAgICAgICAgICBvblVuYmxvY2s9e29uVW5ibG9ja31cbiAgICAgICAgLz5cbiAgICAgICl9XG5cbiAgICAgIHttb2RhbE5vZGV9XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5mdW5jdGlvbiBDb252ZXJzYXRpb25EZXRhaWxzQ2FsbEJ1dHRvbih7XG4gIGRpc2FibGVkLFxuICBpMThuLFxuICBvbkNsaWNrLFxuICB0eXBlLFxufTogUmVhZG9ubHk8e1xuICBkaXNhYmxlZDogYm9vbGVhbjtcbiAgaTE4bjogTG9jYWxpemVyVHlwZTtcbiAgb25DbGljazogKCkgPT4gdW5rbm93bjtcbiAgdHlwZTogJ2F1ZGlvJyB8ICd2aWRlbyc7XG59Pikge1xuICBjb25zdCBidXR0b24gPSAoXG4gICAgPEJ1dHRvblxuICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgaWNvbj17QnV0dG9uSWNvblR5cGVbdHlwZV19XG4gICAgICBvbkNsaWNrPXtvbkNsaWNrfVxuICAgICAgdmFyaWFudD17QnV0dG9uVmFyaWFudC5EZXRhaWxzfVxuICAgID5cbiAgICAgIHtpMThuKHR5cGUpfVxuICAgIDwvQnV0dG9uPlxuICApO1xuXG4gIGlmIChkaXNhYmxlZCkge1xuICAgIHJldHVybiAoXG4gICAgICA8VG9vbHRpcCBjb250ZW50PXtpMThuKCdjYWxsaW5nX19pbi1hbm90aGVyLWNhbGwtdG9vbHRpcCcpfT5cbiAgICAgICAge2J1dHRvbn1cbiAgICAgIDwvVG9vbHRpcD5cbiAgICApO1xuICB9XG5cbiAgcmV0dXJuIGJ1dHRvbjtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFJQSxt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
