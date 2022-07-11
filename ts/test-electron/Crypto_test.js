var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var import_chai = require("chai");
var Bytes = __toESM(require("../Bytes"));
var Curve = __toESM(require("../Curve"));
var import_Crypto = require("../Crypto");
describe("Crypto", () => {
  describe("encrypting and decrypting profile data", () => {
    const NAME_PADDED_LENGTH = 53;
    describe("encrypting and decrypting profile names", () => {
      it("pads, encrypts, decrypts, and unpads a short string", () => {
        const name = "Alice";
        const buffer = Bytes.fromString(name);
        const key = (0, import_Crypto.getRandomBytes)(32);
        const encrypted = (0, import_Crypto.encryptProfileItemWithPadding)(buffer, key, import_Crypto.PaddedLengths.Name);
        import_chai.assert.equal(encrypted.byteLength, NAME_PADDED_LENGTH + 16 + 12);
        const { given, family } = (0, import_Crypto.decryptProfileName)(Bytes.toBase64(encrypted), key);
        import_chai.assert.strictEqual(family, null);
        import_chai.assert.strictEqual(Bytes.toString(given), name);
      });
      it("handles a given name of the max, 53 characters", () => {
        const name = "01234567890123456789012345678901234567890123456789123";
        const buffer = Bytes.fromString(name);
        const key = (0, import_Crypto.getRandomBytes)(32);
        const encrypted = (0, import_Crypto.encryptProfileItemWithPadding)(buffer, key, import_Crypto.PaddedLengths.Name);
        import_chai.assert.equal(encrypted.byteLength, NAME_PADDED_LENGTH + 16 + 12);
        const { given, family } = (0, import_Crypto.decryptProfileName)(Bytes.toBase64(encrypted), key);
        import_chai.assert.strictEqual(Bytes.toString(given), name);
        import_chai.assert.strictEqual(family, null);
      });
      it("handles family/given name of the max, 53 characters", () => {
        const name = "01234567890123456789\x0001234567890123456789012345678912";
        const buffer = Bytes.fromString(name);
        const key = (0, import_Crypto.getRandomBytes)(32);
        const encrypted = (0, import_Crypto.encryptProfileItemWithPadding)(buffer, key, import_Crypto.PaddedLengths.Name);
        import_chai.assert.equal(encrypted.byteLength, NAME_PADDED_LENGTH + 16 + 12);
        const { given, family } = (0, import_Crypto.decryptProfileName)(Bytes.toBase64(encrypted), key);
        import_chai.assert.strictEqual(Bytes.toString(given), "01234567890123456789");
        import_chai.assert.strictEqual(family && Bytes.toString(family), "01234567890123456789012345678912");
      });
      it("handles a string with family/given name", () => {
        const name = "Alice\0Jones";
        const buffer = Bytes.fromString(name);
        const key = (0, import_Crypto.getRandomBytes)(32);
        const encrypted = (0, import_Crypto.encryptProfileItemWithPadding)(buffer, key, import_Crypto.PaddedLengths.Name);
        import_chai.assert.equal(encrypted.byteLength, NAME_PADDED_LENGTH + 16 + 12);
        const { given, family } = (0, import_Crypto.decryptProfileName)(Bytes.toBase64(encrypted), key);
        import_chai.assert.strictEqual(Bytes.toString(given), "Alice");
        import_chai.assert.strictEqual(family && Bytes.toString(family), "Jones");
      });
      it("works for empty string", () => {
        const name = Bytes.fromString("");
        const key = (0, import_Crypto.getRandomBytes)(32);
        const encrypted = (0, import_Crypto.encryptProfileItemWithPadding)(name, key, import_Crypto.PaddedLengths.Name);
        import_chai.assert.equal(encrypted.byteLength, NAME_PADDED_LENGTH + 16 + 12);
        const { given, family } = (0, import_Crypto.decryptProfileName)(Bytes.toBase64(encrypted), key);
        import_chai.assert.strictEqual(family, null);
        import_chai.assert.strictEqual(given.byteLength, 0);
        import_chai.assert.strictEqual(Bytes.toString(given), "");
      });
    });
    describe("encrypting and decrypting profile avatars", () => {
      it("encrypts and decrypts", async () => {
        const buffer = Bytes.fromString("This is an avatar");
        const key = (0, import_Crypto.getRandomBytes)(32);
        const encrypted = (0, import_Crypto.encryptProfile)(buffer, key);
        (0, import_chai.assert)(encrypted.byteLength === buffer.byteLength + 16 + 12);
        const decrypted = (0, import_Crypto.decryptProfile)(encrypted, key);
        (0, import_chai.assert)((0, import_Crypto.constantTimeEqual)(buffer, decrypted));
      });
      it("throws when decrypting with the wrong key", () => {
        const buffer = Bytes.fromString("This is an avatar");
        const key = (0, import_Crypto.getRandomBytes)(32);
        const badKey = (0, import_Crypto.getRandomBytes)(32);
        const encrypted = (0, import_Crypto.encryptProfile)(buffer, key);
        (0, import_chai.assert)(encrypted.byteLength === buffer.byteLength + 16 + 12);
        import_chai.assert.throws(() => (0, import_Crypto.decryptProfile)(encrypted, badKey), "Failed to decrypt profile data. Most likely the profile key has changed.");
      });
    });
  });
  describe("generateRegistrationId", () => {
    it("generates an integer between 0 and 16383 (inclusive)", () => {
      let max = 0;
      for (let i = 0; i < 100; i += 1) {
        const id = (0, import_Crypto.generateRegistrationId)();
        import_chai.assert.isAtLeast(id, 0);
        import_chai.assert.isAtMost(id, 16383);
        (0, import_chai.assert)(Number.isInteger(id));
        max = Math.max(max, id);
      }
      import_chai.assert.isAtLeast(max, 256);
    });
  });
  describe("deriveSecrets", () => {
    it("derives key parts via HKDF", () => {
      const input = (0, import_Crypto.getRandomBytes)(32);
      const salt = (0, import_Crypto.getRandomBytes)(32);
      const info = Bytes.fromString("Hello world");
      const result = (0, import_Crypto.deriveSecrets)(input, salt, info);
      import_chai.assert.lengthOf(result, 3);
      result.forEach((part) => {
        import_chai.assert.instanceOf(part, Uint8Array);
        import_chai.assert.strictEqual(part.byteLength, 32);
      });
    });
  });
  describe("accessKey/profileKey", () => {
    it("verification roundtrips", () => {
      const profileKey = (0, import_Crypto.getRandomBytes)(32);
      const accessKey = (0, import_Crypto.deriveAccessKey)(profileKey);
      const verifier = (0, import_Crypto.getAccessKeyVerifier)(accessKey);
      const correct = (0, import_Crypto.verifyAccessKey)(accessKey, verifier);
      import_chai.assert.strictEqual(correct, true);
    });
  });
  describe("deriveMasterKeyFromGroupV1", () => {
    const vectors = [
      {
        gv1: "00000000000000000000000000000000",
        masterKey: "dbde68f4ee9169081f8814eabc65523fea1359235c8cfca32b69e31dce58b039"
      },
      {
        gv1: "000102030405060708090a0b0c0d0e0f",
        masterKey: "70884f78f07a94480ee36b67a4b5e975e92e4a774561e3df84c9076e3be4b9bf"
      },
      {
        gv1: "7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f",
        masterKey: "e69bf7c183b288b4ea5745b7c52b651a61e57769fafde683a6fdf1240f1905f2"
      },
      {
        gv1: "ffffffffffffffffffffffffffffffff",
        masterKey: "dd3a7de23d10f18b64457fbeedc76226c112a730e4b76112e62c36c4432eb37d"
      }
    ];
    vectors.forEach((vector, index) => {
      it(`vector ${index}`, () => {
        const gv1 = Bytes.fromHex(vector.gv1);
        const expectedHex = vector.masterKey;
        const actual = (0, import_Crypto.deriveMasterKeyFromGroupV1)(gv1);
        const actualHex = Bytes.toHex(actual);
        import_chai.assert.strictEqual(actualHex, expectedHex);
      });
    });
  });
  describe("symmetric encryption", () => {
    it("roundtrips", () => {
      const message = "this is my message";
      const plaintext = Bytes.fromString(message);
      const key = (0, import_Crypto.getRandomBytes)(32);
      const encrypted = (0, import_Crypto.encryptSymmetric)(key, plaintext);
      const decrypted = (0, import_Crypto.decryptSymmetric)(key, encrypted);
      const equal = (0, import_Crypto.constantTimeEqual)(plaintext, decrypted);
      if (!equal) {
        throw new Error("The output and input did not match!");
      }
    });
    it("roundtrip fails if nonce is modified", () => {
      const message = "this is my message";
      const plaintext = Bytes.fromString(message);
      const key = (0, import_Crypto.getRandomBytes)(32);
      const encrypted = (0, import_Crypto.encryptSymmetric)(key, plaintext);
      encrypted[2] += 2;
      try {
        (0, import_Crypto.decryptSymmetric)(key, encrypted);
      } catch (error) {
        import_chai.assert.strictEqual(error.message, "decryptSymmetric: Failed to decrypt; MAC verification failed");
        return;
      }
      throw new Error("Expected error to be thrown");
    });
    it("roundtrip fails if mac is modified", () => {
      const message = "this is my message";
      const plaintext = Bytes.fromString(message);
      const key = (0, import_Crypto.getRandomBytes)(32);
      const encrypted = (0, import_Crypto.encryptSymmetric)(key, plaintext);
      encrypted[encrypted.length - 3] += 2;
      try {
        (0, import_Crypto.decryptSymmetric)(key, encrypted);
      } catch (error) {
        import_chai.assert.strictEqual(error.message, "decryptSymmetric: Failed to decrypt; MAC verification failed");
        return;
      }
      throw new Error("Expected error to be thrown");
    });
    it("roundtrip fails if encrypted contents are modified", () => {
      const message = "this is my message";
      const plaintext = Bytes.fromString(message);
      const key = (0, import_Crypto.getRandomBytes)(32);
      const encrypted = (0, import_Crypto.encryptSymmetric)(key, plaintext);
      encrypted[35] += 9;
      try {
        (0, import_Crypto.decryptSymmetric)(key, encrypted);
      } catch (error) {
        import_chai.assert.strictEqual(error.message, "decryptSymmetric: Failed to decrypt; MAC verification failed");
        return;
      }
      throw new Error("Expected error to be thrown");
    });
  });
  describe("encrypted device name", () => {
    it("roundtrips", () => {
      const deviceName = "v1.19.0 on Windows 10";
      const identityKey = Curve.generateKeyPair();
      const encrypted = (0, import_Crypto.encryptDeviceName)(deviceName, identityKey.pubKey);
      const decrypted = (0, import_Crypto.decryptDeviceName)(encrypted, identityKey.privKey);
      import_chai.assert.strictEqual(decrypted, deviceName);
    });
    it("fails if iv is changed", () => {
      const deviceName = "v1.19.0 on Windows 10";
      const identityKey = Curve.generateKeyPair();
      const encrypted = (0, import_Crypto.encryptDeviceName)(deviceName, identityKey.pubKey);
      encrypted.syntheticIv = (0, import_Crypto.getRandomBytes)(16);
      try {
        (0, import_Crypto.decryptDeviceName)(encrypted, identityKey.privKey);
      } catch (error) {
        import_chai.assert.strictEqual(error.message, "decryptDeviceName: synthetic IV did not match");
      }
    });
  });
  describe("verifyHmacSha256", () => {
    it("rejects if their MAC is too short", () => {
      const key = (0, import_Crypto.getRandomBytes)(32);
      const plaintext = Bytes.fromString("Hello world");
      const ourMac = (0, import_Crypto.hmacSha256)(key, plaintext);
      const theirMac = ourMac.slice(0, -1);
      let error;
      try {
        (0, import_Crypto.verifyHmacSha256)(plaintext, key, theirMac, ourMac.byteLength);
      } catch (err) {
        error = err;
      }
      import_chai.assert.instanceOf(error, Error);
      import_chai.assert.strictEqual(error.message, "Bad MAC length");
    });
    it("rejects if their MAC is too long", () => {
      const key = (0, import_Crypto.getRandomBytes)(32);
      const plaintext = Bytes.fromString("Hello world");
      const ourMac = (0, import_Crypto.hmacSha256)(key, plaintext);
      const theirMac = Bytes.concatenate([ourMac, new Uint8Array([255])]);
      let error;
      try {
        (0, import_Crypto.verifyHmacSha256)(plaintext, key, theirMac, ourMac.byteLength);
      } catch (err) {
        error = err;
      }
      import_chai.assert.instanceOf(error, Error);
      import_chai.assert.strictEqual(error.message, "Bad MAC length");
    });
    it("rejects if our MAC is shorter than the specified length", () => {
      const key = (0, import_Crypto.getRandomBytes)(32);
      const plaintext = Bytes.fromString("Hello world");
      const ourMac = (0, import_Crypto.hmacSha256)(key, plaintext);
      const theirMac = ourMac;
      let error;
      try {
        (0, import_Crypto.verifyHmacSha256)(plaintext, key, theirMac, ourMac.byteLength + 1);
      } catch (err) {
        error = err;
      }
      import_chai.assert.instanceOf(error, Error);
      import_chai.assert.strictEqual(error.message, "Bad MAC length");
    });
    it("rejects if the MACs don't match", () => {
      const plaintext = Bytes.fromString("Hello world");
      const ourKey = (0, import_Crypto.getRandomBytes)(32);
      const ourMac = (0, import_Crypto.hmacSha256)(ourKey, plaintext);
      const theirKey = (0, import_Crypto.getRandomBytes)(32);
      const theirMac = (0, import_Crypto.hmacSha256)(theirKey, plaintext);
      let error;
      try {
        (0, import_Crypto.verifyHmacSha256)(plaintext, ourKey, theirMac, ourMac.byteLength);
      } catch (err) {
        error = err;
      }
      import_chai.assert.instanceOf(error, Error);
      import_chai.assert.strictEqual(error.message, "Bad MAC");
    });
    it("resolves with undefined if the MACs match exactly", () => {
      const key = (0, import_Crypto.getRandomBytes)(32);
      const plaintext = Bytes.fromString("Hello world");
      const theirMac = (0, import_Crypto.hmacSha256)(key, plaintext);
      const result = (0, import_Crypto.verifyHmacSha256)(plaintext, key, theirMac, theirMac.byteLength);
      import_chai.assert.isUndefined(result);
    });
    it("resolves with undefined if the first `length` bytes of the MACs match", () => {
      const key = (0, import_Crypto.getRandomBytes)(32);
      const plaintext = Bytes.fromString("Hello world");
      const theirMac = (0, import_Crypto.hmacSha256)(key, plaintext).slice(0, -5);
      const result = (0, import_Crypto.verifyHmacSha256)(plaintext, key, theirMac, theirMac.byteLength);
      import_chai.assert.isUndefined(result);
    });
  });
  describe("uuidToBytes", () => {
    it("converts valid UUIDs to Uint8Arrays", () => {
      const expectedResult = new Uint8Array([
        34,
        110,
        68,
        2,
        127,
        252,
        69,
        67,
        133,
        201,
        70,
        34,
        197,
        10,
        91,
        20
      ]);
      import_chai.assert.deepEqual((0, import_Crypto.uuidToBytes)("226e4402-7ffc-4543-85c9-4622c50a5b14"), expectedResult);
      import_chai.assert.deepEqual((0, import_Crypto.uuidToBytes)("226E4402-7FFC-4543-85C9-4622C50A5B14"), expectedResult);
    });
    it("returns an empty Uint8Array for strings of the wrong length", () => {
      import_chai.assert.deepEqual((0, import_Crypto.uuidToBytes)(""), new Uint8Array(0));
      import_chai.assert.deepEqual((0, import_Crypto.uuidToBytes)("abc"), new Uint8Array(0));
      import_chai.assert.deepEqual((0, import_Crypto.uuidToBytes)("032deadf0d5e4ee78da28e75b1dfb284"), new Uint8Array(0));
      import_chai.assert.deepEqual((0, import_Crypto.uuidToBytes)("deaed5eb-d983-456a-a954-9ad7a006b271aaaaaaaaaa"), new Uint8Array(0));
    });
  });
  describe("bytesToUuid", () => {
    it("converts valid Uint8Arrays to UUID strings", () => {
      const buf = new Uint8Array([
        34,
        110,
        68,
        2,
        127,
        252,
        69,
        67,
        133,
        201,
        70,
        34,
        197,
        10,
        91,
        20
      ]);
      import_chai.assert.deepEqual((0, import_Crypto.bytesToUuid)(buf), "226e4402-7ffc-4543-85c9-4622c50a5b14");
    });
    it("returns undefined if passed an all-zero buffer", () => {
      import_chai.assert.isUndefined((0, import_Crypto.bytesToUuid)(new Uint8Array(16)));
    });
    it("returns undefined if passed the wrong number of bytes", () => {
      import_chai.assert.isUndefined((0, import_Crypto.bytesToUuid)(new Uint8Array(0)));
      import_chai.assert.isUndefined((0, import_Crypto.bytesToUuid)(new Uint8Array([34])));
      import_chai.assert.isUndefined((0, import_Crypto.bytesToUuid)(new Uint8Array(Array(17).fill(34))));
    });
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ3J5cHRvX3Rlc3QudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDE1LTIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyBhc3NlcnQgfSBmcm9tICdjaGFpJztcblxuaW1wb3J0ICogYXMgQnl0ZXMgZnJvbSAnLi4vQnl0ZXMnO1xuaW1wb3J0ICogYXMgQ3VydmUgZnJvbSAnLi4vQ3VydmUnO1xuaW1wb3J0IHtcbiAgUGFkZGVkTGVuZ3RocyxcbiAgZW5jcnlwdFByb2ZpbGVJdGVtV2l0aFBhZGRpbmcsXG4gIGRlY3J5cHRQcm9maWxlTmFtZSxcbiAgZW5jcnlwdFByb2ZpbGUsXG4gIGRlY3J5cHRQcm9maWxlLFxuICBnZXRSYW5kb21CeXRlcyxcbiAgY29uc3RhbnRUaW1lRXF1YWwsXG4gIGdlbmVyYXRlUmVnaXN0cmF0aW9uSWQsXG4gIGRlcml2ZVNlY3JldHMsXG4gIGVuY3J5cHREZXZpY2VOYW1lLFxuICBkZWNyeXB0RGV2aWNlTmFtZSxcbiAgZGVyaXZlQWNjZXNzS2V5LFxuICBnZXRBY2Nlc3NLZXlWZXJpZmllcixcbiAgdmVyaWZ5QWNjZXNzS2V5LFxuICBkZXJpdmVNYXN0ZXJLZXlGcm9tR3JvdXBWMSxcbiAgZW5jcnlwdFN5bW1ldHJpYyxcbiAgZGVjcnlwdFN5bW1ldHJpYyxcbiAgaG1hY1NoYTI1NixcbiAgdmVyaWZ5SG1hY1NoYTI1NixcbiAgdXVpZFRvQnl0ZXMsXG4gIGJ5dGVzVG9VdWlkLFxufSBmcm9tICcuLi9DcnlwdG8nO1xuXG5kZXNjcmliZSgnQ3J5cHRvJywgKCkgPT4ge1xuICBkZXNjcmliZSgnZW5jcnlwdGluZyBhbmQgZGVjcnlwdGluZyBwcm9maWxlIGRhdGEnLCAoKSA9PiB7XG4gICAgY29uc3QgTkFNRV9QQURERURfTEVOR1RIID0gNTM7XG4gICAgZGVzY3JpYmUoJ2VuY3J5cHRpbmcgYW5kIGRlY3J5cHRpbmcgcHJvZmlsZSBuYW1lcycsICgpID0+IHtcbiAgICAgIGl0KCdwYWRzLCBlbmNyeXB0cywgZGVjcnlwdHMsIGFuZCB1bnBhZHMgYSBzaG9ydCBzdHJpbmcnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG5hbWUgPSAnQWxpY2UnO1xuICAgICAgICBjb25zdCBidWZmZXIgPSBCeXRlcy5mcm9tU3RyaW5nKG5hbWUpO1xuICAgICAgICBjb25zdCBrZXkgPSBnZXRSYW5kb21CeXRlcygzMik7XG5cbiAgICAgICAgY29uc3QgZW5jcnlwdGVkID0gZW5jcnlwdFByb2ZpbGVJdGVtV2l0aFBhZGRpbmcoXG4gICAgICAgICAgYnVmZmVyLFxuICAgICAgICAgIGtleSxcbiAgICAgICAgICBQYWRkZWRMZW5ndGhzLk5hbWVcbiAgICAgICAgKTtcbiAgICAgICAgYXNzZXJ0LmVxdWFsKGVuY3J5cHRlZC5ieXRlTGVuZ3RoLCBOQU1FX1BBRERFRF9MRU5HVEggKyAxNiArIDEyKTtcblxuICAgICAgICBjb25zdCB7IGdpdmVuLCBmYW1pbHkgfSA9IGRlY3J5cHRQcm9maWxlTmFtZShcbiAgICAgICAgICBCeXRlcy50b0Jhc2U2NChlbmNyeXB0ZWQpLFxuICAgICAgICAgIGtleVxuICAgICAgICApO1xuICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoZmFtaWx5LCBudWxsKTtcbiAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKEJ5dGVzLnRvU3RyaW5nKGdpdmVuKSwgbmFtZSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ2hhbmRsZXMgYSBnaXZlbiBuYW1lIG9mIHRoZSBtYXgsIDUzIGNoYXJhY3RlcnMnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG5hbWUgPSAnMDEyMzQ1Njc4OTAxMjM0NTY3ODkwMTIzNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0NTY3ODkxMjMnO1xuICAgICAgICBjb25zdCBidWZmZXIgPSBCeXRlcy5mcm9tU3RyaW5nKG5hbWUpO1xuICAgICAgICBjb25zdCBrZXkgPSBnZXRSYW5kb21CeXRlcygzMik7XG5cbiAgICAgICAgY29uc3QgZW5jcnlwdGVkID0gZW5jcnlwdFByb2ZpbGVJdGVtV2l0aFBhZGRpbmcoXG4gICAgICAgICAgYnVmZmVyLFxuICAgICAgICAgIGtleSxcbiAgICAgICAgICBQYWRkZWRMZW5ndGhzLk5hbWVcbiAgICAgICAgKTtcbiAgICAgICAgYXNzZXJ0LmVxdWFsKGVuY3J5cHRlZC5ieXRlTGVuZ3RoLCBOQU1FX1BBRERFRF9MRU5HVEggKyAxNiArIDEyKTtcbiAgICAgICAgY29uc3QgeyBnaXZlbiwgZmFtaWx5IH0gPSBkZWNyeXB0UHJvZmlsZU5hbWUoXG4gICAgICAgICAgQnl0ZXMudG9CYXNlNjQoZW5jcnlwdGVkKSxcbiAgICAgICAgICBrZXlcbiAgICAgICAgKTtcblxuICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoQnl0ZXMudG9TdHJpbmcoZ2l2ZW4pLCBuYW1lKTtcbiAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGZhbWlseSwgbnVsbCk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ2hhbmRsZXMgZmFtaWx5L2dpdmVuIG5hbWUgb2YgdGhlIG1heCwgNTMgY2hhcmFjdGVycycsICgpID0+IHtcbiAgICAgICAgY29uc3QgbmFtZSA9XG4gICAgICAgICAgJzAxMjM0NTY3ODkwMTIzNDU2Nzg5XFx1MDAwMDAxMjM0NTY3ODkwMTIzNDU2Nzg5MDEyMzQ1Njc4OTEyJztcbiAgICAgICAgY29uc3QgYnVmZmVyID0gQnl0ZXMuZnJvbVN0cmluZyhuYW1lKTtcbiAgICAgICAgY29uc3Qga2V5ID0gZ2V0UmFuZG9tQnl0ZXMoMzIpO1xuXG4gICAgICAgIGNvbnN0IGVuY3J5cHRlZCA9IGVuY3J5cHRQcm9maWxlSXRlbVdpdGhQYWRkaW5nKFxuICAgICAgICAgIGJ1ZmZlcixcbiAgICAgICAgICBrZXksXG4gICAgICAgICAgUGFkZGVkTGVuZ3Rocy5OYW1lXG4gICAgICAgICk7XG4gICAgICAgIGFzc2VydC5lcXVhbChlbmNyeXB0ZWQuYnl0ZUxlbmd0aCwgTkFNRV9QQURERURfTEVOR1RIICsgMTYgKyAxMik7XG4gICAgICAgIGNvbnN0IHsgZ2l2ZW4sIGZhbWlseSB9ID0gZGVjcnlwdFByb2ZpbGVOYW1lKFxuICAgICAgICAgIEJ5dGVzLnRvQmFzZTY0KGVuY3J5cHRlZCksXG4gICAgICAgICAga2V5XG4gICAgICAgICk7XG4gICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChCeXRlcy50b1N0cmluZyhnaXZlbiksICcwMTIzNDU2Nzg5MDEyMzQ1Njc4OScpO1xuICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoXG4gICAgICAgICAgZmFtaWx5ICYmIEJ5dGVzLnRvU3RyaW5nKGZhbWlseSksXG4gICAgICAgICAgJzAxMjM0NTY3ODkwMTIzNDU2Nzg5MDEyMzQ1Njc4OTEyJ1xuICAgICAgICApO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdoYW5kbGVzIGEgc3RyaW5nIHdpdGggZmFtaWx5L2dpdmVuIG5hbWUnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG5hbWUgPSAnQWxpY2VcXDBKb25lcyc7XG4gICAgICAgIGNvbnN0IGJ1ZmZlciA9IEJ5dGVzLmZyb21TdHJpbmcobmFtZSk7XG4gICAgICAgIGNvbnN0IGtleSA9IGdldFJhbmRvbUJ5dGVzKDMyKTtcblxuICAgICAgICBjb25zdCBlbmNyeXB0ZWQgPSBlbmNyeXB0UHJvZmlsZUl0ZW1XaXRoUGFkZGluZyhcbiAgICAgICAgICBidWZmZXIsXG4gICAgICAgICAga2V5LFxuICAgICAgICAgIFBhZGRlZExlbmd0aHMuTmFtZVxuICAgICAgICApO1xuICAgICAgICBhc3NlcnQuZXF1YWwoZW5jcnlwdGVkLmJ5dGVMZW5ndGgsIE5BTUVfUEFEREVEX0xFTkdUSCArIDE2ICsgMTIpO1xuICAgICAgICBjb25zdCB7IGdpdmVuLCBmYW1pbHkgfSA9IGRlY3J5cHRQcm9maWxlTmFtZShcbiAgICAgICAgICBCeXRlcy50b0Jhc2U2NChlbmNyeXB0ZWQpLFxuICAgICAgICAgIGtleVxuICAgICAgICApO1xuICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoQnl0ZXMudG9TdHJpbmcoZ2l2ZW4pLCAnQWxpY2UnKTtcbiAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGZhbWlseSAmJiBCeXRlcy50b1N0cmluZyhmYW1pbHkpLCAnSm9uZXMnKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnd29ya3MgZm9yIGVtcHR5IHN0cmluZycsICgpID0+IHtcbiAgICAgICAgY29uc3QgbmFtZSA9IEJ5dGVzLmZyb21TdHJpbmcoJycpO1xuICAgICAgICBjb25zdCBrZXkgPSBnZXRSYW5kb21CeXRlcygzMik7XG5cbiAgICAgICAgY29uc3QgZW5jcnlwdGVkID0gZW5jcnlwdFByb2ZpbGVJdGVtV2l0aFBhZGRpbmcoXG4gICAgICAgICAgbmFtZSxcbiAgICAgICAgICBrZXksXG4gICAgICAgICAgUGFkZGVkTGVuZ3Rocy5OYW1lXG4gICAgICAgICk7XG4gICAgICAgIGFzc2VydC5lcXVhbChlbmNyeXB0ZWQuYnl0ZUxlbmd0aCwgTkFNRV9QQURERURfTEVOR1RIICsgMTYgKyAxMik7XG5cbiAgICAgICAgY29uc3QgeyBnaXZlbiwgZmFtaWx5IH0gPSBkZWNyeXB0UHJvZmlsZU5hbWUoXG4gICAgICAgICAgQnl0ZXMudG9CYXNlNjQoZW5jcnlwdGVkKSxcbiAgICAgICAgICBrZXlcbiAgICAgICAgKTtcbiAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGZhbWlseSwgbnVsbCk7XG4gICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChnaXZlbi5ieXRlTGVuZ3RoLCAwKTtcbiAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKEJ5dGVzLnRvU3RyaW5nKGdpdmVuKSwgJycpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnZW5jcnlwdGluZyBhbmQgZGVjcnlwdGluZyBwcm9maWxlIGF2YXRhcnMnLCAoKSA9PiB7XG4gICAgICBpdCgnZW5jcnlwdHMgYW5kIGRlY3J5cHRzJywgYXN5bmMgKCkgPT4ge1xuICAgICAgICBjb25zdCBidWZmZXIgPSBCeXRlcy5mcm9tU3RyaW5nKCdUaGlzIGlzIGFuIGF2YXRhcicpO1xuICAgICAgICBjb25zdCBrZXkgPSBnZXRSYW5kb21CeXRlcygzMik7XG5cbiAgICAgICAgY29uc3QgZW5jcnlwdGVkID0gZW5jcnlwdFByb2ZpbGUoYnVmZmVyLCBrZXkpO1xuICAgICAgICBhc3NlcnQoZW5jcnlwdGVkLmJ5dGVMZW5ndGggPT09IGJ1ZmZlci5ieXRlTGVuZ3RoICsgMTYgKyAxMik7XG5cbiAgICAgICAgY29uc3QgZGVjcnlwdGVkID0gZGVjcnlwdFByb2ZpbGUoZW5jcnlwdGVkLCBrZXkpO1xuICAgICAgICBhc3NlcnQoY29uc3RhbnRUaW1lRXF1YWwoYnVmZmVyLCBkZWNyeXB0ZWQpKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgndGhyb3dzIHdoZW4gZGVjcnlwdGluZyB3aXRoIHRoZSB3cm9uZyBrZXknLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGJ1ZmZlciA9IEJ5dGVzLmZyb21TdHJpbmcoJ1RoaXMgaXMgYW4gYXZhdGFyJyk7XG4gICAgICAgIGNvbnN0IGtleSA9IGdldFJhbmRvbUJ5dGVzKDMyKTtcbiAgICAgICAgY29uc3QgYmFkS2V5ID0gZ2V0UmFuZG9tQnl0ZXMoMzIpO1xuXG4gICAgICAgIGNvbnN0IGVuY3J5cHRlZCA9IGVuY3J5cHRQcm9maWxlKGJ1ZmZlciwga2V5KTtcbiAgICAgICAgYXNzZXJ0KGVuY3J5cHRlZC5ieXRlTGVuZ3RoID09PSBidWZmZXIuYnl0ZUxlbmd0aCArIDE2ICsgMTIpO1xuICAgICAgICBhc3NlcnQudGhyb3dzKFxuICAgICAgICAgICgpID0+IGRlY3J5cHRQcm9maWxlKGVuY3J5cHRlZCwgYmFkS2V5KSxcbiAgICAgICAgICAnRmFpbGVkIHRvIGRlY3J5cHQgcHJvZmlsZSBkYXRhLiBNb3N0IGxpa2VseSB0aGUgcHJvZmlsZSBrZXkgaGFzIGNoYW5nZWQuJ1xuICAgICAgICApO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdnZW5lcmF0ZVJlZ2lzdHJhdGlvbklkJywgKCkgPT4ge1xuICAgIGl0KCdnZW5lcmF0ZXMgYW4gaW50ZWdlciBiZXR3ZWVuIDAgYW5kIDE2MzgzIChpbmNsdXNpdmUpJywgKCkgPT4ge1xuICAgICAgbGV0IG1heCA9IDA7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwMDsgaSArPSAxKSB7XG4gICAgICAgIGNvbnN0IGlkID0gZ2VuZXJhdGVSZWdpc3RyYXRpb25JZCgpO1xuICAgICAgICBhc3NlcnQuaXNBdExlYXN0KGlkLCAwKTtcbiAgICAgICAgYXNzZXJ0LmlzQXRNb3N0KGlkLCAxNjM4Myk7XG4gICAgICAgIGFzc2VydChOdW1iZXIuaXNJbnRlZ2VyKGlkKSk7XG5cbiAgICAgICAgbWF4ID0gTWF0aC5tYXgobWF4LCBpZCk7XG4gICAgICB9XG5cbiAgICAgIC8vIFByb2JhYmlsaXR5IG9mIHRoaXMgYmVpbmcgZmFsc2UgaXMgfiAxMF57LTE4MX1cbiAgICAgIGFzc2VydC5pc0F0TGVhc3QobWF4LCAweDEwMCk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdkZXJpdmVTZWNyZXRzJywgKCkgPT4ge1xuICAgIGl0KCdkZXJpdmVzIGtleSBwYXJ0cyB2aWEgSEtERicsICgpID0+IHtcbiAgICAgIGNvbnN0IGlucHV0ID0gZ2V0UmFuZG9tQnl0ZXMoMzIpO1xuICAgICAgY29uc3Qgc2FsdCA9IGdldFJhbmRvbUJ5dGVzKDMyKTtcbiAgICAgIGNvbnN0IGluZm8gPSBCeXRlcy5mcm9tU3RyaW5nKCdIZWxsbyB3b3JsZCcpO1xuICAgICAgY29uc3QgcmVzdWx0ID0gZGVyaXZlU2VjcmV0cyhpbnB1dCwgc2FsdCwgaW5mbyk7XG4gICAgICBhc3NlcnQubGVuZ3RoT2YocmVzdWx0LCAzKTtcbiAgICAgIHJlc3VsdC5mb3JFYWNoKHBhcnQgPT4ge1xuICAgICAgICAvLyBUaGlzIGlzIGEgc21va2UgdGVzdDsgSEtERiBpcyB0ZXN0ZWQgYXMgcGFydCBvZiBAc2lnbmFsYXBwL2xpYnNpZ25hbC1jbGllbnQuXG4gICAgICAgIGFzc2VydC5pbnN0YW5jZU9mKHBhcnQsIFVpbnQ4QXJyYXkpO1xuICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwocGFydC5ieXRlTGVuZ3RoLCAzMik7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ2FjY2Vzc0tleS9wcm9maWxlS2V5JywgKCkgPT4ge1xuICAgIGl0KCd2ZXJpZmljYXRpb24gcm91bmR0cmlwcycsICgpID0+IHtcbiAgICAgIGNvbnN0IHByb2ZpbGVLZXkgPSBnZXRSYW5kb21CeXRlcygzMik7XG4gICAgICBjb25zdCBhY2Nlc3NLZXkgPSBkZXJpdmVBY2Nlc3NLZXkocHJvZmlsZUtleSk7XG5cbiAgICAgIGNvbnN0IHZlcmlmaWVyID0gZ2V0QWNjZXNzS2V5VmVyaWZpZXIoYWNjZXNzS2V5KTtcblxuICAgICAgY29uc3QgY29ycmVjdCA9IHZlcmlmeUFjY2Vzc0tleShhY2Nlc3NLZXksIHZlcmlmaWVyKTtcblxuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGNvcnJlY3QsIHRydWUpO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnZGVyaXZlTWFzdGVyS2V5RnJvbUdyb3VwVjEnLCAoKSA9PiB7XG4gICAgY29uc3QgdmVjdG9ycyA9IFtcbiAgICAgIHtcbiAgICAgICAgZ3YxOiAnMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAnLFxuICAgICAgICBtYXN0ZXJLZXk6XG4gICAgICAgICAgJ2RiZGU2OGY0ZWU5MTY5MDgxZjg4MTRlYWJjNjU1MjNmZWExMzU5MjM1YzhjZmNhMzJiNjllMzFkY2U1OGIwMzknLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgZ3YxOiAnMDAwMTAyMDMwNDA1MDYwNzA4MDkwYTBiMGMwZDBlMGYnLFxuICAgICAgICBtYXN0ZXJLZXk6XG4gICAgICAgICAgJzcwODg0Zjc4ZjA3YTk0NDgwZWUzNmI2N2E0YjVlOTc1ZTkyZTRhNzc0NTYxZTNkZjg0YzkwNzZlM2JlNGI5YmYnLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgZ3YxOiAnN2Y3ZjdmN2Y3ZjdmN2Y3ZjdmN2Y3ZjdmN2Y3ZjdmN2YnLFxuICAgICAgICBtYXN0ZXJLZXk6XG4gICAgICAgICAgJ2U2OWJmN2MxODNiMjg4YjRlYTU3NDViN2M1MmI2NTFhNjFlNTc3NjlmYWZkZTY4M2E2ZmRmMTI0MGYxOTA1ZjInLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgZ3YxOiAnZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmYnLFxuICAgICAgICBtYXN0ZXJLZXk6XG4gICAgICAgICAgJ2RkM2E3ZGUyM2QxMGYxOGI2NDQ1N2ZiZWVkYzc2MjI2YzExMmE3MzBlNGI3NjExMmU2MmMzNmM0NDMyZWIzN2QnLFxuICAgICAgfSxcbiAgICBdO1xuXG4gICAgdmVjdG9ycy5mb3JFYWNoKCh2ZWN0b3IsIGluZGV4KSA9PiB7XG4gICAgICBpdChgdmVjdG9yICR7aW5kZXh9YCwgKCkgPT4ge1xuICAgICAgICBjb25zdCBndjEgPSBCeXRlcy5mcm9tSGV4KHZlY3Rvci5ndjEpO1xuICAgICAgICBjb25zdCBleHBlY3RlZEhleCA9IHZlY3Rvci5tYXN0ZXJLZXk7XG5cbiAgICAgICAgY29uc3QgYWN0dWFsID0gZGVyaXZlTWFzdGVyS2V5RnJvbUdyb3VwVjEoZ3YxKTtcbiAgICAgICAgY29uc3QgYWN0dWFsSGV4ID0gQnl0ZXMudG9IZXgoYWN0dWFsKTtcblxuICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoYWN0dWFsSGV4LCBleHBlY3RlZEhleCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ3N5bW1ldHJpYyBlbmNyeXB0aW9uJywgKCkgPT4ge1xuICAgIGl0KCdyb3VuZHRyaXBzJywgKCkgPT4ge1xuICAgICAgY29uc3QgbWVzc2FnZSA9ICd0aGlzIGlzIG15IG1lc3NhZ2UnO1xuICAgICAgY29uc3QgcGxhaW50ZXh0ID0gQnl0ZXMuZnJvbVN0cmluZyhtZXNzYWdlKTtcbiAgICAgIGNvbnN0IGtleSA9IGdldFJhbmRvbUJ5dGVzKDMyKTtcblxuICAgICAgY29uc3QgZW5jcnlwdGVkID0gZW5jcnlwdFN5bW1ldHJpYyhrZXksIHBsYWludGV4dCk7XG4gICAgICBjb25zdCBkZWNyeXB0ZWQgPSBkZWNyeXB0U3ltbWV0cmljKGtleSwgZW5jcnlwdGVkKTtcblxuICAgICAgY29uc3QgZXF1YWwgPSBjb25zdGFudFRpbWVFcXVhbChwbGFpbnRleHQsIGRlY3J5cHRlZCk7XG4gICAgICBpZiAoIWVxdWFsKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIG91dHB1dCBhbmQgaW5wdXQgZGlkIG5vdCBtYXRjaCEnKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGl0KCdyb3VuZHRyaXAgZmFpbHMgaWYgbm9uY2UgaXMgbW9kaWZpZWQnLCAoKSA9PiB7XG4gICAgICBjb25zdCBtZXNzYWdlID0gJ3RoaXMgaXMgbXkgbWVzc2FnZSc7XG4gICAgICBjb25zdCBwbGFpbnRleHQgPSBCeXRlcy5mcm9tU3RyaW5nKG1lc3NhZ2UpO1xuICAgICAgY29uc3Qga2V5ID0gZ2V0UmFuZG9tQnl0ZXMoMzIpO1xuXG4gICAgICBjb25zdCBlbmNyeXB0ZWQgPSBlbmNyeXB0U3ltbWV0cmljKGtleSwgcGxhaW50ZXh0KTtcbiAgICAgIGVuY3J5cHRlZFsyXSArPSAyO1xuXG4gICAgICB0cnkge1xuICAgICAgICBkZWNyeXB0U3ltbWV0cmljKGtleSwgZW5jcnlwdGVkKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgICAgICBlcnJvci5tZXNzYWdlLFxuICAgICAgICAgICdkZWNyeXB0U3ltbWV0cmljOiBGYWlsZWQgdG8gZGVjcnlwdDsgTUFDIHZlcmlmaWNhdGlvbiBmYWlsZWQnXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdFeHBlY3RlZCBlcnJvciB0byBiZSB0aHJvd24nKTtcbiAgICB9KTtcblxuICAgIGl0KCdyb3VuZHRyaXAgZmFpbHMgaWYgbWFjIGlzIG1vZGlmaWVkJywgKCkgPT4ge1xuICAgICAgY29uc3QgbWVzc2FnZSA9ICd0aGlzIGlzIG15IG1lc3NhZ2UnO1xuICAgICAgY29uc3QgcGxhaW50ZXh0ID0gQnl0ZXMuZnJvbVN0cmluZyhtZXNzYWdlKTtcbiAgICAgIGNvbnN0IGtleSA9IGdldFJhbmRvbUJ5dGVzKDMyKTtcblxuICAgICAgY29uc3QgZW5jcnlwdGVkID0gZW5jcnlwdFN5bW1ldHJpYyhrZXksIHBsYWludGV4dCk7XG4gICAgICBlbmNyeXB0ZWRbZW5jcnlwdGVkLmxlbmd0aCAtIDNdICs9IDI7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGRlY3J5cHRTeW1tZXRyaWMoa2V5LCBlbmNyeXB0ZWQpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgICAgIGVycm9yLm1lc3NhZ2UsXG4gICAgICAgICAgJ2RlY3J5cHRTeW1tZXRyaWM6IEZhaWxlZCB0byBkZWNyeXB0OyBNQUMgdmVyaWZpY2F0aW9uIGZhaWxlZCdcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0V4cGVjdGVkIGVycm9yIHRvIGJlIHRocm93bicpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JvdW5kdHJpcCBmYWlscyBpZiBlbmNyeXB0ZWQgY29udGVudHMgYXJlIG1vZGlmaWVkJywgKCkgPT4ge1xuICAgICAgY29uc3QgbWVzc2FnZSA9ICd0aGlzIGlzIG15IG1lc3NhZ2UnO1xuICAgICAgY29uc3QgcGxhaW50ZXh0ID0gQnl0ZXMuZnJvbVN0cmluZyhtZXNzYWdlKTtcbiAgICAgIGNvbnN0IGtleSA9IGdldFJhbmRvbUJ5dGVzKDMyKTtcblxuICAgICAgY29uc3QgZW5jcnlwdGVkID0gZW5jcnlwdFN5bW1ldHJpYyhrZXksIHBsYWludGV4dCk7XG4gICAgICBlbmNyeXB0ZWRbMzVdICs9IDk7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGRlY3J5cHRTeW1tZXRyaWMoa2V5LCBlbmNyeXB0ZWQpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgICAgIGVycm9yLm1lc3NhZ2UsXG4gICAgICAgICAgJ2RlY3J5cHRTeW1tZXRyaWM6IEZhaWxlZCB0byBkZWNyeXB0OyBNQUMgdmVyaWZpY2F0aW9uIGZhaWxlZCdcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0V4cGVjdGVkIGVycm9yIHRvIGJlIHRocm93bicpO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnZW5jcnlwdGVkIGRldmljZSBuYW1lJywgKCkgPT4ge1xuICAgIGl0KCdyb3VuZHRyaXBzJywgKCkgPT4ge1xuICAgICAgY29uc3QgZGV2aWNlTmFtZSA9ICd2MS4xOS4wIG9uIFdpbmRvd3MgMTAnO1xuICAgICAgY29uc3QgaWRlbnRpdHlLZXkgPSBDdXJ2ZS5nZW5lcmF0ZUtleVBhaXIoKTtcblxuICAgICAgY29uc3QgZW5jcnlwdGVkID0gZW5jcnlwdERldmljZU5hbWUoZGV2aWNlTmFtZSwgaWRlbnRpdHlLZXkucHViS2V5KTtcbiAgICAgIGNvbnN0IGRlY3J5cHRlZCA9IGRlY3J5cHREZXZpY2VOYW1lKGVuY3J5cHRlZCwgaWRlbnRpdHlLZXkucHJpdktleSk7XG5cbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChkZWNyeXB0ZWQsIGRldmljZU5hbWUpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2ZhaWxzIGlmIGl2IGlzIGNoYW5nZWQnLCAoKSA9PiB7XG4gICAgICBjb25zdCBkZXZpY2VOYW1lID0gJ3YxLjE5LjAgb24gV2luZG93cyAxMCc7XG4gICAgICBjb25zdCBpZGVudGl0eUtleSA9IEN1cnZlLmdlbmVyYXRlS2V5UGFpcigpO1xuXG4gICAgICBjb25zdCBlbmNyeXB0ZWQgPSBlbmNyeXB0RGV2aWNlTmFtZShkZXZpY2VOYW1lLCBpZGVudGl0eUtleS5wdWJLZXkpO1xuICAgICAgZW5jcnlwdGVkLnN5bnRoZXRpY0l2ID0gZ2V0UmFuZG9tQnl0ZXMoMTYpO1xuICAgICAgdHJ5IHtcbiAgICAgICAgZGVjcnlwdERldmljZU5hbWUoZW5jcnlwdGVkLCBpZGVudGl0eUtleS5wcml2S2V5KTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgICAgICBlcnJvci5tZXNzYWdlLFxuICAgICAgICAgICdkZWNyeXB0RGV2aWNlTmFtZTogc3ludGhldGljIElWIGRpZCBub3QgbWF0Y2gnXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCd2ZXJpZnlIbWFjU2hhMjU2JywgKCkgPT4ge1xuICAgIGl0KCdyZWplY3RzIGlmIHRoZWlyIE1BQyBpcyB0b28gc2hvcnQnLCAoKSA9PiB7XG4gICAgICBjb25zdCBrZXkgPSBnZXRSYW5kb21CeXRlcygzMik7XG4gICAgICBjb25zdCBwbGFpbnRleHQgPSBCeXRlcy5mcm9tU3RyaW5nKCdIZWxsbyB3b3JsZCcpO1xuICAgICAgY29uc3Qgb3VyTWFjID0gaG1hY1NoYTI1NihrZXksIHBsYWludGV4dCk7XG4gICAgICBjb25zdCB0aGVpck1hYyA9IG91ck1hYy5zbGljZSgwLCAtMSk7XG4gICAgICBsZXQgZXJyb3I7XG4gICAgICB0cnkge1xuICAgICAgICB2ZXJpZnlIbWFjU2hhMjU2KHBsYWludGV4dCwga2V5LCB0aGVpck1hYywgb3VyTWFjLmJ5dGVMZW5ndGgpO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGVycm9yID0gZXJyO1xuICAgICAgfVxuICAgICAgYXNzZXJ0Lmluc3RhbmNlT2YoZXJyb3IsIEVycm9yKTtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChlcnJvci5tZXNzYWdlLCAnQmFkIE1BQyBsZW5ndGgnKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZWplY3RzIGlmIHRoZWlyIE1BQyBpcyB0b28gbG9uZycsICgpID0+IHtcbiAgICAgIGNvbnN0IGtleSA9IGdldFJhbmRvbUJ5dGVzKDMyKTtcbiAgICAgIGNvbnN0IHBsYWludGV4dCA9IEJ5dGVzLmZyb21TdHJpbmcoJ0hlbGxvIHdvcmxkJyk7XG4gICAgICBjb25zdCBvdXJNYWMgPSBobWFjU2hhMjU2KGtleSwgcGxhaW50ZXh0KTtcbiAgICAgIGNvbnN0IHRoZWlyTWFjID0gQnl0ZXMuY29uY2F0ZW5hdGUoW291ck1hYywgbmV3IFVpbnQ4QXJyYXkoWzB4ZmZdKV0pO1xuICAgICAgbGV0IGVycm9yO1xuICAgICAgdHJ5IHtcbiAgICAgICAgdmVyaWZ5SG1hY1NoYTI1NihwbGFpbnRleHQsIGtleSwgdGhlaXJNYWMsIG91ck1hYy5ieXRlTGVuZ3RoKTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBlcnJvciA9IGVycjtcbiAgICAgIH1cbiAgICAgIGFzc2VydC5pbnN0YW5jZU9mKGVycm9yLCBFcnJvcik7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoZXJyb3IubWVzc2FnZSwgJ0JhZCBNQUMgbGVuZ3RoJyk7XG4gICAgfSk7XG5cbiAgICBpdCgncmVqZWN0cyBpZiBvdXIgTUFDIGlzIHNob3J0ZXIgdGhhbiB0aGUgc3BlY2lmaWVkIGxlbmd0aCcsICgpID0+IHtcbiAgICAgIGNvbnN0IGtleSA9IGdldFJhbmRvbUJ5dGVzKDMyKTtcbiAgICAgIGNvbnN0IHBsYWludGV4dCA9IEJ5dGVzLmZyb21TdHJpbmcoJ0hlbGxvIHdvcmxkJyk7XG4gICAgICBjb25zdCBvdXJNYWMgPSBobWFjU2hhMjU2KGtleSwgcGxhaW50ZXh0KTtcbiAgICAgIGNvbnN0IHRoZWlyTWFjID0gb3VyTWFjO1xuICAgICAgbGV0IGVycm9yO1xuICAgICAgdHJ5IHtcbiAgICAgICAgdmVyaWZ5SG1hY1NoYTI1NihwbGFpbnRleHQsIGtleSwgdGhlaXJNYWMsIG91ck1hYy5ieXRlTGVuZ3RoICsgMSk7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgZXJyb3IgPSBlcnI7XG4gICAgICB9XG4gICAgICBhc3NlcnQuaW5zdGFuY2VPZihlcnJvciwgRXJyb3IpO1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGVycm9yLm1lc3NhZ2UsICdCYWQgTUFDIGxlbmd0aCcpO1xuICAgIH0pO1xuXG4gICAgaXQoXCJyZWplY3RzIGlmIHRoZSBNQUNzIGRvbid0IG1hdGNoXCIsICgpID0+IHtcbiAgICAgIGNvbnN0IHBsYWludGV4dCA9IEJ5dGVzLmZyb21TdHJpbmcoJ0hlbGxvIHdvcmxkJyk7XG4gICAgICBjb25zdCBvdXJLZXkgPSBnZXRSYW5kb21CeXRlcygzMik7XG4gICAgICBjb25zdCBvdXJNYWMgPSBobWFjU2hhMjU2KG91cktleSwgcGxhaW50ZXh0KTtcbiAgICAgIGNvbnN0IHRoZWlyS2V5ID0gZ2V0UmFuZG9tQnl0ZXMoMzIpO1xuICAgICAgY29uc3QgdGhlaXJNYWMgPSBobWFjU2hhMjU2KHRoZWlyS2V5LCBwbGFpbnRleHQpO1xuICAgICAgbGV0IGVycm9yO1xuICAgICAgdHJ5IHtcbiAgICAgICAgdmVyaWZ5SG1hY1NoYTI1NihwbGFpbnRleHQsIG91cktleSwgdGhlaXJNYWMsIG91ck1hYy5ieXRlTGVuZ3RoKTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBlcnJvciA9IGVycjtcbiAgICAgIH1cbiAgICAgIGFzc2VydC5pbnN0YW5jZU9mKGVycm9yLCBFcnJvcik7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoZXJyb3IubWVzc2FnZSwgJ0JhZCBNQUMnKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXNvbHZlcyB3aXRoIHVuZGVmaW5lZCBpZiB0aGUgTUFDcyBtYXRjaCBleGFjdGx5JywgKCkgPT4ge1xuICAgICAgY29uc3Qga2V5ID0gZ2V0UmFuZG9tQnl0ZXMoMzIpO1xuICAgICAgY29uc3QgcGxhaW50ZXh0ID0gQnl0ZXMuZnJvbVN0cmluZygnSGVsbG8gd29ybGQnKTtcbiAgICAgIGNvbnN0IHRoZWlyTWFjID0gaG1hY1NoYTI1NihrZXksIHBsYWludGV4dCk7XG4gICAgICBjb25zdCByZXN1bHQgPSB2ZXJpZnlIbWFjU2hhMjU2KFxuICAgICAgICBwbGFpbnRleHQsXG4gICAgICAgIGtleSxcbiAgICAgICAgdGhlaXJNYWMsXG4gICAgICAgIHRoZWlyTWFjLmJ5dGVMZW5ndGhcbiAgICAgICk7XG4gICAgICBhc3NlcnQuaXNVbmRlZmluZWQocmVzdWx0KTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXNvbHZlcyB3aXRoIHVuZGVmaW5lZCBpZiB0aGUgZmlyc3QgYGxlbmd0aGAgYnl0ZXMgb2YgdGhlIE1BQ3MgbWF0Y2gnLCAoKSA9PiB7XG4gICAgICBjb25zdCBrZXkgPSBnZXRSYW5kb21CeXRlcygzMik7XG4gICAgICBjb25zdCBwbGFpbnRleHQgPSBCeXRlcy5mcm9tU3RyaW5nKCdIZWxsbyB3b3JsZCcpO1xuICAgICAgY29uc3QgdGhlaXJNYWMgPSBobWFjU2hhMjU2KGtleSwgcGxhaW50ZXh0KS5zbGljZSgwLCAtNSk7XG4gICAgICBjb25zdCByZXN1bHQgPSB2ZXJpZnlIbWFjU2hhMjU2KFxuICAgICAgICBwbGFpbnRleHQsXG4gICAgICAgIGtleSxcbiAgICAgICAgdGhlaXJNYWMsXG4gICAgICAgIHRoZWlyTWFjLmJ5dGVMZW5ndGhcbiAgICAgICk7XG4gICAgICBhc3NlcnQuaXNVbmRlZmluZWQocmVzdWx0KTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ3V1aWRUb0J5dGVzJywgKCkgPT4ge1xuICAgIGl0KCdjb252ZXJ0cyB2YWxpZCBVVUlEcyB0byBVaW50OEFycmF5cycsICgpID0+IHtcbiAgICAgIGNvbnN0IGV4cGVjdGVkUmVzdWx0ID0gbmV3IFVpbnQ4QXJyYXkoW1xuICAgICAgICAweDIyLCAweDZlLCAweDQ0LCAweDAyLCAweDdmLCAweGZjLCAweDQ1LCAweDQzLCAweDg1LCAweGM5LCAweDQ2LCAweDIyLFxuICAgICAgICAweGM1LCAweDBhLCAweDViLCAweDE0LFxuICAgICAgXSk7XG5cbiAgICAgIGFzc2VydC5kZWVwRXF1YWwoXG4gICAgICAgIHV1aWRUb0J5dGVzKCcyMjZlNDQwMi03ZmZjLTQ1NDMtODVjOS00NjIyYzUwYTViMTQnKSxcbiAgICAgICAgZXhwZWN0ZWRSZXN1bHRcbiAgICAgICk7XG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKFxuICAgICAgICB1dWlkVG9CeXRlcygnMjI2RTQ0MDItN0ZGQy00NTQzLTg1QzktNDYyMkM1MEE1QjE0JyksXG4gICAgICAgIGV4cGVjdGVkUmVzdWx0XG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgYW4gZW1wdHkgVWludDhBcnJheSBmb3Igc3RyaW5ncyBvZiB0aGUgd3JvbmcgbGVuZ3RoJywgKCkgPT4ge1xuICAgICAgYXNzZXJ0LmRlZXBFcXVhbCh1dWlkVG9CeXRlcygnJyksIG5ldyBVaW50OEFycmF5KDApKTtcbiAgICAgIGFzc2VydC5kZWVwRXF1YWwodXVpZFRvQnl0ZXMoJ2FiYycpLCBuZXcgVWludDhBcnJheSgwKSk7XG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKFxuICAgICAgICB1dWlkVG9CeXRlcygnMDMyZGVhZGYwZDVlNGVlNzhkYTI4ZTc1YjFkZmIyODQnKSxcbiAgICAgICAgbmV3IFVpbnQ4QXJyYXkoMClcbiAgICAgICk7XG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKFxuICAgICAgICB1dWlkVG9CeXRlcygnZGVhZWQ1ZWItZDk4My00NTZhLWE5NTQtOWFkN2EwMDZiMjcxYWFhYWFhYWFhYScpLFxuICAgICAgICBuZXcgVWludDhBcnJheSgwKVxuICAgICAgKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ2J5dGVzVG9VdWlkJywgKCkgPT4ge1xuICAgIGl0KCdjb252ZXJ0cyB2YWxpZCBVaW50OEFycmF5cyB0byBVVUlEIHN0cmluZ3MnLCAoKSA9PiB7XG4gICAgICBjb25zdCBidWYgPSBuZXcgVWludDhBcnJheShbXG4gICAgICAgIDB4MjIsIDB4NmUsIDB4NDQsIDB4MDIsIDB4N2YsIDB4ZmMsIDB4NDUsIDB4NDMsIDB4ODUsIDB4YzksIDB4NDYsIDB4MjIsXG4gICAgICAgIDB4YzUsIDB4MGEsIDB4NWIsIDB4MTQsXG4gICAgICBdKTtcblxuICAgICAgYXNzZXJ0LmRlZXBFcXVhbChcbiAgICAgICAgYnl0ZXNUb1V1aWQoYnVmKSxcbiAgICAgICAgJzIyNmU0NDAyLTdmZmMtNDU0My04NWM5LTQ2MjJjNTBhNWIxNCdcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyB1bmRlZmluZWQgaWYgcGFzc2VkIGFuIGFsbC16ZXJvIGJ1ZmZlcicsICgpID0+IHtcbiAgICAgIGFzc2VydC5pc1VuZGVmaW5lZChieXRlc1RvVXVpZChuZXcgVWludDhBcnJheSgxNikpKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIHVuZGVmaW5lZCBpZiBwYXNzZWQgdGhlIHdyb25nIG51bWJlciBvZiBieXRlcycsICgpID0+IHtcbiAgICAgIGFzc2VydC5pc1VuZGVmaW5lZChieXRlc1RvVXVpZChuZXcgVWludDhBcnJheSgwKSkpO1xuICAgICAgYXNzZXJ0LmlzVW5kZWZpbmVkKGJ5dGVzVG9VdWlkKG5ldyBVaW50OEFycmF5KFsweDIyXSkpKTtcbiAgICAgIGFzc2VydC5pc1VuZGVmaW5lZChieXRlc1RvVXVpZChuZXcgVWludDhBcnJheShBcnJheSgxNykuZmlsbCgweDIyKSkpKTtcbiAgICB9KTtcbiAgfSk7XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7OztBQUdBLGtCQUF1QjtBQUV2QixZQUF1QjtBQUN2QixZQUF1QjtBQUN2QixvQkFzQk87QUFFUCxTQUFTLFVBQVUsTUFBTTtBQUN2QixXQUFTLDBDQUEwQyxNQUFNO0FBQ3ZELFVBQU0scUJBQXFCO0FBQzNCLGFBQVMsMkNBQTJDLE1BQU07QUFDeEQsU0FBRyx1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QSxRQUFNO0FBQUEsUUFDbEU7QUFBQSxRQUFNO0FBQUEsUUFBTTtBQUFBLFFBQU07QUFBQSxNQUNwQixDQUFDO0FBRUQseUJBQU8sVUFDTCwrQkFBWSxzQ0FBc0MsR0FDbEQsY0FDRjtBQUNBLHlCQUFPLFVBQ0wsK0JBQVksc0NBQXNDLEdBQ2xELGNBQ0Y7QUFBQSxJQUNGLENBQUM7QUFFRCxPQUFHLCtEQUErRCxNQUFNO0FBQ3RFLHlCQUFPLFVBQVUsK0JBQVksRUFBRSxHQUFHLElBQUksV0FBVyxDQUFDLENBQUM7QUFDbkQseUJBQU8sVUFBVSwrQkFBWSxLQUFLLEdBQUcsSUFBSSxXQUFXLENBQUMsQ0FBQztBQUN0RCx5QkFBTyxVQUNMLCtCQUFZLGtDQUFrQyxHQUM5QyxJQUFJLFdBQVcsQ0FBQyxDQUNsQjtBQUNBLHlCQUFPLFVBQ0wsK0JBQVksZ0RBQWdELEdBQzVELElBQUksV0FBVyxDQUFDLENBQ2xCO0FBQUEsSUFDRixDQUFDO0FBQUEsRUFDSCxDQUFDO0FBRUQsV0FBUyxlQUFlLE1BQU07QUFDNUIsT0FBRyw4Q0FBOEMsTUFBTTtBQUNyRCxZQUFNLE1BQU0sSUFBSSxXQUFXO0FBQUEsUUFDekI7QUFBQSxRQUFNO0FBQUEsUUFBTTtBQUFBLFFBQU07QUFBQSxRQUFNO0FBQUEsUUFBTTtBQUFBLFFBQU07QUFBQSxRQUFNO0FBQUEsUUFBTTtBQUFBLFFBQU07QUFBQSxRQUFNO0FBQUEsUUFBTTtBQUFBLFFBQ2xFO0FBQUEsUUFBTTtBQUFBLFFBQU07QUFBQSxRQUFNO0FBQUEsTUFDcEIsQ0FBQztBQUVELHlCQUFPLFVBQ0wsK0JBQVksR0FBRyxHQUNmLHNDQUNGO0FBQUEsSUFDRixDQUFDO0FBRUQsT0FBRyxrREFBa0QsTUFBTTtBQUN6RCx5QkFBTyxZQUFZLCtCQUFZLElBQUksV0FBVyxFQUFFLENBQUMsQ0FBQztBQUFBLElBQ3BELENBQUM7QUFFRCxPQUFHLHlEQUF5RCxNQUFNO0FBQ2hFLHlCQUFPLFlBQVksK0JBQVksSUFBSSxXQUFXLENBQUMsQ0FBQyxDQUFDO0FBQ2pELHlCQUFPLFlBQVksK0JBQVksSUFBSSxXQUFXLENBQUMsRUFBSSxDQUFDLENBQUMsQ0FBQztBQUN0RCx5QkFBTyxZQUFZLCtCQUFZLElBQUksV0FBVyxNQUFNLEVBQUUsRUFBRSxLQUFLLEVBQUksQ0FBQyxDQUFDLENBQUM7QUFBQSxJQUN0RSxDQUFDO0FBQUEsRUFDSCxDQUFDO0FBQ0gsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
