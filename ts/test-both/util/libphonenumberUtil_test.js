var import_chai = require("chai");
var import_libphonenumberUtil = require("../../util/libphonenumberUtil");
describe("libphonenumber util", () => {
  describe("parseNumber", () => {
    it("numbers with + are valid without providing regionCode", () => {
      const result = (0, import_libphonenumberUtil.parseNumber)("+14155555555");
      if (!result.isValidNumber) {
        throw new import_chai.AssertionError("Phone number is not valid");
      }
      import_chai.assert.strictEqual(result.e164, "+14155555555");
      import_chai.assert.strictEqual(result.regionCode, "US");
      import_chai.assert.strictEqual(result.countryCode, "1");
    });
    it("variant numbers with the right regionCode are valid", () => {
      ["4155555555", "14155555555", "+14155555555"].forEach((number) => {
        const result = (0, import_libphonenumberUtil.parseNumber)(number, "US");
        if (!result.isValidNumber) {
          throw new import_chai.AssertionError("Phone number is not valid");
        }
        import_chai.assert.strictEqual(result.e164, "+14155555555");
        import_chai.assert.strictEqual(result.regionCode, "US");
        import_chai.assert.strictEqual(result.countryCode, "1");
      });
    });
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibGlicGhvbmVudW1iZXJVdGlsX3Rlc3QudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDE1LTIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyBhc3NlcnQsIEFzc2VydGlvbkVycm9yIH0gZnJvbSAnY2hhaSc7XG5pbXBvcnQgeyBwYXJzZU51bWJlciB9IGZyb20gJy4uLy4uL3V0aWwvbGlicGhvbmVudW1iZXJVdGlsJztcblxuZGVzY3JpYmUoJ2xpYnBob25lbnVtYmVyIHV0aWwnLCAoKSA9PiB7XG4gIGRlc2NyaWJlKCdwYXJzZU51bWJlcicsICgpID0+IHtcbiAgICBpdCgnbnVtYmVycyB3aXRoICsgYXJlIHZhbGlkIHdpdGhvdXQgcHJvdmlkaW5nIHJlZ2lvbkNvZGUnLCAoKSA9PiB7XG4gICAgICBjb25zdCByZXN1bHQgPSBwYXJzZU51bWJlcignKzE0MTU1NTU1NTU1Jyk7XG4gICAgICBpZiAoIXJlc3VsdC5pc1ZhbGlkTnVtYmVyKSB7XG4gICAgICAgIHRocm93IG5ldyBBc3NlcnRpb25FcnJvcignUGhvbmUgbnVtYmVyIGlzIG5vdCB2YWxpZCcpO1xuICAgICAgfVxuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKHJlc3VsdC5lMTY0LCAnKzE0MTU1NTU1NTU1Jyk7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwocmVzdWx0LnJlZ2lvbkNvZGUsICdVUycpO1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKHJlc3VsdC5jb3VudHJ5Q29kZSwgJzEnKTtcbiAgICB9KTtcbiAgICBpdCgndmFyaWFudCBudW1iZXJzIHdpdGggdGhlIHJpZ2h0IHJlZ2lvbkNvZGUgYXJlIHZhbGlkJywgKCkgPT4ge1xuICAgICAgWyc0MTU1NTU1NTU1JywgJzE0MTU1NTU1NTU1JywgJysxNDE1NTU1NTU1NSddLmZvckVhY2gobnVtYmVyID0+IHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gcGFyc2VOdW1iZXIobnVtYmVyLCAnVVMnKTtcbiAgICAgICAgaWYgKCFyZXN1bHQuaXNWYWxpZE51bWJlcikge1xuICAgICAgICAgIHRocm93IG5ldyBBc3NlcnRpb25FcnJvcignUGhvbmUgbnVtYmVyIGlzIG5vdCB2YWxpZCcpO1xuICAgICAgICB9XG4gICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChyZXN1bHQuZTE2NCwgJysxNDE1NTU1NTU1NScpO1xuICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwocmVzdWx0LnJlZ2lvbkNvZGUsICdVUycpO1xuICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwocmVzdWx0LmNvdW50cnlDb2RlLCAnMScpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiQUFHQSxrQkFBdUM7QUFDdkMsZ0NBQTRCO0FBRTVCLFNBQVMsdUJBQXVCLE1BQU07QUFDcEMsV0FBUyxlQUFlLE1BQU07QUFDNUIsT0FBRyx5REFBeUQsTUFBTTtBQUNoRSxZQUFNLFNBQVMsMkNBQVksY0FBYztBQUN6QyxVQUFJLENBQUMsT0FBTyxlQUFlO0FBQ3pCLGNBQU0sSUFBSSwyQkFBZSwyQkFBMkI7QUFBQSxNQUN0RDtBQUNBLHlCQUFPLFlBQVksT0FBTyxNQUFNLGNBQWM7QUFDOUMseUJBQU8sWUFBWSxPQUFPLFlBQVksSUFBSTtBQUMxQyx5QkFBTyxZQUFZLE9BQU8sYUFBYSxHQUFHO0FBQUEsSUFDNUMsQ0FBQztBQUNELE9BQUcsdURBQXVELE1BQU07QUFDOUQsT0FBQyxjQUFjLGVBQWUsY0FBYyxFQUFFLFFBQVEsWUFBVTtBQUM5RCxjQUFNLFNBQVMsMkNBQVksUUFBUSxJQUFJO0FBQ3ZDLFlBQUksQ0FBQyxPQUFPLGVBQWU7QUFDekIsZ0JBQU0sSUFBSSwyQkFBZSwyQkFBMkI7QUFBQSxRQUN0RDtBQUNBLDJCQUFPLFlBQVksT0FBTyxNQUFNLGNBQWM7QUFDOUMsMkJBQU8sWUFBWSxPQUFPLFlBQVksSUFBSTtBQUMxQywyQkFBTyxZQUFZLE9BQU8sYUFBYSxHQUFHO0FBQUEsTUFDNUMsQ0FBQztBQUFBLElBQ0gsQ0FBQztBQUFBLEVBQ0gsQ0FBQztBQUNILENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
