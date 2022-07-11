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
var ForwardMessageModal_exports = {};
__export(ForwardMessageModal_exports, {
  ForwardMessageModal: () => ForwardMessageModal
});
module.exports = __toCommonJS(ForwardMessageModal_exports);
var import_react = __toESM(require("react"));
var import_react_measure = __toESM(require("react-measure"));
var import_lodash = require("lodash");
var import_web = require("@react-spring/web");
var import_classnames = __toESM(require("classnames"));
var import_AttachmentList = require("./conversation/AttachmentList");
var import_Button = require("./Button");
var import_CompositionInput = require("./CompositionInput");
var import_ConfirmationDialog = require("./ConfirmationDialog");
var import_ContactCheckbox = require("./conversationList/ContactCheckbox");
var import_ConversationList = require("./ConversationList");
var import_EmojiButton = require("./emoji/EmojiButton");
var import_ModalHost = require("./ModalHost");
var import_SearchInput = require("./SearchInput");
var import_StagedLinkPreview = require("./conversation/StagedLinkPreview");
var import_assert = require("../util/assert");
var import_filterAndSortConversations = require("../util/filterAndSortConversations");
var import_useAnimated = require("../hooks/useAnimated");
const MAX_FORWARD = 5;
const ForwardMessageModal = /* @__PURE__ */ __name(({
  attachments,
  candidateConversations,
  doForwardMessage,
  getPreferredBadge,
  hasContact,
  i18n,
  isSticker,
  linkPreview,
  messageBody,
  onClose,
  onEditorStateChange,
  onPickEmoji,
  onSetSkinTone,
  onTextTooLong,
  recentEmojis,
  removeLinkPreview,
  skinTone,
  theme,
  regionCode
}) => {
  const inputRef = (0, import_react.useRef)(null);
  const inputApiRef = import_react.default.useRef();
  const [selectedContacts, setSelectedContacts] = (0, import_react.useState)([]);
  const [searchTerm, setSearchTerm] = (0, import_react.useState)("");
  const [filteredConversations, setFilteredConversations] = (0, import_react.useState)((0, import_filterAndSortConversations.filterAndSortConversationsByRecent)(candidateConversations, "", regionCode));
  const [attachmentsToForward, setAttachmentsToForward] = (0, import_react.useState)(attachments || []);
  const [isEditingMessage, setIsEditingMessage] = (0, import_react.useState)(false);
  const [messageBodyText, setMessageBodyText] = (0, import_react.useState)(messageBody || "");
  const [cannotMessage, setCannotMessage] = (0, import_react.useState)(false);
  const isMessageEditable = !isSticker && !hasContact;
  const hasSelectedMaximumNumberOfContacts = selectedContacts.length >= MAX_FORWARD;
  const selectedConversationIdsSet = (0, import_react.useMemo)(() => new Set(selectedContacts.map((contact) => contact.id)), [selectedContacts]);
  const focusTextEditInput = import_react.default.useCallback(() => {
    if (inputApiRef.current) {
      inputApiRef.current.focus();
    }
  }, [inputApiRef]);
  const insertEmoji = import_react.default.useCallback((e) => {
    if (inputApiRef.current) {
      inputApiRef.current.insertEmoji(e);
      onPickEmoji(e);
    }
  }, [inputApiRef, onPickEmoji]);
  const hasContactsSelected = Boolean(selectedContacts.length);
  const canForwardMessage = hasContactsSelected && (Boolean(messageBodyText) || isSticker || hasContact || attachmentsToForward && attachmentsToForward.length);
  const forwardMessage = import_react.default.useCallback(() => {
    if (!canForwardMessage) {
      return;
    }
    doForwardMessage(selectedContacts.map((contact) => contact.id), messageBodyText, attachmentsToForward, linkPreview);
  }, [
    attachmentsToForward,
    canForwardMessage,
    doForwardMessage,
    linkPreview,
    messageBodyText,
    selectedContacts
  ]);
  const normalizedSearchTerm = searchTerm.trim();
  (0, import_react.useEffect)(() => {
    const timeout = setTimeout(() => {
      setFilteredConversations((0, import_filterAndSortConversations.filterAndSortConversationsByRecent)(candidateConversations, normalizedSearchTerm, regionCode));
    }, 200);
    return () => {
      clearTimeout(timeout);
    };
  }, [
    candidateConversations,
    normalizedSearchTerm,
    setFilteredConversations,
    regionCode
  ]);
  const contactLookup = (0, import_react.useMemo)(() => {
    const map = /* @__PURE__ */ new Map();
    candidateConversations.forEach((contact) => {
      map.set(contact.id, contact);
    });
    return map;
  }, [candidateConversations]);
  const toggleSelectedConversation = (0, import_react.useCallback)((conversationId) => {
    let removeContact = false;
    const nextSelectedContacts = selectedContacts.filter((contact) => {
      if (contact.id === conversationId) {
        removeContact = true;
        return false;
      }
      return true;
    });
    if (removeContact) {
      setSelectedContacts(nextSelectedContacts);
      return;
    }
    const selectedContact = contactLookup.get(conversationId);
    if (selectedContact) {
      if (selectedContact.announcementsOnly && !selectedContact.areWeAdmin) {
        setCannotMessage(true);
      } else {
        setSelectedContacts([...nextSelectedContacts, selectedContact]);
      }
    }
  }, [contactLookup, selectedContacts, setSelectedContacts]);
  const { close, modalStyles, overlayStyles } = (0, import_useAnimated.useAnimated)(onClose, {
    getFrom: () => ({ opacity: 0, transform: "translateY(48px)" }),
    getTo: (isOpen) => isOpen ? { opacity: 1, transform: "translateY(0px)" } : {
      opacity: 0,
      transform: "translateY(48px)"
    }
  });
  const handleBackOrClose = (0, import_react.useCallback)(() => {
    if (isEditingMessage) {
      setIsEditingMessage(false);
    } else {
      close();
    }
  }, [isEditingMessage, close, setIsEditingMessage]);
  const rowCount = filteredConversations.length;
  const getRow = /* @__PURE__ */ __name((index) => {
    const contact = filteredConversations[index];
    if (!contact) {
      return void 0;
    }
    const isSelected = selectedConversationIdsSet.has(contact.id);
    let disabledReason;
    if (hasSelectedMaximumNumberOfContacts && !isSelected) {
      disabledReason = import_ContactCheckbox.ContactCheckboxDisabledReason.MaximumContactsSelected;
    }
    return {
      type: import_ConversationList.RowType.ContactCheckbox,
      contact,
      isChecked: isSelected,
      disabledReason
    };
  }, "getRow");
  (0, import_react.useEffect)(() => {
    const timeout = setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
    return () => {
      clearTimeout(timeout);
    };
  }, []);
  return /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, cannotMessage && /* @__PURE__ */ import_react.default.createElement(import_ConfirmationDialog.ConfirmationDialog, {
    cancelText: i18n("Confirmation--confirm"),
    i18n,
    onClose: () => setCannotMessage(false)
  }, i18n("GroupV2--cannot-send")), /* @__PURE__ */ import_react.default.createElement(import_ModalHost.ModalHost, {
    onEscape: handleBackOrClose,
    onClose: close,
    overlayStyles
  }, /* @__PURE__ */ import_react.default.createElement(import_web.animated.div, {
    className: "module-ForwardMessageModal",
    style: modalStyles
  }, /* @__PURE__ */ import_react.default.createElement("div", {
    className: (0, import_classnames.default)("module-ForwardMessageModal__header", {
      "module-ForwardMessageModal__header--edit": isEditingMessage
    })
  }, isEditingMessage ? /* @__PURE__ */ import_react.default.createElement("button", {
    "aria-label": i18n("back"),
    className: "module-ForwardMessageModal__header--back",
    onClick: () => setIsEditingMessage(false),
    type: "button"
  }, "\xA0") : /* @__PURE__ */ import_react.default.createElement("button", {
    "aria-label": i18n("close"),
    className: "module-ForwardMessageModal__header--close",
    onClick: close,
    type: "button"
  }), /* @__PURE__ */ import_react.default.createElement("h1", null, i18n("forwardMessage"))), isEditingMessage ? /* @__PURE__ */ import_react.default.createElement("div", {
    className: "module-ForwardMessageModal__main-body"
  }, linkPreview ? /* @__PURE__ */ import_react.default.createElement("div", {
    className: "module-ForwardMessageModal--link-preview"
  }, /* @__PURE__ */ import_react.default.createElement(import_StagedLinkPreview.StagedLinkPreview, {
    date: linkPreview.date,
    description: linkPreview.description || "",
    domain: linkPreview.url,
    i18n,
    image: linkPreview.image,
    onClose: () => removeLinkPreview(),
    title: linkPreview.title,
    url: linkPreview.url
  })) : null, attachmentsToForward && attachmentsToForward.length ? /* @__PURE__ */ import_react.default.createElement(import_AttachmentList.AttachmentList, {
    attachments: attachmentsToForward,
    i18n,
    onCloseAttachment: (attachment) => {
      const newAttachments = attachmentsToForward.filter((currentAttachment) => currentAttachment !== attachment);
      setAttachmentsToForward(newAttachments);
    }
  }) : null, /* @__PURE__ */ import_react.default.createElement("div", {
    className: "module-ForwardMessageModal__text-edit-area"
  }, /* @__PURE__ */ import_react.default.createElement(import_CompositionInput.CompositionInput, {
    clearQuotedMessage: shouldNeverBeCalled,
    draftText: messageBodyText,
    getPreferredBadge,
    getQuotedMessage: import_lodash.noop,
    i18n,
    inputApi: inputApiRef,
    large: true,
    moduleClassName: "module-ForwardMessageModal__input",
    onEditorStateChange: (messageText, bodyRanges, caretLocation) => {
      setMessageBodyText(messageText);
      onEditorStateChange(messageText, bodyRanges, caretLocation);
    },
    onPickEmoji,
    onSubmit: forwardMessage,
    onTextTooLong,
    theme
  }), /* @__PURE__ */ import_react.default.createElement("div", {
    className: "module-ForwardMessageModal__emoji"
  }, /* @__PURE__ */ import_react.default.createElement(import_EmojiButton.EmojiButton, {
    i18n,
    onClose: focusTextEditInput,
    onPickEmoji: insertEmoji,
    onSetSkinTone,
    recentEmojis,
    skinTone
  })))) : /* @__PURE__ */ import_react.default.createElement("div", {
    className: "module-ForwardMessageModal__main-body"
  }, /* @__PURE__ */ import_react.default.createElement(import_SearchInput.SearchInput, {
    disabled: candidateConversations.length === 0,
    i18n,
    placeholder: i18n("contactSearchPlaceholder"),
    onChange: (event) => {
      setSearchTerm(event.target.value);
    },
    ref: inputRef,
    value: searchTerm
  }), candidateConversations.length ? /* @__PURE__ */ import_react.default.createElement(import_react_measure.default, {
    bounds: true
  }, ({ contentRect, measureRef }) => /* @__PURE__ */ import_react.default.createElement("div", {
    className: "module-ForwardMessageModal__list-wrapper",
    ref: measureRef
  }, /* @__PURE__ */ import_react.default.createElement(import_ConversationList.ConversationList, {
    dimensions: contentRect.bounds,
    getPreferredBadge,
    getRow,
    i18n,
    onClickArchiveButton: shouldNeverBeCalled,
    onClickContactCheckbox: (conversationId, disabledReason) => {
      if (disabledReason !== import_ContactCheckbox.ContactCheckboxDisabledReason.MaximumContactsSelected) {
        toggleSelectedConversation(conversationId);
      }
    },
    lookupConversationWithoutUuid: asyncShouldNeverBeCalled,
    showConversation: shouldNeverBeCalled,
    showUserNotFoundModal: shouldNeverBeCalled,
    setIsFetchingUUID: shouldNeverBeCalled,
    onSelectConversation: shouldNeverBeCalled,
    renderMessageSearchResult: () => {
      shouldNeverBeCalled();
      return /* @__PURE__ */ import_react.default.createElement("div", null);
    },
    rowCount,
    shouldRecomputeRowHeights: false,
    showChooseGroupMembers: shouldNeverBeCalled,
    theme
  }))) : /* @__PURE__ */ import_react.default.createElement("div", {
    className: "module-ForwardMessageModal__no-candidate-contacts"
  }, i18n("noContactsFound"))), /* @__PURE__ */ import_react.default.createElement("div", {
    className: "module-ForwardMessageModal__footer"
  }, /* @__PURE__ */ import_react.default.createElement("div", null, Boolean(selectedContacts.length) && selectedContacts.map((contact) => contact.title).join(", ")), /* @__PURE__ */ import_react.default.createElement("div", null, isEditingMessage || !isMessageEditable ? /* @__PURE__ */ import_react.default.createElement(import_Button.Button, {
    "aria-label": i18n("ForwardMessageModal--continue"),
    className: "module-ForwardMessageModal__send-button module-ForwardMessageModal__send-button--forward",
    disabled: !canForwardMessage,
    onClick: forwardMessage
  }) : /* @__PURE__ */ import_react.default.createElement(import_Button.Button, {
    "aria-label": i18n("forwardMessage"),
    className: "module-ForwardMessageModal__send-button module-ForwardMessageModal__send-button--continue",
    disabled: !hasContactsSelected,
    onClick: () => setIsEditingMessage(true)
  }))))));
}, "ForwardMessageModal");
function shouldNeverBeCalled(..._args) {
  (0, import_assert.assert)(false, "This should never be called. Doing nothing");
}
async function asyncShouldNeverBeCalled(..._args) {
  shouldNeverBeCalled();
  return void 0;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ForwardMessageModal
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiRm9yd2FyZE1lc3NhZ2VNb2RhbC50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxLTIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgdHlwZSB7IEZ1bmN0aW9uQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0LCB7XG4gIHVzZUNhbGxiYWNrLFxuICB1c2VFZmZlY3QsXG4gIHVzZU1lbW8sXG4gIHVzZVJlZixcbiAgdXNlU3RhdGUsXG59IGZyb20gJ3JlYWN0JztcbmltcG9ydCB0eXBlIHsgTWVhc3VyZWRDb21wb25lbnRQcm9wcyB9IGZyb20gJ3JlYWN0LW1lYXN1cmUnO1xuaW1wb3J0IE1lYXN1cmUgZnJvbSAncmVhY3QtbWVhc3VyZSc7XG5pbXBvcnQgeyBub29wIH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IGFuaW1hdGVkIH0gZnJvbSAnQHJlYWN0LXNwcmluZy93ZWInO1xuXG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCB7IEF0dGFjaG1lbnRMaXN0IH0gZnJvbSAnLi9jb252ZXJzYXRpb24vQXR0YWNobWVudExpc3QnO1xuaW1wb3J0IHR5cGUgeyBBdHRhY2htZW50VHlwZSB9IGZyb20gJy4uL3R5cGVzL0F0dGFjaG1lbnQnO1xuaW1wb3J0IHsgQnV0dG9uIH0gZnJvbSAnLi9CdXR0b24nO1xuaW1wb3J0IHR5cGUgeyBJbnB1dEFwaSB9IGZyb20gJy4vQ29tcG9zaXRpb25JbnB1dCc7XG5pbXBvcnQgeyBDb21wb3NpdGlvbklucHV0IH0gZnJvbSAnLi9Db21wb3NpdGlvbklucHV0JztcbmltcG9ydCB7IENvbmZpcm1hdGlvbkRpYWxvZyB9IGZyb20gJy4vQ29uZmlybWF0aW9uRGlhbG9nJztcbmltcG9ydCB7IENvbnRhY3RDaGVja2JveERpc2FibGVkUmVhc29uIH0gZnJvbSAnLi9jb252ZXJzYXRpb25MaXN0L0NvbnRhY3RDaGVja2JveCc7XG5pbXBvcnQgdHlwZSB7IFJvdyB9IGZyb20gJy4vQ29udmVyc2F0aW9uTGlzdCc7XG5pbXBvcnQgeyBDb252ZXJzYXRpb25MaXN0LCBSb3dUeXBlIH0gZnJvbSAnLi9Db252ZXJzYXRpb25MaXN0JztcbmltcG9ydCB0eXBlIHsgQ29udmVyc2F0aW9uVHlwZSB9IGZyb20gJy4uL3N0YXRlL2R1Y2tzL2NvbnZlcnNhdGlvbnMnO1xuaW1wb3J0IHR5cGUgeyBQcmVmZXJyZWRCYWRnZVNlbGVjdG9yVHlwZSB9IGZyb20gJy4uL3N0YXRlL3NlbGVjdG9ycy9iYWRnZXMnO1xuaW1wb3J0IHR5cGUgeyBQcm9wcyBhcyBFbW9qaUJ1dHRvblByb3BzIH0gZnJvbSAnLi9lbW9qaS9FbW9qaUJ1dHRvbic7XG5pbXBvcnQgeyBFbW9qaUJ1dHRvbiB9IGZyb20gJy4vZW1vamkvRW1vamlCdXR0b24nO1xuaW1wb3J0IHR5cGUgeyBFbW9qaVBpY2tEYXRhVHlwZSB9IGZyb20gJy4vZW1vamkvRW1vamlQaWNrZXInO1xuaW1wb3J0IHR5cGUgeyBMaW5rUHJldmlld1R5cGUgfSBmcm9tICcuLi90eXBlcy9tZXNzYWdlL0xpbmtQcmV2aWV3cyc7XG5pbXBvcnQgdHlwZSB7IEJvZHlSYW5nZVR5cGUsIExvY2FsaXplclR5cGUsIFRoZW1lVHlwZSB9IGZyb20gJy4uL3R5cGVzL1V0aWwnO1xuaW1wb3J0IHsgTW9kYWxIb3N0IH0gZnJvbSAnLi9Nb2RhbEhvc3QnO1xuaW1wb3J0IHsgU2VhcmNoSW5wdXQgfSBmcm9tICcuL1NlYXJjaElucHV0JztcbmltcG9ydCB7IFN0YWdlZExpbmtQcmV2aWV3IH0gZnJvbSAnLi9jb252ZXJzYXRpb24vU3RhZ2VkTGlua1ByZXZpZXcnO1xuaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSAnLi4vdXRpbC9hc3NlcnQnO1xuaW1wb3J0IHsgZmlsdGVyQW5kU29ydENvbnZlcnNhdGlvbnNCeVJlY2VudCB9IGZyb20gJy4uL3V0aWwvZmlsdGVyQW5kU29ydENvbnZlcnNhdGlvbnMnO1xuaW1wb3J0IHsgdXNlQW5pbWF0ZWQgfSBmcm9tICcuLi9ob29rcy91c2VBbmltYXRlZCc7XG5cbmV4cG9ydCB0eXBlIERhdGFQcm9wc1R5cGUgPSB7XG4gIGF0dGFjaG1lbnRzPzogQXJyYXk8QXR0YWNobWVudFR5cGU+O1xuICBjYW5kaWRhdGVDb252ZXJzYXRpb25zOiBSZWFkb25seUFycmF5PENvbnZlcnNhdGlvblR5cGU+O1xuICBkb0ZvcndhcmRNZXNzYWdlOiAoXG4gICAgc2VsZWN0ZWRDb250YWN0czogQXJyYXk8c3RyaW5nPixcbiAgICBtZXNzYWdlQm9keT86IHN0cmluZyxcbiAgICBhdHRhY2htZW50cz86IEFycmF5PEF0dGFjaG1lbnRUeXBlPixcbiAgICBsaW5rUHJldmlldz86IExpbmtQcmV2aWV3VHlwZVxuICApID0+IHZvaWQ7XG4gIGdldFByZWZlcnJlZEJhZGdlOiBQcmVmZXJyZWRCYWRnZVNlbGVjdG9yVHlwZTtcbiAgaGFzQ29udGFjdDogYm9vbGVhbjtcbiAgaTE4bjogTG9jYWxpemVyVHlwZTtcbiAgaXNTdGlja2VyOiBib29sZWFuO1xuICBsaW5rUHJldmlldz86IExpbmtQcmV2aWV3VHlwZTtcbiAgbWVzc2FnZUJvZHk/OiBzdHJpbmc7XG4gIG9uQ2xvc2U6ICgpID0+IHZvaWQ7XG4gIG9uRWRpdG9yU3RhdGVDaGFuZ2U6IChcbiAgICBtZXNzYWdlVGV4dDogc3RyaW5nLFxuICAgIGJvZHlSYW5nZXM6IEFycmF5PEJvZHlSYW5nZVR5cGU+LFxuICAgIGNhcmV0TG9jYXRpb24/OiBudW1iZXJcbiAgKSA9PiB1bmtub3duO1xuICBvblRleHRUb29Mb25nOiAoKSA9PiB2b2lkO1xuICB0aGVtZTogVGhlbWVUeXBlO1xuICByZWdpb25Db2RlOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG59ICYgUGljazxFbW9qaUJ1dHRvblByb3BzLCAncmVjZW50RW1vamlzJyB8ICdza2luVG9uZSc+O1xuXG50eXBlIEFjdGlvblByb3BzVHlwZSA9IFBpY2s8XG4gIEVtb2ppQnV0dG9uUHJvcHMsXG4gICdvblBpY2tFbW9qaScgfCAnb25TZXRTa2luVG9uZSdcbj4gJiB7XG4gIHJlbW92ZUxpbmtQcmV2aWV3OiAoKSA9PiB2b2lkO1xufTtcblxuZXhwb3J0IHR5cGUgUHJvcHNUeXBlID0gRGF0YVByb3BzVHlwZSAmIEFjdGlvblByb3BzVHlwZTtcblxuY29uc3QgTUFYX0ZPUldBUkQgPSA1O1xuXG5leHBvcnQgY29uc3QgRm9yd2FyZE1lc3NhZ2VNb2RhbDogRnVuY3Rpb25Db21wb25lbnQ8UHJvcHNUeXBlPiA9ICh7XG4gIGF0dGFjaG1lbnRzLFxuICBjYW5kaWRhdGVDb252ZXJzYXRpb25zLFxuICBkb0ZvcndhcmRNZXNzYWdlLFxuICBnZXRQcmVmZXJyZWRCYWRnZSxcbiAgaGFzQ29udGFjdCxcbiAgaTE4bixcbiAgaXNTdGlja2VyLFxuICBsaW5rUHJldmlldyxcbiAgbWVzc2FnZUJvZHksXG4gIG9uQ2xvc2UsXG4gIG9uRWRpdG9yU3RhdGVDaGFuZ2UsXG4gIG9uUGlja0Vtb2ppLFxuICBvblNldFNraW5Ub25lLFxuICBvblRleHRUb29Mb25nLFxuICByZWNlbnRFbW9qaXMsXG4gIHJlbW92ZUxpbmtQcmV2aWV3LFxuICBza2luVG9uZSxcbiAgdGhlbWUsXG4gIHJlZ2lvbkNvZGUsXG59KSA9PiB7XG4gIGNvbnN0IGlucHV0UmVmID0gdXNlUmVmPG51bGwgfCBIVE1MSW5wdXRFbGVtZW50PihudWxsKTtcbiAgY29uc3QgaW5wdXRBcGlSZWYgPSBSZWFjdC51c2VSZWY8SW5wdXRBcGkgfCB1bmRlZmluZWQ+KCk7XG4gIGNvbnN0IFtzZWxlY3RlZENvbnRhY3RzLCBzZXRTZWxlY3RlZENvbnRhY3RzXSA9IHVzZVN0YXRlPFxuICAgIEFycmF5PENvbnZlcnNhdGlvblR5cGU+XG4gID4oW10pO1xuICBjb25zdCBbc2VhcmNoVGVybSwgc2V0U2VhcmNoVGVybV0gPSB1c2VTdGF0ZSgnJyk7XG4gIGNvbnN0IFtmaWx0ZXJlZENvbnZlcnNhdGlvbnMsIHNldEZpbHRlcmVkQ29udmVyc2F0aW9uc10gPSB1c2VTdGF0ZShcbiAgICBmaWx0ZXJBbmRTb3J0Q29udmVyc2F0aW9uc0J5UmVjZW50KGNhbmRpZGF0ZUNvbnZlcnNhdGlvbnMsICcnLCByZWdpb25Db2RlKVxuICApO1xuICBjb25zdCBbYXR0YWNobWVudHNUb0ZvcndhcmQsIHNldEF0dGFjaG1lbnRzVG9Gb3J3YXJkXSA9IHVzZVN0YXRlPFxuICAgIEFycmF5PEF0dGFjaG1lbnRUeXBlPlxuICA+KGF0dGFjaG1lbnRzIHx8IFtdKTtcbiAgY29uc3QgW2lzRWRpdGluZ01lc3NhZ2UsIHNldElzRWRpdGluZ01lc3NhZ2VdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbbWVzc2FnZUJvZHlUZXh0LCBzZXRNZXNzYWdlQm9keVRleHRdID0gdXNlU3RhdGUobWVzc2FnZUJvZHkgfHwgJycpO1xuICBjb25zdCBbY2Fubm90TWVzc2FnZSwgc2V0Q2Fubm90TWVzc2FnZV0gPSB1c2VTdGF0ZShmYWxzZSk7XG5cbiAgY29uc3QgaXNNZXNzYWdlRWRpdGFibGUgPSAhaXNTdGlja2VyICYmICFoYXNDb250YWN0O1xuXG4gIGNvbnN0IGhhc1NlbGVjdGVkTWF4aW11bU51bWJlck9mQ29udGFjdHMgPVxuICAgIHNlbGVjdGVkQ29udGFjdHMubGVuZ3RoID49IE1BWF9GT1JXQVJEO1xuXG4gIGNvbnN0IHNlbGVjdGVkQ29udmVyc2F0aW9uSWRzU2V0OiBTZXQ8c3RyaW5nPiA9IHVzZU1lbW8oXG4gICAgKCkgPT4gbmV3IFNldChzZWxlY3RlZENvbnRhY3RzLm1hcChjb250YWN0ID0+IGNvbnRhY3QuaWQpKSxcbiAgICBbc2VsZWN0ZWRDb250YWN0c11cbiAgKTtcblxuICBjb25zdCBmb2N1c1RleHRFZGl0SW5wdXQgPSBSZWFjdC51c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgaWYgKGlucHV0QXBpUmVmLmN1cnJlbnQpIHtcbiAgICAgIGlucHV0QXBpUmVmLmN1cnJlbnQuZm9jdXMoKTtcbiAgICB9XG4gIH0sIFtpbnB1dEFwaVJlZl0pO1xuXG4gIGNvbnN0IGluc2VydEVtb2ppID0gUmVhY3QudXNlQ2FsbGJhY2soXG4gICAgKGU6IEVtb2ppUGlja0RhdGFUeXBlKSA9PiB7XG4gICAgICBpZiAoaW5wdXRBcGlSZWYuY3VycmVudCkge1xuICAgICAgICBpbnB1dEFwaVJlZi5jdXJyZW50Lmluc2VydEVtb2ppKGUpO1xuICAgICAgICBvblBpY2tFbW9qaShlKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIFtpbnB1dEFwaVJlZiwgb25QaWNrRW1vamldXG4gICk7XG5cbiAgY29uc3QgaGFzQ29udGFjdHNTZWxlY3RlZCA9IEJvb2xlYW4oc2VsZWN0ZWRDb250YWN0cy5sZW5ndGgpO1xuXG4gIGNvbnN0IGNhbkZvcndhcmRNZXNzYWdlID1cbiAgICBoYXNDb250YWN0c1NlbGVjdGVkICYmXG4gICAgKEJvb2xlYW4obWVzc2FnZUJvZHlUZXh0KSB8fFxuICAgICAgaXNTdGlja2VyIHx8XG4gICAgICBoYXNDb250YWN0IHx8XG4gICAgICAoYXR0YWNobWVudHNUb0ZvcndhcmQgJiYgYXR0YWNobWVudHNUb0ZvcndhcmQubGVuZ3RoKSk7XG5cbiAgY29uc3QgZm9yd2FyZE1lc3NhZ2UgPSBSZWFjdC51c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgaWYgKCFjYW5Gb3J3YXJkTWVzc2FnZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGRvRm9yd2FyZE1lc3NhZ2UoXG4gICAgICBzZWxlY3RlZENvbnRhY3RzLm1hcChjb250YWN0ID0+IGNvbnRhY3QuaWQpLFxuICAgICAgbWVzc2FnZUJvZHlUZXh0LFxuICAgICAgYXR0YWNobWVudHNUb0ZvcndhcmQsXG4gICAgICBsaW5rUHJldmlld1xuICAgICk7XG4gIH0sIFtcbiAgICBhdHRhY2htZW50c1RvRm9yd2FyZCxcbiAgICBjYW5Gb3J3YXJkTWVzc2FnZSxcbiAgICBkb0ZvcndhcmRNZXNzYWdlLFxuICAgIGxpbmtQcmV2aWV3LFxuICAgIG1lc3NhZ2VCb2R5VGV4dCxcbiAgICBzZWxlY3RlZENvbnRhY3RzLFxuICBdKTtcblxuICBjb25zdCBub3JtYWxpemVkU2VhcmNoVGVybSA9IHNlYXJjaFRlcm0udHJpbSgpO1xuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IHRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHNldEZpbHRlcmVkQ29udmVyc2F0aW9ucyhcbiAgICAgICAgZmlsdGVyQW5kU29ydENvbnZlcnNhdGlvbnNCeVJlY2VudChcbiAgICAgICAgICBjYW5kaWRhdGVDb252ZXJzYXRpb25zLFxuICAgICAgICAgIG5vcm1hbGl6ZWRTZWFyY2hUZXJtLFxuICAgICAgICAgIHJlZ2lvbkNvZGVcbiAgICAgICAgKVxuICAgICAgKTtcbiAgICB9LCAyMDApO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgfTtcbiAgfSwgW1xuICAgIGNhbmRpZGF0ZUNvbnZlcnNhdGlvbnMsXG4gICAgbm9ybWFsaXplZFNlYXJjaFRlcm0sXG4gICAgc2V0RmlsdGVyZWRDb252ZXJzYXRpb25zLFxuICAgIHJlZ2lvbkNvZGUsXG4gIF0pO1xuXG4gIGNvbnN0IGNvbnRhY3RMb29rdXAgPSB1c2VNZW1vKCgpID0+IHtcbiAgICBjb25zdCBtYXAgPSBuZXcgTWFwKCk7XG4gICAgY2FuZGlkYXRlQ29udmVyc2F0aW9ucy5mb3JFYWNoKGNvbnRhY3QgPT4ge1xuICAgICAgbWFwLnNldChjb250YWN0LmlkLCBjb250YWN0KTtcbiAgICB9KTtcbiAgICByZXR1cm4gbWFwO1xuICB9LCBbY2FuZGlkYXRlQ29udmVyc2F0aW9uc10pO1xuXG4gIGNvbnN0IHRvZ2dsZVNlbGVjdGVkQ29udmVyc2F0aW9uID0gdXNlQ2FsbGJhY2soXG4gICAgKGNvbnZlcnNhdGlvbklkOiBzdHJpbmcpID0+IHtcbiAgICAgIGxldCByZW1vdmVDb250YWN0ID0gZmFsc2U7XG4gICAgICBjb25zdCBuZXh0U2VsZWN0ZWRDb250YWN0cyA9IHNlbGVjdGVkQ29udGFjdHMuZmlsdGVyKGNvbnRhY3QgPT4ge1xuICAgICAgICBpZiAoY29udGFjdC5pZCA9PT0gY29udmVyc2F0aW9uSWQpIHtcbiAgICAgICAgICByZW1vdmVDb250YWN0ID0gdHJ1ZTtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9KTtcbiAgICAgIGlmIChyZW1vdmVDb250YWN0KSB7XG4gICAgICAgIHNldFNlbGVjdGVkQ29udGFjdHMobmV4dFNlbGVjdGVkQ29udGFjdHMpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb25zdCBzZWxlY3RlZENvbnRhY3QgPSBjb250YWN0TG9va3VwLmdldChjb252ZXJzYXRpb25JZCk7XG4gICAgICBpZiAoc2VsZWN0ZWRDb250YWN0KSB7XG4gICAgICAgIGlmIChzZWxlY3RlZENvbnRhY3QuYW5ub3VuY2VtZW50c09ubHkgJiYgIXNlbGVjdGVkQ29udGFjdC5hcmVXZUFkbWluKSB7XG4gICAgICAgICAgc2V0Q2Fubm90TWVzc2FnZSh0cnVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzZXRTZWxlY3RlZENvbnRhY3RzKFsuLi5uZXh0U2VsZWN0ZWRDb250YWN0cywgc2VsZWN0ZWRDb250YWN0XSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIFtjb250YWN0TG9va3VwLCBzZWxlY3RlZENvbnRhY3RzLCBzZXRTZWxlY3RlZENvbnRhY3RzXVxuICApO1xuXG4gIGNvbnN0IHsgY2xvc2UsIG1vZGFsU3R5bGVzLCBvdmVybGF5U3R5bGVzIH0gPSB1c2VBbmltYXRlZChvbkNsb3NlLCB7XG4gICAgZ2V0RnJvbTogKCkgPT4gKHsgb3BhY2l0eTogMCwgdHJhbnNmb3JtOiAndHJhbnNsYXRlWSg0OHB4KScgfSksXG4gICAgZ2V0VG86IGlzT3BlbiA9PlxuICAgICAgaXNPcGVuXG4gICAgICAgID8geyBvcGFjaXR5OiAxLCB0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKDBweCknIH1cbiAgICAgICAgOiB7XG4gICAgICAgICAgICBvcGFjaXR5OiAwLFxuICAgICAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWSg0OHB4KScsXG4gICAgICAgICAgfSxcbiAgfSk7XG5cbiAgY29uc3QgaGFuZGxlQmFja09yQ2xvc2UgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgaWYgKGlzRWRpdGluZ01lc3NhZ2UpIHtcbiAgICAgIHNldElzRWRpdGluZ01lc3NhZ2UoZmFsc2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjbG9zZSgpO1xuICAgIH1cbiAgfSwgW2lzRWRpdGluZ01lc3NhZ2UsIGNsb3NlLCBzZXRJc0VkaXRpbmdNZXNzYWdlXSk7XG5cbiAgY29uc3Qgcm93Q291bnQgPSBmaWx0ZXJlZENvbnZlcnNhdGlvbnMubGVuZ3RoO1xuICBjb25zdCBnZXRSb3cgPSAoaW5kZXg6IG51bWJlcik6IHVuZGVmaW5lZCB8IFJvdyA9PiB7XG4gICAgY29uc3QgY29udGFjdCA9IGZpbHRlcmVkQ29udmVyc2F0aW9uc1tpbmRleF07XG4gICAgaWYgKCFjb250YWN0KSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGNvbnN0IGlzU2VsZWN0ZWQgPSBzZWxlY3RlZENvbnZlcnNhdGlvbklkc1NldC5oYXMoY29udGFjdC5pZCk7XG5cbiAgICBsZXQgZGlzYWJsZWRSZWFzb246IHVuZGVmaW5lZCB8IENvbnRhY3RDaGVja2JveERpc2FibGVkUmVhc29uO1xuICAgIGlmIChoYXNTZWxlY3RlZE1heGltdW1OdW1iZXJPZkNvbnRhY3RzICYmICFpc1NlbGVjdGVkKSB7XG4gICAgICBkaXNhYmxlZFJlYXNvbiA9IENvbnRhY3RDaGVja2JveERpc2FibGVkUmVhc29uLk1heGltdW1Db250YWN0c1NlbGVjdGVkO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiBSb3dUeXBlLkNvbnRhY3RDaGVja2JveCxcbiAgICAgIGNvbnRhY3QsXG4gICAgICBpc0NoZWNrZWQ6IGlzU2VsZWN0ZWQsXG4gICAgICBkaXNhYmxlZFJlYXNvbixcbiAgICB9O1xuICB9O1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgdGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgaW5wdXRSZWYuY3VycmVudD8uZm9jdXMoKTtcbiAgICB9LCAxMDApO1xuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICB9O1xuICB9LCBbXSk7XG5cbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAge2Nhbm5vdE1lc3NhZ2UgJiYgKFxuICAgICAgICA8Q29uZmlybWF0aW9uRGlhbG9nXG4gICAgICAgICAgY2FuY2VsVGV4dD17aTE4bignQ29uZmlybWF0aW9uLS1jb25maXJtJyl9XG4gICAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgICBvbkNsb3NlPXsoKSA9PiBzZXRDYW5ub3RNZXNzYWdlKGZhbHNlKX1cbiAgICAgICAgPlxuICAgICAgICAgIHtpMThuKCdHcm91cFYyLS1jYW5ub3Qtc2VuZCcpfVxuICAgICAgICA8L0NvbmZpcm1hdGlvbkRpYWxvZz5cbiAgICAgICl9XG4gICAgICA8TW9kYWxIb3N0XG4gICAgICAgIG9uRXNjYXBlPXtoYW5kbGVCYWNrT3JDbG9zZX1cbiAgICAgICAgb25DbG9zZT17Y2xvc2V9XG4gICAgICAgIG92ZXJsYXlTdHlsZXM9e292ZXJsYXlTdHlsZXN9XG4gICAgICA+XG4gICAgICAgIDxhbmltYXRlZC5kaXZcbiAgICAgICAgICBjbGFzc05hbWU9XCJtb2R1bGUtRm9yd2FyZE1lc3NhZ2VNb2RhbFwiXG4gICAgICAgICAgc3R5bGU9e21vZGFsU3R5bGVzfVxuICAgICAgICA+XG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKCdtb2R1bGUtRm9yd2FyZE1lc3NhZ2VNb2RhbF9faGVhZGVyJywge1xuICAgICAgICAgICAgICAnbW9kdWxlLUZvcndhcmRNZXNzYWdlTW9kYWxfX2hlYWRlci0tZWRpdCc6IGlzRWRpdGluZ01lc3NhZ2UsXG4gICAgICAgICAgICB9KX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7aXNFZGl0aW5nTWVzc2FnZSA/IChcbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9e2kxOG4oJ2JhY2snKX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJtb2R1bGUtRm9yd2FyZE1lc3NhZ2VNb2RhbF9faGVhZGVyLS1iYWNrXCJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRJc0VkaXRpbmdNZXNzYWdlKGZhbHNlKX1cbiAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICZuYnNwO1xuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtpMThuKCdjbG9zZScpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cIm1vZHVsZS1Gb3J3YXJkTWVzc2FnZU1vZGFsX19oZWFkZXItLWNsb3NlXCJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXtjbG9zZX1cbiAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8aDE+e2kxOG4oJ2ZvcndhcmRNZXNzYWdlJyl9PC9oMT5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICB7aXNFZGl0aW5nTWVzc2FnZSA/IChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kdWxlLUZvcndhcmRNZXNzYWdlTW9kYWxfX21haW4tYm9keVwiPlxuICAgICAgICAgICAgICB7bGlua1ByZXZpZXcgPyAoXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2R1bGUtRm9yd2FyZE1lc3NhZ2VNb2RhbC0tbGluay1wcmV2aWV3XCI+XG4gICAgICAgICAgICAgICAgICA8U3RhZ2VkTGlua1ByZXZpZXdcbiAgICAgICAgICAgICAgICAgICAgZGF0ZT17bGlua1ByZXZpZXcuZGF0ZX1cbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb249e2xpbmtQcmV2aWV3LmRlc2NyaXB0aW9uIHx8ICcnfVxuICAgICAgICAgICAgICAgICAgICBkb21haW49e2xpbmtQcmV2aWV3LnVybH1cbiAgICAgICAgICAgICAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgICAgICAgICAgICAgaW1hZ2U9e2xpbmtQcmV2aWV3LmltYWdlfVxuICAgICAgICAgICAgICAgICAgICBvbkNsb3NlPXsoKSA9PiByZW1vdmVMaW5rUHJldmlldygpfVxuICAgICAgICAgICAgICAgICAgICB0aXRsZT17bGlua1ByZXZpZXcudGl0bGV9XG4gICAgICAgICAgICAgICAgICAgIHVybD17bGlua1ByZXZpZXcudXJsfVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgKSA6IG51bGx9XG4gICAgICAgICAgICAgIHthdHRhY2htZW50c1RvRm9yd2FyZCAmJiBhdHRhY2htZW50c1RvRm9yd2FyZC5sZW5ndGggPyAoXG4gICAgICAgICAgICAgICAgPEF0dGFjaG1lbnRMaXN0XG4gICAgICAgICAgICAgICAgICBhdHRhY2htZW50cz17YXR0YWNobWVudHNUb0ZvcndhcmR9XG4gICAgICAgICAgICAgICAgICBpMThuPXtpMThufVxuICAgICAgICAgICAgICAgICAgb25DbG9zZUF0dGFjaG1lbnQ9eyhhdHRhY2htZW50OiBBdHRhY2htZW50VHlwZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdBdHRhY2htZW50cyA9IGF0dGFjaG1lbnRzVG9Gb3J3YXJkLmZpbHRlcihcbiAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50QXR0YWNobWVudCA9PiBjdXJyZW50QXR0YWNobWVudCAhPT0gYXR0YWNobWVudFxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICBzZXRBdHRhY2htZW50c1RvRm9yd2FyZChuZXdBdHRhY2htZW50cyk7XG4gICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZHVsZS1Gb3J3YXJkTWVzc2FnZU1vZGFsX190ZXh0LWVkaXQtYXJlYVwiPlxuICAgICAgICAgICAgICAgIDxDb21wb3NpdGlvbklucHV0XG4gICAgICAgICAgICAgICAgICBjbGVhclF1b3RlZE1lc3NhZ2U9e3Nob3VsZE5ldmVyQmVDYWxsZWR9XG4gICAgICAgICAgICAgICAgICBkcmFmdFRleHQ9e21lc3NhZ2VCb2R5VGV4dH1cbiAgICAgICAgICAgICAgICAgIGdldFByZWZlcnJlZEJhZGdlPXtnZXRQcmVmZXJyZWRCYWRnZX1cbiAgICAgICAgICAgICAgICAgIGdldFF1b3RlZE1lc3NhZ2U9e25vb3B9XG4gICAgICAgICAgICAgICAgICBpMThuPXtpMThufVxuICAgICAgICAgICAgICAgICAgaW5wdXRBcGk9e2lucHV0QXBpUmVmfVxuICAgICAgICAgICAgICAgICAgbGFyZ2VcbiAgICAgICAgICAgICAgICAgIG1vZHVsZUNsYXNzTmFtZT1cIm1vZHVsZS1Gb3J3YXJkTWVzc2FnZU1vZGFsX19pbnB1dFwiXG4gICAgICAgICAgICAgICAgICBvbkVkaXRvclN0YXRlQ2hhbmdlPXsoXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2VUZXh0LFxuICAgICAgICAgICAgICAgICAgICBib2R5UmFuZ2VzLFxuICAgICAgICAgICAgICAgICAgICBjYXJldExvY2F0aW9uXG4gICAgICAgICAgICAgICAgICApID0+IHtcbiAgICAgICAgICAgICAgICAgICAgc2V0TWVzc2FnZUJvZHlUZXh0KG1lc3NhZ2VUZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgb25FZGl0b3JTdGF0ZUNoYW5nZShtZXNzYWdlVGV4dCwgYm9keVJhbmdlcywgY2FyZXRMb2NhdGlvbik7XG4gICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgb25QaWNrRW1vamk9e29uUGlja0Vtb2ppfVxuICAgICAgICAgICAgICAgICAgb25TdWJtaXQ9e2ZvcndhcmRNZXNzYWdlfVxuICAgICAgICAgICAgICAgICAgb25UZXh0VG9vTG9uZz17b25UZXh0VG9vTG9uZ31cbiAgICAgICAgICAgICAgICAgIHRoZW1lPXt0aGVtZX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kdWxlLUZvcndhcmRNZXNzYWdlTW9kYWxfX2Vtb2ppXCI+XG4gICAgICAgICAgICAgICAgICA8RW1vamlCdXR0b25cbiAgICAgICAgICAgICAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgICAgICAgICAgICAgb25DbG9zZT17Zm9jdXNUZXh0RWRpdElucHV0fVxuICAgICAgICAgICAgICAgICAgICBvblBpY2tFbW9qaT17aW5zZXJ0RW1vaml9XG4gICAgICAgICAgICAgICAgICAgIG9uU2V0U2tpblRvbmU9e29uU2V0U2tpblRvbmV9XG4gICAgICAgICAgICAgICAgICAgIHJlY2VudEVtb2ppcz17cmVjZW50RW1vamlzfVxuICAgICAgICAgICAgICAgICAgICBza2luVG9uZT17c2tpblRvbmV9XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZHVsZS1Gb3J3YXJkTWVzc2FnZU1vZGFsX19tYWluLWJvZHlcIj5cbiAgICAgICAgICAgICAgPFNlYXJjaElucHV0XG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2NhbmRpZGF0ZUNvbnZlcnNhdGlvbnMubGVuZ3RoID09PSAwfVxuICAgICAgICAgICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9e2kxOG4oJ2NvbnRhY3RTZWFyY2hQbGFjZWhvbGRlcicpfVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtldmVudCA9PiB7XG4gICAgICAgICAgICAgICAgICBzZXRTZWFyY2hUZXJtKGV2ZW50LnRhcmdldC52YWx1ZSk7XG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICByZWY9e2lucHV0UmVmfVxuICAgICAgICAgICAgICAgIHZhbHVlPXtzZWFyY2hUZXJtfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICB7Y2FuZGlkYXRlQ29udmVyc2F0aW9ucy5sZW5ndGggPyAoXG4gICAgICAgICAgICAgICAgPE1lYXN1cmUgYm91bmRzPlxuICAgICAgICAgICAgICAgICAgeyh7IGNvbnRlbnRSZWN0LCBtZWFzdXJlUmVmIH06IE1lYXN1cmVkQ29tcG9uZW50UHJvcHMpID0+IChcbiAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cIm1vZHVsZS1Gb3J3YXJkTWVzc2FnZU1vZGFsX19saXN0LXdyYXBwZXJcIlxuICAgICAgICAgICAgICAgICAgICAgIHJlZj17bWVhc3VyZVJlZn1cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIDxDb252ZXJzYXRpb25MaXN0XG4gICAgICAgICAgICAgICAgICAgICAgICBkaW1lbnNpb25zPXtjb250ZW50UmVjdC5ib3VuZHN9XG4gICAgICAgICAgICAgICAgICAgICAgICBnZXRQcmVmZXJyZWRCYWRnZT17Z2V0UHJlZmVycmVkQmFkZ2V9XG4gICAgICAgICAgICAgICAgICAgICAgICBnZXRSb3c9e2dldFJvd31cbiAgICAgICAgICAgICAgICAgICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrQXJjaGl2ZUJ1dHRvbj17c2hvdWxkTmV2ZXJCZUNhbGxlZH1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2tDb250YWN0Q2hlY2tib3g9eyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY29udmVyc2F0aW9uSWQ6IHN0cmluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWRSZWFzb246XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfCB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IENvbnRhY3RDaGVja2JveERpc2FibGVkUmVhc29uXG4gICAgICAgICAgICAgICAgICAgICAgICApID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkUmVhc29uICE9PVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIENvbnRhY3RDaGVja2JveERpc2FibGVkUmVhc29uLk1heGltdW1Db250YWN0c1NlbGVjdGVkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvZ2dsZVNlbGVjdGVkQ29udmVyc2F0aW9uKGNvbnZlcnNhdGlvbklkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgIGxvb2t1cENvbnZlcnNhdGlvbldpdGhvdXRVdWlkPXthc3luY1Nob3VsZE5ldmVyQmVDYWxsZWR9XG4gICAgICAgICAgICAgICAgICAgICAgICBzaG93Q29udmVyc2F0aW9uPXtzaG91bGROZXZlckJlQ2FsbGVkfVxuICAgICAgICAgICAgICAgICAgICAgICAgc2hvd1VzZXJOb3RGb3VuZE1vZGFsPXtzaG91bGROZXZlckJlQ2FsbGVkfVxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0SXNGZXRjaGluZ1VVSUQ9e3Nob3VsZE5ldmVyQmVDYWxsZWR9XG4gICAgICAgICAgICAgICAgICAgICAgICBvblNlbGVjdENvbnZlcnNhdGlvbj17c2hvdWxkTmV2ZXJCZUNhbGxlZH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbmRlck1lc3NhZ2VTZWFyY2hSZXN1bHQ9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvdWxkTmV2ZXJCZUNhbGxlZCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gPGRpdiAvPjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICByb3dDb3VudD17cm93Q291bnR9XG4gICAgICAgICAgICAgICAgICAgICAgICBzaG91bGRSZWNvbXB1dGVSb3dIZWlnaHRzPXtmYWxzZX1cbiAgICAgICAgICAgICAgICAgICAgICAgIHNob3dDaG9vc2VHcm91cE1lbWJlcnM9e3Nob3VsZE5ldmVyQmVDYWxsZWR9XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGVtZT17dGhlbWV9XG4gICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgIDwvTWVhc3VyZT5cbiAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZHVsZS1Gb3J3YXJkTWVzc2FnZU1vZGFsX19uby1jYW5kaWRhdGUtY29udGFjdHNcIj5cbiAgICAgICAgICAgICAgICAgIHtpMThuKCdub0NvbnRhY3RzRm91bmQnKX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICl9XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2R1bGUtRm9yd2FyZE1lc3NhZ2VNb2RhbF9fZm9vdGVyXCI+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICB7Qm9vbGVhbihzZWxlY3RlZENvbnRhY3RzLmxlbmd0aCkgJiZcbiAgICAgICAgICAgICAgICBzZWxlY3RlZENvbnRhY3RzLm1hcChjb250YWN0ID0+IGNvbnRhY3QudGl0bGUpLmpvaW4oJywgJyl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIHtpc0VkaXRpbmdNZXNzYWdlIHx8ICFpc01lc3NhZ2VFZGl0YWJsZSA/IChcbiAgICAgICAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtpMThuKCdGb3J3YXJkTWVzc2FnZU1vZGFsLS1jb250aW51ZScpfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwibW9kdWxlLUZvcndhcmRNZXNzYWdlTW9kYWxfX3NlbmQtYnV0dG9uIG1vZHVsZS1Gb3J3YXJkTWVzc2FnZU1vZGFsX19zZW5kLWJ1dHRvbi0tZm9yd2FyZFwiXG4gICAgICAgICAgICAgICAgICBkaXNhYmxlZD17IWNhbkZvcndhcmRNZXNzYWdlfVxuICAgICAgICAgICAgICAgICAgb25DbGljaz17Zm9yd2FyZE1lc3NhZ2V9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtpMThuKCdmb3J3YXJkTWVzc2FnZScpfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwibW9kdWxlLUZvcndhcmRNZXNzYWdlTW9kYWxfX3NlbmQtYnV0dG9uIG1vZHVsZS1Gb3J3YXJkTWVzc2FnZU1vZGFsX19zZW5kLWJ1dHRvbi0tY29udGludWVcIlxuICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9eyFoYXNDb250YWN0c1NlbGVjdGVkfVxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0SXNFZGl0aW5nTWVzc2FnZSh0cnVlKX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvYW5pbWF0ZWQuZGl2PlxuICAgICAgPC9Nb2RhbEhvc3Q+XG4gICAgPC8+XG4gICk7XG59O1xuXG5mdW5jdGlvbiBzaG91bGROZXZlckJlQ2FsbGVkKC4uLl9hcmdzOiBSZWFkb25seUFycmF5PHVua25vd24+KTogdm9pZCB7XG4gIGFzc2VydChmYWxzZSwgJ1RoaXMgc2hvdWxkIG5ldmVyIGJlIGNhbGxlZC4gRG9pbmcgbm90aGluZycpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBhc3luY1Nob3VsZE5ldmVyQmVDYWxsZWQoXG4gIC4uLl9hcmdzOiBSZWFkb25seUFycmF5PHVua25vd24+XG4pOiBQcm9taXNlPHVuZGVmaW5lZD4ge1xuICBzaG91bGROZXZlckJlQ2FsbGVkKCk7XG5cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFJQSxtQkFNTztBQUVQLDJCQUFvQjtBQUNwQixvQkFBcUI7QUFDckIsaUJBQXlCO0FBRXpCLHdCQUF1QjtBQUN2Qiw0QkFBK0I7QUFFL0Isb0JBQXVCO0FBRXZCLDhCQUFpQztBQUNqQyxnQ0FBbUM7QUFDbkMsNkJBQThDO0FBRTlDLDhCQUEwQztBQUkxQyx5QkFBNEI7QUFJNUIsdUJBQTBCO0FBQzFCLHlCQUE0QjtBQUM1QiwrQkFBa0M7QUFDbEMsb0JBQXVCO0FBQ3ZCLHdDQUFtRDtBQUNuRCx5QkFBNEI7QUFxQzVCLE1BQU0sY0FBYztBQUViLE1BQU0sc0JBQW9ELHdCQUFDO0FBQUEsRUFDaEU7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFB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
