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
var CallingLobby_stories_exports = {};
__export(CallingLobby_stories_exports, {
  Default: () => Default,
  GroupCall0PeekedParticipants: () => GroupCall0PeekedParticipants,
  GroupCall0PeekedParticipantsBigGroup: () => GroupCall0PeekedParticipantsBigGroup,
  GroupCall1PeekedParticipant: () => GroupCall1PeekedParticipant,
  GroupCall1PeekedParticipantSelf: () => GroupCall1PeekedParticipantSelf,
  GroupCall4PeekedParticipants: () => GroupCall4PeekedParticipants,
  GroupCall4PeekedParticipantsParticipantsList: () => GroupCall4PeekedParticipantsParticipantsList,
  GroupCallCallFull: () => GroupCallCallFull,
  InitiallyMuted: () => InitiallyMuted,
  LocalVideo: () => LocalVideo,
  NoCameraLocalAvatar: () => NoCameraLocalAvatar,
  NoCameraNoAvatar: () => NoCameraNoAvatar,
  default: () => CallingLobby_stories_default
});
module.exports = __toCommonJS(CallingLobby_stories_exports);
var React = __toESM(require("react"));
var import_lodash = require("lodash");
var import_addon_knobs = require("@storybook/addon-knobs");
var import_addon_actions = require("@storybook/addon-actions");
var import_Colors = require("../types/Colors");
var import_CallingLobby = require("./CallingLobby");
var import_setupI18n = require("../util/setupI18n");
var import_UUID = require("../types/UUID");
var import_messages = __toESM(require("../../_locales/en/messages.json"));
var import_getDefaultConversation = require("../test-both/helpers/getDefaultConversation");
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
const camera = {
  deviceId: "dfbe6effe70b0611ba0fdc2a9ea3f39f6cb110e6687948f7e5f016c111b7329c",
  groupId: "63ee218d2446869e40adfc958ff98263e51f74382b0143328ee4826f20a76f47",
  kind: "videoinput",
  label: "FaceTime HD Camera (Built-in) (9fba:bced)",
  toJSON() {
    return "";
  }
};
const createProps = /* @__PURE__ */ __name((overrideProps = {}) => {
  const isGroupCall = (0, import_addon_knobs.boolean)("isGroupCall", overrideProps.isGroupCall || false);
  const conversation = isGroupCall ? (0, import_getDefaultConversation.getDefaultConversation)({
    title: "Tahoe Trip",
    type: "group"
  }) : (0, import_getDefaultConversation.getDefaultConversation)();
  return {
    availableCameras: overrideProps.availableCameras || [camera],
    conversation,
    groupMembers: overrideProps.groupMembers || (isGroupCall ? (0, import_lodash.times)(3, () => (0, import_getDefaultConversation.getDefaultConversation)()) : void 0),
    hasLocalAudio: (0, import_addon_knobs.boolean)("hasLocalAudio", overrideProps.hasLocalAudio ?? true),
    hasLocalVideo: (0, import_addon_knobs.boolean)("hasLocalVideo", overrideProps.hasLocalVideo ?? false),
    i18n,
    isGroupCall,
    isGroupCallOutboundRingEnabled: true,
    isCallFull: (0, import_addon_knobs.boolean)("isCallFull", overrideProps.isCallFull || false),
    me: overrideProps.me || (0, import_getDefaultConversation.getDefaultConversation)({
      color: import_Colors.AvatarColors[0],
      id: import_UUID.UUID.generate().toString(),
      uuid: import_UUID.UUID.generate().toString()
    }),
    onCallCanceled: (0, import_addon_actions.action)("on-call-canceled"),
    onJoinCall: (0, import_addon_actions.action)("on-join-call"),
    outgoingRing: (0, import_addon_knobs.boolean)("outgoingRing", Boolean(overrideProps.outgoingRing)),
    peekedParticipants: overrideProps.peekedParticipants || [],
    setLocalAudio: (0, import_addon_actions.action)("set-local-audio"),
    setLocalPreview: (0, import_addon_actions.action)("set-local-preview"),
    setLocalVideo: (0, import_addon_actions.action)("set-local-video"),
    setOutgoingRing: (0, import_addon_actions.action)("set-outgoing-ring"),
    showParticipantsList: (0, import_addon_knobs.boolean)("showParticipantsList", Boolean(overrideProps.showParticipantsList)),
    toggleParticipants: (0, import_addon_actions.action)("toggle-participants"),
    toggleSettings: (0, import_addon_actions.action)("toggle-settings")
  };
}, "createProps");
const fakePeekedParticipant = /* @__PURE__ */ __name((conversationProps) => (0, import_getDefaultConversation.getDefaultConversationWithUuid)({
  ...conversationProps
}), "fakePeekedParticipant");
var CallingLobby_stories_default = {
  title: "Components/CallingLobby"
};
const Default = /* @__PURE__ */ __name(() => {
  const props = createProps();
  return /* @__PURE__ */ React.createElement(import_CallingLobby.CallingLobby, {
    ...props
  });
}, "Default");
const NoCameraNoAvatar = /* @__PURE__ */ __name(() => {
  const props = createProps({
    availableCameras: []
  });
  return /* @__PURE__ */ React.createElement(import_CallingLobby.CallingLobby, {
    ...props
  });
}, "NoCameraNoAvatar");
NoCameraNoAvatar.story = {
  name: "No Camera, no avatar"
};
const NoCameraLocalAvatar = /* @__PURE__ */ __name(() => {
  const props = createProps({
    availableCameras: [],
    me: (0, import_getDefaultConversation.getDefaultConversation)({
      avatarPath: "/fixtures/kitten-4-112-112.jpg",
      color: import_Colors.AvatarColors[0],
      id: import_UUID.UUID.generate().toString(),
      uuid: import_UUID.UUID.generate().toString()
    })
  });
  return /* @__PURE__ */ React.createElement(import_CallingLobby.CallingLobby, {
    ...props
  });
}, "NoCameraLocalAvatar");
NoCameraLocalAvatar.story = {
  name: "No Camera, local avatar"
};
const LocalVideo = /* @__PURE__ */ __name(() => {
  const props = createProps({
    hasLocalVideo: true
  });
  return /* @__PURE__ */ React.createElement(import_CallingLobby.CallingLobby, {
    ...props
  });
}, "LocalVideo");
const InitiallyMuted = /* @__PURE__ */ __name(() => {
  const props = createProps({
    hasLocalAudio: false
  });
  return /* @__PURE__ */ React.createElement(import_CallingLobby.CallingLobby, {
    ...props
  });
}, "InitiallyMuted");
InitiallyMuted.story = {
  name: "Initially muted"
};
const GroupCall0PeekedParticipants = /* @__PURE__ */ __name(() => {
  const props = createProps({ isGroupCall: true, peekedParticipants: [] });
  return /* @__PURE__ */ React.createElement(import_CallingLobby.CallingLobby, {
    ...props
  });
}, "GroupCall0PeekedParticipants");
GroupCall0PeekedParticipants.story = {
  name: "Group Call - 0 peeked participants"
};
const GroupCall1PeekedParticipant = /* @__PURE__ */ __name(() => {
  const props = createProps({
    isGroupCall: true,
    peekedParticipants: [{ title: "Sam" }].map(fakePeekedParticipant)
  });
  return /* @__PURE__ */ React.createElement(import_CallingLobby.CallingLobby, {
    ...props
  });
}, "GroupCall1PeekedParticipant");
GroupCall1PeekedParticipant.story = {
  name: "Group Call - 1 peeked participant"
};
const GroupCall1PeekedParticipantSelf = /* @__PURE__ */ __name(() => {
  const uuid = import_UUID.UUID.generate().toString();
  const props = createProps({
    isGroupCall: true,
    me: (0, import_getDefaultConversation.getDefaultConversation)({
      id: import_UUID.UUID.generate().toString(),
      uuid
    }),
    peekedParticipants: [fakePeekedParticipant({ title: "Ash", uuid })]
  });
  return /* @__PURE__ */ React.createElement(import_CallingLobby.CallingLobby, {
    ...props
  });
}, "GroupCall1PeekedParticipantSelf");
GroupCall1PeekedParticipantSelf.story = {
  name: "Group Call - 1 peeked participant (self)"
};
const GroupCall4PeekedParticipants = /* @__PURE__ */ __name(() => {
  const props = createProps({
    isGroupCall: true,
    peekedParticipants: ["Sam", "Cayce", "April", "Logan", "Carl"].map((title) => fakePeekedParticipant({ title }))
  });
  return /* @__PURE__ */ React.createElement(import_CallingLobby.CallingLobby, {
    ...props
  });
}, "GroupCall4PeekedParticipants");
GroupCall4PeekedParticipants.story = {
  name: "Group Call - 4 peeked participants"
};
const GroupCall4PeekedParticipantsParticipantsList = /* @__PURE__ */ __name(() => {
  const props = createProps({
    isGroupCall: true,
    peekedParticipants: ["Sam", "Cayce", "April", "Logan", "Carl"].map((title) => fakePeekedParticipant({ title })),
    showParticipantsList: true
  });
  return /* @__PURE__ */ React.createElement(import_CallingLobby.CallingLobby, {
    ...props
  });
}, "GroupCall4PeekedParticipantsParticipantsList");
GroupCall4PeekedParticipantsParticipantsList.story = {
  name: "Group Call - 4 peeked participants (participants list)"
};
const GroupCallCallFull = /* @__PURE__ */ __name(() => {
  const props = createProps({
    isGroupCall: true,
    isCallFull: true,
    peekedParticipants: ["Sam", "Cayce"].map((title) => fakePeekedParticipant({ title }))
  });
  return /* @__PURE__ */ React.createElement(import_CallingLobby.CallingLobby, {
    ...props
  });
}, "GroupCallCallFull");
GroupCallCallFull.story = {
  name: "Group Call - call full"
};
const GroupCall0PeekedParticipantsBigGroup = /* @__PURE__ */ __name(() => {
  const props = createProps({
    isGroupCall: true,
    groupMembers: (0, import_lodash.times)(100, () => (0, import_getDefaultConversation.getDefaultConversation)())
  });
  return /* @__PURE__ */ React.createElement(import_CallingLobby.CallingLobby, {
    ...props
  });
}, "GroupCall0PeekedParticipantsBigGroup");
GroupCall0PeekedParticipantsBigGroup.story = {
  name: "Group Call - 0 peeked participants, big group"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Default,
  GroupCall0PeekedParticipants,
  GroupCall0PeekedParticipantsBigGroup,
  GroupCall1PeekedParticipant,
  GroupCall1PeekedParticipantSelf,
  GroupCall4PeekedParticipants,
  GroupCall4PeekedParticipantsParticipantsList,
  GroupCallCallFull,
  InitiallyMuted,
  LocalVideo,
  NoCameraLocalAvatar,
  NoCameraNoAvatar
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ2FsbGluZ0xvYmJ5LnN0b3JpZXMudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMC0yMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgdGltZXMgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgYm9vbGVhbiB9IGZyb20gJ0BzdG9yeWJvb2svYWRkb24ta25vYnMnO1xuaW1wb3J0IHsgYWN0aW9uIH0gZnJvbSAnQHN0b3J5Ym9vay9hZGRvbi1hY3Rpb25zJztcblxuaW1wb3J0IHsgQXZhdGFyQ29sb3JzIH0gZnJvbSAnLi4vdHlwZXMvQ29sb3JzJztcbmltcG9ydCB0eXBlIHsgQ29udmVyc2F0aW9uVHlwZSB9IGZyb20gJy4uL3N0YXRlL2R1Y2tzL2NvbnZlcnNhdGlvbnMnO1xuaW1wb3J0IHR5cGUgeyBQcm9wc1R5cGUgfSBmcm9tICcuL0NhbGxpbmdMb2JieSc7XG5pbXBvcnQgeyBDYWxsaW5nTG9iYnkgfSBmcm9tICcuL0NhbGxpbmdMb2JieSc7XG5pbXBvcnQgeyBzZXR1cEkxOG4gfSBmcm9tICcuLi91dGlsL3NldHVwSTE4bic7XG5pbXBvcnQgeyBVVUlEIH0gZnJvbSAnLi4vdHlwZXMvVVVJRCc7XG5pbXBvcnQgZW5NZXNzYWdlcyBmcm9tICcuLi8uLi9fbG9jYWxlcy9lbi9tZXNzYWdlcy5qc29uJztcbmltcG9ydCB7XG4gIGdldERlZmF1bHRDb252ZXJzYXRpb24sXG4gIGdldERlZmF1bHRDb252ZXJzYXRpb25XaXRoVXVpZCxcbn0gZnJvbSAnLi4vdGVzdC1ib3RoL2hlbHBlcnMvZ2V0RGVmYXVsdENvbnZlcnNhdGlvbic7XG5cbmNvbnN0IGkxOG4gPSBzZXR1cEkxOG4oJ2VuJywgZW5NZXNzYWdlcyk7XG5cbmNvbnN0IGNhbWVyYSA9IHtcbiAgZGV2aWNlSWQ6ICdkZmJlNmVmZmU3MGIwNjExYmEwZmRjMmE5ZWEzZjM5ZjZjYjExMGU2Njg3OTQ4ZjdlNWYwMTZjMTExYjczMjljJyxcbiAgZ3JvdXBJZDogJzYzZWUyMThkMjQ0Njg2OWU0MGFkZmM5NThmZjk4MjYzZTUxZjc0MzgyYjAxNDMzMjhlZTQ4MjZmMjBhNzZmNDcnLFxuICBraW5kOiAndmlkZW9pbnB1dCcgYXMgTWVkaWFEZXZpY2VLaW5kLFxuICBsYWJlbDogJ0ZhY2VUaW1lIEhEIENhbWVyYSAoQnVpbHQtaW4pICg5ZmJhOmJjZWQpJyxcbiAgdG9KU09OKCkge1xuICAgIHJldHVybiAnJztcbiAgfSxcbn07XG5cbmNvbnN0IGNyZWF0ZVByb3BzID0gKG92ZXJyaWRlUHJvcHM6IFBhcnRpYWw8UHJvcHNUeXBlPiA9IHt9KTogUHJvcHNUeXBlID0+IHtcbiAgY29uc3QgaXNHcm91cENhbGwgPSBib29sZWFuKFxuICAgICdpc0dyb3VwQ2FsbCcsXG4gICAgb3ZlcnJpZGVQcm9wcy5pc0dyb3VwQ2FsbCB8fCBmYWxzZVxuICApO1xuICBjb25zdCBjb252ZXJzYXRpb24gPSBpc0dyb3VwQ2FsbFxuICAgID8gZ2V0RGVmYXVsdENvbnZlcnNhdGlvbih7XG4gICAgICAgIHRpdGxlOiAnVGFob2UgVHJpcCcsXG4gICAgICAgIHR5cGU6ICdncm91cCcsXG4gICAgICB9KVxuICAgIDogZ2V0RGVmYXVsdENvbnZlcnNhdGlvbigpO1xuXG4gIHJldHVybiB7XG4gICAgYXZhaWxhYmxlQ2FtZXJhczogb3ZlcnJpZGVQcm9wcy5hdmFpbGFibGVDYW1lcmFzIHx8IFtjYW1lcmFdLFxuICAgIGNvbnZlcnNhdGlvbixcbiAgICBncm91cE1lbWJlcnM6XG4gICAgICBvdmVycmlkZVByb3BzLmdyb3VwTWVtYmVycyB8fFxuICAgICAgKGlzR3JvdXBDYWxsID8gdGltZXMoMywgKCkgPT4gZ2V0RGVmYXVsdENvbnZlcnNhdGlvbigpKSA6IHVuZGVmaW5lZCksXG4gICAgaGFzTG9jYWxBdWRpbzogYm9vbGVhbihcbiAgICAgICdoYXNMb2NhbEF1ZGlvJyxcbiAgICAgIG92ZXJyaWRlUHJvcHMuaGFzTG9jYWxBdWRpbyA/PyB0cnVlXG4gICAgKSxcbiAgICBoYXNMb2NhbFZpZGVvOiBib29sZWFuKFxuICAgICAgJ2hhc0xvY2FsVmlkZW8nLFxuICAgICAgb3ZlcnJpZGVQcm9wcy5oYXNMb2NhbFZpZGVvID8/IGZhbHNlXG4gICAgKSxcbiAgICBpMThuLFxuICAgIGlzR3JvdXBDYWxsLFxuICAgIGlzR3JvdXBDYWxsT3V0Ym91bmRSaW5nRW5hYmxlZDogdHJ1ZSxcbiAgICBpc0NhbGxGdWxsOiBib29sZWFuKCdpc0NhbGxGdWxsJywgb3ZlcnJpZGVQcm9wcy5pc0NhbGxGdWxsIHx8IGZhbHNlKSxcbiAgICBtZTpcbiAgICAgIG92ZXJyaWRlUHJvcHMubWUgfHxcbiAgICAgIGdldERlZmF1bHRDb252ZXJzYXRpb24oe1xuICAgICAgICBjb2xvcjogQXZhdGFyQ29sb3JzWzBdLFxuICAgICAgICBpZDogVVVJRC5nZW5lcmF0ZSgpLnRvU3RyaW5nKCksXG4gICAgICAgIHV1aWQ6IFVVSUQuZ2VuZXJhdGUoKS50b1N0cmluZygpLFxuICAgICAgfSksXG4gICAgb25DYWxsQ2FuY2VsZWQ6IGFjdGlvbignb24tY2FsbC1jYW5jZWxlZCcpLFxuICAgIG9uSm9pbkNhbGw6IGFjdGlvbignb24tam9pbi1jYWxsJyksXG4gICAgb3V0Z29pbmdSaW5nOiBib29sZWFuKCdvdXRnb2luZ1JpbmcnLCBCb29sZWFuKG92ZXJyaWRlUHJvcHMub3V0Z29pbmdSaW5nKSksXG4gICAgcGVla2VkUGFydGljaXBhbnRzOiBvdmVycmlkZVByb3BzLnBlZWtlZFBhcnRpY2lwYW50cyB8fCBbXSxcbiAgICBzZXRMb2NhbEF1ZGlvOiBhY3Rpb24oJ3NldC1sb2NhbC1hdWRpbycpLFxuICAgIHNldExvY2FsUHJldmlldzogYWN0aW9uKCdzZXQtbG9jYWwtcHJldmlldycpLFxuICAgIHNldExvY2FsVmlkZW86IGFjdGlvbignc2V0LWxvY2FsLXZpZGVvJyksXG4gICAgc2V0T3V0Z29pbmdSaW5nOiBhY3Rpb24oJ3NldC1vdXRnb2luZy1yaW5nJyksXG4gICAgc2hvd1BhcnRpY2lwYW50c0xpc3Q6IGJvb2xlYW4oXG4gICAgICAnc2hvd1BhcnRpY2lwYW50c0xpc3QnLFxuICAgICAgQm9vbGVhbihvdmVycmlkZVByb3BzLnNob3dQYXJ0aWNpcGFudHNMaXN0KVxuICAgICksXG4gICAgdG9nZ2xlUGFydGljaXBhbnRzOiBhY3Rpb24oJ3RvZ2dsZS1wYXJ0aWNpcGFudHMnKSxcbiAgICB0b2dnbGVTZXR0aW5nczogYWN0aW9uKCd0b2dnbGUtc2V0dGluZ3MnKSxcbiAgfTtcbn07XG5cbmNvbnN0IGZha2VQZWVrZWRQYXJ0aWNpcGFudCA9IChjb252ZXJzYXRpb25Qcm9wczogUGFydGlhbDxDb252ZXJzYXRpb25UeXBlPikgPT5cbiAgZ2V0RGVmYXVsdENvbnZlcnNhdGlvbldpdGhVdWlkKHtcbiAgICAuLi5jb252ZXJzYXRpb25Qcm9wcyxcbiAgfSk7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgdGl0bGU6ICdDb21wb25lbnRzL0NhbGxpbmdMb2JieScsXG59O1xuXG5leHBvcnQgY29uc3QgRGVmYXVsdCA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IHByb3BzID0gY3JlYXRlUHJvcHMoKTtcbiAgcmV0dXJuIDxDYWxsaW5nTG9iYnkgey4uLnByb3BzfSAvPjtcbn07XG5cbmV4cG9ydCBjb25zdCBOb0NhbWVyYU5vQXZhdGFyID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgcHJvcHMgPSBjcmVhdGVQcm9wcyh7XG4gICAgYXZhaWxhYmxlQ2FtZXJhczogW10sXG4gIH0pO1xuICByZXR1cm4gPENhbGxpbmdMb2JieSB7Li4ucHJvcHN9IC8+O1xufTtcblxuTm9DYW1lcmFOb0F2YXRhci5zdG9yeSA9IHtcbiAgbmFtZTogJ05vIENhbWVyYSwgbm8gYXZhdGFyJyxcbn07XG5cbmV4cG9ydCBjb25zdCBOb0NhbWVyYUxvY2FsQXZhdGFyID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgcHJvcHMgPSBjcmVhdGVQcm9wcyh7XG4gICAgYXZhaWxhYmxlQ2FtZXJhczogW10sXG4gICAgbWU6IGdldERlZmF1bHRDb252ZXJzYXRpb24oe1xuICAgICAgYXZhdGFyUGF0aDogJy9maXh0dXJlcy9raXR0ZW4tNC0xMTItMTEyLmpwZycsXG4gICAgICBjb2xvcjogQXZhdGFyQ29sb3JzWzBdLFxuICAgICAgaWQ6IFVVSUQuZ2VuZXJhdGUoKS50b1N0cmluZygpLFxuICAgICAgdXVpZDogVVVJRC5nZW5lcmF0ZSgpLnRvU3RyaW5nKCksXG4gICAgfSksXG4gIH0pO1xuICByZXR1cm4gPENhbGxpbmdMb2JieSB7Li4ucHJvcHN9IC8+O1xufTtcblxuTm9DYW1lcmFMb2NhbEF2YXRhci5zdG9yeSA9IHtcbiAgbmFtZTogJ05vIENhbWVyYSwgbG9jYWwgYXZhdGFyJyxcbn07XG5cbmV4cG9ydCBjb25zdCBMb2NhbFZpZGVvID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgcHJvcHMgPSBjcmVhdGVQcm9wcyh7XG4gICAgaGFzTG9jYWxWaWRlbzogdHJ1ZSxcbiAgfSk7XG4gIHJldHVybiA8Q2FsbGluZ0xvYmJ5IHsuLi5wcm9wc30gLz47XG59O1xuXG5leHBvcnQgY29uc3QgSW5pdGlhbGx5TXV0ZWQgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBwcm9wcyA9IGNyZWF0ZVByb3BzKHtcbiAgICBoYXNMb2NhbEF1ZGlvOiBmYWxzZSxcbiAgfSk7XG4gIHJldHVybiA8Q2FsbGluZ0xvYmJ5IHsuLi5wcm9wc30gLz47XG59O1xuXG5Jbml0aWFsbHlNdXRlZC5zdG9yeSA9IHtcbiAgbmFtZTogJ0luaXRpYWxseSBtdXRlZCcsXG59O1xuXG5leHBvcnQgY29uc3QgR3JvdXBDYWxsMFBlZWtlZFBhcnRpY2lwYW50cyA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IHByb3BzID0gY3JlYXRlUHJvcHMoeyBpc0dyb3VwQ2FsbDogdHJ1ZSwgcGVla2VkUGFydGljaXBhbnRzOiBbXSB9KTtcbiAgcmV0dXJuIDxDYWxsaW5nTG9iYnkgey4uLnByb3BzfSAvPjtcbn07XG5cbkdyb3VwQ2FsbDBQZWVrZWRQYXJ0aWNpcGFudHMuc3RvcnkgPSB7XG4gIG5hbWU6ICdHcm91cCBDYWxsIC0gMCBwZWVrZWQgcGFydGljaXBhbnRzJyxcbn07XG5cbmV4cG9ydCBjb25zdCBHcm91cENhbGwxUGVla2VkUGFydGljaXBhbnQgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBwcm9wcyA9IGNyZWF0ZVByb3BzKHtcbiAgICBpc0dyb3VwQ2FsbDogdHJ1ZSxcbiAgICBwZWVrZWRQYXJ0aWNpcGFudHM6IFt7IHRpdGxlOiAnU2FtJyB9XS5tYXAoZmFrZVBlZWtlZFBhcnRpY2lwYW50KSxcbiAgfSk7XG4gIHJldHVybiA8Q2FsbGluZ0xvYmJ5IHsuLi5wcm9wc30gLz47XG59O1xuXG5Hcm91cENhbGwxUGVla2VkUGFydGljaXBhbnQuc3RvcnkgPSB7XG4gIG5hbWU6ICdHcm91cCBDYWxsIC0gMSBwZWVrZWQgcGFydGljaXBhbnQnLFxufTtcblxuZXhwb3J0IGNvbnN0IEdyb3VwQ2FsbDFQZWVrZWRQYXJ0aWNpcGFudFNlbGYgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCB1dWlkID0gVVVJRC5nZW5lcmF0ZSgpLnRvU3RyaW5nKCk7XG4gIGNvbnN0IHByb3BzID0gY3JlYXRlUHJvcHMoe1xuICAgIGlzR3JvdXBDYWxsOiB0cnVlLFxuICAgIG1lOiBnZXREZWZhdWx0Q29udmVyc2F0aW9uKHtcbiAgICAgIGlkOiBVVUlELmdlbmVyYXRlKCkudG9TdHJpbmcoKSxcbiAgICAgIHV1aWQsXG4gICAgfSksXG4gICAgcGVla2VkUGFydGljaXBhbnRzOiBbZmFrZVBlZWtlZFBhcnRpY2lwYW50KHsgdGl0bGU6ICdBc2gnLCB1dWlkIH0pXSxcbiAgfSk7XG4gIHJldHVybiA8Q2FsbGluZ0xvYmJ5IHsuLi5wcm9wc30gLz47XG59O1xuXG5Hcm91cENhbGwxUGVla2VkUGFydGljaXBhbnRTZWxmLnN0b3J5ID0ge1xuICBuYW1lOiAnR3JvdXAgQ2FsbCAtIDEgcGVla2VkIHBhcnRpY2lwYW50IChzZWxmKScsXG59O1xuXG5leHBvcnQgY29uc3QgR3JvdXBDYWxsNFBlZWtlZFBhcnRpY2lwYW50cyA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IHByb3BzID0gY3JlYXRlUHJvcHMoe1xuICAgIGlzR3JvdXBDYWxsOiB0cnVlLFxuICAgIHBlZWtlZFBhcnRpY2lwYW50czogWydTYW0nLCAnQ2F5Y2UnLCAnQXByaWwnLCAnTG9nYW4nLCAnQ2FybCddLm1hcCh0aXRsZSA9PlxuICAgICAgZmFrZVBlZWtlZFBhcnRpY2lwYW50KHsgdGl0bGUgfSlcbiAgICApLFxuICB9KTtcbiAgcmV0dXJuIDxDYWxsaW5nTG9iYnkgey4uLnByb3BzfSAvPjtcbn07XG5cbkdyb3VwQ2FsbDRQZWVrZWRQYXJ0aWNpcGFudHMuc3RvcnkgPSB7XG4gIG5hbWU6ICdHcm91cCBDYWxsIC0gNCBwZWVrZWQgcGFydGljaXBhbnRzJyxcbn07XG5cbmV4cG9ydCBjb25zdCBHcm91cENhbGw0UGVla2VkUGFydGljaXBhbnRzUGFydGljaXBhbnRzTGlzdCA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IHByb3BzID0gY3JlYXRlUHJvcHMoe1xuICAgIGlzR3JvdXBDYWxsOiB0cnVlLFxuICAgIHBlZWtlZFBhcnRpY2lwYW50czogWydTYW0nLCAnQ2F5Y2UnLCAnQXByaWwnLCAnTG9nYW4nLCAnQ2FybCddLm1hcCh0aXRsZSA9PlxuICAgICAgZmFrZVBlZWtlZFBhcnRpY2lwYW50KHsgdGl0bGUgfSlcbiAgICApLFxuICAgIHNob3dQYXJ0aWNpcGFudHNMaXN0OiB0cnVlLFxuICB9KTtcbiAgcmV0dXJuIDxDYWxsaW5nTG9iYnkgey4uLnByb3BzfSAvPjtcbn07XG5cbkdyb3VwQ2FsbDRQZWVrZWRQYXJ0aWNpcGFudHNQYXJ0aWNpcGFudHNMaXN0LnN0b3J5ID0ge1xuICBuYW1lOiAnR3JvdXAgQ2FsbCAtIDQgcGVla2VkIHBhcnRpY2lwYW50cyAocGFydGljaXBhbnRzIGxpc3QpJyxcbn07XG5cbmV4cG9ydCBjb25zdCBHcm91cENhbGxDYWxsRnVsbCA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IHByb3BzID0gY3JlYXRlUHJvcHMoe1xuICAgIGlzR3JvdXBDYWxsOiB0cnVlLFxuICAgIGlzQ2FsbEZ1bGw6IHRydWUsXG4gICAgcGVla2VkUGFydGljaXBhbnRzOiBbJ1NhbScsICdDYXljZSddLm1hcCh0aXRsZSA9PlxuICAgICAgZmFrZVBlZWtlZFBhcnRpY2lwYW50KHsgdGl0bGUgfSlcbiAgICApLFxuICB9KTtcbiAgcmV0dXJuIDxDYWxsaW5nTG9iYnkgey4uLnByb3BzfSAvPjtcbn07XG5cbkdyb3VwQ2FsbENhbGxGdWxsLnN0b3J5ID0ge1xuICBuYW1lOiAnR3JvdXAgQ2FsbCAtIGNhbGwgZnVsbCcsXG59O1xuXG5leHBvcnQgY29uc3QgR3JvdXBDYWxsMFBlZWtlZFBhcnRpY2lwYW50c0JpZ0dyb3VwID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgcHJvcHMgPSBjcmVhdGVQcm9wcyh7XG4gICAgaXNHcm91cENhbGw6IHRydWUsXG4gICAgZ3JvdXBNZW1iZXJzOiB0aW1lcygxMDAsICgpID0+IGdldERlZmF1bHRDb252ZXJzYXRpb24oKSksXG4gIH0pO1xuICByZXR1cm4gPENhbGxpbmdMb2JieSB7Li4ucHJvcHN9IC8+O1xufTtcblxuR3JvdXBDYWxsMFBlZWtlZFBhcnRpY2lwYW50c0JpZ0dyb3VwLnN0b3J5ID0ge1xuICBuYW1lOiAnR3JvdXAgQ2FsbCAtIDAgcGVla2VkIHBhcnRpY2lwYW50cywgYmlnIGdyb3VwJyxcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FB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
