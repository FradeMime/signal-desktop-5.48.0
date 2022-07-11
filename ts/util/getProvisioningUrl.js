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
var getProvisioningUrl_exports = {};
__export(getProvisioningUrl_exports, {
  getProvisioningUrl: () => getProvisioningUrl
});
module.exports = __toCommonJS(getProvisioningUrl_exports);
var Bytes = __toESM(require("../Bytes"));
function getProvisioningUrl(uuid, publicKey) {
  const url = new URL("sgnl://linkdevice");
  url.searchParams.set("uuid", uuid);
  url.searchParams.set("pub_key", Bytes.toBase64(publicKey));
  return url.toString();
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getProvisioningUrl
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZ2V0UHJvdmlzaW9uaW5nVXJsLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCAqIGFzIEJ5dGVzIGZyb20gJy4uL0J5dGVzJztcblxuZXhwb3J0IGZ1bmN0aW9uIGdldFByb3Zpc2lvbmluZ1VybChcbiAgdXVpZDogc3RyaW5nLFxuICBwdWJsaWNLZXk6IFVpbnQ4QXJyYXlcbik6IHN0cmluZyB7XG4gIGNvbnN0IHVybCA9IG5ldyBVUkwoJ3Nnbmw6Ly9saW5rZGV2aWNlJyk7XG4gIHVybC5zZWFyY2hQYXJhbXMuc2V0KCd1dWlkJywgdXVpZCk7XG4gIHVybC5zZWFyY2hQYXJhbXMuc2V0KCdwdWJfa2V5JywgQnl0ZXMudG9CYXNlNjQocHVibGljS2V5KSk7XG4gIHJldHVybiB1cmwudG9TdHJpbmcoKTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxZQUF1QjtBQUVoQiw0QkFDTCxNQUNBLFdBQ1E7QUFDUixRQUFNLE1BQU0sSUFBSSxJQUFJLG1CQUFtQjtBQUN2QyxNQUFJLGFBQWEsSUFBSSxRQUFRLElBQUk7QUFDakMsTUFBSSxhQUFhLElBQUksV0FBVyxNQUFNLFNBQVMsU0FBUyxDQUFDO0FBQ3pELFNBQU8sSUFBSSxTQUFTO0FBQ3RCO0FBUmdCIiwKICAibmFtZXMiOiBbXQp9Cg==
