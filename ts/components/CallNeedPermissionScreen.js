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
var CallNeedPermissionScreen_exports = {};
__export(CallNeedPermissionScreen_exports, {
  CallNeedPermissionScreen: () => CallNeedPermissionScreen
});
module.exports = __toCommonJS(CallNeedPermissionScreen_exports);
var import_react = __toESM(require("react"));
var import_Colors = require("../types/Colors");
var import_Avatar = require("./Avatar");
var import_Intl = require("./Intl");
var import_ContactName = require("./conversation/ContactName");
const AUTO_CLOSE_MS = 1e4;
const CallNeedPermissionScreen = /* @__PURE__ */ __name(({
  conversation,
  i18n,
  close
}) => {
  const title = conversation.title || i18n("unknownContact");
  const autoCloseAtRef = (0, import_react.useRef)(Date.now() + AUTO_CLOSE_MS);
  (0, import_react.useEffect)(() => {
    const timeout = setTimeout(close, autoCloseAtRef.current - Date.now());
    return clearTimeout.bind(null, timeout);
  }, [autoCloseAtRef, close]);
  return /* @__PURE__ */ import_react.default.createElement("div", {
    className: "module-call-need-permission-screen"
  }, /* @__PURE__ */ import_react.default.createElement(import_Avatar.Avatar, {
    acceptedMessageRequest: conversation.acceptedMessageRequest,
    avatarPath: conversation.avatarPath,
    badge: void 0,
    color: conversation.color || import_Colors.AvatarColors[0],
    noteToSelf: false,
    conversationType: "direct",
    i18n,
    isMe: conversation.isMe,
    name: conversation.name,
    phoneNumber: conversation.phoneNumber,
    profileName: conversation.profileName,
    title: conversation.title,
    sharedGroupNames: conversation.sharedGroupNames,
    size: 112
  }), /* @__PURE__ */ import_react.default.createElement("p", {
    className: "module-call-need-permission-screen__text"
  }, /* @__PURE__ */ import_react.default.createElement(import_Intl.Intl, {
    i18n,
    id: "callNeedPermission",
    components: [/* @__PURE__ */ import_react.default.createElement(import_ContactName.ContactName, {
      title
    })]
  })), /* @__PURE__ */ import_react.default.createElement("button", {
    type: "button",
    className: "module-call-need-permission-screen__button",
    onClick: () => {
      close();
    }
  }, i18n("close")));
}, "CallNeedPermissionScreen");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CallNeedPermissionScreen
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ2FsbE5lZWRQZXJtaXNzaW9uU2NyZWVuLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjAtMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCBSZWFjdCwgeyB1c2VSZWYsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB0eXBlIHsgTG9jYWxpemVyVHlwZSB9IGZyb20gJy4uL3R5cGVzL1V0aWwnO1xuaW1wb3J0IHsgQXZhdGFyQ29sb3JzIH0gZnJvbSAnLi4vdHlwZXMvQ29sb3JzJztcbmltcG9ydCB7IEF2YXRhciB9IGZyb20gJy4vQXZhdGFyJztcbmltcG9ydCB7IEludGwgfSBmcm9tICcuL0ludGwnO1xuaW1wb3J0IHsgQ29udGFjdE5hbWUgfSBmcm9tICcuL2NvbnZlcnNhdGlvbi9Db250YWN0TmFtZSc7XG5pbXBvcnQgdHlwZSB7IENvbnZlcnNhdGlvblR5cGUgfSBmcm9tICcuLi9zdGF0ZS9kdWNrcy9jb252ZXJzYXRpb25zJztcblxudHlwZSBQcm9wcyA9IHtcbiAgY29udmVyc2F0aW9uOiBQaWNrPFxuICAgIENvbnZlcnNhdGlvblR5cGUsXG4gICAgfCAnYWNjZXB0ZWRNZXNzYWdlUmVxdWVzdCdcbiAgICB8ICdhdmF0YXJQYXRoJ1xuICAgIHwgJ2NvbG9yJ1xuICAgIHwgJ2lzTWUnXG4gICAgfCAnbmFtZSdcbiAgICB8ICdwaG9uZU51bWJlcidcbiAgICB8ICdwcm9maWxlTmFtZSdcbiAgICB8ICdzaGFyZWRHcm91cE5hbWVzJ1xuICAgIHwgJ3RpdGxlJ1xuICAgIHwgJ3VuYmx1cnJlZEF2YXRhclBhdGgnXG4gID47XG4gIGkxOG46IExvY2FsaXplclR5cGU7XG4gIGNsb3NlOiAoKSA9PiB2b2lkO1xufTtcblxuY29uc3QgQVVUT19DTE9TRV9NUyA9IDEwMDAwO1xuXG5leHBvcnQgY29uc3QgQ2FsbE5lZWRQZXJtaXNzaW9uU2NyZWVuOiBSZWFjdC5GQzxQcm9wcz4gPSAoe1xuICBjb252ZXJzYXRpb24sXG4gIGkxOG4sXG4gIGNsb3NlLFxufSkgPT4ge1xuICBjb25zdCB0aXRsZSA9IGNvbnZlcnNhdGlvbi50aXRsZSB8fCBpMThuKCd1bmtub3duQ29udGFjdCcpO1xuXG4gIGNvbnN0IGF1dG9DbG9zZUF0UmVmID0gdXNlUmVmPG51bWJlcj4oRGF0ZS5ub3coKSArIEFVVE9fQ0xPU0VfTVMpO1xuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IHRpbWVvdXQgPSBzZXRUaW1lb3V0KGNsb3NlLCBhdXRvQ2xvc2VBdFJlZi5jdXJyZW50IC0gRGF0ZS5ub3coKSk7XG4gICAgcmV0dXJuIGNsZWFyVGltZW91dC5iaW5kKG51bGwsIHRpbWVvdXQpO1xuICB9LCBbYXV0b0Nsb3NlQXRSZWYsIGNsb3NlXSk7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZHVsZS1jYWxsLW5lZWQtcGVybWlzc2lvbi1zY3JlZW5cIj5cbiAgICAgIDxBdmF0YXJcbiAgICAgICAgYWNjZXB0ZWRNZXNzYWdlUmVxdWVzdD17Y29udmVyc2F0aW9uLmFjY2VwdGVkTWVzc2FnZVJlcXVlc3R9XG4gICAgICAgIGF2YXRhclBhdGg9e2NvbnZlcnNhdGlvbi5hdmF0YXJQYXRofVxuICAgICAgICBiYWRnZT17dW5kZWZpbmVkfVxuICAgICAgICBjb2xvcj17Y29udmVyc2F0aW9uLmNvbG9yIHx8IEF2YXRhckNvbG9yc1swXX1cbiAgICAgICAgbm90ZVRvU2VsZj17ZmFsc2V9XG4gICAgICAgIGNvbnZlcnNhdGlvblR5cGU9XCJkaXJlY3RcIlxuICAgICAgICBpMThuPXtpMThufVxuICAgICAgICBpc01lPXtjb252ZXJzYXRpb24uaXNNZX1cbiAgICAgICAgbmFtZT17Y29udmVyc2F0aW9uLm5hbWV9XG4gICAgICAgIHBob25lTnVtYmVyPXtjb252ZXJzYXRpb24ucGhvbmVOdW1iZXJ9XG4gICAgICAgIHByb2ZpbGVOYW1lPXtjb252ZXJzYXRpb24ucHJvZmlsZU5hbWV9XG4gICAgICAgIHRpdGxlPXtjb252ZXJzYXRpb24udGl0bGV9XG4gICAgICAgIHNoYXJlZEdyb3VwTmFtZXM9e2NvbnZlcnNhdGlvbi5zaGFyZWRHcm91cE5hbWVzfVxuICAgICAgICBzaXplPXsxMTJ9XG4gICAgICAvPlxuXG4gICAgICA8cCBjbGFzc05hbWU9XCJtb2R1bGUtY2FsbC1uZWVkLXBlcm1pc3Npb24tc2NyZWVuX190ZXh0XCI+XG4gICAgICAgIDxJbnRsXG4gICAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgICBpZD1cImNhbGxOZWVkUGVybWlzc2lvblwiXG4gICAgICAgICAgY29tcG9uZW50cz17WzxDb250YWN0TmFtZSB0aXRsZT17dGl0bGV9IC8+XX1cbiAgICAgICAgLz5cbiAgICAgIDwvcD5cblxuICAgICAgPGJ1dHRvblxuICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgY2xhc3NOYW1lPVwibW9kdWxlLWNhbGwtbmVlZC1wZXJtaXNzaW9uLXNjcmVlbl9fYnV0dG9uXCJcbiAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgIGNsb3NlKCk7XG4gICAgICAgIH19XG4gICAgICA+XG4gICAgICAgIHtpMThuKCdjbG9zZScpfVxuICAgICAgPC9idXR0b24+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLG1CQUF5QztBQUV6QyxvQkFBNkI7QUFDN0Isb0JBQXVCO0FBQ3ZCLGtCQUFxQjtBQUNyQix5QkFBNEI7QUFxQjVCLE1BQU0sZ0JBQWdCO0FBRWYsTUFBTSwyQkFBNEMsd0JBQUM7QUFBQSxFQUN4RDtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsTUFDSTtBQUNKLFFBQU0sUUFBUSxhQUFhLFNBQVMsS0FBSyxnQkFBZ0I7QUFFekQsUUFBTSxpQkFBaUIseUJBQWUsS0FBSyxJQUFJLElBQUksYUFBYTtBQUNoRSw4QkFBVSxNQUFNO0FBQ2QsVUFBTSxVQUFVLFdBQVcsT0FBTyxlQUFlLFVBQVUsS0FBSyxJQUFJLENBQUM7QUFDckUsV0FBTyxhQUFhLEtBQUssTUFBTSxPQUFPO0FBQUEsRUFDeEMsR0FBRyxDQUFDLGdCQUFnQixLQUFLLENBQUM7QUFFMUIsU0FDRSxtREFBQztBQUFBLElBQUksV0FBVTtBQUFBLEtBQ2IsbURBQUM7QUFBQSxJQUNDLHdCQUF3QixhQUFhO0FBQUEsSUFDckMsWUFBWSxhQUFhO0FBQUEsSUFDekIsT0FBTztBQUFBLElBQ1AsT0FBTyxhQUFhLFNBQVMsMkJBQWE7QUFBQSxJQUMxQyxZQUFZO0FBQUEsSUFDWixrQkFBaUI7QUFBQSxJQUNqQjtBQUFBLElBQ0EsTUFBTSxhQUFhO0FBQUEsSUFDbkIsTUFBTSxhQUFhO0FBQUEsSUFDbkIsYUFBYSxhQUFhO0FBQUEsSUFDMUIsYUFBYSxhQUFhO0FBQUEsSUFDMUIsT0FBTyxhQUFhO0FBQUEsSUFDcEIsa0JBQWtCLGFBQWE7QUFBQSxJQUMvQixNQUFNO0FBQUEsR0FDUixHQUVBLG1EQUFDO0FBQUEsSUFBRSxXQUFVO0FBQUEsS0FDWCxtREFBQztBQUFBLElBQ0M7QUFBQSxJQUNBLElBQUc7QUFBQSxJQUNILFlBQVksQ0FBQyxtREFBQztBQUFBLE1BQVk7QUFBQSxLQUFjLENBQUU7QUFBQSxHQUM1QyxDQUNGLEdBRUEsbURBQUM7QUFBQSxJQUNDLE1BQUs7QUFBQSxJQUNMLFdBQVU7QUFBQSxJQUNWLFNBQVMsTUFBTTtBQUNiLFlBQU07QUFBQSxJQUNSO0FBQUEsS0FFQyxLQUFLLE9BQU8sQ0FDZixDQUNGO0FBRUosR0FuRHlEOyIsCiAgIm5hbWVzIjogW10KfQo=
