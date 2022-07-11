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
var MessageReadStatus_exports = {};
__export(MessageReadStatus_exports, {
  ReadStatus: () => ReadStatus,
  maxReadStatus: () => maxReadStatus
});
module.exports = __toCommonJS(MessageReadStatus_exports);
var ReadStatus = /* @__PURE__ */ ((ReadStatus2) => {
  ReadStatus2[ReadStatus2["Unread"] = 1] = "Unread";
  ReadStatus2[ReadStatus2["Read"] = 0] = "Read";
  ReadStatus2[ReadStatus2["Viewed"] = 2] = "Viewed";
  return ReadStatus2;
})(ReadStatus || {});
const STATUS_NUMBERS = {
  [1 /* Unread */]: 0,
  [0 /* Read */]: 1,
  [2 /* Viewed */]: 2
};
const maxReadStatus = /* @__PURE__ */ __name((a, b) => STATUS_NUMBERS[a] > STATUS_NUMBERS[b] ? a : b, "maxReadStatus");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ReadStatus,
  maxReadStatus
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiTWVzc2FnZVJlYWRTdGF0dXMudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuLyoqXG4gKiBgUmVhZFN0YXR1c2AgcmVwcmVzZW50cyB5b3VyIGxvY2FsIHJlYWQvdmlld2VkIHN0YXR1cyBvZiBhIHNpbmdsZSBpbmNvbWluZyBtZXNzYWdlLlxuICogTWVzc2FnZXMgZ28gZnJvbSBVbnJlYWQgdG8gUmVhZCB0byBWaWV3ZWQ7IHRoZXkgbmV2ZXIgZ28gXCJiYWNrd2FyZHNcIi5cbiAqXG4gKiBOb3RlIHRoYXQgYSBjb252ZXJzYXRpb24gY2FuIGJlIG1hcmtlZCB1bnJlYWQsIHdoaWNoIGlzIG5vdCBhdCB0aGUgbWVzc2FnZSBsZXZlbC5cbiAqXG4gKiBCZSBjYXJlZnVsIHdoZW4gY2hhbmdpbmcgdGhlc2UgdmFsdWVzLCBhcyB0aGV5IGFyZSBwZXJzaXN0ZWQuIE5vdGFibHksIHdlIHByZXZpb3VzbHlcbiAqIGhhZCBhIGZpZWxkIGNhbGxlZCBcInVucmVhZFwiLCB3aGljaCBpcyB3aHkgVW5yZWFkIGNvcnJlc3BvbmRzIHRvIDEgYW5kIFJlYWQgdG8gMC5cbiAqL1xuZXhwb3J0IGVudW0gUmVhZFN0YXR1cyB7XG4gIFVucmVhZCA9IDEsXG4gIFJlYWQgPSAwLFxuICBWaWV3ZWQgPSAyLFxufVxuXG5jb25zdCBTVEFUVVNfTlVNQkVSUzogUmVjb3JkPFJlYWRTdGF0dXMsIG51bWJlcj4gPSB7XG4gIFtSZWFkU3RhdHVzLlVucmVhZF06IDAsXG4gIFtSZWFkU3RhdHVzLlJlYWRdOiAxLFxuICBbUmVhZFN0YXR1cy5WaWV3ZWRdOiAyLFxufTtcblxuZXhwb3J0IGNvbnN0IG1heFJlYWRTdGF0dXMgPSAoYTogUmVhZFN0YXR1cywgYjogUmVhZFN0YXR1cyk6IFJlYWRTdGF0dXMgPT5cbiAgU1RBVFVTX05VTUJFUlNbYV0gPiBTVEFUVVNfTlVNQkVSU1tiXSA/IGEgOiBiO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBWU8sSUFBSyxhQUFMLGtCQUFLLGdCQUFMO0FBQ0wsc0NBQVMsS0FBVDtBQUNBLG9DQUFPLEtBQVA7QUFDQSxzQ0FBUyxLQUFUO0FBSFU7QUFBQTtBQU1aLE1BQU0saUJBQTZDO0FBQUEsR0FDaEQsaUJBQW9CO0FBQUEsR0FDcEIsZUFBa0I7QUFBQSxHQUNsQixpQkFBb0I7QUFDdkI7QUFFTyxNQUFNLGdCQUFnQix3QkFBQyxHQUFlLE1BQzNDLGVBQWUsS0FBSyxlQUFlLEtBQUssSUFBSSxHQURqQjsiLAogICJuYW1lcyI6IFtdCn0K
