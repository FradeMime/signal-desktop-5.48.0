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
var ToastDecryptionError_exports = {};
__export(ToastDecryptionError_exports, {
  ToastDecryptionError: () => ToastDecryptionError
});
module.exports = __toCommonJS(ToastDecryptionError_exports);
var import_react = __toESM(require("react"));
var import_Toast = require("./Toast");
const ToastDecryptionError = /* @__PURE__ */ __name(({
  deviceId,
  i18n,
  name,
  onClose,
  onShowDebugLog
}) => {
  return /* @__PURE__ */ import_react.default.createElement(import_Toast.Toast, {
    autoDismissDisabled: true,
    className: "decryption-error",
    onClose,
    style: { maxWidth: "500px" },
    toastAction: {
      label: i18n("decryptionErrorToastAction"),
      onClick: onShowDebugLog
    }
  }, i18n("decryptionErrorToast", {
    name,
    deviceId
  }));
}, "ToastDecryptionError");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ToastDecryptionError
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiVG9hc3REZWNyeXB0aW9uRXJyb3IudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgdHlwZSB7IExvY2FsaXplclR5cGUgfSBmcm9tICcuLi90eXBlcy9VdGlsJztcbmltcG9ydCB7IFRvYXN0IH0gZnJvbSAnLi9Ub2FzdCc7XG5cbmV4cG9ydCB0eXBlIFRvYXN0UHJvcHNUeXBlID0ge1xuICBkZXZpY2VJZDogbnVtYmVyO1xuICBuYW1lOiBzdHJpbmc7XG4gIG9uU2hvd0RlYnVnTG9nOiAoKSA9PiB1bmtub3duO1xufTtcblxudHlwZSBQcm9wc1R5cGUgPSB7XG4gIGkxOG46IExvY2FsaXplclR5cGU7XG4gIG9uQ2xvc2U6ICgpID0+IHVua25vd247XG59ICYgVG9hc3RQcm9wc1R5cGU7XG5cbmV4cG9ydCBjb25zdCBUb2FzdERlY3J5cHRpb25FcnJvciA9ICh7XG4gIGRldmljZUlkLFxuICBpMThuLFxuICBuYW1lLFxuICBvbkNsb3NlLFxuICBvblNob3dEZWJ1Z0xvZyxcbn06IFByb3BzVHlwZSk6IEpTWC5FbGVtZW50ID0+IHtcbiAgcmV0dXJuIChcbiAgICA8VG9hc3RcbiAgICAgIGF1dG9EaXNtaXNzRGlzYWJsZWRcbiAgICAgIGNsYXNzTmFtZT1cImRlY3J5cHRpb24tZXJyb3JcIlxuICAgICAgb25DbG9zZT17b25DbG9zZX1cbiAgICAgIHN0eWxlPXt7IG1heFdpZHRoOiAnNTAwcHgnIH19XG4gICAgICB0b2FzdEFjdGlvbj17e1xuICAgICAgICBsYWJlbDogaTE4bignZGVjcnlwdGlvbkVycm9yVG9hc3RBY3Rpb24nKSxcbiAgICAgICAgb25DbGljazogb25TaG93RGVidWdMb2csXG4gICAgICB9fVxuICAgID5cbiAgICAgIHtpMThuKCdkZWNyeXB0aW9uRXJyb3JUb2FzdCcsIHtcbiAgICAgICAgbmFtZSxcbiAgICAgICAgZGV2aWNlSWQsXG4gICAgICB9KX1cbiAgICA8L1RvYXN0PlxuICApO1xufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxtQkFBa0I7QUFFbEIsbUJBQXNCO0FBYWYsTUFBTSx1QkFBdUIsd0JBQUM7QUFBQSxFQUNuQztBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxNQUM0QjtBQUM1QixTQUNFLG1EQUFDO0FBQUEsSUFDQyxxQkFBbUI7QUFBQSxJQUNuQixXQUFVO0FBQUEsSUFDVjtBQUFBLElBQ0EsT0FBTyxFQUFFLFVBQVUsUUFBUTtBQUFBLElBQzNCLGFBQWE7QUFBQSxNQUNYLE9BQU8sS0FBSyw0QkFBNEI7QUFBQSxNQUN4QyxTQUFTO0FBQUEsSUFDWDtBQUFBLEtBRUMsS0FBSyx3QkFBd0I7QUFBQSxJQUM1QjtBQUFBLElBQ0E7QUFBQSxFQUNGLENBQUMsQ0FDSDtBQUVKLEdBeEJvQzsiLAogICJuYW1lcyI6IFtdCn0K
