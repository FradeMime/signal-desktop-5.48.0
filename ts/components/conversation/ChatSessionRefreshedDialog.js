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
var ChatSessionRefreshedDialog_exports = {};
__export(ChatSessionRefreshedDialog_exports, {
  ChatSessionRefreshedDialog: () => ChatSessionRefreshedDialog
});
module.exports = __toCommonJS(ChatSessionRefreshedDialog_exports);
var React = __toESM(require("react"));
var import_classnames = __toESM(require("classnames"));
var import_Modal = require("../Modal");
var import_useRestoreFocus = require("../../hooks/useRestoreFocus");
function ChatSessionRefreshedDialog(props) {
  const { i18n, contactSupport, onClose } = props;
  const [focusRef] = (0, import_useRestoreFocus.useRestoreFocus)();
  return /* @__PURE__ */ React.createElement(import_Modal.Modal, {
    hasXButton: false,
    onClose,
    i18n
  }, /* @__PURE__ */ React.createElement("div", {
    className: "module-chat-session-refreshed-dialog"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "module-chat-session-refreshed-dialog__image"
  }, /* @__PURE__ */ React.createElement("img", {
    src: "images/chat-session-refresh.svg",
    height: "110",
    width: "200",
    alt: ""
  })), /* @__PURE__ */ React.createElement("div", {
    className: "module-chat-session-refreshed-dialog__title"
  }, i18n("ChatRefresh--notification")), /* @__PURE__ */ React.createElement("div", {
    className: "module-chat-session-refreshed-dialog__description"
  }, i18n("ChatRefresh--summary")), /* @__PURE__ */ React.createElement("div", {
    className: "module-chat-session-refreshed-dialog__buttons"
  }, /* @__PURE__ */ React.createElement("button", {
    type: "button",
    onClick: contactSupport,
    className: (0, import_classnames.default)("module-chat-session-refreshed-dialog__button", "module-chat-session-refreshed-dialog__button--secondary")
  }, i18n("ChatRefresh--contactSupport")), /* @__PURE__ */ React.createElement("button", {
    type: "button",
    onClick: onClose,
    ref: focusRef,
    className: "module-chat-session-refreshed-dialog__button"
  }, i18n("Confirmation--confirm")))));
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ChatSessionRefreshedDialog
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ2hhdFNlc3Npb25SZWZyZXNoZWREaWFsb2cudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5pbXBvcnQgeyBNb2RhbCB9IGZyb20gJy4uL01vZGFsJztcblxuaW1wb3J0IHsgdXNlUmVzdG9yZUZvY3VzIH0gZnJvbSAnLi4vLi4vaG9va3MvdXNlUmVzdG9yZUZvY3VzJztcblxuaW1wb3J0IHR5cGUgeyBMb2NhbGl6ZXJUeXBlIH0gZnJvbSAnLi4vLi4vdHlwZXMvVXRpbCc7XG5cbmV4cG9ydCB0eXBlIFByb3BzVHlwZSA9IHtcbiAgaTE4bjogTG9jYWxpemVyVHlwZTtcbiAgY29udGFjdFN1cHBvcnQ6ICgpID0+IHVua25vd247XG4gIG9uQ2xvc2U6ICgpID0+IHVua25vd247XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gQ2hhdFNlc3Npb25SZWZyZXNoZWREaWFsb2coXG4gIHByb3BzOiBQcm9wc1R5cGVcbik6IFJlYWN0LlJlYWN0RWxlbWVudCB7XG4gIGNvbnN0IHsgaTE4biwgY29udGFjdFN1cHBvcnQsIG9uQ2xvc2UgfSA9IHByb3BzO1xuXG4gIC8vIEZvY3VzIGZpcnN0IGJ1dHRvbiBhZnRlciBpbml0aWFsIHJlbmRlciwgcmVzdG9yZSBmb2N1cyBvbiB0ZWFyZG93blxuICBjb25zdCBbZm9jdXNSZWZdID0gdXNlUmVzdG9yZUZvY3VzKCk7XG5cbiAgcmV0dXJuIChcbiAgICA8TW9kYWwgaGFzWEJ1dHRvbj17ZmFsc2V9IG9uQ2xvc2U9e29uQ2xvc2V9IGkxOG49e2kxOG59PlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2R1bGUtY2hhdC1zZXNzaW9uLXJlZnJlc2hlZC1kaWFsb2dcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2R1bGUtY2hhdC1zZXNzaW9uLXJlZnJlc2hlZC1kaWFsb2dfX2ltYWdlXCI+XG4gICAgICAgICAgPGltZ1xuICAgICAgICAgICAgc3JjPVwiaW1hZ2VzL2NoYXQtc2Vzc2lvbi1yZWZyZXNoLnN2Z1wiXG4gICAgICAgICAgICBoZWlnaHQ9XCIxMTBcIlxuICAgICAgICAgICAgd2lkdGg9XCIyMDBcIlxuICAgICAgICAgICAgYWx0PVwiXCJcbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2R1bGUtY2hhdC1zZXNzaW9uLXJlZnJlc2hlZC1kaWFsb2dfX3RpdGxlXCI+XG4gICAgICAgICAge2kxOG4oJ0NoYXRSZWZyZXNoLS1ub3RpZmljYXRpb24nKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kdWxlLWNoYXQtc2Vzc2lvbi1yZWZyZXNoZWQtZGlhbG9nX19kZXNjcmlwdGlvblwiPlxuICAgICAgICAgIHtpMThuKCdDaGF0UmVmcmVzaC0tc3VtbWFyeScpfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2R1bGUtY2hhdC1zZXNzaW9uLXJlZnJlc2hlZC1kaWFsb2dfX2J1dHRvbnNcIj5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgIG9uQ2xpY2s9e2NvbnRhY3RTdXBwb3J0fVxuICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFxuICAgICAgICAgICAgICAnbW9kdWxlLWNoYXQtc2Vzc2lvbi1yZWZyZXNoZWQtZGlhbG9nX19idXR0b24nLFxuICAgICAgICAgICAgICAnbW9kdWxlLWNoYXQtc2Vzc2lvbi1yZWZyZXNoZWQtZGlhbG9nX19idXR0b24tLXNlY29uZGFyeSdcbiAgICAgICAgICAgICl9XG4gICAgICAgICAgPlxuICAgICAgICAgICAge2kxOG4oJ0NoYXRSZWZyZXNoLS1jb250YWN0U3VwcG9ydCcpfVxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgb25DbGljaz17b25DbG9zZX1cbiAgICAgICAgICAgIHJlZj17Zm9jdXNSZWZ9XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJtb2R1bGUtY2hhdC1zZXNzaW9uLXJlZnJlc2hlZC1kaWFsb2dfX2J1dHRvblwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAge2kxOG4oJ0NvbmZpcm1hdGlvbi0tY29uZmlybScpfVxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvTW9kYWw+XG4gICk7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsWUFBdUI7QUFDdkIsd0JBQXVCO0FBRXZCLG1CQUFzQjtBQUV0Qiw2QkFBZ0M7QUFVekIsb0NBQ0wsT0FDb0I7QUFDcEIsUUFBTSxFQUFFLE1BQU0sZ0JBQWdCLFlBQVk7QUFHMUMsUUFBTSxDQUFDLFlBQVksNENBQWdCO0FBRW5DLFNBQ0Usb0NBQUM7QUFBQSxJQUFNLFlBQVk7QUFBQSxJQUFPO0FBQUEsSUFBa0I7QUFBQSxLQUMxQyxvQ0FBQztBQUFBLElBQUksV0FBVTtBQUFBLEtBQ2Isb0NBQUM7QUFBQSxJQUFJLFdBQVU7QUFBQSxLQUNiLG9DQUFDO0FBQUEsSUFDQyxLQUFJO0FBQUEsSUFDSixRQUFPO0FBQUEsSUFDUCxPQUFNO0FBQUEsSUFDTixLQUFJO0FBQUEsR0FDTixDQUNGLEdBQ0Esb0NBQUM7QUFBQSxJQUFJLFdBQVU7QUFBQSxLQUNaLEtBQUssMkJBQTJCLENBQ25DLEdBQ0Esb0NBQUM7QUFBQSxJQUFJLFdBQVU7QUFBQSxLQUNaLEtBQUssc0JBQXNCLENBQzlCLEdBQ0Esb0NBQUM7QUFBQSxJQUFJLFdBQVU7QUFBQSxLQUNiLG9DQUFDO0FBQUEsSUFDQyxNQUFLO0FBQUEsSUFDTCxTQUFTO0FBQUEsSUFDVCxXQUFXLCtCQUNULGdEQUNBLHlEQUNGO0FBQUEsS0FFQyxLQUFLLDZCQUE2QixDQUNyQyxHQUNBLG9DQUFDO0FBQUEsSUFDQyxNQUFLO0FBQUEsSUFDTCxTQUFTO0FBQUEsSUFDVCxLQUFLO0FBQUEsSUFDTCxXQUFVO0FBQUEsS0FFVCxLQUFLLHVCQUF1QixDQUMvQixDQUNGLENBQ0YsQ0FDRjtBQUVKO0FBaERnQiIsCiAgIm5hbWVzIjogW10KfQo=
