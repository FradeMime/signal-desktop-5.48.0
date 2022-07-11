var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var import_chai = require("chai");
var import_asyncIterables = require("../../util/asyncIterables");
describe("async iterable utilities", () => {
  describe("concat", () => {
    it("returns an empty async iterable if called with an empty list", async () => {
      const result = (0, import_asyncIterables.concat)([]);
      import_chai.assert.isEmpty(await collect(result));
    });
    it("concatenates synchronous and asynchronous iterables", async () => {
      function* makeSync() {
        yield "sync 1";
        yield "sync 2";
      }
      async function* makeAsync() {
        yield "async 1";
        yield "async 2";
      }
      const syncIterable = makeSync();
      const asyncIterable1 = makeAsync();
      const asyncIterable2 = makeAsync();
      const result = (0, import_asyncIterables.concat)([
        syncIterable,
        asyncIterable1,
        ["array 1", "array 2"],
        asyncIterable2
      ]);
      import_chai.assert.deepEqual(await collect(result), [
        "sync 1",
        "sync 2",
        "async 1",
        "async 2",
        "array 1",
        "array 2",
        "async 1",
        "async 2"
      ]);
    });
  });
  describe("wrapPromise", () => {
    it("resolves to an array when wrapping a synchronous iterable", async () => {
      const iterable = /* @__PURE__ */ new Set([1, 2, 3]);
      const result = (0, import_asyncIterables.wrapPromise)(Promise.resolve(iterable));
      import_chai.assert.sameMembers(await collect(result), [1, 2, 3]);
    });
    it("resolves to an array when wrapping an asynchronous iterable", async () => {
      const iterable = async function* test() {
        yield 1;
        yield 2;
        yield 3;
      }();
      const result = (0, import_asyncIterables.wrapPromise)(Promise.resolve(iterable));
      import_chai.assert.deepEqual(await collect(result), [1, 2, 3]);
    });
  });
});
async function collect(iterable) {
  const result = [];
  for await (const value of iterable) {
    result.push(value);
  }
  return result;
}
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiYXN5bmNJdGVyYWJsZXNfdGVzdC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEtMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IGFzc2VydCB9IGZyb20gJ2NoYWknO1xuXG5pbXBvcnQgdHlwZSB7IE1heWJlQXN5bmNJdGVyYWJsZSB9IGZyb20gJy4uLy4uL3V0aWwvYXN5bmNJdGVyYWJsZXMnO1xuaW1wb3J0IHsgY29uY2F0LCB3cmFwUHJvbWlzZSB9IGZyb20gJy4uLy4uL3V0aWwvYXN5bmNJdGVyYWJsZXMnO1xuXG5kZXNjcmliZSgnYXN5bmMgaXRlcmFibGUgdXRpbGl0aWVzJywgKCkgPT4ge1xuICBkZXNjcmliZSgnY29uY2F0JywgKCkgPT4ge1xuICAgIGl0KCdyZXR1cm5zIGFuIGVtcHR5IGFzeW5jIGl0ZXJhYmxlIGlmIGNhbGxlZCB3aXRoIGFuIGVtcHR5IGxpc3QnLCBhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCByZXN1bHQgPSBjb25jYXQoW10pO1xuXG4gICAgICBhc3NlcnQuaXNFbXB0eShhd2FpdCBjb2xsZWN0KHJlc3VsdCkpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2NvbmNhdGVuYXRlcyBzeW5jaHJvbm91cyBhbmQgYXN5bmNocm9ub3VzIGl0ZXJhYmxlcycsIGFzeW5jICgpID0+IHtcbiAgICAgIGZ1bmN0aW9uKiBtYWtlU3luYygpIHtcbiAgICAgICAgeWllbGQgJ3N5bmMgMSc7XG4gICAgICAgIHlpZWxkICdzeW5jIDInO1xuICAgICAgfVxuICAgICAgYXN5bmMgZnVuY3Rpb24qIG1ha2VBc3luYygpIHtcbiAgICAgICAgeWllbGQgJ2FzeW5jIDEnO1xuICAgICAgICB5aWVsZCAnYXN5bmMgMic7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHN5bmNJdGVyYWJsZTogSXRlcmFibGU8c3RyaW5nPiA9IG1ha2VTeW5jKCk7XG4gICAgICBjb25zdCBhc3luY0l0ZXJhYmxlMTogQXN5bmNJdGVyYWJsZTxzdHJpbmc+ID0gbWFrZUFzeW5jKCk7XG4gICAgICBjb25zdCBhc3luY0l0ZXJhYmxlMjogQXN5bmNJdGVyYWJsZTxzdHJpbmc+ID0gbWFrZUFzeW5jKCk7XG5cbiAgICAgIGNvbnN0IHJlc3VsdCA9IGNvbmNhdChbXG4gICAgICAgIHN5bmNJdGVyYWJsZSxcbiAgICAgICAgYXN5bmNJdGVyYWJsZTEsXG4gICAgICAgIFsnYXJyYXkgMScsICdhcnJheSAyJ10sXG4gICAgICAgIGFzeW5jSXRlcmFibGUyLFxuICAgICAgXSk7XG5cbiAgICAgIGFzc2VydC5kZWVwRXF1YWwoYXdhaXQgY29sbGVjdChyZXN1bHQpLCBbXG4gICAgICAgICdzeW5jIDEnLFxuICAgICAgICAnc3luYyAyJyxcbiAgICAgICAgJ2FzeW5jIDEnLFxuICAgICAgICAnYXN5bmMgMicsXG4gICAgICAgICdhcnJheSAxJyxcbiAgICAgICAgJ2FycmF5IDInLFxuICAgICAgICAnYXN5bmMgMScsXG4gICAgICAgICdhc3luYyAyJyxcbiAgICAgIF0pO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnd3JhcFByb21pc2UnLCAoKSA9PiB7XG4gICAgaXQoJ3Jlc29sdmVzIHRvIGFuIGFycmF5IHdoZW4gd3JhcHBpbmcgYSBzeW5jaHJvbm91cyBpdGVyYWJsZScsIGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IGl0ZXJhYmxlID0gbmV3IFNldChbMSwgMiwgM10pO1xuXG4gICAgICBjb25zdCByZXN1bHQgPSB3cmFwUHJvbWlzZShQcm9taXNlLnJlc29sdmUoaXRlcmFibGUpKTtcbiAgICAgIGFzc2VydC5zYW1lTWVtYmVycyhhd2FpdCBjb2xsZWN0KHJlc3VsdCksIFsxLCAyLCAzXSk7XG4gICAgfSk7XG5cbiAgICBpdCgncmVzb2x2ZXMgdG8gYW4gYXJyYXkgd2hlbiB3cmFwcGluZyBhbiBhc3luY2hyb25vdXMgaXRlcmFibGUnLCBhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBpdGVyYWJsZSA9IChhc3luYyBmdW5jdGlvbiogdGVzdCgpIHtcbiAgICAgICAgeWllbGQgMTtcbiAgICAgICAgeWllbGQgMjtcbiAgICAgICAgeWllbGQgMztcbiAgICAgIH0pKCk7XG5cbiAgICAgIGNvbnN0IHJlc3VsdCA9IHdyYXBQcm9taXNlKFByb21pc2UucmVzb2x2ZShpdGVyYWJsZSkpO1xuICAgICAgYXNzZXJ0LmRlZXBFcXVhbChhd2FpdCBjb2xsZWN0KHJlc3VsdCksIFsxLCAyLCAzXSk7XG4gICAgfSk7XG4gIH0pO1xufSk7XG5cbi8qKlxuICogVHVybnMgYW4gaXRlcmFibGUgaW50byBhIGZ1bGx5LXJlYWxpemVkIGFycmF5LlxuICpcbiAqIElmIHdlIHdhbnQgdGhpcyBvdXRzaWRlIG9mIHRlc3RzLCB3ZSBjb3VsZCBtYWtlIGl0IGludG8gYSBcInJlYWxcIiBmdW5jdGlvbi5cbiAqL1xuYXN5bmMgZnVuY3Rpb24gY29sbGVjdDxUPihpdGVyYWJsZTogTWF5YmVBc3luY0l0ZXJhYmxlPFQ+KTogUHJvbWlzZTxBcnJheTxUPj4ge1xuICBjb25zdCByZXN1bHQ6IEFycmF5PFQ+ID0gW107XG4gIGZvciBhd2FpdCAoY29uc3QgdmFsdWUgb2YgaXRlcmFibGUpIHtcbiAgICByZXN1bHQucHVzaCh2YWx1ZSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7O0FBR0Esa0JBQXVCO0FBR3ZCLDRCQUFvQztBQUVwQyxTQUFTLDRCQUE0QixNQUFNO0FBQ3pDLFdBQVMsVUFBVSxNQUFNO0FBQ3ZCLE9BQUcsZ0VBQWdFLFlBQVk7QUFDN0UsWUFBTSxTQUFTLGtDQUFPLENBQUMsQ0FBQztBQUV4Qix5QkFBTyxRQUFRLE1BQU0sUUFBUSxNQUFNLENBQUM7QUFBQSxJQUN0QyxDQUFDO0FBRUQsT0FBRyx1REFBdUQsWUFBWTtBQUNwRSwyQkFBcUI7QUFDbkIsY0FBTTtBQUNOLGNBQU07QUFBQSxNQUNSO0FBSFUsQUFJVixrQ0FBNEI7QUFDMUIsY0FBTTtBQUNOLGNBQU07QUFBQSxNQUNSO0FBSGdCLEFBS2hCLFlBQU0sZUFBaUMsU0FBUztBQUNoRCxZQUFNLGlCQUF3QyxVQUFVO0FBQ3hELFlBQU0saUJBQXdDLFVBQVU7QUFFeEQsWUFBTSxTQUFTLGtDQUFPO0FBQUEsUUFDcEI7QUFBQSxRQUNBO0FBQUEsUUFDQSxDQUFDLFdBQVcsU0FBUztBQUFBLFFBQ3JCO0FBQUEsTUFDRixDQUFDO0FBRUQseUJBQU8sVUFBVSxNQUFNLFFBQVEsTUFBTSxHQUFHO0FBQUEsUUFDdEM7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsTUFDRixDQUFDO0FBQUEsSUFDSCxDQUFDO0FBQUEsRUFDSCxDQUFDO0FBRUQsV0FBUyxlQUFlLE1BQU07QUFDNUIsT0FBRyw2REFBNkQsWUFBWTtBQUMxRSxZQUFNLFdBQVcsb0JBQUksSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7QUFFbEMsWUFBTSxTQUFTLHVDQUFZLFFBQVEsUUFBUSxRQUFRLENBQUM7QUFDcEQseUJBQU8sWUFBWSxNQUFNLFFBQVEsTUFBTSxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztBQUFBLElBQ3JELENBQUM7QUFFRCxPQUFHLCtEQUErRCxZQUFZO0FBQzVFLFlBQU0sV0FBWSx1QkFBdUI7QUFDdkMsY0FBTTtBQUNOLGNBQU07QUFDTixjQUFNO0FBQUEsTUFDUixFQUFHO0FBRUgsWUFBTSxTQUFTLHVDQUFZLFFBQVEsUUFBUSxRQUFRLENBQUM7QUFDcEQseUJBQU8sVUFBVSxNQUFNLFFBQVEsTUFBTSxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztBQUFBLElBQ25ELENBQUM7QUFBQSxFQUNILENBQUM7QUFDSCxDQUFDO0FBT0QsdUJBQTBCLFVBQW9EO0FBQzVFLFFBQU0sU0FBbUIsQ0FBQztBQUMxQixtQkFBaUIsU0FBUyxVQUFVO0FBQ2xDLFdBQU8sS0FBSyxLQUFLO0FBQUEsRUFDbkI7QUFDQSxTQUFPO0FBQ1Q7QUFOZSIsCiAgIm5hbWVzIjogW10KfQo=
