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
var LeftPaneSetGroupMetadataHelper_exports = {};
__export(LeftPaneSetGroupMetadataHelper_exports, {
  LeftPaneSetGroupMetadataHelper: () => LeftPaneSetGroupMetadataHelper
});
module.exports = __toCommonJS(LeftPaneSetGroupMetadataHelper_exports);
var import_react = __toESM(require("react"));
var import_LeftPaneHelper = require("./LeftPaneHelper");
var import_ConversationList = require("../ConversationList");
var import_DisappearingTimerSelect = require("../DisappearingTimerSelect");
var import_Alert = require("../Alert");
var import_AvatarEditor = require("../AvatarEditor");
var import_AvatarPreview = require("../AvatarPreview");
var import_Spinner = require("../Spinner");
var import_Button = require("../Button");
var import_Modal = require("../Modal");
var import_GroupTitleInput = require("../GroupTitleInput");
var import_Colors = require("../../types/Colors");
class LeftPaneSetGroupMetadataHelper extends import_LeftPaneHelper.LeftPaneHelper {
  constructor({
    groupAvatar,
    groupName,
    groupExpireTimer,
    hasError,
    isCreating,
    isEditingAvatar,
    selectedContacts,
    userAvatarData
  }) {
    super();
    this.groupAvatar = groupAvatar;
    this.groupName = groupName;
    this.groupExpireTimer = groupExpireTimer;
    this.hasError = hasError;
    this.isCreating = isCreating;
    this.isEditingAvatar = isEditingAvatar;
    this.selectedContacts = selectedContacts;
    this.userAvatarData = userAvatarData;
  }
  getHeaderContents({
    i18n,
    showChooseGroupMembers
  }) {
    const backButtonLabel = i18n("setGroupMetadata__back-button");
    return /* @__PURE__ */ import_react.default.createElement("div", {
      className: "module-left-pane__header__contents"
    }, /* @__PURE__ */ import_react.default.createElement("button", {
      "aria-label": backButtonLabel,
      className: "module-left-pane__header__contents__back-button",
      disabled: this.isCreating,
      onClick: this.getBackAction({ showChooseGroupMembers }),
      title: backButtonLabel,
      type: "button"
    }), /* @__PURE__ */ import_react.default.createElement("div", {
      className: "module-left-pane__header__contents__text"
    }, i18n("setGroupMetadata__title")));
  }
  getBackAction({
    showChooseGroupMembers
  }) {
    return this.isCreating ? void 0 : showChooseGroupMembers;
  }
  getPreRowsNode({
    clearGroupCreationError,
    composeDeleteAvatarFromDisk,
    composeReplaceAvatar,
    composeSaveAvatarToDisk,
    createGroup,
    i18n,
    setComposeGroupAvatar,
    setComposeGroupExpireTimer,
    setComposeGroupName,
    toggleComposeEditingAvatar
  }) {
    const [avatarColor] = import_Colors.AvatarColors;
    const disabled = this.isCreating;
    return /* @__PURE__ */ import_react.default.createElement("form", {
      className: "module-left-pane__header__form",
      onSubmit: (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (!this.canCreateGroup()) {
          return;
        }
        createGroup();
      }
    }, this.isEditingAvatar && /* @__PURE__ */ import_react.default.createElement(import_Modal.Modal, {
      hasStickyButtons: true,
      hasXButton: true,
      i18n,
      onClose: toggleComposeEditingAvatar,
      title: i18n("LeftPaneSetGroupMetadataHelper__avatar-modal-title")
    }, /* @__PURE__ */ import_react.default.createElement(import_AvatarEditor.AvatarEditor, {
      avatarColor,
      avatarValue: this.groupAvatar,
      deleteAvatarFromDisk: composeDeleteAvatarFromDisk,
      i18n,
      isGroup: true,
      onCancel: toggleComposeEditingAvatar,
      onSave: (newAvatar) => {
        setComposeGroupAvatar(newAvatar);
        toggleComposeEditingAvatar();
      },
      userAvatarData: this.userAvatarData,
      replaceAvatar: composeReplaceAvatar,
      saveAvatarToDisk: composeSaveAvatarToDisk
    })), /* @__PURE__ */ import_react.default.createElement(import_AvatarPreview.AvatarPreview, {
      avatarColor,
      avatarValue: this.groupAvatar,
      i18n,
      isEditable: true,
      isGroup: true,
      onClick: toggleComposeEditingAvatar,
      style: {
        height: 96,
        margin: 0,
        width: 96
      }
    }), /* @__PURE__ */ import_react.default.createElement("div", {
      className: "module-GroupInput--container"
    }, /* @__PURE__ */ import_react.default.createElement(import_GroupTitleInput.GroupTitleInput, {
      disabled,
      i18n,
      onChangeValue: setComposeGroupName,
      ref: focusRef,
      value: this.groupName
    })), /* @__PURE__ */ import_react.default.createElement("section", {
      className: "module-left-pane__header__form__expire-timer"
    }, /* @__PURE__ */ import_react.default.createElement("div", {
      className: "module-left-pane__header__form__expire-timer__label"
    }, i18n("disappearingMessages")), /* @__PURE__ */ import_react.default.createElement(import_DisappearingTimerSelect.DisappearingTimerSelect, {
      i18n,
      value: this.groupExpireTimer,
      onChange: setComposeGroupExpireTimer
    })), this.hasError && /* @__PURE__ */ import_react.default.createElement(import_Alert.Alert, {
      body: i18n("setGroupMetadata__error-message"),
      i18n,
      onClose: clearGroupCreationError
    }));
  }
  getFooterContents({
    createGroup,
    i18n
  }) {
    return /* @__PURE__ */ import_react.default.createElement(import_Button.Button, {
      disabled: !this.canCreateGroup(),
      onClick: () => {
        createGroup();
      }
    }, this.isCreating ? /* @__PURE__ */ import_react.default.createElement(import_Spinner.Spinner, {
      size: "20px",
      svgSize: "small",
      direction: "on-avatar"
    }) : i18n("setGroupMetadata__create-group"));
  }
  getRowCount() {
    if (!this.selectedContacts.length) {
      return 0;
    }
    return this.selectedContacts.length + 2;
  }
  getRow(rowIndex) {
    if (!this.selectedContacts.length) {
      return void 0;
    }
    if (rowIndex === 0) {
      return {
        type: import_ConversationList.RowType.Header,
        i18nKey: "setGroupMetadata__members-header"
      };
    }
    if (rowIndex === this.selectedContacts.length + 1) {
      return { type: import_ConversationList.RowType.Blank };
    }
    const contact = this.selectedContacts[rowIndex - 1];
    return contact ? {
      type: import_ConversationList.RowType.Contact,
      contact,
      isClickable: false
    } : void 0;
  }
  getConversationAndMessageAtIndex(..._args) {
    return void 0;
  }
  getConversationAndMessageInDirection(..._args) {
    return void 0;
  }
  shouldRecomputeRowHeights(_old) {
    return false;
  }
  canCreateGroup() {
    return !this.isCreating && Boolean(this.groupName.trim());
  }
}
function focusRef(el) {
  if (el) {
    el.focus();
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  LeftPaneSetGroupMetadataHelper
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiTGVmdFBhbmVTZXRHcm91cE1ldGFkYXRhSGVscGVyLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgdHlwZSB7IFJlYWN0Q2hpbGQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgeyBMZWZ0UGFuZUhlbHBlciB9IGZyb20gJy4vTGVmdFBhbmVIZWxwZXInO1xuaW1wb3J0IHR5cGUgeyBSb3cgfSBmcm9tICcuLi9Db252ZXJzYXRpb25MaXN0JztcbmltcG9ydCB7IFJvd1R5cGUgfSBmcm9tICcuLi9Db252ZXJzYXRpb25MaXN0JztcbmltcG9ydCB0eXBlIHsgQ29udGFjdExpc3RJdGVtQ29udmVyc2F0aW9uVHlwZSB9IGZyb20gJy4uL2NvbnZlcnNhdGlvbkxpc3QvQ29udGFjdExpc3RJdGVtJztcbmltcG9ydCB7IERpc2FwcGVhcmluZ1RpbWVyU2VsZWN0IH0gZnJvbSAnLi4vRGlzYXBwZWFyaW5nVGltZXJTZWxlY3QnO1xuaW1wb3J0IHR5cGUgeyBMb2NhbGl6ZXJUeXBlIH0gZnJvbSAnLi4vLi4vdHlwZXMvVXRpbCc7XG5pbXBvcnQgeyBBbGVydCB9IGZyb20gJy4uL0FsZXJ0JztcbmltcG9ydCB7IEF2YXRhckVkaXRvciB9IGZyb20gJy4uL0F2YXRhckVkaXRvcic7XG5pbXBvcnQgeyBBdmF0YXJQcmV2aWV3IH0gZnJvbSAnLi4vQXZhdGFyUHJldmlldyc7XG5pbXBvcnQgeyBTcGlubmVyIH0gZnJvbSAnLi4vU3Bpbm5lcic7XG5pbXBvcnQgeyBCdXR0b24gfSBmcm9tICcuLi9CdXR0b24nO1xuaW1wb3J0IHsgTW9kYWwgfSBmcm9tICcuLi9Nb2RhbCc7XG5pbXBvcnQgeyBHcm91cFRpdGxlSW5wdXQgfSBmcm9tICcuLi9Hcm91cFRpdGxlSW5wdXQnO1xuaW1wb3J0IHR5cGUge1xuICBBdmF0YXJEYXRhVHlwZSxcbiAgRGVsZXRlQXZhdGFyRnJvbURpc2tBY3Rpb25UeXBlLFxuICBSZXBsYWNlQXZhdGFyQWN0aW9uVHlwZSxcbiAgU2F2ZUF2YXRhclRvRGlza0FjdGlvblR5cGUsXG59IGZyb20gJy4uLy4uL3R5cGVzL0F2YXRhcic7XG5pbXBvcnQgeyBBdmF0YXJDb2xvcnMgfSBmcm9tICcuLi8uLi90eXBlcy9Db2xvcnMnO1xuXG5leHBvcnQgdHlwZSBMZWZ0UGFuZVNldEdyb3VwTWV0YWRhdGFQcm9wc1R5cGUgPSB7XG4gIGdyb3VwQXZhdGFyOiB1bmRlZmluZWQgfCBVaW50OEFycmF5O1xuICBncm91cE5hbWU6IHN0cmluZztcbiAgZ3JvdXBFeHBpcmVUaW1lcjogbnVtYmVyO1xuICBoYXNFcnJvcjogYm9vbGVhbjtcbiAgaXNDcmVhdGluZzogYm9vbGVhbjtcbiAgaXNFZGl0aW5nQXZhdGFyOiBib29sZWFuO1xuICBzZWxlY3RlZENvbnRhY3RzOiBSZWFkb25seUFycmF5PENvbnRhY3RMaXN0SXRlbUNvbnZlcnNhdGlvblR5cGU+O1xuICB1c2VyQXZhdGFyRGF0YTogUmVhZG9ubHlBcnJheTxBdmF0YXJEYXRhVHlwZT47XG59O1xuXG5leHBvcnQgY2xhc3MgTGVmdFBhbmVTZXRHcm91cE1ldGFkYXRhSGVscGVyIGV4dGVuZHMgTGVmdFBhbmVIZWxwZXI8TGVmdFBhbmVTZXRHcm91cE1ldGFkYXRhUHJvcHNUeXBlPiB7XG4gIHByaXZhdGUgcmVhZG9ubHkgZ3JvdXBBdmF0YXI6IHVuZGVmaW5lZCB8IFVpbnQ4QXJyYXk7XG5cbiAgcHJpdmF0ZSByZWFkb25seSBncm91cE5hbWU6IHN0cmluZztcblxuICBwcml2YXRlIHJlYWRvbmx5IGdyb3VwRXhwaXJlVGltZXI6IG51bWJlcjtcblxuICBwcml2YXRlIHJlYWRvbmx5IGhhc0Vycm9yOiBib29sZWFuO1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgaXNDcmVhdGluZzogYm9vbGVhbjtcblxuICBwcml2YXRlIHJlYWRvbmx5IGlzRWRpdGluZ0F2YXRhcjogYm9vbGVhbjtcblxuICBwcml2YXRlIHJlYWRvbmx5IHNlbGVjdGVkQ29udGFjdHM6IFJlYWRvbmx5QXJyYXk8Q29udGFjdExpc3RJdGVtQ29udmVyc2F0aW9uVHlwZT47XG5cbiAgcHJpdmF0ZSByZWFkb25seSB1c2VyQXZhdGFyRGF0YTogUmVhZG9ubHlBcnJheTxBdmF0YXJEYXRhVHlwZT47XG5cbiAgY29uc3RydWN0b3Ioe1xuICAgIGdyb3VwQXZhdGFyLFxuICAgIGdyb3VwTmFtZSxcbiAgICBncm91cEV4cGlyZVRpbWVyLFxuICAgIGhhc0Vycm9yLFxuICAgIGlzQ3JlYXRpbmcsXG4gICAgaXNFZGl0aW5nQXZhdGFyLFxuICAgIHNlbGVjdGVkQ29udGFjdHMsXG4gICAgdXNlckF2YXRhckRhdGEsXG4gIH06IFJlYWRvbmx5PExlZnRQYW5lU2V0R3JvdXBNZXRhZGF0YVByb3BzVHlwZT4pIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5ncm91cEF2YXRhciA9IGdyb3VwQXZhdGFyO1xuICAgIHRoaXMuZ3JvdXBOYW1lID0gZ3JvdXBOYW1lO1xuICAgIHRoaXMuZ3JvdXBFeHBpcmVUaW1lciA9IGdyb3VwRXhwaXJlVGltZXI7XG4gICAgdGhpcy5oYXNFcnJvciA9IGhhc0Vycm9yO1xuICAgIHRoaXMuaXNDcmVhdGluZyA9IGlzQ3JlYXRpbmc7XG4gICAgdGhpcy5pc0VkaXRpbmdBdmF0YXIgPSBpc0VkaXRpbmdBdmF0YXI7XG4gICAgdGhpcy5zZWxlY3RlZENvbnRhY3RzID0gc2VsZWN0ZWRDb250YWN0cztcbiAgICB0aGlzLnVzZXJBdmF0YXJEYXRhID0gdXNlckF2YXRhckRhdGE7XG4gIH1cblxuICBvdmVycmlkZSBnZXRIZWFkZXJDb250ZW50cyh7XG4gICAgaTE4bixcbiAgICBzaG93Q2hvb3NlR3JvdXBNZW1iZXJzLFxuICB9OiBSZWFkb25seTx7XG4gICAgaTE4bjogTG9jYWxpemVyVHlwZTtcbiAgICBzaG93Q2hvb3NlR3JvdXBNZW1iZXJzOiAoKSA9PiB2b2lkO1xuICB9Pik6IFJlYWN0Q2hpbGQge1xuICAgIGNvbnN0IGJhY2tCdXR0b25MYWJlbCA9IGkxOG4oJ3NldEdyb3VwTWV0YWRhdGFfX2JhY2stYnV0dG9uJyk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2R1bGUtbGVmdC1wYW5lX19oZWFkZXJfX2NvbnRlbnRzXCI+XG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICBhcmlhLWxhYmVsPXtiYWNrQnV0dG9uTGFiZWx9XG4gICAgICAgICAgY2xhc3NOYW1lPVwibW9kdWxlLWxlZnQtcGFuZV9faGVhZGVyX19jb250ZW50c19fYmFjay1idXR0b25cIlxuICAgICAgICAgIGRpc2FibGVkPXt0aGlzLmlzQ3JlYXRpbmd9XG4gICAgICAgICAgb25DbGljaz17dGhpcy5nZXRCYWNrQWN0aW9uKHsgc2hvd0Nob29zZUdyb3VwTWVtYmVycyB9KX1cbiAgICAgICAgICB0aXRsZT17YmFja0J1dHRvbkxhYmVsfVxuICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAvPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZHVsZS1sZWZ0LXBhbmVfX2hlYWRlcl9fY29udGVudHNfX3RleHRcIj5cbiAgICAgICAgICB7aTE4bignc2V0R3JvdXBNZXRhZGF0YV9fdGl0bGUnKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbiAgb3ZlcnJpZGUgZ2V0QmFja0FjdGlvbih7XG4gICAgc2hvd0Nob29zZUdyb3VwTWVtYmVycyxcbiAgfToge1xuICAgIHNob3dDaG9vc2VHcm91cE1lbWJlcnM6ICgpID0+IHZvaWQ7XG4gIH0pOiB1bmRlZmluZWQgfCAoKCkgPT4gdm9pZCkge1xuICAgIHJldHVybiB0aGlzLmlzQ3JlYXRpbmcgPyB1bmRlZmluZWQgOiBzaG93Q2hvb3NlR3JvdXBNZW1iZXJzO1xuICB9XG5cbiAgb3ZlcnJpZGUgZ2V0UHJlUm93c05vZGUoe1xuICAgIGNsZWFyR3JvdXBDcmVhdGlvbkVycm9yLFxuICAgIGNvbXBvc2VEZWxldGVBdmF0YXJGcm9tRGlzayxcbiAgICBjb21wb3NlUmVwbGFjZUF2YXRhcixcbiAgICBjb21wb3NlU2F2ZUF2YXRhclRvRGlzayxcbiAgICBjcmVhdGVHcm91cCxcbiAgICBpMThuLFxuICAgIHNldENvbXBvc2VHcm91cEF2YXRhcixcbiAgICBzZXRDb21wb3NlR3JvdXBFeHBpcmVUaW1lcixcbiAgICBzZXRDb21wb3NlR3JvdXBOYW1lLFxuICAgIHRvZ2dsZUNvbXBvc2VFZGl0aW5nQXZhdGFyLFxuICB9OiBSZWFkb25seTx7XG4gICAgY2xlYXJHcm91cENyZWF0aW9uRXJyb3I6ICgpID0+IHVua25vd247XG4gICAgY29tcG9zZURlbGV0ZUF2YXRhckZyb21EaXNrOiBEZWxldGVBdmF0YXJGcm9tRGlza0FjdGlvblR5cGU7XG4gICAgY29tcG9zZVJlcGxhY2VBdmF0YXI6IFJlcGxhY2VBdmF0YXJBY3Rpb25UeXBlO1xuICAgIGNvbXBvc2VTYXZlQXZhdGFyVG9EaXNrOiBTYXZlQXZhdGFyVG9EaXNrQWN0aW9uVHlwZTtcbiAgICBjcmVhdGVHcm91cDogKCkgPT4gdW5rbm93bjtcbiAgICBpMThuOiBMb2NhbGl6ZXJUeXBlO1xuICAgIHNldENvbXBvc2VHcm91cEF2YXRhcjogKF86IHVuZGVmaW5lZCB8IFVpbnQ4QXJyYXkpID0+IHVua25vd247XG4gICAgc2V0Q29tcG9zZUdyb3VwRXhwaXJlVGltZXI6IChfOiBudW1iZXIpID0+IHZvaWQ7XG4gICAgc2V0Q29tcG9zZUdyb3VwTmFtZTogKF86IHN0cmluZykgPT4gdW5rbm93bjtcbiAgICB0b2dnbGVDb21wb3NlRWRpdGluZ0F2YXRhcjogKCkgPT4gdW5rbm93bjtcbiAgfT4pOiBSZWFjdENoaWxkIHtcbiAgICBjb25zdCBbYXZhdGFyQ29sb3JdID0gQXZhdGFyQ29sb3JzO1xuICAgIGNvbnN0IGRpc2FibGVkID0gdGhpcy5pc0NyZWF0aW5nO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxmb3JtXG4gICAgICAgIGNsYXNzTmFtZT1cIm1vZHVsZS1sZWZ0LXBhbmVfX2hlYWRlcl9fZm9ybVwiXG4gICAgICAgIG9uU3VibWl0PXtldmVudCA9PiB7XG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICAgIGlmICghdGhpcy5jYW5DcmVhdGVHcm91cCgpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY3JlYXRlR3JvdXAoKTtcbiAgICAgICAgfX1cbiAgICAgID5cbiAgICAgICAge3RoaXMuaXNFZGl0aW5nQXZhdGFyICYmIChcbiAgICAgICAgICA8TW9kYWxcbiAgICAgICAgICAgIGhhc1N0aWNreUJ1dHRvbnNcbiAgICAgICAgICAgIGhhc1hCdXR0b25cbiAgICAgICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgICAgICBvbkNsb3NlPXt0b2dnbGVDb21wb3NlRWRpdGluZ0F2YXRhcn1cbiAgICAgICAgICAgIHRpdGxlPXtpMThuKCdMZWZ0UGFuZVNldEdyb3VwTWV0YWRhdGFIZWxwZXJfX2F2YXRhci1tb2RhbC10aXRsZScpfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxBdmF0YXJFZGl0b3JcbiAgICAgICAgICAgICAgYXZhdGFyQ29sb3I9e2F2YXRhckNvbG9yfVxuICAgICAgICAgICAgICBhdmF0YXJWYWx1ZT17dGhpcy5ncm91cEF2YXRhcn1cbiAgICAgICAgICAgICAgZGVsZXRlQXZhdGFyRnJvbURpc2s9e2NvbXBvc2VEZWxldGVBdmF0YXJGcm9tRGlza31cbiAgICAgICAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgICAgICAgaXNHcm91cFxuICAgICAgICAgICAgICBvbkNhbmNlbD17dG9nZ2xlQ29tcG9zZUVkaXRpbmdBdmF0YXJ9XG4gICAgICAgICAgICAgIG9uU2F2ZT17bmV3QXZhdGFyID0+IHtcbiAgICAgICAgICAgICAgICBzZXRDb21wb3NlR3JvdXBBdmF0YXIobmV3QXZhdGFyKTtcbiAgICAgICAgICAgICAgICB0b2dnbGVDb21wb3NlRWRpdGluZ0F2YXRhcigpO1xuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICB1c2VyQXZhdGFyRGF0YT17dGhpcy51c2VyQXZhdGFyRGF0YX1cbiAgICAgICAgICAgICAgcmVwbGFjZUF2YXRhcj17Y29tcG9zZVJlcGxhY2VBdmF0YXJ9XG4gICAgICAgICAgICAgIHNhdmVBdmF0YXJUb0Rpc2s9e2NvbXBvc2VTYXZlQXZhdGFyVG9EaXNrfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L01vZGFsPlxuICAgICAgICApfVxuICAgICAgICA8QXZhdGFyUHJldmlld1xuICAgICAgICAgIGF2YXRhckNvbG9yPXthdmF0YXJDb2xvcn1cbiAgICAgICAgICBhdmF0YXJWYWx1ZT17dGhpcy5ncm91cEF2YXRhcn1cbiAgICAgICAgICBpMThuPXtpMThufVxuICAgICAgICAgIGlzRWRpdGFibGVcbiAgICAgICAgICBpc0dyb3VwXG4gICAgICAgICAgb25DbGljaz17dG9nZ2xlQ29tcG9zZUVkaXRpbmdBdmF0YXJ9XG4gICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgIGhlaWdodDogOTYsXG4gICAgICAgICAgICBtYXJnaW46IDAsXG4gICAgICAgICAgICB3aWR0aDogOTYsXG4gICAgICAgICAgfX1cbiAgICAgICAgLz5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2R1bGUtR3JvdXBJbnB1dC0tY29udGFpbmVyXCI+XG4gICAgICAgICAgPEdyb3VwVGl0bGVJbnB1dFxuICAgICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgICAgIG9uQ2hhbmdlVmFsdWU9e3NldENvbXBvc2VHcm91cE5hbWV9XG4gICAgICAgICAgICByZWY9e2ZvY3VzUmVmfVxuICAgICAgICAgICAgdmFsdWU9e3RoaXMuZ3JvdXBOYW1lfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cIm1vZHVsZS1sZWZ0LXBhbmVfX2hlYWRlcl9fZm9ybV9fZXhwaXJlLXRpbWVyXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2R1bGUtbGVmdC1wYW5lX19oZWFkZXJfX2Zvcm1fX2V4cGlyZS10aW1lcl9fbGFiZWxcIj5cbiAgICAgICAgICAgIHtpMThuKCdkaXNhcHBlYXJpbmdNZXNzYWdlcycpfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxEaXNhcHBlYXJpbmdUaW1lclNlbGVjdFxuICAgICAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgICAgIHZhbHVlPXt0aGlzLmdyb3VwRXhwaXJlVGltZXJ9XG4gICAgICAgICAgICBvbkNoYW5nZT17c2V0Q29tcG9zZUdyb3VwRXhwaXJlVGltZXJ9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9zZWN0aW9uPlxuXG4gICAgICAgIHt0aGlzLmhhc0Vycm9yICYmIChcbiAgICAgICAgICA8QWxlcnRcbiAgICAgICAgICAgIGJvZHk9e2kxOG4oJ3NldEdyb3VwTWV0YWRhdGFfX2Vycm9yLW1lc3NhZ2UnKX1cbiAgICAgICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgICAgICBvbkNsb3NlPXtjbGVhckdyb3VwQ3JlYXRpb25FcnJvcn1cbiAgICAgICAgICAvPlxuICAgICAgICApfVxuICAgICAgPC9mb3JtPlxuICAgICk7XG4gIH1cblxuICBvdmVycmlkZSBnZXRGb290ZXJDb250ZW50cyh7XG4gICAgY3JlYXRlR3JvdXAsXG4gICAgaTE4bixcbiAgfTogUmVhZG9ubHk8e1xuICAgIGNyZWF0ZUdyb3VwOiAoKSA9PiB1bmtub3duO1xuICAgIGkxOG46IExvY2FsaXplclR5cGU7XG4gIH0+KTogUmVhY3RDaGlsZCB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxCdXR0b25cbiAgICAgICAgZGlzYWJsZWQ9eyF0aGlzLmNhbkNyZWF0ZUdyb3VwKCl9XG4gICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICBjcmVhdGVHcm91cCgpO1xuICAgICAgICB9fVxuICAgICAgPlxuICAgICAgICB7dGhpcy5pc0NyZWF0aW5nID8gKFxuICAgICAgICAgIDxTcGlubmVyIHNpemU9XCIyMHB4XCIgc3ZnU2l6ZT1cInNtYWxsXCIgZGlyZWN0aW9uPVwib24tYXZhdGFyXCIgLz5cbiAgICAgICAgKSA6IChcbiAgICAgICAgICBpMThuKCdzZXRHcm91cE1ldGFkYXRhX19jcmVhdGUtZ3JvdXAnKVxuICAgICAgICApfVxuICAgICAgPC9CdXR0b24+XG4gICAgKTtcbiAgfVxuXG4gIGdldFJvd0NvdW50KCk6IG51bWJlciB7XG4gICAgaWYgKCF0aGlzLnNlbGVjdGVkQ29udGFjdHMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWRDb250YWN0cy5sZW5ndGggKyAyO1xuICB9XG5cbiAgZ2V0Um93KHJvd0luZGV4OiBudW1iZXIpOiB1bmRlZmluZWQgfCBSb3cge1xuICAgIGlmICghdGhpcy5zZWxlY3RlZENvbnRhY3RzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBpZiAocm93SW5kZXggPT09IDApIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IFJvd1R5cGUuSGVhZGVyLFxuICAgICAgICBpMThuS2V5OiAnc2V0R3JvdXBNZXRhZGF0YV9fbWVtYmVycy1oZWFkZXInLFxuICAgICAgfTtcbiAgICB9XG5cbiAgICAvLyBUaGlzIHB1dHMgYSBibGFuayByb3cgZm9yIHRoZSBmb290ZXIuXG4gICAgaWYgKHJvd0luZGV4ID09PSB0aGlzLnNlbGVjdGVkQ29udGFjdHMubGVuZ3RoICsgMSkge1xuICAgICAgcmV0dXJuIHsgdHlwZTogUm93VHlwZS5CbGFuayB9O1xuICAgIH1cblxuICAgIGNvbnN0IGNvbnRhY3QgPSB0aGlzLnNlbGVjdGVkQ29udGFjdHNbcm93SW5kZXggLSAxXTtcbiAgICByZXR1cm4gY29udGFjdFxuICAgICAgPyB7XG4gICAgICAgICAgdHlwZTogUm93VHlwZS5Db250YWN0LFxuICAgICAgICAgIGNvbnRhY3QsXG4gICAgICAgICAgaXNDbGlja2FibGU6IGZhbHNlLFxuICAgICAgICB9XG4gICAgICA6IHVuZGVmaW5lZDtcbiAgfVxuXG4gIC8vIFRoaXMgaXMgZGVsaWJlcmF0ZWx5IHVuaW1wbGVtZW50ZWQgYmVjYXVzZSB0aGVzZSBrZXlib2FyZCBzaG9ydGN1dHMgc2hvdWxkbid0IHdvcmsgaW5cbiAgLy8gICB0aGUgY29tcG9zZXIuIFRoZSBzYW1lIGlzIHRydWUgZm9yIHRoZSBcImluIGRpcmVjdGlvblwiIGZ1bmN0aW9uIGJlbG93LlxuICBnZXRDb252ZXJzYXRpb25BbmRNZXNzYWdlQXRJbmRleChcbiAgICAuLi5fYXJnczogUmVhZG9ubHlBcnJheTx1bmtub3duPlxuICApOiB1bmRlZmluZWQge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICBnZXRDb252ZXJzYXRpb25BbmRNZXNzYWdlSW5EaXJlY3Rpb24oXG4gICAgLi4uX2FyZ3M6IFJlYWRvbmx5QXJyYXk8dW5rbm93bj5cbiAgKTogdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgc2hvdWxkUmVjb21wdXRlUm93SGVpZ2h0cyhfb2xkOiB1bmtub3duKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcHJpdmF0ZSBjYW5DcmVhdGVHcm91cCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gIXRoaXMuaXNDcmVhdGluZyAmJiBCb29sZWFuKHRoaXMuZ3JvdXBOYW1lLnRyaW0oKSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZm9jdXNSZWYoZWw6IEhUTUxFbGVtZW50IHwgbnVsbCkge1xuICBpZiAoZWwpIHtcbiAgICBlbC5mb2N1cygp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
