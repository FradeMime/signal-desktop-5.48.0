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
var ToastFileSize_exports = {};
__export(ToastFileSize_exports, {
  ToastFileSize: () => ToastFileSize
});
module.exports = __toCommonJS(ToastFileSize_exports);
var import_react = __toESM(require("react"));
var import_Toast = require("./Toast");
const ToastFileSize = /* @__PURE__ */ __name(({
  i18n,
  limit,
  onClose,
  units
}) => {
  return /* @__PURE__ */ import_react.default.createElement(import_Toast.Toast, {
    onClose
  }, i18n("fileSizeWarning"), " ", limit, units);
}, "ToastFileSize");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ToastFileSize
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiVG9hc3RGaWxlU2l6ZS50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB0eXBlIHsgTG9jYWxpemVyVHlwZSB9IGZyb20gJy4uL3R5cGVzL1V0aWwnO1xuaW1wb3J0IHsgVG9hc3QgfSBmcm9tICcuL1RvYXN0JztcblxuZXhwb3J0IHR5cGUgVG9hc3RQcm9wc1R5cGUgPSB7XG4gIGxpbWl0OiBudW1iZXI7XG4gIHVuaXRzOiBzdHJpbmc7XG59O1xuXG50eXBlIFByb3BzVHlwZSA9IHtcbiAgaTE4bjogTG9jYWxpemVyVHlwZTtcbiAgb25DbG9zZTogKCkgPT4gdW5rbm93bjtcbn0gJiBUb2FzdFByb3BzVHlwZTtcblxuZXhwb3J0IGNvbnN0IFRvYXN0RmlsZVNpemUgPSAoe1xuICBpMThuLFxuICBsaW1pdCxcbiAgb25DbG9zZSxcbiAgdW5pdHMsXG59OiBQcm9wc1R5cGUpOiBKU1guRWxlbWVudCA9PiB7XG4gIHJldHVybiAoXG4gICAgPFRvYXN0IG9uQ2xvc2U9e29uQ2xvc2V9PlxuICAgICAge2kxOG4oJ2ZpbGVTaXplV2FybmluZycpfSB7bGltaXR9XG4gICAgICB7dW5pdHN9XG4gICAgPC9Ub2FzdD5cbiAgKTtcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsbUJBQWtCO0FBRWxCLG1CQUFzQjtBQVlmLE1BQU0sZ0JBQWdCLHdCQUFDO0FBQUEsRUFDNUI7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxNQUM0QjtBQUM1QixTQUNFLG1EQUFDO0FBQUEsSUFBTTtBQUFBLEtBQ0osS0FBSyxpQkFBaUIsR0FBRSxLQUFFLE9BQzFCLEtBQ0g7QUFFSixHQVo2QjsiLAogICJuYW1lcyI6IFtdCn0K
