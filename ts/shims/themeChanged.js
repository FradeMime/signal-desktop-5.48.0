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
var themeChanged_exports = {};
__export(themeChanged_exports, {
  themeChanged: () => themeChanged
});
module.exports = __toCommonJS(themeChanged_exports);
function themeChanged() {
  if (window.reduxActions && window.reduxActions.user) {
    const theme = window.Events.getThemeSetting();
    window.reduxActions.user.userChanged({
      theme: theme === "system" ? window.systemTheme : theme
    });
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  themeChanged
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidGhlbWVDaGFuZ2VkLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmV4cG9ydCBmdW5jdGlvbiB0aGVtZUNoYW5nZWQoKTogdm9pZCB7XG4gIGlmICh3aW5kb3cucmVkdXhBY3Rpb25zICYmIHdpbmRvdy5yZWR1eEFjdGlvbnMudXNlcikge1xuICAgIGNvbnN0IHRoZW1lID0gd2luZG93LkV2ZW50cy5nZXRUaGVtZVNldHRpbmcoKTtcbiAgICB3aW5kb3cucmVkdXhBY3Rpb25zLnVzZXIudXNlckNoYW5nZWQoe1xuICAgICAgdGhlbWU6IHRoZW1lID09PSAnc3lzdGVtJyA/IHdpbmRvdy5zeXN0ZW1UaGVtZSA6IHRoZW1lLFxuICAgIH0pO1xuICB9XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR08sd0JBQThCO0FBQ25DLE1BQUksT0FBTyxnQkFBZ0IsT0FBTyxhQUFhLE1BQU07QUFDbkQsVUFBTSxRQUFRLE9BQU8sT0FBTyxnQkFBZ0I7QUFDNUMsV0FBTyxhQUFhLEtBQUssWUFBWTtBQUFBLE1BQ25DLE9BQU8sVUFBVSxXQUFXLE9BQU8sY0FBYztBQUFBLElBQ25ELENBQUM7QUFBQSxFQUNIO0FBQ0Y7QUFQZ0IiLAogICJuYW1lcyI6IFtdCn0K
