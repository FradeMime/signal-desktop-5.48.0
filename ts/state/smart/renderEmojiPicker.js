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
var renderEmojiPicker_exports = {};
__export(renderEmojiPicker_exports, {
  renderEmojiPicker: () => renderEmojiPicker
});
module.exports = __toCommonJS(renderEmojiPicker_exports);
var import_react = __toESM(require("react"));
var import_EmojiPicker = require("./EmojiPicker");
function renderEmojiPicker({
  ref,
  onClickSettings,
  onPickEmoji,
  onSetSkinTone,
  onClose,
  style
}) {
  return /* @__PURE__ */ import_react.default.createElement(import_EmojiPicker.SmartEmojiPicker, {
    ref,
    onClickSettings,
    onPickEmoji,
    onSetSkinTone,
    onClose,
    style
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  renderEmojiPicker
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsicmVuZGVyRW1vamlQaWNrZXIudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB0eXBlIHsgUmVuZGVyRW1vamlQaWNrZXJQcm9wcyB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvY29udmVyc2F0aW9uL1JlYWN0aW9uUGlja2VyJztcbmltcG9ydCB7IFNtYXJ0RW1vamlQaWNrZXIgfSBmcm9tICcuL0Vtb2ppUGlja2VyJztcblxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlckVtb2ppUGlja2VyKHtcbiAgcmVmLFxuICBvbkNsaWNrU2V0dGluZ3MsXG4gIG9uUGlja0Vtb2ppLFxuICBvblNldFNraW5Ub25lLFxuICBvbkNsb3NlLFxuICBzdHlsZSxcbn06IFJlbmRlckVtb2ppUGlja2VyUHJvcHMpOiBKU1guRWxlbWVudCB7XG4gIHJldHVybiAoXG4gICAgPFNtYXJ0RW1vamlQaWNrZXJcbiAgICAgIHJlZj17cmVmfVxuICAgICAgb25DbGlja1NldHRpbmdzPXtvbkNsaWNrU2V0dGluZ3N9XG4gICAgICBvblBpY2tFbW9qaT17b25QaWNrRW1vaml9XG4gICAgICBvblNldFNraW5Ub25lPXtvblNldFNraW5Ub25lfVxuICAgICAgb25DbG9zZT17b25DbG9zZX1cbiAgICAgIHN0eWxlPXtzdHlsZX1cbiAgICAvPlxuICApO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLG1CQUFrQjtBQUdsQix5QkFBaUM7QUFFMUIsMkJBQTJCO0FBQUEsRUFDaEM7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEdBQ3NDO0FBQ3RDLFNBQ0UsbURBQUM7QUFBQSxJQUNDO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxHQUNGO0FBRUo7QUFsQmdCIiwKICAibmFtZXMiOiBbXQp9Cg==
