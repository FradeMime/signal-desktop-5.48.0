var import_chai = require("chai");
var import_getInitials = require("../../util/getInitials");
describe("getInitials", () => {
  it("returns undefined when passed undefined", () => {
    import_chai.assert.isUndefined((0, import_getInitials.getInitials)(void 0));
  });
  it("returns undefined when passed an empty string", () => {
    import_chai.assert.isUndefined((0, import_getInitials.getInitials)(""));
  });
  it("returns undefined when passed a string with no letters", () => {
    import_chai.assert.isUndefined((0, import_getInitials.getInitials)("123 !@#$%"));
  });
  it("returns the first letter of a name that is one ASCII word", () => {
    import_chai.assert.strictEqual((0, import_getInitials.getInitials)("Foo"), "F");
    import_chai.assert.strictEqual((0, import_getInitials.getInitials)("Bo"), "B");
  });
  [
    "Foo Bar",
    "foo bar",
    "F Bar",
    "Foo B",
    "FB",
    "F.B.",
    "0Foo 1Bar",
    "Foo B'Ar",
    "Foo Q Bar",
    "Foo Q. Bar",
    "Foo Qux Bar",
    'Foo "Qux" Bar',
    "Foo-Qux Bar",
    "Foo Bar-Qux",
    "Foo b'Arr"
  ].forEach((name) => {
    it(`returns 'FB' for '${name}'`, () => {
      import_chai.assert.strictEqual((0, import_getInitials.getInitials)(name), "FB");
    });
  });
  it("returns initials for languages with non-Latin alphabets", () => {
    import_chai.assert.strictEqual((0, import_getInitials.getInitials)("\u0418\u0432\u0430\u043D \u0418\u0432\u0430\u043D\u043E\u0432"), "\u0418\u0418");
    import_chai.assert.strictEqual((0, import_getInitials.getInitials)("\u5C71\u7530 \u592A\u90CE"), "\u5C71\u592A");
    import_chai.assert.strictEqual((0, import_getInitials.getInitials)("\u738B\u4E94"), "\u738B\u4E94");
  });
  it("returns initials for right-to-left languages", () => {
    import_chai.assert.strictEqual((0, import_getInitials.getInitials)("\u0641\u0644\u0627\u0646\u0629 \u0627\u0644\u0641\u0644\u0627\u0646\u064A\u0629"), "\u0641\u0627");
    import_chai.assert.strictEqual((0, import_getInitials.getInitials)("\u05D9\u05E9\u05E8\u05D0\u05DC\u05D4 \u05D9\u05E9\u05E8\u05D0\u05DC\u05D9"), "\u05D9\u05D9");
  });
  it("returns initials with diacritical marks", () => {
    import_chai.assert.strictEqual((0, import_getInitials.getInitials)("\u1E1Eoo \u1E04ar"), "\u1E1E\u1E04");
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZ2V0SW5pdGlhbHNfdGVzdC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyBhc3NlcnQgfSBmcm9tICdjaGFpJztcblxuaW1wb3J0IHsgZ2V0SW5pdGlhbHMgfSBmcm9tICcuLi8uLi91dGlsL2dldEluaXRpYWxzJztcblxuZGVzY3JpYmUoJ2dldEluaXRpYWxzJywgKCkgPT4ge1xuICBpdCgncmV0dXJucyB1bmRlZmluZWQgd2hlbiBwYXNzZWQgdW5kZWZpbmVkJywgKCkgPT4ge1xuICAgIGFzc2VydC5pc1VuZGVmaW5lZChnZXRJbml0aWFscyh1bmRlZmluZWQpKTtcbiAgfSk7XG5cbiAgaXQoJ3JldHVybnMgdW5kZWZpbmVkIHdoZW4gcGFzc2VkIGFuIGVtcHR5IHN0cmluZycsICgpID0+IHtcbiAgICBhc3NlcnQuaXNVbmRlZmluZWQoZ2V0SW5pdGlhbHMoJycpKTtcbiAgfSk7XG5cbiAgaXQoJ3JldHVybnMgdW5kZWZpbmVkIHdoZW4gcGFzc2VkIGEgc3RyaW5nIHdpdGggbm8gbGV0dGVycycsICgpID0+IHtcbiAgICBhc3NlcnQuaXNVbmRlZmluZWQoZ2V0SW5pdGlhbHMoJzEyMyAhQCMkJScpKTtcbiAgfSk7XG5cbiAgaXQoJ3JldHVybnMgdGhlIGZpcnN0IGxldHRlciBvZiBhIG5hbWUgdGhhdCBpcyBvbmUgQVNDSUkgd29yZCcsICgpID0+IHtcbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwoZ2V0SW5pdGlhbHMoJ0ZvbycpLCAnRicpO1xuICAgIGFzc2VydC5zdHJpY3RFcXVhbChnZXRJbml0aWFscygnQm8nKSwgJ0InKTtcbiAgfSk7XG5cbiAgW1xuICAgICdGb28gQmFyJyxcbiAgICAnZm9vIGJhcicsXG4gICAgJ0YgQmFyJyxcbiAgICAnRm9vIEInLFxuICAgICdGQicsXG4gICAgJ0YuQi4nLFxuICAgICcwRm9vIDFCYXInLFxuICAgIFwiRm9vIEInQXJcIixcbiAgICAnRm9vIFEgQmFyJyxcbiAgICAnRm9vIFEuIEJhcicsXG4gICAgJ0ZvbyBRdXggQmFyJyxcbiAgICAnRm9vIFwiUXV4XCIgQmFyJyxcbiAgICAnRm9vLVF1eCBCYXInLFxuICAgICdGb28gQmFyLVF1eCcsXG4gICAgXCJGb28gYidBcnJcIixcbiAgXS5mb3JFYWNoKG5hbWUgPT4ge1xuICAgIGl0KGByZXR1cm5zICdGQicgZm9yICcke25hbWV9J2AsICgpID0+IHtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChnZXRJbml0aWFscyhuYW1lKSwgJ0ZCJyk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGl0KCdyZXR1cm5zIGluaXRpYWxzIGZvciBsYW5ndWFnZXMgd2l0aCBub24tTGF0aW4gYWxwaGFiZXRzJywgKCkgPT4ge1xuICAgIGFzc2VydC5zdHJpY3RFcXVhbChnZXRJbml0aWFscygnXHUwNDE4XHUwNDMyXHUwNDMwXHUwNDNEIFx1MDQxOFx1MDQzMlx1MDQzMFx1MDQzRFx1MDQzRVx1MDQzMicpLCAnXHUwNDE4XHUwNDE4Jyk7XG4gICAgYXNzZXJ0LnN0cmljdEVxdWFsKGdldEluaXRpYWxzKCdcdTVDNzFcdTc1MzAgXHU1OTJBXHU5MENFJyksICdcdTVDNzFcdTU5MkEnKTtcbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwoZ2V0SW5pdGlhbHMoJ1x1NzM4Qlx1NEU5NCcpLCAnXHU3MzhCXHU0RTk0Jyk7XG4gIH0pO1xuXG4gIGl0KCdyZXR1cm5zIGluaXRpYWxzIGZvciByaWdodC10by1sZWZ0IGxhbmd1YWdlcycsICgpID0+IHtcbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwoZ2V0SW5pdGlhbHMoJ1x1MDY0MVx1MDY0NFx1MDYyN1x1MDY0Nlx1MDYyOSBcdTA2MjdcdTA2NDRcdTA2NDFcdTA2NDRcdTA2MjdcdTA2NDZcdTA2NEFcdTA2MjknKSwgJ1x1MDY0MVx1MDYyNycpO1xuICAgIGFzc2VydC5zdHJpY3RFcXVhbChnZXRJbml0aWFscygnXHUwNUQ5XHUwNUU5XHUwNUU4XHUwNUQwXHUwNURDXHUwNUQ0IFx1MDVEOVx1MDVFOVx1MDVFOFx1MDVEMFx1MDVEQ1x1MDVEOScpLCAnXHUwNUQ5XHUwNUQ5Jyk7XG4gIH0pO1xuXG4gIGl0KCdyZXR1cm5zIGluaXRpYWxzIHdpdGggZGlhY3JpdGljYWwgbWFya3MnLCAoKSA9PiB7XG4gICAgYXNzZXJ0LnN0cmljdEVxdWFsKGdldEluaXRpYWxzKCdcdTFFMUVvbyBcdTFFMDRhcicpLCAnXHUxRTFFXHUxRTA0Jyk7XG4gIH0pO1xufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiQUFHQSxrQkFBdUI7QUFFdkIseUJBQTRCO0FBRTVCLFNBQVMsZUFBZSxNQUFNO0FBQzVCLEtBQUcsMkNBQTJDLE1BQU07QUFDbEQsdUJBQU8sWUFBWSxvQ0FBWSxNQUFTLENBQUM7QUFBQSxFQUMzQyxDQUFDO0FBRUQsS0FBRyxpREFBaUQsTUFBTTtBQUN4RCx1QkFBTyxZQUFZLG9DQUFZLEVBQUUsQ0FBQztBQUFBLEVBQ3BDLENBQUM7QUFFRCxLQUFHLDBEQUEwRCxNQUFNO0FBQ2pFLHVCQUFPLFlBQVksb0NBQVksV0FBVyxDQUFDO0FBQUEsRUFDN0MsQ0FBQztBQUVELEtBQUcsNkRBQTZELE1BQU07QUFDcEUsdUJBQU8sWUFBWSxvQ0FBWSxLQUFLLEdBQUcsR0FBRztBQUMxQyx1QkFBTyxZQUFZLG9DQUFZLElBQUksR0FBRyxHQUFHO0FBQUEsRUFDM0MsQ0FBQztBQUVEO0FBQUEsSUFDRTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsRUFDRixFQUFFLFFBQVEsVUFBUTtBQUNoQixPQUFHLHFCQUFxQixTQUFTLE1BQU07QUFDckMseUJBQU8sWUFBWSxvQ0FBWSxJQUFJLEdBQUcsSUFBSTtBQUFBLElBQzVDLENBQUM7QUFBQSxFQUNILENBQUM7QUFFRCxLQUFHLDJEQUEyRCxNQUFNO0FBQ2xFLHVCQUFPLFlBQVksb0NBQVksK0RBQWEsR0FBRyxjQUFJO0FBQ25ELHVCQUFPLFlBQVksb0NBQVksMkJBQU8sR0FBRyxjQUFJO0FBQzdDLHVCQUFPLFlBQVksb0NBQVksY0FBSSxHQUFHLGNBQUk7QUFBQSxFQUM1QyxDQUFDO0FBRUQsS0FBRyxnREFBZ0QsTUFBTTtBQUN2RCx1QkFBTyxZQUFZLG9DQUFZLGlGQUFnQixHQUFHLGNBQUk7QUFDdEQsdUJBQU8sWUFBWSxvQ0FBWSwyRUFBZSxHQUFHLGNBQUk7QUFBQSxFQUN2RCxDQUFDO0FBRUQsS0FBRywyQ0FBMkMsTUFBTTtBQUNsRCx1QkFBTyxZQUFZLG9DQUFZLG1CQUFTLEdBQUcsY0FBSTtBQUFBLEVBQ2pELENBQUM7QUFDSCxDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
