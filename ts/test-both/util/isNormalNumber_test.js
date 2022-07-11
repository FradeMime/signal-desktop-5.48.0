var import_chai = require("chai");
var import_isNormalNumber = require("../../util/isNormalNumber");
describe("isNormalNumber", () => {
  it("returns false for non-numbers", () => {
    import_chai.assert.isFalse((0, import_isNormalNumber.isNormalNumber)(void 0));
    import_chai.assert.isFalse((0, import_isNormalNumber.isNormalNumber)(null));
    import_chai.assert.isFalse((0, import_isNormalNumber.isNormalNumber)("123"));
    import_chai.assert.isFalse((0, import_isNormalNumber.isNormalNumber)(BigInt(123)));
  });
  it("returns false for Number objects, which should never be used", () => {
    import_chai.assert.isFalse((0, import_isNormalNumber.isNormalNumber)(new Number(123)));
  });
  it("returns false for values that can be converted to numbers", () => {
    const obj = {
      [Symbol.toPrimitive]() {
        return 123;
      }
    };
    import_chai.assert.isFalse((0, import_isNormalNumber.isNormalNumber)(obj));
  });
  it("returns false for NaN", () => {
    import_chai.assert.isFalse((0, import_isNormalNumber.isNormalNumber)(NaN));
  });
  it("returns false for Infinity", () => {
    import_chai.assert.isFalse((0, import_isNormalNumber.isNormalNumber)(Infinity));
    import_chai.assert.isFalse((0, import_isNormalNumber.isNormalNumber)(-Infinity));
  });
  it("returns true for other numbers", () => {
    import_chai.assert.isTrue((0, import_isNormalNumber.isNormalNumber)(123));
    import_chai.assert.isTrue((0, import_isNormalNumber.isNormalNumber)(0));
    import_chai.assert.isTrue((0, import_isNormalNumber.isNormalNumber)(-1));
    import_chai.assert.isTrue((0, import_isNormalNumber.isNormalNumber)(0.12));
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiaXNOb3JtYWxOdW1iZXJfdGVzdC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyBhc3NlcnQgfSBmcm9tICdjaGFpJztcblxuaW1wb3J0IHsgaXNOb3JtYWxOdW1iZXIgfSBmcm9tICcuLi8uLi91dGlsL2lzTm9ybWFsTnVtYmVyJztcblxuZGVzY3JpYmUoJ2lzTm9ybWFsTnVtYmVyJywgKCkgPT4ge1xuICBpdCgncmV0dXJucyBmYWxzZSBmb3Igbm9uLW51bWJlcnMnLCAoKSA9PiB7XG4gICAgYXNzZXJ0LmlzRmFsc2UoaXNOb3JtYWxOdW1iZXIodW5kZWZpbmVkKSk7XG4gICAgYXNzZXJ0LmlzRmFsc2UoaXNOb3JtYWxOdW1iZXIobnVsbCkpO1xuICAgIGFzc2VydC5pc0ZhbHNlKGlzTm9ybWFsTnVtYmVyKCcxMjMnKSk7XG4gICAgYXNzZXJ0LmlzRmFsc2UoaXNOb3JtYWxOdW1iZXIoQmlnSW50KDEyMykpKTtcbiAgfSk7XG5cbiAgaXQoJ3JldHVybnMgZmFsc2UgZm9yIE51bWJlciBvYmplY3RzLCB3aGljaCBzaG91bGQgbmV2ZXIgYmUgdXNlZCcsICgpID0+IHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbmV3LXdyYXBwZXJzXG4gICAgYXNzZXJ0LmlzRmFsc2UoaXNOb3JtYWxOdW1iZXIobmV3IE51bWJlcigxMjMpKSk7XG4gIH0pO1xuXG4gIGl0KCdyZXR1cm5zIGZhbHNlIGZvciB2YWx1ZXMgdGhhdCBjYW4gYmUgY29udmVydGVkIHRvIG51bWJlcnMnLCAoKSA9PiB7XG4gICAgY29uc3Qgb2JqID0ge1xuICAgICAgW1N5bWJvbC50b1ByaW1pdGl2ZV0oKSB7XG4gICAgICAgIHJldHVybiAxMjM7XG4gICAgICB9LFxuICAgIH07XG4gICAgYXNzZXJ0LmlzRmFsc2UoaXNOb3JtYWxOdW1iZXIob2JqKSk7XG4gIH0pO1xuXG4gIGl0KCdyZXR1cm5zIGZhbHNlIGZvciBOYU4nLCAoKSA9PiB7XG4gICAgYXNzZXJ0LmlzRmFsc2UoaXNOb3JtYWxOdW1iZXIoTmFOKSk7XG4gIH0pO1xuXG4gIGl0KCdyZXR1cm5zIGZhbHNlIGZvciBJbmZpbml0eScsICgpID0+IHtcbiAgICBhc3NlcnQuaXNGYWxzZShpc05vcm1hbE51bWJlcihJbmZpbml0eSkpO1xuICAgIGFzc2VydC5pc0ZhbHNlKGlzTm9ybWFsTnVtYmVyKC1JbmZpbml0eSkpO1xuICB9KTtcblxuICBpdCgncmV0dXJucyB0cnVlIGZvciBvdGhlciBudW1iZXJzJywgKCkgPT4ge1xuICAgIGFzc2VydC5pc1RydWUoaXNOb3JtYWxOdW1iZXIoMTIzKSk7XG4gICAgYXNzZXJ0LmlzVHJ1ZShpc05vcm1hbE51bWJlcigwKSk7XG4gICAgYXNzZXJ0LmlzVHJ1ZShpc05vcm1hbE51bWJlcigtMSkpO1xuICAgIGFzc2VydC5pc1RydWUoaXNOb3JtYWxOdW1iZXIoMC4xMikpO1xuICB9KTtcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIkFBR0Esa0JBQXVCO0FBRXZCLDRCQUErQjtBQUUvQixTQUFTLGtCQUFrQixNQUFNO0FBQy9CLEtBQUcsaUNBQWlDLE1BQU07QUFDeEMsdUJBQU8sUUFBUSwwQ0FBZSxNQUFTLENBQUM7QUFDeEMsdUJBQU8sUUFBUSwwQ0FBZSxJQUFJLENBQUM7QUFDbkMsdUJBQU8sUUFBUSwwQ0FBZSxLQUFLLENBQUM7QUFDcEMsdUJBQU8sUUFBUSwwQ0FBZSxPQUFPLEdBQUcsQ0FBQyxDQUFDO0FBQUEsRUFDNUMsQ0FBQztBQUVELEtBQUcsZ0VBQWdFLE1BQU07QUFFdkUsdUJBQU8sUUFBUSwwQ0FBZSxJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUM7QUFBQSxFQUNoRCxDQUFDO0FBRUQsS0FBRyw2REFBNkQsTUFBTTtBQUNwRSxVQUFNLE1BQU07QUFBQSxPQUNULE9BQU8sZUFBZTtBQUNyQixlQUFPO0FBQUEsTUFDVDtBQUFBLElBQ0Y7QUFDQSx1QkFBTyxRQUFRLDBDQUFlLEdBQUcsQ0FBQztBQUFBLEVBQ3BDLENBQUM7QUFFRCxLQUFHLHlCQUF5QixNQUFNO0FBQ2hDLHVCQUFPLFFBQVEsMENBQWUsR0FBRyxDQUFDO0FBQUEsRUFDcEMsQ0FBQztBQUVELEtBQUcsOEJBQThCLE1BQU07QUFDckMsdUJBQU8sUUFBUSwwQ0FBZSxRQUFRLENBQUM7QUFDdkMsdUJBQU8sUUFBUSwwQ0FBZSxTQUFTLENBQUM7QUFBQSxFQUMxQyxDQUFDO0FBRUQsS0FBRyxrQ0FBa0MsTUFBTTtBQUN6Qyx1QkFBTyxPQUFPLDBDQUFlLEdBQUcsQ0FBQztBQUNqQyx1QkFBTyxPQUFPLDBDQUFlLENBQUMsQ0FBQztBQUMvQix1QkFBTyxPQUFPLDBDQUFlLEVBQUUsQ0FBQztBQUNoQyx1QkFBTyxPQUFPLDBDQUFlLElBQUksQ0FBQztBQUFBLEVBQ3BDLENBQUM7QUFDSCxDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
