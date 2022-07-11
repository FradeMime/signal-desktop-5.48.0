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
var import_waitBatcher = require("../../util/waitBatcher");
describe("waitBatcher", () => {
  it("should schedule a full batch", async () => {
    const processBatch = sinon.fake.resolves(void 0);
    const batcher = (0, import_waitBatcher.createWaitBatcher)({
      name: "test",
      wait: 10,
      maxSize: 2,
      processBatch
    });
    await Promise.all([batcher.add(1), batcher.add(2)]);
    import_chai.assert.ok(processBatch.calledOnceWith([1, 2]), "Full batch on first call");
  });
  it("should schedule a partial batch", async () => {
    const processBatch = sinon.fake.resolves(void 0);
    const batcher = (0, import_waitBatcher.createWaitBatcher)({
      name: "test",
      wait: 10,
      maxSize: 2,
      processBatch
    });
    await batcher.add(1);
    import_chai.assert.ok(processBatch.calledOnceWith([1]), "Partial batch on timeout");
  });
  it("should flush a partial batch", async () => {
    const processBatch = sinon.fake.resolves(void 0);
    const batcher = (0, import_waitBatcher.createWaitBatcher)({
      name: "test",
      wait: 1e4,
      maxSize: 1e3,
      processBatch
    });
    await Promise.all([batcher.add(1), batcher.flushAndWait()]);
    import_chai.assert.ok(processBatch.calledOnceWith([1]), "Partial batch on flushAndWait");
  });
  it("should flush a partial batch with new items added", async () => {
    const processBatch = sinon.fake.resolves(void 0);
    const batcher = (0, import_waitBatcher.createWaitBatcher)({
      name: "test",
      wait: 1e4,
      maxSize: 1e3,
      processBatch
    });
    await Promise.all([
      (async () => {
        await batcher.add(1);
        await batcher.add(2);
      })(),
      batcher.flushAndWait()
    ]);
    (0, import_chai.assert)(processBatch.firstCall.calledWith([1]), "First partial batch");
    (0, import_chai.assert)(processBatch.secondCall.calledWith([2]), "Second partial batch");
    (0, import_chai.assert)(!processBatch.thirdCall);
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsid2FpdEJhdGNoZXJfdGVzdC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyBhc3NlcnQgfSBmcm9tICdjaGFpJztcbmltcG9ydCAqIGFzIHNpbm9uIGZyb20gJ3Npbm9uJztcblxuaW1wb3J0IHsgY3JlYXRlV2FpdEJhdGNoZXIgfSBmcm9tICcuLi8uLi91dGlsL3dhaXRCYXRjaGVyJztcblxuZGVzY3JpYmUoJ3dhaXRCYXRjaGVyJywgKCkgPT4ge1xuICBpdCgnc2hvdWxkIHNjaGVkdWxlIGEgZnVsbCBiYXRjaCcsIGFzeW5jICgpID0+IHtcbiAgICBjb25zdCBwcm9jZXNzQmF0Y2ggPSBzaW5vbi5mYWtlLnJlc29sdmVzKHVuZGVmaW5lZCk7XG5cbiAgICBjb25zdCBiYXRjaGVyID0gY3JlYXRlV2FpdEJhdGNoZXI8bnVtYmVyPih7XG4gICAgICBuYW1lOiAndGVzdCcsXG4gICAgICB3YWl0OiAxMCxcbiAgICAgIG1heFNpemU6IDIsXG4gICAgICBwcm9jZXNzQmF0Y2gsXG4gICAgfSk7XG5cbiAgICBhd2FpdCBQcm9taXNlLmFsbChbYmF0Y2hlci5hZGQoMSksIGJhdGNoZXIuYWRkKDIpXSk7XG5cbiAgICBhc3NlcnQub2socHJvY2Vzc0JhdGNoLmNhbGxlZE9uY2VXaXRoKFsxLCAyXSksICdGdWxsIGJhdGNoIG9uIGZpcnN0IGNhbGwnKTtcbiAgfSk7XG5cbiAgaXQoJ3Nob3VsZCBzY2hlZHVsZSBhIHBhcnRpYWwgYmF0Y2gnLCBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgcHJvY2Vzc0JhdGNoID0gc2lub24uZmFrZS5yZXNvbHZlcyh1bmRlZmluZWQpO1xuXG4gICAgY29uc3QgYmF0Y2hlciA9IGNyZWF0ZVdhaXRCYXRjaGVyPG51bWJlcj4oe1xuICAgICAgbmFtZTogJ3Rlc3QnLFxuICAgICAgd2FpdDogMTAsXG4gICAgICBtYXhTaXplOiAyLFxuICAgICAgcHJvY2Vzc0JhdGNoLFxuICAgIH0pO1xuXG4gICAgYXdhaXQgYmF0Y2hlci5hZGQoMSk7XG5cbiAgICBhc3NlcnQub2socHJvY2Vzc0JhdGNoLmNhbGxlZE9uY2VXaXRoKFsxXSksICdQYXJ0aWFsIGJhdGNoIG9uIHRpbWVvdXQnKTtcbiAgfSk7XG5cbiAgaXQoJ3Nob3VsZCBmbHVzaCBhIHBhcnRpYWwgYmF0Y2gnLCBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgcHJvY2Vzc0JhdGNoID0gc2lub24uZmFrZS5yZXNvbHZlcyh1bmRlZmluZWQpO1xuXG4gICAgY29uc3QgYmF0Y2hlciA9IGNyZWF0ZVdhaXRCYXRjaGVyPG51bWJlcj4oe1xuICAgICAgbmFtZTogJ3Rlc3QnLFxuICAgICAgd2FpdDogMTAwMDAsXG4gICAgICBtYXhTaXplOiAxMDAwLFxuICAgICAgcHJvY2Vzc0JhdGNoLFxuICAgIH0pO1xuXG4gICAgYXdhaXQgUHJvbWlzZS5hbGwoW2JhdGNoZXIuYWRkKDEpLCBiYXRjaGVyLmZsdXNoQW5kV2FpdCgpXSk7XG5cbiAgICBhc3NlcnQub2soXG4gICAgICBwcm9jZXNzQmF0Y2guY2FsbGVkT25jZVdpdGgoWzFdKSxcbiAgICAgICdQYXJ0aWFsIGJhdGNoIG9uIGZsdXNoQW5kV2FpdCdcbiAgICApO1xuICB9KTtcblxuICBpdCgnc2hvdWxkIGZsdXNoIGEgcGFydGlhbCBiYXRjaCB3aXRoIG5ldyBpdGVtcyBhZGRlZCcsIGFzeW5jICgpID0+IHtcbiAgICBjb25zdCBwcm9jZXNzQmF0Y2ggPSBzaW5vbi5mYWtlLnJlc29sdmVzKHVuZGVmaW5lZCk7XG5cbiAgICBjb25zdCBiYXRjaGVyID0gY3JlYXRlV2FpdEJhdGNoZXI8bnVtYmVyPih7XG4gICAgICBuYW1lOiAndGVzdCcsXG4gICAgICB3YWl0OiAxMDAwMCxcbiAgICAgIG1heFNpemU6IDEwMDAsXG4gICAgICBwcm9jZXNzQmF0Y2gsXG4gICAgfSk7XG5cbiAgICBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICAoYXN5bmMgKCkgPT4ge1xuICAgICAgICBhd2FpdCBiYXRjaGVyLmFkZCgxKTtcbiAgICAgICAgYXdhaXQgYmF0Y2hlci5hZGQoMik7XG4gICAgICB9KSgpLFxuICAgICAgYmF0Y2hlci5mbHVzaEFuZFdhaXQoKSxcbiAgICBdKTtcblxuICAgIGFzc2VydChwcm9jZXNzQmF0Y2guZmlyc3RDYWxsLmNhbGxlZFdpdGgoWzFdKSwgJ0ZpcnN0IHBhcnRpYWwgYmF0Y2gnKTtcbiAgICBhc3NlcnQocHJvY2Vzc0JhdGNoLnNlY29uZENhbGwuY2FsbGVkV2l0aChbMl0pLCAnU2Vjb25kIHBhcnRpYWwgYmF0Y2gnKTtcbiAgICBhc3NlcnQoIXByb2Nlc3NCYXRjaC50aGlyZENhbGwpO1xuICB9KTtcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7O0FBR0Esa0JBQXVCO0FBQ3ZCLFlBQXVCO0FBRXZCLHlCQUFrQztBQUVsQyxTQUFTLGVBQWUsTUFBTTtBQUM1QixLQUFHLGdDQUFnQyxZQUFZO0FBQzdDLFVBQU0sZUFBZSxNQUFNLEtBQUssU0FBUyxNQUFTO0FBRWxELFVBQU0sVUFBVSwwQ0FBMEI7QUFBQSxNQUN4QyxNQUFNO0FBQUEsTUFDTixNQUFNO0FBQUEsTUFDTixTQUFTO0FBQUEsTUFDVDtBQUFBLElBQ0YsQ0FBQztBQUVELFVBQU0sUUFBUSxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsR0FBRyxRQUFRLElBQUksQ0FBQyxDQUFDLENBQUM7QUFFbEQsdUJBQU8sR0FBRyxhQUFhLGVBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLDBCQUEwQjtBQUFBLEVBQzNFLENBQUM7QUFFRCxLQUFHLG1DQUFtQyxZQUFZO0FBQ2hELFVBQU0sZUFBZSxNQUFNLEtBQUssU0FBUyxNQUFTO0FBRWxELFVBQU0sVUFBVSwwQ0FBMEI7QUFBQSxNQUN4QyxNQUFNO0FBQUEsTUFDTixNQUFNO0FBQUEsTUFDTixTQUFTO0FBQUEsTUFDVDtBQUFBLElBQ0YsQ0FBQztBQUVELFVBQU0sUUFBUSxJQUFJLENBQUM7QUFFbkIsdUJBQU8sR0FBRyxhQUFhLGVBQWUsQ0FBQyxDQUFDLENBQUMsR0FBRywwQkFBMEI7QUFBQSxFQUN4RSxDQUFDO0FBRUQsS0FBRyxnQ0FBZ0MsWUFBWTtBQUM3QyxVQUFNLGVBQWUsTUFBTSxLQUFLLFNBQVMsTUFBUztBQUVsRCxVQUFNLFVBQVUsMENBQTBCO0FBQUEsTUFDeEMsTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sU0FBUztBQUFBLE1BQ1Q7QUFBQSxJQUNGLENBQUM7QUFFRCxVQUFNLFFBQVEsSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLEdBQUcsUUFBUSxhQUFhLENBQUMsQ0FBQztBQUUxRCx1QkFBTyxHQUNMLGFBQWEsZUFBZSxDQUFDLENBQUMsQ0FBQyxHQUMvQiwrQkFDRjtBQUFBLEVBQ0YsQ0FBQztBQUVELEtBQUcscURBQXFELFlBQVk7QUFDbEUsVUFBTSxlQUFlLE1BQU0sS0FBSyxTQUFTLE1BQVM7QUFFbEQsVUFBTSxVQUFVLDBDQUEwQjtBQUFBLE1BQ3hDLE1BQU07QUFBQSxNQUNOLE1BQU07QUFBQSxNQUNOLFNBQVM7QUFBQSxNQUNUO0FBQUEsSUFDRixDQUFDO0FBRUQsVUFBTSxRQUFRLElBQUk7QUFBQSxNQUNmLGFBQVk7QUFDWCxjQUFNLFFBQVEsSUFBSSxDQUFDO0FBQ25CLGNBQU0sUUFBUSxJQUFJLENBQUM7QUFBQSxNQUNyQixHQUFHO0FBQUEsTUFDSCxRQUFRLGFBQWE7QUFBQSxJQUN2QixDQUFDO0FBRUQsNEJBQU8sYUFBYSxVQUFVLFdBQVcsQ0FBQyxDQUFDLENBQUMsR0FBRyxxQkFBcUI7QUFDcEUsNEJBQU8sYUFBYSxXQUFXLFdBQVcsQ0FBQyxDQUFDLENBQUMsR0FBRyxzQkFBc0I7QUFDdEUsNEJBQU8sQ0FBQyxhQUFhLFNBQVM7QUFBQSxFQUNoQyxDQUFDO0FBQ0gsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
