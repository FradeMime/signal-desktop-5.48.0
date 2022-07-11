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
var makeLookup_exports = {};
__export(makeLookup_exports, {
  makeLookup: () => makeLookup
});
module.exports = __toCommonJS(makeLookup_exports);
function makeLookup(items, key) {
  return (items || []).reduce((lookup, item) => {
    if (item !== void 0 && item[key] !== void 0) {
      lookup[String(item[key])] = item;
    }
    return lookup;
  }, {});
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  makeLookup
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibWFrZUxvb2t1cC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMTktMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWtlTG9va3VwPFQ+KFxuICBpdGVtczogUmVhZG9ubHlBcnJheTxUPixcbiAga2V5OiBrZXlvZiBUXG4pOiBSZWNvcmQ8c3RyaW5nLCBUPiB7XG4gIHJldHVybiAoaXRlbXMgfHwgW10pLnJlZHVjZSgobG9va3VwLCBpdGVtKSA9PiB7XG4gICAgaWYgKGl0ZW0gIT09IHVuZGVmaW5lZCAmJiBpdGVtW2tleV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgLy8gVGhlIGZvcmNlIGNhc3QgaXMgbmVjZXNzYXJ5IGlmIHdlIHdhbnQgdGhlIGtleW9mIFQgYWJvdmUsIGFuZCB0aGUgZmxleGliaWxpdHlcbiAgICAgIC8vICAgdG8gcGFzcyBhbnl0aGluZyBpbi4gQW5kIG9mIGNvdXJzZSB3ZSdyZSBtb2RpZnlpbmcgYSBwYXJhbWV0ZXIhXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICAgIGxvb2t1cFtTdHJpbmcoaXRlbVtrZXldKV0gPSBpdGVtO1xuICAgIH1cbiAgICByZXR1cm4gbG9va3VwO1xuICB9LCB7fSBhcyBSZWNvcmQ8c3RyaW5nLCBUPik7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR08sb0JBQ0wsT0FDQSxLQUNtQjtBQUNuQixTQUFRLFVBQVMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxRQUFRLFNBQVM7QUFDNUMsUUFBSSxTQUFTLFVBQWEsS0FBSyxTQUFTLFFBQVc7QUFJakQsYUFBTyxPQUFPLEtBQUssSUFBSSxLQUFLO0FBQUEsSUFDOUI7QUFDQSxXQUFPO0FBQUEsRUFDVCxHQUFHLENBQUMsQ0FBc0I7QUFDNUI7QUFiZ0IiLAogICJuYW1lcyI6IFtdCn0K
