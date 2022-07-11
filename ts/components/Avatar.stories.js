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
var Avatar_stories_exports = {};
__export(Avatar_stories_exports, {
  BlurredBasedOnProps: () => BlurredBasedOnProps,
  BlurredWithClickToView: () => BlurredWithClickToView,
  BrokenAvatar: () => BrokenAvatar,
  BrokenAvatarForGroup: () => BrokenAvatarForGroup,
  BrokenColor: () => BrokenColor,
  Colors: () => Colors,
  ContactIcon: () => ContactIcon,
  Default: () => Default,
  ForceBlurred: () => ForceBlurred,
  GroupIcon: () => GroupIcon,
  Loading: () => Loading,
  NoteToSelf: () => NoteToSelf,
  OneWordName: () => OneWordName,
  SearchIcon: () => SearchIcon,
  StoryRead: () => StoryRead,
  StoryUnread: () => StoryUnread,
  ThreeWordName: () => ThreeWordName,
  TwoWordName: () => TwoWordName,
  WideImage: () => WideImage,
  WideInitials: () => WideInitials,
  WithBadge: () => WithBadge,
  default: () => Avatar_stories_default
});
module.exports = __toCommonJS(Avatar_stories_exports);
var React = __toESM(require("react"));
var import_lodash = require("lodash");
var import_addon_actions = require("@storybook/addon-actions");
var import_Avatar = require("./Avatar");
var import_setupI18n = require("../util/setupI18n");
var import_messages = __toESM(require("../../_locales/en/messages.json"));
var import_Colors = require("../types/Colors");
var import_getFakeBadge = require("../test-both/helpers/getFakeBadge");
var import_Util = require("../types/Util");
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
const colorMap = import_Colors.AvatarColors.reduce((m, color) => ({
  ...m,
  [color]: color
}), {});
const conversationTypeMap = {
  direct: "direct",
  group: "group"
};
var Avatar_stories_default = {
  title: "Components/Avatar",
  component: import_Avatar.Avatar,
  argTypes: {
    badge: {
      control: false
    },
    blur: {
      control: { type: "radio" },
      defaultValue: import_Avatar.AvatarBlur.NoBlur,
      options: {
        NoBlur: import_Avatar.AvatarBlur.NoBlur,
        BlurPicture: import_Avatar.AvatarBlur.BlurPicture,
        BlurPictureWithClickToView: import_Avatar.AvatarBlur.BlurPictureWithClickToView
      }
    },
    color: {
      defaultValue: import_Colors.AvatarColors[0],
      options: colorMap
    },
    conversationType: {
      control: { type: "radio" },
      options: conversationTypeMap
    },
    size: {
      control: false
    },
    storyRing: {
      control: { type: "radio" },
      options: [void 0, ...Object.values(import_Avatar.AvatarStoryRing)]
    },
    theme: {
      control: { type: "radio" },
      defaultValue: import_Util.ThemeType.light,
      options: import_Util.ThemeType
    }
  }
};
const createProps = /* @__PURE__ */ __name((overrideProps = {}) => ({
  acceptedMessageRequest: (0, import_lodash.isBoolean)(overrideProps.acceptedMessageRequest) ? overrideProps.acceptedMessageRequest : true,
  avatarPath: overrideProps.avatarPath || "",
  badge: overrideProps.badge,
  blur: overrideProps.blur || import_Avatar.AvatarBlur.NoBlur,
  color: overrideProps.color || import_Colors.AvatarColors[0],
  conversationType: overrideProps.conversationType || "direct",
  i18n,
  isMe: false,
  loading: Boolean(overrideProps.loading),
  name: overrideProps.name || "",
  noteToSelf: Boolean(overrideProps.noteToSelf),
  onClick: (0, import_addon_actions.action)("onClick"),
  onClickBadge: (0, import_addon_actions.action)("onClickBadge"),
  phoneNumber: overrideProps.phoneNumber || "",
  searchResult: Boolean(overrideProps.searchResult),
  sharedGroupNames: [],
  size: 80,
  title: overrideProps.title || "",
  theme: overrideProps.theme || import_Util.ThemeType.light
}), "createProps");
const sizes = Object.values(import_Avatar.AvatarSize).filter((x) => typeof x === "number");
const Template = /* @__PURE__ */ __name((args) => /* @__PURE__ */ React.createElement(React.Fragment, null, sizes.map((size) => /* @__PURE__ */ React.createElement(import_Avatar.Avatar, {
  key: size,
  ...args,
  size
}))), "Template");
const TemplateSingle = /* @__PURE__ */ __name((args) => /* @__PURE__ */ React.createElement(import_Avatar.Avatar, {
  ...args,
  size: import_Avatar.AvatarSize.ONE_HUNDRED_TWELVE
}), "TemplateSingle");
const Default = Template.bind({});
Default.args = createProps({
  avatarPath: "/fixtures/giphy-GVNvOUpeYmI7e.gif"
});
Default.story = {
  name: "Avatar"
};
const WithBadge = Template.bind({});
WithBadge.args = createProps({
  avatarPath: "/fixtures/kitten-3-64-64.jpg",
  badge: (0, import_getFakeBadge.getFakeBadge)()
});
WithBadge.story = {
  name: "With badge"
};
const WideImage = Template.bind({});
WideImage.args = createProps({
  avatarPath: "/fixtures/wide.jpg"
});
WideImage.story = {
  name: "Wide image"
};
const OneWordName = Template.bind({});
OneWordName.args = createProps({
  title: "John"
});
OneWordName.story = {
  name: "One-word Name"
};
const TwoWordName = Template.bind({});
TwoWordName.args = createProps({
  title: "John Smith"
});
TwoWordName.story = {
  name: "Two-word Name"
};
const WideInitials = Template.bind({});
WideInitials.args = createProps({
  title: "Walter White"
});
WideInitials.story = {
  name: "Wide initials"
};
const ThreeWordName = Template.bind({});
ThreeWordName.args = createProps({
  title: "Walter H. White"
});
ThreeWordName.story = {
  name: "Three-word name"
};
const NoteToSelf = Template.bind({});
NoteToSelf.args = createProps({
  noteToSelf: true
});
NoteToSelf.story = {
  name: "Note to Self"
};
const ContactIcon = Template.bind({});
ContactIcon.args = createProps();
const GroupIcon = Template.bind({});
GroupIcon.args = createProps({
  conversationType: "group"
});
const SearchIcon = Template.bind({});
SearchIcon.args = createProps({
  searchResult: true
});
const Colors = /* @__PURE__ */ __name(() => {
  const props = createProps();
  return /* @__PURE__ */ React.createElement(React.Fragment, null, import_Colors.AvatarColors.map((color) => /* @__PURE__ */ React.createElement(import_Avatar.Avatar, {
    key: color,
    ...props,
    color
  })));
}, "Colors");
const BrokenColor = Template.bind({});
BrokenColor.args = createProps({
  color: "nope"
});
const BrokenAvatar = Template.bind({});
BrokenAvatar.args = createProps({
  avatarPath: "badimage.png"
});
const BrokenAvatarForGroup = Template.bind({});
BrokenAvatarForGroup.args = createProps({
  avatarPath: "badimage.png",
  conversationType: "group"
});
BrokenAvatarForGroup.story = {
  name: "Broken Avatar for Group"
};
const Loading = Template.bind({});
Loading.args = createProps({
  loading: true
});
const BlurredBasedOnProps = TemplateSingle.bind({});
BlurredBasedOnProps.args = createProps({
  acceptedMessageRequest: false,
  avatarPath: "/fixtures/kitten-3-64-64.jpg"
});
BlurredBasedOnProps.story = {
  name: "Blurred based on props"
};
const ForceBlurred = TemplateSingle.bind({});
ForceBlurred.args = createProps({
  avatarPath: "/fixtures/kitten-3-64-64.jpg",
  blur: import_Avatar.AvatarBlur.BlurPicture
});
ForceBlurred.story = {
  name: "Force-blurred"
};
const BlurredWithClickToView = TemplateSingle.bind({});
BlurredWithClickToView.args = createProps({
  avatarPath: "/fixtures/kitten-3-64-64.jpg",
  blur: import_Avatar.AvatarBlur.BlurPictureWithClickToView
});
BlurredWithClickToView.story = {
  name: 'Blurred with "click to view"'
};
const StoryUnread = TemplateSingle.bind({});
StoryUnread.args = createProps({
  avatarPath: "/fixtures/kitten-3-64-64.jpg",
  storyRing: import_Avatar.AvatarStoryRing.Unread
});
StoryUnread.story = {
  name: "Story: unread"
};
const StoryRead = TemplateSingle.bind({});
StoryRead.args = createProps({
  avatarPath: "/fixtures/kitten-3-64-64.jpg",
  storyRing: import_Avatar.AvatarStoryRing.Read
});
StoryRead.story = {
  name: "Story: read"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BlurredBasedOnProps,
  BlurredWithClickToView,
  BrokenAvatar,
  BrokenAvatarForGroup,
  BrokenColor,
  Colors,
  ContactIcon,
  Default,
  ForceBlurred,
  GroupIcon,
  Loading,
  NoteToSelf,
  OneWordName,
  SearchIcon,
  StoryRead,
  StoryUnread,
  ThreeWordName,
  TwoWordName,
  WideImage,
  WideInitials,
  WithBadge
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQXZhdGFyLnN0b3JpZXMudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMC0yMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHR5cGUgeyBNZXRhLCBTdG9yeSB9IGZyb20gJ0BzdG9yeWJvb2svcmVhY3QnO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgaXNCb29sZWFuIH0gZnJvbSAnbG9kYXNoJztcblxuaW1wb3J0IHsgYWN0aW9uIH0gZnJvbSAnQHN0b3J5Ym9vay9hZGRvbi1hY3Rpb25zJztcblxuaW1wb3J0IHR5cGUgeyBQcm9wcyB9IGZyb20gJy4vQXZhdGFyJztcbmltcG9ydCB7IEF2YXRhciwgQXZhdGFyQmx1ciwgQXZhdGFyU2l6ZSwgQXZhdGFyU3RvcnlSaW5nIH0gZnJvbSAnLi9BdmF0YXInO1xuaW1wb3J0IHsgc2V0dXBJMThuIH0gZnJvbSAnLi4vdXRpbC9zZXR1cEkxOG4nO1xuaW1wb3J0IGVuTWVzc2FnZXMgZnJvbSAnLi4vLi4vX2xvY2FsZXMvZW4vbWVzc2FnZXMuanNvbic7XG5pbXBvcnQgdHlwZSB7IEF2YXRhckNvbG9yVHlwZSB9IGZyb20gJy4uL3R5cGVzL0NvbG9ycyc7XG5pbXBvcnQgeyBBdmF0YXJDb2xvcnMgfSBmcm9tICcuLi90eXBlcy9Db2xvcnMnO1xuaW1wb3J0IHsgZ2V0RmFrZUJhZGdlIH0gZnJvbSAnLi4vdGVzdC1ib3RoL2hlbHBlcnMvZ2V0RmFrZUJhZGdlJztcbmltcG9ydCB7IFRoZW1lVHlwZSB9IGZyb20gJy4uL3R5cGVzL1V0aWwnO1xuXG5jb25zdCBpMThuID0gc2V0dXBJMThuKCdlbicsIGVuTWVzc2FnZXMpO1xuXG5jb25zdCBjb2xvck1hcDogUmVjb3JkPHN0cmluZywgQXZhdGFyQ29sb3JUeXBlPiA9IEF2YXRhckNvbG9ycy5yZWR1Y2UoXG4gIChtLCBjb2xvcikgPT4gKHtcbiAgICAuLi5tLFxuICAgIFtjb2xvcl06IGNvbG9yLFxuICB9KSxcbiAge31cbik7XG5cbmNvbnN0IGNvbnZlcnNhdGlvblR5cGVNYXA6IFJlY29yZDxzdHJpbmcsIFByb3BzWydjb252ZXJzYXRpb25UeXBlJ10+ID0ge1xuICBkaXJlY3Q6ICdkaXJlY3QnLFxuICBncm91cDogJ2dyb3VwJyxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgdGl0bGU6ICdDb21wb25lbnRzL0F2YXRhcicsXG4gIGNvbXBvbmVudDogQXZhdGFyLFxuICBhcmdUeXBlczoge1xuICAgIGJhZGdlOiB7XG4gICAgICBjb250cm9sOiBmYWxzZSxcbiAgICB9LFxuICAgIGJsdXI6IHtcbiAgICAgIGNvbnRyb2w6IHsgdHlwZTogJ3JhZGlvJyB9LFxuICAgICAgZGVmYXVsdFZhbHVlOiBBdmF0YXJCbHVyLk5vQmx1cixcbiAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgTm9CbHVyOiBBdmF0YXJCbHVyLk5vQmx1cixcbiAgICAgICAgQmx1clBpY3R1cmU6IEF2YXRhckJsdXIuQmx1clBpY3R1cmUsXG4gICAgICAgIEJsdXJQaWN0dXJlV2l0aENsaWNrVG9WaWV3OiBBdmF0YXJCbHVyLkJsdXJQaWN0dXJlV2l0aENsaWNrVG9WaWV3LFxuICAgICAgfSxcbiAgICB9LFxuICAgIGNvbG9yOiB7XG4gICAgICBkZWZhdWx0VmFsdWU6IEF2YXRhckNvbG9yc1swXSxcbiAgICAgIG9wdGlvbnM6IGNvbG9yTWFwLFxuICAgIH0sXG4gICAgY29udmVyc2F0aW9uVHlwZToge1xuICAgICAgY29udHJvbDogeyB0eXBlOiAncmFkaW8nIH0sXG4gICAgICBvcHRpb25zOiBjb252ZXJzYXRpb25UeXBlTWFwLFxuICAgIH0sXG4gICAgc2l6ZToge1xuICAgICAgY29udHJvbDogZmFsc2UsXG4gICAgfSxcbiAgICBzdG9yeVJpbmc6IHtcbiAgICAgIGNvbnRyb2w6IHsgdHlwZTogJ3JhZGlvJyB9LFxuICAgICAgb3B0aW9uczogW3VuZGVmaW5lZCwgLi4uT2JqZWN0LnZhbHVlcyhBdmF0YXJTdG9yeVJpbmcpXSxcbiAgICB9LFxuICAgIHRoZW1lOiB7XG4gICAgICBjb250cm9sOiB7IHR5cGU6ICdyYWRpbycgfSxcbiAgICAgIGRlZmF1bHRWYWx1ZTogVGhlbWVUeXBlLmxpZ2h0LFxuICAgICAgb3B0aW9uczogVGhlbWVUeXBlLFxuICAgIH0sXG4gIH0sXG59IGFzIE1ldGE7XG5cbmNvbnN0IGNyZWF0ZVByb3BzID0gKG92ZXJyaWRlUHJvcHM6IFBhcnRpYWw8UHJvcHM+ID0ge30pOiBQcm9wcyA9PiAoe1xuICBhY2NlcHRlZE1lc3NhZ2VSZXF1ZXN0OiBpc0Jvb2xlYW4ob3ZlcnJpZGVQcm9wcy5hY2NlcHRlZE1lc3NhZ2VSZXF1ZXN0KVxuICAgID8gb3ZlcnJpZGVQcm9wcy5hY2NlcHRlZE1lc3NhZ2VSZXF1ZXN0XG4gICAgOiB0cnVlLFxuICBhdmF0YXJQYXRoOiBvdmVycmlkZVByb3BzLmF2YXRhclBhdGggfHwgJycsXG4gIGJhZGdlOiBvdmVycmlkZVByb3BzLmJhZGdlLFxuICBibHVyOiBvdmVycmlkZVByb3BzLmJsdXIgfHwgQXZhdGFyQmx1ci5Ob0JsdXIsXG4gIGNvbG9yOiBvdmVycmlkZVByb3BzLmNvbG9yIHx8IEF2YXRhckNvbG9yc1swXSxcbiAgY29udmVyc2F0aW9uVHlwZTogb3ZlcnJpZGVQcm9wcy5jb252ZXJzYXRpb25UeXBlIHx8ICdkaXJlY3QnLFxuICBpMThuLFxuICBpc01lOiBmYWxzZSxcbiAgbG9hZGluZzogQm9vbGVhbihvdmVycmlkZVByb3BzLmxvYWRpbmcpLFxuICBuYW1lOiBvdmVycmlkZVByb3BzLm5hbWUgfHwgJycsXG4gIG5vdGVUb1NlbGY6IEJvb2xlYW4ob3ZlcnJpZGVQcm9wcy5ub3RlVG9TZWxmKSxcbiAgb25DbGljazogYWN0aW9uKCdvbkNsaWNrJyksXG4gIG9uQ2xpY2tCYWRnZTogYWN0aW9uKCdvbkNsaWNrQmFkZ2UnKSxcbiAgcGhvbmVOdW1iZXI6IG92ZXJyaWRlUHJvcHMucGhvbmVOdW1iZXIgfHwgJycsXG4gIHNlYXJjaFJlc3VsdDogQm9vbGVhbihvdmVycmlkZVByb3BzLnNlYXJjaFJlc3VsdCksXG4gIHNoYXJlZEdyb3VwTmFtZXM6IFtdLFxuICBzaXplOiA4MCxcbiAgdGl0bGU6IG92ZXJyaWRlUHJvcHMudGl0bGUgfHwgJycsXG4gIHRoZW1lOiBvdmVycmlkZVByb3BzLnRoZW1lIHx8IFRoZW1lVHlwZS5saWdodCxcbn0pO1xuXG5jb25zdCBzaXplcyA9IE9iamVjdC52YWx1ZXMoQXZhdGFyU2l6ZSkuZmlsdGVyKFxuICB4ID0+IHR5cGVvZiB4ID09PSAnbnVtYmVyJ1xuKSBhcyBBcnJheTxBdmF0YXJTaXplPjtcblxuY29uc3QgVGVtcGxhdGU6IFN0b3J5PFByb3BzPiA9IGFyZ3MgPT4gKFxuICA8PlxuICAgIHtzaXplcy5tYXAoc2l6ZSA9PiAoXG4gICAgICA8QXZhdGFyIGtleT17c2l6ZX0gey4uLmFyZ3N9IHNpemU9e3NpemV9IC8+XG4gICAgKSl9XG4gIDwvPlxuKTtcblxuY29uc3QgVGVtcGxhdGVTaW5nbGU6IFN0b3J5PFByb3BzPiA9IGFyZ3MgPT4gKFxuICA8QXZhdGFyIHsuLi5hcmdzfSBzaXplPXtBdmF0YXJTaXplLk9ORV9IVU5EUkVEX1RXRUxWRX0gLz5cbik7XG5cbmV4cG9ydCBjb25zdCBEZWZhdWx0ID0gVGVtcGxhdGUuYmluZCh7fSk7XG5EZWZhdWx0LmFyZ3MgPSBjcmVhdGVQcm9wcyh7XG4gIGF2YXRhclBhdGg6ICcvZml4dHVyZXMvZ2lwaHktR1ZOdk9VcGVZbUk3ZS5naWYnLFxufSk7XG5EZWZhdWx0LnN0b3J5ID0ge1xuICBuYW1lOiAnQXZhdGFyJyxcbn07XG5cbmV4cG9ydCBjb25zdCBXaXRoQmFkZ2UgPSBUZW1wbGF0ZS5iaW5kKHt9KTtcbldpdGhCYWRnZS5hcmdzID0gY3JlYXRlUHJvcHMoe1xuICBhdmF0YXJQYXRoOiAnL2ZpeHR1cmVzL2tpdHRlbi0zLTY0LTY0LmpwZycsXG4gIGJhZGdlOiBnZXRGYWtlQmFkZ2UoKSxcbn0pO1xuV2l0aEJhZGdlLnN0b3J5ID0ge1xuICBuYW1lOiAnV2l0aCBiYWRnZScsXG59O1xuXG5leHBvcnQgY29uc3QgV2lkZUltYWdlID0gVGVtcGxhdGUuYmluZCh7fSk7XG5XaWRlSW1hZ2UuYXJncyA9IGNyZWF0ZVByb3BzKHtcbiAgYXZhdGFyUGF0aDogJy9maXh0dXJlcy93aWRlLmpwZycsXG59KTtcbldpZGVJbWFnZS5zdG9yeSA9IHtcbiAgbmFtZTogJ1dpZGUgaW1hZ2UnLFxufTtcblxuZXhwb3J0IGNvbnN0IE9uZVdvcmROYW1lID0gVGVtcGxhdGUuYmluZCh7fSk7XG5PbmVXb3JkTmFtZS5hcmdzID0gY3JlYXRlUHJvcHMoe1xuICB0aXRsZTogJ0pvaG4nLFxufSk7XG5PbmVXb3JkTmFtZS5zdG9yeSA9IHtcbiAgbmFtZTogJ09uZS13b3JkIE5hbWUnLFxufTtcblxuZXhwb3J0IGNvbnN0IFR3b1dvcmROYW1lID0gVGVtcGxhdGUuYmluZCh7fSk7XG5Ud29Xb3JkTmFtZS5hcmdzID0gY3JlYXRlUHJvcHMoe1xuICB0aXRsZTogJ0pvaG4gU21pdGgnLFxufSk7XG5Ud29Xb3JkTmFtZS5zdG9yeSA9IHtcbiAgbmFtZTogJ1R3by13b3JkIE5hbWUnLFxufTtcblxuZXhwb3J0IGNvbnN0IFdpZGVJbml0aWFscyA9IFRlbXBsYXRlLmJpbmQoe30pO1xuV2lkZUluaXRpYWxzLmFyZ3MgPSBjcmVhdGVQcm9wcyh7XG4gIHRpdGxlOiAnV2FsdGVyIFdoaXRlJyxcbn0pO1xuV2lkZUluaXRpYWxzLnN0b3J5ID0ge1xuICBuYW1lOiAnV2lkZSBpbml0aWFscycsXG59O1xuXG5leHBvcnQgY29uc3QgVGhyZWVXb3JkTmFtZSA9IFRlbXBsYXRlLmJpbmQoe30pO1xuVGhyZWVXb3JkTmFtZS5hcmdzID0gY3JlYXRlUHJvcHMoe1xuICB0aXRsZTogJ1dhbHRlciBILiBXaGl0ZScsXG59KTtcblRocmVlV29yZE5hbWUuc3RvcnkgPSB7XG4gIG5hbWU6ICdUaHJlZS13b3JkIG5hbWUnLFxufTtcblxuZXhwb3J0IGNvbnN0IE5vdGVUb1NlbGYgPSBUZW1wbGF0ZS5iaW5kKHt9KTtcbk5vdGVUb1NlbGYuYXJncyA9IGNyZWF0ZVByb3BzKHtcbiAgbm90ZVRvU2VsZjogdHJ1ZSxcbn0pO1xuTm90ZVRvU2VsZi5zdG9yeSA9IHtcbiAgbmFtZTogJ05vdGUgdG8gU2VsZicsXG59O1xuXG5leHBvcnQgY29uc3QgQ29udGFjdEljb24gPSBUZW1wbGF0ZS5iaW5kKHt9KTtcbkNvbnRhY3RJY29uLmFyZ3MgPSBjcmVhdGVQcm9wcygpO1xuXG5leHBvcnQgY29uc3QgR3JvdXBJY29uID0gVGVtcGxhdGUuYmluZCh7fSk7XG5Hcm91cEljb24uYXJncyA9IGNyZWF0ZVByb3BzKHtcbiAgY29udmVyc2F0aW9uVHlwZTogJ2dyb3VwJyxcbn0pO1xuXG5leHBvcnQgY29uc3QgU2VhcmNoSWNvbiA9IFRlbXBsYXRlLmJpbmQoe30pO1xuU2VhcmNoSWNvbi5hcmdzID0gY3JlYXRlUHJvcHMoe1xuICBzZWFyY2hSZXN1bHQ6IHRydWUsXG59KTtcblxuZXhwb3J0IGNvbnN0IENvbG9ycyA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IHByb3BzID0gY3JlYXRlUHJvcHMoKTtcblxuICByZXR1cm4gKFxuICAgIDw+XG4gICAgICB7QXZhdGFyQ29sb3JzLm1hcChjb2xvciA9PiAoXG4gICAgICAgIDxBdmF0YXIga2V5PXtjb2xvcn0gey4uLnByb3BzfSBjb2xvcj17Y29sb3J9IC8+XG4gICAgICApKX1cbiAgICA8Lz5cbiAgKTtcbn07XG5cbmV4cG9ydCBjb25zdCBCcm9rZW5Db2xvciA9IFRlbXBsYXRlLmJpbmQoe30pO1xuQnJva2VuQ29sb3IuYXJncyA9IGNyZWF0ZVByb3BzKHtcbiAgY29sb3I6ICdub3BlJyBhcyBBdmF0YXJDb2xvclR5cGUsXG59KTtcblxuZXhwb3J0IGNvbnN0IEJyb2tlbkF2YXRhciA9IFRlbXBsYXRlLmJpbmQoe30pO1xuQnJva2VuQXZhdGFyLmFyZ3MgPSBjcmVhdGVQcm9wcyh7XG4gIGF2YXRhclBhdGg6ICdiYWRpbWFnZS5wbmcnLFxufSk7XG5cbmV4cG9ydCBjb25zdCBCcm9rZW5BdmF0YXJGb3JHcm91cCA9IFRlbXBsYXRlLmJpbmQoe30pO1xuQnJva2VuQXZhdGFyRm9yR3JvdXAuYXJncyA9IGNyZWF0ZVByb3BzKHtcbiAgYXZhdGFyUGF0aDogJ2JhZGltYWdlLnBuZycsXG4gIGNvbnZlcnNhdGlvblR5cGU6ICdncm91cCcsXG59KTtcbkJyb2tlbkF2YXRhckZvckdyb3VwLnN0b3J5ID0ge1xuICBuYW1lOiAnQnJva2VuIEF2YXRhciBmb3IgR3JvdXAnLFxufTtcblxuZXhwb3J0IGNvbnN0IExvYWRpbmcgPSBUZW1wbGF0ZS5iaW5kKHt9KTtcbkxvYWRpbmcuYXJncyA9IGNyZWF0ZVByb3BzKHtcbiAgbG9hZGluZzogdHJ1ZSxcbn0pO1xuXG5leHBvcnQgY29uc3QgQmx1cnJlZEJhc2VkT25Qcm9wcyA9IFRlbXBsYXRlU2luZ2xlLmJpbmQoe30pO1xuQmx1cnJlZEJhc2VkT25Qcm9wcy5hcmdzID0gY3JlYXRlUHJvcHMoe1xuICBhY2NlcHRlZE1lc3NhZ2VSZXF1ZXN0OiBmYWxzZSxcbiAgYXZhdGFyUGF0aDogJy9maXh0dXJlcy9raXR0ZW4tMy02NC02NC5qcGcnLFxufSk7XG5CbHVycmVkQmFzZWRPblByb3BzLnN0b3J5ID0ge1xuICBuYW1lOiAnQmx1cnJlZCBiYXNlZCBvbiBwcm9wcycsXG59O1xuXG5leHBvcnQgY29uc3QgRm9yY2VCbHVycmVkID0gVGVtcGxhdGVTaW5nbGUuYmluZCh7fSk7XG5Gb3JjZUJsdXJyZWQuYXJncyA9IGNyZWF0ZVByb3BzKHtcbiAgYXZhdGFyUGF0aDogJy9maXh0dXJlcy9raXR0ZW4tMy02NC02NC5qcGcnLFxuICBibHVyOiBBdmF0YXJCbHVyLkJsdXJQaWN0dXJlLFxufSk7XG5Gb3JjZUJsdXJyZWQuc3RvcnkgPSB7XG4gIG5hbWU6ICdGb3JjZS1ibHVycmVkJyxcbn07XG5cbmV4cG9ydCBjb25zdCBCbHVycmVkV2l0aENsaWNrVG9WaWV3ID0gVGVtcGxhdGVTaW5nbGUuYmluZCh7fSk7XG5CbHVycmVkV2l0aENsaWNrVG9WaWV3LmFyZ3MgPSBjcmVhdGVQcm9wcyh7XG4gIGF2YXRhclBhdGg6ICcvZml4dHVyZXMva2l0dGVuLTMtNjQtNjQuanBnJyxcbiAgYmx1cjogQXZhdGFyQmx1ci5CbHVyUGljdHVyZVdpdGhDbGlja1RvVmlldyxcbn0pO1xuQmx1cnJlZFdpdGhDbGlja1RvVmlldy5zdG9yeSA9IHtcbiAgbmFtZTogJ0JsdXJyZWQgd2l0aCBcImNsaWNrIHRvIHZpZXdcIicsXG59O1xuXG5leHBvcnQgY29uc3QgU3RvcnlVbnJlYWQgPSBUZW1wbGF0ZVNpbmdsZS5iaW5kKHt9KTtcblN0b3J5VW5yZWFkLmFyZ3MgPSBjcmVhdGVQcm9wcyh7XG4gIGF2YXRhclBhdGg6ICcvZml4dHVyZXMva2l0dGVuLTMtNjQtNjQuanBnJyxcbiAgc3RvcnlSaW5nOiBBdmF0YXJTdG9yeVJpbmcuVW5yZWFkLFxufSk7XG5TdG9yeVVucmVhZC5zdG9yeSA9IHtcbiAgbmFtZTogJ1N0b3J5OiB1bnJlYWQnLFxufTtcblxuZXhwb3J0IGNvbnN0IFN0b3J5UmVhZCA9IFRlbXBsYXRlU2luZ2xlLmJpbmQoe30pO1xuU3RvcnlSZWFkLmFyZ3MgPSBjcmVhdGVQcm9wcyh7XG4gIGF2YXRhclBhdGg6ICcvZml4dHVyZXMva2l0dGVuLTMtNjQtNjQuanBnJyxcbiAgc3RvcnlSaW5nOiBBdmF0YXJTdG9yeVJpbmcuUmVhZCxcbn0pO1xuU3RvcnlSZWFkLnN0b3J5ID0ge1xuICBuYW1lOiAnU3Rvcnk6IHJlYWQnLFxufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFJQSxZQUF1QjtBQUN2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
