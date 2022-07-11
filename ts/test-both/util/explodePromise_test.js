var import_chai = require("chai");
var import_explodePromise = require("../../util/explodePromise");
describe("explodePromise", () => {
  it("resolves the promise", async () => {
    const { promise, resolve } = (0, import_explodePromise.explodePromise)();
    resolve(42);
    import_chai.assert.strictEqual(await promise, 42);
  });
  it("rejects the promise", async () => {
    const { promise, reject } = (0, import_explodePromise.explodePromise)();
    reject(new Error("rejected"));
    await import_chai.assert.isRejected(promise, "rejected");
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZXhwbG9kZVByb21pc2VfdGVzdC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyBhc3NlcnQgfSBmcm9tICdjaGFpJztcblxuaW1wb3J0IHsgZXhwbG9kZVByb21pc2UgfSBmcm9tICcuLi8uLi91dGlsL2V4cGxvZGVQcm9taXNlJztcblxuZGVzY3JpYmUoJ2V4cGxvZGVQcm9taXNlJywgKCkgPT4ge1xuICBpdCgncmVzb2x2ZXMgdGhlIHByb21pc2UnLCBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgeyBwcm9taXNlLCByZXNvbHZlIH0gPSBleHBsb2RlUHJvbWlzZTxudW1iZXI+KCk7XG5cbiAgICByZXNvbHZlKDQyKTtcblxuICAgIGFzc2VydC5zdHJpY3RFcXVhbChhd2FpdCBwcm9taXNlLCA0Mik7XG4gIH0pO1xuXG4gIGl0KCdyZWplY3RzIHRoZSBwcm9taXNlJywgYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IHsgcHJvbWlzZSwgcmVqZWN0IH0gPSBleHBsb2RlUHJvbWlzZTxudW1iZXI+KCk7XG5cbiAgICByZWplY3QobmV3IEVycm9yKCdyZWplY3RlZCcpKTtcblxuICAgIGF3YWl0IGFzc2VydC5pc1JlamVjdGVkKHByb21pc2UsICdyZWplY3RlZCcpO1xuICB9KTtcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIkFBR0Esa0JBQXVCO0FBRXZCLDRCQUErQjtBQUUvQixTQUFTLGtCQUFrQixNQUFNO0FBQy9CLEtBQUcsd0JBQXdCLFlBQVk7QUFDckMsVUFBTSxFQUFFLFNBQVMsWUFBWSwwQ0FBdUI7QUFFcEQsWUFBUSxFQUFFO0FBRVYsdUJBQU8sWUFBWSxNQUFNLFNBQVMsRUFBRTtBQUFBLEVBQ3RDLENBQUM7QUFFRCxLQUFHLHVCQUF1QixZQUFZO0FBQ3BDLFVBQU0sRUFBRSxTQUFTLFdBQVcsMENBQXVCO0FBRW5ELFdBQU8sSUFBSSxNQUFNLFVBQVUsQ0FBQztBQUU1QixVQUFNLG1CQUFPLFdBQVcsU0FBUyxVQUFVO0FBQUEsRUFDN0MsQ0FBQztBQUNILENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
