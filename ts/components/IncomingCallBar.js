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
var IncomingCallBar_exports = {};
__export(IncomingCallBar_exports, {
  IncomingCallBar: () => IncomingCallBar
});
module.exports = __toCommonJS(IncomingCallBar_exports);
var import_react = __toESM(require("react"));
var import_Avatar = require("./Avatar");
var import_Tooltip = require("./Tooltip");
var import_Intl = require("./Intl");
var import_theme = require("../util/theme");
var import_callingGetParticipantName = require("../util/callingGetParticipantName");
var import_ContactName = require("./conversation/ContactName");
var import_Emojify = require("./conversation/Emojify");
var import_Colors = require("../types/Colors");
var import_Calling = require("../types/Calling");
var import_missingCaseError = require("../util/missingCaseError");
var import_useKeyboardShortcuts = require("../hooks/useKeyboardShortcuts");
const CallButton = /* @__PURE__ */ __name(({
  classSuffix,
  onClick,
  tabIndex,
  tooltipContent
}) => {
  return /* @__PURE__ */ import_react.default.createElement(import_Tooltip.Tooltip, {
    content: tooltipContent,
    theme: import_theme.Theme.Dark
  }, /* @__PURE__ */ import_react.default.createElement("button", {
    "aria-label": tooltipContent,
    className: `IncomingCallBar__button IncomingCallBar__button--${classSuffix}`,
    onClick,
    tabIndex,
    type: "button"
  }, /* @__PURE__ */ import_react.default.createElement("div", null)));
}, "CallButton");
const GroupCallMessage = /* @__PURE__ */ __name(({
  i18n,
  otherMembersRung,
  ringer
}) => {
  const [first, second] = otherMembersRung.slice(0, 2).map((member) => /* @__PURE__ */ import_react.default.createElement(import_Emojify.Emojify, {
    text: (0, import_callingGetParticipantName.getParticipantName)(member)
  }));
  const ringerNode = /* @__PURE__ */ import_react.default.createElement(import_Emojify.Emojify, {
    text: (0, import_callingGetParticipantName.getParticipantName)(ringer)
  });
  switch (otherMembersRung.length) {
    case 0:
      return /* @__PURE__ */ import_react.default.createElement(import_Intl.Intl, {
        id: "incomingGroupCall__ringing-you",
        i18n,
        components: { ringer: ringerNode }
      });
    case 1:
      return /* @__PURE__ */ import_react.default.createElement(import_Intl.Intl, {
        id: "incomingGroupCall__ringing-1-other",
        i18n,
        components: {
          ringer: ringerNode,
          otherMember: first
        }
      });
    case 2:
      return /* @__PURE__ */ import_react.default.createElement(import_Intl.Intl, {
        id: "incomingGroupCall__ringing-2-others",
        i18n,
        components: {
          ringer: ringerNode,
          first,
          second
        }
      });
      break;
    case 3:
      return /* @__PURE__ */ import_react.default.createElement(import_Intl.Intl, {
        id: "incomingGroupCall__ringing-3-others",
        i18n,
        components: {
          ringer: ringerNode,
          first,
          second
        }
      });
      break;
    default:
      return /* @__PURE__ */ import_react.default.createElement(import_Intl.Intl, {
        id: "incomingGroupCall__ringing-many",
        i18n,
        components: {
          ringer: ringerNode,
          first,
          second,
          remaining: String(otherMembersRung.length - 2)
        }
      });
  }
}, "GroupCallMessage");
const IncomingCallBar = /* @__PURE__ */ __name((props) => {
  const {
    acceptCall,
    bounceAppIconStart,
    bounceAppIconStop,
    conversation,
    declineCall,
    i18n,
    notifyForCall
  } = props;
  const {
    id: conversationId,
    acceptedMessageRequest,
    avatarPath,
    color,
    isMe,
    name,
    phoneNumber,
    profileName,
    sharedGroupNames,
    title,
    type: conversationType
  } = conversation;
  let isVideoCall;
  let headerNode;
  let messageNode;
  switch (props.callMode) {
    case import_Calling.CallMode.Direct:
      ({ isVideoCall } = props);
      headerNode = /* @__PURE__ */ import_react.default.createElement(import_ContactName.ContactName, {
        title
      });
      messageNode = i18n(isVideoCall ? "incomingVideoCall" : "incomingAudioCall");
      break;
    case import_Calling.CallMode.Group: {
      const { otherMembersRung, ringer } = props;
      isVideoCall = true;
      headerNode = /* @__PURE__ */ import_react.default.createElement(import_Emojify.Emojify, {
        text: title
      });
      messageNode = /* @__PURE__ */ import_react.default.createElement(GroupCallMessage, {
        i18n,
        otherMembersRung,
        ringer
      });
      break;
    }
    default:
      throw (0, import_missingCaseError.missingCaseError)(props);
  }
  const initialTitleRef = (0, import_react.useRef)(title);
  (0, import_react.useEffect)(() => {
    const initialTitle = initialTitleRef.current;
    notifyForCall(initialTitle, isVideoCall);
  }, [isVideoCall, notifyForCall]);
  (0, import_react.useEffect)(() => {
    bounceAppIconStart();
    return () => {
      bounceAppIconStop();
    };
  }, [bounceAppIconStart, bounceAppIconStop]);
  const acceptVideoCall = (0, import_react.useCallback)(() => {
    acceptCall({ conversationId, asVideoCall: true });
  }, [acceptCall, conversationId]);
  const acceptAudioCall = (0, import_react.useCallback)(() => {
    acceptCall({ conversationId, asVideoCall: false });
  }, [acceptCall, conversationId]);
  const declineIncomingCall = (0, import_react.useCallback)(() => {
    declineCall({ conversationId });
  }, [conversationId, declineCall]);
  const incomingCallShortcuts = (0, import_useKeyboardShortcuts.useIncomingCallShortcuts)(acceptAudioCall, acceptVideoCall, declineIncomingCall);
  (0, import_useKeyboardShortcuts.useKeyboardShortcuts)(incomingCallShortcuts);
  return /* @__PURE__ */ import_react.default.createElement("div", {
    className: "IncomingCallBar__container"
  }, /* @__PURE__ */ import_react.default.createElement("div", {
    className: "IncomingCallBar__bar"
  }, /* @__PURE__ */ import_react.default.createElement("div", {
    className: "IncomingCallBar__conversation"
  }, /* @__PURE__ */ import_react.default.createElement("div", {
    className: "IncomingCallBar__conversation--avatar"
  }, /* @__PURE__ */ import_react.default.createElement(import_Avatar.Avatar, {
    acceptedMessageRequest,
    avatarPath,
    badge: void 0,
    color: color || import_Colors.AvatarColors[0],
    noteToSelf: false,
    conversationType,
    i18n,
    isMe,
    name,
    phoneNumber,
    profileName,
    title,
    sharedGroupNames,
    size: 52
  })), /* @__PURE__ */ import_react.default.createElement("div", {
    className: "IncomingCallBar__conversation--name"
  }, /* @__PURE__ */ import_react.default.createElement("div", {
    className: "IncomingCallBar__conversation--name-header"
  }, headerNode), /* @__PURE__ */ import_react.default.createElement("div", {
    dir: "auto",
    className: "IncomingCallBar__conversation--message-text"
  }, messageNode))), /* @__PURE__ */ import_react.default.createElement("div", {
    className: "IncomingCallBar__actions"
  }, /* @__PURE__ */ import_react.default.createElement(CallButton, {
    classSuffix: "decline",
    onClick: declineIncomingCall,
    tabIndex: 0,
    tooltipContent: i18n("declineCall")
  }), isVideoCall ? /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement(CallButton, {
    classSuffix: "accept-video-as-audio",
    onClick: acceptAudioCall,
    tabIndex: 0,
    tooltipContent: i18n("acceptCallWithoutVideo")
  }), /* @__PURE__ */ import_react.default.createElement(CallButton, {
    classSuffix: "accept-video",
    onClick: acceptVideoCall,
    tabIndex: 0,
    tooltipContent: i18n("acceptCall")
  })) : /* @__PURE__ */ import_react.default.createElement(CallButton, {
    classSuffix: "accept-audio",
    onClick: acceptAudioCall,
    tabIndex: 0,
    tooltipContent: i18n("acceptCall")
  }))));
}, "IncomingCallBar");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  IncomingCallBar
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiSW5jb21pbmdDYWxsQmFyLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjAtMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB0eXBlIHsgUmVhY3RDaGlsZCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdCwgeyB1c2VDYWxsYmFjaywgdXNlRWZmZWN0LCB1c2VSZWYgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBBdmF0YXIgfSBmcm9tICcuL0F2YXRhcic7XG5pbXBvcnQgeyBUb29sdGlwIH0gZnJvbSAnLi9Ub29sdGlwJztcbmltcG9ydCB7IEludGwgfSBmcm9tICcuL0ludGwnO1xuaW1wb3J0IHsgVGhlbWUgfSBmcm9tICcuLi91dGlsL3RoZW1lJztcbmltcG9ydCB7IGdldFBhcnRpY2lwYW50TmFtZSB9IGZyb20gJy4uL3V0aWwvY2FsbGluZ0dldFBhcnRpY2lwYW50TmFtZSc7XG5pbXBvcnQgeyBDb250YWN0TmFtZSB9IGZyb20gJy4vY29udmVyc2F0aW9uL0NvbnRhY3ROYW1lJztcbmltcG9ydCB7IEVtb2ppZnkgfSBmcm9tICcuL2NvbnZlcnNhdGlvbi9FbW9qaWZ5JztcbmltcG9ydCB0eXBlIHsgTG9jYWxpemVyVHlwZSB9IGZyb20gJy4uL3R5cGVzL1V0aWwnO1xuaW1wb3J0IHsgQXZhdGFyQ29sb3JzIH0gZnJvbSAnLi4vdHlwZXMvQ29sb3JzJztcbmltcG9ydCB7IENhbGxNb2RlIH0gZnJvbSAnLi4vdHlwZXMvQ2FsbGluZyc7XG5pbXBvcnQgdHlwZSB7IENvbnZlcnNhdGlvblR5cGUgfSBmcm9tICcuLi9zdGF0ZS9kdWNrcy9jb252ZXJzYXRpb25zJztcbmltcG9ydCB0eXBlIHsgQWNjZXB0Q2FsbFR5cGUsIERlY2xpbmVDYWxsVHlwZSB9IGZyb20gJy4uL3N0YXRlL2R1Y2tzL2NhbGxpbmcnO1xuaW1wb3J0IHsgbWlzc2luZ0Nhc2VFcnJvciB9IGZyb20gJy4uL3V0aWwvbWlzc2luZ0Nhc2VFcnJvcic7XG5pbXBvcnQge1xuICB1c2VJbmNvbWluZ0NhbGxTaG9ydGN1dHMsXG4gIHVzZUtleWJvYXJkU2hvcnRjdXRzLFxufSBmcm9tICcuLi9ob29rcy91c2VLZXlib2FyZFNob3J0Y3V0cyc7XG5cbmV4cG9ydCB0eXBlIFByb3BzVHlwZSA9IHtcbiAgYWNjZXB0Q2FsbDogKF86IEFjY2VwdENhbGxUeXBlKSA9PiB2b2lkO1xuICBkZWNsaW5lQ2FsbDogKF86IERlY2xpbmVDYWxsVHlwZSkgPT4gdm9pZDtcbiAgaTE4bjogTG9jYWxpemVyVHlwZTtcbiAgY29udmVyc2F0aW9uOiBQaWNrPFxuICAgIENvbnZlcnNhdGlvblR5cGUsXG4gICAgfCAnYWNjZXB0ZWRNZXNzYWdlUmVxdWVzdCdcbiAgICB8ICdhdmF0YXJQYXRoJ1xuICAgIHwgJ2NvbG9yJ1xuICAgIHwgJ2lkJ1xuICAgIHwgJ2lzTWUnXG4gICAgfCAnbmFtZSdcbiAgICB8ICdwaG9uZU51bWJlcidcbiAgICB8ICdwcm9maWxlTmFtZSdcbiAgICB8ICdzaGFyZWRHcm91cE5hbWVzJ1xuICAgIHwgJ3RpdGxlJ1xuICAgIHwgJ3R5cGUnXG4gID47XG4gIGJvdW5jZUFwcEljb25TdGFydCgpOiB1bmtub3duO1xuICBib3VuY2VBcHBJY29uU3RvcCgpOiB1bmtub3duO1xuICBub3RpZnlGb3JDYWxsKGNvbnZlcnNhdGlvblRpdGxlOiBzdHJpbmcsIGlzVmlkZW9DYWxsOiBib29sZWFuKTogdW5rbm93bjtcbn0gJiAoXG4gIHwge1xuICAgICAgY2FsbE1vZGU6IENhbGxNb2RlLkRpcmVjdDtcbiAgICAgIGlzVmlkZW9DYWxsOiBib29sZWFuO1xuICAgIH1cbiAgfCB7XG4gICAgICBjYWxsTW9kZTogQ2FsbE1vZGUuR3JvdXA7XG4gICAgICBvdGhlck1lbWJlcnNSdW5nOiBBcnJheTxQaWNrPENvbnZlcnNhdGlvblR5cGUsICdmaXJzdE5hbWUnIHwgJ3RpdGxlJz4+O1xuICAgICAgcmluZ2VyOiBQaWNrPENvbnZlcnNhdGlvblR5cGUsICdmaXJzdE5hbWUnIHwgJ3RpdGxlJz47XG4gICAgfVxuKTtcblxudHlwZSBDYWxsQnV0dG9uUHJvcHMgPSB7XG4gIGNsYXNzU3VmZml4OiBzdHJpbmc7XG4gIHRhYkluZGV4OiBudW1iZXI7XG4gIHRvb2x0aXBDb250ZW50OiBzdHJpbmc7XG4gIG9uQ2xpY2s6ICgpID0+IHZvaWQ7XG59O1xuXG5jb25zdCBDYWxsQnV0dG9uID0gKHtcbiAgY2xhc3NTdWZmaXgsXG4gIG9uQ2xpY2ssXG4gIHRhYkluZGV4LFxuICB0b29sdGlwQ29udGVudCxcbn06IENhbGxCdXR0b25Qcm9wcyk6IEpTWC5FbGVtZW50ID0+IHtcbiAgcmV0dXJuIChcbiAgICA8VG9vbHRpcCBjb250ZW50PXt0b29sdGlwQ29udGVudH0gdGhlbWU9e1RoZW1lLkRhcmt9PlxuICAgICAgPGJ1dHRvblxuICAgICAgICBhcmlhLWxhYmVsPXt0b29sdGlwQ29udGVudH1cbiAgICAgICAgY2xhc3NOYW1lPXtgSW5jb21pbmdDYWxsQmFyX19idXR0b24gSW5jb21pbmdDYWxsQmFyX19idXR0b24tLSR7Y2xhc3NTdWZmaXh9YH1cbiAgICAgICAgb25DbGljaz17b25DbGlja31cbiAgICAgICAgdGFiSW5kZXg9e3RhYkluZGV4fVxuICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgID5cbiAgICAgICAgPGRpdiAvPlxuICAgICAgPC9idXR0b24+XG4gICAgPC9Ub29sdGlwPlxuICApO1xufTtcblxuY29uc3QgR3JvdXBDYWxsTWVzc2FnZSA9ICh7XG4gIGkxOG4sXG4gIG90aGVyTWVtYmVyc1J1bmcsXG4gIHJpbmdlcixcbn06IFJlYWRvbmx5PHtcbiAgaTE4bjogTG9jYWxpemVyVHlwZTtcbiAgb3RoZXJNZW1iZXJzUnVuZzogQXJyYXk8UGljazxDb252ZXJzYXRpb25UeXBlLCAnZmlyc3ROYW1lJyB8ICd0aXRsZSc+PjtcbiAgcmluZ2VyOiBQaWNrPENvbnZlcnNhdGlvblR5cGUsICdmaXJzdE5hbWUnIHwgJ3RpdGxlJz47XG59Pik6IEpTWC5FbGVtZW50ID0+IHtcbiAgLy8gQXMgYW4gb3B0aW1pemF0aW9uLCB3ZSBvbmx5IHByb2Nlc3MgdGhlIGZpcnN0IHR3byBuYW1lcy5cbiAgY29uc3QgW2ZpcnN0LCBzZWNvbmRdID0gb3RoZXJNZW1iZXJzUnVuZ1xuICAgIC5zbGljZSgwLCAyKVxuICAgIC5tYXAobWVtYmVyID0+IDxFbW9qaWZ5IHRleHQ9e2dldFBhcnRpY2lwYW50TmFtZShtZW1iZXIpfSAvPik7XG4gIGNvbnN0IHJpbmdlck5vZGUgPSA8RW1vamlmeSB0ZXh0PXtnZXRQYXJ0aWNpcGFudE5hbWUocmluZ2VyKX0gLz47XG5cbiAgc3dpdGNoIChvdGhlck1lbWJlcnNSdW5nLmxlbmd0aCkge1xuICAgIGNhc2UgMDpcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxJbnRsXG4gICAgICAgICAgaWQ9XCJpbmNvbWluZ0dyb3VwQ2FsbF9fcmluZ2luZy15b3VcIlxuICAgICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgICAgY29tcG9uZW50cz17eyByaW5nZXI6IHJpbmdlck5vZGUgfX1cbiAgICAgICAgLz5cbiAgICAgICk7XG4gICAgY2FzZSAxOlxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPEludGxcbiAgICAgICAgICBpZD1cImluY29taW5nR3JvdXBDYWxsX19yaW5naW5nLTEtb3RoZXJcIlxuICAgICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgICAgY29tcG9uZW50cz17e1xuICAgICAgICAgICAgcmluZ2VyOiByaW5nZXJOb2RlLFxuICAgICAgICAgICAgb3RoZXJNZW1iZXI6IGZpcnN0LFxuICAgICAgICAgIH19XG4gICAgICAgIC8+XG4gICAgICApO1xuICAgIGNhc2UgMjpcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxJbnRsXG4gICAgICAgICAgaWQ9XCJpbmNvbWluZ0dyb3VwQ2FsbF9fcmluZ2luZy0yLW90aGVyc1wiXG4gICAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgICBjb21wb25lbnRzPXt7XG4gICAgICAgICAgICByaW5nZXI6IHJpbmdlck5vZGUsXG4gICAgICAgICAgICBmaXJzdCxcbiAgICAgICAgICAgIHNlY29uZCxcbiAgICAgICAgICB9fVxuICAgICAgICAvPlxuICAgICAgKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgMzpcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxJbnRsXG4gICAgICAgICAgaWQ9XCJpbmNvbWluZ0dyb3VwQ2FsbF9fcmluZ2luZy0zLW90aGVyc1wiXG4gICAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgICBjb21wb25lbnRzPXt7XG4gICAgICAgICAgICByaW5nZXI6IHJpbmdlck5vZGUsXG4gICAgICAgICAgICBmaXJzdCxcbiAgICAgICAgICAgIHNlY29uZCxcbiAgICAgICAgICB9fVxuICAgICAgICAvPlxuICAgICAgKTtcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8SW50bFxuICAgICAgICAgIGlkPVwiaW5jb21pbmdHcm91cENhbGxfX3JpbmdpbmctbWFueVwiXG4gICAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgICBjb21wb25lbnRzPXt7XG4gICAgICAgICAgICByaW5nZXI6IHJpbmdlck5vZGUsXG4gICAgICAgICAgICBmaXJzdCxcbiAgICAgICAgICAgIHNlY29uZCxcbiAgICAgICAgICAgIHJlbWFpbmluZzogU3RyaW5nKG90aGVyTWVtYmVyc1J1bmcubGVuZ3RoIC0gMiksXG4gICAgICAgICAgfX1cbiAgICAgICAgLz5cbiAgICAgICk7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBJbmNvbWluZ0NhbGxCYXIgPSAocHJvcHM6IFByb3BzVHlwZSk6IEpTWC5FbGVtZW50IHwgbnVsbCA9PiB7XG4gIGNvbnN0IHtcbiAgICBhY2NlcHRDYWxsLFxuICAgIGJvdW5jZUFwcEljb25TdGFydCxcbiAgICBib3VuY2VBcHBJY29uU3RvcCxcbiAgICBjb252ZXJzYXRpb24sXG4gICAgZGVjbGluZUNhbGwsXG4gICAgaTE4bixcbiAgICBub3RpZnlGb3JDYWxsLFxuICB9ID0gcHJvcHM7XG4gIGNvbnN0IHtcbiAgICBpZDogY29udmVyc2F0aW9uSWQsXG4gICAgYWNjZXB0ZWRNZXNzYWdlUmVxdWVzdCxcbiAgICBhdmF0YXJQYXRoLFxuICAgIGNvbG9yLFxuICAgIGlzTWUsXG4gICAgbmFtZSxcbiAgICBwaG9uZU51bWJlcixcbiAgICBwcm9maWxlTmFtZSxcbiAgICBzaGFyZWRHcm91cE5hbWVzLFxuICAgIHRpdGxlLFxuICAgIHR5cGU6IGNvbnZlcnNhdGlvblR5cGUsXG4gIH0gPSBjb252ZXJzYXRpb247XG5cbiAgbGV0IGlzVmlkZW9DYWxsOiBib29sZWFuO1xuICBsZXQgaGVhZGVyTm9kZTogUmVhY3RDaGlsZDtcbiAgbGV0IG1lc3NhZ2VOb2RlOiBSZWFjdENoaWxkO1xuXG4gIHN3aXRjaCAocHJvcHMuY2FsbE1vZGUpIHtcbiAgICBjYXNlIENhbGxNb2RlLkRpcmVjdDpcbiAgICAgICh7IGlzVmlkZW9DYWxsIH0gPSBwcm9wcyk7XG4gICAgICBoZWFkZXJOb2RlID0gPENvbnRhY3ROYW1lIHRpdGxlPXt0aXRsZX0gLz47XG4gICAgICBtZXNzYWdlTm9kZSA9IGkxOG4oXG4gICAgICAgIGlzVmlkZW9DYWxsID8gJ2luY29taW5nVmlkZW9DYWxsJyA6ICdpbmNvbWluZ0F1ZGlvQ2FsbCdcbiAgICAgICk7XG4gICAgICBicmVhaztcbiAgICBjYXNlIENhbGxNb2RlLkdyb3VwOiB7XG4gICAgICBjb25zdCB7IG90aGVyTWVtYmVyc1J1bmcsIHJpbmdlciB9ID0gcHJvcHM7XG4gICAgICBpc1ZpZGVvQ2FsbCA9IHRydWU7XG4gICAgICBoZWFkZXJOb2RlID0gPEVtb2ppZnkgdGV4dD17dGl0bGV9IC8+O1xuICAgICAgbWVzc2FnZU5vZGUgPSAoXG4gICAgICAgIDxHcm91cENhbGxNZXNzYWdlXG4gICAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgICBvdGhlck1lbWJlcnNSdW5nPXtvdGhlck1lbWJlcnNSdW5nfVxuICAgICAgICAgIHJpbmdlcj17cmluZ2VyfVxuICAgICAgICAvPlxuICAgICAgKTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbWlzc2luZ0Nhc2VFcnJvcihwcm9wcyk7XG4gIH1cblxuICAvLyBXZSBkb24ndCB3YW50IHRvIHJlLW5vdGlmeSBpZiB0aGUgdGl0bGUgY2hhbmdlcy5cbiAgY29uc3QgaW5pdGlhbFRpdGxlUmVmID0gdXNlUmVmPHN0cmluZz4odGl0bGUpO1xuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGluaXRpYWxUaXRsZSA9IGluaXRpYWxUaXRsZVJlZi5jdXJyZW50O1xuICAgIG5vdGlmeUZvckNhbGwoaW5pdGlhbFRpdGxlLCBpc1ZpZGVvQ2FsbCk7XG4gIH0sIFtpc1ZpZGVvQ2FsbCwgbm90aWZ5Rm9yQ2FsbF0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgYm91bmNlQXBwSWNvblN0YXJ0KCk7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGJvdW5jZUFwcEljb25TdG9wKCk7XG4gICAgfTtcbiAgfSwgW2JvdW5jZUFwcEljb25TdGFydCwgYm91bmNlQXBwSWNvblN0b3BdKTtcblxuICBjb25zdCBhY2NlcHRWaWRlb0NhbGwgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgYWNjZXB0Q2FsbCh7IGNvbnZlcnNhdGlvbklkLCBhc1ZpZGVvQ2FsbDogdHJ1ZSB9KTtcbiAgfSwgW2FjY2VwdENhbGwsIGNvbnZlcnNhdGlvbklkXSk7XG5cbiAgY29uc3QgYWNjZXB0QXVkaW9DYWxsID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGFjY2VwdENhbGwoeyBjb252ZXJzYXRpb25JZCwgYXNWaWRlb0NhbGw6IGZhbHNlIH0pO1xuICB9LCBbYWNjZXB0Q2FsbCwgY29udmVyc2F0aW9uSWRdKTtcblxuICBjb25zdCBkZWNsaW5lSW5jb21pbmdDYWxsID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGRlY2xpbmVDYWxsKHsgY29udmVyc2F0aW9uSWQgfSk7XG4gIH0sIFtjb252ZXJzYXRpb25JZCwgZGVjbGluZUNhbGxdKTtcblxuICBjb25zdCBpbmNvbWluZ0NhbGxTaG9ydGN1dHMgPSB1c2VJbmNvbWluZ0NhbGxTaG9ydGN1dHMoXG4gICAgYWNjZXB0QXVkaW9DYWxsLFxuICAgIGFjY2VwdFZpZGVvQ2FsbCxcbiAgICBkZWNsaW5lSW5jb21pbmdDYWxsXG4gICk7XG4gIHVzZUtleWJvYXJkU2hvcnRjdXRzKGluY29taW5nQ2FsbFNob3J0Y3V0cyk7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cIkluY29taW5nQ2FsbEJhcl9fY29udGFpbmVyXCI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIkluY29taW5nQ2FsbEJhcl9fYmFyXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiSW5jb21pbmdDYWxsQmFyX19jb252ZXJzYXRpb25cIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIkluY29taW5nQ2FsbEJhcl9fY29udmVyc2F0aW9uLS1hdmF0YXJcIj5cbiAgICAgICAgICAgIDxBdmF0YXJcbiAgICAgICAgICAgICAgYWNjZXB0ZWRNZXNzYWdlUmVxdWVzdD17YWNjZXB0ZWRNZXNzYWdlUmVxdWVzdH1cbiAgICAgICAgICAgICAgYXZhdGFyUGF0aD17YXZhdGFyUGF0aH1cbiAgICAgICAgICAgICAgYmFkZ2U9e3VuZGVmaW5lZH1cbiAgICAgICAgICAgICAgY29sb3I9e2NvbG9yIHx8IEF2YXRhckNvbG9yc1swXX1cbiAgICAgICAgICAgICAgbm90ZVRvU2VsZj17ZmFsc2V9XG4gICAgICAgICAgICAgIGNvbnZlcnNhdGlvblR5cGU9e2NvbnZlcnNhdGlvblR5cGV9XG4gICAgICAgICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgICAgICAgIGlzTWU9e2lzTWV9XG4gICAgICAgICAgICAgIG5hbWU9e25hbWV9XG4gICAgICAgICAgICAgIHBob25lTnVtYmVyPXtwaG9uZU51bWJlcn1cbiAgICAgICAgICAgICAgcHJvZmlsZU5hbWU9e3Byb2ZpbGVOYW1lfVxuICAgICAgICAgICAgICB0aXRsZT17dGl0bGV9XG4gICAgICAgICAgICAgIHNoYXJlZEdyb3VwTmFtZXM9e3NoYXJlZEdyb3VwTmFtZXN9XG4gICAgICAgICAgICAgIHNpemU9ezUyfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIkluY29taW5nQ2FsbEJhcl9fY29udmVyc2F0aW9uLS1uYW1lXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIkluY29taW5nQ2FsbEJhcl9fY29udmVyc2F0aW9uLS1uYW1lLWhlYWRlclwiPlxuICAgICAgICAgICAgICB7aGVhZGVyTm9kZX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICBkaXI9XCJhdXRvXCJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiSW5jb21pbmdDYWxsQmFyX19jb252ZXJzYXRpb24tLW1lc3NhZ2UtdGV4dFwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHttZXNzYWdlTm9kZX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJJbmNvbWluZ0NhbGxCYXJfX2FjdGlvbnNcIj5cbiAgICAgICAgICA8Q2FsbEJ1dHRvblxuICAgICAgICAgICAgY2xhc3NTdWZmaXg9XCJkZWNsaW5lXCJcbiAgICAgICAgICAgIG9uQ2xpY2s9e2RlY2xpbmVJbmNvbWluZ0NhbGx9XG4gICAgICAgICAgICB0YWJJbmRleD17MH1cbiAgICAgICAgICAgIHRvb2x0aXBDb250ZW50PXtpMThuKCdkZWNsaW5lQ2FsbCcpfVxuICAgICAgICAgIC8+XG4gICAgICAgICAge2lzVmlkZW9DYWxsID8gKFxuICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgPENhbGxCdXR0b25cbiAgICAgICAgICAgICAgICBjbGFzc1N1ZmZpeD1cImFjY2VwdC12aWRlby1hcy1hdWRpb1wiXG4gICAgICAgICAgICAgICAgb25DbGljaz17YWNjZXB0QXVkaW9DYWxsfVxuICAgICAgICAgICAgICAgIHRhYkluZGV4PXswfVxuICAgICAgICAgICAgICAgIHRvb2x0aXBDb250ZW50PXtpMThuKCdhY2NlcHRDYWxsV2l0aG91dFZpZGVvJyl9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDxDYWxsQnV0dG9uXG4gICAgICAgICAgICAgICAgY2xhc3NTdWZmaXg9XCJhY2NlcHQtdmlkZW9cIlxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2FjY2VwdFZpZGVvQ2FsbH1cbiAgICAgICAgICAgICAgICB0YWJJbmRleD17MH1cbiAgICAgICAgICAgICAgICB0b29sdGlwQ29udGVudD17aTE4bignYWNjZXB0Q2FsbCcpfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC8+XG4gICAgICAgICAgKSA6IChcbiAgICAgICAgICAgIDxDYWxsQnV0dG9uXG4gICAgICAgICAgICAgIGNsYXNzU3VmZml4PVwiYWNjZXB0LWF1ZGlvXCJcbiAgICAgICAgICAgICAgb25DbGljaz17YWNjZXB0QXVkaW9DYWxsfVxuICAgICAgICAgICAgICB0YWJJbmRleD17MH1cbiAgICAgICAgICAgICAgdG9vbHRpcENvbnRlbnQ9e2kxOG4oJ2FjY2VwdENhbGwnKX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSUEsbUJBQXNEO0FBQ3RELG9CQUF1QjtBQUN2QixxQkFBd0I7QUFDeEIsa0JBQXFCO0FBQ3JCLG1CQUFzQjtBQUN0Qix1Q0FBbUM7QUFDbkMseUJBQTRCO0FBQzVCLHFCQUF3QjtBQUV4QixvQkFBNkI7QUFDN0IscUJBQXlCO0FBR3pCLDhCQUFpQztBQUNqQyxrQ0FHTztBQTBDUCxNQUFNLGFBQWEsd0JBQUM7QUFBQSxFQUNsQjtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLE1BQ2tDO0FBQ2xDLFNBQ0UsbURBQUM7QUFBQSxJQUFRLFNBQVM7QUFBQSxJQUFnQixPQUFPLG1CQUFNO0FBQUEsS0FDN0MsbURBQUM7QUFBQSxJQUNDLGNBQVk7QUFBQSxJQUNaLFdBQVcsb0RBQW9EO0FBQUEsSUFDL0Q7QUFBQSxJQUNBO0FBQUEsSUFDQSxNQUFLO0FBQUEsS0FFTCxtREFBQyxXQUFJLENBQ1AsQ0FDRjtBQUVKLEdBbkJtQjtBQXFCbkIsTUFBTSxtQkFBbUIsd0JBQUM7QUFBQSxFQUN4QjtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsTUFLa0I7QUFFbEIsUUFBTSxDQUFDLE9BQU8sVUFBVSxpQkFDckIsTUFBTSxHQUFHLENBQUMsRUFDVixJQUFJLFlBQVUsbURBQUM7QUFBQSxJQUFRLE1BQU0seURBQW1CLE1BQU07QUFBQSxHQUFHLENBQUU7QUFDOUQsUUFBTSxhQUFhLG1EQUFDO0FBQUEsSUFBUSxNQUFNLHlEQUFtQixNQUFNO0FBQUEsR0FBRztBQUU5RCxVQUFRLGlCQUFpQjtBQUFBLFNBQ2xCO0FBQ0gsYUFDRSxtREFBQztBQUFBLFFBQ0MsSUFBRztBQUFBLFFBQ0g7QUFBQSxRQUNBLFlBQVksRUFBRSxRQUFRLFdBQVc7QUFBQSxPQUNuQztBQUFBLFNBRUM7QUFDSCxhQUNFLG1EQUFDO0FBQUEsUUFDQyxJQUFHO0FBQUEsUUFDSDtBQUFBLFFBQ0EsWUFBWTtBQUFBLFVBQ1YsUUFBUTtBQUFBLFVBQ1IsYUFBYTtBQUFBLFFBQ2Y7QUFBQSxPQUNGO0FBQUEsU0FFQztBQUNILGFBQ0UsbURBQUM7QUFBQSxRQUNDLElBQUc7QUFBQSxRQUNIO0FBQUEsUUFDQSxZQUFZO0FBQUEsVUFDVixRQUFRO0FBQUEsVUFDUjtBQUFBLFVBQ0E7QUFBQSxRQUNGO0FBQUEsT0FDRjtBQUVGO0FBQUEsU0FDRztBQUNILGFBQ0UsbURBQUM7QUFBQSxRQUNDLElBQUc7QUFBQSxRQUNIO0FBQUEsUUFDQSxZQUFZO0FBQUEsVUFDVixRQUFRO0FBQUEsVUFDUjtBQUFBLFVBQ0E7QUFBQSxRQUNGO0FBQUEsT0FDRjtBQUVGO0FBQUE7QUFFQSxhQUNFLG1EQUFDO0FBQUEsUUFDQyxJQUFHO0FBQUEsUUFDSDtBQUFBLFFBQ0EsWUFBWTtBQUFBLFVBQ1YsUUFBUTtBQUFBLFVBQ1I7QUFBQSxVQUNBO0FBQUEsVUFDQSxXQUFXLE9BQU8saUJBQWlCLFNBQVMsQ0FBQztBQUFBLFFBQy9DO0FBQUEsT0FDRjtBQUFBO0FBR1IsR0EzRXlCO0FBNkVsQixNQUFNLGtCQUFrQix3QkFBQyxVQUF5QztBQUN2RSxRQUFNO0FBQUEsSUFDSjtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLE1BQ0U7QUFDSixRQUFNO0FBQUEsSUFDSixJQUFJO0FBQUEsSUFDSjtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQSxNQUFNO0FBQUEsTUFDSjtBQUVKLE1BQUk7QUFDSixNQUFJO0FBQ0osTUFBSTtBQUVKLFVBQVEsTUFBTTtBQUFBLFNBQ1Asd0JBQVM7QUFDWixNQUFDLEdBQUUsWUFBWSxJQUFJO0FBQ25CLG1CQUFhLG1EQUFDO0FBQUEsUUFBWTtBQUFBLE9BQWM7QUFDeEMsb0JBQWMsS0FDWixjQUFjLHNCQUFzQixtQkFDdEM7QUFDQTtBQUFBLFNBQ0csd0JBQVMsT0FBTztBQUNuQixZQUFNLEVBQUUsa0JBQWtCLFdBQVc7QUFDckMsb0JBQWM7QUFDZCxtQkFBYSxtREFBQztBQUFBLFFBQVEsTUFBTTtBQUFBLE9BQU87QUFDbkMsb0JBQ0UsbURBQUM7QUFBQSxRQUNDO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxPQUNGO0FBRUY7QUFBQSxJQUNGO0FBQUE7QUFFRSxZQUFNLDhDQUFpQixLQUFLO0FBQUE7QUFJaEMsUUFBTSxrQkFBa0IseUJBQWUsS0FBSztBQUM1Qyw4QkFBVSxNQUFNO0FBQ2QsVUFBTSxlQUFlLGdCQUFnQjtBQUNyQyxrQkFBYyxjQUFjLFdBQVc7QUFBQSxFQUN6QyxHQUFHLENBQUMsYUFBYSxhQUFhLENBQUM7QUFFL0IsOEJBQVUsTUFBTTtBQUNkLHVCQUFtQjtBQUNuQixXQUFPLE1BQU07QUFDWCx3QkFBa0I7QUFBQSxJQUNwQjtBQUFBLEVBQ0YsR0FBRyxDQUFDLG9CQUFvQixpQkFBaUIsQ0FBQztBQUUxQyxRQUFNLGtCQUFrQiw4QkFBWSxNQUFNO0FBQ3hDLGVBQVcsRUFBRSxnQkFBZ0IsYUFBYSxLQUFLLENBQUM7QUFBQSxFQUNsRCxHQUFHLENBQUMsWUFBWSxjQUFjLENBQUM7QUFFL0IsUUFBTSxrQkFBa0IsOEJBQVksTUFBTTtBQUN4QyxlQUFXLEVBQUUsZ0JBQWdCLGFBQWEsTUFBTSxDQUFDO0FBQUEsRUFDbkQsR0FBRyxDQUFDLFlBQVksY0FBYyxDQUFDO0FBRS9CLFFBQU0sc0JBQXNCLDhCQUFZLE1BQU07QUFDNUMsZ0JBQVksRUFBRSxlQUFlLENBQUM7QUFBQSxFQUNoQyxHQUFHLENBQUMsZ0JBQWdCLFdBQVcsQ0FBQztBQUVoQyxRQUFNLHdCQUF3QiwwREFDNUIsaUJBQ0EsaUJBQ0EsbUJBQ0Y7QUFDQSx3REFBcUIscUJBQXFCO0FBRTFDLFNBQ0UsbURBQUM7QUFBQSxJQUFJLFdBQVU7QUFBQSxLQUNiLG1EQUFDO0FBQUEsSUFBSSxXQUFVO0FBQUEsS0FDYixtREFBQztBQUFBLElBQUksV0FBVTtBQUFBLEtBQ2IsbURBQUM7QUFBQSxJQUFJLFdBQVU7QUFBQSxLQUNiLG1EQUFDO0FBQUEsSUFDQztBQUFBLElBQ0E7QUFBQSxJQUNBLE9BQU87QUFBQSxJQUNQLE9BQU8sU0FBUywyQkFBYTtBQUFBLElBQzdCLFlBQVk7QUFBQSxJQUNaO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0EsTUFBTTtBQUFBLEdBQ1IsQ0FDRixHQUNBLG1EQUFDO0FBQUEsSUFBSSxXQUFVO0FBQUEsS0FDYixtREFBQztBQUFBLElBQUksV0FBVTtBQUFBLEtBQ1osVUFDSCxHQUNBLG1EQUFDO0FBQUEsSUFDQyxLQUFJO0FBQUEsSUFDSixXQUFVO0FBQUEsS0FFVCxXQUNILENBQ0YsQ0FDRixHQUNBLG1EQUFDO0FBQUEsSUFBSSxXQUFVO0FBQUEsS0FDYixtREFBQztBQUFBLElBQ0MsYUFBWTtBQUFBLElBQ1osU0FBUztBQUFBLElBQ1QsVUFBVTtBQUFBLElBQ1YsZ0JBQWdCLEtBQUssYUFBYTtBQUFBLEdBQ3BDLEdBQ0MsY0FDQyx3RkFDRSxtREFBQztBQUFBLElBQ0MsYUFBWTtBQUFBLElBQ1osU0FBUztBQUFBLElBQ1QsVUFBVTtBQUFBLElBQ1YsZ0JBQWdCLEtBQUssd0JBQXdCO0FBQUEsR0FDL0MsR0FDQSxtREFBQztBQUFBLElBQ0MsYUFBWTtBQUFBLElBQ1osU0FBUztBQUFBLElBQ1QsVUFBVTtBQUFBLElBQ1YsZ0JBQWdCLEtBQUssWUFBWTtBQUFBLEdBQ25DLENBQ0YsSUFFQSxtREFBQztBQUFBLElBQ0MsYUFBWTtBQUFBLElBQ1osU0FBUztBQUFBLElBQ1QsVUFBVTtBQUFBLElBQ1YsZ0JBQWdCLEtBQUssWUFBWTtBQUFBLEdBQ25DLENBRUosQ0FDRixDQUNGO0FBRUosR0ExSitCOyIsCiAgIm5hbWVzIjogW10KfQo=
