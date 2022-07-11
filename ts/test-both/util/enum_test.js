var import_chai = require("chai");
var import_enum = require("../../util/enum");
describe("enum utils", () => {
  describe("makeEnumParser", () => {
    let Color;
    ((Color2) => {
      Color2["Red"] = "red";
      Color2["Green"] = "green";
      Color2["Blue"] = "blue";
    })(Color || (Color = {}));
    const parse = (0, import_enum.makeEnumParser)(Color, "blue" /* Blue */);
    it("returns a parser that returns the default value if passed a non-string", () => {
      [void 0, null, 0, 1, 123].forEach((serializedValue) => {
        const result = parse(serializedValue);
        import_chai.assert.strictEqual(result, "blue" /* Blue */);
      });
    });
    it("returns a parser that returns the default value if passed a string not in the enum", () => {
      ["", "garbage", "RED"].forEach((serializedValue) => {
        const result = parse(serializedValue);
        import_chai.assert.strictEqual(result, "blue" /* Blue */);
      });
    });
    it("returns a parser that parses enum values", () => {
      const result = parse("green");
      import_chai.assert.strictEqual(result, "green" /* Green */);
    });
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZW51bV90ZXN0LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IGFzc2VydCB9IGZyb20gJ2NoYWknO1xuXG5pbXBvcnQgeyBtYWtlRW51bVBhcnNlciB9IGZyb20gJy4uLy4uL3V0aWwvZW51bSc7XG5cbmRlc2NyaWJlKCdlbnVtIHV0aWxzJywgKCkgPT4ge1xuICBkZXNjcmliZSgnbWFrZUVudW1QYXJzZXInLCAoKSA9PiB7XG4gICAgZW51bSBDb2xvciB7XG4gICAgICBSZWQgPSAncmVkJyxcbiAgICAgIEdyZWVuID0gJ2dyZWVuJyxcbiAgICAgIEJsdWUgPSAnYmx1ZScsXG4gICAgfVxuXG4gICAgY29uc3QgcGFyc2UgPSBtYWtlRW51bVBhcnNlcihDb2xvciwgQ29sb3IuQmx1ZSk7XG5cbiAgICBpdCgncmV0dXJucyBhIHBhcnNlciB0aGF0IHJldHVybnMgdGhlIGRlZmF1bHQgdmFsdWUgaWYgcGFzc2VkIGEgbm9uLXN0cmluZycsICgpID0+IHtcbiAgICAgIFt1bmRlZmluZWQsIG51bGwsIDAsIDEsIDEyM10uZm9yRWFjaChzZXJpYWxpemVkVmFsdWUgPT4ge1xuICAgICAgICBjb25zdCByZXN1bHQ6IENvbG9yID0gcGFyc2Uoc2VyaWFsaXplZFZhbHVlKTtcbiAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKHJlc3VsdCwgQ29sb3IuQmx1ZSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIGEgcGFyc2VyIHRoYXQgcmV0dXJucyB0aGUgZGVmYXVsdCB2YWx1ZSBpZiBwYXNzZWQgYSBzdHJpbmcgbm90IGluIHRoZSBlbnVtJywgKCkgPT4ge1xuICAgICAgWycnLCAnZ2FyYmFnZScsICdSRUQnXS5mb3JFYWNoKHNlcmlhbGl6ZWRWYWx1ZSA9PiB7XG4gICAgICAgIGNvbnN0IHJlc3VsdDogQ29sb3IgPSBwYXJzZShzZXJpYWxpemVkVmFsdWUpO1xuICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwocmVzdWx0LCBDb2xvci5CbHVlKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgYSBwYXJzZXIgdGhhdCBwYXJzZXMgZW51bSB2YWx1ZXMnLCAoKSA9PiB7XG4gICAgICBjb25zdCByZXN1bHQ6IENvbG9yID0gcGFyc2UoJ2dyZWVuJyk7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwocmVzdWx0LCBDb2xvci5HcmVlbik7XG4gICAgfSk7XG4gIH0pO1xufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiQUFHQSxrQkFBdUI7QUFFdkIsa0JBQStCO0FBRS9CLFNBQVMsY0FBYyxNQUFNO0FBQzNCLFdBQVMsa0JBQWtCLE1BQU07QUFDL0IsUUFBSztBQUFMLE1BQUssV0FBTDtBQUNFLHNCQUFNO0FBQ04sd0JBQVE7QUFDUix1QkFBTztBQUFBLE9BSEo7QUFNTCxVQUFNLFFBQVEsZ0NBQWUsT0FBTyxpQkFBVTtBQUU5QyxPQUFHLDBFQUEwRSxNQUFNO0FBQ2pGLE9BQUMsUUFBVyxNQUFNLEdBQUcsR0FBRyxHQUFHLEVBQUUsUUFBUSxxQkFBbUI7QUFDdEQsY0FBTSxTQUFnQixNQUFNLGVBQWU7QUFDM0MsMkJBQU8sWUFBWSxRQUFRLGlCQUFVO0FBQUEsTUFDdkMsQ0FBQztBQUFBLElBQ0gsQ0FBQztBQUVELE9BQUcsc0ZBQXNGLE1BQU07QUFDN0YsT0FBQyxJQUFJLFdBQVcsS0FBSyxFQUFFLFFBQVEscUJBQW1CO0FBQ2hELGNBQU0sU0FBZ0IsTUFBTSxlQUFlO0FBQzNDLDJCQUFPLFlBQVksUUFBUSxpQkFBVTtBQUFBLE1BQ3ZDLENBQUM7QUFBQSxJQUNILENBQUM7QUFFRCxPQUFHLDRDQUE0QyxNQUFNO0FBQ25ELFlBQU0sU0FBZ0IsTUFBTSxPQUFPO0FBQ25DLHlCQUFPLFlBQVksUUFBUSxtQkFBVztBQUFBLElBQ3hDLENBQUM7QUFBQSxFQUNILENBQUM7QUFDSCxDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
