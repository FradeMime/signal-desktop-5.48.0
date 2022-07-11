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
var CallingPipRemoteVideo_exports = {};
__export(CallingPipRemoteVideo_exports, {
  CallingPipRemoteVideo: () => CallingPipRemoteVideo
});
module.exports = __toCommonJS(CallingPipRemoteVideo_exports);
var import_react = __toESM(require("react"));
var import_lodash = require("lodash");
var import_Avatar = require("./Avatar");
var import_CallBackgroundBlur = require("./CallBackgroundBlur");
var import_DirectCallRemoteParticipant = require("./DirectCallRemoteParticipant");
var import_GroupCallRemoteParticipant = require("./GroupCallRemoteParticipant");
var import_Calling = require("../types/Calling");
var import_Colors = require("../types/Colors");
var import_useGetCallingFrameBuffer = require("../calling/useGetCallingFrameBuffer");
var import_constants = require("../calling/constants");
var import_usePageVisibility = require("../hooks/usePageVisibility");
var import_missingCaseError = require("../util/missingCaseError");
var import_nonRenderedRemoteParticipant = require("../util/ringrtc/nonRenderedRemoteParticipant");
const PIP_VIDEO_HEIGHT_PX = 120;
const NoVideo = /* @__PURE__ */ __name(({
  activeCall,
  i18n
}) => {
  const {
    acceptedMessageRequest,
    avatarPath,
    color,
    isMe,
    name,
    phoneNumber,
    profileName,
    sharedGroupNames,
    title
  } = activeCall.conversation;
  return /* @__PURE__ */ import_react.default.createElement("div", {
    className: "module-calling-pip__video--remote"
  }, /* @__PURE__ */ import_react.default.createElement(import_CallBackgroundBlur.CallBackgroundBlur, {
    avatarPath,
    color
  }, /* @__PURE__ */ import_react.default.createElement("div", {
    className: "module-calling-pip__video--avatar"
  }, /* @__PURE__ */ import_react.default.createElement(import_Avatar.Avatar, {
    acceptedMessageRequest,
    avatarPath,
    badge: void 0,
    color: color || import_Colors.AvatarColors[0],
    noteToSelf: false,
    conversationType: "direct",
    i18n,
    isMe,
    name,
    phoneNumber,
    profileName,
    title,
    size: 52,
    sharedGroupNames
  }))));
}, "NoVideo");
const CallingPipRemoteVideo = /* @__PURE__ */ __name(({
  activeCall,
  getGroupCallVideoFrameSource,
  i18n,
  setGroupCallVideoRequest,
  setRendererCanvas
}) => {
  const { conversation } = activeCall;
  const getGroupCallFrameBuffer = (0, import_useGetCallingFrameBuffer.useGetCallingFrameBuffer)();
  const isPageVisible = (0, import_usePageVisibility.usePageVisibility)();
  const activeGroupCallSpeaker = (0, import_react.useMemo)(() => {
    if (activeCall.callMode !== import_Calling.CallMode.Group) {
      return void 0;
    }
    return (0, import_lodash.maxBy)(activeCall.remoteParticipants, (participant) => participant.presenting ? Infinity : participant.speakerTime || -Infinity);
  }, [activeCall.callMode, activeCall.remoteParticipants]);
  (0, import_react.useEffect)(() => {
    if (activeCall.callMode !== import_Calling.CallMode.Group) {
      return;
    }
    if (isPageVisible) {
      setGroupCallVideoRequest(activeCall.remoteParticipants.map((participant) => {
        if (participant === activeGroupCallSpeaker) {
          return {
            demuxId: participant.demuxId,
            width: (0, import_lodash.clamp)(Math.floor(PIP_VIDEO_HEIGHT_PX * participant.videoAspectRatio), 1, import_constants.MAX_FRAME_WIDTH),
            height: PIP_VIDEO_HEIGHT_PX
          };
        }
        return (0, import_nonRenderedRemoteParticipant.nonRenderedRemoteParticipant)(participant);
      }));
    } else {
      setGroupCallVideoRequest(activeCall.remoteParticipants.map(import_nonRenderedRemoteParticipant.nonRenderedRemoteParticipant));
    }
  }, [
    activeCall.callMode,
    activeCall.remoteParticipants,
    activeGroupCallSpeaker,
    isPageVisible,
    setGroupCallVideoRequest
  ]);
  switch (activeCall.callMode) {
    case import_Calling.CallMode.Direct: {
      const { hasRemoteVideo } = activeCall.remoteParticipants[0];
      if (!hasRemoteVideo) {
        return /* @__PURE__ */ import_react.default.createElement(NoVideo, {
          activeCall,
          i18n
        });
      }
      return /* @__PURE__ */ import_react.default.createElement("div", {
        className: "module-calling-pip__video--remote"
      }, /* @__PURE__ */ import_react.default.createElement(import_DirectCallRemoteParticipant.DirectCallRemoteParticipant, {
        conversation,
        hasRemoteVideo,
        i18n,
        setRendererCanvas
      }));
    }
    case import_Calling.CallMode.Group:
      if (!activeGroupCallSpeaker) {
        return /* @__PURE__ */ import_react.default.createElement(NoVideo, {
          activeCall,
          i18n
        });
      }
      return /* @__PURE__ */ import_react.default.createElement("div", {
        className: "module-calling-pip__video--remote"
      }, /* @__PURE__ */ import_react.default.createElement(import_GroupCallRemoteParticipant.GroupCallRemoteParticipant, {
        getFrameBuffer: getGroupCallFrameBuffer,
        getGroupCallVideoFrameSource,
        i18n,
        isInPip: true,
        remoteParticipant: activeGroupCallSpeaker
      }));
    default:
      throw (0, import_missingCaseError.missingCaseError)(activeCall);
  }
}, "CallingPipRemoteVideo");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CallingPipRemoteVideo
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ2FsbGluZ1BpcFJlbW90ZVZpZGVvLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjAtMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCBSZWFjdCwgeyB1c2VNZW1vLCB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjbGFtcCwgbWF4QnkgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHR5cGUgeyBWaWRlb0ZyYW1lU291cmNlIH0gZnJvbSAncmluZ3J0Yyc7XG5pbXBvcnQgeyBBdmF0YXIgfSBmcm9tICcuL0F2YXRhcic7XG5pbXBvcnQgeyBDYWxsQmFja2dyb3VuZEJsdXIgfSBmcm9tICcuL0NhbGxCYWNrZ3JvdW5kQmx1cic7XG5pbXBvcnQgeyBEaXJlY3RDYWxsUmVtb3RlUGFydGljaXBhbnQgfSBmcm9tICcuL0RpcmVjdENhbGxSZW1vdGVQYXJ0aWNpcGFudCc7XG5pbXBvcnQgeyBHcm91cENhbGxSZW1vdGVQYXJ0aWNpcGFudCB9IGZyb20gJy4vR3JvdXBDYWxsUmVtb3RlUGFydGljaXBhbnQnO1xuaW1wb3J0IHR5cGUgeyBMb2NhbGl6ZXJUeXBlIH0gZnJvbSAnLi4vdHlwZXMvVXRpbCc7XG5pbXBvcnQgdHlwZSB7XG4gIEFjdGl2ZUNhbGxUeXBlLFxuICBHcm91cENhbGxSZW1vdGVQYXJ0aWNpcGFudFR5cGUsXG4gIEdyb3VwQ2FsbFZpZGVvUmVxdWVzdCxcbn0gZnJvbSAnLi4vdHlwZXMvQ2FsbGluZyc7XG5pbXBvcnQgeyBDYWxsTW9kZSB9IGZyb20gJy4uL3R5cGVzL0NhbGxpbmcnO1xuaW1wb3J0IHsgQXZhdGFyQ29sb3JzIH0gZnJvbSAnLi4vdHlwZXMvQ29sb3JzJztcbmltcG9ydCB0eXBlIHsgU2V0UmVuZGVyZXJDYW52YXNUeXBlIH0gZnJvbSAnLi4vc3RhdGUvZHVja3MvY2FsbGluZyc7XG5pbXBvcnQgeyB1c2VHZXRDYWxsaW5nRnJhbWVCdWZmZXIgfSBmcm9tICcuLi9jYWxsaW5nL3VzZUdldENhbGxpbmdGcmFtZUJ1ZmZlcic7XG5pbXBvcnQgeyBNQVhfRlJBTUVfV0lEVEggfSBmcm9tICcuLi9jYWxsaW5nL2NvbnN0YW50cyc7XG5pbXBvcnQgeyB1c2VQYWdlVmlzaWJpbGl0eSB9IGZyb20gJy4uL2hvb2tzL3VzZVBhZ2VWaXNpYmlsaXR5JztcbmltcG9ydCB7IG1pc3NpbmdDYXNlRXJyb3IgfSBmcm9tICcuLi91dGlsL21pc3NpbmdDYXNlRXJyb3InO1xuaW1wb3J0IHsgbm9uUmVuZGVyZWRSZW1vdGVQYXJ0aWNpcGFudCB9IGZyb20gJy4uL3V0aWwvcmluZ3J0Yy9ub25SZW5kZXJlZFJlbW90ZVBhcnRpY2lwYW50JztcblxuLy8gVGhpcyB2YWx1ZSBzaG91bGQgYmUga2VwdCBpbiBzeW5jIHdpdGggdGhlIGhhcmQtY29kZWQgQ1NTIGhlaWdodC4gSXQgc2hvdWxkIGFsc28gYmVcbi8vICAgbGVzcyB0aGFuIGBNQVhfRlJBTUVfSEVJR0hUYC5cbmNvbnN0IFBJUF9WSURFT19IRUlHSFRfUFggPSAxMjA7XG5cbmNvbnN0IE5vVmlkZW8gPSAoe1xuICBhY3RpdmVDYWxsLFxuICBpMThuLFxufToge1xuICBhY3RpdmVDYWxsOiBBY3RpdmVDYWxsVHlwZTtcbiAgaTE4bjogTG9jYWxpemVyVHlwZTtcbn0pOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IHtcbiAgICBhY2NlcHRlZE1lc3NhZ2VSZXF1ZXN0LFxuICAgIGF2YXRhclBhdGgsXG4gICAgY29sb3IsXG4gICAgaXNNZSxcbiAgICBuYW1lLFxuICAgIHBob25lTnVtYmVyLFxuICAgIHByb2ZpbGVOYW1lLFxuICAgIHNoYXJlZEdyb3VwTmFtZXMsXG4gICAgdGl0bGUsXG4gIH0gPSBhY3RpdmVDYWxsLmNvbnZlcnNhdGlvbjtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kdWxlLWNhbGxpbmctcGlwX192aWRlby0tcmVtb3RlXCI+XG4gICAgICA8Q2FsbEJhY2tncm91bmRCbHVyIGF2YXRhclBhdGg9e2F2YXRhclBhdGh9IGNvbG9yPXtjb2xvcn0+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kdWxlLWNhbGxpbmctcGlwX192aWRlby0tYXZhdGFyXCI+XG4gICAgICAgICAgPEF2YXRhclxuICAgICAgICAgICAgYWNjZXB0ZWRNZXNzYWdlUmVxdWVzdD17YWNjZXB0ZWRNZXNzYWdlUmVxdWVzdH1cbiAgICAgICAgICAgIGF2YXRhclBhdGg9e2F2YXRhclBhdGh9XG4gICAgICAgICAgICBiYWRnZT17dW5kZWZpbmVkfVxuICAgICAgICAgICAgY29sb3I9e2NvbG9yIHx8IEF2YXRhckNvbG9yc1swXX1cbiAgICAgICAgICAgIG5vdGVUb1NlbGY9e2ZhbHNlfVxuICAgICAgICAgICAgY29udmVyc2F0aW9uVHlwZT1cImRpcmVjdFwiXG4gICAgICAgICAgICBpMThuPXtpMThufVxuICAgICAgICAgICAgaXNNZT17aXNNZX1cbiAgICAgICAgICAgIG5hbWU9e25hbWV9XG4gICAgICAgICAgICBwaG9uZU51bWJlcj17cGhvbmVOdW1iZXJ9XG4gICAgICAgICAgICBwcm9maWxlTmFtZT17cHJvZmlsZU5hbWV9XG4gICAgICAgICAgICB0aXRsZT17dGl0bGV9XG4gICAgICAgICAgICBzaXplPXs1Mn1cbiAgICAgICAgICAgIHNoYXJlZEdyb3VwTmFtZXM9e3NoYXJlZEdyb3VwTmFtZXN9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L0NhbGxCYWNrZ3JvdW5kQmx1cj5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbmV4cG9ydCB0eXBlIFByb3BzVHlwZSA9IHtcbiAgYWN0aXZlQ2FsbDogQWN0aXZlQ2FsbFR5cGU7XG4gIGdldEdyb3VwQ2FsbFZpZGVvRnJhbWVTb3VyY2U6IChkZW11eElkOiBudW1iZXIpID0+IFZpZGVvRnJhbWVTb3VyY2U7XG4gIGkxOG46IExvY2FsaXplclR5cGU7XG4gIHNldEdyb3VwQ2FsbFZpZGVvUmVxdWVzdDogKF86IEFycmF5PEdyb3VwQ2FsbFZpZGVvUmVxdWVzdD4pID0+IHZvaWQ7XG4gIHNldFJlbmRlcmVyQ2FudmFzOiAoXzogU2V0UmVuZGVyZXJDYW52YXNUeXBlKSA9PiB2b2lkO1xufTtcblxuZXhwb3J0IGNvbnN0IENhbGxpbmdQaXBSZW1vdGVWaWRlbyA9ICh7XG4gIGFjdGl2ZUNhbGwsXG4gIGdldEdyb3VwQ2FsbFZpZGVvRnJhbWVTb3VyY2UsXG4gIGkxOG4sXG4gIHNldEdyb3VwQ2FsbFZpZGVvUmVxdWVzdCxcbiAgc2V0UmVuZGVyZXJDYW52YXMsXG59OiBQcm9wc1R5cGUpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IHsgY29udmVyc2F0aW9uIH0gPSBhY3RpdmVDYWxsO1xuXG4gIGNvbnN0IGdldEdyb3VwQ2FsbEZyYW1lQnVmZmVyID0gdXNlR2V0Q2FsbGluZ0ZyYW1lQnVmZmVyKCk7XG5cbiAgY29uc3QgaXNQYWdlVmlzaWJsZSA9IHVzZVBhZ2VWaXNpYmlsaXR5KCk7XG5cbiAgY29uc3QgYWN0aXZlR3JvdXBDYWxsU3BlYWtlcjogdW5kZWZpbmVkIHwgR3JvdXBDYWxsUmVtb3RlUGFydGljaXBhbnRUeXBlID1cbiAgICB1c2VNZW1vKCgpID0+IHtcbiAgICAgIGlmIChhY3RpdmVDYWxsLmNhbGxNb2RlICE9PSBDYWxsTW9kZS5Hcm91cCkge1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbWF4QnkoYWN0aXZlQ2FsbC5yZW1vdGVQYXJ0aWNpcGFudHMsIHBhcnRpY2lwYW50ID0+XG4gICAgICAgIHBhcnRpY2lwYW50LnByZXNlbnRpbmcgPyBJbmZpbml0eSA6IHBhcnRpY2lwYW50LnNwZWFrZXJUaW1lIHx8IC1JbmZpbml0eVxuICAgICAgKTtcbiAgICB9LCBbYWN0aXZlQ2FsbC5jYWxsTW9kZSwgYWN0aXZlQ2FsbC5yZW1vdGVQYXJ0aWNpcGFudHNdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChhY3RpdmVDYWxsLmNhbGxNb2RlICE9PSBDYWxsTW9kZS5Hcm91cCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChpc1BhZ2VWaXNpYmxlKSB7XG4gICAgICBzZXRHcm91cENhbGxWaWRlb1JlcXVlc3QoXG4gICAgICAgIGFjdGl2ZUNhbGwucmVtb3RlUGFydGljaXBhbnRzLm1hcChwYXJ0aWNpcGFudCA9PiB7XG4gICAgICAgICAgaWYgKHBhcnRpY2lwYW50ID09PSBhY3RpdmVHcm91cENhbGxTcGVha2VyKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBkZW11eElkOiBwYXJ0aWNpcGFudC5kZW11eElkLFxuICAgICAgICAgICAgICB3aWR0aDogY2xhbXAoXG4gICAgICAgICAgICAgICAgTWF0aC5mbG9vcihQSVBfVklERU9fSEVJR0hUX1BYICogcGFydGljaXBhbnQudmlkZW9Bc3BlY3RSYXRpbyksXG4gICAgICAgICAgICAgICAgMSxcbiAgICAgICAgICAgICAgICBNQVhfRlJBTUVfV0lEVEhcbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgaGVpZ2h0OiBQSVBfVklERU9fSEVJR0hUX1BYLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIG5vblJlbmRlcmVkUmVtb3RlUGFydGljaXBhbnQocGFydGljaXBhbnQpO1xuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2V0R3JvdXBDYWxsVmlkZW9SZXF1ZXN0KFxuICAgICAgICBhY3RpdmVDYWxsLnJlbW90ZVBhcnRpY2lwYW50cy5tYXAobm9uUmVuZGVyZWRSZW1vdGVQYXJ0aWNpcGFudClcbiAgICAgICk7XG4gICAgfVxuICB9LCBbXG4gICAgYWN0aXZlQ2FsbC5jYWxsTW9kZSxcbiAgICBhY3RpdmVDYWxsLnJlbW90ZVBhcnRpY2lwYW50cyxcbiAgICBhY3RpdmVHcm91cENhbGxTcGVha2VyLFxuICAgIGlzUGFnZVZpc2libGUsXG4gICAgc2V0R3JvdXBDYWxsVmlkZW9SZXF1ZXN0LFxuICBdKTtcblxuICBzd2l0Y2ggKGFjdGl2ZUNhbGwuY2FsbE1vZGUpIHtcbiAgICBjYXNlIENhbGxNb2RlLkRpcmVjdDoge1xuICAgICAgY29uc3QgeyBoYXNSZW1vdGVWaWRlbyB9ID0gYWN0aXZlQ2FsbC5yZW1vdGVQYXJ0aWNpcGFudHNbMF07XG4gICAgICBpZiAoIWhhc1JlbW90ZVZpZGVvKSB7XG4gICAgICAgIHJldHVybiA8Tm9WaWRlbyBhY3RpdmVDYWxsPXthY3RpdmVDYWxsfSBpMThuPXtpMThufSAvPjtcbiAgICAgIH1cbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kdWxlLWNhbGxpbmctcGlwX192aWRlby0tcmVtb3RlXCI+XG4gICAgICAgICAgPERpcmVjdENhbGxSZW1vdGVQYXJ0aWNpcGFudFxuICAgICAgICAgICAgY29udmVyc2F0aW9uPXtjb252ZXJzYXRpb259XG4gICAgICAgICAgICBoYXNSZW1vdGVWaWRlbz17aGFzUmVtb3RlVmlkZW99XG4gICAgICAgICAgICBpMThuPXtpMThufVxuICAgICAgICAgICAgc2V0UmVuZGVyZXJDYW52YXM9e3NldFJlbmRlcmVyQ2FudmFzfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9XG4gICAgY2FzZSBDYWxsTW9kZS5Hcm91cDpcbiAgICAgIGlmICghYWN0aXZlR3JvdXBDYWxsU3BlYWtlcikge1xuICAgICAgICByZXR1cm4gPE5vVmlkZW8gYWN0aXZlQ2FsbD17YWN0aXZlQ2FsbH0gaTE4bj17aTE4bn0gLz47XG4gICAgICB9XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZHVsZS1jYWxsaW5nLXBpcF9fdmlkZW8tLXJlbW90ZVwiPlxuICAgICAgICAgIDxHcm91cENhbGxSZW1vdGVQYXJ0aWNpcGFudFxuICAgICAgICAgICAgZ2V0RnJhbWVCdWZmZXI9e2dldEdyb3VwQ2FsbEZyYW1lQnVmZmVyfVxuICAgICAgICAgICAgZ2V0R3JvdXBDYWxsVmlkZW9GcmFtZVNvdXJjZT17Z2V0R3JvdXBDYWxsVmlkZW9GcmFtZVNvdXJjZX1cbiAgICAgICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgICAgICBpc0luUGlwXG4gICAgICAgICAgICByZW1vdGVQYXJ0aWNpcGFudD17YWN0aXZlR3JvdXBDYWxsU3BlYWtlcn1cbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG1pc3NpbmdDYXNlRXJyb3IoYWN0aXZlQ2FsbCk7XG4gIH1cbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsbUJBQTBDO0FBQzFDLG9CQUE2QjtBQUU3QixvQkFBdUI7QUFDdkIsZ0NBQW1DO0FBQ25DLHlDQUE0QztBQUM1Qyx3Q0FBMkM7QUFPM0MscUJBQXlCO0FBQ3pCLG9CQUE2QjtBQUU3QixzQ0FBeUM7QUFDekMsdUJBQWdDO0FBQ2hDLCtCQUFrQztBQUNsQyw4QkFBaUM7QUFDakMsMENBQTZDO0FBSTdDLE1BQU0sc0JBQXNCO0FBRTVCLE1BQU0sVUFBVSx3QkFBQztBQUFBLEVBQ2Y7QUFBQSxFQUNBO0FBQUEsTUFJaUI7QUFDakIsUUFBTTtBQUFBLElBQ0o7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLE1BQ0UsV0FBVztBQUVmLFNBQ0UsbURBQUM7QUFBQSxJQUFJLFdBQVU7QUFBQSxLQUNiLG1EQUFDO0FBQUEsSUFBbUI7QUFBQSxJQUF3QjtBQUFBLEtBQzFDLG1EQUFDO0FBQUEsSUFBSSxXQUFVO0FBQUEsS0FDYixtREFBQztBQUFBLElBQ0M7QUFBQSxJQUNBO0FBQUEsSUFDQSxPQUFPO0FBQUEsSUFD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
