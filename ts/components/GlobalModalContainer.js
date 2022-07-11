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
var GlobalModalContainer_exports = {};
__export(GlobalModalContainer_exports, {
  GlobalModalContainer: () => GlobalModalContainer
});
module.exports = __toCommonJS(GlobalModalContainer_exports);
var import_react = __toESM(require("react"));
var import_missingCaseError = require("../util/missingCaseError");
var import_Button = require("./Button");
var import_ConfirmationDialog = require("./ConfirmationDialog");
var import_WhatsNewModal = require("./WhatsNewModal");
const GlobalModalContainer = /* @__PURE__ */ __name(({
  i18n,
  contactModalState,
  renderContactModal,
  isProfileEditorVisible,
  renderProfileEditor,
  safetyNumberModalContactId,
  renderSafetyNumber,
  hideUserNotFoundModal,
  userNotFoundModalState,
  hideWhatsNewModal,
  isWhatsNewVisible
}) => {
  if (safetyNumberModalContactId) {
    return renderSafetyNumber();
  }
  if (userNotFoundModalState) {
    let content;
    if (userNotFoundModalState.type === "phoneNumber") {
      content = i18n("startConversation--phone-number-not-found", {
        phoneNumber: userNotFoundModalState.phoneNumber
      });
    } else if (userNotFoundModalState.type === "username") {
      content = i18n("startConversation--username-not-found", {
        atUsername: i18n("at-username", {
          username: userNotFoundModalState.username
        })
      });
    } else {
      throw (0, import_missingCaseError.missingCaseError)(userNotFoundModalState);
    }
    return /* @__PURE__ */ import_react.default.createElement(import_ConfirmationDialog.ConfirmationDialog, {
      cancelText: i18n("ok"),
      cancelButtonVariant: import_Button.ButtonVariant.Secondary,
      i18n,
      onClose: hideUserNotFoundModal
    }, content);
  }
  if (contactModalState) {
    return renderContactModal();
  }
  if (isProfileEditorVisible) {
    return renderProfileEditor();
  }
  if (isWhatsNewVisible) {
    return /* @__PURE__ */ import_react.default.createElement(import_WhatsNewModal.WhatsNewModal, {
      hideWhatsNewModal,
      i18n
    });
  }
  return null;
}, "GlobalModalContainer");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GlobalModalContainer
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiR2xvYmFsTW9kYWxDb250YWluZXIudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgdHlwZSB7XG4gIENvbnRhY3RNb2RhbFN0YXRlVHlwZSxcbiAgVXNlck5vdEZvdW5kTW9kYWxTdGF0ZVR5cGUsXG59IGZyb20gJy4uL3N0YXRlL2R1Y2tzL2dsb2JhbE1vZGFscyc7XG5pbXBvcnQgdHlwZSB7IExvY2FsaXplclR5cGUgfSBmcm9tICcuLi90eXBlcy9VdGlsJztcbmltcG9ydCB7IG1pc3NpbmdDYXNlRXJyb3IgfSBmcm9tICcuLi91dGlsL21pc3NpbmdDYXNlRXJyb3InO1xuXG5pbXBvcnQgeyBCdXR0b25WYXJpYW50IH0gZnJvbSAnLi9CdXR0b24nO1xuaW1wb3J0IHsgQ29uZmlybWF0aW9uRGlhbG9nIH0gZnJvbSAnLi9Db25maXJtYXRpb25EaWFsb2cnO1xuaW1wb3J0IHsgV2hhdHNOZXdNb2RhbCB9IGZyb20gJy4vV2hhdHNOZXdNb2RhbCc7XG5cbnR5cGUgUHJvcHNUeXBlID0ge1xuICBpMThuOiBMb2NhbGl6ZXJUeXBlO1xuICAvLyBDb250YWN0TW9kYWxcbiAgY29udGFjdE1vZGFsU3RhdGU/OiBDb250YWN0TW9kYWxTdGF0ZVR5cGU7XG4gIHJlbmRlckNvbnRhY3RNb2RhbDogKCkgPT4gSlNYLkVsZW1lbnQ7XG4gIC8vIFByb2ZpbGVFZGl0b3JcbiAgaXNQcm9maWxlRWRpdG9yVmlzaWJsZTogYm9vbGVhbjtcbiAgcmVuZGVyUHJvZmlsZUVkaXRvcjogKCkgPT4gSlNYLkVsZW1lbnQ7XG4gIC8vIFNhZmV0eU51bWJlck1vZGFsXG4gIHNhZmV0eU51bWJlck1vZGFsQ29udGFjdElkPzogc3RyaW5nO1xuICByZW5kZXJTYWZldHlOdW1iZXI6ICgpID0+IEpTWC5FbGVtZW50O1xuICAvLyBVc2VyTm90Rm91bmRNb2RhbFxuICBoaWRlVXNlck5vdEZvdW5kTW9kYWw6ICgpID0+IHVua25vd247XG4gIHVzZXJOb3RGb3VuZE1vZGFsU3RhdGU/OiBVc2VyTm90Rm91bmRNb2RhbFN0YXRlVHlwZTtcbiAgLy8gV2hhdHNOZXdNb2RhbFxuICBpc1doYXRzTmV3VmlzaWJsZTogYm9vbGVhbjtcbiAgaGlkZVdoYXRzTmV3TW9kYWw6ICgpID0+IHVua25vd247XG59O1xuXG5leHBvcnQgY29uc3QgR2xvYmFsTW9kYWxDb250YWluZXIgPSAoe1xuICBpMThuLFxuICAvLyBDb250YWN0TW9kYWxcbiAgY29udGFjdE1vZGFsU3RhdGUsXG4gIHJlbmRlckNvbnRhY3RNb2RhbCxcbiAgLy8gUHJvZmlsZUVkaXRvclxuICBpc1Byb2ZpbGVFZGl0b3JWaXNpYmxlLFxuICByZW5kZXJQcm9maWxlRWRpdG9yLFxuICAvLyBTYWZldHlOdW1iZXJNb2RhbFxuICBzYWZldHlOdW1iZXJNb2RhbENvbnRhY3RJZCxcbiAgcmVuZGVyU2FmZXR5TnVtYmVyLFxuICAvLyBVc2VyTm90Rm91bmRNb2RhbFxuICBoaWRlVXNlck5vdEZvdW5kTW9kYWwsXG4gIHVzZXJOb3RGb3VuZE1vZGFsU3RhdGUsXG4gIC8vIFdoYXRzTmV3TW9kYWxcbiAgaGlkZVdoYXRzTmV3TW9kYWwsXG4gIGlzV2hhdHNOZXdWaXNpYmxlLFxufTogUHJvcHNUeXBlKTogSlNYLkVsZW1lbnQgfCBudWxsID0+IHtcbiAgaWYgKHNhZmV0eU51bWJlck1vZGFsQ29udGFjdElkKSB7XG4gICAgcmV0dXJuIHJlbmRlclNhZmV0eU51bWJlcigpO1xuICB9XG5cbiAgaWYgKHVzZXJOb3RGb3VuZE1vZGFsU3RhdGUpIHtcbiAgICBsZXQgY29udGVudDogc3RyaW5nO1xuICAgIGlmICh1c2VyTm90Rm91bmRNb2RhbFN0YXRlLnR5cGUgPT09ICdwaG9uZU51bWJlcicpIHtcbiAgICAgIGNvbnRlbnQgPSBpMThuKCdzdGFydENvbnZlcnNhdGlvbi0tcGhvbmUtbnVtYmVyLW5vdC1mb3VuZCcsIHtcbiAgICAgICAgcGhvbmVOdW1iZXI6IHVzZXJOb3RGb3VuZE1vZGFsU3RhdGUucGhvbmVOdW1iZXIsXG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKHVzZXJOb3RGb3VuZE1vZGFsU3RhdGUudHlwZSA9PT0gJ3VzZXJuYW1lJykge1xuICAgICAgY29udGVudCA9IGkxOG4oJ3N0YXJ0Q29udmVyc2F0aW9uLS11c2VybmFtZS1ub3QtZm91bmQnLCB7XG4gICAgICAgIGF0VXNlcm5hbWU6IGkxOG4oJ2F0LXVzZXJuYW1lJywge1xuICAgICAgICAgIHVzZXJuYW1lOiB1c2VyTm90Rm91bmRNb2RhbFN0YXRlLnVzZXJuYW1lLFxuICAgICAgICB9KSxcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBtaXNzaW5nQ2FzZUVycm9yKHVzZXJOb3RGb3VuZE1vZGFsU3RhdGUpO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8Q29uZmlybWF0aW9uRGlhbG9nXG4gICAgICAgIGNhbmNlbFRleHQ9e2kxOG4oJ29rJyl9XG4gICAgICAgIGNhbmNlbEJ1dHRvblZhcmlhbnQ9e0J1dHRvblZhcmlhbnQuU2Vjb25kYXJ5fVxuICAgICAgICBpMThuPXtpMThufVxuICAgICAgICBvbkNsb3NlPXtoaWRlVXNlck5vdEZvdW5kTW9kYWx9XG4gICAgICA+XG4gICAgICAgIHtjb250ZW50fVxuICAgICAgPC9Db25maXJtYXRpb25EaWFsb2c+XG4gICAgKTtcbiAgfVxuXG4gIGlmIChjb250YWN0TW9kYWxTdGF0ZSkge1xuICAgIHJldHVybiByZW5kZXJDb250YWN0TW9kYWwoKTtcbiAgfVxuXG4gIGlmIChpc1Byb2ZpbGVFZGl0b3JWaXNpYmxlKSB7XG4gICAgcmV0dXJuIHJlbmRlclByb2ZpbGVFZGl0b3IoKTtcbiAgfVxuXG4gIGlmIChpc1doYXRzTmV3VmlzaWJsZSkge1xuICAgIHJldHVybiA8V2hhdHNOZXdNb2RhbCBoaWRlV2hhdHNOZXdNb2RhbD17aGlkZVdoYXRzTmV3TW9kYWx9IGkxOG49e2kxOG59IC8+O1xuICB9XG5cbiAgcmV0dXJuIG51bGw7XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLG1CQUFrQjtBQU1sQiw4QkFBaUM7QUFFakMsb0JBQThCO0FBQzlCLGdDQUFtQztBQUNuQywyQkFBOEI7QUFxQnZCLE1BQU0sdUJBQXVCLHdCQUFDO0FBQUEsRUFDbkM7QUFBQSxFQUVBO0FBQUEsRUFDQTtBQUFBLEVBRUE7QUFBQSxFQUNBO0FBQUEsRUFFQTtBQUFBLEVBQ0E7QUFBQSxFQUVBO0FBQUEsRUFDQTtBQUFBLEVBRUE7QUFBQSxFQUNBO0FBQUEsTUFDbUM7QUFDbkMsTUFBSSw0QkFBNEI7QUFDOUIsV0FBTyxtQkFBbUI7QUFBQSxFQUM1QjtBQUVBLE1BQUksd0JBQXdCO0FBQzFCLFFBQUk7QUFDSixRQUFJLHVCQUF1QixTQUFTLGVBQWU7QUFDakQsZ0JBQVUsS0FBSyw2Q0FBNkM7QUFBQSxRQUMxRCxhQUFhLHVCQUF1QjtBQUFBLE1BQ3RDLENBQUM7QUFBQSxJQUNILFdBQVcsdUJBQXVCLFNBQVMsWUFBWTtBQUNyRCxnQkFBVSxLQUFLLHlDQUF5QztBQUFBLFFBQ3RELFlBQVksS0FBSyxlQUFlO0FBQUEsVUFDOUIsVUFBVSx1QkFBdUI7QUFBQSxRQUNuQyxDQUFDO0FBQUEsTUFDSCxDQUFDO0FBQUEsSUFDSCxPQUFPO0FBQ0wsWUFBTSw4Q0FBaUIsc0JBQXNCO0FBQUEsSUFDL0M7QUFFQSxXQUNFLG1EQUFDO0FBQUEsTUFDQyxZQUFZLEtBQUssSUFBSTtBQUFBLE1BQ3JCLHFCQUFxQiw0QkFBYztBQUFBLE1BQ25DO0FBQUEsTUFDQSxTQUFTO0FBQUEsT0FFUixPQUNIO0FBQUEsRUFFSjtBQUVBLE1BQUksbUJBQW1CO0FBQ3JCLFdBQU8sbUJBQW1CO0FBQUEsRUFDNUI7QUFFQSxNQUFJLHdCQUF3QjtBQUMxQixXQUFPLG9CQUFvQjtBQUFBLEVBQzdCO0FBRUEsTUFBSSxtQkFBbUI7QUFDckIsV0FBTyxtREFBQztBQUFBLE1BQWM7QUFBQSxNQUFzQztBQUFBLEtBQVk7QUFBQSxFQUMxRTtBQUVBLFNBQU87QUFDVCxHQS9Eb0M7IiwKICAibmFtZXMiOiBbXQp9Cg==
