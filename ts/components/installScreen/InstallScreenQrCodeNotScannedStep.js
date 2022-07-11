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
var InstallScreenQrCodeNotScannedStep_exports = {};
__export(InstallScreenQrCodeNotScannedStep_exports, {
  InstallScreenQrCodeNotScannedStep: () => InstallScreenQrCodeNotScannedStep
});
module.exports = __toCommonJS(InstallScreenQrCodeNotScannedStep_exports);
var import_react = __toESM(require("react"));
var import_classnames = __toESM(require("classnames"));
var import_missingCaseError = require("../../util/missingCaseError");
var import_loadable = require("../../util/loadable");
var import_Intl = require("../Intl");
var import_Spinner = require("../Spinner");
var import_QrCode = require("../QrCode");
var import_TitlebarDragArea = require("../TitlebarDragArea");
var import_InstallScreenSignalLogo = require("./InstallScreenSignalLogo");
var import_getClassNamesFor = require("../../util/getClassNamesFor");
const QR_CODE_FAILED_LINK = "https://support.signal.org/hc/articles/360007320451#desktop_multiple_device";
const getQrCodeClassName = (0, import_getClassNamesFor.getClassNamesFor)("module-InstallScreenQrCodeNotScannedStep__qr-code");
const InstallScreenQrCodeNotScannedStep = /* @__PURE__ */ __name(({
  i18n,
  provisioningUrl
}) => /* @__PURE__ */ import_react.default.createElement("div", {
  className: "module-InstallScreenQrCodeNotScannedStep"
}, /* @__PURE__ */ import_react.default.createElement(import_TitlebarDragArea.TitlebarDragArea, null), /* @__PURE__ */ import_react.default.createElement(import_InstallScreenSignalLogo.InstallScreenSignalLogo, null), /* @__PURE__ */ import_react.default.createElement("div", {
  className: "module-InstallScreenQrCodeNotScannedStep__contents"
}, /* @__PURE__ */ import_react.default.createElement(InstallScreenQrCode, {
  i18n,
  ...provisioningUrl
}), /* @__PURE__ */ import_react.default.createElement("div", {
  className: "module-InstallScreenQrCodeNotScannedStep__instructions"
}, /* @__PURE__ */ import_react.default.createElement("h1", null, i18n("Install__scan-this-code")), /* @__PURE__ */ import_react.default.createElement("ol", null, /* @__PURE__ */ import_react.default.createElement("li", null, i18n("Install__instructions__1")), /* @__PURE__ */ import_react.default.createElement("li", null, /* @__PURE__ */ import_react.default.createElement(import_Intl.Intl, {
  i18n,
  id: "Install__instructions__2",
  components: {
    settings: /* @__PURE__ */ import_react.default.createElement("strong", null, i18n("Install__instructions__2__settings")),
    linkedDevices: /* @__PURE__ */ import_react.default.createElement("strong", null, i18n("linkedDevices"))
  }
})), /* @__PURE__ */ import_react.default.createElement("li", null, /* @__PURE__ */ import_react.default.createElement(import_Intl.Intl, {
  i18n,
  id: "Install__instructions__3",
  components: {
    plusButton: /* @__PURE__ */ import_react.default.createElement("div", {
      className: "module-InstallScreenQrCodeNotScannedStep__android-plus",
      "aria-label": "+"
    }),
    linkNewDevice: /* @__PURE__ */ import_react.default.createElement("strong", null, i18n("linkNewDevice"))
  }
}))), /* @__PURE__ */ import_react.default.createElement("a", {
  href: "https://support.signal.org/hc/articles/360007320451#desktop_multiple_device"
}, i18n("Install__support-link"))))), "InstallScreenQrCodeNotScannedStep");
function InstallScreenQrCode(props) {
  const { i18n } = props;
  let contents;
  switch (props.loadingState) {
    case import_loadable.LoadingState.Loading:
      contents = /* @__PURE__ */ import_react.default.createElement(import_Spinner.Spinner, {
        size: "24px",
        svgSize: "small"
      });
      break;
    case import_loadable.LoadingState.LoadFailed:
      contents = /* @__PURE__ */ import_react.default.createElement("span", {
        className: (0, import_classnames.default)(getQrCodeClassName("__error-message"))
      }, /* @__PURE__ */ import_react.default.createElement(import_Intl.Intl, {
        i18n,
        id: "Install__qr-failed",
        components: [
          /* @__PURE__ */ import_react.default.createElement("a", {
            href: QR_CODE_FAILED_LINK
          }, i18n("Install__qr-failed__learn-more"))
        ]
      }));
      break;
    case import_loadable.LoadingState.Loaded:
      contents = /* @__PURE__ */ import_react.default.createElement(import_QrCode.QrCode, {
        alt: i18n("Install__scan-this-code"),
        className: getQrCodeClassName("__code"),
        data: props.value
      });
      break;
    default:
      throw (0, import_missingCaseError.missingCaseError)(props);
  }
  return /* @__PURE__ */ import_react.default.createElement("div", {
    className: (0, import_classnames.default)(getQrCodeClassName(""), props.loadingState === import_loadable.LoadingState.Loaded && getQrCodeClassName("--loaded"), props.loadingState === import_loadable.LoadingState.LoadFailed && getQrCodeClassName("--load-failed"))
  }, contents);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  InstallScreenQrCodeNotScannedStep
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiSW5zdGFsbFNjcmVlblFyQ29kZU5vdFNjYW5uZWRTdGVwLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEtMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB0eXBlIHsgUmVhY3RFbGVtZW50LCBSZWFjdE5vZGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmltcG9ydCB0eXBlIHsgTG9jYWxpemVyVHlwZSB9IGZyb20gJy4uLy4uL3R5cGVzL1V0aWwnO1xuaW1wb3J0IHsgbWlzc2luZ0Nhc2VFcnJvciB9IGZyb20gJy4uLy4uL3V0aWwvbWlzc2luZ0Nhc2VFcnJvcic7XG5pbXBvcnQgdHlwZSB7IExvYWRhYmxlIH0gZnJvbSAnLi4vLi4vdXRpbC9sb2FkYWJsZSc7XG5pbXBvcnQgeyBMb2FkaW5nU3RhdGUgfSBmcm9tICcuLi8uLi91dGlsL2xvYWRhYmxlJztcblxuaW1wb3J0IHsgSW50bCB9IGZyb20gJy4uL0ludGwnO1xuaW1wb3J0IHsgU3Bpbm5lciB9IGZyb20gJy4uL1NwaW5uZXInO1xuaW1wb3J0IHsgUXJDb2RlIH0gZnJvbSAnLi4vUXJDb2RlJztcbmltcG9ydCB7IFRpdGxlYmFyRHJhZ0FyZWEgfSBmcm9tICcuLi9UaXRsZWJhckRyYWdBcmVhJztcbmltcG9ydCB7IEluc3RhbGxTY3JlZW5TaWduYWxMb2dvIH0gZnJvbSAnLi9JbnN0YWxsU2NyZWVuU2lnbmFsTG9nbyc7XG5pbXBvcnQgeyBnZXRDbGFzc05hbWVzRm9yIH0gZnJvbSAnLi4vLi4vdXRpbC9nZXRDbGFzc05hbWVzRm9yJztcblxuLy8gV2UgY2FuJ3QgYWx3YXlzIHVzZSBkZXN0cnVjdHVyaW5nIGFzc2lnbm1lbnQgYmVjYXVzZSBvZiB0aGUgY29tcGxleGl0eSBvZiB0aGlzIHByb3BzXG4vLyAgIHR5cGUuXG4vKiBlc2xpbnQtZGlzYWJsZSByZWFjdC9kZXN0cnVjdHVyaW5nLWFzc2lnbm1lbnQgKi9cbnR5cGUgUHJvcHNUeXBlID0ge1xuICBpMThuOiBMb2NhbGl6ZXJUeXBlO1xuICBwcm92aXNpb25pbmdVcmw6IExvYWRhYmxlPHN0cmluZz47XG59O1xuXG5jb25zdCBRUl9DT0RFX0ZBSUxFRF9MSU5LID1cbiAgJ2h0dHBzOi8vc3VwcG9ydC5zaWduYWwub3JnL2hjL2FydGljbGVzLzM2MDAwNzMyMDQ1MSNkZXNrdG9wX211bHRpcGxlX2RldmljZSc7XG5cbmNvbnN0IGdldFFyQ29kZUNsYXNzTmFtZSA9IGdldENsYXNzTmFtZXNGb3IoXG4gICdtb2R1bGUtSW5zdGFsbFNjcmVlblFyQ29kZU5vdFNjYW5uZWRTdGVwX19xci1jb2RlJ1xuKTtcblxuZXhwb3J0IGNvbnN0IEluc3RhbGxTY3JlZW5RckNvZGVOb3RTY2FubmVkU3RlcCA9ICh7XG4gIGkxOG4sXG4gIHByb3Zpc2lvbmluZ1VybCxcbn06IFJlYWRvbmx5PFByb3BzVHlwZT4pOiBSZWFjdEVsZW1lbnQgPT4gKFxuICA8ZGl2IGNsYXNzTmFtZT1cIm1vZHVsZS1JbnN0YWxsU2NyZWVuUXJDb2RlTm90U2Nhbm5lZFN0ZXBcIj5cbiAgICA8VGl0bGViYXJEcmFnQXJlYSAvPlxuXG4gICAgPEluc3RhbGxTY3JlZW5TaWduYWxMb2dvIC8+XG5cbiAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZHVsZS1JbnN0YWxsU2NyZWVuUXJDb2RlTm90U2Nhbm5lZFN0ZXBfX2NvbnRlbnRzXCI+XG4gICAgICA8SW5zdGFsbFNjcmVlblFyQ29kZSBpMThuPXtpMThufSB7Li4ucHJvdmlzaW9uaW5nVXJsfSAvPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2R1bGUtSW5zdGFsbFNjcmVlblFyQ29kZU5vdFNjYW5uZWRTdGVwX19pbnN0cnVjdGlvbnNcIj5cbiAgICAgICAgPGgxPntpMThuKCdJbnN0YWxsX19zY2FuLXRoaXMtY29kZScpfTwvaDE+XG4gICAgICAgIDxvbD5cbiAgICAgICAgICA8bGk+e2kxOG4oJ0luc3RhbGxfX2luc3RydWN0aW9uc19fMScpfTwvbGk+XG4gICAgICAgICAgPGxpPlxuICAgICAgICAgICAgPEludGxcbiAgICAgICAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgICAgICAgaWQ9XCJJbnN0YWxsX19pbnN0cnVjdGlvbnNfXzJcIlxuICAgICAgICAgICAgICBjb21wb25lbnRzPXt7XG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IChcbiAgICAgICAgICAgICAgICAgIDxzdHJvbmc+e2kxOG4oJ0luc3RhbGxfX2luc3RydWN0aW9uc19fMl9fc2V0dGluZ3MnKX08L3N0cm9uZz5cbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIGxpbmtlZERldmljZXM6IDxzdHJvbmc+e2kxOG4oJ2xpbmtlZERldmljZXMnKX08L3N0cm9uZz4sXG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgPGxpPlxuICAgICAgICAgICAgPEludGxcbiAgICAgICAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgICAgICAgaWQ9XCJJbnN0YWxsX19pbnN0cnVjdGlvbnNfXzNcIlxuICAgICAgICAgICAgICBjb21wb25lbnRzPXt7XG4gICAgICAgICAgICAgICAgcGx1c0J1dHRvbjogKFxuICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJtb2R1bGUtSW5zdGFsbFNjcmVlblFyQ29kZU5vdFNjYW5uZWRTdGVwX19hbmRyb2lkLXBsdXNcIlxuICAgICAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPVwiK1wiXG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgbGlua05ld0RldmljZTogPHN0cm9uZz57aTE4bignbGlua05ld0RldmljZScpfTwvc3Ryb25nPixcbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9saT5cbiAgICAgICAgPC9vbD5cbiAgICAgICAgPGEgaHJlZj1cImh0dHBzOi8vc3VwcG9ydC5zaWduYWwub3JnL2hjL2FydGljbGVzLzM2MDAwNzMyMDQ1MSNkZXNrdG9wX211bHRpcGxlX2RldmljZVwiPlxuICAgICAgICAgIHtpMThuKCdJbnN0YWxsX19zdXBwb3J0LWxpbmsnKX1cbiAgICAgICAgPC9hPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuKTtcblxuZnVuY3Rpb24gSW5zdGFsbFNjcmVlblFyQ29kZShcbiAgcHJvcHM6IExvYWRhYmxlPHN0cmluZz4gJiB7IGkxOG46IExvY2FsaXplclR5cGUgfVxuKTogUmVhY3RFbGVtZW50IHtcbiAgY29uc3QgeyBpMThuIH0gPSBwcm9wcztcblxuICBsZXQgY29udGVudHM6IFJlYWN0Tm9kZTtcbiAgc3dpdGNoIChwcm9wcy5sb2FkaW5nU3RhdGUpIHtcbiAgICBjYXNlIExvYWRpbmdTdGF0ZS5Mb2FkaW5nOlxuICAgICAgY29udGVudHMgPSA8U3Bpbm5lciBzaXplPVwiMjRweFwiIHN2Z1NpemU9XCJzbWFsbFwiIC8+O1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBMb2FkaW5nU3RhdGUuTG9hZEZhaWxlZDpcbiAgICAgIGNvbnRlbnRzID0gKFxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2NsYXNzTmFtZXMoZ2V0UXJDb2RlQ2xhc3NOYW1lKCdfX2Vycm9yLW1lc3NhZ2UnKSl9PlxuICAgICAgICAgIDxJbnRsXG4gICAgICAgICAgICBpMThuPXtpMThufVxuICAgICAgICAgICAgaWQ9XCJJbnN0YWxsX19xci1mYWlsZWRcIlxuICAgICAgICAgICAgY29tcG9uZW50cz17W1xuICAgICAgICAgICAgICA8YSBocmVmPXtRUl9DT0RFX0ZBSUxFRF9MSU5LfT5cbiAgICAgICAgICAgICAgICB7aTE4bignSW5zdGFsbF9fcXItZmFpbGVkX19sZWFybi1tb3JlJyl9XG4gICAgICAgICAgICAgIDwvYT4sXG4gICAgICAgICAgICBdfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvc3Bhbj5cbiAgICAgICk7XG4gICAgICBicmVhaztcbiAgICBjYXNlIExvYWRpbmdTdGF0ZS5Mb2FkZWQ6XG4gICAgICBjb250ZW50cyA9IChcbiAgICAgICAgPFFyQ29kZVxuICAgICAgICAgIGFsdD17aTE4bignSW5zdGFsbF9fc2Nhbi10aGlzLWNvZGUnKX1cbiAgICAgICAgICBjbGFzc05hbWU9e2dldFFyQ29kZUNsYXNzTmFtZSgnX19jb2RlJyl9XG4gICAgICAgICAgZGF0YT17cHJvcHMudmFsdWV9XG4gICAgICAgIC8+XG4gICAgICApO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG1pc3NpbmdDYXNlRXJyb3IocHJvcHMpO1xuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2XG4gICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXG4gICAgICAgIGdldFFyQ29kZUNsYXNzTmFtZSgnJyksXG4gICAgICAgIHByb3BzLmxvYWRpbmdTdGF0ZSA9PT0gTG9hZGluZ1N0YXRlLkxvYWRlZCAmJlxuICAgICAgICAgIGdldFFyQ29kZUNsYXNzTmFtZSgnLS1sb2FkZWQnKSxcbiAgICAgICAgcHJvcHMubG9hZGluZ1N0YXRlID09PSBMb2FkaW5nU3RhdGUuTG9hZEZhaWxlZCAmJlxuICAgICAgICAgIGdldFFyQ29kZUNsYXNzTmFtZSgnLS1sb2FkLWZhaWxlZCcpXG4gICAgICApfVxuICAgID5cbiAgICAgIHtjb250ZW50c31cbiAgICA8L2Rpdj5cbiAgKTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFJQSxtQkFBa0I7QUFDbEIsd0JBQXVCO0FBR3ZCLDhCQUFpQztBQUVqQyxzQkFBNkI7QUFFN0Isa0JBQXFC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
