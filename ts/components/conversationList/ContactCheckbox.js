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
var ContactCheckbox_exports = {};
__export(ContactCheckbox_exports, {
  ContactCheckbox: () => ContactCheckbox,
  ContactCheckboxDisabledReason: () => ContactCheckboxDisabledReason
});
module.exports = __toCommonJS(ContactCheckbox_exports);
var import_react = __toESM(require("react"));
var import_BaseConversationListItem = require("./BaseConversationListItem");
var import_ContactName = require("../conversation/ContactName");
var import_About = require("../conversation/About");
var ContactCheckboxDisabledReason = /* @__PURE__ */ ((ContactCheckboxDisabledReason2) => {
  ContactCheckboxDisabledReason2[ContactCheckboxDisabledReason2["AlreadyAdded"] = 1] = "AlreadyAdded";
  ContactCheckboxDisabledReason2[ContactCheckboxDisabledReason2["MaximumContactsSelected"] = 2] = "MaximumContactsSelected";
  return ContactCheckboxDisabledReason2;
})(ContactCheckboxDisabledReason || {});
const ContactCheckbox = import_react.default.memo(/* @__PURE__ */ __name(function ContactCheckbox2({
  about,
  acceptedMessageRequest,
  avatarPath,
  badge,
  color,
  disabledReason,
  i18n,
  id,
  isChecked,
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
  const disabled = Boolean(disabledReason);
  const headerName = isMe ? /* @__PURE__ */ import_react.default.createElement("span", {
    className: import_BaseConversationListItem.HEADER_CONTACT_NAME_CLASS_NAME
  }, i18n("noteToSelf")) : /* @__PURE__ */ import_react.default.createElement(import_ContactName.ContactName, {
    module: import_BaseConversationListItem.HEADER_CONTACT_NAME_CLASS_NAME,
    title
  });
  let messageText;
  if (disabledReason === 1 /* AlreadyAdded */) {
    messageText = i18n("alreadyAMember");
  } else if (about) {
    messageText = /* @__PURE__ */ import_react.default.createElement(import_About.About, {
      className: "",
      text: about
    });
  } else {
    messageText = null;
  }
  const onClickItem = /* @__PURE__ */ __name(() => {
    onClick(id, disabledReason);
  }, "onClickItem");
  return /* @__PURE__ */ import_react.default.createElement(import_BaseConversationListItem.BaseConversationListItem, {
    acceptedMessageRequest,
    avatarPath,
    badge,
    checked: isChecked,
    color,
    conversationType: type,
    disabled,
    headerName,
    i18n,
    id,
    isMe,
    isSelected: false,
    messageText,
    name,
    onClick: onClickItem,
    phoneNumber,
    profileName,
    sharedGroupNames,
    theme,
    title,
    unblurredAvatarPath
  });
}, "ContactCheckbox"));
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ContactCheckbox,
  ContactCheckboxDisabledReason
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ29udGFjdENoZWNrYm94LnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEtMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB0eXBlIHsgRnVuY3Rpb25Db21wb25lbnQsIFJlYWN0Tm9kZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7XG4gIEJhc2VDb252ZXJzYXRpb25MaXN0SXRlbSxcbiAgSEVBREVSX0NPTlRBQ1RfTkFNRV9DTEFTU19OQU1FLFxufSBmcm9tICcuL0Jhc2VDb252ZXJzYXRpb25MaXN0SXRlbSc7XG5pbXBvcnQgdHlwZSB7IENvbnZlcnNhdGlvblR5cGUgfSBmcm9tICcuLi8uLi9zdGF0ZS9kdWNrcy9jb252ZXJzYXRpb25zJztcbmltcG9ydCB0eXBlIHsgQmFkZ2VUeXBlIH0gZnJvbSAnLi4vLi4vYmFkZ2VzL3R5cGVzJztcbmltcG9ydCB0eXBlIHsgTG9jYWxpemVyVHlwZSwgVGhlbWVUeXBlIH0gZnJvbSAnLi4vLi4vdHlwZXMvVXRpbCc7XG5pbXBvcnQgeyBDb250YWN0TmFtZSB9IGZyb20gJy4uL2NvbnZlcnNhdGlvbi9Db250YWN0TmFtZSc7XG5pbXBvcnQgeyBBYm91dCB9IGZyb20gJy4uL2NvbnZlcnNhdGlvbi9BYm91dCc7XG5cbmV4cG9ydCBlbnVtIENvbnRhY3RDaGVja2JveERpc2FibGVkUmVhc29uIHtcbiAgLy8gV2Ugc3RhcnQgdGhlIGVudW0gYXQgMSBiZWNhdXNlIHRoZSBkZWZhdWx0IHN0YXJ0aW5nIHZhbHVlIG9mIDAgaXMgZmFsc3kuXG4gIEFscmVhZHlBZGRlZCA9IDEsXG4gIE1heGltdW1Db250YWN0c1NlbGVjdGVkLFxufVxuXG5leHBvcnQgdHlwZSBQcm9wc0RhdGFUeXBlID0ge1xuICBiYWRnZTogdW5kZWZpbmVkIHwgQmFkZ2VUeXBlO1xuICBkaXNhYmxlZFJlYXNvbj86IENvbnRhY3RDaGVja2JveERpc2FibGVkUmVhc29uO1xuICBpc0NoZWNrZWQ6IGJvb2xlYW47XG59ICYgUGljazxcbiAgQ29udmVyc2F0aW9uVHlwZSxcbiAgfCAnYWJvdXQnXG4gIHwgJ2FjY2VwdGVkTWVzc2FnZVJlcXVlc3QnXG4gIHwgJ2F2YXRhclBhdGgnXG4gIHwgJ2NvbG9yJ1xuICB8ICdpZCdcbiAgfCAnaXNNZSdcbiAgfCAnbmFtZSdcbiAgfCAncGhvbmVOdW1iZXInXG4gIHwgJ3Byb2ZpbGVOYW1lJ1xuICB8ICdzaGFyZWRHcm91cE5hbWVzJ1xuICB8ICd0aXRsZSdcbiAgfCAndHlwZSdcbiAgfCAndW5ibHVycmVkQXZhdGFyUGF0aCdcbj47XG5cbnR5cGUgUHJvcHNIb3VzZWtlZXBpbmdUeXBlID0ge1xuICBpMThuOiBMb2NhbGl6ZXJUeXBlO1xuICBvbkNsaWNrOiAoXG4gICAgaWQ6IHN0cmluZyxcbiAgICBkaXNhYmxlZFJlYXNvbjogdW5kZWZpbmVkIHwgQ29udGFjdENoZWNrYm94RGlzYWJsZWRSZWFzb25cbiAgKSA9PiB2b2lkO1xuICB0aGVtZTogVGhlbWVUeXBlO1xufTtcblxudHlwZSBQcm9wc1R5cGUgPSBQcm9wc0RhdGFUeXBlICYgUHJvcHNIb3VzZWtlZXBpbmdUeXBlO1xuXG5leHBvcnQgY29uc3QgQ29udGFjdENoZWNrYm94OiBGdW5jdGlvbkNvbXBvbmVudDxQcm9wc1R5cGU+ID0gUmVhY3QubWVtbyhcbiAgZnVuY3Rpb24gQ29udGFjdENoZWNrYm94KHtcbiAgICBhYm91dCxcbiAgICBhY2NlcHRlZE1lc3NhZ2VSZXF1ZXN0LFxuICAgIGF2YXRhclBhdGgsXG4gICAgYmFkZ2UsXG4gICAgY29sb3IsXG4gICAgZGlzYWJsZWRSZWFzb24sXG4gICAgaTE4bixcbiAgICBpZCxcbiAgICBpc0NoZWNrZWQsXG4gICAgaXNNZSxcbiAgICBuYW1lLFxuICAgIG9uQ2xpY2ssXG4gICAgcGhvbmVOdW1iZXIsXG4gICAgcHJvZmlsZU5hbWUsXG4gICAgc2hhcmVkR3JvdXBOYW1lcyxcbiAgICB0aGVtZSxcbiAgICB0aXRsZSxcbiAgICB0eXBlLFxuICAgIHVuYmx1cnJlZEF2YXRhclBhdGgsXG4gIH0pIHtcbiAgICBjb25zdCBkaXNhYmxlZCA9IEJvb2xlYW4oZGlzYWJsZWRSZWFzb24pO1xuXG4gICAgY29uc3QgaGVhZGVyTmFtZSA9IGlzTWUgPyAoXG4gICAgICA8c3BhbiBjbGFzc05hbWU9e0hFQURFUl9DT05UQUNUX05BTUVfQ0xBU1NfTkFNRX0+XG4gICAgICAgIHtpMThuKCdub3RlVG9TZWxmJyl9XG4gICAgICA8L3NwYW4+XG4gICAgKSA6IChcbiAgICAgIDxDb250YWN0TmFtZSBtb2R1bGU9e0hFQURFUl9DT05UQUNUX05BTUVfQ0xBU1NfTkFNRX0gdGl0bGU9e3RpdGxlfSAvPlxuICAgICk7XG5cbiAgICBsZXQgbWVzc2FnZVRleHQ6IFJlYWN0Tm9kZTtcbiAgICBpZiAoZGlzYWJsZWRSZWFzb24gPT09IENvbnRhY3RDaGVja2JveERpc2FibGVkUmVhc29uLkFscmVhZHlBZGRlZCkge1xuICAgICAgbWVzc2FnZVRleHQgPSBpMThuKCdhbHJlYWR5QU1lbWJlcicpO1xuICAgIH0gZWxzZSBpZiAoYWJvdXQpIHtcbiAgICAgIG1lc3NhZ2VUZXh0ID0gPEFib3V0IGNsYXNzTmFtZT1cIlwiIHRleHQ9e2Fib3V0fSAvPjtcbiAgICB9IGVsc2Uge1xuICAgICAgbWVzc2FnZVRleHQgPSBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IG9uQ2xpY2tJdGVtID0gKCkgPT4ge1xuICAgICAgb25DbGljayhpZCwgZGlzYWJsZWRSZWFzb24pO1xuICAgIH07XG5cbiAgICByZXR1cm4gKFxuICAgICAgPEJhc2VDb252ZXJzYXRpb25MaXN0SXRlbVxuICAgICAgICBhY2NlcHRlZE1lc3NhZ2VSZXF1ZXN0PXthY2NlcHRlZE1lc3NhZ2VSZXF1ZXN0fVxuICAgICAgICBhdmF0YXJQYXRoPXthdmF0YXJQYXRofVxuICAgICAgICBiYWRnZT17YmFkZ2V9XG4gICAgICAgIGNoZWNrZWQ9e2lzQ2hlY2tlZH1cbiAgICAgICAgY29sb3I9e2NvbG9yfVxuICAgICAgICBjb252ZXJzYXRpb25UeXBlPXt0eXBlfVxuICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgIGhlYWRlck5hbWU9e2hlYWRlck5hbWV9XG4gICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgIGlkPXtpZH1cbiAgICAgICAgaXNNZT17aXNNZX1cbiAgICAgICAgaXNTZWxlY3RlZD17ZmFsc2V9XG4gICAgICAgIG1lc3NhZ2VUZXh0PXttZXNzYWdlVGV4dH1cbiAgICAgICAgbmFtZT17bmFtZX1cbiAgICAgICAgb25DbGljaz17b25DbGlja0l0ZW19XG4gICAgICAgIHBob25lTnVtYmVyPXtwaG9uZU51bWJlcn1cbiAgICAgICAgcHJvZmlsZU5hbWU9e3Byb2ZpbGVOYW1lfVxuICAgICAgICBzaGFyZWRHcm91cE5hbWVzPXtzaGFyZWRHcm91cE5hbWVzfVxuICAgICAgICB0aGVtZT17dGhlbWV9XG4gICAgICAgIHRpdGxlPXt0aXRsZX1cbiAgICAgICAgdW5ibHVycmVkQXZhdGFyUGF0aD17dW5ibHVycmVkQXZhdGFyUGF0aH1cbiAgICAgIC8+XG4gICAgKTtcbiAgfVxuKTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUlBLG1CQUFrQjtBQUVsQixzQ0FHTztBQUlQLHlCQUE0QjtBQUM1QixtQkFBc0I7QUFFZixJQUFLLGdDQUFMLGtCQUFLLG1DQUFMO0FBRUwsa0ZBQWUsS0FBZjtBQUNBO0FBSFU7QUFBQTtBQXNDTCxNQUFNLGtCQUFnRCxxQkFBTSxLQUNqRSxpREFBeUI7QUFBQSxFQUN2QjtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEdBQ0M7QUFDRCxRQUFNLFdBQVcsUUFBUSxjQUFjO0FBRXZDLFFBQU0sYUFBYSxPQUNqQixtREFBQztBQUFBLElBQUssV0FBVztBQUFBLEtBQ2QsS0FBSyxZQUFZLENBQ3BCLElBRUEsbURBQUM7QUFBQSxJQUFZLFFBQVE7QUFBQSxJQUFnQztBQUFBLEdBQWM7QUFHckUsTUFBSTtBQUNKLE1BQUksbUJBQW1CLHNCQUE0QztBQUNqRSxrQkFBYyxLQUFLLGdCQUFnQjtBQUFBLEVBQ3JDLFdBQVcsT0FBTztBQUNoQixrQkFBYyxtREFBQztBQUFBLE1BQU0sV0FBVTtBQUFBLE1BQUcsTUFBTTtBQUFBLEtBQU87QUFBQSxFQUNqRCxPQUFPO0FBQ0wsa0JBQWM7QUFBQSxFQUNoQjtBQUVBLFFBQU0sY0FBYyw2QkFBTTtBQUN4QixZQUFRLElBQUksY0FBYztBQUFBLEVBQzVCLEdBRm9CO0FBSXBCLFNBQ0UsbURBQUM7QUFBQSxJQUNDO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBLFNBQVM7QUFBQSxJQUNUO0FBQUEsSUFDQSxrQkFBa0I7QUFBQSxJQUNsQjtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBLFlBQVk7QUFBQSxJQUNaO0FBQUEsSUFDQTtBQUFBLElBQ0EsU0FBUztBQUFBLElBQ1Q7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEdBQ0Y7QUFFSixHQXJFQSxrQkFzRUY7IiwKICAibmFtZXMiOiBbXQp9Cg==
