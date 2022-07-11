var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var Util_exports = {};
__export(Util_exports, {
  ScrollBehavior: () => ScrollBehavior,
  ThemeType: () => ThemeType
});
module.exports = __toCommonJS(Util_exports);
var ThemeType = /* @__PURE__ */ ((ThemeType2) => {
  ThemeType2["light"] = "light";
  ThemeType2["dark"] = "dark";
  return ThemeType2;
})(ThemeType || {});
var ScrollBehavior = /* @__PURE__ */ ((ScrollBehavior2) => {
  ScrollBehavior2["Default"] = "default";
  ScrollBehavior2["Hard"] = "hard";
  return ScrollBehavior2;
})(ScrollBehavior || {});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ScrollBehavior,
  ThemeType
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiVXRpbC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMTgtMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB0eXBlIHsgVVVJRFN0cmluZ1R5cGUgfSBmcm9tICcuL1VVSUQnO1xuXG5leHBvcnQgdHlwZSBCb2R5UmFuZ2VUeXBlID0ge1xuICBzdGFydDogbnVtYmVyO1xuICBsZW5ndGg6IG51bWJlcjtcbiAgbWVudGlvblV1aWQ/OiBzdHJpbmc7XG4gIHJlcGxhY2VtZW50VGV4dD86IHN0cmluZztcbiAgY29udmVyc2F0aW9uSUQ/OiBzdHJpbmc7XG59O1xuXG5leHBvcnQgdHlwZSBCb2R5UmFuZ2VzVHlwZSA9IEFycmF5PEJvZHlSYW5nZVR5cGU+O1xuXG5leHBvcnQgdHlwZSBTdG9yeUNvbnRleHRUeXBlID0ge1xuICBhdXRob3JVdWlkPzogVVVJRFN0cmluZ1R5cGU7XG4gIHRpbWVzdGFtcDogbnVtYmVyO1xufTtcblxuZXhwb3J0IHR5cGUgUmVuZGVyVGV4dENhbGxiYWNrVHlwZSA9IChvcHRpb25zOiB7XG4gIHRleHQ6IHN0cmluZztcbiAga2V5OiBudW1iZXI7XG59KSA9PiBKU1guRWxlbWVudCB8IHN0cmluZztcblxuZXhwb3J0IHR5cGUgUmVwbGFjZW1lbnRWYWx1ZXNUeXBlID1cbiAgfCBBcnJheTxzdHJpbmc+XG4gIHwge1xuICAgICAgW2tleTogc3RyaW5nXTogc3RyaW5nIHwgbnVtYmVyIHwgdW5kZWZpbmVkO1xuICAgIH07XG5cbmV4cG9ydCB0eXBlIExvY2FsaXplclR5cGUgPSB7XG4gIChrZXk6IHN0cmluZywgdmFsdWVzPzogUmVwbGFjZW1lbnRWYWx1ZXNUeXBlKTogc3RyaW5nO1xuICBnZXRMb2NhbGUoKTogc3RyaW5nO1xufTtcblxuZXhwb3J0IGVudW0gVGhlbWVUeXBlIHtcbiAgJ2xpZ2h0JyA9ICdsaWdodCcsXG4gICdkYXJrJyA9ICdkYXJrJyxcbn1cblxuLy8gVGhlc2UgYXJlIHN0cmluZ3Mgc28gdGhleSBjYW4gYmUgaW50ZXJwb2xhdGVkIGludG8gY2xhc3MgbmFtZXMuXG5leHBvcnQgZW51bSBTY3JvbGxCZWhhdmlvciB7XG4gIERlZmF1bHQgPSAnZGVmYXVsdCcsXG4gIEhhcmQgPSAnaGFyZCcsXG59XG5cbnR5cGUgSW50ZXJuYWxBc3NlcnRQcm9wczxcbiAgUmVzdWx0LFxuICBWYWx1ZSxcbiAgTWlzc2luZyA9IE9taXQ8UmVzdWx0LCBrZXlvZiBWYWx1ZT5cbj4gPSBrZXlvZiBNaXNzaW5nIGV4dGVuZHMgbmV2ZXJcbiAgPyBSZXN1bHRcbiAgOiBSZXN1bHQgJiB7XG4gICAgICBba2V5IGluIGtleW9mIFJlcXVpcmVkPE1pc3Npbmc+XTogW1xuICAgICAgICBuZXZlcixcbiAgICAgICAgJ0Fzc2VydFByb3BzOiBtaXNzaW5nIHByb3BlcnR5J1xuICAgICAgXTtcbiAgICB9O1xuXG5leHBvcnQgdHlwZSBBc3NlcnRQcm9wczxSZXN1bHQsIFZhbHVlPiA9IEludGVybmFsQXNzZXJ0UHJvcHM8UmVzdWx0LCBWYWx1ZT47XG5cbmV4cG9ydCB0eXBlIFVud3JhcFByb21pc2U8VmFsdWU+ID0gVmFsdWUgZXh0ZW5kcyBQcm9taXNlPGluZmVyIFQ+ID8gVCA6IFZhbHVlO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFvQ08sSUFBSyxZQUFMLGtCQUFLLGVBQUw7QUFDTCx3QkFBVTtBQUNWLHVCQUFTO0FBRkM7QUFBQTtBQU1MLElBQUssaUJBQUwsa0JBQUssb0JBQUw7QUFDTCwrQkFBVTtBQUNWLDRCQUFPO0FBRkc7QUFBQTsiLAogICJuYW1lcyI6IFtdCn0K
