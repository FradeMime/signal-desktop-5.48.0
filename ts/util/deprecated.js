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
var deprecated_exports = {};
__export(deprecated_exports, {
  deprecated: () => deprecated
});
module.exports = __toCommonJS(deprecated_exports);
var import_environment = require("../environment");
var log = __toESM(require("../logging/log"));
function deprecated(message) {
  if ((0, import_environment.getEnvironment)() === import_environment.Environment.Development) {
    log.error(`This method is deprecated: ${message}`);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  deprecated
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZGVwcmVjYXRlZC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyBnZXRFbnZpcm9ubWVudCwgRW52aXJvbm1lbnQgfSBmcm9tICcuLi9lbnZpcm9ubWVudCc7XG5pbXBvcnQgKiBhcyBsb2cgZnJvbSAnLi4vbG9nZ2luZy9sb2cnO1xuXG5leHBvcnQgZnVuY3Rpb24gZGVwcmVjYXRlZChtZXNzYWdlPzogc3RyaW5nKTogdm9pZCB7XG4gIGlmIChnZXRFbnZpcm9ubWVudCgpID09PSBFbnZpcm9ubWVudC5EZXZlbG9wbWVudCkge1xuICAgIGxvZy5lcnJvcihgVGhpcyBtZXRob2QgaXMgZGVwcmVjYXRlZDogJHttZXNzYWdlfWApO1xuICB9XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EseUJBQTRDO0FBQzVDLFVBQXFCO0FBRWQsb0JBQW9CLFNBQXdCO0FBQ2pELE1BQUksdUNBQWUsTUFBTSwrQkFBWSxhQUFhO0FBQ2hELFFBQUksTUFBTSw4QkFBOEIsU0FBUztBQUFBLEVBQ25EO0FBQ0Y7QUFKZ0IiLAogICJuYW1lcyI6IFtdCn0K
