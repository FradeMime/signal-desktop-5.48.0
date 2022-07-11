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
var JobError_exports = {};
__export(JobError_exports, {
  JobError: () => JobError
});
module.exports = __toCommonJS(JobError_exports);
var import_reallyJsonStringify = require("../util/reallyJsonStringify");
class JobError extends Error {
  constructor(lastErrorThrownByJob) {
    super(`Job failed. Last error: ${formatError(lastErrorThrownByJob)}`);
    this.lastErrorThrownByJob = lastErrorThrownByJob;
  }
}
function formatError(err) {
  if (err instanceof Error) {
    return err.message;
  }
  return (0, import_reallyJsonStringify.reallyJsonStringify)(err);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  JobError
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiSm9iRXJyb3IudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgcmVhbGx5SnNvblN0cmluZ2lmeSB9IGZyb20gJy4uL3V0aWwvcmVhbGx5SnNvblN0cmluZ2lmeSc7XG5cbi8qKlxuICogQW4gZXJyb3IgdGhhdCB3cmFwcyBqb2IgZXJyb3JzLlxuICpcbiAqIFNob3VsZCBub3QgYmUgaW5zdGFudGlhdGVkIGRpcmVjdGx5LCBleGNlcHQgYnkgYEpvYlF1ZXVlYC5cbiAqL1xuZXhwb3J0IGNsYXNzIEpvYkVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgbGFzdEVycm9yVGhyb3duQnlKb2I6IHVua25vd24pIHtcbiAgICBzdXBlcihgSm9iIGZhaWxlZC4gTGFzdCBlcnJvcjogJHtmb3JtYXRFcnJvcihsYXN0RXJyb3JUaHJvd25CeUpvYil9YCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZm9ybWF0RXJyb3IoZXJyOiB1bmtub3duKTogc3RyaW5nIHtcbiAgaWYgKGVyciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgcmV0dXJuIGVyci5tZXNzYWdlO1xuICB9XG4gIHJldHVybiByZWFsbHlKc29uU3RyaW5naWZ5KGVycik7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsaUNBQW9DO0FBTzdCLE1BQU0saUJBQWlCLE1BQU07QUFBQSxFQUNsQyxZQUE0QixzQkFBK0I7QUFDekQsVUFBTSwyQkFBMkIsWUFBWSxvQkFBb0IsR0FBRztBQUQxQztBQUFBLEVBRTVCO0FBQ0Y7QUFKTyxBQU1QLHFCQUFxQixLQUFzQjtBQUN6QyxNQUFJLGVBQWUsT0FBTztBQUN4QixXQUFPLElBQUk7QUFBQSxFQUNiO0FBQ0EsU0FBTyxvREFBb0IsR0FBRztBQUNoQztBQUxTIiwKICAibmFtZXMiOiBbXQp9Cg==
