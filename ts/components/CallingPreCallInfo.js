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
var CallingPreCallInfo_exports = {};
__export(CallingPreCallInfo_exports, {
  CallingPreCallInfo: () => CallingPreCallInfo,
  RingMode: () => RingMode
});
module.exports = __toCommonJS(CallingPreCallInfo_exports);
var import_react = __toESM(require("react"));
var import_Avatar = require("./Avatar");
var import_Emojify = require("./conversation/Emojify");
var import_callingGetParticipantName = require("../util/callingGetParticipantName");
var import_missingCaseError = require("../util/missingCaseError");
var RingMode = /* @__PURE__ */ ((RingMode2) => {
  RingMode2[RingMode2["WillNotRing"] = 0] = "WillNotRing";
  RingMode2[RingMode2["WillRing"] = 1] = "WillRing";
  RingMode2[RingMode2["IsRinging"] = 2] = "IsRinging";
  return RingMode2;
})(RingMode || {});
const CallingPreCallInfo = /* @__PURE__ */ __name(({
  conversation,
  groupMembers = [],
  i18n,
  isCallFull = false,
  me,
  peekedParticipants = [],
  ringMode
}) => {
  let subtitle;
  if (ringMode === 2 /* IsRinging */) {
    subtitle = i18n("outgoingCallRinging");
  } else if (isCallFull) {
    subtitle = i18n("calling__call-is-full");
  } else if (peekedParticipants.length) {
    let hasYou = false;
    const participantNames = peekedParticipants.map((participant) => {
      if (participant.uuid === me.uuid) {
        hasYou = true;
        return i18n("you");
      }
      return (0, import_callingGetParticipantName.getParticipantName)(participant);
    });
    switch (participantNames.length) {
      case 1:
        subtitle = hasYou ? i18n("calling__pre-call-info--another-device-in-call") : i18n("calling__pre-call-info--1-person-in-call", participantNames);
        break;
      case 2:
        subtitle = i18n("calling__pre-call-info--2-people-in-call", {
          first: participantNames[0],
          second: participantNames[1]
        });
        break;
      case 3:
        subtitle = i18n("calling__pre-call-info--3-people-in-call", {
          first: participantNames[0],
          second: participantNames[1],
          third: participantNames[2]
        });
        break;
      default:
        subtitle = i18n("calling__pre-call-info--many-people-in-call", {
          first: participantNames[0],
          second: participantNames[1],
          others: String(participantNames.length - 2)
        });
        break;
    }
  } else {
    let memberNames;
    switch (conversation.type) {
      case "direct":
        memberNames = [(0, import_callingGetParticipantName.getParticipantName)(conversation)];
        break;
      case "group":
        memberNames = groupMembers.filter((member) => member.id !== me.id).map(import_callingGetParticipantName.getParticipantName);
        break;
      default:
        throw (0, import_missingCaseError.missingCaseError)(conversation.type);
    }
    const ring = ringMode === 1 /* WillRing */;
    switch (memberNames.length) {
      case 0:
        subtitle = i18n("calling__pre-call-info--empty-group");
        break;
      case 1: {
        const i18nValues = [memberNames[0]];
        subtitle = ring ? i18n("calling__pre-call-info--will-ring-1", i18nValues) : i18n("calling__pre-call-info--will-notify-1", i18nValues);
        break;
      }
      case 2: {
        const i18nValues = {
          first: memberNames[0],
          second: memberNames[1]
        };
        subtitle = ring ? i18n("calling__pre-call-info--will-ring-2", i18nValues) : i18n("calling__pre-call-info--will-notify-2", i18nValues);
        break;
      }
      case 3: {
        const i18nValues = {
          first: memberNames[0],
          second: memberNames[1],
          third: memberNames[2]
        };
        subtitle = ring ? i18n("calling__pre-call-info--will-ring-3", i18nValues) : i18n("calling__pre-call-info--will-notify-3", i18nValues);
        break;
      }
      default: {
        const i18nValues = {
          first: memberNames[0],
          second: memberNames[1],
          others: String(memberNames.length - 2)
        };
        subtitle = ring ? i18n("calling__pre-call-info--will-ring-many", i18nValues) : i18n("calling__pre-call-info--will-notify-many", i18nValues);
        break;
      }
    }
  }
  return /* @__PURE__ */ import_react.default.createElement("div", {
    className: "module-CallingPreCallInfo"
  }, /* @__PURE__ */ import_react.default.createElement(import_Avatar.Avatar, {
    avatarPath: conversation.avatarPath,
    badge: void 0,
    color: conversation.color,
    acceptedMessageRequest: conversation.acceptedMessageRequest,
    conversationType: conversation.type,
    isMe: conversation.isMe,
    name: conversation.name,
    noteToSelf: false,
    phoneNumber: conversation.phoneNumber,
    profileName: conversation.profileName,
    sharedGroupNames: conversation.sharedGroupNames,
    size: import_Avatar.AvatarSize.ONE_HUNDRED_TWELVE,
    title: conversation.title,
    unblurredAvatarPath: conversation.unblurredAvatarPath,
    i18n
  }), /* @__PURE__ */ import_react.default.createElement("div", {
    className: "module-CallingPreCallInfo__title"
  }, /* @__PURE__ */ import_react.default.createElement(import_Emojify.Emojify, {
    text: conversation.title
  })), /* @__PURE__ */ import_react.default.createElement("div", {
    className: "module-CallingPreCallInfo__subtitle"
  }, subtitle));
}, "CallingPreCallInfo");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CallingPreCallInfo,
  RingMode
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ2FsbGluZ1ByZUNhbGxJbmZvLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgdHlwZSB7IEZ1bmN0aW9uQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB0eXBlIHsgQ29udmVyc2F0aW9uVHlwZSB9IGZyb20gJy4uL3N0YXRlL2R1Y2tzL2NvbnZlcnNhdGlvbnMnO1xuaW1wb3J0IHR5cGUgeyBMb2NhbGl6ZXJUeXBlIH0gZnJvbSAnLi4vdHlwZXMvVXRpbCc7XG5pbXBvcnQgeyBBdmF0YXIsIEF2YXRhclNpemUgfSBmcm9tICcuL0F2YXRhcic7XG5pbXBvcnQgeyBFbW9qaWZ5IH0gZnJvbSAnLi9jb252ZXJzYXRpb24vRW1vamlmeSc7XG5pbXBvcnQgeyBnZXRQYXJ0aWNpcGFudE5hbWUgfSBmcm9tICcuLi91dGlsL2NhbGxpbmdHZXRQYXJ0aWNpcGFudE5hbWUnO1xuaW1wb3J0IHsgbWlzc2luZ0Nhc2VFcnJvciB9IGZyb20gJy4uL3V0aWwvbWlzc2luZ0Nhc2VFcnJvcic7XG5cbmV4cG9ydCBlbnVtIFJpbmdNb2RlIHtcbiAgV2lsbE5vdFJpbmcsXG4gIFdpbGxSaW5nLFxuICBJc1JpbmdpbmcsXG59XG5cbnR5cGUgUHJvcHNUeXBlID0ge1xuICBjb252ZXJzYXRpb246IFBpY2s8XG4gICAgQ29udmVyc2F0aW9uVHlwZSxcbiAgICB8ICdhY2NlcHRlZE1lc3NhZ2VSZXF1ZXN0J1xuICAgIHwgJ2F2YXRhclBhdGgnXG4gICAgfCAnY29sb3InXG4gICAgfCAnaXNNZSdcbiAgICB8ICduYW1lJ1xuICAgIHwgJ3Bob25lTnVtYmVyJ1xuICAgIHwgJ3Byb2ZpbGVOYW1lJ1xuICAgIHwgJ3NoYXJlZEdyb3VwTmFtZXMnXG4gICAgfCAndGl0bGUnXG4gICAgfCAndHlwZSdcbiAgICB8ICd1bmJsdXJyZWRBdmF0YXJQYXRoJ1xuICA+O1xuICBpMThuOiBMb2NhbGl6ZXJUeXBlO1xuICBtZTogUGljazxDb252ZXJzYXRpb25UeXBlLCAnaWQnIHwgJ3V1aWQnPjtcbiAgcmluZ01vZGU6IFJpbmdNb2RlO1xuXG4gIC8vIFRoZSBmb2xsb3dpbmcgc2hvdWxkIG9ubHkgYmUgc2V0IGZvciBncm91cCBjb252ZXJzYXRpb25zLlxuICBncm91cE1lbWJlcnM/OiBBcnJheTxQaWNrPENvbnZlcnNhdGlvblR5cGUsICdpZCcgfCAnZmlyc3ROYW1lJyB8ICd0aXRsZSc+PjtcbiAgaXNDYWxsRnVsbD86IGJvb2xlYW47XG4gIHBlZWtlZFBhcnRpY2lwYW50cz86IEFycmF5PFxuICAgIFBpY2s8Q29udmVyc2F0aW9uVHlwZSwgJ2ZpcnN0TmFtZScgfCAndGl0bGUnIHwgJ3V1aWQnPlxuICA+O1xufTtcblxuZXhwb3J0IGNvbnN0IENhbGxpbmdQcmVDYWxsSW5mbzogRnVuY3Rpb25Db21wb25lbnQ8UHJvcHNUeXBlPiA9ICh7XG4gIGNvbnZlcnNhdGlvbixcbiAgZ3JvdXBNZW1iZXJzID0gW10sXG4gIGkxOG4sXG4gIGlzQ2FsbEZ1bGwgPSBmYWxzZSxcbiAgbWUsXG4gIHBlZWtlZFBhcnRpY2lwYW50cyA9IFtdLFxuICByaW5nTW9kZSxcbn0pID0+IHtcbiAgbGV0IHN1YnRpdGxlOiBzdHJpbmc7XG4gIGlmIChyaW5nTW9kZSA9PT0gUmluZ01vZGUuSXNSaW5naW5nKSB7XG4gICAgc3VidGl0bGUgPSBpMThuKCdvdXRnb2luZ0NhbGxSaW5naW5nJyk7XG4gIH0gZWxzZSBpZiAoaXNDYWxsRnVsbCkge1xuICAgIHN1YnRpdGxlID0gaTE4bignY2FsbGluZ19fY2FsbC1pcy1mdWxsJyk7XG4gIH0gZWxzZSBpZiAocGVla2VkUGFydGljaXBhbnRzLmxlbmd0aCkge1xuICAgIC8vIEl0IHNob3VsZCBiZSByYXJlIHRvIHNlZSB5b3Vyc2VsZiBpbiB0aGlzIGxpc3QsIGJ1dCBpdCdzIHBvc3NpYmxlIGlmICgxKSB5b3UgcmVqb2luXG4gICAgLy8gICBxdWlja2x5LCBjYXVzaW5nIHRoZSBzZXJ2ZXIgdG8gcmV0dXJuIHN0YWxlIHN0YXRlICgyKSB5b3UgaGF2ZSBqb2luZWQgb24gYW5vdGhlclxuICAgIC8vICAgZGV2aWNlLlxuICAgIGxldCBoYXNZb3UgPSBmYWxzZTtcbiAgICBjb25zdCBwYXJ0aWNpcGFudE5hbWVzID0gcGVla2VkUGFydGljaXBhbnRzLm1hcChwYXJ0aWNpcGFudCA9PiB7XG4gICAgICBpZiAocGFydGljaXBhbnQudXVpZCA9PT0gbWUudXVpZCkge1xuICAgICAgICBoYXNZb3UgPSB0cnVlO1xuICAgICAgICByZXR1cm4gaTE4bigneW91Jyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZ2V0UGFydGljaXBhbnROYW1lKHBhcnRpY2lwYW50KTtcbiAgICB9KTtcblxuICAgIHN3aXRjaCAocGFydGljaXBhbnROYW1lcy5sZW5ndGgpIHtcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgc3VidGl0bGUgPSBoYXNZb3VcbiAgICAgICAgICA/IGkxOG4oJ2NhbGxpbmdfX3ByZS1jYWxsLWluZm8tLWFub3RoZXItZGV2aWNlLWluLWNhbGwnKVxuICAgICAgICAgIDogaTE4bignY2FsbGluZ19fcHJlLWNhbGwtaW5mby0tMS1wZXJzb24taW4tY2FsbCcsIHBhcnRpY2lwYW50TmFtZXMpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgc3VidGl0bGUgPSBpMThuKCdjYWxsaW5nX19wcmUtY2FsbC1pbmZvLS0yLXBlb3BsZS1pbi1jYWxsJywge1xuICAgICAgICAgIGZpcnN0OiBwYXJ0aWNpcGFudE5hbWVzWzBdLFxuICAgICAgICAgIHNlY29uZDogcGFydGljaXBhbnROYW1lc1sxXSxcbiAgICAgICAgfSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzOlxuICAgICAgICBzdWJ0aXRsZSA9IGkxOG4oJ2NhbGxpbmdfX3ByZS1jYWxsLWluZm8tLTMtcGVvcGxlLWluLWNhbGwnLCB7XG4gICAgICAgICAgZmlyc3Q6IHBhcnRpY2lwYW50TmFtZXNbMF0sXG4gICAgICAgICAgc2Vjb25kOiBwYXJ0aWNpcGFudE5hbWVzWzFdLFxuICAgICAgICAgIHRoaXJkOiBwYXJ0aWNpcGFudE5hbWVzWzJdLFxuICAgICAgICB9KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBzdWJ0aXRsZSA9IGkxOG4oJ2NhbGxpbmdfX3ByZS1jYWxsLWluZm8tLW1hbnktcGVvcGxlLWluLWNhbGwnLCB7XG4gICAgICAgICAgZmlyc3Q6IHBhcnRpY2lwYW50TmFtZXNbMF0sXG4gICAgICAgICAgc2Vjb25kOiBwYXJ0aWNpcGFudE5hbWVzWzFdLFxuICAgICAgICAgIG90aGVyczogU3RyaW5nKHBhcnRpY2lwYW50TmFtZXMubGVuZ3RoIC0gMiksXG4gICAgICAgIH0pO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgbGV0IG1lbWJlck5hbWVzOiBBcnJheTxzdHJpbmc+O1xuICAgIHN3aXRjaCAoY29udmVyc2F0aW9uLnR5cGUpIHtcbiAgICAgIGNhc2UgJ2RpcmVjdCc6XG4gICAgICAgIG1lbWJlck5hbWVzID0gW2dldFBhcnRpY2lwYW50TmFtZShjb252ZXJzYXRpb24pXTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdncm91cCc6XG4gICAgICAgIG1lbWJlck5hbWVzID0gZ3JvdXBNZW1iZXJzXG4gICAgICAgICAgLmZpbHRlcihtZW1iZXIgPT4gbWVtYmVyLmlkICE9PSBtZS5pZClcbiAgICAgICAgICAubWFwKGdldFBhcnRpY2lwYW50TmFtZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhyb3cgbWlzc2luZ0Nhc2VFcnJvcihjb252ZXJzYXRpb24udHlwZSk7XG4gICAgfVxuXG4gICAgY29uc3QgcmluZyA9IHJpbmdNb2RlID09PSBSaW5nTW9kZS5XaWxsUmluZztcblxuICAgIHN3aXRjaCAobWVtYmVyTmFtZXMubGVuZ3RoKSB7XG4gICAgICBjYXNlIDA6XG4gICAgICAgIHN1YnRpdGxlID0gaTE4bignY2FsbGluZ19fcHJlLWNhbGwtaW5mby0tZW1wdHktZ3JvdXAnKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDE6IHtcbiAgICAgICAgY29uc3QgaTE4blZhbHVlcyA9IFttZW1iZXJOYW1lc1swXV07XG4gICAgICAgIHN1YnRpdGxlID0gcmluZ1xuICAgICAgICAgID8gaTE4bignY2FsbGluZ19fcHJlLWNhbGwtaW5mby0td2lsbC1yaW5nLTEnLCBpMThuVmFsdWVzKVxuICAgICAgICAgIDogaTE4bignY2FsbGluZ19fcHJlLWNhbGwtaW5mby0td2lsbC1ub3RpZnktMScsIGkxOG5WYWx1ZXMpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgMjoge1xuICAgICAgICBjb25zdCBpMThuVmFsdWVzID0ge1xuICAgICAgICAgIGZpcnN0OiBtZW1iZXJOYW1lc1swXSxcbiAgICAgICAgICBzZWNvbmQ6IG1lbWJlck5hbWVzWzFdLFxuICAgICAgICB9O1xuICAgICAgICBzdWJ0aXRsZSA9IHJpbmdcbiAgICAgICAgICA/IGkxOG4oJ2NhbGxpbmdfX3ByZS1jYWxsLWluZm8tLXdpbGwtcmluZy0yJywgaTE4blZhbHVlcylcbiAgICAgICAgICA6IGkxOG4oJ2NhbGxpbmdfX3ByZS1jYWxsLWluZm8tLXdpbGwtbm90aWZ5LTInLCBpMThuVmFsdWVzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIDM6IHtcbiAgICAgICAgY29uc3QgaTE4blZhbHVlcyA9IHtcbiAgICAgICAgICBmaXJzdDogbWVtYmVyTmFtZXNbMF0sXG4gICAgICAgICAgc2Vjb25kOiBtZW1iZXJOYW1lc1sxXSxcbiAgICAgICAgICB0aGlyZDogbWVtYmVyTmFtZXNbMl0sXG4gICAgICAgIH07XG4gICAgICAgIHN1YnRpdGxlID0gcmluZ1xuICAgICAgICAgID8gaTE4bignY2FsbGluZ19fcHJlLWNhbGwtaW5mby0td2lsbC1yaW5nLTMnLCBpMThuVmFsdWVzKVxuICAgICAgICAgIDogaTE4bignY2FsbGluZ19fcHJlLWNhbGwtaW5mby0td2lsbC1ub3RpZnktMycsIGkxOG5WYWx1ZXMpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgY29uc3QgaTE4blZhbHVlcyA9IHtcbiAgICAgICAgICBmaXJzdDogbWVtYmVyTmFtZXNbMF0sXG4gICAgICAgICAgc2Vjb25kOiBtZW1iZXJOYW1lc1sxXSxcbiAgICAgICAgICBvdGhlcnM6IFN0cmluZyhtZW1iZXJOYW1lcy5sZW5ndGggLSAyKSxcbiAgICAgICAgfTtcbiAgICAgICAgc3VidGl0bGUgPSByaW5nXG4gICAgICAgICAgPyBpMThuKCdjYWxsaW5nX19wcmUtY2FsbC1pbmZvLS13aWxsLXJpbmctbWFueScsIGkxOG5WYWx1ZXMpXG4gICAgICAgICAgOiBpMThuKCdjYWxsaW5nX19wcmUtY2FsbC1pbmZvLS13aWxsLW5vdGlmeS1tYW55JywgaTE4blZhbHVlcyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJtb2R1bGUtQ2FsbGluZ1ByZUNhbGxJbmZvXCI+XG4gICAgICA8QXZhdGFyXG4gICAgICAgIGF2YXRhclBhdGg9e2NvbnZlcnNhdGlvbi5hdmF0YXJQYXRofVxuICAgICAgICBiYWRnZT17dW5kZWZpbmVkfVxuICAgICAgICBjb2xvcj17Y29udmVyc2F0aW9uLmNvbG9yfVxuICAgICAgICBhY2NlcHRlZE1lc3NhZ2VSZXF1ZXN0PXtjb252ZXJzYXRpb24uYWNjZXB0ZWRNZXNzYWdlUmVxdWVzdH1cbiAgICAgICAgY29udmVyc2F0aW9uVHlwZT17Y29udmVyc2F0aW9uLnR5cGV9XG4gICAgICAgIGlzTWU9e2NvbnZlcnNhdGlvbi5pc01lfVxuICAgICAgICBuYW1lPXtjb252ZXJzYXRpb24ubmFtZX1cbiAgICAgICAgbm90ZVRvU2VsZj17ZmFsc2V9XG4gICAgICAgIHBob25lTnVtYmVyPXtjb252ZXJzYXRpb24ucGhvbmVOdW1iZXJ9XG4gICAgICAgIHByb2ZpbGVOYW1lPXtjb252ZXJzYXRpb24ucHJvZmlsZU5hbWV9XG4gICAgICAgIHNoYXJlZEdyb3VwTmFtZXM9e2NvbnZlcnNhdGlvbi5zaGFyZWRHcm91cE5hbWVzfVxuICAgICAgICBzaXplPXtBdmF0YXJTaXplLk9ORV9IVU5EUkVEX1RXRUxWRX1cbiAgICAgICAgdGl0bGU9e2NvbnZlcnNhdGlvbi50aXRsZX1cbiAgICAgICAgdW5ibHVycmVkQXZhdGFyUGF0aD17Y29udmVyc2F0aW9uLnVuYmx1cnJlZEF2YXRhclBhdGh9XG4gICAgICAgIGkxOG49e2kxOG59XG4gICAgICAvPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2R1bGUtQ2FsbGluZ1ByZUNhbGxJbmZvX190aXRsZVwiPlxuICAgICAgICA8RW1vamlmeSB0ZXh0PXtjb252ZXJzYXRpb24udGl0bGV9IC8+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kdWxlLUNhbGxpbmdQcmVDYWxsSW5mb19fc3VidGl0bGVcIj57c3VidGl0bGV9PC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSUEsbUJBQWtCO0FBR2xCLG9CQUFtQztBQUNuQyxxQkFBd0I7QUFDeEIsdUNBQW1DO0FBQ25DLDhCQUFpQztBQUUxQixJQUFLLFdBQUwsa0JBQUssY0FBTDtBQUNMO0FBQ0E7QUFDQTtBQUhVO0FBQUE7QUFpQ0wsTUFBTSxxQkFBbUQsd0JBQUM7QUFBQSxFQUMvRDtBQUFBLEVBQ0EsZUFBZSxDQUFDO0FBQUEsRUFDaEI7QUFBQSxFQUNBLGFBQWE7QUFBQSxFQUNi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
