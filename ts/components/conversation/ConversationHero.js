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
var ConversationHero_exports = {};
__export(ConversationHero_exports, {
  ConversationHero: () => ConversationHero
});
module.exports = __toCommonJS(ConversationHero_exports);
var import_react = __toESM(require("react"));
var import_Avatar = require("../Avatar");
var import_ContactName = require("./ContactName");
var import_About = require("./About");
var import_GroupDescription = require("./GroupDescription");
var import_SharedGroupNames = require("../SharedGroupNames");
var import_ConfirmationDialog = require("../ConfirmationDialog");
var import_Button = require("../Button");
var import_shouldBlurAvatar = require("../../util/shouldBlurAvatar");
var import_openLinkInWebBrowser = require("../../util/openLinkInWebBrowser");
const renderMembershipRow = /* @__PURE__ */ __name(({
  acceptedMessageRequest,
  conversationType,
  i18n,
  isMe,
  onClickMessageRequestWarning,
  phoneNumber,
  sharedGroupNames
}) => {
  const className = "module-conversation-hero__membership";
  if (conversationType !== "direct") {
    return null;
  }
  if (isMe) {
    return /* @__PURE__ */ import_react.default.createElement("div", {
      className
    }, i18n("noteToSelfHero"));
  }
  if (sharedGroupNames.length > 0) {
    return /* @__PURE__ */ import_react.default.createElement("div", {
      className
    }, /* @__PURE__ */ import_react.default.createElement(import_SharedGroupNames.SharedGroupNames, {
      i18n,
      nameClassName: `${className}__name`,
      sharedGroupNames
    }));
  }
  if (acceptedMessageRequest) {
    if (phoneNumber) {
      return null;
    }
    return /* @__PURE__ */ import_react.default.createElement("div", {
      className
    }, i18n("no-groups-in-common"));
  }
  return /* @__PURE__ */ import_react.default.createElement("div", {
    className: "module-conversation-hero__message-request-warning"
  }, /* @__PURE__ */ import_react.default.createElement("div", {
    className: "module-conversation-hero__message-request-warning__message"
  }, i18n("no-groups-in-common-warning")), /* @__PURE__ */ import_react.default.createElement(import_Button.Button, {
    onClick: onClickMessageRequestWarning,
    size: import_Button.ButtonSize.Small,
    variant: import_Button.ButtonVariant.SecondaryAffirmative
  }, i18n("MessageRequestWarning__learn-more")));
}, "renderMembershipRow");
const ConversationHero = /* @__PURE__ */ __name(({
  i18n,
  about,
  acceptedMessageRequest,
  avatarPath,
  badge,
  color,
  conversationType,
  groupDescription,
  isMe,
  membersCount,
  sharedGroupNames = [],
  name,
  phoneNumber,
  profileName,
  theme,
  title,
  unblurAvatar,
  unblurredAvatarPath,
  updateSharedGroups
}) => {
  const [isShowingMessageRequestWarning, setIsShowingMessageRequestWarning] = (0, import_react.useState)(false);
  const closeMessageRequestWarning = /* @__PURE__ */ __name(() => {
    setIsShowingMessageRequestWarning(false);
  }, "closeMessageRequestWarning");
  (0, import_react.useEffect)(() => {
    updateSharedGroups();
  }, [updateSharedGroups]);
  let avatarBlur;
  let avatarOnClick;
  if ((0, import_shouldBlurAvatar.shouldBlurAvatar)({
    acceptedMessageRequest,
    avatarPath,
    isMe,
    sharedGroupNames,
    unblurredAvatarPath
  })) {
    avatarBlur = import_Avatar.AvatarBlur.BlurPictureWithClickToView;
    avatarOnClick = unblurAvatar;
  } else {
    avatarBlur = import_Avatar.AvatarBlur.NoBlur;
  }
  const phoneNumberOnly = Boolean(!name && !profileName && conversationType === "direct");
  return /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement("div", {
    className: "module-conversation-hero"
  }, /* @__PURE__ */ import_react.default.createElement(import_Avatar.Avatar, {
    acceptedMessageRequest,
    avatarPath,
    badge,
    blur: avatarBlur,
    className: "module-conversation-hero__avatar",
    color,
    conversationType,
    i18n,
    isMe,
    name,
    noteToSelf: isMe,
    onClick: avatarOnClick,
    profileName,
    sharedGroupNames,
    size: 112,
    theme,
    title
  }), /* @__PURE__ */ import_react.default.createElement("h1", {
    className: "module-conversation-hero__profile-name"
  }, isMe ? i18n("noteToSelf") : /* @__PURE__ */ import_react.default.createElement(import_ContactName.ContactName, {
    title
  })), about && !isMe && /* @__PURE__ */ import_react.default.createElement("div", {
    className: "module-about__container"
  }, /* @__PURE__ */ import_react.default.createElement(import_About.About, {
    text: about
  })), !isMe ? /* @__PURE__ */ import_react.default.createElement("div", {
    className: "module-conversation-hero__with"
  }, groupDescription ? /* @__PURE__ */ import_react.default.createElement(import_GroupDescription.GroupDescription, {
    i18n,
    title,
    text: groupDescription
  }) : membersCount === 1 ? i18n("ConversationHero--members-1") : membersCount !== void 0 ? i18n("ConversationHero--members", [`${membersCount}`]) : phoneNumberOnly ? null : phoneNumber) : null, renderMembershipRow({
    acceptedMessageRequest,
    conversationType,
    i18n,
    isMe,
    onClickMessageRequestWarning() {
      setIsShowingMessageRequestWarning(true);
    },
    phoneNumber,
    sharedGroupNames
  }), /* @__PURE__ */ import_react.default.createElement("div", {
    className: "module-conversation-hero__linkNotification"
  }, i18n("messageHistoryUnsynced"))), isShowingMessageRequestWarning && /* @__PURE__ */ import_react.default.createElement(import_ConfirmationDialog.ConfirmationDialog, {
    i18n,
    onClose: closeMessageRequestWarning,
    actions: [
      {
        text: i18n("MessageRequestWarning__dialog__learn-even-more"),
        action: () => {
          (0, import_openLinkInWebBrowser.openLinkInWebBrowser)("https://support.signal.org/hc/articles/360007459591");
          closeMessageRequestWarning();
        }
      }
    ]
  }, i18n("MessageRequestWarning__dialog__details")));
}, "ConversationHero");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ConversationHero
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ29udmVyc2F0aW9uSGVyby50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIwLTIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB0eXBlIHsgUHJvcHMgYXMgQXZhdGFyUHJvcHMgfSBmcm9tICcuLi9BdmF0YXInO1xuaW1wb3J0IHsgQXZhdGFyLCBBdmF0YXJCbHVyIH0gZnJvbSAnLi4vQXZhdGFyJztcbmltcG9ydCB7IENvbnRhY3ROYW1lIH0gZnJvbSAnLi9Db250YWN0TmFtZSc7XG5pbXBvcnQgeyBBYm91dCB9IGZyb20gJy4vQWJvdXQnO1xuaW1wb3J0IHsgR3JvdXBEZXNjcmlwdGlvbiB9IGZyb20gJy4vR3JvdXBEZXNjcmlwdGlvbic7XG5pbXBvcnQgeyBTaGFyZWRHcm91cE5hbWVzIH0gZnJvbSAnLi4vU2hhcmVkR3JvdXBOYW1lcyc7XG5pbXBvcnQgdHlwZSB7IExvY2FsaXplclR5cGUsIFRoZW1lVHlwZSB9IGZyb20gJy4uLy4uL3R5cGVzL1V0aWwnO1xuaW1wb3J0IHsgQ29uZmlybWF0aW9uRGlhbG9nIH0gZnJvbSAnLi4vQ29uZmlybWF0aW9uRGlhbG9nJztcbmltcG9ydCB7IEJ1dHRvbiwgQnV0dG9uU2l6ZSwgQnV0dG9uVmFyaWFudCB9IGZyb20gJy4uL0J1dHRvbic7XG5pbXBvcnQgeyBzaG91bGRCbHVyQXZhdGFyIH0gZnJvbSAnLi4vLi4vdXRpbC9zaG91bGRCbHVyQXZhdGFyJztcbmltcG9ydCB7IG9wZW5MaW5rSW5XZWJCcm93c2VyIH0gZnJvbSAnLi4vLi4vdXRpbC9vcGVuTGlua0luV2ViQnJvd3Nlcic7XG5cbmV4cG9ydCB0eXBlIFByb3BzID0ge1xuICBhYm91dD86IHN0cmluZztcbiAgYWNjZXB0ZWRNZXNzYWdlUmVxdWVzdD86IGJvb2xlYW47XG4gIGdyb3VwRGVzY3JpcHRpb24/OiBzdHJpbmc7XG4gIGkxOG46IExvY2FsaXplclR5cGU7XG4gIGlzTWU6IGJvb2xlYW47XG4gIG1lbWJlcnNDb3VudD86IG51bWJlcjtcbiAgcGhvbmVOdW1iZXI/OiBzdHJpbmc7XG4gIHNoYXJlZEdyb3VwTmFtZXM/OiBBcnJheTxzdHJpbmc+O1xuICB1bmJsdXJBdmF0YXI6ICgpID0+IHZvaWQ7XG4gIHVuYmx1cnJlZEF2YXRhclBhdGg/OiBzdHJpbmc7XG4gIHVwZGF0ZVNoYXJlZEdyb3VwczogKCkgPT4gdW5rbm93bjtcbiAgdGhlbWU6IFRoZW1lVHlwZTtcbn0gJiBPbWl0PEF2YXRhclByb3BzLCAnb25DbGljaycgfCAnc2l6ZScgfCAnbm90ZVRvU2VsZic+O1xuXG5jb25zdCByZW5kZXJNZW1iZXJzaGlwUm93ID0gKHtcbiAgYWNjZXB0ZWRNZXNzYWdlUmVxdWVzdCxcbiAgY29udmVyc2F0aW9uVHlwZSxcbiAgaTE4bixcbiAgaXNNZSxcbiAgb25DbGlja01lc3NhZ2VSZXF1ZXN0V2FybmluZyxcbiAgcGhvbmVOdW1iZXIsXG4gIHNoYXJlZEdyb3VwTmFtZXMsXG59OiBQaWNrPFxuICBQcm9wcyxcbiAgfCAnYWNjZXB0ZWRNZXNzYWdlUmVxdWVzdCdcbiAgfCAnY29udmVyc2F0aW9uVHlwZSdcbiAgfCAnaTE4bidcbiAgfCAnaXNNZSdcbiAgfCAncGhvbmVOdW1iZXInXG4+ICZcbiAgUmVxdWlyZWQ8UGljazxQcm9wcywgJ3NoYXJlZEdyb3VwTmFtZXMnPj4gJiB7XG4gICAgb25DbGlja01lc3NhZ2VSZXF1ZXN0V2FybmluZzogKCkgPT4gdm9pZDtcbiAgfSkgPT4ge1xuICBjb25zdCBjbGFzc05hbWUgPSAnbW9kdWxlLWNvbnZlcnNhdGlvbi1oZXJvX19tZW1iZXJzaGlwJztcblxuICBpZiAoY29udmVyc2F0aW9uVHlwZSAhPT0gJ2RpcmVjdCcpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGlmIChpc01lKSB7XG4gICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPXtjbGFzc05hbWV9PntpMThuKCdub3RlVG9TZWxmSGVybycpfTwvZGl2PjtcbiAgfVxuXG4gIGlmIChzaGFyZWRHcm91cE5hbWVzLmxlbmd0aCA+IDApIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzTmFtZX0+XG4gICAgICAgIDxTaGFyZWRHcm91cE5hbWVzXG4gICAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgICBuYW1lQ2xhc3NOYW1lPXtgJHtjbGFzc05hbWV9X19uYW1lYH1cbiAgICAgICAgICBzaGFyZWRHcm91cE5hbWVzPXtzaGFyZWRHcm91cE5hbWVzfVxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuICBpZiAoYWNjZXB0ZWRNZXNzYWdlUmVxdWVzdCkge1xuICAgIGlmIChwaG9uZU51bWJlcikge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT17Y2xhc3NOYW1lfT57aTE4bignbm8tZ3JvdXBzLWluLWNvbW1vbicpfTwvZGl2PjtcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJtb2R1bGUtY29udmVyc2F0aW9uLWhlcm9fX21lc3NhZ2UtcmVxdWVzdC13YXJuaW5nXCI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZHVsZS1jb252ZXJzYXRpb24taGVyb19fbWVzc2FnZS1yZXF1ZXN0LXdhcm5pbmdfX21lc3NhZ2VcIj5cbiAgICAgICAge2kxOG4oJ25vLWdyb3Vwcy1pbi1jb21tb24td2FybmluZycpfVxuICAgICAgPC9kaXY+XG4gICAgICA8QnV0dG9uXG4gICAgICAgIG9uQ2xpY2s9e29uQ2xpY2tNZXNzYWdlUmVxdWVzdFdhcm5pbmd9XG4gICAgICAgIHNpemU9e0J1dHRvblNpemUuU21hbGx9XG4gICAgICAgIHZhcmlhbnQ9e0J1dHRvblZhcmlhbnQuU2Vjb25kYXJ5QWZmaXJtYXRpdmV9XG4gICAgICA+XG4gICAgICAgIHtpMThuKCdNZXNzYWdlUmVxdWVzdFdhcm5pbmdfX2xlYXJuLW1vcmUnKX1cbiAgICAgIDwvQnV0dG9uPlxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IGNvbnN0IENvbnZlcnNhdGlvbkhlcm8gPSAoe1xuICBpMThuLFxuICBhYm91dCxcbiAgYWNjZXB0ZWRNZXNzYWdlUmVxdWVzdCxcbiAgYXZhdGFyUGF0aCxcbiAgYmFkZ2UsXG4gIGNvbG9yLFxuICBjb252ZXJzYXRpb25UeXBlLFxuICBncm91cERlc2NyaXB0aW9uLFxuICBpc01lLFxuICBtZW1iZXJzQ291bnQsXG4gIHNoYXJlZEdyb3VwTmFtZXMgPSBbXSxcbiAgbmFtZSxcbiAgcGhvbmVOdW1iZXIsXG4gIHByb2ZpbGVOYW1lLFxuICB0aGVtZSxcbiAgdGl0bGUsXG4gIHVuYmx1ckF2YXRhcixcbiAgdW5ibHVycmVkQXZhdGFyUGF0aCxcbiAgdXBkYXRlU2hhcmVkR3JvdXBzLFxufTogUHJvcHMpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IFtpc1Nob3dpbmdNZXNzYWdlUmVxdWVzdFdhcm5pbmcsIHNldElzU2hvd2luZ01lc3NhZ2VSZXF1ZXN0V2FybmluZ10gPVxuICAgIHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgY2xvc2VNZXNzYWdlUmVxdWVzdFdhcm5pbmcgPSAoKSA9PiB7XG4gICAgc2V0SXNTaG93aW5nTWVzc2FnZVJlcXVlc3RXYXJuaW5nKGZhbHNlKTtcbiAgfTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIC8vIEtpY2sgb2ZmIHRoZSBleHBlbnNpdmUgaHlkcmF0aW9uIG9mIHRoZSBjdXJyZW50IHNoYXJlZEdyb3VwTmFtZXNcbiAgICB1cGRhdGVTaGFyZWRHcm91cHMoKTtcbiAgfSwgW3VwZGF0ZVNoYXJlZEdyb3Vwc10pO1xuXG4gIGxldCBhdmF0YXJCbHVyOiBBdmF0YXJCbHVyO1xuICBsZXQgYXZhdGFyT25DbGljazogdW5kZWZpbmVkIHwgKCgpID0+IHZvaWQpO1xuICBpZiAoXG4gICAgc2hvdWxkQmx1ckF2YXRhcih7XG4gICAgICBhY2NlcHRlZE1lc3NhZ2VSZXF1ZXN0LFxuICAgICAgYXZhdGFyUGF0aCxcbiAgICAgIGlzTWUsXG4gICAgICBzaGFyZWRHcm91cE5hbWVzLFxuICAgICAgdW5ibHVycmVkQXZhdGFyUGF0aCxcbiAgICB9KVxuICApIHtcbiAgICBhdmF0YXJCbHVyID0gQXZhdGFyQmx1ci5CbHVyUGljdHVyZVdpdGhDbGlja1RvVmlldztcbiAgICBhdmF0YXJPbkNsaWNrID0gdW5ibHVyQXZhdGFyO1xuICB9IGVsc2Uge1xuICAgIGF2YXRhckJsdXIgPSBBdmF0YXJCbHVyLk5vQmx1cjtcbiAgfVxuXG4gIGNvbnN0IHBob25lTnVtYmVyT25seSA9IEJvb2xlYW4oXG4gICAgIW5hbWUgJiYgIXByb2ZpbGVOYW1lICYmIGNvbnZlcnNhdGlvblR5cGUgPT09ICdkaXJlY3QnXG4gICk7XG5cbiAgLyogZXNsaW50LWRpc2FibGUgbm8tbmVzdGVkLXRlcm5hcnkgKi9cbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2R1bGUtY29udmVyc2F0aW9uLWhlcm9cIj5cbiAgICAgICAgPEF2YXRhclxuICAgICAgICAgIGFjY2VwdGVkTWVzc2FnZVJlcXVlc3Q9e2FjY2VwdGVkTWVzc2FnZVJlcXVlc3R9XG4gICAgICAgICAgYXZhdGFyUGF0aD17YXZhdGFyUGF0aH1cbiAgICAgICAgICBiYWRnZT17YmFkZ2V9XG4gICAgICAgICAgYmx1cj17YXZhdGFyQmx1cn1cbiAgICAgICAgICBjbGFzc05hbWU9XCJtb2R1bGUtY29udmVyc2F0aW9uLWhlcm9fX2F2YXRhclwiXG4gICAgICAgICAgY29sb3I9e2NvbG9yfVxuICAgICAgICAgIGNvbnZlcnNhdGlvblR5cGU9e2NvbnZlcnNhdGlvblR5cGV9XG4gICAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgICBpc01lPXtpc01lfVxuICAgICAgICAgIG5hbWU9e25hbWV9XG4gICAgICAgICAgbm90ZVRvU2VsZj17aXNNZX1cbiAgICAgICAgICBvbkNsaWNrPXthdmF0YXJPbkNsaWNrfVxuICAgICAgICAgIHByb2ZpbGVOYW1lPXtwcm9maWxlTmFtZX1cbiAgICAgICAgICBzaGFyZWRHcm91cE5hbWVzPXtzaGFyZWRHcm91cE5hbWVzfVxuICAgICAgICAgIHNpemU9ezExMn1cbiAgICAgICAgICB0aGVtZT17dGhlbWV9XG4gICAgICAgICAgdGl0bGU9e3RpdGxlfVxuICAgICAgICAvPlxuICAgICAgICA8aDEgY2xhc3NOYW1lPVwibW9kdWxlLWNvbnZlcnNhdGlvbi1oZXJvX19wcm9maWxlLW5hbWVcIj5cbiAgICAgICAgICB7aXNNZSA/IGkxOG4oJ25vdGVUb1NlbGYnKSA6IDxDb250YWN0TmFtZSB0aXRsZT17dGl0bGV9IC8+fVxuICAgICAgICA8L2gxPlxuICAgICAgICB7YWJvdXQgJiYgIWlzTWUgJiYgKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kdWxlLWFib3V0X19jb250YWluZXJcIj5cbiAgICAgICAgICAgIDxBYm91dCB0ZXh0PXthYm91dH0gLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKX1cbiAgICAgICAgeyFpc01lID8gKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kdWxlLWNvbnZlcnNhdGlvbi1oZXJvX193aXRoXCI+XG4gICAgICAgICAgICB7Z3JvdXBEZXNjcmlwdGlvbiA/IChcbiAgICAgICAgICAgICAgPEdyb3VwRGVzY3JpcHRpb25cbiAgICAgICAgICAgICAgICBpMThuPXtpMThufVxuICAgICAgICAgICAgICAgIHRpdGxlPXt0aXRsZX1cbiAgICAgICAgICAgICAgICB0ZXh0PXtncm91cERlc2NyaXB0aW9ufVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgKSA6IG1lbWJlcnNDb3VudCA9PT0gMSA/IChcbiAgICAgICAgICAgICAgaTE4bignQ29udmVyc2F0aW9uSGVyby0tbWVtYmVycy0xJylcbiAgICAgICAgICAgICkgOiBtZW1iZXJzQ291bnQgIT09IHVuZGVmaW5lZCA/IChcbiAgICAgICAgICAgICAgaTE4bignQ29udmVyc2F0aW9uSGVyby0tbWVtYmVycycsIFtgJHttZW1iZXJzQ291bnR9YF0pXG4gICAgICAgICAgICApIDogcGhvbmVOdW1iZXJPbmx5ID8gbnVsbCA6IChcbiAgICAgICAgICAgICAgcGhvbmVOdW1iZXJcbiAgICAgICAgICAgICl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICkgOiBudWxsfVxuICAgICAgICB7cmVuZGVyTWVtYmVyc2hpcFJvdyh7XG4gICAgICAgICAgYWNjZXB0ZWRNZXNzYWdlUmVxdWVzdCxcbiAgICAgICAgICBjb252ZXJzYXRpb25UeXBlLFxuICAgICAgICAgIGkxOG4sXG4gICAgICAgICAgaXNNZSxcbiAgICAgICAgICBvbkNsaWNrTWVzc2FnZVJlcXVlc3RXYXJuaW5nKCkge1xuICAgICAgICAgICAgc2V0SXNTaG93aW5nTWVzc2FnZVJlcXVlc3RXYXJuaW5nKHRydWUpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgcGhvbmVOdW1iZXIsXG4gICAgICAgICAgc2hhcmVkR3JvdXBOYW1lcyxcbiAgICAgICAgfSl9XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kdWxlLWNvbnZlcnNhdGlvbi1oZXJvX19saW5rTm90aWZpY2F0aW9uXCI+XG4gICAgICAgICAge2kxOG4oJ21lc3NhZ2VIaXN0b3J5VW5zeW5jZWQnKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIHtpc1Nob3dpbmdNZXNzYWdlUmVxdWVzdFdhcm5pbmcgJiYgKFxuICAgICAgICA8Q29uZmlybWF0aW9uRGlhbG9nXG4gICAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgICBvbkNsb3NlPXtjbG9zZU1lc3NhZ2VSZXF1ZXN0V2FybmluZ31cbiAgICAgICAgICBhY3Rpb25zPXtbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHRleHQ6IGkxOG4oJ01lc3NhZ2VSZXF1ZXN0V2FybmluZ19fZGlhbG9nX19sZWFybi1ldmVuLW1vcmUnKSxcbiAgICAgICAgICAgICAgYWN0aW9uOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgb3BlbkxpbmtJbldlYkJyb3dzZXIoXG4gICAgICAgICAgICAgICAgICAnaHR0cHM6Ly9zdXBwb3J0LnNpZ25hbC5vcmcvaGMvYXJ0aWNsZXMvMzYwMDA3NDU5NTkxJ1xuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgY2xvc2VNZXNzYWdlUmVxdWVzdFdhcm5pbmcoKTtcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgXX1cbiAgICAgICAgPlxuICAgICAgICAgIHtpMThuKCdNZXNzYWdlUmVxdWVzdFdhcm5pbmdfX2RpYWxvZ19fZGV0YWlscycpfVxuICAgICAgICA8L0NvbmZpcm1hdGlvbkRpYWxvZz5cbiAgICAgICl9XG4gICAgPC8+XG4gICk7XG4gIC8qIGVzbGludC1lbmFibGUgbm8tbmVzdGVkLXRlcm5hcnkgKi9cbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsbUJBQTJDO0FBRTNDLG9CQUFtQztBQUNuQyx5QkFBNEI7QUFDNUIsbUJBQXNCO0FBQ3RCLDhCQUFpQztBQUNqQyw4QkFBaUM7QUFFakMsZ0NBQW1DO0FBQ25DLG9CQUFrRDtBQUNsRCw4QkFBaUM7QUFDakMsa0NBQXFDO0FBaUJyQyxNQUFNLHNCQUFzQix3QkFBQztBQUFBLEVBQzNCO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsTUFXTTtBQUNOLFFBQU0sWUFBWTtBQUVsQixNQUFJLHFCQUFxQixVQUFVO0FBQ2pDLFdBQU87QUFBQSxFQUNUO0FBRUEsTUFBSSxNQUFNO0FBQ1IsV0FBTyxtREFBQztBQUFBLE1BQUk7QUFBQSxPQUF1QixL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
