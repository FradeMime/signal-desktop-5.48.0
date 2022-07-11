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
var LeftPaneComposeHelper_exports = {};
__export(LeftPaneComposeHelper_exports, {
  LeftPaneComposeHelper: () => LeftPaneComposeHelper
});
module.exports = __toCommonJS(LeftPaneComposeHelper_exports);
var import_react = __toESM(require("react"));
var import_LeftPaneHelper = require("./LeftPaneHelper");
var import_ConversationList = require("../ConversationList");
var import_SearchInput = require("../SearchInput");
var import_libphonenumberInstance = require("../../util/libphonenumberInstance");
var import_missingCaseError = require("../../util/missingCaseError");
var import_Username = require("../../types/Username");
var import_uuidFetchState = require("../../util/uuidFetchState");
var TopButton = /* @__PURE__ */ ((TopButton2) => {
  TopButton2[TopButton2["None"] = 0] = "None";
  TopButton2[TopButton2["CreateNewGroup"] = 1] = "CreateNewGroup";
  return TopButton2;
})(TopButton || {});
class LeftPaneComposeHelper extends import_LeftPaneHelper.LeftPaneHelper {
  constructor({
    composeContacts,
    composeGroups,
    regionCode,
    searchTerm,
    isUsernamesEnabled,
    uuidFetchState
  }) {
    super();
    this.composeContacts = composeContacts;
    this.composeGroups = composeGroups;
    this.searchTerm = searchTerm;
    this.phoneNumber = (0, import_libphonenumberInstance.parseAndFormatPhoneNumber)(searchTerm, regionCode);
    if (this.phoneNumber) {
      const { phoneNumber } = this;
      this.isPhoneNumberVisible = this.composeContacts.every((contact) => contact.e164 !== phoneNumber.e164);
    } else {
      this.isPhoneNumberVisible = false;
    }
    this.uuidFetchState = uuidFetchState;
    if (isUsernamesEnabled && !this.phoneNumber) {
      this.username = (0, import_Username.getUsernameFromSearch)(this.searchTerm);
      this.isUsernameVisible = isUsernamesEnabled && Boolean(this.username) && this.composeContacts.every((contact) => contact.username !== this.username);
    } else {
      this.isUsernameVisible = false;
    }
  }
  getHeaderContents({
    i18n,
    showInbox
  }) {
    return /* @__PURE__ */ import_react.default.createElement("div", {
      className: "module-left-pane__header__contents"
    }, /* @__PURE__ */ import_react.default.createElement("button", {
      onClick: this.getBackAction({ showInbox }),
      className: "module-left-pane__header__contents__back-button",
      title: i18n("backToInbox"),
      "aria-label": i18n("backToInbox"),
      type: "button"
    }), /* @__PURE__ */ import_react.default.createElement("div", {
      className: "module-left-pane__header__contents__text"
    }, i18n("newConversation")));
  }
  getBackAction({ showInbox }) {
    return showInbox;
  }
  getSearchInput({
    i18n,
    onChangeComposeSearchTerm
  }) {
    return /* @__PURE__ */ import_react.default.createElement(import_SearchInput.SearchInput, {
      i18n,
      moduleClassName: "module-left-pane__compose-search-form",
      onChange: onChangeComposeSearchTerm,
      placeholder: i18n("contactSearchPlaceholder"),
      ref: focusRef,
      value: this.searchTerm
    });
  }
  getPreRowsNode({
    i18n
  }) {
    return this.getRowCount() ? null : /* @__PURE__ */ import_react.default.createElement("div", {
      className: "module-left-pane__compose-no-contacts"
    }, i18n("noConversationsFound"));
  }
  getRowCount() {
    let result = this.composeContacts.length + this.composeGroups.length;
    if (this.hasTopButton()) {
      result += 1;
    }
    if (this.hasContactsHeader()) {
      result += 1;
    }
    if (this.hasGroupsHeader()) {
      result += 1;
    }
    if (this.isUsernameVisible) {
      result += 2;
    }
    if (this.isPhoneNumberVisible) {
      result += 2;
    }
    return result;
  }
  getRow(actualRowIndex) {
    let virtualRowIndex = actualRowIndex;
    if (this.hasTopButton()) {
      if (virtualRowIndex === 0) {
        const topButton = this.getTopButton();
        switch (topButton) {
          case 0 /* None */:
            break;
          case 1 /* CreateNewGroup */:
            return { type: import_ConversationList.RowType.CreateNewGroup };
          default:
            throw (0, import_missingCaseError.missingCaseError)(topButton);
        }
      }
      virtualRowIndex -= 1;
    }
    if (this.hasContactsHeader()) {
      if (virtualRowIndex === 0) {
        return {
          type: import_ConversationList.RowType.Header,
          i18nKey: "contactsHeader"
        };
      }
      virtualRowIndex -= 1;
      const contact = this.composeContacts[virtualRowIndex];
      if (contact) {
        return {
          type: import_ConversationList.RowType.Contact,
          contact
        };
      }
      virtualRowIndex -= this.composeContacts.length;
    }
    if (this.hasGroupsHeader()) {
      if (virtualRowIndex === 0) {
        return {
          type: import_ConversationList.RowType.Header,
          i18nKey: "groupsHeader"
        };
      }
      virtualRowIndex -= 1;
      const group = this.composeGroups[virtualRowIndex];
      if (group) {
        return {
          type: import_ConversationList.RowType.Conversation,
          conversation: group
        };
      }
      virtualRowIndex -= this.composeGroups.length;
    }
    if (this.username && this.isUsernameVisible) {
      if (virtualRowIndex === 0) {
        return {
          type: import_ConversationList.RowType.Header,
          i18nKey: "findByUsernameHeader"
        };
      }
      virtualRowIndex -= 1;
      if (virtualRowIndex === 0) {
        return {
          type: import_ConversationList.RowType.UsernameSearchResult,
          username: this.username,
          isFetchingUsername: (0, import_uuidFetchState.isFetchingByUsername)(this.uuidFetchState, this.username)
        };
        virtualRowIndex -= 1;
      }
    }
    if (this.phoneNumber && this.isPhoneNumberVisible) {
      if (virtualRowIndex === 0) {
        return {
          type: import_ConversationList.RowType.Header,
          i18nKey: "findByPhoneNumberHeader"
        };
      }
      virtualRowIndex -= 1;
      if (virtualRowIndex === 0) {
        return {
          type: import_ConversationList.RowType.StartNewConversation,
          phoneNumber: this.phoneNumber,
          isFetching: (0, import_uuidFetchState.isFetchingByE164)(this.uuidFetchState, this.phoneNumber.e164)
        };
        virtualRowIndex -= 1;
      }
    }
    return void 0;
  }
  getConversationAndMessageAtIndex(..._args) {
    return void 0;
  }
  getConversationAndMessageInDirection(..._args) {
    return void 0;
  }
  shouldRecomputeRowHeights(exProps) {
    const prev = new LeftPaneComposeHelper(exProps);
    const currHeaderIndices = this.getHeaderIndices();
    const prevHeaderIndices = prev.getHeaderIndices();
    return currHeaderIndices.top !== prevHeaderIndices.top || currHeaderIndices.contact !== prevHeaderIndices.contact || currHeaderIndices.group !== prevHeaderIndices.group || currHeaderIndices.username !== prevHeaderIndices.username || currHeaderIndices.phoneNumber !== prevHeaderIndices.phoneNumber;
  }
  getTopButton() {
    if (this.searchTerm) {
      return 0 /* None */;
    }
    return 1 /* CreateNewGroup */;
  }
  hasTopButton() {
    return this.getTopButton() !== 0 /* None */;
  }
  hasContactsHeader() {
    return Boolean(this.composeContacts.length);
  }
  hasGroupsHeader() {
    return Boolean(this.composeGroups.length);
  }
  getHeaderIndices() {
    let top;
    let contact;
    let group;
    let phoneNumber;
    let username;
    let rowCount = 0;
    if (this.hasTopButton()) {
      top = 0;
      rowCount += 1;
    }
    if (this.hasContactsHeader()) {
      contact = rowCount;
      rowCount += this.composeContacts.length;
    }
    if (this.hasGroupsHeader()) {
      group = rowCount;
      rowCount += this.composeContacts.length;
    }
    if (this.phoneNumber) {
      phoneNumber = rowCount;
    }
    if (this.username) {
      username = rowCount;
    }
    return {
      top,
      contact,
      group,
      phoneNumber,
      username
    };
  }
}
function focusRef(el) {
  if (el) {
    el.focus();
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  LeftPaneComposeHelper
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiTGVmdFBhbmVDb21wb3NlSGVscGVyLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEtMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB0eXBlIHsgUmVhY3RDaGlsZCwgQ2hhbmdlRXZlbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgeyBMZWZ0UGFuZUhlbHBlciB9IGZyb20gJy4vTGVmdFBhbmVIZWxwZXInO1xuaW1wb3J0IHR5cGUgeyBSb3cgfSBmcm9tICcuLi9Db252ZXJzYXRpb25MaXN0JztcbmltcG9ydCB7IFJvd1R5cGUgfSBmcm9tICcuLi9Db252ZXJzYXRpb25MaXN0JztcbmltcG9ydCB0eXBlIHsgQ29udGFjdExpc3RJdGVtQ29udmVyc2F0aW9uVHlwZSB9IGZyb20gJy4uL2NvbnZlcnNhdGlvbkxpc3QvQ29udGFjdExpc3RJdGVtJztcbmltcG9ydCB0eXBlIHsgUHJvcHNEYXRhIGFzIENvbnZlcnNhdGlvbkxpc3RJdGVtUHJvcHNUeXBlIH0gZnJvbSAnLi4vY29udmVyc2F0aW9uTGlzdC9Db252ZXJzYXRpb25MaXN0SXRlbSc7XG5pbXBvcnQgeyBTZWFyY2hJbnB1dCB9IGZyb20gJy4uL1NlYXJjaElucHV0JztcbmltcG9ydCB0eXBlIHsgTG9jYWxpemVyVHlwZSB9IGZyb20gJy4uLy4uL3R5cGVzL1V0aWwnO1xuaW1wb3J0IHR5cGUgeyBQYXJzZWRFMTY0VHlwZSB9IGZyb20gJy4uLy4uL3V0aWwvbGlicGhvbmVudW1iZXJJbnN0YW5jZSc7XG5pbXBvcnQgeyBwYXJzZUFuZEZvcm1hdFBob25lTnVtYmVyIH0gZnJvbSAnLi4vLi4vdXRpbC9saWJwaG9uZW51bWJlckluc3RhbmNlJztcbmltcG9ydCB7IG1pc3NpbmdDYXNlRXJyb3IgfSBmcm9tICcuLi8uLi91dGlsL21pc3NpbmdDYXNlRXJyb3InO1xuaW1wb3J0IHsgZ2V0VXNlcm5hbWVGcm9tU2VhcmNoIH0gZnJvbSAnLi4vLi4vdHlwZXMvVXNlcm5hbWUnO1xuaW1wb3J0IHR5cGUgeyBVVUlERmV0Y2hTdGF0ZVR5cGUgfSBmcm9tICcuLi8uLi91dGlsL3V1aWRGZXRjaFN0YXRlJztcbmltcG9ydCB7XG4gIGlzRmV0Y2hpbmdCeVVzZXJuYW1lLFxuICBpc0ZldGNoaW5nQnlFMTY0LFxufSBmcm9tICcuLi8uLi91dGlsL3V1aWRGZXRjaFN0YXRlJztcblxuZXhwb3J0IHR5cGUgTGVmdFBhbmVDb21wb3NlUHJvcHNUeXBlID0ge1xuICBjb21wb3NlQ29udGFjdHM6IFJlYWRvbmx5QXJyYXk8Q29udGFjdExpc3RJdGVtQ29udmVyc2F0aW9uVHlwZT47XG4gIGNvbXBvc2VHcm91cHM6IFJlYWRvbmx5QXJyYXk8Q29udmVyc2F0aW9uTGlzdEl0ZW1Qcm9wc1R5cGU+O1xuXG4gIHJlZ2lvbkNvZGU6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgc2VhcmNoVGVybTogc3RyaW5nO1xuICB1dWlkRmV0Y2hTdGF0ZTogVVVJREZldGNoU3RhdGVUeXBlO1xuICBpc1VzZXJuYW1lc0VuYWJsZWQ6IGJvb2xlYW47XG59O1xuXG5lbnVtIFRvcEJ1dHRvbiB7XG4gIE5vbmUsXG4gIENyZWF0ZU5ld0dyb3VwLFxufVxuXG5leHBvcnQgY2xhc3MgTGVmdFBhbmVDb21wb3NlSGVscGVyIGV4dGVuZHMgTGVmdFBhbmVIZWxwZXI8TGVmdFBhbmVDb21wb3NlUHJvcHNUeXBlPiB7XG4gIHByaXZhdGUgcmVhZG9ubHkgY29tcG9zZUNvbnRhY3RzOiBSZWFkb25seUFycmF5PENvbnRhY3RMaXN0SXRlbUNvbnZlcnNhdGlvblR5cGU+O1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgY29tcG9zZUdyb3VwczogUmVhZG9ubHlBcnJheTxDb252ZXJzYXRpb25MaXN0SXRlbVByb3BzVHlwZT47XG5cbiAgcHJpdmF0ZSByZWFkb25seSB1dWlkRmV0Y2hTdGF0ZTogVVVJREZldGNoU3RhdGVUeXBlO1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgc2VhcmNoVGVybTogc3RyaW5nO1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgcGhvbmVOdW1iZXI6IFBhcnNlZEUxNjRUeXBlIHwgdW5kZWZpbmVkO1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgaXNQaG9uZU51bWJlclZpc2libGU6IGJvb2xlYW47XG5cbiAgcHJpdmF0ZSByZWFkb25seSB1c2VybmFtZTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgaXNVc2VybmFtZVZpc2libGU6IGJvb2xlYW47XG5cbiAgY29uc3RydWN0b3Ioe1xuICAgIGNvbXBvc2VDb250YWN0cyxcbiAgICBjb21wb3NlR3JvdXBzLFxuICAgIHJlZ2lvbkNvZGUsXG4gICAgc2VhcmNoVGVybSxcbiAgICBpc1VzZXJuYW1lc0VuYWJsZWQsXG4gICAgdXVpZEZldGNoU3RhdGUsXG4gIH06IFJlYWRvbmx5PExlZnRQYW5lQ29tcG9zZVByb3BzVHlwZT4pIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5jb21wb3NlQ29udGFjdHMgPSBjb21wb3NlQ29udGFjdHM7XG4gICAgdGhpcy5jb21wb3NlR3JvdXBzID0gY29tcG9zZUdyb3VwcztcbiAgICB0aGlzLnNlYXJjaFRlcm0gPSBzZWFyY2hUZXJtO1xuICAgIHRoaXMucGhvbmVOdW1iZXIgPSBwYXJzZUFuZEZvcm1hdFBob25lTnVtYmVyKHNlYXJjaFRlcm0sIHJlZ2lvbkNvZGUpO1xuICAgIGlmICh0aGlzLnBob25lTnVtYmVyKSB7XG4gICAgICBjb25zdCB7IHBob25lTnVtYmVyIH0gPSB0aGlzO1xuICAgICAgdGhpcy5pc1Bob25lTnVtYmVyVmlzaWJsZSA9IHRoaXMuY29tcG9zZUNvbnRhY3RzLmV2ZXJ5KFxuICAgICAgICBjb250YWN0ID0+IGNvbnRhY3QuZTE2NCAhPT0gcGhvbmVOdW1iZXIuZTE2NFxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5pc1Bob25lTnVtYmVyVmlzaWJsZSA9IGZhbHNlO1xuICAgIH1cbiAgICB0aGlzLnV1aWRGZXRjaFN0YXRlID0gdXVpZEZldGNoU3RhdGU7XG5cbiAgICBpZiAoaXNVc2VybmFtZXNFbmFibGVkICYmICF0aGlzLnBob25lTnVtYmVyKSB7XG4gICAgICB0aGlzLnVzZXJuYW1lID0gZ2V0VXNlcm5hbWVGcm9tU2VhcmNoKHRoaXMuc2VhcmNoVGVybSk7XG4gICAgICB0aGlzLmlzVXNlcm5hbWVWaXNpYmxlID1cbiAgICAgICAgaXNVc2VybmFtZXNFbmFibGVkICYmXG4gICAgICAgIEJvb2xlYW4odGhpcy51c2VybmFtZSkgJiZcbiAgICAgICAgdGhpcy5jb21wb3NlQ29udGFjdHMuZXZlcnkoXG4gICAgICAgICAgY29udGFjdCA9PiBjb250YWN0LnVzZXJuYW1lICE9PSB0aGlzLnVzZXJuYW1lXG4gICAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaXNVc2VybmFtZVZpc2libGUgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBvdmVycmlkZSBnZXRIZWFkZXJDb250ZW50cyh7XG4gICAgaTE4bixcbiAgICBzaG93SW5ib3gsXG4gIH06IFJlYWRvbmx5PHtcbiAgICBpMThuOiBMb2NhbGl6ZXJUeXBlO1xuICAgIHNob3dJbmJveDogKCkgPT4gdm9pZDtcbiAgfT4pOiBSZWFjdENoaWxkIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2R1bGUtbGVmdC1wYW5lX19oZWFkZXJfX2NvbnRlbnRzXCI+XG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICBvbkNsaWNrPXt0aGlzLmdldEJhY2tBY3Rpb24oeyBzaG93SW5ib3ggfSl9XG4gICAgICAgICAgY2xhc3NOYW1lPVwibW9kdWxlLWxlZnQtcGFuZV9faGVhZGVyX19jb250ZW50c19fYmFjay1idXR0b25cIlxuICAgICAgICAgIHRpdGxlPXtpMThuKCdiYWNrVG9JbmJveCcpfVxuICAgICAgICAgIGFyaWEtbGFiZWw9e2kxOG4oJ2JhY2tUb0luYm94Jyl9XG4gICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgIC8+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kdWxlLWxlZnQtcGFuZV9faGVhZGVyX19jb250ZW50c19fdGV4dFwiPlxuICAgICAgICAgIHtpMThuKCduZXdDb252ZXJzYXRpb24nKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbiAgb3ZlcnJpZGUgZ2V0QmFja0FjdGlvbih7IHNob3dJbmJveCB9OiB7IHNob3dJbmJveDogKCkgPT4gdm9pZCB9KTogKCkgPT4gdm9pZCB7XG4gICAgcmV0dXJuIHNob3dJbmJveDtcbiAgfVxuXG4gIC8vIG5ldyBDb252ZXJzYXRpb24gYm94OlxuICAvLyBnZXQgc2VhcmNoIGJhciBpbnB1dFxuICBvdmVycmlkZSBnZXRTZWFyY2hJbnB1dCh7XG4gICAgaTE4bixcbiAgICBvbkNoYW5nZUNvbXBvc2VTZWFyY2hUZXJtLFxuICB9OiBSZWFkb25seTx7XG4gICAgaTE4bjogTG9jYWxpemVyVHlwZTtcbiAgICBvbkNoYW5nZUNvbXBvc2VTZWFyY2hUZXJtOiAoXG4gICAgICBldmVudDogQ2hhbmdlRXZlbnQ8SFRNTElucHV0RWxlbWVudD5cbiAgICApID0+IHVua25vd247XG4gIH0+KTogUmVhY3RDaGlsZCB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxTZWFyY2hJbnB1dFxuICAgICAgICBpMThuPXtpMThufVxuICAgICAgICBtb2R1bGVDbGFzc05hbWU9XCJtb2R1bGUtbGVmdC1wYW5lX19jb21wb3NlLXNlYXJjaC1mb3JtXCJcbiAgICAgICAgb25DaGFuZ2U9e29uQ2hhbmdlQ29tcG9zZVNlYXJjaFRlcm19XG4gICAgICAgIHBsYWNlaG9sZGVyPXtpMThuKCdjb250YWN0U2VhcmNoUGxhY2Vob2xkZXInKX1cbiAgICAgICAgcmVmPXtmb2N1c1JlZn1cbiAgICAgICAgdmFsdWU9e3RoaXMuc2VhcmNoVGVybX1cbiAgICAgIC8+XG4gICAgKTtcbiAgfVxuXG4gIC8vIG5ldyBDb252ZXJzYXRpb24gYm94OlxuICAvLyBzZWFyY2ggYmFyIGdldCBub25lIGNvbnRhY3RcbiAgb3ZlcnJpZGUgZ2V0UHJlUm93c05vZGUoe1xuICAgIGkxOG4sXG4gIH06IFJlYWRvbmx5PHtcbiAgICBpMThuOiBMb2NhbGl6ZXJUeXBlO1xuICB9Pik6IFJlYWN0Q2hpbGQgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5nZXRSb3dDb3VudCgpID8gbnVsbCA6IChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kdWxlLWxlZnQtcGFuZV9fY29tcG9zZS1uby1jb250YWN0c1wiPlxuICAgICAgICB7aTE4bignbm9Db252ZXJzYXRpb25zRm91bmQnKX1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICBnZXRSb3dDb3VudCgpOiBudW1iZXIge1xuICAgIGxldCByZXN1bHQgPSB0aGlzLmNvbXBvc2VDb250YWN0cy5sZW5ndGggKyB0aGlzLmNvbXBvc2VHcm91cHMubGVuZ3RoO1xuICAgIGlmICh0aGlzLmhhc1RvcEJ1dHRvbigpKSB7XG4gICAgICByZXN1bHQgKz0gMTtcbiAgICB9XG4gICAgaWYgKHRoaXMuaGFzQ29udGFjdHNIZWFkZXIoKSkge1xuICAgICAgcmVzdWx0ICs9IDE7XG4gICAgfVxuICAgIGlmICh0aGlzLmhhc0dyb3Vwc0hlYWRlcigpKSB7XG4gICAgICByZXN1bHQgKz0gMTtcbiAgICB9XG4gICAgaWYgKHRoaXMuaXNVc2VybmFtZVZpc2libGUpIHtcbiAgICAgIHJlc3VsdCArPSAyO1xuICAgIH1cbiAgICBpZiAodGhpcy5pc1Bob25lTnVtYmVyVmlzaWJsZSkge1xuICAgICAgcmVzdWx0ICs9IDI7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGdldFJvdyhhY3R1YWxSb3dJbmRleDogbnVtYmVyKTogdW5kZWZpbmVkIHwgUm93IHtcbiAgICBsZXQgdmlydHVhbFJvd0luZGV4ID0gYWN0dWFsUm93SW5kZXg7XG4gICAgaWYgKHRoaXMuaGFzVG9wQnV0dG9uKCkpIHtcbiAgICAgIGlmICh2aXJ0dWFsUm93SW5kZXggPT09IDApIHtcbiAgICAgICAgY29uc3QgdG9wQnV0dG9uID0gdGhpcy5nZXRUb3BCdXR0b24oKTtcbiAgICAgICAgc3dpdGNoICh0b3BCdXR0b24pIHtcbiAgICAgICAgICBjYXNlIFRvcEJ1dHRvbi5Ob25lOlxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSBUb3BCdXR0b24uQ3JlYXRlTmV3R3JvdXA6XG4gICAgICAgICAgICByZXR1cm4geyB0eXBlOiBSb3dUeXBlLkNyZWF0ZU5ld0dyb3VwIH07XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHRocm93IG1pc3NpbmdDYXNlRXJyb3IodG9wQnV0dG9uKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB2aXJ0dWFsUm93SW5kZXggLT0gMTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5oYXNDb250YWN0c0hlYWRlcigpKSB7XG4gICAgICBpZiAodmlydHVhbFJvd0luZGV4ID09PSAwKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgdHlwZTogUm93VHlwZS5IZWFkZXIsXG4gICAgICAgICAgaTE4bktleTogJ2NvbnRhY3RzSGVhZGVyJyxcbiAgICAgICAgfTtcbiAgICAgIH1cblxuICAgICAgdmlydHVhbFJvd0luZGV4IC09IDE7XG5cbiAgICAgIGNvbnN0IGNvbnRhY3QgPSB0aGlzLmNvbXBvc2VDb250YWN0c1t2aXJ0dWFsUm93SW5kZXhdO1xuICAgICAgaWYgKGNvbnRhY3QpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB0eXBlOiBSb3dUeXBlLkNvbnRhY3QsXG4gICAgICAgICAgY29udGFjdCxcbiAgICAgICAgfTtcbiAgICAgIH1cblxuICAgICAgdmlydHVhbFJvd0luZGV4IC09IHRoaXMuY29tcG9zZUNvbnRhY3RzLmxlbmd0aDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5oYXNHcm91cHNIZWFkZXIoKSkge1xuICAgICAgaWYgKHZpcnR1YWxSb3dJbmRleCA9PT0gMCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHR5cGU6IFJvd1R5cGUuSGVhZGVyLFxuICAgICAgICAgIGkxOG5LZXk6ICdncm91cHNIZWFkZXInLFxuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICB2aXJ0dWFsUm93SW5kZXggLT0gMTtcblxuICAgICAgY29uc3QgZ3JvdXAgPSB0aGlzLmNvbXBvc2VHcm91cHNbdmlydHVhbFJvd0luZGV4XTtcbiAgICAgIGlmIChncm91cCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHR5cGU6IFJvd1R5cGUuQ29udmVyc2F0aW9uLFxuICAgICAgICAgIGNvbnZlcnNhdGlvbjogZ3JvdXAsXG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIHZpcnR1YWxSb3dJbmRleCAtPSB0aGlzLmNvbXBvc2VHcm91cHMubGVuZ3RoO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnVzZXJuYW1lICYmIHRoaXMuaXNVc2VybmFtZVZpc2libGUpIHtcbiAgICAgIGlmICh2aXJ0dWFsUm93SW5kZXggPT09IDApIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB0eXBlOiBSb3dUeXBlLkhlYWRlcixcbiAgICAgICAgICBpMThuS2V5OiAnZmluZEJ5VXNlcm5hbWVIZWFkZXInLFxuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICB2aXJ0dWFsUm93SW5kZXggLT0gMTtcblxuICAgICAgaWYgKHZpcnR1YWxSb3dJbmRleCA9PT0gMCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHR5cGU6IFJvd1R5cGUuVXNlcm5hbWVTZWFyY2hSZXN1bHQsXG4gICAgICAgICAgdXNlcm5hbWU6IHRoaXMudXNlcm5hbWUsXG4gICAgICAgICAgaXNGZXRjaGluZ1VzZXJuYW1lOiBpc0ZldGNoaW5nQnlVc2VybmFtZShcbiAgICAgICAgICAgIHRoaXMudXVpZEZldGNoU3RhdGUsXG4gICAgICAgICAgICB0aGlzLnVzZXJuYW1lXG4gICAgICAgICAgKSxcbiAgICAgICAgfTtcblxuICAgICAgICB2aXJ0dWFsUm93SW5kZXggLT0gMTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy5waG9uZU51bWJlciAmJiB0aGlzLmlzUGhvbmVOdW1iZXJWaXNpYmxlKSB7XG4gICAgICBpZiAodmlydHVhbFJvd0luZGV4ID09PSAwKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgdHlwZTogUm93VHlwZS5IZWFkZXIsXG4gICAgICAgICAgaTE4bktleTogJ2ZpbmRCeVBob25lTnVtYmVySGVhZGVyJyxcbiAgICAgICAgfTtcbiAgICAgIH1cblxuICAgICAgdmlydHVhbFJvd0luZGV4IC09IDE7XG5cbiAgICAgIGlmICh2aXJ0dWFsUm93SW5kZXggPT09IDApIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB0eXBlOiBSb3dUeXBlLlN0YXJ0TmV3Q29udmVyc2F0aW9uLFxuICAgICAgICAgIHBob25lTnVtYmVyOiB0aGlzLnBob25lTnVtYmVyLFxuICAgICAgICAgIGlzRmV0Y2hpbmc6IGlzRmV0Y2hpbmdCeUUxNjQoXG4gICAgICAgICAgICB0aGlzLnV1aWRGZXRjaFN0YXRlLFxuICAgICAgICAgICAgdGhpcy5waG9uZU51bWJlci5lMTY0XG4gICAgICAgICAgKSxcbiAgICAgICAgfTtcblxuICAgICAgICB2aXJ0dWFsUm93SW5kZXggLT0gMTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgLy8gVGhpcyBpcyBkZWxpYmVyYXRlbHkgdW5pbXBsZW1lbnRlZCBiZWNhdXNlIHRoZXNlIGtleWJvYXJkIHNob3J0Y3V0cyBzaG91bGRuJ3Qgd29yayBpblxuICAvLyAgIHRoZSBjb21wb3Nlci4gVGhlIHNhbWUgaXMgdHJ1ZSBmb3IgdGhlIFwiaW4gZGlyZWN0aW9uXCIgZnVuY3Rpb24gYmVsb3cuXG4gIGdldENvbnZlcnNhdGlvbkFuZE1lc3NhZ2VBdEluZGV4KFxuICAgIC4uLl9hcmdzOiBSZWFkb25seUFycmF5PHVua25vd24+XG4gICk6IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIGdldENvbnZlcnNhdGlvbkFuZE1lc3NhZ2VJbkRpcmVjdGlvbihcbiAgICAuLi5fYXJnczogUmVhZG9ubHlBcnJheTx1bmtub3duPlxuICApOiB1bmRlZmluZWQge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICBzaG91bGRSZWNvbXB1dGVSb3dIZWlnaHRzKFxuICAgIGV4UHJvcHM6IFJlYWRvbmx5PExlZnRQYW5lQ29tcG9zZVByb3BzVHlwZT5cbiAgKTogYm9vbGVhbiB7XG4gICAgY29uc3QgcHJldiA9IG5ldyBMZWZ0UGFuZUNvbXBvc2VIZWxwZXIoZXhQcm9wcyk7XG4gICAgY29uc3QgY3VyckhlYWRlckluZGljZXMgPSB0aGlzLmdldEhlYWRlckluZGljZXMoKTtcbiAgICBjb25zdCBwcmV2SGVhZGVySW5kaWNlcyA9IHByZXYuZ2V0SGVhZGVySW5kaWNlcygpO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIGN1cnJIZWFkZXJJbmRpY2VzLnRvcCAhPT0gcHJldkhlYWRlckluZGljZXMudG9wIHx8XG4gICAgICBjdXJySGVhZGVySW5kaWNlcy5jb250YWN0ICE9PSBwcmV2SGVhZGVySW5kaWNlcy5jb250YWN0IHx8XG4gICAgICBjdXJySGVhZGVySW5kaWNlcy5ncm91cCAhPT0gcHJldkhlYWRlckluZGljZXMuZ3JvdXAgfHxcbiAgICAgIGN1cnJIZWFkZXJJbmRpY2VzLnVzZXJuYW1lICE9PSBwcmV2SGVhZGVySW5kaWNlcy51c2VybmFtZSB8fFxuICAgICAgY3VyckhlYWRlckluZGljZXMucGhvbmVOdW1iZXIgIT09IHByZXZIZWFkZXJJbmRpY2VzLnBob25lTnVtYmVyXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0VG9wQnV0dG9uKCk6IFRvcEJ1dHRvbiB7XG4gICAgaWYgKHRoaXMuc2VhcmNoVGVybSkge1xuICAgICAgcmV0dXJuIFRvcEJ1dHRvbi5Ob25lO1xuICAgIH1cbiAgICByZXR1cm4gVG9wQnV0dG9uLkNyZWF0ZU5ld0dyb3VwO1xuICB9XG5cbiAgcHJpdmF0ZSBoYXNUb3BCdXR0b24oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0VG9wQnV0dG9uKCkgIT09IFRvcEJ1dHRvbi5Ob25lO1xuICB9XG5cbiAgcHJpdmF0ZSBoYXNDb250YWN0c0hlYWRlcigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gQm9vbGVhbih0aGlzLmNvbXBvc2VDb250YWN0cy5sZW5ndGgpO1xuICB9XG5cbiAgcHJpdmF0ZSBoYXNHcm91cHNIZWFkZXIoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIEJvb2xlYW4odGhpcy5jb21wb3NlR3JvdXBzLmxlbmd0aCk7XG4gIH1cblxuICBwcml2YXRlIGdldEhlYWRlckluZGljZXMoKToge1xuICAgIHRvcD86IG51bWJlcjtcbiAgICBjb250YWN0PzogbnVtYmVyO1xuICAgIGdyb3VwPzogbnVtYmVyO1xuICAgIHBob25lTnVtYmVyPzogbnVtYmVyO1xuICAgIHVzZXJuYW1lPzogbnVtYmVyO1xuICB9IHtcbiAgICBsZXQgdG9wOiBudW1iZXIgfCB1bmRlZmluZWQ7XG4gICAgbGV0IGNvbnRhY3Q6IG51bWJlciB8IHVuZGVmaW5lZDtcbiAgICBsZXQgZ3JvdXA6IG51bWJlciB8IHVuZGVmaW5lZDtcbiAgICBsZXQgcGhvbmVOdW1iZXI6IG51bWJlciB8IHVuZGVmaW5lZDtcbiAgICBsZXQgdXNlcm5hbWU6IG51bWJlciB8IHVuZGVmaW5lZDtcblxuICAgIGxldCByb3dDb3VudCA9IDA7XG5cbiAgICBpZiAodGhpcy5oYXNUb3BCdXR0b24oKSkge1xuICAgICAgdG9wID0gMDtcbiAgICAgIHJvd0NvdW50ICs9IDE7XG4gICAgfVxuICAgIGlmICh0aGlzLmhhc0NvbnRhY3RzSGVhZGVyKCkpIHtcbiAgICAgIGNvbnRhY3QgPSByb3dDb3VudDtcbiAgICAgIHJvd0NvdW50ICs9IHRoaXMuY29tcG9zZUNvbnRhY3RzLmxlbmd0aDtcbiAgICB9XG4gICAgaWYgKHRoaXMuaGFzR3JvdXBzSGVhZGVyKCkpIHtcbiAgICAgIGdyb3VwID0gcm93Q291bnQ7XG4gICAgICByb3dDb3VudCArPSB0aGlzLmNvbXBvc2VDb250YWN0cy5sZW5ndGg7XG4gICAgfVxuICAgIGlmICh0aGlzLnBob25lTnVtYmVyKSB7XG4gICAgICBwaG9uZU51bWJlciA9IHJvd0NvdW50O1xuICAgIH1cbiAgICBpZiAodGhpcy51c2VybmFtZSkge1xuICAgICAgdXNlcm5hbWUgPSByb3dDb3VudDtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgdG9wLFxuICAgICAgY29udGFjdCxcbiAgICAgIGdyb3VwLFxuICAgICAgcGhvbmVOdW1iZXIsXG4gICAgICB1c2VybmFtZSxcbiAgICB9O1xuICB9XG59XG5cbmZ1bmN0aW9uIGZvY3VzUmVmKGVsOiBIVE1MRWxlbWVudCB8IG51bGwpIHtcbiAgaWYgKGVsKSB7XG4gICAgZWwuZm9jdXMoKTtcbiAgfVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUlBLG1CQUFrQjtBQUVsQiw0QkFBK0I7QUFFL0IsOEJBQXdCO0FBR3hCLHlCQUE0QjtBQUc1QixvQ0FBMEM7QUFDMUMsOEJBQWlDO0FBQ2pDLHNCQUFzQztBQUV0Qyw0QkFHTztBQVlQLElBQUssWUFBTCxrQkFBSyxlQUFMO0FBQ0U7QUFDQTtBQUZHO0FBQUE7QUFLRSxNQUFNLDhCQUE4QixxQ0FBeUM7QUFBQSxFQWlCbEYsWUFBWTtBQUFBLElBQ1Y7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEtBQ3FDO0FBQ3JDLFVBQU07QUFFTixTQUFLLGtCQUFrQjtBQUN2QixTQUFLLGdCQUFnQjtBQUNyQixTQUFLLGFBQWE7QUFDbEIsU0FBSyxjQUFjLDZEQUEwQixZQUFZLFVBQVU7QUFDbkUsUUFBSSxLQUFLLGFBQWE7QUFDcEIsWUFBTSxFQUFFLGdCQUFnQjtBQUN4QixXQUFLLHVCQUF1QixLQUFLLGdCQUFnQixNQUMvQyxhQUFXLFFBQVEsU0FBUyxZQUFZLElBQzFDO0FBQUEsSUFDRixPQUFPO0FBQ0wsV0FBSyx1QkFBdUI7QUFBQSxJQUM5QjtBQUNBLFNBQUssaUJBQWlCO0FBRXRCLFFBQUksc0JBQXNCLENBQUMsS0FBSyxhQUFhO0FBQzNDLFdBQUssV0FBVywyQ0FBc0IsS0FBSyxVQUFVO0FBQ3JELFdBQUssb0JBQ0gsc0JBQ0EsUUFBUSxLQUFLLFFBQVEsS0FDckIsS0FBSyxnQkFBZ0IsTUFDbkIsYUFBVyxRQUFRLGFBQWEsS0FBSyxRQUN2QztBQUFBLElBQ0osT0FBTztBQUNMLFdBQUssb0JBQW9CO0FBQUEsSUFDM0I7QUFBQSxFQUNGO0FBQUEsRUFFUyxrQkFBa0I7QUFBQSxJQUN6QjtBQUFBLElBQ0E7QUFBQSxLQUljO0FBQ2QsV0FDRSxtREFBQztBQUFBLE1BQUksV0FBVTtBQUFBLE9BQ2IsbURBQUM7QUFBQSxNQUNDLFNBQVMsS0FBSyxjQUFjLEVBQUUsVUFBVSxDQUFDO0FBQUEsTUFDekMsV0FBVTtBQUFBLE1BQ1YsT0FBTyxLQUFLLGFBQWE7QUFBQSxNQUN6QixjQUFZLEtBQUssYUFBYTtBQUFBLE1BQzlCLE1BQUs7QUFBQSxLQUNQLEdBQ0EsbURBQUM7QUFBQSxNQUFJLFdBQVU7QUFBQSxPQUNaLEtBQUssaUJBQWlCLENBQ3pCLENBQ0Y7QUFBQSxFQUVKO0FBQUEsRUFFUyxjQUFjLEVBQUUsYUFBb0Q7QUFDM0UsV0FBTztBQUFBLEVBQ1Q7QUFBQSxFQUlTLGVBQWU7QUFBQSxJQUN0QjtBQUFBLElBQ0E7QUFBQSxLQU1jO0FBQ2QsV0FDRSxtREFBQztBQUFBLE1BQ0M7QUFBQSxNQUNBLGlCQUFnQjtBQUFBLE1BQ2hCLFVBQVU7QUFBQSxNQUNWLGFBQWEsS0FBSywwQkFBMEI7QUFBQSxNQUM1QyxLQUFLO0FBQUEsTUFDTCxPQUFPLEtBQUs7QUFBQSxLQUNkO0FBQUEsRUFFSjtBQUFBLEVBSVMsZUFBZTtBQUFBLElBQ3RCO0FBQUEsS0FHcUI7QUFDckIsV0FBTyxLQUFLLFlBQVksSUFBSSxPQUMxQixtREFBQztBQUFBLE1BQUksV0FBVTtBQUFBLE9BQ1osS0FBSyxzQkFBc0IsQ0FDOUI7QUFBQSxFQUVKO0FBQUEsRUFFQSxjQUFzQjtBQUNwQixRQUFJLFNBQVMsS0FBSyxnQkFBZ0IsU0FBUyxLQUFLLGNBQWM7QUFDOUQsUUFBSSxLQUFLLGFBQWEsR0FBRztBQUN2QixnQkFBVTtBQUFBLElBQ1o7QUFDQSxRQUFJLEtBQUssa0JBQWtCLEdBQUc7QUFDNUIsZ0JBQVU7QUFBQSxJQUNaO0FBQ0EsUUFBSSxLQUFLLGdCQUFnQixHQUFHO0FBQzFCLGdCQUFVO0FBQUEsSUFDWjtBQUNBLFFBQUksS0FBSyxtQkFBbUI7QUFDMUIsZ0JBQVU7QUFBQSxJQUNaO0FBQ0EsUUFBSSxLQUFLLHNCQUFzQjtBQUM3QixnQkFBVTtBQUFBLElBQ1o7QUFFQSxXQUFPO0FBQUEsRUFDVDtBQUFBLEVBRUEsT0FBTyxnQkFBeUM7QUFDOUMsUUFBSSxrQkFBa0I7QUFDdEIsUUFBSSxLQUFLLGFBQWEsR0FBRztBQUN2QixVQUFJLG9CQUFvQixHQUFHO0FBQ3pCLGNBQU0sWUFBWSxLQUFLLGFBQWE7QUFDcEMsZ0JBQVE7QUFBQSxlQUNEO0FBQ0g7QUFBQSxlQUNHO0FBQ0gsbUJBQU8sRUFBRSxNQUFNLGdDQUFRLGVBQWU7QUFBQTtBQUV0QyxrQkFBTSw4Q0FBaUIsU0FBUztBQUFBO0FBQUEsTUFFdEM7QUFFQSx5QkFBbUI7QUFBQSxJQUNyQjtBQUVBLFFBQUksS0FBSyxrQkFBa0IsR0FBRztBQUM1QixVQUFJLG9CQUFvQixHQUFHO0FBQ3pCLGVBQU87QUFBQSxVQUNMLE1BQU0sZ0NBQVE7QUFBQSxVQUNkLFNBQVM7QUFBQSxRQUNYO0FBQUEsTUFDRjtBQUVBLHlCQUFtQjtBQUVuQixZQUFNLFVBQVUsS0FBSyxnQkFBZ0I7QUFDckMsVUFBSSxTQUFTO0FBQ1gsZUFBTztBQUFBLFVBQ0wsTUFBTSxnQ0FBUTtBQUFBLFVBQ2Q7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUVBLHlCQUFtQixLQUFLLGdCQUFnQjtBQUFBLElBQzFDO0FBRUEsUUFBSSxLQUFLLGdCQUFnQixHQUFHO0FBQzFCLFVBQUksb0JBQW9CLEdBQUc7QUFDekIsZUFBTztBQUFBLFVBQ0wsTUFBTSxnQ0FBUTtBQUFBLFVBQ2QsU0FBUztBQUFBLFFBQ1g7QUFBQSxNQUNGO0FBRUEseUJBQW1CO0FBRW5CLFlBQU0sUUFBUSxLQUFLLGNBQWM7QUFDakMsVUFBSSxPQUFPO0FBQ1QsZUFBTztBQUFBLFVBQ0wsTUFBTSxnQ0FBUTtBQUFBLFVBQ2QsY0FBYztBQUFBLFFBQ2hCO0FBQUEsTUFDRjtBQUVBLHlCQUFtQixLQUFLLGNBQWM7QUFBQSxJQUN4QztBQUVBLFFBQUksS0FBSyxZQUFZLEtBQUssbUJBQW1CO0FBQzNDLFVBQUksb0JBQW9CLEdBQUc7QUFDekIsZUFBTztBQUFBLFVBQ0wsTUFBTSxnQ0FBUTtBQUFBLFVBQ2QsU0FBUztBQUFBLFFBQ1g7QUFBQSxNQUNGO0FBRUEseUJBQW1CO0FBRW5CLFVBQUksb0JBQW9CLEdBQUc7QUFDekIsZUFBTztBQUFBLFVBQ0wsTUFBTSxnQ0FBUTtBQUFBLFVBQ2QsVUFBVSxLQUFLO0FBQUEsVUFDZixvQkFBb0IsZ0RBQ2xCLEtBQUssZ0JBQ0wsS0FBSyxRQUNQO0FBQUEsUUFDRjtBQUVBLDJCQUFtQjtBQUFBLE1BQ3JCO0FBQUEsSUFDRjtBQUVBLFFBQUksS0FBSyxlQUFlLEtBQUssc0JBQXNCO0FBQ2pELFVBQUksb0JBQW9CLEdBQUc7QUFDekIsZUFBTztBQUFBLFVBQ0wsTUFBTSxnQ0FBUTtBQUFBLFVBQ2QsU0FBUztBQUFBLFFBQ1g7QUFBQSxNQUNGO0FBRUEseUJBQW1CO0FBRW5CLFVBQUksb0JBQW9CLEdBQUc7QUFDekIsZUFBTztBQUFBLFVBQ0wsTUFBTSxnQ0FBUTtBQUFBLFVBQ2QsYUFBYSxLQUFLO0FBQUEsVUFDbEIsWUFBWSw0Q0FDVixLQUFLLGdCQUNMLEtBQUssWUFBWSxJQUNuQjtBQUFBLFFBQ0Y7QUFFQSwyQkFBbUI7QUFBQSxNQUNyQjtBQUFBLElBQ0Y7QUFFQSxXQUFPO0FBQUEsRUFDVDtBQUFBLEVBSUEsb0NBQ0ssT0FDUTtBQUNYLFdBQU87QUFBQSxFQUNUO0FBQUEsRUFFQSx3Q0FDSyxPQUNRO0FBQ1gsV0FBTztBQUFBLEVBQ1Q7QUFBQSxFQUVBLDBCQUNFLFNBQ1M7QUFDVCxVQUFNLE9BQU8sSUFBSSxzQkFBc0IsT0FBTztBQUM5QyxVQUFNLG9CQUFvQixLQUFLLGlCQUFpQjtBQUNoRCxVQUFNLG9CQUFvQixLQUFLLGlCQUFpQjtBQUVoRCxXQUNFLGtCQUFrQixRQUFRLGtCQUFrQixPQUM1QyxrQkFBa0IsWUFBWSxrQkFBa0IsV0FDaEQsa0JBQWtCLFVBQVUsa0JBQWtCLFNBQzlDLGtCQUFrQixhQUFhLGtCQUFrQixZQUNqRCxrQkFBa0IsZ0JBQWdCLGtCQUFrQjtBQUFBLEVBRXhEO0FBQUEsRUFFUSxlQUEwQjtBQUNoQyxRQUFJLEtBQUssWUFBWTtBQUNuQixhQUFPO0FBQUEsSUFDVDtBQUNBLFdBQU87QUFBQSxFQUNUO0FBQUEsRUFFUSxlQUF3QjtBQUM5QixXQUFPLEtBQUssYUFBYSxNQUFNO0FBQUEsRUFDakM7QUFBQSxFQUVRLG9CQUE2QjtBQUNuQyxXQUFPLFFBQVEsS0FBSyxnQkFBZ0IsTUFBTTtBQUFBLEVBQzVDO0FBQUEsRUFFUSxrQkFBMkI7QUFDakMsV0FBTyxRQUFRLEtBQUssY0FBYyxNQUFNO0FBQUEsRUFDMUM7QUFBQSxFQUVRLG1CQU1OO0FBQ0EsUUFBSTtBQUNKLFFBQUk7QUFDSixRQUFJO0FBQ0osUUFBSTtBQUNKLFFBQUk7QUFFSixRQUFJLFdBQVc7QUFFZixRQUFJLEtBQUssYUFBYSxHQUFHO0FBQ3ZCLFlBQU07QUFDTixrQkFBWTtBQUFBLElBQ2Q7QUFDQSxRQUFJLEtBQUssa0JBQWtCLEdBQUc7QUFDNUIsZ0JBQVU7QUFDVixrQkFBWSxLQUFLLGdCQUFnQjtBQUFBLElBQ25DO0FBQ0EsUUFBSSxLQUFLLGdCQUFnQixHQUFHO0FBQzFCLGNBQVE7QUFDUixrQkFBWSxLQUFLLGdCQUFnQjtBQUFBLElBQ25DO0FBQ0EsUUFBSSxLQUFLLGFBQWE7QUFDcEIsb0JBQWM7QUFBQSxJQUNoQjtBQUNBLFFBQUksS0FBSyxVQUFVO0FBQ2pCLGlCQUFXO0FBQUEsSUFDYjtBQUVBLFdBQU87QUFBQSxNQUNMO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0Y7QUFyVk8sQUF1VlAsa0JBQWtCLElBQXdCO0FBQ3hDLE1BQUksSUFBSTtBQUNOLE9BQUcsTUFBTTtBQUFBLEVBQ1g7QUFDRjtBQUpTIiwKICAibmFtZXMiOiBbXQp9Cg==
