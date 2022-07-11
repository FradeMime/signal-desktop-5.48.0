var import_chai = require("chai");
var import_getClassNamesFor = require("../../util/getClassNamesFor");
describe("getClassNamesFor", () => {
  it("returns a function", () => {
    const f = (0, import_getClassNamesFor.getClassNamesFor)("hello-world");
    import_chai.assert.isFunction(f);
  });
  it("returns a function that adds a modifier", () => {
    const f = (0, import_getClassNamesFor.getClassNamesFor)("module");
    import_chai.assert.equal(f("__modifier"), "module__modifier");
  });
  it("does not add anything if there is no modifier", () => {
    const f = (0, import_getClassNamesFor.getClassNamesFor)("module");
    import_chai.assert.equal(f(), "");
    import_chai.assert.equal(f(void 0), "");
  });
  it("but does return the top level module if the modifier is empty string", () => {
    const f = (0, import_getClassNamesFor.getClassNamesFor)("module1", "module2");
    import_chai.assert.equal(f(""), "module1 module2");
  });
  it("adds multiple class names", () => {
    const f = (0, import_getClassNamesFor.getClassNamesFor)("module1", "module2", "module3");
    import_chai.assert.equal(f("__modifier"), "module1__modifier module2__modifier module3__modifier");
  });
  it("skips parent modules that are undefined", () => {
    const f = (0, import_getClassNamesFor.getClassNamesFor)("module1", void 0, "module3");
    import_chai.assert.equal(f("__modifier"), "module1__modifier module3__modifier");
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZ2V0Q2xhc3NOYW1lc0Zvcl90ZXN0LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IGFzc2VydCB9IGZyb20gJ2NoYWknO1xuaW1wb3J0IHsgZ2V0Q2xhc3NOYW1lc0ZvciB9IGZyb20gJy4uLy4uL3V0aWwvZ2V0Q2xhc3NOYW1lc0Zvcic7XG5cbmRlc2NyaWJlKCdnZXRDbGFzc05hbWVzRm9yJywgKCkgPT4ge1xuICBpdCgncmV0dXJucyBhIGZ1bmN0aW9uJywgKCkgPT4ge1xuICAgIGNvbnN0IGYgPSBnZXRDbGFzc05hbWVzRm9yKCdoZWxsby13b3JsZCcpO1xuICAgIGFzc2VydC5pc0Z1bmN0aW9uKGYpO1xuICB9KTtcblxuICBpdCgncmV0dXJucyBhIGZ1bmN0aW9uIHRoYXQgYWRkcyBhIG1vZGlmaWVyJywgKCkgPT4ge1xuICAgIGNvbnN0IGYgPSBnZXRDbGFzc05hbWVzRm9yKCdtb2R1bGUnKTtcbiAgICBhc3NlcnQuZXF1YWwoZignX19tb2RpZmllcicpLCAnbW9kdWxlX19tb2RpZmllcicpO1xuICB9KTtcblxuICBpdCgnZG9lcyBub3QgYWRkIGFueXRoaW5nIGlmIHRoZXJlIGlzIG5vIG1vZGlmaWVyJywgKCkgPT4ge1xuICAgIGNvbnN0IGYgPSBnZXRDbGFzc05hbWVzRm9yKCdtb2R1bGUnKTtcbiAgICBhc3NlcnQuZXF1YWwoZigpLCAnJyk7XG4gICAgYXNzZXJ0LmVxdWFsKGYodW5kZWZpbmVkICYmICdfX21vZGlmaWVyJyksICcnKTtcbiAgfSk7XG5cbiAgaXQoJ2J1dCBkb2VzIHJldHVybiB0aGUgdG9wIGxldmVsIG1vZHVsZSBpZiB0aGUgbW9kaWZpZXIgaXMgZW1wdHkgc3RyaW5nJywgKCkgPT4ge1xuICAgIGNvbnN0IGYgPSBnZXRDbGFzc05hbWVzRm9yKCdtb2R1bGUxJywgJ21vZHVsZTInKTtcbiAgICBhc3NlcnQuZXF1YWwoZignJyksICdtb2R1bGUxIG1vZHVsZTInKTtcbiAgfSk7XG5cbiAgaXQoJ2FkZHMgbXVsdGlwbGUgY2xhc3MgbmFtZXMnLCAoKSA9PiB7XG4gICAgY29uc3QgZiA9IGdldENsYXNzTmFtZXNGb3IoJ21vZHVsZTEnLCAnbW9kdWxlMicsICdtb2R1bGUzJyk7XG4gICAgYXNzZXJ0LmVxdWFsKFxuICAgICAgZignX19tb2RpZmllcicpLFxuICAgICAgJ21vZHVsZTFfX21vZGlmaWVyIG1vZHVsZTJfX21vZGlmaWVyIG1vZHVsZTNfX21vZGlmaWVyJ1xuICAgICk7XG4gIH0pO1xuXG4gIGl0KCdza2lwcyBwYXJlbnQgbW9kdWxlcyB0aGF0IGFyZSB1bmRlZmluZWQnLCAoKSA9PiB7XG4gICAgY29uc3QgZiA9IGdldENsYXNzTmFtZXNGb3IoJ21vZHVsZTEnLCB1bmRlZmluZWQsICdtb2R1bGUzJyk7XG4gICAgYXNzZXJ0LmVxdWFsKGYoJ19fbW9kaWZpZXInKSwgJ21vZHVsZTFfX21vZGlmaWVyIG1vZHVsZTNfX21vZGlmaWVyJyk7XG4gIH0pO1xufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiQUFHQSxrQkFBdUI7QUFDdkIsOEJBQWlDO0FBRWpDLFNBQVMsb0JBQW9CLE1BQU07QUFDakMsS0FBRyxzQkFBc0IsTUFBTTtBQUM3QixVQUFNLElBQUksOENBQWlCLGFBQWE7QUFDeEMsdUJBQU8sV0FBVyxDQUFDO0FBQUEsRUFDckIsQ0FBQztBQUVELEtBQUcsMkNBQTJDLE1BQU07QUFDbEQsVUFBTSxJQUFJLDhDQUFpQixRQUFRO0FBQ25DLHVCQUFPLE1BQU0sRUFBRSxZQUFZLEdBQUcsa0JBQWtCO0FBQUEsRUFDbEQsQ0FBQztBQUVELEtBQUcsaURBQWlELE1BQU07QUFDeEQsVUFBTSxJQUFJLDhDQUFpQixRQUFRO0FBQ25DLHVCQUFPLE1BQU0sRUFBRSxHQUFHLEVBQUU7QUFDcEIsdUJBQU8sTUFBTSxFQUFFLE1BQXlCLEdBQUcsRUFBRTtBQUFBLEVBQy9DLENBQUM7QUFFRCxLQUFHLHdFQUF3RSxNQUFNO0FBQy9FLFVBQU0sSUFBSSw4Q0FBaUIsV0FBVyxTQUFTO0FBQy9DLHVCQUFPLE1BQU0sRUFBRSxFQUFFLEdBQUcsaUJBQWlCO0FBQUEsRUFDdkMsQ0FBQztBQUVELEtBQUcsNkJBQTZCLE1BQU07QUFDcEMsVUFBTSxJQUFJLDhDQUFpQixXQUFXLFdBQVcsU0FBUztBQUMxRCx1QkFBTyxNQUNMLEVBQUUsWUFBWSxHQUNkLHVEQUNGO0FBQUEsRUFDRixDQUFDO0FBRUQsS0FBRywyQ0FBMkMsTUFBTTtBQUNsRCxVQUFNLElBQUksOENBQWlCLFdBQVcsUUFBVyxTQUFTO0FBQzFELHVCQUFPLE1BQU0sRUFBRSxZQUFZLEdBQUcscUNBQXFDO0FBQUEsRUFDckUsQ0FBQztBQUNILENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
