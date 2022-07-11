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
var environment_exports = {};
__export(environment_exports, {
  Environment: () => Environment,
  environmentSchema: () => environmentSchema,
  getEnvironment: () => getEnvironment,
  isTestEnvironment: () => isTestEnvironment,
  parseEnvironment: () => parseEnvironment,
  setEnvironment: () => setEnvironment
});
module.exports = __toCommonJS(environment_exports);
var import_zod = require("zod");
var import_enum = require("./util/enum");
var Environment = /* @__PURE__ */ ((Environment2) => {
  Environment2["Development"] = "development";
  Environment2["Production"] = "production";
  Environment2["Staging"] = "staging";
  Environment2["Test"] = "test";
  return Environment2;
})(Environment || {});
const environmentSchema = import_zod.z.nativeEnum(Environment);
let environment;
function getEnvironment() {
  if (environment === void 0) {
    return "production" /* Production */;
  }
  return environment;
}
function setEnvironment(env) {
  if (environment !== void 0) {
    throw new Error("Environment has already been set");
  }
  environment = env;
}
const parseEnvironment = (0, import_enum.makeEnumParser)(Environment, "production" /* Production */);
const isTestEnvironment = /* @__PURE__ */ __name((env) => env === "test" /* Test */, "isTestEnvironment");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Environment,
  environmentSchema,
  getEnvironment,
  isTestEnvironment,
  parseEnvironment,
  setEnvironment
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZW52aXJvbm1lbnQudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgeiB9IGZyb20gJ3pvZCc7XG5cbmltcG9ydCB7IG1ha2VFbnVtUGFyc2VyIH0gZnJvbSAnLi91dGlsL2VudW0nO1xuXG4vLyBNYW55IHBsYWNlcyByZWx5IG9uIHRoaXMgZW51bSBiZWluZyBhIHN0cmluZy5cbmV4cG9ydCBlbnVtIEVudmlyb25tZW50IHtcbiAgRGV2ZWxvcG1lbnQgPSAnZGV2ZWxvcG1lbnQnLFxuICBQcm9kdWN0aW9uID0gJ3Byb2R1Y3Rpb24nLFxuICBTdGFnaW5nID0gJ3N0YWdpbmcnLFxuICBUZXN0ID0gJ3Rlc3QnLFxufVxuXG5leHBvcnQgY29uc3QgZW52aXJvbm1lbnRTY2hlbWEgPSB6Lm5hdGl2ZUVudW0oRW52aXJvbm1lbnQpO1xuXG5sZXQgZW52aXJvbm1lbnQ6IHVuZGVmaW5lZCB8IEVudmlyb25tZW50O1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RW52aXJvbm1lbnQoKTogRW52aXJvbm1lbnQge1xuICBpZiAoZW52aXJvbm1lbnQgPT09IHVuZGVmaW5lZCkge1xuICAgIC8vIFRoaXMgc2hvdWxkIG5ldmVyIGhhcHBlblx1MjAxNHdlIHNob3VsZCBhbHdheXMgaGF2ZSBpbml0aWFsaXplZCB0aGUgZW52aXJvbm1lbnQgYnkgdGhpc1xuICAgIC8vICAgcG9pbnQuIEl0J2QgYmUgbmljZSB0byBsb2cgaGVyZSBidXQgdGhlIGxvZ2dlciBkZXBlbmRzIG9uIHRoZSBlbnZpcm9ubWVudCBhbmQgd2VcbiAgICAvLyAgIGNhbid0IGhhdmUgY2lyY3VsYXIgZGVwZW5kZW5jaWVzLlxuICAgIHJldHVybiBFbnZpcm9ubWVudC5Qcm9kdWN0aW9uO1xuICB9XG4gIHJldHVybiBlbnZpcm9ubWVudDtcbn1cblxuLyoqXG4gKiBTZXRzIHRoZSBjdXJyZW50IGVudmlyb25tZW50LiBTaG91bGQgYmUgY2FsbGVkIGVhcmx5IGluIGEgcHJvY2VzcydzIGxpZmUsIGFuZCBjYW4gb25seVxuICogYmUgY2FsbGVkIG9uY2UuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXRFbnZpcm9ubWVudChlbnY6IEVudmlyb25tZW50KTogdm9pZCB7XG4gIGlmIChlbnZpcm9ubWVudCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdFbnZpcm9ubWVudCBoYXMgYWxyZWFkeSBiZWVuIHNldCcpO1xuICB9XG4gIGVudmlyb25tZW50ID0gZW52O1xufVxuXG5leHBvcnQgY29uc3QgcGFyc2VFbnZpcm9ubWVudCA9IG1ha2VFbnVtUGFyc2VyKFxuICBFbnZpcm9ubWVudCxcbiAgRW52aXJvbm1lbnQuUHJvZHVjdGlvblxuKTtcblxuZXhwb3J0IGNvbnN0IGlzVGVzdEVudmlyb25tZW50ID0gKGVudjogRW52aXJvbm1lbnQpOiBib29sZWFuID0+XG4gIGVudiA9PT0gRW52aXJvbm1lbnQuVGVzdDtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsaUJBQWtCO0FBRWxCLGtCQUErQjtBQUd4QixJQUFLLGNBQUwsa0JBQUssaUJBQUw7QUFDTCxnQ0FBYztBQUNkLCtCQUFhO0FBQ2IsNEJBQVU7QUFDVix5QkFBTztBQUpHO0FBQUE7QUFPTCxNQUFNLG9CQUFvQixhQUFFLFdBQVcsV0FBVztBQUV6RCxJQUFJO0FBRUcsMEJBQXVDO0FBQzVDLE1BQUksZ0JBQWdCLFFBQVc7QUFJN0IsV0FBTztBQUFBLEVBQ1Q7QUFDQSxTQUFPO0FBQ1Q7QUFSZ0IsQUFjVCx3QkFBd0IsS0FBd0I7QUFDckQsTUFBSSxnQkFBZ0IsUUFBVztBQUM3QixVQUFNLElBQUksTUFBTSxrQ0FBa0M7QUFBQSxFQUNwRDtBQUNBLGdCQUFjO0FBQ2hCO0FBTGdCLEFBT1QsTUFBTSxtQkFBbUIsZ0NBQzlCLGFBQ0EsNkJBQ0Y7QUFFTyxNQUFNLG9CQUFvQix3QkFBQyxRQUNoQyxRQUFRLG1CQUR1QjsiLAogICJuYW1lcyI6IFtdCn0K
