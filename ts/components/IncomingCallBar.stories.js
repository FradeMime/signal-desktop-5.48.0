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
var IncomingCallBar_stories_exports = {};
__export(IncomingCallBar_stories_exports, {
  IncomingDirectCallAudio: () => IncomingDirectCallAudio,
  IncomingDirectCallVideo: () => IncomingDirectCallVideo,
  IncomingGroupCallCallingYouAnd1Other: () => IncomingGroupCallCallingYouAnd1Other,
  IncomingGroupCallCallingYouAnd2Others: () => IncomingGroupCallCallingYouAnd2Others,
  IncomingGroupCallCallingYouAnd3Others: () => IncomingGroupCallCallingYouAnd3Others,
  IncomingGroupCallCallingYouAnd4Others: () => IncomingGroupCallCallingYouAnd4Others,
  IncomingGroupCallOnlyCallingYou: () => IncomingGroupCallOnlyCallingYou,
  default: () => IncomingCallBar_stories_default
});
module.exports = __toCommonJS(IncomingCallBar_stories_exports);
var React = __toESM(require("react"));
var import_addon_actions = require("@storybook/addon-actions");
var import_IncomingCallBar = require("./IncomingCallBar");
var import_Calling = require("../types/Calling");
var import_setupI18n = require("../util/setupI18n");
var import_messages = __toESM(require("../../_locales/en/messages.json"));
var import_getDefaultConversation = require("../test-both/helpers/getDefaultConversation");
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
const commonProps = {
  acceptCall: (0, import_addon_actions.action)("accept-call"),
  bounceAppIconStart: (0, import_addon_actions.action)("bounceAppIconStart"),
  bounceAppIconStop: (0, import_addon_actions.action)("bounceAppIconStop"),
  call: {
    conversationId: "fake-conversation-id",
    callId: 0,
    isIncoming: true,
    isVideoCall: true
  },
  conversation: (0, import_getDefaultConversation.getDefaultConversation)({
    id: "3051234567",
    avatarPath: void 0,
    name: "Rick Sanchez",
    phoneNumber: "3051234567",
    profileName: "Rick Sanchez",
    title: "Rick Sanchez"
  }),
  declineCall: (0, import_addon_actions.action)("decline-call"),
  i18n,
  notifyForCall: (0, import_addon_actions.action)("notify-for-call")
};
const directConversation = (0, import_getDefaultConversation.getDefaultConversation)({
  id: "3051234567",
  avatarPath: void 0,
  name: "Rick Sanchez",
  phoneNumber: "3051234567",
  profileName: "Rick Sanchez",
  title: "Rick Sanchez"
});
const groupConversation = (0, import_getDefaultConversation.getDefaultConversation)({
  avatarPath: void 0,
  name: "Tahoe Trip",
  title: "Tahoe Trip",
  type: "group"
});
var IncomingCallBar_stories_default = {
  title: "Components/IncomingCallBar"
};
const IncomingDirectCallVideo = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_IncomingCallBar.IncomingCallBar, {
  ...commonProps,
  conversation: directConversation,
  callMode: import_Calling.CallMode.Direct,
  isVideoCall: true
}), "IncomingDirectCallVideo");
IncomingDirectCallVideo.story = {
  name: "Incoming direct call (video)"
};
const IncomingDirectCallAudio = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_IncomingCallBar.IncomingCallBar, {
  ...commonProps,
  conversation: directConversation,
  callMode: import_Calling.CallMode.Direct,
  isVideoCall: false
}), "IncomingDirectCallAudio");
IncomingDirectCallAudio.story = {
  name: "Incoming direct call (audio)"
};
const IncomingGroupCallOnlyCallingYou = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_IncomingCallBar.IncomingCallBar, {
  ...commonProps,
  conversation: groupConversation,
  callMode: import_Calling.CallMode.Group,
  otherMembersRung: [],
  ringer: { firstName: "Rick", title: "Rick Sanchez" }
}), "IncomingGroupCallOnlyCallingYou");
IncomingGroupCallOnlyCallingYou.story = {
  name: "Incoming group call (only calling you)"
};
const IncomingGroupCallCallingYouAnd1Other = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_IncomingCallBar.IncomingCallBar, {
  ...commonProps,
  conversation: groupConversation,
  callMode: import_Calling.CallMode.Group,
  otherMembersRung: [{ firstName: "Morty", title: "Morty Smith" }],
  ringer: { firstName: "Rick", title: "Rick Sanchez" }
}), "IncomingGroupCallCallingYouAnd1Other");
IncomingGroupCallCallingYouAnd1Other.story = {
  name: "Incoming group call (calling you and 1 other)"
};
const IncomingGroupCallCallingYouAnd2Others = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_IncomingCallBar.IncomingCallBar, {
  ...commonProps,
  conversation: groupConversation,
  callMode: import_Calling.CallMode.Group,
  otherMembersRung: [
    { firstName: "Morty", title: "Morty Smith" },
    { firstName: "Summer", title: "Summer Smith" }
  ],
  ringer: { firstName: "Rick", title: "Rick Sanchez" }
}), "IncomingGroupCallCallingYouAnd2Others");
IncomingGroupCallCallingYouAnd2Others.story = {
  name: "Incoming group call (calling you and 2 others)"
};
const IncomingGroupCallCallingYouAnd3Others = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_IncomingCallBar.IncomingCallBar, {
  ...commonProps,
  conversation: groupConversation,
  callMode: import_Calling.CallMode.Group,
  otherMembersRung: [
    { firstName: "Morty", title: "Morty Smith" },
    { firstName: "Summer", title: "Summer Smith" },
    { firstName: "Beth", title: "Beth Smith" }
  ],
  ringer: { firstName: "Rick", title: "Rick Sanchez" }
}), "IncomingGroupCallCallingYouAnd3Others");
IncomingGroupCallCallingYouAnd3Others.story = {
  name: "Incoming group call (calling you and 3 others)"
};
const IncomingGroupCallCallingYouAnd4Others = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_IncomingCallBar.IncomingCallBar, {
  ...commonProps,
  conversation: groupConversation,
  callMode: import_Calling.CallMode.Group,
  otherMembersRung: [
    { firstName: "Morty", title: "Morty Smith" },
    { firstName: "Summer", title: "Summer Smith" },
    { firstName: "Beth", title: "Beth Sanchez" },
    { firstName: "Jerry", title: "Beth Smith" }
  ],
  ringer: { firstName: "Rick", title: "Rick Sanchez" }
}), "IncomingGroupCallCallingYouAnd4Others");
IncomingGroupCallCallingYouAnd4Others.story = {
  name: "Incoming group call (calling you and 4 others)"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  IncomingDirectCallAudio,
  IncomingDirectCallVideo,
  IncomingGroupCallCallingYouAnd1Other,
  IncomingGroupCallCallingYouAnd2Others,
  IncomingGroupCallCallingYouAnd3Others,
  IncomingGroupCallCallingYouAnd4Others,
  IncomingGroupCallOnlyCallingYou
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiSW5jb21pbmdDYWxsQmFyLnN0b3JpZXMudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMC0yMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgYWN0aW9uIH0gZnJvbSAnQHN0b3J5Ym9vay9hZGRvbi1hY3Rpb25zJztcblxuaW1wb3J0IHsgSW5jb21pbmdDYWxsQmFyIH0gZnJvbSAnLi9JbmNvbWluZ0NhbGxCYXInO1xuaW1wb3J0IHsgQ2FsbE1vZGUgfSBmcm9tICcuLi90eXBlcy9DYWxsaW5nJztcbmltcG9ydCB7IHNldHVwSTE4biB9IGZyb20gJy4uL3V0aWwvc2V0dXBJMThuJztcbmltcG9ydCBlbk1lc3NhZ2VzIGZyb20gJy4uLy4uL19sb2NhbGVzL2VuL21lc3NhZ2VzLmpzb24nO1xuaW1wb3J0IHsgZ2V0RGVmYXVsdENvbnZlcnNhdGlvbiB9IGZyb20gJy4uL3Rlc3QtYm90aC9oZWxwZXJzL2dldERlZmF1bHRDb252ZXJzYXRpb24nO1xuXG5jb25zdCBpMThuID0gc2V0dXBJMThuKCdlbicsIGVuTWVzc2FnZXMpO1xuXG5jb25zdCBjb21tb25Qcm9wcyA9IHtcbiAgYWNjZXB0Q2FsbDogYWN0aW9uKCdhY2NlcHQtY2FsbCcpLFxuICBib3VuY2VBcHBJY29uU3RhcnQ6IGFjdGlvbignYm91bmNlQXBwSWNvblN0YXJ0JyksXG4gIGJvdW5jZUFwcEljb25TdG9wOiBhY3Rpb24oJ2JvdW5jZUFwcEljb25TdG9wJyksXG4gIGNhbGw6IHtcbiAgICBjb252ZXJzYXRpb25JZDogJ2Zha2UtY29udmVyc2F0aW9uLWlkJyxcbiAgICBjYWxsSWQ6IDAsXG4gICAgaXNJbmNvbWluZzogdHJ1ZSxcbiAgICBpc1ZpZGVvQ2FsbDogdHJ1ZSxcbiAgfSxcbiAgY29udmVyc2F0aW9uOiBnZXREZWZhdWx0Q29udmVyc2F0aW9uKHtcbiAgICBpZDogJzMwNTEyMzQ1NjcnLFxuICAgIGF2YXRhclBhdGg6IHVuZGVmaW5lZCxcbiAgICBuYW1lOiAnUmljayBTYW5jaGV6JyxcbiAgICBwaG9uZU51bWJlcjogJzMwNTEyMzQ1NjcnLFxuICAgIHByb2ZpbGVOYW1lOiAnUmljayBTYW5jaGV6JyxcbiAgICB0aXRsZTogJ1JpY2sgU2FuY2hleicsXG4gIH0pLFxuICBkZWNsaW5lQ2FsbDogYWN0aW9uKCdkZWNsaW5lLWNhbGwnKSxcbiAgaTE4bixcbiAgbm90aWZ5Rm9yQ2FsbDogYWN0aW9uKCdub3RpZnktZm9yLWNhbGwnKSxcbn07XG5cbmNvbnN0IGRpcmVjdENvbnZlcnNhdGlvbiA9IGdldERlZmF1bHRDb252ZXJzYXRpb24oe1xuICBpZDogJzMwNTEyMzQ1NjcnLFxuICBhdmF0YXJQYXRoOiB1bmRlZmluZWQsXG4gIG5hbWU6ICdSaWNrIFNhbmNoZXonLFxuICBwaG9uZU51bWJlcjogJzMwNTEyMzQ1NjcnLFxuICBwcm9maWxlTmFtZTogJ1JpY2sgU2FuY2hleicsXG4gIHRpdGxlOiAnUmljayBTYW5jaGV6Jyxcbn0pO1xuXG5jb25zdCBncm91cENvbnZlcnNhdGlvbiA9IGdldERlZmF1bHRDb252ZXJzYXRpb24oe1xuICBhdmF0YXJQYXRoOiB1bmRlZmluZWQsXG4gIG5hbWU6ICdUYWhvZSBUcmlwJyxcbiAgdGl0bGU6ICdUYWhvZSBUcmlwJyxcbiAgdHlwZTogJ2dyb3VwJyxcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHRpdGxlOiAnQ29tcG9uZW50cy9JbmNvbWluZ0NhbGxCYXInLFxufTtcblxuZXhwb3J0IGNvbnN0IEluY29taW5nRGlyZWN0Q2FsbFZpZGVvID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPEluY29taW5nQ2FsbEJhclxuICAgIHsuLi5jb21tb25Qcm9wc31cbiAgICBjb252ZXJzYXRpb249e2RpcmVjdENvbnZlcnNhdGlvbn1cbiAgICBjYWxsTW9kZT17Q2FsbE1vZGUuRGlyZWN0fVxuICAgIGlzVmlkZW9DYWxsXG4gIC8+XG4pO1xuXG5JbmNvbWluZ0RpcmVjdENhbGxWaWRlby5zdG9yeSA9IHtcbiAgbmFtZTogJ0luY29taW5nIGRpcmVjdCBjYWxsICh2aWRlbyknLFxufTtcblxuZXhwb3J0IGNvbnN0IEluY29taW5nRGlyZWN0Q2FsbEF1ZGlvID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPEluY29taW5nQ2FsbEJhclxuICAgIHsuLi5jb21tb25Qcm9wc31cbiAgICBjb252ZXJzYXRpb249e2RpcmVjdENvbnZlcnNhdGlvbn1cbiAgICBjYWxsTW9kZT17Q2FsbE1vZGUuRGlyZWN0fVxuICAgIGlzVmlkZW9DYWxsPXtmYWxzZX1cbiAgLz5cbik7XG5cbkluY29taW5nRGlyZWN0Q2FsbEF1ZGlvLnN0b3J5ID0ge1xuICBuYW1lOiAnSW5jb21pbmcgZGlyZWN0IGNhbGwgKGF1ZGlvKScsXG59O1xuXG5leHBvcnQgY29uc3QgSW5jb21pbmdHcm91cENhbGxPbmx5Q2FsbGluZ1lvdSA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxJbmNvbWluZ0NhbGxCYXJcbiAgICB7Li4uY29tbW9uUHJvcHN9XG4gICAgY29udmVyc2F0aW9uPXtncm91cENvbnZlcnNhdGlvbn1cbiAgICBjYWxsTW9kZT17Q2FsbE1vZGUuR3JvdXB9XG4gICAgb3RoZXJNZW1iZXJzUnVuZz17W119XG4gICAgcmluZ2VyPXt7IGZpcnN0TmFtZTogJ1JpY2snLCB0aXRsZTogJ1JpY2sgU2FuY2hleicgfX1cbiAgLz5cbik7XG5cbkluY29taW5nR3JvdXBDYWxsT25seUNhbGxpbmdZb3Uuc3RvcnkgPSB7XG4gIG5hbWU6ICdJbmNvbWluZyBncm91cCBjYWxsIChvbmx5IGNhbGxpbmcgeW91KScsXG59O1xuXG5leHBvcnQgY29uc3QgSW5jb21pbmdHcm91cENhbGxDYWxsaW5nWW91QW5kMU90aGVyID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPEluY29taW5nQ2FsbEJhclxuICAgIHsuLi5jb21tb25Qcm9wc31cbiAgICBjb252ZXJzYXRpb249e2dyb3VwQ29udmVyc2F0aW9ufVxuICAgIGNhbGxNb2RlPXtDYWxsTW9kZS5Hcm91cH1cbiAgICBvdGhlck1lbWJlcnNSdW5nPXtbeyBmaXJzdE5hbWU6ICdNb3J0eScsIHRpdGxlOiAnTW9ydHkgU21pdGgnIH1dfVxuICAgIHJpbmdlcj17eyBmaXJzdE5hbWU6ICdSaWNrJywgdGl0bGU6ICdSaWNrIFNhbmNoZXonIH19XG4gIC8+XG4pO1xuXG5JbmNvbWluZ0dyb3VwQ2FsbENhbGxpbmdZb3VBbmQxT3RoZXIuc3RvcnkgPSB7XG4gIG5hbWU6ICdJbmNvbWluZyBncm91cCBjYWxsIChjYWxsaW5nIHlvdSBhbmQgMSBvdGhlciknLFxufTtcblxuZXhwb3J0IGNvbnN0IEluY29taW5nR3JvdXBDYWxsQ2FsbGluZ1lvdUFuZDJPdGhlcnMgPSAoKTogSlNYLkVsZW1lbnQgPT4gKFxuICA8SW5jb21pbmdDYWxsQmFyXG4gICAgey4uLmNvbW1vblByb3BzfVxuICAgIGNvbnZlcnNhdGlvbj17Z3JvdXBDb252ZXJzYXRpb259XG4gICAgY2FsbE1vZGU9e0NhbGxNb2RlLkdyb3VwfVxuICAgIG90aGVyTWVtYmVyc1J1bmc9e1tcbiAgICAgIHsgZmlyc3ROYW1lOiAnTW9ydHknLCB0aXRsZTogJ01vcnR5IFNtaXRoJyB9LFxuICAgICAgeyBmaXJzdE5hbWU6ICdTdW1tZXInLCB0aXRsZTogJ1N1bW1lciBTbWl0aCcgfSxcbiAgICBdfVxuICAgIHJpbmdlcj17eyBmaXJzdE5hbWU6ICdSaWNrJywgdGl0bGU6ICdSaWNrIFNhbmNoZXonIH19XG4gIC8+XG4pO1xuXG5JbmNvbWluZ0dyb3VwQ2FsbENhbGxpbmdZb3VBbmQyT3RoZXJzLnN0b3J5ID0ge1xuICBuYW1lOiAnSW5jb21pbmcgZ3JvdXAgY2FsbCAoY2FsbGluZyB5b3UgYW5kIDIgb3RoZXJzKScsXG59O1xuXG5leHBvcnQgY29uc3QgSW5jb21pbmdHcm91cENhbGxDYWxsaW5nWW91QW5kM090aGVycyA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxJbmNvbWluZ0NhbGxCYXJcbiAgICB7Li4uY29tbW9uUHJvcHN9XG4gICAgY29udmVyc2F0aW9uPXtncm91cENvbnZlcnNhdGlvbn1cbiAgICBjYWxsTW9kZT17Q2FsbE1vZGUuR3JvdXB9XG4gICAgb3RoZXJNZW1iZXJzUnVuZz17W1xuICAgICAgeyBmaXJzdE5hbWU6ICdNb3J0eScsIHRpdGxlOiAnTW9ydHkgU21pdGgnIH0sXG4gICAgICB7IGZpcnN0TmFtZTogJ1N1bW1lcicsIHRpdGxlOiAnU3VtbWVyIFNtaXRoJyB9LFxuICAgICAgeyBmaXJzdE5hbWU6ICdCZXRoJywgdGl0bGU6ICdCZXRoIFNtaXRoJyB9LFxuICAgIF19XG4gICAgcmluZ2VyPXt7IGZpcnN0TmFtZTogJ1JpY2snLCB0aXRsZTogJ1JpY2sgU2FuY2hleicgfX1cbiAgLz5cbik7XG5cbkluY29taW5nR3JvdXBDYWxsQ2FsbGluZ1lvdUFuZDNPdGhlcnMuc3RvcnkgPSB7XG4gIG5hbWU6ICdJbmNvbWluZyBncm91cCBjYWxsIChjYWxsaW5nIHlvdSBhbmQgMyBvdGhlcnMpJyxcbn07XG5cbmV4cG9ydCBjb25zdCBJbmNvbWluZ0dyb3VwQ2FsbENhbGxpbmdZb3VBbmQ0T3RoZXJzID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPEluY29taW5nQ2FsbEJhclxuICAgIHsuLi5jb21tb25Qcm9wc31cbiAgICBjb252ZXJzYXRpb249e2dyb3VwQ29udmVyc2F0aW9ufVxuICAgIGNhbGxNb2RlPXtDYWxsTW9kZS5Hcm91cH1cbiAgICBvdGhlck1lbWJlcnNSdW5nPXtbXG4gICAgICB7IGZpcnN0TmFtZTogJ01vcnR5JywgdGl0bGU6ICdNb3J0eSBTbWl0aCcgfSxcbiAgICAgIHsgZmlyc3ROYW1lOiAnU3VtbWVyJywgdGl0bGU6ICdTdW1tZXIgU21pdGgnIH0sXG4gICAgICB7IGZpcnN0TmFtZTogJ0JldGgnLCB0aXRsZTogJ0JldGggU2FuY2hleicgfSxcbiAgICAgIHsgZmlyc3ROYW1lOiAnSmVycnknLCB0aXRsZTogJ0JldGggU21pdGgnIH0sXG4gICAgXX1cbiAgICByaW5nZXI9e3sgZmlyc3ROYW1lOiAnUmljaycsIHRpdGxlOiAnUmljayBTYW5jaGV6JyB9fVxuICAvPlxuKTtcblxuSW5jb21pbmdHcm91cENhbGxDYWxsaW5nWW91QW5kNE90aGVycy5zdG9yeSA9IHtcbiAgbmFtZTogJ0luY29taW5nIGdyb3VwIGNhbGwgKGNhbGxpbmcgeW91IGFuZCA0IG90aGVycyknLFxufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLFlBQXVCO0FBQ3ZCLDJCQUF1QjtBQUV2Qiw2QkFBZ0M7QUFDaEMscUJBQXlCO0FBQ3pCLHVCQUEwQjtBQUMxQixzQkFBdUI7QUFDdkIsb0NBQXVDO0FBRXZDLE1BQU0sT0FBTyxnQ0FBVSxNQUFNLHVCQUFVO0FBRXZDLE1BQU0sY0FBYztBQUFBLEVBQ2xCLFlBQVksaUNBQU8sYUFBYTtBQUFBLEVBQ2hDLG9CQUFvQixpQ0FBTyxvQkFBb0I7QUFBQSxFQUMvQyxtQkFBbUIsaUNBQU8sbUJBQW1CO0FBQUEsRUFDN0MsTUFBTTtBQUFBLElBQ0osZ0JBQWdCO0FBQUEsSUFDaEIsUUFBUTtBQUFBLElBQ1IsWUFBWTtBQUFBLElBQ1osYUFBYTtBQUFBLEVBQ2Y7QUFBQSxFQUNBLGNBQWMsMERBQXVCO0FBQUEsSUFDbkMsSUFBSTtBQUFBLElBQ0osWUFBWTtBQUFBLElBQ1osTUFBTTtBQUFBLElBQ04sYUFBYTtBQUFBLElBQ2IsYUFBYTtBQUFBLElBQ2IsT0FBTztBQUFBLEVBQ1QsQ0FBQztBQUFBLEVBQ0QsYUFBYSxpQ0FBTyxjQUFjO0FBQUEsRUFDbEM7QUFBQSxFQUNBLGVBQWUsaUNBQU8saUJBQWlCO0FBQ3pDO0FBRUEsTUFBTSxxQkFBcUIsMERBQXVCO0FBQUEsRUFDaEQsSUFBSTtBQUFBLEVBQ0os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
