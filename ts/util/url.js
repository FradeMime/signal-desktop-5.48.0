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
var url_exports = {};
__export(url_exports, {
  maybeParseUrl: () => maybeParseUrl,
  setUrlSearchParams: () => setUrlSearchParams
});
module.exports = __toCommonJS(url_exports);
var import_lodash = require("lodash");
function maybeParseUrl(value) {
  if (typeof value === "string") {
    try {
      return new URL(value);
    } catch (err) {
    }
  }
  return void 0;
}
function setUrlSearchParams(url, searchParams) {
  const result = cloneUrl(url);
  result.search = new URLSearchParams((0, import_lodash.mapValues)(searchParams, stringifySearchParamValue)).toString();
  return result;
}
function cloneUrl(url) {
  return new URL(url.href);
}
function stringifySearchParamValue(value) {
  return value == null ? "" : String(value);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  maybeParseUrl,
  setUrlSearchParams
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidXJsLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IG1hcFZhbHVlcyB9IGZyb20gJ2xvZGFzaCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBtYXliZVBhcnNlVXJsKHZhbHVlOiBzdHJpbmcpOiB1bmRlZmluZWQgfCBVUkwge1xuICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gbmV3IFVSTCh2YWx1ZSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAvKiBFcnJvcnMgYXJlIGlnbm9yZWQuICovXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldFVybFNlYXJjaFBhcmFtcyhcbiAgdXJsOiBSZWFkb25seTxVUkw+LFxuICBzZWFyY2hQYXJhbXM6IFJlYWRvbmx5PFJlY29yZDxzdHJpbmcsIHVua25vd24+PlxuKTogVVJMIHtcbiAgY29uc3QgcmVzdWx0ID0gY2xvbmVVcmwodXJsKTtcbiAgcmVzdWx0LnNlYXJjaCA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoXG4gICAgbWFwVmFsdWVzKHNlYXJjaFBhcmFtcywgc3RyaW5naWZ5U2VhcmNoUGFyYW1WYWx1ZSlcbiAgKS50b1N0cmluZygpO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBjbG9uZVVybCh1cmw6IFJlYWRvbmx5PFVSTD4pOiBVUkwge1xuICByZXR1cm4gbmV3IFVSTCh1cmwuaHJlZik7XG59XG5cbmZ1bmN0aW9uIHN0cmluZ2lmeVNlYXJjaFBhcmFtVmFsdWUodmFsdWU6IHVua25vd24pOiBzdHJpbmcge1xuICByZXR1cm4gdmFsdWUgPT0gbnVsbCA/ICcnIDogU3RyaW5nKHZhbHVlKTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLG9CQUEwQjtBQUVuQix1QkFBdUIsT0FBZ0M7QUFDNUQsTUFBSSxPQUFPLFVBQVUsVUFBVTtBQUM3QixRQUFJO0FBQ0YsYUFBTyxJQUFJLElBQUksS0FBSztBQUFBLElBQ3RCLFNBQVMsS0FBUDtBQUFBLElBRUY7QUFBQSxFQUNGO0FBRUEsU0FBTztBQUNUO0FBVmdCLEFBWVQsNEJBQ0wsS0FDQSxjQUNLO0FBQ0wsUUFBTSxTQUFTLFNBQVMsR0FBRztBQUMzQixTQUFPLFNBQVMsSUFBSSxnQkFDbEIsNkJBQVUsY0FBYyx5QkFBeUIsQ0FDbkQsRUFBRSxTQUFTO0FBQ1gsU0FBTztBQUNUO0FBVGdCLEFBV2hCLGtCQUFrQixLQUF5QjtBQUN6QyxTQUFPLElBQUksSUFBSSxJQUFJLElBQUk7QUFDekI7QUFGUyxBQUlULG1DQUFtQyxPQUF3QjtBQUN6RCxTQUFPLFNBQVMsT0FBTyxLQUFLLE9BQU8sS0FBSztBQUMxQztBQUZTIiwKICAibmFtZXMiOiBbXQp9Cg==
