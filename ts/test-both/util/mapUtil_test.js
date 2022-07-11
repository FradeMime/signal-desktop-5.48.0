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
var import_mapUtil = require("../../util/mapUtil");
describe("map utilities", () => {
  describe("groupBy", () => {
    it("returns an empty map when passed an empty iterable", () => {
      const fn = sinon.fake();
      import_chai.assert.isEmpty((0, import_mapUtil.groupBy)([], fn));
      sinon.assert.notCalled(fn);
    });
    it("groups the iterable", () => {
      import_chai.assert.deepEqual((0, import_mapUtil.groupBy)([2.3, 1.3, 2.9, 1.1, 3.4], Math.floor), /* @__PURE__ */ new Map([
        [1, [1.3, 1.1]],
        [2, [2.3, 2.9]],
        [3, [3.4]]
      ]));
    });
  });
  describe("isEqual", () => {
    it("returns false on different maps", () => {
      import_chai.assert.isFalse((0, import_mapUtil.isEqual)(/* @__PURE__ */ new Map([]), /* @__PURE__ */ new Map([["key", 1]])));
      import_chai.assert.isFalse((0, import_mapUtil.isEqual)(/* @__PURE__ */ new Map([["key", 0]]), /* @__PURE__ */ new Map([["key", 1]])));
      import_chai.assert.isFalse((0, import_mapUtil.isEqual)(/* @__PURE__ */ new Map([
        ["key", 1],
        ["another-key", 2]
      ]), /* @__PURE__ */ new Map([["key", 1]])));
    });
    it("returns true on equal maps", () => {
      import_chai.assert.isTrue((0, import_mapUtil.isEqual)(/* @__PURE__ */ new Map([]), /* @__PURE__ */ new Map([])));
      import_chai.assert.isTrue((0, import_mapUtil.isEqual)(/* @__PURE__ */ new Map([["key", 1]]), /* @__PURE__ */ new Map([["key", 1]])));
      import_chai.assert.isTrue((0, import_mapUtil.isEqual)(/* @__PURE__ */ new Map([
        ["a", 1],
        ["b", 2]
      ]), /* @__PURE__ */ new Map([
        ["b", 2],
        ["a", 1]
      ])));
    });
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibWFwVXRpbF90ZXN0LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IGFzc2VydCB9IGZyb20gJ2NoYWknO1xuaW1wb3J0ICogYXMgc2lub24gZnJvbSAnc2lub24nO1xuXG5pbXBvcnQgeyBncm91cEJ5LCBpc0VxdWFsIH0gZnJvbSAnLi4vLi4vdXRpbC9tYXBVdGlsJztcblxuZGVzY3JpYmUoJ21hcCB1dGlsaXRpZXMnLCAoKSA9PiB7XG4gIGRlc2NyaWJlKCdncm91cEJ5JywgKCkgPT4ge1xuICAgIGl0KCdyZXR1cm5zIGFuIGVtcHR5IG1hcCB3aGVuIHBhc3NlZCBhbiBlbXB0eSBpdGVyYWJsZScsICgpID0+IHtcbiAgICAgIGNvbnN0IGZuID0gc2lub24uZmFrZSgpO1xuXG4gICAgICBhc3NlcnQuaXNFbXB0eShncm91cEJ5KFtdLCBmbikpO1xuXG4gICAgICBzaW5vbi5hc3NlcnQubm90Q2FsbGVkKGZuKTtcbiAgICB9KTtcblxuICAgIGl0KCdncm91cHMgdGhlIGl0ZXJhYmxlJywgKCkgPT4ge1xuICAgICAgYXNzZXJ0LmRlZXBFcXVhbChcbiAgICAgICAgZ3JvdXBCeShbMi4zLCAxLjMsIDIuOSwgMS4xLCAzLjRdLCBNYXRoLmZsb29yKSxcbiAgICAgICAgbmV3IE1hcChbXG4gICAgICAgICAgWzEsIFsxLjMsIDEuMV1dLFxuICAgICAgICAgIFsyLCBbMi4zLCAyLjldXSxcbiAgICAgICAgICBbMywgWzMuNF1dLFxuICAgICAgICBdKVxuICAgICAgKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ2lzRXF1YWwnLCAoKSA9PiB7XG4gICAgaXQoJ3JldHVybnMgZmFsc2Ugb24gZGlmZmVyZW50IG1hcHMnLCAoKSA9PiB7XG4gICAgICBhc3NlcnQuaXNGYWxzZShcbiAgICAgICAgaXNFcXVhbDxzdHJpbmcsIG51bWJlcj4obmV3IE1hcChbXSksIG5ldyBNYXAoW1sna2V5JywgMV1dKSlcbiAgICAgICk7XG5cbiAgICAgIGFzc2VydC5pc0ZhbHNlKFxuICAgICAgICBpc0VxdWFsPHN0cmluZywgbnVtYmVyPihuZXcgTWFwKFtbJ2tleScsIDBdXSksIG5ldyBNYXAoW1sna2V5JywgMV1dKSlcbiAgICAgICk7XG5cbiAgICAgIGFzc2VydC5pc0ZhbHNlKFxuICAgICAgICBpc0VxdWFsPHN0cmluZywgbnVtYmVyPihcbiAgICAgICAgICBuZXcgTWFwKFtcbiAgICAgICAgICAgIFsna2V5JywgMV0sXG4gICAgICAgICAgICBbJ2Fub3RoZXIta2V5JywgMl0sXG4gICAgICAgICAgXSksXG4gICAgICAgICAgbmV3IE1hcChbWydrZXknLCAxXV0pXG4gICAgICAgIClcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyB0cnVlIG9uIGVxdWFsIG1hcHMnLCAoKSA9PiB7XG4gICAgICBhc3NlcnQuaXNUcnVlKGlzRXF1YWw8c3RyaW5nLCBudW1iZXI+KG5ldyBNYXAoW10pLCBuZXcgTWFwKFtdKSkpO1xuICAgICAgYXNzZXJ0LmlzVHJ1ZShcbiAgICAgICAgaXNFcXVhbDxzdHJpbmcsIG51bWJlcj4obmV3IE1hcChbWydrZXknLCAxXV0pLCBuZXcgTWFwKFtbJ2tleScsIDFdXSkpXG4gICAgICApO1xuICAgICAgYXNzZXJ0LmlzVHJ1ZShcbiAgICAgICAgaXNFcXVhbDxzdHJpbmcsIG51bWJlcj4oXG4gICAgICAgICAgbmV3IE1hcChbXG4gICAgICAgICAgICBbJ2EnLCAxXSxcbiAgICAgICAgICAgIFsnYicsIDJdLFxuICAgICAgICAgIF0pLFxuICAgICAgICAgIG5ldyBNYXAoW1xuICAgICAgICAgICAgWydiJywgMl0sXG4gICAgICAgICAgICBbJ2EnLCAxXSxcbiAgICAgICAgICBdKVxuICAgICAgICApXG4gICAgICApO1xuICAgIH0pO1xuICB9KTtcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7O0FBR0Esa0JBQXVCO0FBQ3ZCLFlBQXVCO0FBRXZCLHFCQUFpQztBQUVqQyxTQUFTLGlCQUFpQixNQUFNO0FBQzlCLFdBQVMsV0FBVyxNQUFNO0FBQ3hCLE9BQUcsc0RBQXNELE1BQU07QUFDN0QsWUFBTSxLQUFLLE1BQU0sS0FBSztBQUV0Qix5QkFBTyxRQUFRLDRCQUFRLENBQUMsR0FBRyxFQUFFLENBQUM7QUFFOUIsWUFBTSxPQUFPLFVBQVUsRUFBRTtBQUFBLElBQzNCLENBQUM7QUFFRCxPQUFHLHVCQUF1QixNQUFNO0FBQzlCLHlCQUFPLFVBQ0wsNEJBQVEsQ0FBQyxLQUFLLEtBQUssS0FBSyxLQUFLLEdBQUcsR0FBRyxLQUFLLEtBQUssR0FDN0Msb0JBQUksSUFBSTtBQUFBLFFBQ04sQ0FBQyxHQUFHLENBQUMsS0FBSyxHQUFHLENBQUM7QUFBQSxRQUNkLENBQUMsR0FBRyxDQUFDLEtBQUssR0FBRyxDQUFDO0FBQUEsUUFDZCxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUM7QUFBQSxNQUNYLENBQUMsQ0FDSDtBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0gsQ0FBQztBQUVELFdBQVMsV0FBVyxNQUFNO0FBQ3hCLE9BQUcsbUNBQW1DLE1BQU07QUFDMUMseUJBQU8sUUFDTCw0QkFBd0Isb0JBQUksSUFBSSxDQUFDLENBQUMsR0FBRyxvQkFBSSxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FDNUQ7QUFFQSx5QkFBTyxRQUNMLDRCQUF3QixvQkFBSSxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsb0JBQUksSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQ3RFO0FBRUEseUJBQU8sUUFDTCw0QkFDRSxvQkFBSSxJQUFJO0FBQUEsUUFDTixDQUFDLE9BQU8sQ0FBQztBQUFBLFFBQ1QsQ0FBQyxlQUFlLENBQUM7QUFBQSxNQUNuQixDQUFDLEdBQ0Qsb0JBQUksSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUN0QixDQUNGO0FBQUEsSUFDRixDQUFDO0FBRUQsT0FBRyw4QkFBOEIsTUFBTTtBQUNyQyx5QkFBTyxPQUFPLDRCQUF3QixvQkFBSSxJQUFJLENBQUMsQ0FBQyxHQUFHLG9CQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMvRCx5QkFBTyxPQUNMLDRCQUF3QixvQkFBSSxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsb0JBQUksSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQ3RFO0FBQ0EseUJBQU8sT0FDTCw0QkFDRSxvQkFBSSxJQUFJO0FBQUEsUUFDTixDQUFDLEtBQUssQ0FBQztBQUFBLFFBQ1AsQ0FBQyxLQUFLLENBQUM7QUFBQSxNQUNULENBQUMsR0FDRCxvQkFBSSxJQUFJO0FBQUEsUUFDTixDQUFDLEtBQUssQ0FBQztBQUFBLFFBQ1AsQ0FBQyxLQUFLLENBQUM7QUFBQSxNQUNULENBQUMsQ0FDSCxDQUNGO0FBQUEsSUFDRixDQUFDO0FBQUEsRUFDSCxDQUFDO0FBQ0gsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
