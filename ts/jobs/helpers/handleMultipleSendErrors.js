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
var handleMultipleSendErrors_exports = {};
__export(handleMultipleSendErrors_exports, {
  handleMultipleSendErrors: () => handleMultipleSendErrors,
  maybeExpandErrors: () => maybeExpandErrors
});
module.exports = __toCommonJS(handleMultipleSendErrors_exports);
var Errors = __toESM(require("../../types/errors"));
var import_sleepForRateLimitRetryAfterTime = require("./sleepForRateLimitRetryAfterTime");
var import_getHttpErrorCode = require("./getHttpErrorCode");
var import_assert = require("../../util/assert");
var import_findRetryAfterTimeFromError = require("./findRetryAfterTimeFromError");
var import_Errors = require("../../textsecure/Errors");
function maybeExpandErrors(error) {
  if (error instanceof import_Errors.SendMessageProtoError) {
    return error.errors || [error];
  }
  return [error];
}
async function handleMultipleSendErrors({
  errors,
  isFinalAttempt,
  log,
  markFailed,
  timeRemaining,
  toThrow
}) {
  (0, import_assert.strictAssert)(errors.length, "Expected at least one error");
  const formattedErrors = [];
  let retryAfterError;
  let longestRetryAfterTime = -Infinity;
  let serverAskedUsToStop = false;
  errors.forEach((error) => {
    formattedErrors.push(Errors.toLogFormat(error));
    const errorCode = (0, import_getHttpErrorCode.getHttpErrorCode)(error);
    if (errorCode === 413 || errorCode === 429) {
      const retryAfterTime = (0, import_findRetryAfterTimeFromError.findRetryAfterTimeFromError)(error);
      if (retryAfterTime > longestRetryAfterTime) {
        retryAfterError = error;
        longestRetryAfterTime = retryAfterTime;
      }
    } else if (errorCode === 508 || errorCode === 400) {
      serverAskedUsToStop = true;
    }
  });
  log.info(`${formattedErrors.length} send error(s): ${formattedErrors.join(",")}`);
  if (isFinalAttempt || serverAskedUsToStop) {
    await markFailed?.();
  }
  if (serverAskedUsToStop) {
    log.info("server responded with 508 or 400. Giving up on this job");
    return;
  }
  if (retryAfterError && !isFinalAttempt) {
    await (0, import_sleepForRateLimitRetryAfterTime.sleepForRateLimitRetryAfterTime)({
      err: retryAfterError,
      log,
      timeRemaining
    });
  }
  throw toThrow;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handleMultipleSendErrors,
  maybeExpandErrors
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiaGFuZGxlTXVsdGlwbGVTZW5kRXJyb3JzLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB0eXBlIHsgTG9nZ2VyVHlwZSB9IGZyb20gJy4uLy4uL3R5cGVzL0xvZ2dpbmcnO1xuaW1wb3J0ICogYXMgRXJyb3JzIGZyb20gJy4uLy4uL3R5cGVzL2Vycm9ycyc7XG5pbXBvcnQgeyBzbGVlcEZvclJhdGVMaW1pdFJldHJ5QWZ0ZXJUaW1lIH0gZnJvbSAnLi9zbGVlcEZvclJhdGVMaW1pdFJldHJ5QWZ0ZXJUaW1lJztcbmltcG9ydCB7IGdldEh0dHBFcnJvckNvZGUgfSBmcm9tICcuL2dldEh0dHBFcnJvckNvZGUnO1xuaW1wb3J0IHsgc3RyaWN0QXNzZXJ0IH0gZnJvbSAnLi4vLi4vdXRpbC9hc3NlcnQnO1xuaW1wb3J0IHsgZmluZFJldHJ5QWZ0ZXJUaW1lRnJvbUVycm9yIH0gZnJvbSAnLi9maW5kUmV0cnlBZnRlclRpbWVGcm9tRXJyb3InO1xuaW1wb3J0IHsgU2VuZE1lc3NhZ2VQcm90b0Vycm9yIH0gZnJvbSAnLi4vLi4vdGV4dHNlY3VyZS9FcnJvcnMnO1xuXG5leHBvcnQgZnVuY3Rpb24gbWF5YmVFeHBhbmRFcnJvcnMoZXJyb3I6IHVua25vd24pOiBSZWFkb25seUFycmF5PHVua25vd24+IHtcbiAgaWYgKGVycm9yIGluc3RhbmNlb2YgU2VuZE1lc3NhZ2VQcm90b0Vycm9yKSB7XG4gICAgcmV0dXJuIGVycm9yLmVycm9ycyB8fCBbZXJyb3JdO1xuICB9XG5cbiAgcmV0dXJuIFtlcnJvcl07XG59XG5cbi8vIE5vdGU6IHRvVGhyb3cgaXMgdmVyeSBpbXBvcnRhbnQgdG8gcHJlc2VydmUgdGhlIGZ1bGwgZXJyb3IgZm9yIG91dGVyIGhhbmRsZXJzLiBGb3Jcbi8vICAgZXhhbXBsZSwgdGhlIGNhdGNoIGhhbmRsZXIgY2hlY2sgZm9yIFNhZmV0eSBOdW1iZXIgRXJyb3JzIGluIGNvbnZlcnNhdGlvbkpvYlF1ZXVlLlxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGhhbmRsZU11bHRpcGxlU2VuZEVycm9ycyh7XG4gIGVycm9ycyxcbiAgaXNGaW5hbEF0dGVtcHQsXG4gIGxvZyxcbiAgbWFya0ZhaWxlZCxcbiAgdGltZVJlbWFpbmluZyxcbiAgdG9UaHJvdyxcbn06IFJlYWRvbmx5PHtcbiAgZXJyb3JzOiBSZWFkb25seUFycmF5PHVua25vd24+O1xuICBpc0ZpbmFsQXR0ZW1wdDogYm9vbGVhbjtcbiAgbG9nOiBQaWNrPExvZ2dlclR5cGUsICdpbmZvJz47XG4gIG1hcmtGYWlsZWQ/OiAoKCkgPT4gdm9pZCkgfCAoKCkgPT4gUHJvbWlzZTx2b2lkPik7XG4gIHRpbWVSZW1haW5pbmc6IG51bWJlcjtcbiAgdG9UaHJvdzogdW5rbm93bjtcbn0+KTogUHJvbWlzZTx2b2lkPiB7XG4gIHN0cmljdEFzc2VydChlcnJvcnMubGVuZ3RoLCAnRXhwZWN0ZWQgYXQgbGVhc3Qgb25lIGVycm9yJyk7XG5cbiAgY29uc3QgZm9ybWF0dGVkRXJyb3JzOiBBcnJheTxzdHJpbmc+ID0gW107XG5cbiAgbGV0IHJldHJ5QWZ0ZXJFcnJvcjogdW5rbm93bjtcbiAgbGV0IGxvbmdlc3RSZXRyeUFmdGVyVGltZSA9IC1JbmZpbml0eTtcblxuICBsZXQgc2VydmVyQXNrZWRVc1RvU3RvcCA9IGZhbHNlO1xuXG4gIGVycm9ycy5mb3JFYWNoKGVycm9yID0+IHtcbiAgICBmb3JtYXR0ZWRFcnJvcnMucHVzaChFcnJvcnMudG9Mb2dGb3JtYXQoZXJyb3IpKTtcblxuICAgIGNvbnN0IGVycm9yQ29kZSA9IGdldEh0dHBFcnJvckNvZGUoZXJyb3IpO1xuICAgIGlmIChlcnJvckNvZGUgPT09IDQxMyB8fCBlcnJvckNvZGUgPT09IDQyOSkge1xuICAgICAgY29uc3QgcmV0cnlBZnRlclRpbWUgPSBmaW5kUmV0cnlBZnRlclRpbWVGcm9tRXJyb3IoZXJyb3IpO1xuICAgICAgaWYgKHJldHJ5QWZ0ZXJUaW1lID4gbG9uZ2VzdFJldHJ5QWZ0ZXJUaW1lKSB7XG4gICAgICAgIHJldHJ5QWZ0ZXJFcnJvciA9IGVycm9yO1xuICAgICAgICBsb25nZXN0UmV0cnlBZnRlclRpbWUgPSByZXRyeUFmdGVyVGltZTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGVycm9yQ29kZSA9PT0gNTA4IHx8IGVycm9yQ29kZSA9PT0gNDAwKSB7XG4gICAgICBzZXJ2ZXJBc2tlZFVzVG9TdG9wID0gdHJ1ZTtcbiAgICB9XG4gIH0pO1xuXG4gIGxvZy5pbmZvKFxuICAgIGAke2Zvcm1hdHRlZEVycm9ycy5sZW5ndGh9IHNlbmQgZXJyb3Iocyk6ICR7Zm9ybWF0dGVkRXJyb3JzLmpvaW4oJywnKX1gXG4gICk7XG5cbiAgaWYgKGlzRmluYWxBdHRlbXB0IHx8IHNlcnZlckFza2VkVXNUb1N0b3ApIHtcbiAgICBhd2FpdCBtYXJrRmFpbGVkPy4oKTtcbiAgfVxuXG4gIGlmIChzZXJ2ZXJBc2tlZFVzVG9TdG9wKSB7XG4gICAgbG9nLmluZm8oJ3NlcnZlciByZXNwb25kZWQgd2l0aCA1MDggb3IgNDAwLiBHaXZpbmcgdXAgb24gdGhpcyBqb2InKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAocmV0cnlBZnRlckVycm9yICYmICFpc0ZpbmFsQXR0ZW1wdCkge1xuICAgIGF3YWl0IHNsZWVwRm9yUmF0ZUxpbWl0UmV0cnlBZnRlclRpbWUoe1xuICAgICAgZXJyOiByZXRyeUFmdGVyRXJyb3IsXG4gICAgICBsb2csXG4gICAgICB0aW1lUmVtYWluaW5nLFxuICAgIH0pO1xuICB9XG5cbiAgdGhyb3cgdG9UaHJvdztcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUlBLGFBQXdCO0FBQ3hCLDZDQUFnRDtBQUNoRCw4QkFBaUM7QUFDakMsb0JBQTZCO0FBQzdCLHlDQUE0QztBQUM1QyxvQkFBc0M7QUFFL0IsMkJBQTJCLE9BQXdDO0FBQ3hFLE1BQUksaUJBQWlCLHFDQUF1QjtBQUMxQyxXQUFPLE1BQU0sVUFBVSxDQUFDLEtBQUs7QUFBQSxFQUMvQjtBQUVBLFNBQU8sQ0FBQyxLQUFLO0FBQ2Y7QUFOZ0IsQUFVaEIsd0NBQStDO0FBQUEsRUFDN0M7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEdBUWlCO0FBQ2pCLGtDQUFhLE9BQU8sUUFBUSw2QkFBNkI7QUFFekQsUUFBTSxrQkFBaUMsQ0FBQztBQUV4QyxNQUFJO0FBQ0osTUFBSSx3QkFBd0I7QUFFNUIsTUFBSSxzQkFBc0I7QUFFMUIsU0FBTyxRQUFRLFdBQVM7QUFDdEIsb0JBQWdCLEtBQUssT0FBTyxZQUFZLEtBQUssQ0FBQztBQUU5QyxVQUFNLFlBQVksOENBQWlCLEtBQUs7QUFDeEMsUUFBSSxjQUFjLE9BQU8sY0FBYyxLQUFLO0FBQzFDLFlBQU0saUJBQWlCLG9FQUE0QixLQUFLO0FBQ3hELFVBQUksaUJBQWlCLHVCQUF1QjtBQUMxQywwQkFBa0I7QUFDbEIsZ0NBQXdCO0FBQUEsTUFDMUI7QUFBQSxJQUNGLFdBQVcsY0FBYyxPQUFPLGNBQWMsS0FBSztBQUNqRCw0QkFBc0I7QUFBQSxJQUN4QjtBQUFBLEVBQ0YsQ0FBQztBQUVELE1BQUksS0FDRixHQUFHLGdCQUFnQix5QkFBeUIsZ0JBQWdCLEtBQUssR0FBRyxHQUN0RTtBQUVBLE1BQUksa0JBQWtCLHFCQUFxQjtBQUN6QyxVQUFNLGFBQWE7QUFBQSxFQUNyQjtBQUVBLE1BQUkscUJBQXFCO0FBQ3ZCLFFBQUksS0FBSyx5REFBeUQ7QUFDbEU7QUFBQSxFQUNGO0FBRUEsTUFBSSxtQkFBbUIsQ0FBQyxnQkFBZ0I7QUFDdEMsVUFBTSw0RUFBZ0M7QUFBQSxNQUNwQyxLQUFLO0FBQUEsTUFDTDtBQUFBLE1BQ0E7QUFBQSxJQUNGLENBQUM7QUFBQSxFQUNIO0FBRUEsUUFBTTtBQUNSO0FBN0RzQiIsCiAgIm5hbWVzIjogW10KfQo=
