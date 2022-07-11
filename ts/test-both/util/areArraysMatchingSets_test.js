var import_chai = require("chai");
var import_areArraysMatchingSets = require("../../util/areArraysMatchingSets");
describe("areArraysMatchingSets", () => {
  it("returns true if arrays are both empty", () => {
    const left = [];
    const right = [];
    import_chai.assert.isTrue((0, import_areArraysMatchingSets.areArraysMatchingSets)(left, right));
  });
  it("returns true if arrays are equal", () => {
    const left = [1, 2, 3];
    const right = [1, 2, 3];
    import_chai.assert.isTrue((0, import_areArraysMatchingSets.areArraysMatchingSets)(left, right));
  });
  it("returns true if arrays are equal but out of order", () => {
    const left = [1, 2, 3];
    const right = [3, 1, 2];
    import_chai.assert.isTrue((0, import_areArraysMatchingSets.areArraysMatchingSets)(left, right));
  });
  it("returns true if arrays are equal but one has duplicates", () => {
    const left = [1, 2, 3, 1];
    const right = [1, 2, 3];
    import_chai.assert.isTrue((0, import_areArraysMatchingSets.areArraysMatchingSets)(left, right));
  });
  it("returns false if first array has missing elements", () => {
    const left = [1, 2];
    const right = [1, 2, 3];
    import_chai.assert.isFalse((0, import_areArraysMatchingSets.areArraysMatchingSets)(left, right));
  });
  it("returns false if second array has missing elements", () => {
    const left = [1, 2, 3];
    const right = [1, 2];
    import_chai.assert.isFalse((0, import_areArraysMatchingSets.areArraysMatchingSets)(left, right));
  });
  it("returns false if second array is empty", () => {
    const left = [1, 2, 3];
    const right = [];
    import_chai.assert.isFalse((0, import_areArraysMatchingSets.areArraysMatchingSets)(left, right));
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiYXJlQXJyYXlzTWF0Y2hpbmdTZXRzX3Rlc3QudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSAnY2hhaSc7XG5cbmltcG9ydCB7IGFyZUFycmF5c01hdGNoaW5nU2V0cyB9IGZyb20gJy4uLy4uL3V0aWwvYXJlQXJyYXlzTWF0Y2hpbmdTZXRzJztcblxuZGVzY3JpYmUoJ2FyZUFycmF5c01hdGNoaW5nU2V0cycsICgpID0+IHtcbiAgaXQoJ3JldHVybnMgdHJ1ZSBpZiBhcnJheXMgYXJlIGJvdGggZW1wdHknLCAoKSA9PiB7XG4gICAgY29uc3QgbGVmdDogQXJyYXk8c3RyaW5nPiA9IFtdO1xuICAgIGNvbnN0IHJpZ2h0OiBBcnJheTxzdHJpbmc+ID0gW107XG5cbiAgICBhc3NlcnQuaXNUcnVlKGFyZUFycmF5c01hdGNoaW5nU2V0cyhsZWZ0LCByaWdodCkpO1xuICB9KTtcblxuICBpdCgncmV0dXJucyB0cnVlIGlmIGFycmF5cyBhcmUgZXF1YWwnLCAoKSA9PiB7XG4gICAgY29uc3QgbGVmdCA9IFsxLCAyLCAzXTtcbiAgICBjb25zdCByaWdodCA9IFsxLCAyLCAzXTtcblxuICAgIGFzc2VydC5pc1RydWUoYXJlQXJyYXlzTWF0Y2hpbmdTZXRzKGxlZnQsIHJpZ2h0KSk7XG4gIH0pO1xuXG4gIGl0KCdyZXR1cm5zIHRydWUgaWYgYXJyYXlzIGFyZSBlcXVhbCBidXQgb3V0IG9mIG9yZGVyJywgKCkgPT4ge1xuICAgIGNvbnN0IGxlZnQgPSBbMSwgMiwgM107XG4gICAgY29uc3QgcmlnaHQgPSBbMywgMSwgMl07XG5cbiAgICBhc3NlcnQuaXNUcnVlKGFyZUFycmF5c01hdGNoaW5nU2V0cyhsZWZ0LCByaWdodCkpO1xuICB9KTtcblxuICBpdCgncmV0dXJucyB0cnVlIGlmIGFycmF5cyBhcmUgZXF1YWwgYnV0IG9uZSBoYXMgZHVwbGljYXRlcycsICgpID0+IHtcbiAgICBjb25zdCBsZWZ0ID0gWzEsIDIsIDMsIDFdO1xuICAgIGNvbnN0IHJpZ2h0ID0gWzEsIDIsIDNdO1xuXG4gICAgYXNzZXJ0LmlzVHJ1ZShhcmVBcnJheXNNYXRjaGluZ1NldHMobGVmdCwgcmlnaHQpKTtcbiAgfSk7XG5cbiAgaXQoJ3JldHVybnMgZmFsc2UgaWYgZmlyc3QgYXJyYXkgaGFzIG1pc3NpbmcgZWxlbWVudHMnLCAoKSA9PiB7XG4gICAgY29uc3QgbGVmdCA9IFsxLCAyXTtcbiAgICBjb25zdCByaWdodCA9IFsxLCAyLCAzXTtcblxuICAgIGFzc2VydC5pc0ZhbHNlKGFyZUFycmF5c01hdGNoaW5nU2V0cyhsZWZ0LCByaWdodCkpO1xuICB9KTtcblxuICBpdCgncmV0dXJucyBmYWxzZSBpZiBzZWNvbmQgYXJyYXkgaGFzIG1pc3NpbmcgZWxlbWVudHMnLCAoKSA9PiB7XG4gICAgY29uc3QgbGVmdCA9IFsxLCAyLCAzXTtcbiAgICBjb25zdCByaWdodCA9IFsxLCAyXTtcblxuICAgIGFzc2VydC5pc0ZhbHNlKGFyZUFycmF5c01hdGNoaW5nU2V0cyhsZWZ0LCByaWdodCkpO1xuICB9KTtcblxuICBpdCgncmV0dXJucyBmYWxzZSBpZiBzZWNvbmQgYXJyYXkgaXMgZW1wdHknLCAoKSA9PiB7XG4gICAgY29uc3QgbGVmdCA9IFsxLCAyLCAzXTtcbiAgICBjb25zdCByaWdodDogQXJyYXk8bnVtYmVyPiA9IFtdO1xuXG4gICAgYXNzZXJ0LmlzRmFsc2UoYXJlQXJyYXlzTWF0Y2hpbmdTZXRzKGxlZnQsIHJpZ2h0KSk7XG4gIH0pO1xufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiQUFHQSxrQkFBdUI7QUFFdkIsbUNBQXNDO0FBRXRDLFNBQVMseUJBQXlCLE1BQU07QUFDdEMsS0FBRyx5Q0FBeUMsTUFBTTtBQUNoRCxVQUFNLE9BQXNCLENBQUM7QUFDN0IsVUFBTSxRQUF1QixDQUFDO0FBRTlCLHVCQUFPLE9BQU8sd0RBQXNCLE1BQU0sS0FBSyxDQUFDO0FBQUEsRUFDbEQsQ0FBQztBQUVELEtBQUcsb0NBQW9DLE1BQU07QUFDM0MsVUFBTSxPQUFPLENBQUMsR0FBRyxHQUFHLENBQUM7QUFDckIsVUFBTSxRQUFRLENBQUMsR0FBRyxHQUFHLENBQUM7QUFFdEIsdUJBQU8sT0FBTyx3REFBc0IsTUFBTSxLQUFLLENBQUM7QUFBQSxFQUNsRCxDQUFDO0FBRUQsS0FBRyxxREFBcUQsTUFBTTtBQUM1RCxVQUFNLE9BQU8sQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUNyQixVQUFNLFFBQVEsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUV0Qix1QkFBTyxPQUFPLHdEQUFzQixNQUFNLEtBQUssQ0FBQztBQUFBLEVBQ2xELENBQUM7QUFFRCxLQUFHLDJEQUEyRCxNQUFNO0FBQ2xFLFVBQU0sT0FBTyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7QUFDeEIsVUFBTSxRQUFRLENBQUMsR0FBRyxHQUFHLENBQUM7QUFFdEIsdUJBQU8sT0FBTyx3REFBc0IsTUFBTSxLQUFLLENBQUM7QUFBQSxFQUNsRCxDQUFDO0FBRUQsS0FBRyxxREFBcUQsTUFBTTtBQUM1RCxVQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUM7QUFDbEIsVUFBTSxRQUFRLENBQUMsR0FBRyxHQUFHLENBQUM7QUFFdEIsdUJBQU8sUUFBUSx3REFBc0IsTUFBTSxLQUFLLENBQUM7QUFBQSxFQUNuRCxDQUFDO0FBRUQsS0FBRyxzREFBc0QsTUFBTTtBQUM3RCxVQUFNLE9BQU8sQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUNyQixVQUFNLFFBQVEsQ0FBQyxHQUFHLENBQUM7QUFFbkIsdUJBQU8sUUFBUSx3REFBc0IsTUFBTSxLQUFLLENBQUM7QUFBQSxFQUNuRCxDQUFDO0FBRUQsS0FBRywwQ0FBMEMsTUFBTTtBQUNqRCxVQUFNLE9BQU8sQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUNyQixVQUFNLFFBQXVCLENBQUM7QUFFOUIsdUJBQU8sUUFBUSx3REFBc0IsTUFBTSxLQUFLLENBQUM7QUFBQSxFQUNuRCxDQUFDO0FBQ0gsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
