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
var ContactDetail_exports = {};
__export(ContactDetail_exports, {
  ContactDetail: () => ContactDetail
});
module.exports = __toCommonJS(ContactDetail_exports);
var import_react = __toESM(require("react"));
var import_EmbeddedContact = require("../../types/EmbeddedContact");
var import_missingCaseError = require("../../util/missingCaseError");
var import_contactUtil = require("./contactUtil");
function getLabelForEmail(method, i18n) {
  switch (method.type) {
    case import_EmbeddedContact.ContactFormType.CUSTOM:
      return method.label || i18n("email");
    case import_EmbeddedContact.ContactFormType.HOME:
      return i18n("home");
    case import_EmbeddedContact.ContactFormType.MOBILE:
      return i18n("mobile");
    case import_EmbeddedContact.ContactFormType.WORK:
      return i18n("work");
    default:
      throw (0, import_missingCaseError.missingCaseError)(method.type);
  }
}
function getLabelForPhone(method, i18n) {
  switch (method.type) {
    case import_EmbeddedContact.ContactFormType.CUSTOM:
      return method.label || i18n("phone");
    case import_EmbeddedContact.ContactFormType.HOME:
      return i18n("home");
    case import_EmbeddedContact.ContactFormType.MOBILE:
      return i18n("mobile");
    case import_EmbeddedContact.ContactFormType.WORK:
      return i18n("work");
    default:
      throw (0, import_missingCaseError.missingCaseError)(method.type);
  }
}
function getLabelForAddress(address, i18n) {
  switch (address.type) {
    case import_EmbeddedContact.AddressType.CUSTOM:
      return address.label || i18n("address");
    case import_EmbeddedContact.AddressType.HOME:
      return i18n("home");
    case import_EmbeddedContact.AddressType.WORK:
      return i18n("work");
    default:
      throw (0, import_missingCaseError.missingCaseError)(address.type);
  }
}
class ContactDetail extends import_react.default.Component {
  renderSendMessage({
    hasSignalAccount,
    i18n,
    onSendMessage
  }) {
    if (!hasSignalAccount) {
      return null;
    }
    const onClick = /* @__PURE__ */ __name((e) => {
      e.stopPropagation();
      onSendMessage();
    }, "onClick");
    return /* @__PURE__ */ import_react.default.createElement("button", {
      type: "button",
      className: "module-contact-detail__send-message",
      onClick
    }, /* @__PURE__ */ import_react.default.createElement("div", {
      className: "module-contact-detail__send-message__inner"
    }, /* @__PURE__ */ import_react.default.createElement("div", {
      className: "module-contact-detail__send-message__bubble-icon"
    }), i18n("sendMessageToContact")));
  }
  renderEmail(items, i18n) {
    if (!items || items.length === 0) {
      return void 0;
    }
    return items.map((item) => {
      return /* @__PURE__ */ import_react.default.createElement("div", {
        key: item.value,
        className: "module-contact-detail__additional-contact"
      }, /* @__PURE__ */ import_react.default.createElement("div", {
        className: "module-contact-detail__additional-contact__type"
      }, getLabelForEmail(item, i18n)), item.value);
    });
  }
  renderPhone(items, i18n) {
    if (!items || items.length === 0) {
      return void 0;
    }
    return items.map((item) => {
      return /* @__PURE__ */ import_react.default.createElement("div", {
        key: item.value,
        className: "module-contact-detail__additional-contact"
      }, /* @__PURE__ */ import_react.default.createElement("div", {
        className: "module-contact-detail__additional-contact__type"
      }, getLabelForPhone(item, i18n)), item.value);
    });
  }
  renderAddressLine(value) {
    if (!value) {
      return void 0;
    }
    return /* @__PURE__ */ import_react.default.createElement("div", null, value);
  }
  renderPOBox(poBox, i18n) {
    if (!poBox) {
      return null;
    }
    return /* @__PURE__ */ import_react.default.createElement("div", null, i18n("poBox"), " ", poBox);
  }
  renderAddressLineTwo(address) {
    if (address.city || address.region || address.postcode) {
      return /* @__PURE__ */ import_react.default.createElement("div", null, address.city, " ", address.region, " ", address.postcode);
    }
    return null;
  }
  renderAddresses(addresses, i18n) {
    if (!addresses || addresses.length === 0) {
      return void 0;
    }
    return addresses.map((address, index) => {
      return /* @__PURE__ */ import_react.default.createElement("div", {
        key: index,
        className: "module-contact-detail__additional-contact"
      }, /* @__PURE__ */ import_react.default.createElement("div", {
        className: "module-contact-detail__additional-contact__type"
      }, getLabelForAddress(address, i18n)), this.renderAddressLine(address.street), this.renderPOBox(address.pobox, i18n), this.renderAddressLine(address.neighborhood), this.renderAddressLineTwo(address), this.renderAddressLine(address.country));
    });
  }
  render() {
    const { contact, hasSignalAccount, i18n, onSendMessage } = this.props;
    const isIncoming = false;
    const module2 = "contact-detail";
    return /* @__PURE__ */ import_react.default.createElement("div", {
      className: "module-contact-detail"
    }, /* @__PURE__ */ import_react.default.createElement("div", {
      className: "module-contact-detail__avatar"
    }, (0, import_contactUtil.renderAvatar)({ contact, i18n, size: 80 })), (0, import_contactUtil.renderName)({ contact, isIncoming, module: module2 }), (0, import_contactUtil.renderContactShorthand)({ contact, isIncoming, module: module2 }), this.renderSendMessage({ hasSignalAccount, i18n, onSendMessage }), this.renderPhone(contact.number, i18n), this.renderEmail(contact.email, i18n), this.renderAddresses(contact.address, i18n));
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ContactDetail
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ29udGFjdERldGFpbC50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDE4LTIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgdHlwZSB7XG4gIEVtYmVkZGVkQ29udGFjdFR5cGUsXG4gIEVtYWlsLFxuICBQaG9uZSxcbiAgUG9zdGFsQWRkcmVzcyxcbn0gZnJvbSAnLi4vLi4vdHlwZXMvRW1iZWRkZWRDb250YWN0JztcbmltcG9ydCB7IEFkZHJlc3NUeXBlLCBDb250YWN0Rm9ybVR5cGUgfSBmcm9tICcuLi8uLi90eXBlcy9FbWJlZGRlZENvbnRhY3QnO1xuaW1wb3J0IHsgbWlzc2luZ0Nhc2VFcnJvciB9IGZyb20gJy4uLy4uL3V0aWwvbWlzc2luZ0Nhc2VFcnJvcic7XG5cbmltcG9ydCB7XG4gIHJlbmRlckF2YXRhcixcbiAgcmVuZGVyQ29udGFjdFNob3J0aGFuZCxcbiAgcmVuZGVyTmFtZSxcbn0gZnJvbSAnLi9jb250YWN0VXRpbCc7XG5cbmltcG9ydCB0eXBlIHsgTG9jYWxpemVyVHlwZSB9IGZyb20gJy4uLy4uL3R5cGVzL1V0aWwnO1xuXG5leHBvcnQgdHlwZSBQcm9wcyA9IHtcbiAgY29udGFjdDogRW1iZWRkZWRDb250YWN0VHlwZTtcbiAgaGFzU2lnbmFsQWNjb3VudDogYm9vbGVhbjtcbiAgaTE4bjogTG9jYWxpemVyVHlwZTtcbiAgb25TZW5kTWVzc2FnZTogKCkgPT4gdm9pZDtcbn07XG5cbmZ1bmN0aW9uIGdldExhYmVsRm9yRW1haWwobWV0aG9kOiBFbWFpbCwgaTE4bjogTG9jYWxpemVyVHlwZSk6IHN0cmluZyB7XG4gIHN3aXRjaCAobWV0aG9kLnR5cGUpIHtcbiAgICBjYXNlIENvbnRhY3RGb3JtVHlwZS5DVVNUT006XG4gICAgICByZXR1cm4gbWV0aG9kLmxhYmVsIHx8IGkxOG4oJ2VtYWlsJyk7XG4gICAgY2FzZSBDb250YWN0Rm9ybVR5cGUuSE9NRTpcbiAgICAgIHJldHVybiBpMThuKCdob21lJyk7XG4gICAgY2FzZSBDb250YWN0Rm9ybVR5cGUuTU9CSUxFOlxuICAgICAgcmV0dXJuIGkxOG4oJ21vYmlsZScpO1xuICAgIGNhc2UgQ29udGFjdEZvcm1UeXBlLldPUks6XG4gICAgICByZXR1cm4gaTE4bignd29yaycpO1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBtaXNzaW5nQ2FzZUVycm9yKG1ldGhvZC50eXBlKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRMYWJlbEZvclBob25lKG1ldGhvZDogUGhvbmUsIGkxOG46IExvY2FsaXplclR5cGUpOiBzdHJpbmcge1xuICBzd2l0Y2ggKG1ldGhvZC50eXBlKSB7XG4gICAgY2FzZSBDb250YWN0Rm9ybVR5cGUuQ1VTVE9NOlxuICAgICAgcmV0dXJuIG1ldGhvZC5sYWJlbCB8fCBpMThuKCdwaG9uZScpO1xuICAgIGNhc2UgQ29udGFjdEZvcm1UeXBlLkhPTUU6XG4gICAgICByZXR1cm4gaTE4bignaG9tZScpO1xuICAgIGNhc2UgQ29udGFjdEZvcm1UeXBlLk1PQklMRTpcbiAgICAgIHJldHVybiBpMThuKCdtb2JpbGUnKTtcbiAgICBjYXNlIENvbnRhY3RGb3JtVHlwZS5XT1JLOlxuICAgICAgcmV0dXJuIGkxOG4oJ3dvcmsnKTtcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbWlzc2luZ0Nhc2VFcnJvcihtZXRob2QudHlwZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0TGFiZWxGb3JBZGRyZXNzKFxuICBhZGRyZXNzOiBQb3N0YWxBZGRyZXNzLFxuICBpMThuOiBMb2NhbGl6ZXJUeXBlXG4pOiBzdHJpbmcge1xuICBzd2l0Y2ggKGFkZHJlc3MudHlwZSkge1xuICAgIGNhc2UgQWRkcmVzc1R5cGUuQ1VTVE9NOlxuICAgICAgcmV0dXJuIGFkZHJlc3MubGFiZWwgfHwgaTE4bignYWRkcmVzcycpO1xuICAgIGNhc2UgQWRkcmVzc1R5cGUuSE9NRTpcbiAgICAgIHJldHVybiBpMThuKCdob21lJyk7XG4gICAgY2FzZSBBZGRyZXNzVHlwZS5XT1JLOlxuICAgICAgcmV0dXJuIGkxOG4oJ3dvcmsnKTtcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbWlzc2luZ0Nhc2VFcnJvcihhZGRyZXNzLnR5cGUpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBDb250YWN0RGV0YWlsIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PFByb3BzPiB7XG4gIHB1YmxpYyByZW5kZXJTZW5kTWVzc2FnZSh7XG4gICAgaGFzU2lnbmFsQWNjb3VudCxcbiAgICBpMThuLFxuICAgIG9uU2VuZE1lc3NhZ2UsXG4gIH06IHtcbiAgICBoYXNTaWduYWxBY2NvdW50OiBib29sZWFuO1xuICAgIGkxOG46IChrZXk6IHN0cmluZywgdmFsdWVzPzogQXJyYXk8c3RyaW5nPikgPT4gc3RyaW5nO1xuICAgIG9uU2VuZE1lc3NhZ2U6ICgpID0+IHZvaWQ7XG4gIH0pOiBKU1guRWxlbWVudCB8IG51bGwge1xuICAgIGlmICghaGFzU2lnbmFsQWNjb3VudCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLy8gV2UgZG9uJ3Qgd2FudCB0aGUgb3ZlcmFsbCBjbGljayBoYW5kbGVyIGZvciB0aGlzIGVsZW1lbnQgdG8gZmlyZSwgc28gd2Ugc3RvcFxuICAgIC8vICAgcHJvcGFnYXRpb24gYmVmb3JlIGhhbmRpbmcgY29udHJvbCB0byB0aGUgY2FsbGVyJ3MgY2FsbGJhY2suXG4gICAgY29uc3Qgb25DbGljayA9IChlOiBSZWFjdC5Nb3VzZUV2ZW50PEhUTUxCdXR0b25FbGVtZW50Pik6IHZvaWQgPT4ge1xuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIG9uU2VuZE1lc3NhZ2UoKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxidXR0b25cbiAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgIGNsYXNzTmFtZT1cIm1vZHVsZS1jb250YWN0LWRldGFpbF9fc2VuZC1tZXNzYWdlXCJcbiAgICAgICAgb25DbGljaz17b25DbGlja31cbiAgICAgID5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2R1bGUtY29udGFjdC1kZXRhaWxfX3NlbmQtbWVzc2FnZV9faW5uZXJcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZHVsZS1jb250YWN0LWRldGFpbF9fc2VuZC1tZXNzYWdlX19idWJibGUtaWNvblwiIC8+XG4gICAgICAgICAge2kxOG4oJ3NlbmRNZXNzYWdlVG9Db250YWN0Jyl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9idXR0b24+XG4gICAgKTtcbiAgfVxuXG4gIHB1YmxpYyByZW5kZXJFbWFpbChcbiAgICBpdGVtczogQXJyYXk8RW1haWw+IHwgdW5kZWZpbmVkLFxuICAgIGkxOG46IExvY2FsaXplclR5cGVcbiAgKTogQXJyYXk8SlNYLkVsZW1lbnQ+IHwgdW5kZWZpbmVkIHtcbiAgICBpZiAoIWl0ZW1zIHx8IGl0ZW1zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICByZXR1cm4gaXRlbXMubWFwKChpdGVtOiBFbWFpbCkgPT4ge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdlxuICAgICAgICAgIGtleT17aXRlbS52YWx1ZX1cbiAgICAgICAgICBjbGFzc05hbWU9XCJtb2R1bGUtY29udGFjdC1kZXRhaWxfX2FkZGl0aW9uYWwtY29udGFjdFwiXG4gICAgICAgID5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZHVsZS1jb250YWN0LWRldGFpbF9fYWRkaXRpb25hbC1jb250YWN0X190eXBlXCI+XG4gICAgICAgICAgICB7Z2V0TGFiZWxGb3JFbWFpbChpdGVtLCBpMThuKX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICB7aXRlbS52YWx1ZX1cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIHJlbmRlclBob25lKFxuICAgIGl0ZW1zOiBBcnJheTxQaG9uZT4gfCB1bmRlZmluZWQsXG4gICAgaTE4bjogTG9jYWxpemVyVHlwZVxuICApOiBBcnJheTxKU1guRWxlbWVudD4gfCBudWxsIHwgdW5kZWZpbmVkIHtcbiAgICBpZiAoIWl0ZW1zIHx8IGl0ZW1zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICByZXR1cm4gaXRlbXMubWFwKChpdGVtOiBQaG9uZSkgPT4ge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdlxuICAgICAgICAgIGtleT17aXRlbS52YWx1ZX1cbiAgICAgICAgICBjbGFzc05hbWU9XCJtb2R1bGUtY29udGFjdC1kZXRhaWxfX2FkZGl0aW9uYWwtY29udGFjdFwiXG4gICAgICAgID5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZHVsZS1jb250YWN0LWRldGFpbF9fYWRkaXRpb25hbC1jb250YWN0X190eXBlXCI+XG4gICAgICAgICAgICB7Z2V0TGFiZWxGb3JQaG9uZShpdGVtLCBpMThuKX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICB7aXRlbS52YWx1ZX1cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIHJlbmRlckFkZHJlc3NMaW5lKHZhbHVlOiBzdHJpbmcgfCB1bmRlZmluZWQpOiBKU1guRWxlbWVudCB8IHVuZGVmaW5lZCB7XG4gICAgaWYgKCF2YWx1ZSkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICByZXR1cm4gPGRpdj57dmFsdWV9PC9kaXY+O1xuICB9XG5cbiAgcHVibGljIHJlbmRlclBPQm94KFxuICAgIHBvQm94OiBzdHJpbmcgfCB1bmRlZmluZWQsXG4gICAgaTE4bjogTG9jYWxpemVyVHlwZVxuICApOiBKU1guRWxlbWVudCB8IG51bGwge1xuICAgIGlmICghcG9Cb3gpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICB7aTE4bigncG9Cb3gnKX0ge3BvQm94fVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG4gIHB1YmxpYyByZW5kZXJBZGRyZXNzTGluZVR3byhhZGRyZXNzOiBQb3N0YWxBZGRyZXNzKTogSlNYLkVsZW1lbnQgfCBudWxsIHtcbiAgICBpZiAoYWRkcmVzcy5jaXR5IHx8IGFkZHJlc3MucmVnaW9uIHx8IGFkZHJlc3MucG9zdGNvZGUpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXY+XG4gICAgICAgICAge2FkZHJlc3MuY2l0eX0ge2FkZHJlc3MucmVnaW9ufSB7YWRkcmVzcy5wb3N0Y29kZX1cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcHVibGljIHJlbmRlckFkZHJlc3NlcyhcbiAgICBhZGRyZXNzZXM6IEFycmF5PFBvc3RhbEFkZHJlc3M+IHwgdW5kZWZpbmVkLFxuICAgIGkxOG46IExvY2FsaXplclR5cGVcbiAgKTogQXJyYXk8SlNYLkVsZW1lbnQ+IHwgdW5kZWZpbmVkIHtcbiAgICBpZiAoIWFkZHJlc3NlcyB8fCBhZGRyZXNzZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHJldHVybiBhZGRyZXNzZXMubWFwKChhZGRyZXNzOiBQb3N0YWxBZGRyZXNzLCBpbmRleDogbnVtYmVyKSA9PiB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVhY3Qvbm8tYXJyYXktaW5kZXgta2V5XG4gICAgICAgIDxkaXYga2V5PXtpbmRleH0gY2xhc3NOYW1lPVwibW9kdWxlLWNvbnRhY3QtZGV0YWlsX19hZGRpdGlvbmFsLWNvbnRhY3RcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZHVsZS1jb250YWN0LWRldGFpbF9fYWRkaXRpb25hbC1jb250YWN0X190eXBlXCI+XG4gICAgICAgICAgICB7Z2V0TGFiZWxGb3JBZGRyZXNzKGFkZHJlc3MsIGkxOG4pfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIHt0aGlzLnJlbmRlckFkZHJlc3NMaW5lKGFkZHJlc3Muc3RyZWV0KX1cbiAgICAgICAgICB7dGhpcy5yZW5kZXJQT0JveChhZGRyZXNzLnBvYm94LCBpMThuKX1cbiAgICAgICAgICB7dGhpcy5yZW5kZXJBZGRyZXNzTGluZShhZGRyZXNzLm5laWdoYm9yaG9vZCl9XG4gICAgICAgICAge3RoaXMucmVuZGVyQWRkcmVzc0xpbmVUd28oYWRkcmVzcyl9XG4gICAgICAgICAge3RoaXMucmVuZGVyQWRkcmVzc0xpbmUoYWRkcmVzcy5jb3VudHJ5KX1cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIG92ZXJyaWRlIHJlbmRlcigpOiBKU1guRWxlbWVudCB7XG4gICAgY29uc3QgeyBjb250YWN0LCBoYXNTaWduYWxBY2NvdW50LCBpMThuLCBvblNlbmRNZXNzYWdlIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGlzSW5jb21pbmcgPSBmYWxzZTtcbiAgICBjb25zdCBtb2R1bGUgPSAnY29udGFjdC1kZXRhaWwnO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kdWxlLWNvbnRhY3QtZGV0YWlsXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kdWxlLWNvbnRhY3QtZGV0YWlsX19hdmF0YXJcIj5cbiAgICAgICAgICB7cmVuZGVyQXZhdGFyKHsgY29udGFjdCwgaTE4biwgc2l6ZTogODAgfSl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB7cmVuZGVyTmFtZSh7IGNvbnRhY3QsIGlzSW5jb21pbmcsIG1vZHVsZSB9KX1cbiAgICAgICAge3JlbmRlckNvbnRhY3RTaG9ydGhhbmQoeyBjb250YWN0LCBpc0luY29taW5nLCBtb2R1bGUgfSl9XG4gICAgICAgIHt0aGlzLnJlbmRlclNlbmRNZXNzYWdlKHsgaGFzU2lnbmFsQWNjb3VudCwgaTE4biwgb25TZW5kTWVzc2FnZSB9KX1cbiAgICAgICAge3RoaXMucmVuZGVyUGhvbmUoY29udGFjdC5udW1iZXIsIGkxOG4pfVxuICAgICAgICB7dGhpcy5yZW5kZXJFbWFpbChjb250YWN0LmVtYWlsLCBpMThuKX1cbiAgICAgICAge3RoaXMucmVuZGVyQWRkcmVzc2VzKGNvbnRhY3QuYWRkcmVzcywgaTE4bil9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsbUJBQWtCO0FBUWxCLDZCQUE2QztBQUM3Qyw4QkFBaUM7QUFFakMseUJBSU87QUFXUCwwQkFBMEIsUUFBZSxNQUE2QjtBQUNwRSxVQUFRLE9BQU87QUFBQSxTQUNSLHVDQUFnQjtBQUNuQixhQUFPLE9BQU8sU0FBUyxLQUFLLE9BQU87QUFBQSxTQUNoQyx1Q0FBZ0I7QUFDbkIsYUFBTyxLQUFLLE1BQU07QUFBQSxTQUNmLHVDQUFnQjtBQUNuQixhQUFPLEtBQUssUUFBUTtBQUFBLFNBQ2pCLHVDQUFnQjtBQUNuQixhQUFPLEtBQUssTUFBTTtBQUFBO0FBRWxCLFlBQU0sOENBQWlCLE9BQU8sSUFBSTtBQUFBO0FBRXhDO0FBYlMsQUFlVCwwQkFBMEIsUUFBZSxNQUE2QjtBQUNwRSxVQUFRLE9BQU87QUFBQSxTQUNSLHVDQUFnQjtBQUNuQixhQUFPLE9BQU8sU0FBUyxLQUFLLE9BQU87QUFBQSxTQUNoQyx1Q0FBZ0I7QUFDbkIsYUFBTyxLQUFLLE1BQU07QUFBQSxTQUNmLHVDQUFnQjtBQUNuQixhQUFPLEtBQUssUUFBUTtBQUFBLFNBQ2pCLHVDQUFnQjtBQUNuQixhQUFPLEtBQUssTUFBTTtBQUFBO0FBRWxCLFlBQU0sOENBQWlCLE9BQU8s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
