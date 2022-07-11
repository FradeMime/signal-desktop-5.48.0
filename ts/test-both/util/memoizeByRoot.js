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
var import_memoizeByRoot = require("../../util/memoizeByRoot");
class Root {
}
describe("memoizeByRoot", () => {
  it("should memoize by last passed arguments", () => {
    const root = new Root();
    const stub = sinon.stub();
    stub.withArgs(sinon.match.same(root), 1).returns(1);
    stub.withArgs(sinon.match.same(root), 2).returns(2);
    const fn = (0, import_memoizeByRoot.memoizeByRoot)(stub);
    import_chai.assert.strictEqual(fn(root, 1), 1);
    import_chai.assert.strictEqual(fn(root, 1), 1);
    import_chai.assert.isTrue(stub.calledOnce);
    import_chai.assert.strictEqual(fn(root, 2), 2);
    import_chai.assert.strictEqual(fn(root, 2), 2);
    import_chai.assert.isTrue(stub.calledTwice);
    import_chai.assert.strictEqual(fn(root, 1), 1);
    import_chai.assert.strictEqual(fn(root, 1), 1);
    import_chai.assert.isTrue(stub.calledThrice);
  });
  it("should memoize results by root", () => {
    const rootA = new Root();
    const rootB = new Root();
    const stub = sinon.stub();
    stub.withArgs(sinon.match.same(rootA), 1).returns(1);
    stub.withArgs(sinon.match.same(rootA), 2).returns(2);
    stub.withArgs(sinon.match.same(rootB), 1).returns(3);
    stub.withArgs(sinon.match.same(rootB), 2).returns(4);
    const fn = (0, import_memoizeByRoot.memoizeByRoot)(stub);
    import_chai.assert.strictEqual(fn(rootA, 1), 1);
    import_chai.assert.strictEqual(fn(rootB, 1), 3);
    import_chai.assert.strictEqual(fn(rootA, 1), 1);
    import_chai.assert.strictEqual(fn(rootB, 1), 3);
    import_chai.assert.isTrue(stub.calledTwice);
    import_chai.assert.strictEqual(fn(rootA, 2), 2);
    import_chai.assert.strictEqual(fn(rootB, 2), 4);
    import_chai.assert.strictEqual(fn(rootA, 2), 2);
    import_chai.assert.strictEqual(fn(rootB, 2), 4);
    import_chai.assert.strictEqual(stub.callCount, 4);
    import_chai.assert.strictEqual(fn(rootA, 1), 1);
    import_chai.assert.strictEqual(fn(rootB, 1), 3);
    import_chai.assert.strictEqual(stub.callCount, 6);
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibWVtb2l6ZUJ5Um9vdC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyBhc3NlcnQgfSBmcm9tICdjaGFpJztcbmltcG9ydCAqIGFzIHNpbm9uIGZyb20gJ3Npbm9uJztcblxuaW1wb3J0IHsgbWVtb2l6ZUJ5Um9vdCB9IGZyb20gJy4uLy4uL3V0aWwvbWVtb2l6ZUJ5Um9vdCc7XG5cbmNsYXNzIFJvb3Qge31cblxuZGVzY3JpYmUoJ21lbW9pemVCeVJvb3QnLCAoKSA9PiB7XG4gIGl0KCdzaG91bGQgbWVtb2l6ZSBieSBsYXN0IHBhc3NlZCBhcmd1bWVudHMnLCAoKSA9PiB7XG4gICAgY29uc3Qgcm9vdCA9IG5ldyBSb290KCk7XG5cbiAgICBjb25zdCBzdHViID0gc2lub24uc3R1YigpO1xuICAgIHN0dWIud2l0aEFyZ3Moc2lub24ubWF0Y2guc2FtZShyb290KSwgMSkucmV0dXJucygxKTtcbiAgICBzdHViLndpdGhBcmdzKHNpbm9uLm1hdGNoLnNhbWUocm9vdCksIDIpLnJldHVybnMoMik7XG5cbiAgICBjb25zdCBmbiA9IG1lbW9pemVCeVJvb3Qoc3R1Yik7XG5cbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwoZm4ocm9vdCwgMSksIDEpO1xuICAgIGFzc2VydC5zdHJpY3RFcXVhbChmbihyb290LCAxKSwgMSk7XG4gICAgYXNzZXJ0LmlzVHJ1ZShzdHViLmNhbGxlZE9uY2UpO1xuXG4gICAgYXNzZXJ0LnN0cmljdEVxdWFsKGZuKHJvb3QsIDIpLCAyKTtcbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwoZm4ocm9vdCwgMiksIDIpO1xuICAgIGFzc2VydC5pc1RydWUoc3R1Yi5jYWxsZWRUd2ljZSk7XG5cbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwoZm4ocm9vdCwgMSksIDEpO1xuICAgIGFzc2VydC5zdHJpY3RFcXVhbChmbihyb290LCAxKSwgMSk7XG4gICAgYXNzZXJ0LmlzVHJ1ZShzdHViLmNhbGxlZFRocmljZSk7XG4gIH0pO1xuXG4gIGl0KCdzaG91bGQgbWVtb2l6ZSByZXN1bHRzIGJ5IHJvb3QnLCAoKSA9PiB7XG4gICAgY29uc3Qgcm9vdEEgPSBuZXcgUm9vdCgpO1xuICAgIGNvbnN0IHJvb3RCID0gbmV3IFJvb3QoKTtcblxuICAgIGNvbnN0IHN0dWIgPSBzaW5vbi5zdHViKCk7XG4gICAgc3R1Yi53aXRoQXJncyhzaW5vbi5tYXRjaC5zYW1lKHJvb3RBKSwgMSkucmV0dXJucygxKTtcbiAgICBzdHViLndpdGhBcmdzKHNpbm9uLm1hdGNoLnNhbWUocm9vdEEpLCAyKS5yZXR1cm5zKDIpO1xuICAgIHN0dWIud2l0aEFyZ3Moc2lub24ubWF0Y2guc2FtZShyb290QiksIDEpLnJldHVybnMoMyk7XG4gICAgc3R1Yi53aXRoQXJncyhzaW5vbi5tYXRjaC5zYW1lKHJvb3RCKSwgMikucmV0dXJucyg0KTtcblxuICAgIGNvbnN0IGZuID0gbWVtb2l6ZUJ5Um9vdChzdHViKTtcblxuICAgIGFzc2VydC5zdHJpY3RFcXVhbChmbihyb290QSwgMSksIDEpO1xuICAgIGFzc2VydC5zdHJpY3RFcXVhbChmbihyb290QiwgMSksIDMpO1xuICAgIGFzc2VydC5zdHJpY3RFcXVhbChmbihyb290QSwgMSksIDEpO1xuICAgIGFzc2VydC5zdHJpY3RFcXVhbChmbihyb290QiwgMSksIDMpO1xuICAgIGFzc2VydC5pc1RydWUoc3R1Yi5jYWxsZWRUd2ljZSk7XG5cbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwoZm4ocm9vdEEsIDIpLCAyKTtcbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwoZm4ocm9vdEIsIDIpLCA0KTtcbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwoZm4ocm9vdEEsIDIpLCAyKTtcbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwoZm4ocm9vdEIsIDIpLCA0KTtcbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwoc3R1Yi5jYWxsQ291bnQsIDQpO1xuXG4gICAgYXNzZXJ0LnN0cmljdEVxdWFsKGZuKHJvb3RBLCAxKSwgMSk7XG4gICAgYXNzZXJ0LnN0cmljdEVxdWFsKGZuKHJvb3RCLCAxKSwgMyk7XG4gICAgYXNzZXJ0LnN0cmljdEVxdWFsKHN0dWIuY2FsbENvdW50LCA2KTtcbiAgfSk7XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHQSxrQkFBdUI7QUFDdkIsWUFBdUI7QUFFdkIsMkJBQThCO0FBRTlCLE1BQU0sS0FBSztBQUFDO0FBQVosQUFFQSxTQUFTLGlCQUFpQixNQUFNO0FBQzlCLEtBQUcsMkNBQTJDLE1BQU07QUFDbEQsVUFBTSxPQUFPLElBQUksS0FBSztBQUV0QixVQUFNLE9BQU8sTUFBTSxLQUFLO0FBQ3hCLFNBQUssU0FBUyxNQUFNLE1BQU0sS0FBSyxJQUFJLEdBQUcsQ0FBQyxFQUFFLFFBQVEsQ0FBQztBQUNsRCxTQUFLLFNBQVMsTUFBTSxNQUFNLEtBQUssSUFBSSxHQUFHLENBQUMsRUFBRSxRQUFRLENBQUM7QUFFbEQsVUFBTSxLQUFLLHdDQUFjLElBQUk7QUFFN0IsdUJBQU8sWUFBWSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUM7QUFDakMsdUJBQU8sWUFBWSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUM7QUFDakMsdUJBQU8sT0FBTyxLQUFLLFVBQVU7QUFFN0IsdUJBQU8sWUFBWSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUM7QUFDakMsdUJBQU8sWUFBWSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUM7QUFDakMsdUJBQU8sT0FBTyxLQUFLLFdBQVc7QUFFOUIsdUJBQU8sWUFBWSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUM7QUFDakMsdUJBQU8sWUFBWSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUM7QUFDakMsdUJBQU8sT0FBTyxLQUFLLFlBQVk7QUFBQSxFQUNqQyxDQUFDO0FBRUQsS0FBRyxrQ0FBa0MsTUFBTTtBQUN6QyxVQUFNLFFBQVEsSUFBSSxLQUFLO0FBQ3ZCLFVBQU0sUUFBUSxJQUFJLEtBQUs7QUFFdkIsVUFBTSxPQUFPLE1BQU0sS0FBSztBQUN4QixTQUFLLFNBQVMsTUFBTSxNQUFNLEtBQUssS0FBSyxHQUFHLENBQUMsRUFBRSxRQUFRLENBQUM7QUFDbkQsU0FBSyxTQUFTLE1BQU0sTUFBTSxLQUFLLEtBQUssR0FBRyxDQUFDLEVBQUUsUUFBUSxDQUFDO0FBQ25ELFNBQUssU0FBUyxNQUFNLE1BQU0sS0FBSyxLQUFLLEdBQUcsQ0FBQyxFQUFFLFFBQVEsQ0FBQztBQUNuRCxTQUFLLFNBQVMsTUFBTSxNQUFNLEtBQUssS0FBSyxHQUFHLENBQUMsRUFBRSxRQUFRLENBQUM7QUFFbkQsVUFBTSxLQUFLLHdDQUFjLElBQUk7QUFFN0IsdUJBQU8sWUFBWSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUM7QUFDbEMsdUJBQU8sWUFBWSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUM7QUFDbEMsdUJBQU8sWUFBWSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUM7QUFDbEMsdUJBQU8sWUFBWSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUM7QUFDbEMsdUJBQU8sT0FBTyxLQUFLLFdBQVc7QUFFOUIsdUJBQU8sWUFBWSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUM7QUFDbEMsdUJBQU8sWUFBWSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUM7QUFDbEMsdUJBQU8sWUFBWSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUM7QUFDbEMsdUJBQU8sWUFBWSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUM7QUFDbEMsdUJBQU8sWUFBWSxLQUFLLFdBQVcsQ0FBQztBQUVwQyx1QkFBTyxZQUFZLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQztBQUNsQyx1QkFBTyxZQUFZLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQztBQUNsQyx1QkFBTyxZQUFZLEtBQUssV0FBVyxDQUFDO0FBQUEsRUFDdEMsQ0FBQztBQUNILENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
