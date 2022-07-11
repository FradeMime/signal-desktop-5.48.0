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
var StartNewConversation_exports = {};
__export(StartNewConversation_exports, {
  StartNewConversation: () => StartNewConversation
});
module.exports = __toCommonJS(StartNewConversation_exports);
var import_react = __toESM(require("react"));
var import_Button = require("../Button");
var import_ConfirmationDialog = require("../ConfirmationDialog");
var import_BaseConversationListItem = require("./BaseConversationListItem");
var import_Colors = require("../../types/Colors");
const StartNewConversation = import_react.default.memo(/* @__PURE__ */ __name(function StartNewConversation2({
  i18n,
  phoneNumber,
  isFetching,
  lookupConversationWithoutUuid,
  showUserNotFoundModal,
  setIsFetchingUUID,
  showConversation
}) {
  const [isModalVisible, setIsModalVisible] = (0, import_react.useState)(false);
  const boundOnClick = (0, import_react.useCallback)(async () => {
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
      showConversation({ conversationId });
    }
  }, [
    showConversation,
    lookupConversationWithoutUuid,
    showUserNotFoundModal,
    setIsFetchingUUID,
    setIsModalVisible,
    phoneNumber,
    isFetching
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
    color: import_Colors.AvatarColors[0],
    conversationType: "direct",
    headerName: phoneNumber.userInput,
    i18n,
    isMe: false,
    isSelected: false,
    onClick: boundOnClick,
    phoneNumber: phoneNumber.userInput,
    shouldShowSpinner: isFetching,
    sharedGroupNames: [],
    title: phoneNumber.userInput
  }), modal);
}, "StartNewConversation"));
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  StartNewConversation
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiU3RhcnROZXdDb252ZXJzYXRpb24udHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAxOS0yMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHR5cGUgeyBGdW5jdGlvbkNvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdCwgeyB1c2VDYWxsYmFjaywgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IEJ1dHRvblZhcmlhbnQgfSBmcm9tICcuLi9CdXR0b24nO1xuaW1wb3J0IHsgQ29uZmlybWF0aW9uRGlhbG9nIH0gZnJvbSAnLi4vQ29uZmlybWF0aW9uRGlhbG9nJztcbmltcG9ydCB7IEJhc2VDb252ZXJzYXRpb25MaXN0SXRlbSB9IGZyb20gJy4vQmFzZUNvbnZlcnNhdGlvbkxpc3RJdGVtJztcblxuaW1wb3J0IHR5cGUgeyBQYXJzZWRFMTY0VHlwZSB9IGZyb20gJy4uLy4uL3V0aWwvbGlicGhvbmVudW1iZXJJbnN0YW5jZSc7XG5pbXBvcnQgdHlwZSB7IExvb2t1cENvbnZlcnNhdGlvbldpdGhvdXRVdWlkQWN0aW9uc1R5cGUgfSBmcm9tICcuLi8uLi91dGlsL2xvb2t1cENvbnZlcnNhdGlvbldpdGhvdXRVdWlkJztcbmltcG9ydCB0eXBlIHsgTG9jYWxpemVyVHlwZSB9IGZyb20gJy4uLy4uL3R5cGVzL1V0aWwnO1xuaW1wb3J0IHR5cGUgeyBTaG93Q29udmVyc2F0aW9uVHlwZSB9IGZyb20gJy4uLy4uL3N0YXRlL2R1Y2tzL2NvbnZlcnNhdGlvbnMnO1xuaW1wb3J0IHsgQXZhdGFyQ29sb3JzIH0gZnJvbSAnLi4vLi4vdHlwZXMvQ29sb3JzJztcbi8vIGNyZWF0ZSBhIG5ldyBjb252ZXJzYXRpb24gYm94XG5cbnR5cGUgUHJvcHNEYXRhID0ge1xuICBwaG9uZU51bWJlcjogUGFyc2VkRTE2NFR5cGU7XG4gIGlzRmV0Y2hpbmc6IGJvb2xlYW47XG59O1xuXG50eXBlIFByb3BzSG91c2VrZWVwaW5nID0ge1xuICBpMThuOiBMb2NhbGl6ZXJUeXBlO1xuICBzaG93Q29udmVyc2F0aW9uOiBTaG93Q29udmVyc2F0aW9uVHlwZTtcbn0gJiBMb29rdXBDb252ZXJzYXRpb25XaXRob3V0VXVpZEFjdGlvbnNUeXBlO1xuXG5leHBvcnQgdHlwZSBQcm9wcyA9IFByb3BzRGF0YSAmIFByb3BzSG91c2VrZWVwaW5nO1xuXG5leHBvcnQgY29uc3QgU3RhcnROZXdDb252ZXJzYXRpb246IEZ1bmN0aW9uQ29tcG9uZW50PFByb3BzPiA9IFJlYWN0Lm1lbW8oXG4gIGZ1bmN0aW9uIFN0YXJ0TmV3Q29udmVyc2F0aW9uKHtcbiAgICBpMThuLFxuICAgIHBob25lTnVtYmVyLFxuICAgIGlzRmV0Y2hpbmcsXG4gICAgbG9va3VwQ29udmVyc2F0aW9uV2l0aG91dFV1aWQsXG4gICAgc2hvd1VzZXJOb3RGb3VuZE1vZGFsLFxuICAgIHNldElzRmV0Y2hpbmdVVUlELFxuICAgIHNob3dDb252ZXJzYXRpb24sXG4gIH0pIHtcbiAgICBjb25zdCBbaXNNb2RhbFZpc2libGUsIHNldElzTW9kYWxWaXNpYmxlXSA9IHVzZVN0YXRlKGZhbHNlKTtcblxuICAgIGNvbnN0IGJvdW5kT25DbGljayA9IHVzZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcbiAgICAgIGlmICghcGhvbmVOdW1iZXIuaXNWYWxpZCkge1xuICAgICAgICBzZXRJc01vZGFsVmlzaWJsZSh0cnVlKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKGlzRmV0Y2hpbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29uc3QgY29udmVyc2F0aW9uSWQgPSBhd2FpdCBsb29rdXBDb252ZXJzYXRpb25XaXRob3V0VXVpZCh7XG4gICAgICAgIHNob3dVc2VyTm90Rm91bmRNb2RhbCxcbiAgICAgICAgc2V0SXNGZXRjaGluZ1VVSUQsXG5cbiAgICAgICAgdHlwZTogJ2UxNjQnLFxuICAgICAgICBlMTY0OiBwaG9uZU51bWJlci5lMTY0LFxuICAgICAgICBwaG9uZU51bWJlcjogcGhvbmVOdW1iZXIudXNlcklucHV0LFxuICAgICAgfSk7XG5cbiAgICAgIGlmIChjb252ZXJzYXRpb25JZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHNob3dDb252ZXJzYXRpb24oeyBjb252ZXJzYXRpb25JZCB9KTtcbiAgICAgIH1cbiAgICB9LCBbXG4gICAgICBzaG93Q29udmVyc2F0aW9uLFxuICAgICAgbG9va3VwQ29udmVyc2F0aW9uV2l0aG91dFV1aWQsXG4gICAgICBzaG93VXNlck5vdEZvdW5kTW9kYWwsXG4gICAgICBzZXRJc0ZldGNoaW5nVVVJRCxcbiAgICAgIHNldElzTW9kYWxWaXNpYmxlLFxuICAgICAgcGhvbmVOdW1iZXIsXG4gICAgICBpc0ZldGNoaW5nLFxuICAgIF0pO1xuXG4gICAgbGV0IG1vZGFsOiBKU1guRWxlbWVudCB8IHVuZGVmaW5lZDtcbiAgICBpZiAoaXNNb2RhbFZpc2libGUpIHtcbiAgICAgIG1vZGFsID0gKFxuICAgICAgICA8Q29uZmlybWF0aW9uRGlhbG9nXG4gICAgICAgICAgY2FuY2VsVGV4dD17aTE4bignb2snKX1cbiAgICAgICAgICBjYW5jZWxCdXR0b25WYXJpYW50PXtCdXR0b25WYXJpYW50LlNlY29uZGFyeX1cbiAgICAgICAgICBpMThuPXtpMThufVxuICAgICAgICAgIG9uQ2xvc2U9eygpID0+IHNldElzTW9kYWxWaXNpYmxlKGZhbHNlKX1cbiAgICAgICAgPlxuICAgICAgICAgIHsvKiBwaG9uZSBudW1iZXIgaW52YWxpZCAqL31cbiAgICAgICAgICB7aTE4bignc3RhcnRDb252ZXJzYXRpb24tLXBob25lLW51bWJlci1ub3QtdmFsaWQnLCB7XG4gICAgICAgICAgICBwaG9uZU51bWJlcjogcGhvbmVOdW1iZXIudXNlcklucHV0LFxuICAgICAgICAgIH0pfVxuICAgICAgICA8L0NvbmZpcm1hdGlvbkRpYWxvZz5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDw+XG4gICAgICAgIDxCYXNlQ29udmVyc2F0aW9uTGlzdEl0ZW1cbiAgICAgICAgICBhY2NlcHRlZE1lc3NhZ2VSZXF1ZXN0PXtmYWxzZX1cbiAgICAgICAgICBjb2xvcj17QXZhdGFyQ29sb3JzWzBdfVxuICAgICAgICAgIGNvbnZlcnNhdGlvblR5cGU9XCJkaXJlY3RcIlxuICAgICAgICAgIGhlYWRlck5hbWU9e3Bob25lTnVtYmVyLnVzZXJJbnB1dH1cbiAgICAgICAgICBpMThuPXtpMThufVxuICAgICAgICAgIGlzTWU9e2ZhbHNlfVxuICAgICAgICAgIGlzU2VsZWN0ZWQ9e2ZhbHNlfVxuICAgICAgICAgIG9uQ2xpY2s9e2JvdW5kT25DbGlja31cbiAgICAgICAgICBwaG9uZU51bWJlcj17cGhvbmVOdW1iZXIudXNlcklucHV0fVxuICAgICAgICAgIHNob3VsZFNob3dTcGlubmVyPXtpc0ZldGNoaW5nfVxuICAgICAgICAgIHNoYXJlZEdyb3VwTmFtZXM9e1tdfVxuICAgICAgICAgIHRpdGxlPXtwaG9uZU51bWJlci51c2VySW5wdXR9XG4gICAgICAgIC8+XG4gICAgICAgIHttb2RhbH1cbiAgICAgIDwvPlxuICAgICk7XG4gIH1cbik7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSUEsbUJBQTZDO0FBRTdDLG9CQUE4QjtBQUM5QixnQ0FBbUM7QUFDbkMsc0NBQXlDO0FBTXpDLG9CQUE2QjtBQWV0QixNQUFNLHVCQUFpRCxxQkFBTSxLQUNsRSxzREFBOEI7QUFBQSxFQUM1QjtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEdBQ0M7QUFDRCxRQUFNLENBQUMsZ0JBQWdCLHFCQUFxQiwyQkFBUyxLQUFLO0FBRTFELFFBQU0sZUFBZSw4QkFBWSxZQUFZO0FBQzNDLFFBQUksQ0FBQyxZQUFZLFNBQVM7QUFDeEIsd0JBQWtCLElBQUk7QUFDdEI7QUFBQSxJQUNGO0FBQ0EsUUFBSSxZQUFZO0FBQ2Q7QUFBQSxJQUNGO0FBQ0EsVUFBTSxpQkFBaUIsTUFBTSw4QkFBOEI7QUFBQSxNQUN6RDtBQUFBLE1BQ0E7QUFBQSxNQUVBLE1BQU07QUFBQSxNQUNOLE1BQU0sWUFBWTtBQUFBLE1BQ2xCLGFBQWEsWUFBWTtBQUFBLElBQzNCLENBQUM7QUFFRCxRQUFJLG1CQUFtQixRQUFXO0FBQ2hDLHVCQUFpQixFQUFFLGVBQWUsQ0FBQztBQUFBLElBQ3JDO0FBQUEsRUFDRixHQUFHO0FBQUEsSUFDRDtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ0YsQ0FBQztBQUVELE1BQUk7QUFDSixNQUFJLGdCQUFnQjtBQUNsQixZQUNFLG1EQUFDO0FBQUEsTUFDQyxZQUFZLEtBQUssSUFBSTtBQUFBLE1BQ3JCLHFCQUFxQiw0QkFBYztBQUFBLE1BQ25DO0FBQUEsTUFDQSxTQUFTLE1BQU0sa0JBQWtCLEtBQUs7QUFBQSxPQUdyQyxLQUFLLDZDQUE2QztBQUFBLE1BQ2pELGFBQWEsWUFBWTtBQUFBLElBQzNCLENBQUMsQ0FDSDtBQUFBLEVBRUo7QUFFQSxTQUNFLHdGQUNFLG1EQUFDO0FBQUEsSUFDQyx3QkFBd0I7QUFBQSxJQUN4QixPQUFPLDJCQUFhO0FBQUEsSUFDcEIsa0JBQWlCO0FBQUEsSUFDakIsWUFBWSxZQUFZO0FBQUEsSUFDeEI7QUFBQSxJQUNBLE1BQU07QUFBQSxJQUNOLFlBQVk7QUFBQSxJQUNaLFNBQVM7QUFBQSxJQUNULGFBQWEsWUFBWTtBQUFBLElBQ3pCLG1CQUFtQjtBQUFBLElBQ25CLGtCQUFrQixDQUFDO0FBQUEsSUFDbkIsT0FBTyxZQUFZO0FBQUEsR0FDckIsR0FDQyxLQUNIO0FBRUosR0E3RUEsdUJBOEVGOyIsCiAgIm5hbWVzIjogW10KfQo=
