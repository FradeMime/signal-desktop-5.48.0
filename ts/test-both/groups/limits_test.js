var import_chai = require("chai");
var import_RemoteConfigStub = require("../helpers/RemoteConfigStub");
var import_limits = require("../../groups/limits");
const RECOMMENDED_SIZE_KEY = "global.groupsv2.maxGroupSize";
const HARD_LIMIT_KEY = "global.groupsv2.groupSizeHardLimit";
describe("group limit utilities", () => {
  describe("getGroupSizeRecommendedLimit", () => {
    it("throws if the value in remote config is not defined", async () => {
      await (0, import_RemoteConfigStub.updateRemoteConfig)([]);
      import_chai.assert.throws(import_limits.getGroupSizeRecommendedLimit);
    });
    it("throws if the value in remote config is not a parseable integer", async () => {
      await (0, import_RemoteConfigStub.updateRemoteConfig)([
        { name: RECOMMENDED_SIZE_KEY, value: "uh oh", enabled: true }
      ]);
      import_chai.assert.throws(import_limits.getGroupSizeRecommendedLimit);
    });
    it("returns the value in remote config, parsed as an integer", async () => {
      await (0, import_RemoteConfigStub.updateRemoteConfig)([
        { name: RECOMMENDED_SIZE_KEY, value: "123", enabled: true }
      ]);
      import_chai.assert.strictEqual((0, import_limits.getGroupSizeRecommendedLimit)(), 123);
    });
  });
  describe("getGroupSizeHardLimit", () => {
    it("throws if the value in remote config is not defined", async () => {
      await (0, import_RemoteConfigStub.updateRemoteConfig)([]);
      import_chai.assert.throws(import_limits.getGroupSizeHardLimit);
    });
    it("throws if the value in remote config is not a parseable integer", async () => {
      await (0, import_RemoteConfigStub.updateRemoteConfig)([
        { name: HARD_LIMIT_KEY, value: "uh oh", enabled: true }
      ]);
      import_chai.assert.throws(import_limits.getGroupSizeHardLimit);
    });
    it("returns the value in remote config, parsed as an integer", async () => {
      await (0, import_RemoteConfigStub.updateRemoteConfig)([
        { name: HARD_LIMIT_KEY, value: "123", enabled: true }
      ]);
      import_chai.assert.strictEqual((0, import_limits.getGroupSizeHardLimit)(), 123);
    });
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibGltaXRzX3Rlc3QudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxLTIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyBhc3NlcnQgfSBmcm9tICdjaGFpJztcbmltcG9ydCB7IHVwZGF0ZVJlbW90ZUNvbmZpZyB9IGZyb20gJy4uL2hlbHBlcnMvUmVtb3RlQ29uZmlnU3R1Yic7XG5cbmltcG9ydCB7XG4gIGdldEdyb3VwU2l6ZVJlY29tbWVuZGVkTGltaXQsXG4gIGdldEdyb3VwU2l6ZUhhcmRMaW1pdCxcbn0gZnJvbSAnLi4vLi4vZ3JvdXBzL2xpbWl0cyc7XG5cbmNvbnN0IFJFQ09NTUVOREVEX1NJWkVfS0VZID0gJ2dsb2JhbC5ncm91cHN2Mi5tYXhHcm91cFNpemUnO1xuY29uc3QgSEFSRF9MSU1JVF9LRVkgPSAnZ2xvYmFsLmdyb3Vwc3YyLmdyb3VwU2l6ZUhhcmRMaW1pdCc7XG5cbmRlc2NyaWJlKCdncm91cCBsaW1pdCB1dGlsaXRpZXMnLCAoKSA9PiB7XG4gIGRlc2NyaWJlKCdnZXRHcm91cFNpemVSZWNvbW1lbmRlZExpbWl0JywgKCkgPT4ge1xuICAgIGl0KCd0aHJvd3MgaWYgdGhlIHZhbHVlIGluIHJlbW90ZSBjb25maWcgaXMgbm90IGRlZmluZWQnLCBhc3luYyAoKSA9PiB7XG4gICAgICBhd2FpdCB1cGRhdGVSZW1vdGVDb25maWcoW10pO1xuICAgICAgYXNzZXJ0LnRocm93cyhnZXRHcm91cFNpemVSZWNvbW1lbmRlZExpbWl0KTtcbiAgICB9KTtcblxuICAgIGl0KCd0aHJvd3MgaWYgdGhlIHZhbHVlIGluIHJlbW90ZSBjb25maWcgaXMgbm90IGEgcGFyc2VhYmxlIGludGVnZXInLCBhc3luYyAoKSA9PiB7XG4gICAgICBhd2FpdCB1cGRhdGVSZW1vdGVDb25maWcoW1xuICAgICAgICB7IG5hbWU6IFJFQ09NTUVOREVEX1NJWkVfS0VZLCB2YWx1ZTogJ3VoIG9oJywgZW5hYmxlZDogdHJ1ZSB9LFxuICAgICAgXSk7XG4gICAgICBhc3NlcnQudGhyb3dzKGdldEdyb3VwU2l6ZVJlY29tbWVuZGVkTGltaXQpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgdGhlIHZhbHVlIGluIHJlbW90ZSBjb25maWcsIHBhcnNlZCBhcyBhbiBpbnRlZ2VyJywgYXN5bmMgKCkgPT4ge1xuICAgICAgYXdhaXQgdXBkYXRlUmVtb3RlQ29uZmlnKFtcbiAgICAgICAgeyBuYW1lOiBSRUNPTU1FTkRFRF9TSVpFX0tFWSwgdmFsdWU6ICcxMjMnLCBlbmFibGVkOiB0cnVlIH0sXG4gICAgICBdKTtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChnZXRHcm91cFNpemVSZWNvbW1lbmRlZExpbWl0KCksIDEyMyk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdnZXRHcm91cFNpemVIYXJkTGltaXQnLCAoKSA9PiB7XG4gICAgaXQoJ3Rocm93cyBpZiB0aGUgdmFsdWUgaW4gcmVtb3RlIGNvbmZpZyBpcyBub3QgZGVmaW5lZCcsIGFzeW5jICgpID0+IHtcbiAgICAgIGF3YWl0IHVwZGF0ZVJlbW90ZUNvbmZpZyhbXSk7XG4gICAgICBhc3NlcnQudGhyb3dzKGdldEdyb3VwU2l6ZUhhcmRMaW1pdCk7XG4gICAgfSk7XG5cbiAgICBpdCgndGhyb3dzIGlmIHRoZSB2YWx1ZSBpbiByZW1vdGUgY29uZmlnIGlzIG5vdCBhIHBhcnNlYWJsZSBpbnRlZ2VyJywgYXN5bmMgKCkgPT4ge1xuICAgICAgYXdhaXQgdXBkYXRlUmVtb3RlQ29uZmlnKFtcbiAgICAgICAgeyBuYW1lOiBIQVJEX0xJTUlUX0tFWSwgdmFsdWU6ICd1aCBvaCcsIGVuYWJsZWQ6IHRydWUgfSxcbiAgICAgIF0pO1xuICAgICAgYXNzZXJ0LnRocm93cyhnZXRHcm91cFNpemVIYXJkTGltaXQpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgdGhlIHZhbHVlIGluIHJlbW90ZSBjb25maWcsIHBhcnNlZCBhcyBhbiBpbnRlZ2VyJywgYXN5bmMgKCkgPT4ge1xuICAgICAgYXdhaXQgdXBkYXRlUmVtb3RlQ29uZmlnKFtcbiAgICAgICAgeyBuYW1lOiBIQVJEX0xJTUlUX0tFWSwgdmFsdWU6ICcxMjMnLCBlbmFibGVkOiB0cnVlIH0sXG4gICAgICBdKTtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChnZXRHcm91cFNpemVIYXJkTGltaXQoKSwgMTIzKTtcbiAgICB9KTtcbiAgfSk7XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICJBQUdBLGtCQUF1QjtBQUN2Qiw4QkFBbUM7QUFFbkMsb0JBR087QUFFUCxNQUFNLHVCQUF1QjtBQUM3QixNQUFNLGlCQUFpQjtBQUV2QixTQUFTLHlCQUF5QixNQUFNO0FBQ3RDLFdBQVMsZ0NBQWdDLE1BQU07QUFDN0MsT0FBRyx1REFBdUQsWUFBWTtBQUNwRSxZQUFNLGdEQUFtQixDQUFDLENBQUM7QUFDM0IseUJBQU8sT0FBTywwQ0FBNEI7QUFBQSxJQUM1QyxDQUFDO0FBRUQsT0FBRyxtRUFBbUUsWUFBWTtBQUNoRixZQUFNLGdEQUFtQjtBQUFBLFFBQ3ZCLEVBQUUsTUFBTSxzQkFBc0IsT0FBTyxTQUFTLFNBQVMsS0FBSztBQUFBLE1BQzlELENBQUM7QUFDRCx5QkFBTyxPQUFPLDBDQUE0QjtBQUFBLElBQzVDLENBQUM7QUFFRCxPQUFHLDREQUE0RCxZQUFZO0FBQ3pFLFlBQU0sZ0RBQW1CO0FBQUEsUUFDdkIsRUFBRSxNQUFNLHNCQUFzQixPQUFPLE9BQU8sU0FBUyxLQUFLO0FBQUEsTUFDNUQsQ0FBQztBQUNELHlCQUFPLFlBQVksZ0RBQTZCLEdBQUcsR0FBRztBQUFBLElBQ3hELENBQUM7QUFBQSxFQUNILENBQUM7QUFFRCxXQUFTLHlCQUF5QixNQUFNO0FBQ3RDLE9BQUcsdURBQXVELFlBQVk7QUFDcEUsWUFBTSxnREFBbUIsQ0FBQyxDQUFDO0FBQzNCLHlCQUFPLE9BQU8sbUNBQXFCO0FBQUEsSUFDckMsQ0FBQztBQUVELE9BQUcsbUVBQW1FLFlBQVk7QUFDaEYsWUFBTSxnREFBbUI7QUFBQSxRQUN2QixFQUFFLE1BQU0sZ0JBQWdCLE9BQU8sU0FBUyxTQUFTLEtBQUs7QUFBQSxNQUN4RCxDQUFDO0FBQ0QseUJBQU8sT0FBTyxtQ0FBcUI7QUFBQSxJQUNyQyxDQUFDO0FBRUQsT0FBRyw0REFBNEQsWUFBWTtBQUN6RSxZQUFNLGdEQUFtQjtBQUFBLFFBQ3ZCLEVBQUUsTUFBTSxnQkFBZ0IsT0FBTyxPQUFPLFNBQVMsS0FBSztBQUFBLE1BQ3RELENBQUM7QUFDRCx5QkFBTyxZQUFZLHlDQUFzQixHQUFHLEdBQUc7QUFBQSxJQUNqRCxDQUFDO0FBQUEsRUFDSCxDQUFDO0FBQ0gsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
