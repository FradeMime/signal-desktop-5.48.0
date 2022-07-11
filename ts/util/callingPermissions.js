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
var callingPermissions_exports = {};
__export(callingPermissions_exports, {
  requestCameraPermissions: () => requestCameraPermissions
});
module.exports = __toCommonJS(callingPermissions_exports);
async function requestCameraPermissions() {
  if (!await window.getMediaCameraPermissions()) {
    await window.showPermissionsPopup(true, true);
    return window.getMediaCameraPermissions();
  }
  return true;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  requestCameraPermissions
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiY2FsbGluZ1Blcm1pc3Npb25zLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMCBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZXF1ZXN0Q2FtZXJhUGVybWlzc2lvbnMoKTogUHJvbWlzZTxib29sZWFuPiB7XG4gIGlmICghKGF3YWl0IHdpbmRvdy5nZXRNZWRpYUNhbWVyYVBlcm1pc3Npb25zKCkpKSB7XG4gICAgYXdhaXQgd2luZG93LnNob3dQZXJtaXNzaW9uc1BvcHVwKHRydWUsIHRydWUpO1xuXG4gICAgLy8gQ2hlY2sgdGhlIHNldHRpbmcgYWdhaW4gKGZyb20gdGhlIHNvdXJjZSBvZiB0cnV0aCkuXG4gICAgcmV0dXJuIHdpbmRvdy5nZXRNZWRpYUNhbWVyYVBlcm1pc3Npb25zKCk7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSwwQ0FBbUU7QUFDakUsTUFBSSxDQUFFLE1BQU0sT0FBTywwQkFBMEIsR0FBSTtBQUMvQyxVQUFNLE9BQU8scUJBQXFCLE1BQU0sSUFBSTtBQUc1QyxXQUFPLE9BQU8sMEJBQTBCO0FBQUEsRUFDMUM7QUFFQSxTQUFPO0FBQ1Q7QUFUc0IiLAogICJuYW1lcyI6IFtdCn0K
