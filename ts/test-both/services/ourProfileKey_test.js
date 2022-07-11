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
var import_lodash = require("lodash");
var import_sleep = require("../../util/sleep");
var import_Crypto = require("../../Crypto");
var import_ourProfileKey = require("../../services/ourProfileKey");
describe('"our profile key" service', () => {
  const createFakeStorage = /* @__PURE__ */ __name(() => ({
    get: sinon.stub(),
    put: sinon.stub().resolves(),
    remove: sinon.stub().resolves(),
    onready: sinon.stub().callsArg(0)
  }), "createFakeStorage");
  describe("get", () => {
    it("fetches the key from storage if it's there", async () => {
      const fakeProfileKey = new Uint8Array(2);
      const fakeStorage = createFakeStorage();
      fakeStorage.get.withArgs("profileKey").returns(fakeProfileKey);
      const service = new import_ourProfileKey.OurProfileKeyService();
      service.initialize(fakeStorage);
      const profileKey = await service.get();
      import_chai.assert.isTrue(profileKey && (0, import_Crypto.constantTimeEqual)(profileKey, fakeProfileKey));
    });
    it("resolves with undefined if the key is not in storage", async () => {
      const service = new import_ourProfileKey.OurProfileKeyService();
      service.initialize(createFakeStorage());
      import_chai.assert.isUndefined(await service.get());
    });
    it("doesn't grab the profile key from storage until storage is ready", async () => {
      let onReadyCallback = import_lodash.noop;
      const fakeStorage = {
        ...createFakeStorage(),
        get: sinon.stub().returns(new Uint8Array(2)),
        onready: sinon.stub().callsFake((callback) => {
          onReadyCallback = callback;
        })
      };
      const service = new import_ourProfileKey.OurProfileKeyService();
      service.initialize(fakeStorage);
      const getPromise = service.get();
      await (0, import_sleep.sleep)(1);
      sinon.assert.notCalled(fakeStorage.get);
      onReadyCallback();
      await getPromise;
      sinon.assert.calledOnce(fakeStorage.get);
    });
    it("doesn't grab the profile key until all blocking promises are ready", async () => {
      const fakeStorage = createFakeStorage();
      const service = new import_ourProfileKey.OurProfileKeyService();
      service.initialize(fakeStorage);
      let resolve1 = import_lodash.noop;
      service.blockGetWithPromise(new Promise((resolve) => {
        resolve1 = resolve;
      }));
      let reject2 = import_lodash.noop;
      service.blockGetWithPromise(new Promise((_resolve, reject) => {
        reject2 = reject;
      }));
      let reject3 = import_lodash.noop;
      service.blockGetWithPromise(new Promise((_resolve, reject) => {
        reject3 = reject;
      }));
      const getPromise = service.get();
      resolve1();
      await (0, import_sleep.sleep)(1);
      sinon.assert.notCalled(fakeStorage.get);
      reject2(new Error("uh oh"));
      await (0, import_sleep.sleep)(1);
      sinon.assert.notCalled(fakeStorage.get);
      reject3(new Error("oh no"));
      await getPromise;
      sinon.assert.calledOnce(fakeStorage.get);
    });
    it("if there are blocking promises, doesn't grab the profile key from storage more than once (in other words, subsequent calls piggyback)", async () => {
      const fakeStorage = createFakeStorage();
      fakeStorage.get.returns(new Uint8Array(2));
      const service = new import_ourProfileKey.OurProfileKeyService();
      service.initialize(fakeStorage);
      let resolve = import_lodash.noop;
      service.blockGetWithPromise(new Promise((innerResolve) => {
        resolve = innerResolve;
      }));
      const getPromises = [service.get(), service.get(), service.get()];
      resolve();
      const results = await Promise.all(getPromises);
      (0, import_chai.assert)(new Set(results).size === 1, "All results should be the same");
      sinon.assert.calledOnce(fakeStorage.get);
    });
    it("removes all of the blocking promises after waiting for them once", async () => {
      const fakeStorage = createFakeStorage();
      const service = new import_ourProfileKey.OurProfileKeyService();
      service.initialize(fakeStorage);
      let resolve = import_lodash.noop;
      service.blockGetWithPromise(new Promise((innerResolve) => {
        resolve = innerResolve;
      }));
      const getPromise = service.get();
      sinon.assert.notCalled(fakeStorage.get);
      resolve();
      await getPromise;
      sinon.assert.calledOnce(fakeStorage.get);
      await service.get();
      sinon.assert.calledTwice(fakeStorage.get);
    });
  });
  describe("set", () => {
    it("updates the key in storage", async () => {
      const fakeProfileKey = new Uint8Array(2);
      const fakeStorage = createFakeStorage();
      const service = new import_ourProfileKey.OurProfileKeyService();
      service.initialize(fakeStorage);
      await service.set(fakeProfileKey);
      sinon.assert.calledOnce(fakeStorage.put);
      sinon.assert.calledWith(fakeStorage.put, "profileKey", fakeProfileKey);
    });
    it("clears the key in storage", async () => {
      const fakeStorage = createFakeStorage();
      const service = new import_ourProfileKey.OurProfileKeyService();
      service.initialize(fakeStorage);
      await service.set(void 0);
      sinon.assert.calledOnce(fakeStorage.remove);
      sinon.assert.calledWith(fakeStorage.remove, "profileKey");
    });
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsib3VyUHJvZmlsZUtleV90ZXN0LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IGFzc2VydCB9IGZyb20gJ2NoYWknO1xuaW1wb3J0ICogYXMgc2lub24gZnJvbSAnc2lub24nO1xuaW1wb3J0IHsgbm9vcCB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBzbGVlcCB9IGZyb20gJy4uLy4uL3V0aWwvc2xlZXAnO1xuXG5pbXBvcnQgeyBjb25zdGFudFRpbWVFcXVhbCB9IGZyb20gJy4uLy4uL0NyeXB0byc7XG5pbXBvcnQgeyBPdXJQcm9maWxlS2V5U2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL291clByb2ZpbGVLZXknO1xuXG5kZXNjcmliZSgnXCJvdXIgcHJvZmlsZSBrZXlcIiBzZXJ2aWNlJywgKCkgPT4ge1xuICBjb25zdCBjcmVhdGVGYWtlU3RvcmFnZSA9ICgpID0+ICh7XG4gICAgZ2V0OiBzaW5vbi5zdHViKCksXG4gICAgcHV0OiBzaW5vbi5zdHViKCkucmVzb2x2ZXMoKSxcbiAgICByZW1vdmU6IHNpbm9uLnN0dWIoKS5yZXNvbHZlcygpLFxuICAgIG9ucmVhZHk6IHNpbm9uLnN0dWIoKS5jYWxsc0FyZygwKSxcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ2dldCcsICgpID0+IHtcbiAgICBpdChcImZldGNoZXMgdGhlIGtleSBmcm9tIHN0b3JhZ2UgaWYgaXQncyB0aGVyZVwiLCBhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBmYWtlUHJvZmlsZUtleSA9IG5ldyBVaW50OEFycmF5KDIpO1xuICAgICAgY29uc3QgZmFrZVN0b3JhZ2UgPSBjcmVhdGVGYWtlU3RvcmFnZSgpO1xuICAgICAgZmFrZVN0b3JhZ2UuZ2V0LndpdGhBcmdzKCdwcm9maWxlS2V5JykucmV0dXJucyhmYWtlUHJvZmlsZUtleSk7XG5cbiAgICAgIGNvbnN0IHNlcnZpY2UgPSBuZXcgT3VyUHJvZmlsZUtleVNlcnZpY2UoKTtcbiAgICAgIHNlcnZpY2UuaW5pdGlhbGl6ZShmYWtlU3RvcmFnZSk7XG5cbiAgICAgIGNvbnN0IHByb2ZpbGVLZXkgPSBhd2FpdCBzZXJ2aWNlLmdldCgpO1xuICAgICAgYXNzZXJ0LmlzVHJ1ZShcbiAgICAgICAgcHJvZmlsZUtleSAmJiBjb25zdGFudFRpbWVFcXVhbChwcm9maWxlS2V5LCBmYWtlUHJvZmlsZUtleSlcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICBpdCgncmVzb2x2ZXMgd2l0aCB1bmRlZmluZWQgaWYgdGhlIGtleSBpcyBub3QgaW4gc3RvcmFnZScsIGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IHNlcnZpY2UgPSBuZXcgT3VyUHJvZmlsZUtleVNlcnZpY2UoKTtcbiAgICAgIHNlcnZpY2UuaW5pdGlhbGl6ZShjcmVhdGVGYWtlU3RvcmFnZSgpKTtcblxuICAgICAgYXNzZXJ0LmlzVW5kZWZpbmVkKGF3YWl0IHNlcnZpY2UuZ2V0KCkpO1xuICAgIH0pO1xuXG4gICAgaXQoXCJkb2Vzbid0IGdyYWIgdGhlIHByb2ZpbGUga2V5IGZyb20gc3RvcmFnZSB1bnRpbCBzdG9yYWdlIGlzIHJlYWR5XCIsIGFzeW5jICgpID0+IHtcbiAgICAgIGxldCBvblJlYWR5Q2FsbGJhY2sgPSBub29wO1xuICAgICAgY29uc3QgZmFrZVN0b3JhZ2UgPSB7XG4gICAgICAgIC4uLmNyZWF0ZUZha2VTdG9yYWdlKCksXG4gICAgICAgIGdldDogc2lub24uc3R1YigpLnJldHVybnMobmV3IFVpbnQ4QXJyYXkoMikpLFxuICAgICAgICBvbnJlYWR5OiBzaW5vbi5zdHViKCkuY2FsbHNGYWtlKGNhbGxiYWNrID0+IHtcbiAgICAgICAgICBvblJlYWR5Q2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgICAgICAgfSksXG4gICAgICB9O1xuXG4gICAgICBjb25zdCBzZXJ2aWNlID0gbmV3IE91clByb2ZpbGVLZXlTZXJ2aWNlKCk7XG4gICAgICBzZXJ2aWNlLmluaXRpYWxpemUoZmFrZVN0b3JhZ2UpO1xuXG4gICAgICBjb25zdCBnZXRQcm9taXNlID0gc2VydmljZS5nZXQoKTtcblxuICAgICAgLy8gV2Ugd2FudCB0byBtYWtlIHN1cmUgdGhpcyBpc24ndCBjYWxsZWQgZXZlbiBhZnRlciBhIHRpY2sgb2YgdGhlIGV2ZW50IGxvb3AuXG4gICAgICBhd2FpdCBzbGVlcCgxKTtcbiAgICAgIHNpbm9uLmFzc2VydC5ub3RDYWxsZWQoZmFrZVN0b3JhZ2UuZ2V0KTtcblxuICAgICAgb25SZWFkeUNhbGxiYWNrKCk7XG5cbiAgICAgIGF3YWl0IGdldFByb21pc2U7XG4gICAgICBzaW5vbi5hc3NlcnQuY2FsbGVkT25jZShmYWtlU3RvcmFnZS5nZXQpO1xuICAgIH0pO1xuXG4gICAgaXQoXCJkb2Vzbid0IGdyYWIgdGhlIHByb2ZpbGUga2V5IHVudGlsIGFsbCBibG9ja2luZyBwcm9taXNlcyBhcmUgcmVhZHlcIiwgYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgZmFrZVN0b3JhZ2UgPSBjcmVhdGVGYWtlU3RvcmFnZSgpO1xuXG4gICAgICBjb25zdCBzZXJ2aWNlID0gbmV3IE91clByb2ZpbGVLZXlTZXJ2aWNlKCk7XG4gICAgICBzZXJ2aWNlLmluaXRpYWxpemUoZmFrZVN0b3JhZ2UpO1xuXG4gICAgICBsZXQgcmVzb2x2ZTEgPSBub29wO1xuICAgICAgc2VydmljZS5ibG9ja0dldFdpdGhQcm9taXNlKFxuICAgICAgICBuZXcgUHJvbWlzZTx2b2lkPihyZXNvbHZlID0+IHtcbiAgICAgICAgICByZXNvbHZlMSA9IHJlc29sdmU7XG4gICAgICAgIH0pXG4gICAgICApO1xuXG4gICAgICBsZXQgcmVqZWN0MiA9IG5vb3A7XG4gICAgICBzZXJ2aWNlLmJsb2NrR2V0V2l0aFByb21pc2UoXG4gICAgICAgIG5ldyBQcm9taXNlPHZvaWQ+KChfcmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgcmVqZWN0MiA9IHJlamVjdDtcbiAgICAgICAgfSlcbiAgICAgICk7XG5cbiAgICAgIGxldCByZWplY3QzID0gbm9vcDtcbiAgICAgIHNlcnZpY2UuYmxvY2tHZXRXaXRoUHJvbWlzZShcbiAgICAgICAgbmV3IFByb21pc2U8dm9pZD4oKF9yZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICByZWplY3QzID0gcmVqZWN0O1xuICAgICAgICB9KVxuICAgICAgKTtcblxuICAgICAgY29uc3QgZ2V0UHJvbWlzZSA9IHNlcnZpY2UuZ2V0KCk7XG5cbiAgICAgIHJlc29sdmUxKCk7XG4gICAgICBhd2FpdCBzbGVlcCgxKTtcbiAgICAgIHNpbm9uLmFzc2VydC5ub3RDYWxsZWQoZmFrZVN0b3JhZ2UuZ2V0KTtcblxuICAgICAgcmVqZWN0MihuZXcgRXJyb3IoJ3VoIG9oJykpO1xuICAgICAgYXdhaXQgc2xlZXAoMSk7XG4gICAgICBzaW5vbi5hc3NlcnQubm90Q2FsbGVkKGZha2VTdG9yYWdlLmdldCk7XG5cbiAgICAgIHJlamVjdDMobmV3IEVycm9yKCdvaCBubycpKTtcblxuICAgICAgYXdhaXQgZ2V0UHJvbWlzZTtcblxuICAgICAgc2lub24uYXNzZXJ0LmNhbGxlZE9uY2UoZmFrZVN0b3JhZ2UuZ2V0KTtcbiAgICB9KTtcblxuICAgIGl0KFwiaWYgdGhlcmUgYXJlIGJsb2NraW5nIHByb21pc2VzLCBkb2Vzbid0IGdyYWIgdGhlIHByb2ZpbGUga2V5IGZyb20gc3RvcmFnZSBtb3JlIHRoYW4gb25jZSAoaW4gb3RoZXIgd29yZHMsIHN1YnNlcXVlbnQgY2FsbHMgcGlnZ3liYWNrKVwiLCBhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBmYWtlU3RvcmFnZSA9IGNyZWF0ZUZha2VTdG9yYWdlKCk7XG4gICAgICBmYWtlU3RvcmFnZS5nZXQucmV0dXJucyhuZXcgVWludDhBcnJheSgyKSk7XG5cbiAgICAgIGNvbnN0IHNlcnZpY2UgPSBuZXcgT3VyUHJvZmlsZUtleVNlcnZpY2UoKTtcbiAgICAgIHNlcnZpY2UuaW5pdGlhbGl6ZShmYWtlU3RvcmFnZSk7XG5cbiAgICAgIGxldCByZXNvbHZlID0gbm9vcDtcbiAgICAgIHNlcnZpY2UuYmxvY2tHZXRXaXRoUHJvbWlzZShcbiAgICAgICAgbmV3IFByb21pc2U8dm9pZD4oaW5uZXJSZXNvbHZlID0+IHtcbiAgICAgICAgICByZXNvbHZlID0gaW5uZXJSZXNvbHZlO1xuICAgICAgICB9KVxuICAgICAgKTtcblxuICAgICAgY29uc3QgZ2V0UHJvbWlzZXMgPSBbc2VydmljZS5nZXQoKSwgc2VydmljZS5nZXQoKSwgc2VydmljZS5nZXQoKV07XG4gICAgICByZXNvbHZlKCk7XG4gICAgICBjb25zdCByZXN1bHRzID0gYXdhaXQgUHJvbWlzZS5hbGwoZ2V0UHJvbWlzZXMpO1xuICAgICAgYXNzZXJ0KG5ldyBTZXQocmVzdWx0cykuc2l6ZSA9PT0gMSwgJ0FsbCByZXN1bHRzIHNob3VsZCBiZSB0aGUgc2FtZScpO1xuXG4gICAgICBzaW5vbi5hc3NlcnQuY2FsbGVkT25jZShmYWtlU3RvcmFnZS5nZXQpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JlbW92ZXMgYWxsIG9mIHRoZSBibG9ja2luZyBwcm9taXNlcyBhZnRlciB3YWl0aW5nIGZvciB0aGVtIG9uY2UnLCBhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBmYWtlU3RvcmFnZSA9IGNyZWF0ZUZha2VTdG9yYWdlKCk7XG5cbiAgICAgIGNvbnN0IHNlcnZpY2UgPSBuZXcgT3VyUHJvZmlsZUtleVNlcnZpY2UoKTtcbiAgICAgIHNlcnZpY2UuaW5pdGlhbGl6ZShmYWtlU3RvcmFnZSk7XG5cbiAgICAgIGxldCByZXNvbHZlID0gbm9vcDtcbiAgICAgIHNlcnZpY2UuYmxvY2tHZXRXaXRoUHJvbWlzZShcbiAgICAgICAgbmV3IFByb21pc2U8dm9pZD4oaW5uZXJSZXNvbHZlID0+IHtcbiAgICAgICAgICByZXNvbHZlID0gaW5uZXJSZXNvbHZlO1xuICAgICAgICB9KVxuICAgICAgKTtcblxuICAgICAgY29uc3QgZ2V0UHJvbWlzZSA9IHNlcnZpY2UuZ2V0KCk7XG5cbiAgICAgIHNpbm9uLmFzc2VydC5ub3RDYWxsZWQoZmFrZVN0b3JhZ2UuZ2V0KTtcbiAgICAgIHJlc29sdmUoKTtcbiAgICAgIGF3YWl0IGdldFByb21pc2U7XG4gICAgICBzaW5vbi5hc3NlcnQuY2FsbGVkT25jZShmYWtlU3RvcmFnZS5nZXQpO1xuXG4gICAgICBhd2FpdCBzZXJ2aWNlLmdldCgpO1xuICAgICAgc2lub24uYXNzZXJ0LmNhbGxlZFR3aWNlKGZha2VTdG9yYWdlLmdldCk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdzZXQnLCAoKSA9PiB7XG4gICAgaXQoJ3VwZGF0ZXMgdGhlIGtleSBpbiBzdG9yYWdlJywgYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgZmFrZVByb2ZpbGVLZXkgPSBuZXcgVWludDhBcnJheSgyKTtcbiAgICAgIGNvbnN0IGZha2VTdG9yYWdlID0gY3JlYXRlRmFrZVN0b3JhZ2UoKTtcblxuICAgICAgY29uc3Qgc2VydmljZSA9IG5ldyBPdXJQcm9maWxlS2V5U2VydmljZSgpO1xuICAgICAgc2VydmljZS5pbml0aWFsaXplKGZha2VTdG9yYWdlKTtcbiAgICAgIGF3YWl0IHNlcnZpY2Uuc2V0KGZha2VQcm9maWxlS2V5KTtcblxuICAgICAgc2lub24uYXNzZXJ0LmNhbGxlZE9uY2UoZmFrZVN0b3JhZ2UucHV0KTtcbiAgICAgIHNpbm9uLmFzc2VydC5jYWxsZWRXaXRoKGZha2VTdG9yYWdlLnB1dCwgJ3Byb2ZpbGVLZXknLCBmYWtlUHJvZmlsZUtleSk7XG4gICAgfSk7XG5cbiAgICBpdCgnY2xlYXJzIHRoZSBrZXkgaW4gc3RvcmFnZScsIGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IGZha2VTdG9yYWdlID0gY3JlYXRlRmFrZVN0b3JhZ2UoKTtcblxuICAgICAgY29uc3Qgc2VydmljZSA9IG5ldyBPdXJQcm9maWxlS2V5U2VydmljZSgpO1xuICAgICAgc2VydmljZS5pbml0aWFsaXplKGZha2VTdG9yYWdlKTtcbiAgICAgIGF3YWl0IHNlcnZpY2Uuc2V0KHVuZGVmaW5lZCk7XG5cbiAgICAgIHNpbm9uLmFzc2VydC5jYWxsZWRPbmNlKGZha2VTdG9yYWdlLnJlbW92ZSk7XG4gICAgICBzaW5vbi5hc3NlcnQuY2FsbGVkV2l0aChmYWtlU3RvcmFnZS5yZW1vdmUsICdwcm9maWxlS2V5Jyk7XG4gICAgfSk7XG4gIH0pO1xufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7O0FBR0Esa0JBQXVCO0FBQ3ZCLFlBQXVCO0FBQ3ZCLG9CQUFxQjtBQUNyQixtQkFBc0I7QUFFdEIsb0JBQWtDO0FBQ2xDLDJCQUFxQztBQUVyQyxTQUFTLDZCQUE2QixNQUFNO0FBQzFDLFFBQU0sb0JBQW9CLDZCQUFPO0FBQUEsSUFDL0IsS0FBSyxNQUFNLEtBQUs7QUFBQSxJQUNoQixLQUFLLE1BQU0sS0FBSyxFQUFFLFNBQVM7QUFBQSxJQUMzQixRQUFRLE1BQU0sS0FBSyxFQUFFLFNBQVM7QUFBQSxJQUM5QixTQUFTLE1BQU0sS0FBSyxFQUFFLFNBQVMsQ0FBQztBQUFBLEVBQ2xDLElBTDBCO0FBTzFCLFdBQVMsT0FBTyxNQUFNO0FBQ3BCLE9BQUcsOENBQThDLFlBQVk7QUFDM0QsWUFBTSxpQkFBaUIsSUFBSSxXQUFXLENBQUM7QUFDdkMsWUFBTSxjQUFjLGtCQUFrQjtBQUN0QyxrQkFBWSxJQUFJLFNBQVMsWUFBWSxFQUFFLFFBQVEsY0FBYztBQUU3RCxZQUFNLFVBQVUsSUFBSSwwQ0FBcUI7QUFDekMsY0FBUSxXQUFXLFdBQVc7QUFFOUIsWUFBTSxhQUFhLE1BQU0sUUFBUSxJQUFJO0FBQ3JDLHlCQUFPLE9BQ0wsY0FBYyxxQ0FBa0IsWUFBWSxjQUFjLENBQzVEO0FBQUEsSUFDRixDQUFDO0FBRUQsT0FBRyx3REFBd0QsWUFBWTtBQUNyRSxZQUFNLFVBQVUsSUFBSSwwQ0FBcUI7QUFDekMsY0FBUSxXQUFXLGtCQUFrQixDQUFDO0FBRXRDLHlCQUFPLFlBQVksTUFBTSxR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
