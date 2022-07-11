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
var uuidFetchState_exports = {};
__export(uuidFetchState_exports, {
  isFetchingByE164: () => isFetchingByE164,
  isFetchingByUsername: () => isFetchingByUsername
});
module.exports = __toCommonJS(uuidFetchState_exports);
const isFetchingByUsername = /* @__PURE__ */ __name((fetchState, username) => {
  return Boolean(fetchState[`username:${username}`]);
}, "isFetchingByUsername");
const isFetchingByE164 = /* @__PURE__ */ __name((fetchState, e164) => {
  return Boolean(fetchState[`e164:${e164}`]);
}, "isFetchingByE164");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  isFetchingByE164,
  isFetchingByUsername
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidXVpZEZldGNoU3RhdGUudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuZXhwb3J0IHR5cGUgVVVJREZldGNoU3RhdGVLZXlUeXBlID0gYCR7J3VzZXJuYW1lJyB8ICdlMTY0J306JHtzdHJpbmd9YDtcbmV4cG9ydCB0eXBlIFVVSURGZXRjaFN0YXRlVHlwZSA9IFJlY29yZDxVVUlERmV0Y2hTdGF0ZUtleVR5cGUsIGJvb2xlYW4+O1xuXG5leHBvcnQgY29uc3QgaXNGZXRjaGluZ0J5VXNlcm5hbWUgPSAoXG4gIGZldGNoU3RhdGU6IFVVSURGZXRjaFN0YXRlVHlwZSxcbiAgdXNlcm5hbWU6IHN0cmluZ1xuKTogYm9vbGVhbiA9PiB7XG4gIHJldHVybiBCb29sZWFuKGZldGNoU3RhdGVbYHVzZXJuYW1lOiR7dXNlcm5hbWV9YF0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGlzRmV0Y2hpbmdCeUUxNjQgPSAoXG4gIGZldGNoU3RhdGU6IFVVSURGZXRjaFN0YXRlVHlwZSxcbiAgZTE2NDogc3RyaW5nXG4pOiBib29sZWFuID0+IHtcbiAgcmV0dXJuIEJvb2xlYW4oZmV0Y2hTdGF0ZVtgZTE2NDoke2UxNjR9YF0pO1xufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQU1PLE1BQU0sdUJBQXVCLHdCQUNsQyxZQUNBLGFBQ1k7QUFDWixTQUFPLFFBQVEsV0FBVyxZQUFZLFdBQVc7QUFDbkQsR0FMb0M7QUFPN0IsTUFBTSxtQkFBbUIsd0JBQzlCLFlBQ0EsU0FDWTtBQUNaLFNBQU8sUUFBUSxXQUFXLFFBQVEsT0FBTztBQUMzQyxHQUxnQzsiLAogICJuYW1lcyI6IFtdCn0K
