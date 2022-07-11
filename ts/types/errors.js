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
var errors_exports = {};
__export(errors_exports, {
  ProfileDecryptError: () => ProfileDecryptError,
  toLogFormat: () => toLogFormat
});
module.exports = __toCommonJS(errors_exports);
var import_lodash = require("lodash");
function toLogFormat(error) {
  if (error instanceof Error && error.stack) {
    return error.stack;
  }
  if ((0, import_lodash.has)(error, "message")) {
    return (0, import_lodash.get)(error, "message");
  }
  return String(error);
}
class ProfileDecryptError extends Error {
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ProfileDecryptError,
  toLogFormat
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZXJyb3JzLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAxOC0yMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgZ2V0LCBoYXMgfSBmcm9tICdsb2Rhc2gnO1xuXG5leHBvcnQgZnVuY3Rpb24gdG9Mb2dGb3JtYXQoZXJyb3I6IHVua25vd24pOiBzdHJpbmcge1xuICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvciAmJiBlcnJvci5zdGFjaykge1xuICAgIHJldHVybiBlcnJvci5zdGFjaztcbiAgfVxuXG4gIGlmIChoYXMoZXJyb3IsICdtZXNzYWdlJykpIHtcbiAgICByZXR1cm4gZ2V0KGVycm9yLCAnbWVzc2FnZScpO1xuICB9XG5cbiAgcmV0dXJuIFN0cmluZyhlcnJvcik7XG59XG5cbmV4cG9ydCBjbGFzcyBQcm9maWxlRGVjcnlwdEVycm9yIGV4dGVuZHMgRXJyb3Ige31cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLG9CQUF5QjtBQUVsQixxQkFBcUIsT0FBd0I7QUFDbEQsTUFBSSxpQkFBaUIsU0FBUyxNQUFNLE9BQU87QUFDekMsV0FBTyxNQUFNO0FBQUEsRUFDZjtBQUVBLE1BQUksdUJBQUksT0FBTyxTQUFTLEdBQUc7QUFDekIsV0FBTyx1QkFBSSxPQUFPLFNBQVM7QUFBQSxFQUM3QjtBQUVBLFNBQU8sT0FBTyxLQUFLO0FBQ3JCO0FBVmdCLEFBWVQsTUFBTSw0QkFBNEIsTUFBTTtBQUFDO0FBQXpDIiwKICAibmFtZXMiOiBbXQp9Cg==
