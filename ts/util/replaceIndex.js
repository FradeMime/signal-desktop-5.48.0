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
var replaceIndex_exports = {};
__export(replaceIndex_exports, {
  replaceIndex: () => replaceIndex
});
module.exports = __toCommonJS(replaceIndex_exports);
function replaceIndex(arr, index, newItem) {
  if (!(index in arr)) {
    throw new RangeError(`replaceIndex: ${index} out of range`);
  }
  const result = [...arr];
  result[index] = newItem;
  return result;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  replaceIndex
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsicmVwbGFjZUluZGV4LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmV4cG9ydCBmdW5jdGlvbiByZXBsYWNlSW5kZXg8VD4oXG4gIGFycjogUmVhZG9ubHlBcnJheTxUPixcbiAgaW5kZXg6IG51bWJlcixcbiAgbmV3SXRlbTogVFxuKTogQXJyYXk8VD4ge1xuICBpZiAoIShpbmRleCBpbiBhcnIpKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoYHJlcGxhY2VJbmRleDogJHtpbmRleH0gb3V0IG9mIHJhbmdlYCk7XG4gIH1cblxuICBjb25zdCByZXN1bHQgPSBbLi4uYXJyXTtcbiAgcmVzdWx0W2luZGV4XSA9IG5ld0l0ZW07XG4gIHJldHVybiByZXN1bHQ7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR08sc0JBQ0wsS0FDQSxPQUNBLFNBQ1U7QUFDVixNQUFJLENBQUUsVUFBUyxNQUFNO0FBQ25CLFVBQU0sSUFBSSxXQUFXLGlCQUFpQixvQkFBb0I7QUFBQSxFQUM1RDtBQUVBLFFBQU0sU0FBUyxDQUFDLEdBQUcsR0FBRztBQUN0QixTQUFPLFNBQVM7QUFDaEIsU0FBTztBQUNUO0FBWmdCIiwKICAibmFtZXMiOiBbXQp9Cg==
