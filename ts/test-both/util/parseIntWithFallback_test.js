var import_chai = require("chai");
var import_parseIntWithFallback = require("../../util/parseIntWithFallback");
describe("parseIntWithFallback", () => {
  describe("when passed a number argument", () => {
    it("returns the number when passed an integer", () => {
      import_chai.assert.strictEqual((0, import_parseIntWithFallback.parseIntWithFallback)(0, -1), 0);
      import_chai.assert.strictEqual((0, import_parseIntWithFallback.parseIntWithFallback)(123, -1), 123);
      import_chai.assert.strictEqual((0, import_parseIntWithFallback.parseIntWithFallback)(-123, -1), -123);
    });
    it("returns the fallback when passed a decimal value", () => {
      import_chai.assert.strictEqual((0, import_parseIntWithFallback.parseIntWithFallback)(0.2, -1), -1);
      import_chai.assert.strictEqual((0, import_parseIntWithFallback.parseIntWithFallback)(1.23, -1), -1);
    });
    it("returns the fallback when passed NaN", () => {
      import_chai.assert.strictEqual((0, import_parseIntWithFallback.parseIntWithFallback)(NaN, -1), -1);
    });
    it("returns the fallback when passed \u221E", () => {
      import_chai.assert.strictEqual((0, import_parseIntWithFallback.parseIntWithFallback)(Infinity, -1), -1);
      import_chai.assert.strictEqual((0, import_parseIntWithFallback.parseIntWithFallback)(-Infinity, -1), -1);
    });
  });
  describe("when passed a string argument", () => {
    it("returns the number when passed an integer", () => {
      import_chai.assert.strictEqual((0, import_parseIntWithFallback.parseIntWithFallback)("0", -1), 0);
      import_chai.assert.strictEqual((0, import_parseIntWithFallback.parseIntWithFallback)("123", -1), 123);
      import_chai.assert.strictEqual((0, import_parseIntWithFallback.parseIntWithFallback)("-123", -1), -123);
    });
    it("parses decimal values like parseInt", () => {
      import_chai.assert.strictEqual((0, import_parseIntWithFallback.parseIntWithFallback)("0.2", -1), 0);
      import_chai.assert.strictEqual((0, import_parseIntWithFallback.parseIntWithFallback)("12.34", -1), 12);
      import_chai.assert.strictEqual((0, import_parseIntWithFallback.parseIntWithFallback)("-12.34", -1), -12);
    });
    it("parses values in base 10", () => {
      import_chai.assert.strictEqual((0, import_parseIntWithFallback.parseIntWithFallback)("0x12", -1), 0);
    });
    it("returns the fallback when passed non-parseable strings", () => {
      import_chai.assert.strictEqual((0, import_parseIntWithFallback.parseIntWithFallback)("", -1), -1);
      import_chai.assert.strictEqual((0, import_parseIntWithFallback.parseIntWithFallback)("uh 123", -1), -1);
      import_chai.assert.strictEqual((0, import_parseIntWithFallback.parseIntWithFallback)("uh oh", -1), -1);
    });
  });
  describe("when passed other arguments", () => {
    it("returns the fallback when passed arguments that aren't strings or numbers", () => {
      import_chai.assert.strictEqual((0, import_parseIntWithFallback.parseIntWithFallback)(null, -1), -1);
      import_chai.assert.strictEqual((0, import_parseIntWithFallback.parseIntWithFallback)(void 0, -1), -1);
      import_chai.assert.strictEqual((0, import_parseIntWithFallback.parseIntWithFallback)(["123"], -1), -1);
    });
    it("returns the fallback when passed a stringifiable argument, unlike parseInt", () => {
      const obj = {
        toString() {
          return "123";
        }
      };
      import_chai.assert.strictEqual((0, import_parseIntWithFallback.parseIntWithFallback)(obj, -1), -1);
    });
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsicGFyc2VJbnRXaXRoRmFsbGJhY2tfdGVzdC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyBhc3NlcnQgfSBmcm9tICdjaGFpJztcblxuaW1wb3J0IHsgcGFyc2VJbnRXaXRoRmFsbGJhY2sgfSBmcm9tICcuLi8uLi91dGlsL3BhcnNlSW50V2l0aEZhbGxiYWNrJztcblxuZGVzY3JpYmUoJ3BhcnNlSW50V2l0aEZhbGxiYWNrJywgKCkgPT4ge1xuICBkZXNjcmliZSgnd2hlbiBwYXNzZWQgYSBudW1iZXIgYXJndW1lbnQnLCAoKSA9PiB7XG4gICAgaXQoJ3JldHVybnMgdGhlIG51bWJlciB3aGVuIHBhc3NlZCBhbiBpbnRlZ2VyJywgKCkgPT4ge1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKHBhcnNlSW50V2l0aEZhbGxiYWNrKDAsIC0xKSwgMCk7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwocGFyc2VJbnRXaXRoRmFsbGJhY2soMTIzLCAtMSksIDEyMyk7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwocGFyc2VJbnRXaXRoRmFsbGJhY2soLTEyMywgLTEpLCAtMTIzKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIHRoZSBmYWxsYmFjayB3aGVuIHBhc3NlZCBhIGRlY2ltYWwgdmFsdWUnLCAoKSA9PiB7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwocGFyc2VJbnRXaXRoRmFsbGJhY2soMC4yLCAtMSksIC0xKTtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChwYXJzZUludFdpdGhGYWxsYmFjaygxLjIzLCAtMSksIC0xKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIHRoZSBmYWxsYmFjayB3aGVuIHBhc3NlZCBOYU4nLCAoKSA9PiB7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwocGFyc2VJbnRXaXRoRmFsbGJhY2soTmFOLCAtMSksIC0xKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIHRoZSBmYWxsYmFjayB3aGVuIHBhc3NlZCBcdTIyMUUnLCAoKSA9PiB7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwocGFyc2VJbnRXaXRoRmFsbGJhY2soSW5maW5pdHksIC0xKSwgLTEpO1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKHBhcnNlSW50V2l0aEZhbGxiYWNrKC1JbmZpbml0eSwgLTEpLCAtMSk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCd3aGVuIHBhc3NlZCBhIHN0cmluZyBhcmd1bWVudCcsICgpID0+IHtcbiAgICBpdCgncmV0dXJucyB0aGUgbnVtYmVyIHdoZW4gcGFzc2VkIGFuIGludGVnZXInLCAoKSA9PiB7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwocGFyc2VJbnRXaXRoRmFsbGJhY2soJzAnLCAtMSksIDApO1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKHBhcnNlSW50V2l0aEZhbGxiYWNrKCcxMjMnLCAtMSksIDEyMyk7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwocGFyc2VJbnRXaXRoRmFsbGJhY2soJy0xMjMnLCAtMSksIC0xMjMpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3BhcnNlcyBkZWNpbWFsIHZhbHVlcyBsaWtlIHBhcnNlSW50JywgKCkgPT4ge1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKHBhcnNlSW50V2l0aEZhbGxiYWNrKCcwLjInLCAtMSksIDApO1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKHBhcnNlSW50V2l0aEZhbGxiYWNrKCcxMi4zNCcsIC0xKSwgMTIpO1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKHBhcnNlSW50V2l0aEZhbGxiYWNrKCctMTIuMzQnLCAtMSksIC0xMik7XG4gICAgfSk7XG5cbiAgICBpdCgncGFyc2VzIHZhbHVlcyBpbiBiYXNlIDEwJywgKCkgPT4ge1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKHBhcnNlSW50V2l0aEZhbGxiYWNrKCcweDEyJywgLTEpLCAwKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIHRoZSBmYWxsYmFjayB3aGVuIHBhc3NlZCBub24tcGFyc2VhYmxlIHN0cmluZ3MnLCAoKSA9PiB7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwocGFyc2VJbnRXaXRoRmFsbGJhY2soJycsIC0xKSwgLTEpO1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKHBhcnNlSW50V2l0aEZhbGxiYWNrKCd1aCAxMjMnLCAtMSksIC0xKTtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChwYXJzZUludFdpdGhGYWxsYmFjaygndWggb2gnLCAtMSksIC0xKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ3doZW4gcGFzc2VkIG90aGVyIGFyZ3VtZW50cycsICgpID0+IHtcbiAgICBpdChcInJldHVybnMgdGhlIGZhbGxiYWNrIHdoZW4gcGFzc2VkIGFyZ3VtZW50cyB0aGF0IGFyZW4ndCBzdHJpbmdzIG9yIG51bWJlcnNcIiwgKCkgPT4ge1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKHBhcnNlSW50V2l0aEZhbGxiYWNrKG51bGwsIC0xKSwgLTEpO1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKHBhcnNlSW50V2l0aEZhbGxiYWNrKHVuZGVmaW5lZCwgLTEpLCAtMSk7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwocGFyc2VJbnRXaXRoRmFsbGJhY2soWycxMjMnXSwgLTEpLCAtMSk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyB0aGUgZmFsbGJhY2sgd2hlbiBwYXNzZWQgYSBzdHJpbmdpZmlhYmxlIGFyZ3VtZW50LCB1bmxpa2UgcGFyc2VJbnQnLCAoKSA9PiB7XG4gICAgICBjb25zdCBvYmogPSB7XG4gICAgICAgIHRvU3RyaW5nKCkge1xuICAgICAgICAgIHJldHVybiAnMTIzJztcbiAgICAgICAgfSxcbiAgICAgIH07XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwocGFyc2VJbnRXaXRoRmFsbGJhY2sob2JqLCAtMSksIC0xKTtcbiAgICB9KTtcbiAgfSk7XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICJBQUdBLGtCQUF1QjtBQUV2QixrQ0FBcUM7QUFFckMsU0FBUyx3QkFBd0IsTUFBTTtBQUNyQyxXQUFTLGlDQUFpQyxNQUFNO0FBQzlDLE9BQUcsNkNBQTZDLE1BQU07QUFDcEQseUJBQU8sWUFBWSxzREFBcUIsR0FBRyxFQUFFLEdBQUcsQ0FBQztBQUNqRCx5QkFBTyxZQUFZLHNEQUFxQixLQUFLLEVBQUUsR0FBRyxHQUFHO0FBQ3JELHlCQUFPLFlBQVksc0RBQXFCLE1BQU0sRUFBRSxHQUFHLElBQUk7QUFBQSxJQUN6RCxDQUFDO0FBRUQsT0FBRyxvREFBb0QsTUFBTTtBQUMzRCx5QkFBTyxZQUFZLHNEQUFxQixLQUFLLEVBQUUsR0FBRyxFQUFFO0FBQ3BELHlCQUFPLFlBQVksc0RBQXFCLE1BQU0sRUFBRSxHQUFHLEVBQUU7QUFBQSxJQUN2RCxDQUFDO0FBRUQsT0FBRyx3Q0FBd0MsTUFBTTtBQUMvQyx5QkFBTyxZQUFZLHNEQUFxQixLQUFLLEVBQUUsR0FBRyxFQUFFO0FBQUEsSUFDdEQsQ0FBQztBQUVELE9BQUcsMkNBQXNDLE1BQU07QUFDN0MseUJBQU8sWUFBWSxzREFBcUIsVUFBVSxFQUFFLEdBQUcsRUFBRTtBQUN6RCx5QkFBTyxZQUFZLHNEQUFxQixXQUFXLEVBQUUsR0FBRyxFQUFFO0FBQUEsSUFDNUQsQ0FBQztBQUFBLEVBQ0gsQ0FBQztBQUVELFdBQVMsaUNBQWlDLE1BQU07QUFDOUMsT0FBRyw2Q0FBNkMsTUFBTTtBQUNwRCx5QkFBTyxZQUFZLHNEQUFxQixLQUFLLEVBQUUsR0FBRyxDQUFDO0FBQ25ELHlCQUFPLFlBQVksc0RBQXFCLE9BQU8sRUFBRSxHQUFHLEdBQUc7QUFDdkQseUJBQU8sWUFBWSxzREFBcUIsUUFBUSxFQUFFLEdBQUcsSUFBSTtBQUFBLElBQzNELENBQUM7QUFFRCxPQUFHLHVDQUF1QyxNQUFNO0FBQzlDLHlCQUFPLFlBQVksc0RBQXFCLE9BQU8sRUFBRSxHQUFHLENBQUM7QUFDckQseUJBQU8sWUFBWSxzREFBcUIsU0FBUyxFQUFFLEdBQUcsRUFBRTtBQUN4RCx5QkFBTyxZQUFZLHNEQUFxQixVQUFVLEVBQUUsR0FBRyxHQUFHO0FBQUEsSUFDNUQsQ0FBQztBQUVELE9BQUcsNEJBQTRCLE1BQU07QUFDbkMseUJBQU8sWUFBWSxzREFBcUIsUUFBUSxFQUFFLEdBQUcsQ0FBQztBQUFBLElBQ3hELENBQUM7QUFFRCxPQUFHLDBEQUEwRCxNQUFNO0FBQ2pFLHlCQUFPLFlBQVksc0RBQXFCLElBQUksRUFBRSxHQUFHLEVBQUU7QUFDbkQseUJBQU8sWUFBWSxzREFBcUIsVUFBVSxFQUFFLEdBQUcsRUFBRTtBQUN6RCx5QkFBTyxZQUFZLHNEQUFxQixTQUFTLEVBQUUsR0FBRyxFQUFFO0FBQUEsSUFDMUQsQ0FBQztBQUFBLEVBQ0gsQ0FBQztBQUVELFdBQVMsK0JBQStCLE1BQU07QUFDNUMsT0FBRyw2RUFBNkUsTUFBTTtBQUNwRix5QkFBTyxZQUFZLHNEQUFxQixNQUFNLEVBQUUsR0FBRyxFQUFFO0FBQ3JELHlCQUFPLFlBQVksc0RBQXFCLFFBQVcsRUFBRSxHQUFHLEVBQUU7QUFDMUQseUJBQU8sWUFBWSxzREFBcUIsQ0FBQyxLQUFLLEdBQUcsRUFBRSxHQUFHLEVBQUU7QUFBQSxJQUMxRCxDQUFDO0FBRUQsT0FBRyw4RUFBOEUsTUFBTTtBQUNyRixZQUFNLE1BQU07QUFBQSxRQUNWLFdBQVc7QUFDVCxpQkFBTztBQUFBLFFBQ1Q7QUFBQSxNQUNGO0FBQ0EseUJBQU8sWUFBWSxzREFBcUIsS0FBSyxFQUFFLEdBQUcsRUFBRTtBQUFBLElBQ3RELENBQUM7QUFBQSxFQUNILENBQUM7QUFDSCxDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
