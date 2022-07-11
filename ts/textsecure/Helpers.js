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
var Helpers_exports = {};
__export(Helpers_exports, {
  default: () => Helpers_default
});
module.exports = __toCommonJS(Helpers_exports);
const arrayBuffer = new ArrayBuffer(0);
const uint8Array = new Uint8Array();
const StaticArrayBufferProto = arrayBuffer.__proto__;
const StaticUint8ArrayProto = uint8Array.__proto__;
function getString(thing) {
  if (thing === Object(thing)) {
    if (thing.__proto__ === StaticUint8ArrayProto) {
      return String.fromCharCode.apply(null, thing);
    }
    if (thing.__proto__ === StaticArrayBufferProto) {
      return getString(new Uint8Array(thing));
    }
  }
  return thing;
}
function getStringable(thing) {
  return typeof thing === "string" || typeof thing === "number" || typeof thing === "boolean" || thing === Object(thing) && (thing.__proto__ === StaticArrayBufferProto || thing.__proto__ === StaticUint8ArrayProto);
}
function ensureStringed(thing) {
  if (getStringable(thing)) {
    return getString(thing);
  }
  if (thing instanceof Array) {
    const res = [];
    for (let i = 0; i < thing.length; i += 1) {
      res[i] = ensureStringed(thing[i]);
    }
    return res;
  }
  if (thing === Object(thing)) {
    const res = {};
    for (const key in thing) {
      res[key] = ensureStringed(thing[key]);
    }
    return res;
  }
  if (thing === null) {
    return null;
  }
  throw new Error(`unsure of how to jsonify object of type ${typeof thing}`);
}
const utils = {
  getString,
  isNumberSane: (number) => number[0] === "+" && /^[0-9]+$/.test(number.substring(1)),
  jsonThing: (thing) => JSON.stringify(ensureStringed(thing)),
  unencodeNumber: (number) => number.split(".")
};
var Helpers_default = utils;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiSGVscGVycy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjAgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG4vKiBlc2xpbnQtZGlzYWJsZSBndWFyZC1mb3ItaW4gKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLXJlc3RyaWN0ZWQtc3ludGF4ICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1wcm90byAqL1xuLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueSAqL1xuXG5jb25zdCBhcnJheUJ1ZmZlciA9IG5ldyBBcnJheUJ1ZmZlcigwKTtcbmNvbnN0IHVpbnQ4QXJyYXkgPSBuZXcgVWludDhBcnJheSgpO1xuXG5jb25zdCBTdGF0aWNBcnJheUJ1ZmZlclByb3RvID0gKGFycmF5QnVmZmVyIGFzIGFueSkuX19wcm90b19fO1xuY29uc3QgU3RhdGljVWludDhBcnJheVByb3RvID0gKHVpbnQ4QXJyYXkgYXMgYW55KS5fX3Byb3RvX187XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvZXhwbGljaXQtbW9kdWxlLWJvdW5kYXJ5LXR5cGVzXG5mdW5jdGlvbiBnZXRTdHJpbmcodGhpbmc6IGFueSk6IHN0cmluZyB7XG4gIGlmICh0aGluZyA9PT0gT2JqZWN0KHRoaW5nKSkge1xuICAgIGlmICh0aGluZy5fX3Byb3RvX18gPT09IFN0YXRpY1VpbnQ4QXJyYXlQcm90bykge1xuICAgICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkobnVsbCwgdGhpbmcpO1xuICAgIH1cbiAgICBpZiAodGhpbmcuX19wcm90b19fID09PSBTdGF0aWNBcnJheUJ1ZmZlclByb3RvKSB7XG4gICAgICByZXR1cm4gZ2V0U3RyaW5nKG5ldyBVaW50OEFycmF5KHRoaW5nKSk7XG4gICAgfVxuICB9XG4gIHJldHVybiB0aGluZztcbn1cblxuZnVuY3Rpb24gZ2V0U3RyaW5nYWJsZSh0aGluZzogYW55KTogYm9vbGVhbiB7XG4gIHJldHVybiAoXG4gICAgdHlwZW9mIHRoaW5nID09PSAnc3RyaW5nJyB8fFxuICAgIHR5cGVvZiB0aGluZyA9PT0gJ251bWJlcicgfHxcbiAgICB0eXBlb2YgdGhpbmcgPT09ICdib29sZWFuJyB8fFxuICAgICh0aGluZyA9PT0gT2JqZWN0KHRoaW5nKSAmJlxuICAgICAgKHRoaW5nLl9fcHJvdG9fXyA9PT0gU3RhdGljQXJyYXlCdWZmZXJQcm90byB8fFxuICAgICAgICB0aGluZy5fX3Byb3RvX18gPT09IFN0YXRpY1VpbnQ4QXJyYXlQcm90bykpXG4gICk7XG59XG5cbmZ1bmN0aW9uIGVuc3VyZVN0cmluZ2VkKHRoaW5nOiBhbnkpOiBhbnkge1xuICBpZiAoZ2V0U3RyaW5nYWJsZSh0aGluZykpIHtcbiAgICByZXR1cm4gZ2V0U3RyaW5nKHRoaW5nKTtcbiAgfVxuICBpZiAodGhpbmcgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgIGNvbnN0IHJlcyA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpbmcubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIHJlc1tpXSA9IGVuc3VyZVN0cmluZ2VkKHRoaW5nW2ldKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzO1xuICB9XG4gIGlmICh0aGluZyA9PT0gT2JqZWN0KHRoaW5nKSkge1xuICAgIGNvbnN0IHJlczogYW55ID0ge307XG4gICAgZm9yIChjb25zdCBrZXkgaW4gdGhpbmcpIHtcbiAgICAgIHJlc1trZXldID0gZW5zdXJlU3RyaW5nZWQodGhpbmdba2V5XSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlcztcbiAgfVxuICBpZiAodGhpbmcgPT09IG51bGwpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICB0aHJvdyBuZXcgRXJyb3IoYHVuc3VyZSBvZiBob3cgdG8ganNvbmlmeSBvYmplY3Qgb2YgdHlwZSAke3R5cGVvZiB0aGluZ31gKTtcbn1cblxuLy8gTnVtYmVyIGZvcm1hdHRpbmcgdXRpbHNcbmNvbnN0IHV0aWxzID0ge1xuICBnZXRTdHJpbmcsXG4gIGlzTnVtYmVyU2FuZTogKG51bWJlcjogc3RyaW5nKTogYm9vbGVhbiA9PlxuICAgIG51bWJlclswXSA9PT0gJysnICYmIC9eWzAtOV0rJC8udGVzdChudW1iZXIuc3Vic3RyaW5nKDEpKSxcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9leHBsaWNpdC1tb2R1bGUtYm91bmRhcnktdHlwZXNcbiAganNvblRoaW5nOiAodGhpbmc6IHVua25vd24pID0+IEpTT04uc3RyaW5naWZ5KGVuc3VyZVN0cmluZ2VkKHRoaW5nKSksXG4gIHVuZW5jb2RlTnVtYmVyOiAobnVtYmVyOiBzdHJpbmcpOiBBcnJheTxzdHJpbmc+ID0+IG51bWJlci5zcGxpdCgnLicpLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgdXRpbHM7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBUUEsTUFBTSxjQUFjLElBQUksWUFBWSxDQUFDO0FBQ3JDLE1BQU0sYUFBYSxJQUFJLFdBQVc7QUFFbEMsTUFBTSx5QkFBMEIsWUFBb0I7QUFDcEQsTUFBTSx3QkFBeUIsV0FBbUI7QUFHbEQsbUJBQW1CLE9BQW9CO0FBQ3JDLE1BQUksVUFBVSxPQUFPLEtBQUssR0FBRztBQUMzQixRQUFJLE1BQU0sY0FBYyx1QkFBdUI7QUFDN0MsYUFBTyxPQUFPLGFBQWEsTUFBTSxNQUFNLEtBQUs7QUFBQSxJQUM5QztBQUNBLFFBQUksTUFBTSxjQUFjLHdCQUF3QjtBQUM5QyxhQUFPLFVBQVUsSUFBSSxXQUFXLEtBQUssQ0FBQztBQUFBLElBQ3hDO0FBQUEsRUFDRjtBQUNBLFNBQU87QUFDVDtBQVZTLEFBWVQsdUJBQXVCLE9BQXFCO0FBQzFDLFNBQ0UsT0FBTyxVQUFVLFlBQ2pCLE9BQU8sVUFBVSxZQUNqQixPQUFPLFVBQVUsYUFDaEIsVUFBVSxPQUFPLEtBQUssS0FDcEIsT0FBTSxjQUFjLDBCQUNuQixNQUFNLGNBQWM7QUFFNUI7QUFUUyxBQVdULHdCQUF3QixPQUFpQjtBQUN2QyxNQUFJLGNBQWMsS0FBSyxHQUFHO0FBQ3hCLFdBQU8sVUFBVSxLQUFLO0FBQUEsRUFDeEI7QUFDQSxNQUFJLGlCQUFpQixPQUFPO0FBQzFCLFVBQU0sTUFBTSxDQUFDO0FBQ2IsYUFBUyxJQUFJLEdBQUcsSUFBSSxNQUFNLFFBQVEsS0FBSyxHQUFHO0FBQ3hDLFVBQUksS0FBSyxlQUFlLE1BQU0sRUFBRTtBQUFBLElBQ2xDO0FBRUEsV0FBTztBQUFBLEVBQ1Q7QUFDQSxNQUFJLFVBQVUsT0FBTyxLQUFLLEdBQUc7QUFDM0IsVUFBTSxNQUFXLENBQUM7QUFDbEIsZUFBVyxPQUFPLE9BQU87QUFDdkIsVUFBSSxPQUFPLGVBQWUsTUFBTSxJQUFJO0FBQUEsSUFDdEM7QUFFQSxXQUFPO0FBQUEsRUFDVDtBQUNBLE1BQUksVUFBVSxNQUFNO0FBQ2xCLFdBQU87QUFBQSxFQUNUO0FBQ0EsUUFBTSxJQUFJLE1BQU0sMkNBQTJDLE9BQU8sT0FBTztBQUMzRTtBQXhCUyxBQTJCVCxNQUFNLFFBQVE7QUFBQSxFQUNaO0FBQUEsRUFDQSxjQUFjLENBQUMsV0FDYixPQUFPLE9BQU8sT0FBTyxXQUFXLEtBQUssT0FBTyxVQUFVLENBQUMsQ0FBQztBQUFBLEVBRTFELFdBQVcsQ0FBQyxVQUFtQixLQUFLLFVBQVUsZUFBZSxLQUFLLENBQUM7QUFBQSxFQUNuRSxnQkFBZ0IsQ0FBQyxXQUFrQyxPQUFPLE1BQU0sR0FBRztBQUNyRTtBQUVBLElBQU8sa0JBQVE7IiwKICAibmFtZXMiOiBbXQp9Cg==
