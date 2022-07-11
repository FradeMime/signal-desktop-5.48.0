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
var curve_exports = {};
__export(curve_exports, {
  keyPair: () => keyPair,
  sign: () => sign,
  verify: () => verify
});
module.exports = __toCommonJS(curve_exports);
var import_libsignal_client = require("@signalapp/libsignal-client");
function keyPair() {
  const privKey = import_libsignal_client.PrivateKey.generate();
  const pubKey = privKey.getPublicKey();
  return {
    publicKey: pubKey.serialize(),
    privateKey: privKey.serialize()
  };
}
function sign(privateKey, message) {
  const privKeyObj = import_libsignal_client.PrivateKey.deserialize(privateKey);
  const signature = privKeyObj.sign(message);
  return signature;
}
function verify(publicKey, message, signature) {
  const pubKeyObj = import_libsignal_client.PublicKey.deserialize(publicKey);
  const result = pubKeyObj.verify(message, signature);
  return result;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  keyPair,
  sign,
  verify
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiY3VydmUudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDE5LTIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyBQcml2YXRlS2V5LCBQdWJsaWNLZXkgfSBmcm9tICdAc2lnbmFsYXBwL2xpYnNpZ25hbC1jbGllbnQnO1xuXG5leHBvcnQgZnVuY3Rpb24ga2V5UGFpcigpOiBSZWNvcmQ8c3RyaW5nLCBCdWZmZXI+IHtcbiAgY29uc3QgcHJpdktleSA9IFByaXZhdGVLZXkuZ2VuZXJhdGUoKTtcbiAgY29uc3QgcHViS2V5ID0gcHJpdktleS5nZXRQdWJsaWNLZXkoKTtcblxuICByZXR1cm4ge1xuICAgIHB1YmxpY0tleTogcHViS2V5LnNlcmlhbGl6ZSgpLFxuICAgIHByaXZhdGVLZXk6IHByaXZLZXkuc2VyaWFsaXplKCksXG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzaWduKHByaXZhdGVLZXk6IEJ1ZmZlciwgbWVzc2FnZTogQnVmZmVyKTogQnVmZmVyIHtcbiAgY29uc3QgcHJpdktleU9iaiA9IFByaXZhdGVLZXkuZGVzZXJpYWxpemUocHJpdmF0ZUtleSk7XG4gIGNvbnN0IHNpZ25hdHVyZSA9IHByaXZLZXlPYmouc2lnbihtZXNzYWdlKTtcbiAgcmV0dXJuIHNpZ25hdHVyZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHZlcmlmeShcbiAgcHVibGljS2V5OiBCdWZmZXIsXG4gIG1lc3NhZ2U6IEJ1ZmZlcixcbiAgc2lnbmF0dXJlOiBCdWZmZXJcbik6IGJvb2xlYW4ge1xuICBjb25zdCBwdWJLZXlPYmogPSBQdWJsaWNLZXkuZGVzZXJpYWxpemUocHVibGljS2V5KTtcbiAgY29uc3QgcmVzdWx0ID0gcHViS2V5T2JqLnZlcmlmeShtZXNzYWdlLCBzaWduYXR1cmUpO1xuICByZXR1cm4gcmVzdWx0O1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSw4QkFBc0M7QUFFL0IsbUJBQTJDO0FBQ2hELFFBQU0sVUFBVSxtQ0FBVyxTQUFTO0FBQ3BDLFFBQU0sU0FBUyxRQUFRLGFBQWE7QUFFcEMsU0FBTztBQUFBLElBQ0wsV0FBVyxPQUFPLFVBQVU7QUFBQSxJQUM1QixZQUFZLFFBQVEsVUFBVTtBQUFBLEVBQ2hDO0FBQ0Y7QUFSZ0IsQUFVVCxjQUFjLFlBQW9CLFNBQXlCO0FBQ2hFLFFBQU0sYUFBYSxtQ0FBVyxZQUFZLFVBQVU7QUFDcEQsUUFBTSxZQUFZLFdBQVcsS0FBSyxPQUFPO0FBQ3pDLFNBQU87QUFDVDtBQUpnQixBQU1ULGdCQUNMLFdBQ0EsU0FDQSxXQUNTO0FBQ1QsUUFBTSxZQUFZLGtDQUFVLFlBQVksU0FBUztBQUNqRCxRQUFNLFNBQVMsVUFBVSxPQUFPLFNBQVMsU0FBUztBQUNsRCxTQUFPO0FBQ1Q7QUFSZ0IiLAogICJuYW1lcyI6IFtdCn0K
