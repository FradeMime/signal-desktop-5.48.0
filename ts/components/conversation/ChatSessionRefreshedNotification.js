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
var ChatSessionRefreshedNotification_exports = {};
__export(ChatSessionRefreshedNotification_exports, {
  ChatSessionRefreshedNotification: () => ChatSessionRefreshedNotification
});
module.exports = __toCommonJS(ChatSessionRefreshedNotification_exports);
var import_react = __toESM(require("react"));
var import_Button = require("../Button");
var import_SystemMessage = require("./SystemMessage");
var import_ChatSessionRefreshedDialog = require("./ChatSessionRefreshedDialog");
function ChatSessionRefreshedNotification(props) {
  const { contactSupport, i18n } = props;
  const [isDialogOpen, setIsDialogOpen] = (0, import_react.useState)(false);
  const openDialog = (0, import_react.useCallback)(() => {
    setIsDialogOpen(true);
  }, [setIsDialogOpen]);
  const closeDialog = (0, import_react.useCallback)(() => {
    setIsDialogOpen(false);
  }, [setIsDialogOpen]);
  const wrappedContactSupport = (0, import_react.useCallback)(() => {
    setIsDialogOpen(false);
    contactSupport();
  }, [contactSupport, setIsDialogOpen]);
  return /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement(import_SystemMessage.SystemMessage, {
    contents: i18n("ChatRefresh--notification"),
    button: /* @__PURE__ */ import_react.default.createElement(import_Button.Button, {
      onClick: openDialog,
      size: import_Button.ButtonSize.Small,
      variant: import_Button.ButtonVariant.SystemMessage
    }, i18n("ChatRefresh--learnMore")),
    icon: "session-refresh"
  }), isDialogOpen ? /* @__PURE__ */ import_react.default.createElement(import_ChatSessionRefreshedDialog.ChatSessionRefreshedDialog, {
    onClose: closeDialog,
    contactSupport: wrappedContactSupport,
    i18n
  }) : null);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ChatSessionRefreshedNotification
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ2hhdFNlc3Npb25SZWZyZXNoZWROb3RpZmljYXRpb24udHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB0eXBlIHsgUmVhY3RFbGVtZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0LCB7IHVzZUNhbGxiYWNrLCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHR5cGUgeyBMb2NhbGl6ZXJUeXBlIH0gZnJvbSAnLi4vLi4vdHlwZXMvVXRpbCc7XG5cbmltcG9ydCB7IEJ1dHRvbiwgQnV0dG9uU2l6ZSwgQnV0dG9uVmFyaWFudCB9IGZyb20gJy4uL0J1dHRvbic7XG5pbXBvcnQgeyBTeXN0ZW1NZXNzYWdlIH0gZnJvbSAnLi9TeXN0ZW1NZXNzYWdlJztcbmltcG9ydCB7IENoYXRTZXNzaW9uUmVmcmVzaGVkRGlhbG9nIH0gZnJvbSAnLi9DaGF0U2Vzc2lvblJlZnJlc2hlZERpYWxvZyc7XG5cbnR5cGUgUHJvcHNIb3VzZWtlZXBpbmdUeXBlID0ge1xuICBpMThuOiBMb2NhbGl6ZXJUeXBlO1xufTtcblxuZXhwb3J0IHR5cGUgUHJvcHNBY3Rpb25zVHlwZSA9IHtcbiAgY29udGFjdFN1cHBvcnQ6ICgpID0+IHVua25vd247XG59O1xuXG5leHBvcnQgdHlwZSBQcm9wc1R5cGUgPSBQcm9wc0hvdXNla2VlcGluZ1R5cGUgJiBQcm9wc0FjdGlvbnNUeXBlO1xuXG5leHBvcnQgZnVuY3Rpb24gQ2hhdFNlc3Npb25SZWZyZXNoZWROb3RpZmljYXRpb24oXG4gIHByb3BzOiBQcm9wc1R5cGVcbik6IFJlYWN0RWxlbWVudCB7XG4gIGNvbnN0IHsgY29udGFjdFN1cHBvcnQsIGkxOG4gfSA9IHByb3BzO1xuICBjb25zdCBbaXNEaWFsb2dPcGVuLCBzZXRJc0RpYWxvZ09wZW5dID0gdXNlU3RhdGU8Ym9vbGVhbj4oZmFsc2UpO1xuXG4gIGNvbnN0IG9wZW5EaWFsb2cgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgc2V0SXNEaWFsb2dPcGVuKHRydWUpO1xuICB9LCBbc2V0SXNEaWFsb2dPcGVuXSk7XG4gIGNvbnN0IGNsb3NlRGlhbG9nID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIHNldElzRGlhbG9nT3BlbihmYWxzZSk7XG4gIH0sIFtzZXRJc0RpYWxvZ09wZW5dKTtcblxuICBjb25zdCB3cmFwcGVkQ29udGFjdFN1cHBvcnQgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgc2V0SXNEaWFsb2dPcGVuKGZhbHNlKTtcbiAgICBjb250YWN0U3VwcG9ydCgpO1xuICB9LCBbY29udGFjdFN1cHBvcnQsIHNldElzRGlhbG9nT3Blbl0pO1xuXG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIDxTeXN0ZW1NZXNzYWdlXG4gICAgICAgIGNvbnRlbnRzPXtpMThuKCdDaGF0UmVmcmVzaC0tbm90aWZpY2F0aW9uJyl9XG4gICAgICAgIGJ1dHRvbj17XG4gICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17b3BlbkRpYWxvZ31cbiAgICAgICAgICAgIHNpemU9e0J1dHRvblNpemUuU21hbGx9XG4gICAgICAgICAgICB2YXJpYW50PXtCdXR0b25WYXJpYW50LlN5c3RlbU1lc3NhZ2V9XG4gICAgICAgICAgPlxuICAgICAgICAgICAge2kxOG4oJ0NoYXRSZWZyZXNoLS1sZWFybk1vcmUnKX1cbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgfVxuICAgICAgICBpY29uPVwic2Vzc2lvbi1yZWZyZXNoXCJcbiAgICAgIC8+XG4gICAgICB7aXNEaWFsb2dPcGVuID8gKFxuICAgICAgICA8Q2hhdFNlc3Npb25SZWZyZXNoZWREaWFsb2dcbiAgICAgICAgICBvbkNsb3NlPXtjbG9zZURpYWxvZ31cbiAgICAgICAgICBjb250YWN0U3VwcG9ydD17d3JhcHBlZENvbnRhY3RTdXBwb3J0fVxuICAgICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgIC8+XG4gICAgICApIDogbnVsbH1cbiAgICA8Lz5cbiAgKTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFJQSxtQkFBNkM7QUFJN0Msb0JBQWtEO0FBQ2xELDJCQUE4QjtBQUM5Qix3Q0FBMkM7QUFZcEMsMENBQ0wsT0FDYztBQUNkLFFBQU0sRUFBRSxnQkFBZ0IsU0FBUztBQUNqQyxRQUFNLENBQUMsY0FBYyxtQkFBbUIsMkJBQWtCLEtBQUs7QUFFL0QsUUFBTSxhQUFhLDhCQUFZLE1BQU07QUFDbkMsb0JBQWdCLElBQUk7QUFBQSxFQUN0QixHQUFHLENBQUMsZUFBZSxDQUFDO0FBQ3BCLFFBQU0sY0FBYyw4QkFBWSxNQUFNO0FBQ3BDLG9CQUFnQixLQUFLO0FBQUEsRUFDdkIsR0FBRyxDQUFDLGVBQWUsQ0FBQztBQUVwQixRQUFNLHdCQUF3Qiw4QkFBWSxNQUFNO0FBQzlDLG9CQUFnQixLQUFLO0FBQ3JCLG1CQUFlO0FBQUEsRUFDakIsR0FBRyxDQUFDLGdCQUFnQixlQUFlLENBQUM7QUFFcEMsU0FDRSx3RkFDRSxtREFBQztBQUFBLElBQ0MsVUFBVSxLQUFLLDJCQUEyQjtBQUFBLElBQzFDLFFBQ0UsbURBQUM7QUFBQSxNQUNDLFNBQVM7QUFBQSxNQUNULE1BQU0seUJBQVc7QUFBQSxNQUNqQixTQUFTLDRCQUFjO0FBQUEsT0FFdEIsS0FBSyx3QkFBd0IsQ0FDaEM7QUFBQSxJQUVGLE1BQUs7QUFBQSxHQUNQLEdBQ0MsZUFDQyxtREFBQztBQUFBLElBQ0MsU0FBUztBQUFBLElBQ1QsZ0JBQWdCO0FBQUEsSUFDaEI7QUFBQSxHQUNGLElBQ0UsSUFDTjtBQUVKO0FBMUNnQiIsCiAgIm5hbWVzIjogW10KfQo=
