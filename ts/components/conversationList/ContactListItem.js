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
var ContactListItem_exports = {};
__export(ContactListItem_exports, {
  ContactListItem: () => ContactListItem
});
module.exports = __toCommonJS(ContactListItem_exports);
var import_react = __toESM(require("react"));
var import_BaseConversationListItem = require("./BaseConversationListItem");
var import_ContactName = require("../conversation/ContactName");
var import_About = require("../conversation/About");
const ContactListItem = import_react.default.memo(/* @__PURE__ */ __name(function ContactListItem2({
  about,
  acceptedMessageRequest,
  avatarPath,
  badge,
  color,
  i18n,
  id,
  isMe,
  name,
  onClick,
  phoneNumber,
  profileName,
  sharedGroupNames,
  theme,
  title,
  type,
  unblurredAvatarPath
}) {
  const headerName = isMe ? /* @__PURE__ */ import_react.default.createElement("span", {
    className: import_BaseConversationListItem.HEADER_CONTACT_NAME_CLASS_NAME
  }, i18n("noteToSelf")) : /* @__PURE__ */ import_react.default.createElement(import_ContactName.ContactName, {
    module: import_BaseConversationListItem.HEADER_CONTACT_NAME_CLASS_NAME,
    title
  });
  const messageText = about && !isMe ? /* @__PURE__ */ import_react.default.createElement(import_About.About, {
    className: "",
    text: about
  }) : null;
  return /* @__PURE__ */ import_react.default.createElement(import_BaseConversationListItem.BaseConversationListItem, {
    acceptedMessageRequest,
    avatarPath,
    badge,
    color,
    conversationType: type,
    headerName,
    i18n,
    id,
    isMe,
    isSelected: false,
    messageText,
    name,
    onClick: onClick ? () => onClick(id) : void 0,
    phoneNumber,
    profileName,
    sharedGroupNames,
    theme,
    title,
    unblurredAvatarPath
  });
}, "ContactListItem"));
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ContactListItem
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ29udGFjdExpc3RJdGVtLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgdHlwZSB7IEZ1bmN0aW9uQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHtcbiAgQmFzZUNvbnZlcnNhdGlvbkxpc3RJdGVtLFxuICBIRUFERVJfQ09OVEFDVF9OQU1FX0NMQVNTX05BTUUsXG59IGZyb20gJy4vQmFzZUNvbnZlcnNhdGlvbkxpc3RJdGVtJztcbmltcG9ydCB0eXBlIHsgQ29udmVyc2F0aW9uVHlwZSB9IGZyb20gJy4uLy4uL3N0YXRlL2R1Y2tzL2NvbnZlcnNhdGlvbnMnO1xuaW1wb3J0IHR5cGUgeyBCYWRnZVR5cGUgfSBmcm9tICcuLi8uLi9iYWRnZXMvdHlwZXMnO1xuaW1wb3J0IHR5cGUgeyBMb2NhbGl6ZXJUeXBlLCBUaGVtZVR5cGUgfSBmcm9tICcuLi8uLi90eXBlcy9VdGlsJztcbmltcG9ydCB7IENvbnRhY3ROYW1lIH0gZnJvbSAnLi4vY29udmVyc2F0aW9uL0NvbnRhY3ROYW1lJztcbmltcG9ydCB7IEFib3V0IH0gZnJvbSAnLi4vY29udmVyc2F0aW9uL0Fib3V0JztcblxuZXhwb3J0IHR5cGUgQ29udGFjdExpc3RJdGVtQ29udmVyc2F0aW9uVHlwZSA9IFBpY2s8XG4gIENvbnZlcnNhdGlvblR5cGUsXG4gIHwgJ2Fib3V0J1xuICB8ICdhY2NlcHRlZE1lc3NhZ2VSZXF1ZXN0J1xuICB8ICdhdmF0YXJQYXRoJ1xuICB8ICdiYWRnZXMnXG4gIHwgJ2NvbG9yJ1xuICB8ICdpZCdcbiAgfCAnaXNNZSdcbiAgfCAnbmFtZSdcbiAgfCAncGhvbmVOdW1iZXInXG4gIHwgJ3Byb2ZpbGVOYW1lJ1xuICB8ICdzaGFyZWRHcm91cE5hbWVzJ1xuICB8ICd0aXRsZSdcbiAgfCAndHlwZSdcbiAgfCAndW5ibHVycmVkQXZhdGFyUGF0aCdcbiAgfCAndXNlcm5hbWUnXG4gIHwgJ2UxNjQnXG4+O1xuXG50eXBlIFByb3BzRGF0YVR5cGUgPSBDb250YWN0TGlzdEl0ZW1Db252ZXJzYXRpb25UeXBlICYge1xuICBiYWRnZTogdW5kZWZpbmVkIHwgQmFkZ2VUeXBlO1xufTtcblxudHlwZSBQcm9wc0hvdXNla2VlcGluZ1R5cGUgPSB7XG4gIGkxOG46IExvY2FsaXplclR5cGU7XG4gIG9uQ2xpY2s/OiAoaWQ6IHN0cmluZykgPT4gdm9pZDtcbiAgdGhlbWU6IFRoZW1lVHlwZTtcbn07XG5cbnR5cGUgUHJvcHNUeXBlID0gUHJvcHNEYXRhVHlwZSAmIFByb3BzSG91c2VrZWVwaW5nVHlwZTtcblxuZXhwb3J0IGNvbnN0IENvbnRhY3RMaXN0SXRlbTogRnVuY3Rpb25Db21wb25lbnQ8UHJvcHNUeXBlPiA9IFJlYWN0Lm1lbW8oXG4gIGZ1bmN0aW9uIENvbnRhY3RMaXN0SXRlbSh7XG4gICAgYWJvdXQsXG4gICAgYWNjZXB0ZWRNZXNzYWdlUmVxdWVzdCxcbiAgICBhdmF0YXJQYXRoLFxuICAgIGJhZGdlLFxuICAgIGNvbG9yLFxuICAgIGkxOG4sXG4gICAgaWQsXG4gICAgaXNNZSxcbiAgICBuYW1lLFxuICAgIG9uQ2xpY2ssXG4gICAgcGhvbmVOdW1iZXIsXG4gICAgcHJvZmlsZU5hbWUsXG4gICAgc2hhcmVkR3JvdXBOYW1lcyxcbiAgICB0aGVtZSxcbiAgICB0aXRsZSxcbiAgICB0eXBlLFxuICAgIHVuYmx1cnJlZEF2YXRhclBhdGgsXG4gIH0pIHtcbiAgICBjb25zdCBoZWFkZXJOYW1lID0gaXNNZSA/IChcbiAgICAgIDxzcGFuIGNsYXNzTmFtZT17SEVBREVSX0NPTlRBQ1RfTkFNRV9DTEFTU19OQU1FfT5cbiAgICAgICAge2kxOG4oJ25vdGVUb1NlbGYnKX1cbiAgICAgIDwvc3Bhbj5cbiAgICApIDogKFxuICAgICAgPENvbnRhY3ROYW1lIG1vZHVsZT17SEVBREVSX0NPTlRBQ1RfTkFNRV9DTEFTU19OQU1FfSB0aXRsZT17dGl0bGV9IC8+XG4gICAgKTtcblxuICAgIGNvbnN0IG1lc3NhZ2VUZXh0ID1cbiAgICAgIGFib3V0ICYmICFpc01lID8gPEFib3V0IGNsYXNzTmFtZT1cIlwiIHRleHQ9e2Fib3V0fSAvPiA6IG51bGw7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPEJhc2VDb252ZXJzYXRpb25MaXN0SXRlbVxuICAgICAgICBhY2NlcHRlZE1lc3NhZ2VSZXF1ZXN0PXthY2NlcHRlZE1lc3NhZ2VSZXF1ZXN0fVxuICAgICAgICBhdmF0YXJQYXRoPXthdmF0YXJQYXRofVxuICAgICAgICBiYWRnZT17YmFkZ2V9XG4gICAgICAgIGNvbG9yPXtjb2xvcn1cbiAgICAgICAgY29udmVyc2F0aW9uVHlwZT17dHlwZX1cbiAgICAgICAgaGVhZGVyTmFtZT17aGVhZGVyTmFtZX1cbiAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgaWQ9e2lkfVxuICAgICAgICBpc01lPXtpc01lfVxuICAgICAgICBpc1NlbGVjdGVkPXtmYWxzZX1cbiAgICAgICAgbWVzc2FnZVRleHQ9e21lc3NhZ2VUZXh0fVxuICAgICAgICBuYW1lPXtuYW1lfVxuICAgICAgICBvbkNsaWNrPXtvbkNsaWNrID8gKCkgPT4gb25DbGljayhpZCkgOiB1bmRlZmluZWR9XG4gICAgICAgIHBob25lTnVtYmVyPXtwaG9uZU51bWJlcn1cbiAgICAgICAgcHJvZmlsZU5hbWU9e3Byb2ZpbGVOYW1lfVxuICAgICAgICBzaGFyZWRHcm91cE5hbWVzPXtzaGFyZWRHcm91cE5hbWVzfVxuICAgICAgICB0aGVtZT17dGhlbWV9XG4gICAgICAgIHRpdGxlPXt0aXRsZX1cbiAgICAgICAgdW5ibHVycmVkQXZhdGFyUGF0aD17dW5ibHVycmVkQXZhdGFyUGF0aH1cbiAgICAgIC8+XG4gICAgKTtcbiAgfVxuKTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFJQSxtQkFBa0I7QUFFbEIsc0NBR087QUFJUCx5QkFBNEI7QUFDNUIsbUJBQXNCO0FBa0NmLE1BQU0sa0JBQWdELHFCQUFNLEtBQ2pFLGlEQUF5QjtBQUFBLEVBQ3ZCO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEdBQ0M7QUFDRCxRQUFNLGFBQWEsT0FDakIsbURBQUM7QUFBQSxJQUFLLFdBQVc7QUFBQSxLQUNkLEtBQUssWUFBWSxDQUNwQixJQUVBLG1EQUFDO0FBQUEsSUFBWSxRQUFRO0FBQUEsSUFBZ0M7QUFBQSxHQUFjO0FBR3JFLFFBQU0sY0FDSixTQUFTLENBQUMsT0FBTyxtREFBQztBQUFBLElBQU0sV0FBVTtBQUFBLElBQUcsTUFBTTtBQUFBLEdBQU8sSUFBSztBQUV6RCxTQUNFLG1EQUFDO0FBQUEsSUFDQztBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0Esa0JBQWtCO0FBQUEsSUFDbEI7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBLFlBQVk7QUFBQSxJQUNaO0FBQUEsSUFDQTtBQUFBLElBQ0EsU0FBUyxVQUFVLE1BQU0sUUFBUSxFQUFFLElBQUk7QUFBQSxJQUN2QztBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsR0FDRjtBQUVKLEdBckRBLGtCQXNERjsiLAogICJuYW1lcyI6IFtdCn0K
