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
var import_uuid = require("uuid");
var import_Crypto = require("../../Crypto");
var import_AccountManager = __toESM(require("../../textsecure/AccountManager"));
var import_UUID = require("../../types/UUID");
describe("AccountManager", () => {
  let accountManager;
  beforeEach(() => {
    const server = {};
    accountManager = new import_AccountManager.default(server);
  });
  describe("#cleanSignedPreKeys", () => {
    let originalGetIdentityKeyPair;
    let originalLoadSignedPreKeys;
    let originalRemoveSignedPreKey;
    let originalGetUuid;
    let signedPreKeys;
    const DAY = 1e3 * 60 * 60 * 24;
    const pubKey = (0, import_Crypto.getRandomBytes)(33);
    const privKey = (0, import_Crypto.getRandomBytes)(32);
    const identityKey = window.Signal.Curve.generateKeyPair();
    beforeEach(async () => {
      const ourUuid = new import_UUID.UUID((0, import_uuid.v4)());
      originalGetUuid = window.textsecure.storage.user.getUuid;
      originalGetIdentityKeyPair = window.textsecure.storage.protocol.getIdentityKeyPair;
      originalLoadSignedPreKeys = window.textsecure.storage.protocol.loadSignedPreKeys;
      originalRemoveSignedPreKey = window.textsecure.storage.protocol.removeSignedPreKey;
      window.textsecure.storage.user.getUuid = () => ourUuid;
      window.textsecure.storage.protocol.getIdentityKeyPair = async () => identityKey;
      window.textsecure.storage.protocol.loadSignedPreKeys = async () => signedPreKeys;
    });
    afterEach(() => {
      window.textsecure.storage.user.getUuid = originalGetUuid;
      window.textsecure.storage.protocol.getIdentityKeyPair = originalGetIdentityKeyPair;
      window.textsecure.storage.protocol.loadSignedPreKeys = originalLoadSignedPreKeys;
      window.textsecure.storage.protocol.removeSignedPreKey = originalRemoveSignedPreKey;
    });
    describe("encrypted device name", () => {
      it("roundtrips", async () => {
        const deviceName = "v2.5.0 on Ubunto 20.04";
        const encrypted = accountManager.encryptDeviceName(deviceName, identityKey);
        if (!encrypted) {
          throw new Error("failed to encrypt!");
        }
        import_chai.assert.strictEqual(typeof encrypted, "string");
        const decrypted = await accountManager.decryptDeviceName(encrypted);
        import_chai.assert.strictEqual(decrypted, deviceName);
      });
      it("handles falsey deviceName", () => {
        const encrypted = accountManager.encryptDeviceName("", identityKey);
        import_chai.assert.strictEqual(encrypted, null);
      });
    });
    it("keeps three confirmed keys even if over a month old", () => {
      const now = Date.now();
      signedPreKeys = [
        {
          keyId: 1,
          created_at: now - DAY * 32,
          confirmed: true,
          pubKey,
          privKey
        },
        {
          keyId: 2,
          created_at: now - DAY * 34,
          confirmed: true,
          pubKey,
          privKey
        },
        {
          keyId: 3,
          created_at: now - DAY * 38,
          confirmed: true,
          pubKey,
          privKey
        }
      ];
      return accountManager.cleanSignedPreKeys();
    });
    it("eliminates oldest keys, even if recent key is unconfirmed", async () => {
      const now = Date.now();
      signedPreKeys = [
        {
          keyId: 1,
          created_at: now - DAY * 32,
          confirmed: true,
          pubKey,
          privKey
        },
        {
          keyId: 2,
          created_at: now - DAY * 31,
          confirmed: false,
          pubKey,
          privKey
        },
        {
          keyId: 3,
          created_at: now - DAY * 24,
          confirmed: true,
          pubKey,
          privKey
        },
        {
          keyId: 4,
          created_at: now - DAY * 38,
          confirmed: true,
          pubKey,
          privKey
        },
        {
          keyId: 5,
          created_at: now - DAY,
          confirmed: true,
          pubKey,
          privKey
        },
        {
          keyId: 6,
          created_at: now - DAY * 5,
          confirmed: true,
          pubKey,
          privKey
        }
      ];
      let count = 0;
      window.textsecure.storage.protocol.removeSignedPreKey = async (_, keyId) => {
        if (keyId !== 4) {
          throw new Error(`Wrong keys were eliminated! ${keyId}`);
        }
        count += 1;
      };
      await accountManager.cleanSignedPreKeys();
      import_chai.assert.strictEqual(count, 1);
    });
    it("Removes no keys if less than five", async () => {
      const now = Date.now();
      signedPreKeys = [
        {
          keyId: 1,
          created_at: now - DAY * 32,
          confirmed: true,
          pubKey,
          privKey
        },
        {
          keyId: 2,
          created_at: now - DAY * 44,
          confirmed: true,
          pubKey,
          privKey
        },
        {
          keyId: 3,
          created_at: now - DAY * 36,
          confirmed: false,
          pubKey,
          privKey
        },
        {
          keyId: 4,
          created_at: now - DAY * 20,
          confirmed: false,
          pubKey,
          privKey
        }
      ];
      window.textsecure.storage.protocol.removeSignedPreKey = async () => {
        throw new Error("None should be removed!");
      };
      await accountManager.cleanSignedPreKeys();
    });
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQWNjb3VudE1hbmFnZXJfdGVzdC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMTctMjAyMCBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IGFzc2VydCB9IGZyb20gJ2NoYWknO1xuaW1wb3J0IHsgdjQgYXMgZ2V0R3VpZCB9IGZyb20gJ3V1aWQnO1xuXG5pbXBvcnQgeyBnZXRSYW5kb21CeXRlcyB9IGZyb20gJy4uLy4uL0NyeXB0byc7XG5pbXBvcnQgQWNjb3VudE1hbmFnZXIgZnJvbSAnLi4vLi4vdGV4dHNlY3VyZS9BY2NvdW50TWFuYWdlcic7XG5pbXBvcnQgdHlwZSB7IE91dGVyU2lnbmVkUHJla2V5VHlwZSB9IGZyb20gJy4uLy4uL3RleHRzZWN1cmUvVHlwZXMuZCc7XG5pbXBvcnQgeyBVVUlEIH0gZnJvbSAnLi4vLi4vdHlwZXMvVVVJRCc7XG5cbi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnkgKi9cblxuZGVzY3JpYmUoJ0FjY291bnRNYW5hZ2VyJywgKCkgPT4ge1xuICBsZXQgYWNjb3VudE1hbmFnZXI6IEFjY291bnRNYW5hZ2VyO1xuXG4gIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgIGNvbnN0IHNlcnZlcjogYW55ID0ge307XG4gICAgYWNjb3VudE1hbmFnZXIgPSBuZXcgQWNjb3VudE1hbmFnZXIoc2VydmVyKTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJyNjbGVhblNpZ25lZFByZUtleXMnLCAoKSA9PiB7XG4gICAgbGV0IG9yaWdpbmFsR2V0SWRlbnRpdHlLZXlQYWlyOiBhbnk7XG4gICAgbGV0IG9yaWdpbmFsTG9hZFNpZ25lZFByZUtleXM6IGFueTtcbiAgICBsZXQgb3JpZ2luYWxSZW1vdmVTaWduZWRQcmVLZXk6IGFueTtcbiAgICBsZXQgb3JpZ2luYWxHZXRVdWlkOiBhbnk7XG4gICAgbGV0IHNpZ25lZFByZUtleXM6IEFycmF5PE91dGVyU2lnbmVkUHJla2V5VHlwZT47XG4gICAgY29uc3QgREFZID0gMTAwMCAqIDYwICogNjAgKiAyNDtcblxuICAgIGNvbnN0IHB1YktleSA9IGdldFJhbmRvbUJ5dGVzKDMzKTtcbiAgICBjb25zdCBwcml2S2V5ID0gZ2V0UmFuZG9tQnl0ZXMoMzIpO1xuICAgIGNvbnN0IGlkZW50aXR5S2V5ID0gd2luZG93LlNpZ25hbC5DdXJ2ZS5nZW5lcmF0ZUtleVBhaXIoKTtcblxuICAgIGJlZm9yZUVhY2goYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3Qgb3VyVXVpZCA9IG5ldyBVVUlEKGdldEd1aWQoKSk7XG5cbiAgICAgIG9yaWdpbmFsR2V0VXVpZCA9IHdpbmRvdy50ZXh0c2VjdXJlLnN0b3JhZ2UudXNlci5nZXRVdWlkO1xuICAgICAgb3JpZ2luYWxHZXRJZGVudGl0eUtleVBhaXIgPVxuICAgICAgICB3aW5kb3cudGV4dHNlY3VyZS5zdG9yYWdlLnByb3RvY29sLmdldElkZW50aXR5S2V5UGFpcjtcbiAgICAgIG9yaWdpbmFsTG9hZFNpZ25lZFByZUtleXMgPVxuICAgICAgICB3aW5kb3cudGV4dHNlY3VyZS5zdG9yYWdlLnByb3RvY29sLmxvYWRTaWduZWRQcmVLZXlzO1xuICAgICAgb3JpZ2luYWxSZW1vdmVTaWduZWRQcmVLZXkgPVxuICAgICAgICB3aW5kb3cudGV4dHNlY3VyZS5zdG9yYWdlLnByb3RvY29sLnJlbW92ZVNpZ25lZFByZUtleTtcblxuICAgICAgd2luZG93LnRleHRzZWN1cmUuc3RvcmFnZS51c2VyLmdldFV1aWQgPSAoKSA9PiBvdXJVdWlkO1xuXG4gICAgICB3aW5kb3cudGV4dHNlY3VyZS5zdG9yYWdlLnByb3RvY29sLmdldElkZW50aXR5S2V5UGFpciA9IGFzeW5jICgpID0+XG4gICAgICAgIGlkZW50aXR5S2V5O1xuICAgICAgd2luZG93LnRleHRzZWN1cmUuc3RvcmFnZS5wcm90b2NvbC5sb2FkU2lnbmVkUHJlS2V5cyA9IGFzeW5jICgpID0+XG4gICAgICAgIHNpZ25lZFByZUtleXM7XG4gICAgfSk7XG4gICAgYWZ0ZXJFYWNoKCgpID0+IHtcbiAgICAgIHdpbmRvdy50ZXh0c2VjdXJlLnN0b3JhZ2UudXNlci5nZXRVdWlkID0gb3JpZ2luYWxHZXRVdWlkO1xuICAgICAgd2luZG93LnRleHRzZWN1cmUuc3RvcmFnZS5wcm90b2NvbC5nZXRJZGVudGl0eUtleVBhaXIgPVxuICAgICAgICBvcmlnaW5hbEdldElkZW50aXR5S2V5UGFpcjtcbiAgICAgIHdpbmRvdy50ZXh0c2VjdXJlLnN0b3JhZ2UucHJvdG9jb2wubG9hZFNpZ25lZFByZUtleXMgPVxuICAgICAgICBvcmlnaW5hbExvYWRTaWduZWRQcmVLZXlzO1xuICAgICAgd2luZG93LnRleHRzZWN1cmUuc3RvcmFnZS5wcm90b2NvbC5yZW1vdmVTaWduZWRQcmVLZXkgPVxuICAgICAgICBvcmlnaW5hbFJlbW92ZVNpZ25lZFByZUtleTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdlbmNyeXB0ZWQgZGV2aWNlIG5hbWUnLCAoKSA9PiB7XG4gICAgICBpdCgncm91bmR0cmlwcycsIGFzeW5jICgpID0+IHtcbiAgICAgICAgY29uc3QgZGV2aWNlTmFtZSA9ICd2Mi41LjAgb24gVWJ1bnRvIDIwLjA0JztcbiAgICAgICAgY29uc3QgZW5jcnlwdGVkID0gYWNjb3VudE1hbmFnZXIuZW5jcnlwdERldmljZU5hbWUoXG4gICAgICAgICAgZGV2aWNlTmFtZSxcbiAgICAgICAgICBpZGVudGl0eUtleVxuICAgICAgICApO1xuICAgICAgICBpZiAoIWVuY3J5cHRlZCkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignZmFpbGVkIHRvIGVuY3J5cHQhJyk7XG4gICAgICAgIH1cbiAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKHR5cGVvZiBlbmNyeXB0ZWQsICdzdHJpbmcnKTtcbiAgICAgICAgY29uc3QgZGVjcnlwdGVkID0gYXdhaXQgYWNjb3VudE1hbmFnZXIuZGVjcnlwdERldmljZU5hbWUoZW5jcnlwdGVkKTtcblxuICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoZGVjcnlwdGVkLCBkZXZpY2VOYW1lKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnaGFuZGxlcyBmYWxzZXkgZGV2aWNlTmFtZScsICgpID0+IHtcbiAgICAgICAgY29uc3QgZW5jcnlwdGVkID0gYWNjb3VudE1hbmFnZXIuZW5jcnlwdERldmljZU5hbWUoJycsIGlkZW50aXR5S2V5KTtcbiAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGVuY3J5cHRlZCwgbnVsbCk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGl0KCdrZWVwcyB0aHJlZSBjb25maXJtZWQga2V5cyBldmVuIGlmIG92ZXIgYSBtb250aCBvbGQnLCAoKSA9PiB7XG4gICAgICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xuICAgICAgc2lnbmVkUHJlS2V5cyA9IFtcbiAgICAgICAge1xuICAgICAgICAgIGtleUlkOiAxLFxuICAgICAgICAgIGNyZWF0ZWRfYXQ6IG5vdyAtIERBWSAqIDMyLFxuICAgICAgICAgIGNvbmZpcm1lZDogdHJ1ZSxcbiAgICAgICAgICBwdWJLZXksXG4gICAgICAgICAgcHJpdktleSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGtleUlkOiAyLFxuICAgICAgICAgIGNyZWF0ZWRfYXQ6IG5vdyAtIERBWSAqIDM0LFxuICAgICAgICAgIGNvbmZpcm1lZDogdHJ1ZSxcbiAgICAgICAgICBwdWJLZXksXG4gICAgICAgICAgcHJpdktleSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGtleUlkOiAzLFxuICAgICAgICAgIGNyZWF0ZWRfYXQ6IG5vdyAtIERBWSAqIDM4LFxuICAgICAgICAgIGNvbmZpcm1lZDogdHJ1ZSxcbiAgICAgICAgICBwdWJLZXksXG4gICAgICAgICAgcHJpdktleSxcbiAgICAgICAgfSxcbiAgICAgIF07XG5cbiAgICAgIC8vIHNob3VsZCBiZSBubyBjYWxscyB0byBzdG9yZS5yZW1vdmVTaWduZWRQcmVLZXksIHdvdWxkIGNhdXNlIGNyYXNoXG4gICAgICByZXR1cm4gYWNjb3VudE1hbmFnZXIuY2xlYW5TaWduZWRQcmVLZXlzKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnZWxpbWluYXRlcyBvbGRlc3Qga2V5cywgZXZlbiBpZiByZWNlbnQga2V5IGlzIHVuY29uZmlybWVkJywgYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcbiAgICAgIHNpZ25lZFByZUtleXMgPSBbXG4gICAgICAgIHtcbiAgICAgICAgICBrZXlJZDogMSxcbiAgICAgICAgICBjcmVhdGVkX2F0OiBub3cgLSBEQVkgKiAzMixcbiAgICAgICAgICBjb25maXJtZWQ6IHRydWUsXG4gICAgICAgICAgcHViS2V5LFxuICAgICAgICAgIHByaXZLZXksXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBrZXlJZDogMixcbiAgICAgICAgICBjcmVhdGVkX2F0OiBub3cgLSBEQVkgKiAzMSxcbiAgICAgICAgICBjb25maXJtZWQ6IGZhbHNlLFxuICAgICAgICAgIHB1YktleSxcbiAgICAgICAgICBwcml2S2V5LFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAga2V5SWQ6IDMsXG4gICAgICAgICAgY3JlYXRlZF9hdDogbm93IC0gREFZICogMjQsXG4gICAgICAgICAgY29uZmlybWVkOiB0cnVlLFxuICAgICAgICAgIHB1YktleSxcbiAgICAgICAgICBwcml2S2V5LFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgLy8gT2xkZXN0LCBzaG91bGQgYmUgZHJvcHBlZFxuICAgICAgICAgIGtleUlkOiA0LFxuICAgICAgICAgIGNyZWF0ZWRfYXQ6IG5vdyAtIERBWSAqIDM4LFxuICAgICAgICAgIGNvbmZpcm1lZDogdHJ1ZSxcbiAgICAgICAgICBwdWJLZXksXG4gICAgICAgICAgcHJpdktleSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGtleUlkOiA1LFxuICAgICAgICAgIGNyZWF0ZWRfYXQ6IG5vdyAtIERBWSxcbiAgICAgICAgICBjb25maXJtZWQ6IHRydWUsXG4gICAgICAgICAgcHViS2V5LFxuICAgICAgICAgIHByaXZLZXksXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBrZXlJZDogNixcbiAgICAgICAgICBjcmVhdGVkX2F0OiBub3cgLSBEQVkgKiA1LFxuICAgICAgICAgIGNvbmZpcm1lZDogdHJ1ZSxcbiAgICAgICAgICBwdWJLZXksXG4gICAgICAgICAgcHJpdktleSxcbiAgICAgICAgfSxcbiAgICAgIF07XG5cbiAgICAgIGxldCBjb3VudCA9IDA7XG4gICAgICB3aW5kb3cudGV4dHNlY3VyZS5zdG9yYWdlLnByb3RvY29sLnJlbW92ZVNpZ25lZFByZUtleSA9IGFzeW5jIChcbiAgICAgICAgXyxcbiAgICAgICAga2V5SWRcbiAgICAgICkgPT4ge1xuICAgICAgICBpZiAoa2V5SWQgIT09IDQpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFdyb25nIGtleXMgd2VyZSBlbGltaW5hdGVkISAke2tleUlkfWApO1xuICAgICAgICB9XG5cbiAgICAgICAgY291bnQgKz0gMTtcbiAgICAgIH07XG5cbiAgICAgIGF3YWl0IGFjY291bnRNYW5hZ2VyLmNsZWFuU2lnbmVkUHJlS2V5cygpO1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGNvdW50LCAxKTtcbiAgICB9KTtcblxuICAgIGl0KCdSZW1vdmVzIG5vIGtleXMgaWYgbGVzcyB0aGFuIGZpdmUnLCBhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xuICAgICAgc2lnbmVkUHJlS2V5cyA9IFtcbiAgICAgICAge1xuICAgICAgICAgIGtleUlkOiAxLFxuICAgICAgICAgIGNyZWF0ZWRfYXQ6IG5vdyAtIERBWSAqIDMyLFxuICAgICAgICAgIGNvbmZpcm1lZDogdHJ1ZSxcbiAgICAgICAgICBwdWJLZXksXG4gICAgICAgICAgcHJpdktleSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGtleUlkOiAyLFxuICAgICAgICAgIGNyZWF0ZWRfYXQ6IG5vdyAtIERBWSAqIDQ0LFxuICAgICAgICAgIGNvbmZpcm1lZDogdHJ1ZSxcbiAgICAgICAgICBwdWJLZXksXG4gICAgICAgICAgcHJpdktleSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGtleUlkOiAzLFxuICAgICAgICAgIGNyZWF0ZWRfYXQ6IG5vdyAtIERBWSAqIDM2LFxuICAgICAgICAgIGNvbmZpcm1lZDogZmFsc2UsXG4gICAgICAgICAgcHViS2V5LFxuICAgICAgICAgIHByaXZLZXksXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBrZXlJZDogNCxcbiAgICAgICAgICBjcmVhdGVkX2F0OiBub3cgLSBEQVkgKiAyMCxcbiAgICAgICAgICBjb25maXJtZWQ6IGZhbHNlLFxuICAgICAgICAgIHB1YktleSxcbiAgICAgICAgICBwcml2S2V5LFxuICAgICAgICB9LFxuICAgICAgXTtcblxuICAgICAgd2luZG93LnRleHRzZWN1cmUuc3RvcmFnZS5wcm90b2NvbC5yZW1vdmVTaWduZWRQcmVLZXkgPSBhc3luYyAoKSA9PiB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTm9uZSBzaG91bGQgYmUgcmVtb3ZlZCEnKTtcbiAgICAgIH07XG5cbiAgICAgIGF3YWl0IGFjY291bnRNYW5hZ2VyLmNsZWFuU2lnbmVkUHJlS2V5cygpO1xuICAgIH0pO1xuICB9KTtcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7O0FBR0Esa0JBQXVCO0FBQ3ZCLGtCQUE4QjtBQUU5QixvQkFBK0I7QUFDL0IsNEJBQTJCO0FBRTNCLGtCQUFxQjtBQUlyQixTQUFTLGtCQUFrQixNQUFNO0FBQy9CLE1BQUk7QUFFSixhQUFXLE1BQU07QUFDZixVQUFNLFNBQWMsQ0FB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
