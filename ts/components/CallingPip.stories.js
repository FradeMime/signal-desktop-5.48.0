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
var CallingPip_stories_exports = {};
__export(CallingPip_stories_exports, {
  ContactNoColor: () => ContactNoColor,
  ContactWithAvatarAndNoVideo: () => ContactWithAvatarAndNoVideo,
  Default: () => Default,
  GroupCall: () => GroupCall,
  default: () => CallingPip_stories_default
});
module.exports = __toCommonJS(CallingPip_stories_exports);
var React = __toESM(require("react"));
var import_lodash = require("lodash");
var import_addon_knobs = require("@storybook/addon-knobs");
var import_addon_actions = require("@storybook/addon-actions");
var import_Colors = require("../types/Colors");
var import_CallingPip = require("./CallingPip");
var import_Calling = require("../types/Calling");
var import_getDefaultConversation = require("../test-both/helpers/getDefaultConversation");
var import_fakeGetGroupCallVideoFrameSource = require("../test-both/helpers/fakeGetGroupCallVideoFrameSource");
var import_setupI18n = require("../util/setupI18n");
var import_messages = __toESM(require("../../_locales/en/messages.json"));
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
const conversation = (0, import_getDefaultConversation.getDefaultConversation)({
  id: "3051234567",
  avatarPath: void 0,
  color: import_Colors.AvatarColors[0],
  title: "Rick Sanchez",
  name: "Rick Sanchez",
  phoneNumber: "3051234567",
  profileName: "Rick Sanchez"
});
const getCommonActiveCallData = /* @__PURE__ */ __name(() => ({
  conversation,
  hasLocalAudio: (0, import_addon_knobs.boolean)("hasLocalAudio", true),
  hasLocalVideo: (0, import_addon_knobs.boolean)("hasLocalVideo", false),
  localAudioLevel: (0, import_addon_knobs.select)("localAudioLevel", [0, 0.5, 1], 0),
  viewMode: (0, import_addon_knobs.select)("viewMode", [import_Calling.CallViewMode.Grid, import_Calling.CallViewMode.Speaker, import_Calling.CallViewMode.Presentation], import_Calling.CallViewMode.Grid),
  joinedAt: Date.now(),
  outgoingRing: true,
  pip: true,
  settingsDialogOpen: false,
  showParticipantsList: false
}), "getCommonActiveCallData");
const defaultCall = {
  ...getCommonActiveCallData(),
  callMode: import_Calling.CallMode.Direct,
  callState: import_Calling.CallState.Accepted,
  peekedParticipants: [],
  remoteParticipants: [
    { hasRemoteVideo: true, presenting: false, title: "Arsene" }
  ]
};
const createProps = /* @__PURE__ */ __name((overrideProps = {}) => ({
  activeCall: overrideProps.activeCall || defaultCall,
  getGroupCallVideoFrameSource: import_fakeGetGroupCallVideoFrameSource.fakeGetGroupCallVideoFrameSource,
  hangUpActiveCall: (0, import_addon_actions.action)("hang-up-active-call"),
  hasLocalVideo: (0, import_addon_knobs.boolean)("hasLocalVideo", overrideProps.hasLocalVideo || false),
  i18n,
  setGroupCallVideoRequest: (0, import_addon_actions.action)("set-group-call-video-request"),
  setLocalPreview: (0, import_addon_actions.action)("set-local-preview"),
  setRendererCanvas: (0, import_addon_actions.action)("set-renderer-canvas"),
  switchFromPresentationView: (0, import_addon_actions.action)("switch-to-presentation-view"),
  switchToPresentationView: (0, import_addon_actions.action)("switch-to-presentation-view"),
  togglePip: (0, import_addon_actions.action)("toggle-pip")
}), "createProps");
var CallingPip_stories_default = {
  title: "Components/CallingPip"
};
const Default = /* @__PURE__ */ __name(() => {
  const props = createProps({});
  return /* @__PURE__ */ React.createElement(import_CallingPip.CallingPip, {
    ...props
  });
}, "Default");
const ContactWithAvatarAndNoVideo = /* @__PURE__ */ __name(() => {
  const props = createProps({
    activeCall: {
      ...defaultCall,
      conversation: {
        ...conversation,
        avatarPath: "https://www.fillmurray.com/64/64"
      },
      remoteParticipants: [
        { hasRemoteVideo: false, presenting: false, title: "Julian" }
      ]
    }
  });
  return /* @__PURE__ */ React.createElement(import_CallingPip.CallingPip, {
    ...props
  });
}, "ContactWithAvatarAndNoVideo");
ContactWithAvatarAndNoVideo.story = {
  name: "Contact (with avatar and no video)"
};
const ContactNoColor = /* @__PURE__ */ __name(() => {
  const props = createProps({
    activeCall: {
      ...defaultCall,
      conversation: {
        ...conversation,
        color: void 0
      }
    }
  });
  return /* @__PURE__ */ React.createElement(import_CallingPip.CallingPip, {
    ...props
  });
}, "ContactNoColor");
ContactNoColor.story = {
  name: "Contact (no color)"
};
const GroupCall = /* @__PURE__ */ __name(() => {
  const props = createProps({
    activeCall: {
      ...getCommonActiveCallData(),
      callMode: import_Calling.CallMode.Group,
      connectionState: import_Calling.GroupCallConnectionState.Connected,
      conversationsWithSafetyNumberChanges: [],
      groupMembers: (0, import_lodash.times)(3, () => (0, import_getDefaultConversation.getDefaultConversation)()),
      joinState: import_Calling.GroupCallJoinState.Joined,
      maxDevices: 5,
      deviceCount: 0,
      peekedParticipants: [],
      remoteParticipants: [],
      remoteAudioLevels: /* @__PURE__ */ new Map()
    }
  });
  return /* @__PURE__ */ React.createElement(import_CallingPip.CallingPip, {
    ...props
  });
}, "GroupCall");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ContactNoColor,
  ContactWithAvatarAndNoVideo,
  Default,
  GroupCall
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ2FsbGluZ1BpcC5zdG9yaWVzLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjAtMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHRpbWVzIH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IGJvb2xlYW4sIHNlbGVjdCB9IGZyb20gJ0BzdG9yeWJvb2svYWRkb24ta25vYnMnO1xuaW1wb3J0IHsgYWN0aW9uIH0gZnJvbSAnQHN0b3J5Ym9vay9hZGRvbi1hY3Rpb25zJztcblxuaW1wb3J0IHsgQXZhdGFyQ29sb3JzIH0gZnJvbSAnLi4vdHlwZXMvQ29sb3JzJztcbmltcG9ydCB0eXBlIHsgQ29udmVyc2F0aW9uVHlwZSB9IGZyb20gJy4uL3N0YXRlL2R1Y2tzL2NvbnZlcnNhdGlvbnMnO1xuaW1wb3J0IHR5cGUgeyBQcm9wc1R5cGUgfSBmcm9tICcuL0NhbGxpbmdQaXAnO1xuaW1wb3J0IHsgQ2FsbGluZ1BpcCB9IGZyb20gJy4vQ2FsbGluZ1BpcCc7XG5pbXBvcnQgdHlwZSB7IEFjdGl2ZUNhbGxUeXBlIH0gZnJvbSAnLi4vdHlwZXMvQ2FsbGluZyc7XG5pbXBvcnQge1xuICBDYWxsTW9kZSxcbiAgQ2FsbFZpZXdNb2RlLFxuICBDYWxsU3RhdGUsXG4gIEdyb3VwQ2FsbENvbm5lY3Rpb25TdGF0ZSxcbiAgR3JvdXBDYWxsSm9pblN0YXRlLFxufSBmcm9tICcuLi90eXBlcy9DYWxsaW5nJztcbmltcG9ydCB7IGdldERlZmF1bHRDb252ZXJzYXRpb24gfSBmcm9tICcuLi90ZXN0LWJvdGgvaGVscGVycy9nZXREZWZhdWx0Q29udmVyc2F0aW9uJztcbmltcG9ydCB7IGZha2VHZXRHcm91cENhbGxWaWRlb0ZyYW1lU291cmNlIH0gZnJvbSAnLi4vdGVzdC1ib3RoL2hlbHBlcnMvZmFrZUdldEdyb3VwQ2FsbFZpZGVvRnJhbWVTb3VyY2UnO1xuaW1wb3J0IHsgc2V0dXBJMThuIH0gZnJvbSAnLi4vdXRpbC9zZXR1cEkxOG4nO1xuaW1wb3J0IGVuTWVzc2FnZXMgZnJvbSAnLi4vLi4vX2xvY2FsZXMvZW4vbWVzc2FnZXMuanNvbic7XG5cbmNvbnN0IGkxOG4gPSBzZXR1cEkxOG4oJ2VuJywgZW5NZXNzYWdlcyk7XG5cbmNvbnN0IGNvbnZlcnNhdGlvbjogQ29udmVyc2F0aW9uVHlwZSA9IGdldERlZmF1bHRDb252ZXJzYXRpb24oe1xuICBpZDogJzMwNTEyMzQ1NjcnLFxuICBhdmF0YXJQYXRoOiB1bmRlZmluZWQsXG4gIGNvbG9yOiBBdmF0YXJDb2xvcnNbMF0sXG4gIHRpdGxlOiAnUmljayBTYW5jaGV6JyxcbiAgbmFtZTogJ1JpY2sgU2FuY2hleicsXG4gIHBob25lTnVtYmVyOiAnMzA1MTIzNDU2NycsXG4gIHByb2ZpbGVOYW1lOiAnUmljayBTYW5jaGV6Jyxcbn0pO1xuXG5jb25zdCBnZXRDb21tb25BY3RpdmVDYWxsRGF0YSA9ICgpID0+ICh7XG4gIGNvbnZlcnNhdGlvbixcbiAgaGFzTG9jYWxBdWRpbzogYm9vbGVhbignaGFzTG9jYWxBdWRpbycsIHRydWUpLFxuICBoYXNMb2NhbFZpZGVvOiBib29sZWFuKCdoYXNMb2NhbFZpZGVvJywgZmFsc2UpLFxuICBsb2NhbEF1ZGlvTGV2ZWw6IHNlbGVjdCgnbG9jYWxBdWRpb0xldmVsJywgWzAsIDAuNSwgMV0sIDApLFxuICB2aWV3TW9kZTogc2VsZWN0KFxuICAgICd2aWV3TW9kZScsXG4gICAgW0NhbGxWaWV3TW9kZS5HcmlkLCBDYWxsVmlld01vZGUuU3BlYWtlciwgQ2FsbFZpZXdNb2RlLlByZXNlbnRhdGlvbl0sXG4gICAgQ2FsbFZpZXdNb2RlLkdyaWRcbiAgKSxcbiAgam9pbmVkQXQ6IERhdGUubm93KCksXG4gIG91dGdvaW5nUmluZzogdHJ1ZSxcbiAgcGlwOiB0cnVlLFxuICBzZXR0aW5nc0RpYWxvZ09wZW46IGZhbHNlLFxuICBzaG93UGFydGljaXBhbnRzTGlzdDogZmFsc2UsXG59KTtcblxuY29uc3QgZGVmYXVsdENhbGw6IEFjdGl2ZUNhbGxUeXBlID0ge1xuICAuLi5nZXRDb21tb25BY3RpdmVDYWxsRGF0YSgpLFxuICBjYWxsTW9kZTogQ2FsbE1vZGUuRGlyZWN0IGFzIENhbGxNb2RlLkRpcmVjdCxcbiAgY2FsbFN0YXRlOiBDYWxsU3RhdGUuQWNjZXB0ZWQsXG4gIHBlZWtlZFBhcnRpY2lwYW50czogW10sXG4gIHJlbW90ZVBhcnRpY2lwYW50czogW1xuICAgIHsgaGFzUmVtb3RlVmlkZW86IHRydWUsIHByZXNlbnRpbmc6IGZhbHNlLCB0aXRsZTogJ0Fyc2VuZScgfSxcbiAgXSxcbn07XG5cbmNvbnN0IGNyZWF0ZVByb3BzID0gKG92ZXJyaWRlUHJvcHM6IFBhcnRpYWw8UHJvcHNUeXBlPiA9IHt9KTogUHJvcHNUeXBlID0+ICh7XG4gIGFjdGl2ZUNhbGw6IG92ZXJyaWRlUHJvcHMuYWN0aXZlQ2FsbCB8fCBkZWZhdWx0Q2FsbCxcbiAgZ2V0R3JvdXBDYWxsVmlkZW9GcmFtZVNvdXJjZTogZmFrZUdldEdyb3VwQ2FsbFZpZGVvRnJhbWVTb3VyY2UsXG4gIGhhbmdVcEFjdGl2ZUNhbGw6IGFjdGlvbignaGFuZy11cC1hY3RpdmUtY2FsbCcpLFxuICBoYXNMb2NhbFZpZGVvOiBib29sZWFuKCdoYXNMb2NhbFZpZGVvJywgb3ZlcnJpZGVQcm9wcy5oYXNMb2NhbFZpZGVvIHx8IGZhbHNlKSxcbiAgaTE4bixcbiAgc2V0R3JvdXBDYWxsVmlkZW9SZXF1ZXN0OiBhY3Rpb24oJ3NldC1ncm91cC1jYWxsLXZpZGVvLXJlcXVlc3QnKSxcbiAgc2V0TG9jYWxQcmV2aWV3OiBhY3Rpb24oJ3NldC1sb2NhbC1wcmV2aWV3JyksXG4gIHNldFJlbmRlcmVyQ2FudmFzOiBhY3Rpb24oJ3NldC1yZW5kZXJlci1jYW52YXMnKSxcbiAgc3dpdGNoRnJvbVByZXNlbnRhdGlvblZpZXc6IGFjdGlvbignc3dpdGNoLXRvLXByZXNlbnRhdGlvbi12aWV3JyksXG4gIHN3aXRjaFRvUHJlc2VudGF0aW9uVmlldzogYWN0aW9uKCdzd2l0Y2gtdG8tcHJlc2VudGF0aW9uLXZpZXcnKSxcbiAgdG9nZ2xlUGlwOiBhY3Rpb24oJ3RvZ2dsZS1waXAnKSxcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHRpdGxlOiAnQ29tcG9uZW50cy9DYWxsaW5nUGlwJyxcbn07XG5cbmV4cG9ydCBjb25zdCBEZWZhdWx0ID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgcHJvcHMgPSBjcmVhdGVQcm9wcyh7fSk7XG4gIHJldHVybiA8Q2FsbGluZ1BpcCB7Li4ucHJvcHN9IC8+O1xufTtcblxuZXhwb3J0IGNvbnN0IENvbnRhY3RXaXRoQXZhdGFyQW5kTm9WaWRlbyA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IHByb3BzID0gY3JlYXRlUHJvcHMoe1xuICAgIGFjdGl2ZUNhbGw6IHtcbiAgICAgIC4uLmRlZmF1bHRDYWxsLFxuICAgICAgY29udmVyc2F0aW9uOiB7XG4gICAgICAgIC4uLmNvbnZlcnNhdGlvbixcbiAgICAgICAgYXZhdGFyUGF0aDogJ2h0dHBzOi8vd3d3LmZpbGxtdXJyYXkuY29tLzY0LzY0JyxcbiAgICAgIH0sXG4gICAgICByZW1vdGVQYXJ0aWNpcGFudHM6IFtcbiAgICAgICAgeyBoYXNSZW1vdGVWaWRlbzogZmFsc2UsIHByZXNlbnRpbmc6IGZhbHNlLCB0aXRsZTogJ0p1bGlhbicgfSxcbiAgICAgIF0sXG4gICAgfSxcbiAgfSk7XG4gIHJldHVybiA8Q2FsbGluZ1BpcCB7Li4ucHJvcHN9IC8+O1xufTtcblxuQ29udGFjdFdpdGhBdmF0YXJBbmROb1ZpZGVvLnN0b3J5ID0ge1xuICBuYW1lOiAnQ29udGFjdCAod2l0aCBhdmF0YXIgYW5kIG5vIHZpZGVvKScsXG59O1xuXG5leHBvcnQgY29uc3QgQ29udGFjdE5vQ29sb3IgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBwcm9wcyA9IGNyZWF0ZVByb3BzKHtcbiAgICBhY3RpdmVDYWxsOiB7XG4gICAgICAuLi5kZWZhdWx0Q2FsbCxcbiAgICAgIGNvbnZlcnNhdGlvbjoge1xuICAgICAgICAuLi5jb252ZXJzYXRpb24sXG4gICAgICAgIGNvbG9yOiB1bmRlZmluZWQsXG4gICAgICB9LFxuICAgIH0sXG4gIH0pO1xuICByZXR1cm4gPENhbGxpbmdQaXAgey4uLnByb3BzfSAvPjtcbn07XG5cbkNvbnRhY3ROb0NvbG9yLnN0b3J5ID0ge1xuICBuYW1lOiAnQ29udGFjdCAobm8gY29sb3IpJyxcbn07XG5cbmV4cG9ydCBjb25zdCBHcm91cENhbGwgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBwcm9wcyA9IGNyZWF0ZVByb3BzKHtcbiAgICBhY3RpdmVDYWxsOiB7XG4gICAgICAuLi5nZXRDb21tb25BY3RpdmVDYWxsRGF0YSgpLFxuICAgICAgY2FsbE1vZGU6IENhbGxNb2RlLkdyb3VwIGFzIENhbGxNb2RlLkdyb3VwLFxuICAgICAgY29ubmVjdGlvblN0YXRlOiBHcm91cENhbGxDb25uZWN0aW9uU3RhdGUuQ29ubmVjdGVkLFxuICAgICAgY29udmVyc2F0aW9uc1dpdGhTYWZldHlOdW1iZXJDaGFuZ2VzOiBbXSxcbiAgICAgIGdyb3VwTWVtYmVyczogdGltZXMoMywgKCkgPT4gZ2V0RGVmYXVsdENvbnZlcnNhdGlvbigpKSxcbiAgICAgIGpvaW5TdGF0ZTogR3JvdXBDYWxsSm9pblN0YXRlLkpvaW5lZCxcbiAgICAgIG1heERldmljZXM6IDUsXG4gICAgICBkZXZpY2VDb3VudDogMCxcbiAgICAgIHBlZWtlZFBhcnRpY2lwYW50czogW10sXG4gICAgICByZW1vdGVQYXJ0aWNpcGFudHM6IFtdLFxuICAgICAgcmVtb3RlQXVkaW9MZXZlbHM6IG5ldyBNYXA8bnVtYmVyLCBudW1iZXI+KCksXG4gICAgfSxcbiAgfSk7XG4gIHJldHVybiA8Q2FsbGluZ1BpcCB7Li4ucHJvcHN9IC8+O1xufTtcbiJdLAogICJtYXBwaW5n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
