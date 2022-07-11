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
var Crypto_exports = {};
__export(Crypto_exports, {
  CipherType: () => import_Crypto.CipherType,
  HashType: () => import_Crypto.HashType,
  PaddedLengths: () => PaddedLengths,
  bytesToUuid: () => bytesToUuid,
  computeHash: () => computeHash,
  constantTimeEqual: () => constantTimeEqual,
  decrypt: () => decrypt,
  decryptAes256CbcPkcsPadding: () => decryptAes256CbcPkcsPadding,
  decryptAesCtr: () => decryptAesCtr,
  decryptAesGcm: () => decryptAesGcm,
  decryptAttachment: () => decryptAttachment,
  decryptDeviceName: () => decryptDeviceName,
  decryptProfile: () => decryptProfile,
  decryptProfileName: () => decryptProfileName,
  decryptSymmetric: () => decryptSymmetric,
  deriveAccessKey: () => deriveAccessKey,
  deriveMasterKeyFromGroupV1: () => deriveMasterKeyFromGroupV1,
  deriveSecrets: () => deriveSecrets,
  deriveStickerPackKey: () => deriveStickerPackKey,
  deriveStorageItemKey: () => deriveStorageItemKey,
  deriveStorageManifestKey: () => deriveStorageManifestKey,
  encrypt: () => encrypt,
  encryptAes256CbcPkcsPadding: () => encryptAes256CbcPkcsPadding,
  encryptAesCtr: () => encryptAesCtr,
  encryptAesGcm: () => encryptAesGcm,
  encryptAttachment: () => encryptAttachment,
  encryptCdsDiscoveryRequest: () => encryptCdsDiscoveryRequest,
  encryptDeviceName: () => encryptDeviceName,
  encryptProfile: () => encryptProfile,
  encryptProfileItemWithPadding: () => encryptProfileItemWithPadding,
  encryptSymmetric: () => encryptSymmetric,
  generateRegistrationId: () => generateRegistrationId,
  getAccessKeyVerifier: () => getAccessKeyVerifier,
  getBytes: () => getBytes,
  getFirstBytes: () => getFirstBytes,
  getRandomBytes: () => getRandomBytes,
  getRandomValue: () => getRandomValue,
  getZeroes: () => getZeroes,
  hash: () => hash,
  highBitsToInt: () => highBitsToInt,
  hmacSha256: () => hmacSha256,
  intsToByteHighAndLow: () => intsToByteHighAndLow,
  sha256: () => sha256,
  sign: () => sign,
  splitUuids: () => splitUuids,
  trimForDisplay: () => trimForDisplay,
  uuidToBytes: () => uuidToBytes,
  verifyAccessKey: () => verifyAccessKey,
  verifyHmacSha256: () => verifyHmacSha256
});
module.exports = __toCommonJS(Crypto_exports);
var import_buffer = require("buffer");
var import_p_props = __toESM(require("p-props"));
var import_lodash = require("lodash");
var import_long = __toESM(require("long"));
var import_libsignal_client = require("@signalapp/libsignal-client");
var Bytes = __toESM(require("./Bytes"));
var import_Curve = require("./Curve");
var log = __toESM(require("./logging/log"));
var import_Crypto = require("./types/Crypto");
var import_errors = require("./types/errors");
var import_UUID = require("./types/UUID");
const PROFILE_IV_LENGTH = 12;
const PROFILE_KEY_LENGTH = 32;
const PaddedLengths = {
  Name: [53, 257],
  About: [128, 254, 512],
  AboutEmoji: [32],
  PaymentAddress: [554]
};
function generateRegistrationId() {
  const bytes = getRandomBytes(2);
  const id = new Uint16Array(bytes.buffer, bytes.byteOffset, bytes.byteLength / 2)[0];
  return id & 16383;
}
function deriveStickerPackKey(packKey) {
  const salt = getZeroes(32);
  const info = Bytes.fromString("Sticker Pack");
  const [part1, part2] = deriveSecrets(packKey, salt, info);
  return Bytes.concatenate([part1, part2]);
}
function deriveSecrets(input, salt, info) {
  const hkdf = import_libsignal_client.HKDF.new(3);
  const output = hkdf.deriveSecrets(3 * 32, import_buffer.Buffer.from(input), import_buffer.Buffer.from(info), import_buffer.Buffer.from(salt));
  return [output.slice(0, 32), output.slice(32, 64), output.slice(64, 96)];
}
function deriveMasterKeyFromGroupV1(groupV1Id) {
  const salt = getZeroes(32);
  const info = Bytes.fromString("GV2 Migration");
  const [part1] = deriveSecrets(groupV1Id, salt, info);
  return part1;
}
function computeHash(data) {
  return Bytes.toBase64(hash(import_Crypto.HashType.size512, data));
}
function encryptDeviceName(deviceName, identityPublic) {
  const plaintext = Bytes.fromString(deviceName);
  const ephemeralKeyPair = (0, import_Curve.generateKeyPair)();
  const masterSecret = (0, import_Curve.calculateAgreement)(identityPublic, ephemeralKeyPair.privKey);
  const key1 = hmacSha256(masterSecret, Bytes.fromString("auth"));
  const syntheticIv = getFirstBytes(hmacSha256(key1, plaintext), 16);
  const key2 = hmacSha256(masterSecret, Bytes.fromString("cipher"));
  const cipherKey = hmacSha256(key2, syntheticIv);
  const counter = getZeroes(16);
  const ciphertext = encryptAesCtr(cipherKey, plaintext, counter);
  return {
    ephemeralPublic: ephemeralKeyPair.pubKey,
    syntheticIv,
    ciphertext
  };
}
function decryptDeviceName({ ephemeralPublic, syntheticIv, ciphertext }, identityPrivate) {
  const masterSecret = (0, import_Curve.calculateAgreement)(ephemeralPublic, identityPrivate);
  const key2 = hmacSha256(masterSecret, Bytes.fromString("cipher"));
  const cipherKey = hmacSha256(key2, syntheticIv);
  const counter = getZeroes(16);
  const plaintext = decryptAesCtr(cipherKey, ciphertext, counter);
  const key1 = hmacSha256(masterSecret, Bytes.fromString("auth"));
  const ourSyntheticIv = getFirstBytes(hmacSha256(key1, plaintext), 16);
  if (!constantTimeEqual(ourSyntheticIv, syntheticIv)) {
    throw new Error("decryptDeviceName: synthetic IV did not match");
  }
  return Bytes.toString(plaintext);
}
function deriveStorageManifestKey(storageServiceKey, version = import_long.default.fromNumber(0)) {
  return hmacSha256(storageServiceKey, Bytes.fromString(`Manifest_${version}`));
}
function deriveStorageItemKey(storageServiceKey, itemID) {
  return hmacSha256(storageServiceKey, Bytes.fromString(`Item_${itemID}`));
}
function deriveAccessKey(profileKey) {
  const iv = getZeroes(12);
  const plaintext = getZeroes(16);
  const accessKey = encryptAesGcm(profileKey, iv, plaintext);
  return getFirstBytes(accessKey, 16);
}
function getAccessKeyVerifier(accessKey) {
  const plaintext = getZeroes(32);
  return hmacSha256(accessKey, plaintext);
}
function verifyAccessKey(accessKey, theirVerifier) {
  const ourVerifier = getAccessKeyVerifier(accessKey);
  if (constantTimeEqual(ourVerifier, theirVerifier)) {
    return true;
  }
  return false;
}
const IV_LENGTH = 16;
const MAC_LENGTH = 16;
const NONCE_LENGTH = 16;
function encryptSymmetric(key, plaintext) {
  const iv = getZeroes(IV_LENGTH);
  const nonce = getRandomBytes(NONCE_LENGTH);
  const cipherKey = hmacSha256(key, nonce);
  const macKey = hmacSha256(key, cipherKey);
  const ciphertext = encryptAes256CbcPkcsPadding(cipherKey, plaintext, iv);
  const mac = getFirstBytes(hmacSha256(macKey, ciphertext), MAC_LENGTH);
  return Bytes.concatenate([nonce, ciphertext, mac]);
}
function decryptSymmetric(key, data) {
  const iv = getZeroes(IV_LENGTH);
  const nonce = getFirstBytes(data, NONCE_LENGTH);
  const ciphertext = getBytes(data, NONCE_LENGTH, data.byteLength - NONCE_LENGTH - MAC_LENGTH);
  const theirMac = getBytes(data, data.byteLength - MAC_LENGTH, MAC_LENGTH);
  const cipherKey = hmacSha256(key, nonce);
  const macKey = hmacSha256(key, cipherKey);
  const ourMac = getFirstBytes(hmacSha256(macKey, ciphertext), MAC_LENGTH);
  if (!constantTimeEqual(theirMac, ourMac)) {
    throw new Error("decryptSymmetric: Failed to decrypt; MAC verification failed");
  }
  return decryptAes256CbcPkcsPadding(cipherKey, ciphertext, iv);
}
function hmacSha256(key, plaintext) {
  return sign(key, plaintext);
}
function verifyHmacSha256(plaintext, key, theirMac, length) {
  const ourMac = hmacSha256(key, plaintext);
  if (theirMac.byteLength !== length || ourMac.byteLength < length) {
    throw new Error("Bad MAC length");
  }
  let result = 0;
  for (let i = 0; i < theirMac.byteLength; i += 1) {
    result |= ourMac[i] ^ theirMac[i];
  }
  if (result !== 0) {
    throw new Error("Bad MAC");
  }
}
function encryptAes256CbcPkcsPadding(key, plaintext, iv) {
  return encrypt(import_Crypto.CipherType.AES256CBC, {
    key,
    plaintext,
    iv
  });
}
function decryptAes256CbcPkcsPadding(key, ciphertext, iv) {
  return decrypt(import_Crypto.CipherType.AES256CBC, {
    key,
    ciphertext,
    iv
  });
}
function encryptAesCtr(key, plaintext, counter) {
  return encrypt(import_Crypto.CipherType.AES256CTR, {
    key,
    plaintext,
    iv: counter
  });
}
function decryptAesCtr(key, ciphertext, counter) {
  return decrypt(import_Crypto.CipherType.AES256CTR, {
    key,
    ciphertext,
    iv: counter
  });
}
function encryptAesGcm(key, iv, plaintext, aad) {
  return encrypt(import_Crypto.CipherType.AES256GCM, {
    key,
    plaintext,
    iv,
    aad
  });
}
function decryptAesGcm(key, iv, ciphertext) {
  return decrypt(import_Crypto.CipherType.AES256GCM, {
    key,
    ciphertext,
    iv
  });
}
function sha256(data) {
  return hash(import_Crypto.HashType.size256, data);
}
function getRandomValue(low, high) {
  const diff = high - low;
  const bytes = getRandomBytes(1);
  const mod = diff + 1;
  return bytes[0] % mod + low;
}
function getZeroes(n) {
  return new Uint8Array(n);
}
function highBitsToInt(byte) {
  return (byte & 255) >> 4;
}
function intsToByteHighAndLow(highValue, lowValue) {
  return (highValue << 4 | lowValue) & 255;
}
function getFirstBytes(data, n) {
  return data.subarray(0, n);
}
function getBytes(data, start, n) {
  return data.subarray(start, start + n);
}
function _getMacAndData(ciphertext) {
  const dataLength = ciphertext.byteLength - MAC_LENGTH;
  const data = getBytes(ciphertext, 0, dataLength);
  const mac = getBytes(ciphertext, dataLength, MAC_LENGTH);
  return { data, mac };
}
async function encryptCdsDiscoveryRequest(attestations, phoneNumbers) {
  const nonce = getRandomBytes(32);
  const numbersArray = import_buffer.Buffer.concat(phoneNumbers.map((number) => {
    return new Uint8Array(import_long.default.fromString(number).toBytesBE());
  }));
  const queryDataPlaintext = Bytes.concatenate([nonce, numbersArray]);
  const queryDataKey = getRandomBytes(32);
  const commitment = sha256(queryDataPlaintext);
  const iv = getRandomBytes(12);
  const queryDataCiphertext = encryptAesGcm(queryDataKey, iv, queryDataPlaintext);
  const { data: queryDataCiphertextData, mac: queryDataCiphertextMac } = _getMacAndData(queryDataCiphertext);
  const envelopes = await (0, import_p_props.default)(attestations, async ({ clientKey, requestId }) => {
    const envelopeIv = getRandomBytes(12);
    const ciphertext = encryptAesGcm(clientKey, envelopeIv, queryDataKey, requestId);
    const { data, mac } = _getMacAndData(ciphertext);
    return {
      requestId: Bytes.toBase64(requestId),
      data: Bytes.toBase64(data),
      iv: Bytes.toBase64(envelopeIv),
      mac: Bytes.toBase64(mac)
    };
  });
  return {
    addressCount: phoneNumbers.length,
    commitment: Bytes.toBase64(commitment),
    data: Bytes.toBase64(queryDataCiphertextData),
    iv: Bytes.toBase64(iv),
    mac: Bytes.toBase64(queryDataCiphertextMac),
    envelopes
  };
}
function uuidToBytes(uuid) {
  if (uuid.length !== 36) {
    log.warn("uuidToBytes: received a string of invalid length. Returning an empty Uint8Array");
    return new Uint8Array(0);
  }
  return Uint8Array.from((0, import_lodash.chunk)(uuid.replace(/-/g, ""), 2).map((pair) => parseInt(pair.join(""), 16)));
}
function bytesToUuid(bytes) {
  if (bytes.byteLength !== import_UUID.UUID_BYTE_SIZE) {
    log.warn("bytesToUuid: received an Uint8Array of invalid length. Returning undefined");
    return void 0;
  }
  const uuids = splitUuids(bytes);
  if (uuids.length === 1) {
    return uuids[0] || void 0;
  }
  return void 0;
}
function splitUuids(buffer) {
  const uuids = new Array();
  for (let i = 0; i < buffer.byteLength; i += import_UUID.UUID_BYTE_SIZE) {
    const bytes = getBytes(buffer, i, import_UUID.UUID_BYTE_SIZE);
    const hex = Bytes.toHex(bytes);
    const chunks = [
      hex.substring(0, 8),
      hex.substring(8, 12),
      hex.substring(12, 16),
      hex.substring(16, 20),
      hex.substring(20)
    ];
    const uuid = chunks.join("-");
    if (uuid !== "00000000-0000-0000-0000-000000000000") {
      uuids.push(import_UUID.UUID.cast(uuid));
    } else {
      uuids.push(null);
    }
  }
  return uuids;
}
function trimForDisplay(padded) {
  let paddingEnd = 0;
  for (paddingEnd; paddingEnd < padded.length; paddingEnd += 1) {
    if (padded[paddingEnd] === 0) {
      break;
    }
  }
  return padded.slice(0, paddingEnd);
}
function verifyDigest(data, theirDigest) {
  const ourDigest = sha256(data);
  let result = 0;
  for (let i = 0; i < theirDigest.byteLength; i += 1) {
    result |= ourDigest[i] ^ theirDigest[i];
  }
  if (result !== 0) {
    throw new Error("Bad digest");
  }
}
function decryptAttachment(encryptedBin, keys, theirDigest) {
  if (keys.byteLength !== 64) {
    throw new Error("Got invalid length attachment keys");
  }
  if (encryptedBin.byteLength < 16 + 32) {
    throw new Error("Got invalid length attachment");
  }
  const aesKey = keys.slice(0, 32);
  const macKey = keys.slice(32, 64);
  const iv = encryptedBin.slice(0, 16);
  const ciphertext = encryptedBin.slice(16, encryptedBin.byteLength - 32);
  const ivAndCiphertext = encryptedBin.slice(0, encryptedBin.byteLength - 32);
  const mac = encryptedBin.slice(encryptedBin.byteLength - 32, encryptedBin.byteLength);
  verifyHmacSha256(ivAndCiphertext, macKey, mac, 32);
  if (theirDigest) {
    verifyDigest(encryptedBin, theirDigest);
  }
  return decryptAes256CbcPkcsPadding(aesKey, ciphertext, iv);
}
function encryptAttachment(plaintext, keys, iv) {
  if (!(plaintext instanceof Uint8Array)) {
    throw new TypeError(`\`plaintext\` must be an \`Uint8Array\`; got: ${typeof plaintext}`);
  }
  if (keys.byteLength !== 64) {
    throw new Error("Got invalid length attachment keys");
  }
  if (iv.byteLength !== 16) {
    throw new Error("Got invalid length attachment iv");
  }
  const aesKey = keys.slice(0, 32);
  const macKey = keys.slice(32, 64);
  const ciphertext = encryptAes256CbcPkcsPadding(aesKey, plaintext, iv);
  const ivAndCiphertext = Bytes.concatenate([iv, ciphertext]);
  const mac = hmacSha256(macKey, ivAndCiphertext);
  const encryptedBin = Bytes.concatenate([ivAndCiphertext, mac]);
  const digest = sha256(encryptedBin);
  return {
    ciphertext: encryptedBin,
    digest
  };
}
function encryptProfile(data, key) {
  const iv = getRandomBytes(PROFILE_IV_LENGTH);
  if (key.byteLength !== PROFILE_KEY_LENGTH) {
    throw new Error("Got invalid length profile key");
  }
  if (iv.byteLength !== PROFILE_IV_LENGTH) {
    throw new Error("Got invalid length profile iv");
  }
  const ciphertext = encryptAesGcm(key, iv, data);
  return Bytes.concatenate([iv, ciphertext]);
}
function decryptProfile(data, key) {
  if (data.byteLength < 12 + 16 + 1) {
    throw new Error(`Got too short input: ${data.byteLength}`);
  }
  const iv = data.slice(0, PROFILE_IV_LENGTH);
  const ciphertext = data.slice(PROFILE_IV_LENGTH, data.byteLength);
  if (key.byteLength !== PROFILE_KEY_LENGTH) {
    throw new Error("Got invalid length profile key");
  }
  if (iv.byteLength !== PROFILE_IV_LENGTH) {
    throw new Error("Got invalid length profile iv");
  }
  try {
    return decryptAesGcm(key, iv, ciphertext);
  } catch (_) {
    throw new import_errors.ProfileDecryptError("Failed to decrypt profile data. Most likely the profile key has changed.");
  }
}
function encryptProfileItemWithPadding(item, profileKey, paddedLengths) {
  const paddedLength = paddedLengths.find((length) => item.byteLength <= length);
  if (!paddedLength) {
    throw new Error("Oversized value");
  }
  const padded = new Uint8Array(paddedLength);
  padded.set(new Uint8Array(item));
  return encryptProfile(padded, profileKey);
}
function decryptProfileName(encryptedProfileName, key) {
  const data = Bytes.fromBase64(encryptedProfileName);
  const padded = decryptProfile(data, key);
  let givenEnd;
  for (givenEnd = 0; givenEnd < padded.length; givenEnd += 1) {
    if (padded[givenEnd] === 0) {
      break;
    }
  }
  let familyEnd;
  for (familyEnd = givenEnd + 1; familyEnd < padded.length; familyEnd += 1) {
    if (padded[familyEnd] === 0) {
      break;
    }
  }
  const foundFamilyName = familyEnd > givenEnd + 1;
  return {
    given: padded.slice(0, givenEnd),
    family: foundFamilyName ? padded.slice(givenEnd + 1, familyEnd) : null
  };
}
const { crypto } = window.SignalContext;
function sign(key, data) {
  return crypto.sign(key, data);
}
function hash(type, data) {
  return crypto.hash(type, data);
}
function encrypt(...args) {
  return crypto.encrypt(...args);
}
function decrypt(...args) {
  return crypto.decrypt(...args);
}
function getRandomBytes(size) {
  return crypto.getRandomBytes(size);
}
function constantTimeEqual(left, right) {
  return crypto.constantTimeEqual(left, right);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CipherType,
  HashType,
  PaddedLengths,
  bytesToUuid,
  computeHash,
  constantTimeEqual,
  decrypt,
  decryptAes256CbcPkcsPadding,
  decryptAesCtr,
  decryptAesGcm,
  decryptAttachment,
  decryptDeviceName,
  decryptProfile,
  decryptProfileName,
  decryptSymmetric,
  deriveAccessKey,
  deriveMasterKeyFromGroupV1,
  deriveSecrets,
  deriveStickerPackKey,
  deriveStorageItemKey,
  deriveStorageManifestKey,
  encrypt,
  encryptAes256CbcPkcsPadding,
  encryptAesCtr,
  encryptAesGcm,
  encryptAttachment,
  encryptCdsDiscoveryRequest,
  encryptDeviceName,
  encryptProfile,
  encryptProfileItemWithPadding,
  encryptSymmetric,
  generateRegistrationId,
  getAccessKeyVerifier,
  getBytes,
  getFirstBytes,
  getRandomBytes,
  getRandomValue,
  getZeroes,
  hash,
  highBitsToInt,
  hmacSha256,
  intsToByteHighAndLow,
  sha256,
  sign,
  splitUuids,
  trimForDisplay,
  uuidToBytes,
  verifyAccessKey,
  verifyHmacSha256
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ3J5cHRvLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMC0yMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgQnVmZmVyIH0gZnJvbSAnYnVmZmVyJztcbmltcG9ydCBwUHJvcHMgZnJvbSAncC1wcm9wcyc7XG5pbXBvcnQgeyBjaHVuayB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgTG9uZyBmcm9tICdsb25nJztcbmltcG9ydCB7IEhLREYgfSBmcm9tICdAc2lnbmFsYXBwL2xpYnNpZ25hbC1jbGllbnQnO1xuXG5pbXBvcnQgKiBhcyBCeXRlcyBmcm9tICcuL0J5dGVzJztcbmltcG9ydCB7IGNhbGN1bGF0ZUFncmVlbWVudCwgZ2VuZXJhdGVLZXlQYWlyIH0gZnJvbSAnLi9DdXJ2ZSc7XG5pbXBvcnQgKiBhcyBsb2cgZnJvbSAnLi9sb2dnaW5nL2xvZyc7XG5pbXBvcnQgeyBIYXNoVHlwZSwgQ2lwaGVyVHlwZSB9IGZyb20gJy4vdHlwZXMvQ3J5cHRvJztcbmltcG9ydCB7IFByb2ZpbGVEZWNyeXB0RXJyb3IgfSBmcm9tICcuL3R5cGVzL2Vycm9ycyc7XG5pbXBvcnQgeyBVVUlELCBVVUlEX0JZVEVfU0laRSB9IGZyb20gJy4vdHlwZXMvVVVJRCc7XG5pbXBvcnQgdHlwZSB7IFVVSURTdHJpbmdUeXBlIH0gZnJvbSAnLi90eXBlcy9VVUlEJztcblxuZXhwb3J0IHsgSGFzaFR5cGUsIENpcGhlclR5cGUgfTtcblxuY29uc3QgUFJPRklMRV9JVl9MRU5HVEggPSAxMjsgLy8gYnl0ZXNcbmNvbnN0IFBST0ZJTEVfS0VZX0xFTkdUSCA9IDMyOyAvLyBieXRlc1xuXG4vLyBieXRlc1xuZXhwb3J0IGNvbnN0IFBhZGRlZExlbmd0aHMgPSB7XG4gIE5hbWU6IFs1MywgMjU3XSxcbiAgQWJvdXQ6IFsxMjgsIDI1NCwgNTEyXSxcbiAgQWJvdXRFbW9qaTogWzMyXSxcbiAgUGF5bWVudEFkZHJlc3M6IFs1NTRdLFxufTtcblxuZXhwb3J0IHR5cGUgRW5jcnlwdGVkQXR0YWNobWVudCA9IHtcbiAgY2lwaGVydGV4dDogVWludDhBcnJheTtcbiAgZGlnZXN0OiBVaW50OEFycmF5O1xufTtcblxuLy8gR2VuZXJhdGUgYSBudW1iZXIgYmV0d2VlbiB6ZXJvIGFuZCAxNjM4M1xuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlUmVnaXN0cmF0aW9uSWQoKTogbnVtYmVyIHtcbiAgY29uc3QgYnl0ZXMgPSBnZXRSYW5kb21CeXRlcygyKTtcbiAgY29uc3QgaWQgPSBuZXcgVWludDE2QXJyYXkoXG4gICAgYnl0ZXMuYnVmZmVyLFxuICAgIGJ5dGVzLmJ5dGVPZmZzZXQsXG4gICAgYnl0ZXMuYnl0ZUxlbmd0aCAvIDJcbiAgKVswXTtcblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYml0d2lzZVxuICByZXR1cm4gaWQgJiAweDNmZmY7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZXJpdmVTdGlja2VyUGFja0tleShwYWNrS2V5OiBVaW50OEFycmF5KTogVWludDhBcnJheSB7XG4gIGNvbnN0IHNhbHQgPSBnZXRaZXJvZXMoMzIpO1xuICBjb25zdCBpbmZvID0gQnl0ZXMuZnJvbVN0cmluZygnU3RpY2tlciBQYWNrJyk7XG5cbiAgY29uc3QgW3BhcnQxLCBwYXJ0Ml0gPSBkZXJpdmVTZWNyZXRzKHBhY2tLZXksIHNhbHQsIGluZm8pO1xuXG4gIHJldHVybiBCeXRlcy5jb25jYXRlbmF0ZShbcGFydDEsIHBhcnQyXSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZXJpdmVTZWNyZXRzKFxuICBpbnB1dDogVWludDhBcnJheSxcbiAgc2FsdDogVWludDhBcnJheSxcbiAgaW5mbzogVWludDhBcnJheVxuKTogW1VpbnQ4QXJyYXksIFVpbnQ4QXJyYXksIFVpbnQ4QXJyYXldIHtcbiAgY29uc3QgaGtkZiA9IEhLREYubmV3KDMpO1xuICBjb25zdCBvdXRwdXQgPSBoa2RmLmRlcml2ZVNlY3JldHMoXG4gICAgMyAqIDMyLFxuICAgIEJ1ZmZlci5mcm9tKGlucHV0KSxcbiAgICBCdWZmZXIuZnJvbShpbmZvKSxcbiAgICBCdWZmZXIuZnJvbShzYWx0KVxuICApO1xuICByZXR1cm4gW291dHB1dC5zbGljZSgwLCAzMiksIG91dHB1dC5zbGljZSgzMiwgNjQpLCBvdXRwdXQuc2xpY2UoNjQsIDk2KV07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZXJpdmVNYXN0ZXJLZXlGcm9tR3JvdXBWMShncm91cFYxSWQ6IFVpbnQ4QXJyYXkpOiBVaW50OEFycmF5IHtcbiAgY29uc3Qgc2FsdCA9IGdldFplcm9lcygzMik7XG4gIGNvbnN0IGluZm8gPSBCeXRlcy5mcm9tU3RyaW5nKCdHVjIgTWlncmF0aW9uJyk7XG5cbiAgY29uc3QgW3BhcnQxXSA9IGRlcml2ZVNlY3JldHMoZ3JvdXBWMUlkLCBzYWx0LCBpbmZvKTtcblxuICByZXR1cm4gcGFydDE7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb21wdXRlSGFzaChkYXRhOiBVaW50OEFycmF5KTogc3RyaW5nIHtcbiAgcmV0dXJuIEJ5dGVzLnRvQmFzZTY0KGhhc2goSGFzaFR5cGUuc2l6ZTUxMiwgZGF0YSkpO1xufVxuXG4vLyBIaWdoLWxldmVsIE9wZXJhdGlvbnNcblxuZXhwb3J0IHR5cGUgRW5jcnlwdGVkRGV2aWNlTmFtZSA9IHtcbiAgZXBoZW1lcmFsUHVibGljOiBVaW50OEFycmF5O1xuICBzeW50aGV0aWNJdjogVWludDhBcnJheTtcbiAgY2lwaGVydGV4dDogVWludDhBcnJheTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBlbmNyeXB0RGV2aWNlTmFtZShcbiAgZGV2aWNlTmFtZTogc3RyaW5nLFxuICBpZGVudGl0eVB1YmxpYzogVWludDhBcnJheVxuKTogRW5jcnlwdGVkRGV2aWNlTmFtZSB7XG4gIGNvbnN0IHBsYWludGV4dCA9IEJ5dGVzLmZyb21TdHJpbmcoZGV2aWNlTmFtZSk7XG4gIGNvbnN0IGVwaGVtZXJhbEtleVBhaXIgPSBnZW5lcmF0ZUtleVBhaXIoKTtcbiAgY29uc3QgbWFzdGVyU2VjcmV0ID0gY2FsY3VsYXRlQWdyZWVtZW50KFxuICAgIGlkZW50aXR5UHVibGljLFxuICAgIGVwaGVtZXJhbEtleVBhaXIucHJpdktleVxuICApO1xuXG4gIGNvbnN0IGtleTEgPSBobWFjU2hhMjU2KG1hc3RlclNlY3JldCwgQnl0ZXMuZnJvbVN0cmluZygnYXV0aCcpKTtcbiAgY29uc3Qgc3ludGhldGljSXYgPSBnZXRGaXJzdEJ5dGVzKGhtYWNTaGEyNTYoa2V5MSwgcGxhaW50ZXh0KSwgMTYpO1xuXG4gIGNvbnN0IGtleTIgPSBobWFjU2hhMjU2KG1hc3RlclNlY3JldCwgQnl0ZXMuZnJvbVN0cmluZygnY2lwaGVyJykpO1xuICBjb25zdCBjaXBoZXJLZXkgPSBobWFjU2hhMjU2KGtleTIsIHN5bnRoZXRpY0l2KTtcblxuICBjb25zdCBjb3VudGVyID0gZ2V0WmVyb2VzKDE2KTtcbiAgY29uc3QgY2lwaGVydGV4dCA9IGVuY3J5cHRBZXNDdHIoY2lwaGVyS2V5LCBwbGFpbnRleHQsIGNvdW50ZXIpO1xuXG4gIHJldHVybiB7XG4gICAgZXBoZW1lcmFsUHVibGljOiBlcGhlbWVyYWxLZXlQYWlyLnB1YktleSxcbiAgICBzeW50aGV0aWNJdixcbiAgICBjaXBoZXJ0ZXh0LFxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVjcnlwdERldmljZU5hbWUoXG4gIHsgZXBoZW1lcmFsUHVibGljLCBzeW50aGV0aWNJdiwgY2lwaGVydGV4dCB9OiBFbmNyeXB0ZWREZXZpY2VOYW1lLFxuICBpZGVudGl0eVByaXZhdGU6IFVpbnQ4QXJyYXlcbik6IHN0cmluZyB7XG4gIGNvbnN0IG1hc3RlclNlY3JldCA9IGNhbGN1bGF0ZUFncmVlbWVudChlcGhlbWVyYWxQdWJsaWMsIGlkZW50aXR5UHJpdmF0ZSk7XG5cbiAgY29uc3Qga2V5MiA9IGhtYWNTaGEyNTYobWFzdGVyU2VjcmV0LCBCeXRlcy5mcm9tU3RyaW5nKCdjaXBoZXInKSk7XG4gIGNvbnN0IGNpcGhlcktleSA9IGhtYWNTaGEyNTYoa2V5Miwgc3ludGhldGljSXYpO1xuXG4gIGNvbnN0IGNvdW50ZXIgPSBnZXRaZXJvZXMoMTYpO1xuICBjb25zdCBwbGFpbnRleHQgPSBkZWNyeXB0QWVzQ3RyKGNpcGhlcktleSwgY2lwaGVydGV4dCwgY291bnRlcik7XG5cbiAgY29uc3Qga2V5MSA9IGhtYWNTaGEyNTYobWFzdGVyU2VjcmV0LCBCeXRlcy5mcm9tU3RyaW5nKCdhdXRoJykpO1xuICBjb25zdCBvdXJTeW50aGV0aWNJdiA9IGdldEZpcnN0Qnl0ZXMoaG1hY1NoYTI1NihrZXkxLCBwbGFpbnRleHQpLCAxNik7XG5cbiAgaWYgKCFjb25zdGFudFRpbWVFcXVhbChvdXJTeW50aGV0aWNJdiwgc3ludGhldGljSXYpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdkZWNyeXB0RGV2aWNlTmFtZTogc3ludGhldGljIElWIGRpZCBub3QgbWF0Y2gnKTtcbiAgfVxuXG4gIHJldHVybiBCeXRlcy50b1N0cmluZyhwbGFpbnRleHQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVyaXZlU3RvcmFnZU1hbmlmZXN0S2V5KFxuICBzdG9yYWdlU2VydmljZUtleTogVWludDhBcnJheSxcbiAgdmVyc2lvbjogTG9uZyA9IExvbmcuZnJvbU51bWJlcigwKVxuKTogVWludDhBcnJheSB7XG4gIHJldHVybiBobWFjU2hhMjU2KHN0b3JhZ2VTZXJ2aWNlS2V5LCBCeXRlcy5mcm9tU3RyaW5nKGBNYW5pZmVzdF8ke3ZlcnNpb259YCkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVyaXZlU3RvcmFnZUl0ZW1LZXkoXG4gIHN0b3JhZ2VTZXJ2aWNlS2V5OiBVaW50OEFycmF5LFxuICBpdGVtSUQ6IHN0cmluZ1xuKTogVWludDhBcnJheSB7XG4gIHJldHVybiBobWFjU2hhMjU2KHN0b3JhZ2VTZXJ2aWNlS2V5LCBCeXRlcy5mcm9tU3RyaW5nKGBJdGVtXyR7aXRlbUlEfWApKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlcml2ZUFjY2Vzc0tleShwcm9maWxlS2V5OiBVaW50OEFycmF5KTogVWludDhBcnJheSB7XG4gIGNvbnN0IGl2ID0gZ2V0WmVyb2VzKDEyKTtcbiAgY29uc3QgcGxhaW50ZXh0ID0gZ2V0WmVyb2VzKDE2KTtcbiAgY29uc3QgYWNjZXNzS2V5ID0gZW5jcnlwdEFlc0djbShwcm9maWxlS2V5LCBpdiwgcGxhaW50ZXh0KTtcblxuICByZXR1cm4gZ2V0Rmlyc3RCeXRlcyhhY2Nlc3NLZXksIDE2KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEFjY2Vzc0tleVZlcmlmaWVyKGFjY2Vzc0tleTogVWludDhBcnJheSk6IFVpbnQ4QXJyYXkge1xuICBjb25zdCBwbGFpbnRleHQgPSBnZXRaZXJvZXMoMzIpO1xuXG4gIHJldHVybiBobWFjU2hhMjU2KGFjY2Vzc0tleSwgcGxhaW50ZXh0KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHZlcmlmeUFjY2Vzc0tleShcbiAgYWNjZXNzS2V5OiBVaW50OEFycmF5LFxuICB0aGVpclZlcmlmaWVyOiBVaW50OEFycmF5XG4pOiBib29sZWFuIHtcbiAgY29uc3Qgb3VyVmVyaWZpZXIgPSBnZXRBY2Nlc3NLZXlWZXJpZmllcihhY2Nlc3NLZXkpO1xuXG4gIGlmIChjb25zdGFudFRpbWVFcXVhbChvdXJWZXJpZmllciwgdGhlaXJWZXJpZmllcikpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcbn1cblxuY29uc3QgSVZfTEVOR1RIID0gMTY7XG5jb25zdCBNQUNfTEVOR1RIID0gMTY7XG5jb25zdCBOT05DRV9MRU5HVEggPSAxNjtcblxuZXhwb3J0IGZ1bmN0aW9uIGVuY3J5cHRTeW1tZXRyaWMoXG4gIGtleTogVWludDhBcnJheSxcbiAgcGxhaW50ZXh0OiBVaW50OEFycmF5XG4pOiBVaW50OEFycmF5IHtcbiAgY29uc3QgaXYgPSBnZXRaZXJvZXMoSVZfTEVOR1RIKTtcbiAgY29uc3Qgbm9uY2UgPSBnZXRSYW5kb21CeXRlcyhOT05DRV9MRU5HVEgpO1xuXG4gIGNvbnN0IGNpcGhlcktleSA9IGhtYWNTaGEyNTYoa2V5LCBub25jZSk7XG4gIGNvbnN0IG1hY0tleSA9IGhtYWNTaGEyNTYoa2V5LCBjaXBoZXJLZXkpO1xuXG4gIGNvbnN0IGNpcGhlcnRleHQgPSBlbmNyeXB0QWVzMjU2Q2JjUGtjc1BhZGRpbmcoY2lwaGVyS2V5LCBwbGFpbnRleHQsIGl2KTtcbiAgY29uc3QgbWFjID0gZ2V0Rmlyc3RCeXRlcyhobWFjU2hhMjU2KG1hY0tleSwgY2lwaGVydGV4dCksIE1BQ19MRU5HVEgpO1xuXG4gIHJldHVybiBCeXRlcy5jb25jYXRlbmF0ZShbbm9uY2UsIGNpcGhlcnRleHQsIG1hY10pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVjcnlwdFN5bW1ldHJpYyhcbiAga2V5OiBVaW50OEFycmF5LFxuICBkYXRhOiBVaW50OEFycmF5XG4pOiBVaW50OEFycmF5IHtcbiAgY29uc3QgaXYgPSBnZXRaZXJvZXMoSVZfTEVOR1RIKTtcblxuICBjb25zdCBub25jZSA9IGdldEZpcnN0Qnl0ZXMoZGF0YSwgTk9OQ0VfTEVOR1RIKTtcbiAgY29uc3QgY2lwaGVydGV4dCA9IGdldEJ5dGVzKFxuICAgIGRhdGEsXG4gICAgTk9OQ0VfTEVOR1RILFxuICAgIGRhdGEuYnl0ZUxlbmd0aCAtIE5PTkNFX0xFTkdUSCAtIE1BQ19MRU5HVEhcbiAgKTtcbiAgY29uc3QgdGhlaXJNYWMgPSBnZXRCeXRlcyhkYXRhLCBkYXRhLmJ5dGVMZW5ndGggLSBNQUNfTEVOR1RILCBNQUNfTEVOR1RIKTtcblxuICBjb25zdCBjaXBoZXJLZXkgPSBobWFjU2hhMjU2KGtleSwgbm9uY2UpO1xuICBjb25zdCBtYWNLZXkgPSBobWFjU2hhMjU2KGtleSwgY2lwaGVyS2V5KTtcblxuICBjb25zdCBvdXJNYWMgPSBnZXRGaXJzdEJ5dGVzKGhtYWNTaGEyNTYobWFjS2V5LCBjaXBoZXJ0ZXh0KSwgTUFDX0xFTkdUSCk7XG4gIGlmICghY29uc3RhbnRUaW1lRXF1YWwodGhlaXJNYWMsIG91ck1hYykpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAnZGVjcnlwdFN5bW1ldHJpYzogRmFpbGVkIHRvIGRlY3J5cHQ7IE1BQyB2ZXJpZmljYXRpb24gZmFpbGVkJ1xuICAgICk7XG4gIH1cblxuICByZXR1cm4gZGVjcnlwdEFlczI1NkNiY1BrY3NQYWRkaW5nKGNpcGhlcktleSwgY2lwaGVydGV4dCwgaXYpO1xufVxuXG4vLyBFbmNyeXB0aW9uXG5cbmV4cG9ydCBmdW5jdGlvbiBobWFjU2hhMjU2KGtleTogVWludDhBcnJheSwgcGxhaW50ZXh0OiBVaW50OEFycmF5KTogVWludDhBcnJheSB7XG4gIHJldHVybiBzaWduKGtleSwgcGxhaW50ZXh0KTtcbn1cblxuLy8gV2UgdXNlIHBhcnQgb2YgdGhlIGNvbnN0YW50VGltZUVxdWFsIGFsZ29yaXRobSBmcm9tIGJlbG93IGhlcmUsIGJ1dCB3ZSBhbGxvdyBvdXJNYWNcbi8vICAgdG8gYmUgbG9uZ2VyIHRoYW4gdGhlIHBhc3NlZC1pbiBsZW5ndGguIFRoaXMgYWxsb3dzIGVhc3kgY29tcGFyaXNvbnMgYWdhaW5zdFxuLy8gICBhcmJpdHJhcnkgTUFDIGxlbmd0aHMuXG5leHBvcnQgZnVuY3Rpb24gdmVyaWZ5SG1hY1NoYTI1NihcbiAgcGxhaW50ZXh0OiBVaW50OEFycmF5LFxuICBrZXk6IFVpbnQ4QXJyYXksXG4gIHRoZWlyTWFjOiBVaW50OEFycmF5LFxuICBsZW5ndGg6IG51bWJlclxuKTogdm9pZCB7XG4gIGNvbnN0IG91ck1hYyA9IGhtYWNTaGEyNTYoa2V5LCBwbGFpbnRleHQpO1xuXG4gIGlmICh0aGVpck1hYy5ieXRlTGVuZ3RoICE9PSBsZW5ndGggfHwgb3VyTWFjLmJ5dGVMZW5ndGggPCBsZW5ndGgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0JhZCBNQUMgbGVuZ3RoJyk7XG4gIH1cbiAgbGV0IHJlc3VsdCA9IDA7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGVpck1hYy5ieXRlTGVuZ3RoOyBpICs9IDEpIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYml0d2lzZVxuICAgIHJlc3VsdCB8PSBvdXJNYWNbaV0gXiB0aGVpck1hY1tpXTtcbiAgfVxuICBpZiAocmVzdWx0ICE9PSAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdCYWQgTUFDJyk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVuY3J5cHRBZXMyNTZDYmNQa2NzUGFkZGluZyhcbiAga2V5OiBVaW50OEFycmF5LFxuICBwbGFpbnRleHQ6IFVpbnQ4QXJyYXksXG4gIGl2OiBVaW50OEFycmF5XG4pOiBVaW50OEFycmF5IHtcbiAgcmV0dXJuIGVuY3J5cHQoQ2lwaGVyVHlwZS5BRVMyNTZDQkMsIHtcbiAgICBrZXksXG4gICAgcGxhaW50ZXh0LFxuICAgIGl2LFxuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlY3J5cHRBZXMyNTZDYmNQa2NzUGFkZGluZyhcbiAga2V5OiBVaW50OEFycmF5LFxuICBjaXBoZXJ0ZXh0OiBVaW50OEFycmF5LFxuICBpdjogVWludDhBcnJheVxuKTogVWludDhBcnJheSB7XG4gIHJldHVybiBkZWNyeXB0KENpcGhlclR5cGUuQUVTMjU2Q0JDLCB7XG4gICAga2V5LFxuICAgIGNpcGhlcnRleHQsXG4gICAgaXYsXG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZW5jcnlwdEFlc0N0cihcbiAga2V5OiBVaW50OEFycmF5LFxuICBwbGFpbnRleHQ6IFVpbnQ4QXJyYXksXG4gIGNvdW50ZXI6IFVpbnQ4QXJyYXlcbik6IFVpbnQ4QXJyYXkge1xuICByZXR1cm4gZW5jcnlwdChDaXBoZXJUeXBlLkFFUzI1NkNUUiwge1xuICAgIGtleSxcbiAgICBwbGFpbnRleHQsXG4gICAgaXY6IGNvdW50ZXIsXG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVjcnlwdEFlc0N0cihcbiAga2V5OiBVaW50OEFycmF5LFxuICBjaXBoZXJ0ZXh0OiBVaW50OEFycmF5LFxuICBjb3VudGVyOiBVaW50OEFycmF5XG4pOiBVaW50OEFycmF5IHtcbiAgcmV0dXJuIGRlY3J5cHQoQ2lwaGVyVHlwZS5BRVMyNTZDVFIsIHtcbiAgICBrZXksXG4gICAgY2lwaGVydGV4dCxcbiAgICBpdjogY291bnRlcixcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlbmNyeXB0QWVzR2NtKFxuICBrZXk6IFVpbnQ4QXJyYXksXG4gIGl2OiBVaW50OEFycmF5LFxuICBwbGFpbnRleHQ6IFVpbnQ4QXJyYXksXG4gIGFhZD86IFVpbnQ4QXJyYXlcbik6IFVpbnQ4QXJyYXkge1xuICByZXR1cm4gZW5jcnlwdChDaXBoZXJUeXBlLkFFUzI1NkdDTSwge1xuICAgIGtleSxcbiAgICBwbGFpbnRleHQsXG4gICAgaXYsXG4gICAgYWFkLFxuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlY3J5cHRBZXNHY20oXG4gIGtleTogVWludDhBcnJheSxcbiAgaXY6IFVpbnQ4QXJyYXksXG4gIGNpcGhlcnRleHQ6IFVpbnQ4QXJyYXlcbik6IFVpbnQ4QXJyYXkge1xuICByZXR1cm4gZGVjcnlwdChDaXBoZXJUeXBlLkFFUzI1NkdDTSwge1xuICAgIGtleSxcbiAgICBjaXBoZXJ0ZXh0LFxuICAgIGl2LFxuICB9KTtcbn1cblxuLy8gSGFzaGluZ1xuXG5leHBvcnQgZnVuY3Rpb24gc2hhMjU2KGRhdGE6IFVpbnQ4QXJyYXkpOiBVaW50OEFycmF5IHtcbiAgcmV0dXJuIGhhc2goSGFzaFR5cGUuc2l6ZTI1NiwgZGF0YSk7XG59XG5cbi8vIFV0aWxpdHlcblxuZXhwb3J0IGZ1bmN0aW9uIGdldFJhbmRvbVZhbHVlKGxvdzogbnVtYmVyLCBoaWdoOiBudW1iZXIpOiBudW1iZXIge1xuICBjb25zdCBkaWZmID0gaGlnaCAtIGxvdztcbiAgY29uc3QgYnl0ZXMgPSBnZXRSYW5kb21CeXRlcygxKTtcblxuICAvLyBCZWNhdXNlIGhpZ2ggYW5kIGxvdyBhcmUgaW5jbHVzaXZlXG4gIGNvbnN0IG1vZCA9IGRpZmYgKyAxO1xuXG4gIHJldHVybiAoYnl0ZXNbMF0gJSBtb2QpICsgbG93O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0WmVyb2VzKG46IG51bWJlcik6IFVpbnQ4QXJyYXkge1xuICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkobik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoaWdoQml0c1RvSW50KGJ5dGU6IG51bWJlcik6IG51bWJlciB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1iaXR3aXNlXG4gIHJldHVybiAoYnl0ZSAmIDB4ZmYpID4+IDQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbnRzVG9CeXRlSGlnaEFuZExvdyhcbiAgaGlnaFZhbHVlOiBudW1iZXIsXG4gIGxvd1ZhbHVlOiBudW1iZXJcbik6IG51bWJlciB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1iaXR3aXNlXG4gIHJldHVybiAoKGhpZ2hWYWx1ZSA8PCA0KSB8IGxvd1ZhbHVlKSAmIDB4ZmY7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRGaXJzdEJ5dGVzKGRhdGE6IFVpbnQ4QXJyYXksIG46IG51bWJlcik6IFVpbnQ4QXJyYXkge1xuICByZXR1cm4gZGF0YS5zdWJhcnJheSgwLCBuKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEJ5dGVzKFxuICBkYXRhOiBVaW50OEFycmF5LFxuICBzdGFydDogbnVtYmVyLFxuICBuOiBudW1iZXJcbik6IFVpbnQ4QXJyYXkge1xuICByZXR1cm4gZGF0YS5zdWJhcnJheShzdGFydCwgc3RhcnQgKyBuKTtcbn1cblxuZnVuY3Rpb24gX2dldE1hY0FuZERhdGEoY2lwaGVydGV4dDogVWludDhBcnJheSkge1xuICBjb25zdCBkYXRhTGVuZ3RoID0gY2lwaGVydGV4dC5ieXRlTGVuZ3RoIC0gTUFDX0xFTkdUSDtcbiAgY29uc3QgZGF0YSA9IGdldEJ5dGVzKGNpcGhlcnRleHQsIDAsIGRhdGFMZW5ndGgpO1xuICBjb25zdCBtYWMgPSBnZXRCeXRlcyhjaXBoZXJ0ZXh0LCBkYXRhTGVuZ3RoLCBNQUNfTEVOR1RIKTtcblxuICByZXR1cm4geyBkYXRhLCBtYWMgfTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGVuY3J5cHRDZHNEaXNjb3ZlcnlSZXF1ZXN0KFxuICBhdHRlc3RhdGlvbnM6IHtcbiAgICBba2V5OiBzdHJpbmddOiB7IGNsaWVudEtleTogVWludDhBcnJheTsgcmVxdWVzdElkOiBVaW50OEFycmF5IH07XG4gIH0sXG4gIHBob25lTnVtYmVyczogUmVhZG9ubHlBcnJheTxzdHJpbmc+XG4pOiBQcm9taXNlPFJlY29yZDxzdHJpbmcsIHVua25vd24+PiB7XG4gIGNvbnN0IG5vbmNlID0gZ2V0UmFuZG9tQnl0ZXMoMzIpO1xuICBjb25zdCBudW1iZXJzQXJyYXkgPSBCdWZmZXIuY29uY2F0KFxuICAgIHBob25lTnVtYmVycy5tYXAobnVtYmVyID0+IHtcbiAgICAgIC8vIExvbmcuZnJvbVN0cmluZyBoYW5kbGVzIG51bWJlcnMgd2l0aCBvciB3aXRob3V0IGEgbGVhZGluZyAnKydcbiAgICAgIHJldHVybiBuZXcgVWludDhBcnJheShMb25nLmZyb21TdHJpbmcobnVtYmVyKS50b0J5dGVzQkUoKSk7XG4gICAgfSlcbiAgKTtcblxuICAvLyBXZSd2ZSB3cml0dGVuIHRvIHRoZSBhcnJheSwgc28gb2Zmc2V0ID09PSBieXRlTGVuZ3RoOyB3ZSBuZWVkIHRvIHJlc2V0IGl0LiBUaGVuIHdlJ2xsXG4gIC8vICAgaGF2ZSBhY2Nlc3MgdG8gZXZlcnl0aGluZyBpbiB0aGUgYXJyYXkgd2hlbiB3ZSBnZW5lcmF0ZSBhbiBVaW50OEFycmF5IGZyb20gaXQuXG4gIGNvbnN0IHF1ZXJ5RGF0YVBsYWludGV4dCA9IEJ5dGVzLmNvbmNhdGVuYXRlKFtub25jZSwgbnVtYmVyc0FycmF5XSk7XG5cbiAgY29uc3QgcXVlcnlEYXRhS2V5ID0gZ2V0UmFuZG9tQnl0ZXMoMzIpO1xuICBjb25zdCBjb21taXRtZW50ID0gc2hhMjU2KHF1ZXJ5RGF0YVBsYWludGV4dCk7XG4gIGNvbnN0IGl2ID0gZ2V0UmFuZG9tQnl0ZXMoMTIpO1xuICBjb25zdCBxdWVyeURhdGFDaXBoZXJ0ZXh0ID0gZW5jcnlwdEFlc0djbShcbiAgICBxdWVyeURhdGFLZXksXG4gICAgaXYsXG4gICAgcXVlcnlEYXRhUGxhaW50ZXh0XG4gICk7XG4gIGNvbnN0IHsgZGF0YTogcXVlcnlEYXRhQ2lwaGVydGV4dERhdGEsIG1hYzogcXVlcnlEYXRhQ2lwaGVydGV4dE1hYyB9ID1cbiAgICBfZ2V0TWFjQW5kRGF0YShxdWVyeURhdGFDaXBoZXJ0ZXh0KTtcblxuICBjb25zdCBlbnZlbG9wZXMgPSBhd2FpdCBwUHJvcHMoXG4gICAgYXR0ZXN0YXRpb25zLFxuICAgIGFzeW5jICh7IGNsaWVudEtleSwgcmVxdWVzdElkIH0pID0+IHtcbiAgICAgIGNvbnN0IGVudmVsb3BlSXYgPSBnZXRSYW5kb21CeXRlcygxMik7XG4gICAgICBjb25zdCBjaXBoZXJ0ZXh0ID0gZW5jcnlwdEFlc0djbShcbiAgICAgICAgY2xpZW50S2V5LFxuICAgICAgICBlbnZlbG9wZUl2LFxuICAgICAgICBxdWVyeURhdGFLZXksXG4gICAgICAgIHJlcXVlc3RJZFxuICAgICAgKTtcbiAgICAgIGNvbnN0IHsgZGF0YSwgbWFjIH0gPSBfZ2V0TWFjQW5kRGF0YShjaXBoZXJ0ZXh0KTtcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcmVxdWVzdElkOiBCeXRlcy50b0Jhc2U2NChyZXF1ZXN0SWQpLFxuICAgICAgICBkYXRhOiBCeXRlcy50b0Jhc2U2NChkYXRhKSxcbiAgICAgICAgaXY6IEJ5dGVzLnRvQmFzZTY0KGVudmVsb3BlSXYpLFxuICAgICAgICBtYWM6IEJ5dGVzLnRvQmFzZTY0KG1hYyksXG4gICAgICB9O1xuICAgIH1cbiAgKTtcblxuICByZXR1cm4ge1xuICAgIGFkZHJlc3NDb3VudDogcGhvbmVOdW1iZXJzLmxlbmd0aCxcbiAgICBjb21taXRtZW50OiBCeXRlcy50b0Jhc2U2NChjb21taXRtZW50KSxcbiAgICBkYXRhOiBCeXRlcy50b0Jhc2U2NChxdWVyeURhdGFDaXBoZXJ0ZXh0RGF0YSksXG4gICAgaXY6IEJ5dGVzLnRvQmFzZTY0KGl2KSxcbiAgICBtYWM6IEJ5dGVzLnRvQmFzZTY0KHF1ZXJ5RGF0YUNpcGhlcnRleHRNYWMpLFxuICAgIGVudmVsb3BlcyxcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHV1aWRUb0J5dGVzKHV1aWQ6IHN0cmluZyk6IFVpbnQ4QXJyYXkge1xuICBpZiAodXVpZC5sZW5ndGggIT09IDM2KSB7XG4gICAgbG9nLndhcm4oXG4gICAgICAndXVpZFRvQnl0ZXM6IHJlY2VpdmVkIGEgc3RyaW5nIG9mIGludmFsaWQgbGVuZ3RoLiAnICtcbiAgICAgICAgJ1JldHVybmluZyBhbiBlbXB0eSBVaW50OEFycmF5J1xuICAgICk7XG4gICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KDApO1xuICB9XG5cbiAgcmV0dXJuIFVpbnQ4QXJyYXkuZnJvbShcbiAgICBjaHVuayh1dWlkLnJlcGxhY2UoLy0vZywgJycpLCAyKS5tYXAocGFpciA9PiBwYXJzZUludChwYWlyLmpvaW4oJycpLCAxNikpXG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBieXRlc1RvVXVpZChieXRlczogVWludDhBcnJheSk6IHVuZGVmaW5lZCB8IFVVSURTdHJpbmdUeXBlIHtcbiAgaWYgKGJ5dGVzLmJ5dGVMZW5ndGggIT09IFVVSURfQllURV9TSVpFKSB7XG4gICAgbG9nLndhcm4oXG4gICAgICAnYnl0ZXNUb1V1aWQ6IHJlY2VpdmVkIGFuIFVpbnQ4QXJyYXkgb2YgaW52YWxpZCBsZW5ndGguICcgK1xuICAgICAgICAnUmV0dXJuaW5nIHVuZGVmaW5lZCdcbiAgICApO1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICBjb25zdCB1dWlkcyA9IHNwbGl0VXVpZHMoYnl0ZXMpO1xuICBpZiAodXVpZHMubGVuZ3RoID09PSAxKSB7XG4gICAgcmV0dXJuIHV1aWRzWzBdIHx8IHVuZGVmaW5lZDtcbiAgfVxuICByZXR1cm4gdW5kZWZpbmVkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc3BsaXRVdWlkcyhidWZmZXI6IFVpbnQ4QXJyYXkpOiBBcnJheTxVVUlEU3RyaW5nVHlwZSB8IG51bGw+IHtcbiAgY29uc3QgdXVpZHMgPSBuZXcgQXJyYXk8VVVJRFN0cmluZ1R5cGUgfCBudWxsPigpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGJ1ZmZlci5ieXRlTGVuZ3RoOyBpICs9IFVVSURfQllURV9TSVpFKSB7XG4gICAgY29uc3QgYnl0ZXMgPSBnZXRCeXRlcyhidWZmZXIsIGksIFVVSURfQllURV9TSVpFKTtcbiAgICBjb25zdCBoZXggPSBCeXRlcy50b0hleChieXRlcyk7XG4gICAgY29uc3QgY2h1bmtzID0gW1xuICAgICAgaGV4LnN1YnN0cmluZygwLCA4KSxcbiAgICAgIGhleC5zdWJzdHJpbmcoOCwgMTIpLFxuICAgICAgaGV4LnN1YnN0cmluZygxMiwgMTYpLFxuICAgICAgaGV4LnN1YnN0cmluZygxNiwgMjApLFxuICAgICAgaGV4LnN1YnN0cmluZygyMCksXG4gICAgXTtcbiAgICBjb25zdCB1dWlkID0gY2h1bmtzLmpvaW4oJy0nKTtcbiAgICBpZiAodXVpZCAhPT0gJzAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMCcpIHtcbiAgICAgIHV1aWRzLnB1c2goVVVJRC5jYXN0KHV1aWQpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdXVpZHMucHVzaChudWxsKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHV1aWRzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdHJpbUZvckRpc3BsYXkocGFkZGVkOiBVaW50OEFycmF5KTogVWludDhBcnJheSB7XG4gIGxldCBwYWRkaW5nRW5kID0gMDtcbiAgZm9yIChwYWRkaW5nRW5kOyBwYWRkaW5nRW5kIDwgcGFkZGVkLmxlbmd0aDsgcGFkZGluZ0VuZCArPSAxKSB7XG4gICAgaWYgKHBhZGRlZFtwYWRkaW5nRW5kXSA9PT0gMHgwMCkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiBwYWRkZWQuc2xpY2UoMCwgcGFkZGluZ0VuZCk7XG59XG5cbmZ1bmN0aW9uIHZlcmlmeURpZ2VzdChkYXRhOiBVaW50OEFycmF5LCB0aGVpckRpZ2VzdDogVWludDhBcnJheSk6IHZvaWQge1xuICBjb25zdCBvdXJEaWdlc3QgPSBzaGEyNTYoZGF0YSk7XG4gIGxldCByZXN1bHQgPSAwO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHRoZWlyRGlnZXN0LmJ5dGVMZW5ndGg7IGkgKz0gMSkge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1iaXR3aXNlXG4gICAgcmVzdWx0IHw9IG91ckRpZ2VzdFtpXSBeIHRoZWlyRGlnZXN0W2ldO1xuICB9XG4gIGlmIChyZXN1bHQgIT09IDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0JhZCBkaWdlc3QnKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVjcnlwdEF0dGFjaG1lbnQoXG4gIGVuY3J5cHRlZEJpbjogVWludDhBcnJheSxcbiAga2V5czogVWludDhBcnJheSxcbiAgdGhlaXJEaWdlc3Q/OiBVaW50OEFycmF5XG4pOiBVaW50OEFycmF5IHtcbiAgaWYgKGtleXMuYnl0ZUxlbmd0aCAhPT0gNjQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0dvdCBpbnZhbGlkIGxlbmd0aCBhdHRhY2htZW50IGtleXMnKTtcbiAgfVxuICBpZiAoZW5jcnlwdGVkQmluLmJ5dGVMZW5ndGggPCAxNiArIDMyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdHb3QgaW52YWxpZCBsZW5ndGggYXR0YWNobWVudCcpO1xuICB9XG5cbiAgY29uc3QgYWVzS2V5ID0ga2V5cy5zbGljZSgwLCAzMik7XG4gIGNvbnN0IG1hY0tleSA9IGtleXMuc2xpY2UoMzIsIDY0KTtcblxuICBjb25zdCBpdiA9IGVuY3J5cHRlZEJpbi5zbGljZSgwLCAxNik7XG4gIGNvbnN0IGNpcGhlcnRleHQgPSBlbmNyeXB0ZWRCaW4uc2xpY2UoMTYsIGVuY3J5cHRlZEJpbi5ieXRlTGVuZ3RoIC0gMzIpO1xuICBjb25zdCBpdkFuZENpcGhlcnRleHQgPSBlbmNyeXB0ZWRCaW4uc2xpY2UoMCwgZW5jcnlwdGVkQmluLmJ5dGVMZW5ndGggLSAzMik7XG4gIGNvbnN0IG1hYyA9IGVuY3J5cHRlZEJpbi5zbGljZShcbiAgICBlbmNyeXB0ZWRCaW4uYnl0ZUxlbmd0aCAtIDMyLFxuICAgIGVuY3J5cHRlZEJpbi5ieXRlTGVuZ3RoXG4gICk7XG5cbiAgdmVyaWZ5SG1hY1NoYTI1NihpdkFuZENpcGhlcnRleHQsIG1hY0tleSwgbWFjLCAzMik7XG5cbiAgaWYgKHRoZWlyRGlnZXN0KSB7XG4gICAgdmVyaWZ5RGlnZXN0KGVuY3J5cHRlZEJpbiwgdGhlaXJEaWdlc3QpO1xuICB9XG5cbiAgcmV0dXJuIGRlY3J5cHRBZXMyNTZDYmNQa2NzUGFkZGluZyhhZXNLZXksIGNpcGhlcnRleHQsIGl2KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVuY3J5cHRBdHRhY2htZW50KFxuICBwbGFpbnRleHQ6IFVpbnQ4QXJyYXksXG4gIGtleXM6IFVpbnQ4QXJyYXksXG4gIGl2OiBVaW50OEFycmF5XG4pOiBFbmNyeXB0ZWRBdHRhY2htZW50IHtcbiAgaWYgKCEocGxhaW50ZXh0IGluc3RhbmNlb2YgVWludDhBcnJheSkpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICAgYFxcYHBsYWludGV4dFxcYCBtdXN0IGJlIGFuIFxcYFVpbnQ4QXJyYXlcXGA7IGdvdDogJHt0eXBlb2YgcGxhaW50ZXh0fWBcbiAgICApO1xuICB9XG5cbiAgaWYgKGtleXMuYnl0ZUxlbmd0aCAhPT0gNjQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0dvdCBpbnZhbGlkIGxlbmd0aCBhdHRhY2htZW50IGtleXMnKTtcbiAgfVxuICBpZiAoaXYuYnl0ZUxlbmd0aCAhPT0gMTYpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0dvdCBpbnZhbGlkIGxlbmd0aCBhdHRhY2htZW50IGl2Jyk7XG4gIH1cbiAgY29uc3QgYWVzS2V5ID0ga2V5cy5zbGljZSgwLCAzMik7XG4gIGNvbnN0IG1hY0tleSA9IGtleXMuc2xpY2UoMzIsIDY0KTtcblxuICBjb25zdCBjaXBoZXJ0ZXh0ID0gZW5jcnlwdEFlczI1NkNiY1BrY3NQYWRkaW5nKGFlc0tleSwgcGxhaW50ZXh0LCBpdik7XG5cbiAgY29uc3QgaXZBbmRDaXBoZXJ0ZXh0ID0gQnl0ZXMuY29uY2F0ZW5hdGUoW2l2LCBjaXBoZXJ0ZXh0XSk7XG5cbiAgY29uc3QgbWFjID0gaG1hY1NoYTI1NihtYWNLZXksIGl2QW5kQ2lwaGVydGV4dCk7XG5cbiAgY29uc3QgZW5jcnlwdGVkQmluID0gQnl0ZXMuY29uY2F0ZW5hdGUoW2l2QW5kQ2lwaGVydGV4dCwgbWFjXSk7XG4gIGNvbnN0IGRpZ2VzdCA9IHNoYTI1NihlbmNyeXB0ZWRCaW4pO1xuXG4gIHJldHVybiB7XG4gICAgY2lwaGVydGV4dDogZW5jcnlwdGVkQmluLFxuICAgIGRpZ2VzdCxcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVuY3J5cHRQcm9maWxlKGRhdGE6IFVpbnQ4QXJyYXksIGtleTogVWludDhBcnJheSk6IFVpbnQ4QXJyYXkge1xuICBjb25zdCBpdiA9IGdldFJhbmRvbUJ5dGVzKFBST0ZJTEVfSVZfTEVOR1RIKTtcbiAgaWYgKGtleS5ieXRlTGVuZ3RoICE9PSBQUk9GSUxFX0tFWV9MRU5HVEgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0dvdCBpbnZhbGlkIGxlbmd0aCBwcm9maWxlIGtleScpO1xuICB9XG4gIGlmIChpdi5ieXRlTGVuZ3RoICE9PSBQUk9GSUxFX0lWX0xFTkdUSCkge1xuICAgIHRocm93IG5ldyBFcnJvcignR290IGludmFsaWQgbGVuZ3RoIHByb2ZpbGUgaXYnKTtcbiAgfVxuICBjb25zdCBjaXBoZXJ0ZXh0ID0gZW5jcnlwdEFlc0djbShrZXksIGl2LCBkYXRhKTtcbiAgcmV0dXJuIEJ5dGVzLmNvbmNhdGVuYXRlKFtpdiwgY2lwaGVydGV4dF0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVjcnlwdFByb2ZpbGUoZGF0YTogVWludDhBcnJheSwga2V5OiBVaW50OEFycmF5KTogVWludDhBcnJheSB7XG4gIGlmIChkYXRhLmJ5dGVMZW5ndGggPCAxMiArIDE2ICsgMSkge1xuICAgIHRocm93IG5ldyBFcnJvcihgR290IHRvbyBzaG9ydCBpbnB1dDogJHtkYXRhLmJ5dGVMZW5ndGh9YCk7XG4gIH1cbiAgY29uc3QgaXYgPSBkYXRhLnNsaWNlKDAsIFBST0ZJTEVfSVZfTEVOR1RIKTtcbiAgY29uc3QgY2lwaGVydGV4dCA9IGRhdGEuc2xpY2UoUFJPRklMRV9JVl9MRU5HVEgsIGRhdGEuYnl0ZUxlbmd0aCk7XG4gIGlmIChrZXkuYnl0ZUxlbmd0aCAhPT0gUFJPRklMRV9LRVlfTEVOR1RIKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdHb3QgaW52YWxpZCBsZW5ndGggcHJvZmlsZSBrZXknKTtcbiAgfVxuICBpZiAoaXYuYnl0ZUxlbmd0aCAhPT0gUFJPRklMRV9JVl9MRU5HVEgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0dvdCBpbnZhbGlkIGxlbmd0aCBwcm9maWxlIGl2Jyk7XG4gIH1cblxuICB0cnkge1xuICAgIHJldHVybiBkZWNyeXB0QWVzR2NtKGtleSwgaXYsIGNpcGhlcnRleHQpO1xuICB9IGNhdGNoIChfKSB7XG4gICAgdGhyb3cgbmV3IFByb2ZpbGVEZWNyeXB0RXJyb3IoXG4gICAgICAnRmFpbGVkIHRvIGRlY3J5cHQgcHJvZmlsZSBkYXRhLiAnICtcbiAgICAgICAgJ01vc3QgbGlrZWx5IHRoZSBwcm9maWxlIGtleSBoYXMgY2hhbmdlZC4nXG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZW5jcnlwdFByb2ZpbGVJdGVtV2l0aFBhZGRpbmcoXG4gIGl0ZW06IFVpbnQ4QXJyYXksXG4gIHByb2ZpbGVLZXk6IFVpbnQ4QXJyYXksXG4gIHBhZGRlZExlbmd0aHM6IHR5cGVvZiBQYWRkZWRMZW5ndGhzW2tleW9mIHR5cGVvZiBQYWRkZWRMZW5ndGhzXVxuKTogVWludDhBcnJheSB7XG4gIGNvbnN0IHBhZGRlZExlbmd0aCA9IHBhZGRlZExlbmd0aHMuZmluZChcbiAgICAobGVuZ3RoOiBudW1iZXIpID0+IGl0ZW0uYnl0ZUxlbmd0aCA8PSBsZW5ndGhcbiAgKTtcbiAgaWYgKCFwYWRkZWRMZW5ndGgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ092ZXJzaXplZCB2YWx1ZScpO1xuICB9XG4gIGNvbnN0IHBhZGRlZCA9IG5ldyBVaW50OEFycmF5KHBhZGRlZExlbmd0aCk7XG4gIHBhZGRlZC5zZXQobmV3IFVpbnQ4QXJyYXkoaXRlbSkpO1xuICByZXR1cm4gZW5jcnlwdFByb2ZpbGUocGFkZGVkLCBwcm9maWxlS2V5KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlY3J5cHRQcm9maWxlTmFtZShcbiAgZW5jcnlwdGVkUHJvZmlsZU5hbWU6IHN0cmluZyxcbiAga2V5OiBVaW50OEFycmF5XG4pOiB7IGdpdmVuOiBVaW50OEFycmF5OyBmYW1pbHk6IFVpbnQ4QXJyYXkgfCBudWxsIH0ge1xuICBjb25zdCBkYXRhID0gQnl0ZXMuZnJvbUJhc2U2NChlbmNyeXB0ZWRQcm9maWxlTmFtZSk7XG4gIGNvbnN0IHBhZGRlZCA9IGRlY3J5cHRQcm9maWxlKGRhdGEsIGtleSk7XG5cbiAgLy8gR2l2ZW4gbmFtZSBpcyB0aGUgc3RhcnQgb2YgdGhlIHN0cmluZyB0byB0aGUgZmlyc3QgbnVsbCBjaGFyYWN0ZXJcbiAgbGV0IGdpdmVuRW5kO1xuICBmb3IgKGdpdmVuRW5kID0gMDsgZ2l2ZW5FbmQgPCBwYWRkZWQubGVuZ3RoOyBnaXZlbkVuZCArPSAxKSB7XG4gICAgaWYgKHBhZGRlZFtnaXZlbkVuZF0gPT09IDB4MDApIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIC8vIEZhbWlseSBuYW1lIGlzIHRoZSBuZXh0IGNodW5rIG9mIG5vbi1udWxsIGNoYXJhY3RlcnMgYWZ0ZXIgdGhhdCBmaXJzdCBudWxsXG4gIGxldCBmYW1pbHlFbmQ7XG4gIGZvciAoZmFtaWx5RW5kID0gZ2l2ZW5FbmQgKyAxOyBmYW1pbHlFbmQgPCBwYWRkZWQubGVuZ3RoOyBmYW1pbHlFbmQgKz0gMSkge1xuICAgIGlmIChwYWRkZWRbZmFtaWx5RW5kXSA9PT0gMHgwMCkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIGNvbnN0IGZvdW5kRmFtaWx5TmFtZSA9IGZhbWlseUVuZCA+IGdpdmVuRW5kICsgMTtcblxuICByZXR1cm4ge1xuICAgIGdpdmVuOiBwYWRkZWQuc2xpY2UoMCwgZ2l2ZW5FbmQpLFxuICAgIGZhbWlseTogZm91bmRGYW1pbHlOYW1lID8gcGFkZGVkLnNsaWNlKGdpdmVuRW5kICsgMSwgZmFtaWx5RW5kKSA6IG51bGwsXG4gIH07XG59XG5cbi8vXG4vLyBTaWduYWxDb250ZXh0IEFQSXNcbi8vXG5cbmNvbnN0IHsgY3J5cHRvIH0gPSB3aW5kb3cuU2lnbmFsQ29udGV4dDtcblxuZXhwb3J0IGZ1bmN0aW9uIHNpZ24oa2V5OiBVaW50OEFycmF5LCBkYXRhOiBVaW50OEFycmF5KTogVWludDhBcnJheSB7XG4gIHJldHVybiBjcnlwdG8uc2lnbihrZXksIGRhdGEpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaGFzaCh0eXBlOiBIYXNoVHlwZSwgZGF0YTogVWludDhBcnJheSk6IFVpbnQ4QXJyYXkge1xuICByZXR1cm4gY3J5cHRvLmhhc2godHlwZSwgZGF0YSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlbmNyeXB0KFxuICAuLi5hcmdzOiBQYXJhbWV0ZXJzPHR5cGVvZiBjcnlwdG8uZW5jcnlwdD5cbik6IFVpbnQ4QXJyYXkge1xuICByZXR1cm4gY3J5cHRvLmVuY3J5cHQoLi4uYXJncyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZWNyeXB0KFxuICAuLi5hcmdzOiBQYXJhbWV0ZXJzPHR5cGVvZiBjcnlwdG8uZGVjcnlwdD5cbik6IFVpbnQ4QXJyYXkge1xuICByZXR1cm4gY3J5cHRvLmRlY3J5cHQoLi4uYXJncyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRSYW5kb21CeXRlcyhzaXplOiBudW1iZXIpOiBVaW50OEFycmF5IHtcbiAgcmV0dXJuIGNyeXB0by5nZXRSYW5kb21CeXRlcyhzaXplKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbnN0YW50VGltZUVxdWFsKFxuICBsZWZ0OiBVaW50OEFycmF5LFxuICByaWdodDogVWludDhBcnJheVxuKTogYm9vbGVhbiB7XG4gIHJldHVybiBjcnlwdG8uY29uc3RhbnRUaW1lRXF1YWwobGVmdCwgcmlnaHQpO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLG9CQUF1QjtBQUN2QixxQkFBbUI7QUFDbkIsb0JBQXNCO0FBQ3RCLGtCQUFpQjtBQUNqQiw4QkFBcUI7QUFFckIsWUFBdUI7QUFDdkIsbUJBQW9EO0FBQ3BELFVBQXFCO0FBQ3JCLG9CQUFxQztBQUNyQyxvQkFBb0M7QUFDcEMsa0JBQXFDO0FBS3JDLE1BQU0sb0JBQW9CO0FBQzFCLE1BQU0scUJBQXFCO0FBR3BCLE1BQU0sZ0JBQWdCO0FBQUEsRUFDM0IsTUFBTSxDQUFDLElBQUksR0FBRztBQUFBLEVBQ2QsT0FBTyxDQUFDLEtBQUssS0FBSyxHQUFHO0FBQUEsRUFDckIsWUFBWSxDQUFDLEVBQUU7QUFBQSxFQUNmLGdCQUFnQixDQUFDLEdBQUc7QUFDdEI7QUFRTyxrQ0FBMEM7QUFD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
