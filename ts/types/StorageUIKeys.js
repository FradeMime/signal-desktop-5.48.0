var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var StorageUIKeys_exports = {};
__export(StorageUIKeys_exports, {
  STORAGE_UI_KEYS: () => STORAGE_UI_KEYS,
  themeSettingSchema: () => themeSettingSchema
});
module.exports = __toCommonJS(StorageUIKeys_exports);
var import_zod = require("zod");
const themeSettingSchema = import_zod.z.enum(["system", "light", "dark"]);
const STORAGE_UI_KEYS = [
  "always-relay-calls",
  "audio-notification",
  "auto-download-update",
  "badge-count-muted-conversations",
  "call-ringtone-notification",
  "call-system-notification",
  "customColors",
  "defaultConversationColor",
  "hasAllStoriesMuted",
  "hide-menu-bar",
  "incoming-call-notification",
  "notification-draw-attention",
  "notification-setting",
  "preferred-audio-input-device",
  "preferred-audio-output-device",
  "preferred-video-input-device",
  "preferredLeftPaneWidth",
  "preferredReactionEmoji",
  "previousAudioDeviceModule",
  "showStickerPickerHint",
  "showStickersIntroduction",
  "skinTone",
  "spell-check",
  "system-tray-setting",
  "theme-setting",
  "zoomFactor"
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  STORAGE_UI_KEYS,
  themeSettingSchema
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiU3RvcmFnZVVJS2V5cy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyB6IH0gZnJvbSAnem9kJztcblxuaW1wb3J0IHR5cGUgeyBTdG9yYWdlQWNjZXNzVHlwZSB9IGZyb20gJy4vU3RvcmFnZS5kJztcblxuZXhwb3J0IGNvbnN0IHRoZW1lU2V0dGluZ1NjaGVtYSA9IHouZW51bShbJ3N5c3RlbScsICdsaWdodCcsICdkYXJrJ10pO1xuZXhwb3J0IHR5cGUgVGhlbWVTZXR0aW5nVHlwZSA9IHouaW5mZXI8dHlwZW9mIHRoZW1lU2V0dGluZ1NjaGVtYT47XG5cbi8vIENvbmZpZ3VyYXRpb24ga2V5cyB0aGF0IG9ubHkgYWZmZWN0IFVJXG5leHBvcnQgY29uc3QgU1RPUkFHRV9VSV9LRVlTOiBSZWFkb25seUFycmF5PGtleW9mIFN0b3JhZ2VBY2Nlc3NUeXBlPiA9IFtcbiAgJ2Fsd2F5cy1yZWxheS1jYWxscycsXG4gICdhdWRpby1ub3RpZmljYXRpb24nLFxuICAnYXV0by1kb3dubG9hZC11cGRhdGUnLFxuICAnYmFkZ2UtY291bnQtbXV0ZWQtY29udmVyc2F0aW9ucycsXG4gICdjYWxsLXJpbmd0b25lLW5vdGlmaWNhdGlvbicsXG4gICdjYWxsLXN5c3RlbS1ub3RpZmljYXRpb24nLFxuICAnY3VzdG9tQ29sb3JzJyxcbiAgJ2RlZmF1bHRDb252ZXJzYXRpb25Db2xvcicsXG4gICdoYXNBbGxTdG9yaWVzTXV0ZWQnLFxuICAnaGlkZS1tZW51LWJhcicsXG4gICdpbmNvbWluZy1jYWxsLW5vdGlmaWNhdGlvbicsXG4gICdub3RpZmljYXRpb24tZHJhdy1hdHRlbnRpb24nLFxuICAnbm90aWZpY2F0aW9uLXNldHRpbmcnLFxuICAncHJlZmVycmVkLWF1ZGlvLWlucHV0LWRldmljZScsXG4gICdwcmVmZXJyZWQtYXVkaW8tb3V0cHV0LWRldmljZScsXG4gICdwcmVmZXJyZWQtdmlkZW8taW5wdXQtZGV2aWNlJyxcbiAgJ3ByZWZlcnJlZExlZnRQYW5lV2lkdGgnLFxuICAncHJlZmVycmVkUmVhY3Rpb25FbW9qaScsXG4gICdwcmV2aW91c0F1ZGlvRGV2aWNlTW9kdWxlJyxcbiAgJ3Nob3dTdGlja2VyUGlja2VySGludCcsXG4gICdzaG93U3RpY2tlcnNJbnRyb2R1Y3Rpb24nLFxuICAnc2tpblRvbmUnLFxuICAnc3BlbGwtY2hlY2snLFxuICAnc3lzdGVtLXRyYXktc2V0dGluZycsXG4gICd0aGVtZS1zZXR0aW5nJyxcbiAgJ3pvb21GYWN0b3InLFxuXTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsaUJBQWtCO0FBSVgsTUFBTSxxQkFBcUIsYUFBRSxLQUFLLENBQUMsVUFBVSxTQUFTLE1BQU0sQ0FBQztBQUk3RCxNQUFNLGtCQUEwRDtBQUFBLEVBQ3JFO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUNGOyIsCiAgIm5hbWVzIjogW10KfQo=
