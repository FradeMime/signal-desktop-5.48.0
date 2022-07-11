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
var NewlyCreatedGroupInvitedContactsDialog_exports = {};
__export(NewlyCreatedGroupInvitedContactsDialog_exports, {
  NewlyCreatedGroupInvitedContactsDialog: () => NewlyCreatedGroupInvitedContactsDialog
});
module.exports = __toCommonJS(NewlyCreatedGroupInvitedContactsDialog_exports);
var import_react = __toESM(require("react"));
var import_Intl = require("./Intl");
var import_ContactName = require("./conversation/ContactName");
var import_GroupDialog = require("./GroupDialog");
var import_openLinkInWebBrowser = require("../util/openLinkInWebBrowser");
const NewlyCreatedGroupInvitedContactsDialog = /* @__PURE__ */ __name(({ contacts, getPreferredBadge, i18n, onClose, theme }) => {
  let title;
  let body;
  if (contacts.length === 1) {
    const contact = contacts[0];
    title = i18n("NewlyCreatedGroupInvitedContactsDialog--title--one");
    body = /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement(import_GroupDialog.GroupDialog.Paragraph, null, /* @__PURE__ */ import_react.default.createElement(import_Intl.Intl, {
      i18n,
      id: "NewlyCreatedGroupInvitedContactsDialog--body--user-paragraph--one",
      components: [/* @__PURE__ */ import_react.default.createElement(import_ContactName.ContactName, {
        title: contact.title
      })]
    })), /* @__PURE__ */ import_react.default.createElement(import_GroupDialog.GroupDialog.Paragraph, null, i18n("NewlyCreatedGroupInvitedContactsDialog--body--info-paragraph")));
  } else {
    title = i18n("NewlyCreatedGroupInvitedContactsDialog--title--many", [
      contacts.length.toString()
    ]);
    body = /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement(import_GroupDialog.GroupDialog.Paragraph, null, i18n("NewlyCreatedGroupInvitedContactsDialog--body--user-paragraph--many")), /* @__PURE__ */ import_react.default.createElement(import_GroupDialog.GroupDialog.Paragraph, null, i18n("NewlyCreatedGroupInvitedContactsDialog--body--info-paragraph")), /* @__PURE__ */ import_react.default.createElement(import_GroupDialog.GroupDialog.Contacts, {
      contacts,
      getPreferredBadge,
      i18n,
      theme
    }));
  }
  return /* @__PURE__ */ import_react.default.createElement(import_GroupDialog.GroupDialog, {
    i18n,
    onClickPrimaryButton: onClose,
    primaryButtonText: i18n("Confirmation--confirm"),
    secondaryButtonText: i18n("NewlyCreatedGroupInvitedContactsDialog--body--learn-more"),
    onClickSecondaryButton: () => {
      (0, import_openLinkInWebBrowser.openLinkInWebBrowser)("https://support.signal.org/hc/articles/360007319331-Group-chats");
    },
    onClose,
    title
  }, body);
}, "NewlyCreatedGroupInvitedContactsDialog");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  NewlyCreatedGroupInvitedContactsDialog
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiTmV3bHlDcmVhdGVkR3JvdXBJbnZpdGVkQ29udGFjdHNEaWFsb2cudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB0eXBlIHsgRnVuY3Rpb25Db21wb25lbnQsIFJlYWN0Tm9kZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB0eXBlIHsgTG9jYWxpemVyVHlwZSwgVGhlbWVUeXBlIH0gZnJvbSAnLi4vdHlwZXMvVXRpbCc7XG5pbXBvcnQgdHlwZSB7IENvbnZlcnNhdGlvblR5cGUgfSBmcm9tICcuLi9zdGF0ZS9kdWNrcy9jb252ZXJzYXRpb25zJztcbmltcG9ydCB0eXBlIHsgUHJlZmVycmVkQmFkZ2VTZWxlY3RvclR5cGUgfSBmcm9tICcuLi9zdGF0ZS9zZWxlY3RvcnMvYmFkZ2VzJztcbmltcG9ydCB7IEludGwgfSBmcm9tICcuL0ludGwnO1xuaW1wb3J0IHsgQ29udGFjdE5hbWUgfSBmcm9tICcuL2NvbnZlcnNhdGlvbi9Db250YWN0TmFtZSc7XG5pbXBvcnQgeyBHcm91cERpYWxvZyB9IGZyb20gJy4vR3JvdXBEaWFsb2cnO1xuaW1wb3J0IHsgb3BlbkxpbmtJbldlYkJyb3dzZXIgfSBmcm9tICcuLi91dGlsL29wZW5MaW5rSW5XZWJCcm93c2VyJztcblxudHlwZSBQcm9wc1R5cGUgPSB7XG4gIGNvbnRhY3RzOiBBcnJheTxDb252ZXJzYXRpb25UeXBlPjtcbiAgZ2V0UHJlZmVycmVkQmFkZ2U6IFByZWZlcnJlZEJhZGdlU2VsZWN0b3JUeXBlO1xuICBpMThuOiBMb2NhbGl6ZXJUeXBlO1xuICBvbkNsb3NlOiAoKSA9PiB2b2lkO1xuICB0aGVtZTogVGhlbWVUeXBlO1xufTtcblxuZXhwb3J0IGNvbnN0IE5ld2x5Q3JlYXRlZEdyb3VwSW52aXRlZENvbnRhY3RzRGlhbG9nOiBGdW5jdGlvbkNvbXBvbmVudDxcbiAgUHJvcHNUeXBlXG4+ID0gKHsgY29udGFjdHMsIGdldFByZWZlcnJlZEJhZGdlLCBpMThuLCBvbkNsb3NlLCB0aGVtZSB9KSA9PiB7XG4gIGxldCB0aXRsZTogc3RyaW5nO1xuICBsZXQgYm9keTogUmVhY3ROb2RlO1xuICBpZiAoY29udGFjdHMubGVuZ3RoID09PSAxKSB7XG4gICAgY29uc3QgY29udGFjdCA9IGNvbnRhY3RzWzBdO1xuXG4gICAgdGl0bGUgPSBpMThuKCdOZXdseUNyZWF0ZWRHcm91cEludml0ZWRDb250YWN0c0RpYWxvZy0tdGl0bGUtLW9uZScpO1xuICAgIGJvZHkgPSAoXG4gICAgICA8PlxuICAgICAgICA8R3JvdXBEaWFsb2cuUGFyYWdyYXBoPlxuICAgICAgICAgIDxJbnRsXG4gICAgICAgICAgICBpMThuPXtpMThufVxuICAgICAgICAgICAgaWQ9XCJOZXdseUNyZWF0ZWRHcm91cEludml0ZWRDb250YWN0c0RpYWxvZy0tYm9keS0tdXNlci1wYXJhZ3JhcGgtLW9uZVwiXG4gICAgICAgICAgICBjb21wb25lbnRzPXtbPENvbnRhY3ROYW1lIHRpdGxlPXtjb250YWN0LnRpdGxlfSAvPl19XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9Hcm91cERpYWxvZy5QYXJhZ3JhcGg+XG4gICAgICAgIDxHcm91cERpYWxvZy5QYXJhZ3JhcGg+XG4gICAgICAgICAge2kxOG4oJ05ld2x5Q3JlYXRlZEdyb3VwSW52aXRlZENvbnRhY3RzRGlhbG9nLS1ib2R5LS1pbmZvLXBhcmFncmFwaCcpfVxuICAgICAgICA8L0dyb3VwRGlhbG9nLlBhcmFncmFwaD5cbiAgICAgIDwvPlxuICAgICk7XG4gIH0gZWxzZSB7XG4gICAgdGl0bGUgPSBpMThuKCdOZXdseUNyZWF0ZWRHcm91cEludml0ZWRDb250YWN0c0RpYWxvZy0tdGl0bGUtLW1hbnknLCBbXG4gICAgICBjb250YWN0cy5sZW5ndGgudG9TdHJpbmcoKSxcbiAgICBdKTtcbiAgICBib2R5ID0gKFxuICAgICAgPD5cbiAgICAgICAgPEdyb3VwRGlhbG9nLlBhcmFncmFwaD5cbiAgICAgICAgICB7aTE4bihcbiAgICAgICAgICAgICdOZXdseUNyZWF0ZWRHcm91cEludml0ZWRDb250YWN0c0RpYWxvZy0tYm9keS0tdXNlci1wYXJhZ3JhcGgtLW1hbnknXG4gICAgICAgICAgKX1cbiAgICAgICAgPC9Hcm91cERpYWxvZy5QYXJhZ3JhcGg+XG4gICAgICAgIDxHcm91cERpYWxvZy5QYXJhZ3JhcGg+XG4gICAgICAgICAge2kxOG4oJ05ld2x5Q3JlYXRlZEdyb3VwSW52aXRlZENvbnRhY3RzRGlhbG9nLS1ib2R5LS1pbmZvLXBhcmFncmFwaCcpfVxuICAgICAgICA8L0dyb3VwRGlhbG9nLlBhcmFncmFwaD5cbiAgICAgICAgPEdyb3VwRGlhbG9nLkNvbnRhY3RzXG4gICAgICAgICAgY29udGFjdHM9e2NvbnRhY3RzfVxuICAgICAgICAgIGdldFByZWZlcnJlZEJhZGdlPXtnZXRQcmVmZXJyZWRCYWRnZX1cbiAgICAgICAgICBpMThuPXtpMThufVxuICAgICAgICAgIHRoZW1lPXt0aGVtZX1cbiAgICAgICAgLz5cbiAgICAgIDwvPlxuICAgICk7XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxHcm91cERpYWxvZ1xuICAgICAgaTE4bj17aTE4bn1cbiAgICAgIG9uQ2xpY2tQcmltYXJ5QnV0dG9uPXtvbkNsb3NlfVxuICAgICAgcHJpbWFyeUJ1dHRvblRleHQ9e2kxOG4oJ0NvbmZpcm1hdGlvbi0tY29uZmlybScpfVxuICAgICAgc2Vjb25kYXJ5QnV0dG9uVGV4dD17aTE4bihcbiAgICAgICAgJ05ld2x5Q3JlYXRlZEdyb3VwSW52aXRlZENvbnRhY3RzRGlhbG9nLS1ib2R5LS1sZWFybi1tb3JlJ1xuICAgICAgKX1cbiAgICAgIG9uQ2xpY2tTZWNvbmRhcnlCdXR0b249eygpID0+IHtcbiAgICAgICAgb3BlbkxpbmtJbldlYkJyb3dzZXIoXG4gICAgICAgICAgJ2h0dHBzOi8vc3VwcG9ydC5zaWduYWwub3JnL2hjL2FydGljbGVzLzM2MDAwNzMxOTMzMS1Hcm91cC1jaGF0cydcbiAgICAgICAgKTtcbiAgICAgIH19XG4gICAgICBvbkNsb3NlPXtvbkNsb3NlfVxuICAgICAgdGl0bGU9e3RpdGxlfVxuICAgID5cbiAgICAgIHtib2R5fVxuICAgIDwvR3JvdXBEaWFsb2c+XG4gICk7XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUlBLG1CQUFrQjtBQUtsQixrQkFBcUI7QUFDckIseUJBQTRCO0FBQzVCLHlCQUE0QjtBQUM1QixrQ0FBcUM7QUFVOUIsTUFBTSx5Q0FFVCx3QkFBQyxFQUFFLFVBQVUsbUJBQW1CLE1BQU0sU0FBUyxZQUFZO0FBQzdELE1BQUk7QUFDSixNQUFJO0FBQ0osTUFBSSxTQUFTLFdBQVcsR0FBRztBQUN6QixVQUFNLFVBQVUsU0FBUztBQUV6QixZQUFRLEtBQUssb0RBQW9EO0FBQ2pFLFdBQ0Usd0ZBQ0UsbURBQUMsK0JBQVksV0FBWixNQUNDLG1EQUFDO0FBQUEsTUFDQztBQUFBLE1BQ0EsSUFBRztBQUFBLE1BQ0gsWUFBWSxDQUFDLG1EQUFDO0FBQUEsUUFBWSxPQUFPLFFBQVE7QUFBQSxPQUFPLENBQUU7QUFBQSxLQUNwRCxDQUNGLEdBQ0EsbURBQUMsK0JBQVksV0FBWixNQUNFLEtBQUssOERBQThELENBQ3RFLENBQ0Y7QUFBQSxFQUVKLE9BQU87QUFDTCxZQUFRLEtBQUssdURBQXVEO0FBQUEsTUFDbEUsU0FBUyxPQUFPLFNBQVM7QUFBQSxJQUMzQixDQUFDO0FBQ0QsV0FDRSx3RkFDRSxtREFBQywrQkFBWSxXQUFaLE1BQ0UsS0FDQyxvRUFDRixDQUNGLEdBQ0EsbURBQUMsK0JBQVksV0FBWixNQUNFLEtBQUssOERBQThELENBQ3RFLEdBQ0EsbURBQUMsK0JBQVksVUFBWjtBQUFBLE1BQ0M7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxLQUNGLENBQ0Y7QUFBQSxFQUVKO0FBRUEsU0FDRSxtREFBQztBQUFBLElBQ0M7QUFBQSxJQUNBLHNCQUFzQjtBQUFBLElBQ3RCLG1CQUFtQixLQUFLLHVCQUF1QjtBQUFBLElBQy9DLHFCQUFxQixLQUNuQiwwREFDRjtBQUFBLElBQ0Esd0JBQXdCLE1BQU07QUFDNUIsNERBQ0UsaUVBQ0Y7QUFBQSxJQUNGO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxLQUVDLElBQ0g7QUFFSixHQWhFSTsiLAogICJuYW1lcyI6IFtdCn0K
