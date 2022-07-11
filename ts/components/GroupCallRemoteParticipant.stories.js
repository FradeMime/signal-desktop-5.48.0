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
var GroupCallRemoteParticipant_stories_exports = {};
__export(GroupCallRemoteParticipant_stories_exports, {
  Blocked: () => Blocked,
  Default: () => Default,
  IsInPip: () => IsInPip,
  Speaking: () => Speaking,
  default: () => GroupCallRemoteParticipant_stories_default
});
module.exports = __toCommonJS(GroupCallRemoteParticipant_stories_exports);
var React = __toESM(require("react"));
var import_lodash = require("lodash");
var import_addon_knobs = require("@storybook/addon-knobs");
var import_GroupCallRemoteParticipant = require("./GroupCallRemoteParticipant");
var import_getDefaultConversation = require("../test-both/helpers/getDefaultConversation");
var import_constants = require("../calling/constants");
var import_setupI18n = require("../util/setupI18n");
var import_messages = __toESM(require("../../_locales/en/messages.json"));
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
const getFrameBuffer = (0, import_lodash.memoize)(() => Buffer.alloc(import_constants.FRAME_BUFFER_SIZE));
const createProps = /* @__PURE__ */ __name((overrideProps, {
  isBlocked = false,
  hasRemoteAudio = false
} = {}) => ({
  getFrameBuffer,
  getGroupCallVideoFrameSource: import_lodash.noop,
  i18n,
  audioLevel: 0,
  remoteParticipant: {
    demuxId: 123,
    hasRemoteAudio,
    hasRemoteVideo: true,
    presenting: false,
    sharingScreen: false,
    videoAspectRatio: 1.3,
    ...(0, import_getDefaultConversation.getDefaultConversation)({
      isBlocked: Boolean(isBlocked),
      title: "Pablo Diego Jos\xE9 Francisco de Paula Juan Nepomuceno Mar\xEDa de los Remedios Cipriano de la Sant\xEDsima Trinidad Ruiz y Picasso",
      uuid: "992ed3b9-fc9b-47a9-bdb4-e0c7cbb0fda5"
    })
  },
  ...overrideProps
}), "createProps");
var GroupCallRemoteParticipant_stories_default = {
  title: "Components/GroupCallRemoteParticipant"
};
const Default = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_GroupCallRemoteParticipant.GroupCallRemoteParticipant, {
  ...createProps({
    isInPip: false,
    height: 120,
    left: 0,
    top: 0,
    width: 120
  })
}), "Default");
const Speaking = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_GroupCallRemoteParticipant.GroupCallRemoteParticipant, {
  ...createProps({
    isInPip: false,
    height: 120,
    left: 0,
    top: 0,
    width: 120,
    audioLevel: (0, import_addon_knobs.select)("audioLevel", [0, 0.5, 1], 0.5)
  }, { hasRemoteAudio: true })
}), "Speaking");
const IsInPip = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_GroupCallRemoteParticipant.GroupCallRemoteParticipant, {
  ...createProps({
    isInPip: true
  })
}), "IsInPip");
IsInPip.story = {
  name: "isInPip"
};
const Blocked = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_GroupCallRemoteParticipant.GroupCallRemoteParticipant, {
  ...createProps({
    isInPip: false,
    height: 120,
    left: 0,
    top: 0,
    width: 120
  }, { isBlocked: true })
}), "Blocked");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Blocked,
  Default,
  IsInPip,
  Speaking
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiR3JvdXBDYWxsUmVtb3RlUGFydGljaXBhbnQuc3Rvcmllcy50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIwLTIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBtZW1vaXplLCBub29wIH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IHNlbGVjdCB9IGZyb20gJ0BzdG9yeWJvb2svYWRkb24ta25vYnMnO1xuXG5pbXBvcnQgdHlwZSB7IFByb3BzVHlwZSB9IGZyb20gJy4vR3JvdXBDYWxsUmVtb3RlUGFydGljaXBhbnQnO1xuaW1wb3J0IHsgR3JvdXBDYWxsUmVtb3RlUGFydGljaXBhbnQgfSBmcm9tICcuL0dyb3VwQ2FsbFJlbW90ZVBhcnRpY2lwYW50JztcbmltcG9ydCB7IGdldERlZmF1bHRDb252ZXJzYXRpb24gfSBmcm9tICcuLi90ZXN0LWJvdGgvaGVscGVycy9nZXREZWZhdWx0Q29udmVyc2F0aW9uJztcbmltcG9ydCB7IEZSQU1FX0JVRkZFUl9TSVpFIH0gZnJvbSAnLi4vY2FsbGluZy9jb25zdGFudHMnO1xuaW1wb3J0IHsgc2V0dXBJMThuIH0gZnJvbSAnLi4vdXRpbC9zZXR1cEkxOG4nO1xuaW1wb3J0IGVuTWVzc2FnZXMgZnJvbSAnLi4vLi4vX2xvY2FsZXMvZW4vbWVzc2FnZXMuanNvbic7XG5cbmNvbnN0IGkxOG4gPSBzZXR1cEkxOG4oJ2VuJywgZW5NZXNzYWdlcyk7XG5cbnR5cGUgT3ZlcnJpZGVQcm9wc1R5cGUgPSB7XG4gIGF1ZGlvTGV2ZWw/OiBudW1iZXI7XG59ICYgKFxuICB8IHtcbiAgICAgIGlzSW5QaXA6IHRydWU7XG4gICAgfVxuICB8IHtcbiAgICAgIGlzSW5QaXA6IGZhbHNlO1xuICAgICAgaGVpZ2h0OiBudW1iZXI7XG4gICAgICBsZWZ0OiBudW1iZXI7XG4gICAgICB0b3A6IG51bWJlcjtcbiAgICAgIHdpZHRoOiBudW1iZXI7XG4gICAgfVxuKTtcblxuY29uc3QgZ2V0RnJhbWVCdWZmZXIgPSBtZW1vaXplKCgpID0+IEJ1ZmZlci5hbGxvYyhGUkFNRV9CVUZGRVJfU0laRSkpO1xuXG5jb25zdCBjcmVhdGVQcm9wcyA9IChcbiAgb3ZlcnJpZGVQcm9wczogT3ZlcnJpZGVQcm9wc1R5cGUsXG4gIHtcbiAgICBpc0Jsb2NrZWQgPSBmYWxzZSxcbiAgICBoYXNSZW1vdGVBdWRpbyA9IGZhbHNlLFxuICB9OiB7XG4gICAgaXNCbG9ja2VkPzogYm9vbGVhbjtcbiAgICBoYXNSZW1vdGVBdWRpbz86IGJvb2xlYW47XG4gIH0gPSB7fVxuKTogUHJvcHNUeXBlID0+ICh7XG4gIGdldEZyYW1lQnVmZmVyLFxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICBnZXRHcm91cENhbGxWaWRlb0ZyYW1lU291cmNlOiBub29wIGFzIGFueSxcbiAgaTE4bixcbiAgYXVkaW9MZXZlbDogMCxcbiAgcmVtb3RlUGFydGljaXBhbnQ6IHtcbiAgICBkZW11eElkOiAxMjMsXG4gICAgaGFzUmVtb3RlQXVkaW8sXG4gICAgaGFzUmVtb3RlVmlkZW86IHRydWUsXG4gICAgcHJlc2VudGluZzogZmFsc2UsXG4gICAgc2hhcmluZ1NjcmVlbjogZmFsc2UsXG4gICAgdmlkZW9Bc3BlY3RSYXRpbzogMS4zLFxuICAgIC4uLmdldERlZmF1bHRDb252ZXJzYXRpb24oe1xuICAgICAgaXNCbG9ja2VkOiBCb29sZWFuKGlzQmxvY2tlZCksXG4gICAgICB0aXRsZTpcbiAgICAgICAgJ1BhYmxvIERpZWdvIEpvc1x1MDBFOSBGcmFuY2lzY28gZGUgUGF1bGEgSnVhbiBOZXBvbXVjZW5vIE1hclx1MDBFRGEgZGUgbG9zIFJlbWVkaW9zIENpcHJpYW5vIGRlIGxhIFNhbnRcdTAwRURzaW1hIFRyaW5pZGFkIFJ1aXogeSBQaWNhc3NvJyxcbiAgICAgIHV1aWQ6ICc5OTJlZDNiOS1mYzliLTQ3YTktYmRiNC1lMGM3Y2JiMGZkYTUnLFxuICAgIH0pLFxuICB9LFxuICAuLi5vdmVycmlkZVByb3BzLFxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgdGl0bGU6ICdDb21wb25lbnRzL0dyb3VwQ2FsbFJlbW90ZVBhcnRpY2lwYW50Jyxcbn07XG5cbmV4cG9ydCBjb25zdCBEZWZhdWx0ID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPEdyb3VwQ2FsbFJlbW90ZVBhcnRpY2lwYW50XG4gICAgey4uLmNyZWF0ZVByb3BzKHtcbiAgICAgIGlzSW5QaXA6IGZhbHNlLFxuICAgICAgaGVpZ2h0OiAxMjAsXG4gICAgICBsZWZ0OiAwLFxuICAgICAgdG9wOiAwLFxuICAgICAgd2lkdGg6IDEyMCxcbiAgICB9KX1cbiAgLz5cbik7XG5cbmV4cG9ydCBjb25zdCBTcGVha2luZyA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxHcm91cENhbGxSZW1vdGVQYXJ0aWNpcGFudFxuICAgIHsuLi5jcmVhdGVQcm9wcyhcbiAgICAgIHtcbiAgICAgICAgaXNJblBpcDogZmFsc2UsXG4gICAgICAgIGhlaWdodDogMTIwLFxuICAgICAgICBsZWZ0OiAwLFxuICAgICAgICB0b3A6IDAsXG4gICAgICAgIHdpZHRoOiAxMjAsXG4gICAgICAgIGF1ZGlvTGV2ZWw6IHNlbGVjdCgnYXVkaW9MZXZlbCcsIFswLCAwLjUsIDFdLCAwLjUpLFxuICAgICAgfSxcbiAgICAgIHsgaGFzUmVtb3RlQXVkaW86IHRydWUgfVxuICAgICl9XG4gIC8+XG4pO1xuXG5leHBvcnQgY29uc3QgSXNJblBpcCA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxHcm91cENhbGxSZW1vdGVQYXJ0aWNpcGFudFxuICAgIHsuLi5jcmVhdGVQcm9wcyh7XG4gICAgICBpc0luUGlwOiB0cnVlLFxuICAgIH0pfVxuICAvPlxuKTtcblxuSXNJblBpcC5zdG9yeSA9IHtcbiAgbmFtZTogJ2lzSW5QaXAnLFxufTtcblxuZXhwb3J0IGNvbnN0IEJsb2NrZWQgPSAoKTogSlNYLkVsZW1lbnQgPT4gKFxuICA8R3JvdXBDYWxsUmVtb3RlUGFydGljaXBhbnRcbiAgICB7Li4uY3JlYXRlUHJvcHMoXG4gICAgICB7XG4gICAgICAgIGlzSW5QaXA6IGZhbHNlLFxuICAgICAgICBoZWlnaHQ6IDEyMCxcbiAgICAgICAgbGVmdDogMCxcbiAgICAgICAgdG9wOiAwLFxuICAgICAgICB3aWR0aDogMTIwLFxuICAgICAgfSxcbiAgICAgIHsgaXNCbG9ja2VkOiB0cnVlIH1cbiAgICApfVxuICAvPlxuKTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLFlBQXVCO0FBQ3ZCLG9CQUE4QjtBQUM5Qix5QkFBdUI7QUFHdkIsd0NBQTJDO0FBQzNDLG9DQUF1QztBQUN2Qyx1QkFBa0M7QUFDbEMsdUJBQTBCO0FBQzFCLHNCQUF1QjtBQUV2QixNQUFNLE9BQU8sZ0NBQVUsTUFBTSx1QkFBVTtBQWlCdkMsTUFBTSxpQkFBaUIsMkJBQVEsTUFBTSxPQUFPLE1BQU0sa0NBQWlCLENBQUM7QUFFcEUsTUFBTSxjQUFjLHdCQUNsQixlQUNBO0FBQUEsRUFDRSxZQUFZO0FBQUEsRUFDWixpQkFBaUI7QUFBQSxJQUlmLENBQUMsTUFDVTtBQUFBLEVBQ2Y7QUFBQSxFQUVBLDhCQUE4QjtBQUFBLEVBQzlCO0FBQUEsRUFDQSxZQUFZO0FBQUEsRUFDWixtQkFBbUI7QUFBQSxJQUNqQixTQUFTO0FBQUEsSUFDVDtBQUFBLElBQ0EsZ0JBQWdCO0FBQUEsSUFDaEIsWUFBWTtBQUFBLElBQ1osZUFBZTtBQUFBLElBQ2Ysa0JBQWtCO0FBQUEsT0FDZiwwREFBdUI7QUFBQSxNQUN4QixXQUFXLFFBQVEsU0FBUztBQUFBLE1BQzVCLE9BQ0U7QUFBQSxNQUNGLE1BQU07QUFBQSxJQUNSLENBQUM7QUFBQSxFQUNIO0FBQUEsS0FDRztBQUNMLElBOUJvQjtBQWdDcEIsSUFBTyw2Q0FBUTtBQUFBLEVBQ2IsT0FBTztBQUNUO0FBRU8sTUFBTSxVQUFVLDZCQUNyQixvQ0FBQztBQUFBLEtBQ0ssWUFBWTtBQUFBLElBQ2QsU0FBUztBQUFBLElBQ1QsUUFBUTtBQUFBLElBQ1IsTUFBTTtBQUFBLElBQ04sS0FBSztBQUFBLElBQ0wsT0FBTztBQUFBLEVBQ1QsQ0FBQztBQUFBLENBQ0gsR0FUcUI7QUFZaEIsTUFBTSxXQUFXLDZCQUN0QixvQ0FBQztBQUFBLEtBQ0ssWUFDRjtBQUFBLElBQ0UsU0FBUztBQUFBLElBQ1QsUUFBUTtBQUFBLElBQ1IsTUFBTTtBQUFBLElBQ04sS0FBSztBQUFBLElBQ0wsT0FBTztBQUFBLElBQ1AsWUFBWSwrQkFBTyxjQUFjLENBQUMsR0FBRyxLQUFLLENBQUMsR0FBRyxHQUFHO0FBQUEsRUFDbkQsR0FDQSxFQUFFLGdCQUFnQixLQUFLLENBQ3pCO0FBQUEsQ0FDRixHQWJzQjtBQWdCakIsTUFBTSxVQUFVLDZCQUNyQixvQ0FBQztBQUFBLEtBQ0ssWUFBWTtBQUFBLElBQ2QsU0FBUztBQUFBLEVBQ1gsQ0FBQztBQUFBLENBQ0gsR0FMcUI7QUFRdkIsUUFBUSxRQUFRO0FBQUEsRUFDZCxNQUFNO0FBQ1I7QUFFTyxNQUFNLFVBQVUsNkJBQ3JCLG9DQUFDO0FBQUEsS0FDSyxZQUNGO0FBQUEsSUFDRSxTQUFTO0FBQUEsSUFDVCxRQUFRO0FBQUEsSUFDUixNQUFNO0FBQUEsSUFDTixLQUFLO0FBQUEsSUFDTCxPQUFPO0FBQUEsRUFDVCxHQUNBLEVBQUUsV0FBVyxLQUFLLENBQ3BCO0FBQUEsQ0FDRixHQVpxQjsiLAogICJuYW1lcyI6IFtdCn0K
