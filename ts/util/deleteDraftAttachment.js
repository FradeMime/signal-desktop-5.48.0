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
var deleteDraftAttachment_exports = {};
__export(deleteDraftAttachment_exports, {
  deleteDraftAttachment: () => deleteDraftAttachment
});
module.exports = __toCommonJS(deleteDraftAttachment_exports);
async function deleteDraftAttachment(attachment) {
  if (attachment.screenshotPath) {
    await window.Signal.Migrations.deleteDraftFile(attachment.screenshotPath);
  }
  if (attachment.path) {
    await window.Signal.Migrations.deleteDraftFile(attachment.path);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  deleteDraftAttachment
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZGVsZXRlRHJhZnRBdHRhY2htZW50LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB0eXBlIHsgQXR0YWNobWVudFR5cGUgfSBmcm9tICcuLi90eXBlcy9BdHRhY2htZW50JztcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGRlbGV0ZURyYWZ0QXR0YWNobWVudChcbiAgYXR0YWNobWVudDogUGljazxBdHRhY2htZW50VHlwZSwgJ3NjcmVlbnNob3RQYXRoJyB8ICdwYXRoJz5cbik6IFByb21pc2U8dm9pZD4ge1xuICBpZiAoYXR0YWNobWVudC5zY3JlZW5zaG90UGF0aCkge1xuICAgIGF3YWl0IHdpbmRvdy5TaWduYWwuTWlncmF0aW9ucy5kZWxldGVEcmFmdEZpbGUoYXR0YWNobWVudC5zY3JlZW5zaG90UGF0aCk7XG4gIH1cbiAgaWYgKGF0dGFjaG1lbnQucGF0aCkge1xuICAgIGF3YWl0IHdpbmRvdy5TaWduYWwuTWlncmF0aW9ucy5kZWxldGVEcmFmdEZpbGUoYXR0YWNobWVudC5wYXRoKTtcbiAgfVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUtBLHFDQUNFLFlBQ2U7QUFDZixNQUFJLFdBQVcsZ0JBQWdCO0FBQzdCLFVBQU0sT0FBTyxPQUFPLFdBQVcsZ0JBQWdCLFdBQVcsY0FBYztBQUFBLEVBQzFFO0FBQ0EsTUFBSSxXQUFXLE1BQU07QUFDbkIsVUFBTSxPQUFPLE9BQU8sV0FBVyxnQkFBZ0IsV0FBVyxJQUFJO0FBQUEsRUFDaEU7QUFDRjtBQVRzQiIsCiAgIm5hbWVzIjogW10KfQo=
