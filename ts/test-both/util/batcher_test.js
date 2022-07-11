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
var import_batcher = require("../../util/batcher");
var import_sleep = require("../../util/sleep");
describe("batcher", () => {
  it("should schedule a full batch", async () => {
    const processBatch = sinon.fake.resolves(void 0);
    const batcher = (0, import_batcher.createBatcher)({
      name: "test",
      wait: 10,
      maxSize: 2,
      processBatch
    });
    batcher.add(1);
    batcher.add(2);
    import_chai.assert.ok(processBatch.calledOnceWith([1, 2]), "Full batch on first call");
  });
  it("should schedule a partial batch", async () => {
    const processBatch = sinon.fake.resolves(void 0);
    const batcher = (0, import_batcher.createBatcher)({
      name: "test",
      wait: 5,
      maxSize: 2,
      processBatch
    });
    batcher.add(1);
    await (0, import_sleep.sleep)(10);
    import_chai.assert.ok(processBatch.calledOnceWith([1]), "Partial batch after timeout");
  });
  it("should remove scheduled items from a batch", async () => {
    const processBatch = sinon.fake.resolves(void 0);
    const batcher = (0, import_batcher.createBatcher)({
      name: "test",
      wait: 5,
      maxSize: 100,
      processBatch
    });
    batcher.add(1);
    batcher.add(1);
    batcher.add(2);
    batcher.removeAll(1);
    await (0, import_sleep.sleep)(10);
    import_chai.assert.ok(processBatch.calledOnceWith([2]), "Remove all");
  });
  it("should flushAndWait a partial batch", async () => {
    const processBatch = sinon.fake.resolves(void 0);
    const batcher = (0, import_batcher.createBatcher)({
      name: "test",
      wait: 1e4,
      maxSize: 1e3,
      processBatch
    });
    batcher.add(1);
    await batcher.flushAndWait();
    import_chai.assert.ok(processBatch.calledOnceWith([1]), "Partial batch after flushAndWait");
  });
  it("should flushAndWait a partial batch with new items added", async () => {
    let calledTimes = 0;
    const processBatch = /* @__PURE__ */ __name(async (batch) => {
      calledTimes += 1;
      if (calledTimes === 1) {
        import_chai.assert.deepEqual(batch, [1], "First partial batch");
        batcher.add(2);
      } else if (calledTimes === 2) {
        import_chai.assert.deepEqual(batch, [2], "Second partial batch");
      } else {
        import_chai.assert.strictEqual(calledTimes, 2);
      }
    }, "processBatch");
    const batcher = (0, import_batcher.createBatcher)({
      name: "test",
      wait: 1e4,
      maxSize: 1e3,
      processBatch
    });
    batcher.add(1);
    await batcher.flushAndWait();
    import_chai.assert.strictEqual(calledTimes, 2);
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiYmF0Y2hlcl90ZXN0LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IGFzc2VydCB9IGZyb20gJ2NoYWknO1xuaW1wb3J0ICogYXMgc2lub24gZnJvbSAnc2lub24nO1xuXG5pbXBvcnQgeyBjcmVhdGVCYXRjaGVyIH0gZnJvbSAnLi4vLi4vdXRpbC9iYXRjaGVyJztcbmltcG9ydCB7IHNsZWVwIH0gZnJvbSAnLi4vLi4vdXRpbC9zbGVlcCc7XG5cbmRlc2NyaWJlKCdiYXRjaGVyJywgKCkgPT4ge1xuICBpdCgnc2hvdWxkIHNjaGVkdWxlIGEgZnVsbCBiYXRjaCcsIGFzeW5jICgpID0+IHtcbiAgICBjb25zdCBwcm9jZXNzQmF0Y2ggPSBzaW5vbi5mYWtlLnJlc29sdmVzKHVuZGVmaW5lZCk7XG5cbiAgICBjb25zdCBiYXRjaGVyID0gY3JlYXRlQmF0Y2hlcjxudW1iZXI+KHtcbiAgICAgIG5hbWU6ICd0ZXN0JyxcbiAgICAgIHdhaXQ6IDEwLFxuICAgICAgbWF4U2l6ZTogMixcbiAgICAgIHByb2Nlc3NCYXRjaCxcbiAgICB9KTtcblxuICAgIGJhdGNoZXIuYWRkKDEpO1xuICAgIGJhdGNoZXIuYWRkKDIpO1xuXG4gICAgYXNzZXJ0Lm9rKHByb2Nlc3NCYXRjaC5jYWxsZWRPbmNlV2l0aChbMSwgMl0pLCAnRnVsbCBiYXRjaCBvbiBmaXJzdCBjYWxsJyk7XG4gIH0pO1xuXG4gIGl0KCdzaG91bGQgc2NoZWR1bGUgYSBwYXJ0aWFsIGJhdGNoJywgYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IHByb2Nlc3NCYXRjaCA9IHNpbm9uLmZha2UucmVzb2x2ZXModW5kZWZpbmVkKTtcblxuICAgIGNvbnN0IGJhdGNoZXIgPSBjcmVhdGVCYXRjaGVyPG51bWJlcj4oe1xuICAgICAgbmFtZTogJ3Rlc3QnLFxuICAgICAgd2FpdDogNSxcbiAgICAgIG1heFNpemU6IDIsXG4gICAgICBwcm9jZXNzQmF0Y2gsXG4gICAgfSk7XG5cbiAgICBiYXRjaGVyLmFkZCgxKTtcblxuICAgIGF3YWl0IHNsZWVwKDEwKTtcblxuICAgIGFzc2VydC5vayhwcm9jZXNzQmF0Y2guY2FsbGVkT25jZVdpdGgoWzFdKSwgJ1BhcnRpYWwgYmF0Y2ggYWZ0ZXIgdGltZW91dCcpO1xuICB9KTtcblxuICBpdCgnc2hvdWxkIHJlbW92ZSBzY2hlZHVsZWQgaXRlbXMgZnJvbSBhIGJhdGNoJywgYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IHByb2Nlc3NCYXRjaCA9IHNpbm9uLmZha2UucmVzb2x2ZXModW5kZWZpbmVkKTtcblxuICAgIGNvbnN0IGJhdGNoZXIgPSBjcmVhdGVCYXRjaGVyPG51bWJlcj4oe1xuICAgICAgbmFtZTogJ3Rlc3QnLFxuICAgICAgd2FpdDogNSxcbiAgICAgIG1heFNpemU6IDEwMCxcbiAgICAgIHByb2Nlc3NCYXRjaCxcbiAgICB9KTtcblxuICAgIGJhdGNoZXIuYWRkKDEpO1xuICAgIGJhdGNoZXIuYWRkKDEpO1xuICAgIGJhdGNoZXIuYWRkKDIpO1xuICAgIGJhdGNoZXIucmVtb3ZlQWxsKDEpO1xuXG4gICAgYXdhaXQgc2xlZXAoMTApO1xuXG4gICAgYXNzZXJ0Lm9rKHByb2Nlc3NCYXRjaC5jYWxsZWRPbmNlV2l0aChbMl0pLCAnUmVtb3ZlIGFsbCcpO1xuICB9KTtcblxuICBpdCgnc2hvdWxkIGZsdXNoQW5kV2FpdCBhIHBhcnRpYWwgYmF0Y2gnLCBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgcHJvY2Vzc0JhdGNoID0gc2lub24uZmFrZS5yZXNvbHZlcyh1bmRlZmluZWQpO1xuXG4gICAgY29uc3QgYmF0Y2hlciA9IGNyZWF0ZUJhdGNoZXI8bnVtYmVyPih7XG4gICAgICBuYW1lOiAndGVzdCcsXG4gICAgICB3YWl0OiAxMDAwMCxcbiAgICAgIG1heFNpemU6IDEwMDAsXG4gICAgICBwcm9jZXNzQmF0Y2gsXG4gICAgfSk7XG5cbiAgICBiYXRjaGVyLmFkZCgxKTtcblxuICAgIGF3YWl0IGJhdGNoZXIuZmx1c2hBbmRXYWl0KCk7XG5cbiAgICBhc3NlcnQub2soXG4gICAgICBwcm9jZXNzQmF0Y2guY2FsbGVkT25jZVdpdGgoWzFdKSxcbiAgICAgICdQYXJ0aWFsIGJhdGNoIGFmdGVyIGZsdXNoQW5kV2FpdCdcbiAgICApO1xuICB9KTtcblxuICBpdCgnc2hvdWxkIGZsdXNoQW5kV2FpdCBhIHBhcnRpYWwgYmF0Y2ggd2l0aCBuZXcgaXRlbXMgYWRkZWQnLCBhc3luYyAoKSA9PiB7XG4gICAgbGV0IGNhbGxlZFRpbWVzID0gMDtcbiAgICBjb25zdCBwcm9jZXNzQmF0Y2ggPSBhc3luYyAoYmF0Y2g6IEFycmF5PG51bWJlcj4pOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICAgIGNhbGxlZFRpbWVzICs9IDE7XG4gICAgICBpZiAoY2FsbGVkVGltZXMgPT09IDEpIHtcbiAgICAgICAgYXNzZXJ0LmRlZXBFcXVhbChiYXRjaCwgWzFdLCAnRmlyc3QgcGFydGlhbCBiYXRjaCcpO1xuICAgICAgICBiYXRjaGVyLmFkZCgyKTtcbiAgICAgIH0gZWxzZSBpZiAoY2FsbGVkVGltZXMgPT09IDIpIHtcbiAgICAgICAgYXNzZXJ0LmRlZXBFcXVhbChiYXRjaCwgWzJdLCAnU2Vjb25kIHBhcnRpYWwgYmF0Y2gnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChjYWxsZWRUaW1lcywgMik7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGNvbnN0IGJhdGNoZXIgPSBjcmVhdGVCYXRjaGVyPG51bWJlcj4oe1xuICAgICAgbmFtZTogJ3Rlc3QnLFxuICAgICAgd2FpdDogMTAwMDAsXG4gICAgICBtYXhTaXplOiAxMDAwLFxuICAgICAgcHJvY2Vzc0JhdGNoLFxuICAgIH0pO1xuXG4gICAgYmF0Y2hlci5hZGQoMSk7XG5cbiAgICBhd2FpdCBiYXRjaGVyLmZsdXNoQW5kV2FpdCgpO1xuXG4gICAgYXNzZXJ0LnN0cmljdEVxdWFsKGNhbGxlZFRpbWVzLCAyKTtcbiAgfSk7XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHQSxrQkFBdUI7QUFDdkIsWUFBdUI7QUFFdkIscUJBQThCO0FBQzlCLG1CQUFzQjtBQUV0QixTQUFTLFdBQVcsTUFBTTtBQUN4QixLQUFHLGdDQUFnQyxZQUFZO0FBQzdDLFVBQU0sZUFBZSxNQUFNLEtBQUssU0FBUyxNQUFTO0FBRWxELFVBQU0sVUFBVSxrQ0FBc0I7QUFBQSxNQUNwQyxNQUFNO0FBQUEsTUFDTixNQUFNO0FBQUEsTUFDTixTQUFTO0FBQUEsTUFDVDtBQUFBLElBQ0YsQ0FBQztBQUVELFlBQVEsSUFBSSxDQUFDO0FBQ2IsWUFBUSxJQUFJLENBQUM7QUFFYix1QkFBTyxHQUFHLGFBQWEsZUFBZSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsMEJBQTBCO0FBQUEsRUFDM0UsQ0FBQztBQUVELEtBQUcsbUNBQW1DLFlBQVk7QUFDaEQsVUFBTSxlQUFlLE1BQU0sS0FBSyxTQUFTLE1BQVM7QUFFbEQsVUFBTSxVQUFVLGtDQUFzQjtBQUFBLE1BQ3BDLE1BQU07QUFBQSxNQUNOLE1BQU07QUFBQSxNQUNOLFNBQVM7QUFBQSxNQUNUO0FBQUEsSUFDRixDQUFDO0FBRUQsWUFBUSxJQUFJLENBQUM7QUFFYixVQUFNLHdCQUFNLEVBQUU7QUFFZCx1QkFBTyxHQUFHLGFBQWEsZUFBZSxDQUFDLENBQUMsQ0FBQyxHQUFHLDZCQUE2QjtBQUFBLEVBQzNFLENBQUM7QUFFRCxLQUFHLDhDQUE4QyxZQUFZO0FBQzNELFVBQU0sZUFBZSxNQUFNLEtBQUssU0FBUyxNQUFTO0FBRWxELFVBQU0sVUFBVSxrQ0FBc0I7QUFBQSxNQUNwQyxNQUFNO0FBQUEsTUFDTixNQUFNO0FBQUEsTUFDTixTQUFTO0FBQUEsTUFDVDtBQUFBLElBQ0YsQ0FBQztBQUVELFlBQVEsSUFBSSxDQUFDO0FBQ2IsWUFBUSxJQUFJLENBQUM7QUFDYixZQUFRLElBQUksQ0FBQztBQUNiLFlBQVEsVUFBVSxDQUFDO0FBRW5CLFVBQU0sd0JBQU0sRUFBRTtBQUVkLHVCQUFPLEdBQUcsYUFBYSxlQUFlLENBQUMsQ0FBQyxDQUFDLEdBQUcsWUFBWTtBQUFBLEVBQzFELENBQUM7QUFFRCxLQUFHLHVDQUF1QyxZQUFZO0FBQ3BELFVBQU0sZUFBZSxNQUFNLEtBQUssU0FBUyxNQUFTO0FBRWxELFVBQU0sVUFBVSxrQ0FBc0I7QUFBQSxNQUNwQyxNQUFNO0FBQUEsTUFDTixNQUFNO0FBQUEsTUFDTixTQUFTO0FBQUEsTUFDVDtBQUFBLElBQ0YsQ0FBQztBQUVELFlBQVEsSUFBSSxDQUFDO0FBRWIsVUFBTSxRQUFRLGFBQWE7QUFFM0IsdUJBQU8sR0FDTCxhQUFhLGVBQWUsQ0FBQyxDQUFDLENBQUMsR0FDL0Isa0NBQ0Y7QUFBQSxFQUNGLENBQUM7QUFFRCxLQUFHLDREQUE0RCxZQUFZO0FBQ3pFLFFBQUksY0FBYztBQUNsQixVQUFNLGVBQWUsOEJBQU8sVUFBd0M7QUFDbEUscUJBQWU7QUFDZixVQUFJLGdCQUFnQixHQUFHO0FBQ3JCLDJCQUFPLFVBQVUsT0FBTyxDQUFDLENBQUMsR0FBRyxxQkFBcUI7QUFDbEQsZ0JBQVEsSUFBSSxDQUFDO0FBQUEsTUFDZixXQUFXLGdCQUFnQixHQUFHO0FBQzVCLDJCQUFPLFVBQVUsT0FBTyxDQUFDLENBQUMsR0FBRyxzQkFBc0I7QUFBQSxNQUNyRCxPQUFPO0FBQ0wsMkJBQU8sWUFBWSxhQUFhLENBQUM7QUFBQSxNQUNuQztBQUFBLElBQ0YsR0FWcUI7QUFZckIsVUFBTSxVQUFVLGtDQUFzQjtBQUFBLE1BQ3BDLE1BQU07QUFBQSxNQUNOLE1BQU07QUFBQSxNQUNOLFNBQVM7QUFBQSxNQUNUO0FBQUEsSUFDRixDQUFDO0FBRUQsWUFBUSxJQUFJLENBQUM7QUFFYixVQUFNLFFBQVEsYUFBYTtBQUUzQix1QkFBTyxZQUFZLGFBQWEsQ0FBQztBQUFBLEVBQ25DLENBQUM7QUFDSCxDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
