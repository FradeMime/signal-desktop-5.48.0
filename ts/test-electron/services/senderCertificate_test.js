var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
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
var sinon = __toESM(require("sinon"));
var import_uuid = require("uuid");
var import_long = __toESM(require("long"));
var durations = __toESM(require("../../util/durations"));
var Bytes = __toESM(require("../../Bytes"));
var import_OutgoingMessage = require("../../textsecure/OutgoingMessage");
var import_protobuf = require("../../protobuf");
var import_senderCertificate = require("../../services/senderCertificate");
const SenderCertificate = import_protobuf.SignalService.SenderCertificate;
describe("SenderCertificateService", () => {
  const FIFTEEN_MINUTES = 15 * durations.MINUTE;
  let fakeValidCertificate;
  let fakeValidEncodedCertificate;
  let fakeValidCertificateExpiry;
  let fakeServer;
  let fakeNavigator;
  let fakeWindow;
  let fakeStorage;
  function initializeTestService() {
    const result = new import_senderCertificate.SenderCertificateService();
    result.initialize({
      server: fakeServer,
      navigator: fakeNavigator,
      onlineEventTarget: fakeWindow,
      storage: fakeStorage
    });
    return result;
  }
  beforeEach(() => {
    fakeValidCertificate = new SenderCertificate();
    fakeValidCertificateExpiry = Date.now() + 6048e5;
    const certificate = new SenderCertificate.Certificate();
    certificate.expires = import_long.default.fromNumber(fakeValidCertificateExpiry);
    fakeValidCertificate.certificate = SenderCertificate.Certificate.encode(certificate).finish();
    fakeValidEncodedCertificate = SenderCertificate.encode(fakeValidCertificate).finish();
    fakeServer = {
      getSenderCertificate: sinon.stub().resolves({
        certificate: Bytes.toBase64(fakeValidEncodedCertificate)
      })
    };
    fakeNavigator = { onLine: true };
    fakeWindow = {
      addEventListener: sinon.stub(),
      dispatchEvent: sinon.stub(),
      removeEventListener: sinon.stub()
    };
    fakeStorage = {
      get: sinon.stub(),
      put: sinon.stub().resolves(),
      remove: sinon.stub().resolves()
    };
    fakeStorage.get.withArgs("uuid_id").returns(`${(0, import_uuid.v4)()}.2`);
    fakeStorage.get.withArgs("password").returns("abc123");
  });
  describe("get", () => {
    it("returns valid yes-E164 certificates from storage if they exist", async () => {
      const cert = {
        expires: Date.now() + 123456,
        serialized: new Uint8Array(2)
      };
      fakeStorage.get.withArgs("senderCertificate").returns(cert);
      const service = initializeTestService();
      import_chai.assert.strictEqual(await service.get(import_OutgoingMessage.SenderCertificateMode.WithE164), cert);
      sinon.assert.notCalled(fakeStorage.put);
    });
    it("returns valid no-E164 certificates from storage if they exist", async () => {
      const cert = {
        expires: Date.now() + 123456,
        serialized: new Uint8Array(2)
      };
      fakeStorage.get.withArgs("senderCertificateNoE164").returns(cert);
      const service = initializeTestService();
      import_chai.assert.strictEqual(await service.get(import_OutgoingMessage.SenderCertificateMode.WithoutE164), cert);
      sinon.assert.notCalled(fakeStorage.put);
    });
    it("returns and stores a newly-fetched yes-E164 certificate if none was in storage", async () => {
      const service = initializeTestService();
      import_chai.assert.deepEqual(await service.get(import_OutgoingMessage.SenderCertificateMode.WithE164), {
        expires: fakeValidCertificateExpiry - FIFTEEN_MINUTES,
        serialized: fakeValidEncodedCertificate
      });
      sinon.assert.calledWithMatch(fakeStorage.put, "senderCertificate", {
        expires: fakeValidCertificateExpiry - FIFTEEN_MINUTES,
        serialized: Buffer.from(fakeValidEncodedCertificate)
      });
      sinon.assert.calledWith(fakeServer.getSenderCertificate, false);
    });
    it("returns and stores a newly-fetched no-E164 certificate if none was in storage", async () => {
      const service = initializeTestService();
      import_chai.assert.deepEqual(await service.get(import_OutgoingMessage.SenderCertificateMode.WithoutE164), {
        expires: fakeValidCertificateExpiry - FIFTEEN_MINUTES,
        serialized: fakeValidEncodedCertificate
      });
      sinon.assert.calledWithMatch(fakeStorage.put, "senderCertificateNoE164", {
        expires: fakeValidCertificateExpiry - FIFTEEN_MINUTES,
        serialized: Buffer.from(fakeValidEncodedCertificate)
      });
      sinon.assert.calledWith(fakeServer.getSenderCertificate, true);
    });
    it("fetches new certificates if the value in storage has already expired", async () => {
      const service = initializeTestService();
      fakeStorage.get.withArgs("senderCertificate").returns({
        expires: Date.now() - 1e3,
        serialized: new Uint8Array(2)
      });
      await service.get(import_OutgoingMessage.SenderCertificateMode.WithE164);
      sinon.assert.called(fakeServer.getSenderCertificate);
    });
    it("fetches new certificates if the value in storage is invalid", async () => {
      const service = initializeTestService();
      fakeStorage.get.withArgs("senderCertificate").returns({
        serialized: "not an uint8array"
      });
      await service.get(import_OutgoingMessage.SenderCertificateMode.WithE164);
      sinon.assert.called(fakeServer.getSenderCertificate);
    });
    it("only hits the server once per certificate type when requesting many times", async () => {
      const service = initializeTestService();
      await Promise.all([
        service.get(import_OutgoingMessage.SenderCertificateMode.WithE164),
        service.get(import_OutgoingMessage.SenderCertificateMode.WithoutE164),
        service.get(import_OutgoingMessage.SenderCertificateMode.WithE164),
        service.get(import_OutgoingMessage.SenderCertificateMode.WithoutE164),
        service.get(import_OutgoingMessage.SenderCertificateMode.WithE164),
        service.get(import_OutgoingMessage.SenderCertificateMode.WithoutE164),
        service.get(import_OutgoingMessage.SenderCertificateMode.WithE164),
        service.get(import_OutgoingMessage.SenderCertificateMode.WithoutE164)
      ]);
      sinon.assert.calledTwice(fakeServer.getSenderCertificate);
    });
    it("hits the server again after a request has completed", async () => {
      const service = initializeTestService();
      await service.get(import_OutgoingMessage.SenderCertificateMode.WithE164);
      sinon.assert.calledOnce(fakeServer.getSenderCertificate);
      await service.get(import_OutgoingMessage.SenderCertificateMode.WithE164);
      sinon.assert.calledTwice(fakeServer.getSenderCertificate);
    });
    it("returns undefined if the request to the server fails", async () => {
      const service = initializeTestService();
      fakeServer.getSenderCertificate.rejects(new Error("uh oh"));
      import_chai.assert.isUndefined(await service.get(import_OutgoingMessage.SenderCertificateMode.WithE164));
    });
    it("returns undefined if the server returns an already-expired certificate", async () => {
      const service = initializeTestService();
      const expiredCertificate = new SenderCertificate();
      const certificate = new SenderCertificate.Certificate();
      certificate.expires = import_long.default.fromNumber(Date.now() - 1e3);
      expiredCertificate.certificate = SenderCertificate.Certificate.encode(certificate).finish();
      fakeServer.getSenderCertificate.resolves({
        certificate: Bytes.toBase64(SenderCertificate.encode(expiredCertificate).finish())
      });
      import_chai.assert.isUndefined(await service.get(import_OutgoingMessage.SenderCertificateMode.WithE164));
    });
    it("clear waits for any outstanding requests then erases storage", async () => {
      let count = 0;
      fakeServer = {
        getSenderCertificate: sinon.spy(async () => {
          await new Promise((resolve) => setTimeout(resolve, 500));
          count += 1;
          return {
            certificate: Bytes.toBase64(fakeValidEncodedCertificate)
          };
        })
      };
      const service = initializeTestService();
      service.get(import_OutgoingMessage.SenderCertificateMode.WithE164);
      service.get(import_OutgoingMessage.SenderCertificateMode.WithoutE164);
      await service.clear();
      import_chai.assert.equal(count, 2);
      import_chai.assert.isUndefined(fakeStorage.get("senderCertificate"));
      import_chai.assert.isUndefined(fakeStorage.get("senderCertificateNoE164"));
    });
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic2VuZGVyQ2VydGlmaWNhdGVfdGVzdC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG4vLyBXZSBhbGxvdyBgYW55YHMgYmVjYXVzZSBpdCdzIGFyZHVvdXMgdG8gc2V0IHVwIFwicmVhbFwiIFdlYkFQSXMgYW5kIHN0b3JhZ2VzLlxuLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueSAqL1xuXG5pbXBvcnQgeyBhc3NlcnQgfSBmcm9tICdjaGFpJztcbmltcG9ydCAqIGFzIHNpbm9uIGZyb20gJ3Npbm9uJztcbmltcG9ydCB7IHY0IGFzIHV1aWQgfSBmcm9tICd1dWlkJztcbmltcG9ydCBMb25nIGZyb20gJ2xvbmcnO1xuaW1wb3J0ICogYXMgZHVyYXRpb25zIGZyb20gJy4uLy4uL3V0aWwvZHVyYXRpb25zJztcbmltcG9ydCAqIGFzIEJ5dGVzIGZyb20gJy4uLy4uL0J5dGVzJztcbmltcG9ydCB7IFNlbmRlckNlcnRpZmljYXRlTW9kZSB9IGZyb20gJy4uLy4uL3RleHRzZWN1cmUvT3V0Z29pbmdNZXNzYWdlJztcbmltcG9ydCB7IFNpZ25hbFNlcnZpY2UgYXMgUHJvdG8gfSBmcm9tICcuLi8uLi9wcm90b2J1Zic7XG5cbmltcG9ydCB7IFNlbmRlckNlcnRpZmljYXRlU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3NlbmRlckNlcnRpZmljYXRlJztcblxuaW1wb3J0IFNlbmRlckNlcnRpZmljYXRlID0gUHJvdG8uU2VuZGVyQ2VydGlmaWNhdGU7XG5cbmRlc2NyaWJlKCdTZW5kZXJDZXJ0aWZpY2F0ZVNlcnZpY2UnLCAoKSA9PiB7XG4gIGNvbnN0IEZJRlRFRU5fTUlOVVRFUyA9IDE1ICogZHVyYXRpb25zLk1JTlVURTtcblxuICBsZXQgZmFrZVZhbGlkQ2VydGlmaWNhdGU6IFNlbmRlckNlcnRpZmljYXRlO1xuICBsZXQgZmFrZVZhbGlkRW5jb2RlZENlcnRpZmljYXRlOiBVaW50OEFycmF5O1xuICBsZXQgZmFrZVZhbGlkQ2VydGlmaWNhdGVFeHBpcnk6IG51bWJlcjtcbiAgbGV0IGZha2VTZXJ2ZXI6IGFueTtcbiAgbGV0IGZha2VOYXZpZ2F0b3I6IHsgb25MaW5lOiBib29sZWFuIH07XG4gIGxldCBmYWtlV2luZG93OiBFdmVudFRhcmdldDtcbiAgbGV0IGZha2VTdG9yYWdlOiBhbnk7XG5cbiAgZnVuY3Rpb24gaW5pdGlhbGl6ZVRlc3RTZXJ2aWNlKCk6IFNlbmRlckNlcnRpZmljYXRlU2VydmljZSB7XG4gICAgY29uc3QgcmVzdWx0ID0gbmV3IFNlbmRlckNlcnRpZmljYXRlU2VydmljZSgpO1xuICAgIHJlc3VsdC5pbml0aWFsaXplKHtcbiAgICAgIHNlcnZlcjogZmFrZVNlcnZlcixcbiAgICAgIG5hdmlnYXRvcjogZmFrZU5hdmlnYXRvcixcbiAgICAgIG9ubGluZUV2ZW50VGFyZ2V0OiBmYWtlV2luZG93LFxuICAgICAgc3RvcmFnZTogZmFrZVN0b3JhZ2UsXG4gICAgfSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgIGZha2VWYWxpZENlcnRpZmljYXRlID0gbmV3IFNlbmRlckNlcnRpZmljYXRlKCk7XG4gICAgZmFrZVZhbGlkQ2VydGlmaWNhdGVFeHBpcnkgPSBEYXRlLm5vdygpICsgNjA0ODAwMDAwO1xuICAgIGNvbnN0IGNlcnRpZmljYXRlID0gbmV3IFNlbmRlckNlcnRpZmljYXRlLkNlcnRpZmljYXRlKCk7XG4gICAgY2VydGlmaWNhdGUuZXhwaXJlcyA9IExvbmcuZnJvbU51bWJlcihmYWtlVmFsaWRDZXJ0aWZpY2F0ZUV4cGlyeSk7XG4gICAgZmFrZVZhbGlkQ2VydGlmaWNhdGUuY2VydGlmaWNhdGUgPVxuICAgICAgU2VuZGVyQ2VydGlmaWNhdGUuQ2VydGlmaWNhdGUuZW5jb2RlKGNlcnRpZmljYXRlKS5maW5pc2goKTtcbiAgICBmYWtlVmFsaWRFbmNvZGVkQ2VydGlmaWNhdGUgPVxuICAgICAgU2VuZGVyQ2VydGlmaWNhdGUuZW5jb2RlKGZha2VWYWxpZENlcnRpZmljYXRlKS5maW5pc2goKTtcblxuICAgIGZha2VTZXJ2ZXIgPSB7XG4gICAgICBnZXRTZW5kZXJDZXJ0aWZpY2F0ZTogc2lub24uc3R1YigpLnJlc29sdmVzKHtcbiAgICAgICAgY2VydGlmaWNhdGU6IEJ5dGVzLnRvQmFzZTY0KGZha2VWYWxpZEVuY29kZWRDZXJ0aWZpY2F0ZSksXG4gICAgICB9KSxcbiAgICB9O1xuXG4gICAgZmFrZU5hdmlnYXRvciA9IHsgb25MaW5lOiB0cnVlIH07XG5cbiAgICBmYWtlV2luZG93ID0ge1xuICAgICAgYWRkRXZlbnRMaXN0ZW5lcjogc2lub24uc3R1YigpLFxuICAgICAgZGlzcGF0Y2hFdmVudDogc2lub24uc3R1YigpLFxuICAgICAgcmVtb3ZlRXZlbnRMaXN0ZW5lcjogc2lub24uc3R1YigpLFxuICAgIH07XG5cbiAgICBmYWtlU3RvcmFnZSA9IHtcbiAgICAgIGdldDogc2lub24uc3R1YigpLFxuICAgICAgcHV0OiBzaW5vbi5zdHViKCkucmVzb2x2ZXMoKSxcbiAgICAgIHJlbW92ZTogc2lub24uc3R1YigpLnJlc29sdmVzKCksXG4gICAgfTtcbiAgICBmYWtlU3RvcmFnZS5nZXQud2l0aEFyZ3MoJ3V1aWRfaWQnKS5yZXR1cm5zKGAke3V1aWQoKX0uMmApO1xuICAgIGZha2VTdG9yYWdlLmdldC53aXRoQXJncygncGFzc3dvcmQnKS5yZXR1cm5zKCdhYmMxMjMnKTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ2dldCcsICgpID0+IHtcbiAgICBpdCgncmV0dXJucyB2YWxpZCB5ZXMtRTE2NCBjZXJ0aWZpY2F0ZXMgZnJvbSBzdG9yYWdlIGlmIHRoZXkgZXhpc3QnLCBhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBjZXJ0ID0ge1xuICAgICAgICBleHBpcmVzOiBEYXRlLm5vdygpICsgMTIzNDU2LFxuICAgICAgICBzZXJpYWxpemVkOiBuZXcgVWludDhBcnJheSgyKSxcbiAgICAgIH07XG4gICAgICBmYWtlU3RvcmFnZS5nZXQud2l0aEFyZ3MoJ3NlbmRlckNlcnRpZmljYXRlJykucmV0dXJucyhjZXJ0KTtcblxuICAgICAgY29uc3Qgc2VydmljZSA9IGluaXRpYWxpemVUZXN0U2VydmljZSgpO1xuXG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoXG4gICAgICAgIGF3YWl0IHNlcnZpY2UuZ2V0KFNlbmRlckNlcnRpZmljYXRlTW9kZS5XaXRoRTE2NCksXG4gICAgICAgIGNlcnRcbiAgICAgICk7XG5cbiAgICAgIHNpbm9uLmFzc2VydC5ub3RDYWxsZWQoZmFrZVN0b3JhZ2UucHV0KTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIHZhbGlkIG5vLUUxNjQgY2VydGlmaWNhdGVzIGZyb20gc3RvcmFnZSBpZiB0aGV5IGV4aXN0JywgYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgY2VydCA9IHtcbiAgICAgICAgZXhwaXJlczogRGF0ZS5ub3coKSArIDEyMzQ1NixcbiAgICAgICAgc2VyaWFsaXplZDogbmV3IFVpbnQ4QXJyYXkoMiksXG4gICAgICB9O1xuICAgICAgZmFrZVN0b3JhZ2UuZ2V0LndpdGhBcmdzKCdzZW5kZXJDZXJ0aWZpY2F0ZU5vRTE2NCcpLnJldHVybnMoY2VydCk7XG5cbiAgICAgIGNvbnN0IHNlcnZpY2UgPSBpbml0aWFsaXplVGVzdFNlcnZpY2UoKTtcblxuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgICBhd2FpdCBzZXJ2aWNlLmdldChTZW5kZXJDZXJ0aWZpY2F0ZU1vZGUuV2l0aG91dEUxNjQpLFxuICAgICAgICBjZXJ0XG4gICAgICApO1xuXG4gICAgICBzaW5vbi5hc3NlcnQubm90Q2FsbGVkKGZha2VTdG9yYWdlLnB1dCk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyBhbmQgc3RvcmVzIGEgbmV3bHktZmV0Y2hlZCB5ZXMtRTE2NCBjZXJ0aWZpY2F0ZSBpZiBub25lIHdhcyBpbiBzdG9yYWdlJywgYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3Qgc2VydmljZSA9IGluaXRpYWxpemVUZXN0U2VydmljZSgpO1xuXG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKGF3YWl0IHNlcnZpY2UuZ2V0KFNlbmRlckNlcnRpZmljYXRlTW9kZS5XaXRoRTE2NCksIHtcbiAgICAgICAgZXhwaXJlczogZmFrZVZhbGlkQ2VydGlmaWNhdGVFeHBpcnkgLSBGSUZURUVOX01JTlVURVMsXG4gICAgICAgIHNlcmlhbGl6ZWQ6IGZha2VWYWxpZEVuY29kZWRDZXJ0aWZpY2F0ZSxcbiAgICAgIH0pO1xuXG4gICAgICBzaW5vbi5hc3NlcnQuY2FsbGVkV2l0aE1hdGNoKGZha2VTdG9yYWdlLnB1dCwgJ3NlbmRlckNlcnRpZmljYXRlJywge1xuICAgICAgICBleHBpcmVzOiBmYWtlVmFsaWRDZXJ0aWZpY2F0ZUV4cGlyeSAtIEZJRlRFRU5fTUlOVVRFUyxcbiAgICAgICAgc2VyaWFsaXplZDogQnVmZmVyLmZyb20oZmFrZVZhbGlkRW5jb2RlZENlcnRpZmljYXRlKSxcbiAgICAgIH0pO1xuXG4gICAgICBzaW5vbi5hc3NlcnQuY2FsbGVkV2l0aChmYWtlU2VydmVyLmdldFNlbmRlckNlcnRpZmljYXRlLCBmYWxzZSk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyBhbmQgc3RvcmVzIGEgbmV3bHktZmV0Y2hlZCBuby1FMTY0IGNlcnRpZmljYXRlIGlmIG5vbmUgd2FzIGluIHN0b3JhZ2UnLCBhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBzZXJ2aWNlID0gaW5pdGlhbGl6ZVRlc3RTZXJ2aWNlKCk7XG5cbiAgICAgIGFzc2VydC5kZWVwRXF1YWwoYXdhaXQgc2VydmljZS5nZXQoU2VuZGVyQ2VydGlmaWNhdGVNb2RlLldpdGhvdXRFMTY0KSwge1xuICAgICAgICBleHBpcmVzOiBmYWtlVmFsaWRDZXJ0aWZpY2F0ZUV4cGlyeSAtIEZJRlRFRU5fTUlOVVRFUyxcbiAgICAgICAgc2VyaWFsaXplZDogZmFrZVZhbGlkRW5jb2RlZENlcnRpZmljYXRlLFxuICAgICAgfSk7XG5cbiAgICAgIHNpbm9uLmFzc2VydC5jYWxsZWRXaXRoTWF0Y2goZmFrZVN0b3JhZ2UucHV0LCAnc2VuZGVyQ2VydGlmaWNhdGVOb0UxNjQnLCB7XG4gICAgICAgIGV4cGlyZXM6IGZha2VWYWxpZENlcnRpZmljYXRlRXhwaXJ5IC0gRklGVEVFTl9NSU5VVEVTLFxuICAgICAgICBzZXJpYWxpemVkOiBCdWZmZXIuZnJvbShmYWtlVmFsaWRFbmNvZGVkQ2VydGlmaWNhdGUpLFxuICAgICAgfSk7XG5cbiAgICAgIHNpbm9uLmFzc2VydC5jYWxsZWRXaXRoKGZha2VTZXJ2ZXIuZ2V0U2VuZGVyQ2VydGlmaWNhdGUsIHRydWUpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2ZldGNoZXMgbmV3IGNlcnRpZmljYXRlcyBpZiB0aGUgdmFsdWUgaW4gc3RvcmFnZSBoYXMgYWxyZWFkeSBleHBpcmVkJywgYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3Qgc2VydmljZSA9IGluaXRpYWxpemVUZXN0U2VydmljZSgpO1xuXG4gICAgICBmYWtlU3RvcmFnZS5nZXQud2l0aEFyZ3MoJ3NlbmRlckNlcnRpZmljYXRlJykucmV0dXJucyh7XG4gICAgICAgIGV4cGlyZXM6IERhdGUubm93KCkgLSAxMDAwLFxuICAgICAgICBzZXJpYWxpemVkOiBuZXcgVWludDhBcnJheSgyKSxcbiAgICAgIH0pO1xuXG4gICAgICBhd2FpdCBzZXJ2aWNlLmdldChTZW5kZXJDZXJ0aWZpY2F0ZU1vZGUuV2l0aEUxNjQpO1xuXG4gICAgICBzaW5vbi5hc3NlcnQuY2FsbGVkKGZha2VTZXJ2ZXIuZ2V0U2VuZGVyQ2VydGlmaWNhdGUpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2ZldGNoZXMgbmV3IGNlcnRpZmljYXRlcyBpZiB0aGUgdmFsdWUgaW4gc3RvcmFnZSBpcyBpbnZhbGlkJywgYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3Qgc2VydmljZSA9IGluaXRpYWxpemVUZXN0U2VydmljZSgpO1xuXG4gICAgICBmYWtlU3RvcmFnZS5nZXQud2l0aEFyZ3MoJ3NlbmRlckNlcnRpZmljYXRlJykucmV0dXJucyh7XG4gICAgICAgIHNlcmlhbGl6ZWQ6ICdub3QgYW4gdWludDhhcnJheScsXG4gICAgICB9KTtcblxuICAgICAgYXdhaXQgc2VydmljZS5nZXQoU2VuZGVyQ2VydGlmaWNhdGVNb2RlLldpdGhFMTY0KTtcblxuICAgICAgc2lub24uYXNzZXJ0LmNhbGxlZChmYWtlU2VydmVyLmdldFNlbmRlckNlcnRpZmljYXRlKTtcbiAgICB9KTtcblxuICAgIGl0KCdvbmx5IGhpdHMgdGhlIHNlcnZlciBvbmNlIHBlciBjZXJ0aWZpY2F0ZSB0eXBlIHdoZW4gcmVxdWVzdGluZyBtYW55IHRpbWVzJywgYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3Qgc2VydmljZSA9IGluaXRpYWxpemVUZXN0U2VydmljZSgpO1xuXG4gICAgICBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICAgIHNlcnZpY2UuZ2V0KFNlbmRlckNlcnRpZmljYXRlTW9kZS5XaXRoRTE2NCksXG4gICAgICAgIHNlcnZpY2UuZ2V0KFNlbmRlckNlcnRpZmljYXRlTW9kZS5XaXRob3V0RTE2NCksXG4gICAgICAgIHNlcnZpY2UuZ2V0KFNlbmRlckNlcnRpZmljYXRlTW9kZS5XaXRoRTE2NCksXG4gICAgICAgIHNlcnZpY2UuZ2V0KFNlbmRlckNlcnRpZmljYXRlTW9kZS5XaXRob3V0RTE2NCksXG4gICAgICAgIHNlcnZpY2UuZ2V0KFNlbmRlckNlcnRpZmljYXRlTW9kZS5XaXRoRTE2NCksXG4gICAgICAgIHNlcnZpY2UuZ2V0KFNlbmRlckNlcnRpZmljYXRlTW9kZS5XaXRob3V0RTE2NCksXG4gICAgICAgIHNlcnZpY2UuZ2V0KFNlbmRlckNlcnRpZmljYXRlTW9kZS5XaXRoRTE2NCksXG4gICAgICAgIHNlcnZpY2UuZ2V0KFNlbmRlckNlcnRpZmljYXRlTW9kZS5XaXRob3V0RTE2NCksXG4gICAgICBdKTtcblxuICAgICAgc2lub24uYXNzZXJ0LmNhbGxlZFR3aWNlKGZha2VTZXJ2ZXIuZ2V0U2VuZGVyQ2VydGlmaWNhdGUpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2hpdHMgdGhlIHNlcnZlciBhZ2FpbiBhZnRlciBhIHJlcXVlc3QgaGFzIGNvbXBsZXRlZCcsIGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IHNlcnZpY2UgPSBpbml0aWFsaXplVGVzdFNlcnZpY2UoKTtcblxuICAgICAgYXdhaXQgc2VydmljZS5nZXQoU2VuZGVyQ2VydGlmaWNhdGVNb2RlLldpdGhFMTY0KTtcbiAgICAgIHNpbm9uLmFzc2VydC5jYWxsZWRPbmNlKGZha2VTZXJ2ZXIuZ2V0U2VuZGVyQ2VydGlmaWNhdGUpO1xuICAgICAgYXdhaXQgc2VydmljZS5nZXQoU2VuZGVyQ2VydGlmaWNhdGVNb2RlLldpdGhFMTY0KTtcblxuICAgICAgc2lub24uYXNzZXJ0LmNhbGxlZFR3aWNlKGZha2VTZXJ2ZXIuZ2V0U2VuZGVyQ2VydGlmaWNhdGUpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgdW5kZWZpbmVkIGlmIHRoZSByZXF1ZXN0IHRvIHRoZSBzZXJ2ZXIgZmFpbHMnLCBhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBzZXJ2aWNlID0gaW5pdGlhbGl6ZVRlc3RTZXJ2aWNlKCk7XG5cbiAgICAgIGZha2VTZXJ2ZXIuZ2V0U2VuZGVyQ2VydGlmaWNhdGUucmVqZWN0cyhuZXcgRXJyb3IoJ3VoIG9oJykpO1xuXG4gICAgICBhc3NlcnQuaXNVbmRlZmluZWQoYXdhaXQgc2VydmljZS5nZXQoU2VuZGVyQ2VydGlmaWNhdGVNb2RlLldpdGhFMTY0KSk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyB1bmRlZmluZWQgaWYgdGhlIHNlcnZlciByZXR1cm5zIGFuIGFscmVhZHktZXhwaXJlZCBjZXJ0aWZpY2F0ZScsIGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IHNlcnZpY2UgPSBpbml0aWFsaXplVGVzdFNlcnZpY2UoKTtcblxuICAgICAgY29uc3QgZXhwaXJlZENlcnRpZmljYXRlID0gbmV3IFNlbmRlckNlcnRpZmljYXRlKCk7XG4gICAgICBjb25zdCBjZXJ0aWZpY2F0ZSA9IG5ldyBTZW5kZXJDZXJ0aWZpY2F0ZS5DZXJ0aWZpY2F0ZSgpO1xuICAgICAgY2VydGlmaWNhdGUuZXhwaXJlcyA9IExvbmcuZnJvbU51bWJlcihEYXRlLm5vdygpIC0gMTAwMCk7XG4gICAgICBleHBpcmVkQ2VydGlmaWNhdGUuY2VydGlmaWNhdGUgPVxuICAgICAgICBTZW5kZXJDZXJ0aWZpY2F0ZS5DZXJ0aWZpY2F0ZS5lbmNvZGUoY2VydGlmaWNhdGUpLmZpbmlzaCgpO1xuICAgICAgZmFrZVNlcnZlci5nZXRTZW5kZXJDZXJ0aWZpY2F0ZS5yZXNvbHZlcyh7XG4gICAgICAgIGNlcnRpZmljYXRlOiBCeXRlcy50b0Jhc2U2NChcbiAgICAgICAgICBTZW5kZXJDZXJ0aWZpY2F0ZS5lbmNvZGUoZXhwaXJlZENlcnRpZmljYXRlKS5maW5pc2goKVxuICAgICAgICApLFxuICAgICAgfSk7XG5cbiAgICAgIGFzc2VydC5pc1VuZGVmaW5lZChhd2FpdCBzZXJ2aWNlLmdldChTZW5kZXJDZXJ0aWZpY2F0ZU1vZGUuV2l0aEUxNjQpKTtcbiAgICB9KTtcblxuICAgIGl0KCdjbGVhciB3YWl0cyBmb3IgYW55IG91dHN0YW5kaW5nIHJlcXVlc3RzIHRoZW4gZXJhc2VzIHN0b3JhZ2UnLCBhc3luYyAoKSA9PiB7XG4gICAgICBsZXQgY291bnQgPSAwO1xuXG4gICAgICBmYWtlU2VydmVyID0ge1xuICAgICAgICBnZXRTZW5kZXJDZXJ0aWZpY2F0ZTogc2lub24uc3B5KGFzeW5jICgpID0+IHtcbiAgICAgICAgICBhd2FpdCBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgNTAwKSk7XG5cbiAgICAgICAgICBjb3VudCArPSAxO1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBjZXJ0aWZpY2F0ZTogQnl0ZXMudG9CYXNlNjQoZmFrZVZhbGlkRW5jb2RlZENlcnRpZmljYXRlKSxcbiAgICAgICAgICB9O1xuICAgICAgICB9KSxcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IHNlcnZpY2UgPSBpbml0aWFsaXplVGVzdFNlcnZpY2UoKTtcblxuICAgICAgc2VydmljZS5nZXQoU2VuZGVyQ2VydGlmaWNhdGVNb2RlLldpdGhFMTY0KTtcbiAgICAgIHNlcnZpY2UuZ2V0KFNlbmRlckNlcnRpZmljYXRlTW9kZS5XaXRob3V0RTE2NCk7XG5cbiAgICAgIGF3YWl0IHNlcnZpY2UuY2xlYXIoKTtcblxuICAgICAgYXNzZXJ0LmVxdWFsKGNvdW50LCAyKTtcblxuICAgICAgYXNzZXJ0LmlzVW5kZWZpbmVkKGZha2VTdG9yYWdlLmdldCgnc2VuZGVyQ2VydGlmaWNhdGUnKSk7XG4gICAgICBhc3NlcnQuaXNVbmRlZmluZWQoZmFrZVN0b3JhZ2UuZ2V0KCdzZW5kZXJDZXJ0aWZpY2F0ZU5vRTE2NCcpKTtcbiAgICB9KTtcbiAgfSk7XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFNQSxrQkFBdUI7QUFDdkIsWUFBdUI7QUFDdkIsa0JBQTJCO0FBQzNCLGtCQUFpQjtBQUNqQixnQkFBMkI7QUFDM0IsWUFBdUI7QUFDdkIsNkJBQXNDO0FBQ3RDLHNCQUF1QztBQUV2QywrQkFBeUM7QUFFekMsTUFBTyxvQkFBb0IsOEJBQU07QUFFakMsU0FBUyw0QkFBNEIsTUFBTTtBQUN6QyxRQUFNLGtCQUFrQixLQUFLLFVBQVU7QUFFdkMsTUFBSTtBQUNKLE1BQUk7QUFDSixNQUFJO0FBQ0osTUFBSTtBQUNKLE1BQUk7QUFDSixNQUFJO0FBQ0osTUFBSTtBQUVKLG1DQUEyRDtBQUN6RCxVQUFNLFNBQVMsSUFBSSxrREFBeUI7QUFDNUMsV0FBTyxXQUFXO0FBQUEsTUFDaEIsUUFBUTtBQUFBLE1BQ1IsV0FBVztBQUFBLE1BQ1gsbUJBQW1CO0FBQUEsTUFD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
