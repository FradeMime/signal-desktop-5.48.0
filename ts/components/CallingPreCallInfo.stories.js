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
var CallingPreCallInfo_stories_exports = {};
__export(CallingPreCallInfo_stories_exports, {
  DirectConversation: () => DirectConversation,
  GroupConversationCallIsFull: () => GroupConversationCallIsFull,
  GroupConversationYouOnAnOtherDevice: () => GroupConversationYouOnAnOtherDevice,
  Notify0: () => Notify0,
  Notify1: () => Notify1,
  Notify2: () => Notify2,
  Notify3: () => Notify3,
  Notify4: () => Notify4,
  Peek1: () => Peek1,
  Peek2: () => Peek2,
  Peek3: () => Peek3,
  Peek4: () => Peek4,
  Ring0: () => Ring0,
  Ring1: () => Ring1,
  Ring2: () => Ring2,
  Ring3: () => Ring3,
  Ring4: () => Ring4,
  default: () => CallingPreCallInfo_stories_default
});
module.exports = __toCommonJS(CallingPreCallInfo_stories_exports);
var import_react = __toESM(require("react"));
var import_lodash = require("lodash");
var import_setupI18n = require("../util/setupI18n");
var import_messages = __toESM(require("../../_locales/en/messages.json"));
var import_getDefaultConversation = require("../test-both/helpers/getDefaultConversation");
var import_CallingPreCallInfo = require("./CallingPreCallInfo");
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
const getDefaultGroupConversation = /* @__PURE__ */ __name(() => (0, import_getDefaultConversation.getDefaultConversation)({
  name: "Tahoe Trip",
  phoneNumber: void 0,
  profileName: void 0,
  title: "Tahoe Trip",
  type: "group"
}), "getDefaultGroupConversation");
const otherMembers = (0, import_lodash.times)(6, () => (0, import_getDefaultConversation.getDefaultConversation)());
var CallingPreCallInfo_stories_default = {
  title: "Components/CallingPreCallInfo"
};
const DirectConversation = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_CallingPreCallInfo.CallingPreCallInfo, {
  conversation: (0, import_getDefaultConversation.getDefaultConversation)(),
  i18n,
  me: (0, import_getDefaultConversation.getDefaultConversation)(),
  ringMode: import_CallingPreCallInfo.RingMode.WillRing
}), "DirectConversation");
DirectConversation.story = {
  name: "Direct conversation"
};
const Ring0 = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_CallingPreCallInfo.CallingPreCallInfo, {
  conversation: getDefaultGroupConversation(),
  groupMembers: otherMembers.slice(0, 0),
  i18n,
  me: (0, import_getDefaultConversation.getDefaultConversation)(),
  peekedParticipants: [],
  ringMode: import_CallingPreCallInfo.RingMode.WillRing
}), "Ring0");
Ring0.story = {
  name: "Group call: Will ring 0 people"
};
const Ring1 = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_CallingPreCallInfo.CallingPreCallInfo, {
  conversation: getDefaultGroupConversation(),
  groupMembers: otherMembers.slice(0, 1),
  i18n,
  me: (0, import_getDefaultConversation.getDefaultConversation)(),
  peekedParticipants: [],
  ringMode: import_CallingPreCallInfo.RingMode.WillRing
}), "Ring1");
Ring1.story = {
  name: "Group call: Will ring 1 person"
};
const Ring2 = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_CallingPreCallInfo.CallingPreCallInfo, {
  conversation: getDefaultGroupConversation(),
  groupMembers: otherMembers.slice(0, 2),
  i18n,
  me: (0, import_getDefaultConversation.getDefaultConversation)(),
  peekedParticipants: [],
  ringMode: import_CallingPreCallInfo.RingMode.WillRing
}), "Ring2");
Ring2.story = {
  name: "Group call: Will ring 2 people"
};
const Ring3 = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_CallingPreCallInfo.CallingPreCallInfo, {
  conversation: getDefaultGroupConversation(),
  groupMembers: otherMembers.slice(0, 3),
  i18n,
  me: (0, import_getDefaultConversation.getDefaultConversation)(),
  peekedParticipants: [],
  ringMode: import_CallingPreCallInfo.RingMode.WillRing
}), "Ring3");
Ring3.story = {
  name: "Group call: Will ring 3 people"
};
const Ring4 = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_CallingPreCallInfo.CallingPreCallInfo, {
  conversation: getDefaultGroupConversation(),
  groupMembers: otherMembers.slice(0, 4),
  i18n,
  me: (0, import_getDefaultConversation.getDefaultConversation)(),
  peekedParticipants: [],
  ringMode: import_CallingPreCallInfo.RingMode.WillRing
}), "Ring4");
Ring3.story = {
  name: "Group call: Will ring 4 people"
};
const Notify0 = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_CallingPreCallInfo.CallingPreCallInfo, {
  conversation: getDefaultGroupConversation(),
  groupMembers: otherMembers.slice(0, 0),
  i18n,
  me: (0, import_getDefaultConversation.getDefaultConversation)(),
  peekedParticipants: [],
  ringMode: import_CallingPreCallInfo.RingMode.WillNotRing
}), "Notify0");
Notify0.story = {
  name: "Group call: Will notify 0 people"
};
const Notify1 = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_CallingPreCallInfo.CallingPreCallInfo, {
  conversation: getDefaultGroupConversation(),
  groupMembers: otherMembers.slice(0, 1),
  i18n,
  me: (0, import_getDefaultConversation.getDefaultConversation)(),
  peekedParticipants: [],
  ringMode: import_CallingPreCallInfo.RingMode.WillNotRing
}), "Notify1");
Notify1.story = {
  name: "Group call: Will notify 1 person"
};
const Notify2 = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_CallingPreCallInfo.CallingPreCallInfo, {
  conversation: getDefaultGroupConversation(),
  groupMembers: otherMembers.slice(0, 2),
  i18n,
  me: (0, import_getDefaultConversation.getDefaultConversation)(),
  peekedParticipants: [],
  ringMode: import_CallingPreCallInfo.RingMode.WillNotRing
}), "Notify2");
Notify2.story = {
  name: "Group call: Will notify 2 people"
};
const Notify3 = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_CallingPreCallInfo.CallingPreCallInfo, {
  conversation: getDefaultGroupConversation(),
  groupMembers: otherMembers.slice(0, 3),
  i18n,
  me: (0, import_getDefaultConversation.getDefaultConversation)(),
  peekedParticipants: [],
  ringMode: import_CallingPreCallInfo.RingMode.WillNotRing
}), "Notify3");
Notify3.story = {
  name: "Group call: Will notify 3 people"
};
const Notify4 = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_CallingPreCallInfo.CallingPreCallInfo, {
  conversation: getDefaultGroupConversation(),
  groupMembers: otherMembers.slice(0, 4),
  i18n,
  me: (0, import_getDefaultConversation.getDefaultConversation)(),
  peekedParticipants: [],
  ringMode: import_CallingPreCallInfo.RingMode.WillNotRing
}), "Notify4");
Notify4.story = {
  name: "Group call: Will notify 4 people"
};
const Peek1 = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_CallingPreCallInfo.CallingPreCallInfo, {
  conversation: getDefaultGroupConversation(),
  groupMembers: otherMembers,
  i18n,
  me: (0, import_getDefaultConversation.getDefaultConversation)(),
  peekedParticipants: otherMembers.slice(0, 1),
  ringMode: import_CallingPreCallInfo.RingMode.WillRing
}), "Peek1");
Peek1.story = {
  name: "Group call: 1 participant peeked"
};
const Peek2 = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_CallingPreCallInfo.CallingPreCallInfo, {
  conversation: getDefaultGroupConversation(),
  groupMembers: otherMembers,
  i18n,
  me: (0, import_getDefaultConversation.getDefaultConversation)(),
  peekedParticipants: otherMembers.slice(0, 2),
  ringMode: import_CallingPreCallInfo.RingMode.WillRing
}), "Peek2");
Peek2.story = {
  name: "Group call: 2 participants peeked"
};
const Peek3 = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_CallingPreCallInfo.CallingPreCallInfo, {
  conversation: getDefaultGroupConversation(),
  groupMembers: otherMembers,
  i18n,
  me: (0, import_getDefaultConversation.getDefaultConversation)(),
  peekedParticipants: otherMembers.slice(0, 3),
  ringMode: import_CallingPreCallInfo.RingMode.WillRing
}), "Peek3");
Peek3.story = {
  name: "Group call: 3 participants peeked"
};
const Peek4 = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_CallingPreCallInfo.CallingPreCallInfo, {
  conversation: getDefaultGroupConversation(),
  groupMembers: otherMembers,
  i18n,
  me: (0, import_getDefaultConversation.getDefaultConversation)(),
  peekedParticipants: otherMembers.slice(0, 4),
  ringMode: import_CallingPreCallInfo.RingMode.WillRing
}), "Peek4");
Peek4.story = {
  name: "Group call: 4 participants peeked"
};
const GroupConversationYouOnAnOtherDevice = /* @__PURE__ */ __name(() => {
  const me = (0, import_getDefaultConversation.getDefaultConversation)();
  return /* @__PURE__ */ import_react.default.createElement(import_CallingPreCallInfo.CallingPreCallInfo, {
    conversation: getDefaultGroupConversation(),
    groupMembers: otherMembers,
    i18n,
    me,
    peekedParticipants: [me],
    ringMode: import_CallingPreCallInfo.RingMode.WillRing
  });
}, "GroupConversationYouOnAnOtherDevice");
GroupConversationYouOnAnOtherDevice.story = {
  name: "Group conversation, you on an other device"
};
const GroupConversationCallIsFull = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_CallingPreCallInfo.CallingPreCallInfo, {
  conversation: getDefaultGroupConversation(),
  groupMembers: otherMembers,
  i18n,
  isCallFull: true,
  me: (0, import_getDefaultConversation.getDefaultConversation)(),
  peekedParticipants: otherMembers,
  ringMode: import_CallingPreCallInfo.RingMode.WillRing
}), "GroupConversationCallIsFull");
GroupConversationCallIsFull.story = {
  name: "Group conversation, call is full"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DirectConversation,
  GroupConversationCallIsFull,
  GroupConversationYouOnAnOtherDevice,
  Notify0,
  Notify1,
  Notify2,
  Notify3,
  Notify4,
  Peek1,
  Peek2,
  Peek3,
  Peek4,
  Ring0,
  Ring1,
  Ring2,
  Ring3,
  Ring4
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ2FsbGluZ1ByZUNhbGxJbmZvLnN0b3JpZXMudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB0aW1lcyB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBzZXR1cEkxOG4gfSBmcm9tICcuLi91dGlsL3NldHVwSTE4bic7XG5pbXBvcnQgZW5NZXNzYWdlcyBmcm9tICcuLi8uLi9fbG9jYWxlcy9lbi9tZXNzYWdlcy5qc29uJztcbmltcG9ydCB7IGdldERlZmF1bHRDb252ZXJzYXRpb24gfSBmcm9tICcuLi90ZXN0LWJvdGgvaGVscGVycy9nZXREZWZhdWx0Q29udmVyc2F0aW9uJztcblxuaW1wb3J0IHsgQ2FsbGluZ1ByZUNhbGxJbmZvLCBSaW5nTW9kZSB9IGZyb20gJy4vQ2FsbGluZ1ByZUNhbGxJbmZvJztcblxuY29uc3QgaTE4biA9IHNldHVwSTE4bignZW4nLCBlbk1lc3NhZ2VzKTtcbmNvbnN0IGdldERlZmF1bHRHcm91cENvbnZlcnNhdGlvbiA9ICgpID0+XG4gIGdldERlZmF1bHRDb252ZXJzYXRpb24oe1xuICAgIG5hbWU6ICdUYWhvZSBUcmlwJyxcbiAgICBwaG9uZU51bWJlcjogdW5kZWZpbmVkLFxuICAgIHByb2ZpbGVOYW1lOiB1bmRlZmluZWQsXG4gICAgdGl0bGU6ICdUYWhvZSBUcmlwJyxcbiAgICB0eXBlOiAnZ3JvdXAnLFxuICB9KTtcbmNvbnN0IG90aGVyTWVtYmVycyA9IHRpbWVzKDYsICgpID0+IGdldERlZmF1bHRDb252ZXJzYXRpb24oKSk7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgdGl0bGU6ICdDb21wb25lbnRzL0NhbGxpbmdQcmVDYWxsSW5mbycsXG59O1xuXG5leHBvcnQgY29uc3QgRGlyZWN0Q29udmVyc2F0aW9uID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPENhbGxpbmdQcmVDYWxsSW5mb1xuICAgIGNvbnZlcnNhdGlvbj17Z2V0RGVmYXVsdENvbnZlcnNhdGlvbigpfVxuICAgIGkxOG49e2kxOG59XG4gICAgbWU9e2dldERlZmF1bHRDb252ZXJzYXRpb24oKX1cbiAgICByaW5nTW9kZT17UmluZ01vZGUuV2lsbFJpbmd9XG4gIC8+XG4pO1xuXG5EaXJlY3RDb252ZXJzYXRpb24uc3RvcnkgPSB7XG4gIG5hbWU6ICdEaXJlY3QgY29udmVyc2F0aW9uJyxcbn07XG5cbmV4cG9ydCBjb25zdCBSaW5nMCA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxDYWxsaW5nUHJlQ2FsbEluZm9cbiAgICBjb252ZXJzYXRpb249e2dldERlZmF1bHRHcm91cENvbnZlcnNhdGlvbigpfVxuICAgIGdyb3VwTWVtYmVycz17b3RoZXJNZW1iZXJzLnNsaWNlKDAsIDApfVxuICAgIGkxOG49e2kxOG59XG4gICAgbWU9e2dldERlZmF1bHRDb252ZXJzYXRpb24oKX1cbiAgICBwZWVrZWRQYXJ0aWNpcGFudHM9e1tdfVxuICAgIHJpbmdNb2RlPXtSaW5nTW9kZS5XaWxsUmluZ31cbiAgLz5cbik7XG5cblJpbmcwLnN0b3J5ID0ge1xuICBuYW1lOiAnR3JvdXAgY2FsbDogV2lsbCByaW5nIDAgcGVvcGxlJyxcbn07XG5cbmV4cG9ydCBjb25zdCBSaW5nMSA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxDYWxsaW5nUHJlQ2FsbEluZm9cbiAgICBjb252ZXJzYXRpb249e2dldERlZmF1bHRHcm91cENvbnZlcnNhdGlvbigpfVxuICAgIGdyb3VwTWVtYmVycz17b3RoZXJNZW1iZXJzLnNsaWNlKDAsIDEpfVxuICAgIGkxOG49e2kxOG59XG4gICAgbWU9e2dldERlZmF1bHRDb252ZXJzYXRpb24oKX1cbiAgICBwZWVrZWRQYXJ0aWNpcGFudHM9e1tdfVxuICAgIHJpbmdNb2RlPXtSaW5nTW9kZS5XaWxsUmluZ31cbiAgLz5cbik7XG5cblJpbmcxLnN0b3J5ID0ge1xuICBuYW1lOiAnR3JvdXAgY2FsbDogV2lsbCByaW5nIDEgcGVyc29uJyxcbn07XG5cbmV4cG9ydCBjb25zdCBSaW5nMiA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxDYWxsaW5nUHJlQ2FsbEluZm9cbiAgICBjb252ZXJzYXRpb249e2dldERlZmF1bHRHcm91cENvbnZlcnNhdGlvbigpfVxuICAgIGdyb3VwTWVtYmVycz17b3RoZXJNZW1iZXJzLnNsaWNlKDAsIDIpfVxuICAgIGkxOG49e2kxOG59XG4gICAgbWU9e2dldERlZmF1bHRDb252ZXJzYXRpb24oKX1cbiAgICBwZWVrZWRQYXJ0aWNpcGFudHM9e1tdfVxuICAgIHJpbmdNb2RlPXtSaW5nTW9kZS5XaWxsUmluZ31cbiAgLz5cbik7XG5cblJpbmcyLnN0b3J5ID0ge1xuICBuYW1lOiAnR3JvdXAgY2FsbDogV2lsbCByaW5nIDIgcGVvcGxlJyxcbn07XG5cbmV4cG9ydCBjb25zdCBSaW5nMyA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxDYWxsaW5nUHJlQ2FsbEluZm9cbiAgICBjb252ZXJzYXRpb249e2dldERlZmF1bHRHcm91cENvbnZlcnNhdGlvbigpfVxuICAgIGdyb3VwTWVtYmVycz17b3RoZXJNZW1iZXJzLnNsaWNlKDAsIDMpfVxuICAgIGkxOG49e2kxOG59XG4gICAgbWU9e2dldERlZmF1bHRDb252ZXJzYXRpb24oKX1cbiAgICBwZWVrZWRQYXJ0aWNpcGFudHM9e1tdfVxuICAgIHJpbmdNb2RlPXtSaW5nTW9kZS5XaWxsUmluZ31cbiAgLz5cbik7XG5cblJpbmczLnN0b3J5ID0ge1xuICBuYW1lOiAnR3JvdXAgY2FsbDogV2lsbCByaW5nIDMgcGVvcGxlJyxcbn07XG5cbmV4cG9ydCBjb25zdCBSaW5nNCA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxDYWxsaW5nUHJlQ2FsbEluZm9cbiAgICBjb252ZXJzYXRpb249e2dldERlZmF1bHRHcm91cENvbnZlcnNhdGlvbigpfVxuICAgIGdyb3VwTWVtYmVycz17b3RoZXJNZW1iZXJzLnNsaWNlKDAsIDQpfVxuICAgIGkxOG49e2kxOG59XG4gICAgbWU9e2dldERlZmF1bHRDb252ZXJzYXRpb24oKX1cbiAgICBwZWVrZWRQYXJ0aWNpcGFudHM9e1tdfVxuICAgIHJpbmdNb2RlPXtSaW5nTW9kZS5XaWxsUmluZ31cbiAgLz5cbik7XG5cblJpbmczLnN0b3J5ID0ge1xuICBuYW1lOiAnR3JvdXAgY2FsbDogV2lsbCByaW5nIDQgcGVvcGxlJyxcbn07XG5cbmV4cG9ydCBjb25zdCBOb3RpZnkwID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPENhbGxpbmdQcmVDYWxsSW5mb1xuICAgIGNvbnZlcnNhdGlvbj17Z2V0RGVmYXVsdEdyb3VwQ29udmVyc2F0aW9uKCl9XG4gICAgZ3JvdXBNZW1iZXJzPXtvdGhlck1lbWJlcnMuc2xpY2UoMCwgMCl9XG4gICAgaTE4bj17aTE4bn1cbiAgICBtZT17Z2V0RGVmYXVsdENvbnZlcnNhdGlvbigpfVxuICAgIHBlZWtlZFBhcnRpY2lwYW50cz17W119XG4gICAgcmluZ01vZGU9e1JpbmdNb2RlLldpbGxOb3RSaW5nfVxuICAvPlxuKTtcblxuTm90aWZ5MC5zdG9yeSA9IHtcbiAgbmFtZTogJ0dyb3VwIGNhbGw6IFdpbGwgbm90aWZ5IDAgcGVvcGxlJyxcbn07XG5cbmV4cG9ydCBjb25zdCBOb3RpZnkxID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPENhbGxpbmdQcmVDYWxsSW5mb1xuICAgIGNvbnZlcnNhdGlvbj17Z2V0RGVmYXVsdEdyb3VwQ29udmVyc2F0aW9uKCl9XG4gICAgZ3JvdXBNZW1iZXJzPXtvdGhlck1lbWJlcnMuc2xpY2UoMCwgMSl9XG4gICAgaTE4bj17aTE4bn1cbiAgICBtZT17Z2V0RGVmYXVsdENvbnZlcnNhdGlvbigpfVxuICAgIHBlZWtlZFBhcnRpY2lwYW50cz17W119XG4gICAgcmluZ01vZGU9e1JpbmdNb2RlLldpbGxOb3RSaW5nfVxuICAvPlxuKTtcblxuTm90aWZ5MS5zdG9yeSA9IHtcbiAgbmFtZTogJ0dyb3VwIGNhbGw6IFdpbGwgbm90aWZ5IDEgcGVyc29uJyxcbn07XG5cbmV4cG9ydCBjb25zdCBOb3RpZnkyID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPENhbGxpbmdQcmVDYWxsSW5mb1xuICAgIGNvbnZlcnNhdGlvbj17Z2V0RGVmYXVsdEdyb3VwQ29udmVyc2F0aW9uKCl9XG4gICAgZ3JvdXBNZW1iZXJzPXtvdGhlck1lbWJlcnMuc2xpY2UoMCwgMil9XG4gICAgaTE4bj17aTE4bn1cbiAgICBtZT17Z2V0RGVmYXVsdENvbnZlcnNhdGlvbigpfVxuICAgIHBlZWtlZFBhcnRpY2lwYW50cz17W119XG4gICAgcmluZ01vZGU9e1JpbmdNb2RlLldpbGxOb3RSaW5nfVxuICAvPlxuKTtcblxuTm90aWZ5Mi5zdG9yeSA9IHtcbiAgbmFtZTogJ0dyb3VwIGNhbGw6IFdpbGwgbm90aWZ5IDIgcGVvcGxlJyxcbn07XG5cbmV4cG9ydCBjb25zdCBOb3RpZnkzID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPENhbGxpbmdQcmVDYWxsSW5mb1xuICAgIGNvbnZlcnNhdGlvbj17Z2V0RGVmYXVsdEdyb3VwQ29udmVyc2F0aW9uKCl9XG4gICAgZ3JvdXBNZW1iZXJzPXtvdGhlck1lbWJlcnMuc2xpY2UoMCwgMyl9XG4gICAgaTE4bj17aTE4bn1cbiAgICBtZT17Z2V0RGVmYXVsdENvbnZlcnNhdGlvbigpfVxuICAgIHBlZWtlZFBhcnRpY2lwYW50cz17W119XG4gICAgcmluZ01vZGU9e1JpbmdNb2RlLldpbGxOb3RSaW5nfVxuICAvPlxuKTtcblxuTm90aWZ5My5zdG9yeSA9IHtcbiAgbmFtZTogJ0dyb3VwIGNhbGw6IFdpbGwgbm90aWZ5IDMgcGVvcGxlJyxcbn07XG5cbmV4cG9ydCBjb25zdCBOb3RpZnk0ID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPENhbGxpbmdQcmVDYWxsSW5mb1xuICAgIGNvbnZlcnNhdGlvbj17Z2V0RGVmYXVsdEdyb3VwQ29udmVyc2F0aW9uKCl9XG4gICAgZ3JvdXBNZW1iZXJzPXtvdGhlck1lbWJlcnMuc2xpY2UoMCwgNCl9XG4gICAgaTE4bj17aTE4bn1cbiAgICBtZT17Z2V0RGVmYXVsdENvbnZlcnNhdGlvbigpfVxuICAgIHBlZWtlZFBhcnRpY2lwYW50cz17W119XG4gICAgcmluZ01vZGU9e1JpbmdNb2RlLldpbGxOb3RSaW5nfVxuICAvPlxuKTtcblxuTm90aWZ5NC5zdG9yeSA9IHtcbiAgbmFtZTogJ0dyb3VwIGNhbGw6IFdpbGwgbm90aWZ5IDQgcGVvcGxlJyxcbn07XG5cbmV4cG9ydCBjb25zdCBQZWVrMSA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxDYWxsaW5nUHJlQ2FsbEluZm9cbiAgICBjb252ZXJzYXRpb249e2dldERlZmF1bHRHcm91cENvbnZlcnNhdGlvbigpfVxuICAgIGdyb3VwTWVtYmVycz17b3RoZXJNZW1iZXJzfVxuICAgIGkxOG49e2kxOG59XG4gICAgbWU9e2dldERlZmF1bHRDb252ZXJzYXRpb24oKX1cbiAgICBwZWVrZWRQYXJ0aWNpcGFudHM9e290aGVyTWVtYmVycy5zbGljZSgwLCAxKX1cbiAgICByaW5nTW9kZT17UmluZ01vZGUuV2lsbFJpbmd9XG4gIC8+XG4pO1xuXG5QZWVrMS5zdG9yeSA9IHtcbiAgbmFtZTogJ0dyb3VwIGNhbGw6IDEgcGFydGljaXBhbnQgcGVla2VkJyxcbn07XG5cbmV4cG9ydCBjb25zdCBQZWVrMiA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxDYWxsaW5nUHJlQ2FsbEluZm9cbiAgICBjb252ZXJzYXRpb249e2dldERlZmF1bHRHcm91cENvbnZlcnNhdGlvbigpfVxuICAgIGdyb3VwTWVtYmVycz17b3RoZXJNZW1iZXJzfVxuICAgIGkxOG49e2kxOG59XG4gICAgbWU9e2dldERlZmF1bHRDb252ZXJzYXRpb24oKX1cbiAgICBwZWVrZWRQYXJ0aWNpcGFudHM9e290aGVyTWVtYmVycy5zbGljZSgwLCAyKX1cbiAgICByaW5nTW9kZT17UmluZ01vZGUuV2lsbFJpbmd9XG4gIC8+XG4pO1xuXG5QZWVrMi5zdG9yeSA9IHtcbiAgbmFtZTogJ0dyb3VwIGNhbGw6IDIgcGFydGljaXBhbnRzIHBlZWtlZCcsXG59O1xuXG5leHBvcnQgY29uc3QgUGVlazMgPSAoKTogSlNYLkVsZW1lbnQgPT4gKFxuICA8Q2FsbGluZ1ByZUNhbGxJbmZvXG4gICAgY29udmVyc2F0aW9uPXtnZXREZWZhdWx0R3JvdXBDb252ZXJzYXRpb24oKX1cbiAgICBncm91cE1lbWJlcnM9e290aGVyTWVtYmVyc31cbiAgICBpMThuPXtpMThufVxuICAgIG1lPXtnZXREZWZhdWx0Q29udmVyc2F0aW9uKCl9XG4gICAgcGVla2VkUGFydGljaXBhbnRzPXtvdGhlck1lbWJlcnMuc2xpY2UoMCwgMyl9XG4gICAgcmluZ01vZGU9e1JpbmdNb2RlLldpbGxSaW5nfVxuICAvPlxuKTtcblxuUGVlazMuc3RvcnkgPSB7XG4gIG5hbWU6ICdHcm91cCBjYWxsOiAzIHBhcnRpY2lwYW50cyBwZWVrZWQnLFxufTtcblxuZXhwb3J0IGNvbnN0IFBlZWs0ID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPENhbGxpbmdQcmVDYWxsSW5mb1xuICAgIGNvbnZlcnNhdGlvbj17Z2V0RGVmYXVsdEdyb3VwQ29udmVyc2F0aW9uKCl9XG4gICAgZ3JvdXBNZW1iZXJzPXtvdGhlck1lbWJlcnN9XG4gICAgaTE4bj17aTE4bn1cbiAgICBtZT17Z2V0RGVmYXVsdENvbnZlcnNhdGlvbigpfVxuICAgIHBlZWtlZFBhcnRpY2lwYW50cz17b3RoZXJNZW1iZXJzLnNsaWNlKDAsIDQpfVxuICAgIHJpbmdNb2RlPXtSaW5nTW9kZS5XaWxsUmluZ31cbiAgLz5cbik7XG5cblBlZWs0LnN0b3J5ID0ge1xuICBuYW1lOiAnR3JvdXAgY2FsbDogNCBwYXJ0aWNpcGFudHMgcGVla2VkJyxcbn07XG5cbmV4cG9ydCBjb25zdCBHcm91cENvbnZlcnNhdGlvbllvdU9uQW5PdGhlckRldmljZSA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IG1lID0gZ2V0RGVmYXVsdENvbnZlcnNhdGlvbigpO1xuICByZXR1cm4gKFxuICAgIDxDYWxsaW5nUHJlQ2FsbEluZm9cbiAgICAgIGNvbnZlcnNhdGlvbj17Z2V0RGVmYXVsdEdyb3VwQ29udmVyc2F0aW9uKCl9XG4gICAgICBncm91cE1lbWJlcnM9e290aGVyTWVtYmVyc31cbiAgICAgIGkxOG49e2kxOG59XG4gICAgICBtZT17bWV9XG4gICAgICBwZWVrZWRQYXJ0aWNpcGFudHM9e1ttZV19XG4gICAgICByaW5nTW9kZT17UmluZ01vZGUuV2lsbFJpbmd9XG4gICAgLz5cbiAgKTtcbn07XG5cbkdyb3VwQ29udmVyc2F0aW9uWW91T25Bbk90aGVyRGV2aWNlLnN0b3J5ID0ge1xuICBuYW1lOiAnR3JvdXAgY29udmVyc2F0aW9uLCB5b3Ugb24gYW4gb3RoZXIgZGV2aWNlJyxcbn07XG5cbmV4cG9ydCBjb25zdCBHcm91cENvbnZlcnNhdGlvbkNhbGxJc0Z1bGwgPSAoKTogSlNYLkVsZW1lbnQgPT4gKFxuICA8Q2FsbGluZ1ByZUNhbGxJbmZvXG4gICAgY29udmVyc2F0aW9uPXtnZXREZWZhdWx0R3JvdXBDb252ZXJzYXRpb24oKX1cbiAgICBncm91cE1lbWJlcnM9e290aGVyTWVtYmVyc31cbiAgICBpMThuPXtpMThufVxuICAgIGlzQ2FsbEZ1bGxcbiAgICBtZT17Z2V0RGVmYXVsdENvbnZlcnNhdGlvbigpfVxuICAgIHBlZWtlZFBhcnRpY2lwYW50cz17b3RoZXJNZW1iZXJzfVxuICAgIHJpbmdNb2RlPXtSaW5nTW9kZS5XaWxsUmluZ31cbiAgLz5cbik7XG5cbkdyb3VwQ29udmVyc2F0aW9uQ2FsbElzRnVsbC5zdG9yeSA9IHtcbiAgbmFtZTogJ0dyb3VwIGNvbnZlcnNhdGlvbiwgY2FsbCBpcyBmdWxsJyxcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtB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
