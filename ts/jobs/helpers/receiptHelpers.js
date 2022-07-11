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
var receiptHelpers_exports = {};
__export(receiptHelpers_exports, {
  MAX_RETRY_TIME: () => MAX_RETRY_TIME,
  runReceiptJob: () => runReceiptJob
});
module.exports = __toCommonJS(receiptHelpers_exports);
var durations = __toESM(require("../../util/durations"));
var import_sendReceipts = require("../../util/sendReceipts");
var import_commonShouldJobContinue = require("./commonShouldJobContinue");
var import_handleCommonJobRequestError = require("./handleCommonJobRequestError");
const MAX_RETRY_TIME = durations.DAY;
async function runReceiptJob({
  attempt,
  log,
  timestamp,
  receipts,
  type
}) {
  const timeRemaining = timestamp + MAX_RETRY_TIME - Date.now();
  const shouldContinue = await (0, import_commonShouldJobContinue.commonShouldJobContinue)({
    attempt,
    log,
    timeRemaining,
    skipWait: false
  });
  if (!shouldContinue) {
    return;
  }
  try {
    await (0, import_sendReceipts.sendReceipts)({ log, receipts, type });
  } catch (err) {
    await (0, import_handleCommonJobRequestError.handleCommonJobRequestError)({ err, log, timeRemaining });
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MAX_RETRY_TIME,
  runReceiptJob
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsicmVjZWlwdEhlbHBlcnMudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0ICogYXMgZHVyYXRpb25zIGZyb20gJy4uLy4uL3V0aWwvZHVyYXRpb25zJztcbmltcG9ydCB0eXBlIHsgTG9nZ2VyVHlwZSB9IGZyb20gJy4uLy4uL3R5cGVzL0xvZ2dpbmcnO1xuaW1wb3J0IHR5cGUgeyBSZWNlaXB0LCBSZWNlaXB0VHlwZSB9IGZyb20gJy4uLy4uL3R5cGVzL1JlY2VpcHQnO1xuaW1wb3J0IHsgc2VuZFJlY2VpcHRzIH0gZnJvbSAnLi4vLi4vdXRpbC9zZW5kUmVjZWlwdHMnO1xuaW1wb3J0IHsgY29tbW9uU2hvdWxkSm9iQ29udGludWUgfSBmcm9tICcuL2NvbW1vblNob3VsZEpvYkNvbnRpbnVlJztcbmltcG9ydCB7IGhhbmRsZUNvbW1vbkpvYlJlcXVlc3RFcnJvciB9IGZyb20gJy4vaGFuZGxlQ29tbW9uSm9iUmVxdWVzdEVycm9yJztcblxuZXhwb3J0IGNvbnN0IE1BWF9SRVRSWV9USU1FID0gZHVyYXRpb25zLkRBWTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJ1blJlY2VpcHRKb2Ioe1xuICBhdHRlbXB0LFxuICBsb2csXG4gIHRpbWVzdGFtcCxcbiAgcmVjZWlwdHMsXG4gIHR5cGUsXG59OiBSZWFkb25seTx7XG4gIGF0dGVtcHQ6IG51bWJlcjtcbiAgbG9nOiBMb2dnZXJUeXBlO1xuICByZWNlaXB0czogUmVhZG9ubHlBcnJheTxSZWNlaXB0PjtcbiAgdGltZXN0YW1wOiBudW1iZXI7XG4gIHR5cGU6IFJlY2VpcHRUeXBlO1xufT4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgY29uc3QgdGltZVJlbWFpbmluZyA9IHRpbWVzdGFtcCArIE1BWF9SRVRSWV9USU1FIC0gRGF0ZS5ub3coKTtcblxuICBjb25zdCBzaG91bGRDb250aW51ZSA9IGF3YWl0IGNvbW1vblNob3VsZEpvYkNvbnRpbnVlKHtcbiAgICBhdHRlbXB0LFxuICAgIGxvZyxcbiAgICB0aW1lUmVtYWluaW5nLFxuICAgIHNraXBXYWl0OiBmYWxzZSxcbiAgfSk7XG4gIGlmICghc2hvdWxkQ29udGludWUpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB0cnkge1xuICAgIGF3YWl0IHNlbmRSZWNlaXB0cyh7IGxvZywgcmVjZWlwdHMsIHR5cGUgfSk7XG4gIH0gY2F0Y2ggKGVycjogdW5rbm93bikge1xuICAgIGF3YWl0IGhhbmRsZUNvbW1vbkpvYlJlcXVlc3RFcnJvcih7IGVyciwgbG9nLCB0aW1lUmVtYWluaW5nIH0pO1xuICB9XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxnQkFBMkI7QUFHM0IsMEJBQTZCO0FBQzdCLHFDQUF3QztBQUN4Qyx5Q0FBNEM7QUFFckMsTUFBTSxpQkFBaUIsVUFBVTtBQUV4Qyw2QkFBb0M7QUFBQSxFQUNsQztBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxHQU9pQjtBQUNqQixRQUFNLGdCQUFnQixZQUFZLGlCQUFpQixLQUFLLElBQUk7QUFFNUQsUUFBTSxpQkFBaUIsTUFBTSw0REFBd0I7QUFBQSxJQUNuRDtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQSxVQUFVO0FBQUEsRUFDWixDQUFDO0FBQ0QsTUFBSSxDQUFDLGdCQUFnQjtBQUNuQjtBQUFBLEVBQ0Y7QUFFQSxNQUFJO0FBQ0YsVUFBTSxzQ0FBYSxFQUFFLEtBQUssVUFBVSxLQUFLLENBQUM7QUFBQSxFQUM1QyxTQUFTLEtBQVA7QUFDQSxVQUFNLG9FQUE0QixFQUFFLEtBQUssS0FBSyxjQUFjLENBQUM7QUFBQSxFQUMvRDtBQUNGO0FBOUJzQiIsCiAgIm5hbWVzIjogW10KfQo=
