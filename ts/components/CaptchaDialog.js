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
var CaptchaDialog_exports = {};
__export(CaptchaDialog_exports, {
  CaptchaDialog: () => CaptchaDialog
});
module.exports = __toCommonJS(CaptchaDialog_exports);
var import_react = __toESM(require("react"));
var import_Button = require("./Button");
var import_Modal = require("./Modal");
var import_Spinner = require("./Spinner");
function CaptchaDialog(props) {
  const { i18n, isPending, onSkip, onContinue } = props;
  const [isClosing, setIsClosing] = (0, import_react.useState)(false);
  const buttonRef = (0, import_react.useRef)(null);
  const onCancelClick = /* @__PURE__ */ __name((event) => {
    event.preventDefault();
    setIsClosing(false);
  }, "onCancelClick");
  const onSkipClick = /* @__PURE__ */ __name((event) => {
    event.preventDefault();
    onSkip();
  }, "onSkipClick");
  if (isClosing && !isPending) {
    return /* @__PURE__ */ import_react.default.createElement(import_Modal.Modal, {
      moduleClassName: "module-Modal",
      i18n,
      title: i18n("CaptchaDialog--can-close__title"),
      onClose: () => setIsClosing(false),
      key: "skip"
    }, /* @__PURE__ */ import_react.default.createElement("section", null, /* @__PURE__ */ import_react.default.createElement("p", null, i18n("CaptchaDialog--can-close__body"))), /* @__PURE__ */ import_react.default.createElement(import_Modal.Modal.ButtonFooter, null, /* @__PURE__ */ import_react.default.createElement(import_Button.Button, {
      onClick: onCancelClick,
      variant: import_Button.ButtonVariant.Secondary
    }, i18n("cancel")), /* @__PURE__ */ import_react.default.createElement(import_Button.Button, {
      onClick: onSkipClick,
      variant: import_Button.ButtonVariant.Destructive
    }, i18n("CaptchaDialog--can_close__skip-verification"))));
  }
  const onContinueClick = /* @__PURE__ */ __name((event) => {
    event.preventDefault();
    onContinue();
  }, "onContinueClick");
  const updateButtonRef = /* @__PURE__ */ __name((button) => {
    buttonRef.current = button;
    if (button) {
      button.focus();
    }
  }, "updateButtonRef");
  return /* @__PURE__ */ import_react.default.createElement(import_Modal.Modal, {
    moduleClassName: "module-Modal--important",
    i18n,
    title: i18n("CaptchaDialog__title"),
    hasXButton: true,
    onClose: () => setIsClosing(true),
    key: "primary"
  }, /* @__PURE__ */ import_react.default.createElement("section", null, /* @__PURE__ */ import_react.default.createElement("p", null, i18n("CaptchaDialog__first-paragraph")), /* @__PURE__ */ import_react.default.createElement("p", null, i18n("CaptchaDialog__second-paragraph"))), /* @__PURE__ */ import_react.default.createElement(import_Modal.Modal.ButtonFooter, null, /* @__PURE__ */ import_react.default.createElement(import_Button.Button, {
    disabled: isPending,
    onClick: onContinueClick,
    ref: updateButtonRef,
    variant: import_Button.ButtonVariant.Primary
  }, isPending ? /* @__PURE__ */ import_react.default.createElement(import_Spinner.Spinner, {
    size: "22px",
    svgSize: "small",
    direction: "on-captcha"
  }) : "Continue")));
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CaptchaDialog
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ2FwdGNoYURpYWxvZy50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IFJlYWN0LCB7IHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB0eXBlIHsgTG9jYWxpemVyVHlwZSB9IGZyb20gJy4uL3R5cGVzL1V0aWwnO1xuaW1wb3J0IHsgQnV0dG9uLCBCdXR0b25WYXJpYW50IH0gZnJvbSAnLi9CdXR0b24nO1xuaW1wb3J0IHsgTW9kYWwgfSBmcm9tICcuL01vZGFsJztcbmltcG9ydCB7IFNwaW5uZXIgfSBmcm9tICcuL1NwaW5uZXInO1xuXG50eXBlIFByb3BzVHlwZSA9IHtcbiAgaTE4bjogTG9jYWxpemVyVHlwZTtcbiAgaXNQZW5kaW5nOiBib29sZWFuO1xuXG4gIG9uQ29udGludWU6ICgpID0+IHZvaWQ7XG4gIG9uU2tpcDogKCkgPT4gdm9pZDtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBDYXB0Y2hhRGlhbG9nKHByb3BzOiBSZWFkb25seTxQcm9wc1R5cGU+KTogSlNYLkVsZW1lbnQge1xuICBjb25zdCB7IGkxOG4sIGlzUGVuZGluZywgb25Ta2lwLCBvbkNvbnRpbnVlIH0gPSBwcm9wcztcblxuICBjb25zdCBbaXNDbG9zaW5nLCBzZXRJc0Nsb3NpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuXG4gIGNvbnN0IGJ1dHRvblJlZiA9IHVzZVJlZjxIVE1MQnV0dG9uRWxlbWVudCB8IG51bGw+KG51bGwpO1xuXG4gIGNvbnN0IG9uQ2FuY2VsQ2xpY2sgPSAoZXZlbnQ6IFJlYWN0Lk1vdXNlRXZlbnQpID0+IHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHNldElzQ2xvc2luZyhmYWxzZSk7XG4gIH07XG5cbiAgY29uc3Qgb25Ta2lwQ2xpY2sgPSAoZXZlbnQ6IFJlYWN0Lk1vdXNlRXZlbnQpID0+IHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIG9uU2tpcCgpO1xuICB9O1xuXG4gIGlmIChpc0Nsb3NpbmcgJiYgIWlzUGVuZGluZykge1xuICAgIHJldHVybiAoXG4gICAgICA8TW9kYWxcbiAgICAgICAgbW9kdWxlQ2xhc3NOYW1lPVwibW9kdWxlLU1vZGFsXCJcbiAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgdGl0bGU9e2kxOG4oJ0NhcHRjaGFEaWFsb2ctLWNhbi1jbG9zZV9fdGl0bGUnKX1cbiAgICAgICAgb25DbG9zZT17KCkgPT4gc2V0SXNDbG9zaW5nKGZhbHNlKX1cbiAgICAgICAga2V5PVwic2tpcFwiXG4gICAgICA+XG4gICAgICAgIDxzZWN0aW9uPlxuICAgICAgICAgIDxwPntpMThuKCdDYXB0Y2hhRGlhbG9nLS1jYW4tY2xvc2VfX2JvZHknKX08L3A+XG4gICAgICAgIDwvc2VjdGlvbj5cbiAgICAgICAgPE1vZGFsLkJ1dHRvbkZvb3Rlcj5cbiAgICAgICAgICA8QnV0dG9uIG9uQ2xpY2s9e29uQ2FuY2VsQ2xpY2t9IHZhcmlhbnQ9e0J1dHRvblZhcmlhbnQuU2Vjb25kYXJ5fT5cbiAgICAgICAgICAgIHtpMThuKCdjYW5jZWwnKX1cbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICA8QnV0dG9uIG9uQ2xpY2s9e29uU2tpcENsaWNrfSB2YXJpYW50PXtCdXR0b25WYXJpYW50LkRlc3RydWN0aXZlfT5cbiAgICAgICAgICAgIHtpMThuKCdDYXB0Y2hhRGlhbG9nLS1jYW5fY2xvc2VfX3NraXAtdmVyaWZpY2F0aW9uJyl9XG4gICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgIDwvTW9kYWwuQnV0dG9uRm9vdGVyPlxuICAgICAgPC9Nb2RhbD5cbiAgICApO1xuICB9XG5cbiAgY29uc3Qgb25Db250aW51ZUNsaWNrID0gKGV2ZW50OiBSZWFjdC5Nb3VzZUV2ZW50KSA9PiB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgIG9uQ29udGludWUoKTtcbiAgfTtcblxuICBjb25zdCB1cGRhdGVCdXR0b25SZWYgPSAoYnV0dG9uOiBIVE1MQnV0dG9uRWxlbWVudCk6IHZvaWQgPT4ge1xuICAgIGJ1dHRvblJlZi5jdXJyZW50ID0gYnV0dG9uO1xuICAgIGlmIChidXR0b24pIHtcbiAgICAgIGJ1dHRvbi5mb2N1cygpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxNb2RhbFxuICAgICAgbW9kdWxlQ2xhc3NOYW1lPVwibW9kdWxlLU1vZGFsLS1pbXBvcnRhbnRcIlxuICAgICAgaTE4bj17aTE4bn1cbiAgICAgIHRpdGxlPXtpMThuKCdDYXB0Y2hhRGlhbG9nX190aXRsZScpfVxuICAgICAgaGFzWEJ1dHRvblxuICAgICAgb25DbG9zZT17KCkgPT4gc2V0SXNDbG9zaW5nKHRydWUpfVxuICAgICAga2V5PVwicHJpbWFyeVwiXG4gICAgPlxuICAgICAgPHNlY3Rpb24+XG4gICAgICAgIDxwPntpMThuKCdDYXB0Y2hhRGlhbG9nX19maXJzdC1wYXJhZ3JhcGgnKX08L3A+XG4gICAgICAgIDxwPntpMThuKCdDYXB0Y2hhRGlhbG9nX19zZWNvbmQtcGFyYWdyYXBoJyl9PC9wPlxuICAgICAgPC9zZWN0aW9uPlxuICAgICAgPE1vZGFsLkJ1dHRvbkZvb3Rlcj5cbiAgICAgICAgPEJ1dHRvblxuICAgICAgICAgIGRpc2FibGVkPXtpc1BlbmRpbmd9XG4gICAgICAgICAgb25DbGljaz17b25Db250aW51ZUNsaWNrfVxuICAgICAgICAgIHJlZj17dXBkYXRlQnV0dG9uUmVmfVxuICAgICAgICAgIHZhcmlhbnQ9e0J1dHRvblZhcmlhbnQuUHJpbWFyeX1cbiAgICAgICAgPlxuICAgICAgICAgIHtpc1BlbmRpbmcgPyAoXG4gICAgICAgICAgICA8U3Bpbm5lciBzaXplPVwiMjJweFwiIHN2Z1NpemU9XCJzbWFsbFwiIGRpcmVjdGlvbj1cIm9uLWNhcHRjaGFcIiAvPlxuICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAnQ29udGludWUnXG4gICAgICAgICAgKX1cbiAgICAgICAgPC9CdXR0b24+XG4gICAgICA8L01vZGFsLkJ1dHRvbkZvb3Rlcj5cbiAgICA8L01vZGFsPlxuICApO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLG1CQUF3QztBQUd4QyxvQkFBc0M7QUFDdEMsbUJBQXNCO0FBQ3RCLHFCQUF3QjtBQVVqQix1QkFBdUIsT0FBeUM7QUFDckUsUUFBTSxFQUFFLE1BQU0sV0FBVyxRQUFRLGVBQWU7QUFFaEQsUUFBTSxDQUFDLFdBQVcsZ0JBQWdCLDJCQUFTLEtBQUs7QUFFaEQsUUFBTSxZQUFZLHlCQUFpQyxJQUFJO0FBRXZELFFBQU0sZ0JBQWdCLHdCQUFDLFVBQTRCO0FBQ2pELFVBQU0sZUFBZTtBQUNyQixpQkFBYSxLQUFLO0FBQUEsRUFDcEIsR0FIc0I7QUFLdEIsUUFBTSxjQUFjLHdCQUFDLFVBQTRCO0FBQy9DLFVBQU0sZUFBZTtBQUNyQixXQUFPO0FBQUEsRUFDVCxHQUhvQjtBQUtwQixNQUFJLGFBQWEsQ0FBQyxXQUFXO0FBQzNCLFdBQ0UsbURBQUM7QUFBQSxNQUNDLGlCQUFnQjtBQUFBLE1BQ2hCO0FBQUEsTUFDQSxPQUFPLEtBQUssaUNBQWlDO0FBQUEsTUFDN0MsU0FBUyxNQUFNLGFBQWEsS0FBSztBQUFBLE1BQ2pDLEtBQUk7QUFBQSxPQUVKLG1EQUFDLGlCQUNDLG1EQUFDLFdBQUcsS0FBSyxnQ0FBZ0MsQ0FBRSxDQUM3QyxHQUNBLG1EQUFDLG1CQUFNLGNBQU4sTUFDQyxtREFBQztBQUFBLE1BQU8sU0FBUztBQUFBLE1BQWUsU0FBUyw0QkFBYztBQUFBLE9BQ3BELEtBQUssUUFBUSxDQUNoQixHQUNBLG1EQUFDO0FBQUEsTUFBTyxTQUFTO0FBQUEsTUFBYSxTQUFTLDRCQUFjO0FBQUEsT0FDbEQsS0FBSyw2Q0FBNkMsQ0FDckQsQ0FDRixDQUNGO0FBQUEsRUFFSjtBQUVBLFFBQU0sa0JBQWtCLHdCQUFDLFVBQTRCO0FBQ25ELFVBQU0sZUFBZTtBQUVyQixlQUFXO0FBQUEsRUFDYixHQUp3QjtBQU14QixRQUFNLGtCQUFrQix3QkFBQyxXQUFvQztBQUMzRCxjQUFVLFVBQVU7QUFDcEIsUUFBSSxRQUFRO0FBQ1YsYUFBTyxNQUFNO0FBQUEsSUFDZjtBQUFBLEVBQ0YsR0FMd0I7QUFPeEIsU0FDRSxtREFBQztBQUFBLElBQ0MsaUJBQWdCO0FBQUEsSUFDaEI7QUFBQSxJQUNBLE9BQU8sS0FBSyxzQkFBc0I7QUFBQSxJQUNsQyxZQUFVO0FBQUEsSUFDVixTQUFTLE1BQU0sYUFBYSxJQUFJO0FBQUEsSUFDaEMsS0FBSTtBQUFBLEtBRUosbURBQUMsaUJBQ0MsbURBQUMsV0FBRyxLQUFLLGdDQUFnQyxDQUFFLEdBQzNDLG1EQUFDLFdBQUcsS0FBSyxpQ0FBaUMsQ0FBRSxDQUM5QyxHQUNBLG1EQUFDLG1CQUFNLGNBQU4sTUFDQyxtREFBQztBQUFBLElBQ0MsVUFBVTtBQUFBLElBQ1YsU0FBUztBQUFBLElBQ1QsS0FBSztBQUFBLElBQ0wsU0FBUyw0QkFBYztBQUFBLEtBRXRCLFlBQ0MsbURBQUM7QUFBQSxJQUFRLE1BQUs7QUFBQSxJQUFPLFNBQVE7QUFBQSxJQUFRLFdBQVU7QUFBQSxHQUFhLElBRTVELFVBRUosQ0FDRixDQUNGO0FBRUo7QUFuRmdCIiwKICAibmFtZXMiOiBbXQp9Cg==
