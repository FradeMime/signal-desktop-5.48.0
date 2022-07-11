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
var parseIntOrThrow_exports = {};
__export(parseIntOrThrow_exports, {
  parseIntOrThrow: () => parseIntOrThrow
});
module.exports = __toCommonJS(parseIntOrThrow_exports);
function parseIntOrThrow(value, message) {
  let result;
  switch (typeof value) {
    case "number":
      result = value;
      break;
    case "string":
      result = parseInt(value, 10);
      break;
    default:
      result = NaN;
      break;
  }
  if (!Number.isInteger(result)) {
    throw new Error(message);
  }
  return result;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  parseIntOrThrow
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsicGFyc2VJbnRPclRocm93LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZUludE9yVGhyb3codmFsdWU6IHVua25vd24sIG1lc3NhZ2U6IHN0cmluZyk6IG51bWJlciB7XG4gIGxldCByZXN1bHQ6IG51bWJlcjtcblxuICBzd2l0Y2ggKHR5cGVvZiB2YWx1ZSkge1xuICAgIGNhc2UgJ251bWJlcic6XG4gICAgICByZXN1bHQgPSB2YWx1ZTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICByZXN1bHQgPSBwYXJzZUludCh2YWx1ZSwgMTApO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJlc3VsdCA9IE5hTjtcbiAgICAgIGJyZWFrO1xuICB9XG5cbiAgaWYgKCFOdW1iZXIuaXNJbnRlZ2VyKHJlc3VsdCkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdPLHlCQUF5QixPQUFnQixTQUF5QjtBQUN2RSxNQUFJO0FBRUosVUFBUSxPQUFPO0FBQUEsU0FDUjtBQUNILGVBQVM7QUFDVDtBQUFBLFNBQ0c7QUFDSCxlQUFTLFNBQVMsT0FBTyxFQUFFO0FBQzNCO0FBQUE7QUFFQSxlQUFTO0FBQ1Q7QUFBQTtBQUdKLE1BQUksQ0FBQyxPQUFPLFVBQVUsTUFBTSxHQUFHO0FBQzdCLFVBQU0sSUFBSSxNQUFNLE9BQU87QUFBQSxFQUN6QjtBQUVBLFNBQU87QUFDVDtBQXBCZ0IiLAogICJuYW1lcyI6IFtdCn0K
