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
var import_long = __toESM(require("long"));
var import_timestampLongUtils = require("../../util/timestampLongUtils");
describe("getSafeLongFromTimestamp", () => {
  it("returns zero when passed undefined", () => {
    (0, import_chai.assert)((0, import_timestampLongUtils.getSafeLongFromTimestamp)(void 0).isZero());
  });
  it('returns the number as a Long when passed a "normal" number', () => {
    (0, import_chai.assert)((0, import_timestampLongUtils.getSafeLongFromTimestamp)(0).isZero());
    import_chai.assert.strictEqual((0, import_timestampLongUtils.getSafeLongFromTimestamp)(123).toString(), "123");
    import_chai.assert.strictEqual((0, import_timestampLongUtils.getSafeLongFromTimestamp)(-456).toString(), "-456");
  });
  it("returns Long.MAX_VALUE when passed Infinity", () => {
    (0, import_chai.assert)((0, import_timestampLongUtils.getSafeLongFromTimestamp)(Infinity).equals(import_long.default.MAX_VALUE));
  });
  it("returns Long.MAX_VALUE when passed very large numbers, outside of JavaScript's safely representable range", () => {
    import_chai.assert.equal((0, import_timestampLongUtils.getSafeLongFromTimestamp)(Number.MAX_VALUE), import_long.default.MAX_VALUE);
  });
});
describe("getTimestampFromLong", () => {
  it("returns zero when passed 0 Long", () => {
    import_chai.assert.equal((0, import_timestampLongUtils.getTimestampFromLong)(import_long.default.fromNumber(0)), 0);
  });
  it("returns Number.MAX_SAFE_INTEGER when passed Long.MAX_VALUE", () => {
    import_chai.assert.equal((0, import_timestampLongUtils.getTimestampFromLong)(import_long.default.MAX_VALUE), Number.MAX_SAFE_INTEGER);
  });
  it("returns a normal number", () => {
    import_chai.assert.equal((0, import_timestampLongUtils.getTimestampFromLong)(import_long.default.fromNumber(16)), 16);
  });
  it("returns 0 for null value", () => {
    import_chai.assert.equal((0, import_timestampLongUtils.getTimestampFromLong)(null), 0);
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidGltZXN0YW1wTG9uZ1V0aWxzX3Rlc3QudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSAnY2hhaSc7XG5pbXBvcnQgTG9uZyBmcm9tICdsb25nJztcblxuaW1wb3J0IHtcbiAgZ2V0U2FmZUxvbmdGcm9tVGltZXN0YW1wLFxuICBnZXRUaW1lc3RhbXBGcm9tTG9uZyxcbn0gZnJvbSAnLi4vLi4vdXRpbC90aW1lc3RhbXBMb25nVXRpbHMnO1xuXG5kZXNjcmliZSgnZ2V0U2FmZUxvbmdGcm9tVGltZXN0YW1wJywgKCkgPT4ge1xuICBpdCgncmV0dXJucyB6ZXJvIHdoZW4gcGFzc2VkIHVuZGVmaW5lZCcsICgpID0+IHtcbiAgICBhc3NlcnQoZ2V0U2FmZUxvbmdGcm9tVGltZXN0YW1wKHVuZGVmaW5lZCkuaXNaZXJvKCkpO1xuICB9KTtcblxuICBpdCgncmV0dXJucyB0aGUgbnVtYmVyIGFzIGEgTG9uZyB3aGVuIHBhc3NlZCBhIFwibm9ybWFsXCIgbnVtYmVyJywgKCkgPT4ge1xuICAgIGFzc2VydChnZXRTYWZlTG9uZ0Zyb21UaW1lc3RhbXAoMCkuaXNaZXJvKCkpO1xuICAgIGFzc2VydC5zdHJpY3RFcXVhbChnZXRTYWZlTG9uZ0Zyb21UaW1lc3RhbXAoMTIzKS50b1N0cmluZygpLCAnMTIzJyk7XG4gICAgYXNzZXJ0LnN0cmljdEVxdWFsKGdldFNhZmVMb25nRnJvbVRpbWVzdGFtcCgtNDU2KS50b1N0cmluZygpLCAnLTQ1NicpO1xuICB9KTtcblxuICBpdCgncmV0dXJucyBMb25nLk1BWF9WQUxVRSB3aGVuIHBhc3NlZCBJbmZpbml0eScsICgpID0+IHtcbiAgICBhc3NlcnQoZ2V0U2FmZUxvbmdGcm9tVGltZXN0YW1wKEluZmluaXR5KS5lcXVhbHMoTG9uZy5NQVhfVkFMVUUpKTtcbiAgfSk7XG5cbiAgaXQoXCJyZXR1cm5zIExvbmcuTUFYX1ZBTFVFIHdoZW4gcGFzc2VkIHZlcnkgbGFyZ2UgbnVtYmVycywgb3V0c2lkZSBvZiBKYXZhU2NyaXB0J3Mgc2FmZWx5IHJlcHJlc2VudGFibGUgcmFuZ2VcIiwgKCkgPT4ge1xuICAgIGFzc2VydC5lcXVhbChnZXRTYWZlTG9uZ0Zyb21UaW1lc3RhbXAoTnVtYmVyLk1BWF9WQUxVRSksIExvbmcuTUFYX1ZBTFVFKTtcbiAgfSk7XG59KTtcblxuZGVzY3JpYmUoJ2dldFRpbWVzdGFtcEZyb21Mb25nJywgKCkgPT4ge1xuICBpdCgncmV0dXJucyB6ZXJvIHdoZW4gcGFzc2VkIDAgTG9uZycsICgpID0+IHtcbiAgICBhc3NlcnQuZXF1YWwoZ2V0VGltZXN0YW1wRnJvbUxvbmcoTG9uZy5mcm9tTnVtYmVyKDApKSwgMCk7XG4gIH0pO1xuXG4gIGl0KCdyZXR1cm5zIE51bWJlci5NQVhfU0FGRV9JTlRFR0VSIHdoZW4gcGFzc2VkIExvbmcuTUFYX1ZBTFVFJywgKCkgPT4ge1xuICAgIGFzc2VydC5lcXVhbChnZXRUaW1lc3RhbXBGcm9tTG9uZyhMb25nLk1BWF9WQUxVRSksIE51bWJlci5NQVhfU0FGRV9JTlRFR0VSKTtcbiAgfSk7XG5cbiAgaXQoJ3JldHVybnMgYSBub3JtYWwgbnVtYmVyJywgKCkgPT4ge1xuICAgIGFzc2VydC5lcXVhbChnZXRUaW1lc3RhbXBGcm9tTG9uZyhMb25nLmZyb21OdW1iZXIoMTYpKSwgMTYpO1xuICB9KTtcblxuICBpdCgncmV0dXJucyAwIGZvciBudWxsIHZhbHVlJywgKCkgPT4ge1xuICAgIGFzc2VydC5lcXVhbChnZXRUaW1lc3RhbXBGcm9tTG9uZyhudWxsKSwgMCk7XG4gIH0pO1xufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7QUFHQSxrQkFBdUI7QUFDdkIsa0JBQWlCO0FBRWpCLGdDQUdPO0FBRVAsU0FBUyw0QkFBNEIsTUFBTTtBQUN6QyxLQUFHLHNDQUFzQyxNQUFNO0FBQzdDLDRCQUFPLHdEQUF5QixNQUFTLEVBQUUsT0FBTyxDQUFDO0FBQUEsRUFDckQsQ0FBQztBQUVELEtBQUcsOERBQThELE1BQU07QUFDckUsNEJBQU8sd0RBQXlCLENBQUMsRUFBRSxPQUFPLENBQUM7QUFDM0MsdUJBQU8sWUFBWSx3REFBeUIsR0FBRyxFQUFFLFNBQVMsR0FBRyxLQUFLO0FBQ2xFLHVCQUFPLFlBQVksd0RBQXlCLElBQUksRUFBRSxTQUFTLEdBQUcsTUFBTTtBQUFBLEVBQ3RFLENBQUM7QUFFRCxLQUFHLCtDQUErQyxNQUFNO0FBQ3RELDRCQUFPLHdEQUF5QixRQUFRLEVBQUUsT0FBTyxvQkFBSyxTQUFTLENBQUM7QUFBQSxFQUNsRSxDQUFDO0FBRUQsS0FBRyw2R0FBNkcsTUFBTTtBQUNwSCx1QkFBTyxNQUFNLHdEQUF5QixPQUFPLFNBQVMsR0FBRyxvQkFBSyxTQUFTO0FBQUEsRUFDekUsQ0FBQztBQUNILENBQUM7QUFFRCxTQUFTLHdCQUF3QixNQUFNO0FBQ3JDLEtBQUcsbUNBQW1DLE1BQU07QUFDMUMsdUJBQU8sTUFBTSxvREFBcUIsb0JBQUssV0FBVyxDQUFDLENBQUMsR0FBRyxDQUFDO0FBQUEsRUFDMUQsQ0FBQztBQUVELEtBQUcsOERBQThELE1BQU07QUFDckUsdUJBQU8sTUFBTSxvREFBcUIsb0JBQUssU0FBUyxHQUFHLE9BQU8sZ0JBQWdCO0FBQUEsRUFDNUUsQ0FBQztBQUVELEtBQUcsMkJBQTJCLE1BQU07QUFDbEMsdUJBQU8sTUFBTSxvREFBcUIsb0JBQUssV0FBVyxFQUFFLENBQUMsR0FBRyxFQUFFO0FBQUEsRUFDNUQsQ0FBQztBQUVELEtBQUcsNEJBQTRCLE1BQU07QUFDbkMsdUJBQU8sTUFBTSxvREFBcUIsSUFBSSxHQUFHLENBQUM7QUFBQSxFQUM1QyxDQUFDO0FBQ0gsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
