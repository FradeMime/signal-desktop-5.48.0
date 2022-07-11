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
var import_crypto = __toESM(require("crypto"));
var import_Crypto = require("../../Crypto");
describe("SignalContext.Crypto", () => {
  describe("hash", () => {
    it("returns SHA512 hash of the input", () => {
      const result = (0, import_Crypto.hash)(import_Crypto.HashType.size512, Buffer.from("signal"));
      import_chai.assert.strictEqual(Buffer.from(result).toString("base64"), "WxneQjrfSlY95Bi+SAzDAr2cf3mxUXePeNYn6DILN4a8NFr9VelTbP5tGHdthi+mrJLqMZd1I6w8CxCnmJ/OFw==");
    });
  });
  describe("sign", () => {
    it("returns hmac SHA256 hash of the input", () => {
      const result = (0, import_Crypto.sign)(Buffer.from("secret"), Buffer.from("signal"));
      import_chai.assert.strictEqual(Buffer.from(result).toString("base64"), "5ewbITW27c1F7dluF9KwGcVQSxmZp6mpVhPj3ww1Sh8=");
    });
  });
  describe("encrypt+decrypt", () => {
    it("returns original input", () => {
      const iv = import_crypto.default.randomBytes(16);
      const key = import_crypto.default.randomBytes(32);
      const input = Buffer.from("plaintext");
      const ciphertext = (0, import_Crypto.encrypt)(import_Crypto.CipherType.AES256CBC, {
        key,
        iv,
        plaintext: input
      });
      const plaintext = (0, import_Crypto.decrypt)(import_Crypto.CipherType.AES256CBC, {
        key,
        iv,
        ciphertext
      });
      import_chai.assert.strictEqual(Buffer.from(plaintext).toString(), "plaintext");
    });
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ3J5cHRvX3Rlc3QudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSAnY2hhaSc7XG5pbXBvcnQgY3J5cHRvIGZyb20gJ2NyeXB0byc7XG5cbmltcG9ydCB7XG4gIENpcGhlclR5cGUsXG4gIEhhc2hUeXBlLFxuICBoYXNoLFxuICBzaWduLFxuICBlbmNyeXB0LFxuICBkZWNyeXB0LFxufSBmcm9tICcuLi8uLi9DcnlwdG8nO1xuXG5kZXNjcmliZSgnU2lnbmFsQ29udGV4dC5DcnlwdG8nLCAoKSA9PiB7XG4gIGRlc2NyaWJlKCdoYXNoJywgKCkgPT4ge1xuICAgIGl0KCdyZXR1cm5zIFNIQTUxMiBoYXNoIG9mIHRoZSBpbnB1dCcsICgpID0+IHtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGhhc2goSGFzaFR5cGUuc2l6ZTUxMiwgQnVmZmVyLmZyb20oJ3NpZ25hbCcpKTtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgICAgQnVmZmVyLmZyb20ocmVzdWx0KS50b1N0cmluZygnYmFzZTY0JyksXG4gICAgICAgICdXeG5lUWpyZlNsWTk1QmkrU0F6REFyMmNmM214VVhlUGVOWW42RElMTjRhOE5GcjlWZWxUYlA1dEdIZHRoaSsnICtcbiAgICAgICAgICAnbXJKTHFNWmQxSTZ3OEN4Q25tSi9PRnc9PSdcbiAgICAgICk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdzaWduJywgKCkgPT4ge1xuICAgIGl0KCdyZXR1cm5zIGhtYWMgU0hBMjU2IGhhc2ggb2YgdGhlIGlucHV0JywgKCkgPT4ge1xuICAgICAgY29uc3QgcmVzdWx0ID0gc2lnbihCdWZmZXIuZnJvbSgnc2VjcmV0JyksIEJ1ZmZlci5mcm9tKCdzaWduYWwnKSk7XG5cbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgICAgQnVmZmVyLmZyb20ocmVzdWx0KS50b1N0cmluZygnYmFzZTY0JyksXG4gICAgICAgICc1ZXdiSVRXMjdjMUY3ZGx1RjlLd0djVlFTeG1acDZtcFZoUGozd3cxU2g4PSdcbiAgICAgICk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdlbmNyeXB0K2RlY3J5cHQnLCAoKSA9PiB7XG4gICAgaXQoJ3JldHVybnMgb3JpZ2luYWwgaW5wdXQnLCAoKSA9PiB7XG4gICAgICBjb25zdCBpdiA9IGNyeXB0by5yYW5kb21CeXRlcygxNik7XG4gICAgICBjb25zdCBrZXkgPSBjcnlwdG8ucmFuZG9tQnl0ZXMoMzIpO1xuICAgICAgY29uc3QgaW5wdXQgPSBCdWZmZXIuZnJvbSgncGxhaW50ZXh0Jyk7XG5cbiAgICAgIGNvbnN0IGNpcGhlcnRleHQgPSBlbmNyeXB0KENpcGhlclR5cGUuQUVTMjU2Q0JDLCB7XG4gICAgICAgIGtleSxcbiAgICAgICAgaXYsXG4gICAgICAgIHBsYWludGV4dDogaW5wdXQsXG4gICAgICB9KTtcbiAgICAgIGNvbnN0IHBsYWludGV4dCA9IGRlY3J5cHQoQ2lwaGVyVHlwZS5BRVMyNTZDQkMsIHtcbiAgICAgICAga2V5LFxuICAgICAgICBpdixcbiAgICAgICAgY2lwaGVydGV4dCxcbiAgICAgIH0pO1xuXG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoQnVmZmVyLmZyb20ocGxhaW50ZXh0KS50b1N0cmluZygpLCAncGxhaW50ZXh0Jyk7XG4gICAgfSk7XG4gIH0pO1xufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7QUFHQSxrQkFBdUI7QUFDdkIsb0JBQW1CO0FBRW5CLG9CQU9PO0FBRVAsU0FBUyx3QkFBd0IsTUFBTTtBQUNyQyxXQUFTLFFBQVEsTUFBTTtBQUNyQixPQUFHLG9DQUFvQyxNQUFNO0FBQzNDLFlBQU0sU0FBUyx3QkFBSyx1QkFBUyxTQUFTLE9BQU8sS0FBSyxRQUFRLENBQUM7QUFDM0QseUJBQU8sWUFDTCxPQUFPLEtBQUssTUFBTSxFQUFFLFNBQVMsUUFBUSxHQUNyQywwRkFFRjtBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0gsQ0FBQztBQUVELFdBQVMsUUFBUSxNQUFNO0FBQ3JCLE9BQUcseUNBQXlDLE1BQU07QUFDaEQsWUFBTSxTQUFTLHdCQUFLLE9BQU8sS0FBSyxRQUFRLEdBQUcsT0FBTyxLQUFLLFFBQVEsQ0FBQztBQUVoRSx5QkFBTyxZQUNMLE9BQU8sS0FBSyxNQUFNLEVBQUUsU0FBUyxRQUFRLEdBQ3JDLDhDQUNGO0FBQUEsSUFDRixDQUFDO0FBQUEsRUFDSCxDQUFDO0FBRUQsV0FBUyxtQkFBbUIsTUFBTTtBQUNoQyxPQUFHLDBCQUEwQixNQUFNO0FBQ2pDLFlBQU0sS0FBSyxzQkFBTyxZQUFZLEVBQUU7QUFDaEMsWUFBTSxNQUFNLHNCQUFPLFlBQVksRUFBRTtBQUNqQyxZQUFNLFFBQVEsT0FBTyxLQUFLLFdBQVc7QUFFckMsWUFBTSxhQUFhLDJCQUFRLHlCQUFXLFdBQVc7QUFBQSxRQUMvQztBQUFBLFFBQ0E7QUFBQSxRQUNBLFdBQVc7QUFBQSxNQUNiLENBQUM7QUFDRCxZQUFNLFlBQVksMkJBQVEseUJBQVcsV0FBVztBQUFBLFFBQzlDO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxNQUNGLENBQUM7QUFFRCx5QkFBTyxZQUFZLE9BQU8sS0FBSyxTQUFTLEVBQUUsU0FBUyxHQUFHLFdBQVc7QUFBQSxJQUNuRSxDQUFDO0FBQUEsRUFDSCxDQUFDO0FBQ0gsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
