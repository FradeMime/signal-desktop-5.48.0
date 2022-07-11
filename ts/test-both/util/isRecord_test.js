var import_chai = require("chai");
var import_isRecord = require("../../util/isRecord");
describe("isRecord", () => {
  it("returns false for primitives", () => {
    ["hello", 123, BigInt(123), true, void 0, Symbol("test"), null].forEach((value) => {
      import_chai.assert.isFalse((0, import_isRecord.isRecord)(value));
    });
  });
  it("returns false for arrays", () => {
    import_chai.assert.isFalse((0, import_isRecord.isRecord)([]));
  });
  it('returns true for "plain" objects', () => {
    import_chai.assert.isTrue((0, import_isRecord.isRecord)({}));
    import_chai.assert.isTrue((0, import_isRecord.isRecord)({ foo: "bar" }));
    import_chai.assert.isTrue((0, import_isRecord.isRecord)(/* @__PURE__ */ Object.create(null)));
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiaXNSZWNvcmRfdGVzdC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyBhc3NlcnQgfSBmcm9tICdjaGFpJztcblxuaW1wb3J0IHsgaXNSZWNvcmQgfSBmcm9tICcuLi8uLi91dGlsL2lzUmVjb3JkJztcblxuZGVzY3JpYmUoJ2lzUmVjb3JkJywgKCkgPT4ge1xuICBpdCgncmV0dXJucyBmYWxzZSBmb3IgcHJpbWl0aXZlcycsICgpID0+IHtcbiAgICBbJ2hlbGxvJywgMTIzLCBCaWdJbnQoMTIzKSwgdHJ1ZSwgdW5kZWZpbmVkLCBTeW1ib2woJ3Rlc3QnKSwgbnVsbF0uZm9yRWFjaChcbiAgICAgIHZhbHVlID0+IHtcbiAgICAgICAgYXNzZXJ0LmlzRmFsc2UoaXNSZWNvcmQodmFsdWUpKTtcbiAgICAgIH1cbiAgICApO1xuICB9KTtcblxuICBpdCgncmV0dXJucyBmYWxzZSBmb3IgYXJyYXlzJywgKCkgPT4ge1xuICAgIGFzc2VydC5pc0ZhbHNlKGlzUmVjb3JkKFtdKSk7XG4gIH0pO1xuXG4gIGl0KCdyZXR1cm5zIHRydWUgZm9yIFwicGxhaW5cIiBvYmplY3RzJywgKCkgPT4ge1xuICAgIGFzc2VydC5pc1RydWUoaXNSZWNvcmQoe30pKTtcbiAgICBhc3NlcnQuaXNUcnVlKGlzUmVjb3JkKHsgZm9vOiAnYmFyJyB9KSk7XG4gICAgYXNzZXJ0LmlzVHJ1ZShpc1JlY29yZChPYmplY3QuY3JlYXRlKG51bGwpKSk7XG4gIH0pO1xufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiQUFHQSxrQkFBdUI7QUFFdkIsc0JBQXlCO0FBRXpCLFNBQVMsWUFBWSxNQUFNO0FBQ3pCLEtBQUcsZ0NBQWdDLE1BQU07QUFDdkMsS0FBQyxTQUFTLEtBQUssT0FBTyxHQUFHLEdBQUcsTUFBTSxRQUFXLE9BQU8sTUFBTSxHQUFHLElBQUksRUFBRSxRQUNqRSxXQUFTO0FBQ1AseUJBQU8sUUFBUSw4QkFBUyxLQUFLLENBQUM7QUFBQSxJQUNoQyxDQUNGO0FBQUEsRUFDRixDQUFDO0FBRUQsS0FBRyw0QkFBNEIsTUFBTTtBQUNuQyx1QkFBTyxRQUFRLDhCQUFTLENBQUMsQ0FBQyxDQUFDO0FBQUEsRUFDN0IsQ0FBQztBQUVELEtBQUcsb0NBQW9DLE1BQU07QUFDM0MsdUJBQU8sT0FBTyw4QkFBUyxDQUFDLENBQUMsQ0FBQztBQUMxQix1QkFBTyxPQUFPLDhCQUFTLEVBQUUsS0FBSyxNQUFNLENBQUMsQ0FBQztBQUN0Qyx1QkFBTyxPQUFPLDhCQUFTLHVCQUFPLE9BQU8sSUFBSSxDQUFDLENBQUM7QUFBQSxFQUM3QyxDQUFDO0FBQ0gsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
