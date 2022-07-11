var import_chai = require("chai");
var import_awaitObject = require("../../util/awaitObject");
describe("awaitObject", () => {
  it("returns correct result", async () => {
    import_chai.assert.deepStrictEqual(await (0, import_awaitObject.awaitObject)({
      a: Promise.resolve(1),
      b: Promise.resolve("b"),
      c: Promise.resolve(null)
    }), {
      a: 1,
      b: "b",
      c: null
    });
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiYXdhaXRPYmplY3RfdGVzdC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyBhc3NlcnQgfSBmcm9tICdjaGFpJztcblxuaW1wb3J0IHsgYXdhaXRPYmplY3QgfSBmcm9tICcuLi8uLi91dGlsL2F3YWl0T2JqZWN0JztcblxuZGVzY3JpYmUoJ2F3YWl0T2JqZWN0JywgKCkgPT4ge1xuICBpdCgncmV0dXJucyBjb3JyZWN0IHJlc3VsdCcsIGFzeW5jICgpID0+IHtcbiAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKFxuICAgICAgYXdhaXQgYXdhaXRPYmplY3Qoe1xuICAgICAgICBhOiBQcm9taXNlLnJlc29sdmUoMSksXG4gICAgICAgIGI6IFByb21pc2UucmVzb2x2ZSgnYicpLFxuICAgICAgICBjOiBQcm9taXNlLnJlc29sdmUobnVsbCksXG4gICAgICB9KSxcbiAgICAgIHtcbiAgICAgICAgYTogMSxcbiAgICAgICAgYjogJ2InLFxuICAgICAgICBjOiBudWxsLFxuICAgICAgfVxuICAgICk7XG4gIH0pO1xufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiQUFHQSxrQkFBdUI7QUFFdkIseUJBQTRCO0FBRTVCLFNBQVMsZUFBZSxNQUFNO0FBQzVCLEtBQUcsMEJBQTBCLFlBQVk7QUFDdkMsdUJBQU8sZ0JBQ0wsTUFBTSxvQ0FBWTtBQUFBLE1BQ2hCLEdBQUcsUUFBUSxRQUFRLENBQUM7QUFBQSxNQUNwQixHQUFHLFFBQVEsUUFBUSxHQUFHO0FBQUEsTUFDdEIsR0FBRyxRQUFRLFFBQVEsSUFBSTtBQUFBLElBQ3pCLENBQUMsR0FDRDtBQUFBLE1BQ0UsR0FBRztBQUFBLE1BQ0gsR0FBRztBQUFBLE1BQ0gsR0FBRztBQUFBLElBQ0wsQ0FDRjtBQUFBLEVBQ0YsQ0FBQztBQUNILENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
