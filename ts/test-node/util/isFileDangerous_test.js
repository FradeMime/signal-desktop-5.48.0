var import_chai = require("chai");
var import_isFileDangerous = require("../../util/isFileDangerous");
describe("isFileDangerous", () => {
  it("returns false for images", () => {
    import_chai.assert.strictEqual((0, import_isFileDangerous.isFileDangerous)("dog.gif"), false);
    import_chai.assert.strictEqual((0, import_isFileDangerous.isFileDangerous)("cat.jpg"), false);
  });
  it("returns false for documents", () => {
    import_chai.assert.strictEqual((0, import_isFileDangerous.isFileDangerous)("resume.docx"), false);
    import_chai.assert.strictEqual((0, import_isFileDangerous.isFileDangerous)("price_list.pdf"), false);
  });
  it("returns true for executable files", () => {
    import_chai.assert.strictEqual((0, import_isFileDangerous.isFileDangerous)("run.exe"), true);
    import_chai.assert.strictEqual((0, import_isFileDangerous.isFileDangerous)("install.pif"), true);
  });
  it("returns true for Microsoft settings files", () => {
    import_chai.assert.strictEqual((0, import_isFileDangerous.isFileDangerous)("downl.SettingContent-ms"), true);
  });
  it('returns false for non-dangerous files that end in ".", which can happen on Windows', () => {
    import_chai.assert.strictEqual((0, import_isFileDangerous.isFileDangerous)("dog.png."), false);
    import_chai.assert.strictEqual((0, import_isFileDangerous.isFileDangerous)("resume.docx."), false);
  });
  it('returns true for dangerous files that end in ".", which can happen on Windows', () => {
    import_chai.assert.strictEqual((0, import_isFileDangerous.isFileDangerous)("run.exe."), true);
    import_chai.assert.strictEqual((0, import_isFileDangerous.isFileDangerous)("install.pif."), true);
  });
  it("returns false for empty filename", () => {
    import_chai.assert.strictEqual((0, import_isFileDangerous.isFileDangerous)(""), false);
  });
  it("returns false for exe at various parts of filename", () => {
    import_chai.assert.strictEqual((0, import_isFileDangerous.isFileDangerous)(".exemanifesto.txt"), false);
    import_chai.assert.strictEqual((0, import_isFileDangerous.isFileDangerous)("runexe"), false);
    import_chai.assert.strictEqual((0, import_isFileDangerous.isFileDangerous)("run_exe"), false);
  });
  it("returns true for upper-case EXE", () => {
    import_chai.assert.strictEqual((0, import_isFileDangerous.isFileDangerous)("run.EXE"), true);
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiaXNGaWxlRGFuZ2Vyb3VzX3Rlc3QudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDE4LTIwMjAgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyBhc3NlcnQgfSBmcm9tICdjaGFpJztcblxuaW1wb3J0IHsgaXNGaWxlRGFuZ2Vyb3VzIH0gZnJvbSAnLi4vLi4vdXRpbC9pc0ZpbGVEYW5nZXJvdXMnO1xuXG5kZXNjcmliZSgnaXNGaWxlRGFuZ2Vyb3VzJywgKCkgPT4ge1xuICBpdCgncmV0dXJucyBmYWxzZSBmb3IgaW1hZ2VzJywgKCkgPT4ge1xuICAgIGFzc2VydC5zdHJpY3RFcXVhbChpc0ZpbGVEYW5nZXJvdXMoJ2RvZy5naWYnKSwgZmFsc2UpO1xuICAgIGFzc2VydC5zdHJpY3RFcXVhbChpc0ZpbGVEYW5nZXJvdXMoJ2NhdC5qcGcnKSwgZmFsc2UpO1xuICB9KTtcblxuICBpdCgncmV0dXJucyBmYWxzZSBmb3IgZG9jdW1lbnRzJywgKCkgPT4ge1xuICAgIGFzc2VydC5zdHJpY3RFcXVhbChpc0ZpbGVEYW5nZXJvdXMoJ3Jlc3VtZS5kb2N4JyksIGZhbHNlKTtcbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwoaXNGaWxlRGFuZ2Vyb3VzKCdwcmljZV9saXN0LnBkZicpLCBmYWxzZSk7XG4gIH0pO1xuXG4gIGl0KCdyZXR1cm5zIHRydWUgZm9yIGV4ZWN1dGFibGUgZmlsZXMnLCAoKSA9PiB7XG4gICAgYXNzZXJ0LnN0cmljdEVxdWFsKGlzRmlsZURhbmdlcm91cygncnVuLmV4ZScpLCB0cnVlKTtcbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwoaXNGaWxlRGFuZ2Vyb3VzKCdpbnN0YWxsLnBpZicpLCB0cnVlKTtcbiAgfSk7XG5cbiAgaXQoJ3JldHVybnMgdHJ1ZSBmb3IgTWljcm9zb2Z0IHNldHRpbmdzIGZpbGVzJywgKCkgPT4ge1xuICAgIGFzc2VydC5zdHJpY3RFcXVhbChpc0ZpbGVEYW5nZXJvdXMoJ2Rvd25sLlNldHRpbmdDb250ZW50LW1zJyksIHRydWUpO1xuICB9KTtcblxuICBpdCgncmV0dXJucyBmYWxzZSBmb3Igbm9uLWRhbmdlcm91cyBmaWxlcyB0aGF0IGVuZCBpbiBcIi5cIiwgd2hpY2ggY2FuIGhhcHBlbiBvbiBXaW5kb3dzJywgKCkgPT4ge1xuICAgIGFzc2VydC5zdHJpY3RFcXVhbChpc0ZpbGVEYW5nZXJvdXMoJ2RvZy5wbmcuJyksIGZhbHNlKTtcbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwoaXNGaWxlRGFuZ2Vyb3VzKCdyZXN1bWUuZG9jeC4nKSwgZmFsc2UpO1xuICB9KTtcblxuICBpdCgncmV0dXJucyB0cnVlIGZvciBkYW5nZXJvdXMgZmlsZXMgdGhhdCBlbmQgaW4gXCIuXCIsIHdoaWNoIGNhbiBoYXBwZW4gb24gV2luZG93cycsICgpID0+IHtcbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwoaXNGaWxlRGFuZ2Vyb3VzKCdydW4uZXhlLicpLCB0cnVlKTtcbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwoaXNGaWxlRGFuZ2Vyb3VzKCdpbnN0YWxsLnBpZi4nKSwgdHJ1ZSk7XG4gIH0pO1xuXG4gIGl0KCdyZXR1cm5zIGZhbHNlIGZvciBlbXB0eSBmaWxlbmFtZScsICgpID0+IHtcbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwoaXNGaWxlRGFuZ2Vyb3VzKCcnKSwgZmFsc2UpO1xuICB9KTtcblxuICBpdCgncmV0dXJucyBmYWxzZSBmb3IgZXhlIGF0IHZhcmlvdXMgcGFydHMgb2YgZmlsZW5hbWUnLCAoKSA9PiB7XG4gICAgYXNzZXJ0LnN0cmljdEVxdWFsKGlzRmlsZURhbmdlcm91cygnLmV4ZW1hbmlmZXN0by50eHQnKSwgZmFsc2UpO1xuICAgIGFzc2VydC5zdHJpY3RFcXVhbChpc0ZpbGVEYW5nZXJvdXMoJ3J1bmV4ZScpLCBmYWxzZSk7XG4gICAgYXNzZXJ0LnN0cmljdEVxdWFsKGlzRmlsZURhbmdlcm91cygncnVuX2V4ZScpLCBmYWxzZSk7XG4gIH0pO1xuXG4gIGl0KCdyZXR1cm5zIHRydWUgZm9yIHVwcGVyLWNhc2UgRVhFJywgKCkgPT4ge1xuICAgIGFzc2VydC5zdHJpY3RFcXVhbChpc0ZpbGVEYW5nZXJvdXMoJ3J1bi5FWEUnKSwgdHJ1ZSk7XG4gIH0pO1xufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiQUFHQSxrQkFBdUI7QUFFdkIsNkJBQWdDO0FBRWhDLFNBQVMsbUJBQW1CLE1BQU07QUFDaEMsS0FBRyw0QkFBNEIsTUFBTTtBQUNuQyx1QkFBTyxZQUFZLDRDQUFnQixTQUFTLEdBQUcsS0FBSztBQUNwRCx1QkFBTyxZQUFZLDRDQUFnQixTQUFTLEdBQUcsS0FBSztBQUFBLEVBQ3RELENBQUM7QUFFRCxLQUFHLCtCQUErQixNQUFNO0FBQ3RDLHVCQUFPLFlBQVksNENBQWdCLGFBQWEsR0FBRyxLQUFLO0FBQ3hELHVCQUFPLFlBQVksNENBQWdCLGdCQUFnQixHQUFHLEtBQUs7QUFBQSxFQUM3RCxDQUFDO0FBRUQsS0FBRyxxQ0FBcUMsTUFBTTtBQUM1Qyx1QkFBTyxZQUFZLDRDQUFnQixTQUFTLEdBQUcsSUFBSTtBQUNuRCx1QkFBTyxZQUFZLDRDQUFnQixhQUFhLEdBQUcsSUFBSTtBQUFBLEVBQ3pELENBQUM7QUFFRCxLQUFHLDZDQUE2QyxNQUFNO0FBQ3BELHVCQUFPLFlBQVksNENBQWdCLHlCQUF5QixHQUFHLElBQUk7QUFBQSxFQUNyRSxDQUFDO0FBRUQsS0FBRyxzRkFBc0YsTUFBTTtBQUM3Rix1QkFBTyxZQUFZLDRDQUFnQixVQUFVLEdBQUcsS0FBSztBQUNyRCx1QkFBTyxZQUFZLDRDQUFnQixjQUFjLEdBQUcsS0FBSztBQUFBLEVBQzNELENBQUM7QUFFRCxLQUFHLGlGQUFpRixNQUFNO0FBQ3hGLHVCQUFPLFlBQVksNENBQWdCLFVBQVUsR0FBRyxJQUFJO0FBQ3BELHVCQUFPLFlBQVksNENBQWdCLGNBQWMsR0FBRyxJQUFJO0FBQUEsRUFDMUQsQ0FBQztBQUVELEtBQUcsb0NBQW9DLE1BQU07QUFDM0MsdUJBQU8sWUFBWSw0Q0FBZ0IsRUFBRSxHQUFHLEtBQUs7QUFBQSxFQUMvQyxDQUFDO0FBRUQsS0FBRyxzREFBc0QsTUFBTTtBQUM3RCx1QkFBTyxZQUFZLDRDQUFnQixtQkFBbUIsR0FBRyxLQUFLO0FBQzlELHVCQUFPLFlBQVksNENBQWdCLFFBQVEsR0FBRyxLQUFLO0FBQ25ELHVCQUFPLFlBQVksNENBQWdCLFNBQVMsR0FBRyxLQUFLO0FBQUEsRUFDdEQsQ0FBQztBQUVELEtBQUcsbUNBQW1DLE1BQU07QUFDMUMsdUJBQU8sWUFBWSw0Q0FBZ0IsU0FBUyxHQUFHLElBQUk7QUFBQSxFQUNyRCxDQUFDO0FBQ0gsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
