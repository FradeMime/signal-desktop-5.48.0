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
var ToastExpired_exports = {};
__export(ToastExpired_exports, {
  ToastExpired: () => ToastExpired
});
module.exports = __toCommonJS(ToastExpired_exports);
var import_react = __toESM(require("react"));
var import_Toast = require("./Toast");
const ToastExpired = /* @__PURE__ */ __name(({ i18n, onClose }) => {
  return /* @__PURE__ */ import_react.default.createElement(import_Toast.Toast, {
    onClose
  }, i18n("expiredWarning"));
}, "ToastExpired");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ToastExpired
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiVG9hc3RFeHBpcmVkLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHR5cGUgeyBMb2NhbGl6ZXJUeXBlIH0gZnJvbSAnLi4vdHlwZXMvVXRpbCc7XG5pbXBvcnQgeyBUb2FzdCB9IGZyb20gJy4vVG9hc3QnO1xuXG50eXBlIFByb3BzVHlwZSA9IHtcbiAgaTE4bjogTG9jYWxpemVyVHlwZTtcbiAgb25DbG9zZTogKCkgPT4gdW5rbm93bjtcbn07XG5cbmV4cG9ydCBjb25zdCBUb2FzdEV4cGlyZWQgPSAoeyBpMThuLCBvbkNsb3NlIH06IFByb3BzVHlwZSk6IEpTWC5FbGVtZW50ID0+IHtcbiAgcmV0dXJuIDxUb2FzdCBvbkNsb3NlPXtvbkNsb3NlfT57aTE4bignZXhwaXJlZFdhcm5pbmcnKX08L1RvYXN0Pjtcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsbUJBQWtCO0FBRWxCLG1CQUFzQjtBQU9mLE1BQU0sZUFBZSx3QkFBQyxFQUFFLE1BQU0sY0FBc0M7QUFDekUsU0FBTyxtREFBQztBQUFBLElBQU07QUFBQSxLQUFtQixLQUFLLGdCQUFnQixDQUFFO0FBQzFELEdBRjRCOyIsCiAgIm5hbWVzIjogW10KfQo=
