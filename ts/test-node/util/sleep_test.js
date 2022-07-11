var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var import_chai = require("chai");
var import_sinon = require("sinon");
var import_sleep = require("../../util/sleep");
describe("sleep", () => {
  beforeEach(/* @__PURE__ */ __name(function beforeEach2() {
    this.clock = (0, import_sinon.useFakeTimers)();
  }, "beforeEach"));
  afterEach(/* @__PURE__ */ __name(function afterEach2() {
    this.clock.restore();
  }, "afterEach"));
  it("returns a promise that resolves after the specified number of milliseconds", async function test() {
    let isDone = false;
    (async () => {
      await (0, import_sleep.sleep)(123);
      isDone = true;
    })();
    import_chai.assert.isFalse(isDone);
    await this.clock.tickAsync(100);
    import_chai.assert.isFalse(isDone);
    await this.clock.tickAsync(25);
    import_chai.assert.isTrue(isDone);
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic2xlZXBfdGVzdC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjAgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyBhc3NlcnQgfSBmcm9tICdjaGFpJztcbmltcG9ydCB7IHVzZUZha2VUaW1lcnMgfSBmcm9tICdzaW5vbic7XG5cbmltcG9ydCB7IHNsZWVwIH0gZnJvbSAnLi4vLi4vdXRpbC9zbGVlcCc7XG5cbmRlc2NyaWJlKCdzbGVlcCcsICgpID0+IHtcbiAgYmVmb3JlRWFjaChmdW5jdGlvbiBiZWZvcmVFYWNoKCkge1xuICAgIC8vIFRoaXMgaXNuJ3QgYSBob29rLlxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZWFjdC1ob29rcy9ydWxlcy1vZi1ob29rc1xuICAgIHRoaXMuY2xvY2sgPSB1c2VGYWtlVGltZXJzKCk7XG4gIH0pO1xuXG4gIGFmdGVyRWFjaChmdW5jdGlvbiBhZnRlckVhY2goKSB7XG4gICAgdGhpcy5jbG9jay5yZXN0b3JlKCk7XG4gIH0pO1xuXG4gIGl0KCdyZXR1cm5zIGEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIGFmdGVyIHRoZSBzcGVjaWZpZWQgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcycsIGFzeW5jIGZ1bmN0aW9uIHRlc3QoKSB7XG4gICAgbGV0IGlzRG9uZSA9IGZhbHNlO1xuXG4gICAgKGFzeW5jICgpID0+IHtcbiAgICAgIGF3YWl0IHNsZWVwKDEyMyk7XG4gICAgICBpc0RvbmUgPSB0cnVlO1xuICAgIH0pKCk7XG5cbiAgICBhc3NlcnQuaXNGYWxzZShpc0RvbmUpO1xuXG4gICAgYXdhaXQgdGhpcy5jbG9jay50aWNrQXN5bmMoMTAwKTtcbiAgICBhc3NlcnQuaXNGYWxzZShpc0RvbmUpO1xuXG4gICAgYXdhaXQgdGhpcy5jbG9jay50aWNrQXN5bmMoMjUpO1xuICAgIGFzc2VydC5pc1RydWUoaXNEb25lKTtcbiAgfSk7XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7O0FBR0Esa0JBQXVCO0FBQ3ZCLG1CQUE4QjtBQUU5QixtQkFBc0I7QUFFdEIsU0FBUyxTQUFTLE1BQU07QUFDdEIsYUFBVyw4Q0FBc0I7QUFHL0IsU0FBSyxRQUFRLGdDQUFjO0FBQUEsRUFDN0IsR0FKVyxhQUlWO0FBRUQsWUFBVSw2Q0FBcUI7QUFDN0IsU0FBSyxNQUFNLFFBQVE7QUFBQSxFQUNyQixHQUZVLFlBRVQ7QUFFRCxLQUFHLDhFQUE4RSxzQkFBc0I7QUFDckcsUUFBSSxTQUFTO0FBRWIsSUFBQyxhQUFZO0FBQ1gsWUFBTSx3QkFBTSxHQUFHO0FBQ2YsZUFBUztBQUFBLElBQ1gsR0FBRztBQUVILHVCQUFPLFFBQVEsTUFBTTtBQUVyQixVQUFNLEtBQUssTUFBTSxVQUFVLEdBQUc7QUFDOUIsdUJBQU8sUUFBUSxNQUFNO0FBRXJCLFVBQU0sS0FBSyxNQUFNLFVBQVUsRUFBRTtBQUM3Qix1QkFBTyxPQUFPLE1BQU07QUFBQSxFQUN0QixDQUFDO0FBQ0gsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
