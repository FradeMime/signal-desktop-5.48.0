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
var UsernameCheckbox_exports = {};
__export(UsernameCheckbox_exports, {
  UsernameCheckbox: () => UsernameCheckbox
});
module.exports = __toCommonJS(UsernameCheckbox_exports);
var import_react = __toESM(require("react"));
var import_BaseConversationListItem = require("./BaseConversationListItem");
var import_Colors = require("../../types/Colors");
const UsernameCheckbox = import_react.default.memo(/* @__PURE__ */ __name(function UsernameCheckbox2({
  username,
  isChecked,
  isFetching,
  theme,
  i18n,
  lookupConversationWithoutUuid,
  showUserNotFoundModal,
  setIsFetchingUUID,
  toggleConversationInChooseMembers
}) {
  const onClickItem = import_react.default.useCallback(async () => {
    if (isFetching) {
      return;
    }
    const conversationId = await lookupConversationWithoutUuid({
      showUserNotFoundModal,
      setIsFetchingUUID,
      type: "username",
      username
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
    username
  ]);
  const title = i18n("at-username", { username });
  return /* @__PURE__ */ import_react.default.createElement(import_BaseConversationListItem.BaseConversationListItem, {
    acceptedMessageRequest: false,
    checked: isChecked,
    color: import_Colors.AvatarColors[0],
    conversationType: "direct",
    headerName: title,
    i18n,
    isMe: false,
    isSelected: false,
    isUsernameSearchResult: true,
    onClick: onClickItem,
    shouldShowSpinner: isFetching,
    theme,
    sharedGroupNames: [],
    title
  });
}, "UsernameCheckbox"));
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UsernameCheckbox
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiVXNlcm5hbWVDaGVja2JveC50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHR5cGUgeyBGdW5jdGlvbkNvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IEJhc2VDb252ZXJzYXRpb25MaXN0SXRlbSB9IGZyb20gJy4vQmFzZUNvbnZlcnNhdGlvbkxpc3RJdGVtJztcbmltcG9ydCB0eXBlIHsgTG9jYWxpemVyVHlwZSwgVGhlbWVUeXBlIH0gZnJvbSAnLi4vLi4vdHlwZXMvVXRpbCc7XG5pbXBvcnQgeyBBdmF0YXJDb2xvcnMgfSBmcm9tICcuLi8uLi90eXBlcy9Db2xvcnMnO1xuaW1wb3J0IHR5cGUgeyBMb29rdXBDb252ZXJzYXRpb25XaXRob3V0VXVpZEFjdGlvbnNUeXBlIH0gZnJvbSAnLi4vLi4vdXRpbC9sb29rdXBDb252ZXJzYXRpb25XaXRob3V0VXVpZCc7XG5cbmV4cG9ydCB0eXBlIFByb3BzRGF0YVR5cGUgPSB7XG4gIHVzZXJuYW1lOiBzdHJpbmc7XG4gIGlzQ2hlY2tlZDogYm9vbGVhbjtcbiAgaXNGZXRjaGluZzogYm9vbGVhbjtcbn07XG5cbnR5cGUgUHJvcHNIb3VzZWtlZXBpbmdUeXBlID0ge1xuICBpMThuOiBMb2NhbGl6ZXJUeXBlO1xuICB0aGVtZTogVGhlbWVUeXBlO1xuICB0b2dnbGVDb252ZXJzYXRpb25JbkNob29zZU1lbWJlcnM6IChjb252ZXJzYXRpb25JZDogc3RyaW5nKSA9PiB2b2lkO1xufSAmIExvb2t1cENvbnZlcnNhdGlvbldpdGhvdXRVdWlkQWN0aW9uc1R5cGU7XG5cbnR5cGUgUHJvcHNUeXBlID0gUHJvcHNEYXRhVHlwZSAmIFByb3BzSG91c2VrZWVwaW5nVHlwZTtcblxuZXhwb3J0IGNvbnN0IFVzZXJuYW1lQ2hlY2tib3g6IEZ1bmN0aW9uQ29tcG9uZW50PFByb3BzVHlwZT4gPSBSZWFjdC5tZW1vKFxuICBmdW5jdGlvbiBVc2VybmFtZUNoZWNrYm94KHtcbiAgICB1c2VybmFtZSxcbiAgICBpc0NoZWNrZWQsXG4gICAgaXNGZXRjaGluZyxcbiAgICB0aGVtZSxcbiAgICBpMThuLFxuICAgIGxvb2t1cENvbnZlcnNhdGlvbldpdGhvdXRVdWlkLFxuICAgIHNob3dVc2VyTm90Rm91bmRNb2RhbCxcbiAgICBzZXRJc0ZldGNoaW5nVVVJRCxcbiAgICB0b2dnbGVDb252ZXJzYXRpb25JbkNob29zZU1lbWJlcnMsXG4gIH0pIHtcbiAgICBjb25zdCBvbkNsaWNrSXRlbSA9IFJlYWN0LnVzZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcbiAgICAgIGlmIChpc0ZldGNoaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgY29udmVyc2F0aW9uSWQgPSBhd2FpdCBsb29rdXBDb252ZXJzYXRpb25XaXRob3V0VXVpZCh7XG4gICAgICAgIHNob3dVc2VyTm90Rm91bmRNb2RhbCxcbiAgICAgICAgc2V0SXNGZXRjaGluZ1VVSUQsXG5cbiAgICAgICAgdHlwZTogJ3VzZXJuYW1lJyxcbiAgICAgICAgdXNlcm5hbWUsXG4gICAgICB9KTtcblxuICAgICAgaWYgKGNvbnZlcnNhdGlvbklkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdG9nZ2xlQ29udmVyc2F0aW9uSW5DaG9vc2VNZW1iZXJzKGNvbnZlcnNhdGlvbklkKTtcbiAgICAgIH1cbiAgICB9LCBbXG4gICAgICBpc0ZldGNoaW5nLFxuICAgICAgdG9nZ2xlQ29udmVyc2F0aW9uSW5DaG9vc2VNZW1iZXJzLFxuICAgICAgbG9va3VwQ29udmVyc2F0aW9uV2l0aG91dFV1aWQsXG4gICAgICBzaG93VXNlck5vdEZvdW5kTW9kYWwsXG4gICAgICBzZXRJc0ZldGNoaW5nVVVJRCxcbiAgICAgIHVzZXJuYW1lLFxuICAgIF0pO1xuXG4gICAgY29uc3QgdGl0bGUgPSBpMThuKCdhdC11c2VybmFtZScsIHsgdXNlcm5hbWUgfSk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPEJhc2VDb252ZXJzYXRpb25MaXN0SXRlbVxuICAgICAgICBhY2NlcHRlZE1lc3NhZ2VSZXF1ZXN0PXtmYWxzZX1cbiAgICAgICAgY2hlY2tlZD17aXNDaGVja2VkfVxuICAgICAgICBjb2xvcj17QXZhdGFyQ29sb3JzWzBdfVxuICAgICAgICBjb252ZXJzYXRpb25UeXBlPVwiZGlyZWN0XCJcbiAgICAgICAgaGVhZGVyTmFtZT17dGl0bGV9XG4gICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgIGlzTWU9e2ZhbHNlfVxuICAgICAgICBpc1NlbGVjdGVkPXtmYWxzZX1cbiAgICAgICAgaXNVc2VybmFtZVNlYXJjaFJlc3VsdFxuICAgICAgICBvbkNsaWNrPXtvbkNsaWNrSXRlbX1cbiAgICAgICAgc2hvdWxkU2hvd1NwaW5uZXI9e2lzRmV0Y2hpbmd9XG4gICAgICAgIHRoZW1lPXt0aGVtZX1cbiAgICAgICAgc2hhcmVkR3JvdXBOYW1lcz17W119XG4gICAgICAgIHRpdGxlPXt0aXRsZX1cbiAgICAgIC8+XG4gICAgKTtcbiAgfVxuKTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFJQSxtQkFBa0I7QUFFbEIsc0NBQXlDO0FBRXpDLG9CQUE2QjtBQWlCdEIsTUFBTSxtQkFBaUQscUJBQU0sS0FDbEUsa0RBQTBCO0FBQUEsRUFDeEI7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEdBQ0M7QUFDRCxRQUFNLGNBQWMscUJBQU0sWUFBWSxZQUFZO0FBQ2hELFFBQUksWUFBWTtBQUNkO0FBQUEsSUFDRjtBQUVBLFVBQU0saUJBQWlCLE1BQU0sOEJBQThCO0FBQUEsTUFDekQ7QUFBQSxNQUNBO0FBQUEsTUFFQSxNQUFNO0FBQUEsTUFDTjtBQUFBLElBQ0YsQ0FBQztBQUVELFFBQUksbUJBQW1CLFFBQVc7QUFDaEMsd0NBQWtDLGNBQWM7QUFBQSxJQUNsRDtBQUFBLEVBQ0YsR0FBRztBQUFBLElBQ0Q7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ0YsQ0FBQztBQUVELFFBQU0sUUFBUSxLQUFLLGVBQWUsRUFBRSxTQUFTLENBQUM7QUFFOUMsU0FDRSxtREFBQztBQUFBLElBQ0Msd0JBQXdCO0FBQUEsSUFDeEIsU0FBUztBQUFBLElBQ1QsT0FBTywyQkFBYTtBQUFBLElBQ3BCLGtCQUFpQjtBQUFBLElBQ2pCLFlBQVk7QUFBQSxJQUNaO0FBQUEsSUFDQSxNQUFNO0FBQUEsSUFDTixZQUFZO0FBQUEsSUFDWix3QkFBc0I7QUFBQSxJQUN0QixTQUFTO0FBQUEsSUFDVCxtQkFBbUI7QUFBQSxJQUNuQjtBQUFBLElBQ0Esa0JBQWtCLENBQUM7QUFBQSxJQUNuQjtBQUFBLEdBQ0Y7QUFFSixHQXhEQSxtQkF5REY7IiwKICAibmFtZXMiOiBbXQp9Cg==
