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
var PhoneNumberCheckbox_exports = {};
__export(PhoneNumberCheckbox_exports, {
  PhoneNumberCheckbox: () => PhoneNumberCheckbox
});
module.exports = __toCommonJS(PhoneNumberCheckbox_exports);
var import_react = __toESM(require("react"));
var import_Button = require("../Button");
var import_ConfirmationDialog = require("../ConfirmationDialog");
var import_BaseConversationListItem = require("./BaseConversationListItem");
var import_Colors = require("../../types/Colors");
const PhoneNumberCheckbox = import_react.default.memo(/* @__PURE__ */ __name(function PhoneNumberCheckbox2({
  phoneNumber,
  isChecked,
  isFetching,
  theme,
  i18n,
  lookupConversationWithoutUuid,
  showUserNotFoundModal,
  setIsFetchingUUID,
  toggleConversationInChooseMembers
}) {
  const [isModalVisible, setIsModalVisible] = (0, import_react.useState)(false);
  const onClickItem = import_react.default.useCallback(async () => {
    if (!phoneNumber.isValid) {
      setIsModalVisible(true);
      return;
    }
    if (isFetching) {
      return;
    }
    const conversationId = await lookupConversationWithoutUuid({
      showUserNotFoundModal,
      setIsFetchingUUID,
      type: "e164",
      e164: phoneNumber.e164,
      phoneNumber: phoneNumber.userInput
    });
    if (conversationId !== void 0) {
      toggleConversationInChooseMembers(conversationId);
    }
  }, [
    isFetching,
    toggleConversationInChooseMembers,
    lookupConversationWithoutUuid,
    showUserNotFoundModal,
    setIsFetchingUUID,
    setIsModalVisible,
    phoneNumber
  ]);
  let modal;
  if (isModalVisible) {
    modal = /* @__PURE__ */ import_react.default.createElement(import_ConfirmationDialog.ConfirmationDialog, {
      cancelText: i18n("ok"),
      cancelButtonVariant: import_Button.ButtonVariant.Secondary,
      i18n,
      onClose: () => setIsModalVisible(false)
    }, i18n("startConversation--phone-number-not-valid", {
      phoneNumber: phoneNumber.userInput
    }));
  }
  return /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement(import_BaseConversationListItem.BaseConversationListItem, {
    acceptedMessageRequest: false,
    checked: isChecked,
    color: import_Colors.AvatarColors[0],
    conversationType: "direct",
    headerName: phoneNumber.userInput,
    i18n,
    isMe: false,
    isSelected: false,
    onClick: onClickItem,
    phoneNumber: phoneNumber.userInput,
    shouldShowSpinner: isFetching,
    theme,
    sharedGroupNames: [],
    title: phoneNumber.userInput
  }), modal);
}, "PhoneNumberCheckbox"));
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PhoneNumberCheckbox
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiUGhvbmVOdW1iZXJDaGVja2JveC50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHR5cGUgeyBGdW5jdGlvbkNvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgQnV0dG9uVmFyaWFudCB9IGZyb20gJy4uL0J1dHRvbic7XG5pbXBvcnQgeyBDb25maXJtYXRpb25EaWFsb2cgfSBmcm9tICcuLi9Db25maXJtYXRpb25EaWFsb2cnO1xuaW1wb3J0IHsgQmFzZUNvbnZlcnNhdGlvbkxpc3RJdGVtIH0gZnJvbSAnLi9CYXNlQ29udmVyc2F0aW9uTGlzdEl0ZW0nO1xuaW1wb3J0IHR5cGUgeyBQYXJzZWRFMTY0VHlwZSB9IGZyb20gJy4uLy4uL3V0aWwvbGlicGhvbmVudW1iZXJJbnN0YW5jZSc7XG5pbXBvcnQgdHlwZSB7IExvY2FsaXplclR5cGUsIFRoZW1lVHlwZSB9IGZyb20gJy4uLy4uL3R5cGVzL1V0aWwnO1xuaW1wb3J0IHsgQXZhdGFyQ29sb3JzIH0gZnJvbSAnLi4vLi4vdHlwZXMvQ29sb3JzJztcbmltcG9ydCB0eXBlIHsgTG9va3VwQ29udmVyc2F0aW9uV2l0aG91dFV1aWRBY3Rpb25zVHlwZSB9IGZyb20gJy4uLy4uL3V0aWwvbG9va3VwQ29udmVyc2F0aW9uV2l0aG91dFV1aWQnO1xuXG5leHBvcnQgdHlwZSBQcm9wc0RhdGFUeXBlID0ge1xuICBwaG9uZU51bWJlcjogUGFyc2VkRTE2NFR5cGU7XG4gIGlzQ2hlY2tlZDogYm9vbGVhbjtcbiAgaXNGZXRjaGluZzogYm9vbGVhbjtcbn07XG5cbnR5cGUgUHJvcHNIb3VzZWtlZXBpbmdUeXBlID0ge1xuICBpMThuOiBMb2NhbGl6ZXJUeXBlO1xuICB0aGVtZTogVGhlbWVUeXBlO1xuICB0b2dnbGVDb252ZXJzYXRpb25JbkNob29zZU1lbWJlcnM6IChjb252ZXJzYXRpb25JZDogc3RyaW5nKSA9PiB2b2lkO1xufSAmIExvb2t1cENvbnZlcnNhdGlvbldpdGhvdXRVdWlkQWN0aW9uc1R5cGU7XG5cbnR5cGUgUHJvcHNUeXBlID0gUHJvcHNEYXRhVHlwZSAmIFByb3BzSG91c2VrZWVwaW5nVHlwZTtcblxuZXhwb3J0IGNvbnN0IFBob25lTnVtYmVyQ2hlY2tib3g6IEZ1bmN0aW9uQ29tcG9uZW50PFByb3BzVHlwZT4gPSBSZWFjdC5tZW1vKFxuICBmdW5jdGlvbiBQaG9uZU51bWJlckNoZWNrYm94KHtcbiAgICBwaG9uZU51bWJlcixcbiAgICBpc0NoZWNrZWQsXG4gICAgaXNGZXRjaGluZyxcbiAgICB0aGVtZSxcbiAgICBpMThuLFxuICAgIGxvb2t1cENvbnZlcnNhdGlvbldpdGhvdXRVdWlkLFxuICAgIHNob3dVc2VyTm90Rm91bmRNb2RhbCxcbiAgICBzZXRJc0ZldGNoaW5nVVVJRCxcbiAgICB0b2dnbGVDb252ZXJzYXRpb25JbkNob29zZU1lbWJlcnMsXG4gIH0pIHtcbiAgICBjb25zdCBbaXNNb2RhbFZpc2libGUsIHNldElzTW9kYWxWaXNpYmxlXSA9IHVzZVN0YXRlKGZhbHNlKTtcblxuICAgIGNvbnN0IG9uQ2xpY2tJdGVtID0gUmVhY3QudXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xuICAgICAgaWYgKCFwaG9uZU51bWJlci5pc1ZhbGlkKSB7XG4gICAgICAgIHNldElzTW9kYWxWaXNpYmxlKHRydWUpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoaXNGZXRjaGluZykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGNvbnZlcnNhdGlvbklkID0gYXdhaXQgbG9va3VwQ29udmVyc2F0aW9uV2l0aG91dFV1aWQoe1xuICAgICAgICBzaG93VXNlck5vdEZvdW5kTW9kYWwsXG4gICAgICAgIHNldElzRmV0Y2hpbmdVVUlELFxuXG4gICAgICAgIHR5cGU6ICdlMTY0JyxcbiAgICAgICAgZTE2NDogcGhvbmVOdW1iZXIuZTE2NCxcbiAgICAgICAgcGhvbmVOdW1iZXI6IHBob25lTnVtYmVyLnVzZXJJbnB1dCxcbiAgICAgIH0pO1xuXG4gICAgICBpZiAoY29udmVyc2F0aW9uSWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0b2dnbGVDb252ZXJzYXRpb25JbkNob29zZU1lbWJlcnMoY29udmVyc2F0aW9uSWQpO1xuICAgICAgfVxuICAgIH0sIFtcbiAgICAgIGlzRmV0Y2hpbmcsXG4gICAgICB0b2dnbGVDb252ZXJzYXRpb25JbkNob29zZU1lbWJlcnMsXG4gICAgICBsb29rdXBDb252ZXJzYXRpb25XaXRob3V0VXVpZCxcbiAgICAgIHNob3dVc2VyTm90Rm91bmRNb2RhbCxcbiAgICAgIHNldElzRmV0Y2hpbmdVVUlELFxuICAgICAgc2V0SXNNb2RhbFZpc2libGUsXG4gICAgICBwaG9uZU51bWJlcixcbiAgICBdKTtcblxuICAgIGxldCBtb2RhbDogSlNYLkVsZW1lbnQgfCB1bmRlZmluZWQ7XG4gICAgaWYgKGlzTW9kYWxWaXNpYmxlKSB7XG4gICAgICBtb2RhbCA9IChcbiAgICAgICAgPENvbmZpcm1hdGlvbkRpYWxvZ1xuICAgICAgICAgIGNhbmNlbFRleHQ9e2kxOG4oJ29rJyl9XG4gICAgICAgICAgY2FuY2VsQnV0dG9uVmFyaWFudD17QnV0dG9uVmFyaWFudC5TZWNvbmRhcnl9XG4gICAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgICBvbkNsb3NlPXsoKSA9PiBzZXRJc01vZGFsVmlzaWJsZShmYWxzZSl9XG4gICAgICAgID5cbiAgICAgICAgICB7aTE4bignc3RhcnRDb252ZXJzYXRpb24tLXBob25lLW51bWJlci1ub3QtdmFsaWQnLCB7XG4gICAgICAgICAgICBwaG9uZU51bWJlcjogcGhvbmVOdW1iZXIudXNlcklucHV0LFxuICAgICAgICAgIH0pfVxuICAgICAgICA8L0NvbmZpcm1hdGlvbkRpYWxvZz5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDw+XG4gICAgICAgIDxCYXNlQ29udmVyc2F0aW9uTGlzdEl0ZW1cbiAgICAgICAgICBhY2NlcHRlZE1lc3NhZ2VSZXF1ZXN0PXtmYWxzZX1cbiAgICAgICAgICBjaGVja2VkPXtpc0NoZWNrZWR9XG4gICAgICAgICAgY29sb3I9e0F2YXRhckNvbG9yc1swXX1cbiAgICAgICAgICBjb252ZXJzYXRpb25UeXBlPVwiZGlyZWN0XCJcbiAgICAgICAgICBoZWFkZXJOYW1lPXtwaG9uZU51bWJlci51c2VySW5wdXR9XG4gICAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgICBpc01lPXtmYWxzZX1cbiAgICAgICAgICBpc1NlbGVjdGVkPXtmYWxzZX1cbiAgICAgICAgICBvbkNsaWNrPXtvbkNsaWNrSXRlbX1cbiAgICAgICAgICBwaG9uZU51bWJlcj17cGhvbmVOdW1iZXIudXNlcklucHV0fVxuICAgICAgICAgIHNob3VsZFNob3dTcGlubmVyPXtpc0ZldGNoaW5nfVxuICAgICAgICAgIHRoZW1lPXt0aGVtZX1cbiAgICAgICAgICBzaGFyZWRHcm91cE5hbWVzPXtbXX1cbiAgICAgICAgICB0aXRsZT17cGhvbmVOdW1iZXIudXNlcklucHV0fVxuICAgICAgICAvPlxuICAgICAgICB7bW9kYWx9XG4gICAgICA8Lz5cbiAgICApO1xuICB9XG4pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUlBLG1CQUFnQztBQUVoQyxvQkFBOEI7QUFDOUIsZ0NBQW1DO0FBQ25DLHNDQUF5QztBQUd6QyxvQkFBNkI7QUFpQnRCLE1BQU0sc0JBQW9ELHFCQUFNLEtBQ3JFLHFEQUE2QjtBQUFBLEVBQzNCO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxHQUNDO0FBQ0QsUUFBTSxDQUFDLGdCQUFnQixxQkFBcUIsMkJBQVMsS0FBSztBQUUxRCxRQUFNLGNBQWMscUJBQU0sWUFBWSxZQUFZO0FBQ2hELFFBQUksQ0FBQyxZQUFZLFNBQVM7QUFDeEIsd0JBQWtCLElBQUk7QUFDdEI7QUFBQSxJQUNGO0FBQ0EsUUFBSSxZQUFZO0FBQ2Q7QUFBQSxJQUNGO0FBRUEsVUFBTSxpQkFBaUIsTUFBTSw4QkFBOEI7QUFBQSxNQUN6RDtBQUFBLE1BQ0E7QUFBQSxNQUVBLE1BQU07QUFBQSxNQUNOLE1BQU0sWUFBWTtBQUFBLE1BQ2xCLGFBQWEsWUFBWTtBQUFBLElBQzNCLENBQUM7QUFFRCxRQUFJLG1CQUFtQixRQUFXO0FBQ2hDLHdDQUFrQyxjQUFjO0FBQUEsSUFDbEQ7QUFBQSxFQUNGLEdBQUc7QUFBQSxJQUNEO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsRUFDRixDQUFDO0FBRUQsTUFBSTtBQUNKLE1BQUksZ0JBQWdCO0FBQ2xCLFlBQ0UsbURBQUM7QUFBQSxNQUNDLFlBQVksS0FBSyxJQUFJO0FBQUEsTUFDckIscUJBQXFCLDRCQUFjO0FBQUEsTUFDbkM7QUFBQSxNQUNBLFNBQVMsTUFBTSxrQkFBa0IsS0FBSztBQUFBLE9BRXJDLEtBQUssNkNBQTZDO0FBQUEsTUFDakQsYUFBYSxZQUFZO0FBQUEsSUFDM0IsQ0FBQyxDQUNIO0FBQUEsRUFFSjtBQUVBLFNBQ0Usd0ZBQ0UsbURBQUM7QUFBQSxJQUNDLHdCQUF3QjtBQUFBLElBQ3hCLFNBQVM7QUFBQSxJQUNULE9BQU8sMkJBQWE7QUFBQSxJQUNwQixrQkFBaUI7QUFBQSxJQUNqQixZQUFZLFlBQVk7QUFBQSxJQUN4QjtBQUFBLElBQ0EsTUFBTTtBQUFBLElBQ04sWUFBWTtBQUFBLElBQ1osU0FBUztBQUFBLElBQ1QsYUFBYSxZQUFZO0FBQUEsSUFDekIsbUJBQW1CO0FBQUEsSUFDbkI7QUFBQSxJQUNBLGtCQUFrQixDQUFDO0FBQUEsSUFDbkIsT0FBTyxZQUFZO0FBQUEsR0FDckIsR0FDQyxLQUNIO0FBRUosR0FqRkEsc0JBa0ZGOyIsCiAgIm5hbWVzIjogW10KfQo=
