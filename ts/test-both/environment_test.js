var import_chai = require("chai");
var import_environment = require("../environment");
describe("environment utilities", () => {
  describe("parseEnvironment", () => {
    it("returns Environment.Production for non-strings", () => {
      import_chai.assert.equal((0, import_environment.parseEnvironment)(void 0), import_environment.Environment.Production);
      import_chai.assert.equal((0, import_environment.parseEnvironment)(0), import_environment.Environment.Production);
    });
    it("returns Environment.Production for invalid strings", () => {
      import_chai.assert.equal((0, import_environment.parseEnvironment)(""), import_environment.Environment.Production);
      import_chai.assert.equal((0, import_environment.parseEnvironment)(" development "), import_environment.Environment.Production);
      import_chai.assert.equal((0, import_environment.parseEnvironment)("PRODUCTION"), import_environment.Environment.Production);
    });
    it('parses "development" as Environment.Development', () => {
      import_chai.assert.equal((0, import_environment.parseEnvironment)("development"), import_environment.Environment.Development);
    });
    it('parses "production" as Environment.Production', () => {
      import_chai.assert.equal((0, import_environment.parseEnvironment)("production"), import_environment.Environment.Production);
    });
    it('parses "staging" as Environment.Staging', () => {
      import_chai.assert.equal((0, import_environment.parseEnvironment)("staging"), import_environment.Environment.Staging);
    });
    it('parses "test" as Environment.Test', () => {
      import_chai.assert.equal((0, import_environment.parseEnvironment)("test"), import_environment.Environment.Test);
    });
  });
  describe("isTestEnvironment", () => {
    it("returns false for non-test environments", () => {
      import_chai.assert.isFalse((0, import_environment.isTestEnvironment)(import_environment.Environment.Development));
      import_chai.assert.isFalse((0, import_environment.isTestEnvironment)(import_environment.Environment.Production));
      import_chai.assert.isFalse((0, import_environment.isTestEnvironment)(import_environment.Environment.Staging));
    });
    it("returns true for test environments", () => {
      import_chai.assert.isTrue((0, import_environment.isTestEnvironment)(import_environment.Environment.Test));
    });
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZW52aXJvbm1lbnRfdGVzdC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyBhc3NlcnQgfSBmcm9tICdjaGFpJztcblxuaW1wb3J0IHtcbiAgRW52aXJvbm1lbnQsXG4gIGlzVGVzdEVudmlyb25tZW50LFxuICBwYXJzZUVudmlyb25tZW50LFxufSBmcm9tICcuLi9lbnZpcm9ubWVudCc7XG5cbmRlc2NyaWJlKCdlbnZpcm9ubWVudCB1dGlsaXRpZXMnLCAoKSA9PiB7XG4gIGRlc2NyaWJlKCdwYXJzZUVudmlyb25tZW50JywgKCkgPT4ge1xuICAgIGl0KCdyZXR1cm5zIEVudmlyb25tZW50LlByb2R1Y3Rpb24gZm9yIG5vbi1zdHJpbmdzJywgKCkgPT4ge1xuICAgICAgYXNzZXJ0LmVxdWFsKHBhcnNlRW52aXJvbm1lbnQodW5kZWZpbmVkKSwgRW52aXJvbm1lbnQuUHJvZHVjdGlvbik7XG4gICAgICBhc3NlcnQuZXF1YWwocGFyc2VFbnZpcm9ubWVudCgwKSwgRW52aXJvbm1lbnQuUHJvZHVjdGlvbik7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyBFbnZpcm9ubWVudC5Qcm9kdWN0aW9uIGZvciBpbnZhbGlkIHN0cmluZ3MnLCAoKSA9PiB7XG4gICAgICBhc3NlcnQuZXF1YWwocGFyc2VFbnZpcm9ubWVudCgnJyksIEVudmlyb25tZW50LlByb2R1Y3Rpb24pO1xuICAgICAgYXNzZXJ0LmVxdWFsKHBhcnNlRW52aXJvbm1lbnQoJyBkZXZlbG9wbWVudCAnKSwgRW52aXJvbm1lbnQuUHJvZHVjdGlvbik7XG4gICAgICBhc3NlcnQuZXF1YWwocGFyc2VFbnZpcm9ubWVudCgnUFJPRFVDVElPTicpLCBFbnZpcm9ubWVudC5Qcm9kdWN0aW9uKTtcbiAgICB9KTtcblxuICAgIGl0KCdwYXJzZXMgXCJkZXZlbG9wbWVudFwiIGFzIEVudmlyb25tZW50LkRldmVsb3BtZW50JywgKCkgPT4ge1xuICAgICAgYXNzZXJ0LmVxdWFsKHBhcnNlRW52aXJvbm1lbnQoJ2RldmVsb3BtZW50JyksIEVudmlyb25tZW50LkRldmVsb3BtZW50KTtcbiAgICB9KTtcblxuICAgIGl0KCdwYXJzZXMgXCJwcm9kdWN0aW9uXCIgYXMgRW52aXJvbm1lbnQuUHJvZHVjdGlvbicsICgpID0+IHtcbiAgICAgIGFzc2VydC5lcXVhbChwYXJzZUVudmlyb25tZW50KCdwcm9kdWN0aW9uJyksIEVudmlyb25tZW50LlByb2R1Y3Rpb24pO1xuICAgIH0pO1xuXG4gICAgaXQoJ3BhcnNlcyBcInN0YWdpbmdcIiBhcyBFbnZpcm9ubWVudC5TdGFnaW5nJywgKCkgPT4ge1xuICAgICAgYXNzZXJ0LmVxdWFsKHBhcnNlRW52aXJvbm1lbnQoJ3N0YWdpbmcnKSwgRW52aXJvbm1lbnQuU3RhZ2luZyk7XG4gICAgfSk7XG5cbiAgICBpdCgncGFyc2VzIFwidGVzdFwiIGFzIEVudmlyb25tZW50LlRlc3QnLCAoKSA9PiB7XG4gICAgICBhc3NlcnQuZXF1YWwocGFyc2VFbnZpcm9ubWVudCgndGVzdCcpLCBFbnZpcm9ubWVudC5UZXN0KTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ2lzVGVzdEVudmlyb25tZW50JywgKCkgPT4ge1xuICAgIGl0KCdyZXR1cm5zIGZhbHNlIGZvciBub24tdGVzdCBlbnZpcm9ubWVudHMnLCAoKSA9PiB7XG4gICAgICBhc3NlcnQuaXNGYWxzZShpc1Rlc3RFbnZpcm9ubWVudChFbnZpcm9ubWVudC5EZXZlbG9wbWVudCkpO1xuICAgICAgYXNzZXJ0LmlzRmFsc2UoaXNUZXN0RW52aXJvbm1lbnQoRW52aXJvbm1lbnQuUHJvZHVjdGlvbikpO1xuICAgICAgYXNzZXJ0LmlzRmFsc2UoaXNUZXN0RW52aXJvbm1lbnQoRW52aXJvbm1lbnQuU3RhZ2luZykpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgdHJ1ZSBmb3IgdGVzdCBlbnZpcm9ubWVudHMnLCAoKSA9PiB7XG4gICAgICBhc3NlcnQuaXNUcnVlKGlzVGVzdEVudmlyb25tZW50KEVudmlyb25tZW50LlRlc3QpKTtcbiAgICB9KTtcbiAgfSk7XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICJBQUdBLGtCQUF1QjtBQUV2Qix5QkFJTztBQUVQLFNBQVMseUJBQXlCLE1BQU07QUFDdEMsV0FBUyxvQkFBb0IsTUFBTTtBQUNqQyxPQUFHLGtEQUFrRCxNQUFNO0FBQ3pELHlCQUFPLE1BQU0seUNBQWlCLE1BQVMsR0FBRywrQkFBWSxVQUFVO0FBQ2hFLHlCQUFPLE1BQU0seUNBQWlCLENBQUMsR0FBRywrQkFBWSxVQUFVO0FBQUEsSUFDMUQsQ0FBQztBQUVELE9BQUcsc0RBQXNELE1BQU07QUFDN0QseUJBQU8sTUFBTSx5Q0FBaUIsRUFBRSxHQUFHLCtCQUFZLFVBQVU7QUFDekQseUJBQU8sTUFBTSx5Q0FBaUIsZUFBZSxHQUFHLCtCQUFZLFVBQVU7QUFDdEUseUJBQU8sTUFBTSx5Q0FBaUIsWUFBWSxHQUFHLCtCQUFZLFVBQVU7QUFBQSxJQUNyRSxDQUFDO0FBRUQsT0FBRyxtREFBbUQsTUFBTTtBQUMxRCx5QkFBTyxNQUFNLHlDQUFpQixhQUFhLEdBQUcsK0JBQVksV0FBVztBQUFBLElBQ3ZFLENBQUM7QUFFRCxPQUFHLGlEQUFpRCxNQUFNO0FBQ3hELHlCQUFPLE1BQU0seUNBQWlCLFlBQVksR0FBRywrQkFBWSxVQUFVO0FBQUEsSUFDckUsQ0FBQztBQUVELE9BQUcsMkNBQTJDLE1BQU07QUFDbEQseUJBQU8sTUFBTSx5Q0FBaUIsU0FBUyxHQUFHLCtCQUFZLE9BQU87QUFBQSxJQUMvRCxDQUFDO0FBRUQsT0FBRyxxQ0FBcUMsTUFBTTtBQUM1Qyx5QkFBTyxNQUFNLHlDQUFpQixNQUFNLEdBQUcsK0JBQVksSUFBSTtBQUFBLElBQ3pELENBQUM7QUFBQSxFQUNILENBQUM7QUFFRCxXQUFTLHFCQUFxQixNQUFNO0FBQ2xDLE9BQUcsMkNBQTJDLE1BQU07QUFDbEQseUJBQU8sUUFBUSwwQ0FBa0IsK0JBQVksV0FBVyxDQUFDO0FBQ3pELHlCQUFPLFFBQVEsMENBQWtCLCtCQUFZLFVBQVUsQ0FBQztBQUN4RCx5QkFBTyxRQUFRLDBDQUFrQiwrQkFBWSxPQUFPLENBQUM7QUFBQSxJQUN2RCxDQUFDO0FBRUQsT0FBRyxzQ0FBc0MsTUFBTTtBQUM3Qyx5QkFBTyxPQUFPLDBDQUFrQiwrQkFBWSxJQUFJLENBQUM7QUFBQSxJQUNuRCxDQUFDO0FBQUEsRUFDSCxDQUFDO0FBQ0gsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
