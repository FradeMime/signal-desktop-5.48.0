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
var ToastBlockedGroup_exports = {};
__export(ToastBlockedGroup_exports, {
  ToastBlockedGroup: () => ToastBlockedGroup
});
module.exports = __toCommonJS(ToastBlockedGroup_exports);
var import_react = __toESM(require("react"));
var import_Toast = require("./Toast");
const ToastBlockedGroup = /* @__PURE__ */ __name(({
  i18n,
  onClose
}) => {
  return /* @__PURE__ */ import_react.default.createElement(import_Toast.Toast, {
    onClose
  }, i18n("unblockGroupToSend"));
}, "ToastBlockedGroup");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ToastBlockedGroup
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiVG9hc3RCbG9ja2VkR3JvdXAudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgdHlwZSB7IExvY2FsaXplclR5cGUgfSBmcm9tICcuLi90eXBlcy9VdGlsJztcbmltcG9ydCB7IFRvYXN0IH0gZnJvbSAnLi9Ub2FzdCc7XG5cbnR5cGUgUHJvcHNUeXBlID0ge1xuICBpMThuOiBMb2NhbGl6ZXJUeXBlO1xuICBvbkNsb3NlOiAoKSA9PiB1bmtub3duO1xufTtcblxuZXhwb3J0IGNvbnN0IFRvYXN0QmxvY2tlZEdyb3VwID0gKHtcbiAgaTE4bixcbiAgb25DbG9zZSxcbn06IFByb3BzVHlwZSk6IEpTWC5FbGVtZW50ID0+IHtcbiAgcmV0dXJuIDxUb2FzdCBvbkNsb3NlPXtvbkNsb3NlfT57aTE4bigndW5ibG9ja0dyb3VwVG9TZW5kJyl9PC9Ub2FzdD47XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLG1CQUFrQjtBQUVsQixtQkFBc0I7QUFPZixNQUFNLG9CQUFvQix3QkFBQztBQUFBLEVBQ2hDO0FBQUEsRUFDQTtBQUFBLE1BQzRCO0FBQzVCLFNBQU8sbURBQUM7QUFBQSxJQUFNO0FBQUEsS0FBbUIsS0FBSyxvQkFBb0IsQ0FBRTtBQUM5RCxHQUxpQzsiLAogICJuYW1lcyI6IFtdCn0K
