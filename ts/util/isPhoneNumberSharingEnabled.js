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
var isPhoneNumberSharingEnabled_exports = {};
__export(isPhoneNumberSharingEnabled_exports, {
  isPhoneNumberSharingEnabled: () => isPhoneNumberSharingEnabled
});
module.exports = __toCommonJS(isPhoneNumberSharingEnabled_exports);
var RemoteConfig = __toESM(require("../RemoteConfig"));
function isPhoneNumberSharingEnabled() {
  return Boolean(RemoteConfig.isEnabled("desktop.internalUser"));
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  isPhoneNumberSharingEnabled
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiaXNQaG9uZU51bWJlclNoYXJpbmdFbmFibGVkLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCAqIGFzIFJlbW90ZUNvbmZpZyBmcm9tICcuLi9SZW1vdGVDb25maWcnO1xuXG5leHBvcnQgZnVuY3Rpb24gaXNQaG9uZU51bWJlclNoYXJpbmdFbmFibGVkKCk6IGJvb2xlYW4ge1xuICByZXR1cm4gQm9vbGVhbihSZW1vdGVDb25maWcuaXNFbmFibGVkKCdkZXNrdG9wLmludGVybmFsVXNlcicpKTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxtQkFBOEI7QUFFdkIsdUNBQWdEO0FBQ3JELFNBQU8sUUFBUSxhQUFhLFVBQVUsc0JBQXNCLENBQUM7QUFDL0Q7QUFGZ0IiLAogICJuYW1lcyI6IFtdCn0K
