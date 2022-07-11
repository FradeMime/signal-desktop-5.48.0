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
var whitespaceStringUtil_exports = {};
__export(whitespaceStringUtil_exports, {
  isWhitespace: () => isWhitespace,
  trim: () => trim
});
module.exports = __toCommonJS(whitespaceStringUtil_exports);
const WHITESPACE = /* @__PURE__ */ new Set([
  " ",
  "\u200E",
  "\u200F",
  "\u2007",
  "\u200B",
  "\u2800"
]);
function trim(str) {
  let start = 0;
  let end = str.length - 1;
  for (start; start < str.length; start += 1) {
    const char = str[start];
    if (!WHITESPACE.has(char)) {
      break;
    }
  }
  for (end; end > 0; end -= 1) {
    const char = str[end];
    if (!WHITESPACE.has(char)) {
      break;
    }
  }
  if (start > 0 || end < str.length - 1) {
    return str.substring(start, end + 1);
  }
  return str;
}
function isWhitespace(str) {
  for (let i = 0; i < str.length; i += 1) {
    const char = str[i];
    if (!WHITESPACE.has(char)) {
      return false;
    }
  }
  return true;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  isWhitespace,
  trim
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsid2hpdGVzcGFjZVN0cmluZ1V0aWwudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuY29uc3QgV0hJVEVTUEFDRSA9IG5ldyBTZXQoW1xuICAnICcsXG4gICdcXHUyMDBFJywgLy8gbGVmdC10by1yaWdodCBtYXJrXG4gICdcXHUyMDBGJywgLy8gcmlnaHQtdG8tbGVmdCBtYXJrXG4gICdcXHUyMDA3JywgLy8gZmlndXJlIHNwYWNlXG4gICdcXHUyMDBCJywgLy8gemVyby13aWR0aCBzcGFjZVxuICAnXFx1MjgwMCcsIC8vIGJyYWlsbGUgYmxhbmtcbl0pO1xuXG5leHBvcnQgZnVuY3Rpb24gdHJpbShzdHI6IHN0cmluZyk6IHN0cmluZyB7XG4gIGxldCBzdGFydCA9IDA7XG4gIGxldCBlbmQgPSBzdHIubGVuZ3RoIC0gMTtcblxuICBmb3IgKHN0YXJ0OyBzdGFydCA8IHN0ci5sZW5ndGg7IHN0YXJ0ICs9IDEpIHtcbiAgICBjb25zdCBjaGFyID0gc3RyW3N0YXJ0XTtcbiAgICBpZiAoIVdISVRFU1BBQ0UuaGFzKGNoYXIpKSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBmb3IgKGVuZDsgZW5kID4gMDsgZW5kIC09IDEpIHtcbiAgICBjb25zdCBjaGFyID0gc3RyW2VuZF07XG4gICAgaWYgKCFXSElURVNQQUNFLmhhcyhjaGFyKSkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgaWYgKHN0YXJ0ID4gMCB8fCBlbmQgPCBzdHIubGVuZ3RoIC0gMSkge1xuICAgIHJldHVybiBzdHIuc3Vic3RyaW5nKHN0YXJ0LCBlbmQgKyAxKTtcbiAgfVxuXG4gIHJldHVybiBzdHI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1doaXRlc3BhY2Uoc3RyOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyBpICs9IDEpIHtcbiAgICBjb25zdCBjaGFyID0gc3RyW2ldO1xuICAgIGlmICghV0hJVEVTUEFDRS5oYXMoY2hhcikpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLE1BQU0sYUFBYSxvQkFBSSxJQUFJO0FBQUEsRUFDekI7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUNGLENBQUM7QUFFTSxjQUFjLEtBQXFCO0FBQ3hDLE1BQUksUUFBUTtBQUNaLE1BQUksTUFBTSxJQUFJLFNBQVM7QUFFdkIsT0FBSyxPQUFPLFFBQVEsSUFBSSxRQUFRLFNBQVMsR0FBRztBQUMxQyxVQUFNLE9BQU8sSUFBSTtBQUNqQixRQUFJLENBQUMsV0FBVyxJQUFJLElBQUksR0FBRztBQUN6QjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBRUEsT0FBSyxLQUFLLE1BQU0sR0FBRyxPQUFPLEdBQUc7QUFDM0IsVUFBTSxPQUFPLElBQUk7QUFDakIsUUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLEdBQUc7QUFDekI7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUVBLE1BQUksUUFBUSxLQUFLLE1BQU0sSUFBSSxTQUFTLEdBQUc7QUFDckMsV0FBTyxJQUFJLFVBQVUsT0FBTyxNQUFNLENBQUM7QUFBQSxFQUNyQztBQUVBLFNBQU87QUFDVDtBQXZCZ0IsQUF5QlQsc0JBQXNCLEtBQXNCO0FBQ2pELFdBQVMsSUFBSSxHQUFHLElBQUksSUFBSSxRQUFRLEtBQUssR0FBRztBQUN0QyxVQUFNLE9BQU8sSUFBSTtBQUNqQixRQUFJLENBQUMsV0FBVyxJQUFJLElBQUksR0FBRztBQUN6QixhQUFPO0FBQUEsSUFDVDtBQUFBLEVBQ0Y7QUFFQSxTQUFPO0FBQ1Q7QUFUZ0IiLAogICJuYW1lcyI6IFtdCn0K
