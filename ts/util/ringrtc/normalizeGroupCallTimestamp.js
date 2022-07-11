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
var normalizeGroupCallTimestamp_exports = {};
__export(normalizeGroupCallTimestamp_exports, {
  normalizeGroupCallTimestamp: () => normalizeGroupCallTimestamp
});
module.exports = __toCommonJS(normalizeGroupCallTimestamp_exports);
function normalizeGroupCallTimestamp(fromRingRtc) {
  let asNumber;
  switch (typeof fromRingRtc) {
    case "number":
      asNumber = fromRingRtc;
      break;
    case "string":
      asNumber = parseInt(fromRingRtc.slice(0, 15), 10);
      break;
    case "bigint":
      asNumber = Number(fromRingRtc);
      break;
    default:
      return void 0;
  }
  if (Number.isNaN(asNumber) || asNumber <= 0) {
    return void 0;
  }
  return asNumber;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  normalizeGroupCallTimestamp
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibm9ybWFsaXplR3JvdXBDYWxsVGltZXN0YW1wLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMCBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbi8qKlxuICogTm9ybWFsaXplcyBncm91cCBjYWxsIHRpbWVzdGFtcHMgKGBhZGRlZFRpbWVgIGFuZCBgc3BlYWtlclRpbWVgKSBpbnRvIG51bWJlcnMuIFdlXG4gKiBleHBlY3QgUmluZ1JUQyB0byBzZW5kIGEgc3RyaW5nLCBidXQgaXQgc2VuZHMgYSBtYWxmb3JtZWQgbnVtYmVyIGFzIG9mIHRoaXMgd3JpdGluZyxcbiAqIFJpbmdSVEMgMi44LjMuXG4gKlxuICogV2UgY291bGQgcHJvYmFibHkgc2FmZWx5IGRvIGBOdW1iZXIoZnJvbVJpbmdSdGMpYCBhbmQgYmUgZG9uZSwgYnV0IHRoaXMgaXMgZXh0cmEtXG4gKiBjYXJlZnVsLlxuICovXG5leHBvcnQgZnVuY3Rpb24gbm9ybWFsaXplR3JvdXBDYWxsVGltZXN0YW1wKFxuICBmcm9tUmluZ1J0YzogdW5rbm93blxuKTogdW5kZWZpbmVkIHwgbnVtYmVyIHtcbiAgbGV0IGFzTnVtYmVyOiBudW1iZXI7XG5cbiAgc3dpdGNoICh0eXBlb2YgZnJvbVJpbmdSdGMpIHtcbiAgICBjYXNlICdudW1iZXInOlxuICAgICAgYXNOdW1iZXIgPSBmcm9tUmluZ1J0YztcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICBhc051bWJlciA9IHBhcnNlSW50KGZyb21SaW5nUnRjLnNsaWNlKDAsIDE1KSwgMTApO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnYmlnaW50JzpcbiAgICAgIGFzTnVtYmVyID0gTnVtYmVyKGZyb21SaW5nUnRjKTtcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgaWYgKE51bWJlci5pc05hTihhc051bWJlcikgfHwgYXNOdW1iZXIgPD0gMCkge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICByZXR1cm4gYXNOdW1iZXI7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBV08scUNBQ0wsYUFDb0I7QUFDcEIsTUFBSTtBQUVKLFVBQVEsT0FBTztBQUFBLFNBQ1I7QUFDSCxpQkFBVztBQUNYO0FBQUEsU0FDRztBQUNILGlCQUFXLFNBQVMsWUFBWSxNQUFNLEdBQUcsRUFBRSxHQUFHLEVBQUU7QUFDaEQ7QUFBQSxTQUNHO0FBQ0gsaUJBQVcsT0FBTyxXQUFXO0FBQzdCO0FBQUE7QUFFQSxhQUFPO0FBQUE7QUFHWCxNQUFJLE9BQU8sTUFBTSxRQUFRLEtBQUssWUFBWSxHQUFHO0FBQzNDLFdBQU87QUFBQSxFQUNUO0FBRUEsU0FBTztBQUNUO0FBeEJnQiIsCiAgIm5hbWVzIjogW10KfQo=
