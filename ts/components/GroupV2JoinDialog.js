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
var GroupV2JoinDialog_exports = {};
__export(GroupV2JoinDialog_exports, {
  GroupV2JoinDialog: () => GroupV2JoinDialog
});
module.exports = __toCommonJS(GroupV2JoinDialog_exports);
var React = __toESM(require("react"));
var import_classnames = __toESM(require("classnames"));
var import_Avatar = require("./Avatar");
var import_Spinner = require("./Spinner");
var import_Button = require("./Button");
var import_GroupDescription = require("./conversation/GroupDescription");
function focusRef(el) {
  if (el) {
    el.focus();
  }
}
const GroupV2JoinDialog = React.memo((props) => {
  const [isWorking, setIsWorking] = React.useState(false);
  const [isJoining, setIsJoining] = React.useState(false);
  const {
    approvalRequired,
    avatar,
    groupDescription,
    i18n,
    join,
    memberCount,
    onClose,
    title
  } = props;
  const joinString = approvalRequired ? i18n("GroupV2--join--request-to-join-button") : i18n("GroupV2--join--join-button");
  const memberString = memberCount === 1 ? i18n("GroupV2--join--member-count--single") : i18n("GroupV2--join--member-count--multiple", {
    count: memberCount.toString()
  });
  const wrappedJoin = React.useCallback(() => {
    setIsWorking(true);
    setIsJoining(true);
    join();
  }, [join, setIsJoining, setIsWorking]);
  const wrappedClose = React.useCallback(() => {
    setIsWorking(true);
    onClose();
  }, [onClose, setIsWorking]);
  return /* @__PURE__ */ React.createElement("div", {
    className: "module-group-v2-join-dialog"
  }, /* @__PURE__ */ React.createElement("button", {
    "aria-label": i18n("close"),
    type: "button",
    disabled: isWorking,
    className: "module-group-v2-join-dialog__close-button",
    onClick: wrappedClose
  }), /* @__PURE__ */ React.createElement("div", {
    className: "module-group-v2-join-dialog__avatar"
  }, /* @__PURE__ */ React.createElement(import_Avatar.Avatar, {
    acceptedMessageRequest: false,
    avatarPath: avatar ? avatar.url : void 0,
    badge: void 0,
    blur: import_Avatar.AvatarBlur.NoBlur,
    loading: avatar && !avatar.url,
    conversationType: "group",
    title,
    isMe: false,
    sharedGroupNames: [],
    size: 80,
    i18n
  })), /* @__PURE__ */ React.createElement("div", {
    className: "module-group-v2-join-dialog__title"
  }, title), /* @__PURE__ */ React.createElement("div", {
    className: "module-group-v2-join-dialog__metadata"
  }, i18n("GroupV2--join--group-metadata", [memberString])), groupDescription && /* @__PURE__ */ React.createElement("div", {
    className: "module-group-v2-join-dialog__description"
  }, /* @__PURE__ */ React.createElement(import_GroupDescription.GroupDescription, {
    i18n,
    title,
    text: groupDescription
  })), approvalRequired ? /* @__PURE__ */ React.createElement("div", {
    className: "module-group-v2-join-dialog__prompt--approval"
  }, i18n("GroupV2--join--prompt-with-approval")) : /* @__PURE__ */ React.createElement("div", {
    className: "module-group-v2-join-dialog__prompt"
  }, i18n("GroupV2--join--prompt")), /* @__PURE__ */ React.createElement("div", {
    className: "module-group-v2-join-dialog__buttons"
  }, /* @__PURE__ */ React.createElement(import_Button.Button, {
    className: (0, import_classnames.default)("module-group-v2-join-dialog__button", "module-group-v2-join-dialog__button--secondary"),
    disabled: isWorking,
    onClick: wrappedClose,
    variant: import_Button.ButtonVariant.Secondary
  }, i18n("cancel")), /* @__PURE__ */ React.createElement(import_Button.Button, {
    className: "module-group-v2-join-dialog__button",
    disabled: isWorking,
    ref: focusRef,
    onClick: wrappedJoin,
    variant: import_Button.ButtonVariant.Primary
  }, isJoining ? /* @__PURE__ */ React.createElement(import_Spinner.Spinner, {
    size: "20px",
    svgSize: "small",
    direction: "on-avatar"
  }) : joinString)));
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GroupV2JoinDialog
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiR3JvdXBWMkpvaW5EaWFsb2cudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IHR5cGUgeyBMb2NhbGl6ZXJUeXBlIH0gZnJvbSAnLi4vdHlwZXMvVXRpbCc7XG5pbXBvcnQgeyBBdmF0YXIsIEF2YXRhckJsdXIgfSBmcm9tICcuL0F2YXRhcic7XG5pbXBvcnQgeyBTcGlubmVyIH0gZnJvbSAnLi9TcGlubmVyJztcbmltcG9ydCB7IEJ1dHRvbiwgQnV0dG9uVmFyaWFudCB9IGZyb20gJy4vQnV0dG9uJztcbmltcG9ydCB7IEdyb3VwRGVzY3JpcHRpb24gfSBmcm9tICcuL2NvbnZlcnNhdGlvbi9Hcm91cERlc2NyaXB0aW9uJztcblxuaW1wb3J0IHR5cGUgeyBQcmVKb2luQ29udmVyc2F0aW9uVHlwZSB9IGZyb20gJy4uL3N0YXRlL2R1Y2tzL2NvbnZlcnNhdGlvbnMnO1xuXG50eXBlIENhbGxiYWNrVHlwZSA9ICgpID0+IHVua25vd247XG5cbmV4cG9ydCB0eXBlIERhdGFQcm9wc1R5cGUgPSBQcmVKb2luQ29udmVyc2F0aW9uVHlwZSAmIHtcbiAgcmVhZG9ubHkgam9pbjogQ2FsbGJhY2tUeXBlO1xuICByZWFkb25seSBvbkNsb3NlOiBDYWxsYmFja1R5cGU7XG59O1xuXG5leHBvcnQgdHlwZSBIb3VzZWtlZXBpbmdQcm9wc1R5cGUgPSB7XG4gIHJlYWRvbmx5IGkxOG46IExvY2FsaXplclR5cGU7XG59O1xuXG5leHBvcnQgdHlwZSBQcm9wc1R5cGUgPSBEYXRhUHJvcHNUeXBlICYgSG91c2VrZWVwaW5nUHJvcHNUeXBlO1xuXG5mdW5jdGlvbiBmb2N1c1JlZihlbDogSFRNTEVsZW1lbnQgfCBudWxsKSB7XG4gIGlmIChlbCkge1xuICAgIGVsLmZvY3VzKCk7XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IEdyb3VwVjJKb2luRGlhbG9nID0gUmVhY3QubWVtbygocHJvcHM6IFByb3BzVHlwZSkgPT4ge1xuICBjb25zdCBbaXNXb3JraW5nLCBzZXRJc1dvcmtpbmddID0gUmVhY3QudXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbaXNKb2luaW5nLCBzZXRJc0pvaW5pbmddID0gUmVhY3QudXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCB7XG4gICAgYXBwcm92YWxSZXF1aXJlZCxcbiAgICBhdmF0YXIsXG4gICAgZ3JvdXBEZXNjcmlwdGlvbixcbiAgICBpMThuLFxuICAgIGpvaW4sXG4gICAgbWVtYmVyQ291bnQsXG4gICAgb25DbG9zZSxcbiAgICB0aXRsZSxcbiAgfSA9IHByb3BzO1xuXG4gIGNvbnN0IGpvaW5TdHJpbmcgPSBhcHByb3ZhbFJlcXVpcmVkXG4gICAgPyBpMThuKCdHcm91cFYyLS1qb2luLS1yZXF1ZXN0LXRvLWpvaW4tYnV0dG9uJylcbiAgICA6IGkxOG4oJ0dyb3VwVjItLWpvaW4tLWpvaW4tYnV0dG9uJyk7XG4gIGNvbnN0IG1lbWJlclN0cmluZyA9XG4gICAgbWVtYmVyQ291bnQgPT09IDFcbiAgICAgID8gaTE4bignR3JvdXBWMi0tam9pbi0tbWVtYmVyLWNvdW50LS1zaW5nbGUnKVxuICAgICAgOiBpMThuKCdHcm91cFYyLS1qb2luLS1tZW1iZXItY291bnQtLW11bHRpcGxlJywge1xuICAgICAgICAgIGNvdW50OiBtZW1iZXJDb3VudC50b1N0cmluZygpLFxuICAgICAgICB9KTtcblxuICBjb25zdCB3cmFwcGVkSm9pbiA9IFJlYWN0LnVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBzZXRJc1dvcmtpbmcodHJ1ZSk7XG4gICAgc2V0SXNKb2luaW5nKHRydWUpO1xuICAgIGpvaW4oKTtcbiAgfSwgW2pvaW4sIHNldElzSm9pbmluZywgc2V0SXNXb3JraW5nXSk7XG5cbiAgY29uc3Qgd3JhcHBlZENsb3NlID0gUmVhY3QudXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIHNldElzV29ya2luZyh0cnVlKTtcbiAgICBvbkNsb3NlKCk7XG4gIH0sIFtvbkNsb3NlLCBzZXRJc1dvcmtpbmddKTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kdWxlLWdyb3VwLXYyLWpvaW4tZGlhbG9nXCI+XG4gICAgICA8YnV0dG9uXG4gICAgICAgIGFyaWEtbGFiZWw9e2kxOG4oJ2Nsb3NlJyl9XG4gICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICBkaXNhYmxlZD17aXNXb3JraW5nfVxuICAgICAgICBjbGFzc05hbWU9XCJtb2R1bGUtZ3JvdXAtdjItam9pbi1kaWFsb2dfX2Nsb3NlLWJ1dHRvblwiXG4gICAgICAgIG9uQ2xpY2s9e3dyYXBwZWRDbG9zZX1cbiAgICAgIC8+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZHVsZS1ncm91cC12Mi1qb2luLWRpYWxvZ19fYXZhdGFyXCI+XG4gICAgICAgIDxBdmF0YXJcbiAgICAgICAgICBhY2NlcHRlZE1lc3NhZ2VSZXF1ZXN0PXtmYWxzZX1cbiAgICAgICAgICBhdmF0YXJQYXRoPXthdmF0YXIgPyBhdmF0YXIudXJsIDogdW5kZWZpbmVkfVxuICAgICAgICAgIGJhZGdlPXt1bmRlZmluZWR9XG4gICAgICAgICAgYmx1cj17QXZhdGFyQmx1ci5Ob0JsdXJ9XG4gICAgICAgICAgbG9hZGluZz17YXZhdGFyICYmICFhdmF0YXIudXJsfVxuICAgICAgICAgIGNvbnZlcnNhdGlvblR5cGU9XCJncm91cFwiXG4gICAgICAgICAgdGl0bGU9e3RpdGxlfVxuICAgICAgICAgIGlzTWU9e2ZhbHNlfVxuICAgICAgICAgIHNoYXJlZEdyb3VwTmFtZXM9e1tdfVxuICAgICAgICAgIHNpemU9ezgwfVxuICAgICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kdWxlLWdyb3VwLXYyLWpvaW4tZGlhbG9nX190aXRsZVwiPnt0aXRsZX08L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kdWxlLWdyb3VwLXYyLWpvaW4tZGlhbG9nX19tZXRhZGF0YVwiPlxuICAgICAgICB7aTE4bignR3JvdXBWMi0tam9pbi0tZ3JvdXAtbWV0YWRhdGEnLCBbbWVtYmVyU3RyaW5nXSl9XG4gICAgICA8L2Rpdj5cbiAgICAgIHtncm91cERlc2NyaXB0aW9uICYmIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2R1bGUtZ3JvdXAtdjItam9pbi1kaWFsb2dfX2Rlc2NyaXB0aW9uXCI+XG4gICAgICAgICAgPEdyb3VwRGVzY3JpcHRpb24gaTE4bj17aTE4bn0gdGl0bGU9e3RpdGxlfSB0ZXh0PXtncm91cERlc2NyaXB0aW9ufSAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICl9XG4gICAgICB7YXBwcm92YWxSZXF1aXJlZCA/IChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2R1bGUtZ3JvdXAtdjItam9pbi1kaWFsb2dfX3Byb21wdC0tYXBwcm92YWxcIj5cbiAgICAgICAgICB7aTE4bignR3JvdXBWMi0tam9pbi0tcHJvbXB0LXdpdGgtYXBwcm92YWwnKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICApIDogKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZHVsZS1ncm91cC12Mi1qb2luLWRpYWxvZ19fcHJvbXB0XCI+XG4gICAgICAgICAge2kxOG4oJ0dyb3VwVjItLWpvaW4tLXByb21wdCcpfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICl9XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZHVsZS1ncm91cC12Mi1qb2luLWRpYWxvZ19fYnV0dG9uc1wiPlxuICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFxuICAgICAgICAgICAgJ21vZHVsZS1ncm91cC12Mi1qb2luLWRpYWxvZ19fYnV0dG9uJyxcbiAgICAgICAgICAgICdtb2R1bGUtZ3JvdXAtdjItam9pbi1kaWFsb2dfX2J1dHRvbi0tc2Vjb25kYXJ5J1xuICAgICAgICAgICl9XG4gICAgICAgICAgZGlzYWJsZWQ9e2lzV29ya2luZ31cbiAgICAgICAgICBvbkNsaWNrPXt3cmFwcGVkQ2xvc2V9XG4gICAgICAgICAgdmFyaWFudD17QnV0dG9uVmFyaWFudC5TZWNvbmRhcnl9XG4gICAgICAgID5cbiAgICAgICAgICB7aTE4bignY2FuY2VsJyl9XG4gICAgICAgIDwvQnV0dG9uPlxuICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgY2xhc3NOYW1lPVwibW9kdWxlLWdyb3VwLXYyLWpvaW4tZGlhbG9nX19idXR0b25cIlxuICAgICAgICAgIGRpc2FibGVkPXtpc1dvcmtpbmd9XG4gICAgICAgICAgcmVmPXtmb2N1c1JlZn1cbiAgICAgICAgICBvbkNsaWNrPXt3cmFwcGVkSm9pbn1cbiAgICAgICAgICB2YXJpYW50PXtCdXR0b25WYXJpYW50LlByaW1hcnl9XG4gICAgICAgID5cbiAgICAgICAgICB7aXNKb2luaW5nID8gKFxuICAgICAgICAgICAgPFNwaW5uZXIgc2l6ZT1cIjIwcHhcIiBzdmdTaXplPVwic21hbGxcIiBkaXJlY3Rpb249XCJvbi1hdmF0YXJcIiAvPlxuICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICBqb2luU3RyaW5nXG4gICAgICAgICAgKX1cbiAgICAgICAgPC9CdXR0b24+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLFlBQXVCO0FBQ3ZCLHdCQUF1QjtBQUV2QixvQkFBbUM7QUFDbkMscUJBQXdCO0FBQ3hCLG9CQUFzQztBQUN0Qyw4QkFBaUM7QUFpQmpDLGtCQUFrQixJQUF3QjtBQUN4QyxNQUFJLElBQUk7QUFDTixPQUFHLE1BQU07QUFB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
