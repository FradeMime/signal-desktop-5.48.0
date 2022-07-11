var import_chai = require("chai");
var import_parseIntOrThrow = require("../../util/parseIntOrThrow");
describe("parseIntOrThrow", () => {
  describe("when passed a number argument", () => {
    it("returns the number when passed an integer", () => {
      import_chai.assert.strictEqual((0, import_parseIntOrThrow.parseIntOrThrow)(0, "shouldn't happen"), 0);
      import_chai.assert.strictEqual((0, import_parseIntOrThrow.parseIntOrThrow)(123, "shouldn't happen"), 123);
      import_chai.assert.strictEqual((0, import_parseIntOrThrow.parseIntOrThrow)(-123, "shouldn't happen"), -123);
    });
    it("throws when passed a decimal value", () => {
      import_chai.assert.throws(() => (0, import_parseIntOrThrow.parseIntOrThrow)(0.2, "uh oh"), "uh oh");
      import_chai.assert.throws(() => (0, import_parseIntOrThrow.parseIntOrThrow)(1.23, "uh oh"), "uh oh");
    });
    it("throws when passed NaN", () => {
      import_chai.assert.throws(() => (0, import_parseIntOrThrow.parseIntOrThrow)(NaN, "uh oh"), "uh oh");
    });
    it("throws when passed \u221E", () => {
      import_chai.assert.throws(() => (0, import_parseIntOrThrow.parseIntOrThrow)(Infinity, "uh oh"), "uh oh");
      import_chai.assert.throws(() => (0, import_parseIntOrThrow.parseIntOrThrow)(-Infinity, "uh oh"), "uh oh");
    });
  });
  describe("when passed a string argument", () => {
    it("returns the number when passed an integer", () => {
      import_chai.assert.strictEqual((0, import_parseIntOrThrow.parseIntOrThrow)("0", "shouldn't happen"), 0);
      import_chai.assert.strictEqual((0, import_parseIntOrThrow.parseIntOrThrow)("123", "shouldn't happen"), 123);
      import_chai.assert.strictEqual((0, import_parseIntOrThrow.parseIntOrThrow)("-123", "shouldn't happen"), -123);
    });
    it("parses decimal values like parseInt", () => {
      import_chai.assert.strictEqual((0, import_parseIntOrThrow.parseIntOrThrow)("0.2", "shouldn't happen"), 0);
      import_chai.assert.strictEqual((0, import_parseIntOrThrow.parseIntOrThrow)("12.34", "shouldn't happen"), 12);
      import_chai.assert.strictEqual((0, import_parseIntOrThrow.parseIntOrThrow)("-12.34", "shouldn't happen"), -12);
    });
    it("parses values in base 10", () => {
      import_chai.assert.strictEqual((0, import_parseIntOrThrow.parseIntOrThrow)("0x12", "shouldn't happen"), 0);
    });
    it("throws when passed non-parseable strings", () => {
      import_chai.assert.throws(() => (0, import_parseIntOrThrow.parseIntOrThrow)("", "uh oh"), "uh oh");
      import_chai.assert.throws(() => (0, import_parseIntOrThrow.parseIntOrThrow)("uh 123", "uh oh"), "uh oh");
      import_chai.assert.throws(() => (0, import_parseIntOrThrow.parseIntOrThrow)("uh oh", "uh oh"), "uh oh");
    });
  });
  describe("when passed other arguments", () => {
    it("throws when passed arguments that aren't strings or numbers", () => {
      import_chai.assert.throws(() => (0, import_parseIntOrThrow.parseIntOrThrow)(null, "uh oh"), "uh oh");
      import_chai.assert.throws(() => (0, import_parseIntOrThrow.parseIntOrThrow)(void 0, "uh oh"), "uh oh");
      import_chai.assert.throws(() => (0, import_parseIntOrThrow.parseIntOrThrow)(["123"], "uh oh"), "uh oh");
    });
    it("throws when passed a stringifiable argument, unlike parseInt", () => {
      const obj = {
        toString() {
          return "123";
        }
      };
      import_chai.assert.throws(() => (0, import_parseIntOrThrow.parseIntOrThrow)(obj, "uh oh"), "uh oh");
    });
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsicGFyc2VJbnRPclRocm93X3Rlc3QudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSAnY2hhaSc7XG5cbmltcG9ydCB7IHBhcnNlSW50T3JUaHJvdyB9IGZyb20gJy4uLy4uL3V0aWwvcGFyc2VJbnRPclRocm93JztcblxuZGVzY3JpYmUoJ3BhcnNlSW50T3JUaHJvdycsICgpID0+IHtcbiAgZGVzY3JpYmUoJ3doZW4gcGFzc2VkIGEgbnVtYmVyIGFyZ3VtZW50JywgKCkgPT4ge1xuICAgIGl0KCdyZXR1cm5zIHRoZSBudW1iZXIgd2hlbiBwYXNzZWQgYW4gaW50ZWdlcicsICgpID0+IHtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChwYXJzZUludE9yVGhyb3coMCwgXCJzaG91bGRuJ3QgaGFwcGVuXCIpLCAwKTtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChwYXJzZUludE9yVGhyb3coMTIzLCBcInNob3VsZG4ndCBoYXBwZW5cIiksIDEyMyk7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwocGFyc2VJbnRPclRocm93KC0xMjMsIFwic2hvdWxkbid0IGhhcHBlblwiKSwgLTEyMyk7XG4gICAgfSk7XG5cbiAgICBpdCgndGhyb3dzIHdoZW4gcGFzc2VkIGEgZGVjaW1hbCB2YWx1ZScsICgpID0+IHtcbiAgICAgIGFzc2VydC50aHJvd3MoKCkgPT4gcGFyc2VJbnRPclRocm93KDAuMiwgJ3VoIG9oJyksICd1aCBvaCcpO1xuICAgICAgYXNzZXJ0LnRocm93cygoKSA9PiBwYXJzZUludE9yVGhyb3coMS4yMywgJ3VoIG9oJyksICd1aCBvaCcpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Rocm93cyB3aGVuIHBhc3NlZCBOYU4nLCAoKSA9PiB7XG4gICAgICBhc3NlcnQudGhyb3dzKCgpID0+IHBhcnNlSW50T3JUaHJvdyhOYU4sICd1aCBvaCcpLCAndWggb2gnKTtcbiAgICB9KTtcblxuICAgIGl0KCd0aHJvd3Mgd2hlbiBwYXNzZWQgXHUyMjFFJywgKCkgPT4ge1xuICAgICAgYXNzZXJ0LnRocm93cygoKSA9PiBwYXJzZUludE9yVGhyb3coSW5maW5pdHksICd1aCBvaCcpLCAndWggb2gnKTtcbiAgICAgIGFzc2VydC50aHJvd3MoKCkgPT4gcGFyc2VJbnRPclRocm93KC1JbmZpbml0eSwgJ3VoIG9oJyksICd1aCBvaCcpO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnd2hlbiBwYXNzZWQgYSBzdHJpbmcgYXJndW1lbnQnLCAoKSA9PiB7XG4gICAgaXQoJ3JldHVybnMgdGhlIG51bWJlciB3aGVuIHBhc3NlZCBhbiBpbnRlZ2VyJywgKCkgPT4ge1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKHBhcnNlSW50T3JUaHJvdygnMCcsIFwic2hvdWxkbid0IGhhcHBlblwiKSwgMCk7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwocGFyc2VJbnRPclRocm93KCcxMjMnLCBcInNob3VsZG4ndCBoYXBwZW5cIiksIDEyMyk7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwocGFyc2VJbnRPclRocm93KCctMTIzJywgXCJzaG91bGRuJ3QgaGFwcGVuXCIpLCAtMTIzKTtcbiAgICB9KTtcblxuICAgIGl0KCdwYXJzZXMgZGVjaW1hbCB2YWx1ZXMgbGlrZSBwYXJzZUludCcsICgpID0+IHtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChwYXJzZUludE9yVGhyb3coJzAuMicsIFwic2hvdWxkbid0IGhhcHBlblwiKSwgMCk7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwocGFyc2VJbnRPclRocm93KCcxMi4zNCcsIFwic2hvdWxkbid0IGhhcHBlblwiKSwgMTIpO1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKHBhcnNlSW50T3JUaHJvdygnLTEyLjM0JywgXCJzaG91bGRuJ3QgaGFwcGVuXCIpLCAtMTIpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3BhcnNlcyB2YWx1ZXMgaW4gYmFzZSAxMCcsICgpID0+IHtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChwYXJzZUludE9yVGhyb3coJzB4MTInLCBcInNob3VsZG4ndCBoYXBwZW5cIiksIDApO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Rocm93cyB3aGVuIHBhc3NlZCBub24tcGFyc2VhYmxlIHN0cmluZ3MnLCAoKSA9PiB7XG4gICAgICBhc3NlcnQudGhyb3dzKCgpID0+IHBhcnNlSW50T3JUaHJvdygnJywgJ3VoIG9oJyksICd1aCBvaCcpO1xuICAgICAgYXNzZXJ0LnRocm93cygoKSA9PiBwYXJzZUludE9yVGhyb3coJ3VoIDEyMycsICd1aCBvaCcpLCAndWggb2gnKTtcbiAgICAgIGFzc2VydC50aHJvd3MoKCkgPT4gcGFyc2VJbnRPclRocm93KCd1aCBvaCcsICd1aCBvaCcpLCAndWggb2gnKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ3doZW4gcGFzc2VkIG90aGVyIGFyZ3VtZW50cycsICgpID0+IHtcbiAgICBpdChcInRocm93cyB3aGVuIHBhc3NlZCBhcmd1bWVudHMgdGhhdCBhcmVuJ3Qgc3RyaW5ncyBvciBudW1iZXJzXCIsICgpID0+IHtcbiAgICAgIGFzc2VydC50aHJvd3MoKCkgPT4gcGFyc2VJbnRPclRocm93KG51bGwsICd1aCBvaCcpLCAndWggb2gnKTtcbiAgICAgIGFzc2VydC50aHJvd3MoKCkgPT4gcGFyc2VJbnRPclRocm93KHVuZGVmaW5lZCwgJ3VoIG9oJyksICd1aCBvaCcpO1xuICAgICAgYXNzZXJ0LnRocm93cygoKSA9PiBwYXJzZUludE9yVGhyb3coWycxMjMnXSwgJ3VoIG9oJyksICd1aCBvaCcpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Rocm93cyB3aGVuIHBhc3NlZCBhIHN0cmluZ2lmaWFibGUgYXJndW1lbnQsIHVubGlrZSBwYXJzZUludCcsICgpID0+IHtcbiAgICAgIGNvbnN0IG9iaiA9IHtcbiAgICAgICAgdG9TdHJpbmcoKSB7XG4gICAgICAgICAgcmV0dXJuICcxMjMnO1xuICAgICAgICB9LFxuICAgICAgfTtcbiAgICAgIGFzc2VydC50aHJvd3MoKCkgPT4gcGFyc2VJbnRPclRocm93KG9iaiwgJ3VoIG9oJyksICd1aCBvaCcpO1xuICAgIH0pO1xuICB9KTtcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIkFBR0Esa0JBQXVCO0FBRXZCLDZCQUFnQztBQUVoQyxTQUFTLG1CQUFtQixNQUFNO0FBQ2hDLFdBQVMsaUNBQWlDLE1BQU07QUFDOUMsT0FBRyw2Q0FBNkMsTUFBTTtBQUNwRCx5QkFBTyxZQUFZLDRDQUFnQixHQUFHLGtCQUFrQixHQUFHLENBQUM7QUFDNUQseUJBQU8sWUFBWSw0Q0FBZ0IsS0FBSyxrQkFBa0IsR0FBRyxHQUFHO0FBQ2hFLHlCQUFPLFlBQVksNENBQWdCLE1BQU0sa0JBQWtCLEdBQUcsSUFBSTtBQUFBLElBQ3BFLENBQUM7QUFFRCxPQUFHLHNDQUFzQyxNQUFNO0FBQzdDLHlCQUFPLE9BQU8sTUFBTSw0Q0FBZ0IsS0FBSyxPQUFPLEdBQUcsT0FBTztBQUMxRCx5QkFBTyxPQUFPLE1BQU0sNENBQWdCLE1BQU0sT0FBTyxHQUFHLE9BQU87QUFBQSxJQUM3RCxDQUFDO0FBRUQsT0FBRywwQkFBMEIsTUFBTTtBQUNqQyx5QkFBTyxPQUFPLE1BQU0sNENBQWdCLEtBQUssT0FBTyxHQUFHLE9BQU87QUFBQSxJQUM1RCxDQUFDO0FBRUQsT0FBRyw2QkFBd0IsTUFBTTtBQUMvQix5QkFBTyxPQUFPLE1BQU0sNENBQWdCLFVBQVUsT0FBTyxHQUFHLE9BQU87QUFDL0QseUJBQU8sT0FBTyxNQUFNLDRDQUFnQixXQUFXLE9BQU8sR0FBRyxPQUFPO0FBQUEsSUFDbEUsQ0FBQztBQUFBLEVBQ0gsQ0FBQztBQUVELFdBQVMsaUNBQWlDLE1BQU07QUFDOUMsT0FBRyw2Q0FBNkMsTUFBTTtBQUNwRCx5QkFBTyxZQUFZLDRDQUFnQixLQUFLLGtCQUFrQixHQUFHLENBQUM7QUFDOUQseUJBQU8sWUFBWSw0Q0FBZ0IsT0FBTyxrQkFBa0IsR0FBRyxHQUFHO0FBQ2xFLHlCQUFPLFlBQVksNENBQWdCLFFBQVEsa0JBQWtCLEdBQUcsSUFBSTtBQUFBLElBQ3RFLENBQUM7QUFFRCxPQUFHLHVDQUF1QyxNQUFNO0FBQzlDLHlCQUFPLFlBQVksNENBQWdCLE9BQU8sa0JBQWtCLEdBQUcsQ0FBQztBQUNoRSx5QkFBTyxZQUFZLDRDQUFnQixTQUFTLGtCQUFrQixHQUFHLEVBQUU7QUFDbkUseUJBQU8sWUFBWSw0Q0FBZ0IsVUFBVSxrQkFBa0IsR0FBRyxHQUFHO0FBQUEsSUFDdkUsQ0FBQztBQUVELE9BQUcsNEJBQTRCLE1BQU07QUFDbkMseUJBQU8sWUFBWSw0Q0FBZ0IsUUFBUSxrQkFBa0IsR0FBRyxDQUFDO0FBQUEsSUFDbkUsQ0FBQztBQUVELE9BQUcsNENBQTRDLE1BQU07QUFDbkQseUJBQU8sT0FBTyxNQUFNLDRDQUFnQixJQUFJLE9BQU8sR0FBRyxPQUFPO0FBQ3pELHlCQUFPLE9BQU8sTUFBTSw0Q0FBZ0IsVUFBVSxPQUFPLEdBQUcsT0FBTztBQUMvRCx5QkFBTyxPQUFPLE1BQU0sNENBQWdCLFNBQVMsT0FBTyxHQUFHLE9BQU87QUFBQSxJQUNoRSxDQUFDO0FBQUEsRUFDSCxDQUFDO0FBRUQsV0FBUywrQkFBK0IsTUFBTTtBQUM1QyxPQUFHLCtEQUErRCxNQUFNO0FBQ3RFLHlCQUFPLE9BQU8sTUFBTSw0Q0FBZ0IsTUFBTSxPQUFPLEdBQUcsT0FBTztBQUMzRCx5QkFBTyxPQUFPLE1BQU0sNENBQWdCLFFBQVcsT0FBTyxHQUFHLE9BQU87QUFDaEUseUJBQU8sT0FBTyxNQUFNLDRDQUFnQixDQUFDLEtBQUssR0FBRyxPQUFPLEdBQUcsT0FBTztBQUFBLElBQ2hFLENBQUM7QUFFRCxPQUFHLGdFQUFnRSxNQUFNO0FBQ3ZFLFlBQU0sTUFBTTtBQUFBLFFBQ1YsV0FBVztBQUNULGlCQUFPO0FBQUEsUUFDVDtBQUFBLE1BQ0Y7QUFDQSx5QkFBTyxPQUFPLE1BQU0sNENBQWdCLEtBQUssT0FBTyxHQUFHLE9BQU87QUFBQSxJQUM1RCxDQUFDO0FBQUEsRUFDSCxDQUFDO0FBQ0gsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
