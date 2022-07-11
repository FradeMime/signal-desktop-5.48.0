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
var GroupCallOverflowArea_stories_exports = {};
__export(GroupCallOverflowArea_stories_exports, {
  ManyOverflowedParticipants: () => ManyOverflowedParticipants,
  NoOverflowedParticipants: () => NoOverflowedParticipants,
  OneOverflowedParticipant: () => OneOverflowedParticipant,
  ThreeOverflowedParticipants: () => ThreeOverflowedParticipants,
  default: () => GroupCallOverflowArea_stories_default
});
module.exports = __toCommonJS(GroupCallOverflowArea_stories_exports);
var import_react = __toESM(require("react"));
var import_lodash = require("lodash");
var import_addon_knobs = require("@storybook/addon-knobs");
var import_addon_actions = require("@storybook/addon-actions");
var import_GroupCallOverflowArea = require("./GroupCallOverflowArea");
var import_setupI18n = require("../util/setupI18n");
var import_getDefaultConversation = require("../test-both/helpers/getDefaultConversation");
var import_fakeGetGroupCallVideoFrameSource = require("../test-both/helpers/fakeGetGroupCallVideoFrameSource");
var import_constants = require("../calling/constants");
var import_messages = __toESM(require("../../_locales/en/messages.json"));
const MAX_PARTICIPANTS = 32;
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
const allRemoteParticipants = (0, import_lodash.times)(MAX_PARTICIPANTS).map((index) => ({
  demuxId: index,
  hasRemoteAudio: index % 3 !== 0,
  hasRemoteVideo: index % 4 !== 0,
  presenting: false,
  sharingScreen: false,
  videoAspectRatio: 1.3,
  ...(0, import_getDefaultConversation.getDefaultConversationWithUuid)({
    isBlocked: index === 10 || index === MAX_PARTICIPANTS - 1,
    title: `Participant ${index + 1}`
  })
}));
var GroupCallOverflowArea_stories_default = {
  title: "Components/GroupCallOverflowArea"
};
const defaultProps = {
  getFrameBuffer: (0, import_lodash.memoize)(() => Buffer.alloc(import_constants.FRAME_BUFFER_SIZE)),
  getGroupCallVideoFrameSource: import_fakeGetGroupCallVideoFrameSource.fakeGetGroupCallVideoFrameSource,
  i18n,
  onParticipantVisibilityChanged: (0, import_addon_actions.action)("onParticipantVisibilityChanged"),
  remoteAudioLevels: /* @__PURE__ */ new Map()
};
const Container = /* @__PURE__ */ __name(({ children }) => /* @__PURE__ */ import_react.default.createElement("div", {
  style: {
    background: "black",
    display: "inline-flex",
    height: "80vh"
  }
}, children), "Container");
const NoOverflowedParticipants = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(Container, null, /* @__PURE__ */ import_react.default.createElement(import_GroupCallOverflowArea.GroupCallOverflowArea, {
  ...defaultProps,
  overflowedParticipants: []
})), "NoOverflowedParticipants");
NoOverflowedParticipants.story = {
  name: "No overflowed participants"
};
const OneOverflowedParticipant = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(Container, null, /* @__PURE__ */ import_react.default.createElement(import_GroupCallOverflowArea.GroupCallOverflowArea, {
  ...defaultProps,
  overflowedParticipants: allRemoteParticipants.slice(0, 1)
})), "OneOverflowedParticipant");
OneOverflowedParticipant.story = {
  name: "One overflowed participant"
};
const ThreeOverflowedParticipants = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(Container, null, /* @__PURE__ */ import_react.default.createElement(import_GroupCallOverflowArea.GroupCallOverflowArea, {
  ...defaultProps,
  overflowedParticipants: allRemoteParticipants.slice(0, 3)
})), "ThreeOverflowedParticipants");
ThreeOverflowedParticipants.story = {
  name: "Three overflowed participants"
};
const ManyOverflowedParticipants = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(Container, null, /* @__PURE__ */ import_react.default.createElement(import_GroupCallOverflowArea.GroupCallOverflowArea, {
  ...defaultProps,
  overflowedParticipants: allRemoteParticipants.slice(0, (0, import_addon_knobs.number)("Participant count", MAX_PARTICIPANTS, {
    range: true,
    min: 0,
    max: MAX_PARTICIPANTS,
    step: 1
  }))
})), "ManyOverflowedParticipants");
ManyOverflowedParticipants.story = {
  name: "Many overflowed participants"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ManyOverflowedParticipants,
  NoOverflowedParticipants,
  OneOverflowedParticipant,
  ThreeOverflowedParticipants
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiR3JvdXBDYWxsT3ZlcmZsb3dBcmVhLnN0b3JpZXMudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMS0yMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHR5cGUgeyBGQyB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBtZW1vaXplLCB0aW1lcyB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBudW1iZXIgfSBmcm9tICdAc3Rvcnlib29rL2FkZG9uLWtub2JzJztcbmltcG9ydCB7IGFjdGlvbiB9IGZyb20gJ0BzdG9yeWJvb2svYWRkb24tYWN0aW9ucyc7XG5cbmltcG9ydCB7IEdyb3VwQ2FsbE92ZXJmbG93QXJlYSB9IGZyb20gJy4vR3JvdXBDYWxsT3ZlcmZsb3dBcmVhJztcbmltcG9ydCB7IHNldHVwSTE4biB9IGZyb20gJy4uL3V0aWwvc2V0dXBJMThuJztcbmltcG9ydCB7IGdldERlZmF1bHRDb252ZXJzYXRpb25XaXRoVXVpZCB9IGZyb20gJy4uL3Rlc3QtYm90aC9oZWxwZXJzL2dldERlZmF1bHRDb252ZXJzYXRpb24nO1xuaW1wb3J0IHsgZmFrZUdldEdyb3VwQ2FsbFZpZGVvRnJhbWVTb3VyY2UgfSBmcm9tICcuLi90ZXN0LWJvdGgvaGVscGVycy9mYWtlR2V0R3JvdXBDYWxsVmlkZW9GcmFtZVNvdXJjZSc7XG5pbXBvcnQgeyBGUkFNRV9CVUZGRVJfU0laRSB9IGZyb20gJy4uL2NhbGxpbmcvY29uc3RhbnRzJztcbmltcG9ydCBlbk1lc3NhZ2VzIGZyb20gJy4uLy4uL19sb2NhbGVzL2VuL21lc3NhZ2VzLmpzb24nO1xuXG5jb25zdCBNQVhfUEFSVElDSVBBTlRTID0gMzI7XG5cbmNvbnN0IGkxOG4gPSBzZXR1cEkxOG4oJ2VuJywgZW5NZXNzYWdlcyk7XG5cbmNvbnN0IGFsbFJlbW90ZVBhcnRpY2lwYW50cyA9IHRpbWVzKE1BWF9QQVJUSUNJUEFOVFMpLm1hcChpbmRleCA9PiAoe1xuICBkZW11eElkOiBpbmRleCxcbiAgaGFzUmVtb3RlQXVkaW86IGluZGV4ICUgMyAhPT0gMCxcbiAgaGFzUmVtb3RlVmlkZW86IGluZGV4ICUgNCAhPT0gMCxcbiAgcHJlc2VudGluZzogZmFsc2UsXG4gIHNoYXJpbmdTY3JlZW46IGZhbHNlLFxuICB2aWRlb0FzcGVjdFJhdGlvOiAxLjMsXG4gIC4uLmdldERlZmF1bHRDb252ZXJzYXRpb25XaXRoVXVpZCh7XG4gICAgaXNCbG9ja2VkOiBpbmRleCA9PT0gMTAgfHwgaW5kZXggPT09IE1BWF9QQVJUSUNJUEFOVFMgLSAxLFxuICAgIHRpdGxlOiBgUGFydGljaXBhbnQgJHtpbmRleCArIDF9YCxcbiAgfSksXG59KSk7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgdGl0bGU6ICdDb21wb25lbnRzL0dyb3VwQ2FsbE92ZXJmbG93QXJlYScsXG59O1xuXG5jb25zdCBkZWZhdWx0UHJvcHMgPSB7XG4gIGdldEZyYW1lQnVmZmVyOiBtZW1vaXplKCgpID0+IEJ1ZmZlci5hbGxvYyhGUkFNRV9CVUZGRVJfU0laRSkpLFxuICBnZXRHcm91cENhbGxWaWRlb0ZyYW1lU291cmNlOiBmYWtlR2V0R3JvdXBDYWxsVmlkZW9GcmFtZVNvdXJjZSxcbiAgaTE4bixcbiAgb25QYXJ0aWNpcGFudFZpc2liaWxpdHlDaGFuZ2VkOiBhY3Rpb24oJ29uUGFydGljaXBhbnRWaXNpYmlsaXR5Q2hhbmdlZCcpLFxuICByZW1vdGVBdWRpb0xldmVsczogbmV3IE1hcDxudW1iZXIsIG51bWJlcj4oKSxcbn07XG5cbi8vIFRoaXMgY29tcG9uZW50IGlzIHVzdWFsbHkgcmVuZGVyZWQgb24gYSBjYWxsIHNjcmVlbi5cbmNvbnN0IENvbnRhaW5lcjogRkMgPSAoeyBjaGlsZHJlbiB9KSA9PiAoXG4gIDxkaXZcbiAgICBzdHlsZT17e1xuICAgICAgYmFja2dyb3VuZDogJ2JsYWNrJyxcbiAgICAgIGRpc3BsYXk6ICdpbmxpbmUtZmxleCcsXG4gICAgICBoZWlnaHQ6ICc4MHZoJyxcbiAgICB9fVxuICA+XG4gICAge2NoaWxkcmVufVxuICA8L2Rpdj5cbik7XG5cbmV4cG9ydCBjb25zdCBOb092ZXJmbG93ZWRQYXJ0aWNpcGFudHMgPSAoKTogSlNYLkVsZW1lbnQgPT4gKFxuICA8Q29udGFpbmVyPlxuICAgIDxHcm91cENhbGxPdmVyZmxvd0FyZWEgey4uLmRlZmF1bHRQcm9wc30gb3ZlcmZsb3dlZFBhcnRpY2lwYW50cz17W119IC8+XG4gIDwvQ29udGFpbmVyPlxuKTtcblxuTm9PdmVyZmxvd2VkUGFydGljaXBhbnRzLnN0b3J5ID0ge1xuICBuYW1lOiAnTm8gb3ZlcmZsb3dlZCBwYXJ0aWNpcGFudHMnLFxufTtcblxuZXhwb3J0IGNvbnN0IE9uZU92ZXJmbG93ZWRQYXJ0aWNpcGFudCA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxDb250YWluZXI+XG4gICAgPEdyb3VwQ2FsbE92ZXJmbG93QXJlYVxuICAgICAgey4uLmRlZmF1bHRQcm9wc31cbiAgICAgIG92ZXJmbG93ZWRQYXJ0aWNpcGFudHM9e2FsbFJlbW90ZVBhcnRpY2lwYW50cy5zbGljZSgwLCAxKX1cbiAgICAvPlxuICA8L0NvbnRhaW5lcj5cbik7XG5cbk9uZU92ZXJmbG93ZWRQYXJ0aWNpcGFudC5zdG9yeSA9IHtcbiAgbmFtZTogJ09uZSBvdmVyZmxvd2VkIHBhcnRpY2lwYW50Jyxcbn07XG5cbmV4cG9ydCBjb25zdCBUaHJlZU92ZXJmbG93ZWRQYXJ0aWNpcGFudHMgPSAoKTogSlNYLkVsZW1lbnQgPT4gKFxuICA8Q29udGFpbmVyPlxuICAgIDxHcm91cENhbGxPdmVyZmxvd0FyZWFcbiAgICAgIHsuLi5kZWZhdWx0UHJvcHN9XG4gICAgICBvdmVyZmxvd2VkUGFydGljaXBhbnRzPXthbGxSZW1vdGVQYXJ0aWNpcGFudHMuc2xpY2UoMCwgMyl9XG4gICAgLz5cbiAgPC9Db250YWluZXI+XG4pO1xuXG5UaHJlZU92ZXJmbG93ZWRQYXJ0aWNpcGFudHMuc3RvcnkgPSB7XG4gIG5hbWU6ICdUaHJlZSBvdmVyZmxvd2VkIHBhcnRpY2lwYW50cycsXG59O1xuXG5leHBvcnQgY29uc3QgTWFueU92ZXJmbG93ZWRQYXJ0aWNpcGFudHMgPSAoKTogSlNYLkVsZW1lbnQgPT4gKFxuICA8Q29udGFpbmVyPlxuICAgIDxHcm91cENhbGxPdmVyZmxvd0FyZWFcbiAgICAgIHsuLi5kZWZhdWx0UHJvcHN9XG4gICAgICBvdmVyZmxvd2VkUGFydGljaXBhbnRzPXthbGxSZW1vdGVQYXJ0aWNpcGFudHMuc2xpY2UoXG4gICAgICAgIDAsXG4gICAgICAgIG51bWJlcignUGFydGljaXBhbnQgY291bnQnLCBNQVhfUEFSVElDSVBBTlRTLCB7XG4gICAgICAgICAgcmFuZ2U6IHRydWUsXG4gICAgICAgICAgbWluOiAwLFxuICAgICAgICAgIG1heDogTUFYX1BBUlRJQ0lQQU5UUyxcbiAgICAgICAgICBzdGVwOiAxLFxuICAgICAgICB9KVxuICAgICAgKX1cbiAgICAvPlxuICA8L0NvbnRhaW5lcj5cbik7XG5cbk1hbnlPdmVyZmxvd2VkUGFydGljaXBhbnRzLnN0b3J5ID0ge1xuICBuYW1lOiAnTWFueSBvdmVyZmxvd2VkIHBhcnRpY2lwYW50cycsXG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSUEsbUJBQWtCO0FBQ2xCLG9CQUErQjtBQUMvQix5QkFBdUI7QUFDdkIsMkJBQXVCO0FBRXZCLG1DQUFzQztBQUN0Qyx1QkFBMEI7QUFDMUIsb0NBQStDO0FBQy9DLDhDQUFpRDtBQUNqRCx1QkFBa0M7QUFDbEMsc0JBQXVCO0FBRXZCLE1BQU0sbUJBQW1CO0FBRXpCLE1BQU0sT0FBTyxnQ0FBVSxNQUFNLHVCQUFVO0FBRXZDLE1BQU0sd0JBQXdCLHlCQUFNLGdCQUFnQixFQUFFLElBQUksV0FBVTtBQUFBLEVBQ2xFLFNBQVM7QUFBQSxFQUNULGdCQUFnQixRQUFRLE1BQU07QUFBQSxFQUM5QixnQkFBZ0IsUUFBUSxNQUFNO0FBQUEsRUFDOUIsWUFBWTtBQUFBLEVBQ1osZUFBZTtBQUFBLEVBQ2Ysa0JBQWtCO0FBQUEsS0FDZixrRUFBK0I7QUFBQSxJQUNoQyxXQUFXLFVBQVUsTUFBTSxVQUFVLG1CQUFtQjtBQUFBLElBQ3hELE9BQU8sZUFBZSxRQUFRO0FBQUEsRUFDaEMsQ0FBQztBQUNILEVBQUU7QUFFRixJQUFPLHdDQUFRO0FBQUEsRUFDYixPQUFPO0FBQ1Q7QUFFQSxNQUFNLGVBQWU7QUFBQSxFQUNuQixnQkFBZ0IsMkJBQVEsTUFBTSxPQUFPLE1BQU0sa0NBQWlCLENBQUM7QUFBQSxFQUM3RCw4QkFBOEI7QUFBQSxFQUM5QjtBQUFBLEVBQ0EsZ0NBQWdDLGlDQUFPLGdDQUFnQztBQUFBLEVBQ3ZFLG1CQUFtQixvQkFBSSxJQUFvQjtBQUM3QztBQUdBLE1BQU0sWUFBZ0Isd0JBQUMsRUFBRSxlQUN2QixtREFBQztBQUFBLEVBQ0MsT0FBTztBQUFBLElBQ0wsWUFBWTtBQUFBLElBQ1osU0FBUztBQUFBLElBQ1QsUUFBUTtBQUFBLEVBQ1Y7QUFBQSxHQUVDLFFBQ0gsR0FUb0I7QUFZZixNQUFNLDJCQUEyQiw2QkFDdEMsbURBQUMsaUJBQ0MsbURBQUM7QUFBQSxLQUEwQjtBQUFBLEVBQWMsd0JBQXdCLENBQUM7QUFBQSxDQUFHLENBQ3ZFLEdBSHNDO0FBTXhDLHlCQUF5QixRQUFRO0FBQUEsRUFDL0IsTUFBTTtBQUNSO0FBRU8sTUFBTSwyQkFBMkIsNkJBQ3RDLG1EQUFDLGlCQUNDLG1EQUFDO0FBQUEsS0FDSztBQUFBLEVBQ0osd0JBQXdCLHNCQUFzQixNQUFNLEdBQUcsQ0FBQztBQUFBLENBQzFELENBQ0YsR0FOc0M7QUFTeEMseUJBQXlCLFFBQVE7QUFBQSxFQUMvQixNQUFNO0FBQ1I7QUFFTyxNQUFNLDhCQUE4Qiw2QkFDekMsbURBQUMsaUJBQ0MsbURBQUM7QUFBQSxLQUNLO0FBQUEsRUFDSix3QkFBd0Isc0JBQXNCLE1BQU0sR0FBRyxDQUFDO0FBQUEsQ0FDMUQsQ0FDRixHQU55QztBQVMzQyw0QkFBNEIsUUFBUTtBQUFBLEVBQ2xDLE1BQU07QUFDUjtBQUVPLE1BQU0sNkJBQTZCLDZCQUN4QyxtREFBQyxpQkFDQyxtREFBQztBQUFBLEtBQ0s7QUFBQSxFQUNKLHdCQUF3QixzQkFBc0IsTUFDNUMsR0FDQSwrQkFBTyxxQkFBcUIsa0JBQWtCO0FBQUEsSUFDNUMsT0FBTztBQUFBLElBQ1AsS0FBSztBQUFBLElBQ0wsS0FBSztBQUFBLElBQ0wsTUFBTTtBQUFBLEVBQ1IsQ0FBQyxDQUNIO0FBQUEsQ0FDRixDQUNGLEdBZHdDO0FBaUIxQywyQkFBMkIsUUFBUTtBQUFBLEVBQ2pDLE1BQU07QUFDUjsiLAogICJuYW1lcyI6IFtdCn0K
