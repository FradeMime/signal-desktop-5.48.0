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
var sleepForRateLimitRetryAfterTime_exports = {};
__export(sleepForRateLimitRetryAfterTime_exports, {
  sleepForRateLimitRetryAfterTime: () => sleepForRateLimitRetryAfterTime
});
module.exports = __toCommonJS(sleepForRateLimitRetryAfterTime_exports);
var import_sleep = require("../../util/sleep");
var import_findRetryAfterTimeFromError = require("./findRetryAfterTimeFromError");
async function sleepForRateLimitRetryAfterTime({
  err,
  log,
  timeRemaining
}) {
  if (timeRemaining <= 0) {
    return;
  }
  const retryAfter = Math.min((0, import_findRetryAfterTimeFromError.findRetryAfterTimeFromError)(err), timeRemaining);
  log.info(`Got a 413 or 429 response code. Sleeping for ${retryAfter} millisecond(s)`);
  await (0, import_sleep.sleep)(retryAfter);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  sleepForRateLimitRetryAfterTime
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic2xlZXBGb3JSYXRlTGltaXRSZXRyeUFmdGVyVGltZS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEtMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB0eXBlIHsgTG9nZ2VyVHlwZSB9IGZyb20gJy4uLy4uL3R5cGVzL0xvZ2dpbmcnO1xuaW1wb3J0IHsgc2xlZXAgfSBmcm9tICcuLi8uLi91dGlsL3NsZWVwJztcbmltcG9ydCB7IGZpbmRSZXRyeUFmdGVyVGltZUZyb21FcnJvciB9IGZyb20gJy4vZmluZFJldHJ5QWZ0ZXJUaW1lRnJvbUVycm9yJztcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNsZWVwRm9yUmF0ZUxpbWl0UmV0cnlBZnRlclRpbWUoe1xuICBlcnIsXG4gIGxvZyxcbiAgdGltZVJlbWFpbmluZyxcbn06IFJlYWRvbmx5PHtcbiAgZXJyOiB1bmtub3duO1xuICBsb2c6IFBpY2s8TG9nZ2VyVHlwZSwgJ2luZm8nPjtcbiAgdGltZVJlbWFpbmluZzogbnVtYmVyO1xufT4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgaWYgKHRpbWVSZW1haW5pbmcgPD0gMCkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IHJldHJ5QWZ0ZXIgPSBNYXRoLm1pbihmaW5kUmV0cnlBZnRlclRpbWVGcm9tRXJyb3IoZXJyKSwgdGltZVJlbWFpbmluZyk7XG5cbiAgbG9nLmluZm8oXG4gICAgYEdvdCBhIDQxMyBvciA0MjkgcmVzcG9uc2UgY29kZS4gU2xlZXBpbmcgZm9yICR7cmV0cnlBZnRlcn0gbWlsbGlzZWNvbmQocylgXG4gICk7XG5cbiAgYXdhaXQgc2xlZXAocmV0cnlBZnRlcik7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSUEsbUJBQXNCO0FBQ3RCLHlDQUE0QztBQUU1QywrQ0FBc0Q7QUFBQSxFQUNwRDtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsR0FLaUI7QUFDakIsTUFBSSxpQkFBaUIsR0FBRztBQUN0QjtBQUFBLEVBQ0Y7QUFFQSxRQUFNLGFBQWEsS0FBSyxJQUFJLG9FQUE0QixHQUFHLEdBQUcsYUFBYTtBQUUzRSxNQUFJLEtBQ0YsZ0RBQWdELDJCQUNsRDtBQUVBLFFBQU0sd0JBQU0sVUFBVTtBQUN4QjtBQXBCc0IiLAogICJuYW1lcyI6IFtdCn0K
