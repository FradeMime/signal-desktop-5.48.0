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
var ContactModal_stories_exports = {};
__export(ContactModal_stories_exports, {
  AsAdmin: () => AsAdmin,
  AsAdminViewingNonMemberOfGroup: () => AsAdminViewingNonMemberOfGroup,
  AsAdminWithNoGroupLink: () => AsAdminWithNoGroupLink,
  AsNonAdmin: () => AsNonAdmin,
  ViewingSelf: () => ViewingSelf,
  WithBadges: () => WithBadges,
  WithoutPhoneNumber: () => WithoutPhoneNumber,
  default: () => ContactModal_stories_default
});
module.exports = __toCommonJS(ContactModal_stories_exports);
var React = __toESM(require("react"));
var import_addon_actions = require("@storybook/addon-actions");
var import_addon_knobs = require("@storybook/addon-knobs");
var import_getDefaultConversation = require("../../test-both/helpers/getDefaultConversation");
var import_ContactModal = require("./ContactModal");
var import_setupI18n = require("../../util/setupI18n");
var import_messages = __toESM(require("../../../_locales/en/messages.json"));
var import_getFakeBadge = require("../../test-both/helpers/getFakeBadge");
var import_Util = require("../../types/Util");
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
var ContactModal_stories_default = {
  title: "Components/Conversation/ContactModal"
};
const defaultContact = (0, import_getDefaultConversation.getDefaultConversation)({
  id: "abcdef",
  title: "Pauline Oliveros",
  phoneNumber: "(333) 444-5515",
  about: "\u{1F44D} Free to chat"
});
const defaultGroup = (0, import_getDefaultConversation.getDefaultConversation)({
  id: "abcdef",
  areWeAdmin: true,
  title: "It's a group",
  groupLink: "something"
});
const createProps = /* @__PURE__ */ __name((overrideProps = {}) => ({
  areWeASubscriber: false,
  areWeAdmin: (0, import_addon_knobs.boolean)("areWeAdmin", overrideProps.areWeAdmin || false),
  badges: overrideProps.badges || [],
  contact: overrideProps.contact || defaultContact,
  conversation: overrideProps.conversation || defaultGroup,
  hideContactModal: (0, import_addon_actions.action)("hideContactModal"),
  i18n,
  isAdmin: (0, import_addon_knobs.boolean)("isAdmin", overrideProps.isAdmin || false),
  isMember: (0, import_addon_knobs.boolean)("isMember", overrideProps.isMember || true),
  removeMemberFromGroup: (0, import_addon_actions.action)("removeMemberFromGroup"),
  showConversation: (0, import_addon_actions.action)("showConversation"),
  theme: import_Util.ThemeType.light,
  toggleSafetyNumberModal: (0, import_addon_actions.action)("toggleSafetyNumberModal"),
  toggleAdmin: (0, import_addon_actions.action)("toggleAdmin"),
  updateConversationModelSharedGroups: (0, import_addon_actions.action)("updateConversationModelSharedGroups")
}), "createProps");
const AsNonAdmin = /* @__PURE__ */ __name(() => {
  const props = createProps({
    areWeAdmin: false
  });
  return /* @__PURE__ */ React.createElement(import_ContactModal.ContactModal, {
    ...props
  });
}, "AsNonAdmin");
AsNonAdmin.story = {
  name: "As non-admin"
};
const AsAdmin = /* @__PURE__ */ __name(() => {
  const props = createProps({
    areWeAdmin: true
  });
  return /* @__PURE__ */ React.createElement(import_ContactModal.ContactModal, {
    ...props
  });
}, "AsAdmin");
AsAdmin.story = {
  name: "As admin"
};
const AsAdminWithNoGroupLink = /* @__PURE__ */ __name(() => {
  const props = createProps({
    areWeAdmin: true,
    conversation: {
      ...defaultGroup,
      groupLink: void 0
    }
  });
  return /* @__PURE__ */ React.createElement(import_ContactModal.ContactModal, {
    ...props
  });
}, "AsAdminWithNoGroupLink");
AsAdminWithNoGroupLink.story = {
  name: "As admin with no group link"
};
const AsAdminViewingNonMemberOfGroup = /* @__PURE__ */ __name(() => {
  const props = createProps({
    isMember: false
  });
  return /* @__PURE__ */ React.createElement(import_ContactModal.ContactModal, {
    ...props
  });
}, "AsAdminViewingNonMemberOfGroup");
AsAdminViewingNonMemberOfGroup.story = {
  name: "As admin, viewing non-member of group"
};
const WithoutPhoneNumber = /* @__PURE__ */ __name(() => {
  const props = createProps({
    contact: {
      ...defaultContact,
      phoneNumber: void 0
    }
  });
  return /* @__PURE__ */ React.createElement(import_ContactModal.ContactModal, {
    ...props
  });
}, "WithoutPhoneNumber");
WithoutPhoneNumber.story = {
  name: "Without phone number"
};
const ViewingSelf = /* @__PURE__ */ __name(() => {
  const props = createProps({
    contact: {
      ...defaultContact,
      isMe: true
    }
  });
  return /* @__PURE__ */ React.createElement(import_ContactModal.ContactModal, {
    ...props
  });
}, "ViewingSelf");
ViewingSelf.story = {
  name: "Viewing self"
};
const WithBadges = /* @__PURE__ */ __name(() => {
  const props = createProps({
    badges: (0, import_getFakeBadge.getFakeBadges)(2)
  });
  return /* @__PURE__ */ React.createElement(import_ContactModal.ContactModal, {
    ...props
  });
}, "WithBadges");
WithBadges.story = {
  name: "With badges"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AsAdmin,
  AsAdminViewingNonMemberOfGroup,
  AsAdminWithNoGroupLink,
  AsNonAdmin,
  ViewingSelf,
  WithBadges,
  WithoutPhoneNumber
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ29udGFjdE1vZGFsLnN0b3JpZXMudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMC0yMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgeyBhY3Rpb24gfSBmcm9tICdAc3Rvcnlib29rL2FkZG9uLWFjdGlvbnMnO1xuaW1wb3J0IHsgYm9vbGVhbiB9IGZyb20gJ0BzdG9yeWJvb2svYWRkb24ta25vYnMnO1xuXG5pbXBvcnQgeyBnZXREZWZhdWx0Q29udmVyc2F0aW9uIH0gZnJvbSAnLi4vLi4vdGVzdC1ib3RoL2hlbHBlcnMvZ2V0RGVmYXVsdENvbnZlcnNhdGlvbic7XG5pbXBvcnQgdHlwZSB7IFByb3BzVHlwZSB9IGZyb20gJy4vQ29udGFjdE1vZGFsJztcbmltcG9ydCB7IENvbnRhY3RNb2RhbCB9IGZyb20gJy4vQ29udGFjdE1vZGFsJztcbmltcG9ydCB7IHNldHVwSTE4biB9IGZyb20gJy4uLy4uL3V0aWwvc2V0dXBJMThuJztcbmltcG9ydCBlbk1lc3NhZ2VzIGZyb20gJy4uLy4uLy4uL19sb2NhbGVzL2VuL21lc3NhZ2VzLmpzb24nO1xuaW1wb3J0IHR5cGUgeyBDb252ZXJzYXRpb25UeXBlIH0gZnJvbSAnLi4vLi4vc3RhdGUvZHVja3MvY29udmVyc2F0aW9ucyc7XG5pbXBvcnQgeyBnZXRGYWtlQmFkZ2VzIH0gZnJvbSAnLi4vLi4vdGVzdC1ib3RoL2hlbHBlcnMvZ2V0RmFrZUJhZGdlJztcbmltcG9ydCB7IFRoZW1lVHlwZSB9IGZyb20gJy4uLy4uL3R5cGVzL1V0aWwnO1xuXG5jb25zdCBpMThuID0gc2V0dXBJMThuKCdlbicsIGVuTWVzc2FnZXMpO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHRpdGxlOiAnQ29tcG9uZW50cy9Db252ZXJzYXRpb24vQ29udGFjdE1vZGFsJyxcbn07XG5cbmNvbnN0IGRlZmF1bHRDb250YWN0OiBDb252ZXJzYXRpb25UeXBlID0gZ2V0RGVmYXVsdENvbnZlcnNhdGlvbih7XG4gIGlkOiAnYWJjZGVmJyxcbiAgdGl0bGU6ICdQYXVsaW5lIE9saXZlcm9zJyxcbiAgcGhvbmVOdW1iZXI6ICcoMzMzKSA0NDQtNTUxNScsXG4gIGFib3V0OiAnXHVEODNEXHVEQzREIEZyZWUgdG8gY2hhdCcsXG59KTtcbmNvbnN0IGRlZmF1bHRHcm91cDogQ29udmVyc2F0aW9uVHlwZSA9IGdldERlZmF1bHRDb252ZXJzYXRpb24oe1xuICBpZDogJ2FiY2RlZicsXG4gIGFyZVdlQWRtaW46IHRydWUsXG4gIHRpdGxlOiBcIkl0J3MgYSBncm91cFwiLFxuICBncm91cExpbms6ICdzb21ldGhpbmcnLFxufSk7XG5cbmNvbnN0IGNyZWF0ZVByb3BzID0gKG92ZXJyaWRlUHJvcHM6IFBhcnRpYWw8UHJvcHNUeXBlPiA9IHt9KTogUHJvcHNUeXBlID0+ICh7XG4gIGFyZVdlQVN1YnNjcmliZXI6IGZhbHNlLFxuICBhcmVXZUFkbWluOiBib29sZWFuKCdhcmVXZUFkbWluJywgb3ZlcnJpZGVQcm9wcy5hcmVXZUFkbWluIHx8IGZhbHNlKSxcbiAgYmFkZ2VzOiBvdmVycmlkZVByb3BzLmJhZGdlcyB8fCBbXSxcbiAgY29udGFjdDogb3ZlcnJpZGVQcm9wcy5jb250YWN0IHx8IGRlZmF1bHRDb250YWN0LFxuICBjb252ZXJzYXRpb246IG92ZXJyaWRlUHJvcHMuY29udmVyc2F0aW9uIHx8IGRlZmF1bHRHcm91cCxcbiAgaGlkZUNvbnRhY3RNb2RhbDogYWN0aW9uKCdoaWRlQ29udGFjdE1vZGFsJyksXG4gIGkxOG4sXG4gIGlzQWRtaW46IGJvb2xlYW4oJ2lzQWRtaW4nLCBvdmVycmlkZVByb3BzLmlzQWRtaW4gfHwgZmFsc2UpLFxuICBpc01lbWJlcjogYm9vbGVhbignaXNNZW1iZXInLCBvdmVycmlkZVByb3BzLmlzTWVtYmVyIHx8IHRydWUpLFxuICByZW1vdmVNZW1iZXJGcm9tR3JvdXA6IGFjdGlvbigncmVtb3ZlTWVtYmVyRnJvbUdyb3VwJyksXG4gIHNob3dDb252ZXJzYXRpb246IGFjdGlvbignc2hvd0NvbnZlcnNhdGlvbicpLFxuICB0aGVtZTogVGhlbWVUeXBlLmxpZ2h0LFxuICB0b2dnbGVTYWZldHlOdW1iZXJNb2RhbDogYWN0aW9uKCd0b2dnbGVTYWZldHlOdW1iZXJNb2RhbCcpLFxuICB0b2dnbGVBZG1pbjogYWN0aW9uKCd0b2dnbGVBZG1pbicpLFxuICB1cGRhdGVDb252ZXJzYXRpb25Nb2RlbFNoYXJlZEdyb3VwczogYWN0aW9uKFxuICAgICd1cGRhdGVDb252ZXJzYXRpb25Nb2RlbFNoYXJlZEdyb3VwcydcbiAgKSxcbn0pO1xuXG5leHBvcnQgY29uc3QgQXNOb25BZG1pbiA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IHByb3BzID0gY3JlYXRlUHJvcHMoe1xuICAgIGFyZVdlQWRtaW46IGZhbHNlLFxuICB9KTtcblxuICByZXR1cm4gPENvbnRhY3RNb2RhbCB7Li4ucHJvcHN9IC8+O1xufTtcblxuQXNOb25BZG1pbi5zdG9yeSA9IHtcbiAgbmFtZTogJ0FzIG5vbi1hZG1pbicsXG59O1xuXG5leHBvcnQgY29uc3QgQXNBZG1pbiA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IHByb3BzID0gY3JlYXRlUHJvcHMoe1xuICAgIGFyZVdlQWRtaW46IHRydWUsXG4gIH0pO1xuICByZXR1cm4gPENvbnRhY3RNb2RhbCB7Li4ucHJvcHN9IC8+O1xufTtcblxuQXNBZG1pbi5zdG9yeSA9IHtcbiAgbmFtZTogJ0FzIGFkbWluJyxcbn07XG5cbmV4cG9ydCBjb25zdCBBc0FkbWluV2l0aE5vR3JvdXBMaW5rID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgcHJvcHMgPSBjcmVhdGVQcm9wcyh7XG4gICAgYXJlV2VBZG1pbjogdHJ1ZSxcbiAgICBjb252ZXJzYXRpb246IHtcbiAgICAgIC4uLmRlZmF1bHRHcm91cCxcbiAgICAgIGdyb3VwTGluazogdW5kZWZpbmVkLFxuICAgIH0sXG4gIH0pO1xuICByZXR1cm4gPENvbnRhY3RNb2RhbCB7Li4ucHJvcHN9IC8+O1xufTtcblxuQXNBZG1pbldpdGhOb0dyb3VwTGluay5zdG9yeSA9IHtcbiAgbmFtZTogJ0FzIGFkbWluIHdpdGggbm8gZ3JvdXAgbGluaycsXG59O1xuXG5leHBvcnQgY29uc3QgQXNBZG1pblZpZXdpbmdOb25NZW1iZXJPZkdyb3VwID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgcHJvcHMgPSBjcmVhdGVQcm9wcyh7XG4gICAgaXNNZW1iZXI6IGZhbHNlLFxuICB9KTtcblxuICByZXR1cm4gPENvbnRhY3RNb2RhbCB7Li4ucHJvcHN9IC8+O1xufTtcblxuQXNBZG1pblZpZXdpbmdOb25NZW1iZXJPZkdyb3VwLnN0b3J5ID0ge1xuICBuYW1lOiAnQXMgYWRtaW4sIHZpZXdpbmcgbm9uLW1lbWJlciBvZiBncm91cCcsXG59O1xuXG5leHBvcnQgY29uc3QgV2l0aG91dFBob25lTnVtYmVyID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgcHJvcHMgPSBjcmVhdGVQcm9wcyh7XG4gICAgY29udGFjdDoge1xuICAgICAgLi4uZGVmYXVsdENvbnRhY3QsXG4gICAgICBwaG9uZU51bWJlcjogdW5kZWZpbmVkLFxuICAgIH0sXG4gIH0pO1xuXG4gIHJldHVybiA8Q29udGFjdE1vZGFsIHsuLi5wcm9wc30gLz47XG59O1xuXG5XaXRob3V0UGhvbmVOdW1iZXIuc3RvcnkgPSB7XG4gIG5hbWU6ICdXaXRob3V0IHBob25lIG51bWJlcicsXG59O1xuXG5leHBvcnQgY29uc3QgVmlld2luZ1NlbGYgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBwcm9wcyA9IGNyZWF0ZVByb3BzKHtcbiAgICBjb250YWN0OiB7XG4gICAgICAuLi5kZWZhdWx0Q29udGFjdCxcbiAgICAgIGlzTWU6IHRydWUsXG4gICAgfSxcbiAgfSk7XG5cbiAgcmV0dXJuIDxDb250YWN0TW9kYWwgey4uLnByb3BzfSAvPjtcbn07XG5cblZpZXdpbmdTZWxmLnN0b3J5ID0ge1xuICBuYW1lOiAnVmlld2luZyBzZWxmJyxcbn07XG5cbmV4cG9ydCBjb25zdCBXaXRoQmFkZ2VzID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgcHJvcHMgPSBjcmVhdGVQcm9wcyh7XG4gICAgYmFkZ2VzOiBnZXRGYWtlQmFkZ2VzKDIpLFxuICB9KTtcblxuICByZXR1cm4gPENvbnRhY3RNb2RhbCB7Li4ucHJvcHN9IC8+O1xufTtcblxuV2l0aEJhZGdlcy5zdG9yeSA9IHtcbiAgbmFtZTogJ1dpdGggYmFkZ2VzJyxcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxZQUF1QjtBQUV2QiwyQkFBdUI7QUFDdkIseUJBQXdCO0FBRXhCLG9DQUF1QztBQUV2QywwQkFBNkI7QUFDN0IsdUJBQTBCO0FBQzFCLHNCQUF1QjtBQUV2QiwwQkFBOEI7QUFDOUIsa0JBQTBCO0FBRTFCLE1BQU0sT0FBTyxnQ0FBVSxNQUFNLHVCQUFVO0FBRXZDLElBQU8sK0JBQVE7QUFBQSxFQUNiLE9BQU87QUFDVDtBQUVBLE1BQU0saUJBQW1DLDBEQUF1QjtBQUFBLEVBQzlELElBQUk7QUFBQSxFQUNKLE9BQU87QUFBQSxFQUNQLGFBQWE7QUFBQSxFQUNiLE9BQU87QUFDVCxDQUFDO0FBQ0QsTUFBTSxlQUFpQywwREFBdUI7QUFBQSxFQUM1RCxJQUFJO0FBQUEsRUFDSixZQUFZO0FBQUEsRUFDWixPQUFPO0FBQUEsRUFDUCxXQUFXO0FBQ2IsQ0FBQztBQUVELE1BQU0sY0FBYyx3QkFBQyxnQkFBb0MsQ0FBQyxNQUFrQjtBQUFBLEVBQzFFLGtCQUFrQjtBQUFBLEVBQ2xCLFlBQVksZ0NBQVEsY0FBYyxjQUFjLGNBQWMsS0FBSztBQUFBLEVBQ25F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
