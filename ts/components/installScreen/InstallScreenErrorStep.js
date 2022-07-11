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
var InstallScreenErrorStep_exports = {};
__export(InstallScreenErrorStep_exports, {
  InstallError: () => InstallError,
  InstallScreenErrorStep: () => InstallScreenErrorStep
});
module.exports = __toCommonJS(InstallScreenErrorStep_exports);
var import_react = __toESM(require("react"));
var import_missingCaseError = require("../../util/missingCaseError");
var import_openLinkInWebBrowser = require("../../util/openLinkInWebBrowser");
var import_Button = require("../Button");
var import_TitlebarDragArea = require("../TitlebarDragArea");
var import_InstallScreenSignalLogo = require("./InstallScreenSignalLogo");
var InstallError = /* @__PURE__ */ ((InstallError2) => {
  InstallError2[InstallError2["TooManyDevices"] = 0] = "TooManyDevices";
  InstallError2[InstallError2["TooOld"] = 1] = "TooOld";
  InstallError2[InstallError2["ConnectionFailed"] = 2] = "ConnectionFailed";
  InstallError2[InstallError2["UnknownError"] = 3] = "UnknownError";
  return InstallError2;
})(InstallError || {});
function InstallScreenErrorStep({
  error,
  i18n,
  quit,
  tryAgain
}) {
  let errorMessage;
  let buttonText = i18n("installTryAgain");
  let onClickButton = /* @__PURE__ */ __name(() => tryAgain(), "onClickButton");
  let shouldShowQuitButton = false;
  switch (error) {
    case 0 /* TooManyDevices */:
      errorMessage = i18n("installTooManyDevices");
      break;
    case 1 /* TooOld */:
      errorMessage = i18n("installTooOld");
      buttonText = i18n("upgrade");
      onClickButton = /* @__PURE__ */ __name(() => {
        (0, import_openLinkInWebBrowser.openLinkInWebBrowser)("https://signal.org/download");
      }, "onClickButton");
      shouldShowQuitButton = true;
      break;
    case 2 /* ConnectionFailed */:
      errorMessage = i18n("installConnectionFailed");
      break;
    case 3 /* UnknownError */:
      errorMessage = i18n("installUnknownError");
      break;
    default:
      throw (0, import_missingCaseError.missingCaseError)(error);
  }
  return /* @__PURE__ */ import_react.default.createElement("div", {
    className: "module-InstallScreenErrorStep"
  }, /* @__PURE__ */ import_react.default.createElement(import_TitlebarDragArea.TitlebarDragArea, null), /* @__PURE__ */ import_react.default.createElement(import_InstallScreenSignalLogo.InstallScreenSignalLogo, null), /* @__PURE__ */ import_react.default.createElement("h1", null, i18n("installErrorHeader")), /* @__PURE__ */ import_react.default.createElement("h2", null, errorMessage), /* @__PURE__ */ import_react.default.createElement("div", {
    className: "module-InstallScreenErrorStep__buttons"
  }, /* @__PURE__ */ import_react.default.createElement(import_Button.Button, {
    onClick: onClickButton
  }, buttonText), shouldShowQuitButton && /* @__PURE__ */ import_react.default.createElement(import_Button.Button, {
    onClick: () => quit(),
    variant: import_Button.ButtonVariant.Secondary
  }, i18n("quit"))));
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  InstallError,
  InstallScreenErrorStep
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiSW5zdGFsbFNjcmVlbkVycm9yU3RlcC50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHR5cGUgeyBSZWFjdEVsZW1lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHR5cGUgeyBMb2NhbGl6ZXJUeXBlIH0gZnJvbSAnLi4vLi4vdHlwZXMvVXRpbCc7XG5pbXBvcnQgeyBtaXNzaW5nQ2FzZUVycm9yIH0gZnJvbSAnLi4vLi4vdXRpbC9taXNzaW5nQ2FzZUVycm9yJztcbmltcG9ydCB7IG9wZW5MaW5rSW5XZWJCcm93c2VyIH0gZnJvbSAnLi4vLi4vdXRpbC9vcGVuTGlua0luV2ViQnJvd3Nlcic7XG5pbXBvcnQgeyBCdXR0b24sIEJ1dHRvblZhcmlhbnQgfSBmcm9tICcuLi9CdXR0b24nO1xuaW1wb3J0IHsgVGl0bGViYXJEcmFnQXJlYSB9IGZyb20gJy4uL1RpdGxlYmFyRHJhZ0FyZWEnO1xuaW1wb3J0IHsgSW5zdGFsbFNjcmVlblNpZ25hbExvZ28gfSBmcm9tICcuL0luc3RhbGxTY3JlZW5TaWduYWxMb2dvJztcblxuZXhwb3J0IGVudW0gSW5zdGFsbEVycm9yIHtcbiAgVG9vTWFueURldmljZXMsXG4gIFRvb09sZCxcbiAgQ29ubmVjdGlvbkZhaWxlZCxcbiAgVW5rbm93bkVycm9yLFxufVxuXG5leHBvcnQgZnVuY3Rpb24gSW5zdGFsbFNjcmVlbkVycm9yU3RlcCh7XG4gIGVycm9yLFxuICBpMThuLFxuICBxdWl0LFxuICB0cnlBZ2Fpbixcbn06IFJlYWRvbmx5PHtcbiAgZXJyb3I6IEluc3RhbGxFcnJvcjtcbiAgaTE4bjogTG9jYWxpemVyVHlwZTtcbiAgcXVpdDogKCkgPT4gdW5rbm93bjtcbiAgdHJ5QWdhaW46ICgpID0+IHVua25vd247XG59Pik6IFJlYWN0RWxlbWVudCB7XG4gIGxldCBlcnJvck1lc3NhZ2U6IHN0cmluZztcbiAgbGV0IGJ1dHRvblRleHQgPSBpMThuKCdpbnN0YWxsVHJ5QWdhaW4nKTtcbiAgbGV0IG9uQ2xpY2tCdXR0b24gPSAoKSA9PiB0cnlBZ2FpbigpO1xuICBsZXQgc2hvdWxkU2hvd1F1aXRCdXR0b24gPSBmYWxzZTtcblxuICBzd2l0Y2ggKGVycm9yKSB7XG4gICAgY2FzZSBJbnN0YWxsRXJyb3IuVG9vTWFueURldmljZXM6XG4gICAgICBlcnJvck1lc3NhZ2UgPSBpMThuKCdpbnN0YWxsVG9vTWFueURldmljZXMnKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgSW5zdGFsbEVycm9yLlRvb09sZDpcbiAgICAgIGVycm9yTWVzc2FnZSA9IGkxOG4oJ2luc3RhbGxUb29PbGQnKTtcbiAgICAgIGJ1dHRvblRleHQgPSBpMThuKCd1cGdyYWRlJyk7XG4gICAgICBvbkNsaWNrQnV0dG9uID0gKCkgPT4ge1xuICAgICAgICBvcGVuTGlua0luV2ViQnJvd3NlcignaHR0cHM6Ly9zaWduYWwub3JnL2Rvd25sb2FkJyk7XG4gICAgICB9O1xuICAgICAgc2hvdWxkU2hvd1F1aXRCdXR0b24gPSB0cnVlO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBJbnN0YWxsRXJyb3IuQ29ubmVjdGlvbkZhaWxlZDpcbiAgICAgIGVycm9yTWVzc2FnZSA9IGkxOG4oJ2luc3RhbGxDb25uZWN0aW9uRmFpbGVkJyk7XG4gICAgICBicmVhaztcbiAgICBjYXNlIEluc3RhbGxFcnJvci5Vbmtub3duRXJyb3I6XG4gICAgICBlcnJvck1lc3NhZ2UgPSBpMThuKCdpbnN0YWxsVW5rbm93bkVycm9yJyk7XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbWlzc2luZ0Nhc2VFcnJvcihlcnJvcik7XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kdWxlLUluc3RhbGxTY3JlZW5FcnJvclN0ZXBcIj5cbiAgICAgIDxUaXRsZWJhckRyYWdBcmVhIC8+XG5cbiAgICAgIDxJbnN0YWxsU2NyZWVuU2lnbmFsTG9nbyAvPlxuXG4gICAgICA8aDE+e2kxOG4oJ2luc3RhbGxFcnJvckhlYWRlcicpfTwvaDE+XG4gICAgICA8aDI+e2Vycm9yTWVzc2FnZX08L2gyPlxuXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZHVsZS1JbnN0YWxsU2NyZWVuRXJyb3JTdGVwX19idXR0b25zXCI+XG4gICAgICAgIDxCdXR0b24gb25DbGljaz17b25DbGlja0J1dHRvbn0+e2J1dHRvblRleHR9PC9CdXR0b24+XG4gICAgICAgIHtzaG91bGRTaG93UXVpdEJ1dHRvbiAmJiAoXG4gICAgICAgICAgPEJ1dHRvbiBvbkNsaWNrPXsoKSA9PiBxdWl0KCl9IHZhcmlhbnQ9e0J1dHRvblZhcmlhbnQuU2Vjb25kYXJ5fT5cbiAgICAgICAgICAgIHtpMThuKCdxdWl0Jyl9XG4gICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICl9XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUlBLG1CQUFrQjtBQUVsQiw4QkFBaUM7QUFDakMsa0NBQXFDO0FBQ3JDLG9CQUFzQztBQUN0Qyw4QkFBaUM7QUFDakMscUNBQXdDO0FBRWpDLElBQUssZUFBTCxrQkFBSyxrQkFBTDtBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBSlU7QUFBQTtBQU9MLGdDQUFnQztBQUFBLEVBQ3JDO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsR0FNZ0I7QUFDaEIsTUFBSTtBQUNKLE1BQUksYUFBYSxLQUFLLGlCQUFpQjtBQUN2QyxNQUFJLGdCQUFnQiw2QkFBTSxTQUFTLEdBQWY7QUFDcEIsTUFBSSx1QkFBdUI7QUFFM0IsVUFBUTtBQUFBLFNBQ0Q7QUFDSCxxQkFBZSxLQUFLLHVCQUF1QjtBQUMzQztBQUFBLFNBQ0c7QUFDSCxxQkFBZSxLQUFLLGVBQWU7QUFDbkMsbUJBQWEsS0FBSyxTQUFTO0FBQzNCLHNCQUFnQiw2QkFBTTtBQUNwQiw4REFBcUIsNkJBQTZCO0FBQUEsTUFDcEQsR0FGZ0I7QUFHaEIsNkJBQXVCO0FBQ3ZCO0FBQUEsU0FDRztBQUNILHFCQUFlLEtBQUsseUJBQXlCO0FBQzdDO0FBQUEsU0FDRztBQUNILHFCQUFlLEtBQUsscUJBQXFCO0FBQ3pDO0FBQUE7QUFFQSxZQUFNLDhDQUFpQixLQUFLO0FBQUE7QUFHaEMsU0FDRSxtREFBQztBQUFBLElBQUksV0FBVTtBQUFBLEtBQ2IsbURBQUMsOENBQWlCLEdBRWxCLG1EQUFDLDREQUF3QixHQUV6QixtREFBQyxZQUFJLEtBQUssb0JBQW9CLENBQUUsR0FDaEMsbURBQUMsWUFBSSxZQUFhLEdBRWxCLG1EQUFDO0FBQUEsSUFBSSxXQUFVO0FBQUEsS0FDYixtREFBQztBQUFBLElBQU8sU0FBUztBQUFBLEtBQWdCLFVBQVcsR0FDM0Msd0JBQ0MsbURBQUM7QUFBQSxJQUFPLFNBQVMsTUFBTSxLQUFLO0FBQUEsSUFBRyxTQUFTLDRCQUFjO0FBQUEsS0FDbkQsS0FBSyxNQUFNLENBQ2QsQ0FFSixDQUNGO0FBRUo7QUF6RGdCIiwKICAibmFtZXMiOiBbXQp9Cg==
