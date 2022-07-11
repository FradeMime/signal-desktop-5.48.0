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
var Bytes_exports = {};
__export(Bytes_exports, {
  areEqual: () => areEqual,
  byteLength: () => byteLength,
  concatenate: () => concatenate,
  fromBase64: () => fromBase64,
  fromBinary: () => fromBinary,
  fromHex: () => fromHex,
  fromString: () => fromString,
  isEmpty: () => isEmpty,
  isNotEmpty: () => isNotEmpty,
  toBase64: () => toBase64,
  toBinary: () => toBinary,
  toHex: () => toHex,
  toString: () => toString
});
module.exports = __toCommonJS(Bytes_exports);
var import_Bytes = require("./context/Bytes");
const bytes = window.SignalContext?.bytes || new import_Bytes.Bytes();
function fromBase64(value) {
  return bytes.fromBase64(value);
}
function fromHex(value) {
  return bytes.fromHex(value);
}
function fromBinary(value) {
  return bytes.fromBinary(value);
}
function fromString(value) {
  return bytes.fromString(value);
}
function toBase64(data) {
  return bytes.toBase64(data);
}
function toHex(data) {
  return bytes.toHex(data);
}
function toBinary(data) {
  return bytes.toBinary(data);
}
function toString(data) {
  return bytes.toString(data);
}
function byteLength(value) {
  return bytes.byteLength(value);
}
function concatenate(list) {
  return bytes.concatenate(list);
}
function isEmpty(data) {
  return bytes.isEmpty(data);
}
function isNotEmpty(data) {
  return !bytes.isEmpty(data);
}
function areEqual(a, b) {
  return bytes.areEqual(a, b);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  areEqual,
  byteLength,
  concatenate,
  fromBase64,
  fromBinary,
  fromHex,
  fromString,
  isEmpty,
  isNotEmpty,
  toBase64,
  toBinary,
  toHex,
  toString
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQnl0ZXMudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgQnl0ZXMgfSBmcm9tICcuL2NvbnRleHQvQnl0ZXMnO1xuXG5jb25zdCBieXRlcyA9IHdpbmRvdy5TaWduYWxDb250ZXh0Py5ieXRlcyB8fCBuZXcgQnl0ZXMoKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGZyb21CYXNlNjQodmFsdWU6IHN0cmluZyk6IFVpbnQ4QXJyYXkge1xuICByZXR1cm4gYnl0ZXMuZnJvbUJhc2U2NCh2YWx1ZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmcm9tSGV4KHZhbHVlOiBzdHJpbmcpOiBVaW50OEFycmF5IHtcbiAgcmV0dXJuIGJ5dGVzLmZyb21IZXgodmFsdWUpO1xufVxuXG4vLyBUT0RPKGluZHV0bnkpOiBkZXByZWNhdGUgaXRcbmV4cG9ydCBmdW5jdGlvbiBmcm9tQmluYXJ5KHZhbHVlOiBzdHJpbmcpOiBVaW50OEFycmF5IHtcbiAgcmV0dXJuIGJ5dGVzLmZyb21CaW5hcnkodmFsdWUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZnJvbVN0cmluZyh2YWx1ZTogc3RyaW5nKTogVWludDhBcnJheSB7XG4gIHJldHVybiBieXRlcy5mcm9tU3RyaW5nKHZhbHVlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvQmFzZTY0KGRhdGE6IFVpbnQ4QXJyYXkpOiBzdHJpbmcge1xuICByZXR1cm4gYnl0ZXMudG9CYXNlNjQoZGF0YSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0b0hleChkYXRhOiBVaW50OEFycmF5KTogc3RyaW5nIHtcbiAgcmV0dXJuIGJ5dGVzLnRvSGV4KGRhdGEpO1xufVxuXG4vLyBUT0RPKGluZHV0bnkpOiBkZXByZWNhdGUgaXRcbmV4cG9ydCBmdW5jdGlvbiB0b0JpbmFyeShkYXRhOiBVaW50OEFycmF5KTogc3RyaW5nIHtcbiAgcmV0dXJuIGJ5dGVzLnRvQmluYXJ5KGRhdGEpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdG9TdHJpbmcoZGF0YTogVWludDhBcnJheSk6IHN0cmluZyB7XG4gIHJldHVybiBieXRlcy50b1N0cmluZyhkYXRhKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJ5dGVMZW5ndGgodmFsdWU6IHN0cmluZyk6IG51bWJlciB7XG4gIHJldHVybiBieXRlcy5ieXRlTGVuZ3RoKHZhbHVlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbmNhdGVuYXRlKGxpc3Q6IFJlYWRvbmx5QXJyYXk8VWludDhBcnJheT4pOiBVaW50OEFycmF5IHtcbiAgcmV0dXJuIGJ5dGVzLmNvbmNhdGVuYXRlKGxpc3QpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNFbXB0eShkYXRhOiBVaW50OEFycmF5IHwgbnVsbCB8IHVuZGVmaW5lZCk6IGJvb2xlYW4ge1xuICByZXR1cm4gYnl0ZXMuaXNFbXB0eShkYXRhKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzTm90RW1wdHkoXG4gIGRhdGE6IFVpbnQ4QXJyYXkgfCBudWxsIHwgdW5kZWZpbmVkXG4pOiBkYXRhIGlzIFVpbnQ4QXJyYXkge1xuICByZXR1cm4gIWJ5dGVzLmlzRW1wdHkoZGF0YSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhcmVFcXVhbChcbiAgYTogVWludDhBcnJheSB8IG51bGwgfCB1bmRlZmluZWQsXG4gIGI6IFVpbnQ4QXJyYXkgfCBudWxsIHwgdW5kZWZpbmVkXG4pOiBib29sZWFuIHtcbiAgcmV0dXJuIGJ5dGVzLmFyZUVxdWFsKGEsIGIpO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLG1CQUFzQjtBQUV0QixNQUFNLFFBQVEsT0FBTyxlQUFlLFNBQVMsSUFBSSxtQkFBTTtBQUVoRCxvQkFBb0IsT0FBMkI7QUFDcEQsU0FBTyxNQUFNLFdBQVcsS0FBSztBQUMvQjtBQUZnQixBQUlULGlCQUFpQixPQUEyQjtBQUNqRCxTQUFPLE1BQU0sUUFBUSxLQUFLO0FBQzVCO0FBRmdCLEFBS1Qsb0JBQW9CLE9BQTJCO0FBQ3BELFNBQU8sTUFBTSxXQUFXLEtBQUs7QUFDL0I7QUFGZ0IsQUFJVCxvQkFBb0IsT0FBMkI7QUFDcEQsU0FBTyxNQUFNLFdBQVcsS0FBSztBQUMvQjtBQUZnQixBQUlULGtCQUFrQixNQUEwQjtBQUNqRCxTQUFPLE1BQU0sU0FBUyxJQUFJO0FBQzVCO0FBRmdCLEFBSVQsZUFBZSxNQUEwQjtBQUM5QyxTQUFPLE1BQU0sTUFBTSxJQUFJO0FBQ3pCO0FBRmdCLEFBS1Qsa0JBQWtCLE1BQTBCO0FBQ2pELFNBQU8sTUFBTSxTQUFTLElBQUk7QUFDNUI7QUFGZ0IsQUFJVCxrQkFBa0IsTUFBMEI7QUFDakQsU0FBTyxNQUFNLFNBQVMsSUFBSTtBQUM1QjtBQUZnQixBQUlULG9CQUFvQixPQUF1QjtBQUNoRCxTQUFPLE1BQU0sV0FBVyxLQUFLO0FBQy9CO0FBRmdCLEFBSVQscUJBQXFCLE1BQTZDO0FBQ3ZFLFNBQU8sTUFBTSxZQUFZLElBQUk7QUFDL0I7QUFGZ0IsQUFJVCxpQkFBaUIsTUFBOEM7QUFDcEUsU0FBTyxNQUFNLFFBQVEsSUFBSTtBQUMzQjtBQUZnQixBQUlULG9CQUNMLE1BQ29CO0FBQ3BCLFNBQU8sQ0FBQyxNQUFNLFFBQVEsSUFBSTtBQUM1QjtBQUpnQixBQU1ULGtCQUNMLEdBQ0EsR0FDUztBQUNULFNBQU8sTUFBTSxTQUFTLEdBQUcsQ0FBQztBQUM1QjtBQUxnQiIsCiAgIm5hbWVzIjogW10KfQo=
