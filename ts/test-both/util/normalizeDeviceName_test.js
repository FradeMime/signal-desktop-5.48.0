var import_chai = require("chai");
var import_normalizeDeviceName = require("../../util/normalizeDeviceName");
describe("normalizeDeviceName", () => {
  it("leaves normal device names untouched", () => {
    for (const name of ["foo", "bar Baz", "\u{1F485}\u{1F485}\u{1F485}"]) {
      import_chai.assert.strictEqual((0, import_normalizeDeviceName.normalizeDeviceName)(name), name);
    }
  });
  it("trims device names", () => {
    import_chai.assert.strictEqual((0, import_normalizeDeviceName.normalizeDeviceName)(" foo	"), "foo");
  });
  it("removes null characters", () => {
    import_chai.assert.strictEqual((0, import_normalizeDeviceName.normalizeDeviceName)("\0foo\0bar"), "foobar");
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibm9ybWFsaXplRGV2aWNlTmFtZV90ZXN0LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IGFzc2VydCB9IGZyb20gJ2NoYWknO1xuXG5pbXBvcnQgeyBub3JtYWxpemVEZXZpY2VOYW1lIH0gZnJvbSAnLi4vLi4vdXRpbC9ub3JtYWxpemVEZXZpY2VOYW1lJztcblxuZGVzY3JpYmUoJ25vcm1hbGl6ZURldmljZU5hbWUnLCAoKSA9PiB7XG4gIGl0KCdsZWF2ZXMgbm9ybWFsIGRldmljZSBuYW1lcyB1bnRvdWNoZWQnLCAoKSA9PiB7XG4gICAgZm9yIChjb25zdCBuYW1lIG9mIFsnZm9vJywgJ2JhciBCYXonLCAnXHVEODNEXHVEQzg1XHVEODNEXHVEQzg1XHVEODNEXHVEQzg1J10pIHtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChub3JtYWxpemVEZXZpY2VOYW1lKG5hbWUpLCBuYW1lKTtcbiAgICB9XG4gIH0pO1xuXG4gIGl0KCd0cmltcyBkZXZpY2UgbmFtZXMnLCAoKSA9PiB7XG4gICAgYXNzZXJ0LnN0cmljdEVxdWFsKG5vcm1hbGl6ZURldmljZU5hbWUoJyBmb29cXHQnKSwgJ2ZvbycpO1xuICB9KTtcblxuICBpdCgncmVtb3ZlcyBudWxsIGNoYXJhY3RlcnMnLCAoKSA9PiB7XG4gICAgYXNzZXJ0LnN0cmljdEVxdWFsKG5vcm1hbGl6ZURldmljZU5hbWUoJ1xcMGZvb1xcMGJhcicpLCAnZm9vYmFyJyk7XG4gIH0pO1xufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiQUFHQSxrQkFBdUI7QUFFdkIsaUNBQW9DO0FBRXBDLFNBQVMsdUJBQXVCLE1BQU07QUFDcEMsS0FBRyx3Q0FBd0MsTUFBTTtBQUMvQyxlQUFXLFFBQVEsQ0FBQyxPQUFPLFdBQVcsNkJBQVEsR0FBRztBQUMvQyx5QkFBTyxZQUFZLG9EQUFvQixJQUFJLEdBQUcsSUFBSTtBQUFBLElBQ3BEO0FBQUEsRUFDRixDQUFDO0FBRUQsS0FBRyxzQkFBc0IsTUFBTTtBQUM3Qix1QkFBTyxZQUFZLG9EQUFvQixPQUFRLEdBQUcsS0FBSztBQUFBLEVBQ3pELENBQUM7QUFFRCxLQUFHLDJCQUEyQixNQUFNO0FBQ2xDLHVCQUFPLFlBQVksb0RBQW9CLFlBQVksR0FBRyxRQUFRO0FBQUEsRUFDaEUsQ0FBQztBQUNILENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
