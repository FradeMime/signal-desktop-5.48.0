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
var SafetyNumberChangeDialog_exports = {};
__export(SafetyNumberChangeDialog_exports, {
  SafetyNumberChangeDialog: () => SafetyNumberChangeDialog
});
module.exports = __toCommonJS(SafetyNumberChangeDialog_exports);
var React = __toESM(require("react"));
var import_lodash = require("lodash");
var import_Avatar = require("./Avatar");
var import_ConfirmationDialog = require("./ConfirmationDialog");
var import_InContactsIcon = require("./InContactsIcon");
var import_Modal = require("./Modal");
var import_isInSystemContacts = require("../util/isInSystemContacts");
const SafetyNumberChangeDialog = /* @__PURE__ */ __name(({
  confirmText,
  contacts,
  getPreferredBadge,
  i18n,
  onCancel,
  onConfirm,
  renderSafetyNumber,
  theme
}) => {
  const [selectedContact, setSelectedContact] = React.useState(void 0);
  const cancelButtonRef = React.createRef();
  React.useEffect(() => {
    if (cancelButtonRef && cancelButtonRef.current) {
      cancelButtonRef.current.focus();
    }
  }, [cancelButtonRef, contacts]);
  const onClose = selectedContact ? () => {
    setSelectedContact(void 0);
  } : onCancel;
  if (selectedContact) {
    return /* @__PURE__ */ React.createElement(import_Modal.Modal, {
      hasXButton: true,
      i18n,
      onClose
    }, renderSafetyNumber({ contactID: selectedContact.id, onClose }));
  }
  return /* @__PURE__ */ React.createElement(import_ConfirmationDialog.ConfirmationDialog, {
    actions: [
      {
        action: onConfirm,
        text: confirmText || i18n("sendMessageToContact"),
        style: "affirmative"
      }
    ],
    i18n,
    onCancel: onClose,
    onClose: import_lodash.noop,
    title: i18n("safetyNumberChanges")
  }, /* @__PURE__ */ React.createElement("div", {
    className: "module-SafetyNumberChangeDialog__message"
  }, i18n("changedVerificationWarning")), /* @__PURE__ */ React.createElement("ul", {
    className: "module-SafetyNumberChangeDialog__contacts"
  }, contacts.map((contact) => {
    const shouldShowNumber = Boolean(contact.name || contact.profileName);
    return /* @__PURE__ */ React.createElement("li", {
      className: "module-SafetyNumberChangeDialog__contact",
      key: contact.id
    }, /* @__PURE__ */ React.createElement(import_Avatar.Avatar, {
      acceptedMessageRequest: contact.acceptedMessageRequest,
      avatarPath: contact.avatarPath,
      badge: getPreferredBadge(contact.badges),
      color: contact.color,
      conversationType: "direct",
      i18n,
      isMe: contact.isMe,
      name: contact.name,
      phoneNumber: contact.phoneNumber,
      profileName: contact.profileName,
      theme,
      title: contact.title,
      sharedGroupNames: contact.sharedGroupNames,
      size: 52,
      unblurredAvatarPath: contact.unblurredAvatarPath
    }), /* @__PURE__ */ React.createElement("div", {
      className: "module-SafetyNumberChangeDialog__contact--wrapper"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "module-SafetyNumberChangeDialog__contact--name"
    }, contact.title, (0, import_isInSystemContacts.isInSystemContacts)(contact) ? /* @__PURE__ */ React.createElement("span", null, " ", /* @__PURE__ */ React.createElement(import_InContactsIcon.InContactsIcon, {
      i18n
    })) : null), shouldShowNumber ? /* @__PURE__ */ React.createElement("div", {
      className: "module-SafetyNumberChangeDialog__contact--number"
    }, contact.phoneNumber) : null), /* @__PURE__ */ React.createElement("button", {
      className: "module-SafetyNumberChangeDialog__contact--view",
      onClick: () => {
        setSelectedContact(contact);
      },
      tabIndex: 0,
      type: "button"
    }, i18n("view")));
  })));
}, "SafetyNumberChangeDialog");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SafetyNumberChangeDialog
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiU2FmZXR5TnVtYmVyQ2hhbmdlRGlhbG9nLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjAtMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IG5vb3AgfSBmcm9tICdsb2Rhc2gnO1xuXG5pbXBvcnQgeyBBdmF0YXIgfSBmcm9tICcuL0F2YXRhcic7XG5pbXBvcnQgeyBDb25maXJtYXRpb25EaWFsb2cgfSBmcm9tICcuL0NvbmZpcm1hdGlvbkRpYWxvZyc7XG5pbXBvcnQgeyBJbkNvbnRhY3RzSWNvbiB9IGZyb20gJy4vSW5Db250YWN0c0ljb24nO1xuaW1wb3J0IHsgTW9kYWwgfSBmcm9tICcuL01vZGFsJztcblxuaW1wb3J0IHR5cGUgeyBDb252ZXJzYXRpb25UeXBlIH0gZnJvbSAnLi4vc3RhdGUvZHVja3MvY29udmVyc2F0aW9ucyc7XG5pbXBvcnQgdHlwZSB7IFByZWZlcnJlZEJhZGdlU2VsZWN0b3JUeXBlIH0gZnJvbSAnLi4vc3RhdGUvc2VsZWN0b3JzL2JhZGdlcyc7XG5pbXBvcnQgdHlwZSB7IExvY2FsaXplclR5cGUsIFRoZW1lVHlwZSB9IGZyb20gJy4uL3R5cGVzL1V0aWwnO1xuaW1wb3J0IHsgaXNJblN5c3RlbUNvbnRhY3RzIH0gZnJvbSAnLi4vdXRpbC9pc0luU3lzdGVtQ29udGFjdHMnO1xuXG5leHBvcnQgdHlwZSBTYWZldHlOdW1iZXJQcm9wcyA9IHtcbiAgY29udGFjdElEOiBzdHJpbmc7XG4gIG9uQ2xvc2U6ICgpID0+IHZvaWQ7XG59O1xuXG5leHBvcnQgdHlwZSBQcm9wcyA9IHtcbiAgcmVhZG9ubHkgY29uZmlybVRleHQ/OiBzdHJpbmc7XG4gIHJlYWRvbmx5IGNvbnRhY3RzOiBBcnJheTxDb252ZXJzYXRpb25UeXBlPjtcbiAgcmVhZG9ubHkgZ2V0UHJlZmVycmVkQmFkZ2U6IFByZWZlcnJlZEJhZGdlU2VsZWN0b3JUeXBlO1xuICByZWFkb25seSBpMThuOiBMb2NhbGl6ZXJUeXBlO1xuICByZWFkb25seSBvbkNhbmNlbDogKCkgPT4gdm9pZDtcbiAgcmVhZG9ubHkgb25Db25maXJtOiAoKSA9PiB2b2lkO1xuICByZWFkb25seSByZW5kZXJTYWZldHlOdW1iZXI6IChwcm9wczogU2FmZXR5TnVtYmVyUHJvcHMpID0+IEpTWC5FbGVtZW50O1xuICByZWFkb25seSB0aGVtZTogVGhlbWVUeXBlO1xufTtcblxuZXhwb3J0IGNvbnN0IFNhZmV0eU51bWJlckNoYW5nZURpYWxvZyA9ICh7XG4gIGNvbmZpcm1UZXh0LFxuICBjb250YWN0cyxcbiAgZ2V0UHJlZmVycmVkQmFkZ2UsXG4gIGkxOG4sXG4gIG9uQ2FuY2VsLFxuICBvbkNvbmZpcm0sXG4gIHJlbmRlclNhZmV0eU51bWJlcixcbiAgdGhlbWUsXG59OiBQcm9wcyk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgW3NlbGVjdGVkQ29udGFjdCwgc2V0U2VsZWN0ZWRDb250YWN0XSA9IFJlYWN0LnVzZVN0YXRlPFxuICAgIENvbnZlcnNhdGlvblR5cGUgfCB1bmRlZmluZWRcbiAgPih1bmRlZmluZWQpO1xuICBjb25zdCBjYW5jZWxCdXR0b25SZWYgPSBSZWFjdC5jcmVhdGVSZWY8SFRNTEJ1dHRvbkVsZW1lbnQ+KCk7XG5cbiAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoY2FuY2VsQnV0dG9uUmVmICYmIGNhbmNlbEJ1dHRvblJlZi5jdXJyZW50KSB7XG4gICAgICBjYW5jZWxCdXR0b25SZWYuY3VycmVudC5mb2N1cygpO1xuICAgIH1cbiAgfSwgW2NhbmNlbEJ1dHRvblJlZiwgY29udGFjdHNdKTtcblxuICBjb25zdCBvbkNsb3NlID0gc2VsZWN0ZWRDb250YWN0XG4gICAgPyAoKSA9PiB7XG4gICAgICAgIHNldFNlbGVjdGVkQ29udGFjdCh1bmRlZmluZWQpO1xuICAgICAgfVxuICAgIDogb25DYW5jZWw7XG5cbiAgaWYgKHNlbGVjdGVkQ29udGFjdCkge1xuICAgIHJldHVybiAoXG4gICAgICA8TW9kYWwgaGFzWEJ1dHRvbiBpMThuPXtpMThufSBvbkNsb3NlPXtvbkNsb3NlfT5cbiAgICAgICAge3JlbmRlclNhZmV0eU51bWJlcih7IGNvbnRhY3RJRDogc2VsZWN0ZWRDb250YWN0LmlkLCBvbkNsb3NlIH0pfVxuICAgICAgPC9Nb2RhbD5cbiAgICApO1xuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8Q29uZmlybWF0aW9uRGlhbG9nXG4gICAgICBhY3Rpb25zPXtbXG4gICAgICAgIHtcbiAgICAgICAgICBhY3Rpb246IG9uQ29uZmlybSxcbiAgICAgICAgICB0ZXh0OiBjb25maXJtVGV4dCB8fCBpMThuKCdzZW5kTWVzc2FnZVRvQ29udGFjdCcpLFxuICAgICAgICAgIHN0eWxlOiAnYWZmaXJtYXRpdmUnLFxuICAgICAgICB9LFxuICAgICAgXX1cbiAgICAgIGkxOG49e2kxOG59XG4gICAgICBvbkNhbmNlbD17b25DbG9zZX1cbiAgICAgIG9uQ2xvc2U9e25vb3B9XG4gICAgICB0aXRsZT17aTE4bignc2FmZXR5TnVtYmVyQ2hhbmdlcycpfVxuICAgID5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kdWxlLVNhZmV0eU51bWJlckNoYW5nZURpYWxvZ19fbWVzc2FnZVwiPlxuICAgICAgICB7aTE4bignY2hhbmdlZFZlcmlmaWNhdGlvbldhcm5pbmcnKX1cbiAgICAgIDwvZGl2PlxuICAgICAgPHVsIGNsYXNzTmFtZT1cIm1vZHVsZS1TYWZldHlOdW1iZXJDaGFuZ2VEaWFsb2dfX2NvbnRhY3RzXCI+XG4gICAgICAgIHtjb250YWN0cy5tYXAoKGNvbnRhY3Q6IENvbnZlcnNhdGlvblR5cGUpID0+IHtcbiAgICAgICAgICBjb25zdCBzaG91bGRTaG93TnVtYmVyID0gQm9vbGVhbihjb250YWN0Lm5hbWUgfHwgY29udGFjdC5wcm9maWxlTmFtZSk7XG5cbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGxpXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cIm1vZHVsZS1TYWZldHlOdW1iZXJDaGFuZ2VEaWFsb2dfX2NvbnRhY3RcIlxuICAgICAgICAgICAgICBrZXk9e2NvbnRhY3QuaWR9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxBdmF0YXJcbiAgICAgICAgICAgICAgICBhY2NlcHRlZE1lc3NhZ2VSZXF1ZXN0PXtjb250YWN0LmFjY2VwdGVkTWVzc2FnZVJlcXVlc3R9XG4gICAgICAgICAgICAgICAgYXZhdGFyUGF0aD17Y29udGFjdC5hdmF0YXJQYXRofVxuICAgICAgICAgICAgICAgIGJhZGdlPXtnZXRQcmVmZXJyZWRCYWRnZShjb250YWN0LmJhZGdlcyl9XG4gICAgICAgICAgICAgICAgY29sb3I9e2NvbnRhY3QuY29sb3J9XG4gICAgICAgICAgICAgICAgY29udmVyc2F0aW9uVHlwZT1cImRpcmVjdFwiXG4gICAgICAgICAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgICAgICAgICBpc01lPXtjb250YWN0LmlzTWV9XG4gICAgICAgICAgICAgICAgbmFtZT17Y29udGFjdC5uYW1lfVxuICAgICAgICAgICAgICAgIHBob25lTnVtYmVyPXtjb250YWN0LnBob25lTnVtYmVyfVxuICAgICAgICAgICAgICAgIHByb2ZpbGVOYW1lPXtjb250YWN0LnByb2ZpbGVOYW1lfVxuICAgICAgICAgICAgICAgIHRoZW1lPXt0aGVtZX1cbiAgICAgICAgICAgICAgICB0aXRsZT17Y29udGFjdC50aXRsZX1cbiAgICAgICAgICAgICAgICBzaGFyZWRHcm91cE5hbWVzPXtjb250YWN0LnNoYXJlZEdyb3VwTmFtZXN9XG4gICAgICAgICAgICAgICAgc2l6ZT17NTJ9XG4gICAgICAgICAgICAgICAgdW5ibHVycmVkQXZhdGFyUGF0aD17Y29udGFjdC51bmJsdXJyZWRBdmF0YXJQYXRofVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZHVsZS1TYWZldHlOdW1iZXJDaGFuZ2VEaWFsb2dfX2NvbnRhY3QtLXdyYXBwZXJcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZHVsZS1TYWZldHlOdW1iZXJDaGFuZ2VEaWFsb2dfX2NvbnRhY3QtLW5hbWVcIj5cbiAgICAgICAgICAgICAgICAgIHtjb250YWN0LnRpdGxlfVxuICAgICAgICAgICAgICAgICAge2lzSW5TeXN0ZW1Db250YWN0cyhjb250YWN0KSA/IChcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgeycgJ31cbiAgICAgICAgICAgICAgICAgICAgICA8SW5Db250YWN0c0ljb24gaTE4bj17aTE4bn0gLz5cbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgKSA6IG51bGx9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAge3Nob3VsZFNob3dOdW1iZXIgPyAoXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZHVsZS1TYWZldHlOdW1iZXJDaGFuZ2VEaWFsb2dfX2NvbnRhY3QtLW51bWJlclwiPlxuICAgICAgICAgICAgICAgICAgICB7Y29udGFjdC5waG9uZU51bWJlcn1cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cIm1vZHVsZS1TYWZldHlOdW1iZXJDaGFuZ2VEaWFsb2dfX2NvbnRhY3QtLXZpZXdcIlxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgIHNldFNlbGVjdGVkQ29udGFjdChjb250YWN0KTtcbiAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgIHRhYkluZGV4PXswfVxuICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge2kxOG4oJ3ZpZXcnKX1cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICk7XG4gICAgICAgIH0pfVxuICAgICAgPC91bD5cbiAgICA8L0NvbmZpcm1hdGlvbkRpYWxvZz5cbiAgKTtcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsWUFBdUI7QUFDdkIsb0JBQXFCO0FBRXJCLG9CQUF1QjtBQUN2QixnQ0FBbUM7QUFDbkMsNEJBQStCO0FBQy9CLG1CQUFzQjtBQUt0QixnQ0FBbUM7QUFrQjVCLE1BQU0sMkJBQTJCLHdCQUFDO0FBQUEsRUFDdkM7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsTUFDd0I7QUFDeEIsUUFBTSxDQUFDLGlCQUFpQixzQkFBc0IsTUFBTSxTQUVsRCxNQUFTO0FBQ1gsUUFBTSxrQkFBa0IsTUFBTSxVQUE2QjtBQUUzRCxRQUFNLFVBQVUsTUFBTTtBQUNwQixRQUFJLG1CQUFtQixnQkFBZ0IsU0FBUztBQUM5QyxzQkFBZ0IsUUFBUSxNQUFNO0FBQUEsSUFDaEM7QUFBQSxFQUNGLEdBQUcsQ0FBQyxpQkFBaUIsUUFBUSxDQUFDO0FBRTlCLFFBQU0sVUFBVSxrQkFDWixNQUFNO0FBQ0osdUJBQW1CLE1BQVM7QUFBQSxFQUM5QixJQUNBO0FBRUosTUFBSSxpQkFBaUI7QUFDbkIsV0FDRSxvQ0FBQztBQUFBLE1BQU0sWUFBVTtBQUFBLE1BQUM7QUFBQSxNQUFZO0FBQUEsT0FDM0IsbUJBQW1CLEVBQUUsV0FBVyxnQkFBZ0IsSUFBSSxRQUFRLENBQUMsQ0FDaEU7QUFBQSxFQUVKO0FBRUEsU0FDRSxvQ0FBQztBQUFBLElBQ0MsU0FBUztBQUFBLE1BQ1A7QUFBQSxRQUNFLFFBQVE7QUFBQSxRQUNSLE1BQU0sZUFBZSxLQUFLLHNCQUFzQjtBQUFBLFFBQ2hELE9BQU87QUFBQSxNQUNUO0FBQUEsSUFDRjtBQUFBLElBQ0E7QUFBQSxJQUNBLFVBQVU7QUFBQSxJQUNWLFNBQVM7QUFBQSxJQUNULE9BQU8sS0FBSyxxQkFBcUI7QUFBQSxLQUVqQyxvQ0FBQztBQUFBLElBQUksV0FBVTtBQUFBLEtBQ1osS0FBSyw0QkFBNEIsQ0FDcEMsR0FDQSxvQ0FBQztBQUFBLElBQUcsV0FBVTtBQUFBLEtBQ1gsU0FBUyxJQUFJLENBQUMsWUFBOEI7QUFDM0MsVUFBTSxtQkFBbUIsUUFBUSxRQUFRLFFBQVEsUUFBUSxXQUFXO0FBRXBFLFdBQ0Usb0NBQUM7QUFBQSxNQUNDLFdBQVU7QUFBQSxNQUNWLEtBQUssUUFBUTtBQUFBLE9BRWIsb0NBQUM7QUFBQSxNQUNDLHdCQUF3QixRQUFRO0FBQUEsTUFDaEMsWUFBWSxRQUFRO0FBQUEsTUFDcEIsT0FBTyxrQkFBa0IsUUFBUSxNQUFNO0FBQUEsTUFDdkMsT0FBTyxRQUFRO0FBQUEsTUFDZixrQkFBaUI7QUFBQSxNQUNqQjtBQUFBLE1BQ0EsTUFBTSxRQUFRO0FBQUEsTUFDZCxNQUFNLFFBQVE7QUFBQSxNQUNkLGFBQWEsUUFBUTtBQUFBLE1BQ3JCLGFBQWEsUUFBUTtBQUFBLE1BQ3JCO0FBQUEsTUFDQSxPQUFPLFFBQVE7QUFBQSxNQUNmLGtCQUFrQixRQUFRO0FBQUEsTUFDMUIsTUFBTTtBQUFBLE1BQ04scUJBQXFCLFFBQVE7QUFBQSxLQUMvQixHQUNBLG9DQUFDO0FBQUEsTUFBSSxXQUFVO0FBQUEsT0FDYixvQ0FBQztBQUFBLE1BQUksV0FBVTtBQUFBLE9BQ1osUUFBUSxPQUNSLGtEQUFtQixPQUFPLElBQ3pCLG9DQUFDLGNBQ0UsS0FDRCxvQ0FBQztBQUFBLE1BQWU7QUFBQSxLQUFZLENBQzlCLElBQ0UsSUFDTixHQUNDLG1CQUNDLG9DQUFDO0FBQUEsTUFBSSxXQUFVO0FBQUEsT0FDWixRQUFRLFdBQ1gsSUFDRSxJQUNOLEdBQ0Esb0NBQUM7QUFBQSxNQUNDLFdBQVU7QUFBQSxNQUNWLFNBQVMsTUFBTTtBQUNiLDJCQUFtQixPQUFPO0FBQUEsTUFDNUI7QUFBQSxNQUNBLFVBQVU7QUFBQSxNQUNWLE1BQUs7QUFBQSxPQUVKLEtBQUssTUFBTSxDQUNkLENBQ0Y7QUFBQSxFQUVKLENBQUMsQ0FDSCxDQUNGO0FBRUosR0E5R3dDOyIsCiAgIm5hbWVzIjogW10KfQo=
