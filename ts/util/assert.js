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
var assert_exports = {};
__export(assert_exports, {
  assert: () => assert,
  assertSync: () => assertSync,
  softAssert: () => softAssert,
  strictAssert: () => strictAssert
});
module.exports = __toCommonJS(assert_exports);
var import_environment = require("../environment");
var log = __toESM(require("../logging/log"));
function softAssert(condition, message) {
  if (!condition) {
    if ((0, import_environment.getEnvironment)() === import_environment.Environment.Development) {
      debugger;
    }
    const err = new Error(message);
    log.warn("softAssert failure:", err && err.stack ? err.stack : err);
  }
}
function assert(condition, message) {
  if (!condition) {
    const err = new Error(message);
    if ((0, import_environment.getEnvironment)() !== import_environment.Environment.Production) {
      if ((0, import_environment.getEnvironment)() === import_environment.Environment.Development) {
        debugger;
      }
      throw err;
    }
    log.error("assert failure:", err && err.stack ? err.stack : err);
  }
}
function strictAssert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}
function assertSync(value) {
  return value;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  assert,
  assertSync,
  softAssert,
  strictAssert
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiYXNzZXJ0LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IGdldEVudmlyb25tZW50LCBFbnZpcm9ubWVudCB9IGZyb20gJy4uL2Vudmlyb25tZW50JztcbmltcG9ydCAqIGFzIGxvZyBmcm9tICcuLi9sb2dnaW5nL2xvZyc7XG5cbi8qKlxuICogSW4gcHJvZHVjdGlvbiBhbmQgYmV0YSwgbG9ncyBhIHdhcm5pbmcgYW5kIGNvbnRpbnVlcy4gRm9yIGRldmVsb3BtZW50IGl0XG4gKiBzdGFydHMgdGhlIGRlYnVnZ2VyLlxuICovXG5leHBvcnQgZnVuY3Rpb24gc29mdEFzc2VydChjb25kaXRpb246IHVua25vd24sIG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQge1xuICBpZiAoIWNvbmRpdGlvbikge1xuICAgIGlmIChnZXRFbnZpcm9ubWVudCgpID09PSBFbnZpcm9ubWVudC5EZXZlbG9wbWVudCkge1xuICAgICAgZGVidWdnZXI7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tZGVidWdnZXJcbiAgICB9XG5cbiAgICBjb25zdCBlcnIgPSBuZXcgRXJyb3IobWVzc2FnZSk7XG4gICAgbG9nLndhcm4oJ3NvZnRBc3NlcnQgZmFpbHVyZTonLCBlcnIgJiYgZXJyLnN0YWNrID8gZXJyLnN0YWNrIDogZXJyKTtcbiAgfVxufVxuXG4vKipcbiAqIEluIHByb2R1Y3Rpb24sIGxvZ3MgYW4gZXJyb3IgYW5kIGNvbnRpbnVlcy4gSW4gYWxsIG90aGVyIGVudmlyb25tZW50cywgdGhyb3dzIGFuIGVycm9yLlxuICovXG5leHBvcnQgZnVuY3Rpb24gYXNzZXJ0KGNvbmRpdGlvbjogdW5rbm93biwgbWVzc2FnZTogc3RyaW5nKTogYXNzZXJ0cyBjb25kaXRpb24ge1xuICBpZiAoIWNvbmRpdGlvbikge1xuICAgIGNvbnN0IGVyciA9IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgICBpZiAoZ2V0RW52aXJvbm1lbnQoKSAhPT0gRW52aXJvbm1lbnQuUHJvZHVjdGlvbikge1xuICAgICAgaWYgKGdldEVudmlyb25tZW50KCkgPT09IEVudmlyb25tZW50LkRldmVsb3BtZW50KSB7XG4gICAgICAgIGRlYnVnZ2VyOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWRlYnVnZ2VyXG4gICAgICB9XG4gICAgICB0aHJvdyBlcnI7XG4gICAgfVxuICAgIGxvZy5lcnJvcignYXNzZXJ0IGZhaWx1cmU6JywgZXJyICYmIGVyci5zdGFjayA/IGVyci5zdGFjayA6IGVycik7XG4gIH1cbn1cblxuLyoqXG4gKiBUaHJvd3MgYW4gZXJyb3IgaWYgdGhlIGNvbmRpdGlvbiBpcyBmYWxzeSwgcmVnYXJkbGVzcyBvZiBlbnZpcm9ubWVudC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHN0cmljdEFzc2VydChcbiAgY29uZGl0aW9uOiB1bmtub3duLFxuICBtZXNzYWdlOiBzdHJpbmdcbik6IGFzc2VydHMgY29uZGl0aW9uIHtcbiAgaWYgKCFjb25kaXRpb24pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XG4gIH1cbn1cblxuLyoqXG4gKiBBc3NlcnRzIHRoYXQgdGhlIHR5cGUgb2YgdmFsdWUgaXMgbm90IGEgcHJvbWlzZS5cbiAqIChVc2VmdWwgZm9yIGRhdGFiYXNlIG1vZHVsZXMpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhc3NlcnRTeW5jPFQsIFg+KHZhbHVlOiBUIGV4dGVuZHMgUHJvbWlzZTxYPiA/IG5ldmVyIDogVCk6IFQge1xuICByZXR1cm4gdmFsdWU7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EseUJBQTRDO0FBQzVDLFVBQXFCO0FBTWQsb0JBQW9CLFdBQW9CLFNBQXVCO0FBQ3BFLE1BQUksQ0FBQyxXQUFXO0FBQ2QsUUFBSSx1Q0FBZSxNQUFNLCtCQUFZLGFBQWE7QUFDaEQ7QUFBQSxJQUNGO0FBRUEsVUFBTSxNQUFNLElBQUksTUFBTSxPQUFPO0FBQzdCLFFBQUksS0FBSyx1QkFBdUIsT0FBTyxJQUFJLFFBQVEsSUFBSSxRQUFRLEdBQUc7QUFBQSxFQUNwRTtBQUNGO0FBVGdCLEFBY1QsZ0JBQWdCLFdBQW9CLFNBQW9DO0FBQzdFLE1BQUksQ0FBQyxXQUFXO0FBQ2QsVUFBTSxNQUFNLElBQUksTUFBTSxPQUFPO0FBQzdCLFFBQUksdUNBQWUsTUFBTSwrQkFBWSxZQUFZO0FBQy9DLFVBQUksdUNBQWUsTUFBTSwrQkFBWSxhQUFhO0FBQ2hEO0FBQUEsTUFDRjtBQUNBLFlBQU07QUFBQSxJQUNSO0FBQ0EsUUFBSSxNQUFNLG1CQUFtQixPQUFPLElBQUksUUFBUSxJQUFJLFFBQVEsR0FBRztBQUFBLEVBQ2pFO0FBQ0Y7QUFYZ0IsQUFnQlQsc0JBQ0wsV0FDQSxTQUNtQjtBQUNuQixNQUFJLENBQUMsV0FBVztBQUNkLFVBQU0sSUFBSSxNQUFNLE9BQU87QUFBQSxFQUN6QjtBQUNGO0FBUGdCLEFBYVQsb0JBQTBCLE9BQTRDO0FBQzNFLFNBQU87QUFDVDtBQUZnQiIsCiAgIm5hbWVzIjogW10KfQo=
