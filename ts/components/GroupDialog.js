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
var GroupDialog_exports = {};
__export(GroupDialog_exports, {
  GroupDialog: () => GroupDialog
});
module.exports = __toCommonJS(GroupDialog_exports);
var import_react = __toESM(require("react"));
var import_ModalHost = require("./ModalHost");
var import_Button = require("./Button");
var import_Avatar = require("./Avatar");
var import_ContactName = require("./conversation/ContactName");
function GroupDialog(props) {
  const {
    children,
    i18n,
    onClickPrimaryButton,
    onClose,
    primaryButtonText,
    title
  } = props;
  let secondaryButton;
  if ("secondaryButtonText" in props) {
    const { onClickSecondaryButton, secondaryButtonText } = props;
    secondaryButton = /* @__PURE__ */ import_react.default.createElement(import_Button.Button, {
      onClick: onClickSecondaryButton,
      variant: import_Button.ButtonVariant.Secondary
    }, secondaryButtonText);
  }
  return /* @__PURE__ */ import_react.default.createElement(import_ModalHost.ModalHost, {
    onClose
  }, /* @__PURE__ */ import_react.default.createElement("div", {
    className: "module-GroupDialog"
  }, /* @__PURE__ */ import_react.default.createElement("button", {
    "aria-label": i18n("close"),
    type: "button",
    className: "module-GroupDialog__close-button",
    onClick: () => {
      onClose();
    }
  }), /* @__PURE__ */ import_react.default.createElement("h1", {
    className: "module-GroupDialog__title"
  }, title), /* @__PURE__ */ import_react.default.createElement("div", {
    className: "module-GroupDialog__body"
  }, children), /* @__PURE__ */ import_react.default.createElement("div", {
    className: "module-GroupDialog__button-container"
  }, secondaryButton, /* @__PURE__ */ import_react.default.createElement(import_Button.Button, {
    onClick: onClickPrimaryButton,
    ref: focusRef,
    variant: import_Button.ButtonVariant.Primary
  }, primaryButtonText))));
}
GroupDialog.Paragraph = ({
  children
}) => /* @__PURE__ */ import_react.default.createElement("p", {
  className: "module-GroupDialog__paragraph"
}, children);
GroupDialog.Contacts = ({
  contacts,
  getPreferredBadge,
  i18n,
  theme
}) => /* @__PURE__ */ import_react.default.createElement("ul", {
  className: "module-GroupDialog__contacts"
}, contacts.map((contact) => /* @__PURE__ */ import_react.default.createElement("li", {
  key: contact.id,
  className: "module-GroupDialog__contacts__contact"
}, /* @__PURE__ */ import_react.default.createElement(import_Avatar.Avatar, {
  acceptedMessageRequest: contact.acceptedMessageRequest,
  avatarPath: contact.avatarPath,
  badge: getPreferredBadge(contact.badges),
  color: contact.color,
  conversationType: contact.type,
  isMe: contact.isMe,
  noteToSelf: contact.isMe,
  theme,
  title: contact.title,
  unblurredAvatarPath: contact.unblurredAvatarPath,
  sharedGroupNames: contact.sharedGroupNames,
  size: import_Avatar.AvatarSize.TWENTY_EIGHT,
  i18n
}), /* @__PURE__ */ import_react.default.createElement(import_ContactName.ContactName, {
  module: "module-GroupDialog__contacts__contact__name",
  title: contact.title
}))));
function focusRef(el) {
  if (el) {
    el.focus();
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GroupDialog
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiR3JvdXBEaWFsb2cudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB0eXBlIHsgUmVhY3RDaGlsZCwgUmVhY3ROb2RlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHR5cGUgeyBMb2NhbGl6ZXJUeXBlLCBUaGVtZVR5cGUgfSBmcm9tICcuLi90eXBlcy9VdGlsJztcbmltcG9ydCB0eXBlIHsgQ29udmVyc2F0aW9uVHlwZSB9IGZyb20gJy4uL3N0YXRlL2R1Y2tzL2NvbnZlcnNhdGlvbnMnO1xuaW1wb3J0IHR5cGUgeyBQcmVmZXJyZWRCYWRnZVNlbGVjdG9yVHlwZSB9IGZyb20gJy4uL3N0YXRlL3NlbGVjdG9ycy9iYWRnZXMnO1xuaW1wb3J0IHsgTW9kYWxIb3N0IH0gZnJvbSAnLi9Nb2RhbEhvc3QnO1xuaW1wb3J0IHsgQnV0dG9uLCBCdXR0b25WYXJpYW50IH0gZnJvbSAnLi9CdXR0b24nO1xuaW1wb3J0IHsgQXZhdGFyLCBBdmF0YXJTaXplIH0gZnJvbSAnLi9BdmF0YXInO1xuaW1wb3J0IHsgQ29udGFjdE5hbWUgfSBmcm9tICcuL2NvbnZlcnNhdGlvbi9Db250YWN0TmFtZSc7XG5cbnR5cGUgUHJvcHNUeXBlID0ge1xuICBjaGlsZHJlbjogUmVhY3ROb2RlO1xuICBpMThuOiBMb2NhbGl6ZXJUeXBlO1xuICBvbkNsaWNrUHJpbWFyeUJ1dHRvbjogKCkgPT4gdm9pZDtcbiAgb25DbG9zZTogKCkgPT4gdm9pZDtcbiAgcHJpbWFyeUJ1dHRvblRleHQ6IHN0cmluZztcbiAgdGl0bGU6IHN0cmluZztcbn0gJiAoXG4gIHwgLy8gV2UgdXNlIHRoaXMgZW1wdHkgdHlwZSBmb3IgYW4gXCJhbGwgb3Igbm90aGluZ1wiIHNldHVwLlxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L2Jhbi10eXBlc1xuICB7fVxuICB8IHtcbiAgICAgIG9uQ2xpY2tTZWNvbmRhcnlCdXR0b246ICgpID0+IHZvaWQ7XG4gICAgICBzZWNvbmRhcnlCdXR0b25UZXh0OiBzdHJpbmc7XG4gICAgfVxuKTtcblxuLy8gVE9ETzogVGhpcyBzaG91bGQgdXNlIDxNb2RhbD4uIFNlZSBERVNLVE9QLTEwMzguXG5leHBvcnQgZnVuY3Rpb24gR3JvdXBEaWFsb2cocHJvcHM6IFJlYWRvbmx5PFByb3BzVHlwZT4pOiBKU1guRWxlbWVudCB7XG4gIGNvbnN0IHtcbiAgICBjaGlsZHJlbixcbiAgICBpMThuLFxuICAgIG9uQ2xpY2tQcmltYXJ5QnV0dG9uLFxuICAgIG9uQ2xvc2UsXG4gICAgcHJpbWFyeUJ1dHRvblRleHQsXG4gICAgdGl0bGUsXG4gIH0gPSBwcm9wcztcblxuICBsZXQgc2Vjb25kYXJ5QnV0dG9uOiB1bmRlZmluZWQgfCBSZWFjdENoaWxkO1xuICBpZiAoJ3NlY29uZGFyeUJ1dHRvblRleHQnIGluIHByb3BzKSB7XG4gICAgY29uc3QgeyBvbkNsaWNrU2Vjb25kYXJ5QnV0dG9uLCBzZWNvbmRhcnlCdXR0b25UZXh0IH0gPSBwcm9wcztcbiAgICBzZWNvbmRhcnlCdXR0b24gPSAoXG4gICAgICA8QnV0dG9uXG4gICAgICAgIG9uQ2xpY2s9e29uQ2xpY2tTZWNvbmRhcnlCdXR0b259XG4gICAgICAgIHZhcmlhbnQ9e0J1dHRvblZhcmlhbnQuU2Vjb25kYXJ5fVxuICAgICAgPlxuICAgICAgICB7c2Vjb25kYXJ5QnV0dG9uVGV4dH1cbiAgICAgIDwvQnV0dG9uPlxuICAgICk7XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxNb2RhbEhvc3Qgb25DbG9zZT17b25DbG9zZX0+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZHVsZS1Hcm91cERpYWxvZ1wiPlxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgYXJpYS1sYWJlbD17aTE4bignY2xvc2UnKX1cbiAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICBjbGFzc05hbWU9XCJtb2R1bGUtR3JvdXBEaWFsb2dfX2Nsb3NlLWJ1dHRvblwiXG4gICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgb25DbG9zZSgpO1xuICAgICAgICAgIH19XG4gICAgICAgIC8+XG4gICAgICAgIDxoMSBjbGFzc05hbWU9XCJtb2R1bGUtR3JvdXBEaWFsb2dfX3RpdGxlXCI+e3RpdGxlfTwvaDE+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kdWxlLUdyb3VwRGlhbG9nX19ib2R5XCI+e2NoaWxkcmVufTwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZHVsZS1Hcm91cERpYWxvZ19fYnV0dG9uLWNvbnRhaW5lclwiPlxuICAgICAgICAgIHtzZWNvbmRhcnlCdXR0b259XG4gICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17b25DbGlja1ByaW1hcnlCdXR0b259XG4gICAgICAgICAgICByZWY9e2ZvY3VzUmVmfVxuICAgICAgICAgICAgdmFyaWFudD17QnV0dG9uVmFyaWFudC5QcmltYXJ5fVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtwcmltYXJ5QnV0dG9uVGV4dH1cbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L01vZGFsSG9zdD5cbiAgKTtcbn1cblxudHlwZSBQYXJhZ3JhcGhQcm9wc1R5cGUgPSB7XG4gIGNoaWxkcmVuOiBSZWFjdE5vZGU7XG59O1xuXG5Hcm91cERpYWxvZy5QYXJhZ3JhcGggPSAoe1xuICBjaGlsZHJlbixcbn06IFJlYWRvbmx5PFBhcmFncmFwaFByb3BzVHlwZT4pOiBKU1guRWxlbWVudCA9PiAoXG4gIDxwIGNsYXNzTmFtZT1cIm1vZHVsZS1Hcm91cERpYWxvZ19fcGFyYWdyYXBoXCI+e2NoaWxkcmVufTwvcD5cbik7XG5cbnR5cGUgQ29udGFjdHNQcm9wc1R5cGUgPSB7XG4gIGNvbnRhY3RzOiBBcnJheTxDb252ZXJzYXRpb25UeXBlPjtcbiAgZ2V0UHJlZmVycmVkQmFkZ2U6IFByZWZlcnJlZEJhZGdlU2VsZWN0b3JUeXBlO1xuICBpMThuOiBMb2NhbGl6ZXJUeXBlO1xuICB0aGVtZTogVGhlbWVUeXBlO1xufTtcblxuR3JvdXBEaWFsb2cuQ29udGFjdHMgPSAoe1xuICBjb250YWN0cyxcbiAgZ2V0UHJlZmVycmVkQmFkZ2UsXG4gIGkxOG4sXG4gIHRoZW1lLFxufTogUmVhZG9ubHk8Q29udGFjdHNQcm9wc1R5cGU+KSA9PiAoXG4gIDx1bCBjbGFzc05hbWU9XCJtb2R1bGUtR3JvdXBEaWFsb2dfX2NvbnRhY3RzXCI+XG4gICAge2NvbnRhY3RzLm1hcChjb250YWN0ID0+IChcbiAgICAgIDxsaSBrZXk9e2NvbnRhY3QuaWR9IGNsYXNzTmFtZT1cIm1vZHVsZS1Hcm91cERpYWxvZ19fY29udGFjdHNfX2NvbnRhY3RcIj5cbiAgICAgICAgPEF2YXRhclxuICAgICAgICAgIGFjY2VwdGVkTWVzc2FnZVJlcXVlc3Q9e2NvbnRhY3QuYWNjZXB0ZWRNZXNzYWdlUmVxdWVzdH1cbiAgICAgICAgICBhdmF0YXJQYXRoPXtjb250YWN0LmF2YXRhclBhdGh9XG4gICAgICAgICAgYmFkZ2U9e2dldFByZWZlcnJlZEJhZGdlKGNvbnRhY3QuYmFkZ2VzKX1cbiAgICAgICAgICBjb2xvcj17Y29udGFjdC5jb2xvcn1cbiAgICAgICAgICBjb252ZXJzYXRpb25UeXBlPXtjb250YWN0LnR5cGV9XG4gICAgICAgICAgaXNNZT17Y29udGFjdC5pc01lfVxuICAgICAgICAgIG5vdGVUb1NlbGY9e2NvbnRhY3QuaXNNZX1cbiAgICAgICAgICB0aGVtZT17dGhlbWV9XG4gICAgICAgICAgdGl0bGU9e2NvbnRhY3QudGl0bGV9XG4gICAgICAgICAgdW5ibHVycmVkQXZhdGFyUGF0aD17Y29udGFjdC51bmJsdXJyZWRBdmF0YXJQYXRofVxuICAgICAgICAgIHNoYXJlZEdyb3VwTmFtZXM9e2NvbnRhY3Quc2hhcmVkR3JvdXBOYW1lc31cbiAgICAgICAgICBzaXplPXtBdmF0YXJTaXplLlRXRU5UWV9FSUdIVH1cbiAgICAgICAgICBpMThuPXtpMThufVxuICAgICAgICAvPlxuICAgICAgICA8Q29udGFjdE5hbWVcbiAgICAgICAgICBtb2R1bGU9XCJtb2R1bGUtR3JvdXBEaWFsb2dfX2NvbnRhY3RzX19jb250YWN0X19uYW1lXCJcbiAgICAgICAgICB0aXRsZT17Y29udGFjdC50aXRsZX1cbiAgICAgICAgLz5cbiAgICAgIDwvbGk+XG4gICAgKSl9XG4gIDwvdWw+XG4pO1xuXG5mdW5jdGlvbiBmb2N1c1JlZihlbDogSFRNTEVsZW1lbnQgfCBudWxsKSB7XG4gIGlmIChlbCkge1xuICAgIGVsLmZvY3VzKCk7XG4gIH1cbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFJQSxtQkFBa0I7QUFLbEIsdUJBQTBCO0FBQzFCLG9CQUFzQztBQUN0QyxvQkFBbUM7QUFDbkMseUJBQTRCO0FBb0JyQixxQkFBcUIsT0FBeUM7QUFDbkUsUUFBTTtBQUFBLElBQ0o7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLE1BQ0U7QUFFSixNQUFJO0FBQ0osTUFBSSx5QkFBeUIsT0FBTztBQUNsQyxVQUFNLEVBQUUsd0JBQXdCLHdCQUF3QjtBQUN4RCxzQkFDRSxtREFBQztBQUFBLE1BQ0MsU0FBUztBQUFBLE1BQ1QsU0FBUyw0QkFBYztBQUFBLE9BRXRCLG1CQUNIO0FBQUEsRUFFSjtBQUVBLFNBQ0UsbURBQUM7QUFBQSxJQUFVO0FBQUEsS0FDVCxtREFBQztBQUFBLElBQUksV0FBVTtBQUFBLEtBQ2IsbURBQUM7QUFBQSxJQUNDLGNBQVksS0FBSyxPQUFPO0FBQUEsSUFDeEIsTUFBSztBQUFBLElBQ0wsV0FBVTtBQUFBLElBQ1YsU0FBUyxNQUFNO0FBQ2IsY0FBUTtBQUFBLElBQ1Y7QUFBQSxHQUNGLEdBQ0EsbURBQUM7QUFBQSxJQUFHLFdBQVU7QUFBQSxLQUE2QixLQUFNLEdBQ2pELG1EQUFDO0FBQUEsSUFBSSxXQUFVO0FBQUEsS0FBNEIsUUFBUyxHQUNwRCxtREFBQztBQUFBLElBQUksV0FBVTtBQUFBLEtBQ1osaUJBQ0QsbURBQUM7QUFBQSxJQUNDLFNBQVM7QUFBQSxJQUNULEtBQUs7QUFBQSxJQUNMLFNBQVMsNEJBQWM7QUFBQSxLQUV0QixpQkFDSCxDQUNGLENBQ0YsQ0FDRjtBQUVKO0FBakRnQixBQXVEaEIsWUFBWSxZQUFZLENBQUM7QUFBQSxFQUN2QjtBQUFBLE1BRUEsbURBQUM7QUFBQSxFQUFFLFdBQVU7QUFBQSxHQUFpQyxRQUFTO0FBVXpELFlBQVksV0FBVyxDQUFDO0FBQUEsRUFDdEI7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxNQUVBLG1EQUFDO0FBQUEsRUFBRyxXQUFVO0FBQUEsR0FDWCxTQUFTLElBQUksYUFDWixtREFBQztBQUFBLEVBQUcsS0FBSyxRQUFRO0FBQUEsRUFBSSxXQUFVO0FBQUEsR0FDN0IsbURBQUM7QUFBQSxFQUNDLHdCQUF3QixRQUFRO0FBQUEsRUFDaEMsWUFBWSxRQUFRO0FBQUEsRUFDcEIsT0FBTyxrQkFBa0IsUUFBUSxNQUFNO0FBQUEsRUFDdkMsT0FBTyxRQUFRO0FBQUEsRUFDZixrQkFBa0IsUUFBUTtBQUFBLEVBQzFCLE1BQU0sUUFBUTtBQUFBLEVBQ2QsWUFBWSxRQUFRO0FBQUEsRUFDcEI7QUFBQSxFQUNBLE9BQU8sUUFBUTtBQUFBLEVBQ2YscUJBQXFCLFFBQVE7QUFBQSxFQUM3QixrQkFBa0IsUUFBUTtBQUFBLEVBQzFCLE1BQU0seUJBQVc7QUFBQSxFQUNqQjtBQUFBLENBQ0YsR0FDQSxtREFBQztBQUFBLEVBQ0MsUUFBTztBQUFBLEVBQ1AsT0FBTyxRQUFRO0FBQUEsQ0FDakIsQ0FDRixDQUNELENBQ0g7QUFHRixrQkFBa0IsSUFBd0I7QUFDeEMsTUFBSSxJQUFJO0FBQ04sT0FBRyxNQUFNO0FBQUEsRUFDWDtBQUNGO0FBSlMiLAogICJuYW1lcyI6IFtdCn0K
