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
var ConversationHeader_exports = {};
__export(ConversationHeader_exports, {
  ConversationHeader: () => ConversationHeader,
  OutgoingCallButtonStyle: () => OutgoingCallButtonStyle
});
module.exports = __toCommonJS(ConversationHeader_exports);
var import_react = __toESM(require("react"));
var import_react_measure = __toESM(require("react-measure"));
var import_classnames = __toESM(require("classnames"));
var import_react_contextmenu = require("react-contextmenu");
var import_Emojify = require("./Emojify");
var import_DisappearingTimeDialog = require("../DisappearingTimeDialog");
var import_Avatar = require("../Avatar");
var import_InContactsIcon = require("../InContactsIcon");
var import_getMuteOptions = require("../../util/getMuteOptions");
var expirationTimer = __toESM(require("../../util/expirationTimer"));
var import_missingCaseError = require("../../util/missingCaseError");
var import_isInSystemContacts = require("../../util/isInSystemContacts");
var import_useKeyboardShortcuts = require("../../hooks/useKeyboardShortcuts");
var OutgoingCallButtonStyle = /* @__PURE__ */ ((OutgoingCallButtonStyle2) => {
  OutgoingCallButtonStyle2[OutgoingCallButtonStyle2["None"] = 0] = "None";
  OutgoingCallButtonStyle2[OutgoingCallButtonStyle2["JustVideo"] = 1] = "JustVideo";
  OutgoingCallButtonStyle2[OutgoingCallButtonStyle2["Both"] = 2] = "Both";
  OutgoingCallButtonStyle2[OutgoingCallButtonStyle2["Join"] = 3] = "Join";
  return OutgoingCallButtonStyle2;
})(OutgoingCallButtonStyle || {});
var ModalState = /* @__PURE__ */ ((ModalState2) => {
  ModalState2[ModalState2["NothingOpen"] = 0] = "NothingOpen";
  ModalState2[ModalState2["CustomDisappearingTimeout"] = 1] = "CustomDisappearingTimeout";
  return ModalState2;
})(ModalState || {});
const TIMER_ITEM_CLASS = "module-ConversationHeader__disappearing-timer__item";
class ConversationHeader extends import_react.default.Component {
  constructor(props) {
    super(props);
    this.state = { isNarrow: false, modalState: 0 /* NothingOpen */ };
    this.menuTriggerRef = import_react.default.createRef();
    this.headerRef = import_react.default.createRef();
    this.showMenuBound = this.showMenu.bind(this);
  }
  showMenu(event) {
    if (this.menuTriggerRef.current) {
      this.menuTriggerRef.current.handleContextClick(event);
    }
  }
  renderBackButton() {
    const { i18n, onGoBack, showBackButton } = this.props;
    return /* @__PURE__ */ import_react.default.createElement("button", {
      type: "button",
      onClick: onGoBack,
      className: (0, import_classnames.default)("module-ConversationHeader__back-icon", showBackButton ? "module-ConversationHeader__back-icon--show" : null),
      disabled: !showBackButton,
      "aria-label": i18n("goBack")
    });
  }
  renderHeaderInfoTitle() {
    const { name, title, type, i18n, isMe } = this.props;
    if (isMe) {
      return /* @__PURE__ */ import_react.default.createElement("div", {
        className: "module-ConversationHeader__header__info__title"
      }, i18n("noteToSelf"));
    }
    return /* @__PURE__ */ import_react.default.createElement("div", {
      className: "module-ConversationHeader__header__info__title"
    }, /* @__PURE__ */ import_react.default.createElement(import_Emojify.Emojify, {
      text: title
    }), (0, import_isInSystemContacts.isInSystemContacts)({ name, type }) ? /* @__PURE__ */ import_react.default.createElement(import_InContactsIcon.InContactsIcon, {
      className: "module-ConversationHeader__header__info__title__in-contacts-icon",
      i18n,
      tooltipContainerRef: this.headerRef
    }) : null);
  }
  renderHeaderInfoSubtitle() {
    const expirationNode = this.renderExpirationLength();
    const verifiedNode = this.renderVerifiedIcon();
    if (expirationNode || verifiedNode) {
      return /* @__PURE__ */ import_react.default.createElement("div", {
        className: "module-ConversationHeader__header__info__subtitle"
      }, expirationNode, verifiedNode);
    }
    return null;
  }
  renderAvatar() {
    const {
      acceptedMessageRequest,
      avatarPath,
      badge,
      color,
      i18n,
      type,
      isMe,
      name,
      phoneNumber,
      profileName,
      sharedGroupNames,
      theme,
      title,
      unblurredAvatarPath
    } = this.props;
    return /* @__PURE__ */ import_react.default.createElement("span", {
      className: "module-ConversationHeader__header__avatar"
    }, /* @__PURE__ */ import_react.default.createElement(import_Avatar.Avatar, {
      acceptedMessageRequest,
      avatarPath,
      badge,
      color,
      conversationType: type,
      i18n,
      isMe,
      noteToSelf: isMe,
      title,
      name,
      phoneNumber,
      profileName,
      sharedGroupNames,
      size: import_Avatar.AvatarSize.THIRTY_TWO,
      theme,
      unblurredAvatarPath
    }));
  }
  renderExpirationLength() {
    const { i18n, expireTimer } = this.props;
    if (!expireTimer) {
      return null;
    }
    return /* @__PURE__ */ import_react.default.createElement("div", {
      className: "module-ConversationHeader__header__info__subtitle__expiration"
    }, expirationTimer.format(i18n, expireTimer));
  }
  renderVerifiedIcon() {
    const { i18n, isVerified } = this.props;
    if (!isVerified) {
      return null;
    }
    return /* @__PURE__ */ import_react.default.createElement("div", {
      className: "module-ConversationHeader__header__info__subtitle__verified"
    }, i18n("verified"));
  }
  renderMoreButton(triggerId) {
    const { i18n, showBackButton } = this.props;
    return /* @__PURE__ */ import_react.default.createElement(import_react_contextmenu.ContextMenuTrigger, {
      id: triggerId,
      ref: this.menuTriggerRef
    }, /* @__PURE__ */ import_react.default.createElement("button", {
      type: "button",
      onClick: this.showMenuBound,
      className: (0, import_classnames.default)("module-ConversationHeader__button", "module-ConversationHeader__button--more", showBackButton ? null : "module-ConversationHeader__button--show"),
      disabled: showBackButton,
      "aria-label": i18n("moreInfo")
    }));
  }
  renderSearchButton() {
    const { i18n, onSearchInConversation, showBackButton } = this.props;
    return /* @__PURE__ */ import_react.default.createElement("button", {
      type: "button",
      onClick: onSearchInConversation,
      className: (0, import_classnames.default)("module-ConversationHeader__button", "module-ConversationHeader__button--search", showBackButton ? null : "module-ConversationHeader__button--show"),
      disabled: showBackButton,
      "aria-label": i18n("search")
    });
  }
  renderMenu(triggerId) {
    const {
      acceptedMessageRequest,
      canChangeTimer,
      expireTimer,
      groupVersion,
      i18n,
      isArchived,
      isMissingMandatoryProfileSharing,
      isPinned,
      left,
      markedUnread,
      muteExpiresAt,
      onArchive,
      onDeleteMessages,
      onMarkUnread,
      onMoveToInbox,
      onSetDisappearingMessages,
      onSetMuteNotifications,
      onSetPin,
      onShowAllMedia,
      onShowConversationDetails,
      onShowGroupMembers,
      type
    } = this.props;
    const muteOptions = (0, import_getMuteOptions.getMuteOptions)(muteExpiresAt, i18n);
    const disappearingTitle = i18n("disappearingMessages");
    const muteTitle = i18n("muteNotificationsTitle");
    const isGroup = type === "group";
    const disableTimerChanges = Boolean(!canChangeTimer || !acceptedMessageRequest || left || isMissingMandatoryProfileSharing);
    const hasGV2AdminEnabled = isGroup && groupVersion === 2;
    const isActiveExpireTimer = /* @__PURE__ */ __name((value) => {
      if (!expireTimer) {
        return value === 0;
      }
      if (value === -1) {
        return !expirationTimer.DEFAULT_DURATIONS_SET.has(expireTimer);
      }
      return value === expireTimer;
    }, "isActiveExpireTimer");
    const expireDurations = [
      ...expirationTimer.DEFAULT_DURATIONS_IN_SECONDS,
      -1
    ].map((seconds) => {
      let text;
      if (seconds === -1) {
        text = i18n("customDisappearingTimeOption");
      } else {
        text = expirationTimer.format(i18n, seconds, {
          capitalizeOff: true
        });
      }
      const onDurationClick = /* @__PURE__ */ __name(() => {
        if (seconds === -1) {
          this.setState({
            modalState: 1 /* CustomDisappearingTimeout */
          });
        } else {
          onSetDisappearingMessages(seconds);
        }
      }, "onDurationClick");
      return /* @__PURE__ */ import_react.default.createElement(import_react_contextmenu.MenuItem, {
        key: seconds,
        onClick: onDurationClick
      }, /* @__PURE__ */ import_react.default.createElement("div", {
        className: (0, import_classnames.default)(TIMER_ITEM_CLASS, isActiveExpireTimer(seconds) && `${TIMER_ITEM_CLASS}--active`)
      }, text));
    });
    return /* @__PURE__ */ import_react.default.createElement(import_react_contextmenu.ContextMenu, {
      id: triggerId
    }, disableTimerChanges ? null : /* @__PURE__ */ import_react.default.createElement(import_react_contextmenu.SubMenu, {
      hoverDelay: 1,
      title: disappearingTitle,
      rtl: true
    }, expireDurations), /* @__PURE__ */ import_react.default.createElement(import_react_contextmenu.SubMenu, {
      hoverDelay: 1,
      title: muteTitle,
      rtl: true
    }, muteOptions.map((item) => /* @__PURE__ */ import_react.default.createElement(import_react_contextmenu.MenuItem, {
      key: item.name,
      disabled: item.disabled,
      onClick: () => {
        onSetMuteNotifications(item.value);
      }
    }, item.name))), !isGroup || hasGV2AdminEnabled ? /* @__PURE__ */ import_react.default.createElement(import_react_contextmenu.MenuItem, {
      onClick: onShowConversationDetails
    }, isGroup ? i18n("showConversationDetails") : i18n("showConversationDetails--direct")) : null, isGroup && !hasGV2AdminEnabled ? /* @__PURE__ */ import_react.default.createElement(import_react_contextmenu.MenuItem, {
      onClick: onShowGroupMembers
    }, i18n("showMembers")) : null, /* @__PURE__ */ import_react.default.createElement(import_react_contextmenu.MenuItem, {
      onClick: onShowAllMedia
    }, i18n("viewRecentMedia")), /* @__PURE__ */ import_react.default.createElement(import_react_contextmenu.MenuItem, {
      divider: true
    }), !markedUnread ? /* @__PURE__ */ import_react.default.createElement(import_react_contextmenu.MenuItem, {
      onClick: onMarkUnread
    }, i18n("markUnread")) : null, isArchived ? /* @__PURE__ */ import_react.default.createElement(import_react_contextmenu.MenuItem, {
      onClick: onMoveToInbox
    }, i18n("moveConversationToInbox")) : /* @__PURE__ */ import_react.default.createElement(import_react_contextmenu.MenuItem, {
      onClick: onArchive
    }, i18n("archiveConversation")), /* @__PURE__ */ import_react.default.createElement(import_react_contextmenu.MenuItem, {
      onClick: onDeleteMessages
    }, i18n("deleteMessages")), isPinned ? /* @__PURE__ */ import_react.default.createElement(import_react_contextmenu.MenuItem, {
      onClick: () => onSetPin(false)
    }, i18n("unpinConversation")) : /* @__PURE__ */ import_react.default.createElement(import_react_contextmenu.MenuItem, {
      onClick: () => onSetPin(true)
    }, i18n("pinConversation")));
  }
  renderHeader() {
    const { conversationTitle, groupVersion, onShowConversationDetails, type } = this.props;
    if (conversationTitle !== void 0) {
      return /* @__PURE__ */ import_react.default.createElement("div", {
        className: "module-ConversationHeader__header"
      }, /* @__PURE__ */ import_react.default.createElement("div", {
        className: "module-ConversationHeader__header__info"
      }, /* @__PURE__ */ import_react.default.createElement("div", {
        className: "module-ConversationHeader__header__info__title"
      }, conversationTitle)));
    }
    let onClick;
    switch (type) {
      case "direct":
        onClick = /* @__PURE__ */ __name(() => {
          onShowConversationDetails();
        }, "onClick");
        break;
      case "group": {
        const hasGV2AdminEnabled = groupVersion === 2;
        onClick = hasGV2AdminEnabled ? () => {
          onShowConversationDetails();
        } : void 0;
        break;
      }
      default:
        throw (0, import_missingCaseError.missingCaseError)(type);
    }
    const contents = /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, this.renderAvatar(), /* @__PURE__ */ import_react.default.createElement("div", {
      className: "module-ConversationHeader__header__info"
    }, this.renderHeaderInfoTitle(), this.renderHeaderInfoSubtitle()));
    if (onClick) {
      return /* @__PURE__ */ import_react.default.createElement("button", {
        type: "button",
        className: "module-ConversationHeader__header module-ConversationHeader__header--clickable",
        onClick
      }, contents);
    }
    return /* @__PURE__ */ import_react.default.createElement("div", {
      className: "module-ConversationHeader__header",
      ref: this.headerRef
    }, contents);
  }
  render() {
    const {
      announcementsOnly,
      areWeAdmin,
      expireTimer,
      i18n,
      id,
      isSMSOnly,
      onOutgoingAudioCallInConversation,
      onOutgoingVideoCallInConversation,
      onSetDisappearingMessages,
      outgoingCallButtonStyle,
      showBackButton
    } = this.props;
    const { isNarrow, modalState } = this.state;
    const triggerId = `conversation-${id}`;
    let modalNode;
    if (modalState === 0 /* NothingOpen */) {
      modalNode = void 0;
    } else if (modalState === 1 /* CustomDisappearingTimeout */) {
      modalNode = /* @__PURE__ */ import_react.default.createElement(import_DisappearingTimeDialog.DisappearingTimeDialog, {
        i18n,
        initialValue: expireTimer,
        onSubmit: (value) => {
          this.setState({ modalState: 0 /* NothingOpen */ });
          onSetDisappearingMessages(value);
        },
        onClose: () => this.setState({ modalState: 0 /* NothingOpen */ })
      });
    } else {
      throw (0, import_missingCaseError.missingCaseError)(modalState);
    }
    return /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, modalNode, /* @__PURE__ */ import_react.default.createElement(import_react_measure.default, {
      bounds: true,
      onResize: ({ bounds }) => {
        if (!bounds || !bounds.width) {
          return;
        }
        this.setState({ isNarrow: bounds.width < 500 });
      }
    }, ({ measureRef }) => /* @__PURE__ */ import_react.default.createElement("div", {
      className: (0, import_classnames.default)("module-ConversationHeader", {
        "module-ConversationHeader--narrow": isNarrow
      }),
      ref: measureRef
    }, this.renderBackButton(), this.renderHeader(), !isSMSOnly && /* @__PURE__ */ import_react.default.createElement(OutgoingCallButtons, {
      announcementsOnly,
      areWeAdmin,
      i18n,
      isNarrow,
      onOutgoingAudioCallInConversation,
      onOutgoingVideoCallInConversation,
      outgoingCallButtonStyle,
      showBackButton
    }), this.renderSearchButton(), this.renderMoreButton(triggerId), this.renderMenu(triggerId))));
  }
}
function OutgoingCallButtons({
  announcementsOnly,
  areWeAdmin,
  i18n,
  isNarrow,
  onOutgoingAudioCallInConversation,
  onOutgoingVideoCallInConversation,
  outgoingCallButtonStyle,
  showBackButton
}) {
  const videoButton = /* @__PURE__ */ import_react.default.createElement("button", {
    "aria-label": i18n("makeOutgoingVideoCall"),
    className: (0, import_classnames.default)("module-ConversationHeader__button", "module-ConversationHeader__button--video", showBackButton ? null : "module-ConversationHeader__button--show", !showBackButton && announcementsOnly && !areWeAdmin ? "module-ConversationHeader__button--show-disabled" : void 0),
    disabled: showBackButton,
    onClick: onOutgoingVideoCallInConversation,
    type: "button"
  });
  const startCallShortcuts = (0, import_useKeyboardShortcuts.useStartCallShortcuts)(onOutgoingAudioCallInConversation, onOutgoingVideoCallInConversation);
  (0, import_useKeyboardShortcuts.useKeyboardShortcuts)(startCallShortcuts);
  switch (outgoingCallButtonStyle) {
    case 0 /* None */:
      return null;
    case 1 /* JustVideo */:
      return videoButton;
    case 2 /* Both */:
      return /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, videoButton, /* @__PURE__ */ import_react.default.createElement("button", {
        type: "button",
        onClick: onOutgoingAudioCallInConversation,
        className: (0, import_classnames.default)("module-ConversationHeader__button", "module-ConversationHeader__button--audio", showBackButton ? null : "module-ConversationHeader__button--show"),
        disabled: showBackButton,
        "aria-label": i18n("makeOutgoingCall")
      }));
    case 3 /* Join */:
      return /* @__PURE__ */ import_react.default.createElement("button", {
        "aria-label": i18n("joinOngoingCall"),
        className: (0, import_classnames.default)("module-ConversationHeader__button", "module-ConversationHeader__button--join-call", showBackButton ? null : "module-ConversationHeader__button--show"),
        disabled: showBackButton,
        onClick: onOutgoingVideoCallInConversation,
        type: "button"
      }, isNarrow ? null : i18n("joinOngoingCall"));
    default:
      throw (0, import_missingCaseError.missingCaseError)(outgoingCallButtonStyle);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ConversationHeader,
  OutgoingCallButtonStyle
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ29udmVyc2F0aW9uSGVhZGVyLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMTgtMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB0eXBlIHsgUmVhY3ROb2RlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBNZWFzdXJlIGZyb20gJ3JlYWN0LW1lYXN1cmUnO1xuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQge1xuICBDb250ZXh0TWVudSxcbiAgQ29udGV4dE1lbnVUcmlnZ2VyLFxuICBNZW51SXRlbSxcbiAgU3ViTWVudSxcbn0gZnJvbSAncmVhY3QtY29udGV4dG1lbnUnO1xuXG5pbXBvcnQgeyBFbW9qaWZ5IH0gZnJvbSAnLi9FbW9qaWZ5JztcbmltcG9ydCB7IERpc2FwcGVhcmluZ1RpbWVEaWFsb2cgfSBmcm9tICcuLi9EaXNhcHBlYXJpbmdUaW1lRGlhbG9nJztcbmltcG9ydCB7IEF2YXRhciwgQXZhdGFyU2l6ZSB9IGZyb20gJy4uL0F2YXRhcic7XG5pbXBvcnQgeyBJbkNvbnRhY3RzSWNvbiB9IGZyb20gJy4uL0luQ29udGFjdHNJY29uJztcblxuaW1wb3J0IHR5cGUgeyBMb2NhbGl6ZXJUeXBlLCBUaGVtZVR5cGUgfSBmcm9tICcuLi8uLi90eXBlcy9VdGlsJztcbmltcG9ydCB0eXBlIHsgQ29udmVyc2F0aW9uVHlwZSB9IGZyb20gJy4uLy4uL3N0YXRlL2R1Y2tzL2NvbnZlcnNhdGlvbnMnO1xuaW1wb3J0IHR5cGUgeyBCYWRnZVR5cGUgfSBmcm9tICcuLi8uLi9iYWRnZXMvdHlwZXMnO1xuaW1wb3J0IHsgZ2V0TXV0ZU9wdGlvbnMgfSBmcm9tICcuLi8uLi91dGlsL2dldE11dGVPcHRpb25zJztcbmltcG9ydCAqIGFzIGV4cGlyYXRpb25UaW1lciBmcm9tICcuLi8uLi91dGlsL2V4cGlyYXRpb25UaW1lcic7XG5pbXBvcnQgeyBtaXNzaW5nQ2FzZUVycm9yIH0gZnJvbSAnLi4vLi4vdXRpbC9taXNzaW5nQ2FzZUVycm9yJztcbmltcG9ydCB7IGlzSW5TeXN0ZW1Db250YWN0cyB9IGZyb20gJy4uLy4uL3V0aWwvaXNJblN5c3RlbUNvbnRhY3RzJztcbmltcG9ydCB7XG4gIHVzZVN0YXJ0Q2FsbFNob3J0Y3V0cyxcbiAgdXNlS2V5Ym9hcmRTaG9ydGN1dHMsXG59IGZyb20gJy4uLy4uL2hvb2tzL3VzZUtleWJvYXJkU2hvcnRjdXRzJztcblxuZXhwb3J0IGVudW0gT3V0Z29pbmdDYWxsQnV0dG9uU3R5bGUge1xuICBOb25lLFxuICBKdXN0VmlkZW8sXG4gIEJvdGgsXG4gIEpvaW4sXG59XG5cbmV4cG9ydCB0eXBlIFByb3BzRGF0YVR5cGUgPSB7XG4gIGJhZGdlPzogQmFkZ2VUeXBlO1xuICBjb252ZXJzYXRpb25UaXRsZT86IHN0cmluZztcbiAgaXNNaXNzaW5nTWFuZGF0b3J5UHJvZmlsZVNoYXJpbmc/OiBib29sZWFuO1xuICBvdXRnb2luZ0NhbGxCdXR0b25TdHlsZTogT3V0Z29pbmdDYWxsQnV0dG9uU3R5bGU7XG4gIHNob3dCYWNrQnV0dG9uPzogYm9vbGVhbjtcbiAgaXNTTVNPbmx5PzogYm9vbGVhbjtcbiAgdGhlbWU6IFRoZW1lVHlwZTtcbn0gJiBQaWNrPFxuICBDb252ZXJzYXRpb25UeXBlLFxuICB8ICdhY2NlcHRlZE1lc3NhZ2VSZXF1ZXN0J1xuICB8ICdhbm5vdW5jZW1lbnRzT25seSdcbiAgfCAnYXJlV2VBZG1pbidcbiAgfCAnYXZhdGFyUGF0aCdcbiAgfCAnY2FuQ2hhbmdlVGltZXInXG4gIHwgJ2NvbG9yJ1xuICB8ICdleHBpcmVUaW1lcidcbiAgfCAnZ3JvdXBWZXJzaW9uJ1xuICB8ICdpZCdcbiAgfCAnaXNBcmNoaXZlZCdcbiAgfCAnaXNNZSdcbiAgfCAnaXNQaW5uZWQnXG4gIHwgJ2lzVmVyaWZpZWQnXG4gIHwgJ2xlZnQnXG4gIHwgJ21hcmtlZFVucmVhZCdcbiAgfCAnbXV0ZUV4cGlyZXNBdCdcbiAgfCAnbmFtZSdcbiAgfCAncGhvbmVOdW1iZXInXG4gIHwgJ3Byb2ZpbGVOYW1lJ1xuICB8ICdzaGFyZWRHcm91cE5hbWVzJ1xuICB8ICd0aXRsZSdcbiAgfCAndHlwZSdcbiAgfCAndW5ibHVycmVkQXZhdGFyUGF0aCdcbj47XG5cbmV4cG9ydCB0eXBlIFByb3BzQWN0aW9uc1R5cGUgPSB7XG4gIG9uU2V0TXV0ZU5vdGlmaWNhdGlvbnM6IChzZWNvbmRzOiBudW1iZXIpID0+IHZvaWQ7XG4gIG9uU2V0RGlzYXBwZWFyaW5nTWVzc2FnZXM6IChzZWNvbmRzOiBudW1iZXIpID0+IHZvaWQ7XG4gIG9uRGVsZXRlTWVzc2FnZXM6ICgpID0+IHZvaWQ7XG4gIG9uU2VhcmNoSW5Db252ZXJzYXRpb246ICgpID0+IHZvaWQ7XG4gIG9uT3V0Z29pbmdBdWRpb0NhbGxJbkNvbnZlcnNhdGlvbjogKCkgPT4gdm9pZDtcbiAgb25PdXRnb2luZ1ZpZGVvQ2FsbEluQ29udmVyc2F0aW9uOiAoKSA9PiB2b2lkO1xuICBvblNldFBpbjogKHZhbHVlOiBib29sZWFuKSA9PiB2b2lkO1xuXG4gIG9uU2hvd0NvbnZlcnNhdGlvbkRldGFpbHM6ICgpID0+IHZvaWQ7XG4gIG9uU2hvd0FsbE1lZGlhOiAoKSA9PiB2b2lkO1xuICBvblNob3dHcm91cE1lbWJlcnM6ICgpID0+IHZvaWQ7XG4gIG9uR29CYWNrOiAoKSA9PiB2b2lkO1xuXG4gIG9uQXJjaGl2ZTogKCkgPT4gdm9pZDtcbiAgb25NYXJrVW5yZWFkOiAoKSA9PiB2b2lkO1xuICBvbk1vdmVUb0luYm94OiAoKSA9PiB2b2lkO1xufTtcblxuZXhwb3J0IHR5cGUgUHJvcHNIb3VzZWtlZXBpbmdUeXBlID0ge1xuICBpMThuOiBMb2NhbGl6ZXJUeXBlO1xufTtcblxuZXhwb3J0IHR5cGUgUHJvcHNUeXBlID0gUHJvcHNEYXRhVHlwZSAmXG4gIFByb3BzQWN0aW9uc1R5cGUgJlxuICBQcm9wc0hvdXNla2VlcGluZ1R5cGU7XG5cbmVudW0gTW9kYWxTdGF0ZSB7XG4gIE5vdGhpbmdPcGVuLFxuICBDdXN0b21EaXNhcHBlYXJpbmdUaW1lb3V0LFxufVxuXG50eXBlIFN0YXRlVHlwZSA9IHtcbiAgaXNOYXJyb3c6IGJvb2xlYW47XG4gIG1vZGFsU3RhdGU6IE1vZGFsU3RhdGU7XG59O1xuXG5jb25zdCBUSU1FUl9JVEVNX0NMQVNTID0gJ21vZHVsZS1Db252ZXJzYXRpb25IZWFkZXJfX2Rpc2FwcGVhcmluZy10aW1lcl9faXRlbSc7XG5cbmV4cG9ydCBjbGFzcyBDb252ZXJzYXRpb25IZWFkZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8UHJvcHNUeXBlLCBTdGF0ZVR5cGU+IHtcbiAgcHJpdmF0ZSBzaG93TWVudUJvdW5kOiAoZXZlbnQ6IFJlYWN0Lk1vdXNlRXZlbnQ8SFRNTEJ1dHRvbkVsZW1lbnQ+KSA9PiB2b2lkO1xuXG4gIC8vIENvbWVzIGZyb20gYSB0aGlyZC1wYXJ0eSBkZXBlbmRlbmN5XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gIHByaXZhdGUgbWVudVRyaWdnZXJSZWY6IFJlYWN0LlJlZk9iamVjdDxhbnk+O1xuXG4gIHB1YmxpYyBoZWFkZXJSZWY6IFJlYWN0LlJlZk9iamVjdDxIVE1MRGl2RWxlbWVudD47XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKHByb3BzOiBQcm9wc1R5cGUpIHtcbiAgICBzdXBlcihwcm9wcyk7XG5cbiAgICB0aGlzLnN0YXRlID0geyBpc05hcnJvdzogZmFsc2UsIG1vZGFsU3RhdGU6IE1vZGFsU3RhdGUuTm90aGluZ09wZW4gfTtcblxuICAgIHRoaXMubWVudVRyaWdnZXJSZWYgPSBSZWFjdC5jcmVhdGVSZWYoKTtcbiAgICB0aGlzLmhlYWRlclJlZiA9IFJlYWN0LmNyZWF0ZVJlZigpO1xuICAgIHRoaXMuc2hvd01lbnVCb3VuZCA9IHRoaXMuc2hvd01lbnUuYmluZCh0aGlzKTtcbiAgfVxuXG4gIHByaXZhdGUgc2hvd01lbnUoZXZlbnQ6IFJlYWN0Lk1vdXNlRXZlbnQ8SFRNTEJ1dHRvbkVsZW1lbnQ+KTogdm9pZCB7XG4gICAgaWYgKHRoaXMubWVudVRyaWdnZXJSZWYuY3VycmVudCkge1xuICAgICAgdGhpcy5tZW51VHJpZ2dlclJlZi5jdXJyZW50LmhhbmRsZUNvbnRleHRDbGljayhldmVudCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSByZW5kZXJCYWNrQnV0dG9uKCk6IFJlYWN0Tm9kZSB7XG4gICAgY29uc3QgeyBpMThuLCBvbkdvQmFjaywgc2hvd0JhY2tCdXR0b24gfSA9IHRoaXMucHJvcHM7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGJ1dHRvblxuICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgb25DbGljaz17b25Hb0JhY2t9XG4gICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcbiAgICAgICAgICAnbW9kdWxlLUNvbnZlcnNhdGlvbkhlYWRlcl9fYmFjay1pY29uJyxcbiAgICAgICAgICBzaG93QmFja0J1dHRvbiA/ICdtb2R1bGUtQ29udmVyc2F0aW9uSGVhZGVyX19iYWNrLWljb24tLXNob3cnIDogbnVsbFxuICAgICAgICApfVxuICAgICAgICBkaXNhYmxlZD17IXNob3dCYWNrQnV0dG9ufVxuICAgICAgICBhcmlhLWxhYmVsPXtpMThuKCdnb0JhY2snKX1cbiAgICAgIC8+XG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVuZGVySGVhZGVySW5mb1RpdGxlKCk6IFJlYWN0Tm9kZSB7XG4gICAgY29uc3QgeyBuYW1lLCB0aXRsZSwgdHlwZSwgaTE4biwgaXNNZSB9ID0gdGhpcy5wcm9wcztcblxuICAgIGlmIChpc01lKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZHVsZS1Db252ZXJzYXRpb25IZWFkZXJfX2hlYWRlcl9faW5mb19fdGl0bGVcIj5cbiAgICAgICAgICB7aTE4bignbm90ZVRvU2VsZicpfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kdWxlLUNvbnZlcnNhdGlvbkhlYWRlcl9faGVhZGVyX19pbmZvX190aXRsZVwiPlxuICAgICAgICA8RW1vamlmeSB0ZXh0PXt0aXRsZX0gLz5cbiAgICAgICAge2lzSW5TeXN0ZW1Db250YWN0cyh7IG5hbWUsIHR5cGUgfSkgPyAoXG4gICAgICAgICAgPEluQ29udGFjdHNJY29uXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJtb2R1bGUtQ29udmVyc2F0aW9uSGVhZGVyX19oZWFkZXJfX2luZm9fX3RpdGxlX19pbi1jb250YWN0cy1pY29uXCJcbiAgICAgICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgICAgICB0b29sdGlwQ29udGFpbmVyUmVmPXt0aGlzLmhlYWRlclJlZn1cbiAgICAgICAgICAvPlxuICAgICAgICApIDogbnVsbH1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIHJlbmRlckhlYWRlckluZm9TdWJ0aXRsZSgpOiBSZWFjdE5vZGUge1xuICAgIGNvbnN0IGV4cGlyYXRpb25Ob2RlID0gdGhpcy5yZW5kZXJFeHBpcmF0aW9uTGVuZ3RoKCk7XG4gICAgY29uc3QgdmVyaWZpZWROb2RlID0gdGhpcy5yZW5kZXJWZXJpZmllZEljb24oKTtcblxuICAgIGlmIChleHBpcmF0aW9uTm9kZSB8fCB2ZXJpZmllZE5vZGUpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kdWxlLUNvbnZlcnNhdGlvbkhlYWRlcl9faGVhZGVyX19pbmZvX19zdWJ0aXRsZVwiPlxuICAgICAgICAgIHtleHBpcmF0aW9uTm9kZX1cbiAgICAgICAgICB7dmVyaWZpZWROb2RlfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBwcml2YXRlIHJlbmRlckF2YXRhcigpOiBSZWFjdE5vZGUge1xuICAgIGNvbnN0IHtcbiAgICAgIGFjY2VwdGVkTWVzc2FnZVJlcXVlc3QsXG4gICAgICBhdmF0YXJQYXRoLFxuICAgICAgYmFkZ2UsXG4gICAgICBjb2xvcixcbiAgICAgIGkxOG4sXG4gICAgICB0eXBlLFxuICAgICAgaXNNZSxcbiAgICAgIG5hbWUsXG4gICAgICBwaG9uZU51bWJlcixcbiAgICAgIHByb2ZpbGVOYW1lLFxuICAgICAgc2hhcmVkR3JvdXBOYW1lcyxcbiAgICAgIHRoZW1lLFxuICAgICAgdGl0bGUsXG4gICAgICB1bmJsdXJyZWRBdmF0YXJQYXRoLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm1vZHVsZS1Db252ZXJzYXRpb25IZWFkZXJfX2hlYWRlcl9fYXZhdGFyXCI+XG4gICAgICAgIDxBdmF0YXJcbiAgICAgICAgICBhY2NlcHRlZE1lc3NhZ2VSZXF1ZXN0PXthY2NlcHRlZE1lc3NhZ2VSZXF1ZXN0fVxuICAgICAgICAgIGF2YXRhclBhdGg9e2F2YXRhclBhdGh9XG4gICAgICAgICAgYmFkZ2U9e2JhZGdlfVxuICAgICAgICAgIGNvbG9yPXtjb2xvcn1cbiAgICAgICAgICBjb252ZXJzYXRpb25UeXBlPXt0eXBlfVxuICAgICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgICAgaXNNZT17aXNNZX1cbiAgICAgICAgICBub3RlVG9TZWxmPXtpc01lfVxuICAgICAgICAgIHRpdGxlPXt0aXRsZX1cbiAgICAgICAgICBuYW1lPXtuYW1lfVxuICAgICAgICAgIHBob25lTnVtYmVyPXtwaG9uZU51bWJlcn1cbiAgICAgICAgICBwcm9maWxlTmFtZT17cHJvZmlsZU5hbWV9XG4gICAgICAgICAgc2hhcmVkR3JvdXBOYW1lcz17c2hhcmVkR3JvdXBOYW1lc31cbiAgICAgICAgICBzaXplPXtBdmF0YXJTaXplLlRISVJUWV9UV099XG4gICAgICAgICAgdGhlbWU9e3RoZW1lfVxuICAgICAgICAgIHVuYmx1cnJlZEF2YXRhclBhdGg9e3VuYmx1cnJlZEF2YXRhclBhdGh9XG4gICAgICAgIC8+XG4gICAgICA8L3NwYW4+XG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVuZGVyRXhwaXJhdGlvbkxlbmd0aCgpOiBSZWFjdE5vZGUge1xuICAgIGNvbnN0IHsgaTE4biwgZXhwaXJlVGltZXIgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBpZiAoIWV4cGlyZVRpbWVyKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2R1bGUtQ29udmVyc2F0aW9uSGVhZGVyX19oZWFkZXJfX2luZm9fX3N1YnRpdGxlX19leHBpcmF0aW9uXCI+XG4gICAgICAgIHtleHBpcmF0aW9uVGltZXIuZm9ybWF0KGkxOG4sIGV4cGlyZVRpbWVyKX1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIHJlbmRlclZlcmlmaWVkSWNvbigpOiBSZWFjdE5vZGUge1xuICAgIGNvbnN0IHsgaTE4biwgaXNWZXJpZmllZCB9ID0gdGhpcy5wcm9wcztcblxuICAgIGlmICghaXNWZXJpZmllZCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kdWxlLUNvbnZlcnNhdGlvbkhlYWRlcl9faGVhZGVyX19pbmZvX19zdWJ0aXRsZV9fdmVyaWZpZWRcIj5cbiAgICAgICAge2kxOG4oJ3ZlcmlmaWVkJyl9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSByZW5kZXJNb3JlQnV0dG9uKHRyaWdnZXJJZDogc3RyaW5nKTogUmVhY3ROb2RlIHtcbiAgICBjb25zdCB7IGkxOG4sIHNob3dCYWNrQnV0dG9uIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxDb250ZXh0TWVudVRyaWdnZXIgaWQ9e3RyaWdnZXJJZH0gcmVmPXt0aGlzLm1lbnVUcmlnZ2VyUmVmfT5cbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuc2hvd01lbnVCb3VuZH1cbiAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXG4gICAgICAgICAgICAnbW9kdWxlLUNvbnZlcnNhdGlvbkhlYWRlcl9fYnV0dG9uJyxcbiAgICAgICAgICAgICdtb2R1bGUtQ29udmVyc2F0aW9uSGVhZGVyX19idXR0b24tLW1vcmUnLFxuICAgICAgICAgICAgc2hvd0JhY2tCdXR0b24gPyBudWxsIDogJ21vZHVsZS1Db252ZXJzYXRpb25IZWFkZXJfX2J1dHRvbi0tc2hvdydcbiAgICAgICAgICApfVxuICAgICAgICAgIGRpc2FibGVkPXtzaG93QmFja0J1dHRvbn1cbiAgICAgICAgICBhcmlhLWxhYmVsPXtpMThuKCdtb3JlSW5mbycpfVxuICAgICAgICAvPlxuICAgICAgPC9Db250ZXh0TWVudVRyaWdnZXI+XG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVuZGVyU2VhcmNoQnV0dG9uKCk6IFJlYWN0Tm9kZSB7XG4gICAgY29uc3QgeyBpMThuLCBvblNlYXJjaEluQ29udmVyc2F0aW9uLCBzaG93QmFja0J1dHRvbiB9ID0gdGhpcy5wcm9wcztcblxuICAgIHJldHVybiAoXG4gICAgICA8YnV0dG9uXG4gICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICBvbkNsaWNrPXtvblNlYXJjaEluQ29udmVyc2F0aW9ufVxuICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXG4gICAgICAgICAgJ21vZHVsZS1Db252ZXJzYXRpb25IZWFkZXJfX2J1dHRvbicsXG4gICAgICAgICAgJ21vZHVsZS1Db252ZXJzYXRpb25IZWFkZXJfX2J1dHRvbi0tc2VhcmNoJyxcbiAgICAgICAgICBzaG93QmFja0J1dHRvbiA/IG51bGwgOiAnbW9kdWxlLUNvbnZlcnNhdGlvbkhlYWRlcl9fYnV0dG9uLS1zaG93J1xuICAgICAgICApfVxuICAgICAgICBkaXNhYmxlZD17c2hvd0JhY2tCdXR0b259XG4gICAgICAgIGFyaWEtbGFiZWw9e2kxOG4oJ3NlYXJjaCcpfVxuICAgICAgLz5cbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSByZW5kZXJNZW51KHRyaWdnZXJJZDogc3RyaW5nKTogUmVhY3ROb2RlIHtcbiAgICBjb25zdCB7XG4gICAgICBhY2NlcHRlZE1lc3NhZ2VSZXF1ZXN0LFxuICAgICAgY2FuQ2hhbmdlVGltZXIsXG4gICAgICBleHBpcmVUaW1lcixcbiAgICAgIGdyb3VwVmVyc2lvbixcbiAgICAgIGkxOG4sXG4gICAgICBpc0FyY2hpdmVkLFxuICAgICAgaXNNaXNzaW5nTWFuZGF0b3J5UHJvZmlsZVNoYXJpbmcsXG4gICAgICBpc1Bpbm5lZCxcbiAgICAgIGxlZnQsXG4gICAgICBtYXJrZWRVbnJlYWQsXG4gICAgICBtdXRlRXhwaXJlc0F0LFxuICAgICAgb25BcmNoaXZlLFxuICAgICAgb25EZWxldGVNZXNzYWdlcyxcbiAgICAgIG9uTWFya1VucmVhZCxcbiAgICAgIG9uTW92ZVRvSW5ib3gsXG4gICAgICBvblNldERpc2FwcGVhcmluZ01lc3NhZ2VzLFxuICAgICAgb25TZXRNdXRlTm90aWZpY2F0aW9ucyxcbiAgICAgIG9uU2V0UGluLFxuICAgICAgb25TaG93QWxsTWVkaWEsXG4gICAgICBvblNob3dDb252ZXJzYXRpb25EZXRhaWxzLFxuICAgICAgb25TaG93R3JvdXBNZW1iZXJzLFxuICAgICAgdHlwZSxcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIGNvbnN0IG11dGVPcHRpb25zID0gZ2V0TXV0ZU9wdGlvbnMobXV0ZUV4cGlyZXNBdCwgaTE4bik7XG5cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgIGNvbnN0IGRpc2FwcGVhcmluZ1RpdGxlID0gaTE4bignZGlzYXBwZWFyaW5nTWVzc2FnZXMnKSBhcyBhbnk7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICBjb25zdCBtdXRlVGl0bGUgPSBpMThuKCdtdXRlTm90aWZpY2F0aW9uc1RpdGxlJykgYXMgYW55O1xuICAgIGNvbnN0IGlzR3JvdXAgPSB0eXBlID09PSAnZ3JvdXAnO1xuXG4gICAgY29uc3QgZGlzYWJsZVRpbWVyQ2hhbmdlcyA9IEJvb2xlYW4oXG4gICAgICAhY2FuQ2hhbmdlVGltZXIgfHxcbiAgICAgICAgIWFjY2VwdGVkTWVzc2FnZVJlcXVlc3QgfHxcbiAgICAgICAgbGVmdCB8fFxuICAgICAgICBpc01pc3NpbmdNYW5kYXRvcnlQcm9maWxlU2hhcmluZ1xuICAgICk7XG5cbiAgICBjb25zdCBoYXNHVjJBZG1pbkVuYWJsZWQgPSBpc0dyb3VwICYmIGdyb3VwVmVyc2lvbiA9PT0gMjtcblxuICAgIGNvbnN0IGlzQWN0aXZlRXhwaXJlVGltZXIgPSAodmFsdWU6IG51bWJlcik6IGJvb2xlYW4gPT4ge1xuICAgICAgaWYgKCFleHBpcmVUaW1lcikge1xuICAgICAgICByZXR1cm4gdmFsdWUgPT09IDA7XG4gICAgICB9XG5cbiAgICAgIC8vIEN1c3RvbSB0aW1lLi4uXG4gICAgICBpZiAodmFsdWUgPT09IC0xKSB7XG4gICAgICAgIHJldHVybiAhZXhwaXJhdGlvblRpbWVyLkRFRkFVTFRfRFVSQVRJT05TX1NFVC5oYXMoZXhwaXJlVGltZXIpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHZhbHVlID09PSBleHBpcmVUaW1lcjtcbiAgICB9O1xuXG4gICAgY29uc3QgZXhwaXJlRHVyYXRpb25zOiBSZWFkb25seUFycmF5PFJlYWN0Tm9kZT4gPSBbXG4gICAgICAuLi5leHBpcmF0aW9uVGltZXIuREVGQVVMVF9EVVJBVElPTlNfSU5fU0VDT05EUyxcbiAgICAgIC0xLFxuICAgIF0ubWFwKChzZWNvbmRzOiBudW1iZXIpID0+IHtcbiAgICAgIGxldCB0ZXh0OiBzdHJpbmc7XG5cbiAgICAgIGlmIChzZWNvbmRzID09PSAtMSkge1xuICAgICAgICB0ZXh0ID0gaTE4bignY3VzdG9tRGlzYXBwZWFyaW5nVGltZU9wdGlvbicpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGV4dCA9IGV4cGlyYXRpb25UaW1lci5mb3JtYXQoaTE4biwgc2Vjb25kcywge1xuICAgICAgICAgIGNhcGl0YWxpemVPZmY6IHRydWUsXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBvbkR1cmF0aW9uQ2xpY2sgPSAoKSA9PiB7XG4gICAgICAgIGlmIChzZWNvbmRzID09PSAtMSkge1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgbW9kYWxTdGF0ZTogTW9kYWxTdGF0ZS5DdXN0b21EaXNhcHBlYXJpbmdUaW1lb3V0LFxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG9uU2V0RGlzYXBwZWFyaW5nTWVzc2FnZXMoc2Vjb25kcyk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxNZW51SXRlbSBrZXk9e3NlY29uZHN9IG9uQ2xpY2s9e29uRHVyYXRpb25DbGlja30+XG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFxuICAgICAgICAgICAgICBUSU1FUl9JVEVNX0NMQVNTLFxuICAgICAgICAgICAgICBpc0FjdGl2ZUV4cGlyZVRpbWVyKHNlY29uZHMpICYmIGAke1RJTUVSX0lURU1fQ0xBU1N9LS1hY3RpdmVgXG4gICAgICAgICAgICApfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHt0ZXh0fVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L01lbnVJdGVtPlxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIHJldHVybiAoXG4gICAgICA8Q29udGV4dE1lbnUgaWQ9e3RyaWdnZXJJZH0+XG4gICAgICAgIHtkaXNhYmxlVGltZXJDaGFuZ2VzID8gbnVsbCA6IChcbiAgICAgICAgICA8U3ViTWVudSBob3ZlckRlbGF5PXsxfSB0aXRsZT17ZGlzYXBwZWFyaW5nVGl0bGV9IHJ0bD5cbiAgICAgICAgICAgIHtleHBpcmVEdXJhdGlvbnN9XG4gICAgICAgICAgPC9TdWJNZW51PlxuICAgICAgICApfVxuICAgICAgICA8U3ViTWVudSBob3ZlckRlbGF5PXsxfSB0aXRsZT17bXV0ZVRpdGxlfSBydGw+XG4gICAgICAgICAge211dGVPcHRpb25zLm1hcChpdGVtID0+IChcbiAgICAgICAgICAgIDxNZW51SXRlbVxuICAgICAgICAgICAgICBrZXk9e2l0ZW0ubmFtZX1cbiAgICAgICAgICAgICAgZGlzYWJsZWQ9e2l0ZW0uZGlzYWJsZWR9XG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICBvblNldE11dGVOb3RpZmljYXRpb25zKGl0ZW0udmFsdWUpO1xuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7aXRlbS5uYW1lfVxuICAgICAgICAgICAgPC9NZW51SXRlbT5cbiAgICAgICAgICApKX1cbiAgICAgICAgPC9TdWJNZW51PlxuICAgICAgICB7IWlzR3JvdXAgfHwgaGFzR1YyQWRtaW5FbmFibGVkID8gKFxuICAgICAgICAgIDxNZW51SXRlbSBvbkNsaWNrPXtvblNob3dDb252ZXJzYXRpb25EZXRhaWxzfT5cbiAgICAgICAgICAgIHtpc0dyb3VwXG4gICAgICAgICAgICAgID8gaTE4bignc2hvd0NvbnZlcnNhdGlvbkRldGFpbHMnKVxuICAgICAgICAgICAgICA6IGkxOG4oJ3Nob3dDb252ZXJzYXRpb25EZXRhaWxzLS1kaXJlY3QnKX1cbiAgICAgICAgICA8L01lbnVJdGVtPlxuICAgICAgICApIDogbnVsbH1cbiAgICAgICAge2lzR3JvdXAgJiYgIWhhc0dWMkFkbWluRW5hYmxlZCA/IChcbiAgICAgICAgICA8TWVudUl0ZW0gb25DbGljaz17b25TaG93R3JvdXBNZW1iZXJzfT5cbiAgICAgICAgICAgIHtpMThuKCdzaG93TWVtYmVycycpfVxuICAgICAgICAgIDwvTWVudUl0ZW0+XG4gICAgICAgICkgOiBudWxsfVxuICAgICAgICA8TWVudUl0ZW0gb25DbGljaz17b25TaG93QWxsTWVkaWF9PntpMThuKCd2aWV3UmVjZW50TWVkaWEnKX08L01lbnVJdGVtPlxuICAgICAgICA8TWVudUl0ZW0gZGl2aWRlciAvPlxuICAgICAgICB7IW1hcmtlZFVucmVhZCA/IChcbiAgICAgICAgICA8TWVudUl0ZW0gb25DbGljaz17b25NYXJrVW5yZWFkfT57aTE4bignbWFya1VucmVhZCcpfTwvTWVudUl0ZW0+XG4gICAgICAgICkgOiBudWxsfVxuICAgICAgICB7aXNBcmNoaXZlZCA/IChcbiAgICAgICAgICA8TWVudUl0ZW0gb25DbGljaz17b25Nb3ZlVG9JbmJveH0+XG4gICAgICAgICAgICB7aTE4bignbW92ZUNvbnZlcnNhdGlvblRvSW5ib3gnKX1cbiAgICAgICAgICA8L01lbnVJdGVtPlxuICAgICAgICApIDogKFxuICAgICAgICAgIDxNZW51SXRlbSBvbkNsaWNrPXtvbkFyY2hpdmV9PntpMThuKCdhcmNoaXZlQ29udmVyc2F0aW9uJyl9PC9NZW51SXRlbT5cbiAgICAgICAgKX1cbiAgICAgICAgPE1lbnVJdGVtIG9uQ2xpY2s9e29uRGVsZXRlTWVzc2FnZXN9PntpMThuKCdkZWxldGVNZXNzYWdlcycpfTwvTWVudUl0ZW0+XG4gICAgICAgIHtpc1Bpbm5lZCA/IChcbiAgICAgICAgICA8TWVudUl0ZW0gb25DbGljaz17KCkgPT4gb25TZXRQaW4oZmFsc2UpfT5cbiAgICAgICAgICAgIHtpMThuKCd1bnBpbkNvbnZlcnNhdGlvbicpfVxuICAgICAgICAgIDwvTWVudUl0ZW0+XG4gICAgICAgICkgOiAoXG4gICAgICAgICAgPE1lbnVJdGVtIG9uQ2xpY2s9eygpID0+IG9uU2V0UGluKHRydWUpfT5cbiAgICAgICAgICAgIHtpMThuKCdwaW5Db252ZXJzYXRpb24nKX1cbiAgICAgICAgICA8L01lbnVJdGVtPlxuICAgICAgICApfVxuICAgICAgPC9Db250ZXh0TWVudT5cbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSByZW5kZXJIZWFkZXIoKTogUmVhY3ROb2RlIHtcbiAgICBjb25zdCB7IGNvbnZlcnNhdGlvblRpdGxlLCBncm91cFZlcnNpb24sIG9uU2hvd0NvbnZlcnNhdGlvbkRldGFpbHMsIHR5cGUgfSA9XG4gICAgICB0aGlzLnByb3BzO1xuXG4gICAgaWYgKGNvbnZlcnNhdGlvblRpdGxlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kdWxlLUNvbnZlcnNhdGlvbkhlYWRlcl9faGVhZGVyXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2R1bGUtQ29udmVyc2F0aW9uSGVhZGVyX19oZWFkZXJfX2luZm9cIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kdWxlLUNvbnZlcnNhdGlvbkhlYWRlcl9faGVhZGVyX19pbmZvX190aXRsZVwiPlxuICAgICAgICAgICAgICB7Y29udmVyc2F0aW9uVGl0bGV9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH1cblxuICAgIGxldCBvbkNsaWNrOiB1bmRlZmluZWQgfCAoKCkgPT4gdm9pZCk7XG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlICdkaXJlY3QnOlxuICAgICAgICBvbkNsaWNrID0gKCkgPT4ge1xuICAgICAgICAgIG9uU2hvd0NvbnZlcnNhdGlvbkRldGFpbHMoKTtcbiAgICAgICAgfTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdncm91cCc6IHtcbiAgICAgICAgY29uc3QgaGFzR1YyQWRtaW5FbmFibGVkID0gZ3JvdXBWZXJzaW9uID09PSAyO1xuICAgICAgICBvbkNsaWNrID0gaGFzR1YyQWRtaW5FbmFibGVkXG4gICAgICAgICAgPyAoKSA9PiB7XG4gICAgICAgICAgICAgIG9uU2hvd0NvbnZlcnNhdGlvbkRldGFpbHMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICA6IHVuZGVmaW5lZDtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBtaXNzaW5nQ2FzZUVycm9yKHR5cGUpO1xuICAgIH1cblxuICAgIGNvbnN0IGNvbnRlbnRzID0gKFxuICAgICAgPD5cbiAgICAgICAge3RoaXMucmVuZGVyQXZhdGFyKCl9XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kdWxlLUNvbnZlcnNhdGlvbkhlYWRlcl9faGVhZGVyX19pbmZvXCI+XG4gICAgICAgICAge3RoaXMucmVuZGVySGVhZGVySW5mb1RpdGxlKCl9XG4gICAgICAgICAge3RoaXMucmVuZGVySGVhZGVySW5mb1N1YnRpdGxlKCl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC8+XG4gICAgKTtcblxuICAgIGlmIChvbkNsaWNrKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgY2xhc3NOYW1lPVwibW9kdWxlLUNvbnZlcnNhdGlvbkhlYWRlcl9faGVhZGVyIG1vZHVsZS1Db252ZXJzYXRpb25IZWFkZXJfX2hlYWRlci0tY2xpY2thYmxlXCJcbiAgICAgICAgICBvbkNsaWNrPXtvbkNsaWNrfVxuICAgICAgICA+XG4gICAgICAgICAge2NvbnRlbnRzfVxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kdWxlLUNvbnZlcnNhdGlvbkhlYWRlcl9faGVhZGVyXCIgcmVmPXt0aGlzLmhlYWRlclJlZn0+XG4gICAgICAgIHtjb250ZW50c31cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICBwdWJsaWMgb3ZlcnJpZGUgcmVuZGVyKCk6IFJlYWN0Tm9kZSB7XG4gICAgY29uc3Qge1xuICAgICAgYW5ub3VuY2VtZW50c09ubHksXG4gICAgICBhcmVXZUFkbWluLFxuICAgICAgZXhwaXJlVGltZXIsXG4gICAgICBpMThuLFxuICAgICAgaWQsXG4gICAgICBpc1NNU09ubHksXG4gICAgICBvbk91dGdvaW5nQXVkaW9DYWxsSW5Db252ZXJzYXRpb24sXG4gICAgICBvbk91dGdvaW5nVmlkZW9DYWxsSW5Db252ZXJzYXRpb24sXG4gICAgICBvblNldERpc2FwcGVhcmluZ01lc3NhZ2VzLFxuICAgICAgb3V0Z29pbmdDYWxsQnV0dG9uU3R5bGUsXG4gICAgICBzaG93QmFja0J1dHRvbixcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7IGlzTmFycm93LCBtb2RhbFN0YXRlIH0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IHRyaWdnZXJJZCA9IGBjb252ZXJzYXRpb24tJHtpZH1gO1xuXG4gICAgbGV0IG1vZGFsTm9kZTogUmVhY3ROb2RlO1xuICAgIGlmIChtb2RhbFN0YXRlID09PSBNb2RhbFN0YXRlLk5vdGhpbmdPcGVuKSB7XG4gICAgICBtb2RhbE5vZGUgPSB1bmRlZmluZWQ7XG4gICAgfSBlbHNlIGlmIChtb2RhbFN0YXRlID09PSBNb2RhbFN0YXRlLkN1c3RvbURpc2FwcGVhcmluZ1RpbWVvdXQpIHtcbiAgICAgIG1vZGFsTm9kZSA9IChcbiAgICAgICAgPERpc2FwcGVhcmluZ1RpbWVEaWFsb2dcbiAgICAgICAgICBpMThuPXtpMThufVxuICAgICAgICAgIGluaXRpYWxWYWx1ZT17ZXhwaXJlVGltZXJ9XG4gICAgICAgICAgb25TdWJtaXQ9e3ZhbHVlID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBtb2RhbFN0YXRlOiBNb2RhbFN0YXRlLk5vdGhpbmdPcGVuIH0pO1xuICAgICAgICAgICAgb25TZXREaXNhcHBlYXJpbmdNZXNzYWdlcyh2YWx1ZSk7XG4gICAgICAgICAgfX1cbiAgICAgICAgICBvbkNsb3NlPXsoKSA9PiB0aGlzLnNldFN0YXRlKHsgbW9kYWxTdGF0ZTogTW9kYWxTdGF0ZS5Ob3RoaW5nT3BlbiB9KX1cbiAgICAgICAgLz5cbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG1pc3NpbmdDYXNlRXJyb3IobW9kYWxTdGF0ZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDw+XG4gICAgICAgIHttb2RhbE5vZGV9XG4gICAgICAgIDxNZWFzdXJlXG4gICAgICAgICAgYm91bmRzXG4gICAgICAgICAgb25SZXNpemU9eyh7IGJvdW5kcyB9KSA9PiB7XG4gICAgICAgICAgICBpZiAoIWJvdW5kcyB8fCAhYm91bmRzLndpZHRoKSB7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBpc05hcnJvdzogYm91bmRzLndpZHRoIDwgNTAwIH0pO1xuICAgICAgICAgIH19XG4gICAgICAgID5cbiAgICAgICAgICB7KHsgbWVhc3VyZVJlZiB9KSA9PiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcygnbW9kdWxlLUNvbnZlcnNhdGlvbkhlYWRlcicsIHtcbiAgICAgICAgICAgICAgICAnbW9kdWxlLUNvbnZlcnNhdGlvbkhlYWRlci0tbmFycm93JzogaXNOYXJyb3csXG4gICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICByZWY9e21lYXN1cmVSZWZ9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHt0aGlzLnJlbmRlckJhY2tCdXR0b24oKX1cbiAgICAgICAgICAgICAge3RoaXMucmVuZGVySGVhZGVyKCl9XG4gICAgICAgICAgICAgIHshaXNTTVNPbmx5ICYmIChcbiAgICAgICAgICAgICAgICA8T3V0Z29pbmdDYWxsQnV0dG9uc1xuICAgICAgICAgICAgICAgICAgYW5ub3VuY2VtZW50c09ubHk9e2Fubm91bmNlbWVudHNPbmx5fVxuICAgICAgICAgICAgICAgICAgYXJlV2VBZG1pbj17YXJlV2VBZG1pbn1cbiAgICAgICAgICAgICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgICAgICAgICAgICBpc05hcnJvdz17aXNOYXJyb3d9XG4gICAgICAgICAgICAgICAgICBvbk91dGdvaW5nQXVkaW9DYWxsSW5Db252ZXJzYXRpb249e1xuICAgICAgICAgICAgICAgICAgICBvbk91dGdvaW5nQXVkaW9DYWxsSW5Db252ZXJzYXRpb25cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIG9uT3V0Z29pbmdWaWRlb0NhbGxJbkNvbnZlcnNhdGlvbj17XG4gICAgICAgICAgICAgICAgICAgIG9uT3V0Z29pbmdWaWRlb0NhbGxJbkNvbnZlcnNhdGlvblxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgb3V0Z29pbmdDYWxsQnV0dG9uU3R5bGU9e291dGdvaW5nQ2FsbEJ1dHRvblN0eWxlfVxuICAgICAgICAgICAgICAgICAgc2hvd0JhY2tCdXR0b249e3Nob3dCYWNrQnV0dG9ufVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgIHt0aGlzLnJlbmRlclNlYXJjaEJ1dHRvbigpfVxuICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJNb3JlQnV0dG9uKHRyaWdnZXJJZCl9XG4gICAgICAgICAgICAgIHt0aGlzLnJlbmRlck1lbnUodHJpZ2dlcklkKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICl9XG4gICAgICAgIDwvTWVhc3VyZT5cbiAgICAgIDwvPlxuICAgICk7XG4gIH1cbn1cblxuZnVuY3Rpb24gT3V0Z29pbmdDYWxsQnV0dG9ucyh7XG4gIGFubm91bmNlbWVudHNPbmx5LFxuICBhcmVXZUFkbWluLFxuICBpMThuLFxuICBpc05hcnJvdyxcbiAgb25PdXRnb2luZ0F1ZGlvQ2FsbEluQ29udmVyc2F0aW9uLFxuICBvbk91dGdvaW5nVmlkZW9DYWxsSW5Db252ZXJzYXRpb24sXG4gIG91dGdvaW5nQ2FsbEJ1dHRvblN0eWxlLFxuICBzaG93QmFja0J1dHRvbixcbn06IHsgaXNOYXJyb3c6IGJvb2xlYW4gfSAmIFBpY2s8XG4gIFByb3BzVHlwZSxcbiAgfCAnYW5ub3VuY2VtZW50c09ubHknXG4gIHwgJ2FyZVdlQWRtaW4nXG4gIHwgJ2kxOG4nXG4gIHwgJ29uT3V0Z29pbmdBdWRpb0NhbGxJbkNvbnZlcnNhdGlvbidcbiAgfCAnb25PdXRnb2luZ1ZpZGVvQ2FsbEluQ29udmVyc2F0aW9uJ1xuICB8ICdvdXRnb2luZ0NhbGxCdXR0b25TdHlsZSdcbiAgfCAnc2hvd0JhY2tCdXR0b24nXG4+KTogSlNYLkVsZW1lbnQgfCBudWxsIHtcbiAgY29uc3QgdmlkZW9CdXR0b24gPSAoXG4gICAgPGJ1dHRvblxuICAgICAgYXJpYS1sYWJlbD17aTE4bignbWFrZU91dGdvaW5nVmlkZW9DYWxsJyl9XG4gICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXG4gICAgICAgICdtb2R1bGUtQ29udmVyc2F0aW9uSGVhZGVyX19idXR0b24nLFxuICAgICAgICAnbW9kdWxlLUNvbnZlcnNhdGlvbkhlYWRlcl9fYnV0dG9uLS12aWRlbycsXG4gICAgICAgIHNob3dCYWNrQnV0dG9uID8gbnVsbCA6ICdtb2R1bGUtQ29udmVyc2F0aW9uSGVhZGVyX19idXR0b24tLXNob3cnLFxuICAgICAgICAhc2hvd0JhY2tCdXR0b24gJiYgYW5ub3VuY2VtZW50c09ubHkgJiYgIWFyZVdlQWRtaW5cbiAgICAgICAgICA/ICdtb2R1bGUtQ29udmVyc2F0aW9uSGVhZGVyX19idXR0b24tLXNob3ctZGlzYWJsZWQnXG4gICAgICAgICAgOiB1bmRlZmluZWRcbiAgICAgICl9XG4gICAgICBkaXNhYmxlZD17c2hvd0JhY2tCdXR0b259XG4gICAgICBvbkNsaWNrPXtvbk91dGdvaW5nVmlkZW9DYWxsSW5Db252ZXJzYXRpb259XG4gICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAvPlxuICApO1xuXG4gIGNvbnN0IHN0YXJ0Q2FsbFNob3J0Y3V0cyA9IHVzZVN0YXJ0Q2FsbFNob3J0Y3V0cyhcbiAgICBvbk91dGdvaW5nQXVkaW9DYWxsSW5Db252ZXJzYXRpb24sXG4gICAgb25PdXRnb2luZ1ZpZGVvQ2FsbEluQ29udmVyc2F0aW9uXG4gICk7XG4gIHVzZUtleWJvYXJkU2hvcnRjdXRzKHN0YXJ0Q2FsbFNob3J0Y3V0cyk7XG5cbiAgc3dpdGNoIChvdXRnb2luZ0NhbGxCdXR0b25TdHlsZSkge1xuICAgIGNhc2UgT3V0Z29pbmdDYWxsQnV0dG9uU3R5bGUuTm9uZTpcbiAgICAgIHJldHVybiBudWxsO1xuICAgIGNhc2UgT3V0Z29pbmdDYWxsQnV0dG9uU3R5bGUuSnVzdFZpZGVvOlxuICAgICAgcmV0dXJuIHZpZGVvQnV0dG9uO1xuICAgIGNhc2UgT3V0Z29pbmdDYWxsQnV0dG9uU3R5bGUuQm90aDpcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDw+XG4gICAgICAgICAge3ZpZGVvQnV0dG9ufVxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgb25DbGljaz17b25PdXRnb2luZ0F1ZGlvQ2FsbEluQ29udmVyc2F0aW9ufVxuICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFxuICAgICAgICAgICAgICAnbW9kdWxlLUNvbnZlcnNhdGlvbkhlYWRlcl9fYnV0dG9uJyxcbiAgICAgICAgICAgICAgJ21vZHVsZS1Db252ZXJzYXRpb25IZWFkZXJfX2J1dHRvbi0tYXVkaW8nLFxuICAgICAgICAgICAgICBzaG93QmFja0J1dHRvbiA/IG51bGwgOiAnbW9kdWxlLUNvbnZlcnNhdGlvbkhlYWRlcl9fYnV0dG9uLS1zaG93J1xuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIGRpc2FibGVkPXtzaG93QmFja0J1dHRvbn1cbiAgICAgICAgICAgIGFyaWEtbGFiZWw9e2kxOG4oJ21ha2VPdXRnb2luZ0NhbGwnKX1cbiAgICAgICAgICAvPlxuICAgICAgICA8Lz5cbiAgICAgICk7XG4gICAgY2FzZSBPdXRnb2luZ0NhbGxCdXR0b25TdHlsZS5Kb2luOlxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIGFyaWEtbGFiZWw9e2kxOG4oJ2pvaW5PbmdvaW5nQ2FsbCcpfVxuICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcbiAgICAgICAgICAgICdtb2R1bGUtQ29udmVyc2F0aW9uSGVhZGVyX19idXR0b24nLFxuICAgICAgICAgICAgJ21vZHVsZS1Db252ZXJzYXRpb25IZWFkZXJfX2J1dHRvbi0tam9pbi1jYWxsJyxcbiAgICAgICAgICAgIHNob3dCYWNrQnV0dG9uID8gbnVsbCA6ICdtb2R1bGUtQ29udmVyc2F0aW9uSGVhZGVyX19idXR0b24tLXNob3cnXG4gICAgICAgICAgKX1cbiAgICAgICAgICBkaXNhYmxlZD17c2hvd0JhY2tCdXR0b259XG4gICAgICAgICAgb25DbGljaz17b25PdXRnb2luZ1ZpZGVvQ2FsbEluQ29udmVyc2F0aW9ufVxuICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICA+XG4gICAgICAgICAge2lzTmFycm93ID8gbnVsbCA6IGkxOG4oJ2pvaW5PbmdvaW5nQ2FsbCcpfVxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgICk7XG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG1pc3NpbmdDYXNlRXJyb3Iob3V0Z29pbmdDYWxsQnV0dG9uU3R5bGUpO1xuICB9XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFJQSxtQkFBa0I7QUFDbEIsMkJBQW9CO0FBQ3BCLHdCQUF1QjtBQUN2QiwrQkFLTztBQUVQLHFCQUF3QjtBQUN4QixvQ0FBdUM7QUFDdkMsb0JBQW1DO0FBQ25DLDRCQUErQjtBQUsvQiw0QkFB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
