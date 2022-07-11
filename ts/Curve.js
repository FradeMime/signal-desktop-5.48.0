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
var Curve_exports = {};
__export(Curve_exports, {
  calculateAgreement: () => calculateAgreement,
  calculateSignature: () => calculateSignature,
  clampPrivateKey: () => clampPrivateKey,
  createKeyPair: () => createKeyPair,
  generateKeyPair: () => generateKeyPair,
  generatePreKey: () => generatePreKey,
  generateSignedPreKey: () => generateSignedPreKey,
  isNonNegativeInteger: () => isNonNegativeInteger,
  prefixPublicKey: () => prefixPublicKey,
  setPublicKeyTypeByte: () => setPublicKeyTypeByte,
  verifySignature: () => verifySignature
});
module.exports = __toCommonJS(Curve_exports);
var client = __toESM(require("@signalapp/libsignal-client"));
var Bytes = __toESM(require("./Bytes"));
var import_Crypto = require("./Crypto");
var log = __toESM(require("./logging/log"));
function isNonNegativeInteger(n) {
  return typeof n === "number" && n % 1 === 0 && n >= 0;
}
function generateSignedPreKey(identityKeyPair, keyId) {
  if (!isNonNegativeInteger(keyId)) {
    throw new TypeError(`generateSignedPreKey: Invalid argument for keyId: ${keyId}`);
  }
  if (!(identityKeyPair.privKey instanceof Uint8Array) || identityKeyPair.privKey.byteLength !== 32 || !(identityKeyPair.pubKey instanceof Uint8Array) || identityKeyPair.pubKey.byteLength !== 33) {
    throw new TypeError("generateSignedPreKey: Invalid argument for identityKeyPair");
  }
  const keyPair = generateKeyPair();
  const signature = calculateSignature(identityKeyPair.privKey, keyPair.pubKey);
  return {
    keyId,
    keyPair,
    signature
  };
}
function generatePreKey(keyId) {
  if (!isNonNegativeInteger(keyId)) {
    throw new TypeError(`generatePreKey: Invalid argument for keyId: ${keyId}`);
  }
  const keyPair = generateKeyPair();
  return {
    keyId,
    keyPair
  };
}
function generateKeyPair() {
  const privKey = client.PrivateKey.generate();
  const pubKey = privKey.getPublicKey();
  return {
    privKey: privKey.serialize(),
    pubKey: pubKey.serialize()
  };
}
function createKeyPair(incomingKey) {
  const copy = new Uint8Array(incomingKey);
  clampPrivateKey(copy);
  if (!(0, import_Crypto.constantTimeEqual)(copy, incomingKey)) {
    log.warn("createKeyPair: incoming private key was not clamped!");
  }
  const incomingKeyBuffer = Buffer.from(incomingKey);
  if (incomingKeyBuffer.length !== 32) {
    throw new Error("key must be 32 bytes long");
  }
  const privKey = client.PrivateKey.deserialize(incomingKeyBuffer);
  const pubKey = privKey.getPublicKey();
  return {
    privKey: privKey.serialize(),
    pubKey: pubKey.serialize()
  };
}
function prefixPublicKey(pubKey) {
  return Bytes.concatenate([
    new Uint8Array([5]),
    validatePubKeyFormat(pubKey)
  ]);
}
function calculateAgreement(pubKey, privKey) {
  const privKeyBuffer = Buffer.from(privKey);
  const pubKeyObj = client.PublicKey.deserialize(Buffer.from(prefixPublicKey(pubKey)));
  const privKeyObj = client.PrivateKey.deserialize(privKeyBuffer);
  const sharedSecret = privKeyObj.agree(pubKeyObj);
  return sharedSecret;
}
function verifySignature(pubKey, message, signature) {
  const pubKeyBuffer = Buffer.from(pubKey);
  const messageBuffer = Buffer.from(message);
  const signatureBuffer = Buffer.from(signature);
  const pubKeyObj = client.PublicKey.deserialize(pubKeyBuffer);
  const result = pubKeyObj.verify(messageBuffer, signatureBuffer);
  return result;
}
function calculateSignature(privKey, plaintext) {
  const privKeyBuffer = Buffer.from(privKey);
  const plaintextBuffer = Buffer.from(plaintext);
  const privKeyObj = client.PrivateKey.deserialize(privKeyBuffer);
  const signature = privKeyObj.sign(plaintextBuffer);
  return signature;
}
function validatePubKeyFormat(pubKey) {
  if (pubKey === void 0 || (pubKey.byteLength !== 33 || pubKey[0] !== 5) && pubKey.byteLength !== 32) {
    throw new Error("Invalid public key");
  }
  if (pubKey.byteLength === 33) {
    return pubKey.slice(1);
  }
  return pubKey;
}
function setPublicKeyTypeByte(publicKey) {
  publicKey[0] = 5;
}
function clampPrivateKey(privateKey) {
  privateKey[0] &= 248;
  privateKey[31] &= 127;
  privateKey[31] |= 64;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  calculateAgreement,
  calculateSignature,
  clampPrivateKey,
  createKeyPair,
  generateKeyPair,
  generatePreKey,
  generateSignedPreKey,
  isNonNegativeInteger,
  prefixPublicKey,
  setPublicKeyTypeByte,
  verifySignature
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ3VydmUudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0ICogYXMgY2xpZW50IGZyb20gJ0BzaWduYWxhcHAvbGlic2lnbmFsLWNsaWVudCc7XG5cbmltcG9ydCAqIGFzIEJ5dGVzIGZyb20gJy4vQnl0ZXMnO1xuaW1wb3J0IHsgY29uc3RhbnRUaW1lRXF1YWwgfSBmcm9tICcuL0NyeXB0byc7XG5pbXBvcnQgdHlwZSB7XG4gIEtleVBhaXJUeXBlLFxuICBDb21wYXRQcmVLZXlUeXBlLFxuICBDb21wYXRTaWduZWRQcmVLZXlUeXBlLFxufSBmcm9tICcuL3RleHRzZWN1cmUvVHlwZXMuZCc7XG5pbXBvcnQgKiBhcyBsb2cgZnJvbSAnLi9sb2dnaW5nL2xvZyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBpc05vbk5lZ2F0aXZlSW50ZWdlcihuOiB1bmtub3duKTogbiBpcyBudW1iZXIge1xuICByZXR1cm4gdHlwZW9mIG4gPT09ICdudW1iZXInICYmIG4gJSAxID09PSAwICYmIG4gPj0gMDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlU2lnbmVkUHJlS2V5KFxuICBpZGVudGl0eUtleVBhaXI6IEtleVBhaXJUeXBlLFxuICBrZXlJZDogbnVtYmVyXG4pOiBDb21wYXRTaWduZWRQcmVLZXlUeXBlIHtcbiAgaWYgKCFpc05vbk5lZ2F0aXZlSW50ZWdlcihrZXlJZCkpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICAgYGdlbmVyYXRlU2lnbmVkUHJlS2V5OiBJbnZhbGlkIGFyZ3VtZW50IGZvciBrZXlJZDogJHtrZXlJZH1gXG4gICAgKTtcbiAgfVxuXG4gIGlmIChcbiAgICAhKGlkZW50aXR5S2V5UGFpci5wcml2S2V5IGluc3RhbmNlb2YgVWludDhBcnJheSkgfHxcbiAgICBpZGVudGl0eUtleVBhaXIucHJpdktleS5ieXRlTGVuZ3RoICE9PSAzMiB8fFxuICAgICEoaWRlbnRpdHlLZXlQYWlyLnB1YktleSBpbnN0YW5jZW9mIFVpbnQ4QXJyYXkpIHx8XG4gICAgaWRlbnRpdHlLZXlQYWlyLnB1YktleS5ieXRlTGVuZ3RoICE9PSAzM1xuICApIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICAgJ2dlbmVyYXRlU2lnbmVkUHJlS2V5OiBJbnZhbGlkIGFyZ3VtZW50IGZvciBpZGVudGl0eUtleVBhaXInXG4gICAgKTtcbiAgfVxuXG4gIGNvbnN0IGtleVBhaXIgPSBnZW5lcmF0ZUtleVBhaXIoKTtcbiAgY29uc3Qgc2lnbmF0dXJlID0gY2FsY3VsYXRlU2lnbmF0dXJlKGlkZW50aXR5S2V5UGFpci5wcml2S2V5LCBrZXlQYWlyLnB1YktleSk7XG5cbiAgcmV0dXJuIHtcbiAgICBrZXlJZCxcbiAgICBrZXlQYWlyLFxuICAgIHNpZ25hdHVyZSxcbiAgfTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZVByZUtleShrZXlJZDogbnVtYmVyKTogQ29tcGF0UHJlS2V5VHlwZSB7XG4gIGlmICghaXNOb25OZWdhdGl2ZUludGVnZXIoa2V5SWQpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgZ2VuZXJhdGVQcmVLZXk6IEludmFsaWQgYXJndW1lbnQgZm9yIGtleUlkOiAke2tleUlkfWApO1xuICB9XG5cbiAgY29uc3Qga2V5UGFpciA9IGdlbmVyYXRlS2V5UGFpcigpO1xuXG4gIHJldHVybiB7XG4gICAga2V5SWQsXG4gICAga2V5UGFpcixcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlS2V5UGFpcigpOiBLZXlQYWlyVHlwZSB7XG4gIGNvbnN0IHByaXZLZXkgPSBjbGllbnQuUHJpdmF0ZUtleS5nZW5lcmF0ZSgpO1xuICBjb25zdCBwdWJLZXkgPSBwcml2S2V5LmdldFB1YmxpY0tleSgpO1xuXG4gIHJldHVybiB7XG4gICAgcHJpdktleTogcHJpdktleS5zZXJpYWxpemUoKSxcbiAgICBwdWJLZXk6IHB1YktleS5zZXJpYWxpemUoKSxcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUtleVBhaXIoaW5jb21pbmdLZXk6IFVpbnQ4QXJyYXkpOiBLZXlQYWlyVHlwZSB7XG4gIGNvbnN0IGNvcHkgPSBuZXcgVWludDhBcnJheShpbmNvbWluZ0tleSk7XG4gIGNsYW1wUHJpdmF0ZUtleShjb3B5KTtcbiAgaWYgKCFjb25zdGFudFRpbWVFcXVhbChjb3B5LCBpbmNvbWluZ0tleSkpIHtcbiAgICBsb2cud2FybignY3JlYXRlS2V5UGFpcjogaW5jb21pbmcgcHJpdmF0ZSBrZXkgd2FzIG5vdCBjbGFtcGVkIScpO1xuICB9XG5cbiAgY29uc3QgaW5jb21pbmdLZXlCdWZmZXIgPSBCdWZmZXIuZnJvbShpbmNvbWluZ0tleSk7XG5cbiAgaWYgKGluY29taW5nS2V5QnVmZmVyLmxlbmd0aCAhPT0gMzIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2tleSBtdXN0IGJlIDMyIGJ5dGVzIGxvbmcnKTtcbiAgfVxuXG4gIGNvbnN0IHByaXZLZXkgPSBjbGllbnQuUHJpdmF0ZUtleS5kZXNlcmlhbGl6ZShpbmNvbWluZ0tleUJ1ZmZlcik7XG4gIGNvbnN0IHB1YktleSA9IHByaXZLZXkuZ2V0UHVibGljS2V5KCk7XG5cbiAgcmV0dXJuIHtcbiAgICBwcml2S2V5OiBwcml2S2V5LnNlcmlhbGl6ZSgpLFxuICAgIHB1YktleTogcHViS2V5LnNlcmlhbGl6ZSgpLFxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcHJlZml4UHVibGljS2V5KHB1YktleTogVWludDhBcnJheSk6IFVpbnQ4QXJyYXkge1xuICByZXR1cm4gQnl0ZXMuY29uY2F0ZW5hdGUoW1xuICAgIG5ldyBVaW50OEFycmF5KFsweDA1XSksXG4gICAgdmFsaWRhdGVQdWJLZXlGb3JtYXQocHViS2V5KSxcbiAgXSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjYWxjdWxhdGVBZ3JlZW1lbnQoXG4gIHB1YktleTogVWludDhBcnJheSxcbiAgcHJpdktleTogVWludDhBcnJheVxuKTogVWludDhBcnJheSB7XG4gIGNvbnN0IHByaXZLZXlCdWZmZXIgPSBCdWZmZXIuZnJvbShwcml2S2V5KTtcblxuICBjb25zdCBwdWJLZXlPYmogPSBjbGllbnQuUHVibGljS2V5LmRlc2VyaWFsaXplKFxuICAgIEJ1ZmZlci5mcm9tKHByZWZpeFB1YmxpY0tleShwdWJLZXkpKVxuICApO1xuICBjb25zdCBwcml2S2V5T2JqID0gY2xpZW50LlByaXZhdGVLZXkuZGVzZXJpYWxpemUocHJpdktleUJ1ZmZlcik7XG4gIGNvbnN0IHNoYXJlZFNlY3JldCA9IHByaXZLZXlPYmouYWdyZWUocHViS2V5T2JqKTtcbiAgcmV0dXJuIHNoYXJlZFNlY3JldDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHZlcmlmeVNpZ25hdHVyZShcbiAgcHViS2V5OiBVaW50OEFycmF5LFxuICBtZXNzYWdlOiBVaW50OEFycmF5LFxuICBzaWduYXR1cmU6IFVpbnQ4QXJyYXlcbik6IGJvb2xlYW4ge1xuICBjb25zdCBwdWJLZXlCdWZmZXIgPSBCdWZmZXIuZnJvbShwdWJLZXkpO1xuICBjb25zdCBtZXNzYWdlQnVmZmVyID0gQnVmZmVyLmZyb20obWVzc2FnZSk7XG4gIGNvbnN0IHNpZ25hdHVyZUJ1ZmZlciA9IEJ1ZmZlci5mcm9tKHNpZ25hdHVyZSk7XG5cbiAgY29uc3QgcHViS2V5T2JqID0gY2xpZW50LlB1YmxpY0tleS5kZXNlcmlhbGl6ZShwdWJLZXlCdWZmZXIpO1xuICBjb25zdCByZXN1bHQgPSBwdWJLZXlPYmoudmVyaWZ5KG1lc3NhZ2VCdWZmZXIsIHNpZ25hdHVyZUJ1ZmZlcik7XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNhbGN1bGF0ZVNpZ25hdHVyZShcbiAgcHJpdktleTogVWludDhBcnJheSxcbiAgcGxhaW50ZXh0OiBVaW50OEFycmF5XG4pOiBVaW50OEFycmF5IHtcbiAgY29uc3QgcHJpdktleUJ1ZmZlciA9IEJ1ZmZlci5mcm9tKHByaXZLZXkpO1xuICBjb25zdCBwbGFpbnRleHRCdWZmZXIgPSBCdWZmZXIuZnJvbShwbGFpbnRleHQpO1xuXG4gIGNvbnN0IHByaXZLZXlPYmogPSBjbGllbnQuUHJpdmF0ZUtleS5kZXNlcmlhbGl6ZShwcml2S2V5QnVmZmVyKTtcbiAgY29uc3Qgc2lnbmF0dXJlID0gcHJpdktleU9iai5zaWduKHBsYWludGV4dEJ1ZmZlcik7XG4gIHJldHVybiBzaWduYXR1cmU7XG59XG5cbmZ1bmN0aW9uIHZhbGlkYXRlUHViS2V5Rm9ybWF0KHB1YktleTogVWludDhBcnJheSk6IFVpbnQ4QXJyYXkge1xuICBpZiAoXG4gICAgcHViS2V5ID09PSB1bmRlZmluZWQgfHxcbiAgICAoKHB1YktleS5ieXRlTGVuZ3RoICE9PSAzMyB8fCBwdWJLZXlbMF0gIT09IDUpICYmIHB1YktleS5ieXRlTGVuZ3RoICE9PSAzMilcbiAgKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHB1YmxpYyBrZXknKTtcbiAgfVxuICBpZiAocHViS2V5LmJ5dGVMZW5ndGggPT09IDMzKSB7XG4gICAgcmV0dXJuIHB1YktleS5zbGljZSgxKTtcbiAgfVxuXG4gIHJldHVybiBwdWJLZXk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRQdWJsaWNLZXlUeXBlQnl0ZShwdWJsaWNLZXk6IFVpbnQ4QXJyYXkpOiB2b2lkIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gIHB1YmxpY0tleVswXSA9IDU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjbGFtcFByaXZhdGVLZXkocHJpdmF0ZUtleTogVWludDhBcnJheSk6IHZvaWQge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYml0d2lzZSwgbm8tcGFyYW0tcmVhc3NpZ25cbiAgcHJpdmF0ZUtleVswXSAmPSAyNDg7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1iaXR3aXNlLCBuby1wYXJhbS1yZWFzc2lnblxuICBwcml2YXRlS2V5WzMxXSAmPSAxMjc7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1iaXR3aXNlLCBuby1wYXJhbS1yZWFzc2lnblxuICBwcml2YXRlS2V5WzMxXSB8PSA2NDtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLGFBQXdCO0FBRXhCLFlBQXVCO0FBQ3ZCLG9CQUFrQztBQU1sQyxVQUFxQjtBQUVkLDhCQUE4QixHQUF5QjtBQUM1RCxTQUFPLE9BQU8sTUFBTSxZQUFZLElBQUksTUFBTSxLQUFLLEtBQUs7QUFDdEQ7QUFGZ0IsQUFJVCw4QkFDTCxpQkFDQSxPQUN3QjtBQUN4QixNQUFJLENBQUMscUJBQXFCLEtBQUssR0FBRztBQUNoQyxVQUFNLElBQUksVUFDUixxREFBcUQsT0FDdkQ7QUFBQSxFQUNGO0FBRUEsTUFDRSxDQUFFLGlCQUFnQixtQkFBbUIsZUFDckMsZ0JBQWdCLFFBQVEsZUFBZSxNQUN2QyxDQUFFLGlCQUFnQixrQkFBa0IsZUFDcEMsZ0JBQWdCLE9BQU8sZUFBZSxJQUN0QztBQUNBLFVBQU0sSUFBSSxVQUNSLDREQUNGO0FBQUEsRUFDRjtBQUVBLFFBQU0sVUFBVSxnQkFBZ0I7QUFDaEMsUUFBTSxZQUFZLG1CQUFtQixnQkFBZ0IsU0FBUyxRQUFRLE1BQU07QUFFNUUsU0FBTztBQUFBLElBQ0w7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ0Y7QUFDRjtBQTdCZ0IsQUE4QlQsd0JBQXdCLE9BQWlDO0FBQzlELE1BQUksQ0FBQyxxQkFBcUIsS0FBSyxHQUFHO0FBQ2hDLFVBQU0sSUFBSSxVQUFVLCtDQUErQyxPQUFPO0FBQUEsRUFDNUU7QUFFQSxRQUFNLFVBQVUsZ0JBQWdCO0FBRWhDLFNBQU87QUFBQSxJ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
