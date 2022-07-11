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
var graphemeAwareSlice_exports = {};
__export(graphemeAwareSlice_exports, {
  graphemeAwareSlice: () => graphemeAwareSlice
});
module.exports = __toCommonJS(graphemeAwareSlice_exports);
function graphemeAwareSlice(str, length, buffer = 100) {
  if (str.length <= length + buffer) {
    return { text: str, hasReadMore: false };
  }
  let text;
  for (const { index } of new Intl.Segmenter().segment(str)) {
    if (!text && index >= length) {
      text = str.slice(0, index);
    }
    if (text && index > length) {
      return {
        text,
        hasReadMore: true
      };
    }
  }
  return {
    text: str,
    hasReadMore: false
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  graphemeAwareSlice
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZ3JhcGhlbWVBd2FyZVNsaWNlLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMS0yMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuZXhwb3J0IGZ1bmN0aW9uIGdyYXBoZW1lQXdhcmVTbGljZShcbiAgc3RyOiBzdHJpbmcsXG4gIGxlbmd0aDogbnVtYmVyLFxuICBidWZmZXIgPSAxMDBcbik6IHtcbiAgaGFzUmVhZE1vcmU6IGJvb2xlYW47XG4gIHRleHQ6IHN0cmluZztcbn0ge1xuICBpZiAoc3RyLmxlbmd0aCA8PSBsZW5ndGggKyBidWZmZXIpIHtcbiAgICByZXR1cm4geyB0ZXh0OiBzdHIsIGhhc1JlYWRNb3JlOiBmYWxzZSB9O1xuICB9XG5cbiAgbGV0IHRleHQ6IHN0cmluZyB8IHVuZGVmaW5lZDtcblxuICBmb3IgKGNvbnN0IHsgaW5kZXggfSBvZiBuZXcgSW50bC5TZWdtZW50ZXIoKS5zZWdtZW50KHN0cikpIHtcbiAgICBpZiAoIXRleHQgJiYgaW5kZXggPj0gbGVuZ3RoKSB7XG4gICAgICB0ZXh0ID0gc3RyLnNsaWNlKDAsIGluZGV4KTtcbiAgICB9XG4gICAgaWYgKHRleHQgJiYgaW5kZXggPiBsZW5ndGgpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHRleHQsXG4gICAgICAgIGhhc1JlYWRNb3JlOiB0cnVlLFxuICAgICAgfTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHRleHQ6IHN0cixcbiAgICBoYXNSZWFkTW9yZTogZmFsc2UsXG4gIH07XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR08sNEJBQ0wsS0FDQSxRQUNBLFNBQVMsS0FJVDtBQUNBLE1BQUksSUFBSSxVQUFVLFNBQVMsUUFBUTtBQUNqQyxXQUFPLEVBQUUsTUFBTSxLQUFLLGFBQWEsTUFBTTtBQUFBLEVBQ3pDO0FBRUEsTUFBSTtBQUVKLGFBQVcsRUFBRSxXQUFXLElBQUksS0FBSyxVQUFVLEVBQUUsUUFBUSxHQUFHLEdBQUc7QUFDekQsUUFBSSxDQUFDLFFBQVEsU0FBUyxRQUFRO0FBQzVCLGFBQU8sSUFBSSxNQUFNLEdBQUcsS0FBSztBQUFBLElBQzNCO0FBQ0EsUUFBSSxRQUFRLFFBQVEsUUFBUTtBQUMxQixhQUFPO0FBQUEsUUFDTDtBQUFBLFFBQ0EsYUFBYTtBQUFBLE1BQ2Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUVBLFNBQU87QUFBQSxJQUNMLE1BQU07QUFBQSxJQUNOLGFBQWE7QUFBQSxFQUNmO0FBQ0Y7QUE5QmdCIiwKICAibmFtZXMiOiBbXQp9Cg==
