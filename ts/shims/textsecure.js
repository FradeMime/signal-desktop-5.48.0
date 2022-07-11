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
var textsecure_exports = {};
__export(textsecure_exports, {
  sendStickerPackSync: () => sendStickerPackSync
});
module.exports = __toCommonJS(textsecure_exports);
var log = __toESM(require("../logging/log"));
var import_singleProtoJobQueue = require("../jobs/singleProtoJobQueue");
var Errors = __toESM(require("../types/errors"));
var import_SendMessage = __toESM(require("../textsecure/SendMessage"));
async function sendStickerPackSync(packId, packKey, installed) {
  if (window.ConversationController.areWePrimaryDevice()) {
    log.warn("shims/sendStickerPackSync: We are primary device; not sending sync");
    return;
  }
  try {
    await import_singleProtoJobQueue.singleProtoJobQueue.add(import_SendMessage.default.getStickerPackSync([
      {
        packId,
        packKey,
        installed
      }
    ]));
  } catch (error) {
    log.error("sendStickerPackSync: Failed to queue sync message", Errors.toLogFormat(error));
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  sendStickerPackSync
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidGV4dHNlY3VyZS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMTktMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCAqIGFzIGxvZyBmcm9tICcuLi9sb2dnaW5nL2xvZyc7XG5pbXBvcnQgeyBzaW5nbGVQcm90b0pvYlF1ZXVlIH0gZnJvbSAnLi4vam9icy9zaW5nbGVQcm90b0pvYlF1ZXVlJztcbmltcG9ydCAqIGFzIEVycm9ycyBmcm9tICcuLi90eXBlcy9lcnJvcnMnO1xuaW1wb3J0IE1lc3NhZ2VTZW5kZXIgZnJvbSAnLi4vdGV4dHNlY3VyZS9TZW5kTWVzc2FnZSc7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzZW5kU3RpY2tlclBhY2tTeW5jKFxuICBwYWNrSWQ6IHN0cmluZyxcbiAgcGFja0tleTogc3RyaW5nLFxuICBpbnN0YWxsZWQ6IGJvb2xlYW5cbik6IFByb21pc2U8dm9pZD4ge1xuICBpZiAod2luZG93LkNvbnZlcnNhdGlvbkNvbnRyb2xsZXIuYXJlV2VQcmltYXJ5RGV2aWNlKCkpIHtcbiAgICBsb2cud2FybihcbiAgICAgICdzaGltcy9zZW5kU3RpY2tlclBhY2tTeW5jOiBXZSBhcmUgcHJpbWFyeSBkZXZpY2U7IG5vdCBzZW5kaW5nIHN5bmMnXG4gICAgKTtcbiAgICByZXR1cm47XG4gIH1cblxuICB0cnkge1xuICAgIGF3YWl0IHNpbmdsZVByb3RvSm9iUXVldWUuYWRkKFxuICAgICAgTWVzc2FnZVNlbmRlci5nZXRTdGlja2VyUGFja1N5bmMoW1xuICAgICAgICB7XG4gICAgICAgICAgcGFja0lkLFxuICAgICAgICAgIHBhY2tLZXksXG4gICAgICAgICAgaW5zdGFsbGVkLFxuICAgICAgICB9LFxuICAgICAgXSlcbiAgICApO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGxvZy5lcnJvcihcbiAgICAgICdzZW5kU3RpY2tlclBhY2tTeW5jOiBGYWlsZWQgdG8gcXVldWUgc3luYyBtZXNzYWdlJyxcbiAgICAgIEVycm9ycy50b0xvZ0Zvcm1hdChlcnJvcilcbiAgICApO1xuICB9XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsVUFBcUI7QUFDckIsaUNBQW9DO0FBQ3BDLGFBQXdCO0FBQ3hCLHlCQUEwQjtBQUUxQixtQ0FDRSxRQUNBLFNBQ0EsV0FDZTtBQUNmLE1BQUksT0FBTyx1QkFBdUIsbUJBQW1CLEdBQUc7QUFDdEQsUUFBSSxLQUNGLG9FQUNGO0FBQ0E7QUFBQSxFQUNGO0FBRUEsTUFBSTtBQUNGLFVBQU0sK0NBQW9CLElBQ3hCLDJCQUFjLG1CQUFtQjtBQUFBLE1BQy9CO0FBQUEsUUFDRTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsTUFDRjtBQUFBLElBQ0YsQ0FBQyxDQUNIO0FBQUEsRUFDRixTQUFTLE9BQVA7QUFDQSxRQUFJLE1BQ0YscURBQ0EsT0FBTyxZQUFZLEtBQUssQ0FDMUI7QUFBQSxFQUNGO0FBQ0Y7QUE1QnNCIiwKICAibmFtZXMiOiBbXQp9Cg==
