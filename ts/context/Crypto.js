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
  Crypto: () => Crypto
});
module.exports = __toCommonJS(Crypto_exports);
var import_buffer = require("buffer");
var import_crypto = __toESM(require("crypto"));
var import_assert = require("../util/assert");
var import_Crypto = require("../types/Crypto");
const AUTH_TAG_SIZE = 16;
class Crypto {
  sign(key, data) {
    return import_crypto.default.createHmac("sha256", import_buffer.Buffer.from(key)).update(import_buffer.Buffer.from(data)).digest();
  }
  hash(type, data) {
    return import_crypto.default.createHash(type).update(import_buffer.Buffer.from(data)).digest();
  }
  encrypt(cipherType, {
    key,
    plaintext,
    iv,
    aad
  }) {
    if (cipherType === import_Crypto.CipherType.AES256GCM) {
      const gcm = import_crypto.default.createCipheriv(cipherType, import_buffer.Buffer.from(key), import_buffer.Buffer.from(iv));
      if (aad) {
        gcm.setAAD(aad);
      }
      const first = gcm.update(import_buffer.Buffer.from(plaintext));
      const last = gcm.final();
      const tag = gcm.getAuthTag();
      (0, import_assert.strictAssert)(tag.length === AUTH_TAG_SIZE, "Invalid auth tag size");
      return import_buffer.Buffer.concat([first, last, tag]);
    }
    (0, import_assert.strictAssert)(aad === void 0, `AAD is not supported for: ${cipherType}`);
    const cipher = import_crypto.default.createCipheriv(cipherType, import_buffer.Buffer.from(key), import_buffer.Buffer.from(iv));
    return import_buffer.Buffer.concat([
      cipher.update(import_buffer.Buffer.from(plaintext)),
      cipher.final()
    ]);
  }
  decrypt(cipherType, {
    key,
    ciphertext,
    iv,
    aad
  }) {
    let decipher;
    let input = import_buffer.Buffer.from(ciphertext);
    if (cipherType === import_Crypto.CipherType.AES256GCM) {
      const gcm = import_crypto.default.createDecipheriv(cipherType, import_buffer.Buffer.from(key), import_buffer.Buffer.from(iv));
      if (input.length < AUTH_TAG_SIZE) {
        throw new Error("Invalid GCM ciphertext");
      }
      const tag = input.slice(input.length - AUTH_TAG_SIZE);
      input = input.slice(0, input.length - AUTH_TAG_SIZE);
      gcm.setAuthTag(tag);
      if (aad) {
        gcm.setAAD(aad);
      }
      decipher = gcm;
    } else {
      (0, import_assert.strictAssert)(aad === void 0, `AAD is not supported for: ${cipherType}`);
      decipher = import_crypto.default.createDecipheriv(cipherType, import_buffer.Buffer.from(key), import_buffer.Buffer.from(iv));
    }
    return import_buffer.Buffer.concat([decipher.update(input), decipher.final()]);
  }
  getRandomBytes(size) {
    return import_crypto.default.randomBytes(size);
  }
  constantTimeEqual(left, right) {
    return import_crypto.default.timingSafeEqual(import_buffer.Buffer.from(left), import_buffer.Buffer.from(right));
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Crypto
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ3J5cHRvLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IEJ1ZmZlciB9IGZyb20gJ2J1ZmZlcic7XG5pbXBvcnQgdHlwZSB7IERlY2lwaGVyIH0gZnJvbSAnY3J5cHRvJztcbmltcG9ydCBjcnlwdG8gZnJvbSAnY3J5cHRvJztcblxuaW1wb3J0IHsgc3RyaWN0QXNzZXJ0IH0gZnJvbSAnLi4vdXRpbC9hc3NlcnQnO1xuaW1wb3J0IHR5cGUgeyBIYXNoVHlwZSB9IGZyb20gJy4uL3R5cGVzL0NyeXB0byc7XG5pbXBvcnQgeyBDaXBoZXJUeXBlIH0gZnJvbSAnLi4vdHlwZXMvQ3J5cHRvJztcblxuY29uc3QgQVVUSF9UQUdfU0laRSA9IDE2O1xuXG5leHBvcnQgY2xhc3MgQ3J5cHRvIHtcbiAgcHVibGljIHNpZ24oa2V5OiBVaW50OEFycmF5LCBkYXRhOiBVaW50OEFycmF5KTogVWludDhBcnJheSB7XG4gICAgcmV0dXJuIGNyeXB0b1xuICAgICAgLmNyZWF0ZUhtYWMoJ3NoYTI1NicsIEJ1ZmZlci5mcm9tKGtleSkpXG4gICAgICAudXBkYXRlKEJ1ZmZlci5mcm9tKGRhdGEpKVxuICAgICAgLmRpZ2VzdCgpO1xuICB9XG5cbiAgcHVibGljIGhhc2godHlwZTogSGFzaFR5cGUsIGRhdGE6IFVpbnQ4QXJyYXkpOiBVaW50OEFycmF5IHtcbiAgICByZXR1cm4gY3J5cHRvLmNyZWF0ZUhhc2godHlwZSkudXBkYXRlKEJ1ZmZlci5mcm9tKGRhdGEpKS5kaWdlc3QoKTtcbiAgfVxuXG4gIHB1YmxpYyBlbmNyeXB0KFxuICAgIGNpcGhlclR5cGU6IENpcGhlclR5cGUsXG4gICAge1xuICAgICAga2V5LFxuICAgICAgcGxhaW50ZXh0LFxuICAgICAgaXYsXG4gICAgICBhYWQsXG4gICAgfTogUmVhZG9ubHk8e1xuICAgICAga2V5OiBVaW50OEFycmF5O1xuICAgICAgcGxhaW50ZXh0OiBVaW50OEFycmF5O1xuICAgICAgaXY6IFVpbnQ4QXJyYXk7XG4gICAgICBhYWQ/OiBVaW50OEFycmF5O1xuICAgIH0+XG4gICk6IFVpbnQ4QXJyYXkge1xuICAgIGlmIChjaXBoZXJUeXBlID09PSBDaXBoZXJUeXBlLkFFUzI1NkdDTSkge1xuICAgICAgY29uc3QgZ2NtID0gY3J5cHRvLmNyZWF0ZUNpcGhlcml2KFxuICAgICAgICBjaXBoZXJUeXBlLFxuICAgICAgICBCdWZmZXIuZnJvbShrZXkpLFxuICAgICAgICBCdWZmZXIuZnJvbShpdilcbiAgICAgICk7XG5cbiAgICAgIGlmIChhYWQpIHtcbiAgICAgICAgZ2NtLnNldEFBRChhYWQpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBmaXJzdCA9IGdjbS51cGRhdGUoQnVmZmVyLmZyb20ocGxhaW50ZXh0KSk7XG4gICAgICBjb25zdCBsYXN0ID0gZ2NtLmZpbmFsKCk7XG4gICAgICBjb25zdCB0YWcgPSBnY20uZ2V0QXV0aFRhZygpO1xuICAgICAgc3RyaWN0QXNzZXJ0KHRhZy5sZW5ndGggPT09IEFVVEhfVEFHX1NJWkUsICdJbnZhbGlkIGF1dGggdGFnIHNpemUnKTtcblxuICAgICAgcmV0dXJuIEJ1ZmZlci5jb25jYXQoW2ZpcnN0LCBsYXN0LCB0YWddKTtcbiAgICB9XG5cbiAgICBzdHJpY3RBc3NlcnQoYWFkID09PSB1bmRlZmluZWQsIGBBQUQgaXMgbm90IHN1cHBvcnRlZCBmb3I6ICR7Y2lwaGVyVHlwZX1gKTtcbiAgICBjb25zdCBjaXBoZXIgPSBjcnlwdG8uY3JlYXRlQ2lwaGVyaXYoXG4gICAgICBjaXBoZXJUeXBlLFxuICAgICAgQnVmZmVyLmZyb20oa2V5KSxcbiAgICAgIEJ1ZmZlci5mcm9tKGl2KVxuICAgICk7XG4gICAgcmV0dXJuIEJ1ZmZlci5jb25jYXQoW1xuICAgICAgY2lwaGVyLnVwZGF0ZShCdWZmZXIuZnJvbShwbGFpbnRleHQpKSxcbiAgICAgIGNpcGhlci5maW5hbCgpLFxuICAgIF0pO1xuICB9XG5cbiAgcHVibGljIGRlY3J5cHQoXG4gICAgY2lwaGVyVHlwZTogQ2lwaGVyVHlwZSxcbiAgICB7XG4gICAgICBrZXksXG4gICAgICBjaXBoZXJ0ZXh0LFxuICAgICAgaXYsXG4gICAgICBhYWQsXG4gICAgfTogUmVhZG9ubHk8e1xuICAgICAga2V5OiBVaW50OEFycmF5O1xuICAgICAgY2lwaGVydGV4dDogVWludDhBcnJheTtcbiAgICAgIGl2OiBVaW50OEFycmF5O1xuICAgICAgYWFkPzogVWludDhBcnJheTtcbiAgICB9PlxuICApOiBVaW50OEFycmF5IHtcbiAgICBsZXQgZGVjaXBoZXI6IERlY2lwaGVyO1xuICAgIGxldCBpbnB1dCA9IEJ1ZmZlci5mcm9tKGNpcGhlcnRleHQpO1xuICAgIGlmIChjaXBoZXJUeXBlID09PSBDaXBoZXJUeXBlLkFFUzI1NkdDTSkge1xuICAgICAgY29uc3QgZ2NtID0gY3J5cHRvLmNyZWF0ZURlY2lwaGVyaXYoXG4gICAgICAgIGNpcGhlclR5cGUsXG4gICAgICAgIEJ1ZmZlci5mcm9tKGtleSksXG4gICAgICAgIEJ1ZmZlci5mcm9tKGl2KVxuICAgICAgKTtcblxuICAgICAgaWYgKGlucHV0Lmxlbmd0aCA8IEFVVEhfVEFHX1NJWkUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIEdDTSBjaXBoZXJ0ZXh0Jyk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHRhZyA9IGlucHV0LnNsaWNlKGlucHV0Lmxlbmd0aCAtIEFVVEhfVEFHX1NJWkUpO1xuICAgICAgaW5wdXQgPSBpbnB1dC5zbGljZSgwLCBpbnB1dC5sZW5ndGggLSBBVVRIX1RBR19TSVpFKTtcblxuICAgICAgZ2NtLnNldEF1dGhUYWcodGFnKTtcblxuICAgICAgaWYgKGFhZCkge1xuICAgICAgICBnY20uc2V0QUFEKGFhZCk7XG4gICAgICB9XG5cbiAgICAgIGRlY2lwaGVyID0gZ2NtO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdHJpY3RBc3NlcnQoXG4gICAgICAgIGFhZCA9PT0gdW5kZWZpbmVkLFxuICAgICAgICBgQUFEIGlzIG5vdCBzdXBwb3J0ZWQgZm9yOiAke2NpcGhlclR5cGV9YFxuICAgICAgKTtcbiAgICAgIGRlY2lwaGVyID0gY3J5cHRvLmNyZWF0ZURlY2lwaGVyaXYoXG4gICAgICAgIGNpcGhlclR5cGUsXG4gICAgICAgIEJ1ZmZlci5mcm9tKGtleSksXG4gICAgICAgIEJ1ZmZlci5mcm9tKGl2KVxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIEJ1ZmZlci5jb25jYXQoW2RlY2lwaGVyLnVwZGF0ZShpbnB1dCksIGRlY2lwaGVyLmZpbmFsKCldKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRSYW5kb21CeXRlcyhzaXplOiBudW1iZXIpOiBVaW50OEFycmF5IHtcbiAgICByZXR1cm4gY3J5cHRvLnJhbmRvbUJ5dGVzKHNpemUpO1xuICB9XG5cbiAgcHVibGljIGNvbnN0YW50VGltZUVxdWFsKGxlZnQ6IFVpbnQ4QXJyYXksIHJpZ2h0OiBVaW50OEFycmF5KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGNyeXB0by50aW1pbmdTYWZlRXF1YWwoQnVmZmVyLmZyb20obGVmdCksIEJ1ZmZlci5mcm9tKHJpZ2h0KSk7XG4gIH1cbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxvQkFBdUI7QUFFdkIsb0JBQW1CO0FBRW5CLG9CQUE2QjtBQUU3QixvQkFBMkI7QUFFM0IsTUFBTSxnQkFBZ0I7QUFFZixNQUFNLE9BQU87QUFBQSxFQUNYLEtBQUssS0FBaUIsTUFBOEI7QUFDekQsV0FBTyxzQkFDSixXQUFXLFVBQVUscUJBQU8sS0FBSyxHQUFHLENBQUMsRUFDckMsT0FBTyxxQkFBTyxLQUFLLElBQUksQ0FBQyxFQUN4QixPQUFPO0FBQUEsRUFDWjtBQUFBLEVBRU8sS0FBSyxNQUFnQixNQUE4QjtBQUN4RCxX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
