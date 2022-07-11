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
var ChooseGroupMembersModal_exports = {};
__export(ChooseGroupMembersModal_exports, {
  ChooseGroupMembersModal: () => ChooseGroupMembersModal
});
module.exports = __toCommonJS(ChooseGroupMembersModal_exports);
var import_react = __toESM(require("react"));
var import_lodash = require("lodash");
var import_react_measure = __toESM(require("react-measure"));
var import_Username = require("../../../../types/Username");
var import_assert = require("../../../../util/assert");
var import_refMerger = require("../../../../util/refMerger");
var import_useRestoreFocus = require("../../../../hooks/useRestoreFocus");
var import_missingCaseError = require("../../../../util/missingCaseError");
var import_libphonenumberInstance = require("../../../../util/libphonenumberInstance");
var import_filterAndSortConversations = require("../../../../util/filterAndSortConversations");
var import_uuidFetchState = require("../../../../util/uuidFetchState");
var import_ModalHost = require("../../../ModalHost");
var import_ContactPills = require("../../../ContactPills");
var import_ContactPill = require("../../../ContactPill");
var import_ConversationList = require("../../../ConversationList");
var import_ContactCheckbox = require("../../../conversationList/ContactCheckbox");
var import_Button = require("../../../Button");
var import_SearchInput = require("../../../SearchInput");
const ChooseGroupMembersModal = /* @__PURE__ */ __name(({
  regionCode,
  candidateContacts,
  confirmAdds,
  conversationIdsAlreadyInGroup,
  getPreferredBadge,
  i18n,
  maxGroupSize,
  onClose,
  removeSelectedContact,
  searchTerm,
  selectedContacts,
  setSearchTerm,
  theme,
  toggleSelectedContact,
  lookupConversationWithoutUuid,
  showUserNotFoundModal,
  isUsernamesEnabled
}) => {
  const [focusRef] = (0, import_useRestoreFocus.useRestoreFocus)();
  const phoneNumber = (0, import_libphonenumberInstance.parseAndFormatPhoneNumber)(searchTerm, regionCode);
  let isPhoneNumberChecked = false;
  if (phoneNumber) {
    isPhoneNumberChecked = phoneNumber.isValid && selectedContacts.some((contact) => contact.e164 === phoneNumber.e164);
  }
  const isPhoneNumberVisible = phoneNumber && candidateContacts.every((contact) => contact.e164 !== phoneNumber.e164);
  let username;
  let isUsernameChecked = false;
  let isUsernameVisible = false;
  if (!phoneNumber && isUsernamesEnabled) {
    username = (0, import_Username.getUsernameFromSearch)(searchTerm);
    isUsernameChecked = selectedContacts.some((contact) => contact.username === username);
    isUsernameVisible = candidateContacts.every((contact) => contact.username !== username);
  }
  const inputRef = (0, import_react.useRef)(null);
  const numberOfContactsAlreadyInGroup = conversationIdsAlreadyInGroup.size;
  const hasSelectedMaximumNumberOfContacts = selectedContacts.length + numberOfContactsAlreadyInGroup >= maxGroupSize;
  const selectedConversationIdsSet = (0, import_react.useMemo)(() => new Set(selectedContacts.map((contact) => contact.id)), [selectedContacts]);
  const canContinue = Boolean(selectedContacts.length);
  const [filteredContacts, setFilteredContacts] = (0, import_react.useState)((0, import_filterAndSortConversations.filterAndSortConversationsByRecent)(candidateContacts, "", regionCode));
  const normalizedSearchTerm = searchTerm.trim();
  (0, import_react.useEffect)(() => {
    const timeout = setTimeout(() => {
      setFilteredContacts((0, import_filterAndSortConversations.filterAndSortConversationsByRecent)(candidateContacts, normalizedSearchTerm, regionCode));
    }, 200);
    return () => {
      clearTimeout(timeout);
    };
  }, [
    candidateContacts,
    normalizedSearchTerm,
    setFilteredContacts,
    regionCode
  ]);
  const [uuidFetchState, setUuidFetchState] = (0, import_react.useState)({});
  const setIsFetchingUUID = (0, import_react.useCallback)((identifier, isFetching) => {
    setUuidFetchState((prevState) => {
      return isFetching ? {
        ...prevState,
        [identifier]: isFetching
      } : (0, import_lodash.omit)(prevState, identifier);
    });
  }, [setUuidFetchState]);
  let rowCount = 0;
  if (filteredContacts.length) {
    rowCount += filteredContacts.length;
  }
  if (isPhoneNumberVisible || isUsernameVisible) {
    if (filteredContacts.length) {
      rowCount += 1;
    }
    rowCount += 2;
  }
  const getRow = /* @__PURE__ */ __name((index) => {
    let virtualIndex = index;
    if ((isPhoneNumberVisible || isUsernameVisible) && filteredContacts.length) {
      if (virtualIndex === 0) {
        return {
          type: import_ConversationList.RowType.Header,
          i18nKey: "contactsHeader"
        };
      }
      virtualIndex -= 1;
    }
    if (virtualIndex < filteredContacts.length) {
      const contact = filteredContacts[virtualIndex];
      const isSelected = selectedConversationIdsSet.has(contact.id);
      const isAlreadyInGroup = conversationIdsAlreadyInGroup.has(contact.id);
      let disabledReason;
      if (isAlreadyInGroup) {
        disabledReason = import_ContactCheckbox.ContactCheckboxDisabledReason.AlreadyAdded;
      } else if (hasSelectedMaximumNumberOfContacts && !isSelected) {
        disabledReason = import_ContactCheckbox.ContactCheckboxDisabledReason.MaximumContactsSelected;
      }
      return {
        type: import_ConversationList.RowType.ContactCheckbox,
        contact,
        isChecked: isSelected || isAlreadyInGroup,
        disabledReason
      };
    }
    virtualIndex -= filteredContacts.length;
    if (isPhoneNumberVisible) {
      if (virtualIndex === 0) {
        return {
          type: import_ConversationList.RowType.Header,
          i18nKey: "findByPhoneNumberHeader"
        };
      }
      if (virtualIndex === 1) {
        return {
          type: import_ConversationList.RowType.PhoneNumberCheckbox,
          isChecked: isPhoneNumberChecked,
          isFetching: (0, import_uuidFetchState.isFetchingByE164)(uuidFetchState, phoneNumber.e164),
          phoneNumber
        };
      }
      virtualIndex -= 2;
    }
    if (username) {
      if (virtualIndex === 0) {
        return {
          type: import_ConversationList.RowType.Header,
          i18nKey: "findByUsernameHeader"
        };
      }
      if (virtualIndex === 1) {
        return {
          type: import_ConversationList.RowType.UsernameCheckbox,
          isChecked: isUsernameChecked,
          isFetching: (0, import_uuidFetchState.isFetchingByUsername)(uuidFetchState, username),
          username
        };
      }
      virtualIndex -= 2;
    }
    return void 0;
  }, "getRow");
  return /* @__PURE__ */ import_react.default.createElement(import_ModalHost.ModalHost, {
    onClose
  }, /* @__PURE__ */ import_react.default.createElement("div", {
    className: "module-AddGroupMembersModal module-AddGroupMembersModal--choose-members"
  }, /* @__PURE__ */ import_react.default.createElement("button", {
    "aria-label": i18n("close"),
    className: "module-AddGroupMembersModal__close-button",
    type: "button",
    onClick: () => {
      onClose();
    }
  }), /* @__PURE__ */ import_react.default.createElement("h1", {
    className: "module-AddGroupMembersModal__header"
  }, i18n("AddGroupMembersModal--title")), /* @__PURE__ */ import_react.default.createElement(import_SearchInput.SearchInput, {
    i18n,
    placeholder: i18n("contactSearchPlaceholder"),
    onChange: (event) => {
      setSearchTerm(event.target.value);
    },
    onKeyDown: (event) => {
      if (canContinue && event.key === "Enter") {
        confirmAdds();
      }
    },
    ref: (0, import_refMerger.refMerger)(inputRef, focusRef),
    value: searchTerm
  }), Boolean(selectedContacts.length) && /* @__PURE__ */ import_react.default.createElement(import_ContactPills.ContactPills, null, selectedContacts.map((contact) => /* @__PURE__ */ import_react.default.createElement(import_ContactPill.ContactPill, {
    key: contact.id,
    acceptedMessageRequest: contact.acceptedMessageRequest,
    avatarPath: contact.avatarPath,
    color: contact.color,
    firstName: contact.firstName,
    i18n,
    isMe: contact.isMe,
    id: contact.id,
    name: contact.name,
    phoneNumber: contact.phoneNumber,
    profileName: contact.profileName,
    sharedGroupNames: contact.sharedGroupNames,
    title: contact.title,
    onClickRemove: () => {
      removeSelectedContact(contact.id);
    }
  }))), rowCount ? /* @__PURE__ */ import_react.default.createElement(import_react_measure.default, {
    bounds: true
  }, ({ contentRect, measureRef }) => {
    return /* @__PURE__ */ import_react.default.createElement("div", {
      className: "module-AddGroupMembersModal__list-wrapper",
      ref: measureRef,
      onKeyDown: (event) => {
        if (event.key === "Enter") {
          inputRef.current?.focus();
        }
      }
    }, /* @__PURE__ */ import_react.default.createElement(import_ConversationList.ConversationList, {
      dimensions: contentRect.bounds,
      getPreferredBadge,
      getRow,
      i18n,
      onClickArchiveButton: shouldNeverBeCalled,
      onClickContactCheckbox: (conversationId, disabledReason) => {
        switch (disabledReason) {
          case void 0:
            toggleSelectedContact(conversationId);
            break;
          case import_ContactCheckbox.ContactCheckboxDisabledReason.AlreadyAdded:
          case import_ContactCheckbox.ContactCheckboxDisabledReason.MaximumContactsSelected:
            break;
          default:
            throw (0, import_missingCaseError.missingCaseError)(disabledReason);
        }
      },
      lookupConversationWithoutUuid,
      showUserNotFoundModal,
      setIsFetchingUUID,
      showConversation: shouldNeverBeCalled,
      onSelectConversation: shouldNeverBeCalled,
      renderMessageSearchResult: () => {
        shouldNeverBeCalled();
        return /* @__PURE__ */ import_react.default.createElement("div", null);
      },
      rowCount,
      shouldRecomputeRowHeights: false,
      showChooseGroupMembers: shouldNeverBeCalled,
      theme
    }));
  }) : /* @__PURE__ */ import_react.default.createElement("div", {
    className: "module-AddGroupMembersModal__no-candidate-contacts"
  }, i18n("noContactsFound")), /* @__PURE__ */ import_react.default.createElement("div", {
    className: "module-AddGroupMembersModal__button-container"
  }, /* @__PURE__ */ import_react.default.createElement(import_Button.Button, {
    onClick: onClose,
    variant: import_Button.ButtonVariant.Secondary
  }, i18n("cancel")), /* @__PURE__ */ import_react.default.createElement(import_Button.Button, {
    disabled: !canContinue,
    onClick: confirmAdds
  }, i18n("AddGroupMembersModal--continue-to-confirm")))));
}, "ChooseGroupMembersModal");
function shouldNeverBeCalled(..._args) {
  (0, import_assert.assert)(false, "This should never be called. Doing nothing");
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ChooseGroupMembersModal
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ2hvb3NlR3JvdXBNZW1iZXJzTW9kYWwudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMS0yMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHR5cGUgeyBGdW5jdGlvbkNvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdCwge1xuICB1c2VFZmZlY3QsXG4gIHVzZU1lbW8sXG4gIHVzZVN0YXRlLFxuICB1c2VSZWYsXG4gIHVzZUNhbGxiYWNrLFxufSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBvbWl0IH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB0eXBlIHsgTWVhc3VyZWRDb21wb25lbnRQcm9wcyB9IGZyb20gJ3JlYWN0LW1lYXN1cmUnO1xuaW1wb3J0IE1lYXN1cmUgZnJvbSAncmVhY3QtbWVhc3VyZSc7XG5cbmltcG9ydCB0eXBlIHsgTG9jYWxpemVyVHlwZSwgVGhlbWVUeXBlIH0gZnJvbSAnLi4vLi4vLi4vLi4vdHlwZXMvVXRpbCc7XG5pbXBvcnQgeyBnZXRVc2VybmFtZUZyb21TZWFyY2ggfSBmcm9tICcuLi8uLi8uLi8uLi90eXBlcy9Vc2VybmFtZSc7XG5pbXBvcnQgeyBhc3NlcnQgfSBmcm9tICcuLi8uLi8uLi8uLi91dGlsL2Fzc2VydCc7XG5pbXBvcnQgeyByZWZNZXJnZXIgfSBmcm9tICcuLi8uLi8uLi8uLi91dGlsL3JlZk1lcmdlcic7XG5pbXBvcnQgeyB1c2VSZXN0b3JlRm9jdXMgfSBmcm9tICcuLi8uLi8uLi8uLi9ob29rcy91c2VSZXN0b3JlRm9jdXMnO1xuaW1wb3J0IHsgbWlzc2luZ0Nhc2VFcnJvciB9IGZyb20gJy4uLy4uLy4uLy4uL3V0aWwvbWlzc2luZ0Nhc2VFcnJvcic7XG5pbXBvcnQgdHlwZSB7IExvb2t1cENvbnZlcnNhdGlvbldpdGhvdXRVdWlkQWN0aW9uc1R5cGUgfSBmcm9tICcuLi8uLi8uLi8uLi91dGlsL2xvb2t1cENvbnZlcnNhdGlvbldpdGhvdXRVdWlkJztcbmltcG9ydCB7IHBhcnNlQW5kRm9ybWF0UGhvbmVOdW1iZXIgfSBmcm9tICcuLi8uLi8uLi8uLi91dGlsL2xpYnBob25lbnVtYmVySW5zdGFuY2UnO1xuaW1wb3J0IHsgZmlsdGVyQW5kU29ydENvbnZlcnNhdGlvbnNCeVJlY2VudCB9IGZyb20gJy4uLy4uLy4uLy4uL3V0aWwvZmlsdGVyQW5kU29ydENvbnZlcnNhdGlvbnMnO1xuaW1wb3J0IHR5cGUgeyBDb252ZXJzYXRpb25UeXBlIH0gZnJvbSAnLi4vLi4vLi4vLi4vc3RhdGUvZHVja3MvY29udmVyc2F0aW9ucyc7XG5pbXBvcnQgdHlwZSB7IFByZWZlcnJlZEJhZGdlU2VsZWN0b3JUeXBlIH0gZnJvbSAnLi4vLi4vLi4vLi4vc3RhdGUvc2VsZWN0b3JzL2JhZGdlcyc7XG5pbXBvcnQgdHlwZSB7XG4gIFVVSURGZXRjaFN0YXRlS2V5VHlwZSxcbiAgVVVJREZldGNoU3RhdGVUeXBlLFxufSBmcm9tICcuLi8uLi8uLi8uLi91dGlsL3V1aWRGZXRjaFN0YXRlJztcbmltcG9ydCB7XG4gIGlzRmV0Y2hpbmdCeUUxNjQsXG4gIGlzRmV0Y2hpbmdCeVVzZXJuYW1lLFxufSBmcm9tICcuLi8uLi8uLi8uLi91dGlsL3V1aWRGZXRjaFN0YXRlJztcbmltcG9ydCB7IE1vZGFsSG9zdCB9IGZyb20gJy4uLy4uLy4uL01vZGFsSG9zdCc7XG5pbXBvcnQgeyBDb250YWN0UGlsbHMgfSBmcm9tICcuLi8uLi8uLi9Db250YWN0UGlsbHMnO1xuaW1wb3J0IHsgQ29udGFjdFBpbGwgfSBmcm9tICcuLi8uLi8uLi9Db250YWN0UGlsbCc7XG5pbXBvcnQgdHlwZSB7IFJvdyB9IGZyb20gJy4uLy4uLy4uL0NvbnZlcnNhdGlvbkxpc3QnO1xuaW1wb3J0IHsgQ29udmVyc2F0aW9uTGlzdCwgUm93VHlwZSB9IGZyb20gJy4uLy4uLy4uL0NvbnZlcnNhdGlvbkxpc3QnO1xuaW1wb3J0IHsgQ29udGFjdENoZWNrYm94RGlzYWJsZWRSZWFzb24gfSBmcm9tICcuLi8uLi8uLi9jb252ZXJzYXRpb25MaXN0L0NvbnRhY3RDaGVja2JveCc7XG5pbXBvcnQgeyBCdXR0b24sIEJ1dHRvblZhcmlhbnQgfSBmcm9tICcuLi8uLi8uLi9CdXR0b24nO1xuaW1wb3J0IHsgU2VhcmNoSW5wdXQgfSBmcm9tICcuLi8uLi8uLi9TZWFyY2hJbnB1dCc7XG5cbmV4cG9ydCB0eXBlIFN0YXRlUHJvcHNUeXBlID0ge1xuICByZWdpb25Db2RlOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gIGNhbmRpZGF0ZUNvbnRhY3RzOiBSZWFkb25seUFycmF5PENvbnZlcnNhdGlvblR5cGU+O1xuICBjb252ZXJzYXRpb25JZHNBbHJlYWR5SW5Hcm91cDogU2V0PHN0cmluZz47XG4gIGdldFByZWZlcnJlZEJhZGdlOiBQcmVmZXJyZWRCYWRnZVNlbGVjdG9yVHlwZTtcbiAgaTE4bjogTG9jYWxpemVyVHlwZTtcbiAgdGhlbWU6IFRoZW1lVHlwZTtcbiAgbWF4R3JvdXBTaXplOiBudW1iZXI7XG4gIHNlYXJjaFRlcm06IHN0cmluZztcbiAgc2VsZWN0ZWRDb250YWN0czogUmVhZG9ubHlBcnJheTxDb252ZXJzYXRpb25UeXBlPjtcblxuICBjb25maXJtQWRkczogKCkgPT4gdm9pZDtcbiAgb25DbG9zZTogKCkgPT4gdm9pZDtcbiAgcmVtb3ZlU2VsZWN0ZWRDb250YWN0OiAoXzogc3RyaW5nKSA9PiB2b2lkO1xuICBzZXRTZWFyY2hUZXJtOiAoXzogc3RyaW5nKSA9PiB2b2lkO1xuICB0b2dnbGVTZWxlY3RlZENvbnRhY3Q6IChjb252ZXJzYXRpb25JZDogc3RyaW5nKSA9PiB2b2lkO1xuICBpc1VzZXJuYW1lc0VuYWJsZWQ6IGJvb2xlYW47XG59ICYgUGljazxcbiAgTG9va3VwQ29udmVyc2F0aW9uV2l0aG91dFV1aWRBY3Rpb25zVHlwZSxcbiAgJ2xvb2t1cENvbnZlcnNhdGlvbldpdGhvdXRVdWlkJ1xuPjtcblxudHlwZSBBY3Rpb25Qcm9wc1R5cGUgPSBPbWl0PFxuICBMb29rdXBDb252ZXJzYXRpb25XaXRob3V0VXVpZEFjdGlvbnNUeXBlLFxuICAnc2V0SXNGZXRjaGluZ1VVSUQnIHwgJ2xvb2t1cENvbnZlcnNhdGlvbldpdGhvdXRVdWlkJ1xuPjtcblxudHlwZSBQcm9wc1R5cGUgPSBTdGF0ZVByb3BzVHlwZSAmIEFjdGlvblByb3BzVHlwZTtcblxuLy8gVE9ETzogVGhpcyBzaG91bGQgdXNlIDxNb2RhbD4uIFNlZSBERVNLVE9QLTEwMzguXG5leHBvcnQgY29uc3QgQ2hvb3NlR3JvdXBNZW1iZXJzTW9kYWw6IEZ1bmN0aW9uQ29tcG9uZW50PFByb3BzVHlwZT4gPSAoe1xuICByZWdpb25Db2RlLFxuICBjYW5kaWRhdGVDb250YWN0cyxcbiAgY29uZmlybUFkZHMsXG4gIGNvbnZlcnNhdGlvbklkc0FscmVhZHlJbkdyb3VwLFxuICBnZXRQcmVmZXJyZWRCYWRnZSxcbiAgaTE4bixcbiAgbWF4R3JvdXBTaXplLFxuICBvbkNsb3NlLFxuICByZW1vdmVTZWxlY3RlZENvbnRhY3QsXG4gIHNlYXJjaFRlcm0sXG4gIHNlbGVjdGVkQ29udGFjdHMsXG4gIHNldFNlYXJjaFRlcm0sXG4gIHRoZW1lLFxuICB0b2dnbGVTZWxlY3RlZENvbnRhY3QsXG4gIGxvb2t1cENvbnZlcnNhdGlvbldpdGhvdXRVdWlkLFxuICBzaG93VXNlck5vdEZvdW5kTW9kYWwsXG4gIGlzVXNlcm5hbWVzRW5hYmxlZCxcbn0pID0+IHtcbiAgY29uc3QgW2ZvY3VzUmVmXSA9IHVzZVJlc3RvcmVGb2N1cygpO1xuXG4gIGNvbnN0IHBob25lTnVtYmVyID0gcGFyc2VBbmRGb3JtYXRQaG9uZU51bWJlcihzZWFyY2hUZXJtLCByZWdpb25Db2RlKTtcblxuICBsZXQgaXNQaG9uZU51bWJlckNoZWNrZWQgPSBmYWxzZTtcbiAgaWYgKHBob25lTnVtYmVyKSB7XG4gICAgaXNQaG9uZU51bWJlckNoZWNrZWQgPVxuICAgICAgcGhvbmVOdW1iZXIuaXNWYWxpZCAmJlxuICAgICAgc2VsZWN0ZWRDb250YWN0cy5zb21lKGNvbnRhY3QgPT4gY29udGFjdC5lMTY0ID09PSBwaG9uZU51bWJlci5lMTY0KTtcbiAgfVxuXG4gIGNvbnN0IGlzUGhvbmVOdW1iZXJWaXNpYmxlID1cbiAgICBwaG9uZU51bWJlciAmJlxuICAgIGNhbmRpZGF0ZUNvbnRhY3RzLmV2ZXJ5KGNvbnRhY3QgPT4gY29udGFjdC5lMTY0ICE9PSBwaG9uZU51bWJlci5lMTY0KTtcblxuICBsZXQgdXNlcm5hbWU6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgbGV0IGlzVXNlcm5hbWVDaGVja2VkID0gZmFsc2U7XG4gIGxldCBpc1VzZXJuYW1lVmlzaWJsZSA9IGZhbHNlO1xuICBpZiAoIXBob25lTnVtYmVyICYmIGlzVXNlcm5hbWVzRW5hYmxlZCkge1xuICAgIHVzZXJuYW1lID0gZ2V0VXNlcm5hbWVGcm9tU2VhcmNoKHNlYXJjaFRlcm0pO1xuXG4gICAgaXNVc2VybmFtZUNoZWNrZWQgPSBzZWxlY3RlZENvbnRhY3RzLnNvbWUoXG4gICAgICBjb250YWN0ID0+IGNvbnRhY3QudXNlcm5hbWUgPT09IHVzZXJuYW1lXG4gICAgKTtcblxuICAgIGlzVXNlcm5hbWVWaXNpYmxlID0gY2FuZGlkYXRlQ29udGFjdHMuZXZlcnkoXG4gICAgICBjb250YWN0ID0+IGNvbnRhY3QudXNlcm5hbWUgIT09IHVzZXJuYW1lXG4gICAgKTtcbiAgfVxuXG4gIGNvbnN0IGlucHV0UmVmID0gdXNlUmVmPG51bGwgfCBIVE1MSW5wdXRFbGVtZW50PihudWxsKTtcblxuICBjb25zdCBudW1iZXJPZkNvbnRhY3RzQWxyZWFkeUluR3JvdXAgPSBjb252ZXJzYXRpb25JZHNBbHJlYWR5SW5Hcm91cC5zaXplO1xuXG4gIGNvbnN0IGhhc1NlbGVjdGVkTWF4aW11bU51bWJlck9mQ29udGFjdHMgPVxuICAgIHNlbGVjdGVkQ29udGFjdHMubGVuZ3RoICsgbnVtYmVyT2ZDb250YWN0c0FscmVhZHlJbkdyb3VwID49IG1heEdyb3VwU2l6ZTtcblxuICBjb25zdCBzZWxlY3RlZENvbnZlcnNhdGlvbklkc1NldDogU2V0PHN0cmluZz4gPSB1c2VNZW1vKFxuICAgICgpID0+IG5ldyBTZXQoc2VsZWN0ZWRDb250YWN0cy5tYXAoY29udGFjdCA9PiBjb250YWN0LmlkKSksXG4gICAgW3NlbGVjdGVkQ29udGFjdHNdXG4gICk7XG5cbiAgY29uc3QgY2FuQ29udGludWUgPSBCb29sZWFuKHNlbGVjdGVkQ29udGFjdHMubGVuZ3RoKTtcblxuICBjb25zdCBbZmlsdGVyZWRDb250YWN0cywgc2V0RmlsdGVyZWRDb250YWN0c10gPSB1c2VTdGF0ZShcbiAgICBmaWx0ZXJBbmRTb3J0Q29udmVyc2F0aW9uc0J5UmVjZW50KGNhbmRpZGF0ZUNvbnRhY3RzLCAnJywgcmVnaW9uQ29kZSlcbiAgKTtcbiAgY29uc3Qgbm9ybWFsaXplZFNlYXJjaFRlcm0gPSBzZWFyY2hUZXJtLnRyaW0oKTtcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCB0aW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBzZXRGaWx0ZXJlZENvbnRhY3RzKFxuICAgICAgICBmaWx0ZXJBbmRTb3J0Q29udmVyc2F0aW9uc0J5UmVjZW50KFxuICAgICAgICAgIGNhbmRpZGF0ZUNvbnRhY3RzLFxuICAgICAgICAgIG5vcm1hbGl6ZWRTZWFyY2hUZXJtLFxuICAgICAgICAgIHJlZ2lvbkNvZGVcbiAgICAgICAgKVxuICAgICAgKTtcbiAgICB9LCAyMDApO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgfTtcbiAgfSwgW1xuICAgIGNhbmRpZGF0ZUNvbnRhY3RzLFxuICAgIG5vcm1hbGl6ZWRTZWFyY2hUZXJtLFxuICAgIHNldEZpbHRlcmVkQ29udGFjdHMsXG4gICAgcmVnaW9uQ29kZSxcbiAgXSk7XG5cbiAgY29uc3QgW3V1aWRGZXRjaFN0YXRlLCBzZXRVdWlkRmV0Y2hTdGF0ZV0gPSB1c2VTdGF0ZTxVVUlERmV0Y2hTdGF0ZVR5cGU+KHt9KTtcblxuICBjb25zdCBzZXRJc0ZldGNoaW5nVVVJRCA9IHVzZUNhbGxiYWNrKFxuICAgIChpZGVudGlmaWVyOiBVVUlERmV0Y2hTdGF0ZUtleVR5cGUsIGlzRmV0Y2hpbmc6IGJvb2xlYW4pID0+IHtcbiAgICAgIHNldFV1aWRGZXRjaFN0YXRlKHByZXZTdGF0ZSA9PiB7XG4gICAgICAgIHJldHVybiBpc0ZldGNoaW5nXG4gICAgICAgICAgPyB7XG4gICAgICAgICAgICAgIC4uLnByZXZTdGF0ZSxcbiAgICAgICAgICAgICAgW2lkZW50aWZpZXJdOiBpc0ZldGNoaW5nLFxuICAgICAgICAgICAgfVxuICAgICAgICAgIDogb21pdChwcmV2U3RhdGUsIGlkZW50aWZpZXIpO1xuICAgICAgfSk7XG4gICAgfSxcbiAgICBbc2V0VXVpZEZldGNoU3RhdGVdXG4gICk7XG5cbiAgbGV0IHJvd0NvdW50ID0gMDtcbiAgaWYgKGZpbHRlcmVkQ29udGFjdHMubGVuZ3RoKSB7XG4gICAgcm93Q291bnQgKz0gZmlsdGVyZWRDb250YWN0cy5sZW5ndGg7XG4gIH1cbiAgaWYgKGlzUGhvbmVOdW1iZXJWaXNpYmxlIHx8IGlzVXNlcm5hbWVWaXNpYmxlKSB7XG4gICAgLy8gXCJDb250YWN0c1wiIGhlYWRlclxuICAgIGlmIChmaWx0ZXJlZENvbnRhY3RzLmxlbmd0aCkge1xuICAgICAgcm93Q291bnQgKz0gMTtcbiAgICB9XG5cbiAgICAvLyBcIkZpbmQgYnkgcGhvbmUgbnVtYmVyXCIgKyBwaG9uZSBudW1iZXJcbiAgICAvLyBvclxuICAgIC8vIFwiRmluZCBieSB1c2VybmFtZVwiICsgdXNlcm5hbWVcbiAgICByb3dDb3VudCArPSAyO1xuICB9XG4gIGNvbnN0IGdldFJvdyA9IChpbmRleDogbnVtYmVyKTogdW5kZWZpbmVkIHwgUm93ID0+IHtcbiAgICBsZXQgdmlydHVhbEluZGV4ID0gaW5kZXg7XG5cbiAgICBpZiAoXG4gICAgICAoaXNQaG9uZU51bWJlclZpc2libGUgfHwgaXNVc2VybmFtZVZpc2libGUpICYmXG4gICAgICBmaWx0ZXJlZENvbnRhY3RzLmxlbmd0aFxuICAgICkge1xuICAgICAgaWYgKHZpcnR1YWxJbmRleCA9PT0gMCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHR5cGU6IFJvd1R5cGUuSGVhZGVyLFxuICAgICAgICAgIGkxOG5LZXk6ICdjb250YWN0c0hlYWRlcicsXG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIHZpcnR1YWxJbmRleCAtPSAxO1xuICAgIH1cblxuICAgIGlmICh2aXJ0dWFsSW5kZXggPCBmaWx0ZXJlZENvbnRhY3RzLmxlbmd0aCkge1xuICAgICAgY29uc3QgY29udGFjdCA9IGZpbHRlcmVkQ29udGFjdHNbdmlydHVhbEluZGV4XTtcblxuICAgICAgY29uc3QgaXNTZWxlY3RlZCA9IHNlbGVjdGVkQ29udmVyc2F0aW9uSWRzU2V0Lmhhcyhjb250YWN0LmlkKTtcbiAgICAgIGNvbnN0IGlzQWxyZWFkeUluR3JvdXAgPSBjb252ZXJzYXRpb25JZHNBbHJlYWR5SW5Hcm91cC5oYXMoY29udGFjdC5pZCk7XG5cbiAgICAgIGxldCBkaXNhYmxlZFJlYXNvbjogdW5kZWZpbmVkIHwgQ29udGFjdENoZWNrYm94RGlzYWJsZWRSZWFzb247XG4gICAgICBpZiAoaXNBbHJlYWR5SW5Hcm91cCkge1xuICAgICAgICBkaXNhYmxlZFJlYXNvbiA9IENvbnRhY3RDaGVja2JveERpc2FibGVkUmVhc29uLkFscmVhZHlBZGRlZDtcbiAgICAgIH0gZWxzZSBpZiAoaGFzU2VsZWN0ZWRNYXhpbXVtTnVtYmVyT2ZDb250YWN0cyAmJiAhaXNTZWxlY3RlZCkge1xuICAgICAgICBkaXNhYmxlZFJlYXNvbiA9IENvbnRhY3RDaGVja2JveERpc2FibGVkUmVhc29uLk1heGltdW1Db250YWN0c1NlbGVjdGVkO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBSb3dUeXBlLkNvbnRhY3RDaGVja2JveCxcbiAgICAgICAgY29udGFjdCxcbiAgICAgICAgaXNDaGVja2VkOiBpc1NlbGVjdGVkIHx8IGlzQWxyZWFkeUluR3JvdXAsXG4gICAgICAgIGRpc2FibGVkUmVhc29uLFxuICAgICAgfTtcbiAgICB9XG5cbiAgICB2aXJ0dWFsSW5kZXggLT0gZmlsdGVyZWRDb250YWN0cy5sZW5ndGg7XG5cbiAgICBpZiAoaXNQaG9uZU51bWJlclZpc2libGUpIHtcbiAgICAgIGlmICh2aXJ0dWFsSW5kZXggPT09IDApIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB0eXBlOiBSb3dUeXBlLkhlYWRlcixcbiAgICAgICAgICBpMThuS2V5OiAnZmluZEJ5UGhvbmVOdW1iZXJIZWFkZXInLFxuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgaWYgKHZpcnR1YWxJbmRleCA9PT0gMSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHR5cGU6IFJvd1R5cGUuUGhvbmVOdW1iZXJDaGVja2JveCxcbiAgICAgICAgICBpc0NoZWNrZWQ6IGlzUGhvbmVOdW1iZXJDaGVja2VkLFxuICAgICAgICAgIGlzRmV0Y2hpbmc6IGlzRmV0Y2hpbmdCeUUxNjQodXVpZEZldGNoU3RhdGUsIHBob25lTnVtYmVyLmUxNjQpLFxuICAgICAgICAgIHBob25lTnVtYmVyLFxuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgdmlydHVhbEluZGV4IC09IDI7XG4gICAgfVxuXG4gICAgaWYgKHVzZXJuYW1lKSB7XG4gICAgICBpZiAodmlydHVhbEluZGV4ID09PSAwKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgdHlwZTogUm93VHlwZS5IZWFkZXIsXG4gICAgICAgICAgaTE4bktleTogJ2ZpbmRCeVVzZXJuYW1lSGVhZGVyJyxcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIGlmICh2aXJ0dWFsSW5kZXggPT09IDEpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB0eXBlOiBSb3dUeXBlLlVzZXJuYW1lQ2hlY2tib3gsXG4gICAgICAgICAgaXNDaGVja2VkOiBpc1VzZXJuYW1lQ2hlY2tlZCxcbiAgICAgICAgICBpc0ZldGNoaW5nOiBpc0ZldGNoaW5nQnlVc2VybmFtZSh1dWlkRmV0Y2hTdGF0ZSwgdXNlcm5hbWUpLFxuICAgICAgICAgIHVzZXJuYW1lLFxuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgdmlydHVhbEluZGV4IC09IDI7XG4gICAgfVxuXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxNb2RhbEhvc3Qgb25DbG9zZT17b25DbG9zZX0+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZHVsZS1BZGRHcm91cE1lbWJlcnNNb2RhbCBtb2R1bGUtQWRkR3JvdXBNZW1iZXJzTW9kYWwtLWNob29zZS1tZW1iZXJzXCI+XG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICBhcmlhLWxhYmVsPXtpMThuKCdjbG9zZScpfVxuICAgICAgICAgIGNsYXNzTmFtZT1cIm1vZHVsZS1BZGRHcm91cE1lbWJlcnNNb2RhbF9fY2xvc2UtYnV0dG9uXCJcbiAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICBvbkNsb3NlKCk7XG4gICAgICAgICAgfX1cbiAgICAgICAgLz5cbiAgICAgICAgPGgxIGNsYXNzTmFtZT1cIm1vZHVsZS1BZGRHcm91cE1lbWJlcnNNb2RhbF9faGVhZGVyXCI+XG4gICAgICAgICAge2kxOG4oJ0FkZEdyb3VwTWVtYmVyc01vZGFsLS10aXRsZScpfVxuICAgICAgICA8L2gxPlxuICAgICAgICA8U2VhcmNoSW5wdXRcbiAgICAgICAgICBpMThuPXtpMThufVxuICAgICAgICAgIHBsYWNlaG9sZGVyPXtpMThuKCdjb250YWN0U2VhcmNoUGxhY2Vob2xkZXInKX1cbiAgICAgICAgICBvbkNoYW5nZT17ZXZlbnQgPT4ge1xuICAgICAgICAgICAgc2V0U2VhcmNoVGVybShldmVudC50YXJnZXQudmFsdWUpO1xuICAgICAgICAgIH19XG4gICAgICAgICAgb25LZXlEb3duPXtldmVudCA9PiB7XG4gICAgICAgICAgICBpZiAoY2FuQ29udGludWUgJiYgZXZlbnQua2V5ID09PSAnRW50ZXInKSB7XG4gICAgICAgICAgICAgIGNvbmZpcm1BZGRzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfX1cbiAgICAgICAgICByZWY9e3JlZk1lcmdlcjxIVE1MSW5wdXRFbGVtZW50PihpbnB1dFJlZiwgZm9jdXNSZWYpfVxuICAgICAgICAgIHZhbHVlPXtzZWFyY2hUZXJtfVxuICAgICAgICAvPlxuICAgICAgICB7Qm9vbGVhbihzZWxlY3RlZENvbnRhY3RzLmxlbmd0aCkgJiYgKFxuICAgICAgICAgIDxDb250YWN0UGlsbHM+XG4gICAgICAgICAgICB7c2VsZWN0ZWRDb250YWN0cy5tYXAoY29udGFjdCA9PiAoXG4gICAgICAgICAgICAgIDxDb250YWN0UGlsbFxuICAgICAgICAgICAgICAgIGtleT17Y29udGFjdC5pZH1cbiAgICAgICAgICAgICAgICBhY2NlcHRlZE1lc3NhZ2VSZXF1ZXN0PXtjb250YWN0LmFjY2VwdGVkTWVzc2FnZVJlcXVlc3R9XG4gICAgICAgICAgICAgICAgYXZhdGFyUGF0aD17Y29udGFjdC5hdmF0YXJQYXRofVxuICAgICAgICAgICAgICAgIGNvbG9yPXtjb250YWN0LmNvbG9yfVxuICAgICAgICAgICAgICAgIGZpcnN0TmFtZT17Y29udGFjdC5maXJzdE5hbWV9XG4gICAgICAgICAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgICAgICAgICBpc01lPXtjb250YWN0LmlzTWV9XG4gICAgICAgICAgICAgICAgaWQ9e2NvbnRhY3QuaWR9XG4gICAgICAgICAgICAgICAgbmFtZT17Y29udGFjdC5uYW1lfVxuICAgICAgICAgICAgICAgIHBob25lTnVtYmVyPXtjb250YWN0LnBob25lTnVtYmVyfVxuICAgICAgICAgICAgICAgIHByb2ZpbGVOYW1lPXtjb250YWN0LnByb2ZpbGVOYW1lfVxuICAgICAgICAgICAgICAgIHNoYXJlZEdyb3VwTmFtZXM9e2NvbnRhY3Quc2hhcmVkR3JvdXBOYW1lc31cbiAgICAgICAgICAgICAgICB0aXRsZT17Y29udGFjdC50aXRsZX1cbiAgICAgICAgICAgICAgICBvbkNsaWNrUmVtb3ZlPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICByZW1vdmVTZWxlY3RlZENvbnRhY3QoY29udGFjdC5pZCk7XG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICkpfVxuICAgICAgICAgIDwvQ29udGFjdFBpbGxzPlxuICAgICAgICApfVxuICAgICAgICB7cm93Q291bnQgPyAoXG4gICAgICAgICAgPE1lYXN1cmUgYm91bmRzPlxuICAgICAgICAgICAgeyh7IGNvbnRlbnRSZWN0LCBtZWFzdXJlUmVmIH06IE1lYXN1cmVkQ29tcG9uZW50UHJvcHMpID0+IHtcbiAgICAgICAgICAgICAgLy8gV2UgZGlzYWJsZSB0aGlzIEVTTGludCBydWxlIGJlY2F1c2Ugd2UncmUgY2FwdHVyaW5nIGEgYnViYmxlZCBrZXlkb3duXG4gICAgICAgICAgICAgIC8vICAgZXZlbnQuIFNlZSBbdGhpcyBub3RlIGluIHRoZSBqc3gtYTExeSBkb2NzXVswXS5cbiAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgLy8gWzBdOiBodHRwczovL2dpdGh1Yi5jb20vanN4LWVzbGludC9lc2xpbnQtcGx1Z2luLWpzeC1hMTF5L2Jsb2IvYzI3NTk2NGY1MmMzNTc3NTIwOGJkMDBjYjYxMmM2ZjgyZTQyZTM0Zi9kb2NzL3J1bGVzL25vLXN0YXRpYy1lbGVtZW50LWludGVyYWN0aW9ucy5tZCNjYXNlLXRoZS1ldmVudC1oYW5kbGVyLWlzLW9ubHktYmVpbmctdXNlZC10by1jYXB0dXJlLWJ1YmJsZWQtZXZlbnRzXG4gICAgICAgICAgICAgIC8qIGVzbGludC1kaXNhYmxlIGpzeC1hMTF5L25vLXN0YXRpYy1lbGVtZW50LWludGVyYWN0aW9ucyAqL1xuICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cIm1vZHVsZS1BZGRHcm91cE1lbWJlcnNNb2RhbF9fbGlzdC13cmFwcGVyXCJcbiAgICAgICAgICAgICAgICAgIHJlZj17bWVhc3VyZVJlZn1cbiAgICAgICAgICAgICAgICAgIG9uS2V5RG93bj17ZXZlbnQgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXZlbnQua2V5ID09PSAnRW50ZXInKSB7XG4gICAgICAgICAgICAgICAgICAgICAgaW5wdXRSZWYuY3VycmVudD8uZm9jdXMoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICA8Q29udmVyc2F0aW9uTGlzdFxuICAgICAgICAgICAgICAgICAgICBkaW1lbnNpb25zPXtjb250ZW50UmVjdC5ib3VuZHN9XG4gICAgICAgICAgICAgICAgICAgIGdldFByZWZlcnJlZEJhZGdlPXtnZXRQcmVmZXJyZWRCYWRnZX1cbiAgICAgICAgICAgICAgICAgICAgZ2V0Um93PXtnZXRSb3d9XG4gICAgICAgICAgICAgICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2tBcmNoaXZlQnV0dG9uPXtzaG91bGROZXZlckJlQ2FsbGVkfVxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrQ29udGFjdENoZWNrYm94PXsoXG4gICAgICAgICAgICAgICAgICAgICAgY29udmVyc2F0aW9uSWQ6IHN0cmluZyxcbiAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZFJlYXNvbjogdW5kZWZpbmVkIHwgQ29udGFjdENoZWNrYm94RGlzYWJsZWRSZWFzb25cbiAgICAgICAgICAgICAgICAgICAgKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChkaXNhYmxlZFJlYXNvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSB1bmRlZmluZWQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRvZ2dsZVNlbGVjdGVkQ29udGFjdChjb252ZXJzYXRpb25JZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBDb250YWN0Q2hlY2tib3hEaXNhYmxlZFJlYXNvbi5BbHJlYWR5QWRkZWQ6XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIENvbnRhY3RDaGVja2JveERpc2FibGVkUmVhc29uLk1heGltdW1Db250YWN0c1NlbGVjdGVkOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUaGVzZSBhcmUgbm8tb3BzLlxuICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG1pc3NpbmdDYXNlRXJyb3IoZGlzYWJsZWRSZWFzb24pO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgbG9va3VwQ29udmVyc2F0aW9uV2l0aG91dFV1aWQ9e1xuICAgICAgICAgICAgICAgICAgICAgIGxvb2t1cENvbnZlcnNhdGlvbldpdGhvdXRVdWlkXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgc2hvd1VzZXJOb3RGb3VuZE1vZGFsPXtzaG93VXNlck5vdEZvdW5kTW9kYWx9XG4gICAgICAgICAgICAgICAgICAgIHNldElzRmV0Y2hpbmdVVUlEPXtzZXRJc0ZldGNoaW5nVVVJRH1cbiAgICAgICAgICAgICAgICAgICAgc2hvd0NvbnZlcnNhdGlvbj17c2hvdWxkTmV2ZXJCZUNhbGxlZH1cbiAgICAgICAgICAgICAgICAgICAgb25TZWxlY3RDb252ZXJzYXRpb249e3Nob3VsZE5ldmVyQmVDYWxsZWR9XG4gICAgICAgICAgICAgICAgICAgIHJlbmRlck1lc3NhZ2VTZWFyY2hSZXN1bHQ9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICBzaG91bGROZXZlckJlQ2FsbGVkKCk7XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDxkaXYgLz47XG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgIHJvd0NvdW50PXtyb3dDb3VudH1cbiAgICAgICAgICAgICAgICAgICAgc2hvdWxkUmVjb21wdXRlUm93SGVpZ2h0cz17ZmFsc2V9XG4gICAgICAgICAgICAgICAgICAgIHNob3dDaG9vc2VHcm91cE1lbWJlcnM9e3Nob3VsZE5ldmVyQmVDYWxsZWR9XG4gICAgICAgICAgICAgICAgICAgIHRoZW1lPXt0aGVtZX1cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIC8qIGVzbGludC1lbmFibGUganN4LWExMXkvbm8tc3RhdGljLWVsZW1lbnQtaW50ZXJhY3Rpb25zICovXG4gICAgICAgICAgICB9fVxuICAgICAgICAgIDwvTWVhc3VyZT5cbiAgICAgICAgKSA6IChcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZHVsZS1BZGRHcm91cE1lbWJlcnNNb2RhbF9fbm8tY2FuZGlkYXRlLWNvbnRhY3RzXCI+XG4gICAgICAgICAgICB7aTE4bignbm9Db250YWN0c0ZvdW5kJyl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICl9XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kdWxlLUFkZEdyb3VwTWVtYmVyc01vZGFsX19idXR0b24tY29udGFpbmVyXCI+XG4gICAgICAgICAgPEJ1dHRvbiBvbkNsaWNrPXtvbkNsb3NlfSB2YXJpYW50PXtCdXR0b25WYXJpYW50LlNlY29uZGFyeX0+XG4gICAgICAgICAgICB7aTE4bignY2FuY2VsJyl9XG4gICAgICAgICAgPC9CdXR0b24+XG5cbiAgICAgICAgICA8QnV0dG9uIGRpc2FibGVkPXshY2FuQ29udGludWV9IG9uQ2xpY2s9e2NvbmZpcm1BZGRzfT5cbiAgICAgICAgICAgIHtpMThuKCdBZGRHcm91cE1lbWJlcnNNb2RhbC0tY29udGludWUtdG8tY29uZmlybScpfVxuICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvTW9kYWxIb3N0PlxuICApO1xufTtcblxuZnVuY3Rpb24gc2hvdWxkTmV2ZXJCZUNhbGxlZCguLi5fYXJnczogUmVhZG9ubHlBcnJheTx1bmtub3duPik6IHVua25vd24ge1xuICBhc3NlcnQoZmFsc2UsICdUaGlzIHNob3VsZCBuZXZlciBiZSBjYWxsZWQuIERvaW5nIG5vdGhpbmcnKTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFJQSxtQkFNTztBQUNQLG9CQUFxQjtBQUVyQiwyQkFBb0I7QUFHcEIsc0JBQXNDO0FBQ3RDLG9CQUF1QjtBQUN2Qix1QkFBMEI7QUFDMUIsNkJBQWdDO0FBQ2hDLDhCQUFpQztBQUVqQyxvQ0FBMEM7QUFDMUMsd0NBQW1EO0FBT25ELDRCQUdPO0FBQ1AsdUJBQTBCO0FBQzFCLDBCQUE2QjtBQUM3Qix5QkFBNEI7QUFFNUIsOEJBQTBDO0FBQzFDLDZCQUE4QztBQUM5QyxvQkFBc0M7QUFDdEMseUJBQTRCO0FBZ0NyQixNQUFNLDBCQUF3RCx3QkFBQztBQUFBLEVBQ3BFO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLE1BQ0k7QUFDSixRQUFNLENBQUMsWUFBWSw0Q0FBZ0I7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
