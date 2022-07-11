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
var generateBlurHash_exports = {};
__export(generateBlurHash_exports, {
  generateBlurHash: () => generateBlurHash
});
module.exports = __toCommonJS(generateBlurHash_exports);
var import_base83 = require("blurhash/dist/base83");
function generateBlurHash(argb = 4294704123) {
  const R = 255 & argb >> 16;
  const G = 255 & argb >> 8;
  const B = 255 & argb >> 0;
  const value = (R << 16) + (G << 8) + B;
  return `00${(0, import_base83.encode83)(value, 4)}`;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  generateBlurHash
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZ2VuZXJhdGVCbHVySGFzaC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyBlbmNvZGU4MyB9IGZyb20gJ2JsdXJoYXNoL2Rpc3QvYmFzZTgzJztcblxuLyogZXNsaW50LWRpc2FibGUgbm8tYml0d2lzZSAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlQmx1ckhhc2goYXJnYiA9IDQyOTQ3MDQxMjMpOiBzdHJpbmcge1xuICBjb25zdCBSID0gMHhmZiAmIChhcmdiID4+IDE2KTtcbiAgY29uc3QgRyA9IDB4ZmYgJiAoYXJnYiA+PiA4KTtcbiAgY29uc3QgQiA9IDB4ZmYgJiAoYXJnYiA+PiAwKTtcblxuICBjb25zdCB2YWx1ZSA9IChSIDw8IDE2KSArIChHIDw8IDgpICsgQjtcblxuICByZXR1cm4gYDAwJHtlbmNvZGU4Myh2YWx1ZSwgNCl9YDtcbn1cbi8qIGVzbGludC1lbmFibGUgbm8tYml0d2lzZSAqL1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLG9CQUF5QjtBQUdsQiwwQkFBMEIsT0FBTyxZQUFvQjtBQUMxRCxRQUFNLElBQUksTUFBUSxRQUFRO0FBQzFCLFFBQU0sSUFBSSxNQUFRLFFBQVE7QUFDMUIsUUFBTSxJQUFJLE1BQVEsUUFBUTtBQUUxQixRQUFNLFFBQVMsTUFBSyxNQUFPLE1BQUssS0FBSztBQUVyQyxTQUFPLEtBQUssNEJBQVMsT0FBTyxDQUFDO0FBQy9CO0FBUmdCIiwKICAibmFtZXMiOiBbXQp9Cg==
