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
var util_exports = {};
__export(util_exports, {
  isAccessControlEnabled: () => isAccessControlEnabled
});
module.exports = __toCommonJS(util_exports);
var import_protobuf = require("../protobuf");
const ACCESS_ENUM = import_protobuf.SignalService.AccessControl.AccessRequired;
function isAccessControlEnabled(accessControl) {
  return accessControl === ACCESS_ENUM.ANY || accessControl === ACCESS_ENUM.ADMINISTRATOR;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  isAccessControlEnabled
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidXRpbC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyBTaWduYWxTZXJ2aWNlIGFzIFByb3RvIH0gZnJvbSAnLi4vcHJvdG9idWYnO1xuXG5jb25zdCBBQ0NFU1NfRU5VTSA9IFByb3RvLkFjY2Vzc0NvbnRyb2wuQWNjZXNzUmVxdWlyZWQ7XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0FjY2Vzc0NvbnRyb2xFbmFibGVkKFxuICBhY2Nlc3NDb250cm9sOiBudW1iZXIgfCB1bmRlZmluZWRcbik6IGJvb2xlYW4ge1xuICByZXR1cm4gKFxuICAgIGFjY2Vzc0NvbnRyb2wgPT09IEFDQ0VTU19FTlVNLkFOWSB8fFxuICAgIGFjY2Vzc0NvbnRyb2wgPT09IEFDQ0VTU19FTlVNLkFETUlOSVNUUkFUT1JcbiAgKTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxzQkFBdUM7QUFFdkMsTUFBTSxjQUFjLDhCQUFNLGNBQWM7QUFFakMsZ0NBQ0wsZUFDUztBQUNULFNBQ0Usa0JBQWtCLFlBQVksT0FDOUIsa0JBQWtCLFlBQVk7QUFFbEM7QUFQZ0IiLAogICJuYW1lcyI6IFtdCn0K
