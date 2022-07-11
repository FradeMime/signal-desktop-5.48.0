var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var Timers_exports = {};
__export(Timers_exports, {
  clearTimeout: () => clearTimeout,
  setTimeout: () => setTimeout
});
module.exports = __toCommonJS(Timers_exports);
const { timers } = window.SignalContext;
function setTimeout(...args) {
  return timers.setTimeout(...args);
}
function clearTimeout(...args) {
  return timers.clearTimeout(...args);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  clearTimeout,
  setTimeout
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiVGltZXJzLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmNvbnN0IHsgdGltZXJzIH0gPSB3aW5kb3cuU2lnbmFsQ29udGV4dDtcblxuZXhwb3J0IHR5cGUgeyBUaW1lb3V0IH0gZnJvbSAnLi9jb250ZXh0L1RpbWVycyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRUaW1lb3V0KFxuICAuLi5hcmdzOiBQYXJhbWV0ZXJzPHR5cGVvZiB0aW1lcnMuc2V0VGltZW91dD5cbik6IFJldHVyblR5cGU8dHlwZW9mIHRpbWVycy5zZXRUaW1lb3V0PiB7XG4gIHJldHVybiB0aW1lcnMuc2V0VGltZW91dCguLi5hcmdzKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNsZWFyVGltZW91dChcbiAgLi4uYXJnczogUGFyYW1ldGVyczx0eXBlb2YgdGltZXJzLmNsZWFyVGltZW91dD5cbik6IFJldHVyblR5cGU8dHlwZW9mIHRpbWVycy5jbGVhclRpbWVvdXQ+IHtcbiAgcmV0dXJuIHRpbWVycy5jbGVhclRpbWVvdXQoLi4uYXJncyk7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxNQUFNLEVBQUUsV0FBVyxPQUFPO0FBSW5CLHVCQUNGLE1BQ21DO0FBQ3RDLFNBQU8sT0FBTyxXQUFXLEdBQUcsSUFBSTtBQUNsQztBQUpnQixBQU1ULHlCQUNGLE1BQ3FDO0FBQ3hDLFNBQU8sT0FBTyxhQUFhLEdBQUcsSUFBSTtBQUNwQztBQUpnQiIsCiAgIm5hbWVzIjogW10KfQo=
