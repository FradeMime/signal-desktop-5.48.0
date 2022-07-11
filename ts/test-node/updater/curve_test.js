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
var import_config = __toESM(require("config"));
var import_curve = require("../../updater/curve");
describe("updater/curve", () => {
  it("roundtrips", () => {
    const message = Buffer.from("message");
    const { publicKey, privateKey } = (0, import_curve.keyPair)();
    const signature = (0, import_curve.sign)(privateKey, message);
    const verified = (0, import_curve.verify)(publicKey, message, signature);
    import_chai.assert.strictEqual(verified, true);
  });
  it("verifies with our own key", () => {
    const message = Buffer.from("7761a7761eccc0af7ab67546ec044e40dd1e9762f03d0c504d53fb40ceba5738-1.40.0-beta.3");
    const signature = Buffer.from("982eee37076a391392879ce7a69e6ce24708cf12abd87624ae116c665e75b5404bf29fe2cd76c6213753bd16d7529f0f9116d63a63e90d2c6c8b57e17cc17100", "hex");
    const publicKey = Buffer.from(import_config.default.get("updatesPublicKey"), "hex");
    const verified = (0, import_curve.verify)(publicKey, message, signature);
    import_chai.assert.strictEqual(verified, true);
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiY3VydmVfdGVzdC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMTktMjAyMCBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IGFzc2VydCB9IGZyb20gJ2NoYWknO1xuaW1wb3J0IGNvbmZpZyBmcm9tICdjb25maWcnO1xuXG5pbXBvcnQgeyBrZXlQYWlyLCBzaWduLCB2ZXJpZnkgfSBmcm9tICcuLi8uLi91cGRhdGVyL2N1cnZlJztcblxuZGVzY3JpYmUoJ3VwZGF0ZXIvY3VydmUnLCAoKSA9PiB7XG4gIGl0KCdyb3VuZHRyaXBzJywgKCkgPT4ge1xuICAgIGNvbnN0IG1lc3NhZ2UgPSBCdWZmZXIuZnJvbSgnbWVzc2FnZScpO1xuICAgIGNvbnN0IHsgcHVibGljS2V5LCBwcml2YXRlS2V5IH0gPSBrZXlQYWlyKCk7XG4gICAgY29uc3Qgc2lnbmF0dXJlID0gc2lnbihwcml2YXRlS2V5LCBtZXNzYWdlKTtcbiAgICBjb25zdCB2ZXJpZmllZCA9IHZlcmlmeShwdWJsaWNLZXksIG1lc3NhZ2UsIHNpZ25hdHVyZSk7XG5cbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwodmVyaWZpZWQsIHRydWUpO1xuICB9KTtcblxuICBpdCgndmVyaWZpZXMgd2l0aCBvdXIgb3duIGtleScsICgpID0+IHtcbiAgICBjb25zdCBtZXNzYWdlID0gQnVmZmVyLmZyb20oXG4gICAgICAnNzc2MWE3NzYxZWNjYzBhZjdhYjY3NTQ2ZWMwNDRlNDBkZDFlOTc2MmYwM2QwYzUwNGQ1M2ZiNDBjZWJhNTczOC0xLjQwLjAtYmV0YS4zJ1xuICAgICk7XG4gICAgY29uc3Qgc2lnbmF0dXJlID0gQnVmZmVyLmZyb20oXG4gICAgICAnOTgyZWVlMzcwNzZhMzkxMzkyODc5Y2U3YTY5ZTZjZTI0NzA4Y2YxMmFiZDg3NjI0YWUxMTZjNjY1ZTc1YjU0MDRiZjI5ZmUyY2Q3NmM2MjEzNzUzYmQxNmQ3NTI5ZjBmOTExNmQ2M2E2M2U5MGQyYzZjOGI1N2UxN2NjMTcxMDAnLFxuICAgICAgJ2hleCdcbiAgICApO1xuICAgIGNvbnN0IHB1YmxpY0tleSA9IEJ1ZmZlci5mcm9tKFxuICAgICAgY29uZmlnLmdldDxzdHJpbmc+KCd1cGRhdGVzUHVibGljS2V5JyksXG4gICAgICAnaGV4J1xuICAgICk7XG5cbiAgICBjb25zdCB2ZXJpZmllZCA9IHZlcmlmeShwdWJsaWNLZXksIG1lc3NhZ2UsIHNpZ25hdHVyZSk7XG5cbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwodmVyaWZpZWQsIHRydWUpO1xuICB9KTtcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7O0FBR0Esa0JBQXVCO0FBQ3ZCLG9CQUFtQjtBQUVuQixtQkFBc0M7QUFFdEMsU0FBUyxpQkFBaUIsTUFBTTtBQUM5QixLQUFHLGNBQWMsTUFBTTtBQUNyQixVQUFNLFVBQVUsT0FBTyxLQUFLLFNBQVM7QUFDckMsVUFBTSxFQUFFLFdBQVcsZUFBZSwwQkFBUTtBQUMxQyxVQUFNLFlBQVksdUJBQUssWUFBWSxPQUFPO0FBQzFDLFVBQU0sV0FBVyx5QkFBTyxXQUFXLFNBQVMsU0FBUztBQUVyRCx1QkFBTyxZQUFZLFVBQVUsSUFBSTtBQUFBLEVBQ25DLENBQUM7QUFFRCxLQUFHLDZCQUE2QixNQUFNO0FBQ3BDLFVBQU0sVUFBVSxPQUFPLEtBQ3JCLGdGQUNGO0FBQ0EsVUFBTSxZQUFZLE9BQU8sS0FDdkIsb0lBQ0EsS0FDRjtBQUNBLFVBQU0sWUFBWSxPQUFPLEtBQ3ZCLHNCQUFPLElBQVksa0JBQWtCLEdBQ3JDLEtBQ0Y7QUFFQSxVQUFNLFdBQVcseUJBQU8sV0FBVyxTQUFTLFNBQVM7QUFFckQsdUJBQU8sWUFBWSxVQUFVLElBQUk7QUFBQSxFQUNuQyxDQUFDO0FBQ0gsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
