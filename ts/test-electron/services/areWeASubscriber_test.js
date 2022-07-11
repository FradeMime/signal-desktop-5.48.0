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
var sinon = __toESM(require("sinon"));
var import_areWeASubscriber = require("../../services/areWeASubscriber");
var import_explodePromise = require("../../util/explodePromise");
describe('"are we a subscriber?" service', () => {
  const subscriberId = new Uint8Array([1, 2, 3]);
  const fakeStorageDefaults = {
    onready: sinon.stub().callsArg(0),
    get: sinon.stub().withArgs("subscriberId").returns(subscriberId)
  };
  let sandbox;
  let service;
  beforeEach(() => {
    sandbox = sinon.createSandbox();
    service = new import_areWeASubscriber.AreWeASubscriberService();
    sandbox.stub(navigator, "onLine").get(() => true);
  });
  it("stores false if there's no local subscriber ID", (done) => {
    const fakeServer = { getHasSubscription: sandbox.stub() };
    const fakeStorage = {
      ...fakeStorageDefaults,
      get: () => void 0,
      put: sandbox.stub().callsFake((key, value) => {
        import_chai.assert.strictEqual(key, "areWeASubscriber");
        import_chai.assert.isFalse(value);
        done();
      })
    };
    service.update(fakeStorage, fakeServer);
  });
  it("doesn't make a network request if there's no local subscriber ID", (done) => {
    const fakeServer = { getHasSubscription: sandbox.stub() };
    const fakeStorage = {
      ...fakeStorageDefaults,
      get: () => void 0,
      put: sandbox.stub().callsFake(() => {
        sinon.assert.notCalled(fakeServer.getHasSubscription);
        done();
      })
    };
    service.update(fakeStorage, fakeServer);
  });
  it("requests the subscriber ID from the server", (done) => {
    const fakeServer = { getHasSubscription: sandbox.stub().resolves(false) };
    const fakeStorage = {
      ...fakeStorageDefaults,
      put: sandbox.stub().withArgs("areWeASubscriber").callsFake(() => {
        sinon.assert.calledWithExactly(fakeServer.getHasSubscription, subscriberId);
        done();
      })
    };
    service.update(fakeStorage, fakeServer);
  });
  it("stores when we're not a subscriber", (done) => {
    const fakeServer = { getHasSubscription: sandbox.stub().resolves(false) };
    const fakeStorage = {
      ...fakeStorageDefaults,
      put: sandbox.stub().callsFake((key, value) => {
        import_chai.assert.strictEqual(key, "areWeASubscriber");
        import_chai.assert.isFalse(value);
        done();
      })
    };
    service.update(fakeStorage, fakeServer);
  });
  it("stores when we're a subscriber", (done) => {
    const fakeServer = { getHasSubscription: sandbox.stub().resolves(true) };
    const fakeStorage = {
      ...fakeStorageDefaults,
      put: sandbox.stub().callsFake((key, value) => {
        import_chai.assert.strictEqual(key, "areWeASubscriber");
        import_chai.assert.isTrue(value);
        done();
      })
    };
    service.update(fakeStorage, fakeServer);
  });
  it("only runs one request at a time and enqueues one other", async () => {
    const allDone = (0, import_explodePromise.explodePromise)();
    let putCallCount = 0;
    const fakeServer = { getHasSubscription: sandbox.stub().resolves(false) };
    const fakeStorage = {
      ...fakeStorageDefaults,
      put: sandbox.stub().callsFake(() => {
        putCallCount += 1;
        if (putCallCount === 2) {
          allDone.resolve();
        } else if (putCallCount > 2) {
          throw new Error("Unexpected call to storage put");
        }
      })
    };
    service.update(fakeStorage, fakeServer);
    service.update(fakeStorage, fakeServer);
    service.update(fakeStorage, fakeServer);
    service.update(fakeStorage, fakeServer);
    service.update(fakeStorage, fakeServer);
    await allDone.promise;
    sinon.assert.calledTwice(fakeServer.getHasSubscription);
    sinon.assert.calledTwice(fakeStorage.put);
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiYXJlV2VBU3Vic2NyaWJlcl90ZXN0LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IGFzc2VydCB9IGZyb20gJ2NoYWknO1xuaW1wb3J0ICogYXMgc2lub24gZnJvbSAnc2lub24nO1xuaW1wb3J0IHsgQXJlV2VBU3Vic2NyaWJlclNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9hcmVXZUFTdWJzY3JpYmVyJztcbmltcG9ydCB7IGV4cGxvZGVQcm9taXNlIH0gZnJvbSAnLi4vLi4vdXRpbC9leHBsb2RlUHJvbWlzZSc7XG5cbmRlc2NyaWJlKCdcImFyZSB3ZSBhIHN1YnNjcmliZXI/XCIgc2VydmljZScsICgpID0+IHtcbiAgY29uc3Qgc3Vic2NyaWJlcklkID0gbmV3IFVpbnQ4QXJyYXkoWzEsIDIsIDNdKTtcbiAgY29uc3QgZmFrZVN0b3JhZ2VEZWZhdWx0cyA9IHtcbiAgICBvbnJlYWR5OiBzaW5vbi5zdHViKCkuY2FsbHNBcmcoMCksXG4gICAgZ2V0OiBzaW5vbi5zdHViKCkud2l0aEFyZ3MoJ3N1YnNjcmliZXJJZCcpLnJldHVybnMoc3Vic2NyaWJlcklkKSxcbiAgfTtcblxuICBsZXQgc2FuZGJveDogc2lub24uU2lub25TYW5kYm94O1xuICBsZXQgc2VydmljZTogQXJlV2VBU3Vic2NyaWJlclNlcnZpY2U7XG5cbiAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgc2FuZGJveCA9IHNpbm9uLmNyZWF0ZVNhbmRib3goKTtcblxuICAgIHNlcnZpY2UgPSBuZXcgQXJlV2VBU3Vic2NyaWJlclNlcnZpY2UoKTtcbiAgICBzYW5kYm94LnN0dWIobmF2aWdhdG9yLCAnb25MaW5lJykuZ2V0KCgpID0+IHRydWUpO1xuICB9KTtcblxuICBpdChcInN0b3JlcyBmYWxzZSBpZiB0aGVyZSdzIG5vIGxvY2FsIHN1YnNjcmliZXIgSURcIiwgZG9uZSA9PiB7XG4gICAgY29uc3QgZmFrZVNlcnZlciA9IHsgZ2V0SGFzU3Vic2NyaXB0aW9uOiBzYW5kYm94LnN0dWIoKSB9O1xuICAgIGNvbnN0IGZha2VTdG9yYWdlID0ge1xuICAgICAgLi4uZmFrZVN0b3JhZ2VEZWZhdWx0cyxcbiAgICAgIGdldDogKCkgPT4gdW5kZWZpbmVkLFxuICAgICAgcHV0OiBzYW5kYm94LnN0dWIoKS5jYWxsc0Zha2UoKGtleSwgdmFsdWUpID0+IHtcbiAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGtleSwgJ2FyZVdlQVN1YnNjcmliZXInKTtcbiAgICAgICAgYXNzZXJ0LmlzRmFsc2UodmFsdWUpO1xuICAgICAgICBkb25lKCk7XG4gICAgICB9KSxcbiAgICB9O1xuXG4gICAgc2VydmljZS51cGRhdGUoZmFrZVN0b3JhZ2UsIGZha2VTZXJ2ZXIpO1xuICB9KTtcblxuICBpdChcImRvZXNuJ3QgbWFrZSBhIG5ldHdvcmsgcmVxdWVzdCBpZiB0aGVyZSdzIG5vIGxvY2FsIHN1YnNjcmliZXIgSURcIiwgZG9uZSA9PiB7XG4gICAgY29uc3QgZmFrZVNlcnZlciA9IHsgZ2V0SGFzU3Vic2NyaXB0aW9uOiBzYW5kYm94LnN0dWIoKSB9O1xuICAgIGNvbnN0IGZha2VTdG9yYWdlID0ge1xuICAgICAgLi4uZmFrZVN0b3JhZ2VEZWZhdWx0cyxcbiAgICAgIGdldDogKCkgPT4gdW5kZWZpbmVkLFxuICAgICAgcHV0OiBzYW5kYm94LnN0dWIoKS5jYWxsc0Zha2UoKCkgPT4ge1xuICAgICAgICBzaW5vbi5hc3NlcnQubm90Q2FsbGVkKGZha2VTZXJ2ZXIuZ2V0SGFzU3Vic2NyaXB0aW9uKTtcbiAgICAgICAgZG9uZSgpO1xuICAgICAgfSksXG4gICAgfTtcblxuICAgIHNlcnZpY2UudXBkYXRlKGZha2VTdG9yYWdlLCBmYWtlU2VydmVyKTtcbiAgfSk7XG5cbiAgaXQoJ3JlcXVlc3RzIHRoZSBzdWJzY3JpYmVyIElEIGZyb20gdGhlIHNlcnZlcicsIGRvbmUgPT4ge1xuICAgIGNvbnN0IGZha2VTZXJ2ZXIgPSB7IGdldEhhc1N1YnNjcmlwdGlvbjogc2FuZGJveC5zdHViKCkucmVzb2x2ZXMoZmFsc2UpIH07XG4gICAgY29uc3QgZmFrZVN0b3JhZ2UgPSB7XG4gICAgICAuLi5mYWtlU3RvcmFnZURlZmF1bHRzLFxuICAgICAgcHV0OiBzYW5kYm94XG4gICAgICAgIC5zdHViKClcbiAgICAgICAgLndpdGhBcmdzKCdhcmVXZUFTdWJzY3JpYmVyJylcbiAgICAgICAgLmNhbGxzRmFrZSgoKSA9PiB7XG4gICAgICAgICAgc2lub24uYXNzZXJ0LmNhbGxlZFdpdGhFeGFjdGx5KFxuICAgICAgICAgICAgZmFrZVNlcnZlci5nZXRIYXNTdWJzY3JpcHRpb24sXG4gICAgICAgICAgICBzdWJzY3JpYmVySWRcbiAgICAgICAgICApO1xuICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgfSksXG4gICAgfTtcblxuICAgIHNlcnZpY2UudXBkYXRlKGZha2VTdG9yYWdlLCBmYWtlU2VydmVyKTtcbiAgfSk7XG5cbiAgaXQoXCJzdG9yZXMgd2hlbiB3ZSdyZSBub3QgYSBzdWJzY3JpYmVyXCIsIGRvbmUgPT4ge1xuICAgIGNvbnN0IGZha2VTZXJ2ZXIgPSB7IGdldEhhc1N1YnNjcmlwdGlvbjogc2FuZGJveC5zdHViKCkucmVzb2x2ZXMoZmFsc2UpIH07XG4gICAgY29uc3QgZmFrZVN0b3JhZ2UgPSB7XG4gICAgICAuLi5mYWtlU3RvcmFnZURlZmF1bHRzLFxuICAgICAgcHV0OiBzYW5kYm94LnN0dWIoKS5jYWxsc0Zha2UoKGtleSwgdmFsdWUpID0+IHtcbiAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGtleSwgJ2FyZVdlQVN1YnNjcmliZXInKTtcbiAgICAgICAgYXNzZXJ0LmlzRmFsc2UodmFsdWUpO1xuICAgICAgICBkb25lKCk7XG4gICAgICB9KSxcbiAgICB9O1xuXG4gICAgc2VydmljZS51cGRhdGUoZmFrZVN0b3JhZ2UsIGZha2VTZXJ2ZXIpO1xuICB9KTtcblxuICBpdChcInN0b3JlcyB3aGVuIHdlJ3JlIGEgc3Vic2NyaWJlclwiLCBkb25lID0+IHtcbiAgICBjb25zdCBmYWtlU2VydmVyID0geyBnZXRIYXNTdWJzY3JpcHRpb246IHNhbmRib3guc3R1YigpLnJlc29sdmVzKHRydWUpIH07XG4gICAgY29uc3QgZmFrZVN0b3JhZ2UgPSB7XG4gICAgICAuLi5mYWtlU3RvcmFnZURlZmF1bHRzLFxuICAgICAgcHV0OiBzYW5kYm94LnN0dWIoKS5jYWxsc0Zha2UoKGtleSwgdmFsdWUpID0+IHtcbiAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGtleSwgJ2FyZVdlQVN1YnNjcmliZXInKTtcbiAgICAgICAgYXNzZXJ0LmlzVHJ1ZSh2YWx1ZSk7XG4gICAgICAgIGRvbmUoKTtcbiAgICAgIH0pLFxuICAgIH07XG5cbiAgICBzZXJ2aWNlLnVwZGF0ZShmYWtlU3RvcmFnZSwgZmFrZVNlcnZlcik7XG4gIH0pO1xuXG4gIGl0KCdvbmx5IHJ1bnMgb25lIHJlcXVlc3QgYXQgYSB0aW1lIGFuZCBlbnF1ZXVlcyBvbmUgb3RoZXInLCBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgYWxsRG9uZSA9IGV4cGxvZGVQcm9taXNlPHZvaWQ+KCk7XG4gICAgbGV0IHB1dENhbGxDb3VudCA9IDA7XG5cbiAgICBjb25zdCBmYWtlU2VydmVyID0geyBnZXRIYXNTdWJzY3JpcHRpb246IHNhbmRib3guc3R1YigpLnJlc29sdmVzKGZhbHNlKSB9O1xuICAgIGNvbnN0IGZha2VTdG9yYWdlID0ge1xuICAgICAgLi4uZmFrZVN0b3JhZ2VEZWZhdWx0cyxcbiAgICAgIHB1dDogc2FuZGJveC5zdHViKCkuY2FsbHNGYWtlKCgpID0+IHtcbiAgICAgICAgcHV0Q2FsbENvdW50ICs9IDE7XG4gICAgICAgIGlmIChwdXRDYWxsQ291bnQgPT09IDIpIHtcbiAgICAgICAgICBhbGxEb25lLnJlc29sdmUoKTtcbiAgICAgICAgfSBlbHNlIGlmIChwdXRDYWxsQ291bnQgPiAyKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmV4cGVjdGVkIGNhbGwgdG8gc3RvcmFnZSBwdXQnKTtcbiAgICAgICAgfVxuICAgICAgfSksXG4gICAgfTtcblxuICAgIHNlcnZpY2UudXBkYXRlKGZha2VTdG9yYWdlLCBmYWtlU2VydmVyKTtcbiAgICBzZXJ2aWNlLnVwZGF0ZShmYWtlU3RvcmFnZSwgZmFrZVNlcnZlcik7XG4gICAgc2VydmljZS51cGRhdGUoZmFrZVN0b3JhZ2UsIGZha2VTZXJ2ZXIpO1xuICAgIHNlcnZpY2UudXBkYXRlKGZha2VTdG9yYWdlLCBmYWtlU2VydmVyKTtcbiAgICBzZXJ2aWNlLnVwZGF0ZShmYWtlU3RvcmFnZSwgZmFrZVNlcnZlcik7XG5cbiAgICBhd2FpdCBhbGxEb25lLnByb21pc2U7XG5cbiAgICBzaW5vbi5hc3NlcnQuY2FsbGVkVHdpY2UoZmFrZVNlcnZlci5nZXRIYXNTdWJzY3JpcHRpb24pO1xuICAgIHNpbm9uLmFzc2VydC5jYWxsZWRUd2ljZShmYWtlU3RvcmFnZS5wdXQpO1xuICB9KTtcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7O0FBR0Esa0JBQXVCO0FBQ3ZCLFlBQXVCO0FBQ3ZCLDhCQUF3QztBQUN4Qyw0QkFBK0I7QUFFL0IsU0FBUyxrQ0FBa0MsTUFBTTtBQUMvQyxRQUFNLGVBQWUsSUFBSSxXQUFXLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztBQUM3QyxRQUFNLHNCQUFzQjtBQUFBLElBQzFCLFNBQVMsTUFBTSxLQUFLLEVBQUUsU0FBUyxDQUFDO0FBQUEsSUFDaEMsS0FBSyxNQUFNLEtBQUssRUFBRSxTQUFTLGNBQWMsRUFBRSxRQUFRLFlBQVk7QUFBQSxFQUNqRTtBQUVBLE1BQUk7QUFDSixNQUFJO0FBRUosYUFBVyxNQUFNO0FBQ2YsY0FBVSxNQUFNLGNBQWM7QUFFOUIsY0FBVSxJQUFJLGdEQUF3QjtBQUN0QyxZQUFRLEtBQUssV0FBVyxRQUFRLEVBQUUsSUFBSSxNQUFNLElBQUk7QUFBQSxFQUNsRCxDQUFDO0FBRUQsS0FBRyxrREFBa0QsVUFBUTtBQUMzRCxVQUFNLGFBQWEsRUFBRSxvQkFBb0IsUUFBUSxLQUFLLEVBQUU7QUFDeEQsVUFBTSxjQUFjO0FBQUEsU0FDZjtBQUFBLE1BQ0gsS0FBSyxNQUFNO0FBQUEsTUFDWCxLQUFLLFFBQVEsS0FBSyxFQUFFLFVBQVUsQ0FBQyxLQUFLLFVBQVU7QUFDNUMsMkJBQU8sWUFBWSxLQUFLLGtCQUFrQjtBQUMxQywyQkFBTyxRQUFRLEtBQUs7QUFDcEIsYUFBSztBQUFBLE1BQ1AsQ0FBQztBQUFBLElBQ0g7QUFFQSxZQUFRLE9BQU8sYUFBYSxVQUFVO0FBQUEsRUFDeEMsQ0FBQztBQUVELEtBQUcsb0VBQW9FLFVBQVE7QUFDN0UsVUFBTSxhQUFhLEVBQUUsb0JBQW9CLFFBQVEsS0FBSyxFQUFFO0FBQ3hELFVBQU0sY0FBYztBQUFBLFNBQ2Y7QUFBQSxNQUNILEtBQUssTUFBTTtBQUFBLE1BQ1gsS0FBSyxRQUFRLEtBQUssRUFBRSxVQUFVLE1BQU07QUFDbEMsY0FBTSxPQUFPLFVBQVUsV0FBVyxrQkFBa0I7QUFDcEQsYUFBSztBQUFBLE1BQ1AsQ0FBQztBQUFBLElBQ0g7QUFFQSxZQUFRLE9BQU8sYUFBYSxVQUFVO0FBQUEsRUFDeEMsQ0FBQztBQUVELEtBQUcsOENBQThDLFVBQVE7QUFDdkQsVUFBTSxhQUFhLEVBQUUsb0JBQW9CLFFBQVEsS0FBSyxFQUFFLFNBQVMsS0FBSyxFQUFFO0FBQ3hFLFVBQU0sY0FBYztBQUFBLFNBQ2Y7QUFBQSxNQUNILEtBQUssUUFDRixLQUFLLEVBQ0wsU0FBUyxrQkFBa0IsRUFDM0IsVUFBVSxNQUFNO0FBQ2YsY0FBTSxPQUFPLGtCQUNYLFdBQVcsb0JBQ1gsWUFDRjtBQUNBLGFBQUs7QUFBQSxNQUNQLENBQUM7QUFBQSxJQUNMO0FBRUEsWUFBUSxPQUFPLGFBQWEsVUFBVTtBQUFBLEVBQ3hDLENBQUM7QUFFRCxLQUFHLHNDQUFzQyxVQUFRO0FBQy9DLFVBQU0sYUFBYSxFQUFFLG9CQUFvQixRQUFRLEtBQUssRUFBRSxTQUFTLEtBQUssRUFBRTtBQUN4RSxVQUFNLGNBQWM7QUFBQSxTQUNmO0FBQUEsTUFDSCxLQUFLLFFBQVEsS0FBSyxFQUFFLFVBQVUsQ0FBQyxLQUFLLFVBQVU7QUFDNUMsMkJBQU8sWUFBWSxLQUFLLGtCQUFrQjtBQUMxQywyQkFBTyxRQUFRLEtBQUs7QUFDcEIsYUFBSztBQUFBLE1BQ1AsQ0FBQztBQUFBLElBQ0g7QUFFQSxZQUFRLE9BQU8sYUFBYSxVQUFVO0FBQUEsRUFDeEMsQ0FBQztBQUVELEtBQUcsa0NBQWtDLFVBQVE7QUFDM0MsVUFBTSxhQUFhLEVBQUUsb0JBQW9CLFFBQVEsS0FBSyxFQUFFLFNBQVMsSUFBSSxFQUFFO0FBQ3ZFLFVBQU0sY0FBYztBQUFBLFNBQ2Y7QUFBQSxNQUNILEtBQUssUUFBUSxLQUFLLEVBQUUsVUFBVSxDQUFDLEtBQUssVUFBVTtBQUM1QywyQkFBTyxZQUFZLEtBQUssa0JBQWtCO0FBQzFDLDJCQUFPLE9BQU8sS0FBSztBQUNuQixhQUFLO0FBQUEsTUFDUCxDQUFDO0FBQUEsSUFDSDtBQUVBLFlBQVEsT0FBTyxhQUFhLFVBQVU7QUFBQSxFQUN4QyxDQUFDO0FBRUQsS0FBRywwREFBMEQsWUFBWTtBQUN2RSxVQUFNLFVBQVUsMENBQXFCO0FBQ3JDLFFBQUksZUFBZTtBQUVuQixVQUFNLGFBQWEsRUFBRSxvQkFBb0IsUUFBUSxLQUFLLEVBQUUsU0FBUyxLQUFLLEVBQUU7QUFDeEUsVUFBTSxjQUFjO0FBQUEsU0FDZjtBQUFBLE1BQ0gsS0FBSyxRQUFRLEtBQUssRUFBRSxVQUFVLE1BQU07QUFDbEMsd0JBQWdCO0FBQ2hCLFlBQUksaUJBQWlCLEdBQUc7QUFDdEIsa0JBQVEsUUFBUTtBQUFBLFFBQ2xCLFdBQVcsZUFBZSxHQUFHO0FBQzNCLGdCQUFNLElBQUksTUFBTSxnQ0FBZ0M7QUFBQSxRQUNsRDtBQUFBLE1BQ0YsQ0FBQztBQUFBLElBQ0g7QUFFQSxZQUFRLE9BQU8sYUFBYSxVQUFVO0FBQ3RDLFlBQVEsT0FBTyxhQUFhLFVBQVU7QUFDdEMsWUFBUSxPQUFPLGFBQWEsVUFBVTtBQUN0QyxZQUFRLE9BQU8sYUFBYSxVQUFVO0FBQ3RDLFlBQVEsT0FBTyxhQUFhLFVBQVU7QUFFdEMsVUFBTSxRQUFRO0FBRWQsVUFBTSxPQUFPLFlBQVksV0FBVyxrQkFBa0I7QUFDdEQsVUFBTSxPQUFPLFlBQVksWUFBWSxHQUFHO0FBQUEsRUFDMUMsQ0FBQztBQUNILENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
