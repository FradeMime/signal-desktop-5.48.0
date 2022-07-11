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
var isGroupCallOutboundRingEnabled_exports = {};
__export(isGroupCallOutboundRingEnabled_exports, {
  isGroupCallOutboundRingEnabled: () => isGroupCallOutboundRingEnabled
});
module.exports = __toCommonJS(isGroupCallOutboundRingEnabled_exports);
var RemoteConfig = __toESM(require("../RemoteConfig"));
function isGroupCallOutboundRingEnabled() {
  return Boolean(RemoteConfig.isEnabled("desktop.internalUser") || RemoteConfig.isEnabled("desktop.groupCallOutboundRing"));
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  isGroupCallOutboundRingEnabled
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiaXNHcm91cENhbGxPdXRib3VuZFJpbmdFbmFibGVkLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCAqIGFzIFJlbW90ZUNvbmZpZyBmcm9tICcuLi9SZW1vdGVDb25maWcnO1xuXG5leHBvcnQgZnVuY3Rpb24gaXNHcm91cENhbGxPdXRib3VuZFJpbmdFbmFibGVkKCk6IGJvb2xlYW4ge1xuICByZXR1cm4gQm9vbGVhbihcbiAgICBSZW1vdGVDb25maWcuaXNFbmFibGVkKCdkZXNrdG9wLmludGVybmFsVXNlcicpIHx8XG4gICAgICBSZW1vdGVDb25maWcuaXNFbmFibGVkKCdkZXNrdG9wLmdyb3VwQ2FsbE91dGJvdW5kUmluZycpXG4gICk7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsbUJBQThCO0FBRXZCLDBDQUFtRDtBQUN4RCxTQUFPLFFBQ0wsYUFBYSxVQUFVLHNCQUFzQixLQUMzQyxhQUFhLFVBQVUsK0JBQStCLENBQzFEO0FBQ0Y7QUFMZ0IiLAogICJuYW1lcyI6IFtdCn0K
