var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var getMutedUntilText_exports = {};
__export(getMutedUntilText_exports, {
  getMutedUntilText: () => getMutedUntilText
});
module.exports = __toCommonJS(getMutedUntilText_exports);
var import_moment = __toESM(require("moment"));
var import_timestamp = require("./timestamp");
function getMutedUntilText(muteExpiresAt, i18n) {
  if (Number(muteExpiresAt) >= Number.MAX_SAFE_INTEGER) {
    return i18n("muteExpirationLabelAlways");
  }
  const expires = (0, import_moment.default)(muteExpiresAt);
  const muteExpirationUntil = (0, import_timestamp.isToday)(expires) ? expires.format("LT") : expires.format("L, LT");
  return i18n("muteExpirationLabel", [muteExpirationUntil]);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getMutedUntilText
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZ2V0TXV0ZWRVbnRpbFRleHQudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxLTIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XG5pbXBvcnQgdHlwZSB7IExvY2FsaXplclR5cGUgfSBmcm9tICcuLi90eXBlcy9VdGlsJztcbmltcG9ydCB7IGlzVG9kYXkgfSBmcm9tICcuL3RpbWVzdGFtcCc7XG5cbi8qKlxuICogUmV0dXJucyBzb21ldGhpbmcgbGlrZSBcIk11dGVkIHVudGlsIDY6MDkgUE1cIiwgbG9jYWxpemVkLlxuICpcbiAqIFNob3VsZG4ndCBiZSBjYWxsZWQgd2l0aCBgMGAuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRNdXRlZFVudGlsVGV4dChcbiAgbXV0ZUV4cGlyZXNBdDogbnVtYmVyLFxuICBpMThuOiBMb2NhbGl6ZXJUeXBlXG4pOiBzdHJpbmcge1xuICBpZiAoTnVtYmVyKG11dGVFeHBpcmVzQXQpID49IE51bWJlci5NQVhfU0FGRV9JTlRFR0VSKSB7XG4gICAgcmV0dXJuIGkxOG4oJ211dGVFeHBpcmF0aW9uTGFiZWxBbHdheXMnKTtcbiAgfVxuXG4gIGNvbnN0IGV4cGlyZXMgPSBtb21lbnQobXV0ZUV4cGlyZXNBdCk7XG4gIGNvbnN0IG11dGVFeHBpcmF0aW9uVW50aWwgPSBpc1RvZGF5KGV4cGlyZXMpXG4gICAgPyBleHBpcmVzLmZvcm1hdCgnTFQnKVxuICAgIDogZXhwaXJlcy5mb3JtYXQoJ0wsIExUJyk7XG5cbiAgcmV0dXJuIGkxOG4oJ211dGVFeHBpcmF0aW9uTGFiZWwnLCBbbXV0ZUV4cGlyYXRpb25VbnRpbF0pO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLG9CQUFtQjtBQUVuQix1QkFBd0I7QUFPakIsMkJBQ0wsZUFDQSxNQUNRO0FBQ1IsTUFBSSxPQUFPLGFBQWEsS0FBSyxPQUFPLGtCQUFrQjtBQUNwRCxXQUFPLEtBQUssMkJBQTJCO0FBQUEsRUFDekM7QUFFQSxRQUFNLFVBQVUsMkJBQU8sYUFBYTtBQUNwQyxRQUFNLHNCQUFzQiw4QkFBUSxPQUFPLElBQ3ZDLFFBQVEsT0FBTyxJQUFJLElBQ25CLFFBQVEsT0FBTyxPQUFPO0FBRTFCLFNBQU8sS0FBSyx1QkFBdUIsQ0FBQyxtQkFBbUIsQ0FBQztBQUMxRDtBQWRnQiIsCiAgIm5hbWVzIjogW10KfQo=
