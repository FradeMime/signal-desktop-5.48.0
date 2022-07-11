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
var downloadAttachment_exports = {};
__export(downloadAttachment_exports, {
  downloadAttachment: () => downloadAttachment
});
module.exports = __toCommonJS(downloadAttachment_exports);
var import_downloadAttachment = require("../textsecure/downloadAttachment");
async function downloadAttachment(attachmentData) {
  let migratedAttachment;
  const { server } = window.textsecure;
  if (!server) {
    throw new Error("window.textsecure.server is not available!");
  }
  const { id: legacyId } = attachmentData;
  if (legacyId === void 0) {
    migratedAttachment = attachmentData;
  } else {
    migratedAttachment = {
      ...attachmentData,
      cdnId: String(legacyId)
    };
  }
  let downloaded;
  try {
    downloaded = await (0, import_downloadAttachment.downloadAttachment)(server, migratedAttachment);
  } catch (error) {
    if (error && error.code === 404) {
      return null;
    }
    throw error;
  }
  return downloaded;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  downloadAttachment
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZG93bmxvYWRBdHRhY2htZW50LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMCBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB0eXBlIHtcbiAgQXR0YWNobWVudFR5cGUsXG4gIERvd25sb2FkZWRBdHRhY2htZW50VHlwZSxcbn0gZnJvbSAnLi4vdHlwZXMvQXR0YWNobWVudCc7XG5pbXBvcnQgeyBkb3dubG9hZEF0dGFjaG1lbnQgYXMgZG9Eb3dubG9hZEF0dGFjaG1lbnQgfSBmcm9tICcuLi90ZXh0c2VjdXJlL2Rvd25sb2FkQXR0YWNobWVudCc7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBkb3dubG9hZEF0dGFjaG1lbnQoXG4gIGF0dGFjaG1lbnREYXRhOiBBdHRhY2htZW50VHlwZVxuKTogUHJvbWlzZTxEb3dubG9hZGVkQXR0YWNobWVudFR5cGUgfCBudWxsPiB7XG4gIGxldCBtaWdyYXRlZEF0dGFjaG1lbnQ6IEF0dGFjaG1lbnRUeXBlO1xuXG4gIGNvbnN0IHsgc2VydmVyIH0gPSB3aW5kb3cudGV4dHNlY3VyZTtcbiAgaWYgKCFzZXJ2ZXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3dpbmRvdy50ZXh0c2VjdXJlLnNlcnZlciBpcyBub3QgYXZhaWxhYmxlIScpO1xuICB9XG5cbiAgY29uc3QgeyBpZDogbGVnYWN5SWQgfSA9IGF0dGFjaG1lbnREYXRhO1xuICBpZiAobGVnYWN5SWQgPT09IHVuZGVmaW5lZCkge1xuICAgIG1pZ3JhdGVkQXR0YWNobWVudCA9IGF0dGFjaG1lbnREYXRhO1xuICB9IGVsc2Uge1xuICAgIG1pZ3JhdGVkQXR0YWNobWVudCA9IHtcbiAgICAgIC4uLmF0dGFjaG1lbnREYXRhLFxuICAgICAgY2RuSWQ6IFN0cmluZyhsZWdhY3lJZCksXG4gICAgfTtcbiAgfVxuXG4gIGxldCBkb3dubG9hZGVkO1xuICB0cnkge1xuICAgIGRvd25sb2FkZWQgPSBhd2FpdCBkb0Rvd25sb2FkQXR0YWNobWVudChzZXJ2ZXIsIG1pZ3JhdGVkQXR0YWNobWVudCk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgLy8gQXR0YWNobWVudHMgb24gdGhlIHNlcnZlciBleHBpcmUgYWZ0ZXIgMzAgZGF5cywgdGhlbiBzdGFydCByZXR1cm5pbmcgNDA0XG4gICAgaWYgKGVycm9yICYmIGVycm9yLmNvZGUgPT09IDQwNCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgdGhyb3cgZXJyb3I7XG4gIH1cblxuICByZXR1cm4gZG93bmxvYWRlZDtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFPQSxnQ0FBMkQ7QUFFM0Qsa0NBQ0UsZ0JBQzBDO0FBQzFDLE1BQUk7QUFFSixRQUFNLEVBQUUsV0FBVyxPQUFPO0FBQzFCLE1BQUksQ0FBQyxRQUFRO0FBQ1gsVUFBTSxJQUFJLE1BQU0sNENBQTRDO0FBQUEsRUFDOUQ7QUFFQSxRQUFNLEVBQUUsSUFBSSxhQUFhO0FBQ3pCLE1BQUksYUFBYSxRQUFXO0FBQzFCLHlCQUFxQjtBQUFBLEVBQ3ZCLE9BQU87QUFDTCx5QkFBcUI7QUFBQSxTQUNoQjtBQUFBLE1BQ0gsT0FBTyxPQUFPLFFBQVE7QUFBQSxJQUN4QjtBQUFBLEVBQ0Y7QUFFQSxNQUFJO0FBQ0osTUFBSTtBQUNGLGlCQUFhLE1BQU0sa0RBQXFCLFFBQVEsa0JBQWtCO0FBQUEsRUFDcEUsU0FBUyxPQUFQO0FBRUEsUUFBSSxTQUFTLE1BQU0sU0FBUyxLQUFLO0FBQy9CLGFBQU87QUFBQSxJQUNUO0FBRUEsVUFBTTtBQUFBLEVBQ1I7QUFFQSxTQUFPO0FBQ1Q7QUFqQ3NCIiwKICAibmFtZXMiOiBbXQp9Cg==
