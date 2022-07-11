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
var after_sign_exports = {};
__export(after_sign_exports, {
  afterSign: () => afterSign
});
module.exports = __toCommonJS(after_sign_exports);
var import_notarize = require("./notarize");
async function afterSign(context) {
  await (0, import_notarize.afterSign)(context);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  afterSign
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiYWZ0ZXItc2lnbi50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgdHlwZSB7IEFmdGVyUGFja0NvbnRleHQgfSBmcm9tICdlbGVjdHJvbi1idWlsZGVyJztcbmltcG9ydCB7IGFmdGVyU2lnbiBhcyBub3Rhcml6ZSB9IGZyb20gJy4vbm90YXJpemUnO1xuXG4vLyBOT1RFOiBJdCBpcyBBZnRlclBhY2tDb250ZXh0IGhlcmUgZXZlbiB0aG91Z2ggaXQgaXMgYWZ0ZXJTaWduLlxuLy8gU2VlOiBodHRwczovL3d3dy5lbGVjdHJvbi5idWlsZC9jb25maWd1cmF0aW9uL2NvbmZpZ3VyYXRpb24uaHRtbCNhZnRlcnNpZ25cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhZnRlclNpZ24oY29udGV4dDogQWZ0ZXJQYWNrQ29udGV4dCk6IFByb21pc2U8dm9pZD4ge1xuICAvLyBUaGlzIG11c3QgYmUgdGhlIGxhc3Qgc3RlcFxuICBhd2FpdCBub3Rhcml6ZShjb250ZXh0KTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFJQSxzQkFBc0M7QUFJdEMseUJBQWdDLFNBQTBDO0FBRXhFLFFBQU0sK0JBQVMsT0FBTztBQUN4QjtBQUhzQiIsCiAgIm5hbWVzIjogW10KfQo=
