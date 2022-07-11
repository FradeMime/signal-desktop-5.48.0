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
var import_Crypto = require("../Crypto");
var import_Curve = require("../Curve");
describe("Curve", () => {
  it("verifySignature roundtrip", () => {
    const message = Buffer.from("message");
    const { pubKey, privKey } = (0, import_Curve.generateKeyPair)();
    const signature = (0, import_Curve.calculateSignature)(privKey, message);
    const verified = (0, import_Curve.verifySignature)(pubKey, message, signature);
    import_chai.assert.isTrue(verified);
  });
  it("calculateAgreement roundtrip", () => {
    const alice = (0, import_Curve.generateKeyPair)();
    const bob = (0, import_Curve.generateKeyPair)();
    const sharedSecretAlice = (0, import_Curve.calculateAgreement)(bob.pubKey, alice.privKey);
    const sharedSecretBob = (0, import_Curve.calculateAgreement)(alice.pubKey, bob.privKey);
    import_chai.assert.isTrue((0, import_Crypto.constantTimeEqual)(sharedSecretAlice, sharedSecretBob));
  });
  describe("#isNonNegativeInteger", () => {
    it("returns false for -1, Infinity, NaN, a string, etc.", () => {
      import_chai.assert.isFalse((0, import_Curve.isNonNegativeInteger)(-1));
      import_chai.assert.isFalse((0, import_Curve.isNonNegativeInteger)(NaN));
      import_chai.assert.isFalse((0, import_Curve.isNonNegativeInteger)(Infinity));
      import_chai.assert.isFalse((0, import_Curve.isNonNegativeInteger)("woo!"));
    });
    it("returns true for 0 and positive integgers", () => {
      import_chai.assert.isTrue((0, import_Curve.isNonNegativeInteger)(0));
      import_chai.assert.isTrue((0, import_Curve.isNonNegativeInteger)(1));
      import_chai.assert.isTrue((0, import_Curve.isNonNegativeInteger)(3));
      import_chai.assert.isTrue((0, import_Curve.isNonNegativeInteger)(4e5));
    });
  });
  describe("#generateSignedPrekey", () => {
    it("geernates proper signature for created signed prekeys", () => {
      const keyId = 4;
      const identityKeyPair = (0, import_Curve.generateKeyPair)();
      const signedPreKey = (0, import_Curve.generateSignedPreKey)(identityKeyPair, keyId);
      import_chai.assert.equal(keyId, signedPreKey.keyId);
      const verified = (0, import_Curve.verifySignature)(identityKeyPair.pubKey, signedPreKey.keyPair.pubKey, signedPreKey.signature);
      import_chai.assert.isTrue(verified);
    });
  });
  describe("#generatePrekey", () => {
    it("returns keys of the right length", () => {
      const keyId = 7;
      const preKey = (0, import_Curve.generatePreKey)(keyId);
      import_chai.assert.equal(keyId, preKey.keyId);
      import_chai.assert.equal(33, preKey.keyPair.pubKey.byteLength);
      import_chai.assert.equal(32, preKey.keyPair.privKey.byteLength);
    });
  });
  describe("#createKeyPair", () => {
    it("does not modify unclamped private key", () => {
      const initialHex = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
      const privateKey = Bytes.fromHex(initialHex);
      const copyOfPrivateKey = new Uint8Array(privateKey);
      import_chai.assert.isTrue((0, import_Crypto.constantTimeEqual)(privateKey, copyOfPrivateKey), "initial copy check");
      const keyPair = (0, import_Curve.createKeyPair)(privateKey);
      import_chai.assert.equal(32, keyPair.privKey.byteLength);
      import_chai.assert.equal(33, keyPair.pubKey.byteLength);
      import_chai.assert.isTrue((0, import_Crypto.constantTimeEqual)(privateKey, copyOfPrivateKey), "second copy check");
      import_chai.assert.notEqual(initialHex, Bytes.toHex(keyPair.privKey), "keypair check");
      import_chai.assert.isFalse((0, import_Crypto.constantTimeEqual)(keyPair.privKey, privateKey), "keypair vs incoming value");
    });
    it("does not modify clamped private key", () => {
      const initialHex = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
      const privateKey = Bytes.fromHex(initialHex);
      (0, import_Curve.clampPrivateKey)(privateKey);
      const postClampHex = Bytes.toHex(privateKey);
      const copyOfPrivateKey = new Uint8Array(privateKey);
      import_chai.assert.notEqual(postClampHex, initialHex, "initial clamp check");
      import_chai.assert.isTrue((0, import_Crypto.constantTimeEqual)(privateKey, copyOfPrivateKey), "initial copy check");
      const keyPair = (0, import_Curve.createKeyPair)(privateKey);
      import_chai.assert.equal(32, keyPair.privKey.byteLength);
      import_chai.assert.equal(33, keyPair.pubKey.byteLength);
      import_chai.assert.isTrue((0, import_Crypto.constantTimeEqual)(privateKey, copyOfPrivateKey), "second copy check");
      import_chai.assert.equal(postClampHex, Bytes.toHex(keyPair.privKey), "keypair check");
      import_chai.assert.isTrue((0, import_Crypto.constantTimeEqual)(privateKey, keyPair.privKey), "keypair vs incoming value");
    });
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ3VydmVfdGVzdC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyBhc3NlcnQgfSBmcm9tICdjaGFpJztcblxuaW1wb3J0ICogYXMgQnl0ZXMgZnJvbSAnLi4vQnl0ZXMnO1xuaW1wb3J0IHsgY29uc3RhbnRUaW1lRXF1YWwgfSBmcm9tICcuLi9DcnlwdG8nO1xuaW1wb3J0IHtcbiAgY2FsY3VsYXRlU2lnbmF0dXJlLFxuICBjbGFtcFByaXZhdGVLZXksXG4gIGNyZWF0ZUtleVBhaXIsXG4gIGNhbGN1bGF0ZUFncmVlbWVudCxcbiAgZ2VuZXJhdGVLZXlQYWlyLFxuICBnZW5lcmF0ZVByZUtleSxcbiAgZ2VuZXJhdGVTaWduZWRQcmVLZXksXG4gIGlzTm9uTmVnYXRpdmVJbnRlZ2VyLFxuICB2ZXJpZnlTaWduYXR1cmUsXG59IGZyb20gJy4uL0N1cnZlJztcblxuZGVzY3JpYmUoJ0N1cnZlJywgKCkgPT4ge1xuICBpdCgndmVyaWZ5U2lnbmF0dXJlIHJvdW5kdHJpcCcsICgpID0+IHtcbiAgICBjb25zdCBtZXNzYWdlID0gQnVmZmVyLmZyb20oJ21lc3NhZ2UnKTtcbiAgICBjb25zdCB7IHB1YktleSwgcHJpdktleSB9ID0gZ2VuZXJhdGVLZXlQYWlyKCk7XG4gICAgY29uc3Qgc2lnbmF0dXJlID0gY2FsY3VsYXRlU2lnbmF0dXJlKHByaXZLZXksIG1lc3NhZ2UpO1xuICAgIGNvbnN0IHZlcmlmaWVkID0gdmVyaWZ5U2lnbmF0dXJlKHB1YktleSwgbWVzc2FnZSwgc2lnbmF0dXJlKTtcblxuICAgIGFzc2VydC5pc1RydWUodmVyaWZpZWQpO1xuICB9KTtcblxuICBpdCgnY2FsY3VsYXRlQWdyZWVtZW50IHJvdW5kdHJpcCcsICgpID0+IHtcbiAgICBjb25zdCBhbGljZSA9IGdlbmVyYXRlS2V5UGFpcigpO1xuICAgIGNvbnN0IGJvYiA9IGdlbmVyYXRlS2V5UGFpcigpO1xuXG4gICAgY29uc3Qgc2hhcmVkU2VjcmV0QWxpY2UgPSBjYWxjdWxhdGVBZ3JlZW1lbnQoYm9iLnB1YktleSwgYWxpY2UucHJpdktleSk7XG4gICAgY29uc3Qgc2hhcmVkU2VjcmV0Qm9iID0gY2FsY3VsYXRlQWdyZWVtZW50KGFsaWNlLnB1YktleSwgYm9iLnByaXZLZXkpO1xuXG4gICAgYXNzZXJ0LmlzVHJ1ZShjb25zdGFudFRpbWVFcXVhbChzaGFyZWRTZWNyZXRBbGljZSwgc2hhcmVkU2VjcmV0Qm9iKSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCcjaXNOb25OZWdhdGl2ZUludGVnZXInLCAoKSA9PiB7XG4gICAgaXQoJ3JldHVybnMgZmFsc2UgZm9yIC0xLCBJbmZpbml0eSwgTmFOLCBhIHN0cmluZywgZXRjLicsICgpID0+IHtcbiAgICAgIGFzc2VydC5pc0ZhbHNlKGlzTm9uTmVnYXRpdmVJbnRlZ2VyKC0xKSk7XG4gICAgICBhc3NlcnQuaXNGYWxzZShpc05vbk5lZ2F0aXZlSW50ZWdlcihOYU4pKTtcbiAgICAgIGFzc2VydC5pc0ZhbHNlKGlzTm9uTmVnYXRpdmVJbnRlZ2VyKEluZmluaXR5KSk7XG4gICAgICBhc3NlcnQuaXNGYWxzZShpc05vbk5lZ2F0aXZlSW50ZWdlcignd29vIScpKTtcbiAgICB9KTtcbiAgICBpdCgncmV0dXJucyB0cnVlIGZvciAwIGFuZCBwb3NpdGl2ZSBpbnRlZ2dlcnMnLCAoKSA9PiB7XG4gICAgICBhc3NlcnQuaXNUcnVlKGlzTm9uTmVnYXRpdmVJbnRlZ2VyKDApKTtcbiAgICAgIGFzc2VydC5pc1RydWUoaXNOb25OZWdhdGl2ZUludGVnZXIoMSkpO1xuICAgICAgYXNzZXJ0LmlzVHJ1ZShpc05vbk5lZ2F0aXZlSW50ZWdlcigzKSk7XG4gICAgICBhc3NlcnQuaXNUcnVlKGlzTm9uTmVnYXRpdmVJbnRlZ2VyKDQwMF8wMDApKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJyNnZW5lcmF0ZVNpZ25lZFByZWtleScsICgpID0+IHtcbiAgICBpdCgnZ2Vlcm5hdGVzIHByb3BlciBzaWduYXR1cmUgZm9yIGNyZWF0ZWQgc2lnbmVkIHByZWtleXMnLCAoKSA9PiB7XG4gICAgICBjb25zdCBrZXlJZCA9IDQ7XG4gICAgICBjb25zdCBpZGVudGl0eUtleVBhaXIgPSBnZW5lcmF0ZUtleVBhaXIoKTtcbiAgICAgIGNvbnN0IHNpZ25lZFByZUtleSA9IGdlbmVyYXRlU2lnbmVkUHJlS2V5KGlkZW50aXR5S2V5UGFpciwga2V5SWQpO1xuXG4gICAgICBhc3NlcnQuZXF1YWwoa2V5SWQsIHNpZ25lZFByZUtleS5rZXlJZCk7XG5cbiAgICAgIGNvbnN0IHZlcmlmaWVkID0gdmVyaWZ5U2lnbmF0dXJlKFxuICAgICAgICBpZGVudGl0eUtleVBhaXIucHViS2V5LFxuICAgICAgICBzaWduZWRQcmVLZXkua2V5UGFpci5wdWJLZXksXG4gICAgICAgIHNpZ25lZFByZUtleS5zaWduYXR1cmVcbiAgICAgICk7XG5cbiAgICAgIGFzc2VydC5pc1RydWUodmVyaWZpZWQpO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnI2dlbmVyYXRlUHJla2V5JywgKCkgPT4ge1xuICAgIGl0KCdyZXR1cm5zIGtleXMgb2YgdGhlIHJpZ2h0IGxlbmd0aCcsICgpID0+IHtcbiAgICAgIGNvbnN0IGtleUlkID0gNztcbiAgICAgIGNvbnN0IHByZUtleSA9IGdlbmVyYXRlUHJlS2V5KGtleUlkKTtcblxuICAgICAgYXNzZXJ0LmVxdWFsKGtleUlkLCBwcmVLZXkua2V5SWQpO1xuICAgICAgYXNzZXJ0LmVxdWFsKDMzLCBwcmVLZXkua2V5UGFpci5wdWJLZXkuYnl0ZUxlbmd0aCk7XG4gICAgICBhc3NlcnQuZXF1YWwoMzIsIHByZUtleS5rZXlQYWlyLnByaXZLZXkuYnl0ZUxlbmd0aCk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCcjY3JlYXRlS2V5UGFpcicsICgpID0+IHtcbiAgICBpdCgnZG9lcyBub3QgbW9kaWZ5IHVuY2xhbXBlZCBwcml2YXRlIGtleScsICgpID0+IHtcbiAgICAgIGNvbnN0IGluaXRpYWxIZXggPVxuICAgICAgICAnYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYSc7XG4gICAgICBjb25zdCBwcml2YXRlS2V5ID0gQnl0ZXMuZnJvbUhleChpbml0aWFsSGV4KTtcbiAgICAgIGNvbnN0IGNvcHlPZlByaXZhdGVLZXkgPSBuZXcgVWludDhBcnJheShwcml2YXRlS2V5KTtcblxuICAgICAgYXNzZXJ0LmlzVHJ1ZShcbiAgICAgICAgY29uc3RhbnRUaW1lRXF1YWwocHJpdmF0ZUtleSwgY29weU9mUHJpdmF0ZUtleSksXG4gICAgICAgICdpbml0aWFsIGNvcHkgY2hlY2snXG4gICAgICApO1xuXG4gICAgICBjb25zdCBrZXlQYWlyID0gY3JlYXRlS2V5UGFpcihwcml2YXRlS2V5KTtcblxuICAgICAgYXNzZXJ0LmVxdWFsKDMyLCBrZXlQYWlyLnByaXZLZXkuYnl0ZUxlbmd0aCk7XG4gICAgICBhc3NlcnQuZXF1YWwoMzMsIGtleVBhaXIucHViS2V5LmJ5dGVMZW5ndGgpO1xuXG4gICAgICAvLyBUaGUgb3JpZ2luYWwgaW5jb21pbmcga2V5IGlzIG5vdCBtb2RpZmllZFxuICAgICAgYXNzZXJ0LmlzVHJ1ZShcbiAgICAgICAgY29uc3RhbnRUaW1lRXF1YWwocHJpdmF0ZUtleSwgY29weU9mUHJpdmF0ZUtleSksXG4gICAgICAgICdzZWNvbmQgY29weSBjaGVjaydcbiAgICAgICk7XG5cbiAgICAgIC8vIEJ1dCB0aGUga2V5cGFpciB0aGF0IGNvbWVzIG91dCBoYXMgaW5kZWVkIGJlZW4gdXBkYXRlZFxuICAgICAgYXNzZXJ0Lm5vdEVxdWFsKFxuICAgICAgICBpbml0aWFsSGV4LFxuICAgICAgICBCeXRlcy50b0hleChrZXlQYWlyLnByaXZLZXkpLFxuICAgICAgICAna2V5cGFpciBjaGVjaydcbiAgICAgICk7XG4gICAgICBhc3NlcnQuaXNGYWxzZShcbiAgICAgICAgY29uc3RhbnRUaW1lRXF1YWwoa2V5UGFpci5wcml2S2V5LCBwcml2YXRlS2V5KSxcbiAgICAgICAgJ2tleXBhaXIgdnMgaW5jb21pbmcgdmFsdWUnXG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgaXQoJ2RvZXMgbm90IG1vZGlmeSBjbGFtcGVkIHByaXZhdGUga2V5JywgKCkgPT4ge1xuICAgICAgY29uc3QgaW5pdGlhbEhleCA9XG4gICAgICAgICdhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhJztcbiAgICAgIGNvbnN0IHByaXZhdGVLZXkgPSBCeXRlcy5mcm9tSGV4KGluaXRpYWxIZXgpO1xuICAgICAgY2xhbXBQcml2YXRlS2V5KHByaXZhdGVLZXkpO1xuICAgICAgY29uc3QgcG9zdENsYW1wSGV4ID0gQnl0ZXMudG9IZXgocHJpdmF0ZUtleSk7XG4gICAgICBjb25zdCBjb3B5T2ZQcml2YXRlS2V5ID0gbmV3IFVpbnQ4QXJyYXkocHJpdmF0ZUtleSk7XG5cbiAgICAgIGFzc2VydC5ub3RFcXVhbChwb3N0Q2xhbXBIZXgsIGluaXRpYWxIZXgsICdpbml0aWFsIGNsYW1wIGNoZWNrJyk7XG4gICAgICBhc3NlcnQuaXNUcnVlKFxuICAgICAgICBjb25zdGFudFRpbWVFcXVhbChwcml2YXRlS2V5LCBjb3B5T2ZQcml2YXRlS2V5KSxcbiAgICAgICAgJ2luaXRpYWwgY29weSBjaGVjaydcbiAgICAgICk7XG5cbiAgICAgIGNvbnN0IGtleVBhaXIgPSBjcmVhdGVLZXlQYWlyKHByaXZhdGVLZXkpO1xuXG4gICAgICBhc3NlcnQuZXF1YWwoMzIsIGtleVBhaXIucHJpdktleS5ieXRlTGVuZ3RoKTtcbiAgICAgIGFzc2VydC5lcXVhbCgzMywga2V5UGFpci5wdWJLZXkuYnl0ZUxlbmd0aCk7XG5cbiAgICAgIC8vIFRoZSBvcmlnaW5hbCBpbmNvbWluZyBrZXkgaXMgbm90IG1vZGlmaWVkXG4gICAgICBhc3NlcnQuaXNUcnVlKFxuICAgICAgICBjb25zdGFudFRpbWVFcXVhbChwcml2YXRlS2V5LCBjb3B5T2ZQcml2YXRlS2V5KSxcbiAgICAgICAgJ3NlY29uZCBjb3B5IGNoZWNrJ1xuICAgICAgKTtcblxuICAgICAgLy8gVGhlIGtleXBhaXIgdGhhdCBjb21lcyBvdXQgaGFzbid0IGJlZW4gdXBkYXRlZCBlaXRoZXJcbiAgICAgIGFzc2VydC5lcXVhbChwb3N0Q2xhbXBIZXgsIEJ5dGVzLnRvSGV4KGtleVBhaXIucHJpdktleSksICdrZXlwYWlyIGNoZWNrJyk7XG4gICAgICBhc3NlcnQuaXNUcnVlKFxuICAgICAgICBjb25zdGFudFRpbWVFcXVhbChwcml2YXRlS2V5LCBrZXlQYWlyLnByaXZLZXkpLFxuICAgICAgICAna2V5cGFpciB2cyBpbmNvbWluZyB2YWx1ZSdcbiAgICAgICk7XG4gICAgfSk7XG4gIH0pO1xufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7QUFHQSxrQkFBdUI7QUFFdkIsWUFBdUI7QUFDdkIsb0JBQWtDO0FBQ2xDLG1CQVVPO0FBRVAsU0FBUyxTQUFTLE1BQU07QUFDdEIsS0FBRyw2QkFBNkIsTUFBTTtBQUNwQyxVQUFNLFVBQVUsT0FBTyxLQUFLLFNBQVM7QUFDckMsVUFBTSxFQUFFLFFBQVEsWUFBWSxrQ0FBZ0I7QUFDNUMsVUFBTSxZQUFZLHFDQUFtQixTQUFTLE9BQU87QUFDckQsVUFBTSxXQUFXLGtDQUFnQixRQUFRLFNBQVMsU0FBUztBQUUzRCx1QkFBTyxPQUFPLFFBQVE7QUFBQSxFQUN4QixDQUFDO0FBRUQsS0FBRyxnQ0FBZ0MsTUFBTTtBQUN2QyxVQUFNLFFBQVEsa0NBQWdCO0FBQzlCLFVBQU0sTUFBTSxrQ0FBZ0I7QUFFNUIsVUFBTSxvQkFBb0IscUNBQW1CLElBQUksUUFBUSxNQUFNLE9BQU87QUFDdEUsVUFBTSxrQkFBa0IscUNBQW1CLE1BQU0sUUFBUSxJQUFJLE9BQU87QUFF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
