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
var ConfirmDiscardDialog_exports = {};
__export(ConfirmDiscardDialog_exports, {
  ConfirmDiscardDialog: () => ConfirmDiscardDialog
});
module.exports = __toCommonJS(ConfirmDiscardDialog_exports);
var import_react = __toESM(require("react"));
var import_ConfirmationDialog = require("./ConfirmationDialog");
const ConfirmDiscardDialog = /* @__PURE__ */ __name(({
  i18n,
  onClose,
  onDiscard
}) => {
  return /* @__PURE__ */ import_react.default.createElement(import_ConfirmationDialog.ConfirmationDialog, {
    actions: [
      {
        action: onDiscard,
        text: i18n("discard"),
        style: "negative"
      }
    ],
    i18n,
    onClose
  }, i18n("ConfirmDiscardDialog--discard"));
}, "ConfirmDiscardDialog");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ConfirmDiscardDialog
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ29uZmlybURpc2NhcmREaWFsb2cudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBDb25maXJtYXRpb25EaWFsb2cgfSBmcm9tICcuL0NvbmZpcm1hdGlvbkRpYWxvZyc7XG5pbXBvcnQgdHlwZSB7IExvY2FsaXplclR5cGUgfSBmcm9tICcuLi90eXBlcy9VdGlsJztcblxuZXhwb3J0IHR5cGUgUHJvcHNUeXBlID0ge1xuICBpMThuOiBMb2NhbGl6ZXJUeXBlO1xuICBvbkNsb3NlOiAoKSA9PiB1bmtub3duO1xuICBvbkRpc2NhcmQ6ICgpID0+IHVua25vd247XG59O1xuXG5leHBvcnQgY29uc3QgQ29uZmlybURpc2NhcmREaWFsb2cgPSAoe1xuICBpMThuLFxuICBvbkNsb3NlLFxuICBvbkRpc2NhcmQsXG59OiBQcm9wc1R5cGUpOiBKU1guRWxlbWVudCB8IG51bGwgPT4ge1xuICByZXR1cm4gKFxuICAgIDxDb25maXJtYXRpb25EaWFsb2dcbiAgICAgIGFjdGlvbnM9e1tcbiAgICAgICAge1xuICAgICAgICAgIGFjdGlvbjogb25EaXNjYXJkLFxuICAgICAgICAgIHRleHQ6IGkxOG4oJ2Rpc2NhcmQnKSxcbiAgICAgICAgICBzdHlsZTogJ25lZ2F0aXZlJyxcbiAgICAgICAgfSxcbiAgICAgIF19XG4gICAgICBpMThuPXtpMThufVxuICAgICAgb25DbG9zZT17b25DbG9zZX1cbiAgICA+XG4gICAgICB7aTE4bignQ29uZmlybURpc2NhcmREaWFsb2ctLWRpc2NhcmQnKX1cbiAgICA8L0NvbmZpcm1hdGlvbkRpYWxvZz5cbiAgKTtcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsbUJBQWtCO0FBQ2xCLGdDQUFtQztBQVM1QixNQUFNLHVCQUF1Qix3QkFBQztBQUFBLEVBQ25DO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxNQUNtQztBQUNuQyxTQUNFLG1EQUFDO0FBQUEsSUFDQyxTQUFTO0FBQUEsTUFDUDtBQUFBLFFBQ0UsUUFBUTtBQUFBLFFBQ1IsTUFBTSxLQUFLLFNBQVM7QUFBQSxRQUNwQixPQUFPO0FBQUEsTUFDVDtBQUFBLElBQ0Y7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEtBRUMsS0FBSywrQkFBK0IsQ0FDdkM7QUFFSixHQXBCb0M7IiwKICAibmFtZXMiOiBbXQp9Cg==
