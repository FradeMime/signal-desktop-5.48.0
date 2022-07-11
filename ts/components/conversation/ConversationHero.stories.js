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
var ConversationHero_stories_exports = {};
__export(ConversationHero_stories_exports, {
  DirectFiveOtherGroups: () => DirectFiveOtherGroups,
  DirectFourOtherGroups: () => DirectFourOtherGroups,
  DirectNoGroupsJustPhoneNumber: () => DirectNoGroupsJustPhoneNumber,
  DirectNoGroupsJustProfile: () => DirectNoGroupsJustProfile,
  DirectNoGroupsName: () => DirectNoGroupsName,
  DirectNoGroupsNoData: () => DirectNoGroupsNoData,
  DirectNoGroupsNoDataNotAccepted: () => DirectNoGroupsNoDataNotAccepted,
  DirectOneOtherGroup: () => DirectOneOtherGroup,
  DirectThreeOtherGroups: () => DirectThreeOtherGroups,
  DirectTwoOtherGroups: () => DirectTwoOtherGroups,
  GroupLongGroupDescription: () => GroupLongGroupDescription,
  GroupManyMembers: () => GroupManyMembers,
  GroupNoName: () => GroupNoName,
  GroupOneMember: () => GroupOneMember,
  GroupZeroMembers: () => GroupZeroMembers,
  NoteToSelf: () => NoteToSelf,
  default: () => ConversationHero_stories_default
});
module.exports = __toCommonJS(ConversationHero_stories_exports);
var React = __toESM(require("react"));
var import_addon_knobs = require("@storybook/addon-knobs");
var import_addon_actions = require("@storybook/addon-actions");
var import_ConversationHero = require("./ConversationHero");
var import_setupI18n = require("../../util/setupI18n");
var import_messages = __toESM(require("../../../_locales/en/messages.json"));
var import_StorybookThemeContext = require("../../../.storybook/StorybookThemeContext");
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
const getAbout = /* @__PURE__ */ __name(() => (0, import_addon_knobs.text)("about", "\u{1F44D} Free to chat"), "getAbout");
const getTitle = /* @__PURE__ */ __name(() => (0, import_addon_knobs.text)("name", "Cayce Bollard"), "getTitle");
const getName = /* @__PURE__ */ __name(() => (0, import_addon_knobs.text)("name", "Cayce Bollard"), "getName");
const getProfileName = /* @__PURE__ */ __name(() => (0, import_addon_knobs.text)("profileName", "Cayce Bollard (profile)"), "getProfileName");
const getAvatarPath = /* @__PURE__ */ __name(() => (0, import_addon_knobs.text)("avatarPath", "/fixtures/kitten-4-112-112.jpg"), "getAvatarPath");
const getPhoneNumber = /* @__PURE__ */ __name(() => (0, import_addon_knobs.text)("phoneNumber", "+1 (646) 327-2700"), "getPhoneNumber");
const updateSharedGroups = (0, import_addon_actions.action)("updateSharedGroups");
const Wrapper = /* @__PURE__ */ __name((props) => {
  const theme = React.useContext(import_StorybookThemeContext.StorybookThemeContext);
  return /* @__PURE__ */ React.createElement(import_ConversationHero.ConversationHero, {
    ...props,
    theme
  });
}, "Wrapper");
var ConversationHero_stories_default = {
  title: "Components/Conversation/ConversationHero"
};
const DirectFiveOtherGroups = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ React.createElement("div", {
    style: { width: "480px" }
  }, /* @__PURE__ */ React.createElement(Wrapper, {
    about: getAbout(),
    acceptedMessageRequest: true,
    badge: void 0,
    i18n,
    isMe: false,
    title: getTitle(),
    avatarPath: getAvatarPath(),
    name: getName(),
    profileName: getProfileName(),
    phoneNumber: getPhoneNumber(),
    conversationType: "direct",
    updateSharedGroups,
    sharedGroupNames: [
      "NYC Rock Climbers",
      "Dinner Party",
      "Friends \u{1F33F}",
      "Fourth",
      "Fifth"
    ],
    unblurAvatar: (0, import_addon_actions.action)("unblurAvatar")
  }));
}, "DirectFiveOtherGroups");
DirectFiveOtherGroups.story = {
  name: "Direct (Five Other Groups)"
};
const DirectFourOtherGroups = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ React.createElement("div", {
    style: { width: "480px" }
  }, /* @__PURE__ */ React.createElement(Wrapper, {
    about: getAbout(),
    acceptedMessageRequest: true,
    badge: void 0,
    i18n,
    isMe: false,
    title: getTitle(),
    avatarPath: getAvatarPath(),
    name: getName(),
    profileName: getProfileName(),
    phoneNumber: getPhoneNumber(),
    conversationType: "direct",
    updateSharedGroups,
    sharedGroupNames: [
      "NYC Rock Climbers",
      "Dinner Party",
      "Friends \u{1F33F}",
      "Fourth"
    ],
    unblurAvatar: (0, import_addon_actions.action)("unblurAvatar")
  }));
}, "DirectFourOtherGroups");
DirectFourOtherGroups.story = {
  name: "Direct (Four Other Groups)"
};
const DirectThreeOtherGroups = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ React.createElement("div", {
    style: { width: "480px" }
  }, /* @__PURE__ */ React.createElement(Wrapper, {
    about: getAbout(),
    acceptedMessageRequest: true,
    badge: void 0,
    i18n,
    isMe: false,
    title: getTitle(),
    avatarPath: getAvatarPath(),
    name: getName(),
    profileName: getProfileName(),
    phoneNumber: getPhoneNumber(),
    conversationType: "direct",
    updateSharedGroups,
    sharedGroupNames: ["NYC Rock Climbers", "Dinner Party", "Friends \u{1F33F}"],
    unblurAvatar: (0, import_addon_actions.action)("unblurAvatar")
  }));
}, "DirectThreeOtherGroups");
DirectThreeOtherGroups.story = {
  name: "Direct (Three Other Groups)"
};
const DirectTwoOtherGroups = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ React.createElement("div", {
    style: { width: "480px" }
  }, /* @__PURE__ */ React.createElement(Wrapper, {
    about: getAbout(),
    acceptedMessageRequest: true,
    badge: void 0,
    i18n,
    isMe: false,
    title: getTitle(),
    avatarPath: getAvatarPath(),
    name: getName(),
    profileName: getProfileName(),
    phoneNumber: getPhoneNumber(),
    conversationType: "direct",
    updateSharedGroups,
    sharedGroupNames: ["NYC Rock Climbers", "Dinner Party"],
    unblurAvatar: (0, import_addon_actions.action)("unblurAvatar")
  }));
}, "DirectTwoOtherGroups");
DirectTwoOtherGroups.story = {
  name: "Direct (Two Other Groups)"
};
const DirectOneOtherGroup = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ React.createElement("div", {
    style: { width: "480px" }
  }, /* @__PURE__ */ React.createElement(Wrapper, {
    about: getAbout(),
    acceptedMessageRequest: true,
    badge: void 0,
    i18n,
    isMe: false,
    title: getTitle(),
    avatarPath: getAvatarPath(),
    name: getName(),
    profileName: getProfileName(),
    phoneNumber: getPhoneNumber(),
    conversationType: "direct",
    updateSharedGroups,
    sharedGroupNames: ["NYC Rock Climbers"],
    unblurAvatar: (0, import_addon_actions.action)("unblurAvatar")
  }));
}, "DirectOneOtherGroup");
DirectOneOtherGroup.story = {
  name: "Direct (One Other Group)"
};
const DirectNoGroupsName = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ React.createElement("div", {
    style: { width: "480px" }
  }, /* @__PURE__ */ React.createElement(Wrapper, {
    about: getAbout(),
    acceptedMessageRequest: true,
    badge: void 0,
    i18n,
    isMe: false,
    title: getTitle(),
    avatarPath: getAvatarPath(),
    name: getName(),
    profileName: (0, import_addon_knobs.text)("profileName", ""),
    phoneNumber: getPhoneNumber(),
    conversationType: "direct",
    updateSharedGroups,
    sharedGroupNames: [],
    unblurAvatar: (0, import_addon_actions.action)("unblurAvatar")
  }));
}, "DirectNoGroupsName");
DirectNoGroupsName.story = {
  name: "Direct (No Groups, Name)"
};
const DirectNoGroupsJustProfile = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ React.createElement("div", {
    style: { width: "480px" }
  }, /* @__PURE__ */ React.createElement(Wrapper, {
    about: getAbout(),
    acceptedMessageRequest: true,
    badge: void 0,
    i18n,
    isMe: false,
    title: (0, import_addon_knobs.text)("title", "Cayce Bollard (profile)"),
    avatarPath: getAvatarPath(),
    name: (0, import_addon_knobs.text)("name", ""),
    profileName: getProfileName(),
    phoneNumber: getPhoneNumber(),
    conversationType: "direct",
    updateSharedGroups,
    sharedGroupNames: [],
    unblurAvatar: (0, import_addon_actions.action)("unblurAvatar")
  }));
}, "DirectNoGroupsJustProfile");
DirectNoGroupsJustProfile.story = {
  name: "Direct (No Groups, Just Profile)"
};
const DirectNoGroupsJustPhoneNumber = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ React.createElement("div", {
    style: { width: "480px" }
  }, /* @__PURE__ */ React.createElement(Wrapper, {
    about: getAbout(),
    acceptedMessageRequest: true,
    badge: void 0,
    i18n,
    isMe: false,
    title: (0, import_addon_knobs.text)("title", "+1 (646) 327-2700"),
    avatarPath: getAvatarPath(),
    name: (0, import_addon_knobs.text)("name", ""),
    profileName: (0, import_addon_knobs.text)("profileName", ""),
    phoneNumber: getPhoneNumber(),
    conversationType: "direct",
    updateSharedGroups,
    sharedGroupNames: [],
    unblurAvatar: (0, import_addon_actions.action)("unblurAvatar")
  }));
}, "DirectNoGroupsJustPhoneNumber");
DirectNoGroupsJustPhoneNumber.story = {
  name: "Direct (No Groups, Just Phone Number)"
};
const DirectNoGroupsNoData = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ React.createElement("div", {
    style: { width: "480px" }
  }, /* @__PURE__ */ React.createElement(Wrapper, {
    i18n,
    isMe: false,
    title: (0, import_addon_knobs.text)("title", "Unknown contact"),
    acceptedMessageRequest: true,
    badge: void 0,
    avatarPath: getAvatarPath(),
    name: (0, import_addon_knobs.text)("name", ""),
    profileName: (0, import_addon_knobs.text)("profileName", ""),
    phoneNumber: (0, import_addon_knobs.text)("phoneNumber", ""),
    conversationType: "direct",
    sharedGroupNames: [],
    unblurAvatar: (0, import_addon_actions.action)("unblurAvatar"),
    updateSharedGroups
  }));
}, "DirectNoGroupsNoData");
DirectNoGroupsNoData.story = {
  name: "Direct (No Groups, No Data)"
};
const DirectNoGroupsNoDataNotAccepted = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ React.createElement("div", {
    style: { width: "480px" }
  }, /* @__PURE__ */ React.createElement(Wrapper, {
    i18n,
    isMe: false,
    title: (0, import_addon_knobs.text)("title", "Unknown contact"),
    acceptedMessageRequest: false,
    badge: void 0,
    avatarPath: getAvatarPath(),
    name: (0, import_addon_knobs.text)("name", ""),
    profileName: (0, import_addon_knobs.text)("profileName", ""),
    phoneNumber: (0, import_addon_knobs.text)("phoneNumber", ""),
    conversationType: "direct",
    sharedGroupNames: [],
    unblurAvatar: (0, import_addon_actions.action)("unblurAvatar"),
    updateSharedGroups
  }));
}, "DirectNoGroupsNoDataNotAccepted");
DirectNoGroupsNoDataNotAccepted.story = {
  name: "Direct (No Groups, No Data, Not Accepted)"
};
const GroupManyMembers = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ React.createElement("div", {
    style: { width: "480px" }
  }, /* @__PURE__ */ React.createElement(Wrapper, {
    acceptedMessageRequest: true,
    badge: void 0,
    i18n,
    isMe: false,
    title: (0, import_addon_knobs.text)("title", "NYC Rock Climbers"),
    name: (0, import_addon_knobs.text)("groupName", "NYC Rock Climbers"),
    conversationType: "group",
    membersCount: (0, import_addon_knobs.number)("membersCount", 22),
    sharedGroupNames: [],
    unblurAvatar: (0, import_addon_actions.action)("unblurAvatar"),
    updateSharedGroups
  }));
}, "GroupManyMembers");
GroupManyMembers.story = {
  name: "Group (many members)"
};
const GroupOneMember = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ React.createElement("div", {
    style: { width: "480px" }
  }, /* @__PURE__ */ React.createElement(Wrapper, {
    acceptedMessageRequest: true,
    badge: void 0,
    i18n,
    isMe: false,
    title: (0, import_addon_knobs.text)("title", "NYC Rock Climbers"),
    name: (0, import_addon_knobs.text)("groupName", "NYC Rock Climbers"),
    conversationType: "group",
    membersCount: 1,
    sharedGroupNames: [],
    unblurAvatar: (0, import_addon_actions.action)("unblurAvatar"),
    updateSharedGroups
  }));
}, "GroupOneMember");
GroupOneMember.story = {
  name: "Group (one member)"
};
const GroupZeroMembers = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ React.createElement("div", {
    style: { width: "480px" }
  }, /* @__PURE__ */ React.createElement(Wrapper, {
    acceptedMessageRequest: true,
    badge: void 0,
    i18n,
    isMe: false,
    title: (0, import_addon_knobs.text)("title", "NYC Rock Climbers"),
    name: (0, import_addon_knobs.text)("groupName", "NYC Rock Climbers"),
    conversationType: "group",
    groupDescription: "This is a group for all the rock climbers of NYC",
    membersCount: 0,
    sharedGroupNames: [],
    unblurAvatar: (0, import_addon_actions.action)("unblurAvatar"),
    updateSharedGroups
  }));
}, "GroupZeroMembers");
GroupZeroMembers.story = {
  name: "Group (zero members)"
};
const GroupLongGroupDescription = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ React.createElement("div", {
    style: { width: "480px" }
  }, /* @__PURE__ */ React.createElement(Wrapper, {
    acceptedMessageRequest: true,
    badge: void 0,
    i18n,
    isMe: false,
    title: (0, import_addon_knobs.text)("title", "NYC Rock Climbers"),
    name: (0, import_addon_knobs.text)("groupName", "NYC Rock Climbers"),
    conversationType: "group",
    groupDescription: "This is a group for all the rock climbers of NYC. We really like to climb rocks and these NYC people climb any rock. No rock is too small or too big to be climbed. We will ascend upon all rocks, and not just in NYC, in the whole world. We are just getting started, NYC is just the beginning, watch out rocks in the galaxy. Kuiper belt I'm looking at you. We will put on a space suit and climb all your rocks. No rock is near nor far for the rock climbers of NYC.",
    membersCount: 0,
    sharedGroupNames: [],
    unblurAvatar: (0, import_addon_actions.action)("unblurAvatar"),
    updateSharedGroups
  }));
}, "GroupLongGroupDescription");
GroupLongGroupDescription.story = {
  name: "Group (long group description)"
};
const GroupNoName = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ React.createElement("div", {
    style: { width: "480px" }
  }, /* @__PURE__ */ React.createElement(Wrapper, {
    acceptedMessageRequest: true,
    badge: void 0,
    i18n,
    isMe: false,
    title: (0, import_addon_knobs.text)("title", "Unknown group"),
    name: (0, import_addon_knobs.text)("groupName", ""),
    conversationType: "group",
    membersCount: 0,
    sharedGroupNames: [],
    unblurAvatar: (0, import_addon_actions.action)("unblurAvatar"),
    updateSharedGroups
  }));
}, "GroupNoName");
GroupNoName.story = {
  name: "Group (No name)"
};
const NoteToSelf = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ React.createElement("div", {
    style: { width: "480px" }
  }, /* @__PURE__ */ React.createElement(Wrapper, {
    acceptedMessageRequest: true,
    badge: void 0,
    i18n,
    isMe: true,
    title: getTitle(),
    conversationType: "direct",
    phoneNumber: getPhoneNumber(),
    sharedGroupNames: [],
    unblurAvatar: (0, import_addon_actions.action)("unblurAvatar"),
    updateSharedGroups
  }));
}, "NoteToSelf");
NoteToSelf.story = {
  name: "Note to Self"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DirectFiveOtherGroups,
  DirectFourOtherGroups,
  DirectNoGroupsJustPhoneNumber,
  DirectNoGroupsJustProfile,
  DirectNoGroupsName,
  DirectNoGroupsNoData,
  DirectNoGroupsNoDataNotAccepted,
  DirectOneOtherGroup,
  DirectThreeOtherGroups,
  DirectTwoOtherGroups,
  GroupLongGroupDescription,
  GroupManyMembers,
  GroupNoName,
  GroupOneMember,
  GroupZeroMembers,
  NoteToSelf
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ29udmVyc2F0aW9uSGVyby5zdG9yaWVzLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjAtMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IG51bWJlciBhcyBudW1iZXJLbm9iLCB0ZXh0IH0gZnJvbSAnQHN0b3J5Ym9vay9hZGRvbi1rbm9icyc7XG5pbXBvcnQgeyBhY3Rpb24gfSBmcm9tICdAc3Rvcnlib29rL2FkZG9uLWFjdGlvbnMnO1xuXG5pbXBvcnQgeyBDb252ZXJzYXRpb25IZXJvIH0gZnJvbSAnLi9Db252ZXJzYXRpb25IZXJvJztcbmltcG9ydCB7IHNldHVwSTE4biB9IGZyb20gJy4uLy4uL3V0aWwvc2V0dXBJMThuJztcbmltcG9ydCBlbk1lc3NhZ2VzIGZyb20gJy4uLy4uLy4uL19sb2NhbGVzL2VuL21lc3NhZ2VzLmpzb24nO1xuaW1wb3J0IHsgU3Rvcnlib29rVGhlbWVDb250ZXh0IH0gZnJvbSAnLi4vLi4vLi4vLnN0b3J5Ym9vay9TdG9yeWJvb2tUaGVtZUNvbnRleHQnO1xuXG5jb25zdCBpMThuID0gc2V0dXBJMThuKCdlbicsIGVuTWVzc2FnZXMpO1xuXG5jb25zdCBnZXRBYm91dCA9ICgpID0+IHRleHQoJ2Fib3V0JywgJ1x1RDgzRFx1REM0RCBGcmVlIHRvIGNoYXQnKTtcbmNvbnN0IGdldFRpdGxlID0gKCkgPT4gdGV4dCgnbmFtZScsICdDYXljZSBCb2xsYXJkJyk7XG5jb25zdCBnZXROYW1lID0gKCkgPT4gdGV4dCgnbmFtZScsICdDYXljZSBCb2xsYXJkJyk7XG5jb25zdCBnZXRQcm9maWxlTmFtZSA9ICgpID0+IHRleHQoJ3Byb2ZpbGVOYW1lJywgJ0NheWNlIEJvbGxhcmQgKHByb2ZpbGUpJyk7XG5jb25zdCBnZXRBdmF0YXJQYXRoID0gKCkgPT5cbiAgdGV4dCgnYXZhdGFyUGF0aCcsICcvZml4dHVyZXMva2l0dGVuLTQtMTEyLTExMi5qcGcnKTtcbmNvbnN0IGdldFBob25lTnVtYmVyID0gKCkgPT4gdGV4dCgncGhvbmVOdW1iZXInLCAnKzEgKDY0NikgMzI3LTI3MDAnKTtcblxuY29uc3QgdXBkYXRlU2hhcmVkR3JvdXBzID0gYWN0aW9uKCd1cGRhdGVTaGFyZWRHcm91cHMnKTtcblxuY29uc3QgV3JhcHBlciA9IChcbiAgcHJvcHM6IE9taXQ8UmVhY3QuQ29tcG9uZW50UHJvcHM8dHlwZW9mIENvbnZlcnNhdGlvbkhlcm8+LCAndGhlbWUnPlxuKSA9PiB7XG4gIGNvbnN0IHRoZW1lID0gUmVhY3QudXNlQ29udGV4dChTdG9yeWJvb2tUaGVtZUNvbnRleHQpO1xuICByZXR1cm4gPENvbnZlcnNhdGlvbkhlcm8gey4uLnByb3BzfSB0aGVtZT17dGhlbWV9IC8+O1xufTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICB0aXRsZTogJ0NvbXBvbmVudHMvQ29udmVyc2F0aW9uL0NvbnZlcnNhdGlvbkhlcm8nLFxufTtcblxuZXhwb3J0IGNvbnN0IERpcmVjdEZpdmVPdGhlckdyb3VwcyA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIHJldHVybiAoXG4gICAgPGRpdiBzdHlsZT17eyB3aWR0aDogJzQ4MHB4JyB9fT5cbiAgICAgIDxXcmFwcGVyXG4gICAgICAgIGFib3V0PXtnZXRBYm91dCgpfVxuICAgICAgICBhY2NlcHRlZE1lc3NhZ2VSZXF1ZXN0XG4gICAgICAgIGJhZGdlPXt1bmRlZmluZWR9XG4gICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgIGlzTWU9e2ZhbHNlfVxuICAgICAgICB0aXRsZT17Z2V0VGl0bGUoKX1cbiAgICAgICAgYXZhdGFyUGF0aD17Z2V0QXZhdGFyUGF0aCgpfVxuICAgICAgICBuYW1lPXtnZXROYW1lKCl9XG4gICAgICAgIHByb2ZpbGVOYW1lPXtnZXRQcm9maWxlTmFtZSgpfVxuICAgICAgICBwaG9uZU51bWJlcj17Z2V0UGhvbmVOdW1iZXIoKX1cbiAgICAgICAgY29udmVyc2F0aW9uVHlwZT1cImRpcmVjdFwiXG4gICAgICAgIHVwZGF0ZVNoYXJlZEdyb3Vwcz17dXBkYXRlU2hhcmVkR3JvdXBzfVxuICAgICAgICBzaGFyZWRHcm91cE5hbWVzPXtbXG4gICAgICAgICAgJ05ZQyBSb2NrIENsaW1iZXJzJyxcbiAgICAgICAgICAnRGlubmVyIFBhcnR5JyxcbiAgICAgICAgICAnRnJpZW5kcyBcdUQ4M0NcdURGM0YnLFxuICAgICAgICAgICdGb3VydGgnLFxuICAgICAgICAgICdGaWZ0aCcsXG4gICAgICAgIF19XG4gICAgICAgIHVuYmx1ckF2YXRhcj17YWN0aW9uKCd1bmJsdXJBdmF0YXInKX1cbiAgICAgIC8+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5EaXJlY3RGaXZlT3RoZXJHcm91cHMuc3RvcnkgPSB7XG4gIG5hbWU6ICdEaXJlY3QgKEZpdmUgT3RoZXIgR3JvdXBzKScsXG59O1xuXG5leHBvcnQgY29uc3QgRGlyZWN0Rm91ck90aGVyR3JvdXBzID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgcmV0dXJuIChcbiAgICA8ZGl2IHN0eWxlPXt7IHdpZHRoOiAnNDgwcHgnIH19PlxuICAgICAgPFdyYXBwZXJcbiAgICAgICAgYWJvdXQ9e2dldEFib3V0KCl9XG4gICAgICAgIGFjY2VwdGVkTWVzc2FnZVJlcXVlc3RcbiAgICAgICAgYmFkZ2U9e3VuZGVmaW5lZH1cbiAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgaXNNZT17ZmFsc2V9XG4gICAgICAgIHRpdGxlPXtnZXRUaXRsZSgpfVxuICAgICAgICBhdmF0YXJQYXRoPXtnZXRBdmF0YXJQYXRoKCl9XG4gICAgICAgIG5hbWU9e2dldE5hbWUoKX1cbiAgICAgICAgcHJvZmlsZU5hbWU9e2dldFByb2ZpbGVOYW1lKCl9XG4gICAgICAgIHBob25lTnVtYmVyPXtnZXRQaG9uZU51bWJlcigpfVxuICAgICAgICBjb252ZXJzYXRpb25UeXBlPVwiZGlyZWN0XCJcbiAgICAgICAgdXBkYXRlU2hhcmVkR3JvdXBzPXt1cGRhdGVTaGFyZWRHcm91cHN9XG4gICAgICAgIHNoYXJlZEdyb3VwTmFtZXM9e1tcbiAgICAgICAgICAnTllDIFJvY2sgQ2xpbWJlcnMnLFxuICAgICAgICAgICdEaW5uZXIgUGFydHknLFxuICAgICAgICAgICdGcmllbmRzIFx1RDgzQ1x1REYzRicsXG4gICAgICAgICAgJ0ZvdXJ0aCcsXG4gICAgICAgIF19XG4gICAgICAgIHVuYmx1ckF2YXRhcj17YWN0aW9uKCd1bmJsdXJBdmF0YXInKX1cbiAgICAgIC8+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5EaXJlY3RGb3VyT3RoZXJHcm91cHMuc3RvcnkgPSB7XG4gIG5hbWU6ICdEaXJlY3QgKEZvdXIgT3RoZXIgR3JvdXBzKScsXG59O1xuXG5leHBvcnQgY29uc3QgRGlyZWN0VGhyZWVPdGhlckdyb3VwcyA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIHJldHVybiAoXG4gICAgPGRpdiBzdHlsZT17eyB3aWR0aDogJzQ4MHB4JyB9fT5cbiAgICAgIDxXcmFwcGVyXG4gICAgICAgIGFib3V0PXtnZXRBYm91dCgpfVxuICAgICAgICBhY2NlcHRlZE1lc3NhZ2VSZXF1ZXN0XG4gICAgICAgIGJhZGdlPXt1bmRlZmluZWR9XG4gICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgIGlzTWU9e2ZhbHNlfVxuICAgICAgICB0aXRsZT17Z2V0VGl0bGUoKX1cbiAgICAgICAgYXZhdGFyUGF0aD17Z2V0QXZhdGFyUGF0aCgpfVxuICAgICAgICBuYW1lPXtnZXROYW1lKCl9XG4gICAgICAgIHByb2ZpbGVOYW1lPXtnZXRQcm9maWxlTmFtZSgpfVxuICAgICAgICBwaG9uZU51bWJlcj17Z2V0UGhvbmVOdW1iZXIoKX1cbiAgICAgICAgY29udmVyc2F0aW9uVHlwZT1cImRpcmVjdFwiXG4gICAgICAgIHVwZGF0ZVNoYXJlZEdyb3Vwcz17dXBkYXRlU2hhcmVkR3JvdXBzfVxuICAgICAgICBzaGFyZWRHcm91cE5hbWVzPXtbJ05ZQyBSb2NrIENsaW1iZXJzJywgJ0Rpbm5lciBQYXJ0eScsICdGcmllbmRzIFx1RDgzQ1x1REYzRiddfVxuICAgICAgICB1bmJsdXJBdmF0YXI9e2FjdGlvbigndW5ibHVyQXZhdGFyJyl9XG4gICAgICAvPlxuICAgIDwvZGl2PlxuICApO1xufTtcblxuRGlyZWN0VGhyZWVPdGhlckdyb3Vwcy5zdG9yeSA9IHtcbiAgbmFtZTogJ0RpcmVjdCAoVGhyZWUgT3RoZXIgR3JvdXBzKScsXG59O1xuXG5leHBvcnQgY29uc3QgRGlyZWN0VHdvT3RoZXJHcm91cHMgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICByZXR1cm4gKFxuICAgIDxkaXYgc3R5bGU9e3sgd2lkdGg6ICc0ODBweCcgfX0+XG4gICAgICA8V3JhcHBlclxuICAgICAgICBhYm91dD17Z2V0QWJvdXQoKX1cbiAgICAgICAgYWNjZXB0ZWRNZXNzYWdlUmVxdWVzdFxuICAgICAgICBiYWRnZT17dW5kZWZpbmVkfVxuICAgICAgICBpMThuPXtpMThufVxuICAgICAgICBpc01lPXtmYWxzZX1cbiAgICAgICAgdGl0bGU9e2dldFRpdGxlKCl9XG4gICAgICAgIGF2YXRhclBhdGg9e2dldEF2YXRhclBhdGgoKX1cbiAgICAgICAgbmFtZT17Z2V0TmFtZSgpfVxuICAgICAgICBwcm9maWxlTmFtZT17Z2V0UHJvZmlsZU5hbWUoKX1cbiAgICAgICAgcGhvbmVOdW1iZXI9e2dldFBob25lTnVtYmVyKCl9XG4gICAgICAgIGNvbnZlcnNhdGlvblR5cGU9XCJkaXJlY3RcIlxuICAgICAgICB1cGRhdGVTaGFyZWRHcm91cHM9e3VwZGF0ZVNoYXJlZEdyb3Vwc31cbiAgICAgICAgc2hhcmVkR3JvdXBOYW1lcz17WydOWUMgUm9jayBDbGltYmVycycsICdEaW5uZXIgUGFydHknXX1cbiAgICAgICAgdW5ibHVyQXZhdGFyPXthY3Rpb24oJ3VuYmx1ckF2YXRhcicpfVxuICAgICAgLz5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbkRpcmVjdFR3b090aGVyR3JvdXBzLnN0b3J5ID0ge1xuICBuYW1lOiAnRGlyZWN0IChUd28gT3RoZXIgR3JvdXBzKScsXG59O1xuXG5leHBvcnQgY29uc3QgRGlyZWN0T25lT3RoZXJHcm91cCA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIHJldHVybiAoXG4gICAgPGRpdiBzdHlsZT17eyB3aWR0aDogJzQ4MHB4JyB9fT5cbiAgICAgIDxXcmFwcGVyXG4gICAgICAgIGFib3V0PXtnZXRBYm91dCgpfVxuICAgICAgICBhY2NlcHRlZE1lc3NhZ2VSZXF1ZXN0XG4gICAgICAgIGJhZGdlPXt1bmRlZmluZWR9XG4gICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgIGlzTWU9e2ZhbHNlfVxuICAgICAgICB0aXRsZT17Z2V0VGl0bGUoKX1cbiAgICAgICAgYXZhdGFyUGF0aD17Z2V0QXZhdGFyUGF0aCgpfVxuICAgICAgICBuYW1lPXtnZXROYW1lKCl9XG4gICAgICAgIHByb2ZpbGVOYW1lPXtnZXRQcm9maWxlTmFtZSgpfVxuICAgICAgICBwaG9uZU51bWJlcj17Z2V0UGhvbmVOdW1iZXIoKX1cbiAgICAgICAgY29udmVyc2F0aW9uVHlwZT1cImRpcmVjdFwiXG4gICAgICAgIHVwZGF0ZVNoYXJlZEdyb3Vwcz17dXBkYXRlU2hhcmVkR3JvdXBzfVxuICAgICAgICBzaGFyZWRHcm91cE5hbWVzPXtbJ05ZQyBSb2NrIENsaW1iZXJzJ119XG4gICAgICAgIHVuYmx1ckF2YXRhcj17YWN0aW9uKCd1bmJsdXJBdmF0YXInKX1cbiAgICAgIC8+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5EaXJlY3RPbmVPdGhlckdyb3VwLnN0b3J5ID0ge1xuICBuYW1lOiAnRGlyZWN0IChPbmUgT3RoZXIgR3JvdXApJyxcbn07XG5cbmV4cG9ydCBjb25zdCBEaXJlY3ROb0dyb3Vwc05hbWUgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICByZXR1cm4gKFxuICAgIDxkaXYgc3R5bGU9e3sgd2lkdGg6ICc0ODBweCcgfX0+XG4gICAgICA8V3JhcHBlclxuICAgICAgICBhYm91dD17Z2V0QWJvdXQoKX1cbiAgICAgICAgYWNjZXB0ZWRNZXNzYWdlUmVxdWVzdFxuICAgICAgICBiYWRnZT17dW5kZWZpbmVkfVxuICAgICAgICBpMThuPXtpMThufVxuICAgICAgICBpc01lPXtmYWxzZX1cbiAgICAgICAgdGl0bGU9e2dldFRpdGxlKCl9XG4gICAgICAgIGF2YXRhclBhdGg9e2dldEF2YXRhclBhdGgoKX1cbiAgICAgICAgbmFtZT17Z2V0TmFtZSgpfVxuICAgICAgICBwcm9maWxlTmFtZT17dGV4dCgncHJvZmlsZU5hbWUnLCAnJyl9XG4gICAgICAgIHBob25lTnVtYmVyPXtnZXRQaG9uZU51bWJlcigpfVxuICAgICAgICBjb252ZXJzYXRpb25UeXBlPVwiZGlyZWN0XCJcbiAgICAgICAgdXBkYXRlU2hhcmVkR3JvdXBzPXt1cGRhdGVTaGFyZWRHcm91cHN9XG4gICAgICAgIHNoYXJlZEdyb3VwTmFtZXM9e1tdfVxuICAgICAgICB1bmJsdXJBdmF0YXI9e2FjdGlvbigndW5ibHVyQXZhdGFyJyl9XG4gICAgICAvPlxuICAgIDwvZGl2PlxuICApO1xufTtcblxuRGlyZWN0Tm9Hcm91cHNOYW1lLnN0b3J5ID0ge1xuICBuYW1lOiAnRGlyZWN0IChObyBHcm91cHMsIE5hbWUpJyxcbn07XG5cbmV4cG9ydCBjb25zdCBEaXJlY3ROb0dyb3Vwc0p1c3RQcm9maWxlID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgcmV0dXJuIChcbiAgICA8ZGl2IHN0eWxlPXt7IHdpZHRoOiAnNDgwcHgnIH19PlxuICAgICAgPFdyYXBwZXJcbiAgICAgICAgYWJvdXQ9e2dldEFib3V0KCl9XG4gICAgICAgIGFjY2VwdGVkTWVzc2FnZVJlcXVlc3RcbiAgICAgICAgYmFkZ2U9e3VuZGVmaW5lZH1cbiAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgaXNNZT17ZmFsc2V9XG4gICAgICAgIHRpdGxlPXt0ZXh0KCd0aXRsZScsICdDYXljZSBCb2xsYXJkIChwcm9maWxlKScpfVxuICAgICAgICBhdmF0YXJQYXRoPXtnZXRBdmF0YXJQYXRoKCl9XG4gICAgICAgIG5hbWU9e3RleHQoJ25hbWUnLCAnJyl9XG4gICAgICAgIHByb2ZpbGVOYW1lPXtnZXRQcm9maWxlTmFtZSgpfVxuICAgICAgICBwaG9uZU51bWJlcj17Z2V0UGhvbmVOdW1iZXIoKX1cbiAgICAgICAgY29udmVyc2F0aW9uVHlwZT1cImRpcmVjdFwiXG4gICAgICAgIHVwZGF0ZVNoYXJlZEdyb3Vwcz17dXBkYXRlU2hhcmVkR3JvdXBzfVxuICAgICAgICBzaGFyZWRHcm91cE5hbWVzPXtbXX1cbiAgICAgICAgdW5ibHVyQXZhdGFyPXthY3Rpb24oJ3VuYmx1ckF2YXRhcicpfVxuICAgICAgLz5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbkRpcmVjdE5vR3JvdXBzSnVzdFByb2ZpbGUuc3RvcnkgPSB7XG4gIG5hbWU6ICdEaXJlY3QgKE5vIEdyb3VwcywgSnVzdCBQcm9maWxlKScsXG59O1xuXG5leHBvcnQgY29uc3QgRGlyZWN0Tm9Hcm91cHNKdXN0UGhvbmVOdW1iZXIgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICByZXR1cm4gKFxuICAgIDxkaXYgc3R5bGU9e3sgd2lkdGg6ICc0ODBweCcgfX0+XG4gICAgICA8V3JhcHBlclxuICAgICAgICBhYm91dD17Z2V0QWJvdXQoKX1cbiAgICAgICAgYWNjZXB0ZWRNZXNzYWdlUmVxdWVzdFxuICAgICAgICBiYWRnZT17dW5kZWZpbmVkfVxuICAgICAgICBpMThuPXtpMThufVxuICAgICAgICBpc01lPXtmYWxzZX1cbiAgICAgICAgdGl0bGU9e3RleHQoJ3RpdGxlJywgJysxICg2NDYpIDMyNy0yNzAwJyl9XG4gICAgICAgIGF2YXRhclBhdGg9e2dldEF2YXRhclBhdGgoKX1cbiAgICAgICAgbmFtZT17dGV4dCgnbmFtZScsICcnKX1cbiAgICAgICAgcHJvZmlsZU5hbWU9e3RleHQoJ3Byb2ZpbGVOYW1lJywgJycpfVxuICAgICAgICBwaG9uZU51bWJlcj17Z2V0UGhvbmVOdW1iZXIoKX1cbiAgICAgICAgY29udmVyc2F0aW9uVHlwZT1cImRpcmVjdFwiXG4gICAgICAgIHVwZGF0ZVNoYXJlZEdyb3Vwcz17dXBkYXRlU2hhcmVkR3JvdXBzfVxuICAgICAgICBzaGFyZWRHcm91cE5hbWVzPXtbXX1cbiAgICAgICAgdW5ibHVyQXZhdGFyPXthY3Rpb24oJ3VuYmx1ckF2YXRhcicpfVxuICAgICAgLz5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbkRpcmVjdE5vR3JvdXBzSnVzdFBob25lTnVtYmVyLnN0b3J5ID0ge1xuICBuYW1lOiAnRGlyZWN0IChObyBHcm91cHMsIEp1c3QgUGhvbmUgTnVtYmVyKScsXG59O1xuXG5leHBvcnQgY29uc3QgRGlyZWN0Tm9Hcm91cHNOb0RhdGEgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICByZXR1cm4gKFxuICAgIDxkaXYgc3R5bGU9e3sgd2lkdGg6ICc0ODBweCcgfX0+XG4gICAgICA8V3JhcHBlclxuICAgICAgICBpMThuPXtpMThufVxuICAgICAgICBpc01lPXtmYWxzZX1cbiAgICAgICAgdGl0bGU9e3RleHQoJ3RpdGxlJywgJ1Vua25vd24gY29udGFjdCcpfVxuICAgICAgICBhY2NlcHRlZE1lc3NhZ2VSZXF1ZXN0XG4gICAgICAgIGJhZGdlPXt1bmRlZmluZWR9XG4gICAgICAgIGF2YXRhclBhdGg9e2dldEF2YXRhclBhdGgoKX1cbiAgICAgICAgbmFtZT17dGV4dCgnbmFtZScsICcnKX1cbiAgICAgICAgcHJvZmlsZU5hbWU9e3RleHQoJ3Byb2ZpbGVOYW1lJywgJycpfVxuICAgICAgICBwaG9uZU51bWJlcj17dGV4dCgncGhvbmVOdW1iZXInLCAnJyl9XG4gICAgICAgIGNvbnZlcnNhdGlvblR5cGU9XCJkaXJlY3RcIlxuICAgICAgICBzaGFyZWRHcm91cE5hbWVzPXtbXX1cbiAgICAgICAgdW5ibHVyQXZhdGFyPXthY3Rpb24oJ3VuYmx1ckF2YXRhcicpfVxuICAgICAgICB1cGRhdGVTaGFyZWRHcm91cHM9e3VwZGF0ZVNoYXJlZEdyb3Vwc31cbiAgICAgIC8+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5EaXJlY3ROb0dyb3Vwc05vRGF0YS5zdG9yeSA9IHtcbiAgbmFtZTogJ0RpcmVjdCAoTm8gR3JvdXBzLCBObyBEYXRhKScsXG59O1xuXG5leHBvcnQgY29uc3QgRGlyZWN0Tm9Hcm91cHNOb0RhdGFOb3RBY2NlcHRlZCA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIHJldHVybiAoXG4gICAgPGRpdiBzdHlsZT17eyB3aWR0aDogJzQ4MHB4JyB9fT5cbiAgICAgIDxXcmFwcGVyXG4gICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgIGlzTWU9e2ZhbHNlfVxuICAgICAgICB0aXRsZT17dGV4dCgndGl0bGUnLCAnVW5rbm93biBjb250YWN0Jyl9XG4gICAgICAgIGFjY2VwdGVkTWVzc2FnZVJlcXVlc3Q9e2ZhbHNlfVxuICAgICAgICBiYWRnZT17dW5kZWZpbmVkfVxuICAgICAgICBhdmF0YXJQYXRoPXtnZXRBdmF0YXJQYXRoKCl9XG4gICAgICAgIG5hbWU9e3RleHQoJ25hbWUnLCAnJyl9XG4gICAgICAgIHByb2ZpbGVOYW1lPXt0ZXh0KCdwcm9maWxlTmFtZScsICcnKX1cbiAgICAgICAgcGhvbmVOdW1iZXI9e3RleHQoJ3Bob25lTnVtYmVyJywgJycpfVxuICAgICAgICBjb252ZXJzYXRpb25UeXBlPVwiZGlyZWN0XCJcbiAgICAgICAgc2hhcmVkR3JvdXBOYW1lcz17W119XG4gICAgICAgIHVuYmx1ckF2YXRhcj17YWN0aW9uKCd1bmJsdXJBdmF0YXInKX1cbiAgICAgICAgdXBkYXRlU2hhcmVkR3JvdXBzPXt1cGRhdGVTaGFyZWRHcm91cHN9XG4gICAgICAvPlxuICAgIDwvZGl2PlxuICApO1xufTtcblxuRGlyZWN0Tm9Hcm91cHNOb0RhdGFOb3RBY2NlcHRlZC5zdG9yeSA9IHtcbiAgbmFtZTogJ0RpcmVjdCAoTm8gR3JvdXBzLCBObyBEYXRhLCBOb3QgQWNjZXB0ZWQpJyxcbn07XG5cbmV4cG9ydCBjb25zdCBHcm91cE1hbnlNZW1iZXJzID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgcmV0dXJuIChcbiAgICA8ZGl2IHN0eWxlPXt7IHdpZHRoOiAnNDgwcHgnIH19PlxuICAgICAgPFdyYXBwZXJcbiAgICAgICAgYWNjZXB0ZWRNZXNzYWdlUmVxdWVzdFxuICAgICAgICBiYWRnZT17dW5kZWZpbmVkfVxuICAgICAgICBpMThuPXtpMThufVxuICAgICAgICBpc01lPXtmYWxzZX1cbiAgICAgICAgdGl0bGU9e3RleHQoJ3RpdGxlJywgJ05ZQyBSb2NrIENsaW1iZXJzJyl9XG4gICAgICAgIG5hbWU9e3RleHQoJ2dyb3VwTmFtZScsICdOWUMgUm9jayBDbGltYmVycycpfVxuICAgICAgICBjb252ZXJzYXRpb25UeXBlPVwiZ3JvdXBcIlxuICAgICAgICBtZW1iZXJzQ291bnQ9e251bWJlcktub2IoJ21lbWJlcnNDb3VudCcsIDIyKX1cbiAgICAgICAgc2hhcmVkR3JvdXBOYW1lcz17W119XG4gICAgICAgIHVuYmx1ckF2YXRhcj17YWN0aW9uKCd1bmJsdXJBdmF0YXInKX1cbiAgICAgICAgdXBkYXRlU2hhcmVkR3JvdXBzPXt1cGRhdGVTaGFyZWRHcm91cHN9XG4gICAgICAvPlxuICAgIDwvZGl2PlxuICApO1xufTtcblxuR3JvdXBNYW55TWVtYmVycy5zdG9yeSA9IHtcbiAgbmFtZTogJ0dyb3VwIChtYW55IG1lbWJlcnMpJyxcbn07XG5cbmV4cG9ydCBjb25zdCBHcm91cE9uZU1lbWJlciA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIHJldHVybiAoXG4gICAgPGRpdiBzdHlsZT17eyB3aWR0aDogJzQ4MHB4JyB9fT5cbiAgICAgIDxXcmFwcGVyXG4gICAgICAgIGFjY2VwdGVkTWVzc2FnZVJlcXVlc3RcbiAgICAgICAgYmFkZ2U9e3VuZGVmaW5lZH1cbiAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgaXNNZT17ZmFsc2V9XG4gICAgICAgIHRpdGxlPXt0ZXh0KCd0aXRsZScsICdOWUMgUm9jayBDbGltYmVycycpfVxuICAgICAgICBuYW1lPXt0ZXh0KCdncm91cE5hbWUnLCAnTllDIFJvY2sgQ2xpbWJlcnMnKX1cbiAgICAgICAgY29udmVyc2F0aW9uVHlwZT1cImdyb3VwXCJcbiAgICAgICAgbWVtYmVyc0NvdW50PXsxfVxuICAgICAgICBzaGFyZWRHcm91cE5hbWVzPXtbXX1cbiAgICAgICAgdW5ibHVyQXZhdGFyPXthY3Rpb24oJ3VuYmx1ckF2YXRhcicpfVxuICAgICAgICB1cGRhdGVTaGFyZWRHcm91cHM9e3VwZGF0ZVNoYXJlZEdyb3Vwc31cbiAgICAgIC8+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5Hcm91cE9uZU1lbWJlci5zdG9yeSA9IHtcbiAgbmFtZTogJ0dyb3VwIChvbmUgbWVtYmVyKScsXG59O1xuXG5leHBvcnQgY29uc3QgR3JvdXBaZXJvTWVtYmVycyA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIHJldHVybiAoXG4gICAgPGRpdiBzdHlsZT17eyB3aWR0aDogJzQ4MHB4JyB9fT5cbiAgICAgIDxXcmFwcGVyXG4gICAgICAgIGFjY2VwdGVkTWVzc2FnZVJlcXVlc3RcbiAgICAgICAgYmFkZ2U9e3VuZGVmaW5lZH1cbiAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgaXNNZT17ZmFsc2V9XG4gICAgICAgIHRpdGxlPXt0ZXh0KCd0aXRsZScsICdOWUMgUm9jayBDbGltYmVycycpfVxuICAgICAgICBuYW1lPXt0ZXh0KCdncm91cE5hbWUnLCAnTllDIFJvY2sgQ2xpbWJlcnMnKX1cbiAgICAgICAgY29udmVyc2F0aW9uVHlwZT1cImdyb3VwXCJcbiAgICAgICAgZ3JvdXBEZXNjcmlwdGlvbj1cIlRoaXMgaXMgYSBncm91cCBmb3IgYWxsIHRoZSByb2NrIGNsaW1iZXJzIG9mIE5ZQ1wiXG4gICAgICAgIG1lbWJlcnNDb3VudD17MH1cbiAgICAgICAgc2hhcmVkR3JvdXBOYW1lcz17W119XG4gICAgICAgIHVuYmx1ckF2YXRhcj17YWN0aW9uKCd1bmJsdXJBdmF0YXInKX1cbiAgICAgICAgdXBkYXRlU2hhcmVkR3JvdXBzPXt1cGRhdGVTaGFyZWRHcm91cHN9XG4gICAgICAvPlxuICAgIDwvZGl2PlxuICApO1xufTtcblxuR3JvdXBaZXJvTWVtYmVycy5zdG9yeSA9IHtcbiAgbmFtZTogJ0dyb3VwICh6ZXJvIG1lbWJlcnMpJyxcbn07XG5cbmV4cG9ydCBjb25zdCBHcm91cExvbmdHcm91cERlc2NyaXB0aW9uID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgcmV0dXJuIChcbiAgICA8ZGl2IHN0eWxlPXt7IHdpZHRoOiAnNDgwcHgnIH19PlxuICAgICAgPFdyYXBwZXJcbiAgICAgICAgYWNjZXB0ZWRNZXNzYWdlUmVxdWVzdFxuICAgICAgICBiYWRnZT17dW5kZWZpbmVkfVxuICAgICAgICBpMThuPXtpMThufVxuICAgICAgICBpc01lPXtmYWxzZX1cbiAgICAgICAgdGl0bGU9e3RleHQoJ3RpdGxlJywgJ05ZQyBSb2NrIENsaW1iZXJzJyl9XG4gICAgICAgIG5hbWU9e3RleHQoJ2dyb3VwTmFtZScsICdOWUMgUm9jayBDbGltYmVycycpfVxuICAgICAgICBjb252ZXJzYXRpb25UeXBlPVwiZ3JvdXBcIlxuICAgICAgICBncm91cERlc2NyaXB0aW9uPVwiVGhpcyBpcyBhIGdyb3VwIGZvciBhbGwgdGhlIHJvY2sgY2xpbWJlcnMgb2YgTllDLiBXZSByZWFsbHkgbGlrZSB0byBjbGltYiByb2NrcyBhbmQgdGhlc2UgTllDIHBlb3BsZSBjbGltYiBhbnkgcm9jay4gTm8gcm9jayBpcyB0b28gc21hbGwgb3IgdG9vIGJpZyB0byBiZSBjbGltYmVkLiBXZSB3aWxsIGFzY2VuZCB1cG9uIGFsbCByb2NrcywgYW5kIG5vdCBqdXN0IGluIE5ZQywgaW4gdGhlIHdob2xlIHdvcmxkLiBXZSBhcmUganVzdCBnZXR0aW5nIHN0YXJ0ZWQsIE5ZQyBpcyBqdXN0IHRoZSBiZWdpbm5pbmcsIHdhdGNoIG91dCByb2NrcyBpbiB0aGUgZ2FsYXh5LiBLdWlwZXIgYmVsdCBJJ20gbG9va2luZyBhdCB5b3UuIFdlIHdpbGwgcHV0IG9uIGEgc3BhY2Ugc3VpdCBhbmQgY2xpbWIgYWxsIHlvdXIgcm9ja3MuIE5vIHJvY2sgaXMgbmVhciBub3IgZmFyIGZvciB0aGUgcm9jayBjbGltYmVycyBvZiBOWUMuXCJcbiAgICAgICAgbWVtYmVyc0NvdW50PXswfVxuICAgICAgICBzaGFyZWRHcm91cE5hbWVzPXtbXX1cbiAgICAgICAgdW5ibHVyQXZhdGFyPXthY3Rpb24oJ3VuYmx1ckF2YXRhcicpfVxuICAgICAgICB1cGRhdGVTaGFyZWRHcm91cHM9e3VwZGF0ZVNoYXJlZEdyb3Vwc31cbiAgICAgIC8+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5Hcm91cExvbmdHcm91cERlc2NyaXB0aW9uLnN0b3J5ID0ge1xuICBuYW1lOiAnR3JvdXAgKGxvbmcgZ3JvdXAgZGVzY3JpcHRpb24pJyxcbn07XG5cbmV4cG9ydCBjb25zdCBHcm91cE5vTmFtZSA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIHJldHVybiAoXG4gICAgPGRpdiBzdHlsZT17eyB3aWR0aDogJzQ4MHB4JyB9fT5cbiAgICAgIDxXcmFwcGVyXG4gICAgICAgIGFjY2VwdGVkTWVzc2FnZVJlcXVlc3RcbiAgICAgICAgYmFkZ2U9e3VuZGVmaW5lZH1cbiAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgaXNNZT17ZmFsc2V9XG4gICAgICAgIHRpdGxlPXt0ZXh0KCd0aXRsZScsICdVbmtub3duIGdyb3VwJyl9XG4gICAgICAgIG5hbWU9e3RleHQoJ2dyb3VwTmFtZScsICcnKX1cbiAgICAgICAgY29udmVyc2F0aW9uVHlwZT1cImdyb3VwXCJcbiAgICAgICAgbWVtYmVyc0NvdW50PXswfVxuICAgICAgICBzaGFyZWRHcm91cE5hbWVzPXtbXX1cbiAgICAgICAgdW5ibHVyQXZhdGFyPXthY3Rpb24oJ3VuYmx1ckF2YXRhcicpfVxuICAgICAgICB1cGRhdGVTaGFyZWRHcm91cHM9e3VwZGF0ZVNoYXJlZEdyb3Vwc31cbiAgICAgIC8+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5Hcm91cE5vTmFtZS5zdG9yeSA9IHtcbiAgbmFtZTogJ0dyb3VwIChObyBuYW1lKScsXG59O1xuXG5leHBvcnQgY29uc3QgTm90ZVRvU2VsZiA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIHJldHVybiAoXG4gICAgPGRpdiBzdHlsZT17eyB3aWR0aDogJzQ4MHB4JyB9fT5cbiAgICAgIDxXcmFwcGVyXG4gICAgICAgIGFjY2VwdGVkTWVzc2FnZVJlcXVlc3RcbiAgICAgICAgYmFkZ2U9e3VuZGVmaW5lZH1cbiAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgaXNNZVxuICAgICAgICB0aXRsZT17Z2V0VGl0bGUoKX1cbiAgICAgICAgY29udmVyc2F0aW9uVHlwZT1cImRpcmVjdFwiXG4gICAgICAgIHBob25lTnVtYmVyPXtnZXRQaG9uZU51bWJlcigpfVxuICAgICAgICBzaGFyZWRHcm91cE5hbWVzPXtbXX1cbiAgICAgICAgdW5ibHVyQXZhdGFyPXthY3Rpb24oJ3VuYmx1ckF2YXRhcicpfVxuICAgICAgICB1cGRhdGVTaGFyZWRHcm91cHM9e3VwZGF0ZVNoYXJlZEdyb3Vwc31cbiAgICAgIC8+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5Ob3RlVG9TZWxmLnN0b3J5ID0ge1xuICBuYW1lOiAnTm90ZSB0byBTZWxmJyxcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxZQUF1QjtBQUN2Qix5QkFBMkM7QUFDM0MsMkJBQXVCO0FBRXZCLDhCQUFpQztBQUNqQyx1QkFBMEI7QUFDMUIsc0JBQXVCO0FBQ3ZCLG1DQUFzQztBQUV0QyxNQUFNLE9BQU8sZ0NBQVUsTUFBTSx1QkFBVTtBQUV2QyxNQUFNLFdBQVcsNkJBQU0sNkJB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
