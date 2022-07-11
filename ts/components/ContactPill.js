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
var ContactPill_exports = {};
__export(ContactPill_exports, {
  ContactPill: () => ContactPill
});
module.exports = __toCommonJS(ContactPill_exports);
var import_react = __toESM(require("react"));
var import_ContactName = require("./conversation/ContactName");
var import_Avatar = require("./Avatar");
const ContactPill = /* @__PURE__ */ __name(({
  acceptedMessageRequest,
  avatarPath,
  color,
  firstName,
  i18n,
  isMe,
  id,
  name,
  phoneNumber,
  profileName,
  sharedGroupNames,
  title,
  unblurredAvatarPath,
  onClickRemove
}) => {
  const removeLabel = i18n("ContactPill--remove");
  return /* @__PURE__ */ import_react.default.createElement("div", {
    className: "module-ContactPill"
  }, /* @__PURE__ */ import_react.default.createElement(import_Avatar.Avatar, {
    acceptedMessageRequest,
    avatarPath,
    badge: void 0,
    color,
    noteToSelf: false,
    conversationType: "direct",
    i18n,
    isMe,
    name,
    phoneNumber,
    profileName,
    title,
    sharedGroupNames,
    size: import_Avatar.AvatarSize.TWENTY_EIGHT,
    unblurredAvatarPath
  }), /* @__PURE__ */ import_react.default.createElement(import_ContactName.ContactName, {
    firstName,
    module: "module-ContactPill__contact-name",
    preferFirstName: true,
    title
  }), /* @__PURE__ */ import_react.default.createElement("button", {
    "aria-label": removeLabel,
    className: "module-ContactPill__remove",
    onClick: () => {
      onClickRemove(id);
    },
    title: removeLabel,
    type: "button"
  }));
}, "ContactPill");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ContactPill
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ29udGFjdFBpbGwudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB0eXBlIHsgRnVuY3Rpb25Db21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgdHlwZSB7IENvbnZlcnNhdGlvblR5cGUgfSBmcm9tICcuLi9zdGF0ZS9kdWNrcy9jb252ZXJzYXRpb25zJztcbmltcG9ydCB0eXBlIHsgTG9jYWxpemVyVHlwZSB9IGZyb20gJy4uL3R5cGVzL1V0aWwnO1xuaW1wb3J0IHsgQ29udGFjdE5hbWUgfSBmcm9tICcuL2NvbnZlcnNhdGlvbi9Db250YWN0TmFtZSc7XG5pbXBvcnQgeyBBdmF0YXIsIEF2YXRhclNpemUgfSBmcm9tICcuL0F2YXRhcic7XG5cbmV4cG9ydCB0eXBlIFByb3BzVHlwZSA9IHtcbiAgaTE4bjogTG9jYWxpemVyVHlwZTtcbiAgb25DbGlja1JlbW92ZTogKGlkOiBzdHJpbmcpID0+IHZvaWQ7XG59ICYgUGljazxcbiAgQ29udmVyc2F0aW9uVHlwZSxcbiAgfCAnYWJvdXQnXG4gIHwgJ2FjY2VwdGVkTWVzc2FnZVJlcXVlc3QnXG4gIHwgJ2F2YXRhclBhdGgnXG4gIHwgJ2NvbG9yJ1xuICB8ICdmaXJzdE5hbWUnXG4gIHwgJ2lkJ1xuICB8ICdpc01lJ1xuICB8ICduYW1lJ1xuICB8ICdwaG9uZU51bWJlcidcbiAgfCAncHJvZmlsZU5hbWUnXG4gIHwgJ3NoYXJlZEdyb3VwTmFtZXMnXG4gIHwgJ3RpdGxlJ1xuICB8ICd1bmJsdXJyZWRBdmF0YXJQYXRoJ1xuPjtcblxuZXhwb3J0IGNvbnN0IENvbnRhY3RQaWxsOiBGdW5jdGlvbkNvbXBvbmVudDxQcm9wc1R5cGU+ID0gKHtcbiAgYWNjZXB0ZWRNZXNzYWdlUmVxdWVzdCxcbiAgYXZhdGFyUGF0aCxcbiAgY29sb3IsXG4gIGZpcnN0TmFtZSxcbiAgaTE4bixcbiAgaXNNZSxcbiAgaWQsXG4gIG5hbWUsXG4gIHBob25lTnVtYmVyLFxuICBwcm9maWxlTmFtZSxcbiAgc2hhcmVkR3JvdXBOYW1lcyxcbiAgdGl0bGUsXG4gIHVuYmx1cnJlZEF2YXRhclBhdGgsXG4gIG9uQ2xpY2tSZW1vdmUsXG59KSA9PiB7XG4gIGNvbnN0IHJlbW92ZUxhYmVsID0gaTE4bignQ29udGFjdFBpbGwtLXJlbW92ZScpO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJtb2R1bGUtQ29udGFjdFBpbGxcIj5cbiAgICAgIDxBdmF0YXJcbiAgICAgICAgYWNjZXB0ZWRNZXNzYWdlUmVxdWVzdD17YWNjZXB0ZWRNZXNzYWdlUmVxdWVzdH1cbiAgICAgICAgYXZhdGFyUGF0aD17YXZhdGFyUGF0aH1cbiAgICAgICAgYmFkZ2U9e3VuZGVmaW5lZH1cbiAgICAgICAgY29sb3I9e2NvbG9yfVxuICAgICAgICBub3RlVG9TZWxmPXtmYWxzZX1cbiAgICAgICAgY29udmVyc2F0aW9uVHlwZT1cImRpcmVjdFwiXG4gICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgIGlzTWU9e2lzTWV9XG4gICAgICAgIG5hbWU9e25hbWV9XG4gICAgICAgIHBob25lTnVtYmVyPXtwaG9uZU51bWJlcn1cbiAgICAgICAgcHJvZmlsZU5hbWU9e3Byb2ZpbGVOYW1lfVxuICAgICAgICB0aXRsZT17dGl0bGV9XG4gICAgICAgIHNoYXJlZEdyb3VwTmFtZXM9e3NoYXJlZEdyb3VwTmFtZXN9XG4gICAgICAgIHNpemU9e0F2YXRhclNpemUuVFdFTlRZX0VJR0hUfVxuICAgICAgICB1bmJsdXJyZWRBdmF0YXJQYXRoPXt1bmJsdXJyZWRBdmF0YXJQYXRofVxuICAgICAgLz5cbiAgICAgIDxDb250YWN0TmFtZVxuICAgICAgICBmaXJzdE5hbWU9e2ZpcnN0TmFtZX1cbiAgICAgICAgbW9kdWxlPVwibW9kdWxlLUNvbnRhY3RQaWxsX19jb250YWN0LW5hbWVcIlxuICAgICAgICBwcmVmZXJGaXJzdE5hbWVcbiAgICAgICAgdGl0bGU9e3RpdGxlfVxuICAgICAgLz5cbiAgICAgIDxidXR0b25cbiAgICAgICAgYXJpYS1sYWJlbD17cmVtb3ZlTGFiZWx9XG4gICAgICAgIGNsYXNzTmFtZT1cIm1vZHVsZS1Db250YWN0UGlsbF9fcmVtb3ZlXCJcbiAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgIG9uQ2xpY2tSZW1vdmUoaWQpO1xuICAgICAgICB9fVxuICAgICAgICB0aXRsZT17cmVtb3ZlTGFiZWx9XG4gICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgLz5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSUEsbUJBQWtCO0FBSWxCLHlCQUE0QjtBQUM1QixvQkFBbUM7QUFzQjVCLE1BQU0sY0FBNEMsd0JBQUM7QUFBQSxFQUN4RDtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxNQUNJO0FBQ0osUUFBTSxjQUFjLEtBQUsscUJBQXFCO0FBRTlDLFNBQ0UsbURBQUM7QUFBQSxJQUFJLFdBQVU7QUFBQSxLQUNiLG1EQUFDO0FBQUEsSUFDQztBQUFBLElBQ0E7QUFBQSxJQUNBLE9BQU87QUFBQSxJQUNQO0FBQUEsSUFDQSxZQUFZO0FBQUEsSUFDWixrQkFBaUI7QUFBQSxJQUNqQjtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0EsTUFBTSx5QkFBVztBQUFBLElBQ2pCO0FBQUEsR0FDRixHQUNBLG1EQUFDO0FBQUEsSUFDQztBQUFBLElBQ0EsUUFBTztBQUFBLElBQ1AsaUJBQWU7QUFBQSxJQUNmO0FBQUEsR0FDRixHQUNBLG1EQUFDO0FBQUEsSUFDQyxjQUFZO0FBQUEsSUFDWixXQUFVO0FBQUEsSUFDVixTQUFTLE1BQU07QUFDYixvQkFBYyxFQUFFO0FBQUEsSUFDbEI7QUFBQSxJQUNBLE9BQU87QUFBQSxJQUNQLE1BQUs7QUFBQSxHQUNQLENBQ0Y7QUFFSixHQXREeUQ7IiwKICAibmFtZXMiOiBbXQp9Cg==
