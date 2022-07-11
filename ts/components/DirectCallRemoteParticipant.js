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
var DirectCallRemoteParticipant_exports = {};
__export(DirectCallRemoteParticipant_exports, {
  DirectCallRemoteParticipant: () => DirectCallRemoteParticipant
});
module.exports = __toCommonJS(DirectCallRemoteParticipant_exports);
var import_react = __toESM(require("react"));
var import_Colors = require("../types/Colors");
var import_Avatar = require("./Avatar");
const DirectCallRemoteParticipant = /* @__PURE__ */ __name(({
  conversation,
  hasRemoteVideo,
  i18n,
  setRendererCanvas
}) => {
  const remoteVideoRef = (0, import_react.useRef)(null);
  (0, import_react.useEffect)(() => {
    setRendererCanvas({ element: remoteVideoRef });
    return () => {
      setRendererCanvas({ element: void 0 });
    };
  }, [setRendererCanvas]);
  return hasRemoteVideo ? /* @__PURE__ */ import_react.default.createElement("canvas", {
    className: "module-ongoing-call__remote-video-enabled",
    ref: remoteVideoRef
  }) : renderAvatar(i18n, conversation);
}, "DirectCallRemoteParticipant");
function renderAvatar(i18n, {
  acceptedMessageRequest,
  avatarPath,
  color,
  isMe,
  name,
  phoneNumber,
  profileName,
  sharedGroupNames,
  title
}) {
  return /* @__PURE__ */ import_react.default.createElement("div", {
    className: "module-ongoing-call__remote-video-disabled"
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
    sharedGroupNames,
    size: 112
  }));
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DirectCallRemoteParticipant
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiRGlyZWN0Q2FsbFJlbW90ZVBhcnRpY2lwYW50LnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjAtMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCBSZWFjdCwgeyB1c2VSZWYsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB0eXBlIHsgU2V0UmVuZGVyZXJDYW52YXNUeXBlIH0gZnJvbSAnLi4vc3RhdGUvZHVja3MvY2FsbGluZyc7XG5pbXBvcnQgdHlwZSB7IENvbnZlcnNhdGlvblR5cGUgfSBmcm9tICcuLi9zdGF0ZS9kdWNrcy9jb252ZXJzYXRpb25zJztcbmltcG9ydCB0eXBlIHsgTG9jYWxpemVyVHlwZSB9IGZyb20gJy4uL3R5cGVzL1V0aWwnO1xuaW1wb3J0IHsgQXZhdGFyQ29sb3JzIH0gZnJvbSAnLi4vdHlwZXMvQ29sb3JzJztcbmltcG9ydCB7IEF2YXRhciB9IGZyb20gJy4vQXZhdGFyJztcblxudHlwZSBQcm9wc1R5cGUgPSB7XG4gIGNvbnZlcnNhdGlvbjogQ29udmVyc2F0aW9uVHlwZTtcbiAgaGFzUmVtb3RlVmlkZW86IGJvb2xlYW47XG4gIGkxOG46IExvY2FsaXplclR5cGU7XG4gIHNldFJlbmRlcmVyQ2FudmFzOiAoXzogU2V0UmVuZGVyZXJDYW52YXNUeXBlKSA9PiB2b2lkO1xufTtcblxuZXhwb3J0IGNvbnN0IERpcmVjdENhbGxSZW1vdGVQYXJ0aWNpcGFudDogUmVhY3QuRkM8UHJvcHNUeXBlPiA9ICh7XG4gIGNvbnZlcnNhdGlvbixcbiAgaGFzUmVtb3RlVmlkZW8sXG4gIGkxOG4sXG4gIHNldFJlbmRlcmVyQ2FudmFzLFxufSkgPT4ge1xuICBjb25zdCByZW1vdGVWaWRlb1JlZiA9IHVzZVJlZjxIVE1MQ2FudmFzRWxlbWVudCB8IG51bGw+KG51bGwpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgc2V0UmVuZGVyZXJDYW52YXMoeyBlbGVtZW50OiByZW1vdGVWaWRlb1JlZiB9KTtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgc2V0UmVuZGVyZXJDYW52YXMoeyBlbGVtZW50OiB1bmRlZmluZWQgfSk7XG4gICAgfTtcbiAgfSwgW3NldFJlbmRlcmVyQ2FudmFzXSk7XG5cbiAgcmV0dXJuIGhhc1JlbW90ZVZpZGVvID8gKFxuICAgIDxjYW52YXNcbiAgICAgIGNsYXNzTmFtZT1cIm1vZHVsZS1vbmdvaW5nLWNhbGxfX3JlbW90ZS12aWRlby1lbmFibGVkXCJcbiAgICAgIHJlZj17cmVtb3RlVmlkZW9SZWZ9XG4gICAgLz5cbiAgKSA6IChcbiAgICByZW5kZXJBdmF0YXIoaTE4biwgY29udmVyc2F0aW9uKVxuICApO1xufTtcblxuZnVuY3Rpb24gcmVuZGVyQXZhdGFyKFxuICBpMThuOiBMb2NhbGl6ZXJUeXBlLFxuICB7XG4gICAgYWNjZXB0ZWRNZXNzYWdlUmVxdWVzdCxcbiAgICBhdmF0YXJQYXRoLFxuICAgIGNvbG9yLFxuICAgIGlzTWUsXG4gICAgbmFtZSxcbiAgICBwaG9uZU51bWJlcixcbiAgICBwcm9maWxlTmFtZSxcbiAgICBzaGFyZWRHcm91cE5hbWVzLFxuICAgIHRpdGxlLFxuICB9OiBQaWNrPFxuICAgIENvbnZlcnNhdGlvblR5cGUsXG4gICAgfCAnYWNjZXB0ZWRNZXNzYWdlUmVxdWVzdCdcbiAgICB8ICdhdmF0YXJQYXRoJ1xuICAgIHwgJ2NvbG9yJ1xuICAgIHwgJ2lzTWUnXG4gICAgfCAnbmFtZSdcbiAgICB8ICdwaG9uZU51bWJlcidcbiAgICB8ICdwcm9maWxlTmFtZSdcbiAgICB8ICdzaGFyZWRHcm91cE5hbWVzJ1xuICAgIHwgJ3RpdGxlJ1xuICA+XG4pOiBKU1guRWxlbWVudCB7XG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJtb2R1bGUtb25nb2luZy1jYWxsX19yZW1vdGUtdmlkZW8tZGlzYWJsZWRcIj5cbiAgICAgIDxBdmF0YXJcbiAgICAgICAgYWNjZXB0ZWRNZXNzYWdlUmVxdWVzdD17YWNjZXB0ZWRNZXNzYWdlUmVxdWVzdH1cbiAgICAgICAgYXZhdGFyUGF0aD17YXZhdGFyUGF0aH1cbiAgICAgICAgYmFkZ2U9e3VuZGVmaW5lZH1cbiAgICAgICAgY29sb3I9e2NvbG9yIHx8IEF2YXRhckNvbG9yc1swXX1cbiAgICAgICAgbm90ZVRvU2VsZj17ZmFsc2V9XG4gICAgICAgIGNvbnZlcnNhdGlvblR5cGU9XCJkaXJlY3RcIlxuICAgICAgICBpMThuPXtpMThufVxuICAgICAgICBpc01lPXtpc01lfVxuICAgICAgICBuYW1lPXtuYW1lfVxuICAgICAgICBwaG9uZU51bWJlcj17cGhvbmVOdW1iZXJ9XG4gICAgICAgIHByb2ZpbGVOYW1lPXtwcm9maWxlTmFtZX1cbiAgICAgICAgdGl0bGU9e3RpdGxlfVxuICAgICAgICBzaGFyZWRHcm91cE5hbWVzPXtzaGFyZWRHcm91cE5hbWVzfVxuICAgICAgICBzaXplPXsxMTJ9XG4gICAgICAvPlxuICAgIDwvZGl2PlxuICApO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLG1CQUF5QztBQUl6QyxvQkFBNkI7QUFDN0Isb0JBQXVCO0FBU2hCLE1BQU0sOEJBQW1ELHdCQUFDO0FBQUEsRUFDL0Q7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxNQUNJO0FBQ0osUUFBTSxpQkFBaUIseUJBQWlDLElBQUk7QUFFNUQsOEJBQVUsTUFBTTtBQUNkLHNCQUFrQixFQUFFLFNBQVMsZUFBZSxDQUFDO0FBQzdDLFdBQU8sTUFBTTtBQUNYLHdCQUFrQixFQUFFLFNBQVMsT0FBVSxDQUFDO0FBQUEsSUFDMUM7QUFBQSxFQUNGLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQztBQUV0QixTQUFPLGlCQUNMLG1EQUFDO0FBQUEsSUFDQyxXQUFVO0FBQUEsSUFDVixLQUFLO0FBQUEsR0FDUCxJQUVBLGFBQWEsTUFBTSxZQUFZO0FBRW5DLEdBdkJnRTtBQXlCaEUsc0JBQ0UsTUFDQTtBQUFBLEVBQ0U7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEdBYVc7QUFDYixTQUNFLG1EQUFDO0FBQUEsSUFBSSxXQUFVO0FBQUEsS0FDYixtREFBQztBQUFBLElBQ0M7QUFBQSxJQUNBO0FBQUEsSUFDQSxPQUFPO0FBQUEsSUFDUCxPQUFPLFNBQVMsMkJBQWE7QUFBQSxJQUM3QixZQUFZO0FBQUEsSUFDWixrQkFBaUI7QUFBQSxJQUNqQjtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0EsTUFBTTtBQUFBLEdBQ1IsQ0FDRjtBQUVKO0FBN0NTIiwKICAibmFtZXMiOiBbXQp9Cg==
