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
var ToastFileSaved_exports = {};
__export(ToastFileSaved_exports, {
  ToastFileSaved: () => ToastFileSaved
});
module.exports = __toCommonJS(ToastFileSaved_exports);
var import_react = __toESM(require("react"));
var import_Toast = require("./Toast");
const ToastFileSaved = /* @__PURE__ */ __name(({
  i18n,
  onClose,
  onOpenFile
}) => {
  return /* @__PURE__ */ import_react.default.createElement(import_Toast.Toast, {
    onClose,
    toastAction: {
      label: i18n("attachmentSavedShow"),
      onClick: onOpenFile
    }
  }, i18n("attachmentSaved"));
}, "ToastFileSaved");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ToastFileSaved
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiVG9hc3RGaWxlU2F2ZWQudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgdHlwZSB7IExvY2FsaXplclR5cGUgfSBmcm9tICcuLi90eXBlcy9VdGlsJztcbmltcG9ydCB7IFRvYXN0IH0gZnJvbSAnLi9Ub2FzdCc7XG5cbmV4cG9ydCB0eXBlIFRvYXN0UHJvcHNUeXBlID0ge1xuICBvbk9wZW5GaWxlOiAoKSA9PiB1bmtub3duO1xufTtcblxudHlwZSBQcm9wc1R5cGUgPSB7XG4gIGkxOG46IExvY2FsaXplclR5cGU7XG4gIG9uQ2xvc2U6ICgpID0+IHVua25vd247XG59ICYgVG9hc3RQcm9wc1R5cGU7XG5cbmV4cG9ydCBjb25zdCBUb2FzdEZpbGVTYXZlZCA9ICh7XG4gIGkxOG4sXG4gIG9uQ2xvc2UsXG4gIG9uT3BlbkZpbGUsXG59OiBQcm9wc1R5cGUpOiBKU1guRWxlbWVudCA9PiB7XG4gIHJldHVybiAoXG4gICAgPFRvYXN0XG4gICAgICBvbkNsb3NlPXtvbkNsb3NlfVxuICAgICAgdG9hc3RBY3Rpb249e3tcbiAgICAgICAgbGFiZWw6IGkxOG4oJ2F0dGFjaG1lbnRTYXZlZFNob3cnKSxcbiAgICAgICAgb25DbGljazogb25PcGVuRmlsZSxcbiAgICAgIH19XG4gICAgPlxuICAgICAge2kxOG4oJ2F0dGFjaG1lbnRTYXZlZCcpfVxuICAgIDwvVG9hc3Q+XG4gICk7XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLG1CQUFrQjtBQUVsQixtQkFBc0I7QUFXZixNQUFNLGlCQUFpQix3QkFBQztBQUFBLEVBQzdCO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxNQUM0QjtBQUM1QixTQUNFLG1EQUFDO0FBQUEsSUFDQztBQUFBLElBQ0EsYUFBYTtBQUFBLE1BQ1gsT0FBTyxLQUFLLHFCQUFxQjtBQUFBLE1BQ2pDLFNBQVM7QUFBQSxJQUNYO0FBQUEsS0FFQyxLQUFLLGlCQUFpQixDQUN6QjtBQUVKLEdBaEI4QjsiLAogICJuYW1lcyI6IFtdCn0K
