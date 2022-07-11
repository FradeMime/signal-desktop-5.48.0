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
var ProvisioningCipher_exports = {};
__export(ProvisioningCipher_exports, {
  default: () => ProvisioningCipher
});
module.exports = __toCommonJS(ProvisioningCipher_exports);
var Bytes = __toESM(require("../Bytes"));
var import_Crypto = require("../Crypto");
var import_Curve = require("../Curve");
var import_protobuf = require("../protobuf");
var import_assert = require("../util/assert");
var import_normalizeUuid = require("../util/normalizeUuid");
class ProvisioningCipherInner {
  async decrypt(provisionEnvelope) {
    (0, import_assert.strictAssert)(provisionEnvelope.publicKey && provisionEnvelope.body, "Missing required fields in ProvisionEnvelope");
    const masterEphemeral = provisionEnvelope.publicKey;
    const message = provisionEnvelope.body;
    if (new Uint8Array(message)[0] !== 1) {
      throw new Error("Bad version number on ProvisioningMessage");
    }
    const iv = message.slice(1, 16 + 1);
    const mac = message.slice(message.byteLength - 32, message.byteLength);
    const ivAndCiphertext = message.slice(0, message.byteLength - 32);
    const ciphertext = message.slice(16 + 1, message.byteLength - 32);
    if (!this.keyPair) {
      throw new Error("ProvisioningCipher.decrypt: No keypair!");
    }
    const ecRes = (0, import_Curve.calculateAgreement)(masterEphemeral, this.keyPair.privKey);
    const keys = (0, import_Crypto.deriveSecrets)(ecRes, new Uint8Array(32), Bytes.fromString("TextSecure Provisioning Message"));
    (0, import_Crypto.verifyHmacSha256)(ivAndCiphertext, keys[1], mac, 32);
    const plaintext = (0, import_Crypto.decryptAes256CbcPkcsPadding)(keys[0], ciphertext, iv);
    const provisionMessage = import_protobuf.SignalService.ProvisionMessage.decode(plaintext);
    const aciPrivKey = provisionMessage.aciIdentityKeyPrivate;
    const pniPrivKey = provisionMessage.pniIdentityKeyPrivate;
    (0, import_assert.strictAssert)(aciPrivKey, "Missing aciKeyPrivate in ProvisionMessage");
    const aciKeyPair = (0, import_Curve.createKeyPair)(aciPrivKey);
    const pniKeyPair = pniPrivKey?.length ? (0, import_Curve.createKeyPair)(pniPrivKey) : void 0;
    const { aci, pni } = provisionMessage;
    (0, import_assert.strictAssert)(aci, "Missing aci in provisioning message");
    const ret = {
      aciKeyPair,
      pniKeyPair,
      number: provisionMessage.number,
      aci: (0, import_normalizeUuid.normalizeUuid)(aci, "ProvisionMessage.aci"),
      pni: pni ? (0, import_normalizeUuid.normalizeUuid)(pni, "ProvisionMessage.pni") : void 0,
      provisioningCode: provisionMessage.provisioningCode,
      userAgent: provisionMessage.userAgent,
      readReceipts: provisionMessage.readReceipts
    };
    if (provisionMessage.profileKey) {
      ret.profileKey = provisionMessage.profileKey;
    }
    return ret;
  }
  async getPublicKey() {
    if (!this.keyPair) {
      this.keyPair = (0, import_Curve.generateKeyPair)();
    }
    if (!this.keyPair) {
      throw new Error("ProvisioningCipher.decrypt: No keypair!");
    }
    return this.keyPair.pubKey;
  }
}
class ProvisioningCipher {
  constructor() {
    const inner = new ProvisioningCipherInner();
    this.decrypt = inner.decrypt.bind(inner);
    this.getPublicKey = inner.getPublicKey.bind(inner);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiUHJvdmlzaW9uaW5nQ2lwaGVyLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMC0yMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuLyogZXNsaW50LWRpc2FibGUgbWF4LWNsYXNzZXMtcGVyLWZpbGUgKi9cblxuaW1wb3J0IHR5cGUgeyBLZXlQYWlyVHlwZSB9IGZyb20gJy4vVHlwZXMuZCc7XG5pbXBvcnQgKiBhcyBCeXRlcyBmcm9tICcuLi9CeXRlcyc7XG5pbXBvcnQge1xuICBkZWNyeXB0QWVzMjU2Q2JjUGtjc1BhZGRpbmcsXG4gIGRlcml2ZVNlY3JldHMsXG4gIHZlcmlmeUhtYWNTaGEyNTYsXG59IGZyb20gJy4uL0NyeXB0byc7XG5pbXBvcnQgeyBjYWxjdWxhdGVBZ3JlZW1lbnQsIGNyZWF0ZUtleVBhaXIsIGdlbmVyYXRlS2V5UGFpciB9IGZyb20gJy4uL0N1cnZlJztcbmltcG9ydCB7IFNpZ25hbFNlcnZpY2UgYXMgUHJvdG8gfSBmcm9tICcuLi9wcm90b2J1Zic7XG5pbXBvcnQgeyBzdHJpY3RBc3NlcnQgfSBmcm9tICcuLi91dGlsL2Fzc2VydCc7XG5pbXBvcnQgeyBub3JtYWxpemVVdWlkIH0gZnJvbSAnLi4vdXRpbC9ub3JtYWxpemVVdWlkJztcblxudHlwZSBQcm92aXNpb25EZWNyeXB0UmVzdWx0ID0ge1xuICBhY2lLZXlQYWlyOiBLZXlQYWlyVHlwZTtcbiAgcG5pS2V5UGFpcj86IEtleVBhaXJUeXBlO1xuICBudW1iZXI/OiBzdHJpbmc7XG4gIGFjaT86IHN0cmluZztcbiAgcG5pPzogc3RyaW5nO1xuICBwcm92aXNpb25pbmdDb2RlPzogc3RyaW5nO1xuICB1c2VyQWdlbnQ/OiBzdHJpbmc7XG4gIHJlYWRSZWNlaXB0cz86IGJvb2xlYW47XG4gIHByb2ZpbGVLZXk/OiBVaW50OEFycmF5O1xufTtcblxuY2xhc3MgUHJvdmlzaW9uaW5nQ2lwaGVySW5uZXIge1xuICBrZXlQYWlyPzogS2V5UGFpclR5cGU7XG5cbiAgYXN5bmMgZGVjcnlwdChcbiAgICBwcm92aXNpb25FbnZlbG9wZTogUHJvdG8uUHJvdmlzaW9uRW52ZWxvcGVcbiAgKTogUHJvbWlzZTxQcm92aXNpb25EZWNyeXB0UmVzdWx0PiB7XG4gICAgc3RyaWN0QXNzZXJ0KFxuICAgICAgcHJvdmlzaW9uRW52ZWxvcGUucHVibGljS2V5ICYmIHByb3Zpc2lvbkVudmVsb3BlLmJvZHksXG4gICAgICAnTWlzc2luZyByZXF1aXJlZCBmaWVsZHMgaW4gUHJvdmlzaW9uRW52ZWxvcGUnXG4gICAgKTtcbiAgICBjb25zdCBtYXN0ZXJFcGhlbWVyYWwgPSBwcm92aXNpb25FbnZlbG9wZS5wdWJsaWNLZXk7XG4gICAgY29uc3QgbWVzc2FnZSA9IHByb3Zpc2lvbkVudmVsb3BlLmJvZHk7XG4gICAgaWYgKG5ldyBVaW50OEFycmF5KG1lc3NhZ2UpWzBdICE9PSAxKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0JhZCB2ZXJzaW9uIG51bWJlciBvbiBQcm92aXNpb25pbmdNZXNzYWdlJyk7XG4gICAgfVxuXG4gICAgY29uc3QgaXYgPSBtZXNzYWdlLnNsaWNlKDEsIDE2ICsgMSk7XG4gICAgY29uc3QgbWFjID0gbWVzc2FnZS5zbGljZShtZXNzYWdlLmJ5dGVMZW5ndGggLSAzMiwgbWVzc2FnZS5ieXRlTGVuZ3RoKTtcbiAgICBjb25zdCBpdkFuZENpcGhlcnRleHQgPSBtZXNzYWdlLnNsaWNlKDAsIG1lc3NhZ2UuYnl0ZUxlbmd0aCAtIDMyKTtcbiAgICBjb25zdCBjaXBoZXJ0ZXh0ID0gbWVzc2FnZS5zbGljZSgxNiArIDEsIG1lc3NhZ2UuYnl0ZUxlbmd0aCAtIDMyKTtcblxuICAgIGlmICghdGhpcy5rZXlQYWlyKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Byb3Zpc2lvbmluZ0NpcGhlci5kZWNyeXB0OiBObyBrZXlwYWlyIScpO1xuICAgIH1cblxuICAgIGNvbnN0IGVjUmVzID0gY2FsY3VsYXRlQWdyZWVtZW50KG1hc3RlckVwaGVtZXJhbCwgdGhpcy5rZXlQYWlyLnByaXZLZXkpO1xuICAgIGNvbnN0IGtleXMgPSBkZXJpdmVTZWNyZXRzKFxuICAgICAgZWNSZXMsXG4gICAgICBuZXcgVWludDhBcnJheSgzMiksXG4gICAgICBCeXRlcy5mcm9tU3RyaW5nKCdUZXh0U2VjdXJlIFByb3Zpc2lvbmluZyBNZXNzYWdlJylcbiAgICApO1xuICAgIHZlcmlmeUhtYWNTaGEyNTYoaXZBbmRDaXBoZXJ0ZXh0LCBrZXlzWzFdLCBtYWMsIDMyKTtcblxuICAgIGNvbnN0IHBsYWludGV4dCA9IGRlY3J5cHRBZXMyNTZDYmNQa2NzUGFkZGluZyhrZXlzWzBdLCBjaXBoZXJ0ZXh0LCBpdik7XG4gICAgY29uc3QgcHJvdmlzaW9uTWVzc2FnZSA9IFByb3RvLlByb3Zpc2lvbk1lc3NhZ2UuZGVjb2RlKHBsYWludGV4dCk7XG4gICAgY29uc3QgYWNpUHJpdktleSA9IHByb3Zpc2lvbk1lc3NhZ2UuYWNpSWRlbnRpdHlLZXlQcml2YXRlO1xuICAgIGNvbnN0IHBuaVByaXZLZXkgPSBwcm92aXNpb25NZXNzYWdlLnBuaUlkZW50aXR5S2V5UHJpdmF0ZTtcbiAgICBzdHJpY3RBc3NlcnQoYWNpUHJpdktleSwgJ01pc3NpbmcgYWNpS2V5UHJpdmF0ZSBpbiBQcm92aXNpb25NZXNzYWdlJyk7XG5cbiAgICBjb25zdCBhY2lLZXlQYWlyID0gY3JlYXRlS2V5UGFpcihhY2lQcml2S2V5KTtcbiAgICBjb25zdCBwbmlLZXlQYWlyID0gcG5pUHJpdktleT8ubGVuZ3RoXG4gICAgICA/IGNyZWF0ZUtleVBhaXIocG5pUHJpdktleSlcbiAgICAgIDogdW5kZWZpbmVkO1xuXG4gICAgY29uc3QgeyBhY2ksIHBuaSB9ID0gcHJvdmlzaW9uTWVzc2FnZTtcbiAgICBzdHJpY3RBc3NlcnQoYWNpLCAnTWlzc2luZyBhY2kgaW4gcHJvdmlzaW9uaW5nIG1lc3NhZ2UnKTtcblxuICAgIGNvbnN0IHJldDogUHJvdmlzaW9uRGVjcnlwdFJlc3VsdCA9IHtcbiAgICAgIGFjaUtleVBhaXIsXG4gICAgICBwbmlLZXlQYWlyLFxuICAgICAgbnVtYmVyOiBwcm92aXNpb25NZXNzYWdlLm51bWJlcixcbiAgICAgIGFjaTogbm9ybWFsaXplVXVpZChhY2ksICdQcm92aXNpb25NZXNzYWdlLmFjaScpLFxuICAgICAgcG5pOiBwbmkgPyBub3JtYWxpemVVdWlkKHBuaSwgJ1Byb3Zpc2lvbk1lc3NhZ2UucG5pJykgOiB1bmRlZmluZWQsXG4gICAgICBwcm92aXNpb25pbmdDb2RlOiBwcm92aXNpb25NZXNzYWdlLnByb3Zpc2lvbmluZ0NvZGUsXG4gICAgICB1c2VyQWdlbnQ6IHByb3Zpc2lvbk1lc3NhZ2UudXNlckFnZW50LFxuICAgICAgcmVhZFJlY2VpcHRzOiBwcm92aXNpb25NZXNzYWdlLnJlYWRSZWNlaXB0cyxcbiAgICB9O1xuICAgIGlmIChwcm92aXNpb25NZXNzYWdlLnByb2ZpbGVLZXkpIHtcbiAgICAgIHJldC5wcm9maWxlS2V5ID0gcHJvdmlzaW9uTWVzc2FnZS5wcm9maWxlS2V5O1xuICAgIH1cbiAgICByZXR1cm4gcmV0O1xuICB9XG5cbiAgYXN5bmMgZ2V0UHVibGljS2V5KCk6IFByb21pc2U8VWludDhBcnJheT4ge1xuICAgIGlmICghdGhpcy5rZXlQYWlyKSB7XG4gICAgICB0aGlzLmtleVBhaXIgPSBnZW5lcmF0ZUtleVBhaXIoKTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMua2V5UGFpcikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdQcm92aXNpb25pbmdDaXBoZXIuZGVjcnlwdDogTm8ga2V5cGFpciEnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5rZXlQYWlyLnB1YktleTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcm92aXNpb25pbmdDaXBoZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBjb25zdCBpbm5lciA9IG5ldyBQcm92aXNpb25pbmdDaXBoZXJJbm5lcigpO1xuXG4gICAgdGhpcy5kZWNyeXB0ID0gaW5uZXIuZGVjcnlwdC5iaW5kKGlubmVyKTtcbiAgICB0aGlzLmdldFB1YmxpY0tleSA9IGlubmVyLmdldFB1YmxpY0tleS5iaW5kKGlubmVyKTtcbiAgfVxuXG4gIGRlY3J5cHQ6IChcbiAgICBwcm92aXNpb25FbnZlbG9wZTogUHJvdG8uUHJvdmlzaW9uRW52ZWxvcGVcbiAgKSA9PiBQcm9taXNlPFByb3Zpc2lvbkRlY3J5cHRSZXN1bHQ+O1xuXG4gIGdldFB1YmxpY0tleTogKCkgPT4gUHJvbWlzZTxVaW50OEFycmF5Pjtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFNQSxZQUF1QjtBQUN2QixvQkFJTztBQUNQLG1CQUFtRTtBQUNuRSxzQkFBdUM7QUFDdkMsb0JBQTZCO0FBQzdCLDJCQUE4QjtBQWM5QixNQUFNLHdCQUF3QjtBQUFBLFFBR3RCLFFBQ0osbUJBQ2lDO0FBQ2pDLG9DQUNFLGtCQUFrQixhQUFhLGtCQUFrQixNQUNqRCw4Q0FDRjtBQUNBLFVBQU0sa0JBQWtCLGtCQUFrQjtBQUMxQyxVQUFNLFVBQVUsa0JBQWtCO0FBQ2xDLFFBQUksSUFBSSxXQUFXLE9BQU8sRUFBRSxPQUFPLEdBQUc7QUFDcEMsWUFBTSxJQUFJLE1BQU0sMkNBQTJDO0FBQUEsSUFDN0Q7QUFFQSxVQUFNLEtBQUssUUFBUSxNQUFNLEdBQUcsS0FBSyxDQUFDO0FBQ2xDLFVBQU0sTUFBTSxRQUFRLE1BQU0sUUFBUSxhQUFhLElBQUksUUFBUSxVQUFVO0FBQ3JFLFVBQU0sa0JBQWtCLFFBQVEsTUFBTSxHQUFHLFFBQVEsYUFBYSxFQUFFO0FBQ2hFLFVBQU0sYUFBYSxRQUFRLE1BQU0sS0FBSyxHQUFHLFFBQVEsYUFBYSxFQUFFO0FBRWhFLFFBQUksQ0FBQyxLQUFLLFNBQVM7QUFDakIsWUFBTSxJQUFJLE1BQU0seUNBQXlDO0FBQUEsSUFDM0Q7QUFFQSxVQUFNLFFBQVEscUNBQW1CLGlCQUFpQixLQUFLLFFBQVEsT0FBTztBQUN0RSxVQUFNLE9BQU8saUNBQ1gsT0FDQSxJQUFJLFdBQVcsRUFBRSxHQUNqQixNQUFNLFdBQVcsaUNBQWlDLENBQ3BEO0FBQ0Esd0NBQWlCLGlCQUFpQixLQUFLLElBQUksS0FBSyxFQUFFO0FBRWxELFVBQU0sWUFBWSwrQ0FBNEIsS0FBSyxJQUFJLFlBQVksRUFBRTtBQUNyRSxVQUFNLG1CQUFtQiw4QkFBTSxpQkFBaUIsT0FBTyxTQUFTO0FBQ2hFLFVBQU0sYUFBYSxpQkFBaUI7QUFDcEMsVUFBTSxhQUFhLGlCQUFpQjtBQUNwQyxvQ0FBYSxZQUFZLDJDQUEyQztBQUVwRSxVQUFNLGFBQWEsZ0NBQWMsVUFBVTtBQUMzQyxVQUFNLGFBQWEsWUFBWSxTQUMzQixnQ0FBYyxVQUFVLElBQ3hCO0FBRUosVUFBTSxFQUFFLEtBQUssUUFBUTtBQUNyQixvQ0FBYSxLQUFLLHFDQUFxQztBQUV2RCxVQUFNLE1BQThCO0FBQUEsTUFDbEM7QUFBQSxNQUNBO0FBQUEsTUFDQSxRQUFRLGlCQUFpQjtBQUFBLE1BQ3pCLEtBQUssd0NBQWMsS0FBSyxzQkFBc0I7QUFBQSxNQUM5QyxLQUFLLE1BQU0sd0NBQWMsS0FBSyxzQkFBc0IsSUFBSTtBQUFBLE1BQ3hELGtCQUFrQixpQkFBaUI7QUFBQSxNQUNuQyxXQUFXLGlCQUFpQjtBQUFBLE1BQzVCLGNBQWMsaUJBQWlCO0FBQUEsSUFDakM7QUFDQSxRQUFJLGlCQUFpQixZQUFZO0FBQy9CLFVBQUksYUFBYSxpQkFBaUI7QUFBQSxJQUNwQztBQUNBLFdBQU87QUFBQSxFQUNUO0FBQUEsUUFFTSxlQUFvQztBQUN4QyxRQUFJLENBQUMsS0FBSyxTQUFTO0FBQ2pCLFdBQUssVUFBVSxrQ0FBZ0I7QUFBQSxJQUNqQztBQUVBLFFBQUksQ0FBQyxLQUFLLFNBQVM7QUFDakIsWUFBTSxJQUFJLE1BQU0seUNBQXlDO0FBQUEsSUFDM0Q7QUFFQSxXQUFPLEtBQUssUUFBUTtBQUFBLEVBQ3RCO0FBQ0Y7QUExRUEsQUE0RUEsTUFBTyxtQkFBaUM7QUFBQSxFQUN0QyxjQUFjO0FBQ1osVUFBTSxRQUFRLElBQUksd0JBQXdCO0FBRTFDLFNBQUssVUFBVSxNQUFNLFFBQVEsS0FBSyxLQUFLO0FBQ3ZDLFNBQUssZUFBZSxNQUFNLGFBQWEsS0FBSyxLQUFLO0FBQUEsRUFDbkQ7QUFPRjtBQWJBIiwKICAibmFtZXMiOiBbXQp9Cg==
