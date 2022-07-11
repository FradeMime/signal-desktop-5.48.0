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
var VerificationNotification_stories_exports = {};
__export(VerificationNotification_stories_exports, {
  LongName: () => LongName,
  MarkAsNotVerified: () => MarkAsNotVerified,
  MarkAsNotVerifiedRemotely: () => MarkAsNotVerifiedRemotely,
  MarkAsVerified: () => MarkAsVerified,
  MarkAsVerifiedRemotely: () => MarkAsVerifiedRemotely,
  default: () => VerificationNotification_stories_default
});
module.exports = __toCommonJS(VerificationNotification_stories_exports);
var React = __toESM(require("react"));
var import_addon_knobs = require("@storybook/addon-knobs");
var import_setupI18n = require("../../util/setupI18n");
var import_messages = __toESM(require("../../../_locales/en/messages.json"));
var import_VerificationNotification = require("./VerificationNotification");
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
var VerificationNotification_stories_default = {
  title: "Components/Conversation/VerificationNotification"
};
const contact = { title: "Mr. Fire" };
const createProps = /* @__PURE__ */ __name((overrideProps = {}) => ({
  i18n,
  type: overrideProps.type || "markVerified",
  isLocal: (0, import_addon_knobs.boolean)("isLocal", overrideProps.isLocal !== false),
  contact: overrideProps.contact || contact
}), "createProps");
const MarkAsVerified = /* @__PURE__ */ __name(() => {
  const props = createProps({ type: "markVerified" });
  return /* @__PURE__ */ React.createElement(import_VerificationNotification.VerificationNotification, {
    ...props
  });
}, "MarkAsVerified");
MarkAsVerified.story = {
  name: "Mark as Verified"
};
const MarkAsNotVerified = /* @__PURE__ */ __name(() => {
  const props = createProps({ type: "markNotVerified" });
  return /* @__PURE__ */ React.createElement(import_VerificationNotification.VerificationNotification, {
    ...props
  });
}, "MarkAsNotVerified");
MarkAsNotVerified.story = {
  name: "Mark as Not Verified"
};
const MarkAsVerifiedRemotely = /* @__PURE__ */ __name(() => {
  const props = createProps({ type: "markVerified", isLocal: false });
  return /* @__PURE__ */ React.createElement(import_VerificationNotification.VerificationNotification, {
    ...props
  });
}, "MarkAsVerifiedRemotely");
MarkAsVerifiedRemotely.story = {
  name: "Mark as Verified Remotely"
};
const MarkAsNotVerifiedRemotely = /* @__PURE__ */ __name(() => {
  const props = createProps({ type: "markNotVerified", isLocal: false });
  return /* @__PURE__ */ React.createElement(import_VerificationNotification.VerificationNotification, {
    ...props
  });
}, "MarkAsNotVerifiedRemotely");
MarkAsNotVerifiedRemotely.story = {
  name: "Mark as Not Verified Remotely"
};
const LongName = /* @__PURE__ */ __name(() => {
  const longName = "\u{1F386}\u{1F36C}\u{1F3C8}".repeat(50);
  const props = createProps({
    type: "markVerified",
    contact: { title: longName }
  });
  return /* @__PURE__ */ React.createElement(import_VerificationNotification.VerificationNotification, {
    ...props
  });
}, "LongName");
LongName.story = {
  name: "Long name"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  LongName,
  MarkAsNotVerified,
  MarkAsNotVerifiedRemotely,
  MarkAsVerified,
  MarkAsVerifiedRemotely
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiVmVyaWZpY2F0aW9uTm90aWZpY2F0aW9uLnN0b3JpZXMudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMC0yMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgYm9vbGVhbiB9IGZyb20gJ0BzdG9yeWJvb2svYWRkb24ta25vYnMnO1xuXG5pbXBvcnQgeyBzZXR1cEkxOG4gfSBmcm9tICcuLi8uLi91dGlsL3NldHVwSTE4bic7XG5pbXBvcnQgZW5NZXNzYWdlcyBmcm9tICcuLi8uLi8uLi9fbG9jYWxlcy9lbi9tZXNzYWdlcy5qc29uJztcbmltcG9ydCB0eXBlIHsgUHJvcHMgfSBmcm9tICcuL1ZlcmlmaWNhdGlvbk5vdGlmaWNhdGlvbic7XG5pbXBvcnQgeyBWZXJpZmljYXRpb25Ob3RpZmljYXRpb24gfSBmcm9tICcuL1ZlcmlmaWNhdGlvbk5vdGlmaWNhdGlvbic7XG5cbmNvbnN0IGkxOG4gPSBzZXR1cEkxOG4oJ2VuJywgZW5NZXNzYWdlcyk7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgdGl0bGU6ICdDb21wb25lbnRzL0NvbnZlcnNhdGlvbi9WZXJpZmljYXRpb25Ob3RpZmljYXRpb24nLFxufTtcblxuY29uc3QgY29udGFjdCA9IHsgdGl0bGU6ICdNci4gRmlyZScgfTtcblxuY29uc3QgY3JlYXRlUHJvcHMgPSAob3ZlcnJpZGVQcm9wczogUGFydGlhbDxQcm9wcz4gPSB7fSk6IFByb3BzID0+ICh7XG4gIGkxOG4sXG4gIHR5cGU6IG92ZXJyaWRlUHJvcHMudHlwZSB8fCAnbWFya1ZlcmlmaWVkJyxcbiAgaXNMb2NhbDogYm9vbGVhbignaXNMb2NhbCcsIG92ZXJyaWRlUHJvcHMuaXNMb2NhbCAhPT0gZmFsc2UpLFxuICBjb250YWN0OiBvdmVycmlkZVByb3BzLmNvbnRhY3QgfHwgY29udGFjdCxcbn0pO1xuXG5leHBvcnQgY29uc3QgTWFya0FzVmVyaWZpZWQgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBwcm9wcyA9IGNyZWF0ZVByb3BzKHsgdHlwZTogJ21hcmtWZXJpZmllZCcgfSk7XG5cbiAgcmV0dXJuIDxWZXJpZmljYXRpb25Ob3RpZmljYXRpb24gey4uLnByb3BzfSAvPjtcbn07XG5cbk1hcmtBc1ZlcmlmaWVkLnN0b3J5ID0ge1xuICBuYW1lOiAnTWFyayBhcyBWZXJpZmllZCcsXG59O1xuXG5leHBvcnQgY29uc3QgTWFya0FzTm90VmVyaWZpZWQgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBwcm9wcyA9IGNyZWF0ZVByb3BzKHsgdHlwZTogJ21hcmtOb3RWZXJpZmllZCcgfSk7XG5cbiAgcmV0dXJuIDxWZXJpZmljYXRpb25Ob3RpZmljYXRpb24gey4uLnByb3BzfSAvPjtcbn07XG5cbk1hcmtBc05vdFZlcmlmaWVkLnN0b3J5ID0ge1xuICBuYW1lOiAnTWFyayBhcyBOb3QgVmVyaWZpZWQnLFxufTtcblxuZXhwb3J0IGNvbnN0IE1hcmtBc1ZlcmlmaWVkUmVtb3RlbHkgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBwcm9wcyA9IGNyZWF0ZVByb3BzKHsgdHlwZTogJ21hcmtWZXJpZmllZCcsIGlzTG9jYWw6IGZhbHNlIH0pO1xuXG4gIHJldHVybiA8VmVyaWZpY2F0aW9uTm90aWZpY2F0aW9uIHsuLi5wcm9wc30gLz47XG59O1xuXG5NYXJrQXNWZXJpZmllZFJlbW90ZWx5LnN0b3J5ID0ge1xuICBuYW1lOiAnTWFyayBhcyBWZXJpZmllZCBSZW1vdGVseScsXG59O1xuXG5leHBvcnQgY29uc3QgTWFya0FzTm90VmVyaWZpZWRSZW1vdGVseSA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IHByb3BzID0gY3JlYXRlUHJvcHMoeyB0eXBlOiAnbWFya05vdFZlcmlmaWVkJywgaXNMb2NhbDogZmFsc2UgfSk7XG5cbiAgcmV0dXJuIDxWZXJpZmljYXRpb25Ob3RpZmljYXRpb24gey4uLnByb3BzfSAvPjtcbn07XG5cbk1hcmtBc05vdFZlcmlmaWVkUmVtb3RlbHkuc3RvcnkgPSB7XG4gIG5hbWU6ICdNYXJrIGFzIE5vdCBWZXJpZmllZCBSZW1vdGVseScsXG59O1xuXG5leHBvcnQgY29uc3QgTG9uZ05hbWUgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBsb25nTmFtZSA9ICdcdUQ4M0NcdURGODZcdUQ4M0NcdURGNkNcdUQ4M0NcdURGQzgnLnJlcGVhdCg1MCk7XG5cbiAgY29uc3QgcHJvcHMgPSBjcmVhdGVQcm9wcyh7XG4gICAgdHlwZTogJ21hcmtWZXJpZmllZCcsXG4gICAgY29udGFjdDogeyB0aXRsZTogbG9uZ05hbWUgfSxcbiAgfSk7XG5cbiAgcmV0dXJuIDxWZXJpZmljYXRpb25Ob3RpZmljYXRpb24gey4uLnByb3BzfSAvPjtcbn07XG5cbkxvbmdOYW1lLnN0b3J5ID0ge1xuICBuYW1lOiAnTG9uZyBuYW1lJyxcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLFlBQXVCO0FBQ3ZCLHlCQUF3QjtBQUV4Qix1QkFBMEI7QUFDMUIsc0JBQXVCO0FBRXZCLHNDQUF5QztBQUV6QyxNQUFNLE9BQU8sZ0NBQVUsTUFBTSx1QkFBVTtBQUV2QyxJQUFPLDJDQUFRO0FBQUEsRUFDYixPQUFPO0FBQ1Q7QUFFQSxNQUFNLFVBQVUsRUFBRSxPQUFPLFdBQVc7QUFFcEMsTUFBTSxjQUFjLHdCQUFDLGdCQUFnQyxDQUFDLE1BQWM7QUFBQSxFQUNsRTtBQUFBLEVBQ0EsTUFBTSxjQUFjLFFBQVE7QUFBQSxFQUM1QixTQUFTLGdDQUFRLFdBQVcsY0FBYyxZQUFZLEtBQUs7QUFBQSxFQUMzRCxTQUFTLGNBQWMsV0FBVztBQUNwQyxJQUxvQjtBQU9iLE1BQU0saUJBQWlCLDZCQUFtQjtBQUMvQyxRQUFNLFFBQVEsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRWxELFNBQU8sb0NBQUM7QUFBQSxPQUE2QjtBQUFBLEdBQU87QUFDOUMsR0FKOEI7QUFNOUIsZUFBZSxRQUFRO0FBQUEsRUFDckIsTUFBTTtBQUNSO0FBRU8sTUFBTSxvQkFBb0IsNkJBQW1CO0FBQ2xELFFBQU0sUUFBUSxZQUFZLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUVyRCxTQUFPLG9DQUFDO0FBQUEsT0FBNkI7QUFBQSxHQUFPO0FBQzlDLEdBSmlDO0FBTWpDLGtCQUFrQixRQUFRO0FBQUEsRUFDeEIsTUFBTTtBQUNSO0FBRU8sTUFBTSx5QkFBeUIsNkJBQW1CO0FBQ3ZELFFBQU0sUUFBUSxZQUFZLEVBQUUsTUFBTSxnQkFBZ0IsU0FBUyxNQUFNLENBQUM7QUFFbEUsU0FBTyxvQ0FBQztBQUFBLE9BQTZCO0FBQUEsR0FBTztBQUM5QyxHQUpzQztBQU10Qyx1QkFBdUIsUUFBUTtBQUFBLEVBQzdCLE1BQU07QUFDUjtBQUVPLE1BQU0sNEJBQTRCLDZCQUFtQjtBQUMxRCxRQUFNLFFBQVEsWUFBWSxFQUFFLE1BQU0sbUJBQW1CLFNBQVMsTUFBTSxDQUFDO0FBRXJFLFNBQU8sb0NBQUM7QUFBQSxPQUE2QjtBQUFBLEdBQU87QUFDOUMsR0FKeUM7QUFNekMsMEJBQTBCLFFBQVE7QUFBQSxFQUNoQyxNQUFNO0FBQ1I7QUFFTyxNQUFNLFdBQVcsNkJBQW1CO0FBQ3pDLFFBQU0sV0FBVyw4QkFBUyxPQUFPLEVBQUU7QUFFbkMsUUFBTSxRQUFRLFlBQVk7QUFBQSxJQUN4QixNQUFNO0FBQUEsSUFDTixTQUFTLEVBQUUsT0FBTyxTQUFTO0FBQUEsRUFDN0IsQ0FBQztBQUVELFNBQU8sb0NBQUM7QUFBQSxPQUE2QjtBQUFBLEdBQU87QUFDOUMsR0FUd0I7QUFXeEIsU0FBUyxRQUFRO0FBQUEsRUFDZixNQUFNO0FBQ1I7IiwKICAibmFtZXMiOiBbXQp9Cg==
