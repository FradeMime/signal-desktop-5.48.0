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
var UsernameSearchResultListItem_exports = {};
__export(UsernameSearchResultListItem_exports, {
  UsernameSearchResultListItem: () => UsernameSearchResultListItem
});
module.exports = __toCommonJS(UsernameSearchResultListItem_exports);
var import_react = __toESM(require("react"));
var import_BaseConversationListItem = require("./BaseConversationListItem");
var import_lookupConversationWithoutUuid = require("../../util/lookupConversationWithoutUuid");
const UsernameSearchResultListItem = /* @__PURE__ */ __name(({
  i18n,
  isFetchingUsername,
  username,
  showUserNotFoundModal,
  setIsFetchingUUID,
  showConversation
}) => {
  const usernameText = i18n("at-username", { username });
  const boundOnClick = (0, import_react.useCallback)(async () => {
    if (isFetchingUsername) {
      return;
    }
    const conversationId = await (0, import_lookupConversationWithoutUuid.lookupConversationWithoutUuid)({
      showUserNotFoundModal,
      setIsFetchingUUID,
      type: "username",
      username
    });
    if (conversationId !== void 0) {
      showConversation({ conversationId });
    }
  }, [
    username,
    showUserNotFoundModal,
    setIsFetchingUUID,
    showConversation,
    isFetchingUsername
  ]);
  return /* @__PURE__ */ import_react.default.createElement(import_BaseConversationListItem.BaseConversationListItem, {
    acceptedMessageRequest: false,
    conversationType: "direct",
    headerName: usernameText,
    i18n,
    isMe: false,
    isSelected: false,
    isUsernameSearchResult: true,
    shouldShowSpinner: isFetchingUsername,
    onClick: boundOnClick,
    sharedGroupNames: [],
    title: usernameText
  });
}, "UsernameSearchResultListItem");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UsernameSearchResultListItem
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiVXNlcm5hbWVTZWFyY2hSZXN1bHRMaXN0SXRlbS50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHR5cGUgeyBGdW5jdGlvbkNvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdCwgeyB1c2VDYWxsYmFjayB9IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgQmFzZUNvbnZlcnNhdGlvbkxpc3RJdGVtIH0gZnJvbSAnLi9CYXNlQ29udmVyc2F0aW9uTGlzdEl0ZW0nO1xuXG5pbXBvcnQgdHlwZSB7IExvY2FsaXplclR5cGUgfSBmcm9tICcuLi8uLi90eXBlcy9VdGlsJztcbmltcG9ydCB7IGxvb2t1cENvbnZlcnNhdGlvbldpdGhvdXRVdWlkIH0gZnJvbSAnLi4vLi4vdXRpbC9sb29rdXBDb252ZXJzYXRpb25XaXRob3V0VXVpZCc7XG5pbXBvcnQgdHlwZSB7IExvb2t1cENvbnZlcnNhdGlvbldpdGhvdXRVdWlkQWN0aW9uc1R5cGUgfSBmcm9tICcuLi8uLi91dGlsL2xvb2t1cENvbnZlcnNhdGlvbldpdGhvdXRVdWlkJztcbmltcG9ydCB0eXBlIHsgU2hvd0NvbnZlcnNhdGlvblR5cGUgfSBmcm9tICcuLi8uLi9zdGF0ZS9kdWNrcy9jb252ZXJzYXRpb25zJztcblxudHlwZSBQcm9wc0RhdGEgPSB7XG4gIHVzZXJuYW1lOiBzdHJpbmc7XG4gIGlzRmV0Y2hpbmdVc2VybmFtZTogYm9vbGVhbjtcbn07XG5cbnR5cGUgUHJvcHNIb3VzZWtlZXBpbmcgPSB7XG4gIGkxOG46IExvY2FsaXplclR5cGU7XG4gIHNob3dDb252ZXJzYXRpb246IFNob3dDb252ZXJzYXRpb25UeXBlO1xufSAmIExvb2t1cENvbnZlcnNhdGlvbldpdGhvdXRVdWlkQWN0aW9uc1R5cGU7XG5cbmV4cG9ydCB0eXBlIFByb3BzID0gUHJvcHNEYXRhICYgUHJvcHNIb3VzZWtlZXBpbmc7XG5cbmV4cG9ydCBjb25zdCBVc2VybmFtZVNlYXJjaFJlc3VsdExpc3RJdGVtOiBGdW5jdGlvbkNvbXBvbmVudDxQcm9wcz4gPSAoe1xuICBpMThuLFxuICBpc0ZldGNoaW5nVXNlcm5hbWUsXG4gIHVzZXJuYW1lLFxuICBzaG93VXNlck5vdEZvdW5kTW9kYWwsXG4gIHNldElzRmV0Y2hpbmdVVUlELFxuICBzaG93Q29udmVyc2F0aW9uLFxufSkgPT4ge1xuICBjb25zdCB1c2VybmFtZVRleHQgPSBpMThuKCdhdC11c2VybmFtZScsIHsgdXNlcm5hbWUgfSk7XG4gIGNvbnN0IGJvdW5kT25DbGljayA9IHVzZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcbiAgICBpZiAoaXNGZXRjaGluZ1VzZXJuYW1lKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGNvbnZlcnNhdGlvbklkID0gYXdhaXQgbG9va3VwQ29udmVyc2F0aW9uV2l0aG91dFV1aWQoe1xuICAgICAgc2hvd1VzZXJOb3RGb3VuZE1vZGFsLFxuICAgICAgc2V0SXNGZXRjaGluZ1VVSUQsXG5cbiAgICAgIHR5cGU6ICd1c2VybmFtZScsXG4gICAgICB1c2VybmFtZSxcbiAgICB9KTtcblxuICAgIGlmIChjb252ZXJzYXRpb25JZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBzaG93Q29udmVyc2F0aW9uKHsgY29udmVyc2F0aW9uSWQgfSk7XG4gICAgfVxuICB9LCBbXG4gICAgdXNlcm5hbWUsXG4gICAgc2hvd1VzZXJOb3RGb3VuZE1vZGFsLFxuICAgIHNldElzRmV0Y2hpbmdVVUlELFxuICAgIHNob3dDb252ZXJzYXRpb24sXG4gICAgaXNGZXRjaGluZ1VzZXJuYW1lLFxuICBdKTtcblxuICByZXR1cm4gKFxuICAgIDxCYXNlQ29udmVyc2F0aW9uTGlzdEl0ZW1cbiAgICAgIGFjY2VwdGVkTWVzc2FnZVJlcXVlc3Q9e2ZhbHNlfVxuICAgICAgY29udmVyc2F0aW9uVHlwZT1cImRpcmVjdFwiXG4gICAgICBoZWFkZXJOYW1lPXt1c2VybmFtZVRleHR9XG4gICAgICBpMThuPXtpMThufVxuICAgICAgaXNNZT17ZmFsc2V9XG4gICAgICBpc1NlbGVjdGVkPXtmYWxzZX1cbiAgICAgIGlzVXNlcm5hbWVTZWFyY2hSZXN1bHRcbiAgICAgIHNob3VsZFNob3dTcGlubmVyPXtpc0ZldGNoaW5nVXNlcm5hbWV9XG4gICAgICBvbkNsaWNrPXtib3VuZE9uQ2xpY2t9XG4gICAgICBzaGFyZWRHcm91cE5hbWVzPXtbXX1cbiAgICAgIHRpdGxlPXt1c2VybmFtZVRleHR9XG4gICAgLz5cbiAgKTtcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSUEsbUJBQW1DO0FBRW5DLHNDQUF5QztBQUd6QywyQ0FBOEM7QUFnQnZDLE1BQU0sK0JBQXlELHdCQUFDO0FBQUEsRUFDckU7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLE1BQ0k7QUFDSixRQUFNLGVBQWUsS0FBSyxlQUFlLEVBQUUsU0FBUyxDQUFDO0FBQ3JELFFBQU0sZUFBZSw4QkFBWSxZQUFZO0FBQzNDLFFBQUksb0JBQW9CO0FBQ3RCO0FBQUEsSUFDRjtBQUNBLFVBQU0saUJBQWlCLE1BQU0sd0VBQThCO0FBQUEsTUFDekQ7QUFBQSxNQUNBO0FBQUEsTUFFQSxNQUFNO0FBQUEsTUFDTjtBQUFBLElBQ0YsQ0FBQztBQUVELFFBQUksbUJBQW1CLFFBQVc7QUFDaEMsdUJBQWlCLEVBQUUsZUFBZSxDQUFDO0FBQUEsSUFDckM7QUFBQSxFQUNGLEdBQUc7QUFBQSxJQUNEO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ0YsQ0FBQztBQUVELFNBQ0UsbURBQUM7QUFBQSxJQUNDLHdCQUF3QjtBQUFBLElBQ3hCLGtCQUFpQjtBQUFBLElBQ2pCLFlBQVk7QUFBQSxJQUNaO0FBQUEsSUFDQSxNQUFNO0FBQUEsSUFDTixZQUFZO0FBQUEsSUFDWix3QkFBc0I7QUFBQSxJQUN0QixtQkFBbUI7QUFBQSxJQUNuQixTQUFTO0FBQUEsSUFDVCxrQkFBa0IsQ0FBQztBQUFBLElBQ25CLE9BQU87QUFBQSxHQUNUO0FBRUosR0EvQ3NFOyIsCiAgIm5hbWVzIjogW10KfQo=
