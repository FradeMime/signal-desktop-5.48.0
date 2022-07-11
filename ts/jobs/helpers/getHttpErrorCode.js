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
var getHttpErrorCode_exports = {};
__export(getHttpErrorCode_exports, {
  getHttpErrorCode: () => getHttpErrorCode
});
module.exports = __toCommonJS(getHttpErrorCode_exports);
var import_isRecord = require("../../util/isRecord");
var import_parseIntWithFallback = require("../../util/parseIntWithFallback");
function getHttpErrorCode(maybeError) {
  if (!(0, import_isRecord.isRecord)(maybeError)) {
    return -1;
  }
  const maybeTopLevelCode = (0, import_parseIntWithFallback.parseIntWithFallback)(maybeError.code, -1);
  if (maybeTopLevelCode !== -1) {
    return maybeTopLevelCode;
  }
  const { httpError } = maybeError;
  if (!(0, import_isRecord.isRecord)(httpError)) {
    return -1;
  }
  return (0, import_parseIntWithFallback.parseIntWithFallback)(httpError.code, -1);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getHttpErrorCode
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZ2V0SHR0cEVycm9yQ29kZS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEtMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IGlzUmVjb3JkIH0gZnJvbSAnLi4vLi4vdXRpbC9pc1JlY29yZCc7XG5pbXBvcnQgeyBwYXJzZUludFdpdGhGYWxsYmFjayB9IGZyb20gJy4uLy4uL3V0aWwvcGFyc2VJbnRXaXRoRmFsbGJhY2snO1xuXG4vKipcbiAqIExvb2tzIGZvciBhbiBIVFRQIGNvZGUuIEZpcnN0IHRyaWVzIHRoZSB0b3AgbGV2ZWwgZXJyb3IsIHRoZW4gbG9va3MgYXQgaXRzIGBodHRwRXJyb3JgXG4gKiBwcm9wZXJ0eS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEh0dHBFcnJvckNvZGUobWF5YmVFcnJvcjogdW5rbm93bik6IG51bWJlciB7XG4gIGlmICghaXNSZWNvcmQobWF5YmVFcnJvcikpIHtcbiAgICByZXR1cm4gLTE7XG4gIH1cblxuICAvLyBUaGlzIG1pZ2h0IGJlIGEgdGV4dHNlY3VyZS9FcnJvcnMvSFRUUEVycm9yXG4gIGNvbnN0IG1heWJlVG9wTGV2ZWxDb2RlID0gcGFyc2VJbnRXaXRoRmFsbGJhY2sobWF5YmVFcnJvci5jb2RlLCAtMSk7XG4gIGlmIChtYXliZVRvcExldmVsQ29kZSAhPT0gLTEpIHtcbiAgICByZXR1cm4gbWF5YmVUb3BMZXZlbENvZGU7XG4gIH1cblxuICAvLyBWYXJpb3VzIGVycm9ycyBpbiB0ZXh0c2VjdXJlL0Vycm9ycyBoYXZlIGEgbmVzdGVkIGh0dHBFcnJvciBwcm9wZXJ0eVxuICBjb25zdCB7IGh0dHBFcnJvciB9ID0gbWF5YmVFcnJvcjtcbiAgaWYgKCFpc1JlY29yZChodHRwRXJyb3IpKSB7XG4gICAgcmV0dXJuIC0xO1xuICB9XG5cbiAgcmV0dXJuIHBhcnNlSW50V2l0aEZhbGxiYWNrKGh0dHBFcnJvci5jb2RlLCAtMSk7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0Esc0JBQXlCO0FBQ3pCLGtDQUFxQztBQU05QiwwQkFBMEIsWUFBNkI7QUFDNUQsTUFBSSxDQUFDLDhCQUFTLFVBQVUsR0FBRztBQUN6QixXQUFPO0FBQUEsRUFDVDtBQUdBLFFBQU0sb0JBQW9CLHNEQUFxQixXQUFXLE1BQU0sRUFBRTtBQUNsRSxNQUFJLHNCQUFzQixJQUFJO0FBQzVCLFdBQU87QUFBQSxFQUNUO0FBR0EsUUFBTSxFQUFFLGNBQWM7QUFDdEIsTUFBSSxDQUFDLDhCQUFTLFNBQVMsR0FBRztBQUN4QixXQUFPO0FBQUEsRUFDVDtBQUVBLFNBQU8sc0RBQXFCLFVBQVUsTUFBTSxFQUFFO0FBQ2hEO0FBbEJnQiIsCiAgIm5hbWVzIjogW10KfQo=
