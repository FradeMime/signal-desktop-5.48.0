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
var handleCommonJobRequestError_exports = {};
__export(handleCommonJobRequestError_exports, {
  handleCommonJobRequestError: () => handleCommonJobRequestError
});
module.exports = __toCommonJS(handleCommonJobRequestError_exports);
var import_sleepForRateLimitRetryAfterTime = require("./sleepForRateLimitRetryAfterTime");
var import_getHttpErrorCode = require("./getHttpErrorCode");
async function handleCommonJobRequestError({
  err,
  log,
  timeRemaining
}) {
  switch ((0, import_getHttpErrorCode.getHttpErrorCode)(err)) {
    case 413:
    case 429:
      await (0, import_sleepForRateLimitRetryAfterTime.sleepForRateLimitRetryAfterTime)({ err, log, timeRemaining });
      return;
    case 508:
      log.info("server responded with 508. Giving up on this job");
      return;
    default:
      throw err;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handleCommonJobRequestError
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiaGFuZGxlQ29tbW9uSm9iUmVxdWVzdEVycm9yLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB0eXBlIHsgTG9nZ2VyVHlwZSB9IGZyb20gJy4uLy4uL3R5cGVzL0xvZ2dpbmcnO1xuaW1wb3J0IHsgc2xlZXBGb3JSYXRlTGltaXRSZXRyeUFmdGVyVGltZSB9IGZyb20gJy4vc2xlZXBGb3JSYXRlTGltaXRSZXRyeUFmdGVyVGltZSc7XG5pbXBvcnQgeyBnZXRIdHRwRXJyb3JDb2RlIH0gZnJvbSAnLi9nZXRIdHRwRXJyb3JDb2RlJztcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGhhbmRsZUNvbW1vbkpvYlJlcXVlc3RFcnJvcih7XG4gIGVycixcbiAgbG9nLFxuICB0aW1lUmVtYWluaW5nLFxufTogUmVhZG9ubHk8e1xuICBlcnI6IHVua25vd247XG4gIGxvZzogTG9nZ2VyVHlwZTtcbiAgdGltZVJlbWFpbmluZzogbnVtYmVyO1xufT4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgc3dpdGNoIChnZXRIdHRwRXJyb3JDb2RlKGVycikpIHtcbiAgICBjYXNlIDQxMzpcbiAgICBjYXNlIDQyOTpcbiAgICAgIGF3YWl0IHNsZWVwRm9yUmF0ZUxpbWl0UmV0cnlBZnRlclRpbWUoeyBlcnIsIGxvZywgdGltZVJlbWFpbmluZyB9KTtcbiAgICAgIHJldHVybjtcbiAgICBjYXNlIDUwODpcbiAgICAgIGxvZy5pbmZvKCdzZXJ2ZXIgcmVzcG9uZGVkIHdpdGggNTA4LiBHaXZpbmcgdXAgb24gdGhpcyBqb2InKTtcbiAgICAgIHJldHVybjtcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgZXJyO1xuICB9XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSUEsNkNBQWdEO0FBQ2hELDhCQUFpQztBQUVqQywyQ0FBa0Q7QUFBQSxFQUNoRDtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsR0FLaUI7QUFDakIsVUFBUSw4Q0FBaUIsR0FBRztBQUFBLFNBQ3JCO0FBQUEsU0FDQTtBQUNILFlBQU0sNEVBQWdDLEVBQUUsS0FBSyxLQUFLLGNBQWMsQ0FBQztBQUNqRTtBQUFBLFNBQ0c7QUFDSCxVQUFJLEtBQUssa0RBQWtEO0FBQzNEO0FBQUE7QUFFQSxZQUFNO0FBQUE7QUFFWjtBQXBCc0IiLAogICJuYW1lcyI6IFtdCn0K
