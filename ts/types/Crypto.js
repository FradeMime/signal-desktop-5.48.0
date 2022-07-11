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
var Crypto_exports = {};
__export(Crypto_exports, {
  CipherType: () => CipherType,
  HashType: () => HashType
});
module.exports = __toCommonJS(Crypto_exports);
var HashType = /* @__PURE__ */ ((HashType2) => {
  HashType2["size256"] = "sha256";
  HashType2["size512"] = "sha512";
  return HashType2;
})(HashType || {});
var CipherType = /* @__PURE__ */ ((CipherType2) => {
  CipherType2["AES256CBC"] = "aes-256-cbc";
  CipherType2["AES256CTR"] = "aes-256-ctr";
  CipherType2["AES256GCM"] = "aes-256-gcm";
  return CipherType2;
})(CipherType || {});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CipherType,
  HashType
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ3J5cHRvLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmV4cG9ydCBlbnVtIEhhc2hUeXBlIHtcbiAgc2l6ZTI1NiA9ICdzaGEyNTYnLFxuICBzaXplNTEyID0gJ3NoYTUxMicsXG59XG5cbmV4cG9ydCBlbnVtIENpcGhlclR5cGUge1xuICBBRVMyNTZDQkMgPSAnYWVzLTI1Ni1jYmMnLFxuICBBRVMyNTZDVFIgPSAnYWVzLTI1Ni1jdHInLFxuICBBRVMyNTZHQ00gPSAnYWVzLTI1Ni1nY20nLFxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHTyxJQUFLLFdBQUwsa0JBQUssY0FBTDtBQUNMLHlCQUFVO0FBQ1YseUJBQVU7QUFGQTtBQUFBO0FBS0wsSUFBSyxhQUFMLGtCQUFLLGdCQUFMO0FBQ0wsNkJBQVk7QUFDWiw2QkFBWTtBQUNaLDZCQUFZO0FBSEY7QUFBQTsiLAogICJuYW1lcyI6IFtdCn0K
